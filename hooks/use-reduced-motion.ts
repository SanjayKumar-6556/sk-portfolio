"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/** prefers-reduced-motion for client animation branching */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
