# MC-15 — Independent review of the Search Console evidence addendum (rounds 1–2)

Reviewer: independent non-authoring auditor (this reviewer did not author the addendum,
the dataset or the implementation).
Review dates: round 1 on 2026-11-02 (UTC; local 2026-11-03), round 2 re-verification on
2026-11-03 (probe at `2026-11-02T23:40:30.751Z`).
Scope: read-only verification of `MC15-SEARCH-CONSOLE-EVIDENCE.md` and
`data/search-console-evidence.json`, plus the satellite records they claim to update.
Publication, indexation request, sitemap submission, Search Console write, deployment
and MC-16 action: **not performed and not authorised**.

```text
MC15_SEARCH_CONSOLE_REVIEW_VERDICT = PASS
MC15_SEARCH_CONSOLE_REVIEW_ROUND   = 2
C-01                               = CLOSED_VERIFIED
C-02                               = CLOSED_VERIFIED
MC15_INTERNAL_IA_SEO_SCOPE         = PASS_INTERNAL_IA_SEO_SCOPE  (unchanged)
MC15_INDEXATION_EVIDENCE           = SEARCH_CONSOLE_VERIFIED_PARTIAL (24 URLs, not a census)
GSC-01                             = OPEN (pre-existing operational gap, outside MC-15 implementation)
GSC-02                             = OPEN (pre-existing operational gap, outside MC-15 implementation)
MC15_PUBLICATION                   = NOT_AUTHORIZED
MC15_LIVE_MIGRATION                = NOT_AUTHORIZED
MC16_STARTED                       = false
```

**Round 2 controls this record.** Sections 1–15 are the historical round-1 review and are
retained for provenance; they are superseded where they conflict with §16. Section 16
records the re-verification of C-01 and C-02 and the current verdict.

Round 1 found a **genuine, read-only capture** whose `capturedAt` and inspection fields
matched an author-side raw API capture file in `%TEMP%` (outside the repository, not
committed). Round 1 required revision because one dataset value was stale against the
live Search Console API at that time and because one adversarial mutation (a changed
verified canonical) was not rejected by the validator. Neither defect invented
indexation or closed a finding. Both corrections were applied by the Lead and are
re-verified in §16.

---

## 1. Commits, files and hashes inspected

> Round-1 snapshot. The hashes and byte counts in this section are the round-1 inputs;
> the round-2 inputs are in §16.1.

| Item | Value |
|---|---|
| Base commit | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Branch | `feature/marea-mc15-bilingual-ia-seo-migration` |
| HEAD at review | `b7ea3ac` (`docs(mc15): record independent PASS, executive report and final delivery`) |
| Previously audited implementation | `d1d7a1a` |
| Addendum doc | `docs/marea/information-architecture/MC15-SEARCH-CONSOLE-EVIDENCE.md` — sha256 `b843eb385dd120c942b451aa279b8f98dfd2e5654b5ae80323790a4ce262255d`, 8,459 bytes |
| Addendum dataset | `docs/marea/information-architecture/data/search-console-evidence.json` — sha256 `939ebb85e28fd37c610fd4fa7061c73ef500736ea6300f82f18f251ac1584ee4`, 21,238 bytes (matches `manifest.json`) |
| Contract | `MAREA-MC15-SEARCH-CONSOLE-EVIDENCE`, contractVersion `1.0.0` |
| Machine contract for this review | `MAREA-MC15-SEARCH-CONSOLE-REVIEW` |

Files read for this review:

- `MC15-SEARCH-CONSOLE-EVIDENCE.md`, `data/search-console-evidence.json`
- `data/url-evidence.json`, `data/current-urls.json`, `data/indexation-policy.json`,
  `data/risk-register.json`, `data/manifest.json`, `data/current-routes.json`
- `MC15-CURRENT-URL-AND-ROUTE-INVENTORY.md`, `MC15-SITEMAP-ROBOTS-INDEXATION-CONTRACT.md`,
  `MC-15-BASELINE-AND-GOVERNANCE.md`, `MC15-DATA-CONTRACT.md`,
  `MC15-EXISTING-URL-PRESERVATION-POLICY.md`, `MC15-MC16-HANDOFF.md`,
  `MC15-PHASED-SEO-MIGRATION-PLAN.md`, `MC15-SEO-RISK-AND-ROLLBACK-PLAN.md`
- `MC15-INDEPENDENT-REVIEW.md`, `MC-15-DELIVERY.md`, `MC15-EXECUTIVE-REPORT-ES.md`,
  `docs/marea/execution/DECISION-LOG.md`
- `scripts/check-marea-ia-seo.mjs`, `scripts/check-marea-ia-seo.test.mjs`

Corroborating raw capture: `%TEMP%/mc15-gsc-evidence-2026-11-02.json` (outside the
repository, not committed) — capturedAt `2026-11-02T22:59:35.213Z`, full response bodies
for the same 24 URLs plus sites/sitemaps, matching the dataset exactly. It was used only
to distinguish a genuine snapshot from invented evidence.

Working-tree note: the worktree was being edited by another actor while this review ran
(`MC-15-DELIVERY.md`, `MC15-EXECUTIVE-REPORT-ES.md` and `DECISION-LOG.md` changed after
the review started, and reference this review as pending). The addendum doc and dataset
did **not** change during the review (same mtime and hashes). The review therefore
judges the addendum files as read, and records the concurrent doc edits as a residual
observation (§12, R-02), not as addendum content.

The reviewer authored only these two files:
`MC15-SEARCH-CONSOLE-REVIEW.md` and `data/search-console-review.json`. No dataset,
implementation doc, script, route, sitemap, robots file or Git state was modified.

---

## 2. Access and property (verified)

Temporary probe script (outside the repo, `%TEMP%`), read-only scope:

```js
GoogleAuth({ keyFile: '<service-account key outside the repository>',
             scopes: ['https://www.googleapis.com/auth/webmasters.readonly'] })
// GET  /webmasters/v3/sites
// GET  /webmasters/v3/sites/sc-domain%3Aembarcarte.com/sitemaps
// POST /v1/urlInspection/index:inspect  { inspectionUrl, siteUrl: 'sc-domain:embarcarte.com', languageCode: 'es-ES' }
```

| Check | Fresh API result | Status |
|---|---|---|
| Service-account client e-mail | `guiatv-gsc@guia-tv-8fe3c.iam.gserviceaccount.com` (from the key file metadata; key material never printed) | VERIFIED |
| `sites.list` HTTP status | 200 | VERIFIED |
| `sc-domain:embarcarte.com` permission | `siteFullUser` | VERIFIED |
| `sc-domain:guiaprogramaciontv.com` | present, `siteOwner`, out of scope; not inspected | VERIFIED |
| Capture timestamp of this review | `2026-11-02T23:12:16.537Z` | — |
| Addendum capture timestamp | `2026-11-02T22:59:35.213Z` (matches the author's raw capture) | VERIFIED |
| Key stored in repo | no (key remains outside the repository; no key material or path is committed) | VERIFIED |

---

## 3. Sitemaps (fresh `sitemaps.list`, HTTP 200)

| Sitemap | Last submitted | Last downloaded | Submitted URLs | Warnings | Errors | Indexed field |
|---|---|---|---|---|---:|---:|---:|
| `https://embarcarte.com/sitemap.xml` | 2026-10-30T01:43:18.383Z | 2026-11-01T04:48:20.191Z | **98** | 0 | **0** | 0 |
| `https://embarcarte.com/` (invalid extra submission) | 2026-10-30T09:05:23.003Z | 2026-11-01T08:01:28.669Z | — | 0 | **1** | — |

Both rows match the addendum dataset and doc exactly. The `indexed: 0` value is recorded
as `indexedReported` only; it is **not** used as an index count anywhere in the addendum,
dataset, summary or satellite records (`GSC-03`). The doc's statement that the root URL
is submitted "as if it were a sitemap" and reports 1 error is correct (`GSC-02`).

---

## 4. URL Inspection — 24 URLs, fresh re-run

All 24 requests returned HTTP 200. Fresh totals: **16 PASS (indexed), 2 excluded by
noindex (`/carrito`, `/cuenta`), 5 not recognized, 1 discovered-not-indexed
(`/traslados`), 0 MAREA indexed**. The only difference from the addendum is the
`/traslados` coverage state, reproduced consistently on three additional inspections
(§12 R-04). Verdicts, canonicals and crawl timestamps match for all 24.

| URL | Dataset verdict | Dataset coverageState | Fresh verdict | Fresh coverageState | Result |
|---|---|---|---|---|---|
| `https://embarcarte.com/` | PASS | Enviada e indexada | PASS | Enviada e indexada | MATCH |
| `https://embarcarte.com/tecnologia` | PASS | Enviada e indexada | PASS | Enviada e indexada | MATCH |
| `https://embarcarte.com/tecnologia/navegador` | PASS | Enviada e indexada | PASS | Enviada e indexada | MATCH |
| `https://embarcarte.com/guias/que-es-signal-k` | PASS | Enviada e indexada | PASS | Enviada e indexada | MATCH |
| `https://embarcarte.com/experiencias` | PASS | Enviada e indexada | PASS | Enviada e indexada | MATCH |
| `https://embarcarte.com/traslados` | NEUTRAL | Google no reconoce esta URL | NEUTRAL | **Descubierta: actualmente sin indexar** | **VERDICT MATCH / COVERAGE DRIFT (C-01)** |
| `https://embarcarte.com/servicios` | PASS | Enviada e indexada | PASS | Enviada e indexada | MATCH |
| `https://embarcarte.com/sobre-nosotros` | PASS | Enviada e indexada | PASS | Enviada e indexada | MATCH |
| `https://embarcarte.com/contacto` | PASS | Enviada e indexada | PASS | Enviada e indexada | MATCH |
| `https://embarcarte.com/aviso-legal` | PASS | Enviada e indexada | PASS | Enviada e indexada | MATCH |
| `https://embarcarte.com/privacidad` | PASS | Enviada e indexada | PASS | Enviada e indexada | MATCH |
| `https://embarcarte.com/cookies` | PASS | Enviada e indexada | PASS | Enviada e indexada | MATCH |
| `https://embarcarte.com/condiciones-de-venta` | PASS | Enviada e indexada | PASS | Enviada e indexada | MATCH |
| `https://embarcarte.com/tienda` | PASS | Enviada e indexada | PASS | Enviada e indexada | MATCH |
| `https://embarcarte.com/en` | PASS | Enviada e indexada | PASS | Enviada e indexada | MATCH |
| `https://embarcarte.com/en/technology` | PASS | Enviada e indexada | PASS | Enviada e indexada | MATCH |
| `https://embarcarte.com/en/shop` | PASS | Enviada e indexada | PASS | Enviada e indexada | MATCH |
| `https://embarcarte.com/carrito` | NEUTRAL | Excluida por una etiqueta "noindex" | NEUTRAL | Excluida por una etiqueta "noindex" | MATCH |
| `https://embarcarte.com/acceso` | NEUTRAL | Google no reconoce esta URL | NEUTRAL | Google no reconoce esta URL | MATCH |
| `https://embarcarte.com/cuenta` | NEUTRAL | Excluida por una etiqueta "noindex" | NEUTRAL | Excluida por una etiqueta "noindex" | MATCH |
| `https://embarcarte.com/tienda/muestra/anemometro` | NEUTRAL | Google no reconoce esta URL | NEUTRAL | Google no reconoce esta URL | MATCH |
| `https://embarcarte.com/marea` | NEUTRAL | Google no reconoce esta URL | NEUTRAL | Google no reconoce esta URL | MATCH |
| `https://embarcarte.com/en/marea` | NEUTRAL | Google no reconoce esta URL | NEUTRAL | Google no reconoce esta URL | MATCH |
| `https://embarcarte.com/marea/nav` | NEUTRAL | Google no reconoce esta URL | NEUTRAL | Google no reconoce esta URL | MATCH |

Canonical fields: for all 16 PASS inspections, `googleCanonical == userCanonical ==
inspected URL`; `/carrito` keeps its self-canonical; `/cuenta` records
`userCanonical = https://embarcarte.com/acceso` while `googleCanonical` is
`https://embarcarte.com/cuenta` (login-guard redirect), exactly as `GSC-04` states.
All non-indexed rows return `null` canonicals, including `/traslados`; the addendum's
"self-canonical" claim for `/traslados` is therefore **not** from URL Inspection — it is
verified independently against the public page (§4.1).

### 4.1 Independent public verification of `/traslados` (read-only HTTP)

| Check | Result |
|---|---|
| `GET https://embarcarte.com/traslados` | HTTP 200 |
| Canonical | `<link rel="canonical" href="https://embarcarte.com/traslados">` — self-canonical |
| Robots | `<meta name="robots" content="index, follow, max-image-preview:large">` — indexable |
| Hreflang | `es` → `/traslados`, `en` → `/en/delivery` |
| `GET https://embarcarte.com/sitemap.xml` | HTTP 200, **98** `<loc>` entries, includes `/traslados`, no `/marea` URL |
| `GET https://embarcarte.com/marea` / `/en/marea` | HTTP 404 (proposed MAREA URLs not live) |

So `GSC-01`'s substantive claim — public, indexable, self-canonical, in the 98-URL
sitemap, **not indexed** — is verified. Its precise coverage label is stale (C-01).

---

## 5. Dataset against the fresh API

| Field | Dataset | Fresh API | Result |
|---|---|---|---|
| `property.siteUrl` | `sc-domain:embarcarte.com` | same | MATCH |
| `property.permissionLevel` | `siteFullUser` | same | MATCH |
| `property.credentialEmail` | `guiatv-gsc@…gserviceaccount.com` | same | MATCH |
| `property.capturedAt` | `2026-11-02T22:59:35.213Z` | author-side raw capture (outside repo) at exactly this time exists | VERIFIED, not invented |
| Inspection URL set | 24 unique | 24 unique, identical set | MATCH |
| Verdicts | 16 PASS / 8 NEUTRAL | 16 PASS / 8 NEUTRAL | MATCH |
| Coverage states | 24 values | 23 identical, `/traslados` drifted | **1 STALE (C-01)** |
| Canonical fields (PASS/noindex) | as recorded | identical | MATCH |
| `lastCrawlTime` | 16 values | identical | MATCH |
| Sitemap rows | 98/0, root 1 error, `indexed` 0 | identical | MATCH |
| Summary `inspectedUrls` / `indexedConfirmed` / `excludedNoindex` / `mareaIndexed` | 24 / 16 / 2 / 0 | 24 / 16 / 2 / 0 | MATCH |
| Summary `notRecognized` / `publicIndexableNotRecognized` | 6 / 1 | 5 / 0 (plus 1 discovered-not-indexed) | **STALE (C-01)** |
| Findings `GSC-01…GSC-05` | all present | — | PRESENT |
| `publicationAuthorized` / `liveChangeExecuted` / `MC16_STARTED` | false / false / false | — | VERIFIED |
| Limitations | 5 entries, partial-sample wording | — | VERIFIED |
| Key material / access token in dataset | none | — | VERIFIED |

The dataset is a faithful transcription of its own raw capture. The only stale value is
the `/traslados` coverage state (and the derived summary fields), because Search Console
advanced from "Google no reconoce esta URL" to "Descubierta: actualmente sin indexar"
between the capture and this review. `capturedAt` itself is not stale: it is the real
capture time.

---

## 6. Dataset / doc / satellite consistency

A deterministic cross-check script compared the addendum doc and 7 machine datasets:
**513 checks passed, 0 failed**. It covered:

- **Addendum doc v dataset:** all 24 markdown table rows parse from the doc; URL,
  verdict and coverageState match the dataset (curly-vs-straight quotes normalised);
  summary counts (24 / 16 / 2 / 6 / 1 / 0 / 98), sitemap table dates and error counts,
  the five findings, the no-full-census statement and the `NOT_AUTHORIZED` /
  `MC16_STARTED = false` statements.
- **`data/url-evidence.json`:** exactly 24 `SEARCH_CONSOLE_VERIFIED` records,
  `EV-GSC-001`…`EV-GSC-024`; every record has
  `evidenceSource = sc-domain:embarcarte.com (Search Console URL Inspection API)` and
  `observedAt = 2026-11-02T22:59:35.213Z`; each maps to a dataset inspection and its
  `status` / `coverageState` / `canonicalObserved` match (0 canonical mismatches).
- **`data/current-urls.json`:** 141 concrete URL records; exactly 21 carry a
  `searchConsole` enrichment whose `evidenceId` resolves to the matching inspection and
  whose URL/verdict/coverageState match; **no `/marea` current-URL record exists**
  (`https://embarcarte.com/marea`, `/en/marea`, `/marea/nav` are absent).
- **`data/indexation-policy.json`:** `searchConsoleObservation` records 24 inspected,
  16 indexed, 2 noindex, 6 not recognized, 0 MAREA indexed, 98 sitemap URLs, 0 errors,
  1 extra submission error, `SEARCH_CONSOLE_VERIFIED_PARTIAL`, five finding references.
- **`data/risk-register.json`:** `SEO-RISK-22` exists, status `OPEN`, describes the
  24-URL partial evidence and explicitly says no full census/coverage number may be
  invented.
- **`data/manifest.json`:** 19 datasets (addendum included), `sourceCommit` =
  base commit, `MC16_STARTED = false`, and the addendum entry's sha256/bytes match the
  file on disk (`939ebb85…`, 21,238 bytes).

---

## 7. Tests (exact results)

| Command | Result | Exit |
|---|---|---:|
| `npm run test:ia-seo` | `MC-15 IA/SEO validation passed: 20 datasets, 21 current routes, 23 proposed routes, 34 findings, 13 gates.` | 0 |
| `npm run test:ia-seo:unit` | `tests 62`, `pass 62`, `fail 0`, `cancelled 0`, `skipped 0`, `duration_ms ~1420` | 0 |
| Disposable validator, unmutated copy of the data | same validation-passed line | 0 |

The 4 new addendum unit tests (`rejects Search Console evidence without the verified
property`, `…without a capture timestamp`, `…proposed MAREA URL marked indexed`,
`…/traslados marked as indexed`) all pass.

---

## 8. Diff scope and safety checks

`git diff --name-only e0be1e4..HEAD` plus the uncommitted worktree diff:

- **No `src/`, `public/`, `.github/`, deployment, checkout or price changes.**
  The changed paths are `docs/marea/**`, `package.json` (test scripts only, no
  dependencies), and `scripts/check-marea-ia-seo.{mjs,test.mjs}`.
- Route/sitemap/robots-named changes are planning artefacts only:
  `data/current-routes.json` (adds `SEARCH_CONSOLE_VERIFIED_PARTIAL` metadata and a
  cross-reference), `MC15-SITEMAP-ROBOTS-INDEXATION-CONTRACT.md` and the addendum docs.
  No live route table, sitemap generator, `robots.txt` or redirect implementation
  changed.
- `MC16_STARTED = false` in every dataset that carries the field (20/20 checked); no
  `true` occurrence.
- `publicationAuthorized = false` in the addendum dataset and the review.
- Secret scan of all changed files and a repo-wide scan (excluding `node_modules`,
  `.git`, `dist`, `.angular`): **no** `private_key`, `BEGIN PRIVATE KEY`, `access_token`
  or `ya29.` match. The only `private_key` string is the validator's own guard at
  `scripts/check-marea-ia-seo.mjs:595`. The service-account key remains outside the
  repository (outside the working tree, never committed).

---

## 9. Round-1 independent adversarial mutations (historical; see §16.6)

A disposable copy of the validator, pointed at a disposable copy of the data directory
(`%TEMP%\mc15-mut`), was used so the real datasets were never modified. Baseline on the
unmutated copy passed. Exact mutation harness: `node %TEMP%\mc15-mut\apply-mutation.mjs
<id>` then `node %TEMP%\mc15-mut\check-marea-ia-seo.mjs`.

| # | Mutation | Expected reason | Observed | Exit |
|---|---|---|---|---:|
| M-01 | `/marea` marked PASS + indexed | proposed MAREA URL must not be indexed | **Rejected** `IA-071` (summary.mareaIndexed) + `IA-072` (proposed MAREA URL indexed) | 1 |
| M-02 | `/traslados` marked PASS + indexed | must be recorded as not recognized/not indexed | **Rejected** `IA-073` | 1 |
| M-03 | property changed to `https://example.test/` | must be `sc-domain:embarcarte.com` | **Rejected** `IA-071` | 1 |
| M-04 | `property.capturedAt` deleted | capture timestamp required | **Rejected** `IA-071` | 1 |
| M-05 | fake `SEARCH_CONSOLE_VERIFIED` record added and the addendum dataset removed | evidence requires the validated dataset | **Rejected**: `Error: Missing MC-15 datasets: search-console-evidence.json` | 1 |
| M-05b | fake record with `evidenceSource: https://example.test`, `observedAt: NOT_OBSERVED` | record must name the verified property and carry a real timestamp | **Rejected** `IA-018` | 1 |
| M-06 | `private_key` material inserted into the addendum dataset | no key material | **Rejected** `IA-071` | 1 |
| M-07 | raw sitemap `indexedReported` set to 98 (+ a `summary.sitemapIndexed: 98` field) | must not derive an index count from the sitemap field | **NOT REJECTED** — validation passed | 0 |
| M-07b | claim expressed as `summary.indexedConfirmed = 98` | summary must equal the 16 PASS inspections | **Rejected** `IA-071` (summary indexedConfirmed/notRecognized mismatch) | 1 |
| M-08 | home `googleCanonical` changed to `https://embarcarte.com/wrong-canonical` (mismatch) | PASS canonical must equal `userCanonical` and the inspected URL | **NOT REJECTED** — validation passed | 0 |
| M-08b | both `googleCanonical` and `userCanonical` changed to the wrong URL (self-consistent) | canonical must match the inspected URL | **NOT REJECTED** — validation passed | 0 |

The 8 requested mutations yield **6 clean rejections**. The two exceptions are recorded
as findings: **C-02** (the validator does not enforce canonical self-consistency for PASS
inspections, so M-08/M-08b pass) and **R-05** (the raw `indexed` value alone is not a
claim the validator can adjudicate; a claim in `summary.indexedConfirmed` is rejected,
and re-querying the API shows the real value is 0). The real datasets were not mutated.

---

## 10. Round-1 findings (historical; superseded by §16)

| ID | Severity | Status | Finding |
|---|---|---|---|
| GSC-01 | MAJOR (operational, pre-existing) | **OPEN** | `/traslados` is public, indexable, self-canonical and in the 98-URL sitemap but not indexed. Fresh Search Console reports `Descubierta: actualmente sin indexar` (discovered, not indexed), not the recorded `Google no reconoce esta URL`. Core finding valid; wording/counts stale. Outside the MC-15 implementation scope; must not be closed by MC-15. |
| GSC-02 | MINOR (operational, pre-existing) | **OPEN** | The home URL is submitted as an invalid sitemap and reports 1 error; `sitemap.xml` is 98/0. Fresh API confirms. No MC-15 implementation action. |
| GSC-03 | INFORMATIONAL | ACCEPTED | `sitemap.indexed = 0` is not a coverage count; the addendum/dataset do not use it as one. Verified. |
| GSC-04 | INFORMATIONAL | ACCEPTED | `/cuenta` noindex with `userCanonical = /acceso` due to the login guard; all 16 indexed pages are self-canonical. Verified. |
| GSC-05 | INFORMATIONAL | ACCEPTED | Canonical self-consistency holds for the 16 PASS inspections in the dataset. Verified against the fresh API; the validator does not yet guard it (C-02). |
| C-01 | MINOR | **OPEN** | Stale `/traslados` coverage state and derived counts. The addendum records `Google no reconoce esta URL` / `NOT_RECOGNIZED` / `sitemapCount: 0`; the live API returns `Descubierta: actualmente sin indexar`, sitemap membership 1, `crawledAs: CRAWLING_USER_AGENT_UNSPECIFIED`, no crawl. Verdict remains NEUTRAL and the URL is not indexed; the capture was genuine at 22:59:35.213Z. |
| C-02 | MINOR | **OPEN** | Validator does not reject a changed verified canonical (M-08/M-08b pass with exit 0), although the addendum doc §4 asserts canonical self-consistency for all 16 PASS inspections. |

No BLOCKING or MAJOR defect in the addendum's evidence exists. The two MINOR corrections
drive the `NEEDS_REVISION` verdict.

---

## 11. Limitations of this review

- Only the 24 addendum URLs were re-inspected; this is not a 98-URL census and no
  coverage, ranking, traffic or revenue claim is made.
- The Search Console API reflects Google's state at inspection time. The `/traslados`
  state changed between the addendum capture and this review; the correction is a
  refresh, not proof that the addendum was fabricated.
- Search Console UI exports (Coverage/Performance) were not used; only the read-only
  Webmasters and URL Inspection APIs.
- The validator mutation run used a disposable copy of the data directory and a
  disposable copy of the validator; the real datasets were not modified.
- The worktree was concurrently edited by another actor during the review; the review
  covers the addendum files and the state observed at `2026-11-02T23:12:16.537Z` plus
  the subsequent read-only checks.

---

## 12. Residual observations (not part of the required corrections)

- **R-01 — `sitemapCount` volatility.** The live API's `indexingResult.sitemap` array
  differs from the 22:59:35 capture for 10/24 rows (e.g. home 1→0, `/tecnologia` 0→1).
  The field is derived from the API and is not used in any addendum claim; refresh it
  with the same re-capture if C-01 is applied.
- **R-02 — Concurrent worktree edits.** `MC-15-DELIVERY.md`,
  `MC15-EXECUTIVE-REPORT-ES.md` and `DECISION-LOG.md` were edited by another actor
  during this review and repeat "6 not recognized"; they will also need the C-01
  refresh. The delivery record's line "Search Console addendum mutations additionally
  rejected" is not fully supported by this review's mutation set (the canonical
  mutations pass); reword it to name the rejected addendum mutations or add the C-02
  rule.
