# MC-11 — EU regulatory applicability per configuration (D23)

Status of this document: `INTERNAL_ENGINEERING_RESEARCH — APPLICABILITY ASSESSMENT ONLY`.

```
CONFORMITY ESTABLISHED                 = NONE
CE MARKING CLAIM                       = PROHIBITED (none affixed, none permitted)
EU DECLARATION OF CONFORMITY           = NONE EXISTS
TECHNICAL FILE                         = NONE EXISTS
NOTIFIED-BODY INVOLVEMENT              = NONE (none engaged, none contacted)
TEST EVIDENCE                          = NONE (PHYSICAL_TESTS = NOT_EXECUTED)
NMEA CERTIFICATION / TYPE APPROVAL     = NONE (NMEA2000_CERTIFIED = false)
PRODUCTS PLACED ON THE EU MARKET       = NONE (COMMERCIAL_AVAILABILITY = NOT_FOR_SALE)
MANUFACTURER / ECONOMIC OPERATOR       = UNDETERMINED
RETRIEVAL DATE OF ALL EXTERNAL SOURCES = 2026-11-02
```

Owner: `conformity-specialist`. Milestone MC-11 of 36. Branch
`feature/marea-mc11-hardware-sourcing-conformity`. Machine-readable companion:
`data/conformity-applicability.json`; evidence shard: `data/evidence/conformity.json`
(`EVD-MC11-301…323`).

**What this document is.** A reasoned applicability analysis, per configuration, of the Union
harmonisation and product-safety legislation that *would* govern each proposed MAREA hardware
configuration if it were placed on the EU market — together with a written reason for every
inclusion **and** every exclusion.

**What this document is not.** It is not a legal opinion, not a conformity assessment, not a
declaration of conformity, not a CE-marking statement, not a construction-product or marine-equipment
approval, and not evidence that any MAREA configuration complies with anything. No notified body,
laboratory, authority, supplier or customer was contacted. Every uncertain legal reading is marked
`LEGAL_REVIEW_REQUIRED` and stays open — ambiguity is not resolved here by assertion.

## 0. Non-assertions (binding for the whole milestone)

Nothing in this document asserts, and nothing may be read as asserting: CE marking; an EU declaration
of conformity; EMC, RED, LVD, RoHS, WEEE, GPSR or CRA compliance; NMEA 2000 certification or licence;
NMEA 0183 conformity; MED wheel-mark approval; AIS type approval; any notified-body certificate; any
test report; any IP, temperature, accuracy or EMC rating; any interoperability claim; any supplier
authorisation; any trademark clearance; any price. None of these exists in the MC-11 evidence set.

## 1. Method

1. **Source discipline.** Only pages actually fetched on 2026-11-02 are cited, with the retrieval date.
   A page that could not be fetched is recorded `INACCESSIBLE` and its content is not quoted
   (see §10). Policy pages of the European Commission are used for dates and instrument structure;
   EUR-Lex summaries are used for scope and obligations; the Portuguese transposition `Decreto-Lei
   n.º 57/2017` is used as the primary text for the RED requirement mechanics (it is national law, and
   is labelled as such wherever cited); the NMEA official pages are used for standards-body facts.
2. **Configuration first.** No directive is applied to "MAREA" as a brand. Each family and, where the
   obligation changes, each edition is assessed on its actual function, its actual radio interfaces,
   its actual electrical supply and the actual economic-operator role.
3. **Function decides scope.** The two questions that move most rows are (a) *is there an intentional
   radio function?* (RED vs EMC) and (b) *is apparatus placed on the market at all?* (hardware families
   vs software/service families).
4. **Both directions are written.** A row that applies carries a scope rationale; a row that does not
   apply carries a non-scope rationale and, where the boundary is uncertain, a re-assessment trigger.
5. **Unknown stays unknown.** Where the answer depends on an unfrozen design choice (radio inclusion,
   battery presence, bundled mains power supply, MED channel), the row states the conditional logic
   instead of pretending the choice is made.

