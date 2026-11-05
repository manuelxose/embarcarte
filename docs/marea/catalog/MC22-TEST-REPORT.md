# MC-22 — Test report (independent verification)

| Field | Value |
| --- | --- |
| Milestone | MC-22/36 — product catalogue batch 3 (DISPLAY, PILOT, FLEET) ES/EN |
| Kind | Independent verification (verifier ≠ implementer of catalogue/content/validator/tests) |
| Verifier | `architecture` member (independent; author of t1 scope only, not of t3/t4/t5) |
| Branch | `feature/marea-mc22-display-pilot-fleet-catalog` |
| HEAD | `1dc9aa0d85d418709cfaccd41fe1f2335462c672` |
| Verdict | **PASS** (internal catalogue scope) — 1 inherited failure (`test:financial` V-18) disclosed, not concealed |
| Machine-readable record | `docs/marea/catalog/evidence/mc22-verifier-run.json` |
| Validator evidence | `docs/marea/catalog/evidence/validator-run.json` |

## 1. Execution summary

Every command below was executed by the verifier itself in the real repository on the MC-22 branch. No result was copied from another agent's narration or a task description.

| # | Command | Exit | Result |
| - | --- | --- | --- |
| 1 | `node scripts/build-mc20-catalog-data.mjs --check` | 0 | "MC-20 catalogue data is up to date (3 generated files)" — byte-stable |
| 2 | `npm run test:mc22` | 0 | **57/57 PASS (pre-repair figure)** — after the r1 deduplication the current figure is **56/56** (see §10.2) |
| 3 | `npm run test:mc22:unit` | 0 | **55 tests, 55 pass (pre-repair figure)** — current figure is **66/66** after r1+r2 (see §10.2) |
| 4 | `npm run test:mc22:e2e` | 0 | **84 passed (2.2m)** across 18 preview routes |
| 5 | `npm run build` | 0 | "Application bundle generation complete. [18.383 s]. Prerendered 96 static routes." |
| 6 | `npm run test:landing:unit` | 0 | **45/45 pass** |
| 7 | `npm run test:design-system` | 0 | **38/38 passed, 0 failed** |
| 8 | `npm run test:i18n` | 0 | server-rendering + i18n foundation checks passed |
| 9 | `npm run test:seo` | 0 | **101 sitemap URLs**; canonical/hreflang/JSON-LD/noindex passed |
| 10 | `npm run format:check` | 0 | "All matched files use Prettier code style!" |
| 11 | `npm run test:financial` | **1** | **76/77** — `FAIL V-18 — No MC-14 execution` (**INHERITED**, pre-existing, unchanged by MC-22) |

## 2. Generator determinism

`node scripts/build-mc20-catalog-data.mjs --check` exits 0 and reports the three generated files
(`catalog.generated.ts`, `catalog-projection.json`, `catalog-canonical-mapping.json`) are up to date.
`git status --short` before and after the whole run shows the identical modified/untracked set
(the MC-22 implementation working tree), so the generator is byte-stable and the verifier run
introduced no drift to tracked sources.

## 3. Canonical projection (independently read from the bytes on disk)

Read `docs/marea/catalog/data/catalog-projection.json` directly:

- **9 families** in page order `NAV, HUB, AIS, SENSE, WATCH, WEATHER, DISPLAY, PILOT, FLEET`.
- **26 editions**: NAV 2, HUB 2, AIS 2, SENSE 8, WATCH 2, WEATHER 2, DISPLAY 2, PILOT 3, FLEET 3.
- **6 bundles** referencing scope, **11 readiness dimensions**, **13 release gates** (`releaseGatesClosed: 0`).
- `approvedPrices: 0`, `merchantableEditions: 0`, `merchantSkuCodes: 0`, `publicAuthorizedClaims: 0`,
  `verifiedStockRows: 0`, `testedCompatibilityRows: 0`, `publicRoutesRegistered: 0`.

## 4. Governance gates

The ten governance gates appear verbatim in the projection and are unchanged:

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

No gate is CLOSED. The canonical MC-14 register (`release-evidence-gates.json`) carries 13 release gates,
`gatesClosed: 0` (12 BLOCKED + 1 EVIDENCE_REQUIRED). `PILOT_SAFETY_GATE = BLOCKED` is preserved.

