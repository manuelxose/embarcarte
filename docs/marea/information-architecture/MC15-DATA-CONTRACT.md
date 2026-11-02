# MC-15 data contract (internal, non-deployable)

Status: INTERNAL_PLANNING_ONLY
Publication: NOT_AUTHORIZED
Live migration: NOT_AUTHORIZED
MC16_STARTED: false

This file is the single schema authority for the MC-15 machine-readable datasets and
validators. Every dataset under `docs/marea/information-architecture/data/` MUST carry
the envelope fields and the identifiers described here. Cross-file references are
resolved by these identifiers only.

## 1. Common envelope

Every dataset root object contains:

```json
{
  "contractId": "MAREA-MC15-<NAME>",
  "contractVersion": "1.0.0",
  "milestone": "MC-15",
  "date": "2026-11-02",
  "owner": "<agent or role>",
  "sourceCommit": "e0be1e457456a401a529e1912770e07ed9a863e4",
  "generationMethod": "manual repository inspection | deterministic derivation | local SSR observation",
  "evidenceState": "REPOSITORY_VERIFIED | LOCAL_SSR_VERIFIED | PUBLIC_OBSERVATION | ASSUMED | SEARCH_CONSOLE_UNVERIFIED",
  "scope": "MC-15 internal bilingual IA/SEO planning",
  "readOnly": true,
  "publicationAuthorized": false,
  "crossReferences": ["<relative path>#<contractId>"],
  "items": []
}
```

`sourceCommit` is the frozen MC-14 predecessor and MUST NOT change. `review-findings.json`
adds `reviewedCommit` (the frozen MC-15 implementation commit) once known; until then use
`"PENDING_FREEZE"`, and the Lead replaces it at freeze time.

## 2. Identifier vocabulary

### 2.1 Current semantic routes (frozen, 21)

Exact `routeId` values from `src/app/core/i18n/locale-routes.ts`:

`home, technology, technologyDetail, experiences, delivery, services, about, contact,
guides, guideDetail, shop, shopDetail, shopSample, cart, login, account, orderDetail,
legalNotice, privacy, cookies, termsOfSale`

### 2.2 Private/admin route ids (7)

`admin, adminOrders, adminOrderDetail, adminProducts, adminProductEdit, adminCustomers,
adminMessages`

### 2.3 Legacy redirect ids (3, active)

`legacyOpenMarine` (`/open-marine` → `/tecnologia`), `legacyProductos` (`/productos` →
`/tecnologia`), `legacyProductoDetail` (`/productos/:slug` → `/tecnologia/:slug`).

### 2.4 Proposed route ids (23, all `PROPOSED_INTERNAL_NOT_DEPLOYABLE`)

