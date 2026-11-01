# MC-10 — Preregistered research protocol

| Field | Value |
| --- | --- |
| Document ID | MC-10 / D4 / MC10-RESEARCH-PROTOCOL |
| Milestone | MC-10 of 36 — primary customer discovery |
| Protocol version | `1.0.0` — preregistered before any fielding |
| Status | `PREREGISTERED — NOT_EXECUTED — FIELDWORK BLOCKED` |
| Milestone status | `BLOCKED` — `OUTREACH_AUTHORIZATION = NOT_GRANTED`; `FIELDWORK_STATUS = BLOCKED` |
| Interviews completed | **0**; participants 0; price responses 0; coded units 0 |
| Base | `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3` |
| Date | 2026-11-01 |
| Owner | agent-a-methodologist (Research Methodologist) |
| Authorities | `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md`; `docs/marea/market-validation/MC09-VALIDATION-EXPERIMENTS.md`; `MC09-VALIDATION-EXPERIMENTS.md` registry and `validation-experiments.json` |
| Is not | executed research, a recruitment plan, a price list, a legal notice, evidence that any participant exists |

> **STATUS: NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED).** This protocol is
> preregistered design only. No participant was identified, contacted, screened or interviewed.

## 0. Status and non-negotiable rules

MC-10's fieldwork is **blocked**. This protocol is the preregistered design that would govern the study
**if and when** `AUTH-MC10-001` were granted and every pre-fieldwork gate item were complete. It has not
been executed, and it must never be cited as if it had been.

Non-negotiable rules:

1. **No interview may count** until a real, eligible participant gave valid consent, the interview was
   actually conducted by a trained human interviewer under this protocol, and a completed record exists
   in the approved Layer B store. A planned quota is not a completed interview. An empty cell is not a
   zero; it is absence of data.
2. **AI-generated dialogue is never evidence.** Simulated interviews, synthetic personas, model-written
   answers, "illustrative" quotes and reconstructed conversations are not data and may not be stored,
   coded, counted or reported as participant records. This applies to this repository and to any
   derivative document.
3. **Desk research is not primary evidence.** MC-09 archetypes, competitor observations and price
   hypotheses are not interviews and may not be counted as cases.
4. **No external contact occurs under this protocol until authorization.** Recruitment, screening,
   consent and interviews are all downstream of the authorization gate (`AUTH-MC10-001`). Preparing this
   document is internal work; no candidate is a lead.
5. **Frozen thresholds and ladders cannot be adjusted after seeing data.** The ten experiment thresholds
   are frozen in `validation-experiments.json`; the price ladders are frozen separately. A change
   requires the amendment procedure in §11 and applies only to later data.
6. **Zero is not a result.** No experiment may be reported `PASS`, `FAIL` or `INCONCLUSIVE` without real
   data. With no data, the verdict is `BLOCKED`.

## 1. Purpose and research questions

MC-10 tests whether the MC-09 desk-research priorities survive contact with real buyers and channel
professionals. It is a **qualitative discovery study with an embedded stated-preference pricing module**.
It is not a survey, not a probability sample, not a demand estimate and not a price test that can approve
a price.

| RQ | Research question | Experiment | Wave |
| --- | --- | --- | --- |
| RQ1 | Do buyers and operators describe a recurring, costly boat-data fragmentation problem unprompted, and do they already spend or work around it? | EXP-MC10-01 | W1 |
| RQ2 | Which compatibility, documentation, warranty and liability conditions do installers require before fitting? | EXP-MC10-02 | W1 |
| RQ3 | Which subscription models are considered acceptable, and what must survive lapse? | EXP-MC10-03 | W2 (after comprehension) |
| RQ4 | Does stated purchase intent decline coherently across the frozen price ladder? | EXP-MC10-04 | W2 (after comprehension) |
| RQ5 | Do participants hold a coherent acceptable price range for each construct? | EXP-MC10-05 | W2 (after comprehension) |
| RQ6 | Can participants restate each concept's composition **and exclusions** without prompting? | EXP-MC10-06 | W1 |
| RQ7 | Would operators accept a supervised, time-boxed trial, and against what success criterion? | EXP-MC10-07 | W3 |
| RQ8 | What conditions would a retailer need before stocking or displaying a product? | EXP-MC10-08 | W3 |
| RQ9 | Do owners of unattended vessels and marina/shipyard operators want different evidence for the same problem? | EXP-MC10-09 | W1/W3 |
| RQ10 | Which barriers — trust, warranty, data ownership — dominate purchase decisions? | EXP-MC10-10 | embedded in W1–W3 |

