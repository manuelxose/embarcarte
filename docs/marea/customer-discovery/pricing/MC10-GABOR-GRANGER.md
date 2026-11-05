# MC-10 — Gabor–Granger price sensitivity: frozen ladders and empty results (EXP-MC10-04)

| Field | Value |
| --- | --- |
| Document ID | MC-10 / D13 / MC10-GABOR-GRANGER |
| Milestone | MC-10 of 36 — primary customer discovery (Wave 2 pricing design) |
| Experiment | `EXP-MC10-04` — Price sensitivity, Gabor–Granger |
| Instrument | `WTP-INS-01` — Gabor–Granger price ladder (MC-09 design) |
| Status | `NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED)` |
| Fieldwork executed | **none** — no candidate identified, contacted, screened or interviewed |
| Administered price points | **0** |
| Price responses recorded | **0** |
| WTP state | `WTP_STATED_PREFERENCE_OBSERVED = false` · `WTP_COMMERCIALLY_VALIDATED = false` · `APPROVED_PRICES = 0` · `PROFITABILITY_NOT_ESTABLISHED` |
| Frozen mirror | `docs/marea/customer-discovery/data/pricing-ladders.json` (same amounts, same order, same VAT framing) |
| Ladder freeze hash | `SHA-256(constructs) = bfa09ebc904a66ba65961864d5e026638e3756a41a0611f0c3fdf1e83bb5be8c` — recorded in `data/pricing-ladders.json` as `freeze.constructsSha256`; recomputed with the command in `freeze.verificationCommand` |
| Date | 2026-11-01 |
| Owner | Pricing and Behavioral Research Economist (`agent-e-pricing`) |
| Write scope | `docs/marea/customer-discovery/pricing/` (3 files) and `docs/marea/customer-discovery/data/pricing-ladders.json` only |
| Is not | Not a price list · not an offer · not a demand curve · not a willingness-to-pay measurement · not a conversion, elasticity or revenue estimate |

## 0. How to read this document

This document freezes the Gabor–Granger design and records that **no ladder was ever administered**. It
has three parts that must not be conflated:

1. the **constructs** — neutral verbal descriptions of two configurations that do not exist;
2. the **frozen ladders** — five strictly ascending EUR hypotheses per construct, derived from cited
   MC-09 observations and unapproved MC-09 family price hypotheses, frozen 2026-11-01 before any data;
3. the **results** — `0` points administered, `0` responses, every band `NOT_COMPUTED` or
   `NOT_ESTIMABLE` with denominator `0`.

The forbidden transformation is:

> "The ladder was designed and frozen, therefore price sensitivity was measured."

It was not. A ladder is an instrument, not a demand curve. The amounts below are research hypotheses and
must never be shown to anyone as a MAREA price, an offer, a reservation or a purchasable figure.

## 1. Status and authoritative invariants

| Invariant | Value | Source |
| --- | --- | --- |
| Outreach authorisation | `NOT_GRANTED` (`AUTH-MC10-001`) | `data/fieldwork-authorization.json` |
| Fieldwork status | `BLOCKED` | `data/research-status.json` |
| Gabor–Granger ladders completed | `0` | `data/research-status.json` (`pricing.gaborGrangerLaddersCompleted`) |
| Price responses recorded | `0` | `data/research-status.json` (`pricing.priceResponsesRecorded`) |
| `WTP_STATED_PREFERENCE_OBSERVED` | `false` | `data/research-status.json` |
| `WTP_COMMERCIALLY_VALIDATED` | `false` | `data/research-status.json` |
| `APPROVED_PRICES` | `0` | `data/research-status.json` |
| Profitability | `PROFITABILITY_NOT_ESTABLISHED` | `data/research-status.json` |
| Frozen ladder file | `status = PRE_REGISTERED_HYPOTHESIS`, `approvedPrice = false`, `administered = false`, `responses = []` | `data/pricing-ladders.json` |

## 2. The two constructs

Both constructs are read to the participant in the same words every time, including exclusions. Neither
is described as available, certified, orderable or for sale. The tested unit is part of the description
and is not left to the participant to guess.

