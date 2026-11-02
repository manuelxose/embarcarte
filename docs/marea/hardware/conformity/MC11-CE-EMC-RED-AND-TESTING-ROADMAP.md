# MC-11 — CE, EMC, RED and testing roadmap (D24)

Status of this document: `INTERNAL_ENGINEERING_RESEARCH — PLANNING ONLY`.

```
CE MARKING                    = NONE AFFIXED, NONE PERMITTED
EU DECLARATION OF CONFORMITY  = NONE
TECHNICAL FILE                = NONE
NOTIFIED BODY ENGAGED         = NONE
ACCREDITED LABORATORY ENGAGED = NONE
PHYSICAL TESTS                = NOT_EXECUTED (all)
COST EVIDENCE                 = BUDGETARY_INDICATION / UNKNOWN (no quotation obtained)
CONFIGURATION STATUS          = CE_ROUTE_NOT_STARTED (all families)
RETRIEVAL DATE                = 2026-11-02
```

Owner: `conformity-specialist`. Companion documents: D23 (`MC11-EU-REGULATORY-APPLICABILITY.md`) for the
applicability reasoning, D25 for NMEA, D26 for blockers. Machine-readable obligations:
`data/conformity-applicability.json`.

**Scope.** This document converts the applicability determinations of D23 into a *route*: which conformity
assessment procedure would be used per configuration, which test programmes would have to be executed
against which candidate standards, what the technical file and declaration of conformity would have to
contain, what marking and language obligations apply, what the cost evidence state is, and what evidence
would be required to move a configuration from `NOT_STARTED` to `CERTIFIED`.

**Non-assertions.** No test is executed. No laboratory, notified body, authority or supplier was engaged or
contacted. No price is a quotation. No configuration is compliant with anything. Nothing here authorises a
CE mark, a test report, a certificate, a declaration of conformity or a performance claim.

## 1. Route summary per configuration

Legend for "assessment": `SELF` = manufacturer's internal production control (no notified body),
`NB-LIKELY` = notified-body route must be assumed pending an assessment of harmonised-standard coverage,
`TBD` = requires the frozen design and the classification decision.

| Configuration | Governing act(s) for conformity assessment | Assessment | Notified body | Status |
|---|---|---|---|---|
| `NAV` (both editions) | CRA (software product) | SELF (default class) or third-party if classified important | TBD | `CE_ROUTE_NOT_STARTED` |
| `HUB-STANDARD` | RED (+ RoHS; CRA separately) | NB-LIKELY (Module B+C or H) | Yes (assumed) | `CE_ROUTE_NOT_STARTED` |
| `HUB-PRO` | RED (+ RoHS; CRA) | NB-LIKELY | Yes (assumed) | `CE_ROUTE_NOT_STARTED` |
| `AIS-RECEIVER` | RED (+ RoHS; CRA) | NB-LIKELY | Yes (assumed) | `CE_ROUTE_NOT_STARTED` |
| `AIS-CONNECTED` | RED (+ RoHS; CRA) | NB-LIKELY | Yes (assumed) | `CE_ROUTE_NOT_STARTED` |
| `PILOT-COASTAL` | EMC (+ RoHS; CRA; GPSR safety case) | SELF for EMC | No (EMC only) | `CE_ROUTE_NOT_STARTED` |
| `PILOT-SAIL` | EMC (+ RoHS; CRA; GPSR) | SELF for EMC | No (EMC only) | `CE_ROUTE_NOT_STARTED` |
| `PILOT-PRO` | EMC (+ RoHS; CRA; GPSR) | SELF for EMC | No (EMC only) | `CE_ROUTE_NOT_STARTED` |
| `SENSE-WIND`, `-TANKS`, `-ENV` | RED (if wireless) or EMC (if wired) (+ RoHS; CRA) | NB-LIKELY if RED; SELF if EMC | TBD | `CE_ROUTE_NOT_STARTED` |
| `SENSE-POWER`, `-BILGE`, `-ESSENTIALS` | EMC (+ RoHS; CRA) | SELF | No | `CE_ROUTE_NOT_STARTED` |
| `SENSE-SAIL`, `-SYSTEMS` | Per constituent module | Per item | TBD | `CE_ROUTE_NOT_STARTED` |
| `WATCH-CORE` | RED (+ RoHS; CRA; GPSR; Batteries) | NB-LIKELY | Yes (assumed) | `CE_ROUTE_NOT_STARTED` |
| `WATCH-PLUS` | RED (+ RoHS; CRA; GPSR; Batteries) | NB-LIKELY | Yes (assumed) | `CE_ROUTE_NOT_STARTED` |
| `DISPLAY-7` | RED (if radio) or EMC (if wired) (+ RoHS; CRA) | NB-LIKELY / SELF | TBD | `CE_ROUTE_NOT_STARTED` |
| `DISPLAY-LARGE-CONDITIONAL` | As `DISPLAY-7`, after hardware selection | TBD | TBD | `CE_ROUTE_NOT_STARTED` |
| `WEATHER` | No CE-marking act applies to the service as defined | — | No | `NOT_APPLICABLE_AS_DEFINED` |
| `FLEET` | No CE-marking act applies to the SaaS as defined | — | No | `NOT_APPLICABLE_AS_DEFINED` |

