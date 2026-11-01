# MC-10 — Recruitment plan (D6)

| Field                        | Value                                                                                                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID                  | MC-10 / D6 / MC10-RECRUITMENT-PLAN                                                                                                                                   |
| Milestone                    | MC-10 of 36 — primary customer discovery                                                                                                                             |
| Status                       | `BLOCKED — OUTREACH AUTHORIZATION NOT GRANTED`; Wave 0 preparation only                                                                                              |
| Document state               | `NOT_EXECUTED` — no candidate identified, no contact, no invitation, no interview                                                                                    |
| Fieldwork counts             | 0 identified, 0 contact-authorized, 0 invited, 0 responded, 0 screened, 0 eligible, 0 consented, 0 interview-completed, 0 analysis-eligible, 0 withdrawn, 0 excluded |
| WTP / pricing evidence       | `NOT_MEASURED` — no price module was administered                                                                                                                    |
| Base                         | MC-09 HEAD `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3`                                                                                                                |
| Working branch               | `feature/marea-mc10-primary-customer-discovery`                                                                                                                      |
| Date                         | 2026-11-01                                                                                                                                                           |
| Author                       | Agent B — Recruitment Operations Specialist                                                                                                                          |
| Write scope                  | `docs/marea/customer-discovery/recruitment/` only                                                                                                                    |
| Companions                   | `MC10-RECRUITMENT-RESULTS.md` (D7); `MC10-OUTREACH-TEMPLATES.md` (D6-B)                                                                                              |
| Machine-readable authorities | `../data/research-status.json`, `../data/fieldwork-authorization.json`, `../data/decisions.json`                                                                     |
| Is not                       | An outreach authorization, a candidate list, a lead list, a marketing or sales plan, a promise of participants, or evidence that any customer exists                 |

STATUS: NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED)

## 0. Purpose, reading rules and authoritative state

This document is the **prepared** MC-10 recruitment design: who would be eligible, how they would
hypothetically be reached, what would be recorded, and under which gate. It is not a campaign and has
not produced a single contact. Its purpose is to make the recruitment method auditable **before** any
fieldwork could start, so that a later authorisation cannot be retrofitted to an improvised sample.

Reading rules:

1. **No candidate exists.** Every count in this document is 0 because no candidate was identified and
   no invitation was issued. A count of 0 is an absence of data, never evidence that demand is absent.
2. **No channel is authorised.** The channels in §4 are candidate methods, each marked
   `NOT_AUTHORIZED`. Naming a channel does not authorise it.
3. **No template is approved.** Outreach text exists only in `MC10-OUTREACH-TEMPLATES.md`, where every
   template is `NOT_APPROVED — NOT_SENT`.
4. **No participant data in Git.** Identity and contact data must never enter this repository; see §10.
5. **Preparation is not execution.** The Master Prompt task, this plan, the frozen instruments or the
   existence of Wave 0 artefacts do not constitute outreach authorisation; see §11 and the
   `inferenceGuard` in `../data/fieldwork-authorization.json`.

Authoritative state, quoted from the Lead-owned records:

```
MC-10 MILESTONE        = BLOCKED
OUTREACH_AUTHORIZATION = NOT_GRANTED
FIELDWORK_STATUS       = BLOCKED
FIELDWORK_EXECUTED     = false
AUTH-MC10-001          = NOT_GRANTED (no authorizer, no date, no permitted categories, volume 0)
```

Driving decisions: D-029 (MC-10 stops at the outreach gate and reports BLOCKED), D-030 (absence of
primary evidence changes no product priority), D-031 (instruments frozen; PT versions withheld),
D-032 (no commercial restriction weakened; stated preference `NOT_MEASURED`), D-033 (MC-11 inherits no
customer evidence).

## 1. Recruitment strategy and preserved quotas

