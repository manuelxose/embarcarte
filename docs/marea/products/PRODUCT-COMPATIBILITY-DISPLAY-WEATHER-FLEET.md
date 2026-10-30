# MAREA DISPLAY · MAREA WEATHER · MAREA FLEET — Compatibility and ecosystem contract (MC-07 / D5)

| Field | Value |
| --- | --- |
| Document ID | MC-07 / D5-COMPATIBILITY-DISPLAY-WEATHER-FLEET |
| Milestone | MC-07 (Master Prompt 07/36) — product definitions batch 3 |
| Date | 2026-10-30 |
| Owner function | Security architecture and ecosystem compatibility author (AGENT D), with the DISPLAY, WEATHER and FLEET product owners and the integration owners of each family |
| Status | `INTERNAL_ONLY` · `NOT_PUBLISHED` · `NOT_FOR_SALE` · products `DEFINED` |
| Products covered | `DISPLAY` MAREA DISPLAY (DISPLAY-7, DISPLAY-LARGE-CONDITIONAL); `WEATHER` MAREA WEATHER (WEATHER-STANDARD, WEATHER-PRO); `FLEET` MAREA FLEET (FLEET-START, FLEET-BUSINESS, FLEET-ENTERPRISE) |
| Governing contract | `C:\Users\Admin\Documents\workspace\mc07-brief.md` §9 (frozen integration baseline), §10 (WEATHER entitlement), §11 (FLEET tenancy), §12 (DISPLAY hardware boundary), §14 (claim restrictions), §17 (batch-03 claim rules); `docs/marea/products/README.md` §7, §16, §19, §21 |
| Binding inputs | `docs/marea/products/MAREA-DISPLAY-COMMERCIAL-SPEC.md` §6; `docs/marea/products/MAREA-WEATHER-COMMERCIAL-SPEC.md` F09 (governing on weather capability); `docs/marea/products/MAREA-FLEET-COMMERCIAL-SPEC.md` F09; `docs/marea/products/FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md` (tenancy, evidence and data-governance detail); `docs/marea/products/MAREA-PILOT-COMMERCIAL-SPEC.md`, `MAREA-SENSE-COMMERCIAL-SPEC.md`, `MAREA-WATCH-COMMERCIAL-SPEC.md`, `MAREA-NAV-COMMERCIAL-SPEC.md`, `MAREA-HUB-COMMERCIAL-SPEC.md`, `MAREA-AIS-COMMERCIAL-SPEC.md` |
| Precedents | `docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` (batch-01 D5); `docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` (batch-02 D5). This document extends both and never contradicts them; where a batch-01 or batch-02 row already governs a pair, that row governs and is referenced here, not restated |
| Blocker register | `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`: `D-01`, `D-04`, `D-05`, `D-06`, `D-07`, `D-09`, `D-10`, `H-01`, `H-04`, `H-05`, `H-08`, `H-11`, `H-12`, `P-02`, `P-03`, `P-06`, `P-07`, `P-08`, `P-09`, `P-10`, `X-01`, `X-05`, `X-07` |
| Nature | Internal pre-contractual compatibility contract. Not a catalogue, not a product page, not a certification, not an availability statement, not an offer |

**These are definitions, not availability, and not compatibility evidence.** No row in this document is a
compatibility claim a customer may act on. **Zero rows are `SUPPORTED`**: no device, firmware version, cable,
adapter, message capture, entitlement implementation or end-to-end test exists in the evidence base for any
integration below. `DISPLAY` has no manufactured unit (`H-11`, `P-07`; `SIZE_NOT_FROZEN`,
`HARDWARE_NOT_SELECTED`, `BOM_NOT_ESTABLISHED`). `WEATHER` provider rights are `NOT_GRANTED` (`D-04`, `D-05`,
`D-07`, `D-10`). `FLEET` is a design with no deployed multi-tenant service (`P-09`, `X-07`). A row that reads
`PLANNED`, `CONDITIONAL`, `UNKNOWN` or `BLOCKED` is a specification of intent, a named condition or a recorded
gap — never evidence that anything works.

**Validator limit.** The MC-07 validator can confirm that this document contains the required tables, columns,
status tokens and evidence labels. It cannot test a device, cannot run a service, cannot observe a data path and
cannot create compatibility evidence. **Specification presence is not runtime compatibility.**

---

## 0. Contents

1. Purpose, status and the governing rules
2. The canonical integration matrix — exactly ten columns
3. Coverage map — every ordered pair accounted for
4. Frozen batch-03 baseline reconciliation (brief §9, row by row)
5. Batch-01 and batch-02 promises this document does not change
6. Commercial inclusion and exclusion per integration
7. Data rights and entitlement gates
8. Safety boundaries and absolute exclusions
9. Customer-facing compatibility questions — the only permitted answers
10. Unknown and blocked register — exact conditions that promote a row
11. Promotion, demotion and review rules
12. Non-claims — assertions prohibited in every surface
13. Status statement, evidence limits and related documents
14. Document control

---

## 1. Purpose, status and the governing rules

### 1.1 What this document decides

- the single matrix that states, for every relationship between DISPLAY, WEATHER and FLEET and every other MAREA
  family (including the relationships among the three new families), what each side requires, which direction data
  flows, where the local/cloud line sits, what the safety boundary is, what evidence exists and which gate would
  release the row;
- the one compatibility status vocabulary every batch-03 document, page, support reply and quotation must use;
- the reconciliation of the frozen brief §9 statuses with the batch-01 and batch-02 compatibility registers, so
  that no earlier promise is silently changed;
- the plain-language answers a buyer may be given, and the questions they must answer before any compatibility
  opinion is issued;
- the prohibited directions and assertions that no document, page or support reply may introduce.

It does **not** decide edition contents (the editions authority document governs), prices (the batch-03 pricing
document governs), customer journeys, copy, the machine-readable contract, or any conformity, certification, test
result or hardware specification.

### 1.2 The governing rules — read before every other section

1. **Unknown compatibility is stated as unknown.** A protocol name, a connector, a brand, a sibling product or an
   optimistic installer does not create compatibility (README §7 rule 4, §19).
2. **No product may be sold from an untested compatibility assumption.** A sale requires a published row with a
   recorded test and an independent reviewer — not a specification that promises to test later.
3. **Every row today is `PLANNED`, `CONDITIONAL`, `UNKNOWN` or `BLOCKED`.** `SUPPORTED` requires a
   `DEVICE_TEST_RECORDED` evidence entry with a named configuration and reviewer. **No such entry exists for any
   row in this document.**
4. **No row is a certification.** A tested row is a statement about one configuration; it is not CE marking, not
   NMEA certification, not type approval, not a security certification and not a safety guarantee.
5. **No row introduces a steering, motor, throttle or actuator command path.** PILOT mode engagement stays local,
   inside the independently validated PILOT boundary; no cloud, remote, app or display-to-actuator command may
   exist (README §16 rule 1, §19; architecture §5.2 X-1/X-3/X-4).
6. **Subscription isolation is a design requirement.** No entitlement, payment failure or subscription lapse may
   disable local steering, local alarms, valid local sensing or any safety-relevant independent function
   (README §16 rule 7). This is designed, not tested.