### 2.1 `CONSTRUCT-01` — Navigation and onboard-data reference configuration

**Verbal description of record:**

> "Imagine a concept for your boat: navigation software that shows your position, heading, course, speed
> and depth, displays a licensed chart entitlement on a screen you already own, and shows data from the
> instruments already fitted to the boat. It is access for one year, for one vessel, on one account.
> The price would not include a display or any hardware, it would not include installation, it would not
> include cellular connectivity, and chart or data licences that the provider does not hold are not
> included. Nothing is guaranteed to be available and none of this exists yet — it is a description for
> this conversation."

- **Pricing mode:** `ANNUAL_SUBSCRIPTION` (one year of access for one vessel on one account).
- **Currency:** EUR.
- **VAT framing:** VAT-included consumer retail **hypothesis**, consistent with the MC-09
  `VAT_INCLUDED_CONSUMER_RETAIL_HYPOTHESIS` designation (`PH-01`, `PH-02`, `PH-04` and
  `familyPriceHypotheses.NAV` in `data/governance-status.json`). Not tax advice, not a tax determination,
  not an approved price.
- **Exclusions restated every time:** no hardware, no display, no installation, no connectivity, no
  third-party chart or data rights that MAREA does not hold, no guaranteed alerting, no certification.

### 2.2 `CONSTRUCT-02` — Monitoring configuration: hardware plus subscription

**Verbal description of record:**

> "Imagine a concept for one unattended boat: a monitoring device installed on board that reports bilge,
> battery and shore-power conditions to you through an external service, plus a recurring service
> entitlement for alerts, stored history and notifications that depend on connectivity. The price we are
> talking about would be a first-year total: the equipment once plus twelve months of that service. It
> would not include installation labour, it would not include sensors beyond those described, it would
> not guarantee an alert or promise mobile coverage, and it would not include remote steering or
> integration with a marina's systems. Nothing is available and none of this exists yet — it is a
> description for this conversation."

- **Pricing mode:** `ONE_OFF_PLUS_SUBSCRIPTION` (first-year total tested as one figure).
- **Currency:** EUR.
- **VAT framing:** VAT-included consumer retail **hypothesis**, consistent with `PH-04` in
  `data/governance-status.json`. The MC-09 WATCH family hypothesis records `vatBasis OPEN`, so the
  VAT-inclusive framing is itself a hypothesis awaiting confirmation. Not tax advice, not a tax
  determination, not an approved price.
- **Exclusions restated every time:** no installation labour, no extra sensors, no alert guarantee, no
  coverage commitment, no remote helm control, no marina integration; hardware and service are not priced
  or approved separately by this instrument.

## 3. Frozen 5-point ascending ladders

The ladders below are **identical** to `data/pricing-ladders.json` (`constructs[].ladder`): same amounts,
same `pointIndex`, same order, same VAT framing, frozen 2026-11-01. Any discrepancy between this document
and the JSON is a freeze violation to be reported, not reconciled by editing either file after fielding
(D-031).

### 3.1 `CONSTRUCT-01` ladder — annual subscription, EUR, VAT-included hypothesis

| `pointIndex` | Amount (EUR/year) | Basis | Provenance |
| ---: | ---: | --- | --- |
| 1 | **49** | Observed anchor | `PRC-CMP-001` Orca Plus annual subscription, EUR 49/year, `vatTreatment = NOT_STATED_ON_PAGE` (`price-observations.json`) |
| 2 | **99** | Family hypothesis anchor | `familyPriceHypotheses.NAV` NAV-ESSENTIAL, EUR 99/year, `HYPOTHESIS_UNAPPROVED` (`governance-status.json`) |
| 3 | **149** | Observed anchor + family hypothesis anchor | `PRC-CMP-002` Orca Smart Navigation, EUR 149/year, `vatTreatment = NOT_STATED_ON_PAGE`; `familyPriceHypotheses.NAV` NAV-PRO EUR 149/year |
| 4 | **199** | Bracket probe (not observed) | Arithmetic extension of the uniform EUR 50 step above the observed/hypothesised band (`PRC-CMP-001`, `PRC-CMP-002`) |
| 5 | **249** | Upper bracket probe (not observed) | Arithmetic extension of the uniform EUR 50 step above the observed/hypothesised band (`PRC-CMP-001`, `PRC-CMP-002`) |

