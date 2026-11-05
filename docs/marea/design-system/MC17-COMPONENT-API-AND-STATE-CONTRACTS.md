# MC-17 — Component API and state contracts (D09)

| Field | Value |
|---|---|
| Deliverable | D09 `MC17-COMPONENT-API-AND-STATE-CONTRACTS.md` |
| Milestone | MC-17/36 — MAREA premium design system (internal only) |
| Date | 2026-11-03 |
| Owner | documentation-specialist (MC-17/36) |
| Authority | `docs/marea/design-system/data/component-registry.json` (49 entries) + `component-states.json` |
| Generated companion | `preview/catalogue/app/registry.generated.ts` (`node scripts/build-marea-design-system-catalogue-data.mjs`) |
| Verification | check `MC17-12` PASS, `MC17-13` PASS, `MC17-14` PASS, `MC17-15` PASS, `MC17-17` PASS, `MC17-19` PASS |

## 1. Registry as the machine-readable authority

The registry is **present** and is the contract of record. It is not a summary
written after the fact: `MC17-12` re-reads every entry, opens the declared
implementation path, and fails unless the class is exported, the selector exists,
the `data-marea-component` host marker is present (except for `marea-theme`) and
every declared input and output is actually declared in the source. Recorded
result: "49 registry entries verified against implementation".

| Registry fact | Value |
|---|---|
| Entries | 49 (1 theme + 16 foundation + 12 structured + 12 commerce + 8 instrument) |
| Implementation kinds | 48 `angular-component`, 1 `angular-directive` (`mareaInput`) |
| Status | all 49 `INTERNAL_READY`, contract status `INTERNAL_PROPOSED` |
| Declared inputs | 131 |
| Declared outputs | 3 (`activated`, `activeIdChange`, `openedChange`) |
| Required fields per entry | 25 (`componentId`, `componentName`, `version`, `purpose`, `status`, `implementationKind`, `implementationPath`, `selector`, `semanticElement`, `inputs`, `outputs`, `visualVariants`, `supportedModes`, `responsiveRules`, `tokenDependencies`, `keyboardContract`, `focusContract`, `ariaContract`, `localizationRequirements`, `commercialRestrictions`, `states`, `testReferences`, `knownLimitations`, `usage`) |
| Supported modes per component | all four for every entry |

## 2. The eleven required states

Every component declares all eleven states. A state that does not apply must be
declared as `NOT_APPLICABLE: <reason>` — the reason is mandatory and is what the
generator validates. There is no way to omit a state and no way to invent a
variant to fill one.

| State | Meaning | Example of an applicable declaration |
|---|---|---|
| `DEFAULT` | Resting, enabled presentation | `marea-button`: "Enabled native button rendered with the selected variant and size." |
| `HOVER` | Pointer affordance | `marea-text`: "NOT_APPLICABLE: text has no pointer affordance." |
| `FOCUS_VISIBLE` | Keyboard focus indicator | `marea-button`: "Token focus outline is visible; filled variants inset the ring so it is not obscured." |
| `PRESSED` | Active/pressed or selected | `marea-button`: "Native button active state; no authored pressed style, and `activated` is emitted once." |
| `DISABLED` | Non-interactive with explanation | `marea-button`: "Without a reason the native `disabled` attribute is used; with it, `aria-disabled=true` keeps the control focusable, described by the reason, and blocks activation." |
| `LOADING` | Asynchronous, busy | `marea-button`: "`aria-busy=true`, clock icon and screen-reader loading text; activation is blocked and no timer is required to understand the state." |
| `EMPTY` | No content yet | `marea-text`: "NOT_APPLICABLE: copy is projected; empty text is a content decision, not a component state." |
| `ERROR` | Error presentation | `marea-text`: "tone='critical' renders the critical colour; the meaning is carried by the supplied text." |
| `WARNING` | Caution presentation | `marea-text`: "tone='warning' renders the warning colour; the meaning is carried by the supplied text." |
| `READ_ONLY` | Read-only control | `marea-text`: "NOT_APPLICABLE: the component is not a form control." |
| `BLOCKED` | A gate prevents the action | `marea-button`: "disabled or loading prevents click, Enter and Space and stops propagation; no action is emitted." |

