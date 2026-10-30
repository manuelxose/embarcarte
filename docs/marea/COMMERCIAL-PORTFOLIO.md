# MAREA — Commercial product architecture v0.1
Date: 2026-10-30
Status: PROPOSED COMMERCIAL SPECIFICATIONS / NOT RELEASED / NOT LEGALLY CLEARED
Company: EMBARCARTE. Proposed brand: MAREA.
Purpose: end-state product definitions (not MVP descriptions). Prices are hypotheses, generally retail VAT-inclusive for consumer equipment/services unless stated otherwise. No SKU may be ordered solely because it appears here.

## Product system: one user, one vessel, many capabilities
- **MAREA NAV**: the main navigation application; it consumes weather, boat instrument and AIS information when compatible.
- **MAREA WEATHER**: the forecast/data service, separately useful without NAV; premium forecast entitlements can be shared with NAV accounts. No double billing for the same entitlement.
- **MAREA HUB**: onboard data gateway and boat connectivity coordinator. NAV does not require HUB for standalone GPS/chart experiences; advanced onboard integration may.
- **MAREA AIS**: receiver and traffic awareness product. NAV provides AIS visualization; buying NAV does not imply radio hardware.
- **MAREA SENSE**: sensors and monitoring modules, primarily connected through a compatible HUB/WATCH architecture.
- **MAREA WATCH**: shore/remote alerts and connectivity service, distinct from HUB's local data gateway and from remote helm control.
- **MAREA DISPLAY**: dedicated physical display device running approved MAREA vessel interfaces; NAV is software and DISPLAY is a device.
- **MAREA PILOT**: supervised steering control system, autonomous only within explicitly verified supported modes; never internet-remote unattended control.
- **MAREA FLEET**: multi-vessel organization/operations SaaS; compatible WATCH/HUB systems supply telemetry, but FLEET is not a consumer monitoring clone.

### Required business definition fields for EVERY final product
Keep: identity; segments; customer problems; complete end-state functionality; differentiation; standard/premium editions; included equipment/software; optional accessories; integration and compatibility; professional installation experience; onboarding; licensing/subscriptions; retail and partner prices; direct and ongoing costs; distributor/installer economics; competitor comparison; sales arguments; FAQs; warranty/support; bilingual product page copy; cross-sells; retention strategy; success metrics; end-to-end acceptance evidence. Fields not yet validated must remain OPEN, not guessed.

## 01 — MAREA NAV
- **Final offer:** unified recreational navigation software for sailing/motor vessels, usable on phone/tablet/desktop with licensed charts, GNSS, waypoints, passages/routes, vessel instruments, AIS overlay and CPA/TCPA, forecast layers, tides/currents/depth contexts, safety alerts, history, and legally supported offline regions.
- **Buyer / problem:** day and coastal cruisers, boat owners modernizing older electronics; fragmented navigation/weather/instrument experience.
- **Editions:** NAV Essential: route planning, chart access within licensed service rights, waypoint and logbook; NAV Pro: compatible live instruments, advanced AIS/weather overlays, route insights, multi-device and supported offline regions. NOT every chart source/region included by default.
- **Hypothesis:** Essential EUR 99/year; Pro EUR 149/year. Trial/free tier feasibility to be tested against chart licensing and acquisition costs.
- **Included:** app access and defined account entitlements. **Excluded unless explicitly bundled:** chart data requiring third-party purchase, AIS receiver, GPS hardware, HUB, emergency services.
- **Compatibility:** onboard HUB where tested; AIS receivers using supported inputs; WEATHER subscription sharing. Equipment and chart regions need a published compatibility/license matrix.
- **Buying path:** subscription; for complex integrations, request installed solution quote. Cancellation must preserve customer access to exportable own route data.
- **Validation and safety:** accurate offline status, test GNSS loss, stale AIS, data provenance, datum, licensing, and no implied ECDIS compliance.
- **Core KPIs:** paid conversion, renewal/churn, weekly active boat users, route completion, support load.

