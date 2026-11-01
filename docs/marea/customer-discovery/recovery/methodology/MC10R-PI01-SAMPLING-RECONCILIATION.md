# MC-10R — PI-01 sampling arithmetic reconciliation (D5)

| Field | Value |
| --- | --- |
| Document ID | MC-10R / D5 / `MC10R-PI01-SAMPLING-RECONCILIATION` |
| Recovery contract | `MAREA-MC10R-CUSTOMER-DISCOVERY-RECOVERY` version `1.0.0` |
| Milestone | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36) |
| Candidate sampling plan | `MC10R-SAMPLING-1.1.0-PROPOSED` |
| Canonical decision referenced | `DR-MC10R-01` (`MC10R-RECOVERY-EXECUTION-PLAN.md` §3.3) |
| Workstream | W-A — PI-01 sampling arithmetic reconciliation |
| Document status | `PROPOSED_NOT_EFFECTIVE` |
| Workstream status | `READY_FOR_OWNER_REVIEW` |
| Date | 2026-11-01 |
| Owner | `agent-a-methodologist` — Senior Qualitative Research Methodologist + Sampling/Experimental Design (design only) |
| Scope | Trace every occurrence of the per-segment quotas, the 37/57 sums and the 40–80 total; recompute the arithmetic; compare Options A/B/C; recommend the canonical proposed resolution for programme-owner approval. No quota, threshold, status or dataset is changed by this document. |
| Is not | An approved sampling plan, an amendment in force, fieldwork authorization, participant evidence, a price statement or a claim that any interview exists |

> **STATUS: `PROPOSED_NOT_EFFECTIVE` — NOT APPROVED — NO FIELDWORK.**
> MC-10 remains `BLOCKED`; `AUTH-MC10-001 = NOT_GRANTED`; `OUTREACH_AUTHORIZATION = NOT_GRANTED`;
> `FIELDWORK_STATUS = BLOCKED`; participants, interviews, valid cases and price responses remain **0**.
> Nothing in this document authorises contact, changes a quota that is in force, or creates evidence.
> The only `APPROVED` states named below are explicitly unreached future states that a real human
> programme owner would have to confer; no approval is claimed or implied.

## 0. Reading rules

1. **Three statuses are separated everywhere:** `PREPARED` (this document exists), `PROPOSED_NOT_EFFECTIVE`
   (a candidate reading awaiting owner approval) and `EFFECTIVE` (binding now). Only the values in
   `MC10R-RECOVERY-EXECUTION-PLAN.md` §3.3 and the preserved v1.0.0 quota table are binding readings; this
   document is a proposal, not a change in force.
2. **No silent redefinition.** Every historical value is quoted with its file and location. Nothing is
   rounded, repaired or removed.
3. **Arithmetic is derived, not asserted.** Every total in this document is recomputed from the eight
   preserved per-segment values; the recomputation is recorded as a command output in §11.
4. **Zero is not a result.** A planned quota is not a completed interview. No count in this document is
   evidence of demand, a participant or a price response.
5. **No synthetic example is used.** If a future revision needs one it must carry the label
   `SYNTHETIC_EXAMPLE`; none appears here.

## 1. The registered problem (PI-01)

The defect this workstream closes is registered, not invented. `data/research-status.json` records it
verbatim in `planningInconsistencies`:

- **PI-01** (`severity: BLOCKING_BEFORE_FIELDING`): per-segment quota minima/maxima sum to **37/57**
  completed interviews, while the MC-09 plan, the experiment registry and the milestone sample target
  state a **40-80** total; the totals are not derived from the quotas.
- **PI-01 resolution recorded there:** a dated plan amendment reconciling the quota table with the total
  target before any fielding; MC-10 does not change either value.
- **OD-09** in `MC10-DECISION-REGISTER.md` assigns the reconciliation to the research methodologist and
  the programme owner.

`DR-MC10R-01` (`MC10R-RECOVERY-EXECUTION-PLAN.md` §3.3) is the canonical proposed resolution this
workstream must trace, test and recommend. The decision's own registered status is
`PROPOSED_NOT_EFFECTIVE`.

## 2. Occurrence traceability

### 2.1 How every occurrence was located

Repository content search over `docs/marea/` for the per-segment quota values, the totals `37`/`57`, the
target `40–80`, and the keys `quota`, `plannedMin`, `plannedMax`, `totalInterviewsPlanned`; then every hit
in the authoritative chain was read in full and re-quoted below. The seven sources named in the
workstream definition were all inspected: the MC-09 discovery plan, `validation-experiments.json`, the
MC-10 research protocol, `research-status.json`, the experiment results, the recruitment plan and the
experiment registry (`experiments.json`). Restatements in the research scope, executive report,
authorization register, decision register and derived funnel record were added because they carry the
same values and must move together.

