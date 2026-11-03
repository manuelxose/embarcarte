# MC-17/36 — Final delivery record

| Field | Value |
|---|---|
| Deliverable | D24 — final delivery record |
| Milestone | MC-17/36 — premium marine design system (internal only) |
| Branch | `feature/marea-mc17-premium-design-system` |
| Base | `feature/marea-mc16-commerce-product-data-model` @ `6d8287c8507038c4f90fd6e35471f78081ca4676` (PR #23 OPEN/DRAFT/MERGEABLE, unmerged) |
| Implementation commit | `3a8d4fd9797db953271e1c5951c68c89cecc9fce` |
| Audit-correction commit | `7cbc99e1a1499f22ddc6053d661983e1d91f841b` |
| Delivery candidate (round 2) | `4a9043b98144c0ad4313728642321cd3752f5ccf` |
| Correction commit (round 3) | the commit that contains this file (documentation/evidence reconciliation; SHA filled by the Lead at commit time) |
| Independent review | `MC17-INDEPENDENT-REVIEW.md` (two rounds; both PARTIAL at the reviewed SHAs; third-round verdict on `4a9043b` pending) |
| Verdict | `MC17_VERDICT = PARTIAL` |
| Internal scope | `MC17_INTERNAL_DESIGN_SYSTEM_SCOPE = IMPLEMENTED_AND_TECHNICALLY_VERIFIED_PENDING_FINAL_RE_AUDIT` |

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

## 2. Gate snapshot at the correction round

| Gate | Result |
|---|---|
| `npm run test:design-system` | **PASS, 38/38 checks** (`evidence/validator-run.json`, status PASS) |
| `npm run test:design-system:unit` | **PASS, 27/27** (16 unit + 11 adversarial) |
| `npm run test:design-system:visual` | **PASS, 30/30 at `4a9043b`**; the count is re-measured at the correction commit and rises if a parallel agent adds tests. Includes axe: **0 violations, 36 passes, 0 incomplete in each of all four modes** |
| `npm run test:e2e` | 15/15 inherited public site (internal specs excluded via `testIgnore`) |
| `npm run test:commerce-data` | 1786/1786 |
| `npm run build` | PASS |
| `npx tsc -p tsconfig.app.json --noEmit` / `preview/tsconfig.json` | PASS / PASS |
| `npm run format:check` | PASS on the delivered glob at `4a9043b`. A parallel agent has since expanded the glob to `src/app/marea-design-system`, `preview`, `e2e/design-system`, `playwright.design-system.config.ts` and `scripts/marea-design-system-guards.mjs`; the expanded check is **not yet green** (it reported 47 unformatted files at the time of this reconciliation) and must be re-run after the parallel formatting work |
| `npm audit --omit=dev --audit-level=high` | 0 vulnerabilities |
| `npm run test:financial` | FAIL only on inherited V-18 (unchanged) |

Exact per-run outputs are recorded in the CI/local logs and in
`evidence/{validator-run,axe-summary}.json`; the numbers above are the state at
`4a9043b`. The expanded `format:check` coverage and any added tests must be
re-measured at the correction commit. The visual test count is not frozen: it was
28 at authoring, 29 after the second-round correction and 30 at `4a9043b`.

## 3. Boundaries preserved

- No public route, sitemap, robot, metadata, canonical/hreflang, checkout, cart, Stripe or customer-account change.
- No MAREA asset copied to `public/`; no proposed route activated; no production CSS side effect.
- No price, stock, purchase, subscription or grant capability; the CTA renders status text only.
- `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`, `MAREA_PUBLIC_USE = NO_GO`, `FINAL_IDENTITY_ADOPTION = BLOCKED`, `PRICE_APPROVED = NONE`, `COMMERCIAL_AVAILABILITY = NOT_FOR_SALE`, `PUBLICATION_AUTHORIZED = false`, `PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED`.
- `MC16_VERDICT = PARTIAL` and every predecessor verdict unchanged. `MC16-FINAL-02` remains OPEN_UNTIL_REVERIFIED; `FINANCIAL_V18` remains inherited-open.
- `MC18_STARTED = false`; no MC-18 implementation.

## 4. Residual gaps carried forward

1. **Third-round independent review record pending.** The two recorded rounds are
   both PARTIAL; the final verdict on the delivery/correction SHA must be written by
   the independent reviewer. No final PASS is claimed here.
2. Minor findings still tracked at the correction commit: MC17-IR-05 (validator
   `MC17-08` preview-import scan), MC17-IR-06 (visual evidence provenance — rewritten
   in this correction; acceptance comparison must run without `--update-snapshots`),
   MC17-IR-07 (aliased enum extraction in validator `MC17-13`), MC17-IR-10 (expanded
   `format:check` coverage; re-measure at the correction commit). MC17-IR-03 and
   MC17-CR-02 are repaired in this documentation round.
3. Hardware validation BLOCKED; no marine readability, night-vision, AIS transmission
   or certification claim.
4. No WCAG conformance claim; no assistive-technology laboratory run.
5. No authorised public ES/EN copy; MC-18 remains blocked from publishing.
6. `MC16-FINAL-02` approved-price immutability must be hardened before any future
   price approval; `FINANCIAL_V18` remains inherited-open.

## 5. Delivery statement

The internal design system is implemented, documented, tested and isolated. Delivering it does **not** authorise merging, deploying, publishing, selling, adopting the MAREA brand or starting MC-18. The PR remains a draft targeting the MC-16 branch and must not be merged until the final independent re-audit closes the residual findings.
