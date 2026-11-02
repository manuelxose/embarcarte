# MC-11 — Software-first hardware dependencies (D10)

| Field | Value |
|---|---|
| Document | D10 `MC11-SOFTWARE-FIRST-HARDWARE-DEPENDENCIES.md` |
| Status | `PROPOSED_NOT_APPROVED` — `INTERNAL_ENGINEERING_RESEARCH` |
| Milestone | MC-11 (deliverable 10) |
| Branch / base | `feature/marea-mc11-hardware-sourcing-conformity` / MC-10R HEAD `6713178` |
| Date | 2026-11-02 (Europe/Madrid) |
| Owner | `hw-architect` |
| Machine records | `data/hardware-families.json`, `data/architecture-options.json`, `data/compatibility-requirements.json` |

**Evidence states.** No software has been tested on a vessel, no hardware dependency has been verified as
compatible, no data licence exists, no supplier was contacted, no purchase was made, no certification was
obtained and customer evidence is `NONE`. `CHART_RIGHTS_GRANTED = false`,
`WEATHER_PROVIDER_RIGHTS = NOT_GRANTED`, `FLEET_DEFAULT_HARDWARE = false`,
`NMEA2000_CERTIFIED = false`, `TESTED_COMPATIBILITY_ROWS = 0`. This document authorises nothing; it maps
dependencies so that software work is not silently blocked by hardware or data rights.

---

## 1. The classification used

Every capability of every family is placed in exactly one primary class:

| Class | Meaning | Can progress without a MAREA hardware programme? |
|---|---|---|
| **S — no proprietary hardware** | Software on customer devices or cloud; no MAREA article needed | **Yes** |
| **T — third-party certified equipment** | Depends on a device MAREA does not make, with its own certification and lifecycle | **Yes**, but only through an integration contract and per-device testing |
| **D — licensed data** | Depends on a data right that has not been granted | **No** until the contract exists |
| **H — MAREA hardware** | Depends on a MAREA article that does not exist | **No** |

A capability may have several dependencies; the primary class is the one that blocks it today. The
presence of licensed data or third-party equipment in a capability does **not** mean MAREA sells it.

---

## 2. NAV — software-first, hardware-optional

NAV is `SOFTWARE_ONLY`: no article ships with it. Its hardware dependencies are optional purchases by the
customer, and each one is a separate commercial object.

| Capability | Class | Dependency detail | Current blocker / status |
|---|---|---|---|
| Account, vessel and skipper profile | S | None | Not built (`X-07`) |
| Route planning, waypoints, route libraries | S | None | Not built |
| Logbook and history | S | None | Not built |
| Import/export of the customer's own records | S | None | Not built; must survive cancellation |
| Multi-device sessions | S | None | Not built |
| Device GNSS positioning | T | Customer phone/tablet GNSS; MAREA supplies no receiver | Device-dependent; accuracy not MAREA's |
| Licensed charts and offline regions | D | Chart/ENC distributor or OEM right | `CHART_RIGHTS_GRANTED = false` |
| Weather, tide and current overlays | D | Provider right (with MAREA WEATHER or direct) | `WEATHER_PROVIDER_RIGHTS = NOT_GRANTED` |
| Live instrument overlays | T | Compatible instrument data source, optionally through HUB | No tested path; per-device matrix |
| AIS traffic display | T | Receive-only AIS receiver (MAREA or third party) | No tested AIS path; data rights |
| CPA/TCPA | T + S | Own position/COG/SOG plus a validated computation path | Computation boundary not frozen |
| HUB integration | H | MAREA HUB | No HUB exists; `P-02` |
| Steering/autopilot control | — | **Prohibited.** No route upload that commands the helm, no control path | By design |

**Remaining hardware dependency for NAV:** none that is mandatory. The residual risk is that the
differentiating Pro capabilities (live instruments, AIS, offline regions) all depend on third-party
devices or licensed data that MAREA does not control. NAV can be built and sold (once rights and gates
allow) without a MAREA hardware programme.