Each RQ keeps one primary question and one explicit bound on what a result could ever unlock
(`MC09-VALIDATION-EXPERIMENTS.md` §3). The bound is part of the design, not a disclaimer added later.

## 2. Segments and preserved quotas

Quotas are **preserved unchanged** from MC-09 and `research-status.json`. They are binding: no segment
may be over-filled, under-filled by substitution, or merged with another segment to reach a total.

| Segment | Operational definition (binding) | Planned completed interviews | Completed |
| --- | --- | ---: | ---: |
| SEG-01 | Owner or purchase decision-maker who owns a 6–15 m recreational motorboat for day/coastal use | 5–8 | 0 |
| SEG-02 | Decision-maker who owns a 7–16 m sailing yacht used for cruising or racing | 5–8 | 0 |
| SEG-03 | Owner-occupier whose vessel stays afloat unattended for weeks in a marina base | 5–8 | 0 |
| SEG-04 | Independent or yard installer with ≥5 years and ≥2 first-party brands fitted in 24 months | 5–7 | 0 |
| SEG-05 | Marine retailer/chandler with ranging authority for instruments or safety equipment | 5–7 | 0 |
| SEG-06 | Marina or shipyard operator managing berths, third-party vessels or refit work | 3–5 | 0 |
| SEG-07 | Charter organisation or sailing school with 5–30 vessels under management | 5–8 | 0 |
| SEG-08 | Fleet manager responsible for multi-vessel operations, maintenance and budgets | 4–6 | 0 |
| — | **Total planned (as stated in the contract)** | **40–80** | **0** |

The total row reproduces `research-status.json` (`sample.totalInterviewsPlannedMin/Max`) as required.
It does not arithmetically equal the sum of the per-segment quotas: those sum to **37 minimum and 57
maximum**. The discrepancy is inherited from the MC-09 plan and is registered in §15.8; it is not
resolved by editing this table. Any aggregate total in an output must be computed from the per-segment
quotas and labelled as such.

Role separation is a validity requirement: installers (SEG-04) and retailers (SEG-05) are interviewed
about **their own** workflow, liability and channel economics — never asked to speculate about what boat
owners want. Owners are never asked to estimate installer or retailer behaviour. Interviews with the
same participant for both a qualitative and a pricing session require a documented protocol deviation
(EXP-MC10-03); a participant may not be counted twice within the same segment.

Registered quota-summary issues are recorded in §15 rather than resolved silently.

## 3. Sampling logic

### 3.1 Sampling type and limits

Purposive quota sampling within eight narrowly defined segments. There is **no probability sampling**:
no margin of error, no confidence interval, no representativeness, no market-size estimate, no share, no
conversion rate and no revenue inference. Within-sample coding proportions describe only the participants
coded; they are not prevalence. Saturation in a narrow segment is a stopping rule for theme discovery,
not a prevalence measure.

### 3.2 Eligibility

Per segment: meet the operational definition in §2; be a decision-maker or decision influencer for the
relevant purchase; be able to take part in a 45–60 minute conversation in Spanish or English; give valid
consent. Business participants (SEG-04–SEG-08) require organisational consent plus individual consent.

### 3.3 Exclusions

Under 18; vulnerable persons; EMBARCARTE/MAREA employees, contractors or agents; employees of competing
marine-electronics vendors; anyone without a role in the purchase decision; anyone unable to give 45–60
minutes; anyone who already took part in this study; purchased or scraped lists; private marina customer
records; cold automated campaigns; paid-advertising recruitment; cold social-media harvesting.

### 3.4 Acquisition-source rules

1. At least two distinct acquisition source categories per segment where the population allows it, and
   the source recorded per participant. A single-source segment is a validity risk that must be recorded
   as a limitation, not hidden.
2. Referral chains are permitted but capped: no more than half of a segment's completed cases may come
   from referrals by a single referrer. Exceeding the cap is a documented deviation, not a silent fix.
3. Gatekeepers (clubs, marinas, associations) may introduce the study but may not select participants,
   pre-screen for enthusiasm, or observe interviews unless separately consented and justified.
4. The programme may not approach a candidate through a channel that is not authorized in
   `AUTH-MC10-001` and in the channel register.

### 3.5 Quota enforcement

Recruitment stops for a segment when the maximum is reached. A segment at its minimum may close on
saturation before the maximum. A segment below its minimum at the analysis cut-off is reported as
under-recruited; its data are not pooled with another segment to manufacture a quota. No participant is
reclassified to fill a more desirable segment.

## 4. Wave plan W0–W4

