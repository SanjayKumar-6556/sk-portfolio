/**
 * THE THEME CONTRACT. One file, so the root layout's inline script, the
 * toggle and the CSS cannot drift apart.
 *
 * THE MODEL — two states:
 *
 *   no attribute   DARK. This is what every statically prerendered page ships
 *                  as, and it is the site's designed ground.
 *   data-theme=... the visitor has chosen, and it is remembered.
 *
 * `prefers-color-scheme` is deliberately NOT consulted anywhere — not here,
 * not in globals.css, not in the preload hints. Browsers report `light` for
 * everyone who has merely never changed their OS setting, so honouring it
 * would hand the light theme to most first-time visitors and quietly replace
 * the site that was designed. Light is offered, not imposed.
 *
 * WHY NO COOKIE. `app/(site)/layout.tsx` states the constraint: nothing below
 * it may read cookies()/headers(), because all 21 pages are statically
 * prerendered and one dynamic read costs the lot. A cookie-driven theme would
 * have to live in the root layout, above that fence, and would opt the whole
 * site into dynamic rendering. So the server renders theme-agnostic HTML and
 * the preference is applied by the two mechanisms that need no server: a CSS
 * media query, and the attribute this module writes.
 *
 * WHAT THAT COSTS, HONESTLY: a returning visitor whose choice disagrees with
 * their OS gets one frame of the OS's answer unless the init script runs
 * first. That is what THEME_INIT is for — see app/layout.tsx.
 */
export type Theme = "dark" | "light";

/**
 * Namespaced deliberately. In dev every project on localhost:3000 shares one
 * localStorage origin and a bare "theme" key collides across them.
 */
export const THEME_KEY = "sky-portfolio-theme";

/**
 * Runs as a parser-blocking inline script, first child of <body>.
 *
 * NOT `next/script` with `beforeInteractive`: that strategy orders a script
 * against Next's own modules but, in its own words, "does not block page
 * hydration" — and in the App Router an inline beforeInteractive script is not
 * even emitted as itself, it is pushed onto `self.__next_s` and replayed after
 * the client bundle executes. That is hundreds of milliseconds after first
 * paint, i.e. exactly the flash this exists to prevent.
 *
 * A bare inline <script> in the body runs during HTML parse: after the
 * render-blocking stylesheet in <head> is applied, before any body content
 * paints. React 19 only hoists <script> elements that have BOTH a string src
 * and async, so this one stays where it is put.
 *
 * It writes the attribute in both directions — a visitor on a light OS who
 * chose dark needs the attribute just as much as the reverse.
 */
export const THEME_INIT =
  `try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});` +
  `if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function subscribe(listener: () => void) {
  listeners.add(listener);
  // Cross-tab: two windows of this site stay in agreement.
  window.addEventListener("storage", emit);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", emit);
  };
}

/**
 * Reads the DOM, not React state — the attribute is the single source of
 * truth and the init script may have written it before React ever ran.
 *
 * Returns a primitive so useSyncExternalStore's Object.is check terminates.
 */
export function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/**
 * Identical to getSnapshot's answer for a page that has never been toggled,
 * which is what makes the SSR render and the hydration render byte-identical.
 */
export const getServerSnapshot = (): Theme => "dark";

export function setTheme(next: Theme) {
  const root = document.documentElement;

  /*
   * The class is added unconditionally and CSS decides whether it means
   * anything — @media (prefers-reduced-motion: no-preference) gates the
   * transition, so the accessibility branch and the no-JS branch are the same
   * branch. That is the house rule stated in globals.css.
   */
  root.classList.add("theme-switching");
  window.setTimeout(() => root.classList.remove("theme-switching"), 240);

  root.dataset.theme = next;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // Safari private mode throws on setItem. The theme still applies for
    // this page view; only the memory of it is lost.
  }

  /*
   * The viewport export ships a single static <meta name="theme-color"> for
   * the dark ground, because that is what the page ships as. Patch it so the
   * mobile browser chrome follows the choice.
   */
  const chrome = next === "light" ? "#eceef4" : "#0b0b0c";
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute("content", chrome));

  emit();
}
