# MC-20 — Security and isolation evidence

## 1. Preview isolation

| Control | Implementation | Verification |
| --- | --- | --- |
| Loopback bind | `app.listen(port, '127.0.0.1')` | validator MC20-25; no `0.0.0.0` |
| Host allowlist | `ALLOWED_HOSTS` rejects non-loopback `Host` | validator MC20-25; manual `Host` probe below |
| Noindex | `X-Robots-Tag: noindex, nofollow, noarchive` on every response | E2E SSR header assertion |
| No public metadata | no canonical, hreflang link, OG, Twitter or JSON-LD | validator MC20-24; E2E HTML scan |
| CSP | `default-src 'self'`, `form-action 'none'`, `frame-ancestors 'none'` | validator MC20-25 |
| No storage | no localStorage/sessionStorage/cookie in the catalogue | validator MC20-26 |
| No network | no HttpClient/fetch/XHR in the catalogue | validator MC20-26 |
| No forms | no `<form>`, input, select or textarea | validator MC20-26; E2E |
| No personal data | no customer, vessel or contact field | E2E; content scan |

Manual probe: a request with a non-loopback `Host` header receives HTTP 403
`Forbidden: internal loopback preview only` (middleware order is before routing and static files).

## 2. Public release isolation

- `src/app/app.routes.ts`, `src/app/app.routes.server.ts`, `src/app/core`, `src/server.ts`,
  `src/main.ts`, `src/main.server.ts`, `public/`, `deploy/` and `Dockerfile` are unchanged from
  `3490c0f` (validator MC20-28/35).
- The production import graph (86 modules scanned) contains zero catalogue, preview or landing
  modules (MC20-29).
- The production bundle (168 files) contains zero catalogue identifiers
  (`internal/catalog`, `data-marea-catalog`, `marea-catalog-page`) (MC20-30).
- The six preview routes exist only in `preview/landing/app.routes.ts` and are not mounted in the
  public application.
- No sitemap, robots, canonical, hreflang or structured-data entry references MC-20.

## 3. Boundary statement — what is not claimed

- The preview is isolated at the **process and route** level (loopback bind, host allowlist,
  metadata policy). It is not an OS sandbox and no OS-confinement claim is made.
- No authentication, authorisation or multi-user isolation exists in the preview; it is a local
  development artefact, not a deployed service.
- There is no threat model for a hostile local user with access to the machine; none is claimed.
- `GATE-PRIVACY-DPA-DPIA` remains blocked; no personal data is collected or stored, so no DPIA is
  performed by this milestone.

## 4. Verified commands

```text
npm run build:landing:preview      PASS
npx playwright test -c playwright.catalog.config.ts   PASS 35/35
npm run test:mc20                  PASS 40/40 (final)
npm run build                      PASS
```

## 5. Residual risk

The preview port (4302) is open on loopback while it runs. Any local process can read the
unpublished internal content. This is accepted for an internal preview and recorded in the risk
register (R-05).
