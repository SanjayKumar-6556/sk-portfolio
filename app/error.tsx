"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-2xl text-text-primary">Something broke.</p>
      <p className="mt-4 max-w-md text-text-secondary">
        An unexpected error occurred. You can retry or head back to safety.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-accent-cyan px-6 py-3 text-sm font-medium text-text-inverse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-border-default px-6 py-3 text-sm font-medium text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
