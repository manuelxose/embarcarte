# MC-25 acceptance criteria matrix

Every row is checkable by a third party. "Evidence" names the executable check,
not a narrative. Status vocabulary: PASS / PARTIAL / BLOCKED / FAIL.

## A. Canonical catalogue identities

| # | Criterion | Evidence | Status |
| --- | --- | --- | --- |
| A1 | Six identity kinds exist and are distinct | `MC25-01`; unit `i1` | PASS |
| A2 | A canonical edition is never an approved merchant SKU | `MC25-01`; units `i2`, `i3` | PASS |
| A3 | No merchant SKU identifier is fabricated | `MC25-01`; unit `i4` (empty frozen registry) | PASS |
| A4 | Unknown/malformed identities never resolve as canonical | unit `i5`; `MC25-01` | PASS |
| A5 | Families and editions are read from the MC-16 contract, not authored | `MC25-19` (projection counts + in-process re-derivation) | PASS |

## B. SKU lifecycle

| # | Criterion | Evidence | Status |
| --- | --- | --- | --- |
| B1 | Five internal states with documented semantics | `MC25-02`; `MC25-SKU-LIFECYCLE-SPECIFICATION.md` | PASS |
| B2 | Allowed transitions are declared; every other pair is rejected | `MC25-03`; unit `l1` (19 invalid pairs) | PASS |
| B3 | No orderable/sellable/published state exists | `MC25-02`; unit `l2` | PASS |
| B4 | Evidence-gated transitions are refused today | `MC25-03`; unit `l3`, `l4` | PASS |
| B5 | No transition persists | `MC25-03`; `SKU_LIFECYCLE_FACTS.persistedTransitions = 0` | PASS |

## C. Readiness evaluation

| # | Criterion | Evidence | Status |
| --- | --- | --- | --- |
| C1 | Ten prerequisites evaluated for every subject | `MC25-04`, `MC25-20` | PASS |
| C2 | Zero editions, candidates, families and bundles orderable | `MC25-04`, `MC25-05`; units `r1`, `r3`, `r4` | PASS |
| C3 | Deterministic decisions (same input, same fingerprint) | `MC25-04`; unit `r10` | PASS |
| C4 | Every refusal has explicit reasons | `MC25-20`; unit `r2` (8 reasons for NAV-ESSENTIAL) | PASS |
| C5 | NOT_APPLICABLE is not approval unless the contract permits it | `MC25-07`; unit `r6` | PASS |
| C6 | Missing/stale/unverified/blocked prerequisite prevents readiness | `MC25-04`, `MC25-06` | PASS |
| C7 | MC-02 blockers referenced per SKU | `MC25-06` (273 references) | PASS |
| C8 | Forged facts or mutation cannot produce orderability | `MC25-16`; units `t1`–`t3`, `r5` | PASS |

## D. Administration interface

| # | Criterion | Evidence | Status |
| --- | --- | --- | --- |
| D1 | Internal reviewer can inspect entries, readiness, blockers, provenance, missing prerequisites, lifecycle eligibility | E2E `@mc25` (SSR content assertions, tables, selectors) | PASS |
| D2 | Reviewer can understand why an item cannot be sold | E2E verdict + refusal rows; `MC25-20` | PASS |
| D3 | Review actions are refused in business logic, not the UI | `MC25-10`, `MC25-11`; units `a1`–`a6` | PASS |
| D4 | No false durable commercial approval | `submitReviewAction` → `applied/persisted/durableApproval = false`; `MC25-11` | PASS |
| D5 | No production approval backend is simulated | no persistence contract; `MC25-11`, `MC25-13` | PASS |

## E. Traceability

| # | Criterion | Evidence | Status |
| --- | --- | --- | --- |
| E1 | Decision carries identity, contract, gates, blockers, evidence, result, version | `MC25-20` | PASS |
| E2 | Evidence provenance is content-bound | `MC25-08`; unit `c2` (11 SHA-256 digests) | PASS |
| E3 | No customer/personal data repository created | `MC25-13`; E2E (no form/email), `GOVERNANCE_PREVIEW_IDENTITY.customerDataCollected = false` | PASS |
| E4 | Decisions are not persisted into an unauthorized audit store | `persisted: false` on every path | PASS |

## F. Critical fail-closed invariant

