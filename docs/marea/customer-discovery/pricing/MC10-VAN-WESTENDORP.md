# MC-10 — Van Westendorp price sensitivity meter: design and empty results (EXP-MC10-05)

| Field | Value |
| --- | --- |
| Document ID | MC-10 / D14 / MC10-VAN-WESTENDORP |
| Milestone | MC-10 of 36 — primary customer discovery (Wave 2 pricing design) |
| Experiment | `EXP-MC10-05` — Acceptable price range, Van Westendorp |
| Instrument | `WTP-INS-02` — Van Westendorp price-sensitivity meter (MC-09 design) |
| Status | `NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED)` |
| Fieldwork executed | **none** — no candidate identified, contacted, screened or interviewed |
| Modules administered | **0** |
| Raw price answers recorded | **0** |
| Derived ranges computed | **none** — `NOT_COMPUTED` |
| WTP state | `WTP_STATED_PREFERENCE_OBSERVED = false` · `WTP_COMMERCIALLY_VALIDATED = false` · `APPROVED_PRICES = 0` · `PROFITABILITY_NOT_ESTABLISHED` |
| Frozen mirror | `docs/marea/customer-discovery/data/pricing-ladders.json` (`constructs[].vanWestendorpQuestions`) |
| Ladder freeze hash | `SHA-256(constructs) = bfa09ebc904a66ba65961864d5e026638e3756a41a0611f0c3fdf1e83bb5be8c` — recorded in `data/pricing-ladders.json` as `freeze.constructsSha256` |
| Date | 2026-11-01 |
| Owner | Pricing and Behavioral Research Economist (`agent-e-pricing`) |
| Write scope | `docs/marea/customer-discovery/pricing/` (3 files) and `docs/marea/customer-discovery/data/pricing-ladders.json` only |
| Is not | Not a price list · not an offer · not an acceptable price · not a willingness-to-pay measurement · not a conversion, elasticity or revenue estimate |

## 0. How to read this document

This document freezes the Van Westendorp module for `EXP-MC10-05` and records that **no module was
administered**. It contains the four original price-perception questions, the per-construct
administration rules, the raw-answer recording contract, the consistency rule, the derived acceptable-range
method (labelled `HYPOTHESIS`), the pre-registered threshold, and empty results: `0` modules, `0` raw
answers, ranges `NOT_COMPUTED`.

The forbidden transformation is:

> "The price-perception meter was designed and the range method was specified, therefore an acceptable
> price range exists."

No range exists. A method that would compute one if data existed is not a result. No figure in this
document is a price, an offer, a range or a validated willingness to pay.

## 1. Status and authoritative invariants

| Invariant | Value | Source |
| --- | --- | --- |
| Outreach authorisation | `NOT_GRANTED` (`AUTH-MC10-001`) | `data/fieldwork-authorization.json` |
| Fieldwork status | `BLOCKED` | `data/research-status.json` |
| Van Westendorp modules completed | `0` | `data/research-status.json` (`pricing.vanWestendorpModulesCompleted`) |
| Price responses recorded | `0` | `data/research-status.json` (`pricing.priceResponsesRecorded`) |
| `WTP_STATED_PREFERENCE_OBSERVED` | `false` | `data/research-status.json` |
| `WTP_COMMERCIALLY_VALIDATED` | `false` | `data/research-status.json` |
| `APPROVED_PRICES` | `0` | `data/research-status.json` |
| Profitability | `PROFITABILITY_NOT_ESTABLISHED` | `data/research-status.json` |
| Frozen questions | 4 per construct, identical to `data/pricing-ladders.json` | `data/pricing-ladders.json` |

## 2. Constructs and module structure

The Van Westendorp module runs on the same two constructs as the Gabor–Granger ladder
(`pricing/MC10-GABOR-GRANGER.md` §2), but in a **separate section** so that the four price-perception
questions are not contaminated by the intent ladder (MC-09 `EXP-MC10-05`).

