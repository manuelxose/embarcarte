# EMBARCARTE / MAREA — Corporate brand architecture

| Field | Value |
| --- | --- |
| Document ID | MC-03 / BRAND-ARCHITECTURE |
| Milestone | MC-03 — corporate brand architecture, trademark clearance research, commercial positioning, brand governance |
| Programme | EMBARCARTE / MAREA (36 Master Prompts) |
| Date | 2026-10-30 |
| Repository | `manuelxose/embarcarte` @ `9631c6f52b20b20e85506b097615ca5eb1107a94` (branch `feature/marea-mc03-brand-governance`) |
| Owner | Lead (Brand and Commercial Program Director) |
| Nature | Binding brand architecture decision for the programme. Not a legal opinion, not a trademark clearance, not a commercial availability statement |
| Machine-readable counterpart | `brand-identity.contract.json` (validated by `npm run test:brand`) |

## Status statement (read before using any name in this document)

- **EMBARCARTE** is the commercial company and the seller of record. Its corporate registration data
  (`SITE.legal`: tax id, address, registry) is **not yet available** and must never be invented
  (MC-02 blocker X-02).
- **MAREA** is a **proposed** marine technology product brand. Trademark availability research is
  recorded in `TRADEMARK-CLEARANCE-RESEARCH.md`; professional clearance has **not** been granted.
  `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`. No product is commercially available.
- **OPEN-MARINE** is the existing open engineering foundation and an **internal/open project
  identifier**. Its ownership and outbound licensing are unresolved (MC-02 blockers L-01..L-04,
  decision DEC-01 in `MC-02-BLOCKERS-AND-DECISIONS.md`). It is **not** the public product brand and
  no public identity may be built on it in this programme.
- Nothing in this architecture authorises publication, trademark filing, packaging procurement,
  domain acquisition or a public brand launch. Those are separate, explicitly authorised decisions
  (see `BRAND-AND-IP-DECISION-PACKAGE.md`).

## 1. The three identities and what each one is allowed to carry

| Identity | Legal nature | Commercial role | Public? | What it may carry | What it must never carry |
| --- | --- | --- | --- | --- | --- |
| **EMBARCARTE** | Trading identity of the company (corporate data pending) | Seller, contract counterparty, installer and service provider, support owner, customer relationship, invoice/legal pages | Yes (current live site uses it) | Company facts it can prove; seller statements; service and support commitments it can actually deliver; ownership of the customer relationship | Product performance claims; trademarks it does not own; registration symbols; guarantees it has not documented |
| **MAREA** | Proposed brand for a family of marine technology products and services | Customer-facing product ecosystem: navigation, connectivity, traffic, steering, sensing, monitoring, display, forecasting, fleet SaaS | **Internal / proposed only** until clearance and authorised launch | Product identity, family naming, editions, product-page copy, product UI, future packaging | Corporate/legal identity; registered-trademark symbols (`®`, `™`); certification claims; availability claims; safety guarantees |
| **OPEN-MARINE** | Open engineering repository/project with **unresolved ownership and licensing** | Engineering history, internal module names, technical documentation of the platform foundation | **No** (internal only) | Internal architecture docs, engineering identifiers, provenance references | Public product naming; customer-facing brand; any implication that EMBARCARTE exclusively owns or cleared it; any sale of a product as "Open Marine" |

**Hard separation rules**

1. A customer never buys "EMBARCARTE electronics" and never deals with "OPEN-MARINE" as a product.
   The customer buys a **MAREA** product from **EMBARCARTE**.
2. A legal or contractual document (invoice, terms, warranty, privacy policy, distance-selling
   information) is always issued under **EMBARCARTE**, never under MAREA alone.
3. Engineering identifiers stay in engineering space. `omicore`, module names, repository names and
   protocol adapters are **not** brand names and never appear in customer-facing copy.
4. Only one of the three may be presented as the *manufacturer-brand promise*: MAREA. Only one may be
   presented as the *seller of record*: EMBARCARTE.

