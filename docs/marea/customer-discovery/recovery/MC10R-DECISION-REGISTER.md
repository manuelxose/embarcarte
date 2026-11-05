# MC-10R — Decision register (D4)

| Field | Value |
| --- | --- |
| Document ID | MC-10R / D4 / `MC10R-DECISION-REGISTER` |
| Programme | EMBARCARTE / MAREA |
| Milestone | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36) |
| Date | 2026-11-01 |
| Owner | `lead` |
| Recovery status | `IN_PROGRESS` |
| Fieldwork status | `BLOCKED` |
| Authorization status | `NOT_GRANTED` |

This register records the decisions taken during the recovery. Each entry states whether it is an
internal recovery decision (effective for the recovery package) or a proposal that requires a real
external approval before it can govern real research. No external approval is claimed anywhere.

---

## DR-MC10R-01 — 2026-11-01 — Staged sampling reconciliation (Option A + C): quotas are authoritative, 40–80 is a historical aspiration

**Context.** PI-01: the preserved per-segment quotas sum to a minimum of 37 and a maximum of 57
completed interviews, while MC-09 and MC-10 also state a 40–80 programme planning target. 80 exceeds
the achievable maximum of 57; 40 exceeds the achievable minimum of 37. The totals are not derived from
the quotas.

**Decision.** Adopt, as a **proposal for programme-owner approval** (`PROPOSED_NOT_EFFECTIVE`):
1. the per-segment quotas remain the authoritative completion requirements (minimum 37, achievable
   envelope maximum 57);
2. the candidate authoritative overall target is 37 minimum / 57 maximum;
3. `40–80` is preserved as `HISTORICAL_PLANNING_ASPIRATION`; reaching it requires a separate approved
   quota-expansion amendment (Option B), which is not recommended for Wave 1;
4. the study is staged (Option C): Wave 1 exploratory 18–28 (SEG-01, SEG-03, SEG-04, SEG-06), Wave 2
   completes the eight-segment minimum of 37 (ceiling 57), Wave 3 optional extension only under an
   approved amendment;
5. no wave may be presented as satisfying the full study, the experiment minimums or MC-10 acceptance.

**Rationale.** Option B would multiply cost and fieldwork burden to satisfy an aspiration that no
experiment threshold requires. Option A alone leaves the programme with an unexplained gap. The staged
design keeps the minimum statistical/operational requirements intact, makes the arithmetic explicit
and separates exploration from confirmation.

**Consequences.** (a) 40–80 can never be cited as an approved total. (b) Wave 1 is exploratory only.
(c) The quota-expansion option remains available but requires approval and a new version. (d) Validators
reject any total inconsistent with 37/57 and any exploratory wave presented as the complete study.

**Evidence.** D5, D6, D8, D27; `data/research-status.json` planning inconsistencies.

**Status effect.** No authorization; amendment remains `PROPOSED_NOT_EFFECTIVE` until approved.

---

## DR-MC10R-02 — 2026-11-01 — One authoritative segment-quota contract (v1.1.0 proposed)

**Context.** PI-02: three conflicting readings of segment minimums/targets (minimum 5/target 8 with
lower operator/retailer minimums; SEG-04/05 minimum 5 in the table; experiment target 8–10 exceeding
some maxima).

**Decision.** Create a single versioned segment-quota contract (`MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED`)
with all 15 fields per segment (the 14 enumerated fields — ID, name, eligibility, screening rules,
minimum qualitative interviews, target qualitative interviews, maximum planned interviews,
pricing-module eligibility, required source diversity, geographic scope, research wave, stopping rule,
evidence threshold, amendment version — plus `priorVersionReading`, which records the preserved v1.0.0
value). Status `PROPOSED_NOT_EFFECTIVE`; the v1.0.0 table is preserved as an immutable historical
reference.
All documents and datasets must point to the same effective version; the eight canonical segment names
are never redefined.

**Rationale.** Ambiguity between segment minimum, segment target, overall target, experiment minimum
and optional extension is itself a fieldwork defect: it makes quota compliance untestable and permits
silent redefinition.

**Consequences.** Any dataset or document that cites a different quota is invalid; changing the
contract requires a dated amendment and approval.

