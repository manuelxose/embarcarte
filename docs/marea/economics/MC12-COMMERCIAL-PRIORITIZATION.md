# MC-12 D12 — Commercial prioritisation assessment

| Field | Value |
|---|---|
| Deliverable | D12 `MC12-COMMERCIAL-PRIORITIZATION.md` |
| Owner / date | `programme-lead`, 2026-11-02 |
| Status | `INTERNAL_ECONOMICS_ANALYSIS` — an economic classification is not a commercial lifecycle approval |
| Machine companion | [decision-matrix.json](data/decision-matrix.json), [assumptions.json](data/assumptions.json) |

## 1. Pre-registered method

Seven dimensions were weighted **before** scoring, so the result cannot choose its
own weights:

| Dimension | Weight |
|---|---|
| Cost evidence completeness | 25 |
| Recurring-cost exposure certainty | 15 |
| Provider licensing readiness | 20 |
| Technical readiness | 10 |
| Customer evidence | 15 |
| Regulatory readiness | 10 |
| Contribution confidence | 5 |
| **Total** | **100** |

Scores are 0–5 per dimension (0 = no evidence or hard block, 5 = fully evidenced and
ready). The weighted score is recomputed by the validator. The classification rule
is applied in a fixed order: `SAFETY_BLOCKED` → `LICENSING_BLOCKED` →
`COST_MODEL_INCOMPLETE` → `ECONOMICS_EVIDENCED` → `CONDITIONAL_ECONOMIC_CASE` →
`DEFER_RECOMMENDED`. A lower rule never overrides a higher one, and an economic
score can never override a legal, safety or IP gate.

## 2. Matrix

| Family | Cost evidence (25) | Recurring certainty (15) | Licensing readiness (20) | Technical readiness (10) | Customer evidence (15) | Regulatory readiness (10) | Contribution confidence (5) | Weighted | Classification |
|---|---|---|---|---|---|---|---|---|---|
| NAV | 3 | 2 | 0 | 3 | 0 | 2 | 2 | **1.65** | `LICENSING_BLOCKED` |
| FLEET | 2 | 2 | 2 | 1 | 0 | 1 | 2 | **1.50** | `COST_MODEL_INCOMPLETE` |
| DISPLAY | 2 | 2 | 2 | 1 | 0 | 0 | 3 | **1.45** | `CONDITIONAL_ECONOMIC_CASE` |
| WEATHER | 2 | 2 | 0 | 2 | 0 | 2 | 2 | **1.30** | `LICENSING_BLOCKED` |
| HUB | 2 | 2 | 1 | 2 | 0 | 0 | 1 | **1.25** | `DEFER_RECOMMENDED` |
| SENSE | 2 | 2 | 1 | 2 | 0 | 0 | 1 | **1.25** | `DEFER_RECOMMENDED` |
| WATCH | 2 | 1 | 1 | 2 | 0 | 0 | 2 | **1.15** | `COST_MODEL_INCOMPLETE` |
| AIS | 2 | 2 | 1 | 1 | 0 | 0 | 0 | **1.10** | `DEFER_RECOMMENDED` |
| PILOT | 0 | 1 | 1 | 0 | 0 | 0 | 0 | **0.35** | `SAFETY_BLOCKED` |

Every family scores 0 on customer evidence: there are no interviews and no price
responses. That single 15-point column caps the whole portfolio and is the cheapest
score to move.

## 3. Provisional priority

`NAV > FLEET > DISPLAY > WEATHER > HUB ≈ SENSE > WATCH > AIS > PILOT`

This is an **evidence-gathering and economics priority**, not a launch order.

1. **NAV — software-first, but the chart right is the gate.** It has the best
   conceptual software contribution and a defined product. Spend the next external
   authorisation on the chart licence route (IHM/UKHO/Shom or an OEM), because it
   unblocks NAV, START, CRUISE and the NAV side of COMPLETE.
