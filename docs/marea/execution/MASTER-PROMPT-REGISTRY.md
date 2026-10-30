# MAREA — Master prompt registry (36-prompt program)

Status: GOVERNING PLAN. Owned by the Lead. Last updated: 2026-10-30 (MC-01).
Repository: `manuelxose/embarcarte`. Related technology repository: `manuelxose/open-marine`.
Execution environment: DeepSeek Harness Desktop `0.2.1-rc.5`, profile `desktop`.

## Purpose and honesty rules

- This registry tracks the 36 Master Prompts of the MAREA commercialization
  program. **Only prompt 01 exists as a received Master Prompt today.** Prompts
  02–36 below are planning placeholders derived from the already-committed
  commercial roadmap (`docs/marea/WEBSITE-AND-ROADMAP.md`, `M00-DISCOVERY-BASELINE.md`,
  `COMMERCIAL-PORTFOLIO.md`) and from the MC-01 mandate. When the client issues
  each Master Prompt, its actual text is authoritative and may rebind, reorder
  or split the planned objective; update this registry at that time.
- A prompt is **never** marked complete until its acceptance evidence exists in
  the repository and an independent reviewer has verified it.
- Status vocabulary: `PLANNED` (not started), `IN PROGRESS`, `PARTIAL`
  (committed work + recorded external blocker), `PASS` (all criteria verified),
  `BLOCKED`, `FAIL`.
- Commercial facts (stock, certification, sea trials, supplier quotes, prices,
  trademarks) need their own evidence class; documentation alone cannot PASS a
  functionality or physical-validation prompt.

## Program shape

| Phase | Prompts | Focus |
|---|---|---|
| 0 — Foundation | 01–03 | Execution environment, brand architecture/legal, identity system |
| 1 — Product truth | 04–09 | Nine product definitions, bundles/compatibility, market and customer evidence |
| 2 — Economics & legal | 10–14 | Licenses/data rights, BOM and supplier cost, financial model, compliance register |
| 3 — IA, SEO & data | 15–16 | Bilingual routes/SEO migration, commerce/product data model |
| 4 — Design system & site | 17–19 | Design system contract, corporate landing, solution pages |
| 5 — Catalog | 20–24 | Product catalog batches, bundles, configurator |
| 6 — Commerce & service | 25–28 | SKU readiness, checkout, customer portal, support/RMA |
| 7 — Asset production | 29–31 | Brand/corporate assets, product visuals, installations/campaigns |
| 8 — Verification & launch | 32–36 | OPEN-MARINE contracts, product verification, professional channel, release |

## Registry

