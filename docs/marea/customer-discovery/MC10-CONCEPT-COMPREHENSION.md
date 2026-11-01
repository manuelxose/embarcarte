# MC-10 — Concept comprehension test design (D15)

| Field | Value |
| --- | --- |
| Document ID | MC-10 / D15 / MC10-CONCEPT-COMPREHENSION |
| Milestone | MC-10 of 36 — primary customer discovery |
| Experiment | `EXP-MC10-06` — concept comprehension and exclusions |
| Concepts designed | 5 read-aloud clusters (`C1`–`C5`), reported as 7 machine concept IDs: `NAV`, `HUB`, `START`, `WATCH`, `PROTECT`, `INTEGRATED_SYSTEM`, `FLEET` |
| Reporting mirror | `data/concept-comprehension.json` (Lead-owned; 7 concept IDs, all `NOT_EXECUTED`) |
| Status | `NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED)` |
| Participants who have seen a concept | **0** |
| Concepts shown | **0** |
| Unaided restatements recorded | **0** |
| Comprehension scores computed | **0** |
| Coded concept records | **0** |
| Public copy validated | **0** |
| Commercial figures in this document | **none** — no amount, currency code, currency symbol or claim of a purchasable amount |
| Base | MC-09 HEAD `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3` |
| Working branch | `feature/marea-mc10-primary-customer-discovery` |
| Date | 2026-11-01 |
| Author | Agent C — Owner Research Specialist (MC-10), under the Lead's research programme authority |
| Write scope | This file only |
| Machine-readable authorities | `data/research-status.json`; `data/fieldwork-authorization.json`; `docs/marea/market-validation/data/validation-experiments.json` (frozen MC-09 registry) |
| Is not | A fielded comprehension test, a copy approval, a claim validation, a usability test, a legal clearance, a product announcement or evidence that any customer exists |

STATUS: NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED)

## 0. Purpose, rules and authoritative state

This document is the **prepared** design for the concept-comprehension test registered as
`EXP-MC10-06`: the neutral concept descriptions that would be read aloud, the inclusion/exclusion
rubric that would be scored, the critical-misconception list, the preregistered thresholds and the
empty score tables. No participant has seen any concept, because no outreach authorization exists.

Reading rules:

1. **No concept was shown.** Every score is empty because fieldwork is blocked. Zero comprehension
   results are not evidence that owners misunderstand the concepts, and not evidence that they
   understand them.
2. **No public copy is validated.** A design for a test validates nothing. The internal draft copy
   files remain unvalidated drafts, `brandPublication` remains `NOT_GRANTED` and no product or bundle
   is for sale.
3. **No commercial figure appears anywhere in this document** — no amount, currency code, currency
   symbol or "starting from" figure, not in a concept description, not in a rubric cell, not in an
   example. Comprehension and commercial questioning are separate stages by design; the conditional
   commercial module at `Q12` is outside this document. Instrument-module identifiers are labels for
   questionnaire sections, never amounts.
4. **Exclusions are stated before benefits** in every concept script, and no description may be read as
   a statement of availability, certification, stock, delivery or support.
5. **Brand neutrality.** The read-aloud descriptions do not name the brand; the canonical source blocks
   below do, because the canonical identity fields name the product family. The brand is not named to a
   participant until the closing section of the interview.

Authoritative state, quoted from the Lead-owned records:

```
MC-10 MILESTONE        = BLOCKED
OUTREACH_AUTHORIZATION = NOT_GRANTED
FIELDWORK_STATUS       = BLOCKED
AUTH-MC10-001          = NOT_GRANTED
CONCEPTS_SHOWN         = 0
COMPREHENSION_SCORES   = 0
PUBLIC_COPY_VALIDATED  = 0
MILESTONE              = BLOCKED
```

Driving decisions: `D-029` (MC-10 stops at the authorization gate and reports `BLOCKED`), `D-030`
(absence of primary evidence changes no product priority), `D-031` (instruments and thresholds frozen
before fielding), `D-032` (no commercial restriction weakened), `D-033` (MC-11 inherits no customer
evidence).

## 1. The registered experiment

Source of record: `docs/marea/market-validation/data/validation-experiments.json` (MC-09), frozen by
SHA-256 in MC-10 before any data could exist. The text below is quoted from the registry record.

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
- **Registered confounders (registry items, quoted verbatim).**
  - "Interviewer explanation quality varies despite a scripted neutral description"
  - "Participants may repeat wording without understanding it"
  - "Concepts are unfamiliar, so comprehension may reflect novelty rather than copy quality"
  - "Testing three concepts in one session causes interference"
- **Limitations (quoted).** "Comprehension in a research session is not comprehension on a website
  under time pressure. No page, visual or real product exists to test. Results cannot validate claims
  or copy legally."
- **Interpretation (quoted).** "A PASS permits a copy drafting attempt for that concept and a later
  usability test; it does not validate any claim and does not authorise publication. A FAIL biases
  toward renaming or recomposing the bundle before any market-facing step."

### 1.1 Position in the interview and gating order

Comprehension is administered at `GUIDE-01` step `Q11`, after the undirected problem, purchase,
alternative, installation, subscription and trust questions (`Q1`–`Q10`) and **before** the conditional
commercial module (`Q12`). This ordering is a validity requirement: a commercial figure cannot crowd
out comprehension, and a concept cannot contaminate the unprompted problem description that
`EXP-MC10-01` depends on. The brand is disclosed only in the closing section, after comprehension has
been scored.

### 1.2 Current verdict

| Field | Value |
| --- | --- |
| Execution | `NOT_EXECUTED` |
| Result verdict | `BLOCKED` |
| Participants | 0 |
| Concepts shown | 0 |
| Scored records | 0 |
| Denominator for every rate | `n=0` |
| Copy blocked | all concepts remain unvalidated |

`BLOCKED` is not `INCONCLUSIVE`, not `FAIL` and not `PASS`. A planned threshold is not an observation.

## 2. The concept set

### 2.0 Design rules for every description

1. **Exclusions first, benefits second.** The read-aloud script opens with what the concept does *not*
   do or include, then states the function. This follows the programme honesty rule that concept
   descriptions "include exclusions before benefits".
2. **No brand in the read-aloud text.** The tested script is brand-free. The canonical quotes in this
   section name the brand only because the canonical identity field does.
3. **No amounts.** No amount, currency or "starting from" figure is read, written or implied.
4. **No availability claim, even by tense.** Every script is preceded by the mandatory preamble in
   §2.0.1, which states that the concept is not for sale and not certified; the grammatical tense of a
   description never converts a defined target specification into an available product. Prohibited
   words include "available", "orderable", "in stock", "certified", "launching" and "buy now".
5. **No benefit inflation and no superiority claim.** No comparison to any named competitor, no
   performance figure, no accuracy figure, no reliability percentage, no customer reference.
6. **Neutral vocabulary.** Product-family codes are used in the researcher pack (`C1`–`C5`); no new
   marketing name is invented for a concept.
7. **Freeze required.** The scripts below are `PREPARED — NOT FROZEN`. They must be frozen as a new
   instrument version, with the discrepancy register in §6 resolved, before any fielding.

