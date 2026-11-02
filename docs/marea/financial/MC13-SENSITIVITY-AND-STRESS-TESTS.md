# MC-13 D13 — Sensitivity and stress tests

| Field | Value |
|---|---|
| Deliverable | D13 `MC13-SENSITIVITY-AND-STRESS-TESTS.md` |
| Status | `INTERNAL_FINANCIAL_ANALYSIS` — `PENDING_INDEPENDENT_REVIEW` |
| Milestone / date | MC-13/36, 2026-11-02 |
| Owner | financial-architecture (Principal Financial Architect) |
| Authority | [MC13-FINANCIAL-DATA-CONTRACT.md](MC13-FINANCIAL-DATA-CONTRACT.md) (D02); [MC13-GENERATED-FIGURES.md](MC13-GENERATED-FIGURES.md) |
| Machine companions | [stress-tests.json](data/stress-tests.json), [scenario-results.json](data/scenario-results.json), [monthly-financial-model.json](data/monthly-financial-model.json) |
| Boundary | Deterministic sensitivity/stress analysis. No probabilities, no verified viability, no financing approval, no MC-14 start. |

**Figure status.** Every figure is `CONDITIONAL_HYPOTHETICAL`; `viabilityCollapsed` and
`cashRecoveryWithinHorizon` are analytical flags, not predictions or commercial conclusions.

## 1. Purpose and boundary

D13 catalogues the 24 declared stress cases of `data/stress-tests.json`. Each case re-runs the single
60-period model on `BASE_HYPOTHETICAL` with explicit, typed overrides. The catalogue reports the
recorded M60 results, the funding gap and the operating break-even month, isolates the compound
adverse case, and demonstrates the case where unit contribution stays positive while company cash
never recovers. It assigns no probability to any case and makes no verified-viability claim.

## 2. Method and metric definitions

- Base case: `BASE_HYPOTHETICAL` (M60 net revenue 3 426 647.12; contribution 1 688 226.86;
  EBITDA-like -618 061.78; cumulative cash -415 478.92; financing requirement 987 326.73).
- Overrides are declared per case and applied deterministically to cost, price, demand, cohort,
  timing, channel or inventory parameters. No random sampling, no Monte Carlo, no probability weights.
  All declared overrides are effective in this snapshot (the cloud and cellular overrides now change
  the recorded results).
- `fundingGapEur = max(0, financingRequirementEur − fundingEnvelopeEur)`, where the funding envelope is
  the illustrative 2 000 000.00 `SCENARIO_ASSUMPTION` (ASM-MC13-046) unless overridden (ST-20). It is
  not a financing commitment.
- `viabilityCollapsed`: cumulative cash at M60 is negative. `cashRecoveryWithinHorizon`: cumulative
  cash returns to non-negative after a negative balance. `unitContributionStillPositive`: final-month
  known-variable contribution is positive.
- All cases exclude the unknown licensing, insurance, CRA and FLEET onboarding costs; the true
  financing requirement is therefore higher than any figure below.

## 3. Catalogue of the 24 stress cases (M60, EUR unless stated)

