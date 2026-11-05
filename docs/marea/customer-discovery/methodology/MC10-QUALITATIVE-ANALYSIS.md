# MC-10 — Preregistered qualitative analysis plan

| Field | Value |
| --- | --- |
| Document ID | MC-10 / D11 / MC10-QUALITATIVE-ANALYSIS |
| Milestone | MC-10 of 36 — primary customer discovery |
| Analysis plan version | `1.0.0` — preregistered before any data exists |
| Status | `PREREGISTERED — NOT_EXECUTED`; `FIELDWORK_STATUS = BLOCKED` |
| Coded units | **0** |
| Double-coded units | **0** |
| Cohen's κ | `NOT_COMPUTED` (zero coded units; no denominator) |
| Valid analysis cases | **0** |
| Saturation | `NOT_REACHED` — cannot be assessed without data |
| Base | `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3` |
| Date | 2026-11-01 |
| Owner | agent-a-methodologist (Research Methodologist) |
| Authorities | `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` §10 (ANA-01); `docs/marea/market-validation/MC09-VALIDATION-EXPERIMENTS.md`; frozen thresholds in `data/validation-experiments.json` |
| Is not | a result, a coding file, a theme catalogue derived from data, or evidence that any participant was interviewed |

> **STATUS: NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED).** No data exists: 0 coded
> units, 0 analysis cases and κ = `NOT_COMPUTED`. The results tables are intentionally empty scaffolds.

## 0. Status and purpose

No participant has been interviewed, no transcript exists and no coded unit exists. Every results table in
this document is therefore an **empty scaffold**: zero rows of real data, zero counts, κ
`NOT_COMPUTED`. The plan exists so that, if fieldwork is ever authorised, coding and analysis cannot be
fitted to results after the fact.

The document is written in English for internal use. Participant wording, if it ever exists, would be
coded in the language in which it was spoken (Spanish or English); no Portuguese instrument exists, so no
Portuguese fieldwork is contemplated.

## 1. Analysis principles

1. **Preregistration.** Codes, units, denominators, double-coding rate and verdict rules are fixed before
   data exist. The registered thresholds belong to MC-09 and are not changed here.
2. **No fabricated data.** No coded unit may be created, inferred, simulated or plausibly "reconstructed"
   from a concept, a persona or a desk-research archetype. No AI-generated dialogue is data.
3. **Denominator everywhere.** No proportion without a denominator; no denominator from zero cases; a
   missing value is `NOT_COMPUTED` or `NOT_APPLICABLE`, never `0%` and never `0.00` κ.
4. **Within-sample only.** Proportions describe the coded participants, not a population. No quantified
   sampling error, no confidence interval and no prevalence figure is produced: the design uses a
   non-probability purposive quota sample.
5. **Negative results bind.** A `FAIL` against a registered threshold stops the related public copy or
   claim; it cannot be re-labelled `INCONCLUSIVE` or replaced with an anecdote.
6. **Report what is uncomfortable.** Low κ, contradictions, under-recruited segments, deviations and thin
   data are reported, not smoothed.
7. **Analysis order is fixed.** Records validated → transcribed/cleaned → unitised → double-coded →
   adjudicated → within-case summaries → cross-case matrices → threshold evaluation → verdicts →
   reporting. No stage may be skipped to reach a verdict faster.

## 2. Unit of analysis and coding unit

### 2.1 Case

A **case** is one completed, consented interview record from an eligible participant (protocol §8.2). A
participant may yield one case only. Withdrawn, excluded, incomplete, mock or simulated sessions are not
cases and never enter the denominator.

A case is **analysis-eligible** only when: eligibility confirmed; `C1` valid; record complete; language
and instrument version recorded; interviewer trained; no unresolved consent or data-integrity defect.

### 2.2 Coding unit

A **coding unit** is the shortest span of participant speech that expresses one idea relevant to one
code:

- bounded by the participant's turn, or by a clause boundary inside a long turn when the turn contains
  several distinct ideas;
- typically one answer, one explanation, one incident description or one reason;
- if a passage carries two distinct ideas, it is split into two units rather than double-coded as one;
- moderator speech is not coded, except where a moderator intervention caused a participant statement
  that must be flagged as prompted;
