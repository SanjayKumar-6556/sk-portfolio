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
    /*
      THE CARD EDGE IS THE ALIGNMENT LINE, not the text inside it.

      The first version bled outward by its own padding so the inner text stayed
      on the shell's left edge. That works in a single column and breaks the
      moment these are laid out in a grid: every cell bleeds both ways, so
      neighbouring cards collide in the gutter. It also cannot align the second
      column with anything.

      So the card's own left edge now sits on the shell edge, level with the
      section heading above it, and the text is inset by the padding. That is
      what the reference sites do — a card is an object, and the eye reads its
      edge, not its contents, as the line down the page.
    */
    <li
      className="
        group relative rounded-card border border-border-subtle
        bg-surface-card p-5 shadow-lift-1
        transition-[background-color,border-color,box-shadow,opacity] duration-200
        hover:border-border-default hover:bg-surface-card-hover hover:shadow-lift-2
        sm:p-6
      "
    >
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