| routeId | ES | EN | entityId |
|---|---|---|---|
| mareaOverview | marea | en/marea | ENT-HUB-MAREA |
| mareaProducts | marea/productos | en/marea/products | ENT-HUB-PRODUCTS |
| mareaSolutions | marea/soluciones | en/marea/solutions | ENT-HUB-SOLUTIONS |
| mareaFamilyNav | marea/nav | en/marea/nav | ENT-FAMILY-NAV |
| mareaFamilyHub | marea/hub | en/marea/hub | ENT-FAMILY-HUB |
| mareaFamilyAis | marea/ais | en/marea/ais | ENT-FAMILY-AIS |
| mareaFamilyPilot | marea/pilot | en/marea/pilot | ENT-FAMILY-PILOT |
| mareaFamilySense | marea/sense | en/marea/sense | ENT-FAMILY-SENSE |
| mareaFamilyWatch | marea/watch | en/marea/watch | ENT-FAMILY-WATCH |
| mareaFamilyDisplay | marea/display | en/marea/display | ENT-FAMILY-DISPLAY |
| mareaFamilyWeather | marea/weather | en/marea/weather | ENT-FAMILY-WEATHER |
| mareaFamilyFleet | marea/fleet | en/marea/fleet | ENT-FAMILY-FLEET |
| mareaSolutionStart | marea/soluciones/start | en/marea/solutions/start | ENT-BUNDLE-START |
| mareaSolutionCruise | marea/soluciones/cruise | en/marea/solutions/cruise | ENT-BUNDLE-CRUISE |
| mareaSolutionSail | marea/soluciones/sail | en/marea/solutions/sail | ENT-BUNDLE-SAIL |
| mareaSolutionProtect | marea/soluciones/protect | en/marea/solutions/protect | ENT-BUNDLE-PROTECT |
| mareaSolutionComplete | marea/soluciones/complete | en/marea/solutions/complete | ENT-BUNDLE-COMPLETE |
| mareaSolutionFleet | marea/soluciones/fleet | en/marea/solutions/fleet | ENT-BUNDLE-FLEET |
| mareaConfigurator | marea/configurador | en/marea/configurator | ENT-TOOL-CONFIGURATOR |
| professionals | profesionales | en/professionals | ENT-PAGE-PROFESSIONALS |
| installers | instaladores | en/installers | ENT-PAGE-INSTALLERS |
| support | soporte | en/support | ENT-PAGE-SUPPORT |
| productDocumentation | soporte/marea/:slug | en/support/marea/:slug | ENT-DOC-PRODUCT (slug = family id lowercase) |

Family ids: `NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET`.
Bundle ids: `START, CRUISE, SAIL, PROTECT, COMPLETE, FLEET`.
Edition ids: from MC-05..MC-08 product definitions; do not invent editions.

### 2.5 Other ids

- Publication gates: the 13 `gateId` values in
  `docs/marea/legal-commercial/data/release-evidence-gates.json`.
- Website findings: `WEB-001` … `WEB-034` from
  `docs/marea/legal-commercial/data/website-findings.json`.
- Page metadata ids: `<pageId>:<locale>`, where `pageId` equals the current or proposed `routeId`.
- Review findings: `IA-01`, `IA-02`, … assigned by the auditor.

## 3. Dataset minimum keys

Each file uses the common envelope and the listed item fields. Additional fields are allowed.

