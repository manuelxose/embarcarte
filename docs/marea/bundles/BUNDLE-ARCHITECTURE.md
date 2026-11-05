# MAREA — Bundle architecture: six commercial solution bundles (MC-08 / D1)

| Field | Value |
| --- | --- |
| Document ID | MC-08 / D1 / BUNDLE-ARCHITECTURE |
| Milestone | MC-08 (Master Prompt 08/36) — complete commercial solution bundles, configuration rules, compatibility, subscriptions and unit economics |
| Deliverable | D1 — bundle architecture and product-vs-bundle identity boundaries |
| Owner | Lead (Chief Commercial Product Officer) |
| Status | INTERNAL. Bundle definitions only. NOT a shop catalogue, NOT an approved quotation, NOT an orderable SKU, NOT a public offer |
| Lifecycle | All six bundles `DEFINED` internally; all `NOT_FOR_SALE`; publication `INTERNAL_ONLY` |
| Brand clearance | `NOT_GRANTED` (MAREA is a proposed brand) |
| Source IP clearance | `NOT_CLEARED` (OPEN-MARINE is read-only reference) |
| Price status | `HYPOTHESIS_UNAPPROVED` — no bundle price is approved, costed or publishable |
| Image generation | `BLOCKED` (X-03) — no bundle visual is produced or requested by this milestone |
| Publication / sales / deployment | NOT AUTHORISED |
| Base | MC-07 HEAD `80c66c70a1bab6f11c5ba5709baa4c1671f1d6da` on `feature/marea-mc07-display-weather-fleet-products` |
| Branch | `feature/marea-mc08-bundles-commercial-architecture` |
| Date | 2026-10-30 |
| Write scope | This file only |
| Is not | A product definition, a product family, a SaaS plan, a quotation, a contract, a price list, a compatibility certification, a stock or availability statement, a warranty statement or a release |

This document is the architecture contract for the six MC-08 commercial solutions. It fixes what a bundle
is, what it is not, which existing product editions compose each reference configuration, and which
vocabulary every other MC-08 deliverable must use. The six bundle specifications (D2–D7), the composition
matrix (D8), configuration rules (D9), entitlement matrix (D10), pricing framework (D11), installation model
(D12), journeys (D13), comparison (D14), copy (D15), asset plan (D16), machine contract (D17) and validator
(D18) are bound by it. Nothing in this document creates a sale, a price approval, a compatibility claim or a
product lifecycle change.

---

## 1. Purpose and the one thing that must never be misread

The nine MAREA products are completely specified and **not for sale** (MC-05/MC-06/MC-07). MC-08 adds a
commercial layer above them: six named solutions that describe **intended end-state offers** built from
existing product editions.

**A bundle definition is not a completed installation, an approved quotation, an orderable SKU or a
legally authorised offer.** A bundle can PASS its internal definition scope while all six bundles remain
`NOT_FOR_SALE`. Packaging a blocked product does not unblock it: a bundle that contains a blocked product
stays blocked, and a bundle never inherits certification, compatibility or pricing approval from its
components.

The six solution names are fixed:

1. `MAREA START` (bundle id `START`)
2. `MAREA CRUISE` (bundle id `CRUISE`)
3. `MAREA SAIL` (bundle id `SAIL`)
4. `MAREA PROTECT` (bundle id `PROTECT`)
5. `MAREA COMPLETE` (bundle id `COMPLETE`)
6. `MAREA FLEET package` (bundle id `FLEET`; machine `displayName` stays `MAREA FLEET`, the
   customer-facing bundle form is always `MAREA FLEET package`)

The first five are proposed customer-facing solution identities. The sixth is a commercial package
descriptor associated with the **existing MAREA FLEET SaaS product family** (editions `FLEET-START`,
`FLEET-BUSINESS`, `FLEET-ENTERPRISE`). It is not a tenth product family and not a second SaaS.

---

## 2. Product, edition, bundle and SKU — the identity boundaries

| Object | Definition | Authority | Status in MC-08 |
| --- | --- | --- | --- |
| **Product family** | One of the nine commercial families (`NAV`, `HUB`, `AIS`, `PILOT`, `SENSE`, `WATCH`, `DISPLAY`, `WEATHER`, `FLEET`). | `docs/marea/products/README.md` §2; `product-definitions.batch-01/02/03.json` | Already frozen by MC-05/06/07. MC-08 creates none and renames none. |
| **Edition / module / kit** | A customer-facing configuration inside a family, with a fixed id (e.g. `NAV-PRO`, `SENSE-POWER`, `SENSE-ESSENTIALS`, `WATCH-CORE`). | `PRODUCT-EDITIONS-NAV-HUB-AIS.md`, `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md`, `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`; decisions D-007, D-008, D-011, D-012 | Frozen. MC-08 references editions; it may not add, rename or re-verdict one. |
| **Bundle / solution** | A named composition of existing product editions, individual modules, existing kits, authorised accessories (where defined), services, installation tasks, subscription entitlements, data/connectivity dependencies and warranty/support obligations. | **This document**; `bundle-definitions.json` (D17); six specs D2–D7 | `DEFINED` internally, `NOT_FOR_SALE`, `INTERNAL_ONLY`. It is **not** a product family and **not** a SKU. |
| **SKU / orderable item** | A purchasable unit with approved price, stock, fulfilment, compliance and lifecycle state ≥ `OPERATIONS_READY`. | Future commerce milestones (MC-16/MC-20–MC-26) | **Does not exist in MC-08.** No bundle is an SKU; no bundle has an orderable state. |
| **Quotation** | A vessel-specific, itemised commercial offer produced after a documented survey, only when legally and operationally permissible. | D-009; `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` | Required for SAIL and COMPLETE. No quotation is issued by MC-08. |

