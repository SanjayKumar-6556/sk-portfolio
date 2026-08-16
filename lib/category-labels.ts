import type { ProjectFrontmatter } from "@/types/content";

export const projectCategoryLabels: Record<
  ProjectFrontmatter["category"],
  string
> = {
  "ai-systems": "AI Systems",
  "llm-agents": "LLM & Agents",
  automation: "Automation",
  research: "Research",
  backend: "Backend",
  tools: "Tools",
};

export const researchTypeLabels = {
  thesis: "Thesis",
  paper: "Paper",
  talk: "Talk",
  workshop: "Workshop",
  poster: "Poster",
} as const;
