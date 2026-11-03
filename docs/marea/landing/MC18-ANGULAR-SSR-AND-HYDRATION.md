# MC-18 — Angular SSR and hydration (D08)

| Field       | Value                                                                                         |
| ----------- | --------------------------------------------------------------------------------------------- |
| Deliverable | D08 `MC18-ANGULAR-SSR-AND-HYDRATION.md`                                                       |
| Milestone   | MC-18/36 — internal MAREA corporate landing (EMBARCARTE)                                      |
| Owner       | docs-a (documentation owner, documents group A)                                               |
| Date        | 2026-11-03                                                                                    |
| Status      | `INTERNAL_VERIFIED` for the SSR probes below; hydration is cited from the QA evidence dataset |
| Publication | `NOT_AUTHORIZED`                                                                              |

This document records the SSR architecture of the isolated landing preview, the base-href
handling, exactly what was built and probed, the observed status codes and headers, the
deterministic-ID and browser-global safety properties, and the difference between measured
lab evidence and real field behaviour. **Hydration is cited from the QA dataset, not measured by
docs-a**: the dataset appeared during the session; see §5.
dedicated evidence dataset is owned by QA and does not exist yet (section 6).

## 1. SSR architecture

| Layer             | Implementation                                                                                                                                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Server engine     | `AngularNodeAppEngine` from `@angular/ssr/node` in `preview/landing/server.ts`                                                                                                                                                                                                             |
| HTTP host         | Express, with `x-powered-by` disabled and `trust proxy` false                                                                                                                                                                                                                              |
| Binding           | `127.0.0.1` only; port `4302` (overridable only by `MAREA_LANDING_PREVIEW_PORT`)                                                                                                                                                                                                           |
| Rendering         | Per-request server rendering: `app.routes.server.ts` declares `RenderMode.Server` for `''`, `marea`, `en/marea` and `**` (404)                                                                                                                                                             |
| Static files      | `express.static(dist/.../browser, { index: false, maxAge: 0, etag: false })` before the Angular engine                                                                                                                                                                                     |
| Request handling  | `angularApp.handle(req)` → `writeResponseToNodeResponse`; unmatched requests fall through to a plain 404                                                                                                                                                                                   |
| Root shell        | `PreviewShell` renders only `<router-outlet />`; route-scoped `LandingPreview` renders `<marea-landing [locale]>`                                                                                                                                                                          |
| Locale            | `app.routes.ts` route `data.locale` (`es` for `marea`, `en` for `en/marea`); `LandingPreview` reads it and passes it down; `MareaLanding` writes it into the single `MareaI18n` signal                                                                                                     |
| Document metadata | `LandingPreview` sets `Title`, `<html lang>` (`es-ES` / `en`), `data-marea-preview="internal-not-published"`, `robots`, `description` and `marea-publication` meta tags                                                                                                                    |
| Browser bootstrap | `main.ts` bootstraps `PreviewShell`; `main.server.ts` exports the server bootstrap function                                                                                                                                                                                                |
| Hydration         | `provideClientHydration()` in `preview/landing/app.config.ts`                                                                                                                                                                                                                              |
| Security headers  | Host allow-list (403 for non-loopback Host), `X-Robots-Tag: noindex, nofollow, noarchive`, `Cache-Control: no-store`, `Referrer-Policy: no-referrer`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, CSP with `form-action 'none'`, `connect-src 'self'`, `object-src 'none'` |

The SSR build reported **0 prerendered static routes** ("Prerendered 0 static routes") — this
is intentional: both preview locales are rendered per request, not prerendered, so the
preview proves per-request SSR.

## 2. Base href

The preview document `preview/landing/index.html` declares an explicit `<base href="/" />`
instead of relying on Angular's default base resolution. Both generated documents carry it:

- `dist/marea-landing-preview/server/index.server.html` → `<base href="/"/>`
- `dist/marea-landing-preview/browser/index.csr.html` → `<base href="/"/>`

Effect observed: the emitted asset references (`styles.css`, `main.js`) resolve from the
origin root, so the same document works on `/marea` and `/en/marea` (a relative resolution
against the current directory would resolve differently under `/en/marea`). The server also
serves static files with `index: false`, so `/` and `/marea` are handled by the Angular engine,
not by a directory index.

## 3. What was actually built and run

### 3.1 Commands and results

