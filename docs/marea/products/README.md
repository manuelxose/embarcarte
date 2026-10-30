# MAREA — Product definitions: conventions and canonical contract (MC-05 / MC-06)

| Field | Value |
| --- | --- |
| Document ID | MC-05 / MC-06 PRODUCT-DEFINITION-CONVENTIONS |
| Milestone | MC-05 (Master Prompt 05/36) + MC-06 addendum (Master Prompt 06/36) |
| Date | 2026-10-30 |
| Owner | Lead (Chief Product Officer) |
| Status | INTERNAL. Not a shop catalogue, not a published product page, not a commercial offer |
| Scope | MC-05: NAV, HUB, AIS. MC-06: PILOT, SENSE, WATCH — six complete final-product commercial definitions, nine families governed |
| Binds | every file under `docs/marea/products/`, `scripts/check-marea-products.mjs`, `product-definitions.batch-01.json`, `product-definitions.batch-02.json` |

This document is the shared contract for the six product dossiers. Every specialist, the machine-readable
contract and the validator follow it. It does not replace the source documents; it fixes the vocabulary so
that independent writers cannot contradict each other. Sections 1–11 are the MC-05 contract and remain in
force unchanged for NAV, HUB and AIS. Sections 12–22 are the MC-06 addendum and bind PILOT, SENSE and WATCH.
Where the addendum and sections 1–11 differ, the addendum states the difference explicitly and the
difference is recorded as a decision in `docs/marea/execution/DECISION-LOG.md`.

## 1. Product status — the one thing that must never be misread

These products are **completely specified and not for sale**. All of the following are true at MC-06:

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

At MC-06 all six products are `DEFINED`. Any document that states another lifecycle state for a product is
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

`definition`, `licensing`, `pricing`, `brandPublication` and `availability` are the same for all six
products: `COMPLETE_TARGET_SPECIFICATION`, `NOT_CLEARED`, `HYPOTHESIS_UNAPPROVED`, `NOT_GRANTED`,
`NOT_FOR_SALE`.

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

Identical numbering and keys in all six dossiers, in the JSON contracts and in the validator.

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
of the edition hypotheses, and never in the customer copy files. The six batch-01 edition figures and the
batch-02 figures of §17 remain the only product prices any dossier may state.

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