## 5. Preview routes and publication boundary

- `CATALOG_IDENTITIES` in `src/app/marea-catalog/models/catalog-identity.ts` now holds 9 identities
  (DISPLAY/PILOT/FLEET added), each with `publicationAuthorized: false`, `indexationAuthorized: false`,
  `routeStatus: PROPOSED_INTERNAL_NOT_DEPLOYABLE`, `leadCapture: false`.
- `CATALOG_PREVIEW_ROUTES` auto-derives **18 Server-rendered routes** (9 families × ES/EN), all under
  `internal/catalog/{slug}` and `en/internal/catalog/{slug}`.
- The e2e suite exercised all 18 routes; the health endpoint asserts 18 paths; public-route 404 was
  asserted for `display`, `pilot` and `fleet` (`/marea/*` remains `PROPOSED_INTERNAL_NOT_DEPLOYABLE`).

## 6. Public isolation (re-proven from the real production build)

- `grep` over `dist/embarcarte` for `internal/catalog`, `marea-catalog`, `mareaFamilyDisplay`,
  `DISPLAY-LARGE-CONDITIONAL`, `SIZE_NOT_FROZEN`, `PILOT_SAFETY_GATE`, `NO_SLA_ESTABLISHED` → **0 matches**.
- Validator MC20-29/30: 86 production modules scanned, 0 reach the catalogue/preview/landing;
  168 production bundle files carry 0 catalogue identifiers.
- `grep` over `src/app` for `marea-catalog` returns matches **only inside `src/app/marea-catalog/**`**
  — the public application (`app.routes.ts`, `app.routes.server.ts`, `locale-routes.ts`, `public/`) is untouched.
- Production build prerenders the same **96 static routes** as the MC-17/MC-21 baseline; the public
  sitemap (101 URLs) and robots files are unchanged.

## 7. Content spot-check (not just counters)

The three batch-3 content files were read in full. Every technical, safety and commercial statement is
negated to the canonical `NOT_*`/`BLOCKED`/`PROHIBITED` status — **no invented technical fact, autonomy,
SLA/availability guarantee or customer deployment was found**.

- **DISPLAY** (`src/app/marea-catalog/content/display.ts`): `SIZE_NOT_FROZEN`, `HARDWARE_NOT_SELECTED`,
  `BOM_NOT_ESTABLISHED`, `measuredPerformance = false`, `pilotControlAuthority = false`. Publishes no
  dimension, resolution, brightness, IP rating or power figure; "7-inch" is explicitly labelled a
  working commercial label, not a measured dimension. Two editions; `DISPLAY-LARGE-CONDITIONAL` never
  selectable as an available size.
- **PILOT** (`src/app/marea-catalog/content/pilot.ts`): `PILOT_SAFETY_GATE = BLOCKED`, sea trials
  `NOT_PERFORMED`, E-stop / motor-isolation / rudder-feedback evidence `NOT_FOUND`, remote helm control
  `PROHIBITED`. Supervised-only, manual takeover always possible, never autonomous, never a certified
  autopilot, no safety-reliability or regulatory-approval claim. `PILOT-PRO` is an installation package,
  never a SKU/checkout item.
- **FLEET** (`src/app/marea-catalog/content/fleet.ts`): `multiTenantProductionService = false`
  (`NOT_IMPLEMENTED`), `slaEstablished = false` (`NO_SLA_ESTABLISHED`), `telemetryReadOnly = true`,
  `remoteControlPath = false`, `defaultRole = NO_ACCESS`. No hardware included, no security
  certification, no customer deployment, no availability/monitoring guarantee, no unlimited plan.

ES/EN parity for the three families is asserted by the validator (MC20-16/17, MC21-02) and by the e2e
bilingual-parity tests (`display`/`pilot`/`fleet` ES and EN render the same section structure — passed).

## 8. Inherited failure (disclosed, not concealed)

`npm run test:financial` → **exit 1**, `77 checks - 76 PASS / 1 FAIL`, `FAIL V-18 - No MC-14 execution`
(`registry row 14 is not PLANNED`). This is the pre-existing `FINANCIAL_V18` debt inherited unchanged
from MC-21 (and earlier); it is unrelated to the catalogue and is reported here as **FAIL (inherited)**.

