# MC-11 D21 — Hardware cost model (preliminary, bottom-up)

**Status block**

| Field | Value |
|---|---|
| Milestone | MC-11 — hardware sourcing, conformity and pre-industrialisation economics |
| Deliverable | D21 Hardware cost model (machine companion: `data/cost-scenarios.json`) |
| Owner | `bom-cost-engineer` (BOM and manufacturing cost engineering) |
| Branch | `feature/marea-mc11-hardware-sourcing-conformity` |
| Base | MC-10R HEAD `67131782edaf8f3f8327ba79e5c5b4c554b137b0` (verified in D2 §1) |
| Date | 2026-11-02 |
| Status | `COST_MODEL_NOT_APPROVED` — internal engineering model only |
| Evidence states | Observation-derived cost inputs: **20 manufacturer list-price observations** usable across **5 components** (4 published quantity bands each). Quotations: **0**. Supplier contact: **0**. Certification cost: **UNKNOWN** (no laboratory contacted). Engineering NRE: **UNKNOWN** (no rate, schedule or contract). Recurring operating cost: **UNKNOWN** (no provider contract). Working capital: **UNKNOWN** (no payment terms, MOQ or lead time). FX: **assumption only** — the ECB reference rate could not be retrieved. |
| Authorises | **No purchase, no price and no production.** No margin, mark-up or profitability figure is computed or implied. Nothing here is a selling price or an offer. |

This model answers one question only: *given the evidence that actually exists, what can and cannot be said
about the cost of the candidate hardware?* The answer is deliberately uncomfortable: the observed evidence
prices a sliver of each product, the expensive items have no price at all, and every total is therefore
`INCOMPLETE`.

---

## 1. Method and boundary

The model is **bottom-up**: unit cost is built from the engineering BOM (material), the manufacturing BOM
(process and labour), landed-cost adjustment, yield/scrap, warranty, installation and tooling amortisation.
Each category is a separate line in every scenario so that a missing category can never be mistaken for a
zero.

| Included in the per-unit model | Excluded from the per-unit model (and where it lives) |
|---|---|
| `COST-01` electronic/module items with an observed public price (partial EBOM) | Certification and conformity testing → `certificationCosts[]`, all `UNKNOWN` |
| `COST-02`..`COST-09` material and process allowances (assumption) | Engineering NRE → `engineeringCosts[]`, all `UNKNOWN` |
| `COST-10`/`COST-11` assembly, test, programming, inspection, calibration labour | Tooling and NRE quotations as facts → MBOM lines, all `UNKNOWN`; only ASM-008 sensitivity here |
| `COST-12` installation/commissioning field labour (service, not manufacturing) | Recurring operating cost → `recurringOperatingCosts[]`, all `UNKNOWN` |
| `COST-13` landed-cost adjustment, `COST-14` scrap/yield, `COST-15` warranty | Working capital, FX hedging, MOQ inventory → `UNKNOWN`, no terms exist |
| `COST-16` tooling/NRE amortisation per unit (assumption) | Margin, mark-up, profitability → **not modelled at all** |
| `COST-17` conformity amortisation → `UNKNOWN` in every scenario | Customer willingness to pay → no customer evidence exists (`CUSTOMER_EVIDENCE = NONE`) |

Scenarios cover **6 families × 5 volumes (1 / 10 / 100 / 500 / 1 000) × 3 cases (LOW / BASE / HIGH) = 90
scenarios**. `HUB` uses `HUB-STANDARD`; `SENSE` uses `SENSE-POWER` as the representative module (the highest
priced-line count) and the other four modules differ only in the priced subset shown in D19. `PILOT` is
present so the blocked state is machine-visible and is unpriced in every category.

## 2. The observation inventory this model can use

