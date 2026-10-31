# MAREA FLEET package — commercial bundle specification (MC-08 / D7)

| Field | Value |
| --- | --- |
| Document ID | MC-08 / D7 / MAREA-FLEET-PACKAGE-COMMERCIAL-SPEC |
| Milestone | MC-08 (Master Prompt 08/36) — commercial bundles, configuration rules, compatibility, subscriptions and unit economics |
| Deliverable | D7 — MAREA FLEET package commercial bundle specification and six B2B segment configurations |
| Owner | B2B Fleet Solutions Director |
| Status | `INTERNAL` / `NOT PUBLISHED` / `NOT FOR SALE` / `BUNDLE DEFINITION ONLY` |
| Lifecycle | Bundle `DEFINED`; all included products `DEFINED`; `availability = NOT_FOR_SALE`; `publication = INTERNAL_ONLY` |
| Price status | `HYPOTHESIS_UNAPPROVED` for the FLEET SaaS subscription hypotheses; `NOT_ESTABLISHED` for the package and every service line |
| Bundle id | `FLEET` |
| Machine `displayName` | `MAREA FLEET` |
| Customer-facing bundle name | `MAREA FLEET package` |
| Resolved product family | `FLEET` — MAREA FLEET product family, editions `FLEET-START`, `FLEET-BUSINESS`, `FLEET-ENTERPRISE` (this bundle creates no product family and no second SaaS) |
| Base commit | MC-07 HEAD `80c66c70a1bab6f11c5ba5709baa4c1671f1d6da` |
| Branch | `feature/marea-mc08-bundles-commercial-architecture` |
| Date | 2026-10-30 |
| Write scope | This file plus `docs/marea/bundles/copy/fleet-package.es.md` and `docs/marea/bundles/copy/fleet-package.en.md` only |
| Governing documents | `docs/marea/bundles/BUNDLE-ARCHITECTURE.md` (D1) §1–§11; `docs/marea/products/README.md` §1–§8 and §24–§32; `docs/marea/products/MAREA-FLEET-COMMERCIAL-SPEC.md` F01–F24; `docs/marea/products/FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md`; `docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` §4; `docs/marea/products/PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` §2.3; `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §9–§12; decisions D-007 to D-024 (especially D-014, D-015 and D-022) |
| Flags | `contractedSolution = true`; `hardwareIncludedByDefault = false`; `onboardingPricingEstablished = false`; `fixedPackagePriceEstablished = false` |
| Is not | A product family; a tenth family; a second SaaS; a SaaS plan; a product page; a shop catalogue; an approved quotation; an orderable SKU; a price list; a contract; a compatibility certification; a security certification; a stock, availability or lead-time statement; an SLA; an enterprise customer or contract; a warranty statement; a release |

**One-message summary.** The `MAREA FLEET package` is a commercial **composition** of the
existing MAREA FLEET product family and optional services and vessel equipment. It is not the
FLEET SaaS product, it is not a new product family, and it is not a second SaaS. The package may
combine the required FLEET subscription, required professional onboarding, vessel registration and
data migration, personnel/role setup, training, device enrollment for connected vessels and
per-edition professional support with **optional** WATCH, HUB, SENSE hardware and optional
installation, under a **separately quoted** commercial model. Hardware is never included by default
in the per-vessel SaaS fee; no package price, onboarding price or enterprise contract exists; and
no package can be published or sold today.

## 0. Contents

1. Status block
2. Identity boundaries — MAREA FLEET product family versus MAREA FLEET package
3. Composition of the MAREA FLEET package
4. SaaS subscription versus package — explicit separation
5. Proposed configurations for the six customer segments
6. Configuration outcome register
7. Onboarding and fulfilment
8. Tenancy, role and security boundary
9. Entitlement and billing split
10. Pricing model — the three SIP hypotheses and no package price
11. Journey, copy and asset pointers
12. Future acceptance criteria
13. Release readiness and blockers
14. Required disclaimers (verbatim, ES and EN)
15. The 24 mandatory bundle fields (B01–B24)
16. Non-assertions and status statement

---

## 1. Status block

### 1.1 Bundle-level status

| Dimension | Value |
| --- | --- |
| `BUNDLE_DEFINITION` | `COMPLETE_TARGET_SPECIFICATION` |
| `BUNDLE_LIFECYCLE` | `DEFINED` (binding vocabulary of D-007; no second enum, no bundle SKU lifecycle) |
| `BUNDLE_READINESS_STATE` | `INTERNAL_ONLY_DEFINED` (machine-contract readiness value; definition complete, internal only) |
| `BUNDLE_RELEASE_READINESS` | `BLOCKED` |
| `PUBLICATION_STATE` | `INTERNAL_ONLY` |
| `COMMERCIAL_AVAILABILITY` | `NOT_FOR_SALE` |
| `BUNDLE_PRICE` | `NOT_ESTABLISHED` — no fixed package price; component hypotheses only and no sum |
| `BRAND_CLEARANCE` | `NOT_GRANTED` (X-01; MAREA is a proposed brand) |
| `SOURCE_IP_CLEARANCE` | `NOT_CLEARED` (OPEN-MARINE is read-only reference) |
| `SECURITY_CERTIFICATION` | `NONE` — no certification or attestation exists or is claimed |
| `FLEET_SERVICE` | `NOT_IMPLEMENTED` — product dossier canonical state `FLEET_MULTI_TENANT_SERVICE = NOT_FOUND` (P-09) |
| `FLEET_SLA` | `NO_SLA_ESTABLISHED` |
| `IMAGE_GENERATION` | `BLOCKED` (X-03) — every package visual is a planning requirement, never a product image |

### 1.2 Readiness dimensions (never collapsed into one flag)

| Dimension | Bundle value at MC-08 | Evidence and scope |
| --- | --- | --- |
| `definition` | `COMPLETE_TARGET_SPECIFICATION` | This document: identity boundaries, 20 composition lines, six segment configurations, outcome register, onboarding, tenancy, entitlement split, pricing model and 24 fields |
| `engineering` | `NOT_VERIFIED` | No FLEET multi-tenant service, no tenant isolation test, no telemetry ingestion, no billing/entitlement service, no notification pipeline (P-09, P-06, H-12) |
| `licensing` | `NOT_CLEARED` | No terms of service, no DPA, no subprocessor register, no provider agreement, no connectivity contract (X-07, H-12, L-01–L-03) |
| `hardware` | `NOT_SELECTED` for every optional hardware line | WATCH/HUB/SENSE hardware selection is `NOT_SELECTED` in their own dossiers; FLEET itself is `NOT_APPLICABLE_SOFTWARE_PRODUCT` |
| `dataRights` | `NOT_GRANTED` | AIS-derived retention/redistribution `LEGAL_REVIEW_REQUIRED` (D-09); external data provider rights `NOT_GRANTED` (D-10) |
| `compliance` | `NOT_STARTED` | No DPIA, no records of processing, no CRA readiness, no accessibility statement, no security assessment (H-13, X-07) |
| `pricing` | `HYPOTHESIS_UNAPPROVED` | Three FLEET SaaS hypotheses; every service, hardware and connectivity line is `NOT_ESTABLISHED` or a component hypothesis; no approved price |
| `brandPublication` | `NOT_GRANTED` | X-01; the ES/EN copy files are internal drafts |
| `availability` | `NOT_FOR_SALE` | No tenancy, no onboarding operation, no support desk, no billing, no contract, no order flow |

### 1.3 Evidence classes used in this document

`VERIFIED_REPO` (a path in this repository states the fact), `VERIFIED_EXTERNAL` (a cited public source
with a check date; not used for a MAREA commercial fact here), `ASSUMPTION` (explicit planning
assumption), `HYPOTHESIS` (commercial assumption awaiting approval), `OPEN` (fact not established, the
intended experience is specified), `BLOCKED` (an external condition prevents closure). `OPEN` and
`BLOCKED` are legitimate values. The prohibited placeholder token is not used.

### 1.4 Canonical FLEET state strings reused unchanged

`FLEET_MULTI_TENANT_SERVICE = NOT_FOUND`, `FLEET_TENANT_ISOLATION_TEST = NOT_EXECUTED`,
`FLEET_AUTHORIZATION_MODEL = DESIGN_ONLY`, `FLEET_TELEMETRY_INGESTION = NOT_VERIFIED`,
`FLEET_BILLING_AND_ENTITLEMENT_SERVICE = NOT_FOUND`, `FLEET_NOTIFICATION_PIPELINE = NOT_FOUND`,
`FLEET_CONNECTIVITY_CONTRACT = NOT_FOUND`, `FLEET_SLA = NO_SLA_ESTABLISHED`,
`FLEET_SECURITY_CERTIFICATION = NONE`, `FLEET_REMOTE_CONTROL_PATH = NONE_EXISTS`,
`FLEET_DPA_AND_SUBPROCESSORS = NOT_EXECUTED`, `FLEET_CUSTOMER_PRODUCTION_DATA = NONE_USED`.
The optional hardware families keep their own states: `WATCH_INGESTION = NOT_VERIFIED`,
`WATCH_NOTIFICATION_PIPELINE = NOT_FOUND`, `WATCH_DEVICE_IDENTITY = NOT_FOUND`,
`WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND`, HUB hardware `NOT_SELECTED`, SENSE accuracy
`NOT_MEASURED`, and **0 compatibility rows `SUPPORTED`**.

---

## 2. Identity boundaries — MAREA FLEET product family versus MAREA FLEET package

### 2.1 The two objects

| Object | What it is | Authority | Status here |
| --- | --- | --- | --- |
| **MAREA FLEET product family** (`FLEET`) | The professional multi-vessel operations **SaaS product**: one organization tenant, vessels, people, roles, permissions, maintenance, work orders, documents, incidents, reporting, export, audit and authorised **read-only** telemetry, sold per vessel per month in three editions | `MAREA-FLEET-COMMERCIAL-SPEC.md`; `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` §4; tenancy contract | `DEFINED`, `NOT_FOR_SALE`; prices `HYPOTHESIS_UNAPPROVED` |
| **MAREA FLEET package** (bundle id `FLEET`, machine `displayName` `MAREA FLEET`, customer-facing name `MAREA FLEET package`) | A broader **commercial package** that MAY combine the FLEET SaaS subscription with onboarding, device enrollment, installation and compatible vessel equipment as explicit, itemised lines | This document; `BUNDLE-ARCHITECTURE.md` §1, §2, §6.6; `COMMERCIAL-PORTFOLIO.md` bundle table | `DEFINED`, `NOT_FOR_SALE`, `INTERNAL_ONLY`; **bespoke, no package price** |

### 2.2 What the package is not

The package is **not** a product family, **not** a tenth MAREA family, **not** a second SaaS, **not** a
SaaS plan, **not** a hardware bundle included by default, **not** a fixed-price offer, **not** a
quotation, **not** a contract and **not** an orderable SKU. Its only product-family content is the
existing `FLEET` family; every other line is either a separately purchased edition of another MAREA
family, a professional service, or a required external item (connectivity, customer device, site
works). Composition does not inherit any component's certification, compatibility result, data right
or price approval (`BUNDLE-ARCHITECTURE.md` §5 rule 2).

### 2.3 Naming rule (binding on every future surface)

The words "MAREA FLEET" must always be accompanied by the object being discussed. The product is
written as "the MAREA FLEET product family" or "MAREA FLEET Start / Business / Enterprise"; the bundle
is written as "MAREA FLEET package". The two are never merged into one price or one offer
(`brand-identity.contract.json` `fleetDisambiguation`; README §2). The bundle id stays `FLEET` and the
machine `displayName` stays `MAREA FLEET`; only the customer-facing bundle form is
`MAREA FLEET package`.

### 2.4 Authority note — OPEN display-name conflict (recorded, machine contract untouched)

`BUNDLE-ARCHITECTURE.md` §1 and the MC-08 brief fix the bundle machine `displayName` as `MAREA FLEET`
and the customer-facing bundle form as `MAREA FLEET package`. The machine contract
`bundle-definitions.json` (D17) FLEET entry currently sets `displayName: "MAREA FLEET package"`
alongside `customerFacingName: "MAREA FLEET package"`. **Recorded as `OPEN`:** this deliverable uses
`displayName = MAREA FLEET` per the binding D1/brief wording and does not edit the machine contract;
the Lead must reconcile D17 or confirm that the customer-facing form is intended as the machine
display name. The customer-facing name is unambiguous either way: `MAREA FLEET package`.

---

## 3. Composition of the MAREA FLEET package

### 3.1 Composition table

The composition is the canonical internal reference configuration. Line ids `FP-01`–`FP-11` follow
`BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` (D8) §3.6; `FP-12`–`FP-16` make the remaining required
services, support, billing and expansion lines explicit for this deliverable; `E-01`–`E-10` record the
exclusions. Inclusion classes are exactly the seven values of `BUNDLE-ARCHITECTURE.md` §3.3.

| Line | Family id | Edition id | Quantity | Role | Inclusion class | Dependencies | Subscriptions | Compatibility status + source row id | Evidence class | Price status | Cost status | Installation class | Release blockers |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FP-01 | `FLEET` | `FLEET-START` or `FLEET-BUSINESS` | 1, per vessel/month | Required SaaS operations platform subscription (option A / option B); hardware never included by default | `INCLUDED` | verified organization; written contract; DPA; verified first administrator | `FLEET_SAAS_SUBSCRIPTION` (required; VAT excluded) | `CONDITIONAL` — `N-16` where optional telemetry is included; the subscription itself has no integration row | `VERIFIED_REPO` | `HYPOTHESIS_UNAPPROVED` | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | P-09, H-12, X-07 |
| FP-02 | `FLEET` | `FLEET-ENTERPRISE` | 1, per contract | Negotiated contracted tier; no standard price, no invented SLA | `CONDITIONAL` | written contract; measurement evidence for any service level | contracted; no standard price | N/A — no integration row | `BLOCKED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | P-09, D-014 |
| FP-03 | service | organisation onboarding | 1, per organization | Required professional service: setup, vessel import, role design, configuration, acceptance record; never inside the per-vessel fee | `INCLUDED` (separately quoted) | written contract; vessel and role inventory | none | N/A — no integration row | `VERIFIED_REPO` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | X-05, X-06 |
| FP-04 | service | device enrollment, personnel/permission setup, initial data migration | 1, per organization (device enrollment per connected device) | Required setup services: permissions/users, registration and baseline migration, connected-vessel enrollment | `INCLUDED` (separately quoted) | written contract; device list; data export format | none | `CONDITIONAL` — `N-16` / `N-17` where devices supply telemetry | `VERIFIED_REPO` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | X-05, X-07 |
| FP-05 | `WATCH` | `WATCH-CORE` | 0–n, per vessel | Optional per-vessel telemetry and alert source | `OPTIONAL` | connectivity; WATCH subscription; installation | `WATCH_MONITORING_SUBSCRIPTION` (required with the device) | `CONDITIONAL` — `N-16` (batch-02 `I-14` governs) | `VERIFIED_REPO` | `HYPOTHESIS_UNAPPROVED` | `NOT_ESTABLISHED` | `INSTALLER_ASSISTED` | P-06, H-12 |
| FP-06 | `HUB` | `HUB-STANDARD` | 0–n, per vessel | Optional per-vessel local data source and installation health | `OPTIONAL` | installation | none | `CONDITIONAL` — `N-17` (batch-02 `I-15` governs) | `VERIFIED_REPO` | `HYPOTHESIS_UNAPPROVED` | `NOT_ESTABLISHED` | `INSTALLER_ASSISTED` | H-04, H-05, P-02 |
| FP-07 | `SENSE` | existing modules; no new module or kit invented | 0–n, per vessel | Optional SENSE modules or kits per vessel; no direct FLEET measurement path | `OPTIONAL` | installation and calibration | none | `UNKNOWN` — `N-19`; only path is via `N-16` (batch-02 `I-10`, `I-24`) | `VERIFIED_REPO` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `PROFESSIONAL_REQUIRED` | P-05 |
| FP-08 | external | cellular connectivity / SIM data | per connected device | Required external connectivity; never part of the SaaS, hardware or installation fee | `REQUIRED_EXTERNAL` | coverage per vessel; operator contract | separate data contract, provider terms | `CONDITIONAL` — `N-16` / `N-17`; `FLEET_CONNECTIVITY_CONTRACT = NOT_FOUND` (H-12) | `OPEN` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | H-12 |
| FP-09 | service | installation, maintenance and service setup | per site / vessel | Optional physical installation and service setup, quotation-led | `OPTIONAL` | site survey | none | N/A — no integration row | `VERIFIED_REPO` | `OPEN` | `NOT_ESTABLISHED` | `QUOTATION_REQUIRED` | X-05, X-06 |
| FP-10 | service | contracted integrations and optional contracted SLA | per contract | Conditional custom integration and measurable service commitment; otherwise `NO_SLA_ESTABLISHED` | `CONDITIONAL` | written contract; measurement evidence | contracted | `PLANNED` — `N-21` (explicit permission); `CONDITIONAL` — `N-15` (provider terms); none `SUPPORTED` | `BLOCKED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | P-09, D-014 |
| FP-11 | `FLEET` | all editions | 1, per organization | Roles, tenant isolation, audit, export/delete, read-only telemetry boundary; never edition-gated. Reporting is treated per edition in `FP-12` (see §3.5 OPEN) | `INCLUDED` in every edition | server-side authorization; audit log; export/deletion policy | included in subscription | N/A — no integration row | `VERIFIED_REPO` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | P-09, X-07 |
| FP-12 | `FLEET` | all editions | 1, per organization | Reporting capability **per edition** (Start: operational list views only; Business: reporting as defined conditionally; Enterprise: contracted) | `CONDITIONAL` | edition entitlement | included in the purchased edition | N/A — no integration row | `OPEN` | `NOT_APPLICABLE` | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | P-09; OPEN see §3.5 |
| FP-13 | service | training | per user group / session | Required training service for administrators and daily users; quoted separately | `INCLUDED` (separately quoted) | onboarding plan | none | N/A — no integration row | `VERIFIED_REPO` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | X-05, X-06 |
| FP-14 | `FLEET` | all editions | 1, per organization | Professional support entitlement within edition boundaries (channel, hours, escalation) | `INCLUDED` (per edition boundaries) | written contract | included support entitlement; Enterprise contracted | N/A — no integration row | `VERIFIED_REPO` | `NOT_APPLICABLE` | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | X-05, X-07 |
| FP-15 | `FLEET` | edition allowance | 1, per organization | Per-vessel subscription accounting and billing contacts | `INCLUDED` | contract; entitlement ledger | required for every billable vessel | N/A — no integration row | `VERIFIED_REPO` | `NOT_APPLICABLE` | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | P-09 |
| FP-16 | `FLEET` | edition allowance | per additional vessel | Additional vessels beyond the published allowance | `OPTIONAL` | published limits | `FLEET_SAAS_SUBSCRIPTION` at edition rate (hypothesis) | N/A — no integration row | `VERIFIED_REPO` | `HYPOTHESIS_UNAPPROVED` | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | P-09, X-05 |
| E-01 | `NAV` | any NAV edition | 0 | Not part of the package | `NOT_INCLUDED` | separate purchase and subscription | separate NAV subscription | `PLANNED` — `N-21` only with explicit permission | `VERIFIED_REPO` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | separate product; X-01, X-05 |
| E-02 | `AIS` | `AIS-RECEIVER`, `AIS-CONNECTED` | 0 | Not part of the package | `NOT_INCLUDED` | separate purchase; antenna chain | separate hardware | `CONDITIONAL` — `N-18` read-only; D-09 | `VERIFIED_REPO` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | D-09, H-08, P-03 |
| E-03 | `DISPLAY` | `DISPLAY-7` | 0 | Not part of the package | `NOT_INCLUDED` | separate purchase | separate hardware | `UNKNOWN` — `N-08` | `VERIFIED_REPO` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | H-11, P-07, X-05 |
| E-04 | `DISPLAY` | `DISPLAY-LARGE-CONDITIONAL` | 0 | Conditional large size is never selectable as an available size | `INELIGIBLE` | none | none | `UNKNOWN` — `N-08` | `VERIFIED_REPO` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | H-11, P-07 |
| E-05 | `PILOT` | any PILOT object | 0 | Permanent exclusion: no vessel-control path from FLEET, at any tier | `INELIGIBLE` | none permitted | none | `BLOCKED` — `N-20` for any control; read-only status not available | `VERIFIED_REPO` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | H-01, P-04; `FLEET_REMOTE_CONTROL_PATH = NONE_EXISTS` |
| E-06 | `WEATHER` | `WEATHER-STANDARD`, `WEATHER-PRO` | 0 | Not part of the package | `NOT_INCLUDED` | separate entitlement | separate WEATHER subscription | `CONDITIONAL` — `N-15` only where provider terms permit | `VERIFIED_REPO` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | D-04, D-10 |
| E-07 | external | charts, official ENC, third-party data | 0 | Not included; customer-licensed separately | `NOT_INCLUDED` | customer licence | separate licence | N/A — data licence is not an integration | `VERIFIED_REPO` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | D-01, D-06 |
| E-08 | service | vessel survey, classification, safety-management system, regulatory certification | 0 | Not included; the organization remains responsible | `NOT_INCLUDED` | customer obligations | none | N/A — no integration row | `VERIFIED_REPO` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | X-06 |
| E-09 | `FLEET` | any quantity without a stated limit (vessels, users, storage, API, support) | 0 | Never promised in any edition or contract | `INELIGIBLE` | none | none | N/A — no integration row | `VERIFIED_REPO` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | FL30; claims policy §3 |
| E-10 | `FLEET` | remote command, steering, throttle, motor, bus or firmware path | 0 | Permanent design exclusion | `INELIGIBLE` | none | none | N/A — no integration row | `VERIFIED_REPO` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | FL27; `FLEET_REMOTE_CONTROL_PATH = NONE_EXISTS` |

### 3.2 Required-services breakdown (what FP-03, FP-04, FP-11 and FP-13 contain)

The composition table above is the commercial line model; the required professional content is
explicit here so that no service is hidden inside another line.

| Sub-line | Content | Class | Price status | Notes |
| --- | --- | --- | --- | --- |
| FP-03.1 | Organization setup: verified organization and first administrator, organization profile, billing contact, operational settings | `INCLUDED` service | `NOT_ESTABLISHED` | Prerequisite of any tenant |
| FP-03.2 | Vessel import and baseline configuration: vessel register, profiles, equipment baseline, document register | `INCLUDED` service | `NOT_ESTABLISHED` | Baseline scope only; extended migration is FP-04.1 |
| FP-03.3 | Role design and invitation run: role design, invitations, vessel assignments, acceptance record | `INCLUDED` service | `NOT_ESTABLISHED` | Eight-role model only; no ninth role |
| FP-04.1 | Fleet/vessel registration and initial data migration from an existing spreadsheet or system, within a defined baseline | `INCLUDED` service | `NOT_ESTABLISHED` | Scope and data-cleaning effort `OPEN`; migration beyond baseline is `QUOTATION_REQUIRED` |
| FP-04.2 | Personnel permissions and users setup (software capability plus configuration): memberships, roles, vessel scopes, sharing grants | `INCLUDED` (software) | included in subscription | No per-seat charge in Start/Business as a hypothesis; seats included (`HYPOTHESIS`) |
| FP-04.3 | Device enrollment for connected vessels: device identity binding, ownership verification, tenant-scoped telemetry credential, commissioning record | `INCLUDED` service, required for each connected vessel | `NOT_ESTABLISHED` | Not applicable to a software-only configuration; `EXTERNAL_INSTALLER` may commission within a scoped grant |
| FP-09.1 | Installation of optional vessel equipment, per site/vessel, after an assessment | `OPTIONAL` | `NOT_ESTABLISHED` — `QUOTATION_REQUIRED` | Never included; labour and materials named in the quotation |
| FP-09.2 | Maintenance/service setup for the installed configuration | `OPTIONAL` | `NOT_ESTABLISHED` — `QUOTATION_REQUIRED` | Never included; service scope agreed in writing |
| FP-10.1 | Contracted integration work, permissioned and revocable, only under a signed contract | `CONDITIONAL` | `NOT_ESTABLISHED` | No integration is `SUPPORTED`; provider/rights and security review required |
| FP-10.2 | Optional contracted SLA, only where measured and contracted | `CONDITIONAL` | `NOT_ESTABLISHED` | Otherwise the published statement is `NO_SLA_ESTABLISHED` |
| FP-11.1 | Organization identity, membership, server-side authorization, eight roles, vessel assignment, device ownership, sharing grants, export permissions, auditability, immediate revocation | `INCLUDED` in every edition | included | Design requirements only; `FLEET_AUTHORIZATION_MODEL = DESIGN_ONLY`; `NOT_EXECUTED` |
| FP-11.2 | Reporting capability per edition (see §3.5 OPEN item) | `CONDITIONAL` | included per edition | Start: operational list views only; Business: reporting as defined (FL13 `INCLUDED_CONDITIONAL`); Enterprise: contracted |
| FP-13.1 | Training for administrators and daily users: role-based sessions, handover, bilingual material | `INCLUDED` service | `NOT_ESTABLISHED` | Required service; quoted separately; no duration or price exists |

### 3.3 Inclusion, installation and price-status vocabularies used here

- **Inclusion classes** are exactly `INCLUDED`, `REQUIRED_EXTERNAL`, `OPTIONAL`, `CONDITIONAL`,
  `NOT_INCLUDED`, `INELIGIBLE`, `QUOTATION_REQUIRED` (`BUNDLE-ARCHITECTURE.md` §3.3). Inclusion is a
  commercial classification, never a technical-support statement.
- **Installation classes** are exactly the machine-contract values of
  `bundle-definitions.json` (D17): `NOT_APPLICABLE`, `SELF_INSTALL_NOT_VERIFIED`,
  `INSTALLER_ASSISTED`, `PROFESSIONAL_REQUIRED`, `QUOTATION_REQUIRED`,
  `SPECIALIST_SURVEY_REQUIRED`. The package uses `NOT_APPLICABLE` for software and
  non-installation lines, `INSTALLER_ASSISTED` for optional WATCH/HUB equipment,
  `PROFESSIONAL_REQUIRED` for SENSE modules and no line requires `SELF_INSTALL_NOT_VERIFIED`;
  installation and service setup are `QUOTATION_REQUIRED`.
- **Price status** per line uses the machine-contract vocabulary `HYPOTHESIS_UNAPPROVED`,
  `NOT_ESTABLISHED`, `OPEN`, `BLOCKED`, `NOT_APPLICABLE`. **No line carries an approved
  price**, and no combination of lines constitutes a package price.
- **Cost status** per line uses `NOT_ESTABLISHED` (cost framework only), with `OPEN` where the cost
  object is defined but unpriced and `NOT_APPLICABLE` for excluded lines; no BOM, supplier
  quotation, labour rate, connectivity quote or provider cost exists (X-05).

### 3.4 Composition invariants

1. The FLEET SaaS subscription (`FP-01` or `FP-02`) is the only mandatory product-family line; the
   package cannot exist without it.
2. Hardware (`FP-05`, `FP-06`, `FP-07`) is never included by default and never included in the
   per-vessel SaaS fee.
3. Connectivity (`FP-08`) is external, per connected device and never included in the SaaS, hardware
   or installation price.
4. Onboarding, migration, training and device enrollment are professional services; their price is
   never implied by the subscription hypothesis.
5. No duplicate component, no contradictory editions, no double subscription; one entitlement ledger
   per customer account (`BUNDLE-ARCHITECTURE.md` §8).
6. A blocked component blocks the promise: any configuration with connected vessels stays
   `COMPATIBILITY_EVIDENCE_REQUIRED` until a recorded compatibility row exists.
7. Nothing here creates a tenth family, a second SaaS, a new edition or a new SKU.

### 3.5 Authority note — OPEN reporting conflict (recorded, product documents untouched)

`BUNDLE-ARCHITECTURE.md` §6.6 F-11 and `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` §3.6 FP-11 describe
"reporting" among the capabilities `INCLUDED` in every FLEET edition and never edition-gated. The
product-edition authority `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` §4.1 FL13 assigns standard
reporting and service planning to `FLEET-BUSINESS` as `INCLUDED_CONDITIONAL` and to `FLEET-START` as
`NOT_INCLUDED` (operational list views only), and the tenancy contract §6.7 repeats that constraint.
Two authorities therefore disagree on reporting.

**Recorded as `OPEN`.** This deliverable applies the product-edition authority (reporting is
per-edition; `FP-12`), because the editions document is authoritative on edition contents and D-015
never lists reporting among the never-edition-gated capabilities. The Lead must reconcile the D1/D8
wording or issue a decision; no product document is edited by this deliverable. Tenant isolation,
role enforcement, audit, export and deletion are unaffected: they are `INCLUDED` in every edition.

---

## 4. SaaS subscription versus package — explicit separation

| Dimension | MAREA FLEET product family (SaaS subscription) | MAREA FLEET package (bundle `FLEET`) |
| --- | --- | --- |
| Commercial object | Product subscription (per vessel per month) | Commercial composition (bespoke, contracted, itemised) |
| Identity | `FLEET` product family; editions `FLEET-START` / `FLEET-BUSINESS` / `FLEET-ENTERPRISE` | Bundle id `FLEET`; customer-facing name `MAREA FLEET package`; not a family and not a SaaS |
| Buyer | Professional operator buying software | Professional operator buying an integrated, contracted fleet solution |
| What is bought | Time-limited right to use the platform for the purchased vessels and edition | SaaS subscription plus explicitly itemised services, optional hardware, optional installation and required external connectivity |
| Price basis | Three hypotheses: Start and Business per vessel per month, VAT excluded; Enterprise `NOT_ESTABLISHED` | **No package price**: bespoke quotation only; `fixedPackagePriceEstablished = false` |
| Onboarding | Not included in the subscription hypothesis | Required service, quoted separately; `onboardingPricingEstablished = false` |
| Hardware | Never included | Optional per line, separately purchased, never by default; `hardwareIncludedByDefault = false` |
| Connectivity | Never included | Required external item per connected device, price `NOT_ESTABLISHED` |
| Installation | Not applicable to the software | Optional and quotation-led, per site/vessel |
| Training | Not included in the subscription hypothesis | Required service, quoted separately |
| Support | Edition support entitlement within edition boundaries | Same edition support entitlement; optional contracted SLA only where measurable and contracted |
| Contract | Platform terms plus DPA (not executed) | Contracted solution (`contractedSolution = true`) with itemised scope; no enterprise contract exists |
| SLA | `NO_SLA_ESTABLISHED` | `NO_SLA_ESTABLISHED` unless a measurable, contracted commitment exists |
| Publication | Internal, not for sale | Internal, not for sale; `PUBLICATION_BLOCKED` |
| Authority | Product dossier and editions authority | This bundle specification, D1 architecture and D8 composition matrix |

The separation is a hard commercial boundary: buying a FLEET subscription never creates a WATCH
service, never supplies hardware, never buys onboarding or installation, and never implies any part of
the package. Buying the package always contains a FLEET subscription as a named line, and the package
is never rendered as a second SaaS.

---

## 5. Proposed configurations for the six customer segments

All segment facts below are `ASSUMPTION`/`HYPOTHESIS`/`OPEN`, never market evidence. No customer,
deployment, contract, reference or willingness-to-pay figure exists (X-06). Fleet-size bands are
planning assumptions adapted from the FLEET dossier §6 segment register (S1–S6) and the edition
authority §4.5–§4.7; they are not enforced limits and not market data. Segment names are internal
descriptors, not customer-facing product names.

### 5.1 Segment register (summary)

| # | Segment | Typical fleet band (HYPOTHESIS) | Edition hypothesis | Primary configuration outcome |
| --- | --- | --- | --- | --- |
| D-S1 | Charter company | 10–150 vessels (owned and managed) | `FLEET-BUSINESS`; `FLEET-ENTERPRISE` when procurement/volume terms require a contract | `QUOTATION_REQUIRED` |
| D-S2 | Sailing school | 4–25 boats | `FLEET-START`; `FLEET-BUSINESS` above the Start band | `CONFIGURATION_DEFINED_INTERNAL` |
| D-S3 | Marina | 50–500 berths; customer vessels under care | `FLEET-BUSINESS`; `FLEET-ENTERPRISE` for multi-site groups | `SPECIALIST_SURVEY_REQUIRED` |
| D-S4 | Marine maintenance provider | 10–200 vessels serviced across owners | `FLEET-BUSINESS`; `FLEET-ENTERPRISE` where integration scope demands it | `QUOTATION_REQUIRED` |
| D-S5 | Small vessel management firm | 2–25 vessels managed for owners | `FLEET-START` / `FLEET-BUSINESS` | `SPECIALIST_SURVEY_REQUIRED` |
| D-S6 | Professional operator managing several vessels | 3–50 vessels | `FLEET-BUSINESS`; `FLEET-ENTERPRISE` for regulated/contracted operations | `QUOTATION_REQUIRED` |

The primary outcome is the strongest internal configuration result; every segment is additionally
`COMPATIBILITY_EVIDENCE_REQUIRED` where a connected vessel is proposed and `PUBLICATION_BLOCKED` at
release (§6). None is orderable.

### 5.2 D-S1 — Charter company

- **Typical fleet size band.** 10–150 vessels, mixed owned and managed; seasonal utilisation. `HYPOTHESIS` (dossier segment S2).
- **Edition hypothesis.** `FLEET-BUSINESS` for the operational fleet; `FLEET-ENTERPRISE` only as a contracted tier where procurement, audit or volume terms require it; `HYPOTHESIS`/`OPEN`.
- **Likely optional hardware / monitoring / connectivity.** WATCH-CORE on a subset of high-value or unattended vessels (`OPTIONAL`, per vessel); HUB-STANDARD `OPTIONAL`; SENSE modules `OPTIONAL`; cellular connectivity `REQUIRED_EXTERNAL` for each connected device. Software-only configuration is valid. `HYPOTHESIS`.
- **Onboarding / training needs.** Vessel and owner import, owner-view configuration, crew invitation at scale, turnover/defect capture, training for shore staff and captains; quoted separately (`NOT_ESTABLISHED`).
- **Tenancy / role needs.** `ORGANIZATION_OWNER`/`ADMIN` for the office, `FLEET_MANAGER` and `MAINTENANCE_MANAGER` vessel-scoped, `CREW_MEMBER` for assigned vessels, `READ_ONLY_VIEWER` for owner representatives, `EXTERNAL_INSTALLER` for yards; `EMBARCARTE_SUPPORT` scoped and audited. Design requirements only.
- **Reporting / integration needs.** Owner reporting and turnaround reporting (`FP-12`, Business conditional); booking-system or accounting integration `CONDITIONAL` contracted only (`FP-10`), none `SUPPORTED`.
- **Explicit exclusions.** No booking engine, no payment processing for charters, no hardware by default, no connectivity included, no remote or autonomous vessel control, no SLA, no security certification, no availability or uptime figure.
- **Primary configuration outcome.** `QUOTATION_REQUIRED` (bespoke contracted package; component prices not established) with `COMPATIBILITY_EVIDENCE_REQUIRED` for connected vessels and `PUBLICATION_BLOCKED` at release.

### 5.3 D-S2 — Sailing school

- **Typical fleet size band.** 4–25 boats plus dinghies/training vessels. `HYPOTHESIS` (dossier segment S1).
- **Edition hypothesis.** `FLEET-START` for the smaller school; `FLEET-BUSINESS` when workflow, reporting and API needs exceed Start; `HYPOTHESIS`.
- **Likely optional hardware / monitoring / connectivity.** Usually none required for the software outcome; HUB/WATCH `OPTIONAL` where a school wants local data or unattended monitoring; connectivity external. `HYPOTHESIS`.
- **Onboarding / training needs.** Seasonal re-onboarding is the dominant cost: fleet and instructor import, base-manager role design, mobile-first training for a seasonal team; quoted separately.
- **Tenancy / role needs.** `ORGANIZATION_OWNER`/`ADMIN` at the school office, `FLEET_MANAGER` (base manager/head instructor), `CREW_MEMBER` for instructors scoped to assigned boats, `READ_ONLY_VIEWER` for auditors or owner representatives, `EXTERNAL_INSTALLER` for yards. Design requirements only.
- **Reporting / integration needs.** Availability and course-allocation list views in Start; standard reporting conditional in Business; no booking-system integration is defined (`OPEN`).
- **Explicit exclusions.** No course-booking or CRM engine, no instructor certification, no payments, no hardware by default, no connectivity, no remote control, no SLA, no customer references.
- **Primary configuration outcome.** `CONFIGURATION_DEFINED_INTERNAL` for the software-first configuration, with `QUOTATION_REQUIRED` for any added service scope and `PUBLICATION_BLOCKED` at release.

### 5.4 D-S3 — Marina

- **Typical fleet size band.** 50–500 berths; a subset of customer vessels under care or work. `HYPOTHESIS` (dossier segment S3).
- **Edition hypothesis.** `FLEET-BUSINESS`; `FLEET-ENTERPRISE` for multi-site groups with procurement or audit requirements. The dossier notes that marinas often buy per berth or per site, so a per-vessel price may not fit and the commercial model is `OPEN`.
- **Likely optional hardware / monitoring / connectivity.** Customer-vessel monitoring only where the customer authorises it (`OPTIONAL`, per vessel); contractor access is software; connectivity external per connected device.
- **Onboarding / training needs.** Customer-vessel register import, sharing-grant and contractor-access design, owner-communication templates, seasonal staff training; quoted separately. `OPEN`.
- **Tenancy / role needs.** Strict scoping is the value: `EXTERNAL_INSTALLER` time-bound and vessel-level, `READ_ONLY_VIEWER` for owner views, `FLEET_MANAGER`/`MAINTENANCE_MANAGER` for marina staff, no cross-tenant visibility. Design requirements only.
- **Reporting / integration needs.** Work-authorisation and incident records, contractor-access audit; integration with a marina management or berth-billing system is `OPEN`; none `SUPPORTED`.
- **Explicit exclusions.** The marina billing/berth system is not included; no public vessel directory, no indexable fleet map, no cross-tenant access, no hardware or connectivity by default, no remote control, no SLA.
- **Primary configuration outcome.** `SPECIALIST_SURVEY_REQUIRED` because the organization manages third-party vessels and multi-owner data-governance must be assessed before any configuration is quoted; `QUOTATION_REQUIRED` for services; `PUBLICATION_BLOCKED` at release.

### 5.5 D-S4 — Marine maintenance provider

- **Typical fleet size band.** 10–200 vessels serviced across several owners. `HYPOTHESIS` (dossier segment S4).
- **Edition hypothesis.** `FLEET-BUSINESS` for work orders, technician assignment and owner reporting; `FLEET-ENTERPRISE` where contracted integrations or access-review evidence are required; `HYPOTHESIS`.
- **Likely optional hardware / monitoring / connectivity.** HUB-STANDARD or WATCH-CORE on selected serviced vessels (`OPTIONAL`) for local data or commissioning evidence; connectivity external per device. `HYPOTHESIS`.
- **Onboarding / training needs.** Migration of open work orders and history, technician role design, per-owner reporting templates, owner-view setup; quoted separately.
- **Tenancy / role needs.** `MAINTENANCE_MANAGER` and `FLEET_MANAGER` for the service desk, `CREW_MEMBER` for technicians scoped to assigned vessels, `READ_ONLY_VIEWER` owner views, `EXTERNAL_INSTALLER` only for subcontracted yard work. Design requirements only.
- **Reporting / integration needs.** Per-owner reports, service history export, parts/labour notes; accounting or field-service integration `CONDITIONAL` contracted only; none `SUPPORTED`.
- **Explicit exclusions.** No field-service dispatch optimisation, no parts procurement, no accounting system included, no remote equipment diagnostics or write access, no hardware by default, no SLA.
- **Primary configuration outcome.** `QUOTATION_REQUIRED` for the service and hardware scope, with `COMPATIBILITY_EVIDENCE_REQUIRED` for connected vessels and `PUBLICATION_BLOCKED` at release.

### 5.6 D-S5 — Small vessel management firm

- **Typical fleet size band.** 2–25 vessels managed for several owners; small shore team. `HYPOTHESIS` (dossier segments S4/S6 blend).
- **Edition hypothesis.** `FLEET-START` for a small managed fleet; `FLEET-BUSINESS` when reporting and delegation needs grow; `HYPOTHESIS`.
- **Likely optional hardware / monitoring / connectivity.** WATCH-CORE or HUB-STANDARD on owner vessels only with the owner's authorisation (`OPTIONAL`); connectivity external. `HYPOTHESIS`.
- **Onboarding / training needs.** Multi-owner import, owner-view configuration, role and sharing-grant design, captain training; quoted separately. `OPEN`.
- **Tenancy / role needs.** The organization manages data for several vessel owners, so controller/processor assessment, scoped owner views (`READ_ONLY_VIEWER`), `EXTERNAL_INSTALLER` grants and strict audit are required design elements; `FLEET_DPA_AND_SUBPROCESSORS = NOT_EXECUTED`.
- **Reporting / integration needs.** Owner reporting and document-expiry control; accounting integration `OPEN`; none `SUPPORTED`.
- **Explicit exclusions.** No legal or financial management of owner funds, no charter brokerage, no insurance advice, no cross-owner visibility, no hardware by default, no SLA.
- **Primary configuration outcome.** `SPECIALIST_SURVEY_REQUIRED` (multi-owner data flows and controller/processor position must be assessed), `QUOTATION_REQUIRED` for services, `PUBLICATION_BLOCKED` at release.

### 5.7 D-S6 — Professional operator managing several vessels

- **Typical fleet size band.** 3–50 vessels (pilot, survey, aquaculture, port services or similar small professional operations). `HYPOTHESIS` (dossier segment S5).
- **Edition hypothesis.** `FLEET-BUSINESS`; `FLEET-ENTERPRISE` where procurement, audit, contracted integrations or service commitments are required. `FLEET-ENTERPRISE` remains `CONTRACTED_TIER`, `NOT_ESTABLISHED`, with no invented SLA.
- **Likely optional hardware / monitoring / connectivity.** WATCH-CORE and/or HUB-STANDARD on critical vessels (`OPTIONAL`); SENSE modules where measured inputs are needed; connectivity external per device. `HYPOTHESIS`.
- **Onboarding / training needs.** Statutory-document register import, equipment and maintenance baseline, governance/role design, audit-trail training; quoted separately. `OPEN`.
- **Tenancy / role needs.** `FLEET_MANAGER`/`MAINTENANCE_MANAGER`, `CREW_MEMBER` vessel-scoped, `READ_ONLY_VIEWER` for auditors, `EXTERNAL_INSTALLER` time-bound, `EMBARCARTE_SUPPORT` audited; design requirements only.
- **Reporting / integration needs.** Management reports and document-expiry reporting (per edition); contracted integration scope `CONDITIONAL`; none `SUPPORTED`.
- **Explicit exclusions.** FLEET is not a safety-management system, not a classification-society tool and not a regulatory certificate; no ISM/SOLAS compliance, no deep-sea shipping ERP, no remote control, no hardware by default, no SLA, no "unlimited" allowance.
- **Primary configuration outcome.** `QUOTATION_REQUIRED` for the package, with `COMPATIBILITY_EVIDENCE_REQUIRED` for connected vessels and `PUBLICATION_BLOCKED` at release.

---

## 6. Configuration outcome register

The only permitted internal configuration outcomes are `CONFIGURATION_DEFINED_INTERNAL`,
`COMPATIBILITY_EVIDENCE_REQUIRED`, `SPECIALIST_SURVEY_REQUIRED`, `QUOTATION_REQUIRED`, `NOT_ELIGIBLE`
and `PUBLICATION_BLOCKED`. There is **no `ORDERABLE`, `FOR_SALE` or `APPROVED` outcome in MC-08**.
The generic FLEET package resolution fixed by `BUNDLE-CONFIGURATION-RULES.md` §12.6 (rule `CR-07`) is
`CONFIGURATION_DEFINED_INTERNAL` → `COMPATIBILITY_EVIDENCE_REQUIRED` → `QUOTATION_REQUIRED` →
`PUBLICATION_BLOCKED`; `SPECIALIST_SURVEY_REQUIRED` is the additional outcome for the marina and
multi-owner management configurations below, where third-party vessel data and sharing grants must be
assessed before a quotation.

| Configuration variant | Outcome | Reason |
| --- | --- | --- |
| Software-only package: FLEET subscription + onboarding + migration + roles + training + support | `CONFIGURATION_DEFINED_INTERNAL` | Composition is fully specified internally; services still quoted; no service exists |
| Any configuration with connected vessels/devices (WATCH/HUB/SENSE + SIM) | `COMPATIBILITY_EVIDENCE_REQUIRED` | 0 compatibility rows `SUPPORTED`; `N-16`/`N-17`/`N-19` are conditional or unknown; WATCH/HUB hardware not selected |
| Marina, management firm or multi-owner configuration (third-party vessel data) | `SPECIALIST_SURVEY_REQUIRED` | Data flows, controller/processor assessment, sharing grants and scoped access must be assessed per organization |
| Any configuration priced per site, with device enrollment, installation or service setup | `QUOTATION_REQUIRED` | No onboarding, installation, labour or connectivity price exists; `onboardingPricingEstablished = false` |
| Any request for a fixed package price, an all-in per-vessel price or a standard enterprise SKU | `NOT_ELIGIBLE` | No package price is established and Enterprise is a `CONTRACTED_TIER`; `fixedPackagePriceEstablished = false` |
| Any customer-facing publication, catalogue entry, CTA, quotation or sale attempt | `PUBLICATION_BLOCKED` | Brand `NOT_GRANTED`, no contract/DPA, no service, no approved price, no security evidence |

Rules: (1) a configuration may carry an ordered outcome chain, but the final release gate for every
chain is `PUBLICATION_BLOCKED`; (2) no outcome may be presented to a customer as an order acceptance;
(3) a blocked component blocks the configuration; (4) an unknown compatibility row is never treated
as compatible; (5) the same configuration rules apply to all six segments
(`BUNDLE-CONFIGURATION-RULES.md` D9 and `bundle-definitions.json` D17 are the machine authority).

---

## 7. Onboarding and fulfilment

### 7.1 Intended onboarding sequence (design requirement, not a delivered service)

1. **Scoping** — operation type, vessel count, roles, existing data sources, connectivity availability and the organization's own responsibilities. No price is quoted before costs exist.
2. **Verification** — organization identity and authority, first administrator verification, contract and data-processing terms. Blocked today: no DPA (X-07) and no verified seller identity (X-02).
3. **Inventory** — vessel register and profiles, equipment baseline, documents with expiry, personnel list, existing data to migrate.
4. **Governance design** — role design within the eight-role model, vessel scopes, sharing grants, external-installer boundaries, audit expectations.
5. **Configuration** — maintenance plans, work-order states, notification routing, report definitions within the purchased edition.
6. **Migration** — import of the baseline dataset; extended migration or cleaning is `QUOTATION_REQUIRED`.
7. **Device enrollment** — for each connected vessel: device identity binding, ownership verification, tenant-scoped telemetry credential, commissioning record (FP-04.3). Requires physical installation where applicable.
8. **Integration authorisation** — explicit, scoped, revocable; no integration is `SUPPORTED` and none exists.
9. **Verification** — test notification, test report, export test, access-review test and a rollback/recovery step.
10. **Training and handover** — administrator and daily-user training, bilingual material, acceptance record signed by the organization.
11. **Acceptance** — an onboarding acceptance record is a prerequisite of per-vessel billing and of any support commitment.

### 7.2 Fulfilment model

| Fulfilment element | Intended route | Status |
| --- | --- | --- |
| FLEET SaaS provisioning | EMBARCARTE direct (platform) | `BLOCKED` — no multi-tenant service (P-09) |
| Onboarding, migration, training | EMBARCARTE professional services, quoted separately | `OPEN`/`BLOCKED` — no operation, no price (X-05, X-06) |
| WATCH/HUB/SENSE hardware supply | EMBARCARTE or channel, separately purchased | `BLOCKED` — hardware `NOT_SELECTED`; no stock or lead time |
| Device installation | Installer-led, quoted after assessment | `BLOCKED` — no installer network or rate card |
| Connectivity/SIM | Provider contract, external | `BLOCKED` — `FLEET_CONNECTIVITY_CONTRACT = NOT_FOUND` (H-12) |
| Support | Edition support entitlement within published boundaries | `OPEN` — no support desk, no severities |
| Contract and DPA | Legally executed B2B agreement | `BLOCKED` — no contract template, no DPA, no seller identity (X-02, X-07) |

No onboarding duration, no installation duration, no onboarding price, no installer certification
scheme and no delivery date exists; none may be invented. Onboarding labour is never promised as
included in the subscription hypothesis.

---

## 8. Tenancy, role and security boundary

### 8.1 Design requirements (not tested behaviour)

| Requirement | Design statement | Evidence state |
| --- | --- | --- |
| Organization identity | Exactly one owning organization per tenant resource; organization id server-generated, opaque and never trusted from the client | `DESIGN_ONLY`; `FLEET_MULTI_TENANT_SERVICE = NOT_FOUND` |
| Server-side authorization | Every sensitive operation authorised server-side; deny by default; tenant derived from the authenticated session | `DESIGN_ONLY`; `FLEET_TENANT_ISOLATION_TEST = NOT_EXECUTED` |
| Membership | Single-use, expiring invitations; acceptance verifies identity; removal and suspension take effect on the next request | `DESIGN_ONLY` |
| Eight roles | `ORGANIZATION_OWNER`, `ORGANIZATION_ADMIN`, `FLEET_MANAGER`, `MAINTENANCE_MANAGER`, `CREW_MEMBER`, `READ_ONLY_VIEWER`, `EXTERNAL_INSTALLER` (scoped, time-bound, vessel-level), `EMBARCARTE_SUPPORT` (scoped, audited, time-bound) | `DESIGN_ONLY`; no ninth role |
| Vessel assignment | Assignment is reach, not permission; a vessel-level assignment never expands a role; removal is immediate | `DESIGN_ONLY` |
| Device ownership | A device is bound to at most one organization and one vessel; binding requires an authenticated human action; device credential resolves the tenant | `DESIGN_ONLY`; `FLEET_DEVICE_IDENTITY = NOT_FOUND` |
| Sharing grants | Explicit, scoped, revocable grants to installers/managers/surveyors; no membership, no billing visibility, no export | `DESIGN_ONLY` |
| Export permissions | Owner and authorised admin can export the organization's own data; export is offered before cancellation, termination and deletion | `DESIGN_ONLY` |
| Auditability | Append-only, tenant-scoped audit of membership, role, vessel, device, support, export, deletion and subscription events | `DESIGN_ONLY`; `FLEET_AUDIT_LOG = NOT_FOUND` |
| Immediate revocation | Removed members, expired grants and revoked devices are denied on every surface on the next request; no numeric timing promise | `DESIGN_ONLY`, `NOT_EXECUTED` |
| Support access | Customer-authorised, scoped, time-bound, audited; support never becomes an organization administrator | `DESIGN_ONLY`; design requirement only |

### 8.2 The package-specific rules

1. **A device included in a package does not confer tenant access automatically.** Enrollment binds a
   device to the organization; it does not create a membership, a role or a vessel assignment.
2. **An installer never becomes an unrestricted organization administrator.** The `EXTERNAL_INSTALLER`
   grant is scoped to named vessels/devices and expires; it can never be converted into a member role.
3. **No cross-tenant access.** Organization A can never read, modify, export, search or infer
   organization B's data; a client-supplied tenant id is rejected or ignored.
4. **FLEET never commands a vessel.** Telemetry is read-only; there is no steering, throttle, motor,
   helm, firmware, bus or cloud-to-actuator path, and none is planned.
5. **No fabricated service level.** `FLEET_SLA = NO_SLA_ESTABLISHED`; any SLA exists only as a
   contracted, measurable commitment.
6. **No security certification** of any kind exists or is claimed; tenant isolation, role scoping,
   audit, export and deletion are design requirements, not verified behaviour.
7. **No customer production data is used** anywhere in this programme; future pilots require a signed
   DPA, a DPIA and explicit customer authorisation.

---

## 9. Entitlement and billing split

The package is not one billing object. Each cost family has its own basis, invoice line and status.

| Cost family | Commercial object | Billed by | Billing unit | Price status | Notes |
| --- | --- | --- | --- | --- | --- |
| FLEET software subscription | SaaS entitlement | EMBARCARTE | per vessel per month, VAT excluded | `HYPOTHESIS_UNAPPROVED` (Start/Business); `NOT_ESTABLISHED` (Enterprise) | Required; never includes hardware, connectivity, onboarding or installation |
| Organisation onboarding | Professional service | EMBARCARTE | per organization, fixed scope quotation | `NOT_ESTABLISHED` | Quoted separately; acceptance record is a billing prerequisite |
| Vessel registration / data migration | Professional service | EMBARCARTE | per organization, scope-based | `NOT_ESTABLISHED` | Baseline included in onboarding scope; extended migration quoted |
| Personnel/permission setup | Software configuration within onboarding | EMBARCARTE | included in onboarding service | included | No per-seat charge in Start/Business as a hypothesis |
| Training | Professional service | EMBARCARTE | per session/user group | `NOT_ESTABLISHED` | Quoted separately |
| Device enrollment | Professional service | EMBARCARTE | per connected device | `NOT_ESTABLISHED` | Required for each connected vessel; not applicable software-only |
| WATCH hardware | Hardware acquisition | EMBARCARTE or channel | per unit | `HYPOTHESIS_UNAPPROVED` (EUR 299 hypothesis) | Never included in the SaaS fee |
| WATCH monitoring subscription | Service subscription | EMBARCARTE | per vessel per month | `HYPOTHESIS_UNAPPROVED` (hypothesis) | Connectivity/SIM not included; contents `OPEN` |
| HUB hardware | Hardware acquisition | EMBARCARTE or channel | per unit | `HYPOTHESIS_UNAPPROVED` (EUR 349 hypothesis) | Optional; never included |
| SENSE modules | Hardware acquisition | EMBARCARTE or channel | per module | entry-module hypothesis only; others `NOT_ESTABLISHED` | Optional; no kit is invented |
| Cellular connectivity / SIM | External data service | Connectivity provider | per device per contract | `NOT_ESTABLISHED` | Required per connected device; never included |
| Installation | Installation labour | EMBARCARTE or installer partner | per site/vessel quotation | `NOT_ESTABLISHED` | Optional; quotation-led |
| Maintenance/service setup | Professional service | EMBARCARTE | per site/vessel quotation | `NOT_ESTABLISHED` | Optional; quotation-led |
| Professional support | Edition support entitlement | EMBARCARTE | included in the edition | included; no separate amount | Boundaries and response model `OPEN`; `NO_SLA_ESTABLISHED` |
| Contracted integrations | Professional/engineering service | EMBARCARTE | per contract | `NOT_ESTABLISHED` | Conditional on a signed contract and review |
| Optional contracted SLA | Contracted commitment | EMBARCARTE | per contract | `NOT_ESTABLISHED` | Only where measurable and contracted; otherwise `NO_SLA_ESTABLISHED` |
| Additional vessels | SaaS entitlement | EMBARCARTE | per vessel per month | edition-rate hypothesis | Beyond the published allowance; limits `OPEN` |

Rules: one account and one entitlement ledger per customer; no capability is billed twice across MAREA
products; a FLEET subscription never includes hardware, connectivity, charts or weather; WATCH never
creates a FLEET tenancy; a lapsed subscription may degrade the paid service but never blocks export of
the organization's own records and never disables local safety functions of any device.

---

## 10. Pricing model — the three SIP hypotheses and no package price

### 10.1 The three SIP hypotheses (SaaS subscription price hypotheses for the FLEET product family)

| Ref | Edition | Hypothesis | Period and unit | VAT basis | Status | Binding qualification |
| --- | --- | --- | --- | --- | --- | --- |
| SIP-1 | `FLEET-START` | from EUR 49 per vessel per month | monthly, per vessel | VAT excluded | `HYPOTHESIS_UNAPPROVED` | Starting price only; organisation fee hypothesis none; seats included as a hypothesis; limits `OPEN`; onboarding, installation, connectivity and hardware **not included** |
| SIP-2 | `FLEET-BUSINESS` | EUR 79 per vessel per month | monthly, per vessel | VAT excluded | `HYPOTHESIS_UNAPPROVED` | Richer permissions, workflows, reporting and integrations; volume terms quoted; onboarding, installation, connectivity and hardware **not included** |
| SIP-3 | `FLEET-ENTERPRISE` | no amount — `NOT_ESTABLISHED` | contracted | `OPEN` (negotiated) | `CONTRACTED_TIER` | Negotiated contract, not a checkout SKU; no invented SLA, no unlimited scope, no published amount |

These three figures are the only FLEET SaaS amounts permitted; they are not offers, not "from" prices in
a sales sense, not launch or discount prices and not orderable. D-014 is the binding decision.

### 10.2 Component hypotheses (recorded, never summed into a package price)

| Component | Hypothesis | Status | Qualification |
| --- | --- | --- | --- |
| WATCH-CORE hardware | EUR 299 | `HYPOTHESIS_UNAPPROVED` | Connectivity/SIM and installation not included |
| WATCH-CORE monitoring subscription | from EUR 9.90 per month | `HYPOTHESIS_UNAPPROVED` | Contents, connectivity cap, device/user count and retention `OPEN` |
| HUB-STANDARD | EUR 349 | `HYPOTHESIS_UNAPPROVED` | Installation, cabling and accessories not included |
| SENSE entry module | from EUR 99 | `HYPOTHESIS_UNAPPROVED` | Cheapest single-module starting hypothesis only; other modules `NOT_ESTABLISHED` |
| Onboarding, migration, training, enrollment, installation, maintenance setup, connectivity, contracted integrations, optional SLA, package as a whole | none | `NOT_ESTABLISHED` | Quotation required; no BOM, labour rate, provider quote or supplier cost exists (X-05) |

### 10.3 The no-package-price rule

- **`fixedPackagePriceEstablished = false`.** No package price exists in MC-08 and none may be inferred
  by adding the hypotheses above: the sum of unapproved component hypotheses is not a costed package.
- **`onboardingPricingEstablished = false`.** No onboarding price exists; onboarding is a quotation.
- The package commercial model is **bespoke and contracted** (`contractedSolution = true`): an itemised
  quotation after a documented assessment, only when legally and operationally permissible. The
  machine-contract pricing verdict is `BESPOKE_QUOTATION_ONLY` with `fixedTurnkeyPriceApproved = false`,
  `quoteRequired = true` and `totalPriceEstablished = false` (`bundle-definitions.json`, FLEET entry).
- The historical "bespoke" portfolio wording is retained as context only
  (`COMMERCIAL-PORTFOLIO.md` bundle table); it is not a price, a range or an implied amount.
- No package or component discount, volume band, annual-prepayment discount or partner margin exists;
  all are `OPEN`/`NOT_ESTABLISHED`.
- VAT basis for the SaaS hypotheses is VAT excluded; territorial tax treatment, place of supply and
  invoicing entity are `OPEN` and depend on the seller legal identity (X-02).

---

## 11. Journey, copy and asset pointers

| Reference | Path | Status |
| --- | --- | --- |
| FLEET product journeys (organisation onboarding, vessel addition, ownership change, work order, external technician, role change, revocation, monitoring outage, cross-organisation attempt, upgrade, export/deletion, termination) | `docs/marea/products/CUSTOMER-JOURNEYS-DISPLAY-WEATHER-FLEET.md` §7.1–§7.12 (FJ-1 to FJ-12) | `VERIFIED_REPO`; stages execute as design intent, not as a service |
| FLEET product copy (product, not package) | `docs/marea/products/copy/fleet.es.md`, `docs/marea/products/copy/fleet.en.md` | `VERIFIED_REPO`; internal draft |
| Package copy (this deliverable) | `docs/marea/bundles/copy/fleet-package.es.md`, `docs/marea/bundles/copy/fleet-package.en.md` | `VERIFIED_REPO`; internal draft, 24 numbered sections each |
| Bundle architecture contract | `docs/marea/bundles/BUNDLE-ARCHITECTURE.md` | `VERIFIED_REPO` |
| Bundle composition matrix | `docs/marea/bundles/BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` | `VERIFIED_REPO` |
| Configuration rules (machine behaviour) | `docs/marea/bundles/bundle-definitions.json` (D17: FLEET entry lines `FP-01`–`FP-11`) and `docs/marea/bundles/BUNDLE-CONFIGURATION-RULES.md` (D9, §12.6 FLEET package resolution) | `VERIFIED_REPO`; rules and contract are internal definitions, never sale approvals |
| Entitlement matrix | `docs/marea/bundles/BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md` (D10) | `VERIFIED_REPO` |
| Pricing framework | `docs/marea/bundles/BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` (D11) | `VERIFIED_REPO` |
| Installation and quotation model | `docs/marea/bundles/BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` (D12) | `VERIFIED_REPO` |
| Bundle customer journeys | `docs/marea/bundles/BUNDLE-CUSTOMER-JOURNEYS.md` (D13) | `VERIFIED_REPO`; 17-stage journeys remain design intent |
| Bundle customer comparison | `docs/marea/bundles/BUNDLE-CUSTOMER-COMPARISON.md` (D14) | `VERIFIED_REPO`; internal comparison, no published page |
| FLEET product assets | `docs/marea/products/PRODUCT-ASSET-REQUIREMENTS-BATCH-03.md` (`FLEET-HERO-01` … `FLEET-TEC-10`) | `VERIFIED_REPO`; every asset `CONCEPT`, four scene requirements `BLOCKED_ON_IMAGE_GENERATION` (X-03) |
| Bundle asset plan | `docs/marea/bundles/BUNDLE-ASSET-REQUIREMENTS.md` (D16): package assets `FLEETPKG-HERO-01` … `FLEETPKG-TEC-10` | `VERIFIED_REPO`; every package asset is a planning requirement, `CONCEPT` / `BLOCKED_ON_IMAGE_GENERATION` (X-03) |
| Brand family lockup (internal design input only) | `docs/marea/brand/assets/logo/family/marea-family-fleet-lockup.svg` | `VERIFIED_REPO`; internal vector input, never proof of a MAREA identity or a product |
| Ecosystem overview diagram (illustrative) | `docs/marea/brand/assets/diagrams/marea-ecosystem-overview.svg` | `VERIFIED_REPO`; illustrative, no compatibility claim |

Copy rules for the two package copy files (this deliverable): exactly 24 numbered sections; ES Spain
Spanish and EN international English; the names `MAREA FLEET`, `MAREA FLEET Start`, `MAREA FLEET
Business`, `MAREA FLEET Enterprise` and `MAREA FLEET package` are never translated; the product-family
versus package distinction appears wherever the sense is ambiguous; no currency amount, no purchase
CTA, no stock, no review, no certification, no availability, no uptime and no SLA figure; the approved
navigation, AIS receive-only and FLEET limitation statements appear verbatim; internal draft status is
stated.

---

## 12. Future acceptance criteria

Every scenario is `NOT_EXECUTED`; none is claimed to pass. A scenario passes only with a recorded
result naming environment, data, operator and date, reviewed independently.

| ID | Scenario | Acceptance evidence |
| --- | --- | --- |
| FLEET-PKG-AC-01 | Organization onboarding end to end: verification, vessel import, role design, training and signed acceptance record | Onboarding record, acceptance document, evidence that billing waits for acceptance |
| FLEET-PKG-AC-02 | Organisation identity and first administrator verified before any vessel or billing right is granted | Verification record, refusal tests for duplicate or fraudulent organizations |
| FLEET-PKG-AC-03 | The eight roles behave exactly as specified, including vessel-level narrowing and immediate revocation | Positive and negative authorization tests per role, permission-change test |
| FLEET-PKG-AC-04 | External-installer grant is scoped, time-bound, vessel-level and never escalates to administrator | Scoping test, expiry test, attempted-escalation negative test |
| FLEET-PKG-AC-05 | Tenant isolation: organization A cannot read, modify, export, search or infer organization B | Two-tenant negative suite; tenant-id tampering test |
| FLEET-PKG-AC-06 | A package-included device confers no tenant access by itself and is bound only through an authenticated commissioning action | Binding record, unauthorized-claim negative test |
| FLEET-PKG-AC-07 | Device enrollment and commissioning produce a correct tenant-scoped credential and audit record | Enrollment record, credential-scope test, audit entry |
| FLEET-PKG-AC-08 | Read-only telemetry from the optional source shows source, timestamp, freshness and age; a disconnected vessel is never shown online | Controlled disconnect test, freshness-state evidence |
| FLEET-PKG-AC-09 | No write-back to WATCH/HUB and no cloud-to-actuator path exists in the package configuration | Outbound-traffic audit, negative command test |
| FLEET-PKG-AC-10 | Package versus subscription separation: a FLEET subscription invoice contains no hardware, connectivity, onboarding or installation line, and the package invoice contains no implied second SaaS | Invoice comparison test, entitlement-ledger reconciliation |
| FLEET-PKG-AC-11 | Per-vessel subscription accounting, plan change, grace and cancellation reconcile | Billing records, reconciliation test, lapsed-export test |
| FLEET-PKG-AC-12 | Export, retention and deletion follow the documented policy and are audited | Export completeness test, deletion record, legal-hold test |
| FLEET-PKG-AC-13 | Support access is customer-authorised, scoped, time-bound and audited; no standing superuser session | Support-grant audit, customer-visible support history |
| FLEET-PKG-AC-14 | Optional contracted SLA exists only where measurable and contracted; otherwise the surface states `NO_SLA_ESTABLISHED` and publishes no uptime figure | Contract record, measurement evidence, surface evidence |
| FLEET-PKG-AC-15 | Bilingual ES/EN parity for interface, notifications, reports and legal notices | String inventory comparison, reviewer sign-off |
| FLEET-PKG-AC-16 | Package copy and any future page contain no price, no purchase CTA, no availability, certification or SLA claim | Copy audit against claims policy and this specification |
| FLEET-PKG-AC-17 | No customer production data is used in any test, demo or training | Synthetic-data attestation, data-inventory check |
| FLEET-PKG-AC-18 | Cross-organization deployment review: no MAREA product is presumed included in another and no tenth family exists | Composition audit against `BUNDLE-ARCHITECTURE.md` §2 and §6.6 |

---

## 13. Release readiness and blockers

### 13.1 Release readiness

| Gate | Status | Meaning |
| --- | --- | --- |
| `BUNDLE_RELEASE_READINESS` | `BLOCKED` | Cannot be offered, quoted as deliverable, published or sold |
| `PUBLICATION_STATE` | `INTERNAL_ONLY` | No public page, route, catalogue entry or checkout exists or is created |
| `COMMERCIAL_AVAILABILITY` | `NOT_FOR_SALE` | No order flow, no stock, no lead time, no contract |
| `FLEET_SERVICE` | `NOT_IMPLEMENTED` | No multi-tenant service, no isolation, no telemetry ingestion, no billing |
| `FLEET_SLA` | `NO_SLA_ESTABLISHED` | No uptime or response commitment |
| `SECURITY_CERTIFICATION` | `NONE` | No ISO/IEC 27001, SOC 2 or other certification exists or is claimed |
| `IMAGE_GENERATION` | `BLOCKED` (X-03) | No package visual exists |

### 13.2 Blockers

| Blocker | What it means for the package | Closed only by |
| --- | --- | --- |
| P-09 | No multi-tenant SaaS, tenant isolation, telemetry ingestion or billing/entitlement service | New SaaS domain model, server-side authorization, isolation tests, ingestion, billing |
| X-07 | No authorization implementation, no DPA/DPIA, no privacy or incident-response model | Threat model, DPIA, DPA, subprocessor register, executed isolation tests |
| X-05 | No costed onboarding, installation, hardware, connectivity or support | Real quotes, bottom-up costing, approved price list, channel terms |
| X-06 | No customer interviews, pilot or validated willingness to pay | Structured discovery and price testing |
| X-01 | MAREA brand not cleared | Trademark clearance and filing |
| X-02 | Seller legal identity absent | Verified registry and tax data, contract template |
| H-12 | No connectivity contract or SIM/roaming terms | Connectivity model decision, provider quotes, coverage validation |
| H-13 | CRA obligations; no vulnerability handling, secure update, SBOM or incident reporting | Security-by-design process, SBOM, update policy, incident reporting |
| D-09, D-10 | AIS-derived retention and external data rights not granted | Written data-rights and retention decisions |
| P-06 | WATCH ingestion, notification pipeline, device identity, subscription service and connectivity contract absent | Built WATCH service with delivery records and device identity |
| H-04, H-05, H-07, H-08, H-11 | No tested compatibility rows; hardware not selected | Device/firmware matrix tests, hardware selection and conformity |
| X-03 | No image generation capability | Written budget authorisation and a pilot asset |

### 13.3 Minimum conditions before the package could be offered

A deployed multi-tenant service with executed positive and negative isolation tests; a tested
eight-role matrix with scoped installer and support access; real read-only telemetry from at least one
authorised source; a billing and entitlement service with per-vessel accounting and export on lapse;
written contract terms, DPA, subprocessor register, DPIA and retention schedule; demonstrated CRA
readiness; a measured onboarding operation with acceptance record; connectivity and provider terms for
every enabled source; approved pricing and channel terms; brand clearance; and a written support model
with an SLA only if measured and contracted. Until then the package remains `BLOCKED` and
`INTERNAL_ONLY`.

---

## 14. Required disclaimers (verbatim, ES and EN)

These statements must appear, in the product's language and unaltered, wherever the package is
described externally and in both package copy files. The FLEET limitation statement is INTERNAL DRAFT
wording pending claims-register approval; the navigation and AIS statements are the approved wording
of `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9.

