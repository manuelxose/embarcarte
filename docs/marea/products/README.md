# MAREA — Product definitions batch 1: conventions and canonical contract (MC-05)

| Field | Value |
| --- | --- |
| Document ID | MC-05 / PRODUCT-DEFINITION-CONVENTIONS |
| Milestone | MC-05 (Master Prompt 05/36) |
| Date | 2026-10-30 |
| Owner | Lead (Chief Product Officer) |
| Status | INTERNAL. Not a shop catalogue, not a published product page, not a commercial offer |
| Scope | MAREA NAV, MAREA HUB, MAREA AIS — complete final-product commercial definitions |
| Binds | every file under `docs/marea/products/`, `scripts/check-marea-products.mjs`, `product-definitions.batch-01.json` |

This document is the shared contract for the three product dossiers. Every specialist, the machine-readable
contract and the validator follow it. It does not replace the source documents; it fixes the vocabulary so
that three independent writers cannot contradict each other.

## 1. Product status — the one thing that must never be misread

These three products are **completely specified and not for sale**. All of the following are true at MC-05:

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

Rules: exactly one space between the master brand and the family (`MAREA NAV`, never `MAREA-NAV` or
`Marea Nav`); edition names follow the family; no new family, bundle or edition may be invented; MAREA is a
**proposed** brand and no `®`/`™` may be attached to it or to a family name.

Bundles (`MAREA START`, `MAREA CRUISE`) are referenced only as ecosystem context. Bundle contents,
pricing and publication are governed by MC-08 and are **not** decided here.

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

At MC-05 all three products are `DEFINED`. Any document that states another lifecycle state for a product
is wrong and fails the validator.

## 4. Readiness dimensions — never collapse into one flag

Each product and each edition carries these separate dimensions. A single `READY` flag is prohibited.

| Dimension | Allowed values |
| --- | --- |
| `definition` | `COMPLETE_TARGET_SPECIFICATION` |
| `engineering` | `NOT_VERIFIED` / `PARTIALLY_VERIFIED` / `ENGINEERING_VERIFIED` |
| `licensing` (software/source IP) | `NOT_CLEARED` / `CONDITIONAL` / `CLEARED` |
| `hardware` | `NOT_SELECTED` / `DESIGN_IN_PROGRESS` / `PROTOTYPED` / `CERTIFIED` / `NOT_APPLICABLE_SOFTWARE_PRODUCT` (value added in MC-05 for a software-only product such as MAREA NAV, which still depends on the customer's device, on connected equipment and on licensed data; it does not mean the product has no hardware dependencies) |
| `dataRights` (charts, weather, AIS-derived data) | `NOT_GRANTED` / `PARTIAL` / `GRANTED_PER_TERRITORY` |
| `compliance` (CE/RED/LVD/EMC/GPSR/CRA/radio) | `NOT_STARTED` / `ASSESSMENT_PENDING` / `CONFORMITY_EVIDENCE_ON_FILE` |
| `pricing` | `HYPOTHESIS_UNAPPROVED` / `COSTED_UNAPPROVED` / `APPROVED` |
| `brandPublication` | `NOT_GRANTED` / `INTERNAL_ONLY_APPROVED` / `PUBLICATION_APPROVED` |
| `availability` | `NOT_FOR_SALE` / `PREORDER_NOT_AUTHORISED` / `FOR_SALE` |

The honest values for all three products at MC-05 are: `definition=COMPLETE_TARGET_SPECIFICATION`,
`licensing=NOT_CLEARED`, `dataRights=NOT_GRANTED`, `brandPublication=NOT_GRANTED`,
`availability=NOT_FOR_SALE`, `pricing=HYPOTHESIS_UNAPPROVED`. `engineering`, `hardware` and `compliance`
vary per product and must cite the MC-02 blocker that proves the value.

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

Identical numbering and keys in all three dossiers, in the JSON contract and in the validator.

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

## 7. Claim and content rules (binding, from MC-03)

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
   prices, and must not be written into any checkout, catalogue or live page.
7. No availability, stock, lead time, certification, test, award, review, testimonial, customer count or
   supplier quote may be invented. Missing facts are `OPEN` or `BLOCKED`.
8. Charts/weather/tides are **licensed data entitlements**, not product features that the buyer necessarily
   receives. Every mention states the licence requirement.
9. Images: no photography, CGI, mock-up or stock substitute may be claimed as existing. All missing visual
   assets are `BLOCKED_ON_IMAGE_GENERATION`. Only MC-04 internal vectors may be referenced, as internal
   design inputs, never as published MAREA identity.
10. Every product page/copy draft carries the navigation disclaimer and, for AIS, the receive-only
    disclaimer, in the exact approved wording.

## 8. Commercial hypotheses carried into this milestone

These are the only price figures allowed in the dossiers, and only as `HYPOTHESIS_UNAPPROVED`, generally
VAT-inclusive retail where stated:

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

## 9. MC-02 blocker traceability (minimum set per dossier)

Every dossier references the applicable ids from
`docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`:

- NAV: `D-01`, `D-02`, `D-03`, `D-04`, `D-05`, `D-06`, `D-08`, `D-10`, `P-01`, `P-10`, `L-01`–`L-03`, `X-01`, `X-05`.
- HUB: `H-04`, `H-05`, `H-06`, `H-07`, `H-13`, `H-02` (no control-plane reuse), `P-02`, `P-10`, `S-06`, `X-01`, `X-05`.
- AIS: `H-08`, `H-05`, `H-06`, `D-09`, `S-01`, `P-03`, `P-10`, `X-01`, `X-05`.

## 10. Deliverable map for MC-05

| Id | File | Owner |
| --- | --- | --- |
| D1 | `MAREA-NAV-COMMERCIAL-SPEC.md` | NAV Product Director |
| D2 | `MAREA-HUB-COMMERCIAL-SPEC.md` | HUB Product Director |
| D3 | `MAREA-AIS-COMMERCIAL-SPEC.md` | AIS Product Director |
| D4 | `PRODUCT-EDITIONS-NAV-HUB-AIS.md` | Lead (CPO) |
| D5 | `PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` | HUB Product Director (integration owner) |
| D6 | `PRODUCT-PRICING-AND-CHANNEL-MODEL.md` | Commercial Strategy and Pricing Specialist |
| D7 | `CUSTOMER-JOURNEYS-NAV-HUB-AIS.md` | NAV Product Director (journey owner) |
| D8 | `copy/nav.es.md`, `copy/nav.en.md`, `copy/hub.es.md`, `copy/hub.en.md`, `copy/ais.es.md`, `copy/ais.en.md` | UX, Content and Localization Specialist |
| D9 | `PRODUCT-ASSET-REQUIREMENTS.md` | AIS Product Director (asset-requirements owner for this milestone) |
| D10 | `product-definitions.batch-01.json` | Product Governance and QA Engineer |
| D11 | `scripts/check-marea-products.mjs`, `scripts/check-marea-products.test.mjs` | Product Governance and QA Engineer |
| D12 | `MC-05-DELIVERY.md` | Lead |
| D13 | `MC-05-REVIEW.md` | Independent Product Reviewer |

## 11. What this milestone must not do

No change to `src/`, `public/`, checkout, prices, stock, payment configuration, deployment workflow,
`OPEN-MARINE`, the brand identity adoption state or the trademark position. No merge, no deploy, no
publication, no purchase flow, no image generation, no chargeable API call, no hardware or radio test.
Documents here do not make any SKU orderable.
