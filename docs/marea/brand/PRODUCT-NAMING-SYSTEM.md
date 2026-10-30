# MAREA — Product naming system (MC-03 / B2)

| Field | Value |
| --- | --- |
| Document ID | MC-03 / B2 |
| Milestone | MC-03 — brand architecture and legal clearance policy (programme prompt 03) |
| Date | 2026-10-30 |
| Status | `PROPOSED` — naming rules for internal decision. **Names are proposed commercial identities, not approved SKUs**, and are not cleared for public use. |
| Owner | brand-strategist (specialist author). The Lead owns integration and the machine-readable contract. |
| Companion deliverables | `MAREA-BRAND-STRATEGY.md` (B1); `BRAND-VOICE-ES-EN.md` (Lead); `brand-identity.contract.json` (governance-engineer); `COMPETITIVE-POSITIONING-EVIDENCE.md`; `MC-04-VISUAL-IDENTITY-BRIEF.md`; `TRADEMARK-CLEARANCE-RESEARCH.md` |
| Authority order | `brand-identity.contract.json` (machine-checked) → this document (human-readable rules) → per-milestone product pages. If they conflict, the contract wins and this document must be updated. |
| Brand clearance | MAREA trademark legal clearance = **`NOT_GRANTED`** (`MC-02-BLOCKERS-AND-DECISIONS.md:113`). No registered or unregistered mark symbol may be attached to MAREA, in any document or surface. |
| Product/edition source | `COMMERCIAL-PORTFOLIO.md` (2026-10-30). Every edition below is cross-checked against it in §18. |

## 1. Purpose, status and scope

This document is the single human-readable naming standard for the proposed MAREA product family. It defines the layers, the canonical syntax, the approved vocabulary, the bundle identities, the rules for adding names, the forbidden forms, and the pre-publication checklist. It exists so that copy, pages, bundles, quotes, support articles and code-facing documents name the same things the same way — and so that the machine validator can enforce the same rules.

**Status constraints (apply to every name in this document):**

- All names are **proposed commercial identities**, not approved SKUs, not purchasable products, not trademarks.
- No name carries a registered/unregistered mark symbol; none may be described as registered, cleared, certified or approved.
- The nine **family tokens are fixed** for MC-03 (`NAV`, `HUB`, `AIS`, `PILOT`, `SENSE`, `WATCH`, `DISPLAY`, `WEATHER`, `FLEET`). Renaming a family is a programme decision recorded in the contract and approved by the Lead — not an editorial change.
- The six **bundle tokens are fixed** (`START`, `CRUISE`, `SAIL`, `PROTECT`, `COMPLETE`, `FLEET`) and preserve the identities already used in the portfolio.
- Nothing here authorises publication. Public use of the MAREA name remains gated on the clearance decision (X-01) and on the readiness stages in `MAREA-BRAND-STRATEGY.md` §12.2.

## 2. Naming principles

1. **One concept, one name.** A name identifies exactly one thing. If a name could mean two things (the `FLEET` product vs the `FLEET` bundle), a disambiguation rule is mandatory.
2. **Family first, qualifier second.** The family token carries the product's identity; editions, sizes and generations only qualify it and never replace it.
3. **Customer names, not engineering codes.** Commercial names are never derived from internal repository, firmware or SKU identifiers, and engineering identifiers never appear in marketing.
4. **Edition is commercial positioning, not evidence.** An edition name may not encode a hardware revision, a protocol version, a year, a release number or an unvalidated performance grade.
5. **Invariant tokens across locales.** `MAREA`, family, edition, size and bundle tokens are identical in every language; only surrounding descriptors are localised.
6. **No invented suffixes as solutions.** Generic suffixes do not resolve trademark conflicts and are prohibited as naming logic; clearance is a legal process, not a naming exercise (`MARKET-BENCHMARKS.md:27`).
7. **No availability in names.** A name never contains "available", "new", "coming soon", "launch", "edition of the year", a price or a date.
8. **No superiority in names.** No family or edition token implies certifications, safety, accuracy, autonomy or market leadership.
9. **Machine-checkable by default.** Every rule in this document should be expressible in the validator; a rule that cannot be checked should be flagged as a human review item.
10. **Change is registered, not published.** New names enter through the contract and the validator before they enter any page, quote or listing.

## 3. The ten naming layers

| # | Layer | Canonical form | Customer-facing? | Worked example | Rule |
| --- | --- | --- | --- | --- | --- |
| 1 | **Master brand** | `MAREA` | Yes (when allowed) | MAREA | Always uppercase, always first, never shortened, never translated. |
| 2 | **Product family** | `MAREA <FAMILY>` | Yes | MAREA HUB | FAMILY is one of the fixed nine, uppercase, single token, from `brand-identity.contract.json`. |
| 3 | **Product edition** | `MAREA <FAMILY> <Edition>` | Yes | MAREA NAV Pro | Edition title case, single word, from the approved vocabulary in §7; only when it distinguishes a purchasable-or-proposed configuration. |
| 4 | **Generation** | `MAREA <FAMILY> [Edition|Size] <Generation>` | Reserved | (not permitted today) | Reserved layer: no generation token is approved for customer-facing use. Generation is never a number-only suffix or roman numeral. Hardware revisions belong to engineering identifiers (§10). |
| 5 | **Hardware size** | `MAREA <FAMILY> <Size>` | Yes | MAREA DISPLAY 7 | Digits only, no unit; only for size-driven families as registered in the contract; today only DISPLAY. |
| 6 | **Accessories** | `MAREA <FAMILY> <descriptive accessory name>` | Not yet approved | (descriptive only — see §9) | Accessories are not families and are not editions; a customer-facing accessory name must be registered before use and may never reuse edition tokens. |
| 7 | **Bundles** | `MAREA <BUNDLE>` | Yes (as proposed solutions) | MAREA START | One of the fixed six bundle tokens; bundles never take edition/size suffixes; FLEET has a disambiguation rule (§11). |
| 8 | **Subscription plans** | `MAREA <FAMILY> <Edition>` + term metadata | Yes | MAREA WEATHER Pro (annual) | Plan identity reuses the family+edition tokens; term, VAT basis and billing basis are metadata outside the name, never part of it. |
| 9 | **Version/release numbers** | `MAJOR.MINOR.PATCH`, internal/support only | Not in product names | MAREA NAV 3.2.0 (support form; illustrative) | Version strings never appear in a commercial product name; they belong to release notes, support and engineering. |
| 10 | **Commercial vs engineering identifiers** | Commercial = layers 1–8; engineering = separate namespace | Engineering never customer-facing | `nav.pro` (entitlement key; illustrative format) | Engineering identifiers are lowercase/dotted or internal codes, never published as names; they never contain the customer-facing form. |

