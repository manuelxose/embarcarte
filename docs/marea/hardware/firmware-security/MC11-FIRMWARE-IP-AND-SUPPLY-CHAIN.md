# MC-11 — Firmware IP and supply chain (D28)

| Field | Value |
|---|---|
| Document | D28 `MC11-FIRMWARE-IP-AND-SUPPLY-CHAIN.md` |
| Status | `PROPOSED_NOT_APPROVED` — `INTERNAL_ENGINEERING_RESEARCH` |
| Milestone | MC-11 (deliverable 28) |
| Branch / base | `feature/marea-mc11-hardware-sourcing-conformity` / MC-10R HEAD `6713178` |
| Date | 2026-11-02 (Europe/Madrid) |
| Owner | `security-engineer` (Agent F) |
| Companion | D27 `MC11-DEVICE-SECURITY-AND-LIFECYCLE.md` |
| Machine records | `data/evidence/firmware-security.json` (EVD-MC11-501…515); cross-references the MC-02 audits (`INTELLECTUAL-PROPERTY-CHAIN.md`, `LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md`, `MAREA-PRODUCT-REUSE-MAP.md`, `SOFTWARE-LICENSE-INVENTORY.csv`) and D27 |

## 0. Status block (read before any other sentence)

**No MAREA device exists. No MAREA firmware has been written. No code has been copied from OPEN-MARINE. No
licence has been granted. `SOURCE_IP_CLEARANCE = NOT_CLEARED`, `OPEN_MARINE_WRITE = PROHIBITED`,
`TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`, `CONFORMITY_CERTIFICATION = NOT_ESTABLISHED`. No supplier,
distributor, contract manufacturer, licence holder or counsel was contacted. No purchase, flash, board
bring-up, build-reproduction test or licence audit was performed in this session.**

This document is a **boundary analysis**. It records what MAREA may study, what a licence covers, what
needs separate permission, what cannot be reused, what specifications could be independently implemented,
and what would have to be tested before any interoperability claim could be published. It does **not**
grant a right, does **not** clear the source IP, does **not** create a clean-room certification, and does
**not** authorise any reuse. `SOURCE_IP_CLEARANCE` remains **`NOT_CLEARED`** at the end of this document
exactly as at the start.

**The distinction this document exists to keep.** Two activities are routinely confused and must never be
conflated in this programme:

| Activity | What it means | Status |
|---|---|---|
| **A. Studying an architecture idea** | Reading public material, understanding a pattern, a data model, a protocol behaviour or a failure mode, and **independently designing** MAREA's own firmware from the resulting requirements | Permitted for public material; produced artefact is **MAREA's original engineering design**, not a copy |
| **B. Copying or adapting code** | Taking source files, firmware scripts, configuration, comments, structures or generated artefacts from OPEN-MARINE or any other third party and using them in a MAREA product | **Prohibited for all OPEN-MARINE first-party code** (`OPEN_MARINE_WRITE = PROHIBITED`, DECISION-LOG D-002); permitted for third-party components only under their own licence with notices |

Every table below says explicitly which of A or B it is about. Reading this document does not convert B
into A, and no amount of re-typing, renaming or "cleaning up" makes copied expression original.

**Licence and legal statements here are engineering records, not legal opinions.** Items marked
`LEGAL_REVIEW_REQUIRED` need qualified counsel. The MC-02 audits are the authority for the inventory; this
document does not re-litigate it.

---

## 1. Purpose, authorities and sources

### 1.1 What this deliverable must decide

1. Which OPEN-MARINE **architecture ideas** may be studied (and why studying them is not copying).
2. Which **source files** are covered by which licence, and what that licence permits on distribution.
3. Which **dependencies require separate permission** before any use.
4. Which **code cannot be reused** at all.
5. Which **specifications could be independently implemented** by MAREA.
6. Which **interoperability claims would require testing** before publication.
7. The **firmware supply chain**: vendor BSP/SDK lifecycle, BootROM/SoC vendor dependency, build
   reproducibility, toolchain pinning, third-party binary blobs, notice obligations on programmed boards and
   the licence-notice bundle required per distribution class.

### 1.2 Authorities read (repository evidence)

| Document | What D28 takes from it |
|---|---|
| `INTELLECTUAL-PROPERTY-CHAIN.md` (MC-02) | Repository has **no licence**, four author identities, 47.9 %/51.7 % last-touch split, no CLA/DCO, AI-authored commits, 204-file opaque root commit, rights categories A–J, risk register R-IP-01…R-IP-12, missing assignments D-01…D-13 |
| `LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md` (MC-02) | Five distribution modes, allow/deny matrix, 1,034-row inventory figures, copyleft inventory, notice-bundle outputs per artefact, firmware licensing §9, release gates G-01…G-20 |
| `MAREA-PRODUCT-REUSE-MAP.md` (MC-02) | Element register E-01…E-24 with `REUSE-CANDIDATE`/`REUSE-CONDITIONAL`/`LICENSE-OR-PARTNER`/`BUILD`/`REPLACE-OR-REMOVE`/`BLOCKED` statuses |
| `MC-02-BLOCKERS-AND-DECISIONS.md` | Blockers S-01…S-09 (software licensing/supply chain), H-01…H-13 (hardware/safety/certification) |
| `MAREA-PRODUCT-REUSE-MAP.md` §4 + `HARDWARE-COMPLIANCE-MATRIX.md` §4 | Legacy firmware provenance, Pico 2 safety-bridge status, NMEA licensing, hardware-device notices |
| `MC11-BASELINE-AND-GOVERNANCE.md` §4 | The invariants D28 may not weaken |
| `MC11-PROTOCOL-AND-COMPATIBILITY-ASSESSMENT.md` (D6) | Transport-level compatibility vocabulary, the NMEA licensing position and the rule that compatibility is a claim about a specific device, firmware version, message type and direction backed by a recorded test |
| D27 | The device-security requirement set that firmware supply-chain controls must support |

