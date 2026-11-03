# MC-17 — Independent review (D22)

| Field | Value |
|---|---|
| Deliverable | D22 `MC17-INDEPENDENT-REVIEW.md` |
| Milestone | MC-17/36 — MAREA premium design system (internal only) |
| Reviewer | Independent auditor (not the author of the design system) |
| Date | 2026-11-03 |
| Branch | `feature/marea-mc17-premium-design-system` |
| Reviewed commit | `3a8d4fd9797db953271e1c5951c68c89cecc9fce` (`3a8d4fd`) **plus a dirty working tree** — see §2 |
| Base commit | `6d8287c8507038c4f90fd6e35471f78081ca4676` (verified MC-16 HEAD) |
| Working-tree state at review | 81 `git status --porcelain` lines before this review's two deliverables (83 when read): 54 modified tracked files, 14 staged deletions of committed `.tmp` files, 14 untracked entries including this review, `review-findings.json`, 6 earlier documents, 4 earlier datasets, 26 visual baselines and `marea-commercial-cta.ts` |
| Machine findings | `docs/marea/design-system/data/review-findings.json` (11 findings: 2 MAJOR, 6 MINOR, 3 INFORMATIONAL) |
| Validator | `37/38` after this review's machine dataset was written; the only failure is `MC17-35` (two Lead-owned documents absent). Before the review wrote `review-findings.json` it was `36/38`. |
| Verdict | **PARTIAL** — see §9 |

This review inspects the actual working tree, the real components, the generated
artefacts, the recorded evidence and re-executed gates. It does not review the
delivery summary and does not repair the implementation. No implementation file,
test, document or generated artefact authored by another role was edited.

## 1. Mandate, independence and scope

MC-17/36 is the internal design-system milestone: tokens, components, an isolated
catalogue and its accessibility/responsive/performance evidence. The scope of this
review is exactly that internal tree and its evidence:

- `src/app/marea-design-system/**` — token source, generated CSS/TS, theme host,
  contract types, adapter, fixtures and the 49 registry entries
  (48 components + 1 directive).
- `preview/**` and the `marea-design-system-catalogue` Angular project.
- `e2e/design-system/**`, `playwright.design-system.config.ts`.
- `docs/marea/design-system/**`, including the 20 machine-readable datasets and the
  evidence files.
- The named scripts and the `package.json`/`angular.json` additions.

The reviewer is not the author. The review was performed from the working tree and
the git object database; git write commands were not run. No deployment,
publication, merge, price, stock, purchase or brand-adoption action was performed
or is authorised by this document.

## 2. Reviewed state and a material reproducibility caveat

`git log --oneline -12` shows the MC-17 implementation as one commit on top of the
verified MC-16 HEAD:

```text
3a8d4fd feat(mc17): implement premium design system, tokens, components and isolated catalogue
6d8287c docs(mc16): record independent audit, executive report and delivery
...
```

`git merge-base --is-ancestor 6d8287c8507038c4f90fd6e35471f78081ca4676 HEAD`
returned **0** (ancestry verified). `git diff --stat 6d8287c..HEAD` reports
**134 files changed, 39,486 insertions(+), 7 deletions(-)**. The branch has one
commit since the base; `git log --merges 6d8287c..HEAD` is empty.

The working tree is **not** the commit. It contains the validator hardening
(563 lines at HEAD versus 964 lines in the worktree), six documents and four
datasets that were untracked at review start (this review adds D22 and
`review-findings.json`, making 83 status lines when read), 26 untracked visual
baselines, the
`marea-commerce-cta`→`marea-commercial-cta` rename (old path deleted, new path
untracked), and evidence updates. The commit itself also tracks 14 `.tmp/` scratch
files (`.tmp/pw.json`, `.tmp/patch*.mjs`, `.tmp/fix-preview*.mjs`,
`.tmp/server-*.txt`, `.tmp/ds-run3.log`); the worktree stages their deletion and
adds `/.tmp/` to `.gitignore`, but that cleanup is uncommitted. No secret was found
in those files (only loopback URLs), but they must not be merged.

**Consequence:** a checkout of `3a8d4fd` alone cannot reproduce the reviewed
validator, the reviewed catalogue or the reviewed document set. Finding
`MC17-IR-02` records this as MAJOR and requires the Lead to commit the actual
reviewed tree.

