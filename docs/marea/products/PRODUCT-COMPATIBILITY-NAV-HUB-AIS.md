# MAREA NAV · MAREA HUB · MAREA AIS — Compatibility and ecosystem contract (MC-05 / D5)

| Field | Value |
| --- | --- |
| Document ID | MC-05 / D5-COMPATIBILITY |
| Milestone | MC-05 (Master Prompt 05/36) |
| Owner | HUB Product Director (integration and compatibility owner) |
| Document status | INTERNAL · complete target specification · NOT_FOR_SALE |
| Products covered | `NAV` MAREA NAV (Essential, Pro); `HUB` MAREA HUB (Standard, Pro); `AIS` MAREA AIS (Receiver, Connected) |
| Lifecycle state | `DEFINED` for all three products; no product is commercially available |
| Branch | `feature/marea-mc05-nav-hub-ais-products` |
| Base commit | `8ac6d69` (MC-04 HEAD) |
| Date | 2026-10-30 |
| Governing contract | `docs/marea/products/README.md` (MC-05 product-definition conventions, §7 claim rules, §9 blocker ids) |
| Binding inputs | D1 `MAREA-NAV-COMMERCIAL-SPEC.md`, D2 `MAREA-HUB-COMMERCIAL-SPEC.md`, D3 `MAREA-AIS-COMMERCIAL-SPEC.md`, D4 `PRODUCT-EDITIONS-NAV-HUB-AIS.md` |
| Classification | Internal pre-contractual document. Not a catalogue, not a product page, not a quotation, not a certification |

This document is the common compatibility and ecosystem contract for the first MAREA product batch. It
gives one vocabulary, one evidence model and one set of compatibility rows that the three product dossiers,
an installer, a support engineer and a future product-page author all work from. It deliberately records
what is **not known** as prominently as what is intended.

## 1. Purpose, status and the governing rule

### 1.1 What this document decides

- the single compatibility record schema every product claim must use;
- the customer-facing and engineering-facing views of that record;
- the data paths for every standalone and combined use of NAV, HUB and AIS;
- the installation routes and the pre-quote assessment that gates them;
- the unresolved families that block compatibility evidence, and the exact decision or evidence each needs;
- the buyer questionnaire and the only four deterministic outcomes it may return;
- the compatibility assertions that are prohibited, and what would ever permit each.

It does **not** decide edition contents (D4 is authoritative), prices or channel terms (D6), customer
journeys (D7), copy (D8), the machine-readable contract (D10/D11) or any conformity, certification, test
result or hardware specification. None of those exists at MC-05 in a form this document could cite.

### 1.2 The governing rule — read before every other section

1. **Unknown compatibility is explicitly UNKNOWN. It is never inferred as supported.** A protocol name, a
   connector type, a brand, a sibling product or a hopeful installer does not create compatibility.
2. **No product may be sold from an untested compatibility assumption.** A sale requires a published
   compatibility row that has been tested and reviewed, not a specification that promises one later.
3. **Every compatibility row today is `UNKNOWN — NOT_TESTED`, `BLOCKED` or `PROHIBITED` unless it cites
   real evidence.** The evidence base is the MC-02 audit only (source code, configuration and
   documentation); no device, firmware version, cable, adapter, port, message capture or test result is
   invented anywhere in this document. **0 rows are `TESTED`.**
4. **No row is a certification.** A compatibility row is a tested statement about a configuration; it is
   not CE marking, not NMEA certification, not type approval and not a safety guarantee.
5. **NMEA 2000 is not implemented, not licensed and not certified** (`H-04`, `DEC-05`). No NMEA 2000
   certification or operational compatibility claim is made anywhere in this document or the three dossiers.
6. **Signal K is not a blanket guarantee.** It is an intended integration family whose compatibility must be
   established per device, per firmware/software version, per data path and per direction.
7. **There is no write path into steering or any vessel control.** NAV, HUB and AIS are read-only or
   receive-only toward the vessel; the unauthenticated autopilot control plane must never be reused or
   exposed (`H-02`), and no public automatic steering-control path exists.
8. **Compatibility is never an edition feature.** The same evidence-backed matrix applies to all editions.
   Pro sells *more validated coverage* and installer depth, never a vague "compatibility" promise (D4 §7,
   decision 5). Edition content can decide *which feature consumes* a compatible source — live instrument
   overlays are a NAV Pro capability, for example — but it never changes whether that source is compatible.

### 1.3 The three audiences of this document

| Audience | Uses |
| --- | --- |
| Customer and product-page author | §5.1 plain-language answers and §10 non-claims; may quote only `TESTED` rows and must never add a compatibility claim not in the matrix |
| Installer | §7 pre-quote assessment, §9 questionnaire outcomes and §6 data paths; must escalate rather than assume |
| Support engineer and engineer | §3 schema, §4 registers, §5.2 promotion gate and §8 blocked register; owns evidence before a row may be promoted |

---

## 2. Status and evidence vocabulary

### 2.1 Compatibility release status

| Status | Meaning | May be published as a compatibility claim? | Rows today |
| --- | --- | --- | ---: |
| `TESTED` | A recorded test exists for the exact configuration in the row (device, firmware/software version, message or data set, direction, adapter, test record, reviewer) | Yes, with the row's limitations and restrictions | **0** |
| `UNKNOWN — NOT_TESTED` | The intended path is defined by the product dossiers, but no test has been attempted | No. Copy may say the path is intended pending testing, never that it works | 16 |
| `BLOCKED` | The row cannot be tested until an external decision, right or physical article exists (named in the row) | No | 4 |
| `PROHIBITED` | Excluded by design; there is no future evidence route inside this programme | Never | 1 |

