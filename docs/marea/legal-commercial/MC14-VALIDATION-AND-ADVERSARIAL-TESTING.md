# MC-14 — Validation and adversarial testing

| Field | Value |
|---|---|
| Deliverable | D20 `MC14-VALIDATION-AND-ADVERSARIAL-TESTING.md` |
| Milestone | MC-14/36 |
| Date | 2026-11-02 |
| Owner | Programme Lead |
| Validator | `scripts/check-marea-legal-commercial.mjs` |
| Adversarial suite | `scripts/check-marea-legal-commercial.test.mjs` |
| Commands | `npm run test:legal-commercial` (54 checks); `npm run test:legal-commercial:unit` (41 tests) |

## 1. What is validated

The validator reads every MC-14 dataset and runs deterministic, dependency-free
checks. It verifies machine-checkable conditions only:

1. All required machine-readable files exist and parse.
2. All required documents exist (the review, Spanish report and delivery record
   are record-commit artefacts and are required once the review is recorded).
3. Exactly nine canonical product families.
4. Exactly six canonical bundles.
5. Every source identifier reference resolves.
6. Every legal requirement cites a source with a retrieval date.
7. Every risk has an accountable owner role.
8. Every blocking/critical risk enumerates required evidence.
9. Every product has all 14 applicability assessments.
10. Every `NOT_APPLICABLE_WITH_REASON` carries a cited legal rationale.
11. Every `CONDITIONALLY_APPLICABLE` states its condition.
12. Applicability enums and bundle coverage are valid.
13. Every claim has a valid class and publication status.
14. No P/X claim is authorised or conditional-public.
15. Bilingual claim pairs exist and numeric tokens match.
16. No claim is `PUBLIC_AUTHORIZED` without evidence.
17. Publication authorization remains `NONE` and no claim is authorised.
18. All frozen hard restrictions keep their exact values.
19. Trademark clearance remains `NOT_GRANTED` and public use `NO_GO`.
20. Source IP remains `NOT_CLEARED` and no licence is invented.
21. No document/gate is certified, signed, approved or closed; no chart/weather/
    NMEA right is invented.
22. PILOT remains safety-blocked and unadvertised.
23. AIS remains receive-only.
24. FLEET has no default hardware.
25. No price claim is authorised while `PRICE_APPROVED = NONE`.
26. No financial/profitability claim is authorised.
27. No insurance policy, premium or coverage is assumed.
28. Consumer rights are not replaced by discretionary warranty terms.
29. Unknown amounts remain unknown in the MC-13 handoff consumption.
30. All ten MC-13 handoff dependencies are consumed.
31. All MC-02 L/D/H/X blockers are mapped (9/10/13/7).
32. All inherited registers are mapped: 58/39/23/14, 0 closed, 0 deleted.
33. The inherited brand-claims conflict is documented with the stricter rule.
34. Predecessor verdicts are preserved.
35. Website remains unmodified and MC-15 has not started.
36. Every website finding cites an existing file and line range.
37. Every risk references an existing decision and gate.
38. Risk enums and product/bundle/SKU references are valid.
39. No risk is closed by MC-14.
40. Legal requirements have owners and non-certified statuses.
41. No claim is approved for public publication.
42. Conditional claims without evidence are not conditional-public.
43. Claim risk/source references resolve.
44. Economic-operator role references resolve.
45. Liability and licensing risk references resolve.
46. Legal research dossier and 13-column source CSV are present and well formed.
47. No external contact, quotation or contract is recorded.
48. Manifest evidence counts match the datasets.
49. No external decision is falsely closed.
50. Independent-review status matches the recorded evidence.
51. The data contract documents every dataset.
52. Public authorization cannot coexist with trademark `NO_GO`.
53. Privacy DPIA/DPA/security controls are not falsely asserted.
54. Legal source dates are valid ISO dates or explicit unknown markers.

## 2. Adversarial suite

The unit suite mutates a deep copy of the datasets and asserts that each
mutation fails the intended control (not an unrelated schema error). It contains
41 tests: one positive control plus 40 negative controls covering the mandated
cases:

- invented CE certification, invented NMEA 2000 certification;
- PILOT safety approval, AIS transmission offer;
- unlicensed chart inclusion, unlicensed weather redistribution;
- trademark registration claim, commercial availability claim;
- approved price without approval, fabricated customer count, fabricated
  insurance, unverified offshore alert guarantee;
- warranty restriction inconsistent with law, withdrawal-right suppression;
- data-protection compliance asserted without DPIA/DPA evidence;
- CRA certification claim without evidence, unsupported distributor conformity;
- wrong legal effective date, outdated/repealed instrument removal;
- missing economic-operator role, risk closed without evidence, unowned legal
  blocker;
- A-class claim conflicting with public-brand NO-GO, contradictory ES/EN claims;
- website finding silently marked remediated, financial scenario treated as
  proven profitability;
- predecessor blocker deletion, missing MC-13 dependency;
- unreviewed milestone described as independently approved;
- source-IP clearance invented, unknown amount converted to zero;
- unresolved source identifier, conditional obligation without condition,
  unreasoned `NOT_APPLICABLE`, blocking risk without evidence, missing locale
  pair, missing document, public authorization while authorization is `NONE`,
  review verdict inconsistency and manifest count drift.

## 3. Recorded outcomes

| Command | Result |
|---|---|
| `npm run test:legal-commercial` | 54/54 checks passed (record commit; see D23) |
| `npm run test:legal-commercial:unit` | 41/41 tests passed |

The implementation-freeze run passed 53/54 with only the record-commit documents
absent, which is expected before the audit. Final outcomes are recorded in D23.

## 4. Semantic limitations

A keyword/regex scanner cannot prove legal compliance. The validator proves
internal consistency, reference integrity, class/status rules, bilingual numeric
parity and preservation of hard restrictions. Ambiguous legal questions — whether
a claim is misleading, whether a product is in CRA scope, whether an instrument
applies to a specific configuration — require human legal review and are
explicitly marked as such. Passing the gate is not a legal certificate, not a
conformity assessment and not a publication approval.

## 5. Reproducibility

The validator is read-only, dependency-free and does not access the network. It
never repairs, migrates or rewrites data. The tests clone the loaded data in
memory, so they cannot corrupt the repository. Both commands exit non-zero on
failure and print one line per check.
