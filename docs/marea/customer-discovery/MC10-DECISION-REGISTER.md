# MC-10 — Decision and risk register

| Field | Value |
| --- | --- |
| Document ID | MC-10 / D21 / MC10-DECISION-REGISTER |
| Status | `ACTIVE` |
| Decisions recorded | D-029 … D-033 (programme log) |
| Milestone status | `BLOCKED` |
| Date | 2026-11-01 |
| Machine-readable mirror | `data/decisions.json` |

## 1. Decisions

### D-029 — MC-10 stops at the outreach authorization gate and reports BLOCKED, not PASS

- **Context.** The Master Prompt states that customer outreach requires explicit separate
  authorization and that the execution request does not itself authorize external contact. No
  authorization record was issued.
- **Decision.** MC-10 records `OUTREACH_AUTHORIZATION = NOT_GRANTED`, `FIELDWORK_STATUS = BLOCKED`,
  delivers the complete Wave 0 preparation package, and reports the milestone as `BLOCKED` for the
  primary-research scope. Preparation is not converted into an apparent research PASS.
- **Rationale.** Faking fieldwork or passing a research milestone on preparation would violate the
  programme's central rule: research integrity and zero fabricated participants.
- **Consequences.** 0 participants, 0 interviews, 0 price responses; the ten experiments are
  `BLOCKED`; no product or bundle evidence exists. The correct outcome is an honest blocked milestone.
- **Evidence.** `MC10-FIELDWORK-AUTHORIZATION.md`, `data/fieldwork-authorization.json`,
  `data/research-status.json`, `MC10-EXPERIMENT-RESULTS.md`.
- **Status effect.** No commercial status changes.

### D-030 — The MC-09 priority order remains unvalidated and no product or bundle advances

- **Context.** MC-09 produced desk-research scores for nine families and six bundles. MC-10 was
  expected to challenge them with primary evidence; none exists.
- **Decision.** All nine families and six bundles are `NOT_TESTED`. The MC-09 ranking is preserved
  unchanged as historical prioritisation, neither confirmed nor contradicted. No product readiness is
  upgraded and no product is advanced, deferred or discontinued on zero interviews.
- **Rationale.** Absence of evidence is not evidence of absence; an empty dataset cannot support a
  portfolio decision.
- **Consequences.** `ADVANCE_TO_QUANTITATIVE_VALIDATION`, `DEFER`, `DISCONTINUE_RECOMMENDED` and
  `INCONCLUSIVE` are all unavailable for MC-10. Only `NOT_TESTED` is honest.
- **Evidence.** `MC10-PRODUCT-PRIMARY-EVIDENCE.md`, `MC10-BUNDLE-PRIMARY-EVIDENCE.md`,
  `data/product-evidence.json`, `data/bundle-evidence.json`.
- **Status effect.** No lifecycle change, no investment approval.

### D-031 — Instruments and thresholds are frozen before fielding; Portuguese versions withheld

- **Context.** The MC-09 registry and instrument suite must be immutable once fielding starts.
- **Decision.** Instruments are frozen at version 1.0.0 with the real SHA-256 of the MC-09 discovery
  plan; the ten experiment records are frozen by SHA-256 of their canonical JSON. Any change requires
  a dated amendment and a new version, with previously collected data evaluated under the version in
  force. Portuguese instruments are `NOT_PRODUCED` without qualified linguistic review, so northern
  Portugal cannot be fielded.
- **Rationale.** Post-hoc threshold or instrument changes are the most common way a qualitative study
  is made to say what its authors wanted.
- **Consequences.** Silent modification is machine-detectable; a legitimate amendment has an audit trail.
- **Evidence.** `methodology/MC10-INSTRUMENT-VERSIONS.md`, `methodology/instruments.json`,
  `data/experiments.json`, `scripts/check-marea-customer-research.mjs`.
- **Status effect.** None on commercial state.

### D-032 — No commercial restriction is weakened and stated preference remains NOT_MEASURED

- **Context.** Even a positive customer study could not clear legal or safety blockers; here there is
  no study at all.
- **Decision.** Trademark `NOT_GRANTED`, source IP `NOT_CLEARED`, sales `BLOCKED`, publication
  `BLOCKED`, deployment `NOT_AUTHORIZED`, profitability `NOT_ESTABLISHED`, PILOT safety gate
  `BLOCKED`, compatibility `NO`, approved prices `0`, orderable products `0` are all unchanged.
  `WTP_STATED_PREFERENCE_OBSERVED = false`; `WTP_COMMERCIALLY_VALIDATED = false`.
- **Rationale.** A research milestone never becomes a commercial approval.
- **Consequences.** The frozen price ladders are hypotheses only; no page, offer, CTA or copy changed.
- **Evidence.** `data/governance-status.json`, `pricing/MC10-GABOR-GRANGER.md`,
  `pricing/MC10-VAN-WESTENDORP.md`, `MC10-POSITIONING-RECOMMENDATIONS.md`.
