import { PageHeader } from "@/components/layout/page-header";
import { ProjectsFilterClient } from "@/components/projects/projects-filter-client";
import { getAllProjects } from "@/lib/content";
import { docMetadata } from "@/lib/seo";

export const metadata = docMetadata({
  title: "Projects",
  description:
    "Engineering case studies spanning AI systems, LLM workflows, automation, and research.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-8">
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Projects" },
        ]}
        title="My projects"
      />
      <div className="mt-12">
        <ProjectsFilterClient projects={projects} />
      </div>
    </div>
  );
}