### 2.0.1 Mandatory preamble (read aloud before every script)

> "Before starting: this is a concept that is still being worked on. It is not a product on sale.
> Nothing described here can be bought today, nothing is certified, and no date, stock, support or
> delivery is being offered. Some parts are still being designed and some may never be built. The
> question is what you understand from it and what you think it excludes — not whether you like it."

The preamble is mandatory for every concept and every participant. A comprehension score recorded
without it is not admissible under `EXP-MC10-06`. The preamble converts no description into a product:
the scripts describe defined target specifications and nothing else.

### 2.0.2 Read-aloud clusters and machine reporting units

A research session reads **five** neutral descriptions, in the order `C1`–`C5`. Results are reported
per **machine concept ID**, mirroring the Lead-owned score mirror `data/concept-comprehension.json`,
which has seven rows. The mapping is fixed and is not a matter of coder preference.

| Read-aloud cluster | Machine concept ID(s) | Why the cluster is split or kept for reporting |
| --- | --- | --- |
| `C1` Navigation software and onboard data | `NAV` | One product family; one reporting row |
| `C2` Onboard data gateway with connected navigation | `HUB`, `START` | The session reads the gateway-plus-navigation concept once; the mirror reports the hardware family (`HUB`) and the composed bundle (`START`) separately because their exclusions differ |
| `C3` Unattended-vessel monitoring | `WATCH`, `PROTECT` | The session reads the monitoring concept once; the mirror reports the product family (`WATCH`) and the composed bundle with sensor kit and installation (`PROTECT`) separately |
| `C4` Integrated marine systems | `INTEGRATED_SYSTEM` | One bundle outcome; one reporting row |
| `C5` Fleet operations | `FLEET` | One product family; one reporting row |

Consequences for scoring:

- A restatement recorded under `C2` populates the `HUB` and `START` rows; a restatement under `C3`
  populates the `WATCH` and `PROTECT` rows. The same participant answers **once per cluster**, and the
  two rows are not two independent observations.
- The threshold is evaluated **per machine concept ID** as far as the mirror is concerned, because the
  registered hypothesis speaks of "per concept". Where a cluster splits into two rows, both rows inherit
  the same denominator and the same restatement, and any divergence between the two rows must be
  explained in the analysis (for example a participant who understands the hardware but not the bundle).
- No percentage may be reported at cluster level as if it were a separate observation: clusters are
  read-aloud units, machine IDs are reporting units.

### 2.1 `C1` — Navigation software and onboard data

- **Canonical family:** `NAV` (defined target specification; `NOT_FOR_SALE`).
- **Bundle context:** `START`, `CRUISE`, `SAIL`, `COMPLETE` all contain a NAV edition.

**Read-aloud script — exclusions first (brand-free, prepared, not frozen):**

> **What this concept does not do and does not include.** It is not a chart plotter, not a certified
> navigation system, not ECDIS and not an official chart system, and not a steering device. It does not
> include nautical charts: charts are licensed data purchased separately for a defined region, and no
> global, complete or unlimited coverage is included. It does not include a GNSS receiver, an AIS
> receiver, a transponder, an antenna, a display or any other hardware. It does not include
> installation, a compatibility assessment, mobile data or internet service. It does not transmit AIS
> and cannot guarantee that other vessels are seen. It does not prevent collisions and does not
> guarantee safety of life, vessel or cargo. It does not guarantee device compatibility: compatibility
> is per device, firmware, direction and installation. It does not guarantee continuous connectivity.
> Using it requires a paid subscription, and the functions covered by that subscription stop if it
> lapses.
>
> **What this concept is.** Planning and navigation software for a phone, tablet or desktop that can
> display the boat's own data — position, heading, speed, wind and depth where compatible equipment
> aboard provides them — plan a route, navigate it with a chart view, record the passage and export the
> owner's own records. It is a navigational aid for the skipper. Where a data source is missing or a
> value is stale, it must show that state rather than present an invented value. Vessel data can come
> from compatible equipment already aboard, or from a separate onboard data gateway product.

**Canonical source text (quoted verbatim; the brand appears because the canonical identity names it):**

> "MAREA NAV is the software navigation application of the MAREA family. It is intended to let a
> recreational sailing or motor-vessel skipper plan a route, navigate it with a chart view, record the
> passage and see the boat's own data where compatible equipment provides it, on a phone, tablet or
> desktop. […] MAREA NAV is a navigational aid, not a chart plotter, not a certified navigation system
> and not a steering device."
>
> Source: `docs/marea/products/MAREA-NAV-COMMERCIAL-SPEC.md` §4 F01.

**Canonical exclusions (quoted, abridged to the owner-relevant lines):**

> "**AIS hardware.** No AIS receiver, antenna or splitter ships with the software. […] **A GNSS
> receiver.** Position comes from the customer's device or a compatible source the customer already
> owns. […] **Unlimited access to official charts.** No ENC distributor or OEM agreement exists […]
> **All regions.** […] no global or complete coverage is claimed […] **ECDIS status.** MAREA NAV is not
> ECDIS […] **Guaranteed collision avoidance or guaranteed safety.** […] **Continuous connectivity.**
> […] no always-connected service is promised. **NMEA 2000 certification or operational
> compatibility.** […] no compatibility claim may be made."
>
> Source: `docs/marea/products/MAREA-NAV-COMMERCIAL-SPEC.md` §6.

**Do not infer:** that charts are included; that any hardware, receiver, display or installation is
included; that compatibility is assured; that AIS transmission exists; that the product is certified,
available or orderable.

### 2.2 `C2` — Onboard data gateway with connected navigation

- **Canonical family:** `HUB` (defined target specification; `NOT_FOR_SALE`).
- **Bundle context:** `START` (HUB Standard plus NAV Pro) and the HUB element of `CRUISE`, `SAIL`,
  `PROTECT` (optional) and `COMPLETE`.

**Read-aloud script — exclusions first (brand-free, prepared, not frozen):**

> **What this concept does not do and does not include.** It is never the vessel's steering controller
> and does not include autopilot, steering, throttle or motor control. It does not replace instruments
> that already work. It does not include a navigation software subscription, nautical charts, a
> display, a traffic receiver, sensors or any monitoring service. NMEA 2000 is not implemented,
> licensed or certified, and no blanket or "works with any boat" compatibility is claimed; no
> compatibility row has been tested. Installation, mounts, cabling, adapters and power items are not
> included, and a compatibility assessment is required. Internet is needed for licence checks and
> updates; local vessel data is intended to work without cloud. Nothing here is certified.
>
> **What this concept is.** One installed onboard unit that gathers supported vessel data — position,
> compatible instrument data, wind, depth where available, battery and utility status — normalises it
> into one documented local interface on the vessel and serves it to navigation software and the
> owner's own devices, so that mixed, legacy and modern equipment becomes readable in one place without
> replacing the electronics that already work. Combined with a separate navigation software
> subscription, it is intended to bring existing onboard data into modern navigation.

**Canonical source text (quoted verbatim; the brand appears because the canonical identity names it):**

