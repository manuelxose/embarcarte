# MC-04 — MAREA identity system (construction, geometry and rules)

| Field       | Value                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| Document ID | `MC-04 / IDENTITY-SYSTEM` · deliverable **D-01**                                                                   |
| Milestone   | MC-04 — MAREA visual identity (INTERNAL, PROVISIONAL)                                                              |
| Owner       | IdentityVector (identity + vector design)                                                                          |
| Date        | 2026-10-30                                                                                                         |
| Status      | `PROPOSED`. Not adopted. Not cleared. Not published                                                                |
| Artwork     | D-02 lockups + compact mark, D-03 nine family lockups (`docs/marea/brand/assets/logo/`)                            |
| Evidence    | `territories/evidence/svg-geometry-report.md` (measured `getBBox`), `territories/evidence/reading-test-native.png` |

## 0. Status statement — read before using anything here

> **MAREA is a proposed brand.** `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`,
> `MC-03_TRADEMARK_RESEARCH = OPTION_B`, `ORIGINALITY_PROFESSIONAL_CHECK = PENDING`,
> `PUBLIC_MAREA_BRAND_USE = NO_GO`, `FINAL_IDENTITY_ADOPTION = BLOCKED`,
> `PUBLICATION = BLOCKED`.
>
> The artwork in this milestone is **authored vector artwork** (all paths constructed by this
> programme from the rules below; no font outlines, no traced or downloaded artwork, no
> generated imagery). Nothing here is declared original, distinctive in law, registrable or free
> of third-party rights. No registered or unregistered trademark symbol may be used with MAREA,
> a family name or a bundle name. No certification, availability, performance or safety claim is
> made or implied.
>
> **The frozen D-02/D-03 files in this milestone are built on the Territory C (SIGNAL TRUNK)
> construction.** The Lead's internal preference is `PREFERRED_PROVISIONAL = B (BEARING INDEX)`,
> and the C construction failed the small-size reading test recorded in
> `TERRITORY-COMPARISON.md` §6 (it reads as a bar chart/equaliser at 16–48 px). Therefore the
> frozen files are a **prototype of the system**, not an adopted identifier. The rules in §2, §3
> and §4 (Layer A) are symbol-agnostic and remain valid if the ratified symbol differs; the
> specific symbol, wordmark outline and lockup files (Layer B) are provisional and replaceable.

## 1. Scope, layers and what this document governs

Two layers are separated deliberately so that a legal or design change does not destroy the
whole system:

| Layer                                    | Content                                                                                                                                                                                                                                                                                                                                                                                                                  | Stability                                                                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **Layer A — reusable foundations**       | construction-grid convention; monoline terminal logic (square cuts, flat acute junctions); optical spacing model (`gap(a,b) = 20 + r(a) + l(b)` at cap 100); clear-space rule 0.5 × cap height; family ratio 0.700 and word space 0.260 × cap; family rule "one construction, no per-family symbol"; SVG hygiene and byte budgets; measurement harness (`territories/tools/check.mjs`); naming conventions; misuse rules | **Reusable.** Survives a change of figurative symbol                                                                        |
| **Layer B — provisional MAREA identity** | the specific symbol construction (C frozen files; B preferred candidate); the specific `MAREA` outline; the lockup files (`marea-lockup-*.svg`, `marea-mark-*.svg`, `family/*.svg`); the geometry values instantiated from Layer A                                                                                                                                                                                       | **Provisional.** Replaceable on Lead decision, legal advice or the professional originality check. Not adopted, not cleared |

Everything in Layer B is `PROPOSED`. No part of this document authorises public use.

## 2. Construction system (Layer A)

### 2.1 Grid and module

| Rule              | Value                                                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Symbol grids      | 24 × 24 units (Territories A and C) · 32 × 32 units (Territory B)                                                                                              |
| Wordmark grid     | cap height 100 units, baseline y = 100 (y increases downwards in the SVG masters)                                                                              |
| Unit rule         | every horizontal/vertical edge and every diagonal vertex sits on the grid or on a documented 45° construction; no freehand or eyeballed point                  |
| Curves            | Territory B only: circular arcs, mathematically defined from one centre and radius; no Bézier guessing                                                         |
| Master form       | single ink; no gradient, shadow, bevel, texture, transparency, filter or raster in the master artwork                                                          |
| Grid in the asset | not printed into the master; the grid is shown only in the construction drawings (`territories/*-construction.svg`, `assets/logo/marea-construction-grid.svg`) |