7. **A licence is never transferred by an integration.** Charts, weather data, basemaps and AIS-derived data are
   licensed entitlements with their own rights and exclusions (`D-01`, `D-05`, `D-06`, `D-09`, `D-10`).
8. **Batch-01 and batch-02 promises are immutable here.** Where those documents already govern a pair, this
   document references the governing row and records the batch-03 view without changing the earlier status. A
   row may be added; it may not silently promote, demote or reinterpret an earlier row.

### 1.3 Status vocabulary (the only five values permitted)

| Status | Meaning | What it may be shown as | Rows today |
| --- | --- | --- | ---: |
| `SUPPORTED` | A recorded test exists for the exact configuration (device, firmware/software version, direction, adapter, record, reviewer) | A published compatibility statement, with its limitations | **0** |
| `CONDITIONAL` | The intended path is further gated by a stated external condition (right, contract, certificate, provider terms, hardware) | "Conditional on <named condition>" | 9 |
| `PLANNED` | The intended path is defined and a named milestone will produce the evidence; nothing is tested | "Intended, pending validation" — never "works" | 3 |
| `UNKNOWN` | No assessment exists, or no product surface is defined | "Not assessed; requires specialist assessment" — **never** "supported" | 8 |
| `BLOCKED` | An external decision, right or physical article prevents even assessment or testing | "Blocked by <named external condition>; not available" | 1 |

Row count at issue: **21 integration rows — 0 `SUPPORTED`, 9 `CONDITIONAL`, 3 `PLANNED`, 8 `UNKNOWN`, 1 `BLOCKED`.**
This is honest evidence of definition completeness, not of readiness. The batch-03 statuses frozen in brief §9 are
reproduced exactly; the unknown rows for pairs not frozen there (WEATHER–AIS, WEATHER–SENSE, WEATHER–PILOT,
WEATHER–WATCH, DISPLAY–FLEET) are `UNKNOWN` and exist so that nobody fills the gap by assumption.

### 1.4 Evidence classes recorded per row

| Class | Use in this document |
| --- | --- |
| `VERIFIED_REPO` | A file in this repository states the fact (brief, README, dossier, MC-02 audit) |
| `VERIFIED_EXTERNAL` | A cited public source with the check date 2026-10-30 (used for provider terms only where the source is cited here; this document asserts no provider right) |
| `ASSUMPTION` | An explicit planning assumption, labelled as such, never evidence |
| `HYPOTHESIS` | A commercial assumption awaiting authorisation (editions, prices) |
| `OPEN` | The intended experience is specified but not built, not tested, not measured |
| `BLOCKED` | An external condition prevents closure; the condition is named |

Plus the device-test state used by the batch-01 register, reused unchanged: `NONE`, `CODE_ONLY`,
`COMPONENT_UNIT_TEST_ONLY`, `DEVICE_TEST_RECORDED`. Only `DEVICE_TEST_RECORDED` can support `SUPPORTED`. MC-02
audit evidence is `VERIFIED_REPO` evidence of *what was built*, never of *what works with a device*.

Evidence for §1: `VERIFIED_REPO docs/marea/products/README.md` §5, §7, §16, §19, §21;
`VERIFIED_REPO mc07-brief.md` §9.

---

## 2. The canonical integration matrix — exactly ten columns

Column order, exactly as fixed by the batch-02 contract and brief §17: **Integration | Required product | Required
edition | Required accessory | Required subscription | Data direction | Local/cloud boundary | Safety boundary |
Current evidence | Release gate.** The status is the leading token of the *Integration* cell so that the column set
stays exactly as fixed. No extra column is added; commercial inclusion/exclusion is handled in §6.

### 2.1 Group A — `DISPLAY` as subject (all other eight families)

| Integration | Required product | Required edition | Required accessory | Required subscription | Data direction | Local/cloud boundary | Safety boundary | Current evidence | Release gate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `N-01` `CONDITIONAL` DISPLAY ← HUB (onboard data and instrument presentation) | DISPLAY + HUB | DISPLAY-7 (DEFINED) or DISPLAY-LARGE-CONDITIONAL (CONDITIONAL); HUB-STANDARD or HUB-PRO | Surveyed local data interface; adapter class `OPEN` | None required on the DISPLAY side | HUB → DISPLAY, read-mostly vessel data | Local to the vessel; no cloud component required | HUB is a data gateway, never an actuator controller; no steering or motor path | `OPEN` — no DISPLAY hardware, no validated HUB–DISPLAY integration; `NONE` device-test (`H-04`, `P-07`, `P-02`) | Tested model/firmware/direction matrix + recorded integration test; HUB hardware and protocol freeze (`H-05`, `H-07`) |
| `N-02` `PLANNED` DISPLAY ← NAV (navigation presentation on the device) | DISPLAY + NAV | DISPLAY-7 / DISPLAY-LARGE-CONDITIONAL; NAV-ESSENTIAL or NAV-PRO | None beyond the display's own verified position source; source class `OPEN` | NAV subscription required for NAV features; DISPLAY purchase never includes NAV | NAV software → DISPLAY presentation surface | Local presentation; licensed chart data follows its own cloud/licence path | NAV is a navigational aid; DISPLAY is not ECDIS/ECDIS-equivalent and never gains control authority | `OPEN` — NAV is software, DISPLAY is a device; no interface contract implemented; `NONE` (`P-01`, `P-07`, `P-10`) | Interface contract, implemented build, recorded end-to-end presentation test; neither product includes the other |
| `N-03` `CONDITIONAL` DISPLAY ← AIS (received traffic presentation) | DISPLAY + AIS | DISPLAY-7 / DISPLAY-LARGE-CONDITIONAL; AIS-RECEIVER or AIS-CONNECTED | Receive-only receiver, antenna/splitter chain (separate purchase); local output class `OPEN` | None; a receiver is a separate hardware product | AIS → DISPLAY, receive-only targets | Local to the vessel; no internet exposure; AIS-derived retention/redistribution not granted (`D-09`) | Receive-only, incomplete by nature; not collision avoidance; not a transponder; target age always shown; AIS disclaimer mandatory | `OPEN` — receiver hardware and integration absent; `NONE` (`H-08`, `P-03`, `D-09`) | Tested receiver model/firmware and recorded target-presentation test; AIS data-rights decision |
| `N-04` `CONDITIONAL` DISPLAY ← WEATHER (licensed weather layers) | DISPLAY + WEATHER | DISPLAY-7 / DISPLAY-LARGE-CONDITIONAL; WEATHER-STANDARD or WEATHER-PRO | None; the data path is the WEATHER service | WEATHER entitlement required (separate licensed service); never included in DISPLAY | WEATHER → DISPLAY, display-only data | Cloud entitlement to the licensed service; local cache only within provider terms | Forecasts are probabilistic; source, issue time and validity shown; a stale forecast is never presented as current; no provider right is implied | `OPEN` — provider rights `NOT_GRANTED`; no entitlement service; `NONE` (`D-05`, `D-07`, `D-10`) | Written provider terms per variable and area + entitlement implementation + recorded display test |
| `N-05` `CONDITIONAL` DISPLAY ← SENSE (measurement presentation) | DISPLAY + SENSE | DISPLAY-7 / DISPLAY-LARGE-CONDITIONAL; any SENSE module | Module mounting/cabling; adapter class `OPEN` | None for local measurement | SENSE → DISPLAY, read-only measurements | Local to the vessel | Only validated measurements with source, units, quality and freshness; an uncalibrated/stale value is shown invalid, never as reliable | `OPEN` — no tested sensor path; SENSE measurement `NOT_MEASURED`; `NONE` (`H-04`, `P-05`) | Tested sensor matrix + recorded measurement-presentation test |
| `N-06` `UNKNOWN` DISPLAY ← PILOT (read-only status/alarms at most) | DISPLAY + PILOT | DISPLAY-7 / DISPLAY-LARGE-CONDITIONAL; PILOT-COASTAL/SAIL/Pro as quoted | None; a future read-only interface | None on the DISPLAY side | PILOT → DISPLAY, read-only status at most | Local only; no remote path | **No steering authority, no mode engagement, no control head, no remote or web pilot path**; PILOT safety gate `BLOCKED` (`H-01`, `P-04`) | `BLOCKED` — PILOT safety gate `BLOCKED`; no interface exists; `NONE` | A future read-only interface authorised inside the PILOT safety boundary, after independent validation and privacy review |
| `N-07` `UNKNOWN` DISPLAY ← WATCH (monitoring context, if ever defined) | DISPLAY + WATCH | DISPLAY-7 / DISPLAY-LARGE-CONDITIONAL; WATCH-CORE (WATCH-PLUS CONDITIONAL) | None defined | WATCH subscription required for any remote view | WATCH → DISPLAY, read-only context at most | Local capture then cloud; no data path defined in DISPLAY | Read-only context only; WATCH never steers, never becomes a display function and is not a distress service | `OPEN` — no interface defined in DISPLAY; WATCH service `NOT_FOUND`; `NONE` (`P-06`) | A defined interface contract and a recorded read-only test; WATCH pipeline evidence |
| `N-08` `UNKNOWN` DISPLAY ← FLEET (fleet operations surface on the device) | DISPLAY + FLEET | DISPLAY-7 / DISPLAY-LARGE-CONDITIONAL; FLEET-START/BUSINESS/ENTERPRISE as contracted | None defined | FLEET contract if any organisational surface were ever added | FLEET → DISPLAY, read-only at most (no direction defined) | No integration defined; FLEET is a shore SaaS | FLEET never commands a vessel and has no control path; no display integration may imply one | `OPEN` — FLEET has no defined display integration; FLEET multi-tenant service `NOT_FOUND`; `NONE` (`P-09`, `X-07`) | A product decision, an interface contract and recorded read-only test evidence; until then FLEET must not imply a DISPLAY integration |