| Command                                             | Observed result                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run build:landing:preview`                     | **exit 0** in both runs; latest "Application bundle generation complete. [8.099 seconds]" (first run 10.350 s); output `dist/marea-landing-preview`; browser `main.js` 1.84 MB, `styles.css` 11.33 kB; server `main.server.mjs` 2.79 MB, `server.mjs` 1.99 MB, `polyfills.server.mjs` 497.88 kB (sizes from the first run; in-flight visual edits may change them); "Prerendered 0 static routes" |
| `node dist/marea-landing-preview/server/server.mjs` | started on `http://127.0.0.1:4302`; log: "MC-18 internal landing preview (NOT PUBLISHED)"; "Publication NOT_AUTHORIZED · indexation disabled · loopback only"                                                                                                                                                                                                                                     |
| `npx tsc -p preview/landing/tsconfig.json --noEmit` | exit 0                                                                                                                                                                                                                                                                                                                                                                                            |
| `npx tsc -p tsconfig.app.json --noEmit`             | exit 0                                                                                                                                                                                                                                                                                                                                                                                            |
| `npm run test:landing`                              | exit 1; **55/60** checks pass in the final run; `MC18-36` (real SSR landing) **PASS**, `MC18-25`/`26`/`27`/`59` **PASS**, `MC18-37` hydration **PASS**; the 5 remaining failures are other authors' pending artefacts (missing documents, performance/legacy/review datasets, delivery record)                                                                                                    |
| `npm run test:landing:unit`                         | exit 0; 45/45 pass                                                                                                                                                                                                                                                                                                                                                                                |

The server used for the probes below was started fresh **after** rebuilding, and stopped
afterwards (the previous stale server process was terminated first). No production server was
started and no network service was contacted beyond loopback.

### 3.2 Measured SSR probes

HTTP probes via Node `fetch` against `http://127.0.0.1:4302`:

| Path                             | Status  | Bytes   | `<html lang>`                      | `<title>`                                                                                               | `<h1>` count   | `data-landing-family` | `data-landing-bundle` | Internal banner | canonical / hreflang / `og:` / `twitter:` / JSON-LD |
| -------------------------------- | ------- | ------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------- | --------------------- | --------------------- | --------------- | --------------------------------------------------- |
| `/marea`                         | **200** | 315,629 | `es-ES`                            | `MAREA — ecosistema marino propuesto (vista interna, no publicada)`                                     | **1**          | **9**                 | **6**                 | 1               | 0 / 0 / 0 / 0 / 0                                   |
| `/en/marea`                      | **200** | 313,904 | `en`                               | `MAREA — proposed marine ecosystem (internal view, unpublished)`                                        | **1**          | **9**                 | **6**                 | 1               | 0 / 0 / 0 / 0 / 0                                   |
| `/nope`                          | **404** | 2,078   | `es-ES` (preview document default) | `MAREA — vista interna propuesta (no publicada)` (document default; 404 component does not set a title) | 1 (404 `<h1>`) | 0                     | 0                     | 0               | 0 / 0 / 0 / 0 / 0                                   |
| `/` (documented developer alias) | 200     | 315,629 | `es-ES`                            | same ES landing title                                                                                   | 1              | 9                     | 6                     | 1               | 0 / 0 / 0 / 0 / 0                                   |

Additional observed values:

- `<html lang="en" data-marea-preview="internal-not-published">` on `/en/marea`;
  `<html lang="es-ES" …>` on `/marea`.
- `<meta name="robots" content="noindex, nofollow, noarchive">` on every probe.
- `X-Robots-Tag: noindex, nofollow, noarchive` on `/marea`, `/en/marea`, `/nope` and `/`.
- Zero `<form>` elements, zero `€`, zero `$<digit>`, zero buy/reserve/cart controls on
  `/en/marea` (commercial-control scan).
- The rendered page contains 10 section components in document order (validator `MC18-03`
  PASS). Counting raw `<section>` tags is not a reliable section count because components
  legitimately nest semantic sections; the stable signal is the 10 section components plus the
  9/6 family/bundle markers.
- The probes were repeated against the final build after visual composition edits; byte
  lengths changed with the markup/CSS (earlier build: ES 311,821 / EN 310,098) while status,
  lang, title, h1 count, 9/6 markers, metadata absence and headers stayed identical.

The title/lang differences between locales, plus the 9/6 markers, demonstrate that SSR
renders the real localized landing rather than a static approximation.

### 3.3 Security headers observed

| Header                    | Observed                                                                                                                                                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `X-Robots-Tag`            | `noindex, nofollow, noarchive`                                                                                                                                                                                                       |
| `Content-Security-Policy` | `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; form-action 'none'` |
| `Cache-Control`           | `no-store` (set by middleware; not separately re-read in the probe)                                                                                                                                                                  |
| Host allow-list           | code allows `127.0.0.1:4302`, `localhost:4302`, `127.0.0.1`, `localhost`; other Host values receive 403 (code-verified, not probed)                                                                                                  |

## 4. Deterministic IDs and SSR/client agreement

