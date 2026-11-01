# MC-10 — Fieldwork authorization register

| Field | Value |
| --- | --- |
| Document ID | MC-10 / D2 / MC10-FIELDWORK-AUTHORIZATION |
| Authorization record | `AUTH-MC10-001` |
| Status | `NOT_GRANTED` |
| Authorization date | none |
| Authorizer | none |
| Fieldwork lead | none |
| Permitted scope | none |
| External contact performed | **none** |
| Date | 2026-11-01 |
| Owner | Lead (research programme director) |

This register is the control that gates every external research action in MC-10. It records what
authorization exists, what it permits, and — because no authorization was issued — why no
recruitment, invitation, screening or interview could lawfully occur. The machine-readable mirror is
`data/fieldwork-authorization.json`.

## 1. The rule

An external research action is permitted **only** when all of the following are true:

1. A written authorization record exists, issued by the programme owner or a person to whom the
   programme owner has delegated that authority in writing.
2. The record names a date, the permitted participant categories, the permitted geographic areas,
   the permitted contact methods, any volume limit, any approved spending or incentives, a duration
   and a named fieldwork lead.
3. The pre-fieldwork checklist in §3 is complete.
4. The participant information notice and privacy contact are approved against a named data controller.

The Master Prompt, an open pull request, a task assignment, an approved instrument, a finished
document or a sponsor's enthusiasm are **not** authorization. Authorization cannot be inferred from
the absence of a refusal.

## 2. Record AUTH-MC10-001 — required fields

Every field below is required by the MC-10 mandate. All are absent, therefore the status is
`NOT_GRANTED`.

| Required field | Recorded value | Meaning |
| --- | --- | --- |
| Who authorized the outreach | `null` | No authorizer identified |
| Authorization date | `null` | No dated grant |
| Permitted participant categories | `[]` | No segment may be approached |
| Permitted geographic areas | `[]` | No area may be worked |
| Permitted contact methods | `[]` | No channel may be used |
| Direct email allowed | `false` | Not permitted |
| Telephone allowed | `false` | Not permitted |
| Introductions allowed | `false` | Not permitted |
| On-site invitations allowed | `false` | Not permitted |
| Maximum outreach volume | `0` | No contact at all |
| Spending approved | `false` | No chargeable research, travel or advertising |
| Incentives approved | `false` | Zero-incentive policy proposed, not approved |
| Duration / expiry | `0` days / `null` | No window exists |
| Responsible fieldwork lead | `null` | No accountable interview lead |
| Prohibited targets | minors, vulnerable persons, employees of competing marine-electronics vendors, programme staff or agents as participants | Standing exclusions |
| Prohibited channels | purchased lists, scraped personal emails, private marina customer records, cold automated campaigns, paid-advertising recruitment | Standing exclusions |

`NOT_GRANTED` means the programme is at the authorization gate. It does not mean "pending but
effectively allowed". It is a hard stop.

## 3. Pre-fieldwork checklist — actual state

Every item below is required before the first external invitation. A single incomplete item blocks
fielding. The source of record is `data/research-status.json` (`wave0Checklist`).

| # | Requirement | State | Why |
| --- | --- | --- | --- |
| W0-01 | Verified MC-09 baseline | `COMPLETE` | Branch `9d206cc`, PR #15 open/draft/MERGEABLE, clean tree |
| W0-02 | Named research owner | `COMPLETE` | Lead named in `MC10-RESEARCH-SCOPE.md` |
| W0-03 | Named data controller | `BLOCKED` | Legal seller identity is `OPEN`; no controller designated |
| W0-04 | Verified controller contact | `BLOCKED` | No privacy contact exists and none may be invented |
| W0-05 | Lawful basis reviewed and approved | `BLOCKED` | Consent analysis drafted; no qualified legal sign-off for ES/PT |
| W0-06 | Participant information and privacy notices approved | `NOT_APPROVED` | Cannot issue a notice against an unnamed controller |
| W0-07 | Spanish and English instruments reviewed | `PARTIAL` | Internal structural/meaning review only; no qualified bilingual sign-off |
| W0-08 | Portuguese instruments | `NOT_PRODUCED` | Withheld without qualified linguistic review; northern Portugal unavailable |
| W0-09 | Defined geographic and recruitment scope | `COMPLETE` | Rías Baixas / Galicia prepared |
| W0-10 | Approved outreach channels | `BLOCKED` | Every channel is `NOT_AUTHORIZED` |
| W0-11 | Approved interviewer responsibilities | `NOT_APPROVED` | Instructions prepared; no panel assigned or trained |
| W0-12 | Secure research-data storage | `BLOCKED` | No Layer A/B store provisioned; repository must not hold participant data |
| W0-13 | Restricted access policy in force | `NOT_APPROVED` | Designed, not accepted by any operator |
| W0-14 | Retention and deletion rules in force | `NOT_APPROVED` | No accountable retention owner without a controller |
| W0-15 | Incentive policy approved (even if zero) | `NOT_APPROVED` | Zero-incentive policy proposed, approval outstanding |
| W0-16 | Thresholds and price ladders frozen | `COMPLETE` | Frozen by hash before any data could exist |
| W0-17 | Recorded fieldwork start authorization | `BLOCKED` | `AUTH-MC10-001 = NOT_GRANTED` |