### 2.2 Group B — `WEATHER` as subject (excluding the DISPLAY pair already in Group A)

| Integration | Required product | Required edition | Required accessory | Required subscription | Data direction | Local/cloud boundary | Safety boundary | Current evidence | Release gate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `N-09` `PLANNED` WEATHER ← NAV (entitlement sharing and route context) | WEATHER + NAV | WEATHER-STANDARD or WEATHER-PRO; NAV-PRO for the intended overlay capability (NAV-ESSENTIAL context `OPEN`) | None; the path is the account entitlement | One WEATHER entitlement on the same customer account; **the same entitlement is never billed twice across NAV and WEATHER** (brief §10) | WEATHER → NAV (licensed data); NAV route/position context → WEATHER for local forecast context, only if a future interface exists | Cloud entitlement; local display; the entitlement ledger is the single source | Forecasts are probabilistic; source, issue time and validity shown; a lapsed entitlement shows honest "unavailable", never a fabricated or frozen forecast as current | `OPEN` — provider rights `NOT_GRANTED`; entitlement sharing and billing service not implemented; `NONE` (`D-04`, `D-05`, `D-07`, `D-10`) | Written provider terms + entitlement implementation + a two-account no-double-billing test; NAV Pro inclusion depends on provider rights |
| `N-10` `CONDITIONAL` WEATHER ← HUB (local vessel/instrument context) | WEATHER + HUB | WEATHER-STANDARD/PRO; HUB-STANDARD or HUB-PRO | Surveyed local interface; adapter class `OPEN` | None on the WEATHER side beyond the data service | HUB → WEATHER, read-only position/instrument context | Local context, cloud forecast service | Context is not an alert cause and never justifies a safety claim; no invented protocol compatibility | `OPEN` — HUB hardware/protocol matrix absent; no integration defined; `NONE` (`H-04`, `P-02`) | HUB hardware and protocol freeze + a defined WEATHER context contract + recorded test |
| `N-11` `UNKNOWN` WEATHER ← AIS (traffic-derived weather context) | WEATHER + AIS | — (no edition defines an AIS surface in WEATHER) | — | — | AIS → WEATHER (not defined) | — | AIS-derived data may not be redistributed or repurposed (`D-09`); AIS is receive-only | `OPEN` — batch-02 row `I-23` governs and stays `UNKNOWN`; no product decision | A product decision **and** a written AIS data-rights/retention position (`D-09`, `MD-24`) |
| `N-12` `UNKNOWN` WEATHER ← SENSE (local measurement vs forecast comparison) | WEATHER + SENSE | — (no edition defines a comparison surface) | — | — | SENSE → WEATHER (not defined) | — | A measurement without calibration state is not data; no accuracy figure may be inferred or published | `OPEN` — no surface defined in either dossier; no measurement evidence (`P-05`) | A product decision, calibration/measurement evidence and a defined comparison surface |
| `N-13` `UNKNOWN` WEATHER ← PILOT (forecast context for passage/steering planning) | WEATHER + PILOT | — (no pilot surface defines weather context) | — | — | WEATHER → PILOT (not defined) | — | Weather context is advisory only; it never engages a mode, never alters steering and never substitutes for watchkeeping | `OPEN` — no interface defined; PILOT safety gate `BLOCKED` (`H-01`, `P-04`) | A PILOT safety-case decision that explicitly excludes any control influence + a defined context surface |
| `N-14` `UNKNOWN` WEATHER ← WATCH (forecast context in alerts/history) | WEATHER + WATCH | — (no WATCH surface defines weather context) | — | — | WEATHER → WATCH (not defined) | Cloud-to-cloud at most | Forecast context is not an alert cause and never justifies a safety claim; WATCH is not a distress service | `OPEN` — batch-02 row `I-21` governs and stays `UNKNOWN`; WATCH pipeline `NOT_FOUND` (`P-06`) | A WATCH surface decision + provider rights + a recorded context test |
| `N-15` `CONDITIONAL` WEATHER ← FLEET (fleet-wide weather context for operations) | WEATHER + FLEET | WEATHER-STANDARD/PRO; FLEET-START/BUSINESS/ENTERPRISE as contracted | None; the data path is the entitlement and the FLEET contract | WEATHER entitlement for the weather data; FLEET contract for the organisational surface | WEATHER → FLEET, read-only operational context | Cloud entitlement and cloud SaaS | Forecast context is advisory; it never justifies a safety claim and FLEET never commands a vessel; operational use must be permitted by provider terms | `OPEN`/`BLOCKED` — provider rights `NOT_GRANTED` for B2B operational use; FLEET service `NOT_FOUND`; `NONE` (`D-05`, `D-10`, `P-09`) | A written provider agreement permitting B2B operational use for the named variables/area + FLEET tenant/isolation evidence + recorded test |

