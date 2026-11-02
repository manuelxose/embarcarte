# MC-11 D19 — Engineering BOM (EBOM), preliminary

**Status block**

| Field | Value |
|---|---|
| Milestone | MC-11 — hardware sourcing, conformity and pre-industrialisation economics |
| Deliverable | D19 Engineering BOM (machine companion: `data/engineering-bom.json`) |
| Owner | `bom-cost-engineer` (BOM and manufacturing cost engineering) |
| Branch | `feature/marea-mc11-hardware-sourcing-conformity` |
| Base | MC-10R HEAD `67131782edaf8f3f8327ba79e5c5b4c554b137b0` (verified in D2 §1) |
| Date | 2026-11-02 |
| Status | `ENGINEERING_BOM_NOT_APPROVED` — candidate configurations only |
| Evidence states | Datasheets retrieved: **0** (all registered components are `LISTED_NOT_RETRIEVED` or `NOT_FOUND`). Public price observations: **42** (36 USD `VAT_UNKNOWN`, 6 EUR; only 5 `VAT_EXCLUDED`). Supplier quotations: **0**. MOQ / lead time / stock commitments: **0**. Tooling or NRE quotations: **not obtained**. Supplier contacts: **0**. Purchases: **0**. ECB reference rate: **not retrieved** (fetch failed). |
| Authorises | **No purchase, no price and no production.** No supplier contact, no RFQ transmission, no retail price, no margin or profitability claim, no certification, no publication. |

This document is an engineering artefact. It is not a manufacturing release, a purchase list, a quotation
comparison or a production-approved BOM, and no part of it may be sent to a supplier as an order.

---

## 1. Purpose and scope

D19 provides **one engineering BOM per hardware-bearing candidate** in MC-11:

| Family | Candidate configurations costed here |
|---|---|
| `HUB` | `HUB-STANDARD` and `HUB-PRO` (candidate interface envelope, `ARCH-HUB-D`) |
| `WATCH` | `WATCH-CORE` (`ARCH-WATCH-D`) |
| `SENSE` | `SENSE-POWER`, `SENSE-BILGE`, `SENSE-WIND`, `SENSE-ENV`, `SENSE-TANKS` (`ARCH-SENSE-C`) |
| `DISPLAY` | `DISPLAY-7` candidate (`ARCH-DISPLAY-D`) |
| `AIS` | `AIS-RECEIVER` receive-only integration path only (`ARCH-AIS-D`); **no transmitter** |
| `PILOT` | `PILOT-COASTAL` research envelope, explicitly **not authorised** and **not an actuator design** |

Deliberately **not** costed: `NAV`, `WEATHER` and `FLEET` (no proprietary physical hardware — software or
licensed-data only); `DISPLAY-LARGE-CONDITIONAL` (it must never be priced or described with a diagonal);
`AIS-CONNECTED` (`CONDITIONAL / NOT_YET_JUSTIFIED`); `WATCH-PLUS`; `FLEET` hardware of any kind
(`FLEET_DEFAULT_HARDWARE = false`); NMEA 2000 hardware for any edition (`NMEA2000_CERTIFIED = false`, the
interface is `BLOCKED` for both HUB editions).

## 2. Binding rules applied to every line

1. **Derivation chain.** Architecture block list (D4, D7, D8, D9) → capability statement → component
   register entry (`CMP-*`, allocated by the sourcing workstream) → price observation (`PO-*`, public
   catalogue only) → BOM line. Where the architecture names a capability and the register has no
   component, the line is an explicit **sourcing gap** with `componentId: null`, never a fictional part.
2. **A line inherits the weakest evidence class of its inputs** (DATA-CONTRACT §1.10). A line priced from
   a manufacturer list page is `PUBLIC_PRICE_OBSERVED`; a line with no price is `COST_UNVERIFIED`; an
   estimate is `ENGINEERING_ESTIMATE`. No line upgrades its class because the neighbouring line is better.
3. **Unknown is not zero.** A missing price is `observedUnitPrice: null`, `priceEvidenceClass: UNKNOWN`.
   It is never rendered as `0`, "free", "included" or "negligible".
