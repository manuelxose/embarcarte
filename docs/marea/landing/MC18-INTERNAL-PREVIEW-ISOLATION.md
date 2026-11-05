# MC18 — Internal Preview Isolation (D13)

| Field            | Value                                                                      |
| ---------------- | -------------------------------------------------------------------------- |
| Deliverable      | D13 — `MC18-INTERNAL-PREVIEW-ISOLATION.md`                                 |
| Milestone        | MC-18/36 — EMBARCARTE / MAREA internal bilingual corporate landing         |
| Owner            | docs-b                                                                     |
| Date             | 2026-11-03                                                                 |
| Status           | INTERNAL_PROPOSED (documentation deliverable; not a milestone verdict)     |
| Publication      | NOT_AUTHORIZED                                                             |
| Indexation       | DISABLED — `noindex, nofollow, noarchive`                                  |
| Repository state | HEAD `6002c49f898e755154c1b65c97781177719ce11c`, uncommitted MC-18 changes |

## 1. Purpose and scope

The MC-18 landing is an **internal preview**, not a published page. This document
records how that preview is isolated from the production application, from the
network and from any data collection: a separate Angular project, a separate
output directory, a loopback-only SSR server, a Host allowlist, security headers
and no production imports. It is not a claim that no other host can ever reach a
mistakenly exposed preview; the assumptions and limitations are stated in §8.

Source of truth: `preview/landing/`, the `marea-landing-preview` project in
`angular.json`, and the generated isolation dataset
`docs/marea/landing/data/preview-isolation.json` (contractId
`MC18-PREVIEW-ISOLATION`, version `1.0.0`, status `INTERNAL_PROPOSED`,
publicationStatus `NOT_AUTHORIZED`).

## 2. Separate Angular project

| Property                | Value                                                                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Project name            | `marea-landing-preview`                                                                                                          |
| Type                    | `application`                                                                                                                    |
| Root / sourceRoot       | `preview/landing`                                                                                                                |
| Prefix                  | `marea`                                                                                                                          |
| Builder                 | `@angular/build:application`                                                                                                     |
| Browser entry           | `preview/landing/main.ts`                                                                                                        |
| Index                   | `preview/landing/index.html`                                                                                                     |
| Server entry            | `preview/landing/main.server.ts`, SSR entry `preview/landing/server.ts`                                                          |
| Output mode             | `server` (SSR)                                                                                                                   |
| Output path             | `dist/marea-landing-preview`                                                                                                     |
| Styles                  | `preview/landing/styles.css`, `src/app/marea-design-system/tokens/generated/marea-tokens.generated.css`                          |
| Assets                  | `[]` (no raster images, no external assets)                                                                                      |
| `security.allowedHosts` | `127.0.0.1`, `localhost`                                                                                                         |
| Dev build               | `optimization: false`, `sourceMap: true`                                                                                         |
| Productive build        | `optimization: true`, `outputHashing: all`, budgets: initial 600 kB warn / 1.2 MB error, component style 8 kB warn / 12 kB error |

The repository therefore has three Angular projects: `embarcarte` (production),
`marea-design-system-catalogue` (MC-17 preview) and `marea-landing-preview`
(this internal landing preview). The landing preview is a separate project with
its own browser entry, index, tsconfig, styles and SSR server.

Observed build: `npm run build:landing:preview` exited `0` on 2026-11-03 and wrote
`C:\Users\Admin\Documents\workspace\embarcarte\dist\marea-landing-preview`. The
development-profile bundle reported raw sizes of 1.86 MB initial browser (main
1.84 MB + styles 11.33 kB) and a server bundle around 2.80 MB; these are
unoptimized development numbers and are not a performance claim (performance
evidence is a separate QA deliverable, still PENDING).

## 3. Separate output path

- Output path: `dist/marea-landing-preview` (distinct from the production
  `dist/embarcarte` output).
- `dist/` is ignored by git (`git check-ignore dist/marea-landing-preview` →
  true). No build output is committed.
- The production build target `embarcarte` does not include this project; the
  production browser entry remains `src/main.ts` (validator MC18-38 PASS).

