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

## D-029 - 2026-11-01 - MC-10 stops at the outreach authorization gate and reports BLOCKED, not PASS

**Context.** Master Prompt 10/36 mandates real primary customer discovery and states that customer
outreach requires explicit separate authorization, and that the execution request does not itself
authorize external contact. No authorization record was issued by the programme owner. The
environment's agent tool surface has no email, telephony or messaging tool; the repository's
`nodemailer`/SMTP path is commerce-notification application code and is not an approved research channel.

**Decision.** (1) MC-10 records `AUTH-MC10-001 = NOT_GRANTED`, `FIELDWORK_STATUS = BLOCKED` and
delivers the complete Wave 0 preparation package (scope, authorization register, ethics and privacy
design, protocol, frozen instruments, recruitment plan and templates, data contract, frozen thresholds
and price ladders, research-integrity validator and negative tests). (2) No candidate is identified or
contacted; no interview, price response or quotation exists. (3) The milestone is reported `BLOCKED`
for the primary-research scope; preparation is never presented as customer research. (4) The exact
unblock sequence is recorded in `MC10-FIELDWORK-AUTHORIZATION.md` §5.

**Rationale.** Manufacturing participants, quotes or price responses would violate the programme's
central rule of zero fabricated participants and would corrupt every downstream commercial decision
that relied on them. An honest blocked milestone is more valuable than a fabricated PASS.

**Consequences.** (a) Zero participants, zero interviews, zero price responses. (b) All ten registered
experiments are `NOT_EXECUTED`/`BLOCKED`. (c) No product or bundle evidence exists. (d) The milestone
cannot receive a primary-research PASS under the stated acceptance criteria.

**Evidence.** `docs/marea/customer-discovery/MC10-FIELDWORK-AUTHORIZATION.md`;
`docs/marea/customer-discovery/data/fieldwork-authorization.json`;
`docs/marea/customer-discovery/data/research-status.json`; `MC10-EXPERIMENT-RESULTS.md`;
`MC-10-DELIVERY.md`.

**Status effect.** No commercial status change; no price, product, bundle or readiness approval.

## D-030 - 2026-11-01 - The MC-09 priority order remains unvalidated and no product or bundle advances

**Context.** MC-10 was mandated to test the assumptions behind the MC-09 nine-family and six-bundle
prioritisation with real participants. No fieldwork was possible.

**Decision.** (1) All nine families and six bundles are classified `NOT_TESTED` in MC-10. (2) The
MC-09 ranking and scores are preserved unchanged as historical desk-research prioritisation and are
neither confirmed nor contradicted. (3) No product readiness is upgraded and no `ADVANCE_TO_QUANTITATIVE_VALIDATION`,
`DEFER`, `DISCONTINUE_RECOMMENDED` or `INCONCLUSIVE` verdict is issued on zero interviews.

**Rationale.** Absence of evidence is not evidence of absence. An empty dataset cannot support a
portfolio decision, and converting a plan into a verdict would be the exact failure the milestone
exists to prevent.

**Consequences.** (a) The central question (which products justify the next investment stage) remains
unanswered by primary evidence. (b) MC-11 receives no customer prioritisation. (c) The next decision
point is fieldwork authorization, not portfolio re-ranking.

**Evidence.** `MC10-PRODUCT-PRIMARY-EVIDENCE.md`; `MC10-BUNDLE-PRIMARY-EVIDENCE.md`;
`data/product-evidence.json`; `data/bundle-evidence.json`.

**Status effect.** No lifecycle change, no investment approval, no readiness upgrade.

## D-031 - 2026-11-01 - Instruments and experiment thresholds are frozen before fielding; Portuguese versions withheld

**Context.** The MC-09 registry and instrument suite must not be adjusted after observing responses.
Portuguese instruments require qualified linguistic review that MC-10 did not have.

**Decision.** (1) Freeze the seven instruments at version 1.0.0 with the real SHA-256 of the MC-09
discovery plan. (2) Freeze each of the ten experiment records by SHA-256 of its canonical JSON
serialization, recomputed by the validator on every run. (3) Withhold Portuguese instruments
(`NOT_PRODUCED`), so northern Portugal cannot be fielded. (4) Any change requires a dated amendment, a
new version, and prior data evaluated under the version in force when collected.

**Rationale.** Silent post-hoc threshold changes are the most common way qualitative research is made
to support a predetermined conclusion; a machine-checked freeze makes that detectable.

**Consequences.** (a) The validator fails on any altered threshold or instrument hash. (b) A future
fieldwork wave must use exactly these versions or a formally amended successor.

**Evidence.** `docs/marea/customer-discovery/methodology/MC10-INSTRUMENT-VERSIONS.md`;
`methodology/instruments.json`; `data/experiments.json`; `scripts/check-marea-customer-research.mjs`.

**Status effect.** No commercial status change.

## D-032 - 2026-11-01 - No commercial restriction is weakened and stated preference remains NOT_MEASURED

**Context.** Even positive customer evidence could not clear legal, safety or conformity blockers;
MC-10 has no customer evidence at all.

**Decision.** Keep unchanged: `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`, `SOURCE_IP_CLEARANCE =
NOT_CLEARED`, `PRODUCT_SALES = BLOCKED`, `COMMERCIAL_PUBLICATION = BLOCKED`, `PRODUCTION_DEPLOYMENT =
NOT_AUTHORIZED`, `PROFITABILITY_NOT_ESTABLISHED`, `PILOT_SAFETY_GATE = BLOCKED`, `COMPATIBILITY_TESTED
= NO`, `APPROVED_PRICES = NONE`, `ORDERABLE_PRODUCTS = ZERO`. Also keep `WTP_STATED_PREFERENCE_OBSERVED
= false` and `WTP_COMMERCIALLY_VALIDATED = false` because zero pricing modules were administered.

**Rationale.** A research milestone never becomes a commercial approval, and a milestone that collected
no data can approve even less.

**Consequences.** (a) Frozen price ladders remain hypotheses. (b) No page, offer, CTA, price or claim
changed. (c) MC-10 cannot support any launch, supplier order or public statement.

**Evidence.** `data/governance-status.json`; `pricing/MC10-GABOR-GRANGER.md`;
`pricing/MC10-VAN-WESTENDORP.md`; `MC10-POSITIONING-RECOMMENDATIONS.md`.

**Status effect.** No price approval, publication, order path or commercial claim.

## D-033 - 2026-11-01 - MC-11 cannot inherit customer evidence and must first unblock fieldwork or re-scope

**Context.** MC-11 (hardware, supplier, conformity and feasibility) expected MC-10 customer evidence
to prioritise hardware work.

**Decision.** MC-11 receives an explicit statement that no customer evidence exists. Its handoff
separates internal hardware/supplier/conformity questions that can be researched without customers
from customer questions that remain blocked behind `AUTH-MC10-001`. MC-11 may not present any
hardware, BOM, supplier order, conformity claim or price as customer-validated, and requires its own
Master Prompt.

**Rationale.** A missing input must be recorded as missing rather than silently replaced with
assumptions or desk research.

**Consequences.** (a) MC-11 planning carries the blocked-fieldwork dependency. (b) Customer-driven
hardware prioritisation remains unavailable. (c) No hardware, BOM, supplier or conformity
authorisation is created.

**Evidence.** `docs/marea/customer-discovery/MC10-MC11-HANDOFF.md`.

**Status effect.** No hardware, BOM, supplier or conformity authorisation; no commercial status change.

## D-034 - 2026-11-01 - MC-10R reconciles the sampling arithmetic as a proposal: quotas 37/57, 40-80 preserved as a historical aspiration

**Context.** The preserved per-segment quotas sum to 37 minimum / 57 maximum, while MC-09 and MC-10 also
state a 40-80 planning target that no set of segment maxima can reach at its upper end. MC-10 correctly
recorded the defect (PI-01) without silently repairing it.

**Decision.** Adopt, as a proposal (`PROPOSED_NOT_EFFECTIVE`) requiring programme-owner approval: the
per-segment quotas remain authoritative (minimum 37, achievable maximum 57); the candidate overall target
is 37/57; 40-80 is preserved as `HISTORICAL_PLANNING_ASPIRATION`; the study is staged as Wave 1
(exploratory 18-28 over SEG-01/03/04/06), Wave 2 (eight-segment minimum 37, ceiling 57) and Wave 3
(optional extension only under an approved amendment). No wave may be presented as the full study.

**Rationale.** Expanding quotas to satisfy an aspiration would multiply cost without adding a required
experiment minimum, while keeping only the 40-80 target would leave an untestable conflict. The staged
design keeps the minimum statistical requirements intact and makes every total derived.

**Consequences.** (a) 40-80 can never be cited as an approved total. (b) Any move above 57 needs a
separate approved quota-expansion amendment. (c) Validators reject inconsistent totals and exploratory
waves presented as complete.

**Evidence.** `docs/marea/customer-discovery/recovery/methodology/MC10R-PI01-SAMPLING-RECONCILIATION.md`
(D5); `MC10R-PI02-SEGMENT-QUOTA-CONTRACT.md` (D6); `MC10R-RESEARCH-PROTOCOL-AMENDMENT.md` (D8);
`docs/marea/customer-discovery/recovery/data/mc10r-recovery.contract.json` (D27).

**Status effect.** No effective sampling change; fieldwork remains blocked pending approval.

## D-035 - 2026-11-01 - MC-10R prepares AUTH-MC10-001 revision 2 and does not grant it

**Context.** No external research authorization exists. A prepared but ungranted authorization record
removes the excuse that fieldwork cannot be authorized because the record is undefined, while keeping the
hard gate.

