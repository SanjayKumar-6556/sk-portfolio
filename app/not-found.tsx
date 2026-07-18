import Link from "next/link";
import { Satellite } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <Satellite
        className="mb-6 h-14 w-14 text-accent-cyan opacity-80"
        strokeWidth={1.25}
        aria-hidden
      />
      <p className="font-display text-2xl text-text-primary md:text-3xl">
        This corner of the universe is empty.
      </p>
      <p className="mt-4 max-w-md text-text-secondary">
        The page you requested does not exist or moved. Try the homepage or
        projects index.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-full border border-border-default px-6 py-3 text-sm font-medium text-accent-cyan hover:border-accent-cyan/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
        >
          Home
        </Link>
        <Link
          href="/projects"
          className="rounded-full border border-border-default px-6 py-3 text-sm font-medium text-text-primary hover:border-accent-violet/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-violet"
        >
          Projects
        </Link>
      </div>
    </div>
  );
}