**Evidence.** D6, D8, D27.

**Status effect.** Proposal; no effective amendment.

---

## DR-MC10R-03 — 2026-11-01 — Pricing: retain `n>=8`; classify unreachable cells; never reduce a threshold

**Context.** PI-03: EXP-MC10-04/05 require `n>=8` per applicable segment per construct while SEG-04
(max 7), SEG-05 (max 7), SEG-06 (max 5) and SEG-08 (max 6) cannot reach it.

**Decision.** Keep the registered `n>=8` unchanged. Classify SEG-04/05/06/08 pricing analyses
`BELOW_REGISTERED_MINIMUM` and restrict them to qualitative price objections. SEG-01/02/03/07 are
`REACHABLE_AT_PLANNED_MAX` only if 8 completed pricing-module interviews are actually achieved. In
Wave 1 only SEG-01 and SEG-03 can produce an experiment-level result and only at 8 completed
interviews; SEG-04/06 are qualitative only. Expanding a quota (option 1) remains available but is not
recommended for Wave 1. No price may be approved; approved prices remain 0.

**Rationale.** A threshold reduced to make a result reachable is post-hoc threshold manipulation. A
qualitative objection analysis is honest and useful without pretending to be a willingness-to-pay
measurement.

**Consequences.** (a) Four segments cannot produce EXP-MC10-04/05 experiment-level results. (b) All
pricing interpretations remain directional and non-representative. (c) A powered quantitative study
requires later separate authorization.

**Evidence.** D7, D27, `data/experiments.json`, `data/pricing-ladders.json`.

**Status effect.** No price approval; no threshold change.

**Addendum (MC-10R-F05 reconciliation).** The D7 matrix's `registeredPopulation` code is a
*reporting-view* attribute, while the D27 recovery contract's code is the *experiment-eligibility*
attribute. `MC10-GABOR-GRANGER.md` §6.1 reports SEG-07 and SEG-08 operator views separately and excludes
them from the registered 4-of-5 monotonicity rule, which is why D7 marks those EXP-MC10-04 cells
`NAMED_SEPARATE_VIEW`; the frozen `EXP-MC10-04` population does not name them as experiment subjects,
which is why D27 marks them `NOT_NAMED`. Both are correct for their own attribute, neither makes any cell
experiment-level eligible, and the canonical experiment-eligibility value is D27's. The distinction is
recorded in D7 §4.3 and in D27 `sourceNote` so a reader cannot mistake the descriptive view for a
registered experiment population.

---

## DR-MC10R-04 — 2026-11-01 — AUTH-MC10-001 rev 2 is prepared as a draft and remains NOT_GRANTED

**Context.** No external research authorization exists. The Master Prompt, a PR approval, an agent task
and a passing validator are not authorization. The programme needs a reviewable authorization record
so an owner can issue a real one without redesigning the study.

**Decision.** Prepare `AUTH-MC10-001` revision 2 as `DOCUMENT_STATUS = DRAFT_PREPARED`,
`AUTHORIZATION_STATUS = NOT_GRANTED`, `FIELDWORK_PERMISSION = FALSE`,
`EXTERNAL_CONTACT_ALLOWED = FALSE`, with all 30 numbered fields (31 flat keys; field 5 is compound) and
every missing human/legal value `null`/`OPEN`. Proposed Wave 1 scope: SEG-03 5–8, SEG-01 5–8, SEG-04
5–7, SEG-06 3–5 = 18–28; geography Rías Baixas / Galicia; Portugal excluded; incentives `ZERO` and
spending `ZERO` as proposals. Only a separately recorded, signed programme-owner authorization with
prerequisite evidence may later set `GRANTED`.

**Rationale.** A prepared-but-ungranted record removes the excuse that fieldwork cannot be authorized
because the paperwork is undefined, while preserving the hard gate.

**Consequences.** No outreach, contact, recruitment or interview may occur; the gate stays fail-closed.

**Evidence.** D13, D14, D29; `data/fieldwork-authorization.json`.

**Status effect.** `AUTH_MC10_001 = NOT_GRANTED`; `OUTREACH_AUTHORIZATION = NOT_GRANTED`;
`FIELDWORK_STATUS = BLOCKED`.

