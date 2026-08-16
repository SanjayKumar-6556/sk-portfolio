import Image from "next/image";
import Link from "next/link";
import { researchTypeLabels } from "@/lib/category-labels";
import { getResearchBySlug } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Evidence, not illustration.
 *
 * The seven project MDX files all point `hero.src` at the same placeholder SVG,
 * which is why nothing on this site reads `project.hero`. But two *real*
 * primary-source documents are published in /public — the M.Sc. thesis title
 * page and the first-author conference poster — and both belong to exactly one
 * project. They are shown here as small document thumbnails linking to the
 * research entry that owns them.
 *
 * The map is deliberately sparse and hand-checked: a project appears only when
 * a genuine artifact for it exists on disk. Nothing is generated, and no
 * project gets a decorative stand-in. Titles and venues are read from the
 * research frontmatter rather than retyped, so this file states no facts of
 * its own; the `alt` strings describe the pictures and nothing more.
 */
type Artifact = {
  /** Slug in content/research — the source of the label, venue and year. */
  research: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};

const artifactsByProject: Record<string, Artifact[]> = {
  "bayesian-neural-network": [
    {
      research: "msc-thesis",
      src: "/research/msc-thesis-cover.webp",
      width: 910,
      height: 1287,
      alt: "Title page of the M.Sc. thesis, IIT Indore, May 2024.",
    },
    {
      research: "iitm-poster-2024",
      src: "/research/iitm-poster-preview.webp",
      width: 1656,
      height: 2341,
      alt: "Conference poster laying out the inference pipeline, ANN and BNN power-spectrum predictions at six training-set sizes, and the resulting posterior contours.",
    },
  ],
};

export function ProjectArtifacts({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const artifacts = artifactsByProject[slug];
  if (!artifacts) return null;

  const resolved = artifacts.flatMap((a) => {
    const doc = getResearchBySlug(a.research);
    return doc ? [{ ...a, item: doc.frontmatter }] : [];
  });
  if (resolved.length === 0) return null;

  return (
    <div className={cn(className)}>
      <p className="font-mono text-label uppercase text-text-muted">
        Artifacts
      </p>
      {/*
        Fixed 150px thumbnails, not a fluid grid: these are document previews
        and the point is that they are legible as documents, not that they fill
        the column. A full-width thesis cover would be a 900px white slab.
      */}
      <ul className="mt-3 flex flex-wrap gap-4">
        {resolved.map(({ src, width, height, alt, item }) => (
          <li key={item.slug} className="w-[150px]">
            <Link href={`/research/${item.slug}`} className="group block">
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes="150px"
                className="h-auto w-full rounded-md border border-border-subtle transition-colors duration-200 group-hover:border-border-strong"
              />
              {/*
                -ink, not -accent-cyan. On the light ground --text-muted
                #5c5f68 and --accent-cyan #00697f differ by 1% in luminance
                (1.01:1) — the same value in two hues — so on a 12px uppercase
                mono label this hover would be no visible change at all.
                Against the ink token it is 1.78:1. Dark is unaffected in kind:
                the ink there is a brighter cyan, so the hover still lifts.
              */}
              <p className="mt-2 font-mono text-label uppercase text-text-muted transition-colors duration-200 group-hover:text-accent-cyan-ink">
                {researchTypeLabels[item.type]} · {item.year}
                <span className="sr-only"> — {item.title}</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
