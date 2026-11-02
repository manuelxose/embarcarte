# MC-10R — Instrument version register (D10)

| Field | Value |
| --- | --- |
| Document ID | MC-10R / D10 / `MC10R-INSTRUMENT-VERSION-REGISTER` |
| Programme | EMBARCARTE / MAREA |
| Milestone | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36) |
| Amendment package | `MC10R-INSTRUMENT-AMENDMENT-v1.1.0` |
| Register version | `1.0.0` (this register) |
| Historical frozen instrument version | `1.0.0` — seven instruments, preserved unchanged |
| Candidate instrument version | `1.1.0` — `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` |
| Document status | `REVIEW_REQUIRED` |
| Version status of the candidate | `PROPOSED_NOT_EFFECTIVE` |
| Candidate source of record | `docs/marea/customer-discovery/recovery/instruments/MC10R-ES-EN-RESEARCH-INSTRUMENTS.md` (D11) |
| Candidate source SHA-256 | `EF95DBF63E156D8B03C346F5D763146C00BB8B822906A9C9D0B81AF44B92F0F4` — **candidate source hash, NOT an effective freeze** (`CANDIDATE_SOURCE_HASH_NOT_EFFECTIVE_FREEZE`) |
| Frozen v1.0.0 source SHA-256 (verified) | `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` |
| Instruments registered | `SCREEN-01`, `CONSENT-01`, `GUIDE-01`, `PRICE-01`, `NOTE-01`, `SCHEMA-01`, `ANA-01` |
| Instrument administrations | 0 — zero participants, zero sessions, zero consents, zero recordings, zero price modules |
| Date | 2026-11-01 |
| Owner | agent-e-instruments (Research Instrument and Linguistic Specialist) |
| Write scope | `docs/marea/customer-discovery/recovery/instruments/` |
| Scope | Version register: historical v1.0.0, candidate v1.1.0, transition table, hash register, review states, PT state |
| Is not | an approval, an effective freeze, a translation sign-off, an equivalence claim, evidence that any instrument was used |

> **STATUS: `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE`.** No candidate version in this register is
> approved or effective. The seven historical instruments remain frozen at `1.0.0` and are not edited.
> Qualified translation sign-off is `NOT_OBTAINED` for ES/EN and translation equivalence is
> `NOT_ESTABLISHED`; the Portuguese state is a machine-assisted draft only (D12). Zero instruments have
> been administered to any person and no participant data of any kind exists. The candidate hash recorded
> here is a source hash, not a freeze in force.

## 1. Register rules

1. **`1.0.0` is historical and immutable.** The seven instruments were frozen at `1.0.0` from
   `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` (§§5–§10) before any
   fieldwork or participant data existed. Their text, ordering, answer categories, permissions, gating and
   language set are preserved. The frozen source is not edited and its SHA-256 is verified against the
   actual file bytes (§5).
2. **`1.1.0` is candidate only.** It exists as a reviewable candidate source in D11 and in nine dated
   amendment records in D9. It is `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` and may not be administered.
3. **One version in force at a time.** A session is governed by the version in force when it occurs. Data
   collected before an approved amendment remain governed by that earlier version and are never relabelled
   to the candidate version. No retroactive approval and no retroactive relabelling is permitted.
4. **Semantic versioning is preserved.** A patch-level change corrects typography without meaning; a minor
   change clarifies wording, adds a consent-version field, adds a language, elaborates a codebook or
   preserves the design; a major change alters a permission, the lawful basis, a scale, a gating rule, the
   concept set or the analysis method. All nine amendments are minor-level candidate changes; none is
   approved, so no level is in force.
5. **No silent edit.** Every change requires a dated amendment naming the instrument, the section, the old
   and new text, the reason, the affected version and the approver, plus a new version and an updated hash.
   A hash mismatch without a corresponding amendment is a defect and blocks fielding.
6. **Everything frozen together.** A change to any instrument requires this register, the machine-readable
   mirror `methodology/instruments.json`, the protocol version reference and the D11 codebook reference to
   stay aligned in the same amendment. No partial update. This register does not edit the MC-10 mirror; it
   records the recovery candidate state so that the later, approved update is traceable.
