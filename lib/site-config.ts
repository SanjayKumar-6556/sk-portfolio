export const siteConfig = {
  professionalName: "Sanjay Kumar Yadav",
  identity: "The Cosmic Coder",
  ecosystem: "AdhyuniQ",
  tagline:
    "AI Engineer building intelligent systems, automation workflows, and scalable AI products.",
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
  { href: "/cosmic-notes", label: "Cosmic Notes" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];
