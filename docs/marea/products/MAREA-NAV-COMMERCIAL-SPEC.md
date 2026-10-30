# MAREA NAV — complete final-product commercial specification

| Field | Value |
| --- | --- |
| Document ID | MC-05 / D1-NAV |
| Milestone | MC-05 (Master Prompt 05/36) — product definitions batch 1 |
| Product | MAREA NAV (`NAV`); editions MAREA NAV Essential (`NAV-ESSENTIAL`) and MAREA NAV Pro (`NAV-PRO`) |
| Owner function | Product Management — NAV Product Director (author function for this dossier) |
| Status | `INTERNAL` / `COMPLETE_TARGET_SPECIFICATION` / `NOT_FOR_SALE` |
| Lifecycle state | `DEFINED` (binding vocabulary, `docs/marea/products/README.md` §3) |
| Base commit | `8ac6d69` (MC-04 HEAD), branch `feature/marea-mc05-nav-hub-ais-products` |
| Date | 2026-10-30 |
| Binding documents | `docs/marea/products/README.md` (canonical 24 fields, evidence classes, lifecycle, readiness dimensions, claim rules, price hypotheses); `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md`; `docs/marea/brand/PRODUCT-NAMING-SYSTEM.md`; `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` |
| Machine-readable contract | `docs/marea/products/product-definitions.batch-01.json` (D10, Product Governance and QA Engineer, pending) and validator `scripts/check-marea-products.mjs` (D11, pending) |
| Customer copy | `docs/marea/products/copy/nav.es.md` and `docs/marea/products/copy/nav.en.md` (D8, UX, Content and Localization Specialist; both files are present in this checkout and are owned by that deliverable, not by this dossier) |
| Publication / sale | None. No price is approved, no SKU is orderable, no page may be published while the gates in the claims policy are open. |

## 0. Contents

1. How to read this dossier
2. Status: complete specification, zero commercial readiness
3. Canonical identity and edition map
4. The 24 mandatory fields (F01–F24), including the F04/A capability-domain annex
5. Editions — evaluation of MAREA NAV Essential versus MAREA NAV Pro
6. Product boundaries — explicit exclusions
7. Customer journeys A–G
8. End-to-end acceptance scenarios
9. Traceability annex — MC-02 blockers and evidence still required
10. Required disclaimers (verbatim ES/EN)

## 1. How to read this dossier

This document is the **complete intended final product definition** of MAREA NAV. It describes what the product is meant to do at the end of its development, for the customer, in commercial language, not what the current prototype does. A complete specification is not readiness: every field therefore carries a separate evidence line stating what is actually verified today, and any capability that is not built is labelled `OPEN` or `BLOCKED` and names the milestone that will evidence it.

Three rules govern the reading:

- **The final product is described fully; the current readiness is described honestly.** Nothing in the capability description may be read as a claim that the feature exists, is tested, is certified or is purchasable.
- **Every substantive sentence has an evidence class** (`VERIFIED_REPO`, `VERIFIED_EXTERNAL`, `ASSUMPTION`, `HYPOTHESIS`, `OPEN`, `BLOCKED`) and an owner function. `OPEN` and `BLOCKED` are correct answers; invented facts are not.
- **Prices are hypotheses.** The only figures allowed are the MC-05 hypotheses, always labelled `HYPOTHESIS_UNAPPROVED`. They are not offers, launch prices, discounts or purchasable amounts.

MAREA NAV is a **navigational aid**. It is not ECDIS, is not presented as ECDIS-class or ECDIS-equivalent, and does not include official ENC chart data without a signed distribution right (`D-01`). It does not replace official nautical charts, the vessel's required equipment, continuous watchkeeping, good seamanship or the skipper's responsibility.

A note on the binding contract: `README.md` §3 states that the eight Master-Prompt lifecycle states are mapped onto the six binding states and recorded as decision `D-007` in `docs/marea/execution/DECISION-LOG.md`. In this checkout the decision log currently records `D-001`–`D-006`; this dossier therefore follows the binding README §3 table itself and does not restate decision content it cannot read. This is a reconciliation item for the Lead, not a divergence from the vocabulary.

## 2. Status: complete specification, zero commercial readiness

### 2.1 Product status matrix (README §1)

| Dimension | Value |
| --- | --- |
| `PRODUCT_DEFINITION` | `COMPLETE_TARGET_SPECIFICATION` |
| `ENGINEERING_READINESS` | `EVIDENCE_BASED` — MC-02 audit evidence only; no production product, no tested integration |
| `COMMERCIAL_AVAILABILITY` | `NOT_FOR_SALE` |
| `BRAND_CLEARANCE` | `NOT_GRANTED` |
| `SOURCE_IP_CLEARANCE` | `NOT_CLEARED` |
| `PUBLICATION_STATE` | `INTERNAL_ONLY` |

### 2.2 Readiness dimensions for NAV (README §4)

| Dimension | NAV value | Evidence for the value | What would change it |
| --- | --- | --- | --- |
| `definition` | `COMPLETE_TARGET_SPECIFICATION` | This dossier, all 24 fields, 30 capability domains and the acceptance and traceability annexes | Only a milestone-authorized scope change |
| `engineering` | `PARTIALLY_VERIFIED` | `docs/marea/compliance/MAREA-PRODUCT-REUSE-MAP.md` §4.1 rollup: software `PROTOTYPE_UNTESTED`; chart and navigation UI are `REUSE-CONDITIONAL`. `OPEN-MARINE-CAPABILITY-INVENTORY.md` §5.1 records C-03/C-04/C-05/C-06 as `IMPLEMENTED_NOT_FULLY_TESTED`; P-10 records all 214 TypeScript cases and 3 Playwright cases as `NOT_VERIFIED` (not executed, §6.3) | Executed test report per module, real-data chart conversion, route/passage and GNSS-loss tests (MC-13-NAV) |
| `hardware` | `N/A-SOFTWARE` — no MAREA hardware article is part of NAV; the product runs on customer-supplied phone, tablet or desktop hardware and depends on device GNSS. `HW` §5.2 marks CRA `POTENTIALLY_APPLICABLE`; `HW` §5.4 C-01 identifies no CE-marking act for a pure software supply | `MAREA-PRODUCT-REUSE-MAP.md` §4.1 physical readiness `NOT_APPLICABLE_SOFTWARE`; `HARDWARE-COMPLIANCE-MATRIX.md` §5.2/§5.4 | Not applicable to the software SKU; a future DISPLAY edition would be a separate product with its own hardware dimension |
| `dataRights` | `NOT_GRANTED` | No chart distributor or OEM agreement (`D-01`); chart catalogue label correction needed (`D-02`); OSM offline policy unresolved (`D-03`); tide/current and bathymetry context restricted (`D-08`, `D-10`) | Signed chart/data distribution rights incl. per-cell permits and end-user EULA; provider-by-provider clearance register (`D-10`) |
| `compliance` | `NOT_STARTED` | No conformity evidence and no declaration exists for any MAREA product (`H-06`, not assessable). For NAV no ECDIS status question arises because the product is not ECDIS and claims no such status; EU AI Act applicability has not been formally assessed (`OPEN`, counsel review at MC-14) and no claim is made either way. The Cyber Resilience Act is potentially applicable to the distributed application and any companion service (`H-13`, `HW` §5.2) | Applicability review and, if required, CRA process: vulnerability handling, secure update process, SBOM, disclosure and incident reporting (`H-13`) |
| `licensing` | `NOT_CLEARED` | OPEN-MARINE ownership/assignment chain unresolved (`L-01`, `L-02`, `L-03`); workspace licence declarations inconsistent (`S-08`); no OPEN-MARINE code may be copied before the rights decision (`DECISION-LOG` D-002) | Written assignments/licences to EMBARCARTE and an outbound licence position (`DEC-01`) |
| `pricing` | `HYPOTHESIS_UNAPPROVED` | EUR 99/year Essential and EUR 149/year Pro are hypotheses only (`README` §8; `COMMERCIAL-PORTFOLIO.md` §01) | Bottom-up costing from real provider and channel quotes (`X-05`), then written approval |
| `brandPublication` | `NOT_GRANTED` | MAREA is a proposed brand; no clearance has been performed and an existing US marine-electronics business using a similar name is a risk signal (`X-01`) | EUIPO/OEPM clearance and publication authorization |
| `availability` | `NOT_FOR_SALE` | No SKU, no stock, no approved price, no fulfilment or support operation | `OPERATIONS_READY` lifecycle plus an approved SKU record |

**Serialisation note for the Lead.** `N/A-SOFTWARE` is the value mandated by the MC-05 task brief for the `hardware` dimension, but it is not one of the allowed values in `README.md` §4 (`NOT_SELECTED` / `DESIGN_IN_PROGRESS` / `PROTOTYPED` / `CERTIFIED`). The machine-readable contract (D10) and validator (D11) must either add a documented software-only value or serialise NAV `hardware` as not applicable. This dossier uses the brief's value and flags the mismatch rather than silently choosing an enum member that would misstate the product.

### 2.3 Edition-level readiness

