import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";

/**
 * The CTA, restated once in flow at the end of a page — replacing the
 * always-present floating "GET IN TOUCH" button, which was ignored precisely
 * because it was always there.
 *
 * Shell-aligned and left-aligned like everything else: it used to be a centred
 * `max-w-6xl` block with its own violet radial wash and a 240px repeat of the
 * hero graphic, which put the last thing a visitor reads on a different rail
 * from every line above it.
 */
export function CtaFooter() {
  return (
    <section className="mt-16 border-t border-border-subtle pt-16 md:mt-24 lg:mt-32">
      <div className="reveal">
        <SectionHeading>Open to AI/ML engineering roles.</SectionHeading>
        <p className="mt-6 text-body text-text-secondary">
          Applied ML, data pipelines and automation. Email is the fastest way to
          reach me.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          {/* The address itself, not a link to the page that holds the address.
              Same subject line the contact page uses, so mail arriving from
              this site has one grammar. `next/link` renders a mailto: href as a
              plain <a>, so no structural change is needed.
              The page's one primary action, so it carries --glow-cyan — see
              the note in hero.tsx about why button.tsx's own glow is inert. */}
          <Button
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Hello from the portfolio")}`}
            className="shadow-glow-cyan hover:shadow-[0_0_38px_-6px_rgba(0,209,255,0.6)]"
          >
            Email me
          </Button>
          <Button href="/resume" variant="ghost">
            Resume
          </Button>
        </div>
      </div>
    </section>
  );
}