## 4. Canonical syntax and position rules

### 4.1 The template

```
MAREA <FAMILY> [Edition] [Size] [Generation]
```

- **Position 1 (fixed):** `MAREA` — master brand. Nothing may precede it inside the name.
- **Position 2 (required):** `<FAMILY>` — one of `NAV`, `HUB`, `AIS`, `PILOT`, `SENSE`, `WATCH`, `DISPLAY`, `WEATHER`, `FLEET`.
- **Position 3 (optional):** `[Edition]` — approved edition token, title case.
- **Position 4 (optional):** `[Size]` — digits only, size-driven families only.
- **Position 5 (reserved):** `[Generation]` — no generation token is approved today.
- **Separator:** exactly one space (U+0020) between every pair of tokens. No other characters join brand tokens.

> **Contract alignment note.** The current `brand-identity.contract.json` (`namingRules.canonicalSyntax`) expresses the template as `MAREA <FAMILY> [<Edition>] [<Size or Generation>]` and documents a provisional `Gen <n>` generation pattern. MC-03 approves **no generation token** for customer-facing use, so the practical template is `MAREA <FAMILY> [Edition] [Size]`, with Generation reserved as the final position if it is ever registered. The Lead/governance owner should align the contract's canonicalSyntax wording with the position rules below.

### 4.2 Position rules

1. **Edition before size.** If a future registered product needs both, the order is Edition then Size (`MAREA DISPLAY Pro 7` would be the grammatical order — but see rule 4.3: not permitted today). Today edition and size are **mutually exclusive** in customer-facing names.
2. **Size last among current qualifiers.** In the current portfolio the size is the only qualifier for DISPLAY, so the name ends with the size (`MAREA DISPLAY 7`).
3. **Generation, if ever approved, is always last** and requires a contract registration before use.
4. **No qualifier before the family.** Constructions that put a descriptor first (`Pro MAREA NAV`, `Essential MAREA NAV`) are not MAREA names; a localized descriptor may appear in surrounding copy ("the Pro edition of MAREA NAV") but not inside the name.
5. **One optional qualifier today.** In MC-03, a customer-facing name is at most `MAREA <FAMILY>` or `MAREA <FAMILY> <one qualifier>`.
6. **Bundles are their own template** (`MAREA <BUNDLE>`) and never mix with the family template.

### 4.3 Combination matrix (what may follow the family token)

| Qualifier | Allowed today? | Applies to | Rule |
| --- | --- | --- | --- |
| Edition | Yes | NAV, HUB, AIS, PILOT, SENSE, WATCH, WEATHER, FLEET | Approved vocabulary only (§7); title case; single token. |
| Size | Yes | DISPLAY only | Digits only; sizes provisional until enclosure verification (`COMMERCIAL-PORTFOLIO.md:87`). |
| Edition + size together | **No** | — | Not in the current portfolio; would require contract registration with the Edition-then-Size order. |
| Generation | **No** | — | Reserved; no token approved. |
| Version / revision / year | **Never** | — | Engineering and release namespace only (§10). |
| Second family token | **Never** | — | One family per name; combinations are expressed as bundles. |
| Word "package"/"bundle" | FLEET exception only | FLEET | See §11 disambiguation; lowercase descriptor outside the brand token. |
| Marketing adjective ("Ultra", "Max", "AI", "Smart") | **No** | — | Not an approved edition; requires vocabulary change, not copy invention. |

## 5. Capitalisation, separators and typography

| Rule | Requirement |
| --- | --- |
| Master brand | `MAREA` — all capitals, no accent, never `Marea`/`Maréa`/`MARéA` in a name. In Spanish running text the word may appear as a noun in a sentence, but the brand name itself stays `MAREA`. |
| Family token | All capitals (`NAV`, `HUB`, `AIS`, `PILOT`, `SENSE`, `WATCH`, `DISPLAY`, `WEATHER`, `FLEET`). |
| Edition token | Title case, one word (`Essential`, `Pro`, `Standard`, `Receiver`, `Connected`, `Coastal`, `Sail`, `Essentials`, `Systems`, `Core`, `Plus`, `Start`, `Business`, `Enterprise`). Never all caps, never camelCase. |
| Size token | Arabic digits only (`7`, `10`, `12`). No unit, no unit symbol, no "inch", no "pulgada". |
| Bundle token | All capitals (`START`, `CRUISE`, `SAIL`, `PROTECT`, `COMPLETE`, `FLEET`). |
| Separators inside a name | Exactly one space (U+0020). No hyphen, en dash, em dash, slash, backslash, underscore, dot, middle dot, colon, comma, parentheses, plus sign, ampersand, apostrophe or quotation marks between brand tokens. |
| Punctuation after a name | Normal sentence punctuation is allowed; a hyphen may join the name to a following word in running text ("the MAREA NAV-based workflow" is acceptable only if it does not change the name; prefer rephrasing). |
| Trademark symbols | Never. No registered-mark or unregistered-mark symbol is permitted next to MAREA, a family or a bundle until a clearance decision exists. |
| Accents/diacritics | Never inside a brand token. `MAREA` is written without an accent even though the Spanish common noun "marea" has no written accent; no invented accent marks. |
| Plural/inflection | Brand tokens do not inflect. Write "two MAREA HUB units", never the family token pluralised. |

