# MC-21 — Security and isolation evidence

Milestone: MC-21/36. Implementation commit `f2609a8`, base `115a1ac`.
This document records the isolation contract and the executed proof. It is not a security
certification and clears no legal gate.

## 1. Isolation invariants (mechanism → file → proving check)

| # | Invariant | Mechanism | File | Proof |
| --- | --- | --- | --- | --- |
| I-1 | Catalogue renders only under an internal namespace | `CATALOG_PREVIEW_NAMESPACE = 'internal/catalog'` | `src/app/marea-catalog/models/catalog-identity.ts` | MC20-23 / MC21-10: 12 routes, all under `internal/catalog` or `en/internal/catalog` |
| I-2 | Fail-closed identity flags | every identity hard-codes `routeStatus: PROPOSED_INTERNAL_NOT_DEPLOYABLE`, `publicRouteRegistered:false`, `reservedPublicPathActivated:false`, `publicationAuthorized:false`, `indexationAuthorized:false`, `sitemapEligible:false`, `leadCapture:false` | same file | MC20-24 / MC21-09 |
| I-3 | Never prerendered | every preview route `renderMode: 'Server'` | `catalog-identity.ts`, `preview/landing/app.routes.server.ts` | MC20-23 asserts Server for all 12 |
| I-4 | No production route or entry reaches the catalogue | no import from `src/main.ts` / `app.routes*` / `server.ts` | `src/app/app.routes.ts`, `app.routes.server.ts`, `src/server.ts` | MC20-29 (86 production modules, 0 reach); verifier grep: 0 references |
| I-5 | No catalogue bytes in the public bundle | separate Angular project `marea-landing-preview` | `angular.json` | `npm run build` + grep of `dist/embarcarte/browser` (168 files, 0 identifiers) |
| I-6 | Loopback-only preview host | `127.0.0.1` bind, Host allowlist, DNS-rebinding rejection | `preview/landing/server.ts` | MC20-25 / preview E2E |
| I-7 | Non-indexable responses | `X-Robots-Tag: noindex,nofollow,noarchive`, `Cache-Control: no-store`, no canonical/hreflang/JSON-LD | `preview/landing/server.ts` | Playwright metadata assertions |
| I-8 | No form, storage or lead capture | CSP `form-action 'none'`, `frame-ancestors 'none'`; fail-closed commercial adapter | `preview/landing/server.ts`, `data/catalog-domain.ts` | MC20-26; E2E form count = 0 |
| I-9 | Sitemap/robots untouched | no catalogue path emitted | `src/server.ts`, `public/robots.txt` | MC20-35; verifier grep: 0 references |

## 2. Executed isolation proof (captain and verifier, not narrated)

| Check | Result |
| --- | --- |
| Production build | exit 0 — 96 prerendered routes, 168 browser files |
| Bundle grep `internal/catalog` | 0 |
| Bundle grep `data-marea-catalog` | 0 |
| Bundle grep `marea-catalog-page` | 0 |
| Bundle grep `WEATHER-STANDARD`, `SENSE-WIND`, `WATCH-CORE` | 0 |
| Route tables (`app.routes.ts`, `app.routes.server.ts`, `core/i18n/locale-routes.ts`) | 0 marea/weather/sense/watch catalogue references |
| `src/server.ts` | 0 catalogue references; sitemap built from prerendered paths only |
| `public/` (robots, sitemap) | 0 marea references |
| Reserved public paths `/marea/weather`, `/marea/sense`, `/marea/watch` (+ EN) | not registered, not prerendered |

Recorded binary false positive: the 3-letter token `ihm` appears twice in binary assets
(`og-image.png`, a Manrope `.woff2` font) as coincidental bytes. No `.js` bundle file contains it.
This was verified and recorded by the independent verifier, not suppressed.

## 3. Evidence-class and information-exposure controls

- Every content block carries an `evidenceClass` and at least one canonical source reference
  (MC20-12, MC21-03), so no claim is presented without provenance.
- No named data provider exists anywhere in the six-family content (MC21-04); the WEATHER copy uses
  "external uncontracted source" wording only, consistent with `providerRightsGranted = false`.
- No price, currency amount, stock, SKU, order, quote or lead capture exists in content or
  projection (MC21-05, MC20-14).
- No certification, NMEA 2000 compatibility, measurement-accuracy, SLA or forecast-accuracy claim
  exists (claim guard, MC20-15).

## 4. Limits of this evidence

- The Windows/Dsh environment confines nothing here by construction; isolation is achieved by the
  route table, project separation and reachability. A future accidental production import would be
  caught by the bundle-grep checks, not prevented at compile time.
- The claim guard is heuristic and rejects enumerated families plus tested variants, not every
  paraphrase. Recorded as residual risk R-06.
- Manual WCAG 2.2 AA and assistive-technology review are NOT_RUN (DBT-09).