## 02 — MAREA HUB
- **Final offer:** an onboard appliance that integrates supported GPS, NMEA/Signal K/instruments, AIS, wind, batteries and sensor data, publishes a local vessel data interface, diagnostics, network access and appropriately bounded local automation.
- **Buyer / problem:** boat owners/refit installers seeking unified mixed-equipment instrumentation.
- **Editions:** HUB Standard for a documented base connectivity matrix; HUB Pro for more supported ports/protocol conversions and diagnostics. SKU/ports to be frozen after hardware design and physical tests.
- **Hypothesis:** Standard EUR 349, Pro EUR 499 including VAT, **subject to BOM and conformity**.
- **Included:** appliance, power/accessory items specified per SKU, connection/setup guide and support. Excludes marine network backbone, unrelated sensors, licensed vendor cables, installation and any unapproved compatibility.
- **Compatibility:** must list protocol, message types, device models and supported read/write operations; never call product NMEA 2000 Certified without NMEA-approved certification.
- **Buying path:** assisted compatibility configurator + installer-led quote; self-install only for permitted, low-risk compatible configurations.
- **Quality gates:** power/EMC/environment/ingress testing, robust offline operation, safe failures, recovery/firmware update and no unsafe steering control path.
- **KPIs:** activated gateways, supported device success rate, returns, warranty and installation hours.

## 03 — MAREA AIS
- **Final offer:** **receive-only** commercial AIS package: compatible dual-channel reception if verified by hardware design, ship identification, traffic target histories, CPA/TCPA and alerts, local networking and NAV/HUB integration.
- **Buyer / problem:** leisure sailors who need traffic awareness on existing equipment.
- **Editions:** AIS Receiver (basic compatible output) and AIS Connected (documented richer local networking, diagnostics and integration).
- **Hypothesis:** EUR 249 / EUR 399. Note current Digital Yacht receiver reference EUR 360–420. Below-market pricing is NOT validation of positive margin.
- **Included:** certified receiver and specifically enumerated cables/antenna accessories; clarify whether dedicated antenna/splitter is extra.
- **Excluded:** transmission of own position (AIS transponder), VHF DSC, guarantee of detection of unequipped targets, collision avoidance.
- **Buying path:** prevalidated boat-side connection or installer proposal.
- **Quality gates:** RF/legal conformity, antenna installation, sensitivity tests, fail/stale target states, positioning and alert usability.
- **KPIs:** device gross contribution, return rate, target reception uptime and support tickets.

## 04 — MAREA PILOT
- **Final offer:** a supervised compatible-vessel autopilot, heading hold, verified wind steering and route-following modes, physical control head, local handover/override, feedback, alerts and diagnostics.
- **Buyer / problem:** sailing owners, motor cruiser owners and professional installers needing reliable vessel steering within a documented compatibility envelope.
- **Editions:** PILOT Coastal (supported steering/rudder types), PILOT Sail (verified wind modes), and vessel-specific Pro installations. Do not represent software-only features as a ready-to-install steering system.
- **Price hypothesis:** **from EUR 1,290 only if the actual included configuration can be delivered at that price**; otherwise quote an inclusive vessel-specific price. Steering actuators, drives, sensors and installation must be expressly included or excluded per quotation.
- **Integration:** NAV for route context; HUB for authorized status. Independent watchdog, hardware E-stop, manual takeover and separate motor controller are required design boundaries.
- **Buying path:** survey, installer-led compatibility/steering assessment, commissioning, supervised sea trials, owner training and maintenance plan.
- **Non-negotiable:** no remote unattended piloting claim; documented electrical/mechanical safety, defined operator responsibility, real failsafe/sea-test evidence and competent conformity assessment before sale.
- **KPIs:** completed safe installations, commissioning fault frequency, support response and field failure rate.

## 05 — MAREA SENSE
- **Final offer:** a coordinated marine sensor family for wind, temperature, battery, tank, bilge, environmental inputs and compatible depth/level integration.
- **Buyer / problem:** owners of older boats seeking reliable information without buying an entirely new helm ecosystem.
- **Editions:** individual SENSE modules; SENSE Essentials (battery/bilge monitoring); SENSE Sail (wind/environment); SENSE Systems (expanded engine/utility conditions where appropriate).
- **Hypothesis:** individual modules starting EUR 99; multi-module kits must have independent price/cost sheets.
- **Included:** identified sensor module with specified cable/connector/install guidance; excludes HUB/WATCH if necessary and not included in the SKU.
- **Integration:** expose only tested measured signals; specify calibration, accuracy envelope, voltage and sensor maintenance.
- **Quality gates:** ingress protection, accuracy/calibration, galvanic/electrical behavior, thermal/salt conditions, failure alerts and field replacements.
- **KPIs:** kit attachment rate, calibration/support incidence, warranty cost and expansion purchases.