A bundle is a **composition**, not a super-product. It has no product lifecycle of its own beyond the
definition state used here; it never re-opens a product's readiness dimensions, and it cannot promote a
blocked product to availability by being sold as part of a solution.

---

## 3. Binding vocabulary

### 3.1 Lifecycle

The MC-08 bundle contract uses the single lifecycle vocabulary of decision D-007 (no second enum):
`CONCEPT`, `DEFINED`, `ENGINEERING_VERIFIED`, `REGULATORY_READY`, `OPERATIONS_READY`,
`COMMERCIALLY_AVAILABLE`, `RETIRED`. Every bundle is `DEFINED` and `NOT_FOR_SALE`.

### 3.2 Evidence classes

`VERIFIED_REPO`, `VERIFIED_EXTERNAL`, `ASSUMPTION`, `HYPOTHESIS`, `OPEN`, `BLOCKED`. `TBD` is prohibited
everywhere. `OPEN` and `BLOCKED` are legitimate values; they are not placeholders.

### 3.3 Inclusion vocabulary (component level, exact strings)

| Value | Meaning |
| --- | --- |
| `INCLUDED` | Part of the bundle's reference configuration and included in the commercial scope. |
| `REQUIRED_EXTERNAL` | Necessary for the promised outcome but not supplied as a MAREA component (customer device, licensed chart region, SIM/data plan, antenna, cabling, mounting, professional labour, survey). |
| `OPTIONAL` | Offered as an addition; not needed for the base outcome; separately priced. |
| `CONDITIONAL` | Only available if a named external condition closes first (e.g. `AIS-CONNECTED`, `WATCH-PLUS`, `SENSE-SAIL`, `SENSE-SYSTEMS`); never selected by default. |
| `NOT_INCLUDED` | Explicitly out of scope; a customer could buy it separately as its own product, but this bundle does not contain it. |
| `INELIGIBLE` | Cannot be selected in this bundle at all (e.g. `PILOT-PRO` as a priced retail line; `DISPLAY-LARGE-CONDITIONAL` as an available size). |
| `QUOTATION_REQUIRED` | A required component whose scope and price can only be established by a vessel-specific survey and itemised quotation (PILOT installations; some survey/installation lines). |

Inclusion is a **commercial** classification. It is not a technical-support statement: `INCLUDED` does not
mean a compatibility row is tested, and `NOT_INCLUDED` does not mean a product is technically incompatible.
Technical compatibility is carried separately, per integration row id, using the compatibility vocabulary of
`PRODUCT-COMPATIBILITY-*.md`.

### 3.4 Configuration decision outcomes (internal only)

`CONFIGURATION_DEFINED_INTERNAL`, `COMPATIBILITY_EVIDENCE_REQUIRED`,
`SPECIALIST_SURVEY_REQUIRED`, `QUOTATION_REQUIRED`, `NOT_ELIGIBLE`, `PUBLICATION_BLOCKED`.

There is **no `ORDERABLE` outcome in MC-08**. These are internal configuration results, never sale approvals.

### 3.5 Price and cost status

- `HYPOTHESIS_UNAPPROVED` — a historical or planning figure, no BOM/supplier/labour evidence.
- `NOT_ESTABLISHED` — no figure exists; quotation or cost work required.
- `OPEN` — fact not established; the intended experience is still specified.
- `BLOCKED` — an external condition (right, quote, measurement, certificate) prevents closure.

No bundle price may be `APPROVED`, `FINAL`, `LAUNCH` or purchasable in MC-08.

---

## 4. The six solutions at a glance

