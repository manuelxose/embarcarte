# MAREA — the nine-product ecosystem (MC-07 / D12)

| Field | Value |
| --- | --- |
| Document ID | MC-07 / D12 / MAREA-NINE-PRODUCT-ECOSYSTEM |
| Milestone | MC-07 (Master Prompt 07/36) — final product-definition batch |
| Date | 2026-10-30 |
| Owner function | Chief Product Officer (ecosystem coherence owner) |
| Status | INTERNAL ONLY — NOT PUBLISHED — NOT FOR SALE. All nine families are `DEFINED`; none is available |
| Scope | Summary of the nine final product families and their relationships. It does **not** replace the three detailed compatibility matrices, which remain the authority for every pair |
| Authority chain | `docs/marea/COMMERCIAL-PORTFOLIO.md` (end-state offers) → `docs/marea/products/README.md` (lifecycle, readiness, evidence, field and claim rules) → batch contracts `product-definitions.batch-01/02/03.json` (machine truth) → the nine dossiers and the three compatibility documents (detail and evidence) |
| Publication gates | Brand `NOT_GRANTED` (X-01/X-02); OPEN-MARINE rights `NOT_CLEARED` (L-01/L-02/L-03); imagery `BLOCKED` (X-03); sale `NOT_AUTHORISED`; certification `NONE` |

## 1. Why this document exists

MC-05 defined NAV, HUB and AIS. MC-06 defined PILOT, SENSE and WATCH. MC-07 defines DISPLAY, WEATHER and FLEET. After MC-07 the programme
possesses nine complete commercial definitions, **216 mandatory business fields** (9 families × 24 fields), eighteen bilingual product-page
drafts and one shared lifecycle, readiness and evidence model.

This overview answers one question for the next eight milestones: **how do the nine families fit together commercially without double
billing, hidden required purchases, false compatibility claims or safety overreach?** It is a navigation aid across the existing corpus,
not a new governance layer.

## 2. The nine families at a glance

| # | Code | Family | Product type | Commercial role | Editions (batch definitions) | Price state |
| ---: | --- | --- | --- | --- | --- | --- |
| 01 | `NAV` | MAREA NAV | `SOFTWARE` | Navigation application; the planning and passage surface | `NAV-ESSENTIAL`, `NAV-PRO` | `HYPOTHESIS_UNAPPROVED` |
| 02 | `HUB` | MAREA HUB | `HARDWARE` | Onboard data gateway; the integration layer, not a sensor and not a steering controller | `HUB-STANDARD`, `HUB-PRO` | `HYPOTHESIS_UNAPPROVED` |
| 03 | `AIS` | MAREA AIS | `HARDWARE` | Receive-only traffic awareness | `AIS-RECEIVER`, `AIS-CONNECTED` | `HYPOTHESIS_UNAPPROVED` |
| 04 | `PILOT` | MAREA PILOT | `HARDWARE_SOFTWARE` | Supervised steering system, installer-led and safety-critical | `PILOT-COASTAL`, `PILOT-SAIL` (conditional), `PILOT-PRO` (installation package) | `HYPOTHESIS_UNAPPROVED` / `NOT_ESTABLISHED` |
| 05 | `SENSE` | MAREA SENSE | `HARDWARE` | Measurement family (wind, power, bilge, tanks, environment) | `SENSE-WIND`, `SENSE-POWER`, `SENSE-BILGE`, `SENSE-TANKS`, `SENSE-ENV`; kits `SENSE-ESSENTIALS`, `SENSE-SAIL`, `SENSE-SYSTEMS` | `HYPOTHESIS_UNAPPROVED` |
| 06 | `WATCH` | MAREA WATCH | `HARDWARE_SERVICE` | Remote monitoring and alerts service (hardware + subscription) | `WATCH-CORE`, `WATCH-PLUS` | `HYPOTHESIS_UNAPPROVED` |
| 07 | `DISPLAY` | MAREA DISPLAY | `HARDWARE_SOFTWARE` | Fixed marine multifunction display device with its own base software | `DISPLAY-7`, `DISPLAY-LARGE-CONDITIONAL` | `HYPOTHESIS_UNAPPROVED` / `NOT_ESTABLISHED` |
| 08 | `WEATHER` | MAREA WEATHER | `SOFTWARE` | Marine weather intelligence and planning service; separately valuable and NAV-shareable | `WEATHER-STANDARD`, `WEATHER-PRO` | `HYPOTHESIS_UNAPPROVED` |
| 09 | `FLEET` | MAREA FLEET | `SOFTWARE` | Multi-vessel, multi-tenant operations SaaS for organisations | `FLEET-START`, `FLEET-BUSINESS`, `FLEET-ENTERPRISE` (contracted tier) | `HYPOTHESIS_UNAPPROVED` / `NOT_ESTABLISHED` |

