# MC-10R — PI-03 pricing feasibility: registered n >= 8 minimum versus preserved segment quotas (D7)

| Field | Value |
| --- | --- |
| Document ID | MC-10R / D7 / `MC10R-PI03-PRICING-FEASIBILITY` |
| Programme | EMBARCARTE / MAREA |
| Milestone | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36) |
| Recovery contract | `MAREA-MC10R-CUSTOMER-DISCOVERY-RECOVERY`, version `1.0.0` |
| Recorded defect addressed | PI-03 (`BLOCKING_BEFORE_PRICING_ANALYSIS`, `data/research-status.json`) |
| Experiments in scope | `EXP-MC10-04` (Gabor–Granger), `EXP-MC10-05` (Van Westendorp) |
| Constructs in scope | `CONSTRUCT-01`, `CONSTRUCT-02` (`data/pricing-ladders.json`) |
| Branch | `feature/marea-mc10r-fieldwork-recovery` (base `d1ac69a4873222fbde93dcf69c360a5e0ca1542d`) |
| Stacked PR target | `feature/marea-mc10-primary-customer-discovery` (PR #16 base branch; PR #16 is not modified) |
| Date | 2026-11-01 |
| Owner | `agent-b-pricing` — Pricing and Behavioral Research Economist |
| Write scope | `docs/marea/customer-discovery/recovery/pricing/` only |
| Recovery work status (D7 deliverable) | `READY_FOR_OWNER_REVIEW` |
| Programme recovery work status (D2) | `IN_PROGRESS` |
| External authorization status | `NOT_GRANTED` (`AUTH-MC10-001`) |
| Fieldwork readiness | `PARTIALLY_READY` |
| Document status | `PROPOSED_NOT_EFFECTIVE` |
| Recommendation status | `PROPOSED_NOT_EFFECTIVE` — requires programme-owner approval; no agent may confer it |
| Approved prices | `0` |
| Is not | Not a price list · not an offer · not a price approval · not a willingness-to-pay measurement · not a demand curve · not a conversion, elasticity or revenue estimate |

> **Status banner — classification, not fieldwork permission and not a price.**
> This document is `PROPOSED_NOT_EFFECTIVE`. It resolves recorded planning defect PI-03 by classifying
> unreachable pricing cells and preserving the registered `n >= 8` minimum; it never reduces a threshold.
> `EXP-MC10-04` and `EXP-MC10-05` were not executed: `0` modules, `0` price responses, `0` participants.
> MC-10 remains `BLOCKED` because `AUTH-MC10-001` is `NOT_GRANTED`; external outreach remains
> `NOT_GRANTED`; `APPROVED_PRICES = 0`; `WTP_COMMERCIALLY_VALIDATED = false`. Nothing in this document
> permits fieldwork, licenses a price or licenses a later quantitative stage.

```
DOCUMENT_STATUS                    = PROPOSED_NOT_EFFECTIVE
RECOMMENDED_OPTION                 = OPTION_2_KEEP_PRESERVED_QUOTA_AND_CLASSIFY
RECOMMENDED_OPTION_STATUS          = PROPOSED_NOT_EFFECTIVE
REQUIRED_APPROVAL                  = programme owner (NOT_GRANTED)
PRICING_MINIMUM_EXP_MC10_04        = 8  (UNCHANGED)
PRICING_MINIMUM_EXP_MC10_05        = 8  (UNCHANGED)
THRESHOLD_REDUCTION                = PROHIBITED
EXTERNAL_AUTHORIZATION_STATUS      = NOT_GRANTED
FIELDWORK_STATUS                   = BLOCKED
FIELDWORK_READINESS                = PARTIALLY_READY
PARTICIPANTS / INTERVIEWS / PRICE_RESPONSES = 0
EXPERIMENTS_EXECUTED               = 0
WTP_STATED_PREFERENCE_OBSERVED     = false
WTP_COMMERCIALLY_VALIDATED         = false
APPROVED_PRICES                    = 0
PROFITABILITY                      = NOT_ESTABLISHED
```

## 0. How to read this document

This document does one thing: it reconciles a recorded planning defect between two frozen artefacts without
touching either threshold — the registered pricing minimum evidence (`n >= 8` per segment per construct for
`EXP-MC10-04` and `EXP-MC10-05`) and the preserved per-segment quota maxima (57 total, with four segments
capped below 8). It is a feasibility and classification record, not research.

The forbidden transformations this document exists to prevent:

1. **"The quota cap is 7, therefore the pricing minimum for that segment is 7."** The quota is a planning
   envelope; the registered analysis minimum stays `8`. A segment that cannot reach 8 is reported
   `BELOW_REGISTERED_MINIMUM`, it is not redefined.
2. **"The ladder and the module were designed and frozen, therefore price sensitivity was measured."**
   A frozen instrument is not a result (see `pricing/MC10-GABOR-GRANGER.md` §0 and
   `pricing/MC10-VAN-WESTENDORP.md` §0, which this document does not weaken).
3. **"Installers and retailers gave price opinions, therefore a price curve exists."** Qualitative price
   objections are opinions, not stated-preference responses and not a price curve.
4. **"A stated-preference band is a validated willingness to pay or an approved price."** It is a
   `HYPOTHESIS` for later design; `APPROVED_PRICES = 0` and `WTP_COMMERCIALLY_VALIDATED = false`.
5. **"A zero/as-yet-unadministered module can be reported `PASS`."** Zero responses are absence of data,
   and the verdict state is `BLOCKED` (`NOT_EXECUTED`), never `PASS`.

Zero responses are an absence of data. Nothing in this document says that any segment accepts, rejects or
is insensitive to any price.

## 1. Scope, binding sources, and required-content map

### 1.1 Required content map

| # | Required content of D7 | Section |
| ---: | --- | --- |
| 1 | Source register: exact registered minimums and exact segment maxima; arithmetic verification | §2 |
| 2 | Three separate activities (qualitative objections / stated preference / later quantitative pricing) and their evidentiary status | §3 |
| 3 | `segment × experiment × construct × required n × planned n × reachable × intended interpretation` matrix; all eight segments; both constructs; Wave 1 columns | §4 |
| 4 | Evaluation of option 1 (expand quota) versus option 2 (keep quota, classify); recommendation `PROPOSED_NOT_EFFECTIVE`; no threshold reduction | §5 |
| 5 | Raw price-ladder provenance preserved; self-freeze hash; no modification without dated amendment | §6 |
| 6 | Interpretation limits; no approved prices | §7 |
| 7 | Validator expectations (what the recovery gate must reject) | §8 |
| — | Machine-readable keys for `agent-f-data` | §9 |
| — | Traceability, reproducibility, open items, status effect | §10–§13 |

### 1.2 Binding sources (read, quoted, never modified)

| Source | What is bound by it |
| --- | --- |
| `docs/marea/customer-discovery/recovery/MC10R-RECOVERY-EXECUTION-PLAN.md` (D2) §2, §3.3, §3.4, §8 | Recovery status strings; preserved quotas; Wave 1 scope; canonical pricing reachability classification and Wave 1 statement; prohibitions |
| `docs/marea/customer-discovery/recovery/methodology/MC10R-PI01-SAMPLING-RECONCILIATION.md` (D5) | Sampling arithmetic reconciliation: preserved quotas sum to 37/57 (not 40–80); pricing eligibility unchanged at `BELOW_REGISTERED_MINIMUM` for four segments; PI-03 remains a separate defect |
| `docs/marea/customer-discovery/recovery/methodology/MC10R-PI02-SEGMENT-QUOTA-CONTRACT.md` (D6) | Candidate segment-quota contract: per-segment `maximumPlannedInterviews` and `pricingModuleEligibility`, `pricingRegisteredMinimumPerSegment = 8`, first-stage scope `SEG-01/03/04/06` at `18–28` — values machine-compared with §4 in §11.1. D6 was still being edited during the write window, so D7 binds to the D2 canonical values, never to D6 internal key labels |
| `docs/marea/customer-discovery/data/experiments.json` | Frozen `EXP-MC10-04` / `EXP-MC10-05` registered minimum evidence, thresholds, `thresholdSha256`, `executionStatus = NOT_EXECUTED`, zero evidence, gate closed |
| `docs/marea/market-validation/data/validation-experiments.json` (MC-09 registry) | Origin of the frozen experiment records (`experiments.json.frozenFrom`); quoted to show the registered wording was not altered |
| `docs/marea/customer-discovery/data/research-status.json` | Preserved quotas (`plannedMin`/`plannedMax`), zero participant counts, `pricing` zero block, recorded PI-03 defect text, `commercialInvariants.approvedPrices = 0` |
| `docs/marea/customer-discovery/data/pricing-ladders.json` | Frozen constructs, ladders, buy-response scale, Van Westendorp questions, provenance, `freeze.constructsSha256`; `administered = false`, `responses = []`, `approvedPrice = false` |
| `docs/marea/customer-discovery/pricing/MC10-GABOR-GRANGER.md` | `WTP-INS-01` design: 5-point ladder, fixed scale, analysis ladders L1–L5, 4-of-5 monotonicity rule, `>=60 s` quality filter, no price approval |
| `docs/marea/customer-discovery/pricing/MC10-VAN-WESTENDORP.md` | `WTP-INS-02` design: four questions, consistency ordering, `PMCM`/`PME`, non-degeneracy, per-construct evaluation |
| `docs/marea/customer-discovery/pricing/MC10-SUBSCRIPTION-ATTITUDES.md` | Qualitative objection codebook (`SUB-01…SUB-11`, `ALT-01…ALT-07`) — the qualitative lane, never a price curve |
| `docs/marea/customer-discovery/MC10-EXPERIMENT-RESULTS.md` §4–§5, §11 | Milestone-level `BLOCKED` classification of both pricing experiments; threshold freeze rule; PI-03 recorded |
| `docs/marea/customer-discovery/review/MC-10-REVIEW.md` §6 | Independent recomputation of the pricing-ladder self-freeze (`bfa09ebc904a66ba65961864` — match) |

### 1.3 Terms used in the matrix

- **`requiredN`** = the registered analysis minimum for the cell, `8`. It is fixed by the frozen registry and
  is never reduced. It is *per segment per construct/configuration*.
- **`plannedN`** = the preserved per-segment **maximum** completed interviews from the quota table (D2 §3.3).
  It is an envelope **cap**, not a guarantee and not an entitlement; the corresponding minima are in §2.3.
- **`plannedNWave1`** = the Wave 1 maximum for that segment (D2 §3.3 Wave 1 table), or `0` when the segment
  is not in Wave 1. Wave 1 is `SEG-01`, `SEG-03`, `SEG-04`, `SEG-06` only.
- **`reachable`** = the full-study classification, using exactly the two canonical D2 §3.4 strings:
  `REACHABLE_AT_PLANNED_MAX` or `BELOW_REGISTERED_MINIMUM`.
- **`wave1ReachableIfAllPlannedComplete`** = `true` only when `plannedNWave1 >= 8`; it is conditional on
  eight of eight planned pricing-module interviews completing **both** constructs.
- **`experimentState`** = `NOT_EXECUTED`, the canonical `executionStatus` in `experiments.json`; the
  corresponding `resultStatus` is `BLOCKED` and the evidence block is `participants: 0, validCases: 0,
  responses: 0` for both experiments.
- **cell key format** = `SEG-0N__EXP-MC10-0M__CONSTRUCT-0P`; exactly `32` cells
  (`8 segments × 2 experiments × 2 constructs`).
- **D6 alignment** = the candidate segment-quota contract (D6) carries the same first-stage scope
  (`SEG-01/03/04/06`, `18–28`), the same per-segment `maximumPlannedInterviews` and the same
  `pricingModuleEligibility`. D6 was still being edited during the write window (its internal stage labels
  changed between revisions), so this document uses only the D2 canonical values and names —
  `plannedNWave1` is the D2 Wave-1 maximum, and D6's `maximumPlannedInterviews` is this document's
  `plannedN`. Every D6 revision observed concurred on the values; a later D6 revision that disagrees must
  be reconciled to D2 §3.3/§3.4 by the Lead.

## 2. Recorded defect PI-03 — source register and arithmetic verification

### 2.1 The recorded defect (verbatim)

From `data/research-status.json` → `planningInconsistencies`:

> `PI-03`, severity `BLOCKING_BEFORE_PRICING_ANALYSIS`:
> "EXP-MC10-04/05 require n>=8 per segment per construct, but preserved quotas cap SEG-04 at 7, SEG-05 at
> 7, SEG-06 at 5 and SEG-08 at 6. A compliant pricing result is unreachable for those segments without an
> amendment."
>
> Resolution: "Either amend the quotas or report those segments as BELOW_REGISTERED_MINIMUM. No silent
> reduction of the minimum."

This document takes the second recorded path (classify), evaluates the first path (amend) in §5, and
performs neither silently.

### 2.2 Exact registered minimums for `EXP-MC10-04` and `EXP-MC10-05`

From the frozen registry mirror `data/experiments.json` (identical wording to the MC-09 registry
`docs/marea/market-validation/data/validation-experiments.json`, from which it was frozen):

`EXP-MC10-04` — `minimumEvidence`:

> "Gabor-Granger ladder with at least five price points per configuration (hypothesis figures only, never
> shown as orderable), every participant answering all points; **n>=8 per segment per configuration**.
> Buy-response scale fixed before fielding. Price ladders derived from MC-09 price observations, not
> invented on the day."

