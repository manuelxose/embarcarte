# MAREA NAV · MAREA HUB · MAREA AIS — Edition comparison

| Field | Value |
| --- | --- |
| Document ID | MC-05 / D4-PRODUCT-EDITIONS |
| Milestone | MC-05 (Master Prompt 05/36) |
| Date | 2026-10-30 |
| Owner | Lead (Chief Product Officer) |
| Status | INTERNAL. Complete target specification. Products are `DEFINED`, **not for sale**, brand clearance `NOT_GRANTED` |
| Binds | the three product dossiers (D1–D3), the machine-readable contract (D10) and the bilingual copy drafts (D8) |
| Base | `feature/marea-mc05-nav-hub-ais-products` @ `8ac6d69` |

This document is the edition authority for the first product batch. The three dossiers define the products; this
document defines **which customer pays for which capability, and why**. It is written for a commercial reader
and a future catalogue team, not for the engineering team.

## 1. Purpose and status

MC-05 has to answer one question before any product page can be written: **is there a real, explainable
difference between the two editions of each product, or is the second edition a label?**

The answer for all three products is: there is a real difference, but each difference must be expressed as a
**customer outcome**, not as a specification change. This document therefore gives, for every capability, an
inclusion status and the commercial rationale behind that status. No capability is listed here as delivered:
the engineering status column records what is actually evidenced today.

The edition structure is not final commercial packaging. It is the **intended final** structure, subject to the
acceptance gates in the dossiers and to the price validation that does not yet exist. Prices shown are the
programme hypotheses from `COMMERCIAL-PORTFOLIO.md`, always labelled `HYPOTHESIS_UNAPPROVED`.

### 1.1 Inclusion status vocabulary

| Status | Meaning for the customer |
| --- | --- |
| `INCLUDED` | Part of the edition at no additional product cost |
| `INCLUDED_LICENSED` | Part of the edition **only** while the corresponding licensed data entitlement is valid and paid for the covered area and period |
| `OPTIONAL` | Available, but as a separately purchased MAREA product, accessory, service or data entitlement — never free |
| `NOT_INCLUDED` | Explicitly outside the edition; the customer must obtain it elsewhere or upgrade |
| `TARGET_ONLY` | Intended final capability, not verified or not yet built; may not be sold or advertised as available |

### 1.2 Evidence status vocabulary (honest engineering column)

| Status | Meaning |
| --- | --- |
| `PARTIAL` | Related software capability exists in the internal OPEN-MARINE foundation but is not product-verified, not integrated as a sold product, and not tested for this product's scope (MC-02 `P-01`, `P-02`, `P-03`, `P-10`) |
| `TARGET` | Intended final capability with no verified implementation; a product-engineering requirement |
| `BLOCKED` | Cannot be offered or claimed until an external condition closes (rights, certificate, measurement, contract) |

Every row in this document is `TARGET` or `PARTIAL` unless marked `BLOCKED`. **No capability in MC-05 is
`VERIFIED` as a sellable product feature.** That single sentence is the difference between a product definition
and a product launch.

### 1.3 Edition identity table (authoritative ids)

The machine-readable contract, the validator and the future catalogue refer to editions by **id**, never by a
paraphrase. The ids are fixed here; the display names are the only permitted commercial spellings.

| Edition id | Display name | Product type | Price hypothesis (status `HYPOTHESIS_UNAPPROVED`) | Edition verdict at MC-05 |
| --- | --- | --- | --- | --- |
| `NAV-ESSENTIAL` | MAREA NAV Essential | software subscription | EUR 99 / year, VAT-inclusive consumer retail hypothesis | `DEFINED` — split retained |
| `NAV-PRO` | MAREA NAV Pro | software subscription | EUR 149 / year, VAT-inclusive consumer retail hypothesis | `DEFINED` — split retained, conditioned on at least one verified live-data path before market |
| `HUB-STANDARD` | MAREA HUB Standard | hardware appliance | EUR 349, generally VAT-inclusive retail hypothesis | `DEFINED` — split retained, conditioned on a frozen, tested connectivity envelope |
| `HUB-PRO` | MAREA HUB Pro | hardware appliance | EUR 499, generally VAT-inclusive retail hypothesis | `DEFINED` — split retained, conditioned on the additional validated families being tested |
| `AIS-RECEIVER` | MAREA AIS Receiver | receive-only hardware | EUR 249, generally VAT-inclusive retail hypothesis | `DEFINED` — base receive-only package |
| `AIS-CONNECTED` | MAREA AIS Connected | receive-only hardware | EUR 399, generally VAT-inclusive retail hypothesis | `CONDITIONAL / NOT_YET_JUSTIFIED` — may only ship as a separate edition if the frozen hardware design evidences richer local networking and diagnostics; otherwise one SKU plus an optional accessory |

