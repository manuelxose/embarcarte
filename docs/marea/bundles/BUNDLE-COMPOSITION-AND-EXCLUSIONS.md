# MAREA — Bundle composition and exclusions matrix (MC-08 / D8)

| Field | Value |
| --- | --- |
| Document ID | MC-08 / D8 / BUNDLE-COMPOSITION-AND-EXCLUSIONS |
| Milestone | MC-08 (Master Prompt 08/36) |
| Deliverable | D8 — canonical line-item comparison of mandatory, conditional, optional and excluded components |
| Owner | Lead (Chief Commercial Product Officer) |
| Status | INTERNAL. Bundle definitions only. NOT a catalogue, NOT a quotation, NOT an orderable SKU, NOT a public offer |
| Lifecycle | All six bundles `DEFINED` internally; all `NOT_FOR_SALE`; `INTERNAL_ONLY` |
| Price status | `HYPOTHESIS_UNAPPROVED` / `NOT ESTABLISHED`; no price approved |
| Brand / source IP | `NOT_GRANTED` / `NOT_CLEARED` |
| Base | MC-07 HEAD `80c66c70a1bab6f11c5ba5709baa4c1671f1d6da` |
| Branch | `feature/marea-mc08-bundles-commercial-architecture` |
| Date | 2026-10-30 |
| Write scope | This file only |
| Is not | A quotation, a contract, an order, an availability statement, a compatibility certification or a price approval |

This matrix is the canonical human-readable composition view. The machine-readable authority is
`bundle-definitions.json` (D17); the narrative authority for each bundle is its specification (D2–D7); the
architecture and vocabulary are fixed by `BUNDLE-ARCHITECTURE.md` (D1). Where a line's price is not
established, the matrix says so and does not substitute a figure.

---

## 1. How to read the matrix

- **Inclusion** uses the exact MC-08 vocabulary: `INCLUDED`, `REQUIRED_EXTERNAL`, `OPTIONAL`, `CONDITIONAL`,
  `NOT_INCLUDED`, `INELIGIBLE`, `QUOTATION_REQUIRED`.
- **Price status** is `HYPOTHESIS_UNAPPROVED`, `NOT_ESTABLISHED`, `QUOTATION_ONLY` or `NOT_APPLICABLE`
  (external services without a programme price). No cell contains an approved price.
- **Cost status** is `NOT_ESTABLISHED` until a BOM, supplier quotation, labour rate, data/provider contract or
  connectivity quote exists. MC-08 establishes none.
- **Compatibility** is `UNKNOWN`, `PLANNED`, `CONDITIONAL`, `BLOCKED` or `PROHIBITED`; **no row is
  `SUPPORTED` or `TESTED`** in the whole programme. The source row id is given (A-02, I-08, N-02, etc.).
- **Installation** is `SELF_INSTALL_NOT_VERIFIED`, `INSTALLER_ASSISTED`, `PROFESSIONAL_REQUIRED`,
  `QUOTATION_REQUIRED` or `NOT_APPLICABLE`.
- Component inclusion is commercial scope, not a compatibility guarantee. A line can be `INCLUDED` and its
  integration still `UNKNOWN`.
- **Line ids.** This document uses bundle-scoped display ids (`ST-`, `CR-`, `SL-`, `PR-`, `CP-`, `FP-`). The
  six specifications may number the same lines locally (`S-01`, `C-01`, `PR-01` or plain row numbers); the
  order and family/edition content are the authority and the machine contract carries its own `lineId`.
  Compatibility rows are never line ids: they are cited as `A-02`, `I-08`, `N-02`, etc. from their registers.

---

## 2. Master matrix — family × bundle

Editions below are the reference configuration. Where an alternative edition exists it is shown as optional
or excluded; it is never silently substituted.