Both editions are `DEFINED` and `NOT_FOR_SALE`. Pro carries the same software readiness as Essential plus additional data-licence and integration dependencies for live instrument overlays, CPA/TCPA and AIS alerts, advanced weather overlays and offline regions (`D-01`, `D-03`, `D-04`, `D-05`). No edition has any verified capability beyond the engineering prototype evidence in the MC-02 audit. Edition boundaries follow the Lead-owned matrix in `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2.

## 3. Canonical identity and edition map

| Field | Value |
| --- | --- |
| Product id | `NAV` |
| Commercial family name | MAREA NAV (one space, never hyphenated or concatenated; `README` §2, `PRODUCT-NAMING-SYSTEM.md` §5) |
| Type | `SOFTWARE` — application for phone, tablet and desktop; no hardware supplied |
| Editions in this milestone | `NAV-ESSENTIAL` MAREA NAV Essential; `NAV-PRO` MAREA NAV Pro. No third tier may be invented |
| Entitlement keys (engineering identifiers, not names) | `nav.essential`, `nav.pro` — internal dotted keys per `PRODUCT-NAMING-SYSTEM.md` §10; never displayed as product names |
| Price hypothesis | MAREA NAV Essential EUR 99/year; MAREA NAV Pro EUR 149/year — both `HYPOTHESIS_UNAPPROVED`, retail VAT-inclusive where stated |
| Bundles referencing NAV | MAREA START, MAREA CRUISE, MAREA SAIL, MAREA COMPLETE — ecosystem context only; bundle contents, pricing and publication are MC-08 and are not decided here |

## 4. The 24 mandatory fields (F01–F24)

Each field below uses the binding five-line block from `README.md` §6. Every line is filled; no field is heading-only.

#### F01 — Identity

- **Definition.** MAREA NAV is the software navigation application of the MAREA family. It is intended to let a recreational sailing or motor-vessel skipper plan a route, navigate it with a chart view, record the passage and see the boat's own data where compatible equipment provides it, on a phone, tablet or desktop. It consumes GNSS positioning, licensed chart sources the account is entitled to, onboard instrument data from compatible devices, receive-only AIS targets when a receiver supplies them, and licensed weather, tide and current overlays. Two editions exist: Essential for planning and navigation, Pro for onboard integration and advanced overlays. MAREA NAV is a navigational aid, not a chart plotter, not a certified navigation system and not a steering device.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §01 (final offer, editions, excluded items) and `docs/marea/products/README.md` §2 (identity, editions); `ASSUMPTION` on the product category wording and positioning; `OPEN` for every behaviour that is not built — the MC-13-NAV gate will evidence it; no claim in this Definition is verified as customer-delivered today.
- **Owner.** Product Management (NAV Product Director).
- **Blockers / dependencies.** `D-01` (chart rights), `P-01` (NAV scope), `X-01` (brand). Cross-product: `H-04`/`DEC-05` (no NMEA 2000 claim).
- **Commercial readiness.** `brandPublication = NOT_GRANTED`.

#### F02 — Customer segments

- **Definition.** Primary: owners of recreational sailing and motor vessels, roughly 8–15 m, who cruise day and coastal waters in Galicia and northern Portugal, already have a boat with older or mixed electronics, and use a phone or tablet at the helm. Secondary: skippers planning multi-day coastal passages, sailing schools and small charter operators who want one shared logbook and one route library per vessel; and installers who specify or commission the boat-side equipment. Buying contexts: a standalone subscription with the customer's own charts entitlement; a NAV plus HUB retrofit; an add-on to an existing plotter; and an Essential-to-Pro upgrade when instruments, AIS or weather are added.
- **Evidence.** `ASSUMPTION` — segments are derived from `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §01 and `docs/marea/WEBSITE-AND-ROADMAP.md` §1; `OPEN` for validated demand and willingness to pay because no primary customer interviews exist (`X-06`, `M00-DISCOVERY-BASELINE.md`); MC-03B/MC-10 will evidence it.
- **Owner.** Product Management with Commercial Strategy.
- **Blockers / dependencies.** `X-06` (customer evidence), `X-05` (pricing evidence), `P-10`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F03 — Customer problems

