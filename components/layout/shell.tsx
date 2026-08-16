/**
 * SHELL — the site's one layout primitive. Read this before writing a page.
 *
 * Every route renders inside `.shell` (see app/(site)/layout.tsx). `.shell` is a
 * CSS grid defined once in app/globals.css:
 *
 *   below 1024px   one column, 100% of the padded shell
 *   1024px and up  [ 640px reading column ][ 48px gap ][ free right rail ]
 *
 * The reading column is PINNED LEFT, never centred, so a wide element and a
 * narrow paragraph share a left edge by construction. That shared edge is the
 * whole design; do not reintroduce a second measure.
 *
 * HOW TO WRITE A PAGE
 *
 *   export default function Page() {
 *     return (
 *       <>
 *         <PageHeader … />          {/* direct child → reading column *\/}
 *         <section className="mt-10">…</section>
 *         <Aside>…</Aside>          {/* right rail, pairs with the section above *\/}
 *       </>
 *     );
 *   }
 *
 * RULES — all four are load-bearing:
 *
 *  1. NEVER put `mx-auto`, `max-w-*` or `px-*` on a page wrapper. The shell owns
 *     width and horizontal padding on all nine routes. (The CSS is unlayered, so
 *     it beats Tailwind utilities anyway — you would only confuse the next
 *     reader.) Component-internal padding (Tag, Button, card interiors) is fine.
 *  2. NEVER wrap the page in a single <div>. Return a fragment. A wrapper div
 *     becomes the only grid child and collapses the rail.
 *  3. An <Aside> must be the IMMEDIATELY FOLLOWING DOM SIBLING of the element it
 *     pairs with. Grid auto-placement puts it on the current row only if it is
 *     next; anything in between pushes it down a row.
 *  4. Below 1024px both <Bleed> and <Aside> collapse into the single column and
 *     stack in DOM order. No media-query work is needed in any page.
 *
 * Vertical rhythm lives on the page, not here: the shell supplies
 * `pt-14 lg:pt-24 pb-32`; sections use `mt-16 md:mt-24 lg:mt-32` (and `mt-10`
 * for the first section after PageHeader).
 */
import { cn } from "@/lib/utils";

/**
 * Spans the full 1152px inner width, starting at exactly the same x as every
 * paragraph. Use for full-width row lists or wide tables — not for decoration.
 */
export function Bleed({
  children,
  className,
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
}) {
  return <As className={cn("bleed", className)}>{children}</As>;
}

/**
 * The right rail: metadata, filters, the hero graphic. Hidden below 1024px —
 * its content is always secondary. If a page needs it on mobile, render that
 * content inline in the reading column instead.
 *
 * `cn()` here is a plain join with no tailwind-merge, so a `className` that
 * conflicts with a base class emits both and resolves by source order. Pass
 * additive classes only.
 */
export function Aside({
  children,
  className,
  sticky = true,
}: {
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
}) {
  return (
    <aside className={cn("aside hidden lg:block", className)}>
      <div className={sticky ? "sticky top-20" : undefined}>{children}</div>
    </aside>
  );
}