**Decision.** Prepare `AUTH-MC10-001` revision 2 as `DRAFT_PREPARED` / `NOT_GRANTED` /
`FIELDWORK_PERMISSION = FALSE` / `EXTERNAL_CONTACT_ALLOWED = FALSE`, with the 30 numbered fields (31 flat
keys) and every missing human or legal value `null`/`OPEN`: proposed Wave 1 scope SEG-03 5-8, SEG-01 5-8,
SEG-04 5-7, SEG-06 3-5 = 18-28; geography Rías Baixas / Galicia; Portugal excluded; incentives `ZERO` and
spending `ZERO` as proposals. Only a separate, dated, signed programme-owner authorization with
prerequisite evidence may later set `GRANTED`.

**Rationale.** The Master Prompt, a PR approval, a task assignment, a passing validator and an agent
statement are not authorization. The record must be prepared without being confused with permission.

**Consequences.** (a) No contact, recruitment or interview may occur. (b) The fail-closed gate of D14
remains `DENY`. (c) A future grant must supply the missing external evidence.

**Evidence.** `docs/marea/customer-discovery/recovery/governance/AUTH-MC10-001-REV2-DRAFT.md` (D13);
`MC10R-AUTHORIZATION-GATE.md` (D14); `docs/marea/customer-discovery/recovery/data/mc10r-authorization-draft.json`
(D29).

**Status effect.** `AUTH_MC10_001 = NOT_GRANTED`; `OUTREACH_AUTHORIZATION = NOT_GRANTED`;
`FIELDWORK_STATUS = BLOCKED`.

## D-036 - 2026-11-01 - MC-10R prepares instrument amendment v1.1.0 as review-required and keeps v1.0.0 historical

**Context.** PI-04/PI-05 require nine instrument amendments. The frozen v1.0.0 instruments are the
historical authority and cannot be edited in place.

**Decision.** Issue `MC10R-INSTRUMENT-AMENDMENT-v1.1.0` with IV-01…IV-09, previous/candidate versions,
exact change, reason, source hash `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d`,
candidate hashes labelled non-effective, affected experiments, translation/legal dependencies and approval
state `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE`. Candidate ES/EN text is prepared; PT remains an
unapproved draft; no translation is represented as professionally reviewed or equivalence-established.

**Rationale.** Fieldwork cannot use an instrument whose consent wording, exclusions or concept identity
are defective, but no agent can confer methodological or legal approval.

**Consequences.** (a) No instrument may be administered until an authorized reviewer approves an effective
version. (b) Portugal stays excluded. (c) A change to the candidate source requires re-issuing the
candidate hashes.

**Evidence.** `docs/marea/customer-discovery/recovery/instruments/MC10R-IV01-IV09-AMENDMENT.md` (D9);
`MC10R-INSTRUMENT-VERSION-REGISTER.md` (D10); `MC10R-ES-EN-RESEARCH-INSTRUMENTS.md` (D11);
`MC10R-PT-TRANSLATION-REVIEW-PACKAGE.md` (D12); `data/mc10r-amendments.json` (D28).

**Status effect.** No effective instrument change; fieldwork remains blocked.

## D-037 - 2026-11-01 - MC-10R classifies unreachable pricing cells instead of lowering the registered minimum

**Context.** EXP-MC10-04/05 require `n>=8` per segment per construct while SEG-04 (max 7), SEG-05 (max 7),
SEG-06 (max 5) and SEG-08 (max 6) cannot reach it.

**Decision.** Keep `n>=8` unchanged. Classify those segments `BELOW_REGISTERED_MINIMUM` and restrict them
to qualitative price objections; classify SEG-01/02/03/07 `REACHABLE_AT_PLANNED_MAX` only at eight
completed pricing-module interviews. Apply a two-attribute rule (reachability and registered population):
a cell is experiment-level eligible only when both hold. Wave 1 can produce at most a segment-level
indication (`WAVE1_PRICING_INDICATION_ONLY`); all experiment verdicts are `PENDING_WAVE2`. No price is
approved and no threshold is reduced.

**Rationale.** Reducing a statistical minimum to make a result reachable is post-hoc manipulation; an
honest qualitative objection analysis is useful without pretending to be a willingness-to-pay curve.

**Consequences.** Four segments cannot produce experiment-level pricing results; a powered quantitative
study requires later separate authorization; approved prices remain 0.

**Evidence.** `docs/marea/customer-discovery/recovery/pricing/MC10R-PI03-PRICING-FEASIBILITY.md` (D7);
D27 pricing matrix; `data/experiments.json`; `data/pricing-ladders.json`.

**Status effect.** No price approval, no threshold change.

## D-038 - 2026-11-01 - MC-10R defines secure research infrastructure and proves it only with local synthetic tests

**Context.** No secure research store exists and no participant data may enter Git.

**Decision.** Define Layer A (identity/consent), Layer B (research records) and Layer C (repository
outputs), with an access matrix, encryption, retention, deletion, withdrawal propagation, backup, audit
logging, processor inventory, export controls, breach response and a synthetic test plan. Implement local
schemas and synthetic deletion/withdrawal tests. Record `ARCHITECTURE_DEFINED = true`,
`LOCAL_SYNTHETIC_TESTS_PASS = true`, and `PROVISIONED = false`, `ACCESS_REVIEWED = false`,
`OPERATIONALLY_APPROVED = false`.

**Rationale.** Designing and testing locally is possible and safe; claiming a provisioned, access-reviewed
or operationally approved store would be false.

**Consequences.** Fieldwork still requires a real store and access review; the synthetic tests prove
procedure logic, not security operation.

**Evidence.** `docs/marea/customer-discovery/recovery/data/MC10R-SECURE-DATA-ARCHITECTURE.md` (D17);
`MC10R-DATA-CONTRACT.md` (D18); `MC10R-ACCESS-RETENTION-AND-DELETION.md` (D19);
`MC10R-IMPLEMENTATION-AND-TEST-EVIDENCE.md` (D20); D27-D30.

**Status effect.** No infrastructure approved; fieldwork remains blocked.

## D-039 - 2026-11-01 - MC-10R prepares human interviewer operations with zero humans invented

**Context.** No interviewer panel, training or supervision exists.

**Decision.** Define the roles (research owner, fieldwork lead, interviewers, data steward, qualitative
analyst, second coder, independent auditor), qualification criteria, the 16-module training with synthetic
mock verification, the operations kit, ES/EN recruitment templates and the Wave 1 plan. Every role is
`UNASSIGNED`, every interviewer `UNTRAINED`, every template `NOT_APPROVED`/`NOT_SENT`, every training
completion `NOT_PERFORMED`; no names, credentials, dates or appointments are invented.

**Rationale.** A complete manual is executable by a real competent human only after appointment and
training; the package must make that possible without pretending it has happened.

**Consequences.** Fieldwork cannot start until named humans accept roles and a supervisor signs off
training.

**Evidence.** `docs/marea/customer-discovery/recovery/fieldwork/` D21-D26; `data/mc10r-fieldwork-readiness.json`
(D30).

**Status effect.** No human appointed, trained or authorized.

## D-040 - 2026-11-01 - MC-10R is an internal recovery PASS while MC-10 remains BLOCKED; the programme stays at milestone 10 of 36

**Context.** The recovery package can be complete internally while no external authorization exists.

**Decision.** Record `MC10R = PASS_INTERNAL_PREPARATION_SCOPE` alongside `MC10 = BLOCKED`,
`AUTH_MC10-001 = NOT_GRANTED`, `OUTREACH_AUTHORIZATION = NOT_GRANTED`,
`FIELDWORK_STATUS = BLOCKED`, `FIELDWORK_READINESS = PARTIALLY_READY`. Update the 36-prompt registry row
10 with this honest state and the recovery evidence. Do not create milestone 37, do not rename or start
MC-11, do not merge PR #16 and do not merge the recovery PR. The recovery PASS never means a
primary-research PASS, legal sign-off, authorization, interviewer readiness or a provisioned store.

**Rationale.** Conflating internal preparation with external authorization is the exact defect MC-10R
exists to prevent.

**Consequences.** (a) The programme remains at milestone 10 of 36 with fieldwork blocked. (b) A Spanish
executive report and delivery record must state both verdicts separately. (c) The stacked draft PR is
delivery evidence only.

**Evidence.** `docs/marea/customer-discovery/recovery/MC10R-EXECUTIVE-REPORT.md` (D34);
`MC-10R-DELIVERY.md` (D35); `MC10R-HANDOFF-TO-AUTHORIZED-FIELDWORK.md` (D36);
`review/MC-10R-REVIEW.md` (D33); `MASTER-PROMPT-REGISTRY.md` row 10.

**Status effect.** No authorization, no fieldwork, no merge, no deployment, no renumbering.

## D-048 - 2026-11-02 - MC-11 delivers internal hardware feasibility and stays PARTIAL because no formal quotation exists

**Context.** Milestone 11 requires a hardware BOM, supplier quotations and a conformity plan. MC-11 was
authorised only for internal engineering and public-source research: no supplier contact, RFQ
transmission, purchase, prototype, laboratory engagement or certification was permitted. The evidence
environment also could not retrieve application/datasheet PDFs, so zero datasheets were retrieved and
all verified parameters come from manufacturer HTML pages, recorded as a disclosed limitation.

**Decision.** Deliver the complete internal engineering package (D1-D37: nine families and six bundles,
33 scored candidate architectures, 41 real candidate MPNs, 19 suppliers with `NOT_CONTACTED`, 42
classified public price observations, 11 engineering and 11 manufacturing BOMs all `INCOMPLETE`, 90
volume scenarios, per-configuration EU applicability over 11 acts, 18 conformity blockers, 52 device
security requirements, 45 qualification tests `NOT_EXECUTED`, 18 machine-readable files, a 54-check
deterministic gate with a 59-case adversarial suite, an independent audit and a Spanish executive
report). Record the verdict as `PARTIAL` with `MC11_FORMAL_PROCUREMENT_EVIDENCE =
BLOCKED_OR_NOT_OBTAINED`, and keep every architecture, price, compatibility and conformity statement
unapproved.