## 6. What never combines (hard rules)

1. **Edition + hardware revision number** — a revision is an engineering fact, not a commercial edition (`MAREA HUB Pro` is not `MAREA HUB Pro 2`).
2. **Edition + release/version/year** — no `v2`, `2.0`, `II`, `Mk2`, `2026`, "second generation" in a customer-facing name.
3. **Edition + size** in the current portfolio; only a registered future product may combine them.
4. **Bundle + family/edition** — bundles are compositions; write `MAREA START`, never `MAREA START HUB` or `MAREA START Pro`.
5. **Two family tokens** in one name — combinations are bundles or copy, never product names.
6. **Family + certification/interoperability word** — no `NMEA 2000`, `CE`, `RED`, `AIS Certified` inside a name; protocol and compliance statements belong to the compatibility/claims copy with evidence (`MC-02-BLOCKERS-AND-DECISIONS.md:83`).
7. **Family + availability/marketing words** — no "available", "new", "coming soon", "launch", "limited", "sale", "price", "AI", "smart", "cloud", "ultra", "max" as part of a name.
8. **Name + owner/attribution string** — no "by [entity]" or "a brand of" inside a product name; attribution is a separate line governed by the contract.
9. **Commercial name + engineering identifier** — no `MAREA HUB rev-C`, no `open-marine NAV`, no workspace/SKU code in the name.
10. **Competitor names or "compatible with X"** — compatibility is a tested statement in copy, never a name.

## 7. Approved edition vocabulary

Edition tokens are a controlled vocabulary. A token not in this table is not a MAREA edition, even if it appears in a product sentence.

| Edition token | Used by | Commercial meaning | Constraint |
| --- | --- | --- | --- |
| `Essential` | NAV | Entry software tier: planning, licensed-chart-capable access, waypoints/logbook | Does not imply charts included (`COMMERCIAL-PORTFOLIO.md:24`). |
| `Pro` | NAV, HUB, WEATHER | Higher tier: more capability, more supported inputs/regions/integration | "Pro" is a commercial tier, not a professional certification, not a safety claim. |
| `Standard` | HUB, WEATHER | Base tier with a documented compatibility scope | Scope must be published before use. |
| `Receiver` | AIS | Base receive-only package with compatible output | Never implies transmit or transponder. |
| `Connected` | AIS | Receive-only package with documented richer networking/diagnostics | Still receive-only. |
| `Coastal` | PILOT | Supervised steering edition for supported steering/rudder types | Not sellable until safety gate clears (H-01). |
| `Sail` | PILOT | Supervised steering edition with verified wind modes | Not sellable until safety gate clears (H-01). |
| `Essentials` | SENSE | Base monitoring set (battery/bilge) | Distinct from `Essential` (NAV); do not interchange. |
| `Sail` | SENSE | Wind/environment sensor set | Reuses the `Sail` token in a different family; acceptable because the family scopes it. |
| `Systems` | SENSE | Expanded engine/utility conditions where appropriate | Scope subject to measured-signal list (P-05). |
| `Core` | WATCH | Essential monitored inputs | Recurring monitoring service must be disclosed separately. |
| `Plus` | WATCH | Additional inputs/alert rules/history/organisation sharing | No monitoring-inclusion assumption. |
| `Start` | FLEET | Small-fleet SaaS tier | Reuses the `START` bundle string with different case and context; bundle and edition must never be confused (§11). |
| `Business` | FLEET | Permissions/workflows/reports tier | No enterprise SLA implied. |
| `Enterprise` | FLEET | Audited accounts, custom integrations, volume terms/SLA | Only when real terms exist; no invented SLA. |

**Edition rules:**

1. Editions are tier/scope descriptors. They never assert accuracy, safety, autonomy, certification or measured performance.
2. `Pro` never means "professional-grade", "certified" or "approved"; it means the higher commercial tier.
3. `Sail` used by both PILOT and SENSE is deliberate and scoped by the family token; it must always appear with its family (`MAREA PILOT Sail`, `MAREA SENSE Sail`).
4. `Essential` and `Essentials` are different tokens for different families and must not be interchanged.
5. No edition token may be a number, a year, a roman numeral, a version, a revision letter, or a hardware size.
6. No "Pro+", "Pro Max", "Plus Plus", "Elite", "Premium" invention.
7. The unqualified family name is valid and means "the family" in editorial copy; it must not be used as a substitute for an edition in a quote, configuration or bundle composition.

## 8. Size vocabulary and the reserved generation layer

### 8.1 Hardware size

