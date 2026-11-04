# MC-21 — Risk and legal-gate register

Inherited debt is preserved, not reclassified. MC-21 changes none of the entries below.

## 1. Preserved legal and commercial gates (verbatim, test-asserted)

```text
TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
LICENSING_RIGHTS_GRANTED = false
PRICE_APPROVED = NONE
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
PUBLICATION_AUTHORIZED = false
INDEXATION_AUTHORIZED = false
PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED
GATE-PRIVACY-DPA-DPIA = BLOCKED
```

The ten gates are emitted verbatim in the generated projection
(`CATALOG_GOVERNANCE_GATES`, `governanceGates`) and asserted by MC20-36 / MC21-08.
No gate was flipped, weakened or reclassified by MC-21.

## 2. Inherited debt register

| ID | Item | Source | State | Impact on MC-21 | Changed by MC-21 |
| --- | --- | --- | --- | --- | --- |
| DBT-01 | `FINANCIAL_V18` — financial gate fails on "no MC-14 execution" | MC-13 V-18 / `test:financial` | FAIL 76/77 (measured at `f2609a8`) | None: catalogue scope does not touch financial data | NO |
| DBT-02 | `MC16_FINAL_02` | MC-16 delivery | OPEN | Canonical projection consumed as-is | NO |
| DBT-03 | MC-13 F-05 / F-11 / F-14 | MC-13 review | OPEN | None at catalogue level | NO |
| DBT-04 | MC-15 GSC-01 / GSC-02 (Search Console evidence) | MC-15 | OPEN | No indexation is created by MC-21 | NO |
| DBT-05 | DEC-04 — AIS decoder licensing (GPL-3.0) | MC-02 / MC-20 | BLOCKED | AIS stays in the catalogue with the restriction visible | NO |
| DBT-06 | HUB hardware selection | MC-02 / MC-11 | `NOT_SELECTED` | HUB keeps `NOT_SELECTED`; no hardware claim | NO |
| DBT-07 | Verified compatibility rows | MC-08 / MC-16 | 0 rows | `COMPATIBILITY_UNTESTED` restriction remains on every family | NO |
| DBT-08 | Professional English review of new copy | MC-19 AC08 inheritance | NOT_RUN | New WEATHER/SENSE/WATCH EN copy is internal-preview only | NO |
| DBT-09 | Manual WCAG 2.2 AA / assistive-technology review | MC-18 / MC-19 / MC-20 | NOT_RUN | Automated axe is green; manual review still outstanding | NO |
| DBT-10 | MC-18 branch-specific validator findings (59/60, branch-scope check) | MC-18 / MC-20 | Recorded | Not re-run as a MC-21 gate; landing suite re-measured 45/45 | NO |
| DBT-11 | MC-19 AC08 partial accessibility | MC-19 draft | PARTIAL | MC-19 remains an independent unmerged draft | NO |

## 3. MC-21-internal risks (created by this milestone)

| ID | Risk | Mitigation | Residual |
| --- | --- | --- | --- |
| R-01 | The generator/validator keep `mc20-*` names while serving six families, which could mislead a future reader | Disclosed as naming debt in the scope contract and test report; MC-21 aliases added | NAMING_DEBT (documented) |
| R-02 | Multi-batch generator rewrite (batch-01/02/03) could silently drop canonical rows | Deterministic `--check`; MC20-01..09 assert 6 families / 18 editions row by row; generator exits non-zero on drift | LOW |
| R-03 | Named weather provider could leak into copy | Guard covers all 8 mandated providers with word boundaries; validator MC21-04 plus 8 negative controls; F-1 closed | LOW |
| R-04 | Availability could drift above `DEFINED` | MC21-05 availability allowlist; claim guard; fail-closed commercial adapter | LOW |
| R-05 | SENSE `PARTIALLY_VERIFIED` could be read as sensor verification | Explicit content caution; MC21-06 asserts the limitation block | LOW |
| R-06 | Claim guard is heuristic, not exhaustive | Enumerated families and tested variants; extended after the external audit with currency, numeric-accuracy, IP-rating and ordering rules | RESIDUAL (documented) |
| R-07 | Manual accessibility and professional EN review not executed | Forced internal-preview-only delivery; no publication authorised | EXTERNAL |
| R-08 | Internal verification missed two live inaccuracies (XA-01 truncated bundle rows, XA-04 evidence-class mislabel) | External audit caught them; repaired in `f7d3a3a`; MC20-09 now compares the full tuple set; a Sonnet 5.5 re-audit followed | CLOSED with process lesson recorded |
| R-09 | External auditor could not execute commands | Static-only audit recorded as such; every finding re-verified by the captain against canonical data before repair | LIMITATION (documented) |

## 3b. Accepted MINOR residuals from the external audit

`XA-05` (MC21-08 self-referential gate constant), `XA-06` (unused parity helper; rendered-page
parity covered by e2e), `XA-07` (MC20-32 inspects `git status` rather than a base diff), `XA-08`
(MC20-30 marker set and build precondition), `XA-12` (source refs checked for existence, not
fragment resolution). Each is recorded with its rationale in `MC21-INDEPENDENT-AUDIT.md`; none is
BLOCKING or MAJOR and none permits a false commercial claim in the rendered catalogue.

## 4. External authorisations still required

Publication, indexation, public routes, pricing, SKUs, stock, certification, provider contracts,
trademark clearance, source-IP clearance, privacy/DPA/DPIA and production deployment all remain
outside engineering scope and unauthorised.
