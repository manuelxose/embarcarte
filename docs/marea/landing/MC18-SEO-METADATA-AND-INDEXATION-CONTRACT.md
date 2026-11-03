# MC18 — SEO Metadata and Indexation Contract (D09)

| Field            | Value                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Deliverable      | D09 — `MC18-SEO-METADATA-AND-INDEXATION-CONTRACT.md`                                                                                |
| Milestone        | MC-18/36 — EMBARCARTE / MAREA internal bilingual corporate landing                                                                  |
| Owner            | docs-b                                                                                                                              |
| Date             | 2026-11-03                                                                                                                          |
| Status           | INTERNAL_PROPOSED (documentation deliverable; not a milestone verdict)                                                              |
| Publication      | NOT_AUTHORIZED                                                                                                                      |
| Indexation       | DISABLED — `noindex, nofollow, noarchive`                                                                                           |
| Repository state | Branch `feature/marea-mc18-bilingual-corporate-landing`, HEAD `6002c49f898e755154c1b65c97781177719ce11c`, uncommitted MC-18 changes |

## 1. Purpose and scope

This document records the **typed planning contract** for the metadata the proposed
MAREA corporate landing would carry _if_ a future milestone authorized its
publication. It is not a published SEO implementation.

The contract is defined in code and in a generated dataset:

- `src/app/marea-landing/models/seo.ts` — types, candidate values, reciprocity
  check and the fail-closed activation evaluator.
- `src/app/marea-landing/models/page-identity.ts` — frozen route identity inherited
  from the MC-15 proposed-route registry.
- `src/app/marea-landing/models/publication-gates.ts` — fail-closed page gates and
  the recorded MC-14 release-gate state.
- `docs/marea/landing/data/seo-metadata-contract.json` — generated ES/EN contract
  (contractId `MC18-SEO-METADATA-CONTRACT`, version `1.0.0`, status
  `INTERNAL_PROPOSED`, publicationStatus `NOT_AUTHORIZED`).
- `docs/marea/landing/data/publication-gates.json` — generated gate evaluation.
- `docs/marea/landing/data/preview-isolation.json` — preview isolation contract.

Canonical/alternate/Open Graph/structured-data values in this document are
**planning candidates only**. No canonical link, no `hreflang`, no Open Graph or
Twitter card, no JSON-LD, no indexable page and no sitemap entry is emitted in
MC-18.

## 2. Route identity

| Field            | Value                                                   | Authority                                                       |
| ---------------- | ------------------------------------------------------- | --------------------------------------------------------------- |
| `routeId`        | `mareaOverview`                                         | `docs/marea/information-architecture/data/proposed-routes.json` |
| `entityId`       | `ENT-HUB-MAREA`                                         | same                                                            |
| `pageType`       | `HUB_OVERVIEW`                                          | same                                                            |
| ES path          | `/marea`                                                | same (`routePatternEs`)                                         |
| EN path          | `/en/marea`                                             | same (`routePatternEn`)                                         |
| ES language tag  | `es-ES`                                                 | `models/page-identity.ts`                                       |
| EN language tag  | `en`                                                    | `models/page-identity.ts`                                       |
| Publication      | `publicationAuthorized: false`                          | same                                                            |
| Indexation       | `indexationAuthorized: false`, `sitemapEligible: false` | same                                                            |
| Deployment state | `NOT_ACTIVATED_NOT_IN_SITEMAP_NOT_PUBLICLY_LINKED`      | same                                                            |
| Collision state  | `NO_COLLISION`                                          | same                                                            |

**Recorded label discrepancy (INFORMATIONAL).** The MC-18 master-prompt narrative
calls the page type `PAGE_MAREA_OVERVIEW`; the repository dataset
`proposed-routes.json` says `HUB_OVERVIEW`, and `models/page-identity.ts` carries
that value with an explicit comment. The repository dataset is the authority. The
label `PAGE_MAREA_OVERVIEW` also survives in the human-readable
`establishes` text of `EV-MC15-ROUTES` in
`src/app/marea-landing/content/evidence.ts`, which is inconsistent with the
authoritative value; it is recorded, not rewritten (MC-18 must not edit the
canonical MC-15 dataset, and the implementation file is owned by another
deliverable). No functional contract reads that text.

