# MC-16 — MC-17 handoff (D18)

| Field | Value |
|---|---|
| Deliverable | D18 `MC16-MC17-HANDOFF.md` |
| Milestone | MC-16/36 — MAREA commerce and product data model |
| Date | 2026-11-03 |
| Owner | governance-docs |
| Handoff status | `READY_FOR_MC17_WITH_NAMED_GAPS` |
| `MC17_STARTED` | `false` |
| `mc17ImplementationAuthorized` | `false` |
| `publicUiChangeAuthorized` | `false` |
| Machine inputs | `data/mc17-handoff-inputs.json` |

## 1. Boundary

MC-17 is the **presentation milestone** for the defined MAREA portfolio. It consumes
MC-16 identities, readiness, gate state, bundle composition and entitlement
definitions. It does **not** create commerce:

- no price, availability, stock, cart, checkout, payment, subscription or entitlement
  grant;
- no merchant SKU, publication, indexation, sitemap entry or Product/Offer JSON-LD;
- no public MAREA brand claim, registered-mark assertion or certification claim;
- no route from the 23 proposed routes may be deployed.

This handoff is an input contract. It does not start MC-17, and MC-17 cannot start
from it without written authorization.

## 2. Identity model MC-17 must preserve

| Identity | Key | Rule |
|---|---|---|
| Family | `familyId` (`NAV` … `FLEET`) | One family page; exposes zero or more editions |
| Edition | `editionId` (26) | A defined edition, **not** a merchant SKU; `merchantSkuCode = null` |
| SKU candidate | `skuCandidateId` | Internal candidate only; no public SKU code exists |
| Bundle | `bundleId` (`START` … `FLEET`) | An entity with components/exclusions, not a SKU |
| Page | `routeId` / `entityId` | One page per family/bundle/tool; never one page per edition |
| Entitlement | `SE-*` / `RS-*` | A licensed capability reference, not a grant and not a page |

`displayName` is language-neutral. Localized content belongs to one entity: never
duplicate an edition as an ES and an EN SKU, and never derive identity from a slug.
`PILOT-PRO` is an `INSTALLATION_PACKAGE`, not a SKU, not a bundle line and not a page.
Dynamic slugs use the same identifier in both locales; an edition id never appears in
a URL.

## 3. Presentation contract

| Surface | May present | Must not present |
|---|---|---|
| Family page | Family definition, edition list with definition status, readiness labels derived server-side | Price, buy CTA, availability, stock, delivery, certification, performance claim |
| Edition block | Definition status (`DEFINED`/`CONDITIONAL`/`INSTALLATION_PACKAGE`), dependencies, exclusions, quotation requirement | Merchant SKU code, price, `in stock`, countdown, “add to cart” |
| Bundle page | Components, exclusions, conditional lines, contracted/quote-only nature, FLEET no-default-hardware and no-SLA statement | Fixed package price, package discount, “buy bundle” |
| Entitlement copy | Definition, term, shared-ledger note, local-safety independence | “Included with purchase”, trial, renewal date, billing amount |
| Documentation | Family-id-keyed documentation, limitations, support route | Certification, approval, compatibility assertion without evidence |

Readiness labels are **derived server-side** from the readiness dimensions and gate
state, not authored on the page and not promoted by a page render. A page state never
promotes a product lifecycle, and a product lifecycle never authorizes a page.

## 4. CTA contract

Only five technical states are permitted. Public wording must come from authorized
copy (none exists yet); state identifiers are not public labels.

| State | Derived when | Allowed interaction | Prohibited |
|---|---|---|---|
| `DISABLED` | Entity is defined but no public action is authorized | Non-interactive status, explanation text | Fake active button, hidden action, hover promise |
| `COMING_SOON` | Conditional/defined edition with an internal plan but no date approval | Informational text | Date, price, waitlist promise, “pre-order” |
| `REQUEST_INFORMATION` | Informational page (support/professionals/installers, documentation) | Contact route with consent | Quote, order, price expectation |
| `QUOTE_ONLY` | `PILOT-*`, `PILOT-PRO`, `FLEET-ENTERPRISE`, installation/contracted solutions | Request a survey/quotation through a human process | Checkout, cart, fixed price, self-service commitment |
| `NOT_AVAILABLE` | Safety/legal/gate block, retired or out-of-scope entity | Explicit unavailability statement | “Sold out”, fake stock, implied future availability |

Global rules: `buyCtaAllowed = false`, `cartAllowed = false`, `priceVisible = false`,
`availabilityVisible = false`. The CTA state is **derived**, never stored as marketing
copy, and must be accompanied by text — colour alone never conveys state. A disabled
control uses `aria-disabled` with a visible reason and remains keyboard discoverable;
it must not pretend to be an enabled action.

## 5. Price, inventory and commercial truth

- No price is displayed for any MAREA entity: 0 approved prices, all candidate prices
  `HYPOTHESIS_UNAPPROVED` or `NOT_ESTABLISHED` (D08).
- No availability or stock is displayed: 0 verified inventory; admin-entered stock is
  not MAREA stock (D09).
- Unknown values are shown as “not established / not available”, never as `0`,
  “free”, “from €0” or a placeholder amount.
- No MAREA Product/Offer JSON-LD, price meta, availability meta, rating or review
  markup may be emitted; `Publication` stays `INTERNAL_ONLY` (D15).
- No cart, basket, checkout, payment link or subscription purchase path.

## 6. Accessibility contract

MC-17 must meet **WCAG 2.2 AA** for every new surface, at minimum:

| Requirement | Criterion / rule |
|---|---|
| Semantic structure and headings | 1.3.1; one `h1`, logical order |
| Keyboard operability | 2.1.1; all controls reachable/operable, no keyboard trap |
| Visible focus | 2.4.7; focus indicator not obscured (2.4.11) |
| Text contrast | 1.4.3 (4.5:1 normal, 3:1 large) |
| Non-text contrast | 1.4.11 (3:1 for UI components and status indicators) |
| Status not colour-only | 1.4.1; state text always accompanies colour |
| Target size | 2.5.8 (minimum 24×24 CSS px or equivalent spacing) |
| Labels and instructions | 2.5.3, 3.3.1, 3.3.3; errors identified and explained |
| Name, role, value | 4.1.2; native elements first, ARIA only when needed |
| Announcements | CTA/readiness changes announced politely; no unexpected focus move |
| Motion and zoom | no motion-only meaning; usable at 200% zoom and 320 CSS px width |

The `marea-premium-design` and `ui-ux-pro-max` guidance applies to visual work, but
neither replaces a real accessibility audit. No WCAG conformance claim may be
published before an independent audit exists.

## 7. ES/EN identity and copy

- One entity, one component, two locales — no duplicated ES/EN page or SKU.
- Spanish paths stay unprefixed; English paths stay under `/en`; the 23 proposed route
  identities and slugs are frozen by MC-15.
- Hreflang pairs are reciprocal; a page with no authorized translation is not
  indexed in that locale; fallback copy is marked with the correct `lang`.
- All public copy is **pending authorization**: no MAREA claim is approved, no
  trademark use is cleared (`NOT_GRANTED`), and no certification claim is permitted.
- ES and EN must be semantically equivalent. A claim in one language that is absent
  or weaker in the other is a defect, not a translation choice.
- Brand attribution follows the approved policy; “MAREA” is a proposed brand, not a
  registered mark.

## 8. Data MC-17 consumes

Required per entity: stable identity, definition status, lifecycle state, 11 readiness
dimensions with derived labels, blocking gate ids (opaque), price *status* without
amount, verified stock *state* without quantity, publication eligibility (always
false), bundle components/exclusions, entitlement definitions and dependency rules,
claim restrictions, and the derived CTA state.

Rules: absent data is rendered as unknown, never invented; gate evidence details are
not exposed publicly; internal ids may appear in markup only where needed for
stability; no customer, vessel, telemetry, price or stock fixture may be used.

## 9. Safe fixtures

MC-17 tests use synthetic internal fixtures only: no customer data, no vessel
telemetry, no live price, no live stock. The reference is
`scripts/check-marea-commerce-data.test.mjs`; fixtures must not be copied into
production data or public copy.

## 10. Named gaps MC-17 must close (or carry)

| Gap | Consequence |
|---|---|
| No authorized ES/EN public copy | Pages cannot be published; placeholder copy is prohibited |
| No approved claims / trademark clearance | Brand and product claims stay blocked |
| No verified price or stock | Price/availability components must stay absent |
| No final read API for MC-16 data | MC-17 must not read JSON files at runtime without an authorized adapter |
| No accessibility audit | No WCAG conformance claim |
| No publication authorization | All 23 routes remain non-deployable, noindex, absent from sitemap |
| No MC-17 written authorization | MC-17 must not start |

## 11. MC-17 start checklist

1. MC-16 accepted with independent review `PASS` and 0 open BLOCKING/MAJOR findings.
2. Written MC-17 authorization and scope recorded by the Lead.
3. Presentation contract in this document accepted as the binding input.
4. Data validator passes at the MC-16 candidate commit; derived CTA states verified.
5. Claims/copy authorization path defined; no public claim without approval.
6. Accessibility plan and audit owner assigned.
7. Confirmed that no route, price, availability, cart or Product/Offer markup can be
   enabled by MC-17.
8. Rollback/no-publication guarantee for the presentation layer.

Until all eight are true: `MC17_STARTED = false`.

## 12. Prohibited actions

- Publishing, deploying, indexing or merging a MAREA route in MC-16.
- Creating a merchant SKU, price approval, stock record, subscription or grant.
- Using `products.active`, legacy price or legacy stock as a MAREA signal.
- Emitting `Product`, `Offer`, `price`, `priceCurrency`, `availability`,
  `aggregateRating` or `review` markup for MAREA.
- Inventing a claim, certification, test, quotation, date, testimonial or approval.
- Presenting a defined or conditional edition as purchasable.
- Starting MC-17 from this document alone.

## 13. Handoff artefacts

| Artefact | Path |
|---|---|
| Handoff inputs (machine) | `docs/marea/commerce-data/data/mc17-handoff-inputs.json` |
| Publication eligibility | `docs/marea/commerce-data/data/publication-eligibility.json` |
| Product families / editions | `docs/marea/commerce-data/data/product-families.json`, `product-editions.json` |
| Bundles | `docs/marea/commerce-data/data/bundle-compositions.json` |
| Readiness | `docs/marea/commerce-data/data/readiness-dimensions.json` |
| Security/audit | `MC16-SECURITY-AND-AUDIT-TRAIL.md` |
| Gates/blockers | `MC16-EXTERNAL-EVIDENCE-AND-BLOCKERS.md` |
| IA/SEO inputs | `docs/marea/information-architecture/data/mc16-handoff-inputs.json` |

Handoff verdict: **READY_FOR_MC17_WITH_NAMED_GAPS**, presentation-only, with
`MC17_STARTED = false` and every commercial capability explicitly disabled.
