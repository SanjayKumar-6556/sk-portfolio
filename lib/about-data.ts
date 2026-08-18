/**
 * About-page content.
 *
 * PROVENANCE RULES FOR THIS FILE
 * ------------------------------
 * Every factual claim below is traceable to Sanjay's own account of his work.
 * Nothing here is inferred, rounded, or dramatised: no metrics, no dates he did
 * not give, no job titles he did not state, no technologies he did not name.
 *
 * Where a fact is missing it is left out and marked `TODO(sanjay)` in a comment
 * rather than filled with a plausible guess. Those comments are for him and are
 * deliberately NOT part of any exported string — nothing in this file that a
 * visitor can read is addressed to Sanjay.
 */

/**
 * Lanes follow the site-wide colour grammar:
 *   research → violet (provenance marker)
 *   system   → cyan   (shipped engineering)
 *   study    → muted  (training / coursework, honestly labelled)
 */
export type Lane = "research" | "system" | "study";

export const laneLabel: Record<Lane, string> = {
  research: "Research",
  system: "Built",
  study: "Study",
};

export type TimelineEntry = {
  id: string;
  /**
   * Mono meta line. Now filled from verified repo sources (lib/resume-data.ts
   * and content/research/msc-thesis.mdx) everywhere they exist.
   * TODO(sanjay) — still missing: your MSc START year, so "2024" can become a
   * range, and whether the Foundations entry should carry dates at all. A wrong
   * year on a portfolio is worse than a missing one, so neither is guessed.
   */
  period?: string;
  title: string;
  org: string;
  lane: Lane;
  body: string;
};

/** Short factual opener. Deliberately free of adjectives about himself. */
export const aboutLede =
  "I trained as a physicist and I build AI systems. The second came out of the first: the machine learning arrived as the answer to a physics problem, not as a change of subject.";

/**
 * The journey as one argument, not a list of stops: physics → an inference
 * problem in cosmology → a neural network as the answer to it → uncertainty as
 * a requirement rather than a decoration → the pipeline around the model →
 * applied engineering.
 *
 * The hinge is paragraphs 2 and 3: the simulation is too expensive to run
 * inside a sampler, so an emulator replaces it; a deterministic emulator cannot
 * propagate its own error into the posterior, so the emulator has to be
 * Bayesian. Both statements are his own, from
 * content/projects/bayesian-neural-network.mdx and content/research/msc-thesis.mdx.
 * No number is quoted that those pages do not already carry, and no speed claim
 * is made at all.
 */
export const journeyParagraphs: string[] = [
  "Mathematics and physics were the subjects I was strongest in and the ones I kept choosing. They took me to IIT Indore, to an MSc in astronomy, and to the Epoch of Reionization — the period when ultraviolet light from the first galaxies ionised the neutral hydrogen filling the early Universe. The redshifted 21-cm line of that hydrogen is the most direct probe of the era, and my thesis was about what can be inferred from it.",
  "Inference is where the machine learning came from. To recover reionization parameters from a 21-cm measurement you compare it against a model, and the model is a semi-numerical simulation — expensive enough that you cannot run it inside a sampler that needs millions of forward evaluations. An emulator solves that: a neural network trained on a library of simulated spectra, standing in for the simulation. I did not leave physics for machine learning. The physics problem asked for it.",
  "An ANN emulator for this already existed. I retrained and improved it, widening the training library's coverage and then increasing the density of samples in the regions where its predictions were most wrong, which is a data problem rather than a model problem. That left the structural limitation untouched: an ANN returns one number per k-bin and no statement of how much to trust it, so when it stands in for the simulation inside Bayesian inference its own error never reaches the recovered parameters and the final error bars understate the truth. So I built a Bayesian emulator, with distributions over its weights instead of fixed values, and put its predictive variance into the likelihood covariance alongside sample variance and instrument noise. The uncertainty stopped being a band on a plot and became a term in the inference.",
  "That work became a paper: JCAP 12 (2025) 055, where I am second author of nine. The 21-cm power-spectrum emulator is the half of it that is mine — the bispectrum emulator is my collaborators' work — and I presented the power-spectrum half as first author on a poster at IIT Madras in December 2024.",
  "Most of the effort in that project was not the model. It was the pipeline around it: building and shaping the training library, training, running the sampler, evaluating, and being able to say honestly how far the result could be trusted. I found I liked that part as much as the physics, and it is the part that transfers.",
  "My first industry work was an internship at Wow Labz. I built the backend of a multilingual video pipeline — transcribe the narration, translate it, synthesise speech in each target language, then mux everything into one file with a selectable audio track per language — and a dashboard that tracked what the pipeline was doing and what its API calls were costing. I also prototyped music generation with AI models. It was the same shape of problem as the research: stages, artefacts, and something watching the run.",
  "I am now at Nestack, where the recurring job has been to build the piece that was missing. Campaign activity lived in a third-party CRM with no database of its own, so I designed the MySQL schemas, backend APIs and dashboards it runs on now. The bulk-mail tool needed every template pasted into Google Sheets by hand, so I built an app that generates templates — Next.js front end, FastAPI back end — and automated the insertion, and that path now runs end to end. Alongside it: notification services for the internal team, a takeover and rebuild of the Cognitor PHP applications, job-board and Gemini-based scrapers, a demo automation pipeline, and a neural network that classifies incoming email by sentiment. I am also leading development of a document-processing platform that turns large volumes of unstructured documents into structured data and runs analytical algorithms over it to generate reports for clients' customers.",
  "The physics did not get left behind. State your assumptions. Quantify what you do not know. Decide how you will evaluate something before you build it. When a model is failing, find out where in the input space it fails and fix the data before reaching for a bigger model. Those habits came off a power spectrum, and they work the same on a mail pipeline.",
];

