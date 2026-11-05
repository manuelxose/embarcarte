# MAREA START — Commercial bundle specification

| Field | Value |
| --- | --- |
| Document ID | MC-08 / D2 — MAREA START bundle specification |
| Milestone | MC-08 (08/36) — bundles and commercial architecture |
| Deliverable | D2 — complete commercial definition of the MAREA START bundle |
| Owner | Recreational Navigation Solution Architect |
| Status | INTERNAL / NOT PUBLISHED / NOT FOR SALE / BUNDLE DEFINITION ONLY |
| Base commit | `80c66c70a1bab6f11c5ba5709baa4c1671f1d6da` (MC-07 HEAD) |
| Branch | `feature/marea-mc08-bundles-commercial-architecture` |
| Date | 2026-10-30 |
| Write scope | `docs/marea/bundles/MAREA-START-COMMERCIAL-SPEC.md` only (this document) |
| Is not | Not a quotation, not an orderable SKU, not a compatibility certification, not a price approval, not a product family |
| Bundle id | `START` — MAREA START |
| Historical price hypothesis | EUR 499 — `HYPOTHESIS_UNAPPROVED` (never approved, never final, never a launch price, never purchasable) |

## 0. Scope and status statement

MAREA START (`START`) is a **bundle definition**: a fixed internal reference configuration, its rules, its
dependencies, its exclusions and the evidence that would be required before the bundle could ever be quoted,
published or sold. A bundle definition is **not an installed system**, not an approved quotation, not an
orderable SKU and not a legally authorised offer. Nothing in this document creates a purchasable article, a
price, a delivery commitment, a certification, an availability date or a compatibility result.

The reference configuration fixed by this document is **MAREA HUB Standard (`HUB-STANDARD`) + MAREA NAV Pro
(`NAV-PRO`)**. `MAREA NAV Essential` (`NAV-ESSENTIAL`) is a documented lower-cost variant and is not the
reference configuration. No other MAREA family is part of START. The historical figure of EUR 499 remains a
`HYPOTHESIS_UNAPPROVED` bundle-price hypothesis; this document records under §B19 precisely why it can only
describe an uninstalled, product-only, first-year starting figure.

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
| S-01 | HUB | `HUB-STANDARD` | 1 | Base component — local vessel data gateway that publishes the local vessel interface | `INCLUDED` | Installation assessment; vessel power; cabling/adapters; at least one compatible source | None | `B-03` `UNKNOWN — NOT_TESTED`; `B-08` `UNKNOWN — NOT_TESTED`; intake families `BLOCKED — H-04` | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §3; `OPEN` — no hardware, no BOM, no device test | `HYPOTHESIS_UNAPPROVED` EUR 349 (VAT-inclusive hypothesis) | `NOT_ESTABLISHED` — no BOM, no supplier quote | Installer assessment and professional installation route; no measured duration or price | `H-04`, `H-05`, `H-07`, `P-02`, `X-05` |
| S-02 | NAV | `NAV-PRO` | 1 | Base component — connected-navigation application; **required for the promised outcome** because live onboard instrument overlays are a NAV Pro capability (`N10`) | `INCLUDED` | Compatible HUB local interface (`A-02`/`B-08`); licensed chart entitlement; customer device | NAV Pro annual subscription | `A-02` `UNKNOWN — NOT_TESTED`; `A-04` not required by START; `A-01` `UNKNOWN — NOT_TESTED` | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N10` `NOT_INCLUDED` in Essential, `INCLUDED` in Pro); `OPEN` — integration not built or tested | `HYPOTHESIS_UNAPPROVED` EUR 149 / year (VAT-inclusive hypothesis) | `NOT_ESTABLISHED` — data licensing per active user not costed | App install on the customer device; no fixed installation | `D-01`–`D-06`, `D-08`, `D-10`, `P-01`, `P-02`, `P-10` |
| S-03 | NAV | `NAV-ESSENTIAL` | — (variant only) | Documented **lower-cost variant**, substitutes for S-02; **not part of the bundle**; not additive; does **not** deliver live instrument overlays (`N10` `NOT_INCLUDED`) | `NOT_INCLUDED` | As S-02, but the promised instrument-overlay outcome is not delivered | NAV Essential annual subscription | `A-02` not applicable to the overlays outcome; `A-04` not required by START | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N10`) and §5; `HYPOTHESIS` variant pricing | `HYPOTHESIS_UNAPPROVED` EUR 99 / year (VAT-inclusive hypothesis) | `NOT_ESTABLISHED` | App install; no fixed installation | `D-01`–`D-06`, `P-01`, `P-10` |
| S-04 | HUB | `HUB-PRO` | — (upgrade only) | Upgrade substitution for S-01: wider validated envelope plus installer tooling | `OPTIONAL` | As S-01; additional validated connection families are `BLOCKED — H-04`/`H-07` | None | As S-01; Pro envelope not tested | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §3 | `HYPOTHESIS_UNAPPROVED` EUR 499 (VAT-inclusive hypothesis) | `NOT_ESTABLISHED` | Installer assessment; no measured duration or price | `H-04`, `H-05`, `H-07`, `X-05` |
| S-05 | WEATHER | `WEATHER-STANDARD` | — (optional only) | Optional licensed forecast/data subscription on the same account; never double-billed with a NAV entitlement | `OPTIONAL` | Provider rights; entitlement service (not implemented) | WEATHER Standard annual subscription | No START integration row; provider rights `NOT_GRANTED` (`D-04`, `D-05`, `D-07`) | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`; `BLOCKED` — provider rights | `HYPOTHESIS_UNAPPROVED` from EUR 49 / year (VAT basis `OPEN`) | `NOT_ESTABLISHED` — no provider quote | None | `D-04`, `D-05`, `D-07`, `D-10` |
| S-06 | Service | Professional installation and commissioning | — | Installation assessment, installation, configuration and handover; required for mixed-equipment refits, quoted per vessel | `OPTIONAL` | Vessel survey; installer network; measured time | None | Not a compatibility row | `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §7; `BLOCKED` — no installer network or measured install (`X-05`, `X-06`) | `NOT_ESTABLISHED` — quoted per vessel after assessment | `NOT_ESTABLISHED` | Always quoted separately; never included in the bundle hypothesis | `X-05`, `X-06` |
| S-07 | Accessory | External cabling, adapters and power items required by the installation | — | Physical items needed to connect the vessel's sources to the HUB | `REQUIRED_EXTERNAL` | Surveyed installation; exact items `OPEN` | None | Adapter class `OPEN`; no item is approved | `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §3 row 11, §7; `OPEN` | `OPEN` — not priced | `NOT_ESTABLISHED` | Included only in an installation quotation, itemised | `H-04`, `H-05`, `X-05` |
| S-08 | External | Customer-supplied phone or tablet with GNSS | — | Device platform for MAREA NAV | `REQUIRED_EXTERNAL` | Supported operating-system version to be published; device GNSS (`A-01`) | Customer's existing device | `A-01` `UNKNOWN — NOT_TESTED` | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N03`); `OPEN` | `NOT_APPLICABLE` — not sold | `NOT_ESTABLISHED` | None | `P-01`, `P-10` |
| S-09 | Data entitlement | Licensed chart entitlement within the purchased region | — | Licensed chart data right for the area sailed; never a product feature or ownership | `REQUIRED_EXTERNAL` | Signed chart distribution or per-region licence; territory | Annual/periodic data licence terms `OPEN` | Not a compatibility row; `BLOCKED` — `D-01`/`D-02`/`D-03` | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N04` `INCLUDED_LICENSED`); `BLOCKED` | `OPEN` — no chart-licence price | `NOT_ESTABLISHED` | None | `D-01`, `D-02`, `D-03`, `DEC-02` |
| S-10 | Data entitlement | Wider licensed chart region beyond the included licence | — | Additional licensed coverage | `OPTIONAL` | As S-09, territory by territory | Per-territory licence | Not a compatibility row | `VERIFIED_REPO PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N05` `NOT_INCLUDED`); `BLOCKED` | `OPEN` | `NOT_ESTABLISHED` | None | `D-01`, `D-02` |
| S-11 | AIS | `AIS-RECEIVER` / `AIS-CONNECTED` | 0 | Receive-only traffic hardware — **never part of START** | `NOT_INCLUDED` | — | — | Not part of START; START describes no AIS targets | `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §01/§03; `BLOCKED` — `H-08` | `HYPOTHESIS_UNAPPROVED` (AIS edition figures exist; not included here) | `NOT_ESTABLISHED` | — | `H-08`, `P-03` |
| S-12 | DISPLAY | `DISPLAY-7` / `DISPLAY-LARGE-CONDITIONAL` | 0 | Fixed helm display — **never part of START** | `NOT_INCLUDED` | — | — | Not part of START | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`; `OPEN` — no hardware | `HYPOTHESIS_UNAPPROVED` for `DISPLAY-7`; `NOT_ESTABLISHED` for Large | `NOT_ESTABLISHED` | — | `H-11`, `P-07` |
| S-13 | PILOT | — | 0 | Supervised steering system — **never part of START; no control path** | `NOT_INCLUDED` | — | — | Not a START row | `VERIFIED_REPO docs/marea/products/README.md` §16 rule 1 | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | — | `H-01`, `P-04` |
| S-14 | SENSE | — | 0 | Sensor modules — separate family, not a START component | `NOT_INCLUDED` | — | — | Not a START row | `VERIFIED_REPO docs/marea/products/README.md` §2 | `HYPOTHESIS_UNAPPROVED` (module hypotheses only) | `NOT_ESTABLISHED` | — | `P-05` |
| S-15 | WATCH | — | 0 | Remote monitoring service — separate family, not a START component | `NOT_INCLUDED` | — | — | Not a START row | `VERIFIED_REPO docs/marea/products/README.md` §2 | `HYPOTHESIS_UNAPPROVED` (WATCH hypotheses only) | `NOT_ESTABLISHED` | — | `P-06` |
| S-16 | FLEET | — | 0 | Multi-vessel SaaS — separate family, not a START component | `NOT_INCLUDED` | — | — | Not a START row | `VERIFIED_REPO docs/marea/products/README.md` §2 | `HYPOTHESIS_UNAPPROVED` (FLEET hypotheses only) | `NOT_ESTABLISHED` | — | `P-09`, `X-07` |
| S-17 | Interface | NMEA 2000 | 0 | Not implemented, not licensed, not certified, not offered | `NOT_INCLUDED` | — | — | `B-09` `BLOCKED — H-04/DEC-05` | `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §4.2; `BLOCKED` | `NOT_APPLICABLE` | `NOT_ESTABLISHED` | — | `H-04`, `DEC-05` |
| S-18 | Standard | ECDIS / official-chart-system status | 0 | Never offered under any edition or name | `NOT_INCLUDED` | — | — | `N25` `NOT_INCLUDED` (NAV) | `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N25`) | `NOT_APPLICABLE` | `NOT_ESTABLISHED` | — | `D-01` |

