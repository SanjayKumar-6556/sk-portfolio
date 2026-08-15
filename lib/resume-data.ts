/**
 * The résumé page's content.
 *
 * SINGLE SOURCE: Sanjay's own résumé, ~/Downloads/SANJAY_RESUME.pdf (7 Jul 2026) —
 * the most recent of the many versions in ~/Downloads — cross-checked against his
 * own spoken account of his career (Aug 2026). Job titles, employer legal names,
 * dates, grades, talks and the publication all come from that document.
 *
 * An earlier pass used SKY_Resume.pdf (Oct 2025), which is superseded and disagreed
 * with the current one on both job titles. If these ever conflict again, the newest
 * résumé wins — it is the version he is actually sending to employers.
 *
 * Nothing here is estimated or inferred. Open questions are marked TODO(sanjay).
 */

export const resumeSummary =
  "AI/ML engineer with a research background in cosmology and Bayesian inference. I build automation systems, data pipelines and applied ML — and I came to them through physics, which is still how I think about problems.";

export const experience = [
  {
    role: "AI/ML Software Engineer",
    org: "Nestack Technologies",
    period: "Mar 2025 — Present",
    bullets: [
      "Leading development of an AI-powered document processing platform that turns large volumes of unstructured documents into structured data, then runs analytical algorithms over it to generate reports for clients' customers.",
      "Built the campaign data layer from scratch: campaigns had previously lived only in a third-party CRM with no database of their own, so I designed the MySQL schemas, backend APIs and dashboards they now run on.",
      "Designed and built production Python automation for internal business workflows, including the notification services the internal team runs on.",
      "Built a template-generation app (Next.js front end, FastAPI back end) and wired it into the team's bulk-mail workflow, which until then required every template to be pasted into Google Sheets by hand — generation and insertion now run automatically.",
      "Built scalable data-collection pipelines: Gemini-based, Google Maps and job-board scrapers.",
      "Built GitHub Actions workflows for automated software generation, integrating Claude AI.",
      "Built an internal ERP system for associate workflows and projects, took over a set of existing PHP applications and rebuilt many of their features, and built a neural-network pipeline that classifies incoming email by sentiment.",
    ],
  },
  {
    role: "AI/ML Developer (Intern)",
    org: "Wow Labz Pvt. Limited",
    period: "May 2024 — Nov 2024",
    bullets: [
      "Built the backend of a multilingual video-translation pipeline as a Dockerized Python service, integrating external translation and text-to-speech models and using Kafka to stream data between pipeline stages.",
      "Built a SvelteKit monitoring dashboard that tracked pipeline progress and API usage costs in real time.",
      "Prototyped a generative-AI proof of concept for automated audio music generation.",
    ],
  },
];

export const education = [
  {
    degree: "M.Sc., Astronomy",
    school: "Indian Institute of Technology (IIT) Indore",
    // His résumé's education table gives the completion year and CGPA, not a range.
    // TODO(sanjay): add the start year if you want a range shown here.
    period: "2024",
    detail:
      "CGPA 8.85/10. Thesis: Bayesian and artificial neural-network emulators for 21-cm / Epoch-of-Reionization parameter estimation, under Dr. Suman Majumdar.",
  },
  {
    degree: "B.Sc.",
    school: "University of Rajasthan",
    period: "2020",
    detail: "80.96%.",
  },
];

export const selectedProjects = [
  "Bayesian neural-network emulators for 21-cm reionization inference (MSc thesis, and a JCAP paper)",
  "Multilingual video-translation pipeline — translation and text-to-speech, with a monitoring dashboard",
  "Document-processing platform turning unstructured documents into structured, analysable data",
  "Metropolis-Hastings MCMC for cosmological parameter estimation from Type Ia supernovae",
];

export const resumeResearch = [
  "Bayesian neural networks for cosmological (21-cm / Epoch-of-Reionization) parameter inference",
  "MCMC and importance sampling for Type Ia supernova cosmological constraints",
];

/**
 * All three are listed on his résumé. The 21-cm Cosmology Workshop poster is the one
 * with an artefact on disk (published at /research/iitm-21cm-workshop-poster-2024.pdf).
 */
export const talks = [
  "Invited talk — Cosmological Data Analysis with AI/ML and Bayesian Inference, IIT Indore (2025)",
  "Poster — 21-cm Cosmology Workshop, IIT Madras (2024)",
  "Research talk (online) — SKA Cosmic Dawn / EoR Science Team meeting, Tsinghua University (2024)",
];

/**
 * Taken from the skills block of his résumé. Deliberately excludes anything that
 * appears on neither the résumé nor in his code — an interviewer will probe these.
 */
export const resumeSkills =
  "Python, SQL, JavaScript (intermediate) · PyTorch, TensorFlow, Pyro, scikit-learn, NumPy, SciPy, Pandas · Bayesian inference, probabilistic ML, MCMC, Bayesian and artificial neural networks, statistical data analysis, numerical computing · FastAPI, Next.js (intermediate) · MySQL, MongoDB · Kafka, Docker, Git.";
