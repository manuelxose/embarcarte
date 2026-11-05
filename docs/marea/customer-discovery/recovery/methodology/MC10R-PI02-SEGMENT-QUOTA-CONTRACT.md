# MC-10R — PI-02 segment-quota contract (D6)

| Field | Value |
| --- | --- |
| Document ID | MC-10R / D6 / `MC10R-PI02-SEGMENT-QUOTA-CONTRACT` |
| Segment quota contract id | `MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED` |
| Contract version | `1.1.0` (candidate) |
| Parent version | `1.0.0` (historical preserved reading) |
| Recovery contract | `MAREA-MC10R-CUSTOMER-DISCOVERY-RECOVERY` version `1.0.0` |
| Milestone | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36) |
| Decision referenced | `DR-MC10R-01` (`MC10R-RECOVERY-EXECUTION-PLAN.md` §3.3) |
| Workstream | W-B — PI-02 single segment-quota contract |
| Document status | `PROPOSED_NOT_EFFECTIVE` |
| Workstream status | `READY_FOR_OWNER_REVIEW` |
| Effective | **false** |
| Date | 2026-11-01 |
| Owner | `agent-a-methodologist` — Senior Qualitative Research Methodologist + Sampling/Experimental Design (design only) |
| Scope | One authoritative, versioned, machine-readable statement of the eight segment quotas and their meaning, eliminating the ambiguity registered as PI-02. It changes no quota number and overwrites no historical value. |
| Is not | An approved contract, an amendment in force, fieldwork authorization, a completed interview, a price statement, or a replacement for any dataset |

> **STATUS: `PROPOSED_NOT_EFFECTIVE` — NOT APPROVED — NOT BINDING.**
> This contract is a candidate. It does not replace the preserved v1.0.0 reading and it is not the effective
> version. `AUTH-MC10-001 = NOT_GRANTED`; `FIELDWORK_STATUS = BLOCKED`; participants and interviews = 0.
> `APPROVED` appears in this document only as an explicitly unreached future state that a real programme
> owner and independent reviewer must confer; no approval exists and none may be inferred from this file,
> from a task assignment, from a validator pass or from a pull request.

## 0. Reading rules

1. **One contract, two versions, one effective reading.** v1.0.0 is preserved as history; v1.1.0 is the
   candidate. Until approval, the only binding readings are the preserved values in
   `MC10R-RECOVERY-EXECUTION-PLAN.md` §3.3 and this document's §3.1 historical column.
2. **No quota number changes in this proposal.** Minimum, target and maximum per segment are numerically
   identical to the preserved v1.0.0 values. What changes is that each number's *meaning*, *bindingness*
   and *use* is stated once, explicitly, and the ambiguous v1.0.0 summary language is retired from
   authoritative use.
3. **No silent redefinition.** Where v1.0.0 had more than one reading, both readings are shown in §3
   side by side and the candidate's single reading is marked as a proposal, with its reason.
4. **Canonical segment names are never redefined.** The eight names and IDs are quoted from
   `MC10R-RECOVERY-EXECUTION-PLAN.md` §3.2.
5. **No participant, no evidence.** A quota is a plan, not an observation.

**Wave vocabulary.** This contract uses the D2 vocabulary **Wave 1 / Wave 2 / Wave 3** for the sampling
waves: `Wave 1` is the exploratory pilot (18–28 interviews), `Wave 2` the main study that completes the
full eight-segment minimum (37, ceiling 57), and `Wave 3` the optional extension that requires a separately
approved amendment. The canonical machine ids are `WAVE-1`, `WAVE-2` and `WAVE-3`. These sampling waves are
**not** the protocol's experiment-sequence waves `W0`–`W4` (`MC10-RESEARCH-PROTOCOL.md` §4): a sampling wave
says which segments are recruited when, while `W0`–`W4` say which experiments run when. No renumbering of
either vocabulary is implied.

## 1. Why one contract is required (PI-02)

`data/research-status.json` registers PI-02 as `BLOCKING_BEFORE_FIELDING`: three conflicting
per-segment minimum/target readings exist — the plan summary `minimum 5, target 8 (operators/retailers
minimum 3)`, the plan segment table, and the experiment registry `target 8-10` (which exceeds the
preserved maximum of 8). Its recorded resolution is a single authoritative quota statement in a dated
amendment, with segments never silently redefined. `OD-10` in `MC10-DECISION-REGISTER.md` assigns that to
the research methodologist and the programme owner.

A second class of ambiguity overlaps: PI-01 (overall total) and PI-03 (pricing minimum unreachable for
four segments). This contract separates five concepts that v1.0.0 used interchangeably:

| Concept | Owner of the value | This contract's field |
| --- | --- | --- |
| Segment-level **minimum** completion | contract | `minimumQualitativeInterviews` |
| Segment-level **target** (planning aim) | contract | `targetQualitativeInterviews` |
| Segment-level **maximum** (stop ceiling) | contract | `maximumPlannedInterviews` |
| **Overall** target and requirement | contract totals + D5 reconciliation | `totals` |
| **Experiment-specific** minimum evidence | frozen experiment registry, never the contract | `evidenceThreshold` (reference only) |
| **Optional extension** | separate approved amendment | `waves[]` Wave 3 entry |

