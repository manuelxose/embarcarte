# MC-18 — Baseline and governance (D01)

| Field       | Value                                                                         |
| ----------- | ----------------------------------------------------------------------------- |
| Deliverable | D01 `MC-18-BASELINE-AND-GOVERNANCE.md`                                        |
| Milestone   | MC-18/36 — internal MAREA corporate landing (EMBARCARTE)                      |
| Owner       | docs-a (documentation owner, documents group A)                               |
| Date        | 2026-11-03                                                                    |
| Status      | `INTERNAL_VERIFIED` for the baseline facts below; **not a milestone verdict** |
| Publication | `NOT_AUTHORIZED`                                                              |

This document records the verified baseline MC-18 starts from, the authorisation boundary,
the governance state it inherits, the MC-17 handoff acceptance, two inherited
classification discrepancies (both **informational**, neither rewrites history) and the
open debt that MC-18 must preserve. It does not grant any approval and it does not decide
the milestone outcome; the independent audit does.

## 1. Purpose and evidence discipline

- Every SHA, exit code and count below was obtained by running the command shown, in this
  worktree, on 2026-11-03.
- Commands that did not pass are reported as observed. Several validator checks fail because
  datasets/documents belong to other MC-18 authors and do not exist yet; that is a
  **PENDING** state, not a hidden PASS.
- No source file, generated dataset, other document, `package.json`, `angular.json` or MC-17
  file was edited by this document's author.

## 2. Baseline verification

### 2.1 Local and remote commit state

| Fact                                                    | Observed value                                                                                                  |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Current branch                                          | `feature/marea-mc18-bilingual-corporate-landing`                                                                |
| `git rev-parse HEAD`                                    | `6002c49f898e755154c1b65c97781177719ce11c`                                                                      |
| `git rev-parse origin/main`                             | `092ae74c904cc9aa04766ff565bacd422394fa45`                                                                      |
| `6002c49` ancestor of `HEAD`                            | yes — `git merge-base --is-ancestor 6002c49… HEAD` → exit 0 (equal SHAs)                                        |
| `6002c49` ancestor of `origin/main`                     | no — exit 1                                                                                                     |
| `origin/main` ancestor of `6002c49`                     | yes — exit 0 (main is stale, MC-17 descends from it)                                                            |
| `origin/feature/marea-mc17-premium-design-system`       | `6002c49f898e755154c1b65c97781177719ce11c`                                                                      |
| `origin/feature/marea-mc16-commerce-product-data-model` | `6d8287c8507038c4f90fd6e35471f78081ca4676`; ancestor of `6002c49` (exit 0)                                      |
| MC-18 commits ahead of the base                         | 0 — `git rev-list --count 6002c49..origin/feature/marea-mc17-premium-design-system` → 0; `HEAD` equals the base |
| `origin/feature/marea-mc18-bilingual-corporate-landing` | **does not exist**; `git ls-remote origin` returned only `main`, the MC-16 branch and the MC-17 branch          |
| Local branch tracking                                   | none (`git branch -vv`: no upstream for the MC-18 branch)                                                       |

The MC-18 branch is therefore **local-only**, its tip is the unmodified MC-17 HEAD, and all
MC-18 work is **uncommitted working-tree content**. No MC-18 commit or PR exists yet.

### 2.2 Pull request #24 (MC-17)

Verified with `gh pr view 24 --json number,title,state,isDraft,mergeable,headRefName,baseRefName,url`:

| Field     | Value                                                     |
| --------- | --------------------------------------------------------- |
| Number    | 24                                                        |
| Title     | `MC-17/36 - Premium marine design system (internal only)` |
| State     | `OPEN`                                                    |
| Draft     | `true`                                                    |
| Mergeable | `MERGEABLE`                                               |
| Head      | `feature/marea-mc17-premium-design-system`                |
| Base      | `feature/marea-mc16-commerce-product-data-model`          |
| Merged    | no                                                        |

`gh pr list --state open` shows no MC-18 pull request. The stacked-chain state is unchanged:
MC-14 #21, MC-15 #22, MC-16 #23 and MC-17 #24 are all open drafts; none is merged.

### 2.3 Worktree caveat

`git status --porcelain=v1` returns **15 entries**: 3 modified tracked files and 12 untracked
paths. The worktree is **not clean** and must not be described as such:

- Modified: `angular.json`, `package.json` (additive; see D14) and `playwright.config.ts`
  (one-line `testIgnore` isolation addition; see D14 §2.1).