**Navigation / instruments (required because FLEET surfaces position and vessel data)**

- ES: «Este producto es una ayuda a la navegación y no sustituye a la carta náutica oficial, al equipo reglamentario de la embarcación, a la vigilancia continuada ni al buen hacer marinero. La responsabilidad de la navegación corresponde siempre al patrón.»
- EN: "This product is a navigational aid. It does not replace official nautical charts, the vessel's required equipment, continuous watchkeeping or good seamanship. Responsibility for navigation always rests with the skipper."

**AIS receive-only (required wherever AIS-derived context may be shown)**

- ES: «La recepción AIS es únicamente de escucha: no todos los buques emiten AIS. No constituye un sistema de evitación de colisiones ni un transpondedor.»
- EN: "AIS reception is receive-only: not every vessel transmits AIS. It is not a collision-avoidance system and not a transponder."

**MAREA FLEET limitation statement (internal draft, README §28 wording)**

- ES: «MAREA FLEET es un diseño interno: no existe un servicio multiempresa desplegado ni una certificación de seguridad, y no se garantiza ningún nivel de servicio. La telemetría es de solo lectura y nunca permite gobernar la embarcación.»
- EN: "MAREA FLEET is an internal design: no deployed multi-tenant service and no security certification exist, and no service level is guaranteed. Telemetry is read-only and never allows steering the vessel."

