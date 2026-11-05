# MC-10 — Subscription acceptance: research design and empty results (EXP-MC10-03)

| Field | Value |
| --- | --- |
| Document ID | MC-10 / D12 / MC10-SUBSCRIPTION-ATTITUDES |
| Milestone | MC-10 of 36 — primary customer discovery (Wave 2 pricing design) |
| Experiment | `EXP-MC10-03` — Subscription acceptance |
| Status | `NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED)` |
| Fieldwork executed | **none** — no candidate identified, contacted, screened or interviewed |
| Participants completing the block | **0** |
| Price responses recorded | **0** |
| WTP state | `WTP_STATED_PREFERENCE_OBSERVED = false` · `WTP_COMMERCIALLY_VALIDATED = false` · `APPROVED_PRICES = 0` · `PROFITABILITY_NOT_ESTABLISHED` |
| Date | 2026-11-01 |
| Owner | Pricing and Behavioral Research Economist (`agent-e-pricing`) |
| Write scope | `docs/marea/customer-discovery/pricing/` (3 files) and `docs/marea/customer-discovery/data/pricing-ladders.json` only |
| Machine-readable mirrors | `data/research-status.json` (counts, Lead-owned) · `data/fieldwork-authorization.json` (gate) · `data/pricing-ladders.json` (frozen price hypotheses) |
| Is not | Not a price list · not an offer · not a subscription approval · not a willingness-to-pay measurement · not a conversion, churn, elasticity or revenue estimate |

## 0. How to read this document

This is the design of record for the MC-10 subscription-acceptance block (`EXP-MC10-03`). It contains no
participant data, no response counts other than zero, no computed percentages and no finding. Every
table row in the results section is `n = 0` or `NOT_MEASURED`.

The forbidden transformation this document exists to prevent is:

> "The subscription model was designed and the thresholds were pre-registered, therefore the
> subscription hypothesis was tested."

It was **not** tested. A questionnaire is not a result; a planned threshold is not an observation; a
design decision is not an acceptance rate. MC-10 fieldwork is blocked because no outreach authorisation
exists (`AUTH-MC10-001`, status `NOT_GRANTED`), so zero subscription blocks were administered. Nothing in
this document says subscriptions are rejected or accepted. Zero responses are an absence of data, not a
negative finding.

## 1. Status and authoritative invariants

These values come from `data/research-status.json`, `data/fieldwork-authorization.json`,
`data/governance-status.json` and decisions `D-029` to `D-032` in `data/decisions.json`. This document
may not restate them in a stronger form, and none of them changes because this design exists.

| Invariant | Value | Source |
| --- | --- | --- |
| Outreach authorisation | `NOT_GRANTED` (`AUTH-MC10-001`) | `data/fieldwork-authorization.json` |
| Fieldwork status | `BLOCKED` | `data/research-status.json` |
| Milestone status | `BLOCKED` (`OUTREACH_AUTHORIZATION_NOT_GRANTED`) | `data/research-status.json` |
| Participants completing the subscription block | `0` | `data/research-status.json` (`pricing.participantsCompletingPricingModule`) |
| Price responses recorded | `0` | `data/research-status.json` (`pricing.priceResponsesRecorded`) |
| `WTP_STATED_PREFERENCE_OBSERVED` | `false` | `data/research-status.json` (`pricing.wtpStatedPreferenceObserved`) |
| `WTP_COMMERCIALLY_VALIDATED` | `false` | `data/research-status.json` (`pricing.wtpCommerciallyValidated`) |
| `APPROVED_PRICES` | `0` | `data/research-status.json` (`pricing.approvedPrices`) |
| Profitability | `PROFITABILITY_NOT_ESTABLISHED` | `data/research-status.json` (`commercialInvariants.profitabilityNotEstablished`) |
| Chart rights / data provider rights | `chartRightsGranted = false` · `dataProviderRightsGranted = false` | `data/governance-status.json` (`statuses`) |
| Service-level agreement | `slaEstablished = false` | `data/governance-status.json` (`statuses`) |
| Instant alert guarantee | `instantAlertGuarantee = false` | `data/governance-status.json` (`statuses`) |

## 2. What this instrument measures and what it cannot measure

`EXP-MC10-03` measures **stated attitudes** towards hypothetical recurring-charge models for six
separately described service scopes. It measures, within this sample only:

- which scopes a participant would consider paying for on a recurring basis, if any;
- what a participant expects to keep working after a subscription ends;
- which objection codes they raise, in their own words;
- their stated billing-cadence preference and their assumed unit of purchase;
- their expectations about cancellation, data export and entitlement sharing.

It cannot measure, and this document never converts it into:

| Not measured | Why |
| --- | --- |
| Conversion or purchase probability | No working product, no order path, no price, no availability |
| Churn, renewal or retention rate | Requires observed subscription behaviour over time; none exists |
| Price elasticity | Requires price/quantity variation with real demand; stated intent at n = 5–10 per segment cannot support it |
| Willingness to pay | Stated acceptance is not WTP; WTP remains `NOT_MEASURED` |
| Recurring-revenue assumption | A `PASS` may license a later quantitative test, never a revenue assumption |
| Any price, price band approval or offer | No price may be approved, published, presented as an offer or used as a commercial commitment |

Stated acceptance in a concept with no working product has a well-documented optimistic bias. That bias
is reported, not "corrected" by an invented coefficient.

## 3. The six service scopes, assessed separately

Each scope is described to the participant in the same neutral words, one at a time, before any
objection probing. Responses are recorded **per scope**. There is no combined subscription score, no
"average acceptable subscription", no cross-scope pooling and no single overall verdict. Scope confusion
— in particular chart-data licensing versus a MAREA service fee — is the main validity threat and is
coded explicitly.

| ID | Scope | Genuinely external and continuous element | What the concept must keep working locally without the subscription | MC-09 provenance available | What stays unresolved |
| --- | --- | --- | --- | --- | --- |
| S1 | Navigation software | Update delivery, optional cloud sync, remote service functions | Position, heading, course, speed and depth display; locally computed alarms | `familyPriceHypotheses.NAV` EUR 99 / 149 per year (`HYPOTHESIS_UNAPPROVED`); `PRC-CMP-001` EUR 49/year; `PRC-CMP-002` EUR 149/year | Chart/data rights not granted; no cost basis |
| S2 | Licensed chart data | Licence renewal, coverage updates, chart notices | Display of data already licensed, within the licence terms | No chart-licence subscription record exists in `data/price-observations.json`. MC-09 records chart **cards** as one-off purchases in `economics/MC09-PRICING-AND-WTP.md` §2.2, not subscriptions | `chartRightsGranted = false`; no licence terms, coverage definition or rate |
| S3 | Weather data | Forecast model delivery, routing updates | Last received forecast stays readable; local sensor readings | `familyPriceHypotheses.WEATHER` EUR 49 / 89 per year (`HYPOTHESIS_UNAPPROVED`); `PRC-CMP-035`/`036`/`037` USD 29 / 249 / 499 per year (`TAX_EXCLUSIVE_LIST_PRICE`); `PRC-CMP-038` EUR 19 (`UNKNOWN`) | `forecastAccuracyClaimed = false`; no provider rights; USD rows not converted |
| S4 | Remote monitoring | Alert transport, stored history, connectivity-dependent notifications | Onboard sensor readings and locally generated alarms, independent of the cloud | `familyPriceHypotheses.WATCH` EUR 299 + from EUR 9.90/month (`HYPOTHESIS_UNAPPROVED`); `PH-04` EUR 399 (`HYPOTHESIS_UNAPPROVED`); `PRC-CMP-032`/`033`/`054`; `PRC-CMP-027`/`028`/`031` | `slaEstablished = false`; `instantAlertGuarantee = false`; `sensorAccuracyClaimed = false`; coverage unproven |
| S5 | Cellular connectivity | SIM/eSIM data, roaming, network coverage | None — connectivity is inherently external. The concept must not make connectivity the only notification path for a safety condition | `PRC-CMP-028` USD 225/year (bundled, not itemised); `PRC-CMP-007` notes an optional LTE plan at USD 10/month | No EUR connectivity rate; no operator agreement; no data-cap or roaming terms |
| S6 | Fleet operations | Multi-vessel dashboard, crew/payroll functions, API, service-level commitments, cross-vessel history | Each vessel's own operation must continue independently | `familyPriceHypotheses.FLEET` EUR 49 / 79 per vessel per month, VAT-excluded business hypothesis (`HYPOTHESIS_UNAPPROVED`); `PRC-CMP-039`/`040`/`047`; `PRC-CMP-041`/`042`/`048`; `PRC-CMP-043`/`044`/`045` | `slaEstablished = false`; no platform, tenancy or operator references |