`EXP-MC10-04` — `decisionThreshold` (progression, and the explicit later-stage sample):

> "Indicative only in MC-10: a monotone demand curve and a 50% intent price interval recorded per segment.
> **No price may be approved from this experiment.** PASS for progression means the data are internally
> consistent (monotone decline in at least 4 of 5 ladders, no participant answering in under 60 seconds)
> and produce a testable range for a **later quantitative study with n>=100 per segment**. FAIL:
> non-monotone or unusable responses in the majority of ladders."

`EXP-MC10-05` — `minimumEvidence`:

> "All four Van Westendorp questions answered per construct; **n>=8 per segment per construct**; consistency
> check (too cheap < bargain < expensive < too expensive) enforced and violations recorded, not silently
> corrected."

`EXP-MC10-05` — `decisionThreshold`:

> "PASS (usable price structure): >=70% of responses are internally consistent and the sample produces a
> non-degenerate acceptable range (range exists and is bounded by at least two responses on each side).
> FAIL: fewer than 50% consistent responses, or answers effectively uninterpretable because participants
> cannot separate hardware, software and installation cost."

Freeze evidence that these registered minimums were not altered after registration:

| Experiment | `thresholdSha256` in `experiments.json` | Frozen from |
| --- | --- | --- |
| `EXP-MC10-04` | `9003cbc60cac89b900300466d67f21fb8a7dfbac253d3e5b51520776152db274` | `docs/marea/market-validation/data/validation-experiments.json` (`MC-09-REGISTRY-1.0.0`) |
| `EXP-MC10-05` | `5d6d71906b77afb0594195c6163b63bc9d9031878cbe48a3f36e174d2a24b976` | `docs/marea/market-validation/data/validation-experiments.json` (`MC-09-REGISTRY-1.0.0`) |

Per `MC10-EXPERIMENT-RESULTS.md` §11, editing the registered threshold would break the stored hash and fail
the research-integrity gate; a legitimate change requires a dated amendment, a new frozen version and
independent review. No such amendment exists, so the minimum is **`8`, unchanged**.

### 2.3 Exact segment maxima from the preserved quota table

Preserved historical quotas, `MC-09` v1.0.0, as registered in D2 §3.3 and mirrored in
`data/research-status.json` → `segmentCounts` (`plannedMin`/`plannedMax`; both sources agree exactly):

| Segment | Canonical name | Preserved min | Preserved max |
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

Arithmetic check of the preserved table itself:
`5+5+5+5+5+3+5+4 = 37` ✓ and `8+8+8+7+7+5+8+6 = 57` ✓ — the table is internally consistent; the defect is
between this table and the registered pricing minimum, not a transcription error.

Wave 1 preserved scope (D2 §3.3; experimental pilot, not the full study):

| Segment | Wave 1 min | Wave 1 max |
| --- | ---: | ---: |
| SEG-01 | 5 | 8 |
| SEG-03 | 5 | 8 |
| SEG-04 | 5 | 7 |
| SEG-06 | 3 | 5 |
| **Wave 1 total** | **18** | **28** |

### 2.4 Arithmetic verification of the defect

Registered minimum `8` versus preserved maximum, per segment:

| Segment | Preserved max | Registered n | max − n (margin) | n − max (deficit) | Reachability (D2 §3.4) |
| --- | ---: | ---: | ---: | ---: | --- |
| SEG-01 | 8 | 8 | 0 | 0 | `REACHABLE_AT_PLANNED_MAX` |
| SEG-02 | 8 | 8 | 0 | 0 | `REACHABLE_AT_PLANNED_MAX` |
| SEG-03 | 8 | 8 | 0 | 0 | `REACHABLE_AT_PLANNED_MAX` |
| SEG-04 | 7 | 8 | **−1** | **1** | `BELOW_REGISTERED_MINIMUM` |
| SEG-05 | 7 | 8 | **−1** | **1** | `BELOW_REGISTERED_MINIMUM` |
| SEG-06 | 5 | 8 | **−3** | **3** | `BELOW_REGISTERED_MINIMUM` |
| SEG-07 | 8 | 8 | 0 | 0 | `REACHABLE_AT_PLANNED_MAX` |
| SEG-08 | 6 | 8 | **−2** | **2** | `BELOW_REGISTERED_MINIMUM` |

Literal verification of the four recorded inequalities:

- `SEG-04`: `7 < 8` → short by `8 − 7 = 1` ✓
- `SEG-05`: `7 < 8` → short by `8 − 7 = 1` ✓
- `SEG-06`: `5 < 8` → short by `8 − 5 = 3` ✓
- `SEG-08`: `6 < 8` → short by `8 − 6 = 2` ✓

Aggregate cross-checks (all confirmed by the recorded node command in §11):

- Sum of the four below-minimum maxima: `7 + 7 + 5 + 6 = 25`.
- Required for four compliant segments: `4 × 8 = 32`.
- Total shortfall: `32 − 25 = 7 = 1 + 1 + 3 + 2` ✓.
- If all eight segments had to reach 8: `8 × 8 = 64`, which exceeds the preserved total maximum by
  `64 − 57 = 7` — the same 7, expressed against the envelope rather than against the four segments ✓.
- Reachable segments: `4 × 8 = 32`; preserved maximum minus that: `57 − 32 = 25`, exactly the sum of the
  four unreachable maxima ✓.
- Preserved minima of the four below-minimum segments: `5 + 5 + 3 + 4 = 17`; raising those minima to 8
  would add `3 + 3 + 5 + 4 = 15` interviews (used in option 1, §5).
- Margin column sum: `0 + 0 + 0 − 1 − 1 − 3 + 0 − 2 = −7 = 57 − 64` ✓.

**Conclusion of §2.4.** For `SEG-04`, `SEG-05`, `SEG-06` and `SEG-08`, no number of completed interviews
within the preserved quota can reach the registered `n >= 8`; the defect is arithmetic, not operational.

### 2.5 Wave 1 arithmetic

Wave 1 has four segments and `18–28` total interviews (`5+5+5+3 = 18`; `8+8+7+5 = 28`) ✓.

- Pricing-experiment-eligible Wave 1 maximum: `SEG-01 + SEG-03 = 8 + 8 = 16`.
- Qualitative-pricing-only Wave 1 maximum: `SEG-04 + SEG-06 = 7 + 5 = 12`.
- Check: `16 + 12 = 28` = Wave 1 maximum ✓.
- Wave 1 below-minimum cells: `SEG-04 7 < 8` (1 short) and `SEG-06 5 < 8` (3 short) ✓.
- **Zero attrition margin in Wave 1.** For `SEG-01` and `SEG-03`, Wave 1 maximum `8` equals required `8`
  exactly: all eight planned interviews must complete the pricing module **and both constructs** for the
  cell to reach `n = 8`. One drop-out, one incomplete module or one unusable construct leaves that cell
  below the registered minimum.

### 2.6 What PI-03 is and is not

- It **is** a planning defect (`BLOCKING_BEFORE_PRICING_ANALYSIS`): a registered analysis minimum cannot be
  met under the preserved completion envelope for four of eight segments.
- It **is not** a finding about those segments, their prices, their willingness to pay or their commercial
  potential. No data exists.
- It **is not** evidence that the minimum should change. The recorded resolution explicitly forbids a silent
  reduction; changing `8` would be a threshold amendment under `D-031`/`IV-*` discipline and is not
  proposed anywhere in this document.
- It **is not** repaired by MC-10R. MC-10R records the classification and evaluates the options; the
  programme owner decides, and only a dated amendment can change the quota contract.

## 3. Three fundamentally different activities, never conflated

The pricing question in MC-10 involves three activities with different instruments, different populations,
different sample requirements and radically different evidentiary weight. They must never be presented as
one "pricing research" result.

### 3.1 (A) Qualitative price objections — opinions, never a price curve

**What it is.** Semi-structured interview content in which a real eligible participant describes price
objections, price expectations, existing spend, installation or channel cost barriers, retailer margin
perceptions or resale-price considerations, in their own words, coded against a fixed codebook
(`MC10-SUBSCRIPTION-ATTITUDES.md` §10: `SUB-01 … SUB-11`, `ALT-01 … ALT-07`; `GUIDE-01` qualitative block).

**Instruments / sources.** `GUIDE-01` qualitative block; the subscription-attitude block and objection
codebook; the `EXP-MC10-02` installer go/no-go requirements and liability statements; `EXP-MC10-08` retailer
margin/returns/support stance; `EXP-MC10-09` owner/operator incident needs; `EXP-MC10-10` trust barriers.
These are the registered experiments that legitimately produce pricing-adjacent qualitative evidence for
intermediary and operator segments.

**Eligible population.** Whatever segment is actually interviewed under an authorized, quota-compliant
recruitment; no pricing minimum applies because no price is measured.

**Sample requirement.** The relevant registered qualitative minimum of the host experiment (for example
`EXP-MC10-02`: minimum 5 installers with the stated experience criteria; `EXP-MC10-08`: minimum 5
ranging-authorized retailers). **No `n >= 8` pricing minimum and no price output is involved.**

**Evidentiary status in MC-10R.** `NOT_EXECUTED`. Zero interviews, zero coded units, zero verbatim
excerpts, zero objection codes observed exist in this repository or anywhere else. For `SEG-04`, `SEG-05`,
`SEG-06` and `SEG-08` this is the **only** pricing-related lane that remains available under the preserved
quota — and it too is currently empty.

**May support.** Objection taxonomy, hypothesis generation, instrument refinement, design of a later
properly registered study, channel-requirement statements.

**May never support.** A price curve, a 50 % intent band, an acceptable range, willingness to pay,
elasticity, conversion, revenue, price approval, or any claim that a segment "would pay X".

### 3.2 (B) Stated-preference exercises — a designed experiment with its own sample rule

**What they are.** Two frozen, pre-registered stated-preference instruments:

| Item | `EXP-MC10-04` (Gabor–Granger) | `EXP-MC10-05` (Van Westendorp) |
| --- | --- | --- |
| Instrument | `WTP-INS-01` | `WTP-INS-02` |
| Frozen payload | `data/pricing-ladders.json` → `constructs[].ladder` (5 points) | `data/pricing-ladders.json` → `constructs[].vanWestendorpQuestions` (4 questions) |
| Eligible populations (registered `segment` text) | "Sailing owners, recreational motorboat owners and marina-based owners; installers asked about the resale price they could defend to a customer." | "B2C owners (sailing, motorboat, marina-based) and B2B operators (charter, fleet managers) asked separately about software and about hardware-plus-service constructs." |
| Administered constructs | `CONSTRUCT-01`, `CONSTRUCT-02` (both frozen constructs; every participant answers all points of each administered ladder) | `CONSTRUCT-01`, `CONSTRUCT-02` (four questions per construct, in a separate section after the Gabor–Granger ladder) |
| Comparable concepts | Not poolable across constructs: `CONSTRUCT-01` is an annual subscription, `CONSTRUCT-02` a first-year total of hardware + 12 months service. Same wording and same frozen ladder for every participant within a construct. | Same two constructs; responses recorded and analysed separately; no pooling of constructs, no cross-currency conversion, no mid-point substitution. |
| Tax treatment | `VAT_INCLUDED_CONSUMER_RETAIL_HYPOTHESIS` — a pre-registered research framing, **not** a tax determination and not tax advice. | Same framing hypothesis; `CONSTRUCT-02` inherits the MC-09 `WATCH` `vatBasis OPEN` caveat, so inclusive framing is itself a hypothesis. |
| Installation treatment | Installation excluded from the tested unit and restated in the description. | Installation excluded; the mandatory basis probe records whether the participant included installation, and basis mismatch makes an answer unusable rather than repairable. |
| Own sample requirement | **`n >= 8` per segment per configuration**, plus `>= 5` frozen points, fixed buy-response scale, every participant answering every point, `>= 60 s` per point quality filter, and the pre-registered 4-of-5 monotonicity rule for progression. | **`n >= 8` per segment per construct**, plus all four questions answered, basis recorded per answer, strict consistency ordering, `>= 70 %` consistent for `PASS`, non-degenerate range supported by `>= 2` respondents each side. |
| Registered verdict rule | `PASS` for progression is a *data-consistency* gate (indicative), never a price. `FAIL` if non-monotone/unusable in the majority of ladders. | `PASS` is a usable-price-structure gate (indicative); `FAIL` below 50 % consistency or uninterpretable basis; `INCONCLUSIVE` between, defaulting to `INCONCLUSIVE` never `PASS`. |
| Current state | `NOT_EXECUTED`, `BLOCKED`; `0` ladders completed; `0` responses. | `NOT_EXECUTED`, `BLOCKED`; `0` modules; `0` raw answers; ranges `NOT_COMPUTED`. |

**Construct operationalisation.** The registered `EXP-MC10-04` hypothesis names a "reference NAV+HUB
configuration" and a "monitoring configuration". The frozen MC-10 pre-registration operationalises those
phrases as `CONSTRUCT-01` and `CONSTRUCT-02` in `data/pricing-ladders.json`. This document adopts the frozen
constructs and does not re-define, re-map or re-label them; any future concept-ID mapping is an instrument
matter (D2 §3.6, IV-09), not a pricing-threshold matter, and cannot change the `n >= 8` requirement.

**Evidentiary status in MC-10R.** `NOT_EXECUTED` for every cell and every segment. Even if authorization
existed, the preserved quota makes a compliant cell arithmetically impossible for `SEG-04`, `SEG-05`,
`SEG-06` and `SEG-08` (§2). What an executed, compliant cell could produce is a labelled `HYPOTHESIS`
(the 50 % intent band or the acceptable range), never a price and never commercial WTP.

### 3.3 (C) Later quantitative commercial pricing — separately authorized, not inferable

**What it is.** A distinct, later, quantitative pricing study that could estimate demand, conversion,
elasticity or revenue with defensible uncertainty only at a scale this exploratory design cannot reach.

**Registered trigger and scale.** The `EXP-MC10-04` registered threshold permits only the *design* of a
"later quantitative study with **n >= 100 per segment**". A later stage would require its own authorization,
its own instrument freeze, its own sampling plan and its own budget; none exists.

**Evidentiary status in MC-10R.** Not designed, not frozen, not authorized, not executed: external
authorization `NOT_GRANTED`; `EXPERIMENTS_EXECUTED = 0`; `PROFITABILITY = NOT_ESTABLISHED`; no cost floor
exists. Any quantitative commercial claim today would be fabricated.

**May never be inferred from (A) or (B).** A qualitative objection is not a demand observation; a
stated-preference band is not a purchase; a small purposive sample is not a probability sample; and an
`n >= 8` cell cannot be scaled up by extrapolation into an `n >= 100` estimate.

### 3.4 Forbidden conversions between the three activities

| # | Forbidden conversion | Why it is prohibited |
| ---: | --- | --- |
| F1 | (A) qualitative price objections → a price curve, band or "acceptable price" | Opinions about hypothetical prices are not stated-preference responses; the instruments and sample rules differ |
| F2 | (A) qualitative evidence → satisfaction of the `n >= 8` pricing minimum | The minimum is per experiment per segment per construct; qualitative codes are not pricing-module units |
| F3 | (B) stated-preference band → validated willingness to pay or an approved price | Hypothetical bias, non-existent concept, excluded costs; `WTP_COMMERCIALLY_VALIDATED = false` |
| F4 | (B) at `n = 8` → segment comparison, confidence interval or significance claim | `MC10-GABOR-GRANGER.md` §6.4: comparisons/CIs need about 100 per segment per construct |
| F5 | (B) → (C) without separate authorization and design | The later quantitative stage is a separately authorized study, not a continuation of MC-10R |
| F6 | Any of (A)/(B)/(C) → a price approval, offer, publication or orderable figure | `APPROVED_PRICES = 0`; nothing is for sale; prohibited by D2 §8 and the MC-10 pricing prohibitions |

### 3.5 Current evidentiary status of all three activities

| Activity | Participants | Responses / records | Executed | Can produce today |
| --- | ---: | ---: | --- | --- |
| (A) Qualitative price objections | 0 | 0 | No | Nothing |
| (B) Stated preference (`EXP-MC10-04`, `EXP-MC10-05`) | 0 | 0 | No | Nothing |
| (C) Later quantitative pricing | 0 | 0 | No | Nothing |

## 4. Required feasibility matrix

### 4.1 Conventions

Each row is one cell of the required `segment × experiment × construct` matrix. The experiment is fixed by
the table and restated in every `cellKey`. `plannedN` is the full-study preserved **maximum**; `plannedNWave1`
is the Wave 1 **maximum** (`0` = segment not in Wave 1, which is a scheduling fact, not a quota statement).
Wave 1 columns therefore reflect only `SEG-01`, `SEG-03`, `SEG-04`, `SEG-06`, per D2 §3.3 and §3.4.

`intendedInterpretation` is a fixed code defined in §4.2. `experimentState = NOT_EXECUTED` for every cell
because `0` modules/ladders/responses exist and the gate is closed.

### 4.2 Matrix legend

**`reachable` (exact D2 §3.4 strings):**

- `REACHABLE_AT_PLANNED_MAX` — preserved maximum is `8` and therefore reaches the registered `n >= 8` only
  if the segment actually completes all 8 planned interviews (margin is exactly 0; see §2.5).
- `BELOW_REGISTERED_MINIMUM` — preserved maximum is `< 8`; no outcome can reach the registered minimum; the
  segment is qualitative-pricing only and its pricing experiment is `NOT_EXECUTED` for that segment.

**`registeredPopulation`:**

- `NAMED_SUBJECT` — the segment is named in the experiment's registered `segment` text as a subject
  population.
- `NAMED_RESALE_VARIANT` — `SEG-04` installers are named in the `EXP-MC10-04` registered text and design
  (`MC10-GABOR-GRANGER.md` §5 R7) as a **resale-price variant**, reported separately and not pooled with
  owners. The variant's exact wording is not part of the frozen ladder payload, so an experiment-level
  resale-price result would additionally require a frozen wording (instrument amendment) — see §12.
- `NAMED_SEPARATE_VIEW` — `SEG-07`/`SEG-08` operator views are reported separately per
  `MC10-GABOR-GRANGER.md` §6.1 and do not count toward the 4-of-5 monotonicity rule.
- `NOT_NAMED` — the segment has no registered subject role in that experiment's `segment` text. Its
  `BELOW_REGISTERED_MINIMUM` classification is therefore required but not the only barrier: even an
  expanded quota would not create a registered population cell without a registry scope amendment.

**`intendedInterpretation`:**

- `GG_BAND_AT_N8` — if and only if 8 completed pricing-module interviews with all five frozen points and
  valid response times are achieved: an indicative, `HYPOTHESIS`-labelled top-two-box 50 % intent interval
  for this construct in this segment; usable only inside the 4-of-5 monotonicity gate; never a price.
- `GG_BAND_AT_N8_SEPARATE_VIEW` — as `GG_BAND_AT_N8`, but reported as a separate operator view that does
  not count toward the registered 4-of-5 rule.
- `VW_RANGE_AT_N8` — if and only if 8 completed modules exist: a `HYPOTHESIS`-labelled `PMCM`/`PME`
  acceptable range subject to the consistency and non-degeneracy rules; never a price.
- `QUALITATIVE_PRICE_OBJECTIONS_ONLY` — no experiment-level pricing output is possible for this segment
  under the preserved quota (and, where `NOT_NAMED`, no registered pricing population exists either).
  Only qualitative price objections are recorded, if and when authorized fieldwork occurs; no band, no
  range, no `n >= 8` claim.

### 4.3 Matrix — `EXP-MC10-04` (Gabor–Granger), all segments and both constructs

