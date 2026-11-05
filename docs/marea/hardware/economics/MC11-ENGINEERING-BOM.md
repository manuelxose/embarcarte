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
3. **Unknown is not zero.** A missing price is `observedUnitPrice: null` **and** `unitPriceEur: null`, with
   `priceEvidenceClass: UNKNOWN`. It is never rendered as `0`, "free", "included" or "negligible".
4. **Quantity basis.** `volumeTier = 1` for every BOM. Tier 1 is the only quantity band that *all*
   observations share; higher tiers exist for only five components and are modelled in D21/D22, never
   extrapolated here.
5. **Currency (explicit per-line conversion, no implicit mixing).** Every priced line keeps the
   observation's own currency and amount unchanged (`priceObservationId`, `priceQuantityTier`,
   `observedUnitPrice` copied exactly) **and** carries an explicit EUR value: `unitPriceEur`. For a EUR
   observation `unitPriceEur = observedUnitPrice` and `fxRateId = null`; for a USD observation
   `unitPriceEur = observedUnitPrice × 0.925925926` (rounded to 6 decimals) and
   `fxRateId = "FX-USD-EUR-01"` (**ASM-001**, an `ENGINEERING_ASSUMPTION` — the ECB reference rate could
   not be retrieved, see D21 §3). An unpriced line has `unitPriceEur = null`. The totals
   `knownLinesEur` and `partialSubtotalEur` are computed **only** from `unitPriceEur`
   (`Σ qtyPerUnit × unitPriceEur`), so no USD figure is ever summed as if it were EUR; the native-currency
   sum is retained separately as `nativePartialSubtotal` for transparency and is not used in any total.
6. **VAT never mixes.** Inputs are `VAT_UNKNOWN` (manufacturer list prices) or `VAT_EXCLUDED`
   (RS Components). No line is `VAT_INCLUDED`, so no normalisation was applied; conversely, a total with a
   `VAT_UNKNOWN` input can never be `COMPLETE_TO_EVIDENCE`. The top-level `vatTreatment: VAT_EXCLUDED`
   states the *target* basis only.
7. **No quotation is invented.** `FORMAL_SUPPLIER_QUOTATION` and `SUPPLIER_QUOTED` appear nowhere. No
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
| `EUR*` | The line's `unitPriceEur`: the explicit EUR conversion the totals use (EUR lines = observed price; USD lines = observed price × 0.925925926 with `fxRateId` set); `—` when unpriced |
| `Stock · risk · lifecycle` | `availabilityClaim` (UNK = no stock statement) · component criticality · `lifecycleStatus` |
| `Conf.` | Engineering confidence for this line |
| `Verify` | Verification codes (legend in §7): `Q` quotation, `LS` lifecycle review, `DS` datasheet, `TI` tier/MOQ confirmation, `GP` sourcing gap (no registered component), `ED` edition interface must be frozen first, `MT` measurement/test required before any claim, `SG` safety gate: not authorised, `NC` observed service price not comparable, `CF` conformity dependency |

---

## 3. BOM inventory

| BOM | Family / edition | Architecture version | Lines | Priced | Unpriced | Native partial | EUR partial | Status |
|---|---|---|---:|---:|---:|---:|---:|---|
| EBOM-HUB-STANDARD-01 | HUB / HUB-STANDARD | ARCH-HUB-D (hybrid MCU + application processor) | 18 | 4 | 14 | 9.76 USD | 9.04 | INCOMPLETE |
| EBOM-HUB-PRO-01 | HUB / HUB-PRO | ARCH-HUB-D (hybrid MCU + application processor) | 22 | 6 | 16 | 14.98 USD | 13.87 | INCOMPLETE |
| EBOM-WATCH-CORE-01 | WATCH / WATCH-CORE | ARCH-WATCH-D (hybrid low-power MCU + connectivity processor) | 18 | 3 | 15 | 8.44 USD | 7.81 | INCOMPLETE |
| EBOM-SENSE-POWER-01 | SENSE / SENSE-POWER | ARCH-SENSE-C (custom MCU module per measurement type on a shared platform) | 12 | 4 | 8 | 10.13 USD | 9.38 | INCOMPLETE |
| EBOM-SENSE-BILGE-01 | SENSE / SENSE-BILGE | ARCH-SENSE-C | 12 | 3 | 9 | 6.23 USD | 5.77 | INCOMPLETE |
| EBOM-SENSE-WIND-01 | SENSE / SENSE-WIND | ARCH-SENSE-C | 12 | 4 | 8 | 9.76 USD | 9.04 | INCOMPLETE |
| EBOM-SENSE-ENV-01 | SENSE / SENSE-ENV | ARCH-SENSE-C | 12 | 2 | 10 | 4.55 USD | 4.21 | INCOMPLETE |
| EBOM-SENSE-TANKS-01 | SENSE / SENSE-TANKS | ARCH-SENSE-C | 11 | 2 | 9 | 4.55 USD | 4.21 | INCOMPLETE |
| EBOM-DISPLAY-7-01 | DISPLAY / DISPLAY-7 | ARCH-DISPLAY-D (industrial panel + MAREA carrier + SOM) | 13 | 2 | 11 | 4.55 USD | 4.21 | INCOMPLETE |
| EBOM-AIS-RECEIVER-01 | AIS / AIS-RECEIVER | ARCH-AIS-D (third-party certified receiver module + MAREA supervisory MCU and interface board) | 13 | 4 | 9 | 9.76 USD | 9.04 | INCOMPLETE |
| EBOM-PILOT-COASTAL-01 | PILOT / PILOT-COASTAL | ARCH-PILOT-E (supervisory software/service only, no MAREA actuator) | 12 | 0 | 12 | 0.00 (no priced line) | 0.00 | INCOMPLETE |
| **Total (11 BOMs)** | | | **155** | **34** | **121** | | **76.58** (sum of partials, not a cost) | |

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

