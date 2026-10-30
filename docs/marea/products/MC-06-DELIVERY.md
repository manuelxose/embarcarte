# MC-06 — Delivery record: MAREA PILOT, MAREA SENSE and MAREA WATCH final commercial product definitions

| Field | Value |
| --- | --- |
| Document ID | MC-06 / DELIVERY |
| Milestone | MC-06 (Master Prompt 06/36) |
| Date | 2026-10-30 |
| Owner | Lead (Chief Product Officer) |
| Status | INTERNAL. Delivery record, not a commercial release, not a safety case, not an accuracy report |
| Branch | `feature/marea-mc06-pilot-sense-watch-products` |
| Base | MC-05 HEAD `906f74bad895abce055313ed80332a03a0aceff9` (draft PR [#11](https://github.com/manuelxose/embarcarte/pull/11) still open, so the MC-06 branch stacks on it) |
| Frozen reviewed commit | `45925064a7710c666320b5a569b2cae5c57eb2f5` — "docs(mc06): complete commercial definitions for MAREA PILOT, SENSE and WATCH" |
| Independent review | `docs/marea/products/MC-06-REVIEW.md` — verdict **PASS, product-definition scope only** |
| Publication | NOT AUTHORISED |
| Production deployment | NOT AUTHORISED |
| Product sales | NOT AUTHORISED |

## 1. Executive result

**MC-06 PASS — product-definition scope only.** Three final commercial products are now completely defined to the
MC-05 standard, in the MC-05 architecture, with the MC-05 vocabulary extended rather than forked:

- **MAREA PILOT** — supervised vessel-steering system, installer-led, quotation-based, safety gate **BLOCKED**.
- **MAREA SENSE** — five measurement module SKUs and three kits, accuracy **NOT_MEASURED**.
- **MAREA WATCH** — connected monitoring gateway + hosted service + subscription, service **NOT_FOUND**.

All three remain `DEFINED`, `NOT_FOR_SALE`, `PUBLICATION = INTERNAL_ONLY`, `BRAND_CLEARANCE = NOT_GRANTED`,
`SOURCE_IP = NOT_CLEARED`, `PRICING = HYPOTHESIS_UNAPPROVED`. Nothing is certified, tested, installable,
orderable or publishable as a consequence of this milestone. A definition PASS is not a release.

Approved scope: product definition, internal bilingual copy, machine-readable contract, validator extension,
decision/governance records. Not approved or attempted: hardware operation, steering actuation, image generation,
publication, checkout, pricing approval, merge or deploy.

## 2. What was delivered

| Id | Deliverable | File | Size |
| --- | --- | --- | --- |
| D1 | PILOT commercial specification (24 fields + 18 subsystem specs + modes + editions + safety annex cross-reference) | `MAREA-PILOT-COMMERCIAL-SPEC.md` | 996 lines |
| D2 | SENSE commercial specification (24 fields + 5 modules × 21 attribute rows + 3 kits + dependency matrix) | `MAREA-SENSE-COMMERCIAL-SPEC.md` | 894 lines |
| D3 | WATCH commercial specification (24 fields + 40-domain capability register + 4 layers + degraded behaviour) | `MAREA-WATCH-COMMERCIAL-SPEC.md` | 692 lines |
| D4 | Edition authority for the three families | `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` | 626 lines |
| D5 | Cross-product compatibility contract (10-column matrix, 31 integration rows) | `PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` | 266 lines |
| D6 | Pricing, cost and channel framework batch 02 | `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` | 400 lines |
| D7 | Customer journeys (17 stages × 3 families + safety/alert/cross-product journeys) | `CUSTOMER-JOURNEYS-PILOT-SENSE-WATCH.md` | 507 lines |
| D8 | Six ES/EN product-page drafts, 24 sections each | `copy/pilot.*.md`, `copy/sense.*.md`, `copy/watch.*.md` | 252–259 lines each |
| D9 | Thirty visual asset requirements | `PRODUCT-ASSET-REQUIREMENTS-BATCH-02.md` | 744 lines |
| D10 | PILOT safety case outline | `PILOT-SAFETY-CASE-OUTLINE.md` | 1,135 lines |
| D10 | SENSE measurement and calibration plan | `SENSE-MEASUREMENT-AND-CALIBRATION-PLAN.md` | 777 lines |
| D10 | WATCH alert-delivery and privacy contract | `WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md` | 722 lines |
| D11 | Batch-02 machine-readable contract | `product-definitions.batch-02.json` | 2,515 lines |
| D12 | Extended single validator + 77 deterministic tests | `scripts/check-marea-products.mjs`, `.test.mjs` | 38 checks |
| D13 | This delivery record | `MC-06-DELIVERY.md` | — |
| D14 | Independent review | `MC-06-REVIEW.md` | 33 KB |
| D15 | Governance: conventions addendum, decisions, registry | `README.md` §§12–23, `DECISION-LOG.md` D-008–D-011, `MASTER-PROMPT-REGISTRY.md` | — |

Total batch-02 documentation: ~10,300 lines across the twelve authored documents plus six copy files.

## 3. The three products as defined

### 3.1 MAREA PILOT — supervised steering

- **Customer proposition.** Reduce continuous hand-steering workload on a compatible recreational sailing or motor
  vessel, while the skipper keeps responsibility for navigation, watchkeeping and vessel safety. Not autonomous,
  not collision avoidance, not unattended, never internet-remote.
- **Intended system.** Control computer; independent motor-control electronics; surveyed drive/actuator family
  (tiller, wheel, hydraulic, linear, drive-by-wire flagged not-yet-assessable); physical helm control head; heading
  sensor; rudder/steering feedback; hardware watchdog; command heartbeat/timeout; overcurrent/thermal monitoring;
  physical E-stop; independent motor-power isolation; alarm classification; manual standby and override; secure
  local access.
- **Modes.** Heading hold = final intent. Wind-angle steering and route/track following = **conditional on
  verification**, with prerequisites and current evidence stated per mode. Pilot is engaged and disengaged only
  from local authorised controls.
- **Editions (D-008).** `PILOT-COASTAL` `DEFINED`; `PILOT-SAIL` `CONDITIONAL` on verified wind steering;
  `PILOT-PRO` `INSTALLATION_PACKAGE` — a quoted vessel-specific service scope, not a retail SKU.
- **Commercial model (D-009).** Quotation-based. `from EUR 1,290` is a `HYPOTHESIS_UNAPPROVED` starting-price
  reference for the minimum usable Coastal configuration only; it is not all-inclusive, not turnkey, not a
  quotation, and no other PILOT price exists. Every quotation must enumerate inclusions and exclusions after a
  documented vessel and steering survey.
- **Included/excluded.** Included by configuration: surveyed drive and mechanical interface, control head,
  heading/feedback according to survey, harness, E-stop, commissioning and owner training within the quoted scope.
  Excluded unless quoted: sensors beyond the approved set, second station, extended warranty, installation labour
  outside the quotation.
- **Safety.** `PILOT_SAFETY_GATE = BLOCKED`; physical E-stop, motor isolation and rudder feedback `NOT_FOUND`;
  sea trials `NOT_PERFORMED`; no human safety signatory; no conformity. The safety case is design-stage and states
  that no software watchdog replaces physical safeguards and that no AI agent may control a live vessel.
- **Main blockers.** H-01, H-02, H-03, H-05, H-06, H-07, H-10, H-13, P-04, P-10, X-01, X-02, X-03, X-05, X-06.

### 3.2 MAREA SENSE — measurement modules

- **Customer proposition.** Give an existing boat useful, honest onboard measurements without replacing the whole
  helm ecosystem, module by module.
- **Module SKUs.** `SENSE-WIND` (apparent wind; true wind only with valid heading and speed), `SENSE-POWER`
  (voltage, current; state of charge only when validated), `SENSE-BILGE` (water presence and high-water state, not
  a continuous level), `SENSE-TANKS` (level from a compatible sender and tank geometry), `SENSE-ENV` (temperature,
  humidity, pressure). Original MAREA devices are separated from third-party data adapters in every module record.
- **Kits (D-008).** `SENSE-ESSENTIALS` = Power + Bilge, `DEFINED`; `SENSE-SAIL` = Wind + Environment,
  `CONDITIONAL`; `SENSE-SYSTEMS` = Power + Bilge + Tanks + Environment, `CONDITIONAL`. No kit adds a capability
  absent from its modules, and no kit includes HUB, WATCH, DISPLAY or installation.
- **Dependency truth.** A module works locally within its designed scope; the consolidated MAREA view needs a HUB;
  remote alerts need WATCH + connectivity + an active subscription. SENSE alone has no connectivity and no remote
  alerting. HUB cannot measure; WATCH cannot measure.
- **Evidence.** `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`; `SENSE_INGRESS_PROTECTION = NOT_VERIFIED`;
  `SENSE_NMEA2000 = NOT_IMPLEMENTED`; no numeric accuracy, resolution or IP rating exists in any customer copy.
  The executed MC-02 unit tests (NMEA 0183 wind parsing, IMU fusion) are recorded as parser-level only.
- **Pricing.** Individual module, `from EUR 99` `HYPOTHESIS_UNAPPROVED`; no kit price, no module price beyond the
  entry hypothesis.
- **Main blockers.** H-04, H-05, H-06, H-07, H-11, P-02, P-05, P-06, P-10, X-01, X-03, X-05, X-06.

### 3.3 MAREA WATCH — connected monitoring

- **Customer proposition.** Understand selected vessel conditions while away from the boat: position and geofence,
  battery, bilge, temperature context, rules, history, multi-user access, subject to power, coverage and
  notification delivery.
- **Product layers.** Hardware monitoring device; software experience (dashboard, history, rules, users, account);
  subscription (hosted processing, storage, notifications, declared communication plan where contractually
  included); external connectivity (cellular/Wi-Fi, coverage, roaming, interruptions). The layers are never merged
  in copy.
- **Editions (D-008).** `WATCH-CORE` `DEFINED` (essential monitoring package + subscription entitlement);
  `WATCH-PLUS` `CONDITIONAL` on validated, costed additional benefits — never "more features", never priced by
  uplift.
- **Alert truth.** Canonical state model `EVENT_OBSERVED → RULE_MATCHED → ALERT_CREATED → QUEUED →
  PROVIDER_ACCEPTED → DELIVERED_WHEN_CONFIRMED → ACKNOWLEDGED`, with `EXPIRED`, `FAILED`, `DELIVERY_UNKNOWN`, and
  eight distinct timestamps. Provider acceptance is not delivery; delivery is not human acknowledgement; an event
  observed offline reaches the server only after reconnection.
- **Privacy and authority.** Data minimisation, DPO-to-confirm lawful basis, role matrix (owner, family/crew,
  technician, marina service, professional fleet), scoped sharing, revocation, retention `OPEN`, export, deletion,
  audit, breach outline, DPIA outline. No public position exposure by default. **No steering, rudder, heading or
  engine command path exists from WATCH.**
- **Local behaviour.** Subscription expiry or payment failure never disables safety-relevant or local functions;
  no internet/cellular/power/account condition treats a stale value as current.
- **Pricing.** Hardware EUR 299 `HYPOTHESIS_UNAPPROVED`; monitoring subscription `from EUR 9.90/month`
  `HYPOTHESIS_UNAPPROVED`; what the subscription includes (connectivity cap, device and user counts, retention,
  push channels, VAT, roaming, installation) is `OPEN`.
- **Evidence.** `WATCH_INGESTION = NOT_VERIFIED`; pipeline, device identity, subscription service and connectivity
  contract `NOT_FOUND`.
- **Main blockers.** D-09, H-05, H-06, H-11, H-12, H-13, P-06, P-10, X-01, X-03, X-05, X-06, X-07.

## 4. Commercial system and relationships

- **13 edition-level objects, frozen (D-011).** Three PILOT, eight SENSE (5 modules + 3 kits), two WATCH. Safety
  and honesty capabilities (E-stop, isolation, manual takeover, calibration, stale display, local function without
  subscription, identity, export, ownership transfer) are never edition-gated.
- **Compatibility matrix (D5).** 31 integration rows in the fixed 10-column format; 0 `SUPPORTED`, 10 `PLANNED`,
  13 `CONDITIONAL`, 8 `UNKNOWN`. `UNKNOWN` is never presented as supported.
- **Authority boundaries (README §19).** NAV may supply route data but never commands the actuator; HUB is not the
  actuator controller; WATCH displays authorised read-only PILOT status and never steers; SENSE measurements
  become steering inputs only after specific safety qualification; FLEET may consume read-only telemetry later.
- **Subscription isolation.** No entitlement, renewal, payment failure or cancellation may disable local steering,
  valid local sensing, local alarms or other safety-relevant independent functions. This is a design requirement,
  not a tested behaviour.
- **Journeys (D7).** 17 stages for each family, plus seven PILOT safety journeys, nine WATCH alert/outage journeys
  and six cross-product journeys; every workflow shows what the customer sees when telemetry is stale or missing.
- **One governance system.** `scripts/check-marea-products.mjs` validates both contracts (6 products, 9 families
  governed by the brand contract) with one field/evidence/lifecycle/publication vocabulary. Batch-01 behaviour and
  its tests are preserved.

## 5. Content and visuals

- Six ES/EN product-page drafts, 24 numbered sections each, using the exact MC-05 section headings, with the
  approved disclaimers verbatim (PILOT supervised steering, navigation, brand attribution) and the MC-06
  limitation statements (SENSE measurement validity, WATCH alert delivery) recorded as **internal draft wording
  pending claims-register approval** (D-010).
- Copy contains no prices, no purchase CTA, no stock, no reviews, awards, testimonials, certifications or
  availability claims.
- Thirty asset requirements, 10 per family, with fixed ids: 12 `BLOCKED_ON_IMAGE_GENERATION` scenes
  (HERO/USE/INS/TMB per family), 15 MC-04 internal vector/brief reuse records and 3 authored-new specification
  visuals. All are `CONCEPT`; no PILOT/SENSE/WATCH device exists, no photo/CGI was produced, and X-03 keeps image
  generation blocked.

## 6. Evidence, validation and independent review

| Gate / check | Result |
| --- | --- |
| `npm run test:products` | **PASS** — 38 checks, 38 passed, 0 failed; 33/33 scoped files |
| `npm run test:products:unit` | **PASS** — 77 tests, 77 passed (29 at MC-05; +48) |
| `npm run format:check` | **PASS** |
| `npm run test:brand` / `test:brand:unit` | **PASS** 21/21 / 13/13 |
| `npm run test:i18n` | **PASS** |
| `npm run test:commerce` | **PASS** |
| `npm run test:seo` | **PASS** — 101 sitemap URLs, canonical, hreflang, JSON-LD, private noindex |
| `npm run test:backup` | **PASS** — consistent snapshot, checksums, restore |
| `npm run build` | **PASS** — Angular SSR/prerender build |
| `npm run test:e2e` | **PASS** — 15/15 (Chromium) |
| `npm audit --omit=dev --audit-level=high` | **PASS** — 0 vulnerabilities |
| `git diff --check` | **PASS** — clean |

Independent review (`MC-06-REVIEW.md`) examined the frozen commit `45925064` and returned **PASS for the
product-definition scope**, with 24 per-question verdicts, a gate-evidence table and seven findings
(1 BLOCKING, 2 MAJOR, 4 MINOR). All seven were corrected before the verdict and re-verified:

- **BLK-01** — the validator treated the status token `HYPOTHESIS_UNAPPROVED` as a negation, so a prohibited price
  or claim on the same line passed. Fixed at root cause; two regressions added; the reviewer's own adversarial
  probes now fail as required.
- **MAJ-02** — batch-02 asset statuses contradicted D9 (all 30 marked blocked). Corrected to 12 blocked + 18
  `CONCEPT`, and the validator now cross-checks the D9 coverage matrix.
- **MAJ-03** — SENSE Systems composition in customer copy omitted Bilge. Corrected; a kit-composition check now
  compares copy, D4, D2 and the contract.
- **MIN-04/05/06/07** — WATCH copy navigation self-contradiction, missing authorisation for PROPOSED internal
  accuracy targets, ambiguous SENSE dependency booleans, and an imperative purchase phrase in NOT_FOR_SALE copy.

## 7. Scope discipline

- Authorised changes only: `docs/marea/products/**`, `docs/marea/execution/DECISION-LOG.md`,
  `docs/marea/execution/MASTER-PROMPT-REGISTRY.md`, `scripts/check-marea-products.mjs`,
  `scripts/check-marea-products.test.mjs`. No `src/`, `public/`, checkout, price, stock, payment, deployment,
  brand-adoption or OPEN-MARINE change.
- No image generation, no chargeable API call, no hardware activation, no steering command, no test alert to third
  parties, no customer contact, no trademark filing, no merge, no deploy, no publication, no SKU made orderable.

## 8. Unresolved external gates (recorded, none closed by MC-06)

| Blocker | State after MC-06 |
| --- | --- |
| Trademark clearance (X-01) | `NOT_GRANTED`; public MAREA branding remains NO-GO |
| OPEN-MARINE ownership/licensing (L-01–L-03) | `NOT_CLEARED`; source IP unresolved |
| PILOT safety (H-01, H-02, H-03, H-10, P-04) | `BLOCKED`; no bench/HIL/sea-trial/independent review/conformity; no human safety signatory |
| SENSE measurement (P-05, H-04, H-05) | Accuracy `NOT_MEASURED`; no ingress evidence; NMEA 2000 `NOT_IMPLEMENTED` |
| WATCH implementation/connectivity (P-06, H-12, X-07) | Service `NOT_FOUND`; ingestion `NOT_VERIFIED`; no connectivity/roaming terms; privacy architecture to be built |
| Hardware certification (H-06, H-13) | `NOT_STARTED`; CRA/EMC/RED/LVD/GPSR/CE not assessed per product |
| Supplier/BOM (H-05, H-07, X-05) | No BOM, quotes, installer labour rates or channel terms |
| Imagery (X-03) | All 30 planned assets blocked; no photo/CGI; 15 MC-04 reuse records internal only |
| Product release | Every product `NOT_FOR_SALE`; no price approved; no pre-order authorised |

## 9. Milestone status separation (mandatory reading)

- **MC-06 PASS** means: the three final-product definitions are complete, internally consistent, honestly bounded
  and mechanically validated.
- **MC-06 PASS does not mean:** PILOT is safe to install; SENSE accuracy is measured; WATCH reliably delivers
  notifications; any device is CE compliant; the MAREA brand is legally clear; any product can be sold, quoted as
  a fixed price, pre-ordered or published.

## 10. Next milestone

**MC-07 — full commercial product definitions for MAREA DISPLAY, MAREA WEATHER and MAREA FLEET.** Not executed by
MC-06. MC-07 must reuse this conventions document, this field vocabulary and this validator, and must carry the
data-licensing (D-01–D-10, D-04) and tenant-isolation (P-09, X-07) implications explicitly.