| Family (reference edition) | START | CRUISE | SAIL | PROTECT | COMPLETE | FLEET package |
| --- | --- | --- | --- | --- | --- | --- |
| `NAV` `NAV-PRO` | `INCLUDED` (ST-02) | — | `INCLUDED` (SL-01) | — | `INCLUDED` (CP-01) | — |
| `NAV` `NAV-ESSENTIAL` | `NOT_INCLUDED` variant (ST-08) | `INCLUDED` (CR-01) | — | — | — | — |
| `HUB` `HUB-STANDARD` | `INCLUDED` (ST-01) | `INCLUDED` (CR-02) | `INCLUDED` (SL-02) | `OPTIONAL` (PR-04) | — | `OPTIONAL` (FP-06) |
| `HUB` `HUB-PRO` | `OPTIONAL` (ST-03) | — | — | — | `INCLUDED` (CP-02) | — |
| `AIS` `AIS-RECEIVER` | `NOT_INCLUDED` (cross-sell) | `INCLUDED` (CR-03) | — | — | `OPTIONAL` (CP-10) | — |
| `AIS` `AIS-CONNECTED` | — | `CONDITIONAL`, not selected (CR-06) | — | — | `CONDITIONAL`, not selected | — |
| `DISPLAY` `DISPLAY-7` | — | `INCLUDED` (CR-04) | — | — | `INCLUDED` (CP-03) | — |
| `DISPLAY` `DISPLAY-LARGE-CONDITIONAL` | — | `INELIGIBLE` (CR-07) | — | — | `INELIGIBLE` (CP-14) | — |
| `PILOT` `PILOT-COASTAL` | — | — | `QUOTATION_REQUIRED` (SL-03) | — | `QUOTATION_REQUIRED` (CP-09) | — |
| `PILOT` `PILOT-SAIL` | — | — | `CONDITIONAL`, not default (SL-05) | — | `CONDITIONAL`, not default | — |
| `PILOT` `PILOT-PRO` | — | — | `INELIGIBLE` as priced SKU (SL-06) | — | `INELIGIBLE` as priced SKU (CP-13) | — |
| `SENSE` `SENSE-WIND` | — | — | `CONDITIONAL` steering input (SL-04) | — | `OPTIONAL` (only for a future wind mode) | — |
| `SENSE` `SENSE-POWER` | — | — | — | via `SENSE-ESSENTIALS` kit (PR-02) | `INCLUDED` (CP-05) | `OPTIONAL` |
| `SENSE` `SENSE-BILGE` | — | — | — | via `SENSE-ESSENTIALS` kit (PR-02) | `INCLUDED` (CP-06) | `OPTIONAL` |
| `SENSE` `SENSE-TANKS` | — | — | — | `OPTIONAL` expansion | `INCLUDED` (CP-07) | `OPTIONAL` |
| `SENSE` `SENSE-ENV` | — | — | — | `OPTIONAL` expansion | `INCLUDED` (CP-08) | `OPTIONAL` |
| `SENSE` `SENSE-ESSENTIALS` kit | — | — | — | `INCLUDED` (PR-02) | — (explicit modules used) | `OPTIONAL` |
| `SENSE` `SENSE-SAIL` kit | — | — | `NOT_INCLUDED` alternative | — | — | — |
| `SENSE` `SENSE-SYSTEMS` kit | — | — | — | — | `NOT_INCLUDED` conditional alternative (CP-12) | `OPTIONAL` |
| `WATCH` `WATCH-CORE` | — | — | — | `INCLUDED` (PR-01) | `INCLUDED` (CP-04) | `OPTIONAL` per vessel (FP-05) |
| `WATCH` `WATCH-PLUS` | — | — | — | `CONDITIONAL`, not selected (PR-05) | `CONDITIONAL`, not selected | `CONDITIONAL` |
| `WEATHER` `WEATHER-STANDARD` | `OPTIONAL` (ST-04) | `OPTIONAL` (CR-08) | — | — | — | — |
| `WEATHER` `WEATHER-PRO` | — | `OPTIONAL` | — | — | `OPTIONAL` (CP-11) | — |
| `FLEET` `FLEET-START` | — | — | — | — | — | `INCLUDED` or `FLEET-BUSINESS` (FP-01) |
| `FLEET` `FLEET-BUSINESS` | — | — | — | — | — | `INCLUDED` alternative (FP-01) |
| `FLEET` `FLEET-ENTERPRISE` | — | — | — | — | — | `CONDITIONAL` contracted (FP-02) |
| External connectivity / SIM / data | `REQUIRED_EXTERNAL` (internet for licence/updates; local data works offline) | `REQUIRED_EXTERNAL` | `REQUIRED_EXTERNAL` (GNSS/local only) | `REQUIRED_EXTERNAL` (cellular data plan) | `REQUIRED_EXTERNAL` | `REQUIRED_EXTERNAL` per connected device |
| Charts / licensed data | `REQUIRED_EXTERNAL` region licence | `REQUIRED_EXTERNAL` region licence | `REQUIRED_EXTERNAL` region licence | — | `REQUIRED_EXTERNAL` region licence | — |
| Installation | `INSTALLER_ASSISTED` | `PROFESSIONAL_REQUIRED` | `QUOTATION_REQUIRED` | `INSTALLER_ASSISTED` | `QUOTATION_REQUIRED` | `OPTIONAL` / `QUOTATION_REQUIRED` |
| Survey | Compatibility assessment (OPEN) | Compatibility assessment | Vessel + steering survey required | Installation assessment | Full compatibility + safety survey | Organisation + vessel assessment |

Reading rules: `CONDITIONAL` is never selected by default; `INELIGIBLE` cannot be added to the bundle;
`NOT_INCLUDED` is out of this bundle's scope but may be bought as its own product (cross-sell). The FLEET
subscription is per vessel per month, VAT excluded; hardware and connectivity are never included in that fee.

---

## 3. Line-item detail

### 3.1 START (`HUB-STANDARD` + `NAV-PRO`)

