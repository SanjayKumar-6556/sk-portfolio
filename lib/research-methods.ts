/**
 * Methods actually used in his research, as evidenced by the thesis, the JCAP paper
 * and the code in reionization-emulator / parameter-estimation-pipeline.
 *
 * Removed: "Variational inference" and "Hierarchical models" — his BNN samples the
 * weight posterior with NUTS/HMC and deliberately does NOT use VI, which the paper
 * write-up says in as many words; advertising VI here contradicted his own page.
 * "Simulation-based inference" went for the same reason: the emulator is trained on
 * simulations and then used inside an explicit likelihood, which is not SBI.
 */
export const researchMethods = [
  "Bayesian neural networks",
  "Metropolis-Hastings MCMC",
  "Hamiltonian Monte Carlo / NUTS",
  "Uncertainty quantification",
  "Neural surrogate emulation",
  "Importance sampling",
] as const;