**Rationale.** A catalogue price is not a quotation and an internal design review is not a
certification. Reporting a full PASS would require fabricating supplier or laboratory evidence, which is
exactly what the milestone forbids. Separating the internal feasibility verdict from the procurement
verdict preserves both the work done and the evidence missing.

**Consequences.** (a) No BOM is production-approved and no price is approved. (b) Gates G1-G7 remain
closed; supplier engagement, procurement, testing, regulatory evaluation and production release each need
their own authorisation. (c) MC-12 inherits per-line cost confidence, labelled assumptions and explicit
quotation gaps; MC-13 inherits capital, tooling, certification and working-capital gaps. (d) The
independent audit's MAJOR/MINOR findings were corrected and require the auditor's re-verification before
any internal-scope PASS is claimed. (e) Draft PR #18 remains stacked on the unmerged MC-10R branch and is
delivery evidence only.

**Evidence.** `docs/marea/hardware/MC11-EXECUTIVE-REPORT.md` (D36); `MC-11-DELIVERY.md` (D37);
`review/MC-11-REVIEW.md` (D35); `data/review-findings.json`; `MC11-BASELINE-AND-GOVERNANCE.md` §10;
`MASTER-PROMPT-REGISTRY.md` row 11.

**Status effect.** No authorization, no supplier contact, no purchase, no test, no certification, no
price approval, no publication, no merge, no deployment.

## D-049 - 2026-11-02 - MC-12 delivers the internal economic model and stays PARTIAL because no licensing, connectivity or customer evidence exists

**Context.** Milestone 12 requires recurring/data licensing and per-SKU contribution
economics (ex-VAT), with bottom-up costs with sources, no unlabelled assumptions and
**real data/connectivity quotations** as acceptance evidence. The execution mandate
prohibits provider outreach, RFQ transmission, account registration, paid-API
activation and contractual acceptance, so no quotation or contract could be
obtained. MC-11 handed over 90 incomplete cost scenarios, 42 public price
observations and zero supplier quotations; customer evidence is `NONE`.

**Decision.** Deliver the complete internal economics package (D01-D19): a verified
baseline, a machine-readable data contract, nine licensing-rights records and 53
classified provider records, a recurring cost model over three usage profiles, a
90-scenario hardware reconciliation with a proven no-double-count invariant, 50
per-SKU unit-economics records, six bundle records, five channel records, 70
sensitivity scenarios, a 22-blocker register, a nine-family decision matrix, an
MC-13 handoff, a 49-check deterministic validator with a 59-test adversarial suite,
an independent audit and a Spanish executive report. Record `MC12_VERDICT = PARTIAL`
with `MC12_INTERNAL_ECONOMICS_SCOPE = PASS_INTERNAL_ECONOMICS_SCOPE` and
`MC12_EXTERNAL_COMMERCIAL_EVIDENCE = BLOCKED_OR_NOT_OBTAINED`. Keep every price
unapproved and every product `NOT_FOR_SALE`.

**Rationale.** The registry's full-PASS clause requires real data and connectivity
quotations. Inventing one, or relabelling a website tariff as a quotation, would
violate the milestone's core prohibition. Separating the internal-scope verdict from
the external-evidence verdict preserves both the work done and the evidence missing.

**Consequences.** (a) No price is approved and no product becomes commercially
available. (b) Chart, weather, NMEA, connectivity, cloud, tile, IP and trademark
rights remain `NOT_GRANTED`; the nine blocking rights stay open. (c) The economic
classification is analysis, not a lifecycle approval. (d) MC-13 receives inputs with
named gaps and must not be treated as started. (e) The draft PR is delivery evidence
only and remains stacked on the unmerged MC-11 branch.

**Evidence.** `docs/marea/economics/` (D01-D19); `data/manifest.json`;
`data/unit-economics.json`; `data/blocker-register.json`;
`review/MC-12-REVIEW.md`; `scripts/check-marea-unit-economics.mjs` and test suite;
`MASTER-PROMPT-REGISTRY.md` row 12.

**Status effect.** No authorization, no outreach, no purchase, no price approval, no
publication, no merge, no deployment. MC-13 is not started.

## D-050 - 2026-11-02 - MC-12 treats tooling and certification as fixed costs and forbids double counting

**Context.** MC-11's scenario `knownSubtotalEur` already contains the `COST-16`
tooling/NRE amortisation line, and the separate `toolingAmortizationEur` field
repeats the same amount. MC-11 also models certification (`COST-17`) as a per-unit
amortisation whose amount is `UNKNOWN`. Using either as a variable unit cost would
inflate cost or double count.

**Decision.** For contribution analysis, `COST-16` tooling/NRE and `COST-17`
certification are reclassified as fixed one-off programme costs. They are excluded
from variable cost, listed in each record's `fixedCostsExcluded`, and never added a
second time. `toolingAmortizationEur` is treated as a reporting field only. The
validator recomputes, for all 90 MC-11 scenarios, that `Σ lines = knownSubtotalEur`
and that `toolingAmortizationEur` equals the `COST-16` line, and it rejects any
variable cost line that contains `COST-16`/`COST-17`.

**Rationale.** A one-off cost divided by volume is not a property of the product.
Treating an unknown certification amount as zero would be worse: the model carries
it explicitly as a fixed unknown and states that true break-even is higher than the
conditional unit figure.

**Consequences.** (a) Conditional contribution is identifiable per unit while fixed
investment remains a named gap for MC-13. (b) Break-even prices in the model are
variable-cost break-evens and exclude fixed spend. (c) The accounting rule is
machine-enforced.

**Evidence.** `docs/marea/economics/data/MC12-DATA-CONTRACT.md` A-09/A-10/A-11;
`data/hardware-cost-reconciliation.json#invariant`; `data/assumptions.json`
ASM-MC12-005/018; `MC12-HARDWARE-COST-RECONCILIATION.md`.

**Status effect.** No BOM approval, no price approval, no certification claim.

## D-051 - 2026-11-02 - MC-12 records one observed ECB rate but does not rebase inherited MC-11 BOM lines

**Context.** MC-11 could not retrieve the ECB euro reference rate and used an
engineering assumption (EUR 0.925925926 per USD). MC-12's connectivity research
retrieved an ECB euro reference rate for 2026-11-02 (USD 1.1216 per EUR, i.e.
EUR 0.8916 per USD).

**Decision.** Record the observed rate with its source and use it for MC-12's new
USD-denominated recurring-cost conversions. Do **not** retroactively re-convert the
inherited MC-11 BOM lines: they keep their recorded conversion so no individual cost
register mixes two bases. Bundle aggregates sum hardware components (inherited MC-11
basis) and subscription components (ECB basis), and each bundle declares
`aggregateConversionBases` so the two bases are disclosed rather than mixed silently. Record this as `ASM-MC12-021` and require MC-13 to refresh the BOM
conversion in a single, disclosed pass.

**Rationale.** Re-basing half a BOM would silently change the inherited cost lines
and make the reconciliation untraceable. Using an observed rate for new conversions
improves evidence without invalidating prior arithmetic.

**Consequences.** (a) MC-11 cost lines remain comparable to their source records.
(b) New recurring USD tariffs carry an observed rate. (c) The MC-11 FX gap is
partially closed, not erased.

**Evidence.** `data/providers.json` ECB record; `data/recurring-cost-inputs.json`
`fxBasis`; `data/assumptions.json` ASM-MC12-021; `MC12-CLOUD-AND-CELLULAR-COST-MODEL.md` §1.

**Status effect.** No procurement, no purchase, no price approval.

## D-052 - 2026-11-02 - MC-12 classifies the portfolio economically and sets an evidence-first priority without changing any lifecycle state

**Context.** The milestone requires a per-family decision matrix and a provisional
priority. MC-11 left every product `DEFINED` / `NOT_FOR_SALE`; customer evidence is
`NONE`; no data right is granted.

**Decision.** Pre-register seven weighted dimensions (cost evidence 25, recurring
certainty 15, licensing readiness 20, technical readiness 10, customer evidence 15,
regulatory readiness 10, contribution confidence 5) and a fixed classification
order. Classify NAV and WEATHER `LICENSING_BLOCKED`; PILOT `SAFETY_BLOCKED`;
HUB, SENSE and AIS `DEFER_RECOMMENDED`; FLEET and WATCH `COST_MODEL_INCOMPLETE`;
DISPLAY `CONDITIONAL_ECONOMIC_CASE`; no family `ECONOMICS_EVIDENCED`. Set the
provisional priority `NAV > FLEET > DISPLAY > WEATHER > HUB > SENSE > WATCH > AIS >
PILOT`. At bundle level: START/CRUISE `LICENSING_BLOCKED`, PROTECT
`DEFER_RECOMMENDED`, SAIL/COMPLETE `SAFETY_BLOCKED`, FLEET
`COST_MODEL_INCOMPLETE`.

**Rationale.** The classifications follow the evidence, not a preferred narrative.
An economic score cannot override a legal, safety or IP gate, and the pre-registered
weights stop the result from choosing its own criteria. Customer evidence scores
zero for every family, which caps the portfolio and identifies the cheapest
evidence to obtain.

**Consequences.** (a) No lifecycle state changes. (b) The recommendation is
evidence-first software direction with DISPLAY as the only hardware candidate.
(c) Any price remains `HYPOTHESIS_UNAPPROVED` and no product is purchasable.
(d) MC-13 must not treat the priority as a market forecast.

**Evidence.** `data/decision-matrix.json`; `data/assumptions.json`
decisionRules/ASM-MC12-019; `MC12-COMMERCIAL-PRIORITIZATION.md`;
`MC12-BUNDLE-ECONOMICS.md`.

