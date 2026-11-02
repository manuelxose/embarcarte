#!/usr/bin/env node
/**
 * MC-11 hardware evidence validator — adversarial tests.
 *
 * Proves two things:
 *   1. a deliberately valid in-memory evidence set passes every check;
 *   2. every mandated integrity rule (V01–V50) and every structural check (S01–S04) fails when it
 *      is violated, i.e. the validator is not a rubber stamp.
 *
 * Fixtures are in-memory only: no data file is ever written or mutated on disk
 * (DATA-CONTRACT.md §7).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  CANONICAL_BUNDLES,
  CANONICAL_PRODUCTS,
  CRITERIA_WEIGHTS,
  FILES,
  GOVERNANCE_INVARIANTS,
  validate,
} from './check-marea-hardware.mjs';

/* ------------------------------------------------------------------ fixture */

const TODAY = '2026-11-02';
const clone = (value) => JSON.parse(JSON.stringify(value));

function evidenceRecord(n, overrides = {}) {
  return {
    evidenceId: `EVD-MC11-${String(n).padStart(3, '0')}`,
    claimId: `CLM-MC11-${String(n).padStart(3, '0')}`,
    url: `https://example-manufacturer.invalid/datasheet-${n}.pdf`,
    publisher: 'Example Manufacturer',
    retrievedOn: TODAY,
    publishedOn: null,
    evidenceType: 'MANUFACTURER_DATASHEET',
    supportedAssertion: `Datasheet parameter set ${n} as published by the manufacturer`,
    limitations: 'Vendor declaration; not independently measured',
    confidence: 'MEDIUM',
    affectedItems: ['CMP-PROC-01'],
    independentVerification: 'NOT_PERFORMED',
    ...overrides,
  };
}

function scoreSet(value) {
  const scores = {};
  for (const criterion of Object.keys(CRITERIA_WEIGHTS)) scores[criterion] = value;
  const totalWeight = Object.values(CRITERIA_WEIGHTS).reduce((a, b) => a + b, 0);
  const weightedScore = Object.entries(CRITERIA_WEIGHTS).reduce(
    (sum, [criterion, weight]) => sum + (value * weight) / totalWeight,
    0,
  );
  return { scores, weightedScore: Math.round(weightedScore * 100) / 100 };
}