**Every family is `DEFINED`, `NOT_FOR_SALE` and `INTERNAL_ONLY`.** No edition above is purchasable; several are conditional on evidence
(see the batch editions documents). No price above is approved.

## 3. The final customer outcome of each family

1. **NAV** — one place to plan, follow and review a passage with licensed charts, GNSS, instruments, AIS overlay and legally supported offline regions. It is software; it does not include chart rights, an AIS receiver, a HUB, WEATHER data or a steering system.
2. **HUB** — connects supported onboard equipment and publishes a local vessel data interface, diagnostics and bounded local automation. It has no sensing element of its own and no steering authority.
3. **AIS** — receive-only traffic awareness: identification, history, CPA/TCPA and alerts. It never transmits, never transponds and never replaces watchkeeping.
4. **PILOT** — a supervised steering system whose engagement is local, whose manual takeover and physical E-stop are design boundaries, and whose claims are bounded by a vessel survey and mode-specific verification.
5. **SENSE** — measured wind, power, bilge, tank and environmental values with stated calibration and range; a measurement is never presented as valid outside its verified envelope.
6. **WATCH** — shore-side awareness of an unattended boat: position, events and alerts, with honest delivery limits. It is not a certified distress service and has no helm function.
7. **DISPLAY** — a fixed, readable helm interface that presents compatible vessel information locally. The customer buys a device with base software; charts, data services, HUB, AIS hardware and PILOT authority are separate or absent.
8. **WEATHER** — understandable, provenance-first marine forecasts with source, timestamps, coverage and limitations, usable standalone and shareable with NAV without paying twice.
9. **FLEET** — one auditable organisation view of vessels, people, maintenance, documents, reporting and **read-only** telemetry. It is not a consumer monitoring clone, not a remote helm and not identical to the MAREA FLEET package.

## 4. The nine mandatory distinctions

These are the most common customer misunderstandings and the most dangerous commercial shortcuts. Each is a design constraint, not a
marketing nuance. The entitlement-sharing rule (one ledger, never billed twice) is a commercial rule, not a market distinction; it is
recorded in §6 and in decision D-013.

| # | Distinction | What is true | What is never true |
| ---: | --- | --- | --- |
| 1 | **NAV is software; DISPLAY is hardware** | DISPLAY is a physical device with an operating environment and its own base software | Buying DISPLAY is not buying NAV Pro, not buying charts and not buying unlimited chart access |
| 2 | **WEATHER is a separate data service** | WEATHER is valuable standalone; NAV can consume authorized WEATHER data | WEATHER does not become free with NAV, and NAV does not become a meteorological authority |
| 3 | **HUB is the integration layer** | HUB connects supported equipment and publishes a local interface | HUB is not a sensor and not a steering controller; a HUB alone measures nothing |
| 4 | **AIS is receive-only hardware** | Reception of other vessels' transmissions, with stale-target states | AIS is not a transponder, not a collision-avoidance system and not a guarantee that every vessel is seen |
| 5 | **SENSE measures; WATCH monitors remotely** | SENSE produces values; WATCH delivers remote alerts with connectivity and subscription | SENSE alone produces no remote alert; WATCH is not a substitute for a measurement |
| 6 | **PILOT is separately validated supervised steering** | Local engagement, physical safety path, installer commissioning and training | No other product may command steering; there is no remote or cloud-to-actuator path anywhere |
| 7 | **FLEET is an organisational SaaS** | Multi-tenant, role-scoped operations and audit for a business | FLEET is not "WATCH with more boats" and never controls a vessel |
| 8 | **FLEET package ≠ FLEET SaaS product** | The package (MC-08) may combine SaaS, onboarding, devices, installation, WATCH, HUB, connectivity and support | A FLEET subscription never silently includes hardware, installation, connectivity or unlimited anything |
| 9 | **DISPLAY ≠ NAV on a tablet** | Fixed installation, vessel power, mounting, dedicated operating environment, local dashboards | A tablet running NAV is not a DISPLAY, and a DISPLAY does not become NAV because it shows a chart when licensed |