### 1.2 Reading of the reference configuration

- **One data layer, one navigation surface.** MAREA HUB Standard is the base component that publishes local
  vessel data; MAREA NAV Pro is the application that consumes it and adds the promised live onboard instrument
  overlays (`N10`). Both are separate commercial objects with separate readiness and separate ownership.
- **NAV Pro is required, not decorative.** `N10` (live instrument overlays) is `NOT_INCLUDED` in `NAV-ESSENTIAL`
  and `INCLUDED` in `NAV-PRO` (`PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2). The START outcome — connect existing
  onboard data to modern navigation while keeping existing instruments — therefore depends on `NAV-PRO`. The
  Essential variant keeps planning, charts, logbook and (with a separately installed receiver) basic AIS target
  display, but it does not deliver the overlays that define this bundle.
- **Buying one product never includes another.** The HUB does not include a NAV licence; NAV does not include a
  HUB, charts, AIS hardware, DISPLAY or WEATHER; no edition of any family includes another family
  (`PRODUCT-EDITIONS-NAV-HUB-AIS.md` §5; `README.md` §2). START is an internal bundling of two separately
  licensed purchases, never a merged product.
- **The bundle is not an installed system.** Cabling, adapters, power items, mounts, installation labour,
  commissioning, a compatibility survey and any wider chart region are external objects with their own price
  status (`OPEN` or `NOT_ESTABLISHED`). The historical EUR 499 hypothesis does not cover any of them (§B19).
- **Line numbering.** The `S-xx` numbers above are local to this specification and enumerate the same objects as
  the canonical line-item register in `docs/marea/bundles/BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` (D8, lines
  `ST-01`–`ST-08`) plus the explicit exclusion rows; where the two differ in presentation, the canonical
  composition register governs the line register and this document governs the bundle truth constraints.

---

## 2. Mandatory configuration rules

1. The reference configuration is fixed: exactly one `HUB-STANDARD` and exactly one `NAV-PRO`. No third
   component is part of the reference configuration.
2. `NAV-PRO` is mandatory because the promised outcome depends on live onboard instrument overlays, a NAV Pro
   capability (`N10`). The bundle must never be described as delivering those overlays with `NAV-ESSENTIAL`.
3. `NAV-ESSENTIAL` is a documented lower-cost **variant**, not the reference configuration and never additive to
   `NAV-PRO`. Choosing the variant changes the outcome and must be stated as such.
4. `HUB-PRO` is an upgrade substitution for `HUB-STANDARD`, never an included second device and never required
   by the reference configuration.
5. `HUB-STANDARD` is the base component that publishes local vessel data. MAREA NAV does not require a HUB for
   standalone device positioning and licensed charts; START chooses the HUB because the outcome requires onboard
   data, not because NAV depends on it.
6. No product family outside §1.1 may be added to START: AIS, DISPLAY, PILOT, SENSE, WATCH, FLEET and any future
   family are excluded. AIS hardware and DISPLAY are recorded as `NOT_INCLUDED`, never as optional components of
   START.
7. Subscriptions are separate contracts: the NAV Pro annual subscription is required to keep the application
   entitlement; the HUB has no subscription; an optional WEATHER subscription is a separate licensed data
   service and the same entitlement is never billed twice across NAV and WEATHER (`D-013`).
8. Charts, tides, currents and forecasts are **licensed data entitlements**, never product features. The chart
   region covered by the customer's licence is a required external object; guaranteed or unlimited chart
   coverage is never promised.
9. Installation, commissioning, cabling, adapters, power items, mounts, antennas and any wider chart region are
   never assumed included. Installation is quoted per vessel after assessment; no duration or price exists.
10. Compatibility must come from a published matrix row that has been tested and reviewed. Today **0 rows are
    `TESTED`**, so no START configuration is eligible for sale and no compatibility claim may be made.
11. No START component introduces a steering, autopilot, actuator or remote-helm control path. An existing
    autopilot remains outside the bundle and is never controlled by NAV or HUB.
12. No NMEA 2000 certification or operational compatibility claim is made. NAV is a navigational aid, not ECDIS
    and not an official-chart system; ECDIS status is never claimed.
13. The price hypothesis is never presented as an approved price, an offer, a discount, a promotion, a
    reservation or a launch price. START is not orderable.
14. Publication is blocked: this document is internal, the copy drafts are internal, the brand is not cleared,
    the source IP is not cleared, no images exist and no purchase path is enabled.

---

## 3. Compatibility and eligibility criteria

### 3.1 Compatibility criteria (bundle level)

- Compatibility is assessed **per device, per firmware/software version, per data path and per direction**. A
  protocol name, a connector, a brand or a sibling product never creates compatibility
  (`PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §1.2, §3).
