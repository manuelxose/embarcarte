# MC-11 — Verified baseline and governance (D2)

Status: `INTERNAL_ENGINEERING_RESEARCH`. Owner: Lead (Chief Hardware Program Architect).
Milestone MC-11 of 36. Date: 2026-11-02 (Europe/Madrid).

This document records what was **verified by command** before any MC-11 file was written, which
authorities were read, which canonical identifiers and invariants bind every specialist, and the
acceptance list against which the milestone is judged. Anything not in this document is not a
program fact.

## 1. Verified repository baseline (commands executed 2026-11-02)

| # | Check | Command | Result |
|---|---|---|---|
| 1 | Working directory | `Get-Location` | `C:\Users\Admin\Documents\workspace\embarcarte` |
| 2 | Remotes | `git remote -v` | `origin` → `https://github.com/manuelxose/embarcarte.git` (fetch/push); no other remote |
| 3 | Branch at entry | `git rev-parse --abbrev-ref HEAD` | `feature/marea-mc10r-fieldwork-recovery` |
| 4 | HEAD at entry | `git rev-parse HEAD` | `67131782edaf8f3f8327ba79e5c5b4c554b137b0` — matches MC-10R HEAD stated in the Master Prompt |
| 5 | Remote MC-10R head | `git ls-remote origin feature/marea-mc10r-fieldwork-recovery` | `67131782edaf8f3f8327ba79e5c5b4c554b137b0` — local = remote |
| 6 | Working tree | `git status --porcelain=v1` | empty (clean) before MC-11 creation |
| 7 | PR #17 | `gh pr view 17 --json ...` | `OPEN`, `isDraft: true`, `MERGEABLE`, head `feature/marea-mc10r-fieldwork-recovery`, base `feature/marea-mc10-primary-customer-discovery` — **unmerged** |
| 8 | PR stack | `gh pr list --state open` | 11 stacked draft PRs: #7…#17, each based on its predecessor; none merged |
| 9 | Existing MC-11 work | `Test-Path docs/marea/hardware` | `False`; no branch `feature/marea-mc11-*` local or remote |
| 10 | Registry state | `MASTER-PROMPT-REGISTRY.md` row 11 | `PLANNED`, dependencies `02, 05–07` |
| 11 | Local branches | `git branch` | `main` + `feature/marea-mc01…mc10r`; MC-11 branch absent |
| 12 | Node / npm | `node --version`, `npm --version` | `v24.18.0`, `12.0.1` (package `engines.node >= 22` satisfied) |
| 13 | Git CLI / GitHub CLI | `git --version`, `gh --version` | `2.38.0.windows.1`, `2.96.0` |
| 14 | Graph tooling | `graphify --version`, `graphify-out/graph.json` | `0.9.94`; graph present (6.9 MB) and used as the first-pass repository index |
| 15 | Verified npm gates | `package.json` | `test:products`, `test:products:unit`, `test:bundles`, `test:bundles:unit`, `test:brand`, `test:brand:unit`, `test:market`, `test:market:unit`, `test:customer-research(:unit)`, `test:customer-recovery(:unit)`, `test:i18n`, `test:commerce`, `test:seo`, `test:backup`, `test:performance`, `test:e2e`, `build`, `format:check`; **`npm test` is not defined** (documented in `AGENTS.md`) |

