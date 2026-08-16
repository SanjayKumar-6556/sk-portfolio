import Link from "next/link";
import { Aside, Bleed } from "@/components/layout/shell";
import { CredentialStrip } from "@/components/sections/credentials";
import { HiMapPanel } from "@/components/sections/hi-map-panel";
import { Button } from "@/components/ui/button";
import { resumeSummary } from "@/lib/resume-data";
import { siteConfig } from "@/lib/site-config";

/**
 * Returns a FRAGMENT of three shell children — an identity block that lands in
 * the reading column, an Aside holding the graphic, and a full-width proof
 * band on the row below. Do not wrap it in a <section>: a wrapper would become
 * the only grid child and re-introduce a nested measure, which is how the name
 * ended up colliding with the graphic.
 *
 * ORDER IS LOAD-BEARING. The Aside must be the immediately following sibling
 * of the identity block or grid auto-placement drops it to its own row. The
 * Bleed is third, so it takes row 2 and spans full-start → full-end.
 *
 * THE FIRST SCREEN, and what changed about it. It was five stacked text
 * elements in a 640px column with ~500px of dead air to their right, on a flat
 * ground, and the one piece of evidence on it — the credential strip — was set
 * at 12px muted, the smallest and faintest type in the layout. Now:
 *
 *   1. the ambient layer (mounted in app/(site)/page.tsx, not here) puts his
 *      own simulated 21-cm map behind the whole fold, densest at 62% 8% —
 *      i.e. exactly under the right rail that used to be empty;
 *   2. the availability line is a status chip rather than a bare link, so the
 *      first thing read is an object with an edge;
 *   3. the graphic sits in a framed panel with corner ticks — it reads as a
 *      figure in an instrument, not as a doodle floating in a margin;
 *   4. the proof band spans the full 1152px under both columns and closes the
 *      screen on a card, which is the composition every reference site uses.
 *
 * COPY GATE (RULE 2): nothing here is written. The identity sentence is
 * `resumeSummary` from lib/resume-data.ts — verified against his own résumé —
 * rendered instead of `siteConfig.tagline`, which names no field, no
 * institution and no arc. The proof band is derived in credentials.tsx from
 * about-data, resume-data and the research frontmatter; see the provenance
 * table there. Re-emphasis, not authorship.
 */
export function Hero() {
  return (
    <>
      <div>
        {/*
          A status chip, not a link in running text. The 3px halo on the dot is
          the only glow added on this screen and it is 6px across; the ambient
          budget is otherwise fully allocated (see globals.css §AMBIENT).
        */}
        <Link
          href="/contact"
          className="inline-flex items-center gap-2.5 rounded-full border border-border-subtle bg-surface-card px-3.5 py-1.5 text-meta text-text-secondary shadow-lift-1 transition-colors duration-200 hover:border-accent-cyan/45 hover:text-accent-cyan"
        >
          <span
            aria-hidden
            className="inline-block size-1.5 rounded-full bg-accent-cyan shadow-[0_0_0_3px_rgba(0,209,255,0.16)]"
          />
          Open to AI/ML engineering roles
        </Link>

        {/* The only font-display on the entire site. */}
        <h1 className="mt-6 font-display text-display text-text-primary">
          {siteConfig.professionalName}
        </h1>

        <p className="mt-5 text-lede text-text-secondary">{resumeSummary}</p>

        <div className="mt-8 flex flex-wrap gap-4">
          {/*
            `shadow-glow-cyan` is the --glow-cyan token, which the design
            system declares as "the primary action and nothing else" and which
            was reaching nothing: button.tsx asks for a `glow-cyan` class that
            is defined in no stylesheet, so the site's one intended accent glow
            has been a no-op. Passed additively from the one call site that is
            entitled to it. (The dead class in button.tsx is still there —
            components/ui is not this agent's to edit.)
          */}
          <Button
            href="/projects"
            className="shadow-glow-cyan hover:shadow-[0_0_38px_-6px_rgba(0,209,255,0.6)]"
          >
            View work
          </Button>
          <Button href="/resume" variant="ghost">
            Résumé
          </Button>
        </div>
      </div>

      {/*
        The graphic lives in the right rail, so it cannot overlap the name —
        that collision was a positioning accident, and the grid removes the
        possibility rather than nudging it. `sticky={false}`: it belongs to the
        hero row, it is not a rail that should follow the scroll.

        FLAGGED, NOT DONE — see the report: this SVG is a hand-drawn
        abstraction of a node graph sitting directly on top of a background
        made from his actual simulation output. The framing below is the most
        that can be done without writing a caption, and a caption is copy.
      */}
      <Aside className="self-center" sticky={false}>
        <div className="relative rounded-card border border-border-subtle bg-surface-card p-6 shadow-lift-1">
          <HiMapPanel className="w-full" />
          {/* Corner ticks — the instrument grammar, four hairline Ls. */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-3 top-3 size-3 border-l border-t border-accent-cyan-hairline"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute right-3 top-3 size-3 border-r border-t border-accent-cyan-hairline"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-3 left-3 size-3 border-b border-l border-accent-cyan-hairline"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-3 right-3 size-3 border-b border-r border-accent-cyan-hairline"
          />
        </div>
      </Aside>

      {/* Degree → paper → current role. The arc as three verified facts, at
          the full 1152px, closing the first screen. */}
      <Bleed className="mt-12 lg:mt-14">
        <CredentialStrip />
      </Bleed>
    </>
  );
}