- The published compatibility matrix is the only surface authorised to state that a configuration is supported.
  A row is either `TESTED` (with device, firmware, direction, adapter, test record and reviewer) or it forbids a
  positive claim. **All 21 batch-01 rows are `UNKNOWN — NOT_TESTED`, `BLOCKED` or `PROHIBITED`; 0 are `TESTED`**
  (`PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §2.1, §4).
- The rows relevant to START are:

| Row | Intended feature for START | Status | What closes it |
| --- | --- | --- | --- |
| `A-02` | NAV Pro shows vessel data published by HUB on the local interface | `UNKNOWN — NOT_TESTED` | Recorded HUB–NAV integration test per version; HUB hardware and protocol freeze (`H-05`, `H-07`) |
| `B-03` | HUB consumes Signal K streams from a supported on-board source | `UNKNOWN — NOT_TESTED` | Per-source, per-path, per-direction test records; local trust model (`E-21`, `S-06`) |
| `B-08` | HUB publishes the documented local vessel data interface to NAV and compatible consumers | `UNKNOWN — NOT_TESTED` | Architecture and contract test; no product test exists (`P-02`) |
| `A-01` | NAV shows own position from the device's own GNSS | `UNKNOWN — NOT_TESTED` | Device/platform acceptance record (`MC-13-NAV`) |
| `A-03` | NAV Pro overlays a direct instrument source without a HUB | `UNKNOWN — NOT_TESTED` | Installer assessment plus a tested adapter/source row (`H-04`, `P-01`) |
| `B-01`/`B-02` | HUB reads wind and GNSS sentences from a compatible source | `UNKNOWN — NOT_TESTED` (unit parser tests only) | Device test records; parsing is not conformance (`H-04`) |
| `B-07` | HUB consumes receive-only AIS output | `UNKNOWN — NOT_TESTED` | Not needed for START; recorded only to show the row is absent from this bundle |

### 3.2 Eligibility criteria

A START configuration may be considered only when **all** of the following are recorded: the vessel inventory
(type, size, make, year, territory); the existing instrument sources with make/model/firmware where obtainable;
the network families present; the autopilot presence (to confirm the steering exclusion); the power and mounting
arrangement; the customer device and operating-system version; the chart region required; and the installation
route. Each item is matched against the published matrix, never inferred. Until at least one relevant row is
`TESTED`, the deterministic self-install outcome cannot be returned and every enquiry resolves to a specialist
assessment, a refusal or an information request (`PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §9).

---

## 4. Installation and commissioning

- **Routes.** Self-install is permitted only where a validated deterministic rule confirms a documented low-risk
  configuration; no such rule exists today. Professional installation and installer-only retrofit are the
  intended routes for START, with the specialist route for mixed or older equipment (`PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md`
  §7.1).
- **Pre-quote assessment.** The installer records the vessel and equipment inventory, existing network, autopilot
  presence, power arrangement, mounting locations, owner expectations and photographs or inventory documents,
  then matches each item against the published matrix and records supported / conditionally supported / not
  supported (`PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §7.2). Nothing is assumed from a connector or a brand.
- **Commissioning.** The intended handover includes: the installation record (configuration, sources found,
  unsupported items, checks, software/firmware versions); separate product ownership and editions; the verbatim
  disclaimers of each delivered product; the support and warranty route; the export path for the customer's own
  configuration and records; and the update-policy status (`PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §7.4).
- **No duration, price, stock or lead time is stated or implied.** Installation is quoted per vessel after
  assessment; the programme has no installer network, no agreement and no measured installation (blockers
  `X-05`, `X-06`).

---

## 5. Entitlements

| Entitlement | Included in START? | Term | Rule |
| --- | --- | --- | --- |
| MAREA NAV Pro application entitlement | Yes, as one separate subscription | Annual, renewing (`HYPOTHESIS_UNAPPROVED` price) | Access to the purchased edition's software capabilities; export of the customer's own routes, waypoints and logbook before and after cancellation; no perpetual licence |
| MAREA HUB Standard appliance and its included base software | Yes, as one separate purchase | Perpetual use of the article inside the published update/support window | Local data gateway, local dashboard, diagnostics, configuration backup; no NAV licence included; no subscription |
| Licensed chart entitlement | No — required external data right | Per licence/region/period | Coverage and terms defined by the data provider; never ownership of the data; never guaranteed or unlimited coverage |
| Optional WEATHER subscription | No — separate licensed service | Annual, if contracted | One entitlement ledger; never billed twice with a NAV entitlement (`D-013`); lapsed entitlement shows an honest unavailable state |
| Application updates and security fixes | Included in the active subscription / support window | During term / warranty window | Updates never remove the customer's own records; a firmware/software change can demote a compatibility row |
| AIS, DISPLAY, PILOT, SENSE, WATCH, FLEET entitlements | No | — | Never included; each is a separate product with its own readiness |

Subscription isolation rule: no commercial entitlement may disable local vessel-data functions, local
diagnostics, local alarms or any safety-relevant independent function of the HUB when payment fails or a
subscription expires (`README.md` §16 rule 7; design requirement, not a tested behaviour).

---

## 6. Release readiness and blockers

| Readiness dimension | Value at MC-08 | Meaning |
| --- | --- | --- |
| `definition` | `COMPLETE_TARGET_SPECIFICATION` | The bundle is fully defined, not built |
| `engineering` | `NOT_VERIFIED` | No end-to-end START integration exists; 0 tested compatibility rows |
| `licensing` | `NOT_CLEARED` | NAV account/entitlement service and chart/weather rights do not exist |
| `hardware` | `NOT_SELECTED` (HUB) | No HUB hardware, BOM or supplier quote |
| `dataRights` | `NOT_GRANTED` | No chart or weather distribution right |
| `compliance` | `NOT_STARTED` | No CE/RED/LVD/EMC/GPSR/CRA evidence |
| `pricing` | `HYPOTHESIS_UNAPPROVED` | EUR 499 is a historical hypothesis, not approved |
| `brandPublication` | `NOT_GRANTED` | MAREA is a proposed brand; copy is internal |
| `availability` | `NOT_FOR_SALE` | Nothing can be ordered |

**Blockers that gate any START release:** `H-04` (no NMEA 2000 licence/implementation), `H-05`/`H-07` (no HUB
hardware, BOM, supplier quotes or conformity), `H-13` (no secure update/CRA lifecycle), `P-01`/`P-02`/`P-10` (no
product verification; TypeScript suites unexecuted), `D-01`–`D-06`/`D-08`/`D-10` (no chart, weather, tide or
current rights), `S-06` (Signal K runtime and notices), `X-01`/`X-02` (company and seller legal identity),
`X-05` (no costed BOM or channel terms), `X-06` (no installer network or measured installation), `D-09`
(AIS-derived retention posture, not used by START but governing the wider ecosystem). **No blocker is closed
by this document.**

---

## 7. Configuration outcomes

The only permitted outcomes are these exact tokens. `ORDERABLE`, `FOR_SALE`, `APPROVED` and `PUBLISHABLE` are
never valid outcomes for this bundle.