During the review the tree changed under the auditor: at 03:31:53 local time a
concurrent workstream renamed the commerce CTA and rewrote the registry,
`component-states.json`, preview galleries, `commerce.spec.ts`, the validator and
parts of the docs, and added `testIgnore: ['**/design-system/**']` to the public
`playwright.config.ts`. All gates reported below were re-run after that change
stabilised; the reviewed state is the post-rename tree. This is disclosed as
`MC17-IR-11` (INFORMATIONAL, process/reproducibility).

## 3. Method

1. Verified ancestry and scope from the actual git object database and working
   tree; checked every forbidden public-surface path with an empty diff.
2. Read the token source, generator, registry, state dataset, component sources,
   preview galleries, e2e specs and all 21 design-system Markdown deliverables
   present, plus the relevant MC-16 handoff and governance files.
3. Independently recomputed WCAG contrast for every declared pair/mode with a
   standalone script (`.tmp/audit/contrast-recompute.mjs`), not the validator's
   maths, and compared every ratio/status with `contrast-evidence.json`.
4. Independently audited all 49 registry entries against the real source files:
   class export, selector, inputs/outputs (both directions), host marker, 11
   states, and variant enumeration (`.tmp/audit/registry-audit2.mjs`).
5. Re-ran every required gate and recorded exit codes.
6. Ran the real Playwright suite without `--update-snapshots`, inspected the four
   raw axe JSON files and the 26 PNG baselines (contact sheet + byte hashes).
7. Built mutation scenarios around the real validator under `.tmp/` (overlay I/O
   only; no tracked file modified) and reproduced ten failure modes. Six of the
   eight validator scenarios were detected; two were not (see `MC17-IR-04/05`).
8. Probed the rendered catalogue at runtime for the family-limit copy, not just
   the source strings.

## 4. Commands and results (recorded)

| Command | Result | Exit |
|---|---|---:|
| `git merge-base --is-ancestor 6d8287c… HEAD` | ancestry true | 0 |
| `git diff --stat 6d8287c…HEAD` | 134 files, +39,486 / −7 | 0 |
| `git diff 6d8287c…HEAD -- src/app/app.routes.ts src/styles.scss src/app/layout src/app/features public src/server.ts src/index.html` | empty | 0 |
| `git status --porcelain` | 81 lines (dirty; see §2) | 0 |
| `node scripts/check-marea-design-system.mjs` (before `review-findings.json`) | 36/38; FAIL `MC17-35`, `MC17-36` | 1 |
| `node scripts/check-marea-design-system.mjs` (after `review-findings.json` and this document) | **37/38**; only `MC17-35` fails | 1 |
| `node --test --test-isolation=none scripts/check-marea-design-system.test.mjs scripts/check-marea-design-system-adversarial.test.mjs` | 27 tests, 27 pass, 0 fail | 0 |
| `npx tsc -p tsconfig.app.json --noEmit` | no diagnostics | 0 |
| `npx tsc -p preview/tsconfig.json --noEmit` | no diagnostics | 0 |
| `npm run format:check` | all matched files formatted (coverage gap `MC17-IR-10`) | 0 |
| `npm run build` | production build, 96 static routes prerendered | 0 |
| `node scripts/build-marea-design-system-baseline.mjs --check` | 35 watched files current at `6d8287c…` | 0 |
| `node scripts/build-marea-design-tokens.mjs --check` | 262 provenance rows across 4 modes, current | 0 |
| `node scripts/build-marea-design-system-fixtures.mjs --check` | 9 families, 26 editions, 6 bundles, 12 entitlements, current | 0 |
| `node scripts/build-marea-design-system-catalogue-data.mjs --check` | 49 registered components, current | 0 |
| `npx ng build marea-design-system-catalogue` | isolated catalogue build, exit 0 | 0 |
| `npx playwright test -c playwright.design-system.config.ts` | **28 passed**, 1 worker, 2.1 min, no flake | 0 |
| Independent contrast recomputation | 296 measurements, 0 failures, 0 mismatches; min text 4.71:1, min UI 3.07:1, min focus 5.55:1 | 0 |
| Adversarial mutation harness | 6/8 validator scenarios detected; adapter invariants 4/4 hold | 0 |
| Rendered-copy probe | 100/138 copy keys rendered; family-limit keys false | 0 |

`npm run test:e2e` was **not** run (the public-site suite is outside this review
and was reserved for the Lead). No `--update-snapshots` was used.

## 5. Claims checked

