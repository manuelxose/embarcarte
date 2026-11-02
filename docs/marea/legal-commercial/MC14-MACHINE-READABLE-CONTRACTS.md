# MC-14 — Machine-readable contracts and data contract

| Field | Value |
|---|---|
| Deliverable | D19 `MC14-MACHINE-READABLE-CONTRACTS.md` |
| Milestone | MC-14/36 |
| Date | 2026-11-02 |
| Owner | Programme Lead |
| Location | `docs/marea/legal-commercial/data/` |
| Validator | `scripts/check-marea-legal-commercial.mjs` |
| Unit/adversarial suite | `scripts/check-marea-legal-commercial.test.mjs` |

## 1. Purpose

This document is the data contract for the MC-14 machine-readable governance
layer. It defines identifiers, file responsibilities, required fields,
cross-reference rules and validation semantics. Every document in the MC-14
package is rendered from, or traceable to, these datasets; the validator treats
them as the source of truth.

The data is internal governance evidence. It is not a certificate, a legal
opinion or an approval to sell.

## 2. Conventions

- **Encoding:** UTF-8 JSON; no comments.
- **Identifiers:** stable, never reused. Prefixes: `SRC-` legal sources,
  `REQ-` requirements, `LEG/PRD/IPR/DATA/CONS/PRIV/CYB/PAY/LIA/CLM/OPS-` risks,
  `CLM-` claims, `WEB-` website findings, `GATE-` release gates, `DOC-` release
  documents, `DEC-MC14-` external decisions, `LR-MC14-` licensing rights,
  `MC14-DEP-` financial dependencies, `SCN-` supply scenarios.
- **Dates:** ISO `YYYY-MM-DD`. `NOT_RETRIEVED` and `NOT_APPLICABLE` are explicit
  values, never substitutes for a date that was not verified.
- **Unknowns:** `null`, `UNKNOWN`, `NOT_ASSESSED` or `UNDETERMINED`; they are
  never converted to zero, false or an empty string in derivation.
- **Enums:** each file declares its vocabularies; consumers must not invent new
  status values without updating this contract and the validator.

## 3. File inventory and required fields

### 3.1 `manifest.json`
Package inventory and frozen status. Fields: `contractId`, `contractVersion`,
`milestone`, `date`, `owner`, `branch`, `baseCommit`, `baseBranch`, `status`,
`files`, `dataFiles`, `researchFiles`, `evidenceCounts`, `frozenFlags`,
`statusBlock`, `review`, `commands`, `note`.

### 3.2 `legal-sources.json`
`sources[]`: `sourceId`, `instrument`, `shortRef`, `celexOrBoer`,
`officialUrl`, `jurisdiction`, `publicationDate`, `effectiveDate`,
`applicationDate`, `transpositionStatus`, `retrievedOn`, `verificationStatus`,
`provisions[]`, `obligationSummary`, `economicOperatorRoles[]`, `uncertainty`,
`reviewOwner`.
`requirements[]`: `requirementId`, `legalSourceIds[]`, `articleOrProvision`,
`obligation`, `jurisdiction`, `productFamilyIds[]`, `economicOperatorRoles[]`,
`evidenceRequired[]`, `complianceStatus`, `uncertainty`, `reviewOwner`,
`releaseGate`, `riskIds[]`.

Rule: every requirement cites at least one existing source with a
`retrievedOn`; a requirement may not claim `COMPLIANT_VERIFIED` without
evidence.

### 3.3 `regulatory-applicability.json`
`instruments[]`, `productFamilies[]` with `assessments[]` (14 per family) and
`summary`; `bundleAssessments[]` with 14 assessments per bundle.
Assessment fields: `instrumentId`, `status`, `rationale`, `legalSourceIds[]`,
`requirementIds[]`, `condition`, `evidenceRequired[]`.
Statuses: `APPLICABLE`, `CONDITIONALLY_APPLICABLE`,
`NOT_APPLICABLE_WITH_REASON`, `UNDETERMINED`.
Rules: `NOT_APPLICABLE_WITH_REASON` requires a rationale naming the legal
reason; `CONDITIONALLY_APPLICABLE` requires the condition; every family has
exactly one assessment per instrument.

### 3.4 `economic-operator-roles.json`
`roleDefinitions[]` (11 roles) and `scenarios[]` (9 supply models). Fields
per role: `roleId`, `label`, `definition`, `potentialObligations[]`,
`evidenceRequired[]`, `contractNeeded[]`, `traceabilityDuties`,
`marketSurveillanceDuties`, `warrantyLiability`, `releaseRestrictions[]`,
`accountableRole`, `qualifiedCounselReview`. Scenarios add `likelyRoles[]`,
`supplierModel`, obligations/evidence/contracts and release restrictions.