**Status effect.** No price approval, no commercial availability, no publication,
no merge, no deployment.

## D-053 - 2026-11-02 - MC-13 inherits the MC-11/MC-12 cost and FX basis without a silent re-conversion

**Context.** MC-11 computed its BOM lines with an engineering FX assumption (EUR 0.925925926 per USD). MC-12 recorded an observed ECB reference rate (USD 1.1216 per EUR, EUR 0.8916 per USD) for new connectivity and cloud conversions and explicitly did not re-base the inherited BOM. MC-13 consumes those same variable unit costs.

**Decision.** MC-13 does not re-convert or re-base any inherited MC-11/MC-12 cost line. It consumes the recorded variable costs exactly (`D-06` SHA-256 predecessor baseline and check `A-24`), carries the FX exposure as a named risk (`BLK-FIN-08`) and models a +10% FX cost stress without claiming a hedge exists. A single disclosed re-conversion pass remains future work requiring a procurement/treasury decision.

**Rationale.** Re-basing part of a BOM silently changes the inherited evidence and breaks traceability. A stress envelope communicates the exposure without rewriting predecessor arithmetic.

**Consequences.** (a) Unit costs remain comparable with MC-11/MC-12 records. (b) The FX gap is disclosed, not closed. (c) No price, budget or hedge is approved.

**Evidence.** `docs/marea/financial/data/predecessor-baseline.json`; `docs/marea/financial/data/assumptions.json`; `MC13-HARDWARE-PRODUCTION-AND-INVENTORY-CASHFLOW.md`; validator `D-06`, `A-24`.

**Status effect.** No procurement, no purchase, no price approval, no financial commitment.

## D-054 - 2026-11-02 - MC-13 delivers the internal 60-month financial model and stays PARTIAL because external commercial evidence is absent

**Context.** Milestone 13 requires a 60-month financial model, 12/36/60 views, scenario economics, cash flow, investment requirements, conditional break-even and stress tests. The acceptance criteria also require externally credible commercial/financing evidence, but the execution mandate prohibits supplier, provider, customer and financial outreach; the predecessor evidence contains 0 quotations, 0 contracts, 0 customer interviews and 0 granted rights.

**Decision.** Deliver the complete internal financial package: one integrated 60-period model, the restricted current case plus three hypothetical post-clearance scenarios, a monthly cash-flow and working-capital model, a capital-investment schedule, conditional break-even thresholds, 24 stress cases, machine-readable datasets, a deterministic engine/builder, a 73-check validator, a 29-test adversarial suite, an independent audit and a Spanish executive report. Record `MC13_VERDICT = PARTIAL` with `MC13_INTERNAL_FINANCIAL_SCOPE = PASS_INTERNAL_FINANCIAL_SCOPE` and `MC13_EXTERNAL_COMMERCIAL_VALIDATION = BLOCKED_OR_NOT_OBTAINED`. Keep every price `HYPOTHESIS_UNAPPROVED` and every product `NOT_FOR_SALE`.

**Rationale.** The model is internally defensible and reproducible, but no external observation can be invented. Separating the internal-scope verdict from the external-evidence verdict preserves both the work and the missing evidence.

**Consequences.** (a) No price, budget, financing or launch is approved. (b) Break-even values are conditional hypothetical thresholds or NOT_DETERMINABLE. (c) MC-14 receives a named-gap handoff only and is not started. (d) The draft PR is delivery evidence only.

**Evidence.** `docs/marea/financial/` (D01-D21); `data/manifest.json`; `data/scenario-results.json`; `data/break-even-thresholds.json`; `review/MC-13-REVIEW.md`; `MC-13-DELIVERY.md`.

**Status effect.** No authorization, outreach, purchase, price approval, publication, merge, deployment or MC-14 start.

## D-055 - 2026-11-02 - MC-13 fixes the scenario, unknown-cost and inventory conventions

**Context.** The financial model needs conventions that are honest about what is unknown and deterministic enough to audit. MC-12 handed over unknown data-licence, insurance, CRA, onboarding/SLA and supplier/customer terms, no company cash position and no demand evidence.

**Decision.** (a) The model starts from a declared zero opening-cash analysis convention (`ASM-MC13-044`) solely to compute the external cash requirement; this is not the company balance (`ASM-MC13-045` is UNKNOWN). (b) The restricted current case carries zero authorized revenue and null cost/cash columns. (c) Demand, churn, renewal, activation, channel mix, capex multipliers and operating-cost envelopes are labelled `SCENARIO_ASSUMPTION`. (d) Unknown variable/fixed costs stay null and are excluded from the conditional result, never zeroed. (e) Tooling/NRE is capex plus non-cash amortisation, never a variable unit cost. (f) Inventory uses a projected-on-hand production plan with MOQ 25, two-month lead time and a one-month safety buffer; purchases cash, COGS, prepayments, payables and write-off value reconcile. (g) A material unknown forces the corresponding break-even threshold to `NOT_DETERMINABLE`.

**Rationale.** Without fixed conventions the model cannot be independently recomputed, and an unknown silently treated as zero would overstate viability.

**Consequences.** (a) All financial outputs are conditional. (b) True financing requirements are higher than the conditional figure because named unknowns are excluded. (c) The validator enforces the conventions (`V-12`, `V-13`, `V-20`, `V-21`, `A-14`, `A-17`, `A-18`, `A-26`).

**Evidence.** `MC13-FINANCIAL-DATA-CONTRACT.md`; `data/assumptions.json`; `data/scenario-definitions.json`; `data/working-capital.json`; `MC13-60-MONTH-INTEGRATED-FINANCIAL-MODEL.md`.

**Status effect.** No approval or commercial authorization.

## D-056 - 2026-11-02 - MC-13 records the pre-freeze model corrections for independent re-verification

**Context.** During implementation the hardware specialist found that per-SKU distributor collection arrays were aliased and multi-counted, that input VAT was computed on units sold rather than inventory purchased, that safety stock was declared but unused, and that the obsolescence write-off value was not recognised in the conditional result. A later review found that two stress overrides (cloud and cellular cost) were no-ops and that generated bundle component-edition lists did not match the governing bundle contract.

**Decision.** Correct all six defects before freezing the candidate: per-SKU collection arrays are distinct, input VAT is based on inventory receipts cost, safety stock drives the production plan through a projected-on-hand MRP calculation, the write-off value is a non-cash cost recognised in contribution and reversed in working capital, cloud/cellular overrides are effective, and bundle `componentEditionIds` are derived from `bundle-definitions.json`. Regenerate every derived dataset and the generated figures/register, add validator controls (`A-26`, `V-21`) and require the independent auditor to re-verify the corrected commit.

**Rationale.** An internally consistent but methodologically wrong cash model would overstate or understate financing requirements. The correction must be traceable rather than silently absorbed into a regenerated dataset.

**Consequences.** (a) Conditional financing requirements changed materially before the audit. (b) Human-readable reports were refreshed to the corrected snapshot. (c) The audited commit is the corrected one; later documentation-only commits cannot re-characterise it.

**Evidence.** `scripts/marea-financial-engine.mjs`; `scripts/check-marea-financial-model.mjs` checks `A-26`, `V-21`; `MC13-HARDWARE-PRODUCTION-AND-INVENTORY-CASHFLOW.md` verification note; `data/review-findings.json`.

**Status effect.** No approval; no merge or deployment.


## D-057 - 2026-11-02 - MC-13 applies the first-audit corrections before re-freezing

**Context.** The independent auditor withheld sign-off on the frozen commit `7dfb56d` with 2 BLOCKING findings (missing delivery record/registry update; an unawarded independent-review PASS asserted in the Spanish report), 3 MAJOR findings (refund allowance not settled in cash; distributor invoice basis adding VAT twice and ignoring the declared margin; the adversarial suite coupled to the live review state), 8 MINOR and 3 INFORMATIONAL findings.

**Decision.** Apply the corrections before any re-audit: settle refunds/withdrawal allowances as a cash outflow and keep ST-07 adverse; compute distributor invoicing from the channel-adjusted VAT-inclusive trade price; decouple the positive-control and review-state tests from the live record so 29/29 is reproducible; populate scenario and threshold assumption lineage; synchronise the data contract with the implemented gate (77 checks, A-15, A-27/A-28, D-11, restricted zero-vs-null); count all evidence classes; add a document-level false-PASS guard; author D21 and update the registry; and correct the documentation copies of blocker severities, subscription headroom and stress semantics. Record the first audit as PARTIAL/withheld and require the auditor to re-run the independent recomputation, its own mutation harness, the 208-claim reconciliation, the validator and the unit suite on the corrected commit.

**Rationale.** An audit that is merely acknowledged is not an audit. The corrections change conditional cash and financing figures, so every derived dataset, generated register and affected report must be regenerated and the corrected commit independently re-verified; a later documentation-only commit cannot re-characterise which implementation commit was audited.

**Consequences.** (a) Conditional financing requirements and cumulative cash changed again before the final freeze. (b) The gate now contains 77 checks and the adversarial suite is reproducible at 29/29. (c) The final internal-scope verdict depends on the re-audit, not on this decision. (d) No price, budget, financing, launch or MC-14 authorization changes.

**Evidence.** `docs/marea/financial/review/MC-13-REVIEW.md`; `data/review-findings.json`; `MC-13-DELIVERY.md`; `MC13-FINANCIAL-DATA-CONTRACT.md`; `scripts/check-marea-financial-model.mjs`; `MASTER-PROMPT-REGISTRY.md` row 13.

**Status effect.** No approval; no merge; no deployment; no MC-14 start.

## D-058 - 2026-11-02 - MC-14 builds internal legal/commercial governance and consumes the MC-13 handoff without altering it