- a unit may receive more than one code only when the codes describe genuinely different properties
  (for example a spend statement that also reveals a buying trigger); overlapping codes are recorded
  separately with the rationale;
- a unit that evidences no allowed code is marked `NO_CODE` and counted in the unitisation record so the
  "unprompted" rate is not inflated by silent deletion.

Each unit is identified as `<participantId>-U<sequence>`. The identifier is pseudonymous and carries no
semantic meaning. The unit text is stored in Layer B only; Layer C carries unit identifiers and codes,
never the wording.

### 2.3 What counts as "unprompted"

A theme is unprompted when the participant introduced it without the moderator naming it, suggesting it,
or asking a direct question about it. Prompts are recorded with the unit; "prompted" themes are counted
separately and never added to the unprompted numerator. This rule exists because the registered EXP-MC10-01
threshold is explicitly about unprompted appearance.

## 3. Preregistered codebook — version 1.0.0

The codebook operates the eight a-priori theme families named in ANA-01 and elaborates them into twelve
codes: problem category, urgency, actual spend, alternative, buying trigger, subscription attitude,
installation barrier, trust barrier, compatibility objection, misunderstanding, purchase-decision role
and negative case.

| Code | Name | One-line definition |
| --- | --- | --- |
| `QC-01` | Problem category | A recurring operational or information problem the participant names, in their own terms |
| `QC-02` | Urgency | The participant's stated frequency, time pressure, seasonality or consequence severity |
| `QC-03` | Actual spend | Real past expenditure: category, approximate amount band, currency, VAT treatment, year |
| `QC-04` | Alternative | What the participant uses or does instead, and why they stay with it |
| `QC-05` | Buying trigger | The event or condition that caused a real purchase or would cause one |
| `QC-06` | Subscription attitude | Stated view on recurring fees, cadence, what must survive lapse, cancellation, export |
| `QC-07` | Installation barrier | Worries about fitting, documentation, warranty, rework, downtime, insurance, liability, training |
| `QC-08` | Trust barrier | Distrust of a new company: company longevity, data ownership, support, warranty credibility |
| `QC-09` | Compatibility objection | Doubt or requirement about protocol/equipment compatibility and evidence for it |
| `QC-10` | Misunderstanding | A critical misconception about what a concept does or excludes, restated without prompting |
| `QC-11` | Purchase-decision role | Who decides, influences, pays, vets or vetoes a purchase, as described by the participant |
| `QC-12` | Negative case | A participant or unit that contradicts the dominant theme, or reports the problem as absent/unimportant |

### 3.1 Code definitions, inclusion and exclusion rules

**QC-01 Problem category.** Includes: a described failure, gap, repeated manual work, lost information,
risk, delay or cost tied to the participant's vessel/business. Excludes: solutions the participant has not
experienced, moderator-supplied categories, and general opinions ("boats are expensive") without a
concrete instance. Does not prove the problem is shared, frequent, or paid for.

**QC-02 Urgency.** Includes: stated frequency ("every trip"), seasonality, deadline pressure, incident
consequence, downtime tolerance, who is affected. Excludes: urgency invented by the coder from tone;
moderator pressure. Does not prove the problem is important to the participant's purchasing behaviour.

**QC-03 Actual spend.** Includes: purchases actually made, amount band, year, currency, VAT treatment,
payment form, recurring or one-off. Excludes: competitor prices, hypothetical prices, forecast budgets,
amounts the participant did not state. Unknown is unknown; it is never recorded as zero. Does not
establish willingness to pay for anything.

**QC-04 Alternative.** Includes: current products, apps, services, manual substitutes (notebook, phone,
radio, asking someone), incumbent brand, and the reason for continuing. Excludes: alternatives the
participant would merely consider. Does not prove switching intent.

**QC-05 Buying trigger.** Includes: the event, failure, deadline, inspection, insurance requirement,
upgrade, crew request or budget cycle that caused a real purchase; also stated conditions that would
trigger a future purchase. Excludes: hypothetical enthusiasm without a condition. Does not validate a
market entry point.

**QC-06 Subscription attitude.** Includes: acceptability of recurring fees, preferred cadence, which
functions must survive lapse, cancellation and data-export expectations, entitlement sharing, per-vessel
versus per-person framing, prior subscription experience and renewal. Excludes: willingness to pay a
specific MAREA price (no such price exists). Does not validate a subscription model.

