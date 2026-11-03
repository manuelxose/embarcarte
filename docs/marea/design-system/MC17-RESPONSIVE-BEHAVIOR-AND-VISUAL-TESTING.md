# MC-17 — Responsive behaviour and visual testing (D13)

| Field | Value |
|---|---|
| Deliverable | D13 `MC17-RESPONSIVE-BEHAVIOR-AND-VISUAL-TESTING.md` |
| Milestone | MC-17/36 — MAREA premium design system (internal only) |
| Date | 2026-11-03 |
| Owner | documentation-specialist (MC-17/36) |
| Suite | `e2e/design-system/responsive.spec.ts`, `visual.spec.ts` |
| Browser | Chromium (Playwright `Desktop Chrome`) on Windows |
| Visual baselines | 26 PNGs under `e2e/design-system/visual.spec.ts-snapshots/` |
| Recorded run | **37/37 tests across six spec files at `f2c9ec2` (30/30 at `4a9043b`)**; final status `passed`. The authoring records were 28/28 and 29/29; the count is re-measured at the correction commit |

## 1. Responsive strategy

The components are **intrinsic before they are responsive**. There is no global
column system and no page-level breakpoint that switches a layout: each component
declares the minimum geometry it needs, and containers let it shrink.

| Rule | Implementation |
|---|---|
| Single-column grids use explicit tracks | `grid-template-columns: minmax(0, 1fr)` instead of an implicit or `auto` track; this prevents a max-content child from widening the grid |
| Multi-column grids are fluid | `repeat(auto-fit, minmax(var(--marea-grid-min), 1fr))` in `marea-grid`; two-column definition/spec layouts collapse below 768 px |
| Flex rows wrap | `flex-wrap: wrap` with the icon fixed (`flex: none`) and the text body allowed to shrink |
| Long words never widen the page | `overflow-wrap: anywhere` on component text; `overflow-wrap: break-word` in the global catalogue prose and the text primitive |
| Type is fluid | `clamp()` expressions from `typography-roles.json`; no fixed pixel headings |
| Dense tables scroll inside a region | the table may exceed its region; the region is labelled, `tabindex="0"`, `overflow-x: auto|scroll`, and fits the viewport |
| Navigation collapses at 1024 px | below 1024 a native toggle with `aria-expanded`/`aria-controls`; at 1024+ the toggle is hidden and the list is horizontal |
| Motion is optional | transitions are 120–200 ms and disabled under `prefers-reduced-motion`; no auto-rotating content |

The design starts at the WCAG reflow floor: `--marea-bp-320` is the
`NORMATIVE_WCAG_22_AA` token for 1.4.10. The full breakpoint scale is 320, 360, 390,
480, 768, 900, 1024, 1160, 1440, but only the six widths below are executed as
runtime assertions.

## 2. Widths actually tested

`responsive.spec.ts` sets a 900 px viewport height and loops these widths. At each
width it navigates to the catalogue, waits for fonts and two frames, then asserts.

| Width | What this width verifies |
|---:|---|
| 320 | The WCAG 1.4.10 reflow floor and the narrowest supported phone; the original 876 px overflow defect occurred here |
| 360 | The common small-Android width; verifies that 320-only fixes did not hard-code a single width |
| 390 | The reference modern phone width used by the performance measurement (`390×844`) |
| 768 | The tablet / two-column boundary where definition and specification layouts collapse |
| 1024 | The navigation breakpoint: toggle hidden, horizontal list visible |
| 1440 | The desktop reference width used for the visual baselines |

At every width the test asserts:

1. `document.documentElement.scrollWidth <= window.innerWidth + 2` — no page-level
   horizontal overflow.
2. Every `<table>` is inside a `[role="region"]` with `tabindex="0"`, a non-empty
   `aria-label`, and `overflow-x` of `auto` or `scroll`.
3. The region starts at or after `-1 px` and ends at or before the viewport width
   `+1 px`; a region that declares overflow must actually scroll when set to
   `scrollLeft = 10000`.
4. No visible `h1`–`h6`/`p` is vertically clipped by `overflow: hidden|clip` without
   a `clip-path`.
5. A non-assertion screenshot is written to
   `test-results/design-system/responsive-<width>.png`.

The six responsive screenshots exist for 320, 360, 390, 768, 1024 and 1440, which
means the assertions completed before each capture.

## 3. 200% text scaling

The second responsive test injects `html { font-size: 200% !important; }` at each of
the six widths and asserts:

- no page-level horizontal overflow;
- every visible `button`/`a` stays within the viewport (`left >= -1`,
  `right <= innerWidth + 2`);
- no control clips its own content in either axis;
- no two sibling controls overlap by more than 1 px in both axes;
- the override is removed in a `finally` block and the page is repainted.

No 200% screenshots are retained: the evidence is the assertion result in the
passing run. This is a scripted reflow check, not a substitute for a manual
browser-zoom review or a screen-reader test.

## 4. Recorded results

The latest recorded Playwright run covers six spec files: `accessibility`,
`commerce`, `keyboard`, `responsive`, `ssr-contract` and `visual`. The retained
final-status file `test-results/design-system/artifacts/.last-run.json` says
`{"status":"passed","failedTests":[]}`. At `f2c9ec2` the suite is **37/37 passed**,
of which:

| Spec | Tests | Relevant to this document |
|---|---:|---|
| `responsive.spec.ts` | 2 | six-width reflow; 200% text scaling |
| `visual.spec.ts` | 6 | 4 modes at 1440; 2 modes at 320; commerce ES/EN pair |
| other four specs | 22 | accessibility, keyboard, commerce, SSR contract |
| **Total** | **30** | six files |

The count is re-measured at the correction commit and is not hardcoded as a final
number: a later test addition changes it. The authoring-time snapshot was 28 tests
(29 after the audit correction); those counts are historical.

Caveat on the JSON reporter: the retained
`test-results/design-system/results.json` contains 28 `skipped` entries with zero
results and a start time of an earlier run. It is a reporter artifact, not the
completion record; the completion record is `.last-run.json` plus the generated
baselines, screenshots and summaries.

### 4.1 Exact responsive test names

| Spec | Test name |
|---|---|
| `responsive.spec.ts` | `no horizontal overflow, tables contained and text not clipped at every width` |
| `responsive.spec.ts` | `200% text scaling keeps the page usable: no overflow, no clipped or overlapping controls` |

### 4.2 Exact visual test names

| Spec | Test name | Baselines |
|---|---|---:|
| `visual.spec.ts` | `all galleries at 1440x900 in web-light` | 4 |
| `visual.spec.ts` | `all galleries at 1440x900 in instrument-day` | 4 |
| `visual.spec.ts` | `all galleries at 1440x900 in instrument-sunlight` | 4 |
| `visual.spec.ts` | `all galleries at 1440x900 in instrument-night` | 4 |
| `visual.spec.ts` | `all galleries at 320x812 in web-light and instrument-night` | 8 |
| `visual.spec.ts` | `commerce gallery ES vs EN pair at 1440x900` | 2 |

## 5. Defect found and fixed

The milestone's responsive run found a real layout defect before the current
implementation was frozen:

| Item | Record |
|---|---|
| Symptom | Horizontal page overflow at 320 px |
| Recorded magnitude | `document.documentElement.scrollWidth` of **876 px** at a 320 px viewport |
| Cause | Implicit/auto grid tracks sized to the max-content width of a long child, so the grid widened the page instead of wrapping |
| Fix | Explicit `minmax(0, 1fr)` tracks for single-column grids, plus `overflow-wrap: break-word`/`anywhere` for long unbreakable words |
| Verification | `responsive.spec.ts` asserts no overflow at 320, 360, 390, 768, 1024 and 1440, with and without 200% text scaling |
| Current state | The current tree passes the assertions; the six responsive screenshots are present |

**Provenance note.** The 876 px figure and the max-content diagnosis come from the
Lead's milestone defect record. This document did not re-run the pre-fix tree: the
fix is already in the working tree, the milestone forbids source changes and this
task forbids Git commands, so the old tree cannot be reconstructed here. The current
tree is verified by the committed assertion; the before-state is recorded, not
reproduced. The command that would reproduce the check on any tree is:

```text
npm run build:design-system-preview
npx playwright test -c playwright.design-system.config.ts e2e/design-system/responsive.spec.ts
```

If the assertion fails, the error message prints the actual
`documentElement.scrollWidth`, viewport and body width, which is how a regression
would be quantified.

## 6. Visual baseline inventory

Playwright writes snapshots with the `-chromium-win32` suffix. The exact inventory
at `4a9043b` is **26 PNGs** after removing the two orphaned foundation locale
captures; the ES/EN pair is now the commerce gallery pair:

| # | Baseline file | Viewport | Content |
|---:|---|---|---|
| 1 | `foundation-1440x900-web-light-chromium-win32.png` | 1440×900 | foundation gallery, web-light |
| 2 | `foundation-1440x900-instrument-day-chromium-win32.png` | 1440×900 | foundation, instrument-day |
| 3 | `foundation-1440x900-instrument-sunlight-chromium-win32.png` | 1440×900 | foundation, instrument-sunlight |
| 4 | `foundation-1440x900-instrument-night-chromium-win32.png` | 1440×900 | foundation, instrument-night |
| 5 | `structured-1440x900-web-light-chromium-win32.png` | 1440×900 | structured gallery, web-light |
| 6 | `structured-1440x900-instrument-day-chromium-win32.png` | 1440×900 | structured, instrument-day |
| 7 | `structured-1440x900-instrument-sunlight-chromium-win32.png` | 1440×900 | structured, instrument-sunlight |
| 8 | `structured-1440x900-instrument-night-chromium-win32.png` | 1440×900 | structured, instrument-night |
| 9 | `commerce-1440x900-web-light-chromium-win32.png` | 1440×900 | commerce gallery, web-light |
| 10 | `commerce-1440x900-instrument-day-chromium-win32.png` | 1440×900 | commerce, instrument-day |
| 11 | `commerce-1440x900-instrument-sunlight-chromium-win32.png` | 1440×900 | commerce, instrument-sunlight |
| 12 | `commerce-1440x900-instrument-night-chromium-win32.png` | 1440×900 | commerce, instrument-night |
| 13 | `instrument-1440x900-web-light-chromium-win32.png` | 1440×900 | instrument gallery, web-light |
| 14 | `instrument-1440x900-instrument-day-chromium-win32.png` | 1440×900 | instrument, instrument-day |
| 15 | `instrument-1440x900-instrument-sunlight-chromium-win32.png` | 1440×900 | instrument, instrument-sunlight |
| 16 | `instrument-1440x900-instrument-night-chromium-win32.png` | 1440×900 | instrument, instrument-night |
| 17 | `foundation-320x812-web-light-chromium-win32.png` | 320×812 | foundation, web-light |
| 18 | `foundation-320x812-instrument-night-chromium-win32.png` | 320×812 | foundation, instrument-night |
| 19 | `structured-320x812-web-light-chromium-win32.png` | 320×812 | structured, web-light |
| 20 | `structured-320x812-instrument-night-chromium-win32.png` | 320×812 | structured, instrument-night |
| 21 | `commerce-320x812-web-light-chromium-win32.png` | 320×812 | commerce, web-light |
| 22 | `commerce-320x812-instrument-night-chromium-win32.png` | 320×812 | commerce, instrument-night |
| 23 | `instrument-320x812-web-light-chromium-win32.png` | 320×812 | instrument, web-light |
| 24 | `instrument-320x812-instrument-night-chromium-win32.png` | 320×812 | instrument, instrument-night |
| 25 | `commerce-1440x900-web-light-locale-es-chromium-win32.png` | 1440×900 | commerce ES copy pair (sha256 `a57f0370…`) |
| 26 | `commerce-1440x900-web-light-locale-en-chromium-win32.png` | 1440×900 | commerce EN copy pair (sha256 `27132adf…`) |

Snapshot settings in `visual.spec.ts`: `maxDiffPixelRatio: 0.002`,
`animations: 'disabled'`, `fullPage: false`, `caret: 'hide'`, `scale: 'css'`;
locale is forced to `es`, except for the explicit ES/EN pair. The catalogue is
scrolled so the gallery starts at the top of the viewport before each capture.

## 7. Platform limitation and provenance

- The baselines are **Chromium/Windows-specific** (`-chromium-win32`). Firefox,
  WebKit, macOS, Linux, real phones and high-DPI hardware are not covered.
- Source commits: `3a8d4fd` (initial 26-baseline set), `7cbc99e` (audit corrections),
  `4a9043b` (commerce locale pair replacing the orphaned foundation pair). The
  previous wording that no SHA could be quoted is superseded.
- Environment: Windows, Chromium as installed by `@playwright/test` 1.64.1, Node
  24.18.0.
- Generation is explicit and reviewable: `npm run build:design-system-preview` builds
  the catalogue, a first run with `--update-snapshots` writes snapshots **only on an
  explicitly reviewed tree**, and every acceptance comparison runs **without**
  `--update-snapshots`. The two orphaned foundation locale captures were deleted
  because the visual spec now captures the commerce locale pair.
- The baselines do **not self-validate**. Generating them in the same run that
  compares them cannot prove the implementation correct; the committed process is:
  generate once on a reviewed tree, then compare on later runs and fail on a
  material difference.
- The ES/EN pair differs: sha256 `27132adf1af3…` (EN) vs `a57f03700f6b…` (ES), so the
  pair now discriminates locale rendering.
- The 26 files are evidence of the visual state, not proof that the state is
  correct. A human must review a diff; a passing comparison only proves the pixels
  did not change.

## 8. Rule for future baseline changes

1. Do not run `--update-snapshots` to make a failing visual test green.
2. Investigate the diff: classify it as intended change, rendering-environment
   change or regression.
3. An intended change needs a reviewable reason (token, component or copy change)
   and regeneration **on the reviewed commit**.
4. A rendering-environment change (browser, OS, font package, DPI) needs a separate
   decision and a new platform suffix; never silently overwrite the Windows set.
5. Regenerate all affected baselines in one run, commit the PNGs and record the
   command, browser, OS, locale and commit.
6. Re-run the suite **without** `--update-snapshots`; only a clean comparison is a
   pass.
7. The independent auditor re-runs the comparison on their environment and records
   any environment-only differences.

## 9. What is not claimed

- No cross-browser, cross-platform, real-device or real-DPI testing.
- No visual approval of the MAREA identity, no brand adoption.
- No performance claim from screenshot capture.
- No accessibility conformance claim; visual passing is not WCAG conformance.
- No mobile hardware or marine display validation.
- No claim that the 26 baselines are complete coverage of every component state;
  only the galleries at the listed widths and modes are captured.

Source references: `e2e/design-system/responsive.spec.ts`,
`e2e/design-system/visual.spec.ts`, `e2e/design-system/helpers.ts`,
`playwright.design-system.config.ts`,
`e2e/design-system/visual.spec.ts-snapshots/`,
`test-results/design-system/responsive-*.png`,
`docs/marea/design-system/data/layout-tokens.json`,
`docs/marea/design-system/MC17-MC18-HANDOFF.md`.
