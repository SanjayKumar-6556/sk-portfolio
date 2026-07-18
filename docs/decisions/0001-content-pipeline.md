# ADR 0001: Content pipeline for MDX case studies

## Context

Projects and research entries need version-controlled long-form content with typed frontmatter. Alternatives included Velite (build-time codegen), Contentlayer successors, or importing MDX as modules via `@next/mdx`.

## Decision

Use **`gray-matter` + filesystem reads** in `lib/content.ts` with **`next-mdx-remote/rsc`** (`MDXRemote`) for rendering bodies in React Server Components.

## Consequences

- **Pros**: No extra codegen step, straightforward Zod validation at build time, works cleanly with Next.js App Router RSC.
- **Cons**: Manual discovery of files under `content/`; no hot Contentlayer-style IDE types beyond exported Zod schemas.
- **Migration**: If post volume grows, we can adopt Velite without changing frontmatter shapes materially.