- **Definition.** The intended customer currently runs three or more disconnected experiences: a chart plotter for navigation, a separate weather application, instrument displays at the helm, and paper or notes for the log. Planning done at home is not portable to the boat; chart subscriptions are tied to one device; the boat's own wind, speed and depth data never reach the planning tool; freshness, coverage and source of data are unclear; and routes risk being lost if a service ends. Existing alternatives are a dedicated plotter with regional chart cards, a mobile chart application with a regional subscription, a separate weather service, planning software on a laptop, and paper charts. The intended MAREA NAV answer is one account, one vessel profile, one planning-to-logbook flow, with licensed data kept under its own licence and with honest provenance.
- **Evidence.** `ASSUMPTION` on the problem framing and purchasing behaviour; `VERIFIED_EXTERNAL` descriptive competitor anchors checked 2026-10-30 in `docs/marea/MARKET-BENCHMARKS.md` (Orca public subscription page; Garmin Navionics Boating public FAQ) — used only to show that navigation and weather are established paid categories, not to claim a gap; `OPEN` for interview evidence (`X-06`).
- **Owner.** Product Management.
- **Blockers / dependencies.** `X-06`, `D-01` (the chart-rights problem sits inside the customer's chart purchase).
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F04 — Complete end-state functionality

- **Definition.** The final product covers thirty capability domains, all described in the F04/A annex below: vessel and skipper profile; navigation home; licensed charts; geographic coverage; route planning; waypoints; route editing; route libraries; passage planning; saved destinations; GNSS positioning; heading, speed and course; instrument overlays; wind; depth where supported; AIS traffic visualisation; CPA/TCPA where valid data exists; route and weather overlays; tides and currents when licensed; forecast validity and source; legally supported offline regions; history and logbook; multi-device account access; import and export of the customer's own navigation records; data availability and freshness; missing-position and disconnected states; notifications; application updates; accessibility; and support and subscription lifecycle. Each domain is classified by layer — core software function, licensed data entitlement, optional connected instrument function, optional AIS receiver hardware, optional HUB integration, or optional WEATHER entitlement — so that no buyer mistakes a data licence or a third-party device for a MAREA NAV feature. The application must never provide a steering-control path: no route upload to an autopilot and no helm command is part of this product.
- **Evidence.** `OPEN` — most domains are not built and none is verified end-to-end; `VERIFIED_REPO docs/marea/compliance/MAREA-PRODUCT-REUSE-MAP.md` §4.1 records chart import/catalogue, chart UI, AIS analysis and dashboards as prototype code in `IMPLEMENTED_NOT_FULLY_TESTED` state, and `OPEN-MARINE-CAPABILITY-INVENTORY.md` §6.3 records all TypeScript suites unexecuted; the MC-13-NAV gate will evidence each domain, and MC-11A will evidence account, entitlement and multi-device behaviour.
- **Owner.** Engineering (Navigation Software) with Product Management.
- **Blockers / dependencies.** `D-01`–`D-06`, `D-08`, `D-10`, `P-01`, `P-10`; cross-product `D-04`/`D-05` (WEATHER), `P-02` (HUB), `P-03` (AIS).
- **Commercial readiness.** `engineering = PARTIALLY_VERIFIED`.

**F04/A — Thirty mandatory end-state capability domains (expansion of F04).** Layer vocabulary is binding: *core software function*, *licensed data entitlement*, *optional connected instrument function*, *optional AIS receiver hardware*, *optional HUB integration*, *optional WEATHER entitlement*. "Evidence" is the current evidence class, not a readiness statement.

| # | Capability domain | Layer | Intended end-state behaviour | Evidence | Primary gate |
| --- | --- | --- | --- | --- | --- |
| 1 | Vessel and skipper profile | Core software function | One account holds vessel identity, type, dimensions, draft, home port, skipper profile and unit preferences; reused on every device and pre-fills route and logbook fields | `OPEN` | MC-11A; `X-07` |
| 2 | Navigation home | Core software function | A starting surface showing the active vessel, position status, current route or passage, data freshness, local alerts and the next action; no data is displayed without its source and timestamp | `OPEN` | MC-13-NAV |
| 3 | Licensed charts | Licensed data entitlement | The application consumes chart sources the account is entitled to; official ENC data only if a distribution right exists, otherwise customer-entitled or openly licensed sources are used with their terms stated | `BLOCKED` | `D-01`, `D-02` |
| 4 | Geographic coverage | Licensed data entitlement | Coverage is published per source and per region; the product never implies global or complete coverage; the planned first geography is Galicia and northern Portugal | `BLOCKED` | `D-01`, `D-10` |
| 5 | Route planning | Core software function | Build a route from waypoints with distance, bearing and estimated duration using the vessel's declared speed; display the source and validity of every input used | `OPEN` | MC-13-NAV; `P-01` |
| 6 | Waypoints | Core software function | Create, name, edit, delete and reuse waypoints; import and export them as the customer's own record; no provider data is re-published | `OPEN` | MC-13-NAV |
| 7 | Route editing | Core software function | Reorder, insert, move and delete route legs on a chart or in a list, with the changed totals recomputed and visible | `OPEN` | MC-13-NAV |
| 8 | Route libraries | Core software function | Saved routes and passages organised per vessel and per account, with duplicate, archive and delete; export of the customer's own library on request | `OPEN` | MC-11A |
| 9 | Passage planning | Core software function | Plan a multi-leg passage with departure window, expected conditions summary, waypoint sequence and a passage note that becomes the logbook entry once sailed | `OPEN` | MC-13-NAV; `D-04` |
| 10 | Saved destinations | Core software function | Save marinas, anchorages and customer-marked places as destinations that can seed a route; saved places are the customer's own data | `OPEN` | MC-11A |
| 11 | GNSS positioning | Core software function | Consume the position provided by the customer's device, show accuracy and age, and degrade explicitly to a no-position state; no receiver is supplied by MAREA NAV | `OPEN` | MC-13-NAV; device dependency |
| 12 | Heading, speed and course | Optional connected instrument function | Display heading, speed over ground and course where a compatible source publishes them; a device compass is a partial substitute and is labelled as such | `OPEN` | `P-01`; tested matrix |
| 13 | Instrument overlays | Optional connected instrument function; optional HUB integration | Overlay chosen onboard values (speed, heading, wind, depth, battery context) on the navigation view where compatible equipment publishes them; values carry source, timestamp and stale state | `OPEN` | `P-01`, `P-02` |
| 14 | Wind | Optional connected instrument function; optional HUB integration | Show apparent and true wind where a compatible instrument or HUB publishes it, with the measurement source and quality stated; wind is not inferred when no source exists | `OPEN` | `P-01`, `P-02`; `C-13` unit evidence only |
| 15 | Depth where supported | Optional connected instrument function | Show depth only where a compatible sounder publishes it, labelled as measured by that instrument; chart-derived depth context is informational, never a navigation instruction | `OPEN` | `P-01`, `P-02`, `D-08` |
| 16 | AIS traffic visualisation | Optional AIS receiver hardware; optional HUB integration | Display receive-only AIS targets supplied by a compatible MAREA AIS or other compatible receiver; the AIS disclaimer is shown with the traffic surface; buying NAV does not include radio hardware | `BLOCKED` | `P-03`, `D-09`; cross-product `H-08` |
| 17 | CPA/TCPA where valid data exists | Optional AIS receiver hardware; core calculation shown inside NAV | Compute closest point of approach and time to CPA from received targets and own vessel data; show "not available" when own position, own course/speed or target data are invalid; never a collision-avoidance guarantee. Whether the computation runs in NAV or in a receiver is an open boundary for the compatibility contract (D5) and must not be claimed until frozen | `BLOCKED` | `P-03`, `C-06`; CPA tests owed; D5 |
| 18 | Route and weather overlays | Optional WEATHER entitlement | Overlay licensed wind, wave and current fields on the route view with forecast validity window and source; no overlay is displayed without a licence for that provider and product | `BLOCKED` | `D-04`, `D-05` |
| 19 | Tides and currents when licensed | Licensed data entitlement; optional WEATHER entitlement | Show tide heights, tide windows and current fields only within entitlements granted by the data provider; the source and reference station are displayed | `BLOCKED` | `D-04`, `D-07`, `D-10` |
| 20 | Forecast validity and source | Optional WEATHER entitlement | Every forecast value carries provider, model, issue time, validity window and a stale marker; the weather disclaimer is shown wherever forecasts appear | `BLOCKED` | `D-04`, `D-05` |
| 21 | Legally supported offline regions | Licensed data entitlement | Allow download and offline use only of regions for which the licence permits storage and offline display; the region list is published and the offline state is explicit; no bulk download of a service that forbids it | `BLOCKED` | `D-01`, `D-03` |
| 22 | History and logbook | Core software function | Automatic and manual passage records with track, times, distance, notes and vessel; the customer's own history is exportable at any time and stays exportable after cancellation | `OPEN` | MC-11A; `P-10` |
| 23 | Multi-device account access | Core software function | One account usable on several devices according to the edition entitlement; sessions are authenticated and revocable; simultaneous-device limits are stated in the edition terms | `OPEN` | MC-11A; `X-07` |
| 24 | Import and export of own navigation records | Core software function | Import and export routes, waypoints, tracks and logbook entries in a documented open format; export is available before cancellation and without a support ticket | `OPEN` | MC-11A |
| 25 | Data availability and freshness | Core software function | Every displayed data class shows whether it is live, cached, stale or unavailable, with source and age; the application never presents stale data as current | `OPEN` | MC-13-NAV |
| 26 | Missing-position and disconnected states | Core software function | When position is unavailable or connectivity drops, the application explains the state, keeps the last known position clearly marked as old, preserves the planned route and continues offline where licensed | `OPEN` | MC-13-NAV |
| 27 | Notifications | Core software function | Local alerts for arrival at a waypoint, off-route, stale position and expired entitlement; push notifications only where the customer enables them; no alert is presented as a safety service | `OPEN` | MC-13-NAV; `X-07` |
| 28 | Application updates | Core software function | Documented update policy, supported-version policy, security updates and a changelog; updates never silently remove customer records; distribution channel depends on the platform | `OPEN` | `H-13`; MC-16A |
| 29 | Accessibility | Core software function | Keyboard and screen-reader operable core flows, readable contrast, adequate target sizes, day and night display modes, and no colour-only status encoding; conformance target to be fixed at MC-06 | `OPEN` | MC-06; MC-13-NAV |
| 30 | Support and subscription lifecycle | Core service function | Entitlement purchase, renewal, upgrade, cancellation, refund and data export handled in-product and by support; the seller's legal identity and terms are published before any sale | `OPEN` | MC-11A; `X-02`, `X-05` |

**Layer boundaries that must be published with the capability table.** Charts, tides, currents, forecasts and basemap tiles are licensed data entitlements, not features the buyer receives by buying NAV (`D-01`–`D-08`). AIS targets require a separate receiver and remain receive-only (`P-03`, `D-09`). Live instruments require a compatible, tested source, optionally through MAREA HUB; NMEA 2000 is not implemented and no NMEA 2000 certification or compatibility is claimed (`H-04`, `DEC-05`). Signal K compatibility is per device, per firmware and per direction of data, and is only published once recorded evidence exists (`P-02`). No steering-control path exists in NAV.

#### F05 — Differentiation

- **Definition.** The intended relevance versus alternatives is integration and ownership experience, not visual polish or a performance claim: one account and one vessel profile across planning, navigation and logbook; the customer's own instrument and AIS data inside the planning surface where compatible equipment exists; licensed-chart capability with the source and the licence stated openly; honest freshness, coverage and offline status; and exportable customer records that survive cancellation. A buyer should choose MAREA NAV because it uses the boat they already have and because EMBARCARTE can install, support and maintain the surrounding equipment, not because the product claims superior accuracy. Every comparative statement remains a hypothesis until customer research and claims-register evidence exist, and no comparison with a named competitor is made.
- **Evidence.** `HYPOTHESIS` on the commercial relevance; `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` §1 (positioning is integration and ownership experience) and `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 (comparative superiority is prohibited without test evidence); `OPEN` until MC-09/MC-10 research validates it.
- **Owner.** Product Management with Commercial Strategy.
- **Blockers / dependencies.** `D-01` (the chart story is central to differentiation), `X-06`, `P-10`.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`.

#### F06 — Editions

- **Definition.** Exactly two editions, no third tier, with boundaries aligned to the Lead-owned edition matrix in `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2. Essential is the planning-and-passage edition: navigation, route planning and editing, waypoints, route libraries, saved destinations, passage planning, logbook and export, licensed chart access within the customer's entitlement, basic AIS target display where a receive-only AIS source is present, and a basic licensed forecast view. Pro is the connected-navigation edition: it adds compatible live instrument overlays, CPA/TCPA and AIS alert rules on top of the basic target display, advanced weather and route overlays, legally supported offline regions, route insights and multi-device use. The +EUR 50 hypothesis must buy capabilities the buyer can see and use on the boat, and must not be a gate on safety-relevant status such as position loss, stale data, freshness, basic traffic awareness or the disclaimers — those are identical in both editions. The full evaluation and the explicit Essential exclusions are in §5.
- **Evidence.** `HYPOTHESIS` — edition content follows `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §01 and `docs/marea/products/README.md` §2/§8, but no edition packaging, entitlement or price has been costed or approved; `OPEN` for the cost basis (`X-05`) and for the upgrade mechanics (MC-11A).
- **Owner.** Product Management with Commercial Strategy and Pricing.
- **Blockers / dependencies.** `P-01`, `D-01`, `X-05`; cross-product `D-04` (WEATHER sharing).
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F07 — Included items

- **Definition.** For each edition the intended subscription includes: access to the edition's software capabilities on the supported platforms; one MAREA account with the vessel and skipper profile; the edition's entitlement (`nav.essential` or `nav.pro`); application updates and security fixes during the subscription; support under the published support policy; data export of the customer's own records; access to licensed chart, tide, current or forecast data only to the extent the customer's own entitlement or licence allows; and — in both editions, where a compatible receive-only AIS source is present — basic AIS target list and detail display. It does not include chart data by default, GNSS hardware, an AIS receiver, a HUB, a WEATHER subscription, installation labour, connectivity or any navigation certification. No physical article ships with MAREA NAV.
- **Evidence.** `HYPOTHESIS` on the inclusion split; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §01 (included: app access and defined account entitlements; excluded: chart data requiring third-party purchase, AIS receiver, GPS hardware, HUB, emergency services) and `docs/marea/products/README.md` §7 rule 8; `OPEN` for the exact entitlement matrix (MC-11A).
- **Owner.** Product Management with Commercial Strategy.
- **Blockers / dependencies.** `D-01`, `P-01`, `X-05`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F08 — Optional accessories

- **Definition.** The intended optional ecosystem next to NAV is: licensed chart/data entitlements for named regions; a MAREA WEATHER subscription (Standard or Pro) whose entitlement is linked to the same account without double billing; MAREA HUB for vessel-data integration; a MAREA AIS Receiver or AIS Connected for receive-only traffic; a compatible GNSS or instrument source supplied by the customer or an installer; a mount, power item or cable for the customer's tablet; and an installer service for retrofits. Each optional product is a separate commercial object with its own readiness and its own compatibility statement. NAV never implies that an optional product is included, that a device is compatible before testing, or that AIS reception is complete.
- **Evidence.** `OPEN` on the compatibility matrix and on every optional product's own readiness; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §01–§03 and `docs/marea/compliance/MAREA-PRODUCT-REUSE-MAP.md` §4.1/§4.2/§4.3; cross-product gates `P-02`, `P-03`, `H-04`/`DEC-05`.
- **Owner.** Product Management with the HUB Product Director (integration owner for compatibility).
- **Blockers / dependencies.** `P-02`, `P-03`, `D-10`; cross-product `H-04`, `H-08`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F09 — Integration

- **Definition.** The intended integration model is read-mostly and evidence-based. NAV consumes: GNSS position from the customer's device; vessel data published by compatible sources (Signal K where a tested per-device, per-firmware, per-direction result is recorded; NMEA 0183 sentences where the tested matrix says so; or a MAREA HUB that publishes a documented local interface); receive-only AIS targets from a compatible receiver; and licensed weather, tide and current data from the account's entitlements. NAV publishes no steering command, no autopilot route upload and no control path of any kind. Compatibility is always stated per device, per firmware version and per direction of data — never as a blanket protocol guarantee. NMEA 2000 is not implemented and no NMEA 2000 certification or operational compatibility is claimed. The published compatibility matrix is the single source for what works.
- **Evidence.** `VERIFIED_REPO docs/marea/compliance/MAREA-PRODUCT-REUSE-MAP.md` E-01/E-02/E-03 (data contract and Signal K client patterns are `REUSE-CANDIDATE`; no authenticated trust boundary exists); `BLOCKED` on NMEA 2000 (`H-04`, `DEC-05`; `OPEN-MARINE-CAPABILITY-INVENTORY.md` C-17 is `NOT_FOUND`); `OPEN` for every device-level compatibility result (`P-02`).
- **Owner.** Engineering (Integration) with the HUB Product Director as integration owner.
- **Blockers / dependencies.** `P-01`, `P-02`, `P-10`; cross-product `H-04`, `P-03`.
- **Commercial readiness.** `engineering = PARTIALLY_VERIFIED`.

#### F10 — Professional installation

- **Definition.** No professional installation is required to use MAREA NAV on a phone or tablet: the customer installs the application and signs in. Professional work is offered or required only for the surrounding vessel integration — a HUB retrofit, AIS antenna and splitter work, instrument or GNSS wiring, and vessel-data commissioning — and is quoted separately per vessel, never sold as a product edition. The intended model is an installer-led compatibility assessment, a documented installation record and a handover session; complex configurations go to a specialist assessment rather than being asserted compatible. No technician certification scheme exists, so no "certified technician" statement may be made. Terms and pricing for installation are not defined.
- **Evidence.** `ASSUMPTION` on the service model; `OPEN` — there is no installer programme, quote entity or commissioning record (`WEBSITE-AND-ROADMAP.md` §6 MC-14A; `MAREA-PRODUCT-REUSE-MAP.md` §4.1 field 3); `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` §2 (configurator must output `requires specialist assessment` rather than assert compatibility).
- **Owner.** Support Operations with Channel Management.
- **Blockers / dependencies.** `P-02`, `P-03`, `X-05`; `X-06` for installer terms.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F11 — Onboarding

- **Definition.** The intended first-use experience: create the account; choose an edition or start a time-limited trial; complete the vessel, skipper and unit profile; grant device location permission with a plain-language explanation; choose the chart source and entitlement that applies; download a licensed region where the licence permits; verify GNSS and any connected data source with a visible quality and freshness check; tour route planning, waypoints and logbook; and read the navigation, data-provenance and limitation pages with the approved disclaimers before the first passage. Education includes ES/EN help articles, a compatibility and installation sheet, an export guide and a cancellation guide. The trial is limited to the entitlement it actually grants; its length, data scope and end-of-trial export behaviour are `OPEN`, and it does not imply licensed-chart availability.
- **Evidence.** `OPEN` — accounts, entitlements and the customer portal are not built (`MAREA-PRODUCT-REUSE-MAP.md` E-19/E-20 are `BUILD`; MC-11A); `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` §2 (customer portal) and `docs/marea/brand/BRAND-VOICE-ES-EN.md` §9 (allowed CTA per readiness).
- **Owner.** UX, Content and Localization with Engineering.
- **Blockers / dependencies.** `P-10`, `D-03` (offline region onboarding), `X-05`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F12 — Licensing and subscriptions

- **Definition.** MAREA NAV is intended to be sold as an annual, prepaid, renewable subscription per account, with entitlements that follow the account across devices up to the edition limit. The customer buys a right to use the software and to reach the licensed data their own entitlement allows; the customer never acquires ownership of chart, weather or tide data, and no third-party data right is transferred beyond the provider's own end-user terms. Cancellation ends access at the end of the paid term; the customer's own routes, waypoints, tracks and logbook remain exportable before and after cancellation, while licensed third-party data becomes unavailable when the entitlement ends. Upgrade to Pro is available within the term subject to the mechanism in §5. A WEATHER entitlement held on the same account must not be billed twice by NAV. The software licence position is a proprietary baseline once the OPEN-MARINE ownership chain is resolved; no source licence exists today.
- **Evidence.** `OPEN` for all terms, renewal rules, refunds and entitlement mechanics — no written terms exist (`X-02`); `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §01 (cancellation must preserve exportable own route data), `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §6 and `BRAND-VOICE-ES-EN.md` §10 (no double billing, no "free forever"); `BLOCKED` on software ownership (`L-01`–`L-03`, `S-08`).
- **Owner.** Commercial Strategy with Legal and Compliance.
- **Blockers / dependencies.** `L-01`, `L-02`, `L-03`, `X-02`, `X-05`; cross-product `D-04`.
- **Commercial readiness.** `licensing = NOT_CLEARED`.

#### F13 — Retail and partner pricing

- **Definition.** Consumer hypothesis, VAT-inclusive retail where stated, both `HYPOTHESIS_UNAPPROVED` and not offers: MAREA NAV Essential EUR 99/year; MAREA NAV Pro EUR 149/year. The intended upgrade from Essential to Pro is a paid difference at renewal or a prorated top-up within the term, with the mechanics still `OPEN`. B2B structure is an intended framework only: installer/partner referral or resale margin, and multi-vessel terms for schools, charter operators and small fleets; no partner price list, discount schedule or volume term exists and no number is asserted. No launch offer, promotion, "from" price or purchasable amount exists for any edition.
- **Evidence.** `HYPOTHESIS` — figures are exactly those allowed by `VERIFIED_REPO docs/marea/products/README.md` §8 and `docs/marea/COMMERCIAL-PORTFOLIO.md` §01; `OPEN` — no supplier, provider, channel or cost quotation exists (`X-05`); no willingness-to-pay evidence exists (`X-06`); the upgrade and renewal framework in `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL.md` is explicitly unapproved.
- **Owner.** Commercial Strategy and Pricing.
- **Blockers / dependencies.** `X-05`, `X-06`, `P-10`.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F14 — Direct and ongoing costs

- **Definition.** The subscription cost model is a framework with named inputs, not a computed margin: chart data licence per region and term; licensed basemap or self-hosted tile operating cost; weather provider plan or self-hosted service cost; tide and current data terms; cloud hosting for accounts, entitlements, sync and support; payment and app-distribution fees; support staff time per active account; refunds and chargebacks; customer acquisition cost; subscription churn; application development and security updates; and amortised legal and compliance work. The contribution framework is: net revenue (VAT-excluded where applicable) minus the recurring data, hosting, support, payment, acquisition and compliance costs. No cost figure, margin, payback period or break-even point is asserted anywhere because no quote exists.
- **Evidence.** `BLOCKED` — no BOM, provider quote, data-licence price or channel term exists (`X-05`; `README` §8); `ASSUMPTION` on the cost categories; `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` §4 (required financial outputs and the prohibition on unlabelled forecasts).
- **Owner.** Finance with Commercial Strategy.
- **Blockers / dependencies.** `X-05`, `D-04`, `D-05`.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F15 — Channel economics

- **Definition.** The intended default channel is direct-to-consumer subscription through the EMBARCARTE site. The intended secondary channel is the installer and small-fleet partner: the partner assesses compatibility, commissions vessel integration and trains the customer; EMBARCARTE owns the software entitlement, the licensed data relationship, support and updates. Margin, referral fee, resale discount, billing responsibility and territory rules are `OPEN` until real channel terms exist, and no percentage or commission is asserted. Bundles that include NAV are governed by MC-08; this dossier does not decide bundle content, price or channel treatment.
- **Evidence.** `OPEN` — no distributor, installer or partner agreement exists (`X-05`, `X-06`); `ASSUMPTION` on the channel roles; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` price-and-channel rule (channel offer acceptable only if contribution clears the target and support liability).
- **Owner.** Commercial Strategy with Channel Management.
- **Blockers / dependencies.** `X-05`, `X-06`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F16 — Competitor comparison

- **Definition.** Descriptive anchors only, checked on public pages on 2026-10-30, with no parity or superiority claim: Orca publishes Plus at EUR 49/year and Smart Navigation at EUR 149/year (confirmed in that provider's public help page); a Garmin Navionics Boating annual subscription and several other navigation applications exist at entry prices in the same order of magnitude, but their coverage region, entitlement scope and VAT basis differ and their exact European figures are not currently verified in this dossier. These listings establish that navigation and weather are crowded, price-sensitive subscription categories and that EUR 99–149/year must be justified by licensed and offline integration rather than presentation. They do not establish equivalent coverage, entitlement scope, territory, VAT basis, currency or included data, and no competitor product has been tested against MAREA NAV. The comparison therefore supports a pricing caution, not a competitive claim.
- **Evidence.** `VERIFIED_EXTERNAL` — `docs/marea/MARKET-BENCHMARKS.md` citing `https://help.getorca.com/en/articles/6541858-subscription-prices-and-functionality`, check date 2026-10-30; `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL.md` §2 records which competitor figures are currently verified and which are not; `HYPOTHESIS` on the positioning implication; `OPEN` for a like-for-like comparison in Spain/Portugal (`X-06`).
- **Owner.** Commercial Strategy.
- **Blockers / dependencies.** `X-06`, `X-05`.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F17 — Sales arguments

- **Definition.** Buyer benefits, phrased conditionally: one place for planning, navigating and logging; the boat's own data visible where compatible equipment exists; licensed-chart capability with source, coverage and freshness shown honestly; your records exportable, so the account does not hold your data hostage; an upgrade path to Pro when instruments, AIS or weather are added; and installation and support by EMBARCARTE where that service is actually deliverable. Objection handling: "Do I have to replace my electronics?" No — MAREA NAV is software and uses what the boat has, with compatibility published per device and version. "Are charts included?" No — chart data is a licensed entitlement with its own terms. "Is this a plotter replacement?" No — it is a navigational aid on the customer's device and does not replace required equipment. "Is it safe or certified?" It is a navigational aid and makes no certification or safety guarantee. Every sentence must be classified and approved under the claims policy; the claims register is empty, so no sales statement is publishable yet.
- **Evidence.** `HYPOTHESIS` and `ASSUMPTION` on benefit framing; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 (claim classes) and §8 (empty claims register), plus `BRAND-VOICE-ES-EN.md` §8 (trust language).
- **Owner.** Commercial Strategy with Brand and Compliance.
- **Blockers / dependencies.** `X-01`, `X-06`, `D-01`.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`.

#### F18 — FAQ

- **Definition.** Intended pre-sales and post-sales answers. What do I get? Access to the edition's capabilities, one account, updates and support; not chart data, hardware or installation. Are charts included? No: chart data is a licensed entitlement and official ENC data requires a distribution right that does not exist today. Which devices are supported? The published minimum platform and version matrix, once tested; no device is promised before that. Does it replace my plotter or required equipment? No. Does it work without internet? Only in legally supported offline regions with stored licensed data; the offline state and limitations are always visible. Does it show AIS? Only when a compatible receive-only receiver supplies targets; AIS does not show every vessel and is not collision avoidance. Can it steer the boat? No: NAV has no steering-control path. What happens when I cancel? Access runs to the end of the paid term; your own records remain exportable; licensed third-party data stops. Can I use two devices? Pro is intended for multi-device use; the exact limits are stated in the edition terms. Which instruments or HUB work? Only those in the published tested compatibility matrix; NMEA 2000 is not supported and is not claimed. Is it certified? No. How does weather work? Through a separately licensed WEATHER entitlement that can be shared with the NAV account without double billing.
- **Evidence.** `OPEN` on final answers for device matrix and edition limits (MC-13-NAV, MC-11A); `VERIFIED_REPO docs/marea/products/README.md` §7 and `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2/§4; `BLOCKED` on chart and weather answers until `D-01`/`D-04` close.
- **Owner.** Support Operations with Product Management.
- **Blockers / dependencies.** `P-01`, `D-01`, `D-04`, `P-10`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F19 — Warranty and support

- **Definition.** The intended support model: ES/EN help centre, in-product guidance, an incident intake with a recorded case, defect triage and fix, a published supported-version and update policy, security updates, and assisted data export on cancellation. The customer receives statutory consumer rights once a sale exists; the commercial warranty wording, seller legal identity, response expectations and end-of-support policy are not written, so no duration, response time, 24/7 coverage or service-level commitment may be stated. Support scope excludes vessel wiring and physical installation (installer responsibility), chart-provider disputes (provider terms), and any decision about whether or where to sail. Escalation, refunds and returns are defined by the future terms of service, which cannot be published without the seller's legal identity.
- **Evidence.** `OPEN` — no terms of service, warranty or support contract exists (`X-02`); `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 class C (warranty length and response times require evidence) and §9 (required disclaimers); `BLOCKED` on CRA-related vulnerability handling for the distributed application (`H-13`).
- **Owner.** Support Operations with Legal and Compliance.
- **Blockers / dependencies.** `X-02`, `H-13`, `X-05`.
- **Commercial readiness.** `compliance = NOT_STARTED`.

#### F20 — Bilingual product page copy

- **Definition.** The customer-facing product copy in Spanish and English is not written in this dossier; it is the D8 deliverable `docs/marea/products/copy/nav.es.md` and `docs/marea/products/copy/nav.en.md`, owned by UX, Content and Localization, and both files are present in this checkout. The files are structured the same way in both locales: 24 numbered sections from SEO title to closing argument, followed by an "Approved disclaimers (verbatim)" / «Avisos aprobados (texto literal)» block and a DRAFT / INTERNAL / NOT FOR SALE status banner. This field fixes what that copy must contain: the exact product and edition names; intended buyer and use case; edition comparison; what is included and excluded; the readiness state with the claims-policy CTA pair **"See the specification"** / **«Ver la especificación»** as primary and **"Request a compatibility review"** / **«Solicitar estudio de compatibilidad»** as secondary (never a purchase CTA, price or stock statement); the navigation disclaimer verbatim in the page language; the AIS receive-only disclaimer wherever traffic is described; the weather disclaimer wherever forecasts are described; a provenance statement that data is shown with source and timestamp; the chart-licence boundary and the offline-region rule; support and cancellation/export summary; ES using **tú** and EN using neutral professional "you"; no banned vocabulary, no certification, ECDIS, safety guarantee or superiority language; no registered or unregistered trademark symbol attached to MAREA, a family or an edition; and canonical message keys from the brand contract at publication time. The copy must not strengthen any statement in this dossier.
- **Evidence.** `VERIFIED_REPO` — `docs/marea/products/copy/nav.es.md` and `nav.en.md` exist in this checkout (checked 2026-10-30); the observed structure is 24 numbered sections, an approved-disclaimers block and a DRAFT/INTERNAL banner in both locales, and the observed CTA pair is «Ver la especificación» / "See the specification" with the secondary compatibility-review pair. Their conformance to every requirement above is a matter for the independent MC-05 review and is neither asserted nor audited here. `VERIFIED_REPO docs/marea/brand/BRAND-VOICE-ES-EN.md` §1, §5, §9, §10, §11; `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §5/§9; `docs/marea/brand/PRODUCT-NAMING-SYSTEM.md` §13/§16; `OPEN` for publication because the brand, chart and cost gates remain closed.
- **Owner.** UX, Content and Localization.
- **Blockers / dependencies.** `X-01`, `D-01`, `X-05`; publication gates, not copy delivery.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`.

#### F21 — Cross-sells

- **Definition.** The intended ladder: Essential to Pro as the first upgrade; NAV plus WEATHER where the customer wants licensed forecast overlays, with entitlement sharing and no double billing; NAV plus a compatible HUB for vessel data; NAV plus a MAREA AIS receiver for receive-only traffic; and, at ecosystem level only, the MAREA START and MAREA CRUISE bundles as defined by MC-08. Cross-sell material must state which included product is not ready and must never imply that a bundle is purchasable. Charts, installation and accessories are priced and licensed separately from the software subscription.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` bundle architecture and `docs/marea/brand/PRODUCT-NAMING-SYSTEM.md` §11 (bundle identities, `CONCEPT` state); `OPEN` — bundle content, price and publication are MC-08 and no bundle is defined here.
- **Owner.** Product Management with Commercial Strategy.
- **Blockers / dependencies.** `P-02`, `P-03`, `X-05`, `X-01`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F22 — Retention strategy

- **Definition.** Retention is intended to come from value that compounds with use, not from lock-in: onboarding that reaches a first saved route and a first logged passage; a logbook and route library the customer wants to keep and can always export; multi-device convenience; the Pro upgrade when the boat's equipment grows; and shared WEATHER entitlement without duplicate billing. Renewal reminders state the renewal date and the VAT-inclusive price; cancellation is available in-product; export is offered before expiry; and no dark pattern, fake urgency or "lifetime" promise is permitted. Post-cancellation data retention, reactivation and deletion rules are `OPEN`. Churn-reduction hypotheses are planning inputs, not measured facts.
- **Evidence.** `HYPOTHESIS` — retention design is unvalidated; `VERIFIED_REPO docs/marea/brand/BRAND-VOICE-ES-EN.md` §10 (subscription and cancellation terminology) and `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §6 (no "free forever"/"lifetime"); `OPEN` — no renewal, entitlement or customer-success system exists (MC-11A).
- **Owner.** Commercial Strategy with Customer Success.
- **Blockers / dependencies.** `X-05`, `P-10`, `D-04`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F23 — Success metrics

- **Definition.** A metric framework with no approved targets. Commercial: evaluation-to-paid conversion, annual recurring revenue, average revenue per account, Essential-to-Pro upgrade rate. Activation: first route saved, first passage logged, chart source connected, instrument source connected, AIS source connected. Quality: crash-free sessions, stale-data incidents, support cases per 100 active accounts, defect reopen rate, export success rate. Retention: renewal rate, churn reason mix, time to first renewal. Channel: installer-assisted activation share, partner-sourced accounts. Trust: share of displayed data classes showing source and timestamp, and number of provenance or licence gaps found in review. Targets and thresholds are set at MC-18A after real measurement; any number in a later document is a planning hypothesis until approved.
- **Evidence.** `ASSUMPTION` on the metric set (derived from `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §01 core KPIs); `OPEN` — analytics and account infrastructure are not implemented, so no baseline exists (`P-10`, MC-11A).
- **Owner.** Commercial Strategy with Product Analytics.
- **Blockers / dependencies.** `X-05`, `X-06`, `P-10`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F24 — End-to-end acceptance