7. **No approval is conferred by this register.** Only a real recorded human or qualified-professional
   review can produce `APPROVED_FOR_FUTURE_FIELDWORK`. A candidate hash, a passing validator or a Lead
   instruction is not an approval.

## 2. v1.0.0 historical frozen register (preserved, not edited)

Source of record: `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md`.
Frozen at: `2026-11-01`. Source SHA-256:
`cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` (verified with `Get-FileHash`,
§5). Status for all seven: `FROZEN_PENDING_AUTHORIZATION` in the MC-10 mirror, which is the per-instrument
administration state; the historical register state used by the recovery contract is `FROZEN_HISTORICAL`.
Both readings are true and neither is an approval: the v1.0.0 text is historically frozen and nothing is
approved for fielding.

| Instrument | Title | Source sections | Version | Languages | PT state | Structural review | Qualified translation sign-off | Equivalence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `SCREEN-01` | Recruitment screener, administered by the recruiter (`S1`–`S8`) | §5.1 ES / §6.1 EN | `1.0.0` | ES, EN | `NOT_PRODUCED` | `COMPLETE` (internal only) | `NOT_OBTAINED` | `NOT_ESTABLISHED` |
| `CONSENT-01` | Consent script with four separately recorded permissions (`C1`–`C4`) | §5.2 ES / §6.2 EN | `1.0.0` | ES, EN | `NOT_PRODUCED` | `COMPLETE` (internal only) | `NOT_OBTAINED` | `NOT_ESTABLISHED` |
| `GUIDE-01` | Moderator guide, fifteen numbered sections (`Q1`–`Q15`) | §5.3 ES / §6.3 EN | `1.0.0` | ES, EN | `NOT_PRODUCED` | `COMPLETE` (internal only) | `NOT_OBTAINED` | `NOT_ESTABLISHED` |
| `PRICE-01` | Conditional pricing module (Gabor–Granger and Van Westendorp) | §7.1 ES / §7.2 EN | `1.0.0` | ES, EN | `NOT_PRODUCED` | `COMPLETE` (internal only) | `NOT_OBTAINED` | `NOT_ESTABLISHED` |
| `NOTE-01` | Note-taking template, identical in both languages | §8.1 | `1.0.0` | ES, EN | `NOT_PRODUCED` | `COMPLETE` (internal only) | `NOT_OBTAINED` | `NOT_ESTABLISHED` |
| `SCHEMA-01` | Data-capture schema | §9 | `1.0.0` | ES, EN | `NOT_PRODUCED` | `COMPLETE` (internal only) | `NOT_OBTAINED` | `NOT_ESTABLISHED` |
| `ANA-01` | Analysis plan | §10 | `1.0.0` | ES, EN | `NOT_PRODUCED` | `COMPLETE` (internal only) | `NOT_OBTAINED` | `NOT_ESTABLISHED` |

The structural review was an internal consistency review by the research methodologist, not a translation
validation and not a qualified review. It did not make any version approved or fieldable.

Recorded v1.0.0 defects carried into the candidate package (all nine amendments address a registered
defect; none is closed until a real approval exists): consent quotation wording that promised anonymity
(IV-01); absent closing brand-disclosure text (IV-02); ladder values outside the frozen instrument text
(IV-03); no consent-script version or language field (IV-04); eight theme families against a twelve-code
operational codebook (IV-05); no supervisory-authority complaint route (IV-06); no dedicated incident
question for `EXP-MC10-09` (IV-07); material limitations not stated before benefits in `Q11` (IV-08); and
five read-aloud labels against seven reporting identifiers with no explicit mapping (IV-09).

## 3. v1.1.0 candidate register (not effective)

Candidate source: D11. Candidate version: `1.1.0`. All seven candidate instruments are
`REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE`; none has an effective date, an approver or sign-off
evidence.