| Observation group | Count | Currency | VAT | Usable as a cost input? |
|---|---:|---|---|---|
| TI manufacturer list prices, 5 components × 4 bands | **20** | USD | `VAT_UNKNOWN` | **Yes** — the only tiered component prices in the programme; tier 1 used in D19, the matching band used per volume here |
| u-blox ZED-F9P list prices | 3 | USD | `VAT_UNKNOWN` | **No** — a different (RTK) module class than the MAX-M10 HUB/WATCH option; not adopted |
| RS Components CAN transceiver, 5 bands | 5 | EUR | `VAT_EXCLUDED` | **No** — CAN/NMEA 2000 is `BLOCKED` for every edition |
| PCB fabrication "from" prices | 4 | 3 USD + 1 EUR | `VAT_UNKNOWN` | **No** — minimum-configuration marketing prices, not comparable (D20 §5) |
| PCBA "from" prices | 2 | USD | `VAT_UNKNOWN` | **No** — exclude component cost and all tooling/test (D20 §5) |
| **Total** | **42** | 36 USD / 6 EUR | 5 `VAT_EXCLUDED`, 37 `VAT_UNKNOWN` | 20 usable component observations |
| Formal quotations | **0** | — | — | **None exists** |

Consequence: the model's `COST-01` is a **partial observed component cost**, and it is small. At volume 100
it is 1.8% (HUB), 2.0% (WATCH), 4.7% (SENSE), 0.8% (DISPLAY) and 2.1% (AIS) of the modelled known subtotal.
Anyone quoting those percentages as "the component share" would be misreading a partial figure as a total.

## 3. Currency, foreign exchange and the failed reference-rate retrieval

Exactly what happened, recorded so it can be audited:

1. The programme has **no EUR-denominated component price** for any component used in these BOMs
   (EVD-MC11-203). The only EUR component prices price a CAN transceiver that no BOM may use.
2. The instruction was to attempt **one** retrieval of a real ECB EUR/USD reference rate. The single
   attempt targeted `https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml` and **failed**: the
   fetch endpoint returned HTTP 404, so no page content was obtained. No rate is claimed as observed.
3. Therefore the conversion is an **`ENGINEERING_ASSUMPTION`**: **1 EUR = 1.0800 USD**, i.e.
   **`EUR per USD = 1 / 1.08 = 0.925925926`** (`ASM-001`, `FX-USD-EUR-01`). The quoted direction is stated
   explicitly in the data (`quotedPair: EUR/USD`, `quotedRate: 1.08`, `quotedRateDirection: USD per EUR`) so
   the inversion cannot be misapplied.
4. The conversion is applied **per BOM line**, not inside a total: a USD observation keeps its
   `observedUnitPrice` and `currency: "USD"` exactly as published and carries `unitPriceEur =
   observedUnitPrice × 0.925925926` plus `fxRateId: "FX-USD-EUR-01"`; a EUR line carries
   `unitPriceEur = observedUnitPrice` with `fxRateId: null`; an unpriced line carries `unitPriceEur: null`.
   `knownLinesEur` and `partialSubtotalEur` are computed from `unitPriceEur` only, so a USD figure is never
   summed as EUR. The native-currency sum is retained as `nativePartialSubtotal` for audit.
5. LOW and HIGH cases apply **explicit labelled multipliers** to the base-rate EUR component cost
   (`ASM-002`: ×0.947368, equivalent to 1 EUR = 1.14 USD; `ASM-003`: ×1.048544, equivalent to 1 EUR = 1.03
   USD), recorded as `fxMultiplier` on each scenario. The rate recorded on a BOM line is never swapped
   silently, and only `COST-01` is FX-sensitive because every other category is modelled directly in EUR.
6. Any `OBSERVED_RATE` in a later authorised session must carry a real `sourceUrl` and `retrievedOn`; the
   model's validator rules reject a rate with neither provenance.

