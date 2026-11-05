# MAREA — Colour system, modes and measured contrast matrix

| Field | Value |
| --- | --- |
| Document ID | `MC-04 / D-07` |
| Related asset ID | `MR-BRD-013` — dashboard skin token specification |
| Token file | `docs/marea/brand/tokens/marea-instrument-tokens.proposed.json` |
| Status | `INTERNAL_PROPOSED` |
| Adoption | `NOT_ADOPTED` |
| Implementation | `NOT_APPLIED_TO_SRC` — **no live CSS, `src/` or `public/` file was changed by MC-04** |
| Owner | TypeColour |
| Authority | `docs/marea/brand/MC-04-VISUAL-IDENTITY-BRIEF.md` §5 (lines 726–919), §7.4–§7.9, §7.8, §11.1–§11.2 |
| Deterministic evidence | `scripts/check-contrast.mjs`; `docs/marea/brand/evidence/contrast/contrast-matrix.json`; `contrast-failures.json`; `cvd-simulation-board.html`; `greyscale-board.html` |
| External gates | Hardware/sunlight validation `BLOCKED` (no display); print proof `BLOCKED`; human CVD/user testing `NOT_TESTED`; `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`; `FINAL_IDENTITY_ADOPTION = BLOCKED` |

> **Everything in this document is PROPOSED.** The values describe a candidate instrument palette and
> a measured baseline of the existing website tokens. They are not implemented, not adopted, not
> certified and not evidence that the live site conforms to WCAG. MAREA remains a proposed brand.

---

## 1. Principles (from §5.1) and how the proposal satisfies them

1. **Colour is a role system.** Every value is a named role (`--inst-data-primary`,
   `--inst-state-critical`, …), never a colour name (`--blue-500`). The role list is in §3 and the
   token file.
2. **Data is ink, not accent.** Cockpit-critical numerics use `dataPrimary` (the darkest/strongest ink),
   not the brand accent. Measured: day `dataPrimary` = 11.18:1 minimum on all three day surfaces
   (target ≥7:1).
3. **Colour never carries meaning alone.** Every state also has a shape, a text label and (where
   relevant) a pattern/age cue: §9 and the greyscale/CVD boards. Rule: *remove colour and the state must
   still be unambiguous.*
4. **One palette family.** Day, sunlight and night are modes of the **same role names**; night is not a
   second brand palette and is not derived by inverting or hue-rotating the day palette.
5. **Modes are separate token sets, not a CSS filter.** The three instrument modes ship independent
   value sets; no `filter: invert()`/`hue-rotate()` derivation is allowed.
6. **Measure, don't claim.** Every ratio below is computed with the WCAG 2.x relative-luminance formula
   by the script named above, on the solid pairs actually used. No expected values are pasted.

---

## 2. Modes

| Mode | Where it applies | Value status | Design intent | Constraints |
| --- | --- | --- | --- | --- |
| **Web light** (default) | Corporate site, product pages, docs | `EXISTING_MEASURED_BASELINE` — `src/styles.scss`, unchanged | Current navy/sea/mist identity; calm, light | Stays light; no dark theme; AA-gated in the evidence, internal targets recorded as findings |
| **Instrument day** | App/NAV/DISPLAY daytime, bridge daylight | `PROPOSED` | High-luminance surfaces, dark ink, maximum contrast; matte | Primary data ≥7:1; no gradient behind data; no translucent data panels |
| **Sunlight** | Same surfaces under high ambient light + glare | `PROPOSED` | Same role mapping, stronger contrast; less chroma reliance | No WCAG equivalent; engineering target; **hardware validation BLOCKED** — stated in every claim |
| **Night** | App/NAV/DISPLAY at night, watchkeeping | `PROPOSED` | Low-luminance canvas (`#0d1b26`), subdued foreground, no pure black/white | Preserve role semantics; no hue shift that turns a warning into a calm colour; dimming floor where alerts stay perceivable |
| Night-red (research only) | Possible helm option | **Not specified** | Not required, not promised | If ever evaluated it must be user/hardware validated; alerts must remain distinguishable without hue |