---

## 3. WEATHER — software-first, data-blocked

WEATHER is a `LICENSED_DATA_SERVICE`: no hardware, no accessory of its own. The dependency is
contractual, not technical.

| Capability | Class | Dependency detail | Current blocker |
|---|---|---|---|
| Home screen, saved locations, timeline | S | None | Not built |
| Provenance metadata (provider, model, model run, valid time, receipt time) | S | Requires a source registry | Not built |
| Freshness states (current/aging/stale/expired), missing, out-of-coverage | S | None | Not built |
| Wind, gusts, waves, swell, currents, tides, SST, atmospheric fields | D | Licensed provider datasets and display/caching rights | `WEATHER_PROVIDER_RIGHTS = NOT_GRANTED` |
| Multi-model comparison with labelled disagreement | D | Multiple licensed models; comparison rights | Not granted |
| Route weather, passage planning, weather windows | D | Provider rights plus NAV integration | Not granted; integration not built |
| Notifications | D + S | Provider terms plus a notification service | Neither exists |
| NAV entitlement sharing without double billing | S | Single entitlement ledger | Not built |
| Display on a fixed helm screen | T + D | DISPLAY plus provider display right | DISPLAY not built; right not granted |
| Own-vessel observations from HUB | H | MAREA HUB | No HUB exists; observations must be labelled own-vessel |

**Remaining hardware dependency for WEATHER:** none mandatory. The blocker is entirely data rights and
software. **No accuracy, coverage or official-warning claim can ever be derived from a licence alone**;
an evaluation with published methodology is required first.

---

## 4. FLEET — software-first, hardware-not-included (rule preserved)

FLEET is `SOFTWARE_ONLY` and **`FLEET_DEFAULT_HARDWARE = false`**. This is a binding commercial rule, not
an engineering preference: no device is included in the per-vessel subscription, and any edge device is a
separate purchase and an explicitly conditional integration.

| Capability | Class | Dependency detail | Current blocker |
|---|---|---|---|
| Organisation, roles, invitations, revocation | S | None | Not built; no tenancy service |
| Vessel registry, profiles, availability | S | None | Not built |
| Maintenance tasks, work orders, service history | S | None | Not built |
| Equipment inventory, documents, expiry | S | None | Not built |
| Incidents, events, activity assignment | S | None | Not built |
| Reporting, export, audit log, tenant isolation | S | None | Not built |
| Read-only WATCH telemetry | T | A WATCH subscription and organisation consent | WATCH does not exist |
| Read-only HUB health | T | HUB and authorised export | HUB does not exist |
| AIS-derived positions | D | Data rights not granted | `D-09` |
| NAV passage context | T | Explicit customer permission | Not built |
| WEATHER organisational use | D | Provider B2B terms | Not granted |
| Hardware included in the fee | — | **Prohibited.** Hardware is never included by default | By rule |
| Remote vessel control | — | **Prohibited.** Read-only telemetry only | By rule |

**Remaining hardware dependency for FLEET:** none. FLEET can be delivered as a standalone SaaS once the
tenancy, authorisation, billing and data-protection work exists. Its telemetry value is optional and
depends on devices the customer buys separately. **No SLA, uptime figure or security certification may be
claimed.**

---

## 5. Software layers of HUB

HUB is a proprietary appliance, but most of its **value** is software. Separating the layers shows what
can be built and tested before the hardware exists.