**QC-07 Installation barrier.** Includes: who would install, documentation, warranty, commissioning,
compatibility evidence, rework risk, downtime, insurance, liability, training, handover. Excludes: generic
statements about "quality". Does not establish that the barrier is surmountable.

**QC-08 Trust barrier.** Includes: company longevity, who owns vessel data, what happens on lapse or
company failure, support credibility, warranty enforcement, references and distributor trust. Excludes:
brand preference unrelated to trust. Does not establish trust readiness.

**QC-09 Compatibility objection.** Includes: protocol/NMEA knowledge, multi-brand integration doubt,
need for a published compatibility matrix, verification procedure, tested rows. Excludes: opinions about
a brand's reputation. Does not test compatibility — 0 compatibility rows have been tested in the
programme.

**QC-10 Misunderstanding.** Includes: a restatement that a concept includes something it excludes, omits
a required exclusion, or states a capability the concept does not have. Excludes: moderator explanation
and questions. Misconceptions are findings about communication and design, never a participant failing
and never a marketing opportunity.

**QC-11 Purchase-decision role.** Includes: decision-maker, influencer, payer, technical veto, family or
partner involvement, procurement process, board or owner sign-off, gatekeeper. Excludes: assumptions by
the interviewer about business roles. Does not prove that the described decision process operates in
practice.

**QC-12 Negative case.** Includes: participants whose account contradicts the dominant theme; statements
that a problem is absent, unimportant or already solved; failures of the concept to meet a stated need.
Excludes: moderator disagreement. Negative cases are listed individually and can make a registered
threshold fail.

### 3.2 Mapping to the registered ANA-01 theme families

| ANA-01 theme family | Operational codes |
| --- | --- |
| Problem | `QC-01`, `QC-02` |
| Spend | `QC-03` |
| Alternative | `QC-04` |
| Trigger | `QC-05` |
| Installation barrier | `QC-07`, `QC-09` |
| Subscription objection | `QC-06` |
| Trust barrier | `QC-08` |
| Misconception | `QC-10` |
| Decision context (elaboration) | `QC-11` |
| Negative cases (elaboration) | `QC-12` |

The elaboration adds `QC-11` and `QC-12` as explicit codes and splits problem/installation into urgency,
compatibility and role categories. It is design-stage work performed with no data; it does not change a
registered threshold. It must be registered as an ANA-01 v1.1.0 minor amendment before the first
interview (see D5 §3, ANA-01).

### 3.3 Codebook editing rules

Codes may not be added, removed, merged or redefined after data collection starts except through the
amendment procedure in §12. Before data exist, a codebook correction is still recorded as a dated version
change with a reason, so the freeze remains auditable.

## 4. Emergent codes

- Emergent codes are permitted **only after the first four real, completed, consented interviews** have
  been coded with the a-priori codebook. The first four cases must therefore be coded with the registered
  codebook only; this prevents the codebook being fitted to early data.
- An emergent code requires: a written definition, inclusion and exclusion criteria, at least one
  motivating unit, the date, the coder who proposed it and the reason the a-priori codebook does not
  cover it.
- Emergent codes are registered in a dated register (Layer B; a non-identifying summary may enter Layer
  C), and the codebook version increments. Earlier cases are then re-coded for the new code and the
  re-coding is reported.
- Emergent codes may not be used to rescue a failing registered threshold, to create a market claim, or
  to replace the a-priori codebook silently.
- The count of emergent codes is reported. Currently **0** — no data exists.

## 5. Double coding and Cohen's κ

### 5.1 Sampling

- At least **25%** of analysis-eligible cases are double-coded, rounded up (for example, at least one case
  in a segment with up to four completed cases, and at least two from five or more).
- Selection is stratified by segment: at least one double-coded case per segment that has cases. If a
  segment has only one case, that case is double-coded.
- The selection is made with a recorded deterministic rule (a fixed seed and a documented ordering) before
  the second coder sees the material, so cases cannot be chosen because they are expected to agree.

### 5.2 Procedure

1. Both coders work independently from the raw Layer B material; neither sees the other's codes before
   submitting.