Mode rules carried from §5.4: mode is an operational control, not only an OS preference; never mix tokens
from two modes on one surface; brand navy/sea is **not** a data colour in night mode; `theme-color` and
`color-scheme` must match the rendered mode; every mode needs screenshot testing at 390/768/1440 px
(web) and at target display resolutions for software **once hardware exists (BLOCKED)**.

---

## 3. Role model (D-08 token groups)

The token file implements the required §7.8 groups. Role names, not values, are the contract:

| Group | Tokens |
| --- | --- |
| Surfaces | `canvas`, `surface`, `surfaceRaised`, `overlayScrim` |
| Text | `textPrimary`, `textSecondary`, `textMeta`, `textOnAccent` |
| Data | `dataPrimary`, `dataSecondary`, `chartLine`, `chartGrid` |
| Semantic state | `stateCritical`, `stateWarning`, `stateSafe`, `stateStale`, `stateInfo` |
| Interaction | `action`, `actionHover`, `focusRing`, `focusRingOnFill`, `disabled` |
| Typography | see `TYPOGRAPHY-SYSTEM.md` / token file `typography` group |
| Density / spacing | `--inst-space-1..6`, `gapAlert`, `gapProvenance` |
| Shape / stroke | `radiusControl`, `radiusSurface`, `strokeIcon`, `strokeChart` |
| Motion | `motionState`, `motionAlertMaxHz` |
| Modes | day, sunlight, night value sets for every colour role (same names) |

`focusRingOnFill` is an MC-04 addition to the §7.8 list (not a new palette): a single focus colour cannot
be ≥3:1 against both a light canvas and a saturated filled button, so the token set carries an explicit
indicator for filled controls. It is documented in the token file and in §8.

**Naming rule, scoped:** the **instrument role sets** (day / sunlight / night) use role-based names only
and contain no colour-named token. The token file's `web-light` block is a **read-only legacy
compatibility mapping** of the existing `src/styles.scss` names, so it necessarily contains legacy
colour-named keys (`navy2`, `sea`, `seaStrong`, `seaButton`, `badge*Bg`, `themeColor`, `line`). It is a
measured baseline reference, not the proposed vocabulary; renaming live site tokens is out of MC-04 scope.

Shape/density/motion constraints: control radii 2–4 px (`3px` proposed), surface radii 4–8 px (`6px`),
pills only for status chips with text, one elevation level for overlays only, no gradients in any token,
alert pulse ≤1 Hz and never above 3 Hz (WCAG 2.3.1).

---

## 4. Instrument day palette (PROPOSED)

| Role | Value | Notes | Minimum measured ratio on its surfaces |
| --- | --- | --- | --- |
| `canvas` | `#f2f9fd` | `--mist`; instrument surface, not a page | — |
| `surface` | `#ffffff` | `--paper` | — |
| `surfaceRaised` | `#eaf7ff` | `--sky` tint | — |
| `overlayScrim` | `rgba(8, 26, 40, 0.76)` | overlay dimming only; no data on it | informational (composite separation recorded, not gated) |
| `textPrimary` | `#17365d` | `--navy`/`--ink` | 11.46:1 on canvas (internal ≥5, cockpit ≥7) |
| `textSecondary` | `#4a6579` | **refined** from `--muted` | 5.61:1 on raised (internal ≥5) |
| `textMeta` | `#52697f` | **refined** from `--muted` | 5.22:1 on raised |
| `textOnAccent` | `#ffffff` | on filled action/state | 5.63:1 on action; 6.11:1 on stale fill |
| `dataPrimary` | `#17365d` | cockpit numerics | 11.18:1 on raised (internal ≥7) |
| `dataSecondary` | `#4a6579` | context values | 5.61:1 on raised |
| `chartLine` | `#17365d` | trend/scales | 11.18:1 (internal ≥4.5) |
| `chartGrid` | `#748d9f` | grid/ticks; supporting cue | 3.18:1 on raised (internal ≥3) |
| `stateCritical` | `#a32b22` | alarm; + octagon + label | 6.58:1 on raised |
| `stateWarning` | `#8a5a00` | caution/warning; + triangle | 5.43:1 on raised |
| `stateSafe` | `#1f5f49` | normal; + dot + label | 6.90:1 on raised |
| `stateStale` | `#55646f` | **refined**; + dashed outline + age | 5.60:1 on raised |
| `stateInfo` | `#17365d` | neutral ink | 11.18:1 on raised |
| `action` | `#176ca6` | `--sea-strong` | 5.16:1 on raised (internal ≥5) |
| `actionHover` | `#12568a` | hover/active | 7.71:1 on white |
| `focusRing` | `#0f5f8c` | replaces failing `#8fd2f5` | 6.34:1 on raised (internal focus ≥4.5) |
| `focusRingOnFill` | `#ffffff` | indicator inside filled controls | 5.63:1 on action (internal ≥4.5) |
| `disabled` | `#7a8d9b` | remains perceivable | 3.15:1 on raised (internal ≥3) |

