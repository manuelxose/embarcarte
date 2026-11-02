# MC-10R — Wave 1 execution plan (D25)

| Field                         | Value                                                                                                                                                                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID                   | MC-10R / D25 / `MC10R-WAVE1-EXECUTION-PLAN`                                                                                                                                                                                      |
| Document status               | `DRAFT`                                                                                                                                                                                                                          |
| Date                          | 2026-11-01                                                                                                                                                                                                                       |
| Owner                         | `agent-d-fieldwork` — Human Interviewer Training and Fieldwork Manager + Marine Recruitment Operations                                                                                                                           |
| Write scope                   | `docs/marea/customer-discovery/recovery/fieldwork/` only                                                                                                                                                                         |
| Recovery contract             | `MAREA-MC10R-CUSTOMER-DISCOVERY-RECOVERY` v`1.0.0`                                                                                                                                                                               |
| Recovery work status          | `IN_PROGRESS`                                                                                                                                                                                                                    |
| External authorization status | `NOT_GRANTED` (`AUTH-MC10-001` revision `2`, `DRAFT_PREPARED`)                                                                                                                                                                   |
| Fieldwork readiness           | `PARTIALLY_READY`                                                                                                                                                                                                                |
| Fieldwork status              | `BLOCKED`                                                                                                                                                                                                                        |
| Wave 1 execution state        | `NOT_STARTED`                                                                                                                                                                                                                    |
| Scope                         | A runnable first-wave protocol for four cohorts (SEG-03, SEG-01, SEG-04, SEG-06), quotas 18–28, Rías Baixas / Galicia only, with prerequisites, evidence, stop rules, supported and unsupported findings, and the expansion rule |
| Is not                        | An authorization, a schedule, a recruitment list, a session record, a result, evidence that any participant exists, or permission to contact anyone                                                                              |

> **STATUS: DRAFT — WAVE 1 NOT EXECUTED.** `AUTH_MC10_001 = NOT_GRANTED`;
> `OUTREACH_AUTHORIZATION = NOT_GRANTED`; `FIELDWORK_STATUS = BLOCKED`;
> `FIELDWORK_READINESS = PARTIALLY_READY`. `WAVE1_START_DATE = null`; `SESSIONS_SCHEDULED = 0`;
> `SESSIONS_COMPLETED = 0`; `PARTICIPANTS = 0`; `INTERVIEWS = 0`; `PRICE_RESPONSES = 0`;
> `CODED_UNITS = 0`. **No appointment, start date or session date exists, and none may be imagined.**
> This plan becomes executable only after a real written authorization and every gate in §5 has real
> recorded evidence.

## 0. Purpose and reading rules

This document is the **runnable protocol** for the first MC-10R fieldwork wave. It fixes the cohort
scope, quotas, geography, experiment mapping, execution sequence, supervision, deviation handling,
coding rules, supported findings, stop rules and expansion rule **before** any fieldwork. It is the
document a future fieldwork lead would execute; it is not the execution.

Reading rules:

1. **Wave 1 is an exploratory pilot, not the full study.** The full study requires the eight-segment
   minimum of 37 completed interviews (ceiling 57). Wave 1 plans 18–28 across four segments. No Wave 1
   output may be presented as the full study, as satisfying the experiment minimums or as meeting MC-10
   acceptance criteria (D2 §3.3, item 5).
2. **Zero is absence of data, not a result.** A planned quota is not a completed interview; an empty
   cell is not zero demand.
3. **No invented appointments or participants.** Every date field is `null`, every session count is 0
   and every funnel count is 0. The plan cannot create a participant, a date or an invitation.
4. **No authorization by document.** This plan, a validator pass, a task assignment or an agent's
   summary never authorize contact.
5. **Exact status strings.** Statuses are drawn from D2 §2. The Wave 1 state is `NOT_STARTED` because
   the prerequisites are blocked.
6. **All findings remain conditional.** Anything in §6 is a statement about what the execution could
   support **if real evidence existed**, never a claim that it exists.

## 1. Wave 1 objective

Wave 1 tests whether the prepared design is executable with real people and produces **within-segment
descriptive evidence** for four priority cohorts, while exposing operational problems (recruitment,
consent, instrument clarity, supervision, coding) before a larger main study.

It is not designed to prove demand, size a market, validate a price, certify a channel or approve a
product. Its outputs feed a reviewed Wave 1 close-out and a **human decision** about Wave 2.

## 2. Cohorts (four)

