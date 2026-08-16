import Link from "next/link";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { Figure } from "@/components/mdx/figure";
import { cn } from "@/lib/utils";

const link =
  "text-accent-cyan underline-offset-[3px] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-sm";

/**
 * Long unspaced strings must be allowed to break.
 *
 * These pages carry DOIs, arXiv identifiers and `JCAP12(2025)055`-style
 * references, none of which contain a space or a hyphen the browser is willing
 * to break at. In a 640px reading column that is fine; in the 272px column left
 * at 320px it is a token wider than its own box. `min-width: 0` on the shell's
 * children stops the grid track being forced open, but it does nothing for the
 * inline text run — that needs `overflow-wrap`, and `anywhere` rather than
 * `break-word` because a DOI has no break opportunity at all.
 */
const wrap = "[overflow-wrap:anywhere]";

export const mdxComponents: MDXRemoteProps["components"] = {
  // Headings use the site's type tokens rather than raw Tailwind steps, so a
  // case study's headings are the same size as every other heading on the site
  // and cannot drift apart from them.
  h2: ({ children, ...props }) => (
    <h2 {...props} className="mt-14 scroll-mt-28 text-h2 text-text-primary">
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 {...props} className="mt-10 text-h3 text-text-primary">
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 {...props} className="mt-8 text-body font-semibold text-text-primary">
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p {...props} className={cn("mt-5 text-body text-text-secondary", wrap)}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul
      {...props}
      className={cn(
        "mt-5 list-disc space-y-2 pl-6 text-body text-text-secondary marker:text-accent-cyan",
        wrap,
      )}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      {...props}
      className={cn(
        "mt-5 list-decimal space-y-2 pl-6 text-body text-text-secondary marker:text-accent-violet",
        wrap,
      )}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => <li {...props}>{children}</li>,
  a: ({ children, href, ...props }) => {
    const h = href ?? "#";
    const external = h.startsWith("http");
    if (external) {
      return (
        <a
          href={h}
          {...props}
          className={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={h} {...props} className={link}>
        {children}
      </Link>
    );
  },
  blockquote: ({ children, ...props }) => (
    <blockquote
      {...props}
      className={cn(
        "my-8 border-l-2 border-accent-violet pl-6 italic text-text-muted",
        wrap,
      )}
    >
      {children}
    </blockquote>
  ),
  /**
   * Inline code gets the pill; block code must not.
   *
   * This override used to apply the pill to every <code>, including the one
   * inside every <pre>, so a fenced block rendered as an elevated pill nested
   * inside the pre's own surface — a visible double box, with the pill's
   * horizontal padding pushing the content further past the clip edge. Block
   * code is the only case that arrives with a `language-*` class, which is how
   * they are told apart.
   */
  code: ({ children, className, ...props }) => {
    const isBlock =
      typeof className === "string" && className.startsWith("language-");
    return (
      <code
        {...props}
        className={cn(
          "font-mono",
          !isBlock &&
            "rounded-md bg-bg-elevated px-1.5 py-0.5 text-[0.9em] text-accent-cyan",
          className,
        )}
      >
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-lg border border-border-subtle bg-bg-surface p-4 font-mono text-meta text-text-primary"
    >
      {children}
    </pre>
  ),
  hr: () => <hr className="my-14 border-border-subtle" />,
  strong: ({ children, ...props }) => (
    <strong {...props} className="font-semibold text-text-primary">
      {children}
    </strong>
  ),

  // Available to MDX as <Figure src=… alt=… caption=… width=… height=… />.
  // Every image on this site is a real research figure; see
  // public/research/figures/PROVENANCE.md.
  Figure,
};
