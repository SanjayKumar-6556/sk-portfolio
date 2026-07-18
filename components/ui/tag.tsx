import { cn } from "@/lib/utils";

export type TagProps = {
  children: React.ReactNode;
  interactive?: boolean;
  active?: boolean;
  className?: string;
  onClick?: () => void;
};

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
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] text-text-secondary backdrop-blur-sm",
        interactive &&
          "min-h-11 cursor-pointer px-4 py-2 transition-colors hover:border-accent-cyan/25 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan",
        active && "border-accent-cyan/35 text-accent-cyan",
        className,
      )}
    >
      {children}
    </Component>
  );
}
