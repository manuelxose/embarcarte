# MC-18 — Independent review (D21)

| Field                         | Value                                                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Deliverable                   | D21 `MC18-INDEPENDENT-REVIEW.md`                                                                                                      |
| Milestone                     | MC-18/36 — internal MAREA corporate landing (EMBARCARTE)                                                                              |
| Auditor                       | Agent G — independent auditor (did not author the implementation)                                                                     |
| Frozen audit SHA              | `ca64ec7f9f079326321cc7070ad2b1acf2832bc9` (`feat(mc18): implement isolated bilingual MAREA corporate landing`)                       |
| Base / predecessor SHA        | `6002c49f898e755154c1b65c97781177719ce11c` (verified MC-17 HEAD)                                                                      |
| Branch                        | `feature/marea-mc18-bilingual-corporate-landing` (local only, no upstream)                                                            |
| Date                          | 2026-11-03                                                                                                                            |
| Worktree state at audit start | Clean — `git status --porcelain=v1` empty, `git diff HEAD --quiet` exit 0                                                             |
| Worktree state at end         | Only the two D21 deliverables added; test-generated evidence files restored byte-for-byte to the frozen commit (see §2.4)             |
| Recommendation                | `PASS_INTERNAL_LANDING_SCOPE` (0 open BLOCKING, 0 open MAJOR; 3 MINOR OPEN, 2 INFORMATIONAL) — programme verdict deliberately not set |
| Publication                   | `NOT_AUTHORIZED` — no merge, deployment, publication, sitemap submission or MC-19 start observed                                      |

This is an independent audit of the frozen implementation, not a delivery summary and not a
programme verdict. Every number below comes from a command executed in this worktree on
2026-11-03. Where the implementation is correct but a document is stale or an external approval
is missing, the distinction is recorded explicitly.

## 1. Scope

In scope: the real diff `6002c49..ca64ec7` (113 files, +27,562 / −4), the committed landing source
(`src/app/marea-landing/`, `preview/landing/`, `e2e/landing/`, landing scripts and datasets), the
isolated SSR preview build, the public production build, the bilingual content and its evidence
provenance, the design-system dependency graph, the publication-gate model, the inherited debt and
the MC-18 documents D01/D02/D08/D09/D10/D11/D12/D14 (plus the datasets they cite).

Out of scope / non-claims: no legal, trademark, licensing, certification, pricing, stock,
hardware, safety or WCAG-conformance approval is given or implied. Those remain external blockers
(§7), not MC-18 implementation defects. The auditor did not modify implementation, content,
datasets, tests or other documents; no Git write command and no deployment/publication action was
run.

## 2. Method and observed commands

### 2.1 Freeze and diff verification

| Command                                                                                                                                                                                               | Exit | Observed result                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------------------- |
| `git rev-parse HEAD`                                                                                                                                                                                  | 0    | `ca64ec7f9f079326321cc7070ad2b1acf2832bc9`              |
| `git rev-parse 6002c49…`                                                                                                                                                                              | 0    | `6002c49f898e755154c1b65c97781177719ce11c`              |
| `git status --porcelain=v1`                                                                                                                                                                           | 0    | empty (clean)                                           |
| `git diff HEAD --quiet`                                                                                                                                                                               | 0    | no uncommitted change                                   |
| `git diff --stat 6002c49..HEAD`                                                                                                                                                                       | 0    | 113 files changed, 27,562 insertions(+), 4 deletions(-) |
| `git diff --name-only 6002c49 -- src/app/marea-design-system src/app/core src/app/app.routes.ts src/server.ts src/styles.scss public`                                                                 | 0    | empty                                                   |
| `git diff --name-only 6002c49 -- src/app/app.routes.server.ts src/app/core/i18n/locale-routes.ts`                                                                                                     | 0    | empty                                                   |
| `git diff --name-only 6002c49 -- docs/marea/design-system docs/marea/commerce-data docs/marea/information-architecture docs/marea/legal-commercial docs/marea/financial docs/marea/market-validation` | 0    | empty (no predecessor evidence file changed)            |
| `git diff --numstat 6002c49 -- angular.json package.json playwright.config.ts`                                                                                                                        | 0    | `68/0`, `12/3`, `1/1`                                   |

