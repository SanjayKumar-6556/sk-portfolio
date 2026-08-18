import { Ambient } from "@/components/ambient/ambient";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { docMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = docMetadata({
  title: "Contact",
  description:
    "Sanjay Kumar Yadav is open to AI/ML engineering roles. Email, LinkedIn and GitHub — no form in between.",
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
      {/*
        The cheapest strong ambience on the site. This page ends around 60% of
        a 1080p fold and the rest is empty ground, so `contact` inverts the
        mask and blooms eor-late UP from the footer into that emptiness —
        nothing here competes with it. It is the plate, not the mesh, that
        carries it; see the note above the [data-ambient="contact"] block in
        globals.css for why cyan-2 stays at the site default here.
      */}
      <Ambient variant="contact" />
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title="Contact"
        purpose="Open to AI/ML engineering roles. Email is the fastest way to reach me, and it is the only way this page offers — there is no form and nothing to fill in."
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
          I work best with teams that state their assumptions, decide how
          something will be evaluated before building it, and would rather have
          an honest error bar than a confident number.
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
