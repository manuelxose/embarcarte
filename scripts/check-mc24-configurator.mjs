#!/usr/bin/env node
/**
 * MC-24 configuration validator.
 *
 * Verifies the delivered configurator against the authoritative contracts and
 * the milestone acceptance criteria. Read-only: no writes, no network, no clock.
 * Exits 1 when any check fails.
 *
 * Each check states what it proves. A green run is evidence for exactly those
 * statements and nothing more.
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { register } from 'node:module';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
register('./marea-landing-ts-loader.mjs', import.meta.url);
import { fileAt } from './mc23-git-reader.mjs';

const checks = [];
function check(id, title, run) {
  try {
    const detail = run();
    checks.push({ id, title, pass: true, detail: detail ?? '' });
  } catch (error) {
    checks.push({
      id,
      title,
      pass: false,
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
function assert(condition, message) {
  if (!condition) throw new Error(message);
}
/** Throws when `fn` does NOT throw; used for the freeze/refusal assertions. */
assert.throws = (fn, message) => {
  let threw = false;
  try {
    fn();
  } catch {
    threw = true;
  }
  if (!threw) throw new Error(message);
};

function readJson(relative) {
  return JSON.parse(readFileSync(resolve(root, relative), 'utf8'));
}
function readText(relative) {
  return readFileSync(resolve(root, relative), 'utf8');
}

const engine = await import('../src/app/marea-catalog/data/configurator-engine.ts');
const triage = await import('../src/app/marea-catalog/data/configurator-triage.ts');
const generated = await import('../src/app/marea-catalog/data/configurator.generated.ts');
const identity = await import('../src/app/marea-catalog/models/configurator-identity.ts');
const content = await import('../src/app/marea-catalog/content/configurator.ts');
const guards = await import('./mc20-catalog-guards.mjs');

const contract = readJson('docs/marea/bundles/bundle-definitions.json');
const allAnswers = (bundleId) =>
  Object.fromEntries(
    (engine.MANDATORY_QUESTION_IDS[bundleId] ?? []).map((id) => [id, 'respuesta']),
  );

// ---------------------------------------------------------------------------
// AC-01 — the outcome vocabulary is exactly the four D5 §9.2 outcomes
// ---------------------------------------------------------------------------
check('MC24-01', 'the outcome vocabulary is exactly the four D5 §9.2 outcomes', () => {
  const expected = [
    'ELIGIBLE_SELF_INSTALL',
    'INSTALLER_ASSESSMENT_REQUIRED',
    'NOT_SUPPORTED',
    'INSUFFICIENT_INFORMATION',
  ];
  assert(
    JSON.stringify([...engine.CONFIGURATOR_OUTCOMES]) === JSON.stringify(expected),
    `unexpected vocabulary ${JSON.stringify(engine.CONFIGURATOR_OUTCOMES)}`,
  );
  const spec = readText('docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md');
  const missing = expected.filter((outcome) => !spec.includes(outcome));
  assert(missing.length === 0, `D5 does not define ${missing.join(', ')}`);
  return `${expected.length} outcomes, all present in the D5 contract`;
});

// ---------------------------------------------------------------------------
// AC-02 — ELIGIBLE_SELF_INSTALL is unreachable while the rule set is empty
// ---------------------------------------------------------------------------
check('MC24-02', 'ELIGIBLE_SELF_INSTALL is unreachable while no validated rule exists', () => {
  assert(
    engine.VALIDATED_SELF_INSTALL_RULES.length === 0,
    `validated rule registry must be empty, found ${engine.VALIDATED_SELF_INSTALL_RULES.length}`,
  );
  // The invariant must be structural, not conventional: an earlier revision
  // exported a mutable array and one push() made the eligible outcome reachable.
  assert(
    Object.isFrozen(engine.VALIDATED_SELF_INSTALL_RULES),
    'the validated rule registry is not frozen and can be mutated at runtime',
  );
  assert.throws(
    () =>
      engine.VALIDATED_SELF_INSTALL_RULES.push({
        id: 'MC24-PROBE',
        matrixRowId: 'PROBE',
        bundleId: 'START',
        requiredAnswers: {},
      }),
    'the registry accepted a pushed rule',
  );
  const bundles = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'];
  let eligible = 0;
  let evaluated = 0;
  for (const bundleId of bundles) {
    for (const answers of [{}, allAnswers(bundleId)]) {
      const result = engine.resolveConfiguration({ bundleId, answers });
      evaluated += 1;
      if (result.outcome === 'ELIGIBLE_SELF_INSTALL' || result.eligible) eligible += 1;
    }
  }
  assert(eligible === 0, `${eligible} of ${evaluated} configurations produced an eligible result`);
  return `${evaluated} configurations across 6 bundles: 0 eligible; registry frozen, push refused`;
});