| ID | Stress | Overrides | M60 net revenue | Contribution | Cumulative cash | Financing requirement | Funding gap | Op. BE month | Unit contribution positive |
|---|---|---|---|---|---|---|---|---|---|
| ST-01 | Hardware cost +20 % | `hardwareCostMultiplier 1.2` | 3 426 647.12 | 1 383 066.60 | -659 880.21 | 1 075 328.34 | 0.00 | M46 | true |
| ST-02 | Hardware cost +40 % | `hardwareCostMultiplier 1.4` | 3 426 647.12 | 1 077 907.65 | -904 281.56 | 1 189 603.42 | 0.00 | M54 | true |
| ST-03 | Distributor margin 45 % | `distributorMarginPct 45` | 3 380 599.28 | 1 643 040.67 | -462 583.76 | 1 003 193.71 | 0.00 | M40 | true |
| ST-04 | Material cost inflation +10 % | `materialInflationMultiplier 1.1` | 3 426 647.12 | 1 535 649.64 | -537 677.72 | 1 031 326.66 | 0.00 | M42 | true |
| ST-05 | FX movement +10 % cost | `fxCostMultiplier 1.1` | 3 426 647.12 | 1 535 649.64 | -537 677.72 | 1 031 326.66 | 0.00 | M42 | true |
| ST-06 | Manufacturing yield 92 % | `manufacturingYieldPct 0.92` | 3 426 647.12 | 1 555 526.80 | -521 757.95 | 1 025 594.53 | 0.00 | M42 | true |
| ST-07 | Warranty and returns 6 % | `warrantyReturnsPct 0.06` | 3 375 092.17 | 1 636 671.91 | -404 870.91 | 983 928.23 | 0.00 | M40 | true |
| ST-08 | Subscription churn +50 % | `monthlyChurnRate 0.0225` | 3 370 885.12 | 1 635 523.81 | -468 181.97 | 991 031.67 | 0.00 | M40 | true |
| ST-09 | Activation -30 % | `activationRate 0.595` | 3 065 845.48 | 1 363 054.14 | -818 262.79 | 1 061 993.42 | 0.00 | M52 | true |
| ST-10 | Distributor payments +60 days | `distributorDays 120` | 3 426 647.12 | 1 688 226.86 | -443 529.76 | 1 015 377.57 | 0.00 | M39 | true |
| ST-11 | Cloud usage 2× | `cloudMultiplier 2` | 3 426 647.12 | 1 658 157.73 | -445 548.05 | 990 832.94 | 0.00 | M40 | true |
| ST-12 | Cellular overage EUR 0.375/device-month | `cellularCostEurPerDeviceMonth 0.375` | 3 426 647.12 | 1 676 349.41 | -427 356.37 | 988 736.18 | 0.00 | M39 | true |
| ST-13 | Data licence EUR 30/account-year | `dataLicenceCostEurPerAccountYear 30` | 3 426 647.12 | 1 394 859.36 | -708 846.42 | 1 016 221.73 | 0.00 | M48 | true |
| ST-14 | Certification delay 6 months | `certificationDelayMonths 6` | 3 198 295.24 | 1 658 498.26 | -489 527.83 | 1 061 513.48 | 0.00 | M39 | true |
| ST-15 | Certification delay 12 months | `certificationDelayMonths 12` | 2 972 104.42 | 1 629 926.51 | -559 217.72 | 1 124 809.85 | 0.00 | M40 | true |
| ST-16 | No licensing clearance | `noLicensingClearance true` | 2 345 695.95 | 715 396.54 | -1 621 575.35 | 1 621 575.35 | 0.00 | none | true |
| ST-17 | No customer acquisition | `noCustomerAcquisition true` | 0.00 | 0.00 | -2 708 788.64 | 2 708 788.64 | 708 788.64 | none | false |
| ST-18 | Unexpected cybersecurity maintenance EUR 60 000/year | `cybersecurityMaintenanceEurPerYear 60000` | 3 426 647.12 | 1 388 226.86 | -715 478.92 | 1 122 326.73 | 0.00 | M44 | true |
| ST-19 | Inventory overstock ×2 and 30 % write-down | `inventoryOverstockMultiplier 2, obsolescencePctPerYear 30` | 3 426 647.12 | 1 611 835.64 | -466 121.52 | 1 013 587.28 | 0.00 | M41 | true |
| ST-20 | Funding availability -50 % | `fundingEnvelopeMultiplier 0.5` | 3 426 647.12 | 1 688 226.86 | -415 478.92 | 987 326.73 | 0.00 | M39 | true |
| ST-21 | Selling prices -15 % | `sellingPriceMultiplier 0.85` | 2 912 648.91 | 1 183 079.93 | -965 818.36 | 1 156 472.95 | 0.00 | M56 | true |
| ST-22 | Installer cost overrun +25 % | `installerMarginPct 18.75` | 3 423 192.63 | 1 684 836.97 | -419 012.31 | 988 516.89 | 0.00 | M39 | true |
| ST-23 | Compound adverse case | 7 overrides, see §5 | 2 506 003.90 | 819 017.40 | -1 258 225.84 | 1 344 974.00 | 0.00 | none | true |
| ST-24 | Positive unit contribution but company-level viability collapse | 4 overrides, see §6 | 1 025 521.18 | 508 512.77 | -2 021 059.52 | 2 021 059.52 | 21 059.52 | none | true |

### 3.1 Case rationale