- **R-03 — Typographic only.** The addendum doc uses curly quotes for the noindex
  coverage state in two table rows; the dataset/API uses straight quotes. No factual
  difference.
- **R-04 — State transition confirmed.** `/traslados` was re-inspected three times after
  the main run; all returned `Descubierta: actualmente sin indexar` with sitemap
  membership and no crawl, so the drift is reproducible at review time, not a one-shot
  API fluke.
- **R-05 — Raw `indexed` field.** Mutating only `sitemap.indexedReported` to 98 is not
  rejected; that field is raw API data and the addendum does not convert it into a
  count. A claim in `summary.indexedConfirmed` is rejected (M-07b). If desired, the
  validator could assert that the addendum summary never contains a coverage total
  derived from the sitemap field (a documentation-level check cannot see the doc).

---

## 13. Round-1 corrections required (both applied; see §16.5–16.6)

**C-01 — refresh the `/traslados` inspection and its derived records (MINOR).**
Use a fresh read-only inspection and update:

1. `data/search-console-evidence.json` `GSC-URL-006`: `coverageState` =
   `Descubierta: actualmente sin indexar`; `classification` = `DISCOVERED_NOT_INDEXED`;
   `sitemapCount` = 1; `crawledAs` = `CRAWLING_USER_AGENT_UNSPECIFIED`; verdict stays
   `NEUTRAL`; canonicals stay `null`; `lastCrawlTime` stays `null`.