> "MAREA HUB is the onboard data gateway and connectivity appliance of the MAREA family: one installed
> unit that gathers supported vessel data — GNSS position, compatible instrument data, Signal K
> streams, wind, depth where available, battery and utility status and receive-only AIS targets —
> normalises it into a single documented local vessel data interface, and serves that interface to
> MAREA NAV, MAREA DISPLAY, compatible instruments and the owner's own devices on the vessel network.
> […] Positioning: the integration layer that makes mixed, legacy and modern equipment readable in one
> place without replacing working instruments; it is never the vessel's steering controller."
>
> Source: `docs/marea/products/MAREA-HUB-COMMERCIAL-SPEC.md` §3 F01.

**Canonical exclusions of the composed bundle (quoted, abridged):**

> "START never includes and never implies: AIS receiver hardware or AIS-derived
> data retention/redistribution; MAREA DISPLAY 7 or MAREA DISPLAY Large (conditional, never
> selectable); PILOT
> hardware, software or any steering authority; SENSE modules; WATCH monitoring hardware or service;
> FLEET organisation subscriptions; installation labour, commissioning, mounts, antennas, VHF
> splitters, cabling, adapters or power items; NMEA 2000 implementation, licence or certification;
> ECDIS, ECDIS-class or official-chart-system status; guaranteed, unlimited or global chart coverage;
> internet-only operation […] any autopilot, actuator or remote-helm control path; charts, weather,
> tides or currents as free features; and any stock, availability, certification, review or delivery
> commitment. An exclusion is never a silent promise of later inclusion."
>
> Source: `docs/marea/bundles/MAREA-START-COMMERCIAL-SPEC.md` B09.

**Do not infer:** that a navigation licence is included with the gateway; that a display, receiver or
sensor kit is included; that installation is included; that compatibility is guaranteed; that the
gateway steers or controls anything.

### 2.3 `C3` — Unattended-vessel monitoring

- **Canonical family:** `WATCH` (defined target specification; `NOT_FOR_SALE`).
- **Bundle context:** `PROTECT` (WATCH Core plus an essentials sensor kit); WATCH also appears in
  `COMPLETE` and optionally per vessel in the FLEET package.

**Read-aloud script — exclusions first (brand-free, prepared, not frozen):**

> **What this concept does not do and does not include.** It does not prevent theft, does not recover a
> stolen vessel and gives no security guarantee. It does not guarantee alert delivery and does not
> promise immediate notification: alerts depend on power, network coverage, the notification provider
> and the people configured to receive them, and acceptance by a provider is not proof that a person
> saw an alert. It is not a certified alarm and not a distress, rescue, SOLAS or GMDSS service. It does
> not switch, relay, actuate, steer, throttle or control anything on the vessel. The SIM/data plan is
> separate and not included, and installation materials, labour and commissioning are not included.
> Sensor accuracy has not been measured, and no universal sensor or vessel compatibility is claimed.
> If the monitoring subscription lapses, remote monitoring stops, while local measurement and local
> alarms continue.
>
> **What this concept is.** An onboard monitoring device with a declared set of supported sensor
> inputs — position, battery/DC state with shore-power context, bilge and temperature context where the
> corresponding compatible input exists — sold together with a recurring monitoring service that sends
> remote alerts to the people the owner authorises when the vessel is unattended. It reports its own
> connectivity and data freshness honestly, shows a gap instead of a false all-clear, and never
> presents a stale value as current.

**Canonical source text (quoted verbatim; the brand appears because the canonical identity names it):**

> "MAREA WATCH is the shore/remote monitoring and notification product of the MAREA family: an onboard
> monitoring device with a declared set of supported sensor inputs, a secure device identity and an
> outbound-only connectivity design, sold together with a recurring monitoring subscription that
> delivers remote alerts to authorised people when the vessel is unattended. […] it never presents a
> stale value as current and never claims that an alert was seen when it was not. […] WATCH is not a
> distress service, not a theft-prevention guarantee, not a certified alarm and not a remote helm
> control."
>
> Source: `docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` §3 F01.

**Canonical exclusions of the composed bundle (quoted, abridged):**

> "PROTECT excludes, explicitly and permanently: any assumption that WATCH comes with all sensors or
> that adding a SENSE module gives remote alerts by itself; guaranteed, immediate or
> acknowledged-by-a-human alert delivery; permanent or unlimited connectivity; theft prevention, theft
> recovery or a security-system guarantee; a certified distress, rescue, SOLAS or GMDSS service; remote
> switching, relay actuation, helm, steering, throttle or engine control; MAREA FLEET multi-tenant
> platform use […]; SENSE direct-to-cloud alerts; NMEA 2000 compatibility (not implemented, not
> licensed, not certified); duplicate sensors beyond the kit composition; charts, navigation, AIS
> traffic, display or plotter functionality; […] and any certification, approval or availability
> claim."
>
> Source: `docs/marea/bundles/MAREA-PROTECT-COMMERCIAL-SPEC.md` B09. The elided clause lists the
> installation, material and connectivity content that stays outside the composition; it is elided here
> only because this document carries no commercial figure. The exclusion itself is retained in the
> read-aloud script and in rubric codes `E3-05`/`E3-06`.

**Do not infer:** that alerts are guaranteed or instant; that monitoring prevents theft or damage; that
it is a certified alarm or rescue service; that it includes connectivity, installation or all sensors;
that it can switch or control anything.

### 2.4 `C4` — Integrated marine systems

- **Canonical bundle:** `COMPLETE` (and the equivalent `SAIL` composition for sailing hulls), both
  `DEFINED`; `SAIL` and `COMPLETE` are `BLOCKED` by the steering safety gate.
- **Scope:** navigation, onboard data gateway, fixed helm display, shore monitoring, measured systems
  and supervised steering, specified and installed as one project.

**Read-aloud script — exclusions first (brand-free, prepared, not frozen):**

> **What this concept does not do and does not include.** It is never autonomy. There is no remote,
> cloud-mediated or unattended steering, and no control path to the helm, throttle or motor; where a
> steering system is part of the installation it is supervised at all times by a person at the helm,
> and its safety gate is currently blocked. There is no collision avoidance and no automatic
> manoeuvring from traffic data; traffic awareness is receive-only and an optional receiver is not
> automatic. Nothing here is a certified instrument, a certified alarm or a safety-of-life service;
> there is no ECDIS status and no NMEA 2000 certification or blanket compatibility. No fixed total is
> established: a vessel and steering survey is required, professional installation and commissioning
> are quoted per vessel, and charts, connectivity, data plans and installation labour are excluded
> unless itemised. Acceptance is per subsystem, never one combined acceptance that bypasses a gate.
>
> **What this concept is.** A coordinated, professionally installed multi-system solution in which
> navigation, onboard instrument data, a fixed helm display, shore monitoring, measured systems and
> supervised steering are specified, installed and accepted together, with one itemised quotation
> instead of a fixed all-inclusive total, and with every limitation documented for the owner.

**Canonical source text (quoted verbatim; the brand appears because the canonical identity names it):**