## 06 — MAREA WATCH
- **Final offer:** a remote boat-monitoring kit with position and geofence, battery/bilge/events, alerts, multi-user access, history and connectivity status with appropriate coverage/battery fallbacks.
- **Buyer / problem:** owners leaving boats unattended in marinas; charter/maintenance operators seeking timely operational status.
- **Editions:** WATCH Core (essential monitored inputs); WATCH Plus (additional inputs/alert rules/history and organization sharing).
- **Hypothesis:** hardware EUR 299 + monitoring from EUR 9.90/month; SIM/network fees and roaming policy must be included/expressly disclosed before live selling.
- **Included:** specific monitored device, declared sensors, account setup; internet/SIM coverage conditional on contractual service.
- **Excluded:** constant connectivity, theft prevention guarantee, distress/safety-alert certification or remote helm functions.
- **Quality gates:** repeated alert delivery tests under real network loss, delay metrics, secure device ownership, privacy/consent and backup energy behavior.
- **KPIs:** monthly recurring revenue, notification deliverability, churn, online fleet/device ratio.

## 07 — MAREA DISPLAY
- **Final offer:** marine-grade dedicated screen to display NAV, onboard instruments, AIS, weather, alerts and permitted pilot status/controls, with readable day/night modes and customizable helm views.
- **Buyer / problem:** boat owners who want an integrated fixed cockpit display instead of a portable tablet.
- **Editions:** DISPLAY 7 and DISPLAY 10/12 (actual sizes/names depend on verified enclosure/manufacturing capability); premium configurations bundle HUB/NAV.
- **Hypothesis:** starting EUR 699 if realistic BOM and testing support that price.
- **Included:** display, documented mounts, supplied cable/power items and software entitlement; charts, mounts, HUB or pilot hardware never assumed without listing.
- **Integration:** NAV/HUB/AIS/WEATHER; PILOT only when approved interface boundary permits.
- **Quality gates:** sunlight legibility, ingress/vibration, power, thermal, glove/wet touch where claimed, boot performance, support and serviceability.
- **KPIs:** sell-through, return/defect rates, warranty reserve and bundle attachment.

## 08 — MAREA WEATHER
- **Final offer:** coastal/offshore planning service for wind/waves/currents/tides and forecast comparisons, validity windows, route weather insights, source provenance and NAV integration; focus Atlantic Galicia/Portugal first.
- **Buyer / problem:** skippers needing readable actionable forecasts with known limitations.
- **Editions:** WEATHER Standard for key forecasts; WEATHER Pro for comparisons, overlays, timeline, route assessment and alerting where sources are licensed.
- **Hypothesis:** from EUR 49/year. Standalone app/web service possible. Avoid double billing with NAV Pro entitlements.
- **Included:** access to declared data coverage and forecast horizon, attribution and freshness/uncertainty information.
- **Excluded:** meteorological guarantees, local precision beyond model validation and redistribution rights not granted by data suppliers.
- **Quality gates:** source provenance, freshness flags, permission audit, stale/offline behavior, genuine forecast evaluation in pilot geography.
- **KPIs:** paid conversion, renewal, forecast usage, support/data costs, region coverage quality.

## 09 — MAREA FLEET
- **Final offer:** organization-oriented SaaS for multi-vessel dashboard, access controls, location/status, maintenance history/tasks, documents, operational alerts, reporting, service planning, owners/operators and compatible telemetry ingestion.
- **Buyer / problem:** sailing schools, charter firms, marinas, rental operators and managers of working fleets.
- **Editions:** FLEET Start (small fleets), FLEET Business (permissions/workflows/reports), FLEET Enterprise (audited accounts, custom integrations, volume terms and SLA).
- **Hypothesis:** from EUR 49/vessel/month excluding VAT, with separately quoted onboarding/installation and volume discounts; test willingness-to-pay against onboard hardware/network total cost.
- **Included:** subscribed organization/vessel seats and precise software capabilities; compatible monitored hardware, installation, data plan and API limits priced explicitly.
- **Quality gates:** strict tenant isolation, administrator controls, access logs, data export/deletion, SLA monitoring and billing accuracy.
- **KPIs:** MRR, vessels under contract, churn, fleet activation, gross margin and average annual contract value.