| `cellKey` | Segment | Construct | `requiredN` | `plannedN` | `plannedNWave1` | `reachable` | `wave1ReachableIfAllPlannedComplete` | `registeredPopulation` | `experimentState` | `intendedInterpretation` |
| --- | --- | --- | ---: | ---: | ---: | --- | --- | --- | --- | --- |
| `SEG-01__EXP-MC10-04__CONSTRUCT-01` | SEG-01 | CONSTRUCT-01 | 8 | 8 | 8 | `REACHABLE_AT_PLANNED_MAX` | true | `NAMED_SUBJECT` | `NOT_EXECUTED` | `GG_BAND_AT_N8` |
| `SEG-01__EXP-MC10-04__CONSTRUCT-02` | SEG-01 | CONSTRUCT-02 | 8 | 8 | 8 | `REACHABLE_AT_PLANNED_MAX` | true | `NAMED_SUBJECT` | `NOT_EXECUTED` | `GG_BAND_AT_N8` |
| `SEG-02__EXP-MC10-04__CONSTRUCT-01` | SEG-02 | CONSTRUCT-01 | 8 | 8 | 0 | `REACHABLE_AT_PLANNED_MAX` | false | `NAMED_SUBJECT` | `NOT_EXECUTED` | `GG_BAND_AT_N8` |
| `SEG-02__EXP-MC10-04__CONSTRUCT-02` | SEG-02 | CONSTRUCT-02 | 8 | 8 | 0 | `REACHABLE_AT_PLANNED_MAX` | false | `NAMED_SUBJECT` | `NOT_EXECUTED` | `GG_BAND_AT_N8` |
| `SEG-03__EXP-MC10-04__CONSTRUCT-01` | SEG-03 | CONSTRUCT-01 | 8 | 8 | 8 | `REACHABLE_AT_PLANNED_MAX` | true | `NAMED_SUBJECT` | `NOT_EXECUTED` | `GG_BAND_AT_N8` |
| `SEG-03__EXP-MC10-04__CONSTRUCT-02` | SEG-03 | CONSTRUCT-02 | 8 | 8 | 8 | `REACHABLE_AT_PLANNED_MAX` | true | `NAMED_SUBJECT` | `NOT_EXECUTED` | `GG_BAND_AT_N8` |
| `SEG-04__EXP-MC10-04__CONSTRUCT-01` | SEG-04 | CONSTRUCT-01 | 8 | 7 | 7 | `BELOW_REGISTERED_MINIMUM` | false | `NAMED_RESALE_VARIANT` | `NOT_EXECUTED` | `QUALITATIVE_PRICE_OBJECTIONS_ONLY` |
| `SEG-04__EXP-MC10-04__CONSTRUCT-02` | SEG-04 | CONSTRUCT-02 | 8 | 7 | 7 | `BELOW_REGISTERED_MINIMUM` | false | `NAMED_RESALE_VARIANT` | `NOT_EXECUTED` | `QUALITATIVE_PRICE_OBJECTIONS_ONLY` |
| `SEG-05__EXP-MC10-04__CONSTRUCT-01` | SEG-05 | CONSTRUCT-01 | 8 | 7 | 0 | `BELOW_REGISTERED_MINIMUM` | false | `NOT_NAMED` | `NOT_EXECUTED` | `QUALITATIVE_PRICE_OBJECTIONS_ONLY` |
| `SEG-05__EXP-MC10-04__CONSTRUCT-02` | SEG-05 | CONSTRUCT-02 | 8 | 7 | 0 | `BELOW_REGISTERED_MINIMUM` | false | `NOT_NAMED` | `NOT_EXECUTED` | `QUALITATIVE_PRICE_OBJECTIONS_ONLY` |
| `SEG-06__EXP-MC10-04__CONSTRUCT-01` | SEG-06 | CONSTRUCT-01 | 8 | 5 | 5 | `BELOW_REGISTERED_MINIMUM` | false | `NOT_NAMED` | `NOT_EXECUTED` | `QUALITATIVE_PRICE_OBJECTIONS_ONLY` |
| `SEG-06__EXP-MC10-04__CONSTRUCT-02` | SEG-06 | CONSTRUCT-02 | 8 | 5 | 5 | `BELOW_REGISTERED_MINIMUM` | false | `NOT_NAMED` | `NOT_EXECUTED` | `QUALITATIVE_PRICE_OBJECTIONS_ONLY` |
| `SEG-07__EXP-MC10-04__CONSTRUCT-01` | SEG-07 | CONSTRUCT-01 | 8 | 8 | 0 | `REACHABLE_AT_PLANNED_MAX` | false | `NAMED_SEPARATE_VIEW` | `NOT_EXECUTED` | `GG_BAND_AT_N8_SEPARATE_VIEW` |
| `SEG-07__EXP-MC10-04__CONSTRUCT-02` | SEG-07 | CONSTRUCT-02 | 8 | 8 | 0 | `REACHABLE_AT_PLANNED_MAX` | false | `NAMED_SEPARATE_VIEW` | `NOT_EXECUTED` | `GG_BAND_AT_N8_SEPARATE_VIEW` |
| `SEG-08__EXP-MC10-04__CONSTRUCT-01` | SEG-08 | CONSTRUCT-01 | 8 | 6 | 0 | `BELOW_REGISTERED_MINIMUM` | false | `NAMED_SEPARATE_VIEW` | `NOT_EXECUTED` | `QUALITATIVE_PRICE_OBJECTIONS_ONLY` |
| `SEG-08__EXP-MC10-04__CONSTRUCT-02` | SEG-08 | CONSTRUCT-02 | 8 | 6 | 0 | `BELOW_REGISTERED_MINIMUM` | false | `NAMED_SEPARATE_VIEW` | `NOT_EXECUTED` | `QUALITATIVE_PRICE_OBJECTIONS_ONLY` |

**Reconciliation note (MC-10R-F05, owner decision).** `registeredPopulation` in this D7 matrix is a
*reporting-view* code: `NAMED_SEPARATE_VIEW` records that `MC10-GABOR-GRANGER.md` §6.1 reports SEG-07 and
SEG-08 operator views separately and does **not** count them toward the registered 4-of-5 monotonicity
rule. The recovery contract D27 uses `NOT_NAMED` for the same cells because it records the different
attribute of *experiment-level eligibility*: the frozen `EXP-MC10-04` registered population names owners
(and the SEG-04 resale variant), so a SEG-07/SEG-08 view can never produce an `EXP-MC10-04`
experiment-level result. The two codes are therefore both correct for their own attribute and are not
interchangeable: neither makes SEG-07 or SEG-08 experiment-level eligible, and SEG-08 remains
`BELOW_REGISTERED_MINIMUM` in both readings. The canonical experiment-eligibility attribute is D27's
`NOT_NAMED`; the descriptive view remains documented here only.

### 4.4 Matrix — `EXP-MC10-05` (Van Westendorp), all segments and both constructs

| `cellKey` | Segment | Construct | `requiredN` | `plannedN` | `plannedNWave1` | `reachable` | `wave1ReachableIfAllPlannedComplete` | `registeredPopulation` | `experimentState` | `intendedInterpretation` |
| --- | --- | --- | ---: | ---: | ---: | --- | --- | --- | --- | --- |
| `SEG-01__EXP-MC10-05__CONSTRUCT-01` | SEG-01 | CONSTRUCT-01 | 8 | 8 | 8 | `REACHABLE_AT_PLANNED_MAX` | true | `NAMED_SUBJECT` | `NOT_EXECUTED` | `VW_RANGE_AT_N8` |
| `SEG-01__EXP-MC10-05__CONSTRUCT-02` | SEG-01 | CONSTRUCT-02 | 8 | 8 | 8 | `REACHABLE_AT_PLANNED_MAX` | true | `NAMED_SUBJECT` | `NOT_EXECUTED` | `VW_RANGE_AT_N8` |
| `SEG-02__EXP-MC10-05__CONSTRUCT-01` | SEG-02 | CONSTRUCT-01 | 8 | 8 | 0 | `REACHABLE_AT_PLANNED_MAX` | false | `NAMED_SUBJECT` | `NOT_EXECUTED` | `VW_RANGE_AT_N8` |
| `SEG-02__EXP-MC10-05__CONSTRUCT-02` | SEG-02 | CONSTRUCT-02 | 8 | 8 | 0 | `REACHABLE_AT_PLANNED_MAX` | false | `NAMED_SUBJECT` | `NOT_EXECUTED` | `VW_RANGE_AT_N8` |
| `SEG-03__EXP-MC10-05__CONSTRUCT-01` | SEG-03 | CONSTRUCT-01 | 8 | 8 | 8 | `REACHABLE_AT_PLANNED_MAX` | true | `NAMED_SUBJECT` | `NOT_EXECUTED` | `VW_RANGE_AT_N8` |
| `SEG-03__EXP-MC10-05__CONSTRUCT-02` | SEG-03 | CONSTRUCT-02 | 8 | 8 | 8 | `REACHABLE_AT_PLANNED_MAX` | true | `NAMED_SUBJECT` | `NOT_EXECUTED` | `VW_RANGE_AT_N8` |
| `SEG-04__EXP-MC10-05__CONSTRUCT-01` | SEG-04 | CONSTRUCT-01 | 8 | 7 | 7 | `BELOW_REGISTERED_MINIMUM` | false | `NOT_NAMED` | `NOT_EXECUTED` | `QUALITATIVE_PRICE_OBJECTIONS_ONLY` |
| `SEG-04__EXP-MC10-05__CONSTRUCT-02` | SEG-04 | CONSTRUCT-02 | 8 | 7 | 7 | `BELOW_REGISTERED_MINIMUM` | false | `NOT_NAMED` | `NOT_EXECUTED` | `QUALITATIVE_PRICE_OBJECTIONS_ONLY` |
| `SEG-05__EXP-MC10-05__CONSTRUCT-01` | SEG-05 | CONSTRUCT-01 | 8 | 7 | 0 | `BELOW_REGISTERED_MINIMUM` | false | `NOT_NAMED` | `NOT_EXECUTED` | `QUALITATIVE_PRICE_OBJECTIONS_ONLY` |
| `SEG-05__EXP-MC10-05__CONSTRUCT-02` | SEG-05 | CONSTRUCT-02 | 8 | 7 | 0 | `BELOW_REGISTERED_MINIMUM` | false | `NOT_NAMED` | `NOT_EXECUTED` | `QUALITATIVE_PRICE_OBJECTIONS_ONLY` |
| `SEG-06__EXP-MC10-05__CONSTRUCT-01` | SEG-06 | CONSTRUCT-01 | 8 | 5 | 5 | `BELOW_REGISTERED_MINIMUM` | false | `NOT_NAMED` | `NOT_EXECUTED` | `QUALITATIVE_PRICE_OBJECTIONS_ONLY` |
| `SEG-06__EXP-MC10-05__CONSTRUCT-02` | SEG-06 | CONSTRUCT-02 | 8 | 5 | 5 | `BELOW_REGISTERED_MINIMUM` | false | `NOT_NAMED` | `NOT_EXECUTED` | `QUALITATIVE_PRICE_OBJECTIONS_ONLY` |
| `SEG-07__EXP-MC10-05__CONSTRUCT-01` | SEG-07 | CONSTRUCT-01 | 8 | 8 | 0 | `REACHABLE_AT_PLANNED_MAX` | false | `NAMED_SUBJECT` | `NOT_EXECUTED` | `VW_RANGE_AT_N8` |
| `SEG-07__EXP-MC10-05__CONSTRUCT-02` | SEG-07 | CONSTRUCT-02 | 8 | 8 | 0 | `REACHABLE_AT_PLANNED_MAX` | false | `NAMED_SUBJECT` | `NOT_EXECUTED` | `VW_RANGE_AT_N8` |
| `SEG-08__EXP-MC10-05__CONSTRUCT-01` | SEG-08 | CONSTRUCT-01 | 8 | 6 | 0 | `BELOW_REGISTERED_MINIMUM` | false | `NAMED_SUBJECT` | `NOT_EXECUTED` | `QUALITATIVE_PRICE_OBJECTIONS_ONLY` |
| `SEG-08__EXP-MC10-05__CONSTRUCT-02` | SEG-08 | CONSTRUCT-02 | 8 | 6 | 0 | `BELOW_REGISTERED_MINIMUM` | false | `NAMED_SUBJECT` | `NOT_EXECUTED` | `QUALITATIVE_PRICE_OBJECTIONS_ONLY` |

### 4.5 Wave 1 lane (only `SEG-01`, `SEG-03`, `SEG-04`, `SEG-06`)

| Segment | Wave 1 min | Wave 1 max | Experiment-level cells possible in Wave 1 | Max construction | Interpretation |
| --- | ---: | ---: | --- | --- | --- |
| SEG-01 | 5 | 8 | Yes, conditionally | `min(8, 8) = 8` reached only if 8/8 complete both constructs | `GG_BAND_AT_N8` / `VW_RANGE_AT_N8`; nothing measured today |
| SEG-03 | 5 | 8 | Yes, conditionally | `min(8, 8) = 8` reached only if 8/8 complete both constructs | `GG_BAND_AT_N8` / `VW_RANGE_AT_N8`; nothing measured today |
| SEG-04 | 5 | 7 | **No** | `7 < 8`; deficit 1 | `QUALITATIVE_PRICE_OBJECTIONS_ONLY`; pricing experiment `NOT_EXECUTED` for this segment |
| SEG-06 | 3 | 5 | **No** | `5 < 8`; deficit 3 | `QUALITATIVE_PRICE_OBJECTIONS_ONLY`; pricing experiment `NOT_EXECUTED` for this segment |