| Line | Block | Component · MPN · manufacturer | Qty | Req | Subst. | DS | Supplier | Price evidence | Unit price | Cur · VAT · date · tier | EUR* | Stock · risk · lifecycle | Conf. | Verify |
|---|---|---|---:|---|---|---|---|---|---:|---|---:|---|---|---|
| EBOM-HUB-STANDARD-01-L001 | PROC | Verdin iMX8M Plus Quad 4GB IT (PN 0063) · 0063 · Toradex | 1 | REQ | CMP-PROC-03 (VAR-SOM-MX8MP) | LNR | toradex-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · ACTIVE | COST_UNVERIFIED | Q DS |
| EBOM-HUB-STANDARD-01-L002 | MCU | STM32H743VI high-performance MCU · STM32H743VIT6 · STMicroelectronics | 1 | REQ | CMP-MCU-02 (STM32H757XIH6) | LNR | stmicroelectronics-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · ACTIVE | COST_UNVERIFIED | Q DS |
| EBOM-HUB-STANDARD-01-L003 | N183 | SN65HVD78D 3.3 V RS-485/RS-422 transceiver · SN65HVD78D · Texas Instruments | 1 | REQ | CMP-N183-03 (MAX3490ESA+) | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 3.529 USD | 2026-11-02 · tier 1 | 3.27 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-HUB-STANDARD-01-L004 | N183 | ISO7721DR reinforced 2-channel digital isolator · ISO7721DR · Texas Instruments | 1 | REQ | CMP-N183-03 | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 1.689 USD | 2026-11-02 · tier 1 | 1.56 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-HUB-STANDARD-01-L005 | PWR | LMR33630ADDA 3 A synchronous buck converter · LMR33630ADDA · Texas Instruments | 1 | REQ | CMP-PWR-03 (R-78E5.0-1.0 switching regulator module) | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 2.594 USD | 2026-11-02 · tier 1 | 2.40 | UNK · CRITICAL · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-HUB-STANDARD-01-L006 | PWR | LM74700QDBVRQ1 ideal-diode controller · LM74700QDBVRQ1 · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 1.951 USD | 2026-11-02 · tier 1 | 1.81 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-HUB-STANDARD-01-L007 | ETH | Ethernet magnetics, RJ45 with retention and ESD array | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-HUB-STANDARD-01-L008 | WIFI | ESP32-C6-MINI-1 Wi-Fi 6 / BLE module · ESP32-C6-MINI-1-N4 · Espressif | 1 | OPT | — | NF | espressif-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | Q LS DS |
| EBOM-HUB-STANDARD-01-L009 | SEC | ATECC608B secure element · ATECC608B · Microchip | 1 | REQ | CMP-SEC-02 (ATECC608B Trust&GO) | LNR | microchip-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · NRND | COST_UNVERIFIED | Q LS DS |
| EBOM-HUB-STANDARD-01-L010 | MEM | AT24CS32 32 Kbit I2C EEPROM with factory serial number · AT24CS32 · Microchip | 1 | REQ | — | LNR | microchip-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · NRND | COST_UNVERIFIED | Q LS DS |
| EBOM-HUB-STANDARD-01-L011 | MECH | CAB PC/ABS enclosure range (PC 3030 referenced) · CAB PC 3030 · Fibox | 1 | REQ | — | NF | fibox-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | Q LS DS |
| EBOM-HUB-STANDARD-01-L012 | PWR | Protection set: TVS arrays, fuse/PTC, common-mode choke and bulk capacitors | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-HUB-STANDARD-01-L013 | MCU | RTC backup: coin cell or supercapacitor and holder | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-HUB-STANDARD-01-L014 | PROC | USB current-limited switch and ESD protection | 1 | OPT | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-HUB-STANDARD-01-L015 | PCB | Passive components and magnetic parts (per board) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-HUB-STANDARD-01-L016 | MECH | Status indication LEDs (power, network, source health, fault) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-HUB-STANDARD-01-L017 | GNSS | MAX-M10S-00B GNSS module · MAX-M10S-00B · u-blox | 1 | OPT | ZED-F9P family (CMP-GNSS-04/05/06) — a different RTK module class, not a substitute | LNR | ublox-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · EOL | COST_UNVERIFIED | Q LS DS |
| EBOM-HUB-STANDARD-01-L018 | MECH | Connector set: keyed locking DC input, 0183 terminal block, USB retention, antenna provision | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |

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

