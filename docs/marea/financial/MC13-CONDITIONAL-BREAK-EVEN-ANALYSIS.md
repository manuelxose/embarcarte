# MC-13 D12 — Conditional break-even analysis

| Field | Value |
|---|---|
| Deliverable | D12 `MC13-CONDITIONAL-BREAK-EVEN-ANALYSIS.md` |
| Status | `INTERNAL_FINANCIAL_ANALYSIS` — `PENDING_INDEPENDENT_REVIEW` |
| Milestone / date | MC-13/36, 2026-11-02 |
| Owner | financial-architecture (Principal Financial Architect) |
| Authority | [MC13-FINANCIAL-DATA-CONTRACT.md](MC13-FINANCIAL-DATA-CONTRACT.md) (D02); [MC13-GENERATED-FIGURES.md](MC13-GENERATED-FIGURES.md) |
| Machine companions | [break-even-thresholds.json](data/break-even-thresholds.json), [scenario-results.json](data/scenario-results.json), [monthly-financial-model.json](data/monthly-financial-model.json) |
| Boundary | Conditional thresholds only. No verified company break-even, no profitability claim, no investment-return claim, no financing approval, no MC-14 start. |

**Figure status.** Every threshold and month below is `CONDITIONAL_HYPOTHETICAL_THRESHOLD` or
`NOT_DETERMINABLE`, taken from `break-even-thresholds.json` and `scenario-results.json`. No value
is a verified company break-even, an approval, a forecast commitment or an investment return.

## 1. Purpose

D12 distinguishes the five break-even concepts used by MC-13, reports the conditional thresholds per
scenario, marks every threshold that cannot be determined because a material input is unknown, and
states exactly what the values do **not** mean. All values derive from the single 60-period model
documented in D04; none is a stand-alone calculation.

## 2. The five concepts are not interchangeable

| Concept | Question it answers | Unit | Numerator / derivation |
|---|---|---|---|
| `UNIT_CONTRIBUTION_ZERO` | Is one SKU, subscription or vessel above zero on known variable costs at the hypothesis? | EUR per unit / account-year / vessel-month | net unit revenue after channel deductions minus declared known variable unit cost; fixed costs excluded |
| `OPERATING_BREAK_EVEN` | In which model month does the conditional EBITDA-like line reach zero? | model month | first month with `ebitdaLikeConditional >= 0` |
| `CASH_FLOW_BREAK_EVEN` | In which model month does operating cash flow turn positive? | model month | first month with `operatingCashFlow > 0` |
| `CUMULATIVE_CASH_RECOVERY` | In which model month does cumulative cash return to zero after a negative balance? | model month | first month with `cumulativeCashBalance >= 0`, from the declared zero opening-cash convention |
| `FINANCING_REQUIREMENT` | What is the deepest cumulative cash drawdown? | EUR | running maximum of `max(0, -cumulativeCashBalance)` over the horizon |

They differ in scope, sign convention and what they exclude. `UNIT_CONTRIBUTION_ZERO` ignores fixed
costs, capex, VAT timing, working capital and every unknown cost. `OPERATING_BREAK_EVEN` still
excludes capex, working capital and cash timing. `CASH_FLOW_BREAK_EVEN` includes working-capital
movement but excludes capex and financing, and can occur **before** operating break-even when working
capital releases cash (BASE: M23 versus M39). `CUMULATIVE_CASH_RECOVERY` includes capex and working
capital but depends on the declared opening-cash convention. `FINANCING_REQUIREMENT` is a euro amount,
not a month, and is the conditional minimum external cash under the scenario. A product can show
positive unit contribution and still never reach any company-level threshold; the model proves exactly
that case (see §8).

## 3. Derivation, status and data

`data/break-even-thresholds.json` stores 70 records: 36 `UNIT_CONTRIBUTION_ZERO`, 6
`OPERATING_BREAK_EVEN`, 3 `CASH_FLOW_BREAK_EVEN`, 3 `CUMULATIVE_CASH_RECOVERY`, 4
`FINANCING_REQUIREMENT` and 18 supplemental `MINIMUM_GROSS_PRICE` unit price points. The file summary
confirms the same counts, including `minimumGrossPrice: 18`. Status counts: 56
`CONDITIONAL_HYPOTHETICAL_THRESHOLD`, 14 `NOT_DETERMINABLE`, 0 verified. A threshold that depends on
an unknown cost, licence or demand input is `NOT_DETERMINABLE` and lists the missing input; it is never
converted to zero.

## 4. Portfolio thresholds by scenario

Model-relative months; `UNKNOWN` means the threshold is not reached or cannot be determined.

