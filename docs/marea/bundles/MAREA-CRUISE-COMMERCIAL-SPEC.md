# MAREA CRUISE — Commercial bundle specification

| Field | Value |
| --- | --- |
| Document ID | MC-08 / D3 — MAREA CRUISE bundle specification |
| Milestone | MC-08 (08/36) — bundles and commercial architecture |
| Deliverable | D3 — complete commercial definition of the MAREA CRUISE bundle |
| Owner | Recreational Navigation Solution Architect |
| Status | INTERNAL / NOT PUBLISHED / NOT FOR SALE / BUNDLE DEFINITION ONLY |
| Base commit | `80c66c70a1bab6f11c5ba5709baa4c1671f1d6da` (MC-07 HEAD) |
| Branch | `feature/marea-mc08-bundles-commercial-architecture` |
| Date | 2026-10-30 |
| Write scope | `docs/marea/bundles/MAREA-CRUISE-COMMERCIAL-SPEC.md` only (this document) |
| Is not | Not a quotation, not an orderable SKU, not a compatibility certification, not a price approval, not a product family |
| Bundle id | `CRUISE` — MAREA CRUISE |
| Historical price hypothesis | EUR 1,399 — `HYPOTHESIS_UNAPPROVED` (never approved, never final, never a launch price, never purchasable) |

## 0. Scope and status statement

MAREA CRUISE (`CRUISE`) is a **bundle definition**: a fixed internal reference configuration, its rules, its
dependencies, its exclusions and the evidence that would be required before it could ever be quoted, published
or sold. A bundle definition is **not an installed system**, not an approved quotation, not an orderable SKU and
not a legally authorised offer. Nothing in this document creates a purchasable article, a price, a delivery
commitment, a certification, an availability date or a compatibility result.

The reference configuration fixed by this document is **MAREA NAV Essential (`NAV-ESSENTIAL`) + MAREA HUB
Standard (`HUB-STANDARD`) + MAREA AIS Receiver (`AIS-RECEIVER`) + MAREA DISPLAY 7 (`DISPLAY-7`)**. `NAV-PRO` is
an optional upgrade, never the reference and never automatically required. `AIS-CONNECTED` is `CONDITIONAL /
NOT_YET_JUSTIFIED` and **must not be selected**. `DISPLAY-LARGE-CONDITIONAL` is `NOT_ESTABLISHED` and **never
selectable as a size**. The historical figure of EUR 1,399 remains a `HYPOTHESIS_UNAPPROVED` bundle-price
hypothesis; §B19 records why it can only describe an uninstalled, product-only, first-year starting figure and
must never be presented as an installed-system price.

All products referenced here are `DEFINED`, `NOT_FOR_SALE`, `PUBLICATION_STATE = INTERNAL_ONLY`,
`BRAND_CLEARANCE = NOT_GRANTED`, `SOURCE_IP_CLEARANCE = NOT_CLEARED`, `PRICING = HYPOTHESIS_UNAPPROVED`;
none holds a certification, a bill of materials, a supplier quotation, a device test, a chart distribution
right or an approved compatibility row. **0 compatibility rows are `TESTED`.**

---

## 1. Canonical reference configuration

### 1.1 Composition table

Inclusion classes are exactly: `INCLUDED` / `REQUIRED_EXTERNAL` / `OPTIONAL` / `CONDITIONAL` / `NOT_INCLUDED` /
`INELIGIBLE` / `QUOTATION_REQUIRED`. Quantity `1` refers to one unit in the reference configuration. All price
figures are internal hypotheses, `VAT`-inclusive consumer retail where stated, and none is approved.

