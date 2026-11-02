# MC-11 — D18 Service, warranty and RMA

| Field | Value |
|---|---|
| Document | D18 `MC11-SERVICE-WARRANTY-AND-RMA.md` |
| Status | `PROPOSED_NOT_APPROVED` — `INTERNAL_ENGINEERING_RESEARCH` |
| Milestone | MC-11 (deliverable 18) |
| Branch / base | `feature/marea-mc11-hardware-sourcing-conformity` / MC-10R HEAD `6713178` |
| Date | 2026-11-02 (Europe/Madrid) |
| Owner | `manufacturing-engineer` |
| Machine records | `data/qualification-plan.json`, `data/evidence/manufacturing.json` |

## 0. Status and control block (binding)

```
PRODUCT                  = NONE EXISTS
FIELD POPULATION         = ZERO UNITS
RELIABILITY DATA         = NONE (no MTBF, no FIT, no failure rate, no field return rate)
WARRANTY                 = NOT DEFINED, NOT OFFERED, NOT PRICED
WARRANTY DURATION        = NOT STATED ANYWHERE IN THIS DOCUMENT
RELIABILITY FIGURE       = NOT STATED, NOT ESTIMABLE FROM AVAILABLE EVIDENCE
SUPPORT PERIOD           = NOT DEFINED, NOT ADVERTISED
SPARE PARTS              = NONE INVENTORY, NO SUPPLY AGREEMENT
RMA PROCESS              = NOT IMPLEMENTED, ZERO RETURNS PROCESSED
SERVICE NETWORK          = NONE
CERTIFICATION            = NOT_ESTABLISHED
PILOT_SAFETY_GATE        = BLOCKED
```

**Nothing has been tested, sold, installed or returned.** There is no unit, no customer, no field
data, no RMA record and no service organisation. **No warranty duration, no reliability figure (MTBF,
FIT, failure rate, availability percentage) and no support period is advertised, promised, implied or
quoted in this document or anywhere in MC-11.** Any number of that kind would be fabricated. This
document defines the operations model and, more importantly, states exactly what evidence would have
to exist before any such figure could lawfully and honestly be offered.

---

## 1. Purpose and scope

D18 defines how MAREA would operate service, warranty and RMA **if** a hardware product existed. It
covers:

- the warranty operations model (intake → triage → disposition → repair/replace → return → record);
- a failure-classification taxonomy;
- the replacement procedure and its limits;
- the repairability strategy and its design consequences;
- spare-parts requirements;
- diagnostic logging and the support bundle;
- field firmware recovery;
- installer troubleshooting;
- product traceability;
- the evidence required before offering a warranty duration, a reliability figure or a support period,
  including the CRA support-period interaction.

It does **not** create a warranty, a service commitment, an SLA or a customer promise. Statutory
consumer rights (where they apply) exist independently of any MAREA promise and are a legal matter
for counsel; no duration is stated here.

---

## 2. Warranty operations model (conceptual, not offered)

The model below is a **design for an operations function**, not a commitment to a customer.

```
Customer / installer
   │  symptom + serial + evidence (photos, diagnostic bundle, installation record)
   ▼
Intake & eligibility (manual, needs authorisation)
   │  verify serial, date of manufacture, shipment record, installation record
   │  classify failure (FC-xx), check known-issue register
   ▼
Triage decision
   ├── remote resolvable?  → guided recovery / firmware / configuration (no return)
   ├── replaceable module? → ship module / installer swap (only if spares exist)
   ├── depot repair?       → RMA authorisation, return logistics, repair, recalibrate, retest
   └── reject / chargeable → out-of-scope, customer damage, unauthorised modification
   ▼
Disposition & record
   │  repaired / replaced / scrapped / no-fault-found / customer-damage
   │  update failure statistics, known-issue register, supplier quality feedback
   ▼
Return to customer / disposal (WEEE where applicable)
```

| Function | Candidate owner | Current state |
|---|---|---|
| Intake and eligibility | MAREA support (person/process does not exist) | `NOT_IMPLEMENTED` |
| Technical triage | MAREA engineering | `NOT_IMPLEMENTED` |
| RMA authorisation | MAREA operations | `NOT_IMPLEMENTED` |
| Repair | depot partner / MAREA (none selected) | `NOT_IMPLEMENTED` |
| Reverse logistics | carrier (none selected) | `NOT_IMPLEMENTED` |
| Customer communication | MAREA | `NOT_IMPLEMENTED` |
| Failure data analysis | MAREA quality | `NOT_IMPLEMENTED` |
| Legal/consumer handling | counsel (not engaged) | `NOT_IMPLEMENTED` |