| Outcome | Meaning | When it applies to START today |
| --- | --- | --- |
| `CONFIGURATION_DEFINED_INTERNAL` | The reference configuration is fully specified internally and no product is orderable | Default state of this document |
| `COMPATIBILITY_EVIDENCE_REQUIRED` | An intended integration must be tested per device/firmware/direction before any eligibility statement | Applies to `A-02`, `B-03`, `B-08`, `B-01`/`B-02`, `A-01`, `A-03` |
| `SPECIALIST_SURVEY_REQUIRED` | The vessel configuration needs an installer survey before compatibility or quotation | Applies to every real vessel enquiry while 0 rows are `TESTED` |
| `QUOTATION_REQUIRED` | Installation, commissioning, cabling/adapters and any larger configuration are quoted per vessel | Applies to professional installation and to all external physical items |
| `NOT_ELIGIBLE` | A requested component or integration is excluded by design or not selectable | AIS hardware, DISPLAY, PILOT, SENSE, WATCH, FLEET, NMEA 2000, ECDIS, steering/autopilot integration |
| `PUBLICATION_BLOCKED` | Price, brand, claims, imagery or a purchase path are not cleared | Applies to any external use of this bundle definition and to both copy drafts |

---

## 8. Customer journeys, bilingual copy and assets

- **Customer journeys.** The discovery-to-end-of-life journeys for this bundle are defined in the MC-08
  companion deliverable `docs/marea/bundles/BUNDLE-CUSTOMER-JOURNEYS.md`; this specification fixes the
  configuration and the truth constraints those journeys must obey. The journey stages follow the 17-stage
  vocabulary of `docs/marea/products/README.md` §22 and §29.
- **ES/EN copy.** Draft internal copy is `docs/marea/bundles/copy/start.es.md` (Spain Spanish) and
  `docs/marea/bundles/copy/start.en.md` (natural international English). Both carry the 24 required sections and
  the approved disclaimers verbatim; both are internal drafts and are not published.
- **Assets.** The START bundle asset requirements are defined in `docs/marea/bundles/BUNDLE-ASSET-REQUIREMENTS.md`
  (MC-08 companion deliverable). No image generation is executed for this milestone, no asset is a real-product
  visual, and any rendered asset would remain `CONCEPT` — never evidence that a device exists. X-03 keeps scene
  imagery blocked.
- **Price and channel model.** The bundle-level price challenge and unit-economics framework are in
  `docs/marea/bundles/BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`; this specification's §B19 records the START-specific
  arithmetic and must agree with it.

---

## 9. End-to-end acceptance criteria (future evidence)

These are acceptance criteria for future evidence, **not claims** and not current capabilities. Each requires a
reviewable artefact before it can be marked satisfied; none is satisfied today.

| # | Criterion | Evidence that would satisfy it |
| --- | --- | --- |
| AC-START-01 | The reference configuration resolves to exactly one `HUB-STANDARD` and one `NAV-PRO`, and every component resolves to a canonical family/edition id | A machine-readable bundle contract plus a validator run over the canonical product contracts |
| AC-START-02 | The bundle states, and the copy repeats, that NAV Pro is required for live instrument overlays and that `NAV-ESSENTIAL` does not deliver them | Two independent reviewers compare the specification, the contract and both copy files |
| AC-START-03 | A HUB-to-NAV local data path is recorded as `TESTED` for a named device, firmware, direction and adapter, with a test record and an independent reviewer | A compatibility row promoted under `PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §5.2 |
| AC-START-04 | A recorded installation test shows the customer's existing instruments retained and their data presented with source, timestamp and stale state | End-to-end installation test record on at least two representative vessels |
| AC-START-05 | Live instrument overlays are evidenced in `NAV-PRO` and demonstrably absent from `NAV-ESSENTIAL` in the built product | Recorded product acceptance test per edition |
| AC-START-06 | The customer can export their own routes, waypoints and logbook before and after cancellation | Recorded export test on the built application |
| AC-START-07 | Chart coverage is displayed only within a held licence and the unlicensed/unavailable state is shown honestly | Licensed-data acceptance test with a negative case |
| AC-START-08 | No steering, autopilot, actuator or remote-helm command path exists in NAV or HUB | Independent security and integration review of the built products |
| AC-START-09 | Installation is quoted per vessel after a recorded assessment, with included and excluded items itemised and no duration or price invented | Installer quotation template plus at least two representative assessed vessels |
| AC-START-10 | The historical bundle hypothesis is reproduced only as an uninstalled product-only figure and never as an installed-system price | Independent review of the pricing annex and of every customer-facing reference to the figure |
| AC-START-11 | Both copy files contain 24 sections, the approved navigation disclaimer verbatim, no currency amount and no enabled purchase CTA | Automated copy checks plus an independent human read of ES and EN |
| AC-START-12 | No surface states or implies availability, certification, approval, stock, review or a compatibility guarantee for START | Independent claims review against `COMMERCIAL-BRAND-CLAIMS-POLICY.md` |

---

## 10. The 24 mandatory fields

Every field uses the five required bullet lines exactly: **Definition**, **Evidence**, **Owner**, **References**,
**Release readiness**. The Definition may describe intended final behaviour that is not built; when it does, the
Evidence line says so and names what would evidence it.

#### B01 — Identity
- **Definition.** MAREA START (bundle id `START`) is the entry-level bundle definition of the MAREA programme: one MAREA HUB Standard (`HUB-STANDARD`) plus one MAREA NAV Pro (`NAV-PRO`), sold as two separately licensed commercial objects whose intended combined outcome is to connect existing onboard data to modern navigation while keeping the vessel's existing instruments. It is a `BUNDLE_DEFINITION`, not a product family, not a new edition, not an orderable SKU, not an installed system and not a quotation. The historical bundle figure EUR 499 is a `HYPOTHESIS_UNAPPROVED` commercial hypothesis and is not part of the identity of a sellable article.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` (Customer-facing bundle architecture row: MAREA START, "NAV + compatible HUB", EUR 499); `VERIFIED_REPO docs/marea/products/README.md` §2 (bundles are ecosystem context; bundle contents and pricing are governed by MC-08); `HYPOTHESIS` on any combined price; `OPEN` on the installed-solution composition.
- **Owner.** Recreational Navigation Solution Architect.
- **References.** `docs/marea/COMMERCIAL-PORTFOLIO.md` bundle table; `docs/marea/products/README.md` §2, §8; `docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §1.3; `docs/marea/execution/DECISION-LOG.md` D-007; this document §1.1.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B02 — Commercial purpose
- **Definition.** START exists to give day and coastal cruisers a coherent first step into the MAREA ecosystem: bring the vessel's existing instrument data into one local layer and present it inside a modern navigation workspace, without replacing the electronics suite and without requiring a fixed display or a traffic receiver. Its commercial role is the entry bundle that later cross-sells AIS, DISPLAY, WEATHER or a wider validated HUB envelope; its target geometry is the refit-and-connect segment starting in Galicia and the Rías Baixas. It is not a commercial-shipping, ECDIS, safety-of-life or fleet-operations offer, and its purpose does not include steering, piloting or remote control.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` (First go-to-market hypothesis: compatibility-assessed HUB + NAV installation for Galicia/Rías Baixas followed by AIS and weather cross-sell); `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2.1; `ASSUMPTION` on segment priority and price sensitivity; `OPEN` — no customer interviews or willingness-to-pay evidence exists (`X-06`).
- **Owner.** Commercial strategy with product management.
- **References.** `COMMERCIAL-PORTFOLIO.md` (bundle table and first go-to-market hypothesis); `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2.1; README §2; `X-06`.
- **Release readiness.** `availability = NOT_FOR_SALE`