Rules for this section:

1. **No availability claim.** No scope is described as available, orderable, certified or included in
   any product. The disclosure script in §11 is read before the first scope.
2. **No price shown in this block.** The subscription-attitude block precedes the price ladder
   (`pricing/MC10-GABOR-GRANGER.md`). No amount is displayed or suggested by the moderator in §3–§9.
3. **Scope confusion is recorded, not corrected silently.** If a participant treats a chart-data licence
   as a MAREA fee, or a hardware cost as a service fee, the record keeps the confusion and flags it
   (`SUB-07` and the misconception flag) rather than translating the answer into the intended scope.
4. **No cross-scope arithmetic.** An "acceptable annual band" is recorded per scope as stated. Bands are
   never added, averaged, annualised from monthly figures or converted between currencies.

## 4. What must remain functional after subscription expiry

Before any participant is asked about expiry, the concept is described with a fixed local-function
baseline. This baseline is a **research concept constraint**, not a claim that any MAREA product exists
or works.

### 4.1 Local functions that must not depend on a subscription

In the concept description, the following must continue to work with no active subscription and no
network connection:

- position, heading, course over ground, speed and depth display, computed from the boat's own sensors;
- any alarm or warning computed locally from the owner's own equipment, including bilge high-water and
  battery/shore-power state as described in the monitoring construct;
- display of chart data the owner has already licensed, within the terms of that licence;
- receive-only AIS target display where the owner's own receiver is fitted, with no collision-avoidance,
  guarantee or certification claim attached.

The concept must also not present remote alerting as the only notification path for a safety condition,
and expiry must not produce a state that hides a condition the installed hardware can still detect.

### 4.2 Functions that may logically lapse

Cloud history beyond a stated retention window, remote notifications, forecast and routing updates,
new chart-update delivery, fleet dashboards and cross-vessel reporting are the functions whose
continuation depends on an external service. Whether a participant expects them to lapse, degrade or be
exported is **recorded**, not decided, in this experiment.

### 4.3 Hard rule

> **Hard rule — no subscription result may justify disabling local safety-critical functionality.**
> This rule is absolute in MC-10 and is not a hypothesis under test. A `PASS` on `EXP-MC10-03` cannot
> license a lockout, a degraded local display or the removal of a locally computed alarm. Any proposal to
> move a safety-critical local function behind a subscription requires separate safety, liability, legal
> and product review outside MC-10 and outside this document. An interviewer may never describe, promise
> or negotiate such a lockout, and the instrument never presents one as an option.

## 5. Lockout scenario wording (exact)

The scenario is administered **verbally**, after the six-scope block and after the participant has stated
their objection codes. It is hypothetical and is read verbatim; the moderator does not paraphrase it,
does not suggest answers and does not describe what MAREA would do.

**English wording of record:**

> "Before I ask this, please remember that this is a research conversation: nothing is for sale and no
> subscription exists. Now imagine that you had chosen a subscription like the ones we have just
> discussed for this concept, and later you decided not to renew it. The equipment stays installed on
> your boat and you keep using the boat. In that situation: what would you expect to keep working without
> paying anything further, and what would you expect to stop working? Please answer for each of these,
> one at a time: [read the six scopes S1–S6]. Which of the things you said would stop working would be
> unacceptable to you, and why? Would any of them be a reason not to buy the concept at all? If a
> navigation display or a local alarm stopped working because a subscription had ended, what would you
> do?"

**Coding of the answer** (one value per scope, plus an overall value):

| Code | Definition |
| --- | --- |
| `LOCKOUT_BLOCKING` | The participant states that loss of the named local function would stop them buying the concept, or that it must be answered before they would consider it |
| `LOCKOUT_ACCEPTABLE` | The participant accepts the loss of that function at expiry without a blocking objection |
| `LOCKOUT_UNSURE` | The participant cannot say, or conditions the answer on information that does not exist |
| `NO_RESPONSE` | The participant declines to answer or the question was not reached (record why) |

Rules: a hedged answer ("it depends", "maybe") is recorded `LOCKOUT_UNSURE` with the verbatim reason; it is
never forced into a binary. If a participant spontaneously proposes a lockout as acceptable, the
interviewer records it and does **not** confirm that MAREA would implement it. If a participant asks what
actually happens at expiry, the interviewer answers: "No subscription exists, nothing is for sale, and no
policy has been set; I am only asking what you would expect."