---

## DR-MC10R-05 — 2026-11-01 — Instrument amendment candidate v1.1.0 is review-required; v1.0.0 remains historical

**Context.** PI-04/PI-05 require IV-01…IV-09. The frozen v1.0.0 instruments are the historical authority
and may not be edited in place.

**Decision.** Produce `MC10R-INSTRUMENT-AMENDMENT-v1.1.0` with the nine amendments, previous/candidate
versions, reasons, source hash `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d`,
candidate hashes labelled non-effective, affected experiments, dependencies and approval state
`REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE`. Candidate ES/EN text is prepared; PT is a draft with
`QUALIFIED_REVIEW_NOT_OBTAINED`; no translation is represented as professionally reviewed or
equivalence-established. The historical v1.0.0 remains reconstructable.

**Rationale.** Fieldwork cannot use an instrument whose consent wording, exclusions and concept
identity are defective, but no agent can confer methodological or legal approval.

**Consequences.** No instrument may be administered until an authorized reviewer approves an effective
version; Portugal remains excluded.

**Evidence.** D9, D10, D11, D12, D28.

**Status effect.** No effective instrument change; fieldwork blocked.

---

## DR-MC10R-06 — 2026-11-01 — Canonical concept-ID mapping (IV-09)

**Context.** GUIDE-01 v1.0.0 uses concepts A–E while the comprehension contract uses seven machine
concept IDs.

**Decision.** The canonical mapping is A→`NAV`; B→`HUB` + `START` (rubric element);
C→`WATCH`, `PROTECT`; D→`INTEGRATED_SYSTEM` (rubric element); E→`FLEET`; candidate version `1.1.0`.
Historical scripts remain historical; no participant data is recoded (zero records exist).

**Rationale.** A single traceable mapping is required by the moderation guide, comprehension test,
price module, notes, experiment definitions, schema, analysis output and validator.

**Consequences.** Any reference using an undefined concept ID is invalid; the validator must reject
unknown IDs.

**Evidence.** D9, D11, D12; `data/concept-comprehension.json`; `MC10-CONCEPT-COMPREHENSION.md`.

**Status effect.** No research effect; traceability only.

---

## DR-MC10R-07 — 2026-11-01 — Three-layer secure data model; local synthetic tests only; no provisioning claim

**Context.** No secure research store exists; no participant data may enter Git.

**Decision.** Define Layer A (identity/consent), Layer B (research records) and Layer C (repository
outputs), with access matrix, encryption, retention, deletion, withdrawal propagation, backup, audit
logging, processors, export, breach response and a synthetic test plan. Implement local schemas and
synthetic deletion/withdrawal tests. Record `ARCHITECTURE_DEFINED = true`,
`LOCAL_SYNTHETIC_TESTS_PASS = true`; `PROVISIONED`, `ACCESS_REVIEWED`,
`OPERATIONALLY_APPROVED = false`.

**Rationale.** Designing and testing locally is possible and safe; claiming a provisioned, access-
reviewed, approved store would be false.

**Consequences.** Fieldwork still requires a real provisioned store and an access review; the synthetic
tests prove procedure logic, not security operation.

**Evidence.** D17–D20, D27, D30.

**Status effect.** No infrastructure approved; fieldwork blocked.

---

## DR-MC10R-08 — 2026-11-01 — Human interviewer model, zero invented people

**Context.** No interviewer panel, training or supervision exists.

**Decision.** Define roles (research owner, fieldwork lead, interviewers, data steward, qualitative
analyst, second coder, independent auditor), qualification criteria, the 16-module training, a synthetic
mock rubric, the operations kit, ES/EN recruitment templates and the Wave 1 plan. Every role is
`UNASSIGNED`, every interviewer `UNTRAINED`, every template `NOT_APPROVED`/`NOT_SENT`, every training
completion `NOT_PERFORMED`; no names, credentials, dates or appointments are invented.

**Rationale.** A complete manual is executable by a real competent human only after that human is
appointed and trained; the package must make that possible without pretending it has happened.

**Consequences.** Fieldwork cannot start until named humans accept roles and training is signed off.

**Evidence.** D21–D26.