4. **Quantity basis.** `volumeTier = 1` for every BOM. Tier 1 is the only quantity band that *all*
   observations share; higher tiers exist for only five components and are modelled in D21/D22, never
   extrapolated here.
5. **Currency.** Every priced line keeps the observation's own currency and amount unchanged
   (`priceObservationId`, `priceQuantityTier`, `observedUnitPrice` copied exactly). The validator's
   `totals.knownLinesEur` is the exact arithmetic sum of `qty × observedUnitPrice` as recorded, and is
   therefore **not** a EUR subtotal when the priced lines are USD. The EUR-normalised figure is
   `totals.convertedPartialSubtotalEur`, computed as
   `Σ(qty × observedUnitPrice × FX_USD_EUR)` with `FX_USD_EUR = 0.925925926` (**ASM-001**, an
   `ENGINEERING_ASSUMPTION`; the ECB rate could not be retrieved — see D21 §3).
6. **VAT never mixes.** Inputs are `VAT_UNKNOWN` (manufacturer list prices) or `VAT_EXCLUDED`
   (RS Components). No line is `VAT_INCLUDED`, so no normalisation was applied; conversely, a total with a
   `VAT_UNKNOWN` input can never be `COMPLETE_TO_EVIDENCE`. The top-level `vatTreatment: VAT_EXCLUDED`
   states the *target* basis only.
7. **No quotation is invented.** `FORMAL_SUPPLIER_QUOTATION` and `SUPPLIED_QUOTED` appear nowhere. No
   MOQ, lead time, stock guarantee, price hold or volume discount is claimed.
8. **No complete total.** Every BOM is `INCOMPLETE` with `totalEur: null`. Partial subtotals are labelled
   as partial and cover only the priced minority of lines.

### Column legend (all EBOM tables)

| Token | Meaning |
|---|---|
| `REQ` / `OPT` | Required for the candidate configuration / optional or edition-boundary candidate |
| `DS` | Datasheet status from the register: `LNR` listed-not-retrieved, `NF` not found, `RET` retrieved (none) |
| `Subst.` | Candidate substitute from the register's `alternateComponentIds`, first entry only |
| `Price evidence` | `MANUFACTURER_PUBLIC_LIST_PRICE` / `AUTHORIZED_DISTRIBUTOR_PUBLIC_PRICE` / `ENGINEERING_ASSUMPTION` / `UNKNOWN` |
| `Cur · VAT · date · tier` | Observation currency, VAT treatment, retrieval date and `priceQuantityTier` |
| `EUR*` | EUR-normalised value at ASM-001; `—` when the line is unpriced. Informational only: the machine totals carry both figures |
| `Stock · risk · lifecycle` | `availabilityClaim` (UNK = no stock statement) · component criticality · `lifecycleStatus` |
| `Conf.` | Engineering confidence for this line |
| `Verify` | Verification codes (legend in §7): `Q` quotation, `LS` lifecycle review, `DS` datasheet, `TI` tier/MOQ confirmation, `GP` sourcing gap (no registered component), `ED` edition interface must be frozen first, `MT` measurement/test required before any claim, `SG` safety gate: not authorised, `NC` observed service price not comparable, `CF` conformity dependency |

---

## 3. BOM inventory

{{EBOM_SUMMARY}}

**How to read this table.** "Priced" is the number of lines whose unit price exists as a public catalogue
observation; "unpriced" is everything else. The EUR partial is the sum of the priced lines only: for HUB at
4 of 18 lines it is 9.04 EUR, which is **not** the component cost of a HUB. The sum of all EUR partials
across the eleven BOMs (76.58 EUR) is an accounting total of partial evidence, not a cost of anything.

## 4. Engineering BOMs by family

### 4.1 HUB — `EBOM-HUB-STANDARD-01`

