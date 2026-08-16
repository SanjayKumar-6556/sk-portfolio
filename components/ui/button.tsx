import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-[transform,box-shadow,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-accent-cyan text-text-inverse glow-cyan hover:glow-cyan-hover hover:-translate-y-0.5 active:translate-y-0",
  // Tokens, not literal whites. A white wash over a white ground is nothing,
  // so the hardcoded `border-white/10 bg-white/[0.04]` this used to carry made
  // the secondary button disappear entirely on paper. The card tokens already
  // encode "a surface one step toward the light source" in whichever
  // direction that is for the current ground.
  secondary:
    "border border-border-default bg-surface-card text-text-primary backdrop-blur-sm hover:border-accent-cyan/45 hover:bg-surface-card-hover",
  ghost:
    "border border-transparent text-text-secondary hover:border-border-default hover:bg-bg-surface hover:text-text-primary",
  link: "min-h-0 min-w-0 rounded-none border-b border-transparent px-0 py-0 text-accent-cyan underline-offset-4 hover:border-accent-cyan hover:underline",
} as const;

type Variant = keyof typeof variants;

export type ButtonProps = Omit<ComponentProps<"button">, "className"> & {
  variant?: Variant;
  className?: string;
  href?: string;
};

export function Button({
  variant = "primary",
  className,
  children,
  href,
  type = "button",
  ...rest
}: ButtonProps) {
  const cls = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