**Important boundary:** remote diagnostics must not become remote control. The device is read-only
toward the vessel; any diagnostic data export is customer-initiated and consent-based. No cloud,
web or mobile path to steering exists or is planned (`REMOTE_HELM_CONTROL = false`).

---

## 3. Failure classification

A shared taxonomy is required before any failure statistics can be trusted. Codes are **proposed**;
no failure has been recorded.

| Code | Class | Definition | Typical evidence | Candidate disposition |
|---|---|---|---|---|
| FC-01 | DOA / infant mortality | Fails at or shortly after first power-up | Installation record, test record, photos | Replace; feed supplier quality |
| FC-02 | Manufacturing defect | Workmanship, solder, assembly, wrong part | Inspection, X-ray, test record | Repair/replace; supplier corrective action |
| FC-03 | Firmware / configuration | Wrong image, corrupt configuration, failed update | Version/hash, logs, recovery record | Remote recovery or reprogram |
| FC-04 | Storage corruption | Data/config loss after power loss or wear | Boot log, storage health, power history | Recover/replace storage; redesign input |
| FC-05 | Sensor / calibration drift | Measurement outside the calibrated envelope | Calibration record, reference comparison | Recalibrate or replace module |
| FC-06 | Connector / cable | Loose, corroded, damaged, strain-damaged | Photos, contact resistance, installation record | Replace cable/connector; install guidance |
| FC-07 | Water ingress / corrosion | Moisture inside, salt corrosion, seal failure | Photos, ingress inspection, installation location | Repair/replace; enclosure/install review |
| FC-08 | Electrical stress | Surge, load dump, reverse polarity, miswire | Damage pattern, installation record, voltage log | Repair/replace; installation guidance |
| FC-09 | Thermal | Over-temperature shutdown, derating, thermal damage | Temperature log, location, sun load | Reposition or derate; design review |
| FC-10 | Radio / connectivity | No network, weak signal, SIM/operator issue | Coverage data, logs, SIM record | Configuration/antenna; operator escalation |
| FC-11 | Mechanical damage | Impact, drop, vandalism, unauthorised modification | Photos, inspection | Chargeable repair or reject |
| FC-12 | Installation error | Wrong wiring, wrong firmware, wrong location | Installation record, photos, logs | Guided correction (not a product defect) |
| FC-13 | No fault found | Reported symptom not reproduced | Test bench result, logs | Return with explanation; monitor |
| FC-14 | Security event | Tamper, key compromise, unauthorised access attempt | Security log, attestation | Revoke, replace, incident process (D27) |
| FC-15 | Obsolescence / end-of-support | Part unavailable, firmware no longer supported | Lifecycle record | Replace or migrate; **support period not defined** |

**Rule:** a failure is classified from evidence, never from the customer's proposed cause. "No fault
found" is a classification, not a dismissal; repeated NFF is a design or diagnostic-information
finding.

---

## 4. Replacement procedure (conceptual)

| Step | Requirement | Current state |
|---|---|---|
| 1 | Customer/installer reports symptom with serial and diagnostic bundle | No support channel exists |
| 2 | Eligibility verified against the (non-existent) warranty terms and statutory rights | `LEGAL_REVIEW_REQUIRED` |
| 3 | Failure classified (FC-xx) | No taxonomy in use |
| 4 | Disposition chosen: remote fix / module swap / depot repair / reject | No decision rules approved |
| 5 | RMA number issued and recorded against the unit serial | No system |
| 6 | Replacement unit reserved **only if spares stock exists** | No stock |
| 7 | Customer data handling: export, deletion, consent, return of old unit | No data process (D27 owns privacy) |
| 8 | Old unit received, inspected, repaired/replaced/scrapped, recorded | No process |
| 9 | Root cause fed to quality and supplier feedback | No process |
| 10 | Failure statistics updated (counts, classes, batch links) | No data |

**No advanced-replacement promise is made.** Advanced replacement requires stocked spares and a
logistics contract, neither of which exists. A policy that promises a replacement before the faulty
unit is returned is a financial exposure that cannot be priced without spares and failure data.

---

## 5. Repairability strategy

