import type { ProjectFrontmatter } from "@/types/content";

/**
 * One status vocabulary for the work section. The row and the case-study spec
 * panel both read from here so a project cannot be "Shipped" in the list and
 * "shipped" on its own page.
 */
export const projectStatusLabel: Record<ProjectFrontmatter["status"], string> = {
  shipped: "Shipped",
  archived: "Archived",
  "in-progress": "In progress",
};

const dot: Record<ProjectFrontmatter["status"], string> = {
  shipped: "bg-accent-cyan",
  archived: "bg-text-muted",
  "in-progress": "bg-accent-violet",
};

/** A 6px dot plus the status word. Not a pill — pills read as buttons. */
export function ProjectStatus({
  status,
}: {
  status: ProjectFrontmatter["status"];
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden
        className={`inline-block size-1.5 shrink-0 rounded-full ${dot[status]}`}
      />
      {projectStatusLabel[status]}
    </span>
  );
}