#### B03 — Ideal customer
- **Definition.** Primary customer: the owner of a recreational sailing or motor vessel of roughly 8–18 m, kept in Galicia or northern Portugal, who already owns wind, depth, speed, heading or battery instruments of mixed generations, keeps a phone or tablet at the helm or in the cockpit and wants that data in one organised navigation workspace without replacing the electronics suite. Secondary: the owner preparing a refit who wants one local data layer before deciding on a fixed display or a traffic receiver. Tertiary: a small charter or sailing-school operator repeating the same simple integration across a few vessels. Buying triggers: an unreadable or fragmented helm; a new season's coastal cruising; a recent vessel purchase with an obsolete plotter; a refit that already hires an installer. Non-segment: anyone seeking ECDIS, certified bridge equipment, remote control, a transponder, guaranteed chart coverage or an installed-system price.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §01 (buyer/problem) and §02 (buyer/problem); `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (positioning); `ASSUMPTION` on segment priority and objections; `OPEN` — no primary customer research exists (`X-06`; MC-09/MC-10 would evidence it).
- **Owner.** Product marketing and commercial development.
- **References.** `COMMERCIAL-PORTFOLIO.md` §01–§02; `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2; README §7; `X-06`.
- **Release readiness.** `availability = NOT_FOR_SALE`

#### B04 — Vessel or organization applicability
- **Definition.** Applicable to a recreational sailing or motor vessel that (a) has at least one instrument or data source the published matrix can eventually match, (b) has a documented power arrangement for a HUB and a place to mount it, (c) has a customer-owned phone or tablet able to run the supported application version, and (d) is operated locally without requiring internet for the HUB's local data functions. Vessel voltage, consumption, mounting surface and ingress constraints are `OPEN` and must be confirmed by the installer assessment; nothing is assumed. Not applicable: commercial shipping, ECDIS/official-chart-system requirements, vessels whose only data family is NMEA 2000 (not implemented, not licensed, not offered), vessels requiring any autopilot or steering integration, vessels with no compatible source at all, and any organisation seeking multi-vessel fleet management (MAREA FLEET is a separate family). An organisation (charter, school, marina) applies only as one START configuration per vessel; there is no organisation entitlement in START.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §7.2 (the installer questionnaire that must resolve these fields); `ASSUMPTION` on the vessel-size band; `OPEN` — no power, mounting or environmental measurement exists; `BLOCKED` — HUB hardware not selected (`H-05`, `H-07`).
- **Owner.** Product management with the integration owner and service operations.
- **References.** `PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §7.1–§7.2; `H-04`, `H-05`, `H-07`, `X-06`; README §7.
- **Release readiness.** `hardware = NOT_SELECTED`

#### B05 — Main customer outcome
- **Definition.** The intended customer outcome is a working local vessel data layer plus a modern navigation surface on the customer's own device: existing instruments stay in place, and their wind, depth, speed and heading values are presented in MAREA NAV Pro overlays with source, timestamp and an explicit stale state; planning, a licensed chart area, waypoints, logbook and exportable records continue alongside. The customer should be able to say "my existing instruments now feed a modern navigation app, and I kept my electronics". The outcome explicitly excludes steering, autopilot, ECDIS status, guaranteed chart coverage, guaranteed data freshness and any claim that data exists when a source is missing: missing or stale values are shown as such, never interpolated.
- **Evidence.** `OPEN` — the outcome is intended end-state behaviour, not built or tested; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N10` live instrument overlays: `NOT_INCLUDED` in Essential, `INCLUDED` in Pro) and §3 (`H01`, `H06`, `H07`, `H15`); `VERIFIED_REPO docs/marea/products/MAREA-NAV-COMMERCIAL-SPEC.md` F04 domains 13–15; `BLOCKED` — `A-02`/`B-03`/`B-08` untested, chart rights absent (`D-01`–`D-03`); MC-13-NAV and MC-11A would evidence it.
- **Owner.** Product management with engineering (Navigation Software and HUB).
- **References.** `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N10`, `N20`) and §3 (`H01`, `H15`); `PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §6.2; `A-02`, `B-03`, `B-08`; `D-01`–`D-03`, `P-01`, `P-02`.
- **Release readiness.** `engineering = NOT_VERIFIED`

#### B06 — Mandatory base components
- **Definition.** Exactly two mandatory components, both separately licensed and separately purchased: (1) `HUB-STANDARD`, the base component that ingests the vessel's supported sources and publishes the documented local vessel interface; (2) `NAV-PRO`, the navigation application that consumes that interface and delivers the live onboard instrument overlays the bundle promises. Mandatory means "required for the reference configuration and for the promised outcome", not "included free in one price": the HUB is a hardware purchase, the NAV Pro is an annual subscription, and each keeps its own readiness, warranty and compatibility status. No third component is mandatory, and no component may be substituted silently.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §1.3, §2 and §3; `VERIFIED_REPO docs/marea/products/README.md` §2 and §8; `VERIFIED_REPO docs/marea/execution/DECISION-LOG.md` D-007; `HYPOTHESIS` on the commercial bundling of the two objects; `OPEN` — no bundle contract, no costed bundle BOM.
- **Owner.** Product management (bundle) with the NAV and HUB product directors.
- **References.** `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §1.3, §2 (`N10`), §3 (`H01`–`H08`); `COMMERCIAL-PORTFOLIO.md` §01–§02; README §2, §8; D-007.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B07 — Optional components
- **Definition.** The intended additions, each a separate commercial object, none included in the bundle hypothesis: `HUB-PRO` as an upgrade substitution for `HUB-STANDARD` (wider validated envelope plus installer tooling); `WEATHER-STANDARD` as a separate licensed subscription on the same customer account, never billed twice with a NAV entitlement (`D-013`); professional installation and commissioning, always quoted per vessel after assessment; external cabling, adapters and power items required by the surveyed installation; the customer's own phone or tablet; and a wider licensed chart region beyond the covered licence. For a complete physical installation the cabling/adapters/power items, the chart licence and the device are effectively required external objects of the customer's configuration even though they are optional purchases in the bundle's commercial surface; §1.1 records each with its exact class. No optional item is free, and no optional item may be presented as included.
- **Evidence.** `HYPOTHESIS` on the optional-commercial structure; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §3 (`H04`, `H13`), §2 (`N05`), §4 (`A15`); `VERIFIED_REPO docs/marea/products/README.md` §16 rule 7 and §25 rule 6 (no double billing); `OPEN` — no prices, no supplier terms; `BLOCKED` — `H-04`, `H-05`, `D-04`, `D-05`, `D-07`, `X-05`.
- **Owner.** Commercial strategy with product management.
- **References.** §1.1 lines S-04–S-10; `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2–§4; `D-013`; `COMMERCIAL-PORTFOLIO.md` price rule; `X-05`.
- **Release readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### B08 — Required product editions
- **Definition.** Required editions: `NAV-PRO` and `HUB-STANDARD`. Documented variant: `NAV-ESSENTIAL`, a lower-cost subscription that substitutes for `NAV-PRO` and does **not** deliver the promised live instrument overlays (`N10` `NOT_INCLUDED`); it is not the reference configuration and never additive. Upgrade substitution: `HUB-PRO`, the wider validated envelope plus installer tooling for mixed or older equipment. Never required, never selectable as part of START: `AIS-RECEIVER`, `AIS-CONNECTED` (`CONDITIONAL / NOT_YET_JUSTIFIED`), `DISPLAY-7`, `DISPLAY-LARGE-CONDITIONAL` (`NOT_ESTABLISHED`, never selectable), any PILOT, SENSE, WATCH or FLEET edition, and both WEATHER editions. No size, generation or performance variant of any component is offered by START.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §1.3, §2 (`N10`), §3 (`H04`), §4 (`AIS-CONNECTED` verdict); `VERIFIED_REPO docs/marea/products/README.md` §27 (`DISPLAY-LARGE-CONDITIONAL` never selectable); `HYPOTHESIS` on variant pricing; `OPEN` — no edition-level acceptance evidence.
- **Owner.** Product management with the edition owner.
- **References.** `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §1.3, §2, §3, §4.1; README §14, §27; `D-007`, `D-012`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B09 — Explicit exclusions
- **Definition.** START never includes and never implies: AIS receiver hardware or AIS-derived data retention/redistribution; MAREA DISPLAY 7 or MAREA DISPLAY Large (conditional, never selectable); PILOT hardware, software or any steering authority; SENSE modules; WATCH monitoring hardware or service; FLEET organisation subscriptions; installation labour, commissioning, mounts, antennas, VHF splitters, cabling, adapters or power items; NMEA 2000 implementation, licence or certification; ECDIS, ECDIS-class or official-chart-system status; guaranteed, unlimited or global chart coverage; internet-only operation (HUB local data is intended to work without cloud); any autopilot, actuator or remote-helm control path; charts, weather, tides or currents as free features; and any stock, availability, certification, review or delivery commitment. An exclusion is never a silent promise of later inclusion.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §5 (cross-product inclusion boundaries); `VERIFIED_REPO docs/marea/products/README.md` §7 claim rules and §10 (NAV exclusions); `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §10 non-claims; `OPEN` on any future product decision; `BLOCKED` — `H-08`, `H-11`, `P-07`.
- **Owner.** Product management with legal and claims.
- **References.** README §7, §10, §25; `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §5; `PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §10; `H-02`, `H-08`, `D-01`, `D-09`.
- **Release readiness.** `availability = NOT_FOR_SALE`