Ladder arithmetic: `49, 99, 149, 199, 249` — one uniform EUR 50 step, strictly ascending. The middle
anchors are cited MC-09 records (one observation and one unapproved family hypothesis); the two upper
points are hypothesis probes and are labelled as such wherever the ladder is reported. Relative to the EUR 149 NAV-PRO hypothesis, the upper points are 1.34×
and 1.67×, deliberately beyond the MC-09 `WTP-INS-01` guidance of roughly 0.6×–1.5×, so that the
analysis can distinguish gradual decline from a ceiling. They are **not** observations, not market facts
and not a demonstrated price ceiling.

### 3.2 `CONSTRUCT-02` ladder — first-year total, EUR, VAT-included hypothesis

| `pointIndex` | Amount (EUR, first-year total) | Basis | Provenance |
| ---: | ---: | --- | --- |
| 1 | **299** | Hardware hypothesis floor | `familyPriceHypotheses.WATCH` WATCH-CORE one-off hardware, EUR 299, `HYPOTHESIS_UNAPPROVED`; year-one total assumes no separate service fee |
| 2 | **349** | Bracket probe (not observed) | EUR 299 + EUR 50 uniform step |
| 3 | **399** | Hypothesis anchor | `PH-04` PROTECT hardware-plus-subscription hypothesis, EUR 399, `vatBasis VAT_INCLUDED_CONSUMER_RETAIL_HYPOTHESIS`, recorded as "not cost-justified by promised composition" |
| 4 | **449** | Bracket probe (not observed) | EUR 399 + EUR 50 uniform step |
| 5 | **499** | Upper bracket probe (not observed) | EUR 399 + EUR 100, 1.25× the `PH-04` anchor |

Ladder arithmetic: `299, 349, 399, 449, 499` — one uniform EUR 50 step, strictly ascending. The floor is
the unapproved hardware hypothesis with no separate service fee; the central anchor is the only MC-09
hypothesis that combines hardware with a separate subscription. The arithmetic
`299 + (12 × 9.90) = 417.80` from `familyPriceHypotheses.WATCH` brackets points 3 and 4 but **no ladder
amount equals it**, because the ladder is fixed at uniform steps. Cross-currency observations from
`PRC-CMP-027` (USD 299.99), `PRC-CMP-028` (USD 225/year) and `PRC-CMP-031` (USD 100/year) are **not**
converted and do not set any EUR ladder point.

### 3.3 Why these amounts and no others

Every amount is either a cited MC-09 observation, a cited unapproved MC-09 family price hypothesis, or an
arithmetic extension of the uniform step from a cited anchor, marked as a bracket probe. No amount is a
production cost, an approved price, a margin computation or a competitor figure invented for this file.
No amount may be changed, added or reordered after the first response is observed: the ladders are frozen
under `D-031`.

## 4. Fixed buy-response scale

The scale is fixed before fielding and is read identically at every price point. It is the MC-09
`WTP-INS-01` scale, and it is reproduced verbatim in `data/pricing-ladders.json`
(`constructs[].buyResponseScale`).

| Position | Code | Label read to the participant | Intent coding |
| ---: | --- | --- | --- |
| 1 | `DEFINITELY_WOULD_BUY` | "definitely would buy" | Top box |
| 2 | `PROBABLY_WOULD_BUY` | "probably would" | Second box |
| 3 | `MIGHT_BUY` | "might" | Middle |
| 4 | `PROBABLY_WOULD_NOT_BUY` | "probably would not" | Fourth box |
| 5 | `DEFINITELY_WOULD_NOT_BUY` | "definitely would not" | Bottom box |

Rules:

- The position order above is fixed. It is never reordered, reversed or abbreviated after a response is
  observed; showing a descending scale or changing the wording is a protocol deviation and invalidates the
  affected ladder.