**Brand attribution**

- ES: «MAREA es una marca de producto de EMBARCARTE.»
- EN: "MAREA is a product brand of EMBARCARTE."

---

## 15. The 24 mandatory bundle fields (B01–B24)

Every field below uses the binding five-line block of `BUNDLE-ARCHITECTURE.md` §7. The definition
describes the intended package; the evidence line labels it; the owner names a function, never a
person; references cite the governing document and section; release readiness states
`definition = COMPLETE_TARGET_SPECIFICATION` and the field's binding gate.

#### B01 — Identity

- **Definition.** The `MAREA FLEET package` is the sixth MC-08 commercial bundle (bundle id `FLEET`, machine `displayName` `MAREA FLEET`, customer-facing name `MAREA FLEET package`). It is a broader professional B2B solution that MAY combine the existing MAREA FLEET product family SaaS subscription (`FLEET-START`, `FLEET-BUSINESS`, or the contracted `FLEET-ENTERPRISE` tier), organisation onboarding, vessel registration and initial data migration, personnel/permission and user setup, training, device enrollment for connected vessels, per-edition professional support and optional compatible vessel equipment (WATCH-CORE, HUB-STANDARD, SENSE modules), optional installation and required external cellular connectivity. It is **not** a tenth MAREA product family and **not** a second SaaS: its only product-family content is the existing `FLEET` family. It is a composition, `DEFINED` internally and `NOT_FOR_SALE`, with no SKU, no stock, no price and no publication.
- **Evidence.** `VERIFIED_REPO` `docs/marea/bundles/BUNDLE-ARCHITECTURE.md` §1, §2, §6.6; `VERIFIED_REPO docs/marea/brand/brand-identity.contract.json` `bundles` and `fleetDisambiguation`; `VERIFIED_REPO docs/marea/products/README.md` §2; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` bundle table; `OPEN` on commercial availability and service (`FLEET_MULTI_TENANT_SERVICE = NOT_FOUND`).
- **Owner.** B2B Fleet Solutions Director (commercial definition), with FLEET Product Management (product scope) and commercial operations (contract/quotation).
- **References.** `BUNDLE-ARCHITECTURE.md` §1–§2, §6.6; `brand-identity.contract.json`; `COMMERCIAL-PORTFOLIO.md` bundle architecture; `MAREA-FLEET-COMMERCIAL-SPEC.md` F01, §5.3.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; bundle lifecycle `DEFINED`; `availability = NOT_FOR_SALE`; `publication = INTERNAL_ONLY`; commercial release `BLOCKED`.

#### B02 — Commercial purpose

- **Definition.** The package exists so that a professional operator can buy one itemised, contracted fleet solution instead of assembling the SaaS, setup services, optional monitoring equipment and connectivity itself. Its commercial purpose is to make the total solution enumerable: the required software subscription, the required human work (onboarding, migration, role design, training, device enrollment), the optional equipment and installation, and the external connectivity each have their own line, their own price basis and their own responsibility. It is not a device bundle, not a hardware discount vehicle and not a mechanism for hiding mandatory accessories or labour. Demand, willingness to pay and segment fit are unproven assumptions: no interview, pilot, price test or customer reference exists.
- **Evidence.** `VERIFIED_REPO` `BUNDLE-ARCHITECTURE.md` §5 (composition principles) and §6.6; `VERIFIED_REPO docs/marea/products/MAREA-FLEET-COMMERCIAL-SPEC.md` §5.3 and F13; `HYPOTHESIS` on the commercial value; `OPEN` — no demand evidence (X-06).
- **Owner.** B2B Fleet Solutions Director with commercial strategy.
- **References.** `BUNDLE-ARCHITECTURE.md` §5, §6.6; `MAREA-FLEET-COMMERCIAL-SPEC.md` §5.3, F13; `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §10.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; `pricing = HYPOTHESIS_UNAPPROVED`; demand evidence `OPEN` (X-06); release `BLOCKED`.