| Line | Component | Inclusion | Qty | Role | Dependencies | Subscription | Compatibility | Price | Cost | Install | Release blockers |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| ST-01 | `HUB` `HUB-STANDARD` | `INCLUDED` | 1 | Local onboard data gateway and dashboard | Power, mounting, compatible equipment | None | A-02 `UNKNOWN`; B-03/B-08 `UNKNOWN` | EUR 349 hypothesis | `NOT_ESTABLISHED` | `INSTALLER_ASSISTED` | H-04, H-05, H-07, P-02 |
| ST-02 | `NAV` `NAV-PRO` | `INCLUDED` | 1 | Connected navigation with live instrument overlays | Device, chart licence, HUB data path | 1-year NAV Pro subscription, renewal | A-02 `UNKNOWN`; N10 `BLOCKED` integration | EUR 149/yr hypothesis | `NOT_ESTABLISHED` | `SELF_INSTALL_NOT_VERIFIED` (app) | P-01, D-01, D-04, D-09 |
| ST-03 | `HUB` `HUB-PRO` | `OPTIONAL` | 1 | Wider validated envelope, installer tooling | Installer assessment | None | A-02 `UNKNOWN`; H-04 | EUR 499 hypothesis | `NOT_ESTABLISHED` | `INSTALLER_ASSISTED` | H-04, H-07, X-05 |
| ST-04 | `WEATHER` `WEATHER-STANDARD` | `OPTIONAL` | 1 | Licensed forecast data | Provider rights | 1-year WEATHER subscription | I-20/N-09 `CONDITIONAL` | EUR 49/yr hypothesis | `NOT_ESTABLISHED` | `SELF_INSTALL_NOT_VERIFIED` | D-04, D-05, D-07 |
| ST-05 | Chart licence (external) | `REQUIRED_EXTERNAL` | 1 region | Licensed charts within purchased coverage | Provider/distributor rights | Annual/per-region licence | A-01 `UNKNOWN` | No programme price | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | D-01, D-02, D-03 |
| ST-06 | Customer device, cabling, adapters, power items (external) | `REQUIRED_EXTERNAL` | 1 set | Device and physical connection | Surveyed compatibility | None | per device `UNKNOWN` | Customer cost | `NOT_ESTABLISHED` | `INSTALLER_ASSISTED` | H-04, H-05 |
| ST-07 | Installation / compatibility assessment (service) | `OPTIONAL` (required for mixed-equipment refit) | 1 | Physical install, configuration, handover | Vessel survey | None | — | `QUOTATION_ONLY` | `NOT_ESTABLISHED` | `INSTALLER_ASSISTED` | X-05, X-06 |
| ST-08 | `NAV` `NAV-ESSENTIAL` | `NOT_INCLUDED` | — | Documented lower-cost variant; no live instrument overlays | — | — | A-02 not applicable | EUR 99/yr hypothesis | `NOT_ESTABLISHED` | — | — |

START price reference: 149 + 349 = 498 first-year component hypotheses vs historical EUR 499. The figure is
only plausible as an uninstalled, product-only, first-year starting reference: no installation, cabling,
compatibility survey, channel margin or wider chart rights. `totalPriceEstablished = false`.

### 3.2 CRUISE (`NAV-ESSENTIAL` + `HUB-STANDARD` + `AIS-RECEIVER` + `DISPLAY-7`)

| Line | Component | Inclusion | Qty | Role | Dependencies | Subscription | Compatibility | Price | Cost | Install | Release blockers |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| CR-01 | `NAV` `NAV-ESSENTIAL` | `INCLUDED` | 1 | Planning + licensed charts + AIS target display | Device/DISPLAY, chart licence | 1-year NAV Essential subscription, renewal | N-02 `PLANNED`; A-04 `UNKNOWN` | EUR 99/yr hypothesis | `NOT_ESTABLISHED` | `SELF_INSTALL_NOT_VERIFIED` | D-01, P-10 |
| CR-02 | `HUB` `HUB-STANDARD` | `INCLUDED` | 1 | Local vessel data gateway | Power, mounting, equipment | None | A-02/B-03/B-08 `UNKNOWN`; N-01 `CONDITIONAL` | EUR 349 hypothesis | `NOT_ESTABLISHED` | `INSTALLER_ASSISTED` | H-04, H-05, H-07, P-02 |
| CR-03 | `AIS` `AIS-RECEIVER` | `INCLUDED` | 1 | Receive-only AIS targets | AIS antenna/splitter, power, local output | None | A-04 `UNKNOWN`; B-07 `UNKNOWN`; N-03 `CONDITIONAL`; C-01/C-02 `BLOCKED`/`UNKNOWN` | EUR 249 hypothesis | `NOT_ESTABLISHED` | `PROFESSIONAL_REQUIRED` | H-08, H-05, P-03, D-09 |
| CR-04 | `DISPLAY` `DISPLAY-7` | `INCLUDED` | 1 | Fixed helm display and presentation surface | Mount, power, cabling, NAV subscription | DISPLAY base software included; NAV separately licensed | N-01/N-02/N-03 `CONDITIONAL`/`PLANNED`; N-04 `CONDITIONAL` | from EUR 699 hypothesis | `NOT_ESTABLISHED` | `PROFESSIONAL_REQUIRED` | H-11, H-05, P-07, X-05 |
| CR-05 | `NAV` `NAV-PRO` | `OPTIONAL` | 1 | Live instruments, CPA/TCPA, multi-device, offline | Same data paths + own-vessel data | 1-year NAV Pro subscription | A-02/A-04 `UNKNOWN` | EUR 149/yr hypothesis | `NOT_ESTABLISHED` | `SELF_INSTALL_NOT_VERIFIED` | P-01, D-09 |
| CR-06 | `AIS` `AIS-CONNECTED` | `CONDITIONAL` (not selected) | — | Richer local networking/diagnostics if justified | Hardware design evidence | None | C-03/C-04 `UNKNOWN`/`BLOCKED` | EUR 399 hypothesis | `NOT_ESTABLISHED` | `PROFESSIONAL_REQUIRED` | C-03/C-04; edition `NOT_YET_JUSTIFIED` |
| CR-07 | `DISPLAY` `DISPLAY-LARGE-CONDITIONAL` | `INELIGIBLE` | — | No frozen size/hardware | — | — | — | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | H-11, H-05 |
| CR-08 | `WEATHER` `WEATHER-STANDARD`/`PRO` | `OPTIONAL` | 1 | Licensed forecast layers | Provider rights | WEATHER subscription | I-20/N-09 `CONDITIONAL` | 49/89 EUR/yr hypotheses | `NOT_ESTABLISHED` | `SELF_INSTALL_NOT_VERIFIED` | D-04, D-05, D-07 |
| CR-09 | AIS VHF antenna, optional splitter (external) | `REQUIRED_EXTERNAL` | 1 | AIS reception | Installation survey | None | C-01 `BLOCKED` | No programme price | `NOT_ESTABLISHED` | `PROFESSIONAL_REQUIRED` | H-08, H-05 |
| CR-10 | Mounts, power items, cabling, installation, commissioning (external/service) | `REQUIRED_EXTERNAL` / `QUOTATION_REQUIRED` | 1 set | Physical installation and handover | Survey | None | — | `QUOTATION_ONLY` | `NOT_ESTABLISHED` | `PROFESSIONAL_REQUIRED` | X-05, H-11 |

