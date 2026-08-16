import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Aside } from "@/components/layout/shell";
import { MdxBody } from "@/components/mdx/mdx-body";
import { ProjectArtifacts } from "@/components/projects/project-artifacts";
import { ProjectMetrics } from "@/components/projects/project-metrics";
import { ProjectSpec } from "@/components/projects/project-spec";
import { ListRow } from "@/components/ui/list-row";
import { SectionHeading } from "@/components/ui/section-heading";
import { projectCategoryLabels } from "@/lib/category-labels";
import {
  getAdjacentProjects,
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/lib/content";
import { docMetadata } from "@/lib/seo";
import type { ProjectFrontmatter } from "@/types/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: Props) {
  const { slug } = await props.params;
  const doc = getProjectBySlug(slug);
  if (!doc) return {};
  return docMetadata({
    title: doc.frontmatter.title,
    description: doc.frontmatter.summary,
    path: `/projects/${slug}`,
  });
}

/** Adjacent work, in the same row grammar as the index. */
function AdjacentRow({ project }: { project: ProjectFrontmatter }) {
  return (
    <ListRow
      href={`/projects/${project.slug}`}
      eyebrow={projectCategoryLabels[project.category]}
      title={project.title}
      trailing={String(project.year)}
    >
      <p className="mt-2 line-clamp-2 text-sec text-text-secondary">
        {project.summary}
      </p>
    </ListRow>
  );
}

export default async function ProjectCaseStudyPage(props: Props) {
  const { slug } = await props.params;
  const doc = getProjectBySlug(slug);
  if (!doc) notFound();

  const { frontmatter: p, body } = doc;
  const { prev, next } = getAdjacentProjects(slug);

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: p.title },
        ]}
        title={p.title}
        purpose={p.summary}
      />

      {/*
        Below 1024 the rail does not exist, so the same facts run inline. This
        is its own grid child rather than the body's first block: `lg:hidden`
        removes it from the grid entirely at ≥1024, which a hidden first child
        inside the body wrapper could not do without leaving its margin behind.
      */}
      <ProjectSpec project={p} layout="inline" className="mt-10 lg:hidden" />

      {/*
        Everything the reader scrolls through is ONE grid child, so the rail
        beside it spans the whole case study instead of only the header's row.
        No max-w / px / mx-auto here — the shell owns both.
      */}
      <div className="mt-10 [&>*:first-child]:mt-0">
        {p.metrics && p.metrics.length > 0 ? (
          <ProjectMetrics metrics={p.metrics} className="mt-10" />
        ) : null}

        <ProjectArtifacts slug={slug} className="mt-10" />

        {/*
          The inner first-child reset again: this div is not a grid item, but
          the MDX h2 carries its own top margin and would double the gap.
        */}
        <div className="mt-16 [&>*:first-child]:mt-0">
          <MdxBody source={body} />
        </div>

        {prev || next ? (
          <section className="mt-16 md:mt-24 lg:mt-32">
            <SectionHeading href="/projects" linkLabel="All projects →">
              More work
            </SectionHeading>
            <ul className="mt-10 space-y-4 transition-opacity hover:[&>li:not(:hover)]:opacity-55">
              {prev ? <AdjacentRow project={prev} /> : null}
              {next ? <AdjacentRow project={next} /> : null}
            </ul>
          </section>
        ) : null}
      </div>

      {/*
        `self-stretch` is load-bearing: .shell sets `align-items: start`, so an
        aside is only as tall as its own content and the sticky inner div has
        nowhere to travel. Stretching it to the row height — the height of the
        whole case study — is what makes the spec panel follow the reader.
      */}
      <Aside className="mt-10 self-stretch">
        <ProjectSpec project={p} />
      </Aside>
    </>
  );
}