## 2. Version registration

| Item | Value |
| --- | --- |
| Contract id | `MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED` |
| Version | `1.1.0` |
| Status | `PROPOSED_NOT_EFFECTIVE` |
| Effective | `false` |
| Parent / preserved reading | v1.0.0, the historical quota table recorded in §3.1 |
| Supersession | none — v1.0.0 is not superseded by this proposal until an approval records it |
| Approval required | explicit programme-owner approval plus independent review, recorded in a dated amendment |
| Approval present | **no** |
| Effective date | **null** (no date may be set while the status is `PROPOSED_NOT_EFFECTIVE`) |

D2 §3.1 registers this identifier and version. No alternative identifier or version is used anywhere in
this document.

## 3. Preserved v1.0.0 reading and candidate v1.1.0 reading, side by side

### 3.1 Numeric values — unchanged

| Segment | v1.0.0 minimum | v1.1.0 candidate minimum | v1.0.0 maximum | v1.1.0 candidate maximum | Candidate target | Numeric change |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| SEG-01 | 5 | 5 | 8 | 8 | 8 | none |
| SEG-02 | 5 | 5 | 8 | 8 | 8 | none |
| SEG-03 | 5 | 5 | 8 | 8 | 8 | none |
| SEG-04 | 5 | 5 | 7 | 7 | 7 | none |
| SEG-05 | 5 | 5 | 7 | 7 | 7 | none |
| SEG-06 | 3 | 3 | 5 | 5 | 5 | none |
| SEG-07 | 5 | 5 | 8 | 8 | 8 | none |
| SEG-08 | 4 | 4 | 6 | 6 | 6 | none |
| **Totals** | **37** | **37** | **57** | **57** | **57** | **none** |

The candidate target column is the segment's preserved **maximum**, used as the planning aim. It is not a
new number and not a quota increase.

### 3.2 Interpretive values — the actual change

| Ambiguity class | v1.0.0 readings recorded | Candidate v1.1.0 single reading | Reason |
| --- | --- | --- | --- |
| A. Overall total | `40–80` stated as the plan's total (plan §3; scope §4; protocol §2; registry `n=40-80`) versus the quota sums 37/57 | overall completion requirement **37 minimum / 57 maximum**; `40–80` preserved only as `HISTORICAL_PLANNING_ASPIRATION` | 80 > 57 and 40 > 37; an aspiration cannot be a completion requirement (D5) |
| B. Segment minimum | summary `minimum 5` (with `operators/retailers minimum 3`) versus table minima 5/5/5/5/5/3/5/4 | minima are exactly the preserved table values; SEG-05 minimum is 5, SEG-06 minimum is 3 | the table and `research-status.json` are binding; the summary sentence is descriptive and cannot raise or lower a minimum |
| C. Segment target | summary `target 8` versus registry `target 8-10` versus maxima 8/8/8/7/7/5/8/6 | target = the segment's preserved maximum; `8-10` is removed from authoritative use as descriptive language only | `8-10` exceeds every preserved maximum and `target 8` exceeds four of them; a target must lie inside its own segment envelope |
| D. Pricing minimum | experiment `n>=8 per segment per construct` versus preserved maxima 7/7/5/6 for SEG-04/05/06/08 | pricing eligibility is a separate field with the registered classification `REACHABLE_AT_PLANNED_MAX` or `BELOW_REGISTERED_MINIMUM`; no maximum is raised and no minimum is lowered | PI-03: an experiment threshold cannot be met by a segment whose ceiling is below it; the honest class is `BELOW_REGISTERED_MINIMUM` |
| E. Experiment minimum versus quota | experiment-specific minima (5, 8, etc.) read as if they were quota minima | experiment minimums stay in the frozen registry and are referenced, never re-derived; a quota minimum and an experiment minimum are different fields | PI-02/PI-03: conflating them is the registered defect |
| F. Optional extension versus completion | the multi-wave plan's later waves could read as extra required work | Wave 1 and Wave 2 are completion-relevant; Wave 3 is optional and requires a separately approved amendment | D2 §3.3; no wave beyond the full 37/57 minimum is part of acceptance |

No historical value is overwritten: the v1.0.0 columns in §3.1 and the v1.0.0 readings in §3.2 remain the
record of what v1.0.0 said.

## 4. The contract — 15 fields per segment

D2 §5 (workstream W-B) requires 15 contract fields per segment; the MC-10R directive enumerates 14. To
satisfy both without weakening either, this contract defines the 14 enumerated fields plus
`priorVersionReading`, which records the preserved v1.0.0 value that §3.1 compares against. The
discrepancy is reported to the Lead rather than resolved by preference. Fields 1, 2, 5, 6, 7 and 8 are in
§4.1; fields 3, 4 and 9–15 are in §4.2. The machine-readable block in §7 carries all 15 fields per
segment.

