# MC-11 — Conformity blocker register (D26)

Status of this document: `INTERNAL_ENGINEERING_RESEARCH — BLOCKER REGISTER`.

```
CONFORMITY ESTABLISHED        = NONE (any configuration)
CE MARKING                    = PROHIBITED
NMEA CERTIFICATION            = NOT_CERTIFIED
NOTIFIED BODY                 = NOT_ENGAGED
TEST EVIDENCE                 = NONE
TECHNICAL FILE                = NONE
MANUFACTURER                  = UNDETERMINED
GATE G6 (regulatory evaluation) = NOT_STARTED
```

Owner: `conformity-specialist`. Companion: D23 (applicability), D24 (CE/testing route), D25 (NMEA),
`data/conformity-applicability.json`, `data/evidence/conformity.json`.

**Definition used here.** A conformity blocker is a condition that prevents a MAREA configuration from
lawfully reaching the point where a CE mark, a declaration of conformity or a compatibility claim could be
made — and which **cannot be closed by more desk research**. Each blocker below records what it is, the
evidence that it exists, why MC-11 cannot close it, who owns it, the next action, the external authorisation
required, and the specific evidence that would unblock it. A blocker is closed only by its stated evidence:
a licence, a certificate, a measurement, a signature or a corporate decision. No AI analysis, no plan, no
document and no internal opinion closes any blocker in this register.

## 0. Severity, status and ownership vocabulary

| Field | Values used | Meaning |
|---|---|---|
| Severity | `CRITICAL` | prevents every market placement of the affected configuration |
| | `HIGH` | blocks the named configuration or claim |
| | `MEDIUM` | blocks a distribution channel or a milestone step |
| Status | `OPEN` | a decision or work item exists that someone could start |
| | `BLOCKED` | requires an external document, permission, entity, payment or measurement |
| | `LEGAL_REVIEW_REQUIRED` | requires qualified counsel before any action |
| Owner | function, never a person | the company must name a human for each |

## 1. Register summary

| ID | Blocker (short) | Severity | Status | Configurations affected |
|---|---|---|---|---|
| CON-01 | Manufacturer identity undetermined | CRITICAL | BLOCKED | all six hardware families |
| CON-02 | Economic-operator roles unassigned (importer, authorised representative, GPSR responsible operator) | CRITICAL | BLOCKED | all nine families |
| CON-03 | No technical file of any kind | CRITICAL | OPEN | all hardware families + NAV (CRA) |
| CON-04 | No test evidence, no accredited laboratory, no notified body engaged | CRITICAL | BLOCKED | all |
| CON-05 | Radio module host-integration obligation | HIGH | OPEN | HUB, AIS-CONNECTED, WATCH, DISPLAY, wireless SENSE |
| CON-06 | Configuration not frozen (blocks the applicability freeze) | CRITICAL | OPEN | all hardware families |
| CON-07 | CRA role and product classification undecided | HIGH | LEGAL_REVIEW_REQUIRED | HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, NAV |
| CON-08 | Battery obligations unassessed per SKU | HIGH | OPEN | WATCH, possible HUB/DISPLAY/SENSE/PILOT |
| CON-09 | ES/PT producer-responsibility registration absent | HIGH | BLOCKED | all packaged hardware |
| CON-10 | PILOT safety conformity not established | CRITICAL | BLOCKED | PILOT (all editions) |
| CON-11 | NMEA certification absent | HIGH | BLOCKED | HUB, AIS, DISPLAY, any NMEA-2000-capable SKU |
| CON-12 | AIS transmitting equipment approval (if transmit were ever proposed) | CRITICAL | BLOCKED | AIS family (transmit prohibited) |
| CON-13 | OPEN-MARINE IP/licence dependency | CRITICAL | BLOCKED | all firmware-bearing hardware, NAV |
| CON-14 | Spanish transposition/language rule unverified | HIGH | LEGAL_REVIEW_REQUIRED | ES market, all |
| CON-15 | Packaging conformity and declaration absent | MEDIUM | OPEN | all packaged hardware |
| CON-16 | Risk of relying on a voluntary/unregulated "certificate" | HIGH | OPEN | all |
| CON-17 | CRA reporting readiness absent (reporting already in force) | HIGH | OPEN | all digital products |
| CON-18 | WEATHER/FLEET software scope decision (client application or edge device) | MEDIUM | OPEN | WEATHER, FLEET |