CRUISE price reference: 99 + 349 + 249 + 699 = 1,396 vs historical EUR 1,399. The figure is only a
product-only, uninstalled, first-year starting reference; it excludes antenna/splitter, mounts, cabling,
installation, commissioning and channel margin, and is **not** an installed-system price. The NAV-Pro
variant sums 1,446 and would require an unjustified ~3.3% discount. `totalPriceEstablished = false`.

### 3.3 SAIL (`NAV-PRO` + `HUB-STANDARD` + PILOT quotation + wind)

| Line | Component | Inclusion | Qty | Role | Dependencies | Subscription | Compatibility | Price | Cost | Install | Release blockers |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| SL-01 | `NAV` `NAV-PRO` | `INCLUDED` | 1 | Route/waypoint context (read-only input) | Chart licence | NAV subscription | I-01 `PLANNED`; P-01 | EUR 149/yr hypothesis | `NOT_ESTABLISHED` | `SELF_INSTALL_NOT_VERIFIED` | D-01, P-01 |
| SL-02 | `HUB` `HUB-STANDARD` | `INCLUDED` | 1 | Bounded instrument/nav data + read-only PILOT status | Installer survey | None | I-02 `PLANNED`; A-02 `UNKNOWN` | EUR 349 hypothesis | `NOT_ESTABLISHED` | `INSTALLER_ASSISTED` | H-04, H-05, P-02 |
| SL-03 | `PILOT` `PILOT-COASTAL` (quoted configuration) | `QUOTATION_REQUIRED` | 1 | Supervised steering system | Vessel+steering survey, drive eligibility | None (no subscription) | I-01/I-02/I-05 `PLANNED`/`CONDITIONAL` | from EUR 1,290 starting hypothesis only, not a quotation | `NOT_ESTABLISHED` | `QUOTATION_REQUIRED` | H-01, P-04, `PILOT_SAFETY_GATE = BLOCKED` |
| SL-04 | `SENSE` `SENSE-WIND` | `CONDITIONAL` | 1 | Wind measurement; sail steering input only after qualification | Masthead install, calibration | None | I-04 `CONDITIONAL`; P-05 | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `PROFESSIONAL_REQUIRED` | H-01, P-05, I-04 |
| SL-05 | `PILOT` `PILOT-SAIL` | `CONDITIONAL` (not default) | — | Verified wind-angle steering | H-01 evidence | None | I-04 `CONDITIONAL` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `QUOTATION_REQUIRED` | H-01, P-04 |
| SL-06 | `PILOT` `PILOT-PRO` | `INELIGIBLE` as priced SKU | — | Quoted installation scope only | Survey | None | I-28 `CONDITIONAL` service tooling | `NOT_ESTABLISHED` (quoted) | `NOT_ESTABLISHED` | `QUOTATION_REQUIRED` | D-008/D-009 |
| SL-07 | `SENSE` `SENSE-SAIL` kit | `NOT_INCLUDED` (optional alternative) | — | Wind+environment kit, conditional | Measurement evidence | None | I-04 `CONDITIONAL` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `PROFESSIONAL_REQUIRED` | P-05 |
| SL-08 | Survey, drive/actuator, rudder feedback, cabling, E-stop, mechanical interfaces, labour, commissioning, supervised sea trials, training, conformity, warranty reserve | `QUOTATION_REQUIRED` / `REQUIRED_EXTERNAL` | 1 scope | Complete installed steering solution | Documented survey and safety plan | None | I-05 `CONDITIONAL`; safety gate | `QUOTATION_ONLY` | `NOT_ESTABLISHED` | `QUOTATION_REQUIRED` | H-01, H-03, H-10, P-04, X-05 |

SAIL status: `FULL_BUNDLE_PRICE_NOT_ESTABLISHED`, `VESSEL_SURVEY_REQUIRED`,
`INSTALLER_QUOTATION_REQUIRED`, `PILOT_SAFETY_GATE_BLOCKED`. **No fixed-price checkout path. The historical
EUR 1,990 is recorded for traceability only and is never presented as a full installed SAIL price.** The
indicative component hypothesis floor 149 + 349 + 1,290 + 99 = 1,887 excludes everything in SL-08.

### 3.4 PROTECT (`WATCH-CORE` + `SENSE-ESSENTIALS`)