The wave structure mirrors the scope of record (`MC10-RESEARCH-SCOPE.md` §6) and the experiment sequence.

| Wave | Work | Experiments | Entry condition | Exit condition | Actual state |
| --- | --- | --- | --- | --- | --- |
| **W0** | Internal readiness: authorization record, ethics/privacy design, protocol, instrument freeze, recruitment plan and templates, data contract, frozen thresholds and price ladders, validator and negative tests | — | Internal work only; no external contact | Every artifact present and reviewed; blocked items recorded | **COMPLETE** for internal preparation, with 13 of 17 checklist items not complete (§12) |
| **W1** | Problems, installation, comprehension, barriers | EXP-MC10-01, -02, -06, -10 | `AUTH-MC10-001 = GRANTED`; every W0 item COMPLETE; interviewer trained; storage provisioned; controller named; notices approved | Segment quotas reached or saturation recorded; comprehension scored before any pricing | **NOT_EXECUTED** — `BLOCKED` |
| **W2** | Subscription acceptance and pricing modules | EXP-MC10-03, -04, -05 | W1 comprehension results scored and reported for the tested concepts | All administered price points recorded; ladders unaltered | **NOT_EXECUTED** — `BLOCKED` |
| **W3** | Professional and B2B validation (installers, retailers, marinas, charter, fleets) | EXP-MC10-07, -08, -09 | Sector channels authorized; professional interviewer panel trained | Segment quotas reached or saturation recorded; no verbal interest upgraded to a trial | **NOT_EXECUTED** — `BLOCKED` |
| **W4** | Coding, reconciliation, analysis and decision records | All ten | All records completed, consented and reconciled; two coders trained | Double-coding and κ reported; within-case and cross-case matrices; verdicts recorded | **NOT_EXECUTED** — `BLOCKED`; no real data exists to code |

W0 completion is not fieldwork and does not move the milestone past `BLOCKED`. The W0→W1 entry gate is
fail-closed: a single incomplete item prevents the first invitation.

## 5. Interview order — 15 numbered steps (Q1–Q15)

The guide has fifteen numbered sections. The order is fixed; steps may not be reordered, merged or
skipped for a completed case. The time bands below are design targets, not measurements (no session has
occurred).

Two controls precede Q1:

1. **Screener (SCREEN-01, S1–S8)** — administered by the recruiter before the session, read verbatim; an
   ineligible answer ends the contact without creating a participant record.
2. **Consent (CONSENT-01, permissions `C1`–`C4`)** — taken at the start of the session, before any note,
   recording or substantive question; refusal of `C1` ends the session.

| Step | Section | Purpose | Gating / constraint | Target time |
| --- | --- | --- | --- | ---: |
| Q1 | Context | Vessel/business and usage through the year | No brand, no price; verbatim | 2 min |
| Q2 | Current equipment and setup | What is aboard, age, connectivity, remembered brands | No brand prompting by the moderator | 3 min |
| Q3 | Current workflow | Last trip or last maintenance, start to finish | Probe information checked, written down, asked, unexpected | 3 min |
| Q4 | Recent real purchase decisions | Last purchase in 24 months and the decision process | Probe influence, alternatives, payment form, aftermath; amount bands only | 5 min |
| Q5 | Current spend | Categories and annual bands | Bands and currency only; never invent a figure | 2 min |
| Q6 | Current alternatives | Products, apps, services, likes and irritations | Probe manual substitute, incumbent, switching trigger | 2 min |
| Q7 | Pain points (undirected) | Unprompted problems and their cost | No solutioning; no product-category names; participant's own words | 5 min |
| Q8 | Installation | Installation, documentation, warranty, compatibility, liability | Probe rework risk and insurance concerns | 3 min |
| Q9 | Subscription | Recurring-fee attitudes | Probe local-function lockout, cadence, cancellation, per-vessel versus per-person | 3 min |
| Q10 | Trust and warranty | What would create distrust in a new company | Probe data ownership, lapse, company disappearance, trust reference | 3 min |
| Q11 | Concept comprehension | Read each neutral concept; unprompted restatement | **Brand not named; benefits not added; exclusions stated first**; record misconceptions, never correct them during this step | 5 min |
| Q12 | Conditional pricing (PRICE-01) | Gabor–Granger ladder and Van Westendorp questions | Only after Q11; required disclosure read verbatim; frozen ladder only | 12 min |
| Q13 | Purchase-intent evidence | Stated intent and what would have to be true | Today-not-orderable statement repeated; intent is not an order | 2 min |
| Q14 | Closing | Anything missed; most important thing; recommend or reject | No new claim; no availability or price | 2 min |
| Q15 | Follow-up permissions | `C4` channel, scope and expiry | Optional; withdrawable; record yes/no and date | 1 min |

