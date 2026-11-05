# MC-10R — Handoff to authorized fieldwork (D36)

| Field | Value |
| --- | --- |
| Document ID | MC-10R / D36 / `MC10R-HANDOFF-TO-AUTHORIZED-FIELDWORK` |
| Programme | EMBARCARTE / MAREA |
| Milestone | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36) |
| Date | 2026-11-01 |
| Owner | `lead` |
| Status | `HANDOFF_READY` — preparation complete, external approvals not obtained |
| Recovery verdict (internal) | `PASS_INTERNAL_PREPARATION_SCOPE` per the independent review D33 (see D33 for the audited commit and re-verification) |
| MC-10 primary research | `BLOCKED` — `AUTH-MC10-001 = NOT_GRANTED`; `OUTREACH_AUTHORIZATION = NOT_GRANTED`; `FIELDWORK_STATUS = BLOCKED` |
| Fieldwork readiness | `PARTIALLY_READY` |

> **This document does not authorize anything.** It tells the programme owner exactly what must be
> approved, by whom, with what evidence, before any real participant may be contacted. A prepared
> authorization draft, a passing validator, a merged PR, an agent statement or this handoff are not
> authorization. Fieldwork stays `BLOCKED` until the release gate of D14 closes fail-closed with real
> evidence.

## 1. What this handoff contains

The MC-10R recovery package turns the blocked MC-10 preparation into an executable programme **on
condition** that a real authorization and its prerequisites exist. It is complete for the internal
preparation scope only:

- the methodology is reconciled and mathematically testable (D5-D8);
- the nine instrument amendments are traceable candidate versions with the historical v1.0.0 retained
  (D9-D12);
- the authorization record is prepared but ungranted, with all 30 numbered fields / 31 flat keys and
  every missing human or legal value `null`/`OPEN` (D13, D29);
- the legal/privacy material is review-ready but not reviewed (D15, D16);
- the secure data infrastructure is designed and locally synthetic-tested but not provisioned
  (D17-D20, D27-D30);
- the human interviewer operating model, training, kit, templates and Wave 1 plan exist, with zero
  humans assigned or trained (D21-D26);
- two deterministic gates and their adversarial suites protect the tree (D31, D32, and the extended
  CR-62);
- an independent audit reviewed the integrated commit (D33).

## 2. Current binding truth (must not be misread)

```
MC10_STATUS                  = BLOCKED
MC10R                        = PASS_INTERNAL_PREPARATION_SCOPE
AUTH_MC10_001                = NOT_GRANTED (revision 2 is DRAFT_PREPARED)
OUTREACH_AUTHORIZATION       = NOT_GRANTED
FIELDWORK_STATUS             = BLOCKED
FIELDWORK_READINESS          = PARTIALLY_READY
PARTICIPANTS                 = 0
INTERVIEWS_COMPLETED         = 0
VALID_ANALYTICAL_CASES       = 0
PRICE_RESPONSES              = 0
EXPERIMENTS_EXECUTED         = 0
PRODUCTS_TESTED              = 0
BUNDLES_TESTED               = 0
TRADEMARK_LEGAL_CLEARANCE    = NOT_GRANTED
SOURCE_IP_CLEARANCE          = NOT_CLEARED
PRODUCT_SALES                = BLOCKED
COMMERCIAL_PUBLICATION       = BLOCKED
PRODUCTION_DEPLOYMENT        = NOT_AUTHORIZED
PROFITABILITY                = NOT_ESTABLISHED
PILOT_SAFETY_GATE            = BLOCKED
COMPATIBILITY_TESTED         = NO
APPROVED_PRICES              = 0
ORDERABLE_PRODUCTS           = 0
```

## 3. What the programme owner must approve to start actual research

Every item is a separate real act. None of them can be satisfied by a document in this repository.

