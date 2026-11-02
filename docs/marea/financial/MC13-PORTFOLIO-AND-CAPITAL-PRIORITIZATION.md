# MC-13 D14 — Portfolio and capital prioritization

| Field | Value |
|---|---|
| Deliverable | D14 `MC13-PORTFOLIO-AND-CAPITAL-PRIORITIZATION.md` |
| Status | `INTERNAL_FINANCIAL_ANALYSIS` — six separate rankings, five separate dimensions, no launch-readiness score |
| Milestone | MC-13/36 — 60-month financial model, cash flow, investment requirements, scenario economics and conditional break-even |
| Date | 2026-11-02 |
| Owner | Commercial Strategy and Capital Planning |
| Machine authorities | [portfolio-prioritization.json](data/portfolio-prioritization.json), [decision-matrix.json](../../economics/data/decision-matrix.json), [bundle-definitions.json](../../bundles/bundle-definitions.json), [scenario-results.json](data/scenario-results.json), [MC13-GENERATED-FIGURES.md](MC13-GENERATED-FIGURES.md) |
| Boundary | Analysis only. No classification change, no price approval, no launch, no purchase and no MC-14 start. |

## 1. Purpose and boundary

This document assesses the nine product families and the six bundles on five distinct
dimensions and reproduces the six separate rankings generated in
[portfolio-prioritization.json](data/portfolio-prioritization.json). It does not change
an MC-12 classification, does not convert an economic score into a commercial
authorization, and does **not merge the six rankings into one launch-readiness score** —
the MC-13 data contract (§4.14) prohibits a composite. The six rankings are separate
dimensions, not votes. Every product remains `NOT_FOR_SALE` and every family remains
`NOT_AUTHORIZED`; no ranking is a launch priority or an allocation decision.

## 2. Method: separate dimensions, separate rankings

Economic potential, evidence readiness, capital efficiency, implementation dependency
and commercial authorization answer different questions and are not additive. A family
can have the best conditional unit contribution and no right to sell it; a family can be
cheap to attempt and unsafe to launch. The machine document therefore emits six
independent orderings, each with its own label, direction, metric basis and
`licensingBlocked` / `safetyBlocked` flags; this document reproduces them without re-scoring.

## 3. The five dimensions

| Dimension | What it measures | Machine field | What it is **not** |
|---|---|---|---|
| Economic potential (conditional) | known-cost unit contribution and hypothetical 60-period revenue | `bestConditionalUnitContributionPct`, `cumulativeRevenueNetM60Eur` | not a forecast, not validated demand, not a price |
| Evidence readiness | declared readiness score | `evidenceReadinessScore` (1–3) | not a launch-readiness score |
| Capital efficiency | hypothetical allocation and hypothetical revenue per allocation unit | `capitalAllocationEur` | not a budget, quotation or commitment |
| Implementation dependency | licensing/regulatory and implementation dependency | `licensingDependency` (0–5), `implementationDependency` | not a schedule, probability or critical path |
| Commercial authorization | whether sale is authorized | `commercialAuthorization`, `commercialAvailability` | not a ranking: every family is `NOT_AUTHORIZED` / `NOT_FOR_SALE` |

## 4. Nine families with classifications unchanged

Classifications are carried verbatim from
[decision-matrix.json](../../economics/data/decision-matrix.json) and match
`inheritedMc12Classification`; no family is `ECONOMICS_EVIDENCED`.

| Family | MC-12 classification (verbatim) | Weighted score | Commercial availability | Commercial authorization | Capital allocation (EUR) |
|---|---|---|---|---|---|
| NAV | `LICENSING_BLOCKED` | 1.65 | `NOT_FOR_SALE` | `NOT_AUTHORIZED` | 70 000 |
| HUB | `DEFER_RECOMMENDED` | 1.25 | `NOT_FOR_SALE` | `NOT_AUTHORIZED` | 60 000 |
| AIS | `DEFER_RECOMMENDED` | 1.10 | `NOT_FOR_SALE` | `NOT_AUTHORIZED` | 30 000 |
| PILOT | `SAFETY_BLOCKED` | 0.35 | `NOT_FOR_SALE` | `NOT_AUTHORIZED` | 25 000 |
| SENSE | `DEFER_RECOMMENDED` | 1.25 | `NOT_FOR_SALE` | `NOT_AUTHORIZED` | 35 000 |
| WATCH | `COST_MODEL_INCOMPLETE` | 1.15 | `NOT_FOR_SALE` | `NOT_AUTHORIZED` | 45 000 |
| DISPLAY | `CONDITIONAL_ECONOMIC_CASE` | 1.45 | `NOT_FOR_SALE` | `NOT_AUTHORIZED` | 55 000 |
| WEATHER | `LICENSING_BLOCKED` | 1.30 | `NOT_FOR_SALE` | `NOT_AUTHORIZED` | 35 000 |
| FLEET | `COST_MODEL_INCOMPLETE` | 1.50 | `NOT_FOR_SALE` | `NOT_AUTHORIZED` | 47 500 |