Full pair matrix: `contrast-matrix.json` → mode `instrument-day`, 54 pairs, **54/54 pass both AA and the
internal targets** (0 AA misses, 0 internal misses).

---

## 5. Instrument sunlight palette (PROPOSED)

| Role | Value | Minimum measured ratio on its surfaces |
| --- | --- | --- |
| `canvas` | `#ffffff` | — |
| `surface` | `#f7fbfe` | — |
| `surfaceRaised` | `#eaf7ff` | — |
| `overlayScrim` | `rgba(2, 12, 22, 0.80)` | informational |
| `textPrimary` | `#0b2440` | 14.36:1 |
| `textSecondary` | `#3f5468` | 7.18:1 |
| `textMeta` | `#4a5f73` | 6.06:1 |
| `textOnAccent` | `#ffffff` | 8.65:1 on warning fill |
| `dataPrimary` | `#0b2440` | 14.36:1 (cockpit ≥7) |
| `dataSecondary` | `#3f5468` | 7.18:1 |
| `chartLine` | `#0b2440` | 14.36:1 |
| `chartGrid` | `#5f7a8e` | 4.13:1 (ui ≥3) |
| `stateCritical` | `#8f1a12` | 8.28:1 |
| `stateWarning` | `#6b4300` | 7.93:1 |
| `stateSafe` | `#10513c` | 8.50:1 |
| `stateStale` | `#46586a` | 6.72:1 |
| `stateInfo` | `#17365d` | 11.18:1 |
| `action` | `#0b4f78` | 8.01:1 |
| `actionHover` | `#083f61` | 10.16:1 |
| `focusRing` | `#0a4568` | 9.32:1 |
| `focusRingOnFill` | `#ffffff` | 8.74:1 on action |
| `disabled` | `#6a7f92` | 3.80:1 |

54 pairs, **54/54 pass both AA and internal** targets. Glare has no WCAG equivalent: this is a simulated
high-luminance review, not a sunlight measurement. **Hardware/glare validation is BLOCKED** and is not
claimed.

---

## 6. Instrument night palette (PROPOSED)

| Role | Value | Minimum measured ratio on its surfaces |
| --- | --- | --- |
| `canvas` | `#0d1b26` | — (not pure black) |
| `surface` | `#132733` | — |
| `surfaceRaised` | `#1a3343` | — |
| `overlayScrim` | `rgba(2, 8, 13, 0.82)` | informational |
| `textPrimary` | `#8fd3f5` | 8.01:1 on raised |
| `textSecondary` | `#93a6b5` | 5.23:1 on raised |
| `textMeta` | `#a9b7c4` | 6.42:1 on raised |
| `textOnAccent` | `#0d1b26` (dark text on bright fills) | 8.60:1 on critical fill |
| `dataPrimary` | `#8fd3f5` | 8.01:1 on raised (cockpit ≥7) |
| `dataSecondary` | `#93a6b5` | 5.23:1 on raised |
| `chartLine` | `#8fd3f5` | 9.38:1 on surface |
| `chartGrid` | `#6a7f8d` | 3.15:1 on raised (ui ≥3) |
| `stateCritical` | `#ff9b8f` | 6.47:1 on raised |
| `stateWarning` | `#ffc46b` | 8.36:1 on raised |
| `stateSafe` | `#7bd8b0` | 7.69:1 on raised |
| `stateStale` | `#a9b7c4` | 6.42:1 on raised |
| `stateInfo` | `#93a6b5` | 5.23:1 on raised |
| `action` | `#8fd3f5` | 8.01:1 on raised |
| `actionHover` | `#b6e2fa` | 9.54:1 on raised |
| `focusRing` | `#8fd3f5` | 8.01:1 on raised |
| `focusRingOnFill` | `#0d1b26` | 10.65:1 on action fill |
| `disabled` | `#7d8f9d` | 3.93:1 on raised |

