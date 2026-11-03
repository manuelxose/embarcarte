# MC-18 — Legacy site non-regression (D14)

| Field       | Value                                                                                                       |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| Deliverable | D14 `MC18-LEGACY-SITE-NON-REGRESSION.md`                                                                    |
| Milestone   | MC-18/36 — internal MAREA corporate landing (EMBARCARTE)                                                    |
| Owner       | docs-a (documentation owner, documents group A)                                                             |
| Date        | 2026-11-03                                                                                                  |
| Status      | `INTERNAL_VERIFIED` for the diff/isolation checks below; full e2e and production build **NOT RUN** (stated) |
| Publication | `NOT_AUTHORIZED`                                                                                            |

This document records the watched public surface and the exact commands used to prove the
MC-18 landing does not change it. It records what was **not** run (the full inherited e2e
suite and the production build), the MC-18 isolation change made to the default Playwright
config, the current known-red inherited gates (including `FINANCIAL_V18`), and the honest
limits of this verification.

## 1. Watched public surface

The public production application must remain byte-identical to the MC-17 base `6002c49`
except for the three configuration changes noted below (two additive, one one-line test
selection change).

| Watched path                                                                                  | Expected state                                         | Observed                                                                         |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------- |
| `src/app/**` (tracked production code)                                                        | no modifications                                       | empty diff                                                                       |
| `src/app/app.routes.ts`, `src/app/app.routes.server.ts`, `src/app/core/i18n/locale-routes.ts` | no modifications                                       | empty diff                                                                       |
| `src/main.ts`, `src/main.server.ts`                                                           | no modifications                                       | empty diff                                                                       |
| `src/server.ts`                                                                               | no modifications                                       | empty diff                                                                       |
| `src/styles.scss`                                                                             | no modifications                                       | empty diff                                                                       |
| `public/**`                                                                                   | no additions/changes                                   | empty diff; no public asset added                                                |
| `src/app/marea-design-system/**` (MC-17 design system)                                        | reused, not forked/modified                            | empty diff                                                                       |
| `angular.json` → `projects.embarcarte`                                                        | identical to base                                      | `JSON.stringify` comparison against `git show 6002c49:angular.json` → **`true`** |
| `package.json` → `dependencies` / `devDependencies`                                           | identical; no new dependency                           | both `true`; no lockfile change                                                  |
| `package-lock.json`                                                                           | unchanged                                              | empty diff                                                                       |
| `angular.json` as a file                                                                      | additive preview project only                          | `+68 / -0`                                                                       |
| `package.json` as a file                                                                      | additive landing scripts only                          | `+12 / -3` (the −3 are the two expanded `format`/`format:check` lines)           |
| `playwright.config.ts`                                                                        | one-line `testIgnore` addition isolating `e2e/landing` | `+1 / -1`                                                                        |

`angular.json` projects: base = `embarcarte, marea-design-system-catalogue`; current =
`embarcarte, marea-design-system-catalogue, marea-landing-preview`. The new project is
`marea-landing-preview` with root `preview/landing`; the `embarcarte` and
`marea-design-system-catalogue` project objects are unchanged.

`package.json` scripts: 9 landing scripts were added
(`build:landing:data`, `check:landing:data`, `build:landing:preview`,
`serve:landing:preview`, `test:landing`, `test:landing:unit`, `test:landing:e2e`,
`test:landing:visual`, `check:landing`). Dependencies are unchanged.

## 2. Exact commands and outputs

All commands ran in `C:\Users\Admin\Documents\workspace\embarcarte` on 2026-11-03.

### 2.1 Diff against the baseline

```text
$ git diff --name-only 6002c49 -- src/app src/main.ts src/main.server.ts src/server.ts src/styles.scss public angular.json playwright.config.ts
angular.json
playwright.config.ts

$ git diff --name-only 6002c49 -- src/app
<empty>
$ git diff --name-only 6002c49 -- src/main.ts
<empty>
$ git diff --name-only 6002c49 -- src/main.server.ts
<empty>
$ git diff --name-only 6002c49 -- src/server.ts
<empty>
$ git diff --name-only 6002c49 -- src/styles.scss
<empty>
$ git diff --name-only 6002c49 -- public
<empty>
$ git diff --name-only 6002c49 -- package-lock.json
<empty>
$ git diff --name-only 6002c49 -- src/app/marea-design-system
<empty>
$ git diff --name-only 6002c49 -- src/app/app.routes.ts src/app/app.routes.server.ts src/app/core/i18n/locale-routes.ts
<empty>

$ git diff --numstat 6002c49 -- angular.json package.json playwright.config.ts
68      0       angular.json
12      3       package.json
1       1       playwright.config.ts
```