## 4. Loopback binding

`preview/landing/server.ts`:

```ts
const host = '127.0.0.1';
const port = Number(process.env['MAREA_LANDING_PREVIEW_PORT'] ?? 4302);
...
const server = app.listen(port, host, () => { ... });
```

- The server binds to IPv4 loopback only. It is not reachable from another
  machine by design; the binding, not the `noindex` directive, is the primary
  access control.
- Default port `4302`; `MAREA_LANDING_PREVIEW_PORT` is the only environment
  variable read by the preview (no secrets, no flags that enable publication).
- The Angular build's `security.allowedHosts` repeats the loopback hosts as a
  second layer.
- Startup log line: `MC-18 internal landing preview (NOT PUBLISHED):
http://127.0.0.1:4302/marea` plus `Publication NOT_AUTHORIZED · indexation
disabled · loopback only`.

No other host/port configuration exists for the preview; there is no reverse
proxy, container or deploy manifest for it (see §7).

## 5. Host allowlist (DNS-rebinding defence)

The server rejects any request whose lower-cased `Host` header is not one of:

| Allowed Host value |
| ------------------ |
| `127.0.0.1:4302`   |
| `localhost:4302`   |
| `127.0.0.1`        |
| `localhost`        |

(The port is interpolated from the configured port.) Rejection is HTTP 403 with
`Forbidden: internal loopback preview only`. This defeats DNS rebinding — a
malicious page resolving a public name to `127.0.0.1` still sends its own Host
header — and it also rejects malformed/wrong-port Host values.

Observed on 2026-11-03:

| Probe                                           | Observed                                              |
| ----------------------------------------------- | ----------------------------------------------------- |
| `GET /marea` with default Host `127.0.0.1:4302` | 200                                                   |
| same with `Host: localhost:4302`                | 200                                                   |
| same with `Host: evil.example`                  | 403, body `Forbidden: internal loopback preview only` |
| same with `Host: 127.0.0.1:9999`                | 403                                                   |

Residual limitation: the allowlist trusts the Host header. A local reverse proxy
or tunnel that rewrites Host to `localhost` would make the preview reachable
through that proxy; see §8.

## 6. Security headers and endpoint

Middleware runs before static assets, health and SSR, so the headers apply to
every allowed-host response:

| Header                    | Value                                                                                                                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `X-Robots-Tag`            | `noindex, nofollow, noarchive`                                                                                                                                                                                                       |
| `Content-Security-Policy` | `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; form-action 'none'` |
| `Cache-Control`           | `no-store`                                                                                                                                                                                                                           |
| `Referrer-Policy`         | `no-referrer`                                                                                                                                                                                                                        |
| `X-Content-Type-Options`  | `nosniff`                                                                                                                                                                                                                            |
| `X-Frame-Options`         | `DENY`                                                                                                                                                                                                                               |
| `X-Powered-By`            | disabled (`app.disable('x-powered-by')`)                                                                                                                                                                                             |

Observed on both `/marea` and `/en/marea`, on `/no-such-page` (404) and on the
health endpoint. `app.set('trust proxy', false)` prevents client-supplied
forwarding headers from being trusted.

CSP limitations: `'unsafe-inline'` is allowed for `style-src` and `script-src`
(Angular inline styles and the SSR bootstrap); there is no nonce, hash,
`strict-dynamic`, `report-uri` or Trusted Types. `frame-ancestors 'none'` and
`form-action 'none'` are the strongest directives; `object-src 'none'` and
`base-uri 'self'` close common injection vectors.

Health endpoint:

```http
GET /__preview/health → 200 application/json
{"status":"ok","preview":"MC-18 internal landing","publication":"NOT_AUTHORIZED",
 "indexation":"noindex, nofollow, noarchive","host":"127.0.0.1"}
```

The endpoint exposes no environment, version, filesystem path, secret or request
data; `X-Robots-Tag: noindex, nofollow, noarchive` still applies.

