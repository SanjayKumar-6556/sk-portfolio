import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

const titleSuffix = ` — ${siteConfig.professionalName}`;

export function pageTitle(page: string): string {
  return `${page}${titleSuffix}`;
}

export function defaultMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: pageTitle(siteConfig.identity),
      template: `%s${titleSuffix}`,
    },
    description: siteConfig.tagline,
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: siteConfig.url,
      siteName: siteConfig.identity,
      title: pageTitle(siteConfig.identity),
      description: siteConfig.tagline,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle(siteConfig.identity),
      description: siteConfig.tagline,
    },
    alternates: {
      canonical: siteConfig.url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function docMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteConfig.url}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    openGraph: {
      title: `${opts.title}${titleSuffix}`,
      description: opts.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${opts.title}${titleSuffix}`,
      description: opts.description,
    },
    alternates: { canonical: url },
  };
}
