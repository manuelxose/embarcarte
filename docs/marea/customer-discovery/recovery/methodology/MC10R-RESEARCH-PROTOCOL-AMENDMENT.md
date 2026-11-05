# MC-10R — Research-protocol amendment (D8)

| Field | Value |
| --- | --- |
| Document ID | MC-10R / D8 / `MC10R-RESEARCH-PROTOCOL-AMENDMENT` |
| Recovery contract | `MAREA-MC10R-CUSTOMER-DISCOVERY-RECOVERY` version `1.0.0` |
| Previous protocol version | `MC10-RESEARCH-PROTOCOL.md` version `1.0.0` (MC-10 / D4) — the historical authority |
| Candidate sampling plan | `MC10R-SAMPLING-1.1.0-PROPOSED` |
| Candidate segment-quota contract | `MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED` |
| Decision referenced | `DR-MC10R-01` (`MC10R-RECOVERY-EXECUTION-PLAN.md` §3.3) |
| Milestone | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36) |
| Workstream | W-D — research-protocol amendment (PI-01, PI-02, wave sequencing, experiment reachability) |
| Document / amendment status | `PROPOSED_NOT_EFFECTIVE` |
| Workstream status | `READY_FOR_OWNER_REVIEW` |
| Effective date | **null — not approved, not effective** |
| Date | 2026-11-01 |
| Owner | `agent-a-methodologist` — Senior Qualitative Research Methodologist + Sampling/Experimental Design (design only) |
| Scope | A dated, clause-by-clause amendment record binding the PI-01/PI-02 sampling constants, the sampling-wave sequence and per-experiment reachability, without altering any experiment hypothesis, threshold, consent requirement or instrument text. |
| Is not | An approved protocol version, fieldwork authorization, instrument amendment, participant evidence or a claim that any wave was executed |

> **STATUS: `PROPOSED_NOT_EFFECTIVE` — NOT APPROVED — NOT IN FORCE.**
> `MC10-RESEARCH-PROTOCOL.md` v1.0.0 remains the historical authority. No protocol version has been
> superseded, no effective date exists, and no fieldwork is permitted: `AUTH-MC10-001 = NOT_GRANTED`,
> `FIELDWORK_STATUS = BLOCKED`, participants/interviews/price responses = 0. The only `APPROVED` state
> named in this record is a future state that requires a real recorded programme-owner approval and
> independent review; it has not occurred and cannot be conferred by an agent, a validator pass or a pull
> request.

## 0. Reading rules

1. **Previous version preserved.** `MC10-RESEARCH-PROTOCOL.md` v1.0.0 is neither edited nor replaced by
   this file. Its frozen source hash at the time of this record is
   `8bd22dc1d89bb4281230a066b7d65678cac61dbd4b046d6392352b0e466286a1` (computed in §9).
2. **Candidate, not effective.** Every changed clause below is a proposal. The words "candidate" and
   "proposed" are load-bearing; no clause in this record is binding on any real fieldwork.
3. **No threshold or hypothesis change.** The ten frozen experiment records in `data/experiments.json`
   (SHA-256 per record) are untouched. This amendment may not and does not reword them.
4. **No instrument change.** Instrument text, ordering, consent permissions and translations are owned by
   the instrument amendment package `MC10R-INSTRUMENT-AMENDMENT-v1.1.0` (D9–D12). This record does not
   edit any instrument and does not represent any translation review as completed.
5. **No quota number change.** The per-segment values are numerically unchanged (D5, D6); only their
   meaning, version and overall target are proposed to change.
6. **No execution claim.** Nothing here states or implies that a wave, an experiment or an interview
   occurred.

## 1. What this amendment binds, and what it does not

### 1.1 Binds (as a candidate)

- **PI-01** — sampling arithmetic: the overall completion requirement becomes 37 minimum / 57 maximum;
  `40–80` is reclassified as `HISTORICAL_PLANNING_ASPIRATION` (D5).
- **PI-02** — segment-quota ambiguity: one authoritative segment contract at
  `MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED` replaces the three conflicting v1.0.0 readings (D6).