## Customer-facing bundle architecture — pricing hypotheses only
| Bundle | Final customer outcome | Minimum content promise | Starting price hypothesis |
|---|---|---|---:|
| MAREA START | Connect existing onboard data to modern navigation | NAV + compatible HUB | EUR 499 |
| MAREA CRUISE | Combined navigation and traffic awareness | NAV + HUB + receive-only AIS + DISPLAY | EUR 1,399 |
| MAREA SAIL | Sail-focused integrated helm | NAV + HUB + PILOT + compatible wind measurement | EUR 1,990 |
| MAREA PROTECT | Unattended monitoring | WATCH + essential sensors | EUR 399 plus subscription |
| MAREA COMPLETE | Coordinated boat integration | NAV, instruments, monitoring, display, certified supervised pilot | EUR 3,490 |
| MAREA FLEET | Fleet operations | Vessel SaaS, onboarding, optionally hardware & communications | Bespoke |

**No bundle price is approved for publication as purchasable until bottom-up costing.**
- Explicitly price chart subscriptions, AIS antenna, NMEA cabling, display mounts, steering drive/actuator, communications and labor.
- Never imply PILOT installations are turnkey for EUR 1,290 or COMPLETE turnkey for EUR 3,490 unless a validated bill of materials and representative vessel configuration actually support them.
- Bundle discount = standalone product contribution less shared cost saving and channel margin, NOT arbitrary marketing subtraction.
- NAV/WEATHER entitlements must not be charged twice; HUB data use can remain operational offline independently of the e-commerce service.

## Price and channel decision rule
For hardware sold at retail VAT-inclusive: net revenue = retail/(1+applicable VAT rate). Contribution per order = net revenue - manufacturing - assembly - test - packaging - shipping/fulfilment - payment fees - warranty accrual - returns allowance - onboarding/support - expected commission or channel discount. A channel offer is acceptable only if contribution clears agreed target and support liability. No source-based BOM or distributor contract is yet available; therefore no gross margin numbers are asserted.

## First go-to-market hypothesis
- Initial refit-and-connect segment: a compatibility-assessed **HUB + NAV** installation for Galicia/Rías Baixas followed by AIS and weather cross-sell.
- Software-led alternative: NAV/WEATHER subscriptions with separately obtained licensed charts, which reduce inventory exposure but still require real data licensing and differentiation.
- Installer distribution after a repeatable checklist, demonstration vessel, warranty procedure and successful customer outcomes.
- PILOT and complete helm integration require a longer safety validation path; FLEET requires actual B2B discovery before enterprise volume assumptions.

## Product page schema (required in both ES and EN)
Identity and value proposition; intended vessel/buyer; confirmed capabilities; edition table; what ships; explicit exclusions; live stock/price only for approved SKUs; compatibility and installation selector; manuals; update policy; safety/limitations; warranty/legal seller; related bundle; FAQs; support; one legitimate CTA (buy, quotation, pre-registration or coming soon according to true readiness). Localized SEO canonical/hreflang follows existing route registry.

## Lifecycle / launch classification
- CONCEPT — internal commercial definition.
- DEFINED — end-state specification complete, still not sellable.
- ENGINEERING VERIFIED — limited technical evidence only.
- REGULATORY READY — evidence of required conformity/licensing.
- OPERATIONS READY — stock/support/returns/payment/installation readiness.
- COMMERCIALLY AVAILABLE — explicitly approved release, genuine order flow and deliverable product.

**Overall portfolio today:** conceptual/defined, NOT commercially available, not trademark cleared. This document is not a proof that 24 fields for nine products have all been validated. Outstanding cost, compliance, channel and technical evidence is tracked in M00 and subsequent product gates.