**Context.** MC-13 handed over ten financial dependencies with external commercial evidence BLOCKED_OR_NOT_OBTAINED, and MC-02/MC-11/MC-12 left 134 inherited legal, data, hardware, sourcing, commercial and financial blockers. MC-14 must turn the legal landscape into enforceable internal rules without fabricating clearance or changing predecessor calculations.

**Decision.** MC-14 creates the docs/marea/legal-commercial/ package (D01-D23) with a canonical 48-source legal register, 51 obligations, 9x14 product and 6x14 bundle applicability assessments, 95 risks, a 134-record inherited-blocker map, 17 licensing rights, 13 liability scenarios, 42 bilingual claims, 30 prohibited claim categories, 13 release gates and 24 required documents. The MC-13 handoff dependencies are consumed exactly as handed over: the compliance envelope stays illustrative, insurance premium stays UNKNOWN, PILOT liability stays NOT_QUANTIFIABLE, the 3% returns allowance stays illustrative, CRA cost stays UNKNOWN, privacy cost stays UNKNOWN, the payment tariff is not a contract, licensing stays NOT_GRANTED, and the blocked launch still produces zero authorised revenue. No MC-13 data, price, flag or verdict is modified.

**Rationale.** A legal governance layer must be traceable to primary sources and to predecessor evidence, and it must be impossible to confuse an identified obligation with achieved compliance.

**Consequences.** (a) The milestone is an internal governance scope only: external legal clearance, certification, insurance, licences and prices remain blocked. (b) The validator and adversarial suite enforce the hard restrictions. (c) No product is for sale and no public claim is authorised.

**Evidence.** docs/marea/legal-commercial/MC-14-BASELINE-AND-GOVERNANCE.md; data/legal-sources.json; data/regulatory-applicability.json; data/risk-register.json; data/predecessor-blocker-mapping.json; data/mc14-handoff-inputs.json (consumed by reference); scripts/check-marea-legal-commercial.mjs.

**Status effect.** No approval, publication, price, merge or deployment. MC-13 remains PARTIAL with its financial scope unchanged.

## D-059 - 2026-11-02 - MC-14 applies the stricter public-brand rule and records the MC-03 class-A conflict

**Context.** MC-03 classifies "MAREA is a product brand of EMBARCARTE" and naming/edition statements as Class A claims allowed today, while the active programme state is TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED and MAREA_PUBLIC_USE = NO_GO. A public Class A claim would therefore authorise exactly the use the trademark restriction forbids.

**Decision.** (a) The stricter MC-14 gate prevails: no public MAREA brand use in any channel until clearance and a recorded public-use decision. (b) Internal naming and internal concept/defined-functionality statements remain allowed in internal documents marked internal. (c) The conflict is recorded as MC14-BRAND-CONFLICT-01 in data/claims-policy.json and in risk IPR-14. (d) MC-03 evidence is not edited or silently replaced; a formal supersession proposal is recorded in the delivery record and requires brand-owner and counsel approval before the brand contract changes.

**Rationale.** Inherited governance may permit a statement at a broader scope than a later hard restriction; when that happens the stricter gate must control, with the conflict documented rather than erased.

**Consequences.** (a) No MAREA-branded public surface is authorised in MC-14. (b) The claims validator rejects public authorisation while MAREA_PUBLIC_USE = NO_GO. (c) The brand contract update is an external decision.

**Evidence.** data/claims-policy.json (randState.inheritedPolicyConflict); data/risk-register.json risks IPR-13, IPR-14, CLM-01; D06, D13, D14.

**Status effect.** No public use, no trademark filing, no brand valuation.

## D-060 - 2026-11-02 - MC-14 adds audience and publication gates to the claims policy and authorises no public claim

**Context.** MC-03's A/C/P/X classes govern what may be said, but a claim allowed for internal documentation is not automatically allowed in public, and a translated claim can drift. The website also contains live commercial statements written before MC-14.

**Decision.** MC-14 adds explicit audience (INTERNAL, INSTALLER, DISTRIBUTOR, B2B_CUSTOMER, CONSUMER, PUBLIC) and publication statuses (INTERNAL_ONLY, PUBLIC_PROHIBITED, PUBLIC_CONDITIONAL, PUBLIC_AUTHORIZED) to the MC-03 classes, and requires evidence, approver and release gate for any public approval. In MC-14 only INTERNAL_ONLY and PUBLIC_PROHIBITED are used; 0 of 42 claims are authorised. The 30 mandatory prohibited categories include availability, stock, delivery, price, trademark, ownership, charts/weather, CE/RED/EMC/NMEA/marine certification, universal compatibility, autonomy, collision avoidance, guaranteed alerts/monitoring, forecast accuracy, insurance, customer counts, testimonials, market share, profitability, break-even, returns, financing, cyber certification, SLA, GDPR and safety-of-life. ES/EN pairs must keep the same class, status, numbers and negation. A read-only inventory of 34 website findings is recorded; no fix is claimed.

**Rationale.** Availability and certification claims are the fastest route to consumer-protection and unfair-competition exposure, and bilingual drift multiplies the risk.

**Consequences.** (a) The website and all future copy must pass the claims gate. (b) Internal examples distinguish concept, defined, tested, licensed and available states. (c) The read-only findings are future MC-15 work.

**Evidence.** data/claims-policy.json; data/bilingual-claims.json; data/website-findings.json; D13, D14, D15; scripts/check-marea-legal-commercial.mjs.

**Status effect.** MC14_COMMERCIAL_CLAIMS_PUBLICATION = NOT_AUTHORIZED; no website change.

## D-061 - 2026-11-02 - MC-14 defines release gates from evidence and keeps every gate open

**Context.** A list of legal requirements is not a release control. The milestone needs objective gates that close only with real external artefacts, and a validator that cannot confuse a plan with evidence.

**Decision.** MC-14 defines 13 release gates (market placement, PILOT safety, IP clearance, data licensing, privacy/DPA/DPIA, CRA, consumer terms, commercial claims, pricing, payments, insurance, legal identity, website remediation) and 24 required documents, all NOT_EXECUTED / NOT_PRESENT / DRAFT_REQUIRED. The deterministic validator runs 54 checks over 18 datasets and documents; the adversarial suite runs 41 tests including 40 negative controls. The gate is a manual gate at this milestone because CI does not execute it (disclosed in D20/D23). No document may be marked EXECUTED, SIGNED, CERTIFIED or APPROVED without evidence, and no gate may be CLOSED_VERIFIED without evidence.

**Rationale.** Without evidence-based gates the commercial pressure would convert an identified obligation into an assumed clearance.

**Consequences.** (a) Every product remains NOT_FOR_SALE and every gate open. (b) A failed mutation is treated as a control failure, not as a schema nit. (c) External decisions are the only route to closing the gates.

**Evidence.** data/release-evidence-gates.json; D16, D20; scripts/check-marea-legal-commercial.test.mjs.

**Status effect.** No gate closed; no release authorization.

## D-062 - 2026-11-02 - MC-14 applies the independent-audit corrections and records the internal-scope award

**Context.** The independent auditor withheld sign-off on the frozen candidate 6fb2285 with one MAJOR finding (contradictory provenance between the research trail and the governed legal-source register) and nine MINOR findings, then identified four residual items at the first correction commit 32673e (dossier §1/§3 status labels, the D19 bundle schema, two D03 battery rationales and four MC-15 route labels). All findings were verified against the artifacts rather than accepted on summary.

**Decision.** Apply all corrections in two commits (32673e, 7f31db8) before any award: reconcile the CSV, dossier, legal-sources.json and D02 to one status per shared source and document the 48-vs-50 research membership; correct the RED 2022/30 date to 2025-08-01, the SCA RTS entry-into-force date to 2018-03-14, the dossier 'recital 580' citation to Article 71, the D19 bundle schema, the D03 rationales, the website route labels, the D20 freeze result, the class-C claim status, the LGP requirement status and the pilotCoverage typo. Re-verify at 7f31db8; the auditor awarded PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE with 0 open BLOCKING/MAJOR/MINOR and 4 INFORMATIONAL observations by design. Record the programme verdict as PARTIAL: internal legal/commercial governance PASS, external legal clearance NOT_GRANTED (MC-13 mirror).

**Rationale.** A legal evidence package cannot be awarded while its provenance claims contradict; the award must follow re-verification of corrected artifacts, not an acknowledgment of findings.

**Consequences.** (a) The record commit reconciles the manifest, D22/D23, registry row 14 and this decision log with the award. (b) No external clearance, certification, licence, insurance, price or publication is authorised. (c) The MC-13 residual debt F-05/F-11/F-14 stays OPEN and MC-14 does not edit MC-13 files.

**Evidence.** docs/marea/legal-commercial/review/MC-14-REVIEW.md (rounds 1-3); data/review-findings.json; data/manifest.json; MC-14-DELIVERY.md; MC14-EXECUTIVE-REPORT-ES.md; MASTER-PROMPT-REGISTRY.md row 14.

**Status effect.** Internal-scope award recorded; no merge, deployment, publication, sale or MC-15 start.

## D-063 - 2026-11-02 - MC-15 preserves every existing URL and defines the MAREA layer as non-deployable

**Context.** The current Angular site has 21 typed RouteIds, 141 concrete URLs and 98 sitemap URLs (101 with the inherited two-product test fixture). MC-14 left the 34 website findings open and MAREA is not cleared for public use.

**Decision.** Every current Spanish public URL is `KEEP_AS_IS`; no migration is proposed for any existing service, experience, guide, shop, account or legal page. The 23 proposed MAREA routes are registered as `PROPOSED_INTERNAL_NOT_DEPLOYABLE` with `routeDefined=true` and implementation/publication/indexation/commercial authorization all false. The three inherited 301s are preserved unchanged and no redirect is activated.