| Line | Block | Component · MPN · manufacturer | Qty | Req | Subst. | DS | Supplier | Price evidence | Unit price | Cur · VAT · date · tier | EUR* | Stock · risk · lifecycle | Conf. | Verify |
|---|---|---|---:|---|---|---|---|---|---:|---|---:|---|---|---|
| EBOM-HUB-PRO-01-L001 | PROC | Verdin iMX8M Plus Quad 4GB IT (PN 0063) · 0063 · Toradex | 1 | REQ | CMP-PROC-03 (VAR-SOM-MX8MP) | LNR | toradex-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · ACTIVE | COST_UNVERIFIED | Q DS |
| EBOM-HUB-PRO-01-L002 | MCU | STM32H743VI high-performance MCU · STM32H743VIT6 · STMicroelectronics | 1 | REQ | CMP-MCU-02 (STM32H757XIH6) | LNR | stmicroelectronics-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · ACTIVE | COST_UNVERIFIED | Q DS |
| EBOM-HUB-PRO-01-L003 | N183 | SN65HVD78D 3.3 V RS-485/RS-422 transceiver · SN65HVD78D · Texas Instruments | 1 | REQ | CMP-N183-03 (MAX3490ESA+) | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 3.529 USD | 2026-11-02 · tier 1 | 3.27 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-HUB-PRO-01-L004 | N183 | ISO7721DR reinforced 2-channel digital isolator · ISO7721DR · Texas Instruments | 1 | REQ | CMP-N183-03 | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 1.689 USD | 2026-11-02 · tier 1 | 1.56 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-HUB-PRO-01-L005 | PWR | LMR33630ADDA 3 A synchronous buck converter · LMR33630ADDA · Texas Instruments | 1 | REQ | CMP-PWR-03 (R-78E5.0-1.0 switching regulator module) | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 2.594 USD | 2026-11-02 · tier 1 | 2.40 | UNK · CRITICAL · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-HUB-PRO-01-L006 | PWR | LM74700QDBVRQ1 ideal-diode controller · LM74700QDBVRQ1 · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 1.951 USD | 2026-11-02 · tier 1 | 1.81 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-HUB-PRO-01-L007 | ETH | Ethernet magnetics, RJ45 with retention and ESD array | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-HUB-PRO-01-L008 | WIFI | ESP32-C6-MINI-1 Wi-Fi 6 / BLE module · ESP32-C6-MINI-1-N4 · Espressif | 1 | OPT | — | NF | espressif-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | Q LS DS |
| EBOM-HUB-PRO-01-L009 | SEC | ATECC608B secure element · ATECC608B · Microchip | 1 | REQ | CMP-SEC-02 (ATECC608B Trust&GO) | LNR | microchip-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · NRND | COST_UNVERIFIED | Q LS DS |
| EBOM-HUB-PRO-01-L010 | MEM | AT24CS32 32 Kbit I2C EEPROM with factory serial number · AT24CS32 · Microchip | 1 | REQ | — | LNR | microchip-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · NRND | COST_UNVERIFIED | Q LS DS |
| EBOM-HUB-PRO-01-L011 | MECH | CAB PC/ABS enclosure range (PC 3030 referenced) · CAB PC 3030 · Fibox | 1 | REQ | — | NF | fibox-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | Q LS DS |
| EBOM-HUB-PRO-01-L012 | PWR | Protection set: TVS arrays, fuse/PTC, common-mode choke and bulk capacitors | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-HUB-PRO-01-L013 | MCU | RTC backup: coin cell or supercapacitor and holder | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-HUB-PRO-01-L014 | PROC | USB current-limited switch and ESD protection | 1 | OPT | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-HUB-PRO-01-L015 | PCB | Passive components and magnetic parts (per board) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-HUB-PRO-01-L016 | MECH | Status indication LEDs (power, network, source health, fault) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-HUB-PRO-01-L017 | GNSS | MAX-M10S-00B GNSS module · MAX-M10S-00B · u-blox | 1 | OPT | ZED-F9P family (CMP-GNSS-04/05/06) — a different RTK module class, not a substitute | LNR | ublox-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · EOL | COST_UNVERIFIED | Q LS DS |
| EBOM-HUB-PRO-01-L018 | MECH | Connector set: keyed locking DC input, 0183 terminal block, USB retention, antenna provision | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-HUB-PRO-01-L019 | N183 | SN65HVD78D 3.3 V RS-485/RS-422 transceiver · SN65HVD78D · Texas Instruments | 1 | OPT | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 3.529 USD | 2026-11-02 · tier 1 | 3.27 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS ED |
| EBOM-HUB-PRO-01-L020 | N183 | ISO7721DR reinforced 2-channel digital isolator · ISO7721DR · Texas Instruments | 1 | OPT | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 1.689 USD | 2026-11-02 · tier 1 | 1.56 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS ED |
| EBOM-HUB-PRO-01-L021 | ETH | Second Ethernet port magnetics/RJ45 (network-segmentation candidate) | 1 | OPT | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP ED |
| EBOM-HUB-PRO-01-L022 | TEST | Service-only internal header and factory test pads | 1 | OPT | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |

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

| Line | Block | Component · MPN · manufacturer | Qty | Req | Subst. | DS | Supplier | Price evidence | Unit price | Cur · VAT · date · tier | EUR* | Stock · risk · lifecycle | Conf. | Verify |
|---|---|---|---:|---|---|---|---|---|---:|---|---:|---|---|---|
| EBOM-WATCH-CORE-01-L001 | MCU | STM32H743VI high-performance MCU · STM32H743VIT6 · STMicroelectronics | 1 | REQ | CMP-MCU-02 | LNR | stmicroelectronics-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · ACTIVE | COST_UNVERIFIED | Q DS |
| EBOM-WATCH-CORE-01-L002 | PROC | Verdin iMX8M Plus Quad 4GB Wi-Fi/BT IT (PN 0058) · 0058 · Toradex | 1 | REQ | CMP-PROC-02 | LNR | toradex-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · ACTIVE | COST_UNVERIFIED | Q DS |
| EBOM-WATCH-CORE-01-L003 | CELL | EG915U-EU LTE Cat 1 bis module · EG915U-EU · Quectel | 1 | REQ | CMP-CELL-03 / CMP-CELL-04 (regional variants) | LNR | quectel-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · ACTIVE | COST_UNVERIFIED | Q DS MT |
| EBOM-WATCH-CORE-01-L004 | SEC | ATECC608B secure element · ATECC608B · Microchip | 1 | REQ | CMP-SEC-02 | LNR | microchip-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · NRND | COST_UNVERIFIED | Q LS DS |
| EBOM-WATCH-CORE-01-L005 | PWR | LMR33630ADDA 3 A synchronous buck converter · LMR33630ADDA · Texas Instruments | 1 | REQ | CMP-PWR-03 | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 2.594 USD | 2026-11-02 · tier 1 | 2.40 | UNK · CRITICAL · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-WATCH-CORE-01-L006 | PWR | LM74700QDBVRQ1 ideal-diode controller · LM74700QDBVRQ1 · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 1.951 USD | 2026-11-02 · tier 1 | 1.81 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-WATCH-CORE-01-L007 | SENSE | INA228AIDGSR 20-bit power monitor · INA228AIDGSR · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 3.893 USD | 2026-11-02 · tier 1 | 3.60 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-WATCH-CORE-01-L008 | SENSE | SHT40 humidity and temperature sensor · SHT40-AD1B-R2 · Sensirion | 1 | REQ | — | LNR | sensirion-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · ACTIVE | COST_UNVERIFIED | Q DS |
| EBOM-WATCH-CORE-01-L009 | SENSE | BMI088 high-performance IMU · BMI088 · Bosch Sensortec | 1 | OPT | — | LNR | bosch-sensortec-01 | UNKNOWN | — | — · tier — | — | UNK · MINOR · UNKNOWN | COST_UNVERIFIED | Q LS DS |
| EBOM-WATCH-CORE-01-L010 | RF | GSA.8841 GNSS/cellular/Wi-Fi wideband antenna · GSA.8841.A.001 · Taoglas | 1 | REQ | No registered alternative | NF | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | Q LS DS MT |
| EBOM-WATCH-CORE-01-L011 | MEM | AT24CS32 32 Kbit I2C EEPROM with factory serial number · AT24CS32 · Microchip | 1 | REQ | — | LNR | microchip-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · NRND | COST_UNVERIFIED | Q LS DS |
| EBOM-WATCH-CORE-01-L012 | MECH | CAB PC/ABS enclosure range (PC 3030 referenced) · CAB PC 3030 · Fibox | 1 | REQ | — | NF | fibox-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | Q LS DS |
| EBOM-WATCH-CORE-01-L013 | GNSS | MAX-M10S-00B GNSS module · MAX-M10S-00B · u-blox | 1 | OPT | — | LNR | ublox-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · EOL | COST_UNVERIFIED | Q LS DS |
| EBOM-WATCH-CORE-01-L014 | PWR | Backup energy source (supercapacitor or backup cell) — only if the final design includes one | 1 | OPT | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-WATCH-CORE-01-L015 | PWR | Protected declared-input front end (fuse/PTC, TVS, wetting current, open/short detection) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-WATCH-CORE-01-L016 | PCB | Passive components and magnetic parts (per board) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-WATCH-CORE-01-L017 | MECH | Declared-input connector set with strain relief | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-WATCH-CORE-01-L018 | MECH | Status indication and local diagnostics path | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |

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

