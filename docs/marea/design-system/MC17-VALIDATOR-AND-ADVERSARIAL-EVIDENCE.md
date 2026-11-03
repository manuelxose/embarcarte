# MC-17 — Validator and adversarial evidence (D21)

| Field | Value |
|---|---|
| Deliverable | D21 `MC17-VALIDATOR-AND-ADVERSARIAL-EVIDENCE.md` |
| Milestone | MC-17/36 — MAREA premium design system (internal only) |
| Date | 2026-11-03 |
| Owner | documentation-specialist (MC-17/36) |
| Validator | `scripts/check-marea-design-system.mjs` (964 lines) |
| Check count | **38** (`MC17-01` … `MC17-38`) |
| Unit/adversarial suites | 2 files, **27 tests** (16 unit + 11 adversarial) |
| Most recent run | **36/38 PASS, 2 FAIL** — failures are missing artefacts, not code checks |

## 1. What the validator is

`scripts/check-marea-design-system.mjs` is a static/dynamic contract validator. It
reads the real implementation, token source, datasets and build output; it does not
read a delivery summary. It runs the three deterministic generators in `--check`
mode, computes WCAG contrast from declared token values, scans the production bundle
when present, and writes:

| Output | Content |
|---|---|
| `docs/marea/design-system/evidence/validator-run.json` | all 38 checks with status, description, detail and evidence |
| `docs/marea/design-system/data/contrast-evidence.json` | 296 pair/mode measurements; status and failures |

The run has a deterministic timestamp (`deterministic-runT00:00:00.000Z`) rather
than a wall clock, so the evidence file does not change merely because it was rerun.
It exits with code 1 if any check fails; it writes both evidence files before
exiting.

## 2. The 38 checks by group

Descriptions are the validator's own (abbreviated detail in the third column).

### Token and governance contract (01–06)

| ID | Verifies | Recorded detail (latest run) |
|---|---|---|
| `MC17-01` | Token contract keeps internal/provisional governance status | `INTERNAL_PROPOSED / NOT_ADOPTED / NO_GO` |
| `MC17-02` | Four modes defined; every colour role has a value per mode | 33 roles × 4 modes |
| `MC17-03` | Night mode uses no pure black canvas or pure white text | no `#000000`/`#ffffff` |
| `MC17-04` | All declared contrast pairs pass their threshold in every mode | 296 pair/mode measurements |
| `MC17-05` | Token, fixture and baseline outputs are deterministic and current | generators report current |
| `MC17-06` | Every `--marea-*` reference resolves to a definition | 180 references / 182 definitions |

### Style and production isolation (07–11)

| ID | Verifies | Recorded detail |
|---|---|---|
| `MC17-07` | No `:root`/`html` override or legacy token mutation; production styles unchanged | pass |
| `MC17-08` | Design-system code absent from 5 production entry files | pass |
| `MC17-09` | Production browser build contains no DS/catalogue identifier | 168 build files scanned |
| `MC17-10` | Catalogue is a separate non-production project at `preview/` | pass |
| `MC17-11` | No MAREA asset in `public/`; 15 public files unchanged | pass |

### Components, states and accessibility contracts (12–18)

| ID | Verifies | Recorded detail |
|---|---|---|
| `MC17-12` | Every registry entry exists: class, selector, host marker, inputs, outputs | 49 entries verified |
| `MC17-13` | No undocumented component variant is exposed | 39 option values |
| `MC17-14` | Every component covers the 11 required states | 49 × 11 |
| `MC17-15` | Keyboard-operable components expose `:focus-visible` | 11 components |
| `MC17-16` | Instrument numerics use Manrope tabular figures | 2 renderers |
| `MC17-17` | Disabled controls keep an accessible explanation; commerce CTA renders no action | pass |
| `MC17-18` | Status is never colour-only; badge needs text + shape icon | 6 status tones |

### Commerce truthfulness (19–24)

| ID | Verifies | Recorded detail |
|---|---|---|
| `MC17-19` | No purchase path, price, currency or stock amount exists | no purchase wording/amount API |
| `MC17-20` | MC-16 readiness/restrictions reported truthfully | PILOT blocked, AIS receive-only, FLEET no default hardware |
| `MC17-21` | 9 families, 26 editions, 6 bundles are representable | pass |
| `MC17-22` | Fixtures are synthetic; no customer/vessel/price/stock fields | pass |
| `MC17-23` | PILOT/AIS/WATCH/FLEET/SENSE/DISPLAY limits in copy; no autonomy claim | pass |
| `MC17-24` | Shared entitlements presented once per ledger | grouping exercised |

### Locale and identity (25–26)