The nine allocations sum to **EUR 402 500.00**, the conditional known-capex envelope
(see [D09](MC13-CAPEX-AND-FUNDING-REQUIREMENTS.md)); the split is analytical, not a
budget. The MC-12 provisional priority (`NAV > FLEET > DISPLAY > WEATHER > HUB > SENSE
> WATCH > AIS > PILOT`, D-052) is inherited context, not a market forecast, and it is
not one of the six MC-13 rankings.

## 5. Exact per-family conditional metrics

| Family | Best conditional unit contribution (%) | Best subject | Metric | Cumulative net revenue M60 (EUR) | Recurring net revenue M60 (EUR) | Downside cumulative net revenue (EUR) |
|---|---|---|---|---|---|---|
| NAV | 89.91 | NAV-PRO | `SUBSCRIPTION_ANNUAL_CONTRIBUTION_PCT` | 894 350.70 | 894 350.70 | 60 265.94 |
| HUB | 24.67 | HUB-PRO | `HARDWARE_UNIT_CONTRIBUTION_PCT` | 644 693.43 | 0.00 | 78 251.22 |
| AIS | -51.07 | AIS-RECEIVER | `HARDWARE_UNIT_CONTRIBUTION_PCT` | 100 802.23 | 0.00 | 12 826.12 |
| PILOT | null | null | null | 0.00 | 0.00 | 0.00 |
| SENSE | -19.21 | SENSE-ENTRY-SYMBOLIC | `HARDWARE_UNIT_CONTRIBUTION_PCT` | 87 122.53 | 0.00 | 11 348.32 |
| WATCH | 86.71 | WATCH-MONITORING | `SUBSCRIPTION_ANNUAL_CONTRIBUTION_PCT` | 458 700.04 | 136 569.38 | 55 886.03 |
| DISPLAY | 41.98 | DISPLAY-7 | `HARDWARE_UNIT_CONTRIBUTION_PCT` | 512 192.72 | 0.00 | 66 940.26 |
| WEATHER | 90.43 | WEATHER-PRO | `SUBSCRIPTION_ANNUAL_CONTRIBUTION_PCT` | 186 600.47 | 186 600.47 | 10 727.37 |
| FLEET | 24.33 | FLEET-START | `SUBSCRIPTION_ANNUAL_CONTRIBUTION_PCT` | 542 185.00 | 542 185.00 | 70 805.00 |

The percentage is a known-cost contribution, not revenue and not an available margin;
it is not a margin for sale. NAV and WEATHER show figures only because the unknown data
licence is excluded — a unit contribution before an unknown data licence is not a
decision number. PILOT has no unit economics at all: `null`, never zero.

## 6. The five dimensions assessed separately

### 6.1 Economic potential (conditional)

Known-cost contribution is positive for WEATHER (90.43 %), NAV (89.91 %), WATCH
(86.71 %), DISPLAY (41.98 %), HUB (24.67 %) and FLEET (24.33 %); negative for SENSE
(-19.21 %) and AIS (-51.07 %); PILOT is not determinable. These cannot be read as
portfolio value: NAV/WEATHER are licensing-blocked, WATCH and FLEET carry incomplete
recurring cost models, and every demand input is a labelled `SCENARIO_ASSUMPTION`.

### 6.2 Evidence readiness

Declared readiness is 3 for HUB, SENSE and DISPLAY; 2 for NAV, AIS, WATCH, WEATHER and
FLEET; 1 for PILOT. This is not customer evidence: MC-12 scored `customerEvidence` at 0
for all nine, `CUSTOMER_EVIDENCE = NONE`, `CUSTOMER_WTP_VALIDATED = false`. Readiness
here describes internal cost/licensing documentation completeness, not proof of demand.

### 6.3 Capital efficiency

Derived ratio: hypothetical cumulative net revenue M60 per EUR 100 of hypothetical
capital allocation. It is a ratio of two uncertain numbers, not a return: NAV 1 277.64,
FLEET 1 141.44, HUB 1 074.49, WATCH 1 019.33, DISPLAY 931.26, WEATHER 533.14, AIS
336.01, SENSE 248.92 and PILOT 0.00. The allocation ordering is the "lowest hypothetical
initial capital" ranking, not an efficiency verdict: PILOT is "cheapest" only because no
credible cost basis exists, and the allocation itself is an analytical envelope.

### 6.4 Implementation dependency

Licensing dependency: 2 for HUB, SENSE and FLEET; 3 for AIS, PILOT, WATCH and DISPLAY;
5 for NAV and WEATHER. Implementation dependency: 2 for WEATHER; 3 for NAV, SENSE,
DISPLAY and FLEET; 4 for HUB, AIS and WATCH; 5 for PILOT. These scores describe legal
and delivery dependencies, not sequencing or probability.