Planning band: about 4 minutes for consent plus about 53 minutes for Q1–Q15, inside the 45–60 minute
commitment stated in the consent script. The screener is administered before the session and is not part
of that band. The bands are design targets; actual durations are recorded per session and no claim is made
that they have been observed.

## 6. Moderator discipline

The interviewer/moderator rules are part of the instrument, not style advice.

- **Ask, then stop talking.** Silence is a data-collection technique; do not fill it.
- **Probe** with "why", "what happened next", "how did you decide", "what did you mean by that". Never
  probe with a feature, a brand, a price or a solution.
- **Record verbatim wording** for any statement that may be coded or quoted; mark paraphrases as
  paraphrases; never clean up grammar into a quote.
- **No price before PRICE-01.** State no figure, no range, no "typically" and no competitor price before
  the pricing module.
- **Never describe MAREA as available**, certified, compatible, warranted, supported or purchasable. If
  asked whether something can be bought, the answer is "no".
- **No correction during comprehension.** In Q11, record a misconception; do not teach, defend or
  re-describe.
- **No leading, no prestige framing, no social-desirability cues**, no reading out answer categories
  unless the instrument explicitly instructs it.
- **One question at a time**; repeat the question neutrally if misunderstood.
- **Language:** administer in the participant's declared language; do not translate live; record the
  language; a session in which live translation occurred is a recorded deviation and that record is not
  analysis-eligible.
- **One interviewer per session**; the interviewer may not code their own session as the only coder.
- **Interviewer training is required** but no panel exists (`W0-11 = NOT_APPROVED`). Training design:
  screener practice, consent drills, two mock sessions moderated with the frozen instrument text (used as
  practice material only — mock sessions are never data), probing practice, and a calibration review.
- **Quality flags** are recorded per session: rushed, leading answers, translation issue, participant
  confusion, interruption, recording problem. Quality flags do not delete data; they follow the data into
  analysis and are reported.

## 7. Concept exposure and comprehension-before-pricing

### 7.1 Exposure gating

| Item | Rule |
| --- | --- |
| Brand name | Not used in Q1–Q11. The research organisation is identified in consent for transparency; product/brand names are withheld until the closing disclosure step |
| Concept descriptions | Read verbatim from the frozen instrument; no paraphrase, no added benefit, no price, no availability claim |
| Exclusions | Stated before benefits, as written |
| Visuals | None. No concept image, mock-up, UI screenshot or product photo exists or may be shown |
| Order | Q11 comprehension only after Q1–Q10 are complete |
| Restatement | Unprompted, in the participant's own words: "what does this concept do and what does it not do?" |
| Recording | Correct inclusions, correct exclusions and critical misconceptions are recorded per concept |

### 7.2 Comprehension rubric

Per concept: count of correct inclusions, count of correct exclusions, presence of any critical
misconception, and the verbatim restatement. Critical misconceptions are pre-defined per concept (for
example: believing navigation software includes nautical charts; believing a receive-only device
transmits; believing monitoring prevents theft or guarantees safety; believing a supervised steering
assist is ready to install and unattended). A misconception is a finding about communication and design,
never a marketing opportunity and never a participant failing.

### 7.3 Comprehension-before-pricing rule

- Per session: Q11 is completed and recorded **before** PRICE-01 is administered.
- Per wave: no pricing analysis is reported for a concept until comprehension scoring for the relevant
  segments and concepts has been computed against the registered EXP-MC10-06 rubric.
- MC-09 sequencing is preserved: EXP-MC10-03, -04 and -05 follow only if comprehension `PASS`es. If
  comprehension is `FAIL` or `INCONCLUSIVE`, pricing answers may exist but are reported as **not
  interpretable for that concept**; no pricing verdict may be issued and no copy may use the pricing.
- Price exposure cannot be used to rescue a failed comprehension result.

### 7.4 Price ladders

The ladders are frozen pre-registered hypotheses in `pricing-ladders.json` and are described in the
pricing documents of record. The moderator may not adjust, reorder, add or omit a point mid-interview;
the ladder version in force is recorded per session. The instrument text (`PRICE-01`) references five
pre-registered points per construct; the point values live in the external frozen ladder artefact — see
`MC10-INSTRUMENT-VERSIONS.md` §7 for the freeze-scope limitation this creates.

## 8. Data capture

### 8.1 What is recorded per session

