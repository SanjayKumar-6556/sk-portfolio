import Image from "next/image";
import { imageSize } from "@/lib/image-size";
import { cn } from "@/lib/utils";

/**
 * A scientific figure inside a case study.
 *
 * These are real plots from his thesis, his poster and his own code — see
 * public/research/figures/PROVENANCE.md, which traces every one to its source
 * and records the one figure that was deliberately excluded because his thesis
 * credits it to somebody else. Nothing decorative goes through this component.
 *
 * NO width/height PROPS ON PURPOSE. They are read from the file (see
 * lib/image-size.ts). MDX drops JSX expression attributes under `next dev`, so
 * `width={1400}` arrived undefined and the page 500'd in development while
 * building fine in production. Reading the file also means the reserved aspect
 * ratio can never disagree with the actual image, which it already did once
 * after two figures were re-cropped.
 *
 * WHY THE WHITE PLATE. The figures are matplotlib output on white. Inverting
 * or recolouring them would misrepresent published research, so they sit on a
 * light plate instead — the way a paper reproduces a figure. That reads as "a
 * real figure", where a recoloured one reads as a styling mistake.
 *
 * The plate stays white in BOTH themes, for that reason. What changes is what
 * has to hold it: on a dark ground the plate's own edge does all the work, but
 * on a light one the two purely-white figures measure 1.04:1 against the page
 * and the plate simply is not there. Measured, `border-border-subtle` over the
 * white plate composites to CR 1.012 — not a faint border, nothing at all.
 *
 * So light mode gets `shadow-lift-1` and the stronger hairline. This is the
 * one place on the site where a card is DELIBERATELY not made of the surface
 * tokens: the plate is part of the artefact, not part of the chrome.
 *
 * WHY THE FULL-SIZE LINK. Corner plots and multi-panel grids carry small axis
 * labels that are unreadable in a 640px reading column, and shrinking them to
 * fit is how a real result becomes wallpaper. The image is legible enough to
 * show what happened; the link is there for anyone who wants to check it.
 */
export function Figure({
  src,
  alt,
  caption,
  className,
}: {
  /** Path under public/, e.g. "/research/figures/fig-inference-pipeline.webp". */
  src: string;
  alt: string;
  /** What the reader should take from it. Plain language, no invented numbers. */
  caption: string;
  className?: string;
}) {
  const { width, height } = imageSize(src);

  return (
    <figure className={cn("mt-10", className)}>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-lg border border-border-subtle bg-white p-3 transition-colors duration-200 hover:border-border-strong light:border-border-default light:shadow-lift-1 sm:p-4"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 1023px) 100vw, 640px"
          className="h-auto w-full"
        />
      </a>
      <figcaption className="mt-3 text-meta text-text-muted">
        {caption}{" "}
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap text-accent-cyan underline-offset-4 hover:underline"
        >
          Full size ↗
        </a>
      </figcaption>
    </figure>
  );
}