function makeFixture() {
  const softwareOnly = new Set(['NAV', 'WEATHER', 'FLEET']);
  const families = Object.entries(CANONICAL_PRODUCTS).map(([familyId, editions]) => ({
    familyId,
    canonicalName: `MAREA ${familyId}`,
    editions: editions.slice(0, 2),
    hardwareClass: softwareOnly.has(familyId)
      ? familyId === 'FLEET'
        ? 'LICENSED_DATA_SERVICE'
        : 'SOFTWARE_ONLY'
      : familyId === 'PILOT'
        ? 'SAFETY_BLOCKED'
        : 'PROPRIETARY_HARDWARE',
    requiredPhysicalComponents: softwareOnly.has(familyId) ? [] : ['candidate gateway compute'],
    optionalPhysicalComponents: [],
    softwareOnlyComponents: ['local dashboard'],
    externalDataDependencies: [],
    interfaceRequirements: ['NMEA 2000', 'NMEA 0183'],
    powerRequirements: {
      nominalSupply: '12 V DC',
      voltageRange: 'candidate 9-16 V DC (not measured)',
      typicalConsumptionW: null,
      standbyConsumptionW: null,
      evidenceStatus: 'CANDIDATE_REQUIREMENT',
    },
    safetyClassification: familyId === 'PILOT' ? 'SAFETY_RELEVANT_BLOCKED' : 'NON_SAFETY_RELATED',
    provisionalArchitectureId: `ARCH-${familyId}-A`,
    alternativeArchitectureIds: [],
    verificationNeeded: ['electrical, thermal and EMC measurement'],
    supplierEvidenceIds: [],
    preliminaryCost: { status: 'ENGINEERING_ESTIMATE', rangeEur: null },
    conformityQuestions: ['which harmonised standards apply'],
    readiness: 'NOT_SELECTED',
    customerRequirementUncertainty: 'UNVALIDATED',
    commercialBlockers: ['no customer evidence', 'brand NOT_GRANTED'],
    sharedPlatformBlocks: ['GATEWAY_COMPUTE'],
  }));

  const line = (familyId, editionId, inclusion = 'INCLUDED', quantity = 1) => ({
    familyId,
    editionId,
    inclusion,
    quantity,
  });
  const bundles = [
    { bundleId: 'START', componentLines: [line('HUB', 'HUB-STANDARD'), line('NAV', 'NAV-PRO')] },
    {
      bundleId: 'CRUISE',
      componentLines: [line('NAV', 'NAV-ESSENTIAL'), line('HUB', 'HUB-STANDARD')],
    },
    { bundleId: 'SAIL', componentLines: [line('NAV', 'NAV-PRO'), line('HUB', 'HUB-STANDARD')] },
    {
      bundleId: 'PROTECT',
      componentLines: [line('WATCH', 'WATCH-CORE'), line('SENSE', 'SENSE-ESSENTIALS')],
    },
    { bundleId: 'COMPLETE', componentLines: [line('NAV', 'NAV-PRO'), line('HUB', 'HUB-PRO')] },
    { bundleId: 'FLEET', componentLines: [line('FLEET', 'FLEET-START')] },
  ].map((bundle) => ({
    ...bundle,
    canonicalName: `MAREA ${bundle.bundleId}`,
    physicalHardwareFamilies: bundle.componentLines
      .map((l) => l.familyId)
      .filter((f) => f !== 'FLEET'),
    hardwareIncludedByDefault: bundle.bundleId !== 'FLEET',
    fixedTurnkeyPrice: false,
    exclusions: [],
    safetyGate: 'BLOCKED',
  }));

  const components = [
    {
      componentId: 'CMP-PROC-01',
      block: 'PROC',
      name: 'Candidate gateway compute module',
      manufacturer: 'Example Manufacturer',
      mpn: 'EX-PROC-1000',
      function: 'application processor',
      datasheetUrl: 'https://example-manufacturer.invalid/datasheet-1.pdf',
      datasheetStatus: 'RETRIEVED',
      mpnEvidenceId: 'EVD-MC11-001',
      lifecycleStatus: 'ACTIVE',
      criticality: 'CRITICAL',
      secondSourceStatus: 'AVAILABLE',
      alternateComponentIds: ['CMP-PROC-02'],
      keyParameters: {},
      temperatureRange: 'UNKNOWN',
      supplyVoltage: '5 V DC',
      interfaces: ['USB', 'Ethernet'],
      sourcingChannelSupplierIds: ['SUP-example-dist-01'],
      evidenceIds: ['EVD-MC11-001'],
      notes: 'candidate only',
      assessedOn: TODAY,
    },
    {
      componentId: 'CMP-PROC-02',
      block: 'PROC',
      name: 'Alternative gateway compute module',
      manufacturer: 'Second Manufacturer',
      mpn: 'SEC-PROC-2000',
      function: 'application processor',
      datasheetUrl: 'https://second-manufacturer.invalid/ds-2.pdf',
      datasheetStatus: 'LISTED_NOT_RETRIEVED',
      mpnEvidenceId: 'EVD-MC11-002',
      lifecycleStatus: 'ACTIVE',
      criticality: 'MAJOR',
      secondSourceStatus: 'AVAILABLE',
      alternateComponentIds: [],
      keyParameters: {},
      temperatureRange: 'UNKNOWN',
      supplyVoltage: '5 V DC',
      interfaces: ['USB'],
      sourcingChannelSupplierIds: ['SUP-example-dist-01'],
      evidenceIds: ['EVD-MC11-002'],
      notes: 'candidate only',
      assessedOn: TODAY,
    },
    {
      componentId: 'CMP-CELL-01',
      block: 'CELL',
      name: 'Candidate LTE module',
      manufacturer: 'Third Manufacturer',
      mpn: 'THI-CELL-3000',
      function: 'cellular connectivity',
      datasheetUrl: 'https://third-manufacturer.invalid/ds-3.pdf',
      datasheetStatus: 'RETRIEVED',
      mpnEvidenceId: 'EVD-MC11-003',
      lifecycleStatus: 'ACTIVE',
      criticality: 'CRITICAL',
      secondSourceStatus: 'SINGLE_SOURCE',
      alternateComponentIds: [],
      keyParameters: {},
      temperatureRange: 'UNKNOWN',
      supplyVoltage: '3.8 V DC',
      interfaces: ['USB'],
      sourcingChannelSupplierIds: ['SUP-example-dist-01'],
      evidenceIds: ['EVD-MC11-003'],
      notes: 'candidate only',
      assessedOn: TODAY,
    },
  ];

  const suppliers = [
    {
      supplierId: 'SUP-example-dist-01',
      legalName: 'Example Distribution BV',
      tradingName: 'Example Distribution',
      website: 'https://example-distributor.invalid',
      country: 'NL',
      roles: ['AUTHORIZED_DISTRIBUTOR'],
      componentsOrServices: ['semiconductors'],
      manufacturerAuthorizationEvidence: 'UNKNOWN',
      qualityCertStatements: [],
      contactStatus: 'NOT_CONTACTED',
      rfqStatus: 'RFQ_NOT_SENT',
      risks: ['single unit retail pricing only'],
      alternativeSupplierIds: [],
      evidenceIds: ['EVD-MC11-004'],
      assessedOn: TODAY,
    },
    {
      supplierId: 'SUP-example-ems-01',
      legalName: 'Example EMS SA',
      tradingName: 'Example EMS',
      website: 'https://example-ems.invalid',
      country: 'ES',
      roles: ['EMS'],
      componentsOrServices: ['pcb assembly'],
      manufacturerAuthorizationEvidence: 'UNKNOWN',
      qualityCertStatements: [],
      contactStatus: 'NOT_CONTACTED',
      rfqStatus: 'RFQ_NOT_SENT',
      risks: ['no quotation'],
      alternativeSupplierIds: [],
      evidenceIds: ['EVD-MC11-005'],
      assessedOn: TODAY,
    },
  ];

  const observations = [
    {
      observationId: 'PO-PROC-001',
      componentId: 'CMP-PROC-01',
      serviceDescription: null,
      supplierId: 'SUP-example-dist-01',
      supplierSku: 'EX-PROC-1000',
      evidenceClass: 'AUTHORIZED_DISTRIBUTOR_PUBLIC_PRICE',
      observedUnitPrice: 64.5,
      currency: 'EUR',
      vatTreatment: 'VAT_INCLUDED',
      unitQuantity: 1,
      priceQuantityTier: 1,
      moqObserved: null,
      moqEvidenceId: null,
      observedAt: TODAY,
      sourceUrl: 'https://example-distributor.invalid/ex-proc-1000',
      publisher: 'Example Distribution BV',
      availabilityClaim: 'LISTED_FOR_SALE',
      availabilityEvidenceId: 'EVD-MC11-004',
      leadTimeClaim: 'UNKNOWN',
      leadTimeEvidenceId: null,
      lifecycleStatus: 'ACTIVE',
      confidence: 'PUBLIC_PRICE_OBSERVED',
      limitations: 'single-unit VAT-inclusive catalogue price',
      independentVerification: 'NOT_PERFORMED',
    },
    {
      observationId: 'PO-MCU-001',
      componentId: 'CMP-PROC-02',
      serviceDescription: null,
      supplierId: 'SUP-example-dist-01',
      supplierSku: 'SEC-PROC-2000',
      evidenceClass: 'AUTHORIZED_DISTRIBUTOR_PUBLIC_PRICE',
      observedUnitPrice: 12,
      currency: 'EUR',
      vatTreatment: 'VAT_EXCLUDED',
      unitQuantity: 1,
      priceQuantityTier: 1,
      moqObserved: null,
      moqEvidenceId: null,
      observedAt: TODAY,
      sourceUrl: 'https://example-distributor.invalid/sec-proc-2000',
      publisher: 'Example Distribution BV',
      availabilityClaim: 'UNKNOWN',
      availabilityEvidenceId: null,
      leadTimeClaim: 'UNKNOWN',
      leadTimeEvidenceId: null,
      lifecycleStatus: 'ACTIVE',
      confidence: 'PUBLIC_PRICE_OBSERVED',
      limitations: 'single-unit catalogue price',
      independentVerification: 'NOT_PERFORMED',
    },
  ];

  const ebomLines = [
    {
      lineId: 'EBOM-HUB-01-L001',
      category: 'ELECTRONIC',
      componentId: 'CMP-PROC-01',
      componentName: 'Candidate gateway compute module',
      manufacturer: 'Example Manufacturer',
      mpn: 'EX-PROC-1000',
      qtyPerUnit: 1,
      requirement: 'REQUIRED',
      candidateSubstitute: 'CMP-PROC-02',
      datasheetUrl: 'https://example-manufacturer.invalid/datasheet-1.pdf',
      supplierRef: 'SUP-example-dist-01',
      priceObservationId: 'PO-PROC-001',
      priceEvidenceClass: 'AUTHORIZED_DISTRIBUTOR_PUBLIC_PRICE',
      observedUnitPrice: 64.5,
      currency: 'EUR',
      vatTreatment: 'VAT_INCLUDED',
      priceDate: TODAY,
      priceQuantityTier: 1,
      volumeAdjustmentAssumptionId: null,
      availabilityStatus: 'UNKNOWN',
      riskRating: 'MAJOR',
      lifecycleStatus: 'ACTIVE',
      evidenceSource: 'https://example-distributor.invalid/ex-proc-1000',
      engineeringConfidence: 'PUBLIC_PRICE_OBSERVED',
      normalizationApplied: true,
      normalizationNote: 'VAT-inclusive retail price divided by 1.21 to an ex-VAT basis',
      verificationRequirement: 'obtain a real quotation before any procurement',
    },
    {
      lineId: 'EBOM-HUB-01-L002',
      category: 'ELECTRONIC',
      componentId: 'CMP-PROC-02',
      componentName: 'Alternative gateway compute module',
      manufacturer: 'Second Manufacturer',
      mpn: 'SEC-PROC-2000',
      qtyPerUnit: 1,
      requirement: 'OPTIONAL',
      candidateSubstitute: null,
      datasheetUrl: 'https://second-manufacturer.invalid/ds-2.pdf',
      supplierRef: 'SUP-example-dist-01',
      priceObservationId: 'PO-MCU-001',
      priceEvidenceClass: 'AUTHORIZED_DISTRIBUTOR_PUBLIC_PRICE',
      observedUnitPrice: 12,
      currency: 'EUR',
      vatTreatment: 'VAT_EXCLUDED',
      priceDate: TODAY,
      priceQuantityTier: 1,
      volumeAdjustmentAssumptionId: null,
      availabilityStatus: 'UNKNOWN',
      riskRating: 'MINOR',
      lifecycleStatus: 'ACTIVE',
      evidenceSource: 'https://example-distributor.invalid/sec-proc-2000',
      engineeringConfidence: 'PUBLIC_PRICE_OBSERVED',
      normalizationApplied: false,
      normalizationNote: null,
      verificationRequirement: 'verify lifecycle with the manufacturer',
    },
  ];
  const ebomTotals = {
    knownLinesEur: Number(
      ebomLines.reduce((sum, l) => sum + l.observedUnitPrice * l.qtyPerUnit, 0).toFixed(2),
    ),
    unknownLineCount: 0,
    knownLineCount: ebomLines.length,
    totalStatus: 'COMPLETE_TO_EVIDENCE',
    partialSubtotalEur: null,
    totalEur: Number(
      ebomLines.reduce((sum, l) => sum + l.observedUnitPrice * l.qtyPerUnit, 0).toFixed(2),
    ),
  };

  const mbomLines = [
    {
      lineId: 'MBOM-HUB-01-L001',
      category: 'MECHANICAL',
      componentId: null,
      componentName: 'IP-rated enclosure, candidate',
      manufacturer: null,
      mpn: null,
      qtyPerUnit: 1,
      requirement: 'REQUIRED',
      candidateSubstitute: null,
      datasheetUrl: null,
      supplierRef: 'UNKNOWN',
      priceObservationId: null,
      priceEvidenceClass: 'ENGINEERING_ASSUMPTION',
      observedUnitPrice: 18,
      currency: 'EUR',
      vatTreatment: 'VAT_EXCLUDED',
      priceDate: TODAY,
      priceQuantityTier: 1,
      volumeAdjustmentAssumptionId: null,
      availabilityStatus: 'UNKNOWN',
      riskRating: 'MAJOR',
      lifecycleStatus: 'UNKNOWN',
      evidenceSource:
        'engineering estimate; no catalogue match for the required ingress protection',
      engineeringConfidence: 'ENGINEERING_ESTIMATE',
      normalizationApplied: false,
      normalizationNote: null,
      verificationRequirement: 'obtain quotation and ingress test evidence',
    },
  ];
  const mbomTotals = {
    knownLinesEur: 18,
    unknownLineCount: 0,
    knownLineCount: 1,
    totalStatus: 'COMPLETE_TO_EVIDENCE',
    partialSubtotalEur: null,
    totalEur: 18,
  };

  const costCategories = [
    {
      categoryId: 'COST-01',
      name: 'Electronic components',
      included: true,
      basis: 'engineering BOM',
    },
    {
      categoryId: 'COST-02',
      name: 'PCB fabrication',
      included: true,
      basis: 'engineering estimate',
    },
    {
      categoryId: 'COST-03',
      name: 'Assembly and test labour',
      included: true,
      basis: 'engineering estimate',
    },
    {
      categoryId: 'COST-04',
      name: 'Enclosure and mechanical',
      included: true,
      basis: 'engineering estimate',
    },
    { categoryId: 'COST-05', name: 'Tooling and NRE', included: true, basis: 'UNKNOWN' },
  ];

  const scenarios = [];
  for (const familyId of ['HUB', 'AIS', 'PILOT', 'SENSE', 'WATCH', 'DISPLAY']) {
    for (const volume of [100]) {
      for (const costCase of ['LOW', 'BASE', 'HIGH']) {
        scenarios.push({
          scenarioId: `SCN-${familyId}-${volume}-${costCase}`,
          familyId,
          editionId: CANONICAL_PRODUCTS[familyId][0],
          volume,
          case: costCase,
          currency: 'EUR',
          lines: [
            { categoryId: 'COST-01', amountEur: 76.5, status: 'KNOWN', basis: 'engineering BOM' },
            { categoryId: 'COST-02', amountEur: 6, status: 'KNOWN', basis: 'engineering estimate' },
            { categoryId: 'COST-03', amountEur: 9, status: 'KNOWN', basis: 'engineering estimate' },
            {
              categoryId: 'COST-04',
              amountEur: 18,
              status: 'KNOWN',
              basis: 'engineering estimate',
            },
            {
              categoryId: 'COST-05',
              amountEur: null,
              status: 'UNKNOWN',
              basis: 'no tooling quotation',
            },
          ],
          toolingAmortizationEur: null,
          totalEur: null,
          totalStatus: 'INCOMPLETE',
          missingCategories: ['COST-05'],
          note: 'incomplete by construction: tooling and certification costs are UNKNOWN',
        });
      }
    }
  }

  const costs = {
    currency: 'EUR',
    fxRates: [],
    assumptions: [
      {
        assumptionId: 'ASM-01',
        statement: 'Retail catalogue price normalised by 21% Spanish VAT',
        value: 0.21,
        evidenceClass: 'ENGINEERING_ASSUMPTION',
        sensitivity: 'MEDIUM',
        presentedAsFact: false,
      },
    ],
    categories: costCategories,
    scenarios,
    certificationCosts: [
      {
        item: 'EMC test campaign, candidate',
        amountEur: null,
        status: 'UNKNOWN',
        guaranteed: false,
        source: 'NOT_QUOTED',
      },
    ],
    engineeringCosts: [
      {
        item: 'Hardware engineering, candidate',
        amountEur: null,
        status: 'UNKNOWN',
        basis: 'no data',
      },
    ],
    recurringOperatingCosts: [
      {
        item: 'Cellular connectivity, candidate',
        amountEur: null,
        status: 'UNKNOWN',
        basis: 'no contract',
      },
    ],
  };

  const legislationRegister = [
    {
      legislationId: 'LEG-RED-2014-53-EU',
      title: 'Radio Equipment Directive 2014/53/EU',
      officialUrl: 'https://eur-lex.europa.eu/eli/dir/2014/53/oj',
      applicabilityPrinciple: 'applies to products intentionally emitting or receiving radio waves',
      keyDeadlines: [
        {
          date: '2016-06-13',
          description: 'Directive applicable',
          evidenceId: 'EVD-MC11-006',
        },
      ],
      retrievedOn: TODAY,
      verificationStatus: 'RETRIEVED',
    },
    {
      legislationId: 'LEG-MED-2014-90-EU',
      title: 'Marine Equipment Directive 2014/90/EU',
      officialUrl: 'https://eur-lex.europa.eu/eli/dir/2014/90/oj',
      applicabilityPrinciple: 'applies only to equipment listed for marine equipment use',
      keyDeadlines: [],
      retrievedOn: TODAY,
      verificationStatus: 'RETRIEVED',
    },
  ];
  const longRationale =
    'Scope rationale recorded for this configuration: the assessed function, electrical supply and radio interfaces generate the stated obligation under the cited article, subject to qualified legal review.';
  const conformityProducts = Object.keys(CANONICAL_PRODUCTS).map((productId) => ({
    productId,
    editionId: CANONICAL_PRODUCTS[productId][0],
    intendedUse: 'candidate marine data product, not for sale',
    intendedMarket: ['ES', 'PT'],
    manufacturerOperatorStatus: 'UNDETERMINED',
    radioFunctions: productId === 'WATCH' ? ['cellular'] : [],
    electricalSupply: '12 V DC nominal',
    applicable: [
      {
        legislationId: 'LEG-RED-2014-53-EU',
        rationale: longRationale,
        candidateStandards: ['EN 301 489 series (candidate)'],
        conformityAssessment: 'SELF_ASSESSMENT_WITH_RADIO_TEST_EVIDENCE',
        notifiedBodyPotential: productId === 'WATCH',
        technicalFileObligations: ['technical file', 'test reports'],
        testEvidenceNeeded: ['EMC', 'radio spectrum'],
        docRequirements: ['EU declaration of conformity'],
        markingRequirements: ['CE marking (not applied)'],
        languageRequirements: ['ES', 'PT'],
        lifecycleObligations: ['CRA vulnerability handling once applicable'],
        responsiblePerson: 'UNASSIGNED',
        costConfidence: 'UNKNOWN',
        status: 'APPLICABILITY_ASSESSED_NOT_CERTIFIED',
        qualifiedReviewRequired: true,
        evidenceIds: ['EVD-MC11-006'],
      },
    ],
    notApplicable: [
      {
        legislationId: 'LEG-MED-2014-90-EU',
        rationale:
          'Not applied because the candidate product is not listed marine equipment and no notified-body marine type approval is claimed for this configuration.',
        qualifiedReviewRequired: true,
      },
    ],
  }));

  const conformity = { legislationRegister, products: conformityProducts };

  const qualification = {
    tests: [
      {
        testId: 'QUAL-HUB-01',
        familyId: 'HUB',
        purpose: 'candidate radiated emissions characterisation',
        requirementSource: 'IEC 60945 (candidate, scope to be confirmed)',
        acceptanceCriterion: 'candidate limit, not established',
        testMethod: 'accredited laboratory method',
        equipment: ['EMC chamber'],
        independentLabRequired: true,
        prototypeRequired: true,
        estimatedCost: { status: 'UNKNOWN', amountEur: null },
        responsibleParty: 'UNASSIGNED',
        status: 'NOT_EXECUTED',
        evidenceIds: ['EVD-MC11-006'],
      },
      {
        testId: 'QUAL-DISPLAY-01',
        familyId: 'DISPLAY',
        purpose: 'candidate ingress protection verification',
        requirementSource: 'IEC 60529 (candidate requirement only)',
        acceptanceCriterion: 'candidate IP requirement, not claimed',
        testMethod: 'accredited laboratory method',
        equipment: ['ingress test rig'],
        independentLabRequired: true,
        prototypeRequired: true,
        estimatedCost: { status: 'UNKNOWN', amountEur: null },
        responsibleParty: 'UNASSIGNED',
        status: 'NOT_EXECUTED',
        evidenceIds: ['EVD-MC11-006'],
      },
    ],
  };

  const nmea = {
    nmea2000: {
      technicalImplementation: 'NOT_IMPLEMENTED',
      membership: 'NOT_HELD',
      manufacturerIdentification: 'NOT_ASSIGNED',
      productCertification: 'NOT_CERTIFIED',
      approvedTerminology: 'INTERNAL_ONLY',
      logoUse: 'PROHIBITED',
      testedCompatibilityRows: 0,
      claimsPermitted: ['receive-only interface statements once tested'],
      claimsProhibited: ['NMEA 2000 certified claim is prohibited'],
    },
    nmea0183: {
      technicalImplementation: 'NOT_IMPLEMENTED',
      membership: 'NOT_HELD',
      manufacturerIdentification: 'NOT_ASSIGNED',
      productCertification: 'NOT_CERTIFIED',
      approvedTerminology: 'INTERNAL_ONLY',
      logoUse: 'PROHIBITED',
      testedCompatibilityRows: 0,
      claimsPermitted: ['documented interface statement'],
      claimsProhibited: ['certified claim is prohibited'],
    },
    governanceSources: [{ url: 'https://www.nmea.org/nmea-2000.html', retrievedOn: TODAY }],
  };

  const compatibility = {
    rows: [
      {
        rowId: 'COMPAT-HUB-01',
        familyId: 'HUB',
        candidateHardware: 'candidate gateway with isolated CAN interface',
        protocol: 'NMEA2000',
        interface: 'CAN 250 kbit/s',
        dataDirection: 'IN',
        requiredMessages: 'candidate receive set',
        thirdPartyAssumption: 'third-party device advertises NMEA 2000',
        knownLimitations: 'no device test performed',
        verificationMethod: 'bench test with a real device and a CAN analyser',
        requiredTestEquipment: ['CAN analyser'],
        certificationDependencies: ['NMEA certification if claimed'],
        evidence: 'canonical compatibility document row',
        status: 'TEST_REQUIRED',
        deviceTestRecorded: false,
      },
    ],
  };

  const risks = {
    risks: [
      {
        riskId: 'RISK-SOURCING-01',
        domain: 'SOURCING',
        title: 'Single-source cellular module',
        description: 'CMP-CELL-01 has no verified second source',
        likelihood: 'HIGH',
        impact: 'HIGH',
        evidenceStrength: 'DOCUMENTED',
        owner: 'sourcing',
        mitigation: 'identify an alternative module before procurement',
        mitigationStatus: 'PROPOSED_NOT_IMPLEMENTED',
        blockerStatus: 'OPEN',
        nextVerificationAction: 'public-source second-source search',
        affectedFamilies: ['WATCH'],
        affectedComponentIds: ['CMP-CELL-01'],
        evidenceIds: ['EVD-MC11-003'],
      },
      {
        riskId: 'RISK-ENG-01',
        domain: 'ENGINEERING',
        title: 'No electrical measurement exists',
        description: 'No prototype exists, so no power, thermal or EMC measurement is possible',
        likelihood: 'HIGH',
        impact: 'HIGH',
        evidenceStrength: 'DOCUMENTED',
        owner: 'architecture',
        mitigation: 'test plan prepared',
        mitigationStatus: 'PROPOSED_NOT_IMPLEMENTED',
        blockerStatus: 'BLOCKED',
        nextVerificationAction: 'requires G4 authorisation',
        affectedFamilies: ['HUB', 'WATCH', 'DISPLAY'],
        evidenceIds: ['EVD-MC11-006'],
      },
    ],
  };

  const decisions = {
    decisions: [
      {
        decisionId: 'D-041',
        date: TODAY,
        title: 'MC-11 remains internal engineering feasibility only',
        context: 'no customer evidence and no supplier quotation exists',
        decision: 'report internal feasibility separately from formal procurement evidence',
        rationale: 'a missing quote cannot be replaced by a catalogue price',
        consequences: 'milestone cannot reach full PASS',
        evidence: ['docs/marea/hardware/MC11-RESEARCH-SCOPE.md'],
        statusEffect: 'no commercial status change',
      },
    ],
    gates: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7'].map((gateId) => ({
      gateId,
      name: `Gate ${gateId}`,
      state: 'NOT_AUTHORIZED',
      requirementsNeeded: ['explicit authorisation'],
      authorized: false,
    })),
  };

  const governance = {
    invariants: { ...GOVERNANCE_INVARIANTS },
    milestoneState: {
      mc11Verdict: 'PARTIAL',
      internalFeasibilityScope: 'PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE',
      formalProcurementEvidence: 'BLOCKED_OR_NOT_OBTAINED',
      suppliersContacted: 0,
      rfqsSent: 0,
      purchasesMade: 0,
      prototypesProcured: 0,
      physicalTestsExecuted: 0,
      certificationsEstablished: 0,
      formalSupplierQuotations: 0,
      approvedProductionBom: 0,
      testedCompatibilityRows: 0,
      manufacturerOperatorIdentity: 'UNDETERMINED',
    },
    restrictions: [
      {
        restrictionId: 'RES-01',
        statement: 'No public page, checkout or publication change was made by MC-11.',
        status: 'ENFORCED',
      },
      {
        restrictionId: 'RES-02',
        statement: 'No supplier was contacted and no RFQ was sent.',
        status: 'ENFORCED',
      },
    ],
    asOf: TODAY,
    authority: 'docs/marea/hardware/MC11-BASELINE-AND-GOVERNANCE.md',
  };

  const arch = {
    criteriaWeights: { ...CRITERIA_WEIGHTS },
    hardGates: { PILOT: 'BLOCKED', AIS_TRANSMIT: 'PROHIBITED' },
    options: ['A', 'B', 'C', 'D'].map((optionClass, i) => ({
      architectureId: `ARCH-HUB-${optionClass}`,
      familyId: 'HUB',
      optionClass,
      label: `Candidate option ${optionClass}`,
      description: 'candidate architecture, not approved',
      buildingBlocks: ['PROC', 'MCU', 'CAN', 'PWR', 'MECH'],
      ...scoreSet(4 - (i % 2)),
      status: 'PROPOSED_NOT_APPROVED',
      limitations: ['no prototype exists'],
      verificationNeeded: ['bench and EMC measurement'],
      conformityImplications: ['RED/EMC obligations depend on final radio set'],
      costImplication: 'UNKNOWN until quotation',
      evidenceIds: ['EVD-MC11-006'],
    })),
    recommendations: [
      {
        familyId: 'HUB',
        preferredArchitectureId: 'ARCH-HUB-D',
        rationale: 'hybrid acquisition + processor is the most maintainable candidate',
        confidence: 'LOW',
        explicitlyUnfrozen: true,
      },
    ],
  };

  const review = {
    reviewId: 'MC-11-REVIEW',
    reviewedCommit: '0'.repeat(40),
    verdict: 'PASS',
    findings: [],
    sourceVerification: [],
    calculationsRechecked: [],
    notVerified: [],
  };

  const evidence = {
    evidence: [
      evidenceRecord(1),
      evidenceRecord(2, {
        url: 'https://second-manufacturer.invalid/ds-2.pdf',
        evidenceType: 'MANUFACTURER_WEBPAGE',
      }),
      evidenceRecord(3, { url: 'https://third-manufacturer.invalid/ds-3.pdf' }),
      evidenceRecord(4, {
        url: 'https://example-distributor.invalid/ex-proc-1000',
        evidenceType: 'DISTRIBUTOR_WEBPAGE',
      }),
      evidenceRecord(5, {
        url: 'https://example-ems.invalid',
        evidenceType: 'MANUFACTURER_WEBPAGE',
      }),
      evidenceRecord(6, {
        url: 'https://eur-lex.europa.eu/eli/dir/2014/53/oj',
        evidenceType: 'OFFICIAL_LEGAL_TEXT',
        publisher: 'European Union',
      }),
    ],
  };

  const data = {
    family: { families, bundles },
    arch,
    components: { components },
    suppliers: { suppliers },
    prices: { observations },
    ebom: {
      status: 'ENGINEERING_BOM_NOT_APPROVED',
      currency: 'EUR',
      vatTreatment: 'VAT_EXCLUDED',
      boms: [
        {
          bomId: 'EBOM-HUB-01',
          familyId: 'HUB',
          editionId: 'HUB-STANDARD',
          architectureVersion: 'ARCH-HUB-D',
          volumeTier: 100,
          currency: 'EUR',
          lines: ebomLines,
          totals: ebomTotals,
        },
      ],
      volumeScenarios: [],
    },
    mbom: {
      status: 'MANUFACTURING_BOM_NOT_APPROVED',
      currency: 'EUR',
      vatTreatment: 'VAT_EXCLUDED',
      boms: [
        {
          bomId: 'MBOM-HUB-01',
          familyId: 'HUB',
          editionId: 'HUB-STANDARD',
          architectureVersion: 'ARCH-HUB-D',
          volumeTier: 100,
          currency: 'EUR',
          lines: mbomLines,
          totals: mbomTotals,
        },
      ],
      volumeScenarios: [],
    },
    costs,
    conformity,
    qualification,
    nmea,
    compatibility,
    risks,
    decisions,
    governance,
    review,
    evidence,
  };

  const countMap = {
    'hardware-families.json': families.length,
    'architecture-options.json': arch.options.length,
    'component-register.json': components.length,
    'supplier-register.json': suppliers.length,
    'price-observations.json': observations.length,
    'engineering-bom.json': data.ebom.boms.length,
    'manufacturing-bom.json': data.mbom.boms.length,
    'cost-scenarios.json': scenarios.length,
    'conformity-applicability.json': conformity.products.length,
    'qualification-plan.json': qualification.tests.length,
    'nmea-status.json': 0,
    'compatibility-requirements.json': compatibility.rows.length,
    'risks.json': risks.risks.length,
    'decisions.json': decisions.decisions.length,
    'governance-status.json': governance.restrictions.length,
    'review-findings.json': review.findings.length,
    'evidence-index.json': evidence.evidence.length,
  };
  data.manifest = {
    contractId: 'MAREA-MC11-HARDWARE-EVIDENCE-CONTRACT',
    contractVersion: '1.0.0',
    milestone: 'MC-11',
    date: TODAY,
    baseCommit: '0'.repeat(40),
    branch: 'feature/marea-mc11-hardware-sourcing-conformity',
    owner: 'lead',
    files: Object.entries(countMap).map(([path, recordCount]) => ({
      path,
      owner: 'lead',
      purpose: 'fixture',
      recordCount,
    })),
    deliverables: Array.from({ length: 37 }, (_, i) => ({
      id: `D${i + 1}`,
      path: `fixture/D${i + 1}.md`,
      status: 'COMPLETE',
    })),
    provenanceSummary: {
      evidenceIds: evidence.evidence.length,
      claimIds: evidence.evidence.length,
      distinctUrls: evidence.evidence.length,
      retrievedOn: TODAY,
    },
    fixtureExclusion: 'in-memory test fixture only',
  };
  return data;
}