| Cohort | Segment  | Canonical name                        | Family focus                 | Evidence domains                                                                                                     | Wave 1 quota |
| ------ | -------- | ------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- | -----------: |
| A      | `SEG-03` | Marina-based unattended-vessel owners | `WATCH` / `PROTECT`          | Battery, bilge, remote monitoring, alerts, connectivity at the berth, subscription acceptance for monitoring         |          5–8 |
| B      | `SEG-01` | Recreational motorboat owners         | `NAV` / `START`              | Navigation software, instruments, mixed-brand integration, recent purchases, professional installation               |          5–8 |
| C      | `SEG-04` | Marine electronics installers         | `HUB` and integrated systems | Compatibility evidence, certification expectations, warranty, liability, serviceability, channel conditions          |          5–7 |
| D      | `SEG-06` | Marina or shipyard operators          | `WATCH` / `FLEET`            | Multi-vessel visibility, work-list and handover workflow, monitoring requirements, liability and privacy constraints |          3–5 |

### 2.1 Cohort A — `SEG-03`, unattended-vessel owners

- **Why this cohort.** The unattended-vessel owner is the primary owner-side test of the monitoring
  problem and of subscription acceptance for continuous external services.
- **Instruments.** Candidate `GUIDE-01` `1.1.0` Q1–Q15; `PRICE-01` monitoring construct only after Q11;
  `NOTE-01`.
- **Experiments fed.** `EXP-MC10-01` (problem and purchase history, owner side); `EXP-MC10-03`
  (subscription acceptance); `EXP-MC10-05` (monitoring hardware-plus-subscription price perception —
  quantitative only at n≥8, see §6.3); `EXP-MC10-06` (comprehension of `WATCH`/`PROTECT`);
  `EXP-MC10-09` (owner side of the monitoring incident requirement); `EXP-MC10-10` (barrier ranking).
- **Mandatory extra evidence per completed case.** One concrete recent incident or near-miss narrative
  with the information the owner lacked. The dedicated incident question is a **design gap in frozen
  `GUIDE-01` v`1.0.0`**; it must be added by an approved instrument amendment before fielding, or the
  experiment remains blocked on the instrument. It may never be elicited by inventing or inflating an
  incident.
- **Exclusions.** Vessel ashore, laid up or unused; no responsibility for the vessel; no monitoring
  salience; standing exclusions.

### 2.2 Cohort B — `SEG-01`, coastal recreational motorboat owners

- **Why this cohort.** The mass owner segment for navigation and onboard-data problems, recent purchase
  behaviour and installation experience.
- **Instruments.** Candidate `GUIDE-01` `1.1.0` Q1–Q15; `PRICE-01` `NAV`/`START` constructs only after
  Q11; `NOTE-01`.
- **Experiments fed.** `EXP-MC10-01`; `EXP-MC10-03`; `EXP-MC10-04` (Gabor–Granger — quantitative only at
  n≥8, see §6.3); `EXP-MC10-05` (Van Westendorp — quantitative only at n≥8); `EXP-MC10-06`
  (comprehension of `NAV`/`START`); `EXP-MC10-10`.
- **Mandatory extra evidence per completed case.** One purchase record with year, amount band and
  currency as stated; one spend-band profile; named alternatives in the participant's own words; at
  least one unprompted data-fragmentation problem statement before concept exposure.
- **Exclusions.** No vessel in the 6–15 m class; no purchase role; standing exclusions.

### 2.3 Cohort C — `SEG-04`, marine electronics installers

- **Why this cohort.** The professional channel gate: what an installer requires before fitting a new
  system, and what liability, warranty, training and serviceability conditions apply.
- **Instruments.** Installer frame (professional, not the owner `GUIDE-01`); candidate `1.1.0`
  comprehension descriptions for `HUB` and `INTEGRATED_SYSTEM`; `NOTE-01`.
- **Experiments fed.** `EXP-MC10-02` (compatibility evidence, warranty/RMA clarity, supervised trial
  stance); `EXP-MC10-06` (professional comprehension); `EXP-MC10-10` (professional barrier block).
- **Mandatory extra evidence per completed case.** A named go/no-go installation requirement list and a
  liability/insurance statement in the participant's own words.
- **Design rules.** Installers are interviewed about **their own** workflow, liability and channel
  economics — never asked to speculate about what boat owners want. `PILOT` steering installations are
  excluded: `PILOT_SAFETY_GATE = BLOCKED`; no installer demo or trial may involve a steering
  installation. Any price or margin statement is the participant's own business context, never an
  approved MAREA term.
- **Exclusions.** No independent install history; not the technical decision-maker; fewer than 5 years;
  fewer than 2 first-party brands; competing-vendor employee; standing exclusions.

### 2.4 Cohort D — `SEG-06`, marina or shipyard operators

- **Why this cohort.** The operator side of monitoring: whether operators value work-list and handover
  information over raw sensor feeds, and what liability and privacy conditions apply.
- **Instruments.** Marina/shipyard operator monitoring frame (operator side); candidate `1.1.0`
  comprehension descriptions for `WATCH` and `FLEET`; `NOTE-01`.