| Rate ID | From → To | Rate | Quoted | Provenance |
|---|---|---:|---|---|
| FX-USD-EUR-01 | USD → EUR | 0.925925926 | 1 EUR = 1.08 USD | ENGINEERING_ASSUMPTION (ASM-001); source URL: none; retrieved: no |
| FX-USD-EUR-LOW | USD → EUR | 0.877192982 | 1 EUR = 1.14 USD | ENGINEERING_ASSUMPTION (ASM-002); source URL: none; retrieved: no |
| FX-USD-EUR-HIGH | USD → EUR | 0.970873786 | 1 EUR = 1.03 USD | ENGINEERING_ASSUMPTION (ASM-003); source URL: none; retrieved: no |

**How much does FX matter today?** Little — because only a handful of lines are USD-priced: a −5% move on
the observed lines changes the HUB volume-100 subtotal by about 1.04 EUR (0.2%). **But that is an artefact
of the evidence**: the expensive items (SOM, modem, panel, receiver) have no price, and if they are quoted
in USD at contract, FX becomes a material share of the whole cost. The model's FX exposure is therefore
*understated*, not small.

## 4. VAT, import and landed treatment

| Question | State | Consequence for the model |
|---|---|---|
| Is any input ex-VAT known? | Only 5 EUR observations are `VAT_EXCLUDED`; 37 observations are `VAT_UNKNOWN` | **No ex-VAT total is claimed anywhere.** The top-level `vatTreatment: VAT_EXCLUDED` is a target basis, not a measured one |
| Is any input VAT-included? | No `VAT_INCLUDED` line exists | No normalisation was required; had one existed, `normalizationApplied` would be mandatory |
| Import VAT / reverse charge | `UNKNOWN` — no purchase, no import, no customs ruling, no VAT registration position in this file | Cannot be modelled |
| Duty and origin | `UNKNOWN` — no supplier country for a contract, no Incoterms | Only the ASM-009 allowance exists |
| Landed cost | Modelled only as **ASM-009**: 4% / 6% / 12% of material for LOW / BASE / HIGH | A labelled assumption, not a quotation |
| Incoterms | `UNKNOWN` — EXW/FCA/DAP change the landed number materially | Must come from a real quotation |

The financial treatment is recorded in the data file (`financialTreatment`) and summarised here: costs are
ex-VAT **in intent only**, import and duty are unknown, landed cost is an assumption, assembly is an
assumption-based labour line, one-off costs are kept separate from recurring costs, and working capital
cannot be quantified because no payment term, MOQ, price-hold or FX-hedge position exists.

Every figure in this model that is not an observation is traceable to one assumption record below. The
records are the machine `assumptions[]` array in `data/cost-scenarios.json`; a line or scenario that
depends on one cites its identifier. **No assumption is a supplier statement or a price.**

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

## 5. Cost categories

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

## 6. Reference build-up: HUB at volume 100, BASE case

This is the model's most complete reference point. It is **not** a HUB cost.