- **Definition.** Acceptance of the complete product means evidence that a customer can complete the full journey on real data and real devices, not a document review. The required evidence set is the §8 scenarios executed under the MC-13-NAV gate: executed TypeScript and end-to-end suites; real chart conversion on real files; route planning and passage execution on real GNSS tracks; a licensed region loaded with its metadata and source; an offline region used with connectivity disabled; GNSS loss; stale AIS; chart entitlement expiry; WEATHER entitlement sharing; cancellation with export; multi-device access; application update; and accessibility. Each scenario must record the device, platform version, firmware, data source, date and result. No scenario has been executed for this milestone; no PASS is claimed; `MC-13-NAV` remains the acceptance milestone and requires an independent verifier who examines the real evidence, not this dossier.
- **Evidence.** `BLOCKED` — no acceptance run exists; `VERIFIED_REPO docs/marea/compliance/OPEN-MARINE-CAPABILITY-INVENTORY.md` §6.3 records all Node/TypeScript suites unexecuted and §6.5 records missing accessibility and e2e coverage; `P-10` records the missing reproducible test environment; `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` §6 (MC-13-NAV gate and mandatory evidence).
- **Owner.** Quality Assurance with Engineering; independent verification by a reviewer who is not the author.
- **Blockers / dependencies.** `P-10`, `P-01`, `D-01`, `D-03`, `D-04`.
- **Commercial readiness.** `engineering = PARTIALLY_VERIFIED`.