`CRA` is a CE-marking act in its own right for products with digital elements, but its main obligations
apply from 11 December 2027 (`EVD-MC11-301`). Because no MAREA product can be placed on the market before
that date, every hardware and software configuration will have to satisfy the CRA at first placement. The
route above therefore lists the CRA alongside the product-safety act rather than sequentially.

## 2. RED conformity-assessment decision logic

The RED offers, in essence, three routes for a radio product (structure evidenced by the Portuguese
transposition, `EVD-MC11-317`, Article 17 and Annexes II–IV; essential requirements `EVD-MC11-304`):

| Route | When available | What it requires | Fit for MAREA |
|---|---|---|---|
| **Module A** — internal production control | Where the manufacturer applies harmonised standards in full and no notified-body involvement is required | Technical documentation, self-assessment, CE marking, DoC | Unlikely for a novel marine multi-radio device: no harmonised standard covers every marine-specific aspect, and the RF/coexistence behaviour of a masthead or helm unit is not fully standardised |
| **Module B + C** — EU type-examination + conformity to type | Where harmonised standards are not (fully) applied, or the manufacturer chooses | Notified body examines the design/type and issues an EU type-examination certificate; manufacturer then controls production | The realistic route for HUB, AIS, WATCH, DISPLAY-with-radio |
| **Module H** — full quality assurance | Where the manufacturer operates an approved full quality system | Notified body assesses and surveils the quality system covering design, manufacture and final inspection | Only worth it at production volume; not available to a company with no quality system today |

**Decision rule used in this roadmap.** Until an assessment demonstrates full harmonised-standard coverage,
assume **Modules B + C with a notified body**. Reasons, all evidenced:

1. Article 3(3)(d)(e)(f) requirements were activated by Delegated Regulation (EU) 2022/30 for
   internet-connected radio equipment, and their repeal only takes effect on 11 December 2027
   (`EVD-MC11-304`). A product assessed before that date has to address them; a product assessed after is
   covered by the CRA. Either way, the cybersecurity essential requirements were never fully covered by a
   single harmonised standard, which is precisely the situation in which notified-body involvement is
   required.
2. The RED requires the equipment to be usable in at least one Member State without breaching spectrum-use
   conditions (`EVD-MC11-317` Art. 11(1)(b)), and Member States may impose additional putting-into-service
   requirements (the Portuguese transposition gives ANACOM that power, `EVD-MC11-317` Art. 8(2)). A marine
   multi-radio device raises coexistence and installation-antenna questions that a generic standard does not
   resolve.
