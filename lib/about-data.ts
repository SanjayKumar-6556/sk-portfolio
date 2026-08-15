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
   * Mono meta line. Intentionally optional and intentionally absent everywhere:
   * TODO(sanjay) — supply the real years for each entry (MSc start/end, the
   * Wowlabz internship, the Nestack start date). Until then no years are shown,
   * because a wrong year on a portfolio is worse than a missing one.
   */
  period?: string;
  title: string;
  org: string;
  lane: Lane;
  body: string;
};

/** Short factual opener. Deliberately free of adjectives about himself. */
export const aboutLede =
  "I trained as a physicist and I build AI systems. The second thing grew out of the first — I did not swap one for the other.";

/**
 * The journey, in his own order: maths and physics → IIT Indore → MSc in
 * astronomy → machine learning as another instrument for looking at the cosmos
 * → research pipelines → applied engineering.
 */
export const journeyParagraphs: string[] = [
  "Mathematics and physics were the subjects I was strongest in and the ones I kept choosing. That took me to IIT Indore for an MSc specialising in astronomy, which is where studying the cosmos stopped being an interest and became the work.",
  "During the MSc I started using machine learning as another instrument for looking at the cosmos, rather than as a separate subject. My research project was a neural-network emulator for 21-cm / Epoch-of-Reionization parameter estimation: an ANN for the predictions and a Bayesian neural network so the emulator could report how uncertain it was, instead of only a best guess. That work became a paper. Around it sat a long run of coursework assignments and small learning projects — the ordinary practice that made the research possible.",
  "What I found was that I enjoyed the building as much as the physics. Most of the effort in that project was not the model; it was the pipeline around it — generating and shaping training data, training, evaluating, and being able to say honestly how far the result could be trusted.",
  "My first industry work was an internship at Wowlabz. I built the backend of a multilingual pipeline, explored music generation with AI models, and built an internal dashboard that tracked KPIs and usage across the services the multilingual pipeline depended on.",
  "I am now at Nestack, where the recurring job has been to build the piece that was missing. Campaign data lived in a third-party CRM with no database of our own, so I built the databases. I built notification services for the internal team, and took over the Cognitor PHP applications and rebuilt many of their features. I built an app that generates templates automatically — Next.js front end, FastAPI back end — and then automated the rest of that path: the team's bulk-mail tool needed templates pasted into Google Sheets by hand, so template generation and template insertion now run end to end. Alongside that: job-board scrapers, Gemini-based scrapers used to collect industry-service data for the company, a demo automation pipeline, and a neural-network pipeline that classifies email by sentiment.",
  "The physics did not get left behind. Stating your assumptions, quantifying what you do not know, and deciding how you will evaluate something before you build it are the same habits either way — they are just applied to a mail pipeline now instead of a power spectrum.",
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
    title: "MSc, Astronomy",
    org: "IIT Indore",
    lane: "study",
    body: "A master's specialising in astronomy — the cosmos as the object of study, and mathematics as the instrument for reaching it.",
    // TODO(sanjay): confirm the exact degree wording and the start/end years.
  },
  {
    id: "emulator",
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
    title: "Internship",
    org: "Wowlabz",
    lane: "system",
    body: "The backend of a multilingual pipeline, an exploration of music generation with AI models, and an internal dashboard tracking KPIs and usage across the services that pipeline relied on.",
    // TODO(sanjay): confirm the company's official spelling ("Wowlabz" vs "Wow Labz"),
    // the dates, and how much of this work you are permitted to describe publicly.
  },
  {
    id: "nestack",
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
  "I am at Nestack, still building — most recently around template automation, scrapers, and email classification. The reionization emulator work from my MSc is written up as a paper; the thesis and its figures are what I am gradually adding to this site.";
// TODO(sanjay): add your city/country if you want a location shown anywhere on
// the site, and tell me whether "open to work" should stay on the home page.