2. **FLEET — software-first, hardware-free by default.** Large conditional headroom
   per vessel-year; needs a cloud contract, DPA, support model and one real fleet
   conversation. No customer evidence exists.
3. **DISPLAY — the only hardware configuration with a robust conditional case.**
   Positive at every modelled volume and under combined stress. Needs a supplier
   quote and a certification cost, not a price increase.
4. **WEATHER — second data product, cheaper licence, same rights problem.** Pair its
   research with the chart licence work; do not open a separate provider track.
5. **HUB and SENSE — defer at current hypotheses.** HUB is within EUR 8.83 of its
   break-even price and negative under a 20 % cost increase. SENSE at the symbolic
   EUR 99 is below cost; module prices do not exist.
6. **WATCH — the most credible consumer service, but only after connectivity.**
   Conditional combined contribution is positive; the connectivity, cloud and alert
   contracts are material and absent.
7. **AIS — defer.** Negative at every modelled volume and case, needs at least
   EUR 340 gross or a materially lower receiver cost, and its NMEA/radio conformity
   route is unresolved.
8. **PILOT — blocked.** No cost, no fixed price, safety gate `BLOCKED`. Nothing can
   be prioritised commercially until the safety case exists.

## 4. Portfolio classification summary

| Classification | Families | Meaning |
|---|---|---|
| `ECONOMICS_EVIDENCED` | none | no product has evidenced costs, rights and demand |
| `CONDITIONAL_ECONOMIC_CASE` | DISPLAY | positive only under labelled assumptions; supplier quote and certification outstanding |
| `COST_MODEL_INCOMPLETE` | FLEET, WATCH | recurring or multi-tenant costs are material unknowns |
| `LICENSING_BLOCKED` | NAV, WEATHER | required data right not granted |
| `SAFETY_BLOCKED` | PILOT | safety gate closed |
| `DEFER_RECOMMENDED` | HUB, SENSE, AIS | negative or marginal at current hypotheses |

At bundle level: START and CRUISE `LICENSING_BLOCKED`, PROTECT
`DEFER_RECOMMENDED` (negative at PH-04), SAIL and COMPLETE `SAFETY_BLOCKED`, FLEET
`COST_MODEL_INCOMPLETE`.

## 5. Challenges to the ranking

- **DISPLAY ranks below FLEET and NAV** despite being the only robust hardware case.
  Correct: its score is pulled down by zero customer evidence and zero regulatory
  readiness. If certification were quoted and one channel test existed, it would
  move up sharply.
- **WATCH ranks low** because connectivity certainty is scored 1. Its conditional
  economics are better than its rank; the rank reflects missing contracts, not a bad
  product.
- **SENSE ties HUB** but is worse economically; its higher technical score offsets a
  worse contribution. The tie is arbitrary and should not be read as equivalence.
- **A "high" score cannot rescue a gate.** NAV would still be `LICENSING_BLOCKED`
  even at a perfect score.

## 6. What would change the ranking

| Event | Effect |
|---|---|
| Chart redistribution licence signed | NAV, START, CRUISE move from blocked to conditional |
| Weather re-display licence signed | WEATHER moves up; NAV Pro unblocked |
| Connectivity + cloud contracts | WATCH and FLEET move from incomplete to conditional |
| Supplier quotations + certification quotes | HUB, SENSE, DISPLAY, AIS move from assumption-based to evidenced |
| Customer interviews and pricing responses | the 15-point customer column finally moves; all rankings change |
| PILOT safety case | PILOT can be analysed at all |

## 7. Recommendation

Proceed with the **evidence-first software direction** (NAV, FLEET, WEATHER) and hold
**DISPLAY** as the only hardware candidate until a supplier quote and certification
cost exist. Defer HUB, SENSE and AIS at current hypotheses; keep WATCH as a
conditional service design; do not commercialise PILOT. None of these decisions is a
price approval, a launch or a purchase authorisation.