### 2.2 Stroke and ink logic

| Element                      | Value                                                             | Derivation                                                                                                                                                                                                                             |
| ---------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wordmark stem                | 16 units at cap 100 (**16 % of cap**)                             | monoline by design: one weight for all letters, flat square terminals, so engraving and 16 px reproduction are predictable                                                                                                             |
| Wordmark horizontal arms     | 16 units                                                          | monoline: no optical thinning is applied, because a second weight would break the one-rule construction and add a maintenance surface (recorded as a deliberate choice, not an oversight)                                              |
| C symbol rail                | 2 units of a 10-unit ink height (**20 % of the symbol height**)   | at lockup scale ×10 this is 20 units of the 100-unit cap: heavier than the wordmark stem so the symbol reads as an object, not as another letter                                                                                       |
| C key widths                 | 2.5 / 4 / 3 units                                                 | unequal by design; a histogram uses equal widths, a terminal block does not                                                                                                                                                            |
| B arc stroke                 | 2.5 units at r = 13 on the 32 grid (**8.6 % of the mark height**) | instrument-grammar weight; **open item**: this is lighter than the wordmark's 16 %, so a ratified B lockup requires an optical weight correction (or a documented decision that the symbol is intentionally lighter) before production |
| Minimum stroke in the master | 1.2 units (C screw slot)                                          | the smallest authored feature; at 16 px this is ≈1.9 px and is retained only as a texture, not as a recognition cue                                                                                                                    |

### 2.3 Corner logic (one rule for all acute junctions)

All acute or near-acute junctions are **truncated to a flat terminal** of 8 units (wordmark) or
to a squared cut (symbols). This is why the letterforms have a flat apex (A), a seated flat valley
(M), a flat bottom (V) and a flat cut on the R leg: one documented engraving rule rather than four
different treatments. At the 16 px lockup the flat cuts remain horizontal, so they do not thin to a
knife edge in silkscreen or laser marking.

### 2.4 Optical corrections (documented, not eyeballed)

| Correction                    | Applied value                                                                                                | Why                                                                                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Miter allowance for 90° joins | ink box is 8 units inside the centreline on every side (cap 100)                                             | a mitred 90° corner extends 8 units past the centreline; measuring the cap from the ink, not the centreline, keeps the wordmark cap height exact             |
| M valley                      | valley vertex on the baseline, flat seat 8 units wide, notch bottom 14 units above the baseline              | the notch must read at 16 px without the diagonal bands merging into a solid centre; verified in the 16 px lockup render                                     |
| A apex                        | flat 8-unit apex, crossbar 48 × 16 units at y 58                                                             | flat apex matches the M valley and the V bottom; sharp apexes thin out in engraving                                                                          |
| R leg junction                | leg starts at the bowl's bottom edge (top edge 44–60 at y 68) and is cut flat on the baseline (bottom 52–68) | removes the junction notch and the protruding thin leg of the earlier prototype; the leg extends 8 units past the bowl's right edge as a deliberate diagonal |
| Sidebearings                  | nominal gap 20 + per-letter corrections (table §3.3)                                                         | diagonals recede (negative correction), a protruding leg needs a tighter right correction; I is tightened so a bare stem reads as a letter                   |
| Symbol-to-wordmark gap        | 75 units = 0.75 × cap, ink-to-ink                                                                            | brief §3.1/§3.3; measured on every lockup at 75.00 ± 0.15                                                                                                    |
| Symbol vertical alignment     | symbol ink band = cap band (50…150 in the lockup); rail bottom on the baseline                               | brief Territory C rule; measured on every lockup                                                                                                             |
| Clear space                   | 50 units = 0.5 × cap baked into the lockup viewBox on all four sides                                         | see §6                                                                                                                                                       |

## 3. Master wordmark — `MAREA` (Layer B, provisional)

### 3.1 Parameters