#### B03 — Ideal customer

- **Definition.** The ideal customer is an organisation, not an individual consumer: a charter company (10–150 vessels, mixed owned and managed), a sailing school (4–25 boats), a marina (50–500 berths with customer vessels under care), a marine maintenance provider (10–200 vessels serviced across owners), a small vessel management firm (2–25 vessels managed for owners) or a professional operator managing several vessels (3–50 vessels). Common traits, stated as assumptions: several vessels, shared shore staff, informal current permission model (shared logins, messages, spreadsheets), document-expiry and maintenance exposure, and a buyer who is an owner, managing director, operations director or marina director. Explicit non-customers: deep-sea shipping and tanker/offshore ERP buyers, naval or command-and-control users, insurers seeking underwriting data, consumers, and any buyer seeking remote vessel control. Fleet bands and segment priorities are planning assumptions, not market evidence.
- **Evidence.** `VERIFIED_REPO docs/marea/products/MAREA-FLEET-COMMERCIAL-SPEC.md` §6 (S1–S6) and `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` §4.5–§4.7 (suggested bands); `ASSUMPTION` segment mapping and priorities; `OPEN` — no interviews or validated willingness to pay (X-06).
- **Owner.** Product marketing and B2B commercial development.
- **References.** `MAREA-FLEET-COMMERCIAL-SPEC.md` §6; `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` §4.5–§4.7; this document §5.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; segment facts `HYPOTHESIS`; `availability = NOT_FOR_SALE`.