## 5. Headline relationships of the three new families

The detailed, evidence-bearing matrix for every pair is `PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` (batch 03),
`PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` (batch 01) and `PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` (batch 02). This table is a summary
only; **no relationship below is `SUPPORTED`**.

| Relationship | Status | Commercial meaning | Binding boundary |
| --- | --- | --- | --- |
| DISPLAY ← HUB | `CONDITIONAL` | DISPLAY can present onboard data that HUB publishes, once a hardware integration is engineered and validated | Requires HUB hardware, a validated local interface and a tested DISPLAY; nothing exists yet |
| DISPLAY ← NAV | `PLANNED` | NAV software may be presented on the DISPLAY as an application surface | Requires approved distribution rights and a validated integration; DISPLAY base software is not NAV |
| DISPLAY ← AIS | `CONDITIONAL` | Received AIS targets can be presented with stale-target indication | Requires an AIS receiver and a validated feed; receive-only semantics mandatory |
| DISPLAY ← SENSE | `CONDITIONAL` | Measured values can be presented with calibration and freshness shown | Requires SENSE modules and, for consolidated data, a HUB |
| DISPLAY ← WEATHER | `CONDITIONAL` | Licensed forecast overlays may be presented | Requires a WEATHER entitlement and provider display rights; not every variable is licensable |
| DISPLAY ← PILOT | `UNKNOWN` | At most read-only PILOT status and alarms on the display | **No steering authority, no engagement control, no remote or web-mediated pilot command** |
| DISPLAY ← WATCH | `UNKNOWN` | No defined relationship in this batch | Not claimed |
| WEATHER ← NAV | `PLANNED` | NAV Pro may consume authorized WEATHER data under the shared-entitlement model | No double billing; provider rights gate every variable; NAV alone is not WEATHER |
| WEATHER ← DISPLAY | `CONDITIONAL` | Licensed overlays on the installed display | Depends on DISPLAY existence and provider display rights |
| WEATHER ← FLEET | `CONDITIONAL` | Weather context in fleet operations only if the provider agreement permits B2B operational use | No redistribution by assumption; no provider data resale |
| WEATHER ← HUB | `CONDITIONAL` | Local caching/presentation only where the licence permits | Caching and offline use require matching source permission |
| FLEET ← WATCH | `CONDITIONAL` | Read-only telemetry and alert history per organization and vessel grant | No control; disconnected vessel is never shown online; provider acceptance is not human delivery |
| FLEET ← HUB | `CONDITIONAL` | Read-only installation/telemetry health where authorized | No bus command authority; HUB stays the local integration layer |
| FLEET ← SENSE | `UNKNOWN` | Only through a verified supported integration | No invented sensor accuracy |
| FLEET ← PILOT | `BLOCKED` | At most read-only status after engineering and privacy review | **No remote pilot engagement, no course change, no motor command from FLEET** |
| FLEET ← NAV | `PLANNED` | Planned voyage information shared only with explicit customer permission | No automatic sharing of private route histories |
| FLEET ← AIS | `CONDITIONAL` | Received traffic context for the authorized vessel | Receive-only; no transponder assumption |
| FLEET ← DISPLAY | `UNKNOWN` | No defined relationship in this batch | Not claimed |
| FLEET ← WEATHER | `CONDITIONAL` | See WEATHER ← FLEET | Provider terms govern |

**Status vocabulary (exhaustive):** `SUPPORTED` (evidence of a working, tested integration), `CONDITIONAL` (possible subject to named
conditions), `PLANNED` (defined intent, not implemented), `UNKNOWN` (no defined relationship/evidence), `BLOCKED` (prohibited or
externally prevented). No relationship is `SUPPORTED` because no integration has been engineered or tested.

## 6. Entitlement and commercial inclusion map

