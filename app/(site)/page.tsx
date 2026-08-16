import { CtaFooter } from "@/components/sections/cta-footer";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { HeroBackdrop } from "@/components/sections/hero-backdrop";
import { ResearchStrip } from "@/components/sections/research-strip";
import { docMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = docMetadata({
  title: siteConfig.identity,
  description: siteConfig.tagline,
  path: "/",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.professionalName,
  alternateName: siteConfig.identity,
  url: siteConfig.url,
  jobTitle: "AI Engineer",
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.github,
    siteConfig.social.x,
    siteConfig.social.youtube,
  ].filter(Boolean),
};

/**
 * A fragment of shell children — never a wrapper div. Reading order is the
 * hiring argument: who he is and the three facts that prove it, then the
 * shipped work, then the papers in the identical row grammar, then one way to
 * reach him.
 *
 * EVERY SECTION HERE IS OPENABLE. There used to be a "What I do" block between
 * the research strip and the CTA, promising "orchestration layers, eval loops,
 * and guardrailed agents that survive production traffic" and "observability".
 * Nothing on this site demonstrates any of that, and it sat immediately after
 * four rows of specific, checkable evidence — so it read as the one place the
 * page stopped being able to back itself up. Removed rather than rewritten:
 * the page does not need a claims section, and adjectives were never going to
 * beat the work directly above them.
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroBackdrop />
      <Hero />
      <FeaturedProjects />
      <ResearchStrip />
      <CtaFooter />
    </>
  );
}
