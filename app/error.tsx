"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Root error boundary. Like not-found.tsx it renders under the root layout,
 * outside the `(site)` group, so it applies the shell classes itself.
 *
 * Next 16 also passes `unstable_retry`, which re-fetches before re-rendering;
 * `reset` is still supported and is the right call for a fully static site
 * where there is nothing to re-fetch.
 */
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
    <div className="shell pt-14 pb-32 lg:pt-24">
      <div>
        <p className="font-mono text-label uppercase text-text-muted">Error</p>
        <h1 className="mt-2 text-h1 text-text-primary">Something broke.</h1>
        <p className="mt-4 text-lede text-text-secondary">
          An unexpected error occurred. You can retry or head back to safety.
        </p>
        {error.digest ? (
          <p className="mt-3 font-mono text-label text-text-muted">
            Digest {error.digest}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center gap-6 text-meta">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full border border-border-default px-4 py-2 text-text-primary transition-colors duration-200 hover:border-border-strong"
          >
            Try again
          </button>
          <Link
            href="/"
            className="text-accent-cyan underline-offset-4 hover:underline"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