| Line | Block | Component · MPN · manufacturer | Qty | Req | Subst. | DS | Supplier | Price evidence | Unit price | Cur · VAT · date · tier | EUR* | Stock · risk · lifecycle | Conf. | Verify |
|---|---|---|---:|---|---|---|---|---|---:|---|---:|---|---|---|
| EBOM-SENSE-POWER-01-L001 | MCU | STM32H743VI high-performance MCU · STM32H743VIT6 · STMicroelectronics | 1 | REQ | CMP-MCU-02 | LNR | stmicroelectronics-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · ACTIVE | COST_UNVERIFIED | Q DS |
| EBOM-SENSE-POWER-01-L002 | PWR | LMR33630ADDA 3 A synchronous buck converter · LMR33630ADDA · Texas Instruments | 1 | REQ | CMP-PWR-03 | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 2.594 USD | 2026-11-02 · tier 1 | 2.40 | UNK · CRITICAL · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-SENSE-POWER-01-L003 | PWR | LM74700QDBVRQ1 ideal-diode controller · LM74700QDBVRQ1 · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 1.951 USD | 2026-11-02 · tier 1 | 1.81 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-SENSE-POWER-01-L004 | MEM | AT24CS32 32 Kbit I2C EEPROM with factory serial number · AT24CS32 · Microchip | 1 | REQ | — | LNR | microchip-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · NRND | COST_UNVERIFIED | Q LS DS |
| EBOM-SENSE-POWER-01-L005 | MECH | CAB PC/ABS enclosure range (PC 3030 referenced) · CAB PC 3030 · Fibox | 1 | REQ | — | NF | fibox-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | Q LS DS |
| EBOM-SENSE-POWER-01-L006 | SENSE | Protected measurement front end with explicit fault states (open, short, out-of-range) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-POWER-01-L007 | PCB | Passive components and magnetic parts (per module board) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-POWER-01-L008 | MECH | Cable gland, connector set and mounting hardware | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-POWER-01-L009 | N183 | Local data interface to a compatible consumer (transport NOT FROZEN) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-POWER-01-L010 | SENSE | INA228AIDGSR 20-bit power monitor · INA228AIDGSR · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 3.893 USD | 2026-11-02 · tier 1 | 3.60 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-SENSE-POWER-01-L011 | N183 | ISO7721DR reinforced 2-channel digital isolator · ISO7721DR · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 1.689 USD | 2026-11-02 · tier 1 | 1.56 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-SENSE-POWER-01-L012 | SENSE | Battery shunt or Hall current sensor (topology undecided) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |

Arithmetic: 2.594 + 1.951 + 3.893 + 1.689 = **10.127 USD** → **9.38 EUR**; 4 of 12 lines priced.

**`SENSE-BILGE`** — isolated digital input with wetting current and open/short detection. It is **not** a
certified bilge alarm and not the vessel's required bilge-alarm arrangement.

