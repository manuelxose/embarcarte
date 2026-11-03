# MC-17 D11 — Commercial CTA and readiness policy

| Field | Value |
|---|---|
| Deliverable | D11 `MC17-COMMERCIAL-CTA-AND-READINESS-POLICY.md` |
| Milestone | MC-17/36 — MAREA internal design system |
| Date | 2026-11-03 |
| Owner | programme-docs |
| Status | `INTERNAL_PROPOSED` — presentation guard only |
| Machine dataset | `docs/marea/design-system/data/commerce-presentation-policy.json` |
| `MC16_VERDICT` | `PARTIAL` (unchanged) |

## 1. What this policy is

The design system has **no commerce capability**. Its commercial component is a
fail-closed presentation adapter at
`src/app/marea-design-system/data/commerce-presentation.adapter.ts`. It consumes MC-16
domain codes and returns a `MareaCommercialPresentation` that can only explain a state; it
cannot buy, reserve, price or stock anything.

The authoritative commercial evaluator remains server-side in MC-16. This policy is a
second lock, not the lock of record. The MC-16 handoff states the global rules as
`buyCtaAllowed = false`, `cartAllowed = false`, `priceVisible = false` and
`availabilityVisible = false`.

## 2. The five CTA states

`MareaCtaState` in `core/types.ts` is exactly:

`'DISABLED' | 'COMING_SOON' | 'REQUEST_INFORMATION' | 'QUOTE_ONLY' | 'NOT_AVAILABLE'`

The labels and bodies live in `MAREA_COPY` (`core/i18n.ts`) and are the only public-facing
text a CTA can render. State identifiers themselves are not public labels. The machine policy
is `docs/marea/design-system/data/commerce-presentation-policy.json`; the MC-16 handoff lists
the same five states in `presentationContract.ctaStates`.

| State | Derived when | Allowed interaction | Prohibited |
|---|---|---|---|
| `DISABLED` | `definitionStatus === 'DEFINED'` and no quotation/contract/informational flag | Non-interactive status badge plus explanation | Fake active button, hidden action, hover promise |
| `COMING_SOON` | `definitionStatus === 'CONDITIONAL'` after the quote checks | Informational text only | Date, price, waitlist promise, "pre-order" |
| `REQUEST_INFORMATION` | `informational === true` after the quote and conditional checks | Informational text only; no contact mechanism | Quote, order, price expectation, live data collection |
| `QUOTE_ONLY` | `INSTALLATION_PACKAGE`, or `requiresQuotation`, or `contractedSolution` | Explains a future human survey/quotation process | Checkout, cart, fixed price, self-service commitment, guaranteed quotation |
| `NOT_AVAILABLE` | Unknown/missing/non-string state, or a source matching no branch | Explicit unavailability statement | "Sold out", fake stock, implied future availability |

## 3. Derivation precedence implemented by `deriveCtaState`

The function is ordered; the first matching branch wins.

| Order | Condition | Result |
|---:|---|---|
| 1 | `!source \|\| typeof source !== 'object'` | `NOT_AVAILABLE` |
| 2 | `definitionStatus === 'INSTALLATION_PACKAGE'` | `QUOTE_ONLY` |
| 3 | `requiresQuotation \|\| contractedSolution` | `QUOTE_ONLY` |
| 4 | `definitionStatus === 'CONDITIONAL'` | `COMING_SOON` |
| 5 | `informational` | `REQUEST_INFORMATION` |
| 6 | `definitionStatus === 'DEFINED'` | `DISABLED` |
| 7 | anything else | `NOT_AVAILABLE` |

Consequences visible in the gallery:

- `PILOT-PRO` (`INSTALLATION_PACKAGE`) → `QUOTE_ONLY`, even before its quotation flag.
- `PILOT-COASTAL` (`DEFINED`, `requiresQuotation: true`) → `QUOTE_ONLY`, not `DISABLED`.
- `FLEET-ENTERPRISE` (`CONDITIONAL`, `contractedSolution: true`) → `QUOTE_ONLY`.
- `AIS-CONNECTED`, `PILOT-SAIL`, `SENSE-SAIL`, `SENSE-SYSTEMS`, `WATCH-PLUS`,
  `DISPLAY-LARGE-CONDITIONAL`, `WEATHER-PRO` → `COMING_SOON` when no quote flag applies.
- `DEFINED` editions without a quotation or contract flag, and families whose editions carry
  no such flag, → `DISABLED`. The PILOT and FLEET families resolve to `QUOTE_ONLY` through
  their quotation/contract flags even though their primary edition is `DEFINED`.

Safety and legal restrictions never promote the state into a purchase; they are surfaced
separately as restriction notices and readiness labels. The function's own comment says
this explicitly.

An unknown state string — for example `PURCHASE` or `BUY_NOW` — is sanitised by
`sanitizeCtaState` to `NOT_AVAILABLE`. The adversarial gallery demonstrates the
`PURCHASE` case.

## 4. Fail-closed adapter invariants

