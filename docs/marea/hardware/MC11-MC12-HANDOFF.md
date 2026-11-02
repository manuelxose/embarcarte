# MC-11 → MC-12 handoff (D31)

Status: `INTERNAL_ENGINEERING_FEASIBILITY`. Milestone MC-11 of 36 → MC-12 (recurring/data-licensing and
per-SKU contribution economics). Date: 2026-11-02.
Authority: `data/engineering-bom.json`, `data/manufacturing-bom.json`, `data/cost-scenarios.json`,
`data/price-observations.json`, `data/supplier-register.json`, `data/conformity-applicability.json`,
`data/risks.json`.

This handoff transfers **inputs and gaps**, not conclusions. MC-11 does not establish profitability,
does not approve a price and does not execute MC-12.

## 1. What MC-12 inherits that is usable

| Input class | State | Where |
|---|---|---|
| Component identity (MPN/manufacturer) | 41 real candidates, 0 datasheets retrieved | `component-register.json` |
| Public price observations | 42 observations: 37 manufacturer list prices (36 USD + 1 EUR) and 5 authorised-distributor retail prices (EUR); VAT basis 37 `VAT_UNKNOWN` + 5 `VAT_EXCLUDED` | `price-observations.json` |
| Engineering BOMs | 11 BOMs; 155 lines; observed-price coverage 0.8 %–4.7 % of modelled subtotal | `engineering-bom.json` |
| Manufacturing BOMs | 11 BOMs; 171 lines; labour/mechanical mostly assumption-based | `manufacturing-bom.json` |
| Cost model | 90 scenarios (6 families × 5 volumes × LOW/BASE/HIGH), every one `INCOMPLETE` | `cost-scenarios.json` |
| Assumption register | 13 labelled `ASM` entries (FX, volume factor, labour rate, yield, warranty, tooling, landed, installation, class-B allowance, learning) | `cost-scenarios.json` |
| Compliance cost state | Certification/EMC/radio costs `UNKNOWN` in every scenario (COST-17) | `cost-scenarios.json` |
| Risk register | 39 risks with proposed-only mitigations | `risks.json` |

## 2. Per-SKU cost confidence (ex-vAT intent, partial known subtotals, **not** unit costs)

Engineering BOM known subtotal and priced-line coverage:

| BOM (family/edition) | Known EUR subtotal | Priced lines | Unknown lines | Confidence |
|---|---|---|---|---|
| EBOM-HUB-STANDARD-01 | 9.04 | 4 / 18 | 14 | COST_UNVERIFIED |
| EBOM-HUB-PRO-01 | 13.87 | 6 / 22 | 16 | COST_UNVERIFIED |
| EBOM-WATCH-CORE-01 | 7.81 | 3 / 18 | 15 | COST_UNVERIFIED |
| EBOM-SENSE-POWER-01 | 9.38 | 4 / 12 | 8 | COST_UNVERIFIED |
| EBOM-SENSE-BILGE-01 | 5.77 | 3 / 12 | 9 | COST_UNVERIFIED |
| EBOM-SENSE-WIND-01 | 9.04 | 4 / 12 | 8 | COST_UNVERIFIED |
| EBOM-SENSE-ENV-01 | 4.21 | 2 / 12 | 10 | COST_UNVERIFIED |
| EBOM-SENSE-TANKS-01 | 4.21 | 2 / 11 | 9 | COST_UNVERIFIED |
| EBOM-DISPLAY-7-01 | 4.21 | 2 / 13 | 11 | COST_UNVERIFIED |
| EBOM-AIS-RECEIVER-01 | 9.04 | 4 / 13 | 9 | COST_UNVERIFIED |
| EBOM-PILOT-COASTAL-01 | 0.00 | 0 / 12 | 12 | COST_UNVERIFIED (research only) |

Manufacturing BOM known subtotal (labour/mechanical assumptions, EUR): HUB-STANDARD 42.00,
HUB-PRO 42.00, WATCH-CORE 36.00, SENSE (5 modules) 25.50 each, DISPLAY-7 33.00, AIS-RECEIVER 27.00,
PILOT-COASTAL 0.00 — every BOM `INCOMPLETE`, 12–13 unpriced process lines each.

Scenario BASE known subtotals (EUR). Each value is the sum of the LABELLED `KNOWN` category lines and
**includes the `COST-16` tooling/NRE amortisation line** (12 000 / 1 200 / 120 / 24 / 12 EUR for HUB at
1 / 10 / 100 / 500 / 1 000 units). The separate `toolingAmortizationEur` field repeats the same amount
and is *not* added again. The observed-price component line (`COST-01`) is a small share, most of the
subtotal is the labelled assumption-based class-B allowance, and every scenario remains `INCOMPLETE`
because certification (`COST-17`) is `UNKNOWN`:

| Family | 1 unit | 10 | 100 | 500 | 1 000 |
|---|---|---|---|---|---|
| HUB | 12 351.22 | 1 541.20 | 437.13 | 322.50 | 300.05 |
| WATCH | 8 268.51 | 1 061.69 | 324.90 | 248.10 | 232.93 |
| SENSE (per module) | 3 645.27 | 492.05 | 168.27 | 133.01 | 125.55 |
| DISPLAY | 9 399.13 | 1 288.42 | 453.32 | 362.77 | 343.11 |
| AIS (receive-only integration) | 5 353.62 | 843.91 | 370.35 | 312.06 | 296.63 |
| PILOT | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 |