| Id | Name | Intended buyer | Main outcome | Reference composition (see §6) | Historical price hypothesis | Commercial model | Readiness |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `START` | MAREA START | Owner of a coastal sail/motor vessel who keeps existing instruments and wants modern navigation plus onboard data | Existing onboard data visible in modern navigation, locally and without replacing instruments | `HUB-STANDARD` + `NAV-PRO` | EUR 499 | Product bundle + installer-assisted configuration | `DEFINED` / `NOT_FOR_SALE`; compatibility evidence required |
| `CRUISE` | MAREA CRUISE | Coastal cruiser wanting a fixed helm display, received traffic and onboard connectivity | Coherent integrated cruising interface with licensed navigation and receive-only AIS targets | `NAV-ESSENTIAL` + `HUB-STANDARD` + `AIS-RECEIVER` + `DISPLAY-7` | EUR 1,399 | Installed solution (installer-assisted/professional) | `DEFINED` / `NOT_FOR_SALE`; AIS/DISPLAY hardware and integration evidence required |
| `SAIL` | MAREA SAIL | Sailing-yacht owner wanting an integrated helm with supervised steering | Sail-focused integrated helm including supervised steering and measured wind | `NAV-PRO` + `HUB-STANDARD` + `PILOT-COASTAL` (`QUOTATION_REQUIRED`) + `SENSE-WIND` | EUR 1,990 (recorded, not a valid full installed price) | Vessel-specific quotation (D-009) | **`BLOCKED`** — `PILOT_SAFETY_GATE = BLOCKED`; price not established |
| `PROTECT` | MAREA PROTECT | Absent owner in a marina/mooring who wants power and bilge awareness ashore | Selected vessel conditions visible ashore with honest alert state | `WATCH-CORE` + `SENSE-ESSENTIALS` (expands to `SENSE-POWER` + `SENSE-BILGE`) | EUR 399 plus subscription (not cost-justified) | Hardware + subscription + installation; installer-assisted | `DEFINED` / `NOT_FOR_SALE`; WATCH service `NOT_FOUND`; price open |
| `COMPLETE` | MAREA COMPLETE | Owner/refit customer seeking one coordinated professional boat integration | Coordinated navigation, instruments, display, monitoring and supervised steering installed as one project | `NAV-PRO` + `HUB-PRO` + `DISPLAY-7` + `WATCH-CORE` + four SENSE modules + `PILOT-COASTAL` (`QUOTATION_REQUIRED`) | EUR 3,490 (recorded, not a valid turnkey price) | Vessel-specific quotation | **`BLOCKED`** — multiple subsystem gates; turnkey price not established |
| `FLEET` | MAREA FLEET package | Professional operators: charter, sailing school, marina, maintenance provider, management firm, multi-vessel operator | Fleet operations software plus onboarding, optional equipment, connectivity, installation and support | `FLEET-START`/`FLEET-BUSINESS` subscription + onboarding + registration/migration + training + support; hardware/connectivity/installation optional | Bespoke | B2B contracted solution | `DEFINED` / `NOT_FOR_SALE`; FLEET service `NOT_IMPLEMENTED` |

---

## 5. Architecture principles

1. **Composition, not a new family.** Every bundle line resolves to an existing product family id and an
   existing edition/module/kit id (or to a named external service/accessory). No invented SKU ids, no
   invented physical serial numbers, no tenth family.
2. **No inheritance of approval.** A bundle cannot inherit certification, compatibility, price, data-rights
   or publication approval from its components; each dimension is carried explicitly and stays open.
3. **A blocked component blocks the promise.** `SAIL` and `COMPLETE` contain a PILOT installation whose
   safety gate is `BLOCKED`; they are therefore quotation-only and never fixed-price.
4. **Edition honesty.** The reference configuration names the exact edition for each family. Where a
   cheaper edition exists but cannot deliver the promised outcome (e.g. `NAV-ESSENTIAL` vs live instrument
   overlays), the document says so and the edition choice is justified; where an extra edition is not
   needed, it is not implied automatically.
5. **Accessories are visible.** Antennas, splitters, mounts, cabling, power items, SIM/data plans,
   installation labour, surveys and chart licences are explicit `REQUIRED_EXTERNAL` or
   `QUOTATION_REQUIRED` lines. No bundled price may silently assume they are free.
6. **Subscriptions are explicit.** Every recurring entitlement is named with its term, renewal and
   cancellation behaviour. No subscription-free cloud monitoring is offered. NAV and WEATHER never bill
   the same entitlement twice (D-013).
7. **Local safety is isolated from commerce.** Subscription expiry never disables PILOT manual steering
   behaviour, independent local steering, valid local measurement, required local alarms or an approved
   safety-critical fallback (D-010/D-011/D-015; README §16 rule 7). This is a design requirement, not a
   tested behaviour.
8. **AIS stays receive-only.** No bundle presents AIS as a transponder, transmission, collision-avoidance
   system or detection guarantee.
9. **No remote control.** No bundle introduces a cloud-to-actuator, remote helm, remote throttle or remote
   motor path. HUB/DISPLAY/WATCH/FLEET are never actuator authority.
10. **FLEET SaaS ≠ FLEET package.** The per-vessel subscription never includes hardware, onboarding,
    connectivity or installation by default; the package is a separate, contracted, itemised offer.
