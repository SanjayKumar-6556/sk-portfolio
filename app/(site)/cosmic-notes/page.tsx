import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { FadeUp } from "@/components/motion/fade-up";
import { docMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = docMetadata({
  title: "Cosmic Notes",
  description:
    "Long-form technical writing on AI systems, Bayesian thinking, and engineering craft.",
  path: "/cosmic-notes",
});

export default function CosmicNotesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-8">
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Cosmic Notes" },
        ]}
        title="Cosmic Notes"
      />
      <FadeUp>
        <p className="mt-8 text-lg text-text-secondary md:text-xl">
          Long-form technical writing on AI systems, Bayesian thinking, and
          engineering craft.
        </p>
      </FadeUp>
      <FadeUp
        delay={0.08}
        className="mt-16 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-12 text-center backdrop-blur-sm"
      >
        <p className="text-text-secondary md:text-lg">
          New writing arriving soon. Connect on{" "}
          <Link
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan underline-offset-4 hover:underline"
          >
            LinkedIn
          </Link>{" "}
          for updates.
        </p>
      </FadeUp>
    </div>
  );
}