#### B04 — Vessel or organization applicability

- **Definition.** The package applies to a professional **organization** that operates or manages at least one vessel and needs shared shore staff, roles and an operational record. Minimum applicability: a verified organization identity, a verified first administrator, at least one registered vessel, and acceptance of the data-processing terms. Vessel applicability is per vessel: the SaaS has no vessel-type restriction beyond the customer's own operational data, while connected equipment is applicable only where a compatible, tested hardware configuration and connectivity exist for that vessel. The package does not apply to individual consumer use, to single-use rental with no organization, to vessels that cannot be registered to exactly one organization, or to any requirement for remote or autonomous control. Third-party vessel access (marina, management firm, maintenance provider) requires an explicit sharing grant and a multi-owner data-governance assessment. All applicability facts beyond the organization model are `ASSUMPTION`/`OPEN`.
- **Evidence.** `VERIFIED_REPO docs/marea/products/FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md` §3, §4; `VERIFIED_REPO MAREA-FLEET-COMMERCIAL-SPEC.md` F01, F09; `ASSUMPTION` package applicability; `OPEN` — compatibility per vessel not established (0 `SUPPORTED` rows).
- **Owner.** B2B Fleet Solutions Director with FLEET Product Management.
- **References.** Tenancy contract §3–§4; `MAREA-FLEET-COMMERCIAL-SPEC.md` F01, F09; `PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` §2.3.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; `hardware = NOT_SELECTED`; `availability = NOT_FOR_SALE`.