- Section anchors are frozen constants (`#hero`, `#ecosistema`, `#familias`, `#arquitectura`,
  `#paquetes`, `#software-hardware`, `#profesionales`, `#documentacion`, `#disponibilidad`,
  `#cierre`). Heading ids used for `aria-labelledby` are static strings
  (`hero`, `ecosystem-heading`, `families-heading`, …).
- Content ids are authored, unique and stable; the validator rejects duplicates (`MC18-20`).
- Component/element ids in bundles and families derive from canonical ids
  (`bundle-START`, family ids), not from random values or array indices that could change
  between renderers.
- A source scan of `src/app/marea-landing/**/*.ts` found **no** `Math.random`, `Date.now`,
  `new Date`, `window`, `localStorage` or `sessionStorage`. Browser globals appear only in the
  preview host (`DOCUMENT` injection for `<html lang>` and the preview attribute), which is
  the SSR-safe Angular `DOCUMENT` token.
- Both server and client read the same route `data.locale` and the same content source, so the
  locale-dependent markup is produced by the same code on both sides.

## 5. Hydration evidence — QA dataset (cited, not re-measured here)

- Expected path: `docs/marea/landing/data/ssr-hydration-evidence.json` (owned by QA; listed in
  the MC-18 manifest).
- Status during this session: initially **PENDING/absent** (the first validator run failed
  `MC18-37` with `ssr-hydration-evidence.json missing`); QA then created the dataset, and the
  current validator run reports `PASS MC18-37`. The values below are cited from the dataset,
  not measured by docs-a.
- Generation method recorded in the dataset: `npm run build:landing:preview` then
  `npx playwright test -c playwright.landing.config.ts`; `measuredAt`
  `2026-11-03T11:26:45.070Z`; Chromium `156.0.8078.4` on `win32`.
- Recorded result: `data.hydration.status = PASS`, `consoleErrors = 0`, `duplicateDom = false`,
  `mismatch = false`. Per locale:
  - ES: `ssrSections = liveSections = 10`, `ssrFamilies = liveFamilies = 9`,
    `ssrBundles = liveBundles = 6`, `ssrH1 = liveH1 = 1`, `bannerVisible = true`,
    `heroHeadingStable = true`, `keyboardAfterHydration = true`; hydration log "Angular
    hydrated 674 component(s) and 3959 node(s), 0 component(s) were skipped".
  - EN: same counts and log shape, "674 component(s) and 3957 node(s), 0 component(s) were
    skipped".
- The dataset records its own limitations: Chromium-only (Safari/Firefox not executed), loopback
  preview only, development configuration with optimization disabled, and noindex/X-Robots-Tag
  as defence in depth rather than access control.
- docs-a did **not** run `npx playwright test -c playwright.landing.config.ts`; the e2e spec is
  `e2e/landing/ssr-hydration.spec.ts`. The independent audit should inspect the dataset and, if
  it wishes, re-run the suite; this document does not restate QA measurements as its own.

## 6. Lab evidence vs field behaviour

What was measured here is **lab evidence**:

- loopback HTTP on a single Windows machine, one Angular build, Chromium-capable Playwright
  not exercised by this author for hydration/performance;
- no network latency, CDN, TLS, compression, caching, service worker, mobile device thermal
  state or field traffic;
- byte counts are raw server bundle sizes from the build output, not transfer sizes after
  compression or budgets;
- status codes and headers prove routing, localization, noindex and metadata absence, not
  layout stability, interaction latency or Core Web Vitals.

Therefore this document does **not** claim LCP/INP/CLS, hydration time, field availability or
any performance grade. Those require the QA evidence sets (performance, responsive, visual,
accessibility, hydration) and, for real traffic, a later publication phase that MC-18 is not
authorised to start.

## 7. Known limitations / non-claims

- Hydration is verified by the QA dataset **cited in section 5** (Chromium only, dev
  configuration); it is not a field measurement and not a docs-a measurement. The preview does
  use `provideClientHydration()`.
- The 404 document reuses the preview index title; it does not set a dedicated 404 title. This
  is an observed cosmetic property, not a routing defect (status is 404).
- `/` is a developer-convenience alias documented as a preview artefact. It is not a public
  route and must not be published.
- Host allow-list enforcement (403), `Cache-Control` and the health endpoint were verified by
  code inspection, not by adversarial HTTP probes in this run; D13 (preview isolation) is the
  owner of the isolation evidence.
- No browser-level accessibility, responsive, visual or performance measurement is claimed in
  this document; the QA evidence documents (D10–D12) were still missing at the time of writing.
- The preview proves per-request SSR on loopback only. It is not a production deployment, not
  an indexable site and not a publication approval.