### 4.1 Segment summary (fields 1, 2, 5, 6, 7, 8)

| ID | Segment name (canonical) | Min (5) | Target (6) = planned maximum | Max (7) | Pricing-module eligibility (8) |
| --- | --- | ---: | ---: | ---: | --- |
| SEG-01 | Recreational motorboat owners | 5 | 8 | 8 | `REACHABLE_AT_PLANNED_MAX` |
| SEG-02 | Sailing yacht owners | 5 | 8 | 8 | `REACHABLE_AT_PLANNED_MAX` |
| SEG-03 | Marina-based unattended-vessel owners | 5 | 8 | 8 | `REACHABLE_AT_PLANNED_MAX` |
| SEG-04 | Marine electronics installers | 5 | 7 | 7 | `BELOW_REGISTERED_MINIMUM` — qualitative price objections only |
| SEG-05 | Marine retailers and chandlers | 5 | 7 | 7 | `BELOW_REGISTERED_MINIMUM` — qualitative price objections only |
| SEG-06 | Marina or shipyard operators | 3 | 5 | 5 | `BELOW_REGISTERED_MINIMUM` — qualitative price objections only |
| SEG-07 | Charter operators and sailing schools | 5 | 8 | 8 | `REACHABLE_AT_PLANNED_MAX` |
| SEG-08 | Fleet managers | 4 | 6 | 6 | `BELOW_REGISTERED_MINIMUM` — qualitative price objections only |

Pricing eligibility classification is quoted from `MC10R-RECOVERY-EXECUTION-PLAN.md` §3.4 and the frozen
`EXP-MC10-04`/`EXP-MC10-05` minimum `n >= 8 per segment per construct`, which is **not reduced**. For
Wave 1, only SEG-01 and SEG-03 can produce an experiment-level pricing result, and only if eight
completed pricing-module interviews are achieved in that segment (D2 §3.4).

**Field 6 definition — the target is the planned maximum, and no mid value is invented.** `Target
qualitative interviews` means the **planned target of the segment, which in this candidate equals that
segment's planned maximum**. The relationship is `minimum <= target = maximum` (for example SEG-04:
`5 <= 7 = 7`; SEG-06: `3 <= 5 = 5`). The target is a planning aim inside the segment envelope, never a
floor. It is kept as a separate field from the maximum so that a later approved amendment could lower a
planned target below the maximum without redefining the quota; no such amendment exists and no
intermediate value is introduced here. The stopping rule (§4.2, field 12) operates on this target, which
in this candidate is the maximum: recruitment stops when a segment reaches its planned target.

### 4.2 Per-segment records (fields 3, 4, 9–15)

Legend: 3 Eligibility · 4 Screening rules · 9 Required source diversity · 10 Geographic scope ·
11 Research wave · 12 Stopping rule · 13 Evidence threshold · 14 Amendment version · 15 Prior-version
reading.

All eight segments share the following values unless a segment overrides them:

- **10 Geographic scope:** proposed Wave 1 geography is Rías Baixas / Galicia (Spain only). Northern
  Portugal is not fieldable because Portuguese instruments are `NOT_PRODUCED` (`W0-08`). Geography is
  recorded at municipality/province level only; no addresses, postcodes, berth numbers or vessel
  registration numbers. Results do not transfer to other markets without re-testing.
- **12 Stopping rule:** recruitment stops when the segment reaches its planned target, which in this
  candidate is its maximum; a segment may close at saturation once its minimum is met; a segment below its
  minimum at the analysis cut-off is reported under-recruited and
  is never pooled with another segment or back-filled. Saturation is recorded as "no new code in the last
  two interviews"; if not reached it is reported and no saturation claim is made.
- **13 Evidence threshold:** completion evidence only counts when the record meets the countable-record
  definition in `MC10-RESEARCH-PROTOCOL.md` §8.2 (real eligible participant, valid `C1` consent with
  timestamp/language/script version, interview by a trained human under the protocol, completed NOTE-01
  record, pseudonymous ID with segment/language/source/interviewer, real date and duration consistent with
  `C2`, reconciled against the recruitment ledger). Experiment thresholds are the frozen MC-09 records in
  `data/experiments.json`; this contract references them and never redefines them.
- **14 Amendment version:** `MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED` (candidate; parent v1.0.0).
- **15 Prior-version reading:** the preserved v1.0.0 minimum and maximum in §3.1; unchanged.

#### SEG-01 — Recreational motorboat owners

- **3 Eligibility:** owner or purchase decision-maker of a 6–15 m recreational motorboat used for day or
  coastal trips; decides equipment purchases.
- **4 Screening rules:** `SCREEN-01` S1 (purchase-decision role, required), S2 (vessel type/length band),
  S3 (base region), S4 (equipment/service purchase or installation in the last 24 months), S6 (exclude
  marine-electronics manufacturer/distributor/reseller employees and EMBARCARTE/MAREA staff), S7 (record
  other recent market-research participation), S8 (language preference). Universal exclusions apply
  (under 18, vulnerable persons, employees/contractors, no purchase role, cannot give 45–60 minutes,
  purchased/scraped lists).
