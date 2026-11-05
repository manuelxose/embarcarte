# MC-22 — Independent review (round 2 · binding) — product truth, safety, isolation, evidence integrity

| Field | Value |
| --- | --- |
| Milestone | MC-22/36 — internal catalogue batch 3 (DISPLAY, PILOT, FLEET) ES/EN |
| Reviewer | `reviewer` member (independent; authored no implementation/content/guard/validator/test task) |
| Branch | `feature/marea-mc22-display-pilot-fleet-catalog` |
| Delivery revision | **`ae1e431a03460b22eed968e1f20b690d894d7883`** (`ae1e431`) |
| Source revision | `450441d58748623339ed313f11b783d4358394b4` (`450441d`) |
| Implementation | `8f5b14b` |
| Base | `1dc9aa0d85d418709cfaccd41fe1f2335462c672` (`1dc9aa0`) |
| Verdict | **pass** — 0 BLOCKER, 0 MAJOR, 0 MINOR; residual guard gaps LOW/INFORMATIONAL (documented limits) |

This is the binding round-2 review. It supersedes the attempt-2 verifier review (verdict `needs_revision`,
findings F3 / FNE-01 / EVI-02 / LANG-01) and its attempt-1 predecessor (F1–F4). Every prior finding is
re-classified below as **resolved** or **open-as-documented-limit**.

## 0. Binding and tree state

- `git rev-parse HEAD` → `ae1e431a03460b22eed968e1f20b690d894d7883`; `git status --short` → **empty** at
  review start. The delivery revision is clean and named.
- Commit graph confirmed: `ae1e431` (evidence-binding chore) → `450441d` (implementation + three repair
  rounds) → `8f5b14b` (initial batch-3 extension) → `1dc9aa0` (MC-21 base). `ae1e431` changes only
  `docs/marea/catalog/**` (three evidence/report files), so the code under review is byte-identical to
  `450441d`.
- **Disclosure (post-start):** this review independently re-ran the validator
  (`npm run test:mc22`), which self-documents into `docs/marea/catalog/evidence/validator-run.json`
  (`runAt` timestamp and `head` advanced from `450441d` to `ae1e431`; the 56 check results are identical).
  That is the only working-tree change and was introduced by this review's own verification, not present
  at review start. `dist/` (produced by `npm run build`) is untracked/ignored.

## 1. Method