The proposed route is **not** registered in `src/app/app.routes.ts`,
`src/app/app.routes.server.ts`, `src/app/core/i18n/locale-routes.ts`,
`src/server.ts`, public navigation or any sitemap artefact. Validator checks
MC18-28 (`no proposed route is added to the production application`) and MC18-30
(`no public navigation or corporate UI is changed`) both PASS in the observed
run.

## 3. Typed planning contract

`LandingSeoMetadataContract` is built by `buildLandingSeoContract(locale, gates)`.
Values for both locales:

| Contract field              | ES                                                                                                                                                                                                                                                                                                                                                                  | EN                                                                                                                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locale`                    | `es`                                                                                                                                                                                                                                                                                                                                                                | `en`                                                                                                                                                                                          |
| `pageTitle`                 | `MAREA — ecosistema marino propuesto (vista interna, no publicada)`                                                                                                                                                                                                                                                                                                 | `MAREA — proposed marine ecosystem (internal view, unpublished)`                                                                                                                              |
| `metaDescription`           | `Vista interna no publicada del ecosistema MAREA propuesto: nueve familias de producto y seis conceptos de solución. Sin precio aprobado, sin disponibilidad comercial y sin autorización de publicación.`                                                                                                                                                          | `Unpublished internal view of the proposed MAREA ecosystem: nine product families and six solution concepts. No approved price, no commercial availability and no publication authorisation.` |
| `canonicalCandidate`        | `https://embarcarte.com/marea`                                                                                                                                                                                                                                                                                                                                      | `https://embarcarte.com/en/marea`                                                                                                                                                             |
| `hreflangGroupCandidate`    | `es-ES` → `https://embarcarte.com/marea` (`x-default` = true), `en` → `https://embarcarte.com/en/marea` (`x-default` = false)                                                                                                                                                                                                                                       | same group (both locale contracts carry the whole reciprocal group)                                                                                                                           |
| `robotsPolicy`              | `noindex,nofollow`                                                                                                                                                                                                                                                                                                                                                  | `noindex,nofollow`                                                                                                                                                                            |
| `openGraphCandidate`        | `type: website`, `locale: es_ES`, `siteName: EMBARCARTE`, `image: null`, title/description as above                                                                                                                                                                                                                                                                 | `type: website`, `locale: en_GB`, `siteName: EMBARCARTE`, `image: null`, title/description as above                                                                                           |
| `twitterCardCandidate`      | `card: summary`, title/description as above                                                                                                                                                                                                                                                                                                                         | `card: summary`, title/description as above                                                                                                                                                   |
| `structuredDataEligibility` | `product:false`, `offer:false`, `aggregateRating:false`, `review:false`, `breadcrumbList:false`, `organization:false`, `anyJsonLdEmitted:false`                                                                                                                                                                                                                     | identical                                                                                                                                                                                     |
| `sitemapEligibility`        | `false`                                                                                                                                                                                                                                                                                                                                                             | `false`                                                                                                                                                                                       |
| `publicationGateIds`        | `publicCopyApprovedUnsatisfied`, `trademarkClearedUnsatisfied`, `sourceIpClearedUnsatisfied`, `legalIdentityVerifiedUnsatisfied`, `claimsApprovedUnsatisfied`, `privacyApprovedUnsatisfied`, `commercialDataApprovedUnsatisfied`, `publicationApprovedUnsatisfied`, `indexationApprovedUnsatisfied`, `deploymentApprovedUnsatisfied`, `releaseAuthorizationMissing` | identical                                                                                                                                                                                     |
| `emitted`                   | `canonical:false`, `hreflang:false`, `openGraph:false`, `twitterCard:false`, `jsonLd:false`, `robotsNoindex:true`                                                                                                                                                                                                                                                   | identical                                                                                                                                                                                     |

