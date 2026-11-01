# MC-10 — Instrument version register

| Field | Value |
| --- | --- |
| Document ID | MC-10 / D5 / MC10-INSTRUMENT-VERSIONS |
| Milestone | MC-10 of 36 — primary customer discovery |
| Register version | `1.0.0` |
| Status | `FROZEN_PENDING_AUTHORIZATION` — instruments `NOT_EXECUTED`: no instrument administered |
| Fieldwork state | `NOT_EXECUTED` — `FIELDWORK_STATUS = BLOCKED` |
| Milestone status | `BLOCKED` — `OUTREACH_AUTHORIZATION = NOT_GRANTED`; `FIELDWORK_STATUS = BLOCKED` |
| Instrument administrations | **0** sessions; 0 screens, 0 consents, 0 recordings, 0 price modules |
| Source of record | `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` |
| Source SHA-256 | `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` |
| Base | `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3` |
| Date | 2026-11-01 |
| Owner | agent-a-methodologist (Research Methodologist) |
| Machine-readable mirror | `docs/marea/customer-discovery/methodology/instruments.json` |
| Is not | evidence that any instrument was used, translated by a qualified translator, legally reviewed or equivalence-tested |

> **STATUS: NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED).** All seven instruments are
> frozen but not approved and have never been administered.

## 0. Freeze statement

Seven instruments are frozen at version `1.0.0`, extracted from the MC-09 customer-discovery plan
(§§5–§10). The freeze exists so that no wording, ordering, answer category, permission or gating rule can
be changed after results are seen. Freezing an instrument does **not** approve it for use:

- the instruments are `FROZEN_PENDING_AUTHORIZATION`, not approved;
- the data controller is undesignated, so the consent instrument cannot be completed with the controller
  identity, contact or complaint route (`W0-03`, `W0-04`, `W0-06`);
- the lawful basis has had no qualified legal review (`W0-05`);
- Spanish/English equivalence is internally reviewed only (`W0-07 = PARTIAL`);
- Portuguese instruments are deliberately absent (`W0-08 = NOT_PRODUCED`).

Zero instruments have been administered to any person. No screener response, consent, recording, guide
session or price answer exists.

## 1. Frozen source and hash verification

### 1.1 Source document

`docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md`

- 548 lines, 39,322 bytes, LF line endings, no CRLF.
- SHA-256: `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d`
- Computed with Node's `crypto` module over the exact working-tree bytes on 2026-11-01, from base commit
  `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3`.

### 1.2 Verification command

```bash
node -e "const c=require('crypto'),f=require('fs');const p='docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md';console.log(c.createHash('sha256').update(f.readFileSync(p)).digest('hex'))"
```

Expected output: `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d`.

### 1.3 Hash rules

- The hash covers the source document **as checked out**. Reformatting, line-ending normalisation,
  typo-correction or content edits change the hash and are therefore detectable.
- Any change to the source plan is a new source version; the instruments must be re-frozen and the
  register updated with a dated amendment. A changed hash without an amendment entry is a defect.
- The hash is **not** a legal approval, a translation sign-off or a statement that the instruments are
  usable.
- The freeze covers the **instrument text** in the source document. It does not cover external artefacts
  that the instruments depend on — see §7.1.

## 2. Instrument register

| ID | Instrument | Source sections | Version | ES | EN | PT | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SCREEN-01 | Recruitment screener (administered by the recruiter) | §5.1 ES / §6.1 EN | `1.0.0` | Present | Present | `NOT_PRODUCED` | `FROZEN_PENDING_AUTHORIZATION` |
| CONSENT-01 | Consent script, four separately recorded permissions | §5.2 ES / §6.2 EN | `1.0.0` | Present | Present | `NOT_PRODUCED` | `FROZEN_PENDING_AUTHORIZATION` |
| GUIDE-01 | Moderator guide, 15 numbered sections | §5.3 ES / §6.3 EN | `1.0.0` | Present | Present | `NOT_PRODUCED` | `FROZEN_PENDING_AUTHORIZATION` |
| PRICE-01 | Conditional pricing module (Gabor–Granger + Van Westendorp) | §7.1 ES / §7.2 EN | `1.0.0` | Present | Present | `NOT_PRODUCED` | `FROZEN_PENDING_AUTHORIZATION` |
| NOTE-01 | Note-taking template (identical in both languages) | §8.1 | `1.0.0` | Present | Present | `NOT_PRODUCED` | `FROZEN_PENDING_AUTHORIZATION` |
| SCHEMA-01 | Data-capture schema | §9 | `1.0.0` | Present | Present | `NOT_PRODUCED` | `FROZEN_PENDING_AUTHORIZATION` |
| ANA-01 | Analysis plan | §10 | `1.0.0` | Present | Present | `NOT_PRODUCED` | `FROZEN_PENDING_AUTHORIZATION` |