- **9 Required source diversity:** at least two distinct acquisition source categories where the
  population allows, source recorded per participant, no more than half of the segment's completed cases
  from referrals by a single referrer; gatekeepers introduce, never select.
- **11 Research wave:** enrolled in Wave 1 (exploratory) and completed in Wave 2 if unused Wave-1
  capacity remains. Wave 3 only under an approved amendment.

#### SEG-02 — Sailing yacht owners

- **3 Eligibility:** decision-maker who owns a 7–16 m sailing yacht used for cruising or racing and
  decides equipment purchases.
- **4 Screening rules:** `SCREEN-01` S1 (purchase-decision role, required), S2, S3, S4, S6, S7, S8;
  excludes race-only participation with no cruising equipment spend or no purchase role.
- **9 Required source diversity:** as shared rule; clubs, regattas and sailing associations plus at least
  one non-club source where the population allows.
- **11 Research wave:** Wave 2 only (not in the Wave 1 scope).

#### SEG-03 — Marina-based unattended-vessel owners

- **3 Eligibility:** owner-occupier whose vessel stays afloat unattended for weeks at a marina base and
  who cares about monitoring.
- **4 Screening rules:** `SCREEN-01` S1 (purchase-decision role, required), S2, S3, S4, S6, S7, S8;
  excludes vessel ashore, laid up or unused, and non-responsible parties.
- **9 Required source diversity:** as shared rule; marina-mediated invitation only, with a second source
  category where the population allows.
- **11 Research wave:** enrolled in Wave 1 (exploratory) and completed in Wave 2 if unused Wave-1
  capacity remains.

#### SEG-04 — Marine electronics installers

- **3 Eligibility:** independent or yard installer with at least 5 years active and at least 2 first-party
  brands fitted in the last 24 months; technical decision-maker.
- **4 Screening rules:** `SCREEN-01` S5 (years and brands, required), S2, S3, S4, S6, S7, S8; excludes
  candidates with no independent install history. Interviewed about their own workflow, liability and
  channel economics — never asked to speculate about what boat owners want.
- **9 Required source diversity:** as shared rule; verified directory listings, yards and trade
  associations as distinct source categories.
- **11 Research wave:** enrolled in Wave 1 (exploratory) and completed in Wave 2 if unused Wave-1
  capacity remains. Qualitative-pricing only.

#### SEG-05 — Marine retailers and chandlers

- **3 Eligibility:** marine retailer/chandler with ranging authority for instruments or safety equipment.
- **4 Screening rules:** `SCREEN-01` S5 (years and brands, required for SEG-05), S2, S3, S4, S6, S7, S8;
  excludes retail staff without ranging authority.
- **9 Required source diversity:** as shared rule; direct decision-maker approaches and trade sources as
  distinct categories.
- **11 Research wave:** Wave 2 only (not in the Wave 1 scope). Qualitative-pricing only.

#### SEG-06 — Marina or shipyard operators

- **3 Eligibility:** marina or shipyard operator managing berths, third-party vessels or refit work.
- **4 Screening rules:** `SCREEN-01` S2 (fleet/berth context), S3, S4, S6, S7, S8, plus the operational
  definition; excludes operators with no third-party vessels and no refit responsibility.
- **9 Required source diversity:** as shared rule; the segment is a small, exhaustible population, so a
  single-source sample is a recorded validity risk, never hidden.
- **11 Research wave:** enrolled in Wave 1 (exploratory) and completed in Wave 2 if unused Wave-1
  capacity remains. Qualitative-pricing only.

#### SEG-07 — Charter operators and sailing schools

- **3 Eligibility:** charter organisation or sailing school with 5–30 vessels under management and an
  operational decision role.
- **4 Screening rules:** `SCREEN-01` S1 (purchase-decision role, required), S2, S3, S4, S6, S7, S8;
  excludes fewer than 5 vessels under management.
- **9 Required source diversity:** as shared rule; direct approaches and association-mediated sources as
  distinct categories.
- **11 Research wave:** Wave 2 only (not in the Wave 1 scope).

#### SEG-08 — Fleet managers

- **3 Eligibility:** fleet manager responsible for multi-vessel operations, maintenance and budgets.
- **4 Screening rules:** `SCREEN-01` S1 (purchase-decision role, required), S2 (fleet count), S3, S4, S6,
  S7, S8; excludes candidates with no maintenance or procurement responsibility.
- **9 Required source diversity:** as shared rule; the segment is small, so source variation is recorded
  as a limitation where it cannot be achieved.
- **11 Research wave:** Wave 2 only (not in the Wave 1 scope).

## 5. Ambiguity eliminated — consolidated statement

After approval, the following statements become the single authoritative readings. Before approval they
are the candidate readings only:

1. Minimum per segment: SEG-01 5, SEG-02 5, SEG-03 5, SEG-04 5, SEG-05 5, SEG-06 3, SEG-07 5, SEG-08 4.
2. Target per segment: equal to that segment's maximum (8, 8, 8, 7, 7, 5, 8, 6). It is a planning aim
   inside the segment envelope, never a floor and never higher than the segment maximum.
3. Maximum per segment: SEG-01 8, SEG-02 8, SEG-03 8, SEG-04 7, SEG-05 7, SEG-06 5, SEG-07 8, SEG-08 6.
4. Overall completion requirement: **37 minimum / 57 maximum**.
5. `40–80`: `HISTORICAL_PLANNING_ASPIRATION` only; not a completion requirement and not derivable from the
   quotas.
6. Pricing eligibility: SEG-01, SEG-02, SEG-03, SEG-07 `REACHABLE_AT_PLANNED_MAX`; SEG-04, SEG-05, SEG-06,
   SEG-08 `BELOW_REGISTERED_MINIMUM`. No threshold is reduced.
7. Wave placement: Wave 1 = SEG-01, SEG-03, SEG-04, SEG-06 (18–28 exploratory); Wave 2 = completion of
   all eight segments to 37 minimum / 57 maximum; Wave 3 = optional, approved amendment only.
8. Experiment minimums: unchanged frozen values, referenced from `data/experiments.json`; not quota fields.

## 6. Single effective version rule

1. Every document and every structured dataset that states a segment quota, a segment target, an overall
   target or a pricing-eligibility class must point to **this contract id and version** once it is
   effective.
2. Until the candidate is approved, all documents must point to the preserved v1.0.0 reading and must keep
   the registered defects (PI-01, PI-02, PI-03) recorded. They may cite
   `MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED` only as a candidate.
3. A mixed state — some artefacts on v1.0.0, others on v1.1.0, or a v1.1.0 field used with a v1.0.0 value
   — is a validation failure, not a transitional convenience.
4. The candidate remains `PROPOSED_NOT_EFFECTIVE` until a dated amendment records explicit programme-owner
   approval and independent review. Only then may it be referenced as effective; only a real, recorded
   human approval can produce that state (`APPROVED_FOR_FUTURE_FIELDWORK`), and no agent may confer it.
5. Even when effective, this contract does not authorise fieldwork. Authorization is a separate record
   (`AUTH-MC10-001`) and remains `NOT_GRANTED`.

## 7. Machine-readable contract block (proposed schema contribution)

The block below is a **proposed schema contribution** for the recovery contract D27 and the recovery gate
D31, which are owned by `agent-f-data`. It is not yet consumed by any validator. Top-level keys are
`segmentQuotaContractId`, `version`, `status`, `effective`, `segments`, `totals`, `waves`. All 15 fields
appear per segment. Strings are quoted so the block parses as YAML and as JSON-like data.

