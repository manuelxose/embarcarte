# MC-16 — External evidence and blockers (D16)

| Field | Value |
|---|---|
| Deliverable | D16 `MC16-EXTERNAL-EVIDENCE-AND-BLOCKERS.md` |
| Milestone | MC-16/36 — MAREA commerce and product data model |
| Date | 2026-11-03 |
| Owner | governance-docs |
| Status | INTERNAL_ONLY — register only; closes nothing |
| External evidence on file | **0** |

## 1. Why this register exists

Every commercial input MC-16 would need to make a MAREA product purchasable is
**missing, blocked or unverified**. This document records that state once, with
counts and named items, so no later reader can mistake an internal design artefact
for an approval. A test pass, a schema install, a document draft, an internal
decision, an admin click or the existence of the MC-16 package closes nothing.

The authoritative datasets are
`docs/marea/legal-commercial/data/release-evidence-gates.json`,
`docs/marea/legal-commercial/data/website-findings.json`,
`docs/marea/financial/data/review-findings.json`,
`docs/marea/information-architecture/data/*` and MC-16's own
`docs/marea/commerce-data/data/blocker-register.json`.

## 2. Summary counts

| Item | Total | Closed / executed | Status |
|---|---|---|---|
| Release gates | 13 | 0 | 12 `BLOCKED`, 1 `EVIDENCE_REQUIRED` |
| Required legal/commercial documents | 24 | 0 | 18 `NOT_EXECUTED`, 6 `DRAFT_REQUIRED` |
| Website findings | 34 | 0 | 6 BLOCKING, 20 MAJOR, 4 MINOR, 4 INFORMATIONAL |
| MC-16 preconditions | 10 | 0 | all unmet |
| Approved MAREA prices | 0 | — | `PRICE_APPROVED = NONE` |
| Verified MAREA inventory | 0 | — | no stock record exists |
| Real subscriptions / entitlement grants | 0 / 0 | — | `billingImplemented = false` |
| External evidence records | 0 | — | no `VERIFIED_EXTERNAL` record |
| Published MAREA routes | 0 | — | 23 proposed, all non-deployable |

## 3. Release gates (13 open)

| Gate | Status | Closure owner | Evidence MC-16 would need (not present) |
|---|---|---|---|
| GATE-MARKET-PLACEMENT | BLOCKED | PRODUCT_COMPLIANCE_ENGINEER | Conformity assessment, DoC, accredited tests, technical file, traceability, safety information |
| GATE-SAFETY-PILOT | BLOCKED | HARDWARE_LEAD | Hazard analysis, safety case, E-stop/fail-closed proof, bench/HIL, sea trials, independent review, liability insurance |
| GATE-IP-CLEARANCE | BLOCKED | LEGAL_COUNSEL | Ownership chain, contributor waivers, outbound licence, notices/SBOM, MAREA trademark, NMEA licence if claimed |
| GATE-DATA-LICENSING | BLOCKED | DATA_RIGHTS_OWNER | Chart licence, weather licence with display/cache/offline rights, tile/basemap rights, attribution/freshness, provider register |
| GATE-PRIVACY-DPA-DPIA | BLOCKED | DPO | Role map, DPIA, Article 28 DPA, subprocessor register, ES/EN notices, retention/export, breach runbook, tenant isolation test |
| GATE-CRA-CYBERSECURITY | BLOCKED | SECURITY_LEAD | CRA classification, secure SDLC, CVD policy, SBOM/monitoring, support period, incident runbook, conformity file |
| GATE-CONSUMER-TERMS | BLOCKED | LEGAL_COUNSEL | Consumer terms ES/EN, B2B terms, subscription terms, returns, warranty/RMA, installer/distributor agreements, counsel sign-off |
| GATE-COMMERCIAL-CLAIMS | BLOCKED | COMMERCIAL_DIRECTOR | Approved claims with evidence, bilingual parity, channel/audience approval, trademark use decision, financial-claim review |
| GATE-PRICING | BLOCKED | FINANCE_LEAD | Approved price list, bottom-up cost/margin, VAT/tax confirmation, display/renewal rules |
| GATE-PAYMENTS | BLOCKED | FINANCE_LEAD | Merchant agreement, payment-role/SCA analysis, refund/chargeback procedure, PCI scope, checkout evidence |
| GATE-INSURANCE | BLOCKED | FINANCE_LEAD | Broker indication, policy wording, PILOT cover decision, cyber cover, residual-risk acceptance |
| GATE-LEGAL-ENTITY | BLOCKED | COMMERCIAL_DIRECTOR | Registration data, legal notice, privacy/cookie policy, terms of use, cookie consent |
| GATE-WEBSITE-REMEDIATION | EVIDENCE_REQUIRED | COMMERCIAL_DIRECTOR | D15 findings closed with evidence, claims review, structured-data policy, MC-15 migration authorization |