**Rationale.** URL churn without a verified migration decision would destroy existing equity; publishing MAREA before brand/claims clearance would bypass MC-14.

**Evidence.** `docs/marea/information-architecture/MC15-CURRENT-URL-AND-ROUTE-INVENTORY.md`; `MC15-PROPOSED-ROUTE-REGISTRY.md`; `data/current-urls.json`; `data/proposed-routes.json`; `data/redirect-map.json`.

**Status effect.** No live change; no indexation authorization.

## D-064 - 2026-11-02 - MC-15 adopts the conservative gate union and one operational gate matrix

**Context.** The independent audit found that `proposed-routes.json`, `proposed-ia.json` and `publication-gates.routeGateMatrix` disagreed on 11/23 routes, so an implementer could follow an over- or under-blocking list.

**Decision.** The operational blocking set is the sorted union of the registry, IA and gate-scope derivations. It is mirrored in all three datasets, `publication-gates.routeGateMatrix` is the operational owner, and validator rule IA-068 enforces exact set equality. The union is deliberately conservative; no gate is closed or relaxed.

**Rationale.** A stricter gate set cannot authorize anything and prevents an under-blocked route from being published on a later build or test pass.

**Evidence.** `data/publication-gates.json`; `data/proposed-routes.json`; `data/proposed-ia.json`; D05/D13; `scripts/check-marea-ia-seo.mjs` (IA-068); auditor finding IA-01.

**Status effect.** All 23 routes remain blocked; gate statuses unchanged.

## D-065 - 2026-11-02 - MC-15 records the independent PASS after corrections and keeps the milestone PARTIAL

**Context.** The frozen implementation `b70d550` received NEEDS_REVISION with 2 MAJOR and 3 MINOR findings. The corrections were applied in `d1d7a1a` and independently re-verified.

**Decision.** Record `MC15_INTERNAL_IA_SEO_SCOPE = PASS_INTERNAL_IA_SEO_SCOPE` and `MC15_VERDICT = PARTIAL`. The overall PARTIAL reflects the absence of Search Console/indexation evidence and the prohibition on live migration/publication, not an internal-scope defect. The pre-existing `test:financial` V-18 failure (registry row 14 `PARTIAL` since MC-14 `2626853`) remains classified as inherited and is not concealed or fixed in predecessor files.

**Rationale.** An internal planning pass cannot be reported as full external SEO verification; indexation stays `INDEXATION_UNVERIFIED` until real evidence exists.

**Evidence.** `MC15-INDEPENDENT-REVIEW.md` (rounds 1-2); `data/review-findings.json`; `data/manifest.json`; `MC15-EXECUTIVE-REPORT-ES.md`; `MC-15-DELIVERY.md`.

**Status effect.** Internal scope awarded; external indexation evidence NOT_AVAILABLE; no merge/deploy/publication.

## D-066 - 2026-11-02 - MC-15 hands the route and page identities to MC-16 without starting it

**Context.** MC-16 owns the commerce/product data model (product vs SKU vs readiness vs subscription entitlement). MC-15 has stable page identities, family/bundle/edition ids and publication gates that MC-16 must consume.

**Decision.** Deliver `MC15-MC16-HANDOFF.md` and `data/mc16-handoff-inputs.json` with the 21 current + 23 proposed route identities, 9 families, 6 bundles, 26 editions, locale/slug mappings, page-vs-SKU separation, lifecycle fields, gates, SEO eligibility, structured-data restrictions, price/stock provenance and entitlement references. `MC16_STARTED=false`; no SKU, order, payment, checkout or MC-16 data model is designed or executed.

**Rationale.** MC-16 needs stable identities and restrictions before defining commerce records; starting it inside MC-15 would exceed the milestone boundary.

**Evidence.** `MC15-MC16-HANDOFF.md`; `data/mc16-handoff-inputs.json`; D17; D13.

**Status effect.** Handoff ready with named gaps; no MC-16 execution.

## D-067 - 2026-11-03 - MC-15 adds verified, partial Search Console evidence without changing publication status

**Context.** The initial MC-15 delivery recorded `INDEXATION_UNVERIFIED` because no Search Console access was available. A real service account (`guiatv-gsc@guia-tv-8fe3c.iam.gserviceaccount.com`) with `siteFullUser` access to `sc-domain:embarcarte.com` was subsequently provided, so the external-indexation limitation could be tested read-only instead of remaining an assumption.

**Decision.** Add a Search Console evidence addendum: 24 representative URL inspections and the sitemap status captured on 2026-11-02 and refreshed on 2026-11-03, recorded in `MC15-SEARCH-CONSOLE-EVIDENCE.md`, `data/search-console-evidence.json` and 24 `SEARCH_CONSOLE_VERIFIED` records in `data/url-evidence.json`. The result is 16 indexed, 2 excluded by noindex, 5 not recognized and 1 public/indexable URL not indexed (`/traslados`; coverage wording varies between "no reconocida" and "descubierta sin indexar"), with 0 MAREA URLs indexed. `/traslados` is public, indexable and in the 98-URL sitemap but not indexed (`GSC-01`, pre-existing operational gap); the home URL is also submitted as an invalid sitemap with 1 error (`GSC-02`). The sample is not a full census, so `MC15_VERDICT` remains PARTIAL, `MC15_PUBLICATION` and `MC15_LIVE_MIGRATION` remain NOT_AUTHORIZED, and no full coverage, ranking or traffic claim is made. The addendum is verified independently by a non-authoring reviewer.

**Rationale.** Real read-only evidence is better than an unverified assumption, but a 24-URL sample cannot justify a full-coverage claim or a publication authorization. The two operational findings must be recorded as post-MC-15 debt rather than hidden or closed.

**Evidence.** `MC15-SEARCH-CONSOLE-EVIDENCE.md`; `data/search-console-evidence.json`; `data/url-evidence.json` (`EV-GSC-001`…`EV-GSC-024`); `data/indexation-policy.json`; `data/risk-register.json` (`SEO-RISK-22`); `MC15-SEARCH-CONSOLE-REVIEW.md`; D20/D21/D22.

**Status effect.** Indexation evidence `SEARCH_CONSOLE_VERIFIED_PARTIAL`; overall verdict still PARTIAL; no merge, deployment, publication, indexation request or MC-16 start.

## D-068 - 2026-11-03 - MC-16 defines an isolated, non-activatable commerce domain

**Context.** MC-16 must design the commercial domain that will later support nine product families, 26 editions and six bundles, without any product becoming publishable, purchasable or billable. The existing Node/Express/SQLite shop is a generic legacy storefront whose `products.active` flag has no legal, price, stock or readiness meaning.

**Decision.** Implement the canonical contract under `docs/marea/commerce-data/`, the typed pure evaluators in `src/server/marea-commerce/domain.ts` and the disposable SQLite schema in `src/server/marea-commerce/schema.ts`. Preserve 9 families, 26 editions, 6 bundles and 23 proposed routes. Keep `merchantSkuCode=null`, `merchantable=false`, `priceApproved=false`, `commercialAvailability=NOT_FOR_SALE` for every edition; keep 0 approved prices, 0 verified inventory, 0 real subscriptions and 0 real entitlement grants. All 13 release gates remain open. The domain is not imported by any public route, shop, checkout or Stripe path.

**Rationale.** A domain that can be tested without being activated is the only defensible way to prepare commerce while brand, licensing, safety, price and legal evidence remain unavailable. A fail-closed evaluator and schema guards make accidental activation a deliberate migration, not a UI toggle.

**Evidence.** `docs/marea/commerce-data/` D01-D23 + 21 datasets; `src/server/marea-commerce/domain.ts`; `schema.ts`; `scripts/check-marea-commerce-data.mjs`; `scripts/marea-commerce-schema.mjs`; independent review D21 at `ee4f5d2`.

**Status effect.** Internal commerce-data scope PASS; overall MC-16 PARTIAL; no publication, sale, billing, deployment or MC-17 start.

## D-069 - 2026-11-03 - MC-16 preserves the inherited V-18 failure and does not rewrite MC-13

**Context.** The MC-13 financial validator asserts that registry row 14 must remain `PLANNED`. MC-14 was executed and recorded `PARTIAL`, so `npm run test:financial` and `test:financial:unit` fail only on V-18. MC-15 already recorded the failure as inherited.

**Decision.** Reproduce V-18 against the verified MC-15 base, classify it as inherited validator-state debt, and leave it open. Do not alter MC-13's validator, financial data, the registry history or the MC-14 row to obtain a green financial suite. Record the failure in D16 and D23.

**Rationale.** Falsifying history to satisfy a stale assertion would be worse than an honest inherited failure. The correction belongs to the MC-13/MC-14 financial-model owner with its own traceable diff and evidence.

**Evidence.** `scripts/check-marea-financial-model.mjs` V-18; `docs/marea/commerce-data/MC16-EXTERNAL-EVIDENCE-AND-BLOCKERS.md`; `data/blocker-register.json`; independent review D21.

**Status effect.** Financial suite remains 76/77 (and 28/29 unit); no MC-13/MC-14 modification; no full-green claim.

## D-070 - 2026-11-03 - MC-16 records the independent audit and the residual internal MINOR

**Context.** The first independent audit of `4e67ae2` found no BLOCKING/MAJOR but identified latent contract-hardening and documentation defects. Corrections `0a30a62`, `c9ef80e`, `981c53f` and `ee4f5d2` closed the build failure, evidence fail-open, family publication guard, validator no-op, hash reproducibility and SKU-evidence regression. The final audit of `ee4f5d2` re-ran build, typecheck, validator, unit and financial gates.