| Instrument | Amendment(s) | Candidate version | Candidate source locator | Languages | PT state | Review state | Qualified translation sign-off | Equivalence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `SCREEN-01` | No direct amendment in this package; unchanged candidate text | `1.0.0` (no candidate change) | D11 (unchanged) | ES, EN candidate | `NOT_PRODUCED`; D12 key terms only | `REVIEW_REQUIRED` (instrument unchanged, package pending) | `NOT_OBTAINED` | `NOT_ESTABLISHED` |
| `CONSENT-01` | IV-01, IV-06 | `1.1.0` | D11 §1, §6 | ES, EN candidate | `MACHINE_ASSISTED_DRAFT_NOT_APPROVED`; PT instruments `NOT_PRODUCED` | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE`; IV-06 `DRAFT_NOT_APPROVED` / `DRAFT_FOR_LEGAL_REVIEW` | `NOT_OBTAINED` | `NOT_ESTABLISHED` |
| `GUIDE-01` | IV-02, IV-07, IV-08, IV-09 | `1.1.0` | D11 §2, §7, §8, §9 | ES, EN candidate | `MACHINE_ASSISTED_DRAFT_NOT_APPROVED`; PT instruments `NOT_PRODUCED` | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` | `NOT_OBTAINED` | `NOT_ESTABLISHED` |
| `PRICE-01` | IV-03 (and IV-09 construct identity traceability) | `1.1.0` | D11 §3, §9 | ES, EN candidate | `MACHINE_ASSISTED_DRAFT_NOT_APPROVED`; PT instruments `NOT_PRODUCED` | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` | `NOT_OBTAINED` | `NOT_ESTABLISHED` |
| `NOTE-01` | IV-04 (and IV-09 concept capture) | `1.1.0` | D11 §4, §9 | Language-neutral ES/EN candidate | `MACHINE_ASSISTED_DRAFT_NOT_APPROVED`; PT instruments `NOT_PRODUCED` | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` | `NOT_OBTAINED` | `NOT_ESTABLISHED` |
| `SCHEMA-01` | IV-04 (and IV-09 concept fields) | `1.1.0` | D11 §4, §9 | Language-neutral ES/EN candidate | `MACHINE_ASSISTED_DRAFT_NOT_APPROVED`; PT instruments `NOT_PRODUCED` | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` | `NOT_OBTAINED` | `NOT_ESTABLISHED` |
| `ANA-01` | IV-05 (and IV-09 mapping) | `1.1.0` | D11 §5, §9 | ES, EN candidate (internal analysis labels in English) | `NOT_PRODUCED`; no PT analysis instrument | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` | `NOT_OBTAINED` | `NOT_ESTABLISHED` |

Notes on the candidate register:

- The candidate text for `SCREEN-01` is unchanged by this package. It is listed because the register covers
  all seven instruments and because the consent, disclosure and incident changes interact with the
  screener sequence and recruitment language.
- `NOTE-01` and `SCHEMA-01` are language-neutral by design; their candidate fields have ES/EN labels but
  the instruments themselves are not translated prose.
- No candidate version is recorded as effective, and no candidate version replaces `1.0.0` in the MC-10
  mirror `methodology/instruments.json`. That mirror is not edited by this recovery package.

## 4. Transition table

| From state | Event required to move | To state | Who may record it | Current position |
| --- | --- | --- | --- | --- |
| `1.0.0` frozen historical | Dated amendment package (D9) | Candidate `1.1.0` drafted | Instrument specialist prepares; no approval implied | Done — D9 and D11 written as candidate |
| Candidate drafted | Recorded review of every affected amendment | `REVIEW_REQUIRED` accepted for review | Research owner / Lead review record | Candidate is `REVIEW_REQUIRED`; the acceptance review is not recorded |
| `REVIEW_REQUIRED` | Qualified translation sign-off, legal review where applicable, brand/commercial review where applicable, methodological review | `APPROVED_FOR_FUTURE_FIELDWORK` or `REJECTED` | Research owner with the qualified reviewers named in D9 §12 | Not obtained; no reviewer has signed |
| `APPROVED_FOR_FUTURE_FIELDWORK` | Fieldwork authorised under `AUTH-MC10-001` and every pre-fieldwork gate complete | Version in force for future sessions | Research owner and authorization gate | `AUTH-MC10-001 = NOT_GRANTED`; nothing is in force |
| Version in force | Dated amendment creating a later version | `SUPERSEDED` | Research owner | Not applicable — no version has been in force since the freeze |
| Rejected / withdrawn | Recorded rejection or withdrawal | `REJECTED` / `WITHDRAWN`; `1.0.0` stays frozen | Research owner | Not applicable today |

