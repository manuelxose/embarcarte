# MC-12 D07 — Per-SKU contribution model

| Field | Value |
|---|---|
| Deliverable | D07 `MC12-PER-SKU-CONTRIBUTION-MODEL.md` |
| Owner / date | `commercial-finance-pricing-strategist` + `programme-lead`, 2026-11-02 |
| Status | `INTERNAL_ECONOMICS_ANALYSIS` |
| Machine companion | [unit-economics.json](data/unit-economics.json), [hardware-cost-reconciliation.json](data/hardware-cost-reconciliation.json) |
| Accounting basis | ex-VAT in intent; prices are unapproved hypotheses; `PRICE_APPROVED = NONE` |

## 1. What is being computed

```
Net revenue ex-VAT
− known variable cost
= contribution before fixed operating costs           (conditional)
```

- Variable cost: component and material lines, assembly/test labour, landed cost,
  warranty allowance, and installation only when the configuration includes it.
- Fixed and excluded from unit contribution: tooling/NRE amortisation (`COST-16`),
  certification programme (`COST-17`), engineering NRE, product liability insurance
  and annual security maintenance. They are listed per record in
  `fixedCostsExcluded` and are never treated as zero.
- VAT: a VAT-inclusive consumer hypothesis is converted with Spain's 21 % rate
  (`net = gross / 1.21`). A VAT-excluded B2B price is net directly. The conversion
  is disclosed on every revenue line.
- Ranges are not produced when a material *unit-variable* cost is unknown; in that
  case the record is `INCOMPLETE_UNKNOWN_COSTS`, the percentage is `null`, and the
  conditional euro figure plus a `headroomEur` are reported instead.

This preserves the MC-11 invariant: `knownSubtotalEur` already contains the
`COST-16` line and `toolingAmortizationEur` repeats it, so it is never added twice.
The reconciliation gate proves 90/90 scenarios with a maximum delta of 0.00 EUR.

## 2. Hardware and physical SKUs at 100 units BASE (conditional)

| SKU | Net revenue EUR | Known variable cost EUR | Contribution EUR | Contribution % | Break-even gross price EUR | Classification |
|---|---|---|---|---|---|---|
| HUB-STANDARD | 288.43 | 281.13 | +7.30 | 2.5 % | 340.17 | `DEFER_RECOMMENDED` |
| HUB-PRO | 412.40 | 281.13 ¹ | +131.27 | n/a ¹ | 340.17 | `COST_MODEL_INCOMPLETE` |
| WATCH-CORE | 247.11 | 190.90 | +56.21 | n/a ² | 230.99 | `COST_MODEL_INCOMPLETE` |
| SENSE module | 81.82 ³ | 88.27 | −6.45 | −7.9 % | 106.81 | `DEFER_RECOMMENDED` |
| DISPLAY-7 | 577.69 | 303.32 | +274.37 | 47.5 % | 367.02 | `CONDITIONAL_ECONOMIC_CASE` |
| AIS-RECEIVER | 205.79 | 281.35 | −75.56 | −36.7 % | 340.43 | `DEFER_RECOMMENDED` |
| AIS-CONNECTED | 329.75 | n/a | n/a | n/a | n/a | `COST_MODEL_INCOMPLETE` |
| PILOT-COASTAL | n/a | n/a | n/a | n/a | n/a | `SAFETY_BLOCKED` |

¹ HUB-PRO uses the HUB-STANDARD modelled cost; its incremental candidate-envelope
lines are unpriced, so the percentage is suppressed. ² WATCH has material unknown
unit-recurring dependencies (connectivity, telemetry cloud, alert delivery). ³ The
EUR 99 SENSE figure is the MC-08 *symbolic entry hypothesis*, not an edition price.

Source: [unit-economics.json](data/unit-economics.json) records
`UE-*-100-BASE`, recomputed by the validator from MC-11 scenario lines.

### Volume curve, contribution EUR per unit, self-install

| Family | 1 | 10 | 100 | 500 | 1 000 |
|---|---|---|---|---|---|
| HUB | −26.79 | −16.77 | +7.30 | +25.93 | +36.38 |
| WATCH | +32.60 | +39.42 | +56.21 | +69.01 | +76.18 |
| SENSE | −18.45 | −15.23 | −6.45 | +0.81 | +4.77 |
| DISPLAY | +238.56 | +249.27 | +274.37 | +292.92 | +303.58 |
| AIS | −108.83 | −99.12 | −75.56 | −57.27 | −46.84 |

The volume effect is dominated by the fixed tooling/NRE amortisation being removed
from unit cost and by the labelled volume/learning assumptions (`ASM-004`,
`ASM-013`) — not by an observed supplier price break. No volume scenario is a
commitment or a forecast.

## 3. Software and subscription SKUs (annualised, direct channel)

