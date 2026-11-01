# MC-10 — Recruitment results (D7)

| Field                        | Value                                                                                                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID                  | MC-10 / D7 / MC10-RECRUITMENT-RESULTS                                                                                                                                |
| Milestone                    | MC-10 of 36 — primary customer discovery                                                                                                                             |
| Status                       | `BLOCKED — OUTREACH AUTHORIZATION NOT GRANTED`; recruitment `NOT_EXECUTED`                                                                                           |
| Reporting rule               | Actual counts only. No planned target is presented as a result.                                                                                                      |
| Fieldwork counts             | 0 identified, 0 contact-authorized, 0 invited, 0 responded, 0 screened, 0 eligible, 0 consented, 0 interview-completed, 0 analysis-eligible, 0 withdrawn, 0 excluded |
| Completed interviews         | 0 of 0 planned interviews; the MC-09 quota of 40–80 remains entirely unstarted                                                                                       |
| WTP / pricing evidence       | `NOT_MEASURED` — 0 price modules administered                                                                                                                        |
| Base                         | MC-09 HEAD `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3`                                                                                                                |
| Working branch               | `feature/marea-mc10-primary-customer-discovery`                                                                                                                      |
| Date                         | 2026-11-01                                                                                                                                                           |
| Author                       | Agent B — Recruitment Operations Specialist                                                                                                                          |
| Write scope                  | `docs/marea/customer-discovery/recruitment/` only                                                                                                                    |
| Companions                   | `MC10-RECRUITMENT-PLAN.md` (D6); `MC10-OUTREACH-TEMPLATES.md` (D6-B)                                                                                                 |
| Machine-readable authorities | `../data/research-status.json`, `../data/fieldwork-authorization.json`, `../data/decisions.json`                                                                     |
| Is not                       | Demand evidence, lead evidence, a pipeline, an interest measure, a conversion estimate or a market-sizing input                                                      |

STATUS: NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED)

## 0. Reading rules

1. **Every number below is an actual operational count, not a target.** Planned quotas appear only in
   the "planned" columns and are labelled as such.
2. **Every actual count is 0** because no candidate was identified and no invitation was issued:
   `AUTH-MC10-001` is `NOT_GRANTED` and `FIELDWORK_STATUS` is `BLOCKED`.
3. **A zero is an absence of data.** It is not a negative result, not evidence of low demand and not a
   market signal. "No interviews" means "not measured", never "no need".
4. **No row may be inferred into existence.** The tables do not contain an unnamed row, an "example
   candidate", a synthetic respondent or a pilot participant. If a row is not listed, it does not exist.
5. Counts are aggregate only. No participant identity, contact data, verbatim transcript or audio is
   stored in this repository.

## 1. Aggregate recruitment funnel

Source of truth: `../data/research-status.json` → `participantCounts`. This document restates it; it
does not override it.

| Funnel state        | Count in MC-10 |
| ------------------- | -------------: |
| Identified          |              0 |
| Contact authorized  |              0 |
| Invited             |              0 |
| Responded           |              0 |
| Screened            |              0 |
| Eligible            |              0 |
| Consented           |              0 |
| Interview completed |              0 |
| Analysis eligible   |              0 |
| Withdrawn           |              0 |
| Excluded            |              0 |

Sample-level: 0 completed interviews, 0 valid analytical cases, no segment reached saturation.

## 2. Per-segment state

Planned min/max preserved from MC-09 and mirrored in `../data/research-status.json` → `segmentCounts`.
Completed interviews and valid analysis cases are actual MC-10 counts.