### 1.3 Sources fetched in this session (retrieval date 2026-11-02)

- MicroPython licence file (`EVD-MC11-505`) — MIT plus per-directory third-party components.
- Toradex secure-boot fuse-programming documentation (`EVD-MC11-509`) and U-Boot Verdin i.MX8M Plus board
  documentation (`EVD-MC11-512`) — SoC/BootROM boot chain, vendor DDR firmware, GPL-2.0-or-later board doc.
- MCUboot (`EVD-MC11-510`) and RAUC (`EVD-MC11-511`) documentation — candidate bootloader and update-client
  mechanisms (their own licences were **not** retrieved and are not asserted).
- NXP SE050 (`EVD-MC11-506`), ST STSAFE-A120 (`EVD-MC11-507`) and Microchip ATECC608B (`EVD-MC11-508`)
  pages — provisioning services and part status, as inputs to the supply-chain analysis.
- EUR-Lex CRA text (`EVD-MC11-501/502/503`) and ENISA vulnerability-services page (`EVD-MC11-504`) — only for
  the SBOM/update/vulnerability obligations that shape the supply-chain process.
- Three `INACCESSIBLE` pages (`EVD-MC11-513/514/515`) assert nothing.

**Nothing in the legacy OPEN-MARINE repository was re-audited in this session.** The licence inventory
figures below are quoted from the MC-02 audits as repository evidence; where a licence text was not
fetched here, that is stated.

---

## 2. The central distinction, stated three times

**2.1 Original engineering design.** MAREA firmware will be written from MAREA requirements, by MAREA (or a
contracted developer under a written assignment), using documented interfaces, public specifications and
permissively licensed third-party components with their notices. That is original design. It is the
intended route.

**2.2 Architecture ideas may be studied; expression may not be copied.** A public repository can be read.
Its *ideas* — a data-contract shape, a quality-flag model, a freshness rule, a failure taxonomy, an update
state machine, a boot-chain arrangement — may inform a MAREA design, provided MAREA produces its own
implementation from its own requirements and does not reproduce the original's expression (code,
structure, comments, file layout, naming, generated artefacts, tests). The boundary is legal and
practical, and the safe engineering practice is a **clean-room discipline** (§8): the person writing code
works from a MAREA requirements/interface specification, not from an open editor containing the other
project's source.

**2.3 Copying code is prohibited and remains prohibited even if a design idea is sound.** No OPEN-MARINE
first-party source may be copied, adapted, vendored, generated from or translated into a MAREA product
until `SOURCE_IP_CLEARANCE` is formally changed by the owner after the missing assignments and licence
decisions exist. MC-11 does **not** change it.

> **Rule for every future firmware commit:** if a line of code can be traced to an OPEN-MARINE file, it
> does not belong in a MAREA product. Provenance matters more than novelty; a re-typed copy is still a
> copy.

---

## 3. OPEN-MARINE IP position (repository evidence, not re-cleared)

The MC-02 IP chain establishes, and MC-11 does not overturn:

| Fact | Consequence for firmware |
|---|---|
| The OPEN-MARINE repository is public and has **no `LICENSE`, `COPYING` or `NOTICE` file**; GitHub reports no licence; default copyright applies | No inbound reuse right exists for EMBARCARTE/MAREA. **All first-party OPEN-MARINE code is "all rights reserved"** until a written assignment/licence exists |
| Four author identities; **495 of 1,033 files (47.9 %) last-touched by an external employer-domain author** and 534 (51.7 %) by a company-domain author; no CLA, DCO or `Signed-off-by` | Rights may vest with contributors, employers or clients. Assignments/waivers are missing (D-02, D-03, D-04) |
| Five commits authored by an AI identity; AI-agent branches; AI provenance recorded only by commit e-mail | Copyright status of AI-assisted material is unsettled (D-05, R-IP-04); such files must not be assumed reusable |
| The first commit already contained **204 files** (history before 2026-01-27 is not documented in the repository) | Provenance is opaque for the root import (R-IP-12); originality cannot be assumed |
| No copyright headers, no SPDX identifiers, no "adapted from" markers in first-party source | Provenance of individual files is not documented; a code-provenance review is required (D) |
| Third-party inventory: 1,034 rows; 960 permissive (MIT/ISC/BSD/PSF/WTFPL), 38 Apache-2.0, 13 BlueOak, 6 public-domain, 3 Creative Commons attribution (build-only), 6 copyleft, 7 proprietary/UNLICENSED, 1 unknown | Per-component licence treatment is required; the programme cannot be described as "open source" or "cleared" |
| No notice bundle exists; G-03 is `FAIL`; firmware notice gate **G-20 is `FAIL`** | Any external distribution today would breach attribution terms — nothing may be shipped |

**Repository-level status: `PARTIAL` / ownership `BLOCKED` on external documents.** `SOURCE_IP_CLEARANCE =
NOT_CLEARED`.

---

## 4. Which source files are covered by which licence

This is a **licence-boundary map for the legacy stack**, not a MAREA inventory. `LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md`
§5.2 and `SOFTWARE-LICENSE-INVENTORY.csv` are the authoritative inventory; the table quotes them.