- NOTE-01 fields: participant ID; date and start time; duration; language; segment; role; acquisition
  source; consent flags `C1`–`C4` with timestamps; recording flag; Q1–Q11 verbatim highlights with
  timestamps; concept-comprehension grid; PRICE-01 raw answers with currency and VAT treatment;
  purchase-history records; current-spend bands; alternatives named; barrier ranking; follow-up
  permission; interviewer quality flags; free notes.
- SCHEMA-01 entities: `participant`, `purchaseRecord`, `spendProfile`, `priceResponse`, `barrier`,
  `comprehension`, `coding`, `followUp`.
- Rules: verbatim only for quotes; paraphrases marked; never invent an amount not stated; leave unknown
  fields empty rather than "0"; no full names, addresses, berth numbers or registration numbers; no
  audio or transcript in the repository.

### 8.2 Definition of a completed, countable record

A session counts as one completed interview only when all of the following exist in the approved store:

1. A real, eligible participant (screener outcome `ELIGIBLE`).
2. A valid `C1` consent with timestamp, language and script version.
3. The interview actually conducted by a trained human interviewer under this protocol.
4. A completed NOTE-01 record with the guide sections addressed and gaps flagged.
5. An assigned pseudonymous participant ID; segment, language, acquisition source and interviewer ID.
6. A real session date and duration; recording flag consistent with `C2`.
7. The record reconciled against the recruitment ledger.

Withdrawal, eligibility failure, a recording destroyed on request, an incomplete note or a session
conducted by an untrained interviewer results in **not-counted** status, recorded honestly as
withdrawn/excluded/incomplete. Quality flags do not invalidate a record by themselves; they travel with
it.

### 8.3 Record validation before analysis

Each record is checked for: consent presence and scope; eligibility; date plausibility; language and
instrument version; completeness; duplicate detection; consistency of segment counts; withdrawal
respected. Invalid records are corrected only where a factual correction is legitimate (for example a
transcription typo); an invalid consent is never "fixed" retroactively.

## 9. Coding and quality control

Coding is governed by `MC10-QUALITATIVE-ANALYSIS.md` (D11). The protocol fixes the operational rules:

- **Two independent coders** code at least **25%** of completed transcripts (rounded up), stratified by
  segment with at least one case per segment where cases exist.
- **Cohen's κ target ≥ 0.60** for theme codes; observed agreement, expected agreement, κ, the number of
  units and the per-code matrix are reported. κ below target is reported, not hidden; disagreements are
  adjudicated by discussion and the codebook is clarified only through the dated amendment procedure.
- The interviewer does not act as the sole coder of their own session; where the same person is
  interviewer and coder, double coding must include a second, independent coder.
- Pre-registered codebook first; emergent codes only after the first four real completed interviews
  (D11 §5).
- Every reported proportion carries its denominator. No rate from a zero denominator; such a value is
  `NOT_COMPUTED` or `NOT_APPLICABLE`, never 0%.
- Saturation is recorded per segment as "no new code in the last two interviews"; if not reached, that is
  reported and no saturation claim is made.
- Negative cases are listed explicitly; a decision threshold can fail because of them and that must be
  shown rather than smoothed.
- Coders are trained and calibrated on the codebook using non-participant material only. No calibration
  session uses real interviews outside the double-coded set.

## 10. Analysis and reporting limits

The analysis is preregistered; the analysis plan (D11) and the frozen thresholds are binding.

- Threshold verdicts: `PASS`, `FAIL`, `INCONCLUSIVE` or `BLOCKED`. A verdict requires real data, a
  registered denominator and the frozen threshold. With no data the verdict is `BLOCKED`; with data
  between the PASS and FAIL bands it is `INCONCLUSIVE`. No threshold may be relaxed after fielding.
- Forbidden: market-size, share, revenue, margin, conversion, churn, elasticity, price approval,
  population prevalence, segment prevalence, demand validation, trust readiness, channel access,
  "installer-ready", "proven demand", "customers want", "the market is", "we validated".
- Permitted: within-sample theme counts and proportions with denominators; direction of an intent curve;
  which barrier dominates within the sample; which exclusion is misunderstood; what conditions a
  participant names; qualitative contradiction reporting.
- Pricing analysis is indicative only: monotonicity check, 50% intent band as `HYPOTHESIS`, Van
  Westendorp consistency and acceptable range as `HYPOTHESIS`; no price may be approved, published or
  converted to a commercial figure. `WTP_STATED_PREFERENCE_OBSERVED` remains false until a real
  completion exists; even then it is stated preference, not validated willingness to pay.
- Reporting is aggregate only; no identifiable participant; percentages labelled "within this sample
  (n = …)"; a negative or thin result is published, not dropped.
