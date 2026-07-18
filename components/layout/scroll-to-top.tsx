"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.25 }}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-black/55 text-text-primary shadow-[0_0_28px_-8px_rgba(0,209,255,0.25)] backdrop-blur-xl print:hidden hover:border-accent-cyan/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan lg:bottom-12 lg:right-10"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
          }
        >
          <ArrowUp className="h-5 w-5" strokeWidth={1.5} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