| Parameter            | Value                                                                             |
| -------------------- | --------------------------------------------------------------------------------- |
| Case                 | uppercase master (required); title-case alternative evaluated and rejected (§3.4) |
| Cap height           | 100 units                                                                         |
| Stem / arm weight    | 16 units (monoline)                                                               |
| Terminals            | squared (butt), no radius                                                         |
| Construction         | filled outlines only; no font, no `<text>`, no stretched or manually tracked type |
| Ink width (measured) | **430.96 units**                                                                  |
| Ink file             | `docs/marea/brand/assets/logo/marea-wordmark.svg` (1,425 B)                       |

### 3.2 Glyph construction (ink widths, cap 100)

| Glyph | Ink width | Construction                                                                                  |
| ----- | --------: | --------------------------------------------------------------------------------------------- |
| M     |     82.00 | two vertical stems + one V-band, valley seated flat on the baseline (8-unit seat)             |
| A     |     75.48 | two diagonal bands + flat 8-unit apex + 48 × 16 crossbar at y 58                              |
| R     |     68.00 | vertical stem + closed square bowl (60 wide, 52 deep) + diagonal leg cut flat on the baseline |
| E     |     64.00 | stem + top and bottom arms 64 long, middle arm 50 long (optically shortened)                  |

Letters not required by `MAREA` but required by the nine family tokens are constructed from the
same rules: B, C, D, F, H, I, L, N, O, P, S, T, U, V, W, Y. The `I` is a bare 16-unit stem with
tight sidebearings; `S` uses a rectilinear spine (bar-vertical-bar-vertical-bar), consistent with
the panel-lettering logic rather than a calligraphic curve.

### 3.3 Spacing model (Layer A, one rule for all strings)

```
gap(a, b) = 20 + r(a) + l(b)        (cap 100 units)
```

Per-letter corrections used by `MAREA` and the family tokens:

| Letter     | left correction | right correction |
| ---------- | --------------: | ---------------: |
| A          |              −4 |               −4 |
| V          |              −3 |               −3 |
| W          |              −2 |               −2 |
| M          |               0 |                0 |
| N          |              −1 |                0 |
| R          |               0 |               −2 |
| I          |              −5 |               −5 |
| L          |               0 |               −1 |
| T          |              −1 |               −1 |
| Y          |              −2 |               −2 |
| all others |               0 |                0 |

Measured gaps in the master wordmark:

| Pair | Nominal | Corrections |       Gap |
| ---- | ------: | ----------- | --------: |
| M–A  |      20 | 0 + (−4)    | **16.00** |
| A–R  |      20 | (−4) + 0    | **16.00** |
| R–E  |      20 | (−2) + 0    | **18.00** |
| E–A  |      20 | 0 + (−4)    | **16.00** |

Total advances: 82.00 + 16 + 75.48 + 16 + 68.00 + 18 + 64.00 + 16 + 75.48 = 430.96 units. The
spacing is generated by the model, not by eye; every pair value is listed above.

### 3.4 Title-case alternative — evaluated and rejected

A title-case study (`M` + constructed single-storey x-height letters, x-height 70 / cap 100) exists
as `docs/marea/brand/territories/wordmark-case-study.svg` (1.4 kB, 3,770 B). Decision: **rejected**.

| Reason            | Detail                                                                                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Family system     | every family token is uppercase (`MAREA NAV`…), so title case forces a case mix in all nine lockups                                                                    |
| Small size        | x-height letters occupy 70 % of the cap band, so the word loses 30 % of its height at 16 px and in 8 mm engraving                                                      |
| Construction cost | a second letterform set doubles the maintenance surface and creates a per-context case choice, which the programme forbids ("not left to per-page choice", brief §3.2) |
| Naming system     | the canonical master brand is uppercase (`PRODUCT-NAMING-SYSTEM.md` §5); the identity must not contradict the naming system                                            |

No per-page or per-surface case choice is permitted. Uppercase is the master form.

## 4. Symbols (Layer B, provisional)

### 4.1 Frozen files (Territory C construction, prototype only)