## 5. Editions — evaluation of MAREA NAV Essential versus MAREA NAV Pro

### 5.1 Is the split commercially coherent?

The two-edition split is coherent and is recommended to be kept. It separates two genuinely different jobs with different serving costs: *planning* — routes, waypoints, passage notes, logbook, one device and a low recurring data cost — from *connected navigation* — live onboard data, offline storage, multiple devices, computed traffic awareness and advanced overlays. That is the same verdict recorded by the Lead-owned edition matrix (`PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2.1), and this dossier adopts that matrix as authoritative for edition structure.

The split is **not validated commercially**: no cost, provider price, conversion or willingness-to-pay evidence exists (`X-05`, `X-06`), and if the licensed data cost of Pro approaches or exceeds the +EUR 50 difference, the Pro hypothesis fails. There is also a release dependency, not a specification gap: every Pro-specific capability except multi-device and route insights is blocked by an unresolved data or integration right (`D-01`, `D-04`, `D-09`, `H-04`, `P-01`), so Pro cannot be taken to market before at least one verified data path exists. Both questions must be re-tested at MC-12/MC-13 against real quote data, not decided from this document.

### 5.2 What the +EUR 50 hypothesis must deliver

| Capability area | Essential (intended, `HYPOTHESIS`) | Pro (intended, `HYPOTHESIS`) | Why it belongs in Pro |
| --- | --- | --- | --- |
| Planning, routes, waypoints, route libraries | Yes | Yes | Core value; gating it would make Essential uncompetitive |
| Saved destinations, passage notes, logbook, history | Yes | Yes | Core value and the retention base |
| Import/export of own records | Yes — never gated | Yes — never gated | Customer data ownership; also required on cancellation |
| Licensed chart access | Within the customer's licensed coverage and service terms | Within the same licensed coverage and service terms | Chart data is a licensed entitlement in both editions; no edition includes charts by default |
| Basic AIS target display | Yes, where a compatible receive-only AIS source is present | Yes | Hiding basic traffic awareness would be commercially hostile and safety-adjacent |
| Basic forecast and tide/current view | Yes, where the corresponding licence is held | Yes, where the corresponding licence is held | Licensed data entitlement in both editions; not a free software feature |
| GNSS position, freshness and disconnected states | Yes | Yes | Safety-relevant status must never be edition-gated |
| Live instrument overlays (wind, depth, heading, speed) | No | Yes | Requires a tested device source and adds support burden |
| CPA/TCPA and AIS alert rules | No | Yes | Computed interpretation on top of the basic target display; requires valid own-vessel and target data |
| Advanced weather, route overlays and route weather assessment | No | Yes | Licensed data cost and interpretation value sit mainly here |
| Legally supported offline regions | No | Yes, only where the licence permits offline storage in that region | Offline storage is where recurring data and storage cost actually sits |
| Route insights and passage assessment | No | Yes | Higher-value planning output |
| Multi-device simultaneous use | Single device at a time | Yes — phone, tablet and desktop together | Account convenience; entitlement accounting |
| Support level | Standard | Priority intake (no SLA claim) | Pro customers generate more integration cases |

### 5.3 What must be excluded from Essential

Essential must **not** include: live instrument overlays; CPA/TCPA or AIS alert rules (basic AIS target display is deliberately included in both editions); advanced weather, route overlays or route weather assessment beyond the basic licensed forecast view; route insights; legally supported offline regions; and simultaneous multi-device use beyond a single active device. Essential must still include the full planning core, logbook, export, account, basic AIS target display, basic licensed forecast and tide/current views, honest provenance and freshness display, missing-position and disconnected states, accessibility, and all disclaimers. Because basic traffic awareness and basic forecast display are in the entry edition, Essential must never be marketed as "planning only"; it is "planning plus awareness". **Safety-relevant status must never be removed by an edition boundary or by an expired subscription during an active session**: position loss, stale data, source and timestamp display and the navigation disclaimer remain visible regardless of entitlement state.

### 5.4 Evaluation mode and the honest cost of "free"

A free-forever licensed-chart tier is not recommended before chart and weather licences are negotiated: licensed data is charged per user, per region or per activation by many providers (`D-01`, `D-04`, `D-05`, `D-10`), so a free tier that includes licensed charts would transfer an open-ended, unpriced liability to EMBARCARTE. The only evaluation model specified is a **time-limited trial** using only the chart context the trial actually entitles the account to, with no assumption that official ENC data is available. A permanent free tier and a permanent planning-only tier are **not** specified, because the largest recurring cost is per-active-user data licensing and neither can be costed from any existing quote.

The trial must state the exact temporary entitlement, the data limitations, the export behaviour at the end and what remains accessible afterwards. Trial length, trial data scope and end-of-trial export behaviour are `OPEN` and depend on the chart/weather licence terms and the cost per active user (`D-01`, `D-04`); the Lead-owned edition matrix records the same open points. A third paid tier is explicitly out of scope: only MAREA NAV Essential and MAREA NAV Pro exist in this milestone, and no new edition token may be invented.

## 6. Product boundaries — explicit exclusions

MAREA NAV does **not** include, and must never be presented as including:

- **AIS hardware.** No AIS receiver, antenna or splitter ships with the software. AIS is a separate, receive-only hardware product; buying NAV does not imply radio capability (`P-03`, `H-08`, `PORTFOLIO` §03).
- **A GNSS receiver.** Position comes from the customer's device or a compatible source the customer already owns. No receiver is included (`PORTFOLIO` §01 excludes GPS hardware).
- **A MAREA HUB.** Vessel-data integration may use a HUB, but the HUB is a separate product and NAV does not require it for standalone use (`P-02`).
- **Unlimited access to official charts.** No ENC distributor or OEM agreement exists, so official ENC data is not part of the subscription and cannot be promised for any region (`D-01`, `D-02`, `DEC-02`).
- **All regions.** Coverage depends on the licensed sources available for each region; no global or complete coverage is claimed, and the planned first geography is Galicia and northern Portugal (`D-10`).
- **A weather licence for every provider.** Forecast, tide and current layers exist only where a provider licence exists for that product and territory; provider terms are unresolved (`D-04`, `D-05`, `D-07`, `D-10`).
- **ECDIS status.** MAREA NAV is not ECDIS, is not presented as ECDIS-class or ECDIS-equivalent and carries no ECDIS certification; no such claim may be made (`D-01`, `README` §7).
- **Guaranteed collision avoidance or guaranteed safety.** AIS is receive-only and incomplete; CPA/TCPA is decision support only; no product of the family prevents collisions or guarantees safety of life, vessel or cargo (`README` §7, `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 class X).
- **Continuous connectivity.** Offshore and offline operation exists only within legally supported offline regions and stored licensed data; no always-connected service is promised.
- **NMEA 2000 certification or operational compatibility.** NMEA 2000 is not implemented (type stubs only), no NMEA licence or certification exists, and no compatibility claim may be made (`H-04`, `DEC-05`).
- **Emergency, distress, SOLAS or GMDSS functions**, autopilot or steering control, a physical helm display, installation labour, internet or SIM service, and chart data purchased directly from a provider.
- **Any certification, CE marking, test result, sea-trial evidence, stock, delivery time, customer count, review or testimonial** for this product. None exists.

