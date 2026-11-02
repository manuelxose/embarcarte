import assert from 'node:assert/strict';
import test from 'node:test';
import { loadData, validateData } from './check-marea-ia-seo.mjs';

const data = loadData();
const baseline = validateData(data);
const codes = (mutation) => {
  const clone = structuredClone(data);
  mutation(clone);
  return validateData(clone).map((error) => error.code);
};

test('baseline package is valid', () => {
  assert.deepEqual(baseline, [], JSON.stringify(baseline, null, 2));
});

test('rejects a dataset without contract identity', () => {
  const found = codes((d) => delete d['current-routes'].contractId);
  assert.ok(found.includes('IA-001'));
});

test('rejects a changed source commit', () => {
  const found = codes((d) => {
    d['current-routes'].sourceCommit = '0000000000000000000000000000000000000000';
  });
  assert.ok(found.includes('IA-002'));
});

test('rejects a missing current semantic route', () => {
  const found = codes((d) => {
    d['current-routes'].items = d['current-routes'].items.filter(
      (item) => item.routeId !== 'about',
    );
  });
  assert.ok(found.includes('IA-005'));
});

test('rejects a moved Spanish route', () => {
  const found = codes((d) => {
    const item = d['current-routes'].items.find((route) => route.routeId === 'technology');
    item.es = 'tecnologia-nueva';
  });
  assert.ok(found.includes('IA-006'));
});

test('rejects a duplicate current route', () => {
  const found = codes((d) => {
    d['current-routes'].items.push(structuredClone(d['current-routes'].items[0]));
  });
  assert.ok(found.includes('IA-007'));
});

test('rejects a missing private-route noindex flag', () => {
  const found = codes((d) => {
    const item = d['current-routes'].items.find((route) => route.routeId === 'cart');
    item.private = false;
    item.indexable = true;
  });
  assert.ok(found.includes('IA-009'));
});

test('rejects a duplicate concrete current URL', () => {
  const found = codes((d) => {
    d['current-urls'].items.push(structuredClone(d['current-urls'].items[0]));
  });
  assert.ok(found.includes('IA-012'));
});

test('rejects a lost Spanish URL preservation reason', () => {
  const found = codes((d) => {
    const item = d['current-urls'].items.find(
      (url) => url.locale === 'es' && url.concreteUrl === '/tecnologia',
    );
    item.migrationDisposition = 'REDIRECT_301';
  });
  assert.ok(found.includes('IA-014'));
});

test('rejects a private URL added to the sitemap', () => {
  const found = codes((d) => {
    const item = d['current-urls'].items.find((url) => url.routeId === 'cart');
    item.sitemapMembership = true;
  });
  assert.ok(found.includes('IA-015'));
});

test('rejects a sample URL without noindex', () => {
  const found = codes((d) => {
    const item = d['current-urls'].items.find((url) => url.routeId === 'shopSample');
    item.robotsPolicy = 'index, follow';
  });
  assert.ok(found.includes('IA-017'));
});

test('rejects a Search Console evidence claim', () => {
  const found = codes((d) => {
    d['url-evidence'].items[0].evidenceClass = 'SEARCH_CONSOLE_VERIFIED';
  });
  assert.ok(found.includes('IA-018'));
});

test('rejects a Google-indexed claim', () => {
  const found = codes((d) => {
    d['url-evidence'].items[0].notes = 'GOOGLE_INDEXED confirmed';
  });
  assert.ok(found.includes('IA-018'));
});

test('rejects a missing proposed route', () => {
  const found = codes((d) => {
    d['proposed-routes'].items = d['proposed-routes'].items.filter(
      (item) => item.routeId !== 'mareaFamilyPilot',
    );
  });
  assert.ok(found.includes('IA-019'));
});

test('rejects a proposed route marked published', () => {
  const found = codes((d) => {
    const item = d['proposed-routes'].items[0];
    item.status = 'PUBLISHED';
    item.publicationStatus = 'PUBLISHED';
  });
  assert.ok(found.includes('IA-021'));
});

test('rejects a proposed route without blocking gates', () => {
  const found = codes((d) => {
    const item = d['proposed-routes'].items[0];
    item.blockingGateIds = [];
  });
  assert.ok(found.includes('IA-022'));
});

test('rejects a proposed route colliding with an existing path', () => {
  const found = codes((d) => {
    const item = d['proposed-routes'].items.find((route) => route.routeId === 'professionals');
    item.es = 'servicios';
  });
  assert.ok(found.includes('IA-024'));
});