## 9. Verdict

**PASS** for the MC-22 internal catalogue scope. All MC-22 gates are green, the projection and content
are honest and canonical-bound, the 18 preview routes render with bilingual parity, and the public,
commercial and legal boundaries are intact. One inherited financial-gate failure (V-18) remains and is
recorded honestly; it does not block MC-22 and is not caused by MC-22.

## 10. Re-verification r1 (post-repair)

Independent re-verification after repair round 1 (verifier ≠ repairer). Machine-readable record:
`docs/marea/catalog/evidence/mc22-reverification-r1.json`.

### 10.1 Adversarial bypass matrix (executed against the repaired guard module)

A temporary node script **outside the repository** imported `scripts/mc20-catalog-guards.mjs` and called
`catalogClaimProblems` on the 15 previously-bypassing inputs and the 6 honest disclaimers. Result:
**15/15 rejected, 6/6 allowed, 0 mismatches, exit 0**.

| Input | Verdict | Flagged rule |
| --- | --- | --- |
| Sin embargo funciona sin supervisión. | REJECTED | pilot-unsupervised |
| Sin duda opera sin supervisión. | REJECTED | pilot-unsupervised |
| Opera sin fallos sin supervisión. | REJECTED | pilot-unsupervised |
| Works without issues unsupervised. | REJECTED | pilot-unsupervised |
| No es solo asistencia: funciona sin supervisión. | REJECTED | pilot-unsupervised |
| No es un autopiloto — opera sin supervisión. | REJECTED | pilot-unsupervised |
| No solo ayuda sino que funciona sin supervisión. | REJECTED | pilot-unsupervised |
| Las pruebas de mar sin fallos fueron completadas. | REJECTED | sea-trial |
| Sea trials with no issues completed. | REJECTED | sea-trial |
| Pantalla sin marco de 7 pulgadas. | REJECTED | display-dimension |
| Resolución sin pérdida 1920x1080. | REJECTED | display-resolution |
| Es autónomo. | REJECTED | pilot-autonomous-navigation |
| Hands-free operation. | REJECTED | pilot-unsupervised |
| Pantalla de 7-inch. | REJECTED | display-dimension |
| Pantalla de 7". | REJECTED | display-dimension |

Honest counter-examples (all remain **ALLOWED**): "MAREA PILOT no funciona sin supervisión.",
"MAREA PILOT nunca opera sin supervisión.", "No incluye navegación autónoma.",
"Las pruebas de mar no se han realizado.", "No hay SLA establecido ni disponibilidad garantizada.",
"No se publica ningún tamaño de pantalla."

### 10.2 Gate re-measurement (post-repair)

| Command | Exit | Count |
| --- | --- | --- |
| `node scripts/build-mc20-catalog-data.mjs --check` | 0 | byte-stable |
| `npm run test:mc22` | 0 | **56/56** (MC20-33 redundant determinism check deduplicated into MC20-13) |
| `npm run test:mc22:unit` | 0 | **66/66** (55 base + 6 r1 + 5 r2 matrix regressions), 0 skipped |
| `npm run test:mc22:e2e` | 0 | **84 passed** (unchanged) |
| `npm run build` | 0 | 96 static routes (first invocation hit a transient piscina worker crash, exit 1, non-reproducible; re-run clean) |
| `npm run format:check` | 0 | 0 violations |

### 10.3 Validator and content repairs confirmed

- `BASE_COMMIT = 1dc9aa0`; `MC20-32` diffs against it, so MC-20/MC-21 files are no longer treated as
  MC-22 regressions. `MC20-38` no longer requires MC-22 to be `PLANNED`. `MC21-08` cross-checks the ten
  gates against `git show 1dc9aa0:…/shared.ts`.
- Ten governance gates are byte-identical to baseline `1dc9aa0`; no gate is CLOSED.
- `display.ts`: no physical size figure ("DISPLAY 7" is a working label only), no warranty wording.
- `fleet.ts`: no billing unit; access revocation is OPEN / "design requirement, not deployed behaviour";
  vessel range framed as a segment hypothesis; no `VERIFIED_REPO` on undeployed behaviour.
