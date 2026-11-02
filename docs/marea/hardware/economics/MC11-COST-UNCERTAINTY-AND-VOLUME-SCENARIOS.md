# MC-11 D22 — Cost uncertainty and volume scenarios

**Status block**

| Field | Value |
|---|---|
| Milestone | MC-11 — hardware sourcing, conformity and pre-industrialisation economics |
| Deliverable | D22 Cost uncertainty and volume scenarios (machine companion: `data/cost-scenarios.json`) |
| Owner | `bom-cost-engineer` (BOM and manufacturing cost engineering) |
| Branch | `feature/marea-mc11-hardware-sourcing-conformity` |
| Base | MC-10R HEAD `67131782edaf8f3f8327ba79e5c5b4c554b137b0` (verified in D2 §1) |
| Date | 2026-11-02 |
| Status | `COST_MODEL_NOT_APPROVED` — uncertainty analysis of an incomplete model |
| Evidence states | **No volume discount is known anywhere.** No quotation, no MOQ, no lead time, no tooling price, no certification price, no yield data, no measured test time, no installed-base failure data, no observed FX rate. Volumes are **engineering scenarios, not demand forecasts**; customer evidence is `NONE`. |
| Authorises | **No purchase, no price and no production.** No scenario total is complete; no profitability claim is made. |

D21 builds the model. D22 asks the only question that matters for a go/no-go: *which unknown could move the
answer, by how much, and at what point should the configuration be abandoned or re-architected?*

---

## 1. Scenario definition (reproducible)

Every scenario is identified as `SCN-<FAMILY>-<VOLUME>-<LOW|BASE|HIGH>` and is built from the same seventeen
cost categories. The arithmetic:

```
COST-01   = round( Σ_components qty × unit_price_eur_base(tier) × fxMultiplier(case) , 2 )  # observed prices only
            # unit_price_eur_base = published USD tier price × 0.925925926 (FX-USD-EUR-01 / ASM-001),
            # i.e. exactly the unitPriceEur recorded on the corresponding EBOM line for that tier
            # fxMultiplier: LOW 0.947368 (ASM-002), BASE 1, HIGH 1.048544 (ASM-003) — explicit labels
COST-02..09 = round( caseAmount(family, category) × volumeFactor(volume) , 2 )           # ASM-004/011/012
COST-10   = round( assembly_hours × rate(case) × learningFactor(volume) , 2 )             # ASM-005/013
COST-11   = round( (test+inspection+calibration)_hours × rate(case) × learningFactor , 2 )# ASM-005/013
COST-12   = round( installation_hours × rate(case) , 2 )                                  # ASM-010 (no learning)
COST-13   = round( material(01..09) × landedRate(case) , 2 )                              # ASM-009
COST-14   = round( material(01..09) × scrapRate(case) , 2 )                               # ASM-006
COST-15   = round( (material + COST-10 + COST-11) × warrantyRate(case) , 2 )              # ASM-007
COST-16   = round( toolingOneOff(family) × 0.8|1.0|1.5 / volume , 2 )                     # ASM-008
COST-17   = null, status UNKNOWN                                                          # certification: no data
knownSubtotal = Σ line.amountEur where status = KNOWN
totalStatus   = INCOMPLETE ; totalEur = null
```

Published quantity bands are reused exactly where they exist (TI bands 1 / 100 / 250 / 1 000): volume 1 and
10 use band 1, volume 100 uses band 100, volume 500 uses band 250, volume 1 000 uses band 1 000. No band is
interpolated and no discount is extrapolated beyond a published band.