| Construct | Subject of the four questions | Tested price basis | Notes |
| --- | --- | --- | --- |
| `CONSTRUCT-01` | Navigation and onboard-data reference configuration — one year of access, one vessel, one account | Annual subscription | Hardware, display, installation, connectivity and unheld chart/data rights excluded from the description |
| `CONSTRUCT-02` | Monitoring configuration — hardware plus subscription | First-year total (equipment once plus twelve months of service) | Installation, extra sensors, alert guarantee and coverage commitments excluded |

Separation rules:

- The module is administered **after** the Gabor–Granger ladder and after a marked section break. The
  previous ladder answers are not shown, read back or referenced; the four questions are asked
  independently.
- Each construct's four questions are asked once, in the fixed order of §3, with no amount displayed or
  suggested by the moderator.
- Responses for `CONSTRUCT-01` and `CONSTRUCT-02` are recorded and analysed separately; there is no pooling
  of constructs.
- The MC-09 `EXP-MC10-05` hypothesis also names weather software. In MC-10 the Van Westendorp module
  covers only the two frozen constructs above; weather-data subscription attitudes are assessed in the
  separate subscription block (scope S3 in `pricing/MC10-SUBSCRIPTION-ATTITUDES.md`). No weather-specific
  acceptable range is pre-registered or claimed.

## 3. The four original questions

The wording is the MC-09 `WTP-INS-02` wording, adapted only by naming the construct. It is identical in
`data/pricing-ladders.json` (`constructs[].vanWestendorpQuestions`) and is read verbatim.

| ID | Position | Question as read to the participant |
| --- | ---: | --- |
| `VW-TOO-CHEAP` | 1 | "At what price would this concept seem so cheap that you would doubt its quality?" |
| `VW-BARGAIN` | 2 | "At what price would this concept seem a bargain, a good buy?" |
| `VW-EXPENSIVE` | 3 | "At what price would this concept start to seem expensive, though you might still consider it?" |
| `VW-TOO-EXPENSIVE` | 4 | "At what price would this concept seem so expensive that you would not buy it?" |

Rules:

- The order 1 → 4 is fixed before fielding. Reordering, reversing, adding a "what would you pay?"
  question or substituting a band for a point answer is a different instrument and would require a dated
  amendment under `D-031` before fielding; it is not part of this design.
- Answers are **open**, in the participant's own amount and currency. The moderator never offers a list,
  a range, a starting figure or a "typical" figure, and never suggests that an answer is too high or too
  low.
- After each of the four answers, the moderator asks the basis probe in §4.2 before moving to the next
  question. The amount first stated is never re-asked in order to "fix" it.
- "Don't know", "I refuse" and "depends" are recorded as `NO_ANSWER` with the verbatim reason. They are
  never converted into a number, a zero or a mid-point.

## 4. Per-construct administration

### 4.1 Order of a module

For each construct, in this order: the neutral construct description (identical to the Gabor–Granger
description, read again in the same words), the exploratory-price disclosure, question `VW-TOO-CHEAP`,
basis probe, question `VW-BARGAIN`, basis probe, question `VW-EXPENSIVE`, basis probe, question
`VW-TOO-EXPENSIVE`, basis probe, then the module close. There is no display of any prior answer at any
point, and the four answers are never shown to the participant together.

### 4.2 Basis probe after every answer (mandatory)

> "What are you thinking of when you say that: a one-off payment, an annual fee, or something else? Is
> installation included in that figure or separate? Is the amount you said including VAT or excluding it?"

The probe establishes the **basis** of each answer. Without a recorded basis an answer is unusable, and
that unusability is reported rather than inferred away.

### 4.3 Disclosure script (read aloud before the first question of each construct)

> "Now I will ask four short questions about what different prices would mean to you for this concept.
> These are your impressions, not an offer or a negotiation. Nothing is for sale, no price has been set,
> and no figure you give will be passed to anyone as a price. Please answer in whatever currency and with
> whatever tax treatment comes naturally to you, and tell me what you are thinking of after each answer."

### 4.4 Module close (read aloud)