Candidate configuration `ARCH-HUB-D`: a class-B industrial SOM runs the services layer, a separate
supervisory MCU owns watchdog/reset/power-loss behaviour, an isolated NMEA 0183 receive path is
board-level, Ethernet is on the SOM (so no separate PHY line exists), and the enclosure, connectors and
protection are candidate mechanical/electrical items. `HUB-STANDARD` and `HUB-PRO` are the only editions;
the edition boundary is a validated interface envelope and diagnostics depth, not a software switch.

{{EBOM_TABLE_EBOM-HUB-STANDARD-01}}

**Arithmetic.** Priced: SN65HVD78D 3.529 + ISO7721DR 1.689 + LMR33630ADDA 2.594 + LM74700QDBVRQ1 1.951 =
**9.763 USD**; × 0.925925926 = **9.04 EUR**; 4 of 18 lines priced, 14 unpriced.
**Unpriced and why:** the class-B SOM, supervisory MCU, Wi-Fi/BLE radio (OPT), secure element, EEPROM,
enclosure, protection set, RTC backup, passives, LEDs, USB protection (OPT), GNSS option (OPT) and the
connector set have **no public price** (Toradex, ST, Microchip, Espressif, Fibox and Amphenol pages
publish evaluation-kit prices or no price at all — D13 §3). The sum of the unpriced lines is **unknown**,
and it is certainly larger than the priced 9.04 EUR.
**Explicit exclusion:** no NMEA 2000 line exists. `NMEA2000_CERTIFIED = false` and the interface is
`BLOCKED` for both editions; the register's CAN block is not used.

### 4.2 HUB — `EBOM-HUB-PRO-01`

`HUB-PRO` reuses the `HUB-STANDARD` core and adds four **OPTIONAL** candidate-envelope lines: a second
isolated NMEA 0183 channel (transceiver + isolator), a second Ethernet port and a factory-test access
path. The canonical edition table assigns no second 0183 channel and marks the segmentation port
`EDITION_INTERFACE_UNSPECIFIED` for both editions, so these lines are a **cost scenario, not an edition
feature**. They must never be published as a `HUB-PRO` specification.

{{EBOM_TABLE_EBOM-HUB-PRO-01}}

**Arithmetic.** Priced: 9.763 + 3.529 + 1.689 = **14.981 USD**; × 0.925925926 = **13.87 EUR**; 6 of 22
lines priced. The PRO delta over STANDARD is **4.83 EUR** of *priced* lines only; the true PRO delta is
unknown because the second Ethernet port has no priced part. The delta is presented to show that interface
envelope — not silicon — is the only cost difference MC-11 can even partially observe.

### 4.3 WATCH — `EBOM-WATCH-CORE-01`

Candidate configuration `ARCH-WATCH-D`: a low-power supervisory MCU is always on (watchdog, declared-input
acquisition, rule evaluation, local buffering) and a connectivity processor wakes only to uplink. WATCH is
**standalone by canonical definition** — it must not require HUB. Average consumption is `UNKNOWN` and must
be measured before any sale; a full Linux SBC with an attached modem cannot credibly meet the deep-sleep
requirement, which is why `ARCH-WATCH-C` (MCU-only) remains the lower-BOM alternative.

{{EBOM_TABLE_EBOM-WATCH-CORE-01}}

**Arithmetic.** Priced: LMR33630ADDA 2.594 + LM74700QDBVRQ1 1.951 + INA228AIDGSR 3.893 = **8.438 USD**;
× 0.925925926 = **7.81 EUR**; 3 of 18 lines priced. The cellular modem, both processors, the secure
element, the antenna, the enclosure, the buffering flash and the optional backup energy source are
unpriced. **Explicit:** no guaranteed alert delivery, no coverage claim, no IP rating and no power figure
exists for this configuration.

### 4.4 SENSE — five module EBOMs

Candidate configuration `ARCH-SENSE-C`: a custom MCU module per measurement type on a shared platform.
Every module shares the power conversion, identity/calibration EEPROM, enclosure, front-end protection,
passive bill, glands and local-interface lines; the measurement-specific lines differ. A module with no
compatible consumer produces no user-facing data, so the HUB coupling is a functional dependency, not an
accessory.

