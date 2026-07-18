import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  projectFrontmatterSchema,
  researchFrontmatterSchema,
  type ProjectFrontmatter,
  type ResearchFrontmatter,
} from "@/types/content";

const ROOT = path.join(/* turbopackIgnore: true */ process.cwd());

function readDirSafe(dir: string): string[] {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter((f) => f.endsWith(".mdx"));
}

function parseProjectFile(filename: string): {
  frontmatter: ProjectFrontmatter;
  body: string;
} {
  const raw = fs.readFileSync(
    path.join(ROOT, "content/projects", filename),
    "utf8",
  );
  const { data, content } = matter(raw);
  const frontmatter = projectFrontmatterSchema.parse(data);
  return { frontmatter, body: content };
}

function parseResearchFile(filename: string): {
  frontmatter: ResearchFrontmatter;
  body: string;
} {
  const raw = fs.readFileSync(
    path.join(ROOT, "content/research", filename),
    "utf8",
  );
  const { data, content } = matter(raw);
  const frontmatter = researchFrontmatterSchema.parse(data);
  return { frontmatter, body: content };
}

export function getAllProjects(): ProjectFrontmatter[] {
  return readDirSafe("content/projects").map((f) => parseProjectFile(f).frontmatter);
}

export function getFeaturedProjects(): ProjectFrontmatter[] {
  return getAllProjects()
    .filter((p) => p.featured)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getProjectBySlug(slug: string): {
  frontmatter: ProjectFrontmatter;
  body: string;
} | null {
  const files = readDirSafe("content/projects");
  for (const file of files) {
    const parsed = parseProjectFile(file);
    if (parsed.frontmatter.slug === slug) return parsed;
  }
  return null;
}

export function getAllProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}

export function getAdjacentProjects(slug: string): {
  prev: ProjectFrontmatter | null;
  next: ProjectFrontmatter | null;
} {
  const ordered = [...getAllProjects()].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const i = ordered.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: ordered[i + 1] ?? null,
    next: ordered[i - 1] ?? null,
  };
}

export function getAllResearch(): ResearchFrontmatter[] {
  return readDirSafe("content/research").map((f) => parseResearchFile(f).frontmatter);
}

export function getResearchBySlug(slug: string): {
  frontmatter: ResearchFrontmatter;
  body: string;
} | null {
  const files = readDirSafe("content/research");
  for (const file of files) {
    const parsed = parseResearchFile(file);
    if (parsed.frontmatter.slug === slug) return parsed;
  }
  return null;
}

export function getAllResearchSlugs(): string[] {
  return getAllResearch().map((r) => r.slug);
}
