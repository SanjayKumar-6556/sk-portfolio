import Link from "next/link";
import { Github, Linkedin, Youtube } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function iconWrap(href: string, label: string, children: React.ReactNode) {
  return (
    <Link
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-text-secondary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-[color,box-shadow,border-color] hover:border-accent-cyan/45 hover:text-accent-cyan hover:shadow-[0_0_24px_-4px_rgba(0,209,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan",
      )}
    >
      {children}
    </Link>
  );
}

export function SocialRail() {
  return (
    <aside
      aria-label="Social links"
      className="fixed bottom-0 left-20 top-1/2 z-40 hidden -translate-y-1/2 print:hidden lg:flex lg:flex-col lg:gap-3"
    >
      {iconWrap(siteConfig.social.github, "GitHub", <Github className="h-[18px] w-[18px]" strokeWidth={1.5} />)}
      {iconWrap(siteConfig.social.linkedin, "LinkedIn", <Linkedin className="h-[18px] w-[18px]" strokeWidth={1.5} />)}
      {iconWrap(siteConfig.social.x, "X", <XIcon />)}
      {iconWrap(siteConfig.social.youtube, "YouTube", <Youtube className="h-[18px] w-[18px]" strokeWidth={1.5} />)}
    </aside>
  );
}

function XIcon() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