| Customer buys | Receives | Does **not** receive automatically |
| --- | --- | --- |
| NAV Essential / Pro | Application access and the entitlements stated in the NAV edition table | Charts requiring third-party purchase; AIS receiver; HUB; WEATHER Pro; DISPLAY; PILOT |
| WEATHER Standard / Pro | Forecast access within declared licensed coverage and horizon | Charts; NAV subscription; DISPLAY; HUB; redistribution or offline rights; accuracy guarantee |
| DISPLAY 7 / Large | The device, its base software, documented mounting and power items, warranty support | Charts; NAV Pro; WEATHER entitlement; HUB; AIS receiver; adapters; PILOT control; installation labour |
| HUB Standard / Pro | Gateways, documented connectivity, guides and support | Sensors; marine network backbone; licensed vendor cables; DISPLAY; steering control |
| AIS Receiver / Connected | Receive-only reception and documented local output | Transmission; chart rights; collision avoidance; guaranteed detection |
| SENSE module / kit | The measured signals of the modules in that SKU | HUB; WATCH; remote alerts; DISPLAY; unverified integrations |
| PILOT Coastal / Sail / Pro | A quoted, surveyed, commissioned steering installation | Remote control; autonomy; collision avoidance; certification; other families' subscriptions |
| WATCH Core / Plus | The monitored device, declared sensors and the monitoring subscription | Constant connectivity; theft guarantee; distress certification; remote helm; FLEET enterprise features |
| FLEET Start / Business | The organization SaaS capabilities of that tier | Hardware; installation; connectivity; unlimited vessels/users/storage/API; SLA |
| FLEET Enterprise | A contracted service tier with negotiated terms | Default uptime guarantees, unlimited scope or automatic SLA |

**Entitlement rule.** One customer account, one entitlement ledger. A NAV/WEATHER overlap produces a prorated credit, never a second
charge for the same entitlement. Billing and entitlement services are **not implemented** in MC-07; this is a contract for MC-16 to consume.

## 7. Safety boundaries common to all nine families

1. **No remote or cloud-to-actuator steering path exists.** Steering authority is local, inside a validated PILOT boundary, with immediate human takeover. No other product, page, API or agent may introduce one.
2. **No vessel-control surface in the SaaS.** FLEET has no steering, throttle, motor, bus-command or actuator function. A compromised FLEET account must never be able to move a vessel.
3. **Never fabricate a signal.** A stale, missing, unlicensed or expired value is shown as stale, missing, unavailable or expired — never as current data and never as a zero.
4. **Never fabricate a delivery.** Provider acceptance is not human delivery; a notification is not proof that a person saw it; a disconnected vessel is not online.
5. **Subscription expiry never disables a local safety function.** Local steering, local sensing and local alarms remain functional without a cloud entitlement (design requirement; not yet tested).
6. **Tenant isolation is server-side.** A client-supplied tenant id is never authorization; every sensitive FLEET operation is checked against membership, role, resource ownership, vessel assignment, device ownership and grant.
7. **No certification is implied.** No CE/EMC/RED conformity, no NMEA 2000 certification, no security certification, no certified distress service and no ECDIS equivalence exists for any family.

## 8. Lifecycle and readiness roll-up

All nine families share one lifecycle (D-007: `CONCEPT` → `DEFINED` → `ENGINEERING_VERIFIED` → `REGULATORY_READY` →
`OPERATIONS_READY` → `COMMERCIALLY_AVAILABLE` → `RETIRED`) and nine readiness dimensions. The roll-up is uniform:

| Dimension | All nine families | Consequence |
| --- | --- | --- |
| `definition` | `COMPLETE_TARGET_SPECIFICATION` | The intended final offering is fully specified — not built |
| `engineering` | `NOT_VERIFIED` | No bench, sea, load, isolation or end-to-end test evidence exists for the new three; earlier families stay at their recorded levels |
| `licensing` | `NOT_CLEARED` | OPEN-MARINE ownership and outbound licence position unresolved (L-01/L-02/L-03) |
| `hardware` | `NOT_SELECTED` (DISPLAY) / `NOT_APPLICABLE_SOFTWARE_PRODUCT` (WEATHER, FLEET) | No DISPLAY panel/enclosure/BOM exists; software families still depend on devices and licensed data |
| `dataRights` | `NOT_GRANTED` | No chart, forecast, AIS-derived or provider redistribution right is granted |
| `compliance` | `NOT_STARTED` | No conformity assessment, no EMC/RED evidence, no security certification |
| `pricing` | `HYPOTHESIS_UNAPPROVED` | Every figure is a hypothesis; two editions are `NOT_ESTABLISHED` |
| `brandPublication` | `NOT_GRANTED` | MAREA is a proposed brand with a recorded prior-mark conflict |
| `availability` | `NOT_FOR_SALE` | Nothing can be ordered, quoted as a sale, pre-ordered or deployed |