**Status effect.** No human appointed or authorized.

---

## DR-MC10R-09 — 2026-11-01 — CR-62 strengthened additively for EN/ES/PT; heuristic limits documented

**Context.** MC-10 review F-10: CR-62 detects attributed narrative quotations but its lexical coverage
is English-centric and does not document its limits.

**Decision.** Extend CR-62 additively inside the same check with single/double/guillemet/curly quotation
characters, dash/hyphen/parenthetical/reverse-order attribution, EN/ES/PT role nouns and reporting
verbs, indirect speech and unattributed participant claims; preserve the 62-check count and all 96
negative tests; add real new tests including false-positive controls; document the heuristic's lexical
limits in the data-contract addendum and validator header. Do not claim that regex/heuristics prove the
absence of fabrication.

**Rationale.** Fabricated evidence must be harder to introduce in the languages the study actually uses,
without creating a false sense of completeness.

**Consequences.** New forms are rejected; residual limits are recorded and remain a human-review
responsibility.

**Evidence.** D31, D32, `scripts/check-marea-customer-research.mjs`, its test file, data-contract
addendum.

**Status effect.** No research effect; integrity gate strengthened.

---

## DR-MC10R-10 — 2026-11-01 — Two-gate validation: existing gate preserved, recovery gate added

**Context.** The existing research-integrity gate (62 checks) must not be weakened; recovery invariants
need their own deterministic gate.

**Decision.** Keep `scripts/check-marea-customer-research.mjs` at exactly 62 checks (CR-01…CR-62) and its
negative suite at ≥96 tests (preserved + extended). Add `scripts/check-marea-customer-recovery.mjs`
(CRR checks over D27–D30 and the deliverable inventory) and its negative suite
`scripts/check-marea-customer-recovery.test.mjs`. Add npm scripts `test:customer-recovery` and
`test:customer-recovery:unit` and the corresponding Prettier entries.

**Rationale.** A recovery gate that reused the research gate would couple the recovery state to
fieldwork validation and risk weakening both.

**Consequences.** Both gates must pass; counts are reported from actual runs, never declared.

**Evidence.** D31, D32, implementation evidence D20, delivery D35.

**Status effect.** No research effect; validation strengthened.

---

## DR-MC10R-11 — 2026-11-01 — Recovery PASS is valid alongside MC-10 BLOCKED and AUTH NOT_GRANTED

**Context.** MC-10R can fully complete its internal preparation while real research stays blocked.

**Decision.** Adopt the status model of D2 §2. The valid combination is
`MC10R = PASS_INTERNAL_PREPARATION_SCOPE`, `MC10 = BLOCKED`,
`AUTH_MC10_001 = NOT_GRANTED`, `OUTREACH_AUTHORIZATION = NOT_GRANTED`,
`FIELDWORK_STATUS = BLOCKED`, `FIELDWORK_READINESS = PARTIALLY_READY`. Validators accept this
combination and reject any reading of recovery PASS as fieldwork permission.

**Rationale.** Conflating internal preparation with external authorization is the exact defect MC-10R
exists to prevent.

**Consequences.** The Spanish executive report and delivery record must state both verdicts separately.

**Evidence.** D2, D27, D29, D30, D31, D34, D35.

**Status effect.** No authorization; no fieldwork.

---

## DR-MC10R-12 — 2026-11-01 — Programme numbering preserved; no MC-11 advance

**Context.** The programme has 36 milestones. MC-10R is a recovery of MC-10/36.

**Decision.** MC-10R is a recovery sub-stage of MC-10. The 36-prompt registry row 10 is updated with the
honest MC-10 BLOCKED state and the recovery evidence; no milestone 37 is created; MC-11 is neither
renumbered nor started. The delivery uses a stacked draft PR against the MC-10 branch, does not modify
PR #16 and does not merge.

**Rationale.** Recovery work must not consume a future milestone or silently merge the stacked chain.

**Consequences.** The programme remains at milestone 10 of 36 with fieldwork blocked.

**Evidence.** `MASTER-PROMPT-REGISTRY.md`, `DECISION-LOG.md`, D35.

**Status effect.** No programme renumbering; no merge/deploy.