#### B10 — Dependency rules
- **Definition.** (1) NAV does not require the HUB: with device GNSS and a licensed chart area it works standalone, and no document may state that a HUB is needed to use NAV. (2) The HUB needs at least one compatible source and at least one consumer; it is not a navigation application and never includes a NAV licence. (3) The START outcome depends on a tested HUB→NAV local data path (`A-02`) or a tested HUB publish row (`B-08`), plus tested intake rows (`B-01`/`B-02` and the relevant validated family). (4) `NAV-PRO` is the consumer that presents overlays; `NAV-ESSENTIAL` cannot satisfy this dependency. (5) Chart data is an independent licensed entitlement per region; the NAV subscription never creates a chart right. (6) An optional WEATHER entitlement is independent and never double-billed (`D-013`). (7) Installation and any physical accessory are gated by the surveyed assessment. (8) No dependency creates inclusion: buying one product never includes another, and no row may be used as an implied bundle inclusion.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §6.1, §6.2, §6.6; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N23`, `N24`), §3 (`H22`), §5; `OPEN`/`BLOCKED` — every cited integration row is untested and the chart/weather rights do not exist (`D-01`–`D-07`, `H-04`, `P-02`).
- **Owner.** Integration owner (HUB Product Director) with product management.
- **References.** `A-02`, `A-03`, `B-01`, `B-02`, `B-03`, `B-08`; `N23`, `N24`, `H22`; `D-01`–`D-07`, `H-04`, `P-02`; D5 §6.
- **Release readiness.** `engineering = NOT_VERIFIED`

#### B11 — Compatibility criteria
- **Definition.** A START configuration is compatible only when a published matrix row covering the exact device, firmware/software version, data path, adapter and direction has been tested and reviewed. Protocol names, connector types, brands and sibling products never create compatibility; Signal K is not a blanket guarantee; NMEA 2000 is not implemented, licensed, certified or offered. The relevant rows today are `A-02` (NAV Pro ← HUB local interface, `UNKNOWN — NOT_TESTED`), `B-03` (HUB ← Signal K source, `UNKNOWN — NOT_TESTED`), `B-08` (HUB publishes local interface, `UNKNOWN — NOT_TESTED`), `A-01` (device GNSS, `UNKNOWN — NOT_TESTED`), `A-03` (direct instrument without HUB, `UNKNOWN — NOT_TESTED`) and `B-01`/`B-02` (HUB wind/GNSS intake, `UNKNOWN — NOT_TESTED`; parser unit tests only). **0 rows are `TESTED`.** Until a row is promoted, the only permitted answers are "not yet published", "requires specialist assessment", "not supported" or "not assessed"; no self-install eligibility can be returned.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §2.1, §2.3, §3, §4.1–§4.2, §5.2, §9.2, §10; `OPEN` — no device test, no firmware version, no adapter and no test record exists.
- **Owner.** Integration owner (HUB Product Director).
- **References.** `A-01`, `A-02`, `A-03`, `B-01`, `B-02`, `B-03`, `B-08`; `H-04`, `P-01`, `P-02`, `S-06`, `P-10`; D5 §2–§5, §9–§10.
- **Release readiness.** `engineering = NOT_VERIFIED`

#### B12 — Installation requirements
- **Definition.** START is intended to be installed through a surveyed route: a pre-quote vessel assessment, a documented mounting and power arrangement, connection of the supported sources to the HUB, configuration of the local interface and of NAV Pro, function and freshness checks, and a handover with the installation record, disclaimers, support route and export path. Self-install applies only where a validated deterministic rule confirms a documented low-risk configuration; no such rule exists today, so professional installation or installer-only retrofit is the intended route for every real configuration. Installation duration, price, stock, lead time and technician certification scheme are `OPEN`; no installer network or agreement exists, and no installation work is included in any bundle hypothesis.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §7.1–§7.4; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §02 (buying path: assisted compatibility configurator + installer-led quote); `OPEN` — no measured installation; `BLOCKED` — `X-05`, `X-06`, `X-02`, `H-05`.
- **Owner.** Service operations with the installer network.
- **References.** D5 §7.1–§7.4; `H-05`, `H-11`, `X-02`, `X-05`, `X-06`; §1.1 line S-06.
- **Release readiness.** `availability = NOT_FOR_SALE`

#### B13 — Software entitlements
- **Definition.** The intended software entitlements are: a MAREA NAV Pro application entitlement for the customer account, on the platforms supported by the published policy, with multi-device access as defined by the Pro edition; the MAREA HUB Standard included base software (local data gateway, local dashboard, diagnostics, configuration backup, updates during the warranty window); and the export of the customer's own routes, waypoints, passages, logbook and HUB configuration in documented formats, available before and after cancellation. Not included: a perpetual NAV licence, a chart or weather entitlement, a DISPLAY licence, an AIS entitlement, any third-party data subscription, or any entitlement to a product that is not in §1.1. No entitlement service, billing system or account system exists yet; the entitlement model is a specification requirement.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N09`, `N21`), §3 (`H14`, `H16`, `H17`, `H18`); `VERIFIED_REPO docs/marea/products/MAREA-NAV-COMMERCIAL-SPEC.md` F12; `OPEN` — no entitlement or billing implementation; `BLOCKED` — `H-13` (secure update/CRA), `X-05`.
- **Owner.** Commercial strategy with engineering and legal.
- **References.** `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2–§3; `MAREA-NAV-COMMERCIAL-SPEC.md` F07, F12, F19; `H-13`, `X-05`, `X-02`.
- **Release readiness.** `licensing = NOT_CLEARED`

#### B14 — Recurring subscriptions
- **Definition.** The only recurring subscription in the reference configuration is the MAREA NAV Pro annual subscription at the internal hypothesis EUR 149/year (VAT-inclusive consumer retail `HYPOTHESIS_UNAPPROVED`); the `NAV-ESSENTIAL` variant hypothesis is EUR 99/year. Renewal is annual; the renewal price hypothesis is the same list price unless a lawful advance notice changes it. An optional `WEATHER-STANDARD` subscription (hypothesis from EUR 49/year, VAT basis `OPEN`) is a separate licensed service on the same account and the same entitlement is never billed twice across NAV and WEATHER (`D-013`). No subscription exists for the HUB. A lapsed or failed NAV payment must not disable local HUB data functions, local diagnostics, local alarms or any safety-relevant independent function (`README.md` §16 rule 7). No billing, dunning, grace or refund policy is approved.
- **Evidence.** `HYPOTHESIS` — the NAV and WEATHER figures; `VERIFIED_REPO docs/marea/products/README.md` §8, §16 rule 7, §26; `VERIFIED_REPO docs/marea/execution/DECISION-LOG.md` D-013; `OPEN` — no billing service, no renewal cohort, no terms review.
- **Owner.** Commercial strategy with finance and legal.
- **References.** `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §1.3; README §8, §16, §26; `D-013`; `COMMERCIAL-PORTFOLIO.md` price rule; §1.1 lines S-02, S-03, S-05.
- **Release readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### B15 — External data and connectivity
- **Definition.** START depends on external data and connectivity that the bundle does not own: a licensed chart entitlement per region (`D-01`–`D-03`); licensed tides and currents where shown (`D-10`); an optional licensed weather entitlement (`D-04`, `D-05`, `D-07`); and the customer's device GNSS. On board, the intended design is local-first: the HUB's local data functions and local dashboard do not require internet, and loss of the commercial website connection must not interrupt them (`PRODUCT-EDITIONS-NAV-HUB-AIS.md` §3 `H15`). Internet is required only for account, purchase, updates and optional services; no connectivity, mobile coverage, Wi-Fi quality, SIM/data plan or provider availability is included or guaranteed, and NAV offline use is limited to regions where the data licence permits it.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N04`, `N05`, `N14`, `N17`), §3 (`H15`); `BLOCKED` — no chart, tide or weather right (`D-01`–`D-07`, `D-10`); `OPEN` — no connectivity design reviewed.
- **Owner.** Product management with marine data licensing.
- **References.** `D-01`–`D-07`, `D-10`, `DEC-02`, `DEC-03`; `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2–§3; D5 §6.
- **Release readiness.** `dataRights = NOT_GRANTED`