All seven share the single source SHA-256 in §1.1; the per-instrument record is the section pointer, not
a separate file. The machine-readable mirror repeats the hash per instrument so a verification script
does not need to resolve this document.

## 3. Per-instrument freeze records

### SCREEN-01 — recruitment screener

- **Scope.** Eight questions S1–S8 administered by the recruiter before consent: decision role; vessel or
  fleet type/length bands; base region; purchase activity in the last 24 months; installer/retailer years
  and brands; competing-vendor and programme-employee exclusion; prior study participation; language
  preference.
- **Frozen content.** Question wording and order, answer categories (`Yes / No / Don't know`), band
  definitions, the exclusion rules (under 18; programme staff; competitor employees; no purchase role;
  insufficient time), the `ELIGIBLE / NOT ELIGIBLE` outcome recording, and the rule that the full name is
  not stored.
- **Why frozen.** The screener defines eligibility; a post-hoc loosening of a criterion would change the
  population after results were known.
- **Known gaps.** No question asks for the consent script version or the controller identity (administered
  before consent by design); the screener must be read by a trained recruiter, and no panel exists
  (`W0-11`).

### CONSENT-01 — consent script

- **Scope.** Purpose statement, non-sale statement, duration, voluntary participation and withdrawal,
  data handling, audio-recording option, Art. 13-style information, and four separate permissions `C1`–`C4`
  (participation, recording, quotation, follow-up).
- **Frozen content.** The order, the permission wording, and the granularity of the four permissions.
- **Why frozen.** Consent scope determines what may be used; bundling or widening permissions after the
  fact would invalidate consent.
- **Known gaps.** (a) No controller identity, contact or supervisory-authority complaint route, because
  none is designated — the script cannot be issued lawfully as frozen (`W0-03`, `W0-04`); (b) the ES
  quotation permission uses the local word for "anonymous" while the EN version says "anonymised", both
  inconsistent with the pseudonymisation design (D3 §5.3, §7); (c) no consent-script version field is
  recorded by NOTE-01. These require a dated amendment before fielding.

### GUIDE-01 — moderator guide

- **Scope.** Fifteen numbered sections: pre-session screener/consent head, Q1 context, Q2 current
  equipment, Q3 workflow, Q4 recent purchases, Q5 current spend, Q6 alternatives, Q7 undirected pain
  points, Q8 installation, Q9 subscription attitude, Q10 trust/warranty, Q11 concept comprehension with
  concepts A–E and their exclusions, Q12 handoff to PRICE-01, Q13 purchase-intent evidence, Q14 closing,
  Q15 follow-up permissions.
- **Frozen content.** Question wording, probe lists, the no-brand/no-price rule for Q1–Q11, the
  exclusion-first ordering in Q11, the required read-aloud price disclosure before Q12, and the
  "nothing can be bought today" instruction.
- **Why frozen.** Question wording and ordering are the main sources of leading and anchoring; changing
  them after results would be undetectable.
- **Known gaps.** (a) The plan requires the brand not to be named until the closing section, but no
  frozen closing brand-disclosure text exists; the closing disclosure is therefore a designed step
  without a script and must be amended before fielding (D4 §15.5). (b) Concepts A–E are presented
  verbally only; no approved visual asset exists and none may be created for fielding without asset
  review.

### PRICE-01 — conditional pricing module

- **Scope.** Required disclosure read aloud; Gabor–Granger ladder for two constructs with the fixed
  five-category buy-response scale; probe questions; Van Westendorp four questions per construct;
  module close; currency and VAT treatment recorded exactly as stated.
