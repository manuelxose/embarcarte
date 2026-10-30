# MC-07 — Delivery record: MAREA DISPLAY, MAREA WEATHER and MAREA FLEET final commercial product definitions

| Field | Value |
| --- | --- |
| Document ID | MC-07 / DELIVERY |
| Milestone | MC-07 (Master Prompt 07/36) |
| Date | 2026-10-30 |
| Owner | Lead (Chief Product Officer) |
| Status | INTERNAL. Delivery record, not a commercial release, not a hardware validation, not a forecast-accuracy report, not a security certification |
| Branch | `feature/marea-mc07-display-weather-fleet-products` |
| Base | MC-06 HEAD `7867409066e83e4b432476903e61f5ebdcc1b554` (draft PR [#12](https://github.com/manuelxose/embarcarte/pull/12) still open, so the MC-07 branch stacks on it) |
| Reviewed commit | `355cf00877f6be07cab26afd9e9ca30bf7964ca3` — "docs(mc07): close independent-review findings — validator gate hardening and dossier corrections" (15 files, +388/−64) |
| Initial audited commit | `64330faf6513de22dcced6ef70c1a6e8366490f0` — first audit returned **FAIL** (BLK-01/02/03, MAJ-04 and seven minor findings); all were closed in `355cf00` and re-verified **PASS** |
| Draft PR | [#13](https://github.com/manuelxose/embarcarte/pull/13) — draft, stacked on `feature/marea-mc06-pilot-sense-watch-products`, not merged |
| Independent review | `docs/marea/products/MC-07-REVIEW.md` — **PASS, product-definition scope only** (reviewed commit `355cf00`) |
| Publication | NOT AUTHORISED |
| Production deployment | NOT AUTHORISED |
| Product sales | NOT AUTHORISED |
| Trademark clearance | `NOT_GRANTED` |
| Source IP clearance | `NOT_CLEARED` |

## 1. Executive result

**MC-07 PASS — product-definition scope only.** Independent review PASS — product-definition scope only (reviewed
commit `355cf00877f6be07cab26afd9e9ca30bf7964ca3`). All nine products remain DEFINED / NOT_FOR_SALE / INTERNAL_ONLY;
publication BLOCKED; trademark NOT_GRANTED; OPEN-MARINE rights NOT_CLEARED; image generation BLOCKED; prices are
unapproved hypotheses. A definition PASS is not a release. The third and final product-definition batch is complete in the
same architecture, vocabulary and validator as MC-05 and MC-06:

- **MAREA DISPLAY** — a dedicated marine multifunction display device with its own base software, `DEFINED`, hardware `NOT_SELECTED`, size `SIZE_NOT_FROZEN`, price hypothesis from EUR 699.
- **MAREA WEATHER** — a marine weather intelligence and planning service, standalone and NAV-shareable, `DEFINED`, every provider right `NOT_GRANTED`/unresolved, price hypotheses EUR 49/year (Standard) and EUR 89/year (Pro).
- **MAREA FLEET** — a multi-vessel, multi-tenant operations SaaS, `DEFINED`, service `NOT_IMPLEMENTED`, `NO_SLA_ESTABLISHED`, price hypotheses EUR 49/vessel/month (Start) and EUR 79/vessel/month (Business), Enterprise a contracted tier with no price.

All three remain `DEFINED`, `NOT_FOR_SALE`, `PUBLICATION = INTERNAL_ONLY`, `BRAND_CLEARANCE = NOT_GRANTED`,
`SOURCE_IP = NOT_CLEARED`, `PRICING = HYPOTHESIS_UNAPPROVED`, `DATA_RIGHTS = NOT_GRANTED`. Nothing is certified,
tested, installable, orderable or publishable as a consequence of this milestone. A definition PASS is not a
release, not a hardware validation and not a security certification.

Approved scope: product definition, internal bilingual copy, machine-readable contract, validator extension,
decision/governance records. Not approved or attempted: hardware operation or measurement, provider subscription,
paid API call, image generation, publication, checkout, pricing approval, merge, deployment, customer data.

## 2. What was delivered

| Id | Deliverable | File | Size |
| --- | --- | --- | --- |
| D1 | DISPLAY commercial specification (24 fields + 38-domain capability register + 14 physical release gates + 20 acceptance scenarios) | `MAREA-DISPLAY-COMMERCIAL-SPEC.md` | 810 lines |
| D2 | WEATHER commercial specification (24 fields + 44-domain register + coverage/metadata/geography/edition sections + forecast/observation semantics + 35 acceptance scenarios) | `MAREA-WEATHER-COMMERCIAL-SPEC.md` | 649 lines |
| D3 | FLEET commercial specification (24 fields + 50-domain SaaS register + 6 segments + 26 acceptance scenarios) | `MAREA-FLEET-COMMERCIAL-SPEC.md` | 975 lines |
| D4 | Edition authority for the three families (7 objects, inclusions/exclusions, 9 candidate decisions recorded as D-012–D-016) | `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` | 861 lines |
| D5 | Cross-product compatibility contract (10-column matrix, 21 canonical rows, 42 directed relationships, 0 SUPPORTED) | `PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` | 492 lines |
| D6 | Pricing, cost and channel framework batch 03 (20 official comparators, hardware/data/SaaS economics, no fabricated BOM or margin) | `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` | 501 lines |
| D7 | Customer journeys (17 stages × 3 families + 28 mandatory specific journeys + 6 cross-product journeys) | `CUSTOMER-JOURNEYS-DISPLAY-WEATHER-FLEET.md` | 748 lines |
| D8 | Six ES/EN product-page drafts, 24 sections each | `copy/display.*.md`, `copy/weather.*.md`, `copy/fleet.*.md` | 237–270 lines each |
| D9 | Thirty visual asset requirements, reconciled 30 = 12 blocked + 15 reused + 3 authored | `PRODUCT-ASSET-REQUIREMENTS-BATCH-03.md` | 527 lines |
| D10 | DISPLAY hardware and interaction annex | `DISPLAY-HARDWARE-AND-INTERACTION-REQUIREMENTS.md` | 375 lines |
| D10 | WEATHER data-rights and forecast contract annex (15 rights dimensions, per-provider/per-variable matrix) | `WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md` | 508 lines |
| D10 | FLEET tenancy, authorization and data-governance annex | `FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md` | 1,855 lines |
| D11 | Batch-03 machine-readable contract (3 products × 24 fields, 234 evidence refs, 7 editions, 30 assets) | `product-definitions.batch-03.json` | 2,405 lines |
| D12 | Nine-product ecosystem overview | `MAREA-NINE-PRODUCT-ECOSYSTEM.md` | 185 lines |
| D13 | Single unified validator (52 checks, 9 products, 3 contracts) + 106 deterministic tests | `scripts/check-marea-products.mjs`, `.test.mjs` | 6,4xx + 1,7xx lines |
| D14 | This delivery record | `MC-07-DELIVERY.md` | — |
| D15 | Independent review | `MC-07-REVIEW.md` | 656+ lines |
| D16 | Governance: README addendum §24–§32, decisions D-012–D-016, registry row | `README.md`, `DECISION-LOG.md`, `MASTER-PROMPT-REGISTRY.md` | — |

Batch-03 authored documentation: **12 new documents plus six copy files, 15,545 inserted lines** in the reviewed
commit (24 files changed). No previous batch document was rewritten; earlier promises are referenced, not changed.

## 3. The three products as defined

### 3.1 MAREA DISPLAY (`DISPLAY`, `HARDWARE_SOFTWARE`)

- **Final customer offer.** A fixed marine multifunction display with a dedicated operating environment, readable day/sunlight/night presentation, configurable helm dashboards, local instrument/AIS/position/alarm presentation, licensed chart and weather presentation where rights exist, configuration backup, update/rollback and service lifecycle. It is a device, not a NAV subscription.
- **Editions.** `DISPLAY-7` (from EUR 699 one-off, VAT-inclusive consumer retail hypothesis, `SIZE_NOT_FROZEN`, minimum package only) and `DISPLAY-LARGE-CONDITIONAL` (conditional future size class, no price, no measured size, may be withdrawn).
- **Included vs separate.** Included: device, base software, documented mounting and power items, warranty support. Separate/excluded: charts (D-01), WEATHER entitlement, NAV Pro, HUB, AIS receiver, adapters, extra mounts, installation labour, and any PILOT authority.
- **PILOT boundary.** Read-only status/alarms at most; no engagement, no course change, no motor command, no remote or web-mediated pilot path.
- **Physical validation blockers.** No panel, enclosure, BOM or unit exists; sunlight legibility, night mode, thermal, vibration, ingress, EMC/RED conformity, electrical compatibility, installation validation, update/recovery and field service are **not tested**. MC-04 contrast work is design evidence only.
- **Blockers.** `H-04`, `H-05`, `H-06`, `H-11`, `H-13`, `D-01`, `D-05`, `D-06`, `D-10`, `P-07`, `P-10`, `X-01`, `X-03`, `X-05`, `X-06`, `X-07`.

### 3.2 MAREA WEATHER (`WEATHER`, `SOFTWARE`)

- **Standalone value.** Understandable forecasts with source, model run time, valid time, receipt time, age/freshness, coverage, resolution, horizon, uncertainty and attribution — usable without NAV, and shareable with NAV under one entitlement ledger.
- **Forecast vs observation.** Every value is typed `FORECAST`, `OBSERVATION`, `HISTORICAL`, `DERIVED`, `USER_ENTERED` or `UNKNOWN`; a forecast is never presented as a measurement and multiple providers are compared, never merged into a fictional consensus.
- **Editions.** `WEATHER-STANDARD` from EUR 49/year and `WEATHER-PRO` EUR 89/year, both `HYPOTHESIS_UNAPPROVED`; Pro (multi-model comparison, advanced layers, route context, notifications) is conditional on provider entitlements.
- **Pilot geography.** Galicia, Rías Baixas, Atlantic Portugal and nearby Atlantic planning, stated as commercial priority with no exclusivity and no accuracy claim; expansion is future intent, not existing coverage.
- **Provider position (checked 2026-10-30).** `providerRightsGranted = false`. Copernicus Marine `PERMITTED_CONDITIONAL` (licence §2.2, credit + DOIs, free until planned 2028-06-30); EMODnet `PERMITTED_CONDITIONAL` (CC BY 4.0); AEMET OpenData `PERMITTED_CONDITIONAL` but NWP `LEGAL_REVIEW_REQUIRED`; Open-Meteo free tier `NOT_PERMITTED_FOR_PAID_SERVICE`, paid plan `PERMITTED_CONDITIONAL`, plan amounts `UNRESOLVED`; OpenWeather prices verified but terms page unavailable so sub-licensing `UNRESOLVED`, tiles `BLOCKED` under D-05; MeteoGalicia and Puertos del Estado `UNRESOLVED`; tides `UNRESOLVED`/harmonic derived output `BLOCKED`.
- **NAV relationship.** One account, one entitlement ledger; prorated upgrade credit; never billed twice; cancelling NAV preserves user-owned records with a defined read-only export window; expired entitlement never renders a frozen forecast as current.
- **Blockers.** `D-04`, `D-05`, `D-07`, `D-09`, `D-10`, `P-08`, `P-10`, `X-01`, `X-03`, `X-05`, `X-06`.

### 3.3 MAREA FLEET (`FLEET`, `SOFTWARE`)

- **B2B segments.** Charter operators, sailing schools, marinas, maintenance companies, rental operators, vessel-management firms, professional small fleets, clubs and commercial service providers — six documented segment profiles with buyer, daily roles, workflows, compliance expectations and willingness-to-pay **assumptions** (no invented interviews).
- **Editions.** `FLEET-START` from EUR 49/vessel/month (VAT excluded, small operators), `FLEET-BUSINESS` EUR 79/vessel/month (richer permissions, workflows, reporting, integrations), `FLEET-ENTERPRISE` a `CONTRACTED_TIER` with `NOT_ESTABLISHED` price, `NO_SLA_ESTABLISHED` and no unlimited terms. No edition includes hardware, installation, connectivity or the FLEET package.
- **Multi-tenant model.** Organization → membership → 8 roles → vessel assignment, with server-side authorization on every sensitive operation against authenticated user, membership, role, resource ownership, vessel assignment, device ownership and sharing grant; a client-supplied tenant id is never authorization. Organization A cannot read or modify B; revocation is immediate; external installers are scoped and time-bound; support access is audited; exports, search, cache and background jobs are tenant-scoped.
- **Telemetry boundary.** WATCH/HUB read-only where authorized, SENSE only via verified integration, NAV only with explicit permission, PILOT blocked for any control; no steering, throttle, motor or bus command path exists; a disconnected vessel is never shown online; provider acceptance is not human delivery.
- **Data governance.** Controller/processor roles assessed per data flow (EDPB guidance checked 2026-10-30), DPA and subprocessor obligations, retention, export, deletion, transfer and incident handling documented; no customer production data was used.
- **SaaS implementation blockers.** No multi-tenant service, no billing/entitlement system, no measured SLA, no security certification, no penetration test; tenant isolation is a design requirement proven by specification and future executable tests, **not by the JSON validator**.
- **Blockers.** `D-09`, `D-10`, `H-12`, `H-13`, `P-09`, `P-10`, `X-01`, `X-03`, `X-05`, `X-06`, `X-07`.

## 4. Nine-product completion

| Measure | Delivered | Note |
| --- | ---: | --- |
| MAREA product families defined | **9** | NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET |
| Mandatory business fields | **216** | 9 families × 24 canonical fields |
| Batch-03 business fields delivered here | 72 | 3 families × 24 fields, all `COMPLETE` in the dossier and contract |
| ES/EN product-page drafts | **18** | 9 families × ES + EN, 24 sections each |
| Lifecycle states | 1 shared vocabulary | D-007; all nine `DEFINED` |
| Readiness dimensions | 9 shared dimensions | All recorded per product in the contract |
| Evidence classes | 6 shared classes | `VERIFIED_REPO`, `VERIFIED_EXTERNAL`, `ASSUMPTION`, `HYPOTHESIS`, `OPEN`, `BLOCKED` |
| Machine contracts | 3 | batch-01, batch-02, batch-03; one validator covers all three |
| Editions defined | 26 | 19 batch-01/02 + 7 batch-03 |
| Visual asset requirements | 90 | 30 per batch; batch-03 reconciled 30 = 12 + 15 + 3 |

The nine-product ecosystem overview (`MAREA-NINE-PRODUCT-ECOSYSTEM.md`) confirms one integration vocabulary, the
nine mandatory distinctions (NAV≠DISPLAY, WEATHER≠NAV, FLEET SaaS≠package, WATCH≠FLEET, DISPLAY≠tablet,
SENSE≠WATCH, HUB≠sensor, AIS receive-only, PILOT supervised local steering), one entitlement/authority model and
uniform publication/sale gates. No earlier batch promise was silently changed.

## 5. Validation and quality gates

All commands were executed on the reviewed tree (commit `64330fa`) unless stated otherwise.

| Command | Result |
| --- | --- |
| `npm run format:check` | PASS — "All matched files use Prettier code style!" |
| `npm run build` | PASS — Angular SSR/prerender build exit 0 |
| `npm run test:i18n` | PASS — server-rendering and i18n foundation checks |
| `npm run test:commerce` | PASS |
| `npm run test:seo` | PASS |
| `npm run test:backup` | PASS |
| `npm run test:brand` | PASS |
| `npm run test:brand:unit` | PASS |
| `npm run test:products` | PASS — **52 checks run, 52 passed, 0 failed; 51/51 scoped files**; 789 evidence references resolved; 9 products / 26 editions / 3 contracts |
| `npm run test:products:unit` | PASS — **106 tests, 106 pass, 0 fail** (77 MC-05/MC-06 tests retained, 29 batch-03/R1 mutation tests added) |
| `npm run test:e2e` | PASS — 15 passed (Chromium) on isolated run. A parallel run that coincided with the Angular build produced one 60 s page-load timeout in the bilingual-surface test; re-run alone 15/15 in 43.6 s. Recorded as a resource-contention flake, not a product defect; the reviewer reruns gates serially. |
| `npm audit --omit=dev --audit-level=high` | PASS — 0 vulnerabilities |
| `git diff --check` | PASS — 0 whitespace errors on the staged/committed diff |

Application tests are **regression evidence that the documentation milestone did not break the site**; they are not
evidence that DISPLAY, WEATHER or FLEET works. No test was reported as passed unless it was actually executed.

## 6. Negative tests and prior-batch regression

- **Retained:** every MC-05 and MC-06 mutation test in `scripts/check-marea-products.test.mjs` (77 original tests; zero removed).
- **Added (29):** DISPLAY — certified sunlight performance without evidence, invented IP rating, unrestricted chart licences, approved PILOT control authority, frozen screen size without hardware evidence. WEATHER — free non-commercial API approved for a paid service, `GRANTED` data rights without evidence, offline entitlement without source permission, guaranteed forecast accuracy, double-billed NAV/WEATHER entitlement. FLEET — accepted cross-tenant access, missing tenant-authorization requirement, permissive default role, remote steering, guaranteed SLA without evidence, unsupported security certification, missing privacy/data-export policy. Structural — missing copy file, D9 asset status drift, D9 reconciliation drift, batch-02 link missing. **Reviewer-driven R1 additions (8):** the six natural remote-control/PILOT-authority probe strings (e.g. "You can control the vessel remotely from the app.", "Engage PILOT from the display.", "PILOT can be controlled from the display."), the forecast-percentage claim ("Forecasts are 95% accurate.") and the cross-tenant text claim ("Organization administrators can access cross-tenant data."). The gate now rejects these natural declarative forms with negation awareness preserved.
- Each mutation test asserts the validator exits non-zero and names the expected check; all 106 tests pass.
- **Honest limit:** these are specification validators. They prove the contract *states* a requirement; they do not prove tenant isolation, sunlight readability or forecast accuracy.

## 7. Asset inventory reconciliation

| Measure | Count |
| --- | ---: |
| Total planned assets | 30 (10 per product) |
| Blocked photographic/CGI | 12 (`HERO`, `USE`, `INS`, `TMB` per product) |
| Reused internal MC-04 vectors/briefs | 15 (`OVR`, `EDN`, `ECO`, `OG`, `TEC` per product) |
| Newly authored specifications (no rendered file) | 3 (`MOB` per product) |
| Vector concepts | 18 |
| Missing | 0 |
| Publicly approved | 0 |
| Verified real-product assets | 0 |

Partition check: 12 + 15 + 3 = 30. No image was generated, downloaded or published; the image-generation gate
remains `BLOCKED` (`X-03`).

## 8. Corrective actions during MC-07

| # | Finding | Action |
| ---: | --- | --- |
| 1 | WEATHER dossier contained the literal prohibited placeholder token in an explanatory sentence | Rewritten without the token; whole-repo batch-03 scan confirms zero occurrences |
| 2 | FLEET dossier declared `FLEET-BUSINESS` `CONDITIONAL`, contradicting the edition authority and the machine contract (`DEFINED`) | Dossier reconciled to `DEFINED`; open items restated as parameters, not verdict conditions |
| 3 | `npm run format:check` failed on the two validator scripts after extension | `prettier --write` applied; re-check exit 0 |
| 4 | `git diff --check` flagged trailing whitespace and a blank line at EOF in two batch-03 documents | Normalised; `git diff --check` exit 0; content unchanged |
| 5 | WEATHER copy file pair initially missing | Both ES/EN files delivered with 25-heading parity and no `###` |
| 6 | Independent review of commit `64330fa` returned **FAIL**: negative-test gate did not reject natural remote-control/PILOT-authority text, forecast-accuracy percentages or cross-tenant text claims (BLK-01, BLK-02, BLK-03) | Validator claim rules broadened (negation-aware) and 8 exact-string mutation tests added; validator stays 52/52, unit suite now 106/106 |
| 7 | Independent review found the WEATHER dossier body incomplete against its own TOC (MAJ-04: missing 4.3, 4.4, §5, §6 and register rows 15–44) | Root cause: a whole-file re-read/append truncated the tail. Sections restored with substance (coverage check, per-variable metadata, pilot geography/coverage, edition architecture); dossier now 649 lines; TOC and cross-refs reconciled |
| 8 | Absolute host paths to the external programme brief cited as `VERIFIED_REPO` in four files (MIN-05) | Re-cited as "programme brief (external to this repository)"; zero absolute paths remain |
| 9 | JSON attributed OPEN-MARINE source rights to `X-01` (MIN-06) | Corrected to `L-01`, `L-02`, `L-03` with a distinct reason |
| 10 | README claimed the batch-03 contract reuses every batch-02 meta key, but non-applicable alert/safety sections were replaced (MIN-07) | README §30 corrected and the explicit schema delta recorded as decision D-017 |
| 11 | DISPLAY dossier and copy said "approved mount" while the annex said "no mount is approved" (MIN-08) | Reworded to "specified mount family, subject to the installation assessment"; explicit no-approval statements added |
| 12 | Ecosystem overview said "ten mandatory distinctions" while README/decisions say nine (MIN-09) | Corrected to nine; entitlement sharing recorded as a commercial rule (§6 / D-013) |
| 13 | FLEET copy showed AIS traffic context without the approved AIS receive-only disclaimer, and status-line dash drift (OBS-10, OBS-11) | Approved AIS disclaimer added verbatim in ES/EN copy and dossier; status line normalised |
| 14 | Untracked delivery draft asserted PASS before the verdict (OBS-12, process) | Delivery record is committed only after the independent verdict; no pre-emption in the reviewed commit |
| 15 | DISPLAY hardware annex still labelled an "approved mount family" in three requirement rows while stating no mount is approved (MIN-10) | Reworded to "specified mount family (subject to the installation assessment)" in §4, §5.10, §6.1 and §6.2; explicit no-approval wording retained |
| 16 | Reviewer noted 11 paraphrase variants of the prohibited text claims still bypass the heuristic rules (OBS-13), and did not re-fetch external comparator prices (OBS-14) | Recorded as non-blocking residuals: no shipped document contains a bypassing claim; comparator prices stay dated `VERIFIED_EXTERNAL` and are not MAREA evidence. Rule broadening is a recommendation for MC-20–MC-24 |

## 9. What MC-07 does not prove

A documentation PASS does **not** constitute: DISPLAY hardware validation; sunlight/night/thermal/ingress/EMC
evidence; WEATHER forecast accuracy or licences to redistribute or cache provider data; FLEET SaaS implementation,
tenant-isolation runtime proof or security certification; any approval of MAREA pricing; trademark clearance;
source-IP clearance; image-generation authorisation; or commercial availability. All prices are hypotheses; two
batch-03 editions have no price at all.

## 10. Remaining blockers

| Area | State | Why it remains open |
| --- | --- | --- |
| Trademark and identity (`X-01`, `X-02`) | `NOT_GRANTED` | Prior-mark conflict; no clearance; identity provisional |
| OPEN-MARINE ownership (`L-01`–`L-03`) | `NOT_CLEARED` | No assignment chain, no outbound licence position |
| DISPLAY hardware and conformity (`H-04`, `H-05`, `H-11`, `H-06`) | `NOT_STARTED` | No panel, enclosure, BOM, test unit or EMC/RED evidence |
| Data providers (`D-04`, `D-05`, `D-07`, `D-09`, `D-10`) | `NOT_GRANTED` / `UNRESOLVED` | No provider agreement; some official terms unreachable |
| Charts (`D-01`, `D-02`, `D-06`) | `NOT_GRANTED` | No ENC distributor/OEM agreement; no basemap rights |
| PILOT safety (`P-04`, `H-01`, `H-02`, `H-03`) | `BLOCKED` | No bench, E-stop, isolation or sea-trial evidence |
| WATCH implementation (`P-06`, `H-12`) | `NOT_FOUND` | No gateway, no alert-delivery service |
| FLEET multi-tenancy (`P-09`, `X-07`) | `NOT_IMPLEMENTED` | No platform, DPA, SLA instrumentation or security test |
| DISPLAY physical validation (`P-07`) | `NOT_EXECUTED` | No device exists to test |
| Supplier/BOM (`X-05`) | `NOT_ESTABLISHED` | No RFQ, no costed BOM, no manufacturing terms |
| Subscription economics (`X-05`, `X-06`) | `HYPOTHESIS` | Provider costs, willingness-to-pay and churn are unmeasured |
| Imagery (`X-03`) | `BLOCKED` | No provider, credential or budget authorised |
| Publication and sale (`P-10`) | `NOT_AUTHORISED` | All gates above remain open by design |

## 11. Governance and decisions

- **README addendum:** §24–§32 record the batch-03 deliverables, claim rules, permitted price hypotheses, edition authority, additional limitation statements, journey/asset/copy conventions, machine contract/validation scope, cross-product authority additions and the "what MC-07 must not do" boundary.
- **Decisions (append-only):** D-012 (seven-object edition set; DISPLAY size conditional), D-013 (one WEATHER entitlement ledger; no NAV/WEATHER double billing), D-014 (FLEET per-vessel VAT-excluded pricing; Enterprise contracted tier with `NO_SLA_ESTABLISHED`), D-015 (safety/security/data portability never edition features; nine distinctions are engineering requirements), D-016 (one governance system across three batches; batch-03 claim, price and validation rules).
- **Registry:** `MASTER-PROMPT-REGISTRY.md` MC-07 row updated from `PLANNED` to its verified status in the closing commit.
- **No merge, no deploy, no publication, no sale, no image generation, no paid API call, no provider signup, no hardware/radio/steering operation, no customer data.**

## 12. Next milestone

**MC-08 — Commercial bundles, ecosystem compatibility and product packaging** (MAREA START, CRUISE, SAIL,
PROTECT, COMPLETE and the MAREA FLEET package). **Not started by this milestone.** Bundle contents, prices and
publication are governed by MC-08 and nothing here pre-approves them.

## 13. Status statement

MC-07 completes the definition of all nine MAREA product families to one commercial standard. It does not make
any of them real, certified, licensed, priced, published or purchasable. MAREA remains a proposed brand,
EMBARCARTE the seller and contractual party, OPEN-MARINE an internal engineering foundation with unresolved
rights, and all nine products remain **DEFINED**, **NOT_FOR_SALE** and **INTERNAL_ONLY**.
