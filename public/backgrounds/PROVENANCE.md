# Where the background textures came from

Not stock. Not generated. These are **Sanjay's own simulated 21-cm maps** — the thing his
MSc thesis and his JCAP paper are about — recoloured and darkened so they can sit behind
text as atmosphere rather than as illustration.

## Source

`~/Downloads/SANJAY_MSC_THESIS.pdf`, page 36, **Figure 3.4**: *"Simulated HI map and power
spectrum at x_HI values of 0.88, 0.63, and 0.29."* His own figure — the thesis credits six
of its figures to other sources and this is not one of them, which was checked before
using it. See `public/research/figures/PROVENANCE.md` for that audit and for the one
figure that was excluded because of it.

The page was rendered at 260 dpi; the three square map panels were detected by scanning
for saturated regions (they are the only colour-mapped areas on an otherwise black-and-
white page) and came out as exact 525×525 blocks.

## What was done to them

Upscaled to 1600×1600, reduced to luminance, crushed dark (`linear(0.42, -10)`), then
tinted to a slightly desaturated cyan `rgb(70,185,230)` so they sit inside the site's
accent family instead of fighting it. The original figure uses a rainbow colormap, which
would have been unusable here.

| File | x_HI | What it looks like |
| --- | --- | --- |
| `eor-early.webp` | 0.88 | Nearly neutral hydrogen — dense fine-grained texture, only small ionized voids. The busiest of the three. |
| `eor-mid.webp` | 0.63 | Ionized bubbles have grown and started merging. Balanced. |
| `eor-late.webp` | 0.29 | Mostly ionized — large black voids, sparse filaments. The most graphic, and the darkest. |

Read left to right they are reionization happening: the universe going from neutral to
ionized. That progression is the point, so if only one is used anywhere, prefer `mid`.

## Using them

They are **tone, not picture**. Expect heavy masking, low opacity and a colour wash over
the top. Text must clear AA contrast against whatever the densest patch behind it ends up
being — `eor-early` is the brightest, mean luminance around `rgb(1,67,95)`, and is the one
most likely to cause a contrast failure.

They are square and intended for `background-size: cover`. At 1600px the grain is fine
enough at desktop widths to read as texture rather than as a photograph, which is the
effect wanted.