- **Frozen content.** The disclosure text, the buy-response scale, the four Van Westendorp questions, the
  "not offers, nothing for sale" statements, and the rule that the moderator may not adjust a ladder
  mid-interview.
- **Why frozen.** The scale and the disclosure drive stated-preference bias; changing them would break
  comparability and could turn a research question into an implied offer.
- **Known gaps.** The five price points per construct are **not** contained in the source plan (§7 names
  them as "pre-registered" but gives no values). The values live in the separately frozen ladder artefact
  `pricing-ladders.json` and the pricing documents of record (D13/D14). This instrument freeze can
  therefore bind the instrument text but not the ladder values; see §7.1.

### NOTE-01 — note-taking template

- **Scope.** Participant ID; date and start time; duration; language; segment; role; acquisition source;
  consent flags with timestamps; recording flag; Q1–Q11 verbatim highlights with timestamps; concept
  comprehension grid; PRICE-01 raw answers with currency and VAT; purchase-history records; spend bands;
  alternatives; barrier ranking; follow-up permission; interviewer quality flags; free notes.
- **Frozen content.** The field list and the capture rules: verbatim only for quotes, paraphrase marked,
  never invent an amount, unknown left empty rather than "0", no names/addresses/berth or registration
  numbers.
- **Why frozen.** The note template determines what can later be coded and audited; field drift would
  silently change the evidence base.
- **Known gaps.** No consent-script version/language-of-script field (D4 §15.7); identical for ES and EN
  by design.

### SCHEMA-01 — data-capture schema

- **Scope.** Entity/field definitions for `participant`, `purchaseRecord`, `spendProfile`,
  `priceResponse`, `barrier`, `comprehension`, `coding`, `followUp`, with required flags and allowed
  values; no "agreed price", "offer" or "reservation" entity.
- **Frozen content.** Entity names, field types, allowed value sets, and the rule that all WTP fields are
  typed as research opinions and never written into a commercial price field.
- **Why frozen.** Schema changes break comparability and can create forbidden commercial fields.
- **Known gaps.** Consent record fields are listed at participant level but the consent evidence object
  (script version, capture method, language) is not fully typed; align with D3 §5.1 before fielding.

### ANA-01 — analysis plan

- **Scope.** Coding (a-priori codebook plus emergent codes only after the first four interviews; two
  coders on ≥25% of transcripts; κ target ≥ 0.60); within-case then cross-case matrices; saturation;
  negative-case analysis; indicative pricing analysis; comprehension scoring; decision records with
  verdicts; aggregate reporting.
- **Frozen content.** The analysis methods and the reporting limits; thresholds themselves are frozen in
  `validation-experiments.json`, and the ladder values are frozen in the pricing-ladder artefact.
- **Why frozen.** An analysis plan changed after seeing data is not preregistered.
- **Known gaps.** ANA-01 names **eight** a-priori theme families (problem, spend, alternative, trigger,
  installation barrier, subscription objection, trust barrier, misconception). The operational codebook
  in D11 elaborates them into **twelve** codes (adding urgency, compatibility objection,
  purchase-decision role and negative case). The elaboration is a design-stage expansion of the same
  frozen plan and introduces no post-hoc change while no data exists; nevertheless, the operational
  codebook version must be recorded as a dated ANA-01 v1.1.0 minor amendment before the first interview
  so the freeze register names the codebook actually used.

## 4. Review status

### 4.1 Structural and meaning review — COMPLETE (internal only)

The ES and EN instruments were reviewed side by side by the research methodologist on 2026-11-01. The
review checked:

1. Section numbering and question order are identical across languages (S1–S8, Q1–Q15, PRICE-01 A/B/C).
2. Sentence-level meaning correspondence for every question, probe and exclusion; no question exists in
   one language only.
3. Answer categories are identical and in the same order (yes/no/don't-know; the five-category buy
   response; the four Van Westendorp questions; length and fleet bands).
4. Exclusion rules and the `ELIGIBLE / NOT ELIGIBLE` outcome are stated the same way in both languages.
5. The four permissions `C1`–`C4` are separate, optional where intended, and never bundled in either
   language.
