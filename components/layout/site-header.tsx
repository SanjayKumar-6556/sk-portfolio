"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";

/**
 * The site's single piece of chrome. Replaces the pill nav, the floating
 * "GET IN TOUCH" CTA, the left social rail and the rotated "OPEN TO WORK"
 * strip. The inner container is `.shell-row`, so the wordmark's left edge is
 * the same x as every paragraph and every row title on the site.
 *
 * The nav array is local on purpose: `Home` is the wordmark rather than a link,
 * so this list is not quite navItems. Labels are copied verbatim from it.
 *
 * Desktop and the mobile overlay show the SAME routes. They briefly did not —
 * the overlay kept a "Cosmic Notes" entry after the desktop nav dropped it,
 * which meant phone visitors were still one tap from an empty page. That route
 * has since been deleted outright.
 */
const nav: { href: string; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/resume", label: "Resume" },
];

const overlayNav = nav;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const FOCUSABLE = 'a[href], button:not([disabled])';

export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // The menu is "open at this pathname". Deriving `open` from the current
  // pathname closes it on every navigation — hash links and the back button
  // included, which the old per-link onClick missed — with no effect and no
  // cascading render. Same-route clicks still need the explicit close below,
  // because the pathname does not change for those.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLButtonElement>(null);

  function close() {
    setOpenPath(null);
  }

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // The panel is md:hidden. If the viewport grows past the breakpoint while
    // it is open, CSS hides it but the scroll lock would survive — close it.
    const mq = window.matchMedia("(min-width: 48rem)");
    const onBreakpoint = () => {
      if (mq.matches) setOpenPath(null);
    };
    mq.addEventListener("change", onBreakpoint);

    // Focus trap. The header stays visible while the panel is open (the panel
    // starts at top-16), so everything still on screen has to be in the ring —
    // the hamburger, which is the visible close control, AND the theme toggle
    // beside it. Leaving the toggle out would leave it visible and clickable
    // but unreachable by keyboard. In DOM order: theme, hamburger, then panel.
    const focusables = () => {
      const inPanel = panelRef.current
        ? Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
        : [];
      const inHeader = [themeRef.current, toggleRef.current].filter(
        (node): node is HTMLButtonElement => node !== null,
      );
      return [...inHeader, ...inPanel];
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpenPath(null);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = focusables();
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!active || !nodes.includes(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      mq.removeEventListener("change", onBreakpoint);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const navLink = (active: boolean) =>
    cn(
      "text-meta transition-colors duration-200",
      active ? "text-accent-cyan" : "text-text-secondary hover:text-text-primary",
    );

  const contactPill =
    "inline-flex h-9 items-center rounded-full bg-accent-cyan px-4 text-meta font-semibold text-text-inverse transition-opacity duration-200 hover:opacity-90";

  return (
    <>
      {/*
        `sticky`, never `fixed`: the header occupies its own 64px of flow, so
        no page needs a compensating top offset. Note the backdrop-filter here
        creates a containing block for fixed descendants — which is exactly why
        the mobile panel is a sibling of this element and not a child of it.
      */}
      {/*
        The light bar needs MORE of itself than the dark one, and a real
        hairline. A 72% wash of a near-white ground over a near-white page is
        not a bar — measured, it separates by under 1 L* — whereas the same
        recipe on near-black reads clearly because the content scrolling under
        it is so much lighter than the ground. So light goes to a white wash
        that is brighter than its own page, and takes the next border weight up.
      */}
      <header className="sticky top-0 z-50 border-b border-border-subtle bg-[color-mix(in_srgb,var(--bg-base)_72%,transparent)] backdrop-blur-md light:border-border-default light:bg-[color-mix(in_srgb,white_76%,transparent)] print:hidden">
        <div className="shell-row flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className="text-sec font-semibold text-text-primary transition-colors duration-200 hover:text-accent-cyan"
          >
            Sanjay Kumar Yadav
          </Link>

          {/*
            The right-hand cluster is ONE flex child, not three. With
            justify-between, every direct child gets a share of the free space,
            so adding the theme toggle as a sibling of <nav> would push the nav
            to the centre of the bar on desktop. Grouping keeps the contract
            this header has always had: wordmark hard left, everything else
            hard right.
          */}
          <div className="flex items-center gap-2 md:gap-6">
            <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={navLink(isActive(pathname, item.href))}
                >
                  {item.label}
                </Link>
              ))}
              {/* The single filled element above the fold — the whole accent budget. */}
              <Link
                href="/contact"
                aria-current={isActive(pathname, "/contact") ? "page" : undefined}
                className={contactPill}
              >
                Contact
              </Link>
            </nav>

            {/*
              One instance, both breakpoints — outside the <nav> because it is
              a site control, not a destination, and left of the hamburger so
              it keeps its place in the bar when the nav collapses. Not inside
              the mobile overlay: the ground you are looking at is the thing
              you want to change, and burying that control behind a menu means
              opening the menu to fix the page you were reading.

              Borderless and 44px square, matching the hamburger. The Contact
              pill above is the whole accent budget over the fold; a second
              bordered object in a 64px bar would spend it twice.
            */}
            <ThemeToggle ref={themeRef} className="md:-mr-2" />

            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => (open ? close() : setOpenPath(pathname))}
              className="-mr-2 inline-flex size-11 items-center justify-center text-text-primary md:hidden"
            >
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 block h-px w-5 bg-current transition-transform duration-200",
                    open && "translate-y-[5.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 block h-px w-5 bg-current transition-transform duration-200",
                    open && "-translate-y-[5.5px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/*
        Sibling of <header>, not a child: a backdrop-filter ancestor would make
        `fixed` resolve against the 64px header box instead of the viewport.
        It starts at top-16 so the header — wordmark and the X that closes it —
        stays visible and in place; the panel reads as a drawer, not a takeover.
      */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            ref={panelRef}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduceMotion ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.16, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 top-16 z-[60] overflow-y-auto bg-bg-base print:hidden md:hidden"
          >
            <nav aria-label="Primary" className="shell-row flex flex-col py-6">
              {overlayNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 items-center border-b border-border-subtle text-h3 transition-colors duration-200",
                      active ? "text-accent-cyan" : "text-text-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={close}
                aria-current={isActive(pathname, "/contact") ? "page" : undefined}
                className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent-cyan text-meta font-semibold text-text-inverse"
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
