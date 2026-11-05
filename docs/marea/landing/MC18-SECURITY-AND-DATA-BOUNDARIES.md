# MC18 — Security and Data Boundaries (D15)

| Field            | Value                                                                      |
| ---------------- | -------------------------------------------------------------------------- |
| Deliverable      | D15 — `MC18-SECURITY-AND-DATA-BOUNDARIES.md`                               |
| Milestone        | MC-18/36 — EMBARCARTE / MAREA internal bilingual corporate landing         |
| Owner            | docs-b                                                                     |
| Date             | 2026-11-03                                                                 |
| Status           | INTERNAL_PROPOSED (documentation deliverable; not a milestone verdict)     |
| Publication      | NOT_AUTHORIZED                                                             |
| Indexation       | DISABLED — `noindex, nofollow, noarchive`                                  |
| Repository state | HEAD `6002c49f898e755154c1b65c97781177719ce11c`, uncommitted MC-18 changes |

## 1. Purpose and scope

This document records the security and data-boundary posture of the MC-18
internal landing and its isolated preview: what crosses which boundary, what does
not exist (forms, inputs, lead capture, cookies, storage, network clients,
secrets, customer/vessel data), which headers and CSP are applied, whether the
dependency set changed, and which threat notes and non-claims apply.

It is a repository-evidence document, **not** a penetration-test report, a
certification or a formal security assessment. The non-claims are explicit in
§10.

## 2. Trust boundaries

```text
[ Developer workstation ]                       [ External network ]
        |                                                |
        |  (1) operator, trusted, single machine           |  no outbound traffic
        v                                                v
[ Loopback preview process ]  --(2) 127.0.0.1:4302-->  [ nobody ]
  express + Angular SSR                                   (no client, no telemetry)
        |
        |  (3) reads only repository files and dist/marea-landing-preview
        v
[ Repository files: landing source, content, models, datasets ]

[ Production Angular app src/ ]  --(4) no route, no import-->  [ landing not reachable ]
```

| Boundary                 | Trust assumption                                    | Control                                                                                                         |
| ------------------------ | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| (1) Operator → preview   | Trusted local user; the preview is not multi-tenant | OS user account; no authentication in the app                                                                   |
| (2) Preview → network    | No outbound network use                             | no HTTP client, no external URLs/assets, CSP `connect-src 'self'`                                               |
| (3) Preview → filesystem | Read-only static assets + SSR from the built bundle | `express.static(dist/marea-landing-preview/browser)`, no upload, no write API                                   |
| (4) Production ↔ landing | Strict separation                                   | landing not registered in routes/locale routes/server; production entries do not import it (MC18-28/33/38 PASS) |

The landing preview cannot mutate production data, call a commerce API, send
email or persist anything: there is no server endpoint other than static assets,
the health probe and SSR, and no database or session middleware is configured.

## 3. No forms, inputs, lead capture, cookies, storage or network clients

Repository search over `src/app/marea-landing/**` and `preview/landing/**` for
`<form`, `<input`, `<textarea`, `<select`, `document.cookie`, `localStorage`,
`sessionStorage`, `HttpClient`, `fetch(`, `XMLHttpRequest`, `sendBeacon`,
`WebSocket`, analytics tags — **no matches** (the only textual occurrence is the
comment "no forms, no cookies, no analytics" in `preview/landing/server.ts`).

Observed on the rendered SSR HTML (`/marea`, 2026-11-03):

| Element / API                       | Observed count                                             |
| ----------------------------------- | ---------------------------------------------------------- |
| `<form>`                            | 0                                                          |
| `<input>`                           | 0                                                          |
| `Set-Cookie` response header        | absent (checked on `/marea`, `/en/marea`, `/no-such-page`) |
| `fetch`/`XMLHttpRequest` in sources | 0                                                          |
| analytics/telemetry scripts         | 0                                                          |

The landing deliberately has **no commercial action**: no purchase, cart,
checkout, reservation, quote request, contact form, registration or newsletter.
The reused `marea-commercial-cta` component is rendered with
`LANDING_COMMERCIAL_PRESENTATION`, derived from the MC-17 fail-closed adapter
(`buyCtaAllowed:false`, `cartAllowed:false`, `priceVisible:false`,
`availabilityVisible:false`, `ctaState:'DISABLED'`), and the content states in
both languages that there is no enquiry form, no quote request and no contact
channel. Validator checks MC18-11 (`no purchase, cart or checkout action exists`)
and MC18-34 (`the preview requires no customer or vessel data`) PASS.

## 4. No secrets