**`SENSE-POWER`** — the most safety-adjacent installation (battery bank, alternator; professional install
only). Adds the INA228 power monitor, an isolation barrier and a shunt/Hall element whose topology is
undecided.

{{EBOM_TABLE_EBOM-SENSE-POWER-01}}

Arithmetic: 2.594 + 1.951 + 3.893 + 1.689 = **10.127 USD** → **9.38 EUR**; 4 of 12 lines priced.

**`SENSE-BILGE`** — isolated digital input with wetting current and open/short detection. It is **not** a
certified bilge alarm and not the vessel's required bilge-alarm arrangement.

{{EBOM_TABLE_EBOM-SENSE-BILGE-01}}

Arithmetic: 2.594 + 1.951 + 1.689 = **6.234 USD** → **5.77 EUR**; 3 of 12 lines priced.

**`SENSE-WIND`** — either an original masthead sensor or an NMEA 0183 `MWV/MWD` adapter for a third-party
instrument; masthead sensor and cable are excluded from the SKU.

{{EBOM_TABLE_EBOM-SENSE-WIND-01}}

Arithmetic: 2.594 + 1.951 + 3.529 + 1.689 = **9.763 USD** → **9.04 EUR**; 4 of 12 lines priced.

**`SENSE-ENV`** — temperature and humidity are registered (`SHT40`), but the canonical edition also
requires barometric pressure and **no pressure sensor is registered**: a recorded sourcing gap, not an
estimate.

{{EBOM_TABLE_EBOM-SENSE-ENV-01}}

Arithmetic: 2.594 + 1.951 = **4.545 USD** → **4.21 EUR**; 2 of 12 lines priced.

**`SENSE-TANKS`** — no sender compatibility list exists and irregular tank shapes are unsolved, so the
front end cannot be selected in MC-11.

{{EBOM_TABLE_EBOM-SENSE-TANKS-01}}

Arithmetic: 2.594 + 1.951 = **4.545 USD** → **4.21 EUR**; 2 of 11 lines priced.

### 4.5 DISPLAY — `EBOM-DISPLAY-7-01`

Candidate configuration `ARCH-DISPLAY-D`: an industrial display module plus a MAREA carrier and SOM.
`DISPLAY_SIZE = SIZE_NOT_FROZEN`; the registered panel is 7-inch-class, which is a property of that
candidate part and **not** a MAREA size claim. `DISPLAY-LARGE-CONDITIONAL` is deliberately not costed and
must never be priced or described with a diagonal. No sunlight, brightness, contrast, touch, thermal or
ingress claim exists; each requires a measurement that has not been executed.

{{EBOM_TABLE_EBOM-DISPLAY-7-01}}

**Arithmetic.** 2.594 + 1.951 = **4.545 USD** → **4.21 EUR**; 2 of 13 lines priced. The panel itself, the
compute, the enclosure/bezel, the backlight driver, the mount family and the connectors are unpriced: a
display BOM where the display has no price is not a display cost.

### 4.6 AIS — `EBOM-AIS-RECEIVER-01` (receive-only integration path)

Programme posture: `AIS_RECEIVE_ONLY_MVP = DEFERRED_TO_INTEGRATION`. The recommended route is software-first
integration (`ARCH-AIS-E`, highest AIS score) with a documented read-only contract for third-party certified
receivers; this BOM bounds the alternative `ARCH-AIS-D` path (certified receiver module behind a MAREA
supervisory MCU and interface board) **only** so the envelope is visible. There is **no transmitter, no
transponder and no transmit chain of any kind** in this BOM, and none may be added
(`AIS_TRANSMISSION_OFFERED = false`).

{{EBOM_TABLE_EBOM-AIS-RECEIVER-01}}

**Arithmetic.** 2.594 + 1.951 + 3.529 + 1.689 = **9.763 USD** → **9.04 EUR**; 4 of 13 lines priced.
**The largest line is unpriced:** the third-party certified receiver module has no registered component and
no price. A receive-only AIS product whose receiver cost is unknown cannot be costed in MC-11, which is
exactly what the architecture recommendation says.
**Excluded from the SKU:** VHF antenna, VHF splitter (only with verified insertion loss), mast coax and
connectors, external GNSS/own-position source, and the prohibited transmit path.