- **Wave sequencing** — the study uses three sampling waves: `Wave 1` (exploratory, 18–28), `Wave 2`
  (main study completing 37 minimum / 57 maximum) and `Wave 3` (optional extension by separately
  approved amendment). Canonical machine ids are `WAVE-1`, `WAVE-2` and `WAVE-3`.
- **Experiment reachability** — which registered experiment minimums can be met at which wave and segment,
  and which cannot be met at all under the preserved quotas (§4).

### 1.2 Does not bind

- Experiment hypotheses, minimum-evidence wording, decision thresholds, confounders or interpretation
  rules — frozen and out of scope.
- Instrument wording, ordering, consent text, languages, translation review — owned by D9–D12.
- Authorization, controller, legal review, storage, interviewers or training — owned by other workstreams
  and by the programme owner.
- The 36-milestone programme, the MC-10/MC-11 numbering, or any product, bundle, price or publication
  status.

### 1.3 Scope-boundary finding (reported to the Lead)

D2 §5 (W-D) describes this workstream as binding "PI-01/PI-02/PI-05 decisions". PI-05 is the owner-side
*instrument* gap set (missing monitoring incident question, exclusion-first ordering, concept-set
alignment), carried by amendments IV-07…IV-09 and the instrument package D9–D12, not by a sampling
protocol change. This record therefore binds PI-01, PI-02 and the wave/reachability clauses, and records
PI-05 as an external dependency. It does not silently extend its own authority over instrument text. The
programme owner should confirm the boundary; if PI-05 is meant to be bound here, the instrument package
must supply the exact clause text and this record must be revised before approval.

## 2. Version registration

| Item | Value |
| --- | --- |
| Previous version | `MC10-RESEARCH-PROTOCOL.md` v1.0.0, MC-10 / D4, status `PREREGISTERED — NOT_EXECUTED — FIELDWORK BLOCKED` |
| Previous version hash | `8bd22dc1d89bb4281230a066b7d65678cac61dbd4b046d6392352b0e466286a1` (§9) |
| Candidate amendment record | `MC10R-RESEARCH-PROTOCOL-AMENDMENT` (this document), bound to `MC10R-SAMPLING-1.1.0-PROPOSED` |
| Candidate status | `PROPOSED_NOT_EFFECTIVE` |
| Candidate effective date | null |
| Approval present | **no** |
| Approval required | programme owner's recorded approval plus independent review, and a new frozen protocol version under v1.0.0 §11.2 |
| Supersession | none; v1.0.0 remains the historical authority |

**Registered-identifier gap, reported rather than filled.** D2 §3.1 registers a sampling-plan candidate
(`MC10R-SAMPLING-1.1.0-PROPOSED`) and a segment-quota contract candidate, but **no candidate protocol
version identifier**. D2 §3 forbids inventing an alternative identifier or version, so this record does
not invent one: the amended clause text is carried under the registered sampling-plan candidate, and a
future approved text would receive its dated protocol version only through the v1.0.0 §11.2 amendment
procedure. The programme owner should register a protocol candidate id if a distinct one is required.

## 3. Amendment register — exact changed clauses

Each clause names the previous value, the candidate value, the reason, the affected experiments, the
dependencies, the approval state and the effective date. All candidate values are
`PROPOSED_NOT_EFFECTIVE`; no effective date exists for any of them.

### AM-01 — §2 total row: 40–80 → 37 minimum / 57 maximum

- **Previous (v1.0.0):** §2 table total row reads `Total planned (as stated in the contract)` = `40–80`,
  with the note that the quotas sum to 37 minimum / 57 maximum and that the discrepancy is registered but
  unresolved.
- **Candidate:** the total row states `37 minimum / 57 maximum completed interviews` derived from the eight
  per-segment values, and immediately below it a preserved-history note states that `40–80` is retained as
  `HISTORICAL_PLANNING_ASPIRATION` and is not a completion requirement.
- **Reason:** PI-01 — 80 > 57 and 40 > 37; the aspiration is not derivable from the table (D5 §3).
- **Affected experiments:** all ten inherit the denominator/total language; none of their thresholds changes.
- **Dependencies:** D5; D6 totals; owner approval.
- **Approval state:** not approved. **Effective date:** none.