const check = (data, id) => validate(data).checks.find((c) => c.id === id);
const mutated = (mutator) => {
  const fixture = clone(makeFixture());
  mutator(fixture);
  return fixture;
};
const assertFails = (id, mutator, hint) => {
  const fixture = mutated(mutator);
  const result = check(fixture, id);
  assert.ok(result, `${id} exists`);
  assert.equal(result.ok, false, `${id} must fail when ${hint}`);
  assert.ok(result.violations.length > 0, `${id} must report a violation`);
};

/* ------------------------------------------------------------------ tests */

test('the valid fixture passes every check', () => {
  const report = validate(makeFixture());
  const failed = report.checks.filter((c) => !c.ok);
  assert.deepEqual(
    failed.map((c) => `${c.id}: ${c.violations[0]}`),
    [],
    'valid fixture must not produce violations',
  );
  assert.ok(report.ok);
});

test('the validator exposes the 50 mandated rules plus structural checks', () => {
  const report = validate(makeFixture());
  const ids = report.checks.map((c) => c.id);
  for (let i = 1; i <= 50; i += 1) {
    assert.ok(ids.includes(`V${String(i).padStart(2, '0')}`), `V${i} missing`);
  }
  for (const structural of ['S01', 'S02', 'S03', 'S04'])
    assert.ok(ids.includes(structural), `${structural} missing`);
});