- **Experiments fed.** `EXP-MC10-09` (operator side: at least two operators naming a handover or
  work-list information need); `EXP-MC10-07` (B2B fleet trial stance — registered minimum is 5 operators
  responsible for at least 5 vessels, so Wave 1's 3–5 SEG-06 quota can meet it only at the ceiling and
  only if every participant meets the ≥5-vessel criterion; otherwise `BELOW_REGISTERED_MINIMUM`);
  `EXP-MC10-06` (comprehension); `EXP-MC10-10`.
- **Mandatory extra evidence per completed case.** A concrete account of the current checking routine,
  the handover/work-list information need, and any liability or privacy condition the operator names.
- **Design rules.** No berth-holder lists, no vessel records, no customer manifests and no telemetry are
  requested or accepted. `FLEET` constraints are preserved: hardware not included by default, no
  cross-tenant access, no SLA, no remote control. A marina is never presented as a partner.
- **Exclusions.** Operator with no third-party vessels and no refit responsibility; no operational
  decision role; standing exclusions.

### 2.5 Cohorts not in Wave 1

`SEG-02` (sailing yacht owners), `SEG-05` (retailers and chandlers), `SEG-07` (charter and sailing
schools) and `SEG-08` (fleet managers) are **out of Wave 1 scope**. Their quotas remain part of the full
study and require Wave 2 under an approved sampling/scope amendment (§9). No Wave 1 finding may be
reported as evidence for these segments, and no substitution or pooling is permitted.

## 3. Canonical quotas and geography

| Segment          | Cohort | Minimum | Maximum |
| ---------------- | ------ | ------: | ------: |
| `SEG-03`         | A      |       5 |       8 |
| `SEG-01`         | B      |       5 |       8 |
| `SEG-04`         | C      |       5 |       7 |
| `SEG-06`         | D      |       3 |       5 |
| **Wave 1 total** | —      |  **18** |  **28** |

These are the D2 §3.3 canonical Wave 1 quotas. They are a subset of the full-study per-segment
quota contract (minimum 37, maximum 57 across eight segments) and are not a study completion target.

Geography: **Rías Baixas / Galicia (Spain only)**. Northern Portugal is **not fieldable** in Wave 1:
Portuguese instruments are `NOT_PRODUCED`, no PT template exists, qualified linguistic review is
`NOT_OBTAINED`, and the scope is not authorized. No Portuguese channel may be used. No geographic
distribution exists to report.

Quota rules:

- A quota is filled only by completed, consent-valid interviews, never by invitations or interest.
- No segment may be over-filled, under-filled by substitution, or merged with another segment.
- A segment below its minimum at the analysis cut-off is reported as under-recruited; its data is not
  pooled or reclassified.
- A participant counts once, in one segment, in one wave.
- Saturation is a stopping rule for theme discovery only, never a prevalence measure.
- Acquisition sources are varied within a segment where the population allows, and the source is
  recorded per participant.

## 4. Experiment mapping and Wave 1 output limits

This table fixes what Wave 1 may and may not report. A registered experiment verdict (`PASS`, `FAIL`,
`INCONCLUSIVE`) is **not** issued from Wave 1, because D2 §3.3 item 5 forbids presenting the first wave
as satisfying the experiment minimums.

**Reconciliation note (D2 §3.3 item 5 vs D2 §3.4).** D2 §3.4 explicitly allows `SEG-01` and `SEG-03` to
produce an "experiment-level pricing result" if eight completed pricing-module interviews are achieved,
while D2 §3.3 item 5 says no first wave may be presented as satisfying "the experiment minimums". This
plan reconciles the two conservatively: it permits only the pricing indication that §3.4 names,
labels it `WAVE1_PRICING_INDICATION_ONLY`, and issues **no** registered experiment verdict from Wave 1
(all `PENDING_WAVE2`). If the Lead reads §3.3 item 5 as prohibiting even that indication, the Wave 1
pricing output becomes `BELOW_REGISTERED_MINIMUM_PENDING_WAVE2`; that is a D2 clarification for the
Lead, not a reinterpretation this document may make unilaterally.

