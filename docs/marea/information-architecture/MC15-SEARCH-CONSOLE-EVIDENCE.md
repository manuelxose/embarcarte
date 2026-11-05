# MC-15 — Search Console evidence addendum

Status: INTERNAL_PLANNING_ONLY / READ_ONLY_EXTERNAL_EVIDENCE
Publication, indexation request, live migration and deployment: NOT_AUTHORIZED
MC16_STARTED: false

## 1. Purpose

This addendum records the external Search Console evidence captured on 2026-11-02
for MC-15. It supplements — and where it contradicts an earlier statement in the
package, supersedes — the previous `INDEXATION_UNVERIFIED` limitation. It does not
authorize publication, indexation, sitemap submission, live migration or MC-16.

The evidence is a **24-URL sample**, not a census of the 98 sitemap URLs. No full
coverage number is claimed.

## 2. Access and property

| Field | Value |
|---|---|
| Property | `sc-domain:embarcarte.com` |
| Permission | `siteFullUser` |
| Credential | service account `guiatv-gsc@guia-tv-8fe3c.iam.gserviceaccount.com` |
| Capture | 2026-11-02, read-only Search Console API |
| Key material | not stored in the repository or the dataset |
| Other property visible to the same account | `sc-domain:guiaprogramaciontv.com` (out of scope) |

Methods used: `sites.list`, `sitemaps.list` and
`urlInspection.index.inspect` (Search Console URL Inspection API v1). No write
method, sitemap submission, re-indexing request or URL modification was executed.

## 3. Sitemaps

| Sitemap | Last submitted | Last downloaded | Submitted URLs | Warnings | Errors |
|---|---|---|---|---:|---:|---:|
| `https://embarcarte.com/sitemap.xml` | 2026-10-30 | 2026-11-01 | 98 | 0 | 0 |
| `https://embarcarte.com/` | 2026-10-30 | 2026-11-01 | — | 0 | **1** |

Findings:

- The preferred sitemap (`sitemap.xml`) is submitted, downloaded and error-free
  with 98 URLs, matching the verified local inventory.
- The property root URL is also submitted **as if it were a sitemap** and reports
  1 error. It is not a valid sitemap; recorded as `GSC-02` and as operational SEO
  debt. No MC-15 change.
- The sitemap endpoint reports `indexed: 0`. This field is not a reliable index
  count and is **not** used as evidence that zero pages are indexed (`GSC-03`).

## 4. URL Inspection sample (24 URLs)

Captured 2026-11-02. `PASS` means Search Console reports the URL as submitted and
indexed; `NEUTRAL` with a noindex coverage state means excluded by noindex;
`NEUTRAL` with “Google no reconoce esta URL” means not recognized/indexed at
capture time.

| URL | Verdict | Coverage state | Classification |
|---|---|---|---|
| `https://embarcarte.com/` | PASS | Enviada e indexada | INDEXED_CONFIRMED |
| `https://embarcarte.com/tecnologia` | PASS | Enviada e indexada | INDEXED_CONFIRMED |
| `https://embarcarte.com/tecnologia/navegador` | PASS | Enviada e indexada | INDEXED_CONFIRMED |
| `https://embarcarte.com/guias/que-es-signal-k` | PASS | Enviada e indexada | INDEXED_CONFIRMED |
| `https://embarcarte.com/experiencias` | PASS | Enviada e indexada | INDEXED_CONFIRMED |
| `https://embarcarte.com/traslados` | NEUTRAL | “Google no reconoce esta URL” / “Descubierta: actualmente sin indexar” (coverage wording varies) | PUBLIC_INDEXABLE_NOT_INDEXED |
| `https://embarcarte.com/servicios` | PASS | Enviada e indexada | INDEXED_CONFIRMED |
| `https://embarcarte.com/sobre-nosotros` | PASS | Enviada e indexada | INDEXED_CONFIRMED |
| `https://embarcarte.com/contacto` | PASS | Enviada e indexada | INDEXED_CONFIRMED |
| `https://embarcarte.com/aviso-legal` | PASS | Enviada e indexada | INDEXED_CONFIRMED |
| `https://embarcarte.com/privacidad` | PASS | Enviada e indexada | INDEXED_CONFIRMED |
| `https://embarcarte.com/cookies` | PASS | Enviada e indexada | INDEXED_CONFIRMED |
| `https://embarcarte.com/condiciones-de-venta` | PASS | Enviada e indexada | INDEXED_CONFIRMED |
| `https://embarcarte.com/tienda` | PASS | Enviada e indexada | INDEXED_CONFIRMED |
| `https://embarcarte.com/en` | PASS | Enviada e indexada | INDEXED_CONFIRMED |
| `https://embarcarte.com/en/technology` | PASS | Enviada e indexada | INDEXED_CONFIRMED |
| `https://embarcarte.com/en/shop` | PASS | Enviada e indexada | INDEXED_CONFIRMED |
| `https://embarcarte.com/carrito` | NEUTRAL | Excluida por una etiqueta “noindex” | EXCLUDED_NOINDEX |
| `https://embarcarte.com/acceso` | NEUTRAL | Google no reconoce esta URL | NOT_RECOGNIZED (private) |
| `https://embarcarte.com/cuenta` | NEUTRAL | Excluida por una etiqueta “noindex” | EXCLUDED_NOINDEX |
| `https://embarcarte.com/tienda/muestra/anemometro` | NEUTRAL | Google no reconoce esta URL | NOT_RECOGNIZED (sample/noindex) |
| `https://embarcarte.com/marea` | NEUTRAL | Google no reconoce esta URL | NOT_RECOGNIZED (proposed) |
| `https://embarcarte.com/en/marea` | NEUTRAL | Google no reconoce esta URL | NOT_RECOGNIZED (proposed) |
| `https://embarcarte.com/marea/nav` | NEUTRAL | Google no reconoce esta URL | NOT_RECOGNIZED (proposed) |