Counts: 8 `CRITICAL`, 9 `HIGH`, 1 `MEDIUM`. None is closed. None can be closed by this milestone.

## 2. Blocker detail

### CON-01 — Manufacturer identity undetermined

| Field | Content |
|---|---|
| **Configurations** | HUB-STANDARD, HUB-PRO, AIS-RECEIVER, AIS-CONNECTED, PILOT-COASTAL, PILOT-SAIL, PILOT-PRO, all SENSE editions, WATCH-CORE, WATCH-PLUS, DISPLAY-7, DISPLAY-LARGE-CONDITIONAL (NAV as software publisher) |
| **Blocking condition** | No legal person has been designated the manufacturer of any MAREA configuration. Three models are open — own-brand manufacture, contract manufacture, OEM/white-label (MC-02 DEC-07) — and none is chosen. The manufacturer is the addressee of the conformity assessment, the technical file, the DoC, the CE mark, the CRA obligations, the GPSR duties and the NMEA manufacturer code; without it, none of those obligations has an owner |
| **Evidence** | `EVD-MC11-305` (CE-marking process is a manufacturer process, sole-responsibility DoC); MC-02 X-02 (corporate identity: tax id, address and registry empty); MC-02 DEC-07 (manufacturing model undecided); product-definition readiness `compliance: NOT_STARTED` |
| **Why MC-11 cannot close it** | It is a corporate and commercial decision, not an engineering finding. No amount of desk research can designate a legal person, and an agent cannot sign a DoC |
| **Owner** | Company owner + counsel (decision); engineering for the technical content |
| **Next action** | Take DEC-07: choose the manufacturing model and name the contracting legal entity. Record it in the decision log before any certification spend |
| **Required external authorisation** | Human corporate decision, documented; legal confirmation of entity ownership and of the IP chain (see CON-13) |
| **What would unblock it** | A written decision naming the legal manufacturer (with company registration details) for each SKU, plus the manufacturer model; the entity must be able to sign a legally binding DoC |
| **Severity / status** | `CRITICAL` / `BLOCKED` |

### CON-02 — Economic-operator roles unassigned

| Field | Content |
|---|---|
| **Configurations** | All nine families (consumer-facing obligations attach to the roles, not to the family) |
| **Blocking condition** | No EU importer, authorised representative or GPSR "responsible economic operator" is designated. The GPSR requires a responsible economic operator in the EU for each product, entrusted with safety tasks; the RED provides for a mandated representative whose mandate must cover the 10-year documentation duties; importers have their own verification, marking and language obligations |
| **Evidence** | `EVD-MC11-308` (responsible economic operator requirement); `EVD-MC11-317` Art. 12 (mandate limits: the Article 11(1)(a)–(e) duties may not be mandated) and Art. 13 (importer duties incl. Portuguese-language instructions); MC-02 X-02 |
| **Why MC-11 cannot close it** | Requires a legal entity and a written mandate; an agent cannot appoint an economic operator or accept statutory tasks |
| **Owner** | Company owner + counsel |
| **Next action** | Decide whether EMBARCARTE (Spain) acts as manufacturer, importer and responsible operator, or whether a separate importer/distributor assumes part of the chain; document the mandates |
| **Required external authorisation** | Signed mandate / corporate resolution |
| **What would unblock it** | Named economic operators with addresses, and written mandates that satisfy the RED and GPSR task allocation |
| **Severity / status** | `CRITICAL` / `BLOCKED` |

### CON-03 — No technical file of any kind

| Field | Content |
|---|---|
| **Configurations** | All hardware families, plus NAV under the CRA |
| **Blocking condition** | No technical documentation exists in any required structure: no schematics, no PCB layout, no firmware baseline, no photographs of a physical article, no harmonised-standards list, no test reports, no DoC copy, no design calculations. The RED technical-file content (Annex V structure) is empty element by element |
| **Evidence** | D24 §6 mapping table; `EVD-MC11-317` Annex V; MC-02 H-05 ("no physical build, measurement, environmental or EMC evidence exists"); MC-02 H-07 (no BOM) |
| **Why MC-11 cannot close it** | The file describes a product that does not exist yet. A technical file cannot be written ahead of the design it documents without becoming fiction |
| **Owner** | Compliance + hardware engineering |
| **Next action** | After CON-06 (design freeze), create the file skeleton with the Annex V headings and populate each element from real design artefacts |
| **Required external authorisation** | None for file creation; the file only becomes meaningful with the frozen design |
| **What would unblock it** | A complete, internally reviewed technical file whose elements are traceable to real design documents and real test reports |
| **Severity / status** | `CRITICAL` / `OPEN` |