The historical quota table is recorded **verbatim** in §7; the tables below quote only the values needed
to show each occurrence's role.

### 2.2 Occurrences of the per-segment quotas

| # | Source | Location | Recorded value (verbatim) | Interpretation | Conflict / defect |
| --- | --- | --- | --- | --- | --- |
| Q-01 | `MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` | §1, lines 43–52 | Eight segment definitions SEG-01…SEG-08 | Canonical segment definitions; no numeric quota here | None |
| Q-02 | same plan | §2, lines 65–74, column `Quota (completed)` | `5–8`, `5–8`, `5–8`, `5–7`, `5–7`, `3–5`, `5–8`, `4–6` | The historical per-segment quota table; source of the 37/57 sums | None in the values |
| Q-03 | same plan | §3, line 83 | `Qualitative interviews per segment` = `minimum 5, target 8 (operators/retailers minimum 3)` | Descriptive summary of Q-02 | **Defect:** "target 8" is read as a per-segment target although six segments cap below 8; "operators/retailers minimum 3" conflicts with SEG-05 (`5–7`); PI-02 |
| Q-04 | `validation-experiments.json` | EXP-MC10-01 `minimumEvidence`, line 14 | `Minimum 5 and target 8-10 completed interviews per narrowly defined segment (n=40-80 total)` | Experiment-level minimum plus descriptive target | **Defect:** `8-10` exceeds every preserved maximum; the `n=40-80` total is not derived from the quotas |
| Q-05 | same registry | EXP-MC10-02, line 33 | `Minimum 5 completed interviews with installers` | Experiment-specific minimum (SEG-04) | None |
| Q-06 | same registry | EXP-MC10-03, line 52 | `n=5-10 per segment, indicative only` | Descriptive band for the subscription module | **Defect:** upper bound 10 exceeds the preserved maxima |
| Q-07 | same registry | EXP-MC10-04, line 71 | `n>=8 per segment per configuration` | Pricing analytic minimum (Gabor–Granger) | **Defect:** unreachable for SEG-04/05/06/08; PI-03 |
| Q-08 | same registry | EXP-MC10-05, line 90 | `n>=8 per segment per construct` | Pricing analytic minimum (Van Westendorp) | **Defect:** same four segments; PI-03 |
| Q-09 | same registry | EXP-MC10-06, line 109 | `n>=5 per segment` | Experiment-specific minimum | SEG-06 can meet it only at its preserved maximum 5 |
| Q-10 | same registry | EXP-MC10-07, line 127 | `Minimum 5 interviews with operators responsible for at least 5 vessels` | Experiment-specific minimum | SEG-06 can meet it only at its preserved maximum 5 |
| Q-11 | same registry | EXP-MC10-08, line 146 | `Minimum 5 interviews with owners or buyers authorised to decide ranging` | Experiment-specific minimum (SEG-05) | SEG-05 range `5–7` can meet it |
| Q-12 | same registry | EXP-MC10-09, line 164 | `Minimum 5 owner interviews and 3 operator interviews` | Experiment-specific split | SEG-03 (5–8) and SEG-06 (3–5) can meet it |
| Q-13 | same registry | EXP-MC10-10, line 182 | No numeric minimum | Cross-segment barrier set | None |
| Q-14 | `research-status.json` | `segmentCounts`, lines 30–37 | `plannedMin`/`plannedMax`: 5/8, 5/8, 5/8, 5/7, 5/7, 3/5, 5/8, 4/6 | Canonical machine-readable per-segment quotas | None in the values |
| Q-15 | `MC10-RESEARCH-PROTOCOL.md` | §2, lines 75–85 | Table column `Planned completed interviews`: `5–8`, `5–8`, `5–8`, `5–7`, `5–7`, `3–5`, `5–8`, `4–6` | Preserved quotas, declared binding | None in the values |
| Q-16 | `MC10-RESEARCH-SCOPE.md` | §4, lines 85–95 | Same eight ranges | Preserved quotas | Total row on line 95 states 40–80, not the sum |
| Q-17 | `MC10-RECRUITMENT-PLAN.md` | §1, lines 67–77 | `Planned min` column 5,5,5,5,5,3,5,4 and `Planned max` 8,8,8,7,7,5,8,6 | Quotas restated for recruitment | **Defect:** the table's own `Total` row reads `40` / `80`, which is not the column sum |
| Q-18 | `experiments.json` | EXP-MC10-01, line 27 | Same string as Q-04, frozen copy | Frozen MC-10 registry mirror | Inherits Q-04; the freeze is intact (hash verified by the existing gate) |
| Q-19 | `MC10-EXECUTIVE-REPORT.md` | §2.1, lines 76–86 | Same eight ranges; `Total` = `40–80` | Spanish report restatement | Total row inherits the mismatch |
| Q-20 | `recruitment-funnel.json` | `segments[]`, lines 26–174 | `plannedMin`/`plannedMax` per segment | Derived funnel record | Must stay aligned with Q-14 |