| ID | Verifies | Recorded detail |
|---|---|---|
| `MC17-25` | ES/EN dictionaries complete and structurally equivalent | 138 bilingual keys |
| `MC17-26` | No locale-specific duplicate entity or component | 26 unique editions |

### Tooling, baseline and public surface (27–31)

| ID | Verifies | Recorded detail |
|---|---|---|
| `MC17-27` | Preview/test commands and Playwright config exist | pass |
| `MC17-28` | 35 watched public files unchanged vs `6d8287c…` | pass |
| `MC17-29` | 23 proposed routes remain out of the Angular router | pass |
| `MC17-30` | Public metadata/static assets unchanged | pass |
| `MC17-31` | No Product/Offer JSON-LD, `priceCurrency` or ratings markup | pass |

### Inheritance, publication and MC-18 (32–34)

| ID | Verifies | Recorded detail |
|---|---|---|
| `MC17-32` | Inherited risks recorded; MC-16 `PARTIAL` untouched | `MC16-FINAL-02`, `MC16-FINAL-09`, V-18 |
| `MC17-33` | MC-18 has not started | `mc18Started=false`; no MC-18 files |
| `MC17-34` | No publication, deployment or brand adoption | publication non-deployable; `NOT_ADOPTED` / `NO_GO` |

### Deliverables and datasets (35–38)

| ID | Verifies | Latest result |
|---|---|---|
| `MC17-35` | 24 required documents exist | **FAIL** — 3 missing (D22–D24) |
| `MC17-36` | 20 datasets exist with governance metadata | **FAIL** — `review-findings.json` missing |
| `MC17-37` | 8 design-system test artefacts exist | PASS |
| `MC17-38` | Accessibility dataset covers required WCAG 2.2 AA criteria | PASS |

## 3. Unit and adversarial suites

Both suites run without a browser and without a DOM.

```text
node --test --test-isolation=none scripts/check-marea-design-system.test.mjs scripts/check-marea-design-system-adversarial.test.mjs
```

Recorded result: **tests 27, pass 27, fail 0** (duration ≈ 5.5 s). The full list of
test names follows; nothing is paraphrased.

### 3.1 `check-marea-design-system.test.mjs` (16 tests)

1. `token contract keeps internal/provisional status`
2. `four modes with complete colour values`
3. `custom properties are namespaced, unique and never target :root`
4. `night mode avoids pure black and pure white`
5. `contrast formula matches known references`
6. `declared contrast pairs all pass in every mode`
7. `generated TypeScript layer is consistent with the source map`
8. `MC-16 identities are preserved in synthetic fixtures`
9. `shared entitlement ledgers are represented`
10. `ES/EN copy entries are complete and non-empty`
11. `legacy UI baseline hashes match the working tree`
12. `public directory gained no MAREA asset`
13. `generated token, fixture and baseline artefacts are current`
14. `design-system sources contain no browser globals or nondeterminism`
15. `no purchase path or currency literal exists in design-system or preview code`
16. `registry and state datasets are coherent when present`

### 3.2 `check-marea-design-system-adversarial.test.mjs` (11 tests)

1. `positive control: a closed gate with a well-formed input stays closed and quiet`
2. `unauthorised purchase signal is inverted and reported`
3. `cart, price and availability signals are all blocked`
4. `malformed CTA state fails closed to NOT_AVAILABLE`
5. `an open gate flag cannot create a purchase action in MC-17`
6. `restrictions are deduplicated and preserved`
7. `CTA derivation follows the documented precedence`
8. `safety-blocked entities never derive a purchase state`
9. `every restriction maps to an existing bilingual copy key`
10. `contracts expose no price or stock amount field`
11. `commerce CTA component renders no interactive purchase control`

The adversarial suite imports the **real** TypeScript adapter through Node 24 type
stripping (`commerce-presentation.adapter.ts`), so it exercises the same code the
components use rather than a test double.

## 4. Adversarial cases and where each is covered

| Case | Coverage |
|---|---|
| Hostile commercial input (buy/cart/price/availability flags true) | adversarial tests 2–3; `commerce.spec.ts` adversarial invariants; `MC17-19` |
| Malformed / unknown CTA state (`PURCHASE`, `42`, `null`, `undefined`) | adversarial test 4; `sanitizeCtaState`; `MC17-19` |
| Unauthorised flags cannot open a purchase action, even with the release gate open | adversarial tests 1, 5, 8; `deriveCommercialPresentation` invariants |
| Price/stock amount API absence | adversarial test 10 (`core/types.ts`); `MC17-19` regex scan |
| Purchase/currency wording in components and catalogue | unit test 15; `commerce.spec.ts` no-control/no-purchase-copy; `MC17-19` |
| Token reference resolution and no `:root` targeting | `MC17-06`; unit tests 3, 6, 7 |
| Determinism (no clock/randomness; generators current) | `MC17-05`; unit tests 13, 14 |
| Legacy UI baseline unchanged | `MC17-28`; unit test 11 |
| Preview/production isolation | `MC17-07`–`MC17-11`; `MC17-27`; SSR contract spec |
| MC-18 absence | `MC17-33` (`mc18Started=false`, no implementation files) |
| Status not colour-only | `MC17-18`; accessibility badge test |
| Restricted families/limits in copy | `MC17-20`, `MC17-23`, `MC17-24` |