test('V01 rejects an unknown product ID', () => {
  assertFails(
    'V01',
    (d) => {
      d.family.families.push({ ...d.family.families[0], familyId: 'HUBX' });
    },
    'an unknown family is added',
  );
});

test('V02 rejects an unknown bundle ID', () => {
  assertFails(
    'V02',
    (d) => {
      d.family.bundles.push({ ...d.family.bundles[0], bundleId: 'GOLD' });
    },
    'an unknown bundle is added',
  );
});

test('V03 rejects missing product coverage', () => {
  assertFails(
    'V03',
    (d) => {
      d.family.families = d.family.families.filter((f) => f.familyId !== 'NAV');
    },
    'a product family is missing',
  );
});

test('V04 rejects missing bundle coverage', () => {
  assertFails(
    'V04',
    (d) => {
      d.family.bundles = d.family.bundles.filter((b) => b.bundleId !== 'FLEET');
    },
    'a bundle is missing',
  );
});

test('V05 rejects duplicate component IDs', () => {
  assertFails(
    'V05',
    (d) => {
      d.components.components.push({ ...d.components.components[0] });
    },
    'a component ID is duplicated',
  );
});

test('V06 rejects one supplier identity presented twice', () => {
  assertFails(
    'V06',
    (d) => {
      d.suppliers.suppliers.push({
        ...d.suppliers.suppliers[0],
        supplierId: 'SUP-example-dist-02',
        legalName: d.suppliers.suppliers[0].legalName,
        tradingName: d.suppliers.suppliers[0].tradingName,
      });
    },
    'a supplier legal name is duplicated under a new id',
  );
});

