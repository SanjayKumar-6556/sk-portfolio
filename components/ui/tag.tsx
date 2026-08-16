import { cn } from "@/lib/utils";

export type TagProps = {
  children: React.ReactNode;
  interactive?: boolean;
  active?: boolean;
  className?: string;
  onClick?: () => void;
};

/**
 * Public API unchanged; the glass recipe is gone. Surfaces on this site are
 * hairlines, not blurred panes. No focus ring here — the global
 * `:focus-visible` outline in globals.css is the one focus system.
 */
export function Tag({
  children,
  interactive,
  active,
  className,
  onClick,
}: TagProps) {
  const Component = interactive ? "button" : "span";
  return (
    <Component
      type={interactive ? "button" : undefined}
      onClick={onClick}
      aria-pressed={interactive ? active : undefined}
      className={cn(
        "inline-flex items-center rounded-full border border-border-default bg-transparent px-2.5 py-1 font-mono text-label uppercase text-text-secondary",
        interactive &&
          "min-h-11 cursor-pointer px-4 py-2 transition-colors duration-200 hover:border-accent-cyan/30 hover:text-text-primary",
        // The hairline token, not a /40 alpha: /40 reads on a dark ground and
        // measures 1.89:1 on a light one, which is below the 3:1 WCAG 1.4.11
        // asks of the border that carries this control's selected state.
        active &&
          "border-accent-cyan-hairline bg-accent-cyan-soft text-accent-cyan-ink",
        className,
      )}
    >
      {children}
    </Component>
  );
}
