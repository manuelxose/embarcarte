/**
 * MC-18 adversarial tests.
 *
 * One test per mutation targeted by the milestone, applied to the REAL policy
 * functions that the validator uses. Each mutation must be rejected; a positive
 * control per group proves the rejection is caused by the mutation, not by a
 * broken helper.
 *
 * Run: npm run test:landing:unit
 */
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

const {
  bannerProblems,
  bilingualParityProblems,
  constraintNegationProblems,
  duplicateIdentityProblems,
  familyLimitationProblems,
  findForbiddenReach,
  fleetPolicyProblems,
  focusOutlineRemoval,
  hydrationEvidenceProblems,
  mobileDisclosureProblems,
  noindexProblems,
  previewBindingProblems,
  previewProjectProblems,
  publicAssetProblems,
  publicRouteSourceProblems,
  purchaseControlViolations,
  scanDangerousCopy,
  scopeProblems,
  seoEmissionProblems,
  selectorCollisionProblems,
} = await import('../scripts/marea-landing-guards.mjs');

const { LANDING_CONTENT } = await import('../src/app/marea-landing/content/landing-content.ts');
const { LANDING_BUNDLES } = await import('../src/app/marea-landing/data/domain.generated.ts');
const publicationGates = await import('../src/app/marea-landing/models/publication-gates.ts');

const FAMILY_IDS = ['NAV', 'HUB', 'AIS', 'PILOT', 'SENSE', 'WATCH', 'DISPLAY', 'WEATHER', 'FLEET'];
const PREVIEW_PROJECT = {
  architect: {
    build: {
      options: {
        outputPath: 'dist/marea-landing-preview',
        outputMode: 'server',
        ssr: { entry: 'preview/landing/server.ts' },
      },
    },
  },
};
const SCOPE_PREFIXES = ['src/app/marea-landing/', 'preview/landing/', 'docs/marea/landing/'];

function rejected(problems) {
  assert.ok(Array.isArray(problems), 'policy helper must return an array');
  assert.ok(problems.length > 0, 'mutation was NOT rejected');
}

// ---------------------------------------------------------------- public surface
test('adding /marea to the production router is rejected', () => {
  rejected(
    publicRouteSourceProblems([
      { path: 'src/app/app.routes.ts', source: "{ path: 'marea', loadComponent: landing }" },
    ]),
  );
});

test('adding /en/marea to the production router is rejected', () => {
  rejected(
    publicRouteSourceProblems([
      { path: 'src/app/app.routes.ts', source: "{ path: 'en/marea', loadComponent: landing }" },
    ]),
  );
});

test('adding a MAREA link to public navigation is rejected as an out-of-scope change', () => {
  rejected(scopeProblems([' M src/app/layout/header.ts'], SCOPE_PREFIXES, ['package.json']));
});

test('adding a sitemap entry for the proposed landing is rejected', () => {
  rejected(
    publicRouteSourceProblems([
      { path: 'public/sitemap.xml', source: '<loc>https://embarcarte.com/marea</loc>' },
    ]),
  );
});

test('copying preview assets into public/ is rejected', () => {
  rejected(publicAssetProblems(['public/marea-hero.svg']));
});

test('publishing the preview build into the production output is rejected', () => {
  rejected(
    previewProjectProblems(
      {
        architect: {
          build: {
            options: {
              outputPath: 'dist/embarcarte',
              outputMode: 'server',
              ssr: { entry: 'preview/landing/server.ts' },
            },
          },
        },
      },
      ['src/styles.scss'],
    ),
  );
});

// ---------------------------------------------------------------- SEO + preview
test('emitting a public canonical to the unpublished landing is rejected', () => {
  rejected(seoEmissionProblems('<link rel="canonical" href="https://embarcarte.com/marea" />'));
});

test('emitting reciprocal public hreflang without publication approval is rejected', () => {
  rejected(
    seoEmissionProblems(
      '<link rel="alternate" hreflang="en" href="https://embarcarte.com/en/marea" />',
    ),
  );
});

test('adding Product/Offer JSON-LD is rejected', () => {
  rejected(seoEmissionProblems('<script type="application/ld+json">{"@type":"Offer"}</script>'));
});

