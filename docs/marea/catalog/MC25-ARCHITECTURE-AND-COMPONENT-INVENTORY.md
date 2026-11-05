# MC-25 architecture and component inventory

## 1. Layering

```
MC-16 / MC-08 contracts (JSON, docs/marea/...)
        │  scripts/build-mc25-governance-data.mjs  (refuses contradictions; --check drift gate)
        ▼
src/app/marea-catalog/data/governance.generated.ts   (generated, Prettier-ignored)
        │  governance-facts.ts  (recursive freeze, private indexes)
        ▼
governance/
  sku-identity.ts        six identity kinds, allow-list resolution
  sku-lifecycle.ts       five states, seven guarded transitions, no persistence
  sku-readiness.ts       ten prerequisites, deterministic decision, fingerprint
  admin-authorization.ts the only action surface, fail-closed
  review-workflow-adapter.ts  the two review actions the UI may offer
        │
        ▼
sections/section-sku-governance.ts   (one component, both locales)
        │
preview/landing/governance-preview.ts → app.routes.ts + app.routes.server.ts
        │
preview/landing/server.ts   (127.0.0.1, Host allow-list, noindex, CSP)
```

No new dependency was added. No production file imports the governance modules;
the production application has no route, no bundle entry and no navigation to it.

## 2. Files added

| Path | Purpose | Lines |
| --- | --- | ---: |
| `scripts/build-mc25-governance-data.mjs` | projection generator + contract-contradiction refusals + `--check` | 427 |
| `src/app/marea-catalog/data/governance.generated.ts` | generated projection (9 families, 26 editions, 26 candidates, 13 gates, 11 provenance digests) | generated |
| `src/app/marea-catalog/governance/governance-facts.ts` | deep-frozen snapshot, private indexes, lookups | 143 |
| `src/app/marea-catalog/governance/sku-identity.ts` | identity kinds and resolution | 256 |
| `src/app/marea-catalog/governance/sku-lifecycle.ts` | states, transitions, guards, derivation | 287 |
| `src/app/marea-catalog/governance/sku-readiness.ts` | prerequisites, decision, matrix, refusal | 522 |
| `src/app/marea-catalog/governance/admin-authorization.ts` | action matrix, refusal codes, non-persistence | 212 |
| `src/app/marea-catalog/governance/review-workflow-adapter.ts` | UI action surface | 30 |
| `src/app/marea-catalog/content/governance.ts` | 88 bilingual pairs | 199 |
| `src/app/marea-catalog/models/governance-identity.ts` | preview routes + isolation facts | 37 |
| `src/app/marea-catalog/sections/section-sku-governance.ts` | admin screen (tables, live region, keyboard) | 724 |
| `preview/landing/governance-preview.ts` | noindex preview host | 106 |
| `scripts/check-mc25-governance.mjs` | 20-check validator | 868 |
| `scripts/check-mc25-governance.test.mjs` | 58 adversarial unit tests | 669 |
| `e2e/catalog/governance.spec.ts` | 15 Playwright + axe cases | 182 |

## 3. Files modified (and why)

| Path | Change | Risk |
| --- | --- | --- |
| `src/app/marea-catalog/data/bundle-upgrade-paths.ts` | F-2/F-15 repair: typed `InclusionLookup`, `inclusionValue`, `validateUpgradePath`, `upgradePathIntegrity`, `allUpgradePathIntegrity`; `evaluateEligibility` updated | The file is one of the six inherited unformatted files; its formatting debt is preserved, not absorbed |
| `preview/landing/app.routes.ts` / `.server.ts` | MC-25 governance routes; bundle routes added to the server table (INH-01) | Adds routes inside the preview only; no public registration |
| `preview/landing/server.ts` | health reports `governancePaths`; banner prints them | diagnostics only |
| `scripts/check-mc24-build.mjs` | component/marker/member/export are argv-overridable; marker replacement fixed (INH-03); MC-24 defaults unchanged | MC-24 invocation is byte-identical in behaviour |
| `scripts/check-mc24-configurator.mjs` | `MC24-13` now proves reproduction at 8a4b5e0 AND repair, instead of asserting the defect is open | The old assertion would misreport the repaired state |
| `scripts/check-mc23-bundles.test.mjs` | replaces the inherited expectation that encoded F-15 with the typed behaviour | Stricter: three states instead of one value |
| `scripts/check-mc20-catalog.mjs` | MC-25 scripts declared in the MC-20 write-scope allow-list | The write-scope control stays authoritative |
| `scripts/test.mjs` | adds `mc25` and `mc25unit` confined stages | additive |
| `package.json` | six MC-25 scripts + Prettier file list | additive |
| `docs/marea/catalog/evidence/*.json` | re-recorded validator runs on this branch | evidence only |

## 4. Reuse, not fork

- MC-24 `configurator-engine.ts`, `configurator-triage.ts`,
  `configurator.generated.ts` are untouched; the four D5 §9.2 outcomes and the
  unreachability of `ELIGIBLE_SELF_INSTALL` are unchanged (MC-24 validator 13/13).
- The deterministic projection generator pattern is reused, not copied loosely:
  each generator owns one contract and one `--check` gate.
- The real Angular build gate is reused through argv, not duplicated.
- `mc20-catalog-guards.mjs` is reused for claim discipline.

## 5. Deliberate non-actions

- No second commerce platform, no parallel catalogue, no new data store.
- No dependency added.
- No public route, sitemap entry, canonical, hreflang or JSON-LD for MAREA.
- No change to the existing EMBARCARTE shop, checkout or account code.
- No reformatting of the six inherited unformatted files.
