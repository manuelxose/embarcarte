# MC-11 D20 — Preliminary manufacturing BOM (MBOM)

**Status block**

| Field | Value |
|---|---|
| Milestone | MC-11 — hardware sourcing, conformity and pre-industrialisation economics |
| Deliverable | D20 Preliminary manufacturing BOM (machine companion: `data/manufacturing-bom.json`) |
| Owner | `bom-cost-engineer` (BOM and manufacturing cost engineering) |
| Branch | `feature/marea-mc11-hardware-sourcing-conformity` |
| Base | MC-10R HEAD `67131782edaf8f3f8327ba79e5c5b4c554b137b0` (verified in D2 §1) |
| Date | 2026-11-02 |
| Status | `MANUFACTURING_BOM_NOT_APPROVED` |
| Evidence states | PCB-fabrication observations: **4 advertised "from" prices** (all `VAT_UNKNOWN`, none comparable to a MAREA board — D13 §2.6). PCBA-service observations: **2 advertised "from" prices** that exclude component cost (D13 §2.7). Enclosure, connector, label, packaging, consumable, tooling and NRE quotations: **0**. Manufacturing-route selection: **not made**. EMS contact: **0**. Physical tests: **NOT_EXECUTED**. |
| Authorises | **No purchase, no price and no production.** Nothing in this file is a production-approved BOM, a process specification, a supplier instruction or a cost commitment. |

D20 is deliberately separated from D19. D19 answers *what the product is made of*; D20 answers *what must
be done to turn those parts into a shippable unit, and what that work would have to cost*. Neither file
establishes a real cost.

---

## 1. Separation from the engineering BOM and the cost-ownership rule

**Rule (binding for this milestone):** a part appears in exactly one of the two BOMs for its cost category.
The engineering BOM owns **material parts** (components, enclosure part, connector parts, antenna). The
manufacturing BOM owns **process and service items** (bare-board fabrication, assembly service, sealing and
machining operations, connector termination, labelling, packaging, consumables, labour, tooling/NRE,
conformity sample builds). The MBOM never repeats an EBOM part line, so the sum of "material" and "process"
never double-counts an item.

Where an MBOM line refers to an EBOM part it carries a `traceTo` field (for example the enclosure sealing
line traces to the enclosure part line). The only priced MBOM lines are **labour estimates**; every other
line is `UNKNOWN` because no manufacturing quotation exists anywhere in the programme.

Why the MBOM is not a manufacturing cost:

1. The advertised PCB and PCBA prices are **minimum-configuration marketing prices**; a MAREA carrier is a
   4–6 layer, ENIG, controlled-impedance board with assembly on both sides, so those numbers are not
   comparable and were **not adopted**.
2. No manufacturing route has been selected (single EMS in Europe vs turnkey Asian fab+assembly changes
   freight, duty, lead time, quality obligations and cost structure).
3. No tooling, stencil, fixture, programming or test-equipment NRE quotation exists.
4. No conformity testing provision exists (no laboratory contacted).

## 2. Process route assumed for costing (not selected)

The generic route below is used only to give the cost categories a shape. It is **not** the
manufacturing-route deliverable and it is not approved:

```
bare PCB fabrication → incoming inspection → SMT + THT assembly (AOI) → firmware programming
  → functional test → calibration (SENSE only) → enclosure sealing/machining + cable glands
  → harness termination + labelling → serialisation/traceability → packaging → conformity sample build
```

A European EMS route and a turnkey Asian route are both plausible; MC-11 does **not** choose between them.
The choice changes landed cost (ASM-009), working capital (lead time and MOQ) and the conformity/technical-file
burden, and it needs a real quotation under gate G2/G3.

## 3. MBOM inventory

{{MBOM_SUMMARY}}

The EUR partial column contains **labour estimates only** for the ten product BOMs (42.00 EUR for HUB, for
example) and **zero for PILOT**. It is not a manufacturing cost and it is not a complete total: 15 of the
15 HUB MBOM lines include 12 unpriced process items and 3 priced labour assumptions.

## 4. Manufacturing BOMs by configuration

### 4.1 HUB — `MBOM-HUB-STANDARD-01` and `MBOM-HUB-PRO-01`