> "Is there any price or payment structure I have not described that would change your answers? Which part
> of the price is hardest to justify?"

### 4.5 Prohibited interviewer behaviour

- No anchoring amount, range, band or "market rate" is mentioned.
- No correction of an answer, no "are you sure?", no scaling of an answer to a plausible level.
- No implication that the amount will be used to set a price, that the concept is available, or that a
  low answer is unhelpful.
- No mixing of the four questions with the Gabor–Granger intent scale, and no re-asking the intent
  questions inside this section.
- No collection of billing, card, account or income data.

## 5. Raw-answer recording contract

Every answer is recorded raw, exactly as stated, before any derived value exists. The raw layer and the
derived layer are stored separately; derived values never overwrite raw values. No participant data is
committed to this repository (Layer A/B storage does not exist, `BLK-MC10-05`); the schema below is the
contract for the research store, not a repository file.

| Field | Type / allowed values | Rule |
| --- | --- | --- |
| `responseId` | string | Unique per question per participant per construct |
| `participantId` | pseudonymous string | No name, contact or vessel identifier |
| `segmentId` | `SEG-01` … `SEG-08` | Fixed before administration |
| `constructId` | `CONSTRUCT-01` · `CONSTRUCT-02` | No pooling |
| `questionId` | `VW-TOO-CHEAP` · `VW-BARGAIN` · `VW-EXPENSIVE` · `VW-TOO-EXPENSIVE` | Fixed order |
| `amountAsStated` | number or `NO_ANSWER` | Raw form; no rounding, no imputation |
| `currencyAsStated` | ISO 4217 as stated, or `NOT_STATED` | **No conversion inside the raw record** |
| `vatTreatmentAsStated` | `VAT_INCLUDED` · `VAT_EXCLUDED` · `NOT_STATED` · `MIXED_AS_STATED` · `UNCLEAR_AS_STATED` | Exactly as spoken; never inferred |
| `priceBasisAsStated` | `ONE_OFF` · `RECURRING` · `MIXED` · `UNCLEAR` · `NO_ANSWER` | Whether the respondent meant one-off or recurring |
| `periodAsStated` | `ONE_OFF` · `PER_MONTH` · `PER_YEAR` · `PER_SEASON` · `UNSPECIFIED` | As stated, never derived |
| `installationBasisAsStated` | `INCLUDED` · `EXCLUDED` · `UNCLEAR` · `NOT_ASKED` | From the mandatory probe |
| `verbatimReasoning` | string, quoted only with consent C3 | No invented amount the participant did not state |
| `responseTimeSeconds` | integer or `NOT_RECORDED` | Quality flag only |
| `consistencyFlag` | `CONSISTENT` · `VW_INCONSISTENT` · `INCOMPLETE` · `UNUSABLE` | Assigned after all four answers, per §6 |

Recording rules:

1. The amount is recorded in the currency the participant used. There is no conversion, no
   net-of-VAT normalisation and no period annualisation inside the raw record.
2. The basis (`ONE_OFF` vs `RECURRING`, period, installation, VAT) is recorded **per answer**, not once per
   participant: the same participant may answer one question as a one-off and another as an annual fee, and
   that difference is data.
3. If a participant gives a range instead of a point, the range is recorded verbatim with both bounds; the
   study does not silently convert it to a mid-point. Range answers are flagged and excluded from the
   point-based crossing method only if the range is unusable; the count and reason are reported.
4. If a participant revises an answer immediately ("no, make it 500"), the first answer is retained and the
   revision is recorded with its reason and flagged; the moderator does not adjudicate which is "correct".
5. Unknown fields stay empty. A missing value is never recorded as `0`.

## 6. Consistency rule

Internal consistency of a module is assessed after all four answers exist:

```
VW-TOO-CHEAP  <  VW-BARGAIN  <  VW-EXPENSIVE  <  VW-TOO-EXPENSIVE
```

Rules:

1. The comparison is made **only on answers with the same recorded basis** (same currency, same VAT
   treatment, same `priceBasisAsStated` and compatible `periodAsStated`). Answers with differing bases are
   flagged `UNUSABLE` rather than compared across bases.
2. A module is `CONSISTENT` only when all four answers are present, carry a comparable basis, and satisfy
   the strict ordering.
3. Any violation — a tie, an inversion, a missing answer or a basis mismatch — is flagged
   `VW_INCONSISTENT`, `INCOMPLETE` or `UNUSABLE` respectively and **recorded raw**.
4. Violations are **never silently corrected**: no swapping of answers, no deletion of an outlier, no
   substitution of a plausible figure, no "cleaning" of a response to make it consistent.
5. The consistency rate is computed on a stated denominator and reported with the raw counts of each flag.
   A low consistency rate is published, not hidden.

**Operationalisation of the threshold.** The MC-09 `EXP-MC10-05` wording "≥ 70 % of responses are internally
consistent" is operationalised at **module level** — a module is the four-answer set — because internal
consistency is a property of the set, not of a single answer. The operationalisation is fixed before
fielding; an answer-level alternative would be a different analysis and would require an amendment under
`D-031` before data exist.

## 7. Derived analysis: point of marginal cheapness, point of marginal expensiveness and acceptable range

All derived values are labelled `HYPOTHESIS`, are computed only from raw answers with a comparable basis,
and are reported with their sample size and the count of excluded answers. No derived value is a price.

### 7.1 Cumulative curves

For each construct and segment, the raw answers are converted to four cumulative distributions:

- **"Too cheap"** cumulative: the share of respondents whose `VW-TOO-CHEAP` point is at or above a given
  price. It declines as price rises.
- **"Bargain"** cumulative: the share whose `VW-BARGAIN` point is at or above a given price. It declines as
  price rises.
- **"Expensive"** cumulative: the share whose `VW-EXPENSIVE` point is at or below a given price. It rises as
  price rises.
- **"Too expensive"** cumulative: the share whose `VW-TOO-EXPENSIVE` point is at or below a given price. It
  rises as price rises.

No smoothing, no parametric curve, no weighting by external data and no invented correction factor is
applied.

### 7.2 Derived points

| Derived point | Definition | Label |
| --- | --- | --- |
| **Point of marginal cheapness (PMCM)** | The price at which the "too cheap" cumulative curve intersects the "expensive" cumulative curve; the lower bound of the acceptable range | `HYPOTHESIS` |
| **Point of marginal expensiveness (PME)** | The price at which the "bargain" cumulative curve intersects the "too expensive" cumulative curve; the upper bound of the acceptable range | `HYPOTHESIS` |
| **Acceptable range** | The interval `[PMCM, PME]`, reported only when `PMCM < PME` | `HYPOTHESIS` |

Method rules, fixed before fielding:

1. Intersections are estimated by linear interpolation between the adjacent observed price points of the
   two curves. No extrapolation beyond the observed answer range.
2. A crossing that does not occur inside the observed range yields `NOT_ESTIMABLE` for that point; no
   artificial bound is created.
3. **Non-degenerate range definition** (pre-registered): both intersections are estimable, `PMCM < PME`,
   and each intersection is supported by at least two respondents on each side of the crossing. A range
   that fails any condition is reported as degenerate and is not used.
4. The optimal price point (the crossing of the "too cheap" and "too expensive" curves) is a known Van
   Westendorp output, but **MC-10 deliberately does not compute or report it**: a figure labelled "optimal
   price" invites treatment as an approved price, which this milestone prohibits. It may be added only in
   a later, separately authorised analysis with a new freeze.
5. Every derived range carries: construct, segment, `n`, number of raw answers used, number excluded and
   why, the label `HYPOTHESIS`, and the explicit statement that it is not an offer, a price or a
   willingness-to-pay measurement.
6. No statistical test, confidence interval or significance claim is produced at n = 8–10 per segment per
   construct. Segment-level ranges below the minimum sample are `NOT_COMPUTED`.

