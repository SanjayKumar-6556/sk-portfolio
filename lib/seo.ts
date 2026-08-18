import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

const titleSuffix = ` — ${siteConfig.professionalName}`;

/**
 * Name first, role second — the opposite order to the per-page template,
 * because this is the string a recruiter sees when they search his name.
 */
const siteTitle = `${siteConfig.professionalName} — ${siteConfig.seoRole}`;

export function pageTitle(page: string): string {
  return `${page}${titleSuffix}`;
}

export function defaultMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteTitle,
      template: `%s${titleSuffix}`,
    },
    description: siteConfig.tagline,
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: siteConfig.url,
      siteName: siteConfig.professionalName,
      title: siteTitle,
      description: siteConfig.tagline,
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
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
