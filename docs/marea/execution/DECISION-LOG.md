# MAREA — Program decision log

Status: ACTIVE. Owner: Lead (Technical Program Director).
Program: EMBARCARTE / MAREA, 36 Master Prompts.
Purpose: record irreversible or schedule-changing decisions with their evidence, so
later milestones can audit why the plan changed. Entries are append-only: a
reversed decision is recorded as a new entry, never edited away.

Rules:

- A decision that changes the 36-prompt order must also be reflected in
  `MASTER-PROMPT-REGISTRY.md` and in the delivery report of the milestone that
  caused it.
- A decision never upgrades a commercial status by itself: legal clearances,
  certifications, physical tests, supplier quotes and sea trials still require
  their own evidence class.
- Only the Lead records program-level decisions here; specialist findings live in
  their own audit documents.

## D-001 — 2026-10-30 — MC-02 is executed as technology/IP/licensing/commercial-reuse audit

**Context.** The registry created at MC-01 placed brand architecture and legal
clearance at prompt 02 and the OPEN-MARINE licence/data-rights inventory at prompt
10. The client issued Master Prompt 02/36 as the complete technology,
intellectual-property, software-licensing and commercial-reuse audit, expressly
because that audit is a critical dependency for the nine MAREA product
definitions and for every later commercial decision.

**Decision.** Execute prompt 02 as the technology/IP/licensing audit defined by
Master Prompt 02/36, and reconcile the registry without changing the 36-prompt
total:

| Position | Before MC-02 | After MC-02 |
|---|---|---|
| 02 | Brand architecture and legal clearance policy | MC-02 technology, IP, licensing and commercial-reuse audit (scope formerly at 10) |
| 03 | MAREA identity system | Brand architecture and legal clearance policy (displaced from 02) |
| 04 | Product definitions batch 1 (NAV, HUB, AIS) | MAREA identity system (displaced from 03) |
| 05 | Product definitions batch 2 (PILOT, SENSE, WATCH) | Product definitions batch 1 (NAV, HUB, AIS) |
| 06 | Product definitions batch 3 (DISPLAY, WEATHER, FLEET) | Product definitions batch 2 (PILOT, SENSE, WATCH) |
| 07 | Bundles, compatibility and lifecycle contract | Product definitions batch 3 (DISPLAY, WEATHER, FLEET) |
| 08 | Competitor and market evidence refresh | Bundles, compatibility and lifecycle contract |
| 09 | Customer discovery and positioning validation | Competitor and market evidence refresh |
| 10 | OPEN-MARINE licence/data-rights inventory | Customer discovery and positioning validation |
| 11–36 | unchanged | unchanged |

**Rationale.** (1) The licence/data-rights inventory formerly at prompt 10 is now
fully absorbed by prompt 02, so keeping a second licensing audit would duplicate
work and risk contradictory conclusions. (2) Brand architecture still requires the
identity system as its successor, so the displaced brand work moves to position 03
and the identity system to 04, preserving the original dependency chain. (3)
Product definitions keep their batch order and move down by one position each.
(4) Prompts 11–36 keep their objectives and numbers, so the 36-prompt total and
every later commercial deliverable (BOM, economics, financial model, compliance,
catalogue, commerce, assets, verification, launch) are preserved.

**Status effect.** Prompt 02 status is set in `MASTER-PROMPT-REGISTRY.md` from the
MC-02 audit evidence. MC-01 stays `PARTIAL` (image generation externally
BLOCKED). No later prompt is marked complete. The pending milestone is recorded
in `MC-02-DELIVERY.md`; the image-generation blocker stays open.

**Evidence.** `docs/marea/compliance/MC-02-DELIVERY.md`,
`docs/marea/execution/MASTER-PROMPT-REGISTRY.md`,
`docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`.

## D-002 — 2026-10-30 — No licence added to OPEN-MARINE; no OPEN-MARINE code copied into EMBARCARTE

**Context.** OPEN-MARINE is a public GitHub repository with no licence file and a
mixed authorship history (`manuelxose`, `mgonzalezv <mgonzalezv@eservicios.indra.es>`,
`Claude <noreply@anthropic.com>`). The MC-02 mandate explicitly forbids changing a
repository licence or copying implementation code as part of the audit.

**Decision.** In MC-02: (1) no LICENSE/COPYING/NOTICE file is added to
OPEN-MARINE or EMBARCARTE; (2) no OPEN-MARINE implementation code is copied,
vendored or imported into EMBARCARTE; (3) repository visibility is not changed;
(4) the ownership and licence decision is recorded as an open blocker requiring
human/legal action, with the required documentation listed in
`INTELLECTUAL-PROPERTY-CHAIN.md`.

**Rationale.** A public repository without a licence is not a grant of rights;
copyright remains with the authors and any employer/contract counterparty.
Granting a licence is an intellectual-property decision that needs adequate
ownership evidence and explicit authorization.

**Status effect.** OPEN-MARINE reuse remains conditional on a documented
ownership/licence decision. Engineering reuse candidates may be identified, but
not exercised.

**Evidence.** `docs/marea/compliance/INTELLECTUAL-PROPERTY-CHAIN.md`,
`docs/marea/compliance/LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md`,
`docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`.

## D-003 — 2026-10-30 — MC-03 brand architecture adopted; MAREA trademark gate recorded as OPTION B

**Context.** MC-03 (prompt 03/36) required the corporate/product brand architecture, an evidence-based
trademark availability research, commercial positioning and an enforceable governance layer. MC-02 left
the trademark question open (blocker X-01) and the technology ownership question open (DEC-01). During
MC-03 the trademark research verified, directly against the EUIPO record, live EU trade marks whose
dominant verbal element is MAREA in Nice classes 9, 35 and 37 — including class 9 goods that literally
cover mobile apps and software for mobile devices, i.e. the category MAREA NAV would occupy.

**Decision.** (1) The programme adopts an **endorsed-brand architecture**: EMBARCARTE is the commercial
company and seller; MAREA is the proposed product brand for the nine families; OPEN-MARINE is an internal
engineering identifier only and never a public brand. (2) The trademark decision gate is recorded as
**OPTION B — MATERIAL CONFLICT INDICATED, SPECIALIST REVIEW REQUIRED**, with
`TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`. (3) Consequence: public use of MAREA, trademark filing,
packaging procurement, domain acquisition and advertising are **NO-GO** until qualified counsel issues a
written opinion; internal, non-public strategy, naming, governance and MC-04 concept development remain
allowed. (4) No rename of MAREA is executed or decided by this milestone; rename is one mitigation option
for human review.

**Rationale.** A verified earlier right in the core class cannot be argued away by agents, and "continue
and hope" would authorise publication and spend before the decisive question (class-9 similarity) is
answered. MC-03 can still PASS because the research task and the clearance gate were completed honestly;
the mandate explicitly separates a research milestone from legal clearance.

**Status effect.** MC-03 status set in `MASTER-PROMPT-REGISTRY.md` from the delivered evidence. MC-01
stays `PARTIAL` (image generation BLOCKED). MC-02 stays `PASS` for audit scope. No later prompt is marked
complete and MC-04 is not started.

**Evidence.** `docs/marea/brand/TRADEMARK-CLEARANCE-RESEARCH.md`,
`docs/marea/brand/TRADEMARK-SEARCH-RESULTS.csv`, `docs/marea/brand/BRAND-ARCHITECTURE.md`,
`docs/marea/brand/BRAND-AND-IP-DECISION-PACKAGE.md`, `docs/marea/brand/MC-03-DELIVERY.md`.

## D-004 — 2026-10-30 — Brand governance is documentation-scoped; no public brand migration in MC-03

**Context.** MC-03 introduced a machine-readable brand identity contract, a deterministic validator and
tests, and audited every public brand reference on the live site (209 references). The site currently
renders a single EMBARCARTE identity and its `SITE.legal` block is empty.

**Decision.** (1) The brand governance layer is implemented as documentation + `scripts/check-brand.mjs`
over `governedPaths`; it does **not** scan or modify `src/`, so the live site cannot regress. (2) No
public brand migration is performed in MC-03: no route, dictionary, metadata, legal page or commerce
behaviour changes. (3) Separating seller identity / product brand / internal technology inside `SITE` is
deferred to an authorised migration milestone and only as a backward-compatible change; the boundary and
the phased plan are recorded in `docs/marea/brand/WEBSITE-BRAND-MIGRATION.md`. (4) The public claims
risks found by the audit (NMEA 2000 support, "alarmas de colisión", PILOT safety) are recorded as copy
corrections for the catalog/copy milestones, not fixed here.

**Rationale.** Changing `SITE` or page copy in a brand-strategy milestone would alter rendered output and
indexed pages without an authorised migration and without verified corporate data (X-02), risking SEO and
claims exposure. A governance layer that fails on legacy pages would also be unusable.

**Status effect.** MC-03 delivery is additive: 11 brand documents + 3 code files + two npm scripts + two CI
steps. Existing application tests remain green (build, i18n, commerce, SEO, backup, E2E 15/15).

**Evidence.** `docs/marea/brand/BRAND-GOVERNANCE-IMPLEMENTATION.md`,
`docs/marea/brand/WEBSITE-BRAND-MIGRATION.md`, `docs/marea/brand/brand-identity.contract.json`,
`docs/marea/brand/MC-03-DELIVERY.md`.