| Category | Amount EUR | Status | Basis |
|---|---:|---|---|
| COST-01 Electronic and module items with an observed public price (partial EBOM) | 7.75 | KNOWN | Observed public list prices at published tier 100 (PO-N183-002, PO-N183-006, PO-PWR-006, PO-PWR-002): 8.37 USD converted to 7.75 EUR at the base rate 0.925925926 (FX-USD-EUR-01 / ASM-001; each EBOM line records the same unitPriceEur); no FX case multiplier is applied (BASE case: multiplier 1.000000; the base rate is the only rate used). Covers only 4 of 18 EBOM lines: NOT a component cost. |
| COST-02 Electronic and module items without any observed price (assumption allowance) | 117.00 | KNOWN | ENGINEERING_ASSUMPTION (ASM-011) case amount 130.00 EUR x volume factor 0.9 (ASM-004). Not a quotation; no supplier price exists. |
| COST-03 PCB fabrication | 16.20 | KNOWN | ENGINEERING_ASSUMPTION (ASM-012) case amount 18.00 EUR x volume factor 0.9 (ASM-004). Not a quotation; no supplier price exists. |
| COST-04 PCBA assembly service | 19.80 | KNOWN | ENGINEERING_ASSUMPTION (ASM-012) case amount 22.00 EUR x volume factor 0.9 (ASM-004). Not a quotation; no supplier price exists. |
| COST-05 Enclosure and mechanical parts and operations | 37.80 | KNOWN | ENGINEERING_ASSUMPTION (ASM-012) case amount 42.00 EUR x volume factor 0.9 (ASM-004). Not a quotation; no supplier price exists. |
| COST-06 Connectors, cable and antenna | 16.20 | KNOWN | ENGINEERING_ASSUMPTION (ASM-012) case amount 18.00 EUR x volume factor 0.9 (ASM-004). Not a quotation; no supplier price exists. |
| COST-07 Labels, serialisation and traceability | 1.08 | KNOWN | ENGINEERING_ASSUMPTION (ASM-012) case amount 1.20 EUR x volume factor 0.9 (ASM-004). Not a quotation; no supplier price exists. |
| COST-08 Packaging and documentation | 4.05 | KNOWN | ENGINEERING_ASSUMPTION (ASM-012) case amount 4.50 EUR x volume factor 0.9 (ASM-004). Not a quotation; no supplier price exists. |
| COST-09 Consumables and process materials | 2.25 | KNOWN | ENGINEERING_ASSUMPTION (ASM-012) case amount 2.50 EUR x volume factor 0.9 (ASM-004). Not a quotation; no supplier price exists. |
| COST-10 Assembly labour | 19.13 | KNOWN | ENGINEERING_ASSUMPTION ASM-005: 0.75 h/unit x 30 EUR/h x labour learning factor 0.85 (ASM-013). |
| COST-11 Test, programming, inspection and calibration labour | 16.58 | KNOWN | ENGINEERING_ASSUMPTION ASM-005: 0.65 h/unit (test 0.55 + inspection 0.1 + calibration 0) x 30 EUR/h x learning factor 0.85. |
| COST-12 Installation and commissioning allowance (service, not manufacturing) | 36.00 | KNOWN | ENGINEERING_ASSUMPTION ASM-010: 1.2 h/unit field installation/commissioning x 30 EUR/h. Service cost, not manufacturing; no learning factor (field labour does not amortise). |
| COST-13 Inbound freight, customs and landed-cost adjustment | 13.33 | KNOWN | ENGINEERING_ASSUMPTION ASM-009: 6% of material 222.13 EUR. No Incoterms, freight tariff or customs ruling exists. |
| COST-14 Scrap and yield allowance | 2.22 | KNOWN | ENGINEERING_ASSUMPTION ASM-006: 1% scrap/yield allowance on material. No yield data exists. |
| COST-15 Warranty allowance | 7.74 | KNOWN | ENGINEERING_ASSUMPTION ASM-007: 3.0% of material plus assembly/test labour. No warranty terms exist. |
| COST-16 Tooling and NRE amortisation per unit | 120.00 | KNOWN | ENGINEERING_ASSUMPTION ASM-008: 12000.00 EUR one-off tooling/NRE / 100 units. No tooling quotation exists; amortisation only, never a per-unit price. |
| COST-17 Conformity and certification amortisation | UNKNOWN | UNKNOWN | UNKNOWN: conformity/certification cost does not exist (no laboratory contacted, no public price, no quotation). Left UNKNOWN so no scenario subtracts it as zero. |
| **Known subtotal (not a total)** | **437.13** | | COST-17 UNKNOWN |

Reading it honestly:

- the **observed** electronic lines contribute 7.75 EUR (1.8%);
- the **unpriced** electronic/module allowance contributes 117.00 EUR (26.8%) and is entirely an assumption
  — its largest element is the class-B SOM, for which only evaluation-kit prices exist;
- **tooling amortisation** contributes 120.00 EUR (27.5%) at this volume — i.e. more than a quarter of the
  subtotal is a one-off cost divided by 100, not a property of the product;
- labour (35.71), installation (36.00), landed (13.33), scrap (2.22) and warranty (7.74) are all
  assumptions with no supplier behind them;
