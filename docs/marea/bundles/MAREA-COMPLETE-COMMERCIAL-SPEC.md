# MAREA COMPLETE — Bundle commercial specification (MC-08 / D6)

| Field | Value |
| --- | --- |
| Document ID | MC-08 / D6-MAREA-COMPLETE-BUNDLE-SPEC |
| Milestone | MC-08 (Master Prompt 08/36) — commercial bundles, ecosystem compatibility and product packaging |
| Deliverable | D6 — MAREA COMPLETE bundle commercial specification |
| Owner | Sail and Helm Integration Specialist (MC-08 run) |
| Status | INTERNAL · NOT PUBLISHED · NOT FOR SALE · BUNDLE DEFINITION ONLY |
| Base commit | `80c66c70a1bab6f11c5ba5709baa4c1671f1d6da` (MC-07 HEAD) |
| Branch | `feature/marea-mc08-bundles-commercial-architecture` |
| Date | 2026-10-30 |
| Write scope | `docs/marea/bundles/MAREA-COMPLETE-COMMERCIAL-SPEC.md` only — the other MC-08 deliverables are cited, never edited |
| Governing contract | `docs/marea/products/README.md` §1–§8 (MC-05) and §12–§32 (MC-06/MC-07 addenda); `docs/marea/COMMERCIAL-PORTFOLIO.md`; `docs/marea/execution/DECISION-LOG.md` D-007–D-017, in particular D-008, D-009, D-012 and D-015 |
| Bundle identity | Bundle id `COMPLETE`; display name `MAREA COMPLETE`; six-bundle family: START, CRUISE, SAIL, PROTECT, COMPLETE, FLEET |
| Is not | Not a catalogue entry, not a product page, not a shop SKU, not a quotation, not a price list, not a certification, not an availability statement, not an order option, not a commercial offer, not a release |

**Bundle status block (binding).**

| Classification | Value |
| --- | --- |
| `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` | `true` — no bottom-up costing, BOM, installer rate card or labour measurement exists for this configuration |
| `VESSEL_SURVEY_REQUIRED` | `true` — the configuration cannot be assessed, quoted or delivered before a documented vessel, steering, compatibility and display survey |
| `INSTALLER_QUOTATION_REQUIRED` | `true` — the commercial document is an itemised installer-led quotation, never a checkout value |
| `PILOT_SAFETY_GATE_BLOCKED` | `true` — `PILOT_SAFETY_GATE = BLOCKED` (H-01, P-04); E-stop, motor-isolation and rudder-feedback evidence `NOT_FOUND`; `PILOT_SEA_TRIALS = NOT_PERFORMED` |
| `COMPLETE_COMMERCIAL_MODEL` | `VESSEL_SPECIFIC_QUOTATION` |
| `FIXED_TURNKEY_PRICE` | `NOT_ESTABLISHED` |
| `BUNDLE_RELEASE_STATUS` | `BLOCKED` — PILOT safety gate, DISPLAY hardware, WATCH service, HUB hardware and SENSE measurement are all open |
| `HISTORICAL_PRICE_HYPOTHESIS` | EUR 3,490 — `HYPOTHESIS_UNAPPROVED`, recorded for traceability only and never an approved bundle price |
| `COMPOSITION` | Fixed by this document; no edition may be substituted, added or removed |

## 1. Scope and status statement

MAREA COMPLETE is the coordinated multi-system bundle of the MAREA ecosystem: navigation software, a
high-capacity onboard data gateway, a helm display, shore monitoring, four measured sensor points and a
surveyed and quoted supervised steering installation. It is the bundle a customer buys when the boat is
being integrated as one system rather than upgraded one product at a time.

It is a **bundle definition**, and four statements govern the whole document:

1. **There is no fixed price and no turnkey offer.** `COMPLETE_COMMERCIAL_MODEL = VESSEL_SPECIFIC_QUOTATION`
   and `FIXED_TURNKEY_PRICE = NOT_ESTABLISHED`. The historical EUR 3,490 is retained only for traceability:
   the indicative component hypothesis floor alone is EUR 3,332 and leaves approximately EUR 158 for
   installation, commissioning, cabling, conformity and warranty — an arithmetical demonstration that the
   historical figure cannot be a delivered price.
2. **COMPLETE is not "everything" and not unlimited.** It is a defined configuration of nine named products,
   not unlimited features, unlimited data, unlimited future upgrades or an entitlement to products that do
   not exist. Every optional object stays optional and every future capability keeps its own gate.
3. **Acceptance is separate per subsystem.** Navigation presentation, device integration, sensor accuracy,
   remote monitoring and PILOT safety each keep their own acceptance and regulatory gates; a combined
   package may never bypass, average or waive one of them.
4. **Nothing here upgrades an evidence state.** `PILOT_SAFETY_GATE = BLOCKED`,
   `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`, `SENSE_INGRESS_PROTECTION = NOT_VERIFIED`,
   `SENSE_NMEA2000 = NOT_IMPLEMENTED`, `WATCH_INGESTION = NOT_VERIFIED`,
   `WATCH_NOTIFICATION_PIPELINE = NOT_FOUND`, `WATCH_DEVICE_IDENTITY = NOT_FOUND`,
   `WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`, `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND`, DISPLAY
   size/hardware not frozen, HUB hardware absent and zero compatibility rows `SUPPORTED`.

All nine product families remain `DEFINED`, `NOT_FOR_SALE`, `INTERNAL_ONLY`, `brandPublication = NOT_GRANTED`,
`SOURCE_IP_CLEARANCE = NOT_CLEARED`, images `BLOCKED_ON_IMAGE_GENERATION`; no certification, BOM, supplier
quotation, sea trial, forecast evaluation or regulatory approval exists.

### 1.1 Historical price hypothesis — traceability only

`COMMERCIAL-PORTFOLIO.md` carries the bundle hypothesis **EUR 3,490** for MAREA COMPLETE. It is recorded here
exclusively so that a later costed model can be audited against it. It is not an approved price, not a
purchasable price, not a "from" offer, not a checkout value and not a sum of product hypotheses. It may never
be presented as a full installed COMPLETE price, and it may never be used to imply that the steering
installation is included at a fixed figure.

### 1.2 Indicative component hypothesis floor (not a price, not a quotation)

| Line | Edition | Standalone hypothesis | Status |
| --- | --- | --- | ---: |
| NAV | `NAV-PRO` | EUR 149 / year | `HYPOTHESIS_UNAPPROVED` |
| HUB | `HUB-PRO` | EUR 499 | `HYPOTHESIS_UNAPPROVED` |
| DISPLAY | `DISPLAY-7` | from EUR 699 | `HYPOTHESIS_UNAPPROVED`, `SIZE_NOT_FROZEN`, installation separately quoted |
| WATCH | `WATCH-CORE` | EUR 299 hardware + from EUR 9.90/month subscription | `HYPOTHESIS_UNAPPROVED`; connectivity/SIM cost not included |
| SENSE | `SENSE-POWER`, `SENSE-BILGE`, `SENSE-TANKS`, `SENSE-ENV` | 4 × from EUR 99 = EUR 396 | `HYPOTHESIS_UNAPPROVED` SENSE entry hypothesis only; per README §17 it is **not attributable** to a named module and no module price is established |
| PILOT | `PILOT-COASTAL` | from EUR 1,290 | `HYPOTHESIS_UNAPPROVED` starting price only — **not** an all-inclusive or installed price (D-009) |
| **Indicative floor** | | **EUR 3,332** | arithmetic illustration, not a price |