| Line | Block | Component · MPN · manufacturer | Qty | Req | Subst. | DS | Supplier | Price evidence | Unit price | Cur · VAT · date · tier | EUR* | Stock · risk · lifecycle | Conf. | Verify |
|---|---|---|---:|---|---|---|---|---|---:|---|---:|---|---|---|
| EBOM-SENSE-BILGE-01-L001 | MCU | STM32H743VI high-performance MCU · STM32H743VIT6 · STMicroelectronics | 1 | REQ | CMP-MCU-02 | LNR | stmicroelectronics-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · ACTIVE | COST_UNVERIFIED | Q DS |
| EBOM-SENSE-BILGE-01-L002 | PWR | LMR33630ADDA 3 A synchronous buck converter · LMR33630ADDA · Texas Instruments | 1 | REQ | CMP-PWR-03 | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 2.594 USD | 2026-11-02 · tier 1 | 2.40 | UNK · CRITICAL · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-SENSE-BILGE-01-L003 | PWR | LM74700QDBVRQ1 ideal-diode controller · LM74700QDBVRQ1 · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 1.951 USD | 2026-11-02 · tier 1 | 1.81 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-SENSE-BILGE-01-L004 | MEM | AT24CS32 32 Kbit I2C EEPROM with factory serial number · AT24CS32 · Microchip | 1 | REQ | — | LNR | microchip-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · NRND | COST_UNVERIFIED | Q LS DS |
| EBOM-SENSE-BILGE-01-L005 | MECH | CAB PC/ABS enclosure range (PC 3030 referenced) · CAB PC 3030 · Fibox | 1 | REQ | — | NF | fibox-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | Q LS DS |
| EBOM-SENSE-BILGE-01-L006 | SENSE | Protected measurement front end with explicit fault states (open, short, out-of-range) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-BILGE-01-L007 | PCB | Passive components and magnetic parts (per module board) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-BILGE-01-L008 | MECH | Cable gland, connector set and mounting hardware | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-BILGE-01-L009 | N183 | Local data interface to a compatible consumer (transport NOT FROZEN) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-BILGE-01-L010 | N183 | ISO7721DR reinforced 2-channel digital isolator · ISO7721DR · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 1.689 USD | 2026-11-02 · tier 1 | 1.56 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-SENSE-BILGE-01-L011 | SENSE | Wetting-current source and open/short detection network | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-BILGE-01-L012 | MECH | Float-switch wiring terminals (the float switch itself is third-party/customer equipment) | 1 | OPT | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |

Arithmetic: 2.594 + 1.951 + 1.689 = **6.234 USD** → **5.77 EUR**; 3 of 12 lines priced.

**`SENSE-WIND`** — either an original masthead sensor or an NMEA 0183 `MWV/MWD` adapter for a third-party
instrument; masthead sensor and cable are excluded from the SKU.

| Line | Block | Component · MPN · manufacturer | Qty | Req | Subst. | DS | Supplier | Price evidence | Unit price | Cur · VAT · date · tier | EUR* | Stock · risk · lifecycle | Conf. | Verify |
|---|---|---|---:|---|---|---|---|---|---:|---|---:|---|---|---|
| EBOM-SENSE-WIND-01-L001 | MCU | STM32H743VI high-performance MCU · STM32H743VIT6 · STMicroelectronics | 1 | REQ | CMP-MCU-02 | LNR | stmicroelectronics-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · ACTIVE | COST_UNVERIFIED | Q DS |
| EBOM-SENSE-WIND-01-L002 | PWR | LMR33630ADDA 3 A synchronous buck converter · LMR33630ADDA · Texas Instruments | 1 | REQ | CMP-PWR-03 | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 2.594 USD | 2026-11-02 · tier 1 | 2.40 | UNK · CRITICAL · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-SENSE-WIND-01-L003 | PWR | LM74700QDBVRQ1 ideal-diode controller · LM74700QDBVRQ1 · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 1.951 USD | 2026-11-02 · tier 1 | 1.81 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-SENSE-WIND-01-L004 | MEM | AT24CS32 32 Kbit I2C EEPROM with factory serial number · AT24CS32 · Microchip | 1 | REQ | — | LNR | microchip-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · NRND | COST_UNVERIFIED | Q LS DS |
| EBOM-SENSE-WIND-01-L005 | MECH | CAB PC/ABS enclosure range (PC 3030 referenced) · CAB PC 3030 · Fibox | 1 | REQ | — | NF | fibox-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | Q LS DS |
| EBOM-SENSE-WIND-01-L006 | SENSE | Protected measurement front end with explicit fault states (open, short, out-of-range) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-WIND-01-L007 | PCB | Passive components and magnetic parts (per module board) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-WIND-01-L008 | MECH | Cable gland, connector set and mounting hardware | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-WIND-01-L009 | N183 | Local data interface to a compatible consumer (transport NOT FROZEN) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-WIND-01-L010 | N183 | SN65HVD78D 3.3 V RS-485/RS-422 transceiver · SN65HVD78D · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 3.529 USD | 2026-11-02 · tier 1 | 3.27 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-SENSE-WIND-01-L011 | N183 | ISO7721DR reinforced 2-channel digital isolator · ISO7721DR · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 1.689 USD | 2026-11-02 · tier 1 | 1.56 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-SENSE-WIND-01-L012 | SENSE | Masthead sensor input protection and excitation (masthead sensor and cable NOT included) | 1 | OPT | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |

Arithmetic: 2.594 + 1.951 + 3.529 + 1.689 = **9.763 USD** → **9.04 EUR**; 4 of 12 lines priced.

**`SENSE-ENV`** — temperature and humidity are registered (`SHT40`), but the canonical edition also
requires barometric pressure and **no pressure sensor is registered**: a recorded sourcing gap, not an
estimate.