| Property       | Value                                                                                                                                                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Symbols        | `marea-mark-compact.svg` (24 × 24 viewBox; ink 15.5 × 10, centred: margins L/R 4.25, T/B 7) · `marea-mark-reduced-16.svg` (16 × 16; ink 10 × 7.8, centred: margins L/R 3, T/B 4.1)                                     |
| Construction   | one bus rail on the baseline (15.5 × 2), three terminal keys with squared caps (widths 2.5 / 4 / 3; heights 2 / 8 / 6; gaps 2.5 / 1.5), centre key raised to the cap line, one 1.2 × 1.8 screw slot splitting its head |
| Ink band       | exactly 10 units tall (y 4…14) → lockup scale is a flat ×10; rail bottom lands on the baseline; centre key top lands on the cap line                                                                                   |
| Reading result | **fails the small-size reading test** (reads as a bar chart/equaliser). Recorded in `TERRITORY-COMPARISON.md` §6; not rationalised                                                                                     |

### 4.2 Preferred candidate geometry (Territory B — not delivered as final files)

| Property                  | Value                                                                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Grid                      | 32 × 32                                                                                                                                                                                                      |
| Structure                 | 270° calibrated arc (r = 13, stroke 2.5) open 90° at the lower right; 3.5 × 15 bearing index at 0°; 3 × 3 square datum at the optical centre; two asymmetric radial ticks (4.5 and 2 units) crossing the arc |
| Ink                       | 28.72 × 29.25 units; optical centre 48.6 % of the mark height (brief: arc centre aligns to mid-cap)                                                                                                          |
| Lockup rule (if ratified) | symbol ink band = 100-unit cap band; scale = 100 / 29.25 = 3.4188; ink gap 75; clear space 50                                                                                                                |
| Open item                 | symbol stroke is 8.6 % of its height vs 16 % for the wordmark stem; a ratified B lockup needs an optical weight correction or a documented lighter-symbol decision                                           |
| Reading result            | passes as an instrument-arc fragment at 24–48 px; residual letter-"C"/compass-app risk at 16 px recorded                                                                                                     |

The B construction is delivered only as a territory prototype
(`territories/territory-b-*`); no D-02/D-03 file is built from it.

### 4.3 Dropped candidate

Territory A (ISOBATH) is dropped on the brief §3.3 kill criterion (generic wave / radiating
signal-arc reading) and is retained only as documented rejected evidence
(`territories/territory-a-*`).

## 5. Lockups (Layer A rules applied to Layer B files)

### 5.1 Horizontal primary lockup

Structure, left to right: **symbol · 75-unit ink gap (0.75 × cap) · `MAREA` (cap 100)**.

| Asset      | File                        | Colour role                                                       | Measured geometry                                                                                                                         |
| ---------- | --------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Primary    | `marea-lockup-primary.svg`  | ink `#17365d` (existing corporate navy token)                     | viewBox 760.96 × 200; symbol ink 155 × 100 at x 50…205; wordmark 430.96 × 100 at x 280…710.96; ink gap 75.00; clear space 50 on all sides |
| Monochrome | `marea-lockup-mono.svg`     | single ink `#101820`                                              | same geometry (only `color` differs)                                                                                                      |
| Reversed   | `marea-lockup-reversed.svg` | single ink `#f2f9fd` (existing `--mist` token) on dark substrates | same geometry                                                                                                                             |

All three are the same outline; only the ink value changes. No opacity, no second colour, no
effects. Files are 1,982 B each (budget ≤ 20 kB).

### 5.2 Family lockup rule (one rule, nine families)

```
[symbol]  [gap 75]  MAREA (cap 100)  [word space 26 = 0.26 × cap]  FAMILY (cap 70 = 0.700 × cap)
```

- The family token is the **same construction scaled to 0.70 cap** (glyph outlines and advances
  both scaled), aligned on the same baseline. It is not a second typeface, a different weight, or
  real small caps from a font.
- Family tokens are English nautical terms and are never translated: `NAV`, `HUB`, `AIS`, `PILOT`,
  `SENSE`, `WATCH`, `DISPLAY`, `WEATHER`, `FLEET`.
- Edition words (`Essential`, `Pro`, …) are title case and sit outside the lockup; the lockup
  carries the family only.
- **No per-family symbol.** All nine files share the identical symbol, wordmark, gap and word
  space; only the family token changes.
