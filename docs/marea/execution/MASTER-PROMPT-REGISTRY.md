# MAREA — Master prompt registry (36-prompt program)

Status: GOVERNING PLAN. Owned by the Lead. Last updated: 2026-10-30 (MC-03).
Repository: `manuelxose/embarcarte`. Related technology repository: `manuelxose/open-marine`.
Execution environment: DeepSeek Harness Desktop `0.2.1-rc.5`, profile `desktop`.

## Purpose and honesty rules

- This registry tracks the 36 Master Prompts of the MAREA commercialization
  program. **Prompts 01 and 02 exist as received Master Prompts.** Prompt 02 was
  received as the technology/IP/licensing audit and required a schedule change
  (decision D-001, below); prompts 03–36 remain planning placeholders derived
  from the committed commercial roadmap and the MC-01/MC-02 mandates. When the
  client issues each Master Prompt, its actual text is authoritative and may
  rebind, reorder or split the planned objective; update this registry at that
  time.
- A prompt is **never** marked complete until its acceptance evidence exists in
  the repository and an independent reviewer has verified it.
- Status vocabulary: `PLANNED` (not started), `IN PROGRESS`, `PARTIAL`
  (committed work + recorded external blocker), `PASS` (all criteria verified),
  `BLOCKED`, `FAIL`.
- Commercial facts (stock, certification, sea trials, supplier quotes, prices,
  trademarks) need their own evidence class; documentation alone cannot PASS a
  functionality or physical-validation prompt.
- An audit milestone may PASS while external permissions remain BLOCKED, provided
  every permission is explicitly classified as BLOCKED and the affected commercial
  activities remain restricted. No such PASS clears any product for sale.

## Program shape (after decision D-001)

| Phase | Prompts | Focus |
|---|---|---|
| 0 — Foundation | 01–04 | Execution environment, technology/IP/licensing audit, brand architecture/legal, identity system |
| 1 — Product truth | 05–10 | Nine product definitions, bundles/compatibility, market and customer evidence |
| 2 — Economics & legal | 11–14 | BOM/supplier/conformity, licensing/data economics, financial model, legal/commercial register |
| 3 — IA, SEO & data | 15–16 | Bilingual routes/SEO migration, commerce/product data model |
| 4 — Design system & site | 17–19 | Design system contract, corporate landing, solution pages |
| 5 — Catalog | 20–24 | Product catalog batches, bundles, configurator |
| 6 — Commerce & service | 25–28 | SKU readiness, checkout, customer portal, support/RMA |
| 7 — Asset production | 29–31 | Brand/corporate assets, product visuals, installations/campaigns |
| 8 — Verification & launch | 32–36 | OPEN-MARINE contracts, product verification, professional channel, release |

## Registry