| Line | Component | Inclusion | Qty | Role | Dependencies | Subscription | Compatibility | Price | Cost | Install | Release blockers |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| PR-01 | `WATCH` `WATCH-CORE` | `INCLUDED` | 1 | Monitoring hardware + service | Power, mounting, cellular coverage, device identity | **Required** monitoring subscription, from EUR 9.90/mo hypothesis | I-08 `PLANNED` (sensor inputs); WATCH service `NOT_FOUND` | EUR 299 hardware hypothesis | `NOT_ESTABLISHED` | `INSTALLER_ASSISTED` | P-06, H-12, X-07 |
| PR-02 | `SENSE` `SENSE-ESSENTIALS` kit (expands to `SENSE-POWER` + `SENSE-BILGE`) | `INCLUDED` | 1 | DC/battery + bilge measurement | Installation, calibration | None | I-08 `PLANNED`; SENSE accuracy `NOT_MEASURED` | `NOT_ESTABLISHED` (kit needs its own cost sheet) | `NOT_ESTABLISHED` | `PROFESSIONAL_REQUIRED` (electrical/bilge work) | P-05, H-05, P-02 |
| PR-03 | `SENSE` `SENSE-POWER` / `SENSE-BILGE` loose module | `INELIGIBLE` when PR-02 present | — | Duplicate counting | — | — | — | — | — | — | conflict CF-03 |
| PR-04 | `HUB` `HUB-STANDARD` | `OPTIONAL` | 1 | Optional local combined dashboard; **not required** | — | None | I-06/I-11 `PLANNED`/`CONDITIONAL` | EUR 349 hypothesis | `NOT_ESTABLISHED` | `INSTALLER_ASSISTED` | H-04, H-05, P-02 |
| PR-05 | `WATCH` `WATCH-PLUS` | `CONDITIONAL` (not selected) | — | Additional inputs/rules/retention if validated | Validation+costing | Required, price `NOT_ESTABLISHED` | — | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | P-06, D-008 |
| PR-06 | Cellular/SIM/data plan (external) | `REQUIRED_EXTERNAL` | 1 | Connectivity for remote monitoring | Coverage at berth | Separate data contract; **not included** in hardware or subscription hypothesis | H-12 `NOT_FOUND` | No programme price | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | H-12 |
| PR-07 | Monitoring subscription (recurring) | `INCLUDED` (required, recurring) | 1 | Remote monitoring service entitlement | Active account, connectivity | from EUR 9.90/mo hypothesis; contents OPEN | WATCH_SUBSCRIPTION_SERVICE `NOT_FOUND` | hypothesis | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | P-06 |
| PR-08 | Installation materials, labour, commissioning, consent/privacy notice | `REQUIRED_EXTERNAL` | 1 set | Physical install and account setup | Installation assessment | None | — | `QUOTATION_ONLY` | `NOT_ESTABLISHED` | `INSTALLER_ASSISTED` | X-05, X-07 |

PROTECT price verdict: `HISTORIC_PRICE_NOT_COST_JUSTIFIED`. WATCH-CORE 299 + the two-module Essentials floor
(2 × EUR 99 entry hypothesis = 198, symbolic) = 497 > 399. EUR 399 only fits WATCH 299 + one module 99 = 398,
contradicting the promised power+bilge composition and excluding cabling, setup and channel costs. Final
price `OPEN`; subscription is separate and SIM/data is not included.

### 3.5 COMPLETE

| Line | Component | Inclusion | Qty | Role | Dependencies | Subscription | Compatibility | Price | Cost | Install | Release blockers |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| CP-01 | `NAV` `NAV-PRO` | `INCLUDED` | 1 | Connected navigation | Chart licence, device | NAV subscription | A-02/A-04/N-02 | EUR 149/yr hypothesis | `NOT_ESTABLISHED` | `SELF_INSTALL_NOT_VERIFIED` | P-01, D-01 |
| CP-02 | `HUB` `HUB-PRO` | `INCLUDED` | 1 | Wider envelope, integration capacity, installer tooling, commissioning record | Survey, power, cabling | None | A-02/B-03/B-08 `UNKNOWN` | EUR 499 hypothesis | `NOT_ESTABLISHED` | `PROFESSIONAL_REQUIRED` | H-04, H-05, H-07, P-02 |
| CP-03 | `DISPLAY` `DISPLAY-7` | `INCLUDED` | 1 | Fixed helm display | Mount, power, cabling | DISPLAY software; NAV separate | N-01/N-02 `CONDITIONAL`/`PLANNED` | from EUR 699 hypothesis | `NOT_ESTABLISHED` | `PROFESSIONAL_REQUIRED` | H-11, H-05, P-07 |
| CP-04 | `WATCH` `WATCH-CORE` | `INCLUDED` | 1 | Remote monitoring hardware + service | Connectivity, subscription | Required monitoring subscription | I-08/I-11 `PLANNED`/`CONDITIONAL` | EUR 299 + 9.90/mo hypotheses | `NOT_ESTABLISHED` | `INSTALLER_ASSISTED` | P-06, H-12, X-07 |
| CP-05 | `SENSE` `SENSE-POWER` | `INCLUDED` | 1 | DC/battery measurement | Installation, calibration | None | I-06 `PLANNED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `PROFESSIONAL_REQUIRED` | P-05, H-05 |
| CP-06 | `SENSE` `SENSE-BILGE` | `INCLUDED` | 1 | Bilge measurement | Installation, calibration | None | I-06 `PLANNED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `PROFESSIONAL_REQUIRED` | P-05, H-05 |
| CP-07 | `SENSE` `SENSE-TANKS` | `INCLUDED` | 1 | Tank levels | Installation, calibration | None | I-06 `PLANNED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `PROFESSIONAL_REQUIRED` | P-05, H-05 |
| CP-08 | `SENSE` `SENSE-ENV` | `INCLUDED` | 1 | Compartment environment | Installation, calibration | None | I-06 `PLANNED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `PROFESSIONAL_REQUIRED` | P-05, H-05 |
| CP-09 | `PILOT` `PILOT-COASTAL` (quoted configuration) | `QUOTATION_REQUIRED` | 1 | Supervised steering | Full survey and safety plan | None | I-01/I-02/I-05 | from EUR 1,290 starting hypothesis only | `NOT_ESTABLISHED` | `QUOTATION_REQUIRED` | H-01, P-04, safety gate `BLOCKED` |
| CP-10 | `AIS` `AIS-RECEIVER` | `OPTIONAL` | 1 | Traffic awareness; not automatic in a premium bundle | Antenna chain | None | A-04/C-01 | EUR 249 hypothesis | `NOT_ESTABLISHED` | `PROFESSIONAL_REQUIRED` | H-08, P-03 |
| CP-11 | `WEATHER` `WEATHER-PRO` | `OPTIONAL` | 1 | Licensed forecast data; not automatic | Provider rights | WEATHER subscription | I-20/N-09 | EUR 89/yr hypothesis | `NOT_ESTABLISHED` | `SELF_INSTALL_NOT_VERIFIED` | D-04, D-05, D-07 |
| CP-12 | `SENSE` `SENSE-SYSTEMS` kit | `NOT_INCLUDED` (conditional alternative) | — | Alternative packaging of four modules | Measurement evidence | None | I-06 | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `CONDITIONAL` |
| CP-13 | `PILOT` `PILOT-PRO` / `PILOT-SAIL` | `INELIGIBLE` as priced SKU / `CONDITIONAL` | — | Quoted scope / unverified wind mode | Survey | None | I-04/I-28 | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `QUOTATION_REQUIRED` | H-01, D-008 |
| CP-14 | `DISPLAY` `DISPLAY-LARGE-CONDITIONAL` | `INELIGIBLE` | — | No frozen size/hardware | — | — | — | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | — | H-11, H-05 |
| CP-15 | Survey, vessel-specific components, labour, commissioning, training, support/maintenance proposal, conformity | `QUOTATION_REQUIRED` | 1 scope | Complete coordinated installation | Survey | None | — | `QUOTATION_ONLY` | `NOT_ESTABLISHED` | `QUOTATION_REQUIRED` | H-01, X-05, X-06 |