The count of 21 rows and the status split above is part of the evidence record; it is honest evidence of
definition completeness, not of readiness.

### 2.2 Evidence recorded per row

Row evidence uses the README §5 classes (`VERIFIED_REPO`, `VERIFIED_EXTERNAL`, `ASSUMPTION`,
`HYPOTHESIS`, `OPEN`, `BLOCKED`) plus a device-test state: `NONE`, `CODE_ONLY`,
`COMPONENT_UNIT_TEST_ONLY`, or `DEVICE_TEST_RECORDED`. Only `DEVICE_TEST_RECORDED` can support `TESTED`.
MC-02 code and documentation are `VERIFIED_REPO` evidence of *what was built*, not of *what works with a
device*.

**Mapping to the published matrix vocabulary.** D5's release status is the internal evidence state; the
customer-facing compatibility matrix (D2 §6.3) uses four support statuses. The mapping is: `TESTED` →
`SUPPORTED_EVIDENCED`; `UNKNOWN — NOT_TESTED` → `UNKNOWN_NOT_ASSESSED`; a configuration assessed by an
installer but not tested → `ASSESSED_INSTALLER_ONLY`; an excluded or refused configuration → `NOT_SUPPORTED`.
`BLOCKED` and `PROHIBITED` are internal states and never appear as a customer support status.

### 2.3 Shared data-state vocabulary (binding across NAV, HUB and AIS)

The three products must use the same words for the same states, or they will contradict each other in copy,
on screen and in support. Thresholds and timings are `OPEN` engineering requirements and are never invented
here.

| State | Meaning | Required display behaviour |
| --- | --- | --- |
| `FRESH` | Data received within the product's current freshness window | Value shown with source and timestamp |
| `STALE` | A value previously received has not updated within the freshness window | Value remains visible, explicitly marked stale, with its age |
| `LOST` | An AIS target has not been heard for longer than its current-validity window | Target is marked lost and is never presented as live |
| `UNKNOWN` | A supported source is defined but has never produced a value | "Unknown" is stated; no substitute or interpolation |
| `NOT_AVAILABLE` | The product cannot provide the value in this configuration (no source, no entitlement, computation inputs missing) | "Not available" plus the reason; no estimate |

Additional shared rules: target age is always derived from the last received message; the receiver/source is
always named; a missing own-vessel input (position, COG, SOG, heading where required) produces
`NOT_AVAILABLE`, never a computed guess; a lapsed data entitlement must not remove safety-relevant status
display during an active session.

---

## 3. The common compatibility model — one schema for every claim

Every compatibility statement in this programme, for every product and every edition, is recorded as a row
of the following schema. No other form of compatibility claim is permitted.

| # | Column | What it must contain | Rule |
| --- | --- | --- | --- |
| 1 | Intended feature | The customer outcome the row supports, in plain language | A row describes an outcome, not a port |
| 2 | Verified capability | What evidence actually establishes today: `NONE`, `CODE_ONLY`, `COMPONENT_UNIT_TEST_ONLY` or `DEVICE_TEST_RECORDED` | Never infer capability from a protocol name |
| 3 | Supported product | The MAREA product(s) in the row | Exactly one or more of NAV, HUB, AIS |
| 4 | Supported edition | The edition(s) the row applies to, as fixed by D4 | Compatibility is not edition-gated except where Pro's wider validated envelope applies |
| 5 | Physical connection | The connection class only (device platform, serial/USB-class, local network, VHF antenna feed); exact connectors are `OPEN` until hardware design | No port count, connector type or cable model is invented |
| 6 | Logical protocol | Protocol family and, where known, the message or path group; a protocol name alone is never a claim | NMEA 2000 rows are `BLOCKED` and not offered |
| 7 | Device manufacturer / model (verified only) | Exact make and model recorded during testing | `NOT_VERIFIED` is used today; no model is invented |
| 8 | Firmware / software version | The tested version and supported range | `NOT_VERIFIED` today; a version is never guessed |
| 9 | Data direction | `Receive-only`, `Read`, `Write`, or `None (prohibited)`; any write must be separately approved | No write path into steering or vessel control |
| 10 | Installation requirement | What must be installed or configured for the row to apply | Installer assessment or `OPEN` |
| 11 | Accessory requirement | The accessory class required (adapter/cabling, antenna/splitter, mounting/power); exact items are `OPEN` | Never implied free or included before a BOM exists |
| 12 | Tested configuration | The full configuration actually tested (device, firmware, adapter, transport, direction, date) | `NONE` for every row today |
| 13 | Evidence | Evidence class, source and device-test state | MC-02 audit evidence cannot promote a row |
| 14 | Restrictions | Limitations the row carries even if later tested (read-only, receive-only, no redistribution, no certification) | Restrictions travel with the claim, not in fine print |
| 15 | Release status | One value from §2.1 | Required on every row; no row today is `TESTED` |

Two further rules apply to the schema itself: the **supported edition** column is governed by D4 and may not
be edited in D5; and a row may not cite a certificate, a marketing statement, a dossier promise or MC-02
code as proof of device compatibility. Only a `DEVICE_TEST_RECORDED` evidence entry with a reviewer can move
a row to `TESTED`.

---

## 4. Master compatibility registers

There are 21 intended compatibility rows: 5 for NAV as consumer, 10 for HUB as gateway, 6 for AIS as source.
**All 21 are `UNKNOWN — NOT_TESTED`, `BLOCKED` or `PROHIBITED`; none is `TESTED`.** Exact ports, connectors,
transport rates, cable/adapter items, device models and firmware versions are `OPEN` or `NOT_VERIFIED`
throughout and must not be filled by inference.

### 4.1 Register A — NAV as consumer