{{MBOM_TABLE_MBOM-HUB-STANDARD-01}}

**Labour arithmetic (HUB):** assembly 0.75 h + functional test/programming 0.55 h + incoming inspection
0.10 h = 1.40 h × 30.00 EUR/h = **42.00 EUR** per unit (ASM-005). No EMS rate card, time study or labour
quotation exists; the rate and the hours are both assumptions. At volume the hours are reduced only through
the labelled learning factor (ASM-013) — see D22.

{{MBOM_TABLE_MBOM-HUB-PRO-01}}

`MBOM-HUB-PRO-01` shares the STANDARD process route. No additional process cost is claimed for the
OPTIONAL candidate-envelope lines beyond the EBOM material lines, because the extra assembly work is not
designed and therefore not estimable.

### 4.2 WATCH — `MBOM-WATCH-CORE-01`

{{MBOM_TABLE_MBOM-WATCH-CORE-01}}

**Labour arithmetic (WATCH):** 0.50 h assembly + 0.45 h test/programming + 0.10 h inspection + 0.15 h
SIM/eSIM provisioning and identity injection = 1.20 h × 30.00 EUR/h = **36.00 EUR**. The provisioning
operation depends on a system and an eSIM agreement that do not exist.

### 4.3 SENSE — `MBOM-SENSE-POWER-01` (representative of the five modules)

{{MBOM_TABLE_MBOM-SENSE-POWER-01}}

**Labour arithmetic (SENSE):** 0.30 h assembly + 0.25 h test/programming + 0.10 h inspection + 0.20 h
calibration = 0.85 h × 30.00 EUR/h = **25.50 EUR** per module. Calibration is the operation that separates
"a sensor" from "a measurement product": a reference chain, a procedure and a record do not exist yet, so
the 0.20 h is an allowance, not a measurement.

`MBOM-SENSE-BILGE-01`, `MBOM-SENSE-WIND-01`, `MBOM-SENSE-ENV-01` and `MBOM-SENSE-TANKS-01` carry the same
process route and the same labour estimate; the module-specific differences are material (EBOM) differences.

{{MBOM_TABLE_MBOM-SENSE-BILGE-01}}

{{MBOM_TABLE_MBOM-SENSE-WIND-01}}

{{MBOM_TABLE_MBOM-SENSE-ENV-01}}

{{MBOM_TABLE_MBOM-SENSE-TANKS-01}}

### 4.4 DISPLAY — `MBOM-DISPLAY-7-01`

{{MBOM_TABLE_MBOM-DISPLAY-7-01}}

**Labour arithmetic (DISPLAY):** 0.60 h + 0.40 h + 0.10 h = 1.10 h × 30.00 EUR/h = **33.00 EUR**. Optical
bonding is listed as an unpriced process line because no bonding partner has been selected and its
reliability (delamination, bubbles) is unproven; until then a bonded front is not a manufacturable feature.

### 4.5 AIS — `MBOM-AIS-RECEIVER-01` (receive-only integration)

{{MBOM_TABLE_MBOM-AIS-RECEIVER-01}}

**Labour arithmetic (AIS):** 0.45 h + 0.35 h + 0.10 h = 0.90 h × 30.00 EUR/h = **27.00 EUR**. The RF
alignment/verification line is unpriced: no RF test programme, equipment or procedure exists for a
receive-only front end, and no transmitter work is permitted.

### 4.6 PILOT — `MBOM-PILOT-COASTAL-01`

{{MBOM_TABLE_MBOM-PILOT-COASTAL-01}}

**PILOT is unpriced in full, including labour.** A labour estimate for an undesigned safety-critical
product would be a fabricated number, so every line is `UNKNOWN`. `PILOT_SAFETY_GATE = BLOCKED`; there is
no design, no process, no survey, no supplier contact and no authorisation. This MBOM exists to keep the
blocked state machine-visible.

## 5. Why no advertised PCB/PCBA price was adopted