3. **A pre-certified radio module does not remove the host obligation.** The module certificate covers the
   module; the host assessment must cover integration (antenna, shielding, power, coexistence) and the host
   declaration of conformity. This is the single most common false assumption in hardware programmes and is
   recorded as a blocker (CON-05).

**Self-declaration is a legitimate route** — for the EMC Directive on wired apparatus, and for
RoHS. It is *not* a shortcut: it shifts the entire evidential burden onto the manufacturer's technical file,
which does not exist (CON-03).

## 3. EMC and RED test-programme candidates

All tests below are `NOT_EXECUTED`. The candidate standards are **candidates only**: the standard texts were
not purchased or retrieved in MC-11, so the titles and editions must be confirmed against the harmonised-
standards lists published in the OJEU before they are used in a test plan. No laboratory was contacted and no
test slot, duration or price is asserted.

### 3.1 Emissions

| Test | Candidate method/standard | Applicable configurations | Why it matters here | Status |
|---|---|---|---|---|
| Radiated emissions 30 MHz – 6 GHz | EN 55032-class emission standard (candidate) | PILOT, HUB, AIS, DISPLAY, SENSE wired, WATCH | Long unshielded marine harnesses act as antennas; the helm and masthead are physically separated from the radio | `NOT_EXECUTED` |
| Conducted emissions 150 kHz – 30 MHz | EN 55032-class (candidate) | All 12 V DC apparatus | Vessel DC bus is shared with chargers, alternators and other electronics | `NOT_EXECUTED` |
| Motor-drive emissions (PWM) | EN IEC 61800-3-class where the drive is in scope (candidate, applicability to a 12 V marine drive to be confirmed) | PILOT (all editions) | 20 kHz PWM into a brushed motor is the dominant emitter; motor cable routing and filtering dominate the result | `NOT_EXECUTED` |
| Receiver spurious emissions | Radio-EMC standard for the relevant service (candidate) | AIS, WATCH, wireless SENSE modules | AIS reception is weak-signal; a locally noisy device degrades the very function it provides | `NOT_EXECUTED` |

### 3.2 Immunity

| Test | Candidate method | Applicable configurations | Why it matters here | Status |
|---|---|---|---|---|
| ESD (contact and air) | IEC 61000-4-2 (candidate) | All hardware | Wet hands, synthetic clothing, helm grab-rails | `NOT_EXECUTED` |
| Radiated RF immunity | IEC 61000-4-3 (candidate) | All hardware | Handheld VHF transmitters operated next to the device | `NOT_EXECUTED` |
| Electrical fast transients / burst | IEC 61000-4-4 (candidate) | All wired hardware | Motor switching, relays, pumps on the same bus | `NOT_EXECUTED` |
| Surge | IEC 61000-4-5 (candidate) | All wired hardware; AIS antenna path | Lightning-induced transients, alternator load dump | `NOT_EXECUTED` |
| Conducted RF immunity | IEC 61000-4-6 (candidate) | All wired hardware | Coupled RF on long harnesses | `NOT_EXECUTED` |
| Voltage dips / interruptions | IEC 61000-4-11 (candidate) | All hardware | Engine cranking brown-out | `NOT_EXECUTED` |
| Automotive-style transients | ISO 7637-2 as candidate practice for a 12 V DC bus (candidate; applicability to be confirmed) | SENSE-POWER, HUB, PILOT | Load dump and reverse polarity are normal hazards on small vessels | `NOT_EXECUTED` |

### 3.3 Radio spectrum (RED configurations only)

