# MC-11 — Delivery record (D37)

| Field | Value |
| --- | --- |
| Document ID | MC-11 / D37 / `MC-11-DELIVERY` |
| Programme | EMBARCARTE / MAREA |
| Milestone | MC-11 — hardware BOM, supplier quotations and conformity plan (CE/EMC/RED/NMEA 2000 scope) |
| Date | 2026-11-02 |
| Owner | `lead` (Chief Hardware Program Architect) |
| Branch | `feature/marea-mc11-hardware-sourcing-conformity` |
| Base commit | `67131782edaf8f3f8327ba79e5c5b4c554b137b0` (verified MC-10R HEAD, local = remote) |
| Draft PR | [#18](https://github.com/manuelxose/embarcarte/pull/18) — `OPEN`, draft, `MERGEABLE`, base `feature/marea-mc10r-fieldwork-recovery`, **not merged** |
| Independent review | `docs/marea/hardware/review/MC-11-REVIEW.md`; full milestone `PARTIAL`; 9 findings, all `CLOSED_VERIFIED` at `0eceb86`; internal feasibility scope `PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE` |

## 1. Verdict

```
MC11_VERDICT                       = PARTIAL
MC11_INTERNAL_FEASIBILITY_SCOPE    = PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE (re-verified at 0eceb86)
MC11_FORMAL_PROCUREMENT_EVIDENCE   = BLOCKED_OR_NOT_OBTAINED
INDEPENDENT_FINDINGS               = 9/9 CLOSED_VERIFIED, 0 open BLOCKING/MAJOR/MINOR
```

Full MC-11 `PASS` is impossible: the authoritative registry requires **real supplier quotation
evidence**, and no supplier was authorised to be contacted. The registry requirement is recorded as
blocked, not rewritten.

## 2. Scope delivered (D1–D37)

| Group | Delivered |
|---|---|
| Scope and governance | D1 research scope and prohibitions; D2 verified baseline, canonical identifiers, invariants, frozen weights, gates G1–G7, pre-registered acceptance list |
| Architecture | D3 nine-family/six-bundle hardware map; D4 five architecture classes, 33 scored options, legacy component assessment; D5 marine electrical architecture and failure register; D6 protocol/compatibility assessment; D7 HUB; D8 WATCH/SENSE; D9 AIS/DISPLAY/PILOT boundaries; D10 software-first dependencies |
| Sourcing | D11 component and manufacturer landscape (41 real MPNs); D12 supplier register (19, none contacted); D13 public price evidence (42 observations, all classified); D14 ten RFQ packages, none sent |
| Manufacturing | D15 six manufacturing routes with a hybrid recommendation; D16 DFM/DFT and quality plan; D17 environmental reliability plan (23 phenomena); D18 service, warranty and RMA model; 45 qualification tests, all `NOT_EXECUTED` |
| Economics | D19 11 engineering BOMs; D20 11 manufacturing BOMs; D21 cost model; D22 uncertainty and 90 volume scenarios, all `INCOMPLETE` |
| Conformity | D23 per-configuration EU applicability (22 rows, 11 Union acts, reasons for and against); D24 CE/EMC/RED roadmap; D25 NMEA licensing/certification roadmap; D26 18 conformity blockers |
| Security | D27 device security and lifecycle (52 requirements, 45 MUST, CRA as input only); D28 firmware IP and supply chain (`SOURCE_IP_CLEARANCE = NOT_CLEARED`) |
| Portfolio | D29 engineering feasibility assessment (frozen weights, six axes); D30 decision and risk register (D-041…D-047, gates, 39 risks, V01–V50 mapping); D31 MC-12 handoff |
| Machine-readable | D32 18 JSON files, 127 provenance records over 104 distinct URLs |
| Validation | D33 54-check deterministic gate; D34 59-case adversarial negative suite |
| Audit and reporting | D35 independent review; D36 Spanish executive report; D37 this record |

## 3. Files changed in the milestone

- 17 engineering/regulatory documents under `docs/marea/hardware/` (+4 subdirectories: architecture, sourcing, manufacturing, economics, conformity, firmware-security, review).
- 18 data files under `docs/marea/hardware/data/` (17 contract files + `DATA-CONTRACT.md`) and 6 evidence shards.
- 2 scripts: `scripts/check-marea-hardware.mjs`, `scripts/check-marea-hardware.test.mjs`; `package.json` gained `test:hardware` / `test:hardware:unit` and the formatter list entries.
- `docs/marea/execution/MASTER-PROMPT-REGISTRY.md` row 11 and `docs/marea/execution/DECISION-LOG.md` (D-048).
- **Not changed:** `src/`, `public/`, `deploy/`, `.github/`, commerce data, public copy, checkout, indexed URLs; no OPEN-MARINE file was touched or copied.

## 4. Commands run and results (exit codes)

| Command | Result |
|---|---|
| `npm run test:hardware` | PASS — 54/54 checks |
| `npm run test:hardware:unit` | PASS — 59/59 tests |
| `npm run test:products` / `:unit` | PASS 52/52 / 106/106 |
| `npm run test:bundles` / `:unit` | PASS 35/35 / 60/60 |
| `npm run test:brand` / `:unit` | PASS 21/21 / 13/13 |
| `npm run test:market` / `:unit` | PASS 40/40 / 43/43 |
| `npm run test:customer-research` / `:unit` | PASS 62/62 / 111/111 |
| `npm run test:customer-recovery` / `:unit` | PASS 32/32 / 82/82 |
| `npm run test:i18n` | PASS |
| `npm run test:commerce` | PASS |
| `npm run test:seo` | PASS — 101 sitemap URLs, canonical, reciprocal hreflang, JSON-LD, private noindex |
| `npm run test:backup` | PASS |
| `npm run build` | exit 0 |
| `npm run test:e2e` | exit 0 — Playwright 15/15 passed |
| `npm run format:check` | PASS |
| `npm audit --omit=dev --audit-level=high` | 0 vulnerabilities |
| `git diff --check` | clean |

The independent auditor re-ran the node-based gates itself (all exit 0) and independently recomputed
all 11 EBOMs, 11 MBOMs, 90 scenarios, FX conversions, architecture and portfolio scores, conformity
and risk counts with **zero mismatches to the cent**. `npm run build` and `npm run test:e2e` were run by
the Lead only (auditor did not re-run them) and are recorded as Lead-reported evidence.

## 5. Independent review and corrections

- Reviewed fixed commit: `bef2f4b25e06205697bee4de9da908741c726621`. Verdict `PARTIAL`.
- Findings: 1 MAJOR (`MC11-F01` no remote branch/PR at audit time), 4 MINOR (`F02` D31 currency
  composition; `F03` D31 subtotal/tooling wording; `F04` D3 provisional AIS/DISPLAY architecture;
  `F05` "MCU-11" typo), 4 INFORMATIONAL (`F06` rounding; `F07` D36/D37 absent; `F08` evidence
  accessibility; `F09` `independentVerification` flags).
- Corrections applied in the audit-correction commit (`73ab0ac`): D3 aligned with scored
  recommendations and JSON; D31 corrected; D22 rounding unified; BOM typo fixed; 22 evidence records
  marked `VERIFIED_BY_AUDITOR`; manifest updated; branch pushed and draft PR #18 opened. F06, F07 and
  F09 were addressed by the delivery commit.
- **Re-verification performed by the same independent auditor at commit
  `0eceb8663204e6b5d82a137bb0cb50b742e667dc`:** revised verdict — full MC-11 `PARTIAL` (unchanged,
  no formal quotation), internal feasibility scope **`PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE`**,
  no `FAIL`, no fabrication. Per-finding: **9/9 `CLOSED_VERIFIED`**, 0 open BLOCKING/MAJOR/MINOR.
  `MC11-F03` was **withdrawn by the auditor**: it re-checked the scenario arithmetic and confirmed the
  Lead was right that `COST-16` tooling is already inside the 437.13 EUR HUB subtotal and that
  `toolingAmortizationEur` duplicates it and must not be added again. The auditor re-ran
  `test:hardware` 54/54, `test:hardware:unit` 59/59, `test:bundles` 35/35, `test:products` 52/52,
  `format:check` and `git diff --check`, all exit 0. The auditor's report and
  `data/review-findings.json` record the corrections and the post-audit record refreshes PA-01–PA-05.

## 6. Restrictions preserved (verified, not merely stated)

```
COMMERCIAL_AVAILABILITY      = NOT_FOR_SALE        PRICE_APPROVED              = NONE
TRADEMARK_LEGAL_CLEARANCE    = NOT_GRANTED         SOURCE_IP_CLEARANCE         = NOT_CLEARED
NMEA2000_CERTIFIED           = false               TESTED_COMPATIBILITY_ROWS   = 0
AIS_TRANSMISSION_OFFERED     = false               PILOT_SAFETY_GATE           = BLOCKED
FLEET_DEFAULT_HARDWARE       = false               CE_MARKING_CLAIM            = PROHIBITED
ENVIRONMENTAL_RATING_CLAIM   = PROHIBITED          SUPPLIER_CONTACT            = NOT_CONTACTED
RFQ_TRANSMISSION             = NOT_AUTHORIZED      PURCHASES                   = NOT_AUTHORIZED
PROTOTYPE_PROCUREMENT        = NOT_AUTHORIZED       PHYSICAL_TESTS              = NOT_EXECUTED
CONFORMITY_CERTIFICATION     = NOT_ESTABLISHED     PRODUCTION_DEPLOYMENT       = NOT_AUTHORIZED
CUSTOMER_EVIDENCE            = NONE                CUSTOMER_WTP_VALIDATED      = false
```

No merge, tag, release, deployment, publication, sales, preorder, supplier contact, RFQ transmission,
purchase, sample order, laboratory engagement, vessel installation or sea trial occurred.

## 7. Unresolved external dependencies (carried forward)

1. `AUTH-MC10-001` not granted → no customer evidence, no hardware requirement prioritisation.
2. G2 not authorised → no supplier contact, quotation, MOQ, lead time, tooling price or warranty term.
3. G3/G4 not authorised → no prototype, no measurement, no EMC/thermal/ingress evidence.
4. G6 not started → no technical file, no notified body, no certification.
5. Manufacturer/economic-operator identity undetermined (legal decision).
6. Trademark clearance `NOT_GRANTED` (external specialist).
7. OPEN-MARINE rights/assignment unresolved (`NOT_CLEARED`).
8. NMEA membership/licence/manufacturer code/certification not obtained.
9. CRA classification and qualified legal review pending.
10. Product liability insurance and support-period funding not established.

## 8. Inputs for the next milestone

MC-12 receives per-line cost confidence, 90 volume scenarios, the assumption register, recurring
dependency gaps (cellular, cloud, chart, weather, NMEA, CRA maintenance), modelled installation labour
and explicit quotation gaps. MC-13 receives capital, tooling, certification, inventory and working-capital
inputs. Neither milestone is started by MC-11, and MC-10 is **not** complete.

## 9. Delivery status block

```
DELIVERED                  = YES (internal engineering feasibility package)
INDEPENDENT_REVIEW         = PARTIAL (full milestone; 9/9 findings CLOSED_VERIFIED at 0eceb86,
                             internal feasibility scope = PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE)
MERGED                     = NO
DEPLOYED                   = NO
PUBLISHED                  = NO
FOR_SALE                   = NO
SUPPLIER_CONTACTED         = NO
PURCHASED                  = NO
TESTED                     = NO
CERTIFIED                  = NO
```