Translation status: the English text above is the design of record. A Spanish version must be produced,
back-reviewed and frozen as a new instrument version before fielding (D-031, Wave-0 item `W0-07` is only
`PARTIAL`); Portuguese is deliberately not produced (`W0-08`, blocker `BLK-MC10-07`).

## 6. Billing cadence

Recorded per participant and per scope, as stated. The moderator does not propose a cadence first; if the
participant mentions one spontaneously, that is recorded as unprompted before any prompt list is read.

| Field | Allowed values | Rule |
| --- | --- | --- |
| `billingCadenceStated` | `MONTHLY` · `ANNUAL` · `SEASONAL` · `ONE_OFF_ONLY` · `OTHER` · `NO_PREFERENCE` · `NO_RESPONSE` | Recorded exactly; multi-valued answers recorded with the participant's own wording |
| `cadenceUnprompted` | `true` / `false` | `true` only if mentioned before the prompt list |
| `autoRenewExpectation` | `EXPECTS_AUTO_RENEW` · `EXPECTS_MANUAL_RENEW` · `UNCLEAR` · `NOT_ASKED` | Recorded, never assumed |
| `vatTreatmentAsStated` | `VAT_INCLUDED` · `VAT_EXCLUDED` · `NOT_STATED` · `UNCLEAR_AS_STATED` | Exactly as spoken; never inferred |
| `currencyAsStated` | ISO 4217 as stated | Never converted inside the raw record |

Rules: no arithmetic equivalence between monthly and annual figures is performed during the interview or
in the raw record; no discount or "two months free" framing is offered by the moderator; no bank, card,
billing or account data is collected or stored (ethics requirement of `EXP-MC10-03`).

## 7. Per-vessel vs per-user vs per-account ambiguity

The unit of purchase is one of the known confounders of this experiment. The instrument therefore
records the participant's assumption twice: unprompted (if stated at all) and after one explicit
question.

Question wording: "When you say a price for this, are you thinking of it per vessel, per person using it,
or per account for the boat — and how many people or devices would that cover?"

| Field | Allowed values |
| --- | --- |
| `unitAssumedUnprompted` | `PER_VESSEL` · `PER_USER` · `PER_ACCOUNT` · `PER_DEVICE` · `PER_FLEET` · `UNCLEAR` · `NOT_MENTIONED` |
| `unitAfterPrompt` | same values |
| `unitChangeFlag` | `true` if the answer changed after the prompt, with the verbatim reason |

Rules: the two answers are reported separately; the interviewer never converts between units; a
participant who cannot choose is recorded `UNCLEAR` and contributes no unit claim. Recorded MC-09
observations do not resolve this ambiguity: professional fleet pricing is stated per vessel
(`PRC-CMP-041`, `PRC-CMP-043`, `PRC-CMP-045`) or per multi-vessel tier (`PRC-CMP-039`, `PRC-CMP-042`),
while the recorded consumer navigation subscriptions state an annual subscription without a stated unit
basis (`PRC-CMP-001`, `PRC-CMP-002`). Market observation cannot substitute for a participant's
expectation.

## 8. Cancellation and export expectations

Recorded as opinions, never as commitments, and never turned into policy. No cancellation, export or
retention policy exists in the programme: Wave-0 retention and deletion rules are `NOT_APPROVED`
(`W0-14`), the data controller is not designated (`BLK-MC10-02`) and secure research storage does not
exist (`BLK-MC10-05`).

| Field | What is recorded |
| --- | --- |
| `noticePeriodExpectation` | The notice the participant expects to give, in their own words |
| `midTermCancellationExpectation` | Whether they expect to cancel mid-term and on what terms |
| `refundExpectation` | Whether they expect a refund, credit or pro-rata treatment |
| `exportExpectation` | Whether they expect to export their historical data, in what format and from where |
| `postCancellationRetentionExpectation` | How long they expect data or local function to remain available |
| `deletionExpectation` | Whether they expect confirmation of deletion |
| `transferExpectation` | What they expect on selling the boat or the hardware |

