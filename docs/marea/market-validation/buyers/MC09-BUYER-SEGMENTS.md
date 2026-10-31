# MC-09 — Buyer segments (S1–S8)

Status: `INTERNAL_RESEARCH_DATA_ONLY`. Milestone MC-09, workstream C (buyers).
Date: 2026-10-31. Base commit: `65417bfa681d31cc655e2bc91cfcedcccc368675`.
Owner: `agent-c-buyers`. Machine-readable companion: `data/buyer-segments.json`,
`data/public-signals.json`, `data/evidence-buyers.json`.

## 1. Method and how to read this document

This is **desk research only**. No interviews, outreach, survey responses,
testimonials or willingness-to-pay measurements were performed. There are no
customers to quote and no customer counts anywhere in this workstream.

- Every segment is a **`HYPOTHETICAL_ARCHETYPE`**: a reasoned description of a
  buyer type built from publicly observable problems. No archetype is a real
  person and no biography is researched.
- Public signals describe **problems**, not the size or buying behaviour of a
  segment. See `MC09-PUBLIC-CUSTOMER-EVIDENCE.md` for the ranked problem
  classification, independence assessment and prevalence caveats.
- Evidence IDs have two levels: `SRC-BUY-###` (sources) and `CLM-BUY-###`
  (bounded claims). Each segment below cites the claims that support it; every
  claim resolves to at least one real, accessible URL in
  `data/evidence-buyers.json`.
- Evidence strength is deliberately stated as **STRONG / MODERATE / WEAK**
  *qualitative support*, never as prevalence. A weak segment is a research gap,
  not a reason to invent demand.

## 2. Segment summary

| ID | Segment | Urgency | Evidence support | Claims used |
|---|---|---|---|---|
| S1 | Private coastal boat owner | MEDIUM-LOW | MODERATE (owner forums, retail, installer) | 4 |
| S2 | Sailing owner | MEDIUM | MODERATE (forums, official safety investigation) | 4 |
| S3 | Owner leaving vessel unattended | MEDIUM | WEAK-MODERATE (owner forums, vendor essay) | 4 |
| S4 | Recreational cruiser, integrated helm | MEDIUM-HIGH | STRONGEST qualitative (three forums + installer docs) | 5 |
| S5 | Marine electronics installer | HIGH (job-driven) | MODERATE (official training, installer guide) | 4 |
| S6 | Marina or maintenance operator | MEDIUM | WEAK (vendor product pages, EU aggregate) | 3 |
| S7 | Charter company or nautical school | HIGH in season | WEAK (vendor product page, Spanish market data) | 3 |
| S8 | Professional fleet operator | MEDIUM-LOW | WEAKEST (no operator-level evidence found) | 3 |

---

## S1 — Private coastal boat owner (day and weekend small motor boat)

**Archetype status:** `HYPOTHETICAL_ARCHETYPE`

- **Problem:** a used small motor boat with mixed-age electronics; the owner
  wants charts, depth, weather and traffic awareness without replacing working
  equipment and cannot tell which existing units will integrate.
- **Existing solutions:** phone/tablet navigation with a chart subscription; an
  entry-level chartplotter; low-cost receive-only AIS; DIY NMEA 0183/2000
  wiring; asking a chandlery or local installer.
- **Urgency:** MEDIUM-LOW — seasonal and event-driven (new boat, a failure, a
  first coastal passage).
- **Economic consequence:** repeated small purchases and stacked subscriptions;
  a wrong compatibility choice strands a working unit and adds installation
  hours, which an installer guide puts at 15–50% of hardware cost.
- **Purchase trigger:** boat purchase or refit; plotter/VHF failure; first
  coastal passage; marina or insurance requirement; boat-show promotion.
- **Decision maker:** owner, usually also the skipper.
- **Influencers:** forum and video reviews, chandlery staff, local installer,
  the brand ecosystem already on board.
- **Budget owner:** owner or household budget.
- **Procurement path:** retail/online plus self-install for simple cases;
  installer quote where wiring, antenna or network work is needed.
- **Technical constraints:** NMEA 0183 and NMEA 2000 mix; proprietary
  connectors between brands; legacy analogue sensors that cannot be shared;
  wet or gloved hands on touchscreens; GNSS/AIS antenna placement.
- **Installation requirements:** mounting, power, transducer and VHF antenna
  cabling, network termination, configuration and a documented compatibility
  check per device and firmware.