Repairability is a **design decision with a cost**, not a slogan. It trades against ingress protection
and unit cost.

| Level | Definition | Design requirements | Trade-off |
|---|---|---|---|
| R0 | No service; replacement only | Sealed/potted; no service opening | Best ingress, worst economics and WEEE profile |
| R1 | Installer-replaceable module | Keyed connectors, accessible mounting, no calibration or self-calibration | Requires connector cost and field procedure |
| R2 | Depot-repairable (module level) | Service opening, replaceable modules, documented test | Requires spares, fixtures, trained depot |
| R3 | Component-level depot repair | Schematic access, rework capability, coating repairable | Highest engineering and skill; usually not economic at low volume |

**Candidate mapping (not approved):**

| Family | Candidate level | Why |
|---|---|---|
| HUB | R2 | Expensive enough to justify repair; service opening conflicts with ingress and must be designed together |
| DISPLAY | R1/R2 | Panel/backlight and touch are the likely failures; bonded front complicates repair |
| WATCH | R1 | Small, sealed, low unit value relative to repair labour; module swap most plausible |
| SENSE modules | R1 | Low unit value; replaceable module in a documented configuration |
| AIS | R2 | RF/antenna connector and receiver front end are the likely failure points |
| PILOT | **BLOCKED** | No product, no design, no safety case; repairability cannot be specified |

**Design rules implied (candidate):**

1. A service opening must be sealed by design (gasket, torque spec, replacement gasket kit) and must
   not create an ingress path that would not exist in a sealed unit.
2. Field-replaceable connectors must be keyed, locking and rated for the environment.
3. Calibration state must survive a module swap (identity + calibration record moved deliberately, not
   silently copied from the old module).
4. Firmware and configuration backup/restore must be possible without returning the unit (D18 §7–8).
5. The service procedure must be written **before** tooling, not after.

No repairability level is chosen; no service procedure exists.

---

## 6. Spare-parts requirements

| Spare category | Candidate requirement | Current state |
|---|---|---|
| Field-replaceable modules (SENSE, cable, antenna, mount) | Stocked or available within an agreed lead time | No stock, no agreement |
| Whole-unit replacement stock | Sufficient for the (undefined) failure rate | `UNKNOWN` — no failure data |
| Connectors, gaskets, seals, fasteners | Service kit per product | `UNKNOWN` |
| Firmware images and recovery media | Retained for every shipped firmware version | No archive |
| Calibration reference equipment | Available for depot/field recalibration | None |
| Test fixtures for repair | One per product for depot test | None |
| Obsolete-part bridge stock | Last-time-buy policy for EOL components | None |
| Documentation (service manual, exploded views, torque specs) | Required for any repair level ≥ R1 | None |

**No stocking level, no spare-part availability period and no "spares available for N years"
statement is made.** Such a promise is a commercial commitment that requires supplier agreements,
inventory funding and a support-period decision — none exists.

---

## 7. Diagnostic logging and the support bundle

| Log element | Purpose | Privacy / security note |
|---|---|---|
| Boot/reset cause and boot counter | Distinguish power loss, watchdog, update failure | No personal data |
| Firmware version and image hash | Reproducibility and update history | None |
| Per-source health: last message time, rate, error counters | Distinguish "no data" from "normal" | No personal data |
| Supply-voltage history (min/max/last) | Brownout and load-dump evidence | None |
| Internal temperature and thermal state | Thermal derating evidence | None |
| Storage health and wear indicators | Wear-out and corruption risk | None |
| Network/connectivity state history | Coverage and operator diagnosis | May contain identifiers — minimisation required |
| Update history: version, result, rollback | Update reliability | None |
| Calibration state and last calibration date | Measurement trust | None |
| Security events (tamper, failed auth) | Incident response | Security-sensitive; access control |
| Position/telemetry (WATCH) | Only if the service and consent require it | **Personal data** — GDPR/DPIA required, not done |

**Support bundle rules (candidate):** customer/installer-initiated export; documented contents;
redaction of personal data where not needed; no silent upload; no remote command; a stated `no
fabricated value` rule (a stale source is exported as stale, never as valid). No logging exists.

**Anti-pattern:** a generic "all systems OK" status. The diagnostic record must show the honest state
of each source; that is the product's core promise (`D7 §4.17`).

---

## 8. Field firmware recovery