COMPLETE status: `VESSEL_SPECIFIC_QUOTATION`; `FIXED_TURNKEY_PRICE = NOT_ESTABLISHED`. Component hypothesis
floor: 149 + 499 + 699 + 299 + (4 × 99 = 396) + 1,290 = 3,332, excluding actuator/drive, cabling, labour,
commissioning, sea trials, conformity, AIS/WEATHER and subscription years — leaving ~158 for the installation
and steering hardware, therefore untenable as a turnkey figure.

### 3.6 FLEET package

| Line | Component | Inclusion | Qty | Role | Dependencies | Subscription | Compatibility | Price | Cost | Install | Release blockers |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| FP-01 | `FLEET` `FLEET-START` or `FLEET-BUSINESS` | `INCLUDED` (required) | per vessel | SaaS operations platform | Organisation account, contract | Per vessel/month, VAT excluded; monthly hypothesis | FLEET service `NOT_IMPLEMENTED` | 49/79 EUR hypotheses | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | P-09, H-12, E-26 |
| FP-02 | `FLEET` `FLEET-ENTERPRISE` | `CONDITIONAL` (contracted) | per contract | Negotiated tier | Written contract | Contracted | — | `NOT_ESTABLISHED`; no invented SLA | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | P-09, SLA not established |
| FP-03 | Organisation onboarding (service) | `INCLUDED` (separately quoted) | 1 | Setup, vessel import, role design, training | Contract | None | — | `QUOTATION_ONLY` | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | X-05, X-06 |
| FP-04 | Device enrollment, permissions, initial data migration (service) | `INCLUDED` (separately quoted) | 1 | Connected-vessel setup | Contract, device list | None | — | `QUOTATION_ONLY` | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | X-05 |
| FP-05 | `WATCH` `WATCH-CORE` | `OPTIONAL` (per vessel) | per vessel | Telemetry + alerts source | Connectivity, WATCH subscription | WATCH subscription separate | I-14/N-16 `CONDITIONAL` | EUR 299 hypothesis (+9.90/mo) | `NOT_ESTABLISHED` | `INSTALLER_ASSISTED` | P-06, H-12 |
| FP-06 | `HUB` `HUB-STANDARD` | `OPTIONAL` | per vessel | Local data source / installation health | Installation | None | I-15/N-17 `CONDITIONAL` | EUR 349 hypothesis | `NOT_ESTABLISHED` | `INSTALLER_ASSISTED` | H-04, H-05, P-02 |
| FP-07 | `SENSE` modules/kits | `OPTIONAL` | per vessel | Additional measurements | Installation | None | I-24/N-19 `UNKNOWN` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `PROFESSIONAL_REQUIRED` | P-05 |
| FP-08 | Cellular/SIM/data (external) | `REQUIRED_EXTERNAL` per connected device | per device | Connectivity | Coverage | Separate data contract | H-12 `NOT_FOUND` | No programme price | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | H-12 |
| FP-09 | Installation, maintenance/service setup (service) | `OPTIONAL` / `QUOTATION_REQUIRED` | per site/vessel | Physical install and service | Site survey | None | — | `QUOTATION_ONLY` | `NOT_ESTABLISHED` | `QUOTATION_REQUIRED` | X-05 |
| FP-10 | Contracted integrations / optional SLA | `CONDITIONAL` | per contract | Custom integration / measurable service commitment | Written contract + measurement | Contracted | — | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | No measured SLA exists |
| FP-11 | Roles, tenant isolation, audit, export/deletion (governance; never edition-gated) | `INCLUDED` in every edition | — | Governance and data portability | Contract | Included | FLEET service `NOT_IMPLEMENTED` | Included | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | P-09, X-07 |
| FP-12 | Standard reporting and service planning | `INCLUDED` in `FLEET-BUSINESS` and above; not in `FLEET-START` (`FL13`) | — | Operational reporting per edition | Contract | Included per edition | FLEET service `NOT_IMPLEMENTED` | Included per edition | `NOT_ESTABLISHED` | `NOT_APPLICABLE` | P-09 |