No other edition id exists in MC-05. `AIS-CONNECTED` is the only edition whose existence is conditional; the
other five are proposed and retained subject to the evidence gates above.

---

## 2. MAREA NAV — Essential vs Pro

**Positioning.** MAREA NAV Essential is the planning-and-passage edition: it lets a skipper plan, keep a
logbook and navigate a licensed chart area on one device. MAREA NAV Pro is the connected-navigation edition:
it adds the on-board data and the multi-device/offline continuity that a boat used regularly actually needs.

**Price hypotheses:** Essential EUR 99/year, Pro EUR 149/year — `HYPOTHESIS_UNAPPROVED`, VAT-inclusive consumer
retail hypothesis, annual term. No chart licence, no AIS hardware, no instrument interface and no HUB is included
in either price.

| # | Capability | Essential | Pro | Commercial rationale | Evidence |
| --- | --- | --- | --- | --- | --- |
| N01 | Vessel and skipper profile (one vessel, one account) | `INCLUDED` | `INCLUDED` | Identity of the boat and skipper is the base of every useful navigation account; splitting it would make Essential unusable | `TARGET` |
| N02 | Navigation home screen with position, course and next waypoint | `INCLUDED` | `INCLUDED` | The first screen must already answer "where am I and where am I going" | `PARTIAL` (navigation UI in the internal foundation, untested) |
| N03 | Device GNSS positioning (phone/tablet/desktop capability) | `INCLUDED` | `INCLUDED` | Basic positioning is free to both editions at software level; the device supplies it. It is **not** a hardware GNSS receiver in the box | `TARGET` |
| N04 | Licensed chart access within the purchased coverage and service terms | `INCLUDED_LICENSED` | `INCLUDED_LICENSED` | The chart entitlement is what the customer is really paying for; it is a licensed data right, never ownership of the chart data. The covered region and terms are the same for both editions unless a promotion states otherwise | `BLOCKED` (`D-01`, `D-02`, `D-03`; no distributor/OEM right exists) |
| N05 | Geographic coverage beyond the purchased region | `NOT_INCLUDED` | `NOT_INCLUDED` | No edition may imply global or unlimited official chart coverage; a wider region is a separately purchased data entitlement | `BLOCKED` (`D-01`) |
| N06 | Route planning, editing and route libraries | `INCLUDED` | `INCLUDED` | The core planning job is the reason Essential exists; it cannot be gated behind the upgrade | `PARTIAL` |
| N07 | Waypoints, saved destinations and passage planning notes | `INCLUDED` | `INCLUDED` | Waypoint and passage preparation is the base planning workflow | `PARTIAL` |
| N08 | Digital logbook and navigation history | `INCLUDED` | `INCLUDED` | A logbook is an entry-level expectation and creates retention without recurring data cost | `TARGET` |
| N09 | Export and import of the customer's own navigation records | `INCLUDED` | `INCLUDED` | Data portability is a fairness requirement, not an upsell: a cancelling customer must always be able to take their own routes, waypoints and log out | `TARGET` |
| N10 | Live instrument overlays (wind, depth, speed, heading) from compatible connected equipment | `NOT_INCLUDED` | `INCLUDED` | This is the single clearest upgrade driver: Essential plans, Pro shows what the boat is actually doing. It requires compatible equipment and a supported data path — buying Pro does **not** create the instruments | `BLOCKED` (`D-01`-adjacent integration gap, `H-04`, `P-01`; no tested instrument integration) |
| N11 | AIS traffic display — target list and target detail | `INCLUDED` | `INCLUDED` | Traffic must be visible where AIS data already reach the app; hiding basic targets behind the upgrade would be commercially hostile and safety-adjacent. Pro adds interpretation, not presence | `BLOCKED` (`D-09` retention, no tested AIS path; AIS hardware is always a separate purchase) |
| N12 | CPA/TCPA traffic awareness where valid data exist | `NOT_INCLUDED` | `INCLUDED` | CPA/TCPA is a computed interpretation that requires own-vessel course/speed and valid AIS targets; it is a genuine Pro capability and the strongest "why upgrade" argument after live instruments | `BLOCKED` (no tested AIS data path; `D-09`) |
| N13 | AIS traffic alerts and configurable alert thresholds | `NOT_INCLUDED` | `INCLUDED` | Alerts are a Pro workflow feature; Essential shows targets without managing alert rules | `TARGET` |
| N14 | Weather forecast layers and forecast source/freshness display | `INCLUDED_LICENSED` | `INCLUDED_LICENSED` | Basic forecast display is a licensed data entitlement (MAREA WEATHER or a licensed provider entitlement). Neither edition includes a weather licence for every provider, and it must not be charged twice | `BLOCKED` (`D-04`, `D-05`, `D-07`; `DEC-03`) |
| N15 | Advanced weather/route overlays and route weather assessment | `NOT_INCLUDED` | `INCLUDED` | Route-weather interpretation is a Pro planning tool; Essential keeps the base forecast view | `BLOCKED` (`D-04`) |
| N16 | Tides and currents | `INCLUDED_LICENSED` | `INCLUDED_LICENSED` | Tidal data is licensed per provider/region and is not a free software feature in either edition | `BLOCKED` (`D-10` provider terms) |
| N17 | Legally supported offline regions | `NOT_INCLUDED` | `INCLUDED` | Offline storage is where the recurring data/storage cost actually sits, so it belongs to Pro; it is only offered where the data licence permits offline storage in that region | `BLOCKED` (`D-01`, `D-03`) |
| N18 | Multi-device account access (phone + tablet + desktop together) | `NOT_INCLUDED` | `INCLUDED` | Essential is a single-device planning experience; Pro is the cockpit-plus-planner combination. Simultaneous multi-device entitlement is a real serving cost and a real Pro benefit | `TARGET` |
| N19 | Route insights (passage summary, leg analysis) | `NOT_INCLUDED` | `INCLUDED` | Interpretation layer sold with Pro; optional for a planning-only customer | `TARGET` |
| N20 | Missing-position, disconnected and stale-data states | `INCLUDED` | `INCLUDED` | Honest degraded states are a safety-of-understanding requirement in every edition; never an upsell | `TARGET` |
| N21 | Application updates | `INCLUDED` | `INCLUDED` | Security and compatibility updates are part of the subscription, in both editions | `TARGET` |
| N22 | Accessibility (readable at sea, keyboard/screen-reader support, day/night legibility) | `INCLUDED` | `INCLUDED` | Accessibility is not a premium tier; it is a quality requirement of every edition | `TARGET` |
| N23 | MAREA HUB integration (on-board data) | `OPTIONAL` | `OPTIONAL` | The HUB is a separate hardware product. NAV does not require a HUB; a HUB needs NAV or another compatible consumer of its data | `BLOCKED` (`P-02`) |
| N24 | MAREA AIS receiver integration | `OPTIONAL` | `OPTIONAL` | AIS hardware is always an additional purchase. "NAV shows AIS" never means "NAV includes AIS" | `BLOCKED` (`P-03`) |
| N25 | ECDIS or official-chart-system status | `NOT_INCLUDED` | `NOT_INCLUDED` | Never offered, in any edition, under any name: NAV is a navigational aid (blocker `D-01`) | `BLOCKED` by design |