- `COST-17` conformity is **UNKNOWN**, so the known subtotal (437.13 EUR) is not a unit cost and the scenario
  is `INCOMPLETE` with `totalEur: null`.

The same construction applies to every family. At volume 1 000 the tooling share collapses and the unpriced
material allowance and the certification gap dominate the unknown.

## 7. LOW / BASE / HIGH envelopes (known subtotals, not totals)

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

All three columns are **known subtotals** — they sum only the categories that have a number. They exclude
`COST-17` (conformity) and all engineering NRE, so they are lower bounds on any future cost, never estimates
of the true unit cost.

## 8. Engineering costs (separate register — all UNKNOWN)

Engineering effort is not a cost of goods and must not be amortised into a unit price in MC-11.

| Item | Amount | Status | Basis |
|---|---:|---|---|
| Hardware engineering (schematic, layout, carrier design) — no hours, rates or contract exist | UNKNOWN | UNKNOWN | No engineering schedule, day rate or supplier exists. Remains UNKNOWN and is never summed as zero. |
| Firmware and platform engineering — no scope or rate exists | UNKNOWN | UNKNOWN | No scope baseline; UNKNOWN. |
| Industrial design, mechanical design and enclosure engineering | UNKNOWN | UNKNOWN | No designer or mechanical house engaged; UNKNOWN. |
| Conformity engineering and technical-file preparation | UNKNOWN | UNKNOWN | Conformity scope not frozen; UNKNOWN. |
| Test equipment CAPEX (EMC pre-scan, thermal chamber, RF bench, calibration reference) | UNKNOWN | UNKNOWN | No equipment identified, priced or hired; UNKNOWN. |
| Programme management, quality and documentation | UNKNOWN | UNKNOWN | No staffing plan or rate; UNKNOWN. |
| First-article and certification sample material | UNKNOWN | UNKNOWN | Not planned, not procured, not authorised; UNKNOWN. |

## 9. Certification and conformity costs (separate register — all UNKNOWN, none guaranteed)

| Item | Amount | Status | Guaranteed | Source note |
|---|---:|---|---|---|
| EMC pre-compliance (in-house or pre-scan) for the HUB/Display radio and non-radio configurations | UNKNOWN | UNKNOWN | false | No laboratory contacted; no public price retrieved; PHYSICAL_TESTS = NOT_EXECUTED. |
| EMC full compliance testing and report | UNKNOWN | UNKNOWN | false | No laboratory contacted and no quotation requested (RFQ transmission NOT_AUTHORIZED). Status is UNKNOWN, never a guaranteed price. |
| RED radio equipment testing (only for configurations that actually contain a radio) | UNKNOWN | UNKNOWN | false | Radio presence is an OPEN edition-boundary question for HUB; no notified body or test house engaged. |
| CRA / cybersecurity conformity assessment preparation | UNKNOWN | UNKNOWN | false | No scope agreed, no assessor engaged, no cost basis. |
| NMEA 2000 product certification and membership (not pursued in MC-11) | UNKNOWN | UNKNOWN | false | NMEA2000_CERTIFIED = false. No application, no fee schedule retrieved; excluded from all totals. |
| Environmental / ingress / salt-fog / vibration testing | UNKNOWN | UNKNOWN | false | No test house contacted; ENVIRONMENTAL_RATING_CLAIM = PROHIBITED until measured. |
| Electrical safety and battery-adjacent assessment (SENSE-POWER, WATCH) | UNKNOWN | UNKNOWN | false | No laboratory or notified body engaged; scope not defined. |
| Marine equipment type-approval assessment (if applicable to the final configuration) | UNKNOWN | UNKNOWN | false | Applicability is a conformity-workstream question; no decision exists and no fee retrieved. |
| Notified body involvement where required by the final directive route | UNKNOWN | UNKNOWN | false | Not determined; no engagement, no quotation, no cost. |

Certification is the single largest structurally missing cost in the model. It is kept out of every scenario
total (`COST-17 = UNKNOWN`) precisely so that no scenario can look complete by omission. No item here is a
guaranteed price; `guaranteed: false` is mandatory and every item is `UNKNOWN` because no laboratory was
contacted and no public price exists.

