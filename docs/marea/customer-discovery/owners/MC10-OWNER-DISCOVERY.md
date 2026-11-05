# MC-10 — Owner discovery framework (D8)

| Field | Value |
| --- | --- |
| Document ID | MC-10 / D8 / MC10-OWNER-DISCOVERY |
| Milestone | MC-10 of 36 — primary customer discovery |
| Segments covered | `SEG-01` recreational motorboat owners · `SEG-02` sailing yacht owners · `SEG-03` marina-based owners of unattended vessels |
| Status | `NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED)` |
| Owners identified | **0** |
| Owners contacted or invited | **0** |
| Owners screened | **0** |
| Owners consented | **0** |
| Completed owner interviews | **0** |
| Coded interview units | **0** |
| Purchase records with amount band and currency | **0** |
| Verbatim participant quotes available | **0** |
| Monitoring incidents or near-misses recorded | **0** |
| Willingness to pay | `NOT_MEASURED` |
| Base | MC-09 HEAD `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3` |
| Working branch | `feature/marea-mc10-primary-customer-discovery` |
| Date | 2026-11-01 |
| Author | Agent C — Owner Research Specialist (MC-10), under the Lead's research programme authority |
| Write scope | This file only (`docs/marea/customer-discovery/owners/`) |
| Machine-readable authorities | `../data/research-status.json`; `../data/fieldwork-authorization.json`; `docs/marea/market-validation/data/validation-experiments.json` (frozen MC-09 registry) |
| Is not | Interview evidence, a recruitment list, a validated persona, a demand estimate, a price study, a product recommendation, an availability statement or a promise that any owner exists |

STATUS: NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED)

## 0. Purpose, reading rules and authoritative state

This document is the **prepared** owner-side discovery framework for MC-10. It defines who would have
been studied, what would have been asked, what would have been recorded, how each answer would have
been scored against the preregistered thresholds, and what would have counted as a real case. Nothing
in it was administered, because no outreach authorization exists.

Reading rules:

1. **No owner was interviewed.** Every count is 0 because fieldwork is blocked. A count of 0 is an
   absence of data and is never evidence that demand is absent.
2. **Preparation is not execution.** A prepared question is not an answer; a planned threshold is not
   an observation; a designed table is not a finding. This document converts no design into a result.
3. **No participant, quote, incident or amount appears anywhere below.** The only quoted text in this
   document is MC-09 instrument wording and MC-09 registry wording, both marked as such. Instrument
   wording is not participant speech.
4. **Intended end state.** Product and bundle descriptions in this document describe defined target
   specifications. All MAREA products and bundles are `DEFINED` / `NOT_FOR_SALE`, the brand is not
   trademark-cleared, and nothing is available, certified or orderable.
5. **Intermediaries are out of scope here.** Installers (`SEG-04`), retailers (`SEG-05`), operators
   (`SEG-06`), charter and schools (`SEG-07`) and fleet managers (`SEG-08`) are studied under separate
   deliverables. An owner answer is never used as a proxy for a professional answer, and vice versa.

Authoritative state, quoted from the Lead-owned records:

```
MC-10 MILESTONE         = BLOCKED
OUTREACH_AUTHORIZATION  = NOT_GRANTED
FIELDWORK_STATUS        = BLOCKED
FIELDWORK_EXECUTED      = false
AUTH-MC10-001           = NOT_GRANTED
OWNER PARTICIPANTS      = 0
OWNER INTERVIEWS        = 0
WTP                     = NOT_MEASURED
```

Driving decisions: `D-029` (MC-10 stops at the outreach gate and reports `BLOCKED`), `D-030` (absence
of primary evidence changes no product priority), `D-031` (instruments and thresholds frozen before
fielding; Portuguese versions withheld), `D-032` (no commercial restriction weakened; stated
preference remains `NOT_MEASURED`), `D-033` (MC-11 inherits no customer evidence).

## 1. Who would have been studied

All three segments are owner-side and are defined operationally, not demographically. The definitions
and quotas below are preserved unchanged from the MC-09 discovery plan and the Lead-owned
`research-status.json`; they are not proposed here.

| Segment | Operational definition | Screener gate | Planned min | Planned max | Completed in MC-10 | Valid analysis cases |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| `SEG-01` | Owns a 6–15 m motorboat, day or coastal use, decision-maker on equipment purchases | SCREEN-01 S1–S4, S6, S8 | 5 | 8 | 0 | 0 |
| `SEG-02` | Owns a 7–16 m sailing yacht, cruises or races, decision-maker on equipment purchases | SCREEN-01 S1–S4, S6, S8 | 5 | 8 | 0 | 0 |
| `SEG-03` | Owner-occupier whose vessel stays afloat unattended for weeks and who cares about monitoring | SCREEN-01 S1–S4, S6, S8; unattended-vessel condition | 5 | 8 | 0 | 0 |
| — | **Owner-side subtotal** | — | **15** | **24** | **0** | **0** |

Planned geography: Rías Baixas / Galicia prepared. Northern Portugal remains unavailable because
Portuguese instruments are deliberately `NOT_PRODUCED` without qualified linguistic review
(`BLK-MC10-07`). No geographic distribution exists to report.

Planned acquisition sources — each `NOT_AUTHORIZED`, no channel is authorized and none was used:

- Partner-marina berth-holder channels, approached only through a recorded institutional permission
  (no berth-holder list has ever been obtained by MC-09 or MC-10).
- Yacht-club noticeboards and club-secretary introductions.
- Installer customer rosters, only with written introducer consent, with the owner's own contact.
- Trade-association member channels.
- No purchased lists, no scraped personal emails, no private marina customer records, no cold
  automated campaigns, no paid-advertising recruitment.

Validity rules that would apply: vary acquisition source within a segment and log source per
participant; include referred and non-referred participants; a participant is counted in **exactly one**
segment; the owner-side sample is never reported as representative of any population.

### 1.1 Why owners are separated from professionals

Owners describe what they bought, why, and what it cost them. They do not speak for installers,
retailers or marinas, and they must never be asked to estimate installer or channel behaviour. The
MC-09 plan records this separation as a validity requirement: owner enthusiasm is not channel
viability, and a professional's caution is not a demand signal. No result in this document may be
reported as installer, retail or operator evidence.

## 2. The prepared interview frame

### 2.1 The 15-step order and its mapping

The instrument is the frozen `GUIDE-01` moderator guide of the MC-09 discovery plan (English text,
§6.3), with 15 numbered steps. The mapping below assigns every step to a question area and to the
experiments whose evidence it would produce. It is a mapping of preparedness, not of collected data.

