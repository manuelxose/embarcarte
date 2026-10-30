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
