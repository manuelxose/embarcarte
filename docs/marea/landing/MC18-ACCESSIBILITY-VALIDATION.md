# MC-18 — Accessibility validation (D10)

| Field | Value |
|---|---|
| Deliverable | D10 `MC18-ACCESSIBILITY-VALIDATION.md` |
| Milestone | MC-18/36 — EMBARCARTE / MAREA internal corporate landing |
| Date | 2026-11-03 |
| Owner | MC-18 QA (Agent F) |
| Scope | Isolated loopback preview `/marea` (ES) and `/en/marea` (EN), Chromium only |
| Conformance claim | **NONE** — automated evidence, not a WCAG 2.2 AA conformance statement |
| Tool | `@axe-core/playwright` / axe-core 4.11.4, Chromium 156.0.8078.4 |
| Evidence | [`accessibility-evidence.json`](data/accessibility-evidence.json), [`ssr-hydration-evidence.json`](data/ssr-hydration-evidence.json), [`responsive-evidence.json`](data/responsive-evidence.json) |
| Suite | `e2e/landing/accessibility.spec.ts`, `keyboard.spec.ts`, `content.spec.ts`, `bilingual-parity.spec.ts`, `ssr-hydration.spec.ts`, `responsive.spec.ts` |

No accessibility conformance, certification or approval is claimed for the
landing, the proposed MAREA brand or any future public page. The landing is
internal draft copy (`publicationStatus: NOT_AUTHORIZED`) and the preview is
non-indexable.

## 1. Method

Executed commands (working tree at 2026-11-03):

```text
npm run build:landing:preview        # exit 0 (Angular 21.2.25, 0 prerendered routes)
npx playwright test -c playwright.landing.config.ts
                                      # 44 passed / 44, exit 0, 1 worker, 1.7 min
```

Axe runs after hydration in both locales at 1440×900 and 390×844. The harness
also waits for finite CSS entrance animations to settle before analysing, so the
audited state is the stable page, not a mid-animation frame. Tag set
`wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa`; no rule is disabled — the page
has a single `<main>` landmark. Raw axe output is attached to the Playwright
report and summarised per run in the evidence JSON; the machine-readable
`data.results` and `data.summary` are written by the suite itself.

Keyboard/focus checks use real browser keyboard events (no programmatic
`.focus()` except to enter the mobile list before Escape). Control counts are
measured from the visible DOM: **14** focusable controls at 1440px (skip link,
wordmark, 10 nav links, locale switch, architecture scroll region) and **5** on
mobile 390px (skip link, wordmark, nav toggle, locale switch, scroll region).

## 2. Automated axe results (final run)

| Locale | Viewport | Violations (critical/serious/moderate/minor) | Passes | Incomplete |
|---|---|---|---|---|
| ES | 1440×900 | 0 / 0 / 0 / 0 | 27 | 1 |
| ES | 390×844 | 0 / 0 / 0 / 0 | 29 | 1 |
| EN | 1440×900 | 0 / 0 / 0 / 0 | 27 | 1 |
| EN | 390×844 | 0 / 0 / 0 / 0 | 29 | 1 |

`data.summary = {critical: 0, serious: 0, moderate: 0, minor: 0}`.
The single incomplete result per run is the `color-contrast` rule for elements
whose background cannot be resolved automatically (gradient/composited
surfaces). **It was not resolved manually in this dataset**; a human contrast
review is still required. No serious or critical violation remains, so the axe
gate passes; this does not imply full WCAG conformance.

Historical note (pre-final validation, same day): an earlier axe run on the
pre-polish CSS reported `color-contrast` (serious, 2 nodes) on the internal
banner auxiliary lines. The art-direction owner fixed the banner contrast before
the final run; the evidence above is the post-fix measurement. A later
intermediate run also flagged the hero plate while its 480 ms entrance
animation was still running; axe now waits for finite entrance animations to
settle, and the authoritative settled-page run reports zero violations (the
transient style is not the stable UI).

## 3. Keyboard, focus and semantics (executed assertions)

| Check | Result | Evidence |
|---|---|---|
| Skip link is the first Tab stop, visible focus ring, Enter moves focus to `#landing-main` | PASS | `keyboard.spec.ts`, 1 test |
| Every visible control Tab-reachable in a bounded traversal (14 @1440, 5 @390), visible focus indicator, inside viewport, not obscured | PASS | `keyboard.spec.ts`, 2 tests |
| No keyboard trap: all visible controls reached within `controls + 8` Tab presses | PASS | same traversal |
| Mobile nav toggle below 1024px: `aria-expanded` false→true, `aria-controls` resolves, list opens | PASS | `keyboard.spec.ts` |
| Escape closes the list when focus is inside it and returns focus to the toggle | PASS | `keyboard.spec.ts` |
| ≥1024px: toggle hidden, list always visible, 10 links | PASS | `keyboard.spec.ts` |
| Exactly one `h1` (`#hero-heading`), one `h2` per framed section, 10 frozen section anchors | PASS | `content.spec.ts` |
| Internal banner visible and named; nine family and six bundle ids exact | PASS | `content.spec.ts`, SSR evidence |
| No purchase/checkout control by accessible name; no `€`/`EUR`, price amount, "en stock"/"in stock" | PASS | `content.spec.ts`, both locales |

**Inherited MC-17 design-system limitation (informational, not an MC-18
defect).** `marea-responsive-nav` binds the Escape handler on the nav list
(`src/app/marea-design-system/components/structured/marea-responsive-nav.ts:50,179`).
Escape pressed while focus remains on the toggle itself does **not** close the
list; the documented path (focus inside the list) does. MC-18 does not modify or
fork the design system (validator MC18-30), so this is recorded as an inherited
component gap owned by MC-17. It is not claimed as conformant.

## 4. Reduced motion

`page.emulateMedia({ reducedMotion: 'reduce' })`, both locales at 1440×900 and
390×844, after hydration. No long-running animation/transition (>100 ms) on
interactive elements; maximum transition duration is 0.01 ms; `scroll-behavior`
computes to `auto` on html/main/sections; page readable (body text > 10,000
characters), one `h1`, banner visible, no horizontal overflow. 4/4 runs PASS.

## 5. Untested combinations and limitations

- **No assistive technology sessions**: no NVDA, JAWS, VoiceOver, TalkBack,
  switch device, magnifier or voice control was executed.
- **Chromium only** (Playwright Desktop Chrome 156.0.8078.4). Firefox, Safari and
  mobile browsers were not run.
- Automated axe coverage is partial; `color-contrast` is **incomplete** once per
  run and requires manual verification on real displays.
- No real mobile hardware, touch gestures, virtual keyboard or OS text scaling
  (200%) was tested in this suite.
- Keyboard focus geometry was checked by script (viewport/overlap), not by a
  human reviewer.
- The preview is a development build served on loopback; results do not describe
  a production/CDN deployment.

## 6. Reproduction

```text
npm run build:landing:preview
npx playwright test -c playwright.landing.config.ts
npx prettier --check e2e/landing playwright.landing.config.ts
```

The suite rewrites [`accessibility-evidence.json`](data/accessibility-evidence.json)
with `data.results`, `data.summary`, `data.engine` and `data.reducedMotion`.
Cross-reference D11 (`MC18-RESPONSIVE-AND-VISUAL-EVIDENCE.md`) for viewport and
screenshot evidence and D12 (`MC18-PERFORMANCE-AND-BUNDLE-EVIDENCE.md`) for lab
performance and production isolation.
