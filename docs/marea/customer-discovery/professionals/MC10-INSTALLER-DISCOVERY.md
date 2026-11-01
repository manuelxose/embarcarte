# MC-10 — Installer discovery: compatibility, liability and the refit channel (D9)

| Field | Value |
| --- | --- |
| Document ID | MC-10 / D9 / MC10-INSTALLER-DISCOVERY |
| Milestone | MC-10 of 36 — primary customer discovery |
| Status | `NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED)` |
| Segment covered | SEG-04 Marine electronics installers — independent or yard installer, ≥5 years active, ≥2 first-party brands fitted in the last 24 months |
| Experiments covered | `EXP-MC10-02` (installer compatibility and liability); professional-contribution block to `EXP-MC10-10` (trust, warranty and data-ownership barriers, segment SEG-04) |
| Fieldwork performed | **none**: 0 installers identified, 0 contacted, 0 invited, 0 screened, 0 eligible, 0 consented, 0 interviewed, 0 liability positions recorded, 0 trial stances recorded |
| Compatibility rows tested | **0** — 0 `TESTED` rows in batch-01 D5 and 0 `SUPPORTED` rows in batch-02 D5 |
| Instrument status | Prepared and frozen for reference only. It has not been shown, read or administered to any participant |
| Date | 2026-11-01 |
| Owner | Agent D — Professional Channel Research Specialist |
| Branch / base | `feature/marea-mc10-primary-customer-discovery`, base `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3` |
| Write scope | This file only |
| Read-only inputs (Lead-owned) | `data/research-status.json`, `data/fieldwork-authorization.json`, `data/decisions.json` — informational only, never edited by this document |
| Is not | Fieldwork, a partner list, a distribution agreement, an installation commitment, a trial, a pilot, a quotation, a warranty or evidence that any installer will fit anything |

```
STATUS: NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED)
INSTALLERS_INTERVIEWED            = 0
INSTALLER_EVIDENCE_RECORDS        = 0
COMPATIBILITY_ROWS_TESTED         = 0
LIABILITY_POSITIONS_RECORDED      = 0
TRIAL_STANCES_RECORDED            = 0
TRIAL_INSTALLS_AGREED             = 0
DISTRIBUTION_AGREEMENTS           = 0
```

**No installer was interviewed. No professional was contacted. No outreach was authorised.** Every
count in this document is zero because nothing was executed — not because installers were surveyed and
answered. The zeros are an empty instrument, not a finding about installers.

## 1. What this document is and what it is not

This is the **research design for D9**: the SEG-04 eligibility frame, the prepared moderator frame, the
exact pre-registered `EXP-MC10-02` threshold (quoted from the frozen MC-09 registry), the empty results
tables, the confounder list, and the requirements that any future MAREA compatibility, warranty and
commissioning documentation would have to satisfy **before** an installer-facing channel step could be
designed.

It is explicitly **not**:

- evidence that installers want MAREA, refuse MAREA, or hold any particular objection;
- a partner list, a distributor list, a dealer programme, a rate card or a territory allocation;
- an installation commitment, a trial, a demo install, a pilot or a letter of intent;
- a compatibility statement, a warranty, a certification or an "installer-ready" claim for any MAREA
  product.

The MC-10 milestone is `BLOCKED`: `OUTREACH_AUTHORIZATION = NOT_GRANTED` and `FIELDWORK_STATUS =
BLOCKED` (`data/research-status.json`; `MC10-FIELDWORK-AUTHORIZATION.md`; `data/fieldwork-authorization.json`).
A blocked experiment produces no verdict. `EXP-MC10-02` is `NOT_EXECUTED` / `BLOCKED` in
`MC10-EXPERIMENT-RESULTS.md` §2. It is not `PASS`, not `FAIL` and not `INCONCLUSIVE`: those verdicts
require real data against the frozen threshold.

## 2. Authoritative state at issue