| # | Approval | Who can give it | Evidence required | Current state |
| --- | --- | --- | --- | --- |
| 1 | External research authorization `AUTH-MC10-001` revision ≥ 2, `GRANTED` | Named programme owner with recorded authority basis | Dated, scoped, signed record naming authorizer, authority basis, segments, geography, channels, contact/interview ceilings, spend/incentive position, duration and fieldwork lead; approval evidence attached | `NOT_GRANTED` (D13/D29 draft) |
| 2 | Verified data-controller identity | Controller / programme owner | Verified legal entity, registration identifier, address, representative and role as controller | `OPEN` |
| 3 | Verified privacy contact | Controller | Named or role-based, monitored contact route and response commitment; DPO determination recorded | `OPEN` |
| 4 | Qualified legal review | Qualified legal adviser (ES; PT before Portugal) | Written review reference, scope, date, reviewer identity and conclusions on GDPR/LOPDGDD/Lei 58/2019, lawful basis and research communications | `LEGAL_REVIEW_PENDING` |
| 5 | Approved participant information and consent process | Controller + legal review + research owner | Approved notice versions (ES; PT before Portugal), consent instrument ID/version/language, four separately recorded permissions | `DRAFT_FOR_LEGAL_REVIEW` |
| 6 | Approved effective instrument version | Research owner + methodologist (+ legal for consent) | Signed amendment approval for IV-01…IV-09 and effective version with recomputed hashes; qualified ES/EN review; PT review before Portugal | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` |
| 7 | Approved sampling/quota/protocol amendments | Programme owner | Dated approval of `MC10R-SAMPLING-1.1.0` / `MC10R-SEGMENT-QUOTA-1.1.0` / protocol amendment | `PROPOSED_NOT_EFFECTIVE` |
| 8 | Provisioned secure research store (Layer A/B, outside Git) | Data steward / controller | Real store reference, access list, encryption at rest/in transit, audit logging, retention/deletion configuration | `ARCHITECTURE_DEFINED` only |
| 9 | Access review of the store | Data steward + controller | Recorded access list review, least-privilege evidence, review date and reviewer | `ACCESS_REVIEWED = false` |
| 10 | Operational approval of the processing | Controller | Operational sign-off of retention, deletion, withdrawal propagation, backup, breach response and processor terms | `OPERATIONALLY_APPROVED = false` |
| 11 | Appointed, trained and authorized human interviewers with a named fieldwork lead | Programme owner / fieldwork lead | Named humans accepting roles, conflict-of-interest declarations, completed training records with supervisor sign-off, approved channel access | Zero assigned, zero trained |
| 12 | Authorized outreach channels and gatekeeper permissions | Programme owner | Channel-level authorization plus documented gatekeeper permission; no purchased/scraped lists; templates approved for use | `NOT_APPROVED` / `NOT_SENT` |
| 13 | Active authorized fieldwork period, not expired and not revoked | Programme owner | Effective start/expiry in the authorization record and a revocation mechanism | No period exists |

Until all applicable items are satisfied, the release decision of D14 remains `DENY` and fieldwork
remains `BLOCKED`.

## 4. What is ready now versus what is missing

| Prerequisite | Classification | What exists | What is missing |
| --- | --- | --- | --- |
| Methodology reconciliation | `VERIFIED_COMPLETE` | D5, D6, D7, D8 with the arithmetic and objections | Owner approval of the proposed amendments |
| Instrument amendments | `PREPARED_PENDING_APPROVAL` | D9-D12 candidate v1.1.0, v1.0.0 historical hash verified | Authorized reviewer, effective version, qualified ES/EN and PT review |
| Authorization record | `PREPARED_PENDING_APPROVAL` | D13/D29 complete draft, ungranted | Real authorizer, date, scope, ceilings, signature |
| Legal/privacy corpus | `EXTERNAL_DEPENDENCY` | D15/D16 review-ready | Qualified legal review and controller identity |
| Secure storage | `BLOCKED` | D17-D20 design and local synthetic tests | Provisioned store, access review, operational approval |
| Interviewer panel | `NOT_READY` | D21-D26 operating model, training and kit | Named humans, training completion, supervisor sign-off |
| Channels | `NOT_READY` | D24 templates, D25 plan | Channel authorization, gatekeeper permissions, approved templates |
| Wave 1 execution | `NOT_READY` | D25 runnable plan | Every prerequisite above plus the executed sequence |

## 5. Proposed Wave 1 (not authorized, not executed)

- **Cohort A — unattended-vessel owners (SEG-03):** WATCH / PROTECT; battery, bilge, remote monitoring,
  alerts, connectivity, subscription acceptance. Quota 5–8.
- **Cohort B — coastal recreational boat owners (SEG-01):** NAV / START; navigation software,
  instruments, mixed-brand integration, purchases, professional installation. Quota 5–8.
- **Cohort C — marine electronics installers (SEG-04):** HUB and integrated systems; compatibility
  evidence, certification expectations, warranty, liability, serviceability, channel conditions.
  Quota 5–7.
- **Cohort D — marina and shipyard operators (SEG-06):** WATCH / FLEET; multi-vessel visibility,
  workflow, monitoring requirements. Quota 3–5.
- **Total:** 18–28 completed interviews, exploratory only, Rías Baixas / Galicia (Spain).
- **Excluded:** northern Portugal until PT instruments, PT legal review and PT-capable interviewers are
  approved; all other segments until Wave 2 under the approved sampling plan.
- **Pricing:** `EXP-MC10-04/05` retain `n >= 8 per segment per construct`. In Wave 1 only SEG-01 and
  SEG-03 can reach the required eight completed pricing-module interviews, and even then only as a
  segment-level indication (`WAVE1_PRICING_INDICATION_ONLY`); no experiment verdict is issued in Wave 1
  (`PENDING_WAVE2`). SEG-04 and SEG-06 are qualitative-pricing only. No price is approved.
- **Wave 2** completes the eight-segment minimum of 37 (ceiling 57). **Wave 3** requires an approved
  quota-expansion amendment.

## 6. Go / no-go sequence for the first real session

Run the sequence in D25 §execution-order with its evidence at every step:
1. D14 release gate re-evaluated and recorded as `OPEN`, with written authorization granted.
2. Human interviewer roster accepted; training completion and supervisor sign-off recorded.
3. Effective approved instruments loaded and identified by version.
4. Secure Layer A/B store and access review confirmed operational.
5. First participants recruited only through authorized channels.
6. Initial interviews supervised; early quality review performed.
7. Methodological deviation checks completed.
8. Remaining interviews only under the approved protocol.
9. Coding, second coding and independent review on real records.
10. Conclusions produced only from actual evidence, with non-representativeness stated.

Any failed step stops the wave. No appointment, interview, participant or date may be invented to make a
step pass.

## 7. Evidence required from actual fieldwork (later)

A completed interview is valid evidence only with: real eligible participant; recorded consent with the
four separate permissions; instrument ID/version/language; date; interviewer; segment attribution;
unprompted problem statement captured before concept exposure; documented purchase history where the
experiment requires it; pricing answers with currency/VAT/provenance where administered; analysis
eligibility; and, where quotations are used, recorded quotation permission. Findings require traceable
valid interviews; no rate has a zero denominator; the sample is never presented as representative; and no
commercial claim may be derived from a small qualitative sample.

## 8. Prohibited until the gate opens

No external contact of any kind; no email, telephone, messaging, on-site or third-party introductions;
no purchased/scraped lists; no participant data collection or processing; no incentive, spend,
advertising, paid recruitment or payment; no publication, testimonial, sale, pre-order or deployment; no
trademark, safety, compatibility, certification or price claim; no MC-11 advance.

## 9. Final distinction

**MC-10R internal recovery verdict:** `PASS_INTERNAL_PREPARATION_SCOPE` — the preparation package is
complete, internally consistent, independently reviewed and executable once legitimately authorized.

**MC-10 real primary research verdict:** `BLOCKED / NOT_EXECUTED` — no participant has been contacted,
no interview has occurred, no market evidence has been collected, and no external authorization has been
granted; customer demand, willingness to pay and commercial viability remain unvalidated.