Applicability tally: **539 state cells** = 49 × 11; **153 applicable**, **386
`NOT_APPLICABLE`** with a reason. The state policy is therefore:

1. A state is either implemented or explicitly not applicable — silence is invalid.
2. `NOT_APPLICABLE` is a claim about the API, not permission to skip the work: it
   must name why (no pointer affordance, not a form control, no async work, no gate).
3. No variant may be manufactured to "cover" a state the API does not have; check
   `MC17-13` fails on any option value that is not in the declared `visualVariants`.

## 3. Component API (49 entries)

`✱` = required input (`input.required`). The state column is
applicable/not-applicable.

| Component | Required inputs | Optional inputs | Outputs | States (app / n/a) |
|---|---|---|---|---:|
| `marea-theme` | — | `mode`, `locale` | — | 1 / 10 |
| `marea-text` | — | `variant`, `tone` | — | 3 / 8 |
| `marea-section-heading` | `heading` | `kicker`, `lead`, `level` | — | 1 / 10 |
| `marea-container` | — | `size` | — | 1 / 10 |
| `marea-grid` | — | `minItem`, `gap` | — | 1 / 10 |
| `marea-stack` | — | `gap` | — | 1 / 10 |
| `marea-inline` | — | `gap`, `align` | — | 1 / 10 |
| `marea-divider` | — | `spacing` | — | 1 / 10 |
| `marea-surface` | — | `variant`, `padding`, `labelledBy` | — | 1 / 10 |
| `marea-icon` | `name` | `label`, `size` | — | 1 / 10 |
| `marea-button` | — | `variant`, `size`, `type`, `disabled`, `disabledReason`, `loading`, `icon` | `activated` | 7 / 4 |
| `marea-link` | — | `href`, `external`, `variant` | — | 4 / 7 |
| `marea-status-badge` | `tone`, `label` | — | — | 3 / 8 |
| `marea-notice` | `heading` | `body`, `variant`, `live` | — | 4 / 7 |
| `marea-state-panel` | `title` | `kind`, `description` | — | 5 / 6 |
| `marea-form-field` | `label`, `controlId` | `hint`, `error`, `required` | — | 5 / 6 |
| `marea-input` *(directive)* | — | `invalid`, `required` | — | 4 / 7 |
| `marea-tabs` | `label`, `items` | `activeId` | `activeIdChange` | 4 / 7 |
| `marea-tab-panel` | `itemId` | `active` | — | 3 / 8 |
| `marea-accordion` | `items` | `mode` | — | 3 / 8 |
| `marea-disclosure` | `summary` | `open`, `meta` | `openedChange` | 3 / 8 |
| `marea-spec-table` | `caption`, `rows` | — | — | 3 / 8 |
| `marea-definition-list` | `items` | `label` | — | 2 / 9 |
| `marea-responsive-nav` | `label`, `items` | — | — | 4 / 7 |
| `marea-breadcrumb` | `items` | `label` | — | 5 / 6 |
| `marea-status-display` | `tone`, `label` | `description`, `meta` | — | 3 / 8 |
| `marea-feature-comparison` | `caption`, `options`, `rows` | — | — | 3 / 8 |
| `marea-data-quality` | `dimension`, `status` | `evidence`, `note` | — | 3 / 8 |
| `marea-permission-notice` | `kind` | `scope`, `detail`, `live` | — | 3 / 8 |
| `marea-readiness-panel` | `summary` | `heading` | — | 4 / 7 |
| `marea-family-card` | `family`, `presentation` | `ctaHint` | — | 3 / 8 |
| `marea-edition-card` | `edition`, `presentation` | — | — | 3 / 8 |
| `marea-bundle-components` | `components` | `heading` | — | 3 / 8 |
| `marea-bundle-exclusions` | — | `contractOnly`, `ineligible`, `externalRequirements` | — | 4 / 7 |
| `marea-entitlement-summary` | `entitlements` | `heading` | — | 2 / 9 |
| `marea-compatibility-notice` | `status` | `testedRows` | — | 3 / 8 |
| `marea-price-unavailable` | — | `priceStatus`, `heading` | — | 4 / 7 |
| `marea-stock-unavailable` | — | `stockState` | — | 4 / 7 |
| `marea-commercial-cta` | `presentation` | — | — | 5 / 6 |
| `marea-quote-status` | — | `scope` | — | 4 / 7 |
| `marea-documentation-panel` | `familyId`, `items` | `heading` | — | 4 / 7 |
| `marea-numeric-readout` | `value`, `unit`, `label` | `size`, `freshness`, `ageSeconds`, `demo` | — | 4 / 7 |
| `marea-measurement` | `label`, `unit` | `detail` | — | 1 / 10 |
| `marea-freshness` | `state` | `ageSeconds` | — | 4 / 7 |
| `marea-sensor-unavailable` | `state` | `unit` | — | 6 / 5 |
| `marea-instrument-status` | `tone`, `label` | `cause`, `action`, `live` | — | 3 / 8 |
| `marea-connectivity` | `state` | `device`, `lastSeen` | — | 3 / 8 |
| `marea-instrument-tile` | `title` | `demo` | — | 2 / 9 |
| `marea-telemetry-list` | `items` | `caption`, `demo` | — | 4 / 7 |

