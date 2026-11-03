# MC-17 — Baseline and governance (D01)

| Field | Value |
|---|---|
| Deliverable | D01 `MC-17-BASELINE-AND-GOVERNANCE.md` |
| Milestone | MC-17/36 — MAREA premium design system (internal only) |
| Date | 2026-11-03 |
| Owner | documentation-specialist (MC-17/36) |
| Status | `INTERNAL_PROPOSED` — governance record, not an approval |
| Adoption | `NOT_ADOPTED` |
| Public use | `NO_GO` |
| Branch | `feature/marea-mc17-premium-design-system` |
| Verified base commit | `6d8287c8507038c4f90fd6e35471f78081ca4676` |
| Independent review | `PENDING` — no MC-17 independent review exists at the time of writing |
| Validator status | `FAIL` — the recorded run was `FAIL` at both observations made during authoring (see §7); the evidence file is the authority |

This document fixes what MC-17 is, what it is authorised to change, which
governance state it inherits and what has actually been verified. It does not
grade the milestone: no MC-17 verdict is claimed here.

## 1. Milestone identity and authorisation

MC-17 is prompt 17/36 of the MAREA programme. The committed registry defines its
objective as "Design system implementation: tokens, components,
responsive/a11y/performance contract" with dependencies 04 and 15 and the
verification criterion "WCAG 2.2 AA checks; mobile-first; no generic SaaS layout"
(`docs/marea/execution/MASTER-PROMPT-REGISTRY.md`, row 17).

The authorisation under which this work is performed was recorded for this
milestone as:

```text
MC-17 scope = design-system implementation, INTERNAL development only.
No public surface, route, page, asset, deployment or brand use is authorised.
```

Two facts must be stated plainly:

1. The registry row for prompt 17 still reads `PLANNED` with no evidence column.
   It was not updated to `IN PROGRESS` when implementation started, so the
   registry does not yet reflect this milestone. That is a bookkeeping gap, not a
   retroactive permission: the scope boundary in §5 is the binding constraint.
2. The Master Prompt 17/36 text itself is **not committed to this repository**.
   The closest committed artefacts are registry row 17 above, the MC-16 → MC-17
   presentation handoff (`docs/marea/commerce-data/MC16-MC17-HANDOFF.md`) and the
   frozen governance block in §3. This document records the authorisation as
   scope constraints; it does not quote a prompt file that does not exist here.

## 2. Verified baseline

| Item | Recorded value | Source |
|---|---|---|
| Verified base commit | `6d8287c8507038c4f90fd6e35471f78081ca4676` | `docs/marea/design-system/data/legacy-ui-baseline.json` `baselineCommit`; `scripts/check-marea-design-system.mjs` `BASE_COMMIT`; `scripts/build-marea-design-system-baseline.mjs` |
| Baseline proof | 35 watched files and 15 public files hashed with SHA-256 at that commit; check `MC17-28` passes "35 watched files unchanged vs 6d8287c…" | same baseline dataset; recorded validator run |
| Predecessor milestone | MC-16 (commerce/product data model), verdict `PARTIAL`, internal scope `PASS_INTERNAL_COMMERCE_DATA_SCOPE` | registry row 16; `docs/marea/commerce-data/MC16-DELIVERY.md` |
| PR #23 | `OPEN`, `DRAFT`, `MERGEABLE`, not merged (`mergedAt = null`) | `docs/marea/commerce-data/MC16-DELIVERY.md` lines 10–11 and 129 ("PR #23 abierto, borrador, `mergedAt=null`") |
| PR #23 base branch | `feature/marea-mc15-bilingual-ia-seo-migration` at `99212a41f5942a6fef4ede75815132c11fa4de50` | `MC16-DELIVERY.md` line 8; `MC-16-BASELINE-AND-GOVERNANCE.md` §2 |
| MC-16 audited implementation | `ee4f5d20bb0613b6a0e3eaff600b93047cd8ea3e`, 0 open BLOCKING/MAJOR, 1 open MINOR, 1 open INFORMATIONAL | `MC16-INDEPENDENT-REVIEW.md` §7/§10 |

