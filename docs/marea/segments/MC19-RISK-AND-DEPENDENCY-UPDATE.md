# MC-19/36 — Risk and dependency update

| Field       | Value                                                     |
| ----------- | --------------------------------------------------------- |
| Deliverable | MC-19 risk and dependency update                          |
| Status      | `ACTIVE`                                                  |
| Baseline    | `ba63baa0e529ab9cb482fd929632d359fec1d328`                 |
| Dataset     | `docs/marea/segments/data/mc19-risk-register.json`        |

## 1. Risk register summary (derived from the entries)

```text
total   = 20
blocker = 6
high    = 6
medium  = 8
closed  = 4
```

Closed in this milestone, with evidence:

| Risk | Closed because                                                                                  |
| ---- | ----------------------------------------------------------------------------------------------- |
| R01  | The instruction is recorded and the scope is frozen to Option A (`data/mc19-scope-instruction.json`). |
| R02  | IA decision recorded; validator proves 3 identities and 0 collisions with 21 public / 23 proposed routes. |
| R08  | The MC-20–MC-23 boundary is recorded; no family or bundle page is implemented.                   |
| R13  | The instruction is bound to contract version 1.0.0 and baseline `ba63baa`; a later change needs a new recorded instruction. |

New implementation-phase risks (all open, mitigated, disclosed):

| Risk | Statement                                                                 | Mitigation                                                          |
| ---- | ------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| R15  | A reused preview server could serve a stale build during an evidence run. | Rebuild before the Playwright run; production scan; risk documented. |
| R16  | A public shipowners route could be created later without a decision.      | No reserved public path; validator rejects one; proposed routes frozen. |
| R17  | The internal routes could be prerendered into a static artefact.          | `RenderMode.Server` only; validator rejects Prerender/Client.        |
| R18  | A validator could pass against stale datasets.                            | Re-derived projection + per-file SHA-256 comparison.                 |
| R19  | Source-level guards could pass while a rendered page differs.             | Playwright expectations derive from the same content source.         |
| R20  | The English copy is not professionally translated.                        | Disclosed; automated parity only; no translation-quality claim.      |

## 2. Dependency status

| ID  | Dependency                                              | Status before | Status now | Note                                                       |
| --- | ------------------------------------------------------- | ------------- | ---------- | ---------------------------------------------------------- |
| P01 | Authoritative MC-19 instruction                         | ABSENT        | CLOSED     | Supplied 2026-11-04 by the requesting product owner; recorded verbatim as provenance. |
| P02 | IA/route/entity decision                                | ABSENT        | CLOSED     | `MC19-IA-DECISION.md`; internal namespace; no public path for shipowners. |
| P10 | Approval of the scope, owners and write scopes          | ABSENT        | CLOSED     | The instruction authorises Option A and the internal write scope. A named approver beyond the product owner remains `OUTSTANDING`. |
| P03 | Privacy/DPA/DPIA (enquiry/lead flows only)              | BLOCKED       | BLOCKED    | Unchanged; no enquiry flow implemented.                    |
| P04 | Public copy and claims authorisation                    | ABSENT        | ABSENT     | Unchanged; pages are internal draft copy.                  |
| P05 | Commercial data and pricing                             | ABSENT        | ABSENT     | Unchanged; no price or stock is represented.               |
| P06 | Publication/indexation/deployment and release authorisation | ABSENT    | ABSENT     | Unchanged; no public route, sitemap or deployment.         |
| P07 | Trademark clearance and public use                      | NOT_GRANTED   | NOT_GRANTED | Unchanged.                                                |
| P08 | Source IP and licensing clearance                       | NOT_CLEARED   | NOT_CLEARED | Unchanged.                                                |
| P09 | MC-14 release-gate programme                            | OPEN (0/13)   | OPEN (0/13) | Unchanged.                                                |

## 3. Inherited debt (must remain visible)

```text
FINANCIAL_V18 = INHERITED_OPEN
MC16_FINAL_02 = OPEN_UNTIL_REVERIFIED
MC13_F05 = OPEN
MC13_F11 = OPEN
MC13_F14 = OPEN
MC15_GSC01 = OPEN
MC15_GSC02 = OPEN
```

`npm run test:financial` remains the known inherited red gate (V-18). It is executed and reported in
`MC19-TEST-REPORT.md` with its real result; it is never reported green, and no historical acceptance
criterion was relaxed to obtain a passing suite.

## 4. New dependency for MC-20

MC-20 does not depend on the MC-19 implementation. It may reuse the internal patterns
(`I07`/`I08` in the handoff) but must not assume any public route, publication or commercial
capability exists. See `MC19-MC20-HANDOFF-INPUTS.md`.