| State item | Value | Source of record |
| --- | --- | --- |
| Milestone status | `BLOCKED` | `data/research-status.json` (`milestoneStatus`) |
| Milestone reason | `OUTREACH_AUTHORIZATION_NOT_GRANTED` | `data/research-status.json` (`statusReason`) |
| Outreach authorization | `NOT_GRANTED` (`AUTH-MC10-001`) | `data/fieldwork-authorization.json` |
| Fieldwork executed | `false` | `data/research-status.json` |
| Installers identified / contacted / interviewed | `0 / 0 / 0` | `data/research-status.json` (`participantCounts`) |
| SEG-04 planned completed interviews | minimum 5, maximum 7 | `data/research-status.json` (`segmentCounts`) |
| SEG-04 completed interviews | `0` | `data/research-status.json` (`segmentCounts`) |
| Compatibility rows tested | `0` | `data/governance-status.json`; `PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` (0 `TESTED`) |
| Installer network / partner agreements / rate card | none exist; SFR-3, SFR-4 and SFR-5 all `BLOCKED` | `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §2–§3, §16 |
| Warranty / RMA / support / training terms | `NOT_ESTABLISHED` / `OPEN` / no scheme | `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §7, §9–§11 |
| PILOT safety gate | `BLOCKED` | `data/governance-status.json`; `PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` |
| NMEA 2000 certification | `false`; not implemented, not licensed, not certified | `data/governance-status.json`; `PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §1.2, §8 |
| Product sales / publication | `BLOCKED` / `BLOCKED` | `data/governance-status.json` |
| Brand clearance / legal seller identity | `NOT_GRANTED` / `OPEN` (`X-02`) | `data/governance-status.json`; `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §9 |

No row above is softened, advanced or re-interpreted by this design document. A research design cannot
change a programme state.

## 3. Segment definition and eligibility (SEG-04)

The segment is narrow on purpose, so that coded output stays comparable with MC-09 and with the other
MC-10 segments.

- **Operational definition (MC-09 plan §1).** Independent or yard marine-electronics installer; at least
  five years active; at least two first-party brands fitted in the last 24 months.
- **Who the interview is about.** The installer's **own** workflow, liability, economics and
  documentation requirements. Installers are **not** asked to speculate about what boat owners want, and
  owners are never asked to estimate installer behaviour. This separation is a validity requirement,
  not a nicety (MC-09 plan §1).
- **Recruitment gatekeeper.** Business owner or technical lead of the installer business
  (`EXP-MC10-02` recruitment).
- **Standing exclusions.** Under 18; EMBARCARTE/MAREA employees or contractors; employees of competing
  marine-electronics manufacturers, distributors or resellers; anyone without a role in the decision;
  anyone unable to give 45–60 minutes (MC-09 plan §6.1; `data/fieldwork-authorization.json`
  `prohibitedTargets`).

### 3.1 Screener fields applied to SEG-04

The shared `SCREEN-01` screener (MC-09 plan §6.1) is used unchanged. Its SEG-04-relevant fields are:

| Screener field | Requirement for SEG-04 | Recorded in MC-10 |
| --- | --- | --- |
| S1 — purchase/technical decision role | Must be yes (owner, partner or technical decision-maker) | 0 records |
| S5 — years active and brands fitted | ≥5 years and ≥2 first-party brands fitted in 24 months | 0 records |
| S6 — manufacturer/distributor/competitor employment | Yes = exclude | 0 records |
| S7 — other boating market research in last 6 months | Record, do not automatically exclude | 0 records |
| S8 — language preference | ES or EN; record; do not translate live | 0 records |

The remaining screener fields (vessel/fleet context, base location, recent equipment purchase) are asked
as context so the record can be classified, not as eligibility tests for this segment.

### 3.2 Installer profile fields (prepared, empty)

These are the profile fields the design would capture for every completed interview. All fields are
empty because no interview exists.

| # | Profile field | Why it is required | Form | Records today |
| ---: | --- | --- | --- | ---: |
| P1 | Years active / business age | Eligibility (≥5 years) | Integer | 0 |
| P2 | First-party brands fitted in 24 months | Eligibility (≥2 brands); brand-loyalty confounder | Brand list | 0 |
| P3 | Role of participant | Owner vs technical lead vs both | Enum | 0 |
| P4 | Typical installation scope | Gateway, instrument, network, AIS, sensor, tank; which work they do themselves vs subcontract | Enum + free text | 0 |
| P5 | Typical vessel band and count of installs | Install size and population reality | Bands + integers | 0 |
| P6 | Territory | Geometry and liability regime (ES/PT) | Region/country | 0 |
| P7 | Existing supplier/distributor relationships | Channel context and dealer-economics confounder | Free text | 0 |
| P8 | Current warranty-intake practice | Baseline for the warranty/RMA question | Free text (own words) | 0 |
| P9 | Current commissioning/handover record | Baseline for the commissioning question | Free text | 0 |
| P10 | Current training delivered/taken | Baseline for the training question | Free text | 0 |

## 4. Recruitment design prepared (not executed)