### CON-04 — No test evidence, no accredited laboratory, no notified body

| Field | Content |
|---|---|
| **Configurations** | All |
| **Blocking condition** | Zero measurements exist: no EMC pre-scan, no radio measurement, no ESD, no ingress, no thermal, no safety evaluation, no battery test. No accredited laboratory has been engaged and no notified body has been appointed. There is no device under test |
| **Evidence** | D24 §3 and §11 (every test `NOT_EXECUTED`); `data/qualification-plan.json` (manufacturing workstream, all tests `NOT_EXECUTED`); MC-02 H-05; MC-11 invariant `PHYSICAL_TESTS = NOT_EXECUTED` |
| **Why MC-11 cannot close it** | Requires a physical prototype, a test plan with acceptance criteria, an accredited laboratory and money. MC-11 authorises no purchase, no prototype and no laboratory hire |
| **Owner** | Engineering + compliance + finance |
| **Next action** | After CON-06: commission a pre-compliance scan on the first prototype to de-risk the design before the full campaign; obtain formal quotations (which MC-11 is not authorised to request) |
| **Required external authorisation** | Prototype procurement authorisation (gate G3) and test authorisation (gate G4); laboratory engagement |
| **What would unblock it** | Accredited test reports against confirmed harmonised standards, and — for RED configurations — a notified-body certificate |
| **Severity / status** | `CRITICAL` / `BLOCKED` |

### CON-05 — Radio module host-integration obligation

| Field | Content |
|---|---|
| **Configurations** | HUB-STANDARD, HUB-PRO, AIS-CONNECTED, WATCH-CORE, WATCH-PLUS, DISPLAY-7, DISPLAY-LARGE-CONDITIONAL, wireless SENSE modules |
| **Blocking condition** | The programme's implicit assumption is that using a pre-certified radio module makes the product radio-compliant. It does not: the module certificate covers the module, while the host assessment must cover antenna, shielding, coexistence, power supply, enclosure and the host declaration of conformity. The host remains responsible for the product's RED conformity |
| **Evidence** | `EVD-MC11-304` (RED essential requirements attach to the equipment placed on the market); `EVD-MC11-317` Art. 11 (manufacturer duties for the equipment) and Art. 17/Annexes (assessment of the equipment); MC-02 C-03 ("if a pre-certified radio module is used, module-level certification does not automatically cover the host") |
| **Why MC-11 cannot close it** | Requires the chosen module, its certification conditions and a host design. No module has been selected |
| **Owner** | Hardware engineering + compliance |
| **Next action** | When a module is selected, obtain its certification conditions (not just its datasheet) and design an integration assessment; record the obligations in the technical file |
| **Required external authorisation** | Supplier engagement authorisation (gate G2) to obtain module certification conditions |
| **What would unblock it** | A written host-integration assessment per module, folded into the technical file, with the host's own radio/EMC evidence |
| **Severity / status** | `HIGH` / `OPEN` |

### CON-06 — Configuration not frozen

| Field | Content |
|---|---|
| **Configurations** | All hardware families |
| **Blocking condition** | Five design facts that drive regulatory scope are undecided: (1) whether each configuration carries an intentional radio interface; (2) whether a mains PSU/charger is bundled under the MAREA brand (LVD); (3) whether and which battery is present; (4) the NMEA/CAN interface set; (5) the enclosure and environmental target. Until they are frozen, every applicability row is conditional and no test plan can have a fixed configuration |
| **Evidence** | D23 §5.2, §5.5; `data/conformity-applicability.json` conditional rows; D2 §9 gate G1 `CANDIDATE_ONLY`; MC-02 H-05 |
| **Why MC-11 cannot close it** | MC-11 is prohibited from freezing a hardware specification before customer validation (MC-10 handoff §7.3); the requirement set is unknown |
| **Owner** | Product + hardware engineering |
| **Next action** | Freeze a minimum regulatory-relevant configuration for the first SKU (radio yes/no, supply, battery, interface set) even if the rest stays open |
| **Required external authorisation** | G1 architecture approval + G6 regulatory evaluation authorisation |
| **What would unblock it** | A signed configuration baseline that the applicability analysis and test plan can reference |
| **Severity / status** | `CRITICAL` / `OPEN` |

