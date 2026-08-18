import Link from "next/link";
import { timelineEntries } from "@/lib/about-data";
import { getAllResearch } from "@/lib/content";
import { education, experience } from "@/lib/resume-data";
import { cn } from "@/lib/utils";

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
 *   period "2024"                   lib/resume-data.ts education[0].period
 *   value "JCAP 12 (2025) 055"      content/research/bnn-cosmology.mdx  venue
 *   detail "Second author of nine"  content/research/bnn-cosmology.mdx  My contribution
 *   value "AI/ML Software Engineer" lib/resume-data.ts experience[0].role
 *   detail "Nestack Technologies"   lib/resume-data.ts experience[0].org
 *   period "Mar 2025 — Present"     lib/resume-data.ts experience[0].period
 *
 * `label` ("Education" / "Peer-reviewed paper" / "Now") is structural UI, not a
 * claim — except that "peer-reviewed" is itself sourced: it is the wording of
 * content/projects/bayesian-neural-network.mdx and content/research/msc-thesis.mdx.
 * "Second author of nine" is content/research/bnn-cosmology.mdx ("I am the
 * **second author of nine**") with the emphasis stripped. The thesis gets NO
 * authorship string: "sole author" is written nowhere in this repo.
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
    out.push({
      label: "Education",
      value: msc.title,
      detail: msc.org,
      period: education[0]?.period,
    });
  }

  const paper = getAllResearch().find((r) => r.type === "paper");
  if (paper) {
    out.push({
      label: "Peer-reviewed paper",
      value: paper.venue,
      detail: "Second author of nine",
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
 * THE PROOF BAND — the hero's three verified facts, at the weight they earn.
 *
 * This used to be one wrapping line of 12px mono muted text, slash-separated,
 * sitting between the lede and the buttons. It was the highest-value and the
 * lowest-weighted element on the first screen: the entire physics → cosmology
 * → AI argument, set smaller than the breadcrumb on every inner page, in the
 * one colour on the site that is only just legible.
 *
 * Same three facts, same source, same order — re-weighted into the site's own
 * card grammar and widened to the full 1152px via <Bleed> at the call site, so
 * the first screen ends on an object instead of trailing off into empty
 * right-hand space. RULE 2 holds: nothing here is written. `label` is
 * structural UI; every other string comes verbatim from getCredentials above.
 *
 * Three changes beyond weight, all structural:
 *   - the value is `text-h3`, so a scanner reads "MSc, Astronomy" and
 *     "JCAP 12 (2025) 055" at the same size as a project title;
 *   - `period` is now shown, so "Now" answers "and is he working today?";
 *   - `href` is finally honoured — the published paper was already carrying a
 *     link target that the old strip silently dropped, so the one checkable
 *     credential on the page was not clickable.
 *
 * CONTRAST: labels and details are `--text-muted` at 12/13px over the card
 * (3.5% white) over the plate — 4.62:1 on the dark ground, which clears AA
 * with the margin the ambient budget allocated for exactly this element. Do
 * not add a second wash behind it.
 */
export function CredentialStrip({ className }: { className?: string }) {
  const credentials = getCredentials();
  if (credentials.length === 0) return null;

  return (
    <ul
      className={cn(
        "grid rounded-card border border-border-subtle bg-surface-card shadow-lift-1 sm:grid-cols-3",
        className,
      )}
    >
      {credentials.map((c) => (
        <li
          key={c.label}
          className="border-b border-border-subtle p-5 last:border-b-0 sm:border-b-0 sm:border-l sm:first:border-l-0 sm:p-6"
        >
          <p className="font-mono text-label uppercase text-text-muted">
            {c.label}
          </p>
          <p className="mt-3 text-h3 text-text-primary">
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
          </p>
          {c.detail || c.period ? (
            <p className="mt-2 text-meta text-text-muted">
              {c.detail}
              {c.detail && c.period ? " · " : null}
              {c.period}
            </p>
          ) : null}
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