`EXP-MC10-02` registers the approach: trade-association channels, yard directory listings verified
manually by phone during authorised MC-10 outreach, and refer-by-interview chains. No cold automated
campaigns. No purchased or scraped contact lists. No paid advertising. No mystery shopping. The
zero-incentive policy is proposed but **not approved**, and no incentive, payment or prize is offered
(`data/fieldwork-authorization.json`).

Without `AUTH-MC10-001` none of this may be executed. The environment additionally exposes no outbound
email, telephony or messaging capability, so real fieldwork requires assigned human interviewers
(`BLK-MC10-06`). Both constraints are reported, not worked around.

### 4.1 Recruitment funnel — all stages empty

| Stage | Count | Note |
| --- | ---: | --- |
| Candidates identified | 0 | No candidate may be identified without authorisation |
| Authorised to contact | 0 | No channel is authorised |
| Invited | 0 | No invitation may be sent |
| Responded | 0 | — |
| Screened | 0 | — |
| Eligible | 0 | — |
| Consented | 0 | No consent may be requested |
| Interview completed | 0 | — |
| Withdrawn | 0 | — |
| Excluded | 0 | — |

### 4.2 Geography and language reality

Rías Baixas / Galicia was prepared for fielding. Northern Portugal is **not available**: Portuguese
instruments are `NOT_PRODUCED` without qualified linguistic review (`W0-08`), so the Spanish/Portuguese
liability-regime confounder cannot even be studied in this milestone. Spanish and English
`GUIDE`-equivalent material has had internal structural review only (`W0-07 PARTIAL`); translation
equivalence is not statistically established.

## 5. Prepared moderator frame (not administered)

This is a **professional** frame, not the owner `GUIDE-01`. It exists because EXP-MC10-02 asks installers
about their own workflow, not about owners' preferences. The moderator discipline is the MC-09 one:
ask, then stop talking; probe with "why", "what happened next", "how did you decide"; never with a
feature; state no price; never describe MAREA as available; record verbatim wording; if asked whether
anything can be bought, answer "no".

Drafting status: EN research frame prepared. An ES version would be produced, reviewed and frozen under
the MC-10 instrument-version rule before any authorised fielding; this document is not an approved
bilingual instrument.

### 5.1 Consent and framing (read before Q1)

The interview opens with `CONSENT-01` (MC-09 plan §6.2), unchanged, followed by the professional
framing:

> This conversation is customer discovery about installation work, not a sale. Nothing we discuss is
> available, certified or for sale, and I am not asking you to distribute, fit or commit to anything.
> You can stop, skip any question or withdraw at any time without giving a reason. I will not ask for
> commercially confidential dealer terms or for any customer or vessel data. If I record audio, that is
> optional and separately agreed.

The four permissions — participation, audio recording, anonymised quote use, follow-up contact — are
recorded separately with dates. Declining any optional permission never excludes participation.

### 5.2 Frame

**Q1. Profile and recent refit reality.** "Tell me about your installation business: how long you have
been trading, which electronics brands you have fitted in the last two years, and the kind of
installation work you take on." Probes: brands and how long each; first-party vs third-party; typical
vessel type and length band; what you do yourself and what you subcontract; who else works in the
business.

**Q2. The last real multi-brand installation.** "Walk me through the last installation where you had to
integrate equipment from more than one brand — from the first customer call to handover." Probes: what
you checked before quoting; what documentation you asked the supplier or customer for; what you could
not find out; what went wrong; what had to be redone; how long the vessel was out of use; what you
recorded at the end; what you would do differently.

**Q3. Required compatibility documentation.** "Before you would fit an unproven gateway or sensor system
into a customer's vessel, what compatibility documentation would you require — and what would make it
adequate rather than marketing?" Probes: tested matrix versus specification; device, model, firmware,
direction and adapter detail; NMEA 0183 / NMEA 2000 / Signal K status; what you would verify yourself;
what a supplier claim needs to include before you trust it; what would make you refuse to fit; who
would be responsible if an untested combination fails.

**Q4. Installation qualification and commissioning.** "What has to be true before an installation counts
as properly commissioned, and what would you need from the supplier to do that?" Probes: per-subsystem
checks; dockside versus sea trial; who signs; what record you leave the customer; what training you
need before you can commission; what you would refuse to commission; what would make a commissioning
record meaningless.

**Q5. Warranty and RMA responsibility.** "If a unit fails, who do you expect to deal with it — and what
would you need in writing?" Probes: product defect versus your workmanship; who takes the customer call;
return authorisation and dead-on-arrival handling; who pays removal and reinstallation labour; what
written warranty term and remedy you would require; what you would refuse to stock or fit without an
RMA path.