test('V07 rejects a component claim without datasheet evidence', () => {
  assertFails(
    'V07',
    (d) => {
      d.components.components[0].datasheetUrl = null;
    },
    'a RETRIEVED datasheet has no URL',
  );
});

test('V08 rejects a catalogue price labelled as a formal quotation', () => {
  assertFails(
    'V08',
    (d) => {
      d.prices.observations[0].evidenceClass = 'FORMAL_SUPPLIER_QUOTATION';
    },
    'a catalogue price is labelled as a quotation',
  );
});

test('V09 rejects a quotation claim without provenance', () => {
  assertFails(
    'V09',
    (d) => {
      d.prices.observations[0].quotationRef = 'Q-2026-001';
    },
    'a quotation reference is invented',
  );
});

test('V10 rejects a supplier contact claim', () => {
  assertFails(
    'V10',
    (d) => {
      d.suppliers.suppliers[0].contactStatus = 'CONTACTED';
    },
    'supplier contact is claimed',
  );
});

test('V11 rejects a purchase claim', () => {
  assertFails(
    'V11',
    (d) => {
      d.components.components[0].purchased = true;
    },
    'a purchase is claimed',
  );
});

test('V12 rejects a zero BOM quantity', () => {
  assertFails(
    'V12',
    (d) => {
      d.ebom.boms[0].lines[0].qtyPerUnit = 0;
    },
    'a BOM quantity is zero',
  );
});

