# MC-25 MC-02 blocker mapping per SKU

**Source of truth:** `docs/marea/commerce-data/data/blocker-register.json`
(MC-16) and each edition's `releaseGateDependencies` in
`docs/marea/commerce-data/data/product-editions.json`.
**Module:** `src/app/marea-catalog/governance/sku-readiness.ts`
(`MC02_BLOCKERS_RESOLVED` prerequisite) and
`src/app/marea-catalog/governance/governance-facts.ts` (`blockersForEdition`).

## 1. The 13 release gates

All 13 are open. A gate is closed only with verified **external** evidence; a
repository test cannot close one.

| Gate | Register status | Closure owner | Editions referencing it |
| --- | --- | --- | ---: |
| GATE-MARKET-PLACEMENT | BLOCKED | PRODUCT_COMPLIANCE_ENGINEER | 23 |
| GATE-SAFETY-PILOT | BLOCKED | HARDWARE_LEAD | 3 (PILOT-COASTAL, PILOT-SAIL, PILOT-PRO) |
| GATE-IP-CLEARANCE | BLOCKED | LEGAL_COUNSEL | 26 |
| GATE-DATA-LICENSING | BLOCKED | DATA_RIGHTS_OWNER | 11 |
| GATE-PRIVACY-DPA-DPIA | BLOCKED | DPO | 7 |
| GATE-CRA-CYBERSECURITY | BLOCKED | SECURITY_LEAD | 26 |
| GATE-CONSUMER-TERMS | BLOCKED | LEGAL_COUNSEL | 26 |
| GATE-COMMERCIAL-CLAIMS | BLOCKED | COMMERCIAL_DIRECTOR | 26 |
| GATE-PRICING | BLOCKED | FINANCE_LEAD | 26 |
| GATE-PAYMENTS | BLOCKED | FINANCE_LEAD | 26 |
| GATE-INSURANCE | BLOCKED | FINANCE_LEAD | 21 |
| GATE-LEGAL-ENTITY | BLOCKED | COMMERCIAL_DIRECTOR | 26 |
| GATE-WEBSITE-REMEDIATION | EVIDENCE_REQUIRED | COMMERCIAL_DIRECTOR | 26 |

## 2. How a gate reaches a SKU decision

```
edition.releaseGateDependencies
  → governance-facts.blockersForEdition(edition)   (register lookup, dedup, contract order)
  → READINESS prerequisite MC02_BLOCKERS_RESOLVED   (open === true → FAILED)
  → ReadinessDecision.mc02BlockerIds                (deduplicated, sorted)
  → RefusalReason { code: 'RELEASE_GATES_OPEN', mc02BlockerIds }
```

The validator re-derives the expectation from the register (not from the
engine's output): for each edition it computes the open gates referenced by the
contract and requires every one to appear in the decision. It also requires every
referenced blocker id to exist in the register and to be open there. Result: 273
blocker references across 26 editions, all consistent.

## 3. Additional, product-specific mapping

The mapping is not only a mechanical join:

- **PILOT** — the three PILOT editions additionally require
  `GATE-SAFETY-PILOT` closed for `SAFETY_APPROVED`; all three are refused and
  report `SAFETY_BLOCKED`. The MC-08 bundles that contain PILOT scope are also
  refused by `evaluateBundleReadiness` with `SAFETY_BLOCKED`.
- **FLEET** — the MC-08 bundle carries `FLEET_SERVICE_NOT_IMPLEMENTED` and
  `SLA_NOT_ESTABLISHED`; those are MC-08 gates, not MC-02 release gates, so they
  are reported by the bundle decision (`BUNDLE_EDITION_NOT_ORDERABLE`,
  `SAFETY_BLOCKED`) and are **not** mixed into the MC-02 list.
- **Software vs hardware** — `GATE-MARKET-PLACEMENT` is referenced by 23 editions
  (the software ones still need conformity evidence for the digital product);
  the three PILOT hardware/software editions carry the safety gate as well.

## 4. Current external evidence (unchanged by MC-25)

```text
priceApproved                  = NONE
commercialAvailability         = NOT_FOR_SALE (9 families, 26 editions)
verified stock rows            = 0
merchant SKU codes             = 0
tested compatibility rows      = 0
publicationAuthorized          = false
productionDeployment           = NOT_AUTHORIZED
PILOT safety gate              = BLOCKED
```

No gate was closed, no price was approved, no stock was invented and no blocker
was marked resolved by this milestone. MC-25 reads the register; it does not
write to it.