## 7. Customer journeys A–G

Each journey is the **intended final experience**. Entitlements and data boundaries are stated so that no journey implies chart or hardware inclusion. All journeys are `OPEN` or `BLOCKED` today; none is verified.

### A — Standalone buyer with phone or tablet positioning

- Intended flow: choose an edition, create an account, complete the vessel profile, enter or select a chart entitlement, plan a route at home on a larger screen, then navigate with the device's GNSS and log the passage.
- Entitlement boundary: device positioning only; no instruments, no AIS, no licensed offline region unless separately entitled; Essential is sufficient for this journey.
- Data export: routes, waypoints and logbook exportable at any time, including on cancellation.
- Current status: `NOT_VERIFIED`; device platform behaviour is an `EXTERNAL_DEPENDENCY` (MC-13-NAV).

### B — Buyer with existing compatible instruments

- Intended flow: run the compatibility check against the published tested matrix; connect the compatible source; move to Pro for live overlays; confirm the data source, timestamp and stale behaviour on screen.
- Entitlement boundary: read-only instrument values; no control of any device; compatibility is per device and firmware, never a blanket protocol promise; NMEA 2000 is not supported and is not claimed.
- Data export: own routes, waypoints, tracks and logbook remain exportable if the instrument source is removed or replaced; instrument readings are not a customer data export.
- Current status: `EXTERNAL_DEPENDENCY` (`P-01`, `P-02`; no device compatibility result is recorded).

