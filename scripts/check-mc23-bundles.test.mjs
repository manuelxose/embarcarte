/**
 * MC-23 bundle claim tests — node:test suite over the MC-20 catalogue guards.
 *
 * `catalogClaimProblems(text)` returns the ids of prohibited-claim rules matched
 * by a text: an EMPTY list means "no prohibited claim found", a NON-EMPTY list
 * means "rejected". The guard is a heuristic backstop, not a proof of absence.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { catalogClaimProblems } from './mc20-catalog-guards.mjs';

/** Keys present in one object but not in the other, in both directions. */
function keyDifferences(expected, candidate) {
  const expectedKeys = Object.keys(expected);
  const candidateKeys = Object.keys(candidate);
  return {
    missing: expectedKeys.filter((key) => !candidateKeys.includes(key)).sort(),
    extra: candidateKeys.filter((key) => !expectedKeys.includes(key)).sort(),
  };
}

test('r1 must-reject smuggled price strings', () => {
  for (const text of ['EUR 499', 'desde 499 EUR', 'precio 199 euros']) {
    const problems = catalogClaimProblems(text);
    assert.ok(Array.isArray(problems), `expected an array for ${JSON.stringify(text)}`);
    assert.ok(
      problems.length > 0,
      `expected a prohibited-claim problem for ${JSON.stringify(text)}, got an empty list`,
    );
  }
});

test('r1 must-reject banned commercial claims', () => {
  for (const text of ['disponible ya', 'en stock', 'garantizado']) {
    const problems = catalogClaimProblems(text);
    assert.ok(Array.isArray(problems), `expected an array for ${JSON.stringify(text)}`);
    assert.ok(
      problems.length > 0,
      `expected a prohibited-claim problem for ${JSON.stringify(text)}, got an empty list`,
    );
  }
});

test('r2 must-reject invented inclusion vocabulary', () => {
  const LEGAL_INCLUSION_VALUES = [
    'INCLUDED',
    'REQUIRED_EXTERNAL',
    'OPTIONAL',
    'CONDITIONAL',
    'NOT_INCLUDED',
    'INELIGIBLE',
    'QUOTATION_REQUIRED',
  ];
  assert.ok(
    !LEGAL_INCLUSION_VALUES.includes('PURCHASABLE'),
    'PURCHASABLE must not be a legal inclusion value',
  );
  assert.ok(
    !LEGAL_INCLUSION_VALUES.includes('ORDERABLE'),
    'ORDERABLE must not be a legal inclusion value',
  );
});

test('r2 must-reject missing ES key', () => {
  const expected = {
    es: 'No disponible para compra',
    en: 'Not available for purchase',
  };
  const candidate = {
    en: 'Not available for purchase',
  };
  const { missing, extra } = keyDifferences(expected, candidate);
  assert.deepEqual(missing, ['es'], 'the helper must detect the missing es key');
  assert.deepEqual(extra, [], 'the candidate must not carry unknown keys');
});

test('r3 must-allow honest disclaimers', () => {
  for (const text of ['No se vende', 'no disponible para compra', 'not for sale', 'NOT_FOR_SALE']) {
    const problems = catalogClaimProblems(text);
    assert.deepEqual(
      problems,
      [],
      `expected no prohibited-claim problem for ${JSON.stringify(text)}, got ${JSON.stringify(problems)}`,
    );
  }
});