## 9. Evidence and document map

| Family | Dossier | Detailed compatibility | Edition authority | ES/EN copy |
| --- | --- | --- | --- | --- |
| NAV, HUB, AIS | `MAREA-{NAV,HUB,AIS}-COMMERCIAL-SPEC.md` | `PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` | `PRODUCT-EDITIONS-NAV-HUB-AIS.md` | `copy/{nav,hub,ais}.{es,en}.md` |
| PILOT, SENSE, WATCH | `MAREA-{PILOT,SENSE,WATCH}-COMMERCIAL-SPEC.md` | `PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` | `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` | `copy/{pilot,sense,watch}.{es,en}.md` |
| DISPLAY, WEATHER, FLEET | `MAREA-{DISPLAY,WEATHER,FLEET}-COMMERCIAL-SPEC.md` | `PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` | `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` | `copy/{display,weather,fleet}.{es,en}.md` |
| Annexes | `DISPLAY-HARDWARE-AND-INTERACTION-REQUIREMENTS.md`, `WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md`, `FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md`, `PILOT-SAFETY-CASE-OUTLINE.md`, `SENSE-MEASUREMENT-AND-CALIBRATION-PLAN.md`, `WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md` | | | |
| Machine truth | `product-definitions.batch-01.json`, `product-definitions.batch-02.json`, `product-definitions.batch-03.json` | | | |
| Validation | `scripts/check-marea-products.mjs` + `scripts/check-marea-products.test.mjs` (`npm run test:products`, `npm run test:products:unit`) | | | |

## 10. Publication and sale gates

| Gate | State | Meaning |
| --- | --- | --- |
| Trademark / identity (X-01, X-02) | `NOT_GRANTED` | No public MAREA branding, no registered-mark claim |
| Source IP and licensing (L-01…L-06) | `NOT_CLEARED` | No outbound licence position, no distributable build |
| Image generation (X-03) | `BLOCKED` | Thirty batch-03 asset requirements remain concept/specification only |
| Hardware and conformity (H-04…H-13) | `NOT_STARTED` | No DISPLAY unit, no EMC/RED evidence, no installation validation |
| Data providers (D-01…D-10) | `NOT_GRANTED` | No chart, forecast or AIS-derived redistribution right |
| Safety validation (P-04, P-07) | `BLOCKED` | PILOT and any DISPLAY/PILOT relationship stay bounded and unclaimed |
| Security and privacy (X-07) | `NOT_STARTED` | No FLEET deployment, no security certification, no DPA executed |
| Sale (P-10) | `NOT_FOR_SALE` | No SKU, checkout, stock, price approval or quotation as an offer |

## 11. What this document deliberately does not do

- It does not replace the batch-01/02/03 compatibility matrices, dossiers or machine contracts; those carry the evidence.
- It does not define bundles (`MAREA START`, `CRUISE`, `SAIL`, `PROTECT`, `COMPLETE`, `FLEET` package) or bundle prices; that is MC-08.
- It does not approve a price, a compatibility status, a certification or a publication date.
- It does not create a commerce catalogue, a purchasable SKU or a public page.

## 12. Status statement

The nine MAREA families now share one commercial architecture, one lifecycle, one readiness model, one evidence vocabulary and one
machine-readable contract family. That is a **documentation milestone**: no DISPLAY has been built, no WEATHER dataset licensed, no
FLEET tenant deployed, no PILOT vessel steered, no chart sold and no product made available. MAREA remains a proposed brand, EMBARCARTE
remains the seller and contractual party, OPEN-MARINE remains an internal engineering foundation with unresolved rights, and all nine
products remain **DEFINED**, **NOT_FOR_SALE** and **INTERNAL_ONLY**.