The `playwright.config.ts` change is exactly this one line (MC-18 test isolation):

```text
-  testIgnore: ['**/design-system/**'],
+  testIgnore: ['**/design-system/**', '**/landing/**'],
```

It prevents the inherited e2e command from collecting the isolated landing specs. The landing
suite runs only through `playwright.landing.config.ts`, whose base URL is
`http://127.0.0.1:4302` (loopback preview). The file is an allowed exact-path change in the
validator's `MC18-56` scope, together with `package.json` and `angular.json`.

Caveat recorded honestly: `git diff` does not see untracked files. The new MC-18 source is
untracked (`src/app/marea-landing/`, `preview/landing/`), so an empty tracked diff alone does
not prove isolation. Section 4 adds a source-scan and project-graph check.

### 2.2 Project and dependency comparison

```text
$ node -e "compare JSON.stringify(git show 6002c49:angular.json .projects.embarcarte) with angular.json"
embarcarte_project_identical=true
base_projects=embarcarte,marea-design-system-catalogue
current_projects=embarcarte,marea-design-system-catalogue,marea-landing-preview

$ node -e "compare package.json dependencies/devDependencies with git show 6002c49:package.json"
dependencies_identical=true
devDependencies_identical=true
scripts_delta=9
```

### 2.3 Type, build and format checks run for this milestone

| Command                                             | Result                                                                                        |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `npx tsc -p tsconfig.app.json --noEmit`             | exit 0 — production TypeScript graph still typechecks                                         |
| `npx tsc -p preview/landing/tsconfig.json --noEmit` | exit 0                                                                                        |
| `npm run build:landing:preview`                     | exit 0 — isolated preview only                                                                |
| `npm run build` (production)                        | **not run** in this session; no production-build PASS is claimed here                         |
| `npm run test:landing:unit`                         | exit 0, 45/45                                                                                 |
| `npm run test:landing`                              | exit 1, **55/60** (5 pending-artefact failures from other authors; see D08)                   |
| `npx playwright test --list` (default config)       | exit 0 — `Total: 15 tests in 5 files` (inherited public selection; landing specs excluded)    |
| `npm run format:check`                              | **exit 1** — 10 real files unformatted in implementation/preview/scripts (reported, not mine) |

## 3. Production styles assertion

- `angular.json` → `projects.embarcarte.architect.build.options.styles` is
  `["src/styles.scss"]` — unchanged from base.
- The MC-17 token CSS is listed **only** in
  `projects.marea-landing-preview.architect.build.options.styles`:
  `["preview/landing/styles.css", "src/app/marea-design-system/tokens/generated/marea-tokens.generated.css"]`.
- `src/styles.scss` diff is empty and contains no `marea` reference (MC-17 `MC17-07` rule is
  preserved).
- Therefore the preview baseline, fonts import and token CSS cannot restyle the public site.

## 4. Import-graph isolation

Source scan for `marea-landing` across `src/**/*.ts` excluding
`src/app/marea-landing/**` and `src/app/marea-design-system/**`:

```text
$ Get-ChildItem -Recurse src -File -Include *.ts | Where-Object { … exclusions … } | Select-String -Pattern 'marea-landing'
<no matches>
```

Additional facts:

- Production entries `src/main.ts`, `src/main.server.ts`, `src/server.ts`,
  `src/app/app.routes.ts`, `src/app/app.config.ts`,
  `src/app/core/i18n/locale-routes.ts` contain no `marea-landing` or
  `marea-landing-preview` reference.
- `preview/landing/` imports `src/app/marea-landing/landing.ts`, never the reverse.
- The preview project is a separate `angular.json` project with its own `tsConfig`, bootstrap,
  index and SSR entry; the production build target cannot include it.
- Validator checks all PASS: `MC18-28` (no proposed route in production router), `MC18-29`
  (no sitemap entry), `MC18-30` (no public navigation/UI change), `MC18-31` (no public brand
  asset), `MC18-32` (checkout unchanged), `MC18-33` (zero landing bytes in the public
  corporate site), `MC18-38` (no production bundle imports the landing), `MC18-56` (changed-file
  scope), `MC18-60` (no public asset/sitemap/hosting artefact).

