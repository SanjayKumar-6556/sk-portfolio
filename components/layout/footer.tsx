import { Github, Linkedin, Mail, Youtube } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

/**
 * The site's only home for socials, now that the floating rail is gone.
 *
 * Exported so /contact imports it instead of defining a third private copy.
 */
export function XIcon({ className }: { className?: string }) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const footerNav: { href: string; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

const iconLink =
  "inline-flex size-10 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors duration-200 hover:border-border-strong hover:text-accent-cyan";

function SocialLink({
  href,
  label,
  children,
  external = true,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  // `siteConfig.social.x` and `.youtube` are empty strings today; an empty
  // href renders nothing rather than a dead 40px circle.
  if (!href) return null;
  return (
    <li>
      <Link
        href={href}
        aria-label={label}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={iconLink}
      >
        {children}
      </Link>
    </li>
  );
}

export function Footer() {
  // Server component: this runs at build time, so there is no hydration
  // mismatch to worry about. Keep it server-only.
  const year = new Date().getFullYear();

  return (
    // No top margin: the .shell already ends every route with pb-32 (128px),
    // and stacking mt-32 on top of it put 256px of nothing above the rule.
    <footer className="border-t border-border-subtle py-16 print:hidden">
      <div className="shell-row">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
          <div className="max-w-xs">
            <p className="text-sec font-semibold text-text-primary">
              {siteConfig.professionalName}
            </p>
            <p className="mt-2 text-meta text-text-muted">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:justify-between sm:gap-16 lg:justify-start">
            <nav aria-label="Footer">
              {/* grid-flow-col + 3 rows so the six links read top-to-bottom
                  down each column in nav order, not left-to-right across. */}
              <ul className="grid grid-flow-col grid-rows-3 gap-x-10 gap-y-3 text-meta">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-text-secondary transition-colors duration-200 hover:text-accent-cyan"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <ul className="flex flex-wrap gap-2">
              <SocialLink
                href={`mailto:${siteConfig.email}`}
                label="Email"
                external={false}
              >
                <Mail className="size-[18px]" strokeWidth={1.5} />
              </SocialLink>
              <SocialLink href={siteConfig.social.linkedin} label="LinkedIn">
                <Linkedin className="size-[18px]" strokeWidth={1.5} />
              </SocialLink>
              <SocialLink href={siteConfig.social.github} label="GitHub">
                <Github className="size-[18px]" strokeWidth={1.5} />
              </SocialLink>
              <SocialLink href={siteConfig.social.x} label="X">
                <XIcon />
              </SocialLink>
              <SocialLink href={siteConfig.social.youtube} label="YouTube">
                <Youtube className="size-[18px]" strokeWidth={1.5} />
              </SocialLink>
            </ul>
          </div>
        </div>

        <p className="mt-12 text-meta text-text-muted">
          © {year} {siteConfig.professionalName}
        </p>
      </div>
    </footer>
  );
}