### C — NAV plus HUB retrofit

- Intended flow: installer-led compatibility assessment; HUB installed and commissioned; vessel data published locally; NAV Pro consumes the documented interface; the customer receives an installation record and a handover session.
- Entitlement boundary: HUB is a separate hardware product with its own readiness and price; NAV remains functional without it; no installation is included in the subscription.
- Data export: routes, waypoints, tracks and logbook stay in the account; returning or replacing the HUB does not remove customer records.
- Current status: `NOT_VERIFIED` (`P-02`, `X-05`; HUB hardware does not exist).

### D — NAV plus AIS owner

- Intended flow: a compatible receive-only receiver supplies targets; both editions show the basic AIS target list and target detail; Pro adds CPA/TCPA and alert rules where own-vessel and target data are valid; the receive-only disclaimer is shown with the traffic surface, and the customer is shown that unequipped vessels are invisible to AIS.
- Entitlement boundary: AIS hardware is separate and receive-only; no transponder, no collision avoidance; no detection guarantee; no AIS-derived data redistribution.
- Data export: own routes, waypoints, tracks, logbook and notes are exportable; received AIS target history is not distributed or resold (`D-09`).
- Current status: `BLOCKED` (`P-03`, `D-09`, `H-08`).

### E — NAV plus WEATHER subscriber

- Intended flow: a WEATHER entitlement is linked to the same account; overlays, validity window and source appear in NAV Pro; if the customer already holds the entitlement it is not billed again by NAV.
- Entitlement boundary: forecast, tide and current data remain subject to the provider licence and territory; no meteorological guarantee; source and timestamp always displayed.
- Data export: own routes, waypoints, tracks and logbook are exportable; forecast data remains a licensed third-party product and is not exported for redistribution.
- Current status: `BLOCKED` (`D-04`, `D-05`, `D-07`).

### F — Essential to Pro upgrade

- Intended flow: the customer adds equipment or wants overlays; the upgrade is purchased mid-term as a prorated difference or at renewal; Pro capabilities unlock immediately, while data entitlements that carry provider cost may require separate activation.
- Entitlement boundary: no double charging for an existing WEATHER entitlement; the Essential history and records carry over unchanged.
- Data export: all existing records stay exportable before and after the upgrade, with no format change.
- Current status: `NOT_VERIFIED` (upgrade mechanics `OPEN`, MC-11A).

### G — Cancel or renew

- Intended flow: a renewal reminder states the renewal date and VAT-inclusive price; the customer can renew, change edition or cancel in-product; after cancellation access runs to the end of the paid term; own records remain exportable and licensed third-party data stops; reactivation rules are stated before purchase.
- Entitlement boundary: data ownership stays with the customer; no penalty, dark pattern or hidden renewal; post-termination retention and deletion policy `OPEN`.
- Data export: offered before expiry and available after cancellation without a support ticket; licensed chart, weather and tide data becomes inaccessible when the entitlement ends.
- Current status: `NOT_VERIFIED` (`X-02`, MC-11A; terms of service do not exist).

## 8. End-to-end acceptance scenarios

Classifications use the MC-05 vocabulary. **No scenario is recorded as passing.** `CURRENTLY_VERIFIED` is intentionally unused in this dossier because no scenario has been executed end to end; unit-level evidence appears only in the engineering dimension and in the MC-02 audit.

| ID | Scenario (Given / When / Then) | Classification | Evidence gap and gate |
| --- | --- | --- | --- |
| S-01 | Given a planned route with waypoints, when the customer saves and reopens it, then the route, names and totals persist and export correctly | `PARTIALLY_VERIFIED` | Route/chart UI exists as prototype (`C-03`, `C-04`) but suites are unexecuted (`P-10`); MC-13-NAV |
| S-02 | Given a licensed region and an entitled account, when the customer loads the region, then the chart renders with its source, edition and validity metadata | `LEGAL_OR_COMPLIANCE_BLOCKED` | No chart distribution right (`D-01`); MC-13-NAV after `D-01` |
| S-03 | Given a downloaded licensed offline region, when connectivity is disabled, then the region renders offline and the offline state is explicit | `LEGAL_OR_COMPLIANCE_BLOCKED` | `D-01` plus `D-03` (OSM policy forbids bulk offline); MC-13-NAV |
| S-04 | Given a valid fix, when GNSS is lost, then the last known position is clearly marked as old and the no-position state is explained | `NOT_VERIFIED` | UX not built; MC-13-NAV |
| S-05 | Given received AIS targets, when target data stops updating, then targets are marked stale and are not presented as live | `NOT_VERIFIED` | Target store exists (`C-06`), no stale test; `D-09` data rights; MC-13-NAV |
| S-06 | Given a chart entitlement that expires, when the customer opens the app, then licensed chart data becomes unavailable, the navigation view explains why, and own records remain exportable | `NOT_VERIFIED` | Entitlement layer is `BUILD` (`E-19`); `D-01`; MC-11A |
| S-07 | Given a WEATHER entitlement held on the same account, when the customer uses NAV Pro, then overlays appear once, with source and validity window, and no second charge is created | `NOT_VERIFIED` | Entitlement sharing unbuilt (`E-19`); `D-04`; MC-11A |
| S-08 | Given a paid subscription, when the customer cancels, then access ends at term end and the export of own routes, waypoints, tracks and logbook succeeds | `NOT_VERIFIED` | Billing and portal are `BUILD`; `X-02`; MC-11A |
| S-09 | Given own waypoints and a track, when the customer exports, then a documented open-format file opens in an independent tool with the same coordinates | `PARTIALLY_VERIFIED` | GPX/import/export code exists in prototype (`E-12`) but is unexecuted; MC-13-NAV |
| S-10 | Given an installed version, when an update is applied, then records are preserved and the supported-version policy is enforced | `NOT_VERIFIED` | Update policy `OPEN`; `H-13`; MC-16A |
| S-11 | Given keyboard-only use, when the customer plans a route and reads the chart status, then all core flows are operable and status is not colour-only | `NOT_VERIFIED` | Accessibility unverified; MC-06, MC-13-NAV |
| S-12 | Given one account and two devices, when the customer signs in on both, then the edition's device rule is enforced and records sync consistently | `NOT_VERIFIED` | Accounts and entitlement `BUILD`; MC-11A |
| S-13 | Given a compatible instrument source, when it is connected, then overlays show its values with source, timestamp and stale state | `EXTERNAL_DEPENDENCY` | Per-device compatibility untested (`P-01`, `P-02`); MC-13-NAV |
| S-14 | Given a passage plan with a licensed weather window, when it is saved, then the forecast source, issue time and validity are recorded with the plan | `FINAL_TARGET` | Passage planning and weather overlays not built; MC-13-NAV after `D-04` |
| S-15 | Given a time-limited trial account, when the customer converts to Essential, then the account, vessel profile and planning data carry over without loss | `FINAL_TARGET` | Trial model unapproved (§5.4); MC-11A |