// ---------------------------------------------------------------------------
// AC-03 — unknown or untested input never yields an eligible configuration
// ---------------------------------------------------------------------------
check('MC24-03', 'unknown or untested input never yields an eligible configuration', () => {
  const probes = [
    { bundleId: 'UNKNOWN', answers: allAnswers('START') },
    { bundleId: '', answers: allAnswers('START') },
    { bundleId: 'start', answers: allAnswers('START') },
    { bundleId: 'START', answers: { 'GQ-01': '   ' } },
    { bundleId: 'START', answers: {} },
  ];
  for (const probe of probes) {
    const result = engine.resolveConfiguration(probe);
    assert(!result.eligible, `probe ${JSON.stringify(probe.bundleId)} produced an eligible result`);
    assert(
      result.outcome !== 'ELIGIBLE_SELF_INSTALL',
      `probe ${JSON.stringify(probe.bundleId)} produced ${result.outcome}`,
    );
  }
  return `${probes.length} unknown/blank probes rejected from the eligible outcome`;
});

// ---------------------------------------------------------------------------
// AC-04 — missing mandatory answers produce INSUFFICIENT_INFORMATION
// ---------------------------------------------------------------------------
check('MC24-04', 'missing mandatory answers yield INSUFFICIENT_INFORMATION', () => {
  const result = engine.resolveConfiguration({ bundleId: 'START', answers: {} });
  assert(result.outcome === 'INSUFFICIENT_INFORMATION', `got ${result.outcome}`);
  assert(
    result.unresolvedQuestionIds.length === engine.MANDATORY_QUESTION_IDS['START'].length,
    `expected ${engine.MANDATORY_QUESTION_IDS['START'].length} unresolved ids, got ${result.unresolvedQuestionIds.length}`,
  );
  const partial = engine.resolveConfiguration({
    bundleId: 'START',
    answers: { 'GQ-01': 'velero' },
  });
  assert(partial.outcome === 'INSUFFICIENT_INFORMATION', 'partial answers must stay insufficient');
  assert(
    !partial.unresolvedQuestionIds.includes('GQ-01'),
    'a supplied answer must not be reported as missing',
  );
  return `START requires ${engine.MANDATORY_QUESTION_IDS['START'].length} answers; 1 supplied leaves ${
    partial.unresolvedQuestionIds.length
  } pending`;
});

// ---------------------------------------------------------------------------
// AC-05 — excluded capabilities produce NOT_SUPPORTED without a workaround
// ---------------------------------------------------------------------------
check('MC24-05', 'excluded capabilities yield NOT_SUPPORTED', () => {
  for (const capability of engine.EXCLUDED_CAPABILITIES) {
    const result = engine.resolveConfiguration({
      bundleId: 'START',
      answers: allAnswers('START'),
      requestedCapabilities: [capability],
    });
    assert(result.outcome === 'NOT_SUPPORTED', `${capability} gave ${result.outcome}`);
    assert(
      result.excludedCapabilities.includes(capability),
      `${capability} not reported as excluded`,
    );
  }
  return `${engine.EXCLUDED_CAPABILITIES.length} excluded capabilities refused`;
});