| ID | Intended feature | Verified capability | Product | Edition | Physical connection | Logical protocol | Mfr / model | Version | Direction | Installation | Accessory | Tested config | Evidence | Restrictions | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A-01 | NAV shows own position, course and speed from the device's own GNSS | `CODE_ONLY` | NAV | Essential + Pro | Device platform (no external cable) | Device location service | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only | App install; location permission | None | `NONE` | MC-02: prototype UI, suites unexecuted (`P-10`); no device test | No GNSS receiver ships; datum and source must be shown | `UNKNOWN — NOT_TESTED` |
| A-02 | NAV Pro shows vessel data published by HUB on the local interface | `CODE_ONLY` | NAV + HUB | NAV Pro; HUB Standard + Pro | Local network | Signal K paths (documented local interface; paths `OPEN`) | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only | HUB installed and commissioned; NAV pointed at the interface | Per HUB installation | `NONE` | Contract and Signal K client patterns are `REUSE-CANDIDATE` (`P-02`, `E-01`–`E-03`); no product test | Read-only; NAV works without HUB; no control path | `UNKNOWN — NOT_TESTED` |
| A-03 | NAV Pro overlays a direct instrument source without a HUB | `CODE_ONLY` | NAV | Pro | Serial/USB-class or local network (`OPEN`) | Signal K or NMEA 0183 where a tested row exists | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only | Installer assessment of the source and adapter | Adapter class `OPEN` | `NONE` | Same as A-02; no device result (`P-01`, `P-02`) | Read-only; no blanket protocol promise; NMEA 2000 not offered | `UNKNOWN — NOT_TESTED` |
| A-04 | NAV shows receive-only AIS targets from a compatible receiver (target list and detail in both editions) | `CODE_ONLY` | NAV + AIS | NAV Essential + Pro; AIS Receiver + Connected | Local network or documented local transport (`OPEN`) | NMEA 0183 `!AIVDM`, or Signal K where tested | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only | Receiver installed and input selected in NAV | AIS antenna/splitter chain (separate purchase) | `NONE` | Target-store and CPA code exist in prototype (`C-06`); no integration test (`P-03`, `P-10`) | Not all vessels transmit AIS; not collision avoidance; no redistribution (`D-09`) | `UNKNOWN — NOT_TESTED` |
| A-05 | NAV Pro computes CPA/TCPA where own-vessel and target data are valid | `CODE_ONLY` | NAV + AIS (+ optional HUB) | NAV Pro; AIS Receiver + Connected | Local network or documented local transport (`OPEN`) | NMEA 0183 `!AIVDM` / Signal K where tested, plus own-vessel data | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only | Installer assessment; own-vessel position/COG/SOG required | As A-04; own-vessel source | `NONE` | `calculateCpa` has no unit test (`G14`); no integration test (`P-03`, `D-09`) | Advisory only; missing inputs show `NOT_AVAILABLE`; no detection guarantee | `UNKNOWN — NOT_TESTED` |

### 4.2 Register B — HUB as gateway

| ID | Intended feature | Verified capability | Product | Edition | Physical connection | Logical protocol | Mfr / model | Version | Direction | Installation | Accessory | Tested config | Evidence | Restrictions | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| B-01 | HUB reads wind data from a compatible NMEA 0183 source | `COMPONENT_UNIT_TEST_ONLY` | HUB | Standard + Pro | Serial/USB-class (`OPEN`) | NMEA 0183 MWV/MWD | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only | Installer assessment of source and adapter | Adapter class `OPEN` | `NONE` | MWV/MWD parser has executed unit tests (`MC-02` §6.1); no device test | Sentence parsing is not NMEA 0183 conformance; units/quality shown | `UNKNOWN — NOT_TESTED` |
| B-02 | HUB reads GNSS sentences from a compatible receiver | `CODE_ONLY` | HUB | Standard + Pro | Serial/USB-class (`OPEN`) | NMEA 0183 RMC/GGA/GSA/GSV/VTG (recorded in MC-02) | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only | Installer assessment; source auto-detection is not identity verification | Adapter class `OPEN` | `NONE` | Parser path recorded in MC-02; no executed test, no device test | No sentence or brand is promised until tested; no NMEA 0183 conformity claim | `UNKNOWN — NOT_TESTED` |
| B-03 | HUB consumes Signal K streams from a supported on-board source | `CODE_ONLY` | HUB | Standard + Pro (Pro extends validated families) | Local network | Signal K paths (per source, path and direction) | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only | Installer assessment; local trust boundary must be established (`E-21`) | None | `NONE` | Publish/subscribe patterns exist; no product test, no authentication model | Signal K is not a blanket guarantee; no remote trust assumed | `UNKNOWN — NOT_TESTED` |
| B-04 | HUB reads position, time, course and speed from a supported GNSS receiver | `CODE_ONLY` | HUB | Standard + Pro | Serial/USB-class (`OPEN`) | NMEA 0183 or Signal K where tested | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only | Installer assessment | Adapter class `OPEN` | `NONE` | Publishing code exists; no executed test (`P-10`) | Fix quality, source and freshness must be shown; no interpolation | `UNKNOWN — NOT_TESTED` |
| B-05 | HUB reads depth from a compatible source where the installation provides one | `NONE` | HUB | Standard + Pro | Serial/USB-class or local network (`OPEN`) | `OPEN` — protocol family not established | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only | Installer assessment | Adapter class `OPEN` | `NONE` | No depth integration test exists | Depth is not the vessel's required equipment; loss of depth shows `UNKNOWN` | `UNKNOWN — NOT_TESTED` |
| B-06 | HUB reads battery and utility measurements from compatible sources | `NONE` | HUB | Standard + Pro | Serial/USB-class or local network (`OPEN`) | `OPEN` — protocol family not established | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only | Installer assessment; electrical safety of the source is the installer's scope | Adapter class `OPEN` | `NONE` | No measured sensor integration exists | Operational information only; no claim of preventing damage | `UNKNOWN — NOT_TESTED` |
| B-07 | HUB consumes receive-only AIS output from a compatible receiver | `NONE` | HUB + AIS | HUB Standard + Pro; AIS Receiver + Connected | Local network or documented local transport (`OPEN`) | NMEA 0183 `!AIVDM`, or Signal K where tested | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only | Installer assessment; receiver commissioned separately | AIS antenna/splitter chain (separate purchase) | `NONE` | No receiver output exists to test (`H-08`, `P-03`) | Receive-only; target age shown; AIS-derived retention/redistribution not granted (`D-09`) | `UNKNOWN — NOT_TESTED` |
| B-08 | HUB publishes the documented local vessel data interface to NAV, DISPLAY and compatible consumers | `CODE_ONLY` | HUB (+ consumers) | HUB Standard + Pro; NAV Pro; AIS Connected where applicable | Local network | Signal K paths (documented contract; paths `OPEN`) | `NOT_VERIFIED` | `NOT_VERIFIED` | Read (consumers read HUB) | HUB installed and commissioned; consumer configured | None | `NONE` | Architecture and contract are `REUSE-CANDIDATE` (`P-02`); no product test | Read-mostly; any write path requires separate approval; no steering | `UNKNOWN — NOT_TESTED` |
| B-09 | HUB reads a device over NMEA 2000 | `NONE` | HUB | None offered | NMEA 2000 bus interface (`OPEN`) | NMEA 2000 | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only in intent | Not offered | Not offered | `NONE` | NMEA 2000 is type stubs only; no licence, no certification (`H-04`, `DEC-05`) | No NMEA 2000 certification or compatibility claim; not a supported family | `BLOCKED — H-04/DEC-05` |
| B-10 | Any HUB interface that reads or writes steering, autopilot or actuator control | `NONE` | None | None | — | Autopilot control plane (`H-02`) | — | — | `None (prohibited)` | — | — | `NONE` | Product boundary: HUB is never the steering controller; autopilot API is unauthenticated (`H-02`) | Prohibited by design; no future evidence route for a public steering path | `PROHIBITED` |