| ID | Rationale |
|---|---|
| ST-01 | Cost inflation stress on known variable hardware costs. |
| ST-02 | Severe cost inflation stress. |
| ST-03 | Channel margin pressure above the BASE 35 %. |
| ST-04 | Annual material inflation averaged over the horizon. |
| ST-05 | Imported component cost increases; no hedge exists. |
| ST-06 | Yield loss raises effective cost per good unit. |
| ST-07 | Double the BASE refund/withdrawal allowance. |
| ST-08 | Churn deterioration from the BASE 1.5 %/month. |
| ST-09 | Lower activation of new accounts. |
| ST-10 | Delayed customer collections. |
| ST-11 | Cloud usage doubles. |
| ST-12 | Cellular plan overage. |
| ST-13 | Hypothetical licence cost threshold; the real cost is unknown. |
| ST-14 | Conformity/certification programme slips by six months. |
| ST-15 | Conformity/certification programme slips by twelve months. |
| ST-16 | Chart and weather rights never granted within the horizon. |
| ST-17 | Zero demand; no invented customers. |
| ST-18 | CRA/security lifecycle cost materialises. |
| ST-19 | Stranded inventory and write-down. |
| ST-20 | Reduced funding availability against the illustrative envelope. |
| ST-21 | Lower realised prices. |
| ST-22 | Installer margin rises from 15 % to 18.75 %. |
| ST-23 | Compound adverse case combining cost, price, churn, delay and channel pressure. |
| ST-24 | Demonstrates that positive unit contribution does not cover fixed operating costs and the company never recovers its cash. |

## 4. Single-variable stresses

- Known-variable cost increases (ST-01/02/04/05/06) reduce contribution from 1 688 226.86 to
  1 077 907.65–1 555 526.80 and raise the financing requirement to 1 025 594.53–1 189 603.42, with
  operating break-even between M42 and M54.
- Channel and price pressure: selling prices -15 % (ST-21) is the severest single-variable revenue case
  (contribution 1 183 079.93; operating break-even M56; cash-flow break-even M38), while distributor
  margin 45 % (ST-03) and installer overrun (ST-22) cost less (1 643 040.67 / 1 684 836.97; M40/M39).
- Demand/cohort stress (ST-08/09): activation -30 % pushes operating break-even to M52 and the
  financing requirement to 1 061 993.42; +50 % churn delays it to M40.
- Timing stress (ST-10/14/15): payment-term extension adds a small working-capital cost; certification
  delays of 6/12 months move operating break-even to M39/M40 and cash-flow break-even to M27.
- Cloud/connectivity (ST-11/12) are now effective: cloud 2× leaves contribution at 1 658 157.73 and the
  financing requirement at 990 832.94; cellular overage leaves 1 676 349.41 and 988 736.18 (base
  1 688 226.86 / 987 326.73).
- Licensing and security (ST-13/16/18): no licensing clearance (ST-16) is the severest single-domain
  case (contribution 715 396.54; financing requirement 1 621 575.35; no break-even month), followed by
  data licence at EUR 30/account-year (ST-13, operating M48) and unexpected CRA maintenance (ST-18, M44).
- Inventory stress (ST-19) still leaves positive contribution (1 611 835.64) and brings cash-flow
  break-even forward to M17, the earliest of all cases, while financing rises to 1 013 587.28.
- Funding availability -50 % (ST-20) does not change the cash path; the lower 1 000 000 envelope still
  covers the 987 326.73 requirement, so the recorded gap is 0.00.

## 5. Compound adverse case (ST-23)

ST-23 combines hardware cost +30 %, warranty/returns 8 %, monthly churn 3 %, selling prices -10 %,
certification delay 12 months, cloud usage 1.5× and distributor margin 40 %. Recorded result: M60 net
revenue 2 506 003.90, contribution 819 017.40, EBITDA-like -1 487 271.24, cumulative cash
-1 258 225.84, financing requirement 1 344 974.00, funding gap 0.00, cash-flow break-even M35 and no
operating break-even within M60; `viabilityCollapsed = true`. It is the fourth-largest financing
requirement of the 24 cases (after ST-17 2 708 788.64, ST-24 2 021 059.52 and ST-16 1 621 575.35) and
remains below the 2 000 000 illustrative envelope, conditional on the same excluded unknowns.

## 6. Positive unit contribution with no company cash recovery (ST-24)

ST-24 is the declared demonstration case: demand multiplier 0.35, hardware cost +10 %, selling prices
-5 %, certification delay 12 months. Recorded result: M60 net revenue 1 025 521.18, cumulative
contribution 508 512.77 (final-month known-variable contribution 18 577.96 > 0), but EBITDA-like is
-1 797 775.87 and cumulative cash never returns to zero: cumulative cash -2 021 059.52, financing
requirement 2 021 059.52, funding gap 21 059.52, operating/cash-flow/recovery months `null`,
`viabilityCollapsed = true`, `unitContributionStillPositive = true`, `insolventWithoutFunding = true`.
The case proves that a positive product-level contribution does not pay for the fixed operating
envelope, capex and working capital; it is a conditional result, not a prediction.

