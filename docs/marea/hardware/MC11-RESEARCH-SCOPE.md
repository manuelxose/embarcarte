# MC-11 — Hardware research scope and method (D1)

Status: `INTERNAL_ENGINEERING_RESEARCH`. Milestone MC-11 of the 36-prompt MAREA program.
Branch: `feature/marea-mc11-hardware-sourcing-conformity`.
Base: MC-10R HEAD `67131782edaf8f3f8327ba79e5c5b4c554b137b0` (verified local and remote on 2026-11-02).
Research window: desk/engineering research session from **2026-11-02**; every retrieved external
observation carries its own access date. No supplier was contacted, no quotation requested, no
purchase made and no physical test executed.

Commercial publication: NOT AUTHORIZED. MAREA trademark: INTERNAL ONLY, clearance `NOT_GRANTED`.
Sales and pre-orders: BLOCKED. Production: NOT AUTHORIZED. Conformity certification: NOT
ESTABLISHED. `PILOT_SAFETY_GATE = BLOCKED`. Customer evidence: NONE (MC-10 `BLOCKED`).

## 1. Purpose

Decide, from verifiable engineering and public-source evidence, which MAREA hardware architectures
are technically credible, what they would realistically require to manufacture and certify, what can
currently be costed, and which decisions must remain open before commercial investment.

MC-11 is **pre-industrialisation engineering**, not a production release. It must separate four
things that are routinely confused:

| Category | MC-11 treatment |
|---|---|
| Public-source observation (datasheet, distributor price, official EU text) | Classified, dated, URL-linked |
| Engineering assumption or calculated estimate | Labelled `ENGINEERING_ASSUMPTION` / `CALCULATED_ESTIMATE`, never presented as a quote |
| Physical test, sample, quotation, certification | `NOT_EXECUTED` / `NOT_OBTAINED` / `NOT_ESTABLISHED` — explicitly blocked |
| Commercial decision | Remains open; no price, sale or publication is authorised |

## 2. Research questions (the mandated 20, and where each is answered)

| # | Question | Primary deliverable |
|---|---|---|
| 1 | Which families require proprietary physical hardware? | D3, D10 |
| 2 | Which can be software-only or layered on third-party equipment? | D10, D29 |
| 3 | Necessary versus optional hardware capabilities? | D3, D4 |
| 4 | Can commercial modules support credible early prototypes? | D4, D11 |
| 5 | What must change from prototype to manufacturable product? | D4, D15 |
| 6 | Which processor/MCU/gateway/network architectures are plausible? | D4, D7 |
| 7 | How should NMEA 2000/0183, Ethernet, Wi-Fi, BLE, cellular be assessed? | D6 |
| 8 | How should power, grounding, protection and marine noise be handled? | D5 |
| 9 | Which reliability/environmental requirements are likely material? | D17 |
| 10 | Which architectures minimise hardware complexity? | D4, D29 |
| 11 | Which modules have verifiable manufacturers and sourcing channels? | D11, D12 |
| 12 | Which observed prices are real quotations versus catalogue observations? | D13 |
| 13 | Plausible engineering BOM and landed-cost ranges? | D19–D22 |
| 14 | How do quantity, yield, installation and warranty change economics? | D21, D22 |
| 15 | Which conformity routes and cybersecurity obligations apply? | D23, D24, D27 |
| 16 | Which certification claims are currently prohibited? | D26, D30 |
| 17 | What must be verified before freezing an architecture? | D30, gate G1 |
| 18 | What must be validated before prototype/manufacturing commitment? | D30, gates G2–G7 |
| 19 | Which risks make a product configuration uneconomic? | D22, D30 |
| 20 | What must be deferred until customer discovery is complete? | D29, D31 |

## 3. Authorised activities

Internal engineering analysis inside the repository: reviewing existing hardware architecture and
repository evidence; studying public datasheets and official standards/regulatory texts; observing
public distributor and manufacturer catalogue prices; mapping manufacturers and sourcing
alternatives; assessing candidate architectures; building preliminary engineering BOMs; modelling
hypothetical manufacturing costs; preparing RFQ packages **without sending them**; preparing
prototype and qualification test plans; building conformity matrices; writing data validators;
updating the milestone registry; producing an independently audited stacked draft PR.

## 4. Prohibited activities (unchanged by this milestone)

No supplier contact, distribution or manufacturer enquiry, RFQ transmission, account creation,
price negotiation, purchase, sample order, laboratory hire, certification commissioning, vessel
installation, sea trial, customer contact, actuator/motor-control implementation, production change,
publication, or certification/performance claim. A future external action requires its own explicit
authorisation; MC-11 grants none. The MC-10 customer-contact control and a supplier-procurement
control are **different** controls and neither is inherited from the other.

## 5. Source discipline

1. **Hierarchy.** Component manufacturer > authorised distributor > official standards/regulatory
   body > third-party reseller > independent technical commentary. A reseller does not establish
   manufacturer specification; a manufacturer does not establish market price or reliability.
