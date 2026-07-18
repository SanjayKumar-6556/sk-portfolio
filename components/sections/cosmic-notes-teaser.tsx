import Link from "next/link";
import { FadeUp } from "@/components/motion/fade-up";
import { siteConfig } from "@/lib/site-config";

export function CosmicNotesTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-22 md:py-30">
      <FadeUp>
        <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-text-primary md:text-5xl">
          Latest Cosmic Notes
        </h2>
      </FadeUp>
      <FadeUp
        delay={0.08}
        className="mt-10 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-12 text-center backdrop-blur-sm"
      >
        <p className="text-text-secondary md:text-lg">
          New writing arriving soon. In the meantime, connect on{" "}
          <Link
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan underline-offset-4 hover:underline"
          >
            LinkedIn
          </Link>
          .
        </p>
      </FadeUp>
    </section>
  );
}