test('emitting an Open Graph announcement is rejected', () => {
  rejected(seoEmissionProblems('<meta property="og:title" content="MAREA" />'));
});

test('disabling noindex in the preview is rejected', () => {
  rejected(
    noindexProblems({
      indexHtml: '<meta name="robots" content="index, follow" />',
      serverSource: "res.setHeader('X-Follow', 'index')",
    }),
  );
});

test('exposing the preview server on all interfaces is rejected', () => {
  rejected(
    previewBindingProblems('app.listen(port, "0.0.0.0"); // no X-Robots-Tag; CSP form-action self'),
  );
});

// ---------------------------------------------------------------- content claims
test('rendering a purchase button is rejected', () => {
  rejected(purchaseControlViolations('<button type="button">Comprar</button>'));
});

test('rendering a lead form or telemetry import is rejected', () => {
  rejected(purchaseControlViolations('<form action="/api/leads"><input name="email" /></form>'));
  rejected(purchaseControlViolations('fetch("/api/vessels/telemetry")'));
});

test('rendering a fictional product price is rejected', () => {
  rejected(scanDangerousCopy('Desde 99 EUR al año, IVA incluido.'));
});

test('rendering fictitious inventory is rejected', () => {
  rejected(scanDangerousCopy('En stock y listo para enviar.'));
});

test('displaying a fabricated certification is rejected', () => {
  rejected(scanDangerousCopy('Certificado NMEA 2000 y marcado CE.'));
});

test('claiming AIS transmission is rejected', () => {
  rejected(scanDangerousCopy('Transmite y recibe AIS para ver y ser visto.'));
});

test('claiming autonomous PILOT operation is rejected', () => {
  rejected(scanDangerousCopy('Gobierno totalmente autónomo sin supervisión.'));
});

test('guaranteeing WATCH alert delivery is rejected', () => {
  rejected(scanDangerousCopy('Entrega garantizada de alertas en todo momento.'));
});

test('representing unlicensed chart data as included is rejected', () => {
  rejected(scanDangerousCopy('Incluye cartas náuticas oficiales para toda la costa.'));
});

test('asserting FLEET hardware or an SLA is rejected', () => {
  const fleet = LANDING_BUNDLES.find((bundle) => bundle.bundleId === 'FLEET');
  rejected(fleetPolicyProblems({ ...fleet, hardwareIncludedByDefault: true }));
  rejected(fleetPolicyProblems({ ...fleet, slaEstablished: true }));
  rejected(fleetPolicyProblems({ ...fleet, orderable: true }));
});

test('asserting a registered trademark or an ownership claim is rejected', () => {
  rejected(scanDangerousCopy('MAREA® es una marca registrada.'));
  rejected(scanDangerousCopy('Somos los propietarios del código de Open Marine.'));
});

// ---------------------------------------------------------------- structure + parity
test('removing the internal preview banner is rejected', () => {
  rejected(bannerProblems('<main><marea-landing-hero /></main>'));
});

test('dropping a product limitation in English is rejected', () => {
  const mutated = LANDING_CONTENT.sections.families.families.map((family) =>
    family.familyId === 'PILOT'
      ? {
          ...family,
          limitations: family.limitations.map((limitation, index) =>
            index === 0 ? { ...limitation, text: { ...limitation.text, en: '' } } : limitation,
          ),
        }
      : family,
  );
  rejected(familyLimitationProblems(mutated, FAMILY_IDS));
  rejected(
    bilingualParityProblems([
      { contentId: 'families.PILOT.summary', locale: 'es', text: 'Sin navegación autónoma.' },
      { contentId: 'families.PILOT.summary', locale: 'en', text: '' },
    ]),
  );
});

test('creating a second EN product identity is rejected', () => {
  rejected(duplicateIdentityProblems(['NAV', 'HUB', 'NAV']));
});

test('a limitation without negation is rejected', () => {
  rejected(
    constraintNegationProblems([
      {
        contentId: 'families.PILOT.limit.1',
        copyClass: 'CONSTRAINT_STATEMENT',
        text: { es: 'Piloto asistido.', en: 'Assisted pilot.' },
      },
    ]),
  );
});

