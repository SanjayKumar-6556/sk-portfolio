import { PageHeader } from "@/components/layout/page-header";
import { FadeUp } from "@/components/motion/fade-up";
import { Tag } from "@/components/ui/tag";
import {
  aboutLede,
  currentlyBody,
  journeyParagraphs,
  laneLabel,
  skillGroups,
  timelineEntries,
  whatCarriedOver,
  type Lane,
} from "@/lib/about-data";
import { docMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = docMetadata({
  title: "About",
  description: aboutLede,
  path: "/about",
});

/**
 * Lane grammar: violet marks research provenance, cyan marks shipped
 * engineering, muted marks training. Links stay cyan everywhere.
 */
const laneChip: Record<Lane, string> = {
  research: "border-accent-violet/35 text-accent-violet",
  system: "border-accent-cyan/30 text-accent-cyan",
  study: "border-border-default text-text-muted",
};

const laneDot: Record<Lane, string> = {
  research: "border-accent-violet",
  system: "border-accent-cyan",
  study: "border-border-strong",
};

export default function AboutPage() {
  return (
    /* Single prose measure for the whole page (design: --measure-prose, 68ch). */
    <div className="mx-auto w-full max-w-[68ch] px-6 pb-24 pt-8">
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title="About"
        subtitle={<Tag>{siteConfig.professionalName}</Tag>}
      />

      <FadeUp>
        <p className="mt-10 font-display text-xl leading-snug text-text-primary md:text-2xl">
          {aboutLede}
        </p>
      </FadeUp>

      <div className="mt-12 space-y-6 text-[1.0625rem] leading-[1.7] text-text-secondary">
        {journeyParagraphs.map((paragraph, i) => (
          <FadeUp key={i} delay={0.04 * i}>
            <p>{paragraph}</p>
          </FadeUp>
        ))}
      </div>

      <section className="mt-22 md:mt-30">
        <FadeUp>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-text-primary md:text-4xl">
            The route
          </h2>
        </FadeUp>
        <ol className="relative mt-10 border-l border-border-default pl-8 md:pl-10">
          {timelineEntries.map((entry, i) => (
            <li key={entry.id} className="relative mb-12 last:mb-0">
              <FadeUp delay={0.06 * i}>
                <span
                  aria-hidden
                  className={`absolute -left-10 top-1.5 size-4 rounded-full border-2 bg-bg-base md:-left-12 ${laneDot[entry.lane]}`}
                />
                <div className="flex flex-wrap items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em]">
                  <span
                    className={`rounded-full border px-2 py-0.5 ${laneChip[entry.lane]}`}
                  >
                    {laneLabel[entry.lane]}
                  </span>
                  <span className="text-text-muted">{entry.org}</span>
                  {entry.period ? (
                    <span className="text-text-muted">{entry.period}</span>
                  ) : null}
                </div>
                <h3 className="mt-3 font-sans text-xl font-semibold text-text-primary">
                  {entry.title}
                </h3>
                <p className="mt-3 text-[1.0625rem] leading-[1.7] text-text-secondary">
                  {entry.body}
                </p>
              </FadeUp>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-22 md:mt-30">
        <FadeUp>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-text-primary md:text-4xl">
            What carried over
          </h2>
        </FadeUp>
        <ul className="mt-10 space-y-4">
          {whatCarriedOver.map((item, i) => (
            <li key={item.title}>
              <FadeUp delay={0.06 * i}>
                <article className="rounded-2xl border border-border-default bg-white/[0.04] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
                  <h3 className="font-sans font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.6] text-text-secondary">
                    {item.body}
                  </p>
                </article>
              </FadeUp>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-22 md:mt-30">
        <FadeUp>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-text-primary md:text-4xl">
            Tools I have actually used
          </h2>
        </FadeUp>
        <div className="mt-8 space-y-6">
          {skillGroups.map((group, i) => (
            <FadeUp key={group.label} delay={0.04 * i}>
              <div>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-text-muted">
                  {group.label}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mt-22 rounded-2xl border border-border-default bg-white/[0.04] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-sm md:mt-30 md:p-10">
        <FadeUp>
          <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-text-primary">
            Currently
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-[1.7] text-text-secondary">
            {currentlyBody}
          </p>
        </FadeUp>
      </section>
    </div>
  );
}
