# MC-24 — Delivery record

**Milestone:** MC-24 — Compatibility configurator and quotation triage
**Branch:** `feature/marea-mc24-configurator` (local)
**Base:** `7ed6ae681eafe6fd36d0b48102c4c30efd09c568` (`feature/marea-mc23-integration`)
**Delivery HEAD:** `ca186cdc405e0206bbbd458e0c9434abfb9b279e` (local = remote)
**Verdict:** `MC24_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE`, `MC24_VERDICT = PARTIAL`

## 1. Repository and dependency verification

| Check                                | Result                                                                                    |
| ------------------------------------ | ----------------------------------------------------------------------------------------- |
| Reported MC-23 HEAD `7ed6ae6`        | **Reproduced** on `feature/marea-mc23-integration`                                        |
| Session checkout was MC-22 `6ad4fec` | Confirmed; MC-24 was branched from the verified MC-23 head, not from the session checkout |
| MC-23 divergence from MC-22          | 22 commits                                                                                |
| MC-23 merged into `main`             | **No**                                                                                    |
| Working tree at branch creation      | clean (0 changes)                                                                         |
| ENGINE-03 worktree                   | `mc24-wt`, adopted and verified, owner `captain`, base `7ed6ae6`                          |

## 2. Execution model

| Aspect                         | Detail                                                                                                                                                                                                                            |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Worktree                       | One writer (the captain) in `mc24-wt`; no concurrent writers, so no write-scope collision was possible                                                                                                                            |
| Branch model                   | Single integration branch; no contributor branches were needed                                                                                                                                                                    |
| Route escalation               | Implementation on `deepseek-flash`; audit attempted on Claude Sonnet 5.5 (denied) and Codex 6.1-sol (usage limit), then completed on `deepseek-v4-pro`                                                                            |
| Deviation from the MC-23 model | MC-23 used four writer worktrees. MC-24 was executed by a single writer because the scope is one coherent vertical slice; this removed the merge-conflict class MC-23 hit, at the cost of less parallelism. Recorded, not hidden. |

## 3. Commits on the branch

```text
f96b168 fix(mc24): close the independent-audit findings C-01, F-01, F-02 and D-03
fe272a3 docs(mc24): record the negative tests of the gates themselves
8b86206 chore(mc24): refresh the catalogue evidence after the control negative-tests
9171953 docs(mc24): bind evidence to 8a4b5e0 and record the mutable-registry finding
8a4b5e0 fix(mc24): make the validated-rule registry immutable, closing a governance bypass
b40b9dd docs(mc24): add architecture, acceptance matrix, test report, ES report and MC-25 handoff
3c2996b style(mc24): apply Prettier to the MC-24 files and normalise the worktree to LF
881c813 test(mc24): add the adversarial unit suite and the SSR/hydration/E2E suite
d16c0d5 feat(mc24): deliver the bilingual configurator UI, validator and real-build gate
56d95dd feat(mc24): add configurator rule projection and deterministic engine
612bb5d fix(mc24): close inherited claim-guard bypasses F-01 and F-02
```

## 4. Delivered artefacts

| Artefact                             | Path                                                                                                              |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Scope contract                       | `docs/marea/catalog/MC24-SCOPE-CONTRACT.md`                                                                       |
| Architecture and component inventory | `docs/marea/catalog/MC24-ARCHITECTURE-AND-COMPONENT-INVENTORY.md`                                                 |
| Acceptance criteria matrix           | `docs/marea/catalog/MC24-ACCEPTANCE-MATRIX.md`                                                                    |
| Test report                          | `docs/marea/catalog/MC24-TEST-REPORT.md`                                                                          |
| Independent audit and remediation    | `docs/marea/catalog/MC24-INDEPENDENT-AUDIT.md`                                                                    |
| Risk and inherited-debt register     | `docs/marea/catalog/MC24-RISK-AND-INHERITED-DEBT-REGISTER.md`                                                     |
| Executive report (ES)                | `docs/marea/catalog/MC24-EXECUTIVE-REPORT-ES.md`                                                                  |
| MC-25 handoff                        | `docs/marea/catalog/MC24-MC25-HANDOFF.md`                                                                         |
| Rule projection generator            | `scripts/build-mc24-configurator-data.mjs`                                                                        |
| Engine / triage                      | `src/app/marea-catalog/data/configurator-engine.ts`, `configurator-triage.ts`                                     |
| Generated projection                 | `src/app/marea-catalog/data/configurator.generated.ts`                                                            |
| ES/EN content                        | `src/app/marea-catalog/content/configurator.ts`                                                                   |
| UI section                           | `src/app/marea-catalog/sections/section-configurator.ts`                                                          |
| Preview host + route identity        | `preview/landing/configurator-preview.ts`, `src/app/marea-catalog/models/configurator-identity.ts`                |
| Validator / unit / build gate        | `scripts/check-mc24-configurator.mjs`, `scripts/check-mc24-configurator.test.mjs`, `scripts/check-mc24-build.mjs` |
| E2E                                  | `e2e/catalog/configurator.spec.ts`                                                                                |