Reading the table: **no component accepts a price, an amount, a stock quantity, a
currency or a purchase intent.** The only numeric input in the whole registry is
`ageSeconds`, and the only required "value" is a pre-formatted
`string | null` for the instrument readout. This is what makes the "no purchase
path" property structural rather than a matter of discipline.

## 4. Interaction contracts

### 4.1 Required inputs as a correctness device

50 `input.required` declarations are the primary defence against silently empty
specimens: a status chip without a label, a table without a caption, a readout
without a unit cannot be constructed. `marea-status-badge` is the clearest case —
`tone` and `label` are both required, so an icon-only or colour-only status is not
expressible through the API (check `MC17-18`).

### 4.2 Disabled-reason contract (`marea-button`)

| Situation | Attribute set | Keyboard | Activation |
|---|---|---|---|
| `disabled=false, loading=false` | none | focusable | emits `activated` |
| `disabled=true` **without** `disabledReason` | native `disabled` attribute | not focusable | blocked |
| `disabled=true` **with** `disabledReason` | `aria-disabled="true"` + `aria-describedby` → hidden reason span | **still focusable** (discoverable) | blocked in the click handler (`preventDefault`/`stopPropagation`), `activated` not emitted |
| `loading=true` | `aria-busy="true"` + hidden "loading" text (`i18n.text('loading')`) | depends on reason as above | blocked |
| `ARIA-disabled` styling | `disabled-surface` + `disabled` ink + `border-strong` | — | — |

The check `MC17-17` asserts `disabledReason`, `aria-describedby` and
`aria-disabled` are all present in `marea-button`, and that `marea-commercial-cta`
contains no `<button>`, `<a ` or `role="button"`.

### 4.3 ARIA relationship wiring

