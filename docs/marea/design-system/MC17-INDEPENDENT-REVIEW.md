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

## 10. Correction-round re-review (independent)

This section re-audits the Lead's correction round on top of the record above. The
original review (§§1–9) is retained unchanged; the two deliverables of this round are
this section and the updated `data/review-findings.json`. The reviewer is still not the
author, did not run a git write command and did not edit implementation, tests, preview,
scripts, `package.json` or any other document. Scratch scripts live only under `.tmp/`
(gitignored). During the Playwright runs the suite rewrote
`evidence/axe-summary.json` (its `generatedAt` changes); the original bytes were restored
and the tree was verified clean afterwards.

**Post-gate drift (disclosed, not reviewed).** All gates below were run while the tree was
clean at `7cbc99e` (03:49–04:03 local). At **04:04:45**, after the gates and while this
section was being written, a concurrent workstream began modifying **15 tracked
implementation/doc/test files** (17 `git status` entries including this re-review's two
deliverables): `preview/catalogue/app/galleries/commerce.gallery.ts` adds AIS/WATCH/SENSE/DISPLAY family
cards; `e2e/design-system/visual.spec.ts` switches the locale pair to the commerce
gallery; `scripts/check-marea-design-system.mjs` is reformatted; several documents,
`blocker-register.json`, `mc18-handoff-inputs.json` and `ssr-contract.spec.ts` change).
Those edits are **uncommitted**, are **not** part of `7cbc99e` and are **not reviewed
here**; see `MC17-CR-03`. This re-review therefore applies to the frozen commit
`7cbc99e` only. The Lead must commit the follow-up work, freeze a new SHA, re-run the
full gate and ask for another re-audit; the verdict below is not transferable to that
new state.

| Field | Value |
|---|---|
| Re-reviewed commit | `7cbc99e1a1499f22ddc6053d661983e1d91f841b` (`7cbc99e`) |
| Prior reviewed state | `3a8d4fd` **plus a dirty working tree** (original review) |
| Base commit | `6d8287c8507038c4f90fd6e35471f78081ca4676` |
| Correction commit | one commit, `7cbc99e fix(mc17): close independent-audit findings, harden validator, freeze catalogue evidence`, 114 paths vs `3a8d4fd` |
| Working tree at re-review | **clean** during the gate window (03:49–04:03) — `git status --porcelain` empty and `git diff HEAD --quiet` exit 0. A concurrent workstream began editing 15 tracked implementation/doc/test files at 04:04:45, after the gates; those edits are uncommitted, unreviewed and not part of `7cbc99e` (`MC17-CR-03`). |
| Machine findings | `data/review-findings.json` updated with per-finding `finalStatus`/`independentReverification`, re-review metadata and three new findings (`MC17-CR-01`…`03`) |
| Verdict | **PARTIAL** — see §10.7 |

### 10.1 Frozen state and repository scope

- `git rev-parse HEAD` = `7cbc99e1a1499f22ddc6053d661983e1d91f841b`; branch
  `feature/marea-mc17-premium-design-system`.
- `git merge-base --is-ancestor 6d8287c8507038c4f90fd6e35471f78081ca4676 HEAD` exit **0**.
- `git ls-files .tmp` is **empty**, `git ls-tree -r --name-only HEAD .tmp` is **empty**,
  `git show HEAD:.gitignore` contains `/.tmp/`, and `git check-ignore -v .tmp/...` matches
  `.gitignore:62:/.tmp/`. The commit deletes the 14 previously tracked `.tmp/` files; no
  `.tmp/` path is added.
- HEAD contains **22 Markdown deliverables** (`D01`–`D22`, including the original
  `MC17-INDEPENDENT-REVIEW.md`), **20 datasets** under `data/`, the **26** visual
  baselines under `e2e/design-system/visual.spec.ts-snapshots/`, and the renamed
  `src/app/marea-design-system/components/commerce/marea-commercial-cta.ts`. The old
  `marea-commerce-cta.ts` path no longer exists.
- `MC17-SPANISH-EXECUTIVE-REPORT.md` (`D23`) and `MC17-FINAL-DELIVERY-RECORD.md` (`D24`)
  are **not** in HEAD: they are authored **after** this re-review. Consequently the
  validator is **37/38**, with the single failure `MC17-35` naming exactly those two
  documents; that failure is expected at this SHA and is not a correction-round defect.
  The Lead must add D23/D24 and re-run the validator before final sign-off.
- No public-surface change vs the base: `git diff --stat 6d8287c…HEAD -- src/app/app.routes.ts
  src/styles.scss src/index.html src/app/layout src/app/features src/app/core src/server.ts
  public` is empty; only `angular.json` (the isolated catalogue project) changed in that
  set. `src/app/app.routes.ts` has no `marea` token; `public/` still has 15 files and no
  MAREA-named asset. No deploy/publication config changed; no dependency was added
  (`package-lock.json` diff empty).
- `MC16_VERDICT = PARTIAL` is retained (`MC17-32` PASS and the MC-16 records unchanged);
  `MC-18` has not started (`MC17-33` PASS; only the handoff document/dataset mention it).

### 10.2 Gates re-run at `7cbc99e` (actual commands, actual exits)

