# MC-10R — Recovery execution plan (D2)

| Field | Value |
| --- | --- |
| Document ID | MC-10R / D2 / `MC10R-RECOVERY-EXECUTION-PLAN` |
| Programme | EMBARCARTE / MAREA |
| Milestone | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36) |
| Branch | `feature/marea-mc10r-fieldwork-recovery` |
| Base commit | `d1ac69a4873222fbde93dcf69c360a5e0ca1542d` (verified MC-10 HEAD) |
| Stacked PR target | `feature/marea-mc10-primary-customer-discovery` (PR #16 base branch; PR #16 is not modified) |
| Date | 2026-11-01 |
| Owner | `lead` (Research Recovery Program Director) |
| Recovery work status | `IN_PROGRESS` |
| External authorization status | `NOT_GRANTED` |
| Fieldwork readiness | `PARTIALLY_READY` (target after this recovery package) |
| Document status | `DRAFT` until the delivery commit; becomes the baseline record of the recovery |

## 1. Purpose and binding truth

MC-10 was correctly blocked: no external research authorization exists. MC-10R does not convert that
block into a research pass. It removes the internal planning, governance, instrument, infrastructure and
operational defects that would otherwise block legitimate fieldwork **after** a real authorization is
issued.

The binding truth at the start of MC-10R is preserved in full by `MC10R-BASELINE-AND-SCOPE.md` (D1).
The short form:

```
MC10_STATUS                  = BLOCKED
MC10_WAVE0_PREPARATION       = PASS_INTERNAL_SCOPE
AUTH_MC10_001                = NOT_GRANTED
OUTREACH_AUTHORIZATION       = NOT_GRANTED
FIELDWORK_STATUS             = BLOCKED
PARTICIPANTS / INTERVIEWS / VALID_CASES / PRICE_RESPONSES / EXPERIMENTS / PRODUCTS / BUNDLES = 0
TRADEMARK_LEGAL_CLEARANCE    = NOT_GRANTED
SOURCE_IP_CLEARANCE          = NOT_CLEARED
PRODUCT_SALES                = BLOCKED
COMMERCIAL_PUBLICATION       = BLOCKED
PRODUCTION_DEPLOYMENT        = NOT_AUTHORIZED
PROFITABILITY                = NOT_ESTABLISHED
PILOT_SAFETY_GATE            = BLOCKED
APPROVED_PRICES              = 0
ORDERABLE_PRODUCTS           = 0
```

A draft approval record is not an approval. A storage design is not a provisioned store. A training
manual is not a trained interviewer. A template is not an invitation sent. A schema is not participant
evidence. No agent may perform external outreach, collect personal data, spend money, deploy, merge,
publish or invent research findings during MC-10R.

## 2. Recovery status model (binding for every recovery document and validator)

Recovery work status: `NOT_STARTED`, `IN_PROGRESS`, `PARTIAL`, `READY_FOR_OWNER_REVIEW`,
`PASS_INTERNAL_PREPARATION_SCOPE`, `BLOCKED`, `FAIL`.

External authorization status: `NOT_GRANTED`, `DRAFT_PREPARED`, `PENDING_APPROVAL`, `GRANTED`,
`EXPIRED`, `REVOKED`. `DRAFT_PREPARED` is a document-preparation state, never permission to contact
anyone.

Fieldwork readiness: `NOT_READY`, `PARTIALLY_READY`, `READY_PENDING_AUTHORIZATION`,
`AUTHORIZED_NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`, `BLOCKED`.

Document / amendment status: `DRAFT`, `REVIEW_REQUIRED`, `PROPOSED_NOT_EFFECTIVE`,
`APPROVED_FOR_FUTURE_FIELDWORK`, `SUPERSEDED`, `REJECTED`. Legal/privacy documents:
`DRAFT_FOR_LEGAL_REVIEW`, `LEGAL_REVIEW_PENDING`, `APPROVED`, `REJECTED`. Only real, recorded human or
qualified-professional review can produce an `APPROVED` state; no agent may confer it.

Storage evidence states are separate and must not be conflated: `ARCHITECTURE_DEFINED`,
`LOCAL_SYNTHETIC_TESTS_PASS`, `PROVISIONED`, `ACCESS_REVIEWED`, `OPERATIONALLY_APPROVED`.

The valid end state of this recovery is:

```
MC10R                        = PASS_INTERNAL_PREPARATION_SCOPE (only if all internal criteria pass)
MC10                         = BLOCKED
AUTH_MC10_001                = NOT_GRANTED
OUTREACH_AUTHORIZATION       = NOT_GRANTED
FIELDWORK_STATUS             = BLOCKED
FIELDWORK_READINESS          = PARTIALLY_READY
```

Validators must accept this combination and must reject any recovery PASS that is read as fieldwork
permission.

## 3. Canonical registration — the single source for every MC-10R artifact

Every agent, document and structured record must use the values in this section. No agent may invent an
alternative identifier, version, quota or status.

### 3.1 Canonical identifiers and versions

| Key | Canonical value |
| --- | --- |
| Recovery contract id | `MAREA-MC10R-CUSTOMER-DISCOVERY-RECOVERY` |
| Recovery contract version | `1.0.0` |
| Sampling plan candidate | `MC10R-SAMPLING-1.1.0-PROPOSED` |
| Segment quota contract candidate | `MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED` |
| Instrument amendment package | `MC10R-INSTRUMENT-AMENDMENT-v1.1.0` |
| Candidate instrument version | `1.1.0` |
| Historical effective instrument version | `1.0.0` (frozen, source hash `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d`) |
| Candidate consent instrument | `CONSENT-01` v`1.1.0` (proposed; not approved) |
| Analysis codebook candidate | `ANA-01` v`1.1.0` (proposed; not approved) |
| Authorization record | `AUTH-MC10-001`, revision `2` |
| Authorization document status | `DRAFT_PREPARED` |
| Authorization status | `NOT_GRANTED` |
| Proposed fieldwork geography (Wave 1) | Rías Baixas / Galicia (Spain only) |
| Proposed incentives | `ZERO` (proposal, not approved) |
| Proposed research spending | `ZERO` (proposal, not approved) |
| Programme date | `2026-11-01` |

### 3.2 Segment identifiers (canonical, never redefined)

| Segment | Canonical name |
| --- | --- |
| SEG-01 | Recreational motorboat owners |
| SEG-02 | Sailing yacht owners |
| SEG-03 | Marina-based unattended-vessel owners |
| SEG-04 | Marine electronics installers |
| SEG-05 | Marine retailers and chandlers |
| SEG-06 | Marina or shipyard operators |
| SEG-07 | Charter operators and sailing schools |
| SEG-08 | Fleet managers |

### 3.3 Sampling reconciliation (candidate, proposed, not effective)

Preserved historical per-segment quotas (immutable reference, v1.0.0):

| Segment | Minimum | Maximum |
| --- | ---: | ---: |
| SEG-01 | 5 | 8 |
| SEG-02 | 5 | 8 |
| SEG-03 | 5 | 8 |
| SEG-04 | 5 | 7 |
| SEG-05 | 5 | 7 |
| SEG-06 | 3 | 5 |
| SEG-07 | 5 | 8 |
| SEG-08 | 4 | 6 |
| **Total** | **37** | **57** |

The historical programme planning target `40–80` is **not derivable** from this table. Canonical
proposed resolution (decision DR-MC10R-01, status `PROPOSED_NOT_EFFECTIVE`):

1. The per-segment quotas remain the authoritative completion requirements, preserving minimum 37 and
   the achievable envelope maximum 57.
2. The authoritative candidate overall target becomes **37 minimum / 57 maximum** completed interviews
   across the eight canonical segments.
3. The `40–80` figure is preserved as a historical planning aspiration (`HISTORICAL_PLANNING_ASPIRATION`)
   that cannot be met at its upper end under the preserved segment maxima; moving to it requires a
   separate, approved quota-expansion amendment (Option B) that is not recommended for Wave 1.
4. The study is staged as a sequential multi-wave design (Option C): Wave 1 exploratory pilot 18–28,
   Wave 2 main study completing the full eight-segment minimum of 37 (ceiling 57), Wave 3 optional
   extension only under an approved amendment.
5. No first wave may be presented as satisfying the full study, the experiment minimums or the MC-10
   acceptance criteria.

Proposed Wave 1 scope (experimental pilot, not the full study):

| Segment | Minimum | Maximum |
| --- | ---: | ---: |
| SEG-01 | 5 | 8 |
| SEG-03 | 5 | 8 |
| SEG-04 | 5 | 7 |
| SEG-06 | 3 | 5 |
| **Wave 1 total** | **18** | **28** |

### 3.4 Pricing feasibility policy (candidate)

`EXP-MC10-04` (Gabor-Granger) and `EXP-MC10-05` (Van Westendorp) retain their registered minimum
`n >= 8` per applicable segment per construct. The minimum is never reduced to obtain a PASS. Canonical
classification:

| Segment | Planned max | Registered n | Reachability |
| --- | ---: | ---: | --- |
| SEG-01 | 8 | 8 | `REACHABLE_AT_PLANNED_MAX` |
| SEG-02 | 8 | 8 | `REACHABLE_AT_PLANNED_MAX` |
| SEG-03 | 8 | 8 | `REACHABLE_AT_PLANNED_MAX` |
| SEG-04 | 7 | 8 | `BELOW_REGISTERED_MINIMUM` (qualitative price objections only) |
| SEG-05 | 7 | 8 | `BELOW_REGISTERED_MINIMUM` (qualitative price objections only) |
| SEG-06 | 5 | 8 | `BELOW_REGISTERED_MINIMUM` (qualitative price objections only) |
| SEG-07 | 8 | 8 | `REACHABLE_AT_PLANNED_MAX` |
| SEG-08 | 6 | 8 | `BELOW_REGISTERED_MINIMUM` (qualitative price objections only) |

For Wave 1 this means only SEG-01 and SEG-03 can accumulate the eight completed pricing-module
interviews that their cell requires, and even then only as a **segment-level stated-preference
indication** (`WAVE1_PRICING_INDICATION_ONLY`). No EXP-MC10-04 or EXP-MC10-05 experiment verdict may be
issued in Wave 1: the registered experiment populations include SEG-02, SEG-07 and SEG-08, which are
not fielded in Wave 1, so every experiment verdict is `PENDING_WAVE2`. SEG-04 and SEG-06 are
qualitative-pricing only. A quantitative willingness-to-pay study remains a later, separately
authorized stage. No price may be approved.

**Registered-population nuance (D7 refinement of DR-MC10R-03).** The matrix must classify each
`segment × experiment × construct` cell, not only each segment. The frozen MC-09 records name their
own populations: EXP-MC10-04 names sailing/motorboat/marina-based owners and installers as an
intermediary resale variant; EXP-MC10-05 names B2C owners plus charter and fleet managers. Therefore
`BELOW_REGISTERED_MINIMUM` is necessary but not always sufficient: SEG-05 and SEG-06 are not named in
either registered pricing population and are additionally `NOT_APPLICABLE` for EXP-MC10-04/05;
SEG-04 applies only to the EXP-MC10-04 intermediary resale variant; SEG-08 applies only to
EXP-MC10-05. The recovery contract and validator record both the reachability class and the
experiment-specific population code, and no cell may be reported as an experiment-level pricing
result unless it is both population-eligible and reachable at n>=8.

### 3.5 Instrument amendment policy (candidate)

- v1.0.0 remains the historical frozen version; its provenance and hash are preserved and may never be
  edited in place.
- The amendment package `MC10R-INSTRUMENT-AMENDMENT-v1.1.0` carries IV-01 … IV-09 with previous
  version, candidate version, exact change, reason, source hash, candidate hash, affected experiments,
  translation/legal dependencies, approval state and effective date.
- Candidate status is `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE`. Only a real authorized reviewer can
  later confer `APPROVED_FOR_FUTURE_FIELDWORK`.
- No translation (ES, EN, PT) is represented as professionally reviewed or equivalence-established.
  Candidate and proposed translations keep their real review state (`NOT_REVIEWED`,
  `QUALIFIED_REVIEW_NOT_OBTAINED`, `EQUIVALENCE_NOT_ESTABLISHED`).

### 3.6 Concept-ID reconciliation (candidate mapping, IV-09)

| sourceConceptId (GUIDE-01 v1.0.0) | effectiveResearchConceptId | referencedFamilyOrBundle | Version |
| --- | --- | --- | --- |
| A — navigation and onboard data | `NAV` | NAV family / START, CRUISE | `1.1.0` |
| B — traffic awareness | `HUB` + `START` (rubric element) | HUB, AIS family / START | `1.1.0` |
| C — unattended vessel monitoring | `WATCH`, `PROTECT` | WATCH family / PROTECT | `1.1.0` |
| D — steering assistance | `INTEGRATED_SYSTEM` (rubric element) | PILOT/HUB integration / COMPLETE | `1.1.0` |
| E — fleet operations | `FLEET` | FLEET family / FLEET | `1.1.0` |

The seven machine concept ids of `data/concept-comprehension.json` are `NAV`, `WATCH`, `PROTECT`, `HUB`,
`START`, `INTEGRATED_SYSTEM`, `FLEET`. Historical v1.0.0 scripts are preserved as historical records and
are never silently recoded.

### 3.7 Authorization draft (candidate, ungranted)

`AUTH-MC10-001` revision 2 is prepared as `DRAFT_PREPARED` with `AUTHORIZATION_STATUS = NOT_GRANTED`,
`FIELDWORK_PERMISSION = FALSE`, `EXTERNAL_CONTACT_ALLOWED = FALSE`. Authorizer, signature, date, expiry,
fieldwork lead, controller identity, privacy contact, approved storage, legal-review reference and
interviewer roster remain `null`/`OPEN` because no real value exists. The Master Prompt, a PR approval,
a passing validator and an agent's inference are explicitly not authorization. The full 30-field
proposal is D13 and `data/mc10r-authorization-draft.json` (D29).

### 3.8 Legal, privacy and infrastructure states

- Controller identity: `OPEN` (no legal entity verified; the commercializer name is not proof).
- Privacy contact: `OPEN` (no verified contact; must not be invented).
- Legal review: `LEGAL_REVIEW_PENDING`; documents `DRAFT_FOR_LEGAL_REVIEW`.
- Consent design: proposed; `CONSENT-01` v1.1.0 candidate; not approved.
- Secure storage: `ARCHITECTURE_DEFINED = true`, `LOCAL_SYNTHETIC_TESTS_PASS = true` (after the D20
  evidence run), `PROVISIONED = false`, `ACCESS_REVIEWED = false`, `OPERATIONALLY_APPROVED = false`.
- Human interviewers: roles and materials prepared; zero humans assigned, trained, or authorized.
- Retention/deletion: procedure designed and synthetically tested; no operational store exists.

### 3.9 Validator architecture (two gates, no weakening)

1. **Existing research-integrity gate** — `scripts/check-marea-customer-research.mjs` keeps its exact
   62 checks `CR-01` … `CR-62`. CR-62 is strengthened **inside** the same check with additive
   multilingual (EN/ES/PT) narrative-attribution rules, additional quotation characters, role nouns and
   reporting verbs. The check count remains 62; the existing 96 negative tests are preserved and the
   suite grows with real new tests. No existing test may be removed to make the suite pass.
2. **New recovery gate** — `scripts/check-marea-customer-recovery.mjs` validates the recovery contract
   (D27), amendment registry (D28), authorization draft (D29), fieldwork readiness (D30) and the D1–D36
   deliverable set. Its check ids are `CRR-01` …; the exact count is whatever the implemented run
   reports (never pre-declared). `scripts/check-marea-customer-recovery.test.mjs` is the negative
   mutation / adversarial suite for that gate.

The recovery gate must reject at least the invariants in section 5 of the Master Prompt: quota
arithmetic inconsistencies, unreachable pricing presented as reachable, unapproved amendments marked
effective, `GRANTED` without evidence, outreach with a closed gate, recovery PASS read as fieldwork
permission, participant data in the repository, invalid consent transitions, untrained interviewer
represented as authorized, and missing expiry/scope/controller fields.

## 4. Team, ownership and exclusive write scopes

The team shares one checkout and has no filesystem locks. Each writer owns exactly one directory; only
the Lead writes shared registries, `package.json`, execution docs and Git.

| Member | Role | Exclusive write scope | Deliverables |
| --- | --- | --- | --- |
| `lead` | Research Recovery Program Director | `docs/marea/customer-discovery/recovery/` root documents (D1–D4, D34–D36), `docs/marea/execution/**`, `package.json`, Git operations, final integration | D1, D2, D3, D4, D34, D35, D36 |
| `agent-a-methodologist` | Senior Qualitative Research Methodologist + Sampling/Experimental Design | `docs/marea/customer-discovery/recovery/methodology/` | D5, D6, D8 |
| `agent-b-pricing` | Pricing and Behavioral Research Economist | `docs/marea/customer-discovery/recovery/pricing/` | D7 |
| `agent-c-governance` | Research Ethics, Privacy and Governance Specialist | `docs/marea/customer-discovery/recovery/governance/` | D13, D14, D15, D16 |
| `agent-d-fieldwork` | Human Interviewer Training and Fieldwork Manager + Marine Recruitment Operations | `docs/marea/customer-discovery/recovery/fieldwork/` | D21, D22, D23, D24, D25, D26 |
| `agent-e-instruments` | Research Instrument and Linguistic Specialist | `docs/marea/customer-discovery/recovery/instruments/` | D9, D10, D11, D12 |
| `agent-f-data` | Research Data Security and Integrity Engineer | `docs/marea/customer-discovery/recovery/data/`, `scripts/check-marea-customer-recovery*.mjs` | D17–D20, D27–D32 |
| `agent-g-auditor` | Independent Research Quality Auditor | `docs/marea/customer-discovery/recovery/review/` | D33 (spawned only after the implementation commit exists) |

No member may write another member's files. No member may run Git write commands. The Lead owns the
CR-62 extension inside `scripts/check-marea-customer-research.mjs` and its test file, the clearly marked
MC-10R addendum appended to `docs/marea/customer-discovery/data-contract/MC10-DATA-CONTRACT.md`, and
`package.json`; no existing clause or test may be weakened.

## 5. Workstreams

| ID | Workstream | Owner | Main outputs | Acceptance |
| --- | --- | --- | --- | --- |
| W-A | PI-01 sampling arithmetic reconciliation | A | D5 | Every quota occurrence traced; totals recomputed; options A/B/C compared; recommendation marked proposed; historical original preserved |
| W-B | PI-02 single segment-quota contract | A | D6 | All 15 contract fields per segment; ambiguity classes separated; versioned; `PROPOSED_NOT_EFFECTIVE` |
| W-C | PI-03 pricing feasibility | B | D7 | Segment × experiment × construct × n matrix; unreachable cells explicitly classified; no threshold lowered |
| W-D | Research-protocol amendment | A | D8 | Dated amendment binding PI-01/PI-02 decisions; PI-05 recorded as an instrument-scope boundary (D9-D12), not silently absorbed into the sampling amendment; wave sequence; approval state explicit |
| W-E | IV-01 … IV-09 instrument amendments | E | D9, D10, D11, D12 | Nine dated amendments; ES/EN candidate text; PT review package; v1.0.0 retained; candidate hashes labelled non-effective |
| W-F | Authorization rev 2 + gate | C | D13, D14 | 30 fields present; ungranted; fail-closed gate; release decision table |
| W-G | Legal/privacy review package | C | D15, D16 | GDPR/LOPDGDD/Lei 58/2019 analysis; controller OPEN; consent/retention; `DRAFT_FOR_LEGAL_REVIEW` |
| W-H | Secure data infrastructure + synthetic evidence | F | D17–D20, D27–D30 | Three-layer model; access/retention/deletion; local synthetic tests; not provisioned |
| W-I | Human interviewer operations and Wave 1 | D | D21–D26 | Roles, training, kit, ES/EN templates, Wave 1 plan, checklist; zero invented humans/sessions |
| W-J | Recovery validator + adversarial tests | F | D31, D32 | Deterministic gate over D27–D30 and deliverable inventory; negative mutations rejected |
| W-K | Independent audit | G | D33 | Findings classified; blocking findings closed and re-verified |

## 6. Sequencing and dependencies

```
Lead baseline + D2 (canonical registration)
  ├─ A: D5 → D6 → D8
  ├─ B: D7 (reads D5/D6 candidate code)                     ┐
  ├─ C: D13/D14/D16 → D15                                   │
  ├─ D: D21/D22/D23 → D26; D24; D25                         ├─ F: D17–D20, D27–D30
  ├─ E: D9 → D10 → D11 → D12                                ┘   then D31/D32 + CR-62 extension
  └─ Lead: D1, D3, D4, D34–D36, registry, package.json
F integrates after A–E documents exist, then Lead runs gates and commits.
Lead commits implementation → spawn G → G writes D33 → Lead corrects → Lead commits final → push → PR.
```

F is allowed to start the architecture/contract/validator skeleton immediately, but must reconcile the
contract against the final A–E documents before reporting. If a dependency is missing, F records it and
does not invent the value.

## 7. Git and delivery rules

1. Only the Lead performs Git writes: branch creation (done), commits, push and PR creation.
2. No merge, no force-push, no deployment, no modification of PR #16, no rewrite of MC-09/MC-10 history.
3. Change scope is limited to `docs/marea/customer-discovery/recovery/**`, the two new scripts, the
   additive CR-62 extension in the existing validator/test/data-contract, `docs/marea/execution/**`
   registry and decision log additions, and `package.json` recovery script entries plus Prettier lists.
4. No `src/`, `public/`, `deploy/`, product/bundle contract, price, route, i18n dictionary or dependency
   change. No indexed page, checkout, lead form or commercial claim change.
5. Commit sequence: (a) implementation of D1–D32 + validator, (b) independent review D33 + corrections,
   (c) delivery D34–D36 + registry/decision-log closure.
6. The stacked draft PR targets `feature/marea-mc10-primary-customer-discovery`; PR #16 remains
   untouched.

## 8. Non-negotiable prohibitions

- No external contact of any kind, no emails, calls, messages, invitations, recruitment or advertising.
- No participant, candidate or contact data collected, stored or fabricated; synthetic fixtures only,
  clearly labelled `TRAINING_SYNTHETIC_NOT_RESEARCH`.
- No invented authorizer, legal opinion, controller identity, privacy contact, interviewer, training
  completion, appointment, storage provisioning, deployment, quote, price approval or research result.
- No threshold, quota, consent requirement or commercial restriction weakened to obtain a PASS.
- No new dependency, no network call, no cloud service selected or configured.
- No claim that a heuristic text scan proves the absence of fabricated evidence.
- No advance to MC-11 and no renumbering of the 36-prompt programme.

## 9. Definition of done

MC-10R may be reported as `PASS_INTERNAL_PREPARATION_SCOPE` only when: D1–D33 exist and are consistent;
the recovery validator and its negative suite pass with recorded real counts; the existing
research-integrity gate still reports 62/62 and its negative suite preserves and extends 96 tests; the
existing regression gates pass; the authorization draft is complete and ungranted; the independent
auditor has closed every blocking finding with re-verification; the registry and decision log are
updated without renumbering; the remote stacked draft PR, remote HEAD and base branch are verified; and
no prohibition in section 8 was violated.

`MC10R PASS_INTERNAL_PREPARATION_SCOPE` never means MC-10 primary research PASS, legal sign-off,
authorization granted, interviewer trained, store provisioned or participant contacted.