test('V13 rejects an incomplete total presented as complete', () => {
  assertFails(
    'V13',
    (d) => {
      d.ebom.boms[0].lines[0].observedUnitPrice = null;
    },
    'an unpriced line remains in a complete BOM',
  );
});

test('V14 rejects a missing currency', () => {
  assertFails(
    'V14',
    (d) => {
      d.prices.observations[0].currency = null;
    },
    'a price observation has no currency',
  );
});

test('V15 rejects a mixed VAT base without normalisation', () => {
  assertFails(
    'V15',
    (d) => {
      d.ebom.boms[0].lines[0].normalizationApplied = false;
    },
    'a VAT-inclusive input is used without normalisation',
  );
});

test('V16 rejects a price-tier mismatch', () => {
  assertFails(
    'V16',
    (d) => {
      d.ebom.boms[0].lines[0].priceQuantityTier = 100;
    },
    'a line claims a quantity tier it was not priced at',
  );
});

test('V17 rejects a missing observation date', () => {
  assertFails(
    'V17',
    (d) => {
      d.prices.observations[0].observedAt = '';
    },
    'an observation has no date',
  );
});

test('V18 rejects an unsupported availability or lead-time claim', () => {
  assertFails(
    'V18',
    (d) => {
      d.prices.observations[0].leadTimeClaim = '4 weeks';
    },
    'a lead time is claimed without evidence',
  );
});

