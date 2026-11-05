# Verified gates — exact commands and coverage

Executed from the repository root on branch `feature/marea-mc01-agent-foundation`
(base `092ae74`). Source: `AGENTS.md` "Comandos verificados (MC-01)" and `package.json`.
`npm test` is NOT defined; do not run or report it.

| Command | Covers | Notes |
|---|---|---|
| `npm run build` | Angular 21 SSR + prerender build, templates, route/server-render config, budgets | Production configuration by default; fails on budget error (1MB initial, 8kB component style) |
| `npm run test:i18n` | `scripts/check-i18n.mjs`: ES/EN dictionary parity and `LOCALIZED_ROUTES` consistency | Run after any copy or route change |
| `npm run test:commerce` | `scripts/check-commerce.mjs`: server-authoritative prices/stock/orders, checkout integrity | Run after any commerce or product-data change |
| `npm run test:seo` | `scripts/check-seo.mjs`: metadata, canonical, hreflang reciprocity, sitemap | Verify unpublished translations are not advertised |
| `npm run test:backup` | `scripts/check-backup.mjs`: backup/restore verification | Requires a writable local data directory; see `docs/operations/BACKUP-RESTORE.md` |
| `npm run test:performance` | `scripts/check-performance.mjs`: lab LCP/CLS/long-task measurement on a real Chromium build; writes `artifacts/performance/m04-performance.json` | Measurement only — no thresholds, not a CI gate (per `AGENTS.md` updated in MC-01); compare runs manually against `docs/quality/M04-PERFORMANCE-MEASUREMENTS.md` |
| `npm run test:e2e` | `playwright test` against `scripts/e2e-server.mjs` on 127.0.0.1:4310 | Requires Playwright Chromium installed; 1 worker; HTML report in `artifacts/` |
| `npm run format:check` | Prettier check on e2e/scripts/config files | Local Windows may report CRLF vs Prettier `lf`; record environment cause, not an app-code fix |
| `npx --yes skills --version` | skills CLI presence only | Not a project gate |

## Accessibility and visual evidence

- The `e2e/` suite currently contains `accessibility.spec.ts`, `responsive.spec.ts`, `commerce.spec.ts`,
  `failure.spec.ts` and `public.spec.ts`, plus `helpers.ts`. `accessibility.spec.ts` uses axe via
  `@axe-core/playwright` (`^4.11.0`). Read the spec bodies before asserting what each one covers.
- Screenshots/traces are written to `artifacts/` on failure (`playwright.config.ts`); attach relevant
  evidence paths to the verdict instead of pasting images into documentation.

## Evidence rules

- Paste the command, its exit code and the meaningful tail of output, not a paraphrase.
- A pre-existing failure is recorded as pre-existing with evidence; a new failure blocks the verdict.
- If Chromium, credentials, network or another external dependency is missing, the criterion is
  BLOCKED with the exact cause and the next action — never PASS by assumption.
