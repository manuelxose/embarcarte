# MC-17/36 — Final delivery record

| Field | Value |
|---|---|
| Deliverable | D24 — final delivery record |
| Milestone | MC-17/36 — premium marine design system (internal only) |
| Branch | `feature/marea-mc17-premium-design-system` |
| Base | `feature/marea-mc16-commerce-product-data-model` @ `6d8287c8507038c4f90fd6e35471f78081ca4676` (PR #23 OPEN/DRAFT/MERGEABLE, unmerged) |
| Implementation commit | `3a8d4fd9797db953271e1c5951c68c89cecc9fce` |
| Audit-correction commit | `7cbc99e1a1499f22ddc6053d661983e1d91f841b` |
| Delivery candidate (round 2) | `4a9043b98144c0ad4313728642321cd3752f5ccf` (Stage A rejected: NEEDS_REVISION) |
| Correction commit (round 3) | `f2c9ec2ea07f90154cbb91cae36e4a7681b5e27d` |
| Independent review | `MC17-INDEPENDENT-REVIEW.md` (three rounds; rounds 1–2 PARTIAL, round 3 PASS_INTERNAL on `f2c9ec2`) |
| Verdict | `MC17_VERDICT = PARTIAL` (external gates not granted) |
| Internal scope | `MC17_INTERNAL_DESIGN_SYSTEM_SCOPE = PASS_INTERNAL_DESIGN_SYSTEM_SCOPE` |

## 1. Delivered artefacts

| Area | Path | Status |
|---|---|---|
| Tokens (source + generator + generated CSS/TS) | `src/app/marea-design-system/tokens/` | Delivered, deterministic (`--check`) |
| Theme host and contracts | `theme/`, `core/` | Delivered |
| Components (48) + directive (1) | `components/{foundation,structured,commerce,instrument}/` | Delivered, registered in 49-entry registry |
| Presentation adapter and fixtures | `data/` | Delivered, fail-closed, synthetic |
| Internal catalogue (separate Angular project) | `preview/`, `angular.json` project `marea-design-system-catalogue` | Delivered, isolated |
| Playwright suites (catalogue + public site) | `e2e/design-system/`, `playwright.design-system.config.ts` | Delivered |
| Design-system tests | `scripts/check-marea-design-system*.mjs` + `scripts/marea-design-system-guards.mjs` | Delivered |
| Documentation D01–D24 | `docs/marea/design-system/` | Delivered (D22 owned by the independent reviewer) |
| Datasets (20) | `docs/marea/design-system/data/` | Delivered |
| Evidence | `docs/marea/design-system/evidence/` | Delivered |

## 2. Final gate snapshot at `f2c9ec2`

| Gate | Result |
|---|---|
| `npm run test:design-system` | **PASS, 38/38 checks** (`evidence/validator-run.json`, status PASS) |
| `npm run test:design-system:unit` | **PASS, 41/41** (unit + adversarial, including the isolation, variant and focus guards) |
| `npm run test:design-system:visual` | **PASS, 37/37 at `f2c9ec2`** without `--update-snapshots`; axe **0 violations, 36 passes, 0 incomplete in all four modes** (automated only, no conformance claim) |
| `npm run test:e2e` | 15/15 inherited public site (internal specs excluded via `testIgnore`) |
| `npm run test:commerce-data` | 1786/1786 |
| `npm run build` | PASS — 96 routes, 168 files / 3,032,021 bytes; production bundle 0 design-system/catalogue identifiers; production styles exactly `["src/styles.scss"]` |
| `npx tsc -p tsconfig.app.json --noEmit` / `preview/tsconfig.json` | PASS / PASS |
| `npm run format:check` | **PASS with expanded coverage**: `e2e/design-system`, `src/app/marea-design-system`, `preview`, `playwright.design-system.config.ts` and the shared guard module. Machine-generated `*.generated.ts` files are explicitly excluded from Prettier and validated by their deterministic generators; a unit test asserts both facts |
| Deterministic generators (`--check`) | tokens 262 rows / 4 modes; 9 families / 26 editions / 6 bundles; 49 components; 35 legacy watched files — all current |
| `npm audit --omit=dev --audit-level=high` | 0 vulnerabilities |
| `npm run test:financial` | FAIL only on inherited V-18 (76/77; 28/29 unit, unchanged) |
| Production bundle scan | 0 `marea-design-system` / catalogue identifiers |
| Public surface | 35 watched legacy files and 15 public assets byte-identical to MC-16; no route/sitemap/metadata change |

The design-system Playwright count is 37 at `f2c9ec2` (30 at `4a9043b`): eight
per-family/adversarial commerce tests replaced one body-wide assertion. Full
per-run outputs are recorded in `evidence/validator-run.json`,
`evidence/axe-summary.json` and `test-results/design-system/`.

## 3. Boundaries preserved

- No public route, sitemap, robot, metadata, canonical/hreflang, checkout, cart, Stripe or customer-account change.
- No MAREA asset copied to `public/`; no proposed route activated; no production CSS side effect.
- No price, stock, purchase, subscription or grant capability; the CTA renders status text only.
- `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`, `MAREA_PUBLIC_USE = NO_GO`, `FINAL_IDENTITY_ADOPTION = BLOCKED`, `PRICE_APPROVED = NONE`, `COMMERCIAL_AVAILABILITY = NOT_FOR_SALE`, `PUBLICATION_AUTHORIZED = false`, `PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED`.
- `MC16_VERDICT = PARTIAL` and every predecessor verdict unchanged. `MC16-FINAL-02` remains OPEN_UNTIL_REVERIFIED; `FINANCIAL_V18` remains inherited-open.
- `MC18_STARTED = false`; no MC-18 implementation.

## 4. Residual gaps carried forward

1. External authorisations remain closed: trademark clearance, brand adoption,
   hardware validation, price/stock approval and public publication. They keep
   `MC17_VERDICT = PARTIAL` even though the internal scope is verified.
2. Hardware validation BLOCKED; no marine readability, night-vision, AIS
   transmission or certification claim.
3. No WCAG conformance claim; no assistive-technology laboratory run. Axe is
   automated evidence only.
4. No authorised public ES/EN copy; MC-18 remains blocked from publishing.
5. `MC16-FINAL-02` approved-price immutability must be hardened before any future
   price approval; `FINANCIAL_V18` remains inherited-open.
6. Visual baselines are Chromium/Windows-specific; the two refreshed 320x812
   instrument captures are documented in `visual-regression-evidence.json`.

## 5. Delivery statement

The internal design system is implemented, documented, independently reviewed and
isolated. Delivering it does **not** authorise merging, deploying, publishing,
selling, adopting the MAREA brand or starting MC-18. The PR remains a draft
targeting the MC-16 branch; no merge, deployment, publication or sale is
authorised by this record.
