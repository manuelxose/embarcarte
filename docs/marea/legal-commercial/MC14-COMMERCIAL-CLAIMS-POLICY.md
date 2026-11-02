# MC-14 — Commercial claims policy

| Field | Value |
|---|---|
| Deliverable | D13 `MC14-COMMERCIAL-CLAIMS-POLICY.md` |
| Milestone | MC-14/36 |
| Date | 2026-11-02 |
| Owner | Programme Lead / Commercial Director (role, not a person) |
| Machine data | `data/claims-policy.json`; `data/bilingual-claims.json` |
| Status | BINDING INTERNAL POLICY — `MC14_COMMERCIAL_CLAIMS_PUBLICATION = NOT_AUTHORIZED` |

## 1. Purpose

This policy governs every statement about EMBARCARTE, MAREA, the nine families
and the six bundles, across every channel. It is compatible with MC-03's
A/C/P/X classification, but adds explicit **audience** and **publication-status**
gates. The stricter gate always prevails. MC-03 evidence is not edited; the
inherited conflict about public brand use is recorded and resolved in favour of
the active `MAREA_PUBLIC_USE = NO_GO` restriction.

## 2. Claim classes

| Class | Meaning | Audience gate | Publication requirement |
|---|---|---|---|
| **A** | Allowed in the specified context | Internal documentation only unless a separate public gate authorises | Context and audience stated; no performance implication |
| **C** | Conditional | Internal draft until evidence exists | Named evidence attached, approver sign-off, gate open |
| **P** | Prohibited in the current state | No publication | Cannot be published while the named blocker is open |
| **X** | Prohibited absolutely | No publication and no use as fact internally | No evidence route exists in this programme |

A claim classified A for internal documentation is **not** automatically
authorised for public publication. Internal naming of MAREA is allowed; public
brand use is not.

## 3. Publication statuses and channels

Statuses: `INTERNAL_ONLY`, `PUBLIC_PROHIBITED`, `PUBLIC_CONDITIONAL`,
`PUBLIC_AUTHORIZED`. In MC-14 only the first two are used; no claim is
`PUBLIC_AUTHORIZED`.

Channels covered: corporate website, product catalogue, product landing pages,
bundle comparison pages, search-engine descriptions, advertisements, email
campaigns, installer brochures, packaging, manuals, proposals, quotations,
checkout, partner documentation, app stores and social media.

## 4. Mandatory prohibited claims (30 categories)

The policy prohibits unsupported statements about: commercial availability;
stock; delivery dates; final pricing; trademark registration; ownership of the
underlying code; official or licensed charts; weather-data rights; CE/RED/EMC
compliance; NMEA certification; marine safety certification; universal
interoperability; validated installation compatibility (conditional); fully
autonomous steering; collision prevention; guaranteed alert delivery; guaranteed
monitoring availability; guaranteed forecast accuracy; insurance coverage;
customer counts; testimonials; market share; commercial profitability;
break-even; investment returns; financing commitments; cybersecurity
certification; unverified SLAs; GDPR compliance assertions; and safety-of-life
functionality.

Each category is machine-enforced where possible and has a class, a reason and
linked risks. Examples of prohibited ES/EN wording are in D14.

## 5. Approval workflow

1. Author drafts the claim with audience, channel and the evidence artefact (or
   records `NONE`).
2. Classify A/C/P/X and set the publication status using the audience gate.
3. Check against the prohibited categories and the hard restrictions.
4. Class C: attach evidence, obtain approver sign-off and confirm the release
   gate is open. Until then it stays `INTERNAL_ONLY`.
5. Independent review verifies the claim against the evidence, not the summary.
6. A claim in a signed commercial document additionally requires the human
   signatory named in the brand/legal decision package.
7. Re-review on any lifecycle, licence, certification, price or support-period
   change.

## 6. Bilingual consistency

Every claim is a pair (ES/EN) and must carry the same class, publication status,
risk links, numbers and negation. A translation that softens or strengthens a
claim is a different, prohibited claim. The validator checks pair presence,
classification, status and numeric-token parity. Numeric claims in particular
must match units, currency, VAT basis and scope.

## 7. Brand and trademark state

`TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`; `MAREA_PUBLIC_USE = NO_GO`. No `®`
or `™`, no "registered", no official or licensed brand assertion. The inherited
MC-03 class-A allowance for "MAREA is a product brand of EMBARCARTE" is
superseded in public contexts by the stricter MC-14 rule; a formal supersession
proposal must be approved before any change to the brand contract.

## 8. Internal use and context

Internal documents distinguish: proposed product concept; defined intended
functionality; tested functionality; licensed functionality; commercially
available product. Today only the first two are available, and internal copy must
say so. Disclaimers may not be used to disguise an unsupported factual claim, and
a disclaimer does not cure a statement that is itself misleading.

## 9. Enforcement

- `npm run test:legal-commercial` validates classes, statuses, prohibited
  categories, bilingual parity, evidence gates and hard restrictions.
- `npm run test:legal-commercial:unit` mutates the data to prove the controls
  fail when they should.
- Independent review checks real copy before merge/milestone acceptance.
- A published claim found unsupported must be retracted within 24 hours,
  recorded, and the product's commercial state reviewed.

Passing the validator proves internal consistency, not legal compliance. Ambiguous
claims require human legal review.

## 10. Current state

0 claims are authorised for publication. The read-only website audit (D15)
identified 34 findings, including unsupported availability, ownership,
open-source, safety and certification statements; none was remediated in MC-14.
