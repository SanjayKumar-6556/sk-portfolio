import { PageHeader } from "@/components/layout/page-header";
import { FadeUp } from "@/components/motion/fade-up";
import { Tag } from "@/components/ui/tag";
import {
  beliefPillars,
  skillCategories,
  timelineEntries,
} from "@/lib/about-data";
import { docMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { Brain, Compass, GraduationCap } from "lucide-react";

export const metadata = docMetadata({
  title: "About",
  description: siteConfig.aboutTagline,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-8 md:max-w-4xl">
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
        title="About"
        subtitle={
          <>
            <Tag>{siteConfig.professionalName}</Tag>
            <Tag>{siteConfig.identity}</Tag>
          </>
        }
      />

      <FadeUp>
        <p className="mt-10 font-display text-xl leading-relaxed text-text-primary md:text-2xl">
          Hello, I&apos;m <strong className="text-accent-cyan">Sanjay</strong>
          , an <em className="text-accent-violet not-italic">AI Engineer</em>{" "}
          with a research background in{" "}
          <em className="text-accent-cyan not-italic">cosmology</em> and{" "}
          <em className="text-accent-violet not-italic">
            Bayesian inference
          </em>
          , based in India.
        </p>
      </FadeUp>

      <article className="prose-mdx mt-14 space-y-6 text-[17px] leading-relaxed text-text-secondary md:text-lg">
        <FadeUp>
          <p>
            My path started with a fascination for how mathematical structure
            describes the universe — not as abstraction for its own sake, but as
            a disciplined language for testing ideas against data. That instinct
            carried through graduate training and into industry, where the same
            principles show up in evaluation design, uncertainty communication,
            and systems that have to keep working after the demo ends.
          </p>
        </FadeUp>
        <FadeUp delay={0.05}>
          <p>
            Today I focus on intelligent systems that bridge research rigor and
            production muscle: orchestration for LLM workflows, automation that
            respects operational constraints, and platforms that make AI usage
            observable instead of opaque.
          </p>
        </FadeUp>
      </article>

      <section className="mt-22 md:mt-30">
        <FadeUp>
          <h2 className="font-display text-3xl font-semibold text-text-primary md:text-4xl">
            Origin & journey
          </h2>
        </FadeUp>
        <ol className="relative mt-12 border-l border-border-default pl-8 md:pl-10">
          {timelineEntries.map((entry, i) => (
            <FadeUp key={entry.title} delay={0.06 * i}>
              <li className="mb-12 last:mb-0">
                <span className="absolute -left-[9px] mt-1.5 size-4 rounded-full border-2 border-accent-cyan bg-bg-base md:-left-[11px]" />
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                  {entry.year}
                </p>
                <h3 className="mt-2 font-sans text-xl font-semibold text-text-primary">
                  {entry.title}
                </h3>
                <p className="text-sm text-accent-violet">{entry.org}</p>
                <p className="mt-3 text-text-secondary">{entry.description}</p>
              </li>
            </FadeUp>
          ))}
        </ol>
      </section>

      <section className="mt-22 md:mt-30">
        <FadeUp>
          <h2 className="font-display text-3xl font-semibold text-text-primary md:text-4xl">
            What I believe
          </h2>
        </FadeUp>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {beliefPillars.map((pillar, i) => (
            <FadeUp key={pillar.title} delay={0.06 * i}>
              <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
                {i === 0 ? (
                  <Compass className="h-7 w-7 text-text-muted" strokeWidth={1.25} />
                ) : i === 1 ? (
                  <Brain className="h-7 w-7 text-text-muted" strokeWidth={1.25} />
                ) : (
                  <GraduationCap
                    className="h-7 w-7 text-text-muted"
                    strokeWidth={1.25}
                  />
                )}
                <h3 className="mt-4 font-semibold text-text-primary">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {pillar.body}
                </p>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mt-22 md:mt-30">
        <FadeUp>
          <h2 className="font-display text-3xl font-semibold text-text-primary md:text-4xl">
            Skills & stack
          </h2>
        </FadeUp>
        <div className="mt-8 space-y-6">
          {skillCategories.map((cat, i) => (
            <FadeUp key={cat.label} delay={0.04 * i}>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
                  {cat.label}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mt-22 rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-sm md:mt-30 md:p-10">
        <FadeUp>
          <h2 className="font-display text-2xl font-semibold text-text-primary">
            Currently
          </h2>
          <p className="mt-4 text-text-secondary">
            Shipping portfolio v1, deepening LLM evaluation practices, and
            reading widely across probabilistic ML. Update this block anytime —
            it&apos;s the living heartbeat of the site.
          </p>
        </FadeUp>
      </section>
    </div>
  );
}