`SITE_ORIGIN_CANDIDATE` is `https://embarcarte.com`; it is a candidate origin, not
a verified deployment. `openGraphCandidate.image` is deliberately `null`: a
conceptual card would visually assert availability, so no image is planned for
emission without a new review.

### 3.1 Distinction between the two gate vocabularies

| Vocabulary                                        | Dataset                                                                            | Count and meaning                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page-level gates (`evaluatePublicationGates`)     | `publication-gates.json` → `data.evaluation.blockingGateIds`                       | 10 `GATE-*` ids derived from the page booleans (public copy, trademark, source IP, legal identity, claims, privacy, commercial data, publication, indexation, deployment). `publishable: false`.                                                                                                                                                                                       |
| SEO activation blockers (`evaluateSeoActivation`) | `seo-metadata-contract.json` → `publicationGateIds` / `activation.blockingReasons` | All 12 publication gates (page implemented, internal preview ready, public copy, trademark, source IP, legal identity, claims, privacy, commercial data, publication, indexation, deployment) plus `releaseAuthorizationMissing`. Unsatisfied gates emit `<gate>Unsatisfied`; the two implemented/preview gates are currently `true`, hence 10 `*Unsatisfied` entries + authorization. |

Both are recorded in the generated datasets and now cover the **same 12
publication gates**; the SEO evaluator is deliberately as strict as page
publication and additionally requires the release authorization record.
Page-level blockers use `GATE-*` ids; SEO blockers use `<gate>Unsatisfied`
reasons. See §5 and risk R05 in D17.

## 4. Reciprocity validation

`hreflangGroupIsReciprocal(group)` (in `models/seo.ts`) requires:

1. exactly two entries;
2. two distinct locales (`es`, `en`);
3. every `href` equal to `SITE_ORIGIN_CANDIDATE` + the authoritative path for that
   locale (`/marea`, `/en/marea`);
4. exactly one `x-default`, assigned to the ES entry.

The planned group is reciprocal by construction: both locale contracts share the
same two-entry group, so each page references the other and itself. The observed
MC-18 unit suite includes the check
`SEO metadata stays a planning contract: no canonical, hreflang, OG or JSON-LD`;
validator check MC18-26 (`no public canonical or hreflang is emitted`) also
validates reciprocity and PASSES.

No `rel="alternate"` link is emitted live. HTTP probe of `/marea` (2026-11-03)
found `0` occurrences of `hreflang` and `0` of `rel="alternate"`.

## 5. Two-lock activation gate

Metadata activation is fail-closed. Two independent locks must both open:

**Lock 1 — gates.** `evaluateSeoActivation` requires _all_ of:

| Gate                     | Current value | Source                   |
| ------------------------ | ------------- | ------------------------ |
| `pageImplemented`        | `true`        | `publication-gates.json` |
| `internalPreviewReady`   | `true`        | same                     |
| `publicCopyApproved`     | `false`       | same                     |
| `trademarkCleared`       | `false`       | same                     |
| `sourceIpCleared`        | `false`       | same                     |
| `legalIdentityVerified`  | `false`       | same                     |
| `claimsApproved`         | `false`       | same                     |
| `privacyApproved`        | `false`       | same                     |
| `commercialDataApproved` | `false`       | same                     |
| `publicationApproved`    | `false`       | same                     |
| `indexationApproved`     | `false`       | same                     |
| `deploymentApproved`     | `false`       | same                     |

`evaluateSeoActivation` requires **all 12** gates, not a subset; every unsatisfied
gate emits a `<gate>Unsatisfied` blocking reason. `pageImplemented` and
`internalPreviewReady` are `true` in MC-18, so the generated `blockingReasons`
contains 10 `*Unsatisfied` entries plus `releaseAuthorizationMissing`.