> "MAREA COMPLETE (`COMPLETE`) is the defined coordinated multi-system bundle: `NAV-PRO`, `HUB-PRO`,
> `DISPLAY-7`, `WATCH-CORE`, `SENSE-POWER`, `SENSE-BILGE`, `SENSE-TANKS`, `SENSE-ENV` and a surveyed,
> quoted `PILOT-COASTAL` steering installation. It is a bundle definition
> (`definition = COMPLETE_TARGET_SPECIFICATION`), not a product, not a SKU and not an 'everything
> included' tier."
>
> Source: `docs/marea/bundles/MAREA-COMPLETE-COMMERCIAL-SPEC.md` B01.

**Canonical outcome and exclusions (quoted):**

> "The outcome is a coordinated, supervised, readable boat — never autonomy, never a guarantee of
> monitoring delivery, never a certified instrument and never a promise of suitability for any
> particular voyage."
>
> Source: `docs/marea/bundles/MAREA-COMPLETE-COMMERCIAL-SPEC.md` B05.

> "Excluded, permanently or by definition: […] remote, internet or cloud steering; unattended or
> autonomous navigation and steering; collision avoidance or AIS-triggered manoeuvring; any certified,
> distress, SOLAS, GMDSS or safety-of-life service or certified alarm; unlimited features, data or
> future upgrades; a single combined acceptance that bypasses subsystem gates; NMEA 2000 certification
> or operational compatibility; ECDIS, ECDIS-class or ECDIS-equivalent navigation; charts,
> connectivity, data plans and installation labour except as itemised in a quotation."
>
> Source: `docs/marea/bundles/MAREA-COMPLETE-COMMERCIAL-SPEC.md` B09. The canonical list opens by
> excluding any fixed turnkey commercial total; that clause is elided here because this document
> carries no commercial figure, and the exclusion is restated in rubric code `E4-04`.

**Do not infer:** that the vessel can be steered remotely or unattended; that steering is unsupervised;
that collision avoidance, certified alarms or a safety-of-life service exist; that a fixed total or a
turnkey installation exists; that charts, connectivity or labour are included by default.

### 2.5 `C5` — Fleet operations

- **Canonical family:** `FLEET` — the business software product (defined; `NOT_FOR_SALE`). The
  packaged offer that adds onboarding, device supply, installation, monitoring and support is a
  **separate commercial object** and is not described as included.

**Read-aloud script — exclusions first (brand-free, prepared, not frozen):**

> **What this concept does not do and does not include.** It is not a consumer monitoring app, not a
> social boat-sharing product, not a shipping ERP, not a dispatch or distress system and not a control
> system: it never commands, steers or configures a vessel. It does not include hardware: no monitoring
> device, no gateway, no traffic receiver, no display. Installation, connectivity, SIM or data plans,
> charts and weather data are not included in the subscription. It is not the packaged offer that adds
> onboarding, device supply, installation and professional support; that is a separate commercial
> object and nothing from it is implied. There is no uptime or service-level guarantee, no security
> certification and no guaranteed instant alert; a disconnected vessel must never be shown as online.
> A data-processing agreement and defined roles are required, and one organisation can never see
> another organisation's data.
>
> **What this concept is.** A business software service in which an organisation registers its
> vessels, its people and its operating rules and runs fleet operations from one tenant: fleet
> overview, authorised position and status, availability, maintenance planning and work orders, service
> history, equipment inventory, vessel documents with expiry control, incidents, operational events,
> assignments, reports, exports and audit records. It consumes read-only telemetry where a compatible
> monitoring or gateway installation exists and the organisation consents, and it shows data with its
> age instead of a fabricated all-clear.

**Canonical source text (quoted verbatim; the brand appears because the canonical identity names it):**

> "MAREA FLEET is the multi-vessel organization product of the MAREA family: a business SaaS in which
> an organization registers its vessels, its people and its operating rules, and runs day-to-day fleet
> operations from one tenant — fleet overview, authorized position and status, availability,
> maintenance planning and work orders, service history, equipment inventory, vessel documents with
> expiry control, technical incidents, operational events, assigned activities, crew and staff access,
> reporting, exports and audit records — consuming authorised **read-only** telemetry where a
> compatible WATCH or HUB installation exists. […] it is not a consumer monitoring app, not a
> boat-club social product, not a shipping ERP, not a dispatch or distress system and not a control
> system. […] FLEET never commands a vessel."
>
> Source: `docs/marea/products/MAREA-FLEET-COMMERCIAL-SPEC.md` §3 F01.

**Canonical exclusions (quoted):**

> "FLEET is not: a remote-control, remote-helm or autopilot product; a distress, rescue, SOLAS or GMDSS
> service; a certified security product or a security certification of any kind; a safety-management
> system, a classification-society tool or a regulatory-compliance certificate; a deep-sea shipping ERP
> or a charter-booking engine; an insurer, a broker or an underwriting data product; a consumer
> monitoring app or a social boat-sharing network; a public vessel-tracking service; a hardware
> product; or a promise of uptime, instant alerts or "unlimited" anything."
>
> Source: `docs/marea/products/MAREA-FLEET-COMMERCIAL-SPEC.md` §5.2.

> "A dossier reader must never conclude that buying the FLEET package includes any hardware, or that
> buying a FLEET subscription creates a WATCH service."
>
> Source: `docs/marea/products/MAREA-FLEET-COMMERCIAL-SPEC.md` §5.3.

**Do not infer:** that hardware, connectivity, installation or the packaged offer is included; that
the platform controls or steers a vessel; that an uptime, response-time, security or alert guarantee
exists; that organisational data is visible across tenants.

### 2.6 What the concept set does not include

Two omissions are deliberate and must be stated to every coder, because a coder may otherwise score a
participant against the wrong concept:

- **Traffic awareness as a standalone concept.** Receive-only traffic is a hard exclusion to be
  restated in `C1`, `C2` and `C4` (and is excluded from `C3`), not a separate concept in this set.
- **Steering assistance as a standalone concept.** Supervised steering appears inside `C4` as an
  excluded-or-supervised element; it is never presented as a general capability.

## 3. Inclusion/exclusion rubric

### 3.1 Master matrix — what is correct per concept

The matrix defines the canonical answer a participant's unaided restatement is scored against. Codes
used: `IN` = included in the concept; `COND` = included only under a stated condition or as a separate
purchase; `EXT` = required external element, never included; `EXC` = excluded; `N/A` = not part of this
concept. No cell may be read as availability, certification or approval. Matrix columns are the five
read-aloud clusters; §2.0.2 gives their mapping to the seven machine reporting IDs.