```yaml
segmentQuotaContractId: MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED
version: "1.1.0"
parentVersion: "1.0.0"
status: PROPOSED_NOT_EFFECTIVE
effective: false
effectiveDate: null
approvalPresent: false
approvedBy: null
reviewedBy: null
schemasProposedBy: agent-a-methodologist
schemaContributionFor: [D27, D31]
contractSourceDocument: docs/marea/customer-discovery/recovery/methodology/MC10R-PI02-SEGMENT-QUOTA-CONTRACT.md
historicalReadingPreserved: v1.0.0
segments:
  - segmentId: SEG-01
    segmentName: Recreational motorboat owners
    eligibility: "Owner or purchase decision-maker of a 6-15 m recreational motorboat used for day or coastal trips; decides equipment purchases."
    screeningRules: "SCREEN-01 S1 (purchase-decision role required), S2, S3, S4, S6, S7, S8; universal exclusions apply."
    minimumQualitativeInterviews: 5
    targetQualitativeInterviews: 8
    maximumPlannedInterviews: 8
    pricingModuleEligibility: REACHABLE_AT_PLANNED_MAX
    requiredSourceDiversity: "At least two distinct acquisition source categories where the population allows; source recorded per participant; referral cap of half the segment from a single referrer."
    geographicScope: "Rias Baixas / Galicia (Spain only), proposed; northern Portugal not fieldable (W0-08 NOT_PRODUCED)."
    researchWave: "Wave 1 exploratory; completed in Wave 2 if capacity remains."
    stoppingRule: "Stop at maximum; close at saturation after minimum; under-recruitment reported, never pooled or back-filled."
    evidenceThreshold: "Countable record per MC10-RESEARCH-PROTOCOL.md 8.2; experiment thresholds frozen in data/experiments.json."
    amendmentVersion: MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED
    priorVersionReading: { minimum: 5, maximum: 8, version: "1.0.0" }
  - segmentId: SEG-02
    segmentName: Sailing yacht owners
    eligibility: "Decision-maker who owns a 7-16 m sailing yacht used for cruising or racing and decides equipment purchases."
    screeningRules: "SCREEN-01 S1 (purchase-decision role required), S2, S3, S4, S6, S7, S8; excludes race-only participation with no cruising equipment spend."
    minimumQualitativeInterviews: 5
    targetQualitativeInterviews: 8
    maximumPlannedInterviews: 8
    pricingModuleEligibility: REACHABLE_AT_PLANNED_MAX
    requiredSourceDiversity: "At least two distinct acquisition source categories; source recorded per participant; referral cap applies."
    geographicScope: "Rias Baixas / Galicia (Spain only), proposed; northern Portugal not fieldable."
    researchWave: "Wave 2 only."
    stoppingRule: "Stop at maximum; close at saturation after minimum; under-recruitment reported, never pooled or back-filled."
    evidenceThreshold: "Countable record per MC10-RESEARCH-PROTOCOL.md 8.2; experiment thresholds frozen in data/experiments.json."
    amendmentVersion: MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED
    priorVersionReading: { minimum: 5, maximum: 8, version: "1.0.0" }
  - segmentId: SEG-03
    segmentName: Marina-based unattended-vessel owners
    eligibility: "Owner-occupier whose vessel stays afloat unattended for weeks at a marina base and who cares about monitoring."
    screeningRules: "SCREEN-01 S1 (purchase-decision role required), S2, S3, S4, S6, S7, S8; excludes vessel ashore, laid up or unused."
    minimumQualitativeInterviews: 5
    targetQualitativeInterviews: 8
    maximumPlannedInterviews: 8
    pricingModuleEligibility: REACHABLE_AT_PLANNED_MAX
    requiredSourceDiversity: "At least two distinct acquisition source categories where the population allows; marina-mediated invitation plus a second category."
    geographicScope: "Rias Baixas / Galicia (Spain only), proposed; northern Portugal not fieldable."
    researchWave: "Wave 1 exploratory; completed in Wave 2 if capacity remains."
    stoppingRule: "Stop at maximum; close at saturation after minimum; under-recruitment reported, never pooled or back-filled."
    evidenceThreshold: "Countable record per MC10-RESEARCH-PROTOCOL.md 8.2; experiment thresholds frozen in data/experiments.json."
    amendmentVersion: MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED
    priorVersionReading: { minimum: 5, maximum: 8, version: "1.0.0" }
  - segmentId: SEG-04
    segmentName: Marine electronics installers
    eligibility: "Independent or yard installer with at least 5 years active and at least 2 first-party brands fitted in the last 24 months; technical decision-maker."
    screeningRules: "SCREEN-01 S5 (years and brands required), S2, S3, S4, S6, S7, S8; excludes no independent install history."
    minimumQualitativeInterviews: 5
    targetQualitativeInterviews: 7
    maximumPlannedInterviews: 7
    pricingModuleEligibility: BELOW_REGISTERED_MINIMUM
    requiredSourceDiversity: "At least two distinct acquisition source categories where the population allows; verified directory, yard and trade-association sources."
    geographicScope: "Rias Baixas / Galicia (Spain only), proposed; northern Portugal not fieldable."
    researchWave: "Wave 1 exploratory; completed in Wave 2 if capacity remains."
    stoppingRule: "Stop at maximum; close at saturation after minimum; under-recruitment reported, never pooled or back-filled."
    evidenceThreshold: "Countable record per MC10-RESEARCH-PROTOCOL.md 8.2; EXP-MC10-02 minimum 5; pricing below registered minimum."
    amendmentVersion: MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED
    priorVersionReading: { minimum: 5, maximum: 7, version: "1.0.0" }
  - segmentId: SEG-05
    segmentName: Marine retailers and chandlers
    eligibility: "Marine retailer/chandler with ranging authority for instruments or safety equipment."
    screeningRules: "SCREEN-01 S5 (years and brands required), S2, S3, S4, S6, S7, S8; excludes staff without ranging authority."
    minimumQualitativeInterviews: 5
    targetQualitativeInterviews: 7
    maximumPlannedInterviews: 7
    pricingModuleEligibility: BELOW_REGISTERED_MINIMUM
    requiredSourceDiversity: "At least two distinct acquisition source categories where the population allows; direct decision-maker and trade sources."
    geographicScope: "Rias Baixas / Galicia (Spain only), proposed; northern Portugal not fieldable."
    researchWave: "Wave 2 only."
    stoppingRule: "Stop at maximum; close at saturation after minimum; under-recruitment reported, never pooled or back-filled."
    evidenceThreshold: "Countable record per MC10-RESEARCH-PROTOCOL.md 8.2; EXP-MC10-08 minimum 5; pricing below registered minimum."
    amendmentVersion: MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED
    priorVersionReading: { minimum: 5, maximum: 7, version: "1.0.0" }
  - segmentId: SEG-06
    segmentName: Marina or shipyard operators
    eligibility: "Marina or shipyard operator managing berths, third-party vessels or refit work."
    screeningRules: "SCREEN-01 S2, S3, S4, S6, S7, S8 plus the operational definition; excludes no third-party vessels and no refit responsibility."
    minimumQualitativeInterviews: 3
    targetQualitativeInterviews: 5
    maximumPlannedInterviews: 5
    pricingModuleEligibility: BELOW_REGISTERED_MINIMUM
    requiredSourceDiversity: "Small, exhaustible population; source variation recorded as a limitation where it cannot be achieved."
    geographicScope: "Rias Baixas / Galicia (Spain only), proposed; northern Portugal not fieldable."
    researchWave: "Wave 1 exploratory; completed in Wave 2 if capacity remains."
    stoppingRule: "Stop at maximum; close at saturation after minimum; under-recruitment reported, never pooled or back-filled."
    evidenceThreshold: "Countable record per MC10-RESEARCH-PROTOCOL.md 8.2; EXP-MC10-07 minimum 5 and EXP-MC10-09 minimum 3 operators reachable only at the preserved maximum."
    amendmentVersion: MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED
    priorVersionReading: { minimum: 3, maximum: 5, version: "1.0.0" }
  - segmentId: SEG-07
    segmentName: Charter operators and sailing schools
    eligibility: "Charter organisation or sailing school with 5-30 vessels under management and an operational decision role."
    screeningRules: "SCREEN-01 S1 (purchase-decision role required), S2, S3, S4, S6, S7, S8; excludes fewer than 5 vessels under management."
    minimumQualitativeInterviews: 5
    targetQualitativeInterviews: 8
    maximumPlannedInterviews: 8
    pricingModuleEligibility: REACHABLE_AT_PLANNED_MAX
    requiredSourceDiversity: "At least two distinct acquisition source categories where the population allows; direct and association-mediated sources."
    geographicScope: "Rias Baixas / Galicia (Spain only), proposed; northern Portugal not fieldable."
    researchWave: "Wave 2 only."
    stoppingRule: "Stop at maximum; close at saturation after minimum; under-recruitment reported, never pooled or back-filled."
    evidenceThreshold: "Countable record per MC10-RESEARCH-PROTOCOL.md 8.2; experiment thresholds frozen in data/experiments.json."
    amendmentVersion: MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED
    priorVersionReading: { minimum: 5, maximum: 8, version: "1.0.0" }
  - segmentId: SEG-08
    segmentName: Fleet managers
    eligibility: "Fleet manager responsible for multi-vessel operations, maintenance and budgets."
    screeningRules: "SCREEN-01 S1 (purchase-decision role required), S2 (fleet count), S3, S4, S6, S7, S8; excludes no maintenance or procurement responsibility."
    minimumQualitativeInterviews: 4
    targetQualitativeInterviews: 6
    maximumPlannedInterviews: 6
    pricingModuleEligibility: BELOW_REGISTERED_MINIMUM
    requiredSourceDiversity: "Small population; source variation recorded as a limitation where it cannot be achieved."
    geographicScope: "Rias Baixas / Galicia (Spain only), proposed; northern Portugal not fieldable."
    researchWave: "Wave 2 only."
    stoppingRule: "Stop at maximum; close at saturation after minimum; under-recruitment reported, never pooled or back-filled."
    evidenceThreshold: "Countable record per MC10-RESEARCH-PROTOCOL.md 8.2; pricing below registered minimum."
    amendmentVersion: MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED
    priorVersionReading: { minimum: 4, maximum: 6, version: "1.0.0" }
totals:
  minimumCompletedInterviews: 37
  maximumAchievableCompletedInterviews: 57
  targetCompletedInterviews: 57
  derivedFromSegmentQuotas: true
  historicalPlanningAspiration:
    label: HISTORICAL_PLANNING_ASPIRATION
    minimum: 40
    maximum: 80
    derivableFromSegmentQuotas: false
    completionRequirement: false
    effective: false
  pricingRegisteredMinimumPerSegment: 8
  pricingReachableAtPlannedMaxSegments: [SEG-01, SEG-02, SEG-03, SEG-07]
  pricingBelowRegisteredMinimumSegments: [SEG-04, SEG-05, SEG-06, SEG-08]
waves:
  - waveId: WAVE-1
    waveLabel: "Wave 1"
    historicalLabel: "D2 3.3 Wave 1"
    kind: EXPLORATORY_PILOT
    segments: [SEG-01, SEG-03, SEG-04, SEG-06]
    totalMinimum: 18
    totalMaximum: 28
    satisfiesFullStudyCompletion: false
    satisfiesMc10Acceptance: false
    completionRole: EXPLORATORY_NOT_COMPLETION
  - waveId: WAVE-2
    waveLabel: "Wave 2"
    historicalLabel: "D2 3.3 Wave 2"
    kind: MAIN_STUDY_COMPLETION
    segments: [SEG-01, SEG-02, SEG-03, SEG-04, SEG-05, SEG-06, SEG-07, SEG-08]
    studyMinimum: 37
    studyMaximum: 57
    includesWave1Credit: true
    additionalInterviews: REMAINING_REQUIREMENT_AFTER_WAVE_1_CREDIT
    satisfiesFullStudyCompletion: true
    satisfiesMc10Acceptance: false
  - waveId: WAVE-3
    waveLabel: "Wave 3"
    historicalLabel: "D2 3.3 Wave 3"
    kind: OPTIONAL_EXTENSION
    segments: []
    requiresApprovedQuotaExpansionAmendment: true
    satisfiesFullStudyCompletion: false
    effective: false
```

