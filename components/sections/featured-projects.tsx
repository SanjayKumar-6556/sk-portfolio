import Link from "next/link";
import { ProjectCard } from "@/components/projects/project-card";
import { FadeUp } from "@/components/motion/fade-up";
import { getFeaturedProjects } from "@/lib/content";

export async function FeaturedProjects() {
  const featured = getFeaturedProjects().slice(0, 4);

  return (
    <section className="mx-auto max-w-6xl px-6 py-22 md:py-30">
      <FadeUp className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-text-primary md:text-5xl">
            Featured projects
          </h2>
          <p className="mt-4 max-w-xl text-text-secondary">
            Case studies written like engineering narratives — architecture,
            trade-offs, and outcomes.
          </p>
        </div>
      </FadeUp>
      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {featured.map((p, i) => (
          <FadeUp key={p.slug} delay={0.06 * i}>
            <ProjectCard project={p} />
          </FadeUp>
        ))}
      </div>
      <FadeUp className="mt-12 text-center md:text-left">
        <Link
          href="/projects"
          className="inline-flex font-medium text-accent-cyan hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-sm"
        >
          View all projects →
        </Link>
      </FadeUp>
    </section>
  );
}