**Verification limits of this table.** PR state and branch head above are quoted
from the committed MC-16 delivery records. This milestone did **not** run `git`
or query the GitHub API — those commands are outside the documentation scope for
this task — so the PR state is inherited evidence, not a fresh verification. The
base commit is verified differently and more strongly: the SHA-256 baseline in
`legacy-ui-baseline.json` was regenerated from that commit and check `MC17-28`
re-hashes the working tree against it.

## 3. Frozen governance block (copied exactly)

```text
TRADEMARK_LEGAL_CLEARANCE=NOT_GRANTED
MAREA_PUBLIC_USE=NO_GO
FINAL_IDENTITY_ADOPTION=BLOCKED
SOURCE_IP_CLEARANCE=NOT_CLEARED
COMMERCIAL_AVAILABILITY=NOT_FOR_SALE
PRICE_APPROVED=NONE
CUSTOMER_EVIDENCE=NONE
CUSTOMER_WTP_VALIDATED=false
LICENSING_RIGHTS_GRANTED=false
PILOT_SAFETY_GATE=BLOCKED
AIS_TRANSMISSION_OFFERED=false
FLEET_DEFAULT_HARDWARE=false
CE_MARKING_CLAIM=PROHIBITED
NMEA2000_CERTIFIED=false
TESTED_COMPATIBILITY_ROWS=0
PUBLICATION_AUTHORIZED=false
PRODUCTION_DEPLOYMENT=NOT_AUTHORIZED
```

Per-flag committed sources: the inherited restriction blocks in
`docs/marea/information-architecture/MC-15-BASELINE-AND-GOVERNANCE.md` §3,
`docs/marea/commerce-data/MC-16-BASELINE-AND-GOVERNANCE.md` §3 and
`docs/marea/legal-commercial/MC-14-BASELINE-AND-GOVERNANCE.md`; the per-flag
meanings in `docs/marea/information-architecture/MC15-LEGAL-COMMERCIAL-PUBLICATION-GATES.md`
rows `AIS_TRANSMISSION_OFFERED`, `FLEET_DEFAULT_HARDWARE`, `CE_MARKING_CLAIM`,
`NMEA2000_CERTIFIED`, `TESTED_COMPATIBILITY_ROWS`;
`FINAL_IDENTITY_ADOPTION=BLOCKED` from decision D-005 and the MC-04 identity
system; `PUBLICATION_AUTHORIZED=false` from the MC-15/MC-16 gate registers.

No flag in this block is relaxed by the design system. The design system is
*internal presentation code*: it renders no price, no availability, no purchase
path and no public claim (§5), so it cannot move any of these values.

## 4. MC-04 system status inherited

| Field | Value | Source |
|---|---|---|
| System status | `INTERNAL_PROPOSED` | MC-04 documents header blocks; `marea-design-tokens.source.json` |
| Adoption | `NOT_ADOPTED` | `COLOUR-SYSTEM.md`, `TYPOGRAPHY-SYSTEM.md`, `IDENTITY-SYSTEM.md` |
| Public use | `NO_GO` | MC-04 + MC-15 + MC-16 restriction blocks |
| Implementation in site | `NOT_APPLIED_TO_SRC` (MC-04) | `MC-04-ACCESSIBILITY-EVIDENCE.md` |
| Identity preference (internal only) | `PREFERRED_PROVISIONAL = B — Bearing Index` | decision D-005 |
| Professional originality check | `PENDING` | `ORIGINALITY-AND-PRIOR-ART-CHECK.md` |
| Live focus-ring defect F-1 | `OPEN` for the public site | `COLOUR-SYSTEM.md` §7 |

MC-17 converts MC-04 proposals into executable tokens and components **inside the
isolated design-system tree**. It does not adopt the identity, does not restyle
the live website, and does not close MC-04 findings. The one place where MC-17
knowingly differs from the live site is the focus ring: the design system ships
the MC-04 proposed `#0f5f8c`, while `src/styles.scss` line 29 still hard-codes
`#8fd2f5` at 1.65:1. F-1 therefore remains **OPEN** for the public site and is
recorded as `MC17-F1-LIVE-FOCUS` in `data/blocker-register.json`.

## 5. Scope boundary

In scope (implemented in this branch):

