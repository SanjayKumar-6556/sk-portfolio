import { cn } from "@/lib/utils";
import type { ProjectFrontmatter } from "@/types/content";

/**
 * The outcome, stated as data rather than as a claim. Ruled rows, mono on both
 * sides, no boxes — the same hairline grammar the row lists use, so a metric
 * block and a project list read as one system.
 *
 * Values are deliberately `text-text-primary`, not cyan: this page already
 * spends its accent on the stack chips and the link row, and three accented
 * things per screen is none.
 */
export function ProjectMetrics({
  metrics,
  className,
}: {
  metrics: NonNullable<ProjectFrontmatter["metrics"]>;
  className?: string;
}) {
  return (
    <dl className={cn("border-t border-border-subtle", className)}>
      {metrics.map((m) => (
        <div
          key={m.label}
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border-subtle py-4"
        >
          <dt className="font-mono text-label uppercase text-text-muted">
            {m.label}
          </dt>
          <dd className="font-mono text-sec text-text-primary">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}