- The size token is the **nominal display diagonal in inches**, written as digits only. It is a differentiator only when a family ships in multiple verified sizes.
- Today only `DISPLAY` uses sizes: `7`, and `10`/`12` as provisional names pending verified enclosure/manufacturing capability (`COMMERCIAL-PORTFOLIO.md:87`).
- The size never appears with a unit in the name (`MAREA DISPLAY 7`, not "7-inch" or "7 in" or a double-prime mark). Descriptive copy may say "7-inch display".
- No other family may take a size token without contract registration. HUB ports, AIS channels and SENSE module counts are **not** sizes and must not appear in names.
- A size number is not a performance claim; it must match the verified product specification or remain labelled provisional.

### 8.2 Generation (reserved, not permitted today)

- The generation layer exists so that a future multi-generation hardware product can be named coherently. It is **reserved**: no generation token is approved for customer-facing use in MC-03.
- When approved, it will be the last token (`MAREA <FAMILY> [Edition|Size] <Generation>`) and will be registered in the contract with an explicit vocabulary. It will never be a bare number, a roman numeral or a letter.
- Hardware revisions, board revisions, protocol revisions and firmware versions are engineering identifiers (§10), never generations and never editions.
- A generation change must never silently alter an edition's meaning: a customer who buys `MAREA HUB Pro` must be able to tell whether a later hardware generation changes compatibility. That is a product/copy obligation, not a naming trick.

## 9. Accessories

- Accessories (mounts, cabling, antennas, power items, installation kits) are **not** product families and **not** editions.
- No accessory name is approved in the portfolio. The portfolio explicitly leaves antenna/splitter, cabling, mounts, steering drives and SIM/communications to be specified and priced (`COMMERCIAL-PORTFOLIO.md:124`).
- Until registered, accessories are described by their function in copy ("display mount", "AIS antenna kit") and may be listed in internal catalogues as `<FAMILY> <function>` (e.g. `HUB power cable`) in a lowercase descriptive form. This is **not** a MAREA brand name and must not be formatted as one.
- A customer-facing accessory name requires: registration in the contract, a check that it cannot be mistaken for a family or edition, and the same no-claims rules as products.
- Accessories must never take edition tokens (`MAREA HUB Pro mount`) or imply compatibility beyond the tested matrix.

## 10. Commercial vs engineering identifiers

| Identifier class | Form | Example (illustrative format, not an approved real value) | Audience | Rules |
| --- | --- | --- | --- | --- |
| Commercial product name | Layers 1–5 | `MAREA HUB Pro` | Customers, public copy | This document controls it. |
| Commercial bundle name | `MAREA <BUNDLE>` | `MAREA START` | Customers | One of six fixed tokens. |
| Subscription plan identity | Family + edition + term metadata | `MAREA NAV Pro`, annual | Customers | Term/VAT/billing basis are metadata; no price or date in the name. |
| Entitlement key | lowercase dotted namespace | `nav.pro` | Commerce/support systems | Never displayed as a product name; may appear in technical documentation. |
| SKU / part code | internal uppercase alphanumeric code | `HUB-STD-01` | Procurement, admin, support | Format example only — **no approved SKU exists**; never use a code as a name. |
| Firmware / software version | semver, `MAJOR.MINOR.PATCH` (+ build metadata internally) | `3.2.0` | Engineering, support | Never in a commercial name; support articles may write `MAREA NAV 3.2.0` as a support form. |
| Hardware revision | internal designator (`rev`, board revision, build) | internal only | Engineering, compliance | Never customer-facing; never encoded in an edition. |
| Repository/workspace identifier | lowercase/hyphenated engineering namespace | `open-marine/*` | Engineering | `OPEN-MARINE` is an internal/open engineering identifier, never the public product brand; its rights are `NOT_CLEARED` (`MC-02-BLOCKERS-AND-DECISIONS.md:37-39`). |
| Analytics/telemetry/device identifiers | opaque, internal | — | Operations | Never derived from a customer-facing name; never displayed as a product. |

**Separation rules:** a code may never be "prettified" into a brand name, and a brand name may never be used as a primary key. Engineering identifiers must not appear in customer-facing surfaces; where they must appear in technical documentation, they must be clearly marked as engineering identifiers. No engineering identifier may contain the `MAREA` token in a public repository before the clearance/ownership decision, so that the proposed mark does not leak into unlicensed code or documentation.

## 11. Bundles and the FLEET disambiguation rule

### 11.1 The six bundle identities

Bundle names are `MAREA <BUNDLE>` — all capitals, one token, no edition/size suffix. They are **proposed solution framings**, not purchasable packages; every bundle is currently `CONCEPT` because at least one included family is `BLOCKED` or `BUILD` (see `MAREA-BRAND-STRATEGY.md` §12.3).

| Bundle | Contract id | Minimum content promise (from `COMMERCIAL-PORTFOLIO.md:114-121`) | Customer outcome (proposed) | Naming/offer rule |
| --- | --- | --- | --- | --- |
| `MAREA START` | `START` | NAV + compatible HUB | Connect existing onboard data to modern navigation | Never "MAREA START bundle"; never add editions to a bundle name. |
| `MAREA CRUISE` | `CRUISE` | NAV + HUB + receive-only AIS + DISPLAY | Combined navigation and traffic awareness | AIS must be written "receive-only" in bundles copy; no transponder implication. |
| `MAREA SAIL` | `SAIL` | NAV + HUB + PILOT + compatible wind measurement | Sail-focused integrated helm | PILOT safety gate applies; bundle cannot be offered while PILOT is blocked. |
| `MAREA PROTECT` | `PROTECT` | WATCH + essential sensors | Unattended monitoring | No distress/theft-guarantee language; WATCH recurring service disclosed. |
| `MAREA COMPLETE` | `COMPLETE` | NAV, instruments, monitoring, display, supervised pilot (only after its safety gate) | Coordinated boat integration | Never reuse the portfolio's "certified" wording (`COMMERCIAL-PORTFOLIO.md:120`); use "supervised pilot, subject to safety-gate completion". |
| `MAREA FLEET package` | `FLEET` | Vessel SaaS, onboarding, optionally hardware and communications | Fleet operations | See §11.2: the product is `MAREA FLEET`; the bundle is `MAREA FLEET package`. |