**Lock 2 — release authorization record.** `ReleaseAuthorization` requires
`authorizationId`, `scope: 'PUBLICATION'`, `authorizedBy`, `authorizedAt` and
`legalClearanceReference`. The exported constant
`LANDING_RELEASE_AUTHORIZATION` is typed `ReleaseAuthorization | null` and is
deliberately `null`. No code path constructs a non-null record; even when every
gate is set true, the evaluator returns `metadataActivationAllowed: false` with
`releaseAuthorizationMissing` (MC18-43 PASS; adversarial unit suite PASS).

Until both locks open, the activation state is:

```text
metadataActivationAllowed = false
canonicalEmissionAllowed  = false
hreflangEmissionAllowed   = false
openGraphEmissionAllowed  = false
structuredDataAllowed     = false   (always false in MC-18)
sitemapEligible           = false   (always false in MC-18)
indexationAllowed         = false
authorization             = null
```

## 6. Live-public prohibitions (MC-18)

| Prohibition                                                | Status   | Evidence                                                                                                                                                             |
| ---------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No canonical link emitted                                  | ENFORCED | SSR HTML `/marea`: 0 `rel="canonical"`; validator MC18-26 PASS                                                                                                       |
| No `hreflang` / alternate links emitted                    | ENFORCED | SSR HTML: 0 `hreflang`, 0 `rel="alternate"`; MC18-26 PASS                                                                                                            |
| No Open Graph announcement                                 | ENFORCED | 0 `property="og:"`; MC18-27 PASS                                                                                                                                     |
| No Twitter card                                            | ENFORCED | 0 `name="twitter:"`; MC18-27 PASS                                                                                                                                    |
| No Product/Offer/Review/AggregateRating/Breadcrumb JSON-LD | ENFORCED | 0 `application/ld+json`; dataset `jsonLdEmitted:false`; MC18-27 PASS                                                                                                 |
| No indexable page                                          | ENFORCED | `<meta name="robots" content="noindex, nofollow, noarchive">` and `X-Robots-Tag: noindex, nofollow, noarchive`; MC18-25 PASS                                         |
| No sitemap entry                                           | ENFORCED | `public/` contains no sitemap file; validator MC18-29 PASS (`no sitemap entry is added`); production sitemap is served by the production SSR app and was not changed |
| No public navigation / corporate UI change                 | ENFORCED | MC18-30 PASS                                                                                                                                                         |
| No public brand asset copied                               | ENFORCED | MC18-31 PASS                                                                                                                                                         |
| No public hosting artefact added                           | ENFORCED | MC18-60 PASS                                                                                                                                                         |

The SSR HTML probe was run against the built preview
(`npm run build:landing:preview`, exit 0) served at `http://127.0.0.1:4302/marea`
on 2026-11-03. Both locales returned HTTP 200; the unknown path returned 404.

## 7. Internal preview noindex — defence in depth

Four layers, in order of strength:

1. **Loopback access control (strongest).** `preview/landing/server.ts` binds
   `127.0.0.1` only (`app.listen(port, host)`), so the preview is not addressable
   from another host even before HTTP is parsed.
2. **Host allowlist (DNS-rebinding defence).** Only `127.0.0.1[:4302]` and
   `localhost[:4302]` host headers are accepted; any other Host receives HTTP 403
   (`Forbidden: internal loopback preview only`). Observed: forged `Host:
evil.example` → 403; `Host: 127.0.0.1:9999` → 403; `Host: localhost:4302` → 200.
3. **`X-Robots-Tag` response header.** Every allowed-host response, including 404
   and the health endpoint, carries `noindex, nofollow, noarchive`.
4. **`meta name="robots"`.** The preview `index.html` carries the directive and
   `LandingPreview` re-applies it with `Meta.updateTag`; observed on ES and EN
   pages.