| Step | `GUIDE-01` section | Question area | Experiments fed | Evidence produced (planned) | Gate |
| ---: | --- | --- | --- | --- | --- |
| Q1 | Context | A1 Vessel context | `EXP-MC10-01`, `EXP-MC10-09` profile | Vessel class, use, season, decision role | No brand, no prices |
| Q2 | Current equipment and setup | A2 Current equipment and services | `EXP-MC10-01`, `EXP-MC10-09` existing monitoring | Named equipment, age, connectivity, gaps | No brand, no prices |
| Q3 | Current workflow | A3 Unprompted recent problems | `EXP-MC10-01`, `EXP-MC10-09` | Last trip / last maintenance job, what was checked by hand, what was missing | No brand, no prices |
| Q4 | Recent real purchase decisions | A4 Actual recent purchases and decision process | `EXP-MC10-01` | Dated purchase record: product, year, amount band, currency, trigger, alternatives, outcome | No brand, no prices |
| Q5 | Current spend | A4 Spend bands | `EXP-MC10-01`, `EXP-MC10-03` context | Annual category bands per vessel, recurring vs one-off | No brand, no prices |
| Q6 | Current alternatives | A5 Alternatives | `EXP-MC10-01`, `EXP-MC10-03` | Named products/manual substitutes, what works, what annoys, switch triggers | No brand, no prices |
| Q7 | Pain-point discovery (undirected) | A3 Unprompted problems | `EXP-MC10-01` primary; `EXP-MC10-09` incident narrative | Problem in the participant's words plus economic/operational consequence | No solutions offered, no category names |
| Q8 | Installation | A4 Workarounds and installation concerns | `EXP-MC10-01` (cost/workaround), `EXP-MC10-06` installation exclusion context | Who would install, documentation/warranty demands, rework and downtime fears | No brand, no prices |
| Q9 | Subscription | A6 Subscription attitudes | `EXP-MC10-03` primary | Objection codes, must-work-for-free functions, cadence, per-vessel vs per-person | No brand, no prices |
| Q10 | Trust and warranty | A8 Trust, warranty and data-ownership barriers | `EXP-MC10-10` primary | Top-3 barrier ranking, written-term demands, data-ownership position, trust reference | No brand, no prices |
| Q11 | Concept comprehension | Concept exposure and unaided restatement | `EXP-MC10-06` primary | Correct inclusions, correct exclusions, critical misconceptions, verbatim restatement | First and only brand-free concept exposure |
| Q12 | Conditional pricing (`PRICE-01`) | Pricing module | `EXP-MC10-04`, `EXP-MC10-05` | Stated-price responses as research opinions only | Only after Q11; frozen ladder only |
| Q13 | Purchase-intent evidence (not an order) | Stated intent scale | `EXP-MC10-04` | Categorical intent answer, with nothing orderable | Never recorded as a pre-order |
| Q14 | Closing | Negative cases and final priority | `EXP-MC10-01`, `EXP-MC10-10` | Counterexamples, single most important point | Nothing may be sold or promised |
| Q15 | Follow-up permissions | Follow-up permission | none (permission only) | Yes/no, channel, scope, expiry; withdrawable | Not evidence of interest |

Moderator discipline carried from the frozen guide: ask, then stop talking; probe with "why", "what
happened next", "how did you decide", never with a feature; state no price before `PRICE-01`; never
describe MAREA as available; record verbatim wording; if asked whether anything can be bought, answer
"no". `Q1`–`Q11` are conducted before the brand is named, so no owner-side evidence about a MAREA
product could be created before the concept-comprehension step.

### 2.2 Question areas in detail

The eight areas below are the substance of the owner frame. Question wording is quoted from the
frozen `GUIDE-01`; it is instrument text, not participant speech.

#### A1 — Vessel context (`Q1`)

> "Tell me what vessel you own or manage and how you use it through the year."

Probes: season, average days aboard, type of trips, who else uses or decides. Recorded: vessel class
and length band, use pattern, decision role, other decision-makers, language, region. What an answer
can never be turned into: a market-size or segment-population estimate, or a claim that owners
"typically" behave a certain way.

#### A2 — Current equipment and services (`Q2`)

> "What electronics are aboard — navigation, autopilot, AIS, depth, batteries, sensors? How old is it?
> How is it connected?"

Probes: what works, what does not, what has never been updated, which brands and models are
remembered. Recorded: named equipment families, approximate age, connectivity/protocol claims as
stated by the owner (never verified by the researcher), subscriptions currently paid as remembered.
What an answer can never be turned into: a compatibility finding, an installed-base measurement, or a
verified technical fact about the vessel.

#### A3 — Unprompted recent problems (`Q3`, `Q7`)

> "Describe your last trip or last maintenance job, from planning to returning."

> "What is most frustrating about owning or managing this vessel? What has cost you time or money?
> What have you tried to fix and could not?"

Probes: what information was checked, where it was written down, what was checked by hand, whom the
owner had to ask, what happened that was not expected. Rule: do not propose solutions and do not name
product categories. This is the primary `EXP-MC10-01` evidence: a problem must appear **unprompted**
and in the participant's own words, before any concept is described.

#### A4 — Actual recent purchases, workarounds and amount bands (`Q4`, `Q5`, `Q8`)

> "Think about the last equipment or service purchase for the vessel in the last 24 months. What did
> you buy, when, why, how much, and how did you decide?"

> "Without exact figures: which categories do you spend on each year, and in what bands?"

Recorded for a purchase: product or service, year, amount **band** and currency exactly as stated,
one-off vs instalment vs maintenance fee, who influenced, alternatives compared, trigger, outcome, and
what went wrong afterwards. Recorded for spend: annual category bands only (maintenance, safety,
communications, chart or software subscriptions, security, insurance), recurring flag, currency.

Hard rules: an amount band is recorded only as the participant stated it; an amount the participant did
not state is never invented, averaged, converted or inferred from a similar vessel; unknown fields are
left empty rather than written as zero; no amount is ever written into a commercial price field. A
"workaround cost" is recorded only where the owner names a concrete cost (money, time, or a product
bought) and distinguishes it from a general complaint.

#### A5 — Alternatives and decision process (`Q6`, `Q4` probes)

> "What products, apps or services do you use for these things today? What do you like and what annoys
> you about each?"

Probes: manual substitute (notebook, phone, radio), market leader, why they stay, what would make them
switch. Recorded: named alternatives in the participant's own words, satisfaction and objection codes,
switch conditions. Rule: the researcher does not name competitors or suggest categories; an
alternative is countable only if the participant named it.

#### A6 — Subscription attitudes (`Q9`)

> "What do you think about paying a recurring fee for boat software or services?"

