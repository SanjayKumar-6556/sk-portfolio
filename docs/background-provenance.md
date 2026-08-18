# Where the background textures came from

Not stock. Not generated. These are **Sanjay's own simulated 21-cm maps** — the thing his
MSc thesis and his JCAP paper are about — recoloured and darkened so they can sit behind
text as atmosphere rather than as illustration.

## Source

`~/Downloads/SANJAY_MSC_THESIS.pdf`, page 36, **Figure 3.4**: *"Simulated HI map and power
spectrum at x_HI values of 0.88, 0.63, and 0.29."* His own figure — the thesis credits six
of its figures to other sources and this is not one of them, which was checked before
using it. See `docs/figure-provenance.md` for that audit and for the one
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

---

## The light-theme twins — `eor-*-light.webp`

Same source, same figure, **derived from the dark set's own source, not from the dark
files**. Added when the site gained a light theme.

### Why they exist

The dark plates are dark-field: measured, not one pixel in any of the three is above
L 128. Composited on paper they are a grey blanket — `eor-mid` at its shipped 0.34
opacity measures **−25 L\*** against a light ground and drops muted ink to **3.4:1**, a
straight WCAG failure before a card goes on top. Turning them down does not rescue them:
at the alpha where the darkening matches dark mode's perceptual weight, the structure is
gone (sd < 0.7 L\* against dark's 4.22). That outcome costs the bytes and loses the idea.

There is also a physics problem with the obvious fixes. A plain composite or a
`multiply` blend puts the heaviest ink on the pixels that are **darkest in the source** —
i.e. on the **ionized voids**, where there is no hydrogen. The layer would say its one
fact backwards.

### What was done

Resized to 1200×1200, reduced to luminance, then mapped through a paper→ink ramp:

```
d    = min(1, L / 88) ** 3.0          # 88 = p99.8 across ALL THREE files
px   = lerp(paper #f6f7fa, ink #08566e, d)
```

The normaliser is **shared across the three files, not computed per file**, so the
early → mid → late density progression survives the transform. Measured mean ink density
comes out 0.465 / 0.345 / 0.155 — the same ordering as the dark set.

Gamma 3.0 means only the densest hydrogen inks and the voids fall back to paper, which is
what keeps the contrast cost low: the "background" of the plate is already the page
colour, so it costs nothing, and only the filaments spend contrast.

### The one thing to know before reusing them

**The tone is reversed relative to the dark set.** On the dark plates, bright = neutral
hydrogen. On the light twins, **dark ink = neutral hydrogen** and paper = ionized voids.
The signal is in the same place; the polarity of the ground is not.

That matters because the hero panel (`components/sections/hi-map-panel.tsx`) keeps its own
rainbow colormap in **both** themes — it is a real figure with a caption, and the caption
teaches the reader "dark regions are ionized bubbles". So on a light page the ambient
texture and the hero figure encode brightness in opposite directions. At 0.44 behind a
radial mask almost nobody decodes the ambient layer, and it is `aria-hidden` with no
caption, so nothing on the page makes a false claim — but the one hiring manager who
notices is exactly this site's audience, and it should be a deliberate choice rather than
a surprise.

| File | x_HI | Bytes |
| --- | --- | --- |
| `eor-early-light.webp` | 0.88 | 263 KB |
| `eor-mid-light.webp` | 0.63 | 183 KB |
| `eor-late-light.webp` | 0.29 | 86 KB |

Do **not** ship these as RGBA with the density in the alpha channel, elegant as that is:
WebP stores the alpha plane losslessly and `eor-early` comes out at 1.38 MB.