## D-005 — 2026-10-30 — MC-04 identity: three territories prototyped, two shortlisted, one internal preference; adoption remains BLOCKED

**Context.** MC-04 (prompt 04/36) required the visual identity system to be executed under the MC-03 gates:
`TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`, `PUBLIC_MAREA_BRAND_USE = NO_GO`, image generation BLOCKED, no
publication. The MC-04 brief prescribes exactly three territories (Isobath, Bearing Index, Signal Trunk),
a weighted evaluation (§3.2), and a mandatory shortlist of two followed by an external professional
originality/prior-art check (B9/TM-01/TM-02) before any adoption.

**Decision.** (1) All three territories are prototyped as original authored SVG constructions with
monochrome, reversed, compact, lockup and small-size evidence; nothing was traced or downloaded.
(2) **SHORTLIST — Bearing Index (B) and Signal Trunk (C)**, for the professional review. (3) **Isobath (A)
is dropped** on the brief §3.3 kill criterion — its prototype reads as a Wi-Fi/signal/sound-wave device at
small size, the most crowded motif in the category — and it carries the lowest weighted hypothesis score
(3.35 against 3.95/3.95). (4) **Internal preference: B — Bearing Index**, recorded strictly as
`PREFERRED_PROVISIONAL`: C is the strongest system-extensibility concept but its frozen silhouette reads
as a three-step bar chart/equaliser at 16–48 px, which is the brief §3.5 kill criterion; B reads as a
heading-instrument fragment, with a residual letter-"C"/compass-app/seal reading risk to be resolved in a
future construction round. (5) Adoption, publication, packaging procurement, trademark filing and any
`®`/`™` use remain **BLOCKED**; the preference is an internal design recommendation only.

**Rationale.** The decision is taken on recorded prototype evidence and the brief's own weights and kill
criteria, not on taste; both the shortlist and the preference are reversible by evidence or by the external
professional check. Keeping exactly two directions shortlisted satisfies the brief while making the
professional search scoped and affordable. C remains on the shortlist because its extensibility rationale
is strategically the closest to MAREA's actual differentiation, even though its current construction fails
the small-size reading test.

**Consequences for the programme.** (a) The identity is documented as PROPOSED/INTERNAL in every artefact;
no public surface, route, page or deployment is changed by MC-04. (b) The reusable Layer A foundations
(type roles, colour roles, instrumentation grammar, icon grid, diagram conventions) are separated from the
provisional Layer B MAREA identity so a future rename does not discard the system. (c) The professional
originality/prior-art review (B9/TM-01/TM-02) remains `PENDING`; until it exists,
`FINAL_IDENTITY_ADOPTION = BLOCKED` and `PUBLICATION = BLOCKED`. (d) MC-04 adds its brand documents to
`brand-identity.contract.json` `governedPaths` so `npm run test:brand` covers them; the validator and its
unit tests are unchanged. (e) No `src/`, `public/`, deployment or dependency change is made.

**Evidence.** `docs/marea/brand/TERRITORY-COMPARISON.md`, `docs/marea/brand/IDENTITY-SYSTEM.md`,
`docs/marea/brand/assets/logo/**`, `docs/marea/brand/territories/**`,
`docs/marea/brand/ORIGINALITY-AND-PRIOR-ART-CHECK.md`, `docs/marea/brand/assets/evidence/renders/**`,
`docs/marea/brand/MC-04-DELIVERY.md`.

## D-006 — 2026-10-30 — Instrument numerics move to Manrope tabular; design tokens stay PROPOSED and out of `src/`

**Context.** MC-04 had to verify, not assume, the installed typefaces (DM Sans, Manrope via
`@fontsource-variable`) before defining the numeric system. The brief's §4.4 role proposal assumed DM Sans
for instrument numerics.

**Decision.** (1) DM Sans 5.3.0 exposes **no** `tnum` feature in any of its 12 shipped woff2 builds and
renders proportional digits (measured digit-advance spread 34.0 px at 100 px; "00:00" vs "23:59" column
delta 40.47 px); Manrope's latin build exposes `tnum` and measures 0.1563 px spread at 100 px with 0.00 px
column delta. The numeric treatment (instrument value, unit/suffix, timestamp/age spans) therefore moves to
**Manrope 700 with `font-variant-numeric: tabular-nums`**, recorded as deviation `TYPO-DEVIATION-01`; body,
labels, headings and documentation stay DM Sans. No typeface is purchased or added. (2) The design tokens
remain **PROPOSED** in `docs/marea/brand/tokens/`; **no value is applied to `src/styles.scss`** and the live
site is unchanged. (3) The pre-existing focus-ring contrast defect (F-1, 1.65:1 on white) is recorded as
**OPEN**; MC-04 proposes a compliant instrument-mode indicator and MC-06 must implement and re-verify it.

**Rationale.** Tabular figures are a safety-of-reading requirement for live values; using a proportional
face on a mutable readout would make digits jitter and columns shift. Keeping tokens out of `src/` respects
the MC-04 scope and the MC-03 migration constraint.

**Evidence.** `docs/marea/brand/TYPOGRAPHY-SYSTEM.md`, `docs/marea/brand/COLOUR-SYSTEM.md`,
`docs/marea/brand/tokens/marea-instrument-tokens.proposed.json`,
`docs/marea/brand/evidence/contrast/contrast-matrix.json`, `scripts/check-typography.mjs`,
`scripts/check-contrast.mjs`, `docs/marea/brand/MC-04-ACCESSIBILITY-EVIDENCE.md`.

## D-007 — 2026-10-30 — MC-05 product vocabulary: lifecycle reconciliation, edition structure and price status

**Context.** MC-05 (prompt 05/36) defines the complete final commercial product for MAREA NAV, MAREA HUB and
MAREA AIS. Three independent dossiers, an edition comparison, a compatibility contract, a pricing framework,
six bilingual copy files, a machine-readable contract and a validator share one vocabulary. Three conflicts had
to be resolved rather than left to drift:

1. The Master Prompt proposed eight governance states (CONCEPT, DEFINED, ENGINEERING, VALIDATION,
   COMPLIANCE_REVIEW, SALES_APPROVED, RELEASED, RETIRED) while `COMMERCIAL-PORTFOLIO.md` — declared binding by
   the MC-03 claims policy — defines six (CONCEPT, DEFINED, ENGINEERING VERIFIED, REGULATORY READY,
   OPERATIONS READY, COMMERCIALLY AVAILABLE). Two competing enums in one programme is a governance defect.
2. The Master Prompt asks for Essentials/Pro-style editions to be *evaluated*, not asserted. A second edition
   without a customer-value difference is a label, and a third tier without a distinct customer and cost base is
   an invention.
3. Every price in the portfolio is a hypothesis. A product-definition milestone must make it structurally
   impossible to mistake a hypothesis for an approved selling price.

**Decision.**

1. **One lifecycle vocabulary.** The `COMMERCIAL-PORTFOLIO.md` six-state scale is adopted as binding and extended
   with the terminal state `RETIRED`, which the portfolio lacked. The Master Prompt states map onto it:
   CONCEPT→CONCEPT; DEFINED→DEFINED; ENGINEERING/VALIDATION→ENGINEERING_VERIFIED; COMPLIANCE_REVIEW
   (passed)→REGULATORY_READY; SALES_APPROVED→OPERATIONS_READY; RELEASED→COMMERCIALLY_AVAILABLE; RETIRED→RETIRED.
   No second enum is created and no state is renamed. The mapping table lives in
   `docs/marea/products/README.md` §3 and in the machine-readable contract.
2. **Two editions per product, no third tier.** MAREA NAV Essential/Pro, MAREA HUB Standard/Pro and MAREA AIS
   Receiver/Connected are defined by a functional customer difference, not by cosmetic labelling: planning vs
   connected navigation; a defined validated envelope vs a wider validated envelope plus installer tooling; and
   reception vs managed local integration with diagnostics. The edition authority is
   `docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md`. AIS Connected is recorded as **CONDITIONAL — not yet
   justified**: it may only ship as a separate edition if the frozen hardware design evidences richer local
   networking and diagnostics; otherwise it collapses into one SKU plus an optional accessory.
3. **Safety-of-understanding capability is never edition-gated.** Degraded-state honesty, accessibility, updates,
   export of the customer's own data, configuration recovery, ownership transfer and local-first offline
   operation are included in the base edition of every product. AIS reception, NAV traffic display and HUB AIS
   integration are likewise not edition-gated, because the hardware or data entitlement is already a separate
   purchase.
4. **Price status is a first-class contract field.** All six edition prices remain `HYPOTHESIS_UNAPPROVED`.
   The contract must represent edition hypotheses with an explicit status and validation requirement, and the
   validator must fail any `APPROVED`/`FINAL` price, any "from €" style offer, and any price appearing in
   customer copy. No price from MC-05 enters checkout, catalogue, structured data or an advertisement.
5. **Readiness is dimensioned, never a single flag.** `definition`, `engineering`, `licensing`, `hardware`,
   `dataRights`, `compliance`, `pricing`, `brandPublication` and `availability` are recorded separately for each
   product. For a software-only product (MAREA NAV) the `hardware` dimension takes the explicit value
   `NOT_APPLICABLE_SOFTWARE_PRODUCT`; it does not mean the product has no hardware dependencies (customer device,
   connected equipment, licensed data).