**Method.** Purposive quota sampling with a fixed segment structure, mirrored from the MC-09 discovery
plan and frozen in `../data/research-status.json`. Participants would be selected for their fit to a
narrow operational segment definition, not for representativeness. No probability sampling is
attempted, because the population frame does not exist and must not be purchased or scraped.

**Quotas.** Preserved unchanged from MC-09 / the Lead-owned status record. These are _planned completed
interviews_; completed interviews in MC-10 = **0**.

| Segment | Participant category                  | Planned min | Planned max | Completed in MC-10 |
| ------- | ------------------------------------- | ----------: | ----------: | -----------------: |
| SEG-01  | Recreational motorboat owners         |           5 |           8 |                  0 |
| SEG-02  | Sailing yacht owners                  |           5 |           8 |                  0 |
| SEG-03  | Marina-based unattended-vessel owners |           5 |           8 |                  0 |
| SEG-04  | Marine electronics installers         |           5 |           7 |                  0 |
| SEG-05  | Marine retailers and chandlers        |           5 |           7 |                  0 |
| SEG-06  | Marina or shipyard operators          |           3 |           5 |                  0 |
| SEG-07  | Charter operators and sailing schools |           5 |           8 |                  0 |
| SEG-08  | Fleet managers                        |           4 |           6 |                  0 |
| —       | **Total**                             |      **40** |      **80** |              **0** |

Quota rules that would apply only after authorisation:

- A quota is filled by **completed, consent-valid interviews**, never by invitations or expressions of
  interest. A segment at 0 is reported at 0, not back-filled.
- Within each segment, vary the acquisition source (for example club vs marina vs referral) so an
  all-single-channel sample cannot masquerade as a segment. Source is logged per candidate.
- Operators (SEG-06) and retailers (SEG-05) keep their lower minimums; SEG-06's 3–5 recognises a small
  addressable population in the initial geography.
- Saturation is a stopping rule for theme discovery only, never a prevalence claim.

## 2. Eligibility and exclusion criteria per segment

### 2.1 Global screener gate (SCREEN-01)

The frozen Spanish/English screener in `MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` §5.1 / §6.1 would be
administered verbatim by the recruiter. Its gates:

- **S1** purchase-decision role (required for SEG-01, 02, 03, 07, 08).
- **S2** vessel type and approximate length band, or fleet count.
- **S3** normal base region/country (recorded at region level, never as an address).
- **S4** any equipment or service purchase/installation in the last 24 months.
- **S5** installers/retailers only: ≥5 years trading and ≥2 first-party brands fitted or distributed in
  24 months.
- **S6** employment by a marine-electronics manufacturer, distributor or reseller, or by
  EMBARCARTE / MAREA — **yes = exclude**.
- **S7** participation in another boating market-research study in the last 6 months — record, do not
  automatically exclude.
- **S8** preferred interview language — record; never translate live; PT is not available (§3).

Screener outcome is recorded as `ELIGIBLE` / `NOT_ELIGIBLE` plus a reason code, with no full name.

### 2.2 Per-segment eligibility and exclusion

| Segment | Operational eligibility                                                                         | Segment-specific exclusion                                                      |
| ------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| SEG-01  | Owns a 6–15 m recreational motorboat used for day or coastal trips; decides equipment purchases | No vessel in that class, or no purchase-decision role                           |
| SEG-02  | Owns a 7–16 m sailing yacht used for cruising or racing; decides equipment purchases            | Race-only participation with no cruising equipment spend or no purchase role    |
| SEG-03  | Owner-occupier whose vessel stays afloat unattended for weeks and who cares about monitoring    | Vessel ashore, laid up, or unused; not responsible for the vessel               |
| SEG-04  | Independent or yard installer, ≥5 years active, ≥2 first-party brands fitted in 24 months       | No independent install history; not the technical decision-maker                |
| SEG-05  | Marine retailer/chandler with ranging authority for instruments or safety equipment             | Retail staff without ranging authority; installers speaking only for themselves |
| SEG-06  | Marina or shipyard operator managing berths, third-party vessels or refit work                  | Operator with no third-party vessels and no refit responsibility                |
| SEG-07  | Charter organisation or sailing school with 5–30 vessels under management                       | Fewer than 5 vessels; no operational decision role                              |
| SEG-08  | Fleet manager responsible for multi-vessel operations, maintenance and budgets                  | No maintenance or procurement responsibility                                    |