### CON-07 — CRA role and product classification undecided

| Field | Content |
|---|---|
| **Configurations** | HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, NAV |
| **Blocking condition** | Two CRA determinations are open: (a) who the manufacturer of a product with digital elements is, and the position of the remote cloud services (device vs service obligations); (b) whether any configuration is "important" or "critical", which would require third-party assessment by a notified body. A vessel gateway with routing/NAT/firewall functions plausibly falls in an "important" class |
| **Evidence** | `EVD-MC11-301` (requirements, third-party assessment for some products); `EVD-MC11-302` (important/critical classes, Implementing Regulation (EU) 2025/2392, MED exclusion); D23 §6.4 |
| **Why MC-11 cannot close it** | Requires the implementing-regulation text and a legal classification opinion; the product is not frozen |
| **Owner** | Legal counsel + security lead |
| **Next action** | Obtain Implementing Regulation (EU) 2025/2392; produce a per-SKU classification memo once the configuration is frozen |
| **Required external authorisation** | Qualified legal review; possibly a notified-body pre-opinion |
| **What would unblock it** | A written classification determination per SKU and the corresponding conformity route |
| **Severity / status** | `HIGH` / `LEGAL_REVIEW_REQUIRED` |

### CON-08 — Battery obligations unassessed per SKU

| Field | Content |
|---|---|
| **Configurations** | WATCH-CORE, WATCH-PLUS (appliable); HUB, DISPLAY, SENSE wireless modules, PILOT control head (conditional) |
| **Blocking condition** | Battery presence, chemistry and removability are undecided. If a portable battery is incorporated, Regulation (EU) 2023/1542 applies: substance restrictions, safety/durability criteria, labelling from 2026, QR code from 2027, producer collection/recycling duties and — decisively — end-user removability/replaceability by 2027. A soldered coin cell on a sealed board is the configuration the rule targets |
| **Evidence** | `EVD-MC11-309` (scope: batteries incorporated into products); `EVD-MC11-310` (removability by 2027, labelling, producer duties); MC-02 O-15 / H-15 |
| **Why MC-11 cannot close it** | Depends on the frozen BOM and on product architecture decisions about field-replaceability |
| **Owner** | Hardware engineering + compliance |
| **Next action** | Decide per SKU whether a battery exists, its chemistry, and whether a user-replaceable design is adopted; then register as battery producer where required |
| **Required external authorisation** | None beyond the design decision; producer registration later |
| **What would unblock it** | A battery decision per SKU, a compliant battery pack specification, IEC 62133-2-class test evidence and producer registration |
| **Severity / status** | `HIGH` / `OPEN` |

### CON-09 — ES/PT producer-responsibility registration absent

| Field | Content |
|---|---|
| **Configurations** | All packaged hardware configurations sold in Spain and Portugal |
| **Blocking condition** | No producer registration exists for EEE (WEEE), batteries or packaging in either Member State, so the products cannot lawfully be placed on those markets by EMBARCARTE in the producer role. The Spanish packaging registry mechanics are verified; the WEEE and Portuguese procedures were not retrievable in this session |
| **Evidence** | `EVD-MC11-314` (WEEE producer register obligation); `EVD-MC11-318` (Spanish Registro de Productores de Producto: registration number format, ENV section, annual reporting window 2 January – 2 April 2026); `EVD-MC11-323` (Portuguese APA pages timed out — `NOT_VERIFIED`) |
| **Why MC-11 cannot close it** | Requires the legal entity (CON-01/CON-02) and a registration filing in another system; also requires first knowing the EEE category and put-on-market weights |
| **Owner** | Legal counsel + operations |
| **Next action** | Once the entity is designated: register in the Spanish RPP (packaging) and in the Spanish WEEE register; obtain the Portuguese registration procedure in writing before any PT sale |
| **Required external authorisation** | Corporate authorisation to register; national scheme agreements |
| **What would unblock it** | Registration numbers for EEE, batteries (where relevant) and packaging in both Member States, plus scheme participation evidence |
| **Severity / status** | `HIGH` / `BLOCKED` |