// ---------------------------------------------------------------------------
// AC-06 — triage is deterministic and carries no price or orderable state
// ---------------------------------------------------------------------------
check('MC24-06', 'triage is deterministic and produces no price, offer or orderable state', () => {
  const outcomes = engine.CONFIGURATOR_OUTCOMES;
  for (const outcome of outcomes) {
    const result = {
      ...engine.resolveConfiguration({ bundleId: 'START', answers: allAnswers('START') }),
      outcome,
    };
    const first = triage.triageFor(result);
    const second = triage.triageFor(result);
    assert(
      JSON.stringify(first) === JSON.stringify(second),
      `triage of ${outcome} is not deterministic`,
    );
    assert(first.quotationProvided === false, `${outcome} claims a quotation`);
    assert(first.priceProvided === false, `${outcome} claims a price`);
    assert(first.orderable === false, `${outcome} claims an orderable state`);
    assert(triage.isTriageRoute(first.route), `${outcome} produced unknown route ${first.route}`);
  }
  const engineSource = readText('src/app/marea-catalog/data/configurator-engine.ts');
  assert(
    !/Math\.random|Date\.now|new Date\(/.test(engineSource),
    'engine uses a clock or randomness',
  );
  const triageSource = readText('src/app/marea-catalog/data/configurator-triage.ts');
  assert(
    !/Math\.random|Date\.now|new Date\(/.test(triageSource),
    'triage uses a clock or randomness',
  );
  return `${outcomes.length} outcomes: deterministic, no price, no offer, no orderable state`;
});

// ---------------------------------------------------------------------------
// AC-07 — ES/EN parity of the configurator content
// ---------------------------------------------------------------------------
check('MC24-07', 'every configurator string is complete in both ES and EN', () => {
  const maps = {
    CONFIGURATOR_LABELS: content.CONFIGURATOR_LABELS,
    OUTCOME_LABELS: content.OUTCOME_LABELS,
    OUTCOME_EXPLANATIONS: content.OUTCOME_EXPLANATIONS,
    TRIAGE_LABELS: content.TRIAGE_LABELS,
    PRIORITY_LABELS: content.PRIORITY_LABELS,
  };
  let count = 0;
  for (const [name, map] of Object.entries(maps)) {
    for (const [key, value] of Object.entries(map)) {
      for (const locale of ['es', 'en']) {
        assert(
          typeof value[locale] === 'string' && value[locale].trim().length > 0,
          `${name}.${key}.${locale} is missing or empty`,
        );
      }
      // A cross-language identity (numeric, id-like, or a word that is genuinely
      // the same in ES and EN such as "No") is legitimate; an untranslated
      // English sentence is not.
      const identicalIsLegitimate =
        /^[A-Z0-9-]+$/.test(value.es) ||
        !/[a-z]{3,}/i.test(value.es) ||
        value.es.split(/\s+/).length <= 1;
      assert(value.es !== value.en || identicalIsLegitimate, `${name}.${key} is not translated`);
      count += 1;
    }
  }
  assert(content.CONFIGURATOR_LIMITATIONS.length >= 3, 'limitations list is too short');
  for (const item of content.CONFIGURATOR_LIMITATIONS) {
    assert(item.es?.trim() && item.en?.trim(), 'a limitation is missing a locale');
  }
  // Every outcome and triage vocabulary value must be labelled in both locales.
  for (const outcome of engine.CONFIGURATOR_OUTCOMES) {
    assert(content.OUTCOME_LABELS[outcome], `outcome ${outcome} has no label`);
    assert(content.OUTCOME_EXPLANATIONS[outcome], `outcome ${outcome} has no explanation`);
  }
  for (const route of triage.TRIAGE_ROUTES) {
    assert(content.TRIAGE_LABELS[route], `triage route ${route} has no label`);
  }
  return `${count} localized pairs complete; ${engine.CONFIGURATOR_OUTCOMES.length} outcomes and ${triage.TRIAGE_ROUTES.length} routes labelled`;
});

// ---------------------------------------------------------------------------
// AC — the projection is transcribed from the contract, never authored
// ---------------------------------------------------------------------------
check('MC24-08', 'the rule projection matches the MC-08 contract exactly', () => {
  assert(
    generated.CONFIGURATOR_QUESTIONS.length === 32,
    `expected 32 questions, got ${generated.CONFIGURATOR_QUESTIONS.length}`,
  );
  const contractQuestions = ['general', 'safetySensitive', 'b2bFleet'].flatMap(
    (key) => contract.eligibilityQuestionnaires[key].questions,
  );
  assert(
    contractQuestions.length === generated.CONFIGURATOR_QUESTIONS.length,
    'question count differs from the contract',
  );
  for (let index = 0; index < contractQuestions.length; index += 1) {
    const source = contractQuestions[index];
    const projected = generated.CONFIGURATOR_QUESTIONS[index];
    assert(
      source.id === projected.id,
      `question ${index} id ${projected.id} != contract ${source.id}`,
    );
    assert(
      source.question === projected.question,
      `question ${projected.id} text differs from the contract`,
    );
  }
  assert(
    generated.CONFIGURATOR_RULES.length === contract.configurationRules.length,
    'configuration rule count differs from the contract',
  );
  for (const rule of contract.configurationRules) {
    const projected = generated.CONFIGURATOR_RULES.find((item) => item.id === rule.id);
    assert(projected, `rule ${rule.id} missing from projection`);
    assert(projected.condition === rule.condition, `rule ${rule.id} condition differs`);
    assert(projected.outcome === rule.outcome, `rule ${rule.id} outcome differs`);
  }
  assert(
    generated.CONFIGURATOR_CONFLICT_RULES.length === contract.conflictRules.length,
    'conflict rule count differs from the contract',
  );
  return `${generated.CONFIGURATOR_QUESTIONS.length} questions, ${generated.CONFIGURATOR_RULES.length} rules, ${generated.CONFIGURATOR_CONFLICT_RULES.length} conflict rules match MC-08`;
});

// ---------------------------------------------------------------------------
// AC-12 — no public route, noindex, no indexation surface
// ---------------------------------------------------------------------------
check('MC24-09', 'the configurator registers no public route and no indexation surface', () => {
  for (const route of identity.CONFIGURATOR_PREVIEW_ROUTES) {
    assert(
      route.path.includes('internal/catalog/'),
      `route ${route.path} is outside the internal namespace`,
    );
  }
  const facts = identity.CONFIGURATOR_PREVIEW_IDENTITY;
  for (const [key, value] of Object.entries(facts)) {
    if (typeof value === 'boolean') assert(value === false, `identity fact ${key} must be false`);
  }
  // No route may collide with a reserved public path.
  const reserved = readText('src/app/core/i18n/locale-routes.ts');
  for (const route of identity.CONFIGURATOR_PREVIEW_ROUTES) {
    assert(
      !reserved.includes(`'${route.path}'`),
      `route ${route.path} collides with a public route`,
    );
  }
  const preview = readText('preview/landing/configurator-preview.ts');
  assert(preview.includes('noindex, nofollow, noarchive'), 'preview does not set noindex');
  // Strip comments: the header comment legitimately names the tags it forbids.
  const previewCode = preview.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
  assert(
    !/rel="canonical"|rel='canonical'|hreflang|application\/ld\+json/i.test(previewCode),
    'preview emits an indexation tag',
  );
  return `${identity.CONFIGURATOR_PREVIEW_ROUTES.length} internal routes, noindex, no canonical/hreflang/JSON-LD`;
});

// ---------------------------------------------------------------------------
// AC-13 — no price, purchase affordance or lead capture
// ---------------------------------------------------------------------------
check('MC24-10', 'no price, purchase affordance or lead capture is delivered', () => {
  const files = [
    'src/app/marea-catalog/sections/section-configurator.ts',
    'src/app/marea-catalog/data/configurator-engine.ts',
    'src/app/marea-catalog/data/configurator-triage.ts',
    'src/app/marea-catalog/content/configurator.ts',
  ];
  for (const file of files) {
    const source = readText(file);
    const problems = guards.catalogClaimProblems(source);
    assert(problems.length === 0, `${file} triggers claims guard: ${problems.join(', ')}`);
    assert(!/<form[^>]+action=/i.test(source), `${file} posts to a remote endpoint`);
    assert(!/fetch\(|HttpClient|XMLHttpRequest/.test(source), `${file} performs a network call`);
  }
  const section = readText('src/app/marea-catalog/sections/section-configurator.ts');
  assert(!/type="email"/.test(section), 'section collects an email address');
  assert(!/ORDERABLE/.test(section), 'section references an orderable state');
  const engineSource = readText('src/app/marea-catalog/data/configurator-engine.ts');
  assert(
    !contract.configurationOutcomes.includes('ORDERABLE'),
    'the MC-08 contract unexpectedly defines ORDERABLE',
  );
  return `${files.length} configurator files clean: 0 claim problems, no network, no email, no ORDERABLE`;
});

// ---------------------------------------------------------------------------
// AC-14 — F-01 / F-02 regressions are closed and legitimate negations survive
// ---------------------------------------------------------------------------
check('MC24-11', 'F-01 and F-02 bypasses are rejected and negations still pass', () => {
  const mustReject = [
    ['F-01', 'El paquete está disponible ya para su embarcación.'],
    ['F-01', 'El HUB ya disponible en nuestra tienda.'],
    ['F-01', 'MAREA NAV ya está disponible.'],
    ['F-01', 'The service is now available.'],
    ['F-02', 'El soporte garantizado incluye actualizaciones.'],
    ['F-02', 'Incluye soporte garantizado durante el ciclo.'],
    ['F-02', 'La entrega garantizada es parte del paquete.'],
  ];
  for (const [id, text] of mustReject) {
    const problems = guards.catalogClaimProblems(text);
    assert(problems.length > 0, `${id} still bypasses the guard: "${text}"`);
  }
  const mustPass = [
    'MAREA no está disponible todavía para la compra.',
    'Nunca disponible como oferta comercial.',
    'La entrega se ofrece sin garantizar plazos.',
    'No garantizamos ninguna compatibilidad.',
    'Ningún resultado está garantizado.',
    'Compatibility is not guaranteed.',
  ];
  for (const text of mustPass) {
    const problems = guards.catalogClaimProblems(text);
    assert(
      problems.length === 0,
      `legitimate negation rejected: "${text}" -> ${problems.join(', ')}`,
    );
  }
  return `${mustReject.length} bypasses rejected, ${mustPass.length} negations preserved`;
});

// ---------------------------------------------------------------------------
// AC-09 — a broken Angular template binding is actually rejected
// ---------------------------------------------------------------------------
check('MC24-12', 'a deliberately invalid template binding is detected', () => {
  const broken = resolve(root, 'src/app/marea-catalog/sections/__mc24-broken-binding.fixture.ts');
  assert(!existsSync(broken), 'broken fixture must not be committed to the source tree');
  // The real Angular compiler run is the negative test; this check only asserts
  // that the gate is wired into the package scripts so it cannot silently vanish.
  const pkg = readJson('package.json');
  const scripts = pkg.scripts ?? {};
  assert(scripts['build:landing:preview'], 'preview build script is missing');
  assert(scripts['build'], 'production build script is missing');
  assert(scripts['test:mc24:build'], 'MC-24 real-build gate script is missing');
  const gate = readText('scripts/check-mc24-build.mjs');
  assert(gate.includes('ng build'), 'the MC-24 build gate does not invoke the Angular builder');
  return 'preview + production build scripts and the MC-24 real-build gate are wired';
});

// ---------------------------------------------------------------------------
// F-2 / F-15 — inherited MC-23 findings. MC-25 owns them: this check now proves
// the historical defect is reproducible at the recorded revision AND that the
// current branch has repaired it. It previously asserted the defect was still
// open; leaving that assertion would have misreported the state after repair.
// ---------------------------------------------------------------------------
check('MC24-13', 'inherited MC-23 findings F-2 and F-15 are reproduced at 8a4b5e0 and closed now', () => {
  const inherited = fileAt(root, '8a4b5e0', 'src/app/marea-catalog/data/bundle-upgrade-paths.ts');
  assert(typeof inherited === 'string' && inherited.length > 0, 'cannot read the inherited revision');
  assert(
    /return match \? match\.inclusion : 'NOT_INCLUDED';/u.test(inherited),
    'F-15 is not reproducible at the recorded revision',
  );
  assert(
    !/validateUpgradePath|UpgradePathIntegrity/u.test(inherited),
    'F-2 is not reproducible at the recorded revision',
  );
  const source = readText('src/app/marea-catalog/data/bundle-upgrade-paths.ts');
  assert(source.includes('validateUpgradePath'), 'F-2 was not repaired: no relationship validation');
  assert(source.includes('UNKNOWN_EDITION'), 'F-15 was not repaired: no typed unknown-edition state');
  const doc = readText('docs/marea/catalog/MC25-RISK-AND-REMEDIATION-REGISTER.md');
  for (const id of ['F-2', 'F-15']) {
    assert(doc.includes(id), `${id} is not recorded in the MC-25 register`);
  }
  assert(/CLOSED/u.test(doc), 'the MC-25 register does not mark the findings closed');
  return 'F-2/F-15 reproduced at 8a4b5e0, repaired on this branch, closed and recorded';
});

// ---------------------------------------------------------------------------
const failed = checks.filter((item) => !item.pass);
for (const item of checks) {
  console.log(`${item.pass ? 'PASS' : 'FAIL'} ${item.id} — ${item.title}`);
  if (item.detail) console.log(`     ${item.detail}`);
}
console.log(
  `\nMC-24 configuration validator: ${checks.length - failed.length}/${checks.length} ${failed.length === 0 ? 'PASS' : 'FAIL'}`,
);
process.exit(failed.length === 0 ? 0 : 1);
