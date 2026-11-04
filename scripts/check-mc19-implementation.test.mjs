/**
 * MC-19 validator unit + adversarial suite.
 *
 * The suite exercises the exported guards with both the real repository data and
 * deliberately mutated copies, so a guard that silently stops rejecting a
 * defect fails here.
 *
 * Run: npm run test:mc19:unit
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildProjection } from './mc19-segments-projection.mjs';
import {
  SEGMENT_IDENTITIES,
  SEGMENT_PREVIEW_ROUTES,
} from '../src/app/marea-segments/models/segment-identity.ts';
import { LOCALIZED_ROUTES } from '../src/app/core/i18n/locale-routes.ts';
import { SEGMENT_EVIDENCE } from '../src/app/marea-segments/content/evidence.ts';
import {
  allowedChangeProblems,
  claimProblems,
  contentProblems,
  datasetProblems,
  designSystemProblems,
  differentiationProblems,
  governanceProblems,
  identityProblems,
  instructionProblems,
  interactionProblems,
  parityProblems,
  porcelainPaths,
  publicSurfaceProblems,
} from './check-mc19-implementation.mjs';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'));

const instruction = readJson('docs/marea/segments/data/mc19-scope-instruction.json');
const proposed = readJson('docs/marea/information-architecture/data/proposed-routes.json');
const families = readJson('docs/marea/commerce-data/data/product-families.json');
const projection = buildProjection();
const canonicalFamilies = families.families.map((entry) => entry.familyId);

const clone = (value) => JSON.parse(JSON.stringify(value));

// ---------------------------------------------------------------- governance

test('real governance flags pass', () => {
  assert.deepEqual(governanceProblems(instruction.governance), []);
});

test('a mutated governance flag fails', () => {
  const mutated = clone(instruction.governance);
  mutated.publicationAuthorized = true;
  assert.ok(governanceProblems(mutated).length > 0);
});

test('a missing governance block fails', () => {
  assert.deepEqual(governanceProblems(null), ['governance block missing']);
});

// ---------------------------------------------------------------- instruction

test('the recorded instruction passes its provenance contract', () => {
  assert.deepEqual(instructionProblems(instruction), []);
});

test('claiming the prompt was previously recorded fails', () => {
  const mutated = clone(instruction);
  mutated.promptProvenance.previouslyRecordedInRepository = true;
  assert.ok(
    instructionProblems(mutated).some((item) => item.includes('previouslyRecordedInRepository')),
  );
});

test('a fabricated named approver fails', () => {
  const mutated = clone(instruction);
  mutated.namedApproverBeyondProductOwner = 'SIGNED';
  assert.ok(
    instructionProblems(mutated).some((item) => item.includes('namedApproverBeyondProductOwner')),
  );
});

test('a global PASS verdict fails', () => {
  const mutated = clone(instruction);
  mutated.globalVerdict = 'PASS';
  assert.ok(instructionProblems(mutated).some((item) => item.includes('globalVerdict')));
});

test('an unexpected delivery state fails', () => {
  const mutated = clone(instruction);
  mutated.deliveryState.merged = true;
  assert.ok(instructionProblems(mutated).some((item) => item.includes('deliveryState.merged')));
});

// ---------------------------------------------------------------- identities

test('the real identity set has no collision', () => {
  assert.deepEqual(
    identityProblems({
      identities: SEGMENT_IDENTITIES,
      previewRoutes: SEGMENT_PREVIEW_ROUTES,
      publicRoutes: LOCALIZED_ROUTES,
      proposedRoutes: proposed.items,
    }),
    [],
  );
});

test('a preview path equal to a public route collides', () => {
  const mutated = clone(SEGMENT_IDENTITIES);
  mutated.professionals.preview.es = 'tecnologia';
  const out = identityProblems({
    identities: mutated,
    previewRoutes: SEGMENT_PREVIEW_ROUTES,
    publicRoutes: LOCALIZED_ROUTES,
    proposedRoutes: proposed.items,
  });
  assert.ok(out.some((item) => item.includes('collides with a public route')));
});

test('a preview path equal to a proposed route collides', () => {
  const mutated = clone(SEGMENT_IDENTITIES);
  mutated.installers.preview.es = 'internal/segments/installers';
  mutated.installers.reservedPublicPath = null;
  const out = identityProblems({
    identities: mutated,
    previewRoutes: SEGMENT_PREVIEW_ROUTES,
    publicRoutes: LOCALIZED_ROUTES,
    proposedRoutes: [
      { routeId: 'x', routePatternEs: '/internal/segments/installers', routePatternEn: '/en/x' },
    ],
  });
  assert.ok(out.some((item) => item.includes('collides with a proposed route')));
});

test('a public path for shipowners fails', () => {
  const mutated = clone(SEGMENT_IDENTITIES);
  mutated.shipowners.reservedPublicPath = { es: '/armadores', en: '/en/shipowners' };
  const out = identityProblems({
    identities: mutated,
    previewRoutes: SEGMENT_PREVIEW_ROUTES,
    publicRoutes: LOCALIZED_ROUTES,
    proposedRoutes: proposed.items,
  });
  assert.ok(out.some((item) => item.includes('must not reserve a public path')));
});

test('an MC-15 page type mismatch fails', () => {
  const mutated = clone(SEGMENT_IDENTITIES);
  mutated.professionals.mc15PageType = 'SUPPORT';
  const out = identityProblems({
    identities: mutated,
    previewRoutes: SEGMENT_PREVIEW_ROUTES,
    publicRoutes: LOCALIZED_ROUTES,
    proposedRoutes: proposed.items,
  });
  assert.ok(out.some((item) => item.includes('pageType differs from MC-15')));
});

// ---------------------------------------------------------------- content

test('the real content projection passes its contract', () => {
  assert.deepEqual(contentProblems(projection), []);
});

test('an approval-status change is rejected', () => {
  const mutated = clone(projection);
  mutated.resolved[0].approvalStatus = 'APPROVED';
  assert.ok(contentProblems(mutated).some((item) => item.includes('approvalStatus changed')));
});

test('empty copy is rejected', () => {
  const mutated = clone(projection);
  mutated.resolved[0].text = '   ';
  assert.ok(contentProblems(mutated).some((item) => item.includes('empty text')));
});

test('unresolved evidence is rejected', () => {
  const mutated = clone(projection);
  mutated.resolved[0].evidenceIds = ['EV-NOT-A-REAL-ID'];
  assert.ok(contentProblems(mutated).some((item) => item.includes('unresolved evidence')));
});

test('a block repeated more than once per locale is rejected', () => {
  const mutated = clone(projection);
  mutated.resolved.push(clone(mutated.resolved[0]));
  assert.ok(contentProblems(mutated).some((item) => item.includes('appears 3 times')));
});

test('an uppercase TODO placeholder is rejected but Spanish “Todo” is not', () => {
  const mutated = clone(projection);
  mutated.resolved[0].text = 'TODO rellenar';
  assert.ok(contentProblems(mutated).some((item) => item.includes('placeholder text')));
  const spanish = clone(projection);
  spanish.resolved[0].text = 'Todo está NOT_FOR_SALE';
  assert.equal(
    contentProblems(spanish).some((item) => item.includes('placeholder text')),
    false,
  );
});

test('a missing evidence source file is rejected', () => {
  const mutated = clone(projection);
  const out = contentProblems(mutated, {
    evidence: SEGMENT_EVIDENCE,
    fileExists: () => false,
  });
  assert.ok(out.some((item) => item.includes('evidence source missing')));
});

// ---------------------------------------------------------------- parity

test('the real projection is ES/EN parity-clean', () => {
  assert.deepEqual(parityProblems(projection), []);
});

test('a missing EN record is rejected', () => {
  const mutated = clone(projection);
  mutated.resolved = mutated.resolved.filter(
    (record) => !(record.locale === 'en' && record.contentId === 'SEG-PRO.hero.kicker'),
  );
  const out = parityProblems(mutated);
  assert.ok(out.some((item) => item.includes('locale record counts differ')));
});

test('Spanish diacritics in English copy are rejected', () => {
  const mutated = clone(projection);
  const record = mutated.resolved.find(
    (entry) => entry.locale === 'en' && entry.contentId === 'SEG-PRO.hero.kicker',
  );
  record.text = 'Página interna';
  assert.ok(parityProblems(mutated).some((item) => item.includes('Spanish diacritics')));
});

test('Spanish function words in English copy are rejected', () => {
  const mutated = clone(projection);
  const record = mutated.resolved.find(
    (entry) => entry.locale === 'en' && entry.contentId === 'SEG-PRO.hero.kicker',
  );
  record.text = 'Internal page para professionals';
  assert.ok(parityProblems(mutated).some((item) => item.includes('Spanish function words')));
});

// ---------------------------------------------------------------- claims

test('an affirmative prohibited claim is rejected', () => {
  const out = claimProblems([{ where: 'x', text: 'Producto certificado CE.' }]);
  assert.ok(out.some((item) => item.includes('certificado ce')));
});

test('a negated prohibited claim is allowed', () => {
  const out = claimProblems([
    { where: 'x', text: 'No se afirma certificación CE en ninguna página.' },
    {
      where: 'y',
      text: 'No certification, approval, sea trial or tested compatibility is claimed.',
    },
  ]);
  assert.deepEqual(out, []);
});

test('a monetary amount is rejected', () => {
  const out = claimProblems([{ where: 'x', text: 'Desde 499 €.' }]);
  assert.ok(out.some((item) => item.includes('monetary amount')));
});

// ---------------------------------------------------------------- differentiation

test('the real audience differentiation passes', () => {
  assert.deepEqual(differentiationProblems(projection, canonicalFamilies), []);
});

test('identical family selections are rejected', () => {
  const mutated = clone(projection);
  mutated.segments.installers.families = [...mutated.segments.professionals.families];
  assert.ok(
    differentiationProblems(mutated, canonicalFamilies).some((item) =>
      item.includes('not differentiated'),
    ),
  );
});

test('professionals without FLEET and shipowners with FLEET are rejected', () => {
  const mutated = clone(projection);
  mutated.segments.professionals.families = mutated.segments.professionals.families.filter(
    (familyId) => familyId !== 'FLEET',
  );
  mutated.segments.shipowners.families.push('FLEET');
  const out = differentiationProblems(mutated, canonicalFamilies);
  assert.ok(out.some((item) => item.includes('professionals must reference')));
  assert.ok(out.some((item) => item.includes('shipowners must not present FLEET')));
});

// ---------------------------------------------------------------- interactions

test('forms, inputs, fetches and storage are rejected', () => {
  const out = interactionProblems({
    'a.ts': '<form></form>',
    'b.ts': '<input type="email">',
    'c.ts': 'await fetch("/api/lead")',
    'd.ts': 'localStorage.setItem("x", "y")',
  });
  // form, input, email field, fetch and /api/ endpoint, localStorage
  assert.equal(out.length, 6);
});

test('clean sources pass the interaction guard', () => {
  assert.deepEqual(
    interactionProblems({ 'a.ts': '<p>sin formularios</p>', 'b.ts': 'export const x = 1;' }),
    [],
  );
});

// ---------------------------------------------------------------- public surface

test('production sources that reach MC-19 are rejected', () => {
  const out = publicSurfaceProblems({
    'src/app/app.routes.ts': "import { X } from './marea-segments/x';",
    'src/server.ts': "route('/internal/segments/professionals')",
  });
  assert.equal(out.length, 2);
});

test('clean production sources pass', () => {
  assert.deepEqual(publicSurfaceProblems({ 'src/main.ts': 'bootstrapApplication(App);' }), []);
});

// ---------------------------------------------------------------- design system

test('required MC-17 modules pass when they resolve', () => {
  const reusedModules = [
    'src/app/marea-design-system/theme/marea-theme',
    'src/app/marea-design-system/components/foundation/marea-text',
    'src/app/marea-design-system/components/foundation/marea-notice',
    'src/app/marea-design-system/components/structured/marea-responsive-nav',
    'src/app/marea-design-system/components/commerce/marea-family-card',
    'src/app/marea-design-system/components/commerce/marea-readiness-panel',
    'src/app/marea-design-system/components/commerce/marea-commercial-cta',
    'src/app/marea-design-system/components/structured/marea-definition-list',
    'src/app/marea-design-system/components/foundation/marea-button',
  ];
  assert.deepEqual(designSystemProblems({ reusedModules, existsFn: () => true }), []);
});

test('a missing required module, a selector collision and a token fork are rejected', () => {
  const out = designSystemProblems({
    reusedModules: ['src/app/marea-design-system/theme/marea-theme'],
    existsFn: () => true,
    segmentsSources: {
      'src/app/marea-segments/x.ts': "selector: 'marea-notice' :host { --marea-action: red; }",
    },
    designSystemSelectors: new Set(['marea-notice', 'marea-text']),
  });
  assert.ok(out.some((item) => item.includes('missing MC-17 reuse')));
  assert.ok(out.some((item) => item.includes('selector collision')));
  assert.ok(out.some((item) => item.includes('defines MC-17 design tokens')));
});

test('a changed design system is rejected', () => {
  const reusedModules = [
    'src/app/marea-design-system/theme/marea-theme',
    'src/app/marea-design-system/components/foundation/marea-text',
    'src/app/marea-design-system/components/foundation/marea-notice',
    'src/app/marea-design-system/components/structured/marea-responsive-nav',
    'src/app/marea-design-system/components/commerce/marea-family-card',
    'src/app/marea-design-system/components/commerce/marea-readiness-panel',
    'src/app/marea-design-system/components/commerce/marea-commercial-cta',
    'src/app/marea-design-system/components/structured/marea-definition-list',
    'src/app/marea-design-system/components/foundation/marea-button',
  ];
  const out = designSystemProblems({
    reusedModules,
    existsFn: () => true,
    designSystemChanged: ['src/app/marea-design-system/components/foundation/marea-text.ts'],
  });
  assert.ok(out.some((item) => item.includes('design system changed')));
});

// ---------------------------------------------------------------- changed set

test('the real change allowlist accepts the MC-19 scope', () => {
  assert.deepEqual(
    allowedChangeProblems([
      'src/app/marea-segments/segment-page.ts',
      'preview/landing/server.ts',
      'scripts/check-mc19-implementation.mjs',
      'docs/marea/segments/MC19-IA-DECISION.md',
      'e2e/segments/ssr.spec.ts',
      'playwright.segments.config.ts',
      'package.json',
    ]),
    [],
  );
});

test('out-of-scope and traversal paths are rejected', () => {
  const out = allowedChangeProblems([
    'src/app/app.routes.ts',
    'src/server.ts',
    'public/sitemap.xml',
    'e2e/landing/visual.spec.ts',
    'src/../secret.txt',
  ]);
  assert.equal(out.length, 5);
});

test('porcelain parsing keeps both sides of a rename and untracked files', () => {
  const output = [
    '?? docs/marea/segments/new.md',
    'R  src/server.ts -> docs/marea/segments/server.ts',
    ' M src/app/marea-segments/segment-page.ts',
    '',
  ].join('\n');
  assert.deepEqual(porcelainPaths(output), [
    'docs/marea/segments/new.md',
    'src/server.ts',
    'docs/marea/segments/server.ts',
    'src/app/marea-segments/segment-page.ts',
  ]);
});

// ---------------------------------------------------------------- datasets

test('matching datasets pass', () => {
  const payload = Buffer.from('x');
  const inventory = {
    files: [
      {
        path: 'a.ts',
        bytes: 1,
        sha256: '2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881',
      },
    ],
    totals: { files: 1 },
  };
  const out = datasetProblems({
    committedProjection: projection,
    rebuiltProjection: clone(projection),
    inventory,
    readFileFn: () => payload,
    existsFn: () => true,
  });
  assert.deepEqual(out, []);
});

test('a stale projection and a changed file digest are rejected', () => {
  const inventory = {
    files: [{ path: 'a.ts', bytes: 1, sha256: 'deadbeef' }],
    totals: { files: 1 },
  };
  const out = datasetProblems({
    committedProjection: clone(projection),
    rebuiltProjection: { ...projection, counts: { ...projection.counts, pages: 99 } },
    inventory,
    readFileFn: () => Buffer.from('x'),
    existsFn: () => true,
  });
  assert.ok(out.some((item) => item.includes('projection dataset is stale')));
  assert.ok(out.some((item) => item.includes('inventory digest differs')));
});