| Source area / component | Licence (as recorded by MC-02) | Verification in this session | Reuse consequence |
|---|---|---|---|
| **OPEN-MARINE first-party code** — every workspace: instrumentation UI, chart engine, autopilot engine (incl. `pico2/`), sensor gateway, simulation platform, data contract, tile server, `scripts/`, `docs/`, `config/` | **No licence (all rights reserved)**; one stray `"license": "ISC"` in `marine-tile-server/package.json` (R-IP-01) | Not re-audited; repository evidence | **Cannot be copied.** Reuse needs a written assignment/licence from the rightsholders; the stray ISC field is inconsistent and does not license the repository |
| npm tree (997 third-party `name@version` across 5 lockfiles) | Predominantly MIT/ISC/BSD (960 rows), Apache-2.0 (38), BlueOak (13), CC0/Unlicense (6), CC-BY (3 build-only), `UNKNOWN` (1: `@mapbox/jsonlint-lines-primitives`) | Inventory figures from MC-02; individual licence texts not re-fetched | Usable with the corresponding notices; `UNKNOWN`/`UNLICENSED` must not ship; bundled JS must retain notices |
| Signal K server image | Apache-2.0 (inventory) | Not re-fetched | Depends on digest pinning, NOTICE text, image SBOM; **not** a MAREA firmware component |
| **MicroPython** runtime (a Pico-2 path dependency, not MAREA firmware) | MIT for the repository; rp2 port components BSD-3-clause (mutex_extra.c, clocks_extra.c); pico-sdk, lwip, littlefs, axtls, etc. BSD-3; tinyusb/wiznet5k MIT; uzlib Zlib; logo OFL-1.1; `tools/dfu.py` LGPL-3.0-only; (L)GPL tools build-only | Fetched (`EVD-MC11-505`) | Redistributable with notices; a programmed board needs `FIRMWARE-NOTICES.txt`; exact per-release mapping still owed |
| AIS-catcher (external binary for AIS reception) | **GPL-3.0** | Not re-fetched; inventory + policy | Must not be bundled into a proprietary artefact without a GPL compliance decision (source offer, licence text, installation information for User Products) or separate-process aggregation confirmed by counsel (`LEGAL_REVIEW_REQUIRED`) |
| `librtlsdr` / `libusb` (AIS-catcher build deps) | GPL-2.0-or-later / LGPL-2.1-or-later | Not re-fetched | Build-only unless distributed with the binary; if distributed, source/relink obligations |
| `copernicusmarine` (optional operator tooling) | EUPL-1.2 | Not re-fetched | Keep out of any shipped image, or comply; unresolved |
| `make`, `g++` inside `marine-tile-server` image | GPL-3.0-or-later | Not re-fetched | Build tools left in a distributed image create GPL obligations; multi-stage build required (G-07) |
| Vendor firmware / blobs (SoC, Wi-Fi/BT, modem, secure element) | **Not established** in this session | Not retrieved | Must be registered per blob with source, hash, licence and notice before any distribution (§6.4) |
| MCUboot / RAUC (candidate mechanisms) | **Not retrieved in this session** | Not retrieved | Named as candidate mechanisms only; licence must be verified before selection or vendoring |
| NMEA 0183 / NMEA 2000 standards and certification material | Copyrighted association documents; NMEA licence/fees evidenced in the architecture workstream (`EVD-MC11-001…004`) | Not re-fetched | No standards text may be reproduced; NMEA 2000 implementation/certification remains `BLOCKED`; even NMEA 0183 conformance cannot be claimed |

**Reading the table correctly:** a permissive licence permits use *with notices*, not "anything goes"; a
copyleft licence imposes source-disclosure conditions; and **no licence here grants a right to the
OPEN-MARINE first-party tree**, which has no licence at all.

---

## 5. Architecture ideas that may be studied, code that may not be copied

The element IDs are from `MAREA-PRODUCT-REUSE-MAP.md` §3; statuses are MC-02 decisions and are not changed
here. "Study" means: extract requirements and interface-level understanding, then design MAREA's own
firmware. "Copy" means: take expression. The column **"Reusable code?"** always answers the code question,
not the idea question.

