# MAREA — Bundle comparison for customers (MC-08 / D14, internal draft)

| Field | Value |
| --- | --- |
| Document ID | MC-08 / D14 / BUNDLE-CUSTOMER-COMPARISON |
| Milestone | MC-08 (Master Prompt 08/36) |
| Deliverable | D14 — customer-understandable comparison of the six bundles |
| Owner | Lead (Chief Commercial Product Officer) |
| Status | INTERNAL DRAFT. Not published. Comparison definitions only; not a quotation, offer, order or availability statement |
| Lifecycle | All six bundles `DEFINED` internally; all `NOT_FOR_SALE`; `INTERNAL_ONLY` |
| Price | No price, discount or monthly amount appears in this comparison |
| Brand / source IP | `NOT_GRANTED` / `NOT_CLEARED` |
| Base | MC-07 HEAD `80c66c70a1bab6f11c5ba5709baa4c1671f1d6da` |
| Branch | `feature/marea-mc08-bundles-commercial-architecture` |
| Date | 2026-10-30 |
| Write scope | This file only |
| Is not | A product page, an advertisement, a price list, a warranty, an offer or a sales contract |

This document is written so that an internal reviewer, a future copywriter or a future salesperson can
explain the six solutions consistently and honestly. It intentionally contains **no prices and no
availability promises**. The customer-facing drafts are in `copy/` (D15); this is the internal comparison
they must respect.

---

## 1. The one-sentence difference

| Bundle | One-sentence difference |
| --- | --- |
| **MAREA START** | Brings the data your boat already produces into modern navigation, without replacing your instruments. |
| **MAREA CRUISE** | Adds a fixed helm screen and receive-only traffic awareness on top of connected navigation. |
| **MAREA SAIL** | Integrates navigation, instruments and supervised steering for sailing, installed and surveyed as a vessel-specific project. |
| **MAREA PROTECT** | Lets you see selected conditions — power and bilge first — from ashore, with honest alert states. |
| **MAREA COMPLETE** | Coordinates navigation, instruments, display, monitoring and supervised steering into one professionally installed system. |
| **MAREA FLEET package** | Gives a professional operator the FLEET operations platform plus onboarding, optional equipment, connectivity and support. |

---

## 2. Who each bundle is for

| Bundle | Best fit | Poor fit |
| --- | --- | --- |
| START | Owner of an older coastal sail/motor boat who keeps working instruments and wants modern licensed navigation plus onboard data; one vessel, one skipper. | A boat with no compatible data source; a customer who wants a fixed helm display or traffic reception; anyone expecting a finished installation without an assessment. |
| CRUISE | Coastal cruiser who wants charts, received traffic and a permanent helm display, and who accepts a professional installation and licensed charts. | Anyone expecting AIS transmission, collision avoidance, a transponder or a free/complete chart library; a boat where antenna routing or mounting is impossible. |
| SAIL | Sailing-yacht owner who wants a surveyed, professionally installed supervised steering system with navigation and instrument context. | Anyone expecting autonomous, unattended or remote steering; a boat whose drive/actuator cannot be verified; a buyer who wants a fixed click-and-buy price. |
| PROTECT | Absent owner in a marina or mooring who wants bilge and power awareness ashore and accepts that alerting depends on power, coverage and the provider. | A professional fleet operator (that is the FLEET package); anyone expecting theft recovery, a certified distress service or guaranteed instant alerts; a boat without coverage or suitable power. |
| COMPLETE | Owner/refit customer who wants one coordinated, professionally installed system across several domains and accepts per-subsystem acceptance and a survey-led quotation. | A buyer looking for a boxed product list, unlimited features, a fixed turnkey price or remote/autonomous steering; a vessel that cannot pass the safety prerequisites. |
| FLEET package | Charter company, sailing school, marina, maintenance provider, small management firm or professional operator managing several vessels. | A single owner wanting a consumer monitoring product (PROTECT); an organisation expecting hardware inside the per-vessel subscription; anyone expecting a guaranteed SLA without a contract. |

---

## 3. What each bundle includes

The table states the **reference configuration**. Optional additions are shown in §4; exclusions in §5.