- **No additional scale point is permitted.** A spontaneous "don't know", "depends", "I refuse to answer"
  or "not applicable" is recorded as `NO_SCALE_VALUE` with the participant's verbatim wording and the
  deviation flag; it is never mapped to "might", never treated as a rejection and never counted in an
  intent proportion. Refusals are reported with their count.
- The primary intent metric is the **top-two box** (position 1 + 2), with the top box alone reported as a
  secondary metric. Both are explicitly stated wherever a proportion is reported.
- The scale measures stated intent only; it is not a probability, not a purchase, not a forecast.

## 5. Administration rules

**R1 — Order.** The ladder is administered only after the qualitative block (`GUIDE-01`) and after the
subscription-attitude block (`pricing/MC10-SUBSCRIPTION-ATTITUDES.md`), so that price does not anchor the
problem discussion. Within a construct, points are always presented in the frozen ascending order
(`pointIndex` 1 → 5). A descending or randomised presentation is a different instrument and would require
a dated amendment before fielding; it is not part of this design.

**R2 — Frozen ladder, no adaptation.** The moderator may not re-order points, add or remove a point,
substitute an amount, round an amount, offer a "special" figure or adjust the ladder after observing a
response — including after the first interview. The exact amounts and wording in §2 and §3 are used
verbatim. The only permissible change is a new instrument version under `D-031`, with a dated amendment
and a new freeze; data collected under an earlier version stays evaluated under that version.

**R3 — Record every administered price and response.** For every participant × construct × price point,
the record contains: participant identifier, segment, construct identifier, `pointIndex`, amount, currency,
the VAT treatment exactly as stated for the tested figure, intent code, `responseTimeSeconds`, and the
verbatim answer to the probes. A point is administered only when it is asked; no point may be inferred,
imputed or filled from a previous response.

**R4 — No offer wording.** Each administration opens with the disclosure script (§5.1) and the tested
figure is described as "a hypothetical research figure". The moderator never says "the MAREA price",
"our price", "you could buy it for", "we could offer", "today's price" or any equivalent.

**R5 — Response time.** Every point's response time is recorded as a **quality flag only**. Per the
MC-09 `EXP-MC10-04` rule, any point answered in under 60 seconds is excluded from the analysis and
reported as excluded; the count of excluded points is reported with every result. The ≥ 60-second
criterion is a quality filter, not evidence that a response is valid: responses at or above 60 seconds
are retained, never scored as "high quality", and no response-time statistic is used to estimate
intent, confidence or conversion.

**R6 — No negotiation, no probing for a number.** If a participant asks "what would it actually cost?",
the moderator answers that no price is set, nothing is for sale, and the figures are research hypotheses.
The moderator does not bargain, does not ask "what would you pay?" inside the ladder, and does not disclose
the historical MC-09 figures (`EUR 499`, `EUR 1,399`, `EUR 1,990`, `EUR 399`, `EUR 3,490`) as benchmarks —
they are unapproved programme hypotheses and would anchor the response.

**R7 — Segments and quotas.** The minimum design is n ≥ 8 per segment per construct (MC-09
`EXP-MC10-04`). Segment quotas are recorded and enforced; a participant may not be reclassified into
another segment after seeing the ladder. Installers are asked the resale-price variant and reported as a
separate view, not pooled with owners.

**R8 — Consent and data handling.** Consent (C1–C4) is recorded before the module. No billing, card or
account data is collected. The repository may hold only aggregate operational counts; a real response
record belongs in the Layer A/B research store, which does not exist (`BLK-MC10-05`). No response record
may be committed to this repository.

### 5.1 Disclosure script (read aloud before the first point)

> "I am going to read some hypothetical annual figures for this concept, from the lowest to the highest,
> and after each one I want your honest reaction: definitely would buy, probably would, might, probably
> would not, or definitely would not. These are research figures, not offers. Nothing is for sale, you
> cannot reserve or buy anything, no price has been set, and no answer obliges you in any way. It is
> completely acceptable to say you would not buy at any price."

### 5.2 Probe script (after each point)

> "Why that answer? What would that figure need to include to feel fair? What exclusion would change your
> answer?"