Read in full: `scripts/mc20-catalog-guards.mjs` (766 lines), `scripts/check-mc20-catalog.mjs`
(1254 lines), `src/app/marea-catalog/content/{display,pilot,fleet,shared}.ts`, the canonical datasets
`product-families.json`, `product-editions.json`, `product-definitions.batch-02.json` (PILOT) and
`.batch-03.json` (DISPLAY, FLEET), `docs/marea/catalog/data/catalog-projection.json`,
`release-evidence-gates.json`, `models/catalog-identity.ts`, `data/catalog-domain.ts`, and
`MC22-SECURITY-AND-ISOLATION-EVIDENCE.md` §8. Independently executed the six gates and a fresh
adversarial matrix written by this reviewer (not a replay of the captain's or the three external
auditors' matrices).

## 2. Fresh adversarial matrix (my own inputs; MUST vs OBSERVED)

Executed `catalogClaimProblems` from `scripts/mc20-catalog-guards.mjs` in a temp script **outside** the
repo. 41 cases, 0 mismatches (25 reject / 16 allow), covering autonomy, certification, regulatory
approval, guaranteed performance, display measurement, SLA, price and purchasability in ES and EN:

| Input | MUST | OBSERVED | Rules |
| --- | --- | --- | --- |
| PILOT navigates the vessel autonomously without human intervention. | reject | reject | pilot-autonomous-navigation |
| PILOT navega de forma autónoma sin intervención humana. | reject | reject | pilot-autonomous-navigation, pilot-unsupervised |
| The autopilot is certified to marine standards. | reject | reject | positive-certification |
| El autopiloto está certificado para uso marítimo. | reject | reject | positive-certification |
| PILOT has obtained type approval from the authorities. | reject | reject | pilot-regulatory-approval |
| PILOT ha obtenido la homologación. | reject | reject | pilot-regulatory-approval |
| We guarantee compatibility with all NMEA devices. | reject | reject | positive-guarantee |
| The 7-inch display reaches 1200 nits of brightness. | reject | reject | display-dimension, display-brightness |
| La pantalla de 7 pulgadas alcanza 1000 nits de brillo. | reject | reject | display-dimension, display-brightness |
| FLEET guarantees 99.9% availability. | reject | reject | numeric-accuracy |
| FLEET ofrece disponibilidad garantizada del 99%. | reject | reject | fleet-availability-percentage, fleet-guaranteed-availability |
| Starting at €699 per month. | reject | reject | currency |
| Desde 1290 € al mes. | reject | reject | currency |
| Buy now with free shipping and add to cart. | reject | reject | add-to-cart, buy-now, shipping-promise |
| Añadir al carrito y comprar ahora. | reject | reject | add-to-cart, buy-now |
| PILOT is not supervised and navigates fully autonomously. | reject | reject | NEW_PREDICATE ends negation |
| The system has completed sea trials. / El sistema ha superado las pruebas de mar. | reject | reject | sea-trial |
| El hardware se incluye de serie. / Hardware is supplied with every FLEET tier. | reject | reject | fleet-hardware-included |
| The sixty-inch display is available now. | reject | reject | display-dimension (spelled >50) |
| The pilot steers automatically in open water. | reject | reject | pilot-autonomous-navigation (RES-01) |
| It is not certified and is fully autonomous. | reject | reject | negation cut before "autonomous" |
| It steers autonomously; the add-on is not included. | reject | reject | POST_NEGATION clause-anchored |
| Operates hands-free without any skipper present. | reject | reject | pilot-unsupervised |
| Autonomous navigation is not included. | allow | allow | — |
| PILOT is never autonomous and never unsupervised. | allow | allow | — |
| No autonomous navigation, certified autopilot or safety reliability is included. | allow | allow | — |
| PILOT is not a certified autopilot and does not steer unsupervised. | allow | allow | — |
| Sea trials have not been performed and no behaviour is verified. | allow | allow | — |
| No physical dimension, resolution, brightness or IP rating is published. | allow | allow | — |
| The display has no approved price, verified stock or merchant SKU. | allow | allow | — |
| No hardware is included with the FLEET service. | allow | allow | — |
| No SLA is established and no availability is guaranteed. | allow | allow | — |
| Remote helm control is PROHIBITED; no remote engage or heading adjustment. | allow | allow | — |
| It is not sold and purchase is not available. | allow | allow | — |
| Not included: charts, WEATHER layers and the NAV subscription. | allow | allow | — |
| No se incluye navegación autónoma ni piloto automático certificado. | allow | allow | — |
| La compra no está disponible y no hay precio aprobado. | allow | allow | — |
| Sin clasificación IP67 y sin cifras medidas. | allow | allow | — |
| The size is not frozen and no hardware is selected. | allow | allow | — |

The three structural cases the round-3 repair claims to have fixed — **strong-negation scope cut by a
coordination + finite verb** (`NEW_PREDICATE`), **negation not leaking past a clause boundary into a
coordinated predicate**, and **post-negation bounded to the same sentence/clause** — each behave
correctly on my inputs.

## 3. Is the negation model principled, or merely patched?

**Principled within a bounded design, not a bag of sentence patches.** The four mechanisms are structural:

1. **Strong negation scoped to the predicate** (`mc20-catalog-guards.mjs:288-300`): the last strong
   negator before a claim negates it, unless a coordination followed by a finite verb (`NEW_PREDICATE`,
   `:271-275`) starts a new predicate. This is the reason `"is not supervised and navigates fully
   autonomously"` is rejected while `"No A, B or C is offered"` stays allowed.
2. **Weak negation strictly adjacent** (`:302-312`): `sin`/`without` negate only the immediately
   following noun, within an 18-char window and never across a coordination.
3. **Post-negation clause-anchored** (`:323-326`): a negated predicate after the claim counts only inside
   the same sentence, so `"steers autonomously; the add-on is not included"` is rejected.
4. **Fail-closed default** (`:349`): a match inside a non-negatable rule, or a genuinely ambiguous
   negation, is rejected rather than passed.

This is the correct architecture for a lexical backstop. It is *still* a heuristic, and §4 is the honest
statement of what it cannot do.

## 4. The stop-repairing design decision — judged defensible

The captain has deliberately stopped repairing `catalogClaimProblems`. I judge that decision
**defensible and correct**, for five reasons:

1. The control is documented as a **heuristic backstop, not a proof of absence** in its own module header
   (`mc20-catalog-guards.mjs:8-14`) and in
   `MC22-SECURITY-AND-ISOLATION-EVIDENCE.md` §8, which names the two structural limits (unbounded phrase
   space, approximate negation scope).
2. The **primary controls are deterministic**: the typed bilingual content contract
   (`src/app/marea-catalog/content/*`) and the canonical-data cross-checks (MC22-01..07 and
   MC20-02/06/08 read `product-definitions.batch-0X.json` and `product-families.json` directly and fail
   closed on `BLOCKED`/`NOT_FOR_SALE`/`SIZE_NOT_FROZEN`/`NO_SLA_ESTABLISHED`/`NOT_FOUND`). A prose
   paraphrase is not the sole defence; the published data itself is canonical and non-commercial.
3. The **regression tripwire still works**: 70 unit tests, the 72-case accumulated matrix and my 41 fresh
   cases all pass; every previously confirmed bypass is rejected.
4. The phrase space is genuinely **unbounded** — each independent round finds more paraphrases (RES-01..03
   closed; RES-04..06 and my RES-A..D below remain). Continuing is an unbounded regression with
   diminishing returns, which the two-attempt repair cap exists to prevent.
5. **No residual phrasing appears in the shipped content.** I read all three family files in full: the
   content is honest and traceable, so the residuals are theoretical, not live violations.

The one caveat, stated plainly: **the guard alone is not sufficient.** A future author who writes
`"the vessel can sail itself"` or `"CE marked"` into a content file would pass the guard; defence rests on
the canonical cross-checks (which pin the commercial/readiness facts) plus human review. That is exactly
what the documentation claims, so the position is honest rather than overstated.

## 5. Fresh residual probes (invented by this reviewer; recorded OBSERVED)

These are **not** in any of the four rounds' disclosures and confirm the unbounded phrase space. None
appears in shipped content. OBSERVED = `catalogClaimProblems` result:

| Input | OBSERVED | Residual category |
| --- | --- | --- |
| PILOT drives the boat on its own. | ALLOW | autonomy paraphrase ("on its own") |
| The vessel can sail itself. | ALLOW | autonomy paraphrase ("sail itself") |
| Self-piloting capability is included. | ALLOW | autonomy ("self-piloting" vs enumerated "self-steering") |
| Steers by itself once engaged. | ALLOW | autonomy ("by itself") |
| Autopilot functionality is built in. | ALLOW | autonomy ("built in" copula) |
| NMEA 2000 approved. | ALLOW | certification ("approved" vs "certified") |
| CE marked and fully compliant. | ALLOW | certification/mark ("CE marked") |
| Type certified for marine use. | ALLOW | approval ("type certified") |
| A bright 1200-nit panel. | ALLOW | display-brightness (hyphenated "1200-nit") |
| 1200 candela brightness. | ALLOW | display-brightness ("candela" unit) |
| Order now with next-day delivery. | ALLOW | purchasability ("order now") |
| Contact us for a quote. | ALLOW | lead capture ("quote") |
| Certificado NMEA 2000. | ALLOW | RES-04 (known) |
| Aprobación CE obtenida. | ALLOW | RES-05 (known) |
| PILOT operates without a skipper. | ALLOW | RES-06 (known) |
| Rated for continuous duty at sea. | ALLOW | reliability paraphrase |

For fairness: `"1500 nits"` (non-hyphenated) and `"99.99% uptime guaranteed"` are correctly **rejected**,
so the gaps are narrow, not categorical.

## 6. Product truth (traced to canonical data)

- **DISPLAY** — `sizeState=SIZE_NOT_FROZEN`, `hardwareState=HARDWARE_NOT_SELECTED`,
  `bomState=BOM_NOT_ESTABLISHED`, `measuredPerformance=false`, `pilotControlAuthority=false`,
  `chartRightsGranted=false` (`product-definitions.batch-03.json:677-683`). Content renders these verbatim
  and publishes no dimension, resolution, brightness, IP rating or power figure; "DISPLAY 7" is a working
  label, not a measurement; the `699 EUR` price hypothesis and `priceState=HYPOTHESIS_UNAPPROVED` are
  correctly **not** published ("no approved price").
- **PILOT** — `safetyGate=BLOCKED`, `seaTrialsCompleted=false`, `remoteHelmControl=PROHIBITED`,
  `physicalEstopEvidence/motorIsolationEvidence/rudderFeedbackEvidence=NOT_FOUND`, steering modes
  `HEADING_HOLD=NOT_VERIFIED`, `WIND_ANGLE/ROUTE_FOLLOW=CONDITIONAL_ON_VERIFICATION`
  (`batch-02.json:568-592`). Content is supervised-only, never autonomous, never a certified autopilot,
  never sellable; the `1290 EUR` hypothesis is not published.
- **FLEET** — `multiTenantProductionService=false`, `slaEstablished=false` (`NO_SLA_ESTABLISHED`),
  `telemetryReadOnly=true`, `remoteControlPath=false`, `defaultRole=NO_ACCESS`,
  `securityCertificationClaimed=false`, `customerProductionDataUsed=false` (`batch-03.json:1823-1842`).
  Content keeps the B2B identity with no invented SLA, contract, customer, hardware or certification; the
  `49/79 EUR/mo` hypotheses are not published.
- Evidence classes are honest: undeployed/unverified behaviour is `OPEN`/`BLOCKED`/`HYPOTHESIS`/`ASSUMPTION`;
  `VERIFIED_REPO` is reserved for canonical status strings and design-boundary facts. No invented
  dimension, resolution, brightness, IP rating, power figure, SLA, availability guarantee, included
  hardware, certification, named customer or autonomous-navigation capability.

**Result: PASS.**

## 7. Safety language (all three families)

- PILOT is never presented as sellable while `PILOT_SAFETY_GATE = BLOCKED`: "not sold"/"no se vende" and
  "not announced as safe"/"no se anuncia como seguro" appear in the hero notice and limitations; sea
  trials are `NOT_PERFORMED`; E-stop/isolation/rudder-feedback are `NOT_FOUND`; remote helm control is
  `PROHIBITED`/`PROHIBIDO`; every steering mode is `NOT_VERIFIED` or `CONDITIONAL_ON_VERIFICATION`.
  Validator MC22-04/05 confirm 0 autonomy/certification/reliability/approval/helm claims.
- DISPLAY holds no PILOT control authority (read-only status at most); FLEET has no steering/motor/rudder
  control path (`remoteControlPath=false`) and telemetry is read-only. AIS stays receive-only in the
  cross-product copy.

**Result: PASS.**

## 8. Commercial / legal boundary

- The canonical price hypotheses **699 / 1290 / 49 / 79** remain only in
  `product-definitions.batch-0{2,3}.json` with `status=HYPOTHESIS_UNAPPROVED`; they do **not** reach the
  content or the generated projection. Grepped the content and projection: `approvedPrices=0`,
  `merchantableEditions=0`, `merchantSkuCodes=0`; every edition `merchantSkuCode: null`,
  `priceApproved=false`, `merchantable=false` (validator MC20-06/14).
- No stock, SKU, quote, order, checkout, lead form, public route, `canonical`/`hreflang`/`sitemap` or
  JSON-LD: `publicRoutesRegistered=0`; `preview/landing/catalog-preview.ts` emits only
  `noindex, nofollow, noarchive` + `marea-publication: NOT_AUTHORIZED`; `MC20-26` finds 0 form/storage/
  network calls; `MC20-24/25` confirm no indexable metadata and loopback-only binding.
- Ten governance gates verbatim in `catalog-projection.json`, `shared.ts` and the base commit
  (`MC21-08`); `release-evidence-gates.json` = 13 gates, **0 CLOSED** (12 BLOCKED + 1 EVIDENCE_REQUIRED);
  `claims-policy.json` `publicAuthorized=0`.

**Result: PASS.**

## 9. Architecture

One component tree (`src/app/marea-catalog/*`), one typed projection
(`catalog.generated.ts`, generated by `build-mc20-catalog-data.mjs`, byte-stable via `--check`), one
scope source `CATALOG_SCOPE_FAMILY_IDS` consumed by identity/content/view/validator. No design-system fork:
`git diff 1dc9aa0..ae1e431 -- src/app/marea-design-system` is **empty**; the catalogue reuses the ten
MC-17 components and the fail-closed `deriveCommercialPresentation` adapter
(`catalog-domain.ts:41-57`, all gates `false`). No `app.routes.ts`, `app.routes.server.ts`,
`locale-routes.ts`, `public/` or `src/server.ts` change since base. `findForbiddenReach` reports 0
production modules reaching the catalogue/preview/landing; grep over `dist/embarcarte` (47 JS files)
found **0 catalogue identifiers**.

**Result: PASS.**

## 10. Tests and evidence integrity (independently re-measured)

| Gate | Command | Measured |
| --- | --- | --- |
| data | `npm run check:mc22:data` | exit 0 — "up to date (3 generated files)" |
| validator | `npm run test:mc22` | exit 0 — **56/56 PASS** |
| unit | `npm run test:mc22:unit` | exit 0 — **70/70 pass, 0 fail, 0 skipped** |
| e2e | `npm run test:mc22:e2e` | exit 0 — **84 passed (2.4m)**, incl. axe + "no commerce path" |
| build | `npm run build` | exit 0 — **96 static routes** |
| format | `npm run format:check` | exit 0 — 0 violations |

- No test deleted, skipped or weakened: `scripts/check-mc20-catalog.test.mjs` has no `.skip`/`.todo`/
  `.only`, and the `node:test` run reports 0 skipped / 0 todo. 70 test cases counted on disk.
- No tautological check: MC22-01..07 assert concrete canonical values (lengths, `=== false`, exact
  `NOT_*` strings, non-empty `steeringModes` array), not `check !== check`.

**Result: PASS.**

## 11. ES/EN parity

Read every localized pair in `display.ts`, `pilot.ts`, `fleet.ts` and `shared.ts`. Every block has a
non-empty, distinct ES and EN value; limitations carry negation markers in both locales; no identical
ES/EN text outside proper nouns; no Spanish function-word clustering in English (validator MC20-16/17/18
pass). The `cartography`/`cartografía` typo (prior LANG-01) is fixed at `display.ts:366`.

**Result: PASS.**

## 12. Findings

| id | severity | file | line | problem | requiredFix |
| --- | --- | --- | --- | --- | --- |
| RES-A | low | scripts/mc20-catalog-guards.mjs | 148-150 | `pilot-autonomous-navigation` does not enumerate reflexives/idioms ("sail itself", "on its own", "by itself", "self-piloting", "built in"). A future autonomy paraphrase in these forms would pass the guard. | None required now (not in content). If PILOT content is ever edited, extend the vocabulary or rely on canonical `safetyGate=BLOCKED` cross-check + human review. |
| RES-B | low | scripts/mc20-catalog-guards.mjs | 54-55, 143-145 | Certification/approval paraphrases ("NMEA 2000 approved", "CE marked", "type certified") are not enumerated; only "certified"/"homologated"/"approved by" forms match. | None required now (not in content). Same mitigation as RES-A. |
| RES-C | low | scripts/mc20-catalog-guards.mjs | 127-128 | `display-brightness` misses hyphenated `1200-nit` and the `candela` unit (it matches `nits`/`cd/m2`/`cd/m²` only). | None required now (not in content). Documented unbounded phrase space. |
| RES-D | low | scripts/mc20-catalog-guards.mjs | — (no rule) | No rule for purchasability/lead phrasings "order now", "contact us for a quote"; these rely on `MC20-26` (no `<form>`) and `MC20-27` (fail-closed adapter). | None required now. Defence is the fail-closed adapter + no-form check, which hold. |
| RES-04 | low | scripts/mc20-catalog-guards.mjs | 59-60 | `Certificado NMEA 2000.` (bare fragment) is not matched. | Documented limit (t22). None required now. |
| RES-05 | low | scripts/mc20-catalog-guards.mjs | 163-164 | `Aprobación CE obtenida.` is not matched (pattern needs "regulatoria"/"homologación"). | Documented limit (t22). None required now. |
| RES-06 | low | scripts/mc20-catalog-guards.mjs | 151-155 | `PILOT operates without a skipper.` is not matched ("without a skipper" vs enumerated "without supervision"). | Documented limit (t22). None required now. |
| INFO-01 | informational | docs/marea/catalog/MC22-SECURITY-AND-ISOLATION-EVIDENCE.md | 141 | §8 says "60+ adversarial tests"; the accumulated matrix is 72 cases and the unit suite is 70. Minor staleness, no material effect. | Optional refresh on the next documentation pass. |

All findings are LOW or INFORMATIONAL; **zero BLOCKER, zero MAJOR, zero MINOR**. Every residual is a
paraphrase absent from shipped content, covered by the documented heuristic-backstop position.

## 13. Prior findings — disposition

| Prior finding | Origin | Disposition |
| --- | --- | --- |
| 15 prohibited-claim bypasses | external audit round 1 | **resolved** — rejected by r1; re-verified r1/r2/r3. |
| 26 defects (14 false-neg + 12 false-pos) | external audit round 2 | **resolved** by r2 hardening. |
| XC22-01..05 | external audit round 3 | **resolved** by r3. |
| F1 fleet-hardware copula, F2 sea-trial preterite | internal review attempt 1 | **resolved** (r2 guard + tests). |
| F3 uncommitted delivery state | internal review attempt 1/2 | **resolved** — commits `8f5b14b`, `450441d`, `ae1e431` bind the change set. |
| F4 stale "57/57" count | internal review attempt 1 | **resolved** (annotated pre-repair figure). |
| FNE-01 spelled-out sizes outside 7–15/7–12 | internal review attempt 2 | **resolved** — r2/r3 extended to `uno..cien` / `one..hundred`; my `sixty-inch` probe rejected. |
| EVI-02 evidence lag (unit 61 vs 66) | internal review attempt 2 | **resolved** — unit suite now 70, evidence bound in `ae1e431`. |
| LANG-01 "chartography" typo | internal review attempt 2 | **resolved** — `display.ts:366` reads "cartography". |
| RES-01/02/03 | independent verification | **resolved** by r3 (verified: "automatically", spelled-out >50, reflexive "se incluye"). |
| RES-04/05/06 | independent verification r3 | **open as documented limits** (reproduced in §5). |

## 14. Verdict

**pass** — 0 BLOCKER, 0 MAJOR, 0 MINOR. Product truth, safety language, the commercial/legal boundary,
architecture (one tree, one projection, no design-system fork) and test/evidence integrity are correct
against the canonical datasets and the measured gates. The prohibited-claim control is a principled,
bounded heuristic — correctly scoped negation plus a fail-closed default — and is honestly documented as a
backstop whose primary controls are the canonical-data cross-checks and reviewed content. The decision to
stop the repair loop is defensible; the remaining paraphrase gaps are LOW/INFORMATIONAL, documented, and
absent from the shipped bytes.
