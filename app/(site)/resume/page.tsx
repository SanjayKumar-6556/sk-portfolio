import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { Ambient } from "@/components/ambient/ambient";
import { PageHeader } from "@/components/layout/page-header";
import { Aside } from "@/components/layout/shell";
import { PrintButton } from "@/components/ui/print-button";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  education,
  experience,
  resumeResearch,
  resumeSkills,
  resumeSummary,
  selectedProjects,
  talks,
} from "@/lib/resume-data";
import { docMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = docMetadata({
  title: "Resume",
  description:
    "Online resume for Sanjay Kumar Yadav — AI engineer with a research background.",
  path: "/resume",
});

/**
 * Whether the PDF is actually there, resolved once at build time.
 *
 * The page used to render a "Download PDF" button unconditionally, plus a note
 * addressed to the site's owner telling him where to put the file. public/resume/
 * held only a .gitkeep, so visitors got a prominent button that 404s and a note
 * that was never meant for them. Drop the PDF in and the link appears on its own.
 */
const resumePdfExists = fs.existsSync(
  path.join(/* turbopackIgnore: true */ process.cwd(), "public", siteConfig.resumePdfPath),
);

/** Anchor targets for the right-rail index. Order matches the document. */
const sections = [
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "selected-projects", label: "Selected projects" },
  { id: "research", label: "Research" },
  { id: "talks", label: "Talks & workshops" },
  { id: "skills", label: "Skills" },
] as const;

const actionPill =
  "inline-flex min-h-11 items-center rounded-full border border-border-default px-5 font-mono text-label uppercase text-text-primary transition-colors duration-200 hover:border-border-strong hover:text-accent-cyan";

/** A ruled list of one-line entries — the same row grammar the rest of the site uses. */
function RuledList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-8 border-t border-border-subtle print:mt-4">
      {items.map((item) => (
        <li
          key={item}
          className="border-b border-border-subtle py-4 text-sec text-text-secondary print:break-inside-avoid print:py-1.5"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

const sectionSpacing = "mt-16 scroll-mt-24 md:mt-24 lg:mt-32 print:mt-8";

export default function ResumePage() {
  // The skills string is already `·`-separated by discipline in resume-data.ts;
  // splitting on that separator turns one unreadable paragraph into six scannable
  // rows without changing a character of the copy.
  const skillGroups = resumeSkills.split(" · ");

  return (
    <>
      {/*
        `quiet` — grain at 0.018 and one weak cyan source. No plate, because
        this page's primary output medium is paper: it has a print-only
        document head below, a print-scoped wrapper that blackens every token
        colour, and globals.css forces `body { background: #fff }` for print.
        Ambience here is a liability, so it gets just enough not to read as a
        different site on screen. `.ambient` carries `print:hidden`, which the
        print block resolves to `display: none !important` — verified: nothing
        from this layer reaches paper.
      */}
      <Ambient variant="quiet" />
      <PageHeader
        className="print:hidden"
        crumbs={[{ label: "Home", href: "/" }, { label: "Resume" }]}
        title="Resume"
        purpose={resumeSummary}
      />

      {/* Print gets a proper document head instead of a breadcrumb: a printed
          résumé must open with the name and how to reach him. */}
      <div className="hidden print:block print:text-black">
        <h1 className="text-h1">{siteConfig.professionalName}</h1>
        <p className="mt-2 font-mono text-meta">
          {siteConfig.email}
          <span aria-hidden> · </span>
          {siteConfig.social.linkedin}
          <span aria-hidden> · </span>
          {siteConfig.social.github}
        </p>
        <p className="mt-4 text-sec">{resumeSummary}</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 print:hidden">
        {resumePdfExists ? (
          <a href={siteConfig.resumePdfPath} className={actionPill}>
            Download PDF ↗
          </a>
        ) : null}
        <PrintButton className={actionPill} />
        <a
          href={siteConfig.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={actionPill}
        >
          View on LinkedIn ↗
        </a>
      </div>

      {/*
        One wrapper so print can be scoped in a single place:
          text-black       — the print stylesheet whitens the page, and every token
                             colour would otherwise stay light grey on paper.
          border-black/15  — the hairlines are white-on-dark rgba and vanish on paper.
          [&_h2+a]:hidden  — SectionHeading's optional "All projects →" link is the
                             `a` directly after its `h2`. A navigation link means
                             nothing in a printed résumé.
      */}
      <div className="mt-14 print:mt-8 print:text-black print:[&_*]:border-black/15 print:[&_*]:text-black print:[&_h2+a]:hidden">
        <section id="experience" className="scroll-mt-24">
          <SectionHeading>Experience</SectionHeading>
          <ul className="mt-10 border-t border-border-subtle print:mt-4">
            {experience.map((job) => (
              <li
                key={job.org}
                className="border-b border-border-subtle py-7 print:break-inside-avoid print:py-4"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-h3 text-text-primary">{job.role}</h3>
                  <span className="shrink-0 font-mono text-label text-text-muted">
                    {job.period}
                  </span>
                </div>
                <p className="mt-2 font-mono text-label uppercase text-accent-cyan">
                  {job.org}
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sec text-text-secondary">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section id="education" className={sectionSpacing}>
          <SectionHeading>Education</SectionHeading>
          <ul className="mt-10 border-t border-border-subtle print:mt-4">
            {education.map((e) => (
              <li
                key={e.school}
                className="border-b border-border-subtle py-7 print:break-inside-avoid print:py-4"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-h3 text-text-primary">{e.degree}</h3>
                  <span className="shrink-0 font-mono text-label text-text-muted">
                    {e.period}
                  </span>
                </div>
                <p className="mt-2 font-mono text-label uppercase text-accent-cyan">
                  {e.school}
                </p>
                <p className="mt-3 text-sec text-text-secondary">{e.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="selected-projects" className={sectionSpacing}>
          <SectionHeading href="/projects" linkLabel="All projects →">
            Selected projects
          </SectionHeading>
          <RuledList items={selectedProjects} />
        </section>

        <section id="research" className={sectionSpacing}>
          <SectionHeading href="/research" linkLabel="All research →">
            Research
          </SectionHeading>
          <RuledList items={resumeResearch} />
        </section>

        <section id="talks" className={sectionSpacing}>
          <SectionHeading>Talks &amp; workshops</SectionHeading>
          <RuledList items={talks} />
        </section>

        <section id="skills" className={sectionSpacing}>
          <SectionHeading>Skills</SectionHeading>
          <RuledList items={skillGroups} />
        </section>

        <p className="mt-16 text-meta text-text-muted print:hidden">
          <Link
            href="/contact"
            className="text-accent-cyan underline-offset-4 hover:underline"
          >
            Contact →
          </Link>
        </p>
      </div>

      <Aside className="mt-14">
        <p className="font-mono text-label uppercase text-text-muted">
          On this page
        </p>
        <ul className="mt-4 space-y-3">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-meta text-text-muted transition-colors duration-200 hover:text-accent-cyan"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Aside>
    </>
  );
}