### 2.3 Occurrences of the 40–80 total

| # | Source | Location | Recorded value (verbatim) | Interpretation | Conflict / defect |
| --- | --- | --- | --- | --- | --- |
| T-01 | `MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` | §3, line 84 | `Total completed qualitative interviews` = `40–80`, status `PLANNED` | Historical overall planning target | **Not derivable** from Q-02 |
| T-02 | `MC09-VALIDATION-EXPERIMENTS.md` | §3, line 355 | `5–10 interviews per segment across eight segments is 40–80 conversations` | States the derivation of the figure: uniform 5–10 × 8 segments | **Derivation mismatch:** no segment has a maximum of 10; six maxima are below 10 |
| T-03 | `validation-experiments.json` | EXP-MC10-01, line 14 | `(n=40-80 total)` | Restated in the experiment minimum evidence | Inherits T-01/T-02 |
| T-04 | `research-status.json` | `sample`, lines 39–45 | `totalInterviewsPlannedMin: 40`, `totalInterviewsPlannedMax: 80` | Machine-readable overall planning target | **Not the sum** of `segmentCounts` (37/57); PI-01 |
| T-05 | `MC10-RESEARCH-PROTOCOL.md` | §2, lines 85–91 | Total row `40–80`, followed by the note that the quotas sum to 37 minimum and 57 maximum | Preserved conflict, explicitly not silently repaired | Conflict recorded, unresolved at v1.0.0 |
| T-06 | `MC10-RESEARCH-SCOPE.md` | §4, lines 95 and 101–110 | Total `40–80`; note giving `37 minimum / 57 maximum` | Preserved conflict | Same |
| T-07 | `MC10-EXPERIMENT-RESULTS.md` | §1, lines 54–56; §11, lines 253–259 | `n = 40–80 total`; `37-57 against a 40-80 total (PI-01)` | Results-document restatement and defect record | Same |
| T-08 | `MC10-RECRUITMENT-PLAN.md` | §1, lines 67–77 | Total row `**40**` / `**80**` | Total row inside the quota table | **Arithmetic defect:** column minima sum 37, maxima 57 |
| T-09 | `MC10-RECRUITMENT-RESULTS.md` | line 10; lines 181–182; line 199; line 219 | `the MC-09 quota of 40–80`; reconciliation row `40 / 80`; `preserves the same 40–80 quota` | Recruitment restatement | Inherits the mismatch; reports 0 completed, so no positive count is claimed |
| T-10 | `recruitment-funnel.json` | `totals`, lines 192–194 | `plannedMin: 40`, `plannedMax: 80` | Derived funnel totals | Differs from the segment sum; existing gate CR-33 requires this defect to stay recorded |
| T-11 | `MC10-EXECUTIVE-REPORT.md` | §2.1, line 86 | Total `40–80` | Spanish report restatement | Inherits the mismatch |
| T-12 | `MC10-FIELDWORK-AUTHORIZATION.md` | §3, lines 93–96 | `the 37–57 per-segment quota sum versus the 40–80 total` | Authorization register records the defect as blocking | None (accurate) |
| T-13 | `MC10-DECISION-REGISTER.md` | OD-09, line 116 | `Reconcile the 37–57 per-segment quota sum with the 40–80 total (PI-01)` | Open decision assigned to methodologist and owner | None (accurate) |

### 2.4 Occurrences of the 37 / 57 sums

