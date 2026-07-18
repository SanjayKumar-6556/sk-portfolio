import { Button } from "@/components/ui/button";
import { CosmicNodeFallback } from "@/components/three/cosmic-node-fallback";
import { FadeUp } from "@/components/motion/fade-up";

export function CtaFooter() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] py-22 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,rgba(139,92,246,0.08),transparent_58%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <FadeUp className="size-[200px] opacity-90 md:size-[240px]">
          <CosmicNodeFallback idPrefix="cta-graphic" className="size-full" />
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-10 font-display text-3xl font-semibold tracking-[-0.02em] text-text-primary md:text-5xl">
            Let&apos;s build something intelligent.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-text-secondary md:text-lg">
            Open to engineering roles, research collaborations, and consulting.
          </p>
          <Button href="/contact" className="mt-10">
            Get in touch
          </Button>
        </FadeUp>
      </div>
    </section>
  );
}
