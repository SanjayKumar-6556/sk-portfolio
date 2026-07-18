import Image from "next/image";
import Link from "next/link";
import type { ProjectFrontmatter } from "@/types/content";
import { projectCategoryLabels } from "@/lib/category-labels";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  className,
}: {
  project: ProjectFrontmatter;
  className?: string;
}) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/projects/${project.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-2xl">
        <div
          className={cn(
            "relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-[2px] transition-[transform,box-shadow] duration-[600ms] ease-out",
            "group-hover:-translate-y-1 group-hover:glow-cyan-hover",
          )}
        >
          <Image
            src={project.hero.src}
            alt={project.hero.alt}
            fill
            unoptimized={project.hero.src.endsWith(".svg")}
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-bg-base/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
            <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-text-primary md:text-2xl">
              {project.title}
            </h3>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-cyan">
              {projectCategoryLabels[project.category]}
            </span>
          </div>
        </div>
      </Link>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-text-secondary">
        {project.summary}
      </p>
      <Link
        href={`/projects/${project.slug}`}
        className="mt-3 inline-flex text-sm font-medium text-accent-cyan hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-sm"
      >
        Read case study →
      </Link>
    </article>
  );
}