| # | Rubric dimension | `C1` NAV | `C2` HUB / START | `C3` WATCH / PROTECT | `C4` Integrated | `C5` FLEET |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | Included hardware | `EXC` — software only; no receiver, GNSS, transponder, display | `COND` — the gateway unit is purchased; no display, receiver or sensors | `COND` — monitoring device and the declared sensor kit; no extra sensors or accessories | `COND` — defined components per configuration; traffic receiver optional, never automatic; antennas/cabling outside itemisation | `EXC` — software only; no hardware and no device supply |
| 2 | Installation and commissioning | `EXC` — not included | `EXC` — assessment required; installer-assisted; mounts, cabling, power items external | `EXC` — installation materials, labour and commissioning external; electrical/bilge work professional | `EXC` — survey, professional installation, commissioning and sea trials are quoted; per-subsystem acceptance | `EXC` — equipment installation not included; onboarding is a separate service |
| 3 | Required subscriptions | `IN` — a paid software subscription is required; functions stop if it lapses | `IN` — navigation subscription required separately; the gateway itself has none | `IN` — recurring monitoring subscription required; remote monitoring stops on lapse, local functions continue | `IN` per subsystem — navigation and monitoring subscriptions; steering carries no subscription and is never gated by an entitlement | `IN` — per-vessel subscription; onboarding and services separate |
| 4 | Chart and data licences | `EXT` — licensed separately per region; no global coverage | `EXT` — chart licence external; never created by the subscription | `N/A` — no charts | `EXT` — charts required external and excluded unless itemised | `N/A` — no charts or weather included; weather is a separate entitlement |
| 5 | AIS receive-only | `COND` — can display received targets when a receiver supplies them; no AIS hardware included; never transmits | `EXC` — no traffic receiver; optional separate product | `EXC` — no traffic awareness, charts, display or plotter function | `COND` — an optional receive-only receiver; never transmits; never automatic | `COND` — read-only traffic context only where data rights exist; no transmission, no collision avoidance |
| 6 | Monitoring guarantees | `N/A` — no monitoring claim | `EXC` — the gateway is not a monitoring service or alert service | `EXC` — no theft prevention or recovery; no guaranteed, immediate or human-acknowledged alert; not certified | `EXC` — no guarantee of monitoring delivery even where monitoring is installed | `EXC` — no guaranteed instant alert, no uptime or service-level promise; disconnected is shown as disconnected |
| 7 | Compatibility | `EXC` — no guarantee; per device, firmware, direction and installation; no NMEA 2000 certification | `EXC` — no blanket compatibility; no tested rows; assessment required | `EXC` — no universal sensor or vessel compatibility; sensor accuracy not measured | `EXC` — full survey required; no NMEA 2000 certification; no supported compatibility rows | `COND` — read-only integrations conditional; no protocol compatibility claimed without a recorded test |
| 8 | Remote control and steering | `EXC` — not a steering device; no helm command; no route upload to an autopilot | `EXC` — never the vessel's steering controller; no autopilot or throttle control | `EXC` — no switching, relay, helm, throttle or engine control | `EXC` remotely / `COND` supervised on board — supervised at all times by a person at the helm; no remote, cloud or unattended steering; safety gate blocked | `EXC` — never commands a vessel; no control path; no remote helm |
| 9 | Certified safety functions | `EXC` — no certified navigation instrument; collision-avoidance decision support only, no guarantee | `EXC` — no certification and no safety service | `EXC` — not a certified alarm, distress, SOLAS or GMDSS service | `EXC` — no certified alarm, distress or safety-of-life service; no collision avoidance | `EXC` — not a safety-management system, not a distress or dispatch service |
| 10 | Connectivity and data plan | `EXT` — customer internet; offline only within licensed offline regions | `EXT` — internet for licence and updates; local data intended offline; no SIM included | `EXT` — separate data contract required; coverage at the berth required; not included | `EXT` — separate data contract for monitoring; cellular required; never included in a total | `EXT` — separate per connected device; never included in the subscription |

### 3.2 Per-concept exclusion codes to be restated

These are the exclusion codes a participant must restate **in their own words, unprompted**, to score.
The threshold counts correct exclusions per concept; the table fixes which statements count.

| Concept | Exclusion codes (correct answers) | Critical exclusions (any one restated counts) |
| --- | --- | --- |
| `C1` | `E1-01` charts licensed separately · `E1-02` no hardware included · `E1-03` no installation · `E1-04` no AIS transmission · `E1-05` no collision-avoidance or safety guarantee · `E1-06` no compatibility guarantee · `E1-07` no continuous connectivity · `E1-08` subscription required and functions stop on lapse | `E1-01`, `E1-04`, `E1-05`, `E1-07` |
| `C2` | `E2-01` no steering/control authority · `E2-02` does not replace working instruments · `E2-03` no navigation licence included · `E2-04` no charts included · `E2-05` no display, receiver or sensors · `E2-06` installation and assessment excluded · `E2-07` no NMEA 2000 certification or blanket compatibility · `E2-08` no certification | `E2-01`, `E2-04`, `E2-07` |
| `C3` | `E3-01` no theft prevention or recovery · `E3-02` no guaranteed or immediate alert · `E3-03` not a certified alarm or distress service · `E3-04` no remote switching or control · `E3-05` data plan and connectivity excluded · `E3-06` installation excluded · `E3-07` remote monitoring stops on subscription lapse, local functions continue · `E3-08` depends on power and coverage | `E3-01`, `E3-02`, `E3-03`, `E3-04` |
| `C4` | `E4-01` never autonomous; no unattended or remote steering · `E4-02` no collision avoidance or automatic manoeuvring · `E4-03` no certified instrument, alarm or safety service · `E4-04` no fixed total; survey and quotation required · `E4-05` charts, connectivity and installation labour excluded unless itemised · `E4-06` traffic receiver optional and receive-only · `E4-07` no NMEA 2000 or ECDIS status · `E4-08` per-subsystem acceptance | `E4-01`, `E4-02`, `E4-04` |
| `C5` | `E5-01` no hardware included · `E5-02` no installation, connectivity or data plan included · `E5-03` not the packaged offer · `E5-04` no uptime or service-level guarantee · `E5-05` no security certification · `E5-06` no guaranteed instant alert; disconnected shown as disconnected · `E5-07` not a control, dispatch or safety-management system · `E5-08` data-processing terms and tenant isolation required | `E5-01`, `E5-06`, `E5-07` |

### 3.3 Scoring rules

1. **Unaided only.** A restatement counts only if it is produced after the neutral script and the open
   prompt, without the interviewer naming the item first. An exclusion the interviewer had to suggest
   is recorded as `PROMPTED` and does **not** count toward the threshold; it is reported separately.
2. **Own words.** Repeating the script back is not comprehension. Coders score only statements that
   show the participant has grasped what the concept does *not* do; verbatim parroting of the script
   is recorded as `ECHOED` and excluded from the correct-exclusion count, with the reason logged.
3. **One code, once.** An exclusion stated repeatedly counts once per participant per concept.
4. **Wrong "exclusion" is a misconception.** A statement that sounds like an exclusion but is wrong
   (for example "it does not need a subscription") is scored as a misconception, never as a correct
   exclusion.
5. **Counts are per participant per concept.** The threshold denominators are participants scored on
   that concept, never participants in the room or statements uttered.
6. **Two independent coders** score against this fixed rubric; disagreement is resolved by discussion
   and reported; at least 25% of records are double-coded.
7. **Verbatim retention.** The explanation step and the restatement are retained verbatim under the
   recorded consent; a paraphrase by the interviewer is not evidence.