| | START | CRUISE | SAIL | PROTECT | COMPLETE | FLEET package |
| --- | --- | --- | --- | --- | --- | --- |
| Navigation software | `NAV-PRO` | `NAV-ESSENTIAL` | `NAV-PRO` | — | `NAV-PRO` | — |
| Onboard data gateway | `HUB-STANDARD` | `HUB-STANDARD` | `HUB-STANDARD` | `HUB-STANDARD` optional only | `HUB-PRO` | `HUB-STANDARD` optional |
| Receive-only traffic | — | `AIS-RECEIVER` | — | — | `AIS-RECEIVER` optional | optional via equipment |
| Fixed helm display | — | `DISPLAY-7` | — | — | `DISPLAY-7` | — |
| Supervised steering | — | — | `PILOT-COASTAL` quoted | — | `PILOT-COASTAL` quoted | — |
| Wind measurement | — | — | `SENSE-WIND` conditional | — | optional (future wind mode) | — |
| Monitoring device + service | — | — | — | `WATCH-CORE` + subscription | `WATCH-CORE` + subscription | `WATCH-CORE` optional per vessel |
| Sensors | — | — | — | power + bilge via `SENSE-ESSENTIALS` | power, bilge, tanks, environment | modules optional |
| Weather data | optional | optional | — | — | optional | optional/contracted |
| Installation | assessment, installer-assisted | professional installation | survey + quotation + commissioning + sea trial | installation + commissioning | survey + project installation + training | onboarding; installation optional/quoted |
| Training | basic handover | basic handover | owner training + supervised trial | app onboarding + recipients | per-subsystem training | organisation training |
| Support | product support (terms open) | product support (terms open) | specialist support (terms open) | product/service support (terms open) | per-subsystem support (terms open) | professional support per contract |

**Kit counting rule (PROTECT and COMPLETE):** a SENSE kit is a package of modules, not an extra capability.
PROTECT's `SENSE-ESSENTIALS` expands to power + bilge, and adding a loose power or bilge module as well would
be a duplicate. COMPLETE uses explicit modules rather than the conditional `SENSE-SYSTEMS` kit.

---

## 4. Optional additions and why they are optional

| Option | Available in | Why optional |
| --- | --- | --- |
| `HUB-PRO` | START | Wider validated equipment envelope and installer tooling; only useful if the boat's equipment needs it. |
| `NAV-PRO` upgrade | CRUISE | Live instruments, CPA/TCPA, multi-device and offline are real additions, but not required for basic charts + traffic on one display. |
| `AIS-CONNECTED` | CRUISE, COMPLETE | Conditional: only if hardware later evidences richer local networking/diagnostics; not selectable today. |
| `AIS-RECEIVER` | COMPLETE | Traffic awareness is valuable but a premium bundle does not automatically include a separate radio receiver. |
| `WEATHER-STANDARD` / `WEATHER-PRO` | START, CRUISE, COMPLETE | Licensed forecast data is a separate entitlement; no double billing when NAV already grants it. |
| `WATCH-CORE` | FLEET package, COMPLETE | Monitoring hardware/service is a separate product with its own subscription and connectivity. |
| `SENSE-TANKS` / `SENSE-ENV` | PROTECT, FLEET package | Additional measured points after installation/calibration evidence. |
| `SENSE-WIND` | COMPLETE | Only relevant for a future verified wind mode; never a generic steering input. |
| `PILOT-SAIL` | SAIL, COMPLETE | Conditional on verified wind-angle steering; not the default. |
| Organisation onboarding, integrations, SLA | FLEET package | Real services/contracts; priced and contracted separately, never implied by the per-vessel fee. |

**Never optional:** tenant isolation, roles, audit, export/deletion, stale-state honesty, subscription
isolation, manual takeover and local safety functions. These are not upgrades and cannot be removed.

---

## 5. What every bundle excludes (read before comparing)

These exclusions apply to **all** bundles unless the composition table explicitly says otherwise:

- **No autonomous, unattended or remote steering**, no cloud-to-helm control, no remote throttle or motor
  command. PILOT is supervised at all times.