- **Trust barriers:** fear of buying incompatible equipment; unclear boundary
  between retailer, installer and brand; warranty friction; no demonstration
  on the owner's own vessel.
- **Regulatory considerations:** CE/RCD 2013/53/EU conformity per item; RED
  2014/53/EU and EMC for radio/electronics; national registration and AIS/VHF
  carriage rules; GDPR for account data.
- **Subscription objections:** already pays charts (and possibly weather);
  resents a third recurring fee; wants to know what stops on cancellation.
- **Potential channel:** chandlery/online retail plus local installers, with a
  software-first NAV/WEATHER entry before hardware.
- **Evidence:** CLM-BUY-001, CLM-BUY-004, CLM-BUY-005, CLM-BUY-012.
- **Critical unknowns:** segment size and vessel-age distribution; actual
  installed equipment mix on 6–10 m boats; software-only versus hardware price
  sensitivity; share of owners able to self-install safely.
- **MC-10 questions:** which three existing device models dominate small
  coastal boats in the target area? Would owners pay for a pre-purchase
  compatibility assessment? What proof removes the incompatibility fear? Does a
  software-only start convert to hardware, and at what rate?

## S2 — Sailing owner (club racing and coastal cruising)

**Archetype status:** `HYPOTHETICAL_ARCHETYPE`

- **Problem:** wants reliable wind, speed, depth, AIS and autopilot data
  integrated with sailing-specific navigation, on a boat whose mast wiring,
  instruments and autopilot come from different eras and brands.
- **Existing solutions:** sail-oriented chartplotter ecosystems; instrument and
  wind-sensor replacement; wheel or below-deck autopilot; tablet navigation;
  club knowledge exchange.
- **Urgency:** MEDIUM — racing season, a cruise plan or a failed instrument;
  safety-related autopilot and AIS needs raise the stakes.
- **Economic consequence:** high per-boat spend when masthead wiring or a drive
  is replaced; rework follows wrong integration choices, and feedback failures
  can cause loss of steering or an uncontrolled manoeuvre.
- **Purchase trigger:** season start; broken instrument; autopilot upgrade;
  offshore preparation; class or safety requirement.
- **Decision maker:** owner; on shared or chartered boats the skipper may also
  decide.
- **Influencers:** class association and club peers, rigger, sailmaker,
  electronics dealer, race results and expert reviews.
- **Budget owner:** owner or syndicate.
- **Procurement path:** dealer/chandlery purchase with rigger or installer
  fitting; below-deck autopilot installation and sea trial usually professional.
- **Technical constraints:** masthead wind wiring and calibration; drive type
  and rudder feedback; compass/heading calibration; mixed protocols and brand
  ecosystems; power budget and network topology.
- **Installation requirements:** mast work, cable routing, drive and clutch
  integration, rudder feedback, commissioning, sea trials, documented takeover
  drill and owner training.
- **Trust barriers:** safety fear around autopilot and any remote control;
  zero tolerance for unverified compatibility claims; sunk-cost brand
  lock-in; service response time.
- **Regulatory considerations:** CE/RCD and EMC conformity; autopilot treated as
  a steering system with documented safe-failure requirements; national AIS and
  VHF carriage rules.
- **Subscription objections:** weather and polars are valued but price-sensitive;
  resents paying per season for data already embedded in hardware; wants
  offline navigation to survive a lapsed subscription.
- **Potential channel:** sailing clubs, class associations, riggers and
  sailmakers, specialist chandlers, demonstration boats at regattas.
- **Evidence:** CLM-BUY-001, CLM-BUY-002, CLM-BUY-005, CLM-BUY-011.
- **Critical unknowns:** installed base of autopilot and instrument brands;
  whether owners buy sailing-specific features or generic navigation; the real
  safety requirements for a recreational supervised-steering offer; service and
  sea-trial capacity in the region.
- **MC-10 questions:** which autopilot brands and drive types dominate the
  target size range? What takeover and sea-trial evidence would an owner need
  before trusting a supervised steering system? Do owners buy from dealer,
  installer or sailmaker? Where does current wind/autopilot integration fail?

## S3 — Owner leaving the vessel unattended (marina or mooring)

**Archetype status:** `HYPOTHETICAL_ARCHETYPE`

- **Problem:** cannot see battery, bilge, shore power, position or security
  while away; relies on marina staff, neighbours or a patchwork of alarms, and
  describes factory-fitted monitoring as basic.