| Segment                                      | Planned min | Planned max | Identified | Invited | Completed interviews | Valid analysis cases |
| -------------------------------------------- | ----------: | ----------: | ---------: | ------: | -------------------: | -------------------: |
| SEG-01 Recreational motorboat owners         |           5 |           8 |          0 |       0 |                    0 |                    0 |
| SEG-02 Sailing yacht owners                  |           5 |           8 |          0 |       0 |                    0 |                    0 |
| SEG-03 Marina-based unattended-vessel owners |           5 |           8 |          0 |       0 |                    0 |                    0 |
| SEG-04 Marine electronics installers         |           5 |           7 |          0 |       0 |                    0 |                    0 |
| SEG-05 Marine retailers and chandlers        |           5 |           7 |          0 |       0 |                    0 |                    0 |
| SEG-06 Marina or shipyard operators          |           3 |           5 |          0 |       0 |                    0 |                    0 |
| SEG-07 Charter operators and sailing schools |           5 |           8 |          0 |       0 |                    0 |                    0 |
| SEG-08 Fleet managers                        |           4 |           6 |          0 |       0 |                    0 |                    0 |
| **Total**                                    |      **40** |      **80** |      **0** |   **0** |                **0** |                **0** |

No segment is at minimum, at target, at saturation or in progress. All eight segments are unstarted.

## 3. Invitations and outreach attempts

| Channel                               | Institutional permission obtained | Invitations issued | Reminders sent | Status           |
| ------------------------------------- | --------------------------------: | -----------------: | -------------: | ---------------- |
| Yacht clubs                           |                                 0 |                  0 |              0 | `NOT_AUTHORIZED` |
| Marina-mediated invitations           |                                 0 |                  0 |              0 | `NOT_AUTHORIZED` |
| Sailing associations                  |                                 0 |                  0 |              0 | `NOT_AUTHORIZED` |
| Listed installers and retailers       |                                 0 |                  0 |              0 | `NOT_AUTHORIZED` |
| Shipyards                             |                                 0 |                  0 |              0 | `NOT_AUTHORIZED` |
| Trade associations                    |                                 0 |                  0 |              0 | `NOT_AUTHORIZED` |
| Charter operators and sailing schools |                                 0 |                  0 |              0 | `NOT_AUTHORIZED` |
| Referrals                             |                                 0 |                  0 |              0 | `NOT_AUTHORIZED` |
| Voluntary research channels           |                                 0 |                  0 |              0 | `NOT_AUTHORIZED` |
| **Total**                             |                             **0** |              **0** |          **0** | —                |

`../data/fieldwork-authorization.json` records `maximumOutreachVolume: 0`, so no invitation is
permitted or possible under the current record.

## 4. Responses

| Response category             | Count |
| ----------------------------- | ----: |
| Responses received            |     0 |
| Positive responses            |     0 |
| Declines                      |     0 |
| Follow-up requests received   |     0 |
| Information requests received |     0 |

There is no "no reply" category, because a no-reply state requires a sent invitation and no invitation
exists.

## 5. Screening, consent and interview execution

| Activity                                                                                   | Count |
| ------------------------------------------------------------------------------------------ | ----: |
| Screening conversations (SCREEN-01)                                                        |     0 |
| Candidates screened eligible (ELIGIBLE)                                                    |     0 |
| Candidates screened not eligible (EXCLUDED at screening)                                   |     0 |
| Consent scripts administered (CONSENT-01)                                                  |     0 |
| Consent records with the four permissions (participation, recording, quote use, follow-up) |     0 |
| Interviews scheduled                                                                       |     0 |
| Interviews started                                                                         |     0 |
| Interviews completed (GUIDE-01)                                                            |     0 |
| Interviews completed with the pricing module (PRICE-01)                                    |     0 |
| Interview recordings stored                                                                |     0 |
| Interview notes stored                                                                     |     0 |

Zero consent records exist because no one was screened and no conversation took place.

## 6. Withdrawals and exclusions

| Event                                             | Count |
| ------------------------------------------------- | ----: |
| Withdrawals (any stage)                           |     0 |
| Exclusion decisions (any reason code)             |     0 |
| Exclusions by screener                            |     0 |
| Exclusions for conflict of interest               |     0 |
| Exclusions for age or vulnerability               |     0 |
| Candidates unable to be reached (post-invitation) |     0 |

Withdrawal and exclusion counts are 0 because no candidate entered the funnel. The state machine and
reason codes are defined in `MC10-RECRUITMENT-PLAN.md` §9–§10; they are not results.