The block is deliberately `effective: false`, `approvalPresent: false`, `effectiveDate: null`. A gate that
reads any other value from this candidate is reading a claim this document does not make.

## 8. Status transitions authorised by this contract

| From | To | Who can effect it | Conditions |
| --- | --- | --- | --- |
| `PROPOSED_NOT_EFFECTIVE` | `APPROVED_FOR_FUTURE_FIELDWORK` | programme owner, recorded in a dated amendment | explicit approval, independent review, new frozen version; an agent cannot do this |
| `PROPOSED_NOT_EFFECTIVE` | `REJECTED` | programme owner | reasoned rejection recorded; v1.0.0 stays effective |
| `PROPOSED_NOT_EFFECTIVE` | `SUPERSEDED` | programme owner | a later version is approved; v1.1.0 keeps its history |
| any | `DRAFT` | nobody retroactively | statuses are not downgraded to hide a recorded state |

No transition to `APPROVED_FOR_FUTURE_FIELDWORK` has occurred. Even after approval, fieldwork remains
blocked until `AUTH-MC10-001` is granted and every pre-fieldwork gate item is complete.

## 9. Dependencies, limitations and items for the independent auditor

**Dependencies.** D5 (`MC10R-PI01-SAMPLING-RECONCILIATION.md`) supplies the arithmetic basis for the
37/57 totals and the historical aspiration label; D8 records the dated protocol amendment that would make
these clauses binding; `agent-f-data` must align D27/D31 with the §7 keys and must decide how to replace
the existing research gate's CR-33 expectation that the 40/80 defect remains recorded — after approval,
not before; the programme owner must approve.