54 pairs, **54/54 pass both AA and internal** targets. No `#000000` and no `#ffffff` token exists in the
night mode (verified by the script; halation rule §5.8). Night dimming keeps a perceivable alert floor;
no inversion or hue-rotation derivation is used.

---

## 7. Existing web-light baseline and findings F-1…F-7

Measured from the current `src/styles.scss` tokens (read-only reference; **not changed**). The baseline is
WCAG-AA gated in the evidence script; misses of the stricter internal target are recorded as findings, not
as MC-04 regressions.

| Finding | Pair(s) | Measured | Target | Consequence / resolution |
| --- | --- | ---: | ---: | --- |
| **F-1** (existing) | focus `#8fd2f5` on `#ffffff` / `#f2f9fd` / `#eaf7ff` | **1.6529:1** / **1.5540:1** / **1.5149:1** | AA 3:1 (focus), internal 4.5:1 | **F-1 REMAINS OPEN.** MC-04 only *proposes* a compliant value: `--inst-focus-ring: #0f5f8c` measures **6.92:1 / 6.50:1 / 6.34:1**. Nothing is applied to `src/`; MC-06 must implement the `:focus-visible` change and verify it before F-1 can be closed. |
| **F-2** (existing) | `--line` `#e1edf5` on paper | 1.19:1 | decorative only | Never the only cue for an input/control boundary. Instrument dividers use `chartGrid` (≥3:1) or an explicit label/offset. |
| **F-3** (existing) | `theme-color` `#0b2540` vs token system | 15.52:1 on white | n/a | Browser-chrome colour is not a token today. Proposed: expose it as `--inst-*`/theme token in MC-06 and keep it in sync with the rendered mode. Recorded, unresolved in MC-04. |
| **F-4** (existing) | `--danger` / `--ok` as cockpit-critical values | **5.554:1** / **5.413:1** | internal cockpit ≥7:1 | The deeper instrument values (`#a32b22`, `#1f5f49`) measure 6.58:1 / 6.90:1 on the day raised surface and ≥7.18:1 on white; the web tokens stay as-is for text roles. |
| **F-5** (MC-04 baseline) | `--sea` `#1776ad` on `#ffffff` / `#f2f9fd` | **4.9631:1** / **4.6663:1** | internal normal text ≥5:1 (AA 4.5 passes) | `--sea` is used for small eyebrow/link text. AA passes; the internal target is missed by 0.04–0.33. Proposed: use `--sea-strong`/`action` (`#176ca6`, 5.29–5.63:1) for small text on light surfaces. |
| **F-6** (MC-04 baseline) | `--muted` `#57708a` on `#f2f9fd` / `#eaf7ff` (meta/secondary) | **4.8275:1** / **4.7059:1** | internal normal text ≥5:1 (AA passes) | Day instrument secondary/meta roles refined to `#4a6579` / `#52697f` (5.61:1 / 5.22:1 on raised). Web token unchanged; MC-06 may darken `--muted` for small text if desired. |
| **F-7** (MC-04 baseline) | `.badge.ok` `#27775c` on `#e2f5ee`; `.badge.danger` `#b4423a` on `#fbe9e7` | **4.7762:1** / **4.7371:1** | internal normal text ≥5:1 (AA passes) | Pre-existing badge text pairs. Not changed by MC-04; recorded for the accessibility reviewer. Proposed instrument fills use deeper state colours and pass ≥5:1. |

