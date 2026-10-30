# MAREA — Product definitions: conventions and canonical contract (MC-05 / MC-06 / MC-07)

| Field | Value |
| --- | --- |
| Document ID | MC-05 / MC-06 / MC-07 PRODUCT-DEFINITION-CONVENTIONS |
| Milestone | MC-05 (05/36) + MC-06 addendum (06/36) + MC-07 addendum (07/36) |
| Date | 2026-10-30 |
| Owner | Lead (Chief Product Officer) |
| Status | INTERNAL. Not a shop catalogue, not a published product page, not a commercial offer |
| Scope | MC-05: NAV, HUB, AIS. MC-06: PILOT, SENSE, WATCH. MC-07: DISPLAY, WEATHER, FLEET — nine complete final-product commercial definitions across three batches |
| Binds | every file under `docs/marea/products/`, `scripts/check-marea-products.mjs`, `product-definitions.batch-01.json`, `product-definitions.batch-02.json`, `product-definitions.batch-03.json` |

This document is the shared contract for the nine product dossiers. Every specialist, the machine-readable
contract and the validator follow it. It does not replace the source documents; it fixes the vocabulary so
that independent writers cannot contradict each other. Sections 1–11 are the MC-05 contract and remain in
force unchanged for NAV, HUB and AIS. Sections 12–22 are the MC-06 addendum and bind PILOT, SENSE and WATCH.
Sections 24–32 are the MC-07 addendum and bind DISPLAY, WEATHER and FLEET; they add no competing lifecycle,
readiness, evidence or field model. Where an addendum and sections 1–11 differ, the addendum states the
difference explicitly and the difference is recorded as a decision in `docs/marea/execution/DECISION-LOG.md`.

## 1. Product status — the one thing that must never be misread

These nine products are **completely specified and not for sale**. All of the following are true at MC-07:

| Dimension | Value |
| --- | --- |
| `PRODUCT_DEFINITION` | `COMPLETE_TARGET_SPECIFICATION` |
| `ENGINEERING_READINESS` | `EVIDENCE_BASED` (MC-02 audit evidence; no product hardware, no tested integration) |
| `COMMERCIAL_AVAILABILITY` | `NOT_FOR_SALE` |
| `BRAND_CLEARANCE` | `NOT_GRANTED` |
| `SOURCE_IP_CLEARANCE` | `NOT_CLEARED` |
| `PUBLICATION_STATE` | `INTERNAL_ONLY` |

A complete specification is not readiness. The dossiers describe the **intended final product** and, in
separate labelled evidence fields, what is **actually verified today**. Both are always present. Marketing
copy in `docs/marea/products/copy/` is draft internal copy and must never be published while the gates in
`docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` are open.

## 2. Canonical product identities

Only these identifiers may appear in this milestone. They are already fixed by
`docs/marea/brand/brand-identity.contract.json`.

| Product id | Commercial family name | Type | Editions (this milestone) |
| --- | --- | --- | --- |
| `NAV` | MAREA NAV | SOFTWARE | `NAV-ESSENTIAL` MAREA NAV Essential; `NAV-PRO` MAREA NAV Pro |
| `HUB` | MAREA HUB | HARDWARE | `HUB-STANDARD` MAREA HUB Standard; `HUB-PRO` MAREA HUB Pro |
| `AIS` | MAREA AIS | HARDWARE | `AIS-RECEIVER` MAREA AIS Receiver; `AIS-CONNECTED` MAREA AIS Connected |
| `PILOT` | MAREA PILOT | HARDWARE_SOFTWARE | `PILOT-COASTAL`; `PILOT-SAIL`; `PILOT-PRO` (installation package, §18) |
| `SENSE` | MAREA SENSE | HARDWARE | `SENSE-WIND`, `SENSE-POWER`, `SENSE-BILGE`, `SENSE-TANKS`, `SENSE-ENV`; kits `SENSE-ESSENTIALS`, `SENSE-SAIL`, `SENSE-SYSTEMS` |
| `WATCH` | MAREA WATCH | HARDWARE_SERVICE | `WATCH-CORE` MAREA WATCH Core; `WATCH-PLUS` MAREA WATCH Plus |
| `DISPLAY` | MAREA DISPLAY | HARDWARE_SOFTWARE | `DISPLAY-7` MAREA DISPLAY 7; `DISPLAY-LARGE-CONDITIONAL` MAREA DISPLAY Large (conditional, §27) |
| `WEATHER` | MAREA WEATHER | SOFTWARE | `WEATHER-STANDARD` MAREA WEATHER Standard; `WEATHER-PRO` MAREA WEATHER Pro |
| `FLEET` | MAREA FLEET | SOFTWARE | `FLEET-START` MAREA FLEET Start; `FLEET-BUSINESS` MAREA FLEET Business; `FLEET-ENTERPRISE` MAREA FLEET Enterprise (contracted tier, §27) |

Rules: exactly one space between the master brand and the family (`MAREA PILOT`, never `MAREA-PILOT` or
`Marea Pilot`); edition names follow the family; no new family, bundle or edition may be invented; MAREA is a
**proposed** brand and no `®`/`™` may be attached to it or to a family name.

Bundles (`MAREA START`, `MAREA CRUISE`, `MAREA SAIL`, `MAREA PROTECT`, `MAREA COMPLETE`) are referenced only
as ecosystem context. Bundle contents, pricing and publication are governed by MC-08 and are **not** decided
here.

## 3. Lifecycle vocabulary (reconciled, binding)