| ID | Element (legacy) | Status (MC-02) | Study the idea? | Reusable code today? | Conditions under which code would be reusable |
|---|---|---|---|---|---|
| E-01 | Marine data contract (Signal K-derived paths, SI units, quality flags, `DataPoint<T>`, clock-drift normalisation) | `REUSE-CANDIDATE` | **Yes** — the *requirement* to have units/quality/freshness is a design idea; MAREA must define its own contract text and types | **No** — all rights reserved | Written assignment/licence from rightsholders (D-01…D-05) **and** a programme rights decision (D-002); then still a legal review of what is copied |
| E-02 | Signal K server runtime as deployed (third-party image + systemd units) | `REUSE-CANDIDATE` | Yes, as an interoperability target | As a third-party server only: Apache-2.0 with notices and digest pinning; not a MAREA firmware component | Apache-2.0 notice retention, digest pinning, image SBOM; product support position |
| E-03 | Signal K delta publish/subscribe client patterns | `REUSE-CANDIDATE` | Yes — the pattern; the protocol is an independent interface | **No** — all rights reserved | Assignment/licence + rights decision |
| E-04 | First-party sensor publishers (NMEA 0183 wind parser, IMU fusion, GPS) | `REUSE-CONDITIONAL` | Yes — the failure-handling and calibration ideas | **No** | Assignment/licence; real-sensor tests; calibration evidence |
| E-05 | Autopilot control engine (state machine, controllers, fault manager) | `REUSE-CONDITIONAL` | **No for a product path** — `PILOT_SAFETY_GATE = BLOCKED`; only a future authorised safety programme could even consider it | **No** | Would require the safety programme and a rights decision; out of scope in MC-11 |
| E-06 | Pico 2 safety-bridge firmware | `REUSE-CONDITIONAL` | For hazard-list learning only | **No** | Safety validation + rights; NRND/hardware issues; not a MAREA firmware base |
| E-07 | AIS reception through an external AIS-catcher | `REPLACE-OR-REMOVE` (bundled) / `REUSE-CONDITIONAL` (separately installed) | Yes, as an integration pattern | AIS-catcher is GPL: only under a compliance decision or separate-process aggregation confirmed by counsel | GPL decision; pinning/hash; source offer |
| E-08 | AIS target model, CPA/TCPA, coalesced target store | `REUSE-CANDIDATE` | Yes — the target-age and honesty ideas | **No** | Assignment/licence; CPA tests |
| E-09 | Chart engine | `REUSE-CONDITIONAL` | Yes, at the service-boundary level | **No** | Assignment/licence + chart rights; GDAL/tippecanoe pinning |
| E-10 | Environmental/weather aggregation | `REUSE-CONDITIONAL` | Yes, as a provenance/freshness pattern | **No** | Assignment/licence + provider rights |
| E-11 | Instrument dashboard patterns | `REUSE-CANDIDATE` | Yes | **No** | Assignment/licence; quality-flag propagation |
| E-12 | Angular navigation UI application | `REUSE-CONDITIONAL` | At the UX/requirements level | **No** (whole-app adoption decision) | Whole-application decision + rights + device-shell adaptation |
| E-13 | Simulation platform | `REUSE-CANDIDATE` (internal test harness only) | Yes — harness concepts | **No** | Assignment/licence; bench isolation fix |
| E-15 | Deployment assets (bootstrap/migration, systemd units, probes) | `REUSE-CONDITIONAL` | Yes, as a checklist of failure modes | **No** | Assignment/licence; must be re-authored for an appliance |
| E-16 | NMEA 2000 / CAN ingestion | `BLOCKED` | No implementation exists to study; standards/licence prerequisite | **No** | NMEA licence, manufacturer code, product code, certification — a programme, not a task |
| E-17 | Remote monitoring, alert delivery, geofence | `BUILD` | Nothing to study; WATCH is a build from requirements | No code exists | n/a |
| E-18/E-19/E-20 | Tenant SaaS, billing, device registration | `BUILD` | No legacy code | No code exists | n/a |
| E-21 | Authentication/authorisation for onboard services | `BUILD` | Yes — as a lesson in what **not** to do (legacy API unauthenticated, binds `0.0.0.0`, CORS `*`) | **No** | Build from requirements (D27) |
| E-22/E-23 | Licensed chart/weather supply | `LICENSE-OR-PARTNER` | n/a | n/a | Provider agreements; not a firmware matter |
| E-24 | Navigation rendering engine | `REUSE-CONDITIONAL` | Yes | **No** | Assignment/licence; rendering evidence |

### 5.1 Which dependencies require separate permission

| Dependency | Why separate permission is needed | Status |
|---|---|---|
| **OPEN-MARINE repository as a whole** | No licence; missing contributor/employer assignments; owner decision D-01..D-05 | `BLOCKED` — `SOURCE_IP_CLEARANCE = NOT_CLEARED` |
| **NMEA 0183 document / NMEA 2000 licence + Manufacturer Code + Product Code + product certification** | Association licensing and certification; no membership/licence exists; no NMEA 2000 implementation | `BLOCKED` (H-04, O-09) |
| **AIS-catcher (GPL-3.0)** | Copyleft distribution decision or separate-process aggregation confirmed by counsel | `LEGAL_REVIEW_REQUIRED` |
| **`copernicusmarine` (EUPL-1.2)** | Source/notice obligations if distributed | `LEGAL_REVIEW_REQUIRED` |
| **`make`/`g++` inside a distributed image** | GPL in image; multi-stage build or compliance | `OPEN` |
| **Chart/ENC rights (S-63/OEM), weather provider rights, OSM tile policy** | Data contracts; not firmware licences | `BLOCKED` (D-01/MC-02 D-01…D-10) |
| **`icm20948` Python package and HAT design licence** | Design licence if MAREA manufactures a derivative HAT | Not verified |
| **Vendor datasheets/figures (Raspberry Pi, Toradex, Cytron, TDK/InvenSense, modem vendors)** | Reproduction of vendor tables/figures needs permission; citation is acceptable | `LEGAL_REVIEW_REQUIRED` if copied into product documentation |
| **Secure-element provisioning services** (NXP EdgeLock 2GO per `EVD-MC11-506`; ST personalisation loading customer secrets at ST manufacturing per `EVD-MC11-507`) | Contract, key-custody terms, data-processing terms and per-unit cost | Not obtained |
| **Toradex/Torizon secure-boot tooling and Torizon Cloud** (per `EVD-MC11-509`) | In-field fusing uses Torizon Cloud and requires a commercial licence; tooling/BSP terms | Not obtained |
| **MCUboot / RAUC** (candidate mechanisms) | Their own licences were not retrieved; a permissive licence does not remove the obligation to verify | Not verified |

### 5.2 Code that cannot be reused (explicit list)

1. **Any OPEN-MARINE first-party source file** — no licence, missing assignments.
2. **The Pico 2 safety-bridge firmware** — rights unavailable **and** safety-relevant **and** tied to an NRND
   hardware path; `PILOT_SAFETY_GATE = BLOCKED`.
3. **The autopilot control engine and any steering-related logic** — safety gate blocked; out of scope.
4. **AI-authored files** (four current files last-touched by the AI identity, per the IP chain) — copyright
   status unsettled; do not reuse.
5. **Files whose provenance traces to the opaque 204-file root import** — originality cannot be assumed.
6. **AIS-catcher inside a proprietary MAREA artefact** — GPL-3.0; prohibited without a compliance decision.
7. **`make`/`g++` or any copyleft tooling left in a distributed image**.
8. **`@mapbox/jsonlint-lines-primitives` or any `UNKNOWN`/`UNLICENSED` component** — must not ship until
   resolved in writing.
