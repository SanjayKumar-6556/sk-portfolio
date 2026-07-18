import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { PillNav } from "@/components/layout/pill-nav";
import { RightBadge } from "@/components/layout/right-badge";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SocialRail } from "@/components/layout/social-rail";
import { TopRightCTA } from "@/components/layout/top-right-cta";
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
        <PillNav />
        <TopRightCTA />
        <SocialRail />
        <RightBadge />
        <main id="main-content" className="flex-1 outline-none">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