**The binding transition rule.** Data collected before an approved amendment remain governed by the
version in force when they were collected. A later approval does not rewrite the version recorded for an
earlier session, does not retroactively legitimise a defective consent and does not permit a record to be
relabelled to the candidate version. Zero participant records exist in this recovery, so no transition in
this table re-labels or re-scores any data; the rule is recorded now because it binds the first real record.

## 5. Hash register

### 5.1 Historical frozen source (verified)

| Item | Value |
| --- | --- |
| Path | `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` |
| Command | `Get-FileHash -Algorithm SHA256 -Path "docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md"` |
| Real result (as printed, uppercase) | `CBE7F9FE4634C44A7344A4B9817827368A284EFDCFB4EC8E80E11252BA1A120D` |
| Canonical lowercase value | `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` |
| Match with the recorded canonical hash | Yes — matches the recovery execution plan, `instruments.json` and the MC-10 instrument version register |
| File facts | 548 lines, 39,322 bytes, LF line endings |
| Freeze date | `2026-11-01` |
| Status | Historical freeze, effective for the v1.0.0 text; never edited in place |

### 5.2 Candidate source (computed, non-effective)

| Item | Value |
| --- | --- |
| Path | `docs/marea/customer-discovery/recovery/instruments/MC10R-ES-EN-RESEARCH-INSTRUMENTS.md` (D11) |
| Command | `Get-FileHash -Algorithm SHA256 -Path "docs/marea/customer-discovery/recovery/instruments/MC10R-ES-EN-RESEARCH-INSTRUMENTS.md"` |
| Real result (as printed, uppercase) | `EF95DBF63E156D8B03C346F5D763146C00BB8B822906A9C9D0B81AF44B92F0F4` |
| Label | **`CANDIDATE_SOURCE_HASH_NOT_EFFECTIVE_FREEZE`** — candidate source hash, not an effective freeze, not an approval |
| File facts | 82,262 bytes, 957 lines, LF line endings |
| Re-issue rule | Any change to D11 changes this hash and requires this register and D9 to be re-issued with new candidate hashes; the old values are preserved in the review history |

Per-amendment candidate section hashes (canonicalisation and command in D9 §1.3): IV-01
`408ea5dc31ea15b364c728ccfb632a77268013121603653e8b7f35a13584c4d7`; IV-02
`a8dabeee0f7f6080d5222eead6dc1f7281603cfa9038dc9ed589e12d11c5bbc9`; IV-03
`79de189d272f1026fbb31f872c215606e3816d6bb02e7df09bfbe26bb0b8354c`; IV-04
`b6d0504fa73435ccfd58a53ca428d506a8dd6756ed54719c22c1162f7f4144d8`; IV-05
`26fcebd342d96e86ba57039ff3cdaed7e0575c9748f13a88448daa5e482785e3`; IV-06
`c3df872bd588c397096973c5be5a4e85cc6f391b64f2d652ed4e4ad9bb10d2e8`; IV-07
`08275bbe629af102a4f404b3fdb0610dc40d8de953feb85e20a2e5789483c705`; IV-08
`1a5acb68eb8b297dc6e3f0e96c472795bd7269eb6abab0a19d3d407ceecd6308`; IV-09
`7190dc1c7a296fb415ef87122d9bec0e00d18749450d0ec849856691b0b9369f`. All nine are candidate section
hashes — none is an effective freeze.

### 5.3 Dependent artefact (referenced, not re-frozen here)

