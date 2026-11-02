# MC-12 D06 — Hardware cost reconciliation (MC-11 records → MC-12 inputs)

| Field | Value |
|---|---|
| Deliverable | D06 `MC12-HARDWARE-COST-RECONCILIATION.md` — MC-12 recurring, data-licensing and per-SKU contribution economics (machine companion: `data/hardware-cost-reconciliation.json`) |
| Owner / date | `hardware-manufacturing-cost-analyst`, 2026-11-02 |
| Status | `INTERNAL_ECONOMICS_ANALYSIS` — deterministic reconciliation of existing MC-11 records; no new pricing |
| Invariant | `INV-TOOLING-01` **PASS** — 90/90 scenarios, max abs delta 0.00 EUR, 0 tooling-field mismatches |
| Commercial availability | `NOT_FOR_SALE`; `PRICE_APPROVED = NONE`; `CUSTOMER_EVIDENCE = NONE` |

## 1. Method

This deliverable adds no price, no quotation and no estimate. It reads the MC-11 hardware
sources (cost scenarios; engineering and manufacturing BOMs; price observations; supplier
register; conformity applicability; risks; the MC-11 data contract, handoff and cost model),
recomputes every per-scenario subtotal from the labelled lines, and expresses the MC-11 amounts
in the MC-12 view: known subtotal, COST-16, variable cost ex-COST-16, installation service
(COST-12), variable cost ex both, and unknown categories. All 90 scenarios were recomputed with a
temporary Node script (deleted, never committed); the MC-11 files were read only.

Definitions (EUR, 2 decimals, half-up, tolerance ±0.005):

- `knownSubtotalEur` — MC-11's sum of the numerically known scenario lines. **It already contains
  the COST-16 line.** It is not a unit cost and not a total (COST-17 is UNKNOWN).
- `variableCostExcludingToolingEur` = `knownSubtotalEur` − COST-16 line.
- `installationCostEur` = the COST-12 line of the **same scenario and case** (HUB at 1 unit: 28.80
  LOW / 36.00 BASE / 50.40 HIGH — pairing a BASE subtotal with a LOW installation amount is a
  case-mixing error).
- `variableCostExcludingToolingAndInstallationEur` = `knownSubtotalEur` − COST-16 − COST-12.
- `unknownCategories` — every line with `status: "UNKNOWN"`; for PILOT all 17. Scenario
  `confidence` is `LOW` for the 75 scenarios with known amounts and `NONE` for the 15 PILOT ones.

## 2. Tooling invariant proof — `INV-TOOLING-01`

Statement: *`knownSubtotalEur` includes the COST-16 tooling/NRE amortisation; `toolingAmortizationEur` repeats it and must not be added again.*

| Family | Scenarios | Sum of lines (EUR) | Sum knownSubtotalEur (EUR) | Max abs delta (EUR) | toolingAmortizationEur = COST-16 line |
|---|---:|---:|---:|---:|---|
| HUB | 15 | 49308.04 | 49308.04 | 0.00 | 15/15 |
| WATCH | 15 | 33465.96 | 33465.96 | 0.00 | 15/15 |
| SENSE | 15 | 15057.77 | 15057.77 | 0.00 | 15/15 |
| DISPLAY | 15 | 39135.15 | 39135.15 | 0.00 | 15/15 |
| AIS | 15 | 23942.88 | 23942.88 | 0.00 | 15/15 |
| PILOT | 15 | 0.00 | 0.00 | 0.00 | 15/15 |
| **All** | **90** | — | — | **0.00** | **90/90** (0 mismatches) |

Worked check, HUB 100-unit BASE: 7.75 + 117.00 + 16.20 + 19.80 + 37.80 + 16.20 + 1.08 + 4.05 +
2.25 + 19.13 + 16.58 + 36.00 + 13.33 + 2.22 + 7.74 + **120.00 = 437.13**. COST-16 line = 120.00 =
`toolingAmortizationEur`; adding the field again gives 557.13, absent from every record. Variable =
437.13 − 120.00 = **317.13**; ex-installation = 317.13 − 36.00 = **281.13**. Raw max abs delta
before rounding is 2.27e-13 EUR (IEEE-754 addition order only), reported as 0.00.
**Result: `INV-TOOLING-01` PASS — 90/90 scenarios, 0 mismatches.**

## 3. BASE reconciliation per family, volumes 1 / 10 / 100 / 500 / 1 000

EUR per unit at each volume. Cell = `knownSubtotalEur / variable cost ex-COST-16 and ex-COST-12`;
`null` = unknown. PILOT has no known cost at all.