| # | Source | Location | Recorded value (verbatim) | Interpretation |
| --- | --- | --- | --- | --- |
| S-01 | `MC10-RESEARCH-PROTOCOL.md` | §2, lines 87–91 | `those sum to **37 minimum and 57 maximum**` | Derived sum, not a stored field |
| S-02 | `MC10-RESEARCH-PROTOCOL.md` | §15.8, lines 481–487 | `5 + 5 + 5 + 5 + 5 + 3 + 5 + 4 = 37; 8 + 8 + 8 + 7 + 7 + 5 + 8 + 6 = 57` | Derivation shown explicitly |
| S-03 | `MC10-RESEARCH-SCOPE.md` | §4, lines 101–110 | `**37 minimum / 57 maximum**` | Derived sum |
| S-04 | `MC10-EXPERIMENT-RESULTS.md` | §11, lines 253–259 | `37-57 against a 40-80 total` | Derived sum, defect record |
| S-05 | `research-status.json` | PI-01, line 107 | `sum to 37/57 completed interviews` | Registered defect |
| S-06 | `MC10-FIELDWORK-AUTHORIZATION.md` | §3, line 94 | `37–57 per-segment quota sum` | Registered defect |
| S-07 | `MC10-DECISION-REGISTER.md` | OD-09, line 116 | `37–57 per-segment quota sum` | Open decision |
| S-08 | `MC10R-RECOVERY-EXECUTION-PLAN.md` | §3.3, lines 126–164 | Preserved table totals `37` / `57`; proposed overall target `37 minimum / 57 maximum`; Wave 1 `18` / `28` | Canonical proposed resolution (`DR-MC10R-01`) |

## 3. Arithmetic recomputation

All values below were produced by the command recorded in §11, not by hand.

### 3.1 Minimum sum

```
SEG-01  5
SEG-02  5
SEG-03  5
SEG-04  5
SEG-05  5
SEG-06  3
SEG-07  5
SEG-08  4
----------
sum    37
```

### 3.2 Maximum sum

```
SEG-01  8
SEG-02  8
SEG-03  8
SEG-04  7
SEG-05  7
SEG-06  5
SEG-07  8
SEG-08  6
----------
sum    57
```

Every segment's minimum is less than or equal to its maximum (37 ≤ 57 at the aggregate level), so the
preserved table is internally feasible; its aggregate range is **[37, 57]**.

### 3.3 Why 40 and 80 do not derive from the quotas

The historical figure is a **uniform envelope**, not a sum of this table. T-02 states its derivation:
`5–10 interviews per segment across eight segments is 40–80`, i.e. `8 × 5 = 40` and `8 × 10 = 80`.

The preserved table differs from a uniform envelope in exactly two places, and the deficits reconcile
both bounds exactly:

| Bound | Uniform assumption | Per-segment deficit vs the table | Computed from the table |
| --- | --- | ---: | ---: |
| Lower bound 40 | every segment minimum is 5 (`8 × 5`) | SEG-06 loses 2 (5 → 3); SEG-08 loses 1 (5 → 4); total 3 | `40 − 3 = 37` |
| Upper bound 80 | every segment maximum is 10 (`8 × 10`) | SEG-01 −2, SEG-02 −2, SEG-03 −2, SEG-04 −3, SEG-05 −3, SEG-06 −5, SEG-07 −2, SEG-08 −4; total 23 | `80 − 23 = 57` |

Therefore:

- **80 > 57.** The upper end of the aspiration cannot be met at any level of completion under the
  preserved maxima. The achievable maximum is 57, i.e. 23 fewer completions than the aspiration's upper
  bound.
- **40 > 37.** Completing every segment at its minimum does **not** reach even the lower end of the
  aspiration. Only above-minimum completeness within the envelope [37, 57] reaches 40 or more.
- The two statements are not arithmetically compatible, so neither can be used to validate the other. The
  only derivable completion requirements are the per-segment minima and maxima.

### 3.4 Wave arithmetic

`MC10R-RECOVERY-EXECUTION-PLAN.md` §3.3 proposes a Wave 1 over four segments:

```
minimum  5 (SEG-01) + 5 (SEG-03) + 5 (SEG-04) + 3 (SEG-06) = 18
maximum  8 (SEG-01) + 8 (SEG-03) + 7 (SEG-04) + 5 (SEG-06) = 28
```

Wave 1 range **[18, 28]**. Wave 1 is a subset of the same quotas: it does not add a requirement, it
sequences part of the existing one. Wave 2 must therefore supply at least `37 − 18 = 19` and at most
`57 − 28 = 29` further completions, depending on how much of Wave 1's range is actually completed.

## 4. What each number means

### 4.1 The sampling model

Purposive quota sampling inside eight narrowly defined segments (`MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md`
§2–§3; `MC10-RESEARCH-PROTOCOL.md` §3.1). There is **no probability sampling**: no sampling frame is
purchased or scraped, selection is for fit to a narrow operational definition, and self-selection and
gatekeeper selection are unavoidable and recorded as limitations. Within-sample coding proportions
describe only the participants coded; they carry their denominator and no prevalence meaning.

### 4.2 Five different things that the numbers 37, 57, 40, 80 and 8 are

