import Link from "next/link";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * The opening line of an inner page — not a section, and not a banner.
 *
 * Titles are sentence case and rendered verbatim: pass "Projects", not
 * "MY PROJECTS". There is no bottom rule; 40px of space separates better than
 * a hairline whose length differed on every route. The shell owns top padding,
 * so this component declares none.
 *
 * `subtitle` and `children` are gone. Chips, email links and type labels go in
 * an <Aside>, or in a plain line under the header.
 */
export function PageHeader({
  crumbs,
  title,
  purpose,
  className,
}: {
  crumbs: Crumb[];
  title: string;
  /** One-line statement of what the page is for. */
  purpose?: string;
  className?: string;
}) {
  return (
    <header className={cn(className)}>
      <nav aria-label="Breadcrumb" className="mb-5">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-label uppercase text-text-muted">
          {crumbs.map((c, i) => (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {i > 0 ? (
                <span aria-hidden className="text-border-strong">
                  /
                </span>
              ) : null}
              {c.href ? (
                <Link
                  href={c.href}
                  className="transition-colors duration-200 hover:text-accent-cyan"
                >
                  {c.label}
                </Link>
              ) : (
                <span className="text-text-secondary">{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <h1 className="text-h1 text-text-primary">{title}</h1>
      {purpose ? (
        <p className="mt-4 text-lede text-text-secondary">{purpose}</p>
      ) : null}
    </header>
  );
}
