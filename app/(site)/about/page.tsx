import { PageHeader } from "@/components/layout/page-header";
import { Aside } from "@/components/layout/shell";
import { FadeUp } from "@/components/motion/fade-up";
import { CredentialPanel } from "@/components/sections/credentials";
import { CtaFooter } from "@/components/sections/cta-footer";
import { SectionHeading } from "@/components/ui/section-heading";
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

export const metadata = docMetadata({
  title: "About",
  description: aboutLede,
  path: "/about",
});

/**
 * Lane grammar: violet marks research provenance, cyan marks shipped
 * engineering, muted marks training. Only ever at 12px on a mono label, so it
 * stays a semantic marker rather than a second accent.
 */
const laneText: Record<Lane, string> = {
  research: "text-accent-violet",
  system: "text-accent-cyan",
  study: "text-text-muted",
};

const laneDot: Record<Lane, string> = {
  research: "border-accent-violet",
  system: "border-accent-cyan",
  study: "border-border-strong",
};

/**
 * A fragment of shell children — no wrapper, no measure, no padding. The page
 * used to open with a 68px all-caps ABOUT, a chip repeating the name that the
 * header already shows, and a display-face restatement of the lede below it:
 * three elements before the first fact. `aboutLede` is now the header's purpose
 * line, so the first paragraph of the journey is roughly where the old title
 * ended.
 */
export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title="About"
        purpose={aboutLede}
      />

      <section className="mt-10">
        <FadeUp>
          <div className="space-y-6 text-body text-text-secondary">
            {journeyParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </FadeUp>
      </section>

      {/*
        Must stay the immediately following sibling of the section above — grid
        auto-placement only puts it on that row if it is next. Hidden below
        1024; the same three facts are stated in the prose beside it.
      */}
      <Aside>
        <CredentialPanel />
      </Aside>

      <section className="mt-16 md:mt-24 lg:mt-32">
        <FadeUp>
          <SectionHeading>The route</SectionHeading>
          <ol className="relative mt-10 border-l border-border-default pl-8">
            {timelineEntries.map((entry) => (
              <li key={entry.id} className="relative pb-10 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute -left-8 top-1 size-3.5 -translate-x-1/2 rounded-full border-2 bg-bg-base ${laneDot[entry.lane]}`}
                />
                <p className="flex flex-wrap items-center gap-x-2 font-mono text-label uppercase">
                  <span className={laneText[entry.lane]}>
                    {laneLabel[entry.lane]}
                  </span>
                  <span aria-hidden className="text-border-strong">
                    ·
                  </span>
                  <span className="text-text-muted">{entry.org}</span>
                  {entry.period ? (
                    <>
                      <span aria-hidden className="text-border-strong">
                        ·
                      </span>
                      <span className="text-text-muted">{entry.period}</span>
                    </>
                  ) : null}
                </p>
                <h3 className="mt-2 text-h3 text-text-primary">
                  {entry.title}
                </h3>
                <p className="mt-3 text-body text-text-secondary">
                  {entry.body}
                </p>
              </li>
            ))}
          </ol>
        </FadeUp>
      </section>

      <section className="mt-16 md:mt-24 lg:mt-32">
        <FadeUp>
          <SectionHeading>What carried over</SectionHeading>
          {/* Claims, not openable evidence — so an unruled stack, not rows. */}
          <ul className="mt-8 space-y-8">
            {whatCarriedOver.map((item) => (
              <li key={item.title}>
                <h3 className="text-h3 text-text-primary">{item.title}</h3>
                <p className="mt-3 text-sec text-text-secondary">{item.body}</p>
              </li>
            ))}
          </ul>
        </FadeUp>
      </section>

      <section className="mt-16 md:mt-24 lg:mt-32">
        <FadeUp>
          <SectionHeading>Tools I have actually used</SectionHeading>
          <div className="mt-8 space-y-8">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-label uppercase text-text-muted">
                  {group.label}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      <section className="mt-16 md:mt-24 lg:mt-32">
        <FadeUp>
          <SectionHeading>Currently</SectionHeading>
          <p className="mt-6 text-body text-text-secondary">{currentlyBody}</p>
        </FadeUp>
      </section>

      <CtaFooter />
    </>
  );
}