2. **Evidence classes** (verbatim, one per external commercial figure):
   `MANUFACTURER_PUBLIC_LIST_PRICE`, `AUTHORIZED_DISTRIBUTOR_PUBLIC_PRICE`,
   `THIRD_PARTY_RESELLER_PUBLIC_PRICE`, `HISTORICAL_OBSERVATION`, `CALCULATED_ESTIMATE`,
   `ENGINEERING_ASSUMPTION`, `BUDGETARY_INDICATION`, `FORMAL_SUPPLIER_QUOTATION`, `UNKNOWN`.
3. `FORMAL_SUPPLIER_QUOTATION` may be used **only** for a genuine attributable quotation. None
   exists in MC-11. Therefore `MC11_FORMAL_PROCUREMENT_EVIDENCE = BLOCKED_OR_NOT_OBTAINED`.
4. An online shopping cart, basket, "add to quote" or distributor web price is **not** a negotiated
   wholesale quotation.
5. An inaccessible page is `INACCESSIBLE`; an outdated one `STALE`; a contradicted claim
   `CONTRADICTED`. None becomes "verified" by repetition.
6. `UNKNOWN` is a valid value and is never rendered as `0`, "free", "included" or "negligible".
7. No source date is invented. Retrieval dates are the real dates of this session.

## 6. Deliverables (D1–D37 are MC-11 deliverable numbers, not milestones)

| ID | Deliverable | Path |
|---|---|---|
| D1 | Research scope (this document) | `docs/marea/hardware/MC11-RESEARCH-SCOPE.md` |
| D2 | Baseline and governance | `docs/marea/hardware/MC11-BASELINE-AND-GOVERNANCE.md` |
| D3 | Portfolio hardware map | `architecture/MC11-PORTFOLIO-HARDWARE-MAP.md` |
| D4 | Embedded architecture options | `architecture/MC11-EMBEDDED-ARCHITECTURE-OPTIONS.md` |
| D5 | Marine electrical architecture | `architecture/MC11-MARINE-ELECTRICAL-ARCHITECTURE.md` |
| D6 | Protocol and compatibility assessment | `architecture/MC11-PROTOCOL-AND-COMPATIBILITY-ASSESSMENT.md` |
| D7 | HUB architecture | `architecture/MC11-HUB-ARCHITECTURE.md` |
| D8 | WATCH and SENSE architecture | `architecture/MC11-WATCH-SENSE-ARCHITECTURE.md` |
| D9 | AIS, DISPLAY and PILOT boundaries | `architecture/MC11-AIS-DISPLAY-PILOT-BOUNDARIES.md` |
| D10 | Software-first hardware dependencies | `architecture/MC11-SOFTWARE-FIRST-HARDWARE-DEPENDENCIES.md` |
| D11 | Component and manufacturer landscape | `sourcing/MC11-COMPONENT-AND-MANUFACTURER-LANDSCAPE.md` |
| D12 | Supplier register | `sourcing/MC11-SUPPLIER-REGISTER.md` |
| D13 | Public price evidence | `sourcing/MC11-PUBLIC-PRICE-EVIDENCE.md` |
| D14 | RFQ package (not sent) | `sourcing/MC11-RFQ-PACKAGE-NOT-SENT.md` |
| D15 | Manufacturing routes | `manufacturing/MC11-MANUFACTURING-ROUTES.md` |
| D16 | DFM, DFT and quality plan | `manufacturing/MC11-DFM-DFT-AND-QUALITY-PLAN.md` |
| D17 | Environmental reliability plan | `manufacturing/MC11-ENVIRONMENTAL-RELIABILITY-PLAN.md` |
| D18 | Service, warranty and RMA | `manufacturing/MC11-SERVICE-WARRANTY-AND-RMA.md` |
| D19 | Engineering BOM | `economics/MC11-ENGINEERING-BOM.md` |
| D20 | Preliminary manufacturing BOM | `economics/MC11-PRELIMINARY-MANUFACTURING-BOM.md` |
| D21 | Hardware cost model | `economics/MC11-HARDWARE-COST-MODEL.md` |
| D22 | Cost uncertainty and volume scenarios | `economics/MC11-COST-UNCERTAINTY-AND-VOLUME-SCENARIOS.md` |
| D23 | EU regulatory applicability | `conformity/MC11-EU-REGULATORY-APPLICABILITY.md` |
| D24 | CE/EMC/RED and testing roadmap | `conformity/MC11-CE-EMC-RED-AND-TESTING-ROADMAP.md` |
| D25 | NMEA licensing and certification roadmap | `conformity/MC11-NMEA-LICENSING-AND-CERTIFICATION-ROADMAP.md` |
| D26 | Conformity blocker register | `conformity/MC11-CONFORMITY-BLOCKER-REGISTER.md` |
| D27 | Device security and lifecycle | `firmware-security/MC11-DEVICE-SECURITY-AND-LIFECYCLE.md` |
| D28 | Firmware IP and supply chain | `firmware-security/MC11-FIRMWARE-IP-AND-SUPPLY-CHAIN.md` |
| D29 | Engineering feasibility assessment | `docs/marea/hardware/MC11-ENGINEERING-FEASIBILITY-ASSESSMENT.md` |
| D30 | Decision and risk register | `docs/marea/hardware/MC11-DECISION-AND-RISK-REGISTER.md` |
| D31 | MC-12 handoff | `docs/marea/hardware/MC11-MC12-HANDOFF.md` |
| D32 | Machine-readable records | `docs/marea/hardware/data/*.json` |
| D33 | Validator | `scripts/check-marea-hardware.mjs` |
| D34 | Validator negative tests | `scripts/check-marea-hardware.test.mjs` |
| D35 | Independent review | `docs/marea/hardware/review/MC-11-REVIEW.md` |
| D36 | Executive report (Spanish) | `docs/marea/hardware/MC11-EXECUTIVE-REPORT.md` |
| D37 | Delivery record | `docs/marea/hardware/MC-11-DELIVERY.md` |