- `pilot.ts`: steering/mode/E-stop features labelled "(design requirement)".

### 10.4 Test-count comparison (no deletion / skip)

| Suite | Pre-repair | Post-repair | Δ |
| --- | --- | --- | --- |
| Validator | 57 | 56 | −1 (redundant MC20-33 dedup; coverage preserved via MC20-13) |
| Unit | 55 | 61 | +6 |
| E2E | 84 | 84 | 0 |

Zero tests skipped. The only decrease is the deduplication of a redundant determinism check already
covered by `MC20-13`; no coverage was removed and the unit suite grew.

### 10.5 Verdict (r1)

**PASS** — the 15 confirmed prohibited-claim bypasses are closed, the honest disclaimers still pass,
all six gates are green, and no test was deleted or skipped.

## 11. Re-verification r2 (final) — post-repair-r2 on the delivery commit

Independent re-verification after repair round 2 (verifier ≠ repairer). Machine-readable record:
`docs/marea/catalog/evidence/mc22-reverification-r2.json`. HEAD = `8f5b14b` (the MC-22 commit).

### 11.1 Round-2 matrix (executed against the committed guard module)

A temporary node script **outside the repository** called `catalogClaimProblems` on the 17 MUST-REJECT and
9 MUST-ALLOW round-2 inputs (26 total; the task header's "16" undercounts the reject list, which has 17 —
all 17 were verified). Result: **17/17 rejected, 9/9 allowed, 0 mismatches, exit 0**.

Round-1 regression re-executed: **15/15 rejects and 6/6 allows, 0 mismatches** (no regression). Review
addenda re-executed: F1 (hardware está/viene/es incluido, comes included), F2 (sea-trial preterite),
FNE-01 (spelled-out sizes cinco/veinte/cincuenta pulgadas, five-inch/fifty-inch display) — all rejected.

### 11.2 Gate re-measurement (post-repair-r2, on commit 8f5b14b)

| Command | Exit | Count |
| --- | --- | --- |
| `node scripts/build-mc20-catalog-data.mjs --check` | 0 | byte-stable |
| `npm run test:mc22` | 0 | **56/56** |
| `npm run test:mc22:unit` | 0 | **66/66** (0 fail, 0 skipped) |
| `npm run test:mc22:e2e` | 0 | **84 passed (2.3m)** across 18 routes |
| `npm run build` | 0 | **96 static routes** (19.436s, clean run) |
| `npm run format:check` | 0 | 0 violations |

### 11.3 Content, validator and governance confirmation

- `display.ts`: no published-component contradiction ("no component is selected"), excluded heading
  "Excluido del alcance / Excluded from scope" (no purchase wording), "cartography" fixed.
- `pilot.ts`: E-stop listed only as "(requisito de diseño) / (design requirement)", never a tested function.
- `fleet.ts`: no present-tense revocation claim (design requirement only), "por embarcación"/"per-vessel"
  removed, bundle-note grammar fixed in both locales.
- `MC22-04` now requires a non-empty PILOT steering-modes array (fail-open closed).
- Ten governance gates byte-identical to base `1dc9aa0`; release gates 12 BLOCKED + 1 EVIDENCE_REQUIRED,
  0 CLOSED.

### 11.4 Residual guard gaps (disclosed, outside the committed 26-case matrix)

Additional invented-input probing found 3 low-severity residual false-negatives, disclosed (not part of
the committed matrix, no current content violation): "PILOT steers the boat automatically." (adverb
"automatically" not in the autonomy vocabulary), "Pantalla de sesenta pulgadas / Screen of sixty inches."
(spelled-out sizes above 50), and "El hardware se incluye." (reflexive "se incluye" form). Recommended for
a future hardening round.

### 11.5 Verdict (r2)

**PASS** — all 26 round-2 matrix cases correct, no round-1 regression, the review addenda (F1/F2/FNE-01)
closed, content/validator fixes confirmed, ten gates intact, and all six gates green with recorded counts.
3 low-severity residual guard gaps remain and are disclosed for a future round.