Rules: the interviewer may not promise or imply any policy ("we would let you export it" is a prohibited
misrepresentation). If asked directly, the interviewer uses the §5 answer: no policy has been set and
nothing is for sale. Cancellation and export expectations are not a price input and are never converted
into a willingness-to-pay statement.

## 9. Entitlement sharing

Recorded as expectation only. No entitlement-sharing rule exists; `crossTenantAccessAllowed = false` in
`data/governance-status.json` is a data-tenancy restriction, not a consumer sharing policy.

| Field | What is recorded |
| --- | --- |
| `devicesExpected` | Number of devices the participant would expect to use under one entitlement |
| `householdSharing` | Whether co-owners or family members would expect access, and on what basis |
| `crewSharing` | Whether crew or guests would expect access |
| `secondVesselSharing` | Whether the entitlement would be expected to cover another vessel |
| `serviceAccessSharing` | Whether an installer or technician would expect access for service |
| `transferOnResale` | Whether the entitlement would be expected to transfer with the hardware |

Rules: expectations are recorded per participant; no hierarchy or sharing model is inferred from answers
at n = 5–10 per segment.

## 10. Objection codebook (fixed before fielding)

The codebook is fixed a-priori and is **not** fitted to results. Per `ANA-01` in the MC-09 discovery
plan, emergent codes may be added only after the first four completed interviews in a segment, and every
addition is dated and recorded; no threshold may change (D-031).

| Code | Label | Definition | Counted when |
| --- | --- | --- | --- |
| `SUB-01` | `LOCAL_FUNCTION_LOCKOUT` | Objects because a local or safety-related function would stop working at expiry | Participant states it as an objection, prompted or unprompted |
| `SUB-02` | `RECURRING_FEE_REJECTED_IN_PRINCIPLE` | Rejects any recurring charge regardless of service scope | Participant says a recurring charge is unacceptable in any form |
| `SUB-03` | `DUPLICATE_COST_ALREADY_PAYING` | Already pays for a comparable subscription and resents paying twice | Participant names the existing spend or category |
| `SUB-04` | `UNKNOWN_TOTAL_COST` | Cannot judge because the total cost of ownership is unclear | Participant asks about installation, hardware or licence cost |
| `SUB-05` | `DATA_OWNERSHIP_EXPORT` | Objects on data-ownership, export or deletion grounds | Participant raises ownership, export or deletion |
| `SUB-06` | `CANCELLATION_AND_RENEWAL` | Objects to auto-renewal, notice terms or lock-in | Participant raises cancellation, notice or renewal behaviour |
| `SUB-07` | `RIGHTS_AND_COVERAGE` | Questions chart/data rights, coverage or accuracy | Participant raises licence terms, coverage or accuracy |
| `SUB-08` | `CONNECTIVITY_DEPENDENCE` | Objects to reliance on cellular coverage or roaming | Participant raises coverage dependence for a safety or operational function |
| `SUB-09` | `OBSOLESCENCE_AND_UPGRADE` | Fears forced hardware upgrade or service withdrawal | Participant raises product lifespan or service availability over time |
| `SUB-10` | `BUSINESS_PROCUREMENT` | Cannot treat a recurring charge as capex, or needs budget approval | Recorded for business participants only |
| `SUB-11` | `SUPPORT_AND_SERVICE_BURDEN` | Objects to being the person who has to support it | Participant raises ongoing effort or liability |

Acceptance is recorded separately and is **not** an objection code: `ACC-01` `NO_EXTERNAL_SERVICE_NAMED`
(no external-service subscription named), `ACC-02` `EXTERNAL_SERVICE_NAMED` (at least one named, with the
scope IDs), `ACC-03` `NO_RESPONSE`.

**Minimum evidence rules from `EXP-MC10-03`:** every interviewed participant completes the block; at
least **five distinct objection codes per segment** must be observed before any segment-level statement is
made; each participant must yield **at least one unprompted alternative payment model**, coded
`ALT-01` one-off/perpetual, `ALT-02` pay-per-use, `ALT-03` included with hardware, `ALT-04` tiered or
freemium, `ALT-05` free with limits, `ALT-06` none, `ALT-07` other.

Coding rules: an objection must be grounded in a verbatim excerpt; a code suggested by the moderator and
not endorsed by the participant is not counted; prompted and unprompted codes are counted separately and
both are reported; two coders apply the codebook to at least 25 % of transcripts and disagreement is
reported.

## 11. Administration protocol

### 11.1 Order of administration