Probes: which functions must keep working without paying, preferred cadence, what would be included or
excluded, what would make them cancel, what they have paid for before and whether they renewed,
per-vessel versus per-person charging. Recorded: objection codes, must-survive-cancellation
statements, preferred cadence, acceptable annual **band** per service type only if volunteered,
lockout reaction. `EXP-MC10-03` requires at least one unprompted alternative payment model per
participant; a model suggested by the interviewer does not count.

#### A7 — Monitoring needs (`Q3`, `Q6`, `Q7`, `Q9`; `EXP-MC10-09`)

Monitoring is not a dedicated numbered step in the frozen guide. For `SEG-03` it is the central
question, and the evidence would have to come from: the last-trip and last-maintenance narrative
(`Q3`), named current alternatives such as marina checks, neighbours, alarms and diallers (`Q6`), the
undirected problem question (`Q7`), and the subscription-attitude discussion about a monitoring
service (`Q9`). Recorded per participant: how the boat is checked while away, who is called and how,
seasonal frequency, current spend on checking or security as a band, the alerts the owner says they
would act on, sharing/access expectations, and the owner's own report of mobile coverage at the berth
(never verified by the researcher).

`EXP-MC10-09` additionally requires each participant to describe **a concrete recent incident or
near-miss with an unattended vessel and what information was lacking**. The frozen `GUIDE-01` v1.0.0
contains no dedicated incident question. This is recorded as a **design gap**: either the incident must
be elicited through `Q7`/`Q3` probes exactly as frozen, and the gap disclosed in the analysis, or a
dedicated incident question must be added by a **dated instrument amendment creating a new frozen
version** before any fielding. The gap may not be papered over by inventing an incident, by counting a
hypothetical ("it could happen"), or by generalising a second-hand story. The owner side of
`EXP-MC10-09` cannot PASS without it; the operator side (3 operator interviews) also belongs to a
different deliverable, so this experiment is cross-deliverable by design.

#### A8 — Trust, warranty and data-ownership barriers (`Q10`)

> "What would make you distrust a new company in this sector?"

Probes: written warranty needed and for how long; who is responsible if an installation is faulty; who
owns the boat's data; what should happen to the data on non-payment or company disappearance; which
trust reference is sought (installer, known brand, distributor). Recorded: ranked top-3 barriers with
verbatim wording per barrier, the point in the conversation where each barrier arose, whether a written
warranty or data-processing term would be required before a trial, and the incumbent compared against.
Barrier codes follow the preregistered owner taxonomy `OBJ-OWN-01`…`OBJ-OWN-15` used by the buyer-
objections deliverable; this document does not redefine them.

Note on measurement bias: the interviewer must disclose that MAREA is a proposed brand with no
certified, priced or purchasable product. That disclosure can itself trigger the trust barrier. This
confounder is registered for `EXP-MC10-10` and must be reported, never suppressed.

### 2.3 Instrument preconditions before any fielding

| Precondition | State | Effect |
| --- | --- | --- |
| Outreach authorization `AUTH-MC10-001` | `NOT_GRANTED` | No candidate may be identified or contacted |
| Named data controller and verified privacy contact | `BLOCKED` (`BLK-MC10-02`) | No participant information notice can be issued |
| Qualified legal review of lawful basis and recruitment | `BLOCKED` (`BLK-MC10-03`) | No consent can be taken |
| `GUIDE-01` v1.0.0 frozen and reviewed | `COMPLETE` (W0-16) | Thresholds and instruments frozen by hash |
| Qualified ES/EN bilingual sign-off | `PARTIAL` (W0-07) | Translation equivalence reviewed, not established |
| Portuguese instruments | `NOT_PRODUCED` (W0-08) | Northern Portugal unavailable |
| Dedicated monitoring-incident question for `EXP-MC10-09` | `GAP — NOT IN FROZEN v1.0.0` | Requires dated amendment and new frozen version before fielding |
| Secure Layer A/B research data store | `BLOCKED` (`BLK-MC10-05`) | No participant data may be collected or held |
| Human interviewer panel | `BLOCKED` (`BLK-MC10-06`) | The runtime has no outbound contact capability |

## 3. Per-segment evidence frame and required denominators

The denominators below are the registered ones. They are stated before any data exists so that no
later percentage can be computed against a convenient base.

| Segment | Min completed interviews (registered) | Denominator for participant-level rates | Denominator for theme rates | Mandatory record per participant | Segment-specific extra requirement |
| --- | ---: | --- | --- | --- | --- |
| `SEG-01` | 5 (programme target 8–10) | Consent-valid completed interviews in `SEG-01` | Coded units from `SEG-01` transcripts | Verbatim-coded transcript; one purchase record with year, amount band and currency; spend-band profile; named alternatives; barrier ranking | At least one unprompted data-fragmentation problem statement in the owner's words |
| `SEG-02` | 5 | Consent-valid completed interviews in `SEG-02` | Coded units from `SEG-02` transcripts | Same as `SEG-01` | Sailing-specific workflow: instruments, autopilot, wind/depth, passage planning; installation and takeover concerns |
| `SEG-03` | 5 | Consent-valid completed interviews in `SEG-03` | Coded units from `SEG-03` transcripts | Same as `SEG-01`, plus monitoring record: current checking routine, escalation path, seasonal frequency, coverage claim | One concrete recent incident or near-miss narrative with the information the owner lacked (see A7 gap) |

Additional denominators that apply across the owner side:

- A participant counts once, in one segment, in one wave. A participant reused across a qualitative
  and a pricing session counts once for participant-level rates and requires a documented protocol
  deviation (registry rule for `EXP-MC10-03`).
- A theme percentage is computed only where coded units exist. With zero coded units the percentage is
  not 0% and not 100%: it is **undefined** and reported as `—`.
- `EXP-MC10-05` needs `n>=8` per segment per construct — a higher bar than the qualitative minimum, so
  a segment can be sufficient for qualitative discovery and still insufficient for a price structure.
- `EXP-MC10-06` requires `n>=5` per segment and unaided recall for **at least three** concepts.
- `EXP-MC10-09` requires 5 owner interviews **and** 3 operator interviews; the owner side alone can
  never satisfy it.
- `EXP-MC10-10` is cross-segment: PASS requires the top-3 condition in **at least three** segments, so
  it cannot be reached from the owner side alone.
- Saturation is a stopping rule for theme discovery only ("no new code in the last two interviews"); it
  is never a prevalence measure.

## 4. Preregistered thresholds (quoted from the MC-09 registry)

Source of record: `docs/marea/market-validation/data/validation-experiments.json` (MC-09). The
records were frozen by SHA-256 in MC-10 before any data could exist (`data/experiments.json`,
verified by the research-integrity gate). A threshold may not be relaxed after fielding; a legitimate
change requires a dated amendment, a new frozen version and independent review. Nothing below was
reached — every experiment is `NOT_EXECUTED` / `BLOCKED`.