2. Same file `summary`: `notRecognized` = 5; add `discoveredNotIndexed` = 1; reword
   `publicIndexableNotRecognized` (or set 0/rename to `publicIndexableNotIndexed` = 1);
   keep `indexedConfirmed` = 16, `excludedNoindex` = 2, `mareaIndexed` = 0,
   `sitemapSubmittedUrls` = 98, `sitemapErrors` = 0.
3. Same file `findings[GSC-01].observation`: replace "Google no reconoce esta URL" with
   "Descubierta: actualmente sin indexar (discovered, currently not indexed)"; keep the
   finding `OPEN`, `MAJOR`, `POST_MC15`, outside MC-15 implementation scope.
4. `MC15-SEARCH-CONSOLE-EVIDENCE.md` §4 table row and summary, and §5 GSC-01: same
   update (5 not recognized + 1 discovered-not-indexed).
5. `data/url-evidence.json` `EV-GSC-006` (`coverageState`, `sitemapObserved`, notes) and
   `data/current-urls.json` `URL-DELIVERY-ES.searchConsole.coverageState`.
6. `data/indexation-policy.json` `searchConsoleObservation` (counts and note) and
   `data/risk-register.json` `SEO-RISK-22` mitigation.
7. Docs that repeat "6 not recognized": `MC-15-BASELINE-AND-GOVERNANCE.md`,
   `MC15-CURRENT-URL-AND-ROUTE-INVENTORY.md` §20, `MC15-SITEMAP-ROBOTS-INDEXATION-CONTRACT.md`,
   `MC15-MC16-HANDOFF.md`, `MC-15-DELIVERY.md`, `MC15-EXECUTIVE-REPORT-ES.md`,
   `DECISION-LOG.md` D-067.
