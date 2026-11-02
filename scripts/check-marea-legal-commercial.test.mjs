import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadPackage, validateData } from './check-marea-legal-commercial.mjs';

const loaded = loadPackage();
const baseData = loaded.data;
const baseDocs = loaded.docs;
const clone = (v) => JSON.parse(JSON.stringify(v));
const run = (mutate, docsMutate) => {
  const data = clone(baseData);
  const docs = { ...baseDocs };
  mutate(data);
  if (docsMutate) docsMutate(docs);
  const report = validateData(data, docs);
  return { report, check: (id) => report.checks.find((c) => c.id === id) };
};
const fails = (mutate, id, docsMutate) => {
  const { check } = run(mutate, docsMutate);
  assert.ok(check(id), `check ${id} must exist`);
  assert.equal(check(id).ok, false, `mutation must fail ${id}`);
};

test('positive control: frozen restrictions and claim policy pass unmutated', () => {
  const { report, check } = run(() => {});
  for (const id of ['MC14-018', 'MC14-019', 'MC14-020', 'MC14-041', 'MC14-014', 'MC14-031']) {
    assert.equal(check(id).ok, true, `${id} should pass on the unmutated dataset`);
  }
  assert.ok(report.total >= 54, `expected at least 54 checks, got ${report.total}`);
});

test('01 invented CE certification is rejected', () => {
  fails((d) => {
    d['release-evidence-gates.json'].documents.find((x) => x.documentId === 'DOC-01').status =
      'CERTIFIED';
  }, 'MC14-021');
});

test('02 invented NMEA 2000 certification is rejected', () => {
  fails((d) => {
    d['licensing-rights.json'].summary.nmeaCertified = true;
  }, 'MC14-021');
});

test('03 PILOT safety approval is rejected', () => {
  fails((d) => {
    d['manifest.json'].frozenFlags.PILOT_SAFETY_GATE = 'CLEARED';
  }, 'MC14-018');
});

test('04 AIS transmission offer is rejected', () => {
  fails((d) => {
    d['manifest.json'].frozenFlags.AIS_TRANSMISSION_OFFERED = true;
  }, 'MC14-018');
});

test('05 unlicensed chart inclusion is rejected', () => {
  fails((d) => {
    d['licensing-rights.json'].rights[0].rightsStatus = 'GRANTED';
  }, 'MC14-020');
});

test('06 unlicensed weather redistribution is rejected', () => {
  fails((d) => {
    d['licensing-rights.json'].summary.weatherRightsGranted = true;
  }, 'MC14-021');
});

test('07 trademark registration claim is rejected', () => {
  fails((d) => {
    d['claims-policy.json'].brandState.trademarkLegalClearance = 'REGISTERED';
  }, 'MC14-019');
});

test('08 commercial availability claim is rejected', () => {
  fails((d) => {
    d['manifest.json'].frozenFlags.COMMERCIAL_AVAILABILITY = 'AVAILABLE';
  }, 'MC14-018');
});

test('09 approved price without approval is rejected', () => {
  fails((d) => {
    d['manifest.json'].frozenFlags.PRICE_APPROVED = 'APPROVED';
  }, 'MC14-018');
});

test('10 fabricated customer count claim is rejected', () => {
  fails((d) => {
    const c = d['bilingual-claims.json'].claims.find((x) => x.claimId === 'CLM-026');
    c.publicationStatus = 'PUBLIC_AUTHORIZED';
    c.evidencePresent = ['SYNTHETIC'];
  }, 'MC14-041');
});

test('11 fabricated insurance claim is rejected', () => {
  fails((d) => {
    const c = d['bilingual-claims.json'].claims.find((x) => x.claimId === 'CLM-025');
    c.publicationStatus = 'PUBLIC_AUTHORIZED';
    c.evidencePresent = ['SYNTHETIC'];
  }, 'MC14-027');
});