**Q6. Liability and insurance.** "If an installation goes wrong, what liability position would you need
the supplier to state in writing before you would fit their equipment?" Probes: product fault versus
installation fault versus configuration fault; what your insurer asks about new suppliers; what
indemnity or responsibility split you would require; what you would not accept; whether Spanish and
Portuguese practice differ in your experience.

**Q7. Electrical and RF considerations.** "What electrical and radio-frequency concerns would you want
answered before fitting a gateway, sensor or receive-only AIS device?" Probes: supply and power budget;
fusing, isolation, grounding; cable routes and connectors; noise from chargers or inverters; EMC;
VHF antenna and splitter work for AIS; who is qualified for the RF work; what evidence you need for
each; what would make an installation unsafe or unsupportable.

**Q8. Rework risk and vessel downtime.** "What causes rework on an installation like this, and what
would reduce that risk?" Probes: most common causes; cost and who bears it; effect of a vessel out of
use; what documentation or pre-installation survey would prevent it; what you would need before
accepting a new product; what you would do if the product is not compatible after delivery.

**Q9. Supplier trust.** "What makes you trust a new supplier in this market, and what would make you
distrust one?" Probes: references; company age; spares and firmware-update support; support escalation
path; whether other installers have used it; certifications or test evidence you ask for; what written
guarantees you look for; what you would check before fitting it for a customer.

**Q10. Dealer economics and channel terms.** "How do you buy equipment today — distributor, direct,
consignment — and what margin and payment terms do you need for it to be worth stocking?" Probes:
purchase route; discount structure; payment terms; minimum order; demo units; exclusivity or territory
expectations; expected sell-through; what you would not accept. *(No MAREA price or term is shown or
discussed as an offer; any figure stated is the participant's own business context and a research
hypothesis for channel design, never an approved MAREA margin, discount or term.)*

**Q11. Training needs.** "What training would you and your staff need on a new product, who should pay
for it, and what would you refuse?" Probes: content; duration; delivery format; certification
expectations; who attends; how training is recorded; what training you consider pointless; what support
documentation you expect instead of training.

**Q12. Supplier support boundary.** "Where does product support end for the supplier and begin for you?"
Probes: first-line diagnosis; technical escalation; response expectations; what you can staff; what you
will not do; what written support terms you require; how you handle a customer who calls you first.

**Q13. Neutral concept disclosure (read verbatim, brand not named).** The moderator reads the neutral
descriptions of the concepts relevant to an installer: a local data gateway that aggregates compatible
vessel data read-only; a receive-only AIS receiver; a local sensor module. Exclusions are stated before
benefits: no charts included; no guarantee of device compatibility; no NMEA 2000 offer; no remote or
automatic steering; no installation included; no certification. PILOT steering installations are
**outside this frame**: `PILOT_SAFETY_GATE = BLOCKED` and no installer demo or trial may involve a
PILOT steering installation. Then ask for unprompted restatement and for any critical misconception.

**Q14. Supervised demo-install stance (categorical).** "Given a documented checklist and a named
liability position, would you be willing to run a supervised demo install — yes, no, or conditional?"
If conditional: "List the conditions." *(Recorded as a categorical stance only. It is not a commitment,
not agreement to install, not a trial and not an order. No demo install exists; no product exists; no
physical sample exists. Verbal willingness is not evidence of a trial.)*

**Q15. Trust and barrier ranking (`EXP-MC10-10` professional block).** "Rank the top three things that
would stop you adopting a new marine-electronics product from a new supplier." Probes: where each
barrier arose in the conversation; whether a written warranty or data-processing term would be required
before trialling; which incumbent you compare trust against; what would move each barrier.

**Q16. Closing.** "Is there anything I have not asked that I should know? What is the single most
important thing we should understand? What would make you recommend a supplier — or refuse to work with
one?" Record follow-up permission: yes/no, channel, scope, expiry; withdrawable at any time.

### 5.3 Recording rules

Per interview: verbatim wording for quotes; paraphrase marked as paraphrase; never invent an amount the
participant did not state; leave unknown fields empty rather than "0"; no customer or vessel data, no
registration numbers, no commercially confidential dealer terms recorded verbatim where the participant
marks them confidential (business-contact handling only). Two independent coders apply the barrier and
objection codebook; within-sample proportions only; no participant identity in the repository.

## 6. Pre-registered threshold — `EXP-MC10-02`

Verbatim from `docs/marea/market-validation/data/validation-experiments.json` (frozen for MC-10 by
`W0-16`; mirrored in `MC10-EXPERIMENT-RESULTS.md` §2):

