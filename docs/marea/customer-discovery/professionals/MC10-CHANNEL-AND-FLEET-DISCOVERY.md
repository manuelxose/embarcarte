# MC-10 — Channel and fleet discovery: retailers, marinas, charter schools and fleet managers (D10)

| Field | Value |
| --- | --- |
| Document ID | MC-10 / D10 / MC10-CHANNEL-AND-FLEET-DISCOVERY |
| Milestone | MC-10 of 36 — primary customer discovery |
| Status | `NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED)` |
| Segments covered | SEG-05 Marine retailers / chandlers (`EXP-MC10-08`); SEG-06 Marina or shipyard operators; SEG-07 Charter organisations / sailing schools; SEG-08 Fleet managers (`EXP-MC10-07`); operator side of SEG-06 for `EXP-MC10-09` |
| Fieldwork performed | **none**: 0 retailers, 0 marina/shipyard operators, 0 charter organisations or sailing schools, 0 fleet managers identified, contacted, screened or interviewed |
| Commercial evidence | **0 distribution agreements, 0 trial agreements, 0 letters of intent, 0 retail listings, 0 fleet pilots, 0 data-processing agreements, 0 MC-10 channel or fleet primary-evidence records** |
| FLEET constraints | Preserved in full: hardware **not** included by default; **no** cross-tenant access; **no** SLA; **no** remote control |
| PILOT safety gate | `BLOCKED` — PILOT is excluded from every channel, trial and pilot design in this document |
| Instrument status | Prepared and frozen for reference only. Not shown, read or administered to any participant |
| Date | 2026-11-01 |
| Owner | Agent D — Professional Channel Research Specialist |
| Branch / base | `feature/marea-mc10-primary-customer-discovery`, base `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3` |
| Write scope | This file only |
| Read-only inputs (Lead-owned) | `data/research-status.json`, `data/fieldwork-authorization.json`, `data/decisions.json` — informational only, never edited by this document |
| Is not | A partner list, a distribution agreement, a retail listing, a trial, a pilot, a letter of intent, a price list, a channel forecast or evidence that any retailer or fleet will do anything |

```
STATUS: NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED)
RETAILERS_INTERVIEWED               = 0
MARINA_SHIPYARD_OPERATORS_INTERVIEWED = 0
CHARTER_OPERATORS_INTERVIEWED       = 0
FLEET_MANAGERS_INTERVIEWED          = 0
RETAIL_STOCKING_STANCES             = 0
FLEET_TRIAL_STANCES                 = 0
TRIAL_AGREEMENTS                    = 0
LETTERS_OF_INTENT                   = 0
DISTRIBUTION_AGREEMENTS             = 0
RETAIL_LISTINGS                     = 0
FLEET_PILOTS                        = 0
DATA_PROCESSING_AGREEMENTS          = 0
```

**No retailer, chandler, marina, shipyard, charter organisation, sailing school or fleet manager was
contacted or interviewed.** Every count is zero because the fieldwork never occurred — not because
professionals were surveyed and declined. The zeros are an empty instrument, not a negative finding
about the channel or the market.

## 1. What this document is and what it is not

This is the **research design for D10**: the SEG-05–SEG-08 definitions and eligibility, the prepared
moderator frames for retail, B2B fleet and marina/shipyard monitoring operators, the exact pre-registered
thresholds for `EXP-MC10-07`, `EXP-MC10-08`, the operator component of `EXP-MC10-09` and the
professional contribution to `EXP-MC10-10`, the interest taxonomy (verbal / conditional / written), the
empty results tables, the confounders and limitations, the preserved FLEET constraints, and the
requirements that any future listing, trial or pilot would have to satisfy.

It is explicitly **not**:

- evidence that retailers will stock, that operators will trial, or that any channel or fleet exists;
- a distribution agreement, a retail listing, a trial, a pilot, a letter of intent or a partnership;
- a price list, a margin, a discount, a commission or a channel forecast;
- a commitment that MAREA will provide an SLA, hardware, cross-tenant access, remote control or a
  purchase-ready product;
- a statement that any requirement in this document is satisfied by MAREA.

MC-10 is `BLOCKED`: `OUTREACH_AUTHORIZATION = NOT_GRANTED`, `FIELDWORK_STATUS = BLOCKED`
(`data/research-status.json`; `MC10-FIELDWORK-AUTHORIZATION.md`; `data/fieldwork-authorization.json`).
`EXP-MC10-07`, `-08`, `-09` and `-10` are all `NOT_EXECUTED` / `BLOCKED` in `MC10-EXPERIMENT-RESULTS.md`
§§7–10. No PASS, FAIL or INCONCLUSIVE verdict may be issued from this design.

## 2. Authoritative state at issue