test('V19 rejects an invented MOQ', () => {
  assertFails(
    'V19',
    (d) => {
      d.prices.observations[0].moqObserved = 1000;
    },
    'a MOQ is asserted with no evidence id',
  );
});

test('V20 rejects conversion without rate provenance', () => {
  assertFails(
    'V20',
    (d) => {
      d.prices.observations[0].currency = 'USD';
    },
    'a non-EUR observation is used in a BOM with no FX rate',
  );
});

test('V21 rejects an unknown cost treated as zero', () => {
  assertFails(
    'V21',
    (d) => {
      d.costs.scenarios[0].lines[4].amountEur = 0;
    },
    'an unknown cost is set to zero',
  );
});

test('V22 rejects a complete cost claim without tooling', () => {
  assertFails(
    'V22',
    (d) => {
      Object.assign(d.costs.scenarios[0], {
        totalStatus: 'COMPLETE_TO_EVIDENCE',
        totalEur: 100,
        toolingAmortizationEur: null,
        missingCategories: [],
      });
    },
    'a complete cost claim omits tooling',
  );
});

test('V23 rejects a guaranteed certification price', () => {
  assertFails(
    'V23',
    (d) => {
      d.costs.certificationCosts[0].guaranteed = true;
    },
    'a certification cost is presented as guaranteed',
  );
});

test('V24 rejects an unapproved retail price', () => {
  assertFails(
    'V24',
    (d) => {
      d.family.families[1].retailPriceEur = 499;
    },
    'a retail price is introduced',
  );
});

test('V25 rejects customer demand cited from MC-10', () => {
  assertFails(
    'V25',
    (d) => {
      d.family.families[1].notes = 'MC-10 interviews validated demand for this gateway';
    },
    'MC-10 is cited as demand evidence',
  );
});

test('V26 rejects validated willingness to pay', () => {
  assertFails(
    'V26',
    (d) => {
      d.family.families[1].customerRequirementUncertainty = 'VALIDATED';
    },
    'customer requirement uncertainty is removed',
  );
});

test('V27 rejects TESTED compatibility', () => {
  assertFails(
    'V27',
    (d) => {
      d.compatibility.rows[0].status = 'TESTED';
    },
    'compatibility is marked TESTED without a test record',
  );
});

test('V28 rejects SUPPORTED compatibility', () => {
  assertFails(
    'V28',
    (d) => {
      d.compatibility.rows[0].status = 'SUPPORTED';
    },
    'compatibility is marked SUPPORTED without authorisation',
  );
});

test('V29 rejects an NMEA certification claim', () => {
  assertFails(
    'V29',
    (d) => {
      d.nmea.nmea2000.productCertification = 'CERTIFIED';
    },
    'NMEA certification is claimed',
  );
});

test('V30 rejects CE marking claimed from component compliance', () => {
  assertFails(
    'V30',
    (d) => {
      d.family.families[1].ceMarked = true;
    },
    'CE marking is claimed',
  );
});

test('V31 rejects applicable legislation without rationale', () => {
  assertFails(
    'V31',
    (d) => {
      d.conformity.products[0].applicable[0].rationale = '';
    },
    'an applicable directive has no scope rationale',
  );
});

test('V32 rejects inapplicable legislation without evaluation', () => {
  assertFails(
    'V32',
    (d) => {
      d.conformity.products[0].notApplicable[0].rationale = 'out of scope';
    },
    'a non-applicability has no written evaluation',
  );
});

test('V33 rejects a regulatory deadline without a source', () => {
  assertFails(
    'V33',
    (d) => {
      d.conformity.legislationRegister[0].keyDeadlines[0].evidenceId = 'EVD-MC11-999';
    },
    'a deadline cites a non-existent source',
  );
});