> **PASS (channel viable in principle):** >=70% of installers independently name compatibility evidence
> and warranty/RMA clarity as mandatory before fitting, and >=50% say a documented checklist plus named
> liability position would make them willing to run a supervised trial install.
> **FAIL:** the majority say no checklist or documentation would change their position.
> Documented signed trial intent would be a separate later test; verbal interest alone is not evidence
> of a trial.

Registered minimum evidence for this experiment:

> Minimum 5 completed interviews with installers who have at least 5 years of refit experience and have
> installed first-party electronics from at least two brands in the last 24 months. Each interview must
> produce a named list of go/no-go installation requirements and a liability/insurance statement in the
> participant's own words.

### 6.1 How the threshold would be evaluated (design only; no data)

| Element | Pre-registered rule | Observed in MC-10 |
| --- | --- | --- |
| Denominator | Completed interviews meeting the minimum-evidence profile (≥5 years, ≥2 brands, named go/no-go list, own-words liability statement) | 0 |
| "Independently name compatibility evidence" | Named in Q3/Q7 without the moderator suggesting the category; coded by two coders | 0 coded units |
| "Warranty/RMA clarity as mandatory" | Named in Q5/Q9 as a precondition to fitting, unprompted by a category list | 0 coded units |
| "Documented checklist plus named liability position" | The hypothetical package described in Q14; willingness recorded as yes/conditional | 0 participants |
| "Willing to run a supervised trial install" | Categorical yes/conditional stance; never a commitment | 0 participants |
| PASS combination | ≥70% both-and ≥50% willingness | **not computable (n = 0)** |
| FAIL condition | Majority say no documentation would change their position | **not computable (n = 0)** |
| Verdict | `NOT_EXECUTED` / `BLOCKED` — no PASS, FAIL or INCONCLUSIVE may be issued | `BLOCKED` (`MC10-EXPERIMENT-RESULTS.md` §2) |

The interpretation rule is part of the threshold: **verbal interest is not an installation commitment
and not a trial.** A `PASS` would license only a later channel-design step and would produce the
compatibility, warranty and commissioning prerequisites for it. It could never open an "installer-ready"
claim, a distribution agreement, a partner announcement or a claim that any installer has committed.

### 6.2 Professional contribution to `EXP-MC10-10`

`EXP-MC10-10` is analysed as a cross-segment barrier set. Its frozen threshold is:

> **PASS (trust is the binding constraint):** data-ownership or warranty/liability concerns appear among
> the top-3 barriers for >=50% of participants in at least three segments, which requires a documented
> warranty, liability and data-ownership position before any pilot.
> **FAIL:** barriers are distributed with no dominant theme.

This document defines the SEG-04 contribution only (the Q15 block). It cannot produce a cross-segment
verdict on its own: the threshold requires at least three segments and the SEG-04 sample is 0. No
barrier rank, verbatim or proportion exists. **0 top-3 barrier records; 0 coded units.**

## 7. Results — empty tables (n = 0)

All tables below are **empty instruments**. They record the absence of data, not a zero rate in any
population. No proportion may be computed because every denominator is 0.

### 7.1 Coded objection / requirement families

The families below map to the shared preregistered professional objection taxonomy
(`MC10-BUYER-OBJECTIONS.md` §1.2, `OBJ-PRO-01`…`OBJ-PRO-15`). The mapping is fixed before fielding and
no parallel codebook is invented; every count, code and denominator is 0.

| Code family | Definition used in the codebook | Participants naming | Records |
| --- | --- | ---: | ---: |
| Compatibility evidence | Tested matrix, device/firmware/direction/adapter detail | 0 | 0 |
| Protocol / NMEA knowledge | NMEA 0183, NMEA 2000, Signal K, connector and message reality | 0 | 0 |
| Liability / insurance | Written liability allocation, indemnity, insurance expectations | 0 | 0 |
| Warranty / RMA | Warranty term, who responds, return path, installed-unit labour | 0 | 0 |
| Labour time and quoting | Hours, quoting practice, survey/assessment cost | 0 | 0 |
| Commissioning | Procedure, per-subsystem checks, record, handover | 0 | 0 |
| Training | Content, delivery, who pays, certification expectations | 0 | 0 |
| Rework / downtime | Causes, cost, who bears it, prevention | 0 | 0 |
| Electrical / RF | Power, isolation, EMC, antenna/splitter | 0 | 0 |
| Dealer economics | Purchase route, margin, payment, demo, exclusivity | 0 | 0 |
| Supplier trust / support | References, spares, firmware, escalation | 0 | 0 |