6. **Engine-derived figures are not a decision.** The AIS and HUB dossiers record `engineering` as
   `PARTIALLY_VERIFIED` only for the narrow scope actually evidenced in MC-02 (NMEA 0183 wind parsing and IMU on
   the internal foundation). No integration, receiver, gateway or radio behaviour is verified. Where dossiers
   differ in wording, the narrower claim governs; the validator and reviewer enforce this.

**Rationale.** A 36-prompt programme cannot pass through three product-definition batches and one bundle
milestone with two lifecycle vocabularies or two price-status languages. Reconciling into the already-binding
portfolio scale (plus the retirement state it was missing) preserves MC-03 governance, avoids a fourth competing
enum and makes every later SKU decision auditable. The edition decisions are recorded as *structure with an
open-content list*, because the contents (chart regions, connection families, diagnostics scope, retention
windows) cannot be frozen before the hardware, data and channel work exists — inventing those contents now is
exactly the failure mode this programme is designed to avoid.

**Consequences for the programme.** (a) MC-05 can PASS its product-definition scope while `COMMERCIAL_AVAILABILITY`
stays `NOT_FOR_SALE` and every product stays `DEFINED` — a definition pass is not a release. (b) The edition
contents and the AIS Connected verdict are inputs to MC-06/MC-08 (bundles) and MC-11/MC-12 (BOM, conformity,
unit economics); they are not frozen by this decision. (c) `docs/marea/products/README.md` becomes the binding
conventions document for product batches 2 and 3 (MC-06/MC-07) unless a later decision amends it. (d) No `src/`,
`public/`, checkout, price, stock, payment, deployment, brand-identity-adoption or trademark state changes.
(e) The machine-readable contract and validator must encode this decision; a validator that accepts an approved
price or a single READY flag is defective.

**Evidence.** `docs/marea/products/README.md` §§2–8, `docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md`,
`docs/marea/products/MAREA-NAV-COMMERCIAL-SPEC.md`, `docs/marea/products/MAREA-HUB-COMMERCIAL-SPEC.md`,
`docs/marea/products/MAREA-AIS-COMMERCIAL-SPEC.md`,
`docs/marea/products/product-definitions.batch-01.json`, `scripts/check-marea-products.mjs`,
`docs/marea/COMMERCIAL-PORTFOLIO.md` (lifecycle and price rule), `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md`
§5–§6.

**Status effect.** MC-05 status is set in `MASTER-PROMPT-REGISTRY.md` from the delivered evidence. This decision
changes no product lifecycle state, clears no blocker and approves no price.

## D-008 — 2026-10-30 — MC-06 edition structure: installation packages, module SKUs and conditional editions

**Context.** MC-06 (prompt 06/36) must define editions for MAREA PILOT, MAREA SENSE and MAREA WATCH. The
portfolio proposes PILOT Coastal/Sail/Pro, SENSE individual modules plus Essentials/Sail/Systems kits, and WATCH
Core/Plus. Applying the D-007 test (an edition must carry a functional customer difference) three structural
problems appeared:

1. **PILOT Pro is not an edition.** A steering installation whose content can only be determined after a vessel
   survey has no fixed content, no fixed price and no reproducible configuration. Modelling it as a
   fixed-price edition would create a purchasable-looking SKU that cannot be quoted honestly, exactly the
   failure mode the programme prohibits.
2. **SENSE is a family of measurement devices, not one box with tiers.** The commercial unit is a module; a kit
   is a preselected group of modules and must never invent a capability its modules do not have.
3. **WATCH Plus was proposed as "more features".** Without a measurable customer benefit it is a price label,
   and it cannot be sold before the service it expands exists.

**Decision.**

1. **Edition verdict vocabulary extended, lifecycle untouched.** Batch-02 editions carry one of `DEFINED`,
   `CONDITIONAL` or `INSTALLATION_PACKAGE`. The lifecycle enum of D-007 is unchanged. `RELEASED`, `FOR_SALE`,
   `APPROVED` and `PUBLISHABLE` are invalid verdicts for any edition.
2. **`PILOT-PRO` is an installation package, not a retail SKU.** It is `INSTALLATION_PACKAGE`: quoted after a
   documented survey, with no price hypothesis and no catalogue entry. `PILOT-COASTAL` is `DEFINED`.
   `PILOT-SAIL` is `CONDITIONAL` on verified wind-angle steering (H-01); the condition is written in the edition
   record rather than deleted.
3. **SENSE is five module SKUs plus three kits.** `SENSE-WIND`, `SENSE-POWER`, `SENSE-BILGE`, `SENSE-TANKS` and
   `SENSE-ENV` are the commercial units. `SENSE-ESSENTIALS` (battery + bilge starter) is `DEFINED`;
   `SENSE-SAIL` and `SENSE-SYSTEMS` are `CONDITIONAL` until their measurement performance is validated. A kit
   may only contain declared modules and may not add a capability, a measurement accuracy or a connectivity
   claim.
4. **WATCH Core is the product; Plus is a conditional expansion.** `WATCH-CORE` is `DEFINED` as a complete
   essential-monitoring package including a subscription entitlement. `WATCH-PLUS` is `CONDITIONAL` and may only
   ship once its additional inputs, rule depth, retention and sharing benefits are separately validated and
   costed; "more features" is not a justification.
5. **Safety and honesty capabilities are never edition-gated.** Manual takeover, physical E-stop status
   display, degraded-state and stale-data honesty, local operation without a subscription, data export and
   ownership transfer belong to every PILOT/SENSE/WATCH configuration, including the entry one.

**Rationale.** The programme cannot pass a product-definition milestone by inventing a turnkey steering SKU or a
"plus" tier with no evidenced benefit. Recording PILOT Pro as a quoted installation package keeps the commercial
model honest (see D-009), keeps the catalogue free of a SKU that cannot be priced, and lets the installer
channel be modelled without pretending that a survey is an order option. The module-plus-kit structure for SENSE
matches how the customer actually buys sensors and how the channel actually installs them.

**Consequences for the programme.** (a) MC-06 may PASS its definition scope while all three products stay
`DEFINED` and `NOT_FOR_SALE`. (b) The edition matrix is an input to MC-08 (bundles: no bundle may contain
`PILOT-PRO` as a priced item), MC-11 (BOM/conformity per module) and MC-25 (SKU readiness). (c) The validator
must reject any batch-02 edition carrying `RELEASED`/`FOR_SALE`/`APPROVED` and any kit that lists an undeclared
module. (d) No `src/`, `public/`, checkout, catalogue, price, stock, payment, deployment, brand-adoption or
trademark state changes.

**Evidence.** `docs/marea/products/README.md` §14 and §18, `docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md`,
`docs/marea/products/MAREA-PILOT-COMMERCIAL-SPEC.md`, `docs/marea/products/MAREA-SENSE-COMMERCIAL-SPEC.md`,
`docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md`, `docs/marea/products/product-definitions.batch-02.json`.

**Status effect.** Changes no lifecycle state, clears no blocker and approves no price.

## D-009 — 2026-10-30 — PILOT commercial model is quotation-based; "from EUR 1,290" is not a price

**Context.** The portfolio carries the hypothesis "PILOT from EUR 1,290" and MC-05 repeats that no turnkey
installation may be implied. A supervised steering installation contains: control electronics, an independent
motor driver, a compatible drive/actuator, heading and rudder feedback, a physical control head, cabling, power
protection, an emergency-stop assembly, mechanical interfaces, installation labour, commissioning, supervised
physical testing, conformity work, warranty reserve and installer margin. The first four items alone vary by an
order of magnitude between a tiller pilot on a 7 m sailboat and a hydraulic drive on a 12 m motor cruiser. No BOM,
supplier quotation, labour rate or certification cost exists (MC-02 X-05, H-05, H-07).

**Decision.**

1. **The PILOT commercial model is vessel-specific quotation.** No fixed all-inclusive PILOT price may be
   published, summed, bundled as a priced line or used as a checkout value.
2. **"from EUR 1,290" may only appear as a `HYPOTHESIS_UNAPPROVED` starting-price reference** for the minimum
   usable Coastal configuration, and only in internal documents that state simultaneously that it is not an
   all-inclusive quotation and that an inclusive quotation is required. Customer copy files carry no figures.
3. **Every quotation must enumerate inclusions and exclusions** (equipment, cabling, labour, commissioning, sea
   trial, training, conformity, warranty) and must be issued only after a documented vessel and steering survey
   (H-01; PILOT_SAFETY_GATE = BLOCKED).
4. **MC-06 approves no PILOT price, margin or bundle sum.** MC-12/MC-13 must produce bottom-up costs from real
   supplier and installer quotes before any number can be approved.

**Rationale.** A headline price that cannot be delivered for the minimum usable configuration is a commercial
misstatement, not an optimistic placeholder. A quotation model is also the only model compatible with a
BLOCKED safety gate: it makes the survey (and the refusal to quote an incompatible vessel) the first commercial
step rather than an afterthought.

**Consequences.** (a) The stack `MAREA SAIL` and `MAREA COMPLETE` bundle hypotheses cannot contain PILOT as a
priced inclusion; MC-08 must model them as "quotation required". (b) The validator must reject a PILOT edition
whose price hypothesis claims an inclusive quotation, and any `APPROVED` price. (c) Any future price approval
requires the evidence listed in `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md`.

**Evidence.** `docs/marea/products/README.md` §17–§18, `docs/marea/products/MAREA-PILOT-COMMERCIAL-SPEC.md`
F13–F15, `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md`, `docs/marea/COMMERCIAL-PORTFOLIO.md`
§04 and its price/channel decision rule.