### CON-10 — PILOT safety conformity not established

| Field | Content |
|---|---|
| **Configurations** | PILOT-COASTAL, PILOT-SAIL, PILOT-PRO |
| **Blocking condition** | There is no functional-safety regime for a recreational autopilot, so the safety burden falls on the GPSR risk analysis, product liability and independent engineering verification. None of these exists: no bench motor test, no HIL fault injection, no E-stop physical evidence, no end-stop protection, no supervised sea trial, no independent review. `PILOT_SAFETY_GATE = BLOCKED` |
| **Evidence** | MC-02 H-01, H-10, P-04 (safety gate blocked; no physical evidence); `EVD-MC11-308` (GPSR duty of risk analysis and warnings); D23 PILOT rows; D24 §3.1 (motor-drive emissions never measured) |
| **Why MC-11 cannot close it** | Requires a prototype, a test bench, a vessel, a competent marine engineer and a funded safety programme — all outside MC-11 authorisation |
| **Owner** | Product + engineering + safety |
| **Next action** | Do not sell, pre-sell or price PILOT. Fund the staged safety programme (bench → HIL → supervised sea trials → independent review) or defer the product (MC-02 DEC-06) |
| **Required external authorisation** | G4 test authorisation, G5 marine integration authorisation (vessel safety review + permissions), competent-person sign-off |
| **What would unblock it** | A complete safety case with physical evidence, independent review sign-off and a documented limitation envelope |
| **Severity / status** | `CRITICAL` / `BLOCKED` |

### CON-11 — NMEA certification absent

| Field | Content |
|---|---|
| **Configurations** | HUB-STANDARD, HUB-PRO, AIS-RECEIVER, AIS-CONNECTED, DISPLAY-7, DISPLAY-LARGE-CONDITIONAL, and any future NMEA-2000-capable SKU |
| **Blocking condition** | NMEA 2000 is `NOT_IMPLEMENTED`; membership `NOT_HELD`; licence `NOT_HELD`; manufacturer code `NOT_ASSIGNED`; product certification `NOT_CERTIFIED`; tested compatibility rows `0`. NMEA states that all products that read and/or transmit NMEA 2000 information must be certified by NMEA, and that certification follows validation of an encrypted certification file |
| **Evidence** | `EVD-MC11-319` (certification requirement, licence, manufacturer code with up-to-60-day assignment, product code, certification tool, logo/terminology rule); `EVD-MC11-320` (0183 licence and price tiers); `EVD-MC11-322` (membership/certification pages inaccessible); `data/nmea-status.json` |
| **Why MC-11 cannot close it** | Requires a company, a payment, a licence agreement, a working implementation and NMEA validation. No supplier/standards-body contact is authorised |
| **Owner** | Company owner + product + engineering |
| **Next action** | Take MC-02 DEC-05 (license and certify, or scope to NMEA 0183/Signal K only). If licensing is pursued, budget for membership + standard + codes + certification once a certifiable product exists |
| **Required external authorisation** | Commercial commitment and payment to NMEA; engineering implementation |
| **What would unblock it** | NMEA membership, NMEA 2000 licence, assigned manufacturer code, per-product certification and product codes — or a formal decision to make no NMEA 2000 claim at all |
| **Severity / status** | `HIGH` / `BLOCKED` |

### CON-12 — AIS transmitting equipment approval (if transmit were ever proposed)

| Field | Content |
|---|---|
| **Configurations** | AIS family — **currently receive-only and prohibited from transmitting** |
| **Blocking condition** | AIS transmission is out of scope (`AIS_TRANSMISSION_OFFERED = false`) and must not be added. If it were ever proposed, an AIS transponder would be marine radiocommunication equipment subject to a completely different approval regime (marine equipment/radio approval, type examination, MMSI/identity handling and operator requirements), far beyond the receive-only receiver assessment. Even mentioning it in product copy is prohibited |
| **Evidence** | MC-11 invariant `AIS_TRANSMISSION_OFFERED = false`; MC-02 D-09 (receive-only claims); `EVD-MC11-311` (MED equipment regime) and `EVD-MC11-304` (RED) show the additional layers a transmitter would attract; D2 §4 |
| **Why MC-11 cannot close it** | Transmit is prohibited by governance, not by missing research. Approving it would be a scope change requiring a new milestone and statutory approvals |
| **Owner** | Company owner |
| **Next action** | None while receive-only stands. Enforce the prohibition in copy, firmware and configuration (validator check V38) |
| **Required external authorisation** | A new milestone decision plus marine radio approval path; none is authorised |
| **What would unblock it** | Nothing available in MC-11; a transmit product would be a different programme with type approval evidence |
| **Severity / status** | `CRITICAL` / `BLOCKED` |