### 7.2 Mandatory-before-fitting nominations (`EXP-MC10-02` PASS components)

| Nomination | Participants naming it as mandatory | Denominator | Proportion |
| --- | ---: | ---: | --- |
| Compatibility evidence | 0 | 0 | not computable |
| Warranty/RMA clarity | 0 | 0 | not computable |
| Both (PASS component 1) | 0 | 0 | not computable |
| Documented checklist + named liability position (PASS component 2) | 0 | 0 | not computable |

### 7.3 Supervised demo-install stance

| Stance | Count | Conditions listed | Record |
| --- | ---: | ---: | --- |
| No | 0 | 0 | 0 |
| Conditional | 0 | 0 | 0 |
| Yes | 0 | 0 | 0 |

A categorical stance is the only permitted form. No stance exists in MC-10, and no stance — even a
future "yes" — would be an installation commitment or a trial.

### 7.4 Liability and warranty positions

| Item | Count |
| --- | ---: |
| Own-words liability/insurance statements | 0 |
| Written warranty terms required (stated by participants) | 0 |
| RMA-path demands recorded | 0 |
| Named liability positions satisfying the registered minimum evidence | 0 |

### 7.5 Barrier block (`EXP-MC10-10`, SEG-04 contribution)

| Item | Count |
| --- | ---: |
| Participants stating a top-3 barrier ranking | 0 |
| Barrier codes applied | 0 |
| Verbatims recorded | 0 |
| Participants requiring a written warranty before trialling | 0 |
| Participants requiring data-processing terms before trialling | 0 |
| Incumbent trust comparisons named | 0 |

## 8. Confounders and limitations

Registered confounders for `EXP-MC10-02` (frozen registry, unchanged):

1. Small number of installers in the initial geography; easy to exhaust the population.
2. Brand-loyalty and dealer-margin effects unrelated to MAREA.
3. Installers may overstate caution in a recorded interview.
4. Absence of a physical sample product means reactions are hypothetical.
5. Insurance and liability law differ between Spain and Portugal.

Registered limitations:

- Reactions to a product that does not exist and has **no tested compatibility rows**; no physical
  hardware, no quote process and no terms to react to. The results cannot be read as installed-channel
  revenue evidence.
- The interpretation rule: findings would set the compatibility, warranty and commissioning
  requirements that must be met before **any** installer distribution claim; they would not prove that
  installers will sell or that a channel exists — that would require signed partner agreements in a
  later milestone.

Additional limitations specific to this design:

- Purposive quota sampling is not probability sampling; 5–7 interviews per segment detect strong,
  repeated signals only. No margin of error, no confidence interval, no prevalence, no market size.
- Northern Portugal is unavailable in MC-10 (`PT_INSTRUMENTS_NOT_PRODUCED`); the ES/PT liability-regime
  comparison is therefore untestable in this milestone.
- Environment has no outbound contact capability (`BLK-MC10-06`): even with authorisation, a human
  interviewer panel is required.
- `PILOT_SAFETY_GATE = BLOCKED`: steering installation cannot be part of any installer demo or trial,
  and PILOT questions would be hypothetical at a further remove than gateway/sensor questions.
- The brand is uncleared and the legal seller identity is `OPEN` (`X-02`), which the design cannot fix
  and which the moderator must disclose honestly.

## 9. Requirements that future MAREA documentation would have to satisfy

**This table is a research requirement list. It is not an achieved MAREA condition, not a warranty, not
a promise and not a claim that any item exists.** Every row describes what the installer research
design would test in a later, authorised milestone. MAREA today has **no** tested compatibility
documentation, **no** installer network, **no** partner agreement, **no** rate card, **no** warranty
terms, **no** RMA process, **no** training scheme and **no** insurance position; the current status
column records that absence truthfully.

