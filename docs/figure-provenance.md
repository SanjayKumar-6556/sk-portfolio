# Where these figures came from

Every image in this folder is Sanjay's own work, extracted from documents he authored.
None is stock, generated, or illustrative. Keep it that way — if a figure is ever added
here without a traceable source, it does not belong on this site.

Source documents:
- **Poster** — `~/Downloads/IITM_Poster.pdf`, rendered at 120 dpi (3974 × 5618) and cropped.
  Published on the site as `/research/iitm-21cm-workshop-poster-2024.pdf`.
  *Constraining Reionization Parameters from 21-cm Power Spectrum through BNN-based Emulator
  using Bayesian Inference* — **Sanjay Kumar Yadav (first author)**, Yashrajsinh Mahida,
  Leon Noble, Suman Majumdar. DAASE, IIT Indore, December 2024.
- **Emulator repo** — `~/code_playground/my_projects/reionization-emulator/results/`.

| File | What it shows | Source |
| --- | --- | --- |
| `fig-inference-pipeline.webp` | The forward/backward inference loop: parameters → simulation → power spectrum → BNN emulation → observation → likelihood → posterior → propose new parameters. The one figure that explains the whole project. Bespoke to his pipeline — it carries his own covariance decomposition, Σ_Cov = Σ_SV + Σ_N + Σ_PU. | Poster, §2 |
| `fig-emulator-vs-training-size.webp` | Six panels, training sets of 7150 / 3000 / 1000 / 500 / 200 / 100. The headline result: as the training set shrinks the ANN drifts off the true power spectrum while the BNN stays inside a widening uncertainty band. | Poster, §4 |
| `fig-constrained-parameters.webp` | Corner plots of the three reionization parameters (M_h,min, N_ion, R_mfp) constrained through the ANN emulator and through the BNN emulator, large training set, three MCMC chains each. | Poster, §5a |
| `bnn-posterior-corner.webp` | A standalone posterior corner plot — BNN at x_HI = 0.38, 1000-sample training set, three chains, recovered parameters shown against the true values. | `reionization-emulator/results/BNN_4383_0.377_1000data.jpg` |

## One figure was extracted and then deleted. Read this before adding more.

A "Standard Neural Network vs Bayesian Neural Network" diagram appears on the poster
(§3) with **no credit line**. It was extracted, and then removed, because the *same
diagram* appears in his thesis as Figure 3.11 with the caption:

> "Point values of weights and biases in ANNs (left plot) and distribution of weights and
> biases in BNNs (right plot). **Image Credit:[45]**"

Reference [45] is a Towards Data Science article. The figure is not his. Publishing it
here as part of his work would be a straightforward attribution failure on a page whose
whole purpose is to be believed by employers.

**The lesson: the poster is not a safe source on its own.** A conference poster routinely
reuses explanatory diagrams without a visible credit; the thesis is where the credits are
written down. Before lifting anything else from the poster, find the corresponding thesis
figure and read its caption. The thesis credits at least six figures to other sources —
Figures 3.2 (Bayes formula), 3.3 (Markov chain), 3.6 (ANN architecture), 3.9
(backpropagation), 3.10 (gradient descent) and 3.11 (ANN vs BNN weights). None of those
may be used. Results plots, corner plots and the inference-pipeline diagram are his own.

## Using them

They are **light-background scientific figures on a dark site**. Do not invert or recolour
them — these are published research figures and altering them misrepresents the record.
Present them on a light plate inside the dark card, the way a paper would. That reads as
"a real figure from real work" rather than as a styling mistake.

`fig-constrained-parameters.webp` and `bnn-posterior-corner.webp` carry small axis labels;
give them room, and let them open full-size rather than shrinking them into a card.