### 2.1 NAV edition verdict

- **The split is commercially sound**, because it separates two different jobs: *planning* (a low recurring
  data/storage cost, one device) from *connected navigation* (live on-board data, offline storage, multiple
  devices, computed traffic awareness). Those two jobs have genuinely different serving costs and genuinely
  different customer value.
- **The upgrade trigger is explicit and honest:** a customer who only plans passages on one tablet is well
  served by Essential; a customer who wants the boat's instruments, offline charts, CPA/TCPA and a second screen
  needs Pro. This is a value step of EUR 50/year (`HYPOTHESIS_UNAPPROVED`) against a materially larger feature
  set — defensible, but only if the live path actually works.
- **Risk — Essential may be over-featured.** AIS target display (N11) and basic weather (N14) sit in the entry
  edition. That is deliberate: hiding traffic awareness would be commercially hostile. The consequence is that
  Essential must not be marketed as "planning only"; it is "planning plus awareness".
- **Risk — Pro may be unsellable until the integration path exists.** Every Pro-specific capability except
  multi-device and route insights is `BLOCKED` by an unresolved data or integration right (`H-04`, `D-01`,
  `D-09`). Pro cannot be taken to market before at least one verified data path exists. This is a release
  blocker, not a specification gap.
- **No third tier is specified.** A "NAV Offshore" or "NAV Fleet" tier would need its own data rights, its own
  cost base and a distinct customer, none of which exist. Inventing one now would only create a price with no
  delivery behind it.