### AM-02 — §2 and §15.1/§15.2: one quota reading

- **Previous (v1.0.0):** §2 table is binding, but the plan-summary sentence `minimum 5, target 8
  (operators/retailers minimum 3)` and the registry phrase `target 8–10` remain live alternative readings;
  §15.1 and §15.2 record the conflict without resolution.
- **Candidate:** §2 points to the single authoritative contract `MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED` once
  effective; the segment target is defined as the segment's preserved maximum; `target 8` and `8–10` are
  recorded as descriptive v1.0.0 language and are not authoritative readings. §15.1 and §15.2 are marked
  "resolved by this amendment subject to approval", with the historical text preserved.
- **Reason:** PI-02 — three conflicting minimum/target readings; a segment must not be silently redefined.
- **Affected experiments:** EXP-MC10-01 (target phrase), EXP-MC10-03 (`n=5-10` phrase); thresholds unchanged.
- **Dependencies:** D6; owner approval; D27 dataset alignment by `agent-f-data`.
- **Approval state:** not approved. **Effective date:** none.

### AM-03 — §3.5/§15.3: pricing eligibility classification

- **Previous (v1.0.0):** §15.3 records that the `n ≥ 8` pricing minimum is unreachable for SEG-04, SEG-05,
  SEG-06 and SEG-08 under the preserved quotas, and that those analyses must be reported
  `BELOW_REGISTERED_MINIMUM`; the text is a defect note, not a registered classification.
- **Candidate:** §3.5 adds an explicit per-segment classification —
  `REACHABLE_AT_PLANNED_MAX` for SEG-01, SEG-02, SEG-03, SEG-07 and `BELOW_REGISTERED_MINIMUM` for SEG-04,
  SEG-05, SEG-06, SEG-08 — and states that the registered minimum is never reduced, that a
  `BELOW_REGISTERED_MINIMUM` segment yields qualitative price objections only, and that no price may be
  approved.
- **Reason:** PI-03 — a compliant pricing result is unreachable for four segments; the honest class must be
  machine-registrable.
- **Affected experiments:** EXP-MC10-04, EXP-MC10-05 (and the pricing module of any interview).
- **Dependencies:** D7 (pricing feasibility matrix, owner `agent-b-pricing`); D6 field 8; owner approval.
- **Approval state:** not approved. **Effective date:** none.

### AM-04 — §4: sampling-wave sequence, without renumbering W0–W4

- **Previous (v1.0.0):** §4 defines the experiment-sequence waves W0–W4 only. The sampling plan has no
  sampling-wave structure; every segment is a single undifferentiated quota target.
- **Candidate:** §4 gains a **sampling-wave** supplement —
  `Wave 1` exploratory, SEG-01 (5–8), SEG-03 (5–8), SEG-04 (5–7), SEG-06 (3–5), range 18–28;
  `Wave 2` main study completing the full eight-segment minimum 37 (ceiling 57), including
  Wave-1 credit; `Wave 3` optional extension only under a separately approved amendment.
  The supplement adds the rule that **no sampling wave may be presented as satisfying the full study, the
  experiment minimums or the MC-10 acceptance criteria**, and that Wave 1 is exploratory.
- **Reason:** D2 §3.3 items 4–5 (`DR-MC10R-01`); it sequences the preserved quotas without changing one.
- **Affected experiments:** none directly; wave placement changes when each experiment's segments can
  reach their minimum (see §4 of this record).
- **Dependencies:** D5 (18/28 arithmetic), D6 (`waves[]` field); owner approval.
- **Approval state:** not approved. **Effective date:** none.

**Terminology collision, reported rather than resolved by preference.** D2 §3.3 calls the sampling waves
"Wave 1/2/3", while the protocol's `W0`–`W4` are experiment-sequence waves. Two different taxonomies with
the same word would be a defect. This record therefore uses `Wave 1/2/3` for the sampling waves
and maps them explicitly; it does **not** renumber, rename or extend the protocol's W0–W4, and it does not
create a fifth protocol wave. The mapping is:

| D2 §3.3 label | Canonical wave id in this record | Relationship to protocol W0–W4 |
| --- | --- | --- |
| "Wave 1 exploratory pilot 18–28" | `WAVE-1` | executes part of the W1 experiment set (EXP-MC10-01, -02, -06, -10 content) for its four segments; it is not W2 or W3 |
| "Wave 2 main study completing 37 (ceiling 57)" | `WAVE-2` | exercises W1 content for the remaining segments and the W2/W3 experiments whose segment minima the quotas can reach |
| "Wave 3 optional extension" | `WAVE-3` | outside W0–W4; requires a separately approved amendment |

### AM-05 — §15.8: defect status

- **Previous (v1.0.0):** §15.8 records the quota-total arithmetic as an unresolved inconsistency; its
  closure requires either a recorded planning-envelope reading or a dated quota amendment.
- **Candidate:** §15.8 is retained as the historical statement and gains a resolution pointer: the dated
  amendment is this record, the completion requirement is 37/57, and `40–80` is preserved as
  `HISTORICAL_PLANNING_ASPIRATION`. Its status becomes "resolved by amendment, subject to owner approval".
- **Reason:** PI-01 resolution requirement in `data/research-status.json`.
- **Affected experiments:** all ten inherit the corrected aggregate language; thresholds unchanged.
- **Dependencies:** D5; D6; owner approval.
- **Approval state:** not approved. **Effective date:** none.

### AM-06 — §12: gate reinforcement for wave-staged fieldwork

- **Previous (v1.0.0):** the §12 pre-fieldwork gate is fail-closed for the first invitation; the gate is
  closed (4 items `COMPLETE`, 13 not complete).
- **Candidate:** §12 adds two fail-closed rules for the wave-staged design: (a) no sampling wave may begin
  unless `AUTH-MC10-001` is granted with a volume that covers that wave and every prior gate item is
  `COMPLETE`; (b) a wave's completion counts are reported per wave and may never be summed into a full
  study claim unless the full 37/57 requirement is met. The existing 17 gate items and their states are
  unchanged; nothing is marked complete by this amendment.
- **Reason:** D2 §3.3 item 5 and §3.9 (recovery PASS must never be read as fieldwork permission).
- **Affected experiments:** none; it hardens the entry condition.
- **Dependencies:** D13/D14 (authorization workstream, owner `agent-c-governance`); the fieldwork workstream
  D21–D26; owner approval.
- **Approval state:** not approved. **Effective date:** none.

### AM-07 — §2/§15: separation of five concepts

- **Previous (v1.0.0):** quota minimum, target, maximum, overall total and experiment-specific minimum are
  used in overlapping senses across §2, §3 and §15.
- **Candidate:** §2 adds an explicit separation — per-segment minimum is a completion floor; target is the
  segment's planning aim (its preserved maximum); maximum is the stop ceiling; overall requirement is
  37/57; experiment-specific minimum is an analytic threshold in the frozen registry and never a quota.
  Cross-segment duplicate counting is prohibited: a completed record counts in one primary segment only.
- **Reason:** PI-02/PI-03 — the classes were conflated.
- **Affected experiments:** all ten, by reference only; no threshold changes.
- **Dependencies:** D6 (fields 5–8, 13); D7; owner approval.
- **Approval state:** not approved. **Effective date:** none.

### 3.1 Impact summary

| Clause | Changes a quota number? | Changes a threshold? | Changes an instrument? | Changes consent? | Status |
| --- | --- | --- | --- | --- | --- |
| AM-01 | no | no | no | no | `PROPOSED_NOT_EFFECTIVE` |
| AM-02 | no | no | no | no | `PROPOSED_NOT_EFFECTIVE` |
| AM-03 | no | no | no | no | `PROPOSED_NOT_EFFECTIVE` |
| AM-04 | no | no | no | no | `PROPOSED_NOT_EFFECTIVE` |
| AM-05 | no | no | no | no | `PROPOSED_NOT_EFFECTIVE` |
| AM-06 | no | no | no | no | `PROPOSED_NOT_EFFECTIVE` |
| AM-07 | no | no | no | no | `PROPOSED_NOT_EFFECTIVE` |

