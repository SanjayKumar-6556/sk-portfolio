"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import {
  getServerSnapshot,
  getSnapshot,
  setTheme,
  subscribe,
} from "@/lib/theme";

/**
 * The one control that changes the site's ground.
 *
 * RULE 4 — "nothing may ship invisible" — is the thing to understand here,
 * because this component looks superficially like the pattern that has been
 * removed from this codebase three times, and is not it.
 *
 * BOTH glyphs are in the prerendered HTML. Exactly one of them is displayed
 * at any instant, and which one is decided by CSS off `html[data-theme]`
 * (see the THEME block in globals.css) — not by JavaScript, not by opacity,
 * and not after hydration. With scripts blocked forever the control still
 * shows the glyph that matches the ground the visitor is actually looking at.
 * Nothing is serialised at `opacity: 0` waiting to be revealed, so
 * `grep -rl 'opacity:0' .next/server/app --include='*.html'` stays empty.
 *
 * The icon depicts the CURRENT theme, never the target, so the glyph and
 * `aria-pressed` state the same fact rather than contradicting each other.
 *
 * `useSyncExternalStore` — not `useState` + `useEffect` — because the store
 * IS the DOM attribute, which the init script may have written before React
 * existed. `getServerSnapshot` is used for both the SSR render and the
 * hydration render, so the client's first render is byte-identical to the
 * server's and there is no mismatch and no post-mount flicker window. Only
 * `aria-pressed`, which CSS cannot express, settles at hydration.
 *
 * Not built on components/ui/button.tsx: that component's base forces `px-6`,
 * `rounded-full` and a `min-h-11` pill, and even its ghost variant grows a
 * border on hover. A 44px square icon target is a different object.
 */
export function ThemeToggle({
  className,
  ref,
}: {
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
}) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isLight = theme === "light";

  return (
    <button
      ref={ref}
      type="button"
      // A stable name plus a state — the ARIA toggle-button pattern. Not
      // role="switch": aria-checked support is patchier across screen readers
      // and a switch implies a visible on/off track this control does not have.
      aria-pressed={isLight}
      aria-label="Light theme"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className={[
        "inline-flex size-11 items-center justify-center text-text-secondary",
        "transition-colors duration-200 hover:text-text-primary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/*
        No per-component focus ring. globals.css carries the site's one focus
        system and says not to add any; note components/ui/button.tsx predates
        that rule and violates it.
      */}
      <Moon size={18} className="theme-icon theme-icon--dark" />
      <Sun size={18} className="theme-icon theme-icon--light" />
    </button>
  );
}