- Measured family lockups: family ink height 70.00 (0.700 × cap), word space 26.00 (0.260 × cap),
  baseline aligned with the wordmark to ≤ 0.05 units; byte range 2,494–3,208 B (≤ 20 kB).

| Family lockup | File                                     | viewBox       | Family ink  |
| ------------- | ---------------------------------------- | ------------- | ----------- |
| MAREA NAV     | `family/marea-family-nav-lockup.svg`     | 964.73 × 200  | 177.77 × 70 |
| MAREA HUB     | `family/marea-family-hub-lockup.svg`     | 956.36 × 200  | 169.40 × 70 |
| MAREA AIS     | `family/marea-family-ais-lockup.svg`     | 909.80 × 200  | 122.84 × 70 |
| MAREA PILOT   | `family/marea-family-pilot-lockup.svg`   | 1002.56 × 200 | 215.60 × 70 |
| MAREA SENSE   | `family/marea-family-sense-lockup.svg`   | 1064.86 × 200 | 277.90 × 70 |
| MAREA WATCH   | `family/marea-family-watch-lockup.svg`   | 1095.46 × 200 | 308.50 × 70 |
| MAREA DISPLAY | `family/marea-family-display-lockup.svg` | 1124.60 × 200 | 337.64 × 70 |
| MAREA WEATHER | `family/marea-family-weather-lockup.svg` | 1221.46 × 200 | 434.50 × 70 |
| MAREA FLEET   | `family/marea-family-fleet-lockup.svg`   | 1048.76 × 200 | 261.80 × 70 |

New families require the brand contract and `npm run test:brand`; they are not added by drawing.

## 6. Clear space and minimum sizes

### 6.1 Clear space

- **Rule: ≥ 0.5 × cap height on all four sides**, measured from the outer ink edge.
- The rule is **baked into every lockup asset** as transparent margin: 50 units on each side of a
  100-unit cap band (viewBox 200 units tall for a 100-unit cap plus two 50-unit margins).
- For the symbol-only files the viewBox margin is 24-grid padding (compact: 4.25 / 7 units;
  reduced: 3 / 4.1 units); consumers must still apply 0.5 × symbol height clear space.
- Nothing enters the clear-space band: no rule, no tagline, no badge, no second logo, no image
  edge.

### 6.2 Minimum sizes (proposed, based on measured stroke widths)

| Surface                        | Minimum                                                                       | Derived minimum feature                                         | Evidence basis                                                               |
| ------------------------------ | ----------------------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Digital UI                     | symbol **16 px**; lockup **cap 16 px** (lockup height 32 px)                  | wordmark stem 2.56 px; symbol rail 3.2 px; C screw slot ≈1.9 px | native-pixel reading test + measured geometry; human legibility `NOT_TESTED` |
| Web favicon / app              | reduced 16 px build for favicons; compact mark for app icons (1024 px master) | 16 px build is its own drawing (not a scaled copy)              | authoring rule; raster pipeline owned by AssetProduction                     |
| Print (offset/digital)         | symbol **8 mm**; wordmark cap **8 mm**                                        | stem 1.28 mm; symbol rail 1.6 mm                                | computed from the construction; physical print proof `NOT_TESTED`            |
| Engraving / laser / silkscreen | symbol **8 mm**; wordmark cap **8 mm**; no feature below **0.8 mm**           | stem 1.28 mm; screw slot 0.96 mm at 8 mm cap                    | computed only; **no physical sample exists** (`NOT_TESTED (physical)`)       |
| Embroidery                     | not specified in MC-04                                                        | —                                                               | `NOT_TESTED`; the 16 px reduced geometry is the starting point               |

These are **proposed operational minimums**, not tested manufacturing limits. The 8 mm values are
simulations and computations; no engraved, silkscreened, moulded or embroidered sample was
produced in MC-04.

## 7. Monochrome, reversed and engraving rules

1. **Single ink only.** The complete lockup works in one ink. No gradients, opacity, blends,
   shadows, glows, filters or raster.
2. **Colour is not meaning.** The mark never carries state, and colour never carries identity; the
   files differ only in ink value (`#17365d` primary, `#101820` mono, `#f2f9fd` reversed).