## 7. Method for the engineering decision content

- **Architectures are proposals.** Every architecture carries `status: PROPOSED_NOT_APPROVED`,
  scoring criteria weights frozen before scoring (D2 §7), and an explicit list of what would have to
  be verified before freezing.
- **BOMs are engineering BOMs.** A line inherits the weakest evidence class of its inputs. A total
  containing any `UNKNOWN`/`COST_UNVERIFIED` material input is reported `INCOMPLETE`, never as a
  complete unit cost.
- **Quantities are scenarios, not commitments.** Volume tiers 1 / 10 / 100 / 500 / 1 000. No
  wholesale discount is invented when no quotation exists; volume effects are modelled as explicit
  `ENGINEERING_ASSUMPTION` factors with their own risk note.
- **Regulation is per configuration.** A directive is included only with a written applicability
  rationale for the actual function, supply, radio interfaces and economic-operator role, or
  excluded with a written non-applicability rationale. Uncertain interpretations are marked for
  qualified review; no declaration of conformity is produced.
- **NMEA.** Technical implementation, membership/licensing, manufacturer identification, product
  certification, approved terminology and logo use are six different questions. None is satisfied by
  this milestone: `nmea2000Certified = false`, `testedCompatibilityRows = 0`.
- **Safety.** `PILOT_SAFETY_GATE = BLOCKED` throughout. No actuator path, no motor control, no
  steering command is designed or implemented. AIS transmit is out of scope and prohibited.

## 8. Team, write scopes and integration

| Member | Role | Exclusive write scope |
|---|---|---|
| `lead` | Chief Hardware Program Architect; Git; integration; D1, D2, D29, D30, D31, D36, D37; validator | `docs/marea/hardware/*.md` (root), `data/manifest.json`, `data/risks.json`, `data/decisions.json`, `data/governance-status.json`, `scripts/check-marea-hardware*.mjs`, registry, decision log |
| `hw-architect` | Embedded hardware and marine electronics architect (A) | `docs/marea/hardware/architecture/`, `data/hardware-families.json`, `data/architecture-options.json`, `data/compatibility-requirements.json`, `data/nmea-status.json` |
| `sourcing-specialist` | Component and supplier intelligence (B) | `docs/marea/hardware/sourcing/`, `data/component-register.json`, `data/supplier-register.json`, `data/price-observations.json` |
| `bom-cost-engineer` | BOM and manufacturing cost engineer (C) | `docs/marea/hardware/economics/`, `data/engineering-bom.json`, `data/manufacturing-bom.json`, `data/cost-scenarios.json` |
| `conformity-specialist` | EU regulatory and conformity (D) | `docs/marea/hardware/conformity/`, `data/conformity-applicability.json` |
| `manufacturing-engineer` | Marine reliability and manufacturing (E) | `docs/marea/hardware/manufacturing/`, `data/qualification-plan.json` |
| `security-engineer` | Embedded security, firmware and systems integration (F) | `docs/marea/hardware/firmware-security/` |
| `qa-reviewer` | Independent technical and evidence auditor (G) | `docs/marea/hardware/review/`, `data/review-findings.json` |

Rules: one writer per scope, no concurrent edits to the same file, Lead-only Git writes, no destructive
checkout/reset by specialists, review against a fixed commit. A specialist does not audit its own
work and the auditor does not author what it audits.

## 9. Verdict policy (fixed before results)

Internal engineering scope may reach `PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE` only if D2 §10's
acceptance list is fully evidenced. Because the authoritative registry requires **real supplier
quotation evidence**, the full milestone verdict cannot be `PASS`: it is reported
`PARTIAL — INTERNAL FEASIBILITY PASS; FORMAL SUPPLIER QUOTATIONS NOT OBTAINED`, with
`MC11_FORMAL_PROCUREMENT_EVIDENCE = BLOCKED_OR_NOT_OBTAINED`. The registry requirement is never
rewritten to manufacture a PASS.

## 10. Known limitations

Single-session desk research; prices and availability change continuously; distributor prices are
typically single-unit, VAT-inclusive retail, not wholesale; datasheet parameters are vendor
declarations, not independently measured; no DUT exists, so no electrical, thermal, EMC, ingress or
compatibility measurement is possible; regional stock, lead time and MOQ are unknowable without
contact; EU applicability text is interpreted, not legally certified; and no customer requirement
exists to prioritise any hardware feature.