11. **Bundle discount is earned, not invented.** A discount can only be justified by shared packaging,
    shared installation, reduced acquisition cost, reduced support duplication or channel efficiency — never
    by an arbitrary marketing subtraction, and never by hiding mandatory accessories or installation.
12. **Publication is a separate gate.** All bundle content is `INTERNAL_ONLY`; no price enters copy, no CTA
    is enabled, no page exists. MC-08 creates no public route, no catalogue entry, no checkout.
13. **Reusable contract.** The bundle contract, inclusion vocabulary, configuration outcomes, conflict
    rules and eligibility questionnaires are designed to be reused by MC-16 (product data model), MC-23
    (bundle comparison UI) and MC-24 (configurator and quotation triage) without inventing commercial rules.

---

## 6. Canonical reference configurations

These are the fixed internal reference configurations. They are not the only possible customer
configurations (optional lines exist), but every MC-08 deliverable must use these as the reference and must
not silently substitute another edition.

**Line-identifier convention.** The tables below use bundle-scoped display ids (`ST-`, `CR-`, `SL-`, `PR-`,
`CP-`, `FP-`) so that a line can be cited unambiguously across deliverables. The specification documents
(D2–D7) may number the same lines locally (for example `S-01` in START, `C-01` in CRUISE, `PR-01` in
PROTECT, or simple row numbers); the order and the family/edition content are the authority, and the machine
contract carries its own `lineId`. A bundle-local line id is never a compatibility row id: compatibility rows
are always cited with their source register context (for example batch-01 AIS register `C-01`, or batch-02
row `I-08`), and compliance blocker ids such as `S-06` are never line ids.

### 6.1 START — `HUB-STANDARD` + `NAV-PRO`

| Line | Family | Edition | Inclusion | Why |
| --- | --- | --- | --- | --- |
| ST-01 | `HUB` | `HUB-STANDARD` | `INCLUDED` | Publishes the supported onboard data locally and provides the local dashboard; the base connectivity package. |
| ST-02 | `NAV` | `NAV-PRO` | `INCLUDED` | Live instrument overlays are a NAV Pro capability (N10); the promised outcome needs them. |
| ST-03 | `HUB` | `HUB-PRO` | `OPTIONAL` | Wider validated equipment envelope and installer tooling; quoted as an upgrade. |
| ST-04 | `WEATHER` | `WEATHER-STANDARD` | `OPTIONAL` | Separate licensed data entitlement; no double billing with NAV. |
| ST-05 | external | chart licence within purchased region | `REQUIRED_EXTERNAL` | Charts are licensed data rights (D-01), never included as product features. |
| ST-06 | external | customer phone/tablet, compatible cabling/adapters/power items | `REQUIRED_EXTERNAL` | Device is customer-supplied; accessories are not implied free. |
| ST-07 | service | installation / compatibility assessment | `OPTIONAL` (required for a mixed-equipment refit) | Installer-assisted; no self-install envelope is verified yet. |
| ST-08 | `NAV` | `NAV-ESSENTIAL` | `NOT_INCLUDED` | Documented lower-cost variant; it does not deliver live instrument overlays, so it is not the reference. |

`NAV-PRO` is **not** automatically required by the bundle mechanism; it is required by the stated outcome and
the reason is recorded. A customer who only wants planning plus HUB local dashboard is a NAV Essential
customer and is offered the documented variant.

### 6.2 CRUISE — `NAV-ESSENTIAL` + `HUB-STANDARD` + `AIS-RECEIVER` + `DISPLAY-7`

| Line | Family | Edition | Inclusion | Why |
| --- | --- | --- | --- | --- |
| CR-01 | `NAV` | `NAV-ESSENTIAL` | `INCLUDED` | AIS target list/detail (N11) and licensed chart display are included in Essential; the fixed display is the single navigation surface. |
| CR-02 | `HUB` | `HUB-STANDARD` | `INCLUDED` | Local onboard data and dashboard; read-mostly gateway, never actuator authority. |
| CR-03 | `AIS` | `AIS-RECEIVER` | `INCLUDED` | Receive-only traffic awareness; antenna chain is external. |
| CR-04 | `DISPLAY` | `DISPLAY-7` | `INCLUDED` | Fixed helm display at the working 7-inch-class designation; `SIZE_NOT_FROZEN`. |
| CR-05 | `NAV` | `NAV-PRO` | `OPTIONAL` | Live instruments, CPA/TCPA, multi-device and offline are Pro capabilities; not required for the base outcome. |
| CR-06 | `AIS` | `AIS-CONNECTED` | `CONDITIONAL` | `NOT_YET_JUSTIFIED`; may only ship if hardware evidences richer local networking/diagnostics. Not selected. |
| CR-07 | `DISPLAY` | `DISPLAY-LARGE-CONDITIONAL` | `INELIGIBLE` | No frozen size or hardware; never selectable as an available size. |
| CR-08 | `WEATHER` | `WEATHER-STANDARD` | `OPTIONAL` | Separate licensed subscription. |
| CR-09 | external | AIS VHF antenna + optional VHF splitter, mounts, power/cabling, professional installation | `REQUIRED_EXTERNAL` / `QUOTATION_REQUIRED` | Real installation work and real cost; never implied free. |
| CR-10 | external | licensed chart region, GNSS source | `REQUIRED_EXTERNAL` | Device/HUB GNSS; charts are licensed data. |

