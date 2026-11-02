# MC-11 — Decision and risk register (D30)

Status: `INTERNAL_ENGINEERING_FEASIBILITY`. Milestone MC-11 of 36. Date: 2026-11-02.
Branch: `feature/marea-mc11-hardware-sourcing-conformity`.
Machine-readable counterparts: `data/decisions.json` (decisions D-041…D-047, gates G1–G7) and
`data/risks.json` (39 risks). This document indexes them; it creates no approval.

## 1. Decisions taken in MC-11 (summary; detail in `data/decisions.json`)

| ID | Decision | Effect |
|---|---|---|
| D-041 | MC-11 is internal hardware feasibility only; formal procurement evidence stays blocked | Verdict PARTIAL; `MC11_FORMAL_PROCUREMENT_EVIDENCE = BLOCKED_OR_NOT_OBTAINED` |
| D-042 | No architecture is frozen; HUB-D is the engineering preference, HUB-E is a commercial-strategy question | G1 remains `CANDIDATE_ONLY` |
| D-043 | AIS transmitter development prohibited; receive-only through third-party certified equipment | `AIS_TRANSMISSION_OFFERED = false` |
| D-044 | PILOT remains safety-blocked with a documented deferral disposition | `PILOT_SAFETY_GATE = BLOCKED` |
| D-045 | Hardware price and claim grading rules adopted as binding | Evidence classes enforced in every artefact |
| D-046 | RFQ packages prepared but not sent; supplier engagement and purchasing unauthorised | 0 contacts, 0 quotes, 0 purchases |
| D-047 | The data contract and 54-check validator become the hardware evidence gate | Deterministic gate for all later updates |

## 2. Gates for future physical development (all closed)

| Gate | State | What would be required to open it |
|---|---|---|
| G1 Architecture selection | `CANDIDATE_ONLY` | Documented tradeoff review + responsible engineering approval + customer requirement evidence (or an explicitly accepted risk) |
| G2 Supplier engagement | `NOT_AUTHORIZED` | Explicit permission naming suppliers and scope, plus budget authority |
| G3 Prototype procurement | `NOT_AUTHORIZED` | Approved budget, approved BOM revision, selected suppliers, purchasing authority |
| G4 Prototype testing | `NOT_AUTHORIZED` | Safe test plans, equipment, qualified personnel, test authorisation |
| G5 Marine integration testing | `NOT_AUTHORIZED` | Vessel-specific safety review, installation permission, qualified personnel |
| G6 Regulatory evaluation | `NOT_STARTED` | Frozen configuration, technical file, real test evidence, qualified external involvement |
| G7 Production release | `NOT_AUTHORIZED` | Formal engineering, quality, legal and commercial approval |

## 3. Risk register summary (39 risks; mitigations proposed, none implemented)

| Domain | Count | Highest-impact items |
|---|---|---|
| ENGINEERING | 9 | RISK-ENG-01 no prototype/measurement; RISK-ENG-06 zero tested compatibility; RISK-ENG-02 unvalidated marine transient protection |
| MARINE_OPERATION | 5 | RISK-MAR-04 WATCH may drain the monitored battery (CRITICAL); RISK-MAR-01 salt/humidity unverified; RISK-MAR-05 alert delivery cannot be guaranteed |
| SOURCING | 7 | RISK-SOURCING-01 GNSS MAX-M10 family EOL; RISK-SOURCING-02 secure element NRND; RISK-SOURCING-04 consumer compute lifecycle |
| COMMERCIAL | 5 | RISK-COM-01 no customer evidence (CRITICAL); RISK-COM-02 BOM may exceed price hypotheses (CRITICAL); RISK-COM-04 low-volume amortisation |
| LEGAL | 7 | RISK-LEG-02 OPEN-MARINE IP NOT_CLEARED (CRITICAL); RISK-LEG-03 no technical file (CRITICAL); RISK-LEG-07 liability/insurance (CRITICAL) |
| SAFETY | 2 | RISK-SAF-01 PILOT gate (CRITICAL); RISK-SAF-02 AIS data/transmission boundary |
| SECURITY | 4 | RISK-SEC-01 unsigned/non-recoverable updates; RISK-SEC-02 NRND root of trust; RISK-SEC-03 no vulnerability handling or support period |

Distribution: impact CRITICAL 7, HIGH 28, MEDIUM 3, LOW 1. Blocker status BLOCKED 15, OPEN 23,
MONITORED 1. Evidence strength DOCUMENTED 22, ASSUMED 17. No risk is closed, and a proposed mitigation
is never recorded as implemented.

The seven CRITICAL risks are `RISK-MAR-04`, `RISK-COM-01`, `RISK-COM-02`, `RISK-LEG-02`,
`RISK-LEG-03`, `RISK-LEG-07`, `RISK-SAF-01`. Each is critical because it can independently invalidate
the commercial programme, not because a mitigation is expensive.

## 4. Conformity blockers (from D26; 18 blockers, 8 CRITICAL, none closed)

