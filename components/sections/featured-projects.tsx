import { FadeUp } from "@/components/motion/fade-up";
import { ProjectRow } from "@/components/projects/project-row";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedProjects } from "@/lib/content";

export async function FeaturedProjects() {
  const featured = getFeaturedProjects().slice(0, 4);

  return (
    <section className="mt-16 md:mt-24 lg:mt-32">
      <FadeUp>
        <SectionHeading href="/projects" linkLabel="All projects →">
          Selected work
        </SectionHeading>
        <ul className="mt-10 border-t border-border-subtle transition-opacity hover:[&>li:not(:hover)]:opacity-55">
          {featured.map((p) => (
            <ProjectRow key={p.slug} project={p} />
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