### 11.2 FLEET product-versus-package disambiguation (mandatory)

`FLEET` is both a product family (the multi-vessel SaaS) and a bundle identity (the integrated B2B offering). The rule:

1. **`MAREA FLEET`** always means the **product family** — the professional multi-vessel SaaS (`COMMERCIAL-PORTFOLIO.md:104-111`). Use it for product pages, editions (`MAREA FLEET Start/Business/Enterprise`), entitlements and support.
2. **`MAREA FLEET package`** always means the **bundle** — the integrated B2B offering of SaaS + onboarding, optionally hardware and communications (`COMMERCIAL-PORTFOLIO.md:121`). The lower-case word "package" is a descriptor outside the brand token; it is never capitalised into the name.
3. **Localised descriptor:** in Spanish write `paquete MAREA FLEET` (lower-case descriptor); the brand token stays `MAREA FLEET`.
4. **Forbidden ambiguous contexts:** a page, quote, table or contract line that says only "MAREA FLEET" while describing the integrated offering; a bundle list that writes "MAREA FLEET" where the other rows are bundles; a proposal that mixes the SaaS subscription price and the integrated package price without labels. When in doubt, write the full disambiguated form (`MAREA FLEET` product or `MAREA FLEET package`).
5. **Approval signal:** the contract keeps bundle id `FLEET` and family id `FLEET`; the validator and the brand contract are the tie-break if any document is ambiguous.
6. **Integration note (contract v1.0.0) — reconciled:** the contract keeps the machine `displayName` "MAREA FLEET" for bundle id `FLEET` (a validator invariant) **and** records `customerFacingName: "MAREA FLEET package"`, with `fleetDisambiguation` stating that the customer-facing bundle form is always `MAREA FLEET package`. `BRAND-ARCHITECTURE.md:67,101-102` and this naming system use the same two forms. No divergence remains: bare ambiguous use is still forbidden, and a third form must never be improvised.

## 12. Worked examples by family

Canonical names only; per-family forbidden variants are in §13, consolidated wrong-pattern rules are in §14.

| Family | Family name | Edition/size names (approved tokens only) | Full canonical examples |
| --- | --- | --- | --- |
| NAV | MAREA NAV | Essential, Pro | `MAREA NAV`; `MAREA NAV Essential`; `MAREA NAV Pro` |
| HUB | MAREA HUB | Standard, Pro | `MAREA HUB`; `MAREA HUB Standard`; `MAREA HUB Pro` |
| AIS | MAREA AIS | Receiver, Connected | `MAREA AIS`; `MAREA AIS Receiver`; `MAREA AIS Connected` |
| PILOT | MAREA PILOT | Coastal, Sail | `MAREA PILOT`; `MAREA PILOT Coastal`; `MAREA PILOT Sail` |
| SENSE | MAREA SENSE | Essentials, Sail, Systems | `MAREA SENSE`; `MAREA SENSE Essentials`; `MAREA SENSE Sail`; `MAREA SENSE Systems` |
| WATCH | MAREA WATCH | Core, Plus | `MAREA WATCH`; `MAREA WATCH Core`; `MAREA WATCH Plus` |
| DISPLAY | MAREA DISPLAY | size tokens 7 / 10 / 12 (10 and 12 provisional) | `MAREA DISPLAY`; `MAREA DISPLAY 7`; `MAREA DISPLAY 10`; `MAREA DISPLAY 12` |
| WEATHER | MAREA WEATHER | Standard, Pro | `MAREA WEATHER`; `MAREA WEATHER Standard`; `MAREA WEATHER Pro` |
| FLEET | MAREA FLEET | Start, Business, Enterprise | `MAREA FLEET`; `MAREA FLEET Start`; `MAREA FLEET Business`; `MAREA FLEET Enterprise` |

### 12.1 Subscription-plan naming examples

| What is sold | Plan/name form | Notes |
| --- | --- | --- |
| NAV Essential subscription | `MAREA NAV Essential` (annual) | Term is metadata; no price in the name; chart data separately licensed. |
| NAV Pro subscription | `MAREA NAV Pro` (annual) | Compatible live instruments/overlays; no chart-inclusion implication. |
| WEATHER Standard / Pro | `MAREA WEATHER Standard` / `MAREA WEATHER Pro` (annual) | Standalone; shared forecast entitlements with NAV Pro must not be billed twice. |
| WATCH edition + monitoring | `MAREA WATCH Core` / `MAREA WATCH Plus`, with monitoring service disclosed separately | The recurring monitoring service is currently unnamed; describe it as "monitoring service" in copy until a token is registered. |
| FLEET organisation plan | `MAREA FLEET Start` / `Business` / `Enterprise` (per-vessel basis, ex VAT for B2B) | Billing basis/term are metadata; the bundle form is `MAREA FLEET package`. |

**Term words** ("annual", "monthly", "per vessel", "ex VAT") are lowercase metadata in copy and never part of the name. A plan name may not contain a price, a discount, a date or a countdown.

## 13. The nine-family register

