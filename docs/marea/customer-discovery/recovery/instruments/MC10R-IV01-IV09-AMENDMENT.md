# MC-10R — Instrument amendment package `MC10R-INSTRUMENT-AMENDMENT-v1.1.0` (D9)

| Field | Value |
| --- | --- |
| Document ID | MC-10R / D9 / `MC10R-IV01-IV09-AMENDMENT` |
| Programme | EMBARCARTE / MAREA |
| Milestone | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36) |
| Amendment package | `MC10R-INSTRUMENT-AMENDMENT-v1.1.0` |
| Previous instrument version | `1.0.0` — historical frozen version, preserved unchanged |
| Candidate instrument version | `1.1.0` |
| Document status | `REVIEW_REQUIRED` |
| Version status | `PROPOSED_NOT_EFFECTIVE` |
| Amendments contained | IV-01, IV-02, IV-03, IV-04, IV-05, IV-06, IV-07, IV-08, IV-09 |
| Candidate source of record | `docs/marea/customer-discovery/recovery/instruments/MC10R-ES-EN-RESEARCH-INSTRUMENTS.md` (D11) |
| Candidate source SHA-256 | `EF95DBF63E156D8B03C346F5D763146C00BB8B822906A9C9D0B81AF44B92F0F4` — **candidate source hash, NOT an effective freeze** (`CANDIDATE_SOURCE_HASH_NOT_EFFECTIVE_FREEZE`) |
| Frozen v1.0.0 source SHA-256 (verified) | `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` — verified against the actual file bytes with `Get-FileHash -Algorithm SHA256` (see §15) |
| Date | 2026-11-01 |
| Owner | agent-e-instruments (Research Instrument and Linguistic Specialist) |
| Write scope | `docs/marea/customer-discovery/recovery/instruments/` |
| Scope | Nine dated amendment records: previous and candidate version, exact change, reason, source hash, candidate hash, affected experiments, translation/legal dependencies, approval state, effective date, sign-off evidence |
| Is not | an approval, an effective amendment, a translation sign-off, a legal opinion, evidence that any instrument was administered, evidence that any participant exists |

> **STATUS: `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE`.** No amendment in this package is approved,
> effective or approved for future fieldwork. There is no effective date, no approver signature and no
> sign-off evidence. The candidate version `1.1.0` may not be administered. The historical version
> `1.0.0` remains the only frozen version and is not edited. Zero participants, zero sessions, zero
> recordings, zero price responses and zero coded units exist; no data is governed by a transition
> created here.

## 1. Package identity, status model and hash basis

### 1.1 Status model used by this package

The recovery status model of the execution plan applies without weakening. Amendment status vocabulary:
`DRAFT`, `REVIEW_REQUIRED`, `PROPOSED_NOT_EFFECTIVE`, `APPROVED_FOR_FUTURE_FIELDWORK`, `SUPERSEDED`,
`REJECTED`. Legal/privacy text vocabulary: `DRAFT_FOR_LEGAL_REVIEW`, `LEGAL_REVIEW_PENDING`, `APPROVED`,
`REJECTED`. Only a real recorded human or qualified-professional review can produce `APPROVED` or
`APPROVED_FOR_FUTURE_FIELDWORK`; no agent may confer it. This package contains no `APPROVED` state and no
`APPROVED_FOR_FUTURE_FIELDWORK` state.

### 1.2 Two hashes, two different meanings

| Hash | What it covers | Real value | Status |
| --- | --- | --- | --- |
| Frozen source hash v1.0.0 | The exact working-tree bytes of `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md`, the frozen source of all seven instruments | `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` (verified, §15) | Historical freeze, effective for the v1.0.0 text; never edited in place |
| Candidate source hash v1.1.0 | The exact working-tree bytes of the candidate source D11 | `EF95DBF63E156D8B03C346F5D763146C00BB8B822906A9C9D0B81AF44B92F0F4` (computed, §15) | `CANDIDATE_SOURCE_HASH_NOT_EFFECTIVE_FREEZE` — not a freeze, not an approval, not a version in force |
| Candidate section hash per amendment | The bytes of the amendment section of D11, canonicalised as in §1.3 | Nine values in §1.3 | `CANDIDATE_SECTION_HASH_NOT_EFFECTIVE_FREEZE` — locates the candidate text, confers nothing |

A candidate hash proves that a candidate text is identifiable and that later edits are detectable. It does
**not** freeze the candidate, does not record an approval, does not make the version effective and does not
authorise fielding. If the candidate source D11 changes, this package is re-issued with new candidate
hashes; the old candidate hashes are never silently overwritten and no candidate hash is ever presented as
an effective freeze.

### 1.3 Candidate section hashes (D11)

Canonicalisation rule: read D11 as UTF-8, split on the LF character; for each amendment take the lines
from its level-2 heading line (the line matching `## <number>. IV-0<number>`) through the line before the
next level-2 heading; join the lines with the LF character; hash the resulting UTF-8 bytes with SHA-256;
lowercase hexadecimal. Command (Node.js, real run on 2026-11-01):

