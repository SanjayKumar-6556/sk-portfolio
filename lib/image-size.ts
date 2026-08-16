import fs from "node:fs";
import path from "node:path";

/**
 * Read an image's real pixel dimensions off disk, server-side.
 *
 * WHY THIS EXISTS, TWICE OVER.
 *
 * 1. MDX in dev silently drops JSX expression attributes. `<Figure width={1400} />`
 *    arrives with `width` undefined under `next dev`, while string attributes
 *    (`src`, `alt`) come through fine — so the page builds and renders in
 *    production and 500s in development, which is the worst way round. Passing
 *    no numbers at all sidesteps it.
 *
 * 2. Hard-coded dimensions drift. Two of these figures were re-cropped after
 *    they were first wired in, and the `width`/`height` in the MDX then
 *    described an image that no longer existed — Next reserved the wrong
 *    aspect ratio and the layout jumped as they loaded. A number read from the
 *    file cannot disagree with the file.
 *
 * No dependency: `sharp` is only a transitive dependency of Next, so importing
 * it here would break the day Next stops bundling it. These are a few dozen
 * bytes of header parsing instead, covering the formats this site can actually
 * contain.
 */

const cache = new Map<string, { width: number; height: number }>();

function readWebp(b: Buffer): { width: number; height: number } | null {
  if (b.toString("ascii", 0, 4) !== "RIFF" || b.toString("ascii", 8, 12) !== "WEBP") {
    return null;
  }
  const fourcc = b.toString("ascii", 12, 16);

  if (fourcc === "VP8 ") {
    // Lossy. 14-bit dimensions after the 3-byte start code at offset 23.
    return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
  }
  if (fourcc === "VP8L") {
    // Lossless. 14 bits each, packed little-endian from offset 21.
    const bits = b.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (fourcc === "VP8X") {
    // Extended. Canvas size minus one, 24-bit little-endian.
    const w = b[24] | (b[25] << 8) | (b[26] << 16);
    const h = b[27] | (b[28] << 8) | (b[29] << 16);
    return { width: w + 1, height: h + 1 };
  }
  return null;
}

function readPng(b: Buffer): { width: number; height: number } | null {
  if (b.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
}

function readJpeg(b: Buffer): { width: number; height: number } | null {
  if (b.readUInt16BE(0) !== 0xffd8) return null;
  let i = 2;
  while (i < b.length - 9) {
    if (b[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = b[i + 1];
    // SOF0..SOF15, excluding the DHT/JPG/DAC markers interleaved among them.
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}

/**
 * `publicPath` is the URL path as written in MDX, e.g.
 * "/research/figures/fig-inference-pipeline.webp".
 *
 * Throws rather than guessing. A figure whose file is missing or unreadable is
 * a broken page, and a silent 1×1 fallback would ship a collapsed layout.
 */
export function imageSize(publicPath: string): { width: number; height: number } {
  const cached = cache.get(publicPath);
  if (cached) return cached;

  const abs = path.join(
    /* turbopackIgnore: true */ process.cwd(),
    "public",
    publicPath.replace(/^\//, ""),
  );
  if (!fs.existsSync(abs)) {
    throw new Error(`imageSize: no file at public${publicPath}`);
  }

  const head = Buffer.alloc(65536);
  const fd = fs.openSync(abs, "r");
  const read = fs.readSync(fd, head, 0, head.length, 0);
  fs.closeSync(fd);
  const buf = head.subarray(0, read);

  const size = readWebp(buf) ?? readPng(buf) ?? readJpeg(buf);
  if (!size || !size.width || !size.height) {
    throw new Error(
      `imageSize: could not read dimensions from public${publicPath}. ` +
        `Supported: WebP, PNG, JPEG.`,
    );
  }

  cache.set(publicPath, size);
  return size;
}