### 2.3 Universal exclusions (apply to every segment)

- Under 18 years of age.
- Vulnerable persons.
- Employees or contractors of EMBARCARTE / MAREA, and programme staff or agents as participants.
- Employees of competing marine-electronics vendors, manufacturers, distributors or resellers.
- Anyone unable to give 45–60 minutes for the conversation.
- Anyone who cannot be identified through a channel with recorded institutional permission.
- Anyone whose only obtainable data would come from purchased lists, scraped contacts, private marina
  customer records or social-media harvesting.

An excluded candidate is recorded as `EXCLUDED` with a reason code and is not contacted again.

## 3. Geographic scope and language availability

| Area                          | Status                                                    | Language instruments                                                                                                     | Fielding status                           |
| ----------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| Rías Baixas / Galicia (Spain) | Scope defined and prepared (Wave 0 item W0-09 `COMPLETE`) | Spanish and English, parallel but translation equivalence reviewed only, not statistically established (W0-07 `PARTIAL`) | **No fielding** — outreach not authorised |
| Northern Portugal             | Conditional only; cannot be fielded                       | Portuguese instruments deliberately **`NOT_PRODUCED`** (W0-08) without qualified linguistic review                       | **Not available** for fielding            |

Rules: geography would be recorded at municipality/province level only; no addresses, berth numbers,
postcodes or vessel registration numbers. Results from this initial geography would not transfer to the
Mediterranean, northern Europe or inland markets without re-testing. No geographic distribution exists
to report in MC-10.

## 4. Candidate channels — all `NOT_AUTHORIZED`

These are the recruitment methods the programme could propose to an authorizer. None is authorised, no
institutional permission exists, and no approach has been made.

| Channel                               | How it would be used                                                                             | Institutional / gatekeeper permission needed                                   | Status                                               |
| ------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ---------------------------------------------------- |
| Yacht clubs                           | Club secretary forwards or displays an approved invitation; introduction at club level           | Written club permission for member-facing research contact                     | `NOT_AUTHORIZED`                                     |
| Marina-mediated invitations           | Marina office forwards the approved invitation to berth holders at the marina's discretion       | Written marina permission; **no access to berth-holder records**               | `NOT_AUTHORIZED`                                     |
| Sailing associations                  | Association newsletter/noticeboard and class-level introductions                                 | Written association permission                                                 | `NOT_AUTHORIZED`                                     |
| Listed installers and retailers       | Approach publicly listed businesses at their published business contact                          | Business decision-maker consent; verified directory listing only               | `NOT_AUTHORIZED`                                     |
| Shipyards                             | Yard management introduction to refit customers or in-house installers                           | Written yard permission; no customer records                                   | `NOT_AUTHORIZED`                                     |
| Trade associations                    | Association-mediated introduction to member businesses                                           | Written association permission and member opt-in                               | `NOT_AUTHORIZED`                                     |
| Charter operators and sailing schools | Direct approach to publicly listed operators under authorised outreach                           | Operator decision-maker consent                                                | `NOT_AUTHORIZED`                                     |
| Referrals                             | A participant-initiated referral to a peer who consents to be contacted                          | The referred person's own opt-in; no forwarding of contact data without it     | `NOT_AUTHORIZED`                                     |
| Voluntary research channels           | A future approved opt-in research contact route (for example a public research information page) | Legal/website review, controller identity, privacy contact, programme approval | `NOT_AUTHORIZED` (not built, not proposed for build) |

Channel rules:

- No channel may be used until `AUTH-MC10-001` is `GRANTED` with that channel named, and until any
  required institutional permission is recorded.