FLEET flags: `contractedSolution = true`; `hardwareIncludedByDefault = false`;
`onboardingPricingEstablished = false`; `fixedPackagePriceEstablished = false`. The package is bespoke; no
package price, hardware bundle, onboarding price or enterprise contract exists.

---

## 4. External and required-service matrix (who supplies what)

| Requirement | START | CRUISE | SAIL | PROTECT | COMPLETE | FLEET package |
| --- | --- | --- | --- | --- | --- | --- |
| Customer device (phone/tablet/PC) | required | required for planner use | optional | not required | required | not required |
| Licensed chart region | required | required | required | — | required | — |
| AIS antenna / VHF splitter | — | required | — | — | optional (AIS) | — |
| Mounts, power items, cabling | required | required | required | required | required | per installed device |
| GNSS source | device/GNSS | device/HUB | PILOT GNSS (conditional) | — | device/HUB/PILOT | per vessel |
| SIM/data plan | optional (internet) | optional (internet) | — | **required** | **required** (WATCH) | **required** per connected device |
| Professional survey | compatibility assessment | compatibility assessment | **vessel + steering survey required** | installation assessment | **full compatibility + safety survey** | organisation + vessel assessment |
| Installation labour | installer-assisted | professional required | quotation required | installer-assisted | quotation required | optional/quotated |
| Commissioning | included in install service | required | required + supervised sea trial | required | required per subsystem | per site |
| Training | basic handover | basic handover | owner training | app onboarding | customer training | organisation training |
| Warranty owner | EMBARCARTE (future terms OPEN) | EMBARCARTE | EMBARCARTE + installer scope | EMBARCARTE | EMBARCARTE + installer scope | EMBARCARTE + contracted terms |
| Connectivity/provider costs | provider licence | provider licence + connectivity | none beyond local | **separate data contract** | separate data contract | separate data contracts |

No item in this table may be described as included in a bundle price while its cost is unestablished.

---

## 5. Master exclusion list

The following are excluded from **all six** bundles unless explicitly listed above and priced separately:

- Any product family, edition or module not named in §2; any new SKU or special edition.
- AIS transmission, transponder, DSC or own-position broadcast; collision-avoidance guarantees.
- NMEA 2000 certification or blanket compatibility; universal compatibility with any boat or electronics.
- ECDIS, ECDIS-equivalent or official-chart-system status.
- Remote, cloud-mediated or autonomous helm/steering/throttle/motor control; unattended navigation.
- Guaranteed alert delivery, immediate notification, theft prevention/recovery guarantee, certified distress
  or SOLAS/GMDSS service.
- Unlimited charts, unlimited data, unlimited vessels/users/storage/API or "all regions included".
- Installation labour, surveys, commissioning, sea trials, training, conformity or certification unless the
  specific line says `INCLUDED`/`QUOTATION_REQUIRED`.
- Antennas, splitters, mounts, cabling, adapters, power items, SIM/data plans and third-party licences.
- Any subscription entitlement not named in the bundle; any duplicate charge for the same entitlement.
- Any future feature that is not in the defined end-state specification; "unlimited future upgrades".
- Any security certification, uptime figure, SLA (except a contracted measured commitment) or customer
  reference in the FLEET package.
- Any bundle-level inheritance of a product's certification, compatibility, price approval or publication.

Bundle-specific exclusions are enumerated in D2–D7 field B09 and in the machine contract `exclusions[]`.

---

## 6. Duplicate, conflict and integrity checks

The composition matrix is protected by the 20 mandatory conflict rules of
`BUNDLE-CONFIGURATION-RULES.md` and `bundle-definitions.json` (CF-01–CF-20). In particular:

- A mandatory base component cannot be removed (CF-01).
- The same family/edition cannot appear twice; a kit plus its loose modules is a duplicate (CF-02, CF-03).
- Edition combinations must be internally coherent; `DISPLAY-7` and `DISPLAY-LARGE-CONDITIONAL` cannot both
  be selected, and the conditional display is never an available size (CF-04, CF-07).
- `PILOT-PRO` is never a retail priced line (CF-08); PILOT is never inside a fixed-price SAIL/COMPLETE
  checkout (CF-09).
- AIS never appears as transmission (CF-05); NMEA 2000 is never certified (CF-06).
- WATCH always declares a monitoring entitlement (CF-10); no subscription-free cloud monitoring (CF-11).
- Charts/data entitlements are declared or the configuration is not eligible for the promised outcome
  (CF-12); no NAV/WEATHER duplicate charge (CF-13).
- Sensor accuracy and compatibility claims require evidence (CF-14, CF-15).
- FLEET package is never confused with FLEET SaaS (CF-16); no cross-tenant grant (CF-17); no remote PILOT
  path (CF-18); no approved price without costs (CF-19); a blocked product is never promoted to sale by
  packaging (CF-20).

---