### 2.3 Group C — `FLEET` as subject (excluding the DISPLAY and WEATHER pairs already above)

| Integration | Required product | Required edition | Required accessory | Required subscription | Data direction | Local/cloud boundary | Safety boundary | Current evidence | Release gate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `N-16` `CONDITIONAL` FLEET ← WATCH (read-only telemetry and alerts) | FLEET + WATCH | WATCH-CORE (WATCH-PLUS CONDITIONAL); FLEET-START/BUSINESS/ENTERPRISE as contracted | None; WATCH is the source, connectivity is WATCH's contract | WATCH subscription **and** a FLEET contract; neither is included in the other | WATCH → FLEET, read-only per vessel | Local capture, cloud aggregation under a written contract | FLEET never writes to WATCH and never becomes the WATCH service of record; no command path; WATCH is not a fleet platform by default | `OPEN` — batch-02 row `I-14` governs; WATCH ingestion `NOT_VERIFIED`, WATCH pipeline `NOT_FOUND`, FLEET service `NOT_FOUND`; `NONE` (`P-06`, `P-09`, `H-12`) | Written FLEET contract + WATCH delivery evidence + tenant-isolation evidence + retention/DPIA position |
| `N-17` `CONDITIONAL` FLEET ← HUB (read-only installation and telemetry health) | FLEET + HUB | HUB-STANDARD or HUB-PRO; FLEET contract | None; HUB is the local source | FLEET contract | HUB → FLEET, read-only health/telemetry | Local capture, cloud read-only | No configuration, firmware, network or command is ever sent from FLEET to HUB; telemetry is operational, not safety-of-life | `OPEN` — batch-02 row `I-15` governs; no HUB telemetry export, no FLEET ingestion; `NONE` (`P-02`, `P-09`, `H-12`) | HUB telemetry export evidence + FLEET contract + tenant isolation + recorded read-only test |
| `N-18` `CONDITIONAL` FLEET ← AIS (read-only AIS-derived position/status) | FLEET + AIS | AIS-RECEIVER or AIS-CONNECTED; FLEET contract | Receiver/antenna chain (separate purchase); AIS output class `OPEN` | FLEET contract; no AIS subscription exists | AIS → FLEET, read-only | Local reception, cloud aggregation only within the AIS data-rights decision | Receive-only; not all vessels transmit AIS; not collision avoidance; AIS-derived retention/redistribution is not granted (`D-09`) | `OPEN`/`BLOCKED` — no receiver hardware, no data-rights position, no FLEET ingestion; `NONE` (`D-09`, `H-08`, `P-09`) | Written AIS retention/no-redistribution decision + receiver evidence + FLEET contract and isolation evidence |
| `N-19` `UNKNOWN` FLEET ← SENSE (direct measurement path) | FLEET + SENSE | — (no direct path defined) | — | — | SENSE → FLEET (no direct path exists) | — | A SENSE module has no connectivity of its own; SENSE reaches FLEET only through WATCH (batch-02 `I-10`) | `OPEN` — batch-02 row `I-24` governs; no direct integration defined; `NONE` (`P-05`, `P-09`) | A product decision; otherwise FLEET consumes SENSE only via WATCH (`N-16`) |
| `N-20` `BLOCKED` FLEET ↔ PILOT (any control; at most read-only status after review) | FLEET + PILOT | PILOT-COASTAL/SAIL/Pro as quoted; FLEET contract | None for the read-only sub-case; no control accessory exists | FLEET contract for any organisational view; none on the PILOT side | Intended read-only status PILOT → FLEET only; **no FLEET → PILOT direction exists or may exist** | Local capture, cloud read-only status | **No remote engage/disengage, no heading adjustment, no steering, no throttle, no motor command**; PILOT safety gate `BLOCKED` (`H-01`, `P-04`); fleet use never implies unattended operation | `BLOCKED` — PILOT safety gate `BLOCKED`, no read-only interface; batch-02 row `I-22` remains `CONDITIONAL` for the read-only sub-case and is not promoted here; `NONE` | Control is permanently excluded (no evidence route). Read-only status requires PILOT safety-gate closure + engineering/privacy review + recorded read-only test |
| `N-21` `PLANNED` FLEET ← NAV (passage/position context, only with explicit customer permission) | FLEET + NAV | NAV-ESSENTIAL or NAV-PRO; FLEET contract | None; NAV is the software source | NAV subscription; FLEET contract; explicit customer permission for the data flow | NAV → FLEET, read-only passage/position context | Local or account-level context; cloud only under the FLEET contract | Read-only context only; NAV never commands the actuator and FLEET never commands a vessel; no navigation-grade or ECDIS claim | `OPEN` — no interface, no permission model implemented, no FLEET ingestion; `NONE` (`P-01`, `P-09`, `X-07`) | Explicit per-organization permission design + recorded read-only test + FLEET contract/DPA; permission revocation evidence |

**Reading the matrix.** `PLANNED` rows describe intended end-state behaviour whose evidence is not produced;
`CONDITIONAL` rows name the extra external condition that must close before the row can ever be tested;
`UNKNOWN` rows record that no assessment exists; `BLOCKED` records an external gate. **No row may be quoted to a
customer as a compatibility statement**; only a `SUPPORTED` row may be, and none exists.

Evidence for §2: `VERIFIED_REPO mc07-brief.md` §9; `VERIFIED_REPO docs/marea/products/MAREA-DISPLAY-COMMERCIAL-SPEC.md`
§6; `VERIFIED_REPO docs/marea/products/MAREA-FLEET-COMMERCIAL-SPEC.md` F09;
`VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` rows `I-10`, `I-14`, `I-15`, `I-21`,
`I-22`, `I-23`, `I-24`; `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` registers A–C.

---

## 3. Coverage map — every ordered pair accounted for

The matrix has **21 rows = 21 unordered pairs** involving DISPLAY, WEATHER or FLEET: 3 pairs among the new three
plus 18 pairs between the new three and the previous six (3 × 6). Every direction is recorded in the *Data
direction* cell of the governing row; a direction with no defined product surface is recorded as **not defined**
and must not be inferred. This is the "clearly grouped equivalent" of an ordered-pair enumeration: 6 directed
relationships within the new three + 36 directed relationships with the previous six = 42 directed relationships,
all accounted for below and in §2.

### 3.1 Within the new three (6 directed relationships)