### CON-13 — OPEN-MARINE IP/licence dependency

| Field | Content |
|---|---|
| **Configurations** | Every firmware-bearing hardware configuration, and NAV (reused code paths) |
| **Blocking condition** | The legacy OPEN-MARINE repository carries no `LICENSE`/`COPYING`/`NOTICE` file and no outbound licence (except `marine-tile-server` ISC); custody and employer relationships behind the contributing domains are undocumented; an external GPL-3.0 AIS decoder is used in the legacy pipeline. Shipping any product containing this code without a licence grant would be an IP violation that no certificate can cure |
| **Evidence** | MC-02 L-01, L-02, L-03 (CRITICAL, BLOCKED), S-01 (GPL-3.0 decoder), R-01/R-04; MC-11 invariant `SOURCE_IP_CLEARANCE = NOT_CLEARED` and `OPEN_MARINE_WRITE = PROHIBITED` |
| **Why MC-11 cannot close it** | Requires assignments and written permission from rightsholders and counsel; it is a legal precondition, not a compliance task |
| **Owner** | Company owner + counsel |
| **Next action** | Resolve assignments (L-01…L-04) and the outbound licence position before any firmware is shipped; decide the AIS decoder strategy (DEC-04) |
| **Required external authorisation** | Written IP assignment/licence; legal opinion on GPL scope |
| **What would unblock it** | A licence or assignment in writing, a NOTICE/SBOM bundle, and a decided decoder distribution model |
| **Severity / status** | `CRITICAL` / `BLOCKED` |

### CON-14 — Spanish transposition and language rule unverified

| Field | Content |
|---|---|
| **Configurations** | All configurations sold in Spain |
| **Blocking condition** | The Spanish RED transposition (`Real Decreto 188/2016`, `BOE-A-2016-4444`) was identified but its full text was **not retrieved**, so the Spanish-language instruction requirement and the Spanish market-surveillance procedure are not verified. The Portuguese transposition requires Portuguese-language instructions; assuming Spain is identical is not evidence |
| **Evidence** | `EVD-MC11-317` Art. 11(1)(l) (the verified Portuguese analogue); BOE reference identified but `NOT_RETRIEVED` (recorded in D23 §10 and §11 L2) |
| **Why MC-11 cannot close it** | Requires retrieving and reading the Spanish text, and a qualified confirmation of the language rule. Retrieval failed this session; asserting the rule from the Portuguese analogue would be exactly the kind of unverified inference the milestone forbids |
| **Owner** | Compliance + counsel |
| **Next action** | Retrieve `RD 188/2016` (and the Spanish WEEE/RoHS transpositions), confirm the language rule and the market-surveillance authority practice |
| **Required external authorisation** | Qualified legal review |
| **What would unblock it** | A verified statement of the Spanish instruction-language requirement and the applicable market-surveillance procedure, reflected in the documentation plan |
| **Severity / status** | `HIGH` / `LEGAL_REVIEW_REQUIRED` |

### CON-15 — Packaging conformity and declaration absent

| Field | Content |
|---|---|
| **Configurations** | All packaged hardware configurations (including kits, which multiply packaging levels) |
| **Blocking condition** | No packaging specification, no recyclability assessment, no packaging EU declaration of conformity, no packaging producer registration, no sorting labels. The Packaging Regulation imposes a conformity assessment, a declaration of conformity and five-year documentation (ten for reusable packaging), plus extended producer responsibility |
| **Evidence** | `EVD-MC11-316` (packaging conformity, declaration, documentation retention, EPR); `EVD-MC11-318` (Spanish RPP mechanics and reporting window); D23 §5.3 |
| **Why MC-11 cannot close it** | Depends on the physical packaging design, which does not exist; the application date is itself flagged for confirmation |
| **Owner** | Compliance + packaging design |
| **Next action** | Once packaging is designed, produce the packaging file and DoC, register as packaging producer, and label per the regulation |
| **Required external authorisation** | None beyond registration; national scheme participation |
| **What would unblock it** | Packaging conformity documentation, a signed packaging DoC and a producer registration number |
| **Severity / status** | `MEDIUM` / `OPEN` |