#### B16 — Commissioning and onboarding
- **Definition.** Intended first use: unbox and confirm the HUB contents against the printed list; install and power the HUB within the documented installation; connect only the documented source or adapter; install MAREA NAV on the customer device, create the account and sign in; select the vessel profile; confirm the chart coverage held and its region; run the source and freshness check; confirm that supported instrument values appear with source and timestamp in NAV Pro; complete a short safety briefing that restates the disclaimers and explains what to do when a source is missing or stale; and produce a readable commissioning record for support. The HUB must not require an internet connection to complete local commissioning. The onboarding flow, manuals and first-run diagnostics do not exist and are `OPEN`.
- **Evidence.** `OPEN` — onboarding UX, manuals and commissioning record not built; `ASSUMPTION` on the sequence; `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §7.4 (handover contents); `BLOCKED` — no HUB hardware (`H-05`).
- **Owner.** UX, content and localisation with support engineering.
- **References.** D5 §7.4; `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §3 `H11`–`H14`; README §6 F11 pattern; `X-06`.
- **Release readiness.** `engineering = NOT_VERIFIED`

#### B17 — Warranty and support
- **Definition.** Intended support model: a support channel and a defined support period for the NAV subscription, and a warranty window for the HUB article, with statutory consumer guarantees applying when a product is lawfully sold. Warranty length, conditions, exclusions, RMA carriage, response times, escalation paths, spare-parts availability and the seller's legal identity are `OPEN`; no SLA, uptime, response time, repair time or warranty duration may be stated or implied. The installer remains responsible for workmanship within the documented scope, and the handover record is the basis for any support case. Support never converts an unverified compatibility claim into a supported one, and support data is governed by the privacy policy that does not yet exist.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §02 (warranty as a quality gate); `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §7.4; `OPEN` — no warranty terms, no SLA, no legal seller identity; `BLOCKED` — `X-02`, `X-05`, `H-13`.
- **Owner.** Support operations with legal and commercial strategy.
- **References.** `COMMERCIAL-PORTFOLIO.md` §02; D5 §7.4; `X-02`, `X-05`, `H-13`, `P-10`.
- **Release readiness.** `availability = NOT_FOR_SALE`

#### B18 — Channel and fulfilment
- **Definition.** Intended channel: direct sale by EMBARCARTE for the software subscription, with an installer-led route for the HUB and for any configuration requiring physical work; the installer assesses the vessel, proposes the configuration and installation, executes the work, commissions it and hands over the record. EMBARCARTE owns the product definition, the compatibility authority, the included base software, warranty and support policy; the installer owns the vessel assessment, mechanical and electrical work, commissioning and first-line support. Fulfilment, packaging, shipping, return logistics, stock, lead times, payment processing, installer margin, distributor terms and referral terms are all `OPEN`; no channel agreement, commission percentage or margin exists, and no stock or delivery date may be stated.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` (price and channel decision rule; first go-to-market hypothesis); `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §7.1; `OPEN` — no channel terms; `BLOCKED` — `X-05`, `X-06`.
- **Owner.** Commercial development with service operations.
- **References.** `COMMERCIAL-PORTFOLIO.md`; D5 §7; `X-05`, `X-06`; §1.1 S-06.
- **Release readiness.** `availability = NOT_FOR_SALE`