**Status effect.** No price approved; PILOT remains `NOT_FOR_SALE` with a BLOCKED safety gate.

## D-010 — 2026-10-30 — One product-governance system across two batches; batch-02 claim and alert semantics

**Context.** MC-06 adds three products and three new claim domains (supervised steering, measurement validity,
notification delivery). Three risks had to be closed before writing: (1) a second validator with a second
vocabulary would make the nine-family governance unauditable; (2) the claims policy contains an approved PILOT
supervised-steering disclaimer but no approved measurement or alert-delivery wording, so inventing "approved"
text would breach MC-03 governance; (3) WATCH mixes event, alert and delivery meanings that are easy to conflate.

**Decision.**

1. **One validator, two contracts.** `scripts/check-marea-products.mjs` is extended, not duplicated, to validate
   `product-definitions.batch-01.json` and `product-definitions.batch-02.json` with the same 24-field, evidence,
   lifecycle and publication vocabulary. Batch-01 behaviour and its unit tests remain valid; new checks are
   additive and parameterised per batch.
2. **No claims-policy amendment in MC-06.** The approved PILOT disclaimer and the navigation disclaimer are used
   verbatim from `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9. The SENSE measurement-validity statement and the WATCH
   alert-delivery statement are recorded as **INTERNAL DRAFT limitation statements pending claims-register
   approval**: required in the drafts, never described as approved policy, and never published until the claims
   register in §8 carries them with an evidence artefact and an owner approval.
3. **Canonical WATCH notification semantics.** A single state machine is adopted (`EVENT_OBSERVED`,
   `RULE_MATCHED`, `ALERT_CREATED`, `QUEUED`, `PROVIDER_ACCEPTED`, `DELIVERED_WHEN_CONFIRMED`, `ACKNOWLEDGED`,
   `EXPIRED`, `FAILED`, `DELIVERY_UNKNOWN`) with eight distinct timestamps. Provider acceptance never implies
   delivery; delivery confirmation never implies that a human saw the alert; a device-offline event is only
   received after reconnection. No document may promise immediate delivery before measurement.
4. **Subscription isolation is a design requirement.** No commercial entitlement, price, renewal, payment failure
   or cancellation may disable local steering behaviour, valid local sensing, local alarms or other
   safety-relevant independent functions. Because WATCH/SENSE/WATCH-side services do not exist yet, this is
   recorded as a required behaviour, not as a tested one.
5. **Canonical absence stays absence.** MC-02 findings are carried with their own terminology: `WATCH_INGESTION`
   `NOT_VERIFIED`; `WATCH_NOTIFICATION_PIPELINE`, `WATCH_DEVICE_IDENTITY`, `WATCH_SUBSCRIPTION_SERVICE` and
   `WATCH_CONNECTIVITY_CONTRACT` `NOT_FOUND`; PILOT physical E-stop, motor isolation and rudder feedback
   `NOT_FOUND`; `PILOT_SAFETY_GATE` `BLOCKED`; `SENSE_MEASUREMENT_ACCURACY` `NOT_MEASURED`;
   `SENSE_NMEA2000` `NOT_IMPLEMENTED`. A specification does not convert an absence into a partial
   implementation.

**Rationale.** One governance system is what lets a later reviewer trust that nine products obey one vocabulary;
a parallel validator or a parallel disclaimer set would silently fork the programme's truth. Distinguishing
approved policy text from pending internal draft wording is the difference between drafting carefully and
inventing an approval. The WATCH state model exists because "we alerted the customer" is otherwise unverifiable.

**Consequences.** (a) The claims register must be populated before any PILOT/SENSE/WATCH copy is published; the
draft limitation statements are inputs to that register, not approvals. (b) MC-14 (legal/commercial risk) and
MC-27 (customer portal) inherit the notification and privacy semantics. (c) MC-34 verification must measure
delivery, accuracy and safety behaviour physically before any claim upgrades in class. (d) The nine-family
master brand contract remains the only authority for names and prohibited claim patterns.

**Evidence.** `docs/marea/products/README.md` §§12–22, `scripts/check-marea-products.mjs`,
`scripts/check-marea-products.test.mjs`, `docs/marea/products/product-definitions.batch-02.json`,
`docs/marea/products/WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md`,
`docs/marea/products/PILOT-SAFETY-CASE-OUTLINE.md`, `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §§4–9.

**Status effect.** No approval granted; all three products remain `DEFINED`, `NOT_FOR_SALE`, with
`BRAND_CLEARANCE = NOT_GRANTED`.

## D-011 — 2026-10-30 — Batch-02 edition set frozen; safety and honesty are never edition features

**Context.** `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §7 records six edition-level rules that the pricing,
compatibility, journey and copy deliverables must obey. They are not a new product structure — D-008 already
fixed it — but they are the regression rules that stop a later deliverable from adding a fourth PILOT edition, a
sixth SENSE module, a third WATCH edition, an edition-gated safety behaviour or a "Plus by uplift" price. Two of
them are the most likely customer misreadings in the whole portfolio: that remote alerting is a SENSE feature and
that WATCH can influence steering.

**Decision.** The following are binding for every batch-02 document, the JSON contract and the validator:

1. **Thirteen edition-level objects and no more:** three PILOT objects, eight SENSE objects (five modules, three
   kits), two WATCH objects. No fourth PILOT edition, no sixth SENSE module, no third WATCH edition.
2. **Verdicts are exactly those of README §14/§18:** `PILOT-COASTAL` `DEFINED`; `PILOT-SAIL` `CONDITIONAL`;
   `PILOT-PRO` `INSTALLATION_PACKAGE`; every SENSE module and `SENSE-ESSENTIALS` `DEFINED`; `SENSE-SAIL` and
   `SENSE-SYSTEMS` `CONDITIONAL`; `WATCH-CORE` `DEFINED`; `WATCH-PLUS` `CONDITIONAL`.
3. **Safety and honesty are never edition features.** E-stop, motor-power isolation, manual takeover, calibration,
   stale/invalid display, local function without a subscription, device identity, data export and ownership
   transfer are included in the base configuration of every edition, including the entry one.
4. **Remote alerting is never a SENSE feature; WATCH never steers.** A SENSE module has no connectivity and no
   push capability of its own; remote delivery requires WATCH plus connectivity plus an active subscription. No
   WATCH configuration, rule, sharing role or alert may engage, disengage or adjust the steering system.
5. **`WATCH-PLUS` is never priced by uplift** from Core; its additional benefits must be validated and costed
   separately before any price exists (see D-008 §4).
6. **PILOT Pro is a quoted service scope, not a retail SKU**, and the PILOT starting price is a hypothesis about
   a configuration, not a product price (D-008, D-009).

**Rationale.** An edition matrix is only useful if it is closed. Left open, each downstream deliverable would add
the one thing that seemed to fit its own page — a fourth tier, a bundled module, a "safety pack" — and the
customer would end up comparing configurations that no engineering plan supports. Recording the rules separately
from the structure also gives the reviewer a concrete checklist: thirteen objects, eight fixed verdicts, no
edition-gated safety, no SENSE connectivity, no WATCH steering, no Plus uplift.

**Consequences.** (a) MC-08 bundles may reference these editions but cannot add or rename one, and no bundle may
contain `PILOT-PRO` as a priced item. (b) MC-20/MC-24 catalogue and configurator work must reuse this object set
verbatim. (c) The validator and reviewer treat an added edition object, a renamed verdict or an edition-gated
safety capability as a defect. (d) Nothing here is available; all prices remain `HYPOTHESIS_UNAPPROVED` or
`NOT ESTABLISHED`.

**Evidence.** `docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §7-§8,
`docs/marea/products/README.md` §14/§18, `docs/marea/products/product-definitions.batch-02.json`,
`docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md`,
`docs/marea/products/CUSTOMER-JOURNEYS-PILOT-SENSE-WATCH.md`.

**Status effect.** No lifecycle change, no blocker cleared, no price approved.

## D-012 — 2026-10-30 — Batch-03 edition set frozen at seven objects; DISPLAY size stays conditional

**Context.** `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` fixes the last family structure of the programme. Two
batch-03 objects are unusually easy to mistranslate into a retail promise: the DISPLAY size designation (a
7-inch working class) and the conditional large display. Neither has a selected panel, enclosure or BOM, and both
were proposed in the portfolio as "DISPLAY 7" and "DISPLAY 10/12".

**Decision.** The batch-03 edition set is frozen at exactly seven objects: `DISPLAY-7`,
`DISPLAY-LARGE-CONDITIONAL`, `WEATHER-STANDARD`, `WEATHER-PRO`, `FLEET-START`, `FLEET-BUSINESS`,
`FLEET-ENTERPRISE`. No eighth object and no generation label, measured size or version suffix may be added.
`DISPLAY-7` is a conditional starting hypothesis (`SIZE_NOT_FROZEN`, `HARDWARE_NOT_SELECTED`); the 7-inch-class
designation is a commercial working label, never a measured specification. The EUR 699 hypothesis describes the
minimum display package only; installation, NAV, charts, WEATHER, HUB, AIS and extra mounts are never included.
`DISPLAY-LARGE-CONDITIONAL` carries no price and no measured size, and may be withdrawn without commercial
consequence if hardware selection does not support a second size class.

