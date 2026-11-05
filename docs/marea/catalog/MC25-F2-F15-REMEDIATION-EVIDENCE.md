# MC-25 F-2 and F-15 remediation evidence

Both findings were inherited from MC-23 and explicitly assigned to MC-25 by the
MC-24 handoff (`MC24-MC25-HANDOFF.md` §2.2) and register
(`MC24-RISK-AND-INHERITED-DEBT-REGISTER.md` §2).

## 1. F-2 — upgrade-path relationship integrity

### 1.1 Reproduction at the recorded revision

Command:

```text
git show 8a4b5e0:src/app/marea-catalog/data/bundle-upgrade-paths.ts
```

The inherited file contains `upgradePathById`, `upgradePaths(fromBundleId)` and
`isSupportedUpgradePath` only. There is **no** validation of the relationship
between a path's source bundle, target bundle/edition, the editions it claims to
add, their families and the target bundle's inclusion lines. `upgradePathById`
returns a record by id, and `upgradePaths(from)` filters on `fromBundleId`;
nothing checks whether an "addition" exists, belongs to the right family, is
listed by the target, or is already included in the source.

Automated proof: validator `MC25-14` reads the file at `8a4b5e0` through the
in-process git reader and asserts the absence of `validateUpgradePath` /
`UpgradePathIntegrity` and the presence of the inherited
`inclusionFor(bundleId: string, editionId: string): BundleInclusion | undefined`
signature. Unit test `f2-8` shows the current model rejects malformed input that
the inherited code would have returned as a record.

### 1.2 Defect mechanics

An upgrade path is prose plus edition tokens. The inherited code never resolved
those tokens, so all of the following would have been presented as a valid
upgrade:

1. an addition naming a **nonexistent edition**;
2. an addition belonging to **another family** than the line that lists it;
3. an addition the **target bundle does not include**;
4. an addition that is **already included in the source** (retained, not added);
5. a path whose **target is its own source**;
6. a path whose **target cannot be resolved** to a canonical bundle or edition;
7. a path whose **source bundle is not canonical**.

### 1.3 Repair

`validateUpgradePath(path)` validates the complete canonical relationship:

```
path text ── "A to B" ──► target: BUNDLE | EDITION | NONE  (must resolve)
fromBundleId ──► must be a canonical bundle
each adds token ──► edition id? ── yes ──► family of edition == family of target line
                                     │        target line inclusion ∈ addable set
                                     │        edition not already INCLUDED in source
                                     └─ no  ──► identifier-shaped → ADDED_EDITION_NOT_FOUND
                                                prose → TEXTUAL (never verified)
```

Addable inclusions are `INCLUDED`, `OPTIONAL`, `CONDITIONAL`,
`QUOTATION_REQUIRED`, `REQUIRED_EXTERNAL`; `NOT_INCLUDED` and `INELIGIBLE` are
refused. Prose entries such as "customer records and exports" cannot be resolved
and are reported in `textualAdditions`, never counted as verified.

`upgradePathIntegrity(id)` returns `UNKNOWN_PATH` for an unknown id;
`allUpgradePathIntegrity()` validates all 15 contract paths.

### 1.4 Verification

| Assertion | Value |
| --- | --- |
| Contract upgrade paths | 15 |
| Valid paths after repair | **15 / 15** (legitimate paths preserved) |
| Verified edition relationships | 37 |
| Textual (unverified) additions | 7 |
| Fabricated shapes rejected | 6 (nonexistent edition, wrong family, not in target, already in source, self-target, unresolved target/unknown source) |
| Malformed inputs rejected | `null`, number, string, array, missing fields, non-string `adds` |

Unit tests: `f2-1` … `f2-9`. Validator: `MC25-14`.

## 2. F-15 — nonexistent edition behaviour

### 2.1 Reproduction at the recorded revision

Inherited line (verbatim at `8a4b5e0`):

```ts
export function inclusionFor(bundleId: string, editionId: string): BundleInclusion | undefined {
  const bundle = bundleRecord(bundleId);
  if (!bundle) return undefined;
  const match = bundle.lines.find((entry) => entry.editionId === editionId);
  return match ? match.inclusion : 'NOT_INCLUDED';
}
```

An edition id that does not exist returned `NOT_INCLUDED`, indistinguishable from
a known edition legitimately excluded from the bundle. The inherited MC-23 test
encoded the defect as an expectation
(`inclusionFor('START','NOT_AN_EDITION') === 'NOT_INCLUDED'`), and MC-24
validator `MC24-13` only asserted that it was still reproducible.

### 2.2 Repair

`inclusionFor` now returns a discriminated union:

```ts
type InclusionLookup =
  | { kind: 'INCLUDED_LINE'; bundleId; editionId; lineId; familyId; inclusion }
  | { kind: 'NOT_INCLUDED';  bundleId; editionId }
  | { kind: 'UNKNOWN_EDITION'; editionId }
  | { kind: 'UNKNOWN_BUNDLE';  bundleId };
```

`inclusionValue()` keeps a simple nullable accessor for callers that only need
the value. `evaluateEligibility` now distinguishes the cases: an unknown edition
produces `NOT_ELIGIBLE`-class refusal with reason `UNKNOWN_EDITION:<id>`, while a
known excluded edition keeps its ordinary exclusion reason. An unknown edition can
no longer be read as "the bundle simply does not include it".

### 2.3 Verification

| Case | Result |
| --- | --- |
| Unknown edition `NOT-AN-EDITION` | `UNKNOWN_EDITION` |
| Known edition absent from the bundle (`FLEET-START` in `START`) | `NOT_INCLUDED` |
| Unknown bundle | `UNKNOWN_BUNDLE` |
| Included line | `INCLUDED_LINE` with line id, family and inclusion |
| Unknown edition in `evaluateEligibility` | `UNKNOWN_EDITION:NOT-AN-EDITION` reason, permissive outcome impossible |
| Known absent edition in `evaluateEligibility` | no `UNKNOWN_EDITION` reason |

Unit tests: `f15-1` … `f15-6`. Validator: `MC25-15`.

### 2.4 Changed inherited expectation

`scripts/check-mc23-bundles.test.mjs` previously asserted the defect. MC-25
replaces that assertion with the typed behaviour and documents the change here
and in the MC-25 risk register. This is a correction of a wrong expectation, not
a relaxed gate: the new assertion is stricter (three distinct states instead of
one value).

## 3. Residual risk

Both findings are closed with reproduced defects, repaired code and
positive/negative/adversarial tests. Residual risk is limited to prose upgrade
entries that cannot be structurally validated; they are surfaced as
`textualAdditions` and are never presented as verified relationships. That
limitation is recorded as `RES-MC25-01`.