#### B19 — Price hypothesis and quotation model
- **Definition.** The historical bundle hypothesis is **EUR 499**, `HYPOTHESIS_UNAPPROVED`. The internal reference configuration's first-year component-hypothesis sum is 149 (NAV Pro, year 1) + 349 (HUB Standard) = **498** (VAT-inclusive hypotheses), against the historical 499. The figure can be plausible **only** as an uninstalled, product-only, first-year starting figure: it excludes installation labour, cabling/adapters/power items, the compatibility survey and assessment, channel margin or installer compensation, and chart rights beyond the licensed region, and it is a first-year figure to which a NAV renewal applies after year 1. It is not an installed-system price, not a quotation, not a "from" offer and not a discount. Verdict: `HYPOTHESIS_UNAPPROVED`; **installed-solution price `NOT_ESTABLISHED`**; no BOM and no supplier cost exists. The quotation model is per-vessel: configuration + installation + external items itemised, with no invented figure.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` (bundle table EUR 499; "No bundle price is approved for publication as purchasable until bottom-up costing"); `HYPOTHESIS` — EUR 149, EUR 349 and EUR 499; `VERIFIED_REPO docs/marea/products/README.md` §8; `OPEN`/`BLOCKED` — no BOM, no supplier quote, no channel terms, no chart price, no measured installation (`X-05`).
- **Owner.** Commercial strategy and pricing with finance.
- **References.** `COMMERCIAL-PORTFOLIO.md` bundle table and price rule; README §8; `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §1.3, §2.1; `X-05`; §1.1 lines S-02, S-06, S-07, S-09; `docs/marea/bundles/BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`.
- **Release readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### B20 — Cost and margin assumptions
- **Definition.** Only a symbolic framework exists, with named inputs and no computed result: VAT-inclusive retail → net revenue = retail / (1 + applicable VAT rate); contributions from hardware (BOM, assembly, test, packaging, shipping/fulfilment, payment fees, warranty accrual, returns allowance, technical and installer support, firmware maintenance, conformity programme) and from software (chart/weather/tide data licensing per active user, hosting, support, payment fees, acquisition) and from services (measured installation time, installer day rate, commissioning, travel). Any bundle discount must be the standalone product contribution less shared cost saving less channel margin, never an arbitrary marketing subtraction. No margin, markup, BOM, supplier quotation, channel percentage or willingness-to-pay figure is asserted, because none exists.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` price and channel decision rule and §02 quality gates; `VERIFIED_REPO docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL.md` §12 (bundle boundary); `ASSUMPTION` on the cost categories; `BLOCKED` — `X-05`, `H-05`, `H-06`, `H-07`.
- **Owner.** Finance and procurement with commercial strategy.
- **References.** `COMMERCIAL-PORTFOLIO.md` price rule; `PRODUCT-PRICING-AND-CHANNEL-MODEL.md` §12; `X-05`, `H-05`, `H-06`, `H-07`; `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`.
- **Release readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### B21 — Upgrade and migration
- **Definition.** Intended upgrade paths: `NAV-ESSENTIAL` → `NAV-PRO` (restores the live instrument overlays the outcome needs; mid-term upgrade price difference pro-rata is `OPEN`); `HUB-STANDARD` → `HUB-PRO` (wider validated envelope and installer tooling, not a power claim); and later cross-sells to AIS, DISPLAY or WEATHER as separate products. There is no path that converts START into another bundle, no automatic inclusion of a future product, no migration that preserves an unverified compatibility claim, and no downgrade entitlement defined. Ownership transfer of the HUB on sale of the vessel is intended as a base support requirement; device identity and transfer mechanics do not exist (`X-07`). Customer records and configuration must remain exportable through any migration.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2 (`N10`), §3 (`H04`, `H17`); `HYPOTHESIS` on upgrade mechanics; `OPEN` — no upgrade or transfer implementation; `BLOCKED` — `X-07`, `X-05`.
- **Owner.** Product management with commercial strategy.
- **References.** `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §2–§3; README §16 rule 7; `X-05`, `X-07`; §1.1 lines S-03, S-04.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### B22 — Customer acceptance criteria
- **Definition.** Customer acceptance for START is defined only as future evidence: a named, reviewable artefact per criterion, produced after a built configuration exists. The criteria cover configuration identity, the NAV Pro dependency for overlays, a recorded HUB→NAV integration test with source/timestamp/stale behaviour, recorded retention of the existing instruments, edition-difference evidence, export before and after cancellation, honest licensed-chart states, absence of any steering path, per-vessel installation quotation, the uninstalled-only reading of the price hypothesis, copy compliance (24 sections, disclaimers, no prices, no purchase CTA) and an independent claims review. The twelve criteria are enumerated in §9 (AC-START-01 to AC-START-12).
- **Evidence.** `VERIFIED_REPO` this document §9; `OPEN` — none of the criteria is satisfied; the evidence would come from MC-11 (hardware), MC-11A (account/entitlement), MC-13-NAV (navigation acceptance), MC-16A (security/updates) and independent review.
- **Owner.** Product governance and QA with the independent reviewer.
- **References.** §9 AC-START-01–AC-START-12; `PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §5.2; `P-01`, `P-02`, `P-10`, `H-05`, `H-13`.
- **Release readiness.** `engineering = NOT_VERIFIED`

#### B23 — Release readiness and blockers
- **Definition.** START is not releasable and not sellable at MC-08. The definitions are complete, but engineering is `NOT_VERIFIED`, licensing `NOT_CLEARED`, hardware `NOT_SELECTED`, data rights `NOT_GRANTED`, compliance `NOT_STARTED`, pricing `HYPOTHESIS_UNAPPROVED`, brand publication `NOT_GRANTED` and availability `NOT_FOR_SALE`. The binding blockers are `H-02` (no steering-control reuse; START has no control path), `H-04`, `H-05`, `H-07`, `H-13`, `P-01`, `P-02`, `P-10`, `S-06`, `D-01`–`D-06`, `D-08`, `D-10`, `X-01`, `X-02`, `X-05` and `X-06`. No price is approved, no compatibility row is tested, no image exists, the brand is not cleared, the source IP is not cleared and no publication or purchase path may be enabled. Release requires an independent review of the real artefacts, not of this summary.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §1, §4, §9, §12–§13; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` §9; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §5–§6; `OPEN`/`BLOCKED` — all listed blockers remain open.
- **Owner.** Product governance and QA with the Lead.
- **References.** README §1, §4, §9; `PRODUCT-EDITIONS-NAV-HUB-AIS.md` §9; `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §5–§6; all blocker ids in this line.
- **Release readiness.** `availability = NOT_FOR_SALE`

#### B24 — ES/EN content and visual references
- **Definition.** Customer-facing content for START exists only as internal draft copy in `docs/marea/bundles/copy/start.es.md` (Spain Spanish) and `docs/marea/bundles/copy/start.en.md` (natural international English). Both follow the 24 numbered sections fixed for MC-08, carry the approved navigation disclaimer verbatim in their own language, never translate bundle or product names, contain no currency amount, no price, no stock, no review, no certification, no availability claim and no enabled purchase call to action, and use only future-intention CTAs (verify compatibility, request a vessel survey, request a professional installation quotation, explore the configuration, ask about installation). Visual references point to `docs/marea/bundles/BUNDLE-ASSET-REQUIREMENTS.md`; no image generation is executed, no photograph or CGI may be claimed as existing, every scene requirement remains blocked while `X-03` is open, and any asset is `CONCEPT`, never a real-product visual.
- **Evidence.** `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9 (verbatim disclaimers); `VERIFIED_REPO docs/marea/products/README.md` §7 rule 9–10 and §22; `VERIFIED_REPO docs/marea/execution/DECISION-LOG.md` D-014; `OPEN` — copy is an internal draft and no asset file exists.
- **Owner.** UX, content and localisation with brand governance.
- **References.** `copy/start.es.md`, `copy/start.en.md`; `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9; README §7, §22; `BUNDLE-ASSET-REQUIREMENTS.md`; `X-03`.
- **Release readiness.** `brandPublication = NOT_GRANTED`

---

## 11. Document status and non-assertions

- This document is internal, `NOT PUBLISHED` and `NOT FOR SALE`. It creates no orderable SKU, no quotation, no
  compatibility certification, no price approval and no product family.
- The reference configuration is `HUB-STANDARD` + `NAV-PRO`; `NAV-ESSENTIAL` is a documented lower-cost variant
  and does not deliver live instrument overlays; the HUB is not required by NAV standalone; buying any product
  never includes another product.
- The compatibility position is unchanged by this document: **0 rows are `TESTED`**, every relevant row is
  `UNKNOWN — NOT_TESTED` or `BLOCKED`, and no configuration is eligible today.
- AIS is receive-only and is not part of START; DISPLAY, PILOT, SENSE, WATCH and FLEET are not part of START;
  NMEA 2000 is not implemented, licensed or certified; NAV is a navigational aid, never ECDIS.
- The historical EUR 499 figure remains `HYPOTHESIS_UNAPPROVED`: it can only describe an uninstalled,
  product-only, first-year starting hypothesis; the installed-solution price is `NOT_ESTABLISHED` and no BOM or
  supplier cost exists.
- Publication, pricing approval, compatibility evidence, brand clearance and source-IP clearance are all outside
  this document and remain open; no claim here may be used as evidence that START is available, certified,
  approved or purchasable.