### 4.1 `EXP-MC10-01` — real problem and purchase history

- **Hypothesis (quoted).** "At least four of the eight defined buyer segments experience a recurring,
  economically consequential boat-data fragmentation problem that they already spend money or time to
  work around, and can describe a recent real purchase made to address it."
- **Minimum evidence (quoted).** "Minimum 5 and target 8-10 completed interviews per narrowly defined
  segment (n=40-80 total), each with a verbatim-coded transcript and a documented purchase-history
  answer naming product, year, amount band and currency. Two independent coders. Saturation recorded
  per segment (no new code in the last two interviews). Statistical inference is explicitly not
  attempted."
- **Threshold (quoted).** "PASS (problem exists): a problem theme appears unprompted in >=60% of coded
  units in a segment AND >=50% of that segment's participants name a concrete prior spend or workaround
  cost. FAIL (no material problem): theme appears in <=20% of participants and no current spend is
  evidenced. Between 20% and 60% = INCONCLUSIVE, requiring a quantitative stage. No threshold may be
  relaxed after fielding."
- **Owner-side bands for `SEG-01`/`SEG-02`/`SEG-03`:**

  | Band | Condition (quoted registry meaning) | Verdict |
  | --- | --- | --- |
  | PASS | Theme unprompted in `>=60%` of coded units **and** `>=50%` of segment participants name a concrete prior spend or workaround cost | `PASS` |
  | FAIL | Theme in `<=20%` of participants **and** no current spend evidenced | `FAIL` |
  | INCONCLUSIVE | Between 20% and 60% (or spend evidence missing) | `INCONCLUSIVE`, requires a quantitative stage |
  | No data | 0 coded units, 0 participants | `BLOCKED` — not `INCONCLUSIVE`, not `FAIL` |

  Note the asymmetry the registry requires: FAIL needs two conditions (low prevalence **and** no spend
  evidence). A low-prevalence theme with evidenced spend is not a FAIL; it is at best inconclusive.
- **Registered confounders (registry items, quoted verbatim).**
  - "Purposive recruitment over-represents engaged owners and marina-affiliated owners"
  - "Interviewer familiarity with MAREA concepts can bias probing"
  - "Retrospective purchase recall error and amount rounding"
  - "Selection of early-adopter respondents by gatekeepers"
  - "Seasonality (autumn 2026 refit and lay-up period)"
- **Interpretation (quoted).** "A PASS establishes only that this sample consistently reports a costly
  problem worth a later quantitative test; it does not establish demand size, conversion, revenue or
  willingness to pay." Willingness to pay therefore remains `NOT_MEASURED` after this experiment.

### 4.2 `EXP-MC10-03` — subscription attitudes

- **Hypothesis (quoted).** "Owners and small operators reject an always-on subscription for locally
  available functions but will consider a subscription for genuinely continuous external services
  (forecast data, remote monitoring, connectivity), provided local safety and navigation functions keep
  working without it."
- **Minimum evidence (quoted).** "All interviewed participants complete the subscription-attitude
  block; >=5 objection codes per segment and at least one unprompted alternative payment model per
  participant. Van Westendorp subscription module completed by every participant (n=5-10 per segment,
  indicative only)."
- **Threshold (quoted).** "PASS (subscription model conditionally acceptable): >=50% of a segment
  names at least one external-service subscription they would consider AND >=50% state that loss of
  local functions would be a blocking objection that must be answered. FAIL: a majority reject any
  recurring charge regardless of service scope. Indicative acceptable ranges from Van Westendorp are
  recorded as hypotheses for quantitative testing only."
- **Bands:** PASS = both `>=50%` conditions in a segment; FAIL = a majority reject any recurring charge
  regardless of scope. The registry defines no separate INCONCLUSIVE band; per the analysis plan
  (`ANA-01` §7), any ambiguous result defaults to `INCONCLUSIVE`. No data = `BLOCKED`.
- **Registered confounders (registry items, quoted verbatim).**
  - "Subscription fatigue and prior bad experiences with marine apps"
  - "Confusion between chart-data licensing and MAREA service fees"
  - "Hypothetical local-function lockout described only in words"
  - "Owner confusion between per-vessel and per-user pricing"
  - "Small n making percentage thresholds unstable"
- **Interpretation (quoted).** "A PASS licenses only the decision to test a subscription model
  quantitatively with real price points and a working prototype. It does not validate any price,
  conversion rate or recurring-revenue assumption."

### 4.3 `EXP-MC10-05` — stated price perception (owner constructs)

- **Hypothesis (quoted).** "Owners and operators hold a coherent acceptable price range for
  navigation/weather software and for monitoring hardware-plus-subscription, and their too-cheap,
  bargain, expensive and too-expensive points cluster by segment rather than being randomly
  distributed."
- **Minimum evidence (quoted).** "All four Van Westendorp questions answered per construct; n>=8 per
  segment per construct; consistency check (too cheap < bargain < expensive < too expensive) enforced
  and violations recorded, not silently corrected."
- **Threshold (quoted).** "PASS (usable price structure): >=70% of responses are internally consistent
  and the sample produces a non-degenerate acceptable range (range exists and is bounded by at least
  two responses on each side). FAIL: fewer than 50% consistent responses, or answers effectively
  uninterpretable because participants cannot separate hardware, software and installation cost."
- **Bands:** PASS `>=70%` consistent **and** non-degenerate range; FAIL `<50%` consistent or
  uninterpretable. The 50–70% interval is neither PASS nor FAIL as written and defaults to
  `INCONCLUSIVE` under `ANA-01` §7. No data = `BLOCKED`.
- **Owner-side rule.** The module is `PRICE-01`, administered only after `Q11` concept comprehension so
  that price cannot anchor problem discussion. No ladder may be adjusted mid-interview; a stated value
  is a research opinion, never an offer, never a commercial price field, and never WTP evidence until a
  quantitative study exists. `WTP` remains `NOT_MEASURED`.
- **Registered confounders (registry items, quoted verbatim).**
  - "Participants unfamiliar with pricing marine software anchor on consumer apps"
  - "Mixing hardware and installation in one mental price"
  - "Currency and VAT confusion in cross-border samples"
  - "Cultural willingness to state 'don't know' differs by segment"
  - "Small n makes range boundaries unstable"

### 4.4 `EXP-MC10-06` — concept comprehension (owner hand-off)

- **Hypothesis (quoted).** "After hearing neutral concept descriptions, owners and operators can
  correctly restate what each bundle does and, critically, what it excludes (charts, installation,
  transponder transmission, collision avoidance, assured connectivity) without being prompted."