### CON-16 — Risk of relying on a voluntary/unregulated "certificate"

| Field | Content |
|---|---|
| **Configurations** | All |
| **Blocking condition** | A commercial "certificate" from a body that is not a notified body for the relevant legislation would create the impression of conformity without legal value; the Commission states that voluntary certificates are not a recognised means to prove compliance and have no value in market-surveillance or customs checks. A vendor offering "CE certification services" without notified-body status is a procurement hazard |
| **Evidence** | `EVD-MC11-304` and `EVD-MC11-305` (Commission position on unregulated certificates; only notified bodies may issue certificates of conformity in their notified area); NANDO database reference in `EVD-MC11-305` |
| **Why MC-11 cannot close it** | It is a procurement control that must be embedded before any certification spend |
| **Owner** | Compliance + procurement |
| **Next action** | Adopt a rule: any conformity-assessment provider must be verified in NANDO for the specific legislation before engagement; record the verification |
| **Required external authorisation** | None; internal control |
| **What would unblock it** | A documented supplier-verification procedure and evidence that each engaged body is notified for the relevant act |
| **Severity / status** | `HIGH` / `OPEN` |

### CON-17 — CRA reporting readiness absent

| Field | Content |
|---|---|
| **Configurations** | HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, NAV |
| **Blocking condition** | The CRA reporting regime is **already in force** (from 11 September 2026) and requires an early warning within 24 hours, a full notification within 72 hours and a final report within 14 days of a corrective measure (vulnerabilities) or one month (severe incidents). No vulnerability intake, triage, disclosure or incident-reporting process exists, and no security contact is published. The clock starts on awareness, so readiness cannot be built after the first incident |
| **Evidence** | `EVD-MC11-303` (reporting obligations, timing, ENISA Single Reporting Platform); `EVD-MC11-301` (main obligations from 11 December 2027); MC-02 H-13, R-11 |
| **Why MC-11 cannot close it** | Requires a security-operations capability, a coordinated-disclosure policy and an organisational process — none of which is authorised or funded here |
| **Owner** | Security lead + compliance |
| **Next action** | Define the vulnerability-handling and incident-reporting process before any market placement; publish a security contact; rehearse the 24-hour path |
| **Required external authorisation** | Internal programme authorisation; no external party |
| **What would unblock it** | A documented, rehearsed reporting process and evidence of a dry run, with owners named |
| **Severity / status** | `HIGH` / `OPEN` |

### CON-18 — WEATHER/FLEET software scope decision

| Field | Content |
|---|---|
| **Configurations** | WEATHER-STANDARD, WEATHER-PRO, FLEET-START, FLEET-BUSINESS, FLEET-ENTERPRISE |
| **Blocking condition** | These configurations currently place no product on the market (hosted services), which is why no CE-marking act applies. That exclusion lapses immediately if a downloadable client application, a FLEET edge device or a distributor-installed appliance is placed on the market — a product decision that has not been taken |
| **Evidence** | D23 WEATHER/FLEET rows and their `applicableNote`; `EVD-MC11-302` (CRA applies to software products placed on the market); MC-11 invariant `FLEET_DEFAULT_HARDWARE = false` |
| **Why MC-11 cannot close it** | It is a product/distribution decision, not a research finding |
| **Owner** | Product + counsel |
| **Next action** | Decide explicitly, per configuration, whether any software or hardware artefact is placed on the market; record the decision so the D23 exclusion is not silently relied on after a model change |
| **Required external authorisation** | Product decision + legal confirmation |
| **What would unblock it** | A written distribution-model decision per configuration; if a product is placed on the market, a CRA assessment for it |
| **Severity / status** | `MEDIUM` / `OPEN` |

## 3. Dependency graph (what must happen before what)