### 6.3 SAIL — `NAV-PRO` + `HUB-STANDARD` + `PILOT-COASTAL` + `SENSE-WIND`

| Line | Family | Edition | Inclusion | Why |
| --- | --- | --- | --- | --- |
| SL-01 | `NAV` | `NAV-PRO` | `INCLUDED` | Route/waypoint context is a read-only input to a future authorised local integration (I-01); NAV never commands the actuator. |
| SL-02 | `HUB` | `HUB-STANDARD` | `INCLUDED` | Bounded instrument/nav data and read-only PILOT status (I-02); HUB is not the actuator controller. |
| SL-03 | `PILOT` | `PILOT-COASTAL` | `QUOTATION_REQUIRED` | Supervised steering is vessel-specific and quoted after survey (D-008/D-009). |
| SL-04 | `SENSE` | `SENSE-WIND` | `CONDITIONAL` | Wind measurement is the intended sail input; as a steering input it is `CONDITIONAL` on measurement accuracy (P-05) and recorded wind-mode evidence (H-01). |
| SL-05 | `PILOT` | `PILOT-SAIL` | `CONDITIONAL` | `CONDITIONAL` on verified wind-angle steering; not the default. |
| SL-06 | `PILOT` | `PILOT-PRO` | `INELIGIBLE` | Installation package only; never a priced retail line or SKU (D-008). |
| SL-07 | `SENSE` | `SENSE-SAIL` kit | `NOT_INCLUDED` (optional alternative) | Kit is `CONDITIONAL`; a kit is packaging, not extra capability, and is not required by SAIL. |
| SL-08 | external/quotation | vessel and steering survey, drive/actuator, rudder feedback, cabling, power protection, E-stop assembly, mechanical interfaces, installer labour, commissioning, supervised sea trials, training, conformity, warranty reserve | `QUOTATION_REQUIRED` / `REQUIRED_EXTERNAL` | The items that make steering installation real; none is priced or included in any hypothesis. |

`SAIL` status: `FULL_BUNDLE_PRICE_NOT_ESTABLISHED`, `VESSEL_SURVEY_REQUIRED`,
`INSTALLER_QUOTATION_REQUIRED`, `PILOT_SAFETY_GATE_BLOCKED`. No fixed-price checkout path.

### 6.4 PROTECT — `WATCH-CORE` + `SENSE-ESSENTIALS` kit

| Line | Family | Edition | Inclusion | Why |
| --- | --- | --- | --- | --- |
| PR-01 | `WATCH` | `WATCH-CORE` | `INCLUDED` | Monitoring hardware plus the required monitoring subscription entitlement; connectivity is separate. |
| PR-02 | `SENSE` | `SENSE-ESSENTIALS` kit | `INCLUDED` | One kit line that expands exactly to `SENSE-POWER` + `SENSE-BILGE`. |
| PR-03 | `SENSE` | `SENSE-POWER` / `SENSE-BILGE` loose modules | `INELIGIBLE` when P-02 is present | Counting the kit and a loose module is a duplicate; the contract must reject it. |
| PR-04 | `HUB` | `HUB-STANDARD` | `OPTIONAL` | WATCH defines no required HUB relationship (I-11); HUB is an optional local dashboard. |
| PR-05 | `WATCH` | `WATCH-PLUS` | `CONDITIONAL` | Additional benefits unvalidated and uncosted; not selected. |
| PR-06 | external | cellular/SIM/data plan, installation materials, installation labour, device commissioning/registration, consent/privacy notice | `REQUIRED_EXTERNAL` | Connectivity and installation are necessary and separately priced; subscription does not include SIM/data. |
| PR-07 | `WATCH` | monitoring subscription | `INCLUDED` (required, recurring) | Remote monitoring requires an active entitlement; local measurement and local alarms survive expiry. |

`PROTECT` is **not** a SENSE kit and **not** a WATCH product page: it is a complete monitoring solution whose
sensor content is explicit and whose connectivity, subscription and installation are separately visible.

### 6.5 COMPLETE — nine lines plus quotation scope