**Noindex is not access control.** It is a cooperative directive for crawlers and
does not stop a human or a bot that ignores it; the loopback binding and Host
allowlist are the actual access controls. The preview has no authentication, no
TLS and no rate limiting. If an operator forwards or proxies port 4302 with an
allowed Host header, the isolation assumptions fail. See D13 §8.

## 8. Current legal and publication state (observed)

| Fact                      | Value                                                                                                                          | Source                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| Trademark legal clearance | `NOT_GRANTED`                                                                                                                  | `claims-policy.json` → `brandState`       |
| MAREA public use          | `NO_GO`                                                                                                                        | same                                      |
| Internal naming allowed   | `true`; public attribution `false`                                                                                             | same                                      |
| Release gates             | 13 gates, 0 closed, 12 blocked, 1 evidence required                                                                            | `release-evidence-gates.json` → `summary` |
| Required documents        | 24 required, 0 executed, 0 signed, 0 certified, 0 approved                                                                     | same                                      |
| Claims                    | 42 catalogued, 0 public-authorized, 35 public-prohibited, 30 mandatory prohibited categories, `publicationAuthorization: NONE` | `claims-policy.json` → `summary`          |
| Publishable (page gates)  | `false`                                                                                                                        | `publication-gates.json`                  |
| Release authorization     | `null`                                                                                                                         | `models/seo.ts`                           |

These are the facts that keep both locks closed. None of them is a procedural
formality: each requires an external approval that does not exist in MC-18.

## 9. Discrepancies and gaps recorded (resolved or informational)

1. **Activation gate set vs. publication gate set (RESOLVED).** During MC-18 the
   evaluator initially checked only 6 gate booleans. It was hardened to require
   **all 12** publication gates plus the authorization record, and unsatisfied
   gates now emit `<gate>Unsatisfied` reasons. The adversarial unit suite and
   validator MC18-43 PASS. Activation remains impossible: 10 gates are `false`
   and `LANDING_RELEASE_AUTHORIZATION` is `null`.
2. **`PAGE_MAREA_OVERVIEW` vs `HUB_OVERVIEW` (INFORMATIONAL).** Repository dataset
   is authority; narrative label survives in `evidence.ts` text. Recorded in §2.
3. **`robotsPolicy` string.** The typed contract uses `noindex,nofollow`, while
   the preview meta/header uses `noindex, nofollow, noarchive`. Both are
   non-indexable; the header is the stronger live directive. The discrepancy is
   intentional (contract value vs. live preview policy) and is recorded so a
   future emitter does not silently downgrade `noarchive`.
4. **No static sitemap file (RESOLVED).** `PRODUCTION_ROUTE_FILES` previously
   listed `public/sitemap.xml`; it now guards exactly the four real route
   surfaces (`src/app/app.routes.ts`, `src/app/app.routes.server.ts`,
   `src/app/core/i18n/locale-routes.ts`, `src/server.ts`), because the public
   sitemap is generated at runtime by the SSR server. Validation of "no sitemap
   entry" is therefore over `public/` artefacts (MC18-29 PASS) plus the unchanged
   route files — not over a live production sitemap response.
5. **Validator run is not green.** Final observed `npm run test:landing`: 55/60
   checks PASS, 5 FAIL, exit code 1. The count moved from 52/60 during authoring
   as parallel deliverables landed and reconciliation fixes were applied; see
   §11 for the remaining failures.

## 10. Future activation procedure (summary — full sequence in D16)

No step below is executed in MC-18.

1. Close the 13 MC-14 release gates with real evidence; obtain trademark
   clearance, source-IP/licensing clearance, legal-identity verification, public
   copy approval, claims approval, privacy approval and commercial/pricing
   approval.
2. Create a real `ReleaseAuthorization` record (`scope: PUBLICATION`) signed by
   the legal owner and replace the `null` constant through a reviewed change with
   tests; this is the second lock, not a formality.