## 4. Experiment reachability by sampling wave and segment

Minimums are quoted from the frozen records in `data/experiments.json`. Segment placement follows D2 §3.3
(Wave 1 = SEG-01, SEG-03, SEG-04, SEG-06; Wave 2 = all eight). A segment's ability to reach a minimum is
bounded by its preserved maximum; no maximum is raised to make an experiment reachable.

### 4.1 Registered minimums and applicable segments

| Experiment | Registered minimum evidence (frozen) | Applicable segments from the registry | Segment maximum sufficiency |
| --- | --- | --- | --- |
| EXP-MC10-01 | Minimum 5 per narrowly defined segment (target 8–10 is descriptive) | SEG-01, SEG-02, SEG-03 (B2C owners); SEG-06, SEG-07, SEG-08 (B2B operators); SEG-04/SEG-05 as intermediaries only | all six ≥ 5; SEG-06 only at its maximum 5 |
| EXP-MC10-02 | Minimum 5 installers | SEG-04 | 7 ≥ 5 |
| EXP-MC10-03 | ≥ 5 objection codes per segment; Van Westendorp module every participant | SEG-01, SEG-02, SEG-03, SEG-07, SEG-08 | all five ≥ 5 |
| EXP-MC10-04 | `n >= 8` per segment per configuration (Gabor–Granger) | SEG-01, SEG-02, SEG-03, plus installer resale-price view; D2 §3.4 classifies all eight segments | SEG-01/02/03/07 = 8; SEG-04/05 = 7, SEG-06 = 5, SEG-08 = 6 → below |
| EXP-MC10-05 | `n >= 8` per segment per construct (Van Westendorp) | SEG-01, SEG-02, SEG-03, SEG-07, SEG-08 | same: four segments below 8 |
| EXP-MC10-06 | `n >= 5` per segment | SEG-01, SEG-02, SEG-03, SEG-06, SEG-07, SEG-08; SEG-04/SEG-05 as explainers | all ≥ 5 |
| EXP-MC10-07 | Minimum 5 operators responsible for ≥ 5 vessels | SEG-06, SEG-07, SEG-08 | SEG-06 only at maximum 5 |
| EXP-MC10-08 | Minimum 5 retailers/buyers with ranging authority | SEG-05 | 7 ≥ 5 |
| EXP-MC10-09 | Minimum 5 owners and 3 operators | SEG-03 owners; SEG-06 operators | 8 ≥ 5 and 5 ≥ 3 |
| EXP-MC10-10 | Every participant ranks/states top-3 barriers (no numeric segment minimum) | all eight segments | no segment-count barrier |

### 4.2 Wave 1 (exploratory, 18–28) reachability

Classification key: `REACHABLE_IN_WAVE_1` (minimum attainable with Wave-1 segments);
`REACHABLE_IN_WAVE_1_AT_MAX_ONLY` (attainable only by filling a segment to its preserved maximum);
`PARTIALLY_REACHABLE_IN_WAVE_1` (some applicable segments attainable, others not enrolled);
`NOT_REACHABLE_IN_WAVE_1` (an applicable segment is not in Wave 1).