1. Consent (C1–C4) and disclosure of the exploratory nature of the research.
2. Qualitative block `GUIDE-01` (not part of this document).
3. Subscription-attitude block: the six scopes in §3, one at a time.
4. Objection probing and the alternative-payment-model question.
5. Lockout scenario §5.
6. Billing cadence §6, unit of purchase §7, cancellation and export §8, entitlement sharing §9.
7. Separate pricing section: the frozen Gabor–Granger ladder (`pricing/MC10-GABOR-GRANGER.md`), then the
   Van Westendorp module in a separate section (`pricing/MC10-VAN-WESTENDORP.md`).

The subscription block precedes any price display so that price cannot anchor the attitude discussion.

### 11.2 Disclosure script (read aloud before §3)

> "I am going to ask about hypothetical subscription models for a concept that does not exist and is not
> for sale. Nothing can be bought or reserved today, no subscription exists, and these are research
> hypotheses rather than an offer or a price list. There is no right answer and no answer will create a
> commitment for you or for us. If you would not consider a recurring charge at all, that is a useful
> answer and I want to hear it."

### 11.3 Prohibited interviewer behaviour

- No price, discount, free period, trial or "included for a year" framing is offered in this block.
- No claim that any scope is available, certified, covered or supported.
- No leading question and no reading of the objection codebook to the participant.
- No promise about expiry, refund, export or sharing.
- No collection of billing, card, account, vessel registration or contact data beyond the consent scope.
- No more than one prompt per unanswered scope; a prompt never supplies the answer.

### 11.4 Sample and data handling

Minimum indicative design from `EXP-MC10-03`: the block is embedded in every interview, n = 5–10 per
segment (indicative only, never statistically representative). The repository stores aggregate operational
counts only; no participant identity, verbatim or audio may be committed. Layer A/B storage does not exist
(`BLK-MC10-05`), so no real record can be stored in this environment at all — a further reason the block
was not executed.

## 12. Pre-registered decision threshold (`EXP-MC10-03`)

The threshold is frozen from `docs/marea/market-validation/data/validation-experiments.json` (MC-09
registry, verified by record hash in `data/experiments.json`; see `MC10-EXPERIMENT-RESULTS.md` §11). It
may not be relaxed, reworded or re-scoped after fielding (D-031).

> **`PASS` (subscription model conditionally acceptable):** ≥ 50 % of a segment names at least one
> external-service subscription they would consider **AND** ≥ 50 % state that loss of local functions
> would be a blocking objection that must be answered.
>
> **`FAIL`:** a majority reject any recurring charge regardless of service scope.
>
> **Between the two:** `INCONCLUSIVE`, requiring a quantitative stage. Ambiguity defaults to
> `INCONCLUSIVE`, never to `PASS` (MC-09 plan `ANA-01` §7).

Operational definitions, fixed before fielding:

- **"External-service subscription"** means a recurring charge for a service that genuinely depends on an
  external provider or continuous delivery: weather data (S3), remote monitoring (S4), connectivity (S5)
  or fleet operations (S6). Agreeing to a locally available function as a subscription does **not** count
  as naming an external-service subscription.
- **Both conditions are evaluated within the same segment.** No participant's answer may contribute to
  one condition in one segment and the other condition in a different segment.
- **"Names at least one"** requires the participant to describe the service; merely agreeing "yes, maybe
  one of those" after the moderator lists scopes does not count. Prompted and unprompted naming are
  reported separately.
- **"Blocking objection"** means `LOCKOUT_BLOCKING` as defined in §5 and stated as a reason not to adopt
  the concept, not merely a preference for a different model.
- **Denominator** is the number of completed subscription blocks for that segment. No two segments may be
  pooled to reach a threshold; no weighting across segments is applied.
- **No segment is evaluated** without at least five distinct objection codes evidenced in that segment,
  per the `EXP-MC10-03` minimum-evidence rule.

Current evaluation: denominator `0` for every segment, so every percentage is `NOT_COMPUTED` and the
verdict is `BLOCKED` (`NOT_EXECUTED`). A `BLOCKED` verdict is **not** a `FAIL`: the hypothesis was not
tested.

## 13. Analysis plan (applies only if the block is ever executed)

1. **Per segment, per scope:** count and within-sample share of participants naming an external-service
   subscription; count and share `LOCKOUT_BLOCKING`; frequencies of `SUB-01` to `SUB-11`; frequencies of
   `ALT-01` to `ALT-07`; cadence, unit and sharing distributions.
