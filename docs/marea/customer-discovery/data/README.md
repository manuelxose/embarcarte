# MC-10 machine-readable research contract (repository aggregate layer)

Status: `INTERNAL_RESEARCH_DATA_ONLY` — **BLOCKED at the outreach authorization gate**
(`AUTH-MC10-001 = NOT_GRANTED`). Milestone MC-10, base commit
`9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3`.

This directory is the repository aggregate layer (Layer C) of the MC-10 primary
customer-discovery data contract. It holds schema, frozen thresholds, prepared
registers and zero counts. It never holds participant identity, contact data,
audio, verbatim transcripts or any Layer A/B research record.

The full schema reference is
[`../data-contract/MC10-DATA-CONTRACT.md`](../data-contract/MC10-DATA-CONTRACT.md);
the index of files and deliverables is [`manifest.json`](manifest.json).

## Rules that apply to every file here

1. **Zero means no data.** Every count is 0 because no participant was
   identified, contacted, screened or interviewed. A zero is an absence of
   evidence, never evidence of absence.
2. **Unknown is `null`/`UNKNOWN`, never `0`.** An unknown amount, currency, VAT
   treatment or agreement value is recorded as unknown; it is never coerced to
   zero and never silently converted.
3. **No rate without a denominator.** A proportion with a zero denominator is
   undefined, not 0% and not 100%. Thresholds are quoted as targets, never as
   observed results.
4. **Thresholds are frozen by SHA-256.** `experiments.json` records, per
   experiment, a `thresholdSha256` over a canonical JSON serialization of the
   MC-09 registry record. The algorithm is documented in the data contract and
   recomputed by the validator on every run.
5. **Quotes are permission-gated.** A verbatim quotation may appear only with a
   recorded `QUOTATION` permission and a pseudonymous participant ID.
6. **No personal data in Git.** No email, phone, IBAN, DNI/NIE/NIF, postal
   address, name, berth number or vessel registration number may appear here.
7. **Fixtures are excluded.** Synthetic records exist only in an operating-system
   temporary directory created by the negative-mutation test suite, tagged
   `testingFixture`, and are never copied into this directory or counted in any
   total.

## Files

| File | Content | Records |
| --- | --- | ---: |
| `manifest.json` | Index of files, deliverables D1–D28, fixture-exclusion rule | 17 files |
| `experiments.json` | Ten MC-09-frozen experiments (`EXP-MC10-01`…`10`), hashes, `NOT_EXECUTED`/`BLOCKED` | 10 |
| `recruitment-funnel.json` | Aggregate funnel by segment and state (all 0) | 8 segments |
| `participants.json` | Empty pseudonymous participant register and consent model | 0 |
| `interview-records.json` | Empty interview-record register | 0 |
| `pricing-responses.json` | Empty Gabor–Granger / Van Westendorp response register | 0 |
| `coding.json` | Coding, double-coding and saturation state; κ `NOT_COMPUTED` | 0 |
| `concept-comprehension.json` | Seven concept-comprehension states (nobody tested) | 7 |
| `barriers.json` | Ten prepared barrier codes with zero rankings | 10 |
| `findings.json` | Empty findings register with the traceability rule | 0 |
| `product-evidence.json` | Nine families, MC-09 order preserved, all `NOT_TESTED` | 9 |
| `bundle-evidence.json` | Six bundles, MC-09 order preserved, all `NOT_TESTED` | 6 |
| `data-quality.json` | Preparation-time reconciliation / PII / fixture checks | 9 checks |
| `governance-status.json` | MC-09 governance invariant mirror; nothing changed | 1 |
| `research-status.json` | Lead-owned milestone status, segment plan, Wave-0 checklist, recorded planning inconsistencies | 1 |
| `fieldwork-authorization.json` | Lead-owned `AUTH-MC10-001` record (`NOT_GRANTED`) | 1 |
| `decisions.json` | Lead-owned programme decisions D-029…D-033 | 5 |
| `pricing-ladders.json` | Agent E-owned frozen price ladders (hypotheses only) | 2 constructs |

## Validation

```
node scripts/check-marea-customer-research.mjs          # deterministic gate
node --test scripts/check-marea-customer-research.test.mjs   # negative mutations
```

The validator is offline, zero-dependency and fails closed: a fabricated
participant, a fabricated interview, a post-hoc threshold change, a PII leak, a
price approval or a readiness upgrade all produce a non-zero exit code.