### 4.7 PILOT — `EBOM-PILOT-COASTAL-01` (research envelope only)

**`PILOT_SAFETY_GATE = BLOCKED`.** This is not a design, not a specification and not an authorisation. No
actuator, motor-control output, steering command, control-head behaviour or control API is designed,
specified or implemented. Every line is unpriced and textually marked `NOT DESIGNED` / `NOT SELECTED` /
`NOT QUOTED`; the BOM exists only so that the cost-envelope categories are machine-visible and the blocked
state cannot be quietly converted into a plan.

{{EBOM_TABLE_EBOM-PILOT-COASTAL-01}}

**Arithmetic.** 0 of 12 lines priced; `knownLinesEur = 0.00` here means *no line is priced*, not that PILOT
costs nothing. The drive/actuator is the single largest unknown in any PILOT feasibility (no datasheet, no
survey, no torque/current/travel figure). The recommended disposition is
`DEFER_SAFETY_CRITICAL_DEVELOPMENT`.

---

## 5. The arithmetic, stated so it can be reproduced

For every BOM and every line `i`:

```
priced_i        = (observedUnitPrice_i is a number)
knownLinesEur   = round( Σ_i priced_i × qtyPerUnit_i × observedUnitPrice_i , 2 )      # exact, as recorded
convertedEUR    = round( Σ_i priced_i × qtyPerUnit_i × observedUnitPrice_i × FX_i , 2 ) # FX = 1 for EUR lines
unknownLines    = count( lines ) − count( priced )
totalStatus     = "INCOMPLETE"      # always: unpriced lines exist and VAT is unresolved
totalEur        = null              # a numeric complete total would be fabricated
```

Worked example — `EBOM-HUB-STANDARD-01`:

```
3.529 + 1.689 + 2.594 + 1.951                    = 9.763 USD       (native, tier 1, VAT_UNKNOWN)
9.763 × 0.925925926                              = 9.0395 → 9.04 EUR
unknownLineCount = 18 − 4                        = 14
totalStatus      = INCOMPLETE ; totalEur = null
```

Currency discipline: each BOM's priced lines are **single-currency** (the generator refuses to mix); the
USD→EUR conversion exists only in the `convertedPartialSubtotalEur` field and in this document, and is
labelled `ENGINEERING_ASSUMPTION` everywhere. No FX rate was observed in this session.

## 6. The inheritance rule, applied honestly

| Line class | Weakest input | Evidence class carried | What that means for the reader |
|---|---|---|---|
| Priced from a manufacturer page | One public list page, VAT unstated, no commitment to supply | `MANUFACTURER_PUBLIC_LIST_PRICE`, `PUBLIC_PRICE_OBSERVED` | A **catalogue observation**, not a price for a MAREA order |
| Priced from an authorised distributor | Single-unit retail listing, EUR, VAT excluded | `AUTHORIZED_DISTRIBUTOR_PUBLIC_PRICE` | Not wholesale; used only where a registered part matches |
| Registered component, no price | Register entry only; datasheet not retrieved | `UNKNOWN`, `COST_UNVERIFIED` | The part may not even be orderable; lifecycle is a risk |
| Capability with no registered component | Architecture statement only | `UNKNOWN`, `COST_UNVERIFIED` | Sourcing gap: a part must be found and selected |
| Labour/service estimate | Engineering time allowance at an assumed rate | `ENGINEERING_ASSUMPTION`, `ENGINEERING_ESTIMATE` | An assumption, never a quotation |
| Anything derived from the above | The weakest input | no upgrade | No total inherits a stronger class than its worst line |

Three consequences the Lead and the auditor should not lose:

1. **The observed evidence is a sliver.** At volume 100 the priced lines are 1.8% (HUB), 2.0% (WATCH),
   4.7% (SENSE), 0.8% (DISPLAY) and 2.1% (AIS) of the modelled known subtotal (D21 §6). Everything else is
   an assumption or unknown.
