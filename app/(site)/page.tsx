import { Capabilities } from "@/components/sections/capabilities";
import { CosmicNotesTeaser } from "@/components/sections/cosmic-notes-teaser";
import { CtaFooter } from "@/components/sections/cta-footer";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { MarqueeBand } from "@/components/sections/marquee-band";
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
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <MarqueeBand durationSec={52}>
        BUILDING INTELLIGENT SYSTEMS · COSMOLOGY × AI · BAYESIAN INFERENCE · LLM
        ORCHESTRATION ·
      </MarqueeBand>
      <Capabilities />
      <FeaturedProjects />
      <ResearchStrip />
      <MarqueeBand durationSec={56}>
        READ COSMIC NOTES · LATEST WRITING · EXPLAINING SYSTEMS DEEPLY ·
      </MarqueeBand>
      <CosmicNotesTeaser />
      <CtaFooter />
    </>
  );
}