#### B05 — Main customer outcome

- **Definition.** The main outcome is one organization tenant that becomes the operational system of record for the fleet: every vessel, its profile, equipment, maintenance plan, work orders, service history, documents and expiry, incidents, events, assignments, reports, exports and audit in one place; named people with eight server-enforced roles and vessel-level assignments; and, only where the organization authorises a compatible source, read-only telemetry shown with its source and age, never as a command and never with a disconnected vessel shown as online. The package adds the human work and optional equipment needed to reach that outcome — onboarding, migration, training, device enrollment, optional monitoring hardware and installation — each as an explicit line. The outcome never includes availability, security certification or an SLA commitment.
- **Evidence.** `VERIFIED_REPO` `MAREA-FLEET-COMMERCIAL-SPEC.md` F04, §4; `VERIFIED_REPO` tenancy contract §3–§13; `VERIFIED_REPO` `BUNDLE-ARCHITECTURE.md` §6.6; `OPEN` — the end-state experience is not built (`FLEET_MULTI_TENANT_SERVICE = NOT_FOUND`).
- **Owner.** FLEET Product Management with UX and customer success.
- **References.** `MAREA-FLEET-COMMERCIAL-SPEC.md` F04, §4; tenancy contract §3–§13; `BUNDLE-ARCHITECTURE.md` §6.6.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; `engineering = NOT_VERIFIED`; release `BLOCKED`.

#### B06 — Mandatory base components

- **Definition.** The mandatory base is the FLEET SaaS subscription (`FLEET-START` or `FLEET-BUSINESS`; `FLEET-ENTERPRISE` only as a contracted tier) plus the required professional services: organisation onboarding, fleet/vessel registration and initial data migration, personnel/permissions and user setup within the eight-role model, training, device enrollment for every connected vessel, and the per-edition professional support entitlement. The tenancy, role, authorization, audit, export/deletion and read-only telemetry boundary are included in every edition and are not optional add-ons. A B2B contract and a data-processing agreement are mandatory preconditions, not purchasable lines. Onboarding and migration are required services quoted separately; their price is not established and is never implied by the per-vessel hypothesis. Optional equipment, installation and connectivity are explicitly **not** part of the mandatory base.
- **Evidence.** `VERIFIED_REPO` `BUNDLE-ARCHITECTURE.md` §6.6 F-01–F-04, F-11; `VERIFIED_REPO docs/marea/bundles/BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` §3.6 FP-01–FP-04, FP-11; `VERIFIED_REPO` `MAREA-FLEET-COMMERCIAL-SPEC.md` F07; `OPEN` — no service operation, no onboarding price (X-05, X-06).
- **Owner.** B2B Fleet Solutions Director with FLEET Product Management and customer success.
- **References.** `BUNDLE-ARCHITECTURE.md` §6.6; `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` §3.6; `MAREA-FLEET-COMMERCIAL-SPEC.md` F07, F10, F11; this document §3.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; services `NOT_ESTABLISHED`; release `BLOCKED`.

#### B07 — Optional components

- **Definition.** Optional components are: WATCH-CORE per vessel for monitoring and alerts (with its own required subscription and external connectivity), HUB-STANDARD as an optional local data gateway, existing SENSE modules through a verified WATCH/HUB path, installation and maintenance/service setup quoted per site or vessel, contracted integrations and an optional contracted SLA, additional vessels beyond the published allowance, extended data migration beyond the baseline, and additional training. Every optional component is separately purchased, separately priced by hypothesis or quotation, and never presented as included in the subscription or in another component. No new module, kit or edition is created by this package; where a kit exists in the family authority, the kit and its loose modules are never counted twice. Optional hardware availability is `NOT_SELECTED` and connectivity terms do not exist.
- **Evidence.** `VERIFIED_REPO` `BUNDLE-ARCHITECTURE.md` §6.6 F-05–F-10; `VERIFIED_REPO` `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` §3.6 FP-05–FP-10, FP-16; `VERIFIED_REPO` editions authority for optional component ids; `OPEN`/`BLOCKED` — hardware, connectivity and installation costs do not exist (H-12, X-05).
- **Owner.** B2B Fleet Solutions Director with product management and commercial operations.
- **References.** `BUNDLE-ARCHITECTURE.md` §6.6; `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` §3.6; `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §4.2; `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §3.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; optional hardware `NOT_SELECTED`; `availability = NOT_FOR_SALE`.

#### B08 — Required product editions