| Line | Block | Component · MPN · manufacturer | Qty | Req | Subst. | DS | Supplier | Price evidence | Unit price | Cur · VAT · date · tier | EUR* | Stock · risk · lifecycle | Conf. | Verify |
|---|---|---|---:|---|---|---|---|---|---:|---|---:|---|---|---|
| EBOM-SENSE-ENV-01-L001 | MCU | STM32H743VI high-performance MCU · STM32H743VIT6 · STMicroelectronics | 1 | REQ | CMP-MCU-02 | LNR | stmicroelectronics-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · ACTIVE | COST_UNVERIFIED | Q DS |
| EBOM-SENSE-ENV-01-L002 | PWR | LMR33630ADDA 3 A synchronous buck converter · LMR33630ADDA · Texas Instruments | 1 | REQ | CMP-PWR-03 | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 2.594 USD | 2026-11-02 · tier 1 | 2.40 | UNK · CRITICAL · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-SENSE-ENV-01-L003 | PWR | LM74700QDBVRQ1 ideal-diode controller · LM74700QDBVRQ1 · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 1.951 USD | 2026-11-02 · tier 1 | 1.81 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-SENSE-ENV-01-L004 | MEM | AT24CS32 32 Kbit I2C EEPROM with factory serial number · AT24CS32 · Microchip | 1 | REQ | — | LNR | microchip-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · NRND | COST_UNVERIFIED | Q LS DS |
| EBOM-SENSE-ENV-01-L005 | MECH | CAB PC/ABS enclosure range (PC 3030 referenced) · CAB PC 3030 · Fibox | 1 | REQ | — | NF | fibox-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | Q LS DS |
| EBOM-SENSE-ENV-01-L006 | SENSE | Protected measurement front end with explicit fault states (open, short, out-of-range) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-ENV-01-L007 | PCB | Passive components and magnetic parts (per module board) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-ENV-01-L008 | MECH | Cable gland, connector set and mounting hardware | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-ENV-01-L009 | N183 | Local data interface to a compatible consumer (transport NOT FROZEN) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-ENV-01-L010 | SENSE | SHT40 humidity and temperature sensor · SHT40-AD1B-R2 · Sensirion | 1 | REQ | — | LNR | sensirion-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · ACTIVE | COST_UNVERIFIED | Q DS |
| EBOM-SENSE-ENV-01-L011 | SENSE | Barometric pressure sensor (NOT REGISTERED — sourcing gap) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-ENV-01-L012 | MECH | Condensation and sensor-placement mitigation | 1 | OPT | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |

Arithmetic: 2.594 + 1.951 = **4.545 USD** → **4.21 EUR**; 2 of 12 lines priced.

**`SENSE-TANKS`** — no sender compatibility list exists and irregular tank shapes are unsolved, so the
front end cannot be selected in MC-11.

| Line | Block | Component · MPN · manufacturer | Qty | Req | Subst. | DS | Supplier | Price evidence | Unit price | Cur · VAT · date · tier | EUR* | Stock · risk · lifecycle | Conf. | Verify |
|---|---|---|---:|---|---|---|---|---|---:|---|---:|---|---|---|
| EBOM-SENSE-TANKS-01-L001 | MCU | STM32H743VI high-performance MCU · STM32H743VIT6 · STMicroelectronics | 1 | REQ | CMP-MCU-02 | LNR | stmicroelectronics-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · ACTIVE | COST_UNVERIFIED | Q DS |
| EBOM-SENSE-TANKS-01-L002 | PWR | LMR33630ADDA 3 A synchronous buck converter · LMR33630ADDA · Texas Instruments | 1 | REQ | CMP-PWR-03 | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 2.594 USD | 2026-11-02 · tier 1 | 2.40 | UNK · CRITICAL · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-SENSE-TANKS-01-L003 | PWR | LM74700QDBVRQ1 ideal-diode controller · LM74700QDBVRQ1 · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 1.951 USD | 2026-11-02 · tier 1 | 1.81 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-SENSE-TANKS-01-L004 | MEM | AT24CS32 32 Kbit I2C EEPROM with factory serial number · AT24CS32 · Microchip | 1 | REQ | — | LNR | microchip-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · NRND | COST_UNVERIFIED | Q LS DS |
| EBOM-SENSE-TANKS-01-L005 | MECH | CAB PC/ABS enclosure range (PC 3030 referenced) · CAB PC 3030 · Fibox | 1 | REQ | — | NF | fibox-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | Q LS DS |
| EBOM-SENSE-TANKS-01-L006 | SENSE | Protected measurement front end with explicit fault states (open, short, out-of-range) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-TANKS-01-L007 | PCB | Passive components and magnetic parts (per module board) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-TANKS-01-L008 | MECH | Cable gland, connector set and mounting hardware | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-TANKS-01-L009 | N183 | Local data interface to a compatible consumer (transport NOT FROZEN) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-TANKS-01-L010 | SENSE | Tank-sender front end (documented excitation/input; sender list does not exist) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-SENSE-TANKS-01-L011 | MECH | Sender wiring terminals, protection and tank-characterisation record | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |

Arithmetic: 2.594 + 1.951 = **4.545 USD** → **4.21 EUR**; 2 of 11 lines priced.

### 4.5 DISPLAY — `EBOM-DISPLAY-7-01`

Candidate configuration `ARCH-DISPLAY-D`: an industrial display module plus a MAREA carrier and SOM.
`DISPLAY_SIZE = SIZE_NOT_FROZEN`; the registered panel is 7-inch-class, which is a property of that
candidate part and **not** a MAREA size claim. `DISPLAY-LARGE-CONDITIONAL` is deliberately not costed and
must never be priced or described with a diagonal. No sunlight, brightness, contrast, touch, thermal or
ingress claim exists; each requires a measurement that has not been executed.