| ID | Assumption | Value | Class | Sensitivity |
|---|---|---:|---|---|
| ASM-001 | BASE-case FX conversion assumes 1 EUR = 1.0800 USD, i.e. 0.925925926 EUR per USD. The ECB euro reference rate could NOT be retrieved in this session: the only fetch attempt (https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml) returned an HTTP 404 from the fetch endpoint. This is therefore an ENGINEERING_ASSUMPTION, not an observed rate, and must be replaced by an observed ECB reference rate before any procurement or price decision. The same base rate is recorded on every USD BOM line as unitPriceEur with fxRateId FX-USD-EUR-01, so no USD figure is ever summed as EUR. | 0.925925926 | ENGINEERING_ASSUMPTION | HIGH |
| ASM-002 | LOW cost case FX sensitivity is an explicit multiplier of 0.947368 applied to the base-rate EUR component cost (equivalent to 1 EUR = 1.1400 USD, or 0.877192982 EUR per USD). It is applied as a labelled multiplier on COST-01 and never by silently changing the rate recorded on a BOM line. | 0.947368 | ENGINEERING_ASSUMPTION | HIGH |
| ASM-003 | HIGH cost case FX sensitivity is an explicit multiplier of 1.048544 applied to the base-rate EUR component cost (equivalent to 1 EUR = 1.0300 USD, or 0.970873786 EUR per USD). It is applied as a labelled multiplier on COST-01 and never by silently changing the rate recorded on a BOM line. | 1.048544 | ENGINEERING_ASSUMPTION | HIGH |
| ASM-004 | Material volume factor applied to the assumption-based material categories: volume 1 = 1.00, 10 = 0.97, 100 = 0.90, 500 = 0.85, 1000 = 0.82. This is NOT a supplier discount and NOT an observed price break; it is a labelled assumption used only to avoid presenting a flat volume curve as fact. | 0.82 | ENGINEERING_ASSUMPTION | HIGH |
| ASM-005 | Labour estimate: fully burdened European EMS assembly/test rate of 30 EUR/h BASE (24 EUR/h LOW, 42 EUR/h HIGH) with per-family time allowances. No EMS rate card, time study or labour quotation exists. | 30 | ENGINEERING_ASSUMPTION | HIGH |
| ASM-006 | Scrap/yield allowance on material: 0% LOW, 1% BASE, 3% HIGH. No yield data exists (no prototype, no DFM review, no first-article run). | 0.01 | ENGINEERING_ASSUMPTION | MEDIUM |
| ASM-007 | Warranty allowance: 1.5% LOW, 3% BASE, 6% HIGH of material plus assembly/test labour. No warranty terms, failure-rate data or RMA history exists. | 0.03 | ENGINEERING_ASSUMPTION | HIGH |
| ASM-008 | Tooling and NRE one-off envelope per family used only for amortisation sensitivity: HUB 12 000 EUR, WATCH 8 000 EUR, SENSE 3 500 EUR (shared platform), DISPLAY 9 000 EUR, AIS 5 000 EUR; LOW 0.8x, HIGH 1.5x. NO tooling or NRE quotation exists; MBOM tooling lines stay UNPRICED. | 12000 | ENGINEERING_ASSUMPTION | HIGH |
| ASM-009 | Landed-cost adjustment on material: 4% LOW, 6% BASE, 12% HIGH for inbound freight and customs handling. No Incoterms, freight quotation or customs ruling exists; import VAT and duty treatment are UNKNOWN. | 0.06 | ENGINEERING_ASSUMPTION | HIGH |
| ASM-010 | Installation and commissioning field labour: HUB 1.2 h, WATCH 1.8 h, SENSE 1.5 h, DISPLAY 2.0 h, AIS 1.3 h per unit at the case labour rate. Professional installation is required for DC-distribution, tank, masthead and battery work. This is a service cost, not manufacturing, and no installer rate exists. | 1.2 | ENGINEERING_ASSUMPTION | MEDIUM |
| ASM-011 | Allowance for electronic and module items with no observed price (COST-02), per unit, LOW/BASE/HIGH in EUR: HUB 85/130/190; WATCH 55/85/130; SENSE 12/18/28; DISPLAY 100/150/230; AIS 90/160/300. The allowance is derived from the architecture class (D4/D7/D8/D9) and the component register gaps, never from a retrieved price. Its largest single element is the unquoted class-B SOM (HUB), the cellular modem plus SOM (WATCH), the panel plus SOM (DISPLAY) and the third-party AIS receiver module (AIS). | 130 | ENGINEERING_ASSUMPTION | HIGH |
| ASM-012 | Allowances for PCB fabrication, PCBA service, enclosure/mechanical, connectors/cable/antenna, labels, packaging and consumables (COST-03..09), per unit, LOW/BASE/HIGH in EUR: HUB 12/18/28, 16/22/32, 28/42/70, 12/18/28, 0.8/1.2/2.0, 3.0/4.5/7.0, 1.8/2.5/4.0; WATCH 7/10/16, 10/14/22, 18/26/45, 10/16/26, 0.8/1.2/2.0, 2.5/3.5/5.5, 1.4/2.0/3.2; SENSE 3.5/5/8, 5/7/11, 10/14/24, 6/9/14, 0.6/0.9/1.5, 1.8/2.5/4.0, 1.0/1.5/2.4; DISPLAY 9/14/22, 12/18/28, 40/65/110, 10/16/26, 0.8/1.2/2.0, 4.0/6.0/9.0, 2.0/3.0/4.8; AIS 8/12/20, 10/15/24, 22/35/60, 14/22/34, 0.8/1.2/2.0, 3.0/4.0/6.0, 1.8/2.5/4.0. Advertised "from" PCB/PCBA prices are not comparable and are not adopted (D13 §2.6-2.7). | 28 | ENGINEERING_ASSUMPTION | HIGH |
| ASM-013 | Labour learning factor applied to assembly/test/inspection/calibration hours: volume 1 = 1.00, 10 = 0.95, 100 = 0.85, 500 = 0.78, 1000 = 0.75. This is NOT an observed productivity improvement; it is a labelled assumption consistent with a 90%-style learning curve and must be replaced by a measured time study. | 0.75 | ENGINEERING_ASSUMPTION | MEDIUM |