| # | Command | Result | Exit |
|---:|---|---|---:|
| 1 | `git status --porcelain` / `git diff HEAD --quiet` | empty / no diff | 0 |
| 2 | `node scripts/check-marea-design-system.mjs` | **37/38**; only `MC17-35` fails (D23/D24 absent by design) | **1** |
| 3 | `node --test --test-isolation=none scripts/check-marea-design-system.test.mjs scripts/check-marea-design-system-adversarial.test.mjs` | 27 tests, 27 pass, 0 fail | 0 |
| 4 | `npx tsc -p tsconfig.app.json --noEmit` | no diagnostics | 0 |
| 5 | `npx tsc -p preview/tsconfig.json --noEmit` | no diagnostics | 0 |
| 6 | `npm run format:check` | **FAIL** — 2 files unformatted: `e2e/design-system/ssr-contract.spec.ts`, `scripts/check-marea-design-system.mjs` | **1** |
| 7 | `npm run build` | 96 static routes prerendered; 168 files / 3,032,030 bytes; no budget error | 0 |
| 8 | `node scripts/build-marea-design-tokens.mjs --check` | 262 provenance rows across 4 modes, current | 0 |
| 9 | `node scripts/build-marea-design-system-baseline.mjs --check` | 35 watched files current vs `6d8287c…` | 0 |
| 10 | `node scripts/build-marea-design-system-fixtures.mjs --check` | 9 families, 26 editions, 6 bundles, 12 entitlements, current | 0 |
| 11 | `node scripts/build-marea-design-system-catalogue-data.mjs --check` | 49 registered components, current | 0 |
| 12 | `npx ng build marea-design-system-catalogue` | catalogue build, exit 0 | 0 |
| 13 | `npx playwright test -c playwright.design-system.config.ts` (**no** `--update-snapshots`), run 1 | **29 passed**, 1 worker, 1.7 min | 0 |
| 14 | same command, run 2 (flake check) | **29 passed**, 1.7 min | 0 |
| 15 | Independent WCAG recomputation (`.tmp/audit/contrast-recompute.mjs`, no validator import) | 296/296 measurements, 0 failures, 0 mismatches; min text 4.71:1, min UI 3.07:1, min focus 5.55:1; night palette has no `#000000`/`#ffffff` | 0 |
| 16 | Adversarial mutation harness around the real validator (`.tmp/audit/make-harness.mjs` + `run-adversarial.mjs`) | **7/8 detected**; `i-preview-imported-by-production-entry` still **not** detected (`MC17-08` PASS); adapter invariants 4/4 hold | 0 |
| 17 | Rendered-copy DOM probe (`.tmp/review2/rendered-copy.mjs`) against the served `dist/marea-ds-catalogue` | **102/138** copy keys rendered (was 100/138); family limits see §10.3 | 0 |
| 18 | Locale-pair capture (`.tmp/review2/locale-pair.mjs`) | ES and EN screenshots **byte-identical** (`646348bb…`) and identical to both committed baselines | 0 |
| 19 | Production-entry import scan on a temp copy (`.tmp/review2/ir05-scan.mjs`) | new e2e-style scan catches `src/main.ts: ../preview/main`; validator `MC17-08` catches nothing | 0 |
| 20 | Rendered commerce scan (`.tmp/review2/commerce-scan.mjs`) | 0 JSON-LD, 0 Product/Offer microdata, 0 currency/amount; the only "purchase" words are the honest negations in `ctaComingSoon` | 0 |

`npm run test:e2e` was not re-run (Lead already ran it 15/15; it is the public-site
suite and outside this review). No `--update-snapshots` was used. No git write command
was run.

### 10.3 Per-finding closure at `7cbc99e`