| Pattern | Implementation |
|---|---|
| Field label → control | `marea-form-field` renders `<label [attr.for]="controlId()">`; the consumer projects the native control with that id |
| Hint and error | ids `marea-field-<n>-hint` / `-error`; `describedBy()` returns the space-separated list the consumer binds to `aria-describedby` |
| Error announcement | error paragraph is `role="alert"`; the field never relies on a red border alone |
| Required | visible `*` (`aria-hidden`) plus an `.sr-only` "required" string |
| Buttons with a disabled reason | `aria-describedby` points at a visually hidden reason span |
| Icon meaning | `aria-hidden="true"` by default; `role="img"` + `aria-label` only when `label` is supplied |
| Tabs | `role="tablist"` on the strip, `role="tab"`, `aria-selected`, `aria-controls="<id>-panel"`; panels carry `aria-labelledby` |
| Tables | `caption` is required; the table is wrapped in a focusable scroll region with a localised hint |
| Live regions | `live="off" | polite | assertive"` with `off` as default on instrument status, notices and permission notices |

### 4.4 Roving tabindex (`marea-tabs`)

- Exactly one tab is in the tab order: the active tab, or the first tab when
  nothing is active (`tabStopId` computed signal).
- `ArrowRight` / `ArrowLeft` move and wrap; `Home` / `End` jump to first/last.
- Selection follows focus (automatic activation): the key handler only moves
  focus, and the `(focus)` handler emits a single `activeIdChange`, so a keyboard
  move produces exactly one event.
- The parent owns `activeId`; the strip keeps no internal selection state, so
  server-rendered markup hydrates with the same selected tab.
- The active tab is not identified by colour alone: it gets `aria-selected`, a
  heavier weight and a 3px action-coloured bottom border.

### 4.5 Native disclosure semantics

`marea-accordion` and `marea-disclosure` use native `<details>/<summary>`. The
summary is a native focus stop; `Enter`/`Space` toggle it without a key handler;
`openedChange` reports the resulting state. No ARIA emulation of a disclosure is
used, and no focus management is needed because the browser provides it.

Keyboard-operable components (11, per the registry `keyboardContract`): `marea-button`,
`marea-link`, `marea-form-field`, `marea-input`, `marea-tabs`, `marea-tab-panel`,
`marea-accordion`, `marea-disclosure`, `marea-spec-table`, `marea-feature-comparison`,
`marea-responsive-nav`. The other 38 declare `NOT_APPLICABLE` because they are
non-interactive. Check `MC17-15` PASS: all 11 expose `:focus-visible` with focus
tokens (`marea-input` via `marea-form-field`).

## 5. Fail-closed commercial contract

`data/commerce-presentation.adapter.ts` is a **presentation guard**, not the
commercial authority: the server-side evaluator remains the final control. Its job
is to make it impossible for the design system to render a purchase path even when
upstream data is malformed.

### 5.1 Invariants

| Invariant | Implementation |
|---|---|
| `purchaseActionAllowed` is always `false` | literal `false` in the returned object and in the `MareaCommercialPresentation` type |
| `cartAllowed` is always `false` | same |
| `priceVisible` is always `false` | same — no amount is representable |
| `availabilityVisible` is always `false` | same — no quantity is representable |
| A gate that is not explicitly open is closed | `const gateOpen = input.releaseGateOpen === true`; there is no MC-17 path that opens it |
| Unknown/malformed CTA state | `sanitizeCtaState()` returns `NOT_AVAILABLE` for any value outside the five-state list |
| Blocked upstream signals are recorded | `blockedSignals: MareaBlockedSignal[]` for `BUY_CTA`, `CART`, `PRICE_VISIBILITY`, `AVAILABILITY_VISIBILITY` |

### 5.2 CTA derivation precedence

```text
INSTALLATION_PACKAGE                  -> QUOTE_ONLY
requiresQuotation || contractedSolution -> QUOTE_ONLY
CONDITIONAL                           -> COMING_SOON
informational                         -> REQUEST_INFORMATION
DEFINED                               -> DISABLED
anything else / unknown              -> NOT_AVAILABLE
```

Safety and legal restrictions never upgrade this into a purchase: they are surfaced
separately as restriction notices and readiness labels
(`restrictionCopyKey()` maps each `MareaRestrictionKind` to an internal copy key).

