import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Aside } from "@/components/layout/shell";
import { FadeUp } from "@/components/motion/fade-up";
import { ResearchRow } from "@/components/research/research-row";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { getAllResearch } from "@/lib/content";
import { researchTypeLabels } from "@/lib/category-labels";
import { researchMethods } from "@/lib/research-methods";
import { docMetadata } from "@/lib/seo";

export const metadata = docMetadata({
  title: "Research",
  description:
    "Academic roots in cosmology and Bayesian inference, connected to production AI engineering.",
  path: "/research",
});

/**
 * The two document scans that are actually published in public/research/.
 * Keyed by slug so nothing here can invent an artefact that does not exist —
 * a record with no artefact simply gets no thumbnail. Intrinsic pixel sizes
 * are the files' own, so the browser reserves the right box and nothing shifts.
 *
 * The same map is repeated in research/[slug]/page.tsx: a shared module would
 * have to live in lib/, which is outside this page's remit.
 */
const artefacts: Record<
  string,
  { src: string; width: number; height: number; alt: string }
> = {
  "msc-thesis": {
    src: "/research/msc-thesis-cover.webp",
    width: 910,
    height: 1287,
    alt: "Title page of the M.Sc. thesis",
  },
  "iitm-poster-2024": {
    src: "/research/iitm-poster-preview.webp",
    width: 1656,
    height: 2341,
    alt: "The 21-cm Cosmology Workshop poster",
  },
};

export default function ResearchPage() {
  const items = getAllResearch().sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const withArtefacts = items.filter((r) => artefacts[r.slug]);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Research" }]}
        title="Research"
        purpose="My foundation is in physics and probabilistic modeling — especially where rigorous inference meets messy data. That lens carries into how I design evaluations and communicate uncertainty in applied AI."
      />

      <FadeUp className="mt-10">
        <ul className="space-y-4 hover:[&>li:not(:hover)]:opacity-55">
          {items.map((r) => (
            <ResearchRow key={r.slug} item={r} headingLevel="h2" />
          ))}
        </ul>
      </FadeUp>

      {withArtefacts.length > 0 ? (
        <Aside className="mt-10">
          <p className="font-mono text-label uppercase text-text-muted">
            Documents
          </p>
          <ul className="mt-4 space-y-6">
            {withArtefacts.map((r) => {
              const a = artefacts[r.slug];
              return (
                <li key={r.slug}>
                  <Link href={`/research/${r.slug}`} className="group block">
                    <Image
                      src={a.src}
                      alt={a.alt}
                      width={a.width}
                      height={a.height}
                      sizes="190px"
                      className="w-[190px] rounded-sm border border-border-subtle opacity-80 transition duration-200 group-hover:border-border-strong group-hover:opacity-100"
                    />
                    <p className="mt-2 font-mono text-label uppercase text-text-secondary transition-colors duration-200 group-hover:text-accent-cyan">
                      {researchTypeLabels[r.type]}
                      <span aria-hidden> · </span>
                      {r.year}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Aside>
      ) : null}

      <FadeUp className="mt-16 md:mt-24 lg:mt-32">
        <section>
          <SectionHeading>Methods I use</SectionHeading>
          <ul className="mt-8 flex flex-wrap gap-2">
            {researchMethods.map((m) => (
              <li key={m}>
                <Tag>{m}</Tag>
              </li>
            ))}
          </ul>
        </section>
      </FadeUp>
    </>
  );
}
