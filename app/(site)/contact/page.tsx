import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Tag } from "@/components/ui/tag";
import { Github, Linkedin, Mail, Youtube } from "lucide-react";
import { docMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = docMetadata({
  title: "Contact",
  description:
    "Reach Sanjay Kumar Yadav for roles, collaborations, speaking, or consulting.",
  path: "/contact",
});

function XIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={props.className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function ContactPage() {
  const mail = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Hello from the portfolio")}`;

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-8">
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        title="Contact"
        subtitle={
          <>
            <Tag>
              <Link href={mail} className="hover:text-accent-cyan">
                {siteConfig.email}
              </Link>
            </Tag>
            <Tag>{siteConfig.phoneDisplay}</Tag>
          </>
        }
      />

      <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-display text-2xl font-medium leading-snug text-text-primary md:text-3xl">
            Have a project, a research collaboration, or a role in mind?
            Let&apos;s talk.
          </p>
          <p className="mt-6 text-text-secondary md:text-lg">
            I work best with teams who care about measurable outcomes, honest
            uncertainty, and systems that survive contact with reality.
          </p>
          <ul className="mt-8 space-y-3 text-text-secondary">
            <li className="flex gap-2">
              <span className="text-accent-cyan">◇</span>
              Engineering roles focused on AI systems and automation
            </li>
            <li className="flex gap-2">
              <span className="text-accent-cyan">◇</span>
              Research collaborations bridging inference and engineering
            </li>
            <li className="flex gap-2">
              <span className="text-accent-cyan">◇</span>
              Speaking and workshops on Bayesian thinking in ML
            </li>
            <li className="flex gap-2">
              <span className="text-accent-cyan">◇</span>
              Consulting on evaluation and LLM workflow design
            </li>
          </ul>
          <Link
            href={mail}
            className="mt-10 inline-flex min-h-11 items-center justify-center rounded-full bg-accent-cyan px-8 py-3 text-sm font-medium text-text-inverse glow-cyan transition-[transform,box-shadow] hover:glow-cyan-hover hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            Email me
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-sm md:p-10">
          <h2 className="font-semibold text-text-primary">Connect</h2>
          <p className="mt-3 text-sm text-text-secondary">
            Server-side forms are intentionally deferred for v1 — use email or
            the profiles below.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={mail}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border-subtle text-text-secondary hover:border-accent-cyan/35 hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" strokeWidth={1.5} />
            </Link>
            <Link
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border-subtle text-text-secondary hover:border-accent-cyan/35 hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" strokeWidth={1.5} />
            </Link>
            <Link
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border-subtle text-text-secondary hover:border-accent-cyan/35 hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" strokeWidth={1.5} />
            </Link>
            {siteConfig.social.x && (
              <Link
                href={siteConfig.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border-subtle text-text-secondary hover:border-accent-cyan/35 hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
                aria-label="X"
              >
                <XIcon className="h-5 w-5" />
              </Link>
            )}
            {siteConfig.social.youtube && (
              <Link
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border-subtle text-text-secondary hover:border-accent-cyan/35 hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" strokeWidth={1.5} />
              </Link>
            )}
          </div>
          <p className="mt-10 text-xs leading-relaxed text-text-muted">
            Privacy: this site uses no chat widgets or third-party ad trackers
            in v1. Email opens your mail client — nothing is submitted through
            this page.
          </p>
        </div>
      </div>
    </div>
  );
}