**Honest limitations.** (a) The contract cannot be consumed by any validator yet; §7 is a proposal, and
its key names may change when D27 is written. (b) The "target = segment maximum" reading is the candidate's
explicit resolution of v1.0.0's ambiguous `target 8` wording; it is not a value change but it is a
meaning change and an auditor should test whether it is acceptable to the owner. (c) The 15-field/14-field
discrepancy between D2 §5 and the directive is recorded, not hidden. (d) The wave placement of SEG-02,
SEG-05, SEG-07 and SEG-08 in Wave 2 is derived by exclusion from D2 §3.3's Wave 1 list and Wave 2
definition; it is a proposal pending approval. (e) No interview, participant, consent or price response
exists, so nothing in this contract is evidenced by data.

**What the independent auditor should probe.** (1) Compare every number in §3.1, §4.1 and §7 with
`research-status.json` `segmentCounts` and the MC-09 plan §2 table — all nine numbers must match. (2)
Confirm the candidate status, `effective: false` and null approval fields, and that no document claims the
contract is in force. (3) Confirm the canonical segment names match D2 §3.2 exactly and were not redefined.
(4) Confirm the pricing classifications match D2 §3.4 exactly and that no threshold was reduced. (5)
Confirm the YAML block parses and that every segment carries all 15 fields. (6) Confirm the historical
v1.0.0 table in D5 §7 is unchanged.

## 10. Provenance

This contract was produced from the following real sources read in full: `MC10R-RECOVERY-EXECUTION-PLAN.md`
§3.1–§3.4, `data/research-status.json`, `MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` §1–§3, `MC10-RESEARCH-PROTOCOL.md`
§2–§3 and §15, `data/experiments.json`, `validation-experiments.json`, `MC10-RECRUITMENT-PLAN.md` §1–§2,
`MC10-RESEARCH-SCOPE.md` §4, `MC10-DECISION-REGISTER.md` (OD-09/OD-10). The arithmetic and file hashes used
by D5 are reproduced there in §11 and were computed by the command recorded in that section. No value in
this document was estimated, and no synthetic example appears in it.

**Machine-readable block verification.** The §7 YAML block was parsed on 2026-11-01 with Python 3.12.0 and
PyYAML 6.0.3. Real output: `yaml_blocks 1`; all seven required top-level keys present; `segments 8` and
`waves 3`; all 8 segments carry the 15 fields (`field_count_first_segment 15`); `min_sum 37` and
`max_sum 57`; `target_equals_max True`; `min_le_target_le_max True`; `wave_ids [('WAVE-1', 'Wave 1'),
('WAVE-2', 'Wave 2'), ('WAVE-3', 'Wave 3')]`; `wave1_min_max 18 28`; historical aspiration
`HISTORICAL_PLANNING_ASPIRATION` with `effective False`; the eight canonical names match D2 §3.2. The block
is a proposal for D27/D31 and is not yet consumed by any gate.