- Untracked: `src/app/marea-landing/`, `preview/landing/`, `e2e/landing/`,
  `playwright.landing.config.ts`, `docs/marea/landing/` and the landing scripts
  (`scripts/build-marea-landing-data.mjs`, `scripts/check-marea-landing.mjs`,
  `scripts/check-marea-landing.test.mjs`, `scripts/check-marea-landing-adversarial.test.mjs`,
  `scripts/marea-landing-guards.mjs`, `scripts/marea-landing-ts-loader.mjs`,
  `scripts/marea-landing-ts-register.mjs`).

Consequence for any audit: a diff-only review of `6002c49..HEAD` shows an **empty** MC-18
delta. The MC-18 implementation is only visible in the working tree.

### 2.4 Commands executed for this baseline

| Command                                                                                                                                         | Result                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `git rev-parse HEAD`                                                                                                                            | `6002c49f898e755154c1b65c97781177719ce11c`                                                                               |
| `git rev-parse origin/main`                                                                                                                     | `092ae74c904cc9aa04766ff565bacd422394fa45`                                                                               |
| `git merge-base --is-ancestor` (4 checks above)                                                                                                 | exit 0 / 1 as tabled                                                                                                     |
| `git ls-remote origin …`                                                                                                                        | MC-17 = `6002c49…`, MC-16 = `6d8287c…`, main = `092ae74…`, no MC-18 ref                                                  |
| `gh pr view 24` / `gh pr list --state open`                                                                                                     | as tabled                                                                                                                |
| `git diff --name-only 6002c49 -- src/app src/main.ts src/main.server.ts src/server.ts src/styles.scss public angular.json playwright.config.ts` | `angular.json` and `playwright.config.ts`; every other path empty                                                        |
| `npx tsc -p tsconfig.app.json --noEmit`                                                                                                         | exit 0                                                                                                                   |
| `npx tsc -p preview/landing/tsconfig.json --noEmit`                                                                                             | exit 0                                                                                                                   |
| `npm run build:landing:preview`                                                                                                                 | exit 0                                                                                                                   |
| `npm run test:landing:unit`                                                                                                                     | exit 0, 45/45 tests pass                                                                                                 |
| `npm run test:landing`                                                                                                                          | exit 1, **55/60** checks pass in the final run; 5 fail for pending artefacts owned by other authors (`MC18-55` now PASS) |

The remaining validator failures are documented in D08 and are downstream-author PENDING, not
a baseline defect: missing evidence datasets (performance, legacy-baseline, review-findings),
missing documents (D10–D12, D19, D20, D23) and the delivery record. The generator drift
observed transiently while another author was editing the component tree is resolved in the
final run (`MC18-41` PASS).

## 3. MC-18 authorisation scope

MC-18/36 is authorised by its master prompt to **implement, internally, a bilingual
corporate landing** on the existing Angular SSR architecture, reusing the verified MC-17
design system, with an isolated SSR preview application. That is the full extent of the
authorisation used here.

The master prompt is not committed to the repository as a quotable artefact (the same named
gap MC-17 recorded), so this section is a recorded scope statement rather than a repository
quote. The programme registry still records milestone 18 as `PLANNED`
(`docs/marea/execution/MASTER-PROMPT-REGISTRY.md` row 18); updating that row is a delivery
step owned by the MC-18 documentation set D23, not by this document.

**Not authorised by MC-18 and not performed:** publication, deployment, indexation, a public
route, sitemap or robots inclusion, public navigation, brand adoption, public use of MAREA,
price/stock/availability, purchase, lead capture, telemetry, customer or vessel data, and
any change to the production commerce surface. All of those remain blocked by the governance
state in section 4 and by the release gates in D07.

## 4. Governance rules preserved

Verified against `docs/marea/design-system/data/manifest.json` → `governanceFlags` (MC-17,
unchanged) and the MC-14 claims policy. MC-18 changes none of them.

| Flag                        | Value            |
| --------------------------- | ---------------- |
| `TRADEMARK_LEGAL_CLEARANCE` | `NOT_GRANTED`    |
| `MAREA_PUBLIC_USE`          | `NO_GO`          |
| `FINAL_IDENTITY_ADOPTION`   | `BLOCKED`        |
| `SOURCE_IP_CLEARANCE`       | `NOT_CLEARED`    |
| `COMMERCIAL_AVAILABILITY`   | `NOT_FOR_SALE`   |
| `PRICE_APPROVED`            | `NONE`           |
| `LICENSING_RIGHTS_GRANTED`  | `false`          |
| `PILOT_SAFETY_GATE`         | `BLOCKED`        |
| `AIS_TRANSMISSION_OFFERED`  | `false`          |
| `FLEET_DEFAULT_HARDWARE`    | `false`          |
| `CE_MARKING_CLAIM`          | `PROHIBITED`     |
| `NMEA2000_CERTIFIED`        | `false`          |
| `TESTED_COMPATIBILITY_ROWS` | `0`              |
| `PUBLICATION_AUTHORIZED`    | `false`          |
| `PRODUCTION_DEPLOYMENT`     | `NOT_AUTHORIZED` |

