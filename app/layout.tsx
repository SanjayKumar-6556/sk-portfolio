import type { Metadata, Viewport } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { SiteHeader } from "@/components/layout/site-header";
import { defaultMetadata } from "@/lib/seo";
import { THEME_INIT } from "@/lib/theme";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = defaultMetadata();

/**
 * `viewportFit: "cover"` is the precondition for `env(safe-area-inset-*)` doing
 * anything at all. Without it a notch or a rounded corner can sit over the
 * mobile menu's close button on an edge-to-edge phone, and the CSS that guards
 * against it is silently inert.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  /*
   * A SINGLE static value, not the media-keyed array form. That form keys on
   * `prefers-color-scheme`, which this site deliberately ignores — see the
   * THEME block in globals.css — so it would report light chrome to a visitor
   * looking at the dark page. This matches what the page actually ships as,
   * and lib/theme.ts patches it when the visitor toggles.
   *
   * Deliberately NOT `colorScheme`. That emits a <meta name="color-scheme">
   * which cannot follow `data-theme`, so it would pin native scrollbars and
   * form controls to one ground regardless of the choice. `color-scheme` is
   * set as a CSS property in globals.css instead, where the attribute reaches
   * it — and it is also what every `light-dark()` token resolves against.
   */
  themeColor: "#0b0b0c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      /*
        The theme init script below writes data-theme on this element during
        HTML parse, so the DOM React hydrates against will not match the DOM
        it rendered. suppressHydrationWarning is one level deep in React by
        design — it silences this element's own attributes and cannot mask a
        mismatch anywhere in the tree beneath it.
      */
      suppressHydrationWarning
      className={`${jakarta.variable} ${syne.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-bg-base font-sans text-text-primary">
        {/*
          FIRST CHILD OF <body>, and it must stay there. By this point the
          render-blocking stylesheet in <head> has been applied but no body
          content has painted, so a returning visitor whose stored choice
          disagrees with their OS never sees a frame of the wrong ground.

          It writes dataset.theme, NEVER className: the three next/font
          variables live on <html>'s class, and a bootstrapper that assigns
          className would wipe them and drop the whole site to a fallback
          font for a frame.
        */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <a
          href="#main-content"
          className="focus-visible:bg-accent-cyan focus-visible:text-text-inverse sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        {/* tabIndex=-1 so the skip link actually moves focus, not just scroll. */}
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