9. **Any third-party binary blob without a registered source, hash and licence** (§6.4).
10. **Any vendor datasheet table/figure reproduced verbatim** in product documentation.

### 5.3 Specifications that could be independently implemented

| Specification | Independent implementation basis | Constraint |
|---|---|---|
| MAREA local vessel data contract (units, timestamps, quality, freshness, stale thresholds) | MAREA's own product requirement; the *idea* of a quality/freshness-bearing data contract may be informed by studying public material | Any text/code copied from OPEN-MARINE is prohibited; MAREA authors its own specification and types |
| Diagnostics vocabulary and owner-export bundle | MAREA product requirement + D27 | Must not copy the legacy diagnostics text/structure |
| Boot/update state model, A/B semantics, anti-rollback | Public documentation of the candidate mechanisms (MCUboot, RAUC, SoC HAB/AHAB) and standards-level understanding | Mechanisms are usable as third-party components under their licences with notices; a from-scratch implementation must be MAREA's own |
| Signal K path consumption/publishing | Signal K is a documented open interface; MAREA implements its own client | **Licence terms of the Signal K specification were not verified in this session**; `LEGAL_REVIEW_REQUIRED` before any compatibility claim |
| NMEA 0183 sentence parsing | MAREA could implement an independent parser from public sentence descriptions plus its own requirements — D6 §5 conclusion 2 records that NMEA 0183 is the only legacy interface implementable without a standard purchase | **The standard text is copyrighted and not licensed to MAREA**; field-level detail must not be taken from unlicensed copies; no conformance claim; `LEGAL_REVIEW_REQUIRED` |
| AIS message decoding (`!AIVDM`) | Independent implementation from public technical descriptions (e.g. ITU-R M.1371) if a MAREA receiver is ever built | No AIS-catcher code; standards text not held; receive-only; no transmission; decoder GPL decision (D9/DEC-04) |
| Device identity, provisioning, signed-update authorisation | MAREA's own design informed by public secure-boot/update documentation | Must be MAREA's own implementation; vendor tooling used under its own terms |
| SBOM generation | Deterministic extraction from MAREA's own build | Tool licences to be verified before selection |

### 5.4 Interoperability claims that would require testing

Every row is `TEST_REQUIRED`; **no tested interoperability row exists in MC-11** (`TESTED_COMPATIBILITY_ROWS =
0`, `NMEA2000_CERTIFIED = false`).

| Claim domain | What would have to be tested | Current status |
|---|---|---|
| Signal K paths and directions | Per source, per Signal K version, per path and per direction, with recorded device/software versions | `TEST_REQUIRED` |
| NMEA 0183 sentence support | Per sentence, per talker, per baud rate, per device; conformance cannot be claimed without the standard and testing | `TEST_REQUIRED`/`BLOCKED` |
| `!AIVDM` output/consumption | Per receiver and consumer, format correctness, target-age semantics | `TEST_REQUIRED` |
| Third-party gateway read-only constraint | Verify no write path (routes/waypoints) is reachable from MAREA software, including through a bidirectional gateway such as the verified comparator | `TEST_REQUIRED` |
| Update bundle compatibility | RAUC bundle format vs target bootloader, version/counter compatibility, rollback behaviour on the specific hardware | `TEST_REQUIRED` |
| MCUboot image compatibility | Image format vs SoC/MCU flash layout and BootROM constraints; recovery path | `TEST_REQUIRED` |
| Secure-element middleware compatibility | SE driver/middleware on the chosen OS/BSP (Linux and/or MCU), key-slot mapping, provisioning flow | `TEST_REQUIRED` |
| TLS stack compatibility | Device TLS against the MAREA service, certificate validation, per-device credential presentation | `TEST_REQUIRED` |
| Notification-provider delivery evidence | Provider acceptance vs delivery confirmation semantics (WATCH §5) | `TEST_REQUIRED` |
| Cloud/tenant identity | Credential-derived tenant, rejection of payload-selected tenant (FLEET §8.4) | `TEST_REQUIRED` |

A claim may only be published **per device, per firmware version, per message/data type and per direction,
backed by a recorded test** (D7 §7). Nothing in this document creates such a claim.

---

## 6. Firmware supply chain

### 6.1 Vendor BSP/SDK lifecycle

| Layer | Candidate vendor/ecosystem | Lifecycle questions | Current state |
|---|---|---|---|
| Application-processor BSP/OS (HUB, DISPLAY, AIS-CONNECTED) | Toradex Verdin i.MX8M Plus class — Torizon OS/Yocto, vendor BSP; minimum product commitment 2036+ for listed variants per the architecture workstream (`EVD-MC11-010/011`) | BSP support window vs MAREA support period; Yocto layer maintenance; kernel CVEs; vendor security advisories; migration path to a successor SOM | Not selected; no BSP pinning; no support-window commitment |
| Supervisory MCU SDK | STM32H743 (vendor SDK) or RP2350 (Pico SDK) — `EVD-MC11-012`, `EVD-MC11-007` | SDK update cadence, vendor security notices, RTOS/bootloader port support | Not selected |
| Firmware runtime (if MicroPython were ever used) | MicroPython project (`EVD-MC11-505`) | Release pinning, patch cadence, rp2 port notices, LGPL build-tool avoidance in the shipped image | Not part of a MAREA design; notice obligations understood |
| Secure element | NXP SE050 / ST STSAFE-A120 candidates; ATECC608B **NRND** (`CMP-SEC-01/02`) | NRND replacement, long-term availability, provisioning-service dependency, certification expiry | Not selected; NRND is an open lifecycle risk |
| Cellular modem (WATCH) | Quectel EG915U/BG95 candidates (`CMP-CELL-01…04`) | Modem firmware updates (vendor-controlled), operator certification, security advisories, eSIM provisioning | Not selected; no operator or vendor engagement |
| Wi-Fi/BLE module (if in scope) | ESP32-C6 / nRF52840 candidates (`CMP-WIFI-01`, `CMP-BLE-01`) | Vendor SDK, protocol-stack CVEs, RF certification, host integration | Not selected; radio presence is `EDITION_INTERFACE_UNSPECIFIED` |