- **Existing solutions:** marina berth-holder checks; neighbouring owners;
  standalone bilge/high-water alarms; SMS diallers; factory monitoring with a
  subscription; DIY SIM router with cameras and sensors.
- **Urgency:** MEDIUM — peaks in winter lay-up, long absences and after a
  theft, bilge or shore-power incident.
- **Economic consequence:** damage or loss, insurance excess and disputes,
  travel time to check the boat, and recurring connectivity plus monitoring
  fees compared against DIY substitutes.
- **Purchase trigger:** winter lay-up; long trip away; new marina or mooring; a
  theft or flooding incident; insurance requirement.
- **Decision maker:** owner; partner or family may share monitoring access.
- **Influencers:** marina office and berth holders, insurer, owner forums,
  chandlery alarm products.
- **Budget owner:** owner.
- **Procurement path:** retail kit plus a data plan for DIY; marina or
  technician installation for sensors and alerts.
- **Technical constraints:** mobile coverage at the mooring and fallback
  behaviour; power budget while unattended; sensor compatibility and
  false-alarm tuning; alert delivery under network loss; device ownership
  transfer.
- **Installation requirements:** sensor placement (bilge, battery, shore
  power), SIM/data provisioning, alert routing, multi-user access, real alert
  tests and a documented offline/failure state.
- **Trust barriers:** alert reliability and false alarms; no theft-prevention
  guarantee; privacy and who can see the boat; fear of another subscription
  with unclear service value.
- **Regulatory considerations:** GDPR and consent for shared access and
  location data; radio/data equipment conformity; consumer-law withdrawal and
  cancellation rights; device transfer and data deletion.
- **Subscription objections:** objects to a recurring fee when the boat already
  uses the owner's own SIM; compares with a one-off DIY alarm; wants monitoring
  to continue or fail clearly when the subscription ends.
- **Potential channel:** marina offices and berth-holder communication,
  insurers and boat clubs, chandlers, winterisation providers.
- **Evidence:** CLM-BUY-009, CLM-BUY-010, CLM-BUY-015, CLM-BUY-016.
- **Critical unknowns:** how many owners already have monitoring and of what
  type; alert reliability expectations; whether marinas or insurers are the
  effective channel; value placed on security versus bilge/battery monitoring.
- **MC-10 questions:** what does an owner do today when away and what does it
  cost per season? Which inputs matter most: bilge, battery, shore power,
  position, intrusion? Would a marina resell or recommend a kit? What
  alert-delay and failure evidence is required before trust?

## S4 — Recreational cruiser seeking integrated helm equipment

**Archetype status:** `HYPOTHETICAL_ARCHETYPE`

- **Problem:** the helm has several screens and brands that do not present one
  coherent picture of navigation, traffic, weather, engine and autopilot state;
  the owner wants a coordinated helm without replacing the whole ecosystem.
- **Existing solutions:** single-brand chartplotter ecosystem with radar,
  instruments and autopilot; NMEA 2000 backbone; PC or tablet navigation at the
  helm; piecemeal upgrades inherited from the previous owner.
- **Urgency:** MEDIUM-HIGH during a refit or before a long cruise; low while the
  boat is working.
- **Economic consequence:** high ticket — complete helm rebuilds are quoted from
  about USD 5,000 to above USD 25,000 on complex yachts, and installation alone
  can be 15–50% of hardware cost; wrong choices create rework and lock-in.
- **Purchase trigger:** refit decision; electronics failure; new-to-owner boat;
  extended cruising plan; liveaboard transition.
- **Decision maker:** owner, often with a partner or regular skipper; a
  professional skipper can strongly influence.
- **Influencers:** dealer, installer and surveyor, owner forums and boat tests,
  the existing brand ecosystem.
- **Budget owner:** owner, possibly with a syndicate or boat budget committee.
- **Procurement path:** installer-led survey, itemised quotation with labour
  separated, staged installation and commissioning; retail only for accessories.
- **Technical constraints:** NMEA 2000 certification and network termination;
  mixed-brand device and firmware support; legacy 0183 bridges; sunlight
  legibility, ingress and heat; network topology and power; autopilot interface
  boundaries.
- **Installation requirements:** vessel survey and equipment inventory, network
  design, cabling and antenna work, display mounting, configuration, function
  checks, commissioning record, handover and training.
- **Trust barriers:** fear of an incomplete or unsupported integration; dislike
  of vendor lock-in; concern that a certified device still will not work with an
  existing unit; need for a documented responsibility boundary.