### 4.3 Register C — AIS as source

| ID | Intended feature | Verified capability | Product | Edition | Physical connection | Logical protocol | Mfr / model | Version | Direction | Installation | Accessory | Tested config | Evidence | Restrictions | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C-01 | AIS receiver hears VHF AIS broadcasts through an installed antenna or splitter | `NONE` | AIS | Receiver + Connected | VHF antenna feed (`OPEN`) | AIS VHF broadcast (receive only) | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only | Antenna/splitter installation by an installer where required | AIS VHF antenna and/or VHF splitter (separate purchase) | `NONE` | No receiver hardware or RF evidence exists (`H-08`, `H-05`) | Reception depends on installation; no range or detection guarantee | `BLOCKED — H-08/H-05` |
| C-02 | AIS receiver supplies received targets to a compatible consumer using `!AIVDM` sentences | `CODE_ONLY` | AIS (+ consumer) | Receiver + Connected | Documented local transport (`OPEN`) | NMEA 0183 `!AIVDM`; Signal K where tested | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only | Installer assessment of the consumer and transport | Adapter/cabling class `OPEN` | `NONE` | External decoder path recorded in MC-02 (`S-01`); no bundled binary, no integration test (`P-03`) | Not all vessels transmit AIS; no transponder; no collision avoidance | `UNKNOWN — NOT_TESTED` |
| C-03 | AIS Connected distributes targets to more than one local client | `CODE_ONLY` | AIS | Connected | Local network | As C-02 | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only | Installer assessment | As C-02 | `NONE` | Multi-client behaviour is a target design, not a tested capability | Local network only; no internet exposure; no redistribution beyond the vessel | `UNKNOWN — NOT_TESTED` |
| C-04 | AIS Connected is commissioned as a managed source in HUB | `NONE` | AIS + HUB | AIS Connected; HUB Standard + Pro | Local network or documented local transport (`OPEN`) | As C-02 | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only | Installer assessment and commissioning record | As C-02 | `NONE` | HUB hardware and protocol matrix unbuilt (`P-02`, `H-05`, `H-04`) | HUB is a separate product; no bundle inclusion assumed; see B-07 | `BLOCKED — P-02/P-03` |
| C-05 | AIS layer consumes own-vessel position, COG and SOG (and heading where required) for CPA/TCPA | `CODE_ONLY` | AIS + NAV (or HUB) | Receiver + Connected | Local network or local interface (`OPEN`) | Signal K or documented interface where tested | `NOT_VERIFIED` | `NOT_VERIFIED` | Receive-only | Installer assessment; own-vessel source required | None | `NONE` | CPA computation is owned by the consumer; no integration test (`G14`, `P-03`) | Missing inputs produce `NOT_AVAILABLE`, never an estimate | `UNKNOWN — NOT_TESTED` |
| C-06 | AIS-derived target history is retained or distributed beyond the receiving vessel | `NONE` | None | None | — | — | — | — | `None (prohibited)` | — | — | `NONE` | AIS-derived retention/redistribution not established (`D-09`, `MD-24`) | Local, own-vessel situational awareness only; no resale, aggregation or fleet sharing | `BLOCKED — D-09` |

---

## 5. Two views of the same truth

### 5.1 Customer compatibility view (what a boat owner may ask)

