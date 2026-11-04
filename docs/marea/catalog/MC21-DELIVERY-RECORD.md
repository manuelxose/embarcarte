# MC-21 — Delivery record

| Field | Value |
| --- | --- |
| Milestone | MC-21/36 — product catalogue batch 2: WEATHER, SENSE, WATCH (ES/EN), internal preview |
| Branch | `feature/marea-mc21-weather-sense-watch-catalog` |
| Base commit | `115a1ac` — verified MC-20 delivery HEAD (MC-19 is not a dependency) |
| Implementation commit | `f2609a8` — `feat(mc21): extend internal catalogue to WEATHER, SENSE and WATCH` |
| Remediation commit | `f7d3a3a` — `fix(mc21): close external-audit findings XA-01..XA-04, XA-09..XA-11` |
| Residual remediation | included in the documentation commit that carries this record (re-audit findings R-1..R-5) |
| Delivery type | DRAFT pull request [#29](https://github.com/manuelxose/embarcarte/pull/29), stacked on `feature/marea-mc20-nav-hub-ais-catalog`; no merge, no deployment |
| `MC21_INTERNAL_IMPLEMENTATION` | `PASS_INTERNAL_SCOPE` |
| `MC21_VERDICT` | `PARTIAL` — external authorisations outstanding |
| MC-22 | `NOT_STARTED` |

## 1. Delivered

1. Scope contract — `MC21-SCOPE-CONTRACT.md`.
2. Dependency DAG and reuse map — `MC21-DEPENDENCY-DAG.md`.
3. Canonical product mapping — `MC21-CANONICAL-PRODUCT-MAPPING.md` + generated datasets.
4. Architecture and component inventory — `MC21-ARCHITECTURE-AND-COMPONENT-INVENTORY.md`.
5. Bilingual parity evidence — `MC21-BILINGUAL-PARITY-EVIDENCE.md`.
6. Technical facts and limitations — `MC21-TECHNICAL-FACTS-AND-LIMITATIONS.md`.
7. Acceptance matrix (AC-01..AC-27) — `MC21-ACCEPTANCE-MATRIX.md`.
8. Test report — `MC21-TEST-REPORT.md`; test strategy — `MC21-TEST-STRATEGY.md`.
9. Independent audit and remediation log — `MC21-INDEPENDENT-AUDIT.md` (internal F-1, external
   XA-01..XA-13, re-audit R-1..R-5; 0 BLOCKING/MAJOR open).
10. Risk and legal-gate register — `MC21-RISK-AND-LEGAL-GATE-REGISTER.md`.
11. Security and isolation evidence — `MC21-SECURITY-AND-ISOLATION-EVIDENCE.md`.
12. Agent execution and model routing — `MC21-AGENT-EXECUTION-AND-MODEL-ROUTING.md`.
13. Executive report in Spanish — `MC21-EXECUTIVE-REPORT-ES.md`.
14. MC-22 handoff inputs — `MC21-MC22-HANDOFF.md`.
15. Implementation: six-family internal catalogue under `src/app/marea-catalog/` with 12 loopback
    preview routes; extended generator/validator/guards; 39-case adversarial suite; 60-case E2E.
16. Governance: registry row 21 and decisions D-083..D-089.

## 2. Verification summary (captain-measured after remediation)

| Gate | Result |
| --- | --- |
| `node scripts/build-mc20-catalog-data.mjs --check` | PASS — byte-stable, 3 generated files |
| `npm run test:mc20` | 50/50 PASS |
| `npm run test:mc20:unit` | 39/39 PASS |
| `npm run test:mc20:e2e` | 60/60 PASS (12 routes, axe clean, SSR/hydration) |
| `npm run build` | PASS — 96 prerendered routes, 168 browser files, 0 catalogue identifiers |
| `npm run test:landing:unit` | 45/45 PASS |
| `npm run test:design-system` | 38/38 PASS |
| `npm run format:check` | PASS |
| `npm run test:financial` | FAIL 76/77 — inherited `FINANCIAL_V18`, preserved |
| Adversarial injection (`Precio 149 euros`) | rejected — MC20-15 and MC21-05 fail, 48/50; reverted byte-identically |

No test was weakened, skipped or deleted to obtain a green result.

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

- Public application, routes, SSR entry, assets, sitemap, robots, deploy config: unchanged.
- MC-17 design system: byte-identical; validator 38/38.
- MC-18 landing: byte-identical; suite 45/45.
- MC-19: not inherited and not a dependency.

## 5. Commits and PR

- `f2609a8` — implementation.
- `f7d3a3a` — external-audit remediation (audited candidate).
- Draft PR [#29](https://github.com/manuelxose/embarcarte/pull/29), base `feature/marea-mc20-nav-hub-ais-catalog`.
- This record travels in a documentation commit so it can name the audited commits without inventing
  a self-referential hash; the documentation commit is the branch head at delivery.

## 6. Not done (by design)

No merge, no deployment, no publication, no indexation, no price, no stock, no SKU, no order, no
quote, no lead capture, no CMS, no backend, no new dependency, no data provider contracted, and no
MC-22 start. Claude Opus 5.5 was retired from use during the milestone; the external ceiling is
Sonnet 5.5 (D-088).