| Concept | Value and role | Binding? |
| --- | --- | --- |
| **Segment minimum** | per-segment completion floor (5/5/5/5/5/3/5/4); the minimum evidence a segment must deliver to be reported as recruited to quota | Binding completion requirement (preserved v1.0.0) |
| **Segment maximum** | per-segment stop-recruiting ceiling (8/8/8/7/7/5/8/6) | Binding ceiling; recruitment stops at it |
| **Overall completion requirement** | sum of the segment minima and maxima = **37 minimum / 57 achievable maximum** | The only derivable overall requirement |
| **Historical planning aspiration** | `40–80`, a uniform 5–10 × 8 envelope that predates and does not match the table | Not a completion requirement; preserved as `HISTORICAL_PLANNING_ASPIRATION` |
| **Experiment-specific analytic minimum** | e.g. `n ≥ 8 per segment per construct` for EXP-MC10-04/05, `n ≥ 5` for several others | Binding experiment thresholds, frozen; never a quota and never lowered |

The experiment-specific minimum is not a quota: it is an analytic threshold attached to one experiment.
A quota is an operational completion target attached to a segment. Conflating them is exactly the defect
PI-02/PI-03 record (an experiment needing 8 cannot be satisfied by a segment whose ceiling is 7).

### 4.3 What completing 37 or 57 would and would not establish

- **Would establish:** 37 (or up to 57) real, consent-valid completed interviews distributed across the
  eight segments, each meeting the countable-record definition in `MC10-RESEARCH-PROTOCOL.md` §8.2, with
  per-segment saturation recorded as a stopping rule.
- **Would not establish:** representativeness, a margin of error, a confidence interval, market size,
  share, revenue, demand, conversion or elasticity. Five-to-ten interviews per segment detect strong,
  repeated signals and catastrophic misunderstandings; they cannot detect a ten-point difference between
  segments (`MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` §3, line 93). Saturation is a stopping rule for theme
  discovery, not prevalence.
- **Would not establish pricing:** only four segments can even reach the registered pricing minimum of 8
  at their preserved maxima (SEG-01, SEG-02, SEG-03, SEG-07); for SEG-04, SEG-05, SEG-06 and SEG-08 the
  class is `BELOW_REGISTERED_MINIMUM` (D2 §3.4). No price may be approved from any result.
- **Would not satisfy 40–80 as stated:** see §3.3. At minimum completion (37) the aspiration's lower
  bound is missed; at maximum completion (57) its upper bound is missed.

## 5. Options

No option is selected on a commercial preference. Each option is described as a methodological design and
its consequences are recorded. Option labels follow `MC10R-RECOVERY-EXECUTION-PLAN.md` §3.3.

### 5.1 Option A — keep the quotas; amend the overall achievable target

- Per-segment quotas remain exactly as preserved; the overall target becomes **37 minimum / 57 maximum**.
- `40–80` is relabelled `HISTORICAL_PLANNING_ASPIRATION` and is not used as a completion requirement.
- **Cost:** low — no additional interviews, no additional recruitment effort, no new spend (spending is
  `ZERO` by proposal and unapproved anyway).
- **Feasibility:** high — it only stops asserting a total that cannot be derived.
- **Bias:** unchanged; the same purposive design and the same known biases apply.
- **Participant availability:** improved — the achievable ceiling drops from an impossible 80 to 57,
  which is materially easier in small populations, especially SEG-06 and SEG-08.
- **Pricing-research eligibility:** unchanged — the four `BELOW_REGISTERED_MINIMUM` segments stay
  unreachable at the preserved maxima; PI-03 remains a separate, registered defect.
- **Operational complexity:** lowest — one plan, one set of targets, no extra amendment.
- **Limitation:** it does not fix the wording defect in the v1.0.0 summary (`minimum 5, target 8`) unless
  paired with a single authoritative contract (D6).

### 5.2 Option B — expand selected segment quotas to support 40–80

- To support the **lower bound 40**, the per-segment minima must total at least 40: the minimal preserved
  allocation change is `+2` on SEG-06 (3 → 5) and `+1` on SEG-08 (4 → 5), giving 40. Any other allocation
  has the same aggregate effect but different segment costs.
- To support the **upper bound 80**, the maxima must total at least 80: a uniform reading of the
  historical envelope requires every segment maximum to be 10, i.e. `+23` planned completions
  (SEG-01 +2, SEG-02 +2, SEG-03 +2, SEG-04 +3, SEG-05 +3, SEG-06 +5, SEG-07 +2, SEG-08 +4).
- **Cost:** high — up to 23 more completed interviews than the achievable envelope, i.e. a 40% increase
  over 57, with proportionally more recruitment, screening, consent, transcription and double-coding
  effort. No money is approved, so this is effort/time and privacy-exposure cost, not a priced budget.