export const timelineEntries: TimelineEntry[] = [
  {
    id: "foundations",
    title: "Mathematics and physics",
    org: "Foundations",
    lane: "study",
    body: "The subjects I was strongest in, and the ones I kept choosing. Everything after this is downstream of that.",
    // TODO(sanjay): name the undergraduate institution and years if you want them shown.
  },
  {
    id: "msc",
    period: "2024",
    title: "MSc, Astronomy",
    org: "IIT Indore",
    lane: "study",
    body: "A master's specialising in astronomy — the cosmos as the object of study, and mathematics as the instrument for reaching it.",
    // TODO(sanjay): confirm the exact degree wording and the start/end years.
  },
  {
    id: "emulator",
    period: "June 2023 – May 2024",
    title: "Neural-network emulator for reionization",
    org: "MSc research project",
    lane: "research",
    body: "An ANN and a Bayesian neural network trained to emulate 21-cm / Epoch-of-Reionization power spectra, so reionization parameters can be estimated without paying for a full simulation at every step. The Bayesian half returns an uncertainty alongside its prediction. This work became a paper.",
    // TODO(sanjay): supply the full citation (authors, venue, year, DOI/arXiv) so
    // it can be printed verbatim and linked. It is stated as a fact here because
    // you told me the paper exists; the reference itself is still missing.
  },
  {
    id: "wowlabz",
    period: "May 2024 — Nov 2024",
    title: "Internship",
    org: "Wowlabz",
    lane: "system",
    body: "The backend of a multilingual pipeline, an exploration of music generation with AI models, and an internal dashboard tracking KPIs and usage across the services that pipeline relied on.",
    // TODO(sanjay): confirm the company's official spelling ("Wowlabz" vs "Wow Labz"),
    // the dates, and how much of this work you are permitted to describe publicly.
  },
  {
    id: "nestack",
    period: "Mar 2025 — Present",
    title: "Applied AI engineering",
    org: "Nestack",
    lane: "system",
    body: "Databases for campaign data that previously had none, internal notification services, a takeover and rebuild of the Cognitor PHP applications, an automatic template-generation app (Next.js and FastAPI) wired end to end into the team's bulk-mail flow, scrapers for job boards and industry services, a demo automation pipeline, and a neural-network pipeline that classifies email by sentiment.",
    // TODO(sanjay): your exact job title here, and the start date. Both are stated
    // nowhere on the site until you give them.
  },
];

/**
 * What the research training left behind. Each item is anchored to something he
 * actually built — no free-floating philosophy, no invented convictions.
 */
export const whatCarriedOver = [
  {
    title: "Uncertainty is a result",
    body: "The Bayesian half of the emulator exists because a prediction without an error bar is not much use for inference. I try to keep that property in the systems I build now.",
  },
  {
    title: "The model is the small part",
    body: "Most of what I have shipped is a pipeline rather than a model: data in, generation, insertion, monitoring. That was true of the research too.",
  },
  {
    title: "Build the missing piece",
    body: "A lot of the work has been noticing a manual step or an absent system — no database for campaigns, templates pasted into a sheet by hand — and replacing it with something that runs itself.",
  },
] as const;

/**
 * Only technologies Sanjay has named in his own account of the work, or that
 * already appear in the verified résumé data in this repo. Nothing added for
 * padding — an absent skill costs him nothing, an unearned one costs an interview.
 *
 * TODO(sanjay): this list is deliberately short. Add the tools you actually use
 * day to day (cloud, containers, queues, testing) and I will group them.
 */
export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "PHP", "SQL"],
  },
  {
    label: "Machine learning",
    items: [
      "Neural networks",
      "Bayesian neural networks",
      "Uncertainty quantification",
      "Text classification",
    ],
  },
  {
    label: "Services & interfaces",
    items: ["FastAPI", "Next.js", "Notification services", "Dashboards"],
  },
  {
    label: "Data & automation",
    items: [
      "Database design",
      "Pipeline automation",
      "Web scraping",
      "Gemini API",
      "Google Sheets automation",
    ],
  },
  {
    label: "Research",
    items: [
      "21-cm / Epoch-of-Reionization emulation",
      "Bayesian inference",
      "Scientific computing",
    ],
  },
];

/** Present tense, ongoing, no forecasting. */
export const currentlyBody =
  "I am at Nestack, still building — most recently around template automation, scrapers, and email classification. The reionization emulator work from my MSc became JCAP 12 (2025) 055, where I am second author of nine; the 21-cm power-spectrum emulator is the part that is mine.";
// TODO(sanjay): add your city/country if you want a location shown anywhere on
// the site, and tell me whether "open to work" should stay on the home page.