| SKU | Gross hypothesis | Net revenue EUR/year | Known variable cost EUR | Conditional contribution EUR | Headroom for unknown data licence EUR | Classification |
|---|---|---|---|---|---|---|
| NAV Essential | EUR 99 incl. VAT | 81.82 | 10.43 | +71.39 | 71.39 | `LICENSING_BLOCKED` |
| NAV Pro | EUR 149 incl. VAT | 123.14 | 12.42 | +110.72 ¹ | 110.72 | `LICENSING_BLOCKED` |
| WEATHER Standard | EUR 49 incl. VAT | 40.50 | 5.45 | +35.05 | 35.05 | `LICENSING_BLOCKED` |
| WEATHER Pro | EUR 89 incl. VAT | 73.55 | 7.04 | +66.51 ¹ | 66.51 | `LICENSING_BLOCKED` |
| WATCH monitoring | EUR 9.90/month incl. VAT | 98.18 | 13.05 | +85.13 | n/a | `COST_MODEL_INCOMPLETE` |
| FLEET START | EUR 49/vessel/month excl. VAT | 588.00 | 37.08 | +550.92 | n/a | `COST_MODEL_INCOMPLETE` |
| FLEET BUSINESS | EUR 79/vessel/month excl. VAT | 948.00 | 42.48 | +905.52 | n/a | `COST_MODEL_INCOMPLETE` |

¹ NAV Pro and WEATHER Pro carry two unresolved data rights (charts plus weather),
so the headroom is the combined allowance, not one licence.

The headroom is the maximum *additional* unknown cost before contribution reaches
zero. It is the analytically useful figure: a chart licence of EUR 24 per
account-year would still leave NAV Essential positive (EUR 47.39), but the right to
grant that licence does not exist. A 30 % app-store commission would consume
EUR 24.55 of the EUR 81.82 NAV Essential net revenue.

## 4. Family-by-family reading

### HUB — marginal at its own hypothesis
At 100 units the modelled variable cost is EUR 281.13 against EUR 288.43 net
revenue: a 2.5 % conditional contribution, before certification, channel margin,
support and CRA maintenance. The break-even gross price is EUR 340.17, only
EUR 8.83 below the EUR 349 hypothesis. A 20 % cost increase makes it negative. HUB is
not unviable in principle; it is unviable **at this price with this evidence**.

### WATCH — the most promising hardware *if* the service costs hold
Hardware contributes EUR 56.21 per unit at 100 units. The monitoring subscription
adds EUR 85.13 per device-year on modelled connectivity, cloud, notifications,
payment and support. The combined conditional case is positive, but connectivity,
cloud and alert delivery have no contract and are material. The classification is
`COST_MODEL_INCOMPLETE`, not a favourable result.

### SENSE — the entry hypothesis is below cost
At the symbolic EUR 99 the module loses EUR 6.45 per unit at 100 units. It only
breaks even at roughly EUR 106.81 gross, and the 500/1 000-unit cases turn positive
only because of the labelled volume factor. A five-module family cannot be priced
from one symbolic figure; module-level prices are `NOT_ESTABLISHED`.

### DISPLAY — the only robust hardware case
EUR 274.37 conditional contribution (47.5 %) at 100 units, break-even gross price
EUR 367.02 against a EUR 699 hypothesis. It remains positive under +20 % cost and a
35 % distributor margin (see [D11](MC12-SENSITIVITY-AND-STRESS-ANALYSIS.md)). It is
still conditional: the panel and SOM are assumption allowances, no supplier has
quoted, and certification is unknown.

### AIS — negative under every modelled condition
EUR 281.35 variable cost against EUR 205.79 net revenue at EUR 249. The receiver
needs at least EUR 340.43 gross to break even, and it is negative at every modelled
volume and case. AIS-CONNECTED has no separate cost model at all. `DEFER`.

### PILOT — no economics exist
No BOM line is priced, no fixed retail price is approved, and the safety gate is
`BLOCKED`. A survey-based quotation model is the only permitted description. No
contribution figure is computed, and none may be implied.

### NAV and WEATHER — good software arithmetic, blocked rights
Both are high-margin on known costs and both are `LICENSING_BLOCKED`: the paid value
is a data entitlement MAREA does not hold. Their economic attractiveness is
irrelevant until a licence exists.

### FLEET — hardware-free, large headroom, no evidence
Per-vessel software contribution is structurally strong, but cloud contract, DPA,
tenant isolation, support model, onboarding and telemetry volume are unresolved.
The headroom is not a margin; the missing items are material.

## 5. Evidence confidence

| Dimension | State |
|---|---|
| Component prices | 42 public observations, 0 quotations; observed coverage of the modelled subtotal is 0.8–4.7 % |
| Labour | assumption only (no EMS rate card, no time study) |
| Certification | `UNKNOWN` in all 90 MC-11 scenarios; excluded as a fixed programme cost |
| Chart/weather licence | no right, no price |
| Connectivity/cloud | published tariffs only, no contract |
| Demand / willingness to pay | `NONE` / `false` |
| Price | every figure `HYPOTHESIS_UNAPPROVED` |

Confidence for every record is `LOW` or `NONE`. No record is
`ECONOMICS_EVIDENCED`; the dataset count is 0 by design.

## 6. What these numbers are not

They are not prices, quotations, margins, profitability, market forecasts or
demand evidence. They are a conditional, fully labelled cost structure that shows
where a product would have to land and which evidence is missing. The independent
audit recomputes the arithmetic from the source records rather than trusting this
table.
