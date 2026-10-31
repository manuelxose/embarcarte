# MC-09 — Validation experiments for MC-10 and later

| Field | Value |
| --- | --- |
| Document ID | MC-09 / Workstream J / MC09-VALIDATION-EXPERIMENTS |
| Milestone | MC-09 (market and competitive intelligence) |
| Status | `PREPARATION_ONLY`. No experiment in this document has been executed |
| Lifecycle | All MAREA products and bundles are `CONCEPT` / `DEFINED`, `NOT_FOR_SALE`, not certified, not trademark-cleared |
| Price status | All willingness-to-pay values `NOT_MEASURED`. Every figure below is a research input hypothesis, never a purchasable price |
| Base commit | `65417bfa681d31cc655e2bc91cfcedcccc368675` |
| Date | 2026-10-31 |
| Owner | agent-g-mc10 (Customer Discovery Methodologist) |
| Write scope | This file; `buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md`; `data/validation-experiments.json`; `data/evidence-mc10.json` |
| Machine-readable contract | `data/README.md`; `data/validation-experiments.json` (`EXP-MC10-01` … `EXP-MC10-10`) |
| Is not | Fieldwork, a survey, a price test, a pilot, a promise of a pilot, a purchase pathway or evidence of any of those |

No interview, survey, outreach, advertisement, purchase or simulated response exists behind this
document. Every threshold below is **pre-registered design intent**: it is written before fielding so
that the team cannot move the goalposts after seeing results.

## 0. What MC-09 knows and what remains untested

MC-09 produced a research base (market size context, competitor and price observations, hypothetical
buyer archetypes, channel and search signals). It produced **no primary customer evidence**. The table
below is the honest boundary; nothing in this document may be cited as if the right-hand column had
already been done.

| Area | MC-09 state | Still untested |
| --- | --- | --- |
| Problem existence per segment | Hypothetical archetypes only (`buyer-segments.json`, `HYPOTHETICAL_ARCHETYPE`) | Whether the problem is felt unprompted, how often, what it costs, what people already spend |
| Purchase history and current spend | Not collected. No customer spend data exists | Real recent purchases, amounts, timing, decision-maker, replacement cycle |
| Installation and liability | Design requirements only; 0 tested compatibility rows | Installer willingness, liability/insurance position, rework cost, commissioning labour |
| Subscription acceptance | Price hypotheses only (`HYPOTHESIS_UNAPPROVED`) | Objection structure, acceptable cadence, reaction to local-function lockout |
| Price sensitivity | Competitor prices observed; no MAREA-demand curve | Gabor–Granger intent curves, Van Westendorp ranges, segment differences |
| Bundle comprehension | Bundle definitions internally consistent | Whether a customer can restate composition *and exclusions* without prompting |
| B2B fleet demand | Channel assessment only | Whether an operator would run a supervised trial and against what success metric |
| Trust, warranty, data ownership | Policy positions OPEN | Which barrier actually blocks a decision, and in what order |

## 1. Design principles (binding)

1. **Pre-registration.** Thresholds in §3 are fixed before fielding. A change requires a dated,
   written amendment recorded in the MC-10 delivery note and applies only to later data.
2. **Negative results are binding.** A `FAIL` stops the related public claim or public copy; it is not
   re-labelled as `INCONCLUSIVE` and not superseded by anecdotes.
3. **Stated intent is never demand.** Ordering scales, price ladders and Van Westendorp answers are
   *stated preference*. They generate hypotheses for a quantitative stage; they do not measure sales.
4. **WTP stays `NOT_MEASURED`.** No experiment in MC-10 may approve a price, a discount, a bundle
   price or a margin. The only permitted output is a price hypothesis labelled `HYPOTHESIS`.
5. **Qualitative ≠ representative.** Purposive quota samples (5–10 per segment) have no margin of
   error. Percentages in §3 are within-sample coding proportions, never market prevalence.
6. **No leading.** Concept descriptions are neutral, presented as concepts, with exclusions stated
   before advantages. Instruments never use MAREA marketing language.