The three AA misses in the baseline are all F-1 focus-ring pairs (3:1). They are pre-existing site
identity issues, explicitly carried forward by the brief. MC-04 **proposes** compliant values; the
finding stays **OPEN** for the live site until MC-06 implements and verifies the focus indicator.

---

## 8. Focus indicator (proposed; F-1 remains open) and non-text contrast

- **Proposal:** `--inst-focus-ring: #0f5f8c` (day), `#0a4568` (sunlight), `#8fd3f5` (night) drawn with
  a 3 px outline and a 2 px offset; never remove the outline; never rely on `outline: none` plus a shadow.
- **Measured:** 6.92:1 / 6.50:1 / 6.34:1 on paper/mist/sky; sunlight 10.17:1 / 9.78:1 / 9.32:1; night
  10.65:1 / 9.38:1 / 8.01:1 — all above the internal ≥4.5:1 focus target (WCAG 1.4.11 floor 3:1).
- **Filled controls:** a single ring cannot contrast against both light canvas and mid-blue fill, so
  `focusRingOnFill` (`#ffffff` day/sunlight, `#0d1b26` night) is measured on the action and critical
  fills (5.63:1 / 7.18:1 day; 8.74:1 / 9.03:1 sunlight; 10.65:1 / 8.60:1 night).
- **F-2:** `--line` stays decorative (1.19:1). Inputs/controls that must be distinguishable need a
  ≥3:1 boundary or a filled-surface difference; instrument grids use `chartGrid` (≥3:1).
- **Focus is a test, not a screenshot opinion:** QA-02 remains `PARTIAL` until MC-06 implements the ring
  and screenshots it on every adjacent surface (see `MC-04-ACCESSIBILITY-EVIDENCE.md`).

---

## 9. Colour never carries meaning alone — state encoding

Rule: **remove colour and the state must still be unambiguous.** Each state has a colour role, a shape,
a text label and an additional cue (from §5.6):

| State | Colour role | Shape / icon | Text label | Additional cue |
| --- | --- | --- | --- | --- |
| Normal / safe | `stateSafe` | filled circle/dot | `OK` / `Normal` (localised) | steady; no animation |
| Advisory / info | `stateInfo` | `i` in circle or outlined square | short sentence | steady; dismissible |
| Caution | `stateWarning` | triangle with `!` | `Caution` + cause | steady; ≤1 Hz pulse only if reduced-motion allows |
| Warning | `stateWarning` (heavier border) | triangle with `!` | `Warning` + cause + action | persistent banner; audible optional (never sole) |
| Alarm / critical | `stateCritical` | octagon or solid triangle | `Alarm` + cause + action | persistent until acknowledged; ack never removes the condition |
| Stale / offline | `stateStale` | dashed outline / clock-and-slash | `STALE mm:ss` / `OFFLINE` | age counter in tabular digits; value attenuated but readable |
| No data | `stateStale` | hollow square / em dash | `— NO DATA` | never a zero, never a frozen last value |
| Disabled | `disabled` | reduced but visible | label remains | never colour-only, never invisible |

Evidence:

- **Greyscale:** `docs/marea/brand/evidence/contrast/greyscale-board.html` applies the WCAG luminance
  matrix (`feColorMatrix`, 0.2126/0.7152/0.0722) to day/sunlight/night specimens; every state keeps shape,
  label, pattern or age.
- **CVD:** `docs/marea/brand/evidence/contrast/cvd-simulation-board.html` applies deuteranopia,
  protanopia, tritanopia and achromatopsia `feColorMatrix` simulations to the same specimens. Critical vs
  safe differ in luminance, shape, label and pattern — not hue alone.
- Both boards are self-contained, marked INTERNAL/PROPOSED and "ILLUSTRATIVE / NOT LIVE DATA". They were
  render-checked in Chromium (5 sections / 15 specimens; no console errors). **They are simulation
  boards, not user tests and not a certification of colour-blind safety.** Human review (QA-03/QA-04)
  is `PARTIAL`/`NOT_TESTED` in the accessibility evidence file.