### Summary

| Metric | Count |
|---|---:|
| URLs inspected | 24 |
| Indexed confirmed (`PASS`) | 16 |
| Excluded by noindex | 2 |
| Not recognized | 5 |
| Public/indexable but not indexed | 1 (`/traslados`; coverage wording varies between “not recognized” and “discovered, currently not indexed”) |
| MAREA URLs indexed | 0 |
| Sitemap submitted URLs | 98 |

For all 16 `PASS` inspections, `googleCanonical` equals `userCanonical` and
matches the inspected URL. No indexed page in the sample shows a canonical
conflict (`GSC-05`).

## 5. Findings

| ID | Severity | Observation | MC-15 impact |
|---|---|---|---|
| GSC-01 | MAJOR (operational, pre-existing) | `/traslados` is public, indexable, self-canonical and in the 98-URL sitemap, but not indexed. Coverage wording varies across captures: “Google no reconoce esta URL” and “Descubierta: actualmente sin indexar”. | No impact on the IA/SEO planning scope. It is an existing site-operation gap and is carried as post-MC-15 remediation debt. |
| GSC-02 | MINOR | The home URL `https://embarcarte.com/` is submitted as a sitemap and reports 1 error. | None. The valid sitemap is `sitemap.xml`, error-free. |
| GSC-03 | INFORMATIONAL | The sitemap `indexed: 0` field is not a reliable coverage count. | None; no coverage number is derived from it. |
| GSC-04 | INFORMATIONAL | `/cuenta` is excluded by noindex; its inspected `userCanonical` is `/acceso` because the unauthenticated inspection follows the login redirect. | None; private surface. |
| GSC-05 | INFORMATIONAL | The 16 indexed URLs confirm self-canonical; no canonical conflict in the sample. | None; supports the canonical policy. |

No finding authorizes a change. `GSC-01` and `GSC-02` are recorded in
`data/search-console-evidence.json` and in D16's risk register; they do not
invalidate the MC-15 internal planning scope.

## 6. What this changes and what it does not

Changed:

- The package no longer says “Search Console access does not exist”. It records
  `SEARCH_CONSOLE_VERIFIED_PARTIAL` for 16 confirmed indexed URLs, 2 noindex
  exclusions, 5 not-recognized URLs and 1 public/indexable URL that is not indexed
  (`/traslados`, coverage wording varies).
- The central evidence registry (`data/url-evidence.json`) now contains 24
  `SEARCH_CONSOLE_VERIFIED` records.
- The indexation policy and D02/D09 now distinguish confirmed sample evidence
  from the earlier unverified state.

Unchanged:

- No full 98-URL census exists; no coverage percentage, ranking, traffic or
  revenue claim is made.
- No route, redirect, sitemap, robots, metadata, content, price or checkout
  change is authorized or executed.
- MC-15 remains a planning milestone; `MC15_PUBLICATION = NOT_AUTHORIZED`,
  `MC15_LIVE_MIGRATION = NOT_AUTHORIZED`, `MC16_STARTED = false`.
- The overall verdict remains **PARTIAL** because the sample is partial and live
  migration/publication remains unauthorized.

## 7. Limitations

- The 24-URL sample is representative, not exhaustive.
- URL Inspection reflects Google's state at the capture time; it is not a
  guarantee of future indexing.
- No full Search Console coverage export was used, and the sitemap `indexed`
  field is not used as a count.
- No key material, private key or access token is stored in the repository.
- The service account also has access to `sc-domain:guiaprogramaciontv.com`,
  which is out of scope and not inspected.

## 8. Provenance

- Raw read-only capture: `data/search-console-evidence.json` (24 inspections,
  sitemaps, summary, findings).
- Central registry additions: `data/url-evidence.json` (`EV-GSC-001`…`EV-GSC-024`).
- URL enrichment: `data/current-urls.json` (`searchConsole` field on 21 current
  URLs; the three proposed `/marea` URLs have no current-URL record).
- Policy observation: `data/indexation-policy.json`
  (`searchConsoleObservation`).
- Risk update: `data/risk-register.json` (`SEO-RISK-22`).
- Independent verification: see the addendum review record and D20 §19.