## 2. Architecture model: endorsed brand (single product brand, one seller)

The programme adopts an **endorsed-brand architecture**:

```
EMBARCARTE                         company / seller / installer / support
   └── MAREA                       product brand (endorsed by EMBARCARTE)
         ├── MAREA NAV             navigation software family
         ├── MAREA HUB             onboard data gateway / connectivity family
         ├── MAREA AIS             marine traffic (receive-only) family
         ├── MAREA PILOT           supervised steering control family
         ├── MAREA SENSE           sensors and instrumentation family
         ├── MAREA WATCH           remote monitoring and alerting family
         ├── MAREA DISPLAY         multifunction display hardware family
         ├── MAREA WEATHER         forecast and marine data service family
         └── MAREA FLEET           professional multi-vessel SaaS family

Bundles (commercial packages, not brands): MAREA START · MAREA CRUISE · MAREA SAIL ·
MAREA PROTECT · MAREA COMPLETE · MAREA FLEET package

OPEN-MARINE                        internal engineering foundation — NOT part of the public hierarchy
```

**Why endorsed rather than a house brand or a multi-brand portfolio**

- One seller, one support relationship and one installer network: the trust that MAREA needs in year
  one is EMBARCARTE's local reputation, not an invented market position. An endorsement transfers that
  trust to the product brand at the lowest cost.
- Nine families share one data model, one account and one entitlement system, so a single product brand
  communicates an ecosystem that a family-of-brands structure would fragment.
- A house brand ("EMBARCARTE NAV") would spend the company name on product-level search terms, and it
  would make the corporate name the product guarantee — undesirable while product validation is
  incomplete (MC-02 product-readiness blockers P-01..P-10).
- A multi-brand portfolio (independent names per family) is rejected for MC-03: it multiplies
  trademark exposure per family, fragments support and contradicts the "one ecosystem" strategy.
  Reconsider only with primary customer evidence (registry prompt 10) and counsel advice.

Endorsement is expressed in **copy**, not as a second logo level. There is no separate "EMBARCARTE
logo over MAREA logo" lockup requirement; the corporate endorsement appears as text attribution in the
places listed in §4.

## 3. Product naming architecture (summary)

The full system is in `PRODUCT-NAMING-SYSTEM.md`; the executable form is
`brand-identity.contract.json`. Binding rules:

- Master brand + family is always written as `MAREA <FAMILY>` in capitals separated by one space:
  `MAREA NAV`, `MAREA HUB`, `MAREA DISPLAY`.