- **Regulatory considerations:** CE/RCD and EMC conformity; no certified
  navigation-system claim unless proven; consumer-law information duties on
  price and exclusions.
- **Subscription objections:** already pays chart and weather subscriptions;
  wants no double billing; wants offline navigation to survive a lapse; expects
  hardware to remain functional.
- **Potential channel:** installer-led retrofit and dealer channel, demonstration
  vessel, refit yards and surveyors.
- **Evidence:** CLM-BUY-001, CLM-BUY-002, CLM-BUY-005, CLM-BUY-007,
  CLM-BUY-018.
- **Critical unknowns:** which brands and models dominate the regional cruiser
  installed base; how much integration owners demand versus a working standalone
  plotter; whether installers would specify a new hub against established
  brands; real total installed cost on a representative vessel.
- **MC-10 questions:** what would a cruiser need to see to accept a new hub
  beside an existing brand ecosystem? Which helm outcomes are non-negotiable?
  What is the real installed cost on a representative 10–12 m cruiser? Which
  regional installers would specify and support an alternative?

## S5 — Marine electronics installer (independent or small yard)

**Archetype status:** `HYPOTHETICAL_ARCHETYPE`

- **Problem:** every job arrives with a different mix of legacy wiring, unknown
  firmware and customer expectations; the installer must research compatibility,
  quote under uncertainty, install, commission and carry first-line support and
  warranty risk.
- **Existing solutions:** brand dealer portals and factory training; NMEA
  installer training and certification; personal test benches and spares;
  distributor technical support; forums as informal research.
- **Urgency:** HIGH — tied to scheduled jobs and season workload; a
  compatibility surprise costs labour hours immediately.
- **Economic consequence:** rework and revisits consume margin; wrong quotes
  lose money; support disputes damage reputation; a reliable compatibility
  matrix and second-line support are commercially valuable.
- **Purchase trigger:** a customer requests a specific integration; a new
  product line needs assessment; refit season starts; a supplier offers trade
  terms and support.
- **Decision maker:** business owner or lead technician.
- **Influencers:** NMEA certification and training, brand dealer programmes,
  trade distributors, peer installers.
- **Budget owner:** business owner or yard manager.
- **Procurement path:** trade account or distributor purchase; specification
  support, training and return/RMA terms are decisive.
- **Technical constraints:** device/firmware compatibility per model; protocol
  coverage and message direction; CAN termination and network power; antenna,
  RF and grounding; legacy wiring condition; firmware update and rollback.
- **Installation requirements:** as installing party — surveyed scope,
  documented configuration, commissioning record, handover, owner training and a
  clear boundary between workmanship and product warranty.
- **Trust barriers:** unverified compatibility claims; slow or unclear RMA;
  support escalation path; liability for a safety-related installation.
- **Regulatory considerations:** workmanship liability and insurance; conformity
  of installed radio and electrical equipment; documentation duties for
  modifications; data protection when configuring owner accounts.
- **Subscription objections:** will not accept per-vessel or per-install fees for
  a product they resell; needs predictable commercial terms; resents paying to
  access a compatibility matrix.
- **Potential channel:** distributor and trade channel, installer training and
  certification, demonstration vessel, written compatibility procedure.
- **Evidence:** CLM-BUY-005, CLM-BUY-006, CLM-BUY-007, CLM-BUY-016.
- **Critical unknowns:** number, size and certification coverage of regional
  installers; actual compatibility research time per job; trade margin
  expectations and willingness to carry a new brand; evidence an installer needs
  before specifying a new hub.
- **MC-10 questions:** how many installation businesses operate in the region and
  what is their certification status? What does an installer do today with a
  mixed-brand helm? What support and RMA terms would make them carry a new
  brand? Which installation would make the best documented demonstration case?

## S6 — Marina or maintenance operator

**Archetype status:** `HYPOTHETICAL_ARCHETYPE`

- **Problem:** coordinates planned and reactive maintenance, inspections,
  contractors and chargeable work across many berths and vessels, often across
  sites; vessel-level condition data is usually collected manually or not at all.
- **Existing solutions:** marina management suites for berth, work orders,
  invoicing and housekeeping; spreadsheets and paper checklists; contractors'
  own systems; periodic manual vessel checks.
- **Urgency:** MEDIUM — driven by seasonal inspections, compliance, staff
  turnover and multi-site consolidation, not by one acute event.
- **Economic consequence:** staff time and missed chargeable work; compliance
  exposure from undocumented inspections; difficulty recovering costs and
  proving work was done.