## 9. Traceability annex — MC-02 blockers and evidence still required

| Blocker | Status (MC-02 register) | What it prevents for MAREA NAV | NAV fields affected | Evidence still required to close |
| --- | --- | --- | --- | --- |
| `D-01` | `BLOCKED` (CRITICAL) | Any claim of official ENC data, official offline regions or navigation-grade charts; any ECDIS status | F04, F07, F08, F11, F12, F17, F18, F24, §6 | Signed IC-ENC/IHM/IHPT distributor or OEM agreement with per-cell permits and end-user EULA; `DEC-02` decision |
| `D-02` | `OPEN` (HIGH) | Chart-catalogue truthfulness: CNIG/IHM MBAR is labelled CC BY 4.0 but the provider product is CC-BY-NC and not for navigation | F04, F08, §6 | Corrected source label, legal confirmation of terms, removal from any commercial or navigation claim |
| `D-03` | `OPEN` (HIGH) | Paid offline chart download; OSM tile policy forbids bulk prefetch and may withdraw commercial access | F04 (domain 21), F11, F24, S-03 | Licensed or self-hosted tile decision and a written offline-storage right per source |
| `D-04` | `BLOCKED` (CRITICAL) | Commercial weather data: Open-Meteo free tier is non-commercial; a paid plan or AGPL self-hosting decision is required | F04 (domains 18–20), F14, F21, §5 | Written provider terms or quote; `DEC-03` decision; forecast-quality evaluation plan |
| `D-05` | `BLOCKED` (HIGH) | Weather tile/map overlays: an ordinary API key does not cover tile endpoints and sublicensing is not granted | F04 (domain 18), F14, S-07 | Correct provider tier or removal of the layer; entitlement mapping per product |
| `D-06` | `LEGAL_REVIEW_REQUIRED` (HIGH) | Esri World Imagery basemap used without a commercial path | F04 | Replace with an openly licensed basemap or obtain Esri terms |
| `D-08` | `OPEN` (HIGH) | GEBCO and EMODnet bathymetry are not nautical charts and may not be used for navigation | F04 (domain 15), §6 | Informational-only labelling, provenance display and disclaimers; exclusion from navigation-grade claims |
| `D-10` | `BLOCKED` (HIGH) | 11 of 28 provider rows remain `LEGAL_REVIEW_REQUIRED`; no provider-by-provider register | F04, F13, F14, §6 | Provider-by-provider clearance register with written terms or removal |
| `P-01` | `REUSE-CONDITIONAL` (HIGH) | NAV scope as "licensed-chart-capable"; no tested instrument integration, no chart rights | All fields; §5 | Approved NAV scope, chart rights, compatibility matrix, acceptance tests (MC-13-NAV) |
| `P-10` | `OPEN` (HIGH) | Reproducible test environment: 214 TS cases and 3 Playwright cases unexecuted | F24, engineering dimension, all `NOT_VERIFIED` scenarios | `npm ci` in an isolated environment, CI parity and a per-module test report |
| `L-01` | `BLOCKED` (CRITICAL) | No outbound software licence position; default copyright grants no reuse right | F07, F12 | Written licence decision and proprietary baseline for MAREA products (`DEC-01`) |
| `L-02` | `BLOCKED` (CRITICAL) | Contributor assignment absent for files last touched by an external domain identity | F12 | Written IP assignment or waiver, employer confirmation if applicable |
| `L-03` | `BLOCKED` (CRITICAL) | Ownership between individual, TECNORIA and EMBARCARTE undocumented | F12 | Corporate IP schedule and assignment to EMBARCARTE |
| `X-01` | `BLOCKED` (HIGH) | No MAREA brand clearance; publication of any name or page is gated | F01, F17, F20, §10 | EUIPO/OEPM clearance and publication authorization |
| `X-05` | `BLOCKED` (HIGH) | No real BOM, provider price, data-licence price, channel term or unit economics | F13, F14, F15, F23 | Real provider and channel quotes and a bottom-up cost worksheet |

**Cross-product dependencies that are not NAV blockers but constrain this dossier:** `H-04`/`DEC-05` (NMEA 2000 is not implemented; no certification or compatibility claim in any file), `D-09` (AIS-derived data redistribution requires review; NAV only displays receive-only targets), `P-02` (HUB gateway and local authentication), `P-03` (AIS decoder and receiver hardware), `X-02` (legal seller identity needed for terms of service), `H-13` (Cyber Resilience Act obligations for the distributed application and any companion service).

**Evidence still required, grouped by type:**

1. **Chart and data rights** — a signed chart distribution or OEM agreement with per-cell permits and end-user EULA; a written licence per weather, tide, bathymetry and basemap source; an offline-storage right per source; a provider-by-provider clearance register.
2. **Licence terms** — outbound software licence and ownership assignments (`DEC-01`, `L-01`–`L-03`); terms of service, privacy notice and warranty wording once the seller's legal identity exists (`X-02`); CRA vulnerability-handling and update policy (`H-13`).
3. **Test evidence** — executed TypeScript and end-to-end suites; real chart conversion on real files; route planning and passage execution on real GNSS tracks; a licensed region loaded with metadata; an offline run with connectivity disabled; GNSS-loss and stale-AIS tests; CPA unit tests; entitlement-expiry, sharing, cancellation and export tests; multi-device tests; update tests; accessibility tests. Every scenario in §8 needs a recorded device, platform, firmware, data source, date and result.
4. **Commercial evidence** — real provider and channel quotes; bottom-up contribution worksheet; willingness-to-pay evidence from customer interviews (`X-05`, `X-06`).
5. **Brand evidence** — trademark clearance and publication authorization (`X-01`).

## 10. Required disclaimers (verbatim)

The navigation disclaimer below is the approved wording from `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9 and must appear verbatim, in the language of the surface, on every product page, in-app navigation surface, manual and quotation that shows position, charts, traffic, depth or weather.

**Navigation / instruments — ES:**

«Este producto es una ayuda a la navegación y no sustituye a la carta náutica oficial, al equipo reglamentario de la embarcación, a la vigilancia continuada ni al buen hacer marinero. La responsabilidad de la navegación corresponde siempre al patrón.»

**Navigation / instruments — EN:**

"This product is a navigational aid. It does not replace official nautical charts, the vessel's required equipment, continuous watchkeeping or good seamanship. Responsibility for navigation always rests with the skipper."

Because MAREA NAV can display AIS targets and licensed forecasts, the corresponding approved disclaimers also apply wherever those surfaces appear.

**AIS (receive-only) — ES:**

«La recepción AIS es únicamente de escucha: no todos los buques emiten AIS. No constituye un sistema de evitación de colisiones ni un transpondedor.»

**AIS (receive-only) — EN:**

"AIS reception is receive-only: not every vessel transmits AIS. It is not a collision-avoidance system and not a transponder."

**Weather — ES:**

«Las previsiones son probabilísticas y pueden desviarse de las condiciones locales reales. Se muestra la fuente y la hora de cada dato.»

**Weather — EN:**

"Forecasts are probabilistic and may differ from actual local conditions. Source and timestamp are displayed for every data point."

**Brand attribution — ES / EN** (footer of commercial material, once publication is authorized):

«MAREA es una marca de producto de EMBARCARTE.» / "MAREA is a product brand of EMBARCARTE."

MAREA NAV is a navigational aid. This dossier is an internal product definition: it is not a commercial offer, not a price list, not a certification, not a safety statement and not evidence that any capability works. The product is `DEFINED` and `NOT_FOR_SALE`.