- **Trial / free exploration mode:** evaluate a time-limited trial only. A permanent free tier is not specified
  because the product's largest recurring cost is chart/weather data licensing, which is incurred per active
  user and cannot be given away permanently. A trial must state the exact temporary entitlement, data
  limitations and export behaviour at the end; it is `OPEN`, not promised.

---

## 3. MAREA HUB — Standard vs Pro

**Positioning.** MAREA HUB Standard is the coherent base connectivity package: it brings the boat's basic
supported data together and publishes it locally. MAREA HUB Pro is the refit edition: a wider validated
compatibility envelope, more integration capacity, deeper configuration and installer diagnostics for vessels
with mixed or older equipment.

**Price hypotheses:** Standard EUR 349, Pro EUR 499 — `HYPOTHESIS_UNAPPROVED`, generally VAT-inclusive retail
hypothesis. **No BOM, supplier quotation, certification cost or channel agreement validates either figure.**
Neither edition includes a marine network backbone, licensed vendor cables, an antenna, or installation.

| # | Capability | Standard | Pro | Commercial rationale | Evidence |
| --- | --- | --- | --- | --- | --- |
| H01 | Local vessel data gateway (publishes supported data on the local network) | `INCLUDED` | `INCLUDED` | The reason the product exists; both editions must do the base job | `PARTIAL` (data contract/architecture in the internal foundation) |
| H02 | GNSS data intake from a supported source | `INCLUDED` | `INCLUDED` | Position is the anchor for every other datum | `TARGET` |
| H03 | Base supported data intake family (NMEA 0183 / Signal K, per published matrix) | `INCLUDED` | `INCLUDED` | Standard's promise is a **defined, published** connectivity envelope, not a universal one | `BLOCKED` (`H-04`, `P-02`; no certified/tested interface matrix) |
| H04 | Additional validated connection families and device categories | `NOT_INCLUDED` | `INCLUDED` | Pro is bought by the owner whose boat mixes several generations of equipment; the extra validated families are the product, and each one costs validation work | `BLOCKED` (`H-04`, `H-07`) |
| H05 | Integration capacity (number of supported devices/streams in one installation) | `INCLUDED` (defined bounded envelope) | `INCLUDED` (expanded bounded envelope) | Capacity is a real technical and support-cost boundary and an honest upgrade reason; the exact figures are `OPEN` product-engineering requirements, not invented today | `TARGET` |
| H06 | Instrument data normalisation (one consistent unit/quality model) | `INCLUDED` | `INCLUDED` | Normalisation is the core customer value ("all your boat's data in one place") | `TARGET` |
| H07 | Wind, depth, battery/utility and environmental measurements from supported sources | `INCLUDED` | `INCLUDED` | Standard already makes the boat readable; Pro widens *what is supported*, not *whether readings exist* | `BLOCKED` (`H-05` hardware, `P-05` sensors are separate products) |
| H08 | AIS data integration from a MAREA AIS receiver | `OPTIONAL` | `OPTIONAL` | AIS is a separate hardware product in both editions; the HUB integrates it when both are present. Not a Pro-only feature, because artificially restricting a separately purchased receiver would be indefensible | `BLOCKED` (`P-03`, `D-09`) |
| H09 | Local dashboard access (browser/app on the boat's local network) | `INCLUDED` | `INCLUDED` | The visible result of the gateway; the customer must see something without the internet | `TARGET` |
| H10 | On-board network access for connected clients | `INCLUDED` | `INCLUDED` | Base connectivity promise | `TARGET` |
| H11 | Connection diagnostics (what is connected, what is silent, what is unsupported) | `INCLUDED` (basic status) | `INCLUDED` (deep diagnostics + guided checks) | Basic status must be in the base edition; guided fault-finding is genuinely more valuable and saves installer hours | `TARGET` |
| H12 | Installation status report and commissioning record | `NOT_INCLUDED` (basic pass/fail) | `INCLUDED` (documented commissioning evidence for handover) | Pro serves professional installations that need a handover record; Standard serves self-installers | `TARGET` |
| H13 | Installer configuration tools (device mapping, multi-source arbitration, saved configuration) | `NOT_INCLUDED` | `INCLUDED` | This is the clearest professional-installer value in Pro and justifies the step for refit vessels | `TARGET` |
| H14 | Configuration backup and recovery | `INCLUDED` | `INCLUDED` | Recovery is a base fairness/support requirement, not a premium feature | `TARGET` |
| H15 | Offline functionality (no internet required for local data) | `INCLUDED` | `INCLUDED` | Local-first is a safety-relevant design boundary: loss of the commercial website connection must not interrupt onboard functions | `TARGET` |
| H16 | Device identity and ownership registration | `INCLUDED` | `INCLUDED` | Required for support, warranty and ownership transfer; not a monetisable feature | `TARGET` |
| H17 | Ownership transfer on sale of the vessel | `INCLUDED` | `INCLUDED` | A second-hand boat must be able to change owner cleanly; charging for transfer would be hostile and operationally fragile | `TARGET` |
| H18 | Firmware/software updates with safe failure behaviour | `INCLUDED` | `INCLUDED` | Security updates are a legal and safety obligation (CRA, `H-13`), not a tier | `BLOCKED` (`H-13`; no secure update process exists yet) |
| H19 | Supported local data retention (onboard history) | `INCLUDED` (short window) | `INCLUDED` (extended window) | Retention is a storage cost and an analytics value; the exact windows are `OPEN` engineering requirements | `TARGET` |
| H20 | Support and warranty handling | `INCLUDED` | `INCLUDED` | Warranty terms must be identical in principle; Pro does not buy more legal rights, it buys more installation capability | `BLOCKED` (`X-02` legal identity) |
| H21 | Professional installation by EMBARCARTE | `OPTIONAL` (service) | `OPTIONAL` (service) | Installation is a separately quoted service in both editions; a refit with mixed equipment will usually require it, a simple compatible vessel may not | `BLOCKED` (no measured installation time/price) |
| H22 | MAREA NAV licence | `NOT_INCLUDED` | `NOT_INCLUDED` | The HUB is not a navigation application and never includes a NAV subscription | — |
| H23 | Automatic steering / autopilot control path | `NOT_INCLUDED` | `NOT_INCLUDED` | No public automatic steering-control path is introduced by this product family (`H-02`). Never sold, never implied | `BLOCKED` by design |
| H24 | Universal compatibility with any boat or any electronics | `NOT_INCLUDED` | `NOT_INCLUDED` | Never claimed. Compatibility is per device, per firmware, per direction, published as a matrix | `BLOCKED` (`H-04`) |

### 3.1 HUB edition verdict

- **The split is commercially sound if and only if the "additional validated families" are real and tested.**
  Standard sells a defined envelope; Pro sells a wider one plus installer tooling. That is a customer-value
  difference a boat owner can repeat in one sentence: *"Standard works with the equipment we validated;
  Pro works with more of what you already have, and gives the installer the tools to prove it."*
- **Pro must never be described as "more powerful".** Power is not a benefit; a wider validated compatibility
  envelope, commissioning evidence and deeper diagnostics are.
- **The strongest Pro buyer is the refit installer**, not the owner. That is why the edition carries installer
  tooling and a handover record. Channel economics must therefore reward the installer for specifying Pro
  (see D6) without making Standard look defective.
- **Risk — a wide compatibility promise is the main commercial temptation and the main legal exposure.** The
  compatibility matrix is the product; until it is tested, every compatibility claim is prohibited (`H-04`).
- **Risk — Standard may be over-priced relative to single-purpose gateways** (comparator context re-verified in
  D6 §5.2 on 2026-10-30: Digital Yacht iKonvert listed at EUR 240; Yacht Devices YDWG-02N at EUR 205.84 net of
  VAT with a EUR 236.55 recommended retail price; the earlier programme anchor of EUR 249.07 could not be
  reproduced and is superseded by the D6 figure). The justification must be the integrated data experience,
  local dashboard, diagnostics and support — not hardware alone. This is a pricing question for MC-11/MC-12,
  not settled here.

---

## 4. MAREA AIS — Receiver vs Connected

**Positioning.** MAREA AIS Receiver is the receive-only traffic-awareness package: it hears AIS transmissions
and makes the received targets available to a compatible display. MAREA AIS Connected adds the local
integration and diagnostics layer that makes the receiver a managed part of the boat's electronics.

**Price hypotheses:** Receiver EUR 249, Connected EUR 399 — `HYPOTHESIS_UNAPPROVED`. The comparator evidence
re-verified in D6 §5.3 on 2026-10-30 (Digital Yacht AIS100 published at EUR 300 in the EU store and EUR 360 in
the Spanish storefront on the same date; AIS100PRO at EUR 350; the earlier programme anchor of EUR 360/420 could
not be reproduced and is superseded by the D6 figures) suggests the entry hypothesis is aggressive; that is
**not** validation of a positive margin.

**Non-negotiable framing.** MAREA AIS receive-only does not transmit the vessel's position, is not a
transponder, is not a collision-avoidance system, and does not replace watchkeeping. No edition changes that.

| # | Capability | Receiver | Connected | Commercial rationale | Evidence |
| --- | --- | --- | --- | --- | --- |
| A01 | Receive-only AIS reception (VHF AIS channels, receive direction only) | `INCLUDED` | `INCLUDED` | The base function of both editions; transmission is never offered | `BLOCKED` (`H-08`; no receiver hardware or RF conformity evidence) |
| A02 | Received target identity, position, course, speed and type display through a compatible consumer | `INCLUDED` | `INCLUDED` | The customer outcome: know who is around you | `BLOCKED` (`P-03`) |
| A03 | Traffic target list and target detail | `INCLUDED` | `INCLUDED` | Basic traffic awareness cannot be gated behind the upgrade | `TARGET` |
| A04 | Target history / short track trail | `NOT_INCLUDED` | `INCLUDED` | Track history is a local processing and storage feature that makes traffic readable; genuine Connected value | `TARGET` |
| A05 | Local network distribution to more than one client at a time | `NOT_INCLUDED` (single documented output) | `INCLUDED` (multi-client local distribution) | The owner running NAV on a tablet plus a second display needs multi-client distribution; it is a real hardware/software capability, not a label | `TARGET` (subject to verified hardware design) |
| A06 | Integration with MAREA HUB as a managed on-board data source | `NOT_INCLUDED` | `INCLUDED` | Connected is the edition designed to be commissioned as part of the boat's integrated electronics; Receiver serves a direct connection to a compatible consumer | `BLOCKED` (`P-02` then `P-03`) |
| A07 | Receiver status and reception-quality diagnostics (connection state, data freshness, error counters where supported) | `NOT_INCLUDED` (basic connection indicator) | `INCLUDED` | Diagnostics are the difference between "it stopped working" and "the antenna cable is loose"; high support value, clear upgrade reason | `TARGET` |
| A08 | Antenna/splitter installation guidance and commissioning checks | `INCLUDED` (documentation) | `INCLUDED` (documentation + installer commissioning path) | Both must document the requirement; Connected adds the guided commissioning route | `TARGET` |
| A09 | Firmware updates | `INCLUDED` | `INCLUDED` | Security/quality updates are not a tier (`H-13`) | `BLOCKED` (`H-13`) |
| A10 | Required position/course data for CPA/TCPA computation | `OPTIONAL` (supplied by the compatible consumer/NAV or instruments) | `OPTIONAL` | CPA/TCPA is computed by the consuming application, not by the receiver; if own-vessel data are missing the computation is not shown. Never promised as a receiver feature | `BLOCKED` (`D-09`) |
| A11 | Traffic alerts | `OPTIONAL` (in the consuming application, e.g. MAREA NAV Pro) | `OPTIONAL` | Alerts belong to the application layer; selling them as a receiver edition would misdescribe the product | `BLOCKED` (`D-09`) |
| A12 | AIS transmission, transponder, DSC or own-position broadcast | `NOT_INCLUDED` | `NOT_INCLUDED` | Never, in any edition. A customer who needs to transmit needs a transponder, which MAREA does not sell as part of this batch | by design |
| A13 | Collision-avoidance system | `NOT_INCLUDED` | `NOT_INCLUDED` | Never claimed. AIS reception is incomplete by nature | by design |
| A14 | Guaranteed reception range or guaranteed detection of every vessel | `NOT_INCLUDED` | `NOT_INCLUDED` | Never claimed: reception depends on antenna, cabling, power, installation and whether the other vessel transmits | by design |
| A15 | Antenna, VHF splitter, power/data cabling and mounting accessories | `OPTIONAL` | `OPTIONAL` | These are separately priced items unless a final SKU explicitly states otherwise. They must never be implied to be free or included before the BOM is frozen | `OPEN` (procurement-dependent) |
| A16 | Professional installation | `OPTIONAL` (service) | `OPTIONAL` (service) | A retrofit AIS installation usually needs an installer; a compatible self-install may not. Both are quoted separately | `BLOCKED` (no measured time/price) |
| A17 | MAREA NAV licence | `NOT_INCLUDED` | `NOT_INCLUDED` | Buying AIS never includes navigation software | — |
| A18 | AIS-derived data retention and external redistribution | `NOT_INCLUDED` | `NOT_INCLUDED` | Retention/redistribution rights are not established (`D-09`); neither edition offers fleet sharing or public redistribution | `BLOCKED` (`D-09`) |

### 4.1 AIS edition verdict

- **The split is commercially sound only if Connected has verified hardware to point at.** Receiver is a
  single-purpose receive-only product with a documented output; Connected is the same reception plus local
  distribution, track history, HUB-managed integration and diagnostics. That is a coherent pair of jobs:
  *"hear the traffic"* versus *"make the traffic a managed part of the boat"*. **Verdict recorded by the AIS
  product function: `CONDITIONAL / NOT_YET_JUSTIFIED`.** If the frozen hardware design does not evidence richer
  local networking (more than one documented consumer) and diagnostics that the Receiver does not expose,
  `AIS-CONNECTED` must not ship as a separate edition; the product collapses to one SKU plus an optional
  accessory. That decision belongs to MC-11 (hardware) with MC-12 (economics), and is not taken here.
- **Dual-channel reception is not asserted.** If the final hardware design is dual-channel, it is then a
  capacity/quality feature that may justify the Connected step; until validated it is a target engineering
  requirement (`OPEN`), never a selling claim.
- **Risk — the label trap.** "Connected" is meaningless to a customer unless the four differences above are
  real and testable. The dossier must state them as customer outcomes, and the product page must show what the
  Receiver customer loses, not only what Connected adds.
- **Risk — margin.** EUR 249 for a complete receive-only package is below the published single-purpose
  comparator band. Either the included contents are narrower than customers will assume, or the hardware
  cost/quality is not yet known. Both must be resolved in MC-11/MC-12 before this hypothesis is used anywhere.
- **No third AIS edition is specified.** A hypothetical "AIS Transponder" is a different product class with a
  different regulatory regime and is explicitly outside this batch.

---

## 5. Cross-product inclusion boundaries (the most common customer misunderstanding)

| Boundary | Rule (never deviate in copy or quotation) |
| --- | --- |
| Buying NAV does **not** include | AIS receiver hardware; a GNSS receiver; a HUB; unlimited or global official charts; a weather licence for every provider; any certification; guaranteed connectivity; ECDIS or official-chart-system status |
| Buying HUB does **not** include | A NAV or WEATHER subscription; an AIS receiver; sensors; a marine network backbone; licensed vendor cables; installation; universal device compatibility |
| Buying AIS does **not** include | Transmission/transponder capability; a NAV licence; a HUB; an antenna or VHF splitter unless the final SKU lists them; installation; collision avoidance; guaranteed reception |
| Buying any edition does **not** include | A price approval, a delivery date, a certification or a support SLA that is not published with the product |

## 6. Comparison summary (customer's-choice view)

| Question the customer asks | MAREA NAV | MAREA HUB | MAREA AIS |
| --- | --- | --- | --- |
| What do I actually buy? | Software subscription with a licensed-data entitlement | Hardware gateway appliance | Receive-only traffic-awareness hardware |
| Does it work on its own? | Yes — with device positioning and licensed charts; HUB optional | Yes — locally, for supported vessel data; its consumer app/NAV is separate | Yes — with a compatible consumer; NAV/HUB optional |
| What is the upgrade about? | Live data, offline, multi-device, computed traffic awareness | Wider validated compatibility, installer tooling, commissioning record | Local multi-client integration, history, management and diagnostics |
| What must I still pay for separately? | Charts/weather/tides per licence; AIS hardware; HUB; installation | NAV/WEATHER; AIS; sensors; cabling; installation | Antenna/splitter/cabling (unless stated); NAV; HUB; installation |
| Is a compatibility check required? | Yes for instruments/AIS/HUB integration | Yes, always — the published matrix decides | Yes for the receiving system, cabling and antenna |
| Can I cancel and leave with my data? | Yes — own routes/waypoints/logbook remain exportable | Yes — configuration export; device ownership transfer | Yes — no data lock-in; local history is device-local |

## 7. Decisions taken in this document (recorded in `DECISION-LOG.md` as D-007)

1. **Two editions per product, no third tier.** A third tier would require a distinct customer, a distinct cost
   base and distinct data rights; none exists at MC-05.
2. **Edition boundaries are functional, not cosmetic:** NAV splits planning from connected navigation; HUB
   splits a defined envelope from a wider validated envelope plus installer tooling; AIS splits reception from
   managed local integration with diagnostics.
3. **AIS reception, NAV traffic display and HUB AIS integration are never edition-gated**, because the
   hardware or the data entitlement is already a separate purchase; gating them would double-charge.
4. **Safety-of-understanding features stay in the base edition** (degraded-state honesty, accessibility,
   updates, export, configuration recovery, ownership transfer, local-first offline operation).
5. **Compatibility is never an edition feature**: it is a published, evidence-backed matrix that applies to all
   editions. Pro sells *more validated coverage*, never "compatibility" as a vague promise.
6. **Prices in this document are hypotheses only** and are not approved, costed or publishable.
7. **The mandatory lifecycle revision** (Master Prompt proposed states mapped onto the binding portfolio
   lifecycle plus a terminal `RETIRED` state) is adopted as the single lifecycle vocabulary for MC-05 onwards.

## 8. Open edition questions (explicitly unresolved)

| # | Question | Why it is open | Owner |
| --- | --- | --- | --- |
| E-01 | Exact chart regions and licence terms per edition | No chart/ENC distributor agreement (`D-01`–`D-03`, `DEC-02`) | Product + counsel |
| E-02 | Whether Essential includes any offline region at all | Depends on offline storage rights (`D-03`) | Product + counsel |
| E-03 | Exact validated connection families and capacity per HUB edition | No tested protocol matrix, no frozen hardware (`H-04`, `H-05`, `H-07`) | Hardware + engineering |
| E-04 | Whether the AIS final design is dual-channel | Hardware design not validated (`H-08`) | Hardware |
| E-05 | Exact local data retention windows per HUB edition | Depends on storage design and support policy | Engineering + support |
| E-06 | Trial length, trial data scope and end-of-trial export behaviour for NAV | Depends on chart licensing terms and cost per active user (`D-01`) | Product + finance |
| E-07 | Whether MAREA WEATHER is bundled into NAV Pro or always separately entitled | Depends on provider terms and bundle governance (`D-04`, MC-08) | Product + finance |
| E-08 | Whether any price hypothesis survives bottom-up costing | No BOM, no quotes, no channel terms (`X-05`) | Finance + procurement |

None of these questions changes the edition *structure*; each changes the *contents or the price* of an edition
and must be closed before a product page is published.

---

## 9. Status statement

This document defines editions for products that are **completely specified and not for sale**. It does not
approve a price, does not create a purchasable SKU, does not certify anything, and does not assert that any
capability above is implemented. The honest engineering position remains: MAREA NAV, MAREA HUB and MAREA AIS
are `DEFINED`; engineering readiness is evidence-based and partial; chart, weather, protocol and RF rights are
not cleared; brand clearance is `NOT_GRANTED`.

Related documents: `MAREA-NAV-COMMERCIAL-SPEC.md`, `MAREA-HUB-COMMERCIAL-SPEC.md`,
`MAREA-AIS-COMMERCIAL-SPEC.md`, `PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md`,
`PRODUCT-PRICING-AND-CHANNEL-MODEL.md`, `CUSTOMER-JOURNEYS-NAV-HUB-AIS.md`, `docs/marea/products/README.md`.