| Customer question | What the answer depends on | Result today | What the customer may need to buy or do | Who confirms |
| --- | --- | --- | --- | --- |
| "Will it connect to my plotter or instruments?" | The published matrix: exact device, firmware version, data type, direction and required adapter | No tested row exists, so the honest answer is "not yet published; requires specialist assessment" | Nothing yet: compatibility cannot be promised before testing | Installer assessment |
| "Can I see wind, depth and battery data in one place?" | A compatible source plus HUB intake and normalisation; HUB edition envelope | Intended for HUB Standard and Pro within their envelopes; no tested source exists | HUB plus the adapter/accessory specified after assessment | Installer assessment |
| "Can I see that data in NAV?" | Live instrument overlays are a NAV Pro capability fed by a tested source or HUB | Intended for NAV Pro; not tested | NAV Pro subscription plus the source; NAV is not included with HUB | Installer and matrix check |
| "Does NAV show AIS traffic?" | A receive-only AIS receiver (or compatible receiver) supplying targets; basic target display is in both NAV editions | Intended in NAV Essential and Pro; no tested receiver path exists | AIS receiver, antenna/splitter where required, installation | Installer and matrix check |
| "Can I see CPA/TCPA?" | Valid own-vessel position, COG, SOG, heading where required, plus valid targets; NAV Pro computes it | Intended in NAV Pro only; not tested | NAV Pro, AIS receiver, own-vessel data source | Installer assessment |
| "Do I need MAREA HUB?" | Only for local vessel-data integration; NAV works standalone and AIS works with a compatible consumer | HUB is optional for all three | Nothing extra for standalone use | Customer and installer |
| "Can I use my NMEA 2000 network?" | NMEA 2000 licensing/certification decision, implementation and per-device tests | No: not implemented, not licensed, not certified, not offered | Nothing today; do not buy on an NMEA 2000 assumption | Product decision (`H-04`, `DEC-05`) |
| "Are charts included?" | A licensed chart entitlement per region and product; no distribution right exists | No: charts are a licensed data entitlement, not a compatibility feature | A chart/data entitlement when one exists; not part of HUB or AIS | Product and legal (`D-01`–`D-03`) |
| "Does it need internet on board?" | HUB and AIS work locally; NAV offline use is limited to legally supported licensed regions | Intended local operation for HUB/AIS; NAV offline regions are licence-dependent | Nothing for local operation; optional services are separate | Installer and product docs |
| "Can I install it myself?" | Deterministic validated self-install rules; none exist yet | No self-install eligibility exists today | Professional assessment and installation | Installer assessment |
| "What must the installer check?" | Inventory, firmware versions, network, power, adapters, antenna/splitter for AIS, and exclusions | Always required; no universal install exists | An installation assessment before quotation | Installer |

No row in this view may be turned into a positive compatibility claim. If the matrix row is not `TESTED`,
the only permitted answers are "not yet published", "requires specialist assessment", "not supported" or
"not assessed".

### 5.2 Engineering evidence view (how a row becomes `TESTED`)

A row may be promoted only when **all** of the following exist as a reviewable artefact:

| # | Requirement | Detail |
| --- | --- | --- |
| 1 | Device identity | Manufacturer, exact model, hardware revision (where the device exposes one) |
| 2 | Firmware/software version | Device firmware and MAREA software/firmware versions tested, with the supported range |
| 3 | Message or data set | The exact sentences, Signal K paths or data fields exchanged, and the direction |
| 4 | Adapter/cabling | The exact adapter, cable class, power arrangement and installation conditions used |
| 5 | Test record | Date, configuration, expected result, observed result, anomalies, and whether the result was repeated |
| 6 | Reviewer | An independent reviewer who did not perform the test, recorded by function |
| 7 | Limitations | Rate, latency, missing fields, units, conditions that break the row — published with the row |

Promotion procedure: evidence is attached to the row → the integration owner verifies the record against
the claim → an independent reviewer re-reads the evidence, not the summary → the row becomes `TESTED` with
its restrictions → the compatibility matrix and any derivative copy are updated in one revision. A row may
be demoted to `UNKNOWN — NOT_TESTED` if a firmware change invalidates it. No simulation, unit test or
protocol specification alone can promote a row.

---

## 6. Standalone versus connected use — data paths and customer results

Every combination below is intended end-state behaviour. Each names its unverified links and the evidence
that would close them. No combination is a bundle, a price or a purchasable configuration.

### 6.1 NAV standalone (device GNSS + licensed charts, no HUB, no AIS)
- **Data path and customer result.** Device location service → MAREA NAV → licensed chart entitlement → screen. Planning, position on a licensed chart area, routes, waypoints and logbook without any on-board hardware purchase.
- **Unverified links / closing evidence.** A-01 (device positioning, not tested); chart entitlement blocked by `D-01`–`D-03`, with no distribution right; closes only with a device/platform acceptance record (MC-13-NAV) and a signed chart distribution or per-region licence (`DEC-02`).

### 6.2 NAV + HUB (vessel data without a traffic receiver)
- **Data path and customer result.** Compatible source → HUB intake and normalisation → documented local interface → NAV Pro overlays. NAV Pro shows the vessel's supported measurements with source, timestamp and stale state; HUB is a separate hardware purchase and NAV remains usable without it.
- **Unverified links / closing evidence.** A-02, B-01–B-08 (no device test); HUB hardware absent (`H-05`, `H-07`); Signal K trust model absent (`E-21`). Closes with device-level rows in Registers A/B, a HUB hardware and protocol test programme, and a security model for the local interface.

