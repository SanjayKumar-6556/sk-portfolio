import Link from "next/link";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";

const link =
  "text-accent-cyan underline-offset-[3px] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-sm";

export const mdxComponents: MDXRemoteProps["components"] = {
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className="mt-12 scroll-mt-28 font-display text-3xl font-semibold tracking-[-0.02em] text-text-primary md:text-4xl"
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      {...props}
      className="mt-10 font-sans text-xl font-semibold tracking-[-0.02em] text-text-primary md:text-2xl"
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 {...props} className="mt-8 text-lg font-semibold text-text-primary">
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p
      {...props}
      className="mt-5 text-[17px] leading-relaxed text-text-secondary md:text-lg"
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul
      {...props}
      className="mt-5 list-disc space-y-2 pl-6 text-[17px] text-text-secondary marker:text-accent-cyan"
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      {...props}
      className="mt-5 list-decimal space-y-2 pl-6 text-[17px] text-text-secondary marker:text-accent-violet"
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className="leading-relaxed">
      {children}
    </li>
  ),
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
      className="my-8 border-l-2 border-accent-violet pl-6 text-text-muted italic"
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...props }) => (
    <code
      {...props}
      className={cn(
        "rounded-md bg-bg-elevated px-1.5 py-0.5 font-mono text-[0.9em] text-accent-cyan",
        className,
      )}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-lg border border-border-subtle bg-bg-surface p-4 font-mono text-sm text-text-primary"
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
};