**Candidate rule:** a vendor BSP/SDK is a **dependency with its own lifecycle**, and the product support
period cannot exceed what the vendor supports without a documented migration plan (`SEC-G-34`). No vendor
was contacted, so no support-window statement can be made.

### 6.2 BootROM / SoC vendor dependency

- The root of trust lives in the SoC: the BootROM loads the first signed stage and, once the device is
  "closed", refuses an image not signed with the correct PKI tree (`EVD-MC11-509`). **The BootROM is not
  field-updatable**; a BootROM vulnerability is a silicon-level exposure that firmware cannot repair.
- Secure boot is configured by programming **one-time fuses** with the public-key information and optionally
  closing the device; the operation is irreversible (`EVD-MC11-509`). A manufacturing error can produce a
  non-booting unit, and a key-ceremony error can produce an unrecoverable fleet.
- The documented i.MX8M Plus boot flow depends on vendor TF-A, a vendor **DDR firmware binary blob** and
  U-Boot, packed into a FIT image and loaded by SPL from the BootROM handover (`EVD-MC11-512`).
- Consequence for MAREA: the firmware supply chain begins **before** MAREA's code — SoC vendor, module
  vendor, BSP, bootloader, TF-A and training blobs must all be registered, pinned and covered by notices.
  No such register exists.

### 6.3 Build reproducibility and toolchain pinning (candidate programme)

| Requirement direction | Candidate mechanism | Current state |
|---|---|---|
| Pinned inputs | Every build records exact versions/digests for OS/BSP, bootloader, kernel, compilers, Python, package manager, SDKs, container base images and vendor blobs | `NO_IMPLEMENTATION`; legacy deviations: `releases/latest` downloads, mutable image tags, unpinned Python deps (LICENSE-NOTICE policy G-08/G-16) |
| Deterministic output | Reproducible-build settings (e.g. `SOURCE_DATE_EPOCH`), fixed ordering, stable paths, recorded build environment; re-build and hash comparison | `NO_IMPLEMENTATION` |
| Artefact integrity | Each released image has a recorded hash; the hash is bound into the signing manifest and the manufacturing record | `NO_IMPLEMENTATION` |
| Signed build provenance | Build metadata (inputs, toolchain, commit) recorded and, where the platform permits, signed; candidate internal provenance attestation — **no SLSA level or equivalent is claimed** | `NO_IMPLEMENTATION` |
| SBOM per release | Deterministic SBOM covering OS, libraries, vendor blobs and firmware components | `NO_IMPLEMENTATION` |
| Toolchain distribution | Build toolchains (including copyleft `make`/`g++`) are kept out of runtime images; build-only components are re-reviewed before any distributed image changes classification | Legacy non-multi-stage Dockerfile is an open finding (G-07) |

**Why this matters for security, not only licensing:** an update that cannot be re-created cannot be
audited; a binary that cannot be tied to a source tree cannot be patched with confidence; and a build
artefact without a hash cannot be bound to a manufacturing record or to a signed manifest.

### 6.4 Third-party binary blobs

| Blob (candidate) | Where it appears | Can MAREA modify it? | Licence/notice status | Register status |
|---|---|---|---|---|
| SoC BootROM | Inside the SoC | No | Not a redistributable blob; manufacturer terms govern the device | Not registered |
| DDR training firmware (`firmware-imx` per `EVD-MC11-512`) | Build input for the boot chain | No (vendor binary) | NXP distribution terms **not retrieved** | Not registered |
| TF-A / U-Boot bootloader binaries | Boot chain | Built from source in principle; redistribution terms of the specific components not verified here | Not verified | Not registered |
| Wi-Fi/BLE firmware (e.g. ESP32-C6, nRF52840) | Module firmware | No | Vendor terms **not retrieved** | Not registered |
| Cellular modem firmware (e.g. Quectel) | Modem | No; vendor update channel | Vendor terms **not retrieved** | Not registered |
| Secure-element OS / applets (SE050, STSAFE-A120) | Secure element | No (certified OS) | Vendor terms **not retrieved** | Not registered |
| X.509 root/intermediate certificate bundles | Firmware trust store | Managed by MAREA (issuance), but rooted in public/CA/vendor trust | Standard terms | Not designed |
| Provisioning-service hosted components (NXP EdgeLock 2GO; ST personalisation) | Manufacturing | No | Contract needed (`EVD-MC11-506/507`) | Not contracted |

**Candidate rule:** no firmware release may contain a binary blob that is not in the blob register with
source, version, hash, licence terms and notice text (`SEC-G-35`). "It came with the BSP" is not a
provenance record.

### 6.5 Notice obligations on any programmed board or vendor distribution

The MC-02 policy requires, for the **embedded firmware** distribution mode, a `FIRMWARE-NOTICES.txt`
accompanying **each programmed board or download bundle** (`LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md` §6.2,
§9). For a MicroPython-based build the required content includes:

1. the MicroPython MIT licence and copyright;
2. the rp2 port third-party component notices (BSD-3-clause families) and any other enabled-module notices
   identified from the upstream licence tree;
3. a first-party notice stating authorship and the outbound terms of the MAREA product (which cannot be
   stated until the outbound-licence decision exists);
4. `mpremote`/`pyserial`/`platformdirs` notices **only if** the deployment tooling is redistributed;
5. (where the build includes it) the licence texts of any additional component, including copyleft
   components with a source offer and installation information where required.

