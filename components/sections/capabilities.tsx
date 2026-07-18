import { Brain, Cpu, Rocket } from "lucide-react";
import { FadeUp } from "@/components/motion/fade-up";

const items = [
  {
    icon: Cpu,
    title: "AI systems & LLM workflows",
    description:
      "Design and ship orchestration layers, eval loops, and guardrailed agents that survive production traffic.",
  },
  {
    icon: Brain,
    title: "Research-grade inference",
    description:
      "Bayesian thinking meets engineering: uncertainty-aware models, careful experimentation, honest metrics.",
  },
  {
    icon: Rocket,
    title: "Production engineering",
    description:
      "Reliable APIs, observability, and automation — systems that teams can operate without heroics.",
  },
];

export function Capabilities() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-22 md:py-30">
      <FadeUp>
        <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-text-primary md:text-5xl">
          What I do
        </h2>
      </FadeUp>
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {items.map((item, i) => (
          <FadeUp key={item.title} delay={0.08 * i}>
            <article className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-accent-cyan/25 hover:bg-white/[0.06]">
              <item.icon
                className="h-8 w-8 text-text-muted"
                strokeWidth={1.25}
              />
              <h3 className="mt-6 font-sans text-xl font-semibold text-text-primary">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary md:text-base">
                {item.description}
              </p>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