### 7.3 Cost-floor flag

The MC-09 rule requires any derived range whose lower bound sits below a defensible cost floor to be
flagged for negative-margin review — a warning, not a price decision. MC-10 cannot compute that flag:
no production cost, bill of materials, supplier quotation, installation rate or margin exists, and
`PROFITABILITY_NOT_ESTABLISHED` is an invariant. The cost floor is therefore `NOT_ESTABLISHED` and the flag
state is `NOT_COMPUTABLE`; a future analysis may not substitute a retail hypothesis for a cost floor.

## 8. Pre-registered decision threshold (`EXP-MC10-05`)

The threshold is frozen from `docs/marea/market-validation/data/validation-experiments.json` (MC-09
registry, verified by record hash in `data/experiments.json`; see `MC10-EXPERIMENT-RESULTS.md` §11). It may
not be relaxed, reworded or re-scoped after fielding (D-031).

> **`PASS` (usable price structure):** ≥ 70 % of responses are internally consistent **and** the sample
> produces a non-degenerate acceptable range (range exists and is bounded by at least two responses on
> each side).
>
> **`FAIL`:** fewer than 50 % of responses are consistent, **or** the answers are effectively
> uninterpretable because participants cannot separate hardware, software and installation cost.
>
> **Between 50 % and 70 %, or a degeneracy in only one construct:** `INCONCLUSIVE`. Ambiguity defaults to
> `INCONCLUSIVE`, never to `PASS`.

The threshold is applied **per construct**: a construct that fails the non-degeneracy condition is
evaluated on its own and is never rescued by the other construct's result.

Operational definitions, fixed before fielding:

- **Denominator** for the consistency rate: completed modules for the construct (all four answers
  attempted), as operationalised in §6. Raw counts of every flag are reported alongside.
- **"Non-degenerate"**: the §7.2 definition, including the two-respondent support condition on each side of
  each crossing.
- **Minimum sample:** n ≥ 8 completed modules per segment per construct (MC-09 `EXP-MC10-05`). A segment
  below the minimum is reported `INCONCLUSIVE` with its count; segments are never pooled to reach a
  threshold.
- **Uninterpretability:** if more than half of a construct's completed modules are flagged `UNUSABLE`
  because the basis probe could not separate hardware, software, installation or recurring versus one-off
  cost, the construct is `FAIL` regardless of the consistency rate. This mirrors the registered wording.

Current evaluation: `0` completed modules in every segment, so the consistency rate is `NOT_COMPUTED`
(`0/0`), the range is `NOT_COMPUTED`, and the verdict is `BLOCKED` (`NOT_EXECUTED`). A `BLOCKED` verdict
is **not** a `FAIL`: no response was ever collected.

## 9. Analysis plan (applies only if the module is ever executed)

1. Report per construct, per segment: completed modules, raw answers, flag counts, consistency rate,
   estimated `PMCM` and `PME` (if any), the acceptable range labelled `HYPOTHESIS`, and excluded answers
   with reasons.
2. Report **basis distribution** per answer: how many answers were one-off, recurring, mixed or unclear;
   how many stated VAT inclusive or exclusive; how many included installation. A range computed from
   mixed bases is not reported.
3. Report **negative and degenerate cases explicitly** — inconsistent modules, missing answers,
   non-crossing curves and ranges supported by too few respondents. Degeneracy is a result, not an
   embarrassment.
4. No pooling across constructs, no pooling across segments to reach n, no cross-currency conversion and
   no net-of-VAT restructuring of raw answers.
5. No conversion of the range into a price, a revenue figure, an elasticity or a conversion estimate; no
   recommendation to set a price at any point of the range.
6. Decision record: `PASS` / `FAIL` / `INCONCLUSIVE` / `BLOCKED` with threshold, observed counts,
   confounders and the permitted next step. Where the decision depends on coding judgement, the
   disagreement is reported.

## 10. Interpretation limits

1. **Stated preference, not behaviour.** Van Westendorp answers are opinions about hypothetical prices for a
   concept that does not exist; they cannot measure purchase behaviour or willingness to pay.
