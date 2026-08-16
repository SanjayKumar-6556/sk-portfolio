import Image from "next/image";
import { imageSize } from "@/lib/image-size";

/**
 * The hero graphic: his own simulated 21-cm map, cross-fading through three
 * stages of reionization.
 *
 * It replaces a generic constellation SVG. A constellation says "space" to
 * anyone; this says what he actually did — these are his own simulation boxes
 * from MSc thesis Figure 3.4, the same three the ambient layer is built from,
 * here at full colour rather than crushed to texture.
 *
 * WHAT THE READER IS LOOKING AT, and why the caption is not optional: the dark
 * regions are ionized bubbles blown by the first galaxies, the coloured field
 * is neutral hydrogen still glowing in 21-cm. As the loop advances, x_HI falls
 * from 0.88 to 0.29 — the bubbles grow, merge, and take over. That is
 * reionization, and it is the thing his paper is about. Without a caption it
 * is a pretty pattern; with one it is a demonstration.
 *
 * PURE CSS, NO JAVASCRIPT. Three stacked images on one 18s keyframe loop,
 * offset by a third each. Only opacity animates, so it composites and never
 * repaints. Under prefers-reduced-motion the animation is dropped and the
 * middle stage stays up — the most legible of the three, and a still image is
 * a perfectly good outcome here.
 *
 * The first frame is NOT lazy: it is above the fold and the panel would
 * otherwise open empty.
 */
const STAGES = [
  { src: "/backgrounds/hi-map-088.webp", xhi: "0.88" },
  { src: "/backgrounds/hi-map-063.webp", xhi: "0.63" },
  { src: "/backgrounds/hi-map-029.webp", xhi: "0.29" },
] as const;

export function HiMapPanel({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="hi-map relative aspect-square overflow-hidden rounded-[0.6rem]">
        {STAGES.map((stage, i) => {
          const { width, height } = imageSize(stage.src);
          return (
            <Image
              key={stage.src}
              src={stage.src}
              alt={
                i === 1
                  ? "Simulated 21-cm brightness-temperature map of the early Universe: dark ionized bubbles growing through a field of neutral hydrogen."
                  : ""
              }
              aria-hidden={i !== 1}
              width={width}
              height={height}
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              sizes="(max-width: 1023px) 90vw, 360px"
              className={`hi-map__frame hi-map__frame--${i} absolute inset-0 size-full object-cover`}
            />
          );
        })}
      </div>
      <figcaption className="mt-3 font-mono text-label uppercase text-text-muted">
        Simulated 21-cm map · x
        <span className="lowercase">HI</span> {STAGES.map((s) => s.xhi).join(" → ")}
        {/*
          Full-strength --text-muted, no /80. Measured in the rendered page,
          the 80% modifier composited to 3.92:1 against the card here — an AA
          failure at 12px, on the one sentence that makes the graphic mean
          anything. It predates the light theme; it is fixed here because the
          same sweep measured it. At full strength: 5.46:1 dark, 6.04:1 light.
        */}
        <span className="mt-1 block normal-case tracking-normal">
          His own simulation. Dark regions are ionized bubbles; the field is
          neutral hydrogen.
        </span>
      </figcaption>
    </figure>
  );
}