2. Each coder applies the same codebook version, unitisation rules and `NO_CODE` rule.
3. The coder submits a unit-by-code matrix; the analyst computes agreement per code and overall.
4. Disagreements are adjudicated by discussion, producing a final agreed code set and a disagreement log.
5. The double-coded subset is re-reported after adjudication; disagreements are not silently overwritten.
6. The interviewer may not be the only coder of their own session; if the interviewer codes, a second
   independent coder must code the same case.

### 5.3 κ computation

Cohen's κ is computed for nominal codes on the double-coded units:

- `po` = observed agreement proportion (units where both coders assigned the same code, over the
  double-coded units);
- `pe` = expected agreement from the coders' marginal distributions;
- `κ = (po − pe) / (1 − pe)`;
- reported per code where the denominator permits, and for the theme set as a whole as registered
  (ANA-01 target κ ≥ 0.60 for theme codes).

κ is **not** computed on units that were not double-coded, on `NO_CODE` units pooled with coded units, or
on an empty set. If `pe = 1` or the double-coded set is empty, κ is `NOT_COMPUTED` — not 0 and not 1.

### 5.4 Reporting rules

- Report: number of analysis-eligible cases; number and proportion double-coded; number of units
  double-coded; `po`; `pe`; κ; a per-code agreement table; the disagreement list; the adjudicated final
  set.
- κ below the registered target is reported as a limitation and triggers codebook clarification through
  the dated amendment procedure, followed by re-double-coding on a new subset where feasible. It is never
  hidden, replaced by "substantial agreement" prose, or improved by dropping difficult codes.
- κ is a reliability indicator for this sample, not a validity certificate for the themes.

### 5.5 Current value

`κ = NOT_COMPUTED` because there are zero coded units and zero double-coded units. The current
`coding.cohensKappa` value in `research-status.json` is `null`, which is consistent with this document.
It is **not** 0.00 and must not be rendered as such.

## 6. Within-case then cross-case

### 6.1 Within-case summary

One page per analysis-eligible case (Layer B, not the repository): problem categories; urgency/frequency;
actual spend bands; alternatives; buying trigger; installation and compatibility barriers; subscription
attitude; trust barriers; concept comprehension and misconceptions; price responses (verbatim categories
and bands only); purchase-decision role; contradictions inside the case; interviewer quality flags.

### 6.2 Cross-case matrices

Only after within-case summaries:

1. Segment × theme matrix: for each segment, the number of cases evidencing each theme, the denominator,
   and the unprompted/prompted split.
2. Barrier ranking per segment, with top-3 counts.
3. Comprehension grid per concept: correct inclusions, correct exclusions, critical misconceptions, with
   denominators.
4. Pricing tables: per construct and segment, intent category per frozen point; monotonicity status;
   50% intent band labelled `HYPOTHESIS`; Van Westendorp consistency and acceptable range labelled
   `HYPOTHESIS`. No approved price is output.
5. Negative-case table: case, contradiction, theme affected, whether the threshold is affected.

Empty scaffold (current state): matrix rows 0, cells `—`, denominators 0, no theme counts, no barrier
ranking, no comprehension scores, no price bands.

## 7. Saturation

- Saturation is assessed per segment, not globally.
- Rule: saturation for a segment is recorded when the last two completed interviews in that segment
  introduce **no new code**. It is a stopping rule for theme discovery, not a measure of prevalence.
- Recorded per segment: `NOT_ASSESSED` until at least the minimum interviews exist; then
  `REACHED`/`NOT_REACHED` with the number of cases and the codes newly introduced in the final two.
- If saturation is not reached, the report says so and claims no saturation. A segment cannot be declared
  saturated by pooling it with another segment.
- The registered `coding.saturationRecorded = false` is consistent with this document; no segment has
  data.

## 8. Contradictions and negative cases

- Contradictions inside one case (participant says two opposed things) are recorded as both units with
  their context; the analyst does not choose the convenient one. Recency, prompting and question framing
  are noted.
- Contradictions between cases are preserved in the cross-case matrix and in the negative-case table.
- Negative cases (`QC-12`) are listed individually with the theme they contradict. A registered threshold
  can fail because of them, and that outcome is reported rather than averaged away.
- Absence of a theme is reported as "not observed in this sample", never as "does not exist in the
  market".