8. **No teaching.** The interviewer may not explain, correct, repeat or hint before the restatement is
   complete. A correction offered after the restatement is recorded and does not alter the score.
9. **Per concept, not per session.** A participant who understands one concept and not another produces
   one score per concept. The session-level confusion must be reported as interference (registered
   confounder), not averaged into a concept score.
10. **Below the minimum sample, no verdict.** Fewer than 5 participants in a segment means the
    registered minimum evidence is unmet; the experiment is reported `INCONCLUSIVE — insufficient
    sample`, never `PASS`.

### 3.4 Correct / partial / incorrect / misconception decision table

Every scored statement about a rubric dimension (matrix §3.1) falls into exactly one category. The
category determines whether it counts toward the threshold. The table uses generic statement forms, not
participant data.

| Category | Code | Recognised when the participant | Counted toward threshold |
| --- | --- | --- | --- |
| Correct exclusion | `CE` | states, unprompted and in their own words, that a dimension is **not** included or not guaranteed (for example charts, installation, AIS transmission, collision avoidance, connectivity, remote control, theft guarantee) | **Yes** — as one correct exclusion for that concept, up to the `>=2` requirement |
| Correct inclusion | `CI` | correctly states something the concept does include (for example that a subscription is required, or that a gateway is an installed unit) | No — recorded for composition recall, not for the exclusion threshold |
| Partial / ambiguous | `PA` | states something in the right direction but hedged or incomplete ("charts might be extra, not sure") | No — reported as partial; not a correct exclusion and not a misconception |
| Omission | `OM` | says nothing about the dimension | No — an omission is not a misconception and must not be scored as one |
| Prompted | `PR` | restates the dimension only after the interviewer named it | No — excluded from the threshold; reported separately |
| Echoed | `EC` | repeats the script wording without demonstrating understanding | No — excluded from the threshold; reported separately |
| Misconception — critical | `MC` | asserts a false inclusion, guarantee, control or availability claim from §4.1 | **Yes** — counts toward the `<=20%` / `>40%` conditions |
| Misconception — material | `MM` | asserts a wrong but non-critical detail from the material list in §4.1 | No — recorded and reported separately |
| Cannot be scored | `NS` | answer is unintelligible, refused, or the question was not administered | No — recorded as missing; never imputed |

Per participant per concept the coders therefore record: number of `CE`, presence of any `MC` (with
code), presence of any `MM`, and the `PR`/`EC` flags. The two threshold quantities are computed only
from `CE` and `MC`.

## 4. Critical misconceptions and thresholds

### 4.1 Critical misconception list

A **critical misconception** is a misunderstanding that, if it persisted into public copy, would
create a false commercial, safety, control or availability claim. Only critical misconceptions count
toward the `<=20%` / `>40%` threshold conditions. Codes are fixed before fielding.

| Code | Critical misconception | Concepts | Why it is critical |
| --- | --- | --- | --- |
| `M-01` | Believes navigation software includes nautical charts | `C1`, `C2` | Charts are licensed separately; would create a false inclusion and a licence-rights problem |
| `M-02` | Believes the software or gateway purchase includes hardware (receiver, GNSS, display, sensors) | `C1`, `C2` | Hardware is a separate object; would create a false inclusion |
| `M-03` | Believes traffic awareness transmits the owner's position (transponder) | `C1`, `C2`, `C4` | Receive-only by definition; transmission is excluded from every bundle |
| `M-04` | Believes the system prevents collisions or guarantees safety | `C1`, `C4` | No collision avoidance exists; safety-of-life guarantee is prohibited |
| `M-05` | Believes monitoring prevents theft or guarantees recovery | `C3`, `C4` | Explicitly excluded; a security guarantee would be false |
| `M-06` | Believes alerts are guaranteed, immediate or acknowledged by a human | `C3`, `C4`, `C5` | Alert delivery depends on power, coverage and provider; acceptance is not acknowledgement |
| `M-07` | Believes monitoring is a certified alarm or distress/rescue service | `C3`, `C4` | No certification exists; a distress implication is a safety claim |
| `M-08` | Believes the vessel can be steered or controlled remotely | `C4`, `C5` | Remote control is prohibited; the safety gate is blocked |
| `M-09` | Believes steering is autonomous or works unattended | `C4` | Steering is supervised at all times; autonomy is excluded |
| `M-10` | Believes installation or commissioning is included | `C1`–`C4` | Installation is quoted or offered as a separate service; would cause a false expectation |
| `M-11` | Believes charts, data or coverage are unlimited or "all regions" | `C1`, `C2`, `C4` | Coverage is licensed and bounded; "unlimited" is prohibited language |
| `M-12` | Believes connectivity or alert delivery is assured | `C1`–`C5` | Connectivity is external and variable; assurance is excluded |
| `M-13` | Believes compatibility with any boat is guaranteed | `C1`, `C2`, `C4` | No NMEA 2000 certification and no tested compatibility rows exist |
| `M-14` | Believes the software subscription includes the packaged offer or hardware | `C5` | The packaged offer is a separate object; hardware is never included |
| `M-15` | Believes the concepts are available, orderable or certified today | all | Nothing is for sale, certified or orderable; this is the availability misconception |
| `M-16` | Believes the bundled products change another product's certification or readiness | all | Bundle composition never inherits certification, compatibility or approval |

**Material, non-critical misconception list** (recorded and reported per concept, but not counted as
critical): believes the subscription cadence is monthly when annual is hypothesised or vice versa;
believes the software requires a proprietary display; believes an existing phone or tablet cannot be
used; believes monitoring needs no sensor input at all; believes the fleet platform is a consumer
tracking app; believes a monitoring kit must be installed by the owner personally; believes the
concepts are the same product under different names. These are copy-quality signals, not false claims,
and are reported separately to avoid inflating the critical-misconception rate.

### 4.2 Preregistered thresholds (quoted from the MC-09 registry)

> "PASS: >=70% of participants correctly restate at least two exclusions per concept AND <=20% hold a
> critical misconception. FAIL: >40% hold a critical misconception on any concept, which blocks any
> public copy for that concept. Between = INCONCLUSIVE, requiring copy revision and retest with a new
> sample."

Source: `docs/marea/market-validation/data/validation-experiments.json`, `EXP-MC10-06`
(`decisionThreshold`). The bands are frozen before fielding and may not be relaxed or re-worded.

| Band | Condition | Consequence |
| --- | --- | --- |
| `PASS` | `>=70%` of participants restate `>=2` exclusions for the concept **and** `<=20%` hold a critical misconception | Permits a copy drafting attempt for that concept and a later usability test; does **not** validate a claim or authorise publication |
| `FAIL` | `>40%` hold a critical misconception on the concept | **Blocks any public copy for that concept**; biases toward renaming or recomposing |
| `INCONCLUSIVE` | Neither condition met, or `FAIL` not triggered but `PASS` not met | Requires copy revision and retest with a new sample |
| `BLOCKED` | No data exists (0 participants, 0 concepts shown) | Not a finding; not `INCONCLUSIVE` |

