# MC-05 — Delivery record: MAREA NAV, MAREA HUB and MAREA AIS final commercial product definitions

| Field | Value |
| --- | --- |
| Document ID | MC-05 / D12-DELIVERY |
| Milestone | MC-05 (Master Prompt 05/36) |
| Date | 2026-10-30 |
| Owner | Lead (Chief Product Officer) |
| Branch | `feature/marea-mc05-nav-hub-ais-products` |
| Base | `8ac6d69` (MC-04 HEAD, `COMMERCIAL-PORTFOLIO.md` and the MC-04 identity system delivered) |
| Implementation HEAD | `02d8275` (pushed); content commits `c2ec8b0`, `5477ab6`, `88c4300`, `71a0a41`, `02d8275` |
| Pull request | [PR #11](https://github.com/manuelxose/embarcarte/pull/11) — **draft**, stacked on `feature/marea-mc04-visual-identity` (PR #10) |
| Independent review | `docs/marea/products/MC-05-REVIEW.md` — **PASS** for the product-definition scope, 0 blocking defects |
| Products | MAREA NAV (Essential, Pro), MAREA HUB (Standard, Pro), MAREA AIS (Receiver, Connected — Connected `CONDITIONAL / NOT_YET_JUSTIFIED`) |

## 1. Executive result

**MC-05 — PASS for its product-definition scope.** The three products are completely specified as final
commercial propositions, in both languages, with editions, inclusions/exclusions, integrations, journeys,
support model, pricing framework, machine-readable contract and deterministic validation. The independent
reviewer verified the real deliverables and the real diff and issued PASS with zero blocking and five minor
findings, all of which were fixed in `71a0a41` and re-verified.

This PASS approves **specification completeness only**. It is not a release and does not change any product
status:

| Dimension | Value after MC-05 |
| --- | --- |
| `PRODUCT_DEFINITION` | `COMPLETE_TARGET_SPECIFICATION` |
| `ENGINEERING_READINESS` | `EVIDENCE_BASED` (partial, narrow — MC-02 audit evidence only) |
| `COMMERCIAL_AVAILABILITY` | `NOT_FOR_SALE` — no SKU is orderable |
| `BRAND_CLEARANCE` | `NOT_GRANTED` — public MAREA use remains NO-GO |
| `SOURCE_IP_CLEARANCE` | `NOT_CLEARED` |
| `PRICING` | `HYPOTHESIS_UNAPPROVED` — no price is approved or publishable |
| `PUBLICATION_STATE` | `INTERNAL_ONLY` |
| Lifecycle (all three) | `DEFINED` |

**Application test status:** PASS — every existing repository gate was run on this branch and passes.
**Hardware status:** `NOT_VERIFIED` — no product hardware, RF, EMC, ingress, sea-trial or conformity evidence
exists or is claimed.
**Commercial release status:** **BLOCKED** by the external gates listed in §8.

## 2. What was delivered

| Id | File | Lines | Content |
| --- | --- | ---: | --- |
| D1 | `docs/marea/products/MAREA-NAV-COMMERCIAL-SPEC.md` | 516 | 24-field final specification, 30 capability domains, editions, journeys A–G, 15 classified acceptance scenarios, blocker traceability |
| D2 | `docs/marea/products/MAREA-HUB-COMMERCIAL-SPEC.md` | 614 | 24-field final specification, 28 capability domains, compatibility policy, installer proposition, 5 journeys, 8 acceptance scenarios |
| D3 | `docs/marea/products/MAREA-AIS-COMMERCIAL-SPEC.md` | 554 | 24-field final specification, 26 capability domains, receive-only discipline, per-SKU included/excluded decisions, journeys A–F, 9 acceptance scenarios |
| D4 | `docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` | 322 | Edition authority: 6 edition ids, per-feature inclusion status and rationale, cross-product boundaries, upgrade logic, open edition questions |
| D5 | `docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` | 431 | 15-column compatibility model, 21 rows (16 UNKNOWN / 4 BLOCKED / 1 PROHIBITED / 0 TESTED), customer + engineering views, 8 standalone/connected combinations, questionnaire with 4 deterministic outcomes |
| D6 | `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL.md` | 400 | Price-hypothesis register, 16 verified comparators (7 brands, dated 2026-10-30), hardware/software cost frameworks, symbolic contribution formula, VAT and channel model, 15-item data-acquisition list |
| D7 | `docs/marea/products/CUSTOMER-JOURNEYS-NAV-HUB-AIS.md` | 400 | 17-stage × 3-product blueprint (8 columns per stage), 8 cross-product journeys, decision points, failure/recovery, trust moments, future-milestone acceptance criteria |
| D8 | `docs/marea/products/copy/{nav,hub,ais}.{es,en}.md` | 236/236, 238/238, 243/243 | Six page-ready bilingual drafts, 24 sections each, approved disclaimers verbatim, lifecycle-appropriate CTAs, ES/EN parity |
| D9 | `docs/marea/products/PRODUCT-ASSET-REQUIREMENTS.md` | 541 | 30 fully specified assets (10 per product), 12 `BLOCKED_ON_IMAGE_GENERATION`, 18 `CONCEPT`, 0 claimed as real; real MC-04 asset ids verified |
| D10 | `docs/marea/products/product-definitions.batch-01.json` | 2 070 | Internal product-definition contract: 3 × 24 fields (72 entries, 286 traceable refs), editions, nine readiness dimensions, lifecycle D-007, restrictions |
| D11 | `scripts/check-marea-products.mjs` + `.test.mjs` | 1 759 + 748 | Scoped deterministic validator (22 checks, offline, dependency-free) + 38 `node:test` negative/positive tests |
| D12 | `docs/marea/products/MC-05-DELIVERY.md` | 272 | Delivery record |
| D13 | `docs/marea/products/MC-05-REVIEW.md` | 393 | Independent review (author ≠ reviewer) with post-verdict corrective-action addendum |
| — | `docs/marea/execution/DECISION-LOG.md` | — | D-007 (lifecycle reconciliation, edition structure, price status) |
| — | `package.json` | — | `test:products`, `test:products:unit`, formatter coverage for both new scripts |

## 3. The three product propositions

### MAREA NAV
- **Ideal customer:** day and coastal cruiser who plans at home and navigates with a phone/tablet on a 8–15 m
  sail or motor boat, often with older instruments he does not want to replace.
- **Main benefit:** one coherent navigation workspace — plan, keep the log, navigate a licensed chart area, and
  see the boat's supported data in the same place.
- **Final offer:** licensed-chart navigation, route/waypoint/passage planning and editing, route libraries,
  saved destinations, GNSS positioning, heading/speed/course, logbook and history, AIS traffic display where AIS
  data exists, licensed weather/tide/current layers with source and freshness, offline regions where legally
  supported, import/export of own records, multi-device account, honest degraded states, accessibility, updates.
- **Editions:** `NAV-ESSENTIAL` (planning + chart entitlement + basic traffic and basic licensed forecast views +
  logbook + export) and `NAV-PRO` (adds live instrument overlays, CPA/TCPA and alert rules, advanced weather/route
  overlays, legally supported offline regions, route insights, multi-device). No third tier.
- **Included / not included:** the app entitlement only. AIS hardware, GNSS receiver, HUB, unlimited or global
  official charts, a weather licence for every provider, ECDIS status, collision-avoidance guarantees and
  continuous connectivity are all explicitly excluded.
- **Integrations:** optionally HUB (onboard data), AIS receiver (traffic), WEATHER entitlement sharing (no double
  billing). Standalone operation is a required design property.
- **Commercial model:** annual subscription, VAT-inclusive consumer hypothesis.
- **Price hypothesis:** Essential EUR 99/year, Pro EUR 149/year — `HYPOTHESIS_UNAPPROVED`.
- **Main release blocker:** chart/ENC distribution rights (`D-01`–`D-03`, `DEC-02`) and at least one verified
  live-data path before Pro can be sold.

### MAREA HUB
- **Ideal customer:** owner of an older boat with mixed, functional electronics; refit installers; marinas and
  maintenance companies working on several vessels.
- **Main benefit:** make the equipment already aboard work together through one local, consistent information
  experience — without replacing working instruments.
- **Final offer:** a local-first onboard appliance that ingests supported sources (GNSS, compatible NMEA 0183,
  Signal K, instruments, AIS, wind, depth, battery/utility), normalises them into one documented vocabulary,
  publishes them on the vessel network, shows a local dashboard, and provides connection diagnostics,
  installation status, device identity, configuration, retention, offline operation, safe degradation, updates
  with rollback, backup/recovery, ownership transfer, installer handover and support.
- **Editions:** `HUB-STANDARD` (defined, published base interface/connection envelope) and `HUB-PRO` (wider
  validated families, more integration capacity, deeper configuration/diagnostics, installer tooling and
  commissioning record). The difference is a validated envelope plus installer value, never "more powerful".
- **Included / not included:** appliance plus SKU-specified mounting/power items and setup guide. Excludes
  marine network backbone, licensed vendor cables, antenna, AIS receiver, NAV/WEATHER subscription, universal
  compatibility and installation (quoted).
- **Integrations:** optional AIS receiver; publishes to NAV or any compatible consumer; no steering or autopilot
  control path, ever.
- **Commercial model:** one-off hardware + optional professionally quoted installation.
- **Price hypothesis:** Standard EUR 349, Pro EUR 499 — `HYPOTHESIS_UNAPPROVED`, no BOM.
- **Main release blocker:** protocol/hardware realisation (`H-04` NMEA 2000 unresolved, `H-05`/`H-07` no hardware
  or BOM), CE/RED/EMC/GPSR/CRA conformity (`H-06`, `H-13`) and zero tested compatibility rows.

### MAREA AIS
- **Ideal customer:** leisure sailor or coastal motorboat owner who wants to see nearby traffic on equipment he
  already has, without buying a transponder or replacing his electronics.
- **Main benefit:** receive-only traffic awareness that complements navigation and existing electronics, with
  honest limits.
- **Final offer:** a receive-only AIS package that listens to AIS broadcasts, presents vessel and target data
  (identity, position, course, speed, type), a target list with detail, position/heading data requirements
  stated, CPA/TCPA where valid own-vessel data exists (computed by the consuming application), configurable
  alerts in the application, stale/missing-target behaviour, receiver status, local output to a compatible
  consumer, diagnostics, firmware update policy, onboarding, support, warranty and documented RF conformity
  requirements.
- **Editions:** `AIS-RECEIVER` (base receive-only package with a single documented output) and `AIS-CONNECTED`
  (multi-consumer local networking, extended diagnostics, managed HUB integration, target history, guided
  commissioning). **Connected verdict: `CONDITIONAL / NOT_YET_JUSTIFIED`** — it may only ship if the frozen
  hardware evidences those differences; otherwise one SKU plus an optional accessory.
- **Included / not included:** receiver unit, power lead, quick-start and mounting bracket intended per SKU
  (procurement-dependent, `OPEN`). Antenna, VHF splitter, mast coax, installation, NAV licence, HUB, network
  backbone and any transmission capability are excluded and never implied to be free.
- **Integrations:** NAV (visualisation), HUB (managed local source); both optional.
- **Commercial model:** one-off receive-only hardware (+ optional installation).
- **Price hypothesis:** Receiver EUR 249, Connected EUR 399 — `HYPOTHESIS_UNAPPROVED`.
- **Main release blocker:** receiver hardware selection + RF/EMC/RED conformity (`H-08`), decoder licensing
  strategy (`S-01`, `DEC-04`) and AIS-derived data retention/redistribution rights (`D-09`).
- **Never claimed:** transmission, transponder, DSC, collision avoidance, guaranteed detection/range, or
  replacement of watchkeeping.

## 4. Commercial system and relationships

- **Three distinct types:** NAV is a software subscription with a licensed-data entitlement; HUB is a hardware
  integration appliance; AIS is receive-only hardware. The dossiers and D4 keep this distinction explicit; no
  product inherits another's capability.
- **NAV operates without HUB.** HUB is not a prerequisite for standalone navigation.
- **HUB is local-first.** Loss of the commercial website connection must not interrupt safety-relevant local
  functions; it is not a subscription-dependent service.
- **AIS is always a separate hardware purchase.** "NAV shows AIS" never means "NAV includes AIS".
- **Integration is conditional, not assumed.** D5 defines 21 compatibility rows; **zero are tested**. No
  combination may be sold on an untested compatibility assumption or implied universal compatibility.
- **WEATHER is entitled once.** Sharing across NAV accounts is specified; double billing is prohibited in all
  three dossiers and in the copy.
- **Bundles:** MAREA START (NAV + HUB) and MAREA CRUISE (NAV + HUB + AIS + DISPLAY) are ecosystem context only —
  contents, prices and publication are governed by MC-08 and are not finalised here.
- **Installation:** EMBARCARTE offers a documented professional service (questionnaire → equipment inventory →
  compatibility assessment → proposal → materials → scheduled installation → configuration → function checks →
  handover → training → support/warranty → later upgrades), distinguishes self-install for low-risk documented
  configurations, refuses or escalates out-of-envelope configurations, and never states an unmeasured duration
  or price.
- **Channel:** direct-to-consumer and installer-led models are defined as principles (discount methodology,
  labour separation, warranty/returns/support/renewal ownership, distributor margin consideration) with no
  invented percentages and no reseller contract.
- **Still missing for a commercial offer:** real per-SKU BOM and supplier quotations, conformity and
  certification quotes, chart/weather/tide licence terms, payment and fulfilment rates, installer day rates and
  measured times, channel terms, tax advice and willingness-to-pay evidence. These are enumerated in D6 §11.

## 5. Content and visuals

- **Six ES/EN page drafts** cover all 24 required page sections, use the approved disclaimers verbatim, the
  Draft/Internal/Not-for-sale banner, and lifecycle-appropriate CTAs only ("See the specification" /
  «Ver la especificación»; "Request a compatibility review" / «Solicitar estudio de compatibilidad»). They state
  that interest lists are not open. No price, stock, certification, testimonial, rating or scarcity claim
  appears in any copy file; ES and EN have identical edition-table row counts and inclusion values.
- **30 product assets specified** (hero, in-use, overview, editions, ecosystem, installation, mobile crops,
  thumbnail, social/OG, technical). **12 are `BLOCKED_ON_IMAGE_GENERATION`**; 18 are authored-vector/specification
  concepts. **0 assets are claimed as real photography or real CGI.**
- **MC-04 assets reused internally** (verified against `MC-04-ASSETS.yaml`): `MR-DIA-001` receive-only AIS
  diagram, `MR-DIA-003` ecosystem overview, `MR-DIA-002` pilot boundary (context only), `MR-ICO-001` 57-icon set,
  `MR-BRD-001/002/003/005` lockups, `MR-BRD-006/007` app icons, `MR-BRD-008` OG card method, `MR-BRD-011`
  packaging dielines, `MR-BRD-012` installer record, `MR-EVD-001` evidence renders. All remain PROPOSED and
  internal; no public identity is adopted.
- **Image generation remains BLOCKED** (no provider, no budget, no credential — X-03). No stock substitution, no
  fake product render, no dashed-path placeholder.

## 6. Evidence, validation and independent review

**Completeness.** 24/24 canonical fields for each of NAV, HUB and AIS, each with Definition, Evidence, Owner,
Blockers/dependencies and Commercial readiness; 0 `TBD`; all prices labelled `HYPOTHESIS_UNAPPROVED`; all
supplier/certification/test/availability claims absent.

**Deterministic validation.** `npm run test:products` → **22 checks, 22 pass, RESULT: PASS** (15 scoped files read;
no broad repository scan). `npm run test:products:unit` → **38 tests, 38 pass**. The validator fails purchasing
states, approved/final prices, clearance claims, AIS transmission claims, NMEA 2000 certification claims, chart
rights claims, naming conflicts, missing fields, missing copy language/parity, invalid asset references,
misleading compatibility assertions and missing disclaimers. Independent mutation tests by the reviewer confirmed
the rules are live.

**Existing repository gates** (all exit 0 at this branch, run as the final evidence):

| Gate | Result |
| --- | --- |
| `npm run format:check` | PASS |
| `npm run build` | PASS |
| `npm run test:i18n` | PASS |
| `npm run test:commerce` | PASS |
| `npm run test:seo` | PASS |
| `npm run test:backup` | PASS |
| `npm run test:brand` | PASS |
| `npm run test:brand:unit` | PASS |
| `npm run test:e2e` | PASS (15/15) |
| `npm run test:products` | PASS (22/22) |
| `npm run test:products:unit` | PASS (38/38) |
| `npm audit --omit=dev --audit-level=high` | PASS (0 vulnerabilities) |
| `git diff --check 8ac6d69..HEAD` | PASS (exit 0) |

The full suite above was executed on this branch at `71a0a41`; the only later change is a whitespace-only
end-of-file removal in one Markdown file (`02d8275`), after which `git diff --check 8ac6d69..02d8275` was re-run
clean. The independent reviewer re-ran the product gates and `git diff --check` at `71a0a41` and confirmed no
regression.

**Independent review.** `MC-05-REVIEW.md`: **PASS**, covering all 20 mandated review questions, the real diff,
all gates, comparator re-verification (3 rows independently re-fetched), and 30/30 asset ids / 25/25 MC-04 ids.
Findings: 0 blocking, 5 minor, 3 observations. Corrective actions: **all five minor findings fixed** in
`71a0a41` (formatter coverage of the new scripts; bundle-context price rule in README §8; machine-readable
edition verdicts now `DEFINED` for the five retained editions and `CONDITIONAL / NOT_YET_JUSTIFIED` for
AIS Connected, enforced by the validator and a new negative test; CTA wording aligned; HUB F04 installation
wording aligned), plus a whitespace-only EOF fix in `02d8275`. The reviewer's §11 addendum re-verified all five
fixes independently (including mutation tests on the new edition rules) and confirmed **no new defect or
regression**; the original PASS stands. Three observations were accepted as-is with rationale (no dedicated
negative tests for three structural checks — confirmed live by mutation; two pre-existing repository patterns).
One residual note: `docs/marea/brand/BRAND-VOICE-ES-EN.md` still prescribes an older `DEFINED` CTA wording than
the claims policy; that file is outside MC-05's authorised write scope and the alignment is deferred to a later
brand-governance pass.

## 7. Scope discipline

The implementation commits (`c2ec8b0`…`02d8275`) change only the authorised paths: `docs/marea/products/**`,
`scripts/check-marea-products.mjs`, `scripts/check-marea-products.test.mjs`, the two script/format lines added to
`package.json`, and decision D-007 in `docs/marea/execution/DECISION-LOG.md`. The milestone-closing commits add
only this delivery record, the independent review report and the `MASTER-PROMPT-REGISTRY.md` row 05.
**Nothing changed** under `src/`, `public/`, `e2e/`, `.github/`, `deploy/`; no change to checkout, prices, stock,
payment configuration, deployment workflow, `OPEN-MARINE`, the brand-identity adoption state, the trademark
state or any brand-governed document. No dependency was added or upgraded. No secret or credential was added.
No merge, no deploy, no publication, no purchase flow, no image generation and no chargeable external API call
was made.

## 8. Unresolved external gates (all recorded, none closed by MC-05)

| Gate | Status | Blocking ids |
| --- | --- | --- |
| MAREA trademark clearance / public brand use | `NOT_GRANTED` / NO-GO | `X-01`, MC-03 OPTION B |
| OPEN-MARINE ownership, contribution chain and outbound licence | `NOT_CLEARED` | `L-01`–`L-05`, `S-08`, `DEC-01` |
| Chart/ENC distribution rights (NAV, offline regions) | `BLOCKED` | `D-01`–`D-03`, `DEC-02` |
| Weather/tide data provider rights | `BLOCKED` | `D-04`, `D-05`, `D-07`, `DEC-03` |
| AIS receiver hardware, RF and radio conformity | `BLOCKED` | `H-08`, `H-05`, `S-01`, `DEC-04` |
| HUB protocol compatibility and hardware realisation | `BLOCKED` | `H-04`, `H-05`, `H-07`, `DEC-05` |
| Hardware conformity (CE/EMC/RED/LVD/GPSR/RoHS/WEEE/CRA) | `NOT_STARTED` | `H-06`, `H-13` |
| AIS-derived data retention / redistribution | `LEGAL_REVIEW_REQUIRED` | `D-09` |
| BOM, supplier quotations, unit economics, channel terms | `BLOCKED` | `X-05`, `H-07`, `H-12` |
| Customer willingness-to-pay / discovery | `BLOCKED` | `X-06`, MC-09/MC-10 |
| Product imagery (photography, CGI) | `BLOCKED_ON_IMAGE_GENERATION` | `X-03`, `H-05`, `H-07`, `D-005` |
| Public publication and commercial availability | `NOT_FOR_SALE` / `INTERNAL_ONLY` | all of the above + `X-04` |
| Legal seller identity for warranty/support publication | `BLOCKED` | `X-02` |

**Data-quality note for MC-09.** Two anchors in `docs/marea/MARKET-BENCHMARKS.md` (the Garmin Navionics
EUR 34.99 and Yacht Devices EUR 249.07 entries, and the AIS100 "EUR 360/420" band) could not be reproduced on
2026-10-30. MC-05 does not modify that predecessor document (out of its authorised scope); D6 carries the
re-verified figures and the dossiers cite D6. MC-09 must reconcile `MARKET-BENCHMARKS.md` with D6 before the
next market-evidence claim is made.

## 9. Milestone status separation (mandatory reading)

| Statement | Status |
| --- | --- |
| MC-05 product definition | **PASS** — complete, internally consistent, independently reviewed |
| Existing application test suite | **PASS** — all repository gates run and green |
| Hardware / RF / EMC / sea-trial validation | **NOT_VERIFIED** — no physical product exists |
| Commercial release / sale | **BLOCKED** — `NOT_FOR_SALE`, brand and IP uncleared |

A definition PASS is not a release. Nothing in this milestone authorises selling, publishing, pre-selling,
certifying or pre-ordering any MAREA product.

## 10. Next milestone

**MC-06 — Complete commercial product definitions for MAREA PILOT, MAREA SENSE and MAREA WATCH.** Not started.
MC-06 must reuse `docs/marea/products/README.md` as its binding conventions document (24 fields, evidence
classes, lifecycle D-007, readiness dimensions, claim rules) and must keep the PILOT safety gate, the sensor
measurement claims and the WATCH connectivity/subscription claims honest. No product from MC-06 may be
presented as available, and MC-06 must not start until it is explicitly instructed.
