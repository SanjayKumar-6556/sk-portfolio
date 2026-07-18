import Link from "next/link";
import { FadeUp } from "@/components/motion/fade-up";
import { Tag } from "@/components/ui/tag";
import { researchTypeLabels } from "@/lib/category-labels";
import { getAllResearch } from "@/lib/content";

export async function ResearchStrip() {
  const items = getAllResearch().slice(0, 5);

  return (
    <section className="border-y border-white/[0.06] bg-black py-22 md:py-30">
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-text-primary md:text-4xl">
            Research
          </h2>
          <Link
            href="/research"
            className="text-sm font-medium text-accent-cyan hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-sm"
          >
            View research →
          </Link>
        </FadeUp>
        <div className="mt-10 flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((r, i) => (
            <FadeUp
              key={r.slug}
              delay={0.05 * i}
              className="min-w-[280px] max-w-[340px] shrink-0 md:min-w-[320px]"
            >
              <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-colors hover:border-accent-cyan/20">
                <Tag>{researchTypeLabels[r.type]}</Tag>
                <h3 className="mt-4 font-display text-lg font-medium text-text-primary">
                  {r.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-text-muted">
                  {r.venue} · {r.year}
                </p>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-text-secondary">
                  {r.abstract}
                </p>
                <Link
                  href={`/research/${r.slug}`}
                  className="mt-auto pt-4 text-sm font-medium text-accent-violet hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-violet rounded-sm"
                >
                  Read more →
                </Link>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