These are **known-input subtotals, not unit costs**. At 100 units, tooling amortisation alone is
27.5 % of the HUB subtotal; certification is excluded in every scenario. Do not divide, annualise or
present them as prices.

## 3. Quotation gaps MC-12 must carry explicitly

1. Every component: no quotation, no MOQ, no lead time, no tier break, no Incoterms, no traceability
   document, no authorised-channel confirmation (37 of 42 observations are manufacturer list prices —
   36 USD and 1 EUR — with an unverified VAT basis; the other 5 are EUR retail distributor listings).
2. Tooling/NRE: no quote for enclosure tooling, stencils, fixtures, programming jig, optical bonding.
3. Certification: no laboratory quotation for EMC, radio, ingress, salt fog, vibration or notified-body
   involvement; certification is `UNKNOWN` in all 90 scenarios.
4. Assembly: labour rate, yield, test time and learning curve are `ASM` assumptions, not quotations.
5. Logistical: inbound freight, customs and landed-cost adjustment are assumption-based.
6. Warranty: no reliability data, so the warranty allowance (1.5 %/3 %/6 %) is an assumption, not a
   reserve derived from evidence.
7. FX: the ECB reference rate could not be retrieved; the base rate is an explicit engineering
   assumption with LOW/HIGH multipliers.
8. Channel: no distributor, installer or marina margin term exists.

## 4. Recurring-service and third-party cost dependencies (MC-12 scope)

| Dependency | State | Consequence for MC-12 |
|---|---|---|
| Cellular connectivity (WATCH) | No provider, no contract, no SIM/eSIM strategy, no data-cost model | Connectivity is a per-vessel recurring cost with **no observed price** |
| Cloud hosting / telemetry | No provider agreement, no data-residency decision, no controller designated | Hosting cost per device-month is `UNKNOWN` |
| Chart data (NAV) | `chartRightsGranted = false` | Revenue cannot assume chart entitlement until rights and price exist |
| Weather/forecast data (WEATHER) | `dataProviderRightsGranted = false` | No redistribution right and no provider price |
| NMEA membership/licence/certification | Not held; NMEA 0183 published schedule observed (USD 1,150 / 7,500 / 10,000 and USD 200 mnemonic) as `BUDGETARY_INDICATION`; NMEA 2000 fees `UNKNOWN` | One-off and recurring licensing cost must be carried as a gap |
| CRA support period | CRA reporting already in force 2026-09-11 if in scope; main obligations 2027-12-11 | Firmware maintenance is a **recurring engineering cost**, not a one-off |
| Product liability insurance | Not established | Premium is `UNKNOWN` and may be material |

## 5. Installation and channel inputs

- Field installation/commissioning is modelled at 1.2 h (HUB), 1.8 h (WATCH), 1.5 h (SENSE) and
  DISPLAY/AIS per `ASM-010`, at an assumed 30 EUR/h base rate. Not observed.
- Installer-assisted vs self-install classification exists commercially but is **unvalidated**; the
  installer channel, its margin and its service pricing are unknown.
- No distributor or retail margin is known; do not derive a channel price from a modelled cost.

## 6. Inputs for MC-13 (multi-period planning)

Development capital: hardware engineering effort (unestimated), PCB NRE, enclosure tooling (12 000 /
18 000 EUR envelopes used only for amortisation sensitivity — **not quotes**), certification campaign
(unknown), laboratory retest budget (unknown), firmware maintenance for the support period, SBOM/CVD
process, insurance, inventory and working capital for 1/10/100/500/1 000-unit scenarios.

## 7. What MC-12 must not assume

1. That a catalogue price is a cost: it is a single-unit public observation, usually VAT-undetermined.
2. That the known subtotal is the unit cost (0.8 %–4.7 % observed-price coverage).
3. That certification is a one-off or free: it is `UNKNOWN` and recurring through the support period.
4. That volume discounts exist: only published TI bands were observed; every other volume effect is a
   labelled assumption.
5. That a pre-certified radio module transfers conformity to the host product.
6. That recurring connectivity, cloud or data costs are negligible: none has an observed price.
7. That any customer demand or willingness to pay is validated: **customer evidence is NONE**.

## 8. Customer questions still unanswered (do not treat MC-10 as complete)

CQ-01 data-problem cost, CQ-02 willingness to install hardware, CQ-03 valued measurements, CQ-04
tolerable price band, CQ-05 subscription tolerance, CQ-06 required compatibility evidence, CQ-07
acceptable warranty/RMA position, CQ-08 retail terms, CQ-09 fleet need for monitoring hardware, CQ-10
required exclusions — all remain `BLOCKED` behind AUTH-MC10-001. MC-12 sensitivity analysis must
therefore be explicitly conditional on unvalidated demand.

## 9. Handoff status block

```
CUSTOMER_EVIDENCE_TRANSFERRED      = NONE
SUPPLIER_QUOTATIONS               = NONE
PRODUCTION_BOM_APPROVED           = 0
PRICE_APPROVED                    = 0
CERTIFICATION_COST                = UNKNOWN
RECURRING_COST_OBSERVED           = NONE
MC12_EXECUTED                     = NO
PROFITABILITY_ESTABLISHED         = NO
```
