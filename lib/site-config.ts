export const siteConfig = {
  professionalName: "Sanjay Kumar Yadav",
  identity: "The Cosmic Coder",
  ecosystem: "AdhyuniQ",
  tagline:
    "AI Engineer building intelligent systems, automation workflows, and scalable AI products.",
  aboutTagline:
    "Cosmology-trained, production-built. I design systems that learn, scale, and reason.",
  /** Replace with your public contact email */
  email: "contact@example.com",
  phoneDisplay: "+91 — — — — —",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000",
  social: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    x: "https://x.com/",
    youtube: "https://youtube.com/",
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
