import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { MdxBody } from "@/components/mdx/mdx-body";
import { Tag } from "@/components/ui/tag";
import { projectCategoryLabels } from "@/lib/category-labels";
import {
  getAdjacentProjects,
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/lib/content";
import { docMetadata } from "@/lib/seo";

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

export default async function ProjectCaseStudyPage(props: Props) {
  const { slug } = await props.params;
  const doc = getProjectBySlug(slug);
  if (!doc) notFound();

  const { frontmatter: p, body } = doc;
  const { prev, next } = getAdjacentProjects(slug);

  return (
    <article className="pb-24 pt-8">
      <div className="mx-auto max-w-6xl px-6">
        <PageHeader
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: p.title },
          ]}
          title={p.title}
          subtitle={
            <>
              {p.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </>
          }
        />
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
          {p.year} · {p.role} · {projectCategoryLabels[p.category]} · {p.status}
        </p>

        <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl border border-white/12 glow-cyan">
          <Image
            src={p.hero.src}
            alt={p.hero.alt}
            fill
            priority
            unoptimized={p.hero.src.endsWith(".svg")}
            className="object-cover"
            sizes="(max-width:768px) 100vw, 1152px"
          />
        </div>

        {p.metrics && p.metrics.length > 0 ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.metrics.map((m) => (
              <li
                key={m.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-sm"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
                  {m.label}
                </p>
                <p className="mt-2 font-display text-xl text-accent-cyan">
                  {m.value}
                </p>
              </li>
            ))}
          </ul>
        ) : null}

        {(p.links?.github ?? p.links?.demo ?? p.links?.paper) ? (
          <div className="mt-8 flex flex-wrap gap-4">
            {p.links.github ? (
              <Link
                href={p.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent-cyan underline-offset-4 hover:underline"
              >
                GitHub
              </Link>
            ) : null}
            {p.links.demo ? (
              <Link
                href={p.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent-cyan underline-offset-4 hover:underline"
              >
                Demo
              </Link>
            ) : null}
            {p.links.paper ? (
              <Link
                href={p.links.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent-violet underline-offset-4 hover:underline"
              >
                Paper
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mx-auto mt-14 max-w-[680px] px-6">
        <MdxBody source={body} />
      </div>

      <nav
        aria-label="Adjacent projects"
        className="mx-auto mt-20 grid max-w-6xl gap-6 px-6 md:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-colors hover:border-accent-cyan/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
              Previous
            </p>
            <p className="mt-2 font-display text-2xl text-text-primary group-hover:text-accent-cyan">
              ← {prev.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-right shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-colors hover:border-accent-cyan/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan md:col-start-2"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
              Next
            </p>
            <p className="mt-2 font-display text-2xl text-text-primary group-hover:text-accent-cyan">
              {next.title} →
            </p>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