| HUB software layer | Class | Hardware dependency | Can be built now? |
|---|---|---|---|
| Vessel-data model and local contract (units, timestamps, quality, freshness) | S | None; can be developed against a simulator | **Yes** (simulator only) |
| Source-health and diagnostics logic | S | Simulator | **Yes** |
| Dashboard and configuration UX | S | Simulator | **Yes** |
| History, backup/restore, export | S | Simulator | **Yes** |
| Signed update and rollback architecture | S | Needs a target device to validate | Partially (design only) |
| Device identity, provisioning, ownership transfer | S + H | Needs secure element and manufacturing provisioning | No (no identity system) |
| NMEA 0183 sentence intake | H + T | Isolated interface hardware; third-party instruments | No physical layer; parser work possible |
| Signal K consumption/publication | S + T | Compatible Signal K source | Parser/client only |
| AIS target state (as a consumer) | T | Third-party or MAREA receiver | No tested path |
| NMEA 2000 | — | **Blocked** (licence/certification) | No |
| Installer tooling / commissioning record | S | Needs a device to commission | Design only |
| Local-first guarantee | S + H | Needs a device to prove no internet dependence | Design only |

**Minimum HUB software work that can start before hardware selection:** the data contract, the freshness/
quality model, the diagnostics vocabulary, the acceptance-test harness against a simulator, and the
compatibility-matrix tooling. None of it requires an article; all of it is needed regardless of the
hardware choice.

---

## 6. Software layers of AIS

| AIS software layer | Class | Hardware dependency | Can be built now? |
|---|---|---|---|
| Target state model (age, stale, lost) | S | Feed it recorded `!AIVDM` captures | **Yes** |
| Target list, filters, honest empty state | S | None | **Yes** |
| Receiver diagnostics / support export | H | Receiver hardware | Design only |
| Decoder integration | T + D | Third-party receiver or own front end; GPL-3.0 decision | No (licence decision) |
| Output transport (`!AIVDM`, Signal K) | S + T | Consumer compatibility | Prototype only |
| CPA/TCPA computation | S | Own-position inputs and a validated boundary | Prototype only |
| Receiver RF and antenna behaviour | H | Receiver hardware | No |
| AIS data retention/redistribution | D | Data rights not granted | No |

**Only two AIS layers can progress now:** the target-state/visualisation layer against recorded captures,
and the integration contract definition. Everything RF or redistribution-related is blocked.

---

## 7. Genuinely shared platform components

The question is not "can we reuse?" but "does reuse justify coupling these families' requirements and
release schedules together?" The table gives the candidate shared element, the families that would share
it, the benefit and the cost of coupling.

| Shared element | Families that could share | Reuse benefit | Coupling cost / risk | Verdict |
|---|---|---|---|---|
| **Gateway compute (SOM/processor + carrier)** | HUB, AIS-CONNECTED, WATCH (app processor), DISPLAY (compute) | One BSP, one update chain, one security architecture, one supplier relationship | Different thermal, power, enclosure and lifecycle envelopes; a WATCH must be low-power, a DISPLAY must drive a panel, a HUB must run services | **Partial reuse only** — share the software/security platform, not the board |
| **Power subsystem (protection + wide-input DC/DC)** | HUB, AIS, SENSE, WATCH, DISPLAY | One validated protection front end and one fuse/cable table | Different load classes (display backlight vs sensor vs modem peak); a shared design may be over- or under-sized | **Reuse the reference design and test evidence**, instantiate per family |
| **Cellular modem + SIM/eSIM + antenna** | WATCH (primary), FLEET edge (via WATCH), optional HUB (unspecified) | One certification path, one operator relationship, one eSIM provisioning system | Modem choice drives power, cost, certification; putting a modem in HUB changes its edition boundary and RED route | **Share only WATCH-first**; HUB modem is `EDITION_INTERFACE_UNSPECIFIED` |
| **GNSS** | HUB, WATCH, AIS (own position), NAV (device GNSS) | One module family and one antenna reference | Module lifecycle churn (verified MAX-M10 order codes already unavailable); different accuracy needs | **Share the module family**, not a board |
| **Enclosure platforms** | HUB/SENSE/WATCH/DISPLAY | Tooling amortisation, one sealing strategy, one mounting family | Different sizes, service access, thermal paths and mounting loads | **Share the design language and sealing strategy**, not the tool |
| **Connectors and harness** | HUB, AIS, SENSE, WATCH, DISPLAY | One connector qualification and one installation-guide vocabulary | Different current, IP and keying requirements | **Share the approved connector list** |
| **Firmware update + security architecture** | All hardware families | One signed-update mechanism, one SBOM/vulnerability process, one CRA posture | Must work on MCU-class and Linux-class targets; one platform may not fit all | **Share the architecture and process; implement per target** |
| **Test fixtures and factory test** | HUB, AIS, SENSE, WATCH, DISPLAY | One test-executive framework, one record format, one traceability model | Each product needs its own fixture and test program | **Share the framework and records**, not the fixture |
| **Calibration fixture** | SENSE (and WATCH sensor inputs) | One traceable calibration process | Different quantities and reference classes | **Do not share**; calibration is per measurement |