- Editions are title-case words appended to the family: `MAREA NAV Essential`, `MAREA HUB Pro`.
- Hardware size is a plain number after the family or edition: `MAREA DISPLAY 7`.
- Generation is **not** part of the commercial name; it lives in engineering identifiers
  (`marea-display-g2-…)`. Never mix an edition word with a revision number in customer-facing copy.
- The six bundle names are commercial packages, never product families, and `MAREA FLEET` (SaaS) must
  always be distinguished from the `MAREA FLEET package` (integrated B2B offering).
- New families may only be added by editing the brand contract and passing `npm run test:brand`.

## 4. Corporate attribution rules

Attribution is a factual statement about who sells, who supports and who is responsible. It is only
allowed where the underlying fact is supportable today.

### Allowed (no further approval within the programme)

| Context | Spanish | English |
| --- | --- | --- |
| Website footer / product page footer | «MAREA es una marca de producto de EMBARCARTE.» | "MAREA is a product brand of EMBARCARTE." |
| About / corporate page | «EMBARCARTE comercializa e instala la gama MAREA.» | "EMBARCARTE sells and installs the MAREA range." |
| Seller identification (legal pages, invoices, terms) | «Vendido por EMBARCARTE.» | "Sold by EMBARCARTE." |
| Support identification | «Soporte y garantía gestionados por EMBARCARTE.» | "Support and warranty handled by EMBARCARTE." |
| Product page (short) | «De EMBARCARTE.» | "By EMBARCARTE." |

The endorsed form "MAREA by EMBARCARTE" is permitted as a short lockup line only after the legal
clearance gate opens for public use; internally it is the approved canonical endorsement string.

### Conditional (requires evidence before publication)

| Statement pattern | Condition |
| --- | --- |
| "Developed by EMBARCARTE" / «Desarrollado por EMBARCARTE» | Only for components whose authorship chain is documented. MC-02 shows the OPEN-MARINE code history has unresolved authorship (L-02, L-03). Until DEC-01 is closed, do not assert exclusive development of every component. |
| "Manufactured by EMBARCARTE" / «Fabricado por EMBARCARTE» | Requires a documented manufacturing/contract-manufacture arrangement (MC-02 DEC-07). Not established. |
| "Official / certified / authorised …" partner or service statements | Requires the actual agreement or certificate on file. |
| Country-of-origin statements | Require manufacturing evidence. |

Preferred safe formulation for the current state: **"Commercialised and supported by EMBARCARTE"** /
«Comercializado y con soporte de EMBARCARTE», which is true by role and does not assert authorship.

### Forbidden

- `®` or `™` attached to MAREA, to any MAREA family name, or to any bundle name. Registration is not
  verified in any jurisdiction; see `TRADEMARK-CLEARANCE-RESEARCH.md`.
- Presenting MAREA as "a company", "a manufacturer", "a shipyard" or "an official body".
- Presenting OPEN-MARINE as the brand a customer is buying, or as a cleared/open-source entitlement.
- Reversing endorsement: "EMBARCARTE by MAREA", "the MAREA group", "the MAREA company".
- Attributing third-party technology as first-party, or first-party work as third-party.
- Any "a brand of <entity>" statement naming an entity other than EMBARCARTE.
- Claiming EMBARCARTE or MAREA owns code, charts, data or trademarks that the programme has not cleared.

These rules are enforced on the new brand documents by `scripts/check-brand.mjs`
(`npm run test:brand`). Existing public pages are inventoried, not rewritten, in
`WEBSITE-BRAND-MIGRATION.md`.

## 5. Customer communication model

| Surface | Who is speaking | Brand shown | Notes |
| --- | --- | --- | --- |
| Marketing site, future MAREA pages | MAREA (endorsed) | MAREA + EMBARCARTE attribution | Truthful readiness language; one legitimate CTA per readiness state |
| Current live site | EMBARCARTE | EMBARCARTE | Unchanged in MC-03; migration is a later, authorised milestone |
| Product UI / instruments | MAREA | MAREA | No corporate data in instrument chrome; no certification badges until certified |
| Packaging (future) | MAREA + EMBARCARTE seller block | MAREA | Requires clearance and a real BOM before procurement |
| Product documentation | MAREA, with EMBARCARTE as document issuer | MAREA | Safety and limitation statements are mandatory, not marketing |
| Invoice / legal / warranty | EMBARCARTE only | EMBARCARTE | Never MAREA alone; corporate data pending (X-02) |
| Support / RMA | EMBARCARTE | EMBARCARTE with MAREA product naming | Support is the company's promise, not a product feature |
| Installer-facing material | EMBARCARTE (professional seller) | MAREA products | Installer is a channel partner of EMBARCARTE, not of MAREA |

## 6. Long-term brand structure and expansion rules

1. **One product brand until the portfolio proves it needs more.** Adding sub-brands requires
   customer evidence and a new architecture decision recorded in `DECISION-LOG.md`.
2. **Family expansion is cheap, brand expansion is not.** New capability families extend MAREA
   (`MAREA <NEWFAMILY>`); they do not create new brands.
3. **Services stay under EMBARCARTE** (installation, surveys, commissioning, training, support plans)
   unless they are software-delivered entitlements inside a MAREA product.
4. **Professional/B2B SaaS may eventually warrant a distinct tier presentation** (FLEET), but not a
   distinct brand in this milestone. The disambiguation rule is `MAREA FLEET` product vs
   `MAREA FLEET package` offering.
5. **International naming:** the family words are English nautical terms used internationally
   (NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET); the master brand is a Spanish word
   with a clear marine meaning in Spanish, Portuguese and Italian. The architecture therefore requires
   no translation of product names: one name set, ES/EN copy, later PT. Adding languages must never
   translate a product family name.
6. **No corporate rename.** The company remains EMBARCARTE; this milestone does not create a new
   corporate name and does not touch domain strategy beyond the plan in `BRAND-AND-IP-DECISION-PACKAGE.md`.
7. **Retirement rule:** a family name is retired only by decision log entry, never by silent reuse for a
   different product.

## 7. Linguistic and distinctiveness considerations carried by the architecture

- MAREA is an ordinary Spanish/Portuguese/Italian word ("tide"). In maritime context that is a genuine
  strategic asset: instantly legible to the primary market, no explanation required.
- The same fact is a distinctiveness risk: a descriptive/near-descriptive relationship to marine goods
  weakens the scope of protection and raises the bar for confusion arguments in the opposite direction
  (many similar words in the sector). The architecture therefore relies on the **family + edition**
  structure and on product-specific design language to carry distinctiveness, not on the master word
  alone.
- In English-language markets "marea" is not a common word, which helps recall but increases the chance
  of homophone/near-mark collisions; this is monitored in the trademark research dataset.
- Spanish/English copy must never translate "MAREA". It is a name, not a noun, in customer copy.

## 8. Governance and change control

| Control | Mechanism | Owner |
| --- | --- | --- |
| Identity relationships (company, brand, technology, families, bundles, attribution, claims) | `brand-identity.contract.json` | Lead |
| Automated enforcement on brand documents | `scripts/check-brand.mjs` + `scripts/check-brand.test.mjs` | Lead (author: governance engineer) |
| Trademark clearance state | `TRADEMARK-CLEARANCE-RESEARCH.md` + decision package | Company owner + counsel |
| Public brand usage on the live site | `WEBSITE-BRAND-MIGRATION.md` (audit only) | Lead until authorised migration |
| Architectural changes | `DECISION-LOG.md` entry + registry update | Lead |
| Final authorisation for publication/filing/spend | Human signatories named in `BRAND-AND-IP-DECISION-PACKAGE.md` | Company owner |

Changing the architecture requires: (1) a decision-log entry, (2) a contract update, (3) a passing
`npm run test:brand`, (4) independent review. No teammate may change the identities unilaterally.

## 9. What this architecture does not claim

- It does not clear MAREA or any family name for trademark use.
- It does not make any product available, certified, compatible or safe.
- It does not establish authorship or ownership of any software component.
- It does not authorise packaging, printing, domain purchase, advertising or a public launch.
- It is not a substitute for the specialist review listed in `BRAND-AND-IP-DECISION-PACKAGE.md`.

## 10. Traceability

| Architecture element | Evidence / companion document |
| --- | --- |
| Product families, editions, bundles | `PRODUCT-NAMING-SYSTEM.md`; `docs/marea/COMMERCIAL-PORTFOLIO.md` |
| Positioning and segments | `MAREA-BRAND-STRATEGY.md`; `COMPETITIVE-POSITIONING-EVIDENCE.md` |
| Customer-facing language | `BRAND-VOICE-ES-EN.md` |
| Claim restrictions | `COMMERCIAL-BRAND-CLAIMS-POLICY.md` |
| Trademark risk | `TRADEMARK-CLEARANCE-RESEARCH.md`; `TRADEMARK-SEARCH-RESULTS.csv` |
| Current website surface | `WEBSITE-BRAND-MIGRATION.md` |
| Ownership / technology rights | `docs/marea/compliance/INTELLECTUAL-PROPERTY-CHAIN.md`; `BRAND-AND-IP-DECISION-PACKAGE.md` |
| Contracts and enforcement | `brand-identity.contract.json`; `scripts/check-brand.mjs` |
| Visual execution | `MC-04-VISUAL-IDENTITY-BRIEF.md` |