Status vocabulary: **VERIFIED** (directly evidenced), **PARTIAL** (some evidence is
present but a required part is missing or unproven), **NOT VERIFIED** (no evidence
supports the claim as stated), **BLOCKED** (cannot be evidenced without an external
unblock).

| # | Claim | Status | Evidence |
|---:|---|---|---|
| 1 | Branch is based on the verified MC-16 HEAD | VERIFIED | `git merge-base --is-ancestor` exit 0; `git log` |
| 2 | Forbidden public-surface paths are untouched | VERIFIED | empty diff for routes/styles/layout/features/public/server/index.html |
| 3 | Changes stay in the allowed areas | PARTIAL | all implementation paths are in scope, but `playwright.config.ts` gained a design-system `testIgnore` outside the listed areas (legitimate isolation, disclosed as `MC17-IR-11`) |
| 4 | Four visual modes, 33 colour roles per mode | VERIFIED | token source; generator `--check`; `color-roles.json` |
| 5 | Token/fixture/baseline/catalogue generators are deterministic | VERIFIED | all four `--check` commands exit 0 |
| 6 | Night mode has no `#000000` / `#ffffff` | VERIFIED | independent scan of all 33 night values; validator `MC17-03` |
| 7 | CSS is scoped to `marea-theme`, no `:root`/`html` override | VERIFIED | generated CSS selectors are `marea-theme` + three attribute blocks; no `:root`/`html` rule |
| 8 | Declared WCAG pairs pass in every mode | VERIFIED | independent recomputation: 296/296, 0 mismatches, min text 4.71:1 |
| 9 | 49 registry entries exist in real code (class, selector, inputs, outputs, marker) | VERIFIED | independent audit: 48 components + 1 directive, 131 inputs, 3 outputs, 0 missing; `marea-theme` uses the documented `data-marea-theme` exception |
| 10 | Every entry declares the 11 required states | VERIFIED (declaration) | registry 49×11; `component-states.json`; behavioural coverage is partial and tested for a subset only |
| 11 | No undocumented variants | PARTIAL | visual variants are documented, but validator `MC17-13` does not actually prove it (`MC17-IR-07`); registry `visualVariants` mixes live/mode/kind values |
| 12 | No payment/price/stock/purchase API | VERIFIED | type/input scan, registry audit, adapter invariants; no amount/quantity/checkout field |
| 13 | Commerce CTA contains no button/link | VERIFIED | `marea-commercial-cta` template; validator `MC17-17`; Playwright `commerce.spec.ts` |
| 14 | PILOT is presented as blocked | PARTIAL | copy and restriction mapping exist; the family card caps at four chips and drops the fifth (`SAFETY_GATE_BLOCKED`); the catalogue shows a separately composed permission notice (`MC17-IR-01`) |
| 15 | AIS is presented as receive-only | NOT VERIFIED | `aisReceiveOnly` copy exists but is never rendered; `FAMILY_LIMIT_KEYS.AIS` has no consumer (`MC17-IR-01`) |
| 16 | WATCH is presented as no-guaranteed-alerts | NOT VERIFIED | `watchNoGuarantee` copy exists but is never rendered (`MC17-IR-01`) |
| 17 | FLEET is presented as no default hardware | NOT VERIFIED | bundle flag is false and copy exists, but no component renders `fleetNoHardware` (`MC17-IR-01`) |
| 18 | SENSE-ESSENTIALS is not double counted | PARTIAL | fixture has `expandsTo` and `MareaBundleComponents` renders it as one line with an includes note, but the PROTECT bundle is not rendered and the explicit `senseEssentialsKit` copy is unused |
| 19 | DISPLAY invents no dimensions | PARTIAL | MC-16 data has no dimensions and the copy forbids invention, but `displayConditional` is never rendered (`MC17-IR-01`) |
| 20 | NAV/WEATHER do not present unlicensed data as included | PARTIAL | restriction mapping exists, but the licensing chip is dropped by the four-chip cap and `navWeatherLicensing` is not visible in the rendered catalogue |
| 21 | Shared entitlement ledgers are presented once per ledger | VERIFIED | `MareaEntitlementSummary` groups by `sharedLedgerKey` (Map); fixture has WATCH + CLOUD on `ACCOUNT:WATCH_MONITORING`; rendered shared note present |
| 22 | ES/EN dictionary is complete (138 keys, non-empty) | VERIFIED | unit test + validator `MC17-25`; no empty side |
| 23 | No locale-specific duplicate component/entity | VERIFIED | no `.en.ts`/`.es.ts` files; 26 edition ids |
| 24 | Validator passes all checks | PARTIAL | 37/38; `MC17-35` fails for two Lead-owned documents; the validator also has the `MC17-13`/`15`/`08` gaps |
| 25 | Unit and adversarial suites pass | VERIFIED | 27/27; the adversarial suite does not cover hidden focus or preview imports |
| 26 | Application and preview typecheck | VERIFIED | both `tsc --noEmit` exit 0 |
| 27 | Prettier check passes | VERIFIED | exit 0, but it does not cover the new source (`MC17-IR-10`) |
| 28 | Production build passes | VERIFIED | exit 0, 96 prerendered routes; no budget warning/error |
| 29 | Playwright design-system suite passes | VERIFIED | 28/28, no flake |
| 30 | Axe reports zero violations in four modes | VERIFIED (automated only) | four raw JSONs, 0 violations / 36 passes / 0 incomplete each, axe-core 4.11.4 |
| 31 | 26 visual baselines exist and compare | PARTIAL | 26 PNGs present and the suite passes without updating, but the baselines were generated with `--update-snapshots` and the ES/EN pair is byte-identical (`MC17-IR-06`) |
| 32 | No price/currency/stock/purchase wording or Product/Offer JSON-LD | VERIFIED | scan of source/preview/rendered text; only honest negations; no JSON-LD/microdata |
| 33 | No MAREA asset in `public/` | VERIFIED | 15 public files, 0 MAREA-named; baseline hashes pass |
| 34 | Proposed routes remain undeployed | VERIFIED | 23 proposed routes; `app.routes.ts` has no `marea`; no route/sitemap change |
| 35 | No merge/deploy/publication | VERIFIED (repository evidence) | one commit since base, no merge commit, no deploy-config diff; PR #23 state is inherited, not queried live |
| 36 | MC-18 has not started | VERIFIED | `mc18Started=false`, no MC-18 implementation files; only the handoff document/dataset exist |
| 37 | Production is isolated from the design system | VERIFIED | 5 entry files free of `marea`; 168-file production bundle scan finds none; production styles still exactly `["src/styles.scss"]` |
| 38 | Brand/governance status is unchanged | VERIFIED | `INTERNAL_PROPOSED` / `NOT_ADOPTED` / public use `NO_GO`; no trademark or publication claim |
| 39 | The reviewed implementation is committed | NOT VERIFIED | HEAD is missing the reviewed validator/docs/datasets/baselines/rename and tracks `.tmp/` (`MC17-IR-02`) |
| 40 | Deliverables are internally consistent with current evidence | PARTIAL | several documents still assert 33/38, one axe violation, missing performance/visual evidence and the removed `fieldSequence` defect (`MC17-IR-03`) |
| 41 | WCAG 2.2 AA conformance | NOT VERIFIED — no claim exists | no assistive-technology audit, no manual audit, no rendered-pixel contrast; axe is partial automation |