| # | Requirement (a condition the research would test) | What it would have to contain | Current MAREA status | Evidence that would close it |
| ---: | --- | --- | --- | --- |
| R1 | Published compatibility matrix | Tested rows per device, model, firmware, data direction and adapter class, each with a test record and independent reviewer; untested rows explicitly `NOT_TESTED` | **0 `TESTED` rows** (`PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §2–§4; `compatibilityRowsTested = 0`) | Device test records promoted under the D5 gate; still conditional claim only |
| R2 | Warranty position | Product defect versus workmanship; term; remedy hierarchy; named responsible party; consumer statutory guarantees where applicable | **`NOT_ESTABLISHED`** — no written warranty terms, no legal seller identity (`X-02`) (`BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §9) | Written terms + legal review + verified seller identity |
| R3 | Liability allocation | Product fault, installation fault and configuration fault separated; indemnity position; insurance requirement | **`NOT_ESTABLISHED`** — no partner agreement, no insurance position | Contract template + insurer confirmation + legal review |
| R4 | RMA path | Return authorisation reference, DOA handling, installed-device removal labour responsibility, freight, repair/replace/refund rule, serial traceability | **`NOT_ESTABLISHED`** (`BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §10) | Executed RMA process + serial register |
| R5 | Commissioning procedure and record | Per-subsystem dockside validation; control/alarm and degraded-state checks; written record of what was and was not verified | **`OPEN`** — no commissioning procedure or record; `PILOT_SEA_TRIALS = NOT_PERFORMED` | Validated procedure + recorded commissioning evidence |
| R6 | Electrical assessment | Supply, protection, isolation, cable routes; no vessel-control write path; steering excluded (PILOT gate `BLOCKED`) | **`OPEN`** (`BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §4 Q5) | Survey/assessment method + installer competence criteria |
| R7 | RF / antenna and EMC evidence | Receive-only AIS antenna/splitter class; no range or detection promise; EMC evidence for hardware | **`BLOCKED`** (`H-08`, `H-05`; D5 `C-01`) | Selected hardware + RF/EMC test evidence |
| R8 | Rework path | Who bears removal/reinstallation labour; warranty on rework; escalation route | **`NOT_ESTABLISHED`** | Written rework policy + contract |
| R9 | Training | Content, duration, delivery, record, who pays; no "certification" claim | **`OPEN`**; no scheme exists (`BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §7) | Training material + completion records |
| R10 | Support boundary and escalation | First-line/second-line/engineering split; escalation route; spares and firmware update policy; no invented SLA | **`OPEN`**; no support contract, no response time, safety escalation `BLOCKED` (`BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §11) | Support policy + staffing evidence |
| R11 | Dealer economics | Discount structure, payment terms, demo unit, consignment/wholesale, exclusivity position | **`UNKNOWN`/`OPEN`** — no rate card; MC-09 `CHAN` `BLOCKED` | Approved channel terms and pricing (not this milestone) |
| R12 | Documentation and handover pack | Installation record, commissioning record, training record, limitations statement, support and warranty route | **`OPEN`** (`BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §15) | Published handover pack |
| R13 | Installer competence and authorisation | Competence criteria, partner register, agreement, territory | **`BLOCKED`** — no partner register, no agreements (`BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §12, §16) | Written partner programme with registration |
| R14 | Conformity / certification evidence (only if a claim is ever made) | The applicable assessment and evidence class | **`NOT_STARTED`**; `compliance = NOT_STARTED`; nothing is certified | Conformity assessment evidence; no claim permitted today |

A future `PASS` of `EXP-MC10-02` would mean only that this sample named these prerequisites and
considered a supervised trial under a named-liability package. It would not mean MAREA satisfies any row
above. **No row above may be described as satisfied by MAREA until the evidence column exists.**

## 10. Conditions that would cause an installer to reject (pre-fielding candidates, not findings)

The following are **candidate rejection conditions the frame is designed to test**. They are design
hypotheses derived from the product and bundle contracts, not observed installer statements, and they
must never be quoted as an installer's objection.

| Candidate rejection condition | Why it is a candidate | What would count as evidence of it |
| --- | --- | --- |
| Product appears uncertified / no conformity evidence | 0 compatibility rows `TESTED`; `compliance = NOT_STARTED`; MAREA is a proposed brand | Participant states certification/conformity as a precondition; coded from Q3/Q9 |
| Liability unclear | No liability allocation, no insurance position, no partner agreement | Q6 statement; coded as mandatory |
| No RMA path | No RMA process exists; installed-unit return responsibility undefined | Q5 statement; coded as mandatory |
| No training | No training scheme, no "certified technician" scheme | Q11 statement; coded as a condition |
| No dealer margin / unattractive economics | No channel terms or rate card exist; MC-09 channel discount `BLOCKED` | Q10 statement; coded as a condition |
| No compatibility matrix / no tested rows | 0 `TESTED` rows | Q3 statement; coded as mandatory |
| No demo unit / no physical sample | No hardware exists; reactions hypothetical | Q14 conditional stance with demo as a condition |
| Brand not cleared / seller identity open | `X-01` `NOT_GRANTED`; `X-02` `OPEN` | Q9 statement; coded as trust barrier |
| Fixed price demanded before survey | D12 `SFR-4` prohibits a quotation without survey | Q10 statement; coded as an unmet condition |
| Expectation of remote/automatic steering | Remote helm `PROHIBITED`; PILOT safety gate `BLOCKED` | Any such expectation would be a refusal boundary, not a design input |
| NMEA 2000-only requirement | NMEA 2000 not implemented, licensed or certified | Q3 statement; configuration `NOT_SUPPORTED` for that requirement |