`deriveCommercialPresentation` always returns these four properties as `false`, regardless
of upstream flags:

| Property | Returned value | Meaning |
|---|---|---|
| `purchaseActionAllowed` | `false` | No purchase action can be rendered |
| `cartAllowed` | `false` | No cart can be rendered |
| `priceVisible` | `false` | No amount is representable |
| `availabilityVisible` | `false` | No quantity is representable |

Additional invariants:

- `restrictions` is de-duplicated through `Set` before return.
- `ctaState` is passed through `sanitizeCtaState`; unknown → `NOT_AVAILABLE`.
- A gate that is not explicitly `releaseGateOpen === true` is closed. There is no MC-17
  path that opens it.
- If a caller passes `releaseGateOpen: true`, the four false invariants still hold, but
  `blockedSignals` is returned as an empty array. MC-17 always passes `false`, so blocked
  notices are active in every shipped surface. This behaviour is recorded so a future
  consumer does not mistake it for an open gate.

## 5. Blocked signal reporting

`MareaBlockedSignal` is exactly:

`'BUY_CTA' | 'CART' | 'PRICE_VISIBILITY' | 'AVAILABILITY_VISIBILITY'`

The adapter reports a signal whenever the corresponding input is **not exactly `false`**:

| Input | Reported signal |
|---|---|
| `buyCtaAllowed !== false` | `BUY_CTA` |
| `cartAllowed !== false` | `CART` |
| `priceVisible !== false` | `PRICE_VISIBILITY` |
| `availabilityVisible !== false` | `AVAILABILITY_VISIBILITY` |

`MareaCommerceCta` maps signals to notices and de-duplicates identical copy keys:

| Signal | Copy key |
|---|---|
| `BUY_CTA` | `buySignalBlocked` |
| `CART` | `buySignalBlocked` |
| `PRICE_VISIBILITY` | `priceSignalBlocked` |
| `AVAILABILITY_VISIBILITY` | `stockSignalBlocked` |

The adversarial gallery feeds a hostile view model with all four flags `true` and
`ctaState: 'PURCHASE'`. The rendered invariants are `false/false/false/false`,
`NOT_AVAILABLE`, and `BUY_CTA, CART, PRICE_VISIBILITY, AVAILABILITY_VISIBILITY`
(`e2e/design-system/commerce.spec.ts`).

## 6. Readiness labels are derived server-side

`MareaReadinessPanel` renders a `MareaReadinessSummary`:

- `dimensions`: the 11 MC-16 dimensions (`definition`, `engineering`, `licensing`,
  `hardware`, `dataRights`, `compliance`, `safety`, `pricing`, `brandPublication`,
  `operations`, `availability`).
- `overall`: `READY | NOT_READY | BLOCKED | NOT_ASSESSED`.
- `blockedGateIds`: opaque ids; the panel shows only a count, or `noneRecorded` when zero.

The panel renders the visible note `derivedReadiness`:
"Labels derived server-side. A page never promotes the product lifecycle." It does not
compute readiness, does not read gates and does not expose gate evidence.

All fixture dimensions are `NOT_READY` and the overall is `NOT_READY`. That is MC-16's
truth, not a design choice.

## 7. Restriction kinds

`MareaRestrictionKind` has eight values, each mapped to a copy key by
`restrictionCopyKey()`:

| Kind | Copy key |
|---|---|
| `PUBLICATION_NOT_AUTHORIZED` | `publicationNotAuthorized` |
| `TRADEMARK_NOT_CLEARED` | `provisionalBrand` |
| `SAFETY_GATE_BLOCKED` | `pilotSupervised` |
| `LICENSING_NOT_CLEARED` | `navWeatherLicensing` |
| `COMPATIBILITY_UNTESTED` | `compatibilityUnverified` |
| `PRICE_NOT_APPROVED` | `priceUnavailable` |
| `STOCK_NOT_VERIFIED` | `stockUnavailable` |
| `BRAND_PROVISIONAL` | `provisionalBrand` |

`MareaFamilyCard` renders at most four distinct restriction labels, de-duplicated by copy
key, inside a `<ul>` labelled with the `limitations` copy key. Presentation caps the count
to keep the card readable; the full fixture restriction array remains the data truth.

## 8. Prohibited capabilities and wording

Prohibited by construction and by validation:

- purchase, cart, checkout, payment, subscription purchase, entitlement grant;
- pre-order, reservation, waiting list;
- price, price range, "from €0", currency, discount, delivery cost;
- stock, availability, "in stock", "sold out";
- delivery date, guarantee, SLA, guaranteed quotation;
- merchant SKU, Product/Offer/price/availability structured data.

The validator `MC17-19` scans design-system and preview `.ts/.html/.scss/.css` files
(except `core/i18n.ts`) for these word patterns:
`add to cart`, `buy now`, `añadir al carrito`, `comprar ahora`, `pre-order`/`preorder`,
`waiting list`, `preventa`, `lista de espera`, `€`, `EUR`, `USD`. It also fails any input
named like `amount`, `priceAmount`, `priceValue`, `stockCount` or `quantityAvailable`.