| Family | 1 unit | 10 | 100 | 500 | 1 000 |
|---|---:|---:|---:|---:|---:|
| HUB | 12351.22 / 315.22 | 1541.20 / 305.20 | 437.13 / 281.13 | 322.50 / 262.50 | 300.05 / 252.05 |
| WATCH | 8268.51 / 214.51 | 1061.69 / 207.69 | 324.90 / 190.90 | 248.10 / 178.10 | 232.93 / 170.93 |
| SENSE | 3645.27 / 100.27 | 492.05 / 97.05 | 168.27 / 88.27 | 133.01 / 81.01 | 125.55 / 77.05 |
| DISPLAY | 9399.13 / 339.13 | 1288.42 / 328.42 | 453.32 / 303.32 | 362.77 / 284.77 | 343.11 / 274.11 |
| AIS | 5353.62 / 314.62 | 843.91 / 304.91 | 370.35 / 281.35 | 312.06 / 263.06 | 296.63 / 252.63 |
| PILOT | 0.00 / null | 0.00 / null | 0.00 / null | 0.00 / null | 0.00 / null |

COST-16 per unit (1/10/100/500/1 000): HUB 12 000 / 1 200 / 120 / 24 / 12; WATCH 8 000 / 800 / 80 /
16 / 8; SENSE 3 500 / 350 / 35 / 7 / 3.50; DISPLAY 9 000 / 900 / 90 / 18 / 9; AIS 5 000 / 500 / 50 /
10 / 5; PILOT unknown. COST-12 is flat per unit: HUB 36.00, WATCH 54.00, SENSE 45.00, DISPLAY 60.00,
AIS 39.00. COST-16 is 93.4–97.2 % of the known subtotal at 1–10 units, 13.5–27.5 % at 100, 1.7–4.0 %
at 1 000. PILOT's `0.00` is a recorded placeholder (no category KNOWN); its derived fields are `null`.

## 4. What these numbers are NOT

- Not unit costs: all 90 scenarios are `INCOMPLETE` because COST-17 (certification/EMC/RED) is
  UNKNOWN, so true cost is higher by an unquantified amount.
- Not quotations: 0 supplier quotations exist, 19/19 suppliers are `NOT_CONTACTED`, the RFQ is
  `NOT_SENT`; every non-COST-01 line is a labelled `ENGINEERING_ASSUMPTION` (ASM-004…ASM-013).
- Not ex-VAT in the established sense (37 of 42 price observations are `VAT_UNKNOWN`), not a
  LOW/BASE/HIGH confidence interval, not a demand forecast, and not a price, margin, contribution
  or profitability figure; no MAREA price is approved.

## 5. Unknown material categories

- `UNK-HW-01` **Certification/EMC/RED cost** (MATERIAL; all families) — Obtain a test-house quotation under a separate authorization.
- `UNK-HW-02` **Tooling and NRE quotation (enclosure tooling, stencils, fixtures, programming jig) — only the ASM-008 envelope exists** (MATERIAL; all families) — Request tooling/NRE quotations under a separate authorization; until then COST-16 is a labelled amortisation sensitivity, not a price.
- `UNK-HW-03` **Assembly/test labour rate and time study (ASM-005 and ASM-013 are assumptions; no EMS rate card or measured hours)** (MATERIAL; HUB, WATCH, SENSE, DISPLAY, AIS) — Obtain an EMS rate card and a measured time study under a separate authorization.
- `UNK-HW-04` **Inbound freight, customs and landed cost (ASM-009 only; no Incoterms, tariff or customs ruling, import VAT UNKNOWN)** (MATERIAL; HUB, WATCH, SENSE, DISPLAY, AIS) — Obtain freight/Incoterms and customs treatment under a separate authorization.
- `UNK-HW-05` **Warranty and RMA reserve (ASM-007 only; no failure-rate or RMA history)** (MATERIAL; HUB, WATCH, SENSE, DISPLAY, AIS) — Collect reliability/failure evidence from a first-article run before treating any warranty allowance as a reserve.
- `UNK-HW-06` **Observed EUR/USD rate (ASM-001 engineering assumption; the single ECB reference-rate retrieval failed with HTTP 404)** (MATERIAL; HUB, WATCH, SENSE, DISPLAY, AIS) — Retrieve an observed ECB reference rate with URL and retrieval date in a later authorized session.
- `UNK-HW-07` **VAT status of inputs (37 of 42 observations VAT_UNKNOWN; no purchase, import or reverse-charge position exists)** (MATERIAL; HUB, WATCH, SENSE, DISPLAY, AIS) — Obtain written tax advice and supplier VAT treatment; no ex-VAT cost can be established from the current record.
- `UNK-HW-08` **PILOT cost does not exist (0.00 known subtotal; 12/12 EBOM and 12/12 MBOM lines unpriced; all 17 categories UNKNOWN)** (MATERIAL; PILOT) — No PILOT price or cost may be cited; PILOT remains a blocked quotation package pending the safety gate.
- `UNK-HW-09` **Supplier quotations, MOQ and lead time (19 of 19 suppliers NOT_CONTACTED, RFQ NOT_SENT, 0 quotations)** (MATERIAL; all families) — No quotation may be cited; a procurement authorization is required before any supplier contact.
- `UNK-HW-10` **Volume price breaks beyond published manufacturer tiers (ASM-004 volume factor and ASM-013 learning factor are assumptions, not observed discounts)** (MATERIAL; HUB, WATCH, SENSE, DISPLAY, AIS) — Obtain supplier volume break schedules under a separate authorization.