| ID | Cost category | Included | Basis |
|---|---|---|---|
| COST-01 | Electronic and module items with an observed public price (partial EBOM) | yes | D19 EBOM priced lines, converted to EUR at the recorded FX assumption |
| COST-02 | Electronic and module items without any observed price (assumption allowance) | yes | ENGINEERING_ASSUMPTION ASM-011 (per family, range in D22); no quotation exists |
| COST-03 | PCB fabrication | yes | ENGINEERING_ASSUMPTION ASM-012; advertised "from" PCB prices are not comparable (D13 §2.6) |
| COST-04 | PCBA assembly service | yes | ENGINEERING_ASSUMPTION ASM-012; advertised from-prices exclude component cost (D13 §2.7) |
| COST-05 | Enclosure and mechanical parts and operations | yes | ENGINEERING_ASSUMPTION ASM-012; no enclosure quotation |
| COST-06 | Connectors, cable and antenna | yes | ENGINEERING_ASSUMPTION ASM-012; no supplier price retrieved |
| COST-07 | Labels, serialisation and traceability | yes | ENGINEERING_ASSUMPTION ASM-012; no conformity mark is claimed on the label |
| COST-08 | Packaging and documentation | yes | ENGINEERING_ASSUMPTION ASM-012; no packaging specification exists |
| COST-09 | Consumables and process materials | yes | ENGINEERING_ASSUMPTION ASM-012; manufacturing route not selected |
| COST-10 | Assembly labour | yes | ENGINEERING_ASSUMPTION ASM-005 (hours x fully burdened rate); no EMS rate card |
| COST-11 | Test, programming, inspection and calibration labour | yes | ENGINEERING_ASSUMPTION ASM-005; test strategy does not exist |
| COST-12 | Installation and commissioning allowance (service, not manufacturing) | yes | ENGINEERING_ASSUMPTION ASM-010; field labour is not part of the manufacturing BOM |
| COST-13 | Inbound freight, customs and landed-cost adjustment | yes | ENGINEERING_ASSUMPTION ASM-009; no Incoterms exist |
| COST-14 | Scrap and yield allowance | yes | ENGINEERING_ASSUMPTION ASM-006 applied to material categories |
| COST-15 | Warranty allowance | yes | ENGINEERING_ASSUMPTION ASM-007 applied to material plus labour |
| COST-16 | Tooling and NRE amortisation per unit | yes | ENGINEERING_ASSUMPTION ASM-008 (one-off amount / volume); no tooling quotation |
| COST-17 | Conformity and certification amortisation | yes | UNKNOWN: no lab was contacted and no certification cost exists; see certificationCosts[] |

## 2. Volume response (BASE case, known subtotals)