- Disconfirming evidence is never moved to a "miscellaneous" bucket to protect a preferred conclusion.

## 9. Threshold evaluation procedure

For each registered experiment, evaluation produces:

1. The registered metric and threshold (quoted from `validation-experiments.json`; not re-worded).
2. Numerator and denominator definitions, displayed with every figure.
3. The observed value, or `BLOCKED` when no data exists.
4. Confounders observed during fielding.
5. A verdict from `PASS` / `FAIL` / `INCONCLUSIVE` / `BLOCKED`, with the reason.
6. The permitted next step and the claim that is still forbidden.

| Experiment | Primary metric (as registered) | Denominator(s) | Current state |
| --- | --- | --- | --- |
| EXP-MC10-01 | Unprompted theme share; participants naming concrete prior spend | Coded units **and** participants (both reported; see §9.1) | `NOT_EXECUTED` — 0/0 |
| EXP-MC10-02 | Installers naming compatibility evidence and warranty/RMA clarity as mandatory; supervised-trial willingness | Participants (installers) | `NOT_EXECUTED` — 0/0 |
| EXP-MC10-03 | Segment share considering an external-service subscription; local-lockout blocking share | Participants | `NOT_EXECUTED` — 0/0 |
| EXP-MC10-04 | Monotone decline in ladders; 50% intent band per segment | Ladders; participants per segment | `NOT_EXECUTED` — 0 ladders |
| EXP-MC10-05 | Internally consistent Van Westendorp responses; non-degenerate range | Responses; participants per segment | `NOT_EXECUTED` — 0 responses |
| EXP-MC10-06 | Correct restatement of ≥2 exclusions; critical-misconception share | Participants per concept | `NOT_EXECUTED` — 0/0 |
| EXP-MC10-07 | Concrete success criterion; supervised-trial acceptance | Participants (operators) | `NOT_EXECUTED` — 0/0 |
| EXP-MC10-08 | Conditions meetable at launch; unmet disqualifying condition | Participants (retailers) | `NOT_EXECUTED` — 0/0 |
| EXP-MC10-09 | Actionable alerts named by owners; handover/work-list need named by operators | Participants (owners/operators) | `NOT_EXECUTED` — 0/0 |
| EXP-MC10-10 | Top-3 barrier share, cross-segment | Participants | `NOT_EXECUTED` — 0/0 |

### 9.1 Registered denominator ambiguity in EXP-MC10-01

The registered threshold reads "a problem theme appears unprompted in ≥60% of coded units in a segment
AND ≥50% of that segment's participants name a concrete prior spend or workaround cost". The first
clause uses coded units, the second uses participants. This plan reports both denominators separately and
applies the **stricter** reading (the participant-level share must also reach the registered level) unless
a dated clarification is recorded before fielding. The ambiguity is disclosed in every affected output.
Choosing the denominator that produces a nicer number is prohibited.

### 9.2 Verdict integrity

- No verdict may be issued for an experiment with 0 eligible cases; the verdict is `BLOCKED`.
- `INCONCLUSIVE` is for real data between the PASS and FAIL bands, not for missing data.
- A `PASS` unlocks only the gate named in `MC09-VALIDATION-EXPERIMENTS.md` §3 and never a commercial
  claim.
- Thresholds and verdicts are recorded per experiment and never aggregated into a milestone-level
  "validated" claim.

## 10. Denominator-everywhere rule

Fields and prohibitions:

1. Every figure is presented as `numerator / denominator` or as a count with the denominator stated.
2. Percentages are labelled "within this sample" and carry `n`. No percentage without `n` is published,
   internally or externally.
3. Zero denominator → `NOT_COMPUTED` or `NOT_APPLICABLE`; never `0%`, never `0.00`, never "none".
4. Zero observations → "not observed in this sample", never "0% of the market" and never "customers do
   not want it".
5. No vague quantifiers ("most", "many", "a majority", "significant", "trend") without the counts.
6. Participant-level and unit-level denominators are never mixed in one sentence.
7. Under-recruited segments report their actual n and their under-recruitment; they do not get pooled to
   reach a quota.
8. Withdrawn and excluded contacts appear in the funnel denominators, not in the analysis denominators.
9. A double-coded subset has its own denominator, separate from the full case set.
10. Derivations (bands, derived ranges, categorical counts) keep the raw count that produced them, and
    derived values are labelled as derived.

