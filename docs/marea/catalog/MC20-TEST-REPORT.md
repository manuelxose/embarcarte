# MC-20 — Test report

## 1. Environment

| Item | Value |
| --- | --- |
| Repository | `manuelxose/embarcarte` |
| Branch | `feature/marea-mc20-nav-hub-ais-catalog` |
| Base | `3490c0f` (MC-18 delivery HEAD) |
| OS | Windows, PowerShell 7 |
| Node | v24.18.0 |
| Angular | 21.2.x (`@angular/build` 21.2.29) |
| Playwright | 1.64.1, Chromium desktop |
| Preview | loopback `http://127.0.0.1:4302` |

## 2. Executed commands and real results

| # | Command | Result |
| - | --- | --- |
| 1 | `node scripts/build-mc20-catalog-data.mjs` | PASS — 3 generated files, families=3, editions=6, gates=13, approvedPrices=0 |
| 2 | `node scripts/build-mc20-catalog-data.mjs --check` | PASS — committed projection is up to date |
| 3 | `npm run build` | PASS — production SSR/prerender build, 96 prerendered routes, 0 catalogue identifiers |
| 4 | `npm run build:landing:preview` | PASS — isolated preview build |
| 5 | `npm run test:mc20` | PASS — 40/40; evidence written to `evidence/validator-run.json` (the 36/40 and 37/40 intermediate runs were superseded by the final run) |
| 6 | `npm run test:mc20:unit` | PASS — 21/21 (unit + adversarial) |
| 7 | `npm run test:mc20:e2e` | PASS — 35/35 Playwright (SSR, hydration, facts, parity, keyboard, responsive, axe, isolation, no commerce) |
| 8 | `npm run test:i18n` | PASS — locale/route/translation checks |
| 9 | `npm run test:commerce` | PASS — server-authoritative commerce regressions |
| 10 | `npm run test:seo` | PASS — 101 sitemap URLs, canonical, reciprocal hreflang, JSON-LD, private noindex |
| 11 | `npm run test:products` | PASS — 52/52 |
| 12 | `npm run test:bundles` | PASS — 35/35 |
| 13 | `npm run test:commerce-data` | PASS — 1834/1834 |
| 14 | `npm run test:landing` | 59/60 pre-commit (MC18-56 only) and 59/60 post-commit (MC18-30 only) — one branch-scope check depends on commit state, see §3 |
| 15 | `npm run test:landing:unit` | PASS — 45/45 |
| 16 | `npm run test:landing:e2e` | PASS — 44/44 (includes visual baselines) |
| 17 | `npm run test:financial` | **FAIL — 76/77; V-18 inherited** (see §4) |
| 18 | `npm run format:check` | PASS — generated artefacts included |

## 3. MC-18 validator: 59/60 in both states is branch scope, not a regression

The MC-18 validator contains two checks that bind the **MC-18 change set** to its own base commit:

- **MC18-30** ("no public navigation or corporate UI is changed") diffs `src/` since `3490c0f`
  and allows only `src/app/marea-landing/` and the design system. It also only sees *tracked*
  changes, so during MC-20 implementation (untracked files) it passes; after the MC-20 commit it
  reports `src/app/marea-catalog/`.
- **MC18-56** ("the changed-file scope stays inside MC-18") reads `git status --porcelain` and
  rejects untracked MC-20 paths, so it fails in both states.

Exactly one of these two checks fails at a time: MC18-56 before the commit (untracked MC-20 files) and MC18-30 after it (tracked MC-20 files), so the measured result is 59/60 both pre-commit and post-commit. They are branch-scope invariants,
not a functional regression: every substantive MC-18 invariant (public routes, design system
byte-identity, no canonical/hreflang, preview isolation, landing content, visual baselines) still
passes, and the other 58 checks pass. The MC-18 evidence record was restored after each run:
`docs/marea/landing/evidence/validator-run.json` is byte-identical to the MC-18 delivery state.

The correct applicability boundary is: **the MC-18 validator certifies the MC-18 branch, not a
descendant milestone branch.** MC-20 certifies its own scope with `test:mc20` and does not modify,
weaken or delete the MC-18 checks.

## 4. Inherited failure (preserved, not bypassed)

`npm run test:financial` reports `76 PASS / 1 FAIL`:

```text
FAIL V-18 - No MC-14 execution
      registry row 14 is not PLANNED
```

MC-13's V-18 asserts that MC-14 has not executed. MC-14 was delivered as `PARTIAL` in a later
milestone, so the assertion is stale by construction. It is recorded as `FINANCIAL_V18` open,
as inherited from MC-13/MC-15/MC-16/MC-17/MC-18/MC-19. No attempt was made to edit the registry
to satisfy it.

## 5. Test order and evidence restoration

The landing E2E and landing validator regenerate files under docs/marea/landing/data/ and docs/marea/landing/evidence/. The required order is: run the landing suites first, restore those paths with `git checkout -- docs/marea/landing/data docs/marea/landing/evidence`, then run `npm run test:mc20`. The MC-20 scope check (MC20-32) intentionally rejects any un-restored landing evidence change. This is why an out-of-order run can report MC20-32 as FAIL; the final recorded run follows the order above.

## 6. What the tests prove — and what they do not

Proved: real SSR rendering of six pages, hydration without console error, canonical facts on the
rendered page, ES/EN structural parity, keyboard skip link, no horizontal overflow at four widths,
zero critical/serious axe violations, no form/price/purchase control, loopback host allowlist,
noindex header, no canonical/hreflang/OG/JSON-LD, zero catalogue identifiers in the production
bundle, deterministic projection, content provenance and prohibited-claim rejection.

Not proved: full WCAG 2.2 AA conformance (automated axe is a subset); professional English
translation quality; real hardware compatibility (0 tested rows); real AIS reception; certification
or regulatory conformity. Those remain external or manual requirements.