Promises below are **proposed capability statements**, not availability claims. Every surface must display the lifecycle state alongside the name (`COMMERCIAL-PORTFOLIO.md:142-147`); today all nine are `CONCEPT`/`DEFINED`.

| ID | Display name | Domain | Customer promise (proposed, readiness-honest) | Editions / sizes | ❌ Forbidden variants (do not write) |
| --- | --- | --- | --- | --- | --- |
| `NAV` | MAREA NAV | Software navigation | "Plan and follow routes with licensed-chart-capable mapping and compatible onboard data, offline where licensed." | Essential, Pro | Marea Nav; MAREA-NAV; MareaNav; MAREA NAV v2; MAREA NAV Pro 2.0; MAREA NAV Essentials; NAV by MAREA |
| `HUB` | MAREA HUB | Physical connectivity / onboard data gateway | "Bring supported onboard equipment data into one local interface, with a documented compatibility scope." | Standard, Pro | Marea Hub; MAREA-HUB; MareaHub; MAREA HUB v2; MAREA HUB Standard Pro; MAREA HUB Pro rev C |
| `AIS` | MAREA AIS | Marine traffic receive-only equipment | "Receive-only traffic awareness with CPA/TCPA decision support and declared limits." | Receiver, Connected | Marea Ais; MAREA-AIS; MareaAis; MAREA AIS Receiver Pro; MAREA AIS Transponder |
| `PILOT` | MAREA PILOT | Steering control | "Supervised steering within a documented compatibility envelope — proposed, not available." | Coastal, Sail | Marea Pilot; MAREA-PILOT; MareaPilot; MAREA PILOT Autopilot; MAREA PILOT Pro; MAREA PILOT Coastal Sail |
| `SENSE` | MAREA SENSE | Sensors / instruments | "Measured wind, environmental and vessel inputs, exposed only as tested measured signals." | Essentials, Sail, Systems | Marea Sense; MAREA-SENSE; MareaSense; MAREA SENSORS; MAREA SENSE Essential; MAREA SENSE Module Pro |
| `WATCH` | MAREA WATCH | Monitoring / remote alerts | "Remote position, status and event alerts while ashore, within connectivity limits." | Core, Plus | Marea Watch; MAREA-WATCH; MareaWatch; MAREA WATCH Pro; MAREA WATCH Monitoring Pro; MAREA WATCH v2 |
| `DISPLAY` | MAREA DISPLAY | Multifunction display | "A fixed marine display for approved MAREA interfaces, readable day and night." | sizes 7 (10/12 provisional) | Marea Display; MAREA-DISPLAY; MareaDisplay; MAREA DISPLAY 7in; MAREA DISPLAY VII; MAREA DISPLAY 7 Pro |
| `WEATHER` | MAREA WEATHER | Forecast service | "Planning forecasts with source provenance, validity windows and uncertainty." | Standard, Pro | Marea Weather; MAREA-WEATHER; MareaWeather; MAREA WEATHER Basic; MAREA WEATHER Forecast Pro; MAREA WEATHER v2 |
| `FLEET` | MAREA FLEET | Professional multi-vessel SaaS | "Multi-vessel operational records, oversight and reports for organisations." | Start, Business, Enterprise | Marea Fleet; MAREA-FLEET; MareaFleet; MAREA FLEET Pro; MAREA FLEET bundle; MAREA FLEET Enterprise SaaS |

**Family table rules:** the "Forbidden variants" column is a negative example set, not an alternative spelling guide. It is tolerated by the validator because the table header and cells mark negative context. Renaming a family, adding a tenth, or changing a domain requires the registration process in §15.

## 14. Forbidden patterns — consolidated table

| # | ❌ Forbidden form (do not write) | Why it is wrong | Canonical form |
| --- | --- | --- | --- |
| F-01 | Marea Nav; Marea Hub; Marea Ais; Marea Pilot; Marea Sense; Marea Watch; Marea Display; Marea Weather; Marea Fleet | Title-case master brand; the brand and family tokens are invariant capitals | `MAREA NAV`, `MAREA HUB`, etc. |
| F-02 | MAREA-NAV; MAREA-HUB; MAREA-AIS; MAREA-PILOT; MAREA-SENSE; MAREA-WATCH; MAREA-DISPLAY; MAREA-WEATHER; MAREA-FLEET | Hyphenated compound; the separator between brand tokens is one space | `MAREA NAV`, `MAREA HUB`, etc. |
| F-03 | MareaNav; MareaHub; MareaAis; MareaPilot; MareaSense; MareaWatch; MareaDisplay; MareaWeather; MareaFleet | Concatenated camelCase; family token is a separate word | `MAREA NAV`, `MAREA HUB`, etc. |
| F-04 | MAREA NAV v2; MAREA HUB v2; MAREA NAV II; MAREA HUB 2.0 | Version/generation/roman numeral in a customer-facing name; those layers are reserved or internal | `MAREA NAV` + release number only in support notes |
| F-05 | MAREA HUB Pro 2; MAREA HUB Pro rev C; MAREA HUB Standard Rev-B | Edition encoding a hardware revision; revisions are engineering identifiers | `MAREA HUB Pro` + internal revision in engineering docs |
| F-06 | MAREA NAV Essentials; MAREA SENSE Essential; MAREA WATCH Pro; MAREA AIS Receiver Pro; MAREA FLEET Pro; MAREA PILOT Pro | Edition tokens not in the approved vocabulary or applied to the wrong family | Use the family's approved editions in §7/§13 |
| F-07 | MAREA DISPLAY 7in; MAREA DISPLAY 7-inch; MAREA DISPLAY VII; MAREA DISPLAY 7 Pro | Unit, roman numeral or edition+size mixing in a size-driven name | `MAREA DISPLAY 7` |
| F-08 | MAREA START HUB; MAREA START Pro; MAREA FLEET bundle; MAREA FLEET Bundle; MAREA FLEET PACKAGE | Bundle name mixed with family/edition or wrongly capitalised; FLEET ambiguity | `MAREA START`; `MAREA FLEET package` |
| F-09 | MAREA NMEA 2000 Certified; MAREA CE Certified; MAREA AIS Certified; MAREA NAV ECDIS | Certification/compliance word inside a name; no certificate exists (`MC-02-BLOCKERS-AND-DECISIONS.md:83-85`) | Certification statements never belong to names |
| F-10 | MAREA NAV AI; MAREA Smart HUB; MAREA Cloud Fleet; MAREA NAV Ultra; MAREA HUB Max | Marketing adjective treated as a name; not approved vocabulary | Unqualified family or approved edition only |
| F-11 | MAREA by Open Marine; MAREA by OPEN-MARINE; EMBARCARTE by MAREA; MAREA, a brand of Open Marine | Malformed attribution; OPEN-MARINE is an internal engineering identifier and the owner relationship is not cleared | Canonical attribution strings live in `brand-identity.contract.json` |
| F-12 | open-marine NAV; marine-sensor-gateway HUB; HUB-STD-01 Pro | Engineering identifier or SKU code presented as a product name | `MAREA HUB` / `MAREA HUB Pro` |
| F-13 | NAV by MAREA; Pro MAREA NAV; Essential MAREA NAV; the MAREA NAV Subscription | Descriptor before/inside the name or a non-name word appended | `MAREA NAV Essential`; "subscription to MAREA NAV" in copy |
| F-14 | Marea; MARÉA; MAREA,; MAREA / NAV | Wrong brand rendering, accent, or punctuation joining tokens | `MAREA`; `MAREA NAV` |