### 6.5 Commercial authorization

There is no ranking on this dimension and there cannot be one: every family is
`commercialAvailability: NOT_FOR_SALE`, `commercialAuthorization: NOT_AUTHORIZED`, and
the file declares `noCommercialAuthorization: true`. Economic potential cannot override
a legal, safety or IP gate; `safetyBlocked: true` marks PILOT and `licensingBlocked:
true` marks NAV and WEATHER in every relevant ranking basis.

## 7. The six separate rankings (reproduced from the JSON)

### 7.1 Best conditional known unit economics (`conditionalUnitEconomics`, descending)

WEATHER 90.43 > NAV 89.91 > WATCH 86.71 > DISPLAY 41.98 > HUB 24.67 > FLEET 24.33 >
SENSE -19.21 > AIS -51.07 (PILOT absent: `null`, no unit economics, eight families not
nine). **This ranking places WEATHER and NAV at the top only because the unknown
data-licence cost is excluded. Both are `LICENSING_BLOCKED`, and their `metricBasis`
entries carry `licensingBlocked: true`; the ranking is NOT actionable and must not be
read as a launch priority.** The JSON note states the same.

### 7.2 Lowest hypothetical initial capital allocation (`initialCapitalRequirement`, ascending)

PILOT 25 000 > AIS 30 000 > SENSE 35 000 ≈ WEATHER 35 000 > WATCH 45 000 > FLEET
47 500 > DISPLAY 55 000 > HUB 60 000 > NAV 70 000. The label is "lowest hypothetical
allocation"; it is not a recommendation to spend least on the most promising product.

### 7.3 Lowest licensing/regulatory dependency (`licensingDependency`, ascending)

HUB 2 ≈ SENSE 2 ≈ FLEET 2 > AIS 3 ≈ PILOT 3 ≈ WATCH 3 ≈ DISPLAY 3 > NAV 5 ≈ WEATHER 5.

### 7.4 Strongest potential recurring revenue (`recurringRevenuePotential`, descending)

NAV 894 350.70 > FLEET 542 185.00 > WEATHER 186 600.47 > WATCH 136 569.38 > HUB 0 =
AIS 0 = PILOT 0 = SENSE 0 = DISPLAY 0. The zero-value ties are not resolved by any
declared tie-breaker; see section 8.

### 7.5 Lowest downside revenue exposure (`downsideExposure`, order as declared)

HUB 78 251.22 > FLEET 70 805.00 > DISPLAY 66 940.26 > NAV 60 265.94 > WATCH 55 886.03 >
AIS 12 826.12 > SENSE 11 348.32 > WEATHER 10 727.37 > PILOT 0. The declared order is by
*retained* downside revenue, so the family with the most retained revenue is first.

### 7.6 Highest evidence-acquisition priority (`evidenceAcquisitionPriority`, ascending — lowest readiness first)

PILOT 1 > NAV 2 ≈ AIS 2 ≈ WATCH 2 ≈ WEATHER 2 ≈ FLEET 2 > HUB 3 ≈ SENSE 3 ≈ DISPLAY 3.
This ranking is **lowest-evidence-readiness-first**: the least evidenced family comes
first because acquiring that evidence is the cheapest way to change a decision. It is
an evidence-acquisition order, not a launch order — PILOT is first only because it is
least evidenced, and it remains safety-blocked.

## 8. Ranking limits and reported inconsistencies

1. **No merged score.** The six rankings are not weights, votes or a launch order;
   combining them is prohibited by the data contract (§4.14). The six rankings are
   separate dimensions.
2. **The rankings disagree by construction.** NAV leads recurring revenue and ranks
   second on unit economics but is licensing-blocked; HUB leads downside retention but
   is economically marginal; PILOT ranks "cheapest" and most evidence-prioritised only
   because no credible cost or evidence exists. A high rank on one dimension is not a
   licence to act.
3. **FLEET revenue now reconciles with the model.** `metrics.FLEET` records
   `cumulativeRevenueNetM60Eur: 542 185.00`, `cumulativeRecurringRevenueNetM60Eur:
   542 185.00` and `downsideCumulativeRevenueNetEur: 70 805.00`, matching the derived
   check of `fleetActiveVessels` × EUR 49 (BASE 542 185.00, DOWNSIDE 70 805.00, UPSIDE
   1 620 430.00). The earlier zero-value FLEET positions are superseded and the
   recurring/downside rankings changed accordingly.
4. **Downside-exposure label versus order.** The label says "Lowest downside revenue
   exposure" while the order is descending by *retained* downside revenue; the note
   says "higher retained downside revenue ranks first". The order is carried as
   declared, but the label reads as its opposite.
