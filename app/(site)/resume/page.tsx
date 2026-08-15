import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
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
 * that was never meant for them. Drop the PDF in and both the button and the note
 * appear on their own.
 */
const resumePdfExists = fs.existsSync(
  path.join(/* turbopackIgnore: true */ process.cwd(), "public", siteConfig.resumePdfPath),
);

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-8 print:max-w-none">
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Resume" },
        ]}
        title="Resume"
      />
      <div className="print:hidden mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
        {resumePdfExists && (
          <Button href={siteConfig.resumePdfPath} variant="primary">
            Download PDF
          </Button>
        )}
        <Button
          href={siteConfig.social.linkedin}
          variant={resumePdfExists ? "secondary" : "primary"}
        >
          View on LinkedIn
        </Button>
      </div>

      <div className="resume-print mt-14 space-y-12 text-text-secondary print:text-black">
        <section>
          <h2 className="border-b border-border-default pb-2 font-display text-xl text-text-primary print:border-black print:text-black">
            Summary
          </h2>
          <p className="mt-4 leading-relaxed">{resumeSummary}</p>
        </section>

        <section>
          <h2 className="border-b border-border-default pb-2 font-display text-xl text-text-primary print:border-black print:text-black">
            Experience
          </h2>
          <ul className="mt-6 space-y-8">
            {experience.map((job) => (
              <li key={job.org}>
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                  <h3 className="font-semibold text-text-primary print:text-black">
                    {job.role}
                  </h3>
                  <span className="font-mono text-xs text-text-muted print:text-black">
                    {job.period}
                  </span>
                </div>
                <p className="text-sm text-accent-violet print:text-black">
                  {job.org}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="border-b border-border-default pb-2 font-display text-xl text-text-primary print:border-black print:text-black">
            Education
          </h2>
          <ul className="mt-6 space-y-6">
            {education.map((e) => (
              <li key={e.school}>
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                  <h3 className="font-semibold text-text-primary print:text-black">
                    {e.degree}
                  </h3>
                  <span className="font-mono text-xs text-text-muted print:text-black">
                    {e.period}
                  </span>
                </div>
                <p className="text-sm">{e.school}</p>
                <p className="mt-1 text-sm">{e.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="border-b border-border-default pb-2 font-display text-xl text-text-primary print:border-black print:text-black">
            Selected projects
          </h2>
          <ul className="mt-4 list-disc space-y-1 pl-5">
            {selectedProjects.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="border-b border-border-default pb-2 font-display text-xl text-text-primary print:border-black print:text-black">
            Research
          </h2>
          <ul className="mt-4 list-disc space-y-1 pl-5">
            {resumeResearch.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="border-b border-border-default pb-2 font-display text-xl text-text-primary print:border-black print:text-black">
            Talks & workshops
          </h2>
          <ul className="mt-4 list-disc space-y-1 pl-5">
            {talks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="border-b border-border-default pb-2 font-display text-xl text-text-primary print:border-black print:text-black">
            Skills
          </h2>
          <p className="mt-4 leading-relaxed">{resumeSkills}</p>
        </section>

        <p className="text-center text-sm text-text-muted print:hidden">
          <Link href="/contact" className="text-accent-cyan hover:underline">
            Contact →
          </Link>
        </p>
      </div>
    </div>
  );
}