| Experiment                                          | Registered minimum evidence                                                                        | Wave 1 cohorts                                |                                           Wave 1 maximum possible | Wave 1 output class                                                                                                   | Final verdict                               |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------: | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `EXP-MC10-01` Problem and purchase history          | ≥5 per segment, two coders, saturation, 40–80 total for the full study                             | A, B, C, D (D below 5)                        |        18–28 across four segments; 5–8 per segment except D (3–5) | `WAVE1_DESCRIPTIVE_ONLY` — within-segment theme descriptions and spend/workaround evidence where a denominator exists | `PENDING_WAVE2` — no PASS/FAIL/INCONCLUSIVE |
| `EXP-MC10-02` Installer compatibility and liability | ≥5 SEG-04 interviews meeting the profile                                                           | C                                             |                                                               5–7 | `WAVE1_DESCRIPTIVE_ONLY` — named requirement list and liability positions                                             | `PENDING_WAVE2`                             |
| `EXP-MC10-03` Subscription acceptance               | All participants complete the block; ≥5 objection codes per segment; n=5–10 per segment indicative | A, B (C/D only where relevant)                |                                             5–8 per owner segment | `WAVE1_DESCRIPTIVE_ONLY` — objection codes and must-survive-lapse statements                                          | `PENDING_WAVE2`                             |
| `EXP-MC10-04` Gabor–Granger                         | n≥8 per applicable segment per construct                                                           | B (A only if monitoring construct applicable) |                                       8 (only at segment ceiling) | `WAVE1_PRICING_INDICATION_ONLY` at n≥8 in SEG-01/SEG-03 per D2 §3.4; otherwise `BELOW_REGISTERED_MINIMUM`             | `PENDING_WAVE2`                             |
| `EXP-MC10-05` Van Westendorp                        | n≥8 per segment per construct; consistency check                                                   | A, B                                          |                                       8 (only at segment ceiling) | `WAVE1_PRICING_INDICATION_ONLY` at n≥8 in SEG-01/SEG-03 per D2 §3.4; otherwise `BELOW_REGISTERED_MINIMUM`             | `PENDING_WAVE2`                             |
| `EXP-MC10-06` Concept comprehension                 | n≥5 per segment; unaided recall for ≥3 concepts; two coders                                        | A, B, C, D (D below 5)                        |                              5–8 for A/B/C (5–7 for C); 3–5 for D | `WAVE1_DESCRIPTIVE_ONLY` — comprehension grid and critical misconceptions where n≥5                                   | `PENDING_WAVE2`                             |
| `EXP-MC10-07` B2B fleet trial                       | ≥5 operators responsible for ≥5 vessels                                                            | D                                             | 3–5; meets minimum only at 5 with every participant at ≥5 vessels | `BELOW_REGISTERED_MINIMUM` likely; descriptive trial stance only                                                      | `PENDING_WAVE2`                             |
| `EXP-MC10-08` Retail channel                        | ≥5 SEG-05 interviews                                                                               | none (SEG-05 excluded)                        |                                                                 0 | `NOT_IN_WAVE1`                                                                                                        | `REQUIRES_WAVE2`                            |
| `EXP-MC10-09` Unattended-vessel monitoring          | 5 owner interviews + 3 operator interviews; incident narrative                                     | A (owner) + D (operator)                      |                                           5–8 owner, 3–5 operator | `WAVE1_DESCRIPTIVE_ONLY` subject to the approved incident-question amendment                                          | `PENDING_WAVE2`                             |
| `EXP-MC10-10` Trust, warranty and data ownership    | Top-3 barrier in ≥50% of participants in ≥3 segments; two coders                                   | A, B, C, D                                    |                                           four segments available | `WAVE1_DESCRIPTIVE_ONLY` — per-segment barrier descriptions                                                           | `PENDING_WAVE2`                             |

Minimum-reachability classes used above:

| Class                           | Meaning                                                                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `WAVE1_DESCRIPTIVE_ONLY`        | Wave 1 may report within-segment descriptions and counts with denominators, explicitly non-inferential and non-experiment-level.                                   |
| `WAVE1_PRICING_INDICATION_ONLY` | The only permitted numeric experiment-level output: SEG-01/SEG-03 pricing classification at n≥8, labelled stated-preference hypothesis, never an offer or a price. |
| `BELOW_REGISTERED_MINIMUM`      | The registered minimum cannot be reached within the Wave 1 quota for that segment; only qualitative evidence may be reported.                                      |
| `NOT_IN_WAVE1`                  | The segment or experiment is outside Wave 1 entirely.                                                                                                              |
| `REQUIRES_WAVE2`                | Only a later, separately authorized wave can produce a registered experiment verdict.                                                                              |
| `PENDING_WAVE2`                 | No registered verdict is issued from Wave 1.                                                                                                                       |

## 5. Execution sequence

The sequence is fail-closed and ordered. Each step requires recorded evidence; a missing evidence item
stops the sequence and no later step may begin. **Current state: every step is `NOT_STARTED` or
`BLOCKED`.**