### 5.3 Rendering consequences

- `marea-commercial-cta` renders a status chip, an explanation, the global rule text
  ("buyCtaAllowed=false, cartAllowed=false, priceVisible=false,
  availabilityVisible=false") and one critical notice per blocked signal. It
  contains **no action element at all**.
- `marea-price-unavailable` and `marea-stock-unavailable` state that no amount and
  no quantity exist; they never render a zero, a dash-as-price or "sold out".
- Family limitation copy is mandatory and mapped by
  `FAMILY_LIMIT_KEYS` (PILOT supervised, AIS receive-only, SENSE local safety,
  WATCH no guarantee, FLEET no default hardware, NAV/WEATHER licensing,
  DISPLAY conditional).
- Check `MC17-19` PASS: no purchase wording, no currency symbol, no price/stock
  amount API anywhere in the design system or the catalogue.

## 6. Bilingual contract per component

- No component contains a user-facing string: all copy comes from
  `core/i18n.ts` (138 keys, ES + EN, no empty side; check `MC17-25` PASS).
- ES is the default; the theme host sets the document locale before children
  render. EN is a translation of the same claim, never weaker.
- Copy deliberately withholds capability: no price, stock, purchase, date,
  waitlist, certification, quotation guarantee or autonomous-navigation claim
  (check `MC17-23` PASS: family-limitation keys present, no autonomy claim).
- One entity, one component, two locales: check `MC17-26` PASS — "one component
  set, 26 unique editions"; no `*.en.ts` / `*.es.ts` component variant exists.

## 7. Known defects and limits of the API contract

| Item | Status | Consequence |
|---|---|---|
| `marea-text` bodySmall variant referenced `--marea-type-bodySmall-size` / `-line-height` (camelCase) instead of `--marea-type-body-small-*` | **CLOSED_VERIFIED at `4a9043b`** | The variant would have silently inherited the parent's size instead of 0.875rem/1.6. The current file uses the kebab-case names (`marea-text.ts:38`), and validator `MC17-06` passes with 180 references resolved against 182 definitions |
| `marea-form-field` module-level counter (the former `fieldSequence`) | **CLOSED_VERIFIED at `4a9043b`** | The component now injects `MareaIds` (`marea-form-field.ts:3,78-81`); validator `MC17-15` and the SSR static scan pass. The old `fieldSequence` wording was a stale historical defect record, not the current implementation |
| Behavioural coverage of the 11 states | **NOT AUTOMATED IN THIS PACKAGE** | State descriptions document intent; no per-state unit test was executed by this documentation author. The Playwright suite (`e2e/design-system/*.spec.ts`, 30 tests at `4a9043b`) is executed by the delivery gate, not re-run for this document |
| Independent review of the API | **TWO ROUNDS RECORDED, BOTH PARTIAL; THIRD ROUND PASS_INTERNAL_DESIGN_SYSTEM_SCOPE AT f2c9ec2** | `MC17-INDEPENDENT-REVIEW.md` exists and is committed; the registry is machine-verified against code, and the third round completed with PASS_INTERNAL_DESIGN_SYSTEM_SCOPE at `f2c9ec2` |
| Public use of any component | **NOT AUTHORISED** | `PUBLICATION_AUTHORIZED=false`; the components are internal only |

A designed component is a documented, machine-checked API — not a shipped feature.
Nothing in this document authorises exposing any component on a public route.

Source references: `docs/marea/design-system/data/component-registry.json`,
`component-states.json`, `scripts/build-marea-design-system-catalogue-data.mjs`,
`scripts/check-marea-design-system.mjs` (checks MC17-12…MC17-19),
`src/app/marea-design-system/core/{types,i18n,ids}.ts`,
`src/app/marea-design-system/data/commerce-presentation.adapter.ts`,
`src/app/marea-design-system/components/**`, `preview/catalogue/app/registry.generated.ts`.