- **Feasibility:** low in the initial geography. SEG-06 (marina/shipyard operators) and SEG-08 (fleet
  managers) are explicitly recorded as small, exhaustible populations; a ceiling of 10 in those segments
  is the least plausible part of the change.
- **Bias:** worsens risk — pushing small segments to 10 increases the pressure to recruit through a single
  channel or referral chain, which the design already caps and flags.
- **Participant availability:** the binding constraint. The `BELOW_REGISTERED_MINIMUM` segments are thin.
- **Pricing-research eligibility:** improved — raising maxima to 8+ would make SEG-04/05/08 able to reach
  the registered pricing minimum and would fix PI-03 for those segments, but only if 8 completed
  pricing-module interviews are actually achieved per segment.
- **Operational complexity:** high — new quota set, new planning figures, new recruitment targets, and a
  wider volume that any future authorization must explicitly cover (the authorization record requires a
  named volume; the current record has maximum outreach volume 0 and is `NOT_GRANTED`).
- **Governance:** the change must be a separate, approved quota-expansion amendment. It cannot be a side
  effect of reconciling a total.

### 5.3 Option C — sequential multi-wave design

- Wave 1 exploratory pilot over four segments: SEG-01, SEG-03, SEG-04, SEG-06, range **18–28**
  (D2 §3.3).
- Wave 2 main study completing the full eight-segment minimum **37** and ceiling **57**, including any
  Wave-1 credit.
- Wave 3 optional extension only under a separately approved amendment.
- **Cost:** medium — two recruitment rounds and a longer calendar, but the same total quota cost as
  Option A (no extra interviews inside the preserved envelope).
- **Feasibility:** medium-high — Wave 1 is a small first step that can be halted; Wave 2 carries the
  full requirement.
- **Bias:** same per-segment design; adds wave effects (seasonality, interviewer learning, instrument
  version change) that must be recorded as confounders.
- **Participant availability:** better — smaller first wave reduces the burden on thin segments and
  allows the recruitment channels to be tested before the full requirement is attempted.
- **Pricing-research eligibility:** Wave 1 can produce an experiment-level pricing result only for
  SEG-01 and SEG-03, and only if eight completed pricing-module interviews are achieved in that segment.
  SEG-04 and SEG-06 are qualitative-pricing only. Wave 2 is required for SEG-02 and SEG-07 pricing, and
  SEG-05/SEG-08 stay below the registered minimum.
- **Operational complexity:** highest of the three — multiple waves, wave boundaries, credit rules for
  partly completed segments, and an explicit prohibition on presenting Wave 1 as the study.
- **Risk to control:** Wave 1 is exploitable as a misleading headline. It must be labelled exploratory
  and must never satisfy the full study, the experiment minimums or the MC-10 acceptance criteria.

### 5.4 Comparison

| Dimension | Option A (keep quotas, amend overall target) | Option B (expand quotas to 40–80) | Option C (sequential multi-wave) |
| --- | --- | --- | --- |
| Quota values | unchanged | increased (min +3, max +23 under a uniform reading) | unchanged |
| Derivable overall requirement | 37 / 57 | ≥ 40 / ≥ 80 | 37 / 57 within the wave envelope |
| Effort / cost | lowest | highest (up to +23 completions, +40% over 57) | medium (wave-sequencing overhead, same completions as A) |
| Feasibility in Galicia / Rías Baixas | high | low (thin SEG-06/SEG-08 populations) | medium-high |
| Bias position | unchanged | higher channel/referral concentration risk | unchanged per segment, adds wave effects |
| Participant availability pressure | relieved | aggravated | relieved in Wave 1, unchanged overall |
| Pricing eligibility | unchanged (4 segments below minimum) | improved if maxima reach 8+ and 8 completions achieved | Wave 1: SEG-01/SEG-03 only; Wave 2: adds SEG-02/SEG-07; SEG-05/SEG-08 still below |
| Operational complexity | lowest | high | highest |
| Presents a false completion if misused? | no, if labelled | no, if labelled | **yes**, if Wave 1 is read as the study |
| Requires separate approved amendment? | yes, for the relabelling itself (this proposal) | yes, quota-expansion amendment | yes, for wave sequencing and for Wave 3 |

## 6. Recommendation (proposed, `DR-MC10R-01`)

Recommended to the programme owner as the canonical resolution of PI-01, and marked
**`PROPOSED_NOT_EFFECTIVE`**:

1. **The per-segment quotas are authoritative.** Minimum 37, achievable maximum 57. They are completion
   requirements, not aspirations.
2. **The overall candidate target is 37 minimum / 57 maximum** completed interviews across the eight
   canonical segments.
3. **`40–80` is preserved as `HISTORICAL_PLANNING_ASPIRATION`.** It is not deleted and not rewritten; it
   is retired as a completion requirement because it is not derivable from the quotas (80 > 57 and
   40 > 37).
