"use client";

import { useMemo, useState } from "react";
import { Aside } from "@/components/layout/shell";
import { ProjectRow } from "@/components/projects/project-row";
import { cn } from "@/lib/utils";
import type { ProjectFrontmatter } from "@/types/content";

export type ProjectFilter = {
  id: "all" | ProjectFrontmatter["category"];
  label: string;
  count: number;
};

/**
 * Renders THREE shell children as a fragment, in this order:
 *   1. the mobile chip row (lg:hidden — display:none removes it from the grid
 *      entirely at ≥1024, so it costs no row there)
 *   2. the row list
 *   3. the <Aside> chip column, which must stay immediately after the list or
 *      grid auto-placement drops it onto the next row
 *
 * `filters` is computed on the server from the actual MDX files, so a category
 * that matches zero projects cannot appear. No useSearchParams and no
 * searchParams — either would flip /projects to dynamic rendering.
 */
export function ProjectsFilterClient({
  projects,
  filters,
}: {
  projects: ProjectFrontmatter[];
  filters: ProjectFilter[];
}) {
  const [active, setActive] = useState<ProjectFilter["id"]>("all");

  const filtered = useMemo(() => {
    const list =
      active === "all"
        ? [...projects]
        : projects.filter((p) => p.category === active);
    return list.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }, [projects, active]);

  const chip = (f: ProjectFilter, touch: boolean) => (
    <button
      key={f.id}
      type="button"
      aria-pressed={active === f.id}
      onClick={() => setActive(f.id)}
      className={cn(
        // inline-flex + gap rather than a literal space: the touch variant is a
        // flex container, and a flex container drops whitespace-only children,
        // which rendered "ALL7" on mobile while the rail showed "ALL 7".
        "inline-flex items-center gap-1.5 border-l pl-3 font-mono text-label uppercase transition-colors duration-200",
        touch && "min-h-11",
        active === f.id
          ? "border-accent-cyan text-accent-cyan"
          : "border-transparent text-text-muted hover:text-text-primary",
      )}
    >
      {/*
        The literal space is invisible (a whitespace-only child of a flex
        container is not laid out — `gap-1.5` draws the gap) but it keeps the
        button's accessible name "Research 3" rather than "Research3".
      */}
      {f.label}{" "}
      {/*
        No /70 on the count. The modifier subdued it against the label on the
        dark ground, but the light accent is already a deep ink: measured in
        the rendered page, 70% of #00697f over the ground is 3.11:1 at 12px —
        an AA failure on a number that carries information. Full strength is
        5.44:1, and the count still reads as secondary because it is a numeral
        beside a word.
      */}
      <span className={active === f.id ? "text-accent-cyan" : "text-text-muted"}>
        {f.count}
      </span>
    </button>
  );

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="mt-10 flex flex-wrap gap-x-5 gap-y-1 lg:hidden"
      >
        {filters.map((f) => chip(f, true))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sec text-text-muted">Nothing here yet.</p>
      ) : (
        <ul className="mt-10 space-y-4 transition-opacity hover:[&>li:not(:hover)]:opacity-55">
          {filtered.map((p) => (
            <ProjectRow key={p.slug} project={p} headingLevel="h2" />
          ))}
        </ul>
      )}

      {/*
        `self-stretch`: .shell sets `align-items: start`, so without it the
        aside is only as tall as the chips and the sticky inner div has no room
        to travel — the filters would scroll away from a seven-row list.
      */}
      <Aside className="mt-10 self-stretch">
        <p
          id="project-filter-label"
          className="pl-3 font-mono text-label uppercase text-text-muted"
        >
          Filter
        </p>
        <div
          role="group"
          aria-labelledby="project-filter-label"
          className="mt-3 flex flex-col items-start gap-2"
        >
          {filters.map((f) => chip(f, false))}
        </div>
      </Aside>
    </>
  );
}