- No credential, API key, token, password or private key literal is present in
  the landing source, the preview or the MC-18 documentation. Validator MC18-48
  (`no secret or credential is committed`) PASSES.
- The only environment variable read by the preview is
  `MAREA_LANDING_PREVIEW_PORT` (default `4302`). It controls a port number, not a
  secret and not an activation flag.
- No `.env` file is read by the landing or preview code; the repository
  `deploy/.env.example` is unrelated to the preview and unchanged.
- No secret manager, cloud credential or mail credential is referenced. The
  production dependencies `google-auth-library` and `nodemailer` already existed
  at the base commit; the landing does not import or use them.

## 5. No customer or vessel data

- The landing renders only static, repository-authored domain projections: nine
  families, 26 editions (identity counts), six bundles, readiness dimensions,
  recorded gate/claim counts.
- No price, stock, SKU, order, payment, customer, account, vessel, telemetry or
  session data is present. The generated projection
  (`src/app/marea-landing/data/domain.generated.ts`) is explicitly bounded to
  internal presentation and excludes customer/vessel data; every family/bundle
  record carries `commercialAvailability: NOT_FOR_SALE`, `priceVisible: false`
  and `purchaseActionAllowed: false` / `checkoutAllowed: false`.
- The health endpoint returns only static strings and the loopback hostname.
- There is no analytics, error-reporting SaaS, font CDN, image CDN or other
  third-party request from the preview (no external URLs at all; CSP
  `connect-src 'self'`, `font-src 'self'`, `img-src 'self' data:`).

## 6. CSP and headers

The preview applies the following on every allowed-host response
(`preview/landing/server.ts`):