| Line | Family | Edition | Inclusion | Why |
| --- | --- | --- | --- | --- |
| CP-01 | `NAV` | `NAV-PRO` | `INCLUDED` | Connected navigation, live instruments, multi-device, traffic interpretation. |
| CP-02 | `HUB` | `HUB-PRO` | `INCLUDED` | Wider validated envelope, integration capacity, installer tooling and commissioning record for a multi-system vessel. |
| CP-03 | `DISPLAY` | `DISPLAY-7` | `INCLUDED` | Fixed helm display; `SIZE_NOT_FROZEN`; installation separately quoted. |
| CP-04 | `WATCH` | `WATCH-CORE` | `INCLUDED` | Monitoring hardware + required subscription; connectivity separate. |
| CP-05 | `SENSE` | `SENSE-POWER` | `INCLUDED` | DC/battery measurement. |
| CP-06 | `SENSE` | `SENSE-BILGE` | `INCLUDED` | Bilge water measurement. |
| CP-07 | `SENSE` | `SENSE-TANKS` | `INCLUDED` | Tank levels. |
| CP-08 | `SENSE` | `SENSE-ENV` | `INCLUDED` | Compartment temperature/humidity/pressure context. |
| CP-09 | `PILOT` | `PILOT-COASTAL` | `QUOTATION_REQUIRED` | Supervised steering, vessel-specific quotation; safety gate blocked. |
| CP-10 | `AIS` | `AIS-RECEIVER` | `OPTIONAL` | Traffic awareness is not automatic in a premium bundle; it is a separate hardware purchase. |
| CP-11 | `WEATHER` | `WEATHER-PRO` | `OPTIONAL` | Licensed data entitlement; never automatic. |
| CP-12 | `SENSE` | `SENSE-SYSTEMS` kit | `NOT_INCLUDED` (conditional alternative) | Kit is `CONDITIONAL`; the reference uses explicit modules to avoid implying unverified kit measurement. |
| CP-13 | `PILOT` | `PILOT-PRO` / `PILOT-SAIL` | `INELIGIBLE` (as priced/SKU) / `CONDITIONAL` | Pro is a quoted scope; Sail wind mode unverified. |
| CP-14 | `DISPLAY` | `DISPLAY-LARGE-CONDITIONAL` | `INELIGIBLE` | No frozen size/hardware. |
| CP-15 | external/quotation | compatibility survey, vessel-specific components, installation labour, commissioning, customer training, support/maintenance proposal, conformity | `QUOTATION_REQUIRED` | A coordinated installation is real work, not a feature list. |

`COMPLETE` status: `COMPLETE_COMMERCIAL_MODEL = VESSEL_SPECIFIC_QUOTATION`,
`FIXED_TURNKEY_PRICE = NOT_ESTABLISHED`. It is not "every catalogue product in a box" and not unlimited
features or future upgrades.

### 6.6 FLEET package — contracted B2B solution

| Line | Family | Edition | Inclusion | Why |
| --- | --- | --- | --- | --- |
| FP-01 | `FLEET` | `FLEET-START` or `FLEET-BUSINESS` | `INCLUDED` (required, recurring) | Per-vessel/month SaaS subscription, VAT excluded; organisation/seat/limits stated explicitly. |
| FP-02 | `FLEET` | `FLEET-ENTERPRISE` | `CONDITIONAL` (contracted) | Negotiated tier, no standard price, no invented SLA. |
| FP-03 | service | organisation onboarding (setup, vessel import, role design, training) | `INCLUDED` as a **separately quoted service** | Real work; never included in the per-vessel hypothesis. |
| FP-04 | service | device enrollment, personnel/permission setup, initial data migration | `INCLUDED` as separately quoted services | Required for connected vessels; scoped and auditable. |
| FP-05 | `WATCH` | `WATCH-CORE` | `OPTIONAL` (per vessel) | Hardware is never included by default in the SaaS fee; requires its own subscription and connectivity. |
| FP-06 | `HUB` | `HUB-STANDARD` | `OPTIONAL` | Local data source; separately purchased/installed. |
| FP-07 | `SENSE` | modules/kits | `OPTIONAL` | Hardware acquisition separate. |
| FP-08 | external | cellular connectivity/SIM data | `REQUIRED_EXTERNAL` per connected device | Data cost is explicit and not part of the SaaS or hardware fee. |
| FP-09 | service | installation, maintenance/service setup | `OPTIONAL` / `QUOTATION_REQUIRED` | Quoted per site/vessel. |
| FP-10 | service | contracted integrations, optional SLA | `CONDITIONAL` | Only as a written, measurable contract; otherwise `NO_SLA_ESTABLISHED`. |
| FP-11 | `FLEET` | audit, roles, tenant isolation, export/deletion (governance) | `INCLUDED` in every edition | Never edition-gated (D-015). Standard reporting and service planning belong to `FLEET-BUSINESS` and above (`FL13`); `FLEET-START` includes the operational records but not the standard reporting/planning layer. |

Flags: `contractedSolution = true`, `hardwareIncludedByDefault = false`,
`onboardingPricingEstablished = false`, `fixedPackagePriceEstablished = false`.

---

## 7. The 24-field bundle definition model

Every bundle specification (D2–D7) uses the same 24 fields, in the same order. The keys are the machine model
in `bundle-definitions.json`; the headings below are the human model. Each field carries a Definition, an
Evidence class, an Owner, References and a Release-readiness statement.