test('12 unverified offshore alert guarantee is rejected', () => {
  fails((d) => {
    const c = d['bilingual-claims.json'].claims.find((x) => x.claimId === 'CLM-023');
    c.publicationStatus = 'PUBLIC_AUTHORIZED';
    c.evidencePresent = ['SYNTHETIC'];
  }, 'MC14-014');
});

test('13 warranty restriction inconsistent with law is rejected', () => {
  fails((d) => {
    d['consumer-rights.json'].keyFacts.commercialWarrantyReplacesLegalGuarantee = true;
  }, 'MC14-028');
});

test('14 withdrawal-right suppression is rejected', () => {
  fails((d) => {
    d['consumer-rights.json'].keyFacts.withdrawalDays = 0;
  }, 'MC14-028');
});

test('15 data-protection compliance asserted without evidence is rejected', () => {
  fails((d) => {
    d['privacy-obligations.json'].securityAndBreach.article32ControlsStatus = 'COMPLIANT_VERIFIED';
  }, 'MC14-053');
});

test('16 CRA certification claim without evidence is rejected', () => {
  fails((d) => {
    d['release-evidence-gates.json'].documents.find((x) => x.documentId === 'DOC-24').status =
      'CERTIFIED';
  }, 'MC14-021');
});

test('17 unsupported distributor conformity gate is rejected', () => {
  fails((d) => {
    d['release-evidence-gates.json'].gates[0].status = 'CLOSED_VERIFIED';
  }, 'MC14-021');
});

test('18 wrong legal effective date is rejected', () => {
  fails((d) => {
    d['legal-sources.json'].sources[0].publicationDate = '01/01/2020';
  }, 'MC14-054');
});

test('19 outdated/repealed instrument treated as unchanged is rejected', () => {
  fails((d) => {
    d['legal-sources.json'].sources = d['legal-sources.json'].sources.filter(
      (s) => s.sourceId !== 'SRC-EU-DELREG-2026-339',
    );
  }, 'MC14-005');
});

test('20 missing economic-operator role is rejected', () => {
  fails((d) => {
    d['economic-operator-roles.json'].roleDefinitions = d[
      'economic-operator-roles.json'
    ].roleDefinitions.filter((r) => r.roleId !== 'BRAND_OWNER');
  }, 'MC14-044');
});

test('21 risk marked closed with no evidence is rejected', () => {
  fails((d) => {
    d['risk-register.json'].risks[0].currentStatus = 'CLOSED_VERIFIED';
  }, 'MC14-039');
});

test('22 unowned legal blocker is rejected', () => {
  fails((d) => {
    d['risk-register.json'].risks[0].ownerRole = '';
  }, 'MC14-007');
});

test('23 A-class claim conflicting with public-brand NO-GO is rejected', () => {
  fails((d) => {
    d['claims-policy.json'].summary.publicationAuthorization = 'AUTHORIZED';
    d['claims-policy.json'].internalVsPublic.publicationAuthorized = true;
    const c = d['bilingual-claims.json'].claims.find((x) => x.claimId === 'CLM-001');
    c.publicationStatus = 'PUBLIC_AUTHORIZED';
    c.evidencePresent = ['SYNTHETIC'];
  }, 'MC14-052');
});

test('24 contradictory ES/EN claims are rejected', () => {
  fails((d) => {
    const c = d['bilingual-claims.json'].claims.find((x) => x.claimId === 'CLM-003');
    c.pairs.es = 'NAV se define en 2 ediciones: NAV Essential y NAV Pro.';
    c.pairs.en = 'NAV is defined in 3 editions: NAV Essential and NAV Pro.';
  }, 'MC14-015');
});

test('25 website finding silently marked remediated is rejected', () => {
  fails((d) => {
    d['website-findings.json'].findings[0].status = 'REMEDIATED';
  }, 'MC14-035');
});

test('26 financial scenario treated as proven profitability is rejected', () => {
  fails((d) => {
    const c = d['bilingual-claims.json'].claims.find((x) => x.claimId === 'CLM-029');
    c.publicationStatus = 'PUBLIC_AUTHORIZED';
    c.evidencePresent = ['SYNTHETIC'];
  }, 'MC14-026');
});