## 2. Configuration model

| Family | Editions assessed | Hardware class | Radio functions in the assessed configuration | Electrical supply |
|---|---|---|---|---|
| `NAV` | NAV-ESSENTIAL, NAV-PRO (family row) | `SOFTWARE_ONLY` | None placed on the market (host device radios) | n/a (customer device) |
| `HUB` | HUB-STANDARD, HUB-PRO | `PROPRIETARY_HARDWARE` | Wi-Fi/BLE candidates, cellular optional — **not frozen** | 12 V DC |
| `AIS` | AIS-RECEIVER, AIS-CONNECTED | `PROPRIETARY_HARDWARE` | Intentional VHF AIS **receiver** (161.975/162.025 MHz), no transmitter; AIS-CONNECTED adds Wi-Fi candidate | 12 V DC |
| `PILOT` | PILOT-COASTAL, PILOT-SAIL, PILOT-PRO | `SAFETY_BLOCKED` hardware | None frozen (wired); Wi-Fi setup interface candidate | 12 V DC + motor drive stage |
| `SENSE` | WIND, POWER, BILGE, TANKS, ENV, ESSENTIALS, SAIL, SYSTEMS | `PROPRIETARY_HARDWARE` | Module-dependent: wireless (BLE/sub-GHz) candidates for WIND/TANKS/ENV; POWER/BILGE wired | 12 V DC and/or local cell |
| `WATCH` | WATCH-CORE, WATCH-PLUS | `PROPRIETARY_HARDWARE` | Cellular + Wi-Fi + BLE + GNSS — radio equipment in every plausible configuration | 12 V DC / battery |
| `DISPLAY` | DISPLAY-7, DISPLAY-LARGE-CONDITIONAL | `PROPRIETARY_HARDWARE` | Wi-Fi/BLE candidates; wired alternative — **not frozen** | 12 V DC |
| `WEATHER` | WEATHER-STANDARD, WEATHER-PRO (family row) | `LICENSED_DATA_SERVICE` | None (service) | n/a |
| `FLEET` | FLEET-START, FLEET-BUSINESS, FLEET-ENTERPRISE (family row) | `SOFTWARE_ONLY` / SaaS | None (service; `FLEET_DEFAULT_HARDWARE = false`) | n/a |

Rows in the data file: **22** (9 families; per-edition rows where the obligation set differs). Every row
carries `status: APPLICABILITY_ASSESSED_NOT_CERTIFIED` and its own `qualifiedReviewRequired` flag.

## 3. Legislative register (as verified on 2026-11-02)