`docs/marea/COMMERCIAL-PORTFOLIO.md` (supported by `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §5) is the binding
lifecycle vocabulary. The Master Prompt proposed eight governance states; they are mapped onto the binding
six plus a terminal retirement state, and the mapping is recorded as decision D-007 in
`docs/marea/execution/DECISION-LOG.md`. No competing enum is created.

| Binding state | Meaning | Master-Prompt equivalent |
| --- | --- | --- |
| `CONCEPT` | internal commercial definition only | CONCEPT |
| `DEFINED` | end-state specification complete, still not sellable | DEFINED |
| `ENGINEERING_VERIFIED` | limited technical evidence only, scope stated | ENGINEERING / VALIDATION |
| `REGULATORY_READY` | required conformity/licensing evidence exists | COMPLIANCE_REVIEW — passed |
| `OPERATIONS_READY` | stock, support, returns, payment and installation ready | SALES_APPROVED |
| `COMMERCIALLY_AVAILABLE` | explicitly approved release | RELEASED |
| `RETIRED` | withdrawn from sale, support defined | RETIRED |

At MC-07 all nine products are `DEFINED`. Any document that states another lifecycle state for a product is
wrong and fails the validator.

## 4. Readiness dimensions — never collapse into one flag

Each product and each edition carries these separate dimensions. A single `READY` flag is prohibited.

| Dimension | Allowed values |
| --- | --- |
| `definition` | `COMPLETE_TARGET_SPECIFICATION` |
| `engineering` | `NOT_VERIFIED` / `PARTIALLY_VERIFIED` / `ENGINEERING_VERIFIED` |
| `licensing` (software/source IP) | `NOT_CLEARED` / `CONDITIONAL` / `CLEARED` |
| `hardware` | `NOT_SELECTED` / `DESIGN_IN_PROGRESS` / `PROTOTYPED` / `CERTIFIED` / `NOT_APPLICABLE_SOFTWARE_PRODUCT` (value added in MC-05 for a software-only product such as MAREA NAV, which still depends on the customer's device, on connected equipment and on licensed data; it does not mean the product has no hardware dependencies) |
| `dataRights` (charts, weather, AIS-derived data, position-derived services) | `NOT_GRANTED` / `PARTIAL` / `GRANTED_PER_TERRITORY` |
| `compliance` (CE/RED/LVD/EMC/GPSR/CRA/radio) | `NOT_STARTED` / `ASSESSMENT_PENDING` / `CONFORMITY_EVIDENCE_ON_FILE` |
| `pricing` | `HYPOTHESIS_UNAPPROVED` / `COSTED_UNAPPROVED` / `APPROVED` |
| `brandPublication` | `NOT_GRANTED` / `INTERNAL_ONLY_APPROVED` / `PUBLICATION_APPROVED` |
| `availability` | `NOT_FOR_SALE` / `PREORDER_NOT_AUTHORISED` / `FOR_SALE` |

The honest values at MC-06:

| Product | engineering | hardware | compliance | dataRights |
| --- | --- | --- | --- | --- |
| PILOT | `NOT_VERIFIED` | `NOT_SELECTED` | `NOT_STARTED` | `NOT_GRANTED` |
| SENSE | `PARTIALLY_VERIFIED` (parser-level unit tests only, see §15) | `NOT_SELECTED` | `NOT_STARTED` | `NOT_GRANTED` |
| WATCH | `NOT_VERIFIED` | `NOT_SELECTED` | `NOT_STARTED` | `NOT_GRANTED` |

The honest values for the batch-03 families at MC-07:

| Product | engineering | hardware | compliance | dataRights |
| --- | --- | --- | --- | --- |
| DISPLAY | `NOT_VERIFIED` | `NOT_SELECTED` | `NOT_STARTED` | `NOT_GRANTED` |
| WEATHER | `NOT_VERIFIED` | `NOT_APPLICABLE_SOFTWARE_PRODUCT` | `NOT_STARTED` | `NOT_GRANTED` |
| FLEET | `NOT_VERIFIED` | `NOT_APPLICABLE_SOFTWARE_PRODUCT` | `NOT_STARTED` | `NOT_GRANTED` |

`definition`, `licensing`, `pricing`, `brandPublication` and `availability` are the same for all nine
products: `COMPLETE_TARGET_SPECIFICATION`, `NOT_CLEARED`, `HYPOTHESIS_UNAPPROVED`, `NOT_GRANTED`,
`NOT_FOR_SALE`. `NOT_APPLICABLE_SOFTWARE_PRODUCT` means the product has no hardware of its own to select;
it still depends on customer devices, connected equipment and licensed data.

## 5. Evidence classes — every claim is labelled

No field may be filled with an unlabelled assertion. Every field block carries one or more of:

| Class | Meaning |
| --- | --- |
| `VERIFIED_REPO` | verifiable in this repository's files (cite the path) |
| `VERIFIED_EXTERNAL` | verifiable at a cited public source with a check date |
| `ASSUMPTION` | an explicit planning assumption, stated as such, not evidence |
| `HYPOTHESIS` | a commercial/price assumption awaiting approval |
| `OPEN` | fact not yet established; the intended customer experience is still specified |
| `BLOCKED` | an external condition (license, certificate, quote, measurement) prevents closure |

`OPEN` and `BLOCKED` are legitimate field values. `TBD` is not: it is prohibited everywhere (the validator
rejects it).

## 6. Canonical 24 fields

Identical numbering and keys in all nine dossiers, in the three JSON contracts and in the validator.

| # | Key | Field |
| --- | --- | --- |
| 01 | `identity` | Identity: identity, category, family, positioning |
| 02 | `customerSegments` | Customer segments: primary/secondary personas and buying contexts |
| 03 | `customerProblems` | Customer problems solved and existing alternatives |
| 04 | `finalFunctionality` | Complete end-state customer capabilities and outcomes |
| 05 | `differentiation` | Why the product is relevant versus alternatives |
| 06 | `editions` | Edition structure and meaningful value difference |
| 07 | `includedItems` | Exact intended equipment, software and services included |
| 08 | `optionalAccessories` | Compatible optional products, hardware and services |
| 09 | `integration` | Ecosystem, protocols and compatibility requirements |
| 10 | `professionalInstallation` | When and how professional work is offered or required |
| 11 | `onboarding` | First-use experience, configuration and education |
| 12 | `licensingSubscriptions` | Ownership, licence duration, renewal and entitlements |
| 13 | `retailAndPartnerPricing` | Consumer prices, B2B structure, pricing status |
| 14 | `directAndOngoingCosts` | Production, data, fulfilment, support and operational costs |
| 15 | `channelEconomics` | Distributor/installer margin model and channel responsibilities |
| 16 | `competitorComparison` | Direct and indirect alternatives with verifiable evidence |
| 17 | `salesArguments` | Buyer benefits, differentiation and objection handling |
| 18 | `faq` | Practical pre-sales and post-sales questions and answers |
| 19 | `warrantyAndSupport` | Warranty, updates, returns, service and escalation |
| 20 | `bilingualProductPageCopy` | Complete Spanish and English customer-facing copy references |
| 21 | `crossSells` | Complementary products, bundles and upgrade paths |
| 22 | `retentionStrategy` | Renewal, support, customer success and product expansion |
| 23 | `successMetrics` | Commercial, activation, quality, retention and channel KPIs |
| 24 | `endToEndAcceptance` | Evidence and criteria that prove the complete product works |

Every field in every dossier uses this block, with every line filled:

```markdown
#### F01 — Identity
- **Definition.** <substantive answer, customer-understandable>
- **Evidence.** <VERIFIED_REPO path / VERIFIED_EXTERNAL url+date / ASSUMPTION / HYPOTHESIS / OPEN / BLOCKED>
- **Owner.** <function, not a person>
- **Blockers / dependencies.** <MC-02 blocker ids, or NONE>
- **Commercial readiness.** <one dimension + value from §4, e.g. `dataRights = NOT_GRANTED`>
```

The Definition line may describe intended final behaviour that is not built; when it does, the same block's
Evidence line must say so explicitly (`OPEN`/`ASSUMPTION`) and name the milestone that will evidence it.
Headings followed by "TBD", or fields that exist only as a heading, fail the milestone.

## 7. Claim and content rules binding on batch 01 (from MC-03)

These are absolute in every file of this milestone:

1. AIS is **receive-only**. It is not a transponder, does not transmit the vessel's position, is not a
   collision-avoidance system and does not replace watchkeeping. The AIS disclaimer in
   `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9 is used verbatim.
2. NAV is a **navigational aid**. It is not ECDIS, not ECDIS-class, not ECDIS-equivalent, does not include
   official ENC without a signed distribution right (blocker D-01), and does not replace official charts,
   required equipment or the skipper's responsibility.
3. **No NMEA 2000 certification or operational compatibility claim** may be made: NMEA 2000 is not
   implemented (stubs only), no NMEA licence/certification exists (H-04, DEC-05).
4. **Signal K is not a blanket compatibility guarantee**; compatibility is per device, per firmware, per
   direction, and is only ever claimed with recorded evidence (H-04, P-02).
5. **No public automatic steering-control path** is introduced or implied in any NAV/HUB/AIS document.
6. Prices in this milestone are **hypotheses awaiting approval**. They may appear in internal dossier tables
   labelled `HYPOTHESIS_UNAPPROVED`; they may not appear as final, approved, "from", launch or purchasable
   prices, and must not be written into any checkout, catalogue or live page. The addendum §17 relaxes
   nothing: it names the only additional figures batch 02 may state, all as hypotheses.
7. No availability, stock, lead time, certification, test, award, review, testimonial, customer count or
   supplier quote may be invented. Missing facts are `OPEN` or `BLOCKED`.
8. Charts/weather/tides are **licensed data entitlements**, not product features that the buyer necessarily
   receives. Every mention states the licence requirement.
9. Images: no photography, CGI, mock-up or stock substitute may be claimed as existing. All missing visual
   assets are `BLOCKED_ON_IMAGE_GENERATION`. Only MC-04 internal vectors may be referenced, as internal
   design inputs, never as published MAREA identity.
10. Every product page/copy draft carries the navigation disclaimer and, for AIS, the receive-only
    disclaimer, in the exact approved wording.

## 8. Commercial hypotheses carried into batch 01

These are the only price figures allowed in the batch-01 dossiers, and only as `HYPOTHESIS_UNAPPROVED`,
generally VAT-inclusive retail where stated:

| Product | Edition | Hypothesis |
| --- | --- | ---: |
| MAREA NAV | Essential | EUR 99 / year |
| MAREA NAV | Pro | EUR 149 / year |
| MAREA HUB | Standard | EUR 349 |
| MAREA HUB | Pro | EUR 499 |
| MAREA AIS | Receiver | EUR 249 |
| MAREA AIS | Connected | EUR 399 |

No BOM, supplier quotation, certification cost, channel agreement, chart-licence price, weather-provider
price or connectivity quote exists. Any contribution-margin work must therefore be a **framework with named
inputs**, never a computed margin presented as fact.

Bundle prices are **not decided in this milestone** (bundle governance is MC-08). A dossier may quote a bundle
minimum-price hypothesis from `COMMERCIAL-PORTFOLIO.md` (`MAREA START` EUR 499, `MAREA CRUISE` EUR 1,399,
`MAREA SAIL` EUR 1,990, `MAREA PROTECT` EUR 399 plus subscription, `MAREA COMPLETE` EUR 3,490) only as
ecosystem context, always labelled `HYPOTHESIS_UNAPPROVED`, never as a bundle offer, never as an explicit sum
of the edition hypotheses, and never in the customer copy files. The six batch-01 edition figures, the
batch-02 figures of §17 and the batch-03 hypotheses of §26 remain the only product prices any dossier may
state.

## 9. MC-02 blocker traceability (batch 01)

Every dossier references the applicable ids from
`docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`:

- NAV: `D-01`, `D-02`, `D-03`, `D-04`, `D-05`, `D-06`, `D-08`, `D-10`, `P-01`, `P-10`, `L-01`–`L-03`, `X-01`, `X-05`.
- HUB: `H-04`, `H-05`, `H-06`, `H-07`, `H-13`, `H-02` (no control-plane reuse), `P-02`, `P-10`, `S-06`, `X-01`, `X-05`.
- AIS: `H-08`, `H-05`, `H-06`, `D-09`, `S-01`, `P-03`, `P-10`, `X-01`, `X-05`.

## 10. Deliverable map for batch 01 (MC-05)

| Id | File | Owner (MC-05 run) |
| --- | --- | --- |
| D1 | `MAREA-NAV-COMMERCIAL-SPEC.md` | NAV Product Director |
| D2 | `MAREA-HUB-COMMERCIAL-SPEC.md` | HUB Product Director |
| D3 | `MAREA-AIS-COMMERCIAL-SPEC.md` | AIS Product Director |
| D4 | `PRODUCT-EDITIONS-NAV-HUB-AIS.md` | Lead (CPO) |
| D5 | `PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` | HUB Product Director (integration owner) |
| D6 | `PRODUCT-PRICING-AND-CHANNEL-MODEL.md` | Commercial Strategy and Pricing Specialist |
| D7 | `CUSTOMER-JOURNEYS-NAV-HUB-AIS.md` | NAV Product Director (journey owner) |
| D8 | `copy/nav.es.md`, `copy/nav.en.md`, `copy/hub.es.md`, `copy/hub.en.md`, `copy/ais.es.md`, `copy/ais.en.md` | UX, Content and Localization Specialist |
| D9 | `PRODUCT-ASSET-REQUIREMENTS.md` | AIS Product Director (asset-requirements owner for b01) |
| D10 | `product-definitions.batch-01.json` | Product Governance and QA Engineer |
| D11 | `scripts/check-marea-products.mjs`, `scripts/check-marea-products.test.mjs` | Product Governance and QA Engineer |
| D12 | `MC-05-DELIVERY.md` | Lead |
| D13 | `MC-05-REVIEW.md` | Independent Product Reviewer |

---

# MC-06 ADDENDUM — PILOT, SENSE and WATCH (binding)

## 12. Scope and new canonical identities

MC-06 defines the three remaining hardware-bearing families to the same standard as batch 01 and extends the
machine-readable contract without rewriting it. Additional canonical identities:

| Product | Editions / SKUs | Structural status |
| --- | --- | --- |
| PILOT | `PILOT-COASTAL` MAREA PILOT Coastal; `PILOT-SAIL` MAREA PILOT Sail; `PILOT-PRO` MAREA PILOT Pro | Coastal and Sail are editions; **Pro is a vessel-specific installation package, not a retail SKU** (§18, D-008) |
| SENSE | Individual modules `SENSE-WIND`, `SENSE-POWER`, `SENSE-BILGE`, `SENSE-TANKS`, `SENSE-ENV`; kits `SENSE-ESSENTIALS`, `SENSE-SAIL`, `SENSE-SYSTEMS` | Modules are separately purchasable SKU units; kits are preconfigured bundles of modules |
| WATCH | `WATCH-CORE` MAREA WATCH Core; `WATCH-PLUS` MAREA WATCH Plus | Hardware plus a recurring subscription entitlement (§18) |

Display names: `MAREA PILOT Coastal`, `MAREA PILOT Sail`, `MAREA PILOT Pro`, `MAREA SENSE Wind`,
`MAREA SENSE Power`, `MAREA SENSE Bilge`, `MAREA SENSE Tanks`, `MAREA SENSE Environment`,
`MAREA SENSE Essentials`, `MAREA SENSE Sail`, `MAREA SENSE Systems`, `MAREA WATCH Core`, `MAREA WATCH Plus`.
No generation label, no size, no version number, no certification suffix may be attached.

## 13. The six dossiers and the two contracts

The 24 fields and the field block of §6 are unchanged. Batch 02 adds three dossiers and one contract:

| Id | File | Master-Prompt owner |
| --- | --- | --- |
| D1 | `MAREA-PILOT-COMMERCIAL-SPEC.md` | PILOT Product Director (+ safety annex by Safety Engineer) |
| D2 | `MAREA-SENSE-COMMERCIAL-SPEC.md` | SENSE Product Director |
| D3 | `MAREA-WATCH-COMMERCIAL-SPEC.md` | WATCH Product Director |
| D4 | `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` | Lead (CPO) with Commercial/UX specialist |
| D5 | `PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` | Commercial/UX specialist with PILOT integration owner |
| D6 | `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` | Commercial/UX specialist |
| D7 | `CUSTOMER-JOURNEYS-PILOT-SENSE-WATCH.md` | Commercial/UX specialist |
| D8 | `copy/pilot.es.md`, `copy/pilot.en.md`, `copy/sense.es.md`, `copy/sense.en.md`, `copy/watch.es.md`, `copy/watch.en.md` | Product directors + Commercial/UX specialist |
| D9 | `PRODUCT-ASSET-REQUIREMENTS-BATCH-02.md` | Commercial/UX specialist |
| D10 | `PILOT-SAFETY-CASE-OUTLINE.md`, `SENSE-MEASUREMENT-AND-CALIBRATION-PLAN.md`, `WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md` | Safety Engineer / SENSE Product Director / WATCH Product Director |
| D11 | `product-definitions.batch-02.json` | Product Contract and QA Engineer |
| D12 | `scripts/check-marea-products.mjs`, `.test.mjs` (extended, not replaced) | Product Contract and QA Engineer |
| D13 | `MC-06-DELIVERY.md` | Lead |
| D14 | `MC-06-REVIEW.md` | Independent Reviewer |
| D15 | `docs/marea/execution/MASTER-PROMPT-REGISTRY.md`, `DECISION-LOG.md` | Lead |

The D-numbering repeats the Master Prompt deliverable numbering: D1 is the PILOT specification, D2 SENSE,
D3 WATCH, and so on. It never renumbers the batch-01 files.

## 14. Lifecycle and edition verdicts

All three products are `DEFINED`; the lifecycle enum of §3 is not extended. Edition-level verdicts use this
vocabulary only (batch-02 addition, decided as D-008):

| Verdict | Meaning for a batch-02 edition |
| --- | --- |
| `DEFINED` | Customer-facing configuration is fully specified and commercially coherent; still not sellable |
| `CONDITIONAL` | The edition's differentiation depends on unverified capability (e.g. PILOT wind mode, WATCH Plus expansion); it must state the condition that closes it |
| `INSTALLATION_PACKAGE` | Vessel-specific quoted work that cannot be a fixed retail SKU (PILOT Pro only) |

`RELEASED`, `FOR_SALE`, `APPROVED`, `PUBLISHABLE` are prohibited for every batch-02 edition. `publicationConditional`
is `true` for every edition.

## 15. Product-specific evidence states (canonical strings)

MC-02 terminology is used unchanged. The following canonical states must appear where the subject is discussed
and must not be upgraded:

| State | Value | Meaning |
| --- | --- | --- |
| `PILOT_SAFETY_GATE` | `BLOCKED` | H-01, P-04: no bench evidence, no sea trial, no independent verification, no conformity assessment |
| `PILOT_PHYSICAL_ESTOP_EVIDENCE` | `NOT_FOUND` | H-10: E-stop concept is GPIO-level; no physical evidence |
| `PILOT_MOTOR_ISOLATION_EVIDENCE` | `NOT_FOUND` | H-03, H-10: no independent motor-power isolation evidence |
| `PILOT_RUDDER_FEEDBACK_EVIDENCE` | `NOT_FOUND` | H-01: no rudder/steering feedback |
| `PILOT_SEA_TRIALS` | `NOT_PERFORMED` | no supervised sea trial exists in any repository |
| `SENSE_MEASUREMENT_ACCURACY` | `NOT_MEASURED` | P-05: no calibration or field accuracy evidence |
| `SENSE_INGRESS_PROTECTION` | `NOT_VERIFIED` | H-05: no environmental test evidence; no IP rating may be stated |
| `SENSE_NMEA2000` | `NOT_IMPLEMENTED` | H-04: stubs only; no licence or certification |
| `WATCH_INGESTION` | `NOT_VERIFIED` | P-06: no production telemetry ingestion |
| `WATCH_NOTIFICATION_PIPELINE` | `NOT_FOUND` | P-06: no alert delivery pipeline |
| `WATCH_DEVICE_IDENTITY` | `NOT_FOUND` | P-06, X-07: no provisioning, ownership proof or revocation |
| `WATCH_SUBSCRIPTION_SERVICE` | `NOT_FOUND` | P-06: no billing/entitlement service |
| `WATCH_CONNECTIVITY_CONTRACT` | `NOT_FOUND` | H-12: no SIM/roaming or connectivity terms |

SENSE engineering may state `PARTIALLY_VERIFIED` **only** with the scope "executed unit tests for NMEA 0183 wind
parsing and IMU fusion exist; no sensor hardware, calibration or field accuracy evidence exists". A unit-tested
parser is never evidence of sensor accuracy.

## 16. Claim rules for batch 02

Rules 1–10 of §7 apply to every file, replaced or extended as follows:

1. **No steering-control path exists outside the PILOT control boundary.** No NAV, HUB, WATCH, SENSE or website
   document may introduce, imply or plan a remote or cloud-to-actuator steering command. Mode engagement stays
   local and inside the independently validated PILOT boundary.
2. **PILOT is supervised.** The verbatim PILOT disclaimer of `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9 is required
   in the PILOT dossier and in both PILOT copy files, in the product's language. The navigation disclaimer is
   also required in PILOT because the control head displays heading and route data.
3. **PILOT has no autonomy, collision-avoidance, unattended-watch or certification claim**, and no claim that
   software watchdogs replace physical safeguards, that unit tests prove vessel safety, or that an AI agent may
   steer a vessel.
4. **SENSE accuracy is bounded.** Every measurement statement names the measurement, units, intended range, the
   calibration requirement and the evidence state. No numerical accuracy figure, resolution, IP rating or
   certified-alarm claim may appear before measurement exists. Uncalibrated or implausible values are shown as
   invalid, not as data. Internal validation targets are the one narrowly scoped exception: they may appear only
   in the SENSE dossier acceptance criteria and in `SENSE-MEASUREMENT-AND-CALIBRATION-PLAN.md`, always marked
   `PROPOSED`, always as acceptance criteria for future engineering validation, and never in customer copy or as
   a statement of achieved accuracy.
5. **WATCH is conditional awareness.** Remote alerting depends on power, network coverage and notification
   provider delivery. No immediate-delivery promise, no guaranteed theft prevention, no certified distress
   service, no remote helm function. Provider acceptance is not delivery and never proves a human saw an alert.
6. **SENSE alone does not deliver remote alerts**; remote delivery requires WATCH plus connectivity plus an active
   subscription. A SENSE module has no connectivity of its own.
7. **Subscription isolation.** A commercial entitlement may never disable local steering behaviour, valid local
   sensing, local alarms or other safety-relevant independent functions when payment fails or a subscription
   expires. This is a design requirement of the specification, not a tested behaviour.
8. Additional product-specific limitation statements (INTERNAL DRAFT wording pending claims-register approval;
   not claimed as approved policy text) must appear in the batch-02 copy files:

   - SENSE — ES: «Las lecturas solo son válidas dentro del rango y la calibración verificados de cada módulo. Un
     valor sin calibrar, caducado o fuera de rango no se presenta como una medición fiable.»
     EN: "Readings are only valid within each module's verified range and calibration. An uncalibrated, stale or
     out-of-range value is not presented as a reliable measurement."
   - WATCH — ES: «Los avisos remotos dependen de la alimentación, de la cobertura de red y de la entrega por parte
     del proveedor de notificaciones. No se garantiza la recepción inmediata y no constituyen un servicio de
     socorro certificado.»
     EN: "Remote alerts depend on power, network coverage and delivery by the notification provider. Immediate
     receipt is not guaranteed and they are not a certified distress service."

9. **Navigation disclaimer** is required in the SENSE and WATCH dossiers and in all four SENSE/WATCH copy files,
   because both surfaces present position, depth or instrument data. The `aisReceiveOnly` disclaimer is required
   wherever AIS targets are displayed (WATCH position/traffic views, PILOT traffic context).
10. Every batch-02 document is `INTERNAL ONLY`, `NOT PUBLISHED`, `NOT FOR SALE`, with prices labelled
    `HYPOTHESIS_UNAPPROVED`.

## 17. Price hypotheses allowed in batch 02

Only these figures may appear, only as `HYPOTHESIS_UNAPPROVED`, VAT-inclusive consumer retail where stated:

| Product | Edition / unit | Hypothesis | Binding qualification |
| --- | --- | --- | ---: |
| PILOT | Coastal | from EUR 1,290 | **Not** an all-inclusive quotation. It is a starting-price hypothesis only; an inclusive vessel-specific quotation is required and must name every included and excluded item (D-009) |
| SENSE | individual module, entry configuration | from EUR 99 | Cheapest single-module starting hypothesis only; other module prices are not established |
| WATCH | Core hardware | EUR 299 | Hardware purchase hypothesis; connectivity and any SIM/data cost not included |
| WATCH | Core monitoring subscription | from EUR 9.90 / month | Subscription hypothesis; what it includes (connectivity cap, device count, user count, retention) is `OPEN` |

Prohibited: a price for `PILOT-SAIL`, `PILOT-PRO`, any SENSE kit, `WATCH-PLUS`, any data plan, any installation
labour, any extended warranty, any roaming package. Those are `OPEN` and require costed evidence. No margin,
recurring gross margin, BOM or channel percentage may be computed and presented as fact; scenario arithmetic
with named symbolic inputs is allowed in D6 only.

## 18. Edition authority decisions (D-008, D-009)

- **D-008 — PILOT Pro is an installation package, not a retail SKU.** A configuration that can only be quoted
  after a vessel survey must not be modelled as a fixed-price purchasable edition. `PILOT-PRO` therefore carries
  verdict `INSTALLATION_PACKAGE`, no price, and is represented in the contract as a quoted service scope.
  `PILOT-COASTAL` and `PILOT-SAIL` remain editions. `PILOT-SAIL` is `CONDITIONAL` on verified wind-angle steering
  (H-01) and must state that condition.
- **D-009 — the PILOT starting price is not a quotation.** `from EUR 1,290` may only describe the minimum usable
  Coastal configuration; the commercial model is quotation-based. No document may present it as a turnkey price
  or sum it into a bundle. D6 must recommend the quotation model formally.
- **SENSE structure.** Five individual module SKUs plus three kits. A kit never invents a capability absent from
  its modules. `SENSE-SAIL` and `SENSE-SYSTEMS` are `CONDITIONAL`; `SENSE-ESSENTIALS` is `DEFINED`.
- **WATCH structure.** `WATCH-CORE` is `DEFINED`; `WATCH-PLUS` is `CONDITIONAL` until the additional benefits are
  validated and costed. Every WATCH edition carries a subscription entitlement; every other edition carries
  `subscriptionHypothesis: null`.

## 19. Cross-product authority matrix (binding rules)

| Relationship | Permitted | Prohibited |
| --- | --- | --- |
| PILOT ↔ NAV | NAV may supply route/waypoint information to a future authorised local integration once verified | NAV may never command the actuator; route data is an input, not authority |
| PILOT ↔ HUB | HUB may publish bounded instrument/nav data and read PILOT status | HUB is not the actuator controller; no unreviewed data path enables helm control |
| PILOT ↔ WATCH | WATCH may display authorised read-only PILOT status | No remote engage/disengage, no heading adjustment, no steering command |
| PILOT ↔ SENSE | Validated, calibrated measurements may be consumed after safety qualification | No generic sensor module is automatically acceptable as a steering input |
| SENSE ↔ HUB | HUB receives and publishes measurements with source, units, quality and freshness | No invented protocol compatibility |
| SENSE ↔ WATCH | WATCH consumes approved readings and sends remote notifications | SENSE never claims connectivity or push by itself |
| WATCH ↔ FLEET | FLEET may consume authorised read-only telemetry under a future contract | WATCH is not a multi-tenant fleet platform by default |
| Any ↔ Subscription | Local safety-relevant functions keep working without an active subscription | No entitlement gates local steering, local alarms or valid local sensing |

Every compatibility statement in D5 must be `SUPPORTED` only with recorded evidence, `PLANNED` with a named
milestone, `CONDITIONAL` with the exact condition, or `UNKNOWN`. `UNKNOWN` is never `SUPPORTED`.

## 20. WATCH notification state model (canonical)

This single vocabulary is used in the WATCH dossier, the alert-delivery contract, the copy and the JS contract.
No duplicate enum may be introduced:

`EVENT_OBSERVED` → `RULE_MATCHED` → `ALERT_CREATED` → `QUEUED` → `PROVIDER_ACCEPTED` → `DELIVERED_WHEN_CONFIRMED`
→ `ACKNOWLEDGED`; terminal/exceptional states `EXPIRED`, `FAILED`, `DELIVERY_UNKNOWN`.

Timestamps are distinct and never conflated: `eventTime` (device), `deviceClockTime`, `serverReceiptTime`,
`alertCreationTime`, `notificationHandoffTime`, `providerAcceptanceTime`, `deliveryConfirmationTime`,
`userAcknowledgementTime`. Provider acceptance never sets `DELIVERED_WHEN_CONFIRMED`. An event observed while the
device is offline may reach the server only after connectivity resumes; the product must show the last-known-good
value with its freshness and must never present a stale value as current.

## 21. Cross-product compatibility table columns (D5)

Exactly these columns, in this order, for every desired integration:
`Integration | Required product | Required edition | Required accessory | Required subscription | Data direction |
Local/cloud boundary | Safety boundary | Current evidence | Release gate`.

## 22. Journey, asset and copy conventions for batch 02

- Journeys use the 17 stages of MC-05 in this order and wording: Discovery; Product understanding; Compatibility;
  Editions; Price comprehension; Purchase or quote; Fulfilment; Installation; Activation; First use; Regular use;
  Updates; Support; Upgrade; Renewal or cancellation; Ownership transfer; End-of-life. Each stage records: user
  action, touchpoint, expected result, required information, failure mode, recovery, commercial opportunity,
  trust/safety requirement, acceptance evidence.
- Assets use the ten-per-product MC-05 model with fixed ids: `<FAMILY>-HERO-01`, `-USE-02`, `-OVR-03`, `-EDN-04`,
  `-ECO-05`, `-INS-06`, `-MOB-07`, `-TMB-08`, `-OG-09`, `-TEC-10` for `PILOT`, `SENSE`, `WATCH` (30 total). Every
  asset records the MC-05 field list and is `CONCEPT` — never a real-product visual and never evidence that a
  device exists. The generation status follows the D9 coverage matrix: the four scene requirements per family
  (`HERO-01`, `USE-02`, `INS-06`, `TMB-08`) stay `BLOCKED_ON_IMAGE_GENERATION` while X-03 is open, while the
  MC-04 vector/brief reuse and authored-new records keep the status `CONCEPT`. No asset may claim a manufactured
  device.
- Copy files use the exact 24 numbered headings of `copy/nav.es.md` and `copy/nav.en.md`, followed by an
  approved-disclaimer section. ES is Spain Spanish; EN is natural international English. Product names never
  translate. No prices, no purchase CTA, no stock, no reviews, no certification, no availability claim.

## 23. What MC-06 must not do

No change to `src/`, `public/`, checkout, prices, stock, payment configuration, deployment workflow,
`OPEN-MARINE`, the brand identity adoption state or the trademark position. No merge, no deploy, no publication,
no purchase flow, no image generation, no chargeable API call, no hardware, radio or steering test. Documents
here do not make any SKU orderable. Batch-02 machine-readable product data lives only in
`product-definitions.batch-02.json` and is never a commerce data model.

---

# MC-07 ADDENDUM — DISPLAY, WEATHER and FLEET (binding)

MC-07 closes the product-definition programme: after this batch all nine families have a complete commercial
definition, one lifecycle, one readiness model, one evidence vocabulary and one machine-contract family. The
addendum **adds no competing governance system**; it extends the MC-05 contract and the MC-06 addendum to the
last three families and records the batch-03 claim, price, edition and validation rules that the validator and
the independent reviewer enforce.

## 24. Batch-03 scope and deliverables

| ID | Deliverable | Owner function |
| --- | --- | --- |
| D1 | `MAREA-DISPLAY-COMMERCIAL-SPEC.md` — 24-field dossier | DISPLAY Product Director |
| D2 | `MAREA-WEATHER-COMMERCIAL-SPEC.md` — 24-field dossier | WEATHER Product Director / Marine Data Licensing |
| D3 | `MAREA-FLEET-COMMERCIAL-SPEC.md` — 24-field dossier | FLEET Product Director |
| D4 | `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` | Commercial, UX and Localization Specialist |
| D5 | `PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` | Security and Multi-Tenant Architect |
| D6 | `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` | FLEET Product Director / B2B strategist |
| D7 | `CUSTOMER-JOURNEYS-DISPLAY-WEATHER-FLEET.md` | Commercial, UX and Localization Specialist |
| D8 | `copy/{display,weather,fleet}.{es,en}.md` — six files, 24 sections each | Product Directors + copywriter |
| D9 | `PRODUCT-ASSET-REQUIREMENTS-BATCH-03.md` — 30 requirements | Chief Product Officer |
| D10 | `DISPLAY-HARDWARE-AND-INTERACTION-REQUIREMENTS.md`, `WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md`, `FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md` | DISPLAY Director; WEATHER/Data Director; Security Architect |
| D11 | `product-definitions.batch-03.json` | Product Contract and Validation Engineer |
| D12 | `MAREA-NINE-PRODUCT-ECOSYSTEM.md` | Chief Product Officer |
| D13 | `scripts/check-marea-products.mjs` + `.test.mjs` extended to nine products | Product Contract and Validation Engineer |
| D14 | `MC-07-DELIVERY.md` | Lead |
| D15 | `MC-07-REVIEW.md` | Independent Reviewer |
| D16 | This README, `MASTER-PROMPT-REGISTRY.md` and `DECISION-LOG.md` updates | Lead |

## 25. Claim rules for batch 03

Rules 1–10 of §7 and rules 1–10 of §16 continue to apply to every file of every batch. For DISPLAY, WEATHER and
FLEET the following additional rules are binding:

1. **DISPLAY is a physical device, not a software feature.** No document may state a measured screen size, a
   resolution, a brightness figure, a contrast ratio, an ingress-protection rating, a temperature range, a
   sunlight-readability result or a glove/wet-touch result. Every physical value is a `REQUIRED_TARGET`,
   `NOT_ESTABLISHED` or `SIZE_NOT_FROZEN`; MC-04's browser contrast evidence is design evidence only and is
   never proof of cockpit performance.
2. **DISPLAY has no PILOT authority.** It may display read-only PILOT status and alarms at most. No engagement,
   no course change, no motor command and no remote or web-mediated pilot path may be described, planned or
   implied.
3. **DISPLAY base software is bounded.** The device's included software never includes unlimited charts, a
   perpetual NAV Pro entitlement, AIS receiver hardware, a HUB, a steering actuator, every WEATHER dataset or
   every third-party adapter. Charts (D-01), WEATHER (D-04/D-07), HUB, AIS hardware, adapters and installation are
   separate or explicitly excluded.
4. **WEATHER never fabricates certainty.** Forecast, observation, historical dataset, derived calculation,
   user-entered value and unknown/unavailable data are always distinguished. Every displayed variable carries
   source, units, valid timestamp, data type, age, method where applicable, licence and limitations. No accuracy
   percentage, no "official warning authority", no exclusivity and no meteorological guarantee may be claimed.
   A stale or expired forecast is never rendered as current, and an expired entitlement never produces a
   fabricated forecast.
5. **WEATHER rights are provider-specific and independently tracked.** No free tier is used commercially; no
   redistribution, caching or offline right is assumed from API access; where providers disagree no fictional
   consensus forecast is presented. The rights annex is the authority for each variable.
6. **NAV/WEATHER never bill twice.** One account, one entitlement ledger, prorated upgrade credit (D-013).
7. **FLEET is a professional multi-tenant SaaS.** No document may claim a deployed service, a security
   certification, a measured uptime, a guaranteed SLA, unlimited vessels/users/storage/API or a customer
   reference. Tenant isolation, role scoping, audit, export and deletion are design requirements, not verified
   behaviour; `NO_SLA_ESTABLISHED` remains the SLA statement.
8. **FLEET has no vessel-control path.** It consumes authorised read-only telemetry at most: no steering, no
   throttle, no motor, no bus command and no remote helm. A disconnected vessel is never shown as online, and a
   notification accepted by a provider is never presented as delivered to, or read by, a person.
9. **FLEET customer data is governed.** No customer production data may be used; controller/processor roles are
   assessed per data flow; external-installer and support access are scoped, time-bound and audited.
10. **The nine market distinctions are engineering requirements** (D-015): NAV≠DISPLAY, WEATHER≠NAV,
    FLEET SaaS≠FLEET package, WATCH≠FLEET, DISPLAY≠tablet, SENSE≠WATCH, HUB≠sensor, AIS=receive-only and
    PILOT=supervised local steering.

## 26. Price hypotheses allowed in batch 03

Only these figures may appear, only as `HYPOTHESIS_UNAPPROVED` (or `NOT_ESTABLISHED` where stated), and only in
internal dossiers, the pricing document and the machine contract — never in customer copy, a checkout, a
catalogue or a public page:

| Product | Edition / unit | Hypothesis | Binding qualification |
| --- | --- | --- | ---: |
| DISPLAY | `DISPLAY-7` | from EUR 699 (one-off, VAT-inclusive consumer retail hypothesis) | Starting price for the minimum display package only; `SIZE_NOT_FROZEN`; installation separately quoted; charts, NAV, WEATHER, HUB, AIS and extra mounts never included |
| DISPLAY | `DISPLAY-LARGE-CONDITIONAL` | none — `NOT_ESTABLISHED` | No price, no measured size and no publication until hardware selection and cost evidence exist |
| WEATHER | `WEATHER-STANDARD` | from EUR 49 / year | Consumer subscription hypothesis; coverage, horizon and variables limited to licensed providers; VAT basis `OPEN` |
| WEATHER | `WEATHER-PRO` | EUR 89 / year | Hypothesis only; premium features are conditional on provider entitlements; no dataset promised |
| FLEET | `FLEET-START` | from EUR 49 / vessel / month, VAT excluded | Starting hypothesis; organisation fee, seats, onboarding, limits and telemetry are stated explicitly; no "unlimited" |
| FLEET | `FLEET-BUSINESS` | EUR 79 / vessel / month, VAT excluded | Hypothesis only; richer permissions/workflows/reporting/integrations; volume terms quoted |
| FLEET | `FLEET-ENTERPRISE` | none — `NOT_ESTABLISHED`, `CONTRACTED_TIER` | Negotiated contract, not a checkout SKU; no invented SLA; no unlimited scope |

Prohibited for batch 03: any price for `DISPLAY-LARGE-CONDITIONAL` or `FLEET-ENTERPRISE`; any price presented as
approved, final, launch or purchasable; any bundle sum presented as a product price; any competitor figure shown
without brand, product, currency, tax basis, official URL and retrieval date; any BOM, margin or channel
percentage presented as fact.

## 27. Edition authority decisions (batch 03)

The full edition structure and customer-outcome differentiation live in `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`.
The binding rules recorded as decisions D-012 to D-016 are:

- **D-012 — the batch-03 edition set is frozen at seven objects:** `DISPLAY-7`, `DISPLAY-LARGE-CONDITIONAL`,
  `WEATHER-STANDARD`, `WEATHER-PRO`, `FLEET-START`, `FLEET-BUSINESS`, `FLEET-ENTERPRISE`. No eighth object and
  no generation label, measured size or version suffix may be added. `DISPLAY-7` is a conditional starting
  hypothesis (`SIZE_NOT_FROZEN`); `DISPLAY-LARGE-CONDITIONAL` may be withdrawn without commercial consequence if
  hardware selection does not support a second size class, and is never published with a measured size or a price.
- **D-013 — WEATHER is one product, one entitlement ledger and two consumer editions.** NAV Pro may include
  WEATHER Standard-equivalent read access only where provider rights allow; upgrading applies a prorated credit;
  the same entitlement is never billed twice; user-owned saved locations and preferences survive cancellation
  with a defined read-only export window (hypothesis 30 days, legal review).
- **D-014 — FLEET pricing is per vessel per month, VAT excluded,** and `FLEET-ENTERPRISE` is a `CONTRACTED_TIER`
  with no standard price, no invented SLA and no unlimited terms; any SLA exists only as a contracted commitment
  with measurement evidence, otherwise `NO_SLA_ESTABLISHED`.
- **D-015 — safety, security and data portability are never edition features.** Tenant isolation, role scoping,
  audit, revocation, export/deletion, stale/lost-state honesty, subscription isolation and device-ownership
  transfer are in every edition of every batch-03 product. The nine market distinctions of §25 rule 10 are
  engineering requirements, pre-empted at the point of price, edition choice and quotation.
- **D-016 — one governance system across three batches.** The edition-level register codes (`DSP`, `WX`, `FL`)
  are the editions document's authority and map to — never replace — the dossiers' capability codes; the batch-03
  machine contract, validator, journeys, asset register and copy conventions follow the MC-05/MC-06 patterns
  without a second vocabulary.

## 28. Additional batch-03 limitation statements (draft wording)

These are INTERNAL DRAFT wording, pending claims-register approval. They must appear in the product's language
in the dossier disclaimers section and in both copy files of that product. They do not replace the approved
disclaimers of `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9, which are quoted verbatim separately.

- **DISPLAY** — ES: «La pantalla es un concepto interno: no existe una unidad fabricada ni se han verificado
  tamaño, brillo, legibilidad solar ni resistencia ambiental. Las cartas y los servicios de datos se licencian
  por separado.» EN: "The display is an internal concept: no manufactured unit exists and its size, brightness,
  sunlight legibility and environmental resistance have not been verified. Charts and data services are licensed
  separately."
- **WEATHER** — ES: «La cobertura depende de proveedores con licencia y no se garantiza la exactitud de la
  previsión. Una previsión caducada o no disponible nunca se presenta como actual.» EN: "Coverage depends on
  licensed providers and forecast accuracy is not guaranteed. A stale or unavailable forecast is never presented
  as current."
- **FLEET** — ES: «MAREA FLEET es un diseño interno: no existe un servicio multiempresa desplegado ni una
  certificación de seguridad, y no se garantiza ningún nivel de servicio. La telemetría es de solo lectura y nunca
  permite gobernar la embarcación.» EN: "MAREA FLEET is an internal design: no deployed multi-tenant service and
  no security certification exist, and no service level is guaranteed. Telemetry is read-only and never allows
  steering the vessel."

## 29. Journey, asset and copy conventions for batch 03

- **Journeys** use the same 17 stages, in the same order and wording, as §22, and the same ten column labels:
  Stage; User action; Touchpoint; Expected result; Required information; Failure mode; Recovery; Commercial
  opportunity; Trust / safety requirement; Acceptance evidence. The mandatory product-specific journeys are
  DISPLAY (refit installation, without HUB, with HUB/NAV, loss of instrument data, power interruption, device
  replacement, entitlement expiration), WEATHER (standalone, NAV subscriber, model comparison, stale forecast,
  provider outage, licensed dataset removed, entitlement upgrade, renewal/cancellation, weather-window decision)
  and FLEET (organisation onboarding, vessel addition, ownership change, work order, external technician access,
  admin role change, user revocation, monitoring outage, cross-organisation access attempt, subscription upgrade,
  export/deletion request, contract termination).
- **Assets** use the ten-per-product model and the fixed ids `<FAMILY>-HERO-01`, `-USE-02`, `-OVR-03`, `-EDN-04`,
  `-ECO-05`, `-INS-06`, `-MOB-07`, `-TMB-08`, `-OG-09`, `-TEC-10` for `DISPLAY`, `WEATHER`, `FLEET` (30 total).
  Every asset records the MC-05 field list and is `CONCEPT`. The D9 coverage matrix is the authority for status:
  per family, four scene requirements (`HERO-01`, `USE-02`, `INS-06`, `TMB-08`) stay
  `BLOCKED_ON_IMAGE_GENERATION` while `X-03` is open, five requirements reuse MC-04 vectors/briefs as internal
  design input, and `MOB-07` is an authored specification with no rendered file. Reconciliation: 30 planned =
  12 blocked + 15 reused + 3 authored; 0 missing; 0 publicly approved; 0 verified real-product assets.
- **Copy** files use the exact 24 numbered headings of `copy/nav.es.md` and `copy/nav.en.md`, no `###`
  subheadings, a final unnumbered approved-disclaimer section, the internal status line, the approved
  navigation/instruments disclaimer (and the approved weather disclaimer in WEATHER), the batch-03 limitation
  statement of §28, and **no currency amount, purchase CTA, stock, review, certification or availability claim**.
  ES is Spain Spanish; EN is natural international English; product names never translate.

## 30. Batch-03 machine contract and validation

- **Contract.** `product-definitions.batch-03.json` reuses the batch-02 schema: the same meta keys plus
  `batch02Contract`; `publicationControls` with `published: false`, `forSale: false`, `purchaseCtaAllowed: false`,
  `pricesInCopyAllowed: false`, `pricesLabelled: "HYPOTHESIS_UNAPPROVED"`, `remoteSteeringAllowed: false`,
  `certificationClaimAllowed: false`; `lifecycleVocabulary`; `readinessDimensions`; `evidenceClasses`;
  `globalRestrictions`; `sourceDocuments`; `assets`; and `products[]` with the exact product-level keys of
  batch 02 plus product-specific invariant flags (DISPLAY `screenSizesFrozen`, `hardwareSelected`,
  `chartRightsGranted`, `pilotControlAuthority`; WEATHER `providerRightsGranted`, `forecastAccuracyClaimed`,
  `redistributionAllowed`, `offlineAllowed`, `navDoubleBillingAllowed`; FLEET `multiTenantProductionService`,
  `crossTenantAccessAllowed`, `remoteSteeringAllowed`, `slaEstablished`, `customerProductionDataUsed`,
  `securityCertificationClaimed`).
- **Validator.** `scripts/check-marea-products.mjs` is extended — never replaced — with a `BATCH_03` configuration
  inside the existing `BATCHES` array, so one validator covers nine products across three contracts. It validates
  the nine canonical family ids, exactly 24 fields per product, unique product and edition ids, lifecycle and
  readiness vocabularies, evidence classes, required blockers, ES/EN copy existence and 24-section parity,
  claim restrictions, asset-id integrity and the 30 = 12 + 15 + 3 reconciliation, edition completeness, pricing
  hypothesis status (including the allowed-amount set of §26), compatibility conditions, product dependencies,
  prohibition of any sale/approval/certification/publication claim, and consistent product-type definitions.
- **Negative tests.** `scripts/check-marea-products.test.mjs` retains every MC-05 and MC-06 mutation test and adds
  batch-03 adversarial mutations: DISPLAY (certified sunlight performance; invented IP rating; unrestricted chart
  licences; PILOT control authority; frozen screen size without evidence), WEATHER (free non-commercial API marked
  approved for a paid service; data rights `GRANTED` without evidence; redistribution/offline entitlement without
  matching permission; forecast-accuracy guarantee; double-billed NAV/WEATHER entitlement) and FLEET (cross-tenant
  access accepted without authorization; missing server-side tenant authorization requirement; permissive default
  role; remote steering; guaranteed SLA without evidence; unsupported security certification; missing
  privacy/data-export policy).
- **Honest limit.** The JSON validator proves that the specification **states** these requirements; it cannot prove
  that a future multi-tenant SaaS isolates organisations, that a display is readable in sunlight or that a forecast
  is accurate. Those require the future executable integration, security, hardware and forecast-evaluation evidence
  named in the D10 annexes.

## 31. Cross-product authority additions (batch 03)

| Relationship | Permitted | Prohibited |
| --- | --- | --- |
| DISPLAY ↔ PILOT | DISPLAY may show authorised read-only PILOT status and alarms | No engagement, no course change, no motor command, no remote or web-mediated pilot path |
| DISPLAY ↔ NAV | NAV software may be presented on the device once distribution rights and a validated integration exist | DISPLAY base software is not a NAV licence; charts are not included |
| DISPLAY ↔ WEATHER | Licensed forecast overlays may be presented with source and validity | No unlicensed dataset; no implied coverage |
| WEATHER ↔ NAV | Shared entitlement and authorised data consumption | No double billing; no meteorological guarantee; no redistribution |
| FLEET ↔ WATCH | Read-only telemetry, alerts and history within the customer's own organisation | No control; no stale vessel shown online; provider acceptance is not human delivery |
| FLEET ↔ HUB | Read-only installation/telemetry health where authorised | No bus command; no unreviewed control path |
| FLEET ↔ PILOT | At most read-only status after engineering and privacy review | No remote engagement, no heading change, no motor command from FLEET |
| FLEET ↔ NAV | Planned voyage information shared only with explicit customer permission | No automatic sharing of private route histories |
| Any batch-03 product ↔ Subscription | Local safety-relevant functions keep working without an active subscription | No entitlement gates local alarms, local sensing or local steering |

## 32. What MC-07 must not do

No change to `src/`, `public/`, checkout, prices, stock, payment configuration, deployment workflow,
`OPEN-MARINE`, the brand identity adoption state or the trademark position. No merge, no deploy, no publication,
no purchase flow, no image generation, no chargeable API call, no provider subscription, no hardware, radio or
steering test, no customer data. Documents here do not make any SKU orderable. Batch-03 machine-readable product
data lives only in `product-definitions.batch-03.json` and is never a commerce data model. MC-08 is not started
by this milestone.