| Ordered direction | Row that records it | Direction as defined |
| --- | --- | --- |
| DISPLAY → WEATHER | `N-04` | Display presents weather (WEATHER → DISPLAY); reverse DISPLAY → WEATHER is **not defined** |
| WEATHER → DISPLAY | `N-04` | Licensed weather data to the display surface, entitlement-gated |
| DISPLAY → FLEET | `N-08` | **Not defined**; no FLEET surface on DISPLAY exists |
| FLEET → DISPLAY | `N-08` | **Not defined**; FLEET has no display integration and must not imply one |
| WEATHER → FLEET | `N-15` | Read-only operational weather context, provider-terms gated |
| FLEET → WEATHER | `N-15` | **Not defined**; FLEET does not feed weather data |

### 3.2 With the previous six (36 directed relationships)

| Pair | New-product direction | Previous-product direction | Row(s) |
| --- | --- | --- | --- |
| DISPLAY ↔ NAV | DISPLAY consumes NAV presentation (N-02) | NAV supplies presentation; NAV never receives display authority (N-02) | `N-02` |
| DISPLAY ↔ HUB | DISPLAY consumes HUB data (N-01) | HUB publishes local data; no write path to HUB from DISPLAY (N-01) | `N-01` |
| DISPLAY ↔ AIS | DISPLAY consumes receive-only targets (N-03) | AIS receiver supplies targets; no transmission path (N-03) | `N-03` |
| DISPLAY ↔ SENSE | DISPLAY consumes measurements (N-05) | SENSE publishes measurements; no configuration write stated (N-05) | `N-05` |
| DISPLAY ↔ PILOT | DISPLAY consumes read-only PILOT status at most (N-06) | PILOT supplies status only; **no DISPLAY → PILOT command** (N-06) | `N-06` |
| DISPLAY ↔ WATCH | DISPLAY consumes read-only context at most (N-07) | WATCH supplies context; no display control (N-07) | `N-07` |
| WEATHER ↔ NAV | WEATHER supplies licensed data (N-09) | NAV supplies route/position context where a future interface exists (N-09) | `N-09` |
| WEATHER ↔ HUB | WEATHER consumes local context (N-10) | HUB supplies local context only (N-10) | `N-10` |
| WEATHER ↔ AIS | Not defined (N-11) | AIS does not feed WEATHER; AIS-derived data not redistributable (N-11) | `N-11` |
| WEATHER ↔ SENSE | Not defined (N-12) | SENSE does not feed WEATHER (N-12) | `N-12` |
| WEATHER ↔ PILOT | WEATHER supplies advisory context only if ever defined (N-13) | PILOT supplies no weather data; **no WEATHER → PILOT control** (N-13) | `N-13` |
| WEATHER ↔ WATCH | WEATHER supplies context only if ever defined (N-14) | WATCH supplies no weather data (N-14) | `N-14` |
| FLEET ↔ NAV | FLEET consumes explicit-permission passage context (N-21) | NAV supplies context; NAV never commands the vessel (N-21) | `N-21` |
| FLEET ↔ HUB | FLEET consumes read-only health (N-17) | HUB supplies health only; **no FLEET → HUB configuration write** (N-17) | `N-17` |
| FLEET ↔ AIS | FLEET consumes read-only AIS-derived data (N-18) | AIS supplies read-only data within the rights decision (N-18) | `N-18` |
| FLEET ↔ SENSE | No direct path (N-19) | SENSE has no connectivity; reaches FLEET only via WATCH (N-16) | `N-19`, `N-16` |
| FLEET ↔ PILOT | FLEET receives read-only status at most; any control permanently excluded (N-20) | PILOT supplies status only; **no FLEET → PILOT command** (N-20) | `N-20` |
| FLEET ↔ WATCH | FLEET consumes read-only telemetry/alerts (N-16) | WATCH supplies read-only; never becomes a fleet platform (N-16) | `N-16` |

**Coverage statement.** 3 unordered pairs among the new three + 18 unordered pairs with the previous six = 21
unordered pairs = 42 directed relationships, all accounted for by §2 and §3. No pair is missing and no direction
is silently invented: where no product surface exists, the row says so.

---

## 4. Frozen batch-03 baseline reconciliation (brief §9, row by row)

The brief is binding. This table demonstrates that this document reproduces each frozen status exactly, with the
row that carries it. No frozen status is promoted, demoted or reinterpreted.

| Frozen pair (brief §9) | Frozen status | Row here | Same status? |
| --- | --- | --- | --- |
| DISPLAY–HUB | `CONDITIONAL` | `N-01` | Yes |
| DISPLAY–NAV | `PLANNED` | `N-02` | Yes |
| DISPLAY–AIS | `CONDITIONAL` | `N-03` | Yes |
| DISPLAY–WEATHER | `CONDITIONAL` | `N-04` | Yes |
| DISPLAY–SENSE | `CONDITIONAL` | `N-05` | Yes |
| DISPLAY–PILOT | `UNKNOWN` | `N-06` | Yes |
| DISPLAY–WATCH | `UNKNOWN` | `N-07` | Yes |
| WEATHER–NAV | `PLANNED` | `N-09` | Yes |
| WEATHER–FLEET | `CONDITIONAL` | `N-15` | Yes |
| WEATHER–DISPLAY | `CONDITIONAL` | `N-04` (same pair, display-as-subject row) | Yes |
| WEATHER–HUB | `CONDITIONAL` | `N-10` | Yes |
| FLEET–WATCH | `CONDITIONAL` | `N-16` | Yes |
| FLEET–HUB | `CONDITIONAL` | `N-17` | Yes |
| FLEET–SENSE | `UNKNOWN` | `N-19` | Yes |
| FLEET–PILOT | `BLOCKED` for any control; read-only status at most after review | `N-20` | Yes (control `BLOCKED`; batch-02 `I-22` read-only sub-case remains `CONDITIONAL` and is not promoted) |
| FLEET–NAV | `PLANNED` only with explicit customer permission | `N-21` | Yes |
| FLEET–WEATHER | `CONDITIONAL` | `N-15` (same pair) | Yes |
| FLEET–DISPLAY | `UNKNOWN` | `N-08` (same pair) | Yes |
| FLEET–AIS | `CONDITIONAL` read-only | `N-18` | Yes |

Pairs not frozen in brief §9 and therefore independently assessed here, all `UNKNOWN` because no dossier defines a
surface: WEATHER–AIS `N-11`, WEATHER–SENSE `N-12`, WEATHER–PILOT `N-13`, WEATHER–WATCH `N-14`, DISPLAY–FLEET
`N-08`. Their `UNKNOWN` status means "not assessed", which is the only honest value; it is never `SUPPORTED`.

---

## 5. Batch-01 and batch-02 promises this document does not change

The previous compatibility contracts remain in force. Their rows govern the pairs they cover; this document
references them and may add the new-product edge without altering the earlier status.