### 4.3 Denominator conversion (derived, not collected)

The thresholds are proportions. With the registered minimum sample per segment (`n>=5`) the integer
counts below are what would be needed. The arithmetic is derived from the quoted thresholds; it is not
an observation and no count has been achieved.

| Participants scored on a concept (`n`) | `PASS` needs correct exclusions | `PASS` needs critical misconceptions at most | `FAIL` triggers at critical misconceptions |
| ---: | ---: | ---: | ---: |
| 5 | `>=4` (80%) | `<=1` (20%) | `>=3` (>40%) |
| 6 | `>=5` (83.3%) | `<=1` (16.7%) | `>=3` (50%) |
| 7 | `>=5` (71.4%) | `<=1` (14.3%) | `>=3` (42.9%) |
| 8 | `>=6` (75%) | `<=1` (12.5%) | `>=4` (50%) |

Consequences that follow, and must be reported rather than smoothed: at every registered sample size,
a single critical misconception is compatible with the PASS condition; a second one breaks PASS without
automatically reaching FAIL; the FAIL line needs 3 of 5–7 participants or 4 of 8. A concept's verdict is
therefore highly sensitive to one participant, and that instability is a registered limitation of small
`n`, not a reason to merge concepts into a combined score.

## 5. Empty results tables — no participant has seen any concept

**No participant has seen any concept.** Every table below is an empty prepared structure. Denominators
are `n=0`, so no rate exists; a blank percentage is not 0%, it is undefined.

### 5.1 Concept exposure and scoring funnel

| Stage | `SEG-01` | `SEG-02` | `SEG-03` | Total |
| --- | ---: | ---: | ---: | ---: |
| Participants who reached `Q11` | 0 | 0 | 0 | 0 |
| Concepts shown | 0 | 0 | 0 | 0 |
| Neutral scripts read verbatim | 0 | 0 | 0 | 0 |
| Unaided restatements recorded | 0 | 0 | 0 | 0 |
| Records double-coded | 0 | 0 | 0 | 0 |
| Coders independent | 0 | 0 | 0 | — |
| Verbatim transcripts retained | 0 | 0 | 0 | 0 |

### 5.2 Per-concept scores by machine reporting unit (all segments)

| Machine concept ID | Read-aloud cluster | Participants scored (`n`) | Restating `>=2` exclusions | Rate | Critical misconceptions | Rate | Verdict |
| --- | --- | ---: | ---: | --- | ---: | --- | --- |
| `NAV` | `C1` | 0 | 0 | `n=0 —` | 0 | `n=0 —` | `NOT_EXECUTED / BLOCKED` |
| `HUB` | `C2` | 0 | 0 | `n=0 —` | 0 | `n=0 —` | `NOT_EXECUTED / BLOCKED` |
| `START` | `C2` | 0 | 0 | `n=0 —` | 0 | `n=0 —` | `NOT_EXECUTED / BLOCKED` |
| `WATCH` | `C3` | 0 | 0 | `n=0 —` | 0 | `n=0 —` | `NOT_EXECUTED / BLOCKED` |
| `PROTECT` | `C3` | 0 | 0 | `n=0 —` | 0 | `n=0 —` | `NOT_EXECUTED / BLOCKED` |
| `INTEGRATED_SYSTEM` | `C4` | 0 | 0 | `n=0 —` | 0 | `n=0 —` | `NOT_EXECUTED / BLOCKED` |
| `FLEET` | `C5` | 0 | 0 | `n=0 —` | 0 | `n=0 —` | `NOT_EXECUTED / BLOCKED` |

The seven rows are the reporting units of `data/concept-comprehension.json`. A `C2` restatement
populates both the `HUB` and `START` rows, and a `C3` restatement populates both the `WATCH` and
`PROTECT` rows, so seven rows do not mean seven independent observations.

### 5.3 Misconception register (empty)

| Code | Class | Concepts | Observed count | Participants affected (`n`) |
| --- | --- | --- | ---: | --- |
| `M-01` … `M-16` | CRITICAL | see §4.1 | 0 | `n=0 —` |
| Material list | MATERIAL | see §4.1 | 0 | `n=0 —` |
| `PROMPTED` exclusions | not counted | all | 0 | `n=0 —` |
| `ECHOED` statements | not counted | all | 0 | `n=0 —` |

### 5.4 Copy-validation impact (empty)

| Item | Count |
| --- | ---: |
| Concepts cleared for a copy drafting attempt | 0 |
| Concepts whose public copy is blocked by a FAIL | 0 (no FAIL exists) |
| Public copy items validated | 0 |
| Copy revisions triggered by a finding | 0 |
| Concept renames or recompositions triggered | 0 |

### 5.5 Verdict record

| Field | Value |
| --- | --- |
| Execution status | `NOT_EXECUTED` |
| Result verdict | `BLOCKED` |
| Registered minimum evidence met | `NO` (0 of `n>=5` per segment; 0 of `>=3` concepts; 0 coders) |
| Threshold applied | not applicable — no denominator |
| Copy consequence | none; all concepts remain unvalidated and unpublished |

## 6. Discrepancy register — before any fielding

The frozen instrument version and this design are not yet the same document. The differences below
must be resolved by a **dated instrument amendment creating a new frozen version**, with independent
review, before any concept is read to a participant. They may not be papered over.

| # | Discrepancy | Instrument (frozen v1.0.0) | This design | Required resolution |
| ---: | --- | --- | --- | --- |
| 1 | Ordering of exclusions in the read-aloud script | `GUIDE-01` `Q11` concepts state the function sentence first and exclusions after | Exclusions are stated first, per the programme honesty rule | Amend `Q11` wording to exclusion-first, freeze v1.1.0, review |
| 2 | Concept set | Five concepts: A navigation and onboard data, B traffic awareness, C unattended monitoring, D steering assistance, E fleet operations | Five read-aloud clusters (`C1` NAV, `C2` HUB/START, `C3` WATCH/PROTECT, `C4` integrated systems, `C5` FLEET), reported as seven machine concept IDs | Amend the concept set and mapping; record that A≈`C1`, C≈`C3`, E≈`C5`, and that B and D become rubric elements inside `C1`/`C2`/`C4`; align the read-aloud clusters with the seven rows of `data/concept-comprehension.json` |
| 3 | Brand naming | "Read each description verbatim, with no brand and no benefits" | Brand appears only in canonical source blocks and is never read aloud | Keep brand-free scripts; the canonical quotes are researcher traceability, not participant material |
| 4 | Monitoring-specific comprehension | `Q11` concept C covers monitoring; no dedicated incident question exists for `EXP-MC10-09` | This design scores monitoring exclusions only | Separate amendment for the monitoring-incident question (see `owners/MC10-OWNER-DISCOVERY.md` §2.2 A7) |
| 5 | Language availability | ES/EN parallel; PT absent | Same | No fielding until the instrument is frozen and translation review is recorded |

Until these are resolved: `CONCEPTS_SHOWN = 0` is not a delay to be worked around, it is the correct
state.

## 7. After a test: what a finding may and may not become