- Channel permission is institutional; it never substitutes for a participant's individual consent.
- No member lists, berth-holder lists, customer records or contact databases may be requested or
  accepted, even where a gatekeeper offers them.
- A gatekeeper may decline; a decline is final for that channel unless the gatekeeper later re-opens it.
- No channel may be re-approached repeatedly, and no pressure may be applied through existing business
  relationships.

## 5. Gatekeeper approach

If authorisation ever exists, the approach would be:

1. Identify institutions only from public, business-level information (published websites, official
   directories, public association pages). No personal profiles and no social-media harvesting.
2. Send a single, approved, non-promotional institutional request describing the study, the voluntary
   nature of participation, the zero-incentive policy and the no-sales character of the research.
3. Offer the approved information sheet and a copy of the approved invitation for the gatekeeper's
   review; make clear the gatekeeper may decline and that no records are requested.
4. Where the gatekeeper agrees, let the gatekeeper choose the forwarding method (forward, noticeboard,
   introduction). The programme must not receive member data.
5. Record only: channel code, institutional permission yes/no, date and a channel-level contact
   reference held outside Git.
6. Never offer a gatekeeper any commercial benefit, priority, discount, marketing exposure or future
   commercial relationship in exchange for access; such an offer would be a prohibited inducement.

All of the above is preparation. No gatekeeper has been approached and none is authorised.

## 6. Legal and ethical constraints

Prohibited in every circumstance (mirrored in `../data/fieldwork-authorization.json`
`prohibitedContactChannels` and `prohibitedTargets`):

- Purchased contact lists.
- Scraped contact data, including scraped personal emails and social-media harvesting.
- Private marina customer or berth-holder records.
- Cold automated campaigns (mass email, automated messaging, automated dialling).
- Paid advertising recruitment.
- Minors and vulnerable persons.
- Programme staff or agents as participants.
- Employees of competing marine-electronics vendors.
- Access to, or recording of, identity documents, vessel registration numbers, berth numbers, billing
  data, customer lists, manifests or special-category data.
- Any framing of the study as a sale, a pre-order, a waiting list, a pilot commitment or a commercial
  offer.
- Any promise of product availability, price, launch date, certification, warranty, compatibility,
  support, stock or delivery.

Required foundations before any fielding:

- Named data controller and verified privacy contact (Wave 0 items W0-03/W0-04 `BLOCKED`).
- Documented lawful basis: explicit consent under GDPR Art. 6(1)(a), with Art. 13 information; national
  implementations (Spanish LOPDGDD, Portuguese Lei 58/2019) checked (W0-05 `BLOCKED`).
- Approved participant information and privacy notices in the languages used (W0-06 `NOT_APPROVED`).
- Trained interviewer panel and approved interviewer responsibilities (W0-11 `NOT_APPROVED`).
- Secure research-data storage, restricted access, retention and deletion rules (W0-12/W0-13/W0-14
  `BLOCKED` / `NOT_APPROVED`).
- Approved incentive policy, even a zero-incentive one (W0-15 `NOT_APPROVED`).
- Recorded fieldwork start authorisation (W0-17 `BLOCKED`).
- ICC/ESOMAR principles: voluntary participation, adequate information, research never misrepresented as
  selling, respondent protection.

## 7. Incentive policy — zero incentive, `NOT_APPROVED`

The proposal is **`ZERO_INCENTIVE`**: no cash payment, voucher, prize, discount, product, shipping
credit, charity donation, draw entry or advertising spend in exchange for participation.

- Rationale: an incentive could be read as payment for a favourable opinion about a purchase and would
  increase pressure on a voluntary decision about a non-existent product. Even a zero incentive is a
  policy that requires explicit approval before fielding (Wave 0 item W0-15).
- Status: `NOT_APPROVED`. `../data/fieldwork-authorization.json` records `incentivesApproved: false`
  and `spendingApproved: false`.