test('rejects a duplicate proposed concrete URL', () => {
  const found = codes((d) => {
    const item = d['proposed-routes'].items.find((route) => route.routeId === 'mareaOverview');
    item.es = 'marea/nav';
  });
  assert.ok(found.includes('IA-024') || found.includes('IA-025'));
});

test('rejects a proposed route marked sitemap eligible', () => {
  const found = codes((d) => {
    d['proposed-routes'].items[0].sitemapEligible = true;
  });
  assert.ok(found.includes('IA-044'));
});

test('rejects an IA node for an unknown route', () => {
  const found = codes((d) => {
    d['proposed-ia'].items[0].routeId = 'mareaGhost';
  });
  assert.ok(found.includes('IA-027'));
});

test('rejects a missing slug-governance entity', () => {
  const found = codes((d) => {
    d['slug-governance'].entitySlug = d['slug-governance'].entitySlug.filter(
      (entity) => entity.entityId !== 'ENT-BUNDLE-FLEET',
    );
  });
  assert.ok(found.includes('IA-028'));
});

test('rejects an active legacy redirect removal', () => {
  const found = codes((d) => {
    d['redirect-map'].items = d['redirect-map'].items.filter(
      (item) => item.redirectId !== 'legacyProductos',
    );
  });
  assert.ok(found.includes('IA-031'));
});

test('rejects a redirect loop', () => {
  const found = codes((d) => {
    d['redirect-map'].items.push({
      redirectId: 'loop-test',
      sourcePath: '/tecnologia',
      destinationPath: '/open-marine',
      statusCode: 301,
      active: true,
      sourceLocale: 'es',
      destinationLocale: 'es',
      reason: 'negative test',
      queryHandling: 'PRESERVE',
      fragmentHandling: 'PRESERVE',
      riskClassification: 'HIGH',
      executionStatus: 'NOT_EXECUTED',
    });
  });
  assert.ok(found.includes('IA-032') || found.includes('IA-035'));
});

test('rejects a redirect chain', () => {
  const found = codes((d) => {
    d['redirect-map'].items.push({
      redirectId: 'chain-a',
      sourcePath: '/a-test',
      destinationPath: '/b-test',
      statusCode: 301,
      active: true,
      sourceLocale: 'es',
      destinationLocale: 'es',
      reason: 'negative test',
      queryHandling: 'PRESERVE',
      fragmentHandling: 'PRESERVE',
      riskClassification: 'HIGH',
      executionStatus: 'NOT_EXECUTED',
    });
    d['redirect-map'].items.push({
      redirectId: 'chain-b',
      sourcePath: '/b-test',
      destinationPath: '/tecnologia',
      statusCode: 301,
      active: true,
      sourceLocale: 'es',
      destinationLocale: 'es',
      reason: 'negative test',
      queryHandling: 'PRESERVE',
      fragmentHandling: 'PRESERVE',
      riskClassification: 'HIGH',
      executionStatus: 'NOT_EXECUTED',
    });
  });
  assert.ok(found.includes('IA-033'));
});

test('rejects an active redirect into the blocked MAREA surface', () => {
  const found = codes((d) => {
    const item = d['redirect-map'].items.find(
      (redirect) => redirect.redirectId === 'legacyOpenMarine',
    );
    item.destinationPath = '/marea';
  });
  assert.ok(found.includes('IA-035'));
});

test('rejects an executed redirect in MC-15', () => {
  const found = codes((d) => {
    d['redirect-map'].items[0].executionStatus = 'EXECUTED';
  });
  assert.ok(found.includes('IA-036'));
});

test('rejects a missing canonical locale row', () => {
  const found = codes((d) => {
    d['canonical-hreflang'].items = d['canonical-hreflang'].items.filter(
      (item) => !(item.pageId === 'about' && item.locale === 'en'),
    );
  });
  assert.ok(found.includes('IA-037'));
});

test('rejects a wrong canonical path', () => {
  const found = codes((d) => {
    const item = d['canonical-hreflang'].items.find(
      (candidate) => candidate.pageId === 'technology' && candidate.locale === 'es',
    );
    item.canonicalUrlPattern = '/tecnologia/otra';
  });
  assert.ok(found.includes('IA-038'));
});

test('rejects a proposed page with a canonical', () => {
  const found = codes((d) => {
    const item = d['canonical-hreflang'].items.find(
      (candidate) => candidate.pageId === 'mareaOverview' && candidate.locale === 'es',
    );
    item.canonicalPolicy = 'SELF';
  });
  assert.ok(found.includes('IA-039'));
});