Negative-example convention: rows F-01…F-14 are marked forbidden by the table header and the ❌ marker; the brand validator is expected to tolerate explicit negative context and will flag these forms elsewhere.

## 15. Adding future products, editions, sizes and accessories

No name enters any listing, page, quote or contract before the steps below are complete. The process is deliberately short but non-skippable.

1. **Proposal.** Submit: proposed family/token, domain, one-sentence customer promise, proposed editions/sizes, lifecycle expectation, bundle participation, and the honest current readiness state.
2. **Strategic fit review.** Check the name fits the ecosystem logic (`MAREA-BRAND-STRATEGY.md` §9), does not create a second meaning (e.g. product vs bundle), and does not imply a certification, performance or availability claim.
3. **Legal review input.** Every new family or edition needs a fresh similarity screening; adding a generic suffix does not avoid conflicts (`MARKET-BENCHMARKS.md:27`). The trademark workstream (`TRADEMARK-CLEARANCE-RESEARCH.md`) and counsel decide — naming cannot clear a mark.
4. **Contract registration.** Add the family/edition/size/accessory to `brand-identity.contract.json` (owned by the governance workstream, not this document) with: id, displayName, domain, edition vocabulary, bundle participation and contractVersion increment. The contract is the machine source of truth.
5. **Validator update.** Extend `scripts/check-brand.mjs` expectations for the new token and run `npm run test:brand` (exposed by the Lead; until then `node scripts/check-brand.mjs`). A tenth family also requires the validator's fixed nine-family set to change — a Lead/governance decision, not a local edit.
6. **Document update.** Add the token to this naming system (layers, vocabulary, register, forbidden table if needed) and to `BRAND-VOICE-ES-EN.md` if new message keys are required.
7. **Bundle/offer mapping.** Decide which bundles may reference it; a bundle may not include a product whose readiness gate blocks sale.
8. **Bilingual registration.** Register ES/EN descriptors and message keys; brand tokens remain invariant.
9. **Independent check.** The brand validator plus an independent reviewer (a different agent/author) confirm the name in the real diff.
10. **Publication gate.** Only then may the name appear externally — and only if the trademark and readiness gates for the product itself allow it.

**Edition/size/accessory additions** follow the same path at their layer: register token, update vocabulary and forbidden patterns, run the validator, ensure no confusion with existing tokens (e.g. a new token must not be a casing variant of a bundle id).

## 16. Pre-publication naming checklist

Run this checklist for every page, quote, bundle card, support article and public asset. Any "no" blocks publication.

- [ ] Master brand is `MAREA` (capitals, no accents, no symbol) and appears first.
- [ ] The family is one of the nine fixed tokens and is capitalised exactly.
- [ ] Any edition is in the approved vocabulary and applies to that family.
- [ ] No size token outside DISPLAY; sizes are digits only and match the verified/provisional spec.
- [ ] No version, generation, roman numeral, year or hardware revision in the name.
- [ ] No edition+size, bundle+family, or two-family combination without contract registration.
- [ ] The name reads the same in ES and EN; only descriptors are localised.
- [ ] FLEET is disambiguated: `MAREA FLEET` (product) or `MAREA FLEET package` (bundle), with no ambiguous bare use.
- [ ] Bundle names are the six fixed tokens with the portfolio's minimum content promise; no blocked product presented as included/purchasable.
- [ ] Attribution uses only the canonical strings from `brand-identity.contract.json`; no technology-project attribution.
- [ ] No certification, safety, accuracy, autonomy or availability language in or beside the name; readiness state displayed.
- [ ] No price, stock or launch date attached unless separately approved (none are approved today).
- [ ] The name is registered in the contract and `npm run test:brand` passes on the current tree.
- [ ] An independent reviewer has checked the real diff, not this checklist alone.

