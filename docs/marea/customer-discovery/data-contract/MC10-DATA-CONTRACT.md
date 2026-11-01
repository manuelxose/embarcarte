# MC-10 — Data contract and schema reference (D22)

| Field | Value |
| --- | --- |
| Document ID | MC-10 / D22 / MC10-DATA-CONTRACT |
| Contract ID | `MAREA-MC10-CUSTOMER-DISCOVERY-CONTRACT` |
| Contract version | `1.0.0` |
| Milestone | MC-10 — primary customer discovery |
| Status | `BLOCKED — AUTH-MC10-001 NOT_GRANTED`; Wave 0 preparation complete |
| Data steward | Agent F (research data steward and research-integrity engineer) |
| Validator | `scripts/check-marea-customer-research.mjs` (D23, checks CR-01…CR-62) |
| Negative suite | `scripts/check-marea-customer-research.test.mjs` (D24) |
| Base commit | `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3` |
| Date | 2026-11-01 |

This contract defines the machine-readable layer of MC-10. It exists so that the
milestone can be verified mechanically as **preparation without research
results**: every count is zero, every experiment is `NOT_EXECUTED`/`BLOCKED`,
and the authorization gate cannot be bypassed by editing a document. It is not
evidence that any customer research was performed.

## 1. Three-layer data model

MC-10 separates data by risk. Only Layer C may exist inside this repository.

| Layer | Name | Contents | Location | In Git? |
| --- | --- | --- | --- | --- |
| **A** | Restricted operational | Identity and consent keys: names, contact details, invitation status, signed consent, withdrawal record, the mapping from a pseudonymous participant ID to a person. | Access-controlled store outside the repository (**not provisioned**) | **Never** |
| **B** | Restricted research | Audio, verbatim transcripts, notes, coded-unit source text, raw price answers and any document that can re-identify a participant through context. | Access-controlled store outside the repository (**not provisioned**) | **Never** |
| **C** | Repository aggregate | Schemas, frozen thresholds, planned quotas, zero counts, aggregate registers, status records and the validator. This document and `data/` are Layer C. | `docs/marea/customer-discovery/data/` | Yes |

Rules:

1. A Layer A or Layer B artefact never enters Git, not even an "anonymised"
   excerpt, a screenshot, an audio file or a transcript excerpt. Layer A/B
   storage does not exist in this environment (blocker `BLK-MC10-05`).
2. Layer C records aggregates only. A pseudonymous participant ID (`P-MC10-###`)
   in Layer C must never be accompanied by a name, contact channel, address,
   berth number or vessel registration number.
3. `data-quality.json` must keep `layerAProvisioned: false` and
   `layerBProvisioned: false` while the stores do not exist.
4. The validator scans the repository for personal data and personal-data field
   names (check CR-46) and for participant files outside the research layer
   (CR-47).

## 2. Common record rules (Layer C)

### 2.1 Contract envelope

Every data file starts with the same envelope:

| Field | Type | Rule |
| --- | --- | --- |
| `contractId` | string | `MAREA-MC10-CUSTOMER-DISCOVERY-CONTRACT` (governance mirror uses `MAREA-MC10-GOVERNANCE-STATUS`) |
| `contractVersion` | string | `1.0.0` |
| `milestone` | string | `MC-10` |
| `owner` | string | Agent identifier that owns the file; Lead owns `research-status.json`, `fieldwork-authorization.json` and `decisions.json` |
| `date` | ISO date | `2026-11-01` milestone date |
| `note` | string | What the file is and why zero counts are honest |

All files are valid JSON, UTF-8, 2-space indentation and a final newline.
`manifest.json` indexes every file with `path`, `purpose`, `owner` and
`recordCount`; `data/README.md` is the short usage note.

### 2.2 Identifiers

Identifiers are stable, prefixed and never reused:

| Prefix | Entity | Pattern |
| --- | --- | --- |
| `SEG-0N` | buyer segment | `SEG-01`…`SEG-08` |
| `EXP-MC10-NN` | pre-registered experiment | `EXP-MC10-01`…`EXP-MC10-10` |
| `P-MC10-NNN` | pseudonymous participant | never a name |
| `INT-MC10-NNN` | interview record | one real session |
| `INTV-*` | interviewer | assigned human interviewer ID |
| `PRS-MC10-NNN` | price response | one administered point |
| `FND-MC10-NNN` | finding | requires a valid interview record |
| `BLK-MC10-NN` | blocker | `BLK-MC10-01`…`BLK-MC10-07` |
| `AUTH-MC10-NNN` | authorization record | `AUTH-MC10-001` |
| `D-0NN` | programme decision | `D-029`…`D-033` for MC-10 |
| `QC-NN` | data-quality check | preparation checks only |

A duplicate ID is a defect, not a merge opportunity.

### 2.3 Counts, denominators and "unknown ≠ 0"

- Every count is the number of real records in the register, never a plan, a
  quota, a target or an illustrative example.
- A proportion is reported only with a positive denominator. With zero coded
  units, zero participants or zero interviews, the rate is **undefined**: it is
  not 0% and not 100%. A rate with a denominator of 0 or no denominator fails
  check CR-26.
- Planned sample sizes (`plannedMin`, `plannedMax`, total 40–80) are permitted
  and are labelled as plans. They are never completed counts.
- **Unknown is not zero.** An unknown amount, currency, VAT treatment, kappa or
  agreement value is `null` or an explicit `UNKNOWN` status with a reason. It is
  never coerced to `0`, never silently corrected and never converted in place.
- A qualitative, non-probability sample is never reported as a population
  estimate. Check CR-27 scans documents for percentages of owners/operators/
  participants, representative-sample claims and margin-of-error claims that are
  not part of a registered threshold or an explicit limitation statement.

### 2.4 Currency and VAT

- Currency is ISO-4217 (`EUR`). No conversion is performed inside a raw record;
  any conversion is a separate derived record, and none exists in MC-10.
- Observed competitor amounts keep the source's VAT treatment; a price with no
  stated tax treatment is recorded as `NOT_STATED_ON_PAGE`, never assumed.
- A participant price opinion is a research opinion in the ladder's stated VAT
  basis. It is never written into an approved commercial price field.
- `approvedPrices`, `approvedBundlePrices` and `productSales` stay at 0 and
  `priceApproved` must never be `true` (checks CR-10, CR-25, CR-34, CR-37,
  CR-38).

### 2.5 Price-ladder provenance

Frozen ladders live in `pricing-ladders.json` (owner: Agent E). Each construct
has a neutral `descriptionOfConcept`, a `pricingMode`, `currency`,
`vatTreatment`, exactly five strictly ascending `ladder` points with
provenance, four Van Westendorp questions and a five-point buy-response scale.
Each point cites an MC-09 observation or an unapproved MC-09 family price
hypothesis; a bracket probe must say it is an arithmetic extension and not an
observation.

`pricing-responses.json` references that freeze (`ladderReference`) and every
response must carry `currency`, `vatTreatment`, a known `constructId` and
`pointIndex`, a `method` (`GABOR_GRANGER` or `VAN_WESTENDORP`), the
`ladderVersion` and a real `responseDate`. An unknown amount is `null` with
`amountStatus: "UNKNOWN"`, never `0`. With `administered: false` the response
array must be empty (checks CR-25, CR-54, CR-55).

### 2.6 Interview, participant and consent records

An interview record is evidence only when all of the following are true
(checks CR-19–CR-24):

- a real pseudonymous participant exists with a valid segment, role, country,
  `ES`/`EN` language and acquisition source;
- eligibility is confirmed, consent is recorded with a real date that does not
  post-date the interview, and the four separate permissions (participation,
  recording, quotation, follow-up) are recorded booleans;