- **Minimum evidence (quoted).** "Unaided recall of composition and exclusions for at least three
  bundle concepts; two independent coders scoring against a fixed rubric; n>=5 per segment; verbatim
  transcript of the explanation step retained."
- **Threshold (quoted).** "PASS: >=70% of participants correctly restate at least two exclusions per
  concept AND <=20% hold a critical misconception. FAIL: >40% hold a critical misconception on any
  concept, which blocks any public copy for that concept. Between = INCONCLUSIVE, requiring copy
  revision and retest with a new sample."
- **Owner-side handling.** The owner interview administers concept exposure at `Q11`, before any
  pricing. The descriptions, the inclusion/exclusion rubric, the critical-misconception list, the
  scoring procedure and the empty score tables live in `../MC10-CONCEPT-COMPREHENSION.md` (D15); this
  document only fixes the hand-off point and the rule that no concept is shown before `Q11`.
- **Registered confounders (registry items, quoted verbatim).**
  - "Interviewer explanation quality varies despite a scripted neutral description"
  - "Participants may repeat wording without understanding it"
  - "Concepts are unfamiliar, so comprehension may reflect novelty rather than copy quality"
  - "Testing three concepts in one session causes interference"

### 4.5 `EXP-MC10-09` — unattended-vessel monitoring needs (owner side)

- **Hypothesis (quoted).** "Owners of unattended vessels and marina/shipyard operators share the same
  operational problem (knowing whether a boat is safe afloat) but value different evidence: owners want
  bilge/power/geofence alerts, operators want work-list and handover information rather than raw sensor
  feeds."
- **Minimum evidence (quoted).** "Minimum 5 owner interviews and 3 operator interviews; each
  participant must describe a concrete recent incident or near-miss with an unattended vessel and what
  information they lacked."
- **Threshold (quoted).** "PASS (shared problem, different jobs): >=60% of owners name at least one
  alert they would act on AND >=2 operators name a handover or work-list information need. FAIL:
  monitoring is considered a marina-provided service that owners will not pay for separately."
- **Bands:** PASS needs both sides; FAIL is the marina-provided-service interpretation. No data =
  `BLOCKED`; the owner side alone is structurally insufficient. The registry defines no separate
  INCONCLUSIVE band; ambiguous cases default to `INCONCLUSIVE` under `ANA-01` §7.
- **Registered confounders (registry items, quoted verbatim).**
  - "Insurance-driven behaviour rather than willingness to buy"
  - "Marinas may fear liability from a monitoring service"
  - "Mobile data coverage at berths is variable and hard to verify quickly"
  - "Owner and operator incentives can be opposed (operator wants fewer calls, owner wants more alerts)"
- **Interpretation (quoted).** "A PASS establishes a two-sided information need worth prototyping; it
  does not validate a monitoring price or a marina partnership." No monitoring guarantee of any kind
  may be implied by a finding.

### 4.6 `EXP-MC10-10` — trust, warranty and data-ownership barriers (owner portion)

- **Hypothesis (quoted).** "Trust, warranty and data-ownership concerns (who owns vessel data, what
  happens on subscription lapse, who is liable for an installation fault, whether the brand will exist
  in five years) block purchase decisions more often than feature gaps do."
- **Minimum evidence (quoted).** "Every participant ranked or stated the top-3 barriers to adoption;
  barrier codes applied by two coders; at least one verbatim per barrier per segment."
- **Threshold (quoted).** "PASS (trust is the binding constraint): data-ownership or warranty/liability
  concerns appear among the top-3 barriers for >=50% of participants in at least three segments, which
  requires a documented warranty, liability and data-ownership position before any pilot. FAIL: barriers
  are distributed with no dominant theme."
- **Bands:** PASS requires `>=50%` top-3 in **at least three segments** (cross-segment, so not reachable
  from `SEG-01`–`SEG-03` alone); FAIL = no dominant theme. No separate INCONCLUSIVE band; ambiguous
  results default to `INCONCLUSIVE`. No data = `BLOCKED`.
- **Registered confounders (registry items, quoted verbatim).**
  - "Brand unfamiliarity confounded with distrust of a young company"
  - "Warranty expectations shaped by incumbent brands with long support records"
  - "Interviewer disclosure of MAREA's conceptual status can itself trigger the barrier"
  - "Barrier ranking may be inconsistent with unstated behaviour"

### 4.7 Verdict arithmetic applied to this framework

For every experiment in §4 the current verdict is identical and is not a judgement about the market:

| Experiment | Execution | Verdict | Participants | Coded units | Note |
| --- | --- | --- | ---: | ---: | --- |
| `EXP-MC10-01` | `NOT_EXECUTED` | `BLOCKED` | 0 | 0 | No percentage has a denominator |
| `EXP-MC10-03` | `NOT_EXECUTED` | `BLOCKED` | 0 | 0 | No subscription stance exists |
| `EXP-MC10-05` | `NOT_EXECUTED` | `BLOCKED` | 0 | 0 | No price response exists; WTP `NOT_MEASURED` |
| `EXP-MC10-06` | `NOT_EXECUTED` | `BLOCKED` | 0 | 0 | No concept was shown (see D15) |
| `EXP-MC10-09` | `NOT_EXECUTED` | `BLOCKED` | 0 | 0 | No incident narrative exists |
| `EXP-MC10-10` | `NOT_EXECUTED` | `BLOCKED` | 0 | 0 | No barrier ranking exists |

`BLOCKED` is not `INCONCLUSIVE`. INCONCLUSIVE requires data that sits between bands; BLOCKED means no
data exists at all. No experiment may be reported as PASS, FAIL or INCONCLUSIVE in MC-10.

## 5. Confounders and validity risks

Owner-side risks, beyond the per-experiment confounders quoted in §4:

| Risk | Why it matters for `SEG-01`–`SEG-03` | Handling if fieldwork ever runs |
| --- | --- | --- |
| Purposive, non-probability sample | Marina-affiliated and engaged owners are over-represented; there is no margin of error and no representativeness | State it in every result; never extrapolate to a population, market size or revenue |
| Gatekeeper selection | Club secretaries and marina offices may introduce only friendly, early-adopter owners | Log source per participant; include non-referred participants; report source mix |
| Segment overlap | A `SEG-02` owner may also keep the boat unattended (`SEG-03` conditions) | Fix segment assignment at screening; one participant, one segment |
| Retrospective recall and rounding | Purchase amounts are remembered approximately and rounded | Record amount bands as stated; never reconstruct an exact figure |
| Amount-band inflation or deflation | Owners may misreport spend to appear frugal or serious | Record band and currency verbatim; never correct the participant |
| Interviewer concept familiarity | Probing may leak MAREA framing before `Q11` | Frozen guide discipline; no brand in `Q1`–`Q11`; recorded as a quality flag |
| Seasonality | Autumn 2026 is refit and lay-up season; winter monitoring salience peaks | Record interview date and season; do not generalise seasonality effects |
| Brand-status disclosure | Honest disclosure that MAREA is proposed and not for sale can itself trigger trust barriers | Registered confounder for `EXP-MC10-10`; report, never suppress |
| Social desirability | Owners may overstate interest to be helpful, especially in an unremunerated interview | Interest is never counted as intent, and intent is never counted as demand |
| Language and translation | ES/EN equivalence is reviewed, not statistically established; PT instruments absent | Record language per participant; report translation as a limitation; no PT fielding |
| Single geography | Rías Baixas / Galicia only | No transfer to the Mediterranean, northern Europe or inland markets |
| Small n | 5–8 per segment detects only strong signals and catastrophic misunderstandings | Report raw counts with the denominator they are computed on (participants or coded units); never report confidence intervals |