- **Purchase trigger:** software procurement or replacement; inspection cycle;
  group consolidation or new site; an audit or insurance requirement.
- **Decision maker:** marina manager or operations director; group procurement
  for multi-site groups.
- **Influencers:** finance and IT, site engineers and dock staff, vendor
  references, existing accounting/ERP integration.
- **Budget owner:** marina P&L or group budget.
- **Procurement path:** B2B demonstration, proposal, contract and onboarding;
  integration with existing accounting or marina systems is often a precondition.
- **Technical constraints:** integration with berth and finance systems;
  multi-site data model and permissions; mobile use on the dock; data migration
  and audit history; vessel telemetry interfaces.
- **Installation requirements:** onboarding, site and user configuration, data
  migration, staff training, documented support boundary; hardware only if
  vessel monitoring is added.
- **Trust barriers:** reference customers and proven sites; data portability and
  exit terms; security and role controls; long contract and implementation risk.
- **Regulatory considerations:** safety-inspection and compliance record keeping;
  GDPR for berth-holder and vessel data; contract and data-processing terms;
  port or concession rules where applicable.
- **Subscription objections:** per-site or per-user pricing must fit small
  operators; objects to unused seasonal seats; wants maintenance administration,
  not a separate vessel-monitoring bill.
- **Potential channel:** direct B2B and partner channel (accounting/ERP
  partners), marina groups and industry events.
- **Evidence:** CLM-BUY-014, CLM-BUY-015, CLM-BUY-017.
- **Critical unknowns:** whether vessel monitoring is a marina or an owner
  responsibility; which systems already hold maintenance data; willingness to
  pay for berth-holder telemetry; group versus independent decision-making.
- **MC-10 questions:** would a marina offer or resell monitoring, or leave it to
  owners? What does a marina know today about boats in its berths? Which system
  would have to integrate? Who signs and who influences the purchase?

## S7 — Charter company or nautical school

**Archetype status:** `HYPOTHETICAL_ARCHETYPE`

- **Problem:** runs a fleet with instructors or charter guests and must schedule
  boats, staff and courses, track qualifications and maintenance, manage weather
  disruption and prove compliance, often on spreadsheets and separate tools.
- **Existing solutions:** sailing-school booking and fleet-maintenance platforms;
  charter booking systems; spreadsheets and email; scheme-specific tools.
- **Urgency:** HIGH in season and at scheme audits or licence renewals; lower in
  low season.
- **Economic consequence:** lost utilisation from scheduling conflicts and
  weather; compliance risk if qualifications or maintenance lapse;
  administrative staff time; poor vessel visibility.
- **Purchase trigger:** season start; scheme audit; new vessel or base; growth; a
  scheduling or maintenance incident.
- **Decision maker:** owner or principal; operations manager for larger operators.
- **Influencers:** instructors, the certifying scheme, booking-platform vendor,
  insurance and licensing requirements.
- **Budget owner:** business owner.
- **Procurement path:** self-service subscription or percentage-of-bookings
  platform, or a B2B contract for larger operators; onboarding mostly self-service.
- **Technical constraints:** multi-boat/multi-instructor scheduling; qualification
  and certificate expiry tracking; weather and tide integration; online payments
  and waivers; fleet maintenance history; mobile use on the water.
- **Installation requirements:** account setup, course and fleet catalogue, user
  roles, payment setup, data migration and staff training; hardware only if
  monitoring or telemetry is added.
- **Trust barriers:** scheme compliance must not be misrepresented; data
  ownership and exit; payment and refund handling; vendor continuity for a
  seasonal business.
- **Regulatory considerations:** certifying-scheme record and instructor
  qualification requirements; charter licensing and insurance; consumer and
  package-travel rules to verify; GDPR for student and guest data.
- **Subscription objections:** seasonal businesses dislike flat year-round fees;
  resent per-booking commission on thin margins; want clear limits and no
  hidden per-seat charges.
- **Potential channel:** certifying schemes and associations, booking-platform
  partnerships, direct B2B, industry events.
- **Evidence:** CLM-BUY-012, CLM-BUY-013, CLM-BUY-017.
- **Critical unknowns:** fleet sizes and software spend in the region; whether
  schemes constrain tooling; whether maintenance or scheduling is the stronger
  entry point; interest in telemetry beyond administration.
- **MC-10 questions:** how many schools and charter operators of what size exist
  in the area? What tool do they use, and what breaks in high season? Would they
  pay for vessel status data or only for scheduling/compliance? Which scheme or
  association could introduce the product credibly?