| Test | Candidate standard | Configurations | Status |
|---|---|---|---|
| 2.4 GHz wideband (power, bandwidth, spurious, duty cycle) | EN 300 328 (candidate) | HUB, DISPLAY, WATCH, wireless SENSE | `NOT_EXECUTED` |
| 5 GHz RLAN | EN 301 893 (candidate) | HUB, DISPLAY, WATCH | `NOT_EXECUTED` |
| Sub-GHz short range | EN 300 220 (candidate) | Wireless SENSE modules (if sub-GHz) | `NOT_EXECUTED` |
| Cellular radio parameters | EN 301 908-series (candidate; depends on the chosen module) | WATCH | `NOT_EXECUTED` |
| Receiver parameters (sensitivity, blocking, adjacent-channel selectivity, spurious) | Service-appropriate radio standard (candidate) | AIS-RECEIVER, AIS-CONNECTED | `NOT_EXECUTED` |
| RF exposure assessment | EN 62311 / EN 50663-class (candidate) | All radio configurations, especially a masthead or body-worn device | `NOT_EXECUTED` |
| Radio EMC | EN 301 489-1 with the service-specific parts (candidate) | All radio configurations | `NOT_EXECUTED` |

### 3.4 Safety

| Test | Candidate standard | Configurations | Status |
|---|---|---|---|
| Electrical safety of IT/communication equipment | EN IEC 62368-1 (candidate) | HUB, AIS, DISPLAY, WATCH, SENSE | `NOT_EXECUTED` |
| Battery safety (cells and packs) | IEC 62133-2 (candidate) | WATCH, cell-powered SENSE, any backup battery | `NOT_EXECUTED` |
| Thermal behaviour under enclosure and sunlight | Internal test plan (no standard selected) | DISPLAY, HUB, PILOT control computer | `NOT_EXECUTED` |
| Ingress protection — **as a candidate requirement, never an achieved rating** | IEC 60529 (candidate) | All marine-mounted hardware | `NOT_EXECUTED` |

**Ingress protection is where claims are most often fabricated.** IEC 60529 testing produces an IP code for
a tested sample under defined conditions; it does not follow from an enclosure drawing, a gasket datasheet or
a supplier's marketing. No IP rating of any MAREA configuration exists, and `ENVIRONMENTAL_RATING_CLAIM` is
`PROHIBITED` throughout MC-11.

## 4. Maritime and industrial standards — scope discipline

| Standard | Genuine scope | Does it apply to MAREA? | Correct use here |
|---|---|---|---|
| **IEC 60945** (maritime navigation and radiocommunication equipment — general requirements, methods of testing) | Shipborne navigation and radiocommunication equipment; associated with SOLAS/IMO equipment practice | **Not mandatory** for a recreational-craft accessory. Its scope is ship equipment | Candidate *robustness reference* for an environmental/EMC qualification plan, adopted voluntarily. Never cite it as a legal requirement, never claim compliance |
| **IEC 61162-1** (NMEA 0183-equivalent digital interface, single talker/multiple listeners) | Marine navigation interface | Candidate interface standard only | Candidate for electrical-layer conformance of a serial interface. Standard text not retrieved; NMEA 0183 is the licensed source (D25) |
| **IEC 61162-3** (NMEA 2000-equivalent serial data instrumentation network) | Marine CAN instrumentation network | Not implemented | Candidate reference only; NMEA 2000 certification is the governing scheme (D25) |
| **ISO 11783 (ISOBUS)** | Agricultural/forestry machinery CAN network derived from the same J1939 base | Not applicable as a legal requirement; CAN-level engineering reference only | Use only as an engineering reference for CAN physical-layer practice, never as a compliance claim |
| **IEC 60068-2 series** | Environmental test methods (vibration, damp heat, salt mist, thermal cycling) | Voluntary candidate | Candidate qualification test methods for the environmental reliability plan |
| **IEC 60529** | Degrees of protection provided by enclosures | Voluntary candidate; becomes a customer expectation, not a legal requirement | Candidate test requirement with no achieved rating |

Anti-pattern recorded: quoting IEC 60945 on a product page to imply marine approval. It conveys neither
legal compliance nor measured performance; the standard was not retrieved and nothing in MC-11 has been
tested against it.

## 5. Notified-body vs self-declaration: the practical decision tree