| # | Key | Field |
| --- | --- | --- |
| 01 | `identity` | Bundle identity |
| 02 | `commercialPurpose` | Commercial purpose |
| 03 | `idealCustomer` | Ideal customer |
| 04 | `applicability` | Vessel or organization applicability |
| 05 | `customerOutcome` | Main customer outcome |
| 06 | `mandatoryBaseComponents` | Mandatory base components |
| 07 | `optionalComponents` | Optional components |
| 08 | `requiredProductEditions` | Required product editions |
| 09 | `explicitExclusions` | Explicit exclusions |
| 10 | `dependencyRules` | Dependency rules |
| 11 | `compatibilityCriteria` | Compatibility criteria |
| 12 | `installationRequirements` | Installation requirements |
| 13 | `softwareEntitlements` | Software entitlements |
| 14 | `recurringSubscriptions` | Recurring subscriptions |
| 15 | `externalDataConnectivity` | External data and connectivity |
| 16 | `commissioningOnboarding` | Commissioning and onboarding |
| 17 | `warrantySupport` | Warranty and support |
| 18 | `channelFulfilment` | Channel and fulfilment |
| 19 | `priceHypothesisAndQuotationModel` | Price hypothesis and quotation model |
| 20 | `costAndMarginAssumptions` | Cost and margin assumptions |
| 21 | `upgradeMigration` | Upgrade and migration paths |
| 22 | `customerAcceptance` | Customer acceptance criteria |
| 23 | `releaseReadinessBlockers` | Release readiness and blockers |
| 24 | `contentAndVisualReferences` | ES/EN content and visual references |

A bundle field is not a product field: it may legitimately be `OPEN`/`BLOCKED` where the commercial fact is
not established, provided the field states what evidence would close it. No field may be a heading with
`TBD`, and a field that only repeats a product name is not substantive.

---

## 8. Cross-bundle rules

1. **No duplicate component.** A family/edition line appears once per bundle; kit expansion counts as the
   module line (PROTECT pattern).
2. **No hidden mandatory purchase.** If the outcome needs an antenna, mount, cable, SIM, survey, chart
   licence or professional hour, it is visible as `REQUIRED_EXTERNAL`/`QUOTATION_REQUIRED`.
3. **No contradictory editions.** A bundle references one reference edition per family role; mutually
   exclusive editions (e.g. `DISPLAY-7` vs `DISPLAY-LARGE-CONDITIONAL`) are never both selected.
4. **No double subscription.** One entitlement ledger per customer account; NAV Pro may include WEATHER
   Standard-equivalent read access only where provider rights allow (D-013); no second charge for the same
   granted entitlement.
5. **No unsafe deactivation.** Payment failure or subscription expiry never disables local safety functions
   (README §16 rule 7; D-010/D-011/D-015).
6. **Upgrades do not replace functional hardware unnecessarily.** START→CRUISE adds `AIS-RECEIVER` and
   `DISPLAY-7`; START→SAIL adds `PILOT` after survey; CRUISE→COMPLETE adds integration, monitoring and
   supervised steering. Existing compatible hardware is retained where it remains functional.
7. **Cross-sell never double-charges.** A customer with a valid NAV or WEATHER entitlement receives the
   integrated offer with the already-granted entitlement recognised, not rebilled.
8. **FLEET package is opt-in.** A professional operator buys the package; the bundle does not silently
   attach the SaaS subscription to a hardware purchase.

The canonical line-item comparison for all six bundles is in `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` (D8).

---

## 9. Publication, sales and deployment state

| Dimension | Value |
| --- | --- |
| Publication state | `INTERNAL_ONLY` |
| Public page / route | None created; no bundle page exists |
| Catalogue / checkout entry | None created; no bundle is orderable |
| Purchase CTA | None enabled; future CTA intentions only (verify compatibility, request survey, request quotation, explore configuration, ask about installation) |
| Price approval | None; all historical hypotheses unapproved |
| Stock / lead time | Not established; none stated |
| Trademark clearance | `NOT_GRANTED` |
| Source IP clearance | `NOT_CLEARED` |
| Certification | None claimed |
| Image generation | `BLOCKED` (X-03); all 60 bundle assets are planning requirements |
| Merge / deploy | Not performed by MC-08 |

MC-08 may PASS its internal bundle-definition scope while every bundle remains `NOT_FOR_SALE`. A PASS does
not approve a historical price, establish hardware compatibility, certify a product, approve manufacturing
readiness or authorise a sale.

### 9.1 Disclaimer surface interpretation (copy and content)