2. **No inferential statistic, confidence interval, significance test or cross-segment model** is produced
   at n = 5–10 per segment. Percentages are always labelled "within this sample (n = …)".
3. **Negative cases are listed explicitly**; the threshold may fail because of them and the failure is
   published, not dropped.
4. **Verbatim evidence:** at least one excerpt per code per segment, quoted only with recorded consent
   (C3); no participant identity stored in the repository.
5. **No cross-scope composite and no conversion** of stated acceptance into purchase probability, revenue,
   churn or elasticity.
6. **Decision record:** `PASS` / `FAIL` / `INCONCLUSIVE` / `BLOCKED` with threshold, observed counts,
   confounders and the single permitted next step. Where the decision depends on coding judgement, the
   two-coder disagreement is reported.

## 14. Interpretation limits

1. **Stated acceptance is not conversion.** A participant saying they would consider a subscription is not
   a purchase and cannot be counted as one.
2. **No churn or elasticity estimate is possible** from this design at this sample size, and none may be
   quoted from it.
3. **No price, price band or offer is produced.** Even a later `PASS` leaves every price
   `HYPOTHESIS_UNAPPROVED` / `NOT_MEASURED` and `APPROVED_PRICES = 0`.
4. **A `PASS` licenses only** the decision to design a quantitative subscription test with real price
   points and a working prototype. It does not validate any recurring-revenue assumption.
5. **The hard rule in §4.3 is not testable by this experiment** and cannot be overridden by any result.
   Zero data cannot justify disabling a local safety-critical function, and neither can positive data.
6. **Zero responses are absence of data, not negative evidence.** This document does not establish that
   subscriptions are unwanted, that an external-service subscription is acceptable, or that a
   subscription model should be abandoned.
7. **Segments are not representative.** The purposive pool of 5–10 interviews per segment supports design
   learning only.

## 15. Results — empty

No block was administered. Every row below is an operational count or a measurement state, not a finding.

### 15.1 Overall

| Measure | Result | Denominator |
| --- | --- | --- |
| Participants completing the subscription-attitude block | **0** | — |
| Participants identifying an external-service subscription they would consider | **0** | 0 |
| Participants stating local-function loss is a blocking objection | **0** | 0 |
| Distinct objection codes observed (any segment) | **0** | — |
| Unprompted alternative payment models recorded | **0** | — |
| Lockout-scenario responses (any scope) | **0** | — |
| Billing-cadence preferences recorded | **0** | — |
| Unit-of-purchase interpretations recorded | **0** | — |
| Cancellation / export expectation records | **0** | — |
| Entitlement-sharing expectation records | **0** | — |
| `PASS` / `FAIL` evaluation | `NOT_COMPUTED` | 0 |

### 15.2 Per segment

| Segment | Blocks completed | External-service subscription named | Local-function lockout blocking | Objection codes observed | Alternative payment models | Threshold evaluation |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| SEG-01 Recreational motorboat owners | 0 | 0 | 0 | 0 | 0 | `NOT_COMPUTED` |
| SEG-02 Sailing yacht owners | 0 | 0 | 0 | 0 | 0 | `NOT_COMPUTED` |
| SEG-03 Marina-based unattended-vessel owners | 0 | 0 | 0 | 0 | 0 | `NOT_COMPUTED` |
| SEG-04 Marine electronics installers | 0 | 0 | 0 | 0 | 0 | `NOT_COMPUTED` |
| SEG-05 Marine retailers and chandlers | 0 | 0 | 0 | 0 | 0 | `NOT_COMPUTED` |
| SEG-06 Marina or shipyard operators | 0 | 0 | 0 | 0 | 0 | `NOT_COMPUTED` |
| SEG-07 Charter operators and sailing schools | 0 | 0 | 0 | 0 | 0 | `NOT_COMPUTED` |
| SEG-08 Fleet managers | 0 | 0 | 0 | 0 | 0 | `NOT_COMPUTED` |

### 15.3 Per service scope