## 7. Source distribution

| Acquisition source         | Participants |
| -------------------------- | -----------: |
| Yacht club                 |            0 |
| Marina                     |            0 |
| Sailing association        |            0 |
| Installer referral         |            0 |
| Retailer                   |            0 |
| Shipyard                   |            0 |
| Trade association          |            0 |
| Charter / sailing school   |            0 |
| Participant referral       |            0 |
| Voluntary research channel |            0 |

Source distribution: **none**. No source contributed a participant, so no source-diversity claim can be
made.

## 8. Geographic distribution

| Area                  |                                             Participants |
| --------------------- | -------------------------------------------------------: |
| Rías Baixas / Galicia |                                                        0 |
| Northern Portugal     | 0 (not fieldable: Portuguese instruments `NOT_PRODUCED`) |
| Other Spain           |                                                        0 |
| Other Portugal        |                                                        0 |
| Other country         |                                                        0 |

Geography: **none**. No participant was identified in any area, so the study has no geographic evidence
in either the prepared area or the conditional area.

## 9. Explicit statements of fact

- No candidate was identified.
- No candidate was contacted.
- No invitation was sent.
- No response was received.
- No participant was screened.
- No participant was eligible.
- No participant consented.
- No interview was completed.
- No audio recording exists and no interview note exists.
- 0 of 0 planned interviews were completed; the MC-09 quota of 40–80 completed interviews remains fully
  unstarted, and no interview was ever planned against a real candidate because no candidate exists.
- 0 price responses were recorded; willingness to pay remains `NOT_MEASURED`.
- No gatekeeper was approached; no channel is authorised.
- No template was approved or sent; all templates are `NOT_APPROVED — NOT_SENT`.

## 10. Reconciliation with the authoritative records

These tables restate Lead-owned records and must match them exactly. Any divergence is a defect to be
resolved in favour of the Lead-owned record.

| Record                                 | Field in authority                                     | Authority value                                     | This document                  |
| -------------------------------------- | ------------------------------------------------------ | --------------------------------------------------- | ------------------------------ |
| `../data/research-status.json`         | `participantCounts` (all eleven states)                | all 0                                               | all 0 (§1)                     |
| `../data/research-status.json`         | `segmentCounts[].completedInterviews`                  | all 0                                               | all 0 (§2)                     |
| `../data/research-status.json`         | `segmentCounts[].validAnalysisCases`                   | all 0                                               | all 0 (§2)                     |
| `../data/research-status.json`         | `sample.completedInterviews`                           | 0                                                   | 0 (§2, §9)                     |
| `../data/research-status.json`         | `sample.validAnalyticalCases`                          | 0                                                   | 0 (§2)                         |
| `../data/research-status.json`         | `sample.totalInterviewsPlannedMin/Max`                 | 40 / 80                                             | 40 / 80 (§2)                   |
| `../data/research-status.json`         | `pricing.participantsCompletingPricingModule`          | 0                                                   | 0 (§5)                         |
| `../data/research-status.json`         | `pricing.priceResponsesRecorded`                       | 0                                                   | 0 (§9)                         |
| `../data/research-status.json`         | `outreachAuthorization`                                | `NOT_GRANTED`                                       | `NOT_GRANTED`                  |
| `../data/research-status.json`         | `fieldworkStatus`                                      | `BLOCKED`                                           | `BLOCKED`                      |
| `../data/research-status.json`         | `fieldworkExecuted`                                    | `false`                                             | no contact (§9)                |
| `../data/research-status.json`         | `wave0Checklist` W0-10, W0-17                          | `BLOCKED`                                           | channels `NOT_AUTHORIZED` (§3) |
| `../data/fieldwork-authorization.json` | `authorizationStatus` / `AUTH-MC10-001`                | `NOT_GRANTED`                                       | `NOT_GRANTED`                  |
| `../data/fieldwork-authorization.json` | `maximumOutreachVolume`                                | 0                                                   | 0 (§3)                         |
| `../data/fieldwork-authorization.json` | `permittedContactMethods`                              | `[]`                                                | none (§3)                      |
| `../data/fieldwork-authorization.json` | `authorizationDurationDays` / `authorizationExpiresAt` | 0 / `null`                                          | not granted (§9)               |
| `../data/fieldwork-authorization.json` | `incentivePolicy.status`                               | `NOT_APPROVED`                                      | no incentive approved          |
| `../data/decisions.json`               | D-029                                                  | MC-10 reports `BLOCKED`; no candidate counted       | consistent (§1–§9)             |
| `../data/decisions.json`               | D-030                                                  | zero interviews change no product priority          | no product claim (§11)         |
| `../data/decisions.json`               | D-032                                                  | stated preference `NOT_MEASURED`, approved prices 0 | `NOT_MEASURED` (§9)            |