| Governing document | Governing rows referenced here | What must not change |
| --- | --- | --- |
| `PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` (batch-01 D5) | Registers A-01..A-05 (NAV), B-01..B-10 (HUB), C-01..C-06 (AIS); 0 `TESTED` rows; NMEA 2000 `BLOCKED`; control-plane row `PROHIBITED` | NAV/HUB/AIS internal statuses and their non-claims; HUB–DISPLAY is an added edge, not a change to any batch-01 row |
| `PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` (batch-02 D5) | `I-10` (SENSE→WATCH→FLEET), `I-14` (WATCH→FLEET), `I-15` (HUB→FLEET), `I-20` (NAV↔WEATHER), `I-21` (WEATHER→WATCH), `I-22` (PILOT→FLEET), `I-23` (AIS→WEATHER), `I-24` (SENSE→FLEET) | The batch-02 status (0 `SUPPORTED`, 10 `PLANNED`, 13 `CONDITIONAL`, 8 `UNKNOWN`) is not re-opened; a batch-03 row may only record the new product's side of a pair and must not promote or demote the earlier row |
| `docs/marea/products/README.md` §16, §19, §21 | Cross-product authority matrix; subscription isolation; compatibility table columns | Authority boundaries (no control path), the single entitlement rule and the column order are unchanged |

Where a batch-02 row already states the relationship (for example `I-14` WATCH→FLEET
`CONDITIONAL`), this document's row repeats the *batch-03 view* and cites the governing row. If the two ever
differ, the earlier governing row wins for the earlier pair and this document must be corrected — never the other
way round.

---

## 6. Commercial inclusion and exclusion per integration

Integration is never a commercial inclusion. The following table records, per row, what a customer must buy
separately and what no integration ever includes. The editions authority document is authoritative on edition
contents; this table is a compatibility-side reminder.

| Row(s) | Commercially included | Never included |
| --- | --- | --- |
| `N-01` DISPLAY–HUB | Nothing: DISPLAY and HUB are separate products | A HUB in a DISPLAY purchase; a DISPLAY in a HUB purchase; installation; adapters beyond the tested matrix |
| `N-02` DISPLAY–NAV | Nothing: NAV is a software subscription; DISPLAY is a one-off device | A NAV subscription with a display; a display with NAV; licensed charts (a third, separately licensed object) |
| `N-03` DISPLAY–AIS | Nothing: receiver and antenna chain are separate purchases | A receiver, antenna or splitter in DISPLAY; any AIS transmission capability |
| `N-04` DISPLAY–WEATHER | Nothing: WEATHER is a separate licensed data service | Weather data in a DISPLAY purchase; provider rights; offline or redistribution rights not granted |
| `N-05` DISPLAY–SENSE | Nothing: SENSE modules are separate | Sensors or calibration in DISPLAY |
| `N-06` DISPLAY–PILOT | Nothing: PILOT is a separate surveyed installation | PILOT status in DISPLAY; any control capability; installation |
| `N-07` DISPLAY–WATCH | Nothing: WATCH is a separate product with its own subscription | Monitoring/alert entitlement in DISPLAY |
| `N-08` DISPLAY–FLEET | Nothing: FLEET is a separate B2B contract | Any FLEET feature in DISPLAY; any display integration promise |
| `N-09` WEATHER–NAV | One entitlement ledger on one account; no double billing | A second charge for the same entitlement; chart rights; NAV subscription in WEATHER |
| `N-10` WEATHER–HUB | Nothing: HUB is separate hardware | HUB context in WEATHER; forecast data in HUB |
| `N-11`–`N-14` WEATHER with AIS/SENSE/PILOT/WATCH | Nothing | Any data, surface or entitlement not explicitly defined and licensed |
| `N-15` WEATHER–FLEET | Separate WEATHER entitlement and separate FLEET contract | Weather in FLEET; FLEET in WEATHER; B2B operational rights not granted by provider terms |
| `N-16` FLEET–WATCH | Separate WATCH subscription and separate FLEET contract | WATCH in FLEET; FLEET in WATCH; connectivity/data plan in either |
| `N-17` FLEET–HUB | Separate HUB purchase and FLEET contract | HUB in FLEET; FLEET in HUB; installation and connectivity |
| `N-18` FLEET–AIS | Separate AIS purchase and FLEET contract | AIS receiver in FLEET; AIS-derived resale/redistribution rights |
| `N-19` FLEET–SENSE | Separate SENSE modules; FLEET contract | Any direct SENSE path; a SENSE→FLEET claim |
| `N-20` FLEET–PILOT | Separate PILOT quoted installation and FLEET contract; read-only at most | Any control capability (never); PILOT data in FLEET before review |
| `N-21` FLEET–NAV | Separate NAV subscription and FLEET contract; explicit permission | NAV in FLEET; FLEET in NAV; chart rights |

Prices are not restated here. The frozen amounts of brief §4 remain `HYPOTHESIS_UNAPPROVED` and are not offers.
The FLEET amounts are per vessel per month, VAT excluded; DISPLAY is one-off VAT-included consumer retail
hypothesis; WEATHER is a yearly consumer subscription hypothesis. No bundle price exists.

---

## 7. Data rights and entitlement gates

1. **Charts and basemaps** (`D-01`, `D-06`): no distribution right exists. No DISPLAY, NAV or FLEET surface may
   claim official charts, ECDIS equivalence or "unlimited charts". DISPLAY presents chart data only where a
   separate licence exists.
2. **Weather** (`D-04`, `D-05`, `D-07`, `D-10`): provider rights are `NOT_GRANTED`. Forecast display, comparisons,
   route context and alerts are all gated on written terms per variable, area and use. A stale or unavailable
   forecast is never presented as current; a provider-licence loss produces an honest "unavailable" state with
   attribution retained.
3. **One entitlement ledger** (brief §10): WEATHER may be bought standalone; NAV Pro may include WEATHER
   Standard-equivalent read access only where provider rights allow (`CONDITIONAL`); an upgrade applies a
   prorated credit; the same entitlement is never billed twice across NAV and WEATHER. Cancelling NAV never
   deletes the customer's own WEATHER records; a defined read-only export window applies (hypothesis 30 days,
   legal review). Billing/entitlement services are not implemented in MC-07.
4. **AIS-derived data** (`D-09`): receive-only; retention and redistribution are not granted; FLEET must not
   aggregate, share, resell or benchmark AIS-derived traffic. Any fleet sharing is gated on a written retention
   decision.
5. **FLEET customer data** (`X-07`): tenant data belongs to the organization; EMBARCARTE processes it under a DPA;
   controller/processor is assessed per flow, not assumed. No customer production data is used anywhere in this
   programme.
6. **DISPLAY hardware evidence** (`H-11`, `P-07`): `SIZE_NOT_FROZEN`, `HARDWARE_NOT_SELECTED`,
   `BOM_NOT_ESTABLISHED`; every numeric physical target is `REQUIRED_TARGET` or `NOT_ESTABLISHED`, never measured.
7. **No right is transferred by an integration.** A licence attached to one product is never inherited by
   another, and a display, receiver or console never becomes a redistribution point.

---

## 8. Safety boundaries and absolute exclusions

