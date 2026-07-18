import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { FadeUp } from "@/components/motion/fade-up";
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

export default function ResearchPage() {
  const items = getAllResearch().sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-8">
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Research" },
        ]}
        title="Research"
      />
      <FadeUp>
        <p className="mt-10 text-lg leading-relaxed text-text-secondary md:text-xl">
          My foundation is in physics and probabilistic modeling — especially
          where rigorous inference meets messy data. That lens carries into how
          I design evaluations and communicate uncertainty in applied AI.
        </p>
      </FadeUp>

      <ul className="mt-16 flex flex-col gap-12">
        {items.map((r, i) => (
          <FadeUp key={r.slug} delay={0.05 * i}>
            <li className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
              <Tag>{researchTypeLabels[r.type]}</Tag>
              <h2 className="mt-4 font-display text-2xl font-medium text-text-primary md:text-3xl">
                <Link
                  href={`/research/${r.slug}`}
                  className="hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-sm"
                >
                  {r.title}
                </Link>
              </h2>
              <p className="mt-2 font-mono text-xs text-text-muted">
                {r.venue} · {r.year}
              </p>
              <p className="mt-4 text-text-secondary">{r.abstract}</p>
              <div className="mt-6 flex flex-wrap gap-4 font-mono text-sm">
                {r.pdf ? (
                  <Link
                    href={r.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-cyan hover:underline"
                  >
                    PDF
                  </Link>
                ) : null}
                {r.slides ? (
                  <Link
                    href={r.slides}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-cyan hover:underline"
                  >
                    Slides
                  </Link>
                ) : null}
                {r.code ? (
                  <Link
                    href={r.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-violet hover:underline"
                  >
                    Code
                  </Link>
                ) : null}
                {r.bibtex ? (
                  <Link
                    href={r.bibtex}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-text-secondary hover:underline"
                  >
                    BibTeX
                  </Link>
                ) : null}
              </div>
            </li>
          </FadeUp>
        ))}
      </ul>

      <section className="mt-22 md:mt-30">
        <FadeUp>
          <h2 className="font-display text-2xl font-medium text-text-primary md:text-3xl">
            Methods I use
          </h2>
        </FadeUp>
        <div className="mt-8 flex flex-wrap gap-2">
          {researchMethods.map((m, i) => (
            <FadeUp key={m} delay={0.03 * i}>
              <Tag>{m}</Tag>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}