8. Regenerate `data/manifest.json` sha256/bytes for every changed dataset and re-run
   `npm run test:ia-seo` and `npm run test:ia-seo:unit`.

Alternative if the team prefers to preserve the historical snapshot: keep the
2026-11-02T22:59:35.213Z observation unchanged but add a second, timestamped observation
for `/traslados` at the re-inspection time and label the summary as "as captured
22:59:35Z" so no present-tense claim contradicts the live API. Either way, the
document cannot keep asserting "6 not recognized" as the current result without the
timestamp qualifier.

**C-02 — strengthen the validator for canonical tampering (MINOR).**
Add to `scripts/check-marea-ia-seo.mjs` (inside the inspection loop) a rule equivalent
to:

```js
if (
  inspection.verdict === 'PASS' &&
  (inspection.googleCanonical !== inspection.userCanonical ||
   inspection.googleCanonical !== inspection.inspectionUrl)
) {
  add('IA-074', `${url} PASS canonical is not self-referential`);
}
```

and add unit tests for both a mismatch (`googleCanonical` wrong, `userCanonical`
correct) and a self-consistent-but-wrong canonical. M-08/M-08b then fail for the
intended reason.

---

## 14. Round-1 verdict (superseded by §16.10)

**Round-1 result: NEEDS_REVISION.** The addendum is a genuine read-only capture and its property,
sitemap rows, 24-URL set, verdicts, canonicals, crawl times, findings, limitations,
24 `EV-GSC-*` records, 21 current-URL enrichments, indexation-policy observation,
risk-register row and manifest hash all verify. It does not claim a full census and does
not authorise publication, live migration or MC-16. The internal IA/SEO planning scope
therefore remains **PASS**.

