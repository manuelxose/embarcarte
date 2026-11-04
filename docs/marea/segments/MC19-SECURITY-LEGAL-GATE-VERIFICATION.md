# MC-19/36 — Security and legal gate verification

| Field       | Value                                                    |
| ----------- | -------------------------------------------------------- |
| Deliverable | MC-19 security boundary and legal/commercial gate record |
| Status      | `VERIFIED_INTERNAL`; external gates `OUTSTANDING`        |
| Baseline    | `ba63baa0e529ab9cb482fd929632d359fec1d328`               |

## 1. Gate state (unchanged by MC-19)

```text
TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
LICENSING_RIGHTS_GRANTED = false
PRICE_APPROVED = NONE
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
PILOT_SAFETY_GATE = BLOCKED
TESTED_COMPATIBILITY_ROWS = 0
PUBLICATION_AUTHORIZED = false
INDEXATION_AUTHORIZED = false
PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED
GATE-PRIVACY-DPA-DPIA = BLOCKED
DOC-17 (installer/distributor agreements) = NOT_EXECUTED
```

Canonical sources: `docs/marea/legal-commercial/data/release-evidence-gates.json` (13 gates, 0
closed; 24 required documents, 0 executed) and `claims-policy.json` (42 claims, 0 public-authorised,
30 mandatory prohibited categories). The validator re-reads both and fails if any count changes.

## 2. Why the internal implementation does not close a gate

The three pages are **internal draft copy** served only by the loopback preview. They collect no
personal data, present no price or availability, offer no purchase, quote, pre-registration or
registration, and carry no certification, compatibility or deployment claim. An internal engineering
deliverable is not evidence for any external approval, so every gate stays exactly as recorded.

## 3. Security boundary — measured controls

| Control                        | Implementation                                                                                                                                                                                                                       | Evidence                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| Loopback binding               | `const host = '127.0.0.1'` in the preview server                                                                                                                                                                                     | Playwright isolation suite; validator MC19-I11                |
| Host allowlist (DNS rebinding) | `ALLOWED_HOSTS` rejects any other `Host` with 403                                                                                                                                                                                    | Playwright `a non-loopback Host header is rejected` (403)     |
| Noindex                        | `X-Robots-Tag: noindex, nofollow, noarchive` on every response; `robots` meta                                                                                                                                                        | SSR evidence; validator MC19-I11                              |
| Framing / sniffing             | `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`                                                                                                                                                                           | preview server source                                         |
| CSP                            | `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; form-action 'none'` | SSR headers probe                                             |
| No external service            | no HTTP client, no fetch, no analytics, no third-party script                                                                                                                                                                        | validator MC19-I08                                            |
| No personal data               | no form, input, storage, cookie write or endpoint                                                                                                                                                                                    | validator MC19-I08; Playwright no-interaction suite           |
| No public surface              | production route files and bundle contain no MC-19 identifier                                                                                                                                                                        | validator MC19-I09/I10; Playwright production-isolation suite |
| No prerender                   | every preview route is `RenderMode.Server`; no static output                                                                                                                                                                         | validator MC19-I11                                            |

The policy still allows inline styles and inline scripts (`'unsafe-inline'`), because Angular inlines component styles and the SSR bootstrap needs its inline script. That is a real weakness of the current preview and is stated here rather than omitted.

## 4. What is NOT claimed

- This is not a penetration test and not an OS-level isolation proof. The preview server is a Node
  process on the developer host; loopback binding and the Host allowlist are application controls.
- Read, network-egress and process isolation are not measured; the boundary claim is limited to
  "not routable from the public application and not indexable".
- The `reuseExistingServer` option in Playwright can attach to an already running preview; the
  evidence runs rebuilt the preview first (`npm run build:landing:preview`). Risk R15 records this.
- AXE evidence is automated and Chromium-only; it is not WCAG conformance (AC-08 is `PARTIAL`).

## 5. Privacy position

`GATE-PRIVACY-DPA-DPIA` remains `BLOCKED`. The pages implement none of the six prerequisites'
consumers: no lawful-basis collection, no consent capture, no data minimisation problem (nothing
collected), no anti-abuse endpoint, no lead storage. Any future enquiry flow requires a new recorded
instruction plus the executed privacy evidence; it cannot be added to these pages by configuration.

## 6. Legal wording carried by the pages

- Persistent internal classification banner and proposed-brand restriction (`NO_GO`,
  `NOT_GRANTED`).
- Footer statement: no public route, canonical link, language alternates, sitemap entry or
  indexable metadata; loopback preview only.
- Footer statement: 13 MC-14 gates, 0 closed; 24 documents, 0 executed; 0 of 42 claims
  public-authorised.
- Footer statement: `GATE-PRIVACY-DPA-DPIA` blocked; no forms, data capture, installer registration
  or contact store.
- Per-page negative claims: no certification, CE marking, NMEA conformance, tested compatibility,
  autonomous navigation, guaranteed alert, SLA, installer accreditation or partner programme.