| Line | Family | Edition | Qty | Role | Inclusion class | Dependencies | Subscriptions | Compatibility status / source row | Evidence | Price status | Cost status | Installation | Release blockers |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C-01 | HUB | `HUB-STANDARD` | 1 | Base component — local vessel data gateway that publishes the local vessel interface and can consume receive-only AIS output | `INCLUDED` | Installation assessment; vessel power; cabling/adapters; at least one compatible source | None | `B-07` `UNKNOWN — NOT_TESTED`; `B-08` `UNKNOWN — NOT_TESTED`; `B-03` `UNKNOWN — NOT_TESTED` | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §3; `OPEN` — no hardware, BOM or device test | `HYPOTHESIS_UNAPPROVED` EUR 349 (VAT-inclusive hypothesis) | `NOT_ESTABLISHED` — no BOM, no supplier quote | Installer assessment and professional installation route; no measured duration or price | `H-04`, `H-05`, `H-07`, `P-02`, `X-05` |
| C-02 | NAV | `NAV-ESSENTIAL` | 1 | Base component — navigation application; **already includes AIS target list/detail (`N11`) and licensed basic chart display** | `INCLUDED` | Customer device; licensed chart entitlement; AIS targets from a compatible receiver (`A-04`) for the traffic surface | NAV Essential annual subscription | `A-04` `UNKNOWN — NOT_TESTED`; `A-01` `UNKNOWN — NOT_TESTED` | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N04` `INCLUDED_LICENSED`, `N11` `INCLUDED` in both editions); `OPEN` — not built or tested | `HYPOTHESIS_UNAPPROVED` EUR 99 / year (VAT-inclusive hypothesis) | `NOT_ESTABLISHED` — data licensing per active user not costed | App install on the customer device; no fixed installation | `D-01`–`D-06`, `D-08`, `D-10`, `P-01`, `P-03`, `P-10` |
| C-03 | AIS | `AIS-RECEIVER` | 1 | Base component — receive-only AIS receiver and traffic source; never transmits | `INCLUDED` | AIS VHF antenna (and optional splitter); power/cabling; installer assessment; consumer input selection | None | `C-01` `BLOCKED — H-08/H-05`; `C-02` `UNKNOWN — NOT_TESTED`; `B-07` `UNKNOWN — NOT_TESTED` | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §4; `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §4.3; `BLOCKED` — no receiver hardware, no RF evidence | `HYPOTHESIS_UNAPPROVED` EUR 249 (VAT-inclusive hypothesis) | `NOT_ESTABLISHED` — no BOM, no RF/conformity quote | AIS/DISPLAY professional installation route; antenna/splitter work by an installer | `H-08`, `H-05`, `H-06`, `P-03`, `S-01`, `D-09` |
| C-04 | DISPLAY | `DISPLAY-7` | 1 | Base component — dedicated helm display presenting navigation, instruments, received AIS and licensed layers; includes base software only | `INCLUDED` | Mounting/power/cabling; interface contract to NAV (`N-02`); compatible HUB (`N-01`) and receiver (`N-03`); licensed chart layer | None on the DISPLAY side; NAV subscription required for NAV features | `N-02` `PLANNED` (NAV subscription required; never included in DISPLAY); `N-01` `CONDITIONAL`; `N-03` `CONDITIONAL` | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`; `VERIFIED_REPO docs/marea/products/MAREA-DISPLAY-COMMERCIAL-SPEC.md` §5.2–§5.3, §6; `OPEN` — no DISPLAY hardware, no interface contract | `HYPOTHESIS_UNAPPROVED` from EUR 699 starting hypothesis, `SIZE_NOT_FROZEN`, installation separately quoted | `NOT_ESTABLISHED` — no BOM, no supplier quote | Professional installation; mount, power and harness required; quoted separately | `H-05`, `H-11`, `P-07`, `X-05` |
| C-05 | NAV | `NAV-PRO` | — (upgrade only) | Optional upgrade substitution for C-02: live onboard instruments, multi-device access, CPA/TCPA and AIS alerts, offline regions, route insights; **never automatically required** | `OPTIONAL` | As C-02 plus a tested instrument data path (`A-02`/`A-03`); own-vessel data for CPA/TCPA (`A-05`) | NAV Pro annual subscription | `A-02` `UNKNOWN — NOT_TESTED`; `A-05` `UNKNOWN — NOT_TESTED`; `A-03` `UNKNOWN — NOT_TESTED` | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N10`, `N12`, `N13`, `N17`–`N19` `NOT_INCLUDED` in Essential); `OPEN` | `HYPOTHESIS_UNAPPROVED` EUR 149 / year (VAT-inclusive hypothesis) | `NOT_ESTABLISHED` | App install; no fixed installation | `D-01`–`D-06`, `P-01`, `P-02`, `P-10` |
| C-06 | AIS | `AIS-CONNECTED` | 0 | Conditional edition — `CONDITIONAL / NOT_YET_JUSTIFIED`; **not selected by default and must not be selected in CRUISE** | `CONDITIONAL` | Would require frozen hardware evidencing richer local networking and diagnostics; none exists | Would be a separate edition decision | Not part of CRUISE; `C-03`/`C-04` `UNKNOWN — NOT_TESTED` | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §1.3, §4.1 (verdict `CONDITIONAL / NOT_YET_JUSTIFIED`); `BLOCKED` — `H-08` | `HYPOTHESIS_UNAPPROVED` EUR 399 only if the edition ever exists; not a CRUISE price | `NOT_ESTABLISHED` | — | `H-08`, `P-02`, `P-03` |
| C-07 | DISPLAY | `DISPLAY-LARGE-CONDITIONAL` | 0 | Conditional display family — `NOT_ESTABLISHED`, never selectable as a size | `INELIGIBLE` | Hardware selection, tooling, sunlight validation, thermal design and costed BOM would be required | — | Not part of CRUISE; `N-02`/`N-01`/`N-03` conditional on the same interface work | `VERIFIED_REPO docs/marea/products/README.md` §27 (`D-012`); `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`; `OPEN`/`BLOCKED` | `NOT_ESTABLISHED` — no price | `NOT_ESTABLISHED` | — | `H-05`, `H-11`, `X-05` |
| C-08 | WEATHER | `WEATHER-STANDARD` | — (optional only) | Optional licensed forecast/data subscription on the same account; never double-billed | `OPTIONAL` | Provider rights; entitlement service (not implemented) | WEATHER Standard annual subscription | No CRUISE integration row; provider rights `NOT_GRANTED` (`D-04`, `D-05`, `D-07`) | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`; `BLOCKED` — provider rights | `HYPOTHESIS_UNAPPROVED` from EUR 49 / year (VAT basis `OPEN`) | `NOT_ESTABLISHED` — no provider quote | None | `D-04`, `D-05`, `D-07`, `D-10` |
| C-09 | WEATHER | `WEATHER-PRO` | — (optional only) | Optional premium licensed forecast/data subscription; conditional on provider entitlements | `OPTIONAL` | As C-08 | WEATHER Pro annual subscription | As C-08 | `VERIFIED_REPO` batch-03 price table; `BLOCKED` — provider rights | `HYPOTHESIS_UNAPPROVED` EUR 89 / year (VAT basis `OPEN`) | `NOT_ESTABLISHED` | None | `D-04`, `D-05`, `D-07`, `D-10` |
| C-10 | Accessory | VHF splitter | — | Optional accessory for the AIS/VHF antenna chain | `OPTIONAL` | Antenna arrangement; installer assessment; exact items `OPEN` | None | Accessory class; no item is approved | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §4 (`A15` `OPTIONAL`); `OPEN` | `OPEN` — not priced | `NOT_ESTABLISHED` | Installed by an installer where required | `H-08`, `X-05` |
| C-11 | Accessory | Extra mounts and installation accessories beyond the documented set | — | Optional mounting items for a second station or a different surface | `OPTIONAL` | Installation assessment; no mount is approved or certified | None | Accessory class; no item is approved | `VERIFIED_REPO docs/marea/products/MAREA-DISPLAY-COMMERCIAL-SPEC.md` F07/F08; `OPEN` | `OPEN` — not priced | `NOT_ESTABLISHED` | Quoted with the installation | `H-11`, `X-05` |
| C-12 | Service | Professional installation and commissioning (AIS, DISPLAY, HUB) | — | Installation assessment, antenna/splitter work, mounting, power, configuration, commissioning and handover | `QUOTATION_REQUIRED` | Vessel survey; installer network; measured time; RF/antenna installation competence | None | Not a compatibility row | `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §7; `BLOCKED` — no installer network or measured install (`X-05`, `X-06`) | `NOT_ESTABLISHED` — quoted per vessel after assessment | `NOT_ESTABLISHED` | Always quoted separately; never included in the bundle hypothesis | `X-05`, `X-06` |
| C-13 | External | AIS VHF antenna | — | Required external item for AIS reception; antenna/splitter chain is a separate purchase | `REQUIRED_EXTERNAL` | Installation; mounting; cabling; survey | None | `C-01` `BLOCKED — H-08/H-05`; reception depends on the installation | `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §4.3 (`C-01`) and §6.3 | `OPEN` — not priced | `NOT_ESTABLISHED` | Installed by an installer where required | `H-08`, `H-05`, `X-05` |
| C-14 | External | Mounting, power and cabling items for HUB/AIS/DISPLAY | — | Required external physical items for the surveyed installation | `REQUIRED_EXTERNAL` | Surveyed installation; exact items `OPEN` | None | Adapter class `OPEN`; no item is approved | `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §7.2; `OPEN` | `OPEN` — not priced | `NOT_ESTABLISHED` | Included only in an installation quotation, itemised | `H-05`, `H-11`, `X-05` |
| C-15 | External | GNSS source (customer device, or a compatible HUB/GNSS receiver) | — | Own-position and own-course/speed source; required for position and for any CPA/TCPA computation | `REQUIRED_EXTERNAL` | Device GNSS (`A-01`) or a compatible external receiver | Customer's existing device/service | `A-01` `UNKNOWN — NOT_TESTED`; `B-02`/`B-04` `UNKNOWN — NOT_TESTED` | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N03`); `OPEN` | `NOT_APPLICABLE` — not sold | `NOT_ESTABLISHED` | None | `P-01`, `P-10` |
| C-16 | Data entitlement | Licensed chart entitlement within the purchased region | — | Licensed chart data right for the area sailed; required for chart display and navigation | `REQUIRED_EXTERNAL` | Signed chart distribution or per-region licence; territory | Periodic data licence terms `OPEN` | Not a compatibility row; `BLOCKED` — `D-01`/`D-02`/`D-03` | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N04` `INCLUDED_LICENSED`); `BLOCKED` | `OPEN` — no chart-licence price | `NOT_ESTABLISHED` | None | `D-01`, `D-02`, `D-03`, `DEC-02` |
| C-17 | Interface | NMEA 2000 | 0 | Not implemented, not licensed, not certified, not offered | `NOT_INCLUDED` | — | — | `B-09` `BLOCKED — H-04/DEC-05` | `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §4.2; `BLOCKED` | `NOT_APPLICABLE` | `NOT_ESTABLISHED` | — | `H-04`, `DEC-05` |
| C-18 | PILOT | — | 0 | Supervised steering system — never part of CRUISE; no control path from any component | `NOT_INCLUDED` | — | — | Not a CRUISE row | `VERIFIED_REPO docs/marea/products/README.md` §16 rule 1 | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | — | `H-01`, `P-04` |
| C-19 | SENSE | — | 0 | Sensor modules — separate family, not a CRUISE component | `NOT_INCLUDED` | — | — | Not a CRUISE row | `VERIFIED_REPO docs/marea/products/README.md` §2 | `HYPOTHESIS_UNAPPROVED` (module hypotheses only) | `NOT_ESTABLISHED` | — | `P-05` |
| C-20 | WATCH | — | 0 | Remote monitoring service — separate family, not a CRUISE component | `NOT_INCLUDED` | — | — | Not a CRUISE row | `VERIFIED_REPO docs/marea/products/README.md` §2 | `HYPOTHESIS_UNAPPROVED` (WATCH hypotheses only) | `NOT_ESTABLISHED` | — | `P-06` |
| C-21 | FLEET | — | 0 | Multi-vessel SaaS — separate family, not a CRUISE component | `NOT_INCLUDED` | — | — | Not a CRUISE row | `VERIFIED_REPO docs/marea/products/README.md` §2 | `HYPOTHESIS_UNAPPROVED` (FLEET hypotheses only) | `NOT_ESTABLISHED` | — | `P-09`, `X-07` |
| C-22 | Standard | ECDIS / official-chart-system status | 0 | Never offered under any edition or name | `NOT_INCLUDED` | — | — | `N25` `NOT_INCLUDED` (NAV) | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N25`) | `NOT_APPLICABLE` | `NOT_ESTABLISHED` | — | `D-01` |
| C-23 | Capability | AIS transmission, transponder, own-position broadcast or DSC | 0 | Never offered: AIS is receive-only | `NOT_INCLUDED` | — | — | `A12` `NOT_INCLUDED` | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §4 (`A12`); `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9 | `NOT_APPLICABLE` | `NOT_ESTABLISHED` | — | `H-08` |

### 1.2 Reading of the reference configuration

- **One navigation subscription, one local data layer, one receiver, one fixed screen.** `NAV-ESSENTIAL` is the
  planning-and-passage edition and already includes the receive-only AIS target list/detail (`N11`) and licensed
  basic chart display (`N04`); it does not include live instrument overlays, CPA/TCPA, AIS alerts, offline regions
  or multi-device access — those are `NAV-PRO` upgrades. The HUB publishes the local vessel interface; the AIS
  Receiver supplies receive-only targets; the DISPLAY is the fixed presentation surface at the helm.
- **`NAV-PRO` is optional and never automatic.** A customer who wants live instruments, CPA/TCPA, AIS alert
  rules, offline regions, route insights or multi-device continuity chooses the upgrade; the reference
  configuration must not silently price or assume it.
- **AIS is receive-only.** The receiver never transmits the vessel's position, is not a transponder, is not a
  collision-avoidance system and does not replace watchkeeping. Detection of every vessel is never guaranteed;
  reception depends on antenna, cabling, power, installation and whether the other vessel transmits.
- **DISPLAY never includes NAV or charts.** `N-02` is `PLANNED`: navigation presentation on the device is
  intended, requires a NAV subscription for NAV features, and no interface contract is implemented. `DISPLAY-7`
  base software presents; it does not license charts, NAV, WEATHER, HUB or AIS.
- **The bundle is not an installed system.** Antenna, splitter, mounts, cabling, power items, installation
  labour, commissioning and the licensed chart region are external objects with their own price status (`OPEN` or
  `NOT_ESTABLISHED`). The historical EUR 1,399 hypothesis covers none of them (§B19).
- **Line numbering.** The `C-xx` numbers above are local to this specification and enumerate the same objects as
  the canonical line-item register in `docs/marea/bundles/BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` (D8, lines
  `CR-01`–`CR-10`) plus the explicit exclusion rows; where the two differ in presentation, the canonical
  composition register governs the line register and this document governs the bundle truth constraints.

---

## 2. Mandatory configuration rules