```
Is an intentional radio function in the frozen BOM?
├─ NO  → EMC Directive route
│        └─ Apply harmonised standards in full?  YES → self-declaration (Module A equivalent)
│                                                NO  → self-declaration + documented technical justification
│        (EMC has no notified-body requirement; the technical file carries the risk)
└─ YES → RED route
         └─ Are ALL applicable harmonised standards applied in full,
            including the Article 3(3)(d)(e)(f) / CRA-overlap aspects?
            ├─ YES → Module A possible (rare for this product class)
            └─ NO  → Module B+C (or H) with a notified body
                     └─ Does the product classify as "important" or "critical" under the CRA?
                        ├─ YES → third-party assessment under the CRA as well
                        └─ NO  → CRA default class, but the CRA DoC and CE marking still apply
```

Three practical rules:

1. **The notified-body question is answered by evidence, not by preference.** It is answered by comparing the
   frozen design against the harmonised-standard list, which cannot be done before the design is frozen.
2. **A notification is not an approval.** Only notified bodies may issue certificates of compliance for
   harmonised products and only in the area for which they are notified; "voluntary certificates" from other
   bodies are not a recognised means to prove compliance and have no value in market-surveillance or customs
   checks (Commission position on unregulated certificates, `EVD-MC11-304`, `EVD-MC11-305`).
3. **CE marking cannot be affixed before testing and the prescribed assessment** (`EVD-MC11-304`).

## 6. Technical-file structure (what would have to exist)

The RED technical documentation content is set out in Annex V of the directive, reproduced in the Portuguese
transposition (`EVD-MC11-317`). Mapped to MAREA's present state:

| Required element (RED Annex V structure) | MAREA state |
|---|---|
| General description incl. photographs/illustrations of external features, marking and internal layout | NONE — no physical article exists |
| Software/firmware versions liable to affect conformity | NONE — no firmware baseline exists |
| User information and installation instructions | DRAFT ONLY in product dossiers; not conformity-grade, languages not finalised |
| Design and manufacturing drawings, component/sub-assembly/circuit schematics | NONE — no schematics, no PCB layout |
| Descriptions and explanations of the drawings and operation | NONE |
| List of harmonised standards applied in full or in part, and where not applied a description of the solutions adopted | NONE — standards not yet selected or licensed |
| Copy of the EU declaration of conformity | NONE — cannot exist before assessment |
| EU type-examination certificate where Module B applies | NONE — no notified body engaged |
| Design calculations, examinations performed, test reports | NONE — no calculation file, no test report |
| Explanation of conformity with the spectrum-use requirement and of any packaging information | NONE |

Retention: the manufacturer must keep the technical documentation and the declaration of conformity for
**10 years** from placing on the market (`EVD-MC11-317` Art. 11(1)(f)). No retention process exists.

**Module A / EMC technical file**: even where no notified body is involved, the manufacturer must be able to
demonstrate conformity on request; the CE-marking guidance places the technical documentation obligation on
the manufacturer before market placement (`EVD-MC11-305`). A self-declared EMC file without test evidence is
not a technical file — it is an assertion.

## 7. Declaration-of-conformity workflow

| Step | What it is | Who signs | MAREA state |
|---|---|---|---|
| 1 | Designated manufacturer established (legal person, address, contact) | Corporate owner | `UNDETERMINED` |
| 2 | Applicable acts fixed for the frozen configuration | Compliance | `NOT_STARTED` (D23 is a scoping analysis, not a freeze) |
| 3 | Conformity assessment executed and evidence obtained | Compliance + lab | `NOT_STARTED` |
| 4 | Technical file assembled and internally reviewed | Compliance | `NOT_STARTED` |
| 5 | DoC drawn up with the content of RED Annex VI (`EVD-MC11-317`) — product identification, manufacturer/mandated representative, statement of sole responsibility, object of declaration, list of applicable Union acts, harmonised standards/technical specifications with versions, notified body details and certificate number where applicable, accessories/software covered, place/date, name/function, signature | Named natural person on behalf of the manufacturer | `NOT_STARTED` |
| 6 | DoC signed — a legally binding signature under the manufacturer's sole responsibility (`EVD-MC11-305`) | Named natural person | `NOT_STARTED` |
| 7 | Copy of the DoC supplied with every unit, or simplified DoC with URL to the full text (`EVD-MC11-317` Arts. 11(1)(o), 18(3)-(4), Annex VII) | Manufacturer | `NOT_STARTED` |
| 8 | CE marking affixed, notified-body number added where involved (`EVD-MC11-305`) | Manufacturer | PROHIBITED |