- No quote may be used publicly, as a testimonial or in marketing, and no quote may be used at all
  without the quotation permission and the approval described in D3 §4.3.

## 11. Deviations and amendments

### 11.1 Session deviations

Recorded in a deviation log (outside the repository) with date, participant ID, section affected, what
happened and the consequence. Examples: skipped question, changed wording, ladder point omitted,
interruption, recording failure, live translation, late consent. The deviation follows the data into
analysis and is reported.

### 11.2 Protocol and instrument amendments

1. A dated amendment record naming the item, the old and new text or value, the reason, and the affected
   instrument/protocol versions.
2. A new frozen version (semantic version increment) and an updated hash in the freeze registers.
3. The Lead's recorded approval and independent review before further fielding.
4. Data collected before the amendment remain evaluated under the version in force when they were
   collected; they are not re-labelled to the new version.
5. Threshold changes cannot be made to fit observed data. A threshold change is permitted only for a
   principled reason recorded before the affected data are analyzed, and the old threshold's verdict must
   also be reported.

No document may be edited after the fact to imply that a deviation did not occur.

## 12. Pre-fieldwork gate checklist (W0-01 … W0-17)

The fielding gate is fail-closed: the first external invitation may not occur until **every** item below
is `COMPLETE`, with `AUTH-MC10-001` granted and every evidence reference present. Current state is copied
from `research-status.json` (`wave0Checklist`), the source of record; it is not restated in a stronger
form.

| Item | Requirement | State | Why |
| --- | --- | --- | --- |
| W0-01 | Verified MC-09 baseline | `COMPLETE` | Branch at `9d206cc`; PR #15 open, draft, MERGEABLE; clean tree |
| W0-02 | Named research owner | `COMPLETE` | Lead / research programme director named |
| W0-03 | Named data controller | `BLOCKED` | No controller designated; legal seller identity OPEN |
| W0-04 | Verified controller contact | `BLOCKED` | No verified privacy contact exists; cannot be invented |
| W0-05 | Lawful basis reviewed and approved | `BLOCKED` | Consent analysis drafted; no qualified legal review or national-law sign-off |
| W0-06 | Participant information and notices approved | `NOT_APPROVED` | Controller identity empty; no notice can be issued |
| W0-07 | Spanish and English instruments reviewed | `PARTIAL` | Internal structural/meaning review only; no qualified bilingual sign-off |
| W0-08 | Portuguese instruments produced where required | `NOT_PRODUCED` | Deliberately withheld without qualified linguistic review; northern Portugal not fieldable |
| W0-09 | Defined geographic and recruitment scope | `COMPLETE` | Rías Baixas / Galicia prepared; northern Portugal conditional |
| W0-10 | Approved outreach channels | `BLOCKED` | No channel authorized; candidates only |
| W0-11 | Approved interviewer responsibilities | `NOT_APPROVED` | Instructions prepared; no panel assigned or trained |
| W0-12 | Secure research-data storage provisioned | `BLOCKED` | Layer A/B store does not exist |
| W0-13 | Restricted access policy in force | `NOT_APPROVED` | Designed; no operator has accepted it |
| W0-14 | Retention and deletion rules in force | `NOT_APPROVED` | No controller means no accountable retention owner |
| W0-15 | Incentive policy approved (even if zero) | `NOT_APPROVED` | Zero-incentive policy proposed; approval outstanding |
| W0-16 | Experiment thresholds and price ladders frozen | `COMPLETE` | Frozen from MC-09 before any data could exist |
| W0-17 | Recorded fieldwork start authorization | `BLOCKED` | `AUTH-MC10-001 = NOT_GRANTED` |

Counted item-by-item against `research-status.json`: **4 COMPLETE** (W0-01, W0-02, W0-09, W0-16) and
**13 not complete** (6 `BLOCKED`, 5 `NOT_APPROVED`, 1 `PARTIAL`, 1 `NOT_PRODUCED`). The gate is closed.

**Documentation discrepancy registered.** `MC10-FIELDWORK-AUTHORIZATION.md` §3 states "7 of 17 items are
therefore blocking", and `MC10-RESEARCH-SCOPE.md` §6 refers to "7 of 17 pre-fieldwork items BLOCKED".
Counted against the source of record, the number of items that are not `COMPLETE` is 13; the number with
state `BLOCKED` is 6. Neither reading matches the "7" summary. The discrepancy is a summary-count defect
in Lead-owned narrative, not a status change; the gate remains closed under every reading. The Lead
should reconcile the summary to `research-status.json`.