### 6.3 NAV + AIS (traffic without a HUB)
- **Data path and customer result.** AIS antenna/splitter → receive-only receiver → documented local output (`!AIVDM`, Signal K where tested) → NAV AIS input. Both NAV editions show receive-only target lists and target detail; NAV Pro adds CPA/TCPA and alerts only where own-vessel and target data are valid; every traffic surface carries the receive-only disclaimer.
- **Unverified links / closing evidence.** A-04, A-05, C-01, C-02 (no hardware, no integration test); `D-09` retention limits; `S-01` decoder distribution decision. Closes with a built and tested receiver, a recorded target capture, a NAV integration test per version and the decoder decision.

### 6.4 HUB + AIS (local aggregation, no navigation app)
- **Data path and customer result.** AIS antenna/splitter → receiver → HUB intake (`!AIVDM`) → HUB local dashboard and local interface for other consumers. Targets and receiver status join the local boat data layer; AIS Connected is the edition designed for this managed integration; HUB is a separate purchase.
- **Unverified links / closing evidence.** B-07, C-04 (HUB not built, receiver not built); `P-02`, `P-03`. Closes with Register B-07/C-04 device records plus HUB commissioning evidence.

### 6.5 NAV + HUB + AIS (the coordinated experience)
- **Data path and customer result.** Sources → HUB (vessel data + AIS) → documented local interface → NAV (targets, overlays, CPA/TCPA in Pro) and any other compatible consumer, each product keeping its own licence and edition. One local data layer and one navigation surface, with no product implying that another is included.
- **Unverified links / closing evidence.** All rows in Registers A–C; no end-to-end test exists; no bundle is decided (MC-08). Closes when every underlying row is tested individually and a recorded end-to-end installation test exists, with a support model for three-product installations.

### 6.6 NAV + WEATHER and cross-entitlement rules
- **Data path and customer result.** Licensed weather provider data → entitlement linked to the customer account → NAV forecast overlays (a licensed entitlement, not a software feature). A WEATHER entitlement held on the same account is displayed once, with source and validity window, and must not be billed twice by NAV. If the entitlement lapses, overlays become `NOT_AVAILABLE` with the reason, while own routes, waypoints, tracks and logbook remain exportable and all safety-relevant status and disclaimers stay visible during the active session. Sharing across devices is limited by the NAV edition's device rule.
- **Unverified links / closing evidence.** Weather rights blocked by `D-04`, `D-05`, `D-07`; entitlement sharing and billing are `BUILD` (`E-19`), so no-double-billing is an intended rule, not implemented behaviour; no WEATHER dossier exists in this batch. Closes with written provider terms and quotes (`DEC-03`), entitlement implementation and an end-to-end billing test.

### 6.7 HUB alone (local-first, no internet)
- **Data path and customer result.** Compatible sources → HUB → local dashboard and documented local interface; no dependency on the commercial website for local functions. No NAV, AIS or WEATHER entitlement is included.
- **Unverified links / closing evidence.** B-01–B-08; local-first behaviour is a design requirement not yet tested (CD-21); hardware absent. Closes with Register B rows and a controlled network-loss test with recorded behaviour.

### 6.8 AIS alone (compatible consumer)
- **Data path and customer result.** AIS antenna/splitter → receiver → documented local output → customer's compatible chartplotter or navigation application. Receive-only traffic awareness on equipment the customer already owns, with target age and source shown; no MAREA NAV or HUB required; no transmission path exists.
- **Unverified links / closing evidence.** C-01, C-02; receiver hardware and RF evidence absent (`H-08`); third-party consumer compatibility is the least tested path in the programme. Closes with a built receiver, RF/EMC evidence and per-consumer matrix records.

---

## 7. Installation paths and the pre-quote assessment

### 7.1 Three installation routes

| Route | When it applies | Who performs | What is verified | What the customer receives | Status |
| --- | --- | --- | --- | --- | --- |
| Self-install | Only when a deterministic, validated self-install rule confirms a documented low-risk configuration with no vessel electrical modification beyond documented connection steps | Owner, following the published guide | The rule result and the documented configuration | Guide, configuration snapshot, diagnostic export route | No rule is validated today, so no self-install eligibility exists |
| Professional installation | Every other configuration, or any owner who prefers delegation | EMBARCARTE-authorised installer/refit yard | Inventory, compatibility rows, installation, configuration, function checks | Installation record, handover and training | Programme does not exist yet (no installer agreements or measured installs) |
| Installer-only retrofit | Mixed or older equipment, antenna/splitter work for AIS, instrument wiring, or any configuration with unknowns | Specialist installer, escalated from assessment | Full survey and compatibility assessment before quotation | Written proposal, installation record, handover | Blocked by missing installer network and evidence |

No installation duration, price, stock or lead time is stated or implied anywhere. Installation is quoted per
vessel after assessment; programme price hypotheses are not offers.

### 7.2 Pre-quote assessment the installer runs

Before any quotation the installer records: vessel type, size, make and year; location and operating
territory; existing plotter/navigation application with make, model and software version; GNSS sources;
instruments and their make/model/firmware where obtainable; existing network type; autopilot presence and
make/model (for the steering exclusion check); AIS presence and antenna/splitter arrangement; on-board
internet availability (for optional services only); power arrangement and available mounting locations;
installation constraints and access; owner expectations; and photographs or inventory documents. The
installer then matches each item against the published matrix and records a verdict of supported,
conditionally supported or not supported. Nothing is assumed from a connector or a brand.

### 7.3 Refusal and escalation boundary

The assessment **refuses** a configuration when it requires an excluded capability: steering, autopilot or
actuator control; an NMEA 2000-only requirement; an official ENC/ECDIS requirement; AIS transmission or DSC;
any reception-range promise; or redistribution of AIS-derived data. It **escalates** to specialist assessment
when information is missing, when a device is not in the matrix, when firmware is unknown or unsupported, when
the installation requires undocumented electrical work, or when the customer's expectation exceeds the
published product. It never asserts compatibility to win a quote.