| Mechanism | Candidate requirement | Status |
|---|---|---|
| A/B slots | Boot from the previous known-good image after a failed update | `NOT_IMPLEMENTED` |
| Power-loss-safe update | Interrupt at any point without bricking | `NOT_IMPLEMENTED` |
| Signature verification | Refuse unsigned/invalid images | `NOT_IMPLEMENTED` |
| Recovery mode | Documented local recovery (service port/button combination) without opening the enclosure if possible | `NOT_DESIGNED` |
| Factory reset | Restores defaults, preserves diagnostic record, states what is erased | `NOT_DESIGNED` |
| Version visibility | Owner can see the running version | `NOT_FOUND` |
| Remote recovery | **Not offered**; no inbound internet-reachable service | `PROHIBITED_BY_DESIGN` |
| Recovery documentation | Installer-level recovery procedure in the installation manual | `NOT_WRITTEN` |
| Key revocation | Procedure to revoke a lost/stolen/compromised device | `NOT_IMPLEMENTED` (D27) |

**Rule:** a device that cannot be recovered without a factory return is a replacement-only device for
firmware failures. That is an economic and customer-experience decision that must be made before the
enclosure and storage architecture are frozen.

---

## 9. Installer troubleshooting

A future installer guide would follow a symptom-driven decision path. It does not exist; the content
below is a **candidate structure**.

| Symptom | First checks | Escalation |
|---|---|---|
| No power / no LEDs | DC input voltage at connector, fuse, polarity, wiring | Replace unit / RMA after checks |
| Boots but no data | Network link, source device power, cable, firmware version, source health in diagnostics | Export diagnostic bundle |
| Data shown but stale/unknown | Source device, cable, baud/interface configuration, expected rate | Source-side fix; not a MAREA defect by default |
| No connectivity (WATCH) | SIM status, antenna, coverage, operator plan, device registration | Operator/coverage escalation |
| Cannot reach local interface | IP address, DHCP fallback, cable/Wi-Fi, authentication | Documented fallback address |
| Update failed | Power stability, free space, version compatibility, signature | Recovery procedure / RMA |
| Over-temperature indication | Installation location, ventilation, sun exposure | Reposition/derate; installation guidance |
| Water inside / corrosion | Gasket, gland torque, cable entry, mounting | Replace; installation review |
| Wrong measurement (SENSE) | Calibration state, sender type, wiring, reference comparison | Recalibrate / replace module |
| No alert received (WATCH) | Subscription state, device online state, provider acceptance record | **No guarantee of delivery exists**; explain the documented states |

**Support-script rule:** troubleshooting must never instruct a customer to bypass a protection, open a
sealed enclosure, or perform work on live DC wiring. Battery/DC-distribution work is
professional-only (D5 §11).

---

## 10. Product traceability

The service function is impossible without traceability. A future unit must resolve:

```
device serial
  → batch / assembly lot / fab lot
  → BOM revision and critical component lots
  → firmware image hash and release record
  → calibration record(s)
  → functional/EOL test records
  → packaging / shipment record
  → installation record (installer, vessel, date, location)
  → service history (RMA, repair, calibration, updates)
  → end-of-life / disposal record
```

| Traceability element | Owner | Retention | Current state |
|---|---|---|---|
| Serial → batch | factory/MAREA QC | legal period `UNKNOWN` (confirm in D24) | NONE |
| Firmware hash → build | MAREA firmware | product life + | NONE |
| Calibration record | MAREA | product life + | NONE |
| Test record | factory | legal period | NONE |
| Installation record | installer / MAREA | legal period | NONE |
| Service history | MAREA | product life + | NONE |
| Customer/vessel link | MAREA (GDPR-minimised) | legal period | NONE |

**Legal hooks (not a compliance claim).** GPSR traceability and technical-documentation duties for the
consumer hardware families, WEEE producer obligations, and CRA vulnerability handling all depend on
traceability (`HARDWARE-COMPLIANCE-MATRIX.md` §5.5). No retention period is asserted as fact; the
statutory basis must be confirmed by the conformity/legal workstream.

---

## 11. What evidence is required before a warranty duration, a reliability figure or a support period may be offered

**This is the central section of D18.** Not one of the following exists today.

### 11.1 Before any warranty duration may be offered