7. **Nothing is orderable.** No price shown is presented as an offer, no pre-order, deposit, waiting
   list, reservation or delivery date is offered, and no participant may leave believing a product
   exists to buy.
8. **One primary question per experiment**, plus one explicit decision it can and cannot unlock.

## 2. Experiment catalogue

Each experiment uses the shared instrument suite in
`buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` (§6 ES, §7 EN, §8 pricing module). Recruitment rules,
consent and GDPR safeguards are defined there and apply unchanged. All experiments are blocked on the
same preconditions: MC-10 outreach authorisation, a named data controller and a documented lawful
basis; none of these exists in MC-09.

### EXP-MC10-01 — Demand existence per segment

- **Research hypothesis.** At least four of eight segments (recreational motorboat owner, sailing owner,
  marina-based owner, electronics installer, marine retailer, marina/shipyard operator, charter
  organisation, fleet manager) report a recurring, economically consequential boat-data fragmentation
  problem and can name a real recent purchase made to work around it.
- **Target segment.** B2C owners (3 segments) and B2B operators (charter, fleet, marina/shipyard);
  installers and retailers interviewed as intermediaries about their own workflow, not about owners.
- **Recruitment approach.** Purposive quota sampling via partner marinas, yacht clubs, installer
  introductions, trade associations and publicly listed operators, only after written MC-10 outreach
  authorisation. No purchased lists, no scraping, no advertising.
- **Minimum evidence.** 5–8 completed interviews per narrowly defined segment, transcribed and
  verbatim-coded, with at least one documented purchase-history record per participant and two
  independent coders. Saturation noted per segment (no new code in the final two interviews).
- **Data capture.** Pseudonymous ID, segment, vessel/business profile, unprompted problem statements,
  spend and recent-purchase records in amount bands with currency and VAT treatment, alternatives named.
- **Decision threshold.** `PASS` if a theme appears unprompted in ≥60% of coded units in a segment and
  ≥50% of that segment names a concrete prior spend or workaround cost. `FAIL` if ≤20% with no spend
  evidence. Otherwise `INCONCLUSIVE` with a note on which quantitative design is required.
- **Confounders.** Engaged/marina-affiliated owners over-represented; interviewer knowledge of MAREA can
  bias probing; recall error; gatekeeper selection of early adopters; autumn refit seasonality.
- **Expected limitations.** No representation, no market sizing, no conversion inference. Single
  geography first (Galicia/Rías Baixas and northern Portugal).
- **Ethics/privacy.** Explicit consent, pseudonymisation, separate recording consent, no berth-holder
  lists or vessel registration numbers, GDPR Art. 5/6/7/13 compliance, ICC/ESOMAR principles.
- **Outcome interpretation.** A `PASS` licenses a quantitative demand study. It does not license a
  demand, revenue or "proven market need" claim.

### EXP-MC10-02 — Installer compatibility and liability concerns

- **Research hypothesis.** Installers will not fit an unproven multi-brand gateway or sensor system
  without a published compatibility matrix, a documented commissioning procedure, a named
  warranty/liability position and a rework path; installer objections bind before owner enthusiasm.
- **Target segment.** Independent marine electronics installers and small refit yards with ≥5 years'
  experience and first-party installs from ≥2 brands in the last 24 months.
- **Recruitment approach.** Trade associations, manually verified yard directory listings, referral
  chains. Gatekeeper: owner or technical lead of the business.
- **Minimum evidence.** ≥5 interviews, each yielding a named go/no-go requirement list and the
  installer's own liability/insurance position; recorded categorical stance on a supervised demo fit
  (no / conditional / yes). Verbal interest is not a trial.
- **Data capture.** Installer profile, verbatim objections coded into compatibility evidence, protocol
  knowledge, liability/insurance, warranty/RMA, labour and quoting, handover, training; conditional
  trial stance with the conditions listed.
