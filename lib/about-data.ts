export type TimelineEntry = {
  year: string;
  title: string;
  org: string;
  description: string;
};

export const timelineEntries: TimelineEntry[] = [
  {
    year: "—",
    title: "Roots & physics",
    org: "Jaipur → IIT Indore",
    description:
      "Formal training in physics shaped how I reason about evidence, uncertainty, and models.",
  },
  {
    year: "—",
    title: "M.Sc. research",
    org: "Cosmology × Bayesian ML",
    description:
      "Bayesian neural networks applied to cosmological inference — depth over breadth.",
  },
  {
    year: "—",
    title: "Industry AI engineering",
    org: "Production systems",
    description:
      "Shipping LLM workflows, automation, and internal platforms with observability and discipline.",
  },
];

export const beliefPillars = [
  {
    title: "Systems before features",
    body: "Engineering decisions outlive individual features; design for operation and change.",
  },
  {
    title: "Inference over intuition",
    body: "Uncertainty is information. Measure, update beliefs, and communicate limits honestly.",
  },
  {
    title: "Teaching is thinking",
    body: "If I cannot explain it clearly, I do not understand it well enough yet.",
  },
] as const;

export const skillCategories: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "SQL"],
  },
  {
    label: "AI / ML",
    items: ["LLM orchestration", "RAG patterns", "Evaluation", "Bayesian methods"],
  },
  {
    label: "Backend",
    items: ["APIs", "Async workflows", "Data pipelines"],
  },
  {
    label: "Infra & tools",
    items: ["Git", "Docker", "Cloud deploy", "CI"],
  },
  {
    label: "Research",
    items: ["MCMC", "Variational inference", "Hierarchical models"],
  },
  {
    label: "Domain",
    items: ["Cosmology", "Scientific computing"],
  },
];