| Boundary | What is permitted | What is absolutely excluded (no evidence route inside this programme) |
| --- | --- | --- |
| Steering / autopilot | PILOT is supervised, local and independently validated; read-only status may be displayed after review | Any command, engage, disengage, heading change, throttle or motor control from DISPLAY, WEATHER or FLEET; any cloud/app/remote path; ANY FLEET–PILOT control |
| AIS | Receive-only targets with age, source and disclaimer | Transmit, DSC, transponder behaviour, collision-avoidance claim, "sees all traffic", redistribution |
| WATCH | Conditional awareness with delivery uncertainty | Distress/SOLAS/GMDSS service, theft-prevention guarantee, immediate-delivery promise, remote helm |
| Navigation | Navigational aid with source, freshness and disclaimers | ECDIS/ECDIS-equivalent status, official ENC inclusion without a right, replacement of official charts or watchkeeping |
| Weather | Probabilistic forecasts with source, issue time and validity | Accuracy guarantee, "official warning service", exclusive data rights, free-tier commercial rights, redistribution |
| FLEET | Read-only operational system of record with tenant isolation | Remote vessel control, "certified multi-tenant security", cross-tenant read/modify, fabricated SLA, "unlimited" vessels/users/storage/API |
| DISPLAY | Presentation surface with included base software | Certification, IP rating, sunlight-legibility claim, measured size, marine-grade claim, any control authority |

Subscription isolation applies to every row: no entitlement state may disable local steering, local alarms,
valid local sensing or any safety-relevant independent function. The architecture rule R-A3 is a design
requirement, not a tested behaviour.

---

## 9. Customer-facing compatibility questions — the only permitted answers

Anything not in this table must be escalated, never improvised.

| Customer question | Answer permitted today | Why |
| --- | --- | --- |
| "Can I see weather on the MAREA DISPLAY?" | "Weather on the display is intended only with a MAREA WEATHER entitlement and the provider rights for that layer and area. It is not verified and no display or entitlement exists yet." | `N-04` `CONDITIONAL`; `D-05`, `D-10` |
| "Does the DISPLAY include charts or weather?" | "No. Charts, basemaps and weather are licensed data entitlements, separate from the device. No chart or weather right is granted." | `D-01`, `D-05`, `D-06`, `D-10` |
| "Will the DISPLAY show my NAV app?" | "Navigation presentation on the display is intended, pending an interface contract and a recorded end-to-end test. Neither product includes the other." | `N-02` `PLANNED`; DISPLAY §5.2 |
| "Can I engage the pilot from the display or from FLEET?" | "No. PILOT mode engagement is local, at the control head, supervised. No display, cloud or fleet steering path exists or is planned; any control capability is excluded by design." | README §16 rule 1, §19; `N-06`, `N-20` |
| "Does FLEET control my vessels?" | "No. FLEET is a read-only operations system of record. It never commands a vessel, and no cloud-to-vessel write path exists." | `N-16`–`N-21`; brief §11 |
| "Will FLEET show my WATCH telemetry?" | "Only through a separate, written FLEET agreement. WATCH is not included in FLEET, FLEET is not included in WATCH, and WATCH is not a fleet platform by default." | `N-16`; batch-02 `I-14` |
| "Can FLEET see my NAV route?" | "Passage/position context is intended only with your explicit permission per organization, and nothing is verified today. NAV never commands the vessel." | `N-21` `PLANNED` |
| "Is weather included with NAV Pro?" | "NAV Pro may include WEATHER Standard-equivalent read access only where provider rights allow. The same entitlement is never billed twice. No billing or entitlement service exists yet." | brief §10; `N-09` |
| "What happens if a weather provider licence ends?" | "The product shows an honest 'unavailable' state and keeps attribution. An expired entitlement never renders a fabricated or frozen forecast as current." | brief §10; `N-04`, `N-09` |
| "Does FLEET work with AIS?" | "Read-only AIS-derived data in FLEET is intended but blocked: receive-only, no redistribution, and no AIS data-rights decision exists. Do not buy on that assumption." | `N-18`; `D-09` |
| "Is the DISPLAY certified, waterproof or sunlight-readable?" | "No. No manufactured unit exists and size, brightness, sunlight legibility and environmental resistance are not verified. Nothing is certified." | brief §12, §14; `H-11`, `P-07` |
| "Is FLEET secure / certified?" | "FLEET is an internal design with no deployed multi-tenant service and no security certification. Tenant isolation is a specification requirement, not a tested behaviour." | brief §11, §17; `X-07`, `P-09` |
| "What SLA does FLEET have?" | "None. No service level is established or guaranteed; a figure may exist only in a signed contract with measurement evidence." | `NO_SLA_ESTABLISHED` |
| "Does any of this work with NMEA 2000?" | "No. NMEA 2000 is not implemented, not licensed and not certified in this programme. Do not buy on an NMEA 2000 assumption." | `H-04`, `DEC-05` |
| "Are these products available or orderable?" | "No. All nine families are DEFINED and NOT_FOR_SALE, internal only, with publication blocked. No price is an offer." | brief §0, §3, §4; README §1 |

---

## 10. Unknown and blocked register — exact conditions that promote a row

| Family / gate | What it blocks | Exact external evidence needed | Owner function |
| --- | --- | --- | --- |
| DISPLAY hardware (`H-11`, `P-07`, `H-05`) | Every DISPLAY row: `N-01`–`N-08` | Selected display platform, frozen enclosure/BOM, physical builds, environmental/sunlight/thermal/ingress evidence (`REQUIRED_TARGET` only until measured) | Hardware + compliance |
| DISPLAY embedded runtime (`P-07`) | Display-side presentation and integration | Dedicated operating environment, kiosk/embedded runtime decision, signed update and rollback evidence | Engineering |
| Weather provider rights (`D-04`, `D-05`, `D-07`, `D-10`) | Every weather row: `N-04`, `N-09`, `N-10`, `N-13`–`N-15` | Written per-variable, per-area, per-use terms and quotes; redistribution/offline positions; entitlement mapping | Product + finance + counsel |
| FLEET service and tenancy (`P-09`, `X-07`) | Every FLEET row: `N-08`, `N-15`–`N-21` | Multi-tenant service, authorization engine, device identity, audit, DPA/DPIA, executed isolation tests (§26 of the tenancy contract) | Engineering + product |
| Connectivity (`H-12`) | WATCH/HUB/FLEET telemetry rows: `N-16`, `N-17` | Written MVNO/roaming terms, coverage measurements at representative berths, data-cost model | Procurement + finance |
| HUB hardware and protocol matrix (`P-02`, `H-05`) | `N-01`, `N-10`, `N-17` | Frozen HUB hardware, tested protocol matrix, bench/EMC evidence, telemetry-export evidence | Hardware + engineering |
| AIS data rights (`D-09`, `MD-24`) | `N-03`, `N-11`, `N-18` | Written retention/no-redistribution decision; receiver hardware and RF evidence | Product + counsel + hardware |
| PILOT safety gate (`H-01`, `P-04`) | `N-06`, `N-13`, `N-20` | Bench evidence, E-stop and motor-isolation evidence, supervised sea trials, independent review, conformity plan | Safety + engineering |
| SENSE measurement (`P-05`) | `N-05`, `N-12`, `N-19` | Calibration and field-accuracy evidence per module; environmental/ingress evidence | Engineering + compliance |
| WATCH service (`P-06`) | `N-07`, `N-14`, `N-16` | Built ingestion, device identity/ownership proof, notification pipeline with delivery records, billing/entitlement service | Engineering + product |
| NAV chart rights and verification (`D-01`–`D-03`, `P-01`, `P-10`) | `N-02`, `N-09`, `N-21` | Chart distribution/OEM agreement per region; reproducible build/test environment; device and integration test records | Product + counsel + engineering |
| Brand and seller identity (`X-01`, `X-02`) | Any customer-facing compatibility statement | Trademark clearance and verified legal identity | Company owner + counsel |
| Costs (`X-05`) and customer evidence (`X-06`) | Any commercial statement attached to an integration | Real BOM/quotes/provider terms and real discovery evidence | Finance + product |