test('27 predecessor blocker deletion is rejected', () => {
  fails((d) => {
    d['predecessor-blocker-mapping.json'].mappings = d[
      'predecessor-blocker-mapping.json'
    ].mappings.filter((m) => m.inheritedId !== 'L-01');
  }, 'MC14-031');
});

test('28 missing MC-13 financial dependency is rejected', () => {
  fails((d) => {
    d['predecessor-blocker-mapping.json'].mc13HandoffConsumption = d[
      'predecessor-blocker-mapping.json'
    ].mc13HandoffConsumption.filter((x) => x.dependencyId !== 'MC14-DEP-10');
  }, 'MC14-030');
});

test('29 unreviewed milestone described as independently approved is rejected', () => {
  fails((d) => {
    d['manifest.json'].review.status = 'PASS';
    d['manifest.json'].statusBlock.MC14_INDEPENDENT_REVIEW = 'PASS';
  }, 'MC14-050');
});

test('30 source-IP clearance invented is rejected', () => {
  fails((d) => {
    d['licensing-rights.json'].summary.sourceIpCleared = true;
  }, 'MC14-020');
});

test('31 unknown amount silently converted to zero is rejected', () => {
  fails((d) => {
    d['predecessor-blocker-mapping.json'].mc13HandoffConsumption.find(
      (x) => x.dependencyId === 'MC14-DEP-02',
    ).amountEur = 0;
  }, 'MC14-029');
});

test('32 unresolved source identifier is rejected', () => {
  fails((d) => {
    d['risk-register.json'].risks[0].legalSourceIds.push('SRC-FAKE-9999');
  }, 'MC14-005');
});

test('33 conditional obligation without a condition is rejected', () => {
  fails((d) => {
    const p = d['regulatory-applicability.json'].productFamilies.find(
      (x) => x.productFamilyId === 'HUB',
    );
    const a = p.assessments.find((x) => x.instrumentId === 'RED');
    a.condition = null;
  }, 'MC14-011');
});

test('34 NOT_APPLICABLE without legal rationale is rejected', () => {
  fails((d) => {
    const p = d['regulatory-applicability.json'].productFamilies.find(
      (x) => x.productFamilyId === 'NAV',
    );
    p.assessments.find((x) => x.instrumentId === 'LVD').rationale = 'not needed';
  }, 'MC14-010');
});

test('35 blocking risk without required evidence is rejected', () => {
  fails((d) => {
    d['risk-register.json'].risks.find((r) => r.riskId === 'PRD-01').requiredEvidence = [];
  }, 'MC14-008');
});

test('36 claim missing one locale of the pair is rejected', () => {
  fails((d) => {
    const c = d['bilingual-claims.json'].claims.find((x) => x.claimId === 'CLM-002');
    delete c.pairs.en;
  }, 'MC14-015');
});

test('37 document removed from the package is rejected', () => {
  fails(
    () => {},
    'MC14-002',
    (docs) => {
      docs['MC-14-BASELINE-AND-GOVERNANCE.md'] = null;
    },
  );
});

test('38 public authorization while publication authorization is NONE is rejected', () => {
  fails((d) => {
    const c = d['bilingual-claims.json'].claims.find((x) => x.claimId === 'CLM-019');
    c.publicationStatus = 'PUBLIC_AUTHORIZED';
    c.evidencePresent = ['SYNTHETIC'];
  }, 'MC14-017');
});

test('39 review verdict inconsistent with manifest is rejected', () => {
  fails((d) => {
    d['review-findings.json'].verdict = 'PASS';
    d['review-findings.json'].status = 'PASS';
    d['review-findings.json'].findings = [
      { id: 'F-01', classification: 'BLOCKING', status: 'OPEN' },
    ];
  }, 'MC14-050');
});

test('40 manifest count drift is rejected', () => {
  fails((d) => {
    d['manifest.json'].evidenceCounts.risks = 1;
  }, 'MC14-048');
});
