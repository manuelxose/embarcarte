# MC-21 — Test strategy

## 1. Deterministic validator checks (`scripts/check-mc20-catalog.mjs`, 50 checks)

- Projection drift → `build-mc20-catalog-data.mjs --check` (byte compare) — MC20-13/33.
- Identity/readiness/edition/bundle drift → field-by-field comparison to MC-16 JSON — MC20-01/02/03/04/09.
- Provenance → every block has evidenceClass + existing source file — MC20-12, MC21-03.
- Claim safety → `catalogClaimProblems` over 1658 bilingual strings — MC20-15.
- Parity → `bilingualTextProblems` + `englishClusterProblem` — MC20-16/17/18, MC21-02.
- WEATHER provenance → `providerNameProblems` + `providerRightsGranted=false` notice + no
  forecast-accuracy claim — MC21-04.
- SENSE/WATCH limitations → status codes rendered — MC21-06/07.
- Gates → 10 governance gates verbatim — MC21-08.
- Isolation → `findForbiddenReach` + `scopeProblems` + bundle grep — MC20-28/29/30/32/35, MC21-09.

## 2. Browser tests (`npm run test:mc20:e2e`, 60 checks)

- SSR: 12 routes 200 + `X-Robots-Tag: noindex, nofollow, noarchive` + no canonical/hreflang/OG/JSON-LD.
- Isolation: `/marea/{nav,hub,ais,sense,watch,weather}` and `/en/...` → 404; health lists 12 paths.
- Hydration: real page renders, console error-free.
- Facts: WEATHER no provider name; SENSE `NOT_MEASURED`; WATCH no guaranteed alert; footer gates.
- Parity: ES/EN identical section hosts (11) + same `h1` + ≤2 paragraph delta.
- Keyboard/responsive: skip-link focus; no overflow 320/390/768/1440; axe 0 critical/serious.

## 3. Adversarial/negative cases (`npm run test:mc20:unit`, 33 checks)

- Eight mandated provider names injected → rejected (F-1 negative controls).
- Positive provider-name/forecast-accuracy/official-status strings → rejected.
- Positive measurement-accuracy / ingress / NMEA-2000-certified / guaranteed-alert / certified-distress
  strings → rejected.
- Negated controls (e.g. "no guaranteed alert delivery") accepted — clause-local negation.
- Substring false-positive guard: `xihmx`/`aemetic` not matched; standalone `IHM`/`AEMET` matched.
- Out-of-scope paths rejected by `scopeProblems`; unknown status codes fail closed.

## 4. Non-regression

- `npm run test:landing:unit` 45/45 (MC-18 landing).
- Design-system and landing byte-identical to base (MC20-21/22 static git-diff assertions inside the
  50/50 validator run); design-system visual suite not re-run (no design-system change).
- `npm run test:financial` remains FAIL 76/77 (`FINANCIAL_V18`), preserved not bypassed.