- `src/app/marea-design-system/**` — contracts, tokens, theme host, 49 registered components.
- `preview/**` + the `marea-design-system-catalogue` Angular project — internal catalogue.
- `docs/marea/design-system/**` — documents, datasets, evidence.
- `scripts/build-marea-design-tokens.mjs`, `build-marea-design-system-fixtures.mjs`,
  `build-marea-design-system-baseline.mjs`, `build-marea-design-system-catalogue-data.mjs`,
  `check-marea-design-system.mjs` (+ unit and adversarial suites), `marea-ds-preview-server.mjs`,
  and the `design-system` entries in `package.json`.
- `e2e/design-system/**` and `playwright.design-system.config.ts` — the isolated test project.

Out of scope, verified untouched by the recorded run:

| Prohibited change | Evidence it did not happen |
|---|---|
| Public route added or modified | `MC17-29` PASS — "23 proposed routes, none added to the Angular router"; `src/app/app.routes.ts` is byte-identical to the baseline |
| Public asset or MAREA asset added | `MC17-11` PASS — "15 public files unchanged, zero MAREA assets" |
| Production global styles changed | `MC17-07` PASS — production `styles` still `["src/styles.scss"]`; no `:root`/`html` override; no legacy token mutation; `src/styles.scss` contains no `marea` |
| Production entry points import the design system | `MC17-08` PASS — 5 production files free of design-system imports |
| Production bundle contains catalogue code | `MC17-09` PASS — 168 build files scanned |
| Public metadata/static files changed | `MC17-30` PASS — robots, manifest, OG image, favicon and `src/index.html` unchanged |
| Structured Product/Offer data emitted | `MC17-31` PASS |
| Merge, deploy, publication, brand adoption | none performed; PR #23 stays open/draft; no deployment command was run |

The design system is absent from the production application by construction, not
by feature flag: nothing under `src/app/marea-design-system` is imported by
`src/main.ts`, `src/main.server.ts`, `src/app/app.routes.ts`,
`src/app/core/seo.service.ts` or `src/server.ts`.

## 6. What MC-17 actually contains

| Layer | Count | Authority |
|---|---|---|
| Visual modes | 4 (`web-light`, `instrument-day`, `instrument-sunlight`, `instrument-night`) | `mode-contracts.json` |
| Colour roles | 33 per mode (132 colour provenance rows) | `token-source-map.json`, `color-roles.json` |
| Token ids / custom properties | 163 token ids, 262 provenance rows | `token-source-map.json` |
| Typography roles | 13 (2 families) | `typography-roles.json` |
| Registered components | 49 (1 theme + 16 foundation + 12 structured + 12 commerce + 8 instrument) | `component-registry.json` |
| Component states | 11 required states per component, 386 explicit `NOT_APPLICABLE` entries | `component-states.json` |
| Bilingual copy keys | 138 (ES + EN, no empty side) | `core/i18n.ts`; check `MC17-25` |
| Synthetic fixtures | 9 families, 26 editions, 6 bundles, class `SYNTHETIC_INTERNAL_FIXTURE` | `data/fixtures/marea-fixtures.generated.ts` |
| Audience of all of the above | internal review only | this document, §3 |

Component and token counts are counts of the registry, generated files and code
observed at authoring time; `MC17-12` re-verifies every registry entry against
the implementation file it names, and fails if a class, selector, input, output
or host marker is missing.

## 7. Verification state — what has and has not run

A recorded run exists at
`docs/marea/design-system/evidence/validator-run.json`, written by
`npm run test:design-system` (`node scripts/check-marea-design-system.mjs`). The
working tree was being built by parallel workstreams while this document was
written, so the file changed under observation. Both snapshots are recorded here
because the trend matters:

| Observation (local time) | status | passed / total | failing checks |
|---|---|---|---|
| 02:47 | `FAIL` | 31 / 38 | `MC17-06` (13 unresolved `--marea-type-*-letter-spacing` names), `MC17-32`, `MC17-33`, `MC17-34`, `MC17-35`, `MC17-36`, `MC17-38` (missing datasets/documents) |
| 02:56 | `FAIL` | 35 / 38 | `MC17-33` (`mc18Started` read at the wrong level), `MC17-35` (missing documents), `MC17-36` (missing `manifest.json`, `responsive-evidence.json`, `performance-evidence.json`, `visual-regression-evidence.json`, `review-findings.json`) |