1. The reference configuration is fixed: exactly one `NAV-ESSENTIAL`, one `HUB-STANDARD`, one `AIS-RECEIVER` and
   one `DISPLAY-7`. No fifth component is part of the reference configuration.
2. `NAV-ESSENTIAL` already includes the receive-only AIS target list/detail (`N11`) and licensed basic chart
   display; the bundle must not present AIS target presence or basic charts as reasons to upgrade.
3. `NAV-PRO` is an optional upgrade (live instruments, CPA/TCPA, AIS alerts, offline regions, route insights,
   multi-device), never the reference configuration and never automatically required. A CRUISE configuration
   must not be described or priced as if Pro were included.
4. `AIS-CONNECTED` is `CONDITIONAL / NOT_YET_JUSTIFIED` and must not be selected in any CRUISE configuration. It
   is not an upgrade option, a size option or a substitute for `AIS-RECEIVER` while the condition is open.
5. `DISPLAY-LARGE-CONDITIONAL` is `NOT_ESTABLISHED` and never selectable as a size; no other display size,
   generation or performance variant is offered by CRUISE.
6. DISPLAY base software is presentation only: it never includes MAREA NAV, charts, WEATHER, HUB or AIS receiver
   hardware. `N-02` is `PLANNED` and requires a NAV subscription for NAV features.
7. AIS reception requires an external VHF antenna chain and installation; the receiver, antenna and splitter
   are separate purchases and none of them is free or included in another product.
8. The HUB is not required by NAV standalone; in CRUISE it publishes local vessel data and may consume the
   receiver's receive-only output (`B-07` untested). Buying the HUB never includes a NAV subscription.
9. A GNSS source is required: the customer's device or a compatible HUB/GNSS receiver. No GNSS hardware is
   included in the bundle, and missing own-vessel data produces `NOT_AVAILABLE`, never a computed estimate.
10. A licensed chart region is a required external data right. Unrestricted, global or guaranteed chart coverage
    is never promised; charts are never product features.
11. Installation for AIS and DISPLAY (antenna/splitter, mounting, power, commissioning) is quoted per vessel; no
    labour, mounts, antennas or cabling are included in the bundle hypothesis.
12. Compatibility must come from a published matrix row that has been tested and reviewed. Today **0 rows are
    `TESTED`**, so no CRUISE configuration is eligible for sale and no compatibility claim may be made.
13. No CRUISE component introduces a steering, autopilot, actuator or remote-helm control path. PILOT is
    excluded; a DISPLAY may present read-only PILOT status at most, and no such interface exists.
14. No NMEA 2000 certification or operational compatibility claim is made. NAV is a navigational aid, not ECDIS;
    WATCH, SENSE and FLEET are not CRUISE components; the price hypothesis is never an offer; publication is
    blocked.

---

## 3. Compatibility and eligibility criteria

### 3.1 Compatibility criteria (bundle level)

- Compatibility is assessed **per device, per firmware/software version, per data path and per direction**. A
  protocol name, a connector, a brand or a sibling product never creates compatibility
  (`PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §1.2, §3; `PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` §1.2).
- The published matrix is the only surface authorised to state that a configuration is supported. A row is
  either `TESTED`/`SUPPORTED` with a recorded configuration or it forbids a positive claim. **The batch-01
  register has 0 `TESTED` rows of 21; the batch-03 register has 0 `SUPPORTED` rows of 21.**
- The rows relevant to CRUISE are:

| Row | Intended feature for CRUISE | Status | What closes it |
| --- | --- | --- | --- |
| `N-02` | DISPLAY ← NAV: navigation presentation on the device | `PLANNED` | Interface contract, implemented build, recorded end-to-end presentation test; NAV subscription required; DISPLAY never includes NAV |
| `N-01` | DISPLAY ← HUB: onboard data and instrument presentation | `CONDITIONAL` | Tested model/firmware/direction matrix and a recorded integration test; HUB hardware/protocol freeze (`H-04`, `P-07`, `P-02`) |
| `N-03` | DISPLAY ← AIS: received traffic presentation | `CONDITIONAL` | Tested receiver model/firmware and a recorded target-presentation test; AIS data-rights decision (`H-08`, `P-03`, `D-09`) |
| `A-04` | NAV ← receive-only AIS targets (target list and detail in both editions) | `UNKNOWN — NOT_TESTED` | Receiver hardware and a recorded target capture; NAV integration test per version (`P-03`, `C-01`, `C-02`) |
| `C-01` | AIS receiver hears VHF AIS broadcasts through an installed antenna or splitter | `BLOCKED — H-08/H-05` | Receiver hardware, RF/EMC tests, antenna/splitter specification and a built unit |
| `C-02` | AIS receiver supplies received targets to a compatible consumer using `!AIVDM` sentences | `UNKNOWN — NOT_TESTED` | Built receiver output and an integration test; decoder distribution decision (`S-01`) |
| `B-07` | HUB consumes receive-only AIS output from a compatible receiver | `UNKNOWN — NOT_TESTED` | Receiver output to test and a recorded HUB intake test (`H-08`, `P-03`) |
| `B-08` | HUB publishes the documented local vessel data interface | `UNKNOWN — NOT_TESTED` | Architecture/contract test and a HUB hardware/protocol freeze (`P-02`) |
| `B-03` | HUB consumes Signal K streams from a supported on-board source | `UNKNOWN — NOT_TESTED` | Per-source/per-path/per-direction test records and a local trust model (`E-21`, `S-06`) |
| `A-05` | NAV Pro computes CPA/TCPA where own-vessel and target data are valid | `UNKNOWN — NOT_TESTED` (optional upgrade only) | `calculateCpa` unit test and an integration test; not part of reference configuration |

### 3.2 Eligibility criteria

A CRUISE configuration may be considered only when **all** of the following are recorded: the vessel inventory
(type, size, make, year, territory); the helm mounting and power arrangement; the AIS antenna/splitter
arrangement and its installation feasibility; the existing navigation application or plotter; the GNSS source;
the customer device and operating-system version; the chart region required; the autopilot presence (to confirm
the steering exclusion); and the installation route. Each item is matched against the published matrix, never
inferred. While 0 rows are `TESTED`, no deterministic self-install outcome can be returned and no configuration
is eligible; every enquiry resolves to a specialist survey, a refusal or an information request.

---

## 4. Installation and commissioning

- **Routes.** Self-install is permitted only where a validated deterministic rule confirms a documented low-risk
  configuration; no such rule exists today. CRUISE is intended for professional installation or installer-only
  retrofit, with specialist assessment for mixed or older equipment (`PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md`
  §7.1).
- **Scope of work.** The surveyed installation covers: HUB mounting and power; AIS antenna or splitter
  installation and the VHF chain; DISPLAY mounting, power, harness and network connection; configuration of the
  local interface; selection of the AIS input in NAV and the DISPLAY interface; chart coverage confirmation; and
  commissioning checks for position, fresh data, stale/lost target states and honest unavailable states.
- **Pre-quote assessment.** The installer records the vessel and equipment inventory, network families, AIS and
  antenna arrangement, autopilot presence, power, mounting locations, owner expectations and photographs or
  inventory documents, then matches each item against the published matrix (`PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md`
  §7.2). Nothing is assumed from a connector or a brand.
- **Handover.** The installation record (configuration, sources found, unsupported items, checks, versions); the
  separate product ownership and editions; the verbatim disclaimers of each delivered product, including the AIS
  receive-only disclaimer at every traffic surface; the support and warranty route; the export path for the
  customer's own records and configuration; and the update-policy status
  (`PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §7.4).
- **No duration, price, stock or lead time is stated or implied.** Installation is quoted per vessel after
  assessment; there is no installer network, agreement or measured installation (blockers `X-05`, `X-06`).

---

## 5. Entitlements

| Entitlement | Included in CRUISE? | Term | Rule |
| --- | --- | --- | --- |
| MAREA NAV Essential application entitlement | Yes, as one separate subscription | Annual, renewing (`HYPOTHESIS_UNAPPROVED` price) | Navigation, route planning, logbook, licensed chart display within entitlement, basic AIS target list/detail with a compatible receiver; export of the customer's own records; no perpetual licence |
| MAREA HUB Standard appliance and included base software | Yes, as one separate purchase | Perpetual use inside the published update/support window | Local data gateway, local dashboard, diagnostics, configuration backup; no NAV licence; no subscription |
| MAREA AIS Receiver | Yes, as one separate hardware purchase | Perpetual use of the article inside the warranty/update window | Receive-only reception and documented local output; no subscription; no AIS transmission; no retention/redistribution right (`D-09`) |
| MAREA DISPLAY 7 and its included base software | Yes, as one separate hardware purchase | Perpetual use inside the published update/support window | Presentation of navigation, instruments, received AIS and licensed layers, local dashboards, configuration, backup, diagnostics, updates during warranty; base software is not a NAV licence and never includes charts |
| Licensed chart entitlement | No — required external data right | Per licence/region/period | Coverage and terms defined by the provider; never ownership; never guaranteed or unlimited |
| Optional NAV Pro upgrade | No — optional substitution | Annual subscription difference | Adds live instruments, CPA/TCPA, AIS alerts, offline regions, route insights, multi-device; never automatically required |
| Optional WEATHER subscription | No — separate licensed service | Annual, if contracted | One entitlement ledger; never billed twice with a NAV entitlement (`D-013`) |
| AIS, PILOT, SENSE, WATCH, FLEET entitlements | No | — | Never included; each is a separate product with its own readiness |