3. **Reversed** files are light-ink on transparent for dark substrates; do not place on mid-tone
   photography without a solid panel. Contrast of reversed ink on the proposed night surface is a
   colour-system matter (owned by TypeColour), not asserted here.
4. **Engraving**: flat cuts, squared terminals and no feature below 0.8 mm; the master is outlined
   (no font) so it can be cut directly. Hatching/fill is a production decision, not part of the
   identity.
5. **No anti-alias dependency**: no hairline strokes (minimum 1.2 units at cap 100) and no
   sub-unit gaps.
6. **Substrate test status**: simulated only (matte grey, greyscale). Salt-spray, UV, anodised and
   silkscreen tests are `NOT_TESTED (physical)`.

## 8. Misuse (normative)

Do not: stretch, condense or rotate the lockup; outline or hollow the letterforms; add a second
ink, gradient or effect; place the lockup below full opacity; reduce clear space below 0.5 × cap;
add a tagline, year, certification, standard number or award inside or attached to the lockup;
insert an EMBARCARTE logo stacked with MAREA (endorsement is text-only, and only after clearance);
translate `MAREA` or any family token; set the wordmark in a system font beside the symbol; use
the symbol as a bullet, an icon or a pattern; make a per-family symbol; or use a registered or
unregistered trademark symbol. A visual misuse sheet is delivered at
`docs/marea/brand/territories/misuse-examples.html` (and per-territory in the proof sheets).

## 9. File inventory and measured compliance

| Deliverable                                          | Files                                                                                                                        | Status                | Measured                                              |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------------------------------------------------- |
| D-02 primary / mono / reversed lockups, compact mark | 4 SVG                                                                                                                        | `PRODUCED` (frozen)   | 1,982 B each; marks 935 / 894 B                       |
| D-02 supporting masters                              | `marea-wordmark.svg`, `marea-mark-reduced-16.svg`, `marea-construction-grid.svg`                                             | `PRODUCED`            | 1,425 / 894 / 2,657 B                                 |
| D-03 nine family lockups                             | 9 SVG                                                                                                                        | `PRODUCED` (frozen)   | 2,494–3,208 B; family ink 70.00 high                  |
| Measured geometry report                             | `territories/evidence/svg-geometry-report.{md,json}`                                                                         | `INTERNALLY_REVIEWED` | 32 files, 0 failed checks                             |
| Reading test (native pixels)                         | `territories/evidence/reading-test.html` + PNGs                                                                              | `PRODUCED`            | 16 / 24 / 48 px, 8 mm-equivalent, greyscale, reversed |
| Construction / proof / misuse sheets                 | `territories/*.svg`, `territories/proof/*.html`, `territories/misuse-examples.html`, `territories/territory-comparison.html` | `PRODUCED`            | HTML proof sheets; inline SVG; self-contained         |

All 32 SVG files pass: XML parse, viewBox present, `role="img"` + `title` + `desc`, no `<text>`,
no script / external reference / embedded raster / `@import` / filter / foreignObject, no
registered-symbol characters, coordinate precision ≤ 2 decimals (transform scale factors ≤ 3
decimals, documented), lockup ≤ 20 kB, mark ≤ 8 kB. Full numbers:
`territories/evidence/svg-geometry-report.md`.

## 10. Gates and honest limitations

| Gate / claim                                       | Status                                                          |
| -------------------------------------------------- | --------------------------------------------------------------- |
| Professional originality / prior-art check (G3/B9) | `LEGAL_REVIEW_PENDING` — external, no agent can close it        |
| Trademark clearance                                | `NOT_GRANTED`                                                   |
| Internal design review (G1)                        | `INTERNALLY_REVIEWED` by the Lead; independent reviewer pending |
| 5-second human sort (brief I-1)                    | `NOT_TESTED (human)`                                            |
| Physical engraving / silkscreen / moulding samples | `NOT_TESTED (physical)`                                         |
| Human legibility / cockpit test                    | `NOT_TESTED`; only native-pixel renders exist                   |
| Colour-system contrast for reversed ink            | owned by TypeColour (`COLOUR-SYSTEM.md`); not asserted here     |
| Adoption / publication                             | `BLOCKED`                                                       |

The system is **internally consistent and measured**, and that is all this document claims. It is
not a clearance, not a certification, not an originality finding and not a public brand.
