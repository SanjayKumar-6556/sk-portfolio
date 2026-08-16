import { Ambient } from "@/components/ambient/ambient";

/**
 * DEPRECATED — a compatibility shim, scheduled for deletion.
 *
 * This used to be the entire ambient system on the site: one empty div
 * painting `radial-gradient(ellipse 45% 38% at 78% 22%, rgba(0,209,255,0.055),
 * transparent 72%)`. It was invisible for four compounding reasons — 5.5%
 * alpha is below the perceptual floor; its centre sat in the one spot already
 * occupied by CosmicNodeFallback's own glow, which is four times stronger; it
 * is viewport-fixed so it never changes with scroll; and it was on one route
 * out of eight. It also carried no `print:hidden`, so printing the home page
 * printed a cyan smear onto white paper.
 *
 * It is now replaced by the real ambient layer, which is why this file just
 * forwards. It stays only so that `app/(site)/page.tsx` keeps compiling until
 * that file is rewired.
 *
 * TO WHOEVER OWNS THE PAGES: replace `<HeroBackdrop />` at
 * `app/(site)/page.tsx:52` with `<Ambient variant="home" />`, drop the import
 * on line 4, and delete this file. Nothing else imports it.
 */
export function HeroBackdrop() {
  return <Ambient variant="home" />;
}