The required order is not negotiable: no DoC before assessment, no CE mark before the DoC, no
self-declaration without a technical file.

## 8. Marking and language obligations

| Obligation | Legal basis | MAREA state |
|---|---|---|
| CE mark, visibly and legibly, on the product or on packaging/accompanying documents if the product does not permit it; components same vertical dimension, not smaller than 5 mm | `EVD-MC11-305` | NONE |
| Notified-body identification number next to the CE mark where a notified body was involved | `EVD-MC11-305` | NONE (no body) |
| Manufacturer name/trademark and postal address, or importer details, on the product or packaging or accompanying document | `EVD-MC11-317` Art. 11(1)(k), Art. 13(2)(f) | NONE (identity undetermined) |
| Type, batch or serial number or other identification | `EVD-MC11-317` Art. 11(1)(j) | NONE |
| Frequency bands and maximum RF power transmitted | `EVD-MC11-317` Art. 11(1)(n) | NONE — and cannot be stated before the radio set is frozen |
| Identification of Member States/areas with restrictions on putting into service or authorisation requirements | `EVD-MC11-317` Art. 11(1)(p) | NONE |
| Equipment class/alert pictogram where Implementing Regulation (EU) 2017/1354 applies | `EVD-MC11-304` | NONE |
| Instructions and safety information **in Portuguese** for Portugal | `EVD-MC11-317` Art. 11(1)(l) | NOT AVAILABLE |
| Instructions/safety information in Spanish for Spain | Spanish rule NOT VERIFIED (RD 188/2016 not retrieved) | `LEGAL_REVIEW_REQUIRED` |
| WEEE crossed-out wheeled-bin symbol plus producer mark — **distinct from the MED wheel mark** | `EVD-MC11-314` | NONE |
| Battery separate-collection, capacity and chemistry marking; QR code from 2027 | `EVD-MC11-310` | NONE |
| Packaging material/sorting labels | `EVD-MC11-316` | NONE |
| GPSR: product safety and traceability information, manufacturer/importer contact details, distance-selling pre-contractual information | `EVD-MC11-308` | NONE |

