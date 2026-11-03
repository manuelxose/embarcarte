# MC-17 — Accessibility WCAG 2.2 AA audit (D12)

| Field | Value |
|---|---|
| Deliverable | D12 `MC17-ACCESSIBILITY-WCAG22-AUDIT.md` |
| Milestone | MC-17/36 — MAREA premium design system (internal only) |
| Date | 2026-11-03 |
| Owner | documentation-specialist (MC-17/36) |
| Scope | Internal catalogue `preview/`, four visual modes, default ES locale |
| Conformance claim | **NONE** — this is evidence, not a conformance statement |
| Automated tool | `@axe-core/playwright` / axe-core 4.11.4, Chromium only |
| Target | WCAG 2.2 Level AA (design target, not a certified level) |

## 1. Scope and non-claim

This audit covers the **internal, unpublished MC-17 catalogue** and the component
behaviour exercised there. It does not cover the live public website, any future
MC-18 page, assistive-technology combinations, marine hardware or other browsers.
No accessibility conformance, certification or approval is claimed for the design
system, the catalogue or the site. The current machine-readable statement is
`conformanceClaim: "NOT_CLAIMED"` in
`docs/marea/design-system/data/accessibility-requirements.json`.

## 2. Method

### 2.1 Automated rules

`e2e/design-system/accessibility.spec.ts` runs axe in each of the four visual modes
after selecting the mode through the catalogue's real buttons:

| Parameter | Value |
|---|---|
| Tool | `@axe-core/playwright` (axe-core 4.11.4) |
| Tags | `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` |
| Modes | `web-light`, `instrument-day`, `instrument-sunlight`, `instrument-night` |
| Browser | Chromium (Playwright `Desktop Chrome`) |
| Locale | default `es` |
| Disabled rule | `region` only, and only because the catalogue is an internal tool without a `main` landmark; colour-contrast, name-role-value, ARIA and keyboard rules are never disabled |
| Output | `docs/marea/design-system/evidence/axe-summary.json`; raw results in `test-results/design-system/axe-<mode>.json` (gitignored) |

### 2.2 Scripted interaction checks

The suite does not use a screen reader and does not perform a human audit. It does
execute real keyboard events and real geometry assertions, which are the
manual-equivalent checks available in this milestone:

- **Keyboard:** Tab/Enter/Space/Escape/Arrow/Home/End on tabs, accordion,
  disclosure, responsive navigation and a disabled button (`keyboard.spec.ts`).
- **Focus:** 40 Tab presses must not repeat an element and must reach more than ten
  distinct targets; tabs use a roving tab index; Escape returns focus to the nav
  toggle (`keyboard.spec.ts`). The first button and first link reached by Tab must
  show an outline or box-shadow ring in `web-light` and `instrument-night`
  (`accessibility.spec.ts`).
- **Disclosure:** native `<details>/<summary>` toggled with Enter and Space; the
  single-open accordion keeps at most one item open (`keyboard.spec.ts`).
- **Table/scroll region:** every table must sit in a labelled, focusable
  (`tabindex="0"`) `role="region"` with `overflow-x: auto|scroll`; the region must
  fit the viewport and be actually scrollable when it overflows
  (`responsive.spec.ts`, widths 320–1440).
- **Zoom/reflow:** page-level horizontal overflow is forbidden at 320, 360, 390,
  768, 1024 and 1440 CSS px, and again with `html { font-size: 200% }`
  (`responsive.spec.ts`).
- **Status not colour-only:** every `marea-status-badge` must render non-empty
  visible text and must not be hidden (`accessibility.spec.ts`).
- **Images:** every `<img>` needs `alt` or `aria-hidden="true"`; every
  `role="img"` SVG needs an accessible name; every decorative SVG needs
  `aria-hidden="true"` (`accessibility.spec.ts`).
- **Internal banner:** "Solo uso interno" / "Internal use only" visible in ES and EN
  (`commerce.spec.ts`).

Commands:

```text
npm run build:design-system-preview
npx playwright test -c playwright.design-system.config.ts
```

## 3. Recorded automated results

`docs/marea/design-system/evidence/axe-summary.json`, generated
2026-11-03T02:07:55.479Z and matching the raw per-mode JSON:

| Mode | Violations | Passes | Incomplete | Inapplicable | Violation rules |
|---|---:|---:|---:|---:|---|
| `web-light` | 0 | 36 | 0 | 26 | none |
| `instrument-day` | 0 | 36 | 0 | 26 | none |
| `instrument-sunlight` | 0 | 36 | 0 | 26 | none |
| `instrument-night` | 0 | 36 | 0 | 26 | none |

The raw files confirm the same counts and axe-core `4.11.4`. The summary states:
"`conformanceClaim`: `NONE`. This file is not a claim of full WCAG conformance;
automated coverage is partial and manual review is required."

**Record reconciliation (2026-11-03, third-round correction).** Earlier authoring
records — `MC17-INTERNAL-COMPONENT-CATALOGUE.md` §7.1,
`MC17-RISKS-AND-UNRESOLVED-GAPS.md` G11 and the limitations block of
`accessibility-requirements.json` — reported one `color-contrast` violation in
`instrument-night` inside `marea-component-doc`. That finding has a retained historical
failure artifact at
`test-results/accessibility-all-four-vis-6661a-d-automated-WCAG-A-AA-rules-chromium/`.
The **current** summary and all four current raw files report 0 violations, 36 passes
and 0 incomplete, so the older text describes a previous run, not the current tree.
Those records have now been reconciled in the same correction; the failure artifact is
kept as history.

## 4. WCAG 2.2 criteria table

The applicability set is the 17 criteria catalogued in
`accessibility-requirements.json`. Criteria outside that set were treated as not
applicable to this internal specimen catalogue (for example time-based media,
multi-page forms, authentication and drag operations); that exclusion is a scoping
decision, not a verification result.

Status legend: **verified-by-automation** = an automated assertion directly tests it
on the catalogue; **verified-manually** = a human manual check (none was performed);
**partially-verified** = only part of the surface or only declared values are
covered; **not-verified** = no test.

| Criterion | Level | Applicability | How verified / evidence | Status |
|---|---|---|---|---|
| 1.3.1 Info and Relationships | A | APPLICABLE | Semantic headings, lists, definition lists, tables and labelled regions; axe `wcag2a`; heading-order review still pending | partially-verified |
| 1.4.1 Use of Color | A | APPLICABLE | Status badge text + shape icon (`MC17-18`); every badge has visible text; no manual colour-vision check | partially-verified |
| 1.4.3 Contrast (Minimum) | AA | APPLICABLE | 296 pair/mode measurements over declared values, 0 failures (`contrast-evidence.json`); not rendered pixels | partially-verified |
| 1.4.4 Resize Text | AA | APPLICABLE | `html { font-size: 200% }` at six widths; no overflow, clipped or overlapping controls | verified-by-automation |
| 1.4.10 Reflow | AA | APPLICABLE | 320/360/390/768/1024/1440; `scrollWidth <= innerWidth + 2`; tables in labelled scroll regions | verified-by-automation |
| 1.4.11 Non-text Contrast | AA | APPLICABLE | Declared UI/focus pairs at ≥3:1; not rendered pixels | partially-verified |
| 1.4.12 Text Spacing | AA | APPLICABLE | No text-spacing override test exists | not-verified |
| 2.1.1 Keyboard | A | APPLICABLE | Real Tab/Enter/Space/Escape/Arrow/Home/End on the components listed in §2.2 | verified-by-automation |
| 2.2.2 Pause, Stop, Hide | A | APPLICABLE | No auto-updating surface; motion capped and reduced-motion honoured; design review only | not-verified |
| 2.3.1 Three Flashes | A | APPLICABLE | No flashing animation; alert pulse capped at 1 Hz by token; no automated flash test | not-verified |
| 2.4.3 Focus Order | A | APPLICABLE | 40 Tab presses, no consecutive repeat, >10 distinct targets; roving tabs; focus returned after Escape | verified-by-automation |
| 2.4.7 Focus Visible | AA | APPLICABLE | First Tab-reached button and link show outline/box-shadow in two modes; not every control | partially-verified |
| 2.4.11 Focus Not Obscured | AA | APPLICABLE | Indicator presence only; obstruction by sticky/overlay content not measured | not-verified |
| 2.5.8 Target Size (Minimum) | AA | APPLICABLE | 24 px token asserted and used by button; no dedicated target-size Playwright assertion | partially-verified |
| 3.3.1 Error Identification | A | APPLICABLE | Form field renders `role="alert"` error and exposes `describedBy()`; component review only | partially-verified |
| 3.3.3 Error Suggestion | AA | APPLICABLE | Suggestion text is supplied by the consumer; no validation logic in the design system | not-verified |
| 4.1.2 Name, Role, Value | A | APPLICABLE | axe `wcag2a/wcag2aa/wcag21a/wcag21aa/wcag22aa`; native elements first; ARIA limited to documented relationships | partially-verified |