```
node -e "const fs=require('fs'),c=require('crypto');const p='docs/marea/customer-discovery/recovery/instruments/MC10R-ES-EN-RESEARCH-INSTRUMENTS.md';const L=fs.readFileSync(p,'utf8').split('\n');const starts=[];L.forEach((l,i)=>{if(/^## \d+\. IV-0\d/.test(l))starts.push(i);});for(let k=0;k<starts.length;k++){const n=k+1<starts.length?starts[k+1]:L.findIndex((l,i)=>i>starts[k]&&/^## /.test(l));const block=L.slice(starts[k],n<0?L.length:n).join('\n');console.log(L[starts[k]].match(/IV-0\d/)[0], c.createHash('sha256').update(block,'utf8').digest('hex'));}"
```

| Amendment | Candidate section hash | Section lines | Candidate source locator |
| --- | --- | ---: | --- |
| IV-01 | `408ea5dc31ea15b364c728ccfb632a77268013121603653e8b7f35a13584c4d7` | 144 | D11 §1 |
| IV-02 | `a8dabeee0f7f6080d5222eead6dc1f7281603cfa9038dc9ed589e12d11c5bbc9` | 81 | D11 §2 |
| IV-03 | `79de189d272f1026fbb31f872c215606e3816d6bb02e7df09bfbe26bb0b8354c` | 85 | D11 §3 |
| IV-04 | `b6d0504fa73435ccfd58a53ca428d506a8dd6756ed54719c22c1162f7f4144d8` | 62 | D11 §4 |
| IV-05 | `26fcebd342d96e86ba57039ff3cdaed7e0575c9748f13a88448daa5e482785e3` | 86 | D11 §5 |
| IV-06 | `c3df872bd588c397096973c5be5a4e85cc6f391b64f2d652ed4e4ad9bb10d2e8` | 61 | D11 §6 |
| IV-07 | `08275bbe629af102a4f404b3fdb0610dc40d8de953feb85e20a2e5789483c705` | 94 | D11 §7 |
| IV-08 | `1a5acb68eb8b297dc6e3f0e96c472795bd7269eb6abab0a19d3d407ceecd6308` | 205 | D11 §8 |
| IV-09 | `7190dc1c7a296fb415ef87122d9bec0e00d18749450d0ec849856691b0b9369f` | 52 | D11 §9 |

## 2. Amendment status board

| ID | Title | Instruments affected | Previous → candidate | Candidate hash label | Approval state | Effective date |
| --- | --- | --- | --- | --- | --- | --- |
| IV-01 | Quotation and de-identification consent | `CONSENT-01` | `1.0.0` → `1.1.0` | Candidate section hash (non-effective) | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` | None — not approved |
| IV-02 | Brand-disclosure text and timing | `GUIDE-01` | `1.0.0` → `1.1.0` | Candidate section hash (non-effective) | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` | None — not approved |
| IV-03 | PRICE-01 ladder provenance record | `PRICE-01` | `1.0.0` → `1.1.0` | Candidate section hash (non-effective) | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` | None — not approved |
| IV-04 | Consent version and language capture | `NOTE-01`, `SCHEMA-01` | `1.0.0` → `1.1.0` | Candidate section hash (non-effective) | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` | None — not approved |
| IV-05 | ANA-01 operational codebook | `ANA-01` | `1.0.0` → `1.1.0` | Candidate section hash (non-effective) | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` | None — not approved |
| IV-06 | Supervisory-authority complaint information | `CONSENT-01` (privacy text) | `1.0.0` → `1.1.0` | Candidate section hash (non-effective) | `DRAFT_NOT_APPROVED` / `DRAFT_FOR_LEGAL_REVIEW` | None — not approved |
| IV-07 | Incident and near-miss sequence for `EXP-MC10-09` | `GUIDE-01` | `1.0.0` → `1.1.0` | Candidate section hash (non-effective) | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` | None — not approved |
| IV-08 | Exclusions before benefits in `GUIDE-01` Q11 | `GUIDE-01` | `1.0.0` → `1.1.0` | Candidate section hash (non-effective) | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` | None — not approved |
| IV-09 | Concept-ID reconciliation | `GUIDE-01`, `NOTE-01`, `SCHEMA-01`, `ANA-01`, reporting mirror interface | `1.0.0` → `1.1.0` | Candidate section hash (non-effective) | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` | None — not approved |

Common fields for all nine records: source hash (v1.0.0) =
`cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` (verified, §15); candidate version =
`1.1.0`; previous version = `1.0.0`; effective date = none, because no approval exists; sign-off evidence =
`NONE`; approver signature = `NONE`; data governed before approval = `1.0.0` (and no data exists to be
governed); rollback = the candidate may be withdrawn or rejected without residue because `1.0.0` remains
frozen and unedited.

---

## 3. IV-01 — Quotation and de-identification consent