| Experiment | Wave-1 segments and attainability | Wave-1 classification |
| --- | --- | --- |
| EXP-MC10-01 | SEG-01 (5) and SEG-03 (5) attainable; SEG-06 needs 5 = its maximum; SEG-02, SEG-07, SEG-08 not enrolled | `PARTIALLY_REACHABLE_IN_WAVE_1` |
| EXP-MC10-02 | SEG-04 (7 ≥ 5) | `REACHABLE_IN_WAVE_1` |
| EXP-MC10-03 | SEG-01 (5) and SEG-03 (5) attainable; SEG-02, SEG-07, SEG-08 not enrolled | `PARTIALLY_REACHABLE_IN_WAVE_1` (and its reporting also waits on the comprehension gate) |
| EXP-MC10-04 | SEG-01 and SEG-03 only at 8 = their maximum; SEG-04 (7) and SEG-06 (5) below the registered minimum | `REACHABLE_IN_WAVE_1_AT_MAX_ONLY` for SEG-01/SEG-03; `BELOW_REGISTERED_MINIMUM_UNDER_PRESERVED_QUOTAS` for SEG-04/SEG-06 |
| EXP-MC10-05 | same as EXP-MC10-04 | same |
| EXP-MC10-06 | SEG-01 (5), SEG-03 (5), SEG-04 (5 of 7) attainable; SEG-06 only at 5 = its maximum | `REACHABLE_IN_WAVE_1` (SEG-06 at maximum) |
| EXP-MC10-07 | SEG-06 only at 5 = its maximum; SEG-07 and SEG-08 not enrolled | `PARTIALLY_REACHABLE_IN_WAVE_1` |
| EXP-MC10-08 | SEG-05 not enrolled in Wave 1 | `NOT_REACHABLE_IN_WAVE_1` |
| EXP-MC10-09 | SEG-03 owners (8 ≥ 5) and SEG-06 operators (5 ≥ 3) attainable | `REACHABLE_IN_WAVE_1` |
| EXP-MC10-10 | barrier ranking is collected from every Wave-1 participant; the registered three-segment condition is satisfiable across the four Wave-1 segments | `REACHABLE_IN_WAVE_1` as an evidence requirement (no experiment result may be claimed from Wave 1) |

**Wave 1 is exploratory and is never the full study.** It cannot satisfy the eight-segment
minimum of 37, cannot satisfy the experiment set as a whole, and cannot satisfy the MC-10 acceptance
criteria. In particular EXP-MC10-01, EXP-MC10-03 and EXP-MC10-07 remain **below minimum for some of their
applicable segments in Wave 1** — SEG-02, SEG-05, SEG-07 and SEG-08 are not enrolled at all, and SEG-06
reaches a 5-completion minimum only if it is filled to its preserved maximum. EXP-MC10-04 and EXP-MC10-05
remain below the registered minimum for SEG-04 and SEG-06 in Wave 1, and for SEG-04, SEG-05, SEG-06 and
SEG-08 at any sampling wave under the preserved quotas.

### 4.3 Full-study reachability (37 minimum / 57 maximum)

| Experiment | Full-study reachability | Reason |
| --- | --- | --- |
| EXP-MC10-01 | `REACHABLE_AT_FULL_STUDY` | six applicable segments all have maximum ≥ 5; SEG-06 only at 5 |
| EXP-MC10-02 | `REACHABLE_AT_FULL_STUDY` | SEG-04 maximum 7 |
| EXP-MC10-03 | `REACHABLE_AT_FULL_STUDY` | five applicable segments all have maximum ≥ 5 |
| EXP-MC10-04 | `BELOW_REGISTERED_MINIMUM_UNDER_PRESERVED_QUOTAS` for SEG-04, SEG-05, SEG-06, SEG-08; `REACHABLE_AT_FULL_STUDY` for SEG-01, SEG-02, SEG-03, SEG-07 | maxima 7, 7, 5, 6 are below the registered 8 |
| EXP-MC10-05 | same as EXP-MC10-04 | same |
| EXP-MC10-06 | `REACHABLE_AT_FULL_STUDY` | all applicable maxima ≥ 5 |
| EXP-MC10-07 | `REACHABLE_AT_FULL_STUDY` | SEG-07 (8), SEG-08 (6), SEG-06 at 5 |
| EXP-MC10-08 | `REACHABLE_AT_FULL_STUDY` | SEG-05 maximum 7 |
| EXP-MC10-09 | `REACHABLE_AT_FULL_STUDY` | SEG-03 (8) owners, SEG-06 (5) operators |
| EXP-MC10-10 | `REACHABLE_AT_FULL_STUDY` | cross-segment |

"Reachable" means the registered minimum is mathematically attainable if the segment is filled to the
required level; it never means the experiment will succeed, and a reachable minimum is not a result. An
unreachable cell must be reported in the honest class recorded in AM-03, never rendered reachable by
lowering the registered minimum.

## 5. Invariants this amendment preserves