## 6. MC-11 coverage limits inherited by MC-12

- Observed public-price coverage of the modelled subtotal at 100 units BASE: HUB 1.8 %, WATCH
  2.0 %, SENSE 4.7 %, DISPLAY 0.8 %, AIS 2.1 % — range **0.8–4.7 %**; everything else is an
  assumption.
- EBOM priced lines: HUB-STANDARD 4/18, HUB-PRO 6/22, WATCH-CORE 3/18, SENSE-POWER 4/12,
  SENSE-BILGE 3/12, SENSE-WIND 4/12, SENSE-ENV 2/12, SENSE-TANKS 2/11, DISPLAY-7 2/13,
  AIS-RECEIVER 4/13, PILOT-COASTAL 0/12. MBOM known subtotals (all INCOMPLETE, 12–13 unpriced
  process lines each): HUB 42.00, WATCH 36.00, SENSE 25.50 per module, DISPLAY 33.00, AIS 27.00,
  PILOT 0.00.
- FX is an assumption (ASM-001; the single ECB reference-rate retrieval failed with HTTP 404) and
  input VAT is unknown, so no established ex-VAT cost exists in the record.
- Conformity: all 127 applicable rows carry `costConfidence: UNKNOWN`; `certificationCosts[]` has
  0 numeric amounts across 9 items; `engineeringCosts[]` is 7/7 and `recurringOperatingCosts[]`
  8/8 UNKNOWN.
- The families cost one edition each (HUB-STANDARD, SENSE-POWER); HUB-PRO and the four other SENSE
  modules have BOMs but no scenario. Canonical editions without an MC-11 BOM (WATCH-PLUS,
  AIS-CONNECTED, DISPLAY-LARGE-CONDITIONAL, PILOT-SAIL/PRO, three SENSE editions) are excluded.

## 7. CONDITIONAL — variable cost against the ex-VAT price hypothesis (100 units BASE)

The comparison is arithmetic on two inputs: the reconciled variable cost (excluding COST-16,
COST-12 and the unknown certification) and the unapproved VAT-inclusive retail hypotheses in
`docs/marea/products/product-definitions.batch-*.json`. Ex-VAT conversion uses the MC-12
governance convention in `MC-12-BASELINE-AND-GOVERNANCE.md` §7 (Spain 21 % → net = gross / 1.21);
it is a disclosed illustration rate, not tax advice; the applicable rate remains `OPEN`.

| Family | Costed edition | Gross hypothesis (VAT-incl., unapproved) | Net at 21 % | Variable cost, 100 units BASE (ex-16, ex-12) | Difference | Position |
|---|---|---:|---:|---:|---:|---|
| HUB | HUB-STANDARD | 349.00 | 288.43 | 281.13 | -7.30 | below hypothesis |
| WATCH | WATCH-CORE | 299.00 | 247.11 | 190.90 | -56.21 | below hypothesis |
| SENSE | SENSE-POWER | 99.00 | 81.82 | 88.27 | +6.45 | **ABOVE hypothesis** |
| DISPLAY | DISPLAY-7 | 699.00 | 577.69 | 303.32 | -274.37 | below hypothesis |
| AIS | AIS-RECEIVER | 249.00 | 205.79 | 281.35 | +75.56 | **ABOVE hypothesis** |
| PILOT | PILOT-COASTAL | 1290.00 | 1066.12 | null | null | not comparable — no PILOT cost exists |

At 100 units BASE the known variable cost is above the ex-VAT hypothesis for **AIS (+75.56)** and **SENSE (+6.45)**, and below it for HUB (-7.30), WATCH (-56.21) and DISPLAY (-274.37). EUR per unit at all BASE volumes, difference in brackets:
- SENSE (ex-VAT hypothesis 81.82): 1: 100.27 (+18.45); 10: 97.05 (+15.23); 100: 88.27 (+6.45); 500: 81.01 (-0.81); 1000: 77.05 (-4.77).
- AIS (ex-VAT hypothesis 205.79): 1: 314.62 (+108.83); 10: 304.91 (+99.12); 100: 281.35 (+75.56); 500: 263.06 (+57.27); 1000: 252.63 (+46.84).
- HUB (ex-VAT hypothesis 288.43): 1: 315.22 (+26.79); 10: 305.20 (+16.77); 100: 281.13 (-7.30); 500: 262.50 (-25.93); 1000: 252.05 (-36.38).
PILOT is not comparable because no PILOT cost amount exists. The AIS gap is structural in the record: its entirely assumption-based unpriced-module allowance (COST-02, 144.00 EUR at 100 units BASE) alone is 70.0 % of the whole ex-VAT hypothesis (205.79).

