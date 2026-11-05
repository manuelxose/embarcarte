# MC-25 readiness engine

**Module:** `src/app/marea-catalog/governance/sku-readiness.ts`
**Version:** `mc25-readiness/1.0.0`
**Pure:** no clock, no randomness, no I/O, no Angular, no network.
**Fact source:** one deep-frozen snapshot (`governance-facts.ts`) built from the
generated projection.

## 1. The ten prerequisites

Every decision evaluates all ten, in this order, and returns an explicit result
for each.

| # | Prerequisite | Contract read | Pass condition today | Current result |
| --- | --- | --- | --- | --- |
| 1 | `CANONICAL_IDENTITY` | `product-editions.json`, `sku-candidates.json` | edition resolves to family + candidate | **PASSED** (26/26) |
| 2 | `LIFECYCLE_APPROVED` | `product-editions.json` | `lifecycleState = COMMERCIALLY_AVAILABLE` **and** availability `COMMERCIALLY_AVAILABLE` **and** `merchantable = true` | FAILED |
| 3 | `PRICE_APPROVED` | `price-governance.json` | `priceApproved` + `priceStatus = APPROVED` + ≥1 approved price record | FAILED (0 records) |
| 4 | `INVENTORY_VERIFIED` | `inventory-governance.json` | verified MAREA stock exists, is available for sale, quantity > 0 | FAILED (0 rows) |
| 5 | `COMPLIANCE_VERIFIED` | `readiness-dimensions.json` | `complianceStatus = CONFORMITY_EVIDENCE_ON_FILE` | FAILED |
| 6 | `LICENSING_IP_CLEARED` | `readiness-dimensions.json` | `licensingStatus = CLEARED` **and** `dataRightsStatus = GRANTED_PER_TERRITORY` | FAILED |
| 7 | `SAFETY_APPROVED` | `readiness-dimensions.json`, `blocker-register.json` | `safetyStatus = SAFETY_APPROVED`; PILOT editions additionally require `GATE-SAFETY-PILOT` closed | FAILED |
| 8 | `HARDWARE_CERTIFIED` | `readiness-dimensions.json` | `hardwareStatus = CERTIFIED`, or a contract-permitted software N/A | NOT_APPLICABLE (software only) |
| 9 | `MC02_BLOCKERS_RESOLVED` | `blocker-register.json` | every referenced gate has `open = false` | FAILED (12 open for NAV) |
| 10 | `RELEASE_AUTHORIZED` | `publication-eligibility.json`, `blocker-register.json` | `publicationAuthorized = true` and deployment `AUTHORIZED` | FAILED |

The ready values are read from the contract's `readiness-dimensions.json`
(`readyValue`), not authored in the engine. Failure codes prefer the contract's
`failureCode`; the two that the contract does not enumerate
(`LIFECYCLE_NOT_COMMERCIALLY_AVAILABLE`, `STOCK_NOT_VERIFIED`,
`RELEASE_GATES_OPEN`, `PUBLICATION_NOT_AUTHORIZED`,
`CANONICAL_IDENTITY_INVALID`) are declared in the engine and documented here.

## 2. NOT_APPLICABLE is not approval

`HARDWARE_CERTIFIED` is the only prerequisite the contract marks not applicable,
and only when **both** hold:

1. `editionType` matches `^SOFTWARE_`, and
2. `hardwareStatus` is exactly `NOT_APPLICABLE_SOFTWARE_PRODUCT`.

The result is `NOT_APPLICABLE`, never `PASSED`. `combinePrerequisites` treats it
as satisfied only through the `permittedNotApplicable` flag. A non-permitted N/A
is reported as missing. Tests `r6` (unit) and `MC25-07` (validator) prove both
directions: an explicitly permitted N/A satisfies the prerequisite; an
unpermitted one blocks and is listed.

## 3. Combination rule

```
missing = prerequisites.filter(p => !(p.status === 'PASSED' ||
                                      (p.status === 'NOT_APPLICABLE' && p.permittedNotApplicable)))
orderable = all ten present && missing.length === 0
```

`combinePrerequisites` is a pure combinator exported for the logic tests. It
cannot be used to forge a real decision: `evaluateSkuReadiness(editionId)` takes
**one** argument (asserted by `evaluateSkuReadiness.length === 1`) and always
reads the module-private frozen snapshot. There is no facts-injection parameter.

## 4. Decision record (traceability)

Every `ReadinessDecision` carries:

- `subject`: identity kind, family, edition, candidate SKU, merchant SKU (always
  `null`);
- `contractRefs`: the contract paths the evaluation read;
- `prerequisites[10]`: status, failure code, detail, contract ref, MC-02 blocker
  ids, required evidence ids, N/A permission;
- `missingPrerequisites`;
- `mc02BlockerIds`: deduplicated, sorted;
- `refusalReasons`: code + prerequisite + detail + blockers;
- `commercialOrderability` (`NOT_ORDERABLE` today) and `orderable` (false);
- `evaluationVersion` and `evidenceFingerprint` (FNV-1a over the canonical
  decision, deterministic, non-cryptographic; explicitly not a security hash).

For `NAV-ESSENTIAL` the fingerprint is `fb2dd4a4`, asserted as a golden value by
the adversarial suite so an unintended change to any refusal reason is a test
failure, not a silent drift.

## 5. Results at this fact base

| Object | Count | Orderable |
| --- | --- | --- |
| Canonical editions | 26 | **0** |
| Candidate commercial SKUs | 26 | **0** |
| Bundles | 6 | **0** |
| Families | 9 | **0** |

`bundleReadinessMatrix()` additionally refuses every bundle whose included
edition is not orderable and every bundle held by the MC-08 PILOT safety gate.
`assertNotOrderable` throws if any decision ever claims orderability, so a
programming error becomes a test failure rather than a commercial leak.

## 6. What the engine cannot do

- It cannot mint a merchant SKU code (empty frozen registry).
- It cannot read a price, a stock quantity or a publication flag from anywhere
  except the frozen contract snapshot.
- It cannot return `ORDERABLE` for any real catalogue object today; the validator
  evaluates all 26 editions twice and compares fingerprints.
- It does not decide *whether* an order can be placed. MC-26 owns checkout; this
  engine only decides commercial readiness, and today the answer is "no" for
  every object with a named reason.