| Field | Value |
| --- | --- |
| Amendment ID | `IV-01` |
| Title | Quotation and de-identification consent: four separate permissions, data collection separated from wording use, no anonymity promise |
| Instruments affected | `CONSENT-01` |
| Previous version | `1.0.0` (frozen; MC-09 plan §5.2 ES / §6.2 EN) |
| Candidate version | `1.1.0` (D11 §1) |
| Exact change | (1) Keep participation, optional audio recording, de-identified quotation and follow-up contact as four separate, separately recorded permissions `C1`–`C4`. (2) Separate the permission to collect research data (`C1`, conversation and research notes for this study) from the permission to use quotation in specified contexts (`C3`, named internal research documents only). (3) Replace *anónima* / *anonymised* with *desidentificada* / *de-identified* and add, in both languages, the statement that removing a name alone does not guarantee anonymity and that a pseudonymised record remains personal data. (4) Require `C3` contexts to be listed aloud and recorded per session. (5) State that public or testimonial use requires a separate reviewed permission that is unavailable today and is blocked by brand and commercial governance. |
| Reason | The v1.0.0 wording promised a protection the design cannot provide (only de-identification, never guaranteed anonymity) and bundled the reuse of wording with participation; the ES and EN versions also diverged. The registered defect is recorded in the MC-10 instrument version register and the ethics/privacy design. |
| Source hash (v1.0.0) | `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` (verified against the actual file bytes) |
| Candidate hash | `408ea5dc31ea15b364c728ccfb632a77268013121603653e8b7f35a13584c4d7` — **candidate section hash, NOT an effective freeze** (`CANDIDATE_SECTION_HASH_NOT_EFFECTIVE_FREEZE`) |
| Affected experiments | All ten: `EXP-MC10-01` … `EXP-MC10-10` — consent is a precondition of every session and `C3` conditions any quotation use in analysis or reporting |
| Translation dependencies | ES/EN candidate text; qualified bilingual sign-off `NOT_OBTAINED`; translation equivalence `NOT_ESTABLISHED`; PT draft `MACHINE_ASSISTED_DRAFT_NOT_APPROVED` (D12) |
| Legal/privacy dependencies | Qualified legal review of the consent wording and of the conditions for valid consent `NOT_OBTAINED`; controller identity and privacy contact `OPEN` (no value invented); supervisory-authority route `OPEN` (IV-06); public or testimonial use blocked by trademark clearance `NOT_GRANTED` and commercial publication `BLOCKED` |
| Approval state | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` |
| Effective date | None — not approved; no effective date may be recorded |
| Sign-off evidence | `NONE` |

## 4. IV-02 — Brand-disclosure text and timing

| Field | Value |
| --- | --- |
| Amendment ID | `IV-02` |
| Title | Frozen brand-disclosure text: when and how the study introduces EMBARCARTE, the proposed MAREA brand, concept status, unavailable capabilities and commercial exclusions |
| Instruments affected | `GUIDE-01` |
| Previous version | `1.0.0` (frozen; the closing step exists in the plan but has no script) |
| Candidate version | `1.1.0` (D11 §2) |
| Exact change | (1) Add the missing closing brand-disclosure script in ES and EN: EMBARCARTE is introduced as the organisation running the study at consent; MAREA is disclosed only at `Q14` as a proposed, unregistered, unauthorised brand with a pending legal position. (2) Freeze what may be named at each session point, with a table from recruitment and consent through `Q1`–`Q11`, `Q12`, `Q13`, `Q14` and `Q15`. (3) Freeze the concept status (target specifications, not products, not manufactured, not certified, may change or never exist). (4) Freeze the unavailable capabilities and the commercial exclusions in the disclosure (no hardware included, installation required and not included, chart and data rights conditional and not granted, no compatibility proof, no guaranteed alert delivery, no remote or unattended autopilot operation, no certified distress function, no orderable product, no approved price). (5) State explicitly that the conversation is research, not a sale. (6) Add a neutral deflection line for an early brand question; the brand may not be introduced earlier when that would bias unprompted discovery. |
| Reason | The plan requires that the proposed brand not be named before the closing section, but no frozen closing text exists, so the designed step had no script and could be improvised. The proposed branding must also not be introduced early enough to turn an unprompted problem description into a prompted one. |
| Source hash (v1.0.0) | `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` (verified) |
| Candidate hash | `a8dabeee0f7f6080d5222eead6dc1f7281603cfa9038dc9ed589e12d11c5bbc9` — **candidate section hash, NOT an effective freeze** (`CANDIDATE_SECTION_HASH_NOT_EFFECTIVE_FREEZE`) |
| Affected experiments | `EXP-MC10-01` (unprompted problem discovery), `EXP-MC10-06` (concept comprehension with brand neutrality), `EXP-MC10-10` (trust barrier, where the disclosure itself is a registered confounder); the disclosure is read in every session |
| Translation dependencies | ES/EN candidate text; qualified bilingual sign-off `NOT_OBTAINED`; translation equivalence `NOT_ESTABLISHED`; PT draft not approved |
| Legal/privacy dependencies | Brand and commercial governance review of the wording `REVIEW_REQUIRED` (trademark legal clearance `NOT_GRANTED`; commercial publication `BLOCKED`); qualified legal review of the research-versus-marketing separation `NOT_OBTAINED` |
| Approval state | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` |
| Effective date | None — not approved |
| Sign-off evidence | `NONE` |