| ID | Instrument | Why it is in the register | Verified deadlines | Source |
|---|---|---|---|---|
| `LEG-RED-2014-53-EU` | Directive 2014/53/EU (RED) | Governs any product that intentionally transmits/receives radio waves | Applicable 13 Jun 2016; transitional ended 12 Jun 2017 (Art. 48); repeal of Delegated Reg. (EU) 2022/30 by (EU) 2026/339 effective 11 Dec 2027 | `EVD-MC11-304` |
| `LEG-EMC-2014-30-EU` | Directive 2014/30/EU (EMC) | Governs non-radio apparatus | Applies 20 Apr 2016 (repealed 2004/108/EC) | `EVD-MC11-307` |
| `LEG-LVD-2014-35-EU` | Directive 2014/35/EU (LVD) | Governs equipment at 50–1000 V AC / 75–1500 V DC | Applicable 20 Apr 2016 | `EVD-MC11-306` |
| `LEG-ROHS-2011-65-EU` | Directive 2011/65/EU (RoHS) | Governs hazardous substances in EEE | Open catch-all category from July 2019 | `EVD-MC11-313` |
| `LEG-WEEE-2012-19-EU` | Directive 2012/19/EU (WEEE), as amended by (EU) 2024/884 | Producer responsibility for EEE | 65 % collection rate "from 2019" | `EVD-MC11-314` |
| `LEG-GPSR-2023-988` | Regulation (EU) 2023/988 (GPSR) | General consumer product safety, residual risks | Applies 13 Dec 2024 ⚠ (date not rendered on the retrieved summary) | `EVD-MC11-308` |
| `LEG-CRA-2024-2847` | Regulation (EU) 2024/2847 (CRA) | Horizontal cybersecurity for products with digital elements | In force 10 Dec 2024; reporting from 11 Sep 2026; main obligations 11 Dec 2027 | `EVD-MC11-301`, `301`–`303` |
| `LEG-BAT-2023-1542` | Regulation (EU) 2023/1542 (Batteries) | Any battery incorporated in a product | Applies 18 Feb 2024; removability by 2027; labelling from 2026, QR 2027 | `EVD-MC11-309`, `310` |
| `LEG-MED-2014-90-EU` | Directive 2014/90/EU (MED) | Only if a product is marine equipment on an EU-flag ship under the conventions | — (transposition date not rendered) | `EVD-MC11-311` |
| `LEG-RCD-2013-53-EU` | Directive 2013/53/EU (Recreational Craft) | Adjacent: governs craft, designated components, propulsion engines | — | `EVD-MC11-315` |
| `LEG-PPWR-2025-40` | Regulation (EU) 2025/40 (Packaging and packaging waste) | Producer responsibility and packaging conformity | Applies "from 2026" ⚠ (exact date not rendered) | `EVD-MC11-316` |

⚠ = dated field flagged for qualified confirmation; the retrieved page did not display the date and no
day was invented. The register is **11 Union acts**; the two national transposition instruments relied
on for Spanish/Portuguese obligations are recorded separately in §8 and §9 and in the data file's
`nationalImplementation` array, so that the RED obligation is not double-counted.

## 4. Applicability matrix (applicable = A, non-applicable with written rationale = N)

| Configuration | RED | EMC | LVD | RoHS | WEEE | GPSR | CRA | BAT | MED | RCD | PPWR |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `NAV` (both editions) | N | N | N | N | N | N | **A** | N | N | N | N |
| `HUB-STANDARD` | **A** (conditional on radio) | N (superseded by RED if radio) | N | **A** | **A** | **A** | **A** | A (conditional) | N | N | **A** |
| `HUB-PRO` | **A** (conditional on radio) | N (as above) | N | **A** | **A** | **A** | **A** | A (conditional) | N | N | **A** |
| `AIS-RECEIVER` | **A** (intentional receiver) | N (RED carries EMC) | N | **A** | **A** | **A** | **A** | N (none proposed) | N | N | **A** |
| `AIS-CONNECTED` | **A** | N | N | **A** | **A** | **A** | **A** | A (conditional) | N | N | **A** |
| `PILOT-COASTAL` | N (no radio frozen) | **A** (PWM motor drive) | N | **A** | **A** | **A** | **A** | A (conditional) | N | N | **A** |
| `PILOT-SAIL` | N | **A** | N | **A** | **A** | **A** | **A** | A (conditional) | N | N | **A** |
| `PILOT-PRO` | N | **A** | N | **A** | **A** | **A** | **A** | A (conditional) | N | N | **A** |
| `SENSE-WIND` | **A** (wireless plausible) | N (if radio) | N | **A** | **A** | **A** | **A** | A (conditional) | N | N | **A** |
| `SENSE-POWER` | N (wired) | **A** | N | **A** | **A** | **A** | **A** | N | N | N | **A** |
| `SENSE-BILGE` | N (wired) | **A** | N | **A** | **A** | **A** | **A** | N | N | N | **A** |
| `SENSE-TANKS` | **A** (wireless plausible) | N (if radio) | N | **A** | **A** | **A** | **A** | A (conditional) | N | N | **A** |
| `SENSE-ENV` | **A** (wireless plausible) | N (if radio) | N | **A** | **A** | **A** | **A** | **A** (likely) | N | N | **A** |
| `SENSE-ESSENTIALS` (kit) | N | **A** | N | **A** | **A** | **A** | **A** | N | N | N | **A** |
| `SENSE-SAIL` (kit) | **A** (if wireless module) | N (per item) | N | **A** | **A** | **A** | **A** | A (conditional) | N | N | **A** |
| `SENSE-SYSTEMS` (kit) | **A** (if wireless module) | N (per item) | N | **A** | **A** | **A** | **A** | A (conditional) | N | N | **A** |
| `WATCH-CORE` | **A** | N (RED carries EMC) | N | **A** | **A** | **A** | **A** | **A** | N | N | **A** |
| `WATCH-PLUS` | **A** | N | N | **A** | **A** | **A** | **A** | **A** | N | N | **A** |
| `DISPLAY-7` | **A** (conditional on radio) | N (if radio) | N | **A** | **A** | **A** | **A** | A (conditional) | N | N | **A** |
| `DISPLAY-LARGE-CONDITIONAL` | **A** (conditional on radio) | N (if radio) | N | **A** | **A** | **A** | **A** | A (conditional) | N | N | **A** |
| `WEATHER` | N | N | N | N | N | N | N ⚠ | N | N | N | N |
| `FLEET` | N | N | N | N | N | N | N ⚠ | N | N | N | N |