The approved disclaimers of `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9 are applied by surface, not mechanically to
every file. This interpretation is binding for the 12 copy drafts and is enforced by the bundle validator:

| Disclaimer | Surfaces where it is required | Rationale |
| --- | --- | --- |
| Navigation / instruments | All 12 bundle copy files | Every bundle page presents position, charts, traffic, depth, instruments or weather context, or links to a page that does. |
| AIS receive-only | CRUISE, COMPLETE and FLEET package copy (and any future surface that presents AIS targets) | These files present received traffic or traffic context; START/SAIL/PROTECT do not present AIS targets. |
| PILOT supervised steering | SAIL and COMPLETE copy | Only these bundles present supervised steering; no other bundle claims steering. |
| Weather | START and CRUISE copy (the files that present the licensed forecast service); SAIL/COMPLETE/FLEET package mention WEATHER only as a separate optional or excluded product and carry no forecast presentation | A forecast surface without the approved weather wording must not exist; a product reference without forecast presentation does not create one. |
| Brand attribution | All 12 copy files | Commercial material attribution rule. |

An author who introduces a new forecast, AIS or steering surface in any bundle copy must add the matching
§9 wording and the validator's surface check must be extended in the same change. The internal-draft
limitation statements (SENSE, WATCH, DISPLAY, WEATHER, FLEET) are applied to the files whose bundle discusses
those products and are never described as approved policy.


---

## 10. Release blockers at architecture level

The bundles are blocked by the product-level and programme-level conditions already recorded, not by missing
documentation:

- **Trademark and legal:** `X-01` (MAREA clearance `NOT_GRANTED`), `X-02` (seller/legal identity), claims
  policy approvals for internal-draft limitation statements.
- **Compatibility and hardware:** `H-04`, `H-05`, `H-07`, `H-08`, `H-11`, `H-12`, `H-13`; 0 compatibility
  rows tested; no selected HUB/AIS/WATCH/DISPLAY/SENSE/PILOT hardware; no NMEA 2000 certification.
- **Data rights:** `D-01`–`D-10` chart/weather/AIS-derived rights; FLEET telemetry and retention.
- **Safety:** `PILOT_SAFETY_GATE = BLOCKED` (`H-01`, `P-04`), E-stop/motor-isolation/rudder-feedback
  `NOT_FOUND`, sea trials `NOT_PERFORMED`.
- **Service build:** `WATCH_INGESTION = NOT_VERIFIED`; notification pipeline, device identity, subscription
  service and connectivity contract `NOT_FOUND`; FLEET `NOT_IMPLEMENTED`; billing not implemented.
- **Cost and price:** `X-05`; no BOM, supplier quotation, labour rate, connectivity quote or provider cost.
- **Measurement:** `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`; sensor ingress `NOT_VERIFIED`.
- **Publication and imagery:** `X-03` (image generation), `X-06`/`X-07` (privacy/security evidence).

The per-bundle blockers are enumerated in D2–D7 field B23 and in `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md`.

---

## 11. References

- `docs/marea/COMMERCIAL-PORTFOLIO.md` — product system and historical bundle hypotheses.
- `docs/marea/products/README.md` §1–§32 — lifecycle, readiness, evidence, fields, claim, price and
  validation conventions.
- `docs/marea/products/PRODUCT-EDITIONS-*.md` — authoritative edition ids, verdicts and prices.
- `docs/marea/products/PRODUCT-COMPATIBILITY-*.md` — integration rows and compatibility statuses.
- `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL*.md` — cost frameworks and D-009 quotation model.
- `docs/marea/execution/DECISION-LOG.md` — D-007 to D-017 and MC-08 decisions D-018 to D-024.
- `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9 — approved disclaimers.
- `docs/marea/bundles/bundle-definitions.json` (D17) — machine-readable bundle contract.
- `docs/marea/bundles/MAREA-*-COMMERCIAL-SPEC.md` (D2–D7) — the six 24-field bundle specifications.
- `docs/marea/bundles/BUNDLE-CONFIGURATION-RULES.md` (D9) — inclusion, dependency, eligibility and
  deterministic outcome rules.
- `docs/marea/bundles/BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md` (D10) — one entitlement ledger and isolation.
- `docs/marea/bundles/BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` (D11) — hypothesis challenge and cost framework.
- `docs/marea/bundles/BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` (D12) — sales and fulfilment routes.
- `docs/marea/bundles/BUNDLE-CUSTOMER-JOURNEYS.md` (D13) — 17-stage journeys and cross-sell.
- `docs/marea/bundles/BUNDLE-CUSTOMER-COMPARISON.md` (D14) — customer comparison.
- `docs/marea/bundles/BUNDLE-ASSET-REQUIREMENTS.md` (D16) — 60 planned assets.
- `scripts/check-marea-bundles.mjs`, `scripts/check-marea-bundles.test.mjs` (D18) — deterministic validation.

**Status statement.** Six bundle definitions exist and are internally complete. None is for sale, quotable,
publishable, orderable, certified, compatible or approved. The MAREA brand is proposed and not legally
cleared; OPEN-MARINE source rights are not cleared; no price is approved; no image is generated.