**Rationale.** The portfolio text "DISPLAY 10/12" was a range for a future decision, not a product. If the
programme carried that range into pages, editions and bundles, a later hardware decision would have to contradict
published material. Making the conditional object explicit — with an exit — lets engineering and procurement
decide the second size on cost evidence instead of on a mock-up.

**Consequences.** (a) MC-08 bundles may reference these objects but cannot add or rename one; no bundle may
present `DISPLAY-LARGE-CONDITIONAL` as included hardware. (b) MC-20–MC-24 catalogue and page work reuse this
object set verbatim. (c) The validator and reviewer treat an added edition object, a published size or a price on
the conditional object as a defect. (d) Nothing is available; prices stay `HYPOTHESIS_UNAPPROVED` or
`NOT_ESTABLISHED`.

**Evidence.** `docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` §2, §6 and §8 (CD-01, CD-02, CD-03);
`docs/marea/products/MAREA-DISPLAY-COMMERCIAL-SPEC.md`; `docs/marea/products/README.md` §26–§27;
`docs/marea/products/product-definitions.batch-03.json`.

**Status effect.** No lifecycle change, no blocker cleared, no price approved, no size frozen.

## D-013 — 2026-10-30 — WEATHER uses one entitlement ledger; NAV and WEATHER never bill the same entitlement twice

**Context.** The portfolio states that WEATHER is separately useful and that NAV Pro may include WEATHER rights.
Without a recorded rule, the most likely commercial defect in the programme is a customer paying twice for one
forecast entitlement — once through NAV Pro and again through a WEATHER subscription — or losing user-owned
saved locations when NAV is cancelled.

**Decision.** WEATHER is one product with one entitlement ledger and two consumer editions. A customer may buy
WEATHER standalone. NAV Pro may include WEATHER Standard-equivalent read access only where provider rights allow
(`CONDITIONAL`). An upgrade from Standard to Pro applies a prorated credit. The same entitlement is never billed
twice across NAV and WEATHER, and no NAV or WEATHER surface may present a second charge for an entitlement
already active. Cancelling NAV never deletes user-owned WEATHER records (saved locations, preferences); a
read-only export window applies (hypothesis 30 days, subject to legal review). Provider-licence loss produces an
honest unavailable-data state with attribution retained; an expired entitlement never renders a fabricated or
frozen forecast as current.

**Rationale.** This is the pricing rule most likely to be lost between a portfolio table and a billing engine, and
the one most likely to become a customer complaint or a consumer-law problem. Recording it now makes MC-16 and the
later commerce milestones implement a stated contract rather than invent one.

**Consequences.** (a) Any billing design that creates two independent WEATHER entitlements for one customer is a
defect. (b) MC-16 must consume this rule; MC-07 implements no billing. (c) The validator rejects a batch-03
contract that permits double billing. (d) Provider rights remain `NOT_GRANTED`; the rule does not create a right.

**Evidence.** `docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` §8 (CD-04);
`docs/marea/products/MAREA-WEATHER-COMMERCIAL-SPEC.md` F12; `docs/marea/products/README.md` §25 rule 6 and §27;
`docs/marea/products/product-definitions.batch-03.json` (`navDoubleBillingAllowed: false`).

**Status effect.** No lifecycle change, no blocker cleared, no price approved.

## D-014 — 2026-10-30 — FLEET is priced per vessel per month, VAT excluded; Enterprise is a contracted tier with no invented SLA

**Context.** The portfolio hypothesis is "from EUR 49 per vessel per month, excluding VAT". FLEET is the only
B2B SaaS family in the programme, and B2B pages routinely acquire "unlimited" language, a fabricated uptime
figure and a standard-checkout Enterprise SKU. None of those has evidence.

**Decision.** FLEET pricing is per vessel per month, VAT excluded. `FLEET-START` (from EUR 49) and
`FLEET-BUSINESS` (EUR 79) are `HYPOTHESIS_UNAPPROVED`; no organisation fee is approved; seats are included in
those tiers as a hypothesis, not a committed entitlement; onboarding, installation, connectivity and hardware are
separately quoted. `FLEET-ENTERPRISE` is a `CONTRACTED_TIER`, not a checkout SKU, with `NOT_ESTABLISHED` price and
no invented SLA. Any service level exists only as a contracted commitment with measurement evidence; otherwise
the statement is `NO_SLA_ESTABLISHED`. No "unlimited" vessels, users, storage or API allowance may be promised in
any edition, and telemetry, storage and API limits are stated explicitly.

**Rationale.** A per-vessel price is the established shape in professional maritime software, but the evidence is
comparator-only and the unit economics are unproven. Freezing the pricing *shape* and the Enterprise *status*
separately from the amount allows MC-08 packaging and MC-16 billing to proceed without converting a hypothesis
into a promise.

**Consequences.** (a) MC-08 may build the MAREA FLEET package as a separate integrated offer; the package is not a
FLEET subscription and its content and price are not decided here. (b) No FLEET document may state an uptime
figure or a security certification. (c) The validator rejects a batch-03 contract with an established SLA,
unlimited entitlement or remote control. (d) No customer production data may be used to test FLEET.