Subscription isolation and data rules: no commercial entitlement may disable local HUB or DISPLAY functions,
local alarms or any safety-relevant independent function when payment fails (`README.md` §16 rule 7); AIS-derived
data are used locally for own-vessel situational awareness only and are never retained, redistributed, resold or
shared beyond the receiving vessel without a written rights decision (`D-09`, `MD-24`); a lapsed chart or weather
entitlement shows an honest unavailable state, never a fabricated or frozen layer presented as current.

---

## 6. Release readiness and blockers

| Readiness dimension | Value at MC-08 | Meaning |
| --- | --- | --- |
| `definition` | `COMPLETE_TARGET_SPECIFICATION` | The bundle is fully defined, not built |
| `engineering` | `NOT_VERIFIED` | No end-to-end CRUISE integration exists; 0 tested compatibility rows |
| `licensing` | `NOT_CLEARED` | NAV/WEATHER entitlement services and chart rights do not exist |
| `hardware` | `NOT_SELECTED` (HUB, AIS, DISPLAY) | No hardware, BOM, RF/EMC or supplier quote |
| `dataRights` | `NOT_GRANTED` | No chart, weather or AIS-derived data right |
| `compliance` | `NOT_STARTED` | No CE/RED/LVD/EMC/GPSR/CRA/RF evidence |
| `pricing` | `HYPOTHESIS_UNAPPROVED` | EUR 1,399 is a historical hypothesis, not approved |
| `brandPublication` | `NOT_GRANTED` | MAREA is a proposed brand; copy is internal |
| `availability` | `NOT_FOR_SALE` | Nothing can be ordered |

**Blockers that gate any CRUISE release:** `H-02` (control-plane exclusion), `H-04` (no NMEA 2000), `H-05`/`H-07`
(no HUB hardware/BOM/quotes), `H-06` (no conformity evidence), `H-08` (no AIS receiver hardware/RF evidence),
`H-11`/`P-07` (no DISPLAY hardware, platform or interface), `H-13` (no secure update/CRA lifecycle), `P-01`,
`P-02`, `P-03`, `P-10` (no product verification; TypeScript suites unexecuted), `S-01` (AIS decoder
distribution decision), `S-06` (Signal K runtime/notices), `D-01`–`D-06`, `D-08`, `D-09`, `D-10` (no chart,
weather, tide, current or AIS-derived data rights), `X-01`/`X-02` (company and seller legal identity), `X-05`
(no costed BOM or channel terms), `X-06` (no installer network or measured installation). **No blocker is closed
by this document.**

---

## 7. Configuration outcomes

The only permitted outcomes are these exact tokens. `ORDERABLE`, `FOR_SALE`, `APPROVED` and `PUBLISHABLE` are
never valid outcomes for this bundle.

| Outcome | Meaning | When it applies to CRUISE today |
| --- | --- | --- |
| `CONFIGURATION_DEFINED_INTERNAL` | The reference configuration is fully specified internally and no product is orderable | Default state of this document |
| `COMPATIBILITY_EVIDENCE_REQUIRED` | An intended integration must be tested per device/firmware/direction before any eligibility statement | Applies to `N-01`, `N-02`, `N-03`, `A-04`, `B-07`, `B-08`, `B-03`, `C-02` and optionally `A-05` |
| `SPECIALIST_SURVEY_REQUIRED` | The vessel configuration needs an installer survey before compatibility or quotation; AIS antenna/splitter work usually requires it | Applies to every real CRUISE enquiry while 0 rows are `TESTED` |
| `QUOTATION_REQUIRED` | Installation, commissioning, antenna/splitter, mounts, cabling and power items are quoted per vessel | Applies to professional installation and every external physical item |
| `NOT_ELIGIBLE` | A requested component, edition or integration is excluded by design or not selectable | `AIS-CONNECTED`, `DISPLAY-LARGE-CONDITIONAL`, PILOT, SENSE, WATCH, FLEET, NMEA 2000, ECDIS, AIS transmission/DSC, steering/autopilot integration |
| `PUBLICATION_BLOCKED` | Price, brand, claims, imagery or a purchase path are not cleared | Applies to any external use of this bundle definition and to both copy drafts |

---

## 8. Customer journeys, bilingual copy and assets

- **Customer journeys.** The discovery-to-end-of-life journeys for this bundle are defined in the MC-08
  companion deliverable `docs/marea/bundles/BUNDLE-CUSTOMER-JOURNEYS.md`; this specification fixes the
  configuration and the truth constraints those journeys must obey. The journey stages follow the 17-stage
  vocabulary of `docs/marea/products/README.md` §22 and §29.
- **ES/EN copy.** Draft internal copy is `docs/marea/bundles/copy/cruise.es.md` (Spain Spanish) and
  `docs/marea/bundles/copy/cruise.en.md` (natural international English). Both carry the 24 required sections,
  the approved navigation disclaimer verbatim and the AIS receive-only disclaimer verbatim, and are internal
  drafts that are not published.
- **Assets.** The CRUISE bundle asset requirements are defined in
  `docs/marea/bundles/BUNDLE-ASSET-REQUIREMENTS.md` (MC-08 companion deliverable). No image generation is
  executed for this milestone, no asset is a real-product visual, and any rendered asset would remain `CONCEPT` —
  never evidence that a device exists. X-03 keeps scene imagery blocked.
- **Price and channel model.** The bundle-level price challenge and unit-economics framework are in
  `docs/marea/bundles/BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`; this specification's §B19 records the CRUISE-specific
  arithmetic and must agree with it.

---

## 9. End-to-end acceptance criteria (future evidence)

These are acceptance criteria for future evidence, **not claims** and not current capabilities. Each requires a
reviewable artefact before it can be marked satisfied; none is satisfied today.

| # | Criterion | Evidence that would satisfy it |
| --- | --- | --- |
| AC-CRUISE-01 | The reference configuration resolves to exactly one `NAV-ESSENTIAL`, one `HUB-STANDARD`, one `AIS-RECEIVER` and one `DISPLAY-7`, each as a canonical edition id | A machine-readable bundle contract plus a validator run over the canonical product contracts |
| AC-CRUISE-02 | `AIS-CONNECTED` and `DISPLAY-LARGE-CONDITIONAL` are structurally refused by any CRUISE configuration; no size or edition substitution exists | Validator mutation tests plus independent review of the configuration rules |
| AC-CRUISE-03 | The AIS receiver path is recorded as `TESTED` for a named receiver, firmware, antenna/splitter arrangement, direction and consumer, with a test record and an independent reviewer | Compatibility rows `C-01`/`C-02` promoted under the promotion procedure |
| AC-CRUISE-04 | A recorded end-to-end installation shows received targets presented in NAV and on the DISPLAY with target age, source and the receive-only disclaimer, and honest lost/stale states | Recorded installation test on at least two representative vessels |
| AC-CRUISE-05 | A recorded DISPLAY↔NAV presentation test exists (`N-02` promoted beyond `PLANNED`), showing that DISPLAY never provides a NAV licence or charts and that NAV features require a subscription | Interface-contract artefact plus recorded end-to-end test |
| AC-CRUISE-06 | A recorded DISPLAY↔HUB test (`N-01`) and DISPLAY↔AIS test (`N-03`) exist with their limitations and named conditions | Integration test records per model/firmware/direction |
| AC-CRUISE-07 | The built NAV Essential edition shows the AIS target list/detail and licensed basic chart display without requiring the Pro upgrade, and the Pro upgrade is never preselected or priced as included | Product acceptance test per edition plus pricing annex review |
| AC-CRUISE-08 | No steering, autopilot, actuator or remote-helm command path exists in NAV, HUB, AIS or DISPLAY | Independent security and integration review of the built products |
| AC-CRUISE-09 | Chart coverage is displayed only within a held licence, and an unlicensed or lapsed entitlement shows an honest unavailable state | Licensed-data acceptance test with negative cases |
| AC-CRUISE-10 | AIS-derived data remain local, with no retention/redistribution path, and the receive-only disclaimer appears wherever traffic is presented | Data-rights review (`D-09`, `MD-24`) plus copy/UI inspection |
| AC-CRUISE-11 | Installation is quoted per vessel after a survey with antenna/splitter, mounts and cabling itemised, and no duration or price is invented | Installer quotation template plus at least two assessed vessels |
| AC-CRUISE-12 | The historical EUR 1,399 hypothesis is reproduced only as a product-only uninstalled first-year figure, never as an installed-system price, and no unexplained discount is applied | Independent review of the pricing annex and every customer-facing reference |
| AC-CRUISE-13 | Both copy files contain 24 sections, the approved navigation and AIS disclaimers verbatim, no currency amount and no enabled purchase CTA | Automated copy checks plus an independent human read of ES and EN |
| AC-CRUISE-14 | No surface states or implies availability, certification, approval, stock, review, AIS transmission, collision avoidance or a compatibility guarantee for CRUISE | Independent claims review against `COMMERCIAL-BRAND-CLAIMS-POLICY.md` |

---

## 10. The 24 mandatory fields

Every field uses the five required bullet lines exactly: **Definition**, **Evidence**, **Owner**, **References**,
**Release readiness**. The Definition may describe intended final behaviour that is not built; when it does, the
Evidence line says so and names what would evidence it.