2. **A range is not a price.** `PMCM`, `PME` and the acceptable range are `HYPOTHESIS` values. They do not
   approve a price, cannot be published as one, and do not create an offer.
3. **Small n per segment.** n = 8–10 per segment per construct makes range boundaries unstable; no
   segment-level confidence claim is made and the boundaries are reported with their sample.
4. **Basis confusion is a validity threat.** Participants may mix hardware, installation, chart licences
   and recurring service into one mental price; the basis probe and the `UNUSABLE` flag mitigate but cannot
   eliminate it.
5. **Cross-border currency and VAT confusion** is recorded as stated, never normalised; cross-currency
   comparisons are not made.
6. **The cost-floor warning cannot be computed** because no defensible cost floor exists; a range below a
   future cost floor would require negative-margin review, and the floor itself is `NOT_ESTABLISHED`.
7. **Zero modules are absence of data.** This document does not establish that owners hold a coherent
   range, that they do not, or that any amount is acceptable or unacceptable.

## 11. Results — empty

No module was administered. Every table row below is an operational count or a measurement state, not a
finding.

### 11.1 Overall

| Measure | Result | Denominator |
| --- | --- | --- |
| Constructs with a frozen four-question set | 2 | — |
| Van Westendorp modules administered | **0** | — |
| Raw price answers recorded | **0** | — |
| Modules internally consistent | `NOT_COMPUTED` | 0 |
| Modules flagged `VW_INCONSISTENT` | **0** | 0 |
| Modules flagged `UNUSABLE` | **0** | 0 |
| Answers with a recorded basis (one-off / recurring) | **0** | 0 |
| `PMCM` estimated | `NOT_COMPUTED` | 0 |
| `PME` estimated | `NOT_COMPUTED` | 0 |
| Acceptable range | `NOT_COMPUTED` | 0 |
| Cost-floor flag | `NOT_COMPUTABLE` | — |
| `PASS` / `FAIL` evaluation | `NOT_COMPUTED` | 0 |

### 11.2 Per construct

| Construct | Modules | Raw answers | Consistency rate | `PMCM` | `PME` | Acceptable range | State |
| --- | ---: | ---: | --- | --- | --- | --- | --- |
| `CONSTRUCT-01` | 0 | 0 | `NOT_COMPUTED` | `NOT_COMPUTED` | `NOT_COMPUTED` | `NOT_COMPUTED` | `NOT_MEASURED` |
| `CONSTRUCT-02` | 0 | 0 | `NOT_COMPUTED` | `NOT_COMPUTED` | `NOT_COMPUTED` | `NOT_COMPUTED` | `NOT_MEASURED` |

### 11.3 Per segment and construct

| Segment | `CONSTRUCT-01` modules | `CONSTRUCT-02` modules | Consistency | Acceptable range |
| --- | ---: | ---: | --- | --- |
| SEG-01 Recreational motorboat owners | 0 | 0 | `NOT_COMPUTED` | `NOT_COMPUTED` |
| SEG-02 Sailing yacht owners | 0 | 0 | `NOT_COMPUTED` | `NOT_COMPUTED` |
| SEG-03 Marina-based unattended-vessel owners | 0 | 0 | `NOT_COMPUTED` | `NOT_COMPUTED` |
| SEG-04 Marine electronics installers | 0 | 0 | `NOT_COMPUTED` | `NOT_COMPUTED` |
| SEG-05 Marine retailers and chandlers | 0 | 0 | `NOT_COMPUTED` | `NOT_COMPUTED` |
| SEG-06 Marina or shipyard operators | 0 | 0 | `NOT_COMPUTED` | `NOT_COMPUTED` |
| SEG-07 Charter operators and sailing schools | 0 | 0 | `NOT_COMPUTED` | `NOT_COMPUTED` |
| SEG-08 Fleet managers | 0 | 0 | `NOT_COMPUTED` | `NOT_COMPUTED` |