**Evidence.** `docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` §8 (CD-05, CD-06);
`docs/marea/products/MAREA-FLEET-COMMERCIAL-SPEC.md` F13/F14/F15; `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §9;
`docs/marea/products/FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md`; `docs/marea/products/README.md` §26–§27.

**Status effect.** No lifecycle change, no blocker cleared, no price approved, no SLA established.

## D-015 — 2026-10-30 — Safety, security and data portability are never edition features; the nine market distinctions are engineering requirements

**Context.** MC-06 recorded that safety and honesty are never edition features (D-011). Batch 03 introduces a
physical display that must never gain steering authority, a data service that must never fabricate certainty and a
multi-tenant SaaS whose isolation cannot be sold as a premium tier. The programme also relies on nine distinctions
that customers routinely get wrong (NAV≠DISPLAY, WEATHER≠NAV, FLEET SaaS≠package, WATCH≠FLEET, DISPLAY≠tablet,
SENSE≠WATCH, HUB≠sensor, AIS=receive-only, PILOT=supervised local steering).

**Decision.** The following are in every edition of every batch-03 product and are never paid upgrades or hidden
add-ons: tenant isolation and server-side authorization; role scoping, revocation and audit; customer data export
and deletion; stale/lost/missing-state honesty; subscription isolation (local safety-relevant function survives an
expired entitlement); device/organisation ownership transfer; provider attribution; and the read-only telemetry
boundary. The nine distinctions are engineering requirements, pre-empted at the point of price, edition choice and
quotation: no DISPLAY steering authority; no NAV or WEATHER double billing; no FLEET package silently included in
the SaaS subscription; no FLEET vessel control; no tablet-equals-DISPLAY claim; no SENSE remote alerting; no HUB
sensing claim; AIS receive-only; PILOT supervised and local.

**Rationale.** Edition-gated safety and edition-gated privacy are the classic path to a product where the cheap
tier is unsafe or non-compliant. Making the boundary explicit also gives the reviewer a checklist that does not
depend on reading the whole dossier.

**Consequences.** (a) Any batch-03 marketing, pricing or contract text that presents isolation, export, audit,
stale-state honesty or the no-control boundary as an upgrade is a defect. (b) MC-08 bundles may not re-gate them.
(c) The validator and the independent review enforce both lists.

**Evidence.** `docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` §6 and §8 (CD-07, CD-08);
`docs/marea/products/README.md` §25 rule 10 and §31; `docs/marea/products/MAREA-NINE-PRODUCT-ECOSYSTEM.md` §4 and §7.

**Status effect.** No lifecycle change, no blocker cleared, no price approved.

## D-016 — 2026-10-30 — One product-governance system across three batches; batch-03 claim, price and validation rules

**Context.** MC-07 closes the definition phase with three new families, but the programme now has three machine
contracts, nine dossiers, nine copy pairs and one validator. The risk at this point is architectural drift: a
second lifecycle, a fourth evidence vocabulary, a batch-03-only validator or a price rule invented for the new
products.

**Decision.** MC-07 extends the existing system and creates no parallel one. It follows the MC-05 contract and the
MC-06 addendum exactly: the same 24 fields, the same six evidence classes, the same seven-state lifecycle (D-007),
the same nine readiness dimensions, the same claim rules and the same validator, extended with a `BATCH_03`
configuration inside the existing `BATCHES` array. The batch-03 claim rules of `README` §25 apply (DISPLAY physical
claims are targets not measurements; WEATHER never fabricates certainty and tracks provider rights per variable;
FLEET claims no deployment, certification, SLA or control path). The only permitted batch-03 price figures are
`DISPLAY-7` from EUR 699, `WEATHER-STANDARD` from EUR 49/year, `WEATHER-PRO` EUR 89/year, `FLEET-START` from EUR 49
per vessel/month and `FLEET-BUSINESS` EUR 79 per vessel/month, all `HYPOTHESIS_UNAPPROVED`; `DISPLAY-LARGE-CONDITIONAL`
and `FLEET-ENTERPRISE` have no price. The edition-level register codes `DSP`, `WX` and `FL` are the editions
document's authority and map to — never replace — the dossier capability codes. Batch-01 and batch-02 promises are
not weakened: the nine-product validator continues to enforce both earlier batches.

**Rationale.** Documentation milestones are cheap to fork and expensive to reconcile. The only reason nine
families can be reviewed as one portfolio is that they share vocabulary; the only reason a future milestone can
consume them is that they share a contract family. A batch-03-only validator would immediately become a second
source of truth.

**Consequences.** (a) Any new lifecycle state, evidence class or readiness value introduced by a later milestone is
a programme-level decision, not a local one. (b) MC-08 bundles, MC-20–MC-24 pages and MC-32–MC-36 verification
consume the three contracts together. (c) The reviewer's audit target is the single MC-07 commit plus its diff
from MC-06 HEAD. (d) Nothing here is available; the programme remains a definition phase.

**Evidence.** `docs/marea/products/README.md` §24–§32; `docs/marea/products/product-definitions.batch-03.json`;
`scripts/check-marea-products.mjs`; `docs/marea/products/MC-07-DELIVERY.md`;
`docs/marea/products/MC-07-REVIEW.md`.

**Status effect.** No lifecycle change, no blocker cleared, no price approved, no publication authorised.


## D-017 — 2026-10-30 — Batch-03 machine contract: field/product/edition schema unchanged; meta-section delta is explicit

**Context.** The batch-03 contract inherits the batch-02 field, product and edition schema exactly, but the batch-02
meta sections were written for a hardware/alert batch (`dependencySemantics`, `notificationStates`,
`notificationTimestamps`, `subscriptionIsolationRules`, `safetyGates`). A device/data/SaaS batch has no PILOT or
WATCH alert state machine, so those sections do not apply, while publication gates, integration-status vocabulary,
tenancy and entitlement models do.

**Decision.** The batch-03 contract keeps the frozen field schema (24 keys × 3 products), field-entry schema,
product-level schema, evidence classes, lifecycle, readiness dimensions, publication controls and the
`batch01Contract`/`batch02Contract` links. It replaces the five non-applicable batch-02 meta sections with
`publicationGates`, `integrationStatusVocabulary`, `tenancyModel` and `entitlementModel`. The delta is documented
in README §30 and is not a new validation vocabulary: no field key, edition object or product identity changes.

**Rationale.** Keeping an alert-state machine for products that do not alert would be a false claim; deleting the
sections silently would be schema drift. Documenting the delta explicitly keeps the three contracts comparable where
it matters (fields, products, editions, evidence, readiness) and honest where the product categories differ.

**Consequences.** (a) A future batch that adds an alerting product must restore the alert sections; a batch that does
not may inherit the batch-03 delta. (b) The validator enforces the field/product/edition schema, not the presence of
non-applicable meta sections. (c) The reviewer treats any *undocumented* schema delta as a defect.

**Evidence.** `docs/marea/products/product-definitions.batch-03.json`; `docs/marea/products/README.md` §30;
`scripts/check-marea-products.mjs`.

**Status effect.** No lifecycle change, no blocker cleared, no price approved.

## D-018 — 2026-10-30 — MC-08 bundle definitions are a distinct contract type; no bundle inherits product approval

**Context.** MC-08 turns the nine defined products into six commercial solutions. The programme has one
product lifecycle (D-007), one evidence vocabulary and one machine-contract family. A bundle milestone could
easily fork that system with a bundle lifecycle, a bundle "READY" flag, a bundle SKU or an inherited
certification. It could also convert a blocked product into a sellable package simply by naming it inside a
solution.

**Decision.** (1) Bundles are a **distinct document and contract type** (`BUNDLE_DEFINITION_CONTRACT`), not a
product family and not a commerce catalogue. Exactly six bundles exist: `START`, `CRUISE`, `SAIL`, `PROTECT`,
`COMPLETE`, `FLEET` (customer-facing `MAREA FLEET package`). (2) Every bundle uses the 24 bundle fields B01–B24
defined in `BUNDLE-ARCHITECTURE.md` §7 and carries evidence class, owner, references and release readiness
per field; `TBD` is prohibited. (3) No new lifecycle, readiness or evidence vocabulary is created; the D-007
lifecycle and the MC-05/MC-06/MC-07 vocabulary apply unchanged. All six bundles are `DEFINED` internally,
`NOT_FOR_SALE` and `INTERNAL_ONLY`. (4) The only configuration outcomes are
`CONFIGURATION_DEFINED_INTERNAL`, `COMPATIBILITY_EVIDENCE_REQUIRED`, `SPECIALIST_SURVEY_REQUIRED`,
`QUOTATION_REQUIRED`, `NOT_ELIGIBLE` and `PUBLICATION_BLOCKED`; `ORDERABLE` does not exist in MC-08. (5) A
bundle cannot inherit certification, compatibility, pricing, data-rights or publication approval from its
components, and a bundle containing a blocked product remains blocked. (6) The bundle contract, inclusion
vocabulary, conflict rules and eligibility questionnaires are reusable by MC-16, MC-23 and MC-24.

**Rationale.** The nine-product governance is only auditable if the bundle layer consumes it rather than
copies it. A bundle-specific lifecycle or an `ORDERABLE` outcome would let packaging become a second release
gate - the exact failure the programme is designed to prevent.

**Consequences.** (a) MC-08 may PASS its definition scope with all six bundles `NOT_FOR_SALE`. (b) The bundle
validator must consume the three product contracts rather than maintain a product-name registry, and must
reject any sale/approval/ORDERABLE state. (c) MC-16/MC-23/MC-24 must consume the same vocabulary and may not
invent commercial rules in the configurator.

**Evidence.** `docs/marea/bundles/BUNDLE-ARCHITECTURE.md`; `docs/marea/bundles/bundle-definitions.json`;
`docs/marea/bundles/BUNDLE-CONFIGURATION-RULES.md`; `docs/marea/products/README.md` §1–§8, §24–§32.

**Status effect.** No lifecycle change, no blocker cleared, no price approved, no publication authorised.

## D-019 — 2026-10-30 — Bundle reference configurations and edition pairings fixed

**Context.** A bundle is only honest if it names the exact editions that deliver its outcome. Two historical
bundle hypotheses can be reconciled against the edition hypotheses only if the pairing is explicit: START
EUR 499 against NAV/HUB editions, and CRUISE EUR 1,399 against NAV/HUB/AIS/DISPLAY editions. Leaving the
pairing to a later configurator would allow a "bundle" to be assembled from editions that cannot deliver the
promised outcome.

**Decision.** The canonical internal reference configurations are fixed: (1) `START` = `HUB-STANDARD` +
`NAV-PRO`, because live instrument overlays are a NAV Pro capability (N10); `NAV-ESSENTIAL` is a documented
lower-cost variant, not the reference. (2) `CRUISE` = `NAV-ESSENTIAL` + `HUB-STANDARD` + `AIS-RECEIVER` +
`DISPLAY-7`, because AIS target display is included in NAV Essential (N11) and the fixed display is the
navigation surface. (3) `SAIL` = `NAV-PRO` + `HUB-STANDARD` + `PILOT-COASTAL` (quotation required) +
`SENSE-WIND` (conditional steering input). (4) `PROTECT` = `WATCH-CORE` + `SENSE-ESSENTIALS` (D-020).
(5) `COMPLETE` = `NAV-PRO` + `HUB-PRO` + `DISPLAY-7` + `WATCH-CORE` + `SENSE-POWER`/`BILGE`/`TANKS`/`ENV` +
`PILOT-COASTAL` (quotation required); AIS and WEATHER are optional. (6) `FLEET` package = `FLEET-START` or
`FLEET-BUSINESS` subscription + separately quoted onboarding/registration/training/support; hardware,
connectivity and installation are optional or quoted. `AIS-CONNECTED` is `CONDITIONAL` and not selected;
`DISPLAY-LARGE-CONDITIONAL` is `INELIGIBLE` and never selectable; `PILOT-SAIL` is conditional and not default;
`PILOT-PRO` is never a priced retail line.

**Rationale.** Edition choice is a commercial decision with customer-visible consequences. Recording it makes
the price reconciliation auditable (START 149+349 = 498 first-year hypotheses against EUR 499; CRUISE
99+349+249+699 = 1,396 against EUR 1,399) and prevents a future configurator from silently substituting a
cheaper edition that does not deliver the promised outcome.

**Consequences.** (a) A bundle configuration that replaces the reference edition must state the outcome
difference and cannot be called the same bundle. (b) The validator enforces edition resolution and the
ineligibility of the conditional display and priced PILOT-Pro. (c) No pair of otherwise valid editions may be
used to bypass the safety or data-rights gates.

**Evidence.** `BUNDLE-ARCHITECTURE.md` §6; `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md`; `PRODUCT-EDITIONS-NAV-HUB-AIS.md`;
`PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md`; `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`;
`PRODUCT-PRICING-AND-CHANNEL-MODEL*.md`; `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`.

**Status effect.** No lifecycle change, no blocker cleared, no price approved.

## D-020 — 2026-10-30 — PROTECT counts sensors once; kits expand to modules and HUB is not required

**Context.** PROTECT is defined as WATCH plus essential sensors. The SENSE family has both loose modules and
the `SENSE-ESSENTIALS` kit (power + bilge), which makes double counting the most likely composition defect in
the milestone. The WATCH dossier also does not require a HUB, but batch-01 experience makes "a gateway is
always needed" an easy assumption.

**Decision.** (1) PROTECT's sensor content is the single `SENSE-ESSENTIALS` kit line, which expands exactly to
`SENSE-POWER` + `SENSE-BILGE`; adding a loose power or bilge module as well is a duplicate and the
configuration must be rejected (conflict CF-03). (2) Kit expansion is a declared mapping in
`bundle-definitions.json` and the validator cross-checks it against the editions authority and the product
contracts; a kit never invents a capability absent from its modules. (3) HUB is **not** required for the WATCH
data path: batch-02 row I-11 defines no required HUB relationship for WATCH, and the intended sensor path is
I-08 (`SENSE → WATCH`, `PLANNED`). `HUB-STANDARD` is an optional local dashboard only. (4) PROTECT is a
solution bundle, not a SENSE kit and not a WATCH product page: hardware, sensors, connectivity, subscription
and installation are each explicit.

**Rationale.** A duplicated sensor inflates the value proposition and the price while delivering no extra
measurement. A required HUB would add an unjustified EUR 349 product and a second installation to a
monitoring solution that does not need it.

**Consequences.** (a) The bundle validator implements kit expansion and duplicate detection. (b) The PROTECT
specification and pricing framework exclude the HUB from the reference configuration. (c) MC-24 may not add a
loose module when the kit already covers it.

**Evidence.** `MAREA-PROTECT-COMMERCIAL-SPEC.md`; `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §3;
`PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` rows I-08/I-11; `bundle-definitions.json`.

