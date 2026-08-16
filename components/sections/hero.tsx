import Link from "next/link";
import { Aside } from "@/components/layout/shell";
import { CredentialStrip } from "@/components/sections/credentials";
import { CosmicNodeFallback } from "@/components/three/cosmic-node-fallback";
import { Button } from "@/components/ui/button";
import { resumeSummary } from "@/lib/resume-data";
import { siteConfig } from "@/lib/site-config";

/**
 * Returns a FRAGMENT of two shell children — an identity block that lands in
 * the reading column and an Aside holding the graphic. Do not wrap it in a
 * <section>: a wrapper would become the only grid child and re-introduce a
 * nested measure, which is how the name ended up colliding with the graphic.
 *
 * COPY GATE (RULE 2): nothing here is written. The identity sentence is
 * `resumeSummary` from lib/resume-data.ts — verified against his own résumé —
 * rendered instead of `siteConfig.tagline`, which names no field, no
 * institution and no arc. The proof strip is derived in credentials.tsx from
 * about-data, resume-data and the research frontmatter; see the provenance
 * table there. Re-emphasis, not authorship.
 */
export function Hero() {
  return (
    <>
      <div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-meta text-text-secondary transition-colors duration-200 hover:text-accent-cyan"
        >
          <span
            aria-hidden
            className="inline-block size-1.5 rounded-full bg-accent-cyan"
          />
          Open to AI/ML engineering roles
        </Link>

        {/* The only font-display on the entire site. */}
        <h1 className="mt-6 font-display text-display text-text-primary">
          {siteConfig.professionalName}
        </h1>

        <p className="mt-5 text-lede text-text-secondary">{resumeSummary}</p>

        {/* Degree → paper → current role. The arc as three verified facts. */}
        <CredentialStrip className="mt-6" />

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/projects">View work</Button>
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
      */}
      <Aside className="self-center" sticky={false}>
        <CosmicNodeFallback
          idPrefix="hero-graphic"
          className="w-full max-w-[300px]"
        />
      </Aside>
    </>
  );
}