test('rejects a private page canonical', () => {
  const found = codes((d) => {
    const item = d['canonical-hreflang'].items.find(
      (candidate) => candidate.pageId === 'account' && candidate.locale === 'es',
    );
    item.canonicalPolicy = 'SELF';
  });
  assert.ok(found.includes('IA-039'));
});

test('rejects x-default on a non-home page', () => {
  const found = codes((d) => {
    const item = d['canonical-hreflang'].items.find(
      (candidate) => candidate.pageId === 'about' && candidate.locale === 'es',
    );
    item.xDefault = '/';
  });
  assert.ok(found.includes('IA-042'));
});

test('rejects a missing x-default on the home page', () => {
  const found = codes((d) => {
    const item = d['canonical-hreflang'].items.find(
      (candidate) => candidate.pageId === 'home' && candidate.locale === 'es',
    );
    item.xDefault = null;
  });
  assert.ok(found.includes('IA-042'));
});

test('rejects a blocked MAREA indexation class eligible for the sitemap', () => {
  const found = codes((d) => {
    const item = d['indexation-policy'].items.find((candidate) =>
      /marea/i.test(candidate.appliesTo ?? ''),
    );
    if (!item) {
      const fallback = d['indexation-policy'].items[0];
      fallback.appliesTo = 'MAREA proposed page';
      fallback.sitemapEligible = true;
    } else {
      item.sitemapEligible = true;
    }
  });
  assert.ok(found.includes('IA-044'));
});

test('rejects Product schema for a blocked MAREA page', () => {
  const found = codes((d) => {
    const row = d['structured-data-policy'].pageIdentityMatrix.find(
      (candidate) => candidate.pageId === 'mareaFamilyNav',
    );
    row.allowedTypes = ['Product', 'Offer'];
  });
  assert.ok(found.includes('IA-046'));
});

test('rejects a missing bilingual metadata row', () => {
  const found = codes((d) => {
    d['bilingual-metadata'].items = d['bilingual-metadata'].items.filter(
      (item) => !(item.pageId === 'mareaFamilyNav' && item.locale === 'en'),
    );
  });
  assert.ok(found.includes('IA-048'));
});

test('rejects the MAREA brand in proposed metadata', () => {
  const found = codes((d) => {
    const item = d['bilingual-metadata'].items.find(
      (candidate) => candidate.pageId === 'mareaOverview',
    );
    item.titleTemplate = 'MAREA — navigation ecosystem';
  });
  assert.ok(found.includes('IA-049'));
});

test('rejects a forbidden price claim in proposed metadata', () => {
  const found = codes((d) => {
    const item = d['bilingual-metadata'].items.find(
      (candidate) => candidate.pageId === 'mareaFamilyHub',
    );
    item.descriptionTemplate = 'Buy now from 499 EUR';
  });
  assert.ok(found.includes('IA-049'));
});

test('rejects a published proposed metadata status', () => {
  const found = codes((d) => {
    const item = d['bilingual-metadata'].items.find(
      (candidate) => candidate.pageId === 'mareaFamilyAis',
    );
    item.publicationStatus = 'PUBLISHED';
  });
  assert.ok(found.includes('IA-049'));
});

test('rejects an unresolved internal link target', () => {
  const found = codes((d) => {
    d['bilingual-metadata'].items[0].internalLinkTargets = ['mareaGhost'];
  });
  assert.ok(found.includes('IA-050'));
});

test('rejects a live navigation link to a blocked proposed route', () => {
  const found = codes((d) => {
    d['internal-link-graph'].items.push({
      edgeId: 'live-to-marea',
      fromRouteId: 'home',
      toRouteId: 'mareaOverview',
      locale: 'es',
      linkType: 'PRIMARY_NAV',
      targetStatus: d['proposed-routes'].items[0].status,
      plannedNotLive: true,
    });
  });
  assert.ok(found.includes('IA-052'));
});

test('rejects an orphan proposed page', () => {
  const found = codes((d) => {
    d['internal-link-graph'].items = d['internal-link-graph'].items.filter(
      (edge) => edge.toRouteId !== 'mareaFamilyWeather',
    );
  });
  assert.ok(found.includes('IA-053'));
});

test('rejects a breadcrumb cycle', () => {
  const found = codes((d) => {
    for (const item of d['bilingual-metadata'].items.filter(
      (candidate) => candidate.pageId === 'mareaOverview',
    )) {
      item.breadcrumbParent = 'mareaFamilyNav';
    }
  });
  assert.ok(found.includes('IA-054'));
});

