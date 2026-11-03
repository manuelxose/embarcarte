/**
 * MC-17 adversarial tests for the REAL fail-closed presentation adapter and
 * one positive control per rule. The adapter is TypeScript with type-only
 * imports, so Node 24 can execute it directly through type stripping.
 *
 * Run: npm run test:design-system:unit
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import {
  deriveCommercialPresentation,
  deriveCtaState,
  restrictionCopyKey,
  sanitizeCtaState,
} from '../src/app/marea-design-system/data/commerce-presentation.adapter.ts';

const CLOSED = {
  releaseGateOpen: false,
  buyCtaAllowed: false,
  cartAllowed: false,
  priceVisible: false,
  availabilityVisible: false,
  ctaState: 'DISABLED',
  restrictions: [],
};

test('positive control: a closed gate with a well-formed input stays closed and quiet', () => {
  const result = deriveCommercialPresentation(CLOSED);
  assert.equal(result.purchaseActionAllowed, false);
  assert.equal(result.cartAllowed, false);
  assert.equal(result.priceVisible, false);
  assert.equal(result.availabilityVisible, false);
  assert.deepEqual(result.blockedSignals, []);
  assert.equal(result.ctaState, 'DISABLED');
});

test('unauthorised purchase signal is inverted and reported', () => {
  const result = deriveCommercialPresentation({ ...CLOSED, buyCtaAllowed: true });
  assert.equal(result.purchaseActionAllowed, false);
  assert.deepEqual(result.blockedSignals, ['BUY_CTA']);
});

test('cart, price and availability signals are all blocked', () => {
  const result = deriveCommercialPresentation({ ...CLOSED, cartAllowed: true, priceVisible: true, availabilityVisible: true });
  assert.equal(result.cartAllowed, false);
  assert.equal(result.priceVisible, false);
  assert.equal(result.availabilityVisible, false);
  assert.deepEqual(result.blockedSignals, ['CART', 'PRICE_VISIBILITY', 'AVAILABILITY_VISIBILITY']);
});

test('malformed CTA state fails closed to NOT_AVAILABLE', () => {
  const hostile = { ...CLOSED, ctaState: 'PURCHASE' };
  assert.equal(deriveCommercialPresentation(hostile).ctaState, 'NOT_AVAILABLE');
  assert.equal(deriveCommercialPresentation({ ...CLOSED, ctaState: undefined }).ctaState, 'NOT_AVAILABLE');
  assert.equal(sanitizeCtaState(42), 'NOT_AVAILABLE');
  assert.equal(sanitizeCtaState(null), 'NOT_AVAILABLE');
});

test('an open gate flag cannot create a purchase action in MC-17', () => {
  const result = deriveCommercialPresentation({ ...CLOSED, releaseGateOpen: true, buyCtaAllowed: true, priceVisible: true, availabilityVisible: true, ctaState: 'QUOTE_ONLY' });
  assert.equal(result.purchaseActionAllowed, false);
  assert.equal(result.priceVisible, false);
  assert.equal(result.availabilityVisible, false);
  // With the gate open the signals are not reported as neutralised, but the invariants still hold.
  assert.deepEqual(result.blockedSignals, []);
  assert.equal(result.ctaState, 'QUOTE_ONLY');
});

test('restrictions are deduplicated and preserved', () => {
  const result = deriveCommercialPresentation({ ...CLOSED, restrictions: ['PRICE_NOT_APPROVED', 'PRICE_NOT_APPROVED', 'PUBLICATION_NOT_AUTHORIZED'] });
  assert.deepEqual(result.restrictions, ['PRICE_NOT_APPROVED', 'PUBLICATION_NOT_AUTHORIZED']);
});

test('CTA derivation follows the documented precedence', () => {
  assert.equal(deriveCtaState({ definitionStatus: 'DEFINED', editionType: 'SOFTWARE_SUBSCRIPTION', requiresQuotation: false }), 'DISABLED');
  assert.equal(deriveCtaState({ definitionStatus: 'CONDITIONAL', editionType: 'HARDWARE_DEVICE', requiresQuotation: false }), 'COMING_SOON');
  assert.equal(deriveCtaState({ definitionStatus: 'INSTALLATION_PACKAGE', editionType: 'INSTALLATION_PACKAGE', requiresQuotation: true }), 'QUOTE_ONLY');
  assert.equal(deriveCtaState({ definitionStatus: 'DEFINED', editionType: 'HARDWARE_SYSTEM', requiresQuotation: false, contractedSolution: true }), 'QUOTE_ONLY');
  assert.equal(deriveCtaState({ definitionStatus: 'DEFINED', editionType: 'SOFTWARE_SUBSCRIPTION', requiresQuotation: false, informational: true }), 'REQUEST_INFORMATION');
  assert.equal(deriveCtaState({ definitionStatus: 'RETIRED', editionType: 'X', requiresQuotation: false }), 'NOT_AVAILABLE');
  assert.equal(deriveCtaState(null), 'NOT_AVAILABLE');
});

test('safety-blocked entities never derive a purchase state', () => {
  for (const state of ['DISABLED', 'COMING_SOON', 'REQUEST_INFORMATION', 'QUOTE_ONLY', 'NOT_AVAILABLE']) {
    const result = deriveCommercialPresentation({ ...CLOSED, ctaState: state, restrictions: ['SAFETY_GATE_BLOCKED'] });
    assert.equal(result.purchaseActionAllowed, false);
    assert.ok(['DISABLED', 'COMING_SOON', 'REQUEST_INFORMATION', 'QUOTE_ONLY', 'NOT_AVAILABLE'].includes(result.ctaState));
  }
});

test('every restriction maps to an existing bilingual copy key', () => {
  const copy = readFileSync(new URL('../src/app/marea-design-system/core/i18n.ts', import.meta.url), 'utf8');
  const kinds = [
    'PUBLICATION_NOT_AUTHORIZED',
    'TRADEMARK_NOT_CLEARED',
    'SAFETY_GATE_BLOCKED',
    'LICENSING_NOT_CLEARED',
    'COMPATIBILITY_UNTESTED',
    'PRICE_NOT_APPROVED',
    'STOCK_NOT_VERIFIED',
    'BRAND_PROVISIONAL',
  ];
  for (const kind of kinds) {
    const key = restrictionCopyKey(kind);
    assert.match(copy, new RegExp(`\\b${key}:\\s*\\{`), `${kind} → ${key} missing from copy dictionary`);
  }
});

test('contracts expose no price or stock amount field', () => {
  const types = readFileSync(new URL('../src/app/marea-design-system/core/types.ts', import.meta.url), 'utf8');
  const forbidden = [/priceAmount\s*:/, /priceCurrency\s*:/, /stockQuantity\s*:/, /availabilityCount\s*:/, /quantityAvailable\s*:/, /deliveryEstimate\s*:/, /checkoutUrl\s*:/];
  for (const pattern of forbidden) assert.ok(!pattern.test(types), `contract leaks ${pattern}`);
  assert.match(types, /readonly priceVisible: boolean/);
  assert.match(types, /readonly availabilityVisible: boolean/);
});

test('commerce CTA component renders no interactive purchase control', () => {
  const cta = readFileSync(new URL('../src/app/marea-design-system/components/commerce/marea-commerce-cta.ts', import.meta.url), 'utf8');
  assert.ok(!/<button|<a\s|role="button"|href=/i.test(cta), 'CTA must not render an action');
  assert.ok(!/buyCtaAllowed|cartAllowed|priceVisible|availabilityVisible/.test(cta), 'CTA must consume the derived presentation, not raw signals');
});