## 6. Findings

The full machine-readable record is `docs/marea/design-system/data/review-findings.json`.
Summary (2 MAJOR, 6 MINOR, 3 INFORMATIONAL, 0 BLOCKING):

### MAJOR

**MC17-IR-01 — Family limits are defined but not presented.** `FAMILY_LIMIT_KEYS`
(`commerce-presentation.adapter.ts:96`) has no consumer. `MareaFamilyCard`
(`marea-family-card.ts:95-104`) caps restriction chips at four and the fixture puts
the family-specific restriction fifth, so PILOT drops `SAFETY_GATE_BLOCKED`, AIS/
NAV/WEATHER/FLEET drop `LICENSING_NOT_CLEARED`, and SENSE/WATCH drop
`COMPATIBILITY_UNTESTED`. A runtime probe of the built catalogue rendered 100/138
copy keys and found `aisReceiveOnly`, `watchNoGuarantee`, `fleetNoHardware`,
`senseEssentialsKit`, `displayConditional` and `navWeatherLicensing` all absent.
D10 and D15 explicitly claim these are rendered through `MareaFamilyCard` and
`FAMILY_LIMIT_KEYS`; that claim is false. Validator `MC17-20`/`MC17-23` only search
fixture/copy strings and therefore PASS. Required correction: bind the family-limit
copy to a rendered surface, order the chips so a safety/licensing restriction is
never dropped, add per-family e2e assertions, and correct D10/D15.