3. Keep the activation gate set aligned with the full publication gate set; it is
   now hardened to all 12 gates and must not regress to a subset.
4. Register the routes in `src/app/app.routes.ts`,
   `src/app/core/i18n/locale-routes.ts` and `src/app/app.routes.server.ts`
   (and only if required `src/server.ts`), after re-running the collision check.
5. Emit canonical + reciprocal `hreflang` + title/description + OG/Twitter from a
   reviewed production metadata service; change robots policy to `index,follow`;
   add sitemap entries (ES + EN, `x-default` ES); verify sitemap/robots in the
   production build.
6. Re-review structured data from scratch; the MC-18 eligibility flags are all
   `false` and no JSON-LD is emitted.
7. Run the full QA gate set (TypeScript, unit, validator, e2e, axe, responsive,
   SSR/hydration, `test:seo`, commerce non-regression), verify Search Console and
   keep a rollback plan (D16 §7).

## 11. Observed verification at authoring

Run on 2026-11-03 in the working tree described in the header.

| Command                                 | Observed result                                                                                                              |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `git rev-parse HEAD`                    | `6002c49f898e755154c1b65c97781177719ce11c`                                                                                   |
| `npx tsc -p tsconfig.app.json --noEmit` | exit 0                                                                                                                       |
| `npm run test:landing:unit`             | 45 tests, 45 pass, 0 fail; exit 0                                                                                            |
| `npm run test:landing`                  | 55/60 PASS, 5 FAIL; exit 1                                                                                                   |
| `npm run build:landing:preview`         | exit 0; output `dist/marea-landing-preview`                                                                                  |
| HTTP probe `/marea`, `/en/marea`        | 200; `X-Robots-Tag: noindex, nofollow, noarchive`; CSP present; 0 canonical/hreflang/og/twitter/ld+json; `Set-Cookie` absent |
| HTTP probe `/no-such-page`              | 404 with the same security headers                                                                                           |
| HTTP probe forged `Host`                | 403                                                                                                                          |

Final validator failures after reconciliation: MC18-44 (missing datasets
`performance-evidence.json`, `legacy-baseline.json`, `review-findings.json`),
MC18-51 (missing documents D10, D11, D12, the independent review, the Spanish
report and the delivery record), MC18-52 (`performance-evidence.json` missing),
MC18-53 (`review-findings.json` missing) and MC18-54 (delivery record missing).
These are **PENDING** artefacts, not MC-18 SEO defects. MC18-37, MC18-41 and
MC18-55 now PASS: hydration evidence exists, the generated datasets were
regenerated after the visual pass, and the validator reads the manifest's
`implementationCounts.playwrightTests` (28) correctly.

## 12. Known limitations / non-claims

- This is a **planning contract**, not an implemented public SEO surface. No
  canonical, hreflang, OG, Twitter, JSON-LD, indexable page or sitemap entry
  exists.
- It is not a publication authorization, a legal clearance, a trademark
  clearance, a claims approval or a privacy approval.
- The metadata copy is internal draft planning copy, not approved marketing copy;
  `PUBLICATION_STATUS = INTERNAL_DRAFT_NOT_APPROVED`.
- The contract has no Search Console, DNS, TLS, hosting or live-crawl evidence.
  The HTTP probe is local loopback only and was run once on 2026-11-03.
- The activation evaluator now requires all 12 publication gates plus the
  authorization record; activation remains impossible today because 10 gates are
  `false` and `LANDING_RELEASE_AUTHORIZATION` is `null`.
- `PAGE_MAREA_OVERVIEW` vs `HUB_OVERVIEW` is an informational label discrepancy;
  the repository dataset is authoritative.
- No independent audit has reviewed this document; the final milestone verdict
  belongs to the independent auditor.
- This document does not claim MC18 PASS, does not claim merge/deployment/
  publication, and does not start MC-19.