| Line | Block | Component · MPN · manufacturer | Qty | Req | Subst. | DS | Supplier | Price evidence | Unit price | Cur · VAT · date · tier | EUR* | Stock · risk · lifecycle | Conf. | Verify |
|---|---|---|---:|---|---|---|---|---|---:|---|---:|---|---|---|
| EBOM-DISPLAY-7-01-L001 | DISP | RVT70HSSNWN00 7 inch sunlight-readable TFT module with STM32H7 · RVT70HSSNWN00 · Riverdi | 1 | REQ | No registered alternative | LNR | riverdi-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · ACTIVE | COST_UNVERIFIED | Q DS MT |
| EBOM-DISPLAY-7-01-L002 | PROC | Verdin iMX8M Plus Quad 4GB IT (PN 0063) · 0063 · Toradex | 1 | REQ | CMP-PROC-03 | LNR | toradex-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · ACTIVE | COST_UNVERIFIED | Q DS |
| EBOM-DISPLAY-7-01-L003 | PWR | LMR33630ADDA 3 A synchronous buck converter · LMR33630ADDA · Texas Instruments | 1 | REQ | CMP-PWR-03 | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 2.594 USD | 2026-11-02 · tier 1 | 2.40 | UNK · CRITICAL · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-DISPLAY-7-01-L004 | PWR | LM74700QDBVRQ1 ideal-diode controller · LM74700QDBVRQ1 · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 1.951 USD | 2026-11-02 · tier 1 | 1.81 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-DISPLAY-7-01-L005 | MECH | CAB PC/ABS enclosure range (PC 3030 referenced) · CAB PC 3030 · Fibox | 1 | REQ | — | NF | fibox-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | Q LS DS |
| EBOM-DISPLAY-7-01-L006 | ETH | Ethernet magnetics/RJ45 for the documented harness (on-SOM PHY assumed) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-DISPLAY-7-01-L007 | MECH | Marine connector set and documented harness for supported data inputs | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-DISPLAY-7-01-L008 | MECH | Touch sensor or physical button interface (only if the final hardware includes it) | 1 | OPT | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-DISPLAY-7-01-L009 | DISP | Backlight driver and dimming per mode (daylight / sunlight / night) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-DISPLAY-7-01-L010 | PWR | Protection set: fuse/PTC, TVS and bulk capacitance | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-DISPLAY-7-01-L011 | PCB | Passive components and magnetic parts (per board) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-DISPLAY-7-01-L012 | MECH | Mount family, gasket and mounting hardware (surface, orientation and load case undefined) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-DISPLAY-7-01-L013 | MEM | Local storage for configuration, logs and update staging (on-SOM eMMC assumed; not separately registered) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |

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

| Line | Block | Component · MPN · manufacturer | Qty | Req | Subst. | DS | Supplier | Price evidence | Unit price | Cur · VAT · date · tier | EUR* | Stock · risk · lifecycle | Conf. | Verify |
|---|---|---|---:|---|---|---|---|---|---:|---|---:|---|---|---|
| EBOM-AIS-RECEIVER-01-L001 | RF | AIS VHF receive-only receiver module, dual-channel (third-party certified) — NOT REGISTERED, NOT PRICED | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-AIS-RECEIVER-01-L002 | MCU | STM32H743VI high-performance MCU · STM32H743VIT6 · STMicroelectronics | 1 | REQ | — | LNR | stmicroelectronics-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · ACTIVE | COST_UNVERIFIED | Q DS |
| EBOM-AIS-RECEIVER-01-L003 | N183 | SN65HVD78D 3.3 V RS-485/RS-422 transceiver · SN65HVD78D · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 3.529 USD | 2026-11-02 · tier 1 | 3.27 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-AIS-RECEIVER-01-L004 | N183 | ISO7721DR reinforced 2-channel digital isolator · ISO7721DR · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 1.689 USD | 2026-11-02 · tier 1 | 1.56 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-AIS-RECEIVER-01-L005 | PWR | LMR33630ADDA 3 A synchronous buck converter · LMR33630ADDA · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 2.594 USD | 2026-11-02 · tier 1 | 2.40 | UNK · CRITICAL · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-AIS-RECEIVER-01-L006 | PWR | LM74700QDBVRQ1 ideal-diode controller · LM74700QDBVRQ1 · Texas Instruments | 1 | REQ | — | LNR | texasinstruments-01 | MANUFACTURER_PUBLIC_LIST_PRICE | 1.951 USD | 2026-11-02 · tier 1 | 1.81 | UNK · MAJOR · ACTIVE | PUBLIC_PRICE_OBSERVED | Q TI DS |
| EBOM-AIS-RECEIVER-01-L007 | MEM | AT24CS32 32 Kbit I2C EEPROM with factory serial number · AT24CS32 · Microchip | 1 | REQ | — | LNR | microchip-01 | UNKNOWN | — | — · tier — | — | UNK · MAJOR · NRND | COST_UNVERIFIED | Q LS DS |
| EBOM-AIS-RECEIVER-01-L008 | MECH | CAB PC/ABS enclosure range (PC 3030 referenced) · CAB PC 3030 · Fibox | 1 | REQ | — | NF | fibox-01 | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | Q LS DS |
| EBOM-AIS-RECEIVER-01-L009 | RF | VHF antenna input protection and bulkhead connector (antenna and splitter EXCLUDED from the SKU) | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-AIS-RECEIVER-01-L010 | PWR | Protection set: fuse/PTC, TVS and filtering | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-AIS-RECEIVER-01-L011 | PCB | Passive components, shielding and RF layout provisions | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-AIS-RECEIVER-01-L012 | MECH | Status and decoding-health indication | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |
| EBOM-AIS-RECEIVER-01-L013 | MECH | Connector set and labelled harness | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | GP |

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

| Line | Block | Component · MPN · manufacturer | Qty | Req | Subst. | DS | Supplier | Price evidence | Unit price | Cur · VAT · date · tier | EUR* | Stock · risk · lifecycle | Conf. | Verify |
|---|---|---|---:|---|---|---|---|---|---:|---|---:|---|---|---|
| EBOM-PILOT-COASTAL-01-L001 | PROC | Control computer for guidance, mode logic, alarms and logging — NOT SPECIFIED | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | SG |
| EBOM-PILOT-COASTAL-01-L002 | MCU | Independent motor-control electronics with its own real-time limits and watchdog — NOT DESIGNED | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | SG |
| EBOM-PILOT-COASTAL-01-L003 | MECH | Physical helm control head (engage/standby, mode, adjust, acknowledge) — NOT DESIGNED | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | SG |
| EBOM-PILOT-COASTAL-01-L004 | MECH | Surveyed drive/actuator matched to the steering system — NO DATASHEET, NO SURVEY | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | SG |
| EBOM-PILOT-COASTAL-01-L005 | SENSE | Steering/rudder feedback reference — NOT SELECTED | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | SG |
| EBOM-PILOT-COASTAL-01-L006 | GNSS | Calibrated heading reference — NOT SELECTED | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | SG |
| EBOM-PILOT-COASTAL-01-L007 | PWR | Physical E-stop and independent motor-power isolation (contactor/breaker, operator-actuated) — NOT SELECTED | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | SG |
| EBOM-PILOT-COASTAL-01-L008 | PWR | Fused, transient-protected power architecture and harness — NOT DESIGNED | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · CRITICAL · UNKNOWN | COST_UNVERIFIED | SG |
| EBOM-PILOT-COASTAL-01-L009 | MECH | Enclosure and mounting — NOT DESIGNED | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | SG |
| EBOM-PILOT-COASTAL-01-L010 | LOG | Installation records, commissioning tooling and handover pack — NOT DEFINED | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | SG |
| EBOM-PILOT-COASTAL-01-L011 | LOG | Qualified marine engineering survey and installation labour — NOT QUOTED | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | SG |
| EBOM-PILOT-COASTAL-01-L012 | TEST | Safety-case validation, sea trial and independent assessment — NOT AUTHORISED | 1 | REQ | — | — | UNKNOWN | UNKNOWN | — | — · tier — | — | UNK · MAJOR · UNKNOWN | COST_UNVERIFIED | SG |