## 5. Gate results (executed)

| Gate                                               | Result                                                                     |
| -------------------------------------------------- | -------------------------------------------------------------------------- |
| `node scripts/run-tsc.mjs`                         | PASS (both projects)                                                       |
| `node scripts/test.mjs`                            | 5/5 stages; MC-20/MC-22 56/56; MC-23 15/15                                 |
| `npm run test:mc24`                                | 13/13                                                                      |
| `npm run test:mc24:unit`                           | **26/26**                                                                  |
| `node scripts/check-mc24-build.mjs`                | PASS (preview + production builds; invalid binding rejected with `TS2339`) |
| `playwright test -c playwright.catalog.config.ts`  | 101 passed (17 MC-24)                                                      |
| `npm run test:i18n` / `test:seo` / `test:commerce` | PASS / PASS / PASS                                                         |
| Production bundle isolation                        | 0 catalogue identifiers; 96 prerendered routes; no configurator directory  |
| Projection drift gate                              | up to date (32 questions, 12 rules, 20 conflict rules)                     |

## 5.bis Remote preservation and draft PRs

Verified with `gh pr view` and `git ls-remote`:

| Item                  | State                                                                                                                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MC-24 draft PR        | [#31](https://github.com/manuelxose/embarcarte/pull/31) — `OPEN`, `isDraft: true`, base `feature/marea-mc23-integration`, head `feature/marea-mc24-configurator`, `MERGEABLE`                              |
| MC-23 preservation PR | [#32](https://github.com/manuelxose/embarcarte/pull/32) — `OPEN`, `isDraft: true`, base `main`, head `feature/marea-mc23-integration`, `MERGEABLE`; created to preserve a branch that existed only locally |
| Remote head of MC-24  | `ca186cd` — identical to the local branch head                                                                                                                                                             |
| Remote head of MC-23  | `7ed6ae6` — unchanged from its delivery                                                                                                                                                                    |
| `origin/main`         | `092ae74` — **untouched**; no merge occurred                                                                                                                                                               |

Both pull requests are **drafts**. Neither is merged, neither may be merged without
explicit authorisation, and MC-24 is stacked on MC-23, so MC-24 cannot be merged
before that dependency is decided. Creating the PRs preserved the work; it did not
approve or publish anything.

## 6. Authorisation status

Nothing was merged into `main` or any other branch, nothing was pushed, deployed or
published, no external service was contacted, and **MC-25 was not started**.

```text
TRADEMARK_LEGAL_CLEARANCE   = NOT_GRANTED
MAREA_PUBLIC_USE            = NO_GO
SOURCE_IP_CLEARANCE         = NOT_CLEARED
LICENSING_RIGHTS_GRANTED    = false
PRICE_APPROVED              = NONE
COMMERCIAL_AVAILABILITY     = NOT_FOR_SALE
PUBLICATION_AUTHORIZED      = false
INDEXATION_AUTHORIZED       = false
PRODUCTION_DEPLOYMENT       = NOT_AUTHORIZED
GATE-PRIVACY-DPA-DPIA       = BLOCKED
```

## 7. Open items at delivery

| Item                                | Status                                                    |
| ----------------------------------- | --------------------------------------------------------- |
| MC-23 F-2 / F-15                    | OPEN — assigned to MC-25                                  |
| Audit C-02 (inch-mark latent FP)    | OPEN — accepted heuristic limitation                      |
| Audit F-03 / F-04 / F-05            | OPEN — accepted (defensive/cosmetic/code-execution class) |
| Professional English review         | NOT DONE                                                  |
| Screen-reader / manual WCAG testing | NOT RUN                                                   |
| Six MC-23 files unformatted         | Declared inherited debt, not rewritten                    |