⚠ WEATHER/FLEET: the CRA exclusion applies to the service as defined and lapses immediately if a client
application or an edge device is placed on the market (see §6.4 and the data file `applicableNote`).

Counts over the 22 rows (computed from `data/conformity-applicability.json`): RED applicable to **13** rows
(and excluded, with reasons, in 9); EMC to **6**; LVD **0**; RoHS **19**; WEEE **19**; GPSR **19**; CRA **20**
(the 19 hardware rows plus `NAV`); Batteries **12** (of which 9 are conditional on a battery being present);
MED **0**; RCD **0**; packaging **19**. LVD, MED and RCD appear only as non-applicable rows — zero by
reasoning, not by omission: §5.2, §7 and §7.1 give the reasons and the re-assessment triggers.

## 5. Cross-cutting determinations (with the reasoning that makes them reusable)

### 5.1 RED vs EMC — one regulation governs a radio product, not two

Where equipment intentionally transmits and/or receives radio waves, it is *radio equipment* under the
RED definition, and the RED carries the health/safety, EMC and efficient-spectrum essential requirements
for it (`EVD-MC11-304`). The EMC Directive does not apply on top of the RED: the Portuguese transposition
states the exclusion expressly — radio equipment covered by `Decreto-Lei n.º 57/2017` is not subject to
the EMC transposition (`Decreto-Lei n.º 31/2017`) except for the safety provision of its Article 4(1)(a)
(`EVD-MC11-317`, Article 2(2)).

Consequence used throughout §4: a configuration with a frozen radio interface is an RED row and its EMC
row becomes non-applicable **conditional on that radio remaining in the frozen design**; a configuration
that is fully wired is an EMC row and its RED row becomes non-applicable. The two rows are mutually
exclusive in any final assessment; keeping both in the analysis (with the conditional rule written out)
is what prevents the common error of testing and declaring both, or of assuming a module certificate
removes the host obligation.

### 5.2 LVD — zero applicable rows, and the exact condition that would flip them

The LVD covers electrical equipment operating with an input **or output** voltage between 50 and 1000 V
AC or between 75 and 1500 V DC (`EVD-MC11-306`). Every proposed MAREA configuration is supplied at
12 V DC nominal (marine system, typically 9–16 V DC) and steps down internally to 5 V / 3.3 V. No mains
circuit is proposed inside any product. The LVD therefore does not apply to the product itself.