**Decision.** Record `MC16_INTERNAL_COMMERCE_DATA_SCOPE = PASS_INTERNAL_COMMERCE_DATA_SCOPE` and `MC16_VERDICT = PARTIAL`. Record the one residual MINOR (additional approved-price fields for a future schema hardening) and the informative observations as non-blocking. Do not claim that the internal PASS is a commercial, legal, price, stock, publication or deployment approval.

**Rationale.** The internal model is implemented and tested; the external evidence and the full programme remain incomplete. An honest PARTIAL preserves the distinction.

**Evidence.** `MC16-INDEPENDENT-REVIEW.md` (D21); `data/review-findings.json`; `MC16-DELIVERY.md` (D23); `MC16-EXECUTIVE-REPORT-ES.md` (D22); PR #23 (draft, unmerged).

**Status effect.** Internal-scope PASS recorded; overall PARTIAL; no merge, deploy, publication, sale, billing or MC-17 execution.

## D-071 - 2026-11-03 - MC-17 implements an isolated, non-published design system

**Context.** The future MAREA product, bundle, configurator and onboard surfaces need one reusable presentation system, but the brand is proposed (trademark NOT_GRANTED, public use NO_GO), no price/stock/public copy is approved, hardware validation is blocked, and the public website must not change.

**Decision.** Implement the design system under `src/app/marea-design-system/` as an isolated, non-imported library: one canonical token source with MC-04 provenance and a deterministic generator, scoped `marea-theme` CSS (no `:root`), 48 standalone Angular components plus one directive, typed presentation contracts, synthetic MC-16 fixtures, a fail-closed commercial adapter (`purchaseActionAllowed/cartAllowed/priceVisible/availabilityVisible = false`), and a separate internal catalogue Angular project (`preview/`, output `dist/marea-ds-catalogue`). No production route, style, metadata, asset, checkout or deployment change. The catalogue is executed only by its own scripts; the inherited public test suite excludes it with `testIgnore`.

**Rationale.** A presentation system that can be built and verified without being published is the only defensible way to prepare MC-18 while identity, legal clearance, price, stock and hardware evidence are unavailable. Scoped tokens and a separate build target make accidental public leakage a deliberate change rather than a side effect.

**Evidence.** `src/app/marea-design-system/`; `preview/`; `docs/marea/design-system/` D01-D24 + 20 datasets; `scripts/check-marea-design-system*.mjs`; `e2e/design-system/`; validator 38/38 and catalogue suite 30/30 at the delivery commit.

**Status effect.** Internal design-system scope implemented and technically verified; overall MC-17 PARTIAL pending the final independent re-audit; no publication, deployment, brand adoption, sale or MC-18 start.

## D-072 - 2026-11-03 - MC-17 records the independent review and the correction round

**Context.** The first independent review of the implementation found no BLOCKING findings but two MAJOR defects: family-specific limits were defined but not rendered, and the reviewed tree was uncommitted. A correction round renamed the CTA to avoid the inherited MC-16 ISO-001 collision, rendered family limits for all families in the catalogue, replaced a module-level id counter with `MareaIds`, hardened the validator, repaired documentation, regenerated visual baselines and committed the tree.

**Decision.** Record `MC17_INDEPENDENT_REVIEW = PARTIAL` for both reviewed SHAs and require a third independent re-audit of the delivery SHA before MC-17 can be considered internally complete. Preserve every finding with its closure status in `data/review-findings.json`; do not mark a MAJOR closed without independent verification.

**Rationale.** The internal build is usable and the committed state is reproducible, but the presentation MAJOR and several minor evidence gaps were open at the last reviewed SHA. Recording PARTIAL is more accurate than claiming completion.

**Evidence.** `MC17-INDEPENDENT-REVIEW.md`; `data/review-findings.json`; commits `3a8d4fd` and `7cbc99e`; validator, unit, Playwright, axe and contrast evidence under `docs/marea/design-system/evidence/`.

**Status effect.** MC-17 PARTIAL; no merge, deployment, publication, brand adoption, price/stock authorisation or MC-18 start. Inherited `MC16-FINAL-02`, `MC16-FINAL-09` and `FINANCIAL_V18` remain as recorded.

## D-073 - 2026-11-03 - MC-17 third-round audit initiation and correction round

**Context.** The frozen audit candidate `4a9043b` was submitted to a third independent review. The audit found `MC17-IR-03` (stale/contradictory deliverables) and `MC17-CR-02` (corrupted correction sentences) still open, and `MC17-IR-06` (visual-regression provenance) and `MC17-IR-08` (MC-17 governance) only partially closed. The remaining presentation defect `MC17-IR-01` was only partially corrected in the tree (seven family cards rendered and a body-wide e2e assertion; WEATHER/HUB and per-card assertions were still missing), and `MC17-IR-05`, `MC17-IR-07` and `MC17-IR-10` were still open. The deterministic evidence at `4a9043b` was green: validator 38/38 PASS; unit/adversarial 27/27; catalogue Playwright 30/30; axe 0 violations, 36 passes and 0 incomplete in each of the four modes; commerce ES/EN baselines differ (`27132adf…` vs `a57f0370…`).

**Decision.** Open the third-round correction round with these limits: (1) present the family-specific limits for all nine MAREA families (seven family cards rendered at `4a9043b`; the correction completes HUB/WEATHER and the per-family assertions); (2) repair every stale/contradictory/corrupted current-state statement across D01-D24 and the datasets against the verified `4a9043b` evidence, marking genuine historical FAILs with date/SHA and preserving the record; (3) rewrite `data/visual-regression-evidence.json` with source commits, installed environment, reproducible generation procedure, 26 baselines after removing the two orphaned foundation locale captures, per-pair SHA-256 and the explicit ES/EN commerce difference; (4) harden the validator guards (preview-import detection, aliased-enum extraction, focus-contract mutation) and expand `format:check` coverage via the parallel engineering workstream, re-running both at the correction commit; (5) record governance row 17 with `MC17_VERDICT = PARTIAL` and `MC17_INTERNAL_DESIGN_SYSTEM_SCOPE = IMPLEMENTED_AND_TECHNICALLY_VERIFIED_PENDING_FINAL_RE_AUDIT`, add this decision and a dated supersession note to the MC-16 handoff; (6) update the delivery record and append the round-3 addendum to the Spanish executive report. Do not claim a final independent PASS: the third-round verdict is written by the reviewer, not by the author.

**Rationale.** The internal implementation is green and reproducible, but an honest PARTIAL requires that the documents match the evidence, that the review record is complete, and that the final verdict is issued by an agent distinct from the author. Repairing the record is necessary for the next audit to be meaningful.

**Evidence.** `4a9043b`; `docs/marea/design-system/evidence/{validator-run,axe-summary}.json`; `e2e/design-system/visual.spec.ts-snapshots/` (26 PNGs, SHA-256 in `data/visual-regression-evidence.json`); `docs/marea/design-system/MC17-INDEPENDENT-REVIEW.md` (three rounds); `data/review-findings.json`; `docs/marea/design-system/data/{blocker-register,mc18-handoff-inputs,commerce-presentation-policy,accessibility-requirements}.json`; `docs/marea/commerce-data/MC16-MC17-HANDOFF.md` (supersession note). Correction commit: `f2c9ec2ea07f90154cbb91cae36e4a7681b5e27d`.

**Outcome (2026-11-03).** The correction round was implemented and frozen at `f2c9ec2` and independently re-audited. The reviewer reproduced: validator 38/38 PASS; unit/adversarial 41/41; nine family cards rendering their own limits in ES and EN with material-first chips and six adversarial cases; five production-import mutations and two variant mutations and two focus mutations detected (9/9); Playwright 37/37 without `--update-snapshots`; public e2e 15/15; axe 0 violations in four modes; expanded `format:check` green with generated artefacts validated by their generators; 26 baselines with the ES/EN pair differing and the two refreshed mobile instrument captures reviewed. Final result: `MC17_INTERNAL_DESIGN_SYSTEM_SCOPE = PASS_INTERNAL_DESIGN_SYSTEM_SCOPE` and `MC17_VERDICT = PARTIAL` (external gates remain ungranted). No merge, deployment, publication, sale, brand adoption or MC-18 start.

**Status effect.** `MC17_VERDICT = PARTIAL`; internal scope `PASS_INTERNAL_DESIGN_SYSTEM_SCOPE`; third-round re-audit complete; no merge, deployment, publication, brand adoption, sale or MC-18 start. `MC16-FINAL-02`, `MC16-FINAL-09`, `FINANCIAL_V18`, `MC15-GSC-01/GSC-02` and the hardware/trademark no-go states remain unchanged.

## D-074 - 2026-11-03 - MC-18 implements an isolated, non-published bilingual landing

**Context.** MC-17 delivered a verified internal design system, but publishing a MAREA landing is blocked by trademark clearance, unlicensed data, unapproved copy, no price/stock and open release gates. A landing still needs to be designed, built and tested before any authorized release.

**Decision.** Implement the real bilingual Angular landing inside this repository as an isolated internal feature: one locale-aware component tree for ES/EN, an isolated loopback-only SSR preview application, and no registration in the public router, sitemap, navigation or production build.

**Rationale.** Building and verifying the actual Angular feature now surfaces design, bilingual, SSR/hydration and accessibility risks while making public leakage a deliberate, reviewable change rather than a side effect. The preview is loopback-only and non-indexable.

**Evidence.** `src/app/marea-landing/`; `preview/landing/`; `angular.json` project `marea-landing-preview`; PR #25 draft targeting the MC-17 branch; validator 60/60; landing Playwright 44/44.

**Status effect.** Landing implemented internally; publication and public brand adoption remain NOT_AUTHORIZED; no merge, deployment or MC-19 start.

## D-075 - 2026-11-03 - MC-18 consumes MC-16 data through a generated read-only projection