## 5. IV-03 — PRICE-01 ladder provenance record

| Field | Value |
| --- | --- |
| Amendment ID | `IV-03` |
| Title | Ladder provenance record: origin and version of every displayed price ladder |
| Instruments affected | `PRICE-01` |
| Previous version | `1.0.0` (frozen; the instrument text references five pre-registered points but the values live in an external artefact) |
| Candidate version | `1.1.0` (D11 §3) |
| Exact change | (1) Add a frozen provenance record inside the instrument: the ladder artefact path and contract version, the ladder version, the freeze scope and recorded constructs hash, the freeze date and status, the effective instrument version, the displayed constructs and tested units, included and excluded components, currency, VAT treatment, subscription period, installation assumptions, the price sequence and the source identifiers. (2) Add the read-aloud provenance statement in ES and EN before the first point. (3) Freeze the rule that no construct, amount, question, scale, provenance entry or limitation may change without a dated amendment and a new ladder version, and that data collected earlier remain evaluated under the ladder version in force. (4) Record the two frozen ladder sequences as hypotheses, never as prices. |
| Reason | The instrument froze the disclosure, scale and questions but could not bind the ladder values, so the freeze was incomplete for fielding purposes and a displayed amount could not be traced to a pre-registered hypothesis. |
| Source hash (v1.0.0) | `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` (verified) |
| Candidate hash | `79de189d272f1026fbb31f872c215606e3816d6bb02e7df09bfbe26bb0b8354c` — **candidate section hash, NOT an effective freeze** (`CANDIDATE_SECTION_HASH_NOT_EFFECTIVE_FREEZE`) |
| Ladder artefact dependency | `docs/marea/customer-discovery/data/pricing-ladders.json`, ladder version `1.0.0`, constructs SHA-256 `bfa09ebc904a66ba65961864d5e026638e3756a41a0611f0c3fdf1e83bb5be8c` (recorded and independently recomputed on 2026-11-01; match) |
| Affected experiments | `EXP-MC10-04` (Gabor–Granger ladder) and `EXP-MC10-05` (Van Westendorp); `EXP-MC10-03` is a qualitative subscription-attitude experiment and its threshold is not changed |
| Translation dependencies | ES/EN candidate disclosure; qualified bilingual sign-off `NOT_OBTAINED`; translation equivalence `NOT_ESTABLISHED`; PT draft not approved |
| Legal/privacy dependencies | VAT treatment is a pre-registered research hypothesis, not a tax determination; qualified tax/legal review `NOT_OBTAINED`; chart and data rights are conditional and not granted (`SOURCE_IP_CLEARANCE = NOT_CLEARED`); brand and commercial review `REVIEW_REQUIRED` |
| Approval state | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` |
| Effective date | None — not approved |
| Sign-off evidence | `NONE` |

## 6. IV-04 — Consent version and language capture in NOTE-01 and SCHEMA-01

| Field | Value |
| --- | --- |
| Amendment ID | `IV-04` |
| Title | Consent version and language capture in the note template and the data schema |
| Instruments affected | `NOTE-01`, `SCHEMA-01` |
| Previous version | `1.0.0` (consent flags with timestamps but no script version, language, capture method or withdrawal event) |
| Candidate version | `1.1.0` (D11 §4) |
| Exact change | (1) Add the consent-evidence fields to `NOTE-01`: consent instrument ID, version, language, date and time, capture method, consent-taker identifier, per-permission status (`C1`–`C4`) with timestamps, the recorded quotation contexts, the follow-up channel, scope and expiry, the withdrawal event with its effect, and a computed completeness flag. (2) Add the typed `consentRecord` object to `SCHEMA-01`, linked to the participant record by pseudonymous ID only. (3) Add the rules: no identity keys in the research repository; the version recorded is the version administered and is never relabelled; language is recorded independently of preference; consent precedes capture; incomplete records are ineligible rather than retro-completed; withdrawal propagates to the funnel, the quotation register and any coding artefact. |
| Reason | Consent cannot be evidenced for the purposes it was given if the instrument version, the language, the capture method and the scope of each permission are not recorded, and the frozen template could not demonstrate which consent text a participant agreed to. |
| Source hash (v1.0.0) | `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` (verified) |
| Candidate hash | `b6d0504fa73435ccfd58a53ca428d506a8dd6756ed54719c22c1162f7f4144d8` — **candidate section hash, NOT an effective freeze** (`CANDIDATE_SECTION_HASH_NOT_EFFECTIVE_FREEZE`) |
| Affected experiments | All ten: record validity is a precondition of every analysis-eligible case; no experiment threshold is changed |
| Translation dependencies | `NOTE-01` and `SCHEMA-01` are language-neutral by design; the ES/EN labels of the candidate fields are candidate text and qualified bilingual sign-off is `NOT_OBTAINED`; PT draft not approved |
| Legal/privacy dependencies | Qualified legal review of the consent demonstration requirement `NOT_OBTAINED`; controller identity `OPEN`; the data-contract edit itself belongs to the data-contract owner and is not performed by this package |
| Approval state | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` |
| Effective date | None — not approved |
| Sign-off evidence | `NONE` |