### 2.4.13 Focus Appearance (AAA)

`accessibility-requirements.json` records 2.4.13 as an **internal quality target
only** (`level: AAA`, `claimed: false`): a 3 px solid ring with offset/inset tokens.
WCAG 2.2 AA does not require 2.4.13, and MC-17 does not claim or measure it.

## 5. Known gaps

1. **No screen-reader lab run.** NVDA, JAWS, VoiceOver and TalkBack were not tested;
   no assistive-technology user was involved.
2. **No human manual audit.** The "manual-equivalent" checks are Playwright scripts;
   a human review of focus order, reading order, zoom and disclosure remains
   outstanding (`manualReview.performed: false`).
3. **Contrast is computed from declared token values**, not sampled from rendered
   pixels. Anti-aliasing, glare, night adaptation, display hardware and colour
   management are not modelled.
4. **No full conformance claim.** Zero axe violations is not proof of WCAG
   conformance: axe covers a subset of rules, only on the tested states and only in
   Chromium.
5. **200% reflow is verified at 320–1440 after the responsive fix.** It does not
   verify browser text-only zoom at every DPI or a real mobile device.
6. **Catalogue-only scope.** A component that is accessible in the gallery can still
   be misused by a consumer; composition-level review is a future obligation.
7. **Axe `region` is disabled** because the catalogue lacks a `main` landmark. That
   is acceptable for an internal tool, but it means the run is not a public-page
   audit.
8. **The older one-violation record remains in retained failure artifacts.** The
   current summary supersedes it and the documents that repeated it were reconciled
   at `4a9043b`; the failure artifact is evidence of the previous state.
9. **No testing of error states, loading states or live-region behaviour** beyond the
   disabled-button status assertion.

## 6. Why zero violations is not conformance

An axe run returns only the rules it can evaluate on the current DOM. It does not
test screen-reader output, cognitive load, reading order, keyboard reachability of
every state, zoom beyond the scripted widths, motion sensitivity, or the correctness
of the underlying content. The summary file says this explicitly, and the dataset
sets `conformanceClaim: NOT_CLAIMED`. Any public claim would require an independent
audit with assistive technology, rendered-pixel contrast measurement and a manual
review of every surface.

## 7. Governance state

- `MC16_VERDICT = PARTIAL` — unchanged.
- Design system: `INTERNAL_PROPOSED`, `NOT_ADOPTED`, public use `NO_GO`.
- Accessibility: no conformance claim, no audit certificate, no approval.
- Publication and deployment: not authorised.
- Independent MC-17 review: two rounds recorded, both PARTIAL; third-round verdict on
  `4a9043b` pending (`MC17-INDEPENDENT-REVIEW.md`).

## 8. Evidence index

| Evidence | Path | Status |
|---|---|---|
| Axe summary | `docs/marea/design-system/evidence/axe-summary.json` | present; 0 violations/mode |
| Raw axe JSON | `test-results/design-system/axe-<mode>.json` | present (gitignored) |
| Accessibility requirements | `docs/marea/design-system/data/accessibility-requirements.json` | present; reconciled to 0 violations in all four modes |
| Contrast evidence | `docs/marea/design-system/data/contrast-evidence.json` | 296 measurements, 0 failures |
| Playwright suite | `e2e/design-system/accessibility.spec.ts`, `keyboard.spec.ts`, `responsive.spec.ts`, `commerce.spec.ts` | 30 tests across 6 files at `4a9043b` (count re-measured at the correction commit) |
| Playwright final status | `test-results/design-system/artifacts/.last-run.json` | `status: passed` |
| Validator | `docs/marea/design-system/evidence/validator-run.json` | `PASS` 38/38 at `4a9043b`; no accessibility check fails |

Commands: `node scripts/check-marea-design-system.mjs`,
`npm run test:design-system:unit`,
`npx playwright test -c playwright.design-system.config.ts`.
