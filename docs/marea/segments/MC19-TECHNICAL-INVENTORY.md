# MC-19/36 — Technical implementation inventory

| Field        | Value                                                                     |
| ------------ | ------------------------------------------------------------------------- |
| Deliverable  | MC-19 technical inventory                                                 |
| Status       | `IMPLEMENTED_INTERNAL_PREVIEW_ONLY`                                       |
| Baseline     | `ba63baa0e529ab9cb482fd929632d359fec1d328`                                 |
| Publication  | `NOT_AUTHORIZED`                                                          |
| Dataset      | `docs/marea/segments/data/mc19-implementation-inventory.json` (generated) |

## 1. Route table (internal preview only)

| Segment         | Locale | Preview path                        | Render mode | Public route |
| --------------- | ------ | ----------------------------------- | ----------- | ------------ |
| `professionals` | ES     | `/internal/segments/professionals`  | Server (SSR)| none         |
| `professionals` | EN     | `/en/internal/segments/professionals` | Server    | none         |
| `installers`    | ES     | `/internal/segments/installers`     | Server (SSR)| none         |
| `installers`    | EN     | `/en/internal/segments/installers`  | Server      | none         |
| `shipowners`    | ES     | `/internal/segments/shipowners`     | Server (SSR)| none         |
| `shipowners`    | EN     | `/en/internal/segments/shipowners`  | Server      | none         |

No route is prerendered. `preview/landing/app.routes.server.ts` derives every route from
`SEGMENT_PREVIEW_ROUTES` and renders all of them with `RenderMode.Server`; `**` returns 404.

## 2. Source tree

| Path                                                     | Role                                                                 |
| -------------------------------------------------------- | -------------------------------------------------------------------- |
| `src/app/marea-segments/segment-page.ts`                  | THE page component: theme host, classification banner, header, cross-audience nav, section nav, eight sections, footer |
| `src/app/marea-segments/models/segment-identity.ts`       | three identities, preview routes, reserved public references, type guard, collision model |
| `src/app/marea-segments/content/content.types.ts`         | bilingual content contract, eight section ids, fixed literals        |
| `src/app/marea-segments/content/evidence.ts`              | evidence registry (18 sources) checked for existence by the validator |
| `src/app/marea-segments/content/blocks.ts`                | the only block constructor (fixes publication/approval literals)     |
| `src/app/marea-segments/content/factories.ts`             | shared factories for scope items, use cases, families, capabilities, steps, references |
| `src/app/marea-segments/content/shared.ts`                | shell, navigation, footer, readiness labels and UI labels            |
| `src/app/marea-segments/content/professionals.ts`         | audience copy (104 blocks)                                           |
| `src/app/marea-segments/content/installers.ts`            | audience copy (104 blocks)                                           |
| `src/app/marea-segments/content/shipowners.ts`            | audience copy (105 blocks)                                           |
| `src/app/marea-segments/content/index.ts`                 | the ONE content source (`SEGMENT_CONTENT`)                           |
| `src/app/marea-segments/data/segments-domain.ts`          | canonical family projection, derived readiness, section heading ids  |
| `src/app/marea-segments/components/segment-heading.ts`    | heading element owning the id used by `aria-labelledby`              |
| `src/app/marea-segments/sections/section-*.ts`            | eight sections: hero, scope, families, capabilities, ecosystem, readiness, documentation, closing |
| `preview/landing/segment-preview.ts`                      | preview host: noindex, lang, description, no canonical/hreflang/social/JSON-LD |
| `preview/landing/app.routes.ts`                           | preview routes derived from the identity model                       |
| `preview/landing/app.routes.server.ts`                    | SSR-only route modes                                                 |
| `preview/landing/server.ts`                               | loopback server, Host allowlist, security headers, health endpoint   |
| `preview/landing/tsconfig.json`                           | includes `src/app/marea-segments/**`                                 |

## 3. MC-17 design-system reuse (no fork)

The generated inventory records 15 reused MC-17 modules. The validator requires at least:
`marea-theme`, `marea-text`, `marea-notice`, `marea-responsive-nav`, `marea-family-card`,
`marea-readiness-panel`, `marea-commercial-cta`, `marea-definition-list`, `marea-button`.
It also rejects a duplicate selector and any `--marea-*` token definition inside the MC-19 module.
`git diff ba63baa..HEAD -- src/app/marea-design-system` is empty.

MC-18 components reused by import, not copied: `MareaLandingSectionFrame`,
`MareaLandingSheetIndex`. The MC-18 landing source is unchanged.

## 4. Content facts

| Metric                             | Value |
| ---------------------------------- | ----: |
| Audience identities                |     3 |
| Pages (identity × locale)          |     6 |
| Sections per page                  |     8 |
| Page content blocks (per locale)   | 313   |
| Shared blocks (per locale)         |  41   |
| Resolved bilingual records         | 708   |
| Evidence sources                   |  18   |
| Capabilities per page              |   5   |
| Use cases per page                 |   3   |
| Documentation references per page  |   5   |
| Family references per page         | 6 / 6 / 7 |

## 5. Tooling

| Path                                        | Role                                                    |
| ------------------------------------------- | ------------------------------------------------------- |
| `scripts/mc19-segments-projection.mjs`      | pure projection of the content source                   |
| `scripts/build-mc19-segments-data.mjs`      | writes/`--check`s the two deterministic datasets        |
| `scripts/check-mc19-implementation.mjs`     | 17-check validator, writes run evidence                 |
| `scripts/check-mc19-implementation.test.mjs`| 42 unit/adversarial tests of the guards                 |
| `scripts/check-mc19-scope.mjs`              | v1 proposal guard, supersession-aware (historical preservation) |
| `e2e/segments/`                             | SSR/hydration, accessibility, content, responsive, isolation |
| `playwright.segments.config.ts`             | isolated preview E2E configuration                      |

## 6. Commands

```text
npm run build:mc19:data      # write datasets
npm run check:mc19:data      # fail on stale datasets
npm run test:mc19            # deterministic validator (17 checks)
npm run test:mc19:unit       # unit + adversarial (42 tests)
npm run test:mc19:e2e        # build preview + Playwright (22 tests)
npm run build:landing:preview
```
