# MC-25 delivery record

**Milestone:** MC-25 — SKU readiness and catalogue governance in admin/commerce
**Status:** `MC25_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE` — `MC25_VERDICT = PARTIAL`
**Delivery date:** 2026-11-05

## 1. Git references (verified)

| Ref | Value |
| --- | --- |
| Branch | `feature/marea-mc25-sku-governance` |
| Baseline (verified MC-24 head) | `c4d9d76245770a69f765024f07426fe82b24d56c` |
| MC-25 implementation commit | `c8eb23b` — SKU readiness engine, lifecycle, admin screen, F-2/F-15 |
| Audit remediation commit | `6ffcbb9` — independent-audit findings, computed facts, derived verdict, sanitising boundary |
| Delivery HEAD (code) | `6ffcbb9` |
| Remote head | `6ffcbb93cc00a1ae96c056d08b6d1cec12b013e2` (`git ls-remote`) |
| Draft PR | **#33** — OPEN, DRAFT, MERGEABLE, base `feature/marea-mc24-configurator` |
| Merge / deploy / publication | **NONE** |

Preserved draft PRs, untouched: #31 (MC-24), #32 (MC-23 preservation), #29, #30
and the earlier milestones. No merge, no deployment, no publication, no
indexation, no sale.

## 2. Delivered artefacts

| # | Deliverable | Path |
| --- | --- | --- |
| 1 | MC-25 scope contract | `MC25-SCOPE-CONTRACT.md` |
| 2 | SKU lifecycle specification | `MC25-SKU-LIFECYCLE-SPECIFICATION.md` |
| 3 | Readiness engine | `src/app/marea-catalog/governance/sku-readiness.ts`, `MC25-READINESS-ENGINE.md` |
| 4 | Internal governance/admin experience | `sections/section-sku-governance.ts`, `preview/landing/governance-preview.ts`, `MC25-ADMIN-GOVERNANCE-EXPERIENCE.md` |
| 5 | MC-02 blocker mapping | `MC25-MC02-BLOCKER-MAPPING.md` |
| 6 | Canonical SKU identity and evidence model | `governance/sku-identity.ts`, `MC25-SKU-IDENTITY-AND-EVIDENCE-MODEL.md` |
| 7 | F-2/F-15 remediation evidence | `MC25-F2-F15-REMEDIATION-EVIDENCE.md` |
| 8 | Security and authorization test report | `MC25-SECURITY-AND-AUTHORIZATION-REPORT.md` |
| 9 | Acceptance criteria matrix | `MC25-ACCEPTANCE-MATRIX.md` |
| 10 | Automated test and Angular build evidence | `MC25-TEST-AND-BUILD-EVIDENCE.md` |
| 11 | Independent audit | `MC25-INDEPENDENT-AUDIT.md` |
| 12 | Remediation and residual-risk register | `MC25-RISK-AND-REMEDIATION-REGISTER.md` |
| 13 | Executive report in Spanish | `MC25-EXECUTIVE-REPORT-ES.md` |
| 14 | MC-26 handoff inputs | `MC25-MC26-HANDOFF.md` |
| — | Architecture and component inventory | `MC25-ARCHITECTURE-AND-COMPONENT-INVENTORY.md` |

## 3. Executed verification on the delivery HEAD

| Command | Result |
| --- | --- |
| `node scripts/run-tsc.mjs` | PASS (app + preview) |
| `node scripts/check-mc24-build.mjs --component …section-sku-governance.ts …` | PASS: preview build 0, production build 0, injected invalid binding rejected (`TS2339` naming `mc25DeliberatelyMissingBinding`), no fixture leak |
| `npm run test:mc25` | 20/20 PASS |
| `npm run test:mc25:unit` | 58/58 PASS |
| `node scripts/test.mjs` | 7/7 stages PASS |
| `npm run check:mc25:data` | PASS (9 families, 26 editions, 26 candidates, 13 gates) |
| `check-mc20-catalog.mjs` | 56/56 PASS |
| `check-mc23-bundles.mjs` + unit | PASS, 16/16 |
| `check-mc24-configurator.mjs` + unit | 13/13, 26/26 PASS |
| `playwright test -c playwright.catalog.config.ts` | 116/116 PASS (101 inherited + 15 MC-25) |
| `test:i18n` / `test:seo` / `test:commerce` | PASS |
| Production bundle scan | 168 files, 0 catalogue identifiers |
| Formatting (MC-25 files) | Prettier clean; the six inherited MC-23 files remain unformatted, identical to baseline |

## 4. Invariant evidence

- Orderable objects: **0** across 26 editions, 26 candidate SKUs, 9 families and
  6 bundles (exhaustive, evaluated twice with identical fingerprints).
- Merchant SKU codes: **0** (empty frozen registry; a code never resolves).
- Approved prices: **0**; verified stock rows: **0**; open release gates: **13/13**.
- Mutating admin actions applied/persisted: **0/14 direct invocations**, including a
  forged `PROGRAMME_LEAD` + `VERIFIED_SESSION` principal.
- Snapshot mutation: push throws; assignment ignored or throws; values unchanged.

## 5. Independent audit outcome

| Auditor | Method | Verdict | Findings |
| --- | --- | --- | --- |
| Claude Sonnet 5.5 | static review (shell denied) | NEEDS_REVISION | 10 (3 MAJOR) — all fixed or accepted with reason |
| DeepSeek V4-Pro | executed attacks on the modules | PASS_INTERNAL_SCOPE | 0 BLOCKER, 0 MAJOR; 5 NIT/transparency |

Remediation commit `6ffcbb9`; re-verification recorded in §3.

## 6. Residual risk

Accepted and recorded in the risk register: prose upgrade additions
(`RES-MC25-01`), heuristic claim guard (`RES-MC25-02`), six inherited unformatted
files (`RES-MC25-03`), no screen-reader/AT testing (`RES-MC25-04`), no
professional English review (`RES-MC25-05`), no durable approval trail
(`RES-MC25-06`), inherited preview CSP (`RES-MC25-07`), test-only combinator
(`RES-MC25-08`).

## 7. Explicit non-actions

No merge, no deployment, no publication, no indexation, no public SKU
activation, no price, no stock, no checkout, no purchase, no lead capture, no
customer data, no MC-26 work.