No pre-existing production source file changed: the only `src/app` additions are under
`src/app/marea-landing/`. The three tracked configuration changes are the additive preview project
(`angular.json` +68/−0), the nine additive landing scripts plus the two expanded `format` lines
(`package.json` +12/−3) and the one-line `testIgnore` isolation change in `playwright.config.ts`.
Dependencies, `devDependencies`, `package-lock.json`, the `embarcarte` and
`marea-design-system-catalogue` project objects, `src/styles.scss`, `public/` and the MC-17 design
system are identical to the base.

### 2.2 Gates actually run

| Command                                               | Exit | Observed result                                                                                                                                                                       |
| ----------------------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run test:landing` (frozen run)                   | 1    | **56/60** PASS; failures `MC18-44` (missing `review-findings.json`), `MC18-51` (missing D21/D22/D23), `MC18-53` (missing `review-findings.json`), `MC18-54` (missing delivery record) |
| `npm run test:landing:unit`                           | 0    | **45/45** tests pass                                                                                                                                                                  |
| `npx tsc -p tsconfig.app.json --noEmit`               | 0    | clean                                                                                                                                                                                 |
| `npx tsc -p preview/landing/tsconfig.json --noEmit`   | 0    | clean                                                                                                                                                                                 |
| `npm run build:landing:preview`                       | 0    | 0 prerendered routes; browser `main.js` 1.85 MB, `styles.css` 11.59 kB; output `dist/marea-landing-preview`                                                                           |
| `npx playwright test -c playwright.landing.config.ts` | 0    | **44/44 passed**, 1 worker, 114,234 ms; 0 unexpected, 0 flaky, 0 skipped                                                                                                              |
| `npm run build` (public `embarcarte`)                 | 0    | 96 prerendered routes; 330 files / 7,865,948 bytes; no landing identifier in `dist/embarcarte`                                                                                        |
| `npm run check:landing:data`                          | 0    | `MC-18 generated artefacts are current (12 files)`                                                                                                                                    |
| `npm run format:check`                                | 0    | `All matched files use Prettier code style!`                                                                                                                                          |
| `npm run test:landing` (post-D21, §8)                 | 1    | **58/60** PASS; only `MC18-51` and `MC18-54` remain (D22/D23 pending, Lead-owned)                                                                                                     |

The four initial failures are delivery artefacts, not implementation defects: they test for the
existence of the independent review, the review-findings dataset, the Spanish executive report and
the final delivery record. After D21 lands, `MC18-44` and `MC18-53` pass; `MC18-51` and `MC18-54`
stay red only because D22 and D23 do not exist yet. They must not be read as MC-18 regressions.

### 2.3 Independent adversarial reproduction

The auditor reproduced **37 mutations** against the real guard functions in
`scripts/marea-landing-guards.mjs`, `src/app/marea-landing/models/publication-gates.ts` and
`src/app/marea-landing/data/domain.generated.ts` (not against copies): **37/37 rejected, 0 missed**;
the positive control (untouched official values) passed all five policy helpers. This is stronger
than the required minimum of ten.

| #   | Mutation applied                                     | Rejection signal observed                      |
| --- | ---------------------------------------------------- | ---------------------------------------------- |
| 1   | `/marea` route added to the public router            | `src/app/app.routes.ts: references MAREA`      |
| 2   | `/en/marea` route added to the public router         | `references MAREA`                             |
| 3   | `/marea` sitemap entry                               | `public/sitemap.xml: references MAREA`         |
| 4   | MAREA asset copied into `public/`                    | `public/marea-hero.svg`                        |
| 5   | Preview build output redirected to `dist/embarcarte` | `preview writes into the production output`    |
| 6   | Public navigation changed (out of scope)             | `src/app/layout/header.ts`                     |
| 7   | Canonical link emitted                               | `canonical link`                               |
| 8   | Reciprocal hreflang emitted                          | `alternate hreflang link`                      |
| 9   | Product/Offer JSON-LD emitted                        | `json-ld script`                               |
| 10  | Open Graph announcement emitted                      | `open graph meta`                              |
| 11  | Preview noindex disabled                             | `missing robots meta`                          |
| 12  | Preview bound to `0.0.0.0`                           | `not bound to 127.0.0.1`                       |
| 13  | Purchase button rendered                             | `BUTTON_CONTROL` violation                     |
| 14  | Lead form rendered                                   | `FORM` / `INPUT` violation                     |
| 15  | Telemetry fetch imported                             | `FETCH_OR_XHR` violation                       |
| 16  | Fictional price rendered                             | `PRICE_AMOUNT` violation                       |
| 17  | Fictitious inventory rendered                        | `STOCK_OR_ORDER` violation                     |
| 18  | Fabricated NMEA 2000 + CE certification              | `CERTIFICATION` violation                      |
| 19  | AIS transmission claimed                             | `TRANSMISSION` violation                       |
| 20  | Autonomous PILOT operation claimed                   | `AUTONOMY_OR_GUARANTEE` violation              |
| 21  | Guaranteed WATCH alerts claimed                      | `AUTONOMY_OR_GUARANTEE` violation              |
| 22  | Unlicensed charts represented as included            | `LICENSED_DATA_INCLUDED` violation             |
| 23  | Registered trademark claimed                         | `REGISTERED_TRADEMARK` violation               |
| 24  | Code-ownership claim                                 | `OFFICIAL_SECURITY_OR_PRIVACY_CLAIM` violation |
| 25  | FLEET default hardware asserted                      | `FLEET includes default hardware`              |
| 26  | FLEET SLA asserted                                   | `FLEET has an established SLA`                 |
| 27  | FLEET orderable asserted                             | `FLEET is orderable`                           |
| 28  | Internal banner removed                              | `banner not composed`                          |
| 29  | PILOT limitation removed in EN                       | `PILOT: limitation missing a locale`           |
| 30  | Duplicate EN product identity                        | `NAV`                                          |
| 31  | Limitation without negation                          | `es lacks a negation`                          |
| 32  | Design-system selector duplicated                    | `marea-button`                                 |
| 33  | Critical disclaimer hidden at mobile width           | `limited content hidden at mobile width`       |
| 34  | Keyboard focus outline removed                       | `outline removed without focus-visible`        |
| 35  | Hydration mismatch recorded                          | `hydration console errors recorded`            |
| 36  | Deployment-only approval used to publish             | `publishable=false` + blocking gate ids        |
| 37  | Public entry imports the landing preview             | forbidden-reach offender reported              |

### 2.4 Preview HTTP probes (built server, `127.0.0.1:4302`)

Stale preview node processes were killed before starting the freshly built server; the server was
stopped afterwards, and the production server was stopped after its probe (no listener remained).

| Probe                                                                      | Observed                                                                                                                |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `GET /marea`                                                               | 200; `<html lang="es-ES">`; 316,049 bytes; one `<h1>`; 10 section hosts; 9 family cards; 6 bundle cards; banner present |
| `GET /en/marea`                                                            | 200; `<html lang="en">`; 313,958 bytes; one `<h1>`; 10/9/6; banner present                                              |
| Canonical / hreflang / `og:` / `twitter:` / JSON-LD                        | absent in both locales                                                                                                  |
| `X-Robots-Tag`                                                             | `noindex, nofollow, noarchive` on both locales, on 404s and on `/__preview/health`                                      |
| `<meta name="robots">`                                                     | `noindex, nofollow, noarchive`                                                                                          |
| `<base href>`                                                              | `/`; EN `main.js` resolves to `/main.js` → 200 (1,851,787 bytes) so EN assets load and hydrate                          |
| Unknown paths (`/marea/unknown`, `/en/marea/unknown`, `/unknown`, `/nope`) | 404 with `X-Robots-Tag`                                                                                                 |
| Forged `Host: evil.example`, `evil.example:4302`, `embarcarte.com`         | 403                                                                                                                     |
| Allowed `Host: localhost:4302`, `127.0.0.1:4302`                           | 200                                                                                                                     |
| Forms / inputs / `mailto:` / `tel:` / external URLs                        | 0 / 0 / none / none; no `Set-Cookie`; CSP `default-src 'self'`, `form-action 'none'`, `connect-src 'self'`              |

The rendered visible text of both locales was independently scanned for the prohibited claim
families (price amount, stock/order, delivery date, certification/CE/NMEA 2000/CRA, autonomy,
guarantee, collision avoidance, SLA, licensed charts/official weather data, AIS transmission,
testimonials/market leader, registered trademark, ownership, GDPR). Every hit was a limitation
sentence with an explicit negation ("AIS reception does not transmit…", "no autonomous steering…",
"no guaranteed alerts…", "not licensed…", "no established SLA…"); no positive prohibited claim was
rendered. The guard scan over all 174 blocks × 2 locales returned **0 violations**.

### 2.5 Public production build isolation

`npm run build` exit 0, 96 prerendered routes. Binary scan of all **330 files / 7,865,948 bytes**
in `dist/embarcarte` for `marea-landing`, `data-marea-landing`, `marea-landing-preview` and
`MareaLanding`: **0 occurrences in 0 files**. Production styles are exactly `["src/styles.scss"]`;
the preview token CSS is listed only on `marea-landing-preview`. The built production server
(`PORT=4398`, temporary `DATA_DIR`) returned **404** for `/marea` and `/en/marea` and 200 for `/`
and `/en`; both 404 bodies are the public not-found page with no landing marker. The public entry
files are unchanged in name/size from the recorded evidence (`main-RFVWCSHZ.js` 12,870 bytes,
`styles-4YSTMKXDD.css` 25,415 bytes).

### 2.6 Evidence and data integrity checks

- `check:landing:data` exit 0: 12 generated artefacts current; generation is deterministic.
- Independent re-derivation from `docs/marea/commerce-data/data/*.json` and
  `docs/marea/legal-commercial/data/*.json` matches `domain.generated.ts`: 9 families, 26
  editions, 6 bundles, 11 readiness dimensions, 13 release gates / 0 closed, 24 required
  documents / 0 executed, 42 catalogued claims / 0 public-authorized, 0 approved prices, 0
  merchantable editions, 0 merchant SKU codes, 0 stock rows, 0 tested compatibility rows, 0
  bundles with fixed price, 0 with default hardware, 0 with SLA. Per-family edition counts are
  `2/2/2/3/8/2/2/2/3`; every family/bundle state is `NOT_FOR_SALE`; FLEET is
  `contractedSolution=true`, `hardwareIncludedByDefault=false`, `slaEstablished=false`,
  `orderable=false`, `priceApproved=false`.
- Kit expansion is nested on the kit line (`PROTECT` line `PR-02` → `SENSE-POWER,SENSE-BILGE`)
  and is not also counted as a top-level component; no bundle double-counts a kit.
- Content: **174 unique blocks / 348 locale records**; all 174 carry
  `publicationStatus=INTERNAL_DRAFT_NOT_APPROVED` and `approvalStatus=NOT_APPROVED`, resolve at
  least one evidence id and have non-empty ES/EN text. 13 evidence ids, all source paths exist,
  no unresolved and no unused id. Parity: 0 numeric mismatches, 0 placeholders, 0 suspected
  untranslated Spanish. All 9 families have 2 bilingual limitations; all 6 bundles have 2
  bilingual constraints; all constraint statements contain a negation.
- Design-system reuse: 18/18 direct imports match `design-system-dependencies.json`, no missing
  or extra module, no parallel component library, no selector collision with the MC-17 registry,
  and `git diff` for `src/app/marea-design-system` is empty.
- Screenshots: the 8 committed PNGs and the 8 Playwright baselines match the recorded SHA-256
  and byte sizes exactly (8/8 committed, 8/8 baselines). **3/8** repeat captures are
  byte-identical; **5/8** (ES 768/1440, EN 390/768/1440) are not, and all five are recorded with
  both hashes in `summary.unstableCaptureDetails`; the pixel comparison reports 0 mismatches at
  `maxDiffPixelRatio 0.001`. A second independent e2e run reproduced the same 8 committed
  hashes and the same 5 unstable captures (only `measuredAt` changed). This is honest evidence:
  instability is disclosed rather than hidden, and the committed image is the first capture.

## 3. Claims checked against the repository

| #   | Claim                                                                                                                                                                                               | Status   | Evidence                                                                                                                            |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1   | One locale-aware 10-section Angular landing at `src/app/marea-landing/`, rendered only by the isolated preview app                                                                                  | VERIFIED | single `MareaLanding` tree with 10 section components; production import graph has no landing edge; `dist/embarcarte` 0 identifiers |
| 2   | MC-17 design system reused, not forked (`src/app/marea-design-system` unchanged vs base)                                                                                                            | VERIFIED | empty diff; 18/18 direct imports; no selector collisions                                                                            |
| 3   | 9 families / 26 editions / 6 bundles from a generated read-only projection; no price/stock/SKU/purchase/lead/customer/vessel data                                                                   | VERIFIED | data re-derivation; 0 commercial fields in projection; 0 forms/inputs; no HTTP client                                               |
| 4   | PILOT supervised-only, AIS receive-only, WATCH no-guarantee, FLEET contracted/no default hardware/no SLA, SENSE kit not double-counted, DISPLAY no invented dimensions, NAV/WEATHER unlicensed data | VERIFIED | negated limitation copy in both locales; projection facts; kit expansion nested; no dimensions found                                |
| 5   | 174 evidence-provenanced bilingual blocks with `INTERNAL_DRAFT_NOT_APPROVED`                                                                                                                        | VERIFIED | 174/174 statuses and evidence; parity clean                                                                                         |
| 6   | SEO planning only: no canonical/hreflang/OG/Twitter/JSON-LD/sitemap emitted; preview noindex                                                                                                        | VERIFIED | raw SSR probes; `emitted` flags; validator MC18-25/26/27; Host allowlist                                                            |
| 7   | Activation requires all gates AND a release authorization record that does not exist                                                                                                                | VERIFIED | `LANDING_RELEASE_AUTHORIZATION = null`; 10 unsatisfied gates; adversarial mutation #36 rejected                                     |
| 8   | Fail-closed publication gates; all external approvals false                                                                                                                                         | VERIFIED | `publication-gates.json`; claims/gates datasets; governance flags                                                                   |
| 9   | No route in `app.routes.ts` / `locale-routes.ts` / `server.ts`; no sitemap/nav/style/bundle change                                                                                                  | VERIFIED | empty diffs; validator MC18-28/29/30/32/33; production 404 probes                                                                   |
| 10  | Public site non-regression and zero landing bytes in `dist/embarcarte`                                                                                                                              | VERIFIED | production build + binary scan + public route probes                                                                                |
| 11  | SSR + hydration genuinely tested; 10 sections; responsive 320–1440 both locales without page-level overflow; keyboard/focus; axe 0 serious/critical; banner always visible                          | VERIFIED | 44/44 Playwright; SSR evidence PASS; responsive 12 runs/0 overflow; axe 0/0/0/0; banner assertions at every width                   |
| 12  | Inherited debt preserved (`FINANCIAL_V18`, `MC16_FINAL_02`, `MC13 F-05/F-11/F-14`, `MC15 GSC-01/GSC-02`)                                                                                            | VERIFIED | MC-17 blocker register unchanged; all statuses still open; no predecessor file changed                                              |
| 13  | No merge/deploy/publication, `MC19_STARTED=false`, no segment/enquiry flow                                                                                                                          | VERIFIED | local branch with no upstream; no merge commit; no deploy artefact; `mc19Started=false`; no form/endpoint/flow                      |

No claim in the list is contradicted by the code. The residual gaps are external approvals and
evidence-strength limits, recorded in §6–§7.

## 4. Findings

### MC18-IR-01 — MINOR — Documents still describe the pre-freeze worktree

- **findingId:** MC18-IR-01
- **severity:** MINOR
- **area:** Documentation accuracy / frozen-state reconciliation
- **file:** `docs/marea/landing/MC-18-BASELINE-AND-GOVERNANCE.md`, `MC18-LANDING-ARCHITECTURE.md`, `MC18-ANGULAR-SSR-AND-HYDRATION.md`, `MC18-SEO-METADATA-AND-INDEXATION-CONTRACT.md`, `MC18-LEGACY-SITE-NON-REGRESSION.md`
- **lineOrRange:** D01 §2.3–2.4; D02 §8/§10; D08 §3.1–3.2; D09 §9.5/§11; D14 §1/§2.1/§2.3/§6
- **evidence:** At the frozen commit the validator reports 56/60 (not 55/60), `format:check` exits 0 (not 1), HEAD is committed `ca64ec7` and `src/app` contains only new landing files (not an uncommitted/empty diff), and the SSR byte counts are 316,049/313,958 (not 315,629/313,904). The affected documents describe authoring-time observations, not the frozen state.
- **reproduction:** `npm run test:landing`; `npm run format:check`; `git rev-parse HEAD`; `git diff --name-only 6002c49..HEAD -- src/app`; HTTP probes against the freshly built preview.
- **requiredCorrection:** D23 must record `ca64ec7` and the frozen command results and explicitly supersede these authoring-time snapshots; alternatively update D01/D02/D08/D09/D14 before delivery. No source change is required.
- **owner:** docs-a (documents group A) + Lead for D23
- **status:** OPEN
- **correctionCommit:** null
- **independentReverification:** not applicable while OPEN; D23 is pending.

### MC18-IR-02 — MINOR — Evidence descriptor misstates the canonical page type

- **findingId:** MC18-IR-02
- **severity:** MINOR
- **area:** Content evidence provenance
- **file:** `src/app/marea-landing/content/evidence.ts` (lines 74–79) and the generated `docs/marea/landing/data/content-evidence.json` (lines 60–64)
- **lineOrRange:** `EV-MC15-ROUTES.establishes`
- **evidence:** The descriptor says the canonical dataset "establishes … `PAGE_MAREA_OVERVIEW`", but `docs/marea/information-architecture/data/proposed-routes.json` `items[0].pageType` is `HUB_OVERVIEW`, and `models/page-identity.ts` correctly uses `HUB_OVERVIEW`. D09 §2 already records the inconsistency as informational; the descriptor itself remains factually inaccurate. Validator `MC18-45` passes only because the typed identity is right, not because the evidence text is.
- **reproduction:** read `evidence.ts`; run `node -e` over `proposed-routes.json` (`items.find(r => r.routeId === 'mareaOverview').pageType` → `HUB_OVERVIEW`); read the generated `content-evidence.json`.
- **requiredCorrection:** change the `establishes` text to `HUB_OVERVIEW` (optionally noting the master-prompt label), regenerate the dataset with `npm run build:landing:data`, or explicitly annotate the master-prompt label inside the string. Do not edit the canonical MC-15 dataset.
- **owner:** MC-18 content owner + docs owner
- **status:** OPEN
- **correctionCommit:** null
- **independentReverification:** not applicable while OPEN.

### MC18-IR-03 — MINOR — Preview listener starts on module import and during `ng build`

- **findingId:** MC18-IR-03
- **severity:** MINOR
- **area:** Preview tooling / build portability
- **file:** `preview/landing/server.ts`
- **lineOrRange:** lines 95–103 (`app.listen` is top-level; the `if (isMainModule(import.meta.url))` block is empty)
- **evidence:** `npm run build:landing:preview` prints the runtime banner `MC-18 internal landing preview (NOT PUBLISHED): http://127.0.0.1:4302/marea`, proving the Angular build evaluates the server entry and reaches `app.listen` during the build. On this Windows host the build still exits 0 (duplicate-bind tolerance), but on a host that does not tolerate a second bind the build can fail with `EADDRINUSE` when 4302 is occupied. The preview server should listen only when executed as the main module.
- **reproduction:** with port 4302 free, run `npm run build:landing:preview` and observe the startup lines in the build output; `node dist/marea-landing-preview/server/server.mjs` still serves correctly.
- **requiredCorrection:** move `app.listen(...)` and its log lines inside the existing `isMainModule` guard (keep the `reqHandler` export). Isolation behaviour is otherwise correct.
- **owner:** preview implementation owner
- **status:** OPEN
- **correctionCommit:** null
- **independentReverification:** not applicable while OPEN.

### MC18-IR-04 — INFORMATIONAL — Inherited debt label variance (`OPEN_INHERITED` vs `INHERITED_OPEN`)

- **findingId:** MC18-IR-04
- **severity:** INFORMATIONAL
- **area:** Inherited debt / documentation consistency
- **file:** `docs/marea/design-system/data/blocker-register.json`, `docs/marea/design-system/MC17-SPANISH-EXECUTIVE-REPORT.md`, `docs/marea/landing/MC-18-BASELINE-AND-GOVERNANCE.md` §8
- **lineOrRange:** register entry `FINANCIAL_V18` (status `OPEN_INHERITED`); report line `FINANCIAL_V18 = INHERITED_OPEN`; MC-18 summaries use `INHERITED_OPEN`
- **evidence:** Both spellings describe the same open inherited gate; `MC16-FINAL-02`/`MC16_FINAL_02` also differ only by separator notation. All inherited items remain open and no predecessor file changed.
- **reproduction:** `grep` the register and the MC-17/MC-18 documents.
- **requiredCorrection:** none required for MC-18; future documentation should use the register vocabulary or state the mapping.
- **owner:** docs owners (pre-existing, inherited)
- **status:** ACCEPTED_LIMITATION
- **correctionCommit:** null
- **independentReverification:** register re-read at `ca64ec7`; predecessor docs diff empty.

### MC18-IR-05 — INFORMATIONAL — Preview root alias not listed in the isolation dataset

- **findingId:** MC18-IR-05
- **severity:** INFORMATIONAL
- **area:** Preview isolation dataset completeness
- **file:** `preview/landing/app.routes.ts`, `docs/marea/landing/data/preview-isolation.json`
- **lineOrRange:** `app.routes.ts:14` (`{ path: '', … }`); `preview-isolation.json` → `data.previewOnlyRoutes`
- **evidence:** The preview serves `/` as a developer alias for the ES landing (documented in D02 §2.2 and D08 §3.2 and covered by the same loopback/Host/noindex controls), but `previewOnlyRoutes` lists only `/marea` and `/en/marea`. This is a documentation/data-completeness gap, not a publication risk: the alias is loopback-only, noindexed and never mounted in the public app.
- **reproduction:** `GET http://127.0.0.1:4302/` → 200 ES landing; read `preview-isolation.json`.
- **requiredCorrection:** none required for internal scope; if the alias is kept, add it to the isolation dataset as a documented developer alias in a future data regeneration.
- **owner:** preview/data owner
- **status:** ACCEPTED_LIMITATION
- **correctionCommit:** null
- **independentReverification:** HTTP probe and dataset read at `ca64ec7`.

## 5. What zero axe violations means — and does not mean

The axe run (`@axe-core/playwright`, axe-core 4.11.4, tags `wcag2a`, `wcag2aa`, `wcag21a`,
`wcag21aa`, `wcag22aa`) returned **0 critical / 0 serious / 0 moderate / 0 minor** violations for
ES and EN at 1440×900 and 390×844, after hydration and after finite entrance animations settled.
The suite fails on any serious or critical violation and records the rest.

It means: the automated rules selected did not detect a serious or critical accessibility failure
in Chromium on the settled page. It does **not** mean WCAG 2.2 AA conformance, nor that the page
is usable with assistive technology. The run has one `color-contrast` "incomplete" result per
locale/viewport (composited/gradient backgrounds axe cannot resolve automatically) which was not
manually resolved; no screen reader, switch device, magnifier, voice control, real mobile hardware,
touch input, virtual keyboard, 200 % text scaling or non-Chromium browser was tested. Full manual
WCAG review remains required before any accessibility claim. The inherited MC-17 gap (Escape on
the nav toggle itself does not close the list) is documented and unchanged.

## 6. Evidence quality weaknesses found

1. The visual baselines were generated by the same QA run that compares against them; they are not
   an independent design review, and the 5/8 non-byte-identical repeat captures show sub-pixel
   instability. The dataset discloses both facts, so the evidence is honest, but it is weaker than
   a second-reviewer sign-off.
2. The accessibility evidence is automated-only and Chromium-only; contrast is incomplete, not
   verified.
3. The performance evidence is a single lab run over loopback with no throttling, no field data
   and no thresholds; it is descriptive, not a Core Web Vitals claim.
4. Hydration is proven in Chromium only, on a development configuration; the preview SSR is
   loopback-only, not a public host.
5. Several documents (finding MC18-IR-01) still quote authoring-time counts; they must not be
   cited as the frozen-state evidence until D23 reconciles them.
6. The preview server's top-level `app.listen` (finding MC18-IR-03) is a build-time side effect
   that reduces reproducibility on other platforms.

### 6.1 Test-suite assertion strength and weak assertions

The 44-test suite is not trivially passing. It asserts exact section hosts, exact family/bundle ids
and order, exactly one `h1`, SSR/CSR count equality, zero console errors, Tab reachability with a
visible focus ring, serious/critical axe failure, 12 responsive runs with page-level overflow
checks, and 8 screenshot comparisons against baselines. Its weak spots are:

1. **Parity is sampled, not exhaustive, in the browser suite:** the e2e test compares section
   headings/leads and 10 ES spot strings; full 174-block parity is covered by the unit suite and
   the validator, not by Playwright. This is acceptable because the browser test is a semantic
   smoke test, but it is not full-content parity evidence on its own.
2. **SSR section count uses `>= 10`** in `ssr-hydration.spec.ts`; the exact `10` contract is
   asserted separately in `content.spec.ts` (host order) and the validator, so the weaker
   inequality does not by itself prove the count.
3. **Axe runs at only two viewports per locale** (1440×900, 390×844); intermediate widths are not
   scanned.
4. **Visual baseline comparison is self-referential** (same QA run generates the baselines) and
   tolerates `maxDiffPixelRatio 0.001`; it proves stability, not design review.
5. **Responsive limitation visibility checks the `.limits` container**, not every limitation
   sentence individually (the text is inside those containers and the unit/validator checks test
   the copy, so the practical risk is low).
6. **Performance tests assert only descriptive lower bounds** (e.g. DOM elements > 500, body text >
   10,000) and intentionally assert no thresholds; they are not a performance gate.

None of these weaknesses changes the functional audit result; they bound what the evidence proves.

## 7. Residual risks and non-claims

- **External blockers remain, and are not MC-18 implementation defects:** trademark clearance
  `NOT_GRANTED` and public use `NO_GO`; source-IP/licensing not cleared; legal identity not
  verified; no approved price; no stock; no selected hardware; no conformity/CE/NMEA 2000/CRA
  evidence; no SLA; PILOT safety gate blocked; no customer evidence; no WCAG conformance; no
  Search Console/hosting/TLS/crawl evidence. The 13 MC-14 release gates are open, 0 closed; 24
  required documents, 0 executed; 42 claims, 0 public-authorized.
- **Publication is not authorized.** `LANDING_RELEASE_AUTHORIZATION = null`; the activation
  evaluator is fail-closed; the preview is loopback-only with a Host allowlist, noindex headers,
  CSP and no data collection; no sitemap/robots/canonical/hreflang/OG/Twitter/JSON-LD is emitted.
- **No merge, deployment, publication or MC-19 start:** the branch has no upstream, HEAD is the
  only MC-18 commit, no merge commit or deployment artefact exists, and
  `mc19-handoff-inputs.json` records `mc19Started: false`. No segment/enquiry flow exists (no
  form, input, endpoint or contact channel; the only mention is a negation).
- **Environment limits:** Windows host, Node 24, Chromium 156.0.8078.4, development preview build;
  Firefox/Safari, high-DPI, real devices, CDN/TLS and production caching were not exercised.
- **Preview alias:** `/` serves the ES landing as a documented developer convenience inside the
  loopback preview (MC18-IR-05); it is not a public route and noindex applies.
- **404 localisation:** the preview 404 page keeps `<html lang="es-ES">` even on EN unknown paths
  (documented in D08 as cosmetic); the status code, noindex header and no-landing body are correct.

## 8. Post-D21 validator re-run

After writing D21 and `docs/marea/landing/data/review-findings.json`:

- `MC18-44` PASS (dataset exists with its provenance envelope).
- `MC18-53` PASS (0 open BLOCKING/MAJOR; the 3 MINOR and 2 INFORMATIONAL findings do not gate it).
- `MC18-51` still FAIL — missing `MC18-SPANISH-EXECUTIVE-REPORT.md` (D22) and
  `MC18-FINAL-DELIVERY-RECORD.md` (D23). D21 now exists, so D21 is no longer the cause.
- `MC18-54` still FAIL — delivery record missing.
- Result: **58/60**, exit 1. Both remaining failures are Lead-owned pending delivery artefacts, not
  implementation or audit defects.

The tracked evidence files rewritten by the test/e2e runs were restored byte-for-byte from
`git archive HEAD` after measurement, so the only additions to the frozen tree are the two D21
deliverables. This is stated so the Lead can regenerate the validator evidence at delivery time.

## 9. Verdict

```text
MC18_INDEPENDENT_AUDIT_RECOMMENDATION = PASS_INTERNAL_LANDING_SCOPE
```

Rationale: all six audited claims are VERIFIED, no BLOCKING and no MAJOR finding is OPEN, the
implementation is isolated from the public application, the publication gates fail closed and the
public site is byte-isolated from the landing. The recommendation is limited to the internal
landing scope and is **not** a programme verdict, publication approval, legal clearance or WCAG
conformance statement.

The recommendation is conditional on the Lead completing D22 and D23 and reconciling MC18-IR-01
in D23; MC18-IR-02 and MC18-IR-03 should be corrected in the implementation/content before any
future publication milestone. External approvals (§7) must still close before any public use of
MAREA or any deployment. `MC18_PUBLICATION = NOT_AUTHORIZED`; `MC19_STARTED = false`.