| Step  | Action                                            | Prerequisite / required evidence                                                                                                                                                       | Current state                         | Stop condition                                                          |
| ----- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ----------------------------------------------------------------------- |
| `E0`  | Internal preparation review                       | This plan and D21–D24, D26 exist and are reviewed; no external contact                                                                                                                 | `IN_PROGRESS` (preparation only)      | Missing deliverable or unreviewed scope                                 |
| `E1`  | Fieldwork prerequisites validated                 | Every pre-fieldwork gate item evidenced: controller, legal review, notices, retention, restricted access, incentive policy, approved channels, interviewer responsibilities            | `BLOCKED`                             | Any gate item incomplete                                                |
| `E2`  | Written authorization granted                     | `AUTH-MC10-001` revision with real authorizer, date, participant categories, geography, channels, volume cap, spend/incentive position, duration and fieldwork lead                    | `BLOCKED` (`NOT_GRANTED`)             | Missing field, expired or revoked authorization                         |
| `E3`  | Human interviewer roster accepted                 | Acceptance evidence for `ROLE-INTERVIEWER`, qualification evidence, conflict declarations, D22 training completion and supervisor sign-off                                             | `NOT_STARTED`                         | No accepted, trained interviewer                                        |
| `E4`  | Approved instruments loaded                       | Candidate `1.1.0` approved for future fieldwork; ES/EN reviewed; amendment defects closed; ladder artefact frozen and referenced                                                       | `NOT_STARTED`                         | Unapproved, mismatched or unfrozen instrument                           |
| `E5`  | Secure storage operational                        | Layer A/B stores `PROVISIONED`, `ACCESS_REVIEWED`, `OPERATIONALLY_APPROVED`; access list and deletion procedure in force                                                               | `NOT_STARTED` (`PROVISIONED = false`) | No operational store                                                    |
| `E6`  | Participants recruited through permitted channels | Channel authorized in the authorization; institutional permission recorded where required; allowed funnel states entered in order; no purchased or scraped data                        | `NOT_STARTED`                         | Unauthorized channel, unauthorized volume, or excluded target           |
| `E7`  | Initial interviews supervised                     | First two sessions per interviewer observed/debriefed; supervision record complete                                                                                                     | `NOT_STARTED`                         | Interviewer not supervised or not authorized                            |
| `E8`  | Early quality review                              | After the first three completed sessions per cohort (or ten overall, whichever first): consent completeness, instrument fidelity, note quality, withdrawal handling; findings recorded | `NOT_STARTED`                         | Critical consent/evidence defect; stop and correct before more sessions |
| `E9`  | Methodological deviation checks                   | Deviation log reviewed; protocol amendments assessed; no threshold, quota or instrument change made to fit data                                                                        | `NOT_STARTED`                         | Unrecorded deviation or post-hoc change                                 |
| `E10` | Remaining interviews under approved protocol      | Quotas reached or saturation recorded; every session under the approved protocol and instrument version                                                                                | `NOT_STARTED`                         | Quota breach, unauthorized contact or unapproved instrument             |
| `E11` | Coding and independent review                     | Two coders; ≥25% double-coded (rounded up, stratified); κ target ≥0.60; negative cases listed; reconciliation complete                                                                 | `NOT_STARTED`                         | Missing consent, missing record, insufficient double coding             |
| `E12` | Conclusions from actual evidence                  | Within-sample counts with denominators only; output classes from §4 respected; every claim traceable to records                                                                        | `NOT_STARTED`                         | Any claim without a record, or any PASS above the permitted scope       |
| `E13` | Wave 1 close-out and Wave 2 decision              | Close-out report, quality review, auditor sample, deviation log, funnel reconciliation; **human** go/no-go decision for Wave 2                                                         | `NOT_STARTED`                         | Missing close-out evidence; no human decision                           |

Sequencing dependency: `E1 → E2 → E3 → E4 → E5 → E6 → E7 → E8 → E9 → E10 → E11 → E12 → E13`.
Recruitment (`E6`) may not begin before `E2`–`E5`; the first session may not begin before `E7`
supervision arrangements exist; analysis may not begin before `E11` prerequisites.

## 6. What Wave 1 could support, and what it cannot

The statements below describe the **maximum** evidential output if Wave 1 is executed with real
participants under the approved protocol. None of it exists today.

### 6.1 Findings Wave 1 could support (within-segment, descriptive)

1. **Planned problem-description coverage per cohort** — the approved instrument would capture
   recurring problem language, current workarounds and any concrete prior spend or workaround cost,
   only from a real recorded answer and never as an assertion without a record (`EXP-MC10-01`).
2. **Recent-purchase process descriptions** for `SEG-01` owners: what was bought, how the decision was
   made, installation experience, mix of brands, with amount bands and currency as stated.
3. **Subscription-attitude descriptions** for owner cohorts: objection codes, functions that must
   survive a lapse, cancellation and cadence preferences (`EXP-MC10-03`).
4. **Unattended-vessel monitoring needs** for `SEG-03`: how the boat is checked, escalation path,
   alerts the owner says they would act on, coverage claims as reported, and one concrete recent
   incident or near-miss per case (`EXP-MC10-09` owner side).
