import { FadeUp } from "@/components/motion/fade-up";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

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
      <FadeUp>
        <SectionHeading>Let&apos;s build something intelligent.</SectionHeading>
        <p className="mt-6 text-body text-text-secondary">
          Open to engineering roles, research collaborations, and consulting.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact">Get in touch</Button>
        </div>
      </FadeUp>
    </section>
  );
}