1. **Hypotheses and thresholds unchanged.** The ten MC-09 records preserved in `data/experiments.json` keep
   their per-record SHA-256 values; the existing research gate recomputes them on every run. This record
   does not alter a hypothesis, minimum-evidence definition, decision threshold, confounder or
   interpretation rule.
2. **Consent unchanged.** The four separately recorded permissions (participation, recording, quotation
   use, follow-up) and the consent script are not modified here; `CONSENT-01` v1.0.0 remains the frozen
   historical version and a candidate v1.1.0 belongs to the instrument package.
3. **Instruments unchanged.** No wording, ordering, answer category, language set or codebook is edited
   here. Instruments remain v1.0.0 `FROZEN_PENDING_AUTHORIZATION`; PT instruments remain
   `NOT_PRODUCED`.
4. **Quota numbers unchanged.** 37/57 and the eight per-segment values are numerically untouched (D5 §7,
   D6 §3.1).
5. **No authorization.** This record does not grant, imply or pre-fill any authorization; `AUTH-MC10-001`
   remains `NOT_GRANTED`.
6. **No milestone renumbering.** The programme remains 36 milestones; MC-10R is a recovery sub-stage and
   does not advance to MC-11.
7. **No execution.** Zero interviews, zero participants, zero price responses, zero coded units.

## 6. Approval state and effective date

| Item | State |
| --- | --- |
| Amendment status | `PROPOSED_NOT_EFFECTIVE` |
| Programme-owner approval | **none recorded** |
| Independent review | **not completed** |
| Previous version status | v1.0.0 remains the historical authority |
| Effective date | **null** |
| Fieldwork permission created by this record | **none** |
| Can an agent approve it? | **no** |

Approval path (unchanged from v1.0.0 §11.2): (1) a dated amendment record naming the item and the old and
new value — this document; (2) a new frozen protocol version with a hash in the freeze registers — not yet
created; (3) the Lead's recorded approval and independent review — not obtained; (4) previously collected
data remain evaluated under the version in force when collected — no data exists, so nothing is
re-evaluated. Until all four exist, the candidate is not effective and may not be applied to real research.

Even after approval, the amendment would still not authorise fieldwork: it is an internal design change,
and the authorization gate (`AUTH-MC10-001`), the controller, the legal review, the storage, the interviewer
panel and every other pre-fieldwork item would still have to be complete.

## 7. Dependencies and ordering

| Dependency | Owner | Blocks | Note |
| --- | --- | --- | --- |
| D5 `MC10R-PI01-SAMPLING-RECONCILIATION.md` | `agent-a-methodologist` | AM-01, AM-05, AM-04 arithmetic | Delivered as a candidate |
| D6 `MC10R-PI02-SEGMENT-QUOTA-CONTRACT.md` | `agent-a-methodologist` | AM-02, AM-07, `waves[]` | Delivered as a candidate |
| D7 pricing feasibility matrix | `agent-b-pricing` | AM-03 confirmation | Must not lower the registered minimum |
| D9–D12 instrument amendment package | `agent-e-instruments` | PI-05 / IV-01…IV-09 boundary; §1.3 | Separate package; not duplicated here |
| D13/D14 authorization draft and gate | `agent-c-governance` | AM-06 | Ungranted; fail-closed |
| D27 recovery contract and data alignment | `agent-f-data` | consumption of the candidate keys | Must keep CR-33's recorded defect until approval |
| D31 recovery gate and adversarial tests | `agent-f-data` | validator enforcement of §8 | Check count is whatever the real run reports |
| Programme owner approval | programme owner | every clause becoming effective | No agent can substitute |

**Ordering constraint.** Data-layer changes that would remove the recorded 40/80 defect from
`research-status.json` or `recruitment-funnel.json` must not be made before the amendment is approved and
the existing research gate is updated in the same change; the current gate CR-33 explicitly requires that
defect to remain recorded while the totals are not derivable from the quotas.

## 8. Validator requirements for this amendment (proposed)

Same convention as D5: proposed ids for the recovery gate owner, no pre-declared check count.

