import { FadeUp } from "@/components/motion/fade-up";
import { Bleed } from "@/components/layout/shell";
import { ProjectRow } from "@/components/projects/project-row";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedProjects } from "@/lib/content";

/**
 * The work grid uses the full 1152px, not the 640px reading column.
 *
 * `Bleed` starts at exactly the same x as every paragraph on the site — that
 * is the point of it — so widening this costs nothing in alignment and buys
 * back the ~590px of empty right-hand space that made the home page read as
 * a document rather than as a portfolio. Prose stays in the reading column
 * where a measure matters; cards do not have that constraint.
 *
 * Two columns from 1024px up, one below. Four featured projects fill it
 * evenly; if that count ever changes to an odd number the last card simply
 * sits alone on its row, which is fine.
 */
export async function FeaturedProjects() {
  const featured = getFeaturedProjects().slice(0, 4);

  return (
    <Bleed as="section" className="mt-16 md:mt-24 lg:mt-32">
      <FadeUp>
        <SectionHeading href="/projects" linkLabel="All projects →">
          Selected work
        </SectionHeading>
        <ul className="mt-10 grid gap-4 transition-opacity lg:grid-cols-2 hover:[&>li:not(:hover)]:opacity-55">
          {featured.map((p) => (
            <ProjectRow key={p.slug} project={p} />
          ))}
        </ul>
      </FadeUp>
    </Bleed>
  );
}