| Observation | Advertised | What it actually covers | Adopted? |
|---|---|---|---|
| `PO-PCB-001` | USD 2.00 "from", 5 pieces, 1–2 layers | Cheapest possible board; excludes shipping, order stencil/tooling, test, VAT, EU handling | **No** — not a MAREA 4–6 layer ENIG controlled-impedance board |
| `PO-PCB-003` | USD 5.00 "from", 10 pieces, 1–2 layers | Same limitations | **No** |
| `PO-PCB-004` | EUR 14.20 "starting at" (EU fab) | Minimum configuration; excludes the same items | **No** |
| `PO-PCB-002` | USD 3.00 "from", SMT stencil | Promotional simple-stencil price, not a MAREA order tooling quote | **No** |
| `PO-PCBA-001` | USD 8.00 "from", assembly | **Excludes all component cost**, stencil, programming, functional test, tooling, shipping, VAT | **No** |
| `PO-PCBA-002` | USD 29.00 headline incl. promotional free shipping, 1–20 pcs | Same exclusions; promotional and time-limited | **No** |

Adopting any of them would convert a marketing headline into a manufacturing cost and would break the
inheritance rule. They remain recorded as observations, not as cost lines.

## 6. Separate tooling and NRE lines (never amortised silently)

| MBOM line class | Examples | State | Why separate |
|---|---|---|---|
| Order tooling | SMT stencil / solder-paste screen | `UNKNOWN` | Per-order one-off; never a per-unit price |
| Product tooling | Enclosure tooling / machining fixture / test fixture | `UNKNOWN` | No quotation; D21 applies **ASM-008** only as a labelled sensitivity |
| Programming/test NRE | Programming fixture, factory test equipment NRE | `UNKNOWN` | No test strategy exists |
| Conformity provision | EMC pre-scan sample builds, preparation coupons | `UNKNOWN` | No laboratory contacted; `PHYSICAL_TESTS = NOT_EXECUTED` |

No scenario in `data/cost-scenarios.json` can ever total a complete cost while these lines are unknown; the
amortisation figures in D21/D22 are labelled assumptions and are presented as a sensitivity, not as a price.

## 7. What is deliberately not in the MBOM

- **No component cost.** Components are EBOM lines; the MBOM never restates them (double-count protection).
- **No certification cost.** Certification is a separate register in `data/cost-scenarios.json`
  (`certificationCosts[]`), all `UNKNOWN`, never amortised into a unit total.
- **No engineering NRE.** Engineering effort is a separate register (`engineeringCosts[]`), all `UNKNOWN`.
- **No logistics or duty.** Landed cost is a cost-model adjustment (D21, ASM-009), not a manufacturing line.
- **No installation labour.** Installation/commissioning is a field service cost (D21 ASM-010), not
  manufacturing.
- **No margin, no price.** Nothing in this file contributes to a selling price.

## 8. Verification obligations before any MBOM line becomes purchasable

| # | Obligation | Gate |
|---|---|---|
| M1 | Select the manufacturing route (EU EMS vs turnkey) with a documented trade-off | G2 |
| M2 | Obtain a fabrication quotation for the real board stack-up (layers, material, finish, impedance) | G2/G3 |
| M3 | Obtain an assembly quotation that states component basis, hand-work, AOI/ICT/FCT, IPC class and sample plan | G2/G3 |
| M4 | Obtain tooling/NRE quotations (stencil, fixture, programming, test equipment) as separate items | G3 |
| M5 | Obtain packaging, labelling and drop-test specification; confirm no conformity mark is printed | G3/G6 |
| M6 | Define the calibration/reference chain and its traceability (SENSE only) | G4 |
| M7 | Define the factory test strategy and measured test time; replace the 0.10–0.55 h allowances | G4 |
| M8 | Obtain conformity pre-scan and full-test quotations from a named laboratory | G6 |
| M9 | Keep `PILOT` unpriced and unprocured until an authorised safety programme exists | G1–G7 |

**Bottom line.** The only quantified manufacturing figures in MC-11 are labour allowances (25.50–42.00 EUR
per unit depending on family). Everything else — board fabrication, assembly service, enclosure work,
labels, packaging, consumables, tooling, fixtures, conformity samples — is `UNKNOWN`. That is the honest
state of the evidence, and MC-12 must not convert it into a manufacturing cost.