The condition that flips the determination is *a bundled mains power supply or charger supplied under the
MAREA brand*: the LVD applies to that unit on its input voltage, and whoever places it on the market under
its own name becomes the manufacturer of that unit. A third-party CE-marked PSU sold as a separate
accessory under its own manufacturer's name does not move the MAREA product into the LVD — but the
economic-operator analysis of that accessory still has to be done. Every LVD row carries
`qualifiedReviewRequired: true` for exactly this reason.

### 5.3 RoHS, WEEE and packaging — the "CE vs non-CE" distinction that marketing copy gets wrong

RoHS is a CE-marking act: the manufacturer designs and produces to substance restrictions, holds the
technical documentation, and CE marks (`EVD-MC11-313`, `EVD-MC11-305`). WEEE is **not** a CE-marking act:
it creates producer registration, take-back and financing duties and a separate crossed-out-wheeled-bin
marking (`EVD-MC11-314`). The Packaging Regulation adds packaging extended producer responsibility, a
packaging conformity assessment and a *packaging* declaration of conformity — again not a product CE
mark (`EVD-MC11-316`). The Data file records these as three separate rows so that no downstream artefact
can collapse them into "we are CE marked".

### 5.4 GPSR — complements, does not replace, the harmonisation acts

The GPSR applies to products that are not covered by other specific EU product-safety legislation *and to
the risks and aspects not already covered by such legislation* (`EVD-MC11-308`). It therefore governs the
residual safety surface: installation, mounting, foreseeable misuse, warnings, instructions, traceability,
complaints, incident reporting and recall. It does not require CE marking and does not certify anything.
For `PILOT` this is decisive: no EU horizontal act imposes a functional-safety or type-approval regime on
a recreational autopilot, so the GPSR risk analysis, warnings, training and recall duties are the applicable
product-safety framework — and they are **not** a safety case. `PILOT_SAFETY_GATE` remains `BLOCKED`.

### 5.5 Batteries — conditional rows, and why "coin cell" is not a detail

Regulation (EU) 2023/1542 applies to all batteries placed on the market regardless of whether they are
sold separately or incorporated into a product (`EVD-MC11-309`), and requires portable batteries
incorporated into appliances to be removable and replaceable by the end user by 2027, with labelling from
2026 and a QR code from 2027 (`EVD-MC11-310`). A real-time-clock coin cell is a portable battery. The
consequence for design is concrete: a cell that cannot be replaced by the end user is a compliance defect,
and a soldered coin cell on a sealed board is the exact configuration the removability rule targets.
Nine rows are therefore recorded as applicable-conditional pending the frozen BOM.

## 6. Cyber Resilience Act — the most consequential new obligation

### 6.1 Verified timeline

| Date | Fact | Source |
|---|---|---|
| 2024-12-10 | CRA entered into force | `EVD-MC11-301` |
| 2026-09-11 | Reporting obligations apply (Art. 71(2)); ENISA Single Reporting Platform operational | `EVD-MC11-303` |
| 2027-12-11 | Main obligations apply: cybersecurity requirements, vulnerability handling during support period, technical documentation, DoC, CE marking | `EVD-MC11-301` |
| 2027-12-11 | Repeal of RED Delegated Regulation (EU) 2022/30 takes effect (Articles 3(3)(d)(e)(f)); the CRA takes over radio-cybersecurity | `EVD-MC11-304` |

Reporting mechanics: early warning within 24 hours of becoming aware, full notification within 72 hours,
final report no later than 14 days after a corrective measure for actively exploited vulnerabilities or
within one month of the 72-hour notification for severe incidents (`EVD-MC11-303`).

### 6.2 Critical nuance — reporting is in force *now*

As at the retrieval date (2026-11-02) the reporting regime is **already in force**. It attaches to
manufacturers of products with digital elements placed on the market. MAREA has placed none
(`COMMERCIAL_AVAILABILITY = NOT_FOR_SALE`), so no reportable event can arise today. But the readiness
consequence is immediate for planning: a manufacturer that places its first product on the market in 2026
or 2027 must already have a vulnerability intake, triage, disclosure and incident process, because the
24-hour clock starts on awareness, not on the main-obligation date. No such process exists in the
audited stack (MC-02 H-13, R-11).

