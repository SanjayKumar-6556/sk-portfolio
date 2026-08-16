import Link from "next/link";

/**
 * Root-level 404. It renders under the root layout, outside the `(site)`
 * route group, so it applies the shell classes itself — otherwise it would be
 * the one route whose content column starts at a different x.
 */
export default function NotFound() {
  return (
    <div className="shell pt-14 pb-32 lg:pt-24">
      <div>
        <p className="font-mono text-label uppercase text-text-muted">404</p>
        <h1 className="mt-2 text-h1 text-text-primary">
          This corner of the universe is empty.
        </h1>
        <p className="mt-4 text-lede text-text-secondary">
          The page you requested does not exist or moved. Try the homepage or
          projects index.
        </p>
        <div className="mt-8 flex flex-wrap gap-6 text-meta">
          <Link
            href="/"
            className="text-accent-cyan underline-offset-4 hover:underline"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="text-accent-cyan underline-offset-4 hover:underline"
          >
            Projects
          </Link>
          <Link
            href="/research"
            className="text-accent-cyan underline-offset-4 hover:underline"
          >
            Research
          </Link>
        </div>
      </div>
    </div>
  );
}