## 5. Most recent validator result

Command run for this package:

```text
node scripts/check-marea-design-system.mjs
```

Result: **36/38 passed, 2 failed**, exit code **1**. The two failures, verbatim from
the final run after the six documents and four datasets of this package were written:

```text
FAIL  MC17-35  Required documentation deliverables exist — missing: MC17-INDEPENDENT-REVIEW.md, MC17-SPANISH-EXECUTIVE-REPORT.md, MC17-FINAL-DELIVERY-RECORD.md
FAIL  MC17-36  Required machine-readable datasets exist and declare their governance metadata — review-findings.json: missing
```

The residual failures are entirely outside this package: D22 (independent review),
D23 (Spanish executive report), D24 (final delivery record) and the reviewer-owned
`review-findings.json`. The six documents and four datasets authored here are
recognised by `MC17-35`/`MC17-36`; no code, token, isolation, commerce, baseline or
test-artefact check failed. The first run made before authoring had the same two
failing checks with nine and five missing artefacts respectively; the current file
`evidence/validator-run.json` is authoritative and this document does not claim a
milestone PASS.

All 36 passing checks include every code, token, isolation, commerce, baseline and
test-artefact check. No code check failed.

## 6. Exit behaviour

| Situation | Behaviour |
|---|---|
| All 38 checks pass | writes evidence, prints summary, exit 0 |
| Any check fails | writes evidence, prints per-check failures, sets `process.exitCode = 1` |
| Generator `--check` stale | `MC17-05` fails with the generator's stderr; no files are rewritten by `--check` |
| Production `dist/` absent | `MC17-09` passes with the recorded limitation "production build not present; static isolation checks used" rather than failing silently |
| Exception inside a check | caught and reported as `threw: <message>`; the check fails |
| Dataset invalid JSON | `MC17-36` reports `invalid JSON` |

## 7. Limitations

1. **Static analysis can be evaded.** Regex checks can be satisfied by a string, a
   renamed symbol or an obfuscated import; they are tripwires, not proofs. The
   production-bundle scan is string-based and only runs when `dist/` exists.
2. **Axe is not conformance.** The Playwright accessibility suite is separate from
   the validator; zero axe violations does not prove WCAG 2.2 AA.
3. **Visual baselines are platform-specific.** The 26 PNGs are Chromium/Windows;
   they do not validate other engines, platforms or DPRs, and a comparison proves
   only that pixels did not change.
4. **The validator checks presence, not full semantics.** `MC17-36` requires
   governance fields; a syntactically valid but substantively wrong dataset could
   pass that check.
5. **Self-authored evidence.** The validator, datasets and documents share authors;
   the independent review (D22) is the control that is still pending.
6. **The recorded run is a snapshot.** The file is rewritten on every run and can go
   stale as parallel work lands; read it at review time, not this document.
7. **No browser run is performed by the validator.** Keyboard, focus, reflow, axe
   and screenshots are recorded separately in `test-results/` and the Playwright
   summary; this package did not re-run Playwright.
8. **The 876 px responsive defect** is a Lead-recorded before-state, not
   reconstructable without reverting the tree; the current assertion is the
   reproducible part.
9. **No independent execution.** The 27 unit/adversarial tests and the validator were
   run by the author on this tree; independent re-execution is still required.

## 8. Reproduce the evidence

```text
node scripts/check-marea-design-system.mjs
node --test --test-isolation=none scripts/check-marea-design-system.test.mjs scripts/check-marea-design-system-adversarial.test.mjs
npm run build:design-system-preview
npm run test:design-system:visual
```

The last command requires Chromium and must not be run with `--update-snapshots`
unless the baseline-change rule in D13 is satisfied.

Source references: `scripts/check-marea-design-system.mjs`,
`scripts/check-marea-design-system.test.mjs`,
`scripts/check-marea-design-system-adversarial.test.mjs`,
`docs/marea/design-system/evidence/validator-run.json`,
`docs/marea/design-system/data/contrast-evidence.json`,
`test-results/design-system/artifacts/.last-run.json`.