- **Decision threshold.** `PASS` if ≥70% independently name compatibility evidence **and** warranty/RMA
  clarity as mandatory, and ≥50% would accept a supervised trial with a documented checklist and named
  liability position. `FAIL` if the majority say no documentation would change their position.
- **Confounders.** Small, exhaustible population; brand-loyalty and dealer-margin effects; over-caution
  on record; no physical product to react to; Spanish and Portuguese liability regimes differ.
- **Expected limitations.** Hypothetical hardware with 0 tested compatibility rows and no terms; cannot
  support any installed-channel revenue or "installer-ready" claim.
- **Ethics/privacy.** Consent; no customer or vessel data; no confidential dealer terms; no implication
  of a distribution commitment; GDPR-compliant business-contact handling and erasure.
- **Outcome interpretation.** Produces the compatibility, warranty and commissioning preconditions for a
  later channel step. A `PASS` is not a channel, a partner or a signed agreement.

### EXP-MC10-03 — Subscription acceptance

- **Research hypothesis.** Owners and small operators reject subscriptions for locally available
  functions but will consider paying for continuous external services (forecast data, remote monitoring,
  connectivity), provided local safety and navigation functions survive lapse.
- **Target segment.** Sailing and motorboat owners, marina-based owners, charter organisations and fleet
  managers. Software-only and hardware-plus-service constructs tested separately.
- **Recruitment approach.** Same purposive pool as EXP-MC10-01 with segment quotas; the subscription
  block is embedded in every interview so no separate recruitment bias is introduced.
- **Minimum evidence.** Every participant answers the subscription-attitude block, including the
  local-function lockout scenario and cancellation/export expectations; ≥5 distinct objection codes per
  segment; Van Westendorp subscription module completed by every participant (indicative only).
- **Data capture.** Objection codes, preferred cadence, acceptable annual band per service type,
  lockout reaction, entitlement-sharing expectation, per-vessel vs per-user interpretation.
- **Decision threshold.** `PASS` if ≥50% of a segment would consider at least one external-service
  subscription **and** ≥50% state local-function lockout would be blocking (so the model must be
  designed around it). `FAIL` if a majority reject any recurring charge regardless of scope.
- **Confounders.** Subscription fatigue from prior marine apps; chart-licence cost conflated with MAREA
  fees; lockout only described in words; per-vessel vs per-user confusion; unstable percentages at n<10.
- **Expected limitations.** No working service; stated acceptance is not conversion; cannot estimate
  churn or elasticity. Subscription willingness to pay remains `NOT_MEASURED`.
- **Ethics/privacy.** No billing or card data; no account creation; prices presented as exploratory
  research figures, never as offers.
- **Outcome interpretation.** A `PASS` permits designing a quantitative subscription test with real
  price points and a prototype. It never validates a recurring-revenue assumption.

### EXP-MC10-04 — Price sensitivity, Gabor–Granger

- **Research hypothesis.** Purchase intent declines gradually rather than collapsing across a five-point
  price ladder, and the 50% intent band differs materially between owner segments and between direct and
  installer-mediated purchase.
- **Target segment.** Sailing owners, motorboat owners, marina-based owners; installers asked which
  resale price they could defend to a customer.
- **Recruitment approach.** Purposive pool with enforced quotas; pricing module administered only after
  the qualitative block so price does not anchor the problem discussion.
- **Minimum evidence.** ≥5 price points per configuration, all points answered by every participant,
  n ≥ 8 per segment per configuration. Ladder values derived from MC-09 price observations and stated
  as hypotheses; scale fixed in advance (definite / probable / might / probably not / definitely not).
- **Data capture.** Per participant per price point: intent category, currency, VAT treatment, existing
  equipment value band, prior spend band, response time (used as a quality flag only).
- **Decision threshold.** Indicative only: a monotone curve in ≥4 of 5 ladders and a recorded 50% intent
  band per segment; responses answered in under 60 seconds excluded from analysis. `FAIL` if most
  ladders are non-monotone or unusable. No price may be approved from this experiment.
