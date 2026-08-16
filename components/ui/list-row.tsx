import Link from "next/link";

/**
 * The one row primitive. Project rows, research rows and pagers all use it, so
 * engineering work and papers read in the identical voice three rows apart —
 * that adjacency is the design's central move. Do not fork it.
 *
 * The parent <ul> supplies `border-t border-border-subtle` (and, if you want
 * sibling dimming, `hover:[&>li:not(:hover)]:opacity-55`).
 */
export function ListRow({
  href,
  eyebrow,
  title,
  trailing,
  children,
  external = false,
  headingLevel: Heading = "h3",
}: {
  href: string;
  /** Mono uppercase label: "Paper", "Automation", "Poster". */
  eyebrow?: string;
  title: string;
  /** Right-aligned mono, baseline-aligned with the title. The year, nothing else. */
  trailing?: string;
  children?: React.ReactNode;
  external?: boolean;
  /**
   * The tag only — the size is always `text-h3`, so this changes the document
   * outline and nothing visual. On an index page the rows ARE the page's
   * top-level content and belong at h2; the outline went h1 → h3 there, which
   * is a level skip a screen reader announces as a missing section. Inside a
   * case study, where real h2 sections already exist above it, h3 is correct.
   */
  headingLevel?: "h2" | "h3";
}) {
  return (
    <li className="group relative border-b border-border-subtle py-7 transition-opacity duration-200">
      {/* Bleeds 20px past the text so it reads as a surface, not an outlined box. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-5 inset-y-0 rounded-lg bg-white/[0.03] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
      <div className="relative">
        {eyebrow ? (
          <p className="font-mono text-label uppercase text-accent-cyan">
            {eyebrow}
          </p>
        ) : null}
        <div className="flex items-baseline justify-between gap-6">
          <Heading className="text-h3 text-text-primary transition-colors duration-200 group-hover:text-accent-cyan">
            <Link
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="after:absolute after:inset-0"
            >
              {title}
            </Link>
          </Heading>
          {trailing ? (
            <span className="shrink-0 font-mono text-label text-text-muted">
              {trailing}
            </span>
          ) : null}
        </div>
        {children}
      </div>
    </li>
  );
}