4. **The study is sequenced in waves (Option C) inside Option A's quota envelope:** Wave 1 exploratory 18–28 over
   SEG-01, SEG-03, SEG-04 and SEG-06; Wave 2 main study completing the full eight-segment minimum 37
   (ceiling 57); Wave 3 optional extension only under a separately approved amendment.
5. **Reaching 40–80 requires a separate approved quota-expansion amendment (Option B).** That amendment
   is `PROPOSED_NOT_EFFECTIVE` and must not be applied to real research until the programme owner
   explicitly approves it. It is not recommended for Wave 1.
6. **No first wave may be presented as satisfying the full study, the experiment minimums or the MC-10
   acceptance criteria.**

This is a recommendation, not a decision in force. `DR-MC10R-01` remains `PROPOSED_NOT_EFFECTIVE` until
the programme owner records a dated approval and an independent review completes, as the protocol
amendment procedure requires. An agent cannot confer that approval.

## 7. Historical immutable reference — v1.0.0

The following is the preserved historical quota reading, reproduced as an immutable reference. It is the
value set of `MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` §2 (Q-02) and `data/research-status.json`
`segmentCounts` (Q-14). **It must never be edited in place.** Any later version is a new artefact that
points back to this one.

| Segment | Canonical name (`MC10R-RECOVERY-EXECUTION-PLAN.md` §3.2) | Minimum | Maximum |
| --- | --- | ---: | ---: |
| SEG-01 | Recreational motorboat owners | 5 | 8 |
| SEG-02 | Sailing yacht owners | 5 | 8 |
| SEG-03 | Marina-based unattended-vessel owners | 5 | 8 |
| SEG-04 | Marine electronics installers | 5 | 7 |
| SEG-05 | Marine retailers and chandlers | 5 | 7 |
| SEG-06 | Marina or shipyard operators | 3 | 5 |
| SEG-07 | Charter operators and sailing schools | 5 | 8 |
| SEG-08 | Fleet managers | 4 | 6 |
| **Total** | — | **37** | **57** |

Recorded historical provenance: MC-09 discovery plan at `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d`
(the registered instrument-source hash) and `data/research-status.json` at
`8111449b0b823a81d48bc160078bd20a8e248ce9419cfb097e898b2fdf4ba0fb` at the time of this review (§11).
No value in this table has been changed by MC-10R.

## 8. Consequences of the proposed amendment

If the programme owner approves `DR-MC10R-01` and the candidate contract `MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED`
(D6), then:

1. Documents that state an overall target of 40–80 as a **completion requirement** must be corrected to
   37/57 and must carry the 40–80 figure only as `HISTORICAL_PLANNING_ASPIRATION`. Until then the defect
   stays recorded; MC-10R does not edit those documents because they are outside this workstream's write
   scope and because the change is not yet effective.
2. `data/research-status.json` `sample.totalInterviewsPlannedMin/Max`, `recruitment-funnel.json`
   `totals.plannedMin/plannedMax` and the manifest must be aligned by their owners **after** approval, not
   by this document. A structural change to the data layer would also require the existing research gate's
   CR-33 expectation to be updated in the same change; that gate currently requires the defect to stay
   recorded (see §9 and §10).
3. The 37/57 target becomes the single overall completion figure in the candidate segment-quota contract;
   the 40–80 figure survives only as a labelled historical aspiration.
4. The wave sequence becomes binding only after approval; before approval, Wave 1 is a proposal.
5. **Nothing about the fielding gate changes.** `AUTH-MC10-001` stays `NOT_GRANTED`, fieldwork stays
   `BLOCKED`, counts stay 0, and no experiment threshold, pricing ladder or consent requirement is
   weakened.
6. **The amendment cannot be used to claim completion.** Approving a target does not create a completed
   interview; the completion evidence rules are unchanged.

## 9. Validator rejections this workstream requires

Final check ids and the exact count belong to the recovery gate owner (`scripts/check-marea-customer-recovery.mjs`);
the ids below are proposed labels so the requirement is testable, and the implemented count must be
whatever the real run reports — never a pre-declared number. Each rejection is fail-closed.

