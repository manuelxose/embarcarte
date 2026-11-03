# MC-17/36 — Final delivery record

| Field | Value |
|---|---|
| Deliverable | D24 — final delivery record |
| Milestone | MC-17/36 — premium marine design system (internal only) |
| Branch | `feature/marea-mc17-premium-design-system` |
| Base | `feature/marea-mc16-commerce-product-data-model` @ `6d8287c8507038c4f90fd6e35471f78081ca4676` (PR #23 OPEN/DRAFT/MERGEABLE, unmerged) |
| Implementation commit | `3a8d4fd9797db953271e1c5951c68c89cecc9fce` |
| Audit-correction commit | `7cbc99e1a1499f22ddc6053d661983e1d91f841b` |
| Delivery commit | the commit that contains this file (documentation/evidence commit after the follow-up correction) |
| Independent review | `MC17-INDEPENDENT-REVIEW.md` (two rounds; both PARTIAL at the reviewed SHAs) |
| Verdict | `MC17_VERDICT = PARTIAL` |

## 1. Delivered artefacts

| Area | Path | Status |
|---|---|---|
| Tokens (source + generator + generated CSS/TS) | `src/app/marea-design-system/tokens/` | Delivered, deterministic (`--check`) |
| Theme host and contracts | `theme/`, `core/` | Delivered |
| Components (48) + directive (1) | `components/{foundation,structured,commerce,instrument}/` | Delivered, registered in 49-entry registry |
| Presentation adapter and fixtures | `data/` | Delivered, fail-closed, synthetic |
| Internal catalogue (separate Angular project) | `preview/`, `angular.json` project `marea-design-system-catalogue` | Delivered, isolated |
| Playwright suites (catalogue + public site) | `e2e/design-system/`, `playwright.design-system.config.ts` | Delivered |
| Design-system tests | `scripts/check-marea-design-system*.mjs` | Delivered |
| Documentation D01–D24 | `docs/marea/design-system/` | Delivered (D22 owned by the independent reviewer) |
| Datasets (20) | `docs/marea/design-system/data/` | Delivered |
| Evidence | `docs/marea/design-system/evidence/` | Delivered |

## 2. Final gate snapshot (delivery commit)

| Gate | Result |
|---|---|
| `npm run test:design-system` | 38/38 checks (see `evidence/validator-run.json`) |
| `npm run test:design-system:unit` | 27/27 |
| `npm run test:design-system:visual` | 30/30 (jsdom-free catalogue suite; includes the per-family limit assertion) |
| `npm run test:e2e` | 15/15 (inherited public site; internal specs excluded via `testIgnore`) |
| `npm run test:commerce-data` | 1786/1786 |
| `npm run build` | PASS |
| `npx tsc -p tsconfig.app.json --noEmit` / `preview/tsconfig.json` | PASS / PASS |
| `npm run format:check` | PASS |
| `npm audit --omit=dev --audit-level=high` | 0 vulnerabilities |
| `npm run test:financial` | FAIL only on inherited V-18 (unchanged) |

Exact per-run outputs are recorded in the CI/local logs and in `evidence/validator-run.json`; the numbers above are the state at the delivery commit.

## 3. Boundaries preserved

- No public route, sitemap, robot, metadata, canonical/hreflang, checkout, cart, Stripe or customer-account change.
- No MAREA asset copied to `public/`; no proposed route activated; no production CSS side effect.
- No price, stock, purchase, subscription or grant capability; the CTA renders status text only.
- `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`, `MAREA_PUBLIC_USE = NO_GO`, `FINAL_IDENTITY_ADOPTION = BLOCKED`, `PRICE_APPROVED = NONE`, `COMMERCIAL_AVAILABILITY = NOT_FOR_SALE`, `PUBLICATION_AUTHORIZED = false`, `PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED`.
- `MC16_VERDICT = PARTIAL` and every predecessor verdict unchanged. `MC16-FINAL-02` remains OPEN_UNTIL_REVERIFIED; `FINANCIAL_V18` remains inherited-open.
- `MC18_STARTED = false`; no MC-18 implementation.

## 4. Residual gaps carried forward

1. Final independent re-audit of the delivery SHA (the second re-review validated `7cbc99e`; the follow-up correction is committed after it).
2. Minor audit findings still tracked: MC17-IR-06 (visual evidence provenance wording), MC17-IR-07 (aliased enum extraction in validator MC17-13), MC17-IR-08 (governance rows — recorded in this commit), MC17-IR-10 (format coverage of new source directories).
3. Hardware validation BLOCKED; no marine readability, night-vision, AIS transmission or certification claim.
4. No WCAG conformance claim; no assistive-technology laboratory run.
5. No authorised public ES/EN copy; MC-18 remains blocked from publishing.
6. `MC16-FINAL-02` approved-price immutability must be hardened before any future price approval.

## 5. Delivery statement

The internal design system is implemented, documented, tested and isolated. Delivering it does **not** authorise merging, deploying, publishing, selling, adopting the MAREA brand or starting MC-18. The PR remains a draft targeting the MC-16 branch and must not be merged until the final independent re-audit closes the residual findings.