Probes are recorded verbatim and are used for coding, not for adjusting the ladder or the scale.

## 6. Pre-registered analysis rule

The analysis rule is fixed before fielding. It is the operationalisation of the frozen MC-09
`EXP-MC10-04` threshold: "monotone decline in at least 4 of 5 ladders, no participant answering in under
60 seconds", with the resulting 50 % intent band labelled `HYPOTHESIS`.

### 6.1 Five pre-registered analysis ladders

To make "≥ 4 of 5 ladders" unambiguous, MC-10 pre-registers five analysis ladders:

| Ladder | Construct | Subject segment | Minimum n |
| --- | --- | --- | ---: |
| `L1` | `CONSTRUCT-01` | SEG-02 sailing yacht owners | 8 |
| `L2` | `CONSTRUCT-01` | SEG-01 recreational motorboat owners | 8 |
| `L3` | `CONSTRUCT-01` | SEG-03 marina-based unattended-vessel owners | 8 |
| `L4` | `CONSTRUCT-02` | SEG-03 marina-based unattended-vessel owners | 8 |
| `L5` | `CONSTRUCT-02` | SEG-01 recreational motorboat owners | 8 |

SEG-04 installers (resale-price variant) and SEG-07/SEG-08 operator views are reported separately and are
**not** counted towards the 4-of-5 rule. The mapping is fixed before fielding; changing it after seeing
data would be a threshold amendment under `D-031`.

### 6.2 Monotonicity rule

For each analysis ladder, compute the top-two-box intent proportion at each of the five frozen points.
The ladder is **monotone** when the proportion is non-increasing from point 1 to point 5 (equal adjacent
values are allowed). Any increase between adjacent points makes that ladder non-monotone. A non-monotone
ladder is **reported as non-monotone and invalidated for band estimation**; it is never smoothed,
reversed, trimmed or re-interpreted as "noise".

- **PASS for progression** (indicative only): at least **4 of the 5** analysis ladders are monotone,
  every excluded-for-time point is reported, each participating segment reaches n ≥ 8, and the monotone
  ladders produce either an estimable 50 % band or a recorded `NOT_ESTIMABLE` state — together a
  testable range for a later quantitative study with n ≥ 100 per segment. This is a data-consistency
  gate, not a demand finding, and no price may be approved from it.
- **FAIL:** the majority of analysis ladders are non-monotone or unusable.

### 6.3 50 % intent band (labelled `HYPOTHESIS`)

- The band is the price interval at which the top-two-box intent proportion crosses 50 %.
- Estimation is linear interpolation between the two adjacent frozen points that bracket 50 %. No
  curve-fitting, no parametric demand model and no smoothing are applied.
- If no two adjacent points bracket 50 % (intent above 50 % at the top point, or below 50 % at the bottom
  point), the band is `NOT_ESTIMABLE` for that ladder; it is never extrapolated beyond the frozen ladder.
- Every reported band carries the label `HYPOTHESIS`, the ladder identifier, the segment, the sample size
  and the number of time-excluded points. It is a testable range for a later quantitative study, not a
  price.
- The top-box band is reported alongside as a secondary, clearly weaker indicator, never as the primary
  estimate.

### 6.4 Reporting level

At the MC-10 exploratory sample size (n ≥ 8 per segment per construct) only raw counts and within-sample
percentages are reported. Confidence intervals, significance tests and segment-to-segment comparison tests
require about 100 completed responses per segment per construct (MC-09 `WTP-INS-01`); they are not
computed in MC-10.

## 7. Explicit prohibitions

