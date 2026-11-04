# MC-19/36 — Authoritative internal scope contract

| Field                   | Value                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| Deliverable             | MC-19 internal implementation contract (supersedes the BLOCKED proposal as the active scope)      |
| Milestone               | MC-19/36 — Segment/solution pages and enquiry flows (owners, installers, professionals)           |
| Status                  | `AUTHORIZED_INTERNAL_SCOPE` — implementation authorised by the MC-19 master execution prompt      |
| Recorded                | 2026-11-04                                                                                        |
| Baseline                | `ba63baa0e529ab9cb482fd929632d359fec1d328` (`feature/marea-mc19-scope-proposal`)                  |
| Previous verdict        | `MC19_VERDICT = BLOCKED`; `MC19_SCOPE_PROPOSAL = DELIVERED`; audit `PASS_INTERNAL_SCOPE_PROPOSAL` |
| Current global verdict  | `MC19_VERDICT = PARTIAL` (external approvals unresolved)                                          |
| Publication             | `NOT_AUTHORIZED`                                                                                  |
| Machine-readable record | `docs/marea/segments/data/mc19-scope-instruction.json`                                            |

## 1. Provenance of this instruction

The MC-19 implementation instruction was supplied in the MC-19 master execution prompt by the
requesting product owner on 2026-11-04. It was **not** previously present in this repository and it
is **not** signed by any authority other than that product owner. This document records the
instruction; it does not manufacture an approval. No legal, commercial, trademark, privacy,
licensing, publication or release approval is created, implied or reused by recording it.

If repository governance requires a named approver beyond the requesting product owner, that
approval is recorded as **OUTSTANDING** in the machine-readable record
(`namedApproverBeyondProductOwner`), not fabricated.

## 2. Authorised scope — OPTION A

Three internal bilingual audience pages, one locale-aware component tree, rendered only by the
isolated loopback preview:

1. `professionals` — MC-15 identity reused (`ENT-PAGE-PROFESSIONALS`, `PROFESSIONALS`).
2. `installers` — MC-15 identity reused (`ENT-PAGE-INSTALLERS`, `INSTALLERS`).
3. `shipowners` — **new internal-only identity** (`ENT-INTERNAL-SHIPOWNERS`). MC-15 defines no
   owners route, entity or page type, so no public path is created, reserved or proposed.

Per segment the page contains: a distinctive introduction; canonical product-family references; an
audience boundary (who it is for, who it is not for); evidence-based use cases; differentiated
capabilities with mandatory limits; architecture/ecosystem context; explicit availability and
readiness states; documentation references; and a safe, deliberately disabled call to action.

## 3. Explicit non-goals

- No enquiry form, contact endpoint, quote request, pre-registration, installer registration,
  customer account, lead store, marketing tracking, newsletter or checkout.
- No hidden, disabled or draft endpoint for any of those flows.
- No price, stock, SKU, purchase, subscription, certification, testimonial, sea-trial,
  compatibility or deployment claim.
- No public route, sitemap entry, canonical, hreflang, Open Graph/Twitter card, JSON-LD or
  indexable metadata.
- No merge, deployment or publication. Delivery is a draft pull request only.
- No MC-20, MC-21, MC-22 or MC-23 work. Their page ownership is unchanged.

## 4. Information architecture

`MC19-IA-DECISION.md` and `data/mc19-ia-decision.json` record the decision: three identities,
internal preview namespace `internal/segments/*` (`/en/internal/segments/*` for English), no
registration in `LOCALIZED_ROUTES`, no collision with the 21 public routes or the 23 MC-15 proposed
routes, and no public path for `shipowners`.

The meaning of “armador” is not flattened: the `shipowners` page addresses the individual owner of a
recreational vessel, while commercial shipowners and professional fleets are explicitly excluded.
`FLEET` is a contracted B2B solution and is not presented as an individual-owner product.

## 5. Gates preserved (immutable in this milestone)

```text
TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
LICENSING_RIGHTS_GRANTED = false
PRICE_APPROVED = NONE
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
PUBLICATION_AUTHORIZED = false
INDEXATION_AUTHORIZED = false
PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED
GATE-PRIVACY-DPA-DPIA = BLOCKED
DOC-17 (installer/distributor agreements) = NOT_EXECUTED
```

## 6. Acceptance and verification

The twelve acceptance criteria of the MC-19 execution prompt (AC-01…AC-12) are mapped to
reproducible evidence in `MC19-ACCEPTANCE-MATRIX.md`. The deterministic validator is
`npm run test:mc19`; the adversarial/unit suite is `npm run test:mc19:unit`; the browser suite is
`npm run test:mc19:e2e`. No criterion is reported as verified unless its command ran and its output
is recorded.

## 7. Verdict policy

- If internal engineering is completed and independently reviewed:
  `MC19_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE`, `MC19_VERDICT = PARTIAL`.
- The global verdict stays `PARTIAL` while external legal and commercial authorisations are
  unresolved. It never becomes `PASS` because tests pass.
- If prerequisites are genuinely missing, report `BLOCKED` with exact evidence.
- MC-20 is not started automatically.