## 10. Recurring operating costs (separate register — all UNKNOWN)

| Item | Amount | Status | Basis |
|---|---:|---|---|
| Cellular data plan / eSIM roaming for WATCH | UNKNOWN | UNKNOWN | No operator contract, no roaming terms, no data cap known; UNKNOWN. |
| Cloud hosting and telemetry ingestion | UNKNOWN | UNKNOWN | No provider selected and no usage model; UNKNOWN. |
| Notification provider fees for the alert chain | UNKNOWN | UNKNOWN | No provider engaged; UNKNOWN. |
| Firmware update / OTA distribution and signing infrastructure | UNKNOWN | UNKNOWN | Not designed; UNKNOWN (CRA obligation nonetheless). |
| Device provisioning, identity and PKI operation | UNKNOWN | UNKNOWN | No system exists; UNKNOWN. |
| Warranty reserve and RMA logistics | UNKNOWN | UNKNOWN | No failure-rate history; UNKNOWN. |
| Spares and field-replacement logistics | UNKNOWN | UNKNOWN | No spares strategy; UNKNOWN. |
| Customer support and installer support | UNKNOWN | UNKNOWN | No support model or cost; UNKNOWN. |

Recurring cost is what makes a connected-hardware business different from a box sale, and MC-11 has **no
contract, no provider, no usage model and no failure-rate data** for any of it. A product whose per-unit
hardware cost is understood can still be uneconomic on recurring cost; that question is unanswerable today.

## 11. One-off versus recurring versus per-unit

| Class | Items | State | Treatment |
|---|---|---|---|
| One-off | Tooling/NRE (ASM-008), engineering NRE, certification, test equipment CAPEX, conformity samples | `UNKNOWN` except the labelled ASM-008 envelope | Never amortised silently; only shown as a sensitivity |
| Per-unit | Material, PCB/PCBA, mechanical, labour, landed, scrap | Partially observed, mostly assumption | Summed only when numeric; never zero-filled |
| Recurring | Cellular data, cloud, notification provider, OTA/PKI, support, warranty reserve | `UNKNOWN` | Separate register, never folded into unit cost |
| Working capital | MOQ inventory, payment terms, lead time, FX hedge | `UNKNOWN` | Cannot be quantified without a supplier relationship |

## 12. What would have to be true for a complete model

1. A **quotation** for every BOM line — legal entity, reference, validity, MPN/revision, price breaks, MOQ,
   lead time, currency, VAT treatment, Incoterms, setup/tooling, test regime, warranty and PCN commitment.
2. At least one **observed EUR/USD rate** with URL and retrieval date (replacing ASM-001), or a contractual
   FX basis.
3. A **manufacturing route** selection and a board-level **tooling/NRE quotation**.
4. A named **laboratory quotation** for EMC/RED, environmental, and (if applicable) marine type approval.
5. **Datasheets** for every registered component so the candidate can become a selection.
6. A **measured** power, test-time and calibration time study (replacing ASM-005/013).
7. A **yield/scrap** observation from a first-article run (replacing ASM-006).
8. **Payment terms and MOQ** to size working capital.
9. A **customer requirement** (none exists) to define what "expensive" means.

Until then, the model is a structured list of what is known, what is assumed and what is missing.

## 13. Prohibited interpretations

- This is **not** a complete cost, a landed cost, a manufacturing cost, a product cost or a price.
- The EUR figures are **not ex-VAT** in the established sense: the VAT status of nearly every input is
  unknown.
- The LOW/BASE/HIGH cases are **not** a confidence interval and **not** a quotation range.
- Nothing here supports a **profitability, margin or break-even** statement. No MAREA price is approved
  (`PRICE_APPROVED = NONE`) and commercial availability remains `NOT_FOR_SALE`.
- The scenario volumes are **engineering scenarios, not demand forecasts**; no customer evidence exists.