**MC17-IR-02 — The reviewed state is not committed.** HEAD `3a8d4fd` has a
563-line validator versus 964 in the worktree, no performance/responsive/visual
datasets or baselines, no six reviewed documents and the old CTA name. The commit
also tracks 14 `.tmp/` scratch files. The worktree stages their deletion and
ignores `/.tmp/`, but that is uncommitted. Required correction: commit the actual
reviewed tree excluding `.tmp/`, then re-run the full gate at that SHA.

### MINOR

- **MC17-IR-03 — Stale/contradictory deliverables.** D08:127/242 (removed
  `fieldSequence` defect), D11:242/246 (33/38, one axe violation), D15:69/208,
  D18:149/156/158/159, D19:23/33/269/271/272 (33/38, one axe violation, missing
  performance/visual evidence) and `accessibility-requirements.json:20` all
  contradict the current tree (37/38, 0 axe violations, evidence present,
  `MareaIds` injected).
- **MC17-IR-04 — Hidden focus outline not detected.** `MC17-15` checks only the
  presence of `:focus-visible`; a mutated `outline: none` passes.
- **MC17-IR-05 — Preview import not detected.** `MC17-08` (and the SSR-contract
  spec) search only for `marea`; `import '../preview/main'` passes.
- **MC17-IR-06 — Visual baselines are self-generated.** The recorded generation
  command used `--update-snapshots`, the commit SHA is null, and the ES/EN
  baselines are byte-identical (same 77,260-byte image).
- **MC17-IR-07 — `MC17-13` does not prove variant coverage.** It ignores aliased
  enums/defaults and prints a dead arithmetic expression; `visualVariants` mixes
  live/mode/kind values.
- **MC17-IR-08 — MC-17 governance is not recorded.** Registry row 17 is still
  `PLANNED`; no DECISION-LOG entry authorises MC-17; the MC-16 handoff still says
  `MC17_STARTED=false`.

### INFORMATIONAL

- **MC17-IR-09 — Performance evidence is author-reported.** The reviewer did not
  re-run `test:performance`; current build sizes match the recorded values
  (168 / 3,032,047 bytes versus 3,032,053) and the production dist contains no
  design-system identifier.
- **MC17-IR-10 — `format:check` coverage gap.** It does not include
  `src/app/marea-design-system/**`, `preview/**` or
  `playwright.design-system.config.ts`.
- **MC17-IR-11 — The tree moved during the audit.** The CTA rename and public
  Playwright `testIgnore` landed at 03:31:53; all gates were re-run afterwards.
  Freeze the tree before the final gate and commit the exact tested SHA.

## 7. What zero axe violations means — and does not mean

**Zero axe violations is not WCAG conformance.** The four `axe-*.json` files show
0 violations, 36 passes, 0 incomplete and 26 inapplicable per mode with axe-core
4.11.4 and the tag set `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa`. That is
automated rule coverage of one DOM state per mode in Chromium, with the `region`
rule disabled for the internal catalogue. It does not test screen readers,
assistive technology, reading order, cognitive load, every interactive state,
browser zoom beyond the scripted widths, other engines, real devices or rendered
pixel contrast. No WCAG conformance, certification or approval is claimed for the
design system or the catalogue.

## 8. Residual risks and explicit non-claims

- No assistive-technology or manual accessibility audit exists; no hardware
  daylight/night-vision validation exists; no cross-browser or real-device
  visual evidence exists.
- The visual baselines are Chromium/Windows-specific and were generated from this
  implementation; they are a future comparison aid, not an independent approval.
- Hydration is argued from static determinism, not measured server/client
  hydration; the design system is not rendered through the production SSR server.
- The performance measurement is one laboratory run; it is not field data and
  enforces no budget.
- The 49-entry registry is an internal contract; it is not a public API.
- The design system remains absent from the production application: no route,
  asset, global style, metadata or bundle import.

**No claim is made of:** WCAG 2.2 AA conformance or certification, trademark
clearance, MAREA brand adoption or public use, hardware readability, night-vision
performance, AIS transmission, CE marking, NMEA 2000 certification, tested
third-party compatibility, price approval, verified stock, commercial
availability, publication, deployment, merge or MC-18 execution.