- Any later incentive change would require a dated, written approval and a template revision; templates
  must never present an incentive as payment for an opinion or as a commercial benefit.

## 8. Sampling limitations, representation and known biases

The sample design is **purposive quota sampling**. It supports theme discovery within segments; it does
not support measurement.

| Limitation / bias        | Effect                                                                                    | Mitigation if fielding occurs                                                | Residual risk                         |
| ------------------------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------- |
| Non-probability sampling | No margin of error, no confidence interval, no population inference                       | State within-sample proportions only; label every count "n = …"              | Cannot be removed at this sample size |
| Gatekeeper selection     | Marina/club staff may pick engaged or "safe" candidates                                   | Ask gatekeepers for an unscreened forward; log each source; vary gatekeepers | Selection stays visible, not removed  |
| Self-selection           | People who accept differ from people who refuse                                           | Record declines and non-responses; do not claim representativeness           | Unavoidable                           |
| Channel concentration    | An all-marina or all-club sample over-represents connected owners                         | Vary acquisition source within each segment; log source                      | Small segments may stay concentrated  |
| Geography                | Galicia/Rías Baixas only; northern Portugal not fieldable                                 | Report geography per record; no transfer claims                              | Cannot be removed                     |
| Language                 | ES/EN only; PT absent; translation equivalence reviewed but not statistically established | Record language per participant; do not translate live                       | PT market untested                    |
| Seasonality              | Autumn refit affects availability and topic salience                                      | Record field dates and seasonality as a confounder                           | Cannot be removed                     |
| Small n per segment      | 3–8 interviews per segment detect only strong repeated signals                            | Do not compare small differences; report raw counts                          | Cannot be removed                     |
| Interviewer knowledge    | Interviewers know MAREA and may probe toward it                                           | Scripted neutral delivery, fixed concept text, no MAREA until closing        | Partially controlled                  |
| Recall error             | Purchase and spend recall may be imprecise                                                | Ask for recent purchases and recorded bands, never invented figures          | Unavoidable                           |
| Saturation illusion      | "No new code" can be a small-sample artefact                                              | Record saturation per segment; never report as prevalence                    | Cannot be removed                     |

Consequence: any later MC-10 output could describe **these participants only**. Percentages would be
within-sample coding proportions. No market-size, share, revenue, conversion or elasticity inference is
possible from this design, and no later authorisation may be used to reinterpret 0 counts as results.

## 9. Recruitment funnel state machine

The funnel is defined here so that a later record cannot invent states or skip steps. **No state below
has been entered by any candidate**: every state count is 0.

```
IDENTIFIED -> CONTACT_AUTHORIZED -> INVITED -> RESPONDED -> SCREENED -> ELIGIBLE -> CONSENTED
   -> INTERVIEW_COMPLETED -> ANALYSIS_ELIGIBLE

From any post-INVITED state: WITHDRAWN
From SCREENED onwards:       EXCLUDED
```

