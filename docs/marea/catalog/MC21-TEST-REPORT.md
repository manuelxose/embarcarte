# MC-21 — Test report

Base commit `115a1ac` (MC-20 delivery HEAD); implementation commit `f2609a8`; external-audit
remediation commit `f7d3a3a`; branch `feature/marea-mc21-weather-sense-watch-catalog`. All results
below are captain-measured in the unrestricted environment after the remediation, and are not
reproduced from narration.

| Command | Exit | Count | Evidence | Classification |
| --- | --- | --- | --- | --- |
| `node scripts/build-mc20-catalog-data.mjs --check` | 0 | 3 generated files | byte-stable re-gen | PASS |
| `npm run test:mc20` | 0 | 50/50 | `docs/marea/catalog/evidence/validator-run.json` | PASS |
| `npm run test:mc20:unit` | 0 | 39/39 | node:test suite | PASS |
| `npm run test:mc20:e2e` | 0 | 60/60 | Playwright (12 routes, axe clean, SSR/hydration) | PASS |
| `npm run build` | 0 | 96 prerendered routes / 168 browser files | 0 catalogue identifiers in bundle | PASS |
| `npm run test:landing:unit` | 0 | 45/45 | landing regression | PASS |
| `npm run test:design-system` | 0 | 38/38 | MC-17 regression | PASS |
| `npm run format:check` | 0 | — | "All matched files use Prettier code style!" | PASS |
| `npm run test:financial` | 1 | 76/77 | inherited `FINANCIAL_V18` only | FAIL (inherited, unchanged) |

## Independent verification (t5) and review (t7)

- Verifier (t5): PASS, evidence `docs/marea/catalog/evidence/mc21-verifier-run.json`. One
  note recorded: 2 coincidental `ihm` byte hits in `og-image.png` and a Manrope `.woff2` font —
  binary bytes, not catalogue code; no `.js` bundle file contains the marker.
- Reviewer (t7): verdict pass — 0 BLOCKING, 0 MAJOR, 0 MINOR, 0 INFO. Reproduced F-1 closure by
  injecting "Datos de Copernicus, EMODnet y Puertos del Estado" → `MC21-04 FAIL` (49/50, exit 1);
  reverted byte-identically (weather.ts SHA-256 restored).

## Finding F-1 (medium) — closed

Named-provider guard covered only 2 of 8 mandated providers. Repair t6 extended
`NAMED_PROVIDER_MARKERS` to all eight (copernicus, emodnet, aemet, open-meteo, meteogalicia,
puertos del estado, openweather, ihm) with word-boundary matching, plus 8 negative controls.
Re-verified: `test:mc20` 50/50, `test:mc20:unit` 33/33 at that time. F-1 CLOSED.

## External audit (Claude Opus 5.5, static-only) — findings and remediation

The external auditor could not execute commands (its PowerShell was denied), so its result is a
static audit: verdict `NEEDS_REVISION` with 4 MAJOR and 9 MINOR/INFO findings. Two MAJOR findings
were live inaccuracies and were confirmed by the captain against canonical data before repair:

- **XA-01** — bundle inclusion used a first-match lookup, truncating COMPLETE SENSE to
  SENSE-POWER and dropping the conditional WATCH-PLUS from PROTECT. Repaired: one row per
  canonical line; projected COMPLETE SENSE now carries CP-05/06/07/08 and PROTECT WATCH carries
  PR-01 + PR-05; MC20-09 compares the full tuple set.
- **XA-04** — two WATCH statements labelled `VERIFIED_REPO` asserted unimplemented local
  behaviour. Repaired: reclassified `OPEN` and reworded as untested design requirements.
- **XA-02 / XA-03** — guard gaps (currency words, ±, %, IPxx, ordering wording; negation only on
  the first match; missing-locale pair skipped). Repaired with rules and negative controls.
- **XA-09 / XA-10 / XA-11** — eight-provider e2e assertion, shared-string scanning, real WEATHER
  source fields. Repaired.

Post-remediation measured: validator 50/50, unit 39/39 (up from 33/33), e2e 60/60, build 0
catalogue identifiers, format PASS. XA-05..XA-08 and XA-12 are recorded as accepted MINOR
residuals in `MC21-INDEPENDENT-AUDIT.md`; XA-13 is informational.

## Git revisions

- Base: `115a1ac` — verified MC-20 delivery HEAD.
- Implementation: `f2609a8`.
- External-audit remediation: `f7d3a3a`.
- Delivery record: `MC21-DELIVERY-RECORD.md` (commit recorded there).