Data conventions (§5.9) are honoured: no red/green-only pairs; charts use single-hue luminance ramps,
line styles, marker shapes and direct labels; AIS/own-vessel/lost/selected targets require non-colour
cues; no rainbow colour maps; no gradient behind numbers; no official ECDIS/S-52 chart styling or
certification-like colour language (§7.7).

---

## 10. Contrast measurement method and real evidence

`scripts/check-contrast.mjs` implements the WCAG 2.x formula (sRGB linearisation with the 0.03928 knee,
0.2126/0.7152/0.0722 weights, ratio `(L1+0.05)/(L2+0.05)`), composites alpha source-over before measuring,
reads all values and thresholds from the token file, measures every pair used in every mode, writes JSON
evidence and exits non-zero on a breach beyond the recorded baseline findings.

Command: `node scripts/check-contrast.mjs` — exit code **0**.

Real output (summary; full per-pair matrix in `contrast-matrix.json`):

```
MC-04 contrast verification — WCAG 2.x relative luminance
Token file : docs/marea/brand/tokens/marea-instrument-tokens.proposed.json
Token sha256: 0ff5cd48a4c773129e6a19512af2488ade9b2a79be4b023e7bc8ff9ccca5e2b0
Evidence   : docs/marea/brand/evidence/contrast/contrast-matrix.json, docs/marea/brand/evidence/contrast/contrast-failures.json
Environment: node v24.18.0, win32

Thresholds (from the token file, §5.5 of the brief):
  text-normal  AA 4.5:1  internal 5:1
  text-large   AA 3:1  internal 4.5:1
  ui           AA 3:1  internal 3:1
  ui-graphic   AA 3:1  internal 4.5:1
  focus        AA 3:1  internal 4.5:1
  cockpit      AA 4.5:1  internal 7:1
  disabled     AA exempt  internal 3:1
  decorative   AA exempt  internal exempt

## web-light — Corporate website, docs, product pages (existing light theme; stays light — brief §5.4).
   gate=aa valueStatus=EXISTING_MEASURED_BASELINE appliedInRepository=true
   pairs=28 pass=16 aaMiss=3 internalMiss=12
   text-normal  n=20 tightest 4.67:1 (internal 5:1) — sea on surface
   cockpit      n= 2 tightest 5.41:1 (internal 7:1) — stateSafe on canvas
   text-large   n= 1 tightest 15.52:1 (internal 4.5:1) — themeColor on canvas
   focus        n= 3 tightest 1.51:1 (internal 4.5:1) — focusRing on surfaceRaised

## instrument-day — App/NAV/DISPLAY daytime, bridge daylight (software only; not the corporate website).
   gate=aa+internal valueStatus=PROPOSED appliedInRepository=false
   pairs=54 pass=54 aaMiss=0 internalMiss=0
   text-normal  n=35 tightest 5.16:1 (internal 5:1) — action on surfaceRaised
   text-large   n= 1 tightest 11.46:1 (internal 4.5:1) — textPrimary on canvas
   cockpit      n= 3 tightest 11.18:1 (internal 7:1) — dataPrimary on surfaceRaised
   ui-graphic   n= 2 tightest 11.46:1 (internal 4.5:1) — chartLine on canvas
   ui           n= 3 tightest 3.18:1 (internal 3:1) — chartGrid on surfaceRaised
   focus        n= 5 tightest 5.63:1 (internal 4.5:1) — focusRingOnFill on action
   disabled     n= 3 tightest 3.15:1 (internal 3:1) — disabled on surfaceRaised

## instrument-sunlight — Same surfaces under high ambient light and glare (hardware validation BLOCKED — no display exists).
   gate=aa+internal valueStatus=PROPOSED appliedInRepository=false
   pairs=54 pass=54 aaMiss=0 internalMiss=0
   text-normal  n=35 tightest 6.06:1 (internal 5:1) — textMeta on surfaceRaised
   cockpit      n= 3 tightest 14.36:1 (internal 7:1) — dataPrimary on surfaceRaised
   ui           n= 3 tightest 4.13:1 (internal 3:1) — chartGrid on surfaceRaised
   focus        n= 5 tightest 8.74:1 (internal 4.5:1) — focusRingOnFill on action
   disabled     n= 3 tightest 3.80:1 (internal 3:1) — disabled on surfaceRaised

## instrument-night — App/NAV/DISPLAY at night, watchkeeping (software only).
   gate=aa+internal valueStatus=PROPOSED appliedInRepository=false
   pairs=54 pass=54 aaMiss=0 internalMiss=0
   text-normal  n=35 tightest 5.23:1 (internal 5:1) — textSecondary on surfaceRaised
   cockpit      n= 3 tightest 8.01:1 (internal 7:1) — dataPrimary on surfaceRaised
   ui           n= 3 tightest 3.15:1 (internal 3:1) — chartGrid on surfaceRaised
   focus        n= 5 tightest 8.01:1 (internal 4.5:1) — focusRing on surfaceRaised
   disabled     n= 3 tightest 3.93:1 (internal 3:1) — disabled on surfaceRaised

Known pre-existing baseline findings (recorded, not regressions):
  F-6 textSecondary on surface = 4.8275:1 (target 5:1, internal, web-light)
  F-6 textSecondary on surfaceRaised = 4.7059:1 (target 5:1, internal, web-light)
  F-6 textMeta on surface = 4.8275:1 (target 5:1, internal, web-light)
  F-5 sea on canvas = 4.9631:1 (target 5:1, internal, web-light)
  F-5 sea on surface = 4.6663:1 (target 5:1, internal, web-light)
  F-7 stateSafe on badgeSafeBg = 4.7762:1 (target 5:1, internal, web-light)
  F-7 stateCritical on badgeCriticalBg = 4.7371:1 (target 5:1, internal, web-light)
  F-4 stateCritical on canvas = 5.554:1 (target 7:1, internal, web-light)
  F-4 stateSafe on canvas = 5.413:1 (target 7:1, internal, web-light)
  F-1 focusRing on canvas = 1.6529:1 (target 3:1, wcag-aa, web-light)
  F-1 focusRing on canvas = 1.6529:1 (target 4.5:1, internal, web-light)
  F-1 focusRing on surface = 1.554:1 (target 3:1, wcag-aa, web-light)
  F-1 focusRing on surface = 1.554:1 (target 4.5:1, internal, web-light)
  F-1 focusRing on surfaceRaised = 1.5149:1 (target 3:1, wcag-aa, web-light)
  F-1 focusRing on surfaceRaised = 1.5149:1 (target 4.5:1, internal, web-light)

Summary: 190 pairs measured across 4 modes; 3 AA miss(es), 12 internal-target miss(es), 15 known baseline finding(s), 0 failure(s).
RESULT: PASS
```