| Item | Value |
| --- | --- |
| Path | `docs/marea/customer-discovery/data/pricing-ladders.json` |
| Constructs SHA-256 | `bfa09ebc904a66ba65961864d5e026638e3756a41a0611f0c3fdf1e83bb5be8c` (recorded in the artefact and independently recomputed on 2026-11-01; match) |
| Ladder version | `1.0.0` |
| Status | `PRE_REGISTERED_HYPOTHESIS`; no price approved; no ladder administered |

## 6. Portuguese state

- All seven instruments remain `NOT_PRODUCED` in Portuguese. The only Portuguese material in this recovery
  is the machine-assisted draft of participant information and key consent and invitation terms in D12,
  labelled `MACHINE_ASSISTED_DRAFT_NOT_APPROVED`.
- No qualified Portuguese translator, native Portuguese linguistic reviewer, Portuguese legal reviewer or
  Portuguese research-methods reviewer has reviewed the draft. No Portuguese instrument version exists.
- Northern Portugal remains excluded from fieldwork until Portuguese instruments, recruitment compliance
  and interviewer capability are approved. The prepared Wave 1 geography is Rías Baixas / Galicia (Spain
  only), and this register does not extend it.
- The Portuguese dependency is recorded, not waived. The evidence required to close it is listed in D12.

## 7. Review-state matrix

| Instrument | Structural review | Qualified ES/EN sign-off | Translation equivalence | Legal/privacy review | Brand/commercial review | Methodological review | Approval |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `SCREEN-01` | `COMPLETE` (internal, v1.0.0) | `NOT_OBTAINED` | `NOT_ESTABLISHED` | `NOT_OBTAINED` (recruitment lawful basis) | Not applicable | `REVIEW_REQUIRED` (unchanged) | None |
| `CONSENT-01` | `COMPLETE` (internal, v1.0.0); candidate revised | `NOT_OBTAINED` | `NOT_ESTABLISHED` | `NOT_OBTAINED`; IV-06 `DRAFT_FOR_LEGAL_REVIEW` | Public testimonial use `BLOCKED` | `REVIEW_REQUIRED` | None |
| `GUIDE-01` | `COMPLETE` (internal, v1.0.0); candidate revised | `NOT_OBTAINED` | `NOT_ESTABLISHED` | `NOT_OBTAINED` | `REVIEW_REQUIRED` (proposed brand disclosure) | `REVIEW_REQUIRED` | None |
| `PRICE-01` | `COMPLETE` (internal, v1.0.0); candidate revised | `NOT_OBTAINED` | `NOT_ESTABLISHED` | `NOT_OBTAINED` (VAT framing is a hypothesis) | `REVIEW_REQUIRED` | `REVIEW_REQUIRED` | None |
| `NOTE-01` | `COMPLETE` (internal, v1.0.0); candidate revised | `NOT_OBTAINED` | `NOT_ESTABLISHED` | `NOT_OBTAINED` | Not applicable | `REVIEW_REQUIRED` | None |
| `SCHEMA-01` | `COMPLETE` (internal, v1.0.0); candidate revised | `NOT_OBTAINED` | `NOT_ESTABLISHED` | `NOT_OBTAINED` | Not applicable | `REVIEW_REQUIRED` | None |
| `ANA-01` | `COMPLETE` (internal, v1.0.0); candidate revised | `NOT_OBTAINED` | `NOT_ESTABLISHED` | Not applicable | Not applicable | `REVIEW_REQUIRED` | None |

No row has an `APPROVED` or `APPROVED_FOR_FUTURE_FIELDWORK` value, and none may be inferred from the
candidate source hash, the amendment package or any validator result.

## 8. Open dependencies and blocking conditions