## 5. Public e2e status — what ran and what did not

The full inherited e2e suite was **not run** (it is expensive and requires the production e2e
server on `127.0.0.1:4310`). No e2e PASS is claimed.

What was run: `npx playwright test --list` (default `playwright.config.ts`) → **exit 0**,
reporter summary **`Total: 15 tests in 5 files`** after the isolation change. The collected
files are the inherited public specs only: `accessibility.spec.ts`, `commerce.spec.ts`,
`failure.spec.ts`, `public.spec.ts`, `responsive.spec.ts`. This is the same public spec
selection as before MC-18; no landing spec is collected.

An earlier observation in this session (before the fix) was `Total: 55 tests in 12 files`,
because the default config then had `testIgnore: ['**/design-system/**']` only and discovered
`e2e/landing/**`. The Lead corrected `playwright.config.ts` with the one-line change shown in
§2.1; that is recorded here as the **MC-18 isolation change**. The landing suite is invoked
only via `playwright.landing.config.ts` (testDir `./e2e/landing`, baseURL
`http://127.0.0.1:4302`, webServer `node dist/marea-landing-preview/server/server.mjs`).

## 6. Current known-red inherited gates — not green

The inherited suite is **not fully green**, and MC-18 does not make it green. The currently
known-red inherited items are:

| Item                                  | State carried                                                                                                                                                                                                            |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `FINANCIAL_V18`                       | `INHERITED_OPEN` — MC-13 validator asserts registry row 14 `PLANNED`; MC-14 recorded `PARTIAL`, so `npm run test:financial` / `test:financial:unit` fail **only** on V-18 (`docs/marea/execution/DECISION-LOG.md` D-069) |
| `MC16_FINAL_02`                       | `OPEN_UNTIL_REVERIFIED` (MC-17 blocker register)                                                                                                                                                                         |
| `MC16_FINAL_09`                       | open (carried with MC16_FINAL_02)                                                                                                                                                                                        |
| `MC13-F-05`, `MC13-F-11`, `MC13-F-14` | open (MC-17 baseline §8)                                                                                                                                                                                                 |
| `MC15-GSC-01`, `MC15-GSC-02`          | open (Search Console/indexation operational debt)                                                                                                                                                                        |
| MC-14 release gates                   | 13 open / 0 closed; 24 required documents / 0 executed                                                                                                                                                                   |
| MC-14 claims                          | 42 catalogued / 0 public-authorised                                                                                                                                                                                      |

MC-18 does not touch `test:financial`, the financial datasets, the registry or any predecessor
validator. This document did **not** re-run the financial validator (verified from the recorded
decision/evidence; it is outside the diff). A blanket claim such as "all inherited tests pass"
would be false.

Separate from inherited debt, `npm run format:check` currently exits 1 on 10 real files, all in
the MC-18 implementation/preview/scripts scope owned by other authors:
`preview/landing/main.server.ts`, `preview/landing/preview-not-found.ts`,
`src/app/marea-landing/content/content.types.ts`,
`src/app/marea-landing/models/page-identity.ts`,
`src/app/marea-landing/models/publication-gates.ts`,
`scripts/build-marea-landing-data.mjs`, `scripts/check-marea-landing.mjs`,
`scripts/check-marea-landing.test.mjs`, `scripts/check-marea-landing-adversarial.test.mjs`,
`scripts/marea-landing-guards.mjs`. The seven docs-a documents pass `prettier --check`.

## 7. Known limitations / non-claims

- This is a legacy non-regression **documentation** check, not an independent audit and not a
  milestone verdict.
- `git diff` cannot see untracked files; isolation is supported by the empty tracked diff, the
  identical `embarcarte` project object, the source scan and the validator isolation checks —
  not by `git diff` alone.
- The production build (`npm run build`) and the full inherited e2e suite were **not run**; no
  PASS is claimed for them. The default-config `--list` proves discovery composition, not
  execution.
- `format:check` is currently red on 10 implementation/script files (listed in §6); docs-a does
  not own those files and does not claim a green repository format check.
- `FINANCIAL_V18` and the other entries in §6 remain inherited red/open; the inherited suite is
  not green.
- No public route, sitemap entry, robots change, public asset or production style was added by
  MC-18. Nothing here authorises publication or deployment.