5. **Installer requirements** (`SEG-04`): compatibility evidence demands, warranty/RMA expectations,
   liability positions, commissioning and training conditions, channel conditions (`EXP-MC10-02`
   descriptive).
6. **Operator requirements** (`SEG-06`): current checking routine, work-list and handover information
   needs, liability and privacy conditions, connectivity reality (`EXP-MC10-09` operator side).
7. **Concept comprehension within the tested segments** — correct inclusions, correct exclusions and
   critical misconceptions for the concepts each cohort saw, with the comprehension grid and rubric.
8. **Barrier descriptions per segment** — top-3 barriers named in each segment, with verbatim wording
   where quote permission exists, never aggregated into a cross-segment PASS.
9. **Negative cases and design implications** — explicit counterexamples, refusals and contradictions,
   reported rather than smoothed.
10. **Pricing indications only in `SEG-01`/`SEG-03` at n≥8** — stated-preference classification labelled
    `HYPOTHESIS`, never an offer, never an approved price and never WTP validation.

### 6.2 Findings Wave 1 cannot support

- Any registered experiment verdict (`PASS`, `FAIL`, `INCONCLUSIVE`) for `EXP-MC10-01`, `-02`, `-03`,
  `-06`, `-07`, `-08`, `-09` or `-10`. All remain `PENDING_WAVE2`; the full-study experiment minimums
  require Wave 2 across the eight segments.
- Any claim about the four segments not in Wave 1 (`SEG-02`, `SEG-05`, `SEG-07`, `SEG-08`).
- Market size, share, revenue, margin, conversion, churn, elasticity, demand, prevalence or
  representativeness of any kind.
- A validated willingness to pay, an approved price, a discount, a bundle price or a commercial
  offer.
- A compatibility, certification, warranty or "installer-ready" claim; a trial, listing, distribution
  agreement, LOI or pilot.
- A safety or theft-prevention claim for monitoring; a monitoring-as-certified-service claim.
- A claim that `FLEET` is deployed or has cross-tenant access, an SLA or remote control.
- Any claim that the MC-10 milestone, the full study or the MC-10 acceptance criteria are satisfied.
- Any claim that the research is a product sale or that a product is available, certified, priced or
  orderable.

### 6.3 Pricing limit (D2 §3.4)

- `EXP-MC10-04` and `EXP-MC10-05` retain `n ≥ 8` per applicable segment per construct. The minimum is
  never reduced to obtain a result.
- In Wave 1, only `SEG-01` and `SEG-03` can reach the minimum, and only if **eight completed
  pricing-module interviews** are achieved in that segment. Their planned maximum is 8, so any
  withdrawal or missed module makes the minimum unreachable.
- `SEG-04` (max 7) and `SEG-06` (max 5) are classified `BELOW_REGISTERED_MINIMUM`; they may report
  qualitative price objections only.
- Even at n≥8, the output is a stated-preference hypothesis, labelled `HYPOTHESIS`; no price is
  approved, published or converted to a commercial figure, and `WTP` remains `NOT_MEASURED` until a
  separate quantitative study exists.
- `APPROVED_PRICES = 0`; `ORDERABLE_PRODUCTS = 0`.

## 7. Supervision and early quality review

| Control              | Requirement                                                                                                                                                                                        | Current state |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Initial supervision  | First two sessions of every new interviewer are observed/debriefed by the fieldwork lead or an approved supervisor and scored against the D22 rubric.                                              | `NOT_STARTED` |
| Supervision record   | Each supervised session has a dated record with the supervisor's assessment and any corrective action.                                                                                             | `NOT_STARTED` |
| Early quality review | After the first three completed sessions per cohort (or ten overall, whichever first), the fieldwork lead reviews consent completeness, instrument fidelity, note quality and withdrawal handling. | `NOT_STARTED` |
| Corrective action    | A critical consent or evidence defect pauses recruitment for that cohort until corrected and re-reviewed.                                                                                          | `NOT_STARTED` |
| Ongoing sampling     | 10% random sample of subsequent sessions reviewed for fidelity; the independent auditor samples the reviews.                                                                                       | `NOT_STARTED` |
| Suspension           | A consent breach, data incident, fabrication suspicion or repeated deviation suspends the interviewer immediately pending review.                                                                  | `NOT_STARTED` |

These are **quality controls**, not research thresholds; changing them does not change any preregistered
experiment threshold.

## 8. Methodological deviation checks

1. The deviation log records every deviation with date, participant anonymous ID, section affected, what
   happened and the consequence (examples: skipped question, changed wording, ladder point omitted,
   interruption, recording failure, live translation, late consent).
2. The deviation travels with the data into analysis and is reported; it is never deleted or smoothed.
3. A deviation that affects an experiment's comparability is classified before analysis, with the
   affected records excluded from the relevant denominator and the exclusion reported.