| Family (BASE) | 1 | 10 | 100 | 500 | 1 000 | 1 000 vs 1 |
|---|---:|---:|---:|---:|---:|---:|
| HUB | 12351.22 | 1541.20 | 437.13 | 322.50 | 300.05 | 0.024× |
| WATCH | 8268.51 | 1061.69 | 324.90 | 248.10 | 232.93 | 0.028× |
| SENSE | 3645.27 | 492.05 | 168.27 | 133.01 | 125.55 | 0.034× |
| DISPLAY | 9399.13 | 1288.42 | 453.32 | 362.77 | 343.11 | 0.037× |
| AIS | 5353.62 | 843.91 | 370.35 | 312.06 | 296.63 | 0.055× |

Three regimes are visible, and they are a property of the **cost structure**, not of demand:

1. **Tooling-dominated (volume 1–10).** HUB at volume 1 has a 12 351.22 EUR known subtotal of which
   12 000.00 EUR (97%) is amortised tooling/NRE. A single-unit build is a prototype, not a product, and its
   "unit cost" is meaningless.
2. **Transition (~100–500).** Tooling falls to 120.00 EUR at volume 100 (27.5% of the subtotal) and to
   24.00 EUR at 500 (7.4%). Material and labour now dominate.
3. **Material-dominated (1 000).** HUB 300.05 EUR, WATCH 232.93 EUR, SENSE 125.55 EUR (per module),
   DISPLAY 343.11 EUR, AIS 296.63 EUR. Tooling amortisation is 12.00 / 8.00 / 3.50 / 9.00 / 5.00 EUR — under
   4% in every family. The remaining uncertainty is the **unpriced material allowance** and the **missing
   certification cost**, not the one-off costs.

**Important caveat on the volume curve.** The observed component cost falls with published bands
(HUB `COST-01`: 9.04 EUR at volume 1 → 4.31 EUR at volume 1 000), but most of the modelled material cost is
**not** observed: the fall you can see in the table is largely the labelled ASM-004 material-volume factor
and the ASM-013 labour-learning factor, i.e. **assumptions I introduced**, not evidence. That is the single
biggest presentational risk in this document.

## 3. LOW / BASE / HIGH envelopes

| Family | Volume | LOW | BASE | HIGH | HIGH / BASE |
|---|---:|---:|---:|---:|---:|
| HUB | 1 | 9839.26 | 12351.22 | 18561.01 | 1.50× |
| HUB | 100 | 312.12 | 437.13 | 686.35 | 1.57× |
| HUB | 1000 | 205.50 | 300.05 | 478.81 | 1.60× |
| WATCH | 1 | 6587.04 | 8268.51 | 12434.40 | 1.50× |
| WATCH | 100 | 234.89 | 324.90 | 515.55 | 1.59× |
| WATCH | 1000 | 163.32 | 232.93 | 375.44 | 1.61× |
| SENSE | 1 | 2908.17 | 3645.27 | 5475.15 | 1.50× |
| SENSE | 100 | 127.30 | 168.27 | 258.77 | 1.54× |
| SENSE | 1000 | 93.51 | 125.55 | 194.72 | 1.55× |
| DISPLAY | 1 | 7466.58 | 9399.13 | 14160.79 | 1.51× |
| DISPLAY | 100 | 315.20 | 453.32 | 735.42 | 1.62× |
| DISPLAY | 1000 | 231.11 | 343.11 | 565.20 | 1.65× |
| AIS | 1 | 4219.99 | 5353.62 | 8150.64 | 1.52× |
| AIS | 100 | 239.63 | 370.35 | 663.55 | 1.79× |
| AIS | 1000 | 185.37 | 296.63 | 544.12 | 1.83× |

Full per-family matrices (all five volumes × three cases) are recorded in the data file; the tables below are
the same data in family form.

**HUB (HUB-STANDARD) — known subtotal in EUR**

| Volume | LOW EUR | BASE EUR | HIGH EUR | BASE material | BASE tooling amort. | BASE share unknown |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 9839.26 | 12351.22 | 18561.01 | 247.24 | 12000.00 | 98.0% |
| 10 | 1192.54 | 1541.20 | 2344.79 | 240.09 | 1200.00 | 84.4% |
| 100 | 312.12 | 437.13 | 686.35 | 222.13 | 120.00 | 49.2% |
| 500 | 222.30 | 322.50 | 513.26 | 207.96 | 24.00 | 35.5% |
| 1000 | 205.50 | 300.05 | 478.81 | 199.63 | 12.00 | 33.5% |

