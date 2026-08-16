import Link from "next/link";
import { timelineEntries } from "@/lib/about-data";
import { getAllResearch } from "@/lib/content";
import { experience } from "@/lib/resume-data";

/**
 * THE PROOF, DERIVED — NOT WRITTEN.
 *
 * RULE 2 forbids editing content/**, lib/resume-data.ts and lib/about-data.ts,
 * and the design's copy gate forbids synthesising credentials. Nothing here is
 * synthesised: every string below is read verbatim out of a verified source and
 * only ever joined with punctuation.
 *
 *   value "MSc, Astronomy"          lib/about-data.ts  timelineEntries#msc.title
 *   detail "IIT Indore"             lib/about-data.ts  timelineEntries#msc.org
 *   value "JCAP 12 (2025) 055"      content/research/bnn-cosmology.mdx  venue
 *   value "AI/ML Software Engineer" lib/resume-data.ts experience[0].role
 *   detail "Nestack Technologies"   lib/resume-data.ts experience[0].org
 *   period "Mar 2025 — Present"     lib/resume-data.ts experience[0].period
 *
 * `label` ("Education" / "Published" / "Now") is structural UI, not a claim.
 *
 * The order is the argument: degree → paper → current role is the
 * physics→cosmology→AI arc stated as three facts, in one line, above the fold.
 * If the résumé or the research frontmatter changes, this follows automatically.
 */
export type Credential = {
  label: string;
  value: string;
  detail?: string;
  period?: string;
  href?: string;
};

export function getCredentials(): Credential[] {
  const out: Credential[] = [];

  const msc = timelineEntries.find((e) => e.id === "msc");
  if (msc) {
    out.push({ label: "Education", value: msc.title, detail: msc.org });
  }

  const paper = getAllResearch().find((r) => r.type === "paper");
  if (paper) {
    out.push({
      label: "Published",
      value: paper.venue,
      href: `/research/${paper.slug}`,
    });
  }

  const now = experience[0];
  if (now) {
    out.push({
      label: "Now",
      value: now.role,
      detail: now.org,
      period: now.period,
    });
  }

  return out;
}

/**
 * The hero's one-line proof strip: mono, slash-separated, wrapping to two lines
 * in the 640px reading column. Same "/" divider grammar as the breadcrumb, so
 * the two mono micro-lines on a page read as one system.
 */
export function CredentialStrip({ className }: { className?: string }) {
  const credentials = getCredentials();
  if (credentials.length === 0) return null;

  return (
    <ul
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-label text-text-muted${
        className ? ` ${className}` : ""
      }`}
    >
      {credentials.map((c, i) => (
        <li key={c.label} className="flex items-center gap-3">
          {i > 0 ? (
            <span aria-hidden className="text-border-strong">
              /
            </span>
          ) : null}
          <span>
            <span className="text-text-secondary">{c.value}</span>
            {c.detail ? ` · ${c.detail}` : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The same three facts as a right-rail instrument panel. Used on /about, where
 * the arc is told at length in prose and a scanner needs it in one glance.
 */
export function CredentialPanel() {
  const credentials = getCredentials();
  if (credentials.length === 0) return null;

  return (
    <dl className="border-t border-border-subtle">
      {credentials.map((c) => (
        <div key={c.label} className="border-b border-border-subtle py-4">
          <dt className="font-mono text-label uppercase text-text-muted">
            {c.label}
          </dt>
          <dd className="mt-2 text-sec text-text-primary">
            {c.href ? (
              <Link
                href={c.href}
                className="transition-colors duration-200 hover:text-accent-cyan"
              >
                {c.value}
              </Link>
            ) : (
              c.value
            )}
            {c.detail ? (
              <span className="mt-1 block text-meta text-text-muted">
                {c.detail}
                {c.period ? ` · ${c.period}` : null}
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