Wave 1 statement, restating the binding D2 §3.4 sentence: for Wave 1, only `SEG-01` and `SEG-03` can
produce an experiment-level pricing result, and only if eight completed pricing-module interviews are
achieved in that segment; `SEG-04` and `SEG-06` are qualitative-pricing only. Wave 1 (`18–28`) can never
be presented as satisfying the full study, the experiment minimums or the MC-10 acceptance criteria.

### 4.6 Matrix aggregation checks

| Check | Value | Derivation |
| --- | ---: | --- |
| Matrix cells (`8 segments × 2 experiments × 2 constructs`) | **32** | `8 × 2 × 2 = 32` |
| `REACHABLE_AT_PLANNED_MAX` cells | **16** | `4 segments × 2 experiments × 2 constructs = 16` |
| `BELOW_REGISTERED_MINIMUM` cells | **16** | `4 × 2 × 2 = 16`; `16 + 16 = 32` ✓ |
| Cells `NOT_EXECUTED` | **32** | evidence `0/0/0` in `experiments.json` for both experiments |
| Wave 1 conditionally eligible cells (`SEG-01`, `SEG-03`) | **8** | `2 × 2 × 2 = 8` |
| Wave 1 below-minimum cells (`SEG-04`, `SEG-06`) | **8** | `2 × 2 × 2 = 8` |
| Wave 1 not-scheduled cells (`SEG-02`, `SEG-05`, `SEG-07`, `SEG-08`) | **16** | `4 × 2 × 2 = 16`; `8 + 8 + 16 = 32` ✓ |
| Cells that can produce an experiment-level result today | **0** | gate closed; `0` responses; `NOT_GRANTED` |

### 4.7 What a compliant cell could and could not produce

| Experiment | Construct | Administered unit (frozen) | Required `n` | Testable output if `n = 8` achieved and preconditions hold | Prohibited output |
| --- | --- | --- | ---: | --- | --- |
| `EXP-MC10-04` | `CONSTRUCT-01` | One year of access, one vessel, one account; 5 frozen EUR points `49, 99, 149, 199, 249` | 8 | Top-two-box intent proportion per frozen point; monotonicity state; interpolated 50 % intent interval labelled `HYPOTHESIS`; testable range for a later `n >= 100` design | Price, demand curve, conversion, elasticity, revenue, margin, offer, price approval |
| `EXP-MC10-04` | `CONSTRUCT-02` | First-year total: hardware once + 12 months of service; 5 frozen EUR points `299, 349, 399, 449, 499` | 8 | As above, per construct, not pooled with `CONSTRUCT-01` | As above |
| `EXP-MC10-05` | `CONSTRUCT-01` | Same `CONSTRUCT-01` description; 4 frozen questions per participant | 8 | Consistency rate on module denominator; `PMCM`/`PME` and acceptable range labelled `HYPOTHESIS` only if non-degenerate (`>= 2` respondents each side per crossing) | Price, "optimal price point" (deliberately not computed), offer, price approval |
| `EXP-MC10-05` | `CONSTRUCT-02` | Same `CONSTRUCT-02` first-year-total description; 4 frozen questions | 8 | As above; basis confusion between hardware/software/installation can render the construct `FAIL` regardless of consistency | As above |

Preconditions common to every cell (all currently unmet): valid authorization, consent, frozen instrument,
frozen ladder, every participant answers every point/question, all four questions per construct, `>= 60 s`
quality filter applied and reported, consistency violations retained raw, thresholds unchanged.

## 5. Design options: expand the quota, or keep it and classify

Neither option changes the registered `n >= 8` minimum. The choice is only about the planning envelope and
the label attached to the unreachable segments. No monetary cost can be estimated: research spend is
proposed `ZERO` (not approved), no per-interview cost exists, and no supplier quotation may be invented.
Cost is therefore stated in required interviews and dependent approvals.

### 5.1 Option 1 — expand the relevant segment quota to meet `n >= 8`

Option 1 has three arithmetic variants; the difference matters because "reachable" and "guaranteed" are not
the same thing.

| Variant | What changes | Delta vs preserved | Resulting envelope | Effect |
| --- | --- | --- | --- | --- |
| **1a** maxima only | SEG-04 `7→8`, SEG-05 `7→8`, SEG-06 `5→8`, SEG-08 `6→8` | max `+1+1+3+2 = +7`; min `+0` | **37–64** | `n >= 8` becomes *attainable* but not *guaranteed*: minima stay `5,5,3,4`, so a segment may still finish below 8. The defect is not fixed, only made outcome-dependent. |
| **1b** minima and maxima to exactly 8 | the four minima `5→8`, `5→8`, `3→8`, `4→8`; the four maxima `7→8`, `7→8`, `5→8`, `6→8` | min `+3+3+5+4 = +15`; max `+7` | **52–64** | `n >= 8` guaranteed only with **zero attrition margin** (cap `8` = required `8`; one drop-out still breaks compliance). Wave 1 becomes `5+5+8+8 = 26` min / `8+8+8+8 = 32` max. |
| **1c** guarantee plus margin, all eight segments | minima `8` each, maxima `10` each | min `64 − 37 = +27`; max `80 − 57 = +23` | **64–80** | Reachability with attrition margin for every segment, including the four already reachable at max 8. Wave 1 becomes `8+8+8+8 = 32` min / `10+10+10+10 = 40` max. |

Additional requirements that Option 1 does not remove, and that make it much larger than a quota edit:

1. **Registry scope amendment.** `SEG-05` (retailers) and `SEG-06` (marina/shipyard operators) are not
   named subject populations in either registered pricing experiment (see §4.2 legend and the quoted
   `segment` texts in §3.2). Expanding their quota would still not create a registered pricing cell; it
   would require amending the frozen MC-09 experiment registry, a new registered version, new
   `thresholdSha256` values and independent review. `SEG-04` additionally needs a frozen resale-variant
   wording, and `SEG-07`/`SEG-08` remain separate views outside the 4-of-5 rule.
2. **Quota-contract amendment.** D5/D6/D8 would have to re-derive the segment-quota contract and the wave
   sequence; D2 §3.3 decision DR-MC10R-01 (`PROPOSED_NOT_EFFECTIVE`) would need a superseding dated
   decision by the programme owner.
3. **Operational cost.** `+7` to `+27` additional required interviews, all of which presuppose a granted
   authorization, a designated controller, a provisioned store, trained interviewers and approved channels
   — none of which exists. Recruitment is the binding constraint, not the arithmetic.
4. **Bias and interpretation cost.** Reaching `n = 8` in a segment by adding quota invites recruitment to
   the number rather than to eligibility (quota-padding risk); it does not remove hypothetical bias,
   stated-preference bias, construct non-comparability, basis confusion or non-representativeness, and at
   `n = 8` it still licenses no inferential comparison (about 100 per segment is required for that).
   For intermediary segments, an owner-intent ladder would also need construct adaptation; the resulting
   opinion about a resale price is not comparable to an owner's stated purchase intent.

**Net effect of Option 1.** It converts an arithmetic impossibility into an outcome to be observed, at the
cost of `+7` planned interviews (1a), `+15` minimum interviews (1b), or `+27` minimum / `+23` maximum
interviews plus a registry scope amendment (1c) — while leaving the evidentiary quality of a `n = 8` cell
unchanged and, for `SEG-05`/`SEG-06`, not even creating a registered population.

### 5.2 Option 2 — keep the preserved quota and classify the analysis

Keep the preserved `37–57` envelope, the Wave 1 `18–28` scope and every registered minimum unchanged. Classify
`SEG-04`, `SEG-05`, `SEG-06`, `SEG-08` pricing cells as `BELOW_REGISTERED_MINIMUM`; those segments contribute
qualitative price objections only (if and when authorized fieldwork occurs), and their pricing experiment is
`NOT_EXECUTED` for that segment. `SEG-01`, `SEG-02`, `SEG-03`, `SEG-07` remain `REACHABLE_AT_PLANNED_MAX`,
conditional on all 8 planned interviews completing both constructs.

**What Option 2 preserves.** The registered `n >= 8` minimum; the preserved quota contract; the Wave 1
`18–28` scope; the freeze hash; the prohibition on price approval; the honesty of the record. It is also
compatible with the D5/D6 staged model: the later completion stage covers all eight segments to `37–57`
without changing any `BELOW_REGISTERED_MINIMUM` classification, and D5 records that this stage is required
for `SEG-02` and `SEG-07` pricing, with `SEG-05`/`SEG-08` staying below the registered minimum. `SEG-02`
and `SEG-07` are already classified `REACHABLE_AT_PLANNED_MAX` here, with `plannedNWave1 = 0` only because
they are outside Wave 1.

**What Option 2 costs.** `0` additional planned interviews; one classification record (this D7) bound into
D8; one programme-owner approval; a recovery-gate invariant (§8). Nothing else.

**What Option 2 gives up.** An experiment-level stated-preference result for four segments. This is what the
arithmetic already forbids; the option only stops pretending otherwise. It also keeps a door open: if the
programme later wants quantitative pricing for intermediary segments, that requires a separately registered
channel/margin experiment with its own populations and instruments — not a quota edit.

**Status.** `PROPOSED_NOT_EFFECTIVE`. It has no effect until a real, recorded programme-owner approval
exists; no agent, PR approval or passing validator can confer that approval.

### 5.3 The prohibited third path