| ID | Objective | Key dependencies | Expected output | Verification criteria | Status | Evidence |
|---|---|---|---|---|---|---|
| 01 | Agentic execution foundation: verified repo baseline, Harness capability audit, essential plugins/skills, agent operating model, asset pipeline, 36-prompt registry, independent review | None (base `092ae74` on `main`) | `docs/marea/execution/HARNESS-SETUP.md`, `AGENT-OPERATING-MODEL.md`, `MASTER-PROMPT-REGISTRY.md`, `MC-01-BASELINE.md`, `MC-01-DELIVERY.md`, `docs/marea/assets/ASSET-PIPELINE.md`, `.agents/skills/marea-*` | Real runtime inspected; skills discoverable; gates rerun; separate reviewer PASS/PARTIAL; branch + draft PR; no merge/deploy | IN PROGRESS | MC-01 delivery report |
| 02 | Brand architecture and legal clearance policy: EMBARCARTE (seller) → MAREA (proposed brand), naming conventions, trademark clearance plan (EUIPO/OEPM), conflict handling with Marea Marine | 01 | Brand policy document + open legal checklist | Clear go/no-go gate; no unapproved brand publication; legal status NOT CLEARED recorded | PLANNED | — |
| 03 | MAREA identity system: original logo concepts, palette, typography, art direction, usage rules, asset rights | 02 | Brand book + design tokens | Original assets only; third-party rights verified; no unlicensed trademarks; bilingual brand copy | PLANNED | — |
| 04 | Product definitions batch 1: MAREA NAV, HUB, AIS — full 24-field end-state specification, editions, inclusions/exclusions | 03 | Product spec docs (ES/EN copy contract) | No invented facts; OPEN fields labelled; lifecycle = DEFINED not sellable | PLANNED | — |
| 05 | Product definitions batch 2: PILOT, SENSE, WATCH | 04 | Product spec docs | Safety boundaries for PILOT; sensor claims measured-only; OPEN fields labelled | PLANNED | — |
| 06 | Product definitions batch 3: DISPLAY, WEATHER, FLEET | 05 | Product spec docs | Data licensing and tenant-isolation implications recorded | PLANNED | — |
| 07 | Bundles, compatibility and lifecycle contract: START/CRUISE/SAIL/PROTECT/COMPLETE/FLEET inclusion-exclusion matrix | 04–06 | Bundle matrix + lifecycle states | No bundle price purchasable; compatibility triage explicit | PLANNED | — |
| 08 | Competitor and market evidence refresh with check dates and official sources | 04–07 | Competitor matrix | Every row cites official source + date; no inferred prices | PLANNED | — |
| 09 | Customer discovery and positioning validation (owners, installers, marinas, fleets) | 08 | Interview evidence + validated objections/positioning | Real interviews only; no invented testimonials or market-size claims | PLANNED | — |
| 10 | OPEN-MARINE license/data-rights and component inventory; S-57/chart, Signal K, AIS and autopilot boundaries | 01 | License inventory + reuse map | Per-component status VERIFIED/PARTIAL/BLOCKED; redistribution rights recorded | PLANNED | — |
| 11 | Hardware BOM, supplier quotations, conformity plan (CE/EMC/RED/NMEA 2000 scope) | 10, 04–06 | BOM + quote evidence + certification plan | Real quotes only; no invented BOM or certification; NMEA claims blocked until authorized | PLANNED | — |
| 12 | Recurring/data licensing and per-SKU contribution economics (ex-VAT) | 11 | Unit-economics worksheets | Bottom-up costs with sources; no unlabelled assumptions | PLANNED | — |
| 13 | Financial model: 12/36/60-month cash flow, scenarios, break-even | 11–12 | Financial model + assumptions register | Assumptions labelled and sourced; stress case included | PLANNED | — |
| 14 | Legal/commercial risk register and claims policy (CRA, warranty, returns, privacy, payment) | 10–13 | Risk register + copy rules | Owner and status per risk; prohibited claims enumerated | PLANNED | — |
| 15 | Bilingual information architecture, URL/SEO registry and migration/redirect plan (ES/EN) | 03, 04–07 | Route registry + redirect map | No collision with indexed URLs; canonical/hreflang reciprocity; typed localized routes preserved | PLANNED | — |
| 16 | Commerce/product data model: product vs SKU vs readiness vs subscription entitlement | 07, 15 | Data contract + schema | Server-authoritative; no sale without lifecycle/price/stock; audit trails | PLANNED | — |
| 17 | Design system implementation: tokens, components, responsive/a11y/performance contract | 03, 15 | Design system code + Storybook-equivalent docs | WCAG 2.2 AA checks; mobile-first; no generic SaaS layout | PLANNED | — |
| 18 | MAREA corporate landing ES/EN on existing Angular SSR architecture | 15, 16, 17 | Landing page + SEO | Bilingual parity; SSR/hydration; structured data; truthful claims | PLANNED | — |
| 19 | Segment/solution pages and enquiry flows (owners, installers, professionals) | 18 | Segment pages + lead flows | Real CTAs only (quote/pre-registration/coming-soon per readiness) | PLANNED | — |
| 20 | Product catalog batch 1: NAV, HUB, AIS pages ES/EN | 16, 18 | 3 bilingual product pages | No purchasable SKU until approved; compatibility matrix linked; a11y/SEO gates | PLANNED | — |
| 21 | Product catalog batch 2: WEATHER, SENSE, WATCH pages ES/EN | 20 | 3 bilingual product pages | Data-source provenance shown; honest availability | PLANNED | — |
| 22 | Product catalog batch 3: DISPLAY, PILOT, FLEET pages ES/EN (extra safety cautions) | 21 | 3 bilingual product pages | PILOT supervision limits; FLEET B2B terms; no unsupported safety claims | PLANNED | — |
| 23 | Bundle comparison and upgrade-path UI | 20–22 | Comparison pages + selectors | Inclusion/exclusion truthful; upgrade logic deterministic | PLANNED | — |
| 24 | Compatibility configurator and quotation triage | 23, 16 | Configurator + quote workflow | Only validated rules produce eligible configs; unknown → specialist assessment | PLANNED | — |
| 25 | SKU readiness and catalog governance in admin/commerce | 16, 20–24 | Admin workflow + lifecycle enforcement | No orderable SKU without complete lifecycle/price/stock/compliance | PLANNED | — |
| 26 | Checkout, payments, invoices and subscription test flows (hosted/tokenized only) | 25 | Verified checkout + webhook recovery | Amounts/consent/failure/expiry tested; no raw card data stored | PLANNED | — |
| 27 | Customer portal: vessels, device/serial ownership, entitlements, renewals, licenses | 26 | Portal features | Strict authz/tenant isolation; export/delete; audit log | PLANNED | — |
| 28 | Support, RMA, warranty and service operations | 26, 27 | Support/RMA workflow | Real SLA/return policy; no fabricated service capability | PLANNED | — |
| 29 | Asset production wave 1: brand, corporate, ecosystem images (actual files) | 03, 17, 18 | Generated+optimized assets + manifest | Real files load in build; provenance/alt ES/EN; visual QA; no watermarks | PLANNED | — |
| 30 | Asset production wave 2: product visualizations and technical diagrams (CONCEPT-labelled) | 29, 20–22 | Product assets + diagrams | Labelled CONCEPT; proportions/connections plausible; HTML/CSS/SVG for typographic UI | PLANNED | — |
| 31 | Asset production wave 3: installation scenarios, campaigns, professional solutions + visual regression baseline | 29, 30 | Campaign assets + visual regression suite | Screenshot comparisons pass; no stock substitution; rights recorded | PLANNED | — |
| 32 | OPEN-MARINE commercial interface contracts and safety boundaries (app/device/data separation) | 10, 11 | Interface contracts + safety case outline | Versioned contracts; independent watchdog/E-stop requirements documented and verifiable | PLANNED | — |
| 33 | Product verification batch 1: NAV, AIS, WEATHER (software/data acceptance) | 20, 21, 26, 32 | Acceptance test report per product | Real tests (offline/GNSS loss/stale AIS/data provenance); no ECDIS equivalence claim | PLANNED | — |
| 34 | Product verification batch 2: HUB, DISPLAY, SENSE, WATCH (hardware evidence required) | 22, 32 | Physical/electrical/environmental evidence report | Physical evidence or BLOCKED; no certification claim without certificate | PLANNED | — |
| 35 | Product verification batch 3: PILOT safety validation, FLEET tenant/billing, professional sales channel | 22, 32, 34 | Hazard analysis + sea-trial plan + B2B verification | Sea trials real or BLOCKED; tenant isolation tested; installer/distributor terms real | PLANNED | — |
| 36 | Production release readiness, bilingual SEO/performance QA, authorized launch and growth review | 33–35, 14, 26, 28, 31 | Release gate report, launch decision, growth review | Backups/restore verified, approvals gates, external monitoring, only approved SKUs/locales sell | PLANNED | — |

## Change control

- The Lead updates this registry at the start (status → `IN PROGRESS`) and end
  (`PASS`/`PARTIAL`/`BLOCKED`/`FAIL` + PR/commit evidence) of every prompt.
- The independent reviewer verifies the registry status against real evidence;
  it may downgrade an unsupported status.
- Any reordering caused by a received Master Prompt is recorded, with the reason,
  in the MC delivery report of the prompt that caused it.