W0-08 note: the correct unblock for the Portuguese item is either a qualified PT translation and review
frozen as a new instrument version, **or** a dated scope decision that fielding excludes northern
Portugal. Neither exists, so W0-08 stays `NOT_PRODUCED` and remains an open item. It may not be silently
treated as not applicable.

## 13. Roles and responsibilities

| Role | Responsibility | Current assignment |
| --- | --- | --- |
| Research programme director / Lead | Owns the milestone, integration, Git, final reporting, approval of amendments | Lead |
| Research methodologist | Owns design, ethics/privacy design, protocol, instrument freeze, analysis plan | agent-a-methodologist (design only) |
| Data controller | Determines purposes and means; owns lawful basis, notices, rights and breach decisions | **UNDESIGNATED** |
| Legal adviser | Reviews lawful basis, notices and recruitment communications under GDPR, LOPDGDD and Lei 58/2019 | **NOT ENGAGED** |
| Data steward | Runs Layer A/B storage, access, retention and reconciliation | **NOT ASSIGNED** |
| Interviewer panel | Conducts sessions under this protocol | **NOT ASSIGNED** (`W0-11`) |
| Independent coders | Apply the codebook; double-code ≥25% | **NOT ASSIGNED** |
| Independent reviewer | Audits the preparation and the honesty of the blocked state | Assigned for MC-10 review |
| Recruitment operations | Channels, quotas, funnel ledger | Prepared (Agent B design); channels `NOT_AUTHORIZED` |

An agent may prepare documents but may not act as interviewer, participant, coder of its own output, or
approver of its own design.

## 14. Risks, confounders and mitigations

| Risk / confounder | Effect | Mitigation and reporting |
| --- | --- | --- |
| Engaged, marina-affiliated owners over-represented | Bias toward engaged owners | Source variation; record source; report the skew |
| Interviewer knowledge of MAREA concepts biases probing | Leading | Scripted neutral probes; no brand/price before Q12; quality flags; independent review of transcripts |
| Retrospective purchase recall and rounding | Spend/amount error | Amount bands, currency and VAT recorded; unknown is not zero; recall limitation reported |
| Gatekeeper selects early adopters | Selection bias | Gatekeepers introduce, not select; referral cap; record source |
| Autumn refit/lay-up seasonality | Availability and framing | Season recorded; seasonality named as a limitation |
| Small, exhaustible populations (installers, marinas, fleets) | Quota under-fill | Report under-recruitment; do not substitute; do not widen the definition silently |
| Stated intent overstates real purchase | WTP overstatement | Hypothesis-only labelling; no conversion or revenue inference; no price approval |
| Hypothesis figures read as offers | Commercial misrepresentation | Required disclosure read verbatim; no orderable product; no pre-order, deposit or waiting list |
| Hypothetical products have no tested compatibility rows | Reactions are hypothetical | Reported as a limitation in every affected experiment |
| Currency and VAT confusion | Price data noise | Currency and VAT treatment recorded exactly as stated; no in-record conversion |
| Subjectivity in coding | Unreliable themes | Pre-registered codebook; two coders; κ target 0.60; report low agreement |
| English/Spanish equivalence not established | Cross-language comparability | W0-07 `PARTIAL`; language recorded; equivalence limited to internal review; qualified review required before fielding |
| Interviewer panel absent | Cannot field | `W0-11`, `BLK-MC10-06`; no workaround |
| No outbound email/telephony/messaging in the runtime | Cannot contact anyone from this environment | Human interviewer panel with authorized channels; no simulated contact |

## 15. Preserved inconsistencies and open methodological questions

These are recorded, not resolved by preference. None may be resolved after seeing data.

1. **Quota-summary discrepancy in the MC-09 plan.** The plan's §3 summary says "minimum 5, target 8
   (operators/retailers minimum 3)", while §2's quota table (and `research-status.json`) give 5–8 for
   SEG-01/02/03/07, 5–7 for SEG-04/05, 3–5 for SEG-06 and 4–6 for SEG-08. The segment table and
   `research-status.json` are binding; the summary sentence is descriptive and does not authorise a
   higher maximum.
2. **"Target 8–10" in the experiment registry.** `validation-experiments.json` and
   `MC10-EXPERIMENT-RESULTS.md` say "minimum 5 and target 8–10 per narrowly defined segment". That
   exceeds the preserved quota maxima (8 for owner segments, 7 for SEG-04/05, 5 for SEG-06, 6 for
   SEG-08). Treat "8–10" as descriptive target language, not a quota change; any quota increase
   requires a dated amendment.
