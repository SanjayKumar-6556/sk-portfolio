/**
 * The home page's ambient cyan wash. `fixed` + `-z-10` means it never
 * participates in the shell grid and never needs a bleed exception.
 *
 * Render it as the first child of app/(site)/page.tsx.
 */
export function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_45%_38%_at_78%_22%,rgba(0,209,255,0.055),transparent_72%)]"
    />
  );
}