4. Protocol and instrument amendments require a dated amendment record, a new semantic version, an
   updated hash and an approval before further fielding. Data already collected remain evaluated under
   the version in force when collected.
5. A threshold change to fit observed data is prohibited. Any principled threshold change must be
   recorded before the affected data are analysed and the old threshold's verdict also reported.
6. A live-translation session is a recorded deviation and is not analysis-eligible.
7. No document may be edited afterwards to imply that a deviation did not occur.

## 9. Expansion rule

No other segment, no Portuguese geography and no additional wave may be added under this plan. Expansion
requires **all** of the following, in order:

1. Wave 1 is executed (not merely planned) and a reviewed close-out exists, including the independent
   auditor's verified findings.
2. An approved sampling/scope amendment resolves the candidate artefacts
   (`MC10R-SAMPLING-1.1.0-PROPOSED`, `MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED`, status
   `PROPOSED_NOT_EFFECTIVE`) and is dated, approved and recorded.
3. A new authorization revision explicitly names the additional segment(s), geography and channel(s),
   with authorizer, date, volume, spend/incentive position, duration and fieldwork lead.
4. For Portugal: qualified Portuguese translation and review, frozen as a new instrument version with a
   translation sign-off, and an approved PT template set; no PT communication may occur before that.
5. Instruments, templates and training are updated and approved for the expanded scope; interviewers
   are re-certified where the instrument changed.
6. The expanded scope's quotas are consistent with the full-study per-segment contract and with any
   approved amendment.
7. The Wave 2 plan and its separate authorization exist.

Prohibited expansions: widening a segment definition to fill a quota; substituting a missing segment
with another; adding Portugal because a Spanish quota under-filled; running extra interviews "for
context" under the same authorization; treating Wave 1 descriptive counts as Wave 2 evidence.

## 10. Scheduling, dates and appointments

**No date, appointment or schedule exists.** The following fields are real values:

| Field                     | Value  |
| ------------------------- | ------ |
| `WAVE1_START_DATE`        | `null` |
| `WAVE1_END_DATE`          | `null` |
| `SESSIONS_SCHEDULED`      | `0`    |
| `SESSIONS_COMPLETED`      | `0`    |
| `APPOINTMENTS_CREATED`    | `0`    |
| `INVITATIONS_SENT`        | `0`    |
| `PARTICIPANTS`            | `0`    |
| `INTERVIEWERS_AUTHORIZED` | `0`    |
| `SUPERVISORS_ASSIGNED`    | `0`    |
| `AUTHORIZED_CHANNELS`     | `[]`   |

Rules: dates are recorded only from a real scheduling interaction; no estimated, target or placeholder
date may appear in a plan, a record or a validator; a session date is not a fieldwork start date; a
completed session is not a quota; and a quota is not a result.

## 11. Budget, incentives and spending

- Proposed incentives: `ZERO` (a proposal, not approved). No payment, voucher, prize, discount,
  product, credit, travel reimbursement or commercial benefit may be offered.
- Proposed research spending: `ZERO` (a proposal, not approved). No advertising, list purchase,
  recruitment fee, venue cost or travel spend is authorized.
- If a future authorization approves any spend or incentive, it must be recorded in the authorization
  revision and the templates; this plan assumes none and cannot create any.
- `SPENDING_APPROVED = false`; `INCENTIVES_APPROVED = false`.

## 12. Risks, confounders and stop rules

| Risk / confounder                            | Effect                                    | Handling                                                                  |
| -------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------- |
| Purposive, non-probability sampling          | No representativeness, no margin of error | Report within-sample only; never extrapolate                              |
| Gatekeeper selection                         | Sheltered sample                          | Gatekeepers may introduce but not select; vary and log source             |
| Self-selection                               | Accepters differ from refusers            | Record declines and non-responses; no representativeness claim            |
| Interviewer knowledge of MAREA               | Leading and concept leakage               | Frozen instrument, no brand before closing, quality flags, supervision    |
| Small n per segment                          | Only strong signals detectable            | Report raw counts with denominators; no small-difference comparisons      |
| Seasonality (autumn refit)                   | Availability and salience                 | Record date and season; name seasonality as a limitation                  |
| Brand-status disclosure                      | Can itself trigger trust barriers         | Registered confounder; report, never suppress                             |
| Stated intent overstatement                  | Over-optimistic WTP                       | Label hypothesis only; no revenue, conversion or price approval           |
| Language equivalence not established         | Cross-language comparability limited      | Record language; no live translation; no cross-language equivalence claim |
| Missing incident question (`EXP-MC10-09`)    | Owner side cannot be evaluated            | Approved instrument amendment before fielding; never invent an incident   |
| Pricing minimum above quota in SEG-04/SEG-06 | Unreachable quantitative pricing          | `BELOW_REGISTERED_MINIMUM`; qualitative only                              |
| Expansive reading of quotas                  | Post-hoc scope creep                      | Fail-closed expansion rule (§9)                                           |