6. The no-brand/no-price rule for Q1–Q11, the exclusion-first concept descriptions and the required
   price disclosure before Q12 are present in both languages.
7. Prohibited claims (availability, certification, warranty, compatibility, stock, lead time, ordering)
   are absent from both versions, and the "nothing can be bought today" statement is present.
8. NOTE-01 and SCHEMA-01 are language-neutral; identical text applies in both languages.

This is an **internal consistency review**, not a translation validation. It was not performed by a
qualified translator, not reviewed by a bilingual subject-matter expert, and not verified by
back-translation or cognitive interviewing.

### 4.2 Qualified bilingual sign-off — NOT OBTAINED

- `qualifiedTranslationSignOff = NOT_OBTAINED`.
- No professional translator or bilingual reviewer has signed either language version.
- No participant has seen any instrument, so no comprehension or usability evidence exists.
- `W0-07` is therefore `PARTIAL`, and the milestone keeps it open.

### 4.3 Translation equivalence — NOT ESTABLISHED

- `equivalenceClaim = NOT_ESTABLISHED`.
- No back-translation, no equivalence panel, no statistical equivalence test and no cognitive pretest
  has been performed.
- The instruments are designed to be parallel (identical structure, numbering, categories and gating),
  which reduces but does not remove translation risk.
- Consequence: cross-language comparisons must be treated as provisional; language is recorded per
  participant so later checking is possible; the limitation is reported in any output.
- To establish equivalence before fielding: qualified bilingual translation review, back-translation of
  the screener, the consent permissions, the concept descriptions and the pricing disclosure, an
  equivalence sign-off recorded against a **new instrument version**, and — if feasible — cognitive
  pretesting outside the study sample. None of this exists.

## 5. Portuguese status

- **Status: `NOT_PRODUCED`** for all seven instruments, consistent with `W0-08` and `BLK-MC10-07`.
- **Reason.** Producing Portuguese text without a qualified Portuguese translator and reviewer would
  create an unreviewed instrument that participants in northern Portugal would be asked to act on —
  including consent and price questions. That is not acceptable design, so the absence is deliberate.
- **Impact.** Northern Portugal is not fieldable; the prepared geography is Rías Baixas/Galicia, with
  Portugal conditional.
- **Unblock path.** Qualified PT translation and review, frozen as a new instrument version with recorded
  source hash and a translation sign-off; only then may a Portuguese channel be authorised and the
  geographic scope extended.
- **Blocker ownership note.** `BLK-MC10-07` is recorded with the research methodologist as owner, but a
  methodologist cannot self-certify a qualified translation. The unblock requires an external qualified
  translator/reviewer plus recorded approval; the methodologist can specify the requirement and review
  the result, not manufacture the sign-off.

## 6. Change-control rule

1. **Frozen until amended.** Instruments at version `1.0.0` may not be edited in place. Every change goes
   through a dated amendment record naming the instrument, the section, the old and new text, the reason,
   the affected version and the approver.
2. **New version, never a silent edit.** Semantic versioning:
   - `PATCH` — typographical or formatting correction with no meaning change.
   - `MINOR` — wording clarification, added consent-version field, added language, new codebook
     elaboration, or a change that preserves the study design.
   - `MAJOR` — change to a permission, the lawful basis, the buy-response scale, a gating rule, the
     concept set or the analysis method.
3. **Prior data stays under the version in force.** Data collected before an amendment remain governed by
   the instrument version recorded at the session; they are not re-labelled to the new version.
4. **Hash-based detection.** The source hash and the per-instrument records make unrecorded edits
   detectable. A hash mismatch without a corresponding amendment is a defect and blocks fielding.
5. **Everything frozen together.** A change to any instrument requires the register, the machine-readable
   mirror, the protocol version reference and the D11 codebook reference to stay aligned in the same
   amendment. No partial update.
6. **No retroactive approvals.** A document edit may not make an approval appear to have existed earlier
   than it did.

No amendment exists at the date of this register, because no data exists and no change has been needed.

## 7. Freeze scope, known gaps and registered inconsistencies

### 7.1 PRICE-01 ladder values are outside this hash