| Header                    | Value                                                                                                                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Content-Security-Policy` | `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; form-action 'none'` |
| `X-Robots-Tag`            | `noindex, nofollow, noarchive`                                                                                                                                                                                                       |
| `Cache-Control`           | `no-store`                                                                                                                                                                                                                           |
| `Referrer-Policy`         | `no-referrer`                                                                                                                                                                                                                        |
| `X-Content-Type-Options`  | `nosniff`                                                                                                                                                                                                                            |
| `X-Frame-Options`         | `DENY`                                                                                                                                                                                                                               |
| `X-Powered-By`            | disabled                                                                                                                                                                                                                             |

Observed on 200 and 404 responses; verified by HTTP probe (see §9). CSP notes:

- `form-action 'none'` means even a hypothetical form could not submit anywhere —
  an intentional belt-and-braces control given no forms exist.
- `frame-ancestors 'none'` + `X-Frame-Options: DENY` prevent framing (clickjacking
  surface is nil, since there is no action).
- `object-src 'none'`, `base-uri 'self'`, `default-src 'self'` restrict plugin,
  base-tag and default resource loading.
- `'unsafe-inline'` is required by the Angular SSR output (inline styles and the
  bootstrap script) and weakens CSP against HTML injection. No nonce/hash,
  `strict-dynamic`, `report-uri` or Trusted Types policy is configured.
- `img-src 'self' data:` allows data-URI favicons (`<link rel="icon" href="data:,">`)
  but no remote image.
- No `Strict-Transport-Security`, `Cross-Origin-Opener-Policy`,
  `Cross-Origin-Embedder-Policy`, `Cross-Origin-Resource-Policy` or
  `Permissions-Policy` is sent; loopback-only HTTP makes HSTS inapplicable.

## 7. Dependency posture

| Fact                                     | Evidence                                                                                                         |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| No dependency added or removed           | `package.json` `dependencies` and `devDependencies` are byte-identical to base `6002c49`; validator MC18-57 PASS |
| `package-lock.json` unchanged            | `git status`/`git diff` show no change; validator MC18-57 PASS                                                   |
| No new package import in landing/preview | only Angular/Express APIs already present, plus repository components                                            |
| No external service SDK                  | no analytics, auth, payment, mail or cloud SDK imported by landing/preview                                       |

This is a **change-scope** claim (no new supply-chain surface from MC-18), not a
vulnerability assessment. `npm audit` was not run for this deliverable and no
claim is made about the vulnerability state of pre-existing dependencies.

## 8. Threat notes

| Threat                                 | Exposure                                                                                                 | Mitigation / residual risk                                                                                                                                                                                                                                                   |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DNS rebinding**                      | A malicious site resolves a public name to `127.0.0.1` and tries to read the preview                     | Host allowlist accepts only loopback Host values; observed forged Host → 403. Residual: a local proxy/tunnel that rewrites Host to `localhost` would defeat it; the app also has no auth.                                                                                    |
| **Accidental public hosting**          | Someone deploys, tunnels or port-forwards the preview                                                    | Loopback binding, no deploy manifest, no public asset, production build has zero landing bytes (MC18-33), validator MC18-60. Residual: operator action outside the repository (tunnel/port-forward) is not technically blocked. Operational rule: never publish the preview. |
| **Preview leakage via noindex bypass** | A crawler that ignores `noindex` indexes the page if it is reachable                                     | Loopback is the real control; no public URL exists to crawl; no sitemap entry, no inbound links.                                                                                                                                                                             |
| **HTML/script injection**              | Would require attacker-controlled content; there is no user input, no query-string rendering, no API     | Angular escaping; CSP restricts scripts to `'self' 'unsafe-inline'`. Residual: `'unsafe-inline'` would not stop an injected inline script if a source-injection bug were introduced.                                                                                         |
| **Data exfiltration**                  | none by construction: no data collected, no network client                                               | CSP `connect-src 'self'`; no external origins in sources/styles.                                                                                                                                                                                                             |
| **CSRF / state-changing requests**     | none: the preview serves GETs for static content and SSR; no mutation endpoints, no cookies, no sessions | not applicable by construction.                                                                                                                                                                                                                                              |
| **Supply chain**                       | dependency set unchanged in MC-18                                                                        | lockfile unchanged; pre-existing dependency risk inherited and out of scope here.                                                                                                                                                                                            |
| **Denial of service**                  | single-process Express dev server, no rate limiting                                                      | loopback-only; local operator can restart; not a public service.                                                                                                                                                                                                             |

## 9. Observed verification at authoring

Run on 2026-11-03, HEAD `6002c49f898e755154c1b65c97781177719ce11c`:

| Check                                   | Observed                                                                                                 |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `npx tsc -p tsconfig.app.json --noEmit` | exit 0                                                                                                   |
| `npm run test:landing:unit`             | 45/45 PASS, exit 0 (includes adversarial security/policy tests)                                          |
| `npm run test:landing`                  | 55/60 PASS, 5 FAIL (pending artefacts), exit 1                                                           |
| `npm run build:landing:preview`         | exit 0                                                                                                   |
| HTTP probe `/marea`                     | 200; CSP and all headers above; no `Set-Cookie`; 0 form/input; no canonical/hreflang/OG/JSON-LD          |
| HTTP probe `/en/marea`                  | 200; same headers                                                                                        |
| HTTP probe `/no-such-page`              | 404; same headers                                                                                        |
| HTTP probe forged Host (`evil.example`) | 403                                                                                                      |
| dependency diff vs base                 | none in `package.json`/`package-lock.json` (MC18-57 PASS)                                                |
| validator security checks               | MC18-47 (no external service), MC18-48 (no secret), MC18-25 (non-indexable), MC18-46 (loopback) all PASS |

Validator FAILs in the observed run are pending evidence/documentation only
(MC18-44, 51, 52, 53, 54; see D09 §11), not security regressions.

## 10. Explicit non-claims

This document does **not** claim any of the following:

- no penetration test was performed;
- no formal security certification or compliance attestation (for example ISO
  27001, SOC 2, ENS) exists;
- no independent security review or threat-model workshop was performed;
- no vulnerability scan, dependency audit (`npm audit`) or SAST/DAST was run for
  this deliverable;
- the preview is not production-hardened: no TLS, authentication, authorization,
  WAF, rate limiting, audit logging, monitoring or incident response;
- no privacy approval, DPIA/DPA, consent mechanism or data-retention policy is in
  place (the corresponding gate is blocked; relevant to future MC-19 enquiry
  flows);
- CSP with `'unsafe-inline'` is not a strict CSP;
- the Host allowlist does not protect against a local proxy/tunnel that rewrites
  the Host header;
- nothing here authorizes public hosting, publication or indexation.

## 11. Known limitations / non-claims summary

- Security posture is repository-evidence and local-probe based only.
- No user data is collected now; the statement does not extend to future MC-19
  enquiry/lead flows, which require a separate privacy, consent, retention and
  security design before implementation.
- The no-index/no-public state depends on the route remaining unregistered and
  the preview remaining loopback-only; see D16 for the future publication
  sequence and D17 for the associated risks.
- The validator is not green (55/60 in the final observed run); the missing
  artefacts are PENDING and owned by other deliverables.
- No independent audit has reviewed this document; the final milestone verdict
  belongs to the independent auditor. This document records
  `MC18_PUBLICATION = NOT_AUTHORIZED` and claims no PASS verdict.