#### B01 — Identity
- **Definition.** MAREA CRUISE (bundle id `CRUISE`) is the coastal-cruising bundle definition of the MAREA programme: one MAREA NAV Essential (`NAV-ESSENTIAL`), one MAREA HUB Standard (`HUB-STANDARD`), one MAREA AIS Receiver (`AIS-RECEIVER`) and one MAREA DISPLAY 7 (`DISPLAY-7`), each a separate commercial object with its own readiness and licence, whose intended combined outcome is a coherent integrated cruising interface with licensed navigation information and received AIS targets. It is a `BUNDLE_DEFINITION`, not a product family, not a new edition, not an orderable SKU, not an installed system and not a quotation. The historical bundle figure EUR 1,399 is a `HYPOTHESIS_UNAPPROVED` commercial hypothesis and is not part of the identity of a sellable article.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` (Customer-facing bundle architecture row: MAREA CRUISE, "NAV + HUB + receive-only AIS + DISPLAY", EUR 1,399); `VERIFIED_REPO docs/marea/products/README.md` §2 (bundles are ecosystem context; contents and pricing governed by MC-08); `HYPOTHESIS` on any combined price; `OPEN` on the installed-system composition.
- **Owner.** Recreational Navigation Solution Architect.
- **References.** `COMMERCIAL-PORTFOLIO.md` bundle table; README §2, §8; `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §1.3; `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`; `DECISION-LOG.md` D-007, D-012; this document §1.1.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B02 — Commercial purpose
- **Definition.** CRUISE exists to give coastal cruisers a coherent integrated experience in one commercial step: a navigation subscription with licensed charts, a local vessel-data gateway, receive-only traffic awareness and a fixed helm display, instead of a collection of unrelated screens and apps. Its commercial role is the mid-tier bundle that combines navigation and traffic awareness and cross-sells the optional NAV Pro upgrade, WEATHER and a wider display family if one ever exists; its first geography follows the START refit-and-connect segment. It is not a commercial-shipping, ECDIS, safety-of-life, collision-avoidance or fleet-operations offer, and its purpose never includes AIS transmission, DSC or any steering, piloting or remote-control capability.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` (bundle table; first go-to-market hypothesis; AIS receive-only framing); `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2.1, §4.1; `ASSUMPTION` on segment priority and willingness to pay; `OPEN` — no customer research exists (`X-06`).
- **Owner.** Commercial strategy with product management.
- **References.** `COMMERCIAL-PORTFOLIO.md` bundle table; `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2.1, §4.1; README §2; `X-06`.
- **Release readiness.** `availability = NOT_FOR_SALE`

#### B03 — Ideal customer
- **Definition.** Primary customer: the owner of a recreational sailing or motor vessel of roughly 8–18 m who cruises the coast, keeps a fixed helm station or wants one, already uses a phone or tablet for planning, and wants navigation, onboard data and traffic awareness together without building a bespoke electronics suite. Secondary: the owner who has decided to add a fixed helm screen but does not want a closed chartplotter ecosystem, and who values an explicit licence and provenance story. Tertiary: a small charter or sailing-school operator standardising the same helm layout on a few vessels. Buying triggers: a helm with no readable dedicated screen; a tablet that is fragile, dim or hard to charge at the helm; an obsolete plotter; a new season of coastal cruising; a desire for traffic awareness without a transponder. Non-segment: anyone seeking ECDIS, certified bridge equipment, AIS transmission, collision avoidance, guaranteed detection, remote control or a single fixed "all-in" installed price.
- **Evidence.** `VERIFIED_REPO docs/marea/products/MAREA-DISPLAY-COMMERCIAL-SPEC.md` F02 (DISPLAY segments and buying triggers); `VERIFIED_REPO docs/marea/products/MAREA-NAV-COMMERCIAL-SPEC.md` F02; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2, §4; `ASSUMPTION` on segment priority; `OPEN` — no primary customer research (`X-06`).
- **Owner.** Product marketing and commercial development.
- **References.** `MAREA-DISPLAY-COMMERCIAL-SPEC.md` F02; `MAREA-NAV-COMMERCIAL-SPEC.md` F02; `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2, §4; `X-06`.
- **Release readiness.** `availability = NOT_FOR_SALE`

#### B04 — Vessel or organization applicability
- **Definition.** Applicable to a recreational sailing or motor vessel that (a) has a helm station or navigation station able to take a fixed display and a HUB with documented power and mounting arrangements, (b) can accommodate an AIS VHF antenna and, if needed, a splitter, with the assessed installation route, (c) has a customer device able to run the supported application version, and (d) can provide a GNSS source (the device or a compatible receiver/HUB). Vessel voltage, consumption, ingress, antenna height and cable runs are `OPEN` and must be confirmed by the installer survey. Not applicable: commercial shipping, ECDIS requirements, NMEA 2000-only architectures, any AIS transmission requirement, any vessel requiring steering or autopilot integration, and any organisation seeking multi-vessel management (MAREA FLEET is separate). An organisation applies only as one CRUISE configuration per vessel; there is no organisation entitlement in CRUISE.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §7.2 (installer questionnaire); `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` §2.1 (`N-01`–`N-03`) and §10; `ASSUMPTION` on vessel-size band; `OPEN` — no measurement or survey evidence; `BLOCKED` — HUB/AIS/DISPLAY hardware not selected (`H-05`, `H-08`, `H-11`, `P-07`).
- **Owner.** Product management with the integration owner and service operations.
- **References.** D5 §7.1–§7.2; batch-03 compatibility §2.1, §10; `H-05`, `H-08`, `H-11`, `P-07`, `X-06`.
- **Release readiness.** `hardware = NOT_SELECTED`

#### B05 — Main customer outcome
- **Definition.** The intended customer outcome is a coherent integrated cruising interface: licensed navigation information on a fixed helm display and on the customer's device, the vessel's compatible data brought into one local layer, and received AIS targets presented as traffic information with source, target age and the receive-only disclaimer. The customer keeps their electronics suite, gains a consistent helm view and understands exactly which data are licensed, which are connected and which are missing. The outcome explicitly excludes AIS transmission, DSC, collision-avoidance guarantees, guaranteed detection of every vessel, unrestricted chart rights and any steering authority; every traffic surface states that AIS reception is incomplete by nature and never replaces watchkeeping.
- **Evidence.** `OPEN` — intended end-state behaviour, not built or tested; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N11` `INCLUDED` in both editions), §4 (`A01`–`A03`, `A12`–`A14`); `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` §2.1 (`N-03`); `BLOCKED` — `A-04`, `C-01`, `C-02`, chart rights (`D-01`–`D-03`) and DISPLAY interface (`N-02`); MC-13-NAV, MC-11 (hardware) and the DISPLAY acceptance work would evidence it.
- **Owner.** Product management with engineering (Navigation Software, HUB, AIS, DISPLAY).
- **References.** `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N11`), §4 (`A01`–`A03`, `A12`–`A14`); batch-03 compatibility `N-01`–`N-03`; `A-04`, `C-01`, `C-02`; `D-01`–`D-03`, `D-09`.
- **Release readiness.** `engineering = NOT_VERIFIED`

#### B06 — Mandatory base components
- **Definition.** Exactly four mandatory components, each separately licensed and separately purchased: (1) `NAV-ESSENTIAL`, the navigation subscription that already includes the receive-only AIS target list/detail (`N11`) and licensed basic chart display (`N04`); (2) `HUB-STANDARD`, the local vessel-data gateway that publishes the documented local interface and can consume receive-only AIS output; (3) `AIS-RECEIVER`, the receive-only traffic source; (4) `DISPLAY-7`, the fixed helm presentation surface with its included base software. Mandatory means "required for the reference configuration", not "included free in one price": each object keeps its own readiness, warranty, licence and compatibility status. No fifth component is mandatory, `NAV-PRO` is not mandatory, and no component may be substituted silently.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §1.3, §2 (`N11`), §3, §4; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`; `VERIFIED_REPO docs/marea/execution/DECISION-LOG.md` D-007, D-012; `HYPOTHESIS` on the commercial bundling; `OPEN` — no bundle contract, no costed bundle BOM.
- **Owner.** Product management (bundle) with the NAV, HUB, AIS and DISPLAY product directors.
- **References.** `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §1.3, §2–§4; `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`; D-007, D-012; README §2, §8.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B07 — Optional components
- **Definition.** The intended additions, each a separate commercial object, none included in the bundle hypothesis: the `NAV-PRO` upgrade (live onboard instruments, multi-device access, CPA/TCPA, AIS alert rules, offline regions, route insights); `WEATHER-STANDARD` or `WEATHER-PRO` as separate licensed subscriptions on the same account, never double-billed (`D-013`); a VHF splitter where the antenna arrangement needs one; extra mounts and installation accessories beyond the documented set; professional installation and commissioning (always quoted per vessel); and a wider licensed chart region beyond the covered licence. For a complete physical installation the AIS antenna, splitter, mounts, cabling, power items, the GNSS source and the chart licence are required external objects of the customer's configuration even where they are optional purchases in the commercial surface; §1.1 records each with its exact class. No optional item is free, and no optional item may be presented as included.
- **Evidence.** `HYPOTHESIS` on the optional-commercial structure; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §4 (`A15`), §2 (`N10`, `N12`, `N13`, `N17`–`N19`); `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`; `OPEN` — no prices; `BLOCKED` — `H-04`, `H-08`, `H-11`, `D-04`, `D-05`, `D-07`, `X-05`.
- **Owner.** Commercial strategy with product management.
- **References.** §1.1 lines C-05, C-08–C-11, C-13–C-16; `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2, §4; `D-013`; `COMMERCIAL-PORTFOLIO.md` price rule.
- **Release readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### B08 — Required product editions
- **Definition.** Required editions: `NAV-ESSENTIAL`, `HUB-STANDARD`, `AIS-RECEIVER`, `DISPLAY-7`. Documented optional upgrade: `NAV-PRO`, a subscription upgrade that adds live instruments, multi-device access, CPA/TCPA, AIS alerts, offline regions and route insights; it is never the reference configuration and never automatically required. Not selectable in any CRUISE configuration: `AIS-CONNECTED` (`CONDITIONAL / NOT_YET_JUSTIFIED`; condition open, not selected by default) and `DISPLAY-LARGE-CONDITIONAL` (`NOT_ESTABLISHED`; `INELIGIBLE`, never selectable as a size; no other display size exists). Never part of CRUISE: any PILOT edition, any SENSE module or kit, WATCH Core/Plus, FLEET Start/Business/Enterprise, and both WEATHER editions (optional separate subscriptions only). No generation, size, capacity or performance variant is offered by CRUISE.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §1.3 (`AIS-CONNECTED` verdict), §2 (`N10`–`N13`, `N17`–`N19`), §4.1; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`; `VERIFIED_REPO docs/marea/products/README.md` §27 (`D-012`); `HYPOTHESIS` on variant pricing; `OPEN` — no edition-level acceptance evidence.
- **Owner.** Product management with the edition owners.
- **References.** `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §1.3, §2, §4.1; `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`; README §14, §27; `D-007`, `D-012`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B09 — Explicit exclusions
- **Definition.** CRUISE never includes and never implies: AIS transmission, transponder capability, own-position broadcast or DSC; a collision-avoidance system or any guaranteed detection of vessels; unrestricted, global or guaranteed chart coverage; AIS-derived retention, redistribution, resale or fleet sharing; MAREA PILOT hardware, software or any steering authority; SENSE modules; WATCH monitoring hardware or service; FLEET organisation subscriptions; installation labour, commissioning, AIS antenna, VHF splitter, mounts, cabling, adapters or power items unless itemised in a quotation; NMEA 2000 implementation, licence or certification; ECDIS, ECDIS-class or official-chart-system status; internet-only operation (local data intended to work without cloud); any autopilot, actuator or remote-helm control path; charts, weather, tides or currents as free features; free accessories; and any stock, availability, certification, review or delivery commitment. An exclusion is never a silent promise of later inclusion.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §4 (`A12`–`A14`, `A18`), §5 (cross-product boundaries); `VERIFIED_REPO docs/marea/products/README.md` §7 claim rules; `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §10 non-claims; `VERIFIED_REPO docs/marea/products/MAREA-DISPLAY-COMMERCIAL-SPEC.md` §5.3; `BLOCKED` — `H-08`, `D-09`.
- **Owner.** Product management with legal and claims.
- **References.** `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §4–§5; README §7, §10; D5 §10; `MAREA-DISPLAY-COMMERCIAL-SPEC.md` §5.3; `H-08`, `D-09`.
- **Release readiness.** `availability = NOT_FOR_SALE`

