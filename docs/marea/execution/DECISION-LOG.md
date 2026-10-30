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