| State item | Value | Source of record |
| --- | --- | --- |
| Milestone status | `BLOCKED` | `data/research-status.json` |
| Outreach authorization | `NOT_GRANTED` (`AUTH-MC10-001`) | `data/fieldwork-authorization.json` |
| Fieldwork executed | `false` | `data/research-status.json` |
| Participants in every stage | `0` (identified, contacted, invited, responded, screened, eligible, consented, interviewed) | `data/research-status.json` |
| SEG-05 planned / completed | 5–7 / `0` | `data/research-status.json` |
| SEG-06 planned / completed | 3–5 / `0` | `data/research-status.json` |
| SEG-07 planned / completed | 5–8 / `0` | `data/research-status.json` |
| SEG-08 planned / completed | 4–6 / `0` | `data/research-status.json` |
| Channel evidence | none; MC-09 recorded public channel observations only, no partner contact | `MC09-DISTRIBUTION-STRATEGY.md`; `data/evidence-channels.json` |
| Distribution agreements / trial agreements / LOIs / listings / pilots | none exist | `data/research-status.json`; `MC10-EXPERIMENT-RESULTS.md` |
| FLEET service state | `FLEET_MULTI_TENANT_SERVICE = NOT_FOUND`; `FLEET_TENANT_ISOLATION = NOT_IMPLEMENTED`; `FLEET_DPA = NOT_CONTRACTED`; `FLEET_DPIA = NOT_COMPLETED` | `FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md` §1.4 |
| FLEET constraints | hardware **not** included by default; **no** cross-tenant access; **no** SLA (`NO_SLA_ESTABLISHED`); **no** remote control (`remoteHelmControl = PROHIBITED`) | `data/governance-status.json`; `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md` §8, §10 |
| PILOT safety gate | `BLOCKED` | `data/governance-status.json`; `PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` |
| Compatibility rows tested | `0` | `data/governance-status.json` |
| Product sales / publication / brand clearance / seller identity | `BLOCKED` / `BLOCKED` / `NOT_GRANTED` / `OPEN` (`X-02`) | `data/governance-status.json`; `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §16 |

No row above is softened, advanced or re-interpreted by this design document.

## 3. Segment definitions and eligibility

The four segments are narrow on purpose, matching MC-09 (plan §1) so coded output is comparable.

| Segment | Operational definition (MC-09 plan §1) | Registered quota (completed) | Exclusions (plan §2) |
| --- | --- | ---: | --- |
| SEG-05 Marine retailer / chandler | Nautical retailer with ranging authority for instruments or safety equipment | 5–7 | Staff without ranging authority |
| SEG-06 Marina or shipyard operator | Operator of a marina or shipyard managing berths, third-party vessels or refit work | 3–5 | Small operator with no third-party vessels |
| SEG-07 Charter organisation or sailing school | Charter organisation or sailing school with 5–30 vessels under management | 5–8 | Fewer than 5 vessels under management |
| SEG-08 Fleet manager | Fleet manager responsible for multi-vessel operations, maintenance and budgets | 4–6 | No maintenance or procurement responsibility |

**Validity rules that apply unchanged.** Retailers (SEG-05) are interviewed about **their own** ranging,
returns, support and economics — not about what boat owners want. Operators and fleet managers are
interviewed about their own operations, procurement and constraints. Owners are never asked to estimate
retailer or operator behaviour. No segment may be interviewed as a proxy for another.

### 3.1 Eligibility and screener mapping

The shared `SCREEN-01` screener (MC-09 plan §6.1) is used unchanged. The segment-relevant fields are:

| Screener field | SEG-05 | SEG-06 | SEG-07 | SEG-08 |
| --- | --- | --- | --- | --- |
| S1 — decision role | Ranging authority required | Operations responsibility | Owner/operations manager with fleet decision role | Fleet decision and budget responsibility |
| S2 — business/vessel profile | Store profile | Berths / third-party vessels | 5–30 vessels under management | Fleet size and composition |
| S5 — years active and brands | ≥5 years, ≥2 brands | Not applied | Not applied | Not applied |
| S6 — manufacturer/distributor/competitor employment | Yes = exclude | Yes = exclude | Yes = exclude | Yes = exclude |
| S8 — language | ES or EN, recorded | ES or EN, recorded | ES or EN, recorded | ES or EN, recorded |

Standing exclusions apply unchanged: under 18; EMBARCARTE/MAREA employees or contractors; employees of
competing marine-electronics manufacturers, distributors or resellers; no decision role; unable to give
45–60 minutes (`data/fieldwork-authorization.json` `prohibitedTargets`).

### 3.2 Professional profile fields (prepared, empty)

| # | Field | Applies to | Form | Records today |
| ---: | --- | --- | --- | ---: |
| PR1 | Business type and size (store, chain, marina, shipyard, charter/school, fleet operator) | all | Enum + integers | 0 |
| PR2 | Decision role and named purchase authority | all | Enum + free text | 0 |
| PR3 | Category ownership / fleet composition | 05 / 06–08 | Enum; vessel count and type bands | 0 |
| PR4 | Ranged brands and supplier structure | 05 | Brand list; distributor vs direct | 0 |
| PR5 | Current tools and systems | 06–08 | List | 0 |
| PR6 | Operating pattern and seasonality | 06–08 | Free text | 0 |
| PR7 | Territory | all | Region/country | 0 |
| PR8 | Data-protection / security review path | 06–08 | Free text | 0 |
| PR9 | Stated trial success metric (if any) | 06–08 | Free text + measurable unit | 0 |
| PR10 | Categorical stance (stocking or trial) | 05 / 06–08 | `no` / `conditional` / `yes` | 0 |

## 4. Recruitment design prepared (not executed)

Registered recruitment approaches (frozen registry, unchanged):

- **SEG-05 (`EXP-MC10-08`):** store visits and phone calls to publicly listed businesses during
  authorised MC-10 outreach; trade-association introductions. No paid listing, no mystery shopping.
  Gatekeeper: store owner or buyer authorised to decide ranging.
- **SEG-06 / SEG-07 / SEG-08 (`EXP-MC10-07`):** publicly listed operators contacted individually
  during authorised outreach; trade associations; referrals from installers. Decision maker and
  technical operator interviewed separately where possible.
- **SEG-06 operator side (`EXP-MC10-09`):** marina associations and partner marinas under authorised
  outreach. No berth-holder personal data is accessed.

Cross-cutting rules: written outreach authorisation before the first contact; no purchased or scraped
contact lists; no private marina customer records; no cold automated campaigns; no paid-advertising
recruitment; no mystery shopping; zero-incentive policy proposed but **not approved**. The environment
exposes no outbound email, telephony or messaging capability (`BLK-MC10-06`), so real fieldwork requires
assigned human interviewers. Geography: Rías Baixas / Galicia prepared; northern Portugal unavailable
because Portuguese instruments are `NOT_PRODUCED`.

### 4.1 Recruitment funnel — all stages empty

| Stage | SEG-05 | SEG-06 | SEG-07 | SEG-08 | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Candidates identified | 0 | 0 | 0 | 0 | 0 |
| Authorised to contact | 0 | 0 | 0 | 0 | 0 |
| Invited | 0 | 0 | 0 | 0 | 0 |
| Responded | 0 | 0 | 0 | 0 | 0 |
| Screened | 0 | 0 | 0 | 0 | 0 |
| Eligible | 0 | 0 | 0 | 0 | 0 |
| Consented | 0 | 0 | 0 | 0 | 0 |
| Interview completed | 0 | 0 | 0 | 0 | 0 |
| Withdrawn | 0 | 0 | 0 | 0 | 0 |
| Excluded | 0 | 0 | 0 | 0 | 0 |

## 5. Prepared moderator frames (not administered)

All frames reuse `CONSENT-01` (MC-09 plan §6.2) unchanged. Framing stated before the first question in
every frame: this is customer discovery, not a sale; nothing is available, certified, priced or
orderable; no trial, listing, pilot or agreement is being offered; recording is optional and separately
consented; no commercially confidential dealer terms, customer records, fleet telemetry or personal data
are requested. MAREA is a proposed brand, the legal seller is unidentified, and the products are
internal concepts.

Drafting status: EN research frames prepared. ES versions would be produced, reviewed and frozen under
the MC-10 instrument-version rule before authorised fielding. They are not approved bilingual
instruments.

### 5.1 Retail frame — SEG-05 (`EXP-MC10-08`)

**Q1. Category and ranging.** "Which product categories do you own or range in the store, and which
brands do you carry in instruments and safety equipment?" Probes: who decides ranging; how long each
brand has been carried; distributor versus direct supply; what you would not range and why.

**Q2. Product selection criteria.** "How do you decide whether to range a new product?" Probes: demo
requirements; packaging; certification and conformity documents; returns process; margin; brand support;
expected sell-through; what "proven" means to you; what evidence you ask a supplier for; what makes you
decline.

**Q3. Supplier onboarding.** "What is your onboarding process for a new supplier?" Probes: documents
required; account setup; lead times; minimum order quantities; payment terms; consignment versus
wholesale; exclusivity or territory requests; who signs off.

**Q4. Brand credibility.** "How do you judge whether a new brand is credible?" Probes: company age and
references; whether other stores carry it; warranty handling; marketing support; what would make you
distrust it; what you check before putting it on a shelf.

**Q5. Returns.** "What is your returns process, and what would you need from a supplier?" Probes: faulty
on arrival; consumer withdrawal rights; installed-unit returns; who pays freight; who handles the
customer; restocking; what you would refuse to stock without a returns process.

**Q6. Warranty.** "Who deals with a warranty claim today, and on what terms?" Probes: supplier versus
store responsibility; term; remedy (repair/replace/refund); response expectations; what written terms you
require; what you tell the customer.

**Q7. Technical support boundary.** "What technical support can you staff, and where do you need the
supplier to take over?" Probes: first-line diagnosis; installation questions; escalation route; what you
will not do; what support terms you require in writing; what you do when a customer calls after a
failed purchase.

**Q8. Training.** "What staff training would you need on a new product, who should pay for it, and what
would you refuse?" Probes: content; duration; when it can happen; who attends; how it is recorded;
whether certification is expected; what training you consider unnecessary.

**Q9. Margin expectations.** "What margin and payment terms do you need for a product like this to be
worth stocking?" Probes: typical category margin (voluntarily stated); discounting behaviour; competitive
pressure; expected sell-through; whether you would expect a demo unit or funded support. *(No MAREA
price, margin or discount is shown or proposed. Any stated figure is the participant's own business
context and a research hypothesis for channel design, never an approved MAREA term.)*

**Q10. Installation referrals.** "Do you install, or do you refer customers to installers?" Probes: who
installs; how you handle liability; installers you work with; whether you would refer a new product;
what makes a referral safe for you.

**Q11. Certifications and conformity.** "What certifications or conformity documents do you require
before you will stock a product?" Probes: CE marking; radio equipment; WEEE/battery obligations; labelling;
what you check; what you cannot stock without.

**Q12. Stocking stance (categorical).** "Would you stock or display a product like the one described —
no, conditional, or yes?" If conditional: "List the conditions." *(Recorded as a categorical stance
only. It is not an order, not a listing, not an agreement and not a commitment. No product, packaging,
demo unit or distributor terms exist. Verbal or conditional interest is never a retail agreement.)*

**Q13. Trust and barrier ranking (`EXP-MC10-10` block).** "Rank the top three things that would stop you
ranging a new marine-electronics product from a new supplier." Probes: where the barrier arose; whether a
written warranty or data-processing term would be required before trialling; which incumbent you compare
trust against.

**Q14. Closing.** "Is there anything I have not asked that I should know? What would make you recommend a
supplier or refuse to work with one?" Record follow-up permission (yes/no, channel, scope, expiry).

### 5.2 B2B fleet frame — SEG-06/07/08 (`EXP-MC10-07`)

**Q1. Fleet size and composition.** "Describe the vessels you are responsible for: how many, what types
and lengths, who owns them, and how they are used through the year." Probes: owned versus managed
third-party vessels; seasonal pattern; geography; staff roles.

**Q2. Current tools.** "What do you use today to plan maintenance and keep track of the fleet?" Probes:
spreadsheets, paper, radio/VHF calls, messaging groups, first-party vendor SaaS, maintenance systems;
what works; what breaks; what it costs; what you have already tried and abandoned.

**Q3. Maintenance workflow.** "Walk me through the last maintenance job from planning to completion."
Probes: who reports the problem; how work is authorised; parts; history; handover between seasons;
who has access to what; what information gets lost.

**Q4. Data requirements.** "What information would you actually need to run this operation better, and in
what form?" Probes: position and status; engine hours; alarms; work orders; documents; reporting;
export; cadence; what you do not want (for example raw sensor feeds); who consumes it.

**Q5. Security, access and cross-tenant concerns.** "Who would need access, and what would make you
comfortable that another operator could never see your data?" Probes: roles and permissions; audit;
shared credentials; per-vessel access; external installer access; the tenant-isolation requirement; your
IT/security review path; what evidence you would require before connecting.

**Q6. Purchasing authority and procurement.** "How does a purchase like this get decided and approved?"
Probes: budget owner; decision path; tender or quotes; contract terms; procurement cycle; who signs;
what would stop it.

**Q7. Trial prerequisites.** "What would have to exist before you would accept a supervised trial of
operational software?" Probes: written data-processing terms; security review; tenant-isolation evidence;
support model; onboarding scope; hardware position (hardware is not included by default); connectivity;
contract; who runs the trial; what they would not accept before a purchase-ready product; if they decline
any trial, record the reason.

**Q8. Success metric.** "If you ran a supervised trial, what measurable result would tell you it worked?"
Probes: measurable criterion (for example alert response time, maintenance backlog, seasonal handover
time); baseline; how it is measured; who reports; what would make you stop the trial.

**Q9. Procurement constraints.** "What constraints shape this decision?" Probes: seasonality; budget
cycle; insurance; procurement thresholds; data residency; liability terms; risk of an unproven vendor;
whether an SLA is required and what "no SLA" means for them (informational, the programme offers none).

**Q10. Constraints reaffirmed to the participant (read if asked).** FLEET is an internal concept, not a
deployed service; hardware is not included by default; there is no cross-tenant access and no
cross-tenant comparison; there is no service-level agreement; there is no remote control of any vessel
and telemetry is read-only; no trial exists and none is being offered in this conversation.

**Q11. Trust and barrier ranking (`EXP-MC10-10` block).** "Rank the top three barriers to adopting a new
operational platform." Probes: where each arose; whether a written warranty, liability or data-processing
term would be required before trialling; which incumbent you compare against.

**Q12. Closing.** "Anything I should know that I have not asked? What would make you recommend or reject
this?" Record follow-up permission.

### 5.3 Marina / shipyard operator monitoring frame — SEG-06 operator side (`EXP-MC10-09`)

This frame covers **only the operator side** of `EXP-MC10-09` (bilge/power/geofence owner alerts are the
owner segment's frame, outside this document).

**Q1. Today's checking routine.** "How do you know an unattended boat in your marina or yard is safe
today?" Probes: rounds and manual checks; frequency; seasonal variation; who is called; how incidents
reach you; what information is missing; a concrete recent incident or near-miss and what information you
lacked.

**Q2. Work-list and handover information need.** "What information do you need for your own work-lists
and seasonal handovers?" Probes: task lists; maintenance status; vessel handover in/out; documents;
who consumes it; what form it should take; why raw sensor feeds are not enough; what you would pay for
versus what you consider a basic service.

**Q3. Alert escalation and marina liability.** "If a monitoring service raised an alert about a
third-party vessel, what would you need to happen — and what liability would worry you?" Probes:
escalation hierarchy; who is responsible when someone is not reachable; insurance; fear of being blamed;
what you would refuse to operate; what written position you would need from the service and from the
owner.

**Q4. Privacy and data sharing.** "What data would you be willing to share or receive, and under what
conditions?" Probes: owner consent; third-party access; retention; who owns berth-holder data; what you
would never share; regulatory constraints you know of.

**Q5. Connectivity reality.** "What connectivity actually works at the berth, and what fails?" Probes:
mobile coverage; power; interference; seasonal problems; what you already tried; what you do not believe
about "always connected" promises.

**Q6. Categorical stance.** "Would you consider a supervised monitoring trial under written
data-processing terms — yes, no, or conditional?" If conditional: "List the conditions." *(Recorded as a
categorical stance only. No trial exists, none is offered, and a marina is never presented as a partner.
A monitoring service remains a `CONCEPT`; it is not a certified distress or safety service.)*

**Q7. Trust and barrier ranking (`EXP-MC10-10` block).** "Rank the top three barriers to accepting a
monitoring service in your marina." Probes: liability; privacy; reliability; connectivity; who pays;
which incumbent you compare against.

**Q8. Closing.** "Anything I should know? What would make you recommend or reject this?" Record follow-up
permission.

## 6. Pre-registered thresholds

### 6.1 `EXP-MC10-07` — B2B fleet willingness to trial

Verbatim from `docs/marea/market-validation/data/validation-experiments.json` (frozen for MC-10 by
`W0-16`; mirrored in `MC10-EXPERIMENT-RESULTS.md` §7):

> **PASS (trial pathway exists):** >=60% of operators state a concrete success criterion AND >=50% would
> accept a supervised trial with written data-processing terms.
> **FAIL:** operators decline any trial before a purchase-ready product exists.
> A letter of intent is required before any pilot is called agreed; verbal interest alone is not.

Registered minimum evidence:

> Minimum 5 interviews with operators responsible for at least 5 vessels; at least 3 must state a
> measurable trial success criterion (for example, alert response time, maintenance backlog, seasonal
> handover time). Recorded trial interest is categorical and conditional, never a signed contract.

### 6.2 `EXP-MC10-08` — Marine retail channel interest

Verbatim from the frozen registry (mirrored in `MC10-EXPERIMENT-RESULTS.md` §8):

> **PASS (retail channel plausible):** >=60% name a condition they could meet at launch (demo unit,
> documented returns, staff training) and none identifies an unmet condition that MAREA cannot satisfy.
> **FAIL:** retailers require exclusivity, guaranteed sell-through or funded in-store support that the
> programme cannot offer.

Registered minimum evidence:

> Minimum 5 interviews with owners or buyers authorised to decide ranging; each must state margin
> expectation, returns handling and support boundary in their own words.

### 6.3 `EXP-MC10-09` — operator component only

Verbatim from the frozen registry (mirrored in `MC10-EXPERIMENT-RESULTS.md` §9):

> **PASS (shared problem, different jobs):** >=60% of owners name at least one alert they would act on
> AND >=2 operators name a handover or work-list information need.
> **FAIL:** monitoring is considered a marina-provided service that owners will not pay for separately.

This document designs **only** the operator half (`>=2 operators name a handover or work-list information
need`). The owner half (`>=60% of owners name at least one alert they would act on`) belongs to the
owner-segment deliverables. A joint `EXP-MC10-09` verdict cannot be issued from this document, and no
verdict can be issued at n = 0.

### 6.4 Professional contribution to `EXP-MC10-10`

> **PASS (trust is the binding constraint):** data-ownership or warranty/liability concerns appear among
> the top-3 barriers for >=50% of participants in at least three segments, which requires a documented
> warranty, liability and data-ownership position before any pilot.
> **FAIL:** barriers are distributed with no dominant theme.

The retail, fleet and operator blocks above contribute barrier data for SEG-05, SEG-06, SEG-07 and
SEG-08. This document cannot produce the cross-segment verdict: the threshold requires at least three
segments and every professional segment denominator is 0 (`MC10-EXPERIMENT-RESULTS.md` §10).

### 6.5 Evaluation rules (design only; no data)

| Element | Pre-registered rule | Observed in MC-10 |
| --- | --- | --- |
| Denominator | Completed interviews meeting each experiment's minimum evidence | 0 in every segment |
| Success criterion (`-07`) | Concrete, measurable criterion stated by the participant — not a general goal | 0 records |
| Trial acceptance (`-07`) | Categorical willingness under written data-processing terms | 0 records |
| Retail condition (`-08`) | A condition the programme could meet at launch (demo unit, documented returns, staff training) | 0 records |
| Unmet condition (`-08`) | Any condition MAREA cannot satisfy (for example exclusivity, guaranteed sell-through, funded in-store support) | 0 records |
| Operator information need (`-09`) | Named handover or work-list need in the operator's own words | 0 records |
| Verdicts | `NOT_EXECUTED` / `BLOCKED`; no PASS, FAIL or INCONCLUSIVE | `BLOCKED` |

A `PASS` of `EXP-MC10-07` would support designing a later supervised pilot with legal support and a
data-processing agreement; it would not establish sales traction, demand or a contract. A `PASS` of
`EXP-MC10-08` would define the conditions a future listing would require; it would not prove channel
access or be reportable as retail demand. Neither threshold can open a distribution agreement, a retail
listing, a pilot, an SLA or a price.

## 7. Interest taxonomy — verbal, conditional, written, agreement

No interest of any level exists in MC-10. The taxonomy is fixed now so that later reporting cannot
inflate a conversation into a commitment.

| Level | Definition | What it is not | What it can unlock | Recorded in MC-10 |
| --- | --- | --- | --- | --- |
| Verbal interest | A participant says something positive in conversation | Not a commitment, not a trial, not a listing, not a pilot | Nothing on its own; may justify a follow-up conversation if permitted | 0 |
| Conditional interest | A participant states conditions they would need | Not a commitment; conditions may be unmet or unacceptable | Input to design and to the FAIL test (unmet conditions) | 0 |
| Written letter of intent | A signed, dated, scoped statement of intent, separately consented | Not a contract, not a trial, not a purchase order | Required before **any** pilot may be called "agreed" (`EXP-MC10-07`) | 0 |
| Signed trial agreement | A written, time-boxed supervised-trial agreement | Not a sale, not a distribution agreement, not a pilot outcome claim | Would require data-processing terms, security review and a later milestone authorisation | 0 |
| Distribution / retail agreement | A written agreement to distribute, stock or list | Not a trial and not an LOI | Would require terms, warranty/returns, legal seller identity and price approval | 0 |
| Fleet pilot | An authorised, supervised, time-boxed operational pilot under LOI + DPA + security review | Not a customer reference, not traction and not a deployment | A later milestone decision only; none is authorised in MC-10 | 0 |

Rules governing the taxonomy:

1. **Nothing above exists.** A verbal "yes" never becomes a trial, listing or agreement, and no
   participant may be told that one will occur.
2. **No trial exists until a real, authorised trial occurs in a later milestone.** MC-10 authorises none;
   no trial may be represented as executed, scheduled, budgeted or agreed.
3. **A letter of intent is required before any pilot is called agreed** (`EXP-MC10-07`). An LOI is not a
   contract and creates no distribution right.
4. Any future agreement would require, at minimum: legal seller identity, written terms, warranty and
   returns terms, data-processing terms (for FLEET/monitoring), and — for FLEET — tenant-isolation
   evidence. None of these exists.
5. Interest recorded under an optional quote-use permission is never a public testimonial, and no quote
   may be used while the brand is uncleared.

## 8. Results — empty tables (n = 0)

All tables are empty instruments. They record the absence of data, not a zero rate in any population.
No proportion may be computed because every denominator is 0.

### 8.1 Retail (SEG-05, `EXP-MC10-08`)

| Item | Count | Denominator | Proportion |
| --- | ---: | ---: | --- |
| Interviews completed | 0 | 0 | not computable |
| Stocking stance: no | 0 | 0 | not computable |
| Stocking stance: conditional | 0 | 0 | not computable |
| Stocking stance: yes | 0 | 0 | not computable |
| Conditions named they could meet at launch | 0 | 0 | not computable |
| Unmet conditions MAREA cannot satisfy (exclusivity, guaranteed sell-through, funded support) | 0 | 0 | not computable |
| Margin expectations stated | 0 | 0 | not computable |
| Returns expectations stated | 0 | 0 | not computable |
| Support boundaries stated | 0 | 0 | not computable |
| Training needs stated | 0 | 0 | not computable |
| Certification requirements stated | 0 | 0 | not computable |
| Supplier-onboarding requirements stated | 0 | 0 | not computable |

### 8.2 B2B fleet (SEG-06/07/08, `EXP-MC10-07`)

| Item | Count | Denominator | Proportion |
| --- | ---: | ---: | --- |
| Interviews completed with responsibility for ≥5 vessels | 0 | 0 | not computable |
| Measurable trial success criteria stated | 0 | 0 | not computable |
| Accept supervised trial with written data-processing terms | 0 | 0 | not computable |
| Decline any trial before a purchase-ready product | 0 | 0 | not computable |
| Letters of intent | 0 | — | — |
| Data-processing agreements | 0 | — | — |
| Current-tool inventories recorded | 0 | — | — |
| Security / cross-tenant concern statements | 0 | — | — |
| Procurement paths documented | 0 | — | — |

### 8.3 Operator monitoring (SEG-06 operator side, `EXP-MC10-09`)

| Item | Count | Denominator | Proportion |
| --- | ---: | ---: | --- |
| Operator interviews completed | 0 | 0 | not computable |
| Handover or work-list information need named | 0 | 0 | not computable |
| Alert-escalation statements recorded | 0 | — | — |
| Marina liability concerns recorded | 0 | — | — |
| Privacy / data-sharing concerns recorded | 0 | — | — |
| Connectivity observations recorded | 0 | — | — |
| Concrete incident or near-miss described | 0 | — | — |

### 8.4 Barrier block (`EXP-MC10-10` professional contribution)

The professional segments use the shared preregistered professional objection taxonomy
(`MC10-BUYER-OBJECTIONS.md` §1.2, `OBJ-PRO-01`…`OBJ-PRO-15`); no parallel codebook is invented, and
every code and ranking is 0.

| Item | SEG-05 | SEG-06 | SEG-07 | SEG-08 |
| --- | ---: | ---: | ---: | ---: |
| Participants stating a top-3 barrier ranking | 0 | 0 | 0 | 0 |
| Barrier codes applied | 0 | 0 | 0 | 0 |
| Verbatims recorded | 0 | 0 | 0 | 0 |
| Written warranty demanded before trialling | 0 | 0 | 0 | 0 |
| Data-processing term demanded before trialling | 0 | 0 | 0 | 0 |

### 8.5 Commercial events

| Event | Count |
| --- | ---: |
| Distribution agreements | 0 |
| Retail listings | 0 |
| Trial agreements | 0 |
| Letters of intent | 0 |
| Fleet pilots | 0 |
| Data-processing agreements | 0 |
| Prices or margins agreed | 0 |

## 9. Confounders and limitations

Registered confounders, unchanged:

**`EXP-MC10-07`:** seasonal workload distorting availability; owner/manager split between the person
with the problem and the buyer; fleet software procurement cycles longer than the discovery window;
security review requirements rarely fundable at prototype stage; small number of addressable fleets in
the initial geography.

**`EXP-MC10-08`:** retail caution at prototype stage is not evidence of permanent rejection; margin
statements vary with willingness to disclose; small store owners conflate retail and installer roles;
seasonality of stocking decisions.

**`EXP-MC10-09`:** insurance-driven behaviour rather than willingness to buy; marinas may fear liability
from a monitoring service; mobile data coverage at berths is variable and hard to verify quickly; owner
and operator incentives can be opposed (operator wants fewer calls, owner wants more alerts).

Registered limitations:

- `EXP-MC10-07`: no pilot product exists; fleet software is a `CONCEPT`, so responses are necessarily
  hypothetical. Contract value, retention and churn cannot be established; B2B willingness to pay is
  `NOT_MEASURED`.
- `EXP-MC10-08`: no physical product, no packaging, no distributor terms; channel margins and
  sell-through cannot be established; a stated stocking stance is not a purchase order.
- `EXP-MC10-09`: no deployed monitoring hardware; connectivity, battery and alerting promises cannot be
  tested. Any monitoring service remains a `CONCEPT`; it is not a certified distress or safety service
  and does not prevent theft.

Additional limitations specific to this design:

- Purposive quota sampling is not probability sampling; 3–8 interviews per segment detect strong,
  repeated signals only. No margin of error, no prevalence, no market size, no channel forecast.
- Northern Portugal is unavailable in MC-10 (`PT_INSTRUMENTS_NOT_PRODUCED`); ES/PT differences cannot be
  studied here.
- The environment has no outbound contact capability (`BLK-MC10-06`); a trained human interviewer panel
  is required even after authorisation.
- Brand uncleared (`X-01`); legal seller identity `OPEN` (`X-02`); no certification, no approved price,
  no product available. Participants must be told this, and it can itself shape the trust barrier.
- FLEET, WATCH and monitoring are not deployed; there is no hardware and no connectivity contract, so
  operator reactions are hypothetical at a further remove than an installed product.

## 10. FLEET constraints preserved (binding)

These constraints are not research findings and not negotiable design choices. They are programme
invariants that this document preserves; no interview frame, result or future channel step may weaken
them.

| Constraint | Exact programme position | Consequence for this research design | Evidence of satisfaction |
| --- | --- | --- | --- |
| **Hardware not included by default** | The per-vessel FLEET SaaS subscription never includes hardware. WATCH, HUB, SENSE, DISPLAY and AIS are optional and separately purchased, with their own subscriptions and connectivity where applicable. `hardwareIncludedInFleetByDefault = false` | Any trial or pilot would require separately owned/purchased hardware that does not exist; no participant may be told hardware is included; discovery captures the hardware expectation honestly | No hardware selected; no trial |
| **No cross-tenant access** | No cross-tenant read, write, inference or benchmark is a feature; isolation is a precondition. `crossTenantAccessAllowed = false`; `FLEET_TENANT_ISOLATION = NOT_IMPLEMENTED`; no cross-tenant test has run | Discovery must not promise shared fleet views, benchmarks or any visibility outside the operator's own organisation; no real telemetry is accessed during discovery; tenant isolation would be a release precondition | `FLEET_ISOLATION_TESTS = NOT_EXECUTED` |
| **No SLA** | `FLEET_SLA = NO_SLA_ESTABLISHED`; `slaEstablished = false`. No uptime, response, availability or credit commitment exists, and no figure may be stated | Trial questions are not SLA promises; the moderator states that no service-level commitment is established; no success metric may be converted into an SLA | No measurement, no contract, no baseline |
| **No remote control** | FLEET has no steering, throttle, motor, pump or actuator command path, no remote helm and no cloud-to-vessel write path; telemetry is read-only. `remoteHelmControl = PROHIBITED` | No frame may imply remote control; any expectation of remote control is a refusal boundary, not a design input; a demo must never be framed as remote operation | `PILOT_SAFETY_GATE = BLOCKED`; no control channel exists |
| **PILOT safety gate** | PILOT steering is `BLOCKED`; no PILOT steering installation, trial or pilot may be designed, promised or implied. Supervised steering requires bench evidence, E-stop and motor-isolation evidence and supervised sea trials before any safety-gate closure | PILOT is excluded from every channel, trial and pilot used in this document; channel and fleet designs cover software/monitoring/data only | `PILOT_SEA_TRIALS = NOT_PERFORMED`; no signatory |
| **FLEET service state** | `FLEET_MULTI_TENANT_SERVICE = NOT_FOUND`; `FLEET_DPA = NOT_CONTRACTED`; `FLEET_DPIA = NOT_COMPLETED`; `FLEET_ENTITLEMENT_SERVICE = NOT_FOUND` | No trial can be called agreed; no data-processing agreement exists; no onboarding scope exists; no price is approved | All `NOT_FOUND`/`NOT_CONTRACTED` |

Additional preserved invariants: no commercial state may disable a safety-relevant local function
(subscription isolation is a design requirement, not a tested behaviour); AIS-derived data retention and
redistribution is not granted (`D-09`); remote steering is prohibited in every direction.

## 11. Requirements before any listing, trial or pilot (future requirements, not achieved conditions)

**This table is a requirements list for a later milestone. It is not an achieved MAREA condition, not a
promise, not a contract and not a claim that any item exists.** Every row is a condition that the retail
or fleet research would test — and that any later review would have to verify with evidence — before a
listing, trial or pilot could be offered. None is satisfiable inside MC-10.

| # | Requirement | Applies to | Current status | What would have to exist |
| ---: | --- | --- | --- | --- |
| C1 | Legal seller identity (`X-02`) | all | **`OPEN`** | Verified legal registry/tax identity before any terms or agreement |
| C2 | Brand clearance (`X-01`) | all | **`NOT_GRANTED`** | Trademark clearance; MAREA remains a proposed brand |
| C3 | Written warranty and returns terms | retail, fleet | **`NOT_ESTABLISHED`** | Warranty, RMA and returns terms (`BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` §9–§10) |
| C4 | Distributor / channel terms | retail | **`UNKNOWN`/`OPEN`** | Discount structure, payment terms, demo unit, consignment, exclusivity position; no rate card exists |
| C5 | Documented data-processing terms and DPA | fleet, monitoring operators | **`NOT_CONTRACTED`** | Reviewed DPA template, per-customer DPA, processor list, transfer position |
| C6 | DPIA for position/telemetry/sharing | fleet, monitoring operators | **`NOT_COMPLETED`** | Signed DPIA and retention schedule |
| C7 | Tenant-isolation evidence | fleet | **`NOT_EXECUTED`** | Two-tenant isolation suite passing in CI, revocation and job/cache/search/export isolation tests |
| C8 | Independent penetration test | fleet | **`NOT_PERFORMED`** | Signed report with no unmitigated critical/high finding |
| C9 | Security review path for a trial | fleet | **`OPEN`** | A documented review route the operator can complete; prototype-stage security review is rarely fundable |
| C10 | Support model and onboarding scope | fleet, retail | **`OPEN`** | Written support boundary, onboarding scope, training; support is not contracted today |
| C11 | Hardware sourcing and ownership position | fleet, retail | **`BLOCKED`/`NOT_SELECTED`** | Hardware is not included by default; a trial would need separately owned/purchased hardware that does not exist |
| C12 | Connectivity and data-plan terms | fleet, monitoring operators | **`NOT_FOUND`** | Written MVNO/roaming terms, measured coverage, data-cost model; no SIM/data is included |
| C13 | Pilot design with legal support | fleet | **`OPEN`** | Time-boxed supervised-trial protocol, success metric, LOI, DPA, security review, later-milestone authorisation |
| C14 | No-SLA position stated honestly | fleet | **`NO_SLA_ESTABLISHED`** | A measurement plan and contract if an SLA is ever required; no figure may be invented |
| C15 | Anti-remote-control boundary | fleet, monitoring | **`PROHIBITED`** | No control channel may exist; read-only telemetry only; any remote-control expectation is refused |
| C16 | Certification/conformity evidence if a claim is made | retail, fleet | **`NOT_STARTED`** | Applicable conformity assessment; no claim may be published today |
| C17 | Approved price and margin | retail, fleet | **`0 approved`** | Price approval outside this milestone; all current figures are `HYPOTHESIS_UNAPPROVED` or `NOT_ESTABLISHED` |

No row above may be described as satisfied by MAREA until its evidence exists. A future `PASS` of
`EXP-MC10-07` or `EXP-MC10-08` would only establish that this sample named conditions and criteria; it
would not satisfy any row.

## 12. Ethics and privacy for professional and B2B research

- **Consent at two levels.** Organisational consent plus individual consent for fleet and marina
  research; business-contact consent for retail and installer research. Four separate permissions
  (participation, recording, quote use, follow-up) are recorded separately and are withdrawable.
- **Data minimisation.** Segment, role, business profile in bands, opinions and voluntarily stated
  business terms. No berth-holder lists, private marina customer records, vessel registries, customer
  manifests, payment data, telemetry or special-category data.
- **No access to real operational data.** Discovery never receives fleet telemetry, AIS-derived history,
  customer lists or marina access credentials. No cross-tenant data of any kind is sought or accepted.
- **No commercially sensitive terms under pressure.** Participants are told they may decline any
  question; confidential dealer terms are not recorded verbatim where marked confidential.
- **No implication of a relationship.** No participant may be described as a partner, distributor,
  pilot site or retail listing; no preferred-vendor relationship is implied; no logo, quote or count may
  be reused publicly.
- **No representation of readiness.** MAREA is a proposed brand with no certified, priced or purchasable
  product; FLEET is not deployed; monitoring is a concept and not a safety service.
- **Storage and retention.** No participant or business-identifying data may be stored in this
  repository. Any future authorised fieldwork uses the approved Layer A/B stores; the repository holds
  aggregate counts only, exactly as `data/research-status.json` does today.
- **Zero incentive.** The zero-incentive policy is proposed but not approved; no payment, prize or
  advertising spend is authorised.

## 13. Analysis, integrity and prohibited interpretations

- Thresholds are frozen and hash-checked. A change requires a dated amendment per
  `MC10-EXPERIMENT-RESULTS.md` §11; none was made because no data exists.
- Two independent coders; a-priori codebook; Cohen's κ target ≥0.60 for theme codes; negative cases
  reported explicitly. **Coded units today: 0.**
- Percentages are within-sample only and always carry their denominator. With n = 0, no percentage is
  reported.
- The decision default is `INCONCLUSIVE` **only when data exists**; with zero completed interviews the
  status is `NOT_EXECUTED` / `BLOCKED`, and no verdict may be manufactured.
- Prohibited: verbal interest reported as a trial, pilot, letter of intent or distribution agreement;
  conditional interest reported as agreement; an LOI reported as a contract; a marina or retailer
  reported as a partner; a trial success criterion converted into an SLA; an operator security question
  reported as a security control; any count, quote or objection that was not actually recorded;
  describing MC-10 activities as executed when they were only prepared.

## 14. Cross-references

| Document | Relationship |
| --- | --- |
| `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` | Segments, recruitment, screener, consent, guide, schema, analysis plan and ethics; reused unchanged |
| `docs/marea/market-validation/MC09-VALIDATION-EXPERIMENTS.md` §§2 (`EXP-MC10-07`, `-08`, `-09`, `-10`) | Registered hypotheses, evidence, thresholds, confounders and interpretation |
| `docs/marea/market-validation/data/validation-experiments.json` | Frozen machine-readable registry; thresholds quoted verbatim above |
| `docs/marea/market-validation/data/governance-status.json` | Status invariants: no SLA, no cross-tenant access, hardware not included by default, remote helm prohibited, sales/publication blocked |
| `docs/marea/market-validation/channels/MC09-DISTRIBUTION-STRATEGY.md` | MC-09 public channel research (desk evidence only; no partner contacted) |
| `docs/marea/customer-discovery/MC10-RESEARCH-SCOPE.md` | MC-10 scope, Wave 0 state and `BLOCKED` outcome |
| `docs/marea/customer-discovery/MC10-FIELDWORK-AUTHORIZATION.md` | `AUTH-MC10-001 = NOT_GRANTED`; pre-fieldwork checklist; unblock sequence |
| `docs/marea/customer-discovery/MC10-EXPERIMENT-RESULTS.md` | Frozen verdicts: all ten experiments `NOT_EXECUTED` / `BLOCKED`; §§7–10 |
| `docs/marea/customer-discovery/MC10-BUYER-OBJECTIONS.md` | Shared preregistered professional objection taxonomy (`OBJ-PRO-01`…`OBJ-PRO-15`); zero observed objections |
| `docs/marea/customer-discovery/data/research-status.json` | Aggregate counts (all 0), segment plans and commercial invariants |
| `docs/marea/bundles/BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` | SFR-5 B2B contracted solution route, qualification, warranty/RMA/support model and refusal boundary |
| `docs/marea/bundles/BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md` | FLEET per-vessel entitlement: hardware never included, no SLA, isolation rule |
| `docs/marea/products/FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md` | FLEET tenancy, authorization, DPA/DPIA, SLA evidence and non-assertions |
| `docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` | 0 `TESTED` compatibility rows; receive-only AIS; no NMEA 2000 offer |
| `docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` | WATCH/SENSE monitoring boundaries; no remote control; PILOT safety gate |
| `docs/marea/customer-discovery/professionals/MC10-INSTALLER-DISCOVERY.md` | Sibling D9 design for installers (SEG-04) |

## 15. Status statement

This document is a **research design and an empty instrument**. It was prepared inside Wave 0 and it was
not executed. It contains no participant, no quote, no objection, no count above zero and no verdict. It
contains no distribution agreement, retail listing, trial, pilot or letter of intent, and it makes no
compatibility, warranty, certification, availability, SLA, cross-tenant, hardware-inclusion or
remote-control claim. It preserves the FLEET constraints and the PILOT safety gate without softening
either.

```
AUTH-MC10-001               = NOT_GRANTED
EXP-MC10-07                  = NOT_EXECUTED / BLOCKED
EXP-MC10-08                  = NOT_EXECUTED / BLOCKED
EXP-MC10-09 (operator side)  = NOT_EXECUTED / BLOCKED
EXP-MC10-10 (professional)   = NOT_EXECUTED / BLOCKED
PROFESSIONALS_INTERVIEWED    = 0
TRIALS_AGREED                = 0
DISTRIBUTION_AGREEMENTS      = 0
RETAIL_LISTINGS              = 0
FLEET_PILOTS                 = 0
```
