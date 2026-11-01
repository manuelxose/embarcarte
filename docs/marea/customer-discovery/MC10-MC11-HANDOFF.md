# MC-10 → MC-11 handoff

| Field | Value |
| --- | --- |
| Document ID | MC-10 / D27 / MC10-MC11-HANDOFF |
| From | MC-10 — primary customer discovery (`BLOCKED`) |
| To | MC-11 — hardware, supplier, conformity and feasibility (not started; separate prompt required) |
| Customer evidence transferred | **NONE** |
| Date | 2026-11-01 |

## 0. The one thing MC-11 must know

MC-10 executed **zero** customer interviews. It therefore transfers **no** validated customer
finding, no prioritisation, no price signal and no channel confirmation. MC-11 must not plan as if
customer discovery had occurred, and must not cite MC-10 as demand evidence.

The correct input from MC-10 is a set of **customer questions that remain unasked** plus a set of
**hardware, supplier and conformity questions that do not depend on customers** and can proceed only
if MC-11 is separately authorized.

## 1. What MC-10 did establish (internal, non-customer)

| Item | Evidence |
| --- | --- |
| Authorization gate and exact unblock conditions | `MC10-FIELDWORK-AUTHORIZATION.md` |
| Frozen instruments, thresholds and price ladders | `methodology/`, `data/experiments.json`, `data/pricing-ladders.json` |
| Data-protection design and the missing controller | `methodology/MC10-RESEARCH-ETHICS-AND-PRIVACY.md` |
| Validator + negative tests that prevent fabricated evidence | `scripts/check-marea-customer-research.mjs` (+ tests) |
| Honest product/bundle `NOT_TESTED` classification | `MC10-PRODUCT-PRIMARY-EVIDENCE.md`, `MC10-BUNDLE-PRIMARY-EVIDENCE.md` |
| No commercial restriction weakened | `data/governance-status.json` |

That is all. None of it reduces market uncertainty.

## 2. Customer questions MC-11 would have needed (all unanswered)

| ID | Question | Experiments that would answer it | MC-10 status |
| --- | --- | --- | --- |
| CQ-01 | Is the boat-data problem costly enough to justify new hardware? | EXP-MC10-01 | BLOCKED |
| CQ-02 | Will owners install additional hardware at all, and under what conditions? | EXP-MC10-01, 09 | BLOCKED |
| CQ-03 | Which sensors/measurements are valued (battery, bilge, geofence, temperature, motion)? | EXP-MC10-09 | BLOCKED |
| CQ-04 | What hardware price band is tolerable? | EXP-MC10-04, 05 | BLOCKED |
| CQ-05 | What subscription (if any) survives cancellation expectations? | EXP-MC10-03 | BLOCKED |
| CQ-06 | Which compatibility evidence do installers demand? | EXP-MC10-02 | BLOCKED |
| CQ-07 | What warranty/RMA/liability position is acceptable? | EXP-MC10-02, 10 | BLOCKED |
| CQ-08 | Would retailers stock it, on what terms? | EXP-MC10-08 | BLOCKED |
| CQ-09 | Do fleet operators need the monitoring/fleet hardware at all? | EXP-MC10-07, 09 | BLOCKED |
| CQ-10 | Which exclusions must be communicated to avoid a critical misconception? | EXP-MC10-06 | BLOCKED |

**Consequence for MC-11:** hardware requirements cannot be customer-prioritised. Any MC-11 hardware
decision made now would rest on internal judgement and MC-09 desk research alone, and must say so.

## 3. Hardware questions that are genuinely unresolved

These are open regardless of customer evidence and must be recorded as open in MC-11:

| ID | Question | Current state |
| --- | --- | --- |
| HW-01 | HUB gateway: MCU/SoC, ports (NMEA 2000, NMEA 0183, Ethernet, Wi-Fi, BLE), power budget | `hardware: NOT_SELECTED` |
| HW-02 | Connectivity: 4G/LTE module, eSIM/SIM strategy, antenna, roaming and data-cost model | Not selected; no provider agreement |
| HW-03 | WATCH monitoring device: enclosure, IP rating, power source, sensor set, installation method | Not selected |
| HW-04 | SENSE sensor modules: which measurements, accuracy plan, calibration burden, bus | `NOT_SELECTED`; accuracy claim false |
| HW-05 | DISPLAY: size, brightness, sunlight readability, touch/keys, mounting, waterproofing | `SIZE_NOT_FROZEN` |
| HW-06 | AIS: receive-only vs transponder, module choice, certification path | `NOT_SELECTED`; transmission not offered |
| HW-07 | PILOT: control authority, redundancy, fail-safe, human-factors case | `PILOT_SAFETY_GATE = BLOCKED` |
| HW-08 | Environmental qualification: marine corrosion, vibration, EMC, temperature | Not started |
| HW-09 | Firmware update and device-security architecture (secure boot, signed updates) | Design only |
| HW-10 | Serviceability, spares, RMA logistics and expected field life | Not established |

## 4. Supplier and sourcing questions

| ID | Question | Constraints |
| --- | --- | --- |
| SUP-01 | Candidate ODM/OEM for HUB/WATCH hardware | No supplier contact or quotation authorized in MC-10 |
| SUP-02 | Real BOM cost at plausible volumes | `approvedProductionBom = 0`; no quotes exist |
| SUP-03 | Minimum order quantities, tooling and lead times | Unknown; no purchase authority |
| SUP-04 | Supplier quality system and traceability | Unknown |
| SUP-05 | Second-source and component-obsolescence plan | Unknown |
| SUP-06 | IP/licence position for `open-marine`-derived engineering | `SOURCE_IP_CLEARANCE = NOT_CLEARED` (read-only reference) |
| SUP-07 | Cloud hosting, data residency and processing agreements | No processor agreements; no controller |
| SUP-08 | Chart/forecast data-provider rights and costs | `chartRightsGranted = false`, `dataProviderRightsGranted = false` |

## 5. Conformity and legal questions

| ID | Question | State |
| --- | --- | --- |
| CON-01 | CE marking route and applicable directives (RED, EMC, LVD, RoHS) | `NOT_STARTED` |
| CON-02 | Radio equipment conformity and spectrum/antenna requirements | `NOT_STARTED` |
| CON-03 | NMEA 2000 certification route and cost | `nmea2000Certified = false` |
| CON-04 | Marine equipment directive applicability (if any) | Unassessed |
| CON-05 | Product liability and insurance position | Not established |
| CON-06 | Consumer warranty and statutory rights (ES/PT) | Not established |
| CON-07 | WEEE, battery and packaging obligations | Unassessed |
| CON-08 | Data protection roles for a connected device (controller/processor) | Controller not designated |
| CON-09 | Safety-case requirements if any control function is added | PILOT blocked; no control feature authorized |
| CON-10 | Trademark clearance for the MAREA brand | `NOT_GRANTED` |

## 6. What MC-11 may and may not do

**May (if separately authorized):** internal engineering feasibility, component research, supplier
landscape mapping, conformity route analysis, BOM modelling with clearly labelled assumptions, and
planning of a future customer validation wave.

**May not:** contact suppliers or place orders without authorization; claim compatibility, certification,
accuracy, safety or performance; approve a price; include customer evidence it does not have; treat the
MC-09 rankings as customer priorities; or reuse MC-10 preparation documents as if they were findings.

## 7. Recommended MC-11 opening position

1. Treat MC-10 as `BLOCKED` and carry the dependency explicitly.
2. Start with internal, non-customer work: conformity route analysis and a component/supplier landscape
   without contact.
3. Do **not** freeze a hardware specification before at least the W1/W3 customer waves run; the
   requirement set is unknown.
4. Record the legal, IP, controller and conformity blockers as blocking, not as tasks to be "worked around".
5. Re-plan the customer-discovery dependency: either authorize MC-10 fieldwork first or explicitly
   accept a hardware-first risk with the cost and conformity exposure documented.

## 8. Handoff status

```
CUSTOMER_EVIDENCE_TRANSFERRED = NONE
MC_11_STARTED                 = NO
HARDWARE_SELECTED             = NO
BOM_APPROVED                  = NO
SUPPLIER_CONTACTED            = NO
CONFORMITY_STARTED            = NO
PRICE_APPROVED                = NO
```