- the interview date is real and not before the milestone date, the source and a
  real interviewer ID are recorded, and the completion status is explicit;
- an incomplete interview cannot be analysis-eligible;
- a withdrawn participant cannot remain analysis-eligible and cannot be quoted;
- duplicates by participant + date + experiment set are rejected.

A finding may exist only when it links at least one valid, analysis-eligible
interview, a positive denominator and coded units. Quotations are
permission-gated: a verbatim quotation needs recorded `QUOTATION` permission and
a pseudonymous participant ID. No finding may exist while
`findings.status = NOT_EXECUTED`.

### 2.7 No raw audio or transcripts

Audio, verbatim transcripts, contact sheets and consent keys are Layer B/A and
never enter this repository. The validator rejects audio/transcript extensions
and personal-data patterns and field names (CR-46). It also scans the content of
`src/`, `public/` and `deploy/` — not only filenames — for participant,
interview, consent, price-response and contact field markers (CR-47); a
neutrally-named application file carrying participant fields is a defect.

### 2.8 Narrative fabrication

A narrative deliverable is not an evidence layer, and it may not imply evidence
that does not exist. The validator rejects (CR-62):

- a quotation attributed to a participant, an owner, an installer, a retailer,
  an operator, a manager, a customer or a respondent — including a
  `P-MC10-###` reference — unless the referenced interview record exists as
  `COMPLETED`, analysis-eligible, with `quotationPermission: true` and the
  participant's recorded `QUOTATION` consent. The covered inline forms are:
  - blockquoted quotations attributed with a dash, a parenthetical role or a
    pseudonymous ID;
  - attribution before the quotation, with a definite or indefinite article
    before the role noun;
  - a closing quotation followed by a hyphen or em dash, an optional
    definite/indefinite article and a role noun;
  - reverse order — a closing quotation, an optional comma, a reporting verb
    (`said|stated|told|reported|explained|commented|confirmed`), an optional
    article and a role noun;
  - a closing quotation followed by a parenthetical role, up to about 30
    characters before the closing parenthesis;
  - the same reverse-order and parenthetical forms attributed to a
    `P-MC10-###` ID.
- every `P-MC10-###` reference in any document must resolve to a valid
  interview record with recorded quotation permission; a dangling pseudonymous
  reference is fabricated evidence.