Standing statistical limitation, carried from the discovery plan: within-sample coding proportions
describe these participants only; willingness to pay from a stated-preference exercise is
systematically optimistic relative to real purchase; and self-selection is unavoidable, because people
who accept an interview differ from those who refuse.

## 6. Empty results tables — no owner was interviewed

**No owner was interviewed.** Every table in this section is the prepared structure of a result, not a
result. Every cell is `0`, `—` or `n=0` because fieldwork is blocked; the tables must not be read as
"owners do not report this".

### 6.1 Participation funnel

| Stage | `SEG-01` | `SEG-02` | `SEG-03` | Total |
| --- | ---: | ---: | ---: | ---: |
| Identified | 0 | 0 | 0 | 0 |
| Contact authorized | 0 | 0 | 0 | 0 |
| Invited | 0 | 0 | 0 | 0 |
| Responded | 0 | 0 | 0 | 0 |
| Screened | 0 | 0 | 0 | 0 |
| Eligible | 0 | 0 | 0 | 0 |
| Consented (C1–C4 recorded) | 0 | 0 | 0 | 0 |
| Interview completed | 0 | 0 | 0 | 0 |
| Analysis eligible | 0 | 0 | 0 | 0 |
| Withdrawn | 0 | 0 | 0 | 0 |
| Excluded | 0 | 0 | 0 | 0 |

### 6.2 Problem discovery (`EXP-MC10-01`)

| Measure | `SEG-01` | `SEG-02` | `SEG-03` | Owner-side total |
| --- | ---: | ---: | ---: | ---: |
| Participants with a completed interview | 0 | 0 | 0 | 0 |
| Coded units | 0 | 0 | 0 | 0 |
| Unprompted problem themes | 0 | 0 | 0 | 0 |
| Theme prevalence (within segment) | n=0 — `—` | n=0 — `—` | n=0 — `—` | `—` |
| Participants naming a concrete prior spend or workaround | 0 | 0 | 0 | 0 |
| Spend-evidence prevalence | n=0 — `—` | n=0 — `—` | n=0 — `—` | `—` |
| Saturation reached | 0 (not reached) | 0 (not reached) | 0 (not reached) | — |

### 6.3 Purchase history and spend bands (`EXP-MC10-01`, `EXP-MC10-05` context)

| Record type | `SEG-01` | `SEG-02` | `SEG-03` | Total |
| --- | ---: | ---: | ---: | ---: |
| Purchase records (product, year, amount band, currency) | 0 | 0 | 0 | 0 |
| Spend-band profiles (annual categories) | 0 | 0 | 0 | 0 |
| Named alternatives from participants | 0 | 0 | 0 | 0 |
| Rejected alternatives described | 0 | 0 | 0 | 0 |
| Workaround costs with a named cost | 0 | 0 | 0 | 0 |
| Currency codes recorded | 0 | 0 | 0 | 0 |

### 6.4 Subscription attitudes (`EXP-MC10-03`)

| Measure | `SEG-01` | `SEG-02` | `SEG-03` | Total |
| --- | ---: | ---: | ---: | ---: |
| Subscription-attitude blocks completed | 0 | 0 | 0 | 0 |
| Objection codes applied | 0 | 0 | 0 | 0 |
| Unprompted alternative payment models | 0 | 0 | 0 | 0 |
| Must-work-without-subscription statements | 0 | 0 | 0 | 0 |
| Lockout reactions recorded | 0 | 0 | 0 | 0 |
| Acceptable annual bands volunteered | 0 | 0 | 0 | 0 |
| Van Westendorp subscription modules completed | 0 | 0 | 0 | 0 |

### 6.5 Monitoring needs (`EXP-MC10-09`, owner side)

| Measure | `SEG-01` | `SEG-02` | `SEG-03` | Total |
| --- | ---: | ---: | ---: | ---: |
| Owner interviews eligible for the monitoring block | 0 | 0 | 0 | 0 |
| Concrete recent incidents or near-misses described | 0 | 0 | 0 | 0 |
| Alerts the owner says they would act on | 0 | 0 | 0 | 0 |
| Current checking routines recorded | 0 | 0 | 0 | 0 |
| Escalation paths recorded | 0 | 0 | 0 | 0 |
| Coverage-at-berth claims recorded (owner-reported) | 0 | 0 | 0 | 0 |
| Operator interviews (other deliverable) | — | — | — | 0 |
| `EXP-MC10-09` verdict | `BLOCKED` | `BLOCKED` | `BLOCKED` | `BLOCKED` |

### 6.6 Trust, warranty and data ownership (`EXP-MC10-10`, owner portion)

| Measure | `SEG-01` | `SEG-02` | `SEG-03` | Total |
| --- | ---: | ---: | ---: | ---: |
| Top-3 barrier rankings recorded | 0 | 0 | 0 | 0 |
| Barrier codes applied (`OBJ-OWN-01`…`OBJ-OWN-15`) | 0 | 0 | 0 | 0 |
| Verbatim statements per barrier | 0 | 0 | 0 | 0 |
| Written-warranty or data-term demands | 0 | 0 | 0 | 0 |
| Incumbent trust references named | 0 | 0 | 0 | 0 |
| Segments meeting the `>=50%` top-3 condition | 0 of 3 | 0 of 3 | 0 of 3 | 0 of 3 |

### 6.7 Concept comprehension hand-off (`EXP-MC10-06` → D15)

| Measure | `SEG-01` | `SEG-02` | `SEG-03` | Total |
| --- | ---: | ---: | ---: | ---: |
| Concepts shown to owners | 0 | 0 | 0 | 0 |
| Unaided restatements recorded | 0 | 0 | 0 | 0 |
| Correct exclusions per concept | n=0 — `—` | n=0 — `—` | n=0 — `—` | `—` |
| Critical misconceptions | 0 | 0 | 0 | 0 |
| Double-coded concept records | 0 | 0 | 0 | 0 |
| Public copy validated | 0 | 0 | 0 | 0 |