- **Definition.** The package references exactly these existing editions: `FLEET-START` or `FLEET-BUSINESS` as the required SaaS subscription (one reference edition per configuration; never both counted as two subscriptions), and `FLEET-ENTERPRISE` only as a `CONDITIONAL` contracted tier with no standard price and no invented SLA. The optional hardware lines reference `WATCH-CORE`, `HUB-STANDARD` and existing SENSE modules; those are optional components, not required editions of the package. No other edition is invented, renamed or re-verdictised; in particular `PILOT-PRO`, `DISPLAY-LARGE-CONDITIONAL` and any conditional edition are `INELIGIBLE`. Edition ids and verdicts come from the editions authority and decisions D-007, D-008, D-011, D-012; the package cannot add an edition.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` §1.4, §4.5–§4.7; `VERIFIED_REPO BUNDLE-ARCHITECTURE.md` §2, §6.6; `VERIFIED_REPO docs/marea/execution/DECISION-LOG.md` D-012, D-014; `OPEN` — numeric limits and Enterprise scope not fixed.
- **Owner.** FLEET Product Management with commercial strategy.
- **References.** Editions authority §1.4, §4.5–§4.7; D-012, D-014; `BUNDLE-ARCHITECTURE.md` §6.6.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; edition verdicts unchanged; `pricing = HYPOTHESIS_UNAPPROVED`.

#### B09 — Explicit exclusions

- **Definition.** The package explicitly excludes: any hardware included by default or in the per-vessel SaaS fee; cellular connectivity, SIM or data plans from the SaaS or hardware price; any MAREA product not listed as an optional line — NAV, AIS, DISPLAY, WEATHER and PILOT are `NOT_INCLUDED` (PILOT permanently `INELIGIBLE` because FLEET never commands a vessel); charts and third-party licensed data; a fixed package price, an onboarding price or an enterprise contract; any SLA or uptime figure beyond a measured, contracted commitment; any security certification; any customer reference, logo or testimonial; "unlimited" vessels, users, storage, API calls, support or availability; a distress, rescue or SOLAS/GMDSS service; a safety-management system, classification-society approval or regulatory certificate; remote, cloud-mediated or autonomous vessel control; a public fleet map or public vessel directory; cross-tenant access; consumer use; and any capability, service or price not written in this specification or in a signed contract.
- **Evidence.** `VERIFIED_REPO` `BUNDLE-ARCHITECTURE.md` §6.6 and §9; `VERIFIED_REPO` `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` §5; `VERIFIED_REPO` `MAREA-FLEET-COMMERCIAL-SPEC.md` F07, F09, §5.2; `VERIFIED_REPO` `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` §7; `VERIFIED_REPO` claims policy §3, §6.
- **Owner.** B2B Fleet Solutions Director with legal and claims review.
- **References.** `BUNDLE-ARCHITECTURE.md` §6.6, §9; `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` §5; `MAREA-FLEET-COMMERCIAL-SPEC.md` §5.2; claims policy §3, §6.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; exclusions binding; release `BLOCKED`.

#### B10 — Dependency rules

- **Definition.** Dependency rules: the package cannot exist without a FLEET SaaS subscription; the subscription can exist without the package. No tenant may be provisioned before a verified organization, a verified administrator, a signed contract and a data-processing agreement. Onboarding acceptance precedes per-vessel billing and any support commitment. Device enrollment requires the FLEET subscription, a compatible device and external connectivity; WATCH requires its own monitoring subscription and connectivity; HUB requires its own purchase and installation; SENSE reaches FLEET only through a verified WATCH/HUB path. Installation requires a site or vessel assessment and is quoted. Contracted integrations require a signed contract, engineering and privacy review. An SLA exists only if it is measured and contracted. No duplicate family/edition line, no contradictory editions, no double subscription and no package inside a hardware purchase. A blocked component blocks the configuration.
- **Evidence.** `VERIFIED_REPO` `BUNDLE-ARCHITECTURE.md` §5, §8; `VERIFIED_REPO` `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` §6; `VERIFIED_REPO` `MAREA-FLEET-COMMERCIAL-SPEC.md` F09, F10, §8.3; `VERIFIED_REPO` tenancy contract §24; `OPEN` — dependency enforcement is not implemented.
- **Owner.** B2B Fleet Solutions Director with FLEET engineering and commercial operations.
- **References.** `BUNDLE-ARCHITECTURE.md` §5, §8; `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` §6; `MAREA-FLEET-COMMERCIAL-SPEC.md` F09, §8.3; tenancy contract §24.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; enforcement `NOT_IMPLEMENTED`; release `BLOCKED`.

#### B11 — Compatibility criteria

- **Definition.** Compatibility is stated per source, per device, per firmware version where applicable and per data direction, using the compatibility vocabulary `SUPPORTED` / `CONDITIONAL` / `PLANNED` / `UNKNOWN` / `BLOCKED`. Today **0 rows are `SUPPORTED`**. `FLEET` ← `WATCH` is `CONDITIONAL` (`N-16`; batch-02 `I-14` governs), `FLEET` ← `HUB` is `CONDITIONAL` (`N-17`; `I-15`), `FLEET` ← `AIS` is `CONDITIONAL` read-only (`N-18`; D-09), `FLEET` ← `NAV` is `PLANNED` only with explicit customer permission (`N-21`), `FLEET` ← `WEATHER` is `CONDITIONAL` per provider terms (`N-15`), `FLEET` ← `SENSE` is `UNKNOWN` (`N-19`; only via `N-16` and `I-10`/`I-24`), `FLEET` ↔ `PILOT` is `BLOCKED` for any control (`N-20`; read-only sub-case `I-22` remains conditional) and `FLEET` ↔ `DISPLAY` is `UNKNOWN` (`N-08`). No brand, connector, protocol name or sibling product creates compatibility; universal compatibility is never claimed and NMEA 2000 is never presented as certified. A configuration with any unverified integration is `COMPATIBILITY_EVIDENCE_REQUIRED`.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` §1.3, §2.3 (`N-16`–`N-21`), §4, §5; `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` `I-10`, `I-14`, `I-15`, `I-22`, `I-24`; `VERIFIED_REPO MAREA-FLEET-COMMERCIAL-SPEC.md` §8.3; `0 SUPPORTED` rows.
- **Owner.** Integration owner (FLEET Product Director) with the compatibility workstream.
- **References.** Compatibility document §2.3; batch-02 compatibility rows; `MAREA-FLEET-COMMERCIAL-SPEC.md` §8.3; README §19.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; `dataRights = NOT_GRANTED`; compatibility evidence required; release `BLOCKED`.

#### B12 — Installation requirements

- **Definition.** The software requires no vessel installation; the professional work around it is onboarding and data setup. Physical installation exists only where optional vessel equipment is bought: WATCH and HUB are installed and commissioned on the vessel, SENSE modules are mounted and connected, and any connected installation is installer-led and quoted after a site or vessel assessment. Device enrollment and commissioning require a scoped, time-bound `EXTERNAL_INSTALLER` grant or a member with the device permission; the installer never receives a long-term device credential and never becomes an organization administrator. Installation scope must name every included and excluded item: mounting, power, cabling, adapters, labour, commissioning record, training and handover. No installation duration, no installation price, no installer certification scheme and no self-install envelope is established; the package does not promise installation as included.
- **Evidence.** `VERIFIED_REPO` `MAREA-FLEET-COMMERCIAL-SPEC.md` F10; `VERIFIED_REPO` tenancy contract §6.5, §8.8; `VERIFIED_REPO` `BUNDLE-ARCHITECTURE.md` §6.6 F-09; `VERIFIED_REPO` `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` §4; `OPEN` — no installer network, no measured installation (X-05, X-06).
- **Owner.** Service operations with the installer network and FLEET product management.
- **References.** `MAREA-FLEET-COMMERCIAL-SPEC.md` F10; tenancy contract §6.5, §8.8; `BUNDLE-ARCHITECTURE.md` §6.6; `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` §4.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; `availability = NOT_FOR_SALE`; installation `QUOTATION_REQUIRED`.

#### B13 — Software entitlements

- **Definition.** The software entitlement is a time-limited right to use the FLEET platform for the purchased vessels and edition. It includes the organization tenant, the eight-role model, memberships and vessel assignments, the vessel registry and operational records, documents, incidents, events, notifications, audit, export and deletion, and the published edition limits — with tenant isolation, role enforcement, audit, export, deletion and the read-only telemetry boundary identical in every edition (never edition-gated). It is not a perpetual licence, it does not transfer ownership of third-party data, and it never includes hardware, connectivity, charts, weather data, onboarding, installation, custom development or support beyond the published entitlement. User seats are included and not charged per seat in Start and Business as a hypothesis; Enterprise seats are negotiated. No entitlement may disable the organization's access to export its own records, and a lapsed subscription degrades the paid service only.
- **Evidence.** `VERIFIED_REPO` `MAREA-FLEET-COMMERCIAL-SPEC.md` F07, F12, §4.1; `VERIFIED_REPO` tenancy contract §15, §16, §24; `VERIFIED_REPO` `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` §4.3; `OPEN` — limits, support level and seat count (X-05); `FLEET_BILLING_AND_ENTITLEMENT_SERVICE = NOT_FOUND`.
- **Owner.** FLEET Product Management with commercial strategy and legal.
- **References.** `MAREA-FLEET-COMMERCIAL-SPEC.md` F12; tenancy contract §15, §16, §24; editions authority §4.3.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; `licensing = NOT_CLEARED`; release `BLOCKED`.

#### B14 — Recurring subscriptions

- **Definition.** The recurring subscriptions in the package are: the required FLEET per-vessel subscription (monthly or annual, VAT excluded; Start/Business hypotheses, Enterprise contracted), the optional WATCH monitoring subscription required with any WATCH device (contents and caps `OPEN`; connectivity/SIM not included), and any optional contracted integration or SLA commitment written in a contract. Each subscription has its own term, renewal, grace, suspension and cancellation behaviour, and one account maintains one entitlement ledger. No subscription-free cloud monitoring exists; no subscription includes hardware; buying FLEET does not create a WATCH service and buying WATCH does not create a FLEET tenancy. A lapsed subscription must never block export or disable local safety functions of a device. Renewal terms, indexation, notice and refund rules are `OPEN`.
- **Evidence.** `VERIFIED_REPO` `BUNDLE-ARCHITECTURE.md` §6.6; `VERIFIED_REPO` `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` §7; `VERIFIED_REPO` `MAREA-FLEET-COMMERCIAL-SPEC.md` F12; `VERIFIED_REPO` `MAREA-WATCH-COMMERCIAL-SPEC.md` F12; `OPEN`/`BLOCKED` — no billing service, no terms (P-09, X-02, X-07).
- **Owner.** Commercial strategy with finance and legal.
- **References.** `BUNDLE-ARCHITECTURE.md` §6.6; `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` §7; `MAREA-FLEET-COMMERCIAL-SPEC.md` F12; `MAREA-WATCH-COMMERCIAL-SPEC.md` F12.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; `pricing = HYPOTHESIS_UNAPPROVED`; release `BLOCKED`.

#### B15 — External data and connectivity

- **Definition.** External data and connectivity are explicit, never included: cellular connectivity and SIM/data plans are required for every connected device and supplied by a connectivity provider on separate terms whose price is `NOT_ESTABLISHED`; `FLEET_CONNECTIVITY_CONTRACT = NOT_FOUND` (H-12), so coverage, roaming, caps, cost and recurring renewal are unquantified. Telemetry arrives read-only from an authorised WATCH/HUB/AIS source, with source, timestamp and freshness; a vessel with no data is shown offline/unknown, never online. Charts and weather data are separately licensed and not included. AIS-derived data remains receive-only and its retention/redistribution is `LEGAL_REVIEW_REQUIRED` (D-09). FLEET customer data belongs to the organization and is processed under a DPA that does not exist; position data may identify people and must be treated as personal data where it does. No customer production data is used.
- **Evidence.** `VERIFIED_REPO` `BUNDLE-ARCHITECTURE.md` §6.6 F-08; `VERIFIED_REPO` `MAREA-FLEET-COMMERCIAL-SPEC.md` §8.2, F09; `VERIFIED_REPO` tenancy contract §14, §21; `VERIFIED_REPO` compatibility rows `N-15`–`N-19`; `OPEN`/`BLOCKED` — no provider or connectivity contract (H-12, D-09, D-10).
- **Owner.** FLEET Product Management with procurement and data protection.
- **References.** `MAREA-FLEET-COMMERCIAL-SPEC.md` §8.2, F09; tenancy contract §14, §21; compatibility document §7; decisions D-009 and D-010.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; `dataRights = NOT_GRANTED`; connectivity `BLOCKED`; release `BLOCKED`.

#### B16 — Commissioning and onboarding

- **Definition.** Commissioning and onboarding are the required human path from contract to a usable tenant: scoping, organization and administrator verification, vessel and equipment inventory, role and sharing design, configuration, baseline data migration, device enrollment and commissioning for connected vessels, integration authorisation, verification tests (notification, report, export, access review), training and a signed acceptance record. Onboarding is required for every organization and quoted separately; it is not included in the per-vessel subscription hypothesis, and neither duration nor price is established. Onboarding completion is a prerequisite of per-vessel billing and any support commitment. Materials are bilingual ES/EN. If the organization's telemetry depends on hardware, physical installation belongs to the hardware scope and is quoted separately. No onboarding has been delivered and no acceptance record exists.
- **Evidence.** `VERIFIED_REPO` `MAREA-FLEET-COMMERCIAL-SPEC.md` F10, F11; `VERIFIED_REPO` `BUNDLE-ARCHITECTURE.md` §6.6 F-03, F-04; `VERIFIED_REPO` `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §11; `OPEN` — no onboarding operation, no measured hours (X-05, X-06).
- **Owner.** Customer success with UX, content and localisation.
- **References.** `MAREA-FLEET-COMMERCIAL-SPEC.md` F10, F11; `BUNDLE-ARCHITECTURE.md` §6.6; `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §11; this document §7.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; onboarding `NOT_ESTABLISHED`; `availability = NOT_FOR_SALE`.

#### B17 — Warranty and support