test('rejects a missing release gate', () => {
  const found = codes((d) => {
    d['publication-gates'].gates = d['publication-gates'].gates.filter(
      (gate) => gate.gateId !== 'GATE-IP-CLEARANCE',
    );
  });
  assert.ok(found.includes('IA-055'));
});

test('rejects an authorization leaked into the route gate matrix', () => {
  const found = codes((d) => {
    d['publication-gates'].routeGateMatrix[0].publicationAuthorized = true;
  });
  assert.ok(found.includes('IA-057'));
});

test('rejects a missing route gate matrix row', () => {
  const found = codes((d) => {
    d['publication-gates'].routeGateMatrix = d['publication-gates'].routeGateMatrix.filter(
      (row) => row.routeId !== 'mareaFamilyPilot',
    );
  });
  assert.ok(found.includes('IA-057'));
});

test('rejects a missing website finding', () => {
  const found = codes((d) => {
    d['website-remediation'].items = d['website-remediation'].items.filter(
      (item) => item.findingId !== 'WEB-017',
    );
  });
  assert.ok(found.includes('IA-058'));
});

test('rejects a silently closed website finding', () => {
  const found = codes((d) => {
    d['website-remediation'].items[0].originalStatus = 'REMEDIATED';
  });
  assert.ok(found.includes('IA-059'));
});

test('rejects a closed remediation status', () => {
  const found = codes((d) => {
    d['website-remediation'].items[0].status = 'REMEDIATED';
  });
  assert.ok(found.includes('IA-059'));
});

test('rejects an executed migration phase', () => {
  const found = codes((d) => {
    d['migration-phases'].items[0].executionStatus = 'EXECUTED';
  });
  assert.ok(found.includes('IA-060'));
});

test('rejects a closed risk without evidence', () => {
  const found = codes((d) => {
    d['risk-register'].items[0].status = 'CLOSED';
    delete d['risk-register'].items[0].evidence;
  });
  assert.ok(found.includes('IA-061'));
});

test('rejects MC-16 being recorded as started', () => {
  const found = codes((d) => {
    d['mc16-handoff-inputs'].MC16_STARTED = true;
  });
  assert.ok(found.includes('IA-062'));
});

test('rejects a missing MC-16 edition', () => {
  const found = codes((d) => {
    d['mc16-handoff-inputs'].editionIds = d['mc16-handoff-inputs'].editionIds.filter(
      (edition) => edition !== 'PILOT-PRO',
    );
  });
  assert.ok(found.includes('IA-062'));
});

test('rejects a manifest that omits a dataset', () => {
  const found = codes((d) => {
    d.manifest.datasets = d.manifest.datasets.filter((item) => item.name !== 'redirect-map');
  });
  assert.ok(found.includes('IA-063'));
});

test('rejects a published admin route', () => {
  const found = codes((d) => {
    const item = d['current-routes'].items.find((route) => route.routeId === 'adminOrders');
    item.publicationState = 'PUBLISHED';
  });
  assert.ok(found.includes('IA-064'));
});

test('rejects divergent blocking gate lists (IA-01)', () => {
  const found = codes((d) => {
    const item = d['proposed-routes'].items.find((route) => route.routeId === 'mareaOverview');
    item.blockingGateIds = item.blockingGateIds.filter((gate) => gate !== 'GATE-SAFETY-PILOT');
  });
  assert.ok(found.includes('IA-068'));
});

test('rejects an AIS transmission claim (IA-02)', () => {
  const found = codes((d) => {
    const item = d['bilingual-metadata'].items.find(
      (candidate) => candidate.pageId === 'mareaFamilyAis' && candidate.locale === 'es',
    );
    item.descriptionTemplate =
      'Familia AIS con transmision AIS integrada y alcance de 30 millas nauticas.';
  });
  assert.ok(found.includes('IA-069'));
});

test('rejects a FLEET default-hardware claim (IA-02)', () => {
  const found = codes((d) => {
    const item = d['bilingual-metadata'].items.find(
      (candidate) => candidate.pageId === 'mareaFamilyFleet' && candidate.locale === 'en',
    );
    item.descriptionTemplate = 'FLEET ships with default hardware on every vessel.';
  });
  assert.ok(found.includes('IA-069'));
});

test('rejects a sitemap membership contradiction (IA-03)', () => {
  const found = codes((d) => {
    const item = d['current-routes'].items.find((route) => route.routeId === 'shop');
    item.sitemapExpected = false;
  });
  assert.ok(found.includes('IA-070'));
});