## 7. IV-05 — ANA-01 operational codebook v1.1.0

| Field | Value |
| --- | --- |
| Amendment ID | `IV-05` |
| Title | Operational codebook `MC10-CODEBOOK-1.1.0`: twelve operational codes reconciled with the eight a-priori theme families |
| Instruments affected | `ANA-01` |
| Previous version | `1.0.0` (eight theme families named; no operational code identifiers, inclusion and exclusion rules, example patterns or ambiguity rules) |
| Candidate version | `1.1.0` (D11 §5) |
| Exact change | (1) Record the twelve operational codes `QC-01`–`QC-12` and reconcile them with the eight a-priori theme families: `QC-01` and `QC-02` to problem, `QC-03` to spend, `QC-04` to alternative, `QC-05` to trigger, `QC-07` and `QC-09` to installation barrier, `QC-06` to subscription objection, `QC-08` to trust barrier and `QC-10` to misconception. (2) Mark `QC-11` purchase-decision role and `QC-12` negative case as cross-cutting elaborations outside the eight families, reported separately. (3) Define, for every code, the parent theme, inclusion criteria, exclusion criteria, an illustrative statement pattern labelled `ILLUSTRATIVE_PATTERN_NOT_PARTICIPANT_DATA`, and an ambiguity-resolution rule. (4) Record the coding version and the coding-unit, unprompted-definition, emergent-code, independence and inter-coder comparison rules. (5) State that Cohen's kappa is `NOT_COMPUTED` without actual independently coded double-coded records and may never be displayed as `0.00` or estimated. |
| Reason | The eight-family plan and the twelve-code operational codebook would otherwise disagree in the freeze register, and the inter-coder comparison needed an explicit rule set before the first interview. No threshold is changed and the elaboration is design-stage work performed with zero data. |
| Source hash (v1.0.0) | `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` (verified) |
| Candidate hash | `26fcebd342d96e86ba57039ff3cdaed7e0575c9748f13a88448daa5e482785e3` — **candidate section hash, NOT an effective freeze** (`CANDIDATE_SECTION_HASH_NOT_EFFECTIVE_FREEZE`) |
| Affected experiments | `EXP-MC10-01`, `EXP-MC10-02`, `EXP-MC10-03`, `EXP-MC10-06`, `EXP-MC10-09`, `EXP-MC10-10` (theme coding); no threshold, denominator or verdict rule is changed |
| Translation dependencies | Analysis codes are internal research labels in English; the ES/EN candidate example patterns are candidate text with qualified bilingual sign-off `NOT_OBTAINED`; PT not required for internal analysis labels but the PT draft remains not approved |
| Legal/privacy dependencies | None added; coding artefacts remain outside the repository and no participant material may be coded because none exists. Independent methodological review is `REVIEW_REQUIRED` |
| Approval state | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` |
| Effective date | None — not approved |
| Sign-off evidence | `NONE` |

## 8. IV-06 — Supervisory-authority complaint information

| Field | Value |
| --- | --- |
| Amendment ID | `IV-06` |
| Title | Legally reviewable privacy text on exercising rights and lodging a complaint with a supervisory authority |
| Instruments affected | `CONSENT-01` (privacy and rights block) |
| Previous version | `1.0.0` (rights listed; no supervisory-authority complaint route) |
| Candidate version | `1.1.0` (D11 §6) |
| Exact change | (1) Add candidate ES and EN wording for exercising rights and lodging a complaint. (2) Declare, rather than invent, every missing value: controller legal identity and address (`OPEN`), privacy contact (`OPEN`), competent supervisory authority (`OPEN`, depends on the controller's establishment), applicable national-law reference (`OPEN`), data-protection officer decision (`OPEN`), legal sign-off (`NOT_OBTAINED`). (3) State that the route is pending and will be supplied before any session, and that complaining does not affect participation or other rights. (4) Mark the text `DRAFT_NOT_APPROVED` / `DRAFT_FOR_LEGAL_REVIEW`. |
| Reason | The Article 13 information set is materially incomplete without the complaint route, and the defect cannot be cured by drafting alone because the authority depends on a controller who is not designated. Inventing an identity, a jurisdiction, a contact or a legal sign-off is prohibited. |
| Source hash (v1.0.0) | `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` (verified) |
| Candidate hash | `c3df872bd588c397096973c5be5a4e85cc6f391b64f2d652ed4e4ad9bb10d2e8` — **candidate section hash, NOT an effective freeze** (`CANDIDATE_SECTION_HASH_NOT_EFFECTIVE_FREEZE`) |
| Affected experiments | All ten: a legal precondition of any session, not an experiment variable; no threshold changed |
| Translation dependencies | ES and EN candidate wording; qualified bilingual sign-off `NOT_OBTAINED`; Portuguese wording for Lei 58/2019 is a machine-assisted draft only and needs qualified review before any Portuguese fieldwork |
| Legal/privacy dependencies | Qualified legal review `NOT_OBTAINED` and mandatory before use; controller designation `OPEN`; Spanish and Portuguese national implementations unreviewed; privacy contact `OPEN`; no legal sign-off is claimed |
| Approval state | `DRAFT_NOT_APPROVED` / `DRAFT_FOR_LEGAL_REVIEW` |
| Effective date | None — not approved |
| Sign-off evidence | `NONE` |

## 9. IV-07 — Incident and near-miss sequence for EXP-MC10-09

| Field | Value |
| --- | --- |
| Amendment ID | `IV-07` |
| Title | Neutral incident and near-miss discovery sequence for `EXP-MC10-09` |
| Instruments affected | `GUIDE-01` (new sub-step `Q7B`, inserted after `Q7` and before `Q8`; `Q1`–`Q15` numbering is not changed) |
| Previous version | `1.0.0` (no dedicated incident question; registered design gap) |
| Candidate version | `1.1.0` (D11 §7) |
| Exact change | (1) Add a fixed ten-step neutral sequence covering whether an actual incident or near-miss occurred, the approximate period, what happened, how it was detected, who responded, the actual consequences, the preventive measures, the existing monitoring arrangements, the evidence the participant holds and whether it affected a purchase or maintenance decision. (2) Add the event classification `REAL_INCIDENT`, `NEAR_MISS`, `HYPOTHETICAL_ONLY`, `NONE_REPORTED`, `PREFER_NOT_TO_SAY`, `NOT_ASKED`. (3) Freeze the rules: never suggest that an incident should have occurred; never press for drama; accept a no as a complete answer; distinguish a real incident from a hypothetical scenario; never upgrade a hypothetical into an incident; never count a second-hand story as the participant's incident; do not request copies of evidence during the session; no precise date, address, berth number or registration number. (4) Add ES and EN read-aloud wording. |
| Reason | `EXP-MC10-09` requires a concrete incident or near-miss narrative, and the frozen guide contains no dedicated question. The gap may be closed only by a dated instrument amendment creating a new version before fielding, never by eliciting an incident through improvisation or by inventing one. |
| Source hash (v1.0.0) | `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` (verified) |
| Candidate hash | `08275bbe629af102a4f404b3fdb0610dc40d8de953feb85e20a2e5789483c705` — **candidate section hash, NOT an effective freeze** (`CANDIDATE_SECTION_HASH_NOT_EFFECTIVE_FREEZE`) |
| Affected experiments | `EXP-MC10-09` (primary; its registered threshold and minimum evidence are unchanged) |
| Translation dependencies | ES/EN candidate text; qualified bilingual sign-off `NOT_OBTAINED`; translation equivalence `NOT_ESTABLISHED`; PT draft not approved |
| Legal/privacy dependencies | Consent-dependent like every guide step; no new legal basis, no new data category, and no evidence copy is collected; independent methodological review `REVIEW_REQUIRED` |
| Approval state | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` |
| Effective date | None — not approved; the registered design gap is not closed by a non-effective candidate |
| Sign-off evidence | `NONE` |