If any of these were observed in later authorised fieldwork, the correct output is a coded requirement
and, where applicable, a documented refusal boundary — never a discount, a promise or a partial sale
(`BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §14).

## 11. Analysis, integrity and prohibited interpretations

- The threshold is frozen. It may change only through a dated amendment per `MC10-EXPERIMENT-RESULTS.md`
  §11 and the hash-checked registry; no amendment was made, because no data exists.
- Two independent coders; the a-priori codebook applies before the first four interviews; Cohen's κ
  target ≥0.60 for theme codes; disagreements reported, not hidden. **Coded units today: 0.**
- Percentages are "within this sample (n = …)" only. They are never market prevalence, market size or a
  conversion rate.
- Negative cases are listed explicitly. A threshold can fail because of them, and that must be shown.
- Ambiguity defaults to `INCONCLUSIVE` **when data exists**; with zero completed interviews the status
  is `NOT_EXECUTED` / `BLOCKED`, and no verdict may be manufactured.
- Prohibited: reading a verbal trial stance as a commitment; calling a demo install a trial or a pilot;
  calling installer interest a distribution agreement; presenting a compatibility requirement as a
  MAREA capability; reporting an installer count that was not actually completed; describing MC-10
  activities as executed when they were only prepared.

## 12. Cross-references

| Document | Relationship |
| --- | --- |
| `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` | Segments, screener, consent, guide, schema, analysis plan and ethics; this design reuses them unchanged |
| `docs/marea/market-validation/MC09-VALIDATION-EXPERIMENTS.md` §2 (`EXP-MC10-02`, `-10`) | Registered hypothesis, evidence, threshold, confounders, interpretation |
| `docs/marea/market-validation/data/validation-experiments.json` | Frozen machine-readable registry; thresholds quoted verbatim above |
| `docs/marea/market-validation/data/governance-status.json` | Status invariants: 0 tested compatibility rows, no certification, sales/publication blocked |
| `docs/marea/customer-discovery/MC10-RESEARCH-SCOPE.md` | MC-10 scope, Wave 0 state and `BLOCKED` outcome |
| `docs/marea/customer-discovery/MC10-FIELDWORK-AUTHORIZATION.md` | `AUTH-MC10-001 = NOT_GRANTED`; pre-fieldwork checklist; unblock sequence |
| `docs/marea/customer-discovery/MC10-EXPERIMENT-RESULTS.md` | Frozen verdicts: all ten experiments `NOT_EXECUTED` / `BLOCKED`; `EXP-MC10-02` §2 |
| `docs/marea/customer-discovery/MC10-BUYER-OBJECTIONS.md` | Shared preregistered professional objection taxonomy (`OBJ-PRO-01`…`OBJ-PRO-15`); zero observed objections |
| `docs/marea/customer-discovery/data/research-status.json` | Aggregate counts (all 0) and segment plan (SEG-04: 5–7) |
| `docs/marea/bundles/BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` | Installation routes, qualification, warranty/RMA/support/training model, refusal boundary, handover |
| `docs/marea/bundles/BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md` | Entitlement and isolation context for installed hardware |
| `docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` | 21 compatibility rows, 0 `TESTED`; NMEA 2000 not offered; promotion gate |
| `docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` | PILOT safety gate context; no steering command path; supervised-steering boundary |
| `docs/marea/customer-discovery/professionals/MC10-CHANNEL-AND-FLEET-DISCOVERY.md` | Sibling D10 design for retailers, marinas, charter schools and fleet managers |

## 13. Status statement

This document is a **research design and an empty instrument**. It was prepared inside Wave 0 and it
was not executed. It contains no participant, no quote, no objection, no count above zero and no
verdict. It does not change any programme status, approve no price, create no channel, no partner and no
agreement, and it makes no compatibility, warranty, certification or installation-readiness claim.

```
AUTH-MC10-001            = NOT_GRANTED
EXP-MC10-02              = NOT_EXECUTED / BLOCKED
EXP-MC10-10 (SEG-04)     = NOT_EXECUTED / BLOCKED
INSTALLERS_INTERVIEWED   = 0
TRIAL_INSTALLS_AGREED    = 0
DISTRIBUTION_AGREEMENTS  = 0
```
