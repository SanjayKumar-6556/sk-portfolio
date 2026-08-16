import type { Metadata, Viewport } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { SiteHeader } from "@/components/layout/site-header";
import { defaultMetadata } from "@/lib/seo";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${syne.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-bg-base font-sans text-text-primary">
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