| State                 | Meaning                                                                                                                                                                    | Allowed next states                 | MC-10 count |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ----------: |
| `IDENTIFIED`          | A person matching a segment definition was located through an authorised channel and given an anonymous candidate ID. Being listed in this plan is **not** identification. | `CONTACT_AUTHORIZED`, `EXCLUDED`    |           0 |
| `CONTACT_AUTHORIZED`  | Candidate-specific permission to make contact was recorded (gatekeeper or candidate opt-in, as applicable).                                                                | `INVITED`, `EXCLUDED`               |           0 |
| `INVITED`             | An approved invitation was issued through an authorised channel. No invitation exists.                                                                                     | `RESPONDED`, `WITHDRAWN`            |           0 |
| `RESPONDED`           | The candidate replied (interest or decline). Withdrawal is recorded separately.                                                                                            | `SCREENED`, `WITHDRAWN`             |           0 |
| `SCREENED`            | SCREEN-01 was administered and an outcome recorded. Screening has not occurred.                                                                                            | `ELIGIBLE`, `EXCLUDED`, `WITHDRAWN` |           0 |
| `ELIGIBLE`            | The candidate meets the segment definition and passes all exclusions.                                                                                                      | `CONSENTED`, `WITHDRAWN`            |           0 |
| `CONSENTED`           | CONSENT-01 was administered after the information notice; the four permissions (participation, recording, quote use, follow-up) were recorded separately with dates.       | `INTERVIEW_COMPLETED`, `WITHDRAWN`  |           0 |
| `INTERVIEW_COMPLETED` | GUIDE-01 (and PRICE-01 where in scope) was completed and notes/recording were captured per consent.                                                                        | `ANALYSIS_ELIGIBLE`, `WITHDRAWN`    |           0 |
| `ANALYSIS_ELIGIBLE`   | The record is complete, consent flags are valid, quality checks passed, and only pseudonymised data remains.                                                               | Terminal (unless later withdrawn)   |           0 |
| `WITHDRAWN`           | The participant withdrew at any stage; the date is recorded and downstream artefacts respect the withdrawal.                                                               | Terminal                            |           0 |
| `EXCLUDED`            | An eligibility or exclusion rule was met; reason code recorded; no further contact.                                                                                        | Terminal                            |           0 |

Transition rules: forward-only; no state may be skipped; a candidate with any missing required record is
counted in **no** state; a withdrawn participant is counted once in `WITHDRAWN` and never in a later
state; no interview may exist without `CONSENTED`; no `INVITED` may exist without `CONTACT_AUTHORIZED`.

## 10. Restricted recruitment ledger

The ledger would live **outside the repository**, in the access-controlled Layer A/B research store that
does not yet exist (Wave 0 item W0-12 `BLOCKED`; access policy W0-13 `NOT_APPROVED`). This repository may
contain only this field specification and aggregate counts — never a ledger row.

| #   | Field                  | Allowed values                                                                                                                               | Required      | Rule                                                                                        |
| --- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------- |
| 1   | `candidateAnonymousId` | `MC10-CAND-####`                                                                                                                             | Yes           | Sequential per authorised channel; never derived from initials, email, phone or vessel name |
| 2   | `segmentId`            | `SEG-01` … `SEG-08`                                                                                                                          | Yes           | One primary segment only                                                                    |
| 3   | `generalLocation`      | Municipality or province                                                                                                                     | Yes           | No address, postcode, berth, marina pinpoint or vessel name                                 |
| 4   | `source`               | Channel code (`YACHT_CLUB`, `MARINA`, `ASSOCIATION`, `INSTALLER`, `RETAILER`, `SHIPYARD`, `TRADE_ASSOC`, `CHARTER`, `REFERRAL`, `VOLUNTARY`) | Yes           | Channel-level only; no gatekeeper personal names                                            |
| 5   | `permission`           | `OBTAINED` / `NOT_REQUIRED` / `DECLINED` + date                                                                                              | Yes           | Institutional and candidate permissions recorded separately                                 |
| 6   | `invitationStatus`     | `NOT_INVITED` / `INVITED` / `DECLINED` + date                                                                                                | Yes           | Must be `NOT_INVITED` while the gate is closed                                              |
| 7   | `response`             | `NONE` / `INTERESTED` / `DECLINED` + date                                                                                                    | Yes           | Never interpreted as purchase interest                                                      |
| 8   | `eligibility`          | `NOT_SCREENED` / `ELIGIBLE` / `NOT_ELIGIBLE` + reason code                                                                                   | Yes           | Screener outcome, no free-text justification naming the person                              |
| 9   | `interviewStatus`      | `NOT_SCHEDULED` / `SCHEDULED` / `COMPLETED` / `NO_SHOW` / `CANCELLED`                                                                        | Yes           | Completed requires `CONSENTED` and a valid note record                                      |
| 10  | `consent`              | C1 participation, C2 recording, C3 anonymised quote use, C4 follow-up — each `yes/no` + date                                                 | Yes           | Four separate, non-bundled, non-pre-ticked permissions                                      |
| 11  | `withdrawal`           | `false` / `true` + date + stage                                                                                                              | Yes           | Withdrawal respected in every downstream artefact                                           |
| 12  | `exclusionReason`      | Code from the exclusion codebook                                                                                                             | When excluded | No free-text personal detail                                                                |
| 13  | `researchDate`         | ISO 8601 date of each research interaction                                                                                                   | Yes           | Distinguishes contact, interview and follow-up dates                                        |