| # | Evidence required | Why | State |
|---|---|---|---|
| W1 | Qualification tests executed on the actual configuration (D17) with reports | You cannot warrant an environmental envelope you never tested | `NOT_EXECUTED`, no report |
| W2 | A manufacturing quality record: yield, process capability, supplier quality, batch consistency | Warranty exposure is a function of defect rate | `UNKNOWN`, no batch |
| W3 | A defined failure taxonomy and a claims process | Without it, "failure" is undefined | `NOT_IMPLEMENTED` |
| W4 | A spare-parts and repair capability with lead times | A warranty you cannot service is a liability | `NONE` |
| W5 | A legal review of statutory consumer rights, limitations, exclusions and product liability | A duration must be lawful and insurable | `LEGAL_REVIEW_REQUIRED` |
| W6 | A product-liability insurance position or a documented risk acceptance | Warranty is a financial exposure | `NONE` |
| W7 | A financial provision (reserve) based on evidence, not a guess | The cost model must fund it | `UNKNOWN` |
| W8 | A serialised traceability chain | Claims must be verified against the unit | `NONE` |
| W9 | Terms in the languages of the markets sold | Consumer information duties | `LEGAL_REVIEW_REQUIRED` |

**No duration is proposed here.** A defensible duration can only be set after W1–W9 exist, and it must
be consistent with the support period and the spares strategy.

### 11.2 Before any reliability figure may be published (MTBF, FIT, failure rate, uptime)

| # | Evidence required | Why | State |
|---|---|---|---|
| R1 | Field return data from a statistically meaningful installed population over a meaningful period | The only direct evidence of field reliability | **Zero units in the field** |
| R2 | Or a validated accelerated-life test programme with a documented model, assumptions and confidence | Accelerated testing can support a prediction only if the acceleration model is justified | `NOT_EXECUTED` |
| R3 | A well-defined failure criterion and a population definition | A number without a definition is marketing | `NOT_DEFINED` |
| R4 | Component-level reliability data used only as an input, with its limitations stated | Datasheet MTBF is not a product MTBF | `NOT_RETRIEVED` |
| R5 | Independence and reproducibility of the analysis | A supplier's or a spreadsheet's number is not evidence | `NONE` |
| R6 | A stated statistical confidence interval | A point estimate without uncertainty is misleading | `NONE` |

**Rule:** a datasheet MTBF, a "designed for 10 years" statement, a competitor's number or a
spreadsheet prediction is **not** a MAREA reliability figure. No MTBF, FIT, failure-rate or
availability number may appear in any document, page or price list until R1–R6 exist.

### 11.3 Before any support period may be offered — including the CRA interaction

| # | Evidence required | Why | State |
|---|---|---|---|
| S1 | A defined support-period statement per product, with start and end | A support period is a commitment, not a hope | `NOT_DEFINED` |
| S2 | A funded security-update capability for the whole period (SBOM, vulnerability monitoring, patching, signed updates) | CRA requires security updates during the support period | `NOT_IMPLEMENTED` (`H-13`) |
| S3 | A funded hardware/spares capability for the same period | If hardware support ends before security support, the commitment is incoherent | `NONE` |
| S4 | A documented end-of-support communication plan | Customers must know when and what ends | `NOT_WRITTEN` |
| S5 | A firmware archive and recovery path for every shipped version | Otherwise an old unit cannot be maintained | `NONE` |
| S6 | A vulnerability-handling and incident-reporting process | CRA reporting obligations apply from 2026-09-11; main obligations from 2027-12-11 | `NOT_STARTED` (D27) |
| S7 | Legal review of the support-period statement against consumer law and CRA | The statement must be lawful and consistent | `LEGAL_REVIEW_REQUIRED` |

**CRA interaction, stated precisely.** The CRA (Regulation (EU) 2024/2847) entered into force on
2024-12-10; its main obligations apply from 2027-12-11 and the vulnerability/incident reporting
obligations apply from 2026-09-11 (`EVD-MC11-417`). The Commission's published summary states that
manufacturers must provide security updates **during the product's support period, which needs to
reflect the period the product is expected to be in use** (`EVD-MC11-419`). The same summary records
that **marine equipment within the scope of Directive 2014/90/EU is excluded from the CRA** — for
MAREA's recorded recreational-craft market position the MED is not applicable
(`HARDWARE-COMPLIANCE-MATRIX.md` C-09), so the exclusion does **not** remove the CRA from scope; the
conformity workstream owns the final per-configuration determination.

Consequences that must be planned before any support-period statement:

1. The support period is a **hardware + firmware + security** commitment, not just a software one.
2. The CRA requires the support period to be **stated** (in the technical documentation and user
   information) and **substantiated** by an update capability. A period that cannot be patched is not
   a support period.
3. The support period interacts with **spares**, **obsolescence**, **firmware archives** and the
   **security process**. A spares period shorter than the security period is an incoherent promise.
4. The support period must be **funded** in the cost model (D21/D22), not assumed.
5. No support period may be advertised before S1–S7 exist. `NO_SUPPORT_PERIOD_CLAIM` applies.

---

## 12. Cost implications the cost model must not ignore

| Cost category | What it is | Evidence state |
|---|---|---|
| Warranty reserve | Provision per unit for future claims | `UNKNOWN` — cannot be derived without R1–R6 or a stated engineering assumption with sensitivity |
| RMA reverse logistics | Return shipping, handling, customs (if cross-border) | `UNKNOWN` — no carrier contract |
| Repair labour | Depot/partner time per RMA | `UNKNOWN` |
| Spares inventory | Capital tied in stock plus carrying cost | `UNKNOWN` |
| Calibration service | Reference equipment, labour, traceability | `UNKNOWN` |
| Firmware maintenance | Engineering time for the support period | `UNKNOWN` |
| Security patching | Vulnerability monitoring, SBOM, incident response | `UNKNOWN` |
| Customer support | Intake, triage, communication | `UNKNOWN` |
| Disposal / WEEE | Take-back and recycling | `UNKNOWN` |
| Failure-analysis lab | Root-cause analysis for returns | `UNKNOWN` |
| Product-liability insurance | Premium for the risk class | `UNKNOWN` |

**Rules for the cost model:**

1. No warranty reserve may be computed from an invented failure rate. If a reserve is modelled, it
   must be a named `ENGINEERING_ASSUMPTION` with a stated sensitivity and must not be presented as
   derived from reliability evidence.
2. Tooling, certification, qualification testing and warranty operations are **separate categories**
   and must never be silently zeroed or folded into a unit price.
3. A support period, once defined, is a recurring engineering cost for its whole duration — not a
   one-off.
4. "Failures are rare" is not a cost assumption; it is an unevidenced belief.

---

## 13. Open questions

| # | Question | Why it is open |
|---|---|---|
| SV1 | Is the product repairable, and at which level? | Design and tooling decision not taken |
| SV2 | Who operates the service network (MAREA, distributor, partner)? | No organisation exists |
| SV3 | What is the warranty duration and its legal basis? | Requires W1–W9; no evidence |
| SV4 | What reliability figure, if any, will ever be published? | Requires R1–R6; no field data |
| SV5 | What support period will be offered? | Requires S1–S7 and CRA analysis |
| SV6 | What spares will be stocked and for how long? | Requires supplier agreements and funding |
| SV7 | How is customer data handled in RMA (export, deletion, privacy)? | D27/GDPR process not designed |
| SV8 | Who bears reverse-logistics cost and risk? | No contract, no Incoterms |
| SV9 | Is there an insurance position for product liability? | Not obtained |

---

## 14. Relationship to other deliverables

| Item | Relationship |
|---|---|
| D15 manufacturing routes | Determines whether repair is even possible (service opening, connectors) |
| D16 DFM/DFT/quality | Produces the serialisation, test records and diagnostic data this model depends on |
| D17 environmental reliability | Supplies the failure mechanisms and the qualification evidence a warranty needs |
| D24 CE/EMC/RED roadmap | Owns the legal conformity file and the support-period/statutory-rights interaction |
| D27 device security | Owns secure provisioning, revocation, signed updates and vulnerability handling |
| D21/D22 cost model | Must carry warranty, spares and support as explicit, non-zero `UNKNOWN` categories |

---

## 15. Explicit control statements

```
WARRANTY_DURATION        = NOT_STATED / NOT_OFFERED
RELIABILITY_FIGURE       = NOT_STATED / NOT_ESTIMABLE
SUPPORT_PERIOD           = NOT_DEFINED / NOT_ADVERTISED
RMA_PROCESS              = NOT_IMPLEMENTED
SPARES                   = NONE
SERVICE_NETWORK          = NONE
FIELD_DATA               = NONE
CUSTOMER_PROMISE         = NONE
```

No warranty duration, reliability figure, availability figure or support period may be extracted from
this document. It defines what would have to be true — and evidenced — before any of them could
honestly be offered.
