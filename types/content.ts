import { z } from "zod";

export const projectCategorySchema = z.enum([
  "ai-systems",
  "llm-agents",
  "automation",
  "research",
  "backend",
  "tools",
]);

export const projectStatusSchema = z.enum([
  "shipped",
  "archived",
  "in-progress",
]);

export const projectFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  category: projectCategorySchema,
  tags: z.array(z.string()),
  year: z.number(),
  role: z.string(),
  stack: z.array(z.string()),
  status: projectStatusSchema,
  featured: z.boolean(),
  hero: z.object({ src: z.string(), alt: z.string() }),
  links: z
    .object({
      github: z.string().optional(),
      demo: z.string().optional(),
      paper: z.string().optional(),
    })
    .optional(),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  publishedAt: z.string(),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export const researchTypeSchema = z.enum([
  "thesis",
  "paper",
  "talk",
  "workshop",
  "poster",
]);

export const researchFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  type: researchTypeSchema,
  venue: z.string(),
  year: z.number(),
  abstract: z.string(),
  pdf: z.string().optional(),
  slides: z.string().optional(),
  code: z.string().optional(),
  bibtex: z.string().optional(),
  publishedAt: z.string(),
});

export type ResearchFrontmatter = z.infer<typeof researchFrontmatterSchema>;
