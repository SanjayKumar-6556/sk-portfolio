# Portfolio — Sanjay Kumar Yadav ("The Cosmic Coder")

Personal portfolio and writing site for **Sanjay Kumar Yadav**, an AI engineer with a
research background in cosmology and Bayesian inference. Built as a fast,
content-driven, statically-rendered site.

**Live:** _set `NEXT_PUBLIC_SITE_URL` and deploy (see below)._

## Tech stack

| Area | Choice |
|------|--------|
| Framework | **Next.js 16** (App Router, route group `app/(site)`) |
| UI | **React 19**, **TypeScript**, **Tailwind CSS v4** |
| Motion | Framer Motion |
| Content | **MDX** via `next-mdx-remote` + `gray-matter` + `remark-gfm` |
| Validation | Zod (content frontmatter schemas) |
| Icons | lucide-react |

## Project structure

```
app/
  (site)/            # public routes: home, about, projects, research, resume, contact, cosmic-notes
  layout.tsx         # root layout, fonts, social rail
  sitemap.ts         # generated sitemap
  robots.ts          # robots directives
components/          # layout, sections, ui, mdx, motion, three, projects
content/
  projects/*.mdx     # project case studies (frontmatter + body)
  research/*.mdx     # research write-ups
lib/
  site-config.ts     # name, identity, contact, social links, nav
  content.ts         # MDX loading + Zod validation
  resume-data.ts     # resume page content
  seo.ts             # metadata helpers
  about-data.ts      # about page content
types/               # content types
docs/decisions/      # architecture decision records
```

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Scripts:

```bash
npm run dev        # dev server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Configuration

Site-wide settings live in [`lib/site-config.ts`](lib/site-config.ts): display name,
identity, tagline, contact email, and social links. **Empty social URLs are treated as
"not set" and are hidden site-wide**, so you can add profiles incrementally.

Set your production URL via an environment variable before deploying:

```bash
# .env (not committed)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Adding content

Create an `.mdx` file under `content/projects/` or `content/research/`. Frontmatter is
validated by Zod (see `lib/content.ts` / `types/content.ts`); pages are generated
automatically at `/projects/[slug]` and `/research/[slug]`.

## Deploying (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` in the project's environment variables.
4. Deploy — the CI workflow (`.github/workflows/ci.yml`) type-checks, lints, and builds on every push/PR.

## Remaining personal TODOs

See [`PORTFOLIO_TODO.md`](PORTFOLIO_TODO.md).