## 17. International and bilingual naming rules

- **Invariant tokens:** `MAREA`, all nine families, all bundle tokens, edition tokens and sizes are identical in every locale. No translation, transliteration or local nickname.
- **Descriptors, not names:** translate "app", "display", "subscription", "monitoring service", "package/paquete" and similar descriptive words; never translate a brand token.
- **`MAREA` meaning:** the word is Spanish for "tide" and a common word in Spanish/Portuguese/Italian. That is a strategic asset for comprehension and a distinctiveness risk for trademark; the name must never rely on the meaning as a differentiator, and the trademark research owns the risk analysis. No "tide" tagline is created by this document.
- **No geography inside names:** expansion to new markets does not create regional name variants; regulated/support/legal material is localised instead (`WEBSITE-AND-ROADMAP.md:73-74`).
- **URL coherence:** locale is a URL variant of the same identity (`/marea/...` vs `/en/marea/...`), not a different product name (`WEBSITE-AND-ROADMAP.md:16-37`).
- **No suffix-based naming for markets:** adding `MARINE`, country names or language tokens to escape conflicts or localise is prohibited; suffix additions do not avoid conflicts (`MARKET-BENCHMARKS.md:27`).

## 18. Cross-check against the commercial portfolio and open naming points

| Family | Portfolio edition reference | Naming-system status | Note |
| --- | --- | --- | --- |
| NAV | `COMMERCIAL-PORTFOLIO.md:24` | MATCH: Essential, Pro | `Essential` is singular; `Essentials` is SENSE-only. |
| HUB | `:35` | MATCH: Standard, Pro | SKU/ports frozen only after hardware design; name unaffected. |
| AIS | `:46` | MATCH: Receiver, Connected | Receive-only must appear in bundles copy. |
| PILOT | `:57` | MATCH: Coastal, Sail | "vessel-specific Pro installations" is an installation grade, not an edition — see open point N-01. |
| SENSE | `:67` | MATCH: Essentials, Sail, Systems | "individual SENSE modules" are descriptive modules, not families or editions — see N-02. |
| WATCH | `:77` | MATCH: Core, Plus | Recurring monitoring service is not named — see N-03. |
| DISPLAY | `:87` | MATCH: 7; 10/12 provisional | Sizes depend on verified enclosure/manufacturing capability. |
| WEATHER | `:97` | MATCH: Standard, Pro | Standalone service; no double billing with NAV Pro. |
| FLEET | `:107` | MATCH: Start, Business, Enterprise | Product `MAREA FLEET`; bundle `MAREA FLEET package` — see N-04. |
| Bundles | `:114-121` | MATCH: six fixed tokens | All `CONCEPT`; none purchasable while included products are blocked. |

**Open naming points (for the Lead/MC-03 integration):**

- **N-01 — PILOT "Pro installations".** The portfolio refers to "vessel-specific Pro installations" (`COMMERCIAL-PORTFOLIO.md:57`). This is an installation/configuration grade, not a product edition; write `MAREA PILOT` + a quoted "Pro installation" only in B2B quote contexts, never as `MAREA PILOT Pro`.
- **N-02 — SENSE individual modules.** The portfolio sells "individual SENSE modules" (`:67`) without naming them. Until a module vocabulary is registered, describe modules by measured function ("battery module", "bilge module"); they are not families and must not take edition tokens.
- **N-03 — WATCH recurring service.** The monitoring service (from EUR 9.90/month in the portfolio hypothesis, `:78`) has no approved name. Describe it as "monitoring service"; do not create a token in copy.
- **N-04 — FLEET dual identity.** Resolved by §11.2; the contract keeps both ids and the human-readable forms differ by the `package` descriptor.
- **N-05 — COMPLETE "certified" wording.** `COMMERCIAL-PORTFOLIO.md:120` contains "certified supervised pilot", contradicting the PILOT safety/conformity status (`MC-02-BLOCKERS-AND-DECISIONS.md:80,101`). Do not reuse the phrase; the portfolio should be corrected to "supervised pilot, subject to safety-gate completion".
- **N-06 — START price hypothesis.** The EUR 499 START hypothesis (`COMMERCIAL-PORTFOLIO.md:116`) is above the sum of its stated lowest editions (EUR 448, `:24-25,:35-36`); this is a pricing-hypothesis reconciliation for MC-04A, not a naming issue, and no price may be published meanwhile.
- **N-07 — provisional DISPLAY sizes.** `10` and `12` are not verified; if enclosure capability changes, the size tokens change and the contract must be updated before any page uses them.

**Statement of status:** every name in this document is a **proposed commercial identity**, not an approved SKU, not a purchasable product, not a registered or cleared mark, and not evidence of availability. The authoritative edition list is `COMMERCIAL-PORTFOLIO.md`; the authoritative machine-readable name list is `brand-identity.contract.json`; the authoritative release state is the MC-02 blocker register. If this document and the portfolio ever disagree on editions, the portfolio is amended first and this document follows — never the reverse.

## 19. Non-assertions

This document does not assert and must not be read as asserting: that any name is trademark-cleared, registrable, available or safe to publish; that any product, edition, size, accessory or bundle exists, is manufacturable, certified, priced, stockable or purchasable; that the nine-family set is final for the programme (it is fixed for MC-03 only); that compatibility, integration or performance claims are true; that any competitor uses or does not use a similar name; or that the naming system itself is approved by counsel. Names are internal proposals until the contract, the clearance decision and the readiness gates say otherwise.

End of document.