Rule: a role is potential only; no scenario asserts that EMBARCARTE already
holds a legal role.

### 3.5 `risk-register.json`
`risks[]`: `riskId`, `riskTitle`, `domain`, `description`, `jurisdiction`,
`legalSourceIds[]`, `productFamilyIds[]`, `skuIds[]`, `bundleIds[]`,
`economicOperatorRoles[]`, `severity`, `likelihoodStatus`, `currentStatus`,
`complianceStatus`, `commercialImpact`, `financialDependencyIds[]`,
`predecessorBlockerIds[]`, `ownerRole`, `requiredEvidence[]`, `releaseGate`,
`customerClaimImpact`, `potentialRemediation`, `requiresQualifiedCounsel`,
`authorizationRequired`, `dateVerified`, `reviewDue`, `decisionId`.

Rules: every risk has a non-empty owner, evidence list, gate, source set and
decision; no numeric probability; legal obligations never have a null owner;
no risk may be `CLOSED_VERIFIED` without evidence (MC-14 closes none).

### 3.6 `predecessor-blocker-mapping.json`
`mappings[]`: `inheritedId`, `register`, `severity`, `inheritedStatus`,
`mc14RiskIds[]`, `treatment`, `doubleCounted`. Summary must record 58 MC-02,
39 MC-11, 23 MC-12 and 14 MC-13 records, 0 closed, 0 deleted.
`mc13HandoffConsumption[]`: all ten `MC14-DEP-*` dependencies with
`consumedIn[]`.

### 3.7 `consumer-rights.json`
`keyFacts`, `b2cVsB2b`, `obligations[]` (16), `templates[]` (8), `unknowns[]`.
Each obligation: `obligationId`, `topic`, `legalSourceIds[]`, `provision`,
`b2cApplicability`, `b2bApplicability`, `obligation`, `evidenceRequired[]`,
`complianceStatus`, `riskIds[]`.
Rule: no template may be marked approved; mandatory rights may not be replaced
by a commercial warranty.

### 3.8 `privacy-obligations.json`
`roles[]`, `processingPurposes[]` (14), `rightsImplementation[]`,
`dpiaScreening`, `securityAndBreach`, `internationalTransfers`,
`fleetTenancy`, `unknowns[]`. Each purpose: `purposeId`, `purpose`,
`dataCategories[]`, `dataSubjects[]`, `potentialLegalBasis`,
`controllerProcessorStatus`, `retentionRequirement`,
`recipientsSubprocessors[]`, `internationalTransferRisk`,
`securityControls[]`, `deletionExport`, `dpiaScreening`, `evidenceStatus`,
`riskIds[]`.
Rule: `dpiaScreening.screeningPerformed = false` must stay until a real DPIA
exists.

### 3.9 `cybersecurity-obligations.json`
`keyDates`, `productClassification[]` (9), `essentialRequirements[]` (14),
`lifecycleControls[]` (12), `inheritedDeviceRequirements`,
`reportingAndConformity`, `costStatus`, `unknowns[]`, `claimsProhibited[]`.
Rule: no requirement may be marked met without evidence; support period is
`OPEN`; cost is `UNKNOWN`.

### 3.10 `licensing-rights.json`
`rights[]` (17): `rightId`, `area`, `rightRequired`, `rightsHolder`,
`productFamilyIds[]`, `intendedCommercialUse`, `cacheRights`, `offlineRights`,
`redistributionRights`, `displayRights`, `attribution`, `territory`,
`dataFreshness`, `contractStatus`, `proofOfPermission`, `rightsStatus`,
`blockerIds[]`, `riskIds[]`, `predecessorRightIds[]`.
Rule: `rightsGranted = 0`; public access is never proof of a right.

### 3.11 `liability-insurance.json`
`insuranceStatus`, `insuranceRequirementsPackage`, `liabilityScenarios[]` (13),
`insuranceCoverageMatrix[]`, `residualRiskStatement`, `unknowns[]`.
Each scenario: `scenarioId`, `scenario`, `legalResponsibility`,
`exposedEconomicOperator[]`, `productFamilyIds[]`, `claimSeverity`,
`controlRequirements[]`, `evidenceRequired[]`,
`potentialContractProvisions[]`, `insuranceCoverageCategory`,
`residualRisk`, `releaseGate`, `riskIds[]`.
Rule: premium, limits and exclusions remain `UNKNOWN`; no policy is assumed.

