# MC-20 — Delivery record

| Field | Value |
| --- | --- |
| Milestone | MC-20/36 — product catalogue batch 1: NAV, HUB, AIS (ES/EN) |
| Branch | `feature/marea-mc20-nav-hub-ais-catalog` |
| Base commit | `3490c0f` — verified MC-18 delivery HEAD |
| Implementation commits | recorded in §5 |
| Delivery type | DRAFT pull request; no merge, no deployment |
| `MC20_INTERNAL_IMPLEMENTATION` | `PASS_INTERNAL_SCOPE` |
| `MC20_VERDICT` | `PARTIAL` — external authorisations outstanding |
| MC-21 | `NOT_STARTED` |

## 1. Delivered

1. MC-20 scope contract — `MC20-SCOPE-CONTRACT.md`.
2. Canonical product mapping — `MC20-CANONICAL-PRODUCT-MAPPING.md` + two JSON datasets.
3. Implemented NAV/HUB/AIS internal catalogue — `src/app/marea-catalog/`, six preview routes.
4. Architecture and component inventory — `MC20-ARCHITECTURE-AND-COMPONENT-INVENTORY.md`.
5. ES/EN parity evidence — `MC20-BILINGUAL-PARITY-EVIDENCE.md`.
6. Technical fact and limitation evidence — `MC20-TECHNICAL-FACTS-AND-LIMITATIONS.md`.
7. Acceptance matrix — `MC20-ACCEPTANCE-MATRIX.md` (AC-01..AC-15).
8. Test report — `MC20-TEST-REPORT.md`.
9. Independent audit and remediation log — `MC20-INDEPENDENT-AUDIT.md`.
10. Risk and legal gate register — `MC20-RISK-AND-LEGAL-GATE-REGISTER.md`.
11. Executive report in Spanish — `MC20-EXECUTIVE-REPORT-ES.md`.
12. MC-21 handoff — `MC20-MC21-HANDOFF.md`.
13. Security and isolation evidence — `MC20-SECURITY-AND-ISOLATION-EVIDENCE.md`.

## 2. Verification summary

| Gate | Result |
| --- | --- |
| `npm run test:mc20` | 40/40 PASS (evidence written by the validator) |
| `npm run test:mc20:unit` | 21/21 PASS |
| `npm run test:mc20:e2e` | 35/35 PASS |
| `npm run build` | PASS (96 prerendered routes; 0 catalogue identifiers) |
| `npm run build:landing:preview` | PASS |
| `npm run test:landing:unit` | 45/45 PASS |
| `npm run test:landing:e2e` | 44/44 PASS |
| `npm run test:i18n` / `test:commerce` / `test:seo` | PASS |
| `npm run test:products` / `test:bundles` / `test:commerce-data` | PASS (52/52, 35/35, 1834/1834) |
| `npm run test:financial` | FAIL 1/77 — inherited `FINANCIAL_V18`, preserved |
| MC-18 validator on this branch | 59/60 pre-commit (MC18-56) and 59/60 post-commit (MC18-30) — one branch-scope check depends on commit state |
| `npm run format:check` | PASS |

No test was weakened, skipped or deleted. The MC-18 evidence file was restored byte-identically
after the MC-18 validator run.

## 3. Preserved gates

```text
TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
LICENSING_RIGHTS_GRANTED = false
PRICE_APPROVED = NONE
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
PUBLICATION_AUTHORIZED = false
INDEXATION_AUTHORIZED = false
PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED
GATE-PRIVACY-DPA-DPIA = BLOCKED
```

## 4. Non-regression

- Public application, public routes, SSR entry, public assets, deploy config: unchanged.
- MC-17 design system: byte-identical to `3490c0f`.
- MC-18 landing module: byte-identical to `3490c0f`; its suites pass.
- MC-19 implementation: not inherited and not a dependency.

## 5. Commits

Implementation commit: `7cd8ed9f6982feeaf8f6c6f74592a88f8d1ecc93`. Draft PR: https://github.com/manuelxose/embarcarte/pull/28. This record travels in a follow-up commit so it can name the implementation commit without inventing a self-referential hash.

## 6. Not done (by design)

No merge, no deployment, no publication, no indexation, no price, no stock, no SKU, no order, no
quote, no lead capture, no CMS, no backend, no new dependency, no MC-21 start.