Reconciliation result: **consistent — all counts 0, all statuses `BLOCKED` / `NOT_GRANTED`.** This
document does not add, remove, round, project or re-interpret a single count.

Cross-check: the derived data file `../data/recruitment-funnel.json` (data workstream) also records
every funnel state and every segment at 0 and preserves the same 40–80 quota. It is derived from
`research-status.json`, which remains the authoritative record; if the two ever diverged, the Lead-owned
`research-status.json` would win and this document would be corrected.

## 11. Why these counts cannot be read as demand, leads or interest

- **0 is not a finding.** No question was asked and no answer was given. An unasked question has no
  result; the correct interpretation is `NOT_MEASURED`, not `NO`.
- **Not leads.** No candidate was identified, so there is no contact, no prospect, no pipeline and no
  follow-up permission. Nothing here may be used for commercial targeting.
- **Not interest.** No response exists, positive or negative. No statement of interest, no verbal
  support, no quote and no testimonial exists from any participant.
- **Not demand evidence.** There is no purchase history, spend, price reaction or trial stance from any
  participant. WTP remains `NOT_MEASURED` and no price may be approved or published.
- **Not a market signal.** Purposive recruitment could not have produced a prevalence estimate even if
  it had been executed; with zero interviews it produces nothing at all.
- **No conversion, share, revenue or market-size inference** is permitted from these tables, now or
  later. Any future document that treats this table as evidence of demand is defective.
- **Preparation is not execution.** The prepared plan, quotas, funnel, ledger design and templates are
  Wave 0 preparation. They are not a recruitment result.

## 12. Blockers and next action

Open blockers, preserved from `../data/research-status.json` `blockers`:

| ID          | Code                                         | Effect on recruitment                                                            |
| ----------- | -------------------------------------------- | -------------------------------------------------------------------------------- |
| BLK-MC10-01 | `OUTREACH_AUTHORIZATION_NOT_GRANTED`         | No candidate may be identified or contacted; volume cap 0                        |
| BLK-MC10-02 | `DATA_CONTROLLER_NOT_DESIGNATED`             | No privacy contact can be given; no information notice can be issued             |
| BLK-MC10-03 | `LAWFUL_BASIS_NOT_LEGALLY_REVIEWED`          | Recruitment communications cannot be approved                                    |
| BLK-MC10-04 | `OUTREACH_CHANNELS_NOT_AUTHORIZED`           | All nine candidate channels remain `NOT_AUTHORIZED`                              |
| BLK-MC10-05 | `SECURE_RESEARCH_DATA_STORE_NOT_PROVISIONED` | No restricted ledger may be created                                              |
| BLK-MC10-06 | `NO_OUTBOUND_CONTACT_CAPABILITY_IN_RUNTIME`  | No email, telephony or messaging capability; trained human interviewers required |
| BLK-MC10-07 | `PT_INSTRUMENTS_NOT_PRODUCED`                | Northern Portugal is not fieldable                                               |

Next action is owned by the programme owner and legal adviser, not by recruitment:
issue a dated, scoped `AUTH-MC10-001`; designate the data controller and privacy contact; complete
legal review of the lawful basis and recruitment communications; provision secure Layer A/B storage;
assign and train the interviewer panel. Until then recruitment stays `NOT_EXECUTED` with every count 0.
