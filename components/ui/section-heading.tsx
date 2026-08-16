import Link from "next/link";

/**
 * One heading treatment for every section on every page, so "Selected work",
 * "Research", "The route" and the résumé section heads cannot drift apart.
 *
 * Spacing lives on the caller: heading → content is `mt-8`, heading → a row
 * list is `mt-10`.
 */
export function SectionHeading({
  children,
  href,
  linkLabel,
  id,
}: {
  children: React.ReactNode;
  /** Optional "see all" target. `linkLabel` is required when set. */
  href?: string;
  linkLabel?: string;
  id?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-4">
      <h2 id={id} className="text-h2 text-text-primary">
        {children}
      </h2>
      {href ? (
        <Link
          href={href}
          className="text-meta text-accent-cyan underline-offset-4 hover:underline"
        >
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