### 7.4 Handover contents

The customer receives: the installation record (configuration, sources found, unsupported items, checks
performed, software/firmware versions); the applicable edition and separate product ownership; the verbatim
disclaimers for each delivered product; the support route and warranty position; the export path for their
own configuration and records; and the update policy status. For self-install the handover is the documented
configuration record and the support route only.

---

## 8. Unknown and blocked compatibility register

| Family | What is blocked | Exact external decision or evidence needed | Owner function |
| --- | --- | --- | --- |
| NMEA 2000 licensing and certification (`H-04`, `DEC-05`) | Any NMEA 2000 device row; any NMEA 2000 claim | Decision either to license and certify (NMEA licence, manufacturer and product codes, certification tool, certificate, tested implementation) or to retire NMEA 2000 language and support NMEA 0183/Signal K only | Company owner + product + engineering |
| Signal K interoperability limits (`P-02`, `E-21`) | Per-source, per-path, per-direction compatibility; local trust boundary | Device/path test records; authentication and authorisation design for local services; digest-pinned Signal K runtime with notices (`S-06`) | Engineering (integration) |
| AIS decoder distribution (`S-01`, `DEC-04`) | Any shipped AIS decoding path | Written decision: GPL-compliant distribution with source offer and pinned/reviewed version, a replacement permissively licensed decoder, or documented user-installed separation | Engineering + counsel |
| AIS receiver hardware (`H-08`, `H-05`, `P-03`) | Every AIS reception and output row | Selected receiver module with conformity evidence or an own conformity programme; RF/EMC tests; antenna/splitter specification; built unit | Hardware + compliance |
| HUB hardware and interfaces (`H-05`, `H-07`, `P-02`) | Every HUB source/consumer row; edition envelopes | Frozen BOM, schematics, bench/thermal/ingress/EMC measurements, real supplier quotes, supported protocol matrix | Hardware + procurement |
| Chart and weather rights (`D-01`–`D-07`, `DEC-02`, `DEC-03`) | Licensed chart and weather rows; any "included" claim | Signed chart distributor/OEM agreement with permits and EULA; written weather/tide provider terms and quotes; provider-by-provider clearance register | Product + counsel + finance |
| AIS-derived data retention and redistribution (`D-09`, `MD-24`) | Target history export, aggregation, fleet sharing, resale | Legal review and a written retention/no-redistribution policy; local own-vessel situational awareness remains the only documented posture | Product + counsel |
| Control-plane exclusion (`H-02`) | Any steering, autopilot or actuator integration, in any direction | No evidence path exists for a public steering-control interface; the unauthenticated autopilot API must be authenticated, mutually isolated and never exposed through NAV/HUB/AIS | Engineering + security |

Engineering gates that also limit promotion of any row: `P-10` (reproducible test environment; TypeScript
suites unexecuted), `P-01`/`P-02`/`P-03` (product verification absent) and `H-13` (secure update and CRA
lifecycle absent). These are evidence prerequisites, not compatibility decisions.

---

## 9. Buyer configuration questionnaire and deterministic outcomes

### 9.1 Questionnaire fields

| Field | Why it is required | Required answer form |
| --- | --- | --- |
| Vessel type, size, make and year | Segments the installation and the support expectation | Free text plus category |
| Location and operating territory | Data rights and support coverage are territory-specific | Country/region |
| Existing plotter / navigation application | Determines whether a compatible consumer already exists | Make, model, software version |
| Existing GNSS source | Distinguishes device positioning from an external receiver | Device-only, external receiver, unknown |
| Existing instruments (wind, depth, speed, heading, battery) | The source inventory that the matrix must match | Make, model, firmware, connection family |
| Existing network type | Determines the intended connection family and whether NMEA 2000 is present | None, NMEA 0183, NMEA 2000, Signal K, Wi-Fi/Ethernet, proprietary, unknown |
| Autopilot or steering equipment | Steering integration is excluded by design; the answer triggers the refusal boundary | Present/absent, make/model |
| AIS equipment and antenna arrangement | Determines whether traffic awareness exists and what the antenna chain requires | Receive-only receiver, transponder, none, unknown; antenna/splitter status |
| On-board internet availability | Optional services only; never a requirement for local functions | Yes/no/intermittent |
| Installation preference | Routes the enquiry to self-install (only with a validated rule), professional installation or specialist assessment | Self / professional / unsure |
| Budget in principle | Qualification only; it must never become a quoted price or an implied offer | Range or "not decided" |
| Photographs and inventory documents | Evidence for the installer's assessment | Upload or document references |

### 9.2 Deterministic decision outcomes

| Outcome | Definition | Required to return it | Customer is told |
| --- | --- | --- | --- |
| `ELIGIBLE_SELF_INSTALL` | A validated deterministic rule confirms a documented low-risk configuration inside a tested matrix row, with no vessel electrical modification beyond documented connection steps | At least one `TESTED` rule and every questionnaire field resolved | Exactly what is supported, what is not, and the documented steps |
| `INSTALLER_ASSESSMENT_REQUIRED` | The configuration is plausible but outside validated rules, or involves installation work that needs a survey | Complete inventory and preferences | A specialist assessment is required before any compatibility or quotation |
| `NOT_SUPPORTED` | The request requires an excluded capability or an explicitly unsupported configuration | The exclusion trigger | What is not offered and why, without a workaround implication |
| `INSUFFICIENT_INFORMATION` | Required fields are missing or contradictory, including unknown device firmware or network type | Any mandatory field unresolved | What information is missing and how to provide it |

