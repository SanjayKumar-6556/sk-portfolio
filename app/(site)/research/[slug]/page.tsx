import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { MdxBody } from "@/components/mdx/mdx-body";
import { Tag } from "@/components/ui/tag";
import {
  getAllResearchSlugs,
  getResearchBySlug,
} from "@/lib/content";
import { researchTypeLabels } from "@/lib/category-labels";
import { docMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllResearchSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: Props) {
  const { slug } = await props.params;
  const doc = getResearchBySlug(slug);
  if (!doc) return {};
  return docMetadata({
    title: doc.frontmatter.title,
    description: doc.frontmatter.abstract.slice(0, 155),
    path: `/research/${slug}`,
  });
}

export default async function ResearchDetailPage(props: Props) {
  const { slug } = await props.params;
  const doc = getResearchBySlug(slug);
  if (!doc) notFound();
  const { frontmatter: r, body } = doc;

  return (
    <article className="pb-24 pt-8">
      <div className="mx-auto max-w-[680px] px-6">
        <PageHeader
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Research", href: "/research" },
            { label: r.title },
          ]}
          title={r.title}
          subtitle={<Tag>{researchTypeLabels[r.type]}</Tag>}
        />
        <p className="mt-6 font-mono text-xs text-text-muted">
          {r.venue} · {r.year}
        </p>
        <div className="mt-8 flex flex-wrap gap-4 font-mono text-sm">
          {r.pdf ? (
            <Link
              href={r.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border-default px-4 py-2 text-accent-cyan hover:border-accent-cyan/40"
            >
              Read PDF
            </Link>
          ) : null}
          {r.slides ? (
            <Link
              href={r.slides}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border-default px-4 py-2 hover:border-accent-cyan/40"
            >
              Slides
            </Link>
          ) : null}
          {r.code ? (
            <Link
              href={r.code}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border-default px-4 py-2 hover:border-accent-violet/40"
            >
              Code
            </Link>
          ) : null}
        </div>
        <div className="prose-mdx mt-12">
          <p className="text-lg leading-relaxed text-text-secondary">
            {r.abstract}
          </p>
        </div>
        <div className="mt-12">
          <MdxBody source={body} />
        </div>
      </div>
    </article>
  );
}