`data/release-gate-mapping.json` maps each gate to the MC-16 entities it blocks.
All 13 are open in the schema; no `CLOSED_VERIFIED` gate exists.

## 4. Required documents (24 unexecuted)

| ID | Document | Gate | Status |
|---|---|---|---|
| DOC-01 | EU declaration of conformity | MKT | NOT_EXECUTED |
| DOC-02 | Technical documentation file | MKT | NOT_EXECUTED |
| DOC-03 | Product risk assessment | MKT | NOT_EXECUTED |
| DOC-04 | Accredited test reports (EMC, radio, safety, environmental) | MKT | NOT_EXECUTED |
| DOC-05 | Label, serial and traceability information | MKT | NOT_EXECUTED |
| DOC-06 | Instructions and safety warnings (ES/EN) | MKT | DRAFT_REQUIRED |
| DOC-07 | Product liability insurance policy | INS | NOT_EXECUTED |
| DOC-08 | Third-party notices bundle and SBOM | IPC | NOT_EXECUTED |
| DOC-09 | IP assignment/licence agreements (OPEN-MARINE) | IPC | NOT_EXECUTED |
| DOC-10 | Chart and ENC licence | DAT | NOT_EXECUTED |
| DOC-11 | Weather and marine-data licences | DAT | NOT_EXECUTED |
| DOC-12 | Privacy notices (ES/EN) | PRI | DRAFT_REQUIRED |
| DOC-13 | Processor agreements (DPA) and subprocessor register | PRI | NOT_EXECUTED |
| DOC-14 | Warranty and returns policy | CON | DRAFT_REQUIRED |
| DOC-15 | Consumer terms of sale | CON | DRAFT_REQUIRED |
| DOC-16 | B2B supply terms | CON | DRAFT_REQUIRED |
| DOC-17 | Installer and distributor agreements | CON | NOT_EXECUTED |
| DOC-18 | Supplier and manufacturing contracts | MKT | NOT_EXECUTED |
| DOC-19 | Support, update and end-of-support policy | CRA | DRAFT_REQUIRED |
| DOC-20 | Vulnerability reporting and incident-response process | CRA | NOT_EXECUTED |
| DOC-21 | Merchant/payment provider agreement | PAY | NOT_EXECUTED |
| DOC-22 | Product identity and serial/lot traceability system | MKT | NOT_EXECUTED |
| DOC-23 | DPIA screening and report | PRI | NOT_EXECUTED |
| DOC-24 | Cybersecurity declaration of conformity (CRA) | CRA | NOT_EXECUTED |

Zero documents are executed. A draft is not an executed document and cannot close a
gate.

## 5. Website findings (34 open)

| Severity | Count | IDs / note |
|---|---|---|
| BLOCKING | 6 | WEB-001 … WEB-006 |
| MAJOR | 20 | incl. claims, consent, checkout, legal identity, accessibility gaps |
| MINOR | 4 | — |
| INFORMATIONAL | 4 | — |

All 34 are `NOT_REMEDIATED` at source and `PLANNED_NOT_REMEDIATED` in MC-15; 0 are
closed. The blocking items are legal/claims/identity defects that no MC-16 design can
remediate. MC-16 treats every finding as open and does not touch the affected pages.

## 6. MC-16 preconditions (10 unmet)

| Precondition | Status |
|---|---|
| PRE-MC16-01 — written MC-16 authorization separate from MC-15 | NOT_GRANTED |
| PRE-MC16-02 — all 13 release gates closed with verified external evidence | OPEN 0/13 |
| PRE-MC16-03 — all 24 required documents executed and verified | OPEN 0/24 |
| PRE-MC16-04 — all 34 website findings remediated and independently reviewed | OPEN 0/34 |
| PRE-MC16-05 — verified legal identity and approved consumer terms | BLOCKED |
| PRE-MC16-06 — approved price list, VAT basis and stock provenance | NONE |
| PRE-MC16-07 — trademark clearance and recorded public-use decision | NOT_GRANTED |
| PRE-MC16-08 — chart, weather and software licensing cleared | NOT_CLEARED |
| PRE-MC16-09 — privacy, DPIA and processor agreements complete | BLOCKED |
| PRE-MC16-10 — PILOT safety case and independent review complete | BLOCKED |

