# MAREA SAIL — Bundle commercial specification (MC-08 / D4)

| Field | Value |
| --- | --- |
| Document ID | MC-08 / D4-MAREA-SAIL-BUNDLE-SPEC |
| Milestone | MC-08 (Master Prompt 08/36) — commercial bundles, ecosystem compatibility and product packaging |
| Deliverable | D4 — MAREA SAIL bundle commercial specification |
| Owner | Sail and Helm Integration Specialist (MC-08 run) |
| Status | INTERNAL · NOT PUBLISHED · NOT FOR SALE · BUNDLE DEFINITION ONLY |
| Base commit | `80c66c70a1bab6f11c5ba5709baa4c1671f1d6da` (MC-07 HEAD) |
| Branch | `feature/marea-mc08-bundles-commercial-architecture` |
| Date | 2026-10-30 |
| Write scope | `docs/marea/bundles/MAREA-SAIL-COMMERCIAL-SPEC.md` only — the six other files of this bundle are specified by other functions and are cited, never edited |
| Governing contract | `docs/marea/products/README.md` §1–§8 (MC-05) and §12–§32 (MC-06/MC-07 addenda); `docs/marea/COMMERCIAL-PORTFOLIO.md`; `docs/marea/execution/DECISION-LOG.md` D-007–D-017, in particular D-008 (edition structure) and D-009 (PILOT quotation model) |
| Bundle identity | Bundle id `SAIL`; display name `MAREA SAIL`; six-bundle family: START, CRUISE, SAIL, PROTECT, COMPLETE, FLEET |
| Is not | Not a catalogue entry, not a product page, not a shop SKU, not a quotation, not a price list, not a certification, not an availability statement, not an order option, not a commercial offer, not a release |

**Bundle status block (binding).**

| Classification | Value |
| --- | --- |
| `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` | `true` — no bottom-up costing, BOM, installer rate card or labour measurement exists for this configuration |
| `VESSEL_SURVEY_REQUIRED` | `true` — the configuration cannot be assessed, quoted or delivered before a documented vessel and steering survey |
| `INSTALLER_QUOTATION_REQUIRED` | `true` — the commercial document is an itemised installer-led quotation, never a checkout value |
| `PILOT_SAFETY_GATE_BLOCKED` | `true` — `PILOT_SAFETY_GATE = BLOCKED` (H-01, P-04); `PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND`; `PILOT_MOTOR_ISOLATION_EVIDENCE = NOT_FOUND`; `PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND`; `PILOT_SEA_TRIALS = NOT_PERFORMED` |
| `BUNDLE_RELEASE_STATUS` | `BLOCKED` |
| `HISTORICAL_PRICE_HYPOTHESIS` | EUR 1,990 — `HYPOTHESIS_UNAPPROVED`, recorded for traceability only. It is not a full installed SAIL price, not a purchasable price and it is never derived by summing a PILOT starting price |
| `COMPOSITION` | Fixed by this document; no edition may be substituted, added or removed |

## 1. Scope and status statement

MAREA SAIL is the sail-focused integrated-helm bundle of the MAREA ecosystem: navigation context, a
local onboard data gateway, a surveyed and quoted supervised steering installation, and wind measurement.
It is a **bundle definition** produced so that the customer outcome, the inclusion classes, the exclusions,
the survey and quotation path and the release blockers are stated once, in one place, before any commercial
surface exists.

Three statements govern the whole document:

1. **The bundle is not for sale and cannot be quoted as a fixed price.** A full installed SAIL price is
   `FULL_BUNDLE_PRICE_NOT_ESTABLISHED`; the only commercial document this definition permits is a
   vessel-specific, itemised, installer-led quotation issued after a survey, and that quotation is itself
   blocked by the PILOT safety gate.
2. **A complete specification is not readiness.** This is the same distinction the nine product dossiers
   carry (`definition = COMPLETE_TARGET_SPECIFICATION` against `engineering = NOT_VERIFIED`). Every
   inclusion below is a definition of the intended bundle; none of them is a verified capability, an
   available product or an orderable configuration.
3. **Nothing here upgrades an evidence state.** `PILOT_SAFETY_GATE = BLOCKED`,
   `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`, `SENSE_INGRESS_PROTECTION = NOT_VERIFIED`,
   `SENSE_NMEA2000 = NOT_IMPLEMENTED`, `PILOT_SEA_TRIALS = NOT_PERFORMED` and the missing E-stop, motor
   isolation and rudder feedback evidence remain exactly as MC-02 recorded them. Zero compatibility rows are
   `SUPPORTED`.

Product lifecycle states are unchanged: all nine families are `DEFINED`, `NOT_FOR_SALE`, `INTERNAL_ONLY`,
`brandPublication = NOT_GRANTED`, `SOURCE_IP_CLEARANCE = NOT_CLEARED`, images `BLOCKED_ON_IMAGE_GENERATION`,
and no certification, BOM, supplier quotation, sea trial or regulatory approval exists.

### 1.1 Historical price hypothesis — traceability only

`COMMERCIAL-PORTFOLIO.md` carries the bundle hypothesis **EUR 1,990** for MAREA SAIL. It is retained here
exclusively so that the later pricing and costed model can be audited against what was originally
hypothesised. It may never be presented as a full installed SAIL price, a "from" offer, a checkout value or a
sum of product hypotheses, and it must never be added to a PILOT starting price to imply an installed
solution. The indicative component hypothesis floor is recorded in §1.2 only to show why the historical
figure cannot be a delivered price.

### 1.2 Indicative component hypothesis floor (not a price, not a quotation)

| Line | Edition | Standalone hypothesis | Status |
| --- | --- | --- | ---: |
| NAV | `NAV-PRO` | EUR 149 / year | `HYPOTHESIS_UNAPPROVED` |
| HUB | `HUB-STANDARD` | EUR 349 | `HYPOTHESIS_UNAPPROVED` |
| PILOT | `PILOT-COASTAL` | from EUR 1,290 | `HYPOTHESIS_UNAPPROVED` starting price only — **not** an all-inclusive or installed price (D-009) |
| SENSE | `SENSE-WIND` | from EUR 99 | `HYPOTHESIS_UNAPPROVED` SENSE entry hypothesis only; per README §17 it is **not attributable** to a named module and no SENSE module price is established |
| **Indicative floor** | | **EUR 1,887** | arithmetic illustration, not a price |

The floor excludes, at minimum: the steering drive/actuator, rudder feedback, cabling, power protection,
the physical E-stop assembly, mechanical interfaces, installer labour, commissioning, supervised sea trials,
owner training, conformity work and the warranty reserve. Those categories are the reason the floor cannot be
converted into a bundle price. No margin, channel percentage or bundled discount is asserted anywhere in this
document; the pricing authority is `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` (D11) and it also produces no
approved figure.

## 2. Canonical composition

The composition is **fixed**. No edition may be substituted, no additional MAREA product becomes a default,
and no exclusion below may be weakened by a quotation, a channel partner or a future page. Column semantics:
*Inclusion class* uses exactly the permitted seven-value vocabulary; *Compatibility status* uses the four-value
compatibility vocabulary (`SUPPORTED` / `PLANNED` / `CONDITIONAL` / `UNKNOWN`) plus `BLOCKED` where an
external gate controls the row; *Evidence class* uses `VERIFIED_REPO` / `VERIFIED_EXTERNAL` / `ASSUMPTION` /
`HYPOTHESIS` / `OPEN` / `BLOCKED`; *Installation class* is one of `SOFTWARE_ONBOARDING`,
`INSTALLER_ASSISTED`, `PROFESSIONAL_INSTALLATION`, `PROFESSIONAL_INSTALLATION_SURVEY`, `NONE`.