**MC-11 branch created:** `feature/marea-mc11-hardware-sourcing-conformity`
from `67131782edaf8f3f8327ba79e5c5b4c554b137b0`. Planned draft PR base:
`feature/marea-mc10r-fieldwork-recovery` (because PR #17 is open and unmerged). No merge, tag,
release, deployment or publication is performed by this milestone.

### 1.1 Discrepancies and environment notes (recorded, not silently resolved)

| ID | Observation | Treatment |
|---|---|---|
| DISC-01 | The Master Prompt asserts `MC-11: NOT_STARTED at execution entry`; **confirmed** (no branch, no `docs/marea/hardware/`, registry `PLANNED`). | No action. Baseline matches. |
| DISC-02 | The registry acceptance for milestone 11 is *"Real quotes only; no invented BOM or certification; NMEA claims blocked until authorized; PILOT safety-gate plan funded or deferred"*. Real quotations are impossible without supplier contact, which is **not authorised**. | Milestone reported `PARTIAL` with `MC11_FORMAL_PROCUREMENT_EVIDENCE = BLOCKED_OR_NOT_OBTAINED`. The registry requirement is **not** rewritten. |
| DISC-03 | Predecessors MC-09/MC-10/MC-10R are unmerged and stacked; PR #17 is still open. | MC-11 branches from and targets the verified MC-10R head/branch; no predecessor content is altered. |
| DISC-04 | Customer evidence is `NONE`: MC-10 executed 0 interviews, 0 price responses; all ten experiments `NOT_EXECUTED`/`BLOCKED`. | No hardware requirement is customer-prioritised. Architecture and BOM choices are internal engineering judgement, labelled as such. |
| DISC-05 | The PowerShell host reports `InvalidOperation … solo se admiten los tipos principales` warnings on each invocation (constrained-language artefact of the sandbox wrapper). | Cosmetic: commands returned their expected output and exit codes; no command result depended on the blocked .NET type accelerator. Recorded so the auditor can reproduce the environment. |
| DISC-06 | `AGENTS.md` states `npm test` is undefined, while the Master Prompt schema lists a `npm run test:*` set. | The verified per-gate scripts from `package.json` are used; every executed gate is recorded with exit code. |
| DISC-07 | MC-10R left a withdrawn "owner signature pack" commit (`6713178` reverts `bf45cb1`). | Treated as the inherited baseline; MC-11 neither reinstates nor re-authors it. |

## 2. Authorities read before writing (and what each establishes)

| Document | What MC-11 takes from it |
|---|---|
| `AGENTS.md` | Lead-only Git, specialist write scopes, independent review by a non-author, PASS/PARTIAL/BLOCKED/FAIL states, no invented stock/certification/quotes, no unapproved price or publication |
| `docs/marea/execution/AGENT-OPERATING-MODEL.md` | Roles, one-writer-per-scope, max 8 members, no worktree isolation, reviewer ≠ author, milestone closure artefacts |
| `docs/marea/execution/MASTER-PROMPT-REGISTRY.md` | Milestone-11 scope/dependencies/acceptance (quoted above), 36-milestone numbering |
| `docs/marea/execution/DECISION-LOG.md` | Append-only decisions D-001…D-040; D-033 fixes that MC-11 inherits **no** customer evidence; D-027 sequences validation software-first; D-011/D-015 freeze safety/security as non-edition properties |
| `docs/marea/products/README.md` + nine commercial specs | Canonical 24-field product definitions, editions, evidence classes, readiness dimensions |
| `docs/marea/products/product-definitions.batch-01/02/03.json` | Canonical product/edition identifiers and readiness states |
| `docs/marea/bundles/bundle-definitions.json` + `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` | Six bundle IDs, component lines, `hardwareIncludedByDefault=false` for FLEET |
| `docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` | Prior hardware article inventory `HW-01…HW-16` for OPEN-MARINE (read-only reference): exact models not recorded, datasheets not retrieved, no BOM/quotes (`H-07`) |
| `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` | Blocker IDs consumed by MC-11, notably `H-03` (motor link contradiction), `H-07` (no BOM/quotes), M-xx licensing |
| `docs/marea/customer-discovery/MC10-MC11-HANDOFF.md` | `CUSTOMER_EVIDENCE_TRANSFERRED = NONE`; HW-01…HW-10 and SUP/CON question sets to answer internally |
| `docs/marea/customer-discovery/recovery/MC10R-HANDOFF-TO-AUTHORIZED-FIELDWORK.md` | Fieldwork remains `BLOCKED`; MC-11 must not present preparation as findings |
| `docs/marea/market-validation/MC09-EXECUTIVE-REPORT.md`, `MC09-PORTFOLIO-PRIORITIZATION.md` | Desk-research hypotheses only; explicitly not demand evidence |

## 3. Canonical identifiers (binding; must not be renamed by MC-11)

Products (9) — `id` / editions:

| Product | Editions |
|---|---|
| `NAV` | `NAV-ESSENTIAL`, `NAV-PRO` |
| `HUB` | `HUB-STANDARD`, `HUB-PRO` |
| `AIS` | `AIS-RECEIVER`, `AIS-CONNECTED` |
| `PILOT` | `PILOT-COASTAL`, `PILOT-SAIL`, `PILOT-PRO` |
| `SENSE` | `SENSE-WIND`, `SENSE-POWER`, `SENSE-BILGE`, `SENSE-TANKS`, `SENSE-ENV`, `SENSE-ESSENTIALS`, `SENSE-SAIL`, `SENSE-SYSTEMS` |
| `WATCH` | `WATCH-CORE`, `WATCH-PLUS` |
| `DISPLAY` | `DISPLAY-7`, `DISPLAY-LARGE-CONDITIONAL` |
| `WEATHER` | `WEATHER-STANDARD`, `WEATHER-PRO` |
| `FLEET` | `FLEET-START`, `FLEET-BUSINESS`, `FLEET-ENTERPRISE` |

Bundles (6) — `id` / canonical `displayName`:

| Bundle ID | Name |
|---|---|
| `START` | MAREA START |
| `CRUISE` | MAREA CRUISE |
| `SAIL` | MAREA SAIL |
| `PROTECT` | MAREA PROTECT |
| `COMPLETE` | MAREA COMPLETE |
| `FLEET` | MAREA FLEET (package; `hardwareIncludedByDefault = false`) |

`SENSE-ESSENTIALS` expands to `SENSE-POWER` + `SENSE-BILGE`; `SENSE-SAIL` and `SENSE-SYSTEMS` are kits
that expand only to existing module editions. A kit is packaging, never new capability. PROTECT
counts each sensor once.

## 4. Invariants (may not be weakened by any MC-11 artefact)

```
COMMERCIAL_AVAILABILITY        = NOT_FOR_SALE
PRICE_APPROVED                 = NONE (all MAREA prices remain HYPOTHESIS_UNAPPROVED / NOT_ESTABLISHED)
TRADEMARK_LEGAL_CLEARANCE      = NOT_GRANTED
SOURCE_IP_CLEARANCE            = NOT_CLEARED
OPEN_MARINE_WRITE              = PROHIBITED
NMEA2000_CERTIFIED             = false
TESTED_COMPATIBILITY_ROWS      = 0
AIS_TRANSMISSION_OFFERED       = false
PILOT_SAFETY_GATE              = BLOCKED
REMOTE_HELM_CONTROL            = false
CHART_RIGHTS_GRANTED           = false
WEATHER_PROVIDER_RIGHTS        = NOT_GRANTED
FLEET_DEFAULT_HARDWARE         = false
GOVERNANCE_CONTROLLER_DESIGNATED = false
SUPPLIER_CONTACT               = NOT_CONTACTED (all)
RFQ_TRANSMISSION               = NOT_AUTHORIZED (all)
PURCHASES                      = NOT_AUTHORIZED (none)
PROTOTYPE_PROCUREMENT          = NOT_AUTHORIZED (none)
PHYSICAL_TESTS                 = NOT_EXECUTED (all)
CONFORMITY_CERTIFICATION       = NOT_ESTABLISHED (all)
CE_MARKING_CLAIM               = PROHIBITED
ENVIRONMENTAL_RATING_CLAIM     = PROHIBITED (no IP/temperature/EMC rating claim)
PRODUCTION_DEPLOYMENT          = NOT_AUTHORIZED
PUBLICATION_CHANGE             = NOT_AUTHORIZED
```

These are restated in `data/governance-status.json` and enforced by the validator.

## 5. Evidence vocabulary (single source of truth)

- **Price class** (per observation): the nine values in D1 §5.2.
- **Confidence** (per component/BOM line): `PUBLIC_PRICE_OBSERVED`, `MANUFACTURER_SPEC_VERIFIED`,
  `ENGINEERING_ESTIMATE`, `COST_UNVERIFIED`; plus `SUPPLIER_QUOTED` and `PRODUCTION_APPROVED` which
  **may not be used in MC-11** (no evidence exists for either).
- **Compatibility status:** `DOCUMENTED_INTERFACE`, `PROPOSED`, `ASSUMED`, `TEST_REQUIRED`,
  `TESTED`, `SUPPORTED`, `BLOCKED`. `TESTED`/`SUPPORTED` are forbidden in MC-11.
- **RFQ states:** `RFQ_DRAFT_PREPARED`, `RFQ_APPROVAL_REQUIRED`, `RFQ_NOT_SENT`,
  `SUPPLIER_NOT_CONTACTED`, `FORMAL_QUOTE_NOT_OBTAINED`.
- **VAT treatment:** `VAT_INCLUDED`, `VAT_EXCLUDED`, `VAT_UNKNOWN`; never mixed in one total.
- **Unknown ≠ 0.** Every unknown cost stays `UNKNOWN`/`COST_UNVERIFIED` and marks the containing
  total `INCOMPLETE`.

## 6. Frozen scoring weights (fixed before any score was assigned)

Architecture option criteria (§9 of the Master Prompt), sum = 100:

| Criterion | Weight |
|---|---|
| Technical feasibility | 15 |
| Component availability | 10 |
| Supplier longevity | 10 |
| Energy consumption | 5 |
| Manufacturing cost uncertainty | 8 |
| Conformity complexity (higher = simpler/cheaper) | 12 |
| Maintainability | 8 |
| Connectivity | 6 |
| Security | 8 |
| Mechanical integration | 8 |
| Field-service requirements (higher = easier) | 10 |

Portfolio feasibility dimensions (§23), sum = 100:

| Dimension | Weight |
|---|---|
| Hardware development complexity (higher = simpler) | 10 |
| Critical external dependencies (higher = fewer) | 10 |
| Component availability | 8 |
| Engineering cost exposure (higher = lower) | 10 |
| Conformity complexity (higher = simpler) | 12 |
| Safety severity (higher = safer) | 12 |
| Maintenance burden (higher = lighter) | 8 |
| Shared-platform benefit | 8 |
| Evidence quality | 8 |
| Vendor dependency (higher = less dependent) | 6 |
| Time to physical validation (higher = shorter) | 8 |

Scores are 1–5 integers. A weighted score may never override a hard gate: `PILOT` stays
`BLOCKED` regardless of its score, `AIS` transmission stays prohibited, and no product becomes
`FOR_SALE`.

## 7. HUB edition boundary (binding; no invented interface)

`HUB-STANDARD` and `HUB-PRO` are commercial editions defined in `MAREA-HUB-COMMERCIAL-SPEC.md`
§5 and `PRODUCT-EDITIONS-NAV-HUB-AIS.md`. MC-11 may propose candidate interfaces **per edition**, but
it may not move an interface into an edition that the canonical contract excludes, and it may not
invent a third edition. Where an edition's interface set is not yet specified, the architecture
document must say `EDITION_INTERFACE_UNSPECIFIED` rather than assume.

## 8. Materials and FLEET rules

- No new physical SKU may be invented merely because a bundle has a commercial name. Bundle hardware
  composition is traced to `bundle-definitions.json` `components[]` and
  `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md`.
- `FLEET` includes no default hardware. Any optional edge device is an explicitly conditional
  integration, never a bundle line.
- `PROTECT` = `WATCH-CORE` + `SENSE-ESSENTIALS` (expanding to `SENSE-POWER` + `SENSE-BILGE`); a
  sensor is counted once.
- `SAIL` / `COMPLETE` carry no fixed turnkey price; `PILOT` is never a priced bundle line.

## 9. Gates G1–G7 (kept separate from all status claims)

| Gate | Meaning | MC-11 state |
|---|---|---|
| G1 | Architecture selection (documented tradeoffs + responsible engineering approval) | `CANDIDATE_ONLY` |
| G2 | Supplier engagement (explicit permission for named suppliers/scope) | `NOT_AUTHORIZED` |
| G3 | Prototype procurement (budget, approved BOM revision, selected supplier, purchasing authority) | `NOT_AUTHORIZED` |
| G4 | Prototype testing (safe test plans, equipment, qualified personnel, test authorisation) | `NOT_AUTHORIZED` / `NOT_EXECUTED` |
| G5 | Marine integration testing (vessel-specific safety review + permissions) | `NOT_AUTHORIZED` / `NOT_EXECUTED` |
| G6 | Regulatory evaluation (real configuration, technical file, test evidence, qualified external involvement) | `NOT_STARTED` |
| G7 | Production release (engineering + quality + legal + commercial approval) | `NOT_AUTHORIZED` |

## 10. Acceptance list for `PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE`

Fixed **before** the work, so it cannot be relaxed afterwards:

1. Baseline verified, discrepancies recorded (§1).
2. All nine product families assessed with hardware applicability.
3. All six bundles mapped to canonical composition, no invented SKU, FLEET hardware-free.
4. Candidate architectures justified against frozen criteria, marked proposed.
5. Hardware dependencies documented, including software-first alternatives.
6. Component landscape backed by public manufacturer/distributor sources with URLs and dates.
7. Preliminary engineering and manufacturing BOMs complete to the extent evidence permits.
8. Public prices accurately classified; no catalogue price presented as a quotation.
9. Unknown costs remain unknown and totals containing them are marked incomplete.
10. Manufacturing routes analysed; DFM/DFT/quality plan present.
11. Qualification and environmental test plans present, every test `NOT_EXECUTED`.
12. EU regulatory applicability assessed per configuration with reasons for inclusion **and**
    exclusion; CRA/NMEA/MED scoping evidence-linked.
13. NMEA licensing/certification boundaries preserved (no certification claimed).
14. `PILOT_SAFETY_GATE = BLOCKED` preserved; no actuator path.
15. Firmware/device security and lifecycle assessed; OPEN-MARINE IP not cleared.
16. No unsupported certification, compatibility, accuracy, IP-rating or delivery claim.
17. No invented customer validation; customer evidence remains `NONE`.
18. No supplier contact, RFQ transmission or purchase.
19. New validator `scripts/check-marea-hardware.mjs` passes, including adversarial negative tests.
20. Existing regression gates pass (or a pre-existing failure is proved pre-existing).
21. Independent auditor closes all `BLOCKING` and `MAJOR` findings.
22. PR verified draft, stacked on the verified base, unmerged.

If every item above is evidenced but no genuine supplier quotation exists, the milestone verdict is
`PARTIAL — INTERNAL FEASIBILITY PASS; FORMAL SUPPLIER QUOTATIONS NOT OBTAINED`.
