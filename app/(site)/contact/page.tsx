import { PageHeader } from "@/components/layout/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { docMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = docMetadata({
  title: "Contact",
  description:
    "Reach Sanjay Kumar Yadav for roles, collaborations, speaking, or consulting.",
  path: "/contact",
});

const openTo = [
  "Engineering roles focused on AI systems and automation",
  "Research collaborations bridging inference and engineering",
  "Speaking and workshops on Bayesian thinking in ML",
  "Consulting on evaluation and LLM workflow design",
];

export default function ContactPage() {
  // Only the profiles that are actually set. `x` and `youtube` are empty strings
  // in site-config, so they contribute nothing rather than an empty affordance.
  const profiles = [
    { href: siteConfig.social.linkedin, label: "LinkedIn" },
    { href: siteConfig.social.github, label: "GitHub" },
    { href: siteConfig.social.x, label: "X" },
    { href: siteConfig.social.youtube, label: "YouTube" },
  ].filter((p) => p.href);

  const mail = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Hello from the portfolio")}`;

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title="Contact"
        purpose="Have a project, a research collaboration, or a role in mind? Let's talk."
      />

      <section className="mt-10">
        {/* The address itself is the call to action. The header already spends
            the page's one filled-accent element on its Contact pill, so this
            stays a link — no second cyan button competing with it. */}
        <p className="font-mono text-label uppercase text-text-muted">Email</p>
        <p className="mt-2">
          <a
            href={mail}
            className="break-words text-lede text-accent-cyan underline-offset-4 hover:underline"
          >
            {siteConfig.email}
          </a>
        </p>
        {siteConfig.phoneDisplay ? (
          <>
            <p className="mt-8 font-mono text-label uppercase text-text-muted">
              Phone
            </p>
            <p className="mt-2 text-lede text-text-primary">
              {siteConfig.phoneDisplay}
            </p>
          </>
        ) : null}
        {/* Text links, not a second icon row: the footer's icon buttons sit on
            the same screen on a page this short, and two social grammars one
            above the other is exactly the inconsistency this pass removes. */}
        <p className="mt-8 font-mono text-label uppercase text-text-muted">
          Elsewhere
        </p>
        <p className="mt-2 flex flex-wrap gap-6 text-meta">
          {profiles.map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan underline-offset-4 hover:underline"
            >
              {p.label} ↗
            </a>
          ))}
        </p>

        <p className="mt-8 text-body text-text-secondary">
          I work best with teams who care about measurable outcomes, honest
          uncertainty, and systems that survive contact with reality.
        </p>
      </section>

      <section className="mt-16 md:mt-24 lg:mt-32">
        <SectionHeading>Open to</SectionHeading>
        <ul className="mt-8 border-t border-border-subtle">
          {openTo.map((item) => (
            <li
              key={item}
              className="border-b border-border-subtle py-4 text-sec text-text-secondary"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-16 text-meta text-text-muted">
        Privacy: this site uses no chat widgets and no third-party ad trackers.
        Email opens your mail client — nothing is submitted through this page.
      </p>
    </>
  );
}