The source manifest also carries `CUSTOMER_EVIDENCE = NONE` and
`CUSTOMER_WTP_VALIDATED = false`; they are preserved for completeness, not required by
MC-18 copy.

## 5. MC-17 handoff acceptance

Source: `docs/marea/design-system/MC17-MC18-HANDOFF.md` (D19), handoff status
`READY_WITH_NAMED_GAPS`; machine inputs
`docs/marea/design-system/data/mc18-handoff-inputs.json`.

MC-18 accepts and applies the handoff contract:

1. The MC-17 design system is **reused, not forked**: every component import comes from
   `src/app/marea-design-system/` and is listed in
   `docs/marea/landing/data/design-system-dependencies.json` (18 direct imports: 14
   registered components/theme + 4 pure data/type modules). No parallel component library
   exists.
2. The generated token CSS is listed only in the **preview** project's `styles` array;
   `src/styles.scss` and the production `embarcarte` project are untouched.
3. The landing is wrapped in `<marea-theme mode="web-light">` only. Instrument modes are not
   used on the corporate surface.
4. Fonts (`@fontsource-variable/manrope`, `@fontsource-variable/dm-sans`) are already
   dependencies; no dependency was added (verified in D14).
5. The handoff authorises **no** public copy, route, indexation, price, stock, checkout or
   brand adoption. MC-18 keeps those closed.
6. The handoff snapshot records `MC18_STARTED = false` and `mc18ImplementationPresent = false`
   **at MC-17 authoring time**. Those are historical MC-17 values; the current MC-18
   implementation exists only in the working tree (section 2.3). The handoff file is not
   edited by MC-18.
7. The handoff's reference to page type `PAGE_MAREA_OVERVIEW` is a narrative label; see
   section 7.

## 6. MC-17 `playwrightTests` 28 vs 37 — classification, not rewrite

This is the required classification of the MC-17 residual discrepancy.

| Item                             | Value / location                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Recorded index value             | `playwrightTests: 28` in `docs/marea/design-system/data/manifest.json` → `implementationCounts.playwrightTests`                                                                                                                                                                                                                                                                                                                                                 |
| Nature of that value             | **historical / authoring-time index value** — the manifest declares itself "authored by hand as an index … on 2026-11-03"; the count was correct when authored and is not the final measured count                                                                                                                                                                                                                                                              |
| Measured superseding evidence    | `docs/marea/design-system/data/visual-regression-evidence.json` → `recordedRun.totalTestsAcrossSuiteAt4a9043b = 30`, `recordedRun.totalTestsAcrossSuiteAtCorrection = 37`, and `recordedRun.totalTestsAcrossSuiteNote = "30 at 4a9043b (29 at 7cbc99e, 28 at authoring). 37 at the third-round correction commit: eight per-family/adversarial commerce tests replaced one body-wide assertion. The count is measured from the Playwright run, not hardcoded."` |
| Final third-round measured count | 37 tests in the MC-17 design-system Playwright suite at the final correction commit (f2c9ec2); documented progression 28 → 29 → 30 → 37                                                                                                                                                                                                                                                                                                                         |
| Classification                   | **historical/authoring-time index value, superseded by measured evidence**; not a current defect and not a count MC-18 may quote as the final MC-17 suite size                                                                                                                                                                                                                                                                                                  |
| What was NOT done                | the MC-17 `manifest.json` was **not edited**, no history was rewritten, and no MC-17 verdict was changed                                                                                                                                                                                                                                                                                                                                                        |

MC-18's own counts are separate and are not taken from this value: 60 landing validator
checks (`scripts/check-marea-landing.mjs`) and 45 landing unit/adversarial tests
(`npm run test:landing:unit`).

Validator note (current state): check `MC18-55` now reads
`manifest.implementationCounts?.playwrightTests ?? manifest.completeness?.playwrightTests` and
requires `28`. An earlier run in this session failed the check because it read only
`completeness.playwrightTests` (undefined for the MC-17 manifest); the Lead corrected the
validator path. In the final run `MC18-55` is **PASS**, the MC-17 manifest is untouched and the
classification above stands. No MC-17 file or validator source was edited by docs-a.

## 7. `pageType` contract-label discrepancy — INFORMATIONAL

The canonical MC-15 route dataset and the narrative labels disagree on one label only. The
repository dataset is the authority.