- **No AIS transmission**, no transponder, no DSC, no collision-avoidance guarantee, no guarantee that every
  vessel is detected. AIS reception depends on the other vessel transmitting and on the installation.
- **No free or unlimited charts.** Charts are licensed data rights with defined coverage and terms.
- **No guaranteed connectivity, alert delivery or immediate notification.** WATCH depends on power, network
  coverage and the notification provider; acceptance by a provider is not proof a person saw an alert.
- **No theft-prevention or recovery guarantee, and no certified distress/SOLAS/GMDSS service.**
- **No NMEA 2000 certification or "works with any boat" promise.** Compatibility is per device, firmware,
  direction and installation, and no compatibility row is currently tested.
- **No ECDIS or official-chart-system status.**
- **No installation, survey, commissioning, sea trial, training, antenna, splitter, mounting, cabling,
  adapter, power item, SIM/data plan or third-party licence is included in a product-only figure.**
- **No SLA, uptime, security certification, unlimited vessels/users/storage/API or customer reference** in
  the FLEET package unless a written, measurable contract says otherwise.
- **No unlimited future upgrades**, no "all features", no promise that a conditional edition will ship.
- **No availability date, stock, lead time, discount, launch or "turnkey" promise** exists today.

---

## 6. Installation and subscription comparison

| | START | CRUISE | SAIL | PROTECT | COMPLETE | FLEET package |
| --- | --- | --- | --- | --- | --- | --- |
| Can I self-install? | Not verified. HUB self-install only within a future validated envelope; assessment expected. | No. AIS, display mounting, power and commissioning require a professional. | No. Steering is safety-critical and professionally installed. | Not for the electrical/bilge work; installation expected. | No. Project installation only. | Onboarding is a service; equipment install optional/quoted. |
| Is a survey required? | Compatibility assessment | Compatibility assessment | **Vessel and steering survey required** | Installation/coverage assessment | **Full survey + per-subsystem safety assessment** | Organisation/vessel scoping assessment |
| Can I get a fixed price today? | No. Product-only hypotheses only; installed price not established. | No. Installed price not established. | **No. Quotation only; fixed turnkey price not established.** | No. Final price open; historic figure not cost-justified. | **No. Vessel-specific quotation only; no turnkey price.** | No. Bespoke contract; no package price. |
| Recurring subscription | NAV (annual, hypothesis) | NAV (annual) + optional WEATHER | NAV (annual) | WATCH monitoring (monthly hypothesis) | NAV + WATCH (+ optional WEATHER) | FLEET per vessel/month (VAT excluded hypothesis) |
| Connectivity cost | Internet for licence/updates; local data works offline | Internet for licence/updates; local data works offline | Local system; no cloud steering | **Cellular/SIM data plan separate** | **Cellular/SIM data plan separate** | **Separate per connected device** |
| What happens if I stop paying? | NAV features expire; HUB local dashboard continues | NAV/WEATHER data unavailable honestly; local data continues | No steering subscription; steering and safety are not gated | Remote alerts stop; local measurement and local alarms continue | Each entitlement stops honestly; local safety functions continue | Telemetry stops; vessel equipment continues per its own entitlement |

---

## 7. Honest capability comparison (no marketing inflation)

| Capability | START | CRUISE | SAIL | PROTECT | COMPLETE | FLEET package |
| --- | --- | --- | --- | --- | --- | --- |
| Licensed navigation & charts | Yes (licensed region) | Yes (licensed region) | Yes (licensed region) | — | Yes (licensed region) | — |
| Live instrument overlays in navigation | Yes (`NAV-PRO`) | Optional (`NAV-PRO`) | Context only | — | Yes | — |
| Receive-only traffic | Optional cross-sell | Yes | — | — | Optional | Optional via equipment |
| CPA/TCPA interpretation | Optional (`NAV-PRO`) | Optional (`NAV-PRO`) | — | — | Yes (Pro) | — |
| Fixed helm display | — | Yes | — | — | Yes | — |
| Supervised steering | — | — | Quoted, gated | — | Quoted, gated | — |
| Measured wind | — | — | Conditional | — | Optional future mode | — |
| Remote monitoring ashore | — | — | Read-only PILOT status at most (future) | Yes (conditional delivery) | Yes (conditional delivery) | Read-only telemetry per contract |
| Local alarms/sensing without subscription | — | — | Safety functions always | Yes | Yes | — |
| Multi-vessel organisation | — | — | — | — | — | Yes |
| Tenant isolation / roles / audit | — | — | — | — | — | Yes (design requirement, not tested) |
| Remote vessel control | No (prohibited) | No | No | No | No | No (prohibited) |

