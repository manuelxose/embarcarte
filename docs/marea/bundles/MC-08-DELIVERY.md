# MC-08 — Delivery record: six commercial solution bundles, configuration contract, subscriptions and unit economics

| Field | Value |
| --- | --- |
| Document ID | MC-08 / DELIVERY |
| Milestone | MC-08 (Master Prompt 08/36) |
| Date | 2026-10-31 (Europe/Madrid) |
| Owner | Lead (Chief Commercial Product Officer) |
| Status | INTERNAL. Delivery record only. Not a commercial release, not a price approval, not a quotation, not an orderable SKU, not a publication authorisation |
| Branch | `feature/marea-mc08-bundles-commercial-architecture` |
| Base | MC-07 HEAD `80c66c70a1bab6f11c5ba5709baa4c1671f1d6da` on `feature/marea-mc07-display-weather-fleet-products` (draft PR #13 still open, so MC-08 stacks on it) |
| Implementation commit | `930fc9c5a8f46ae41c80334ecfde1a4e377ffdc2` — 33 files, +23,177/−4 |
| Review-correction commits | `a977b39` (B-01/B-02/M-01..M-03/m-01..m-03), `c3c1a44` (R-01..R-04), `9a9bc97` (N-01..N-03), `d496d68` (N-04/N-05) |
| Reviewed commit | `d496d683adf44b099192b9425a76de69ccbe81bc` (round 5, final) |
| Independent review | `docs/marea/bundles/MC-08-REVIEW.md` — **PASS (definition scope only)**, five verification rounds; round 1 `930fc9c` PARTIAL, round 2 `a977b39` PARTIAL, round 3 `c3c1a44` PARTIAL, round 4 `9a9bc97` PARTIAL, round 5 `d496d68` PASS |
| Draft PR | [#14](https://github.com/manuelxose/embarcarte/pull/14) — draft, stacked on `feature/marea-mc07-display-weather-fleet-products`, not merged |
| Publication | NOT AUTHORISED |
| Sales | NOT AUTHORISED |
| Production deployment | NOT AUTHORISED |
| Trademark clearance | `NOT_GRANTED` |
| Source IP clearance | `NOT_CLEARED` |
| Bundle availability | All six `DEFINED` / `NOT_FOR_SALE` / `INTERNAL_ONLY` |
| Prices | `HYPOTHESIS_UNAPPROVED` / `NOT ESTABLISHED`; none approved |

## 1. Executive result

**MC-08 PASS — bundle-definition scope.** The independent review's final verdict after five verification
rounds is **PASS (definition scope only)**, recorded in `MC-08-REVIEW.md` §22; it verifies the six bundle
definitions, the machine contract, the configuration/entitlement/pricing/installation/journey/copy/asset
deliverables and the negative-test gate at reviewed commit `d496d68`, with the commercial release status
remaining **BLOCKED / `NOT_FOR_SALE`**.

The milestone delivers six coherent, commercially differentiated, professionally installable and
economically assessed integrated solutions built **only** from the nine existing MAREA product editions:

- **MAREA START** — `HUB-STANDARD` + `NAV-PRO`; onboard data in modern navigation; historical EUR 499 is an
  uninstalled product-only first-year reference (149+349=498), not an installed price.
- **MAREA CRUISE** — `NAV-ESSENTIAL` + `HUB-STANDARD` + `AIS-RECEIVER` + `DISPLAY-7`; licensed navigation and
  receive-only traffic on a fixed helm display; historical EUR 1,399 is a product-only reference
  (99+349+249+699=1,396), **not** an installed-system price.
- **MAREA SAIL** — `NAV-PRO` + `HUB-STANDARD` + `PILOT-COASTAL` (quotation required) + `SENSE-WIND`
  (conditional); `FULL_BUNDLE_PRICE_NOT_ESTABLISHED`, `VESSEL_SURVEY_REQUIRED`,
  `INSTALLER_QUOTATION_REQUIRED`, `PILOT_SAFETY_GATE_BLOCKED`; historical EUR 1,990 is traceability only.
- **MAREA PROTECT** — `WATCH-CORE` + `SENSE-ESSENTIALS` kit (expands exactly to `SENSE-POWER` +
  `SENSE-BILGE`); `HISTORIC_PRICE_NOT_COST_JUSTIFIED` (299+198=497 > 399), final price `OPEN`.
- **MAREA COMPLETE** — `NAV-PRO` + `HUB-PRO` + `DISPLAY-7` + `WATCH-CORE` + four SENSE modules +
  `PILOT-COASTAL` (quotation required); `VESSEL_SPECIFIC_QUOTATION`; `FIXED_TURNKEY_PRICE = NOT_ESTABLISHED`;
  historical EUR 3,490 is not a turnkey price.
- **MAREA FLEET package** — existing `FLEET-START`/`FLEET-BUSINESS` SaaS + separately quoted onboarding,
  registration/migration, training and support; hardware, connectivity, installation and integrations are
  optional/quoted; `BESPOKE_PACKAGE_NOT_ESTABLISHED`; not a tenth family and not a second SaaS.

**What a PASS means and does not mean.** It means the definitions, contract, configuration rules,
entitlement accounting, price challenge and negative-test gate are internally consistent and honest. It does
**not** approve any historical price, establish hardware or compatibility, certify any product, clear the
brand or the source IP, create stock, authorise publication, or make any bundle quotable, orderable or
sellable. A definition PASS is not a release.

## 2. What was delivered

| Id | Deliverable | File | Lines / size |
| --- | --- | --- | --- |
| D1 | Bundle architecture, identity boundaries, reference configurations, vocabulary, 24-field model | `BUNDLE-ARCHITECTURE.md` | 431 |
| D2 | MAREA START — 24-field bundle specification | `MAREA-START-COMMERCIAL-SPEC.md` | 474 |
| D3 | MAREA CRUISE — 24-field bundle specification | `MAREA-CRUISE-COMMERCIAL-SPEC.md` | 499 |
| D4 | MAREA SAIL — 24-field bundle specification | `MAREA-SAIL-COMMERCIAL-SPEC.md` | 498 |
| D5 | MAREA PROTECT — 24-field bundle specification | `MAREA-PROTECT-COMMERCIAL-SPEC.md` | 592 |
| D6 | MAREA COMPLETE — 24-field bundle specification | `MAREA-COMPLETE-COMMERCIAL-SPEC.md` | 482 |
| D7 | MAREA FLEET package — 24-field bundle specification | `MAREA-FLEET-PACKAGE-COMMERCIAL-SPEC.md` | 903 |
| D8 | Composition and exclusions matrix (mandatory/conditional/optional/ineligible) | `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` | 344 |
| D9 | Configuration, dependency, kit-expansion and eligibility rules | `BUNDLE-CONFIGURATION-RULES.md` | 449 |
| D10 | Subscriptions and entitlements matrix, one ledger, local-safety isolation | `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md` | 341 |
| D11 | Pricing and unit-economics framework with six-hypothesis challenge | `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` | 1,420 |
| D12 | Installation, sales-channel and quotation model | `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` | 489 |
| D13 | Six 17-stage journeys + seven cross-sell journeys | `BUNDLE-CUSTOMER-JOURNEYS.md` | 351 |
| D14 | Customer comparison | `BUNDLE-CUSTOMER-COMPARISON.md` | 206 |
| D15 | 12 bilingual internal copy drafts (24 sections each) | `copy/{start,cruise,sail,protect,complete,fleet-package}.{es,en}.md` | 169–216 each |
| D16 | 60 planned visual assets (24 blocked + 30 reused + 6 authored) | `BUNDLE-ASSET-REQUIREMENTS.md` | 351 |
| D17 | Machine-readable bundle contract | `bundle-definitions.json` | 9,605 lines / 411 KB |
| D18 | Bundle validator (35 checks) and negative test suite (50 tests) | `scripts/check-marea-bundles.mjs`, `.test.mjs` | 2,822 / 734 |
| D19 | Independent review (5 rounds, final verdict PASS definition scope) | `MC-08-REVIEW.md` | 1,668 |
| D20 | This delivery record | `MC-08-DELIVERY.md` | — |
| D21 | Governance: decisions D-018–D-025, registry row 08, README unchanged (no product convention changed) | `DECISION-LOG.md`, `MASTER-PROMPT-REGISTRY.md` | — |

No existing product dossier, edition authority, compatibility contract or pricing framework was rewritten.
A historical portfolio wording conflict ("certified supervised pilot") was recorded as decision D-025 and a
required upstream business decision, not silently edited.

## 3. The six commercial solutions

### 3.1 MAREA START (`START`)

- **Target customer:** owner of roughly 8–15 m coastal sail/motor vessel who keeps working instruments and
  wants modern licensed navigation plus onboard data; one vessel, one skipper.
- **Proposition:** existing onboard data visible in modern navigation, locally, without replacing
  instruments; compatibility assessed before commitment.
- **Mandatory:** `HUB-STANDARD`, `NAV-PRO`, required external chart licence/region, customer device,
  cabling/adapters/power items.
- **Optional:** `HUB-PRO`, `WEATHER-STANDARD`, professional installation (required for a mixed-equipment
  refit).
- **Exclusions:** AIS hardware, DISPLAY, PILOT, SENSE, WATCH, FLEET, labour, NMEA 2000, ECDIS, guaranteed
  chart coverage, any steering authority.
- **Subscription:** NAV Pro annual (hypothesis); optional WEATHER annual; no double billing.
- **Installation:** installer-assisted; no verified self-install envelope.
- **Price:** historical EUR 499 — `HYPOTHESIS_UNAPPROVED`; product-only first-year reference (498), installed
  price not established.
- **Major blockers:** H-04/H-05/H-07/P-02 compatibility and hardware; D-01 charts; X-05 pricing; X-01 brand.
- **Readiness:** `DEFINED` / `NOT_FOR_SALE`; compatibility evidence required.

### 3.2 MAREA CRUISE (`CRUISE`)

- **Target customer:** coastal cruiser wanting a fixed helm display, charts, received traffic and onboard
  connectivity; accepts professional installation and licensed charts.
- **Proposition:** coherent integrated cruising interface with licensed navigation and receive-only AIS
  targets; no collision-avoidance guarantee, no AIS transmission, no unrestricted chart rights.
- **Mandatory:** `NAV-ESSENTIAL`, `HUB-STANDARD`, `AIS-RECEIVER`, `DISPLAY-7`, AIS antenna (+ optional
  splitter), mounts/power/cabling, professional installation, chart region.
- **Optional:** `NAV-PRO` upgrade, `WEATHER-STANDARD`/`PRO`, extra mounts.
- **Exclusions:** AIS transmission/transponder/DSC, collision avoidance, `AIS-CONNECTED` (conditional, not
  selected), `DISPLAY-LARGE` (never selectable), PILOT/WATCH/SENSE/FLEET, installation labour.
- **Subscription:** NAV Essential annual (hypothesis); optional WEATHER.
- **Installation:** professional required.
- **Price:** historical EUR 1,399 — product-only reference (1,396); **not** an installed-system price.
- **Major blockers:** H-08/H-05 AIS/RF; H-11 DISPLAY hardware; H-04/H-07 HUB; P-03 integration; D-01 charts.
- **Readiness:** `DEFINED` / `NOT_FOR_SALE`; hardware and integration evidence required.

### 3.3 MAREA SAIL (`SAIL`)

- **Target customer:** sailing-yacht owner wanting an integrated helm with supervised steering, after a
  documented vessel and steering survey.
- **Proposition:** sail-focused integrated helm: navigation context, instrument data, supervised steering and
  measured wind; vessel-specific quotation.
- **Mandatory:** `NAV-PRO`, `HUB-STANDARD`, `PILOT-COASTAL` (`QUOTATION_REQUIRED`), `SENSE-WIND`
  (`CONDITIONAL` as a steering input), survey, drive/actuator, rudder feedback, cabling, E-stop, labour,
  commissioning, supervised sea trial, training, conformity.
- **Optional/excluded:** `PILOT-SAIL` conditional not default; `PILOT-PRO` ineligible as priced SKU;
  `SENSE-SAIL` kit not required; no fixed turnkey price; no remote/autonomous steering.
- **Subscription:** NAV annual; PILOT carries no subscription and no firmware licence check may sit on the
  control path.
- **Price:** historical EUR 1,990 recorded for traceability only; `FULL_BUNDLE_PRICE_NOT_ESTABLISHED`.
- **Major blockers:** `PILOT_SAFETY_GATE = BLOCKED`, E-stop/motor-isolation/rudder `NOT_FOUND`, sea trials
  `NOT_PERFORMED`; H-01/P-04; SENSE accuracy `NOT_MEASURED`.
- **Readiness:** **`BLOCKED`**; quotation and survey only.

### 3.4 MAREA PROTECT (`PROTECT`)

- **Target customer:** absent owner in a marina/mooring who wants power and bilge awareness ashore and
  accepts conditional alerting.
- **Proposition:** WATCH hardware + service with explicit power/bilge sensors, connectivity and subscription;
  honest alert state model.
- **Mandatory:** `WATCH-CORE` (hardware + required monitoring subscription), `SENSE-ESSENTIALS` kit
  (expands to `SENSE-POWER` + `SENSE-BILGE`), cellular/SIM data plan, installation materials/labour,
  commissioning, consent/privacy notice.
- **Optional:** `HUB-STANDARD` local dashboard (not required), tank/environment expansion, `WATCH-PLUS`
  conditional not selectable.
- **Exclusions:** guaranteed/immediate alerts, theft recovery, certified distress, remote switching/helm,
  FLEET platform, SENSE direct cloud alerts, duplicate sensors, NMEA 2000.
- **Subscription:** WATCH monitoring monthly (hypothesis 9.90), SIM/data separate; local sensing/alarms
  survive expiry.
- **Price:** historical EUR 399 + subscription — `HISTORIC_PRICE_NOT_COST_JUSTIFIED`; final price `OPEN`.
- **Major blockers:** P-06 WATCH service `NOT_FOUND`; H-12 connectivity; X-07 identity/privacy; P-05 sensor
  accuracy; H-05 hardware.
- **Readiness:** `DEFINED` / `NOT_FOR_SALE`; final price open.

### 3.5 MAREA COMPLETE (`COMPLETE`)

- **Target customer:** owner/refit customer seeking one coordinated professional boat integration across
  navigation, instruments, display, monitoring and supervised steering.
- **Proposition:** coherent installed solution with per-subsystem acceptance, not a box of every product.
- **Mandatory:** `NAV-PRO`, `HUB-PRO`, `DISPLAY-7`, `WATCH-CORE`, `SENSE-POWER`/`BILGE`/`TANKS`/`ENV`,
  `PILOT-COASTAL` (`QUOTATION_REQUIRED`), survey, labour, commissioning, training, support.
- **Optional:** `AIS-RECEIVER`, `WEATHER-PRO`; `SENSE-SYSTEMS` conditional not reference; `PILOT-SAIL`
  conditional; `DISPLAY-LARGE` ineligible.
- **Exclusions:** fixed turnkey price, remote/autonomous steering, unlimited features/upgrades, AIS transmit,
  unlimited charts, certified/guaranteed service.
- **Subscription:** NAV + WATCH (+ optional WEATHER); SIM/data separate; no combined certification.
- **Price:** historical EUR 3,490 — `FIXED_TURNKEY_PRICE = NOT_ESTABLISHED`; component floor 3,332 before
  labour/steering hardware/conformity.
- **Major blockers:** PILOT safety gate, DISPLAY hardware, WATCH service, HUB hardware, SENSE measurement.
- **Readiness:** **`BLOCKED`**; vessel-specific quotation only.

### 3.6 MAREA FLEET package (`FLEET`)

- **Target customer:** charter company, sailing school, marina, marine maintenance provider, small vessel
  management firm, professional multi-vessel operator.
- **Proposition:** FLEET SaaS plus separately quoted onboarding, registration/migration, training, support and
  optional equipment/connectivity/installation; tenant-safe, read-only telemetry.
- **Mandatory:** `FLEET-START`/`FLEET-BUSINESS` subscription per vessel (VAT excluded hypothesis), onboarding,
  registration/migration, permissions setup, training, support.
- **Optional/quotation:** `WATCH-CORE`/`HUB-STANDARD`/SENSE per vessel, SIM/data, installation, maintenance,
  integrations, contracted SLA only where measurable.
- **Exclusions:** hardware inside the per-vessel fee, cross-tenant access, remote control, unlimited
  vessels/users/storage/API, invented SLA, security certification, Enterprise as checkout SKU.
- **Subscription:** per vessel/month; hardware/connectivity/installation separate.
- **Price:** bespoke; `BESPOKE_PACKAGE_NOT_ESTABLISHED`; no package/onboarding price.
- **Major blockers:** FLEET `NOT_IMPLEMENTED`, WATCH/HUB telemetry `CONDITIONAL`, no SLA, no DPA, X-07.
- **Readiness:** `DEFINED` / `NOT_FOR_SALE`; contracted solution.

## 4. Price analysis

| Bundle | Historical hypothesis | Configuration cost established? | Fixed price permissible? | Recommended commercial model |
| --- | ---: | --- | --- | --- |
| START | EUR 499 | **No** (no BOM/supplier/labour; product-only sum 498) | No — installed price not established | Uninstalled product-only first-year reference + installation/survey quoted separately |
| CRUISE | EUR 1,399 | **No** (product-only sum 1,396; accessories/installation missing) | No — not an installed-system price | Product-only first-year reference + quoted professional installation |
| SAIL | EUR 1,990 | **No** (floor 1,887 excludes steering hardware/labour/commissioning) | **No — prohibited by D-009** | Vessel-specific survey and itemised quotation (`FULL_BUNDLE_PRICE_NOT_ESTABLISHED`) |
| PROTECT | EUR 399 + subscription | **No** (299+198=497 > 399; only 299+99=398 fits one sensor) | No — historic price not cost-justified | Hardware + subscription + installation, final price `OPEN` |
| COMPLETE | EUR 3,490 | **No** (floor 3,332 leaves ~158 for all installation/steering) | **No — prohibited by D-009** | Vessel-specific quotation (`VESSEL_SPECIFIC_QUOTATION`, `FIXED_TURNKEY_PRICE = NOT_ESTABLISHED`) |
| FLEET package | Bespoke | **No** (no onboarding/hardware/connectivity/installation price) | No | Contracted solution; SaaS per vessel/month + separately quoted services/equipment |

**Explicitly:** SAIL and COMPLETE are quotation-based because they contain PILOT (D-008/D-009). No historical
price is validated, no supplier quotation exists, and no discount or margin is approved. A PASS does not
approve any of these amounts.

## 5. Configuration

- **Canonical product/edition references:** all bundle lines resolve against the three product contracts
  (9 families / 26 editions / 3 SENSE kits), not a parallel registry. `AIS-CONNECTED` conditional/not
  selected; `DISPLAY-LARGE-CONDITIONAL` ineligible/never selectable; `PILOT-PRO` never a priced retail SKU;
  `SENSE` kits expand only to declared modules.
- **Composition:** START (HUB-STANDARD + NAV-PRO); CRUISE (NAV-ESSENTIAL + HUB-STANDARD + AIS-RECEIVER +
  DISPLAY-7); SAIL (NAV-PRO + HUB-STANDARD + PILOT-COASTAL quoted + SENSE-WIND); PROTECT (WATCH-CORE +
  SENSE-ESSENTIALS); COMPLETE (NAV-PRO + HUB-PRO + DISPLAY-7 + WATCH-CORE + four SENSE modules +
  PILOT-COASTAL quoted); FLEET package (FLEET subscription + services; equipment optional).
- **Compatibility decisions:** bundle-level compatibility is carried per integration row; **0 rows are
  `SUPPORTED`/`TESTED`**. Unknown compatibility produces `COMPATIBILITY_EVIDENCE_REQUIRED` or
  `SPECIALIST_SURVEY_REQUIRED`, never a compatibility claim.
- **Internal outcomes only:** `CONFIGURATION_DEFINED_INTERNAL`, `COMPATIBILITY_EVIDENCE_REQUIRED`,
  `SPECIALIST_SURVEY_REQUIRED`, `QUOTATION_REQUIRED`, `NOT_ELIGIBLE`, `PUBLICATION_BLOCKED`; no
  `ORDERABLE`/`FOR_SALE`/`APPROVED` state exists.
- **Conflict detection:** 20 mandatory conflict rules (missing mandatory component, duplicate product,
  kit+loose sensor double count, incompatible edition, AIS transmit, NMEA 2000 certification, unfrozen display
  size, priced PILOT-Pro, PILOT in fixed-price checkout, WATCH without entitlement, subscription-free
  monitoring, missing chart/data entitlement, NAV/WEATHER double charge, unverified sensor accuracy,
  unverified compatibility as SUPPORTED, FLEET package/SaaS confusion, cross-tenant grant, remote PILOT
  path, approved price without costs, blocked product promoted to sale).
- **Mandatory questionnaires:** general (13 questions), safety-sensitive (vessel/steering survey for
  SAIL/COMPLETE), B2B (organisation/fleet/roles/retention for FLEET package). Unknown compatibility →
  human assessment; failed safety prerequisite → blocked; no supported integration → not eligible; unverified
  edition → conditional, not sellable.
- **Negative tests:** all 21 mandated mutations plus 39 additional adversarial tests (60 total) are rejected
  by the real CLI on throwaway fixtures.

## 6. Entitlements

- **NAV:** one-year subscription hypothesis, annual renewal, licensed chart region, own-data export,
  offline only where licensed, device limits per edition; cancellation preserves customer-owned records.
- **WEATHER:** standalone or NAV-shared read where provider rights allow (`CONDITIONAL`); one entitlement
  ledger; prorated upgrade; **no double billing** with NAV; expiry/licence loss produces honest
  unavailable data, never a fabricated forecast.
- **WATCH:** customer owns hardware; required monitoring subscription; device identity/ownership transfer
  `NOT_FOUND`; SIM/data separate; retention/quota `OPEN`; cancellation stops remote alerts while local
  measurement and local alarms continue.
- **FLEET:** per-vessel/month subscription, edition and explicit limits, VAT excluded; hardware, onboarding,
  connectivity and installation are never included by default; retention and termination defined by contract;
  no invented SLA.
- **Isolation:** commercial expiry/payment failure never disables PILOT manual steering, independent local
  steering, valid local measurement, required local alarms or safety fallback. This is a design requirement,
  not a tested behaviour. No billing or entitlement service exists.

## 7. Commercial content

- **12 ES/EN copy drafts:** exactly 24 numbered sections each, matching structure, verbatim approved
  navigation/AIS/PILOT/weather/brand disclaimers by surface, internal-draft limitation statements where
  relevant, zero prices/currency, no enabled purchase CTA, no stock/reviews/certifications/availability, no
  "turnkey", no autonomous/guaranteed-delivery claims. Bundle and product names untranslated.
- **Comparison:** customer-understandable comparison of the six solutions, optional additions, exclusions,
  installation/subscription models, honest limitations and upgrade paths, with no price.
- **Journeys:** six 17-stage journeys (README §22 model, MC-08 labels mapped by D-024) and seven mandated
  cross-sell paths (START→CRUISE; START→SAIL with survey; CRUISE→COMPLETE with survey; PROTECT→expanded
  SENSE; PROTECT→FLEET package; NAV subscriber→START; WEATHER standalone→NAV without double billing).
- **Visual assets:** 60 planned assets = 24 `BLOCKED_ON_IMAGE_GENERATION` + 30 reused MC-04 vector/brief
  concepts + 6 authored specifications; bilingual alt text; no generated file, no real-product claim, no
  published MAREA identity.
- **Missing images and rights:** all scene imagery remains blocked on X-03 (no provider, credential, budget
  or authorisation); trademark clearance and source-IP clearance remain `NOT_GRANTED`/`NOT_CLEARED`.

## 8. Testing and quality gates

All commands were executed on the MC-08 branch at the reviewed commits. Exact final results:

| Gate | Result |
| --- | --- |
| `npm run format:check` | PASS — "All matched files use Prettier code style!" |
| `npm run build` | PASS (exit 0; CommonJS optimization warnings only) |
| `npm run test:i18n` | PASS |
| `npm run test:commerce` | PASS |
| `npm run test:seo` | PASS — 101 sitemap URLs, canonical/hreflang/JSON-LD/private noindex |
| `npm run test:backup` | PASS — snapshot, checksums, integrity, restore verified |
| `npm run test:brand` | 21/21 checks |
| `npm run test:brand:unit` | 13/13 tests |
| `npm run test:products` | 52/52 checks, 51/51 files (nine-product regression) |
| `npm run test:products:unit` | 106/106 tests |
| `npm run test:bundles` | 35/35 checks, 43/43 scoped files, 60 assets, 6 bundles |
| `npm run test:bundles:unit` | 60/60 tests (21 mandated negative mutations + 39 additional) |
| `npm run test:e2e` | 15/15 Playwright Chromium tests |
| `npm audit --omit=dev --audit-level=high` | 0 vulnerabilities |
| `git diff --check` | clean |

**Additional quality gates:** six bundle definitions; 144 complete bundle fields (6 × 24, each with five
labelled lines); twelve ES/EN drafts; correct product/edition references; compatibility rules; subscription
entitlement consistency; historical price challenge; PILOT quotation enforcement; no sale activation; no
fabricated asset; cross-batch product regression; independent adversarial testing; correct Git/PR stacking.

**Independent review rounds:** round 1 (`930fc9c`) PARTIAL — 2 BLOCKING validator-coverage defects and
3 MAJOR gaps, all corrected in `a977b39`; round 2 (`a977b39`) PARTIAL — 1 MAJOR residue and 3 MINOR
documentation/coverage issues, corrected in `c3c1a44`; round 3 (`c3c1a44`) PARTIAL — 3 bounded MINOR
detector defects, corrected in `9a9bc97`; round 4 (`9a9bc97`) PARTIAL — 2 bounded MINOR detector/documentation
defects (Unicode Spanish copula; governance-quoted stale rule), corrected in `d496d68`; round 5 (`d496d68`)
**PASS (definition scope only)** after independent re-verification of every closed finding, 6/6 regression
probes rejected, 4/4 definitional sanity sentences accepted. No reviewer finding was closed by assertion; the
reviewer performed every re-verification on the real artefacts.

## 9. External blockers (unchanged by MC-08)

- **MAREA trademark legal clearance:** `NOT_GRANTED` (X-01); public brand use remains NO-GO.
- **OPEN-MARINE ownership/source-IP clearance:** `NOT_CLEARED` (L-01–L-03).
- **Chart / weather / AIS-derived data rights:** `NOT_GRANTED` (D-01–D-10); no licensed coverage.
- **NMEA / compatibility:** no NMEA 2000 certification/implementation; 0 compatibility rows tested
  (H-04, H-05, H-08, P-02, P-03).
- **Hardware BOM, supplier quotations and conformity:** none (H-05, H-06, H-07, H-11, H-13, X-05).
- **PILOT safety and sea trials:** safety gate `BLOCKED`; E-stop/motor isolation/rudder feedback `NOT_FOUND`;
  sea trials `NOT_PERFORMED` (H-01, H-03, H-10, P-04).
- **WATCH service, identity, notification, subscription and connectivity:** `NOT_FOUND`/`NOT_VERIFIED`
  (P-06, H-12, X-07).
- **FLEET implementation, tenant isolation runtime and SLA:** `NOT_IMPLEMENTED`/`NO_SLA_ESTABLISHED`
  (P-09, X-07).
- **Supplier, installer and channel quotes; labour rates; measured installation scope:** none (X-05, X-06).
- **Image generation and visual rights:** blocked (X-03); no file exists.
- **Approved price and public release:** none; all prices `HYPOTHESIS_UNAPPROVED`/`NOT ESTABLISHED`.
- **VAT treatment and seller/legal identity:** OPEN (X-02).
- **Customer/market evidence and willingness to pay:** none (MC-09 not started).

## 10. Deliverable state and authorisations

| Dimension | Value |
| --- | --- |
| Bundle lifecycle | Six `DEFINED` internally |
| Commercial availability | `NOT_FOR_SALE` (all six) |
| Publication state | `INTERNAL_ONLY`; no page, route, catalogue entry or checkout |
| Price status | `HYPOTHESIS_UNAPPROVED` / `NOT ESTABLISHED`; no `APPROVED` price |
| Compatibility | 0 `SUPPORTED`/`TESTED` rows |
| Certification | None claimed or held |
| Images | 0 generated; 60 planned requirements |
| Source/working tree | Only bundle docs, bundle scripts, `package.json` script/format entries, DECISION-LOG and registry changed; no `src/`, `public/`, `e2e/`, product dossier, brand doc or deployment change |
| Merge | Not performed |
| Deployment | Not performed |
| Publication | Not performed |
| Sales / orders / payments | Not performed; no customer data processed |
| Paid external services | None used |
| Hardware operation | None performed |
| Git | Branch `feature/marea-mc08-bundles-commercial-architecture`; draft PR #14 stacked on the MC-07 branch; not merged |

## 11. Next milestone

**MC-09 — Market validation, buyer discovery, competitor positioning and willingness-to-pay research.**
MC-09 is not started by this milestone. MC-08 hands it: the six fixed bundle identities and reference
configurations, the price hypotheses and their unresolved cost inputs, the compatibility/survey questions that
block qualification, the entitlement/tenancy boundaries, and the explicit prohibition on treating any bundle as
sellable until price, compatibility, safety, rights and publication gates close.

*This delivery record is evidence of an internal definition milestone only. It is not a commercial release,
not a price approval, not a certification, not a compatibility statement, not a quotation, not an orderable
SKU, not a warranty and not a publication authorisation. MAREA is a proposed brand and is not legally cleared;
OPEN-MARINE source rights are not cleared; no product or service described here is available for purchase.*
