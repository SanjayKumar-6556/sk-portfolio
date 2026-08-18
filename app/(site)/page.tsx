import { Ambient } from "@/components/ambient/ambient";
import { CtaFooter } from "@/components/sections/cta-footer";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { ResearchStrip } from "@/components/sections/research-strip";
import { education, experience, resumeSkills } from "@/lib/resume-data";
import { docMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

/**
 * The search-result snippet and the link unfurl — 156 characters, inside the
 * ~160 Google renders. Sentence 1 is components/sections/hero.tsx verbatim (the
 * only line on the site that states what job he wants, and it reached no
 * metadata at all). Sentence 2 is the first clause of resumeSummary. The final
 * clause is content/research/bnn-cosmology.mdx ("I am the **second author of
 * nine**") joined to that file's `venue`. Nothing composed.
 */
export const metadata = docMetadata({
  title: siteConfig.seoRole,
  description:
    "Open to AI/ML engineering roles. AI/ML engineer with a research background in cosmology and Bayesian inference; second author of nine on JCAP 12 (2025) 055.",
  path: "/",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.professionalName,
  alternateName: siteConfig.identity,
  url: siteConfig.url,
  // lib/resume-data.ts sets the precedence rule — the newest résumé wins.
  // Hard-coding "AI Engineer" here made a fourth spelling of the same job.
  jobTitle: experience[0].role,
  alumniOf: { "@type": "CollegeOrUniversity", name: education[0].school },
  worksFor: { "@type": "Organization", name: experience[0].org },
  knowsAbout: resumeSkills
    .replace(/\.$/, "")
    .split(" · ")
    .flatMap((g) => g.split(", ")),
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
 *
 * <Ambient> is the first child and must stay the first child: it is
 * `position: fixed`, so it is not a grid item and costs no .shell row, and it
 * must not end up inside a `.reveal` (a transform is a containing block for
 * fixed descendants). `variant="home"` is the strongest ambience on the site —
 * his own 21-cm map at x_HI 0.63 cross-fading to 0.29 as the page scrolls.
 */
export default function HomePage() {
  return (
    <>
      <Ambient variant="home" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <FeaturedProjects />
      <ResearchStrip />
      <CtaFooter />
    </>
  );
}