## 11. Forbidden inferences

Each of the following is a **defect** if it appears in any MC-10 output:

- Treating within-sample proportions as population prevalence, market share or demand size.
- Inferring that a problem is unimportant, absent or rejected because zero interviews were completed.
- Treating a missing value, a skipped question or an empty cell as zero or as a negative answer.
- Calling a stated-preference intent curve a demand curve, a conversion estimate or a revenue forecast.
- Treating a Van Westendorp range as an approved price, a floor, a ceiling or a recommendation.
- Calling a Gabor–Granger 50% point a break-even price or a launch price.
- Presenting a hypothesis price as an offer, a launch price, a discount or a purchasable figure.
- Upgrading verbal interest into a trial, a partnership, a distribution agreement, a letter of intent or a
  purchase order.
- Describing a designed instrument, a planned quota or a frozen threshold as data or as a finding.
- Counting a mock session, a pilot, a synthetic dialogue, an AI-generated conversation or a desk-research
  archetype as a participant case.
- Claiming a product is "validated", "proven", "wanted by customers", "market-ready" or "installer-ready".
- Claiming trust readiness, warranty readiness, certification or compatibility testing.
- Reporting a κ value, an agreement rate or a saturation claim without real double-coded units.
- Using a quotation in marketing, testimonials or public copy, or using a quotation at all without the
  recorded permission and de-identification review.
- Reporting a rate with a denominator of zero, or a percentage without its `n`.
- Re-labelling `FAIL` as `INCONCLUSIVE`, or a `BLOCKED` experiment as `INCONCLUSIVE`.
- Changing a threshold, a codebook or a denominator after seeing data without the §12 amendment.
- Extrapolating from the prepared geography (Rías Baixas/Galicia) to other regions, to Portugal, or to
  other segments without a new study.
- Presenting a data-protection or research-ethics design as an approval or a legal opinion.

## 12. Change control

- This analysis plan is version `1.0.0`. Codebook changes, unitisation changes, double-coding-rate
  changes, denominator changes and κ-reporting changes require a dated amendment naming the old and new
  rule, the reason and the approver, plus a new version.
- Amendments apply only to data analysed after the amendment; previously analysed data stay under the
  version in force when analysed.
- A threshold change is governed by the higher-level experiment-freeze rule (dated amendment, new
  version, independent review); it is not made by editing this document.
- The codebook and this plan must stay aligned with the frozen experiment thresholds and with ANA-01
  v1.1.0 as registered in `MC10-INSTRUMENT-VERSIONS.md`.

## 13. Results scaffold — intentionally empty

**No results exist.** The tables below are the pre-registered reporting shape. They are filled only after
real, consented, completed records exist and the analysis order in §1 has been followed. Placeholders are
not findings.

### 13.1 Coding summary

| Metric | Value |
| --- | --- |
| Analysis-eligible cases | 0 |
| Coded units | 0 |
| `NO_CODE` units | 0 |
| Double-coded cases | 0 |
| Double-coded units | 0 |
| Double-coding proportion | `NOT_COMPUTED` (0 / 0) |
| Observed agreement `po` | `NOT_COMPUTED` |
| Expected agreement `pe` | `NOT_COMPUTED` |
| Cohen's κ | `NOT_COMPUTED` |
| κ target | ≥ 0.60 (theme codes) |
| Emergent codes | 0 |
| Saturation (per segment) | `NOT_ASSESSED` — no segment has data |
| Negative cases | 0 |

### 13.2 Per-segment analysis table

| Segment | Completed interviews | Analysis-eligible cases | Coded units | Double-coded units | κ | Saturation |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| SEG-01 | 0 | 0 | 0 | 0 | `NOT_COMPUTED` | `NOT_ASSESSED` |
| SEG-02 | 0 | 0 | 0 | 0 | `NOT_COMPUTED` | `NOT_ASSESSED` |
| SEG-03 | 0 | 0 | 0 | 0 | `NOT_COMPUTED` | `NOT_ASSESSED` |
| SEG-04 | 0 | 0 | 0 | 0 | `NOT_COMPUTED` | `NOT_ASSESSED` |
| SEG-05 | 0 | 0 | 0 | 0 | `NOT_COMPUTED` | `NOT_ASSESSED` |
| SEG-06 | 0 | 0 | 0 | 0 | `NOT_COMPUTED` | `NOT_ASSESSED` |
| SEG-07 | 0 | 0 | 0 | 0 | `NOT_COMPUTED` | `NOT_ASSESSED` |
| SEG-08 | 0 | 0 | 0 | 0 | `NOT_COMPUTED` | `NOT_ASSESSED` |
| **Total** | **0** | **0** | **0** | **0** | `NOT_COMPUTED` | — |