Promotion cannot be done by documentation. A row becomes `SUPPORTED` only with the evidence in §11.

---

## 11. Promotion, demotion and review rules

1. **A row becomes `SUPPORTED` only when all of the following exist as reviewable artefacts:** device identity
   (manufacturer, exact model, hardware revision where exposed); firmware/software versions and supported range;
   the exact message/data set or data fields exchanged and the direction; the exact adapter/cabling/power and
   installation conditions; a test record with date, configuration, expected result, observed result, anomalies
   and repetition; an independent reviewer who did not perform the test; and the published limitations
   (rate, latency, missing fields, conditions that break the row).
2. **Unit tests, protocol specifications, simulation and documentation never promote a row.** MC-02 code evidence
   is not device evidence. A provider's own statement is not a test of this integration.
3. **Demotion is mandatory.** A firmware or software change that invalidates a row demotes it to `UNKNOWN` (or to
   `PLANNED` with the named re-test) in the same revision that discovers the change; the compatibility matrix and
   any derived copy are updated together.
4. **Change control.** Any change to a row, status or vocabulary requires a new revision of this document, a
   re-check against the three dossiers, the editions authority and the frozen brief §9, and an independent
   review of the evidence — not the summary.
5. **Validator limits.** The machine-readable contract and the validator may check consistency (tokens, columns,
   statuses, frozen rows). They cannot create compatibility evidence, cannot test a device and cannot promote a
   row. Passing validation is not compatibility.
6. **No customer-facing use before promotion.** Until a row is `SUPPORTED`, customer copy, support scripts and
   quotations may only use §9's permitted answers.

---

## 12. Non-claims — assertions prohibited in every surface

| Forbidden assertion | Classification | What would ever permit it |
| --- | --- | --- |
| "Compatible with <device>" without a `SUPPORTED` row | Prohibited | A recorded device test with firmware, direction, adapter and reviewer |
| "The DISPLAY works with any plotter/autopilot/electronics" | Prohibited absolutely | Never: compatibility is per device, firmware, direction and installation |
| "The DISPLAY is a certified marine display" / IP rating / sunlight-readable / measured size | Prohibited | Measured physical evidence and conformity; none exists (`H-11`) |
| "Charts included" / "official charts" / "ECDIS-equivalent" | Prohibited while `D-01`–`D-03` are open | Signed chart distribution/OEM agreement per region and product |
| "Weather forecasts for <region>" without licence | Prohibited | Written provider terms for the product and area and a validated forecast evaluation |
| "Most accurate forecast" / accuracy percentages / "official warning service" | Prohibited absolutely | Never as a guarantee; no comparative validation exists |
| "FLEET controls your vessels" / any remote command implication | Prohibited absolutely | Never: no control path may exist (`N-20`, §8) |
| "FLEET is certified / ISO 27001 / SOC 2 / 100% secure" | Prohibited | No certification exists; a test is not a certification |
| "FLEET guarantees uptime / 24/7 / immediate alerts" | Prohibited | Never as a guarantee; only a signed, measured contract, otherwise `NO_SLA_ESTABLISHED` |
| "FLEET is unlimited in vessels/users/storage/API" | Prohibited | Never: limits are explicit and published before sale |
| "AIS sees all traffic" / range promise / collision avoidance | Prohibited absolutely | Never: receive-only and incomplete by nature |
| "Local functions keep working without a subscription" presented as verified behaviour | Prohibited as a verified claim | It is a design requirement; claim only as designed, and only after an outage test |
| Any certification, type approval or homologation | Prohibited | `X-01`/`H-06` closure; no certificate exists |
| Any price as an offer, launch price or "from" price | Prohibited | Only with an authorised price list and real costing; none exists |

---

## 13. Status statement, evidence limits and related documents

**Status statement.** This document is a compatibility contract for products that are **completely specified and
not for sale**. It records **0 `SUPPORTED` rows**. It certifies nothing, authorises no price, creates no SKU and
states no availability. MAREA DISPLAY is an unmanufactured device concept (`SIZE_NOT_FROZEN`,
`HARDWARE_NOT_SELECTED`, `BOM_NOT_ESTABLISHED`). MAREA WEATHER is a licensed-data-dependent service whose provider
rights are `NOT_GRANTED`. MAREA FLEET is an internal design with no deployed multi-tenant service, no security
certification and `NO_SLA_ESTABLISHED`. No workflow described here, in any direction, allows DISPLAY, WEATHER,
FLEET, NAV, HUB, AIS, SENSE, WATCH or a website to steer a vessel.

**Evidence limits.** Every row's current evidence is `OPEN` or `BLOCKED`; device-test state is `NONE` throughout;
no entitlement service, no FLEET service, no WEATHER provider agreement and no DISPLAY hardware exists. The
validator proves specification presence, not runtime compatibility.

Related documents:

- `docs/marea/products/MAREA-DISPLAY-COMMERCIAL-SPEC.md` — DISPLAY capability, editions, boundary and acceptance.
- `docs/marea/products/MAREA-WEATHER-COMMERCIAL-SPEC.md` — WEATHER capability, editions and provider-rights context.
- `docs/marea/products/WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md` — per-provider rights and the entitlement model.
- `docs/marea/products/MAREA-FLEET-COMMERCIAL-SPEC.md` — FLEET capability and editions.
- `docs/marea/products/FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md` — tenancy, authorization, audit, privacy and isolation evidence requirements.
- `docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` — edition authority.
- `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` — pricing and channel model (batch-03).
- `docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` and `PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` — governing earlier compatibility contracts.
- `docs/marea/products/README.md` — lifecycle, readiness, evidence classes, claim rules, cross-product authority.
- `docs/marea/compliance/MAREA-COMMERCIAL-ARCHITECTURE.md` — layers, prohibited connections, data boundaries.
- `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` — blocker register.
- `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` — allowed, conditional and prohibited claims, required disclaimers.
- `mc07-brief.md` — frozen batch-03 identity, editions, prices, readiness, blockers, entitlements, tenancy and integration baseline.

---

## 14. Document control

| Field | Value |
| --- | --- |
| Revision | 1 (first issue at MC-07) |
| Author role | Security architecture and ecosystem compatibility author (AGENT D) |
| Review state | Pending independent product review (task-13) and Lead integration |
| Known limits | 0 `SUPPORTED` rows; no DISPLAY hardware; no WEATHER provider rights; no FLEET service; no entitlement service; no device test exists; rows for pairs not frozen in brief §9 are `UNKNOWN` by design |
| Status | `INTERNAL_ONLY`, complete target specification, **not for sale**, not published. This document does not certify anything, authorises no price and makes no MAREA product purchasable. |