### 6.8 Raw-material inventory (what exists to analyse)

| Item | Count |
| --- | ---: |
| Audio recordings | 0 |
| Verbatim transcripts | 0 |
| Consent records (four permissions each) | 0 |
| Note-taking templates (`NOTE-01`) completed | 0 |
| Risk-of-bias / quality flags recorded | 0 |
| Distinct participant IDs | 0 |

## 7. What would count as a real case and what may never be counted

### 7.1 Admissible evidence (none of it exists)

A single owner case becomes admissible only when all of the following are true:

1. The person passed `SCREEN-01` genuinely (not by proxy) and is eligible for exactly one segment.
2. Outreach occurred under a recorded authorization, through an authorized channel, with no prohibited
   targeting and no purchase or incentive presented as payment for an opinion.
3. All four consent permissions were recorded separately (participation, recording, quote use,
   follow-up), with dates, and consent is withdrawable.
4. The interview was administered from the frozen instrument version in force at the time.
5. The transcript is verbatim-coded; paraphrases are marked as paraphrases.
6. The problem statement was offered **unprompted**, before any concept exposure.
7. A purchase record names the product or service, the year, an amount band and the currency as the
   participant stated them.
8. Two independent coders applied the fixed codebook; disagreements are resolved and the agreement
   ratio reported; at least 25% of transcripts are double-coded.
9. The record is pseudonymous; no name, address, berth number, registration number, billing data or
   special-category data enters the repository.
10. The result is reported as "within this sample (n=…)" and never as a population estimate.

### 7.2 Never countable — under any circumstance

- **AI or synthetic dialogue.** A language-model conversation, a simulated participant, a generated
  transcript or an imagined persona is not evidence, regardless of realism.
- **Second-hand reports.** "My installer says owners want X", "the marina office told me", a friend's
  opinion or a dockyard anecdote are not participant observations.
- **Staff or programme proxies.** EMBARCARTE staff, agents, contractors and programme participants are
  excluded by standing rule; their views are not customer evidence.
- **MC-09 desk research as primary evidence.** Public sources, forums, reviews, vendor pages and market
  reports are `VERIFIED_EXTERNAL` desk evidence, not interviews. A forum post is not a participant.
- **Re-used quotes.** A quote consented for one purpose cannot be reused publicly without separate
  revocable consent; a quote from a previous milestone cannot be re-counted as an MC-10 participant.
- **Paraphrase passed off as verbatim.** An interviewer summary is not a quote; a quote is the
  participant's recorded wording.
- **Reconstructed amounts.** An amount the participant did not state may not be inferred from a
  similar vessel, an average, a competitor price or a prior hypothesis. Unknown stays empty.
- **Invitations, clicks or interest.** An invitation sent, a reply received or an expression of
  enthusiasm is not a completed interview and does not fill a quota.
- **Duplicate participants.** The same person counted twice, or counted in two segments, inflates n
  and invalidates every percentage.
- **Interviews that violate the instrument.** An interview conducted with an unfrozen or amended
  instrument, a lenient reading of the threshold, or a re-scoped question is not admissible under the
  frozen threshold.
- **Hypothetical incidents.** "It could happen to me" is not a recent incident or near-miss; inventing
  or inflating one violates both the instrument and the truthfulness rules.
- **Interviews without valid consent**, or with consent recorded after the fact, or with recording
  without the separate recording permission.
- **Unverified compatibility statements.** An owner's belief about what their equipment supports is
  self-report, not a compatibility finding; it may never be written into a compatibility register.

### 7.3 Why no quote appears in this document

There is no participant verbatim to quote: 0 interviews exist. This document therefore contains no
quotation marks around participant speech. Any future verbatim requires the recorded quote-use
permission, a pseudonymous participant ID and an aggregate-only reporting context.

## 8. What remains unknown per segment, and the next validation step

### 8.1 `SEG-01` — recreational motorboat owners

- **Still unknown.** Which three equipment families dominate small coastal motorboats in the target
  area; the actual equipment mix on 6–10 m boats; whether the data-fragmentation problem is
  economically consequential or merely inconvenient; software-only versus hardware willingness to
  trade; share of owners able to self-install safely; whether owners would pay for a pre-purchase
  compatibility assessment; what proof removes incompatibility fear.
- **Planned experiments.** `EXP-MC10-01`, `EXP-MC10-03`, `EXP-MC10-05`, `EXP-MC10-06`, `EXP-MC10-10`
  (owner portion).
- **Next validation step.** None until `AUTH-MC10-001` is granted and the pre-fieldwork checklist is
  complete; then recruit through authorized channels, run `W1` first and report `BLOCKED` rather than
  back-filling the segment.

### 8.2 `SEG-02` — sailing yacht owners

- **Still unknown.** Installed autopilot, instrument and wind brands and drive types in the target
  size range; whether owners buy sailing-specific features or generic navigation; the takeover and
  sea-trial evidence an owner would require before trusting a supervised steering system; whether
  purchase goes through dealer, installer or sailmaker; where wind/autopilot integration fails today;
  how owners value offline navigation surviving a lapsed subscription.
- **Planned experiments.** Same set as `SEG-01`, with additional steering and safety weighting in
  `EXP-MC10-01` and `EXP-MC10-06`, and installation-concern context from `Q8`.
- **Next validation step.** None until authorization; then `W1`, with the safety framing of supervised
  steering preserved exactly: supervised at all times, never autonomous, unattended or remote.

### 8.3 `SEG-03` — marina-based owners of unattended vessels

- **Still unknown.** How many owners already have monitoring and of what type; what an owner does today
  when away and what it costs per season; which inputs matter most (bilge, battery, shore power,
  position, intrusion); whether a marina would resell or recommend a kit; the alert-delay and
  failure evidence required before trust; whether monitoring is regarded as a marina-provided service
  (the registered FAIL condition for `EXP-MC10-09`); how insurance-driven behaviour differs from
  willingness to buy.
- **Planned experiments.** `EXP-MC10-09` (owner side; operator side belongs to another deliverable),
  plus `EXP-MC10-01`, `EXP-MC10-03`, `EXP-MC10-06`, `EXP-MC10-10`.
- **Next validation step.** None until authorization; first resolve the monitoring-incident instrument
  gap in §2.2 (A7) with a dated amendment and a new frozen instrument version, then `W1`/`W3`.

### 8.4 Cross-segment

- **Still unknown.** Any difference between the three owner segments in problem frequency, spend
  behaviour or barrier ranking; whether a single owner concept story survives contact with all three;
  any relation between stated comprehension and stated intent.