3. **Pricing minimum evidence cannot be met by four segments under the preserved quotas.** EXP-MC10-04
   and EXP-MC10-05 require n ≥ 8 per segment per construct, but SEG-04 and SEG-05 cap at 7, SEG-06 at 5
   and SEG-08 at 6. Those segments can never satisfy the registered pricing minimum without a quota
   amendment. Until the programme resolves this (raise quotas, or formally restrict the pricing
   minimum-evidence claim to segments that can meet it), these pricing analyses must be reported as
   `BELOW_REGISTERED_MINIMUM` for the affected segments rather than as PASS/FAIL. This is a design
   inconsistency in the MC-09 package, not something the methodologist may fix silently.
4. **Mixed denominators in EXP-MC10-01.** The threshold mixes "≥60% of coded units" with "≥50% of that
   segment's participants". D11 reports both denominators and treats the stricter reading as binding
   pending a dated clarification; the ambiguity is disclosed in every affected output.
5. **Brand-disclosure gap.** The plan requires that the brand not be named until the closing section,
   but no instrument text contains a closing brand disclosure. The instruments must be amended (new
   version) before fielding; until then the closing disclosure is a designed step without a frozen
   script, which is a recorder risk, not a licence to improvise.
6. **Consent-quotation wording defect** (D3 §5.3; D5 §7): the instrument calls quotation "anonymous"
   while the design permits only de-identification.
7. **Consent-version field gap.** NOTE-01 records consent flags with timestamps but not the consent
   script version or language; the consent record in Layer A must carry both, so NOTE-01/SCHEMA-01 need
   a minor amendment before use.
8. **Quota-total arithmetic.** The per-segment quotas preserved from MC-09 and `research-status.json` sum
   to **37 minimum and 57 maximum** (5 + 5 + 5 + 5 + 5 + 3 + 5 + 4 = 37; 8 + 8 + 8 + 7 + 7 + 5 + 8 + 6 =
   57), while the plan, the experiment registry and `research-status.json` `sample` state a total of
   **40–80**. The two statements are not arithmetically compatible. No threshold or quota may be changed
   to reconcile them by preference. Any reported aggregate must state its derivation; the programme owner
   should either record that the total is a planning envelope independent of the quotas, or amend the
   quota set in a dated record. Until then, a "40–80" total may not be claimed as completed interviews.

## 16. What this protocol cannot establish

- That any participant exists, was contacted, consented or was interviewed.
- Market size, share, revenue, margin, demand, conversion, churn or elasticity.
- A validated willingness to pay, an approved price, a discount or a bundle price.
- That installers would stock, fit or distribute a product; that retailers would list it; that a fleet
  would trial it; that a marina would partner.
- That compatibility, certification, warranty or support claims are true — none has been tested.
- That the MC-09 priority order is right or wrong. Zero interviews are absence of data, not a negative
  result.
- Any change to a commercial restriction, readiness class or publication status.

## 17. Cross-references

| Document | Relationship |
| --- | --- |
| `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` | Recruitment, instruments, schema and analysis plan this protocol operationalises |
| `docs/marea/market-validation/MC09-VALIDATION-EXPERIMENTS.md` and `data/validation-experiments.json` | Ten frozen experiments, thresholds and confounders |
| `docs/marea/customer-discovery/data/research-status.json` | Source of record for counts, quotas and the W0 checklist |
| `docs/marea/customer-discovery/data/fieldwork-authorization.json` | `AUTH-MC10-001` authorization gate |
| `docs/marea/customer-discovery/data/decisions.json` | `D-029`–`D-033` invariant decisions |
| `docs/marea/customer-discovery/methodology/MC10-RESEARCH-ETHICS-AND-PRIVACY.md` (D3) | Consent, layers A/B/C, retention, rights, incident handling |
| `docs/marea/customer-discovery/methodology/MC10-INSTRUMENT-VERSIONS.md` (D5) and `methodology/instruments.json` | Frozen instrument register and source hash |
| `docs/marea/customer-discovery/methodology/MC10-QUALITATIVE-ANALYSIS.md` (D11) | Codebook, coding units, κ, matrices, saturation, forbidden inference |
| `docs/marea/customer-discovery/MC10-EXPERIMENT-RESULTS.md` | Per-experiment blocked verdicts |
| `docs/marea/customer-discovery/MC10-FIELDWORK-AUTHORIZATION.md` | Authorization register and unblock sequence |
| `docs/marea/customer-discovery/data-contract/MC10-DATA-CONTRACT.md` | Schema, layering and reconciliation rules |
| `docs/marea/execution/AGENT-OPERATING-MODEL.md` | Agent roles, review independence and milestone status rules |