```
CON-13 (OPEN-MARINE IP) ─┐
CON-01 (manufacturer)   ─┼─→ CON-02 (economic operators) ─→ CON-09 (producer registration)
CON-06 (design freeze)  ─┘                                    │
        │                                                     │
        ├─→ CON-03 (technical file) ─→ CON-04 (tests + NB) ──┼─→ DoC → CE mark
        │            │                                        │
        │            ├─→ CON-05 (module integration)          │
        │            ├─→ CON-07 (CRA classification)          │
        │            ├─→ CON-08 (battery)                     │
        │            └─→ CON-15 (packaging)                   │
        │                                                     │
        └─→ CON-11 (NMEA)  CON-10 (PILOT safety)  CON-17 (CRA reporting readiness)  CON-14 (ES language)
```

Reading the graph:

1. **Nothing downstream of CON-01/CON-13 can start.** A manufacturer is needed to sign, and code rights are
   needed to ship.
2. **CON-06 gates every technical blocker.** Freezing the regulatory-relevant configuration is the cheapest
   high-leverage action available and costs no external money.
3. **CON-04 gates the DoC and the CE mark** but not the file preparation (CON-03) — the file can be built in
   parallel with test planning.
4. **CON-11 is orthogonal** to CE: an NMEA certificate neither substitutes for nor is substituted by CE.
5. **CON-16 must be in place before CON-04 spend**, or money may be spent with a provider whose output has no
   legal value.

## 4. Claims that must remain prohibited while these blockers are open

| Prohibited claim | Blocked by |
|---|---|
| "CE marked" / "CE certified" / CE logo | CON-01, CON-03, CON-04 |
| "EMC compliant" / "RED compliant" / "tested to EN …" | CON-03, CON-04 |
| "Declared conformity" / "DoC available" | CON-01, CON-03 |
| "Notified body approved" / "certified by [body]" | CON-04, CON-16 |
| "NMEA 2000 certified" / "NMEA approved" / "NMEA 2000 compatible" | CON-11 |
| "NMEA 0183 compliant" / "conforms to NMEA 0183" | CON-11 |
| "IP67 / IPX7 / waterproof" or any IP rating | CON-04 (no IEC 60529 test executed) |
| "Marine grade" / "IEC 60945 tested" | CON-03, CON-04 |
| "MED approved" / wheel mark | CON-10, CON-14 (MED outside scope; no approval exists) |
| "CRA compliant" / "cyber-secure certified" | CON-07, CON-17 |
| "AIS transponder" / any transmit capability | CON-12 |
| "Battery replaceable by the user" unless designed and documented | CON-08 |
| "Ships in compliance with EU packaging rules" | CON-15 |
| "Ready for sale in Spain / Portugal" | CON-09, CON-14 |

## 5. Gate mapping

| Gate (D2 §9) | State | Conformity blockers that must close before the gate can pass |
|---|---|---|
| G1 Architecture selection | `CANDIDATE_ONLY` | CON-06 (partial), CON-05 |
| G2 Supplier engagement | `NOT_AUTHORIZED` | none directly; needed for CON-05 module conditions |
| G3 Prototype procurement | `NOT_AUTHORIZED` | CON-06, CON-01 |
| G4 Prototype testing | `NOT_AUTHORIZED` | CON-04, CON-10 (PILOT), CON-16 |
| G5 Marine integration testing | `NOT_AUTHORIZED` | CON-10 |
| G6 Regulatory evaluation | `NOT_STARTED` | CON-01…CON-18 (all) |
| G7 Production release | `NOT_AUTHORIZED` | CON-01…CON-18, plus quality and commercial approvals |

G6 is the gate this workstream exists to specify. It cannot be opened by MC-11 and it cannot be opened by
documentation: it opens when a frozen configuration, a named manufacturer, a technical file, accredited test
evidence and qualified external involvement exist.

## 6. Blocker closure record (empty by design)

| ID | Closed on | Closed by | Evidence reference |
|---|---|---|---|
| — | — | — | — |

No blocker has been closed. When one is, this table must name the licence, certificate, measurement,
signature or corporate decision that closed it, with an `EVD-` reference. A plan is not closure.

## 7. Closing statement

Eighteen conformity blockers stand between the proposed MAREA hardware and a lawful CE mark or compatibility
claim. Eight are critical, and none can be closed by analysis: they need a legal entity, an IP assignment,
a frozen design, physical prototypes, accredited laboratories, a notified body, a standards-body licence,
national registrations and qualified signatures. MC-11's contribution is to name them precisely, in the
right order, with the evidence that would close each one — and to state without qualification that
**no conformity is established for any MAREA configuration**.
