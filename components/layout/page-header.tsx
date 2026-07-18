import Link from "next/link";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function PageHeader({
  crumbs,
  title,
  subtitle,
  children,
  className,
}: {
  crumbs: Crumb[];
  title: string;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("border-b border-border-subtle pb-12 pt-28 md:pt-36", className)}>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
          {crumbs.map((c, i) => (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {i > 0 ? <span aria-hidden className="text-border-strong">/</span> : null}
              {c.href ? (
                <Link href={c.href} className="hover:text-accent-cyan">
                  {c.label}
                </Link>
              ) : (
                <span className="text-text-secondary">{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <h1 className="font-display text-[clamp(2.25rem,7vw,4.25rem)] font-semibold uppercase leading-[1.05] tracking-[0.06em] text-text-primary md:tracking-[0.08em]">
        {title}
      </h1>
      {subtitle ? (
        <div className="mt-6 flex flex-wrap gap-2">{subtitle}</div>
      ) : null}
      {children}
    </header>
  );
}