**Status effect.** No lifecycle change, no blocker cleared, no price approved.

## D-021 — 2026-10-30 — SAIL and COMPLETE remain vessel-specific quotations; PILOT is never a priced bundle line

**Context.** The portfolio carries a SAIL hypothesis of EUR 1,990 and a COMPLETE hypothesis of EUR 3,490. Both
contain PILOT. D-009 already establishes that PILOT is a vessel-specific quotation and that "from EUR 1,290"
is not an all-inclusive price. A bundle milestone is exactly where that rule could be quietly reversed by
summing component hypotheses into a "bundle price".

**Decision.** (1) SAIL and COMPLETE carry
`COMPLETE_COMMERCIAL_MODEL = VESSEL_SPECIFIC_QUOTATION`, `FIXED_TURNKEY_PRICE = NOT_ESTABLISHED`,
`fixedTurnkeyPriceApproved = false`, `pilotSurveyRequired = true` and `quoteRequired = true`. (2) PILOT is
modelled as `QUOTATION_REQUIRED`, never as an `INCLUDED` priced line; `PILOT-PRO` is `INELIGIBLE` as a priced
retail SKU and may only appear as a quoted service scope. (3) The historical EUR 1,990 and EUR 3,490 are
recorded for traceability as `HYPOTHESIS_UNAPPROVED` and are never presented as full installed prices or used
as checkout values. (4) No bundle may provide a fixed-price checkout path for a PILOT installation, and no
PILOT command path may be introduced through a bundle. (5) The PILOT safety gate remains
`PILOT_SAFETY_GATE = BLOCKED`; SAIL and COMPLETE release readiness is `BLOCKED`.

**Rationale.** A steering installation's content varies by an order of magnitude between vessels. A bundle
price that cannot be delivered for the minimum usable configuration is a commercial misstatement, and a
fixed-price checkout would put a blocked safety-critical product into an orderable state by packaging.

**Consequences.** (a) SAIL/COMPLETE specs, copy, journeys and pricing are quotation-led; the validator rejects
approved turnkey prices and priced PILOT-Pro. (b) MC-24 quotation triage must produce a survey/quotation
outcome, never an orderable bundle. (c) The historical figures are not withdrawn from the record, only from
the offer.

**Evidence.** `MAREA-SAIL-COMMERCIAL-SPEC.md`; `MAREA-COMPLETE-COMMERCIAL-SPEC.md`;
`BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md`; `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`; D-008/D-009;
`MAREA-PILOT-COMMERCIAL-SPEC.md`; `PILOT-SAFETY-CASE-OUTLINE.md`.

**Status effect.** No lifecycle change, no blocker cleared, no price approved, PILOT safety remains BLOCKED.

## D-022 — 2026-10-30 — The MAREA FLEET package is distinct from the MAREA FLEET SaaS product family

**Context.** "MAREA FLEET" already names a B2B SaaS product family (`FLEET-START`, `FLEET-BUSINESS`,
`FLEET-ENTERPRISE`). MC-08 adds the "MAREA FLEET package", a wider professional offer that may include
onboarding, installation, hardware and connectivity. Without a recorded boundary, the package would become a
tenth family or the per-vessel SaaS fee would silently absorb hardware.

**Decision.** (1) The bundle id is `FLEET`, machine `displayName` stays `MAREA FLEET`, and the customer-facing
bundle name is always `MAREA FLEET package`. It is not a tenth product family and not a second SaaS.
(2) The FLEET SaaS subscription remains the only SaaS edition set; the package composes it with separately
quoted services and optional equipment. (3) Flags are frozen: `contractedSolution = true`,
`hardwareIncludedByDefault = false`, `onboardingPricingEstablished = false`,
`fixedPackagePriceEstablished = false`. (4) Hardware (WATCH/HUB/SENSE), connectivity/SIM, installation and
onboarding are never included by default in the per-vessel fee; any SIL/contracted SLA exists only as a
written, measurable commitment, otherwise `NO_SLA_ESTABLISHED`. (5) Tenant isolation, roles, audit,
export/deletion and the read-only telemetry boundary are design requirements in every edition and are never
sold as a premium tier; a device included in a package confers no tenant access.

**Rationale.** The two senses of "FLEET" are the most likely customer and commercial confusion in the
portfolio. Separating the product family from the package preserves the SaaS pricing shape (D-014) while
allowing a legitimate integrated B2B offer.

**Consequences.** (a) No document may merge the two into one price or offer. (b) The validator rejects
cross-tenant access, automatic hardware inclusion and invented SLAs. (c) MC-23/MC-24 must present the package
and the product family distinctly.

**Evidence.** `MAREA-FLEET-PACKAGE-COMMERCIAL-SPEC.md`; `docs/marea/brand/brand-identity.contract.json`
(`fleetDisambiguation`); `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` §4; D-014/D-015.

**Status effect.** No lifecycle change, no blocker cleared, no price approved, no SLA established.

## D-023 — 2026-10-30 — Historical bundle prices remain unapproved; the price challenge verdicts are recorded

**Context.** The portfolio contains five bundle price hypotheses and one bespoke package. MC-08 is the first
milestone that can reconcile them against edition hypotheses and installation content. The risk is that a
documentation milestone ratifies a headline figure by repeating it in a specification.

**Decision.** (1) Every historical bundle figure remains `HYPOTHESIS_UNAPPROVED`; no price, discount, margin
or VAT treatment is approved. (2) Verdicts are recorded: `START` EUR 499 is plausible only as an
**uninstalled, product-only, first-year** reference against the 149+349 = 498 component hypotheses;
`CRUISE` EUR 1,399 is plausible only as an uninstalled, product-only, first-year reference against
99+349+249+699 = 1,396 and is **not** an installed-system price; `SAIL` EUR 1,990 is
`FULL_BUNDLE_PRICE_NOT_ESTABLISHED`; `PROTECT` EUR 399 plus subscription is
`HISTORIC_PRICE_NOT_COST_JUSTIFIED` with final price `OPEN`; `COMPLETE` EUR 3,490 is
`FIXED_TURNKEY_PRICE = NOT_ESTABLISHED`; the `FLEET` package is bespoke. (3) No discount is approved; a
bundle discount may only be justified by shared packaging, shared installation, reduced acquisition cost,
reduced support duplication or channel efficiency, and may never hide mandatory accessories or installation.
(4) No supplier/BOM/labour/connectivity/provider cost exists, so no contribution margin may be asserted.

**Rationale.** A price becomes real through repetition. Recording the challenge, the missing cost categories
and the exact conditions under which a figure could be legitimate prevents a later catalogue from treating a
historical number as an approved price. The START/CRUISE sums match the historical figures closely enough to
show they were product-only hypotheses, not installed-solution prices.

**Consequences.** (a) MC-11/MC-12 must produce BOM, supplier, labour and data costs before any price
approval. (b) The validator rejects `APPROVED`/`FINAL` prices, approved turnkey prices for SAIL/COMPLETE and
any price in customer copy. (c) The delivery report must not present a PASS as a price approval.

**Evidence.** `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`; `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md`;
`PRODUCT-PRICING-AND-CHANNEL-MODEL*.md`; `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` X-05.

**Status effect.** No lifecycle change, no blocker cleared, no price approved.

## D-024 — 2026-10-30 — Journey-stage reconciliation and bundle asset identity

**Context.** MC-08 must deliver six 17-stage journeys. The established journey model in
`docs/marea/products/README.md` §22 uses different stage labels from the MC-08 prompt's list (e.g. "Compatibility"
vs "Eligibility", "Editions" vs "Configuration", "Fulfilment" vs "Order/contract", "Upgrade" vs "Expansion").
The milestone also needs 60 bundle asset identifiers without colliding with the existing product asset ids
(`FLEET-HERO-01` is already a FLEET product asset).

