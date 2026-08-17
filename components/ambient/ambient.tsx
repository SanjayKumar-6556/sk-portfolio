import { preload } from "react-dom";

/**
 * THE AMBIENT LAYER — "the reionization field".
 *
 * All of the styling lives in the `AMBIENT` block of app/globals.css; this
 * file only decides which layers exist for a route and which image to hint.
 *
 * A SERVER COMPONENT, deliberately. There is no "use client" here and there
 * must never be one: every layer is CSS, the motion is CSS scroll-driven
 * animation, and the total JavaScript this adds to every route is 0 bytes.
 *
 * WHERE IT GOES: the FIRST CHILD of a page fragment. A `fixed` element is not
 * a grid item (out-of-flow boxes do not participate in grid layout), so it
 * consumes no `.shell` row and needs no bleed exception.
 *
 * DO NOT change `fixed` to `absolute` in globals.css. That would make it a
 * grid item, insert an empty row, and position it against the initial
 * containing block.
 *
 * DO NOT nest it inside a `.reveal`, a `FadeUp`, or any other transformed
 * ancestor: a transform is a containing block for fixed descendants.
 *
 * FAILURE STATES, all three of which are "visible and static", never blank:
 *   - no JavaScript            → unchanged; nothing here is scripted
 *   - no scroll-timeline support → the variant's designated plate sits at its
 *                                base opacity and nothing moves
 *   - prefers-reduced-motion   → same
 *   - a missing /backgrounds/*.webp → the background-image 404s and the layer
 *                                is simply transparent over the mesh
 */
export type AmbientVariant =
  | "home"
  | "research"
  | "about"
  | "projects"
  | "doc"
  | "contact"
  | "quiet";

type Plate = "early" | "mid" | "late";

/**
 * Which of his three 21-cm maps each route paints, in DOM order.
 * Routes with more than one plate cross-fade between them on scroll —
 * x_HI 0.88 → 0.63 → 0.29, i.e. scrolling the page advances reionization.
 */
const PLATES: Record<AmbientVariant, readonly Plate[]> = {
  home: ["mid", "late"],
  research: ["early", "mid", "late"],
  about: ["late"],
  contact: ["late"],
  projects: [],
  doc: [],
  quiet: [],
};

/**
 * The plate that is visible at scroll 0, hinted early — a CSS background is
 * otherwise discovered only after the stylesheet has parsed.
 *
 * `media` mirrors the breakpoint rules in globals.css exactly, so a phone
 * never preloads a desktop-only map. Below 1024 /research paints `mid`, not
 * `early`, because the three-plate sequence is desktop-only.
 *
 * THESE HINT THE DARK PLATES ONLY, and that is correct rather than an
 * oversight. Each plate has a light twin (see PROVENANCE.md), but the theme
 * is carried by a `data-theme` attribute and `media` cannot express one — and
 * these pages are statically prerendered, so the <link rel=preload> is baked
 * into the HTML at build time and no runtime check can vary it without making
 * the route dynamic and costing all 21 static pages.
 *
 * Since dark is the unconditional default, the dark file is the right hint for
 * every visitor except the minority who have explicitly chosen light. Those
 * get one wasted hint and then fetch the twin normally. Hinting both would
 * cost every visitor a plate they will never paint, which is the worse trade.
 */
const HINTS: Record<
  AmbientVariant,
  readonly { href: string; media?: string }[]
> = {
  home: [{ href: "/backgrounds/eor-mid.webp" }],
  research: [
    { href: "/backgrounds/eor-early.webp", media: "(min-width: 64rem)" },
    { href: "/backgrounds/eor-mid.webp", media: "(max-width: 63.99rem)" },
  ],
  about: [{ href: "/backgrounds/eor-late.webp" }],
  contact: [{ href: "/backgrounds/eor-late.webp" }],
  projects: [],
  doc: [],
  quiet: [],
};

export function Ambient({ variant }: { variant: AmbientVariant }) {
  for (const hint of HINTS[variant]) {
    preload(hint.href, {
      as: "image",
      fetchPriority: "high",
      media: hint.media,
    });
  }

  const plates = PLATES[variant];

  return (
    <div className="ambient print:hidden" data-ambient={variant} aria-hidden>
      <div className="ambient__mesh" />
      {/*
        The one layer that moves on its own. Everything else here is static or
        scroll-linked, so a visitor who lands and does not scroll saw a still
        page. Density is per-variant via --ambient-aurora-opacity; the document
        pages turn it most of the way down rather than off, and print hides the
        whole layer.
      */}
      <div className="ambient__aurora" />
      {plates.length > 0 ? (
        <div className="ambient__plates">
          {plates.map((plate) => (
            <div
              key={plate}
              className={`ambient__plate ambient__plate--${plate}`}
            />
          ))}
        </div>
      ) : null}
      {/*
        Always rendered; CSS decides where it shows. On dark it is /projects
        only, as it always was — instrumentation for the automation and scraper
        work, where an EoR map would be a non-sequitur. On light it is the
        ground itself: the page sits on drafting paper and the cards are sheets
        laid on it. Keeping the decision in CSS rather than here is what lets
        one server-rendered tree serve both, at zero JavaScript.
      */}
      <div className="ambient__grid" />
      <div className="ambient__grain" />
      <div className="ambient__vignette" />
    </div>
  );
}