- **Confounders.** Hypothetical bias overstating real purchase; anchoring from the preceding
  conversation; verbal-only composition; excluded installation and chart-licence costs inflating intent;
  quota drift.
- **Expected limitations.** Qualitative n; no elasticity with defensible confidence intervals; cannot
  produce revenue or margin. WTP `NOT_MEASURED`.
- **Ethics/privacy.** No offer, no pre-order, no deposit, no payment details; explicit exploratory-price
  disclosure.
- **Outcome interpretation.** A monotone curve justifies a quantitative pricing study with n ≥ 100 per
  segment. It never justifies publishing a price.

### EXP-MC10-05 — Acceptable price range, Van Westendorp

- **Research hypothesis.** Owners and operators hold a coherent acceptable price range for
  navigation/weather software and for monitoring hardware-plus-service, and their too-cheap, bargain,
  expensive and too-expensive points cluster by segment rather than being random.
- **Target segment.** B2C owners (sailing, motorboat, marina-based) and B2B operators (charter, fleet),
  with software and hardware-plus-service constructs asked separately.
- **Recruitment approach.** Same pool as EXP-MC10-04; the module runs in a separate section to keep the
  four price questions independent of the intent ladder.
- **Minimum evidence.** All four Van Westendorp questions answered per construct, n ≥ 8 per segment per
  construct, with a consistency check (`too cheap < bargain < expensive < too expensive`); violations
  recorded raw, never silently corrected.
- **Data capture.** Four raw responses per participant per construct with currency, VAT treatment,
  one-off vs recurring interpretation, and verbatim reasoning; derived ranges stored as derived values
  only, separated from observations.
- **Decision threshold.** `PASS` if ≥70% of responses are internally consistent and each construct
  produces a non-degenerate acceptable range. `FAIL` if <50% consistent or if participants cannot
  separate hardware, software and installation cost.
- **Confounders.** Anchoring on consumer app prices; mixing installation into the price; currency and
  VAT confusion in cross-border samples; differing willingness to answer "don't know"; unstable
  boundaries at small n.
- **Expected limitations.** Stated preference, not behaviour; too small for segment-level confidence;
  any range whose lower bound sits below a defensible cost floor must be flagged for negative-margin
  review before use. WTP `NOT_MEASURED`.
- **Ethics/privacy.** Consent; exploratory-price disclosure; no availability implication; no personal
  financial data beyond the expressed opinion.
- **Outcome interpretation.** Narrows the design space for a quantitative study; approves nothing.

### EXP-MC10-06 — Bundle comprehension and exclusions

- **Research hypothesis.** After a neutral concept description, participants can unaidedly restate what
  each bundle does **and** what it excludes (chart data, installation, AIS transmission, collision
  avoidance, assured connectivity), with no critical misconception.
- **Target segment.** B2C owners and B2B operators; installers and retailers tested as repeaters because
  they will explain the concept to their own customers.
- **Recruitment approach.** Same pool; comprehension block runs before any pricing block so price cannot
  crowd out understanding.
- **Minimum evidence.** Unaided recall for at least three bundle concepts, scored against a fixed rubric
  by two independent coders, n ≥ 5 per segment, full transcript of the explanation step retained.