**Decision.** (1) The README §22 17-stage model is canonical for MC-08; the MC-08 prompt labels are recorded as
an explicit alias mapping in `BUNDLE-CUSTOMER-JOURNEYS.md` §1 (D-024). No second journey model is created.
(2) Each stage records ten columns: Stage; Customer action; Touchpoint; Expected outcome; Preconditions;
Failure/recovery; Required commercial data; Technical evidence; Trust/legal status; Future acceptance test.
(3) Bundle asset ids use bundle prefixes `START-`, `CRUISE-`, `SAIL-`, `PROTECT-`, `COMPLETE-`, `FLEETPKG-`
with the fixed ten-suffix model (`HERO-01`, `USE-02`, `OVR-03`, `EDN-04`, `ECO-05`, `INS-06`, `MOB-07`,
`TMB-08`, `OG-09`, `TEC-10`), giving 60 unique ids. `FLEETPKG-` avoids collision with the FLEET product asset
set. (4) Asset reconciliation is fixed: 60 planned = 24 blocked-on-image-generation + 30 reused MC-04
vector/brief concepts + 6 authored specifications; 0 real-product assets, 0 publicly approved assets, 0
generated files.

**Rationale.** Two journey vocabularies would make journey acceptance untestable, and colliding asset ids
would corrupt the future manifest. An explicit alias map and a distinct bundle prefix keep both systems
auditable.

**Consequences.** (a) The asset-requirements document and the machine contract use the 60 ids and the
reconciliation. (b) The validator enforces 24/30/6 reconciliation and ES/EN alt text. (c) No image may be
generated while X-03 is BLOCKED.

**Evidence.** `BUNDLE-CUSTOMER-JOURNEYS.md`; `BUNDLE-ASSET-REQUIREMENTS.md`; `docs/marea/products/README.md`
§22, §29; `docs/marea/brand/assets/` existing vector inventory.

**Status effect.** No lifecycle change, no blocker cleared, no price approved, no image generated, no
publication authorised.

## D-025 — 2026-10-30 — Historical portfolio wording "certified supervised pilot" is not an approval and is not carried into any bundle

**Context.** The historical bundle table in `docs/marea/COMMERCIAL-PORTFOLIO.md` lists MAREA COMPLETE as
"NAV, instruments, monitoring, display, certified supervised pilot". No PILOT certification exists (and the
PILOT safety gate is `BLOCKED`, with no bench evidence, sea trials or conformity assessment), so the word
"certified" is an unsupported historical assumption. MC-08 must not repeat it, and must not silently rewrite
the portfolio either.

**Decision.** (1) The word "certified" is not used for PILOT, for COMPLETE or for any bundle in MC-08.
(2) The nine-product authority (`MAREA-PILOT-COMMERCIAL-SPEC.md`, `PILOT-SAFETY-CASE-OUTLINE.md`,
`PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md`, D-008/D-009) governs: PILOT is supervised, vessel-specific,
quotation-only and uncertified. (3) If a certified steering product is ever intended, it requires its own
regulatory scope, conformity evidence and a separate product/edition decision; it cannot be created by bundle
wording. (4) The conflict is recorded as an upstream wording issue for the business owner rather than edited
into the historical portfolio record.

**Rationale.** "Certified" is a regulated, consequential claim. Repeating it in a bundle specification would
convert an unsupported historical word into an apparent commercial promise, and silently editing the
historical record would hide the conflict from the reviewer.

**Consequences.** (a) SAIL/COMPLETE copy carries no certification claim. (b) The validator and reviewer must
reject any certification claim in bundle docs or copy. (c) Any future certification ambition is a separate
milestone with its own evidence, not a bundle update.

**Evidence.** `docs/marea/COMMERCIAL-PORTFOLIO.md` historical bundle table; `MAREA-PILOT-COMMERCIAL-SPEC.md`;
`PILOT-SAFETY-CASE-OUTLINE.md`; `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md` §11;
`MAREA-COMPLETE-COMMERCIAL-SPEC.md`.

**Status effect.** No lifecycle change, no blocker cleared, no certification created, no price approved.

## D-026 - 2026-10-31 - MC-09 authorises real desk research only, and market evidence cannot create a commercial approval

**Context.** Master Prompt 09/36 requires real public market research, competitor benchmarking,
buyer segmentation, pricing hypotheses and MC-10 preparation, while withholding publication, sales,
customer outreach and paid research authorisation. The programme already treats documentation as a
separate evidence class from physical, legal and commercial facts.

**Decision.** (1) MC-09 performs desk research only: no interviews, surveys, advertising, purchases,
outreach or paid data. (2) Every market or competitor claim carries a source registry entry with URL,
publisher, retrieval date, evidence class, confidence and limitations, or is recorded as `UNKNOWN`
with the missing evidence named. (3) A research PASS never changes `TRADEMARK_LEGAL_CLEARANCE =
NOT_GRANTED`, `SOURCE_IP_CLEARANCE = NOT_CLEARED`, `NOT_FOR_SALE`, the PILOT safety gate, WATCH alert
honesty or FLEET hardware defaults. (4) Hypotheses stay `HYPOTHESIS_UNAPPROVED`; competitor prices are
not willingness to pay; missing costs are never zero. (5) `scripts/check-marea-market.mjs` and its
negative-mutation suite enforce these rules mechanically, and an independent auditor rechecks sources
and the real diff.

**Rationale.** The programme's commercial risk is not a lack of confident language but the conversion
of an assumption into an apparent commitment. Machine-checked honesty is the only durable control.

**Consequences.** (a) 115 sources and 136 claims are registered and traceable. (b) Demand, WTP and
profitability remain explicitly unvalidated and `PROFITABILITY_NOT_ESTABLISHED`. (c) A PASS is limited
to the desk-research scope. (d) MC-10 remains not started and needs separate authorisation.

**Evidence.** `docs/marea/market-validation/MC09-RESEARCH-SCOPE.md`;
`docs/marea/market-validation/data/governance-status.json`;
`scripts/check-marea-market.mjs`; `scripts/check-marea-market.test.mjs`; `MC-09-DELIVERY.md`.

**Status effect.** No lifecycle change, no blocker cleared, no price approved, no publication or sale.

## D-027 - 2026-10-31 - Commercial validation is sequenced software-first, hardware-second

**Context.** MC-09 compared the software/services families (NAV, WEATHER, WATCH subscription) with the
hardware families (HUB, AIS, SENSE, DISPLAY). Software has direct distribution and no manufacturing,
conformity or installation dependency; hardware requires BOM, CE/EMC, installation and support that are
all unestablished, while every hardware category already has mature, price-transparent incumbents.

**Decision.** Commercial validation prioritises NAV (navigation) and WATCH/PROTECT (monitoring) before
any hardware development commitment. HUB remains the candidate hardware component but only after
integration value is evidenced. AIS and DISPLAY are reconsidered as integration of established equipment
rather than manufactured products. FLEET is the post-beachhead recurring expansion. PILOT, SAIL and
standalone SENSE are deferred (safety gate, dependency chain, commoditisation respectively).

**Rationale.** Being wrong about software costs a learning cycle; being wrong about hardware costs
tooling, inventory and conformity. The market already pays for navigation and monitoring software, so
demand can be tested before capital is committed.

**Consequences.** (a) MC-10 recruitment prioritises S3, S1, S5 and S6. (b) No hardware BOM or tooling is
authorised. (c) Each family/bundle decision is recorded in `data/decision-links.json` with its evidence
thresholds. (d) No canonical product definition or `NOT_FOR_SALE` status changes.

**Evidence.** `docs/marea/market-validation/MC09-PORTFOLIO-PRIORITIZATION.md`;
`docs/marea/market-validation/MC09-COMPETITIVE-POSITIONING.md`;
`docs/marea/market-validation/data/product-assessments.json`;
`docs/marea/market-validation/data/bundle-assessments.json`.

**Status effect.** No lifecycle change, no blocker cleared, no price approved, no sale.

## D-028 - 2026-10-31 - MC-09 finds no defensible price and leaves profitability unestablished

**Context.** The historical MAREA figures are unapproved hypotheses. MC-09 observed heterogeneous
competitor prices and no installed complete-solution price anywhere in the market. Installation labour is
observable in Spain (EUR 59-76/hour, electronics EUR 61/hour at Marina Coruna, VAT excluded) but no
Spanish marine-electronics installer tariff, BOM, supplier quotation, channel margin, connectivity cost or
CAC could be verified. The PROTECT historical figure (EUR 399) is below its own composition (WATCH EUR 299
plus two SENSE modules at EUR 99 = EUR 497 before installation).

**Decision.** (1) No family or bundle price is approved; the historical register stays
`HYPOTHESIS_UNAPPROVED` / `NOT_ESTABLISHED`. (2) `PROFITABILITY_NOT_ESTABLISHED` applies to all nine
families and six bundles. (3) MC-09 records the composition contradiction of PROTECT and the below-parts-floor
historical figures of SAIL and COMPLETE for traceability, without rewriting the historical record.
(4) Price proposals require MC-10 WTP evidence plus real supplier quotations and a verified Spanish
installation rate.

**Rationale.** Approving a price without cost or willingness-to-pay evidence would convert a research
milestone into an unfounded commercial commitment, which the programme prohibits.

**Consequences.** (a) Every TCO model is `INCOMPLETE` with named unknowns and no definitive total. (b) No
checkout, offer or "from" price is published. (c) MC-11/MC-12 become the pricing-evidence owners.

**Evidence.** `docs/marea/market-validation/economics/MC09-PRICING-AND-WTP.md`;
`docs/marea/market-validation/economics/MC09-CUSTOMER-TCO.md`;
`docs/marea/market-validation/economics/MC09-COMMERCIAL-ECONOMICS.md`;
`docs/marea/market-validation/data/tco-models.json`; `data/governance-status.json`.

**Status effect.** No lifecycle change, no blocker cleared, no price approved, no sale or checkout.