| Proposed id | Must reject | Why |
| --- | --- | --- |
| `CRR-PI08-01` | An amendment record that lacks previous version, candidate binding, exact changed clauses, affected experiments, approval state or effective date | the v1.0.0 §11.2 procedure requires all of them |
| `CRR-PI08-02` | A non-null effective date, or `effective: true`, while the status is not `APPROVED_FOR_FUTURE_FIELDWORK` | a candidate must not carry an effective date |
| `CRR-PI08-03` | Any change to an experiment hypothesis, minimum evidence or decision threshold (hash mismatch against the frozen records) | thresholds may not be adjusted by a sampling amendment |
| `CRR-PI08-04` | A sampling wave presented as satisfying the full study, the experiment minimums or the MC-10 acceptance criteria | Wave 1 is exploratory |
| `CRR-PI08-05` | A sampling wave numbered as, or substituted for, a protocol experiment wave (W0–W4); or any milestone renumbering | the two taxonomies are distinct and the programme stays 36 milestones |
| `CRR-PI08-06` | An amendment applied to real research without a recorded programme-owner approval and independent review | approval cannot be inferred |

## 9. Provenance — hashes and commands

Hashes computed by `Get-FileHash -Algorithm SHA256` in the same run recorded in D5 §11:

```
8bd22dc1d89bb4281230a066b7d65678cac61dbd4b046d6392352b0e466286a1  MC10-RESEARCH-PROTOCOL.md
cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d  MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md
8111449b0b823a81d48bc160078bd20a8e248ce9419cfb097e898b2fdf4ba0fb  research-status.json
f01420f102d2a46161e72865e6a21b2d9af9a4e8970348ed7c76eec544efedc3  validation-experiments.json
5ba020811b54f54595db6eeec6e1cd55603ce1b2daffab2471ab2d6c2b4a08a4  experiments.json
```

The MC-09 discovery plan hash matches the hash registered in `methodology/instruments.json`, which confirms
the historical quota and instrument source is unchanged. The protocol hash is recorded so a later reader
can prove v1.0.0 was not edited in place to absorb this amendment.

## 10. Findings reported to the Lead (not silently resolved)

1. **No candidate protocol version identifier is registered** in D2 §3.1. This record binds to
   `MC10R-SAMPLING-1.1.0-PROPOSED` instead of inventing one. A future approved protocol version needs a
   registered id through the v1.0.0 §11.2 procedure.
2. **Wave vocabulary:** D2 §3.3 `Wave 1/2/3` (sampling waves) vs the protocol `W0`–`W4` (experiment-sequence waves). This record adopts the D2 Wave vocabulary with machine ids `WAVE-1/2/3` and maps the two taxonomies in AM-04; no
   renumbering performed.
3. **D2 §5 W-D names PI-05** but PI-05 is instrument scope (D9–D12). Scope boundary recorded in §1.3.
4. **D2 §5 W-B says 15 contract fields** while the MC10R directive enumerates 14. D6 adds a fifteenth
   field explicitly rather than dropping one; the discrepancy is recorded in D6 §4.
5. **Recruitment-plan total-row arithmetic defect:** `MC10-RECRUITMENT-PLAN.md` §1 total row reads 40/80
   while its columns sum to 37/57. That file is outside this workstream's write scope; its owner must
   correct it after approval.
6. **Closed gate pins the defect:** the existing research gate (CR-33) requires the 40/80 values to remain
   in `research-status.json` and `recruitment-funnel.json` while the mismatch is recorded. Any post-approval
   correction must update the gate in the same change; doing it earlier would make the existing gate fail.

None of these findings blocks this deliverable; each is recorded so the independent auditor can test the
resolution rather than discover an unrecorded divergence.

## 11. Honest limitations

- No clause of this amendment is in force; the protocol of record remains v1.0.0 with all its recorded
  conflicts.
- Reachability tables are arithmetic on preserved maxima, not evidence. A reachable cell does not imply
  that the segment can actually be recruited in Galicia, and an unreachable cell may not be repaired by
  reducing a threshold.
- This record cannot verify any data-layer change; alignment is owned by `agent-f-data` and must follow
  approval.
- No synthetic example, participant, interview, quotation, consent, price or training record appears in
  this document, and none may be inferred from it.