**WATCH (WATCH-CORE)**

| Volume | LOW EUR | BASE EUR | HIGH EUR | BASE material | BASE tooling amort. | BASE share unknown |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 6587.04 | 8268.51 | 12434.40 | 165.51 | 8000.00 | 98.0% |
| 10 | 822.45 | 1061.69 | 1623.00 | 160.78 | 800.00 | 84.9% |
| 100 | 234.89 | 324.90 | 515.55 | 148.47 | 80.00 | 54.3% |
| 500 | 174.70 | 248.10 | 399.04 | 138.91 | 16.00 | 44.0% |
| 1000 | 163.32 | 232.93 | 375.44 | 133.26 | 8.00 | 42.8% |

**SENSE (representative SENSE-POWER, per module)**

| Volume | LOW EUR | BASE EUR | HIGH EUR | BASE material | BASE tooling amort. | BASE share unknown |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 2908.17 | 3645.27 | 5475.15 | 67.28 | 3500.00 | 98.2% |
| 10 | 385.87 | 492.05 | 744.89 | 65.54 | 350.00 | 86.7% |
| 100 | 127.30 | 168.27 | 258.77 | 59.94 | 35.00 | 64.4% |
| 500 | 99.33 | 133.01 | 205.91 | 55.02 | 7.00 | 58.6% |
| 1000 | 93.51 | 125.55 | 194.72 | 52.13 | 3.50 | 58.5% |

**DISPLAY (DISPLAY-7)**

| Volume | LOW EUR | BASE EUR | HIGH EUR | BASE material | BASE tooling amort. | BASE share unknown |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 7466.58 | 9399.13 | 14160.79 | 277.41 | 9000.00 | 97.0% |
| 10 | 979.62 | 1288.42 | 1992.67 | 269.21 | 900.00 | 79.1% |
| 100 | 315.20 | 453.32 | 735.42 | 249.48 | 90.00 | 45.0% |
| 500 | 245.28 | 362.77 | 596.53 | 234.77 | 18.00 | 35.3% |
| 1000 | 231.11 | 343.11 | 565.20 | 226.02 | 9.00 | 34.1% |

**AIS (AIS-RECEIVER, receive-only)**

| Volume | LOW EUR | BASE EUR | HIGH EUR | BASE material | BASE tooling amort. | BASE share unknown |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 4219.99 | 5353.62 | 8150.64 | 260.74 | 5000.00 | 95.1% |
| 10 | 614.16 | 843.91 | 1382.30 | 253.18 | 500.00 | 70.0% |
| 100 | 239.63 | 370.35 | 663.55 | 234.28 | 50.00 | 36.7% |
| 500 | 195.92 | 312.06 | 570.63 | 219.43 | 10.00 | 29.7% |
| 1000 | 185.37 | 296.63 | 544.12 | 210.70 | 5.00 | 29.0% |

**PILOT-COASTAL** — every category is `UNKNOWN` at every volume and in every case; the known subtotal is
0.00 by construction. `PILOT_SAFETY_GATE = BLOCKED`; there is no design, no actuator and no authorisation, so
any cost figure would be fabricated. The LOW/BASE/HIGH rows exist only so the blocked state is machine-visible.

| Volume | LOW EUR | BASE EUR | HIGH EUR | BASE material | BASE tooling amort. | BASE share unknown |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 0.00 | 0.00 | 0.00 | 0.00 | — | 0.0% |
| 10 | 0.00 | 0.00 | 0.00 | 0.00 | — | 0.0% |
| 100 | 0.00 | 0.00 | 0.00 | 0.00 | — | 0.0% |
| 500 | 0.00 | 0.00 | 0.00 | 0.00 | — | 0.0% |
| 1000 | 0.00 | 0.00 | 0.00 | 0.00 | — | 0.0% |

## 4. Sensitivity of the unit cost to each driver

Deltas are computed against the BASE case at **volume 100** and are additive, not multiplicative: each row
moves one driver and holds the others at BASE.