**Context.** The landing must show nine families, 26 editions and six bundles without duplicating the authoritative MC-16 database or inventing commercial facts.

**Decision.** Generate a bounded read-only projection (`src/app/marea-landing/data/domain.generated.ts`) and the machine-readable presentation datasets from the canonical MC-16/MC-14 JSON, with a deterministic `--check` generator. No price amount, stock, merchant SKU, customer or vessel data enters the projection. The MC-17 bundle/family presentation fixtures supply the same verified component contracts.

**Rationale.** One authority, no drift, no invented commercial data. Editions remain canonical identities and not merchant SKUs.

**Evidence.** `scripts/build-marea-landing-data.mjs`; `docs/marea/landing/data/product-family-presentation.json`, `bundle-presentation.json`; `check:landing:data` current at delivery; 0 approved prices, 0 stock rows, 0 merchant SKU codes.

**Status effect.** Presentation contracts derived and verified; commercial availability remains NOT_FOR_SALE.

## D-076 - 2026-11-03 - MC-18 keeps publication metadata disabled behind two locks

**Context.** MC-15/16 define future metadata, canonical and hreflang for `mareaOverview`, but the page is not published and 0/42 claims are public-authorized.

**Decision.** Model SEO as a planning contract. Canonical, hreflang, Open Graph, Twitter card and structured data are candidates only. Activation requires all publication gates AND a release authorization record that does not exist; a single boolean or environment variable cannot enable it. The preview emits only `noindex` meta and `X-Robots-Tag`.

**Rationale.** Prevent accidental indexation of an unauthorized brand/page and make any future activation an explicit, documented act.

**Evidence.** `src/app/marea-landing/models/seo.ts`, `publication-gates.ts`; `docs/marea/landing/data/seo-metadata-contract.json`, `publication-gates.json`; validator MC18-26/27/43; SSR evidence shows no canonical/hreflang/JSON-LD; sitemap unchanged.

**Status effect.** `MC18_PUBLIC_INDEXATION = NOT_AUTHORIZED`; no sitemap submission.

## D-077 - 2026-11-03 - MC-18 records the independent audit and correction round

**Context.** The independent auditor reviewed the frozen implementation at `ca64ec7` and recommended `PASS_INTERNAL_LANDING_SCOPE` with 0 open BLOCKING/MAJOR, 3 MINOR and 2 INFORMATIONAL findings. The three MINOR findings were evidence/documentation drift, a pageType label in the evidence registry, and an unguarded preview listener during build analysis.

**Decision.** Apply the correction round at `d5e9980` (canonical `HUB_OVERVIEW` evidence label, `isMainModule` listener guard, developer root alias recorded, preview comment reworded to keep MC-17 validator green), reconcile the pre-freeze counts in D23, and require the auditor to re-verify the corrections. Keep `MC18_VERDICT = PARTIAL` because external approvals are ungranted.

**Rationale.** An internal scope can be verified without an external authorization, but the documentation must match the measured state and the corrections must be independently re-verified.

**Evidence.** `MC18-INDEPENDENT-REVIEW.md` (including the correction-round section); `data/review-findings.json` (IR-01/02/03 CLOSED with correctionCommit and independentReverification); D22/D23; final validator 60/60; landing Playwright 44/44; production isolation 0 landing identifiers and public `/marea` 404.

**Status effect.** Internal landing scope PASS; overall MC-18 PARTIAL; no merge, deployment, publication, brand adoption or MC-19 execution. `FINANCIAL_V18`, `MC16_FINAL_02`, MC-13 F-05/F-11/F-14 and MC-15 GSC-01/GSC-02 remain open.

## D-078 - 2026-11-04 - MC-19 stops at a documented scope proposal

**Context.** The 36-prompt registry row 19 defines MC-19 as "Segment/solution pages and enquiry flows (owners, installers, professionals)" with dependency MC-18. The registry also states that prompts 03-36 are planning placeholders and that the client-issued Master Prompt is authoritative. The MC-18→MC-19 handoff declares the scope but is not an MC-19 plan or approval. The authoritative MC-15 route registry has no owners route. Every enquiry/lead flow is blocked by `GATE-PRIVACY-DPA-DPIA` (24 required documents, 0 executed; 42 claims, 0 public-authorized).

**Decision.** Do not implement MC-19. Deliver the documented scope proposal package in `docs/marea/segments/` (D01-D07, six datasets, a deterministic validator and 29 unit/adversarial tests after the audit correction rounds), record `MC19_VERDICT = BLOCKED`, and require P01 (authoritative Master Prompt), P02 (IA/route decision) and P10 (scope approval) before implementation. Defer enquiry flows until P03 and the publication gates close. The recommended option A is three internal audience pages (owners, installers, professional fleets) with no enquiry flow, isolated preview only, reusing MC-17/MC-18.

**Rationale.** Implementing from a placeholder would invent the page set, the owners route and the CTA behaviour, and could introduce unauthorized customer data collection. The programme's own rule is to stop and propose rather than invent requirements.

**Evidence.** `docs/marea/segments/MC19-SCOPE-PROPOSAL.md`; `data/mc19-scope-proposal.json`; `data/mc19-source-verification.json`; `scripts/check-mc19-scope.mjs`; `npm run test:mc19-scope:unit` 29/29 after the audit rounds; baseline `3490c0f71eb6eaa89588b7a6d75bb3b6066cd094`.

**Status effect.** MC-19 BLOCKED; no implementation, public route, form, lead capture, merge, deployment or publication. MC-18 implementation, evidence and audit conclusions preserved; inherited debt unchanged.

## D-079 - 2026-11-04 - MC-19 independent audit closes after three correction rounds

**Context.** The independent review of the MC-19 scope proposal returned `NEEDS_REVISION` at `b53f67e` with five findings (IR-01 MAJOR guard bypass; IR-02 stop-statement overclaim; IR-03 P03 contradiction; IR-04 P01 evidence strength; IR-05 review/manifest reconciliation). Corrections at `77e0699` closed IR-01..IR-05; round 2 opened IR-06 (MAJOR rename allowlist bypass) and IR-07 (MINOR evidence accuracy). Corrections at `c0dc986` and `8909ad5` closed both. The Claude Code backend failed twice at the product layer (exit 1, invalid-result); the review was performed by an independent native reviewer (id `3c8d2129-b23b-4e26-9254-353e108439ac`), distinct from the author.

**Decision.** Close all seven findings, record review round 3 with `reviewedCommit` `c0dc986` and the label review at `8909ad5`, regenerate the validator evidence at the post-closure HEAD (**23/23**), keep `MC19_VERDICT = BLOCKED`, and record the independent recommendation `PASS_INTERNAL_SCOPE_PROPOSAL` for the proposal scope only.

**Rationale.** The guard now scans the full changed set, including untracked files and both sides of renames, with a strict allowlist; the evidence matches the measured state. No code defect remains. The milestone remains BLOCKED because the implementation prerequisites (P01/P02/P10) are absent.

**Evidence.** `docs/marea/segments/data/mc19-review-findings.json` (7/7 CLOSED); `npm run test:mc19-scope` 23/23; `npm run test:mc19-scope:unit` 29/29; commits `b53f67e`, `77e0699`, `c0dc986`, `8909ad5`; `MC19-EXECUTIVE-REPORT-ES.md` section H.

**Status effect.** `MC19_VERDICT = BLOCKED`; `MC19_INDEPENDENT_AUDIT_RECOMMENDATION = PASS_INTERNAL_SCOPE_PROPOSAL` for the proposal scope; no implementation, public route, form, lead capture, merge, deployment or publication.


## D-080 - 2026-11-04 - MC-19 executes the authorized internal audience-page scope

**Context.** The MC-19 master execution prompt was supplied by the requesting product owner on 2026-11-04 and explicitly authorizes OPTION A: three internal bilingual audience pages (`professionals`, `installers`, `shipowners`) with no enquiry flows. The previous BLOCKED proposal, its seven documents, six datasets and independent audit are preserved as historical evidence. External legal, commercial, privacy and publication approvals remain outstanding and are not implied by the instruction.

**Decision.** Implement the three pages inside the isolated loopback preview, in a new internal namespace `internal/segments/*` (English: `/en/internal/segments/*`), reusing the MC-17 design system and the MC-18 bilingual content pattern. `shipowners` is a new internal-only identity with no reserved public path. Enquiry/lead flows remain BLOCKED by `GATE-PRIVACY-DPA-DPIA`; every action is deliberately disabled. Record the IA decision, the scope instruction with provenance, the acceptance matrix, the security/legal gate verification, the test report, the independent audit, the risk/dependency update, the Spanish executive report and the MC-20 handoff update. Delivery is a draft PR only.

**Rationale.** The instruction removes the three implementation blockers (P01/P02/P10) without closing any external gate. A single bilingual component tree, evidence-bound copy and a deterministic validator keep the internal scope verifiable while making accidental publication unlikely and detectable.

**Evidence.** `docs/marea/segments/MC19-IMPLEMENTATION-CONTRACT.md`; `data/mc19-scope-instruction.json`; `MC19-IA-DECISION.md`; `src/app/marea-segments/`; `preview/landing/`; `npm run test:mc19` 17/17; `npm run test:mc19:unit` 42/42; `npm run test:mc19:e2e` 22/22; production build and inherited gates recorded in `MC19-TEST-REPORT.md`; independent audit in `MC19-INDEPENDENT-AUDIT.md`.

**Status effect.** `MC19_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE`; `MC19_VERDICT = PARTIAL`. No public route, indexation, form, lead capture, price, purchase, merge, deployment or publication. `FINANCIAL_V18`, `MC16_FINAL_02`, MC-13 F-05/F-11/F-14 and MC-15 GSC-01/GSC-02 remain open. MC-20 is not started.