**Trademark trap recorded explicitly:** the MED "wheel mark" (ship's wheel) and the WEEE "crossed-out
wheeled bin" are different marks with different legal bases. Neither may be used. The NMEA wordmark and logo
are a third distinct mark (D25).

## 9. Indicative cost evidence state

| Cost item | Evidence state | Amount | Note |
|---|---|---|---|
| EMC pre-compliance scan (one configuration) | `UNKNOWN` | `null` | No laboratory contacted; no quotation obtained |
| EMC full test campaign (emissions + immunity) | `UNKNOWN` | `null` | Depends on ports, test hours, re-tests |
| RED radio test campaign (per radio interface) | `UNKNOWN` | `null` | Depends on technology/bands; not estimable from public data alone |
| Notified-body assessment (Module B+C or H) | `UNKNOWN` | `null` | Depends on module, scope, surveillance obligations |
| CRA third-party assessment if classified important | `UNKNOWN` | `null` | Classification not yet determined |
| Safety testing (EN IEC 62368-1-class) | `UNKNOWN` | `null` | No lab quote |
| Battery testing (IEC 62133-2-class) | `UNKNOWN` | `null` | Only if a battery is in the BOM |
| Environmental / ingress testing | `UNKNOWN` | `null` | No lab quote; test matrix undecided |
| NMEA 0183 standard licence | `BUDGETARY_INDICATION` | USD 1,150 (manufacturer member) / 7,500 (government, industrial, testing) / 10,000 (consumer electronics) | Published NMEA price schedule, not a MAREA quotation (`EVD-MC11-320`, detail in D25) |
| NMEA 0183 manufacturer mnemonic code | `BUDGETARY_INDICATION` | USD 200 + purchase of the standard | Published NMEA administrative fee (`EVD-MC11-320`) |
| NMEA 2000 licence / manufacturer code / product code / certification | `UNKNOWN` | `null` | The NMEA 2000 fee table did not render on the retrieved page; **no 2000 figure is asserted** (`EVD-MC11-319`) |
| Producer registration (ES/PT WEEE, packaging, batteries) | `UNKNOWN` | `null` | National fee schedules not retrieved |

**No total certification budget is presented.** A total containing `UNKNOWN` inputs would be `INCOMPLETE`
under the data contract. Any future figure must be a `FORMAL_SUPPLIER_QUOTATION` in its own evidence class,
labelled as such, and may never be presented as a guaranteed price.

## 10. Evidence required to move from `NOT_STARTED` to `CERTIFIED` — staged gate plan

The stages are ordered; each gate is a hard prerequisite for the next. "CERTIFIED" here means *the
manufacturer holds a complete technical file, the prescribed assessment outcome and a signed DoC, and is
therefore entitled to affix the CE mark* — not a claim that MC-11 made.

| Gate | Evidence required | Who can produce it | Current state |
|---|---|---|---|
| **C0 — Configuration freeze** | Frozen BOM, schematic, PCB, firmware version, interface list (radio/no-radio decided), enclosure, supply definition, battery decision | Engineering + hardware | `NOT_FROZEN` |
| **C1 — Manufacturer designation** | Legal entity named as manufacturer; EU importer/authorised representative and GPSR responsible operator identified; LVD role decided if a PSU is bundled | Corporate + legal | `UNDETERMINED` (CON-01) |
| **C2 — Applicability freeze** | D23 rows re-run against the frozen configuration, signed off by a qualified compliance person, with the harmonised-standard list from the OJEU | Compliance + qualified review | `SCOPING_ONLY` |
| **C3 — Technical file** | Every RED Annex V element present (or the EMC-equivalent file), internal review record | Compliance | `EMPTY` (CON-03) |
| **C4 — Pre-compliance** | Bench pre-scan of emissions at PCB/harness level; ESD pre-test; RF pre-scan against the intended bands; design changes closed | Engineering + external lab | `NOT_EXECUTED` |
| **C5 — Accredited testing** | Full test reports from an accredited laboratory against the confirmed harmonised standards; re-tests after failures documented | Accredited laboratory | `NOT_EXECUTED` (CON-04) |
| **C6 — Notified-body assessment** (RED configurations) | EU type-examination certificate and report, or Module H approval | Notified body | `NOT_ENGAGED` (CON-04) |
| **C7 — CRA evidence** (all digital products) | Risk assessment, SBOM, vulnerability-handling process, secure-update evidence, support-period statement, CRA DoC; third-party assessment if classified important | Engineering + compliance | `NOT_STARTED` |
| **C8 — DoC and marking** | Signed DoC (Annex VI content), CE marking artwork verified, notified-body number where applicable, marking and language review for ES/PT | Manufacturer's named signatory | `PROHIBITED` |
| **C9 — Post-market** | Traceability records, complaints register, incident and vulnerability reporting process, corrective-action procedure, retention for 10 years | Compliance + operations | `NONE` |

### 10.1 What would be needed per family to move from `NOT_STARTED` to `CERTIFIED`

| Configuration | Minimum evidence set beyond the frozen design | Blocking external dependency |
|---|---|---|
| `HUB` (both) | C1–C9 incl. RED Modules B+C/H; radio test reports per interface; CRA file; packaging and WEEE registration | Notified body, accredited lab, named manufacturer |
| `AIS` (both) | C1–C9 with receiver-parameter test reports and antenna guidance; **receive-only declaration** | As HUB, plus RF test capability for a VHF receiver |
| `PILOT` (all) | C1–C9 with EMC campaign on the motor drive; GPSR safety case; independent safety review; bench and sea-trial evidence before *any* sale | Accredited lab, competent marine engineer, vessel access |
| `SENSE` modules | C1–C9 per module (RED or EMC as decided); calibration/accuracy evidence; ingress test evidence | Lab, and a decision on each module's radio and battery content |
| `WATCH` (both) | C1–C9 with cellular/Wi-Fi/BLE/NMEA-range radio reports; CRA file incl. cloud path; battery safety | Notified body, lab, MVNO/connectivity terms |
| `DISPLAY` (both) | C1–C9 with radio or EMC campaign; optical/thermal/ingress evidence | Lab, and panel/compute-module supplier declarations |
| `NAV` | C7 (CRA) plus software quality evidence; no CE-marking act other than the CRA | None external, but the CRA work is substantial |
| `WEATHER`, `FLEET` | No CE evidence — but re-run D23 if a client application or edge device is placed on the market | Product decision |

## 11. Test matrix state (all `NOT_EXECUTED`)

| Configuration | EMC emissions | EMC immunity | Radio spectrum | Safety | Ingress | Environmental | CRA security |
|---|---|---|---|---|---|---|---|
| HUB-STANDARD / -PRO | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` |
| AIS-RECEIVER / -CONNECTED | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` |
| PILOT-COASTAL / -SAIL / -PRO | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` |
| SENSE (8 editions) | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` |
| WATCH-CORE / -PLUS | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` |
| DISPLAY-7 / -LARGE | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` | `NOT_EXECUTED` |
| NAV | n/a | n/a | n/a | n/a | n/a | n/a | `NOT_EXECUTED` |
| WEATHER / FLEET | n/a | n/a | n/a | n/a | n/a | n/a | n/a (out of scope as defined) |

There is **zero** test evidence of any kind for any configuration. Not a bench measurement, not a
pre-scan, not a thermal image, not an ingress trial. Every row above is a plan, not a result.

## 12. Risks specific to the certification route

| ID | Risk | Effect | Mitigation state |
|---|---|---|---|
| CERT-R1 | Notified-body route assumed but never budgeted | Under-funded programme; late redesign | `UNMITIGATED` — cost `UNKNOWN` |
| CERT-R2 | Module certificates treated as host compliance | Non-compliant product and invalid DoC | Recorded as blocker CON-05; no mitigation |
| CERT-R3 | Radio interface set changed after testing | Re-test and re-assessment | Requires a configuration-control process that does not exist |
| CERT-R4 | Battery added late (coin cell, backup pack) | Removability redesign + battery compliance | `UNMITIGATED` |
| CERT-R5 | Spanish-language requirement discovered after documentation lock | Documentation rework | `LEGAL_REVIEW_REQUIRED` (L2 in D23) |
| CERT-R6 | CRA classification as "important" after architecture freeze | Third-party assessment added late | Classification not determined (D23 §6.4) |
| CERT-R7 | IP or environmental claim made from a design intent | Unlawful claim; recall exposure | Prohibited by invariant `ENVIRONMENTAL_RATING_CLAIM = PROHIBITED`; enforced by validator |
| CERT-R8 | Voluntary/third-party "certificate" purchased that is not a notified-body certificate | False assurance, no legal value | Commission position recorded (`EVD-MC11-304`); no such certificate exists |

## 13. Closing statement

The CE/EMC/RED route is **planned but not started**. For the twelve configurations with an intentional radio
function the realistic route is Modules B+C (or H) with a notified body; for the wired configurations it is
manufacturer self-declaration under the EMC Directive; RoHS and the CRA apply on top in every hardware and
software case. None of the evidence such a route requires exists: no frozen design, no designated
manufacturer, no technical file, no accredited test, no notified body, no declaration of conformity, no CE
mark. This document defines the sequence that would have to be executed — it does not shorten it, and it
does not replace the external parties whose assessments are mandatory.