Interpretation, stated precisely: the **proposed** day/sunlight/night palettes meet both the WCAG-AA
minima and the stricter internal targets on every pair the roles are actually used on. The **existing
website** palette meets AA except for the three focus-ring pairs already documented as F-1; its internal
target misses are F-4/F-5/F-6/F-7. No pair outside those declared findings fails, and no value was changed
in `src/`.

---

## 11. Refinements relative to the brief's §5.3 starting palette

The brief marks §5.3 as a measured starting point to be re-validated, not approval. Four values were
tightened so the proposed day palette meets the brief's own internal targets on the surfaces it is used
on; each is recorded in the token file's `refinementsFromBrief`:

| Token | Brief §5.3 value | Proposed | Reason |
| --- | --- | --- | --- |
| `textSecondary` | `#57708a` (`--muted`) | `#4a6579` | `--muted` = 4.83:1 on `--mist` and 4.71:1 on `--sky`; internal normal-text target is ≥5:1 |
| `textMeta` | `#57708a` (`--muted`) | `#52697f` | meta is normal-size text; must meet ≥5:1 on canvas/surface/raised |
| `stateStale` | `#5f6f7d` | `#55646f` | stale values must stay readable; brief value = 4.87:1 on `--mist`, 4.74:1 on `--sky` (<5:1) |
| `focusRing` | candidate `#0f5f8c` | `#0f5f8c` | confirmed: 6.92/6.50/6.34:1; proposes a compliant value — F-1 remains OPEN for the live site until MC-06 implements and verifies it |
| `focusRingOnFill` | not specified | `#ffffff` / `#0d1b26` | a focus indicator must also contrast with the filled control it sits on |