### 6.3 Scope test applied to each configuration

The CRA covers products with digital elements whose use includes a direct or indirect data connection
(`EVD-MC11-302`), covering both hardware and software products. The MED exclusion ("marine equipment
within the scope of Directive 2014/90/EU") is narrow: it does not reach recreational-craft electronics
outside MED scope. Applied per configuration:

| Configuration | CRA | Reasoning |
|---|---|---|
| HUB, AIS, WATCH, DISPLAY, PILOT, SENSE (connected) | applicable | connectable hardware with firmware |
| NAV (software) | applicable | software product placed on the market |
| WEATHER (hosted service) | excluded today | no product placed on the market; lapses if a client application is distributed |
| FLEET (B2B SaaS) | excluded today | hosted service; lapses if a client application or edge device is placed on the market |

### 6.4 Product classification — explicitly **not** decided here

The CRA distinguishes default, "important" and "critical" products, with stricter conformity assessment
(third-party assessment by a notified body) for the latter, and Implementing Regulation (EU) 2025/2392
sets out the technical descriptions of those categories (`EVD-MC11-302`). Whether a HUB with routing, NAT
or firewall functions falls into an "important" class (notably the router/modem class), and whether a
vessel gateway would be so classified, is **not determined** in MC-11. It requires the implementing
regulation's text and qualified legal review. The data file records `notifiedBodyPotential: true` for those
configurations for that reason.

## 7. MED 2014/90/EU — why it is excluded, and what would change it

The MED applies to equipment on ships flying an EU flag that are subject to the international conventions,
requires assessment by an independent third party (notified body) and the wheel mark, and is complemented
by annual implementing acts listing equipment and testing standards (`EVD-MC11-311`). Spanish law
implements this through `Real Decreto 701/2016`, with `RD 1837/2000` (Título II, Capítulo VII) governing
inspection and certification of civil vessels and `Orden FOM/2258/2015` Annex A.1 listing the equipment
subject to homologation, assessed by notified-body modules B/D/E/F/G/H with wheel-mark CE marking
(`EVD-MC11-312`). Portuguese law excludes marine equipment covered by `Decreto-Lei n.º 167/99` from its
RED regime, which shows the same boundary is maintained at national level (`EVD-MC11-317`, Annex I(2)).

Reasoned determination: a recreational craft is not a ship subject to the international conventions, and a
MAREA aftermarket accessory is not equipment installed on such a ship. The MED is therefore not applied
automatically — as the mission requires. Re-assessment is mandatory if any of the following becomes true:

1. MAREA sells into a professional/commercial vessel channel (workboats, small passenger vessels, fishing).
2. A SKU is installed on a ship to which the conventions apply.
3. The Spanish Annex A.1 equipment list (not retrieved in this session) is found to cover the item.
4. MAREA supplies a pre-installed system as part of a craft's equipment.

The MED exclusion is recorded with `qualifiedReviewRequired: true` on every row. **The exclusion must never
be read as approval of a steering product.** For `PILOT`, MED non-application means there is no type-approval
regime at all for a recreational autopilot — which increases, not decreases, the product-safety and liability
burden.

### 7.1 Recreational Craft Directive — adjacent, not applicable

The RCD applies to watercraft, designated components and propulsion engines, with CE marking on the craft
builder's plate (`EVD-MC11-315`). A MAREA aftermarket device is none of those: it is not a watercraft, not a
propulsion engine, and navigation/steering electronics are not among the designated components identified in
the retrieved summary. The craft builder's own CE obligations are unaffected by a MAREA device. Two
re-assessment triggers: (a) if a MAREA steering system were supplied pre-installed as part of a craft's
equipment, and (b) if a `PILOT` installation modifies a craft's steering such that the craft's conformity
could be affected — in that case the effect must be assessed with the builder or a competent body. The
designated-components list was not retrieved, so the exclusion is reasoned and flagged.

## 8. Spanish market obligations that matter for a seller established in Spain

| Obligation area | Verified position | Status / gap |
|---|---|---|
| Marine equipment homologation (if ever MED-scoped) | `RD 701/2016` transposes the MED; modules B/D/E/F/G/H; wheel mark + notified-body number; `RD 1837/2000` Título II Cap. VII; `Orden FOM/2258/2015` Annex A.1 (`EVD-MC11-312`) | Not applicable today; Annex A.1 list NOT retrieved |
| Radio equipment conformity regime | `Real Decreto 188/2016` identified as the Spanish RED transposition (`BOE-A-2016-4444`) but its full text was **NOT retrieved** this session; the Spanish-language instruction rule for radio equipment is therefore **not verified** | `LEGAL_REVIEW_REQUIRED`; the Portuguese transposition evidences the same requirement type (`EVD-MC11-317` Art. 11(1)(l)) but is not Spanish law |
| Packaging producer responsibility | Spanish `Registro de Productores de Producto` (RPP) exists; registration number format `SEC/AÑO REGISTRO/XXXXXXXXX` with sections including `ENV`; annual reporting window for the preceding year's placed products ran 2 January – 2 April 2026 (`EVD-MC11-318`) | Registry mechanics verified; **no registration exists** for EMBARCARTE/MAREA |
| WEEE producer responsibility | Directive obligations verified (`EVD-MC11-314`); Spanish producer-registration instrument (RII-AEE) was **not retrieved** this session | `NOT_VERIFIED` — carried as a blocker (CON-09) |
| RoHS enforcement | Directive obligations verified (`EVD-MC11-313`); Spanish transposition not retrieved | `NOT_VERIFIED` |
| General product safety | GPSR applies directly as a regulation; Spanish consumer-protection law additionally applies to consumer contracts and guarantees, and was not assessed in MC-11 | Outside this workstream; `LEGAL_REVIEW_REQUIRED` |

## 9. Portuguese market obligations

| Obligation area | Verified position | Status / gap |
|---|---|---|
| Radio equipment regime | `Decreto-Lei n.º 57/2017` transposes the RED: essential requirements (Art. 4), manufacturer duties (Art. 11) including **instructions and safety information in Portuguese**, 10-year retention of technical documentation and DoC, serial/lot identification, name and postal address, frequency bands and maximum RF power, DoC copy with each unit, identification of Member States with restrictions; importer duties (Art. 13); conformity-assessment modules (Art. 17 + Annexes II–IV); technical-file content (Annex V); DoC content (Annex VI) (`EVD-MC11-317`) | Verified from the national legal text |
| Anacom role | ANACOM is the Portuguese authority in the transposed regime (notification of radio interfaces, additional putting-into-service requirements, market surveillance) (`EVD-MC11-317` Arts. 8–9) | Verified |
| Marine equipment boundary | `Decreto-Lei n.º 57/2017` Annex I(2) excludes marine equipment covered by `Decreto-Lei n.º 167/99` from the RED regime (`EVD-MC11-317`) | Verified; confirms the MED/RED boundary at national level |
| Producer registration (EEE, batteries, packaging) | The Portuguese producer-registration pages were requested twice and **timed out**; their content was not read (`EVD-MC11-323`) | `INACCESSIBLE` — `NOT_VERIFIED`, not assumed identical to Spain |
| Unified waste-flows regime | `Decreto-Lei n.º 152-D/2017` identified as the Portuguese instrument but **not retrieved** this session | `NOT_VERIFIED` |

**Design consequence of the Portuguese language rule (verified).** The Portuguese transposition requires
instructions and safety information in Portuguese for radio equipment placed on the Portuguese market
(`EVD-MC11-317` Art. 11(1)(l)). The equivalent Spanish requirement was not verified but is expected on the
same directive logic. Consequence: the ES/PT bilingual documentation is **not** a marketing preference — it
is a conformity input, and the language of the *instructions*, not merely of the product page, is what the
transposition requires.

## 10. Sources actually retrieved, and sources that were not

Retrieved on 2026-11-02 (23 evidence records, `EVD-MC11-301…323`): Commission CRA policy page and CRA
reporting page; EUR-Lex summaries for CRA, GPSR, Batteries, MED, RoHS, WEEE, Recreational Craft, Packaging;
Commission RED, EMC, LVD and CE-marking-manufacturers pages; Commission batteries policy page; Portuguese
`Decreto-Lei n.º 57/2017` (DRE); Spanish `Ministerio de Transportes` marine-equipment homologation page;
Spanish `MITECO` Registro de Productores de Producto page; NMEA 2000 page, NMEA 0183 page and NMEA home page.

Explicitly **INACCESSIBLE / NOT RETRIEVED** this session (recorded, not quoted):
`https://www.nmea.org/nmea-2000-certification.html`, `/product-certification.html`, `/nmea-membership.html`,
`/membership.html`, `/membership` (HTTP 404); NMEA `Assets/` PDF documents (404);
`https://web.nmea.org/External/WCPages/WCWebContent/webcontentpage.aspx?ContentID=238` (404);
`https://apambiente.pt/en/node/861` and `https://apambiente.pt/residuos/registo-de-produtores-de-produtos`
(timeout); Spanish `RD 188/2016` full text, Spanish WEEE (RII-AEE) instrument, Portuguese `DL 152-D/2017`,
`Orden FOM/2258/2015` Annex A.1 list, Spanish-language instruction rule for radio equipment, and the
harmonised-standards lists in the OJEU.

## 11. Open legal questions carried forward (all `LEGAL_REVIEW_REQUIRED`)

| # | Question | Why it cannot be closed in MC-11 | Consequence if answered adversely |
|---|---|---|---|
| L1 | Is the manufacturer the EMBARCARTE entity, a contract manufacturer, or an OEM? | Not a desk-research question; requires a corporate decision (MC-02 DEC-07) | No CE marking, no DoC, no market placement |
| L2 | Spanish-language instruction requirement for radio equipment | `RD 188/2016` not retrieved | Documentation redesign before ES sale |
| L3 | CRA classification of a vessel gateway (default vs "important" router/modem class) | Requires IR (EU) 2025/2392 text and legal opinion | Third-party assessment cost and timetable |
| L4 | Whether the WEATHER client or FLEET client application is a product with digital elements | Depends on distribution model not yet chosen | CRA scope and CE obligations attach to the software |
| L5 | MED scope if the commercial-vessel channel is opened | Requires channel decision plus national equipment list | Wheel-mark conformity and notified body |
| L6 | GPSR application date confirmation (13 Dec 2024 not displayed on the retrieved summary) | Source rendering limitation | Affects historical, not prospective, obligations |
| L7 | Packaging Regulation application date confirmation ("from 2026") | Source rendering limitation | Affects first packaged SKU timing |
| L8 | Battery classification for each SKU (presence, chemistry, removability design) | BOM not frozen | Redesign and producer registration |
| L9 | Whether a bundled mains PSU makes MAREA the manufacturer of that PSU | Commercial packaging decision | LVD/C E obligations on the PSU |
| L10 | Portuguese producer-registration procedure and deadlines | Pages inaccessible | PT distribution blocked until verified |

## 12. Closing statement

For the nine MAREA families and their editions, this document records **which** Union acts would govern
each configuration and **why**, including the configurations for which the answer is "no act applies" — and
it states plainly that **no conformity exists for any configuration**. There is no technical file, no test
evidence, no notified-body involvement, no declaration of conformity, no CE marking, no NMEA certification
and no type approval. Every statement of applicability in this document is a scoping conclusion awaiting
a frozen design, a designated manufacturer, physical test evidence and qualified legal review — in that
order.