The contrast evidence written by the same command is
`data/contrast-evidence.json` — at both observations status `PASS`, 296 pair/mode
measurements, 0 failures.

Checks that pass in the 02:56 snapshot and are directly relevant to the scope
boundary: `MC17-01` governance status unchanged, `MC17-04` all declared contrast
pairs pass, `MC17-07` no global override, `MC17-08` production isolation,
`MC17-09` bundle scan, `MC17-10` catalogue project isolation, `MC17-11` zero MAREA
public assets, `MC17-12` registry vs implementation (49 entries), `MC17-14` 49
components × 11 states, `MC17-19` no purchase path/currency/price API, `MC17-21`
9/26/6 entities represented, `MC17-28` baseline unchanged, `MC17-29` routes
untouched, `MC17-31` no Product/Offer markup, `MC17-37` test artefacts present.

**This document does not claim PASS.** The run is `FAIL`; the remaining failures
are missing artefacts (`manifest.json`, `responsive-evidence.json`,
`performance-evidence.json`, `visual-regression-evidence.json`,
`review-findings.json` and several documents of the 24-deliverable set) plus one
handoff-field mismatch. The snapshot is also stale by construction: the tree kept
changing after it was written, so the only valid statement is the one in the file
at the moment it is read.

Not run by this milestone: `npm run build`, `npm run test:design-system:visual`,
the Playwright suites, any axe audit, and any git command. No performance
measurement, visual-regression baseline or hardware test exists.

## 8. Inheritance and non-amendment

| Inherited verdict | Value | Changed by MC-17 |
|---|---|---|
| `MC16_VERDICT` | `PARTIAL` | No |
| MC-16 internal scope | `PASS_INTERNAL_COMMERCE_DATA_SCOPE` | No |
| MC-15 verdict | `PARTIAL` | No |
| MC-13 / MC-14 verdicts | `PARTIAL` | No |
| `FINANCIAL_V18` inherited gate failure | open | No — not rewritten, not "fixed" by editing frozen financial data |
| MC-14 release gates | 13 open / 0 closed | No |
| MC-14 claims register | 42 catalogued / 0 public-authorised | No |

MC-17 adds one blocker register of its own
(`docs/marea/design-system/data/blocker-register.json`, 17 entries) that carries
`MC16-FINAL-02`, `MC16-FINAL-09`, `FINANCIAL_V18`, `MC13-F-05`, `MC13-F-11`,
`MC13-F-14`, `MC15-GSC-01`, `MC15-GSC-02` unchanged and adds the MC-17-specific
blockers (trademark, hardware validation, no authorised copy, no independent
review, validator not passing, token-reference defect, live F-1, deliverable
coverage, open publication gates).

## 9. Named gaps in this governance record

1. Master Prompt 17/36 is not committed; the authorisation in §1 is a recorded
   scope statement, not a repository quote.
2. The registry still shows prompt 17 as `PLANNED`; it must be updated by the
   Lead with the real status and evidence when the milestone is graded.
3. PR #23 state is quoted from committed MC-16 records, not re-verified live.
4. No MC-17 independent review exists; author review is not independent review.
5. The validator does not pass; the recorded run is stale.
6. No public-surface change was made, so no live-site visual or accessibility
   claim can be derived from this milestone.

## 10. Change control

- Any change to the scope boundary in §5 requires a recorded decision in
  `docs/marea/execution/DECISION-LOG.md` before it is implemented.
- Any change to a token value, component contract or dataset must be regenerated
  with the named script and re-validated; hand-edited generated files are a defect.
- This document may be corrected when a fact is wrong; it must not be rewritten to
  make a later verdict true.

Source references: `docs/marea/execution/MASTER-PROMPT-REGISTRY.md`,
`docs/marea/execution/DECISION-LOG.md` (D-005, D-006, D-068–D-070),
`docs/marea/brand/COLOUR-SYSTEM.md`, `MC-04-ACCESSIBILITY-EVIDENCE.md`,
`docs/marea/commerce-data/MC16-MC17-HANDOFF.md`, `MC16-DELIVERY.md`,
`MC16-INDEPENDENT-REVIEW.md`, `docs/marea/design-system/data/*.json`,
`docs/marea/design-system/evidence/validator-run.json`, `src/styles.scss`.
