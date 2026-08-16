"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Has the app hydrated once in this browser session?
 *
 * Module scope rather than component state on purpose. It is read during
 * render, and it must be false on the server AND on the first client render so
 * the two agree; a `useState` + `setState`-in-effect version flips too late to
 * help and trips react-hooks/set-state-in-effect for causing a cascading
 * render. Nothing re-reads it until the next navigation, by which point the
 * effect below has set it.
 */
let hasHydrated = false;

/**
 * A 240ms cross-route fade. No AnimatePresence and no mode="wait": that
 * serialised a 0.5s exit with a 0.5s enter and left the page blank for half a
 * second on every navigation. No y-translate either — a transform on the page
 * root fights the sticky header.
 *
 * THE FIRST PAINT MUST NOT BE ANIMATED. `initial={{ opacity: 0 }}` is rendered
 * on the server too, so every prerendered page shipped as
 * `<div style="opacity:0">` and only JavaScript ever revealed it. With scripts
 * blocked, or simply before hydration, a visitor got a header, a footer and an
 * empty middle — and any crawler that snapshots before hydration saw the same.
 * `initial={false}` renders straight at the animated value instead, so the HTML
 * arrives opaque and needs no JS at all. Real navigations still fade, because
 * by then `hasHydrated` is true and the changed key remounts the element.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const animateOnMount = hasHydrated;

  useEffect(() => {
    hasHydrated = true;
  }, []);

  if (reduceMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      initial={animateOnMount ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