`MC16_VERDICT = PARTIAL` is unchanged. MC-05/MC-16 governance flags remain as
inherited: `TRADEMARK_LEGAL_CLEARANCE=NOT_GRANTED`, `MAREA_PUBLIC_USE=NO_GO`,
`FINAL_IDENTITY_ADOPTION=BLOCKED`, `PUBLICATION_AUTHORIZED=false`,
`PRODUCTION_DEPLOYMENT=NOT_AUTHORIZED`, `PRICE_APPROVED=NONE`,
`COMMERCIAL_AVAILABILITY=NOT_FOR_SALE`, `PILOT_SAFETY_GATE=BLOCKED`,
`AIS_TRANSMISSION_OFFERED=false`, `FLEET_DEFAULT_HARDWARE=false`,
`TESTED_COMPATIBILITY_ROWS=0`, `MC18_STARTED=false`.

## 9. Verdict

The internal implementation is substantial and much of it is directly verified:
the token layer is deterministic, the contrast evidence is reproducible, the 49
entry registry matches real code, the production application is genuinely
isolated, the fail-closed commercial adapter holds under hostile inputs, the
production build and typechecks pass, and the 28-test Playwright suite passes with
zero automated axe violations. Those are real results, not summary claims.

They are not enough for a PASS. Two MAJOR findings remain: the required
family-specific limitations are not presented at runtime, and the reviewed state
is not committed (the commit still contains `.tmp/` scratch and lacks the reviewed
evidence). Several evidence-quality defects also remain. The correct outcome is
therefore PARTIAL, not PASS, and not FAIL for the internal scope: the remaining
work is identifiable and closeable, and no public or commercial capability is
authorised.

```text
MC17_INDEPENDENT_REVIEW = PARTIAL
MC17_VERDICT_RECOMMENDATION = PARTIAL — close MC17-IR-01 and MC17-IR-02, correct the stale deliverables (MC17-IR-03), freeze and commit the exact reviewed SHA, re-run the full gate, then re-audit; no merge, deploy, publication or brand adoption is authorised.
```

## Appendix A — reproducibility

Scratch scripts (gitignored; not part of the deliverable set):

- `.tmp/audit/contrast-recompute.mjs` — independent WCAG 2.x recomputation;
  prints declared pairs, measurements, mismatches and nearest thresholds.
- `.tmp/audit/registry-audit2.mjs` — independent 49-entry implementation audit.
- `.tmp/audit/make-harness.mjs` + `.tmp/audit/run-adversarial.mjs` — I/O overlay
  around the real validator; output in `.tmp/audit/adversarial-report-2.json`.
- `.tmp/audit/rendered-copy.mjs` — browser probe of the 138 bilingual copy keys.
- `.tmp/audit/inspect-snapshots.py` + `.tmp/audit/contact-sheet.png` — snapshot
  inventory, mean-colour sanity check and visual inspection sheet.

Core reproduction commands:

```text
git merge-base --is-ancestor 6d8287c8507038c4f90fd6e35471f78081ca4676 HEAD
git diff --stat 6d8287c8507038c4f90fd6e35471f78081ca4676..HEAD
git status --porcelain
node scripts/check-marea-design-system.mjs
node --test --test-isolation=none scripts/check-marea-design-system.test.mjs scripts/check-marea-design-system-adversarial.test.mjs
npx tsc -p tsconfig.app.json --noEmit
npx tsc -p preview/tsconfig.json --noEmit
npm run format:check
npm run build
npx ng build marea-design-system-catalogue
node scripts/build-marea-design-system-baseline.mjs --check
node scripts/build-marea-design-tokens.mjs --check
node scripts/build-marea-design-system-fixtures.mjs --check
node scripts/build-marea-design-system-catalogue-data.mjs --check
npx playwright test -c playwright.design-system.config.ts
```

## Appendix B — observed inventory

| Item | Observed value |
|---|---:|
| Design-system TypeScript files | 56 |
| Design-system TypeScript lines | 6,369 |
| Registry entries | 49 (48 components + 1 directive) |
| Declared inputs / outputs | 131 / 3 |
| `ChangeDetectionStrategy.OnPush` declarations | 48 |
| Components with `data-marea-component` | 48 (theme uses `data-marea-theme`, documented) |
| Colour roles / modes | 33 / 4 |
| Contrast measurements | 296 |
| Design-system docs present | 21 Markdown + 20 datasets |
| Playwright tests | 28 (6 spec files) |
| Visual baselines | 26 PNG (4 galleries × 4 modes + 8 mobile + 2 locale) |
| Axe raw files | 4 (0 violations each, 36 passes each) |
| Production build | 168 files / 3,032,047 bytes |
| Catalogue build | 60 files / 4,551,110 bytes |

The review is a snapshot of the dirty working tree described in §2; any later
write requires the final gate to be run again at the committed SHA.