Ledger-only fields (never in Git, still restricted): `templateId`, `language` (`ES` / `EN`), `channelId`,
`interviewerId`, and the **identity/contact mapping** (name, email, phone, business, vessel reference).
That mapping is stored separately from the anonymous ledger, access-restricted, with a deletion date,
and is **never committed, pasted into tickets, sent in chat or shared with commercial teams for
targeting**.

## 11. Authorization gate and preconditions

**Gate statement.** `AUTH-MC10-001` is `NOT_GRANTED`. The record has no authorizer, no date, no
permitted participant categories, no permitted geographic areas, no permitted contact methods, a maximum
outreach volume of 0, no spend approval, no incentive approval and no fieldwork lead
(`../data/fieldwork-authorization.json`). Therefore:

```
AUTH-MC10-001            = NOT_GRANTED
OUTREACH_AUTHORIZATION   = NOT_GRANTED
FIELDWORK_STATUS         = BLOCKED
RECRUITMENT_EXECUTION    = NOT_EXECUTED
CANDIDATES               = 0
```

**No candidate may be identified, contacted, invited, screened or interviewed.** Recruitment remains
`NOT_EXECUTED` until a written, dated, scoped authorization record exists that names the authorizer,
the participant categories, the geography, the channels, the volume cap, the spend and incentive status,
the duration, the fieldwork lead and the data controller.

An authorisation record with an absent field is not an authorisation. The Master Prompt text, an open
pull request, an assigned task, a frozen instrument or the existence of this plan do not constitute
authorisation (`inferenceGuard`). The unblock sequence is recorded in
`../MC10-FIELDWORK-AUTHORIZATION.md` §5 and requires: issue `AUTH-MC10-001`; designate the data
controller and privacy contact; complete legal review of the lawful basis and recruitment
communications; provision secure Layer A/B storage; assign and train human interviewers. Until then no
external contact is permitted and no interview count may exist.

Preconditions before the first conversation (all unmet, from the MC-09 plan §12 and Wave 0):
written outreach authorisation; named data controller, lawful basis and privacy contact; frozen
thresholds and price ladders (**this one is complete** — W0-16); reviewed ES/EN translation equivalence
(`PARTIAL`, not statistically established); recruiter training (`NOT_APPROVED`); recorded field start
date (`BLOCKED`).

## 12. Change control and references

- Quotas, segment definitions, exclusion rules, state machine and ledger fields are frozen by this
  document plus `../data/research-status.json`. A change requires a dated amendment, a new document
  version and Lead approval; historical records would stay evaluated under the version in force when
  collected.
- No change to this plan can create an authorisation, a candidate, a contact or a count.
- References: `../data/research-status.json`; `../data/fieldwork-authorization.json`;
  `../data/decisions.json`; `../MC10-RESEARCH-SCOPE.md`;
  `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md`;
  `docs/marea/market-validation/MC09-VALIDATION-EXPERIMENTS.md`;
  `docs/marea/market-validation/buyers/MC09-BUYER-SEGMENTS.md`;
  `docs/marea/execution/AGENT-OPERATING-MODEL.md`; `AGENTS.md`.
- Actual counts are reported only in `MC10-RECRUITMENT-RESULTS.md` (D7). Prepared outreach text is only
  in `MC10-OUTREACH-TEMPLATES.md` (D6-B), where every template is `NOT_APPROVED — NOT_SENT`.