The Playwright suite adds the patterns `en stock`, `in stock`, `disponible ahora`,
`available now`, `sold out`, `agotado`, `comprar`, `buy now`, `add to cart`,
`añadir al carrito` for visible text and `aria-label` values.

## 9. The `QUOTE_ONLY` caveat

`QUOTE_ONLY` is a **category of future contractual interaction**, not an offer and not a
quote. The copy is explicit: "It is not an offer, shows no price and does not guarantee a
quotation." `MareaQuoteStatus` repeats the warning and accepts only an optional scope code
(the gallery passes `PILOT-PRO · paquete de instalación`).

No form, no email capture, no calendar and no price estimate is rendered. A future
human-led survey is described, never initiated by the component.

## 10. `REQUEST_INFORMATION` collects no live data

The state exists for informational surfaces (support, professionals, installers,
documentation). In the internal view it is pure text. Its copy states that the view
"collects no personal data and creates no contact mechanism". There is no `<form>`, no
`mailto:` action and no consent widget in the component. Any future contact route requires
its own privacy and consent review; it is not inherited from this state.

## 11. Disabled semantics

The CTA deliberately contains **no** `button`, `a` or `role="button"`; validator `MC17-17`
asserts this absence. State is conveyed by a `marea-status-badge` (text plus icon) and a
paragraph; colour is never the only signal.

Where a real disabled control is needed, `MareaButton` implements the contract:

- with `disabledReason`, the host keeps `aria-disabled="true"`, stays keyboard
  discoverable, exposes the reason through `aria-describedby`, and blocks click/Enter/Space;
- without a reason, it uses the native `disabled` attribute;
- `loading` sets `aria-busy` and blocks activation;
- the reason is rendered in a visually hidden `<span>` referenced by `aria-describedby`.

The keyboard spec asserts that a disabled button is Tab-reachable, announced, and does not
fire on Enter or Space. The MC-16 handoff requires `aria-disabled` plus a visible reason;
the visible reason is the adjacent explanation text in composed surfaces.

## 12. Enforcement map

| Layer | Check | Assertion |
|---|---|---|
| Validator | `MC17-17` | Disabled button keeps an accessible explanation; CTA renders no action |
| Validator | `MC17-19` | No purchase path, price or stock quantity in code or copy |
| Validator | `MC17-20` | Readiness/restrictions truthful (PILOT blocked, AIS receive-only, FLEET no hardware) |
| Validator | `MC17-23` | Family limits stated in copy; no autonomy claim |
| Validator | `MC17-24` | Shared entitlement ledger rendered once |
| Validator | `MC17-31` | No Product/Offer JSON-LD, priceCurrency or rating markup |
| Playwright | `e2e/design-system/commerce.spec.ts` | Hostile input still yields four `false` invariants and four blocked signals; no control in CTA; no amount; no structured data |
| Playwright | `e2e/design-system/keyboard.spec.ts` | Disabled control reachable, announced, inert |
| Playwright | `e2e/design-system/accessibility.spec.ts` | Every status badge has visible text |

Commands: `npm run test:design-system`, `npm run test:design-system:visual`.

## 13. Known gaps

- **Recorded validator run is overall FAIL (33/38).** The commercial checks
  (`MC17-17`, `MC17-19`, `MC17-20`, `MC17-23`, `MC17-24`, `MC17-31`) are each recorded
  PASS; the failures are missing-file/document-set items (`MC17-32`/`33`/`34`/`35`/`36`),
  three of which were added after the run. The overall status is not a pass.
- **Recorded axe run reports 1 `color-contrast` violation in `instrument-night`**, in the
  preview-only component-documentation block, not in a library component.
- **No independent review.** `MC17-INDEPENDENT-REVIEW.md` does not exist yet (PENDING).
- **Gate-open behaviour is untested in a shipped surface.** No surface passes
  `releaseGateOpen: true`; the suppression branch is code-reviewed only.
- **No server API.** The adapter receives hand-built view models; no MC-16 read API exists,
  which the MC-16 handoff already names as a gap.
- **No real price/stock/checkout** — intentionally absent, not a missing feature to add
  before publication authorisation.

## 14. Source map

- `src/app/marea-design-system/core/types.ts`
- `src/app/marea-design-system/data/commerce-presentation.adapter.ts`
- `src/app/marea-design-system/components/commerce/*`
- `src/app/marea-design-system/components/foundation/marea-button.ts`
- `src/app/marea-design-system/core/i18n.ts`
- `preview/catalogue/app/galleries/{commerce,adversarial}.gallery.ts`
- `e2e/design-system/{commerce,keyboard,accessibility}.spec.ts`
- `scripts/check-marea-design-system.mjs`
- `docs/marea/commerce-data/MC16-MC17-HANDOFF.md`
- `docs/marea/design-system/data/commerce-presentation-policy.json`

`MC16_VERDICT = PARTIAL` is preserved. No publication, deployment, price approval, stock
verification or brand adoption is claimed.