| Proposed id | Must reject | Example mutation | Why |
| --- | --- | --- | --- |
| `CRR-PI01-01` | Global maxima below required minima | a segment with maximum 4 and minimum 5, or an overall maximum below the overall minimum | an infeasible quota range cannot be a completion requirement |
| `CRR-PI01-02` | Global minima above achievable maxima | overall required minimum greater than the sum of the segment maxima | a requirement that no allocation can satisfy must not be published |
| `CRR-PI01-03` | Unreachable required totals | a declared completion total outside [sum of minima, sum of maxima], e.g. 80 with preserved maxima summing to 57; or a declared total asserted as derived from the table when it differs from the sum | the 40–80 defect is exactly this class |
| `CRR-PI01-04` | Inconsistent quota totals | any declared total that differs from the recomputed sum of the per-segment values (e.g. a table whose `Total` row reads 40/80 while its columns sum to 37/57) | totals must be computed, not asserted |
| `CRR-PI01-05` | Duplicated participant counts across segments | the same completed record counted in two segments, or segment sums greater than the study total | one participant belongs to one primary segment; double counting inflates every quota |
| `CRR-PI01-06` | Exploratory wave presented as complete study | Wave 1 totals (18–28) reported as the study completion, as satisfying all experiment minimums, or as an MC-10 acceptance result | wave sequencing must not manufacture a completion |
| `CRR-PI01-07` | Unapproved amendment presented as effective | a document or dataset using `MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED` as binding, an `effective: true` candidate, or an approval attributed without a recorded human approval | candidate readings may not silently become the effective contract |

## 10. Dependencies, limitations and items for the independent auditor

**Dependencies.** D6 (`MC10R-PI02-SEGMENT-QUOTA-CONTRACT.md`) carries the single authoritative contract
this reconciliation needs; D8 (`MC10R-RESEARCH-PROTOCOL-AMENDMENT.md`) records the dated protocol change;
`agent-f-data` must align the recovery contract (D27) and the recovery gate (D31) with the proposed keys;
the programme owner must approve before any of it is effective.

**Honest limitations.** (a) The defect is registered, not resolved: every source listed in §2 still
contains the old values until their owners correct them after approval. (b) The 40–80 figure's exact
origin is inferred from T-02 and the exact deficits in §3.3; no document states a formal derivation, so
the inference is labelled as such. (c) This document cannot verify that any future data-file change keeps
the existing research gate passing; that is a separate integration risk recorded in §8.2. (d) The
`8–10` and `target 8` readings are descriptive language in v1.0.0; treating them as quotas would be a
silent redefinition, which this document refuses.

**What the independent auditor should probe.** (1) Re-run the arithmetic command in §11 and confirm
37/57/18/28. (2) Confirm no quota number in §7 differs from `research-status.json` `segmentCounts` and
the MC-09 plan §2 table. (3) Confirm that every 40–80 occurrence listed in §2.3 really exists at the
cited location and that none was omitted — search the repository again independently. (4) Confirm that
`DR-MC10R-01` is still `PROPOSED_NOT_EFFECTIVE` and that no document in this workstream claims approval,
an `APPROVED` state, fieldwork permission or a completed interview. (5) Confirm that the §9 rejections
are implemented as mutations that actually fail, not as documented intentions.

## 11. Provenance — commands run and real output

Files hashed and arithmetic recomputed in one PowerShell run at the time of writing (Node `v24.18.0`
reported by `node -v`). The hash of the MC-09 discovery plan matches the registered instrument-source
hash, which shows the historical quota source is unchanged.

```
Get-FileHash -Algorithm SHA256 -Path <files>
8bd22dc1d89bb4281230a066b7d65678cac61dbd4b046d6392352b0e466286a1  MC10-RESEARCH-PROTOCOL.md
cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d  MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md
8111449b0b823a81d48bc160078bd20a8e248ce9419cfb097e898b2fdf4ba0fb  research-status.json
f01420f102d2a46161e72865e6a21b2d9af9a4e8970348ed7c76eec544efedc3  validation-experiments.json
83ab30d381028e87e6362d24a74fdfb0bbfbc03fadb04af4e784c85f3a534994  recruitment-funnel.json
5ba020811b54f54595db6eeec6e1cd55603ce1b2daffab2471ab2d6c2b4a08a4  experiments.json
0432ad0668bf65fe98823ef90e2ca7ce5f0627cd6c384dcdd39d1cc280d76ba1  MC10R-RECOVERY-EXECUTION-PLAN.md

segments=8 minSum=37 maxSum=57
uniform5x8=40 uniform10x8=80
80-minus-maxSum=23 40-minus-minSum=3
maxDeficitFrom10=23  check=57
minDeficitFrom5=3  check=37
wave1min=18 wave1max=28
node=v24.18.0
```

Interpretation of the output: the preserved table sums to 37 minimum and 57 maximum; a uniform 5–10 × 8
envelope gives 40 and 80; the deficits (3 and 23) reconcile the two readings exactly; the proposed Wave 1
sums to 18 minimum and 28 maximum. No value was typed by hand.
