"use client";

import { useMemo, useState } from "react";
import type { ProjectFrontmatter } from "@/types/content";
import { projectFilters } from "@/lib/category-labels";
import { Tag } from "@/components/ui/tag";
import { ProjectCard } from "@/components/projects/project-card";

export function ProjectsFilterClient({
  projects,
}: {
  projects: ProjectFrontmatter[];
}) {
  const [active, setActive] = useState<(typeof projectFilters)[number]["id"]>(
    "all",
  );

  const filtered = useMemo(() => {
    let list =
      active === "all"
        ? projects
        : projects.filter((p) => p.category === active);
    list = [...list].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
    return list;
  }, [projects, active]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {projectFilters.map((f) => (
          <Tag
            key={f.id}
            interactive
            active={active === f.id}
            onClick={() => setActive(f.id)}
          >
            {f.label}
          </Tag>
        ))}
      </div>
      <p className="mt-4 text-sm text-text-muted">
        Sorted by latest. Replace placeholders in MDX with your real metrics and
        diagrams.
      </p>
      <div className="mt-14 grid gap-12 md:grid-cols-2">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