**Rule:** only validated deterministic rules may produce `ELIGIBLE_SELF_INSTALL`. At MC-05 the validated
rule set is empty because no matrix row is `TESTED`, so **`ELIGIBLE_SELF_INSTALL` cannot be returned today**;
every enquiry resolves to `INSTALLER_ASSESSMENT_REQUIRED`, `NOT_SUPPORTED` or
`INSUFFICIENT_INFORMATION`. No configurator exists yet: the future Master Prompt 24 configurator (roadmap
MC-09B compatibility and quotation) must implement this questionnaire, these four outcomes and the rule that
unknown or untested input never produces an eligible configuration.

---

## 10. Non-claims — compatibility assertions that are prohibited

| Forbidden assertion | Classification | Evidence that would ever permit it |
| --- | --- | --- |
| Any statement that MAREA holds NMEA 2000 certification | Prohibited absolutely until the certification gate closes | NMEA licence, manufacturer and product codes, certification tool output and certificate, plus a tested implementation (`H-04`, `DEC-05`) — none exists |
| Any claim of NMEA 0183 conformance or certification | Prohibited | No conformance route is established; only sentence-parsing rows with recorded tests may be described, never conformance |
| Universal compatibility with any boat or electronics | Prohibited absolutely | Never: compatibility is per device, firmware, direction and adapter (README §7) |
| Effort-free or no-configuration installation promise | Prohibited | Never inside this programme; configurations are compatibility-assessed and often professionally installed |
| Charts included or works with any chart | Prohibited while `D-01`–`D-03` are open | Signed chart distribution/OEM agreement and per-region end-user entitlement (`DEC-02`) |
| Any promise of AIS reception range, detection of every vessel, or collision avoidance | Prohibited absolutely | Never: AIS is receive-only, incomplete by nature and not a collision-avoidance system |
| Any automatic steering, autopilot or remote helm control path | Prohibited absolutely | Never inside this programme; `H-02` control plane is excluded and remains unauthenticated (`DEC-06` governs a separate PILOT safety programme) |
| MAREA HUB is required to use MAREA NAV, or NAV is included with HUB/AIS | Prohibited | Never: products are separately licensed and each stands alone within its documented scope |
| AIS transmits the vessel's position or replaces a transponder | Prohibited absolutely | Never: receive-only by design |
| Any promise of a compatibility result for an untested device | Prohibited | A `TESTED` matrix row with device, firmware, direction, adapter, test record and reviewer |

The compatibility matrix, not a dossier, a support reply or a product page, is the only surface authorised
to state that a configuration is supported. Every matrix row that is not `TESTED` must say so on the row.

---

## 11. Cross-references and governance

| Document | Relationship to D5 |
| --- | --- |
| D1 `MAREA-NAV-COMMERCIAL-SPEC.md` | Defines NAV integration intent and exclusions; D5 supplies the matrix rows that NAV copy may use |
| D2 `MAREA-HUB-COMMERCIAL-SPEC.md` | Defines the compatibility policy, matrix columns and local-first rule; D5 applies that policy to the three-product ecosystem |
| D3 `MAREA-AIS-COMMERCIAL-SPEC.md` | Defines receive-only output, target-state and CPA/TCPA input requirements; D5 freezes the shared vocabulary and registers |
| D4 `PRODUCT-EDITIONS-NAV-HUB-AIS.md` | Authoritative on edition contents and the rule that compatibility is never edition-gated; D5 may not change editions |
| D6 `PRODUCT-PRICING-AND-CHANNEL-MODEL.md` | Pricing and channel context only; D5 contains no price, availability or discount statement |
| D7 `CUSTOMER-JOURNEYS-NAV-HUB-AIS.md` | Future journey document; its journeys must use §5.1 and §6 outcomes, not new compatibility claims |
| D8 `copy/` NAV, HUB and AIS files in ES and EN | Future copy; may quote only `TESTED` rows and the §10 non-claims, and must repeat the verbatim disclaimers |
| D10/D11 `product-definitions.batch-01.json`, `scripts/check-marea-products.mjs` | Machine-readable contract and validator; D5 is a prose contract for compatibility, not a second schema for the 24 fields |
| MC-02 blockers register | Source of every blocker id used here (`H-02`, `H-04`, `H-05`, `H-07`, `H-08`, `H-13`, `P-02`, `P-03`, `P-10`, `S-01`, `S-06`, `D-01`–`D-09`, `X-05`) |
| MC-13 verification gates | The gates that must produce device test records before any row becomes `TESTED` |
| Master Prompt 24 / roadmap MC-09B | Future deterministic configurator; must implement §9 questionnaire, outcomes and the zero-eligible rule until rows are `TESTED` |
| `COMMERCIAL-BRAND-CLAIMS-POLICY.md` | Class C claim approval: a `TESTED` row is still a conditional claim requiring the claims register and owner-function approval before publication |

**Change rule.** Any change to a compatibility row, status, edition or vocabulary requires a new revision of
this document, a re-check against the three dossiers and D4, and an independent review of the evidence — not
the summary. A row may be added, promoted or demoted only with the corresponding matrix evidence. The
machine-readable contract and validator may check consistency but cannot create compatibility evidence.

---

## 12. Document control

| Field | Value |
| --- | --- |
| Revision | 1 (first issue at MC-05) |
| Author role | HUB Product Director (integration and compatibility owner) |
| Review state | Pending independent product review (D13) and Lead integration (D12) |
| Known limits | 0 `TESTED` rows; no device, firmware, cable, adapter, port or test result exists in evidence; no hardware for HUB or AIS; no chart/weather rights; NMEA 2000 unresolved; configurator not built |
| Status statement | INTERNAL, complete target specification, **not for sale**. This document does not certify anything, does not approve a price and does not make any MAREA product purchasable. |