| Prohibited output | Why it is prohibited here |
| --- | --- |
| Conversion rate or purchase probability | Stated intent at n = 5–10 per segment cannot estimate conversion; intent-behaviour gaps are uncorrected and uncorrectable in this design |
| Price elasticity | Requires observed price/quantity variation and real demand; a hypothetical ladder does not provide either |
| Revenue, revenue-maximising point or recurring-revenue estimate | MC-10 forbids any revenue figure derived from hypothetical intent; no revenue-maximisation arithmetic is performed in this milestone |
| Margin, contribution or break-even figure | No production cost, BOM or supplier quotation exists; `PROFITABILITY_NOT_ESTABLISHED` |
| Price approval, price publication or "validated willingness to pay" | `APPROVED_PRICES = 0`; `WTP_COMMERCIALLY_VALIDATED = false`; no approval path exists in MC-10 |
| Offer, quotation, reservation, pre-order or deposit | Nothing is for sale; no price may be presented as purchasable |
| Demand curve, forecast, market share or sales projection | The instrument is stated preference for a non-existent concept |
| A "MAREA price" | The ladder is a hypothesis set; the historical MC-09 figures are unapproved hypotheses, not benchmarks |

## 8. Results — empty

No ladder was administered and no point was administered. Every band is `NOT_COMPUTED` or
`NOT_ESTIMABLE` with denominator `0`.

### 8.1 Overall

| Measure | Result | Denominator |
| --- | --- | --- |
| Constructs with a frozen ladder | 2 | — |
| Price points frozen in total | 10 | — |
| Price points administered | **0** | — |
| Participant responses recorded | **0** | — |
| Ladders completed | **0** | — |
| Points excluded for response time | **0** | — |
| Monotone ladders observed | `NOT_COMPUTED` | 0 |
| 4-of-5 monotonicity gate | `NOT_COMPUTED` | 0 |

### 8.2 Per analysis ladder

| Ladder | Construct | Segment | n | Points administered | Top-two-box proportions | Monotonicity | 50 % intent band | State |
| --- | --- | --- | ---: | ---: | --- | --- | --- | --- |
| `L1` | `CONSTRUCT-01` | SEG-02 | 0 | 0 | `NOT_COMPUTED` | `NOT_COMPUTED` | `NOT_ESTIMABLE` | `NOT_MEASURED` |
| `L2` | `CONSTRUCT-01` | SEG-01 | 0 | 0 | `NOT_COMPUTED` | `NOT_COMPUTED` | `NOT_ESTIMABLE` | `NOT_MEASURED` |
| `L3` | `CONSTRUCT-01` | SEG-03 | 0 | 0 | `NOT_COMPUTED` | `NOT_COMPUTED` | `NOT_ESTIMABLE` | `NOT_MEASURED` |
| `L4` | `CONSTRUCT-02` | SEG-03 | 0 | 0 | `NOT_COMPUTED` | `NOT_COMPUTED` | `NOT_ESTIMABLE` | `NOT_MEASURED` |
| `L5` | `CONSTRUCT-02` | SEG-01 | 0 | 0 | `NOT_COMPUTED` | `NOT_COMPUTED` | `NOT_ESTIMABLE` | `NOT_MEASURED` |

### 8.3 Per construct and frozen point

| Construct | Point 1 | Point 2 | Point 3 | Point 4 | Point 5 | Responses |
| --- | --- | --- | --- | --- | --- | ---: |
| `CONSTRUCT-01` (EUR/year) | 49 — `NOT_MEASURED` | 99 — `NOT_MEASURED` | 149 — `NOT_MEASURED` | 199 — `NOT_MEASURED` | 249 — `NOT_MEASURED` | 0 |
| `CONSTRUCT-02` (EUR first-year total) | 299 — `NOT_MEASURED` | 349 — `NOT_MEASURED` | 399 — `NOT_MEASURED` | 449 — `NOT_MEASURED` | 499 — `NOT_MEASURED` | 0 |

### 8.4 Verdict and what would count

**Verdict.** `BLOCKED` / `NOT_EXECUTED`. Not `PASS`, not `FAIL`, not `INCONCLUSIVE`. The ladder set is
frozen and unadministered; no band, no curve and no monotonicity result exists.

**What would count as evidence.** Real eligible participants from the pre-registered segments; every
participant answering all five frozen points; n ≥ 8 per segment per construct; recorded intent codes,
response times and probe verbatims; the time-exclusion rule applied and reported; the monotonicity rule
evaluated with non-zero denominators; and the 50 % band computed by the pre-registered interpolation.

**Permitted next step.** None until `AUTH-MC10-001` is issued. A monotone result would license only the
design of a quantitative pricing study with n ≥ 100 per segment; it would never license a price.

