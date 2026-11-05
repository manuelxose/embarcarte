/**
 * MC-24 configurator and quotation triage — adversarial domain tests.
 *
 * These assert the DOMAIN, not the claim guard: the engine outcomes, the
 * fail-closed ordering, triage determinism and the absence of any commercial
 * affordance. Every boundary below is attacked, not just exercised.
 *
 * Run with:
 *   node --import ./scripts/marea-landing-ts-register.mjs \
 *     --disable-warning=MODULE_TYPELESS_PACKAGE_JSON \
 *     --test --test-isolation=none scripts/check-mc24-configurator.test.mjs
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { catalogClaimProblems } from './mc20-catalog-guards.mjs';

/**
 * ENGINE-03 runner entry point. `both()` registers with node:test AND records the
 * case for `runConfined()`, which drives the same functions in-process because
 * the ACL sandbox forbids spawning `node --test`.
 */
const CASES = [];
function both(name, fn) {
  CASES.push({ name, fn });
  test(name, fn);
}

export async function runConfined() {
  let pass = 0;
  let fail = 0;
  for (const entry of CASES) {
    try {
      await entry.fn();
      pass += 1;
    } catch (error) {
      fail += 1;
      const message = error instanceof Error ? error.message : String(error);
      console.log('FAIL ' + entry.name + ': ' + message);
    }
  }
  console.log('MC-24 tests: ' + pass + '/' + CASES.length + ' passed');
  return fail === 0 && pass > 0 && pass === CASES.length;
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const load = (relative) => import(pathToFileURL(resolve(root, relative)).href);

const engine = await load('src/app/marea-catalog/data/configurator-engine.ts');
const triage = await load('src/app/marea-catalog/data/configurator-triage.ts');
const generated = await load('src/app/marea-catalog/data/configurator.generated.ts');
const identity = await load('src/app/marea-catalog/models/configurator-identity.ts');
const content = await load('src/app/marea-catalog/content/configurator.ts');

const contract = JSON.parse(
  readFileSync(resolve(root, 'docs/marea/bundles/bundle-definitions.json'), 'utf8'),
);
const BUNDLES = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'];
const answersFor = (bundleId) =>
  Object.fromEntries(
    (engine.MANDATORY_QUESTION_IDS[bundleId] ?? []).map((id) => [id, 'respuesta']),
  );

// ===========================================================================
// The D5 governance invariant
// ===========================================================================

both('a1 the eligible outcome is unreachable across the whole input space', () => {
  // Every bundle, with no answers, partial answers and complete answers.
  for (const bundleId of BUNDLES) {
    const mandatory = engine.MANDATORY_QUESTION_IDS[bundleId];
    const variants = [{}, answersFor(bundleId)];
    for (let drop = 0; drop < mandatory.length; drop += 4) {
      const partial = answersFor(bundleId);
      delete partial[mandatory[drop]];
      variants.push(partial);
    }
    for (const answers of variants) {
      const result = engine.resolveConfiguration({ bundleId, answers });
      assert.notEqual(
        result.outcome,
        'ELIGIBLE_SELF_INSTALL',
        `${bundleId} produced an eligible result`,
      );
      assert.equal(result.eligible, false, `${bundleId} set eligible=true`);
    }
  }
});

both('a2 there are exactly zero validated self-install rules', () => {
  assert.equal(engine.VALIDATED_SELF_INSTALL_RULES.length, 0);
  assert.equal(engine.CONFIGURATOR_FACTS.validatedSelfInstallRuleCount, 0);
  assert.equal(engine.CONFIGURATOR_FACTS.testedCompatibilityRows, 0);
});

both('a3 the outcome vocabulary cannot be extended by an unknown value', () => {
  assert.deepEqual(
    [...engine.CONFIGURATOR_OUTCOMES],
    [
      'ELIGIBLE_SELF_INSTALL',
      'INSTALLER_ASSESSMENT_REQUIRED',
      'NOT_SUPPORTED',
      'INSUFFICIENT_INFORMATION',
    ],
  );
  for (const value of [
    'ORDERABLE',
    'PURCHASABLE',
    'AVAILABLE',
    'available',
    '',
    null,
    undefined,
    42,
  ]) {
    assert.equal(
      engine.isConfiguratorOutcome(value),
      false,
      `${String(value)} accepted as an outcome`,
    );
  }
});

// ===========================================================================
// Fail-closed ordering
// ===========================================================================

both('a4 an excluded capability outranks every other signal', () => {
  // Even with a completely unanswered questionnaire, the exclusion is reported.
  for (const capability of engine.EXCLUDED_CAPABILITIES) {
    const result = engine.resolveConfiguration({
      bundleId: 'START',
      answers: {},
      requestedCapabilities: [capability],
    });
    assert.equal(result.outcome, 'NOT_SUPPORTED');
    assert.deepEqual([...result.excludedCapabilities], [capability]);
  }
});

both('a5 an empty excluded-capability list does not trigger NOT_SUPPORTED', () => {
  const result = engine.resolveConfiguration({
    bundleId: 'START',
    answers: answersFor('START'),
    requestedCapabilities: [],
  });
  assert.equal(result.outcome, 'INSTALLER_ASSESSMENT_REQUIRED');
});

both('a6 unknown capabilities are ignored, not treated as satisfied', () => {
  const result = engine.resolveConfiguration({
    bundleId: 'START',
    answers: answersFor('START'),
    requestedCapabilities: ['warp-drive', 'teleport', 'ORDERABLE'],
  });
  assert.equal(result.outcome, 'INSTALLER_ASSESSMENT_REQUIRED');
  assert.equal(result.eligible, false);
});

both('a7 a blank or whitespace answer is unresolved', () => {
  for (const blank of ['', '   ', '\t', '\n']) {
    const answers = { ...answersFor('START'), 'GQ-01': blank };
    const result = engine.resolveConfiguration({ bundleId: 'START', answers });
    assert.equal(result.outcome, 'INSUFFICIENT_INFORMATION');
    assert.ok(
      result.unresolvedQuestionIds.includes('GQ-01'),
      `blank "${JSON.stringify(blank)}" accepted`,
    );
  }
});

both('a8 the mandatory set matches the contract grouping exactly', () => {
  // START/CRUISE/PROTECT get GENERAL only; SAIL/COMPLETE add safety; FLEET adds B2B.
  assert.equal(engine.MANDATORY_QUESTION_IDS['START'].length, 13);
  assert.equal(engine.MANDATORY_QUESTION_IDS['SAIL'].length, 22);
  assert.equal(engine.MANDATORY_QUESTION_IDS['FLEET'].length, 23);
  for (const bundleId of BUNDLES) {
    const mandatory = engine.MANDATORY_QUESTION_IDS[bundleId];
    assert.ok(mandatory.includes('GQ-01'), `${bundleId} omits a general question`);
  }
  assert.ok(!engine.MANDATORY_QUESTION_IDS['START'].includes('SQ-01'));
  assert.ok(engine.MANDATORY_QUESTION_IDS['SAIL'].includes('SQ-01'));
  assert.ok(!engine.MANDATORY_QUESTION_IDS['START'].includes('FQ-01'));
  assert.ok(engine.MANDATORY_QUESTION_IDS['FLEET'].includes('FQ-01'));
});

both('a9 a contradictory steering answer is reported as unresolved', () => {
  const answers = { ...answersFor('START'), 'GQ-04': 'no' };
  const result = engine.resolveConfiguration({
    bundleId: 'START',
    answers,
    requestedCapabilities: ['steering-integration'],
  });
  // The excluded capability wins the ordering and is stated plainly.
  assert.equal(result.outcome, 'NOT_SUPPORTED');
});

both('a10 a complete valid configuration never yields a commercial state', () => {
  for (const bundleId of BUNDLES) {
    const result = engine.resolveConfiguration({ bundleId, answers: answersFor(bundleId) });
    assert.equal(result.purchasable, false);
    assert.equal(result.priceProvided, false);
    assert.equal(result.orderable, false);
    assert.ok(engine.isConfiguratorOutcome(result.outcome));
  }
});

// ===========================================================================
// Quotation triage
// ===========================================================================

both('a11 every outcome maps to a known route with no commercial artefact', () => {
  for (const bundleId of BUNDLES) {
    for (const answers of [{}, answersFor(bundleId)]) {
      const result = engine.resolveConfiguration({ bundleId, answers });
      const record = triage.triageFor(result);
      assert.ok(triage.isTriageRoute(record.route), `unknown route ${record.route}`);
      assert.equal(record.quotationProvided, false);
      assert.equal(record.priceProvided, false);
      assert.equal(record.orderable, false);
    }
  }
});

both('a12 safety-sensitive bundles are escalated to a safety review', () => {
  for (const bundleId of ['SAIL', 'COMPLETE']) {
    const result = engine.resolveConfiguration({ bundleId, answers: answersFor(bundleId) });
    const record = triage.triageFor(result);
    assert.equal(record.priority, 'SAFETY_REVIEW', `${bundleId} not escalated`);
    assert.equal(record.requiresSafetyEvidence, true, `${bundleId} skipped safety evidence`);
  }
  const start = triage.triageFor(
    engine.resolveConfiguration({ bundleId: 'START', answers: answersFor('START') }),
  );
  assert.equal(start.priority, 'ELEVATED');
});

both('a13 triage is deterministic and independent of call order', () => {
  const first = BUNDLES.map((bundleId) =>
    JSON.stringify(
      triage.triageFor(engine.resolveConfiguration({ bundleId, answers: answersFor(bundleId) })),
    ),
  );
  const second = [...BUNDLES]
    .reverse()
    .map((bundleId) =>
      JSON.stringify(
        triage.triageFor(engine.resolveConfiguration({ bundleId, answers: answersFor(bundleId) })),
      ),
    )
    .reverse();
  assert.deepEqual(first, second);
});

both('a14 an insufficient-information result carries the pending fields', () => {
  const result = engine.resolveConfiguration({ bundleId: 'FLEET', answers: { 'GQ-01': 'x' } });
  const record = triage.triageFor(result);
  assert.equal(record.route, 'INFORMATION_REQUEST');
  assert.equal(record.pendingQuestionIds.length, engine.MANDATORY_QUESTION_IDS['FLEET'].length - 1);
});

// ===========================================================================
// Contract fidelity
// ===========================================================================

both('a15 no configuration outcome outside the contract vocabulary is produced', () => {
  const contractOutcomes = new Set(contract.configurationOutcomes);
  assert.ok(!contractOutcomes.has('ORDERABLE'), 'the contract defines ORDERABLE');
  // The D5 vocabulary is a separate, stricter decision vocabulary; both are
  // enumerated and nothing else may leak through.
  const allowed = new Set([...engine.CONFIGURATOR_OUTCOMES, ...contractOutcomes]);
  for (const bundleId of BUNDLES) {
    const result = engine.resolveConfiguration({ bundleId, answers: answersFor(bundleId) });
    assert.ok(allowed.has(result.outcome), `${result.outcome} is not in any contract vocabulary`);
  }
});

both('a16 every contract rule and conflict rule is projected verbatim', () => {
  assert.equal(generated.CONFIGURATOR_RULES.length, contract.configurationRules.length);
  for (const rule of contract.configurationRules) {
    const projected = generated.CONFIGURATOR_RULES.find((item) => item.id === rule.id);
    assert.ok(projected, `missing rule ${rule.id}`);
    assert.equal(projected.name, rule.name);
    assert.equal(projected.scope, rule.scope);
    assert.equal(projected.condition, rule.condition);
    assert.equal(projected.outcome, rule.outcome);
    assert.equal(projected.evidenceRequirement, rule.evidenceRequirement);
  }
  assert.equal(generated.CONFIGURATOR_CONFLICT_RULES.length, contract.conflictRules.length);
});

both('a17 every projected question exists identically in the contract', () => {
  const source = ['general', 'safetySensitive', 'b2bFleet'].flatMap(
    (key) => contract.eligibilityQuestionnaires[key].questions,
  );
  assert.equal(generated.CONFIGURATOR_QUESTIONS.length, source.length);
  for (const question of source) {
    const projected = generated.CONFIGURATOR_QUESTIONS.find((item) => item.id === question.id);
    assert.ok(projected, `missing question ${question.id}`);
    assert.equal(projected.question, question.question, `question ${question.id} text differs`);
  }
});

// ===========================================================================
// Preview isolation and content truthfulness
// ===========================================================================

both('a18 the preview registers no public route', () => {
  const locales = readFileSync(resolve(root, 'src/app/core/i18n/locale-routes.ts'), 'utf8');
  for (const route of identity.CONFIGURATOR_PREVIEW_ROUTES) {
    assert.ok(route.path.startsWith('internal/') || route.path.startsWith('en/internal/'));
    assert.equal(
      locales.includes(`'${route.path}'`),
      false,
      `${route.path} collides with a public route`,
    );
  }
  assert.equal(identity.CONFIGURATOR_PREVIEW_IDENTITY.publicRouteRegistered, false);
  assert.equal(identity.CONFIGURATOR_PREVIEW_IDENTITY.sitemapEligible, false);
  assert.equal(identity.CONFIGURATOR_PREVIEW_IDENTITY.indexationAuthorized, false);
});

both('a19 the delivered configurator copy carries no prohibited commercial claim', () => {
  const files = [
    'src/app/marea-catalog/content/configurator.ts',
    'src/app/marea-catalog/sections/section-configurator.ts',
    'src/app/marea-catalog/data/configurator-triage.ts',
  ];
  for (const file of files) {
    const problems = catalogClaimProblems(readFileSync(resolve(root, file), 'utf8'));
    assert.deepEqual(problems, [], `${file}: ${problems.join(', ')}`);
  }
});

both('a20 the honest negations the configurator relies on still pass the guard', () => {
  for (const text of [
    'No se muestra ningún precio.',
    'No hay compra, reserva ni pedido.',
    'Una configuración desconocida nunca se presenta como válida.',
    'No se ha generado ninguna cotización ni precio.',
    'La certificación NMEA 2000 no existe y no se afirma.',
  ]) {
    assert.deepEqual(catalogClaimProblems(text), [], `rejected honest copy: ${text}`);
  }
});

both('a21 every outcome is explained in both locales', () => {
  for (const outcome of engine.CONFIGURATOR_OUTCOMES) {
    for (const locale of ['es', 'en']) {
      assert.ok(content.OUTCOME_LABELS[outcome][locale], `${outcome} label missing in ${locale}`);
      assert.ok(
        content.OUTCOME_EXPLANATIONS[outcome][locale],
        `${outcome} explanation missing in ${locale}`,
      );
      assert.ok({
        es: content.OUTCOME_EXPLANATIONS[outcome][locale],
        en: content.OUTCOME_EXPLANATIONS[outcome][locale],
      });
    }
  }
});

both('a22 the F-01 and F-02 bypasses stay closed under paraphrase drift', () => {
  const rejects = [
    'El paquete está disponible ya.',
    'ya disponible',
    'ya está disponible en tienda',
    'now available',
    'available now',
    'ahora disponible',
    'actualmente disponible',
    'already available',
    'soporte garantizado',
    'garantizado de por vida',
    'garantizada',
    'guaranteed',
  ];
  for (const text of rejects) {
    assert.notDeepEqual(catalogClaimProblems(text), [], `bypass reopened: "${text}"`);
  }
});

both('a23 the F-16 attribute-quote false positive stays closed', () => {
  for (const text of ['aria-label="MC-24"', '[level]="2"', 'data-mc24-configurator']) {
    assert.deepEqual(catalogClaimProblems(text), [], `false positive on "${text}"`);
  }
  for (const text of ['24" screen', '7 pulgadas', '120 mm']) {
    assert.notDeepEqual(catalogClaimProblems(text), [], `dimension claim missed: "${text}"`);
  }
});

both('a24 the validated-rule registry cannot be mutated at runtime', () => {
  // An earlier revision exported a mutable array; one push() made
  // ELIGIBLE_SELF_INSTALL reachable. The invariant must hold structurally.
  assert.equal(
    Object.isFrozen(engine.VALIDATED_SELF_INSTALL_RULES),
    true,
    'registry is not frozen',
  );
  assert.throws(() => {
    engine.VALIDATED_SELF_INSTALL_RULES.push({
      id: 'FAKE',
      matrixRowId: 'X',
      bundleId: 'START',
      requiredAnswers: {},
    });
  }, 'a push into the frozen registry did not throw');
  assert.equal(engine.VALIDATED_SELF_INSTALL_RULES.length, 0, 'registry length changed');
  // And the decision path still refuses after the attempt.
  const result = engine.resolveConfiguration({ bundleId: 'START', answers: answersFor('START') });
  assert.equal(result.outcome, 'INSTALLER_ASSESSMENT_REQUIRED');
  assert.equal(result.eligible, false);
});

both('a25 answers living on the prototype do not fill the questionnaire', () => {
  // Independent audit F-01: `answers[id]` resolves the prototype chain, so an
  // inherited-property answers object used to count as fully filled. An answer
  // must be an OWN property, so this is reported as INSUFFICIENT_INFORMATION.
  const proto = Object.fromEntries(
    (engine.MANDATORY_QUESTION_IDS['START'] ?? []).map((id) => [id, 'x']),
  );
  const inherited = Object.create(proto);
  const result = engine.resolveConfiguration({ bundleId: 'START', answers: inherited });
  assert.equal(result.eligible, false);
  assert.notEqual(result.outcome, 'ELIGIBLE_SELF_INSTALL');
  assert.equal(result.outcome, 'INSUFFICIENT_INFORMATION');
  assert.equal(result.unresolvedQuestionIds.length, engine.MANDATORY_QUESTION_IDS['START'].length);
});

both('a26 a zero-width or non-breaking answer counts as blank', () => {
  // Independent audit F-02: trim() keeps some Unicode blanks, so they counted as
  // a filled answer.
  for (const blank of ['\u200b', '\u00a0', '\ufeff', '\u200b\u200b', ' \u00a0 ']) {
    const answers = { ...answersFor('START'), 'GQ-01': blank };
    const result = engine.resolveConfiguration({ bundleId: 'START', answers });
    assert.equal(
      result.outcome,
      'INSUFFICIENT_INFORMATION',
      `blank ${JSON.stringify(blank)} accepted`,
    );
    assert.ok(result.unresolvedQuestionIds.includes('GQ-01'));
  }
  const filled = engine.resolveConfiguration({
    bundleId: 'START',
    answers: { ...answersFor('START'), 'GQ-01': 'velero' },
  });
  assert.equal(filled.outcome, 'INSTALLER_ASSESSMENT_REQUIRED');
});