- a quantifier-less observational claim ("owners reported…", "installers
  confirmed…", "customers told us…") unless it is negated, attributed to MC-09
  desk research, or clearly marked as prepared instrument/template wording.
  Prepared wording and quoted prohibited phrases are not fabrications; the check
  distinguishes them from asserted observations.

Honest negation, prepared instrument text, quoted lists of prohibited phrases,
MC-09 desk-research attributions and methodological conditionals ("recorded only
as the participant stated it") are accepted and covered by acceptance tests in
D24. With zero participants and zero interviews in the real tree, no new
quotation or observation may be introduced without a resolvable record.

## 3. File-by-file schema reference

### `manifest.json`

Contract envelope plus `baseCommit`, `files[]` (`path`, `purpose`, `owner`,
`recordCount`), `deliverables[]` (`id` D1–D28, `path`, `owner`, `title`),
`supportingRecords[]` and `fixtureExclusion` (rule + `realTreeFixtureRecords:
0`). Checked by CR-03, CR-04, CR-48, CR-58.

### `experiments.json`

Ten records `EXP-MC10-01`…`EXP-MC10-10`. Each carries `registeredVersion`
(`MC-09-REGISTRY-1.0.0`), `frozenFrom`
(`docs/marea/market-validation/data/validation-experiments.json`),
`thresholdSha256`, the MC-09 `hypothesis`, `segment`, `minimumEvidence` and
`decisionThreshold` copied verbatim, `executionStatus` (`NOT_EXECUTED`),
`resultStatus` (`BLOCKED`), `blockerCodes`, zero `evidence` counts,
`whatWouldCountAsEvidence`, `interpretationLimits` and `nextStep`. No
`PASS`/`FAIL`/`INCONCLUSIVE` result is permitted (CR-09, CR-13–CR-18).

### `recruitment-funnel.json`

The eleven funnel states (`IDENTIFIED`, `CONTACT_AUTHORIZED`, `INVITED`,
`RESPONDED`, `SCREENED`, `ELIGIBLE`, `CONSENTED`, `INTERVIEW_COMPLETED`,
`ANALYSIS_ELIGIBLE`, `WITHDRAWN`, `EXCLUDED`) for all eight segments, with the
preserved `plannedMin`/`plannedMax`, per-state counts, totals (planned 40–80),
`totalsCompleted` and reconciliation flags. Every count is 0 while the gate is
closed (CR-33).

### `participants.json`

`schemaVersion`, empty `participants[]`, `aggregate` (`total`, per-segment
counts, consented, withdrawn), pseudonymisation rule (pseudonymous is not
anonymous), the four-permission consent model, withdrawal policy and the
statement that Layer A identity data never enters Git (CR-12, CR-21, CR-22).

### `interview-records.json`

`schemaVersion`, empty `interviews[]`, aggregate `0`, per-segment aggregates,
`requiredFields` and the valid/invalid record rules (CR-12, CR-19, CR-20,
CR-24).

### `pricing-responses.json`

`administered: false`, empty `responses[]`, module counters, `ladderReference`
(path, contract ID/version, `frozenAt`, `status`), `requiredResponseFields`, the
unknown-handling rule and explicit prohibitions (no conversion, elasticity,
revenue or approved price) (CR-10, CR-25, CR-55).

### `coding.json`

`schemaVersion`, `codebookStatus`, `codedUnits`, `doubleCodedUnits`,
`doubleCodingRatioTarget: 0.25`, `doubleCodingRatioAchieved`, `cohensKappa`,
`kappaStatus: NOT_COMPUTED`, `saturation` (`reached: false`, per segment),
`negativeCases`, `denominatorRule` and the rule that kappa is never invented to
satisfy a target (CR-29).

### `concept-comprehension.json`

Seven concepts (`NAV`, `WATCH`, `PROTECT`, `HUB`, `START`,
`INTEGRATED_SYSTEM`, `FLEET`). Each has `participantsTested`,
`correctTwoExclusions`, `criticalMisconceptions`, `denominator` and `status`
(`NOT_EXECUTED`). The aggregate stays at zero and the EXP-MC10-06 thresholds are
quoted as targets only (CR-26, CR-30).

### `barriers.json`

Ten barrier codes (`WARRANTY`, `LIABILITY`, `DATA_OWNERSHIP`,
`BRAND_LONGEVITY`, `SUBSCRIPTION_LAPSE`, `OFFLINE_OPERATION`, `SUPPORT`,
`SECURITY`, `RELIABILITY`, `UNKNOWN_BRAND`) with `participantsRanking: 0`,
`topThreeCount: 0`, `status: NOT_EXECUTED`. The codes are a prepared taxonomy,
not observed objections (CR-31).

### `findings.json`

`schemaVersion`, `status: NOT_EXECUTED`, empty `findings[]`, the required
finding fields, the permission-gated `quoteRule` and the traceability rule: no
finding without a traceable valid interview record (CR-19, CR-28).

### `product-evidence.json`

Nine product families in the MC-09 commercial-score order (NAV 4.23/1, WEATHER
3.77/2, WATCH 3.38/3, HUB 3.37/4, FLEET 3.22/5, AIS 2.90/6, SENSE 2.84/7, PILOT
2.64/8, DISPLAY 2.47/9). Each has `primaryEvidenceStatus: NOT_TESTED`, zero
evidence counters, `evidenceQuality: NONE`, `recommendation: NOT_TESTED`,
`remainingUnknowns[]`, `nextValidationStep` and `readinessUnchanged: true`
(CR-35).

### `bundle-evidence.json`

The six bundles in MC-09 order (PROTECT 3.37/1, START 3.27/2, FLEET 3.22/3,
CRUISE 2.99/4, SAIL 2.65/5, COMPLETE 2.31/6) with the same `NOT_TESTED` fields
and `readinessUnchanged: true` (CR-36).

### `data-quality.json`

`checks[]` with `checkId`, `check`, `result` (`COMPLETE`), `evidence`, plus
`participantsReconciled`, `countsReconciled`, `fixturesExcludedFromTotals`,
`piiScan: NO_PII_FOUND`, `transcriptsInRepo: false`, `audioInRepo: false` and
the Layer A/B provisioned flags (CR-32, CR-48).

### `governance-status.json`

The MC-09 governance mirror. All statuses in `statuses` keep the MC-09 value:
trademark `NOT_GRANTED`, source IP `NOT_CLEARED`, demand and WTP
empirically-validated `NO`, publication and sales `BLOCKED`, deployment,
outreach, paid research and advertising `NOT_AUTHORIZED`, remote helm
`PROHIBITED`, alert guarantee false, cross-tenant access false, hardware
included in FLEET false, compatibility rows tested 0, products for sale 0,
`approvedPrices` 0, `wtpStatedPreferenceObserved` false and
`wtpCommerciallyValidated` false. `canonicalProducts` and `canonicalBundles`
keep the canonical contract order, and `mc10Changes` is empty (CR-34).

### `research-status.json` (Lead-owned)

Milestone `BLOCKED`, `statusReason = OUTREACH_AUTHORIZATION_NOT_GRANTED`,
`outreachAuthorization = NOT_GRANTED`, `fieldworkStatus = BLOCKED`,
`fieldworkExecuted = false`, zero `participantCounts`, the eight
`segmentCounts` with preserved quotas, the zeroed `sample`, the zeroed
`pricing`, the zeroed `coding`, the seventeen `wave0Checklist` items, the seven
`blockers`, the `commercialInvariants`, the evidence policy and
`planningInconsistencies` (PI-01…PI-05). The planning-inconsistency records
document honest MC-09 plan defects — the per-segment quotas sum to 37–57 while
the headline target is 40–80, three conflicting per-segment readings, a pricing
minimum unreachable under the preserved quotas and pending instrument
amendments. They are recorded limitations, never measured data: the validator
allows the quota/total mismatch only while it stays recorded (CR-33) and never
treats the planned 40–80 as an observed sample. Fields are validated
structurally; the Lead owns the file.

### `fieldwork-authorization.json` (Lead-owned)

`AUTH-MC10-001` with `authorizationStatus = NOT_GRANTED`, null authorizer/date,
empty permitted categories/areas/methods, volume 0, spending and incentives
false, duration 0, no fieldwork lead, the standing prohibited targets/channels,
the inference guard (the request, PR or task is not authorization) and the
status effect that fieldwork is `BLOCKED` (CR-06, CR-07).

### `decisions.json` (Lead-owned)

Five decisions `D-029`…`D-033`, each with a real date, `status: IN_FORCE`,
title, summary, evidence references and status effect. No decision may approve a
price, a release or a commercial commitment (CR-50).

### `pricing-ladders.json` (Agent E-owned)

Frozen pre-registered ladders: two constructs (`CONSTRUCT-01`, `CONSTRUCT-02`),
five strictly ascending points each, provenance citations, Van Westendorp
questions and the buy-response scale, `approvedPrice: false`,
`administered: false`, empty `responses` and the governance invariants (CR-54).

## 4. Canonical JSON + SHA-256 freezing algorithm

Every experiment is frozen **before any data can exist** by hashing the entire
MC-09 registry record. The algorithm is deterministic and independently
reproducible:

1. Take the full MC-09 experiment object from
   `docs/marea/market-validation/data/validation-experiments.json` (not only the
   `decisionThreshold` field).
2. Recursively sort every object key in ascending order (default string
   comparison). Arrays keep their original order.
3. Serialize the sorted value with `JSON.stringify(sorted, null, 2)` — two-space
   indentation, no trailing newline.
4. Encode the resulting string as UTF-8 and compute SHA-256.
5. Record the lowercase hexadecimal digest as `thresholdSha256`.

Reference implementation:

```js
import { createHash } from 'node:crypto';

function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === 'object') {
    const sorted = {};
    for (const key of Object.keys(value).sort()) sorted[key] = sortKeys(value[key]);
    return sorted;
  }
  return value;
}

const canonical = JSON.stringify(sortKeys(mc09Experiment), null, 2);
const thresholdSha256 = createHash('sha256').update(canonical, 'utf8').digest('hex');
```

The validator recomputes this hash on every run (CR-14). A mismatch fails the
gate even if the narrative documents were edited consistently. A legitimate
change requires a dated amendment, a new frozen version and independent review;
previously collected data stays evaluated under the version in force when it was
collected. No amendment was performed in MC-10 because no data was collected.

The reference SHA-256 values (2026-11-01) are:

| Experiment | thresholdSha256 |
| --- | --- |
| `EXP-MC10-01` | `199d1707131d0f104481d54c41902022403e266bcc6b3803a898d6db5671e28e` |
| `EXP-MC10-02` | `e4d4c05f1dc710f912476989185e977b75c1fef5225f38b60b9aaf2f6ebc887a` |
| `EXP-MC10-03` | `46e535074b9e45fb2977362d9e37e9b2889308a5d72ec0c5ee400392acd72737` |
| `EXP-MC10-04` | `9003cbc60cac89b900300466d67f21fb8a7dfbac253d3e5b51520776152db274` |
| `EXP-MC10-05` | `5d6d71906b77afb0594195c6163b63bc9d9031878cbe48a3f36e174d2a24b976` |
| `EXP-MC10-06` | `ae2528b282482d23fb777f735660c988170df06bd65303331dca1e8531a4a742` |
| `EXP-MC10-07` | `c16e255616e83bf6fcdf968f8349d0feaa45ae670d7693d11b151bae3314308e` |
| `EXP-MC10-08` | `1600ef293030f7f1ea4e6239226421c8419d37e614ad3432f86e053b11b3ba3f` |
| `EXP-MC10-09` | `73a403e980513e48cb932d3d8e34f607671efc8a2ab1e018ae169055fa3e11a4` |
| `EXP-MC10-10` | `0e5eb0e20b7a6714120aa469d889073cc6e190de66ccd5ec7dea0025c7d3364f` |

The frozen instruments are hashed in `methodology/instruments.json` from the
MC-09 discovery plan; the validator recomputes that hash as well (CR-53).

## 5. Fixture-exclusion rule

1. Synthetic records are created only by the negative-mutation suite in an
   operating-system temporary directory.
2. Every synthetic fixture is tagged `testingFixture: true` and is never copied
   into `docs/marea/customer-discovery/data/`.
3. Fixtures are excluded from every total, every count and every finding. The
   real tree records `realTreeFixtureRecords: 0`,
   `fixturesExcludedFromTotals: true` and rejects any fixture record found in
   the real data layer (CR-48).
4. A fixture may never be used to demonstrate a research result; it exists only
   to prove that the validator rejects a specific violation.

## 6. Reconciliation rules

The following must agree on every run (CR-24, CR-33):

- `research-status.json` `participantCounts` ↔ `recruitment-funnel.json`
  `totals.counts` for all eleven states;
- `research-status.json` `sample.completedInterviews` and
  `validAnalyticalCases` ↔ `interview-records.json` aggregate;
- `participants.json` `aggregate.total` and per-segment counts ↔ participant
  records;
- `participants.json` consent count ↔ funnel `CONSENTED`;
- funnel `INTERVIEW_COMPLETED` per segment ↔ interviews and
  `totalsCompleted`;
- the eight `segmentCounts` in `research-status.json` ↔
  `recruitment-funnel.json` segments (IDs, names, `plannedMin`, `plannedMax`);
- `pricing-responses.json` ↔ `pricing-ladders.json` version, `frozenAt`,
  `status` and `administered`;
- `manifest.json` `recordCount` ↔ the real record count of each file;
- `governance-status.json` ↔ the MC-09 governance invariant and the canonical
  product/bundle contracts;
- `product-evidence.json` / `bundle-evidence.json` ↔ the MC-09 commercial
  scores and ranks and the canonical contracts.

With a closed gate, every reconciled count is `0`. A non-zero count without a
corresponding valid record fails the validator.

## 7. Validator check families

`scripts/check-marea-customer-research.mjs` is deterministic, offline and
zero-dependency. It exits 1 on any failed check and prints
`MC-10 customer research validation: X/Y checks passed`.

| IDs | Family | What it refuses |
| --- | --- | --- |
| CR-01–CR-05 | Deliverables and contract | a missing D1–D28 file, an unparsable data file, a manifest that does not index the tree, a missing data contract |
| CR-06–CR-12 | Authorization gate | fieldwork, outreach or pricing activity while `AUTH-MC10-001` is `NOT_GRANTED`; a granted record with an empty scope; a bypassed checklist |
| CR-13–CR-18 | Threshold freeze | missing/extra experiments, a post-hoc threshold change, a non-faithful copy of the MC-09 text, a fabricated verdict |
| CR-19–CR-24 | Evidence integrity | a finding without a valid interview, an interview without consent/date/source/interviewer/language, a duplicate interview, unreconciled counts |
| CR-25–CR-28 | Pricing, denominators and quotations | a response without currency/VAT/provenance, an unknown coerced to 0, a rate with a zero denominator, a population estimate from a qualitative sample, an ungated quotation |
| CR-29–CR-32 | Analysis state | a fabricated kappa, saturation or coded unit, a tested concept, an observed barrier, a false data-quality claim |
| CR-33–CR-36 | Plan and portfolio integrity | a changed quota, a reordered or upgraded product/bundle, a weakened governance invariant |
| CR-37–CR-39 | Commercial truthfulness | an availability/CTA/publication claim, a sale/pilot/distribution/price-approval claim, a fixed offer price |
| CR-40–CR-42 | Independent review | a missing review, malformed findings, or a review that issues a primary-research PASS |
| CR-43–CR-45 | Document honesty | a missing blocked banner, a positive participant count, an unreviewed translation-equivalence claim |
| CR-46–CR-48 | Privacy, narrative and fixtures | PII/contact/audio/transcript data, participant content under `src/`, `public/` or `deploy/` (scanned by content, not only by filename), an unmarked fixture |
| CR-49–CR-52 | Governance and history | a milestone that claims PASS, a decision that approves something, a modified MC-09 registry or weakened canonical contracts |
| CR-53–CR-56 | Frozen support records | a broken instrument hash, an approved or non-ascending price ladder, a mismatched response reference, an approved/sent outreach template |
| CR-57–CR-61 | Contract and delivery | a data contract that omits a file or a check family, a non-independent review, a dishonest Spanish report or handoff, a delivery record without real evidence |
| CR-62 | Narrative fabrication | a blockquoted or attributive participant quotation, an unresolvable `P-MC10-###` reference, or a quantifier-less observation claim that implies an interview which never happened |

Run `node --test scripts/check-marea-customer-research.test.mjs` for the
negative-mutation suite (D24), which mutates a temporary fixture copy and asserts
the specific check ID that must fail. The real repository tree is the positive
control.

## 8. Change control

A change to this contract, a schema, a threshold, an instrument or a ladder
requires a dated amendment, a new version and independent review before further
fielding. While the gate is closed, the correct change is to record the better
preparation, not to relax the data contract or delete a check.