#### B10 — Dependency rules
- **Definition.** (1) NAV does not require the HUB: standalone navigation with device GNSS and a licensed chart area is valid; the HUB is included in CRUISE to publish local vessel data, not because NAV depends on it. (2) DISPLAY never includes NAV: `N-02` is `PLANNED`, NAV features on the display require a NAV subscription, and DISPLAY base software is presentation only. (3) DISPLAY data presentation depends on a tested HUB path (`N-01`), a tested AIS path (`N-03`) and the NAV interface contract (`N-02`); none exists. (4) AIS targets require a receiver plus the external VHF antenna chain; NAV shows targets in both editions (`N11`), and the HUB may consume receiver output only through a tested row (`B-07`). (5) A GNSS source is required for position and for any CPA/TCPA (`A-05`, optional Pro); missing own-vessel data produces `NOT_AVAILABLE`. (6) Chart data is an independent licensed entitlement; no purchase creates a chart right. (7) An optional WEATHER entitlement is independent and never double-billed (`D-013`). (8) Installation and every physical accessory are gated by the surveyed assessment. (9) No dependency creates inclusion: buying one product never includes another.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §6.3–§6.5; `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` §2.1 (`N-01`–`N-03`), §6; `VERIFIED_REPO docs/marea/products/MAREA-DISPLAY-COMMERCIAL-SPEC.md` §5.2–§5.3, §6; `OPEN`/`BLOCKED` — every cited integration row is untested and the chart/weather/AIS rights do not exist (`D-01`–`D-10`, `H-08`, `P-02`, `P-03`).
- **Owner.** Integration owner (HUB Product Director) with the DISPLAY and AIS integration owners.
- **References.** `A-04`, `A-05`, `B-07`, `B-08`, `C-01`, `C-02`, `N-01`–`N-03`; `D-01`–`D-10`, `H-08`, `P-02`, `P-03`; D5 §6; batch-03 compatibility §2.
- **Release readiness.** `engineering = NOT_VERIFIED`

#### B11 — Compatibility criteria
- **Definition.** A CRUISE configuration is compatible only when published matrix rows covering the exact device, firmware/software version, data path, adapter and direction have been tested and reviewed. Protocol names, connectors, brands and sibling products never create compatibility; Signal K is not a blanket guarantee; NMEA 2000 is not implemented, licensed, certified or offered. The relevant rows today are `N-02` (`PLANNED`), `N-01` (`CONDITIONAL`), `N-03` (`CONDITIONAL`), `A-04` (`UNKNOWN — NOT_TESTED`), `C-01` (`BLOCKED — H-08/H-05`), `C-02` (`UNKNOWN — NOT_TESTED`), `B-07` (`UNKNOWN — NOT_TESTED`), `B-08` (`UNKNOWN — NOT_TESTED`), `B-03` (`UNKNOWN — NOT_TESTED`) and `A-05` (`UNKNOWN — NOT_TESTED`, optional Pro only). **0 rows are `TESTED`/`SUPPORTED` in either register.** Until a row is promoted, the only permitted answers are "not yet published", "intended pending validation", "conditional on a named condition", "requires specialist assessment", "not supported" or "not assessed"; no self-install eligibility can be returned.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §2.1, §4.3, §5.2, §9.2, §10; `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` §1.3, §2.1, §9, §11–§12; `OPEN` — no device test, firmware version, adapter or test record exists.
- **Owner.** Integration owner (HUB Product Director) with the AIS and DISPLAY integration owners.
- **References.** `N-01`–`N-03`; `A-04`, `A-05`, `B-03`, `B-07`, `B-08`, `C-01`, `C-02`; `H-04`, `H-08`, `P-02`, `P-03`, `P-07`, `S-01`; D5 §2–§5, §9–§10; batch-03 compatibility §1.3, §2, §11.
- **Release readiness.** `engineering = NOT_VERIFIED`

#### B12 — Installation requirements
- **Definition.** CRUISE is intended to be installed through a surveyed route: a pre-quote vessel assessment; a documented helm mounting, power and cable-run arrangement for the DISPLAY and HUB; installation of the AIS VHF antenna and, where required, a splitter with documented RF/coaxial work; connection of the receiver and HUB; configuration of the local interface and of the NAV and DISPLAY consumers; commissioning checks for position, freshness, received-target states and honest unavailable states; and a handover with the installation record, the verbatim disclaimers (including AIS receive-only), support route and export path. Self-install applies only where a validated deterministic rule confirms a documented low-risk configuration; no such rule exists today. Installation duration, price, stock, lead time and technician certification are `OPEN`; there is no installer network or agreement, and no installation work is included in any bundle hypothesis.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §7.1–§7.4; `VERIFIED_REPO docs/marea/products/MAREA-DISPLAY-COMMERCIAL-SPEC.md` F10; `OPEN` — no measured installation; `BLOCKED` — `X-05`, `X-06`, `X-02`, `H-05`, `H-08`, `H-11`.
- **Owner.** Service operations with the installer network.
- **References.** D5 §7.1–§7.4; `MAREA-DISPLAY-COMMERCIAL-SPEC.md` F10; `H-05`, `H-08`, `H-11`, `X-02`, `X-05`, `X-06`; §1.1 lines C-12–C-14.
- **Release readiness.** `availability = NOT_FOR_SALE`

#### B13 — Software entitlements
- **Definition.** The intended software entitlements are: a MAREA NAV Essential application entitlement on the customer account, on the supported platforms, including the receive-only AIS target list/detail where a compatible receiver supplies targets; the MAREA HUB Standard included base software (local data gateway, local dashboard, diagnostics, configuration backup, updates during the warranty window); the MAREA AIS Receiver's documented output and firmware updates during its support window; the MAREA DISPLAY 7 included base software (operating environment, local dashboards, instrument and received-AIS presentation, navigation presentation, configuration, backup, diagnostics, updates during the warranty window); and the export of the customer's own routes, waypoints, logbook, DISPLAY configuration and HUB configuration in documented formats. Not included: a perpetual NAV licence, any chart or weather entitlement, a NAV Pro entitlement, a WEATHER entitlement, a future DISPLAY-LARGE licence, AIS retention/redistribution rights (`D-09`) or any entitlement to a product that is not in §1.1. No entitlement or billing service exists yet.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N09`, `N11`, `N21`), §3 (`H14`, `H16`–`H18`), §4 (`A09`); `VERIFIED_REPO docs/marea/products/MAREA-DISPLAY-COMMERCIAL-SPEC.md` F12, §5.3; `OPEN` — no entitlement implementation; `BLOCKED` — `H-13`, `D-09`.
- **Owner.** Commercial strategy with engineering and legal.
- **References.** `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2–§4; `MAREA-DISPLAY-COMMERCIAL-SPEC.md` F12, §5.3; `MAREA-NAV-COMMERCIAL-SPEC.md` F12; `H-13`, `D-09`, `X-02`.
- **Release readiness.** `licensing = NOT_CLEARED`