## 9. Interpretation limits

1. **Stated intent is not demand.** Hypothetical bias systematically overstates purchase; the bias is
   reported, not corrected.
2. **The constructs do not exist.** Composition is described only in words; excluded installation and
   chart-licence costs may inflate intent.
3. **Anchoring is a live risk.** The preceding qualitative discussion and the ascending order can anchor
   responses; the design controls the order but cannot eliminate the bias, and no anchor-correction
   coefficient will be invented.
4. **Non-monotonicity invalidates a ladder** rather than being smoothed; with n = 8 per segment the gate
   can fail for legitimate sampling reasons and that failure must be published.
5. **A 50 % band is a `HYPOTHESIS`**, is bounded by the frozen points, and is not a price, an offer or a
   validated willingness to pay.
6. **The numbers are hypotheses.** `49`, `99`, `149`, `199`, `249`, `299`, `349`, `399`, `449` and `499`
   are research hypotheses in EUR derived from cited MC-09 records; none is approved, published, costed or
   available.
7. **Zero responses are absence of data.** No conclusion about price sensitivity, acceptance or rejection
   may be drawn from this document.

## 10. Traceability

| Source | Use in this document |
| --- | --- |
| `docs/marea/market-validation/data/validation-experiments.json` (`EXP-MC10-04`) | Frozen hypothesis, minimum evidence, threshold, confounders |
| `docs/marea/market-validation/MC09-VALIDATION-EXPERIMENTS.md` §`EXP-MC10-04` | Registered narrative version |
| `docs/marea/market-validation/economics/MC09-PRICING-AND-WTP.md` §5.1 | `WTP-INS-01` design: 5–7 points, fixed scale, 50 % band, limitations |
| `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` §7.2 | PRICE-01 English module wording and probe structure |
| `docs/marea/market-validation/data/price-observations.json` | `PRC-CMP-001` EUR 49/year; `PRC-CMP-002` EUR 149/year (observed anchors) |
| `docs/marea/market-validation/data/governance-status.json` | `familyPriceHypotheses.NAV`, `familyPriceHypotheses.WATCH`, `PH-04` (unapproved anchors) |
| `docs/marea/customer-discovery/data/pricing-ladders.json` | Frozen ladder mirror, buy-response scale, provenance and limitations |
| `docs/marea/customer-discovery/data/research-status.json` | Zero counts and commercial invariants |
| `docs/marea/customer-discovery/data/fieldwork-authorization.json` | `AUTH-MC10-001` gate |
| `docs/marea/customer-discovery/MC10-EXPERIMENT-RESULTS.md` §4 | Milestone-level classification of `EXP-MC10-04` |

Path convention: short citations `price-observations.json` and `governance-status.json` refer to the MC-09
authority files under `docs/marea/market-validation/data/` (the files that contain the price records,
`historicalPriceHypotheses` and `familyPriceHypotheses`); short citations `data/research-status.json`,
`data/fieldwork-authorization.json` and `data/pricing-ladders.json` refer to
`docs/marea/customer-discovery/data/`. The MC-10 mirror `docs/marea/customer-discovery/data/governance-status.json`
mirrors the status invariants only and is cited for those statuses.

## 11. Status effect

```
EXP-MC10-04                     = NOT_EXECUTED
CONSTRUCTS_FROZEN               = 2
PRICE_POINTS_FROZEN             = 10
PRICE_POINTS_ADMINISTERED       = 0
PRICE_RESPONSES                 = 0
LADDERS_COMPLETED               = 0
MONOTONICITY_RESULT             = NOT_COMPUTED
FIFTY_PERCENT_INTENT_BAND       = NOT_ESTIMABLE
WTP_STATED_PREFERENCE_OBSERVED  = false
WTP_COMMERCIALLY_VALIDATED      = false
APPROVED_PRICES                 = 0
PROFITABILITY                   = NOT_ESTABLISHED
VERDICT                         = BLOCKED
```

No price may be approved, published, presented as an offer or converted into a revenue, elasticity or
conversion estimate on the basis of this document.