- `current-routes.json` items: `routeId, es, en, pageFamily, contentSource, renderMode, dynamic, private, admin, guards, component, translationState, indexable, sitemapExpected, notes`.
- `current-urls.json` items: `urlId, routeId, routePattern, concreteUrl, locale, pageFamily, contentSource, renderMode, robotsPolicy, sitemapMembership, publicationState, migrationDisposition, preservationReason, evidenceSource, observedStatus`.
- `url-evidence.json` items: `evidenceId, urlId, evidenceClass, evidenceSource, observedAt, status, canonicalObserved, hreflangObserved, sitemapObserved, robotsObserved, notes`. `evidenceClass` ∈ `REPOSITORY_VERIFIED, LOCAL_SSR_VERIFIED, PUBLIC_OBSERVATION, SEARCH_CONSOLE_VERIFIED, ASSUMED, UNKNOWN`. Never claim `SEARCH_CONSOLE_VERIFIED` or `GOOGLE_INDEXED`.
- `proposed-ia.json` items: `nodeId, parentId, level, nodeType, routeId, entityId, publicationStatus, indexationAuthorized, commercialTransactionAuthorized, blockingGateIds, sortOrder`.
- `proposed-routes.json` items: `routeId, pageId, entityId, entityType, es, en, dynamic, localeIdenticalSlug, collisionStatus, collidesWith, status, publicationStatus, implementationReady, indexationAuthorized, commercialTransactionAuthorized, blockingGateIds, evidenceState`.
- `slug-governance.json` items: `ruleId, rule, appliesTo, normalization, testId`.
- `redirect-map.json` items: `redirectId, sourcePath, sourceLocale, destinationPath, destinationLocale, sourceRouteId, destinationRouteId, reason, statusCode, queryHandling, fragmentHandling, preserveEntityIdentity, canonicalDestination, riskClassification, executionStatus, authorizationRequired, active`.
- `canonical-hreflang.json` items: `pageId, locale, canonicalPolicy, canonicalUrlPattern, hreflangGroup, alternates, xDefault, reciprocity, indexable, notes`.
- `indexation-policy.json` items: `classId, appliesTo, httpStatus, robotsMeta, xRobotsTag, canonicalPolicy, hreflangPolicy, sitemapEligible, structuredDataEligible, publicationGate`.
- `structured-data-policy.json` items: `pageTypeId, schemaTypesAllowed, schemaTypesForbidden, requiredEvidence, commercialGate, restrictions`.
- `bilingual-metadata.json` items: `pageId, locale, pageType, intent, titleTemplate, descriptionTemplate, robotsPolicy, canonicalPolicy, hreflangGroup, schemaTypesAllowed, breadcrumbParent, internalLinkTargets, requiredClaimEvidence, commercialGate, publicationStatus`.
- `internal-link-graph.json` items: `edgeId, fromRouteId, toRouteId, locale, linkType, targetStatus, breadcrumbAllowed, notes`.
- `publication-gates.json` items: `gateId, name, sourceStatus, affectsPageTypes, requiredEvidenceIds, blocking, notes` plus `routeGateMatrix` items: `routeId, routeDefined, implementationReady, publicationAuthorized, indexationAuthorized, commercialTransactionAuthorized, blockingGateIds, requiredEvidenceIds`.
- `website-remediation.json` items: `findingId, currentFile, currentLineRange, currentRoute, severity, riskIds, seoOrIaImpact, recommendedAction, futureImplementationOwner, requiredEvidence, publicationGate, plannedMilestone, status, originalStatus`; `originalStatus` MUST stay `NOT_REMEDIATED` and `status` MUST be one of `PLANNED_NOT_REMEDIATED` / `OWNER_ASSIGNED_NOT_REMEDIATED`.
- `migration-phases.json` items: `phaseId, name, objective, entryCriteria, exitCriteria, authorizationRequired, executionStatus` with executionStatus `NOT_EXECUTED`.
- `risk-register.json` items: `riskId, description, likelihood, impact, severity, mitigation, rollbackTrigger, owner, status`.
- `mc16-handoff-inputs.json`: `handoffStatus, routeIdentities, familyIds, editionIds, bundleIds, localeAndSlugMappings, pageVsSkuIdentity, lifecycleFields, commercialGates, seoPublicationEligibility, structuredDataRestrictions, priceAndStockProvenance, entitlementReferences, openDependencies, MC16_STARTED`.

## 4. Hard rules encoded by validators

1. 21 current route ids exactly; ES/EN mapped; no current Spanish path moved.
2. Private routes (`cart, login, account, orderDetail`, admin) excluded from sitemap/indexable surface.
3. `shopSample` noindex; `shopDetail` indexable only for active translated products, ES-only product has no EN alternate.
4. Proposed routes use exactly the 23 ids above; status stays `PROPOSED_INTERNAL_NOT_DEPLOYABLE`; no collision with current/admin/legacy surfaces; no duplicate concrete URL; no `/marea` route marked live or sitemap-eligible.
5. Redirect map: active legacy 301s preserved; no loops/chains; destinations resolve to retained or proposed-but-justified internal targets; no redirect into unapproved MAREA pages as executable action; `executionStatus` not `EXECUTED`.
6. Canonical self-referencing per indexable page; hreflang groups reciprocal with self-reference; no alternate to missing/untranslated page; `x-default` only home.
7. Sitemap eligibility matches the indexation policy; no blocked MAREA page; no private page.
8. Structured data: no MAREA Product/Offer, no price, availability, rating, review, certification, aggregateRating while gates closed.
9. All 34 findings mapped; no finding closed; original status unchanged.
10. All 13 gates consumed; nine families and six bundles present; no existing service route removed; MC16_STARTED false.
11. Cross-file identifiers resolve; `sourceCommit` is the MC-14 HEAD; no predecessor status changes.