## 10. IV-08 — Exclusions before benefits in GUIDE-01 Q11

| Field | Value |
| --- | --- |
| Amendment ID | `IV-08` |
| Title | Exclusions-before-benefits read-aloud concept wording in `GUIDE-01` `Q11` |
| Instruments affected | `GUIDE-01` |
| Previous version | `1.0.0` (compact concept descriptions; material limitations not stated before benefits in the required form) |
| Candidate version | `1.1.0` (D11 §8) |
| Exact change | (1) Rewrite the five read-aloud concepts A–E so that material limitations precede feature advantages, with a mandatory preamble in both languages. (2) State the specific exclusions for the tested concepts: hardware not included; installation required and not included; chart and data rights conditional; no compatibility proof; no guaranteed alert delivery; no remote or unattended autopilot operation; no certified distress function; no orderable product; no approved price. (3) Add a coverage check table that records, for every required limitation and every concept, whether it is stated or not applicable and why. (4) Keep the wording neutral, keep the brand out, add no benefit claim, keep the concept labels A–E and change no rubric cell, exclusion code, threshold or misconception code. |
| Reason | The comprehension experiment depends on the participant hearing what the concept does not do before what it does; without frozen exclusions-first wording the read-aloud step would vary by interviewer and the material limitations might be omitted or softened. |
| Source hash (v1.0.0) | `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` (verified) |
| Candidate hash | `1a5acb68eb8b297dc6e3f0e96c472795bd7269eb6abab0a19d3d407ceecd6308` — **candidate section hash, NOT an effective freeze** (`CANDIDATE_SECTION_HASH_NOT_EFFECTIVE_FREEZE`) |
| Affected experiments | `EXP-MC10-06` (primary; its registered threshold and misconception list are unchanged); `EXP-MC10-10` (barrier framing) and `EXP-MC10-01` (no brand exposure before the closing step) are not changed in threshold or method |
| Translation dependencies | ES/EN candidate text; qualified bilingual sign-off `NOT_OBTAINED`; translation equivalence `NOT_ESTABLISHED`; no visual asset exists or may be shown; PT draft not approved |
| Legal/privacy dependencies | Brand and commercial wording review `REVIEW_REQUIRED`; no availability, certification, compatibility, price or delivery claim is added, and every material limitation is preserved rather than weakened |
| Approval state | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` |
| Effective date | None — not approved |
| Sign-off evidence | `NONE` |

## 11. IV-09 — Concept-ID reconciliation

| Field | Value |
| --- | --- |
| Amendment ID | `IV-09` |
| Title | Canonical concept-ID reconciliation from read-aloud labels to effective research concept identifiers |
| Instruments affected | `GUIDE-01`, `NOTE-01`, `SCHEMA-01`, `ANA-01`, and the interface with the concept-comprehension reporting mirror |
| Previous version | `1.0.0` (labels A–E in the guide; typed `A`–`E` in the schema; seven machine IDs in the reporting mirror; no explicit mapping in the instrument) |
| Candidate version | `1.1.0` (D11 §9) |
| Exact change | (1) Reproduce the canonical mapping fixed by the recovery plan: A → `NAV`; B → `HUB` plus `START` rubric element; C → `WATCH` and `PROTECT`; D → `INTEGRATED_SYSTEM` rubric element; E → `FLEET`, each at mapping version `1.1.0`, with the referenced family or bundle. (2) Record the surface-by-surface verification against the moderation guide, the comprehension test design, the price module, the notes template, the experiment definitions, the data schema, the analysis output and the CR-62 validator. (3) Require a future record to carry both the source concept label and the effective research concept identifier, and to be ineligible if either is missing unless supplied from the canonical table. (4) State that historical scripts and labels are preserved as historical records and are never silently recoded; zero participant records exist, and historical traceability is mandatory for the first real record. |
| Reason | Five read-aloud labels, seven reporting identifiers and several surfaces otherwise invite an implicit or inconsistent recoding once the first real record exists. |
| Source hash (v1.0.0) | `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` (verified) |
| Candidate hash | `7190dc1c7a296fb415ef87122d9bec0e00d18749450d0ec849856691b0b9369f` — **candidate section hash, NOT an effective freeze** (`CANDIDATE_SECTION_HASH_NOT_EFFECTIVE_FREEZE`) |
| Affected experiments | `EXP-MC10-06` (primary); `EXP-MC10-04` and `EXP-MC10-05` (construct identity traceability for the price module); all coding and reporting outputs. No threshold is changed |
| Translation dependencies | Machine identifiers are language-neutral; the read-aloud concept labels remain ES/EN candidate text with qualified bilingual sign-off `NOT_OBTAINED`; the seven reporting identifiers are not translated |
| Legal/privacy dependencies | None added; no participant record exists, and no identifier may carry a person's identity |
| Approval state | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` |
| Effective date | None — not approved |
| Sign-off evidence | `NONE` |