**Lowering `n` from 8 to the segment maximum (7, 7, 5, 6) is prohibited and is not evaluated as a valid
option.** It would silently convert a registered threshold into a post-hoc rule, break the frozen
`thresholdSha256` values, violate `D-031` amendment discipline, and is explicitly forbidden by D2 §8 ("No
threshold, quota, consent requirement or commercial restriction weakened to obtain a PASS") and by the
recorded PI-03 resolution ("No silent reduction of the minimum."). Any document, validator exception or
matrix cell proposing it is a defect to be rejected, not a design choice.

### 5.4 Option comparison

| Dimension | Option 1 — expand quota | Option 2 — keep quota and classify |
| --- | --- | --- |
| Additional required interviews | `+7` planned (1a); `+15` minimum (1b); `+27` minimum / `+23` maximum (1c) | `0` |
| Resulting envelope | 37–64 (1a); 52–64 (1b); 64–80 (1c) | 37–57 (unchanged) |
| Wave 1 effect | 1b: 26–32; 1c: 32–40 | 18–28 (unchanged) |
| Registered `n >= 8` | Unchanged | Unchanged |
| Compliance | Attainable (1a) or guaranteed with zero margin (1b) or with margin (1c) | Not attainable for four segments; explicitly classified and recorded |
| Registry scope amendment for `SEG-05`/`SEG-06` | Required to obtain a valid pricing cell; not sufficient alone | Not required (those segments have no experiment-level cell) |
| Quota-contract / D8 amendment | Required (supersedes DR-MC10R-01) | Required only to record the classification binding |
| Freeze and threshold integrity | Preserved, but registry re-freeze and new hashes needed for scope change | Fully preserved; no hash change |
| Recruitment feasibility | Lower: more interviews and more approvals, with no attribution gain | Higher: no additional fieldwork volume |
| Bias / validity | Does not remove hypothetical, stated-preference, construct or basis bias; adds quota-padding and construct-comparability risk | Removes the temptation to over-recruit to a number; keeps qualitative objections in their proper lane |
| Interpretive gain | An indicative `HYPOTHESIS` cell for four more segments (1c), still no inference | None lost relative to what is currently lawful; four segments stay qualitative-only |
| Eligibility for a future quantitative stage | Does not create it | Does not create it; later `n >= 100` study remains separately authorized |
| Approval required | Programme owner: quota contract + registry scope amendment + dated decisions | Programme owner: classify PI-03 as resolved by classification |
| Status | Not recommended | **Recommended as `PROPOSED_NOT_EFFECTIVE`** |

### 5.5 Recommendation

**Recommend Option 2, status `PROPOSED_NOT_EFFECTIVE`, requiring programme-owner approval.** Reasons:

1. It is the only option that leaves both frozen artefacts — the registered `n >= 8` minimum and the
   preserved quota contract — intact, and it matches the second path recorded in PI-03.
2. The arithmetic shortfall (§2.4) is real and cannot be argued away; classification states it instead of
   manufacturing a result.
3. Option 1's marginal interpretive gain is small or zero at `n = 8`: no inferential comparison is possible,
   no price is approvable, and for `SEG-05`/`SEG-06` the registered populations do not even exist.
4. Option 1's cost is not just `+7` interviews: it cascades into a registry scope amendment, a quota-contract
   rewrite and new freeze hashes, for segments whose pricing question is better asked through a separate,
   properly registered channel/margin design later.
5. A threshold reduction is prohibited outright and is not a compromise between the two options.

The recommendation does not discard the four segments: they still contribute qualitative price objections,
installation barriers, margin expectations, resale-price perceptions and channel requirements — clearly
labelled as qualitative opinions, never as a curve, band or willingness-to-pay result.

### 5.6 Reversal and approval conditions

- The recommendation holds until a **real, recorded programme-owner decision** supersedes it. Any such
  decision must be dated, identify the option, and — if Option 1 — be accompanied by a quota-contract
  amendment, a registry scope amendment, new frozen hashes and independent review before fielding.
- No agent may approve this document or the option. Passing validators, this document's own status string,
  a PR approval or the Master Prompt are not authorization (`D2` §3.7).
- If Option 2 is approved, `SEG-04`, `SEG-05`, `SEG-06`, `SEG-08` pricing cells stay
  `BELOW_REGISTERED_MINIMUM` for the life of the preserved quota. A quota expansion at any later date
  requires a new document and a new decision; it never retroactively validates previously unattained cells.

## 6. Raw price-ladder provenance (preserved, not modified)

### 6.1 Freeze identity and recomputation

| Field | Value |
| --- | --- |
| Frozen file | `docs/marea/customer-discovery/data/pricing-ladders.json` |
| `ladderVersion` | `1.0.0` |
| `status` | `PRE_REGISTERED_HYPOTHESIS` |
| `approvedPrice` | `false` |
| `administered` | `false` |
| `responses` | `[]` |
| `freeze.algorithm` | `SHA-256` |
| `freeze.hashedPayload` | `constructs` |
| `freeze.canonicalization` | UTF-8 bytes of `JSON.stringify(constructs)` after parsing with a standard JSON parser: compact form, no whitespace, parser-preserved property order; the `freeze` block itself excluded |
| **`freeze.constructsSha256`** | **`bfa09ebc904a66ba65961864d5e026638e3756a41a0611f0c3fdf1e83bb5be8c`** |
| Recompute result on 2026-11-01 (this document) | `bfa09ebc904a66ba65961864d5e026638e3756a41a0611f0c3fdf1e83bb5be8c` — **match** |
| Independent prior verification | `review/MC-10-REVIEW.md` §6 recorded `bfa09ebc904a66ba65961864` — match |

### 6.2 Construct-level provenance

| Field | `CONSTRUCT-01` | `CONSTRUCT-02` |
| --- | --- | --- |
| Title | Navigation and onboard-data reference configuration | Monitoring configuration: hardware plus subscription |
| `pricingMode` | `ANNUAL_SUBSCRIPTION` | `ONE_OFF_PLUS_SUBSCRIPTION` |
| Tested unit | One year of access, one vessel, one account | First-year total: one-off hardware amount plus twelve months of service |
| Currency | EUR | EUR |
| VAT treatment | `VAT_INCLUDED_CONSUMER_RETAIL_HYPOTHESIS` (hypothesis, not a tax determination and not tax advice) | `VAT_INCLUDED_CONSUMER_RETAIL_HYPOTHESIS`; the MC-09 `WATCH` hypothesis records `vatBasis OPEN`, so inclusive framing is itself a hypothesis |
| Subscription period | 1 year, annual subscription | Twelve months of the external service, inside a first-year total; component prices are not frozen, approved or published separately |
| Installation assumption | Installation excluded from the tested unit | Installation labour excluded; extra sensors, alert guarantee, coverage commitment and marina integration excluded |
| Ladder sequence (EUR) | `49, 99, 149, 199, 249` | `299, 349, 399, 449, 499` |
| Ladder structure | Strictly ascending, uniform EUR 50 step; 5 points (frozen) | Strictly ascending, uniform EUR 50 step; 5 points (frozen) |
| Cited source ids | `PRC-CMP-001` (Orca Plus, EUR 49/year, `vatTreatment NOT_STATED_ON_PAGE`); `PRC-CMP-002` (Orca Smart Navigation, EUR 149/year, `NOT_STATED_ON_PAGE`); `familyPriceHypotheses.NAV` (NAV-ESSENTIAL EUR 99/year, NAV-PRO EUR 149/year, `HYPOTHESIS_UNAPPROVED`); `WTP-INS-01` design rule | `familyPriceHypotheses.WATCH` (WATCH-CORE EUR 299 one-off, subscription floor EUR 9.90/month, `HYPOTHESIS_UNAPPROVED`); `PH-04` (PROTECT EUR 399, `HYPOTHESIS_UNAPPROVED`, recorded as not cost-justified); context only, never converted: `PRC-CMP-032`/`033`/`054` (EUR monitoring, VAT-excluded/unknown), `PRC-CMP-027`/`028`/`031` (USD, not converted); `WTP-INS-01` design rule |
| Frozen question set | 5-point ladder + fixed 5-position buy-response scale + 4 Van Westendorp questions | Same structure, same scale, same 4 Van Westendorp questions |

### 6.3 Frozen ladder points and their derivation

| Construct | Point | Amount (EUR) | Basis (verbatim qualifier, condensed) |
| --- | ---: | ---: | --- |
| `CONSTRUCT-01` | 1 | 49 | `OBSERVED_ANCHOR`: `PRC-CMP-001` Orca Plus annual subscription, EUR 49/year, VAT not stated on page |
| `CONSTRUCT-01` | 2 | 99 | `FAMILY_HYPOTHESIS_ANCHOR`: `familyPriceHypotheses.NAV` NAV-ESSENTIAL, EUR 99/year, `HYPOTHESIS_UNAPPROVED` |
| `CONSTRUCT-01` | 3 | 149 | `PRC-CMP-002` Orca Smart Navigation EUR 149/year and NAV-PRO hypothesis EUR 149/year |
| `CONSTRUCT-01` | 4 | 199 | `BRACKET_PROBE`: arithmetic extension of the uniform EUR 50 step; not an observation |
| `CONSTRUCT-01` | 5 | 249 | `UPPER_BRACKET_PROBE`: arithmetic extension of the uniform EUR 50 step; not an observation |
| `CONSTRUCT-02` | 1 | 299 | `HARDWARE_HYPOTHESIS_FLOOR`: `familyPriceHypotheses.WATCH` WATCH-CORE EUR 299; first-year total assumes no separate service fee |
| `CONSTRUCT-02` | 2 | 349 | `BRACKET_PROBE`: EUR 299 + EUR 50 uniform step; not an observation |
| `CONSTRUCT-02` | 3 | 399 | `PH-04` PROTECT hardware-plus-subscription hypothesis EUR 399, `vatBasis VAT_INCLUDED_CONSUMER_RETAIL_HYPOTHESIS`, recorded as not cost-justified |
| `CONSTRUCT-02` | 4 | 449 | `BRACKET_PROBE`: EUR 399 + EUR 50 uniform step; not an observation |
| `CONSTRUCT-02` | 5 | 499 | `UPPER_BRACKET_PROBE`: EUR 399 + EUR 100, 1.25x the `PH-04` anchor; not an observation |

Provenance integrity notes preserved from the frozen file: the two upper `CONSTRUCT-01` probes are 1.34x and
1.67x the EUR 149 NAV-PRO hypothesis, deliberately beyond the MC-09 `WTP-INS-01` guidance of roughly
0.6x–1.5x and never a demonstrated ceiling; USD observations (`PRC-CMP-027`, `PRC-CMP-028`,
`PRC-CMP-031`) are not converted and set no EUR point; no production cost, BOM, supplier quotation,
installation cost or chart-licence cost exists, so no ladder point can be tested against a cost floor and
`PROFITABILITY_NOT_ESTABLISHED` holds.

### 6.4 Non-modification rule

> **No ladder, construct, question, scale, provenance entry or limitation in `data/pricing-ladders.json` may
> be modified without a dated amendment and a new `ladderVersion`.** The current hash
> `bfa09ebc904a66ba65961864d5e026638e3756a41a0611f0c3fdf1e83bb5be8c` is the identity of the frozen
> payload. Historical responses (none exist) would remain evaluated under the version in force when
> collected (`D-031`). A quota decision under §5 does **not** alter any ladder, and MC-10R performs no ladder
> edit.

### 6.5 What the ladders are not

They are not prices, offers, market prices for MAREA, costs, revenues, margins or willingness-to-pay
measurements. They are five-point research hypotheses frozen before any data, so that a later authorized
fieldwork stage cannot invent its own amounts. `administered = false` and `responses = []` remain true.

## 7. Interpretation limits

1. **Non-representative purposive sample.** Every segment target is a small purposive quota (`5–8`
   completed interviews); no probability sampling, no margin of error, no representativeness, no
   market-size, demand-size or segment-share inference.
2. **Stated preference is not purchase.** Gabor–Granger intent and Van Westendorp price perception are
   opinions about a concept that does not exist; hypothetical bias systematically overstates purchase and
   is reported, not corrected by an invented coefficient.
3. **No willingness-to-pay commercial validation.** `WTP_STATED_PREFERENCE_OBSERVED = false` and
   `WTP_COMMERCIALLY_VALIDATED = false`. Stated acceptance, a `HYPOTHESIS` band or a `HYPOTHESIS` range is
   not validated WTP.
4. **No price approval, no offer, no publication.** `APPROVED_PRICES = 0`; nothing is for sale; no ladder
   point may be presented as a MAREA price, an orderable figure, a reservation or a discount.
5. **No elasticity, conversion, revenue, margin or break-even.** No cost floor, BOM or supplier quotation
   exists; `PROFITABILITY = NOT_ESTABLISHED`.
6. **`n = 8` is not a comparison licence.** Confidence intervals, significance tests and segment-to-segment
   comparisons need about 100 completed responses per segment per construct (`MC10-GABOR-GRANGER.md` §6.4).
   At `n = 8` only raw counts and within-sample percentages are reported.
7. **Unreachable means unreachable.** For `SEG-04`, `SEG-05`, `SEG-06`, `SEG-08` no compliant stated-
   preference cell exists under the preserved quota; the correct record is
   `BELOW_REGISTERED_MINIMUM` and `NOT_EXECUTED`, not a weak band, not a pooled sample, not a qualitative
   opinion dressed as a price curve.
8. **Constructs are not comparable or poolable.** Annual subscription versus first-year hardware-plus-service
   total; excluded installation and chart-licence costs can inflate intent; the chart/data rights are not
   granted; basis confusion can make a module unusable.
9. **Wave 1 cannot satisfy the study.** Wave 1 (`18–28`, four segments) is an exploratory pilot; only
   `SEG-01`/`SEG-03` can reach an experiment cell, and only at 8/8 completion with zero attrition tolerance.
10. **Zero data is absence of data.** Nothing here establishes that any segment accepts, rejects, is
    sensitive or insensitive to any price, or that a quota, target or price should change.
11. **Evidence provenance.** Every amount above is traceable to a cited MC-09 record or a stated arithmetic
    extension; no price observation, competitor source or participant response was invented for this
    document, and no external contact or network access occurred.

## 8. Validator expectations — what the recovery gate must reject

The recovery gate (`scripts/check-marea-customer-recovery.mjs`, `CRR-*` ids owned by `agent-f-data`) must
enforce at least the invariants below. Invariant ids are D7-local references for traceability and do not
pre-declare the gate's numbering (D2 §3.9: the gate's exact count is whatever the implemented run reports).