## S8 — Professional fleet operator (managed or commercial fleet)

**Archetype status:** `HYPOTHETICAL_ARCHETYPE`

- **Problem:** needs multi-vessel visibility, role-based access, maintenance
  history, documents, audit trails and reporting for vessels it manages or
  operates, with telemetry only where compatible hardware exists.
- **Existing solutions:** yacht-management platforms, ship-management systems,
  marina/school software adapted beyond its purpose, spreadsheets and email,
  manufacturer telemetry portals.
- **Urgency:** MEDIUM-LOW — slow, contract-driven procurement triggered by
  audits, insurance, growth or a management failure rather than an individual
  owner's need.
- **Economic consequence:** downtime, compliance findings, staff time and
  reporting burden; no public cost figure for this segment was found.
- **Purchase trigger:** audit or insurance requirement; fleet expansion or
  acquisition; management-company mandate; replacement of an ageing system.
- **Decision maker:** fleet or technical manager with an executive sponsor; group
  procurement and IT for larger organisations.
- **Influencers:** IT and security reviewers, compliance and insurance, system
  integrators, peer operators.
- **Budget owner:** organisation budget, usually an annual contract.
- **Procurement path:** B2B qualification, demonstration, security review,
  contract with SLA and data-processing agreement, onboarding project.
- **Technical constraints:** telemetry source integration and coverage; tenant
  isolation and roles; API and data export; retention and deletion; reliability
  and offline behaviour; audit logging.
- **Installation requirements:** organisation and role configuration, vessel
  import, device enrolment where telemetry is used, staff training, documented
  support and SLA boundary.
- **Trust barriers:** no security certification or proven references; fear of
  vendor lock-in and data hostage; no SLA; the read-only telemetry boundary must
  be unambiguous.
- **Regulatory considerations:** data-processing agreement and GDPR; flag-state
  and ISM-type obligations where applicable; cyber-resilience obligations for
  connected products to verify; contract, SLA and liability terms.
- **Subscription objections:** per-vessel monthly pricing must be itemised and
  exclude hardware, connectivity and onboarding; rejects unlimited claims and
  hidden fees; requires exit, export and deletion terms before signing.
- **Potential channel:** direct B2B with partner integrators; referrals from
  marinas, insurers and management companies.
- **Evidence:** CLM-BUY-011, CLM-BUY-014, CLM-BUY-017.
- **Critical unknowns:** fleet sizes, budgets and procurement cycles in the
  target market; whether operators buy telemetry or only administration;
  security and SLA expectations by fleet size; whether an existing platform can
  be displaced at all.
- **MC-10 questions:** which systems do regional operators use and when do their
  contracts renew? Is the trigger audit, insurance, growth or dissatisfaction?
  What security evidence and SLA would procurement require before a pilot?
  Would an operator pay for a documented pilot on one or two vessels?

## 3. Cross-segment observations

1. **Fragmentation is the shared problem, not a product gap.** Owners and
   installers describe the same pain in different vocabulary: owners cannot tell
   what will integrate, installers cannot quote without researching it. This is
   the strongest qualitative finding in the workstream.
2. **Installation is the trust gate for hardware.** Public evidence shows that
   professional installation can represent a large share of total cost and that
   installers themselves are a credentialised, certification-driven trade; a
   hardware offer without installer support has no distribution answer yet.
3. **Subscription objections are real and articulated.** Owners and reviewers
   question what a recurring fee pays for; a software-led offer must explain the
   continuing service and the cancellation consequence in plain language.
4. **B2B segments are the weakest evidence.** S6, S7 and S8 rest on vendor
   product pages and association aggregates. Their operational needs are
   visible; their buying behaviour, budgets and willingness to pay are not.
5. **Safety evidence exists but is not recreational-market evidence.** The
   official autopilot investigation establishes a failure mode and the
   importance of a usable takeover; it says nothing about recreational failure
   rates or about a MAREA PILOT.

## 4. What this workstream does not establish

- No customer, fleet, school, marina or installer was contacted or counted.
- No segment size, revenue, conversion, churn or willingness-to-pay figure is
  measured here; MC-09's WTP work is explicitly `NOT_MEASURED`.
- No product, bundle or compatibility claim is validated by this document.
- No price in this document is approved for publication; observed prices are
  third-party reference points only.
- Segment ordering is a research priority proposal, not a market-size ranking.
