# MC-04 — Territory comparison and selection evidence

| Field          | Value                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID    | `MC-04 / TERRITORY-COMPARISON`                                                                                                                                    |
| Milestone      | MC-04 — MAREA visual identity (INTERNAL, PROVISIONAL)                                                                                                             |
| Owner          | IdentityVector (identity + vector design)                                                                                                                         |
| Date           | 2026-10-30                                                                                                                                                        |
| Purpose        | Record the three construction-level territory prototypes, the measured tests, the weighted score arithmetic, the kill-criteria results and the shortlist proposal |
| Decision owner | **Lead.** This file records evidence and a proposal; the Lead owns the shortlist and the internal preference                                                      |
| Nature         | PROPOSED / INTERNAL. Not an adoption, not a clearance, not a design award and not evidence of distinctiveness in law                                              |

## Status statement — read before using this file

> **MAREA is a proposed brand.** `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`,
> `MC-03_TRADEMARK_RESEARCH = OPTION_B`, `ORIGINALITY_PROFESSIONAL_CHECK = PENDING`,
> `PUBLIC_MAREA_BRAND_USE = NO_GO`, `FINAL_IDENTITY_ADOPTION = BLOCKED`.
>
> No construction, symbol or lockup in this file is declared original, distinctive in law,
> registrable, cleared or free of third-party rights. The internal preference recorded in §8 is
> **PREFERRED_PROVISIONAL** only and is conditional on a professional originality/prior-art
> check (gate G3/B9) that no agent can perform or close. Nothing here authorises publication,
> printing, procurement, a live-site brand or a trademark filing.
>
> All three territories are authored vector artwork: every path was constructed by this
> programme from documented geometric rules (`territories/tools/`). No font outlines, no traced
> or downloaded artwork, no generated imagery.

## 1. Evidence inventory (what exists and how it was measured)

| Evidence                                                                               | Path                                                                                                                            | Status                                          |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Territory A prototype set (construction, mono, reversed, compact, lockup, proof sheet) | `docs/marea/brand/territories/territory-a-*.svg`, `territories/proof/territory-a-proof-sheet.html`                              | PRODUCED                                        |
| Territory B prototype set                                                              | `docs/marea/brand/territories/territory-b-*`                                                                                    | PRODUCED                                        |
| Territory C prototype set                                                              | `docs/marea/brand/territories/territory-c-*`                                                                                    | PRODUCED                                        |
| Side-by-side comparison proof sheet                                                    | `docs/marea/brand/territories/territory-comparison.html`                                                                        | PRODUCED                                        |
| Misuse sheet                                                                           | `docs/marea/brand/territories/misuse-examples.html`                                                                             | PRODUCED                                        |
| Title-case wordmark study (required evaluation)                                        | `docs/marea/brand/territories/wordmark-case-study.svg`                                                                          | PRODUCED                                        |
| Measured SVG geometry report (32 files, real `getBBox`)                                | `docs/marea/brand/territories/evidence/svg-geometry-report.md` + `.json`                                                        | INTERNALLY_REVIEWED                             |
| Small-size reading test, native pixels                                                 | `docs/marea/brand/territories/evidence/reading-test.html`, `reading-test-native.png`, `reading-test-zoom.png`                   | PRODUCED (zoom is inspection-only)              |
| Generation toolchain (authored geometry, deterministic)                                | `docs/marea/brand/territories/tools/build.mjs`, `alphabet.mjs`, `marks.mjs`, `geom.mjs`, `check.mjs`, `render-reading-test.mjs` | PRODUCED                                        |
| Internal visual-check renders                                                          | `docs/marea/brand/territories/evidence/visual-check/`                                                                           | PRODUCED (QA artefacts, not deliverable assets) |

Commands actually run (from the repository root, real output):

- `node docs/marea/brand/territories/tools/build.mjs` → `wrote 37 files`
- `node docs/marea/brand/territories/tools/check.mjs` → `checked 32 files; 0 failed checks`
- `node docs/marea/brand/territories/tools/render-reading-test.mjs` → `wrote reading-test.html + native/zoom PNG evidence`

`check.mjs` loads each SVG in Chromium, calls `SVGGraphicsElement.getBBox()` on the rendered
document, applies each group's own translate/scale, and compares against the documented geometry.
It also checks XML parse, viewBox, `role`/`title`/`desc`, absence of `<text>`, script/external
reference/raster/`@import`/filter/foreignObject, `®`/registered-symbol characters, decimal
precision of coordinates, and byte budgets. Byte budgets: lockup ≤ 20 kB, mark ≤ 8 kB.