| Invariant | Must reject | Enforcement source |
| --- | --- | --- |
| `D7-V01` | Any matrix cell presenting an experiment-level pricing result as `REACHABLE_AT_PLANNED_MAX` where `plannedN < 8` or where fewer than 8 completed pricing-module interviews exist; any cell for `SEG-04/05/06/08` labelled reachable | §2.4, §4.3, §4.4, D2 §3.4 |
| `D7-V02` | Any `PASS`-type pricing conclusion (progression `PASS`, usable-price-structure `PASS`, "validated", "confirmed") attributed to `EXP-MC10-04`/`EXP-MC10-05` while `executionStatus = NOT_EXECUTED`, `responses = 0` or the authorization gate is closed; any `PASS` for a zero/as-yet-unadministered module | §3.2, D2 §3.4, `experiments.json` |
| `D7-V03` | Any price approval, approved price, published price, offer, orderable figure or `approvedPrices > 0`; the gate must require `APPROVED_PRICES = 0` (also `commercialInvariants.approvedPrices = 0`) | §7, `research-status.json`, `pricing-ladders.json` |
| `D7-V04` | Any document asserting a pricing minimum other than `8`, or a per-segment minimum of `7/7/5/6`, or any reduction of `n >= 8` for `EXP-MC10-04`/`EXP-MC10-05` | §2.2, §5.3 |
| `D7-V05` | Any segment classification inconsistent with D2 §3.4: `SEG-01/02/03/07 = REACHABLE_AT_PLANNED_MAX`, `SEG-04/05/06/08 = BELOW_REGISTERED_MINIMUM`; any missing segment or construct (all 8 segments and both constructs must be present) | §4, D2 §3.4 |
| `D7-V06` | Any qualitative price objection, retailer/installer opinion or subscription-attitude response presented as a price curve, band, acceptable range or willingness-to-pay measurement | §3.1, §3.4 |
| `D7-V07` | Any modified ladder sequence/amount, construct, question or scale without a dated amendment, new `ladderVersion` and a new freeze hash; the gate must verify `freeze.constructsSha256 = bfa09ebc904a66ba65961864d5e026638e3756a41a0611f0c3fdf1e83bb5be8c` | §6 |
| `D7-V08` | Any Wave 1 claim of a full study, experiment minimum attainment or MC-10 acceptance; any Wave 1 pricing cell for a segment outside `SEG-01/03/04/06`; any Wave 1 experiment-level cell for `SEG-04`/`SEG-06` | §4.5, D2 §3.3–§3.4 |
| `D7-V09` | Any pricing document not marked `PROPOSED_NOT_EFFECTIVE`, `DRAFT`, `REVIEW_REQUIRED` or a later real approval state; any document claiming the recommendation is effective or approved without a recorded programme-owner decision | §5.5–§5.6, D2 §2 |
| `D7-V10` | Any presentation of the later quantitative stage (`n >= 100` per segment) as authorized, designed, funded or inferred from small-`n` qualitative or stated-preference data | §3.3 |
| `D7-V11` | Any document omitting `WTP_STATED_PREFERENCE_OBSERVED = false`, `WTP_COMMERCIALLY_VALIDATED = false`, `APPROVED_PRICES = 0` or `PROFITABILITY = NOT_ESTABLISHED`; any "willing to pay X" narrative for a hypothetical concept | §7, `research-status.json` |

Machine-checkable anchors the gate may bind to (exact tokens appearing in §4): the two reachability strings,
`NOT_EXECUTED`, `PROPOSED_NOT_EFFECTIVE`, the cell-key pattern
`^SEG-0[1-8]__EXP-MC10-0[45]__CONSTRUCT-0[12]$`, `requiredN = 8`, `approvedPrices = 0`, and the freeze hash
above. A gate that accepts this document must also reject a mutated copy in which any of those values is
changed; `agent-f-data` owns the negative-mutation suite and `agent-g-auditor` owns independent verification.

## 9. Machine-readable summary (keys for `agent-f-data`)

The following block is the compact, parseable projection of §2–§6. It introduces no value that is not
stated above and is not a second source of truth: where it and the tables differ, the tables and the frozen
sources govern.

```json
{
  "documentId": "MC10R-PI03-PRICING-FEASIBILITY",
  "documentStatus": "PROPOSED_NOT_EFFECTIVE",
  "recommendedOption": "OPTION_2_KEEP_PRESERVED_QUOTA_AND_CLASSIFY",
  "recommendedOptionStatus": "PROPOSED_NOT_EFFECTIVE",
  "requiredN": 8,
  "experiments": ["EXP-MC10-04", "EXP-MC10-05"],
  "constructs": ["CONSTRUCT-01", "CONSTRUCT-02"],
  "cellKeyPattern": "^SEG-0[1-8]__EXP-MC10-0[45]__CONSTRUCT-0[12]$",
  "matrixCellCount": 32,
  "reachableCellCount": 16,
  "belowMinimumCellCount": 16,
  "executedCellCount": 0,
  "segmentClassification": {
    "SEG-01": "REACHABLE_AT_PLANNED_MAX",
    "SEG-02": "REACHABLE_AT_PLANNED_MAX",
    "SEG-03": "REACHABLE_AT_PLANNED_MAX",
    "SEG-04": "BELOW_REGISTERED_MINIMUM",
    "SEG-05": "BELOW_REGISTERED_MINIMUM",
    "SEG-06": "BELOW_REGISTERED_MINIMUM",
    "SEG-07": "REACHABLE_AT_PLANNED_MAX",
    "SEG-08": "BELOW_REGISTERED_MINIMUM"
  },
  "segmentMaxima": {
    "SEG-01": 8, "SEG-02": 8, "SEG-03": 8, "SEG-04": 7,
    "SEG-05": 7, "SEG-06": 5, "SEG-07": 8, "SEG-08": 6
  },
  "wave1": {
    "segments": ["SEG-01", "SEG-03", "SEG-04", "SEG-06"],
    "totalMin": 18,
    "totalMax": 28,
    "experimentEligibleSegments": ["SEG-01", "SEG-03"],
    "experimentEligibleMax": 16,
    "qualitativeOnlyMax": 12
  },
  "ladderFreezeSha256": "bfa09ebc904a66ba65961864d5e026638e3756a41a0611f0c3fdf1e83bb5be8c",
  "ladderVersion": "1.0.0",
  "laddersAdministered": 0,
  "priceResponses": 0,
  "participants": 0,
  "experimentsExecuted": 0,
  "approvedPrices": 0,
  "wtpStatedPreferenceObserved": false,
  "wtpCommerciallyValidated": false,
  "profitabilityEstablished": false,
  "externalAuthorizationStatus": "NOT_GRANTED",
  "fieldworkStatus": "BLOCKED",
  "thresholdReduction": "PROHIBITED"
}
```

**Alignment with D6 (candidate segment-quota contract).** D6's per-segment field
`pricingModuleEligibility` carries the same two values for the same eight segments;
`pricingRegisteredMinimumPerSegment = 8`; `pricingReachableAtPlannedMaxSegments =
[SEG-01, SEG-02, SEG-03, SEG-07]`; `pricingBelowRegisteredMinimumSegments =
[SEG-04, SEG-05, SEG-06, SEG-08]`; D6's per-segment `maximumPlannedInterviews` equals `segmentMaxima` above;
and D6's first-stage block (`SEG-01/03/04/06`, `18–28`) equals this document's Wave 1. These values were
machine-compared on 2026-11-01 and matched on all eight segments (§11.1). D6 was still being edited during
the write window, so the comparison is value-based and deliberately does not bind to D6's internal wave/key
labels; D2 §3.3/§3.4 remains authoritative. D6 is the quota-contract source for these fields; this matrix
is the cell-level projection. Neither document changes the registered minimum, and a later change to either
must be re-derived from D2 §3.4 rather than copied across.

## 10. Traceability

| Source | Use in this document |
| --- | --- |
| `recovery/MC10R-RECOVERY-EXECUTION-PLAN.md` (D2) §2, §3.3, §3.4, §3.7, §3.9, §8 | Status strings, quotas, Wave 1 scope, reachability classification, pricing minimum, prohibitions |
| `recovery/methodology/MC10R-PI01-SAMPLING-RECONCILIATION.md` (D5) | Preserved 37/57 sums; 40–80 only as aspiration; pricing eligibility unchanged; PI-03 separate |
| `recovery/methodology/MC10R-PI02-SEGMENT-QUOTA-CONTRACT.md` (D6) | Per-segment `maximumPlannedInterviews` and `pricingModuleEligibility`; `pricingRegisteredMinimumPerSegment = 8`; reachable/below segment lists; first-stage scope `SEG-01/03/04/06` (`18–28`) — value-compared with §4 in §11.1 |
| `data/experiments.json` | Frozen `EXP-MC10-04`/`EXP-MC10-05` minimum evidence, thresholds, hashes, `NOT_EXECUTED`, zero evidence, closed gate |
| `data/research-status.json` | Preserved quotas, zero counts, PI-03 text, `commercialInvariants.approvedPrices = 0` |
| `data/pricing-ladders.json` | Constructs, ladders, scale, Van Westendorp questions, provenance, freeze hash, unadministered state |
| `pricing/MC10-GABOR-GRANGER.md` | `WTP-INS-01`, L1–L5, 4-of-5 rule, `>= 60 s` filter, resale/operator separate views, prohibitions |
| `pricing/MC10-VAN-WESTENDORP.md` | `WTP-INS-02`, four questions, consistency, `PMCM`/`PME`, non-degeneracy, per-construct analysis |
| `pricing/MC10-SUBSCRIPTION-ATTITUDES.md` | Qualitative objection codebook and the qualitative lane definition |
| `MC10-EXPERIMENT-RESULTS.md` §4–§5, §11 | `BLOCKED`/`NOT_EXECUTED` classification; threshold freeze rule; PI-03 recorded |
| `review/MC-10-REVIEW.md` §6 | Independent recomputation of the ladder self-freeze |
| `docs/marea/market-validation/data/validation-experiments.json` | Origin of the frozen experiment records; quoted registered wording |
| `docs/marea/market-validation/data/price-observations.json`, `governance-status.json` | Cited ladder anchors (`PRC-CMP-*`, `PH-04`, `familyPriceHypotheses.NAV/WATCH`) via the frozen provenance |

Path convention: short `data/…` and `pricing/…` paths refer to `docs/marea/customer-discovery/`; MC-09
authority files under `docs/marea/market-validation/` are cited in full at first use.

## 11. Reproducibility — commands run