#### B14 — Recurring subscriptions
- **Definition.** The reference configuration has exactly one recurring subscription: the MAREA NAV Essential annual subscription at the internal hypothesis EUR 99/year (VAT-inclusive consumer retail `HYPOTHESIS_UNAPPROVED`). Optional subscriptions are the NAV Pro upgrade at the internal hypothesis EUR 149/year and the WEATHER-STANDARD (from EUR 49/year) or WEATHER-PRO (EUR 89/year) licensed data services, the latter conditional on provider entitlements. HUB, AIS Receiver and DISPLAY 7 carry no subscription; DISPLAY base software is included in the one-off purchase. Renewal is annual; the renewal price hypothesis is the same list price unless a lawful advance notice changes it. The same entitlement is never billed twice across NAV and WEATHER (`D-013`). A lapsed or failed payment must not disable local HUB or DISPLAY functions, local alarms or any safety-relevant independent function (`README.md` §16 rule 7). No billing, dunning, grace or refund policy is approved.
- **Evidence.** `HYPOTHESIS` — the NAV and WEATHER figures; `VERIFIED_REPO docs/marea/products/README.md` §8, §16 rule 7, §26; `VERIFIED_REPO docs/marea/execution/DECISION-LOG.md` D-013; `VERIFIED_REPO docs/marea/products/MAREA-DISPLAY-COMMERCIAL-SPEC.md` F12; `OPEN` — no billing service or terms review.
- **Owner.** Commercial strategy with finance and legal.
- **References.** `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §1.3; README §8, §16, §26; `D-013`; `COMMERCIAL-PORTFOLIO.md` price rule; §1.1 lines C-02, C-05, C-08–C-09.
- **Release readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### B15 — External data and connectivity
- **Definition.** CRUISE depends on external data and connectivity the bundle does not own: a licensed chart entitlement per region (`D-01`–`D-03`); licensed tides and currents where shown (`D-10`); optional licensed weather (`D-04`, `D-05`, `D-07`); a GNSS source; and the AIS VHF antenna chain. On board, the intended design is local-first: HUB local data, DISPLAY base presentation and received AIS targets must not require internet, and loss of the commercial website connection must not interrupt local functions; only licensed layers and account services depend on their own entitlement and connectivity. No connectivity, mobile coverage, Wi-Fi quality, SIM/data plan or provider availability is included or guaranteed; navigation offline use is limited to regions where the licence permits it; and a lapsed entitlement or a missing source produces an honest unavailable state, never fabricated or frozen data presented as current.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N04`, `N05`, `N14`, `N17`), §3 (`H15`), §4 (`A10`, `A11`); `VERIFIED_REPO docs/marea/products/MAREA-DISPLAY-COMMERCIAL-SPEC.md` F09, §5.3; `BLOCKED` — `D-01`–`D-07`, `D-09`, `D-10`; `OPEN` — no connectivity design reviewed.
- **Owner.** Product management with marine data licensing.
- **References.** `D-01`–`D-10`, `DEC-02`, `DEC-03`; `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2–§4; `MAREA-DISPLAY-COMMERCIAL-SPEC.md` F09; D5 §6; batch-03 compatibility §7.
- **Release readiness.** `dataRights = NOT_GRANTED`

#### B16 — Commissioning and onboarding
- **Definition.** Intended first use: unbox and confirm each product's contents against its printed list; install and power the HUB, the AIS receiver and the DISPLAY within the documented installation; connect the AIS antenna chain and the documented data paths; install MAREA NAV on the customer device, create the account and sign in; select the vessel profile; confirm the chart coverage held and its region; configure the local interface and select the AIS input in NAV and on the DISPLAY; run the source, freshness and target-state checks; confirm that received targets show target age and the receive-only notice; confirm honest unavailable states; complete a safety briefing that restates the disclaimers; and produce a readable commissioning record for support. DISPLAY must not require internet to complete local first use. The onboarding flow, manuals and first-run diagnostics do not exist and are `OPEN`.
- **Evidence.** `OPEN` — onboarding UX, manuals and commissioning record not built; `ASSUMPTION` on the sequence; `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §7.4; `VERIFIED_REPO docs/marea/products/MAREA-DISPLAY-COMMERCIAL-SPEC.md` F11; `BLOCKED` — no hardware (`H-05`, `H-08`, `H-11`).
- **Owner.** UX, content and localisation with support engineering.
- **References.** D5 §7.4; `MAREA-DISPLAY-COMMERCIAL-SPEC.md` F11; `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §4 (`A08`); `X-06`.
- **Release readiness.** `engineering = NOT_VERIFIED`

#### B17 — Warranty and support
- **Definition.** Intended support model: a support channel and a defined support period for the NAV subscription; a warranty window for the HUB, AIS Receiver and DISPLAY articles; and installer responsibility for workmanship within the documented scope, with the handover record as the basis for any support case. Warranty length, conditions, exclusions, RMA carriage, response times, escalation paths, spare-parts availability, out-of-warranty service and the seller's legal identity are `OPEN`; no SLA, uptime, response time, repair time or warranty duration may be stated or implied. The AIS receive-only limitation and the NAV navigational-aid limitation are support-relevant and must be repeated in support material. Support never converts an unverified compatibility claim into a supported one, and any customer data handling is governed by a privacy policy that does not yet exist.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §02, §03, §07 (quality gates and support intent); `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §7.4; `OPEN` — no warranty terms, no SLA, no legal seller identity; `BLOCKED` — `X-02`, `X-05`, `H-13`.
- **Owner.** Support operations with legal and commercial strategy.
- **References.** `COMMERCIAL-PORTFOLIO.md` §02, §03, §07; D5 §7.4; `X-02`, `X-05`, `H-13`, `P-10`.
- **Release readiness.** `availability = NOT_FOR_SALE`

#### B18 — Channel and fulfilment
- **Definition.** Intended channel: direct sale by EMBARCARTE for the NAV subscription, with an installer-led route for the HUB, AIS Receiver, DISPLAY and all physical installation work; the installer surveys the vessel, proposes the configuration and installation, installs the antenna/splitter, mounting, power and cabling, commissions the four products, hands over the record and provides first-line support. EMBARCARTE owns the product definitions, the compatibility authority, the included base software, warranty and support policy. Fulfilment, packaging, shipping, return logistics, stock, lead times, payment processing, installer margin, distributor terms and referral terms are all `OPEN`; no channel agreement, commission percentage or margin exists, and no stock or delivery date may be stated. A channel partner must never quote a hypothesis as if it were an approved price.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` (price and channel decision rule; first go-to-market hypothesis); `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §7.1; `VERIFIED_REPO docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §10.3; `OPEN`/`BLOCKED` — no channel terms (`X-05`, `X-06`).
- **Owner.** Commercial development with service operations.
- **References.** `COMMERCIAL-PORTFOLIO.md`; D5 §7; `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §10.3; `X-05`, `X-06`; §1.1 C-12.
- **Release readiness.** `availability = NOT_FOR_SALE`