| # | Family | Edition | Qty | Role in the bundle | Inclusion class | Dependencies | Subscriptions | Compatibility status (source row) | Evidence class | Price status | Cost status | Installation class | Release blockers |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `NAV` | `NAV-PRO` | 1 | Route and navigation context; read-only input to the helm, never actuator authority | `INCLUDED` | Licensed chart data obtained separately (`D-01`, `D-02`, `D-03`); local route context integration unverified | NAV annual subscription required (one term) | `PLANNED` (`I-01`) | `VERIFIED_REPO` (edition and inclusion authority: `PRODUCT-EDITIONS-NAV-HUB-AIS.md`) | `HYPOTHESIS_UNAPPROVED` — EUR 149/yr | `NOT_ESTABLISHED` | `SOFTWARE_ONBOARDING` | `D-01`; `I-01` untested; `P-01`, `P-10`; `X-05` |
| 2 | `HUB` | `HUB-STANDARD` | 1 | Instrument and navigation data publication on the local vessel interface | `INCLUDED` | Frozen hardware and tested protocol matrix absent; adapter class `OPEN` | None | `PLANNED` (`I-02`; batch-01 `A-02`, `B-08` `CODE_ONLY`) | `VERIFIED_REPO` (`PRODUCT-EDITIONS-NAV-HUB-AIS.md`) | `HYPOTHESIS_UNAPPROVED` — EUR 349 | `NOT_ESTABLISHED` | `INSTALLER_ASSISTED` | `H-04`, `H-05`, `H-07`, `P-02`; no HUB hardware |
| 3 | `PILOT` | `PILOT-COASTAL` | 1 | Supervised steering installation, vessel-specific | `QUOTATION_REQUIRED` | Documented vessel and steering survey; surveyed drive/actuator, feedback, E-stop, motor isolation; authorised installer | None (`subscriptionHypothesis: null`) | `BLOCKED` (`PILOT_SAFETY_GATE`; `I-01`/`I-02` context data only) | `BLOCKED` (`H-01`, `P-04`, `H-10`) | `NOT_ESTABLISHED` — quotation only; from EUR 1,290 is a starting hypothesis only, never a quotation | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION_SURVEY` | `H-01`, `H-02`, `H-03`, `H-10`, `P-04`, `X-05`, `X-06`; no conformity assessment |
| 4 | `SENSE` | `SENSE-WIND` | 1 | Wind measurement; conditional as a steering input | `CONDITIONAL` | Calibrated wind source qualified as a steering input; masthead installation; measurement accuracy and calibration evidence absent | None | `CONDITIONAL` (`I-04`) | `BLOCKED` (`SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`, `SENSE_INGRESS_PROTECTION = NOT_VERIFIED`, `P-05`, parser-level unit tests only) | `NOT_ESTABLISHED` (entry hypothesis EUR 99 not attributable) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `P-05`, `H-04`, `H-05`; wind mode `H-01` unverified |
| 5 | `PILOT` | `PILOT-SAIL` | 0 | Conditional alternative, never the default | `CONDITIONAL` | All Coastal conditions plus verified wind-angle steering evidence and a qualified wind source | None | `BLOCKED` (`H-01`) | `BLOCKED` (`H-01`) | `NOT_ESTABLISHED` (no PILOT-SAIL price may exist) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION_SURVEY` | `H-01`; not shippable until wind-angle mode is verified |
| 6 | `PILOT` | `PILOT-PRO` | 0 | Quoted service scope only | `INELIGIBLE` | `INSTALLATION_PACKAGE` verdict: vessel-specific quoted work, not a retail SKU (D-008) | None | `BLOCKED` | `VERIFIED_REPO` (`PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §2.4) | `NOT_ESTABLISHED` — no price may exist | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION_SURVEY` | `H-01`; ineligible as a priced bundle line |
| 7 | `EXTERNAL` | — | 1 | Documented vessel and steering survey | `REQUIRED_EXTERNAL` | Authorised surveyor/installer; survey criteria in §4.2 | None | Not assessable (`UNKNOWN`) | `OPEN` | `NOT_ESTABLISHED` — not a product price; quotation only | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION_SURVEY` | No validated survey method; `X-06` |
| 8 | `EXTERNAL` | — | 1 | Steering equipment inventory | `REQUIRED_EXTERNAL` | Survey output: make, model, type, condition, manual release | None | `UNKNOWN` | `OPEN` | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION_SURVEY` | `X-06` |
| 9 | `EXTERNAL` | — | 1 | Drive/actuator eligibility decision | `REQUIRED_EXTERNAL` | Survey plus drive-family envelope; no frozen BOM or drive selection exists | None | `UNKNOWN` | `BLOCKED` (`H-01`, `H-03`, `H-05`) | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION_SURVEY` | `H-01`, `H-03`, `H-05` |
| 10 | `EXTERNAL` | — | 1 | Rudder/steering feedback | `REQUIRED_EXTERNAL` | Selected and quoted by survey | None | `UNKNOWN` | `BLOCKED` (`PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND`) | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `H-01` |
| 11 | `EXTERNAL` | — | 1 | Cabling and harness | `REQUIRED_EXTERNAL` | Route, gauge, connectors and protection decided by survey | None | `UNKNOWN` | `OPEN` | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `X-06` |
| 12 | `EXTERNAL` | — | 1 | Power protection and isolation | `REQUIRED_EXTERNAL` | Independent motor-power isolation evidence absent | None | `UNKNOWN` | `BLOCKED` (`PILOT_MOTOR_ISOLATION_EVIDENCE = NOT_FOUND`) | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `H-03`, `H-10` |
| 13 | `EXTERNAL` | — | 1 | Physical E-stop assembly | `REQUIRED_EXTERNAL` | Must be a physical, hardware-independent stop; concept is GPIO-level only | None | `UNKNOWN` | `BLOCKED` (`PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND`) | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `H-10` |
| 14 | `EXTERNAL` | — | 1 | Mechanical interfaces and brackets | `REQUIRED_EXTERNAL` | Vessel-specific fabrication; cannot be pre-priced | None | `UNKNOWN` | `OPEN` | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `X-06` |
| 15 | `EXTERNAL` | — | 1 | Installer labour | `REQUIRED_EXTERNAL` | Measured installation hours do not exist; no installer agreement or rate card exists | None | `UNKNOWN` | `OPEN` | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `X-05`, `X-06` |
| 16 | `EXTERNAL` | — | 1 | Commissioning and dockside validation | `REQUIRED_EXTERNAL` | Commissioning procedure and record to be defined; no commissioning record exists | None | `UNKNOWN` | `OPEN` | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `P-04` |
| 17 | `EXTERNAL` | — | 1 | Supervised sea trials | `REQUIRED_EXTERNAL` | `PILOT_SEA_TRIALS = NOT_PERFORMED`; programme and acceptance criteria to be defined | None | `UNKNOWN` | `BLOCKED` (`P-04`) | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `P-04`, `H-01`; no sea-trial evidence |
| 18 | `EXTERNAL` | — | 1 | Owner training | `REQUIRED_EXTERNAL` | Training on supervised use, manual takeover, E-stop, wind-mode failure behaviour | None | `UNKNOWN` | `OPEN` | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `P-04` |
| 19 | `EXTERNAL` | — | 1 | Conformity work | `REQUIRED_EXTERNAL` | No EMC/RED/LVD/GPSR/CRA assessment exists (`compliance = NOT_STARTED`) | None | `UNKNOWN` | `BLOCKED` (`H-06`, `H-13`) | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `NONE` | `H-06`, `H-13` |
| 20 | `EXTERNAL` | — | 1 | Warranty reserve | `REQUIRED_EXTERNAL` | No written warranty terms and no legal seller identity (`X-02`) | None | `UNKNOWN` | `BLOCKED` (`X-02`) | Not established | `NOT_ESTABLISHED` | `NONE` | `X-02` |
| 21 | `AIS` | `AIS-RECEIVER` | 0 | Receive-only traffic awareness, obtainable separately | `NOT_INCLUDED` | Separate hardware, antenna/splitter and installation; AIS disclaimer mandatory wherever targets are shown | None | `UNKNOWN` (`I-18` `CODE_ONLY`) | `VERIFIED_REPO` (product definition only) | `HYPOTHESIS_UNAPPROVED` — EUR 249 | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `H-08`, `P-03`, `D-09` |
| 22 | `WEATHER` | `WEATHER-STANDARD` | 0 | Licensed forecast, obtainable separately; never a steering input | `NOT_INCLUDED` | Provider rights `NOT_GRANTED`; entitlement separate | WEATHER subscription (separate) | `UNKNOWN` (`I-20` `CONDITIONAL`) | `VERIFIED_REPO` (product definition only) | `HYPOTHESIS_UNAPPROVED` — from EUR 49/yr | `NOT_ESTABLISHED` | `SOFTWARE_ONBOARDING` | `D-04`, `D-05`, `D-07`, `D-10` |
| 23 | `SENSE` | `SENSE-SAIL` | 0 | Kit, never a required item of this bundle | `NOT_INCLUDED` | `CONDITIONAL` kit; its wind measurement and environmental module evidence is absent | None | `CONDITIONAL` | `BLOCKED` (`P-05`) | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `P-05`, `H-05` |
| 24 | `SENSE` | `SENSE-SYSTEMS` | 0 | Kit, never a required item of this bundle | `NOT_INCLUDED` | `CONDITIONAL` kit of four modules; none measured | None | `CONDITIONAL` | `BLOCKED` (`P-05`) | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `P-05`, `H-05` |
| 25 | — | — | 0 | Remote, internet or cloud steering command | `INELIGIBLE` | No control path may leave the vessel; local control-head authority only | — | `SUPPORTED` does not apply — prohibited by design | By design (`README` §16 rule 1; `H-02`) | Not applicable | Not applicable | `NONE` | No route to eligibility: `H-02`; prohibited by `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class X |
| 26 | — | — | 0 | Autonomous or unattended navigation and steering | `INELIGIBLE` | PILOT is supervised by design; no autonomy claim permitted | — | By design | By design (`README` §16 rule 3) | Not applicable | Not applicable | `NONE` | Permanent exclusion |
| 27 | — | — | 0 | Collision avoidance or AIS-triggered manoeuvring | `INELIGIBLE` | AIS is receive-only information; not a collision-avoidance system | — | By design | By design (`COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2) | Not applicable | Not applicable | `NONE` | Permanent exclusion |
| 28 | — | — | 0 | Certified, distress, SOLAS or GMDSS service | `INELIGIBLE` | No certified alarm or safety-of-life device exists or is planned | — | By design | By design | Not applicable | Not applicable | `NONE` | Permanent exclusion |
| 29 | — | — | 0 | Guaranteed wind-steering capability | `INELIGIBLE` | Wind mode unverified (H-01); no performance, accuracy or reliability claim exists | — | `BLOCKED` (`H-01`) | `BLOCKED` (`H-01`) | Not applicable | Not applicable | `NONE` | Permanent until verified — and even then no guarantee may be offered |
| 30 | — | — | 0 | Non-verified wind data or a generic weather forecast as a steering input | `INELIGIBLE` | A forecast is not measured wind; unverified or uncalibrated data may never substitute for a measured wind angle | — | By design | By design (`README` §16 rule 4, §19) | Not applicable | Not applicable | `NONE` | Permanent exclusion |
| 31 | — | — | 0 | NMEA 2000 certification or operational compatibility | `INELIGIBLE` | `SENSE_NMEA2000 = NOT_IMPLEMENTED`; no NMEA licence or certification exists | — | `BLOCKED` (`H-04`, `DEC-05`) | `BLOCKED` | Not applicable | Not applicable | `NONE` | `H-04`, `DEC-05` |
| 32 | — | — | 0 | ECDIS, ECDIS-class or ECDIS-equivalent navigation | `INELIGIBLE` | NAV is a navigational aid; no official ENC distribution right exists | — | By design | By design (`D-01`, `D-02`, `D-03`) | Not applicable | Not applicable | `NONE` | Permanent exclusion |
| 33 | — | — | 0 | Fixed turnkey bundle price | `INELIGIBLE` | `FULL_BUNDLE_PRICE_NOT_ESTABLISHED`; PILOT is quotation-only (D-009) | — | By design | By design | Not applicable | Not applicable | `NONE` | Permanent in the current state; the historical EUR 1,990 is traceability only |

Composition reconciliation: **4 included edition objects** (`NAV-PRO`, `HUB-STANDARD`,
`PILOT-COASTAL` as `QUOTATION_REQUIRED`, `SENSE-WIND` as `CONDITIONAL`); **2 conditional or ineligible
variants** (row 5 `PILOT-SAIL` `CONDITIONAL`, row 6 `PILOT-PRO` `INELIGIBLE` as a priced line);
**14 required external or quoted-scope objects** (rows 7–20); **4 explicitly non-included MAREA products**
(rows 21–24); **9 permanent ineligibilities** (rows 25–33). Total 33 rows. No row may be reclassified without
a decision recorded in `docs/marea/execution/DECISION-LOG.md` and a corresponding update of the machine
contract.

**Cross-document reconciliation.** D1 `BUNDLE-ARCHITECTURE.md` §6.3 and D8
`BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` §3.3 are the canonical reference composition for this bundle. This
specification carries the same objects under local row numbers: rows 1–4 = `SL-01`–`SL-04`; row 5 = `SL-05`;
row 6 = `SL-06`; rows 7–20 = the single `SL-08` quoted scope, split here into individually visible
`REQUIRED_EXTERNAL` rows for cost transparency (D8 groups them as `QUOTATION_REQUIRED` / `REQUIRED_EXTERNAL`;
the price status is identical — quotation only); row 23 = `SL-07` (`SENSE-SAIL` kit, `NOT_INCLUDED`); rows 21,
22 and 24 record additional explicit non-inclusions (`AIS-RECEIVER`, `WEATHER`, `SENSE-SYSTEMS`) that D8's
master exclusion list already excludes from every bundle. Installation-class labels here map to D8 as follows:
`SOFTWARE_ONBOARDING` ≈ `SELF_INSTALL_NOT_VERIFIED`, `INSTALLER_ASSISTED` = `INSTALLER_ASSISTED`,
`PROFESSIONAL_INSTALLATION` = `PROFESSIONAL_REQUIRED`, `PROFESSIONAL_INSTALLATION_SURVEY` =
`PROFESSIONAL_REQUIRED` + `QUOTATION_REQUIRED`, `NONE` = no installation scope. The objects, quantities,
inclusion classes and price statuses are identical in both documents.

## 3. Mandatory configuration rules

These rules bind every future page, quotation, partner document, support reply and machine-readable
contract. A rule may be tightened, never relaxed.

| # | Rule |
| --- | --- |
| R1 | **Fixed composition.** The included set is exactly `NAV-PRO` + `HUB-STANDARD` + `PILOT-COASTAL` (quotation) + `SENSE-WIND` (conditional). No substitution (`HUB-PRO`, `NAV-ESSENTIAL`, another SENSE module), addition or silent removal is permitted under the `SAIL` id. |
| R2 | **No bundle price.** `FULL_BUNDLE_PRICE_NOT_ESTABLISHED`. No figure may be published, quoted, summed, discounted or written into a checkout, catalogue, advertisement or structured data as the SAIL price. The historical EUR 1,990 is traceability only; the EUR 1,887 floor is arithmetic illustration only. |
| R3 | **Survey before quotation.** No quotation, deposit, reservation or delivery date may exist before a documented vessel and steering survey (§4.2). The survey is the first commercial step, not an afterthought. |
| R4 | **PILOT is quotation-based and supervised.** The steering item is `QUOTATION_REQUIRED`, every quotation enumerates inclusions and exclusions (D-009), and the supervised-steering disclaimer is present on every surface that mentions the helm. `PILOT-PRO` may appear only as a quoted service scope, never as a priced retail line. |
| R5 | **Measured wind only.** The wind input is a measured, calibrated `SENSE-WIND` value qualified as a steering input, subject to `I-04`. A forecast, a model value, a web service value or an unverified reading may never substitute for measured wind, and no wind-steering capability is guaranteed. |
| R6 | **NAV is context, not authority.** Route and waypoint data may reach the helm only as read-only local input (`I-01` `PLANNED`); it can never engage a mode, command the actuator or override the control head. |
| R7 | **No product is presumed included in another.** Each edition keeps its own price status, licences and gates; buying or quoting the bundle creates no chart, weather, connectivity or AIS entitlement. |
| R8 | **Optional is never automatic.** `AIS-RECEIVER`, `WEATHER`, `DISPLAY-7`, additional SENSE modules, a second control head and a maintenance plan remain separate objects with their own evidence gates. |
| R9 | **Subscription isolation.** No entitlement, renewal failure or payment lapse may disable local steering behaviour, valid local measurement, local alarms or the safety fallback. This is a design requirement, not a tested behaviour. |
| R10 | **No bypass of safety gates.** A bundle does not create a combined acceptance gate: navigation presentation, device integration, sensor accuracy and PILOT safety each retain their own evidence and regulatory gates. |
| R11 | **No publication and no orderable state.** The bundle is `PUBLICATION_BLOCKED`; no page, CTA or partner document may enable purchase, reservation, pre-order or "notify me" as an order channel. |
| R12 | **Installer-led only.** There is no self-install path for this bundle and none is planned. Installation, commissioning, sea trial and training are professional, quoted work. |
| R13 | **Evidence states are not upgraded by a bundle document.** Every canonical state in §1 remains at its recorded value; a bundle specification is not a test, a certificate, a measurement or a trial. |
| R14 | **Configuration outcomes are internal-only labels.** Only `CONFIGURATION_DEFINED_INTERNAL`, `COMPATIBILITY_EVIDENCE_REQUIRED`, `SPECIALIST_SURVEY_REQUIRED`, `QUOTATION_REQUIRED`, `NOT_ELIGIBLE` and `PUBLICATION_BLOCKED` may describe a configuration. `ORDERABLE`, `FOR_SALE` and `APPROVED` are prohibited for this bundle. |
| R15 | **Quotation validity and content.** A quotation must name the vessel, the surveyed configuration, every included and excluded item, the labour and commissioning scope, the sea-trial scope, the training scope, the warranty position and its own validity. A quotation is not a contract and creates no legally binding warranty until signed terms exist (§5.6; D12). |

## 4. Compatibility and eligibility criteria

### 4.1 Compatibility status of every included relationship

| Relationship | Status | Source row | What must close it |
| --- | --- | --- | --- |
| PILOT ← NAV route/waypoint context | `PLANNED` | `I-01` | MC-13 local integration test with device/firmware evidence; route data proven non-actuating |
| PILOT ↔ HUB instrument/nav data and status | `PLANNED` | `I-02`; batch-01 `A-02`, `B-08` (`CODE_ONLY`) | HUB hardware freeze, tested protocol matrix, local test record |
| PILOT ← SENSE wind measurement as a Sail input | `CONDITIONAL` | `I-04` | Sensitivity/accuracy evidence (`P-05`, `H-01`) **and** a recorded wind-angle mode trial, in that order |
| PILOT ← compatible GNSS source | `CONDITIONAL` | `I-05` | Device/firmware evidence and a recorded fix-loss scenario |
| PILOT → WATCH read-only status ashore | `PLANNED` (not in this bundle) | `I-03` | WATCH service and read-only boundary review |
| SENSE → HUB measurement publication | `PLANNED` | `I-06` | Frozen interface and adapter list |
| AIS → HUB receive-only targets | `PLANNED` (not in this bundle) | `I-18` | Receiver hardware and batch-01 gate |

**Zero rows are `SUPPORTED`.** No device, firmware version, cable, adapter, message capture or recorded test
result exists for any relationship above. A status of `PLANNED` or `CONDITIONAL` is a statement of intent, not
evidence that anything works, and no compatibility statement may be given to a customer as a result of this
bundle definition.

### 4.2 Vessel survey requirements (mandatory, `VESSEL_SURVEY_REQUIRED`)

A configuration may only be assessed against a documented survey that records, at minimum:

1. **Vessel identity and particulars:** type, length, displacement class, hull material, year, intended
   cruising area, mooring.
2. **Steering system:** type (tiller, wheel, mechanical, hydraulic, mixed), make/model, condition, manual
   release, travel limits, existing feedback, number of stations.
3. **Drive/actuator eligibility:** whether a compatible drive can be fitted within the drive-family envelope;
   the class of actuator required; mechanical access and interfaces.
4. **Electrical system:** battery bank, distribution, protection, isolation of motor power, charging, cable
   routes and gauges, E-stop location and feasibility.
5. **Instrument and navigation sources:** make, model, firmware, connection family for GNSS, wind, depth,
   speed, heading and gateway candidates; existing adapters.
6. **Wind source installation:** masthead or alternative mounting, cable route, access, calibration feasibility.
7. **Environment:** exposure, ingress risk, temperature and vibration considerations at each mounting point.
8. **Existing equipment to be retained:** autopilot, instruments, plotter, network; conflicts and duplication.
9. **Ownership and consent:** customer authorisation for survey, installation and data handling.
10. **Refusal record:** if any of the above cannot be assessed or falls outside the safety envelope, the
    refusal and escalation are recorded per §4.4.

The survey is `OPEN` as a validated method: no survey methodology has been validated on a real vessel
(`PILOT_SAFETY_GATE = BLOCKED`) and no surveyor network or rate card exists (`X-06`).

### 4.3 Eligibility criteria (all must be true)

- The vessel is a sailing vessel with a working mechanical or hydraulic steering system and a manual release.
- The steering survey can document the drive/actuator eligibility, feedback and E-stop feasibility.
- The owner accepts supervised use: a person at the helm, continuous watchkeeping, manual takeover and a
  physical E-stop; the owner rejects any autonomy or remote-control expectation.
- The wind source can be installed and calibrated, or the configuration is quoted as `PILOT-COASTAL` without
  a wind-angle claim.
- The installation can be performed by an authorised installer with recorded commissioning and a supervised
  sea-trial programme.
- The customer accepts that no price, delivery date, certification or compatibility claim exists yet.

### 4.4 Refusal and escalation boundary

The configuration must be refused, not quoted, when: the steering system cannot be assessed; there is no
manual release or the existing steering is unsafe; the vessel is outside the surveyed envelope (refer to a
`PILOT-PRO` quoted scope, which is still blocked); the owner requires unattended or remote operation; the
owner requires a fixed all-inclusive price; the survey cannot confirm E-stop and motor-power isolation
feasibility. A refusal is recorded with the survey, its reason and the escalation route (surveyor →
installation partner → programme safety function). No quotation may be issued to a refused configuration, and
a refusal is never converted into a discount or a partial-scope sale of the steering item.

## 5. Installation and commissioning

MAREA SAIL is **professional installation only** (`PROFESSIONAL_INSTALLATION_SURVEY`). The work content is
defined by `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` (D12) and comprises, at minimum:

| Stage | Content | Status |
| --- | --- | --- |
| Survey | Vessel, steering, electrical and data survey with a written eligibility decision | `OPEN` — no validated method (`X-06`) |
| Design | Proposed configuration, component and labour itemisation, exclusions schedule | `OPEN` — no costed worksheet |
| Mechanical | Drive/actuator mounting, feedback linkage, brackets, interfaces | `BLOCKED` — no drive selection (`H-05`) |
| Electrical | Power protection, harness, independent motor-power isolation, physical E-stop | `BLOCKED` — `PILOT_MOTOR_ISOLATION_EVIDENCE = NOT_FOUND`, `PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND` (`H-03`, `H-10`) |
| Data | HUB installation and local interface; NAV/HUB/PILOT local integration | `BLOCKED` — `H-04`, `P-02`, no frozen hardware |
| Wind input | Masthead installation, cable route, calibration | `BLOCKED` — `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED` |
| Commissioning | Dockside validation, control-head checks, alarm and degraded-state checks, record | `OPEN` — no commissioning record exists |
| Sea trial | Supervised, recorded, mode-by-mode | `BLOCKED` — `PILOT_SEA_TRIALS = NOT_PERFORMED` (`P-04`) |
| Training | Supervised use, manual takeover, E-stop drill, wind-mode failure behaviour | `OPEN` |
| Handover | Signed handover record, documentation, warranty position, support route | `OPEN` |

No installation duration, labour hour figure, lead time, deliverable date or installation price exists, and
none may be stated. No nationwide installer network exists; the availability of an installation partner is
`UNKNOWN` until a written agreement exists (D12).

## 6. Entitlements

| Entitlement | Included in the bundle | Behaviour |
| --- | --- | --- |
| `NAV-PRO` software entitlement | One annual subscription term in the quotation scope | Renewal is a separate commercial act; on expiry the customer keeps export of own routes, waypoints and logbook; charts and licensed third-party data may end with their own licence |
| Licensed chart data | Not included | Acquired under its own licence; coverage, region and offline rights are not implied |
| `HUB-STANDARD` use of the local interface | Included with the appliance | Local data functions remain operational independently of the e-commerce service |
| `PILOT-COASTAL` local steering | Included in the quoted scope | Local only; no subscription, no entitlement, no cloud dependency; never gated by payment |
| `SENSE-WIND` local measurement | Included with the module | Local measurement and indication never gated by an entitlement |
| `WEATHER`, `AIS`, `DISPLAY`, `WATCH`, additional SENSE modules | Not included | Separate products, separate entitlements, separate gates |
| Any cloud or remote service | Not included | No remote steering path exists or is planned; only read-only status could ever leave the vessel |

Subscription isolation is a design requirement of this definition: an expired NAV or any other commercial
entitlement may never disable local steering behaviour, valid local wind measurement, local alarms or the
safety fallback. No billing, entitlement or outage test exists, so this is stated as a requirement, not as a
verified behaviour.

## 7. The ten-step customer workflow (SAIL)

The workflow is the **only** sanctioned commercial path for MAREA SAIL. Steps may not be reordered, skipped or
collapsed into a checkout. Status values use the seven permitted configuration outcomes.

| # | Step | Actor | Required output | Configuration outcome |
| ---: | --- | --- | --- | --- |
| 1 | Customer identifies the vessel | Customer | Vessel particulars, intended use, steering type declared | `CONFIGURATION_DEFINED_INTERNAL` |
| 2 | Steering equipment is inventoried | Installer / surveyor | Documented steering inventory and manual-release confirmation | `SPECIALIST_SURVEY_REQUIRED` |
| 3 | Installer verifies drive/actuator eligibility | Installer / engineering | Written eligibility or refusal decision against the drive envelope | `SPECIALIST_SURVEY_REQUIRED` / `NOT_ELIGIBLE` |
| 4 | Approved inputs are assessed | Installer / engineering | Assessment of wind, GNSS, HUB and NAV context inputs; compatibility status per row | `COMPATIBILITY_EVIDENCE_REQUIRED` |
| 5 | Proposed configuration is documented | Installer | Written configuration statement: editions, quantities, interfaces, exclusions | `CONFIGURATION_DEFINED_INTERNAL` |
| 6 | Components and labour are itemised | Installer / commercial | Itemised schedule of equipment, cabling, protection, E-stop, interfaces, labour | `QUOTATION_REQUIRED` |
| 7 | Commissioning and safety requirements are set | Installer / safety function | Commissioning plan, E-stop and isolation proof plan, sea-trial programme, training plan | `SPECIALIST_SURVEY_REQUIRED` |
| 8 | A complete inclusive quotation is prepared only when legally and operationally permissible | Commercial function | Itemised quotation with inclusions, exclusions, validity and warranty position — or a recorded refusal | `QUOTATION_REQUIRED` / `NOT_ELIGIBLE` / `PUBLICATION_BLOCKED` |
| 9 | Independent product release gates apply | Programme governance | Each product's own gates close independently; no combined waiver | `PUBLICATION_BLOCKED` until every gate closes |
| 10 | Eventual customer receives supervised installation, handover and training | Installer / programme | Signed handover record, training completion, support route, documented limitations | `PUBLICATION_BLOCKED` in the current state |

Today the workflow stops before step 8 for every configuration: steps 1–7 have no validated survey method,
no frozen hardware and no measured labour, and the PILOT safety gate blocks steps 8–10 entirely. No step in
this table creates a sale, a deposit, a delivery expectation or an order.

## 8. Configuration outcomes

Only these six outcomes may describe a SAIL configuration. `ORDERABLE`, `FOR_SALE` and `APPROVED` are
prohibited everywhere in this bundle.

| Outcome | Applies when | What it permits |
| --- | --- | --- |
| `CONFIGURATION_DEFINED_INTERNAL` | The intended configuration is fully described in internal documentation | Internal planning only; no customer-facing availability |
| `COMPATIBILITY_EVIDENCE_REQUIRED` | One or more included relationships is `PLANNED`, `CONDITIONAL` or `UNKNOWN` (all of them today) | A compatibility questionnaire and a recorded assessment; never a compatibility claim |
| `SPECIALIST_SURVEY_REQUIRED` | The vessel, steering system, drive eligibility or wind installation must be assessed | A survey request; a written eligibility decision or refusal |
| `QUOTATION_REQUIRED` | The scope can be itemised but has no established price | An itemised quotation request; never a fixed bundle price |
| `NOT_ELIGIBLE` | The vessel, owner intent or configuration falls outside the safety or product envelope | A recorded refusal and escalation; no quotation |
| `PUBLICATION_BLOCKED` | Any included product gate is open — which is true of every SAIL configuration today | No publication, no order, no reservation, no CTA that enables purchase |

## 9. Journey, copy and asset pointers

| Object | Path | Status |
| --- | --- | --- |
| Customer journey | `BUNDLE-CONFIGURATION-RULES.md` (D9) and the journey register it references; SAIL stages follow the 17-stage MC-05 journey vocabulary with the ten-step workflow of §7 as the commercial spine | `OPEN` — no journey acceptance evidence |
| Spanish copy | `docs/marea/bundles/copy/sail.es.md` | INTERNAL DRAFT — 24 numbered sections; no prices; navigation, PILOT and AIS disclaimers verbatim |
| English copy | `docs/marea/bundles/copy/sail.en.md` | INTERNAL DRAFT — 24 numbered sections; no prices; navigation, PILOT and AIS disclaimers verbatim |
| Asset requirements | `BUNDLE-ASSET-REQUIREMENTS.md` (D16) | `CONCEPT` only; scene assets `BLOCKED_ON_IMAGE_GENERATION`; no real-product visual may be claimed |
| Machine contract | `bundle-definitions.json` (D17) | `BUNDLE_DEFINITION_CONTRACT`; `published: false`, `forSale: false`, `purchaseCtaAllowed: false`, `pricesInCopyAllowed: false` |
| Pricing authority | `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` (D11) | No approved price; quotation model recommended |
| Installation and quotation authority | `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` (D12) | Framework and proposal only; no binding contract, no installer network |

## 10. The 24 mandatory bundle fields

#### B01 — Identity
- **Definition.** MAREA SAIL (`SAIL`) is the defined sail-focused integrated-helm bundle of the MAREA ecosystem: `NAV-PRO` navigation and route context, `HUB-STANDARD` onboard data gateway, a surveyed and quoted `PILOT-COASTAL` supervised steering installation and `SENSE-WIND` wind measurement. It is a bundle definition (`definition = COMPLETE_TARGET_SPECIFICATION`), not a product and not a SKU.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` (bundle table, historical EUR 1,990); `VERIFIED_REPO docs/marea/products/README.md` §2, §8; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md`, `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md`; `OPEN` — no bundle content, price or publication has ever been approved.
- **Owner.** Sail and Helm Integration Specialist (bundle definition owner, MC-08).
- **References.** `DECISION-LOG.md` D-008, D-009; `MAREA-PILOT-COMMERCIAL-SPEC.md`; `MAREA-NAV-COMMERCIAL-SPEC.md`; `MAREA-HUB-COMMERCIAL-SPEC.md`; `MAREA-SENSE-COMMERCIAL-SPEC.md`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B02 — Commercial purpose
- **Definition.** The purpose is to sell one coherent sail-helm outcome as a surveyed, itemised and quoted installation instead of a fixed-price box: navigation context, onboard data, supervised steering and wind measurement specified together, with every inclusion, exclusion and gate stated before money is discussed. The survey and the quotation are the first commercial act, and the bundle exists so that no channel partner, page or support reply can invent a simpler story.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` §8.2 (formal quotation recommendation); `VERIFIED_REPO DECISION-LOG.md` D-009; `ASSUMPTION` — that customers value a single coordinated helm outcome over four separate purchases (unvalidated).
- **Owner.** Commercial Strategy and Pricing function with the Sail and Helm Integration Specialist.
- **References.** `COMMERCIAL-PORTFOLIO.md` price-and-channel decision rule; `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §5–§6.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B03 — Ideal customer
- **Definition.** The primary customer is the owner of a sailing yacht of roughly 8–15 m with a working mechanical or hydraulic steering system, cruising day and coastal waters from Galicia and northern Portugal, who wants supervised course holding and a readable boat rather than a new electronics ecosystem, and who accepts a survey, a quotation and a person at the helm. Secondary buyers are independent installers and small refit yards sourcing a documented, quotation-based steering product. The customer who seeks unattended, remote or autonomous helm control is explicitly not the customer.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §2.2 (target segment); `VERIFIED_REPO docs/marea/products/MAREA-PILOT-COMMERCIAL-SPEC.md` F02; `ASSUMPTION` — segment size and willingness to pay a survey first.
- **Owner.** Commercial Strategy with the PILOT and NAV product functions.
- **References.** `CUSTOMER-JOURNEYS-PILOT-SENSE-WATCH.md`; `BUNDLE-CONFIGURATION-RULES.md`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B04 — Vessel or organization applicability
- **Definition.** Applicability is per vessel and is decided by the survey: sailing vessel with a working steering system and manual release, assessed drive/actuator eligibility, feasible rudder feedback, feasible physical E-stop and motor-power isolation, installable and calibratable wind source, and an authorised installer. Vessels outside the surveyed envelope are not applicable to SAIL and may at most be referred to a `PILOT-PRO` quoted scope, which is itself blocked. No statement of universal suitability for every sailboat exists or may be made.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §2.4 and `PILOT-SAFETY-CASE-OUTLINE.md` §2 (eligibility envelope); `BLOCKED` — no survey method validated, `PILOT_SAFETY_GATE = BLOCKED`.
- **Owner.** Safety function with the installer channel owner.
- **References.** `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §13 (survey requirements).
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B05 — Main customer outcome
- **Definition.** The intended outcome is a sailboat whose passage can be prepared in MAREA NAV, whose instruments and navigation data appear consistently through the HUB, whose steering is held under continuous human supervision within a surveyed and commissioned envelope, and whose wind measurement is calibrated and understood — all specified in one quotation with every limitation named. The outcome is supervised sailing assistance; it is never autonomy, never a guarantee of wind-steering performance and never a claim of suitability for a particular passage.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §2 (PILOT family intent); `VERIFIED_REPO docs/marea/products/README.md` §16; `OPEN` — no installed example, no sea trial, no measured outcome.
- **Owner.** Sail and Helm Integration Specialist.
- **References.** `PILOT-SAFETY-CASE-OUTLINE.md`; `MAREA-PILOT-COMMERCIAL-SPEC.md` F04.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B06 — Mandatory base components
- **Definition.** The mandatory base components are fixed: `NAV-PRO` (navigation and route context, `I-01` `PLANNED`, read-only input, never actuator authority), `HUB-STANDARD` (instrument and navigation data, `I-02` `PLANNED`), `PILOT-COASTAL` (supervised steering, `QUOTATION_REQUIRED`, vessel-specific) and `SENSE-WIND` (wind measurement, `CONDITIONAL` as a steering input because measurement accuracy is `NOT_MEASURED` and wind mode `H-01` is unverified). No edition may be substituted, omitted or silently downgraded.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` (NAV/HUB editions); `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` (PILOT/SENSE editions); `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` rows `I-01`, `I-02`, `I-04`; `OPEN` — every relationship untested.
- **Owner.** Sail and Helm Integration Specialist.
- **References.** `bundle-definitions.json` component refs; §2 of this document.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B07 — Optional components
- **Definition.** No optional component is part of the bundle definition. `AIS-RECEIVER`, `WEATHER`, `DISPLAY-7`, additional `SENSE` modules, `SENSE-SAIL` or `SENSE-SYSTEMS` kits, a second control head and a maintenance plan are separately purchased products or services with their own evidence gates and their own disclaimers; `PILOT-SAIL` is a conditional alternative steering edition, never an add-on; `PILOT-PRO` is a quoted service scope, never a purchasable option. Choosing an optional item never upgrades a compatibility status, a safety state or a price status.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §2.1 (P09, P11, P12, P16 `OPTIONAL`); `VERIFIED_REPO docs/marea/products/README.md` §19 (no product presumed included); `OPEN` — optional pricing and availability.
- **Owner.** Commercial Strategy and Pricing function.
- **References.** `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md`; `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B08 — Required product editions
- **Definition.** Exactly four edition objects are required: `NAV-PRO` (`DEFINED`), `HUB-STANDARD` (`DEFINED`), `PILOT-COASTAL` (`DEFINED`, sold by quotation) and `SENSE-WIND` (`DEFINED`, `CONDITIONAL` as a steering input). `PILOT-SAIL` is `CONDITIONAL` and not the default; `PILOT-PRO` is `INSTALLATION_PACKAGE` and `INELIGIBLE` as a priced retail SKU; `NAV-ESSENTIAL`, `HUB-PRO`, `SENSE-WIND` alternatives and every kit are not part of this bundle. No new family or edition may be invented, and no generation label, size or version suffix may be attached.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §12, §14, §18; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §1.4, §2.5; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §1.
- **Owner.** Lead (Chief Product Officer) with the Sail and Helm Integration Specialist.
- **References.** `product-definitions.batch-01.json`, `product-definitions.batch-02.json`; `bundle-definitions.json`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B09 — Explicit exclusions
- **Definition.** Excluded, permanently or by definition: a fixed turnkey bundle price; remote, internet or cloud steering; unattended or autonomous navigation and steering; collision avoidance or AIS-triggered manoeuvring; any certified, distress, SOLAS, GMDSS or safety-of-life service; a guaranteed wind-steering capability; `SENSE-SAIL` as a required item; non-verified or uncalibrated wind data substituting for measured wind; a generic weather forecast as a steering input; NMEA 2000 certification or operational compatibility; ECDIS, ECDIS-class or ECDIS-equivalent navigation; and any claim of suitability for every sailboat, every steering system or every passage.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §7, §16 (claim rules); `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2–§4; `VERIFIED_REPO DECISION-LOG.md` D-009; `BLOCKED` — NMEA 2000 `H-04`, `DEC-05`; ECDIS `D-01`–`D-03`.
- **Owner.** Safety function with brand and commercial governance.
- **References.** §2 rows 25–33; copy section 9 and 23 of both language files.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B10 — Dependency rules
- **Definition.** Dependencies that cannot be waived: licensed chart data is obtained separately (`D-01`–`D-03`) and is never included; `I-01` and `I-02` remain `PLANNED` until a recorded local integration test exists; `I-04` remains `CONDITIONAL` until measurement accuracy and a wind-angle mode trial exist, in that order; the PILOT quotation depends on a completed survey; commissioning depends on the E-stop and motor-isolation design being evidenced; and no dependency may be replaced by a marketing assumption, a verbal installer assurance or a forecast value.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` `I-01`, `I-02`, `I-04`, `I-05`; `VERIFIED_REPO docs/marea/products/README.md` §19; `BLOCKED` — HUB hardware (`H-05`, `H-07`), PILOT safety (`H-01`, `P-04`).
- **Owner.** Sail and Helm Integration Specialist with the PILOT integration owner.
- **References.** `BUNDLE-CONFIGURATION-RULES.md` conflict rules; §4.1 of this document.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B11 — Compatibility criteria
- **Definition.** Compatibility is assessed per device, per firmware version and per direction, recorded in a published matrix, and only ever stated as `SUPPORTED` with a recorded test; today zero rows are `SUPPORTED` — `I-01`, `I-02` are `PLANNED`, `I-04`, `I-05` are `CONDITIONAL`. Signal K is not a blanket guarantee, NMEA 2000 is `NOT_IMPLEMENTED` and uncertified, and an AIS receiver is receive-only. A compatibility questionnaire plus the vessel survey is the only way to establish what a given boat can actually support.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` §1.2, §1.3, §2, §3; `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` `A-02`, `B-08` (`CODE_ONLY`); `BLOCKED` — no device test recorded anywhere.
- **Owner.** HUB integration owner with the Sail and Helm Integration Specialist.
- **References.** §4.1–§4.3 of this document; `PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` only where a display is separately considered.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B12 — Installation requirements
- **Definition.** Installation is professional and installer-led, with no self-install path and none planned: vessel and steering survey, drive/actuator and feedback selection, cabling and power protection, independent motor-power isolation, physical E-stop assembly, mechanical interfaces, commissioning, supervised sea trials, owner training and a signed handover record. No installation price, labour hour figure, duration, lead time or deliverable date exists, and no nationwide installer network exists.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §2.1 (P07, P10); `VERIFIED_REPO docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` §8.3 (channel); `BLOCKED` — `X-05`, `X-06` (no installer agreements or rate cards); `PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND`.
- **Owner.** Installer channel owner with the Safety function.
- **References.** `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §6, §12, §13, §15.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B13 — Software entitlements
- **Definition.** The only software entitlement inside the bundle is one `NAV-PRO` annual subscription term; it includes the navigation application and the Pro functions, excludes charts and third-party data, and on expiry leaves the customer's own routes, waypoints and logbook exportable. The HUB, PILOT and SENSE hardware carry no subscription, and no entitlement may gate local steering, local wind measurement, local alarms or the safety fallback. Charts, WEATHER, AIS data and connectivity are separate entitlements and are never granted by the bundle.
- **Evidence.** `VERIFIED_REPO docs/marea/products/MAREA-NAV-COMMERCIAL-SPEC.md` F12; `VERIFIED_REPO docs/marea/products/README.md` §16 rule 7, §19; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §2.2 (`subscriptionHypothesis: null`); `OPEN` — renewal terms and price approval.
- **Owner.** NAV product function with commercial governance.
- **References.** `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md`; `PRODUCT-PRICING-AND-CHANNEL-MODEL.md` §9–§10.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B14 — Recurring subscriptions
- **Definition.** Exactly one recurring subscription is part of the bundle: the annual `NAV-PRO` entitlement. `PILOT-COASTAL`, `HUB-STANDARD` and `SENSE-WIND` carry no recurring fee and no `subscriptionHypothesis`. WATCH monitoring, WEATHER entitlements, connectivity/SIM/data plans and chart licences are separate recurring objects with their own terms, none of which is implied, included or billed twice by SAIL. Subscription isolation applies: an expired or failed subscription never disables local steering, local measurement, local alarms or the safety fallback.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §1.4 (all three PILOT editions: no subscription); `VERIFIED_REPO docs/marea/products/README.md` §16 rule 7; `OPEN` — no billing, entitlement or outage service exists (`WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`).
- **Owner.** Commercial Strategy and Pricing function.
- **References.** `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md`; `DECISION-LOG.md` D-010 rule 4, D-013 (no double billing).
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B15 — External data and connectivity
- **Definition.** External data dependencies are licensed charts (not included), a local GNSS source for position, measured wind locally, and optional separately licensed WEATHER data; connectivity is not required for local steering, local measurement or local alarms. There is no cloud-to-actuator path and none may be planned: only read-only status may ever leave the vessel. A stale or missing input must be shown as stale or missing, never presented as current, and a forecast is never a steering input.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §16 rules 1, 6; `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` §1.2, `I-05`; `BLOCKED` — WEATHER provider rights `NOT_GRANTED` (`D-04`, `D-05`, `D-07`, `D-10`); `OPEN` — no connectivity terms exist (`H-12`).
- **Owner.** HUB integration owner with the WEATHER/data licensing function.
- **References.** `WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md`; `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B16 — Commissioning and onboarding
- **Definition.** Commissioning and onboarding follow the ten-step workflow of §7: survey, eligibility, input assessment, documented configuration, itemised scope, commissioning and safety plan, itemised quotation only when permissible, independent product release gates, then supervised installation, handover and training. Onboarding covers NAV account and chart coverage, HUB installation and local interface, PILOT control-head use, manual takeover and E-stop drills, wind calibration and wind-mode failure behaviour. No commissioning record, sea-trial record or handover record exists.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §2.1 (P10); `BLOCKED` — `PILOT_SEA_TRIALS = NOT_PERFORMED`; `OPEN` — no commissioning procedure or record.
- **Owner.** Installer channel owner with the Safety function.
- **References.** `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §7, §15; §7 of this document.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B17 — Warranty and support
- **Definition.** No written warranty terms, seller legal identity, support level, response time or service contract exists (`X-02`); a warranty reserve is one of the required quotation-scope items, and the statutory consumer guarantee applies only when a product is actually sold. The intended support model is installer first-line support and programme second-line support for product questions, with a clear statement of what each covers, and it is not contracted. No "certified technician" scheme, no 24/7 support and no response-time promise exists.
- **Evidence.** `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class C, §5; `BLOCKED` — `X-02`; `OPEN` — support model, RMA and warranty ownership (D12 §9–§11).
- **Owner.** Lead with the legal/commercial function.
- **References.** `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §9, §10, §11.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B18 — Channel and fulfilment
- **Definition.** The only credible channel is the installer-led quotation: a surveyor/installer assesses, proposes, installs, commissions, trains and provides first-line support, while EMBARCARTE owns the product definition, the compatibility matrix authority and any future product warranty. Direct-to-consumer fulfilment does not apply to a surveyed steering installation; a B2B contracted solution may only be a written agreement. There is no shop, no installer network, no rate card, no reseller agreement and no order channel.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` §8.3; `BLOCKED` — `X-05`, `X-06`; `OPEN` — channel terms.
- **Owner.** Commercial Strategy with the installer channel owner.
- **References.** `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §2–§4, §12.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B19 — Price hypothesis and quotation model
- **Definition.** `FULL_BUNDLE_PRICE_NOT_ESTABLISHED`. The historical EUR 1,990 hypothesis is retained for traceability only and is never a full installed SAIL price, a "from" offer, a checkout value or a sum containing PILOT's starting price. The indicative component floor is 149 + 349 + 1,290 + 99 = EUR 1,887 and excludes the drive/actuator, feedback, cabling, labour, commissioning, sea trial, conformity and warranty reserve, so it cannot become a price. The commercial model is quotation-based: no retail SKU, no list price, an itemised quotation per vessel after survey (D-009), and no discount may ever be applied to a hypothesis.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` §3, §8.2; `VERIFIED_REPO docs/marea/products/README.md` §17–§18; `VERIFIED_REPO DECISION-LOG.md` D-009; `HYPOTHESIS` — every figure above.
- **Owner.** Commercial Strategy and Pricing function.
- **References.** `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`; §1.1–§1.2 of this document.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B20 — Cost and margin assumptions
- **Definition.** No cost is established: no BOM, supplier quotation, labour rate, installer agreement, certification cost, warranty accrual, shipping, payment fee, returns allowance or support cost exists. Cost work must remain a framework of named symbolic inputs (`Q_gross = Σ(included scope symbols) + L_INST + C_COMM + T_alloc + R_WARR_alloc + M_CHAN + TAX_P`), and no contribution margin, channel percentage or bundle discount may be computed and presented as fact. The gap between the floor and a real delivered scope is the clearest indication that the historical bundle figure is untenable.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` §7, §8.1; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` price and channel decision rule; `BLOCKED` — `X-05`, `H-05`, `H-07`.
- **Owner.** Commercial Strategy and Pricing function.
- **References.** `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B21 — Upgrade and migration
- **Definition.** Intended paths: `NAV-ESSENTIAL` → `NAV-PRO`; `PILOT-COASTAL` → `PILOT-SAIL` only when wind-angle verification exists for that drive family and vessel class; `PILOT-COASTAL`/`SAIL` → `PILOT-PRO` only as a re-quoted installation package; add `AIS-RECEIVER`, `WEATHER`, `DISPLAY-7` or further SENSE modules only as separate purchases. No path may bypass the safety gate, nothing is a licence toggle, and no upgrade may re-gate a safety or honesty behaviour. Migration mechanics (hardware swap, licence change or new unit) are `OPEN`.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §2.5 and `MAREA-PILOT-COMMERCIAL-SPEC.md` F21; `VERIFIED_REPO docs/marea/products/MAREA-HUB-COMMERCIAL-SPEC.md` F21; `OPEN` — upgrade mechanics and pricing.
- **Owner.** Lead with the product functions.
- **References.** `BUNDLE-CONFIGURATION-RULES.md`; `MAREA-NINE-PRODUCT-ECOSYSTEM.md`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B22 — Customer acceptance criteria
- **Definition.** Acceptance is separate per subsystem and no combined package may bypass a subsystem gate: navigation presentation is accepted only on a recorded display/NAV validation; device integration only on a tested device/firmware/direction matrix; wind measurement only within a verified range and calibration; supervised steering only after bench evidence, E-stop and motor-isolation evidence, supervised sea trials, independent review and a conformity plan. Handover acceptance requires the signed record, training completion and a documented limitation statement. No acceptance criterion is currently met.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §21; `VERIFIED_REPO docs/marea/products/PILOT-SAFETY-CASE-OUTLINE.md` §0.2, §0.5; `BLOCKED` — every PILOT state, `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`, zero `SUPPORTED` rows.
- **Owner.** Safety function with the quality gate.
- **References.** `PILOT-SAFETY-CASE-OUTLINE.md`; §4.1 of this document; `BUNDLE-CONFIGURATION-RULES.md`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B23 — Release readiness and blockers
- **Definition.** The bundle is `BLOCKED` for release. Blockers: PILOT safety gate (`H-01`, `P-04`), physical E-stop and motor-isolation evidence missing (`H-10`, `H-03`), rudder feedback missing (`H-01`), no sea trials (`P-04`), no conformity assessment (`H-06`, `H-13`), no frozen hardware or BOM (`H-05`, `H-07`), no tested protocol matrix (`H-04`, `P-02`), no SENSE measurement accuracy or ingress evidence (`P-05`, `H-05`), unverified NAV route-context integration (`P-01`, `P-10`), chart rights (`D-01`–`D-03`), no costed scope or installer network (`X-05`, `X-06`), no warranty terms or seller identity (`X-02`), brand `NOT_GRANTED`, source IP `NOT_CLEARED`, images `BLOCKED_ON_IMAGE_GENERATION`. No blocker may be waived by a bundle decision.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §15, §16; `VERIFIED_REPO docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`; `VERIFIED_REPO docs/marea/products/PILOT-SAFETY-CASE-OUTLINE.md` §0.2.
- **Owner.** Lead with the Safety function.
- **References.** `MC-08-REVIEW.md` (independent review); `bundle-definitions.json` release flags.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B24 — ES/EN content and visual references
- **Definition.** Customer content exists only as internal draft: `docs/marea/bundles/copy/sail.es.md` (Spain Spanish) and `docs/marea/bundles/copy/sail.en.md` (international English), each with exactly 24 numbered sections plus the unnumbered approved-disclaimer section and the internal status line. Names are never translated; no currency amount, price, stock, review, certification or availability appears; the navigation, supervised-steering and AIS disclaimers are verbatim. Visual assets are `CONCEPT` only: no photography, CGI or mock-up may be claimed as a real product, and scene assets remain `BLOCKED_ON_IMAGE_GENERATION`.
- **Evidence.** `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9; `VERIFIED_REPO docs/marea/products/README.md` §7 rules 9–10, §22; `VERIFIED_REPO docs/marea/products/copy/nav.en.md`, `pilot.en.md`; `BLOCKED` — `X-03` image generation.
- **Owner.** UX, Content and Localization function with the Sail and Helm Integration Specialist.
- **References.** `BUNDLE-ASSET-REQUIREMENTS.md`; copy section 23 and the disclaimer section of both files.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

---

**Document status:** INTERNAL — NOT PUBLISHED — NOT FOR SALE — BUNDLE DEFINITION ONLY. No bundle price is approved, no product is released, no compatibility row is `SUPPORTED`, no certification or sea trial exists, and nothing in this document makes MAREA SAIL orderable, quotable at a fixed price or available.