| Finding | Severity | Status | Independent evidence |
|---|---|---|---|
| `MC17-IR-01` — family limits defined but not presented | MAJOR | **STILL OPEN** (partially corrected) | `FAMILY_LIMIT_KEYS` is now consumed by `MareaFamilyCard` (`marea-family-card.ts:10,98-102`; template `:52-54` renders `.family-limit`). The runtime probe shows the catalogue renders only **four** family cards (NAV, PILOT, FLEET and an adversarial PILOT), so only `pilotSupervised`, `fleetNoHardware` and `navWeatherLicensing` render (plus `localSafetyIndependent` in the entitlement summary). `aisReceiveOnly`, `watchNoGuarantee`, `senseEssentialsKit` and `displayConditional` are **still false** in the rendered DOM; the AIS/WATCH/SENSE/DISPLAY family cards are absent (`preview/catalogue/app/galleries/commerce.gallery.ts:128-135`), the PROTECT bundle is not rendered, and SENSE maps to `localSafetyIndependent`, not `senseEssentialsKit`. The required per-family e2e assertions were **not added** (`grep -rn "family-limit\|pilotSupervised\|aisReceiveOnly" e2e/design-system` finds only the selector in `commerce.spec.ts:99`), and the commerce baseline captures only the readiness panel, so the screenshot evidence does not show the new text. The original dropped-fifth-chip defect is corrected for the three rendered families because the family limit is a separate paragraph. |
| `MC17-IR-02` — reviewed state not committed | MAJOR | **CLOSED** | HEAD `7cbc99e`; tree clean (`git diff HEAD --quiet` 0); 22 docs, 20 datasets, 26 baselines and `marea-commercial-cta.ts` are in `git ls-tree`; the old CTA path is gone; `.tmp/` is absent from HEAD, untracked (`git ls-files .tmp` empty) and ignored (`.gitignore:62`); `git show HEAD:<path>` hashes equal the worktree for `scripts/check-marea-design-system.mjs`, `e2e/design-system/ssr-contract.spec.ts`, `marea-family-card.ts` and `review-findings.json`. |
| `MC17-IR-03` — stale/contradictory deliverables | MINOR | **STILL OPEN** (remediation itself corrupted) | The correction replaced stale numbers with the literal phrase `38/38 (current; earlier snapshots superseded)` in at least 13 places, producing self-contradictory statements such as `FAIL (38/38 (current; earlier snapshots superseded))` (`MC17-COMMERCIAL-CTA-AND-READINESS-POLICY.md:242`; `MC17-BILINGUAL-PRESENTATION-CONTRACT.md:69,208`; `MC17-LEGACY-UI-NON-REGRESSION.md:196,207`; `MC17-MC18-HANDOFF.md:23,33,269`; `MC17-PRODUCT-EDITION-BUNDLE-PRESENTATION.md:159`; `MC17-RISKS-AND-UNRESOLVED-GAPS.md:156`; `blocker-register.json:12,188`; `mc18-handoff-inputs.json:17,230`). The stale axe claim `1 color-contrast` survives in `MC17-INTERNAL-COMPONENT-CATALOGUE.md:157`, `MC17-RISKS-AND-UNRESOLVED-GAPS.md:149`, `MC17-BILINGUAL-PRESENTATION-CONTRACT.md:208-209` and `commerce-presentation-policy.json:13` although the committed axe summary is 0 violations in all four modes. `MC17-COMMERCIAL-CTA-AND-READINESS-POLICY.md:248` says the independent review “does not exist yet (PENDING)” though D22 is committed; `MC17-MC18-HANDOFF.md:216,272,273` still say performance evidence is missing and that there are no screenshots/baselines and no independent review; `MC17-ANGULAR-COMPONENT-ARCHITECTURE.md:127,241` contain malformed text (“`let per-render `MareaIds` counter …”) and contradict the current implementation; `MC17-COMPONENT-API-AND-STATE-CONTRACTS.md:256` still lists `fieldSequence` as **OPEN** although the file injects `MareaIds`; `accessibility-requirements.json:20` still describes the pre-correction axe state. |
| `MC17-IR-04` — hidden focus outline not detected | MINOR | **CLOSED** | Mutation harness scenario `d-hidden-focus-outline` (replace `marea-link`'s focus rule with `:host(:focus-visible) { outline: none; }`) now yields `MC17-15` **FAIL** (`detected: true`). The check adds `/:focus-visible[\s\S]{0,400}--marea-focus-ring/` (`scripts/check-marea-design-system.mjs:433`). Residual limitation recorded: the check stays textual and there is still no per-component computed-style Playwright assertion in all four modes (the accessibility spec checks the first button/link in web-light and instrument-night only). |
| `MC17-IR-05` — preview import not detected | MINOR | **STILL OPEN** (mitigated by a new e2e test) | `MC17-08` is unchanged: `offenders = files.filter((file) => /marea/i.test(read(file)))` (`scripts/check-marea-design-system.mjs:269-281`). The mutation `import '../preview/main';` appended to `src/main.ts` still yields `MC17-08` **PASS** (`detected: false`). A new e2e test, `ssr-contract.spec.ts:248-259`, scans import specifiers with `/marea|preview\//i`; my temp-copy run shows it **does** catch `src/main.ts: ../preview/main`, so the isolation risk is mitigated in the Playwright suite, but the named validator check remains blind. |
| `MC17-IR-06` — self-generated baselines / locale pair | MINOR | **STILL OPEN** (partially corrected) | The 26 baselines are now committed at the frozen SHA and two consecutive non-update runs pass 29/29, so they correspond to the current markup within `maxDiffPixelRatio: 0.002`. But the ES and EN baselines are still **byte-identical** (`foundation-1440x900-web-light-locale-es/en-chromium-win32.png`, SHA-256 `646348bb…`, 77,260 bytes each); my fresh ES and EN screenshots are identical to each other and to both baselines, because the differing localized copy is below the captured first viewport (foundation `innerText` changes only at lines 516+, 928+). The pair therefore still does not discriminate locale rendering. `visual-regression-evidence.json` still records `totalTestsAcrossSuite: 28` (the suite is 29), the generation command with `--update-snapshots` (`:16`), `commitSha: null` (`:336`) and the “not self-validating” caveat (`:17,345,353`). |
| `MC17-IR-07` — `MC17-13` variant coverage | MINOR | **STILL OPEN** (partially corrected) | Double-quoted literals are now extracted (`/'([^']+)'|"([^"]+)"/g`, `scripts/check-marea-design-system.mjs:379`), which is the specific item named in the task. But the check still ignores aliased enums/default values, the detail string still prints an empty count (`:388`, observed output: “39 option values and  variants documented”), and no real double-quoted enum input exists to exercise the new branch. `visualVariants` normalisation is unchanged, so the original evidence-quality defect is only partly addressed. |
| `MC17-IR-08` — MC-17 governance not recorded | MINOR | **STILL OPEN** | `docs/marea/execution/MASTER-PROMPT-REGISTRY.md:63` row 17 is still `PLANNED`; `DECISION-LOG.md` still has only D-068–D-070 (MC-16) and no MC-17 authorization entry; `docs/marea/commerce-data/MC16-MC17-HANDOFF.md:10` still says `MC17_STARTED=false`; `mc18-handoff-inputs.json:40,43,44` still record `FAIL_31_OF_38_AT_AUTHORING_TIME`, `mc17IndependentReview: PENDING` and “no independent review exists”. The correction commit does not touch `docs/marea/execution/**`. |
| `MC17-IR-09` — author-reported performance evidence | INFORMATIONAL | **ACCEPTED LIMITATION** | Not re-measured. Current production build is 168 files / 3,032,030 bytes (recorded 3,032,047) and the production dist contains 0 design-system identifiers; the evidence remains laboratory-only and non-CI. |
| `MC17-IR-10` — `format:check` coverage gap | INFORMATIONAL | **STILL OPEN** | `package.json:25` still globs only `e2e`, `playwright.config.ts` and the enumerated scripts; `src/app/marea-design-system/**`, `preview/**` and `playwright.design-system.config.ts` remain outside the check, and no document records the limitation. Worse, the check is now **red** (see `MC17-CR-01`). |
| `MC17-IR-11` — tree moved during the audit | INFORMATIONAL | **CLOSED** | The reviewed state is a single frozen commit (`7cbc99e`), the tree was clean while every gate ran (03:49–04:03), and the only suite-written tracked file (`evidence/axe-summary.json`) was byte-restored. The tree moved again at 04:04:45, **after** the gates, by a concurrent workstream; that recurrence is recorded separately as `MC17-CR-03`, not as an IR-11 failure. |
| `MC17-CR-01` (new) — `format:check` now fails | MINOR | **OPEN** | `npm run format:check` exits **1** on two files edited by the correction commit: `e2e/design-system/ssr-contract.spec.ts` (25 insertions/19 deletions vs Prettier) and `scripts/check-marea-design-system.mjs` (12/6). This gate was green in the original review. Fix with `npm run format` (or equivalent) and commit; re-run the check. |
| `MC17-CR-02` (new) — correction edits corrupted documents | MINOR | **OPEN** | The global replacement described in `MC17-IR-03` is a new documentation defect, not just stale text: `FAIL (38/38 …)` is internally contradictory, the D08 sentence at `MC17-ANGULAR-COMPONENT-ARCHITECTURE.md:127` is malformed (“`let per-render `MareaIds` counter …”) and the D08 limitation at `:241` is an incomplete sentence. Restore accurate wording (validator 37/38 at this SHA; axe 0/0/0/0; `MareaIds` injected; review D22 committed) rather than another blind replacement. |
| `MC17-CR-03` (new) — the tree moved again after the gates | INFORMATIONAL | **OPEN** | At 04:04:45 local, after all gate runs, another workstream modified 15 tracked implementation/doc/test paths (`commerce.gallery.ts` adds AIS/WATCH/SENSE/DISPLAY family cards; `visual.spec.ts` switches the locale pair to the commerce gallery; the validator is reformatted; `ssr-contract.spec.ts`, several documents, `blocker-register.json` and `mc18-handoff-inputs.json` change). `git status --porcelain` was clean at 03:49–04:03 and no longer is. Those edits are uncommitted, are not in `7cbc99e`, and have **not** been reviewed or credited; the in-progress changes appear aimed at `MC17-IR-01`, `IR-03`, `IR-06` and `CR-01` but cannot be scored without a commit, frozen SHA and fresh gate/evidence run. |

### 10.4 What the correction did achieve

- The reviewed tree is now reproducible from a single commit; `.tmp/` is gone and
  ignored; the renamed CTA, the 26 baselines, 20 datasets and D01–D22 are committed.
- `MareaFamilyCard` renders a dedicated family-limit line; the three families shown in
  the catalogue (NAV, PILOT, FLEET) now visibly state their licensing, supervised-pilot
  and no-default-hardware limits at runtime (verified by DOM probe, not by copy strings).
- The validator now rejects the concrete hidden-focus mutation (`outline: none`), and a
  new e2e test closes the `../preview/main` hole at the Playwright layer.
- All deterministic generators, both typechecks, the production build (96 routes) and the
  29-test Playwright suite pass; the baselines compare in a non-update run; independent
  WCAG recomputation still matches the evidence exactly (296/296, 0 mismatches).
- No price/stock/purchase/JSON-LD/public asset/route/publication/brand-adoption or MC-18
  violation was found; `MC16_VERDICT = PARTIAL` is retained.

### 10.5 New findings

Three are recorded in full in `data/review-findings.json`:

- **`MC17-CR-01` (MINOR)** — `npm run format:check` fails (exit 1) on
  `e2e/design-system/ssr-contract.spec.ts` and `scripts/check-marea-design-system.mjs`,
  both edited by the correction commit. The check was green before this round.
- **`MC17-CR-02` (MINOR)** — the correction-round documentation edits are corrupted:
  a global replacement produced the contradictory phrase
  `38/38 (current; earlier snapshots superseded)` and malformed sentences in D08. This is
  a regressed remediation of `MC17-IR-03`, not an acceptable wording change.
- **`MC17-CR-03` (INFORMATIONAL)** — the tree moved again at 04:04:45, after the gates:
  a concurrent workstream modified 15 tracked implementation/doc/test paths (`commerce.gallery.ts` adds the
  AIS/WATCH/SENSE/DISPLAY family cards; `visual.spec.ts` points the locale pair at the
  commerce gallery; the validator and `ssr-contract.spec.ts` are edited; several
  documents, `blocker-register.json` and `mc18-handoff-inputs.json` change). Those edits
  are uncommitted, are not in `7cbc99e` and are **not reviewed**; they cannot be credited
  to `MC17-IR-01`/`IR-03`/`IR-06`/`CR-01` until they are committed at a frozen SHA and
  re-evidenced.

### 10.6 Residual risks and explicit non-claims

- The catalogue renders only three of the nine family cards, so the AIS, WATCH, SENSE and
  DISPLAY family limitations have no rendered catalogue evidence even though the component
  now supports them; the validator `MC17-20`/`MC17-23` remain fixture/copy searches.
- The visual baselines are Chromium/Windows-specific, were captured from this
  implementation and are not an independent approval; the ES/EN pair is not
  locale-discriminating.
- The hidden-focus check is a static string heuristic, not a computed-style test; the
  Playwright focus test covers buttons/links in two modes, not every keyboard-operable
  component in all four modes.
- The production-entry import guard is enforced only by the design-system Playwright
  suite, not by the validator.
- No assistive-technology, real-hardware, cross-browser or manual WCAG audit exists; the
  axe result (0 violations / 36 passes / 0 incomplete per mode, axe-core 4.11.4) is
  automated evidence only. Hydration is argued from static determinism, not measured.
- The post-gate follow-up tree is unreviewed. At 04:04:45 another workstream started
  changing the gallery, visual spec, validator, ssr-contract spec and documents; those
  edits may fix several findings but carry no committed SHA, no fresh gate output and no
  re-audit. They are outside this review and must not be merged as if approved.

**No claim is made of:** WCAG 2.2 AA conformance or certification, trademark clearance,
MAREA brand adoption or public use, hardware readability, night-vision performance, AIS
transmission, CE marking, NMEA 2000 certification, tested third-party compatibility,
price approval, verified stock, commercial availability, publication, deployment, merge
or MC-18 execution. D23/D24 do not exist at this commit; the validator is 37/38 until the
Lead authors them and re-runs the gate.

### 10.7 Re-review verdict

The correction round closed the committed-state MAJOR (`MC17-IR-02`) and materially
improved the family-limit presentation for the three families the catalogue shows, but it
did **not** close the presentation MAJOR (`MC17-IR-01`): four required family-limit keys
still have no rendered catalogue surface, there are still no per-family e2e assertions,
and the screenshot evidence does not show the family cards. The stale-deliverable
remediation (`MC17-IR-03`) actually introduced contradictory, corrupted wording, and
`MC17-IR-05`, `IR-06`, `IR-07`, `IR-08` and `IR-10` also remain open. A previously green
required gate (`npm run format:check`) is now red. None of the open findings is BLOCKING
in the sense of external clearance, and no public/commercial capability is authorised, so
the correct outcome is **PARTIAL**, with a required follow-up correction, not PASS and not
FAIL. The post-gate follow-up tree (`MC17-CR-03`) is uncommitted and unreviewed: it may
close some of these items, but it has no frozen SHA, no fresh gate output and no re-audit,
so it cannot change this verdict.

```text
MC17_INDEPENDENT_REVIEW = PARTIAL
MC17_VERDICT_RECOMMENDATION = PARTIAL — before MC-17 can be considered internally complete: (1) render AIS/WATCH/SENSE/DISPLAY family limits in the catalogue AND add per-family e2e assertions (IR-01); (2) repair the corrupted stale claims and add D23/D24, then re-run the validator to 38/38 (IR-03, CR-02); (3) fix the validator MC17-08 preview-import scan and the MC17-13 alias/detail gaps (IR-05, IR-07); (4) regenerate an ES/EN pair that actually differs or document the limitation (IR-06); (5) record MC-17 governance (IR-08); (6) run `npm run format` and re-run `format:check` (CR-01/IR-10); (7) commit the post-gate follow-up, freeze a new SHA, re-run the full gate and obtain another independent re-audit (CR-03). No merge, deploy, publication, brand adoption or conformance claim is authorised by this review.
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

This table is the inventory of the **original review state** (`3a8d4fd` plus a dirty
tree). The correction-round inventory at `7cbc99e` is in §10: 22 Markdown deliverables,
20 datasets, 26 baselines, 29 Playwright tests and a 168-file / 3,032,030-byte
production build.

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
write requires the final gate to be run again at the committed SHA. For the
correction-round re-review at `7cbc99e`, see §10.

## 11. Third-round independent audit (Stage A) and correction re-verification (Stage C)

This section is append-only. Sections 1–10 are the historical record of the first
two audits and are not rewritten. The reviewer remains independent of the
implementation: the correction commit was authored by implementation agents and
the Lead (git owner), not by this reviewer. The reviewer personally re-read the
changed source, tests, scripts and documents and re-ran every gate below.

### 11.1 Frozen states

| Field | Value |
|---|---|
| First third-round candidate (Stage A) | `4a9043b98144c0ad4313728642321cd3752f5ccf` |
| Correction commit (Stage C candidate) | `f2c9ec2ea07f90154cbb91cae36e4a7681b5e27d` |
| Base commit | `6d8287c8507038c4f90fd6e35471f78081ca4676` (MC-16 HEAD) |
| Branch | `feature/marea-mc17-premium-design-system` |
| PR #24 | OPEN / DRAFT / MERGEABLE / `mergedAt=null`; base `feature/marea-mc16-commerce-product-data-model` |
| Ancestry | `git merge-base --is-ancestor 6d8287c… 4a9043b…` and `…f2c9ec2…` exit 0 |
| Worktree | clean at both audited SHAs; `git status --porcelain` empty and `git diff HEAD --quiet` exit 0 |
| Diff 7cbc99e..4a9043b | 34 paths (docs, e2e specs, gallery, validator, 8 PNGs); family card and adapter unchanged from 7cbc99e |
| Diff 4a9043b..f2c9ec2 | 85 paths (implementation, tests, validator+guards, format, docs, 3 PNGs deleted, 2 refreshed) |

The Stage A candidate was not accepted. It still rendered only seven of the nine
family cards, its family e2e test searched `document.body.innerText`, and the
validator still missed aliased/transitive imports and aliased/enum variant values.
Stage A therefore recorded `NEEDS_REVISION` with 1 MAJOR, 7 MINOR/INFORMATIONAL
and 0 BLOCKING findings.

### 11.2 Method

1. Read the actual source (`marea-family-card.ts`, `commerce-presentation.adapter.ts`,
   `core/i18n.ts`, `core/ids.ts`), all galleries, all design-system e2e specs, the
   validator and its unit/adversarial suites, `package.json`/`angular.json` and
   D01–D24 plus the 20 datasets. No delivery summary was accepted as evidence.
2. Ran every required gate at 4a9043b and again at f2c9ec2, recording real exit codes.
3. Rendered the built catalogue and probed each family card independently in ES and
   EN (`.tmp/audit3/family-probe.mjs`), scoped per card rather than per document.
4. Built an I/O-overlay mutation harness around the real validator
   (`.tmp/audit3/mutation-harness.mjs`): literal/re-export/dynamic/aliased/transitive
   preview imports, aliased union and enum variants, hidden and transparent focus
   rings.
5. Re-ran the Playwright suite WITHOUT `--update-snapshots`; reviewed every changed
   baseline against its previous image and computed pixel-difference statistics.
6. Re-ran the public-site suite, inherited validators, production build, both
   typechecks, the four deterministic generators and `npm audit`.
7. Verified the production bundle contains no design-system or catalogue code and
   that the 35 watched legacy files and 15 public assets are unchanged.

### 11.3 Stage A findings reproduced at 4a9043b

| Finding | Severity | Stage A status | Reproduction evidence |
|---|---|---|---|
| MC17-IR-01 family limits | MAJOR | STILL OPEN | DOM probe: only 7 `marea-family-card` (NAV, PILOT, FLEET, AIS, WATCH, SENSE, DISPLAY); WEATHER and HUB absent; `FAMILY_LIMIT_KEYS` had no HUB; `senseEssentialsKit` never rendered; all seven cards displayed the same four generic chips while the material restriction was fifth; the e2e test `every family-specific limit is rendered by a family card` searched `document.body.innerText` in ES only. |
| MC17-IR-02 committed state | MAJOR | CLOSED | HEAD 4a9043b, clean tree, `.tmp/` absent and ignored, 24 docs/20 datasets/26 test-relevant PNGs committed. |
| MC17-IR-03 stale docs | MINOR | STILL OPEN | Contradictory `FAIL (historical snapshot; the current committed run is 38/38)`, `PENDING` review, `0 violations in 3 modes`, `performance-evidence.json is missing`, `no responsive screenshots or baselines`, malformed D08 `MareaIds` sentences, D09 `fieldSequence OPEN`. |
| MC17-IR-04 hidden focus | MINOR | CLOSED | Mutation `outline: none` detected by MC17-15. |
| MC17-IR-05 import isolation | MINOR | STILL OPEN | Mutation `@catalogue/*` → `preview/*` with `import '@catalogue/main'` passed; transitive bridge `src/main.ts` → `./preview-bridge` → `../preview/main` passed; validator MC17-08 only matched `marea`/`preview/` substrings. |
| MC17-IR-06 visual provenance | MINOR | STILL OPEN | 28 PNG files on disk while evidence claimed 26; 2 orphaned foundation locale captures byte-identical to foundation web-light; provenance still used a placeholder SHA and the update-snapshots caveat; the new commerce ES/EN pair did differ (`27132adf…` vs `a57f0370…`). |
| MC17-IR-07 variant coverage | MINOR | STILL OPEN | Mutations with `type UndocumentedVariant = 'bogus'` and `enum BadgeTone { bogus = 'bogus' }` passed MC17-13; detail printed `39 option values and  variants documented`. |
| MC17-IR-08 governance | MINOR | PARTIAL | Registry row 17 had prose but not both exact constants; `mc18-handoff-inputs.json` still said `PENDING`/`FAIL_35_OF_38`; D-071/D-072 existed. |
| MC17-IR-09 performance | INFORMATIONAL | ACCEPTED LIMITATION | Single laboratory run; production bytes re-measured; no field/RUM data. |
| MC17-IR-10 format coverage | INFORMATIONAL | STILL OPEN | `format:check` globbed only `e2e`, `playwright.config.ts` and enumerated scripts; design-system source, preview and `playwright.design-system.config.ts` excluded. |
| MC17-IR-11 moving tree | INFORMATIONAL | CLOSED | Clean frozen commit at 4a9043b. |
| MC17-CR-01 format red | MINOR | CLOSED | `npm run format:check` exit 0 at 4a9043b. |
| MC17-CR-02 corrupted docs | MINOR | OPEN | Same corrupted sentences as IR-03 remained at 4a9043b. |
| MC17-CR-03 post-gate drift | INFORMATIONAL | CLOSED | Follow-up work committed at 4a9043b; clean tree. |
| MC17-IR-12 (new) transparent focus | MINOR | OPEN | A focus rule referencing `--marea-focus-ring` and then setting `outline-color: transparent` or `outline: none` still passed the MC17-15 heuristic. |
| MC17-IR-13 (new) orphan baselines | MINOR | OPEN | 28 committed PNGs vs 26 recorded; two unreferenced foundation locale captures. |

### 11.4 Correction commit f2c9ec2 (authored by implementers, verified here)

- **Family presentation (IR-01):** `FAMILY_LIMIT_KEYS` covers all nine families
  (HUB → `compatibilityUnverified`); `selectVisibleRestrictions()` orders
  SAFETY → LICENSING → COMPATIBILITY → trademark/brand → price → stock →
  publication, deduplicates by copy key and applies the four-chip cap AFTER
  prioritisation, is null-safe and falls back to `permission` for unknown kinds;
  the card renders a family limit and an optional SENSE kit note; the gallery
  renders nine family cards with stable `data-testid`s, the PROTECT bundle with the
  `SENSE-POWER, SENSE-BILGE` expansion, and six adversarial family specimens
  (safety first, safety fifth, duplicates, missing array, unknown kind, dual
  blocking); `commerce.spec.ts` now asserts, in ES and EN, each family's exact
  limit and material chip inside that family's own card plus all six adversarial
  cases.
- **Isolation (IR-05):** a shared AST resolver (`scripts/marea-design-system-guards.mjs`)
  now follows static imports, re-exports, dynamic imports and local transitive
  modules from the five production entries, resolving tsconfig `paths`/`baseUrl`
  aliases (JSONC) and falling back to a literal check. The validator and the
  Playwright SSR-contract test use the same resolver.
- **Variants (IR-07):** MC17-13 is now a TypeScript-compiler-based comparison of
  every option-like input's resolved value set (aliases, imported aliases, enums,
  default values, literal unions) against the registry in both directions; the dead
  arithmetic detail is gone and unresolved constructs fail closed.
- **Focus (IR-12):** MC17-15 rejects `outline: none|0`, `outline-style: none`,
  zero-width outlines and transparent outline colours even when the focus token is
  present.
- **Format (IR-10):** `format`/`format:check` cover `e2e/design-system`,
  `src/app/marea-design-system`, `preview` and `playwright.design-system.config.ts`
  (plus the shared guard module). `**/*.generated.ts` is intentionally excluded from
  Prettier and validated instead by the three deterministic generators; a unit test
  asserts both facts. All hand-authored design-system/preview files were formatted.
- **Documents/evidence (IR-03, CR-02, IR-06, IR-08, IR-13):** D01–D24 and the
  datasets were reconciled against the real evidence (validator 38/38, axe 0
  violations in four modes, D22 present, 30/30 at 4a9043b, 26 baselines, evidence
  present), with stale runs kept as dated historical records; the two orphaned
  baselines were deleted; `visual-regression-evidence.json` now records source
  commits, environment, per-file SHA-256, the ES/EN difference and the
  generation/acceptance procedure; registry row 17 and D-073 record the exact
  constants; `mc18-handoff-inputs.json` no longer claims evidence is missing; the
  MC-16 handoff keeps its historical text plus a dated supersession note.

The only baseline-content change is a deliberate refresh of the two 320x812
instrument captures: the committed baselines no longer matched the same
Chromium/Windows renderer. Before/after images were compared by the reviewer —
identical layout and content, pixel differences confined to text antialiasing
(mean absolute delta ≈1.2/255). The other 24 baselines are byte-identical. This is
a renderer-environment refresh, not a design change, and it is recorded in
`visual-regression-evidence.json`.

### 11.5 Stage C re-verification at f2c9ec2 (real exits)

| # | Command | Result | Exit |
|---:|---|---|---:|
| 1 | `git status --porcelain` / `git diff HEAD --quiet` | empty / no diff | 0 |
| 2 | `node scripts/check-marea-design-system.mjs` | **38/38 PASS** | 0 |
| 3 | `npm run test:design-system:unit` | **41/41 PASS** | 0 |
| 4 | `npx tsc -p tsconfig.app.json --noEmit` | no diagnostics | 0 |
| 5 | `npx tsc -p preview/tsconfig.json --noEmit` | no diagnostics | 0 |
| 6 | `npm run format:check` | all covered files formatted (expanded coverage) | 0 |
| 7 | `node scripts/build-marea-design-tokens.mjs --check` | 262 rows / 4 modes current | 0 |
| 8 | `node scripts/build-marea-design-system-fixtures.mjs --check` | 9 families / 26 editions / 6 bundles current | 0 |
| 9 | `node scripts/build-marea-design-system-catalogue-data.mjs --check` | 49 components current | 0 |
| 10 | `node scripts/build-marea-design-system-baseline.mjs --check` | 35 watched files current vs 6d8287c | 0 |
| 11 | `npm run build` | 96 static routes; 168 files / 3,032,021 bytes; no budget error | 0 |
| 12 | `npx ng build marea-design-system-catalogue` | catalogue build; 60 files / 4,601,309 bytes | 0 |
| 13 | `npx playwright test -c playwright.design-system.config.ts` (no `--update-snapshots`) | **37/37 PASS**, 1 worker (4.9 min cold, 1.7 min warm) | 0 |
| 14 | `npm run test:e2e` (public site) | **15/15 PASS** | 0 |
| 15 | `npm run test:i18n` / `test:commerce` / `test:seo` | PASS / PASS / PASS | 0 |
| 16 | `npm audit --omit=dev --audit-level=high` | 0 vulnerabilities | 0 |
| 17 | Production bundle scan (`dist/embarcarte`) | 0 design-system/catalogue identifiers; styles exactly `["src/styles.scss"]` | 0 |
| 18 | Independent DOM probe, ES and EN | 9/9 families render their own limit and material-first chip; six adversarial cases behave; SENSE kit note and PROTECT expansion visible | 0 |
| 19 | Mutation harness against the real validator | **9/9** mutations detected (literal, re-export, dynamic, alias, transitive, aliased union, enum, hidden focus, transparent focus) | 0 |
| 20 | `git diff --check` | clean | 0 |

The complete inherited suite set was also re-run (commerce-data 1786/1786, unit
suites, IA/SEO, legal/commercial, products 106/106 unit, bundles, hardware,
economics, market, customer research/recovery, i18n, commerce, SEO, backup,
performance). Every suite passed except the inherited financial `V-18` failure
(76/77; 28/29 unit), which was not modified.

### 11.6 Final finding closure

| Finding | Severity | Final status | Evidence |
|---|---|---|---|
| MC17-IR-01 | MAJOR | **CLOSED_VERIFIED** | nine cards ES/EN; per-card Playwright tests; material-first chips; adversarial cases; SENSE kit; HUB key |
| MC17-IR-02 | MAJOR | CLOSED | committed clean states 7cbc99e/4a9043b/f2c9ec2 |
| MC17-IR-03 | MINOR | **CLOSED_VERIFIED** | documents reconciled against current evidence; historical runs preserved with dates |
| MC17-IR-04 | MINOR | CLOSED | hidden outline mutation detected |
| MC17-IR-05 | MINOR | **CLOSED_VERIFIED** | alias + transitive mutations detected by validator and e2e shared resolver |
| MC17-IR-06 | MINOR | **CLOSED_VERIFIED** | 26 baselines, SHA/env/procedure recorded, ES/EN differ, orphan pair removed, refresh reviewed |
| MC17-IR-07 | MINOR | **CLOSED_VERIFIED** | TS-based both-direction comparison; alias/enum mutations detected; truthful counts |
| MC17-IR-08 | MINOR | **CLOSED_VERIFIED** | exact constants in registry/D-073/D24; handoff inputs updated; MC-16 supersession dated |
| MC17-IR-09 | INFORMATIONAL | ACCEPTED LIMITATION | single laboratory run; no field data claimed |
| MC17-IR-10 | INFORMATIONAL | **CLOSED_VERIFIED** | expanded format coverage + generated-artefact governance + regression test |
| MC17-IR-11 | INFORMATIONAL | CLOSED | frozen clean SHAs |
| MC17-CR-01 | MINOR | **CLOSED_VERIFIED** | format:check green at 4a9043b and f2c9ec2 |
| MC17-CR-02 | MINOR | **CLOSED_VERIFIED** | corrupted sentences repaired; only reviewer-owned historical mentions remain |
| MC17-CR-03 | INFORMATIONAL | **CLOSED_VERIFIED** | follow-up committed at 4a9043b/f2c9ec2; clean tree |
| MC17-IR-12 | MINOR | **CLOSED_VERIFIED** | transparent/hidden focus rejected; mutation detected |
| MC17-IR-13 | MINOR | **CLOSED_VERIFIED** | 28 → 26 baselines; provenance and counts reconciled |

No BLOCKING or MAJOR finding remains open for the internal design-system scope.

### 11.7 Residual limitations and explicit non-claims

- Visual baselines remain Chromium/Windows-specific. Two mobile instrument captures
  had to be refreshed for renderer drift; a future environment change needs a new
  platform suffix, not a silent overwrite.
- Axe reports 0 violations / 36 passes / 0 incomplete in each of the four modes with
  axe-core 4.11.4; this is automated evidence only. No screen-reader, real-device,
  cross-browser, glare, night-vision or WCAG 2.2 AA conformance claim exists.
- Performance is one laboratory measurement; the production bundle contribution is
  zero bytes at this SHA, but no field/RUM data and no marine-hardware validation
  exists.
- Hydration is argued from deterministic ids and static copy; the design system is
  not rendered by the public SSR server.
- The 49-entry registry is an internal contract, not a public API.
- No public route, sitemap entry, metadata, brand asset, price, stock, purchase,
  cart, checkout, subscription or entitlement grant exists or is authorised.

**No claim is made of:** WCAG conformance/certification, trademark clearance, MAREA
brand adoption or public use, hardware readability, AIS transmission, CE/NMEA
certification, tested third-party compatibility, price approval, verified stock,
commercial availability, publication, deployment, merge or MC-18 execution.

### 11.8 Third-round verdict

The three rounds now form a complete, reproducible chain: the implementation at
`3a8d4fd`, the first audit corrections at `7cbc99e`, the delivery candidate
`4a9043b` (Stage A, rejected), and the correction commit `f2c9ec2` (Stage C). At
`f2c9ec2` the nine family limitations are rendered and independently proven per
card in both locales, the isolation and variant guards detect every adversarial
mutation tested, the format gate covers the new source and is green, the visual
evidence is traceable, and the documentation matches the code. The public site is
byte-identical to the MC-16 baseline, the design system remains absent from the
production bundle, and every commercial/publication gate is still closed.

```text
MC17_INDEPENDENT_REVIEW = PASS_INTERNAL_DESIGN_SYSTEM_SCOPE
MC17_VERDICT = PARTIAL
MC17_INTERNAL_DESIGN_SYSTEM_SCOPE = PASS_INTERNAL_DESIGN_SYSTEM_SCOPE
MC17_FINAL_REAUDIT = COMPLETE
MC17_REVIEWED_IMPLEMENTATION_SHA = f2c9ec2ea07f90154cbb91cae36e4a7681b5e27d
MC17_OPEN_BLOCKING = 0
MC17_OPEN_MAJOR = 0
MC17_OPEN_MINOR = 0
MC18_STARTED = false
```

The overall milestone stays `PARTIAL` because trademark clearance, brand adoption,
hardware validation, price/stock approval and public publication remain external,
unauthorised gates; the internal design-system scope itself is verified. No merge,
deployment, publication, sale, brand adoption or MC-18 start is authorised by this
review.
