import { projectCategoryLabels } from "@/lib/category-labels";
import { ProjectStatus } from "@/components/projects/project-status";
import { ListRow } from "@/components/ui/list-row";
import type { ProjectFrontmatter } from "@/types/content";

/**
 * A project as a hairline-separated row. Never reads `project.hero` — all seven
 * MDX files point at the same placeholder SVG, and every field worth showing
 * (role, status, stack, metric, links) was already in the frontmatter and never
 * on screen.
 */
const rowLink = "relative text-accent-cyan hover:underline underline-offset-4";

export function ProjectRow({
  project,
  headingLevel,
}: {
  project: ProjectFrontmatter;
  /** h2 on the /projects index, where rows are the page's top-level content. */
  headingLevel?: "h2" | "h3";
}) {
  const metric = project.metrics?.[0];
  const links = project.links;

  return (
    <ListRow
      href={`/projects/${project.slug}`}
      eyebrow={projectCategoryLabels[project.category]}
      title={project.title}
      trailing={String(project.year)}
      headingLevel={headingLevel}
    >
      <p className="mt-2 text-sec text-text-secondary">{project.summary}</p>

      <p className="mt-3 flex flex-wrap items-center gap-x-2 text-meta text-text-muted">
        <span>{project.role}</span>
        <span aria-hidden>·</span>
        <ProjectStatus status={project.status} />
      </p>

      {project.stack.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((s) => (
            <li
              key={s}
              className="rounded-full bg-accent-cyan-soft px-2.5 py-1 font-mono text-label text-accent-cyan-ink"
            >
              {s}
            </li>
          ))}
        </ul>
      ) : null}

      {metric ? (
        <p className="mt-3 font-mono text-label text-accent-cyan-ink">
          {metric.label} — {metric.value}
        </p>
      ) : null}

      {links && (links.github || links.demo || links.paper) ? (
        <p className="mt-4 flex flex-wrap gap-5 text-meta">
          {links.github ? (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={rowLink}
            >
              GitHub ↗
            </a>
          ) : null}
          {links.demo ? (
            <a
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={rowLink}
            >
              Demo ↗
            </a>
          ) : null}
          {links.paper ? (
            <a
              href={links.paper}
              target="_blank"
              rel="noopener noreferrer"
              className={rowLink}
            >
              Paper ↗
            </a>
          ) : null}
        </p>
      ) : null}
    </ListRow>
  );
}
