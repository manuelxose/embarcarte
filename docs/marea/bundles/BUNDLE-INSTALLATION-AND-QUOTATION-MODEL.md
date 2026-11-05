# EMBARCARTE / MAREA — Bundle installation and quotation model (MC-08 / D12)

| Field | Value |
| --- | --- |
| Document ID | MC-08 / D12-BUNDLE-INSTALLATION-AND-QUOTATION-MODEL |
| Milestone | MC-08 (Master Prompt 08/36) — commercial bundles, ecosystem compatibility and product packaging |
| Deliverable | D12 — installation and quotation model for the six bundles |
| Owner | Sail and Helm Integration Specialist (MC-08 run) |
| Status | INTERNAL · NOT PUBLISHED · NOT FOR SALE · MODEL ONLY — NOT A CONTRACT, NOT A WARRANTY, NOT A QUOTATION |
| Base commit | `80c66c70a1bab6f11c5ba5709baa4c1671f1d6da` (MC-07 HEAD) |
| Branch | `feature/marea-mc08-bundles-commercial-architecture` |
| Date | 2026-10-30 |
| Write scope | `docs/marea/bundles/BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` only |
| Applies to | MAREA START (`START`), MAREA CRUISE (`CRUISE`), MAREA SAIL (`SAIL`), MAREA PROTECT (`PROTECT`), MAREA COMPLETE (`COMPLETE`), MAREA FLEET package (`FLEET`) |
| Governing contract | `docs/marea/products/README.md` §1–§8, §12–§32; `docs/marea/COMMERCIAL-PORTFOLIO.md`; `docs/marea/execution/DECISION-LOG.md` D-008, D-009, D-010, D-014; `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §5–§6 |
| Is not | Not an installation instruction, not an operator manual, not a contract, not a quotation, not a price list, not a warranty, not an offer of service, not an availability statement |

**Two statements govern this entire document and must be reproduced wherever it is summarised.**

1. **No nationwide installer network exists.** There is no installer agreement, no authorised-partner register,
   no rate card, no territory allocation, no service-level agreement and no measured installation history in
   this programme. An installation partner is `UNKNOWN` until a written agreement exists, and no page,
   quotation or support reply may imply otherwise.
2. **Nothing in this document creates a legally binding warranty, contract, quotation, price, order or
   obligation.** It is an internal model of how installation and quotation would work *if* the products, the
   partner network and the legal terms existed. Every payment milestone, warranty allocation, RMA process and
   support role below is a **proposal** or an `OPEN` requirement, not a commitment, and no customer may be
   promised any of it.

## 1. Purpose and status

The six bundles differ enormously in how they are delivered. A NAV subscription is fulfilled by software; a
SENSE module may be a straightforward hardware delivery; a HELM installation may need a survey, a quoted
steering scope, mechanical work, commissioning, sea trials and training. Without one model, each future page
would invent its own fulfilment story, and the programme would produce exactly the commercial misstatement it
is designed to prevent: a fixed price attached to work whose scope is unknown.

This document therefore:

1. defines **five sales-fulfilment routes** and states which are applicable to which bundle;
2. defines **qualification requirements** — what must be true before a configuration may be quoted or
   scheduled;
3. separates **quotation from contract** and states what neither may contain;
4. defines **installation work content**, **training**, a **payment-milestone proposal**, **warranty
   ownership**, **returns/RMA**, **technical support**, **partner responsibilities**, the **vessel and
   steering survey**, the **refusal/escalation boundary** and **handover contents**;
5. records, per item, its true status: `OPEN`, `BLOCKED` or `NOT_ESTABLISHED`.

Nothing here is approved policy, and no part of it may be published as customer-facing terms.

## 2. The five sales-fulfilment routes

The routes are cumulative in rigour: each removes a freedom the previous one allowed. A bundle must be
delivered on the **least permissive route its worst component requires** — a bundle containing a surveyed
steering installation cannot be delivered software-led just because most of its content is software.

### SFR-1 — Software-led fulfilment
- **Definition.** The customer purchases an entitlement, receives account access and completes onboarding
  without physical installation. No hardware is shipped and no vessel work is performed by EMBARCARTE.
- **Applies to.** `NAV` entitlements, `WEATHER` entitlements, `FLEET` SaaS tenancy, and the software portion
  of any bundle. In bundle terms it is the delivery mechanism for `START` (NAV part), `SAIL` and `COMPLETE`
  (NAV/WEATHER part) and `PROTECT` (subscription part), never for the whole of those bundles.
- **What may be quoted.** The subscription term and the edition, with charts, data and hardware explicitly
  excluded.
- **Prohibited.** Presenting installation as included; presenting a chart licence as included; implying that
  software delivery validates any hardware or steering component.
- **Status.** `OPEN` — no approved price list, no checkout and no published terms.

### SFR-2 — Hardware with self-install (future verified envelope only)
- **Definition.** The customer receives hardware and installs it themselves, within a **published,
  verified self-install envelope**: a named product, named mounting conditions, named cable and power
  requirements, named verification steps and a named exclusion list. Outside that envelope, self-install is
  not permitted.
- **Applies to.** A *future* possibility for the simplest `SENSE` modules and the simplest `WATCH` mounting,
  and no more. It does **not** apply today to any product: no self-install envelope has been validated for any
  module (`P-05`, `H-05`), and it may never apply to `PILOT`, to any steering-adjacent component, to tank
  penetration or to distribution-system work.
- **What may be quoted.** Hardware only, with installation explicitly excluded and the self-install envelope
  reference named.
- **Prohibited.** Offering self-install as a way to avoid a survey; allowing a self-installed device to be
  presented as commissioned; allowing self-install of anything that touches steering, motor power, tanks or
  the E-stop path.
- **Status.** `BLOCKED` — the envelope does not exist. For `SAIL` and `COMPLETE` this route is permanently
  inapplicable.

### SFR-3 — Installer-assisted
- **Definition.** A qualified installer performs the physical and configuration work while the customer keeps
  commercial responsibility; EMBARCARTE supplies hardware and product support. The work is described by a
  written scope but not by a survey-led engineering package.
- **Applies to.** `START` (HUB installation and NAV configuration), `CRUISE` (HUB, AIS and DISPLAY
  installation), and the module installation portions of `PROTECT`.
- **What may be quoted.** Itemised hardware, cables/accessories, labour and commissioning, each line explicit.
- **Prohibited.** Installing a `PILOT` under this route; claiming that assisted installation proves
  compatibility; presenting the installer as a certified technician (no certification scheme exists).
- **Status.** `BLOCKED` — no installer network, no rate card, no agreements (`X-05`, `X-06`).

### SFR-4 — Professional installation (survey, commissioning, training, handover)
- **Definition.** A competent professional performs a documented survey, prepares an itemised quotation,
  installs mechanical and electrical work, commissions each subsystem, conducts supervised sea trials where a
  steering system is involved, trains the owner and signs a handover record. EMBARCARTE owns product
  definition and compatibility authority; the installer owns the workmanship of the installation.
- **Applies to.** `SAIL` and `COMPLETE` as the **mandatory** route (both contain a surveyed steering
  installation), and `CRUISE` where display mounting, network work or vessel condition demands it.
- **What may be quoted.** A complete itemised quotation after survey, with inclusions, exclusions, labour,
  commissioning, sea trials, training, conformity work and warranty position named.
- **Prohibited.** A fixed bundle price; a quotation without a survey; installation of a steering system
  without the PILOT safety gate closed; any statement that the installation is "turnkey"; any promise of a
  completion date before scope is measured.
- **Status.** `BLOCKED` — no partner network, no validated survey method, no commissioning record, PILOT
  safety gate `BLOCKED` (`H-01`, `P-04`), no conformity assessment (`H-06`, `H-13`).

### SFR-5 — B2B contracted solution
- **Definition.** A written agreement between EMBARCARTE and a professional organization (charter operator,
  sailing school, marina, boat manager, refit yard) covering configuration, installation, onboarding, support
  and, where applicable, multiple vessels. This is the only route on which a professional customer's
  multi-vessel commitment could ever be accepted.
- **Applies to.** The `FLEET` package, multi-vessel `COMPLETE` configurations, and fleet-scale `PROTECT`
  monitoring. Never to a consumer purchase, and never to a PILOT steering commitment before the safety gate
  closes.
- **What may be quoted.** A contracted scope with named vessels, named responsibilities, named deliverables
  and named exclusions — only once terms exist.
- **Prohibited.** Inventing an SLA, a volume discount, an uptime guarantee, a support level or a customer
  reference; treating a proposal or a letter of intent as a contract.
- **Status.** `BLOCKED` — no contracted terms, no tenancy/SLA evidence, `NO_SLA_ESTABLISHED`
  (`FLEET-ENTERPRISE = NOT_ESTABLISHED`).

### 2.1 Route selection rule

| Question | Consequence |
| --- | --- |
| Does the bundle contain `PILOT` in any form? | Route is **SFR-4** only; `SFR-2` and `SFR-3` are prohibited. |
| Does the bundle require vessel-specific mechanical or electrical work? | Route is at least **SFR-3**; `SFR-2` prohibited. |
| Does the bundle include a survey or a steering assessment? | Route is **SFR-4**; quotation only after survey. |
| Is the buyer an organization contracting for vessels? | Route is **SFR-5** and a written contract is required before any commitment. |
| Is the bundle purely software or a service entitlement? | Route is **SFR-1**. |
| Is only a verified simple module involved and a published self-install envelope exists? | Route may be **SFR-2** — this condition is false for every product today. |

## 3. Route applicability matrix — all six bundles

`P` = primary route, `S` = secondary/partial route, `—` = not applicable, `X` = prohibited, `B` = blocked
today for an external reason stated in §1.

| Bundle | SFR-1 software-led | SFR-2 self-install | SFR-3 installer-assisted | SFR-4 professional installation | SFR-5 B2B contracted | Mandatory route today | Effective status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `START` (NAV + compatible HUB) | P (NAV part) | — | P (HUB installation) | S (vessel condition) | S (multi-vessel) | SFR-3 unless the customer has no HUB work, in which case SFR-1 only | `B` — no HUB hardware, no installer network |
| `CRUISE` (NAV + HUB + receive-only AIS + DISPLAY) | P (NAV part) | — | P (HUB/AIS/DISPLAY) | S (network, mounting, vessel condition) | S (multi-vessel) | SFR-3 with SFR-4 escalation | `B` — HUB, AIS and DISPLAY hardware absent; no installer network |
| `SAIL` (NAV + HUB + PILOT + wind) | P (NAV part) | X | X | P (survey + steering + commissioning + sea trials) | S (multi-vessel/partner) | **SFR-4 only** | `B` — PILOT safety gate `BLOCKED`; no survey method; no installer network |
| `PROTECT` (WATCH + essential SENSE) | P (subscription part) | S (future verified envelope only) | P (module and WATCH installation) | S (tank/distribution work) | S (multi-vessel) | SFR-3 | `B` — WATCH service `NOT_FOUND`; no measured accuracy; no installer network |
| `COMPLETE` (nine-object coordinated integration) | P (NAV/WEATHER parts) | X | S (module portions only) | P (survey, steering, display, commissioning, sea trials, training) | S (professional operators) | **SFR-4 only** | `B` — PILOT safety gate, DISPLAY hardware, WATCH service, HUB hardware, SENSE measurement, no installer network |
| `FLEET` package (FLEET SaaS + onboarding + optionally hardware and communications) | P (SaaS tenancy) | — | S (device installation) | S (vessel integration, where hardware is included) | P (written contract) | SFR-5 for the package; SFR-1 for the SaaS subscription alone | `B` — `FLEET-ENTERPRISE` `NOT_ESTABLISHED`; no onboarding scope or pricing; no contracted terms; `NO_SLA_ESTABLISHED` |

Notes that the matrix cannot express and that must always accompany it:

- **A bundle may not be delivered on a route that is weaker than its worst component.** `SAIL` and `COMPLETE`
  are professional-installation bundles; their software content does not make them software-led.
- **`PROTECT` may not be delivered self-install today**, and no self-install envelope exists for tank
  penetration or DC distribution work at all.
- **`FLEET` package ≠ `FLEET` SaaS product.** The SaaS subscription is SFR-1 and includes no hardware,
  installation, connectivity or onboarding scope; the package is SFR-5 and does not exist as a contracted
  offer.
- **No route currently produces a deliverable bundle.** Every route is `B` for an external reason, and the
  matrix is a specification of intent, not a service description.

## 4. Qualification requirements

Before a bundle configuration may be quoted (and never instead of a quote as a way of appearing helpful), all
of the following must be recorded in writing by the qualified function:

| # | Requirement | Route(s) | Status |
| ---: | --- | --- | --- |
| Q1 | Customer identity, vessel identity and intended cruising area | all | `OPEN` — no qualification record exists |
| Q2 | Product and edition identification against the published bundle composition | all | `OPEN` — bundle definitions exist; no customer configuration has been qualified |
| Q3 | Compatibility questionnaire completed, with devices, models and firmware versions | SFR-3, SFR-4, SFR-5 | `OPEN` — no questionnaire in production |
| Q4 | Documented vessel survey, including steering for `SAIL`/`COMPLETE` and full compatibility survey for `COMPLETE` | SFR-4; SFR-3 where vessel work is involved | `BLOCKED` — no validated survey method, no surveyor network (`X-06`) |
| Q5 | Electrical assessment: supply, protection, isolation, cable routes | SFR-3, SFR-4 | `OPEN` |
| Q6 | Installation site and access feasibility (masthead, tank, helm, display position, berth) | SFR-3, SFR-4 | `OPEN` |
| Q7 | Owner acceptance of supervised use, limitations and per-subsystem acceptance where applicable | SFR-4; SFR-5 | `OPEN` — no acceptance form exists |
| Q8 | Installer competence and authorisation for the specific scope | SFR-3, SFR-4, SFR-5 | `BLOCKED` — no partner register, no competence criteria, no agreements |
| Q9 | Payment capability and milestone agreement (proposal only, §8) | all | `OPEN` — no terms exist |
| Q10 | Data-protection basis for any customer data involved (position, vessel, monitoring) | all | `OPEN` — DPIA and consent materials do not exist (`X-07`) |
| Q11 | Regulatory check for the intended installation territory | SFR-4, SFR-5 | `OPEN` — no conformity evidence exists (`H-06`, `H-13`) |
| Q12 | Recorded refusal decision where any of Q1–Q11 cannot be satisfied | all | `OPEN` — no refusal register exists |

Qualification is **not** a sale. A qualified configuration is not a quotation, a reservation, an order, a
delivery commitment or an approval, and no customer may be told that it is.

## 5. Quotation versus contract

### 5.1 What a quotation is

A quotation is an **itemised, dated, vessel-specific commercial document** prepared after a survey and after
qualification. Per D-009 it must enumerate:

- the vessel and the surveyed configuration;
- every included item: equipment, cabling, power protection, E-stop assembly, mechanical interfaces, sensors,
  display, gateway, monitoring hardware, adapters;
- every included service: survey, design, installation labour, commissioning, supervised sea trials, owner
  training, conformity work, documentation;
- every exclusion, explicitly: charts, NAV/WEATHER entitlements beyond the quoted term, connectivity/SIM,
  AIS receiver and antenna, structural work, spares, territory restrictions, anything not listed;
- the subscription position (what renews, what expires, what remains exportable);
- the warranty position (which is not established, `X-02`);
- the validity period of the quotation;
- the price status of every line (established, hypothesis, quotation-derived) — never a hypothesis presented
  as an approved price.

### 5.2 What a quotation is not

A quotation is **not** a contract, an order, a reservation, a delivery promise, a warranty, a certification or
a compatibility guarantee. It creates no obligation on either side until written terms exist and are signed
by both parties. A quotation is never a bundle price, never a "from" price, and never a substitute for the
qualification of §4.

### 5.3 What a contract would require (and does not exist)

A contract would need, at minimum: party legal identities, scope schedule, price schedule, payment schedule,
delivery and installation schedule, acceptance procedure, warranty allocation, liability allocation, data
processing terms, cancellation terms, dispute resolution and governing law. **None of these exists.** No
template, no terms, no insurance position and no legal review are in place. The programme therefore records
`CONTRACT = NOT_ESTABLISHED` and prohibits any statement that a bundle can be contracted.

### 5.4 Hypothesis prices and the quotation boundary

No hypothesis may be quoted as an approved or final figure. `from EUR 1,290` for `PILOT-COASTAL`, EUR 349/499
for HUB, EUR 99/149 for NAV, EUR 249 for the AIS receiver, from EUR 699 for DISPLAY, EUR 299 + from EUR 9.90
for WATCH, from EUR 49/89 for WEATHER, 49/79 per vessel/month for FLEET and the bundle figures EUR 1,990 and
EUR 3,490 are all `HYPOTHESIS_UNAPPROVED`. A quotation may reference them only as internal planning inputs,
never as line prices, and must never sum them into an installed total.

## 6. Installation work content

The content below is the intended work, not an instruction and not a measured scope. No duration, hour
figure, lead time or price exists for any line.

| Work package | Content | Applies to | Status |
| --- | --- | --- | --- |
| Software onboarding | Account, edition activation, chart coverage check, device positioning, degraded-state checks | SFR-1 | `OPEN` |
| Gateway installation | HUB mounting, power, network, supported device connections, local interface verification | `START`, `CRUISE`, `SAIL`, `COMPLETE` | `BLOCKED` — no HUB hardware or tested matrix (`H-04`, `H-05`, `H-07`) |
| AIS installation | Receiver, antenna/splitter, cabling, receive-only output verification | `CRUISE` and optional `COMPLETE` | `BLOCKED` — receiver hardware (`H-08`, `P-03`) |
| Display installation | Mounting, power, cable route, viewing position, brightness/day-night check (no measured performance claim) | `CRUISE`, `COMPLETE` | `BLOCKED` — display hardware not selected (`H-11`, `P-07`) |
| Sensor installation | Module mounting, cable routes, calibration, local indication verification | `PROTECT`, `COMPLETE` | `BLOCKED` — no sensor hardware or calibration evidence (`P-05`, `H-05`) |
| Tank/sender installation | Compatibility check, calibration curve, leak-path review | `PROTECT`, `COMPLETE` | `BLOCKED` — no sender list, no evidence |
| Monitoring installation | WATCH mounting, power, device registration, consent, alert configuration | `PROTECT`, `COMPLETE` | `BLOCKED` — WATCH service `NOT_FOUND` (`P-06`, `X-07`) |
| Steering mechanical work | Drive/actuator mounting, feedback linkage, brackets, interfaces | `SAIL`, `COMPLETE` | `BLOCKED` — no drive selection, no survey method (`H-01`, `H-03`, `H-05`) |
| Steering electrical work | Power protection, harness, independent motor-power isolation, physical E-stop | `SAIL`, `COMPLETE` | `BLOCKED` — `PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND`, `PILOT_MOTOR_ISOLATION_EVIDENCE = NOT_FOUND` (`H-03`, `H-10`) |
| Commissioning | Per-subsystem dockside validation, control-head and alarm checks, degraded-state checks, written record | `SAIL`, `COMPLETE`, `CRUISE`, `PROTECT` | `OPEN` — no commissioning procedure or record; `PILOT_SEA_TRIALS = NOT_PERFORMED` |
| Supervised sea trials | Recorded, mode-by-mode, on representative vessels | `SAIL`, `COMPLETE` | `BLOCKED` — `P-04` |
| Conformity work | Assessment against applicable EU acts and marine standards | all hardware | `BLOCKED` — `H-06`, `H-13`; `compliance = NOT_STARTED` |

## 7. Training

| Training object | Content | Applies to | Status |
| --- | --- | --- | --- |
| Navigation onboarding | Account, charts, routes, logbook, degraded states, export | `START`, `CRUISE`, `SAIL`, `COMPLETE` | `OPEN` |
| Data-gateway orientation | What the local interface shows, what it does not, how to verify freshness | `START`, `CRUISE`, `SAIL`, `COMPLETE` | `OPEN` |
| Display orientation | Views, day/night, alarms, what is read-only | `CRUISE`, `COMPLETE` | `OPEN` |
| Monitoring orientation | Alerts, state model, what "queued/accepted/delivered" means, limitations of coverage | `PROTECT`, `COMPLETE` | `OPEN` |
| Supervised steering training | Heading hold, wind mode where verified, manual takeover drill, physical E-stop drill, failure behaviour | `SAIL`, `COMPLETE` | `BLOCKED` — no hardware, no procedure, no sea trials |
| Fleet administration training | Roles, permissions, audit, export/deletion, read-only telemetry boundary | `FLEET` package | `BLOCKED` — no tenancy, no onboarding scope |

Training is quoted work, not a free inclusion, unless a future approved scope explicitly includes it. No
training material, competence record or "certified operator" scheme exists, and no training may be described
as certification.

## 8. Payment milestone model — a proposal, not a contract

This is a **proposed sequence of triggers** for a future quotation. It contains no amounts, no percentages, no
due dates and no terms, because none exist. It creates no entitlement, no reservation, no delivery promise and
no binding obligation. A project may reorder, merge or omit milestones only if written terms exist — and they
do not.

| Milestone | Trigger | What it would release (proposal) | Status |
| --- | --- | --- | --- |
| M0 — Survey and qualification | Signed survey authorisation and scheduled vessel access | The survey and the qualification record | `OPEN` |
| M1 — Quotation acceptance | Customer's written acceptance of an itemised quotation | Scope freeze and procurement authorisation | `OPEN` |
| M2 — Procurement | Equipment ordered against the accepted quotation | Hardware allocation and dispatch planning | `OPEN` |
| M3 — Installation start | Vessel access, equipment on site, work-risk assessment accepted | Mechanical and electrical work | `OPEN` |
| M4 — Commissioning complete | Per-subsystem commissioning records signed | Training and sea-trial scheduling | `OPEN` |
| M5 — Sea trial (steering bundles) | Supervised trials completed and recorded | Mode-specific acceptance discussion | `BLOCKED` — `P-04` |
| M6 — Handover and acceptance | Signed handover record and customer acceptance per subsystem | Support relationship start | `OPEN` |
| M7 — Retainage / post-handover review | A future contractual construct | Nothing until terms exist | `NOT_ESTABLISHED` |

Rules that would bind any future milestone schedule:

- No milestone is payable against a hypothesis price; only against an accepted itemised quotation.
- A payment never converts a hypothesis into an approved price, a quotation into a contract, or an
  installation into a warranty.
- A milestone reached does not create legal acceptance of a subsystem whose evidence gate is open; the
  per-subsystem acceptance of the bundle specifications governs.
- No deposit, prepayment, financing or credit term exists and none may be offered.
- A customer refusal of a survey outcome ends the process without obligation beyond work actually performed
  under written terms — which do not exist.

## 9. Warranty ownership (not established)

| Warranty object | Proposed owner | Reality today |
| --- | --- | --- |
| Product conformity and product defect | EMBARCARTE as seller, once terms exist | `NOT_ESTABLISHED` — no written warranty terms, no legal seller identity (`X-02`); no declaration of conformity (`H-06`) |
| Installation workmanship | The installation partner, under a partner agreement | `NOT_ESTABLISHED` — no partner agreement, no partner register, no rate card |
| Consumer statutory guarantees | Applicable law once a sale occurs | Not triggered — nothing is sold; no legal review exists |
| Steering-system safety outcome | Shared design boundary + installer + operator responsibility | `BLOCKED` — PILOT safety case not signed; no human signatory; no sea trials |
| Subscription service continuity | EMBARCARTE as service provider | `NOT_ESTABLISHED` — `WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`; no service terms |
| Data-handling obligations | EMBARCARTE as controller/processor per flow | `OPEN` — DPIA, consent and retention terms do not exist (`X-07`) |
| Extended warranty or maintenance plan | Separate quoted service | `NOT_ESTABLISHED` — no scope, no price, no terms |

The allocation above is a proposal for legal review. It creates no warranty, extends no warranty, and may not
be quoted to a customer. **No warranty length, coverage, response time or remedy may be stated anywhere until
written terms and a legal seller identity exist.**

## 10. Returns and RMA (not established)

A returns/RMA framework is required before any hardware can be sold. The proposal below is a list of
requirements, not a policy.

| Requirement | Proposal | Status |
| --- | --- | --- |
| Return authorisation | A recorded RMA reference issued before any return is accepted; no return without one | `NOT_ESTABLISHED` |
| Dead-on-arrival handling | Verification procedure, replacement path, freight responsibility | `NOT_ESTABLISHED` |
| Consumer withdrawal rights | Statutory framework applied where applicable, with a documented process | `OPEN` — requires legal review |
| Fault diagnosis | Installer first-line diagnosis, programme second-line, recorded findings | `OPEN` |
| Warranty vs non-warranty determination | Evidence-based decision per case, documented | `NOT_ESTABLISHED` |
| Repair, replace, refund | Decision rule and remedy hierarchy | `NOT_ESTABLISHED` |
| Installed-device returns | Removal/reinstallation labour responsibility for an installed unit | `NOT_ESTABLISHED` |
| Refurbishment and resale | Refurbishment standard and disclosure | `NOT_ESTABLISHED` |
| Serial/asset traceability | Serial register linking device, vessel, installation record | `NOT_ESTABLISHED` — no serials exist |
| Return-rate monitoring | Measurement per product family | `NOT_ESTABLISHED` — no products sold |

No RMA process, address, threshold, restocking position, freight rule or refund policy exists. No customer may
be told that a return, replacement or refund will be accepted, and no "30-day" or similar period may be
invented.

## 11. Technical support (not contracted)

| Support tier | Proposed responsibility | Reality today |
| --- | --- | --- |
| Tier 0 — self-service | Published documentation, compatibility matrix, limitations | Documents are internal; compatibility has zero `SUPPORTED` rows |
| Tier 1 — installer | On-site diagnosis, installation questions, first-line warranty intake | No partner network, no agreements, no competence scheme |
| Tier 2 — EMBARCARTE product support | Product questions, firmware/software issues, escalation | No support contract, no staffing evidence, no response target |
| Tier 3 — engineering | Defect investigation, safety escalation | No engineering support process; safety escalation route undefined |
| Safety escalation | Immediate stop-use guidance and recorded incident | `BLOCKED` — no incident procedure, no safety signatory |

There is no support contract, no service level, no response time, no hours-of-operation, no support portal, no
ticketing system and no "certified technician" scheme. Any support claim in customer copy must be limited to
the intention to publish a support policy with the product, and the approved-claims rules prohibit stating a
response time or a warranty length.

## 12. Professional partner responsibilities

A partner, if one existed, would be responsible for:

1. **Qualification and honesty.** Completing the compatibility questionnaire and survey truthfully, refusing
   a configuration that cannot be assessed, and never quoting a hypothesis as an approved price.
2. **Survey and scope.** Producing the documented survey and the itemised quotation with explicit inclusions
   and exclusions.
3. **Installation.** Installing to the published product requirements, respecting power protection, isolation,
   E-stop and mechanical boundaries, and stopping work where the vessel is unsafe.
4. **Commissioning and records.** Commissioning each subsystem, completing the commissioning records, and
   recording what was verified and what was not.
5. **Sea trials and training.** Conducting supervised, recorded trials where a steering system is involved and
   training the owner in supervised use, manual takeover and E-stop.
6. **Handover.** Delivering the handover contents of §15 and obtaining the customer's per-subsystem acceptance.
7. **First-line support and warranty intake.** Diarising the support route, diagnosing first-line faults and
   escalating safety-relevant incidents immediately.
8. **Data handling.** Respecting consent, minimising data collected, and never transferring customer data
   outside the agreed basis.
9. **Claim discipline.** Making no compatibility, certification, performance, accuracy, autonomy or safety
   claim beyond the published material, and never presenting a survey, a quotation or an installation as an
   approval.
10. **Record keeping.** Retaining survey, quotation, installation, commissioning, trial and handover records
    for the period a future contract would define.

No partner is authorised, registered, insured, trained or contracted today, and no partner may use the MAREA
brand while `brandPublication = NOT_GRANTED`.

## 13. Vessel and steering survey requirements for `SAIL` and `COMPLETE`

The steering survey is the safety and price basis of both bundles. It is `VESSEL_SURVEY_REQUIRED` and currently
`BLOCKED` because no survey method has been validated on a real vessel and no surveyor network exists.

### 13.1 Steering survey (SAIL and the steering item of COMPLETE)

| # | Required record | Why it is required | Status |
| ---: | --- | --- | --- |
| V1 | Vessel particulars: type, length, displacement class, hull material, year, cruising area, mooring | Establishes the applicable envelope | `OPEN` |
| V2 | Steering type: tiller, wheel, mechanical, hydraulic, mixed; make and model; condition | Determines drive/actuator eligibility | `OPEN` |
| V3 | Manual release and mechanical override: presence and function | Mandatory safety boundary | `OPEN` |
| V4 | Steering travel, stops and existing feedback | Needed for feedback selection and limits | `OPEN` |
| V5 | Number and location of helm stations | Determines control-head scope | `OPEN` |
| V6 | Drive/actuator eligibility decision against the drive envelope | Prevents an unbuildable configuration | `BLOCKED` (`H-01`, `H-03`, `H-05`) |
| V7 | Rudder/steering position feedback feasibility | `PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND` | `BLOCKED` (`H-01`) |
| V8 | Electrical: battery bank, distribution, protection, charging, motor-power isolation feasibility | Prevents unsafe power architecture | `BLOCKED` (`H-03`, `H-10`) |
| V9 | Physical E-stop location, feasibility and wiring route | Safety boundary, not a feature | `BLOCKED` (`H-10`) |
| V10 | Cable routes, gauges, connectors and environment at each run | Labour and reliability | `OPEN` |
| V11 | Wind source mounting (masthead or alternative), cable route, access, calibration feasibility | `SENSE-WIND` installation | `OPEN` |
| V12 | Existing equipment to be retained and conflicts (autopilot, instruments, network) | Avoids duplication and unsafe interaction | `OPEN` |
| V13 | Steering defect or unsafe condition observed | Refusal trigger | `OPEN` |
| V14 | Written eligibility decision, signed, with inclusions and exclusions | The basis of the quotation | `OPEN` |

### 13.2 Full compatibility survey (COMPLETE)

In addition to §13.1, `COMPLETE` requires: instrument and navigation sources with make, model and firmware;
display mounting, power and viewing position; HUB location, power and network; every SENSE mounting point,
tank access and sender compatibility; monitoring device location, power and coverage at the berth; existing
network and adapters; data-handling consent; and the per-subsystem feasibility statement. A `COMPLETE`
configuration with any subsystem unsurveyed is not qualified and may not be quoted.

### 13.3 Survey output and its limits

The survey output is an internal document and the basis for a quotation. It is not a certificate, not a
compatibility guarantee, not a safety approval and not a certification of the vessel. It records what was
observed, what could not be observed, and what is excluded. Where a survey cannot be completed, the
configuration is refused under §14.

## 14. Refusal and escalation boundary

### 14.1 Refusal triggers

A configuration must be refused — not partially quoted — when any of the following is true:

1. The vessel or steering system cannot be surveyed, or the survey reveals an unsafe steering condition.
2. The steering system has no manual release or cannot be mechanically overridden.
3. Drive/actuator eligibility, rudder feedback, E-stop feasibility or motor-power isolation cannot be
   established.
4. The customer requires unattended, autonomous or remote helm control, or requires the steering system to be
   sold at a fixed inclusive price.
5. The customer requires a fixed all-inclusive bundle price for `SAIL` or `COMPLETE`, or requires a completion
   date before scope is measured.
6. The installation would exceed the competence or authorisation of the available installer.
7. Any included product gate is open and the customer requires a delivery commitment before it closes.
8. The customer intends to represent the configuration as certified, type-approved, turnkey or suitable for
   every sailboat.
9. The data-protection basis for monitoring or position data cannot be established.
10. The required installation territory has a regulatory condition that cannot be satisfied.

A refusal records: date, vessel, customer, the trigger, what was observed, who decided, and the escalation
route. A refusal is never converted into a discount, a partial sale of the steering item, a "provisional"
quotation or a promise to revisit after payment.

### 14.2 Escalation route

| Level | Owner | Responsibility |
| --- | --- | --- |
| 1 | Surveyor / installer | Detect the condition, stop the process, record it, inform the customer without promising an outcome |
| 2 | Installation partner principal | Confirm the technical assessment and the refusal or a permitted alternative scope |
| 3 | EMBARCARTE product and safety functions | Decide whether an alternative configuration is permissible; safety function may veto any configuration |
| 4 | Programme governance | Record the decision, update the bundle definition or the compatibility matrix if a new fact emerged; no individual may authorise a claim beyond the published material |

No escalation level may approve remote steering, autonomy, a fixed PILOT price, or a claim that contradicts
the approved disclaimers.

## 15. Handover contents

A handover is the point at which responsibility for operation passes to the customer. It does not close an
open evidence gate, and it must not be used to imply that a subsystem was validated when it was not.

| # | Handover item | Content | Status |
| ---: | --- | --- | --- |
| H1 | Signed handover record | Vessel, configuration, editions, dates, parties, per-subsystem acceptance statements | `OPEN` — no record exists |
| H2 | Survey and quotation archive | Survey report, eligibility decision, accepted quotation with inclusions and exclusions | `OPEN` |
| H3 | Installation record | What was installed, where, serials (when they exist), cable and power details | `NOT_ESTABLISHED` — no serial register |
| H4 | Commissioning record | Per-subsystem checks, results, what was not verified | `OPEN` |
| H5 | Sea-trial record | Where a steering system is involved: modes tested, conditions, outcomes, limitations | `BLOCKED` — `PILOT_SEA_TRIALS = NOT_PERFORMED` |
| H6 | Training completion record | Modules delivered, attendee, supervised-use and E-stop drills | `OPEN` |
| H7 | Documentation set | Product documentation, limitations, disclaimers, support route | `OPEN` — documents are internal drafts |
| H8 | Account and entitlement state | NAV entitlement, WATCH subscription, chart licences, what renews and what expires | `OPEN` |
| H9 | Support and warranty position | Who to contact, what is covered and — explicitly — what is not established | `NOT_ESTABLISHED` (`X-02`) |
| H10 | Limitations statement | Per-subsystem limitations, disclaimers and known unknowns, signed by the customer | `OPEN` |
| H11 | Escalation and safety record | How to report a safety-relevant defect and what to do meanwhile | `BLOCKED` — no incident procedure |

## 16. Explicit limits of this model

- **No nationwide installer network exists**, and none is implied, planned with named partners, or resourced.
- **No partner agreement, rate card, territory allocation, service level or insurance position exists.**
- **No contract, quotation, warranty, return policy, support level, response time or payment term exists.**
- **No installation has ever been performed for these bundles**, and no measured labour, duration or cost
  exists.
- **No pricing is approved.** Every figure mentioned in this document or in the bundle specifications is a
  `HYPOTHESIS_UNAPPROVED` or `NOT_ESTABLISHED`.
- **No product is for sale.** All nine families are `DEFINED`, `NOT_FOR_SALE` and `INTERNAL_ONLY`; the six
  bundles are `BLOCKED`; `brandPublication = NOT_GRANTED`; `SOURCE_IP_CLEARANCE = NOT_CLEARED`.
- **Nothing in this document may be published as customer terms**, and no customer may be told that a
  quotation, contract, warranty or installation is available.

---

**Document status:** INTERNAL — NOT PUBLISHED — NOT FOR SALE — MODEL ONLY. This document is a proposal for
how installation and quotation would work if the products, partner network and legal terms existed. It is not
a contract, not a warranty, not a quotation, not a service commitment and not an offer, and no statement in it
is binding on EMBARCARTE or on any third party.