#### B19 — Price hypothesis and quotation model
- **Definition.** The historical bundle hypothesis is **EUR 1,399**, `HYPOTHESIS_UNAPPROVED`. The internal reference configuration's first-year component-hypothesis sum is 99 (NAV Essential, year 1) + 349 (HUB Standard) + 249 (AIS Receiver) + 699 (DISPLAY 7 starting hypothesis) = **1,396** (VAT-inclusive hypotheses, `SIZE_NOT_FROZEN` for the display), against the historical 1,399. The figure can therefore be plausible **only** as a product-only, uninstalled, first-year starting figure: it excludes the AIS VHF antenna and any splitter, mounts, cabling, power items, professional installation, commissioning and survey, channel margin or installer compensation, and any discount; it is a first-year figure to which a NAV renewal applies after year 1. It is **not an installed-system price**, not a quotation and not a "from" offer. The optional NAV Pro variant sums 99-replaced-by-149 → 149 + 349 + 249 + 699 = **1,446**, so the historical 1,399 would require an unjustified discount of roughly 3.3% on a configuration that was never costed; that discount is not established and must not be presented. Verdict: `HYPOTHESIS_UNAPPROVED`; **installed-system price `NOT_ESTABLISHED`**; no BOM and no supplier cost exists. Do not state or imply that EUR 1,399 includes a complete installed system.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` (bundle table EUR 1,399; "No bundle price is approved for publication as purchasable until bottom-up costing"); `HYPOTHESIS` — EUR 99, 149, 249, 349, 699 and 1,399; `VERIFIED_REPO docs/marea/products/README.md` §8, §26; `OPEN`/`BLOCKED` — no BOM, no supplier quote, no channel terms, no chart price, no measured installation (`X-05`).
- **Owner.** Commercial strategy and pricing with finance.
- **References.** `COMMERCIAL-PORTFOLIO.md` bundle table and price rule; README §8, §26; `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §1.3; `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`; `X-05`; §1.1 C-02–C-05, C-12–C-16; `docs/marea/bundles/BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`.
- **Release readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### B20 — Cost and margin assumptions
- **Definition.** Only a symbolic framework exists, with named inputs and no computed result: VAT-inclusive retail → net revenue = retail / (1 + applicable VAT rate); hardware contributions (BOM, assembly, test, RF/EMC and other conformity programme, packaging, shipping/fulfilment, payment fees, warranty accrual, returns allowance, technical and installer support, firmware maintenance, spare parts); software contributions (chart/weather/tide data licensing per active user, hosting, support, payment fees, acquisition); and service contributions (measured installation time including antenna/splitter and display mounting, installer day rate, commissioning, travel). Any bundle discount must be the standalone product contribution less shared cost saving less channel margin, never an arbitrary marketing subtraction. No margin, markup, BOM, supplier quotation, RF test quote, channel percentage or willingness-to-pay figure is asserted, because none exists.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` price and channel decision rule and §02/§03/§07 quality gates; `VERIFIED_REPO docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL.md` §12; `VERIFIED_REPO docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §10–§11; `ASSUMPTION` on the cost categories; `BLOCKED` — `X-05`, `H-05`, `H-06`, `H-08`, `H-11`.
- **Owner.** Finance and procurement with commercial strategy.
- **References.** `COMMERCIAL-PORTFOLIO.md` price rule; pricing model §12; batch-03 pricing §10–§11; `X-05`, `H-05`, `H-06`, `H-08`, `H-11`; `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`.
- **Release readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### B21 — Upgrade and migration
- **Definition.** Intended upgrade paths: `NAV-ESSENTIAL` → `NAV-PRO` (live instruments, multi-device, CPA/TCPA, AIS alerts, offline regions and route insights; mid-term upgrade price difference pro-rata is `OPEN`); a later cross-sell to WEATHER as a separate licensed subscription; and, if a future hardware design ever justifies it, a separate decision on an AIS edition and a display size — neither is available in CRUISE. There is no path that converts CRUISE into another bundle; `AIS-CONNECTED` and `DISPLAY-LARGE-CONDITIONAL` are ineligible, not upgrade targets; no automatic inclusion of a future product exists; no downgrade entitlement is defined; and no migration preserves an unverified compatibility claim. Ownership transfer of the HUB, receiver and display on sale of the vessel is intended as a base support requirement; device identity and transfer mechanics do not exist (`X-07`). Customer records, chart-independent data and configuration must remain exportable through any migration.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N10`–`N13`, `N17`–`N19`), §3 (`H17`), §4.1; `VERIFIED_REPO docs/marea/products/README.md` §27; `HYPOTHESIS` on upgrade mechanics; `OPEN` — no upgrade or transfer implementation; `BLOCKED` — `X-07`, `X-05`.
- **Owner.** Product management with commercial strategy.
- **References.** `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2–§4.1; README §16 rule 7, §27; `X-05`, `X-07`; §1.1 C-05–C-07.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B22 — Customer acceptance criteria
- **Definition.** Customer acceptance for CRUISE is defined only as future evidence: a named, reviewable artefact per criterion, produced after a built configuration exists. The criteria cover configuration identity, structural refusal of `AIS-CONNECTED` and `DISPLAY-LARGE-CONDITIONAL`, a recorded AIS reception/output path with antenna/splitter configuration, a recorded end-to-end traffic presentation with target age and the receive-only disclaimer, a recorded DISPLAY↔NAV presentation test showing that DISPLAY never provides a NAV licence, recorded DISPLAY↔HUB and DISPLAY↔AIS tests, edition evidence that Essential already delivers AIS targets and basic charts, absence of any steering path, honest licensed-chart and lapsed-entitlement states, local-only AIS data with no retention/redistribution, per-vessel installation quotation, the uninstalled-only reading of the price hypothesis, copy compliance and an independent claims review. The fourteen criteria are enumerated in §9 (AC-CRUISE-01 to AC-CRUISE-14).
- **Evidence.** `VERIFIED_REPO` this document §9; `OPEN` — none of the criteria is satisfied; evidence would come from MC-11 (hardware/RF), MC-11A (account/entitlement), MC-13-NAV (navigation acceptance), MC-16A (security/updates), the DISPLAY acceptance work and independent review.
- **Owner.** Product governance and QA with the independent reviewer.
- **References.** §9 AC-CRUISE-01–AC-CRUISE-14; D5 §5.2; batch-03 compatibility §11; `P-01`, `P-02`, `P-03`, `P-07`, `P-10`, `H-05`, `H-08`, `H-13`.
- **Release readiness.** `engineering = NOT_VERIFIED`

#### B23 — Release readiness and blockers
- **Definition.** CRUISE is not releasable and not sellable at MC-08. The definitions are complete, but engineering is `NOT_VERIFIED`, licensing `NOT_CLEARED`, hardware `NOT_SELECTED`, data rights `NOT_GRANTED`, compliance `NOT_STARTED`, pricing `HYPOTHESIS_UNAPPROVED`, brand publication `NOT_GRANTED` and availability `NOT_FOR_SALE`. The binding blockers are `H-02`, `H-04`, `H-05`, `H-06`, `H-07`, `H-08`, `H-11`, `H-13`, `P-01`, `P-02`, `P-03`, `P-07`, `P-10`, `S-01`, `S-06`, `D-01`–`D-06`, `D-08`, `D-09`, `D-10`, `X-01`, `X-02`, `X-05` and `X-06`. No price is approved, no compatibility row is tested, no image exists, the brand is not cleared, the source IP is not cleared and no publication or purchase path may be enabled. Release requires an independent review of the real artefacts, not of this summary.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §1, §4, §9, §12–§13; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §5–§6; `OPEN`/`BLOCKED` — all listed blockers remain open.
- **Owner.** Product governance and QA with the Lead.
- **References.** README §1, §4, §9; `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §9; `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §5–§6; all blocker ids in this line.
- **Release readiness.** `availability = NOT_FOR_SALE`

#### B24 — ES/EN content and visual references
- **Definition.** Customer-facing content for CRUISE exists only as internal draft copy in `docs/marea/bundles/copy/cruise.es.md` (Spain Spanish) and `docs/marea/bundles/copy/cruise.en.md` (natural international English). Both follow the 24 numbered sections fixed for MC-08, carry the approved navigation disclaimer verbatim and the approved AIS receive-only disclaimer verbatim in their own language, never translate bundle or product names, contain no currency amount, no price, no stock, no review, no certification, no availability claim and no enabled purchase call to action, and use only future-intention CTAs (verify compatibility, request a vessel survey, request a professional installation quotation, explore the configuration, ask about installation). Visual references point to `docs/marea/bundles/BUNDLE-ASSET-REQUIREMENTS.md`; no image generation is executed, no photograph, CGI or mock-up may be claimed as existing, every scene requirement remains blocked while `X-03` is open, and any asset is `CONCEPT`, never a real-product visual. The AIS receive-only disclaimer must appear in both copy files and on every traffic surface.
- **Evidence.** `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9 (verbatim disclaimers); `VERIFIED_REPO docs/marea/products/README.md` §7 rule 9–10, §22, §29; `VERIFIED_REPO docs/marea/execution/DECISION-LOG.md` D-014; `OPEN` — copy is an internal draft and no asset file exists.
- **Owner.** UX, content and localisation with brand governance.
- **References.** `copy/cruise.es.md`, `copy/cruise.en.md`; `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9; README §7, §22, §29; `BUNDLE-ASSET-REQUIREMENTS.md`; `X-03`.
- **Release readiness.** `brandPublication = NOT_GRANTED`

---

## 11. Document status and non-assertions

- This document is internal, `NOT PUBLISHED` and `NOT FOR SALE`. It creates no orderable SKU, no quotation, no
  compatibility certification, no price approval and no product family.
- The reference configuration is `NAV-ESSENTIAL` + `HUB-STANDARD` + `AIS-RECEIVER` + `DISPLAY-7`; `NAV-PRO` is an
  optional upgrade and never automatically required; `AIS-CONNECTED` is `CONDITIONAL` and must not be selected;
  `DISPLAY-LARGE-CONDITIONAL` is `NOT_ESTABLISHED` and never selectable as a size; DISPLAY never includes NAV or
  charts; buying any product never includes another product.
- The compatibility position is unchanged by this document: **0 rows are `TESTED`/`SUPPORTED`** in either
  register, `N-02` is `PLANNED`, `N-01`/`N-03` are `CONDITIONAL`, `C-01` is `BLOCKED`, and the remaining relevant
  rows are `UNKNOWN — NOT_TESTED`; no configuration is eligible today.
- AIS is receive-only: it never transmits the vessel's position, is not a transponder, is not a collision-avoidance
  system and does not replace watchkeeping; no reception range or detection of every vessel is guaranteed.
- PILOT, SENSE, WATCH and FLEET are not CRUISE components; NMEA 2000 is not implemented, licensed or certified;
  NAV is a navigational aid, never ECDIS; no component provides a steering, autopilot or remote-helm path.
- The historical EUR 1,399 figure remains `HYPOTHESIS_UNAPPROVED`: it can only describe a product-only,
  uninstalled, first-year starting hypothesis; the installed-system price is `NOT_ESTABLISHED`, no BOM or
  supplier cost exists, and EUR 1,399 never includes a complete installed system.
- Publication, pricing approval, compatibility evidence, brand clearance and source-IP clearance are all outside
  this document and remain open; no claim here may be used as evidence that CRUISE is available, certified,
  approved or purchasable.