The round-1 revision was required for two MINOR defects:

1. **C-01** — the `/traslados` coverage state and the derived "6 not recognized" counts
   are stale against the live API at review time (now "Descubierta: actualmente sin
   indexar"). The substantive conclusion — `/traslados` is public, indexable,
   self-canonical, in the 98-URL sitemap and **not indexed** — remains true, and
   `GSC-01` must stay OPEN as a pre-existing operational finding outside MC-15.
2. **C-02** — a changed verified canonical passes the validator (M-08/M-08b), although
   the addendum asserts canonical self-consistency.

No evidence was invented; `capturedAt` and the raw capture are authentic. The external
evidence is **`SEARCH_CONSOLE_VERIFIED_PARTIAL`** (24 URLs, not a census),
`GSC-01`/`GSC-02` remain open, `MC15_PUBLICATION = NOT_AUTHORIZED`,
`MC15_LIVE_MIGRATION = NOT_AUTHORIZED`, and `MC16_STARTED = false`.

---

## 15. Reproducibility notes

- API commands are listed in §2; the probe and mutation scripts lived under `%TEMP%`,
  not in the repository. No key material was printed, copied or committed.
- Mutation harness: disposable validator copy with `DATA_DIR` overridden via
  `MC15_DATA_DIR`; disposable data copied from the repository before every mutation.
- Data/doc cross-check: deterministic script producing **513 passed / 0 failed**.
- The two output files of this review are `MC15-SEARCH-CONSOLE-REVIEW.md` and
  `data/search-console-review.json`; no other file was written by this reviewer.

---

## 16. Round 2 — re-verification of C-01 and C-02 (2026-11-03)

Round 2 is a fresh read-only pass over the corrected addendum. The reviewer wrote only
this file and `data/search-console-review.json`; no implementation, dataset, script,
route, sitemap, `robots.txt`, deployment or Git state was modified.

### 16.1 Inputs re-verified

| Item | Round-2 value |
|---|---|
| Addendum doc | `MC15-SEARCH-CONSOLE-EVIDENCE.md` — sha256 `92ac824458ca255fb3c48fc0b2546e1e86208f0548143e88f20853d7bd19eed1`, 8,810 bytes |
| Addendum dataset | `data/search-console-evidence.json` — sha256 `a94af8b604230ef2af148ee6bc46891f0f01ed5f754a7f47938df938e76d3d9d`, 22,085 bytes |
| Manifest entry | `search-console-evidence` sha256/bytes match the file on disk (`a94af8b6…`, 22,085 bytes) |
| Dataset capture | `2026-11-02T23:34:24.641Z` (Lead refresh); history retains `22:59:35Z` and `23:12:16Z` |
| Round-2 probe | `2026-11-02T23:40:30.751Z`, read-only Webmasters + URL Inspection API |
| Reviewed commit | `b7ea3ac` (base `e0be1e4`); the MC-15 worktree remains uncommitted |
| Contract | `MAREA-MC15-SEARCH-CONSOLE-EVIDENCE` / review `MAREA-MC15-SEARCH-CONSOLE-REVIEW` |

### 16.2 Live read-only Search Console re-run

| Check | Round-2 result |
|---|---|
| `sites.list` | HTTP 200; `sc-domain:embarcarte.com` = `siteFullUser`; the other visible property (`sc-domain:guiaprogramaciontv.com`, `siteOwner`) is out of scope |
| `sitemaps.list` | HTTP 200; `sitemap.xml` = **98 submitted, 0 warnings, 0 errors**; root URL extra submission = **1 error**; `indexed: 0` recorded only as raw data, never as a count |
| 24 URL inspections | HTTP 200 each: **16 PASS**, **2 noindex** (`/carrito`, `/cuenta`), **5 not recognized** (`/acceso`, sample, `/marea`, `/en/marea`, `/marea/nav`), **1 public/indexable but not indexed** (`/traslados`) |
| MAREA indexed | **0** |
| Dataset vs live | 24/24 verdicts match; the refreshed `/traslados` coverage state matches the live probe (`Google no reconoce esta URL`); no dataset drift at capture |
| Coverage wording | Volatile across captures; history records `Google no reconoce esta URL` (22:59Z), `Descubierta: actualmente sin indexar` (23:12Z) and `Google no reconoce esta URL` (23:34Z / 23:40Z) |

### 16.3 `/traslados` stable-fact verification

| Check | Result |
|---|---|
| Public page | `GET https://embarcarte.com/traslados` = HTTP 200 |
| Canonical | `<link rel="canonical" href="https://embarcarte.com/traslados">` — self-canonical |
| Robots | `index, follow, max-image-preview:large` — indexable |
| Hreflang | `es`, `en` present |
| Sitemap | `https://embarcarte.com/sitemap.xml` HTTP 200, **98** `<loc>`, includes `/traslados`; no `/marea` loc |
| Proposed MAREA URLs | `/marea` = HTTP 404 |
| Search Console | NEUTRAL, not PASS/indexed; dataset classification = `PUBLIC_INDEXABLE_NOT_INDEXED` |

The stable fact is therefore verified independently of the volatile coverage label:
public 200, indexable, self-canonical, in the 98-URL sitemap and **not indexed**. The
dataset now records the observed history rather than asserting a single timeless label.

### 16.4 Dataset and satellite audit

| Area | Result |
|---|---|
| Inspections | 24; 24 unique `inspectionId`; 24 unique `inspectionUrl` |
| Summary | `inspectedUrls 24`, `indexedConfirmed 16`, `excludedNoindex 2`, `notRecognized 5`, `publicIndexableNotIndexed 1`, `discoveredNotIndexed 0`, `mareaIndexed 0`, `sitemapSubmittedUrls 98`, `sitemapErrors 0`, `fullCensus false` |
| `/traslados` | `PUBLIC_INDEXABLE_NOT_INDEXED`; coverageStateHistory has all three observations with timestamps/sources; current coverageState matches the refreshed capture; verdict NEUTRAL; null canonicals/crawl |
| Findings | `GSC-01`…`GSC-05` present; `GSC-01`/`GSC-02` **OPEN**; `GSC-03`/`GSC-04`/`GSC-05` accepted informational |
| Limitations | 5 entries; explicitly not a full census; no ranking/traffic/revenue claim |
| `data/url-evidence.json` | 24 `SEARCH_CONSOLE_VERIFIED` records `EV-GSC-001`…`EV-GSC-024`; 24 unique ids and URLs; source `sc-domain:embarcarte.com (Search Console URL Inspection API)`; `observedAt 2026-11-02T23:34:24.641Z`; 0 PASS canonical mismatches |
| `data/current-urls.json` | 141 records; 21 `searchConsole` enrichments; all resolve to `EV-GSC-*`; 0 `/marea` current-URL records |
| `data/indexation-policy.json` | `searchConsoleObservation` 24/16/2/5/1/0/0/98/0/1; `SEARCH_CONSOLE_VERIFIED_PARTIAL`; findings GSC-01…05 |
| `data/risk-register.json` | `SEO-RISK-22` exists, `OPEN`, partial 24-URL evidence, no census/coverage invention |
| `data/manifest.json` | 19/19 dataset sha256/bytes match; `sourceCommit e0be1e4`; `MC16_STARTED false`; GSC entry matches |
| Console checks | **154 passed / 0 failed** (`node %TEMP%\mc15-reverify\data-checks.mjs`) |

### 16.5 C-01 — CLOSED_VERIFIED

The Lead replaced the stale single label with a stable classification plus a timestamped
history, and propagated the 16/2/5/1 counts:

| Check | Result |
|---|---|
| Dataset classification | `PUBLIC_INDEXABLE_NOT_INDEXED` (stable, not the volatile label) |
| Dataset history | 3 observations: 22:59Z `Google no reconoce esta URL`; 23:12Z `Descubierta: actualmente sin indexar`; 23:34Z `Google no reconoce esta URL` |
| Dataset summary | 16 indexed / 2 noindex / 5 not recognized / 1 public-indexable-not-indexed / 0 MAREA / 98 sitemap |
| Addendum doc | 24 rows; summary 5 not recognized + 1 public/indexable; no “6 not recognized”; GSC-01/GSC-02 preserved |
| D01 baseline governance | 16/2/5/1; `/traslados` public/indexable not indexed; no full coverage count |
| D02 current URL inventory §20 | 16/2/5/1; `/traslados` public/indexable not indexed; GSC-01 pre-existing operational gap |
| D09 sitemap/robots contract | 16/2/5/1; `/traslados` in sitemap but not recognized; GSC-01 operational gap |
| D17 MC-16 handoff | 16/2/5/1; `/traslados` public/indexable not indexed; no MC-16 authorization |
| D21 executive report | 16/2/5/1 in Spanish; GSC-01/GSC-02 recorded as operational debt |
| D22 delivery record | 16/2/5/1; GSC-01/GSC-02 recorded as operational debt |
| “6 not recognized” | 0 occurrences in the addendum + D01/D02/D09/D17/D21/D22 |

`C-01 = CLOSED_VERIFIED`. Two residual documentation inconsistencies remain outside the
specified correction set and are listed in §16.8; they do not restore the stale count in
the controlling documents and do not affect the indexation conclusion.

### 16.6 C-02 — CLOSED_VERIFIED

`scripts/check-marea-ia-seo.mjs` now enforces, for every `PASS` inspection:

```js
if (inspection.googleCanonical !== url || inspection.userCanonical !== url) {
  add('IA-074', `${url} indexed inspection canonical is not the inspected URL`);
}
```

This is equivalent to `googleCanonical === userCanonical === inspectionUrl`. The new unit
test (`rejects a verified indexed URL with a changed canonical (C-02)`) changes both
canonicals to a self-consistent wrong URL and asserts `IA-074`. Round-2 adversarial
mutations were run in memory against the real validator/data (no repository writes):

| Mutation | Expected | Observed | Exit |
|---|---|---|---:|
| M-08: `googleCanonical` = wrong, `userCanonical` correct | IA-074 | **Rejected** `IA-074` | 1 |
| M-08b: both canonicals = self-consistent wrong URL | IA-074 | **Rejected** `IA-074` | 1 |
| M-02: `/traslados` marked PASS/indexed | IA-073 | **Rejected** `IA-071`, `IA-074`, `IA-073` | 1 |
| M-07b: fake `summary.indexedConfirmed = 98` | IA-071 | **Rejected** `IA-071` | 1 |
| M-01: `/marea` marked PASS/indexed | IA-072 | **Rejected** `IA-071`, `IA-072`, `IA-074` | 1 |

`C-02 = CLOSED_VERIFIED`. The single added unit test covers the self-consistent-wrong
variant; the mismatch variant is covered by the same three-way equality predicate and by
M-08 above.

### 16.7 Exact commands and results

| Command | Result | Exit |
|---|---|---:|
| `npm run test:ia-seo` | `MC-15 IA/SEO validation passed: 20 datasets, 21 current routes, 23 proposed routes, 34 findings, 13 gates.` | 0 |
| `npm run test:ia-seo:unit` | `tests 63`, `pass 63`, `fail 0`, `cancelled 0`, `skipped 0` | 0 |
| `node %TEMP%\mc15-reverify\data-checks.mjs` | `DATA_CHECKS passed=154 failed=0` | 0 |
| `node %TEMP%\mc15-reverify\mutations.mjs` | baseline 0 errors; `MUTATIONS rejected=5/5` | 0 |
| `node %TEMP%\mc15-reverify\gsc-probe.mjs` | HTTP 200 for sites/sitemaps/24 inspections; counts 16/2/5/1; 0 MAREA | 0 |
| `git diff --name-only e0be1e4 -- src public .github` | empty | 0 |

### 16.8 Residual observations (not open C-01/C-02 corrections)

- **R-06 — Satellite wording.** `data/indexation-policy.json` (note),
  `data/risk-register.json` (`SEO-RISK-22` mitigation) and the global note in
  `data/current-urls.json` still describe `/traslados` as “discovered but currently not
  indexed” / “1 discovered-not-indexed URL”. The refreshed capture and controlling
  dataset use “not recognized” + `PUBLIC_INDEXABLE_NOT_INDEXED`; the counts (5 + 1) are
  correct. This is documentation wording only; no indexation claim changes. Recommend
  superseding wording in a future authorised docs change.
- **R-07 — Decision-log history.** `docs/marea/execution/DECISION-LOG.md` D-067 still
  records the original “6 not recognized” result. It is the historical decision entry
  from the 22:59Z capture and is outside the specified D01/D02/D09/D17/D21/D22
  correction set; no controlling current doc repeats it. Recommend a superseding
  decision note, not a rewrite of the historical entry.
- **R-08 — `sitemapCount` volatility.** The URL Inspection `sitemap` array is unstable
  (the refreshed `/traslados` shows length 0 even though the public sitemap contains it).
  The dataset records the API value; the substantive “in sitemap” fact is verified
  against `sitemap.xml` (§16.3). No addendum claim depends on `sitemapCount`.
- **R-09 — Coverage wording volatility.** `/traslados` coverage text moved between “not
  recognized” and “discovered, currently not indexed” across captures. The dataset now
  records the history; future captures may legitimately differ without changing the
  non-indexation conclusion.
- **R-10 — Sample size.** 24 URLs, not a 98-URL census. No coverage percentage,
  ranking, traffic or revenue claim is made.

### 16.9 Scope, safety and authorization

- No `src/`, `public/`, `.github/`, checkout, price, live route, redirect, sitemap
  generator or `robots.txt` implementation change. The only `package.json` diff is the
  MC-15 `test:ia-seo`/`format` script list; no dependency changed.
- `MC16_STARTED = false` in every dataset and in the manifest; the only `true` text is a
  negative unit-test description in `MC15-INDEPENDENT-REVIEW.md`.
- No key material or access token in the repository. The service-account key remains
  outside the repository; a precise scan for PEM blocks, `private_key`, `access_token`,
  `client_secret` and `ya29.` values found **no credential values**.
- No Search Console write, sitemap submission, re-indexing request, publication,
  deployment, live migration or Git write was performed.

### 16.10 Round-2 verdict

**PASS.** The two MINOR round-1 corrections are re-verified as applied:

1. **C-01 = CLOSED_VERIFIED** — stable `PUBLIC_INDEXABLE_NOT_INDEXED` classification,
   three-observation `coverageStateHistory`, 16/2/5/1 summary and the addendum +
   D01/D02/D09/D17/D21/D22 all state 5 not recognized + 1 public/indexable not indexed.
2. **C-02 = CLOSED_VERIFIED** — `IA-074` rejects both canonical-tampering variants;
   `test:ia-seo` passes and `test:ia-seo:unit` is 63/63.

`GSC-01` and `GSC-02` remain **OPEN** as pre-existing operational findings outside the
MC-15 implementation. The indexation evidence remains
`SEARCH_CONSOLE_VERIFIED_PARTIAL` (24 URLs, not a census). This PASS does **not**
authorize publication, sitemap submission, live migration or MC-16:
`MC15_PUBLICATION = NOT_AUTHORIZED`, `MC15_LIVE_MIGRATION = NOT_AUTHORIZED`,
`MC16_STARTED = false`.
