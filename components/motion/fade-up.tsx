"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The scroll reveal — a rise, deliberately without a fade.
 *
 * It used to be `initial={{ opacity: 0, y }}`. That opacity is serialised into
 * the prerendered HTML, so every section wrapped in this shipped as
 * `style="opacity:0"` and was revealed only once framer-motion had loaded,
 * hydrated and fired an IntersectionObserver. With scripts blocked, or before
 * hydration, or in any renderer that snapshots the page without scrolling it,
 * the home page was a hero and four invisible sections. It is the same defect
 * that was fixed in page-transition.tsx, in a second place.
 *
 * Dropping opacity from the transform fixes it outright rather than papering
 * over it: the worst case with no JavaScript is now content sitting 24px lower
 * than it otherwise would, which nobody can perceive because there is nothing
 * to compare it against. The rise is also the part of a fade-and-rise that the
 * eye actually reads, so almost nothing is lost.
 *
 * If a fade is ever wanted back, it has to be gated on scripting — an inline
 * `documentElement.classList.add('js')` before paint, with the hidden state in
 * CSS scoped to `.js`. Do not put it back as an inline style.
 */
export function FadeUp({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={cn(className)}
      initial={{ y }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
