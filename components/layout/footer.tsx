import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.08] bg-black/80 py-16 backdrop-blur-md print:hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-xl text-text-primary">
              {siteConfig.identity}
            </p>
            <p className="mt-2 max-w-sm text-sm text-text-muted">
              {siteConfig.tagline}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-accent-violet">
              {siteConfig.ecosystem}
            </p>
          </div>
          <div className="flex flex-wrap gap-8 text-sm text-text-secondary">
            <Link href="/projects" className="hover:text-accent-cyan">
              Projects
            </Link>
            <Link href="/research" className="hover:text-accent-cyan">
              Research
            </Link>
            <Link href="/resume" className="hover:text-accent-cyan">
              Resume
            </Link>
            <Link href="/contact" className="hover:text-accent-cyan">
              Contact
            </Link>
          </div>
        </div>
        <p className="mt-12 text-center text-xs text-text-muted md:text-left">
          © {year} {siteConfig.professionalName}. Built with intention.
        </p>
      </div>
    </footer>
  );
}