**CONDITIONAL**: the hypotheses are `HYPOTHESIS_UNAPPROVED`, the VAT rate is a disclosed
illustration, the cost side is assumption-based, and certification and installation are excluded.
It is **not** a margin, contribution or profitability statement.

## 8. Reconciliation conclusions MC-12 may cite

- **RC-01** — INV-TOOLING-01 PASS for all 90 scenarios: the sum of the numeric scenario lines equals knownSubtotalEur with a maximum absolute delta of 0.00 EUR, and toolingAmortizationEur equals the COST-16 line amount in all 90 cases (0 mismatches). The COST-16 amount is already inside knownSubtotalEur and is never added again.
- **RC-02** — All 90 scenarios have totalStatus INCOMPLETE because COST-17 (conformity/certification) is UNKNOWN in every scenario. No knownSubtotalEur is a unit cost, a total cost, a landed cost or a price.
- **RC-03** — At 100 units BASE the variable cost excluding the COST-16 tooling/NRE amortisation line and the COST-12 installation service line (EUR per unit) is: HUB 281.13, WATCH 190.90, SENSE 88.27, DISPLAY 303.32, AIS 281.35, PILOT 0.00 known (no cost exists).
- **RC-04** — The COST-16 line is 27.5% of the HUB 100-unit known subtotal, 24.6% for WATCH, 20.8% for SENSE, 19.9% for DISPLAY and 13.5% for AIS: it is a one-off cost divided by volume, not a property of the product.
- **RC-05** — Observed public-price coverage (COST-01 share of the 100-unit BASE known subtotal) is HUB 1.8%, WATCH 2.0%, SENSE 4.7%, DISPLAY 0.8%, AIS 2.1%; every other material category is an ENGINEERING_ASSUMPTION. Coverage therefore spans 0.8-4.7% of the modelled subtotal.
- **RC-06** — CONDITIONAL (not a margin or profitability statement): under the MC-12 governance VAT convention (Spain 21% illustration, net = gross / 1.21, disclosed per revenue line) and the unapproved VAT-inclusive retail hypotheses, at 100 units BASE the known variable cost excluding COST-16 and COST-12 exceeds the ex-VAT price hypothesis for AIS (281.35 vs 205.79) and SENSE (88.27 vs 81.82); it is below the hypothesis for HUB (281.13 vs 288.43), WATCH (190.90 vs 247.11) and DISPLAY (303.32 vs 577.69).
- **RC-07** — CONDITIONAL, same assumptions: AIS is above its ex-VAT price hypothesis at every modelled BASE volume (1/10/100/500/1000); SENSE is above it at 1, 10 and 100 units and falls below it at 500 and 1000 units. PILOT cannot be compared because no PILOT cost amount exists.
- **RC-08** — COST-12 installation is a separate service line of HUB 36.00, WATCH 54.00, SENSE 45.00, DISPLAY 60.00 and AIS 39.00 EUR per unit at 100 units BASE; it is excluded from the variable-cost comparison above, is included only when the configuration includes installation, and no installer rate or channel price exists.
- **RC-09** — No amount in this reconciliation is a quotation: 42 public price observations exist (37 manufacturer list prices of which 36 USD, 5 distributor retail prices; 37 VAT_UNKNOWN, 5 VAT_EXCLUDED), 0 supplier quotations, and 19 of 19 suppliers are NOT_CONTACTED with the RFQ NOT_SENT.
- **RC-10** — The certification cost is UNKNOWN with no numeric amount: certificationCosts[] has 0 numeric amounts across 9 items, all 127 applicable conformity rows carry costConfidence UNKNOWN, engineeringCosts[] is 7 of 7 UNKNOWN and recurringOperatingCosts[] is 8 of 8 UNKNOWN.
- **RC-11** — PILOT has no cost: 0.00 EUR recorded known subtotal at every volume and case, 12 of 12 EBOM lines and 12 of 12 MBOM lines unpriced, and all 17 scenario categories UNKNOWN, so its derived variable-cost fields are null and not 0. The from-EUR-1,290 PILOT hypothesis is a starting price, not a cost and not an available price.

## 9. Checks performed

Recompute 90/90 with max abs delta 0.00; tooling 90/90 with 0 mismatches, never re-added; all 90 `INCOMPLETE` with COST-17 UNKNOWN; PILOT 15/15 at 0.00 known with 12/12 EBOM and 12/12 MBOM unpriced.
MC-11 files read only; temporary script removed; only the two MC-12 deliverable files written.