These rules bind every future reading of a completed comprehension test. None applies today, because
no test exists.

1. **A misunderstood exclusion becomes a design or communication finding, not a marketing claim.**
   The corrective action is to restate, rename, recompose or remove the concept — never to write the
   exclusion out of the public copy, and never to describe the excluded capability as included.
2. **A `FAIL` blocks public copy for that concept.** It does not authorise a "clarifying" campaign, a
   softer claim, a footnote that contradicts the body, or a rename that keeps the misleading
   implication.
3. **A `PASS` permits a copy drafting attempt and a later usability test only.** It does not validate a
   claim, does not authorise publication, does not clear the brand and does not change any readiness
   status.
4. **`INCONCLUSIVE` requires copy revision and retest with a new sample.** The same sample may not be
   re-scored against a re-worded threshold.
5. **No threshold may be relaxed, split or re-scoped after fielding.** A legitimate change needs a dated
   amendment record naming the old and new thresholds and the reason, a new frozen version, and
   independent review.
6. **No misconception may be averaged away.** A critical misconception held by a minority is reported
   with its count and wording, not hidden by a favourable aggregate.
7. **Session interference is not a pass.** If participants understood the first concept but confused
   the later ones, that is a finding about the test as well as the copy, and it is reported.
8. **Prohibited transformations**, in the language of the milestone:
   - "Participants were shown the concepts, therefore the concepts are understood."
   - "The descriptions were read, therefore the copy is validated."
   - "No FAIL was recorded, therefore the copy is safe to publish."
   - "One participant restated two exclusions, therefore the concept is clear."
   - "A misconception is only wording, so the underlying claim can stay."
   - Any inference from the design of this document to a customer fact.

## 8. No public copy is validated

- No participant has seen any concept; therefore no public copy is validated, cleared or supported by
  this document.
- Internal draft copy files exist for several families and bundles. They are internal drafts; the brand
  publication status is `NOT_GRANTED`, all products and bundles are `NOT_FOR_SALE`, and nothing may be
  published, indexed or used in an offer on the strength of this design.
- The comprehension test cannot validate a claim legally, cannot certify a product, cannot establish
  availability and cannot replace legal or compliance review.
- Any future copy must still pass the brand-claims policy, the bundle/product contracts and the
  publication gates, independently of any comprehension result.

## 9. Governance and status effect

- **Scope compliance.** This document writes only within `docs/marea/customer-discovery/`. It reads the
  canonical product and bundle contracts and the MC-09 registry without modifying them.
- **No git writes** were performed by this deliverable.
- **No participant data** appears here, and no amount, currency or commercial figure appears anywhere in
  this document.
- **No commercial status change**: no claim is validated, no copy is cleared, no product or bundle is
  advanced, no commercial amount is approved, no certification is implied, nothing becomes available.
- **Amendment rule.** The concept scripts in §2 are `PREPARED — NOT FROZEN` and must be frozen as a new
  instrument version, with the §6 discrepancies resolved, before any fielding. A post-hoc change to
  thresholds or scripts is detectable by the research-integrity gate and is prohibited.

```
EXPERIMENT                 = EXP-MC10-06
EXECUTION                  = NOT_EXECUTED
CONCEPTS_DESIGNED          = 5 read-aloud clusters / 7 machine reporting IDs
CONCEPT_IDS                = NAV, HUB, START, WATCH, PROTECT, INTEGRATED_SYSTEM, FLEET
CONCEPTS_SHOWN             = 0
PARTICIPANTS               = 0
SCORED_RECORDS             = 0
CRITICAL_MISCONCEPTIONS    = 0 (none observed; nothing was shown)
PUBLIC_COPY_VALIDATED      = 0
VERDICT                    = BLOCKED
MILESTONE                  = BLOCKED
```

## 10. References and traceability

| Reference | Path | Use in this document |
| --- | --- | --- |
| Validation experiments registry (frozen) | `docs/marea/market-validation/data/validation-experiments.json` | `EXP-MC10-06` hypothesis, minimum evidence, threshold, confounders, limitations, interpretation (quoted in §1, §4.2) |
| Customer discovery plan | `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` | `GUIDE-01` `Q11` scripts A–E, honesty rule (exclusions before benefits), `NOTE-01`, `ANA-01` scoring |
| Experiment results register | `docs/marea/customer-discovery/MC10-EXPERIMENT-RESULTS.md` | `EXP-MC10-06` `BLOCKED` verdict; pointer to this document |
| Owner discovery framework | `docs/marea/customer-discovery/owners/MC10-OWNER-DISCOVERY.md` | `Q11` hand-off point, owner segments, evidence rules |
| Fieldwork authorization register | `docs/marea/customer-discovery/MC10-FIELDWORK-AUTHORIZATION.md`; `data/fieldwork-authorization.json` | `AUTH-MC10-001 = NOT_GRANTED`; pre-fieldwork gates |
| Research status | `data/research-status.json` | 0 participant and 0 comprehension counts; frozen thresholds |
| Comprehension score mirror (Lead-owned) | `data/concept-comprehension.json` | Seven machine concept IDs, all `NOT_EXECUTED`; thresholds mirrored; reporting unit for §5.2 |
| MC-10 research scope | `docs/marea/customer-discovery/MC10-RESEARCH-SCOPE.md` | Milestone scope, wave plan (`W1` includes `EXP-MC10-06`) |
| NAV contract | `docs/marea/products/MAREA-NAV-COMMERCIAL-SPEC.md` | `C1` canonical identity and exclusions |
| HUB contract | `docs/marea/products/MAREA-HUB-COMMERCIAL-SPEC.md` | `C2` canonical identity |
| START bundle contract | `docs/marea/bundles/MAREA-START-COMMERCIAL-SPEC.md` | `C2` bundle exclusions |
| WATCH contract | `docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` | `C3` canonical identity and "WATCH is not" boundaries |
| PROTECT bundle contract | `docs/marea/bundles/MAREA-PROTECT-COMMERCIAL-SPEC.md` | `C3` bundle exclusions |
| COMPLETE bundle contract | `docs/marea/bundles/MAREA-COMPLETE-COMMERCIAL-SPEC.md` | `C4` identity, outcome, exclusions |
| FLEET contract | `docs/marea/products/MAREA-FLEET-COMMERCIAL-SPEC.md` | `C5` identity, "what FLEET is not", SaaS-versus-package boundary |
| Bundle computation and exclusions | `docs/marea/bundles/BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` | Master exclusion list; inclusion vocabulary |
| Bundle comparison | `docs/marea/bundles/BUNDLE-CUSTOMER-COMPARISON.md` | Exclusion classes, subscription and installation boundaries |
| Governance status | `docs/marea/market-validation/data/governance-status.json` | `NOT_FOR_SALE`, `brandPublication = NOT_GRANTED`, no certification claims |

**Status statement.** This is a test design for a blocked milestone. No participant has seen any
concept; no comprehension score, misconception count or copy validation exists. The descriptions,
rubric, misconception list and thresholds are prepared and unfrozen. Every empty table in this
document is an absence of data, never a finding, and no result may be inferred from the design itself.