Evidence: `EVD-MC11-505` (fetched MicroPython licence file). Status: **G-20 `FAIL`** — no firmware notice
bundle exists because no firmware exists. Vendor datasheets/diagrams must **not** be reproduced in
documentation without permission; link instead (policy §9.3).

### 6.6 Licence-notice bundle required per distribution class

| Distribution class (policy §2) | Required notice artefacts | Current state |
|---|---|---|
| **Programmed board / firmware download** (embedded firmware) | `FIRMWARE-NOTICES.txt`: MicroPython MIT + rp2 BSD-3 + enabled-module notices + first-party notice + tooling notices if redistributed + any copyleft source offer | **`FAIL` (G-20)** — nothing exists |
| **Appliance software** (OS image / installed software) | `THIRD-PARTY-NOTICES.txt` in the install root and in the documentation directory; full licence texts; SBOM alongside; image digest record | **`FAIL` (G-03/G-07)** |
| **Container image** | Licence texts and notices inside the image; image-level SBOM; base images pinned by digest; no copyleft build tools in the runtime stage | **`FAIL` (G-07/G-08)** |
| **Hosted service / web client** (web UI/JS) | Served third-party notices route and licence screen; notices retained in bundled JS; data attribution block | **`FAIL` (G-03/G-10)** |
| **Documentation / printed material** | Data attribution block and open-source acknowledgements; vendor figures only with permission | **`FAIL` (G-10/G-13)** |
| **Build-only** | Notices not required in the product if not redistributed, but classification must be re-reviewed before any distributed image changes (policy §2 rule) | `PARTIAL` — classification exists in the inventory, not enforced in tooling |

**Candidate rule:** the notice bundle is generated deterministically from the pinned build's inventory and
attached to the release record, with the generation hash (`SEC-G-32`, `SEC-G-33`). A release without a
notice bundle is not distributable.

### 6.7 Supply-chain provenance (manufacturing)

| Control direction | Candidate mechanism | Current state |
|---|---|---|
| Serial ↔ identity ↔ firmware binding | Manufacturing record per device: serial, model/hardware revision, secure-element lot, public key/certificate fingerprint, firmware hash, provisioning station/operator, test result (`SEC-G-03`) | `NO_IMPLEMENTATION` |
| Component authenticity | Approved-vendor/AVL controls, counterfeit detection, incoming inspection, lot traceability | Not designed |
| Contract-manufacturer controls | Written security requirements for the manufacturing partner, controlled provisioning stations, access logs, tamper-evident logistics, incident notification | Not contracted |
| Firmware release provenance | Every shipped firmware traces to a signed release manifest, a build hash and a source revision | `NO_IMPLEMENTATION` |
| Vendor change monitoring | PCN/EOL/security-advisory monitoring per part and per BSP; NRND trigger (`SEC-G-34`) | `NO_IMPLEMENTATION`; ATECC608B NRND already open |
| Field update provenance | Update state, version and failure record retained locally and (where consented) in the service | `NO_IMPLEMENTATION` |
| Chain of custody | Documented custody from manufacturer to distributor to installer; theft/return handling | Not designed |

**No provenance certification (e.g. SLSA or any equivalent) is claimed or planned as a claim.** Provenance
attestation is an engineering control to be designed; nothing in MC-11 establishes it.

---

## 7. Conditions under which each OPEN-MARINE component would be reusable

`SOURCE_IP_CLEARANCE` stays **`NOT_CLEARED`** in MC-11 regardless of this table. The table states the
conditions a *future authorised* decision would have to satisfy; satisfying them is not done here.

| Element | Conditions before any code reuse could be considered | Who must act |
|---|---|---|
| All first-party OPEN-MARINE code | 1) Written ownership confirmation and assignment/licence from the company-domain and external contributor identities, incl. employer position; 2) outbound-licence/terms decision; 3) AI-assisted-material provenance record and decision; 4) code-provenance review of the opaque root import; 5) a recorded programme rights decision explicitly permitting the specific reuse; 6) legal review of what is actually copied | Owner + counsel (D-01…D-05, D-002) |
| Data contract / publishers (E-01, E-03, E-04, E-08, E-11) | The above **plus** real-sensor/calibration tests and CPA tests where applicable; copying code is still subject to the rights decision | Engineering + counsel |
| Signal K runtime composition (E-02) | Apache-2.0 notice retention, digest pinning, image SBOM, product support position; not a firmware component decision | Engineering |
| AIS-catcher (E-07) | GPL-3.0 decision: ship with full compliance (source offer, licence text, installation information) **or** separate-process aggregation confirmed by counsel **or** replace the decoder; pin version and hash | Engineering + counsel |
| `copernicusmarine` (EUPL) | Keep out of shipped images, or comply with EUPL source/notice obligations | Engineering + counsel |
| Chart engine / UI (E-09, E-12, E-24) | Rights decision **plus** chart-data rights; whole-application adoption is a programme decision, not a module import | Product + counsel |
| Autopilot engine / Pico firmware (E-05, E-06) | **Not reusable in MC-11 under any condition**: safety gate blocked and out of scope; a future authorised safety programme would still need rights, hardware, bench/sea evidence and independent review | Safety programme (not funded) |
| Legacy NMEA 2000 | Requires NMEA licence, manufacturer code, product code, certification and a funded implementation programme | Commercial + engineering |
| MCUboot / RAUC (candidate mechanisms) | Licence verification (not retrieved), security advisory monitoring, integration testing, SBOM inclusion | Engineering |

**Even if every condition were met, reuse would be a separate authorised decision with its own record.**
D28 recommends **original implementation from MAREA requirements** for all firmware logic, with third-party
components only where a verified licence and a clear maintenance story exist.