13 of 17 items are therefore not complete: 6 `BLOCKED`, 5 `NOT_APPROVED`, 1 `PARTIAL` (ES/EN review
without qualified sign-off) and 1 `NOT_PRODUCED` (PT instruments). Only 4 items are `COMPLETE`
(baseline, research owner, geographic scope, threshold/ladder freeze). Fielding is impossible.

Before any fielding, the registered plan inconsistencies recorded in `data/research-status.json` →
`planningInconsistencies` must be resolved by dated amendment: the 37–57 per-segment quota sum versus
the 40–80 total, the conflicting "target 8" readings, the unreachable n ≥ 8 pricing minimum for four
segments, and instrument amendments IV-01…IV-06.

## 4. Additional environment constraint

The agent tool surface exposes document, file, shell, web-search and web-fetch tools. It exposes
**no email, telephony or messaging tool**. The repository does contain application mail code
(`nodemailer`, enabled only when `SMTP_HOST` is configured) used for commerce notifications; it is not
a research-contact channel, is not configured with any research recipient list, and using it to invite
participants would itself be an unauthorized contact method under `AUTH-MC10-001`.

Even if authorization were granted, this environment could not itself conduct an interview. Real
fieldwork requires trained human interviewers or an approved external survey platform operated under a
data-processing agreement. This is recorded as blocker `BLK-MC10-06` and is not worked around.

## 5. Unblock sequence

To move MC-10 from `NOT_GRANTED` to an executable fieldwork state, the programme owner must:

1. Issue `AUTH-MC10-001` (revision 2) with every field in §2 populated, a real authorizer, a date,
   a duration and a named fieldwork lead.
2. Designate the data controller, record its legal identity and provide a verified privacy contact.
3. Obtain qualified legal review of the lawful basis and of recruitment communications under GDPR,
   the Spanish LOPDGDD and the Portuguese Lei 58/2019.
4. Approve the participant information notice, the four-permission consent model and the retention
   and deletion schedule.
5. Provision an access-controlled Layer A store (contact/consent keys) and Layer B store (notes,
   pseudonymous records) outside the repository, with an access list, encryption and deletion procedure.
6. Approve the zero-incentive policy and confirm that no spending is authorized.
7. Assign and train human interviewers, or approve an external research platform as a processor.
8. Record a fieldwork start date and freeze the updated authorization revision.

Until every step is recorded, `OUTREACH_AUTHORIZATION = NOT_GRANTED` and `FIELDWORK_STATUS = BLOCKED`.

## 6. What the documents already permit (and do not)

| Allowed without authorization | Not allowed without authorization |
| --- | --- |
| Internal design, drafting, schema work, validators and tests | Identifying or contacting any candidate |
| Preparing bilingual templates marked `NOT_APPROVED` | Sending, publishing or posting any invitation |
| Preparing a recruitment plan and channel list marked `NOT_AUTHORIZED` | Asking a club, marina, association or installer to introduce anyone |
| Preparing price ladders as hypotheses | Administering any price question |
| Designing consent and privacy documents | Obtaining or recording consent from anyone |
| Analyzing MC-09 desk research | Counting any desk-research statement as a participant observation |

## 7. Sensitive information policy

This register never stores authentication secrets, participant names, contact details, berth numbers,
vessel registration numbers or private customer records. Layer A and Layer B data are not stored in
the repository at all. If authorization is later granted, the authorization record lives outside the
repository with the controller's governance documents; only its non-sensitive scope summary enters
the repository, exactly as this document records the absence of a grant.

## 8. Status effect

```
AUTH-MC10-001          = NOT_GRANTED
OUTREACH_AUTHORIZATION = NOT_GRANTED
FIELDWORK_STATUS       = BLOCKED
PARTICIPANTS           = 0
INTERVIEWS             = 0
PRICE_RESPONSES        = 0
MILESTONE              = BLOCKED (primary-research scope)
```

No candidate is a lead. No invitation is demand. No interview may be invented to satisfy a quota.
