import { projectCategoryLabels } from "@/lib/category-labels";
import { ProjectStatus } from "@/components/projects/project-status";
import { cn } from "@/lib/utils";
import type { ProjectFrontmatter } from "@/types/content";

/**
 * The instrument panel for one case study: every frontmatter fact a technical
 * reader triages on, in one place, in the mono data voice.
 *
 * Rendered twice per page — once in the right rail (`layout="rail"`) and once
 * inline above the body for viewports below 1024, where the rail does not
 * exist. Same component, same facts, two arrangements; there is no third copy.
 */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="font-mono text-label uppercase text-text-muted">
        {label}
      </dt>
      <dd className="mt-2 text-meta text-text-secondary">{children}</dd>
    </div>
  );
}

const linkClass = "text-accent-cyan underline-offset-4 hover:underline";

export function ProjectSpec({
  project,
  layout = "rail",
  className,
}: {
  project: ProjectFrontmatter;
  layout?: "rail" | "inline";
  className?: string;
}) {
  const rail = layout === "rail";
  const links = project.links;
  const hasLinks = Boolean(links?.github || links?.demo || links?.paper);

  return (
    // `.tech-scan` (globals.css) on the RAIL arrangement only: a 4px-pitch
    // scanline, masked to nothing by 72% of the panel's height. The rail is
    // the one place on a case study that is out of the reading path entirely,
    // so this is where the instrument panel is allowed to look like an
    // instrument — the inline arrangement sits directly above 10,000
    // characters of body copy and gets nothing. Additive via cn(), which is a
    // plain join: it can only add to `className`, never override it.
    <div className={cn(rail && "tech-scan", className)}>
      <dl
        className={
          rail
            ? "flex flex-col gap-5"
            : "grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4"
        }
      >
        <Field label="Year">{project.year}</Field>
        <Field label="Type">{projectCategoryLabels[project.category]}</Field>
        <Field label="Status">
          <ProjectStatus status={project.status} />
        </Field>
        <Field label="Role">{project.role}</Field>
      </dl>

      {project.stack.length > 0 ? (
        <div className="mt-6">
          <p className="font-mono text-label uppercase text-text-muted">
            Stack
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li
                key={s}
                className="rounded-full bg-accent-cyan-soft px-2.5 py-1 font-mono text-label text-accent-cyan-ink"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {project.tags.length > 0 ? (
        <div className="mt-6">
          <p className="font-mono text-label uppercase text-text-muted">
            Topics
          </p>
          <p className="mt-2 text-meta text-text-muted">
            {project.tags.join(" · ")}
          </p>
        </div>
      ) : null}

      {hasLinks ? (
        <div className="mt-6">
          <p className="font-mono text-label uppercase text-text-muted">
            Links
          </p>
          <div
            className={
              rail
                ? "mt-2 flex flex-col items-start gap-2 text-meta"
                : "mt-2 flex flex-wrap gap-5 text-meta"
            }
          >
            {links?.github ? (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                GitHub ↗
              </a>
            ) : null}
            {links?.demo ? (
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Demo ↗
              </a>
            ) : null}
            {links?.paper ? (
              <a
                href={links.paper}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Paper ↗
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