- **Data capture.** Per concept: unaided restatement, correct inclusions, correct exclusions, critical
  misconception count, verbatim reasoning. Misconception codes are pre-defined (for example "NAV
  includes charts", "AIS transmits", "monitoring prevents theft", "subscription covers connectivity
  everywhere").
- **Decision threshold.** `PASS` if ≥70% restate at least two exclusions correctly **and** ≤20% hold a
  critical misconception. `FAIL` if >40% hold a critical misconception on a concept, blocking public copy
  for that concept. In between: `INCONCLUSIVE`, revise copy and retest with a new sample.
- **Confounders.** Interviewer delivery despite a scripted description; parroting without understanding;
  novelty rather than copy quality; interference when three concepts are tested in one session.
- **Expected limitations.** Session comprehension is not website comprehension under time pressure; no
  page, visual or product exists to test; results cannot validate a claim or copy legally.
- **Ethics/privacy.** Consent; concepts explicitly described as not for sale; no fabricated imagery,
  certification or availability.
- **Outcome interpretation.** A `PASS` allows a copy draft and a later usability test; a `FAIL` biases
  toward renaming or recomposing the bundle before any market-facing step.

### EXP-MC10-07 — B2B fleet willingness to trial

- **Research hypothesis.** Small fleet managers and charter operators will consider a supervised,
  time-boxed operational trial of monitoring or fleet software and can name a concrete success criterion,
  but will not commit to a paying contract before installation, support and data-processing terms exist.
- **Target segment.** Charter organisations (5–30 vessels), fleet managers, sailing schools, marina and
  shipyard operators managing third-party vessels.
- **Recruitment approach.** Publicly listed operators contacted individually under authorised MC-10
  outreach, trade associations, installer referrals. Decision maker and technical operator interviewed
  separately where possible.
- **Minimum evidence.** ≥5 interviews with responsibility for ≥5 vessels; ≥3 stating a measurable trial
  success criterion; categorical, conditional trial stance recorded. A written letter of intent is
  required before anything is described as an agreed pilot.
- **Data capture.** Fleet size and composition, current tools, operational problem, data-protection and
  security review path, procurement process, trial scope, success metric, blockers (installation,
  connectivity, per-vessel pricing, tenant isolation).
- **Decision threshold.** `PASS` if ≥60% name a concrete success criterion **and** ≥50% would accept a
  supervised trial with written data-processing terms. `FAIL` if operators decline any trial before a
  purchase-ready product exists.
- **Confounders.** Seasonal workload; owner/manager split between sufferer and buyer; procurement cycles
  longer than the discovery window; security review unaffordable at prototype stage; few addressable
  fleets in the initial geography.
- **Expected limitations.** No pilot product exists (`FLEET` is a `CONCEPT`); contract value, retention
  and churn cannot be established. B2B WTP `NOT_MEASURED`.
- **Ethics/privacy.** Organisational plus individual consent; no telemetry, manifests or customer data;
  no implied preferred-vendor relationship; data-processing agreement required before any pilot.
- **Outcome interpretation.** Supports designing a later supervised pilot with legal support; never
  establishes sales traction.

### EXP-MC10-08 — Marine retail channel interest

- **Research hypothesis.** Chandlers and small marine retailers will stock or display a data
  gateway/sensor product only if it is demonstrable, has a clear returns and warranty process, and does
  not require technical support they cannot staff.
- **Target segment.** Independent chandlers and small marine retail chains in Galicia and northern
  Portugal, plus one or two online specialists.
- **Recruitment approach.** Store visits and calls to publicly listed businesses under authorised
  outreach; association introductions. No paid listing and no mystery shopping.
- **Minimum evidence.** ≥5 interviews with owners or ranging buyers who can decide stocking; each states
  margin expectation, returns handling and support boundary in their own words; categorical stance
  recorded (no / conditional / yes) with conditions.
- **Data capture.** Category ownership, ranged brands, voluntarily stated margin and payment ranges,
  returns and warranty expectations, demonstration and training needs, consignment vs wholesale interest.
- **Decision threshold.** `PASS` if ≥60% name conditions the programme could meet at launch and none
  names an unmet condition MAREA cannot satisfy. `FAIL` if retailers require exclusivity, guaranteed
  sell-through or funded in-store support.
- **Confounders.** Prototype-stage caution is not permanent rejection; margin disclosure varies; small
  stores conflate retailing with installing; seasonal stocking decisions.
- **Expected limitations.** No product, packaging or distributor terms; no channel margin or sell-through
  evidence; a stated stance is not a purchase order.
- **Ethics/privacy.** B2B consent; no commercially sensitive terms obtained under pressure; no
  misrepresentation of readiness.
- **Outcome interpretation.** Defines the conditions a future listing would need; proves no channel.

### EXP-MC10-09 — Unattended-vessel monitoring, owners vs operators

- **Research hypothesis.** Owners of unattended vessels and marina/shipyard operators share the afloat
  safety problem but value different evidence: owners want bilge/power/geofence alerts; operators want
  work-list and handover information rather than raw sensor feeds.
- **Target segment.** Marina-based owner-occupiers, marina operators, shipyards managing third-party
  vessels in the water.
- **Recruitment approach.** Partner marinas and yacht clubs under authorised outreach; marina association
  introductions for operators. No berth-holder personal data is accessed.
- **Minimum evidence.** ≥5 owner and ≥3 operator interviews, each describing a concrete recent incident
  or near-miss with an unattended vessel and the information they lacked.
- **Data capture.** Incident narrative, current checking routine, who is called and how, seasonal
  frequency, current security/checking spend, willingness to share access with a third party,
  data-retention concerns, mobile coverage reality at the berth.
- **Decision threshold.** `PASS` if ≥60% of owners name an alert they would act on **and** ≥2 operators
  name a handover or work-list information need. `FAIL` if monitoring is seen as a marina service owners
  will not pay for separately.
- **Confounders.** Insurance-driven behaviour; marina liability fears; variable berth connectivity;
  opposed incentives (fewer calls vs more alerts).
- **Expected limitations.** No deployed hardware; connectivity, battery and alert-delivery promises are
  untestable. `WATCH` remains a `CONCEPT`.
- **Ethics/privacy.** No vessel, berth or access credentials; no safety-guarantee implication; no
  special-category data.
- **Outcome interpretation.** Establishes a two-sided information need worth prototyping; validates no
  monitoring price and no marina partnership.

### EXP-MC10-10 — Trust, warranty and data-ownership barriers

- **Research hypothesis.** Trust barriers (data ownership, subscription lapse, installation-fault
  liability, whether the brand will exist in five years) block decisions more often than feature gaps.
- **Target segment.** All segments, analysed as a cross-segment barrier set rather than a single result.
- **Recruitment approach.** Embedded block in every interview from EXP-MC10-01 to EXP-MC10-09; no
  additional recruitment.
- **Minimum evidence.** Every participant states or ranks top-3 adoption barriers; two coders apply the
  barrier codebook; ≥1 verbatim per barrier per segment.
- **Data capture.** Ranked barriers, verbatim wording, where in the conversation the barrier arose,
  whether written warranty or data-processing terms are required before trialling, which incumbent the
  trust comparison is made against.
- **Decision threshold.** `PASS` if data-ownership or warranty/liability concerns appear in the top-3 for
  ≥50% of participants in ≥3 segments — which makes a documented warranty, liability and data-ownership
  position a precondition for any pilot. `FAIL` if barriers are evenly distributed with no dominant theme.
- **Confounders.** Brand unfamiliarity confounded with distrust; expectations set by incumbent support
  records; interviewer disclosure of conceptual status can itself trigger the barrier; stated ranking may
  not match behaviour.
- **Expected limitations.** Attitudes toward an uncleared brand and a non-existent product; cannot claim
  trust readiness; legal seller identity and brand clearance remain OPEN.
- **Ethics/privacy.** Honest disclosure of conceptual status; no fabricated warranty, certification or
  customer reference.
- **Outcome interpretation.** Prioritises documentation over messaging before any pilot; validates no
  warranty term.

## 3. Threshold summary and sequence

| Experiment | Primary question | Gate it can open | Gate it can never open |
| --- | --- | --- | --- |
| EXP-MC10-01 | Is the problem real and already paid for? | Quantitative demand study | Market-size or revenue claim |
| EXP-MC10-02 | Will installers actually fit it? | Channel-design step | "Installer-ready" claim |
| EXP-MC10-03 | Which subscription model is even considered? | Quantitative subscription test | Recurring-revenue assumption |
| EXP-MC10-04 | Does intent survive a price ladder? | Quantitative pricing study | Any approved price |
| EXP-MC10-05 | What range is coherent? | Range for later testing | Any published price |
| EXP-MC10-06 | Can people restate composition and exclusions? | Copy drafting and usability test | Legal claim validation |
| EXP-MC10-07 | Would an operator trial it, against what metric? | Supervised pilot design | Sales traction |
| EXP-MC10-08 | What would a retailer need? | Listing-condition analysis | Channel access |
| EXP-MC10-09 | Do owners and operators want the same evidence? | Prototype scope decision | Monitoring price or partnership |
| EXP-MC10-10 | What blocks the decision? | Documentation prerequisites | Trust claim |

**Sequence.** EXP-MC10-01, -02, -06 and -10 run first (problem, installer, comprehension, barriers) because
their outcomes can invalidate the concept or the vocabulary before pricing is worth asking. EXP-MC10-03,
-04 and -05 follow only if comprehension `PASS`es, so pricing answers are not collected on a concept the
participant misunderstood. EXP-MC10-07, -08 and -09 with operators, retailers and marinas can run in
parallel with the owner interviews because they recruit from different populations.

**Sample reality.** 5–10 interviews per segment across eight segments is 40–80 conversations: enough for
strong signals and instrument debugging, nowhere near enough for proportions, elasticity, segment sizing
or a business case. Any decision that needs a number with an error bar requires a funded quantitative
stage (indicatively n ≥ 100 per tested segment) after MC-10 and is not authorised by this plan.

## 4. Cross-cutting ethics and privacy safeguards

- Lawful basis: explicit consent (GDPR Art. 6(1)(a)) for each participant and separately for audio
  recording; the recording is optional and declining does not exclude participation.
- Data minimisation: segment, role, vessel/business profile in bands, verbatim statements, price opinions.
  No berth numbers, registration numbers, ID numbers, billing data, customer lists, manifests or
  special-category data. No minors, no vulnerable participants.
- Pseudonymisation: participant IDs only in analysis files; the contact key, if kept for follow-up
  permission, is stored separately with restricted access and a deletion date.
- Transparency: purpose, expected duration, who will see the notes, retention period, the right to
  withdraw without giving a reason, and a plain statement that MAREA is a proposed brand with no
  purchasable or certified product.
- Retention: audio destroyed once the verbatim excerpt is verified; identifiable contact data deleted at
  the end of MC-10 unless separate follow-up consent records a date and scope; aggregate coded data kept
  no longer than needed for the milestone decision.
- Professional standards: ICC/ESOMAR principles (voluntary participation, adequate information, no
  misrepresentation of research as selling, respondent protection). Sources and limits are recorded in
  `data/evidence-mc10.json` (`SRC-MC10-003`, `SRC-MC10-004`, `SRC-MC10-005`).
- No incentives presented as payment for a purchase decision; any incentive is disclosed in advance and
  approved by the programme lead before fielding.
- No customer logos, quotes, counts or testimonials may be reused publicly. Consent for a quote is a
  separate, explicit, revocable permission and no quote may be used while MAREA is uncleared.

## 5. Interpretation rules, anti-patterns and hand-off

**Permitted interpretations.** Theme prevalence *within this sample*; direction of an intent curve; which
barrier dominates; which exclusion is misunderstood; which conditions an installer or retailer names.

**Forbidden interpretations** — each of these is a defect if it appears in later reporting: reading
interview percentages as market prevalence; treating verbal trial interest as a pilot; converting a
Van Westendorp answer into a price; calling a Gabor–Granger 50% point a break-even price; presenting a
concept description as a product; reporting a participant count that was not actually completed;
describing MC-10 activities as executed when they were only planned.

**Hand-off to MC-10.** This document plus
`buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` (recruitment, screening, consent, instruments, schema,
analysis plan) form the complete package. MC-10 must, before the first conversation: obtain outreach
authorisation, name the data controller and lawful basis, freeze the thresholds, translate-check both
instrument versions, and record the actual field dates. Until then every status in this package stays
`NOT_EXECUTED` / `NOT_MEASURED`.