- **Definition.** Support is a professional relationship within the purchased edition's published boundaries; it covers platform use, configuration, roles and permissions, reports, export and telemetry-source troubleshooting, and does not cover the vessel's electrical installation, third-party hardware, connectivity coverage or the organization's own procedures. Support access to a customer tenant is customer-authorised, scoped, time-bound and audited, and never makes support an organization administrator. No uptime, response-time or 24/7 commitment and no service-level commitment exists: `FLEET_SLA = NO_SLA_ESTABLISHED`. An SLA may exist only as a measured, contracted commitment in a signed agreement. Hardware warranty, returns and RMA terms are owned by each hardware family and are `OPEN`; the seller's legal identity and general warranty terms are `BLOCKED` (X-02). No warranty statement may be invented.
- **Evidence.** `VERIFIED_REPO` `MAREA-FLEET-COMMERCIAL-SPEC.md` F19; `VERIFIED_REPO` tenancy contract §23, §29.1; `VERIFIED_REPO` `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class C; `OPEN`/`BLOCKED` — no support operation, no terms, no seller identity (X-02, X-05, H-13).
- **Owner.** Customer support with legal.
- **References.** `MAREA-FLEET-COMMERCIAL-SPEC.md` F19; tenancy contract §23; claims policy §2–§4; this document §14.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; `compliance = NOT_STARTED`; `NO_SLA_ESTABLISHED`; release `BLOCKED`.

#### B18 — Channel and fulfilment

- **Definition.** The intended channel is direct B2B sale by EMBARCARTE, with an installer or partner channel for device installation and a possible marina/association referral route that does not exist. Fulfilment separates platform provisioning (EMBARCARTE), professional services (EMBARCARTE or contracted delivery), optional hardware supply (EMBARCARTE or channel, separately purchased), installation (installer-led, quoted), connectivity (provider contract) and support (EMBARCARTE). The partner would own the vessel-side work and its written scope; EMBARCARTE would own the platform, the role model, the data-processing terms and the support policy; the organization owns its data and its own safety obligations. No reseller, distributor, white-label or referral agreement exists; no margin or commission percentage exists; no consumer app-store route exists; and the package is never bundled into a hardware purchase. All channel terms are `OPEN`/`BLOCKED`.
- **Evidence.** `VERIFIED_REPO` `MAREA-FLEET-COMMERCIAL-SPEC.md` F15; `VERIFIED_REPO` `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §10.3; `VERIFIED_REPO` `BUNDLE-ARCHITECTURE.md` §8; `OPEN`/`BLOCKED` — no partner terms, no delivery capacity (X-05, X-06).
- **Owner.** Commercial development with partner operations.
- **References.** `MAREA-FLEET-COMMERCIAL-SPEC.md` F15; `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §10.3; `BUNDLE-ARCHITECTURE.md` §8.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; `availability = NOT_FOR_SALE`; channel `OPEN`; release `BLOCKED`.

#### B19 — Price hypothesis and quotation model

- **Definition.** Exactly three SIP hypotheses exist for the FLEET SaaS: SIP-1 `FLEET-START` from EUR 49 per vessel per month, VAT excluded; SIP-2 `FLEET-BUSINESS` EUR 79 per vessel per month, VAT excluded; SIP-3 `FLEET-ENTERPRISE` no amount, `NOT_ESTABLISHED`, contracted. All are `HYPOTHESIS_UNAPPROVED`. The package has **no price**: `fixedPackagePriceEstablished = false`; `onboardingPricingEstablished = false`; component hypotheses (WATCH, HUB, SENSE) are recorded only as component hypotheses and are never summed into a package figure. The commercial model is a bespoke, itemised, contracted quotation after a documented assessment, only when legally and operationally permissible. No package price, discount, volume band, annual-prepayment discount or partner margin exists; tax treatment beyond the frozen VAT-excluded basis is `OPEN`. A quotation is never a sale, and no amount may be published or used in a checkout.
- **Evidence.** `VERIFIED_REPO` decisions D-014 and D-016; `VERIFIED_REPO` editions authority §1.4–§1.5, §4.3; `VERIFIED_REPO` `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §9, §12; `VERIFIED_REPO` `BUNDLE-ARCHITECTURE.md` §3.5, §6.6; `HYPOTHESIS` on every amount; `BLOCKED` — no costed basis (X-05).
- **Owner.** Commercial strategy and pricing with finance and B2B Fleet Solutions Director.
- **References.** D-014, D-016; editions authority §1.5; `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §9, §12; `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` (D11, planned).
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; `pricing = HYPOTHESIS_UNAPPROVED`; package price `NOT_ESTABLISHED`; release `BLOCKED`.

#### B20 — Cost and margin assumptions

- **Definition.** No cost, BOM, margin or contribution figure is asserted. The framework names the inputs that must be measured: multi-tenant hosting per organization and vessel; telemetry ingestion, processing, storage and egress; notification-provider fees; onboarding, migration, training and enrollment labour hours; device supply, installation labour and travel; connectivity/SIM data cost; support minutes per vessel; security operations, vulnerability handling and conformity; sales, demonstrations and partner margin; payment, invoicing and tax handling; bad debt; and any contracted penalties if an SLA is ever signed. Contribution margin is deliberately not computed because every input is missing. The package cannot be costed until supplier quotations, labour rates, connectivity quotes and provider terms exist (X-05), and no discount may be offered before a costed ceiling exists.
- **Evidence.** `VERIFIED_REPO` `MAREA-FLEET-COMMERCIAL-SPEC.md` F14, §12; `VERIFIED_REPO` `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §9, §11, §12; `BLOCKED` — X-05, H-12, P-09; `ASSUMPTION` on the cost categories.
- **Owner.** Finance and procurement with B2B Fleet Solutions Director.
- **References.** `MAREA-FLEET-COMMERCIAL-SPEC.md` F14, §12; `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §9, §11; `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` (D11, planned).
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; `pricing = HYPOTHESIS_UNAPPROVED`; costs `BLOCKED`; release `BLOCKED`.

#### B21 — Upgrade and migration

- **Definition.** Intended upgrade and migration paths: `FLEET-START` to `FLEET-BUSINESS` as a commercial upgrade with a stated effective date, prorated treatment and no data loss; adding vessels beyond the allowance as per-vessel expansion; adding optional WATCH/HUB/SENSE hardware and connectivity to an existing tenant without creating a second tenant; migrating a baseline dataset from spreadsheets or an existing system during onboarding; transferring a vessel or device between organizations with verifiable consent, revoked old access and an audit record; and moving from a software-only package configuration to a connected configuration after compatibility evidence exists. Downgrades must never silently delete data, and a contract change must offer export first. No upgrade price, credit, trade-in or migration price is established; `FLEET-ENTERPRISE` is never reached as an automatic upgrade from a standard tier. Upgrade must never introduce a control path.
- **Evidence.** `VERIFIED_REPO` `MAREA-FLEET-COMMERCIAL-SPEC.md` F08, F12, F21, §7; `VERIFIED_REPO` tenancy contract §4.6, §8.6, §9.5–§9.6; `VERIFIED_REPO` `BUNDLE-ARCHITECTURE.md` §8 rule 6; `OPEN` — upgrade mechanics, credits and migration price (X-05).
- **Owner.** FLEET Product Management with commercial operations.
- **References.** `MAREA-FLEET-COMMERCIAL-SPEC.md` F08, F12, F21, §7; tenancy contract §4.6, §8.6; `BUNDLE-ARCHITECTURE.md` §8.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; upgrade pricing `NOT_ESTABLISHED`; `availability = NOT_FOR_SALE`.

#### B22 — Customer acceptance criteria

- **Definition.** Customer acceptance means the complete package works end to end for a real organization: the organization and its first administrator are verified; onboarding produces the agreed configuration, training and a signed acceptance record; vessels, roles, assignments and sharing grants behave as specified, including immediate revocation and scoped, expiring external-installer access; every organization sees only its own data in a recorded positive and negative isolation test; optional telemetry is ingested from an authorised source, displayed with source and freshness, and a disconnected vessel is never shown online; device enrollment binds the device without conferring tenant access; per-vessel accounting, plan changes, grace and cancellation reconcile; export, retention, deletion and termination are exercised; support access is authorised and audited; ES/EN parity is verified; and the invoice evidence shows that a FLEET subscription contains no hardware, connectivity, onboarding or installation line and that the package contains no second SaaS. Documentation, mock-ups, unit tests or simulations never constitute acceptance. Every scenario of §12 is `NOT_EXECUTED`.
- **Evidence.** `VERIFIED_REPO` `MAREA-FLEET-COMMERCIAL-SPEC.md` F24, §9; `VERIFIED_REPO` tenancy contract §26; `VERIFIED_REPO` this document §12; `OPEN`/`BLOCKED` — no service and no test has run.
- **Owner.** Quality assurance with engineering and compliance; independent verification by a reviewer who is not the author.
- **References.** `MAREA-FLEET-COMMERCIAL-SPEC.md` F24, §9; tenancy contract §26; this document §12.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; all acceptance scenarios `NOT_EXECUTED`; `compliance = NOT_STARTED`.

#### B23 — Release readiness and blockers

- **Definition.** The package release readiness is `BLOCKED` and its publication state is `INTERNAL_ONLY`; the lifecycle is `DEFINED` and the commercial availability `NOT_FOR_SALE`. Blocking conditions: no multi-tenant service, tenant isolation test, telemetry ingestion, billing or notification pipeline (P-09, P-06); no DPA, DPIA, subprocessor register or executed authorization model (X-07); no costed onboarding, installation, hardware, connectivity or support basis (X-05); no customer discovery (X-06); brand clearance `NOT_GRANTED` (X-01); seller identity absent (X-02); no connectivity contract (H-12); no CRA secure-update or incident process (H-13); AIS-derived and external data rights not granted (D-09, D-10); hardware not selected and no compatibility row tested (H-04, H-05, H-07, H-08, H-11); no image generation (X-03). Release requires all of these to close plus a signed contract model and a support model; until then nothing is published, quoted as deliverable or sold.
- **Evidence.** `VERIFIED_REPO` `BUNDLE-ARCHITECTURE.md` §9–§10; `VERIFIED_REPO` `MAREA-FLEET-COMMERCIAL-SPEC.md` §10; `VERIFIED_REPO` tenancy contract §22.4, §23, §28; `VERIFIED_REPO` this document §13.
- **Owner.** B2B Fleet Solutions Director with programme leadership and compliance.
- **References.** `BUNDLE-ARCHITECTURE.md` §9–§10; `MAREA-FLEET-COMMERCIAL-SPEC.md` §10; tenancy contract §22.4, §23, §28; this document §13.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; `bundleReleaseReadiness = BLOCKED`; `publication = INTERNAL_ONLY`.

#### B24 — ES/EN content and visual references

- **Definition.** The customer-facing package copy is delivered in `docs/marea/bundles/copy/fleet-package.es.md` (Spain Spanish) and `docs/marea/bundles/copy/fleet-package.en.md` (international English), each with exactly 24 numbered sections: SEO title; meta description; hero headline; hero subheading; main customer promise; ideal vessel/customer; principal benefits; what the bundle includes; what it excludes; product breakdown; optional additions; compatibility conditions; customer outcomes; installation; subscription details; data/connectivity conditions; product/bundle comparison; upgrade path; support and warranty boundaries; frequently asked questions; main CTA for the future approved state; secondary CTA; critical limitations; closing sales proposition; followed by an unnumbered approved-disclaimers section and an internal status line. Both files must distinguish the MAREA FLEET product family from the MAREA FLEET package, never translate product names, contain no currency amount, purchase CTA, stock, review, certification, availability, uptime or SLA figure, and reproduce the approved navigation, AIS receive-only and FLEET limitation statements verbatim. Visual references are the internal `FLEETPKG-*` bundle asset requirements (package) and the `FLEET-*` product asset requirements plus the FLEET family lockup, used as internal design input only: all imagery is `CONCEPT`, four scene requirements per family are `BLOCKED_ON_IMAGE_GENERATION` (X-03), no real product image exists and no customer data or third-party mark may appear.
- **Evidence.** `VERIFIED_REPO` `docs/marea/bundles/copy/fleet-package.es.md`; `VERIFIED_REPO docs/marea/bundles/copy/fleet-package.en.md`; `VERIFIED_REPO docs/marea/products/README.md` §29; `VERIFIED_REPO docs/marea/products/PRODUCT-ASSET-REQUIREMENTS-BATCH-03.md` (FLEET assets); `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9; `VERIFIED_REPO docs/marea/brand/assets/logo/family/marea-family-fleet-lockup.svg`; `OPEN` — publication and imagery blocked (X-01, X-03).
- **Owner.** UX, content and localisation with B2B Fleet Solutions Director (facts) and claims review.
- **References.** copy files; README §29; `PRODUCT-ASSET-REQUIREMENTS-BATCH-03.md`; claims policy §9; `brand-identity.contract.json` `fleetDisambiguation`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`; `brandPublication = NOT_GRANTED`; imagery `BLOCKED_ON_IMAGE_GENERATION`; release `BLOCKED`.

---

## 16. Non-assertions and status statement

This document does **not** assert, and must not be read as asserting: a deployed multi-tenant service, a
tenant-isolation test result, a permission implementation, a billing or entitlement service, a
telemetry-ingestion capability, an alert-delivery or escalation pipeline, a connectivity or SIM
contract, a service-status measurement or any uptime figure, an SLA of any kind, a security
certification or attestation (ISO/IEC 27001, SOC 2 or equivalent), a DPIA, a DPA, a subprocessor
register or a controller/processor determination, a classification-society, flag-state, ISM or
regulatory approval, a customer, reference, logo, testimonial, interview, pilot, market-share or
revenue figure, a BOM, cost, margin or approved price, customer production data, any remote-control,
steering, autopilot, motor, thruster or bus-command capability, a vessel or sea-trial result, a product
image, or that any part of the package is orderable, purchasable, publishable, certified or supported.

**Status of this deliverable:** `INTERNAL`, `COMPLETE_TARGET_SPECIFICATION`,
`BUNDLE DEFINITION ONLY`, `NOT_PUBLISHED`, `NOT_FOR_SALE`, release readiness `BLOCKED`. It defines the
intended package and the evidence that would prove it. It does not make the MAREA FLEET package
orderable, publishable, certified, priced or supported, and it does not replace the MC-08 validation
gate, the DPIA, the DPA or any conformity assessment. The product documents remain authoritative for
the FLEET product family; this bundle specification owns only the package composition and its
commercial boundary.