5. **Ties are not tie-broken.** Five families tie at 0 recurring revenue; five tie at 2
   and three at 3 in evidence priority; SENSE and WEATHER tie at EUR 35 000. Their
   sequence is fixed in the JSON without a declared tie-breaker and should not be
   over-read.
6. **Eight-family ranking.** `conditionalUnitEconomics` omits PILOT rather than placing
   it last; PILOT has no cost or revenue and cannot be ranked economically.

## 9. MC-12 conclusions carried forward verbatim

- "NAV and WEATHER licensing is blocked; a unit contribution before an unknown data
  licence is not a decision number."
- "FLEET is economically interesting but incomplete; no contract, SLA or vessel
  customer exists."
- "DISPLAY is the strongest conditional hardware case."
- "WATCH is a potentially interesting hardware-plus-service structure, with unverified
  recurring contracts."
- "HUB is marginal at the 100-unit BASE cost."
- "SENSE entry price is below modelled cost."
- "AIS is negative at current hypotheses."
- "PILOT is safety blocked and cannot be modelled financially."
- "PROTECT is negative at its historical bundle hypothesis."

## 10. Six bundles — classifications unchanged

Bundle identities and price hypotheses come from
[bundle-definitions.json](../../bundles/bundle-definitions.json); classifications come
from `decision-matrix.json` and are not modified here.

| Bundle | Price hypothesis (EUR) | Hypothesis status | Bundle classification | Contribution status |
|---|---|---|---|---|
| START | 499 | `HYPOTHESIS_UNAPPROVED` | `LICENSING_BLOCKED` | `INCOMPLETE_UNKNOWN_COSTS` |
| CRUISE | 1 399 | `HYPOTHESIS_UNAPPROVED` | `LICENSING_BLOCKED` | `INCOMPLETE_UNKNOWN_COSTS` |
| SAIL | 1 990 | `HYPOTHESIS_UNAPPROVED` | `SAFETY_BLOCKED` | `INCOMPLETE_UNKNOWN_COSTS` |
| PROTECT | 399 | `HYPOTHESIS_UNAPPROVED` | `DEFER_RECOMMENDED` | `INCOMPLETE_UNKNOWN_COSTS` |
| COMPLETE | 3 490 | `HYPOTHESIS_UNAPPROVED` | `SAFETY_BLOCKED` | `INCOMPLETE_UNKNOWN_COSTS` |
| FLEET | null (`NOT_ESTABLISHED`) | `NOT_ESTABLISHED` | `COST_MODEL_INCOMPLETE` | `INCOMPLETE_UNKNOWN_COSTS` |

No bundle is purchasable, none has an approved price, and none is a launch
recommendation. START and CRUISE inherit the NAV chart-right block; SAIL and COMPLETE
inherit the PILOT safety block; PROTECT is negative at its historical hypothesis; FLEET
is a bespoke `VAT_EXCLUDED_CONTRACT` with no established package, onboarding or support
price. All six contribution statuses remain `INCOMPLETE_UNKNOWN_COSTS`.

## 11. What would change the picture

A chart redistribution licence would move NAV, START and CRUISE from blocked to
conditional; a weather re-display licence would move WEATHER and NAV Pro; connectivity
and cloud contracts would complete WATCH and FLEET; supplier and certification
quotations would replace HUB, SENSE, DISPLAY and AIS assumptions; customer interviews
and price responses would move the 15-point customer column for every family; a PILOT
safety case would make PILOT analysable. None of these exists in this milestone.

## 12. Traceability

| Figure | Value | Source |
|---|---|---|
| Six rankings | section 7 order and metric values | `portfolio-prioritization.json#rankings` |
| Per-family metrics | section 5 table | `portfolio-prioritization.json#metrics` |
| Licensing/safety flags | `licensingBlocked`, `safetyBlocked` | `portfolio-prioritization.json#rankings[].metricBasis` |
| MC-12 classifications and weighted scores | section 4 table | `decision-matrix.json#families` |
| Bundle classifications | section 10 table | `decision-matrix.json#bundles` |
| Bundle price hypotheses | section 10 table | `bundle-definitions.json#priceHypothesisRegister` |
| Capital allocation sum | EUR 402 500.00 | derived: sum of `metrics[].capitalAllocationEur` |
| FLEET revenue reconciliation | EUR 542 185.00 BASE / 70 805.00 DOWNSIDE | `metrics.FLEET`; derived check `fleetActiveVessels` × EUR 49 |

## 13. Governance statement

This document is analysis, not authorization. It changes no classification, approves no
price, establishes no launch order and contains no investment approval, financing offer
or commitment. The six rankings are separate dimensions and none is merged into a
launch-readiness score. All products remain `NOT_FOR_SALE`; all families remain
`NOT_AUTHORIZED`; MC-14 has not started.
