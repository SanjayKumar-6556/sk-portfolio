import Image from "next/image";
import { notFound } from "next/navigation";
import { Ambient } from "@/components/ambient/ambient";
import { PageHeader } from "@/components/layout/page-header";
import { Aside } from "@/components/layout/shell";
import { MdxBody } from "@/components/mdx/mdx-body";
import { getAllResearchSlugs, getResearchBySlug } from "@/lib/content";
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

/** See the note on the identical map in ../page.tsx. */
const artefacts: Record<
  string,
  { src: string; width: number; height: number; alt: string }
> = {
  "msc-thesis": {
    src: "/research/msc-thesis-cover.webp",
    width: 910,
    height: 1287,
    alt: "Title page of the M.Sc. thesis",
  },
  "iitm-poster-2024": {
    src: "/research/iitm-poster-preview.webp",
    width: 1656,
    height: 2341,
    alt: "The 21-cm Cosmology Workshop poster",
  },
};

const actionPill =
  "inline-flex min-h-11 items-center rounded-full border border-border-default px-5 font-mono text-label uppercase transition-colors duration-200 hover:border-border-strong";

export default async function ResearchDetailPage(props: Props) {
  const { slug } = await props.params;
  const doc = getResearchBySlug(slug);
  if (!doc) notFound();
  const { frontmatter: r, body } = doc;
  const artefact = artefacts[r.slug];

  return (
    <>
      {/*
        `doc`, the same as a case study and for the same two reasons: the MDX
        body puts figures on white plates, and this is long-form reading. It
        deliberately does NOT inherit /research's three-plate EoR sequence —
        the index earns that because the sequence is its subject; a single
        paper does not, and the thesis cover image in the rail would be
        competing with a texture of the very data it documents.
      */}
      <Ambient variant="doc" />
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Research", href: "/research" },
          { label: researchTypeLabels[r.type] },
        ]}
        title={r.title}
      />

      <article className="mt-6">
        {/* The citation, in the data voice. This line is the credential, so it
            stays in the reading column where it is visible at every width. */}
        <p className="font-mono text-label uppercase text-text-muted">
          {researchTypeLabels[r.type]}
          <span aria-hidden> · </span>
          {r.venue}
          <span aria-hidden> · </span>
          {r.year}
        </p>

        {r.pdf || r.slides || r.code || r.bibtex ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {r.pdf ? (
              <a
                href={r.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className={`${actionPill} text-accent-cyan`}
              >
                Read PDF ↗
              </a>
            ) : null}
            {r.slides ? (
              <a
                href={r.slides}
                target="_blank"
                rel="noopener noreferrer"
                className={`${actionPill} text-accent-cyan`}
              >
                Slides ↗
              </a>
            ) : null}
            {r.code ? (
              <a
                href={r.code}
                target="_blank"
                rel="noopener noreferrer"
                className={`${actionPill} text-accent-cyan`}
              >
                Code ↗
              </a>
            ) : null}
            {r.bibtex ? (
              <a
                href={r.bibtex}
                target="_blank"
                rel="noopener noreferrer"
                className={`${actionPill} text-text-muted`}
              >
                BibTeX ↗
              </a>
            ) : null}
          </div>
        ) : null}

        <section className="mt-12">
          <h2 className="font-mono text-label uppercase text-text-muted">
            Abstract
          </h2>
          <p className="mt-3 text-body text-text-secondary">{r.abstract}</p>
        </section>

        <div className="mt-4">
          <MdxBody source={body} />
        </div>
      </article>

      {artefact ? (
        <Aside className="mt-6">
          <a
            href={r.pdf ?? `/research/${r.slug}`}
            target={r.pdf ? "_blank" : undefined}
            rel={r.pdf ? "noopener noreferrer" : undefined}
            className="group block"
          >
            <Image
              src={artefact.src}
              alt={artefact.alt}
              width={artefact.width}
              height={artefact.height}
              sizes="(min-width: 1280px) 336px, 256px"
              className="w-full rounded-sm border border-border-subtle opacity-85 transition duration-200 group-hover:border-border-strong group-hover:opacity-100"
              priority
            />
            <p className="mt-3 font-mono text-label uppercase text-text-muted transition-colors duration-200 group-hover:text-accent-cyan">
              {r.pdf ? "Open the PDF ↗" : artefact.alt}
            </p>
          </a>
        </Aside>
      ) : null}
    </>
  );
}