2. **The priced parts are not the expensive parts.** Passive protection, connectors, SOMs, modems, panels,
   receivers, enclosures and tooling — the actual cost drivers — have no public price.
3. **Datasheet absence blocks selection, not just pricing.** With zero datasheets retrieved, no line can be
   frozen on electrical grounds; the BOM records candidates, not selections.

## 7. Verification obligations

Codes used in the `Verify` column: `Q` obtain a supplier quotation; `DS` retrieve the datasheet (all parts
currently unmet); `LS` lifecycle review (registered parts include `NRND` secure element, `EOL` MAX-M10
family, and `UNKNOWN` lifecycle parts); `TI` confirm quantity tier / MOQ at the planned volume; `GP`
sourcing gap — register a component and select it; `ED` freeze the edition interface envelope; `MT`
measurement or test required before any claim (consumption, thermal, ingress, sunlight, accuracy, RF); `SG`
safety gate — not authorised; `NC` an observed service price exists but is not comparable; `CF` conformity
dependency.

Per-configuration obligations that must be closed **before** any line becomes purchasable:

| # | Obligation | Affects | Gate |
|---|---|---|---|
| V1 | Retrieve datasheets for every registered component and select against them | all families | G1 |
| V2 | Obtain quotations at the planned quantity tier, with MOQ and lead time | all families | G2/G3 |
| V3 | Re-select or accept-risk the `NRND`/`EOL` parts (ATECC608B, MAX-M10, AT24CS32) | HUB, WATCH, DISPLAY, AIS | G1 |
| V4 | Freeze the HUB edition interface envelope (0183 channels, Ethernet ports, radio) | HUB-STANDARD/PRO | G1 |
| V5 | Select the cellular modem, SIM/eSIM strategy and antenna placement; obtain operator acceptance path | WATCH | G2 |
| V6 | Register and select the barometric pressure sensor and the AIS receiver module | SENSE-ENV, AIS | G1 |
| V7 | Define and measure sunlight/night/touch/thermal performance before any DISPLAY claim | DISPLAY | G4 |
| V8 | Define the calibration reference chain and procedure for every SENSE module | SENSE | G4 |
| V9 | Quantify the actual enclosure/tooling requirement with a mechanical designer | HUB, DISPLAY, WATCH | G3 |
| V10 | Keep PILOT at the safety gate; no BOM line may be procured, ordered or piloted | PILOT | G1–G7 |
| V11 | Confirm no NMEA 2000 interface, marking or claim is introduced by any line | HUB | G6 |
| V12 | Confirm `FLEET` includes no default hardware in any BOM derived from this file | — | G1 |

## 8. What this EBOM does not establish

- **No complete unit cost.** No BOM has `totalEur`; every one is `INCOMPLETE`. The partial subtotals cover a
  minority of lines and exclude the cost drivers.
- **No price.** Nothing here is an offer, a MAREA price, a retail price, a wholesale price or a negotiation
  position. `PRICE_APPROVED = NONE`.
- **No production readiness.** No design is frozen (`G1 = CANDIDATE_ONLY`), no supplier is engaged
  (`G2 = NOT_AUTHORIZED`), no prototype is procured (`G3 = NOT_AUTHORIZED`).
- **No conformance.** No datasheet, test, certification, IP rating, EMC result or NMEA conformance exists or
  is implied by a component choice.
- **No AIS transmission, no NMEA 2000, no actuator.** Each is excluded at the data level, not just in prose.
- **No customer requirement.** No hardware feature is customer-prioritised: `CUSTOMER_EVIDENCE = NONE`.

## 9. Unpriced exposure by configuration

{{UNPRICED_BY_FAMILY}}

**Handoff to MC-12.** MC-12 must not treat these BOMs as a cost baseline. It may treat them as (a) a
traceable list of candidate parts and their evidence state, (b) the recorded sourcing gaps, and (c) the
verification obligations in §7. Any ordering, quoting or procurement decision requires a separate
authorisation under gates G2/G3, and any published price requires the MC-10/MC-11 commercial gates that are
currently closed.