The floor excludes, at minimum: the steering drive/actuator, rudder feedback, cabling, power protection, the
physical E-stop assembly, mechanical interfaces, display mounting and installation, AIS receiver, WEATHER
entitlement, all installation labour, commissioning, supervised sea trials, customer training, conformity
work, warranty reserve, support and maintenance, and every subscription beyond year one. The difference
between EUR 3,490 and EUR 3,332 (approximately EUR 158) cannot pay for any of them; the historical figure is
therefore untenable, and `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` (D11) also records it as an unapproved
hypothesis with no approved replacement. No margin, channel percentage or bundled discount is asserted.

## 2. Canonical composition

The composition is **fixed**. Column semantics are identical to the SAIL specification: *Inclusion class*
uses exactly the permitted seven-value vocabulary; *Compatibility status* uses the four-value compatibility
vocabulary plus `BLOCKED` where an external gate controls the row; *Evidence class* uses `VERIFIED_REPO` /
`VERIFIED_EXTERNAL` / `ASSUMPTION` / `HYPOTHESIS` / `OPEN` / `BLOCKED`; *Installation class* is one of
`SOFTWARE_ONBOARDING`, `INSTALLER_ASSISTED`, `PROFESSIONAL_INSTALLATION`,
`PROFESSIONAL_INSTALLATION_SURVEY`, `NONE`.

