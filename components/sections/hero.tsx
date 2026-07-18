import { Button } from "@/components/ui/button";
import { CosmicNodeFallback } from "@/components/three/cosmic-node-fallback";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-28 md:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_38%_at_78%_28%,rgba(0,209,255,0.065),transparent_72%)]" />
      <div className="pointer-events-none absolute right-[10%] top-[20%] size-[min(90vw,420px)] opacity-[0.95] drop-shadow-[0_0_60px_rgba(0,209,255,0.12)] md:right-[15%]">
        <CosmicNodeFallback idPrefix="hero-graphic" className="size-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center md:text-left">
        <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-accent-cyan">
          The Cosmic Coder
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.75rem,10vw,6rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-text-primary">
          {siteConfig.professionalName}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary md:mx-0 md:text-xl">
          {siteConfig.tagline}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
          <Button href="/projects">View projects</Button>
          <Button href="/about" variant="ghost">
            Read about me
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-text-muted">
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-accent-cyan to-transparent opacity-80 animate-pulse" />
      </div>
    </section>
  );
}