Operational stop rules (not research thresholds):

1. Stop the wave if a consent, data-security or fabrication defect cannot be corrected.
2. Stop a cohort if its quota is reached or its maximum is exceeded; no over-fill.
3. Stop a session if the instrument version is unapproved or mismatched.
4. Stop if the secure store is not operational; do not collect.
5. Stop if an interviewer is suspended or unaccepted.
6. Stop if the authorization expires, is revoked, or its volume cap is reached.

## 13. Wave 1 completion criteria

Wave 1 may be closed only when all of the following are recorded:

1. Every completed case has a valid consent with all four permissions recorded and a complete,
   reconciled `NOTE-01` record.
2. Each cohort reached its minimum or is reported as under-recruited with the reason; no substitution.
3. The early quality review and the 10% fidelity sample are complete and recorded.
4. The deviation log is complete and reviewed.
5. Two independent coders have completed ≥25% double-coding, with κ reported; negative cases are
   listed.
6. The funnel reconciles: counts by state sum consistently, with `WITHDRAWN` and `EXCLUDED` terminal.
7. The independent auditor has sampled the evidence and reported findings; blocking findings are closed
   and re-verified.
8. A Wave 1 close-out report exists, states the within-scope output classes and makes no claim above
   them.
9. A **human** decision on Wave 2 is recorded by the research owner and programme owner; no agent
   decision is acceptable.

Close-out does not advance the milestone by itself: the full study (37–57) and the eight-segment
experiment minimums remain outstanding, and the programme status stays whatever the real evidence and
approvals support.

## 14. Cross-references

| Document                                                                                                       | Relationship                                                                 |
| -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `MC10R-RECOVERY-EXECUTION-PLAN.md` (D2)                                                                        | Status authority, §3.3 quotas, §3.4 pricing limits, §3.9 validator           |
| `MC10R-HUMAN-INTERVIEWER-OPERATING-MODEL.md` (D21)                                                             | Roles, acceptance and supervision this plan requires                         |
| `MC10R-INTERVIEWER-TRAINING.md` (D22)                                                                          | Training and mock verification prerequisite for `E3`                         |
| `MC10R-INTERVIEWER-OPERATIONS-KIT.md` (D23)                                                                    | The manual the interviewer follows in `E6`–`E10`                             |
| `MC10R-RECRUITMENT-TEMPLATES-ES-EN.md` (D24)                                                                   | Draft communications used only after approval                                |
| `MC10R-FIELDWORK-CHECKLIST.md` (D26)                                                                           | The executable checklist that records these prerequisites and steps          |
| `MC10-RESEARCH-PROTOCOL.md` (MC-10 D4)                                                                         | Interview order, gating, capture and deviation rules                         |
| `MC10-RESEARCH-ETHICS-AND-PRIVACY.md` (MC-10 D3)                                                               | Consent, storage, retention and rights design                                |
| `MC10-INSTRUMENT-VERSIONS.md` (MC-10 D5)                                                                       | Instrument freeze, hashes and amendment defects                              |
| `MC10-OWNER-DISCOVERY.md`, `MC10-INSTALLER-DISCOVERY.md`, `MC10-CHANNEL-AND-FLEET-DISCOVERY.md` (MC-10 D8–D10) | Experiment evidence frames and empty result tables this plan operationalises |
| `MC10-FIELDWORK-AUTHORIZATION.md` (MC-10 D2)                                                                   | The authorization gate and unblock sequence                                  |

## 15. Status statement

```
DOCUMENT                        = DRAFT
WAVE                            = 1
WAVE1_EXECUTION_STATE           = NOT_STARTED
COHORTS                         = 4 (SEG-03, SEG-01, SEG-04, SEG-06)
WAVE1_QUOTA                     = 18–28 (5–8, 5–8, 5–7, 3–5)
GEOGRAPHY                       = Rías Baixas / Galicia (Spain only)
PORTUGAL                        = NOT_FIELDABLE
WAVE1_START_DATE                = null
SESSIONS_COMPLETED              = 0
PARTICIPANTS                    = 0
INTERVIEWS                      = 0
PRICE_RESPONSES                 = 0
CODED_UNITS                     = 0
AUTH_MC10_001                   = NOT_GRANTED
OUTREACH_AUTHORIZATION          = NOT_GRANTED
FIELDWORK_STATUS                = BLOCKED
FIELDWORK_READINESS             = PARTIALLY_READY
```

Wave 1 is a plan, not an execution. It contains no participant, no appointment and no result, and it
cannot be read as authorization to start fieldwork.