404 behaviour: unknown paths (for example `/no-such-page`, `/en/no-such-page`)
return HTTP 404 with the custom `marea-preview-not-found` page (English + Spanish,
links back to `/marea`) and the same security headers. `serverRoutes` marks `'**'`
as `RenderMode.Server` with `status: 404`. The root path `/` aliases the ES
preview for developer convenience and is documented as a preview artefact, not a
public route.

## 7. No external services, no data collection, no public hosting

- **No external services.** No external URL, remote font/image/stylesheet, raster
  image, analytics or third-party script is referenced. `assets: []`,
  `connect-src 'self'`, no `@import url(https://…)`, no `url(//…)` in the preview
  stylesheet. Validator checks MC18-47 (`no external service or third-party
asset is contacted`) and MC18-48 (`no secret or credential is committed`) PASS.
- **No data collection.** No `<form>`, `<input>`, `<textarea>`, `<select>`,
  cookie, `localStorage`, `sessionStorage`, `fetch`, `XMLHttpRequest`,
  `sendBeacon` or WebSocket in the landing or preview sources. HTTP probe found
  0 `<form>` and 0 `<input>` elements in the SSR HTML and no `Set-Cookie` header.
  The preview only renders read-only content; there is no lead capture, no
  enquiry, no customer or vessel data.
- **No public hosting.** No deploy configuration (nginx, Caddy, Docker Compose,
  scripts under `deploy/`) references the landing preview; no public asset,
  sitemap, robots or hosting artefact was added (validator MC18-60 PASS; MC18-29
  PASS; MC18-30 PASS). `public/` is untouched by MC-18.
- **No production imports.** The production entry points
  (`src/main.ts`, `src/main.server.ts`, `src/app/app.routes.ts`,
  `src/app/app.routes.server.ts`, `src/app/core/i18n/locale-routes.ts`,
  `src/server.ts`) do not import the landing. A repository-wide search for
  `marea-landing` under `src/` returns only files inside
  `src/app/marea-landing/` itself; the preview route table
  (`LANDING_ROUTE_TABLE` in `models/page-identity.ts`) is imported only by
  `preview/landing/`. Validator MC18-28 and MC18-38 PASS, and the adversarial
  unit test `a direct public-app import of the landing preview is rejected`
  PASSES. The production bundle contains zero landing bytes (MC18-33 PASS).

Import-graph caveat: the boundary is enforced by the repository validator and
tests (static import scan + git-diff assertions), not by a runtime loader or
compiler sandbox. A future developer could add an import; the validator would
fail, but nothing stops the build itself.

The guarded production route surfaces are exactly the four real route files
(`src/app/app.routes.ts`, `src/app/app.routes.server.ts`,
`src/app/core/i18n/locale-routes.ts`, `src/server.ts`). `PRODUCTION_ROUTE_FILES`
no longer names a static `public/sitemap.xml`: this repository has no static
sitemap, and the public sitemap is generated at runtime by the production SSR
server. The validator's changed-file allowlist also treats `playwright.config.ts`
as an allowed exact-path change; it sets
`testIgnore: ['**/design-system/**', '**/landing/**']` so the inherited public
e2e composition is preserved and the landing suite stays separate under
`playwright.landing.config.ts`.

## 8. Build and run

Prerequisites: Node.js ≥ 22 (repository `engines`), dependencies already
installed (`node_modules` present; no new dependency is added by MC-18).

```bash
# 1. Build the isolated preview (Angular application + SSR server)
npm run build:landing:preview
# equivalent: npx ng build marea-landing-preview

# 2. Kill a previously running preview if port 4302 is busy
#    (PowerShell example)
Get-NetTCPConnection -LocalPort 4302 -State Listen -ErrorAction SilentlyContinue |
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }

# 3. Start the loopback SSR preview
npm run serve:landing:preview
# equivalent: node dist/marea-landing-preview/server/server.mjs

# 4. Open (loopback only)
#    http://127.0.0.1:4302/marea        (ES)
#    http://127.0.0.1:4302/en/marea     (EN)
#    http://127.0.0.1:4302/__preview/health
```

`MAREA_LANDING_PREVIEW_PORT` may change the port; the Host allowlist is built
from the same value. The preview is for internal inspection only; it must not be
exposed through a tunnel, reverse proxy, port-forward or public hostname.