"Conditional" means the intended capability depends on evidence, a provider right, hardware selection or a
contract that does not yet exist. It is not a promise.

---

## 8. Choosing between the closest bundles

- **START vs CRUISE:** START is software + gateway for an existing device; CRUISE adds a fixed display,
  receive-only traffic and a professional installation. If you already have a good tablet and no need for a
  helm screen or AIS, START is the honest fit.
- **CRUISE vs COMPLETE:** CRUISE is a cruising interface; COMPLETE adds instruments, monitoring and
  supervised steering as a surveyed project. COMPLETE is not "CRUISE plus everything" automatically; each
  added domain has its own prerequisites and acceptance.
- **PROTECT vs FLEET package:** PROTECT monitors one vessel for an owner; the FLEET package manages an
  organisation's vessels and people. WATCH equipment is not a fleet platform and the FLEET fee does not
  include equipment.
- **SAIL vs COMPLETE:** both include a quoted PILOT installation. SAIL is the sailing-focused helm; COMPLETE
  is a wider multi-domain integration. Neither can be bought at a fixed price.
- **START vs SAIL:** they share NAV/HUB, but SAIL's steering scope is safety-critical, surveyed and quoted;
  it is not a software upgrade.

---

## 9. Upgrade map (no double charging, no unnecessary replacement)

| From | To | What is added | What is retained | Critical condition |
| --- | --- | --- | --- | --- |
| START | CRUISE | AIS receiver, display, antenna/mounts, professional installation; optional NAV Pro | Existing HUB and NAV entitlement | Compatibility assessment first |
| START | SAIL | PILOT quoted scope, survey, wind measurement | Existing NAV/HUB | Survey may refuse; safety gate blocked |
| CRUISE | COMPLETE | HUB Pro, WATCH, SENSE modules, PILOT quoted scope, optional WEATHER | Existing NAV, DISPLAY, AIS where functional | Full survey; no unnecessary replacement |
| PROTECT | Expanded SENSE | Tank/environment modules, installation, calibration | WATCH and power/bilge modules | Input/measurement compatibility |
| PROTECT | FLEET package | FLEET subscription, onboarding, roles, reporting | Customer's WATCH devices and subscription | Eligible professional operator; read-only telemetry |
| NAV standalone | START | HUB, cabling/adapters, assessment | Existing NAV subscription (recognised, not rebilled) | Data path assessment |
| WEATHER standalone | NAV integration | NAV licence; shared entitlement where rights allow | Existing WEATHER entitlement (no double billing) | Provider rights and one ledger |

**Rules:** a valid identical entitlement is never charged twice; functional hardware is not replaced without
a stated benefit; an upgrade that crosses into a safety-critical or contracted scope requires its own survey
and quotation; no upgrade bypasses a safety or tenancy boundary.

---

## 10. Comparison-safe language for future copy

Use:
- "Designed for…", "Intended to…", "Requires a compatibility assessment", "Quotation required",
  "Depends on power, network coverage and the notification provider", "Licensed charts within the purchased
  coverage", "Professional installation required".

Avoid:
- "Turnkey", "plug and play", "works with any boat", "guaranteed", "instant", "real-time", "fully
  autonomous", "collision avoidance", "unlimited charts", "free installation", "approved mount", "certified",
  "launching", "available now", "buy now", or any price, discount, stock or review claim.

**Status statement.** This comparison is an internal definition. It contains no price and no availability
promise. None of the six bundles can be bought, quoted, installed, published or ordered today; the MAREA
brand is proposed and not legally cleared, and the products and services described are not for sale.
