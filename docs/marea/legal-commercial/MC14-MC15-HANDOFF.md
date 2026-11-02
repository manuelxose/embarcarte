# MC-14 — MC-15 handoff

| Field | Value |
|---|---|
| Deliverable | D18 `MC14-MC15-HANDOFF.md` |
| Milestone | MC-14/36 |
| Date | 2026-11-02 |
| Owner | Programme Lead |
| Machine data | `data/mc15-handoff-inputs.json`; `data/website-findings.json` |
| Next milestone | MC-15/36 — Bilingual information architecture and SEO migration |
| `MC15_STARTED` | `false` |
| Status | `READY_FOR_MC15_WITH_NAMED_GAPS` |

## 1. Boundary

This is a handoff package only. MC-15 is not started, no website page, route,
metadata, price, checkout or deployment was modified, and no public content is
authorised. The read-only inventory in D15 records what MC-15 will have to
remediate; it did not remediate anything.

## 2. Approved-for-internal-use vocabulary

MAREA (internal name only), family and edition codes, `DEFINED` /
`IN_DEFINITION` / `NOT_FOR_SALE` / `INTERNAL_ONLY`, `HYPOTHESIS_UNAPPROVED`
(internal), "supervised steering", "receive-only AIS", "navigational aid",
"concept/proposed", and EMBARCARTE as company name subject to completing the
legal identity.

Forbidden in public until the named gate opens: MAREA public brand use, `®`/`™`,
availability/stock/buy/delivery/price, CE/RED/EMC/NMEA/marine certification,
official charts or weather, autonomous steering, collision avoidance, guaranteed
alerts/monitoring, GDPR/cyber certification, profitability/break-even/returns,
tested-at-sea/reliability, and open-source claims for OPEN-MARINE.

## 3. Publication gates carried into MC-15

- **Brand:** no public MAREA use (`MAREA_PUBLIC_USE = NO_GO`); the stricter MC-14
  rule supersedes the inherited MC-03 public-brand allowance.
- **Claims:** every page must pass the claims policy and bilingual parity check;
  no public claim is authorised today.
- **Legal footer:** verified company identity, tax ID, address, registry,
  contact, legal/privacy/cookie links; currently missing.
- **Product/bundle pages:** only CONCEPT/DEFINED/INTERNAL_ONLY states and
  non-transactional CTAs; PILOT never purchasable; AIS receive-only; WATCH no
  guaranteed alerts; FLEET B2B with no default hardware; WEATHER probabilistic;
  NAV navigational aid.
- **Privacy/cookies:** consent before non-essential cookies, cookie inventory and
  policy, disclosed recipients (Google Identity Services, payment provider),
  consent evidence stored server-side.
- **Commerce CTAs:** no MAREA checkout while `NOT_FOR_SALE`; existing sample shop
  disabled or clearly separated.
- **Structured data:** no Product/Offer markup for MAREA until availability,
  approved price and seller identity exist; no ratings/reviews.
- **SEO:** no MAREA in titles/descriptions before clearance; no
  availability/price/certification/performance in metadata; canonical/hreflang
  reciprocity preserved; no duplicated ES/EN implementation.

## 4. Page-level issues from the read-only review

| Route | Findings | Issue |
|---|---|---|
| `/es/tienda` | WEB-004, WEB-019, WEB-020 | Shop/SEO instruct buying unavailable Open Marine Hub/autopilot |
| `/es/tecnologia` | WEB-003, WEB-006, WEB-010, WEB-011 | Ownership/open-source claims and autopilot safety claims |
| `/es/legal/aviso-legal` | WEB-001, WEB-007, WEB-021 | Missing legal identity; incomplete recipients; draft notice |
| `/es/legal/privacidad` | WEB-007, WEB-008, WEB-009 | Incomplete controller/recipient information; unrecorded consent |
| `/es/legal/cookies` | WEB-022 | GIS cookie disclosure and consent gap |
| `/es/tienda/checkout` | WEB-012, WEB-013, WEB-023 | Checkout CTAs, VAT-included labelling, shipping costs |
| `/es/sobre-nosotros` | WEB-014, WEB-015 | Autopilot and test/safety claims |
| Structured data / product detail | WEB-016, WEB-017, WEB-018 | Product/Offer JSON-LD with admin price/stock; compatibility claims |

The full 34 findings with file/line references and remediation proposals are in
D15 and `data/website-findings.json`. Every finding is `NOT_REMEDIATED`.

## 5. ES/EN consistency requirements

One component per page; dictionary and localized-route parity; claim pairs with
identical class, status, numbers and negation; equivalent legal, privacy and
cookie disclosures in both languages. A translation that softens or strengthens
a claim is a different, prohibited claim.

## 6. Evidence required before availability or price in structured data

Approved price list with VAT basis and territory; OPERATIONS READY lifecycle and
real stock/fulfilment; signed consumer/B2B terms and legal identity; approved
claim records with evidence; open gates `GATE-PRICING`, `GATE-LEGAL-ENTITY`,
`GATE-CONSUMER-TERMS`, `GATE-PAYMENTS`, `GATE-COMMERCIAL-CLAIMS`; and an
authorised decision on the existing sample commerce.

## 7. Do-not-do list for MC-15

Do not modify routes, canonical URLs, hreflang, product data, checkout, public
prices or deployment configuration without the MC-15 scope and gates; do not
publish MAREA as a brand or product availability; do not translate claims
without parity review; do not add Product/Offer structured data before approval;
do not treat this handoff as MC-15 execution.

## 8. Readiness

`MC15_STARTED = false`. The handoff is ready with named gaps: legal identity,
brand clearance, claims approval, consumer terms, payments, data licences and
website remediation all remain open. MC-15 may prepare the IA/SEO migration
design and remediation backlog, but may not publish, re-index or sell anything.