| Type | `RESTRICTED_CURRENT` | `DOWNSIDE` | `BASE_HYPOTHETICAL` | `UPSIDE_HYPOTHETICAL` |
|---|---|---|---|---|
| `OPERATING_BREAK_EVEN` | `null` — `NOT_DETERMINABLE` (company expenses/cash unknown) | not reached within M60 | M39 | M15 |
| `CASH_FLOW_BREAK_EVEN` | no record — no authorised sale | not reached within M60 | M23 | M11 |
| `CUMULATIVE_CASH_RECOVERY` | no record — no authorised sale | not reached within M60 | not reached within M60 | M23 |
| `FINANCING_REQUIREMENT` | `UNKNOWN` — company cash/funding unknown | EUR 3 081 802.04 | EUR 995 185.23 | EUR 621 240.91 |

Supplementary operating thresholds: BE-BASE-FIXED-COST-UNITS = 1 138 units per month (average known
fixed monthly envelope divided by the simple average known hardware unit contribution; a conditional
illustration, not a demand forecast); BE-BASE-SUBSCRIBERS = `NOT_DETERMINABLE` (data licence, mix and
churn unvalidated). `RESTRICTED_CURRENT` is not a hypothetical projection: no product is authorised
for sale, so a company-level break-even cannot be produced from authorised revenue.

## 5. Month-level evidence

`BASE_HYPOTHETICAL`: EBITDA-like -695.66 at M38 and +340.47 at M39 (operating break-even); operating
cash flow -4 840.40 at M22 and +909.69 at M23 (cash-flow break-even, earlier than operating break-even
because working capital releases cash); cumulative cash reaches its deepest point -995 185.23 at M27 and
ends at -464 878.15 at M60, so **cumulative cash recovery does not occur within 60 periods**.

`UPSIDE_HYPOTHETICAL`: operating cash flow -16 050.34 at M10 and +6 939.55 at M11 (cash-flow
break-even); EBITDA-like -1 403.16 at M14 and +2 755.02 at M15 (operating break-even); cumulative cash
troughs at -621 240.91 at M10, is -45 826.72 at M22 and +25 765.75 at M23 (cumulative cash recovery),
ending at +5 311 017.86 at M60.

`DOWNSIDE`: no month has positive EBITDA-like, positive operating cash flow or a cash recovery; the
M60 contribution is +150 666.06 but the M60 EBITDA-like is -2 630 259.30 and cumulative cash
-3 081 802.04, which is also the financing requirement.

## 6. Unit-level conditional thresholds

The same values apply in the three hypothetical scenarios (price and cost hypotheses are scenario-
invariant). Hardware contribution = gross hypothesis / 1.21 × blended channel factor 0.905 (70 %
direct + 25 % distributor net of 35 % + 5 % installer net of 15 %) − known variable unit cost;
minimum gross price = known variable unit cost / 0.905 × 1.21. Subscription contribution = net annual
hypothesis × 0.94 (80 % direct + 20 % app store net of 30 % commission) − known direct cost.

| Subject | Type | `UNIT_CONTRIBUTION_ZERO` | `MINIMUM_GROSS_PRICE` | Status |
|---|---|---|---|---|
| HUB-STANDARD | hardware SKU | -20.10 EUR/unit | 375.88 EUR gross | conditional, below zero |
| HUB-PRO | hardware SKU | 92.09 EUR/unit | 375.88 EUR gross | conditional (incremental PRO cost unknown) |
| DISPLAY-7 | hardware SKU | 219.49 EUR/unit | 405.54 EUR gross | conditional, strongest hardware case |
| AIS-RECEIVER | hardware SKU | -95.11 EUR/unit | 376.17 EUR gross | conditional, below zero (receive-only AIS) |
| SENSE-ENTRY-SYMBOLIC | hardware SKU | -14.22 EUR/unit | 118.02 EUR gross | conditional, below zero (symbolic entry, no established price) |
| WATCH-CORE | hardware SKU | 32.73 EUR/unit | 255.24 EUR gross | conditional |
| WATCH-MONITORING | subscription | 79.24 EUR/account-year | — | conditional |
| NAV-ESSENTIAL / NAV-PRO | subscription | `null` | — | `NOT_DETERMINABLE` — chart/weather data licence unknown |
| WEATHER-STANDARD / WEATHER-PRO | subscription | `null` | — | `NOT_DETERMINABLE` — chart/weather data licence unknown |
| FLEET-START | per vessel | 45.91 EUR/vessel-month | — | conditional; excludes onboarding/DPA/SLA and telemetry above the declared driver |

These are zero-contribution points on known variable costs, not break-even prices for the company.
A negative unit contribution means the current price hypothesis does not even cover known variable
cost at the declared channel mix. All prices remain `HYPOTHESIS_UNAPPROVED`.

## 7. NOT_DETERMINABLE register and unknown-driven exclusions