| Dependency | Owner of the real value | State | Effect on this register |
| --- | --- | --- | --- |
| Data-controller designation | Governance package, then real designation | `OPEN` / `BLOCKED` | Consent and privacy text cannot be approved; `CONSENT-01` stays candidate |
| Controller privacy contact and complaint route | Governance package, then real designation | `OPEN` | IV-06 stays `DRAFT_FOR_LEGAL_REVIEW` |
| Qualified legal review of lawful basis, consent and privacy text | Qualified legal reviewer | `NOT_OBTAINED` | No legal instrument state above `DRAFT_FOR_LEGAL_REVIEW` |
| Qualified ES/EN bilingual sign-off | Qualified bilingual reviewer | `NOT_OBTAINED` | Candidate remains `REVIEW_REQUIRED` |
| Translation equivalence evidence | Qualified bilingual reviewer | `NOT_ESTABLISHED` | Cross-language comparability remains limited and must be reported |
| Brand and commercial review of the disclosure and concept wording | Brand and commercial governance | `REVIEW_REQUIRED`; trademark clearance `NOT_GRANTED`; commercial publication `BLOCKED` | IV-02 and IV-08 cannot be approved |
| Qualified Portuguese translation and review | Qualified PT translator, legal reviewer, research-methods reviewer | `NOT_STARTED` | All PT instruments stay `NOT_PRODUCED`; northern Portugal excluded |
| Fieldwork authorization `AUTH-MC10-001` | Authorizer | `NOT_GRANTED` | No version may be used; fieldwork `BLOCKED` |
| Interviewer panel and training | Fieldwork owner, then real humans | `NOT_APPROVED` | No instrument can be administered even if approved |
| Secure research store provisioned | Data owner, then real provisioning | `NOT_PROVISIONED` | No session record can exist |

## 9. Verification record

- `Get-FileHash -Algorithm SHA256` on the frozen source returned
  `CBE7F9FE4634C44A7344A4B9817827368A284EFDCFB4EC8E80E11252BA1A120D`, matching the canonical source hash
  `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` recorded elsewhere in the recovery
  package.
- `Get-FileHash -Algorithm SHA256` on the candidate source D11 returned
  `EF95DBF63E156D8B03C346F5D763146C00BB8B822906A9C9D0B81AF44B92F0F4`, recorded here with the label
  `CANDIDATE_SOURCE_HASH_NOT_EFFECTIVE_FREEZE`.
- The pricing ladder constructs hash recomputed to
  `bfa09ebc904a66ba65961864d5e026638e3756a41a0611f0c3fdf1e83bb5be8c`, matching the artefact.
- The final run of `node scripts/check-marea-customer-research.mjs` on 2026-11-01 with the recovery
  documents present reported `MC-10 customer research validation: 62/62 checks passed`. An intermediate
  run reported `61/62` because of an in-progress document in another workstream that was subsequently
  corrected; no document in this directory appeared in any document-scan finding. This is a regression
  observation only and approves nothing.
- Instrument administrations: 0. Participants: 0. Sessions: 0. Recordings: 0. Price modules: 0. Coded
  units: 0. Double-coded units: 0. Cohen's kappa: `NOT_COMPUTED`.

## 10. Cross-references

| Document | Relationship |
| --- | --- |
| `docs/marea/customer-discovery/recovery/MC10R-RECOVERY-EXECUTION-PLAN.md` (D2) | Canonical identifiers, versions and amendment policy |
| `MC10R-IV01-IV09-AMENDMENT.md` (D9, this directory) | The nine dated amendment records |
| `MC10R-ES-EN-RESEARCH-INSTRUMENTS.md` (D11, this directory) | Candidate source of the v1.1.0 text |
| `MC10R-PT-TRANSLATION-REVIEW-PACKAGE.md` (D12, this directory) | Portuguese draft, review requirements and closure evidence |
| `docs/marea/customer-discovery/methodology/instruments.json` | MC-10 machine-readable mirror; not edited by this package |
| `docs/marea/customer-discovery/methodology/MC10-INSTRUMENT-VERSIONS.md` | MC-10 instrument version register and defect register |
| `docs/marea/customer-discovery/methodology/MC10-RESEARCH-PROTOCOL.md` | Amendment procedure and session gating |
| `docs/marea/customer-discovery/methodology/MC10-RESEARCH-ETHICS-AND-PRIVACY.md` | Consent model, de-identification and quotation rules |
| `docs/marea/customer-discovery/data/pricing-ladders.json` | Frozen ladder artefact referenced by IV-03 |