### 3.12 `claims-policy.json`
`claimClasses[]`, `publicationStatusVocabulary`, `audienceVocabulary`,
`channels[]`, `mandatoryProhibitedClaimCategories[]` (30), `approvalWorkflow[]`,
`evidenceRules[]`, `brandState`, `internalVsPublic`, `enforcement`, `summary`.
Rule: `MAREA_PUBLIC_USE = NO_GO` and `publicationAuthorization = NONE` must
hold; the inherited MC-03 conflict is recorded, not silently overridden.

### 3.13 `bilingual-claims.json`
`claims[]`: `claimId`, `productFamilyId`, `editionId`, `bundleId`, `channel`,
`claimClass`, `publicationStatus`, `audience`, `riskIds[]`,
`legalSourceIds[]`, `evidenceRequired[]`, `evidencePresent[]`, `approverRole`,
`releaseGate`, `lastReviewed`, `pairs` (`es`, `en`), `semanticChecks`.
Rules: pairs must exist in both locales; class/status are single-valued at claim
level; numbers extracted from both texts must match; a `P`/`X` claim may not be
`PUBLIC_AUTHORIZED`; a `C` claim with empty `evidencePresent` may not be
`PUBLIC_AUTHORIZED`.

### 3.14 `website-findings.json`
`findings[]`: `findingId`, `route`, `locale`, `category`, `severity`, `file`,
`lineStart`, `lineEnd`, `observedText`, `whyRisk`, `legalSourceIds[]`,
`riskIds[]`, `suggestedRemediation`, `publicChangeAuthorized`, `status`,
`discoveredOn`. `readOnly = true`, `websiteModified = false`.
Rule: every finding is `NOT_REMEDIATED`; `publicChangeAuthorized` is false.

### 3.15 `release-evidence-gates.json`
`gates[]` and `documents[]` with `status`; summary counts.
Rule: no document may be `EXECUTED`, `SIGNED`, `CERTIFIED` or `APPROVED`;
no gate may be `CLOSED_VERIFIED` without evidence.

### 3.16 `external-decisions.json`
`decisions[]`: `decisionId`, `title`, `question`, `options[]`,
`recommendation`, `blockingRiskIds[]`, `predecessorDecisionIds[]`,
`legalSourceIds[]`, `requiredAuthority`, `ownerRole`, `dueDate`,
`evidenceToClose[]`, `requiresQualifiedCounsel`, `status`.
Rule: agent decisions are not `CLOSED`; only external evidence closes them.

### 3.17 `mc15-handoff-inputs.json`
Vocabulary, restrictions, page issues, evidence requirements and
`MC15_STARTED = false`. Rule: handoff only; no MC-15 execution and no website
change.

### 3.18 `review-findings.json`
Independent audit record: `verdict`, `findings[]` with classification,
evidence, correction commit, re-verification and `finalRecordCommit`.

## 4. Cross-reference rules

1. Every `*Ids` reference resolves to an existing record in its target file.
2. Product and bundle identifiers are exactly the canonical nine and six.
3. Financial dependency identifiers are `MC14-DEP-01`…`MC14-DEP-10`.
4. Release gates referenced by risks, requirements and documents exist.
5. External decisions referenced by risks exist.
6. Predecessor IDs map to MC-02/MC-11/MC-12/MC-13 and never disappear.
7. Source identifiers referenced anywhere exist in `legal-sources.json`.
8. No file is derived from a file with unknown/null values without preserving
   the unknown.

## 5. Validation semantics

The validator is deterministic and read-only. It reads all files, recomputes
counts, checks enums, cross-references, bilingual parity, prohibited claims,
frozen restrictions, predecessor mapping and review status. It prints one line
per check and exits non-zero if any check fails. It does not modify data, does
not contact any network service and does not replace human legal review.

Machine-verifiable conditions include: file presence, schema fields, enum
membership, reference resolution, counts, forbidden public statuses, frozen
flags, absence of fabricated evidence. Contextual legal questions (is a claim
misleading? is a product in CRA scope?) require human review and are marked as
such in D20.

## 6. Change control

- Identifiers are append-only. A correction changes content, not identity.
- Any schema change updates this document, the validator and the tests in the
  same commit.
- Predecessor data is read-only: mapping corrections belong to MC-14, never to
  the predecessor files.
- The manifest is regenerated only by an explicit record operation and records
  the frozen candidate commit and the final record commit.