## 12. Required approvers and the rule that no agent self-approves

| Decision | Who may make it | Current state |
| --- | --- | --- |
| Accept or reject each instrument amendment | Research owner / Lead, on recorded review | `REVIEW_REQUIRED` — not decided |
| `APPROVED_FOR_FUTURE_FIELDWORK` for `CONSENT-01` and `NOTE-01` / `SCHEMA-01` consent evidence | Research owner with legal/privacy reviewer | `NOT_OBTAINED` |
| Legal/privacy review of IV-01, IV-04 and IV-06 | Qualified legal reviewer | `NOT_OBTAINED`; IV-06 remains `DRAFT_FOR_LEGAL_REVIEW` |
| Brand and commercial review of IV-02 and the IV-08 wording | Brand and commercial governance review | `REVIEW_REQUIRED`; trademark clearance `NOT_GRANTED` |
| Qualified ES/EN bilingual sign-off for every amendment | Qualified bilingual reviewer | `NOT_OBTAINED`; equivalence `NOT_ESTABLISHED` |
| Portuguese review package acceptance | Qualified PT translator, legal reviewer and research-methods reviewer | `NOT_STARTED` (D12) |
| Methodological review of IV-05, IV-07, IV-08 and IV-09 | Independent research methodologist, not the author of the candidate | `REVIEW_REQUIRED` |

No agent may approve its own design, act as the qualified translator, act as the legal reviewer, or
represent a `REVIEW_REQUIRED` state as approved. A passing validator, a merged pull request, a Lead
instruction or an agent inference is not an approval of any amendment.

## 13. Transition and data-governance rule

1. `1.0.0` remains the historical frozen version and is never edited in place. Its provenance and
   verified SHA-256 are preserved.
2. The candidate `1.1.0` is not in force. It becomes available for fielding only after a real recorded
   approval of every amendment that affects the instrument in question, with qualified translation
   sign-off and the legal and brand reviews recorded.
3. Data collected before an approved amendment remain governed by the instrument version in force when
   they were collected. They are never relabelled to the candidate version, and a later approval does not
   retroactively legitimise an earlier session.
4. Zero participant records exist, so no record is affected by any transition in this package. The rule
   is recorded now so that it binds the first real record.
5. A change to any candidate section re-issues this package with new candidate hashes. The previous
   candidate hashes and this package's review history are preserved, and no document is edited after the
   fact to imply that an approval existed earlier than it did.
