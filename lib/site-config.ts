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
  /** Set NEXT_PUBLIC_SITE_URL to your production domain before deploying */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000",
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