**Arithmetic.** 0 of 12 lines priced; `knownLinesEur = 0.00` here means *no line is priced*, not that PILOT
costs nothing. The drive/actuator is the single largest unknown in any PILOT feasibility (no datasheet, no
survey, no torque/current/travel figure). The recommended disposition is
`DEFER_SAFETY_CRITICAL_DEVELOPMENT`.

---

## 5. The arithmetic, stated so it can be reproduced

For every BOM and every line `i`, `priced_i` means `unitPriceEur_i` is a number:

```
priced_i        = (unitPriceEur_i is a number)
unitPriceEur_i  = observedUnitPrice_i                      if the observation currency is EUR
unitPriceEur_i  = round6( observedUnitPrice_i × 0.925925926 )  if the observation currency is USD  (fxRateId FX-USD-EUR-01)
unitPriceEur_i  = null                                     if the line is unpriced
knownLinesEur   = round( Σ_i priced_i × qtyPerUnit_i × unitPriceEur_i , 2 )
partialSubtotalEur = knownLinesEur                        # same partial figure, contract field
unknownLineCount = count( lines ) − count( priced )
totalStatus      = "INCOMPLETE"      # always: unpriced lines exist and VAT is unresolved
totalEur         = null              # a numeric complete total would be fabricated
```

Worked example — `EBOM-HUB-STANDARD-01` (four TI list prices, all tier 1, `VAT_UNKNOWN`):

```
observed (USD)   3.529 + 1.689 + 2.594 + 1.951 = 9.763 USD       nativePartialSubtotal (informational only)
unitPriceEur     3.267593 + 1.563889 + 2.401852 + 1.806481 = 9.039815 EUR
knownLinesEur    9.039815 → 9.04 EUR                             partialSubtotalEur = 9.04
unknownLineCount 18 − 4 = 14
totalStatus      INCOMPLETE ; totalEur = null
```

**Conversion method and its limits.** The conversion is a deliberate, visible step, not an arithmetic
accident: every USD observation gets `unitPriceEur` at the base assumption rate and an `fxRateId`, and only
`unitPriceEur` enters the totals; the native USD sum is kept beside it so the arithmetic can be audited in
both currencies. The conversion introduces a currency risk the data cannot measure: the rate is an
assumption (the ECB fetch failed), the actual future purchase rate is unknown, the USD amount is a published
list price rather than a contracted price, and the VAT basis of the underlying observation is unverified
(`VAT_UNKNOWN`), so an ex-VAT EUR figure remains unestablished even after conversion. LOW/HIGH FX
sensitivity is modelled separately in D22 as an explicit labelled multiplier, never by changing the rate
recorded on a line.

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

| Family / BOM | Unpriced lines | What they are |
|---|---:|---|
| EBOM-HUB-STANDARD-01 | 14 of 18 | class-B SOM, supervisory MCU, radio, secure element, EEPROM, enclosure, connectors, protection, passives, RTC backup, GNSS option |
| EBOM-HUB-PRO-01 | 16 of 22 | class-B SOM, supervisory MCU, radio, secure element, EEPROM, enclosure, connectors, protection, passives, RTC backup, GNSS option |
| EBOM-WATCH-CORE-01 | 15 of 18 | cellular modem, processors, secure element, sensors, antenna, enclosure, buffering flash, backup energy |
| EBOM-SENSE-POWER-01 | 8 of 12 | module MCU, sensing elements and front ends, EEPROM, enclosure, glands, calibration |
| EBOM-SENSE-BILGE-01 | 9 of 12 | module MCU, sensing elements and front ends, EEPROM, enclosure, glands, calibration |
| EBOM-SENSE-WIND-01 | 8 of 12 | module MCU, sensing elements and front ends, EEPROM, enclosure, glands, calibration |
| EBOM-SENSE-ENV-01 | 10 of 12 | module MCU, sensing elements and front ends, EEPROM, enclosure, glands, calibration |
| EBOM-SENSE-TANKS-01 | 9 of 11 | module MCU, sensing elements and front ends, EEPROM, enclosure, glands, calibration |
| EBOM-DISPLAY-7-01 | 11 of 13 | panel, compute, enclosure/bezel, backlight driver, mount, connectors, passives |
| EBOM-AIS-RECEIVER-01 | 9 of 13 | third-party receiver module (largest), MCU, connectors, enclosure, RF provisions |
| EBOM-PILOT-COASTAL-01 | 12 of 12 | every line: no design, no selection, no authorised procurement |

**Handoff to MC-12.** MC-12 must not treat these BOMs as a cost baseline. It may treat them as (a) a
traceable list of candidate parts and their evidence state, (b) the recorded sourcing gaps, and (c) the
verification obligations in §7. Any ordering, quoting or procurement decision requires a separate
authorisation under gates G2/G3, and any published price requires the MC-10/MC-11 commercial gates that are
currently closed.