### 7.1 Does reuse justify platform coupling?

**Yes for software and process, cautiously for hardware, no for boards.** The strongest shared assets are
not physical: the data contract, the freshness/quality model, the signed-update and SBOM process, the
security architecture, the compatibility-matrix tooling and the test-record format. Those should be built
once and reused everywhere; they reduce CRA and support burden across the portfolio.

Physical reuse is weaker than it looks. A HUB's compute platform cannot be a WATCH's low-power platform
without compromising WATCH's battery-drain requirement (D5 §7); a DISPLAY's panel interface is not a
HUB's; a SENSE module's BOM cannot carry a SOM. What should be shared physically is the **protection front
end reference design, the approved connector list, the enclosure design language and the antenna
strategy** — shared as validated building blocks, instantiated per product.

**Coupling rule:** do not tie two families' release schedules to one shared board. Tie them to one shared
**platform specification** (data contract + security + update + test records) that each board implements.
This preserves reuse without making a WATCH delay block a HUB or vice versa.

---

## 8. What software-first actually buys the programme

1. **Progress without tooling capital.** NAV, WEATHER and FLEET can be built, tested and reviewed with no
   hardware programme, no EMC laboratory and no enclosure. They are blocked by contracts and build work,
   not by physics.
2. **A real integration story for HUB/AIS before hardware exists.** The data contract, source-health model
   and compatibility-matrix tooling can be developed against simulators and recorded captures, and they are
   needed whatever hardware is eventually chosen.
3. **Risk reduction by deferral.** AIS receiver hardware, WATCH device hardware, DISPLAY hardware and all
   PILOT steering work can be deferred without stopping software progress — except where a data right
   blocks the capability (charts, weather, AIS-derived data).
4. **An honest commercial boundary.** The programme can sell software and services only when the
   corresponding rights and gates exist; it must never present a software subscription as a substitute for
   a certification, a hardware capability or a safety function.

---

## 9. Residual hardware dependency summary

| Family | Mandatory MAREA hardware | Mandatory third-party hardware | Mandatory licensed data | Can progress now |
|---|---|---|---|---|
| NAV | None | Device GNSS for position; optional instrument/AIS source | Charts, weather/tides | Partially (core planning/logbook yes; overlays blocked) |
| WEATHER | None | None | **Yes — all data** | Only provenance/freshness scaffolding |
| FLEET | **None, by binding rule** | Optional WATCH/HUB for telemetry | AIS/weather only if those layers are added | Yes (tenancy and operations platform) |
| HUB (software layers) | Data contract, dashboard, diagnostics can be built without a board | Source devices for real data | None | Yes against simulators |
| AIS (software layers) | Target visualisation can be built without a receiver | Receiver for live data | AIS data retention/redistribution | Partially (visualisation prototype only) |

**Final note.** No family's software can convert a missing certification, a missing data licence or a
missing physical safety case into a product. MC-11 therefore ends with the same invariant it began with:
software-first reduces risk and cost, but it does not create conformity, compatibility evidence or
customer demand.
