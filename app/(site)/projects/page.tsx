import { PageHeader } from "@/components/layout/page-header";
import {
  ProjectsFilterClient,
  type ProjectFilter,
} from "@/components/projects/projects-filter-client";
import { projectCategoryLabels } from "@/lib/category-labels";
import { getAllProjects } from "@/lib/content";
import { docMetadata } from "@/lib/seo";

/**
 * One string, used as both the meta description and the page's purpose line —
 * so the sentence a search result shows and the sentence a visitor reads are
 * the same sentence, and no new copy is invented for the header.
 */
const purpose =
  "Engineering case studies spanning AI systems, LLM workflows, automation, and research.";

export const metadata = docMetadata({
  title: "Projects",
  description: purpose,
  path: "/projects",
});

export default function ProjectsPage() {
  const all = getAllProjects();

  // Derived from the MDX on disk, so a category with zero projects cannot
  // render a chip — and every chip shows the count it would filter to.
  const counts = new Map<string, number>();
  for (const p of all) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);

  const filters: ProjectFilter[] = [
    { id: "all", label: "All", count: all.length },
    ...[...counts.entries()]
      .sort(
        (a, b) =>
          b[1] - a[1] ||
          projectCategoryLabels[
            a[0] as keyof typeof projectCategoryLabels
          ].localeCompare(
            projectCategoryLabels[b[0] as keyof typeof projectCategoryLabels],
          ),
      )
      .map(([id, count]) => ({
        id: id as keyof typeof projectCategoryLabels,
        label: projectCategoryLabels[id as keyof typeof projectCategoryLabels],
        count,
      })),
  ];

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        title="Projects"
        purpose={purpose}
      />
      <ProjectsFilterClient projects={all} filters={filters} />
    </>
  );
}