| # | Family | Edition | Qty | Role in the bundle | Inclusion class | Dependencies | Subscriptions | Compatibility status (source row) | Evidence class | Price status | Cost status | Installation class | Release blockers |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `NAV` | `NAV-PRO` | 1 | Navigation and route context; read-only input to the helm, never actuator authority | `INCLUDED` | Licensed chart data obtained separately (`D-01`–`D-03`); `I-01` unverified | NAV annual subscription (one term) | `PLANNED` (`I-01`); `N-02` `PLANNED` for display presentation | `VERIFIED_REPO` (edition authority: `PRODUCT-EDITIONS-NAV-HUB-AIS.md`) | `HYPOTHESIS_UNAPPROVED` — EUR 149/yr | `NOT_ESTABLISHED` | `SOFTWARE_ONBOARDING` | `D-01`–`D-03`; `P-01`, `P-10`; `X-05` |
| 2 | `HUB` | `HUB-PRO` | 1 | Onboard data gateway with integration capacity and installer tooling for a coordinated multi-system vessel | `INCLUDED` | Frozen hardware and tested protocol matrix absent; adapter class `OPEN`; justified by device count and mixed-generation equipment, not by a power claim | None | `PLANNED` (`I-02`; batch-01 `A-02`, `B-08` `CODE_ONLY`; `N-01`) | `VERIFIED_REPO` (`PRODUCT-EDITIONS-NAV-HUB-AIS.md` §3) | `HYPOTHESIS_UNAPPROVED` — EUR 499 | `NOT_ESTABLISHED` | `INSTALLER_ASSISTED` | `H-04`, `H-05`, `H-07`, `P-02`; no HUB hardware |
| 3 | `DISPLAY` | `DISPLAY-7` | 1 | Fixed helm display for navigation, instruments and approved status | `INCLUDED` | `SIZE_NOT_FROZEN`; hardware not selected; mounting and installation separately quoted | None | `CONDITIONAL` (`N-01`), `PLANNED` (`N-02`), `UNKNOWN` (`N-06`) | `VERIFIED_REPO` (`PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`) | `HYPOTHESIS_UNAPPROVED` — from EUR 699 | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `H-11`, `P-07`, `H-05`; no display hardware, no measured screen values |
| 4 | `WATCH` | `WATCH-CORE` | 1 | Shore monitoring: position, geofence, bilge, DC state, temperature and alert state model | `INCLUDED` | Requires active subscription, connectivity and notification delivery; the service does not exist | **Required**: monitoring subscription, from EUR 9.90/month hypothesis | `UNKNOWN` — service `NOT_FOUND`; `I-08` `PLANNED` for SENSE input | `VERIFIED_REPO` (edition authority) | `HYPOTHESIS_UNAPPROVED` — EUR 299 + from EUR 9.90/month | `NOT_ESTABLISHED` | `INSTALLER_ASSISTED` | `WATCH_INGESTION = NOT_VERIFIED`, `WATCH_NOTIFICATION_PIPELINE = NOT_FOUND`, `WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`, `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND`, `H-12`, `P-06`, `X-07` |
| 5 | `SENSE` | `SENSE-POWER` | 1 | DC voltage, current and derived charge state | `INCLUDED` | Electrical installation assessment; calibration at installation | None | `PLANNED` (`I-06` via HUB) | `VERIFIED_REPO` (edition authority) | `NOT_ESTABLISHED` (entry hypothesis EUR 99 not attributable) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `P-05`, `H-05`; `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED` |
| 6 | `SENSE` | `SENSE-BILGE` | 1 | Bilge water presence/level and local indication | `INCLUDED` | Mounting and trigger calibration; false-trigger behaviour `OPEN` | None | `PLANNED` (`I-06`) | `VERIFIED_REPO` (edition authority) | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `P-05`, `H-05`; `SENSE_INGRESS_PROTECTION = NOT_VERIFIED` |
| 7 | `SENSE` | `SENSE-TANKS` | 1 | Tank level for compatible tanks with a calibration curve | `INCLUDED` | Compatible tank material, sender type and access; sender compatibility list `OPEN` | None | `PLANNED` (`I-06`) | `VERIFIED_REPO` (edition authority) | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `P-05`, `H-05`; no sender list |
| 8 | `SENSE` | `SENSE-ENV` | 1 | Compartment temperature, humidity and pressure context | `INCLUDED` | Placement rules and calibration; placement guidance `OPEN` | None | `PLANNED` (`I-06`) | `VERIFIED_REPO` (edition authority) | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `P-05`, `H-05`; `SENSE_INGRESS_PROTECTION = NOT_VERIFIED` |
| 9 | `PILOT` | `PILOT-COASTAL` | 1 | Supervised steering installation, vessel-specific | `QUOTATION_REQUIRED` | Documented vessel and steering survey; surveyed drive/actuator, feedback, E-stop, motor isolation; authorised installer | None (`subscriptionHypothesis: null`) | `BLOCKED` (`PILOT_SAFETY_GATE`) | `BLOCKED` (`H-01`, `P-04`, `H-10`) | `NOT_ESTABLISHED` — quotation only; from EUR 1,290 is a starting hypothesis only | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION_SURVEY` | `H-01`, `H-02`, `H-03`, `H-10`, `P-04`, `X-05`, `X-06` |
| 10 | `AIS` | `AIS-RECEIVER` | 0 | Optional receive-only traffic awareness, never automatic | `OPTIONAL` | Separate hardware, antenna/splitter and installation; AIS disclaimer mandatory wherever targets are shown | None | `UNKNOWN` (`I-18` `CODE_ONLY`; `I-13` `UNKNOWN` for WATCH) | `VERIFIED_REPO` (product definition only) | `HYPOTHESIS_UNAPPROVED` — EUR 249 | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `H-08`, `P-03`, `D-09` |
| 11 | `WEATHER` | `WEATHER-PRO` | 0 | Optional licensed forecast, never automatic and never a steering input (`WEATHER-STANDARD` remains obtainable separately) | `OPTIONAL` | Provider rights `NOT_GRANTED`; entitlement separate and never billed twice | WEATHER subscription (separate) | `CONDITIONAL` (`I-20`) | `VERIFIED_REPO` (product definition only) | `HYPOTHESIS_UNAPPROVED` — EUR 89/yr (`WEATHER-STANDARD` from EUR 49/yr) | `NOT_ESTABLISHED` | `SOFTWARE_ONBOARDING` | `D-04`, `D-05`, `D-07`, `D-10`, `DEC-03` |
| 12 | `PILOT` | `PILOT-SAIL` | 0 | Conditional alternative steering edition, never the default | `CONDITIONAL` | Coastal conditions plus verified wind-angle steering and a qualified wind source | None | `BLOCKED` (`H-01`) | `BLOCKED` (`H-01`) | `NOT_ESTABLISHED` (no PILOT-SAIL price may exist) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION_SURVEY` | `H-01`; not shippable until wind mode is verified |
| 13 | `PILOT` | `PILOT-PRO` | 0 | Quoted service scope only | `INELIGIBLE` | `INSTALLATION_PACKAGE` verdict: vessel-specific quoted work, not a retail SKU (D-008) | None | `BLOCKED` | `VERIFIED_REPO` (`PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §2.4) | `NOT_ESTABLISHED` — no price may exist | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION_SURVEY` | `H-01`; ineligible as a priced bundle line |
| 14 | `SENSE` | `SENSE-SYSTEMS` | 0 | Conditional-alternative kit (product verdict `CONDITIONAL`); never the reference configuration of this bundle | `NOT_INCLUDED` | Four simultaneous measurement claims plus a validated multi-module installation | None | `CONDITIONAL` | `BLOCKED` (`P-05`) | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `P-05`, `H-05` |
| 15 | `SENSE` | `SENSE-ESSENTIALS` | 0 | Kit is redundant here: its two modules are included individually | `NOT_INCLUDED` | Kit is not the reference; no module may be counted twice | None | `CONDITIONAL` (`I-06`) | `VERIFIED_REPO` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `P-05`, `H-05` |
| 16 | `EXTERNAL` | — | 1 | Full compatibility survey of the vessel | `REQUIRED_EXTERNAL` | Authorised surveyor/installer; survey criteria per D12 §13 | None | Not assessable (`UNKNOWN`) | `OPEN` | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION_SURVEY` | No validated survey method; `X-06` |
| 17 | `EXTERNAL` | — | 1 | Vessel-specific components (mounts, cables, adapters, senders, antenna items) | `REQUIRED_EXTERNAL` | Selected by survey; no BOM exists | None | `UNKNOWN` | `OPEN` | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `H-05`, `X-06` |
| 18 | `EXTERNAL` | — | 1 | PILOT physical installation scope (steering survey, drive/actuator eligibility, rudder feedback, cabling, power protection, physical E-stop assembly, mechanical interfaces) | `REQUIRED_EXTERNAL` | Inherited from the SAIL specification §2 rows 7–14; not restated here as a second authority | None | `UNKNOWN` | `BLOCKED` (`H-01`, `H-03`, `H-10`) | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION_SURVEY` | `H-01`, `H-03`, `H-10`, `X-06` |
| 19 | `EXTERNAL` | — | 1 | Safety assessment (PILOT) for the specific vessel | `REQUIRED_EXTERNAL` | Independent safety review and conformity plan; none exists | None | `UNKNOWN` | `BLOCKED` (`P-04`, `H-06`, `H-13`) | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `NONE` | `P-04`, `H-06`, `H-13` |
| 20 | `EXTERNAL` | — | 1 | Installation labour | `REQUIRED_EXTERNAL` | Measured hours do not exist; no installer agreement or rate card | None | `UNKNOWN` | `OPEN` | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `X-05`, `X-06` |
| 21 | `EXTERNAL` | — | 1 | Commissioning of every subsystem | `REQUIRED_EXTERNAL` | Per-subsystem commissioning records; none exists | None | `UNKNOWN` | `OPEN` | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `P-04` |
| 22 | `EXTERNAL` | — | 1 | Customer training | `REQUIRED_EXTERNAL` | Navigation, display, monitoring, supervised steering, manual takeover, E-stop drills | None | `UNKNOWN` | `OPEN` | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `PROFESSIONAL_INSTALLATION` | `P-04` |
| 23 | `EXTERNAL` | — | 1 | Support and maintenance proposal | `REQUIRED_EXTERNAL` | Support level, maintenance plan and warranty position to be defined; no contract exists | None | `UNKNOWN` | `OPEN` | `NOT_ESTABLISHED` (quotation only) | `NOT_ESTABLISHED` | `NONE` | `X-02` |
| 24 | — | — | 0 | Remote, internet or cloud steering command | `INELIGIBLE` | No control path may leave the vessel; local control-head authority only | — | Prohibited by design | By design (`README` §16 rule 1; `H-02`) | Not applicable | Not applicable | `NONE` | Permanent exclusion |
| 25 | — | — | 0 | Autonomous or unattended navigation and steering | `INELIGIBLE` | PILOT is supervised by design; no autonomy claim permitted | — | Prohibited by design | By design (`README` §16 rule 3) | Not applicable | Not applicable | `NONE` | Permanent exclusion |
| 26 | — | — | 0 | Collision avoidance or AIS-triggered manoeuvring | `INELIGIBLE` | AIS is receive-only information | — | Prohibited by design | By design (`COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2) | Not applicable | Not applicable | `NONE` | Permanent exclusion |
| 27 | — | — | 0 | Certified, distress, SOLAS or GMDSS service, and any certified alarm | `INELIGIBLE` | No certified alarm, distress or safety-of-life device exists or is planned | — | Prohibited by design | By design | Not applicable | Not applicable | `NONE` | Permanent exclusion |
| 28 | — | — | 0 | NMEA 2000 certification or operational compatibility | `INELIGIBLE` | `SENSE_NMEA2000 = NOT_IMPLEMENTED`; no NMEA licence or certification exists | — | `BLOCKED` (`H-04`, `DEC-05`) | `BLOCKED` | Not applicable | Not applicable | `NONE` | `H-04`, `DEC-05` |
| 29 | — | — | 0 | ECDIS, ECDIS-class or ECDIS-equivalent navigation | `INELIGIBLE` | NAV is a navigational aid; no official ENC distribution right | — | Prohibited by design | By design (`D-01`–`D-03`) | Not applicable | Not applicable | `NONE` | Permanent exclusion |
| 30 | — | — | 0 | Fixed turnkey price for the bundle | `INELIGIBLE` | `FIXED_TURNKEY_PRICE = NOT_ESTABLISHED`; PILOT is quotation-only (D-009) | — | Prohibited by design | By design | Not applicable | Not applicable | `NONE` | Permanent in the current state; EUR 3,490 is traceability only |
| 31 | — | — | 0 | Unlimited features, unlimited data or unlimited future upgrades | `INELIGIBLE` | COMPLETE is a defined configuration, not an all-you-can-eat entitlement | — | Prohibited by design | By design | Not applicable | Not applicable | `NONE` | Permanent exclusion |
| 32 | — | — | 0 | A single combined acceptance that bypasses subsystem gates | `INELIGIBLE` | Each subsystem keeps its own evidence and regulatory gate (§5) | — | Prohibited by design | By design (`README` §21) | Not applicable | Not applicable | `NONE` | Permanent exclusion |
| 33 | `DISPLAY` | `DISPLAY-LARGE-CONDITIONAL` | 0 | Larger display size, conditional and never available in this bundle | `INELIGIBLE` | No frozen size, no selected hardware and no price; `DISPLAY-7` is the only display edition in the reference composition | None | `CONDITIONAL` (`N-01`) | `BLOCKED` (`H-11`, `H-05`, `P-07`) | `NOT_ESTABLISHED` — no price may exist | `NOT_ESTABLISHED` | `NONE` | `H-11`, `H-05`, `P-07`; the conditional display is never selectable as an available size |

Composition reconciliation: **9 included objects** (rows 1–9: five MAREA products — NAV, HUB, DISPLAY, WATCH,
PILOT — plus four SENSE modules, each on its own line; `PILOT-COASTAL` is `QUOTATION_REQUIRED`), **2 optional
objects** (rows 10–11: AIS, WEATHER-PRO), **2 conditional or ineligible variants** (rows 12–13: `PILOT-SAIL`
`CONDITIONAL`, `PILOT-PRO` `INELIGIBLE` as a priced line), **2 non-included kits** (rows 14–15), **8 required
external or quoted-scope objects** (rows 16–23), **10 permanent ineligibilities** (rows 24–33). Total 33 rows.
No row may be reclassified without a decision in `DECISION-LOG.md` and a corresponding machine-contract
update.

**Cross-document reconciliation.** D1 `BUNDLE-ARCHITECTURE.md` §6.5 and D8
`BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` §3.5 are the canonical reference composition for this bundle. This
specification carries the same objects under local row numbers: rows 1–13 = `CP-01`–`CP-13`; rows 14–15 =
`CP-12` (`SENSE-SYSTEMS`; the kit's product verdict is `CONDITIONAL`, the bundle line is `NOT_INCLUDED`) and the
`SENSE-ESSENTIALS` duplicate check; row 33 = `CP-14` (`DISPLAY-LARGE-CONDITIONAL` `INELIGIBLE`); rows 16–23 =
the single `CP-15` quoted scope, split here into individually visible `REQUIRED_EXTERNAL` rows for cost
transparency (D8 groups them into one `QUOTATION_REQUIRED` line; the price status is identical — quotation
only). Installation-class labels here map to D8 as follows: `SOFTWARE_ONBOARDING` ≈ `SELF_INSTALL_NOT_VERIFIED`,
`INSTALLER_ASSISTED` = `INSTALLER_ASSISTED`, `PROFESSIONAL_INSTALLATION` = `PROFESSIONAL_REQUIRED`,
`PROFESSIONAL_INSTALLATION_SURVEY` = `PROFESSIONAL_REQUIRED` + `QUOTATION_REQUIRED`, `NONE` = no installation
scope. The objects, quantities, inclusion classes and price statuses are identical in both documents.

## 3. Mandatory configuration rules

| # | Rule |
| --- | --- |
| R1 | **Fixed composition.** `NAV-PRO` + `HUB-PRO` + `DISPLAY-7` + `WATCH-CORE` + `SENSE-POWER` + `SENSE-BILGE` + `SENSE-TANKS` + `SENSE-ENV` + `PILOT-COASTAL` (quotation) are the included objects. No substitution, addition or silent removal is permitted under the `COMPLETE` id. |
| R2 | **No fixed price, no turnkey offer.** `COMPLETE_COMMERCIAL_MODEL = VESSEL_SPECIFIC_QUOTATION`; `FIXED_TURNKEY_PRICE = NOT_ESTABLISHED`. The historical EUR 3,490 and the EUR 3,332 floor are traceability/illustration only. |
| R3 | **Survey before quotation.** A full compatibility survey and, for the steering item, a documented vessel and steering survey precede any quotation, deposit, reservation or delivery expectation. |
| R4 | **PILOT is quotation-based and supervised.** Every quotation enumerates inclusions and exclusions (D-009); the supervised-steering disclaimer is present wherever the helm is mentioned; `PILOT-PRO` may appear only as a quoted service scope. |
| R5 | **HUB-PRO must be justified, not advertised.** It is included because a coordinated multi-system vessel needs integration capacity and installer tooling, not because of any performance or power-superiority claim. No capability comparison and no performance statement may be used. |
| R6 | **AIS and WEATHER are optional, never automatic.** They are never added by default, never pre-selected, never implied by a bundle price and never counted in a quotation unless the customer requests them and their own gates permit. |
| R7 | **SENSE-SYSTEMS is not the reference.** The reference configuration is the four individual modules listed above; the `CONDITIONAL` kit may never be substituted and no module may be counted twice via a kit. |
| R8 | **WATCH requires its own service.** `WATCH-CORE` is hardware plus a required subscription that depends on connectivity, device identity and notification delivery; the service does not exist and no immediate-delivery, theft-prevention or distress promise may be made. |
| R9 | **DISPLAY is a device, not a software feature.** No measured size, resolution, brightness, contrast, ingress rating or sunlight-readability result may be stated; installation is separately quoted. |
| R10 | **No product is presumed included in another** and no cross-sell makes a licence, chart, data entitlement or installation included. |
| R11 | **Subscription isolation.** No entitlement, renewal failure or payment lapse may disable local steering, valid local measurement, local alarms or the safety fallback. |
| R12 | **Per-subsystem acceptance.** No combined package acceptance may bypass, average or waive a subsystem's evidence or regulatory gate (§5). |
| R13 | **No publication and no orderable state.** `PUBLICATION_BLOCKED`; no CTA may enable purchase, reservation, pre-order or "notify me" as an order channel. |
| R14 | **Installer-led only.** No self-install path exists or is planned for this bundle. |
| R15 | **Evidence states are not upgraded.** Every canonical state in §1 remains at its recorded value. |
| R16 | **Configuration outcomes are internal-only labels.** Only the six outcomes of §7 may describe a configuration; `ORDERABLE`, `FOR_SALE` and `APPROVED` are prohibited. |

## 4. Compatibility and eligibility criteria

### 4.1 Compatibility status of every included relationship

| Relationship | Status | Source row | What must close it |
| --- | --- | --- | --- |
| PILOT ← NAV route/waypoint context | `PLANNED` | `I-01` | MC-13 local integration test; route data proven non-actuating |
| PILOT ↔ HUB instrument/nav data and status | `PLANNED` | `I-02` | HUB hardware freeze, tested protocol matrix, local test record |
| HUB → NAV vessel data | `PLANNED` | `I-16`; batch-01 `A-02`, `B-08` (`CODE_ONLY`) | Batch-01 rows tested (`P-02`, `P-10`) |
| HUB → DISPLAY data and instrument presentation | `CONDITIONAL` | `N-01` | Tested model/firmware/direction matrix and recorded integration test; HUB hardware freeze |
| DISPLAY ← NAV presentation | `PLANNED` | `N-02` | Interface contract, implemented build, recorded end-to-end presentation test |
| DISPLAY ← PILOT read-only status | `UNKNOWN` | `N-06` | A future read-only interface authorised inside the PILOT safety boundary |
| SENSE → HUB measurement publication | `PLANNED` | `I-06` | Frozen interface and adapter list; SENSE measurement evidence |
| SENSE → WATCH approved readings and notifications | `PLANNED` | `I-08` | WATCH delivery tests under network loss; SENSE measurement evidence |
| AIS → HUB receive-only targets | `PLANNED` | `I-18` | Batch-01 gate and receiver hardware |
| NAV ↔ WEATHER entitlement sharing | `CONDITIONAL` | `I-20` | Provider terms, entitlement implementation and a two-account no-double-billing test |

**Zero rows are `SUPPORTED`.** No device, firmware version, cable, adapter, message capture or recorded test
result exists for any relationship above. `PLANNED` and `CONDITIONAL` are statements of intent.

### 4.2 Survey requirements (`VESSEL_SURVEY_REQUIRED`)

The full compatibility survey is defined in `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` (D12 §13) and
covers, at minimum: vessel particulars; steering system; drive/actuator eligibility; electrical system and
motor-power isolation; instrument and navigation sources with make, model and firmware; display mounting and
power; sensor mounting points, tanks and senders; environment and ingress exposure at each point; existing
equipment to be retained; ownership and consent; and a refusal record where any element cannot be assessed.
The PILOT steering survey of the SAIL specification §4.2 applies unchanged to the steering item of COMPLETE.

### 4.3 Eligibility criteria (all must be true)

- The vessel can be surveyed end to end and every subsystem has a feasible mounting, power and data path.
- The steering system passes the PILOT eligibility criteria, including manual release, E-stop feasibility and
  motor-power isolation.
- SENSE mounting, tank access and sender compatibility can be documented, or the affected module is removed
  from the quotation — never silently replaced.
- DISPLAY mounting, power and viewing position are feasible; no measured display performance is promised.
- WATCH has power, mounting and, as a condition of the service, mobile coverage at the berth (`H-12`,
  unquantified).
- The owner accepts supervised use, per-subsystem acceptance and the absence of a fixed price.
- An authorised installer can perform, commission and train, with recorded acceptance for each subsystem.

### 4.4 Refusal and escalation boundary

A COMPLETE configuration must be refused, not partially quoted, when: the steering system is ineligible or
unsafe; the vessel cannot be surveyed; a subsystem cannot be commissioned or accepted; the owner requires
unattended or remote steering; the owner requires a fixed all-inclusive price; the electrical or mechanical
work would be unsafe; or the customer intends to sell the configuration as a certified or turnkey system.
Partial quotes that leave a subsystem unaddressed are prohibited because they would present a coordinated
package as if each subsystem had been accepted. Refusals are recorded with reason and escalation route
(surveyor → installation partner → programme safety function) and are never converted into a discount.

### 4.5 Installation and commissioning requirements

MAREA COMPLETE is **professional installation only** (`PROFESSIONAL_INSTALLATION_SURVEY`), delivered on route
SFR-4 of `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` (D12). No self-install path exists or is planned.

| Stage | Content | Status |
| --- | --- | --- |
| Full compatibility survey | Every subsystem surveyed, including the steering survey of the SAIL specification §4.2 and the display, sensor, tank, gateway and monitoring points | `BLOCKED` — no validated survey method, no surveyor network (`X-06`) |
| Design and quotation | Documented configuration, itemised equipment and labour, exclusions schedule | `OPEN` — no costed worksheet |
| Mechanical and electrical work | Gateway, display, sensor, tank, monitoring and steering interfaces; cabling; power protection; independent motor-power isolation; physical E-stop assembly | `BLOCKED` — no hardware, `PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND`, `PILOT_MOTOR_ISOLATION_EVIDENCE = NOT_FOUND` (`H-03`, `H-10`) |
| Data and software configuration | HUB local interface, NAV account and chart coverage, DISPLAY views, WATCH registration and consent, SENSE calibration | `BLOCKED` — no frozen hardware or tested protocol matrix (`H-04`, `H-05`, `H-07`, `P-02`) |
| Per-subsystem commissioning | Written record for each subsystem, including what was verified and what was not | `OPEN` — no commissioning procedure or record |
| Supervised sea trials | Steering modes recorded on representative vessels | `BLOCKED` — `PILOT_SEA_TRIALS = NOT_PERFORMED` (`P-04`) |
| Customer training | Navigation, display, monitoring state model, supervised steering, manual takeover and E-stop drills | `OPEN` — no training material |
| Handover | Signed record per subsystem, limitations statement, support route, warranty position | `OPEN` — contents in D12 §15 |

No installation duration, labour hour figure, lead time, deliverable date or installation price exists, and
none may be stated. The vessel-level coordination check verifies data paths and degraded states only; it does
**not** create a combined acceptance, and it may never be used to imply that an open subsystem gate has closed.

## 5. Per-subsystem acceptance (COMPLETE)

Each subsystem retains its own acceptance criteria, its own evidence class and, where applicable, its own
regulatory gate. This bundle has **no combined acceptance** and may not create one.

| # | Subsystem | Acceptance object | Current state | Gate that would close it | What the bundle may not do |
| ---: | --- | --- | --- | --- | --- |
| 1 | Navigation display validation | `DISPLAY-7` presenting `NAV-PRO` navigation (`N-02`) | `OPEN` / `BLOCKED` — no display hardware, no interface contract, `SIZE_NOT_FROZEN` | Recorded end-to-end presentation test on a frozen device with a published interface contract | May not substitute browser contrast evidence, an emulator or a tablet demo for cockpit validation |
| 2 | Device integration validation | `HUB-PRO` with instruments, NAV, DISPLAY and AIS where present (`I-02`, `I-16`, `N-01`, `A-02`, `B-08`) | `PLANNED` / `CODE_ONLY` — no frozen hardware or tested protocol matrix | Frozen HUB hardware, tested per-device/firmware/direction matrix, recorded local installation test | May not claim Signal K or NMEA 2000 blanket compatibility, and may not treat an untested row as supported |
| 3 | Sensor accuracy | `SENSE-POWER`, `SENSE-BILGE`, `SENSE-TANKS`, `SENSE-ENV` | `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`, `SENSE_INGRESS_PROTECTION = NOT_VERIFIED` | Calibration and field accuracy evidence per module, ingress/environment evidence, false-trigger and failure-mode tests | May not publish any accuracy, resolution or IP figure; may not present an uncalibrated, stale or out-of-range value as a measurement |
| 4 | Remote monitoring | `WATCH-CORE` plus its subscription, connectivity and notification path | `WATCH_INGESTION = NOT_VERIFIED`; `WATCH_NOTIFICATION_PIPELINE`, `WATCH_DEVICE_IDENTITY`, `WATCH_SUBSCRIPTION_SERVICE`, `WATCH_CONNECTIVITY_CONTRACT` all `NOT_FOUND` | Built ingestion, device identity and ownership proof, notification pipeline with delivery records, billing/entitlement service, connectivity terms, network-loss tests | May not promise immediate delivery, guaranteed receipt, theft prevention or a certified distress service; provider acceptance is never delivery to a person |
| 5 | PILOT safety verification | `PILOT-COASTAL` supervised steering | `PILOT_SAFETY_GATE = BLOCKED`; E-stop, motor isolation and rudder feedback `NOT_FOUND`; `PILOT_SEA_TRIALS = NOT_PERFORMED` | Bench evidence for the supervised control loop and E-stop path, motor-isolation evidence, supervised sea trials, independent safety review, conformity assessment plan | May not let the bundle, the installer or a quotation imply that the other four subsystems' acceptance validates the steering system |

Handover acceptance is additional and is documented in `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §15: a
signed record per subsystem, training completion, documentation and a written limitations statement. No
handover record exists for any vessel.

## 6. Entitlements

| Entitlement | Included in the bundle | Behaviour |
| --- | --- | --- |
| `NAV-PRO` software entitlement | One annual subscription term in the quotation scope | Renewal is a separate commercial act; on expiry the customer keeps export of own routes, waypoints and logbook |
| `HUB-PRO` local interface | Included with the appliance | Local data functions remain operational independently of the e-commerce service |
| `DISPLAY-7` base software | Included with the device | Bounded: no charts, no perpetual NAV Pro entitlement, no AIS hardware, no unlimited data |
| `WATCH-CORE` monitoring | Hardware included; **subscription required** (from EUR 9.90/month hypothesis) | Remote functions depend on power, coverage and provider delivery; local functions and alarms are never gated |
| `SENSE` local measurement and local indication | Included with each module | Never gated by any entitlement; uncalibrated or stale values shown as invalid |
| `PILOT-COASTAL` local steering | Included in the quoted scope | Local only; no subscription; never gated by payment |
| Charts, `WEATHER`, `AIS` data, connectivity | Not included | Separate licences and products; no double billing of any shared entitlement |
| Remote or cloud helm control | Not included and never will be | Only read-only status may ever leave the vessel |

Subscription isolation is a design requirement of this definition: an expired WATCH or NAV entitlement, or a
failed payment, may never disable local steering behaviour, valid local measurement, local alarms or the
safety fallback. No billing, entitlement or outage test exists, so this remains a requirement, not a verified
behaviour.

## 7. Configuration outcomes

Only these six outcomes may describe a COMPLETE configuration. `ORDERABLE`, `FOR_SALE` and `APPROVED` are
prohibited everywhere in this bundle.

| Outcome | Applies when | What it permits |
| --- | --- | --- |
| `CONFIGURATION_DEFINED_INTERNAL` | The intended configuration is fully described in internal documentation | Internal planning only; no customer-facing availability |
| `COMPATIBILITY_EVIDENCE_REQUIRED` | Any included relationship is `PLANNED`, `CONDITIONAL` or `UNKNOWN` — all of them today | A compatibility questionnaire and a recorded assessment; never a compatibility claim |
| `SPECIALIST_SURVEY_REQUIRED` | The vessel, steering, electrical, display, sensor or monitoring installation must be assessed | A survey request; a written eligibility decision or refusal |
| `QUOTATION_REQUIRED` | The scope can be itemised but has no established price | An itemised quotation request; never a fixed bundle price |
| `NOT_ELIGIBLE` | The vessel, owner intent or configuration falls outside the safety or product envelope, or a subsystem cannot be accepted | A recorded refusal and escalation; no quotation |
| `PUBLICATION_BLOCKED` | Any included product gate is open — true of every COMPLETE configuration today | No publication, no order, no reservation, no CTA that enables purchase |

## 8. Journey, copy and asset pointers

| Object | Path | Status |
| --- | --- | --- |
| Customer journey | `BUNDLE-CONFIGURATION-RULES.md` (D9); the COMPLETE journey follows the 17-stage MC-05 vocabulary with per-subsystem acceptance as its spine | `OPEN` — no journey acceptance evidence |
| Spanish copy | `docs/marea/bundles/copy/complete.es.md` | INTERNAL DRAFT — 24 numbered sections; no prices; navigation, PILOT and AIS disclaimers verbatim |
| English copy | `docs/marea/bundles/copy/complete.en.md` | INTERNAL DRAFT — 24 numbered sections; no prices; navigation, PILOT and AIS disclaimers verbatim |
| Asset requirements | `BUNDLE-ASSET-REQUIREMENTS.md` (D16) | `CONCEPT` only; scene assets `BLOCKED_ON_IMAGE_GENERATION`; no real-product visual |
| Machine contract | `bundle-definitions.json` (D17) | `BUNDLE_DEFINITION_CONTRACT`; `published: false`, `forSale: false`, `purchaseCtaAllowed: false`, `pricesInCopyAllowed: false` |
| Pricing authority | `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` (D11) | No approved price; historical hypothesis recorded as untenable |
| Installation and quotation authority | `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` (D12) | Framework and proposal only; no binding contract, no installer network |

## 9. The 24 mandatory bundle fields

#### B01 — Identity
- **Definition.** MAREA COMPLETE (`COMPLETE`) is the defined coordinated multi-system bundle: `NAV-PRO`, `HUB-PRO`, `DISPLAY-7`, `WATCH-CORE`, `SENSE-POWER`, `SENSE-BILGE`, `SENSE-TANKS`, `SENSE-ENV` and a surveyed, quoted `PILOT-COASTAL` steering installation. It is a bundle definition (`definition = COMPLETE_TARGET_SPECIFICATION`), not a product, not a SKU and not an "everything included" tier.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` (bundle table, historical EUR 3,490); `VERIFIED_REPO docs/marea/products/README.md` §2, §8; `VERIFIED_REPO` edition documents for all nine families; `OPEN` — no bundle content, price or publication has ever been approved.
- **Owner.** Sail and Helm Integration Specialist (bundle definition owner, MC-08).
- **References.** `DECISION-LOG.md` D-008, D-009, D-012, D-015; the nine product dossiers.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B02 — Commercial purpose
- **Definition.** The purpose is to offer a boat owner one coordinated integration outcome — navigation, onboard data, display, shore monitoring, measurement and supervised steering — specified, surveyed, installed and accepted subsystem by subsystem, with a single itemised quotation instead of a fixed-price box. The bundle exists so that a complex multi-product installation has one commercial story and nine independent evidence gates that no sales surface can collapse.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` bundle architecture; `VERIFIED_REPO docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` §8.2; `ASSUMPTION` — that a coordinated outcome is worth more than separate purchases (unvalidated).
- **Owner.** Commercial Strategy and Pricing function with the Sail and Helm Integration Specialist.
- **References.** `COMMERCIAL-PORTFOLIO.md` price and channel decision rule; `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §5–§6.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B03 — Ideal customer
- **Definition.** The primary customer is the owner of a sailing yacht or motor cruiser of roughly 10–18 m who is refitting the boat as one system, wants navigation context, a fixed helm display, shore monitoring and a readable set of measured systems, accepts a supervised steering installation and is prepared to fund a survey, a quotation and a commissioning programme. Secondary buyers are refit yards, boat managers and small professional operators integrating a vessel for a customer. The customer seeking a fixed all-inclusive price, autonomy or remote helm control is explicitly not the customer.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-*` target segments; `ASSUMPTION` — vessel size, budget and segment size.
- **Owner.** Commercial Strategy with the product functions.
- **References.** `CUSTOMER-JOURNEYS-*` registers; `BUNDLE-CONFIGURATION-RULES.md`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B04 — Vessel or organization applicability
- **Definition.** Applicability is decided per vessel by the full survey: every subsystem must have a feasible mounting, power and data path, the steering system must pass PILOT eligibility, SENSE mounting and tank access must be documentable, DISPLAY viewing and power positions must be feasible, WATCH must have power and, for the service, coverage at the berth. Vessels that cannot be surveyed, or where any subsystem cannot be commissioned and accepted, are not applicable; an organization buying for a fleet must contract through the separate FLEET package, never this bundle.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PILOT-SAFETY-CASE-OUTLINE.md` §2; `VERIFIED_REPO docs/marea/products/README.md` §19; `OPEN` — no survey method validated; `BLOCKED` — `PILOT_SAFETY_GATE = BLOCKED`, WATCH connectivity unquantified (`H-12`).
- **Owner.** Safety function with the installer channel owner.
- **References.** `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §13; `MAREA-FLEET-PACKAGE-COMMERCIAL-SPEC.md` (separate object).
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B05 — Main customer outcome
- **Definition.** The intended outcome is a boat whose navigation, instrument data, helm display, shore monitoring, measured systems and supervised steering are specified and commissioned together, with every subsystem accepted on its own evidence and every limitation documented. The outcome is a coordinated, supervised, readable boat — never autonomy, never a guarantee of monitoring delivery, never a certified instrument and never a promise of suitability for any particular voyage.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §16, §19, §25, §31; `OPEN` — no installed example, no accepted subsystem, no sea trial, no delivery record.
- **Owner.** Sail and Helm Integration Specialist.
- **References.** `MAREA-NINE-PRODUCT-ECOSYSTEM.md`; §5 of this document.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B06 — Mandatory base components
- **Definition.** The mandatory base components are fixed: `NAV-PRO`; `HUB-PRO`; `DISPLAY-7`; `WATCH-CORE`; `SENSE-POWER`, `SENSE-BILGE`, `SENSE-TANKS`, `SENSE-ENV`; and `PILOT-COASTAL` as `QUOTATION_REQUIRED`. `HUB-PRO` is justified as the integration-capacity and installer-tooling edition required to coordinate a multi-system vessel, not by a power or performance claim. No edition may be substituted, added or silently removed.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §3 (HUB Standard vs Pro rationale); `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md`; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`; `OPEN` — every relationship untested.
- **Owner.** Sail and Helm Integration Specialist.
- **References.** `bundle-definitions.json` component refs; §2 of this document.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B07 — Optional components
- **Definition.** Exactly two optional objects exist: `AIS-RECEIVER` (receive-only traffic awareness) and `WEATHER-PRO` (licensed forecast; `WEATHER-STANDARD` remains obtainable separately as its own entitlement), both optional, never automatic, never pre-selected and never included in any quotation unless the customer asks and their own gates permit. Additional SENSE modules, a second control head, a maintenance plan, extended retention and connectivity upgrades are separate commercial objects. `SENSE-SYSTEMS` is a conditional kit and not the reference; `PILOT-SAIL` is a conditional steering alternative and `PILOT-PRO` a quoted service scope, neither of which is an add-on.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §3.3, §4.1; `VERIFIED_REPO docs/marea/products/README.md` §19; `OPEN` — optional pricing.
- **Owner.** Commercial Strategy and Pricing function.
- **References.** `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md`; `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B08 — Required product editions
- **Definition.** Required editions: `NAV-PRO`, `HUB-PRO`, `DISPLAY-7`, `WATCH-CORE`, `SENSE-POWER`, `SENSE-BILGE`, `SENSE-TANKS`, `SENSE-ENV`, `PILOT-COASTAL`. `PILOT-SAIL` is `CONDITIONAL` and not the default; `PILOT-PRO` is `INSTALLATION_PACKAGE` and `INELIGIBLE` as a priced retail SKU; `SENSE-ESSENTIALS` and `SENSE-SYSTEMS` are not the reference; `DISPLAY-LARGE-CONDITIONAL` and `WATCH-PLUS` are not included. No new family or edition may be invented.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §12, §14, §18, §27; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §1.4; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`.
- **Owner.** Lead (Chief Product Officer) with the Sail and Helm Integration Specialist.
- **References.** `product-definitions.batch-01.json`, `.batch-02.json`, `.batch-03.json`; `bundle-definitions.json`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B09 — Explicit exclusions
- **Definition.** Excluded, permanently or by definition: a fixed turnkey bundle price; remote, internet or cloud steering; unattended or autonomous navigation and steering; collision avoidance or AIS-triggered manoeuvring; any certified, distress, SOLAS, GMDSS or safety-of-life service or certified alarm; unlimited features, data or future upgrades; a single combined acceptance that bypasses subsystem gates; NMEA 2000 certification or operational compatibility; ECDIS, ECDIS-class or ECDIS-equivalent navigation; charts, connectivity, data plans and installation labour except as itemised in a quotation.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §7, §16, §25; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2–§4; `BLOCKED` — NMEA 2000 (`H-04`, `DEC-05`), ECDIS (`D-01`–`D-03`).
- **Owner.** Safety function with brand and commercial governance.
- **References.** §2 rows 24–32; copy sections 9 and 23 of both language files.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B10 — Dependency rules
- **Definition.** Dependencies that cannot be waived: charts are licensed separately (`D-01`–`D-03`); `I-01`, `I-02`, `I-06`, `I-08`, `I-16`, `I-18`, `N-01`, `N-02` remain untested; `N-06` is `UNKNOWN`; WATCH depends on a service that does not exist; DISPLAY depends on hardware that is not selected; every PILOT dependency is blocked by the safety gate; and no dependency may be replaced by a verbal installer assurance, an optimistic adapter story or a manufacturer brochure.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md`; `PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md`; `PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md`; `BLOCKED` — zero `SUPPORTED` rows.
- **Owner.** HUB integration owner with the Sail and Helm Integration Specialist.
- **References.** `BUNDLE-CONFIGURATION-RULES.md` conflict rules; §4.1 of this document.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B11 — Compatibility criteria
- **Definition.** Compatibility is per device, per firmware version and per direction, recorded in a published matrix, and never stated as `SUPPORTED` without a recorded test; today zero rows are `SUPPORTED` across all three compatibility contracts. Signal K is not a blanket guarantee, NMEA 2000 is `NOT_IMPLEMENTED` and uncertified, AIS is receive-only, and no display, HUB, sensor, monitoring or steering relationship may be assumed from this bundle. The full survey plus a compatibility questionnaire is the only path to an assessed configuration.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` §1.2–§1.4; `PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` Registers A–C; `PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` `N-01`–`N-06`; `BLOCKED` — no device test recorded.
- **Owner.** HUB integration owner with the product functions.
- **References.** §4.1–§4.3 of this document.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B12 — Installation requirements
- **Definition.** Installation is professional and installer-led across every subsystem: survey, mechanical and electrical work, steering drive/feedback/E-stop and motor isolation, cabling and power protection, display mounting, HUB configuration, sensor mounting and calibration, WATCH mounting and commissioning, per-subsystem commissioning and acceptance, supervised sea trials for the steering item, customer training and a signed handover record. No installation price, labour hour figure, duration, lead time or deliverable date exists, and no nationwide installer network exists.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §2.1, §3.2, §4.2; `VERIFIED_REPO docs/marea/products/DISPLAY-HARDWARE-AND-INTERACTION-REQUIREMENTS.md`; `BLOCKED` — `X-05`, `X-06`; and every hardware state above.
- **Owner.** Installer channel owner with the Safety function.
- **References.** `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §6, §12, §13, §15.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B13 — Software entitlements
- **Definition.** Software entitlements: one annual `NAV-PRO` term; `DISPLAY-7` base software (bounded, not a NAV licence, not charts); `HUB-PRO` interface use; `WATCH-CORE` service access through its subscription; each SENSE module's local measurement functions; and the quoted `PILOT-COASTAL` local control software. Charts, WEATHER, AIS-derived data and connectivity are separate. No entitlement may gate local steering, valid local measurement, local alarms or the safety fallback, and cancellation never removes the customer's own exported records.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §16 rule 7, §25 rule 3, §31; `VERIFIED_REPO` NAV/DISPLAY/WATCH/PILOT editions documents; `OPEN` — renewal and entitlement service.
- **Owner.** Product functions with commercial governance.
- **References.** `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md`; `DECISION-LOG.md` D-013.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B14 — Recurring subscriptions
- **Definition.** Two recurring subscriptions are part of the bundle: the annual `NAV-PRO` entitlement and the `WATCH-CORE` monitoring subscription (from EUR 9.90/month hypothesis, contents `OPEN`, connectivity/SIM cost not included). `PILOT-COASTAL`, `HUB-PRO`, `DISPLAY-7` and the SENSE modules carry no recurring fee. WEATHER, connectivity upgrades, extended retention and chart licences are separate recurring objects. NAV/WEATHER entitlements are never billed twice, and subscription isolation protects local safety-relevant functions.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §17, §18; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §4.2; `BLOCKED` — `WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`, `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND`.
- **Owner.** Commercial Strategy and Pricing function.
- **References.** `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md`; `DECISION-LOG.md` D-010 rule 4, D-013.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B15 — External data and connectivity
- **Definition.** External dependencies: licensed charts (not included), local GNSS, measured SENSE values, monitored position and status carried through WATCH, and optionally licensed WEATHER data. WATCH depends on power, mobile coverage and a notification provider's delivery; provider acceptance is never delivery to a person and immediate receipt is never promised. Connectivity is never required for local steering, local measurement or local alarms, and there is no cloud-to-actuator path.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §16 rules 1, 5, 6; `WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md`; `BLOCKED` — WEATHER rights `NOT_GRANTED`, WATCH connectivity `NOT_FOUND`; `OPEN` — no connectivity terms.
- **Owner.** WATCH service owner with the data licensing function.
- **References.** `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md`; `WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B16 — Commissioning and onboarding
- **Definition.** Commissioning is per subsystem with a written record each, followed by a vessel-level coordination check that verifies data paths and degraded states without creating a combined acceptance. Onboarding covers NAV account and chart coverage, HUB local interface, DISPLAY installation and views, SENSE calibration, WATCH device registration, consent and alert configuration, PILOT control-head use, manual takeover, E-stop drills and wind-mode failure behaviour where applicable. No commissioning, sea-trial or handover record exists.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §2.1 (P10), §4.1 (W06–W08); `VERIFIED_REPO docs/marea/brand/assets/print/marea-installer-commissioning-record-en.html` (template only, not evidence); `BLOCKED` — `PILOT_SEA_TRIALS = NOT_PERFORMED`; `OPEN` — no commissioning procedure.
- **Owner.** Installer channel owner with the Safety function.
- **References.** `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §7, §15.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B17 — Warranty and support
- **Definition.** No written warranty terms, seller legal identity, support contract, response time or service level exists (`X-02`); a warranty reserve is a required quotation-scope item and the statutory consumer guarantee applies only once a product is actually sold. The intended model is installer first-line support, programme second-line product support, and a support/maintenance proposal as a quoted item — not a promise. No certified technician scheme and no 24/7 support exists.
- **Evidence.** `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class C, §5; `BLOCKED` — `X-02`; `OPEN` — RMA and support model (D12 §9–§11).
- **Owner.** Lead with the legal/commercial function.
- **References.** `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §9, §10, §11.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B18 — Channel and fulfilment
- **Definition.** The credible channel is installer-led quotation by a competent integrator who surveys, installs, commissions, trains and provides first-line support, with EMBARCARTE owning product definition, compatibility authority and any future product warranty; direct-to-consumer fulfilment cannot deliver this bundle. A B2B contracted solution applies only to professional operators and only under a written contract. There is no shop, no installer network, no rate card, no reseller agreement and no order or reservation channel.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` §8.3; `BLOCKED` — `X-05`, `X-06`; `OPEN` — channel terms.
- **Owner.** Commercial Strategy with the installer channel owner.
- **References.** `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §2–§4, §12.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B19 — Price hypothesis and quotation model
- **Definition.** `COMPLETE_COMMERCIAL_MODEL = VESSEL_SPECIFIC_QUOTATION`; `FIXED_TURNKEY_PRICE = NOT_ESTABLISHED`. The historical EUR 3,490 is retained only for traceability and is never an approved, purchasable, "from" or checkout price. The indicative component hypothesis floor is 149 + 499 + 699 + 299 + (4 × 99) + 1,290 = EUR 3,332, which leaves approximately EUR 158 for installation against a required scope that includes a full survey, mechanical and electrical work, cabling, commissioning, sea trials, training, conformity and warranty — so the historical figure is untenable. The commercial document is an itemised vessel-specific quotation issued after survey, with inclusions and exclusions enumerated.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` §3, §8.2; `VERIFIED_REPO docs/marea/products/README.md` §17–§18, §26; `VERIFIED_REPO DECISION-LOG.md` D-009; `HYPOTHESIS` — every figure above.
- **Owner.** Commercial Strategy and Pricing function.
- **References.** `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`; §1.1–§1.2 of this document.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B20 — Cost and margin assumptions
- **Definition.** No cost is established for any subsystem: no BOM, supplier quotation, labour rate, installer agreement, certification cost, connectivity cost, notification cost, warranty accrual, returns allowance or support cost exists. Cost work must remain a framework of named symbolic inputs; no contribution margin, channel percentage or bundle discount may be presented as fact, and no figure from the historical hypothesis may be used to compute one.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` §7–§8.1; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` price and channel decision rule; `BLOCKED` — `X-05`, `H-05`, `H-07`, `H-12`.
- **Owner.** Commercial Strategy and Pricing function.
- **References.** `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B21 — Upgrade and migration
- **Definition.** Intended paths: within NAV (Essential → Pro); HUB Standard → Pro as a supported migration (mechanism `OPEN`); SENSE module additions; WATCH Core → Plus only when validated and costed; PILOT Coastal → Sail only with wind-angle verification; Coastal/Sail → Pro only as a re-quoted installation package; DISPLAY large size only if the hardware programme exists. Nothing is a licence toggle, no path may bypass a safety gate, no bundle creates an upgrade entitlement, and no future capability is promised by buying COMPLETE today.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §2.5, §4.2; `VERIFIED_REPO docs/marea/products/MAREA-HUB-COMMERCIAL-SPEC.md` F21; `OPEN` — migration mechanics and pricing.
- **Owner.** Lead with the product functions.
- **References.** `BUNDLE-CONFIGURATION-RULES.md`; `MAREA-NINE-PRODUCT-ECOSYSTEM.md`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B22 — Customer acceptance criteria
- **Definition.** Acceptance is separate per subsystem (§5): navigation display validation on a frozen device with a recorded end-to-end presentation test; device integration on a tested per-device/firmware/direction matrix; sensor accuracy within verified ranges and calibration; remote monitoring on built ingestion, device identity, notification pipeline and delivery records under network loss; PILOT safety on bench evidence, E-stop and motor-isolation evidence, supervised sea trials, independent review and a conformity plan. Each retains its own regulatory gate, the bundle creates no combined acceptance, and no criterion is currently met.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §21, §25; `VERIFIED_REPO docs/marea/products/PILOT-SAFETY-CASE-OUTLINE.md` §0.2; `BLOCKED` — every listed state.
- **Owner.** Safety function with the quality gate.
- **References.** §5 of this document; `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §15.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B23 — Release readiness and blockers
- **Definition.** The bundle is `BLOCKED` for release: PILOT safety gate (`H-01`, `P-04`), missing E-stop, motor-isolation and rudder-feedback evidence (`H-10`, `H-03`), no sea trials (`P-04`), DISPLAY hardware not selected and size not frozen (`H-11`, `P-07`, `H-05`), WATCH service `NOT_FOUND` (`P-06`, `X-07`, `H-12`), HUB hardware absent (`H-05`, `H-07`), no tested protocol matrix (`H-04`, `P-02`), SENSE measurement and ingress evidence absent (`P-05`, `H-05`), chart rights (`D-01`–`D-03`), WEATHER rights (`D-04`, `D-05`, `D-07`, `D-10`), no costed scope or installer network (`X-05`, `X-06`), no warranty terms or seller identity (`X-02`), no conformity assessment (`H-06`, `H-13`), brand `NOT_GRANTED`, source IP `NOT_CLEARED`, images `BLOCKED_ON_IMAGE_GENERATION`.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §15–§16, §25; `VERIFIED_REPO docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`; `VERIFIED_REPO DECISION-LOG.md` D-010.
- **Owner.** Lead with the Safety function.
- **References.** `MC-08-REVIEW.md`; `bundle-definitions.json` release flags.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B24 — ES/EN content and visual references
- **Definition.** Customer content exists only as internal draft: `docs/marea/bundles/copy/complete.es.md` (Spain Spanish) and `docs/marea/bundles/copy/complete.en.md` (international English), each with exactly 24 numbered sections plus the unnumbered approved-disclaimer section and the internal status line. Names are never translated; no currency amount, price, stock, review, certification or availability appears; the navigation, supervised-steering and AIS disclaimers are verbatim. Assets are `CONCEPT` only; no photography, CGI or mock-up may be claimed as a real product and scene assets remain `BLOCKED_ON_IMAGE_GENERATION`.
- **Evidence.** `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9; `VERIFIED_REPO docs/marea/products/README.md` §7 rules 9–10, §29; `VERIFIED_REPO docs/marea/products/copy/nav.en.md`, `pilot.en.md`; `BLOCKED` — `X-03`.
- **Owner.** UX, Content and Localization function with the Sail and Helm Integration Specialist.
- **References.** `BUNDLE-ASSET-REQUIREMENTS.md`; copy section 23 and the disclaimer section of both files.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

---

**Document status:** INTERNAL — NOT PUBLISHED — NOT FOR SALE — BUNDLE DEFINITION ONLY. No bundle price is approved, no product is released, no compatibility row is `SUPPORTED`, no display hardware, monitoring service, measurement evidence, certification or sea trial exists, and nothing in this document makes MAREA COMPLETE orderable, quotable at a fixed price or available.