### 11.4 Per question

| Question | `CONSTRUCT-01` answers | `CONSTRUCT-02` answers | Basis recorded (one-off / recurring) | State |
| --- | ---: | ---: | --- | --- |
| `VW-TOO-CHEAP` | 0 | 0 | 0 / 0 | `NOT_MEASURED` |
| `VW-BARGAIN` | 0 | 0 | 0 / 0 | `NOT_MEASURED` |
| `VW-EXPENSIVE` | 0 | 0 | 0 / 0 | `NOT_MEASURED` |
| `VW-TOO-EXPENSIVE` | 0 | 0 | 0 / 0 | `NOT_MEASURED` |

### 11.5 Verdict and what would count

**Verdict.** `BLOCKED` / `NOT_EXECUTED`. Not `PASS`, not `FAIL`, not `INCONCLUSIVE`. No module was
administered, so there is no consistency rate, no `PMCM`, no `PME` and no acceptable range.

**What would count as evidence.** Real eligible participants; all four questions answered per construct;
the mandatory basis recorded for every answer (currency, VAT treatment, one-off versus recurring,
installation included or separate); n ≥ 8 completed modules per segment per construct; consistency assessed
per module with violations retained raw; the pre-registered crossing method applied with reported exclusion
counts; and a non-degenerate range for the construct.

**Permitted next step.** None until `AUTH-MC10-001` is issued and Wave-0 preconditions are met. A usable
range would narrow the design space for a quantitative study; it would not approve a price.

## 12. Traceability

| Source | Use in this document |
| --- | --- |
| `docs/marea/market-validation/data/validation-experiments.json` (`EXP-MC10-05`) | Frozen hypothesis, minimum evidence, threshold, confounders |
| `docs/marea/market-validation/MC09-VALIDATION-EXPERIMENTS.md` §`EXP-MC10-05` | Registered narrative version |
| `docs/marea/market-validation/economics/MC09-PRICING-AND-WTP.md` §5.2 | `WTP-INS-02` design: four questions, per-construct administration, method and limitations |
| `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` §7.2 | PRICE-01 English module wording (four questions and basis probe) |
| `docs/marea/customer-discovery/data/pricing-ladders.json` | Frozen four-question sets and construct descriptions used by the module |
| `docs/marea/customer-discovery/data/research-status.json` | Zero counts and commercial invariants |
| `docs/marea/customer-discovery/data/fieldwork-authorization.json` | `AUTH-MC10-001` gate |
| `docs/marea/customer-discovery/MC10-EXPERIMENT-RESULTS.md` §5 | Milestone-level classification of `EXP-MC10-05` |

Path convention: short citations `price-observations.json` and `governance-status.json` refer to the MC-09
authority files under `docs/marea/market-validation/data/`; short citations `data/research-status.json`,
`data/fieldwork-authorization.json` and `data/pricing-ladders.json` refer to
`docs/marea/customer-discovery/data/`. The MC-10 mirror `docs/marea/customer-discovery/data/governance-status.json`
mirrors the status invariants only and is cited for those statuses.

## 13. Status effect

```
EXP-MC10-05                     = NOT_EXECUTED
CONSTRUCTS_WITH_FROZEN_QUESTIONS = 2
MODULES_ADMINISTERED            = 0
RAW_PRICE_ANSWERS               = 0
CONSISTENCY_RATE                = NOT_COMPUTED (0/0)
PMCM                            = NOT_COMPUTED
PME                             = NOT_COMPUTED
ACCEPTABLE_RANGE                = NOT_COMPUTED
COST_FLOOR_FLAG                 = NOT_COMPUTABLE
WTP_STATED_PREFERENCE_OBSERVED  = false
WTP_COMMERCIALLY_VALIDATED      = false
APPROVED_PRICES                 = 0
PROFITABILITY                   = NOT_ESTABLISHED
VERDICT                         = BLOCKED
```

No price may be approved, published, presented as an offer or converted into a revenue, elasticity or
conversion estimate on the basis of this document.