## 7. Inherited debt (carried open, never repaired by MC-16)

| ID | Class | Detail | Verified state |
|---|---|---|---|
| V-18 | INHERITED_VALIDATOR_STATE_DEBT | `scripts/check-marea-financial-model.mjs` still asserts “No MC-14 execution — registry row 14 is not PLANNED”, which is stale because MC-14/MC-15 executed. | `npm run test:financial` → `77 checks - 76 PASS / 1 FAIL`, exit 1 (2026-11-03) |
| F-05 | MC13_RESIDUAL_DEBT (MINOR) | Financial data contract A-15 still says “- paymentFees”; A-13…A-23 ids misaligned. | OPEN, explicit reason |
| F-11 | MC13_RESIDUAL_DEBT (MINOR) | Average-value field is a static base-case figure across 24 cases; D13 ST-17 wording conflicts with the JSON. | OPEN, explicit reason |
| F-14 | MC13_RESIDUAL_DEBT (INFORMATIONAL) | CI does not run the financial gate; accepted risk disclosed in D21 §8. | OPEN, CI not wired |
| GSC-01 | MC15_OPERATIONAL_DEBT (MAJOR, pre-existing) | `/traslados` is public, indexable, self-canonical and in the sitemap but reports “not recognized / discovered, not indexed”. | OPEN |
| GSC-02 | MC15_OPERATIONAL_DEBT (MINOR) | Home URL submitted as a sitemap reports 1 error; `sitemap.xml` is valid and error-free. | OPEN |

None of these is an MC-16 regression. V-18 must be fixed in the financial milestone or
formally reclassified by the Lead; changing the frozen financial data from MC-16 would
be a scope violation. `review-findings.json` for MC-16 is deliberately empty and
`PENDING_INDEPENDENT_AUDIT`: the author has no findings to declare and cannot review
their own work.

## 8. External evidence register

```text
trademarkLegalClearance   = NOT_GRANTED
mareaPublicUse            = NO_GO
sourceIpClearance         = NOT_CLEARED
licensingRightsGranted    = false
formalSupplierQuotations  = NONE
priceApproved             = NONE
customerWtpValidated      = false
customerEvidence          = NONE
ceMarkingClaim            = PROHIBITED
nmea2000Certified         = false
testedCompatibilityRows   = 0
publicationAuthorized     = false
productionDeployment      = NOT_AUTHORIZED
```

There is no document in the repository that changes any of these values. MC-16 must
not create one, quote one as existing, or imply one through a product label, dataset
field, test fixture or handoff.

## 9. Closure rules

A gate may move to `CLOSED_VERIFIED` only when all of the following are true:

1. the named closure owner records the decision;
2. a `marea_release_gate_evidence` record exists with `evidenceClass =
   VERIFIED_EXTERNAL`, `verified = 1`, non-expired, non-revoked status, issuer, issue
   date, scope and content hash;
3. the evidence type matches the gate (e.g. `PRICE_APPROVAL` for pricing);
4. the gate's `closureEvidenceIds` resolve to that usable evidence;
5. an audit event records the change with actor, role, reason and evidence refs;
6. the independent reviewer verifies the evidence exists and is current.

An internal note, a passing validator, a test fixture, a draft document, a decision
record or an admin click satisfies none of these. The current state is 0 of 13.

## 10. Consequences for MC-16 design

- All MAREA products are `NOT_FOR_SALE`; every purchasability evaluation returns
  `allowed = false`, `effectivePrice = null`, `effectiveStock = null` (D07).
- No MAREA price may be displayed, converted to a public offer or rounded to zero
  (D08).
- No verified stock exists; admin-entered stock is not a provenance source (D09).
- No real subscription or entitlement grant may be created; local safety functions
  stay independent of billing (D10).
- No FLEET tenant data may be stored; tenancy is a contract only (D11).
- No proposed route may be published or indexed; no Product/Offer JSON-LD may be
  emitted (D15).
- MC-17 may present definitions, readiness and blocked CTA states only (D18).

## 11. Maintenance

This register is derived, not authoritative for gate status: the MC-14 gate dataset
owns the value, and MC-16 copies it. If a gate or finding changes, the copy must be
refreshed by the owning milestone and re-verified; MC-16 must never edit the source
dataset to match its own narrative. The blocker register in
`docs/marea/commerce-data/data/blocker-register.json` must remain consistent with the
counts in §2; the package validator (`BLK-*` checks) fails on drift.