| Purpose | Command | Recorded result |
| --- | --- | --- |
| Recompute the ladder self-freeze exactly as registered | `node -e "const fs=require('fs'),c=require('crypto');const o=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));process.stdout.write(c.createHash('sha256').update(JSON.stringify(o.constructs),'utf8').digest('hex'))" docs/marea/customer-discovery/data/pricing-ladders.json` | `bfa09ebc904a66ba65961864d5e026638e3756a41a0611f0c3fdf1e83bb5be8c` — match |
| Verify quota arithmetic (minima, maxima, shortfall, Wave 1) | `node -e "const min=[5,5,5,5,5,3,5,4],max=[8,8,8,7,7,5,8,6];const s=a=>a.reduce((x,y)=>x+y,0);console.log(JSON.stringify({min:s(min),max:s(max),belowMax:[7,7,5,6],belowMaxSum:s([7,7,5,6]),req4:4*8,shortfall:4*8-s([7,7,5,6]),allReq:8*8,gapToAllReq:8*8-s(max),wave1min:s([5,5,5,3]),wave1max:s([8,8,7,5]),wave1eligibleMax:2*8,wavesQualOnlyMax:s([7,5])}))"` | `{"min":37,"max":57,"belowMax":[7,7,5,6],"belowMaxSum":25,"req4":32,"shortfall":7,"allReq":64,"gapToAllReq":7,"wave1min":18,"wave1max":28,"wave1eligibleMax":16,"wavesQualOnlyMax":12}` |
| Verify option-1 expansion arithmetic | `node -e "const min=[5,5,5,5,5,3,5,4],max=[8,8,8,7,7,5,8,6];const s=a=>a.reduce((x,y)=>x+y,0);console.log(JSON.stringify({opt1a_max_only:{deltaMax:s([1,1,3,2]),newMax:s(max)+s([1,1,3,2]),newMin:s(min)},opt1b_min_and_max8:{deltaMin:s([3,3,5,4]),newMin:s(min)+s([3,3,5,4]),deltaMax:s([1,1,3,2]),newMax:s(max)+s([1,1,3,2])},opt1c_all8all10:{newMin:8*8,newMax:8*10},opt1b_wave1:{newMin:s([5,5,8,8]),newMax:s([8,8,8,8])}}))"` | `{"opt1a_max_only":{"deltaMax":7,"newMax":64,"newMin":37},"opt1b_min_and_max8":{"deltaMin":15,"newMin":52,"deltaMax":7,"newMax":64},"opt1c_all8all10":{"newMin":64,"newMax":80},"opt1b_wave1":{"newMin":26,"newMax":32}}` |
| Cross-check the §4 matrix against D6's machine-readable contract (`maximumPlannedInterviews`, `pricingModuleEligibility`) | see §11.1 | `crossFileAlignment MATCH_ALL_8_SEGMENTS`; `d6PricingMinimum 8`; reachable list `[SEG-01, SEG-02, SEG-03, SEG-07]`; below list `[SEG-04, SEG-05, SEG-06, SEG-08]` |

### 11.1 Cross-check of the §4 matrix against D6 (exact command and output)

```pwsh
node -e "
const fs=require('fs');
const d6=fs.readFileSync('docs/marea/customer-discovery/recovery/methodology/MC10R-PI02-SEGMENT-QUOTA-CONTRACT.md','utf8');
const d7=fs.readFileSync('docs/marea/customer-discovery/recovery/pricing/MC10R-PI03-PRICING-FEASIBILITY.md','utf8');
const segs=['SEG-01','SEG-02','SEG-03','SEG-04','SEG-05','SEG-06','SEG-07','SEG-08'];
const d6vals={};
for(const s of segs){
  const blk=d6.split('segmentId: '+s)[1]||'';
  const m=blk.match(/maximumPlannedInterviews:\s*(\d+)/);
  const e=blk.match(/pricingModuleEligibility:\s*([A-Z_]+)/);
  d6vals[s]={max:m&&Number(m[1]),elig:e&&e[1]};
}
const d7rows={};
for(const ln of d7.split(/\r?\n/)){
  const m=ln.match(/^\|\s*\x60(SEG-0[1-8])__EXP-MC10-0[45]__CONSTRUCT-0[12]\x60\s*\|(.*)$/);
  if(!m)continue;
  const c=ln.split('|').map(x=>x.trim().replace(/\x60/g,''));
  const s=m[1];
  if(!d7rows[s])d7rows[s]={plan:new Set(),reach:new Set(),req:new Set()};
  d7rows[s].plan.add(c[5]);d7rows[s].reach.add(c[7]);d7rows[s].req.add(c[4]);
}
let ok=true;
for(const s of segs){
  const r=d7rows[s];
  const plan=[...r.plan],reach=[...r.reach],req=[...r.req];
  const good=plan.length===1&&Number(plan[0])===d6vals[s].max&&reach.length===1&&reach[0]===d6vals[s].elig&&req.length===1&&req[0]==='8';
  if(!good){ok=false;console.log('MISMATCH',s,JSON.stringify(d6vals[s]),plan,reach,req);}
}
console.log('d6',JSON.stringify(d6vals));
console.log('crossFileAlignment',ok?'MATCH_ALL_8_SEGMENTS':'MISMATCH');
console.log('d6PricingMinimum',(d6.match(/pricingRegisteredMinimumPerSegment:\s*(\d+)/)||[])[1]);
console.log('d6ReachableList',(d6.match(/pricingReachableAtPlannedMaxSegments:\s*(\[[^\]]*\])/)||[])[1]);
console.log('d6BelowList',(d6.match(/pricingBelowRegisteredMinimumSegments:\s*(\[[^\]]*\])/)||[])[1]);
"
```

Recorded output (2026-11-01):

```text
d6 {"SEG-01":{"max":8,"elig":"REACHABLE_AT_PLANNED_MAX"},"SEG-02":{"max":8,"elig":"REACHABLE_AT_PLANNED_MAX"},"SEG-03":{"max":8,"elig":"REACHABLE_AT_PLANNED_MAX"},"SEG-04":{"max":7,"elig":"BELOW_REGISTERED_MINIMUM"},"SEG-05":{"max":7,"elig":"BELOW_REGISTERED_MINIMUM"},"SEG-06":{"max":5,"elig":"BELOW_REGISTERED_MINIMUM"},"SEG-07":{"max":8,"elig":"REACHABLE_AT_PLANNED_MAX"},"SEG-08":{"max":6,"elig":"BELOW_REGISTERED_MINIMUM"}}
crossFileAlignment MATCH_ALL_8_SEGMENTS
d6PricingMinimum 8
d6ReachableList [SEG-01, SEG-02, SEG-03, SEG-07]
d6BelowList [SEG-04, SEG-05, SEG-06, SEG-08]
```

This cross-check reads D6's candidate contract and this document's matrix only; it makes no external call,
reads no MC-09 authority file and creates no evidence about any participant or price.

No external contact, network call, new dependency, participant interaction or file outside
`docs/marea/customer-discovery/recovery/pricing/` was used to produce this document. No Git write command
was run.

## 12. Open items, dependencies and approvals

| # | Item | Owner | State |
| ---: | --- | --- | --- |
| 1 | Programme-owner decision on PI-03 (recommended Option 2) | programme owner (human) | `NOT_GRANTED`; no agent may approve |
| 2 | D5/D6 candidate documents: present in the working tree and reconciled. D6's `maximumPlannedInterviews` and `pricingModuleEligibility` match §4 on all eight segments; `pricingRegisteredMinimumPerSegment = 8`; first stage `SEG-01/03/04/06`, `18–28`. D5 records the same 37/57 envelope and keeps PI-03 as a separate defect. D7 derives its matrix from D2 §3.3/§3.4 and reveals no value conflict with D5/D6 (§11.1); D6 was still being edited when this was written, so only values — not D6 internal key labels — are relied on | `agent-a-methodologist` / `lead` | closed for this document; re-open if D5/D6 values change |
| 3 | D8 amendment binding the PI-03 decision (see §5) into the research protocol | `agent-a-methodologist` | pending D7 + programme-owner decision; D8 not present in the working tree at the time of writing |
| 4 | Recovery gate implementation of `D7-V01` … `D7-V11` plus negative-mutation tests | `agent-f-data` | pending; `CRR-*` ids owned there |
| 5 | Independent audit of this document and of the gate's pricing invariants | `agent-g-auditor` | after implementation commit |
| 6 | `SEG-04` resale-price variant wording and `SEG-07`/`SEG-08` operator-view wording are not part of the frozen ladder payload; an experiment-level result for those roles would require a frozen wording (instrument amendment) in addition to `n >= 8` | `agent-e-instruments` / `lead` | open, outside this document's write scope |
| 7 | `SEG-05`/`SEG-06` have no registered pricing-population role in `EXP-MC10-04`/`EXP-MC10-05`; quantitative pricing for them needs a separately registered channel/margin experiment | `lead` / `agent-a-methodologist` | open, not in MC-10R scope |
| 8 | Later quantitative commercial pricing (`n >= 100` per segment) remains separately authorized, designed and funded — none of it exists | programme owner | `NOT_GRANTED` / not designed |
| 9 | Fieldwork remains `BLOCKED`; this document changes no authorization, storage, interviewer, legal or consent state | `lead` / `agent-c-governance` | unchanged |

## 13. Status effect

```
DOCUMENT_ID                        = MC-10R / D7 / MC10R-PI03-PRICING-FEASIBILITY
DOCUMENT_STATUS                    = PROPOSED_NOT_EFFECTIVE
RECOMMENDED_OPTION                 = OPTION_2_KEEP_PRESERVED_QUOTA_AND_CLASSIFY
RECOMMENDED_OPTION_STATUS          = PROPOSED_NOT_EFFECTIVE
REQUIRED_APPROVAL                  = programme owner (NOT_GRANTED)
PRICING_MINIMUM_EXP_MC10_04        = 8  (UNCHANGED)
PRICING_MINIMUM_EXP_MC10_05        = 8  (UNCHANGED)
THRESHOLD_REDUCTION                = PROHIBITED
SEG-01..SEG-03, SEG-07             = REACHABLE_AT_PLANNED_MAX
SEG-04, SEG-05, SEG-06, SEG-08     = BELOW_REGISTERED_MINIMUM (qualitative pricing only)
WAVE1_PRICING_ELIGIBLE_SEGMENTS    = SEG-01, SEG-03 (only at 8/8 completed pricing-module interviews)
MATRIX_CELLS                       = 32 (16 reachable, 16 below minimum, 0 executed)
EXPERIMENTS_EXECUTED               = 0
PRICE_RESPONSES                    = 0
PARTICIPANTS                       = 0
LADDERS_ADMINISTERED               = 0
LADDER_FREEZE_SHA256               = bfa09ebc904a66ba65961864d5e026638e3756a41a0611f0c3fdf1e83bb5be8c (match)
WTP_STATED_PREFERENCE_OBSERVED     = false
WTP_COMMERCIALLY_VALIDATED         = false
APPROVED_PRICES                    = 0
PROFITABILITY                      = NOT_ESTABLISHED
EXTERNAL_AUTHORIZATION_STATUS      = NOT_GRANTED
FIELDWORK_STATUS                   = BLOCKED
FIELDWORK_READINESS                = PARTIALLY_READY
MC10R_STATUS                       = IN_PROGRESS
```

This document classifies a recorded planning defect. It does not execute an experiment, does not measure a
price, does not approve a price, does not grant authorization and does not lift the fieldwork block. No
agent may confer an `APPROVED_FOR_FUTURE_FIELDWORK` state on it; only a real, recorded programme-owner
approval can supersede `PROPOSED_NOT_EFFECTIVE`, and even then the registered `n >= 8` minimum and the
preserved quota contract remain exactly as recorded here unless a dated amendment says otherwise.