| ID | Objective | Key dependencies | Expected output | Verification criteria | Status | Evidence |
|---|---|---|---|---|---|---|
| 01 | Agentic execution foundation: verified repo baseline, Harness capability audit, essential plugins/skills, agent operating model, asset pipeline, 36-prompt registry, independent review | None (base `092ae74` on `main`) | `docs/marea/execution/HARNESS-SETUP.md`, `AGENT-OPERATING-MODEL.md`, `MASTER-PROMPT-REGISTRY.md`, `MC-01-BASELINE.md`, `MC-01-DELIVERY.md`, `MC-01-REVIEW.md`, `docs/marea/assets/ASSET-PIPELINE.md`, `.agents/skills/marea-*` | Real runtime inspected; skills discoverable; gates rerun; separate reviewer PASS/PARTIAL; branch + draft PR; no merge/deploy | PARTIAL (image generation externally BLOCKED; independent review PARTIAL, no blocking defects) | `MC-01-DELIVERY.md`; `MC-01-REVIEW.md`; impl commit `2662356`, delivery commit `3f02977`; draft PR [#7](https://github.com/manuelxose/embarcarte/pull/7) |
| 02 | Technology, intellectual-property, software-licensing and commercial-reuse audit of OPEN-MARINE: capability inventory, SBOM/licence inventory, IP chain, marine data rights, hardware/safety/protocol rights, EU compliance applicability, nine-product reuse map, target commercial architecture, blockers | 01 | `docs/marea/compliance/MC-02-EXECUTIVE-VERDICT.md`, `OPEN-MARINE-CAPABILITY-INVENTORY.md`, `INTELLECTUAL-PROPERTY-CHAIN.md`, `SOFTWARE-LICENSE-INVENTORY.csv`, `MARINE-DATA-RIGHTS-MATRIX.csv`, `HARDWARE-COMPLIANCE-MATRIX.md`, `MAREA-PRODUCT-REUSE-MAP.md`, `MAREA-COMMERCIAL-ARCHITECTURE.md`, `LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md`, `MC-02-BLOCKERS-AND-DECISIONS.md`, `MC-02-DELIVERY.md`, `MC-02-REVIEW.md` | All 7 OPEN-MARINE workspaces + runtime dirs audited; direct/transitive dependencies inventoried with unknowns explicit; copyright chain assessed; licences classified per distribution model; chart/weather providers assessed from official terms; NMEA/Signal K/AIS rights distinguished; hardware/safety gaps recorded; all nine products mapped with REUSE/LICENCE/BUILD/BLOCKED statuses; architecture boundaries documented; independent review; no OPEN-MARINE change; no unauthorised spend | PASS (audit scope; 58 blockers recorded: 10 CRITICAL, 37 HIGH, 11 MEDIUM; 28 BLOCKED on external rights/evidence; no product cleared for sale) | Audit commit `cdbb7e7`, review/corrections commit `c37b0af` on `feature/marea-mc02-technology-audit`; draft PR [#8](https://github.com/manuelxose/embarcarte/pull/8) (stacked on PR #7); delivery `docs/marea/compliance/MC-02-DELIVERY.md`; independent verdict `docs/marea/compliance/MC-02-REVIEW.md` (36/36 VERIFIED, PASS audit scope) |
| 03 | Corporate brand architecture, trademark availability research, commercial positioning and brand governance: EMBARCARTE (company/seller) → MAREA (proposed product brand), nine families + six bundles, naming system, ES/EN messaging, claims policy, trademark research (EUIPO/TMview/OEPM/WIPO), website brand audit, machine-readable brand contract + validator | 02 (audit + ownership/rights blockers), 01 | `docs/marea/brand/BRAND-ARCHITECTURE.md`, `TRADEMARK-CLEARANCE-RESEARCH.md`, `TRADEMARK-SEARCH-RESULTS.csv`, `MAREA-BRAND-STRATEGY.md`, `PRODUCT-NAMING-SYSTEM.md`, `COMPETITIVE-POSITIONING-EVIDENCE.md`, `BRAND-VOICE-ES-EN.md`, `MC-04-VISUAL-IDENTITY-BRIEF.md`, `WEBSITE-BRAND-MIGRATION.md`, `COMMERCIAL-BRAND-CLAIMS-POLICY.md`, `BRAND-AND-IP-DECISION-PACKAGE.md`, `brand-identity.contract.json`, `BRAND-GOVERNANCE-IMPLEMENTATION.md`, `scripts/check-brand.mjs`, `scripts/check-brand.test.mjs`, `MC-03-DELIVERY.md`, `MC-03-REVIEW.md` | Endorsed brand architecture recorded (EMBARCARTE seller / MAREA proposed product brand / OPEN-MARINE internal only); nine products and six bundles named consistently; ES/EN messaging with canonical keys; claims policy with allowed/conditional/prohibited classes; trademark research traceable with evidence classes and honest formal status; `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`; explicit OPTION B go/no-go; website brand references inventoried without changing indexed pages or `SITE.legal`; brand contract + validator + unit tests implemented and passing; DEC-01 evidence request package prepared; independent review; no merge, deploy, filing, spend or image generation | PASS (brand-governance scope, confirmed by independent review after the two blocking delivery-accuracy defects B-1/B-2 were closed in the review-corrections commit; trademark status **MATERIAL CONFLICT INDICATED — SPECIALIST REVIEW REQUIRED**, decision gate **OPTION B**, public brand use NO-GO; MC-01 stays PARTIAL, MC-02 stays PASS for audit scope) | Branch `feature/marea-mc03-brand-governance` from MC-02 HEAD `9631c6f`; draft PR [#9](https://github.com/manuelxose/embarcarte/pull/9) stacked on `feature/marea-mc02-technology-audit`; delivery `docs/marea/brand/MC-03-DELIVERY.md`; independent verdict `docs/marea/brand/MC-03-REVIEW.md`; decisions D-003/D-004 in `DECISION-LOG.md`; gates `npm run test:brand` (21/21), `npm run test:brand:unit` (11/11) |
| 04 | MAREA identity system: original logo concepts, palette, typography, art direction, usage rules, asset rights | 03 | Brand book + design tokens | Original assets only; third-party rights verified; no unlicensed trademarks; bilingual brand copy | PLANNED | — |
| 05 | Product definitions batch 1: MAREA NAV, HUB, AIS — full 24-field end-state specification, editions, inclusions/exclusions | 04, 02 | Product spec docs (ES/EN copy contract) | No invented facts; OPEN fields labelled; lifecycle = DEFINED not sellable; chart/protocol/data rights referenced from MC-02 | PLANNED | — |
| 06 | Product definitions batch 2: PILOT, SENSE, WATCH | 05, 02 | Product spec docs | Safety boundaries for PILOT; sensor claims measured-only; OPEN fields labelled; PILOT gate BLOCKED recorded | PLANNED | — |
| 07 | Product definitions batch 3: DISPLAY, WEATHER, FLEET | 06, 02 | Product spec docs | Data licensing and tenant-isolation implications recorded | PLANNED | — |
| 08 | Bundles, compatibility and lifecycle contract: START/CRUISE/SAIL/PROTECT/COMPLETE/FLEET inclusion-exclusion matrix | 05–07 | Bundle matrix + lifecycle states | No bundle price purchasable; compatibility triage explicit; no bundle contains a BLOCKED product as included | PLANNED | — |
| 09 | Competitor and market evidence refresh with check dates and official sources | 05–08 | Competitor matrix | Every row cites official source + date; no inferred prices | PLANNED | — |
| 10 | Customer discovery and positioning validation (owners, installers, marinas, fleets) | 09 | Interview evidence + validated objections/positioning | Real interviews only; no invented testimonials or market-size claims | PLANNED | — |
| 11 | Hardware BOM, supplier quotations, conformity plan (CE/EMC/RED/NMEA 2000 scope) | 02, 05–07 | BOM + quote evidence + certification plan | Real quotes only; no invented BOM or certification; NMEA claims blocked until authorized; PILOT safety-gate plan funded or deferred | PLANNED | — |
| 12 | Recurring/data licensing and per-SKU contribution economics (ex-VAT) | 11, 02 | Unit-economics worksheets | Bottom-up costs with sources; no unlabelled assumptions; data/connectivity quotes real | PLANNED | — |
| 13 | Financial model: 12/36/60-month cash flow, scenarios, break-even | 11–12 | Financial model + assumptions register | Assumptions labelled and sourced; stress case included | PLANNED | — |
| 14 | Legal/commercial risk register and claims policy (CRA, warranty, returns, privacy, payment) | 02, 11–13 | Risk register + copy rules | Owner and status per risk; prohibited claims enumerated; consumes MC-02 blockers L/D/H/X | PLANNED | — |
| 15 | Bilingual information architecture, URL/SEO registry and migration/redirect plan (ES/EN) | 04, 05–08 | Route registry + redirect map | No collision with indexed URLs; canonical/hreflang reciprocity; typed localized routes preserved | PLANNED | — |
| 16 | Commerce/product data model: product vs SKU vs readiness vs subscription entitlement | 08, 15 | Data contract + schema | Server-authoritative; no sale without lifecycle/price/stock; audit trails; BLOCKED products cannot be published as purchasable | PLANNED | — |
| 17 | Design system implementation: tokens, components, responsive/a11y/performance contract | 04, 15 | Design system code + Storybook-equivalent docs | WCAG 2.2 AA checks; mobile-first; no generic SaaS layout | PLANNED | — |
| 18 | MAREA corporate landing ES/EN on existing Angular SSR architecture | 15, 16, 17 | Landing page + SEO | Bilingual parity; SSR/hydration; structured data; truthful claims | PLANNED | — |
| 19 | Segment/solution pages and enquiry flows (owners, installers, professionals) | 18 | Segment pages + lead flows | Real CTAs only (quote/pre-registration/coming-soon per readiness) | PLANNED | — |
| 20 | Product catalog batch 1: NAV, HUB, AIS pages ES/EN | 02, 16, 18 | 3 bilingual product pages | No purchasable SKU until approved; compatibility matrix linked; a11y/SEO gates; no chart/NMEA claim without rights | PLANNED | — |
| 21 | Product catalog batch 2: WEATHER, SENSE, WATCH pages ES/EN | 20, 02 | 3 bilingual product pages | Data-source provenance shown; honest availability; licensed provider named only when contracted | PLANNED | — |
| 22 | Product catalog batch 3: DISPLAY, PILOT, FLEET pages ES/EN (extra safety cautions) | 21, 02 | 3 bilingual product pages | PILOT supervision limits; FLEET B2B terms; no unsupported safety claims; PILOT not sold while gate BLOCKED | PLANNED | — |
| 23 | Bundle comparison and upgrade-path UI | 20–22 | Comparison pages + selectors | Inclusion/exclusion truthful; upgrade logic deterministic | PLANNED | — |
| 24 | Compatibility configurator and quotation triage | 23, 16 | Configurator + quote workflow | Only validated rules produce eligible configs; unknown → specialist assessment | PLANNED | — |
| 25 | SKU readiness and catalog governance in admin/commerce | 16, 20–24 | Admin workflow + lifecycle enforcement | No orderable SKU without complete lifecycle/price/stock/compliance; MC-02 blockers referenced per SKU | PLANNED | — |
| 26 | Checkout, payments, invoices and subscription test flows (hosted/tokenized only) | 25 | Verified checkout + webhook recovery | Amounts/consent/failure/expiry tested; no raw card data stored | PLANNED | — |
| 27 | Customer portal: vessels, device/serial ownership, entitlements, renewals, licenses | 26, 02 | Portal features | Strict authz/tenant isolation; export/delete; audit log; device identity model | PLANNED | — |
| 28 | Support, RMA, warranty and service operations | 26, 27 | Support/RMA workflow | Real SLA/return policy; no fabricated service capability | PLANNED | — |
| 29 | Asset production wave 1: brand, corporate, ecosystem images (actual files) | 04, 17, 18 | Generated+optimized assets + manifest | Real files load in build; provenance/alt ES/EN; visual QA; no watermarks; image-generation authorization still required | PLANNED | — |
| 30 | Asset production wave 2: product visualizations and technical diagrams (CONCEPT-labelled) | 29, 20–22 | Product assets + diagrams | Labelled CONCEPT; proportions/connections plausible; HTML/CSS/SVG for typographic UI | PLANNED | — |
| 31 | Asset production wave 3: installation scenarios, campaigns, professional solutions + visual regression baseline | 29, 30 | Campaign assets + visual regression suite | Screenshot comparisons pass; no stock substitution; rights recorded | PLANNED | — |
| 32 | OPEN-MARINE commercial interface contracts and safety boundaries (app/device/data separation) | 02, 11 | Interface contracts + safety case outline | Versioned contracts; independent watchdog/E-stop requirements documented and verifiable; ownership/licence decision executed; SBOM/notice gate | PLANNED | — |
| 33 | Product verification batch 1: NAV, AIS, WEATHER (software/data acceptance) | 20, 21, 26, 32 | Acceptance test report per product | Real tests (offline/GNSS loss/stale AIS/data provenance); no ECDIS equivalence claim; only contracted data providers | PLANNED | — |
| 34 | Product verification batch 2: HUB, DISPLAY, SENSE, WATCH (hardware evidence required) | 22, 32 | Physical/electrical/environmental evidence report | Physical evidence or BLOCKED; no certification claim without certificate; CRA readiness | PLANNED | — |
| 35 | Product verification batch 3: PILOT safety validation, FLEET tenant/billing, professional sales channel | 22, 32, 34 | Hazard analysis + sea-trial plan + B2B verification | Sea trials real or BLOCKED; tenant isolation tested; installer/distributor terms real; independent safety verification | PLANNED | — |
| 36 | Production release readiness, bilingual SEO/performance QA, authorized launch and growth review | 33–35, 14, 26, 28, 31 | Release gate report, launch decision, growth review | Backups/restore verified, approval gates, external monitoring, only approved SKUs/locales sell; all BLOCKED items closed or product excluded | PLANNED | — |

## Schedule change log (decision D-001, 2026-10-30)

The client received Master Prompt 02/36 as the technology, IP, licensing and commercial-reuse
audit (the scope previously planned for prompt 10). The schedule was reconciled without changing
the 36-prompt total:

| Position | Before | After |
|---|---|---|
| 02 | Brand architecture and legal clearance | Technology/IP/licensing audit (executed as MC-02) |
| 03 | MAREA identity system | Brand architecture and legal clearance |
| 04 | Product definitions batch 1 | MAREA identity system |
| 05–07 | Product definitions batch 2/3, bundles | Product definitions batch 1/2/3 |
| 08 | Competitor refresh | Bundles and lifecycle contract |
| 09 | Customer discovery | Competitor refresh |
| 10 | OPEN-MARINE licence/data-rights inventory | Customer discovery |
| 11–36 | unchanged | unchanged |

Rationale and status effects: `docs/marea/execution/DECISION-LOG.md` D-001 and
`docs/marea/compliance/MC-02-DELIVERY.md`. The old prompt-10 licensing inventory is absorbed by MC-02;
no second licensing audit is planned. MC-01 remains `PARTIAL` (image generation BLOCKED); every
downstream prompt that depends on ownership, data rights or safety evidence now references the MC-02
blocker register.

## Change control

- The Lead updates this registry at the start (status → `IN PROGRESS`) and end
  (`PASS`/`PARTIAL`/`BLOCKED`/`FAIL` + PR/commit evidence) of every prompt.
- The independent reviewer verifies the registry status against real evidence;
  it may downgrade an unsupported status.
- Any reordering caused by a received Master Prompt is recorded, with the reason,
  in `DECISION-LOG.md` and in the MC delivery report of the prompt that caused it.
  Milestone history is never silently rewritten.