### 13.3 Theme matrix

No theme is reported. The matrix has zero populated cells: no segment has a numerator or a denominator.
An empty matrix is not a statement that themes are absent from the market.

### 13.4 Barrier ranking

Not computed. No participant ranked a barrier; no code was applied; no top-3 count exists.

### 13.5 Concept comprehension

| Concept | Participants tested | Correct ≥2 exclusions | Critical misconception | Denominator | Status |
| --- | ---: | ---: | ---: | ---: | --- |
| A | 0 | 0 | 0 | 0 | `NOT_EXECUTED` |
| B | 0 | 0 | 0 | 0 | `NOT_EXECUTED` |
| C | 0 | 0 | 0 | 0 | `NOT_EXECUTED` |
| D | 0 | 0 | 0 | 0 | `NOT_EXECUTED` |
| E | 0 | 0 | 0 | 0 | `NOT_EXECUTED` |

### 13.6 Pricing analysis

Not computed. Zero modules administered, zero raw responses, zero ladders, zero Van Westendorp
responses. No intent band, no acceptable range and no price is produced. `WTP_STATED_PREFERENCE_OBSERVED`
remains false and `APPROVED_PRICES` remains 0.

### 13.7 Negative cases and contradictions

None, because no case exists. The table is empty; it must never be filled with hypothetical
contradictions.

### 13.8 Quotations

None. No quotation permission was granted to anyone because no one was contacted; no de-identification
review exists; no quote may be used.

## 14. Data-quality and audit trail

- Record validation (§2.1) is performed before coding; failed records are corrected only for factual
  transcription errors, never for consent defects.
- Duplicate detection by participant ID and session metadata; a duplicated case never increases a
  denominator.
- Withdrawals are honoured before analysis; withdrawn cases are excluded from analysis denominators and
  recorded in the funnel.
- Every analysis artefact records: analysis-plan version, codebook version, instrument versions, case
  set version, double-coding selection seed, κ inputs and the date. Reproducibility depends on these
  identifiers, not on memory.
- Layer C outputs must reconcile to the aggregate counts in `research-status.json`; a mismatch is a
  defect and blocks reporting.
- No analysis script may read from the repository anything other than Layer C aggregates; participant
  material stays in Layer B and is processed only in the approved environment.

## 15. Cross-references

| Document | Relationship |
| --- | --- |
| `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` §10 (ANA-01) | Source analysis plan this document operationalises |
| `docs/marea/market-validation/MC09-VALIDATION-EXPERIMENTS.md` and `data/validation-experiments.json` | Frozen thresholds, minimum evidence and confounders |
| `docs/marea/customer-discovery/methodology/MC10-RESEARCH-PROTOCOL.md` (D4) | Interview order, capture, double-coding rate, saturation and negative-case rules |
| `docs/marea/customer-discovery/methodology/MC10-RESEARCH-ETHICS-AND-PRIVACY.md` (D3) | Layer A/B/C, consent, pseudonymisation, quotation rules |
| `docs/marea/customer-discovery/methodology/MC10-INSTRUMENT-VERSIONS.md` (D5) and `methodology/instruments.json` | Frozen instruments, review status and codebook-freeze relationship |
| `docs/marea/customer-discovery/data/research-status.json` | Aggregate counts and `coding` block (`cohensKappa: null`) |
| `docs/marea/customer-discovery/MC10-EXPERIMENT-RESULTS.md` | Where per-experiment verdicts are recorded |
| `docs/marea/customer-discovery/data-contract/MC10-DATA-CONTRACT.md` | Schema and reconciliation rules for the coding data |
| `docs/marea/execution/AGENT-OPERATING-MODEL.md` | Review independence and evidence rules |