| ID | Blocker | Why MC-11 cannot close it |
|---|---|---|
| CON-01 | Legal manufacturer/economic-operator identity undetermined | Requires a legal/contractual decision, not engineering |
| CON-02 | Importer/distributor/own-brand roles unassigned per SKU | Requires contractual and legal analysis |
| CON-03 | No technical file for any configuration | Requires a frozen configuration |
| CON-04 | No test evidence, no accredited laboratory, no notified body | Requires G4/G6 authorisation and budget |
| CON-05 | Radio-module host integration obligations unresolved | Requires a frozen radio design |
| CON-06 | Design configuration not frozen (cheapest high-leverage fix) | Requires customer requirements and an engineering decision |
| CON-07 | CRA product classification unknown (default / important / critical) | Requires legal reading of the applicable implementing act |
| CON-08 | Battery removability/replaceability obligations unresolved | Depends on whether a battery is integrated |
| CON-09 | ES/PT producer-responsibility registration not performed | Requires a legal entity and market decision |
| CON-10 | PILOT safety conformity | `PILOT_SAFETY_GATE = BLOCKED` |
| CON-11 | NMEA licensing/certification not obtained | External, funded, and depends on whether NMEA 2000 is implemented at all |
| CON-12 | AIS transmit approval | Prohibited in this stage |
| CON-13 | OPEN-MARINE IP/licence | `SOURCE_IP_CLEARANCE = NOT_CLEARED` |
| CON-14 | Spanish-language instruction rule verified only indirectly | Needs Spanish legal confirmation |
| CON-15 | Packaging producer responsibility | Requires registration and EPR data |
| CON-16 | Voluntary/"unregulated certificate" risk | Commercial policy decision |
| CON-17 | CRA reporting readiness (already in force since 11 September 2026 if in scope) | Requires a process, not a document |
| CON-18 | WEATHER/FLEET software scope under CRA/GDPR | Requires legal classification of the service |

## 5. Automated validation mapping (the 50 mandated rules)

`scripts/check-marea-hardware.mjs` implements each mandated rule as a named check and the negative test
suite proves each one fails when violated. Mapping of the Master Prompt §27 rules to the check IDs:

| Rule | Check | Rule | Check |
|---|---|---|---|
| 1 Unknown product IDs | V01 | 26 WTP validated | V26 |
| 2 Unknown bundle IDs | V02 | 27 Compatibility TESTED | V27 |
| 3 Missing product coverage | V03 | 28 Compatibility SUPPORTED | V28 |
| 4 Missing bundle coverage | V04 | 29 NMEA certification claim | V29 |
| 5 Duplicate component IDs | V05 | 30 CE from components | V30 |
| 6 Duplicate supplier identity | V06 | 31 Applicable without rationale | V31 |
| 7 Component without datasheet evidence | V07 | 32 Inapplicable without evaluation | V32 |
| 8 Catalogue price as quotation | V08 | 33 Deadline without source | V33 |
| 9 Quotation without provenance | V09 | 34 Compliance from unexecuted plan | V34 |
| 10 Supplier contact claimed | V10 | 35 Environmental rating without test | V35 |
| 11 Purchase without approval | V11 | 36 Guaranteed alert delivery | V36 |
| 12 BOM quantity ≤ 0 | V12 | 37 PILOT gate weakened | V37 |
| 13 Incomplete total as complete | V13 | 38 AIS transmit added | V38 |
| 14 Missing currency | V14 | 39 FLEET default hardware | V39 |
| 15 Mixed VAT without normalisation | V15 | 40 SAIL/COMPLETE fixed price | V40 |
| 16 Price tier mismatch | V16 | 41 OPEN-MARINE IP cleared | V41 |
| 17 Missing observation date | V17 | 42 Trademark cleared | V42 |
| 18 Unsupported stock/lead time | V18 | 43 For-sale enabled | V43 |
| 19 Invented MOQ | V19 | 44 Public copy/checkout changed | V44 |
| 20 FX without rate provenance | V20 | 45 Production deployment authorised | V45 |
| 21 Unknown cost as zero | V21 | 46 Assumption reported as fact | V46 |
| 22 Complete cost without tooling | V22 | 47 Inconsistent quantity totals | V47 |
| 23 Certification cost guaranteed | V23 | 48 Missing second-source risk | V48 |
| 24 Unapproved retail price | V24 | 49 Recommendation as frozen approval | V49 |
| 25 Customer demand from MC-10 | V25 | 50 Procurement complete with no contact | V50 |

Structural checks beyond the mandated list: S01 evidence-reference resolution and duplicate
source detection; S02 canonical editions and cross-file references; S03 manifest completeness and
record-count accuracy; S04 frozen scoring weights and recomputed weighted scores.

## 6. Claim prohibitions in force (excerpt; full list in D24/D25/D27)

Prohibited everywhere: "NMEA 2000 certified / compatible / approved / ready"; the NMEA certified logo;
"CE certified" or "CE marked" for any MAREA product; a declaration of conformity; "IP67/IP68";
any temperature, ingress, shock, vibration or EMC rating; "guaranteed alert delivery"; "tested with
&lt;third-party device&gt;"; "waterproof"; "marine-certified"; "CRA compliant"; "RED compliant";
"pre-certified module, therefore compliant"; any sensor accuracy figure; any price presented as approved;
any availability, stock, lead time, MOQ or warranty duration; "autopilot" as an available capability;
"PILOT approved"; any AIS transmit capability.

## 7. External dependencies that no amount of internal work can close

1. Customer evidence — AUTH-MC10-001 not granted (fieldwork blocked).
2. Supplier quotations, MOQ, lead times, tooling — G2/G3 not authorised.
3. Physical test evidence — G4/G5 not authorised; no prototype.
4. Notified body / laboratory engagement — G6 not started.
5. Manufacturer/economic-operator legal identity — external legal decision.
6. Trademark clearance — DEC-01 external.
7. OPEN-MARINE rights/assignment — external decision with the rights holder.
8. NMEA membership, licence, manufacturer code and certification — external, funded.
9. CRA classification and qualified legal review — external legal input.
10. Marine insurance and product-liability position — external.

## 8. Standing rule

No MC-11 artefact may be cited later as evidence that a gate is open, a price is approved, a product is
certified, a compatibility is verified, a customer demand exists, or a supplier has been engaged. If a
future milestone needs one of those, it must produce its own evidence class.