- **Next validation step.** None. No recruitment, screening, interviewing or price module may occur
  before the authorization gate, the controller/legal gate and the secure-store gate are all cleared.

## 9. The MC-09 priority order is unvalidated by primary evidence

The MC-09 portfolio ranking is desk-research prioritisation, not measured demand. It is preserved
unchanged, and MC-10 added no primary evidence to it because no owner was interviewed.

| Rank | Family | MC-09 score | MC-09 conclusion | Primary evidence added by this framework | Status |
| ---: | --- | ---: | --- | --- | --- |
| 1 | NAV | 4.23 | Validate with customers | None — 0 owner interviews | `NOT_TESTED` |
| 2 | WEATHER | 3.77 | Additional rights research | None | `NOT_TESTED` |
| 3 | WATCH | 3.38 | Validate with customers | None | `NOT_TESTED` |
| 4 | HUB | 3.37 | Additional research | None | `NOT_TESTED` |
| 5 | FLEET | 3.22 | Long-term opportunity | None | `NOT_TESTED` |
| 6 | AIS | 2.90 | Reconsider strategy | None | `NOT_TESTED` |
| 7 | SENSE | 2.84 | Defer | None | `NOT_TESTED` |
| 8 | PILOT | 2.64 | Defer; safety blocked | None | `NOT_TESTED` |
| 9 | DISPLAY | 2.47 | Reconsider strategy | None | `NOT_TESTED` |

Consequences that follow, and must be stated in any downstream document:

1. The order remains a **hypothesis about what to test next**, not a finding about what owners want.
2. No family may be advanced, deferred or discontinued because of this framework; nothing was measured.
3. A high MC-09 score is not validated demand; a low score is not measured rejection. Absence of
   evidence is not evidence of absence.
4. No owner was asked about any family by name, so no preference ordering across families exists.
5. No lifecycle, readiness, price, publication or compatibility status changes in this milestone.

## 10. Governance and status effect

- **Scope compliance.** This document writes only within `docs/marea/customer-discovery/owners/`. It
  reads the Lead-owned data files under `docs/marea/customer-discovery/data/` and the MC-09 market-
  validation records without modifying them.
- **No git writes** were performed by this deliverable.
- **No participant data** appears here; the repository must never hold participant identity, contact
  data, verbatim transcripts or audio.
- **No commercial status change**: trademark clearance `NOT_GRANTED`, source IP `NOT_CLEARED`, product
  sales `BLOCKED`, commercial publication `BLOCKED`, production deployment `NOT_AUTHORIZED`,
  approved prices 0, orderable products 0, WTP `NOT_MEASURED`.
- **Amendment rule.** A threshold may not be relaxed after fielding. A legitimate change requires a
  dated amendment record naming the experiment, the old and new thresholds and the reason, a new frozen
  version, and independent review before further fielding. None was needed, because no data was
  collected.
- **No inference from silence.** The absence of an authorization, an instrument, a channel or a
  participant is never permission to proceed.

```
OWNER_SEGMENTS_PLANNED      = 3 (SEG-01, SEG-02, SEG-03)
OWNER_INTERVIEWS_PLANNED    = 15–24
OWNER_INTERVIEWS_COMPLETED  = 0
CODED_UNITS                 = 0
PURCHASE_RECORDS            = 0
INCIDENTS_RECORDED          = 0
WTP                         = NOT_MEASURED
EXP_MC10_01/03/05/06/09/10  = NOT_EXECUTED / BLOCKED
MILESTONE                   = BLOCKED
```

## 11. References and traceability

| Reference | Path | Use in this document |
| --- | --- | --- |
| Customer discovery plan (instruments, schema, analysis plan) | `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` | `GUIDE-01` `Q1`–`Q15`, `SCREEN-01`, `PRICE-01`, `NOTE-01`, §9 schema, §10 `ANA-01`, §12 preconditions |
| Validation experiments registry (frozen thresholds) | `docs/marea/market-validation/data/validation-experiments.json` | §4 quoted hypotheses, minimum evidence, thresholds, confounders, interpretations |
| Validation experiments narrative | `docs/marea/market-validation/MC09-VALIDATION-EXPERIMENTS.md` | Cross-check of the registry narrative |
| Buyer segments | `docs/marea/market-validation/buyers/MC09-BUYER-SEGMENTS.md` | Segment archetypes, critical unknowns, MC-10 questions (`S1`–`S3`) |
| Portfolio prioritisation | `docs/marea/market-validation/MC09-PORTFOLIO-PRIORITIZATION.md` | §9 scores and conclusions |
| Governance status | `docs/marea/market-validation/data/governance-status.json` | Commercial invariants quoted in §10 |
| MC-10 research scope | `docs/marea/customer-discovery/MC10-RESEARCH-SCOPE.md` | Milestone scope, population, wave plan |
| Fieldwork authorization register | `docs/marea/customer-discovery/MC10-FIELDWORK-AUTHORIZATION.md`; `../data/fieldwork-authorization.json` | `AUTH-MC10-001`, pre-fieldwork checklist |
| Research status (Lead-owned) | `../data/research-status.json` | Participant, segment and pricing counts |
| Experiment results register | `docs/marea/customer-discovery/MC10-EXPERIMENT-RESULTS.md` | Per-experiment `BLOCKED` verdicts; pointer to D15 |
| Recruitment plan | `docs/marea/customer-discovery/recruitment/MC10-RECRUITMENT-PLAN.md` | Screener gates, eligibility, quotas, channel status |
| Buyer objections taxonomy | `docs/marea/customer-discovery/MC10-BUYER-OBJECTIONS.md` | `OBJ-OWN-01`…`OBJ-OWN-15` barrier codes (referenced, not redefined) |
| Concept comprehension design | `docs/marea/customer-discovery/MC10-CONCEPT-COMPREHENSION.md` | D15 — descriptions, rubric, misconception list, empty scores |
| Bundle composition and exclusions | `docs/marea/bundles/BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` | Exclusion classes referenced in owner questioning |
| Bundle comparison | `docs/marea/bundles/BUNDLE-CUSTOMER-COMPARISON.md` | Exclusions and subscription/installation boundaries |
| Product contracts | `docs/marea/products/MAREA-NAV-COMMERCIAL-SPEC.md`; `MAREA-HUB-COMMERCIAL-SPEC.md`; `MAREA-WATCH-COMMERCIAL-SPEC.md`; `MAREA-FLEET-COMMERCIAL-SPEC.md` | Canonical definitions used to keep questioning neutral |

**Status statement.** This is a prepared framework for a blocked milestone. No owner was identified,
contacted, screened, consented or interviewed. No problem, purchase, amount, incident, subscription
stance or barrier exists. Every count in this document is 0 because fieldwork is blocked, and no
result may be inferred from the preparation itself.