The source plan names "five pre-registered price points" per construct but does not contain their values.
Those values live in the pricing-ladder artefact and the pricing documents of record. Consequences:

- `instruments.json` can and does record only the instrument text and the source-document hash.
- The price-ladder values must be frozen and hash-recorded by the pricing artefact itself; the Lead's
  manifest/freeze records should cite it alongside this one.
- Until the ladder artefact is frozen and referenced here by path, hash and version, the PRICE-01 freeze
  is **incomplete for fielding purposes**, even though the instrument wording is frozen.
- No ladder value may be administered without that freeze, and no value may be presented as a price.

### 7.2 Registered wording and completeness defects

| ID | Defect | Impact | Required resolution |
| --- | --- | --- | --- |
| IV-01 | Consent quotation permission says "anonymous" while the design permits only de-identification (D3 §5.3, §7) | Participants could be promised a protection the design cannot guarantee | Dated `MINOR` amendment to CONSENT-01 before fielding |
| IV-02 | No frozen closing brand-disclosure text despite the plan's closing-section brand rule | The designed step has no script; improvisation risk | Dated `MINOR` amendment adding the closing disclosure |
| IV-03 | PRICE-01 ladder values not in the frozen source document (§7.1) | Instrument freeze incomplete for fielding | Freeze the ladder artefact and reference it here |
| IV-04 | NOTE-01/SCHEMA-01 record consent flags but not consent script version or language of script | Consent cannot be fully evidenced for Art. 7(1) | Dated `MINOR` amendment before fielding |
| IV-05 | ANA-01 names eight theme families; D11 operational codebook has twelve codes | Freeze register and analysis plan could disagree | Record ANA-01 v1.1.0 codebook amendment before the first interview |
| IV-06 | ES consent script has no supervisory-authority complaint route | Art. 13 information incomplete | Cannot be fixed by drafting alone: needs controller and authority mapping (`W0-03`…`W0-06`) |
| IV-07 | Qualified bilingual sign-off absent; equivalence not established (§4) | Cross-language comparability limited | Qualified translation review before fielding (`W0-07`) |
| IV-08 | PT instruments absent (§5) | Northern Portugal not fieldable | Qualified PT translation and review (`BLK-MC10-07`) |

These defects do not weaken the milestone status; they are recorded so that a later reader cannot mistake
`FROZEN_PENDING_AUTHORIZATION` for "ready to field".

## 8. Verification record

- Hash recomputation: performed with the command in §1.2 on 2026-11-01; result matches
  `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d`.
- `instruments.json`: validated as syntactically valid JSON, 2-space indent, final newline; per-instrument
  `sourceSha256` values equal the source hash and the top-level `sourceSha256`.
- Instrument administrations: 0. Sessions: 0. Recordings: 0. Price modules: 0. Screener results: 0.
- No instrument has been shown, read or administered to any person, and no participant data of any kind
  exists.

## 9. Cross-references

| Document | Relationship |
| --- | --- |
| `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` | Frozen source of all seven instruments (§§5–§10) |
| `docs/marea/customer-discovery/methodology/instruments.json` | Machine-readable freeze record mirroring this register |
| `docs/marea/customer-discovery/methodology/MC10-RESEARCH-PROTOCOL.md` (D4) | Interview order, gating, capture and amendment procedure |
| `docs/marea/customer-discovery/methodology/MC10-RESEARCH-ETHICS-AND-PRIVACY.md` (D3) | Consent model, pseudonymisation, layers A/B/C |
| `docs/marea/customer-discovery/methodology/MC10-QUALITATIVE-ANALYSIS.md` (D11) | Operational codebook referenced by ANA-01 |
| `docs/marea/customer-discovery/data/research-status.json` | `W0-03`…`W0-08`, `BLK-MC10-02`, `BLK-MC10-07` |
| `docs/marea/customer-discovery/data/decisions.json` | `D-031` instrument freeze decision |
| `docs/marea/customer-discovery/pricing/MC10-GABOR-GRANGER.md`, `pricing/MC10-VAN-WESTENDORP.md`, `data/pricing-ladders.json` | External ladder artefact that completes the PRICE-01 freeze (§7.1) |
