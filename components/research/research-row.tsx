import { researchTypeLabels } from "@/lib/category-labels";
import { ListRow } from "@/components/ui/list-row";
import type { ResearchFrontmatter } from "@/types/content";

/**
 * A paper, thesis, talk or poster in the exact row grammar ProjectRow uses.
 * The eyebrow carries the type, which is what stops three items reading as
 * three equal publications.
 *
 * No author list: researchFrontmatterSchema has no `authors` field and
 * inventing one would be a content edit.
 */
const rowLink = "relative hover:underline underline-offset-4";

export function ResearchRow({
  item,
  headingLevel,
}: {
  item: ResearchFrontmatter;
  /** h2 on the /research index, where rows are the page's top-level content. */
  headingLevel?: "h2" | "h3";
}) {
  return (
    <ListRow
      href={`/research/${item.slug}`}
      eyebrow={researchTypeLabels[item.type]}
      title={item.title}
      trailing={String(item.year)}
      headingLevel={headingLevel}
    >
      <p className="mt-2 font-mono text-label text-text-muted">{item.venue}</p>
      <p className="mt-3 line-clamp-3 text-sec text-text-secondary">
        {item.abstract}
      </p>

      {item.pdf || item.slides || item.code || item.bibtex ? (
        <p className="mt-4 flex flex-wrap gap-5 text-meta">
          {item.pdf ? (
            <a
              href={item.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className={`${rowLink} text-accent-cyan`}
            >
              PDF ↗
            </a>
          ) : null}
          {item.slides ? (
            <a
              href={item.slides}
              target="_blank"
              rel="noopener noreferrer"
              className={`${rowLink} text-accent-cyan`}
            >
              Slides ↗
            </a>
          ) : null}
          {item.code ? (
            <a
              href={item.code}
              target="_blank"
              rel="noopener noreferrer"
              className={`${rowLink} text-accent-cyan`}
            >
              Code ↗
            </a>
          ) : null}
          {item.bibtex ? (
            <a
              href={item.bibtex}
              target="_blank"
              rel="noopener noreferrer"
              className={`${rowLink} text-text-muted`}
            >
              BibTeX ↗
            </a>
          ) : null}
        </p>
      ) : null}
    </ListRow>
  );
}