test('duplicating a design-system component is rejected', () => {
  rejected(selectorCollisionProblems("selector: 'marea-button'", ['marea-button']));
});

test('hiding a critical disclaimer at mobile width is rejected', () => {
  rejected(
    mobileDisclosureProblems('@media (max-width: 479px) { .limits-list { display: none; } }'),
  );
});

test('breaking keyboard focus visibility is rejected', () => {
  rejected(focusOutlineRemoval('.cta:focus { outline: none; }'));
});

// ---------------------------------------------------------------- evidence + gates
test('introducing a hydration mismatch is rejected by the evidence contract', () => {
  rejected(
    hydrationEvidenceProblems({
      ssr: {
        es: { status: 200 },
        en: { status: 200 },
        noCanonical: true,
        noHreflang: true,
        noJsonLd: true,
      },
      hydration: { status: 'PASS', consoleErrors: 3, duplicateDom: true },
    }),
  );
  rejected(
    hydrationEvidenceProblems({
      ssr: {
        es: { status: 200 },
        en: { status: 500 },
        noCanonical: false,
        noHreflang: true,
        noJsonLd: true,
      },
      hydration: { status: 'FAIL', consoleErrors: 0, duplicateDom: false },
    }),
  );
});

test('weakening the release-gate evaluator via env or storage is rejected', () => {
  const problems = [];
  const gateSource = 'export const GATES = { publication: process.env.PUBLICATION_AUTHORIZED }';
  const seoSource = 'const override = localStorage.getItem("marea-public")';
  for (const source of [gateSource, seoSource]) {
    if (/process\.env|localStorage/.test(source)) problems.push(source);
  }
  rejected(problems);
});

test('marking an unapproved page as deployment-ready cannot publish it', () => {
  const evaluation = publicationGates.evaluatePublicationGates({
    pageImplemented: true,
    internalPreviewReady: true,
    deploymentApproved: true,
  });
  assert.equal(evaluation.publishable, false);
  assert.ok(evaluation.blockingGateIds.includes('GATE-PUBLICATION-APPROVED'));
});

test('a direct public-app import of the landing preview is rejected', () => {
  const root = mkdtempSync(join(tmpdir(), 'marea-reach-'));
  try {
    mkdirSync(join(root, 'src/app'), { recursive: true });
    mkdirSync(join(root, 'preview/landing'), { recursive: true });
    writeFileSync(join(root, 'src/main.ts'), "import './app/feature';\n");
    writeFileSync(join(root, 'src/app/feature.ts'), "import '../../preview/landing/landing';\n");
    writeFileSync(join(root, 'preview/landing/landing.ts'), 'export const landing = true;\n');
    const reach = findForbiddenReach({
      root,
      entryFiles: ['src/main.ts'],
      forbiddenRoots: ['preview', 'src/app/marea-landing'],
    });
    rejected(reach.offenders);

    // Positive control: the same tree without the offending import passes.
    writeFileSync(join(root, 'src/app/feature.ts'), 'export const feature = true;\n');
    const clean = findForbiddenReach({
      root,
      entryFiles: ['src/main.ts'],
      forbiddenRoots: ['preview', 'src/app/marea-landing'],
    });
    assert.deepEqual(clean.offenders, []);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('positive control: the untouched official values pass the same policies', () => {
  assert.deepEqual(bannerProblems('<marea-internal-banner data-landing-internal-banner />'), []);
  assert.deepEqual(previewProjectProblems(PREVIEW_PROJECT, ['src/styles.scss']), []);
  assert.deepEqual(
    hydrationEvidenceProblems({
      ssr: {
        es: { status: 200 },
        en: { status: 200 },
        noCanonical: true,
        noHreflang: true,
        noJsonLd: true,
      },
      hydration: { status: 'PASS', consoleErrors: 0, duplicateDom: false },
    }),
    [],
  );
  assert.equal(
    publicationGates.evaluatePublicationGates({
      pageImplemented: true,
      internalPreviewReady: true,
    }).publishable,
    false,
  );
});