test('V34 rejects compliance claimed from an unexecuted test plan', () => {
  assertFails(
    'V34',
    (d) => {
      d.qualification.tests[0].status = 'PASSED';
    },
    'an unexecuted test is marked passed',
  );
});

test('V35 rejects an environmental rating without tests', () => {
  assertFails(
    'V35',
    (d) => {
      d.family.families[1].ipRating = 'IP67';
    },
    'an IP rating is claimed',
  );
});

test('V36 rejects guaranteed WATCH alert delivery', () => {
  assertFails(
    'V36',
    (d) => {
      d.family.families[6].notes = 'guaranteed alert delivery within 60 seconds';
    },
    'alert delivery is guaranteed',
  );
});

test('V37 rejects weakening the PILOT safety gate', () => {
  assertFails(
    'V37',
    (d) => {
      d.governance.invariants.PILOT_SAFETY_GATE = 'OPEN';
    },
    'the PILOT safety gate is opened',
  );
});

test('V38 rejects AIS transmit capability', () => {
  assertFails(
    'V38',
    (d) => {
      d.family.families[2].aisTransmit = true;
    },
    'AIS transmission is added',
  );
});

test('V39 rejects FLEET default hardware', () => {
  assertFails(
    'V39',
    (d) => {
      d.family.bundles.find((b) => b.bundleId === 'FLEET').hardwareIncludedByDefault = true;
    },
    'FLEET gains default hardware',
  );
});

test('V40 rejects a fixed turnkey price for SAIL or COMPLETE', () => {
  assertFails(
    'V40',
    (d) => {
      d.family.bundles.find((b) => b.bundleId === 'SAIL').fixedTurnkeyPrice = true;
    },
    'a fixed turnkey price is invented',
  );
});

test('V41 rejects falsely cleared OPEN-MARINE IP', () => {
  assertFails(
    'V41',
    (d) => {
      d.governance.invariants.SOURCE_IP_CLEARANCE = 'CLEARED';
    },
    'source IP is declared cleared',
  );
});

test('V42 rejects falsely cleared trademark', () => {
  assertFails(
    'V42',
    (d) => {
      d.governance.invariants.TRADEMARK_LEGAL_CLEARANCE = 'GRANTED';
    },
    'trademark clearance is claimed',
  );
});

test('V43 rejects a for-sale status', () => {
  assertFails(
    'V43',
    (d) => {
      d.family.families[1].status = 'FOR_SALE';
    },
    'a family is marked for sale',
  );
});

test('V44 rejects an unauthorised publication change', () => {
  assertFails(
    'V44',
    (d) => {
      d.governance.invariants.PUBLICATION_CHANGE = 'AUTHORIZED';
    },
    'publication change is authorised',
  );
});

test('V45 rejects an authorised production gate', () => {
  assertFails(
    'V45',
    (d) => {
      d.decisions.gates[0].authorized = true;
    },
    'a gate is authorised',
  );
});

test('V46 rejects an assumption presented as an observation', () => {
  assertFails(
    'V46',
    (d) => {
      d.ebom.boms[0].lines[0].priceEvidenceClass = 'ENGINEERING_ASSUMPTION';
      d.ebom.boms[0].lines[0].engineeringConfidence = 'PUBLIC_PRICE_OBSERVED';
    },
    'an estimate is labelled an observation',
  );
});

test('V47 rejects totals inconsistent with quantities', () => {
  assertFails(
    'V47',
    (d) => {
      d.ebom.boms[0].totals.knownLinesEur += 100;
    },
    'the declared total does not match the lines',
  );
});

test('V48 rejects a critical single-source component without a sourcing risk', () => {
  assertFails(
    'V48',
    (d) => {
      d.risks.risks = d.risks.risks.map((risk) => ({ ...risk, affectedComponentIds: [] }));
    },
    'the single-source risk entry is removed',
  );
});

test('V49 rejects a frozen architecture recommendation', () => {
  assertFails(
    'V49',
    (d) => {
      d.arch.options[0].status = 'APPROVED';
    },
    'an architecture is presented as approved',
  );
});

test('V50 rejects formal procurement declared complete', () => {
  assertFails(
    'V50',
    (d) => {
      d.governance.milestoneState.formalProcurementEvidence = 'OBTAINED';
    },
    'procurement is declared complete with zero suppliers contacted',
  );
});

test('S01 rejects an unresolved evidence reference', () => {
  assertFails(
    'S01',
    (d) => {
      d.components.components[0].evidenceIds.push('EVD-MC11-777');
    },
    'an evidence reference does not resolve',
  );
});

test('S02 rejects an unknown edition and an unresolved cross-reference', () => {
  assertFails(
    'S02',
    (d) => {
      d.family.families[1].editions.push('HUB-ULTRA');
    },
    'an invented edition is used',
  );
  assertFails(
    'S02',
    (d) => {
      d.ebom.boms[0].lines[0].priceObservationId = 'PO-PROC-999';
    },
    'a BOM line references a missing price observation',
  );
});

test('S03 rejects an inaccurate manifest record count', () => {
  assertFails(
    'S03',
    (d) => {
      d.manifest.files[0].recordCount += 5;
    },
    'the manifest record count is wrong',
  );
});

test('S04 rejects altered scoring weights', () => {
  assertFails(
    'S04',
    (d) => {
      d.arch.criteriaWeights.technicalFeasibility = 40;
    },
    'a frozen scoring weight is changed',
  );
});

test('valid blocked and unknown states are accepted, not penalised', () => {
  const fixture = mutated((d) => {
    d.components.components[2].temperatureRange = 'UNKNOWN';
    d.components.components[2].datasheetStatus = 'NOT_FOUND';
    d.prices.observations[1].observedUnitPrice = null;
    d.costs.scenarios.forEach((scenario) => {
      scenario.lines.forEach((line) => {
        if (line.categoryId === 'COST-05') line.amountEur = null;
      });
    });
    d.review.verdict = 'PARTIAL';
    d.review.notVerified = ['no supplier quotation exists'];
  });
  const report = validate(fixture);
  const failed = report.checks.filter((c) => !c.ok);
  assert.deepEqual(
    failed.map((c) => `${c.id}: ${c.violations[0]}`),
    [],
    'honest unknown/blocked states must not be treated as failures',
  );
});

test('the validator does not mutate the data it validates', () => {
  const fixture = makeFixture();
  const before = JSON.stringify(fixture);
  validate(fixture);
  assert.equal(JSON.stringify(fixture), before);
});