---

## 8. Provenance controls for MAREA firmware (process rules)

Candidate rules for a future firmware programme (they are requirements, not current practice):

1. **Clean-room discipline.** Implementation works from a MAREA requirements/interface document; no
   OPEN-MARINE source in the working tree, the editor workspace or the prompt context of an AI tool without a
   documented rights decision. Where study of an idea informs a design, record the study in the design note
   at the idea level, not as copied text.
2. **Commit provenance.** Every firmware commit identifies its origin (human/contractor, requirement ID) and
   records AI-tool use per the MC-02 AI policy. AI-generated code is permitted only with a recorded tool,
   model, prompt context and human review, and never as a substitute for a rights decision.
3. **No third-party code without a licence record.** Any vendored component enters with its licence, version,
   source URL, hash, notice text and owner approval; copyleft components additionally need a recorded
   compliance decision.
4. **SPDX headers only after the outbound decision.** Adding headers before the ownership/outbound decision
   is prohibited (policy §10.3); once decided, headers follow the decided terms consistently.
5. **No "open source" language** about OPEN-MARINE or MAREA firmware while no licence exists (policy §10.4).
6. **Release gate.** A release requires: SBOM, notice bundle, pinned inputs, signed artefacts, vulnerability
   scan/process, and a recorded security review (D27 §14). None of this exists.
7. **Evidence retention.** Provenance records, SBOMs, notices, build hashes, licence decisions and
   manufacturing records are retained at least as long as the product is supported plus the documented
   period (policy §16).

---

## 9. Net conclusions and decisions needed (for D30)

### 9.1 Net conclusions

1. **`SOURCE_IP_CLEARANCE = NOT_CLEARED`.** No OPEN-MARINE first-party code may be reused in MAREA firmware.
   The programme has no inbound licence and no completed assignment chain.
2. **Architecture ideas can be studied; expression cannot be copied.** MAREA firmware should be designed from
   MAREA requirements, with third-party components used only under verified licences and notices.
3. **The legacy firmware is not a security or provenance base.** It has no licence, no HW watchdog, no
   signed update, an unauthenticated control plane and unsettled authorship; it is an input to requirements
   and hazard lists, not a code source.
4. **Third-party dependencies each carry a separate permission or notice obligation.** The copyleft items
   (AIS-catcher, `make`/`g++`, copernicusmarine, librtlsdr/libusb) need a written decision; `UNKNOWN`/
   `UNLICENSED` components must not ship.
5. **Firmware supply chain is real and unmanaged.** BootROM/fuse dependence, vendor BSP lifecycle,
   vendor binary blobs, toolchain pinning, reproducibility, SBOM and the firmware notice bundle are all
   `NO_IMPLEMENTATION`.
6. **No notice bundle exists for any distribution class; G-03 and G-20 are `FAIL`.** Nothing may be
   distributed. This is a release blocker, independent of the security work.
7. **No interoperability claim can be published.** Every row is `TEST_REQUIRED`; `TESTED_COMPATIBILITY_ROWS
   = 0`.

### 9.2 Decisions the Lead/D30 must take

| ID | Decision | Why it cannot be taken in D28 |
|---|---|---|
| D28-D1 | Fund/authorise an IP-clearance process for OPEN-MARINE (assignments, outbound terms, AI provenance, provenance review) — or abandon reuse permanently and commit to original implementation | Legal/ownership work requiring the owner and counsel; `SOURCE_IP_CLEARANCE` cannot be cleared by an agent |
| D28-D2 | Decide the outbound licence position for MAREA firmware/products (proprietary vs other) | Owner + counsel |
| D28-D3 | Decide AIS decoder strategy (GPL compliance vs replacement vs separate-process integration) | Legal + engineering |
| D28-D4 | Decide whether any third-party firmware/BSP component is vendored or consumed as a managed dependency; select the update framework | Engineering + security + supply chain |
| D28-D5 | Decide the firmware notice generation and release-gate ownership (who signs off SBOM + notices + provenance) | Programme management |
| D28-D6 | Decide the acceptable vendor-dependency envelope (BSP support window, NRND policy, second source) vs the support-period commitment | Commercial + engineering |

---

## 10. Non-assertions (verbatim, to be preserved in any reuse of this document)

1. No MAREA firmware exists; no code was copied from OPEN-MARINE or any other third party; no licence was
   granted, cleared or interpreted by this document.
2. `SOURCE_IP_CLEARANCE` remains **`NOT_CLEARED`**; `OPEN_MARINE_WRITE = PROHIBITED`.
3. Studying an architecture idea is not a licence to copy its expression; copying remains prohibited.
4. No third-party licence obligation is discharged by this document, and no notice bundle exists.
5. No supplier, distributor, contract manufacturer or licence holder was contacted; no terms were obtained.
6. No build was reproduced; no toolchain, SBOM, provenance attestation or firmware artefact exists.
7. No interoperability, compatibility, conformance, certification or security claim is made; every
   interoperability row is `TEST_REQUIRED`.
8. No device, firmware security feature, secure element or update framework is selected.

**Cross-references:** D27 (device security), `INTELLECTUAL-PROPERTY-CHAIN.md`,
`LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md`, `MAREA-PRODUCT-REUSE-MAP.md`, `MC-02-BLOCKERS-AND-DECISIONS.md`,
`HARDWARE-COMPLIANCE-MATRIX.md` §3.5–§3.6 and §4, `MC11-PROTOCOL-AND-COMPATIBILITY-ASSESSMENT.md` (D6),
`MC11-RESEARCH-SCOPE.md` §8, `MC11-BASELINE-AND-GOVERNANCE.md`
§4, `data/conformity-applicability.json` (`LEG-CRA-2024-2847` — cross-referenced, not edited).