| Scope | Attitude responses | Acceptable annual band | Lockout reaction | Objection codes | Unit interpretation | State |
| --- | ---: | --- | ---: | ---: | ---: | --- |
| S1 Navigation software | 0 | `NOT_MEASURED` | 0 | 0 | 0 | `NOT_MEASURED` |
| S2 Licensed chart data | 0 | `NOT_MEASURED` | 0 | 0 | 0 | `NOT_MEASURED` |
| S3 Weather data | 0 | `NOT_MEASURED` | 0 | 0 | 0 | `NOT_MEASURED` |
| S4 Remote monitoring | 0 | `NOT_MEASURED` | 0 | 0 | 0 | `NOT_MEASURED` |
| S5 Cellular connectivity | 0 | `NOT_MEASURED` | 0 | 0 | 0 | `NOT_MEASURED` |
| S6 Fleet operations | 0 | `NOT_MEASURED` | 0 | 0 | 0 | `NOT_MEASURED` |

### 15.4 Verdict and what would count

**Verdict.** `BLOCKED` / `NOT_EXECUTED`. Not `PASS`, not `FAIL`, not `INCONCLUSIVE`. No subscription
model is endorsed; no acceptable band exists; no objection is observed; no local-function lockout has
been discussed with any person outside the programme.

**What would count as evidence.** A real eligible participant from one of the eight segments; a completed
interview record with recorded consent; the full six-scope block; at least one unprompted alternative
payment model per participant; at least five distinct objection codes per segment with verbatim grounding;
two-coder coding with reported agreement; and a threshold evaluation with a non-zero denominator.

**Permitted next step.** None until `AUTH-MC10-001` is issued and the Wave-0 preconditions in
`MC10-RESEARCH-SCOPE.md` §11 are met. A `PASS`, if ever obtained, licenses only a quantitative
subscription test design.

## 16. Confounders carried from the registered experiment

- Subscription fatigue and prior bad experiences with marine apps.
- Confusion between chart-data licensing and a MAREA service fee.
- A hypothetical local-function lockout described only in words.
- Owner confusion between per-vessel and per-user pricing.
- Small n making percentage thresholds unstable.

None of these can be assessed in MC-10 because no participant was interviewed; they are recorded so that
a later execution cannot claim they were controlled when they were not.

## 17. Traceability

| Source | Use in this document |
| --- | --- |
| `docs/marea/market-validation/data/validation-experiments.json` | Frozen hypothesis, minimum evidence, threshold, confounders of `EXP-MC10-03` |
| `docs/marea/market-validation/MC09-VALIDATION-EXPERIMENTS.md` §`EXP-MC10-03` | Registered narrative version of the same experiment |
| `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` §§7–10 | PRICE-01 module context, capture schema `SCHEMA-01`, analysis plan `ANA-01` |
| `docs/marea/customer-discovery/data/research-status.json` | Zero counts and commercial invariants |
| `docs/marea/customer-discovery/data/fieldwork-authorization.json` | `AUTH-MC10-001` gate |
| `docs/marea/customer-discovery/data/governance-status.json` | Rights, SLA, alert and accuracy restrictions |
| `docs/marea/customer-discovery/data/pricing-ladders.json` | Frozen pre-registered price hypotheses referenced by the separate pricing section |
| `docs/marea/customer-discovery/MC10-EXPERIMENT-RESULTS.md` §3 | Milestone-level classification of `EXP-MC10-03` |
| `docs/marea/customer-discovery/data/decisions.json` | `D-029`–`D-032` decisions in force |

Path convention: short citations `price-observations.json` and `governance-status.json` refer to the MC-09
authority files under `docs/marea/market-validation/data/`; short citations `data/research-status.json`,
`data/fieldwork-authorization.json` and `data/pricing-ladders.json` refer to
`docs/marea/customer-discovery/data/`. The MC-10 mirror `docs/marea/customer-discovery/data/governance-status.json`
mirrors the status invariants only and is cited for those statuses.

## 18. Status effect

```
EXP-MC10-03                  = NOT_EXECUTED
SUBSCRIPTION_BLOCKS          = 0
PARTICIPANTS                 = 0
OBJECTION_CODES_OBSERVED     = 0
PRICE_RESPONSES              = 0
WTP_STATED_PREFERENCE_OBSERVED = false
WTP_COMMERCIALLY_VALIDATED   = false
APPROVED_PRICES              = 0
PROFITABILITY                = NOT_ESTABLISHED
VERDICT                      = BLOCKED
```

No commercial restriction is weakened by this document, and no price, subscription model, product or
claim is approved, published or offered.
