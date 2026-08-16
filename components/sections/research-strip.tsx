import { Bleed } from "@/components/layout/shell";
import { ResearchRow } from "@/components/research/research-row";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllResearch } from "@/lib/content";

/**
 * The papers, in the IDENTICAL row grammar `FeaturedProjects` uses three rows
 * above. That adjacency is the whole argument: a hiring manager scanning the
 * home page reads "JCAP 12 (2025) 055" and "Next.js / FastAPI / Google Sheets"
 * in one voice and infers the arc without being told it.
 *
 * Was a horizontal-scroll carousel of glass cards with its own max-w-6xl, its
 * own black band and violet "Read more →" links — three grammars nothing else
 * on the site used, and a scroll direction nobody discovers.
 *
 * Three across the full 1152px, matching the work grid above it. `Bleed`
 * keeps the same left edge as the prose, so widening changes nothing about
 * the alignment.
 */
export function ResearchStrip() {
  const items = [...getAllResearch()]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 3);

  if (items.length === 0) return null;

  return (
    <Bleed as="section" className="mt-16 md:mt-24 lg:mt-32">
      <div className="reveal">
        <SectionHeading href="/research" linkLabel="All research →">
          Research
        </SectionHeading>
        <ul className="mt-10 grid gap-4 transition-opacity lg:grid-cols-3 hover:[&>li:not(:hover)]:opacity-55">
          {items.map((item) => (
            <ResearchRow key={item.slug} item={item} />
          ))}
        </ul>
      </div>
    </Bleed>
  );
}