| # | Criterion | Evidence | Status |
| --- | --- | --- | --- |
| F1 | ZERO SKU orderable at the current fact base | `MC25-04`, `MC25-05` (26+26+9+6 objects) | PASS |
| F2 | UI/backend agreement | E2E reads the rendered verdict and the fact counter; `decision()` calls the same engine | PASS |
| F3 | Immutable, typed decision logic | `MC25-16`; units `t1`–`t3` | PASS |
| F4 | Adversarial promotion attempts fail | units `r1`–`r8`, `t1`–`t3`, `a2`–`a6`; `MC25-10`, `MC25-11` | PASS |

## G. MC-23 debt remediation

| # | Criterion | Evidence | Status |
| --- | --- | --- | --- |
| G1 | F-2 reproduced at 8a4b5e0 | `MC25-14`; `MC25-F2-F15-REMEDIATION-EVIDENCE.md` §1 | PASS |
| G2 | F-2 validated against the full relationship | `MC25-14`; units `f2-1`–`f2-9` | PASS |
| G3 | All legitimate upgrade paths preserved | unit `f2-1` (15/15 VALID) | PASS |
| G4 | F-15 reproduced at 8a4b5e0 | `MC25-15` | PASS |
| G5 | Known exclusion vs unknown edition distinguished | `MC25-15`; units `f15-1`–`f15-6` | PASS |

## H. Reuse of MC-24 configurator

| # | Criterion | Evidence | Status |
| --- | --- | --- | --- |
| H1 | Configurator modules not forked | MC-24 validator 13/13; no edit to those files | PASS |
| H2 | Exactly four D5 outcomes preserved | MC-24 modules untouched; MC-24 `MC24-01`/`MC24-02` PASS | PASS |
| H3 | `ELIGIBLE_SELF_INSTALL` still unreachable | MC-24 `MC24-02`; unit `a24` unchanged | PASS |
| H4 | `quotationProvided/priceProvided/orderable` stay false | MC-24 `MC24-06` PASS | PASS |
| H5 | No `ORDERABLE` configurator outcome introduced | source/`MC24-10` + no edit | PASS |

## I. Security and authorization

| # | Criterion | Evidence | Status |
| --- | --- | --- | --- |
| I1 | Admin surface not publicly reachable | `MC25-12`, `MC25-13`; E2E 404 checks | PASS |
| I2 | Loopback binding + Host allow-list + noindex | `MC25-13`; E2E headers | PASS |
| I3 | No hidden-button/CSS protection | direct invocation tests `MC25-10`, `MC25-11` | PASS |
| I4 | No external calls, no customer data | `MC25-13`; units `c3`, `c4` | PASS |
| I5 | Production bundle isolation | inherited `MC20-30` bundle scan: 168 files, 0 catalogue identifiers | PASS |

## J. Legal/commercial gates preserved

| # | Criterion | Evidence | Status |
| --- | --- | --- | --- |
| J1 | All eleven external gate values unchanged | `MC25-09`; snapshot assertions | PASS |
| J2 | No public SKU activation, price, stock, checkout, purchase, lead | `MC25-09`; E2E | PASS |
| J3 | Verdict remains PARTIAL while external gates are open | `MC25-EXECUTIVE-REPORT-ES.md` | PASS |

## K. Engineering evidence

| # | Criterion | Evidence | Status |
| --- | --- | --- | --- |
| K1 | TypeScript checks pass | `scripts/run-tsc.mjs` | PASS |
| K2 | Real Angular preview + production build pass | `check-mc24-build.mjs` (argv reuse) | PASS |
| K3 | Negative template binding is rejected and names the member | same gate | PASS |
| K4 | Generator drift gate | `check:mc25:data` + `MC25-19` in-process re-derivation | PASS |
| K5 | Validator + adversarial unit + E2E + axe | `test:mc25` 20/20, `test:mc25:unit` 58/58, catalog E2E 116/116 | PASS |
| K6 | Inherited MC-20–MC-24 suites unchanged or stricter | `test.mjs` 7/7, MC-24 13/13 + 26/26, i18n/SEO/commerce PASS | PASS |
| K7 | Independent audit by a different model | `MC25-INDEPENDENT-AUDIT.md` | see report |

## Residual limitations (declared, not hidden)

- Screen-reader/AT testing NOT_RUN; no WCAG conformance claimed.
- Professional English copy review NOT DONE.
- Six inherited MC-23 files remain unformatted (unchanged).
- Prose upgrade additions cannot be structurally validated (`RES-MC25-01`).