All other instrument values come from the brief's §5.3 table unchanged. No value was invented without
being measured; no value is applied.

---

## 12. Mapping to existing web tokens (where roles coincide)

| Instrument role | Web token | Relationship |
| --- | --- | --- |
| `canvas` (day) | `--mist` `#f2f9fd` | Instrument day canvas is `--mist`, not `--paper`: the instrument is a surface, not a page |
| `surface` | `--paper` `#ffffff` | same value |
| `surfaceRaised` | `--sky` `#eaf7ff` | same value |
| `textPrimary` | `--navy`/`--ink` `#17365d` | same value |
| `textSecondary` / `textMeta` (web) | `--muted` `#57708a` | same value in the web baseline; tightened only for instrument surfaces |
| `stateCritical` (web) | `--danger` `#b4423a` | instrument day value is deeper (`#a32b22`) |
| `stateSafe` (web) | `--ok` `#27775c` | instrument day value is deeper (`#1f5f49`) |
| `action` | `--sea-strong` `#176ca6` | same value |
| `focusRing` | hard-coded `#8fd2f5` in `:focus-visible` (not a token) | proposes a compliant replacement; F-1 remains OPEN until MC-06 implements and verifies it (MC-04 applies nothing) |
| `themeColor` | `index.html` `#0b2540` (not a token) | must become an explicit token in MC-06 (F-3) |

The corporate website stays **light**: no night mode is added to the site as a side effect of instrument
work (§5.8). Brand navy/sea is not used as a night-mode data colour.

---

## 13. What must not be imitated (claims/identity safety)

No official chart look (IHO S-52 colour tables, ENC legend, official symbol libraries), no
"ECDIS-class/equated/navigation-grade" wording or visual cues, no certification/approval badges or seals,
no safety guarantees, no simulated measurement accuracies or tolerance bands, no fake chart data, no
AIS-as-complete-traffic framing, no autonomous-PILOT framing, no certainty framing for weather. Colour
never implies a navigation-safety guarantee; mandatory disclaimer space is part of the layout, not
decoration (§7.7). This document makes no certification, approval or conformance claim.

---

## 14. Limitations and status

| Item | Status | Exact future test |
| --- | --- | --- |
| Proposed palette contrast (day/sunlight/night, all role pairs) | `PASS` — computed WCAG 2.x ratio for every pair, evidence JSON | Re-run `node scripts/check-contrast.mjs` after any token change |
| Existing site AA status | `PARTIAL` — tokens measured; focus ring breaches AA (F-1) until MC-06 | Re-measure rendered DOM with axe + manual focus screenshots after fix |
| Rendered sampling / anti-aliasing / translucency on real software | `NOT_TESTED` | MC-06: screenshot every pair in the implemented UI; sample pixels where text is small |
| Greyscale and CVD usability | `PARTIAL` — boards produced; human review pending | Independent reviewer inspects `cvd-simulation-board.html` + `greyscale-board.html` at day/night; author ≠ reviewer |
| Human CVD participant testing | `NOT_TESTED` | Future user testing with colour-vision-deficient participants; no certification claimed |
| Sunlight/glare validation | `BLOCKED` | Physical display in ambient sunlight, photometric measurement, hardware does not exist |
| Night photometric validation (halation, alert floor) | `BLOCKED` | Hardware measurement at night; no display exists |
| Print/PDF colour proof | `BLOCKED` | Print authorization, 1:1 proof on substrate, ink-contrast measurement |
| Standardised token consumer contract (MC-06) | `PENDING` | MC-06 implements the JSON roles; no `src/` change in MC-04 |

The token JSON is the machine-readable deliverable; this document is the human-readable record. Both are
`INTERNAL_PROPOSED` and neither is applied to the repository's live styles.