## 9. Access-control assumptions and limitations

1. **`noindex` is not access control.** It is a crawler directive. It does not
   authenticate users, encrypt traffic, prevent a direct request or stop a bot
   that ignores robots. The loopback binding and Host allowlist are the actual
   controls.
2. **The loopback boundary is machine-local, not user-local.** Any process or
   user on the same machine can reach `127.0.0.1:4302`. There is no
   authentication, authorization, rate limiting or audit logging.
3. **No TLS.** Traffic is plain HTTP on loopback. This is acceptable only because
   it does not leave the machine.
4. **Proxy/tunnel risk.** A reverse proxy or tunnel on the same machine that
   forwards to `127.0.0.1:4302` with an allowed Host header would expose the
   preview. Operational rule: never publish, tunnel or host this preview.
5. **Host header trust.** The allowlist defends against DNS rebinding from an
   external browser, not against a local client that sets the header
   deliberately.
6. **Development-grade server.** Express serves static assets and SSR without
   hardening (no WAF, no HSTS, no compression policy, no request limits). It is
   not a production service.
7. **Shared-machine threat model.** MC-18 assumes a single developer/operator
   workstation. Multi-user or shared CI hosts are outside the assumption.

## 10. Observed verification at authoring

| Check                                               | Observed                                                    |
| --------------------------------------------------- | ----------------------------------------------------------- |
| `git rev-parse HEAD`                                | `6002c49f898e755154c1b65c97781177719ce11c`                  |
| `npx tsc -p tsconfig.app.json --noEmit`             | exit 0                                                      |
| `npm run build:landing:preview`                     | exit 0, output `dist/marea-landing-preview`                 |
| `node dist/marea-landing-preview/server/server.mjs` | starts on `127.0.0.1:4302`                                  |
| `/__preview/health`                                 | 200 JSON, `publication: NOT_AUTHORIZED`                     |
| `/marea`, `/en/marea`                               | 200, `X-Robots-Tag` + CSP present, no `Set-Cookie`          |
| `/no-such-page`                                     | 404, same security headers                                  |
| forged `Host` (`evil.example`, `127.0.0.1:9999`)    | 403                                                         |
| `npm run test:landing:unit`                         | 45/45 PASS, exit 0                                          |
| `npm run test:landing`                              | 55/60 PASS, 5 FAIL (pending artefacts; see D09 §11), exit 1 |
| `git check-ignore dist/marea-landing-preview`       | true (build output not tracked)                             |

The validator checks that specifically cover this document's subject — MC18-25
(non-indexable), MC18-28 (no production route), MC18-33 (zero landing bytes in the
public corporate site), MC18-38 (no production bundle import), MC18-46 (loopback +
access control), MC18-47 (no external service), MC18-59 (banner/headers) — all
PASS in the observed run. MC18-37 (hydration), MC18-41 (dataset regeneration)
and MC18-55 (manifest key path) now PASS; MC18-44, 51, 52, 53 and 54 remain
failing only for pending artefacts (performance/legacy/review evidence, D10-D12,
independent review, Spanish report and delivery record).

## 11. Known limitations / non-claims

- The isolation is **repository-verified and locally observed**, not certified.
  No penetration test, no network scan and no independent security audit was
  performed.
- The preview is not a public service and has no publication authorization; it is
  not deployed anywhere.
- `noindex`/`X-Robots-Tag` are defence in depth, not access control; loopback +
  Host allowlist are the controls, with the assumptions in §9.
- CSP keeps `'unsafe-inline'` for script/style; it is not a strict CSP.
- No TLS, authentication, authorization, rate limiting, audit logging or
  monitoring exists in the preview.
- The development build sizes quoted in §2 are unoptimized and are not
  performance evidence; a performance/visual/responsive evidence set is PENDING
  from the QA deliverable.
- The import-graph boundary is validator/test-enforced, not compiler-enforced.
- No independent audit has reviewed this document; the final milestone verdict
  belongs to the independent auditor. This document does not claim MC18 PASS and
  does not record merge, deployment or publication.
