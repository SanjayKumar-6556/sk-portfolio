"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function PillNav() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  const linkCls = (href: string) =>
    cn(
      "relative whitespace-nowrap px-3 py-2 text-[13px] font-medium text-text-secondary transition-colors hover:text-text-primary md:px-4",
      pathname === href && "text-text-primary",
    );

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed left-1/2 top-6 z-50 hidden w-[min(92vw,720px)] -translate-x-1/2 print:hidden md:block"
      >
        <div className="flex items-center justify-center rounded-full border border-white/10 bg-black/55 px-2 py-1.5 shadow-[0_0_48px_-12px_rgba(0,209,255,0.18)] backdrop-blur-xl">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => (
              <li key={item.href} className="relative">
                <Link href={item.href} className={linkCls(item.href)}>
                  {item.label}
                  {pathname === item.href && !reduceMotion ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-accent-cyan shadow-[0_0_12px_rgba(0,209,255,0.85)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  ) : pathname === item.href ? (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-accent-cyan shadow-[0_0_12px_rgba(0,209,255,0.85)]" />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="fixed left-1/2 top-6 z-50 w-[min(92vw,420px)] -translate-x-1/2 print:hidden md:hidden">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/55 px-2 py-2 shadow-[0_0_40px_-12px_rgba(0,209,255,0.15)] backdrop-blur-xl">
          <Link
            href="/"
            className="pl-3 text-xs font-semibold uppercase tracking-[0.15em] text-accent-cyan"
          >
            TCC
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 items-center justify-center rounded-full text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.2 }}
            className="fixed inset-0 z-40 flex flex-col bg-bg-base pt-24 print:hidden md:hidden"
          >
            <nav aria-label="Primary mobile" className="flex flex-1 flex-col px-8">
              <ul className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduceMotion ? undefined : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reduceMotion ? 0 : 0.05 * i,
                      duration: 0.25,
                    }}
                  >
                    <Link
                      href={item.href}
                      className="block py-3 font-display text-2xl text-text-primary"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
