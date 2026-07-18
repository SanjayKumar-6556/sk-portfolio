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

export const projectFilters: Array<{
  id: "all" | ProjectFrontmatter["category"];
  label: string;
}> = [
  { id: "all", label: "All" },
  { id: "ai-systems", label: "AI Systems" },
  { id: "llm-agents", label: "LLM & Agents" },
  { id: "automation", label: "Automation" },
  { id: "research", label: "Research" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools" },
];

export const researchTypeLabels = {
  thesis: "Thesis",
  paper: "Paper",
  talk: "Talk",
  workshop: "Workshop",
  poster: "Poster",
} as const;