## 2. Candidate register

| Candidate ID   | Territory         | Construction                                                                                                                                                                                                                                                  | Revisions and defects recorded                                                                                                                                                                                                                                                                                                |
| -------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IVA-24-A1`    | A — ISOBATH       | 24 × 24 grid, 4 open depth contours struck from four centres offset along one slope line; unequal radial intervals 3.5 / 4 / 4.5 units; stroke 1.6; radial end cuts; innermost contour ends in a measured datum on the baseline; one 1.4-unit sounding square | v1 used concentric contours and read as radiating signal arcs; v2 removed the common centre. Final measured ink 21.55 × 23.23 units, baseline 23.94, mark ≤ 8 kB                                                                                                                                                              |
| `IVB-32-B1`    | B — BEARING INDEX | 32 × 32 grid, 270° calibrated arc (r = 13, stroke 2.5) open 90° at the lower right; 3.5-wide × 15-long bearing index at 0°; 3 × 3 square datum; two asymmetric radial ticks (4.5 and 2 units) crossing the arc                                                | No hanger or rose; no cardinal letters. Final measured ink 28.72 × 29.25 units, baseline 30.25, mark ≤ 8 kB                                                                                                                                                                                                                   |
| `IVC-24-C1…C5` | C — SIGNAL TRUNK  | 24 × 24 grid, bus rail on the baseline + three terminal keys with squared caps, unequal widths (2.5 / 4 / 3) and heights (2 / 8 / 6), unequal gaps (2.5 / 1.5), centre key raised to the cap line, 1.2 × 1.8 screw slot in its head                           | C1 three equal-width rectangles on a rail + key hanging 3 units below the rail → failed as bar chart; C2/C3 block masses on a flush rail → still histogram; C4 added a diagonal cable (new motif, rejected by the Lead); C5 = art freeze, all additions removed. Final measured ink 15.5 × 10 units, baseline 14, mark ≤ 8 kB |

All three candidates share the same **wordmark layer**: the outlined uppercase `MAREA`
construction (cap 100, stem 16, square terminals, flat acute junctions, optical spacing model).
The wordmark layer is required in every territory by brief §3.7 and does not vary by candidate.

## 3. Evaluation model (from brief §3.2, unchanged weights)

Criterion weights: **C1** marine-instrument credibility 20 %, **C2** distinctiveness potential
(subject to a professional check) 20 %, **C3** small-size legibility 15 %, **C4** system
extensibility 15 %, **C5** colour/monochrome independence 10 %, **C6** cultural and language fit
10 %, **C7** manufacturing feasibility 10 %. Scores run 0–5 (5 best). C8 "legal/search effort" is
**not scored**: it cannot be estimated by a designer and is a gate, not a score.

A score is only meaningful with an anchor. The anchors used here:

| Score | Anchor                                                                          |
| ----: | ------------------------------------------------------------------------------- |
|     5 | passes the brief's test without reservation on the recorded evidence            |
|     4 | passes with a named, minor residual risk                                        |
|     3 | passes mechanically but carries a material risk requiring mitigation            |
|     2 | fails a named §3.8 pass condition or a §3.3–§3.5 kill criterion on the evidence |
|     1 | clearly fails the territory's stated idea                                       |
|     0 | not assessable / no evidence                                                    |

These scores are **internal design assessments of our own prototypes**, re-scored after
prototyping. They are not measurements, not user research and not any statement about legal
distinctiveness.

## 4. Weighted arithmetic (shown term by term)

Weights: C1 .20 · C2 .20 · C3 .15 · C4 .15 · C5 .10 · C6 .10 · C7 .10 = 1.00.

### A — ISOBATH (`IVA-24-A1`)

| Criterion                         | Score |   Weight |             Term |
| --------------------------------- | ----: | -------: | ---------------: |
| C1 marine-instrument credibility  |   4.0 |     0.20 |            0.800 |
| C2 distinctiveness potential      |   2.0 |     0.20 |            0.400 |
| C3 small-size legibility          |   2.5 |     0.15 |            0.375 |
| C4 system extensibility           |   4.0 |     0.15 |            0.600 |
| C5 colour/monochrome independence |   5.0 |     0.10 |            0.500 |
| C6 cultural and language fit      |   5.0 |     0.10 |            0.500 |
| C7 manufacturing feasibility      |   3.0 |     0.10 |            0.300 |
| **Weighted total (of 5)**         |       | **1.00** | **3.475 → 3.48** |

### B — BEARING INDEX (`IVB-32-B1`)

| Criterion                         | Score |   Weight |             Term |
| --------------------------------- | ----: | -------: | ---------------: |
| C1 marine-instrument credibility  |   4.5 |     0.20 |            0.900 |
| C2 distinctiveness potential      |   2.5 |     0.20 |            0.500 |
| C3 small-size legibility          |   3.5 |     0.15 |            0.525 |
| C4 system extensibility           |   3.0 |     0.15 |            0.450 |
| C5 colour/monochrome independence |   5.0 |     0.10 |            0.500 |
| C6 cultural and language fit      |   4.0 |     0.10 |            0.400 |
| C7 manufacturing feasibility      |   4.0 |     0.10 |            0.400 |
| **Weighted total (of 5)**         |       | **1.00** | **3.675 → 3.68** |

### C — SIGNAL TRUNK (`IVC-24-C5`)

| Criterion                         | Score |   Weight |             Term |
| --------------------------------- | ----: | -------: | ---------------: |
| C1 marine-instrument credibility  |   2.5 |     0.20 |            0.500 |
| C2 distinctiveness potential      |   2.5 |     0.20 |            0.500 |
| C3 small-size legibility          |   3.5 |     0.15 |            0.525 |
| C4 system extensibility           |   5.0 |     0.15 |            0.750 |
| C5 colour/monochrome independence |   5.0 |     0.10 |            0.500 |
| C6 cultural and language fit      |   3.0 |     0.10 |            0.300 |
| C7 manufacturing feasibility      |   5.0 |     0.10 |            0.500 |
| **Weighted total (of 5)**         |       | **1.00** | **3.575 → 3.58** |

### Ranking on the weighted model

1. **B — 3.68** — highest on the weights because marine credibility (C1, 20 %) is the
   strongest single impression target and B scores 4.5 there.
2. **C — 3.58** — highest on extensibility (C4, 15 %) and manufacturing (C7, 10 %), lowest on
   marine credibility and cultural fit.
3. **A — 3.48** — highest cultural fit (C6, 10 %) but weakest distinctiveness and small-size
   behaviour; the two heaviest risks sit on the two heaviest criteria.

The ranking is **not** the whole decision: the brief's §3.8 pass conditions and the §3.3–§3.5
kill criteria override scores, and a professional prior-art check can invalidate any candidate.

## 5. Test results per candidate (evidence, including failures)

| Test                                                     | A — ISOBATH                                                                                            | B — BEARING INDEX                                                                          | C — SIGNAL TRUNK                                                                      |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| SVG parse / hygiene / budgets (measured)                 | PASS (all checks, `check.mjs`)                                                                         | PASS                                                                                       | PASS                                                                                  |
| 16 px optical (native pixels)                            | fails: contour intervals merge; the idea disappears                                                    | survives: arc + index + hub remain separable; ticks reduce to one                          | survives mechanically, but reads as a bar chart (see §6)                              |
| 24 px / 48 px optical                                    | 24 px ok, 48 px reads as nested wave arcs                                                              | 24/48 px reads as an instrument-arc fragment                                               | 24/48 px reads as a three-step histogram                                              |
| 8 mm-equivalent reduction (≈30 px, simulated)            | marginal: four 1.6/24 strokes reduce to ≈0.5 mm and the unequal intervals collapse into parallel lines | passes: arc + index readable; second tick lost                                             | passes mechanically; reading is the failure, not legibility                           |
| Monochrome (single ink)                                  | PASS (no opacity/gradient; one fill)                                                                   | PASS                                                                                       | PASS                                                                                  |
| Reversed (light ink on dark)                             | PASS (uses existing `--mist` value)                                                                    | PASS                                                                                       | PASS                                                                                  |
| Greyscale                                                | PASS (no colour-only information)                                                                      | PASS                                                                                       | PASS                                                                                  |
| Installed-equipment simulation (matte/engrave, CSS)      | recorded as simulation only; not a physical sample                                                     | simulation only                                                                            | simulation only                                                                       |
| Family extensibility (nine measured lockups)             | one rule applies; but the pattern language invites decoration in diagrams                              | one rule applies; gauge/tick vocabulary transfers to DISPLAY/PILOT, weak for HUB/AIS/SENSE | one rule applies; connector/rail grammar transfers to icons, diagrams, bezels, labels |
| 5-second sort, 5 human reviewers (brief I-1)             | **NOT_TESTED (human)**                                                                                 | **NOT_TESTED (human)**                                                                     | **NOT_TESTED (human)**                                                                |
| Structured internal classification (AI agent, not human) | "signal/wifi arcs, generic wave"                                                                       | "instrument heading fragment; at 16 px also reads as a letter C / gauge-app glyph"         | "bar chart / audio equaliser at 16–48 px"                                             |
| Colour-blind simulation                                  | not applicable to the mark itself: one ink, no colour semantics                                        | not applicable                                                                             | not applicable                                                                        |
| Originality / prior-art                                  | **PENDING** (G3/B9)                                                                                    | **PENDING**                                                                                | **PENDING**                                                                           |
| Trademark clearance                                      | **NOT_GRANTED** (not an agent decision)                                                                | **NOT_GRANTED**                                                                            | **NOT_GRANTED**                                                                       |

Note on the 5-second sort: brief I-1 requires ≥ 4/5 independent human reviewers. **No human
review was conducted**, so I-1 is `NOT_TESTED (human)`. The classification above is the design
agent's structured internal judgement and is labelled as such. It is not user research.

## 6. Reading-test results at native size (honest classification)

Source: `territories/evidence/reading-test-native.png` (deviceScaleFactor 1, no upscaling) and
`reading-test-zoom.png` (pixelated zoom, inspection only). Candidate list per the brief: marine
instrument / terminal block / bar chart / equaliser / menu icon / compass app / certification
seal / wifi / generic wave.

| Render      | Observed reading                                                                                         | Intended reading            | Verdict                                                                                                                                               |
| ----------- | -------------------------------------------------------------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| A 16 px     | faint nested arcs                                                                                        | isobath corner              | fails legibility and differentiation                                                                                                                  |
| A 24/48 px  | radiating signal/wifi arcs; "generic wave"                                                               | charted depth contours      | **FAIL** — §3.3 kill criterion ("reads as a generic wave at any size")                                                                                |
| B 16 px     | arc with a vertical index and central hub; secondary reading: letter "C" with a tick / compass-app glyph | heading instrument fragment | PASS with residual risk — §3.4 names accidental "C"/"G" reading as a failure risk; the risk is real at 16 px and must be recorded, not hidden         |
| B 24/48 px  | instrument dial fragment (calibrated arc + index)                                                        | heading index               | PASS                                                                                                                                                  |
| C 16 px     | three unequal bars on a base                                                                             | terminal block on a rail    | **FAIL** — §3.5 kill criterion ("at 16 px it reads as a menu/list/settings icon"; the observed failure is the sibling reading: bar chart / equaliser) |
| C 24/48 px  | three-step histogram with a slotted centre bar                                                           | terminal block on a rail    | FAIL at identity level (legible, wrong meaning)                                                                                                       |
| B greyscale | unchanged reading (one ink)                                                                              | —                           | no colour dependency                                                                                                                                  |
| C greyscale | unchanged (still a histogram)                                                                            | —                           | no colour dependency                                                                                                                                  |

The Lead's own renders reached the same classification. This file records it
**as a failure for C**, not as an acceptable abstraction.

## 7. Kill-criteria outcomes

| Territory         | Kill criterion from the brief                                                                    | Outcome                                                                                                                                                                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A — ISOBATH       | §3.3: "reads as a generic wave at any size"; 16 px/8 mm collapse                                 | **MET (fails).** Observed as radiating signal/wifi arcs at 24/48 px and as merging lines at 16 px. Dropped.                                                                                                                                                                                  |
| B — BEARING INDEX | §3.4: "reads as a certification seal or a compass app"; fails 16 px; accidental "C"/"G"          | **NOT MET, conditionally.** Passes 16 px legibility and does not read as a closed seal (90° opening, square datum), but the letter-"C"/gauge-app reading is a real residual risk at 16 px. Kept only with that risk recorded.                                                                |
| C — SIGNAL TRUNK  | §3.5: "at 16 px it reads as a menu/list/settings icon; the 5-second sort reads software company" | **MET (fails) on reading.** It does not read as a menu icon, but it reads as a bar chart/equaliser at 16–48 px — an adjacent failure of the same criterion (the symbol does not carry the intended installed-systems meaning without the wordmark). Recorded as a failure, not rationalised. |

## 8. Shortlist and internal preference

**Shortlist (exactly two) — Lead decision, recorded here:**

- **`IVB-32-B1` — TERRITORY B, BEARING INDEX** — shortlisted.
- **`IVC-24-C5` — TERRITORY C, SIGNAL TRUNK** — shortlisted on construction potential
  (highest C4 system extensibility and C7 manufacturing feasibility) **despite** failing the
  small-size reading test.

**Dropped:** **`IVA-24-A1` — TERRITORY A, ISOBATH** — on the §3.3 kill criterion (generic
wave / signal-arc reading) and the lowest weighted score (3.48). The construction is retained in
`territories/` as the documented rejected alternative; it is not a candidate for adoption.

**Internal preference:** `PREFERRED_PROVISIONAL = B — BEARING INDEX`, owned by the Lead. The
reason is the reading test: at app-icon scale C reads as a bar chart/histogram (a §3.5 failure),
while B reads as a heading-instrument fragment. The preference is **internal and provisional**,
conditional on:

1. the professional originality/prior-art check (G3/B9) raising no objection;
2. the recorded residual "letter-C"/compass-app risk at 16 px being addressed in any future
   refinement (e.g. by keeping the 90° opening and the square datum);
3. Lead ratification of the final lockup configuration.

C is **not** adopted and does not pass the reading test. If the professional check rejects B,
the next action is a new construction, not a silent fallback.

**Master set reissue (recorded):** the D-02/D-03 files in `docs/marea/brand/assets/logo/` are
regenerated from the shortlisted-preferred **B** construction (32 × 32 grid; arc 3.2 units =
10.4 % of the symbol ink height — curved strokes read heavier than straight stems, so optical
parity with the 16 % wordmark stem is reached below 16 %; the two rejected weights were 2.5 units
(8.6 %, read thin) and 4.4 units (14.3 %, read letter-heavy). Index 3.4 wide; datum 3.4 square;
ticks 1.8 wide, attached to the arc outer edge and asymmetric). Measured master set: lockup viewBox
704.83 × 200, symbol ink 98.87 × 100 on the cap band 50…150, wordmark 430.96 × 100 at x 223.87…654.83, ink gap 75.00,
clear space 50, family token 0.70 × cap with a 26-unit word space. C remains only as the
rejected-for-preference prototype in `territories/`.

## 9. What this comparison does not prove (limitations)

- **No human 5-second sort.** I-1 requires 5 independent reviewers; none ran. Status
  `NOT_TESTED (human)`.
- **No physical samples.** No engraving, silkscreen, moulding or anodised sample exists. All
  8 mm / engraving results are simulated pixel reductions (`NOT_TESTED (physical)`).
- **No legal conclusion.** Prior-art/originality is `PENDING` and can only be closed by a
  professional check; `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`. No agent may claim otherwise.
- **Scores are design judgement.** They are not measurements, not user research and not
  evidence of distinctiveness.
- **AI-agent review is not human validation.** The reading-test classification is a structured
  internal judgement by the design agent; it is not a human panel.
- **The Wordmark layer has its own limitations.** The title-case alternative was drawn and
  evaluated at construction level (`wordmark-case-study.svg`) and rejected in
  `IDENTITY-SYSTEM.md` §3.4; that rejection is a design decision, not a measurement.

## 10. Status register (exact vocabulary)

| Item                                  | Status                                                      |
| ------------------------------------- | ----------------------------------------------------------- |
| Territory prototypes A/B/C            | `PRODUCED`                                                  |
| Measured geometry report              | `INTERNALLY_REVIEWED`                                       |
| Reading test (native pixels)          | `PRODUCED`                                                  |
| 5-second human sort (I-1)             | `NOT_TESTED (human)`                                        |
| Physical engraving/silkscreen samples | `NOT_TESTED (physical)`                                     |
| Shortlist (B + C)                     | `INTERNALLY_REVIEWED` (Lead decision)                       |
| Internal preference (B)               | `PREFERRED_PROVISIONAL`                                     |
| Originality / prior-art               | `LEGAL_REVIEW_PENDING`                                      |
| Trademark clearance                   | `NOT_GRANTED`                                               |
| Identity adoption                     | `PUBLICATION_BLOCKED` / `FINAL_IDENTITY_ADOPTION = BLOCKED` |

No `®` or registered/unregistered trademark symbol may be used with MAREA, any family name or
any bundle name. No certification, availability, performance or safety claim is made anywhere
in this document or implied by any artwork it references.