| Driver (vs BASE, volume 100) | HUB Δ | WATCH Δ | SENSE Δ | DISPLAY Δ | AIS Δ | Worst share of BASE |
|---|---:|---:|---:|---:|---:|---:|
| Scrap 1% → 3% (ASM-006) | 7.77 | 5.47 | 2.15 | 9.28 | 10.05 | 2.7% (AIS) |
| Test time +25% (ASM-005/013) | 4.14 | 3.51 | 3.51 | 3.19 | 2.87 | 2.1% (SENSE) |
| Warranty 3% → 6% (ASM-007) | 15.24 | 10.88 | 4.88 | 17.57 | 19.00 | 5.1% (AIS) |
| Installation +40% (ASM-010) | 14.40 | 21.60 | 18.00 | 24.00 | 15.60 | 10.7% (SENSE) |
| Tooling +50% (ASM-008) | 60.00 | 40.00 | 17.50 | 45.00 | 25.00 | 13.7% (HUB) |
| FX -5% on observed lines (ASM-001) | 1.04 | 0.88 | 1.05 | 0.48 | 1.04 | 0.6% (SENSE) |
| Unpriced-item allowance +25% (ASM-011) | 29.25 | 19.13 | 4.05 | 33.75 | 36.00 | 9.7% (AIS) |

| Family (volume 100, BASE) | BASE subtotal | Observed component (COST-01) | Unpriced allowance (COST-02) | Labour | Tooling amort. | Installation |
|---|---:|---:|---:|---:|---:|---:|
| HUB | 437.13 | 7.75 (1.8%) | 117.00 (26.8%) | 35.71 (8.2%) | 120.00 (27.5%) | 36.00 |
| WATCH | 324.90 | 6.54 (2.0%) | 76.50 (23.6%) | 26.78 (8.2%) | 80.00 (24.6%) | 54.00 |
| SENSE | 168.27 | 7.83 (4.7%) | 16.20 (9.6%) | 21.68 (12.9%) | 35.00 (20.8%) | 45.00 |
| DISPLAY | 453.32 | 3.60 (0.8%) | 135.00 (29.8%) | 28.05 (6.2%) | 90.00 (19.9%) | 60.00 |
| AIS | 370.35 | 7.75 (2.1%) | 144.00 (38.9%) | 22.95 (6.2%) | 50.00 (13.5%) | 39.00 |

How to read the shares (the professional reading, not the comforting one):

- **`COST-02` (unpriced electronic/module allowance)** is the largest single assumption: 26.8% of the HUB
  known subtotal at volume 100, 38.9% for AIS. Every percentage point of that allowance is an unvalidated
  guess about a SOM, a modem, a panel or a receiver module.
- **Observed evidence is marginal**: `COST-01` is 0.8–4.7% of the known subtotal. The programme has strong
  evidence about a *few cheap parts* and no evidence about the *expensive ones*.
- **Tooling amortisation** is 27.5% of the HUB subtotal at volume 100 and 20.8% for SENSE — a one-off cost
  masquerading as a unit cost at low volume.
- **Installation** is 8.2% (HUB) to 26.7% (SENSE) of the known subtotal: a service cost that the hardware
  price cannot absorb silently.
- **Yield, test time and warranty** are individually smaller (2–5%) but they are the only drivers that scale
  with production maturity, and all three are currently pure assumptions.
- **FX** is the smallest driver today (<0.6%) *only because so few lines are priced in USD*. The FX case
  multiplier is explicit and labelled (`ASM-002` ×0.947368, `ASM-003` ×1.048544 applied to the base-rate EUR
  component cost; see D21 §3), not a silent rate change. If the SOM, panel, receiver and modem are quoted in
  USD — likely — FX becomes a material cost driver and the model's current FX exposure is understated.

**Currency and VAT limitation, stated once and applied everywhere.** Every USD observation is converted per
BOM line to `unitPriceEur` at the single base assumption rate (0.925925926 EUR per USD) before any total is
computed, and the native USD sum is retained separately for audit; LOW/HIGH FX cases are then labelled
multipliers on that base conversion, never a different recorded rate. That removes the mixed-basis arithmetic
defect but it does not remove the underlying risk: the rate is an assumption (the ECB retrieval failed), the
future purchase rate and contract currency are unknown, and because nearly every input is `VAT_UNKNOWN` an
ex-VAT EUR cost remains unverified even after conversion. Any figure below should be read as *an EUR model of
an unquoted USD (or unknown-currency) cost*, not as a price anyone could transact.