- **Status effect.** No price approval, publication, order path or commercial claim.

### D-033 — MC-11 cannot inherit customer evidence and must first unblock fieldwork or re-scope

- **Context.** MC-11 is the hardware, supplier, conformity and feasibility milestone. It was expected
  to use MC-10 customer findings to prioritise hardware work.
- **Decision.** MC-11 receives an explicit statement that no customer evidence exists. Its handoff
  separates internal questions that can be researched without customers from customer questions that
  remain behind `AUTH-MC10-001`. MC-11 may not present any hardware, BOM supplier order, conformity
  claim or price as customer-validated.
- **Rationale.** A missing input must be recorded as missing, not silently substituted with desk
  research or assumptions.
- **Consequences.** MC-11 planning must carry the blocked-fieldwork dependency; customer-driven
  prioritisation remains unavailable.
- **Evidence.** `MC10-MC11-HANDOFF.md`.
- **Status effect.** No hardware, BOM, supplier or conformity authorisation.

## 2. Risk register

| ID | Risk | Likelihood | Impact | Mitigation | Status |
| --- | --- | --- | --- | --- | --- |
| R-01 | Preparation is misread as completed customer research | Medium | High | Status banner on every document; validator rejects positive counts without records; delivery states BLOCKED | Controlled |
| R-02 | Authorization is inferred from the Master Prompt or PR | Medium | High | Explicit inference guard in `fieldwork-authorization.json` and D2; auditor verifies | Controlled |
| R-03 | Participant identity or contact data leaks into Git | Low | High | Three-layer model; repository contains aggregate only; PII scan in validator; no Layer A/B store exists | Controlled |
| R-04 | Thresholds are altered after any future fielding | Low | High | SHA-256 freeze and recomputation in the validator; amendment procedure | Controlled |
| R-05 | Price ladders are mistaken for approved prices | Medium | High | Ladders labelled `PRE_REGISTERED_HYPOTHESIS`, `approvedPrice = false`, `responses: []`; no publication | Controlled |
| R-06 | A future agent fabricates interviews to satisfy quotas | Low | Critical | Validator requires consent, real dates, record provenance; auditor adversarial tests; independent review | Controlled |
| R-07 | Commercial pressure converts a positive sentiment into a sale claim | Medium | High | Governance invariants unchanged; prohibited-claim scan; delivery limits | Controlled |
| R-08 | MC-11 proceeds as if customer evidence existed | Medium | Medium | Explicit MC-11 handoff statement and registry note | Controlled |
| R-09 | Legal basis or controller is assumed rather than designated | Medium | High | Recorded as BLOCKED blockers; cannot be satisfied by documentation | Open — external |
| R-10 | No interviewer panel means fieldwork stays blocked even if authorized | High | High | Recorded as environment constraint `BLK-MC10-06`; requires human interviewers | Open — external |

## 3. Open decisions for the programme owner

| ID | Question | Blocking? | Owner |
| --- | --- | --- | --- |
| OD-01 | Issue AUTH-MC10-001 with real scope and fieldwork lead | Yes | Programme owner |
| OD-02 | Designate data controller and privacy contact | Yes | Programme owner |
| OD-03 | Commission legal review (GDPR + LOPDGDD + Lei 58/2019) | Yes | Legal adviser |
| OD-04 | Provision Layer A/B secure stores | Yes | Data steward |
| OD-05 | Approve zero-incentive policy and confirm no spend | Yes | Programme owner |
| OD-06 | Assign and train human interviewers | Yes | Fieldwork lead |
| OD-07 | Decide whether northern Portugal is in scope and fund PT instruments | No | Programme owner |
| OD-08 | Decide MC-11 sequencing in light of zero customer evidence | No | Programme owner |
| OD-09 | Reconcile the 37–57 per-segment quota sum with the 40–80 total (PI-01) | Yes | Research methodologist + programme owner |
| OD-10 | Resolve the three conflicting segment minimum/target readings (PI-02) | Yes | Research methodologist + programme owner |
| OD-11 | Amend instruments IV-01…IV-09 (incl. monitoring incident question, exclusion-first ordering, concept-set alignment) to v1.1.0 with hashes before fielding (PI-04/PI-05) | Yes | Research methodologist |
| OD-12 | Decide the pricing minimum for SEG-04/05/06/08 or record `BELOW_REGISTERED_MINIMUM` (PI-03) | Yes | Research methodologist + pricing economist |

## 4. Status effect

```
DECISIONS_RECORDED = 5
BLOCKING_OPEN_DECISIONS = 10
PLANNING_DEFECTS_REGISTERED = 4
MILESTONE = BLOCKED
COMMERCIAL_RESTRICTIONS_CHANGED = NONE
```