| Missing input | Thresholds affected | Register status |
|---|---|---|
| Chart/weather data licence cost (ASM-MC13-049, rights `NOT_GRANTED`) | NAV-ESSENTIAL/PRO and WEATHER-STANDARD/PRO unit contribution in all three hypothetical scenarios (12 records) | `NOT_DETERMINABLE`, missing input listed per record |
| Data licence, validated subscription mix, validated churn/renewal | BE-BASE-SUBSCRIBERS (portfolio subscriber count) | `NOT_DETERMINABLE` |
| Company current expenses and cash position | BE-RESTRICTED-OPERATING | `NOT_DETERMINABLE` |
| Product liability insurance (ASM-MC13-047) and CRA lifecycle cost (ASM-MC13-048) | all portfolio operating, cash-flow, recovery and financing thresholds | excluded from the conditional figures; thresholds are optimistically early/high, not not-determinable at portfolio level |
| FLEET onboarding, DPA, SLA and tenancy (BLK-FIN-10) | FLEET-START unit contribution | conditional only; onboarding/SLA excluded |
| PILOT economics (BLK-FIN-11) | none — no PILOT threshold exists | safety `BLOCKED`; PILOT has zero units, zero cost and zero revenue in every scenario, so its break-even cannot be determined |

Because insurance, CRA and licensing costs are absent rather than zero, every conditional company-level
threshold in §4 is an **optimistic bound**: the true operating and cash-flow break-evens would be later
and the true financing requirement higher once those inputs are obtained.

## 8. A positive product contribution never proves fixed-cost coverage

- `DOWNSIDE` M60: contribution +150 666.06 against a fixed operating envelope of 2 780 925.36, so
  EBITDA-like is -2 630 259.30 even though several SKUs show positive unit contribution.
- `BASE_HYPOTHETICAL` M60: contribution +1 688 226.86 is positive, but the fixed envelope
  2 306 288.64 exceeds it, EBITDA-like is -618 061.78 and cumulative cash never recovers.
- `UPSIDE_HYPOTHETICAL` M60: contribution 5 475 105.86 exceeds the 1 511 192.40 fixed envelope,
  EBITDA-like is +3 963 913.46 and cash recovery occurs at M23 — the only scenario that does.
- Fixed-cost coverage needs volume: BE-BASE-FIXED-COST-UNITS = 1 138 units per month of a mixed
  portfolio on known costs only, before the unknown fixed costs.
- The stress register confirms the separation: 24/24 stress cases miss cash recovery, 23/24 keep a
  positive unit contribution yet collapse at company level (only ST-17 has no unit contribution).

## 9. What these values are and are not

They are `CONDITIONAL_HYPOTHETICAL_THRESHOLD` values computed from labelled `SCENARIO_ASSUMPTION`
demand, cost and clearance inputs. They are:
- not a verified company break-even — no actual revenue, cost or cash record exists to verify them;
- not profitability — no tax, interest, depreciation-complete or unknown-cost-complete profit line is
  calculated;
- not an investment return or a payback promise — the opening balance is the declared analysis
  convention `0`, not the company bank balance;
- not an approved budget, financing offer or investment requirement;
- not a demand forecast or a probability — no likelihood is assigned to any scenario;
- conditional on hypothetical clearance months that are not certifications, licences or approvals.

The `BASE_HYPOTHETICAL` path does **not** recover cash within 60 periods under the declared
assumptions; only `UPSIDE_HYPOTHETICAL` reaches operating break-even (M15), cash-flow break-even
(M11) and cumulative cash recovery (M23). `RESTRICTED_CURRENT` produces no company-level threshold
because no sale is authorised.

## 10. Reproducibility and status summary

```
node scripts/build-marea-financial-model.mjs
node scripts/check-marea-financial-model.mjs
```

Thresholds are regenerated deterministically from `monthly-financial-model.json`; the validator
recomputes operating, cash-flow, recovery and financing values (`A-20`) and rejects any divergence.
The figures reconcile to `MC13-GENERATED-FIGURES.md` §2. Governance flags are unchanged: commercial
availability `NOT_FOR_SALE`, price approved `NONE`, customer evidence `NONE`, licensing rights not
granted, PILOT safety `BLOCKED`, MC-14 not started. Status of this analysis:
`PENDING_INDEPENDENT_REVIEW`; no merge, deployment or financing authorisation is asserted.

## 11. References

- [break-even-thresholds.json](data/break-even-thresholds.json), [scenario-results.json](data/scenario-results.json), [monthly-financial-model.json](data/monthly-financial-model.json), [stress-tests.json](data/stress-tests.json).
- [MC13-GENERATED-FIGURES.md](MC13-GENERATED-FIGURES.md) §2 (thresholds) and §3 (stress results); [MC13-FINANCIAL-DATA-CONTRACT.md](MC13-FINANCIAL-DATA-CONTRACT.md).
- [MC13-60-MONTH-INTEGRATED-FINANCIAL-MODEL.md](MC13-60-MONTH-INTEGRATED-FINANCIAL-MODEL.md) — D04; [MC12-MC13-HANDOFF.md](../economics/MC12-MC13-HANDOFF.md).
- D-049, D-050, D-051, D-052 in [DECISION-LOG.md](../execution/DECISION-LOG.md).