## 5. Which items dominate the uncertainty (ranked)

| Rank | Uncertainty | Families most exposed | Why it dominates | Evidence state |
|---:|---|---|---|---|
| 1 | **Conformity/certification cost** (`COST-17`) | all, especially radio variants (HUB, WATCH, DISPLAY, AIS) | Unknown in every scenario and potentially larger than a unit's material cost; forces every total to `INCOMPLETE` | `UNKNOWN` — no lab contacted |
| 2 | **Class-B SOM / compute module price** | HUB, DISPLAY, WATCH | The single largest `COST-02` element; only evaluation-kit prices are published | `UNKNOWN` |
| 3 | **Panel price and sunlight/night validation** | DISPLAY | The display is the product; if the panel cannot be validated, the cost is irrelevant | `UNKNOWN` |
| 4 | **Third-party AIS receiver module price** | AIS | The receiver is the product and has no registered component or price | `UNKNOWN` |
| 5 | **Cellular modem + provisioning + operator acceptance** | WATCH | Modem, SIM/eSIM, data plan and certification prerequisites are all open | `UNKNOWN` |
| 6 | **Tooling and NRE** | all | Dominates 1–500 units; no quotation exists; the ASM-008 envelope is ±20% / +50% | `UNKNOWN`, assumption envelope |
| 7 | **Test and calibration time** | SENSE (calibration), all (test) | Determines labour and yield; no test strategy exists | `UNKNOWN`, assumption |
| 8 | **Yield / scrap / warranty** | all | Mature-production drivers; no first-article run, no failure data | `UNKNOWN`, assumption |
| 9 | **Installation labour** | SENSE, WATCH | Field cost can exceed the unit cost of a small SENSE module | `UNKNOWN`, assumption |
| 10 | **FX** | all | Understated by the data: most cost is currently modelled in EUR by assumption, not by contract | `UNKNOWN`, assumption |

## 6. "What would make this unattractive" — threshold analysis

Two thresholds are given per family. They are deliberately different in kind and must not be confused.

- **Envelope threshold (data-derived):** the HIGH-case known subtotal at volume 1 000. If real quotations
  land **above** it, the model's own assumption set has failed and the configuration is outside the envelope
  that MC-11 designed. This is arithmetic on the same data, not a market judgement.
- **Architecture threshold (engineering judgement, explicitly labelled):** the unit cost above which the
  configuration should be re-compared with its cheaper architecture alternative before further hardware
  investment. This is a **programme judgement**, not a market fact, a competitor price or a customer
  willingness-to-pay statement. No customer evidence exists.

| Family | BASE at 1 000 | HIGH at 1 000 (envelope) | Architecture threshold (judgement) | What happens if the threshold is crossed |
|---|---:|---:|---:|---|
| HUB-STANDARD | 300.05 | 478.81 | **350** | Re-evaluate `ARCH-HUB-B` (single SOM, no supervisory MCU) and `ARCH-HUB-E` (integration only) before committing a carrier design. The class-B SOM carries most of `COST-02`; if its quotation exceeds the 110 EUR element assumed inside ASM-011, the hybrid architecture needs a new justification |
| WATCH-CORE | 232.93 | 375.44 | **280** | Re-evaluate `ARCH-WATCH-C` (MCU-only, no connectivity processor). The modem + processor allowance is 85 EUR inside ASM-011; a modem quotation above 35 EUR plus an operator/data plan makes the connected-service model the dominant question, not the hardware |
| SENSE-POWER (per module) | 125.55 | 194.72 | **150** | Re-evaluate `ARCH-SENSE-E` (adapter/third-party reuse). A three-module kit would then exceed ~450 EUR at 1 000 units **before** certification and installation, which no shared-platform argument survives without a customer requirement |
| DISPLAY-7 | 343.11 | 565.20 | **420** | Re-evaluate `ARCH-DISPLAY-A` (tablet in a marine mount) and `ARCH-DISPLAY-E` (runtime on a certified MFD). The panel + compute allowance is 150 EUR inside ASM-011; a panel quotation above 180 EUR plus optical bonding NRE removes the cost case for a proprietary display |
| AIS-RECEIVER | 296.63 | 544.12 | **360** | Keep `AIS_RECEIVE_ONLY_MVP = DEFERRED_TO_INTEGRATION` permanently. The only public comparator recorded in the programme is a third-party receive-only box retailed at EUR 300/360 (**`HISTORICAL_OBSERVATION`, VAT basis unstated, not re-retrieved**) — a MAREA unit whose *known subtotal* approaches that retail level before certification has no structural room for a hardware business. This is a cost-structure observation, not a price recommendation and not a margin claim |
| PILOT-COASTAL | — | — | **no threshold applies** | `PILOT_SAFETY_GATE = BLOCKED`. Cost is not the binding constraint; a safety case, qualified engineering and an authorised programme are. Any commercial case is blocked before cost is reached |