6. If an amendment is rejected or withdrawn, `1.0.0` remains frozen and the defect it addressed remains
   open and recorded — a rejected amendment does not restore a fielding-ready state.

## 14. What this package does not establish

- It does not approve any instrument, any wording, any translation or any version.
- It does not establish translation equivalence, professional translation review or linguistic validity.
- It does not designate a controller, a privacy contact, a supervisory authority or a legal opinion.
- It does not confer fieldwork permission, outreach permission or ethics approval.
- It does not contain or imply any participant, quotation, incident, amount band or coded unit.
- It does not weaken any registered threshold, quota, permission or commercial restriction.
- It does not edit `instruments.json`, the MC-09 plan, the methodology documents or the recovery plan;
  the version register in D10 records the candidate state for traceability only.

## 15. Verification record (real results, 2026-11-01)

1. **Frozen v1.0.0 source hash, verified against the actual file bytes:**

   ```
   Get-FileHash -Algorithm SHA256 -Path "docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md"
   ```

   Real output (uppercase as printed): `Hash : CBE7F9FE4634C44A7344A4B9817827368A284EFDCFB4EC8E80E11252BA1A120D`,
   path `C:\Users\Admin\Documents\workspace\embarcarte\docs\marea\market-validation\buyers\MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md`.
   This matches the canonical lowercase source hash
   `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` recorded in the recovery execution
   plan, `instruments.json` and the MC-10 instrument version register. The file is 548 lines / 39,322 bytes
   with LF line endings.

2. **Candidate source D11 hash:**

   ```
   Get-FileHash -Algorithm SHA256 -Path "docs/marea/customer-discovery/recovery/instruments/MC10R-ES-EN-RESEARCH-INSTRUMENTS.md"
   ```

   Real output: `Hash : EF95DBF63E156D8B03C346F5D763146C00BB8B822906A9C9D0B81AF44B92F0F4`, file size
   82,262 bytes, 957 lines, LF line endings (no CR). Label: **`CANDIDATE_SOURCE_HASH_NOT_EFFECTIVE_FREEZE`**
   — a candidate source hash, not an effective freeze and not an approval.

3. **Candidate section hashes:** computed with the Node.js command in §1.3; the nine real values are
   recorded in §1.3 and repeated in each amendment record. Canonicalisation: UTF-8, LF joins, SHA-256,
   lowercase hexadecimal.

4. **Pricing ladder artefact hash:** the parsed `constructs` array of
   `data/pricing-ladders.json` recomputes to
   `bfa09ebc904a66ba65961864d5e026638e3756a41a0611f0c3fdf1e83bb5be8c`, matching the value recorded in the
   artefact.

5. **Validator observation:** the final run of `node scripts/check-marea-customer-research.mjs` on
   2026-11-01 with the recovery documents present reported
   `MC-10 customer research validation: 62/62 checks passed`. An intermediate run during the work reported
   `61/62` because of an in-progress document in another workstream that was subsequently corrected; no
   document in this directory appeared in any `CR-62` or document-scan finding at any point. This is a
   regression observation, not an approval of any amendment; the recovery gate is owned by the data
   engineer and the Lead.

6. **Absence of field evidence:** zero participants, zero interviews, zero recordings, zero price
   responses, zero coded units, zero double-coded units. No instrument has been administered.

## 16. Cross-references

| Document | Relationship |
| --- | --- |
| `docs/marea/customer-discovery/recovery/MC10R-RECOVERY-EXECUTION-PLAN.md` (D2) | Canonical registration §3.1, §3.5, §3.6; status model; amendment policy |
| `MC10R-ES-EN-RESEARCH-INSTRUMENTS.md` (D11, this directory) | The candidate source whose hashes this package records |
| `MC10R-INSTRUMENT-VERSION-REGISTER.md` (D10, this directory) | Historical v1.0.0 register, candidate v1.1.0 register, transition table and hash register |
| `MC10R-PT-TRANSLATION-REVIEW-PACKAGE.md` (D12, this directory) | Portuguese draft and review package; northern Portugal excluded from fieldwork |
| `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` | Frozen v1.0.0 source of the seven instruments (§§5–§10) and the source hash |
| `docs/marea/customer-discovery/methodology/MC10-INSTRUMENT-VERSIONS.md` and `methodology/instruments.json` | MC-10 freeze register and machine-readable mirror; preserved without edit |
| `docs/marea/customer-discovery/methodology/MC10-RESEARCH-ETHICS-AND-PRIVACY.md` | Consent model, de-identification rule, quotation rule and complaint-route defect |
| `docs/marea/customer-discovery/methodology/MC10-RESEARCH-PROTOCOL.md` | Interview order, gating, capture and amendment procedure |
| `docs/marea/customer-discovery/methodology/MC10-QUALITATIVE-ANALYSIS.md` | Analysis plan and codebook relationship |
| `docs/marea/customer-discovery/data/pricing-ladders.json` | Frozen ladder artefact referenced by IV-03 |
| `docs/marea/customer-discovery/data/experiments.json` | Frozen experiment thresholds and minimum evidence |