## 7. No-licensing and no-customer cases

- ST-16 (no licensing clearance): chart/weather rights never granted; M60 net revenue 2 345 695.95,
  contribution 715 396.54, cumulative cash -1 621 575.35, financing requirement 1 621 575.35, no
  funding gap against the illustrative envelope, no break-even month. Estimated licensing cost is
  excluded from the base model, so the real effect is likely worse than this stress.
- ST-17 (no customer acquisition): zero demand, M60 net revenue 0.00, contribution 0.00, cumulative cash
  -2 708 788.64, financing requirement 2 708 788.64, funding gap 708 788.64, no break-even month and
  no positive unit contribution. No customers are invented to make the model viable.

## 8. What all cases share

Summary of `stress-tests.json#summary`: 24 cases; 24 miss cash recovery within M60; 23 keep a positive
unit contribution yet collapse at company level (only ST-17 turns it negative); 2 have a funding gap
above the 2 000 000.00 envelope (ST-17 708 788.64; ST-24 21 059.52); every case is
`CONDITIONAL_HYPOTHETICAL` with `viabilityCollapsed = true`. Base reference: cumulative cash
-415 478.92, financing requirement 987 326.73, no cash recovery. No case reaches a verified
break-even, profitability, financing approval or a verified-viability state.

## 9. Sensitivity envelope carried from the MC-12 handoff

The envelope below is the MC-12 analytical range inherited by MC-13; it is **not** a probability
distribution and was not applied as a forecast.

| Parameter | LOW | BASE | HIGH | Basis |
|---|---|---|---|---|
| Variable cost | 80 % | 100 % | 140 % | MC-11 LOW/HIGH cases plus stress envelope |
| Connectivity EUR/device-month | 0.05 | 0.10–0.375 | 0.80 | plan choice and overage |
| Cloud multiplier | 0.5× | 1.0× | 2.0× | usage profile and fixed floor |
| Data-licence EUR/account-year | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` | no right, no price |
| Renewal rate | `UNKNOWN` | 70 % illustrative | `UNKNOWN` | no churn data |

The 70 % renewal rate appears only as an illustrative sensitivity in the MC-12 handoff and is not
evidence. The data licence has no defensible range at all; it remains `UNKNOWN` in every envelope.

## 10. What is not claimed

- No probability, likelihood or expected value is assigned to any stress case; no case is "most
  likely".
- No case is a verified viability result, a verified break-even, a profitability statement or an
  investment return.
- The stress set does not include all combinations; ST-23 and ST-24 are declared compound cases, not an
  exhaustive cross-product.
- Unknown licensing, insurance, CRA, FLEET onboarding, factory and certification costs are excluded from
  every case, so every financing requirement is a floor.
- Governance flags remain unchanged: `NOT_FOR_SALE`, price approved `NONE`, customer evidence `NONE`,
  licensing rights not granted, PILOT safety `BLOCKED`, MC-14 not started.

## 11. Reproducibility and references

```
node scripts/build-marea-financial-model.mjs
node scripts/check-marea-financial-model.mjs
```

The 24 cases are re-run by the deterministic engine from `BASE_HYPOTHETICAL` plus the declared overrides
and recomputed by validator check `A-21`/`A-22`; the register in
[MC13-GENERATED-FIGURES.md](MC13-GENERATED-FIGURES.md) §3 reproduces the table above. All figures above
are from `stress-tests.json`.

- [stress-tests.json](data/stress-tests.json), [scenario-results.json](data/scenario-results.json), [monthly-financial-model.json](data/monthly-financial-model.json), [scenario-definitions.json](data/scenario-definitions.json), [assumptions.json](data/assumptions.json).
- [MC13-FINANCIAL-DATA-CONTRACT.md](MC13-FINANCIAL-DATA-CONTRACT.md); [MC13-SCENARIOS-12-36-60.md](MC13-SCENARIOS-12-36-60.md) — D11; [MC13-CONDITIONAL-BREAK-EVEN-ANALYSIS.md](MC13-CONDITIONAL-BREAK-EVEN-ANALYSIS.md) — D12; [MC13-60-MONTH-INTEGRATED-FINANCIAL-MODEL.md](MC13-60-MONTH-INTEGRATED-FINANCIAL-MODEL.md) — D04.
- [MC12-MC13-HANDOFF.md](../economics/MC12-MC13-HANDOFF.md) §9 (sensitivity envelope); [mc13-handoff-inputs.json](../economics/data/mc13-handoff-inputs.json).
