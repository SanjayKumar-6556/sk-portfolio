export const siteConfig = {
  professionalName: "Sanjay Kumar Yadav",
  /**
   * Alias, and from now on ONLY the JSON-LD `alternateName`. It is no longer
   * the browser-tab title or the OpenGraph site name: a recruiter searching his
   * name should not meet a pseudonym before they meet him. Branding is still
   * his open question, so the field stays.
   */
  identity: "The Cosmic Coder",
  ecosystem: "AdhyuniQ",
  /**
   * Short role string for the <title>, which is a ~60-character budget.
   * SOURCE: lib/resume-data.ts resumeSummary opens "AI/ML engineer with a
   * research background…". The formal role string is "AI/ML Software Engineer"
   * (experience[0].role) and that is what the JSON-LD jobTitle and the
   * credential strip use.
   */
  seoRole: "AI/ML Engineer",
  /**
   * Site-wide fallback description AND the footer line under his name.
   * VERBATIM: the first sentence of lib/resume-data.ts resumeSummary. What it
   * replaces named no field, no institution and no arc — components/sections/
   * hero.tsx rejected it for the hero on exactly those grounds and it was still
   * shipping as the crawlable description of every page.
   */
  tagline:
    "AI/ML engineer with a research background in cosmology and Bayesian inference.",
  aboutTagline:
    "Cosmology-trained, production-built. I design systems that learn, scale, and reason.",
  email: "sanjaykumaryadav10108@gmail.com",
  /** TODO: add your public phone number if you want it shown */
  phoneDisplay: "",
  /**
   * Canonical origin. Only ever read on the server — robots.txt, sitemap.xml,
   * metadataBase and the JSON-LD block — so the non-public Vercel variable is
   * safe here. Do not read `url` from a "use client" component: the fallback
   * would inline as undefined there and the two halves would disagree.
   *
   * NEXT_PUBLIC_SITE_URL wins, so a custom domain can override the Vercel one.
   * VERCEL_PROJECT_PRODUCTION_URL is the project's production hostname without
   * a protocol, and stays the production hostname on preview deployments —
   * which is what canonicals and the sitemap should point at either way.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  /** Empty strings are treated as "not set" and are hidden everywhere. */
  social: {
    github: "https://github.com/SanjayKumar-6556",
    linkedin: "https://www.linkedin.com/in/sanjay-kumar-yadav/",
    x: "",
    youtube: "",
  },
  resumePdfPath: "/resume/sanjay-yadav-resume.pdf",
} as const;

export type NavItem = { href: string; label: string };

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];