| Source                                                                                                                                                                 | Label                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `docs/marea/information-architecture/data/proposed-routes.json` → `mareaOverview.pageType`                                                                             | `HUB_OVERVIEW` (**authority**)                                     |
| MC-18 master-prompt narrative; MC-17 handoff; MC-15 publication-gates narrative copies; `docs/marea/landing/data/content-evidence.json` → `EV-MC15-ROUTES.establishes` | `PAGE_MAREA_OVERVIEW`                                              |
| MC-18 implementation `src/app/marea-landing/models/page-identity.ts` and `models/seo.ts`                                                                               | `HUB_OVERVIEW` (with the discrepancy documented in a code comment) |

Classification: **INFORMATIONAL contract-label mismatch**. It does not change the route id
(`mareaOverview`), entity id (`ENT-HUB-MAREA`), paths (`/marea`, `/en/marea`) or any
authorisation state. MC-18 resolves it by following the dataset; no history is rewritten and
no predecessor dataset is edited. This is recorded again in D07.

## 8. Inherited open debt preserved

MC-18 closes none of the following and must not "fix" any of them by editing predecessor
data or validators.

| Debt                                                                                      | Status carried                                                                                                                                                                                 | Evidence of record                                                                                                                                                          |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FINANCIAL_V18`                                                                           | `INHERITED_OPEN` — MC-13 validator asserts registry row 14 must be `PLANNED`; MC-14 was executed and recorded `PARTIAL`, so `npm run test:financial` / `test:financial:unit` fail only on V-18 | `docs/marea/execution/DECISION-LOG.md` D-069; `docs/marea/financial/MC13-FINANCIAL-DATA-CONTRACT.md` (V-18); `docs/marea/design-system/MC-17-BASELINE-AND-GOVERNANCE.md` §8 |
| `MC16_FINAL_02`                                                                           | `OPEN_UNTIL_REVERIFIED`                                                                                                                                                                        | `docs/marea/design-system/data/blocker-register.json`; MC-17 baseline §8                                                                                                    |
| `MC13_F05` / `MC13_F11` / `MC13_F14` (also written `MC13-F-05`, `MC13-F-11`, `MC13-F-14`) | `OPEN`                                                                                                                                                                                         | MC-17 baseline §8; MC-17 blocker register                                                                                                                                   |
| `MC15_GSC01` / `MC15_GSC02`                                                               | `OPEN`                                                                                                                                                                                         | MC-17 baseline §8; MC-15 delivery/review records                                                                                                                            |
| MC-14 release gates                                                                       | 13 open / 0 closed; 24 required documents / 0 executed                                                                                                                                         | `docs/marea/legal-commercial/data/release-evidence-gates.json`; D07                                                                                                         |
| MC-14 claims register                                                                     | 42 catalogued / 0 public-authorised                                                                                                                                                            | `docs/marea/legal-commercial/data/claims-policy.json`; D07                                                                                                                  |
| `MC16_FINAL_09` (carried alongside)                                                       | open                                                                                                                                                                                           | MC-17 baseline §8                                                                                                                                                           |

MC-18 creates no new external authorisation and inherits the debt unchanged.

## 9. No previous milestone verdict is overwritten

This document does not amend, reinterpret or supersede any predecessor verdict. For the
avoidance of doubt:

- `MC16_VERDICT = PARTIAL` and `PASS_INTERNAL_COMMERCE_DATA_SCOPE` — unchanged.
- MC-15 verdict `PARTIAL` (internal IA/SEO scope PASS; external indexation evidence partial) —
  unchanged.
- MC-13 and MC-14 verdicts `PARTIAL` — unchanged.
- `MC17_VERDICT = PARTIAL` with `PASS_INTERNAL_DESIGN_SYSTEM_SCOPE` — unchanged.
- No MC-18 verdict exists in this document. `MC18_PUBLICATION = NOT_AUTHORIZED` is the only
  status this document asserts.

## 10. Known limitations / non-claims

- This is a **documentation verification**, not an independent audit and not a milestone
  verdict. It may not be cited as `MC18_VERDICT` or as a publication approval.
- The MC-18 implementation is uncommitted; no SHA identifies the reviewed content yet. Any
  later commit changes the baseline and requires re-verification.
- `origin/main` is stale (`092ae74…`) and does not contain the stacked MC-13…MC-17 work. All
  baseline statements are relative to `6002c49`, the MC-17 branch head, not to main.
- The MC-18 master prompt is not committed; section 3 records its scope, not a quote.
- The validator result (55/60, exit 1 in the final run) is a **current observation**; the five
  failures are pending artefacts owned by other authors (missing documents, performance/legacy/
  review datasets and the delivery record). It is not a claim that MC-18 passes.
- The `playwrightTests` and `pageType` items are classifications of inherited records. They
  do not assert that the MC-17 manifest or handoff are free of other index errors.
- No legal, trademark, licensing, certification, safety, commercial or publication
  authorisation is granted or implied anywhere in this document.
