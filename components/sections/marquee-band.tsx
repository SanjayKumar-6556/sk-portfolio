"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function MarqueeBand({
  children,
  className,
  durationSec = 48,
}: {
  children: React.ReactNode;
  className?: string;
  durationSec?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <div
      className={cn(
        "overflow-hidden border-y border-white/[0.06] bg-black py-7",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max font-display text-[clamp(2.5rem,8vw,5rem)] font-semibold uppercase leading-none tracking-[0.04em]",
          !reduceMotion && "marquee-track",
        )}
        style={
          reduceMotion
            ? undefined
            : {
                animationDuration: `${durationSec}s`,
              }
        }
      >
        <span className="shrink-0 px-8 text-white/[0.22]">{children}</span>
        <span className="shrink-0 px-8 text-white/[0.22]" aria-hidden>
          {children}
        </span>
      </div>
    </div>
  );
}