## 7. Subscription and entitlement summary

| Entitlement | Required by | Term / cadence | Renewal | Cancellation / expiry |
| --- | --- | --- | --- | --- |
| NAV subscription | START (`NAV-PRO`), CRUISE (`NAV-ESSENTIAL`), SAIL/COMPLETE (`NAV-PRO`) | 1 year (hypothesis) | Annual; price `HYPOTHESIS_UNAPPROVED` | Customer exports own routes/waypoints/log; offline rights only where licensed; no data loss of customer-owned records |
| WEATHER subscription | Optional in START/CRUISE/COMPLETE; standalone purchase | 1 year (hypothesis) | Annual; VAT basis `OPEN` | Honest unavailable state; no fabricated forecast; user records retained with defined export window (D-013) |
| WATCH monitoring subscription | PROTECT and COMPLETE (`WATCH-CORE`); optional in FLEET | Monthly (hypothesis) | Monthly | Remote monitoring stops; local measurement, local alarms and safety functions continue |
| FLEET SaaS subscription | FLEET package | Per vessel/month, VAT excluded (hypothesis) | Per contract | Data export/deletion per contract; WATCH/HUB ownership unaffected; telemetry read-only |
| SIM/data plan | External in PROTECT/COMPLETE/FLEET | Provider contract | Provider terms | Remote functions stop; local functions unaffected |
| PILOT | No subscription | — | — | **No firmware licence check may sit on the control path**; subscription expiry never disables steering or safety |

One account, one entitlement ledger; no double billing for NAV/WEATHER; no bundle-level second charge for an
already granted entitlement. Detail: `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md` (D10).

---

## 8. Readiness summary

| Bundle | Definition | Compatibility evidence | Installation | Entitlements | Pricing | Overall |
| --- | --- | --- | --- | --- | --- | --- |
| START | `COMPLETE_TARGET_SPECIFICATION` | `REQUIRED` (0 tested rows) | `ASSESSMENT_REQUIRED` | Defined; NAV renewal | `HYPOTHESIS_UNAPPROVED`; installed price not established | `DEFINED` / `NOT_FOR_SALE` |
| CRUISE | `COMPLETE_TARGET_SPECIFICATION` | `REQUIRED` (AIS/DISPLAY/HUB untested) | `PROFESSIONAL_REQUIRED` | Defined; NAV + optional WEATHER | `HYPOTHESIS_UNAPPROVED`; installed price not established | `DEFINED` / `NOT_FOR_SALE` |
| SAIL | `COMPLETE_TARGET_SPECIFICATION` | `SPECIALIST_SURVEY_REQUIRED` | `QUOTATION_REQUIRED` | Defined; no PILOT subscription | `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` | **`BLOCKED`** (safety gate) |
| PROTECT | `COMPLETE_TARGET_SPECIFICATION` | `REQUIRED`; WATCH service not found | `INSTALLER_ASSISTED` | WATCH subscription required; SIM separate | `HISTORIC_PRICE_NOT_COST_JUSTIFIED`; price OPEN | `DEFINED` / `NOT_FOR_SALE` |
| COMPLETE | `COMPLETE_TARGET_SPECIFICATION` | `SPECIALIST_SURVEY_REQUIRED` | `QUOTATION_REQUIRED` | Defined; WATCH + optional WEATHER | `FIXED_TURNKEY_PRICE = NOT_ESTABLISHED` | **`BLOCKED`** (multiple gates) |
| FLEET package | `COMPLETE_TARGET_SPECIFICATION` | `CONDITIONAL` telemetry integrations | `OPTIONAL` / `QUOTATION_REQUIRED` | FLEET subscription per vessel; WATCH/SIM separate | `BESPOKE`; no package price | `DEFINED` / `NOT_FOR_SALE` |

No bundle is `ORDERABLE`, `FOR_SALE`, `PUBLISHABLE` or certified.

---

## 9. References

- `BUNDLE-ARCHITECTURE.md` (D1) — architecture, vocabulary and reference configurations.
- `MAREA-START-COMMERCIAL-SPEC.md`, `MAREA-CRUISE-COMMERCIAL-SPEC.md`, `MAREA-SAIL-COMMERCIAL-SPEC.md`,
  `MAREA-PROTECT-COMMERCIAL-SPEC.md`, `MAREA-COMPLETE-COMMERCIAL-SPEC.md`,
  `MAREA-FLEET-PACKAGE-COMMERCIAL-SPEC.md` (D2–D7) — 24-field bundle specifications.
- `BUNDLE-CONFIGURATION-RULES.md` (D9) — inclusion, dependency, eligibility and conflict rules.
- `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md` (D10) — entitlement ledger and isolation.
- `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` (D11) — hypothesis challenge and cost framework.
- `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` (D12) — fulfilment and quotation routes.
- `bundle-definitions.json` (D17) — machine-readable composition authority.
- `scripts/check-marea-bundles.mjs`, `scripts/check-marea-bundles.test.mjs` (D18) — deterministic validation.
- `docs/marea/products/PRODUCT-EDITIONS-*.md`, `PRODUCT-COMPATIBILITY-*.md`,
  `PRODUCT-PRICING-AND-CHANNEL-MODEL*.md`, `docs/marea/execution/DECISION-LOG.md` D-007–D-024.

**Status statement.** The six compositions are defined, internally complete and deliberately not sellable.
All prices are unapproved hypotheses or not established; all compatibility evidence is missing or untested;
all installations are quoted or assessed; no bundle is a product family, a quotation, an order or a public
offer.