**Reading the thresholds.** They are triggers for **re-engineering decisions**, not for pricing. Crossing one
means "stop and re-argue the architecture", never "charge more" and never "the product is viable".

## 7. Explicit statements about volume and discounts

1. **No volume discount is known.** No supplier has been contacted, no quotation exists, and no MOQ or
   price-break schedule has been observed beyond the manufacturers' public web bands.
2. **Every volume effect other than a published band is a labelled assumption.** `ASM-004` (material volume
   factor) and `ASM-013` (labour learning factor) are the only volume mechanisms in the model, they are
   explicitly *not* supplier discounts, and they are flagged `HIGH`/`MEDIUM` sensitivity.
3. **The published bands are list-price bands, not wholesale tiers.** A contract manufacturer buying 1 000
   units does not pay the manufacturer's web price at that band; it may pay more or less, and only a
   quotation can say. The model therefore does not claim to know the purchasing price at any volume.
4. **Volumes are scenarios, not forecasts.** 1 / 10 / 100 / 500 / 1 000 are engineering quantities used to
   expose the cost structure. They are not demand, not a sales plan and not a commitment.
5. **No amortisation is hidden.** Tooling/NRE appears as its own line in every scenario and as its own
   unpriced line class in the MBOM; it is never folded into a material price.
6. **Nothing is zero.** Every unknown is `null` with `status: UNKNOWN`; no scenario treats a missing cost as
   zero, and `totalEur` is `null` in all 90 scenarios.

## 8. What would change the answer (MC-12 asks)

| # | Ask | Why it matters | Gate |
|---|---|---|---|
| A1 | One quotation per BOM line, at the planned tier, with MOQ and lead time | Replaces 121 unpriced EBOM lines and 135 unpriced MBOM lines, and the entire ASM-011/012 allowance | G2/G3 |
| A2 | One laboratory quotation for EMC/RED and one for environmental testing | Removes the single largest unknown (`COST-17`) | G2/G6 |
| A3 | Datasheets for every registered component | Converts candidates into selections and reveals real pin/power/thermal constraints | G1 |
| A4 | A named manufacturing route with a board and assembly quotation for the real stack-up | Replaces the entire MBOM unknown set | G2/G3 |
| A5 | A tooling/NRE quotation (stencil, fixture, programming, test equipment) | Confirms or replaces ASM-008 | G3 |
| A6 | An observed ECB (or contractual) EUR/USD rate | Replaces ASM-001 and enables a genuine EUR cost basis | — |
| A7 | A measured power, test-time and calibration study | Replaces ASM-005/013 and makes labour real | G4 |
| A8 | A first-article build with yield/scrap data | Replaces ASM-006; yield is a production-maturity driver that no desk model can fix | G4 |
| A9 | Payment terms, MOQ and Incoterms | Enables working-capital and landed-cost modelling (currently `UNKNOWN`) | G2 |
| A10 | A customer requirement or price ceiling | Without it, "unattractive" is an engineering judgement, not a business conclusion | MC-10 (BLOCKED) |

Until A1–A10 exist, this document remains an uncertainty analysis of an incomplete model — which is exactly
what the milestone asked for, and the reason the milestone verdict is `PARTIAL`, not `PASS`.
