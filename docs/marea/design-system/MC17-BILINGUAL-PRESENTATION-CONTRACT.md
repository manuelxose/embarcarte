# MC-17 D15 — Bilingual presentation contract

| Field | Value |
|---|---|
| Deliverable | D15 `MC17-BILINGUAL-PRESENTATION-CONTRACT.md` |
| Milestone | MC-17/36 — MAREA internal design system |
| Date | 2026-11-03 |
| Owner | programme-docs |
| Status | `INTERNAL_PROPOSED` — internal/provisional copy, no public claim |
| Machine dataset | `docs/marea/design-system/data/locale-parity.json` |
| Copy keys | 138 |
| `MC16_VERDICT` | `PARTIAL` (unchanged) |

## 1. One entity, two locales

The design system implements exactly one entity per component and one component per
entity, with two locales. There is no ES artifact and EN artifact of the same card, edition,
bundle or page.

Evidence:

- `MareaLocale = 'es' | 'en'` in `core/types.ts`; no third locale exists.
- `MareaLocalizedText` is `{ es: string; en: string }`; both fields are required.
- `scripts/check-marea-design-system.mjs` check `MC17-26` fails if any component file ends
  in `.en.ts`/`.es.ts` or `-en.ts`/`-es.ts`, and requires exactly 26 edition ids in the
  fixture.
- The fixture has 26 editions, 9 families and 6 bundles, each with one language-neutral
  `displayName`.

## 2. Locale routing is unchanged

MC-17 creates no route, no locale-specific URL and no navigation entry.

| Surface | Contract |
|---|---|
| Spanish public paths | unprefixed, existing live paths unchanged |
| English public paths | same route identity under `/en` |
| Current route identities | 21, retained |
| Proposed MAREA route identities | 23, all `PROPOSED_INTERNAL_NOT_DEPLOYABLE` |
| Design-system catalogue | no router, no public path, served at `http://127.0.0.1:4301` only |

The Spanish-default / English-under-`/en` convention is inherited from MC-15. The
catalogue is a separate Angular project (`preview/`), not an Angular route of
`embarcarte`, so it cannot be reached through the public site.

## 3. The `MareaI18n` dictionary approach

All component-facing copy lives in one dictionary. No component contains a hard-coded
user-facing string; components obtain copy through `i18n.text(key)`. Domain values supplied
by a consumer (edition `displayName`, opaque status codes, entitlement names) are data, not
component copy.

- File: `src/app/marea-design-system/core/i18n.ts`
- Symbol: `MAREA_COPY`, typed `as const satisfies Record<string, { es: string; en: string }>`
- Keys: **138** top-level entries; each has exactly one ES and one EN string (138 pairs).
- Service: `MareaI18n` with `locale = signal<MareaLocale>('es')` and
  `text(key, params?)`.
- Injection helper: `injectMareaI18n()`.
- Placeholder substitution is a literal `{name}` replacement, not an ICU formatter.
  Only `tableLabel` currently uses a placeholder (`Tabla: {name}` / `Table: {name}`).
- `formatAge(seconds)` formats `mm:ss` without locale APIs so SSR and hydration agree.

Platform APIs such as `Intl.DateTimeFormat`, `Intl.NumberFormat` or `toLocaleString` are not
used for the component copy. This avoids a server/client locale mismatch.

The validator `MC17-25` parses the dictionary and expects the number of parsed bilingual
keys to equal the number of declared keys, with no empty ES or EN string. The recorded run
in `docs/marea/design-system/evidence/validator-run.json` records `MC17-25` **PASS**
("138 bilingual keys with ES and EN non-empty"). The recorded run at `4a9043b` is
overall **PASS, 38/38**; the earlier FAIL snapshots (31/38 and 36/38 during
authoring, 37/38 at `7cbc99e` while D23/D24 were still absent) are historical and
superseded by the third-round correction.

## 4. Parity rule

ES is the default and the reference. EN is a translation of the same claim, never a weaker
or stronger one.

- A claim that exists in ES and is absent or weaker in EN is a defect, not a style choice.
- A claim in EN that adds certainty (guarantee, availability, certification) absent in ES
  is also a defect.
- State names, restriction kinds and edition ids are language-neutral identifiers and are
  not translated; only the explanatory copy is.
- Copy must describe withheld capability honestly: no price, stock, purchase, date,
  waitlist, certification, quotation guarantee or autonomous-navigation claim.

## 5. CTA state copy — exact ES/EN pairs

Quoted verbatim from `MAREA_COPY` (`core/i18n.ts`). The left column is the copy key; the
state identifier is not public wording.

| Key | ES | EN |
|---|---|---|
| `ctaDisabled` | Acción no disponible: la publicación comercial no está autorizada. No existe botón de compra. | Action unavailable: commercial publication is not authorised. No purchase button exists. |
| `ctaComingSoon` | Concepto interno definido sin fecha aprobada. No hay preventa, reserva ni lista de espera. | Internal concept defined without an approved date. There is no pre-order, reservation or waiting list. |
| `ctaRequestInformation` | Información pendiente de autorización de copy. Esta vista interna no recoge datos personales ni crea un mecanismo de contacto. | Information pending copy authorisation. This internal view collects no personal data and creates no contact mechanism. |
| `ctaQuoteOnly` | Categoría de interacción contractual futura. No constituye una oferta, no muestra precio y no garantiza un presupuesto. | Future contractual interaction category. It is not an offer, shows no price and does not guarantee a quotation. |
| `ctaNotAvailable` | No disponible. El estado refleja puertas de seguridad o legales cerradas. | Not available. The status reflects closed safety or legal gates. |

Short labels used by the status badge:

| Key | ES | EN |
|---|---|---|
| `ctaDisabledLabel` | Sin acción disponible | No action available |
| `ctaComingSoonLabel` | Próximamente (sin fecha) | Coming later (no date) |
| `ctaRequestInformationLabel` | Información no autorizada | Information not authorised |
| `ctaQuoteOnlyLabel` | Solo presupuesto futuro | Future quotation only |
| `ctaNotAvailableLabel` | No disponible | Not available |

## 6. Family-limit copy — exact ES/EN pairs

These are the strings that keep the portfolio truthful. They are rendered through
`restrictionCopyKey()` and `FAMILY_LIMIT_KEYS` in
`data/commerce-presentation.adapter.ts`, and checked by `MC17-23`.

| Key | ES | EN |
|---|---|---|
| `pilotSupervised` | Concepto de pilotaje asistido. Sin navegación autónoma ni control de gobierno en vivo. Puerta de seguridad bloqueada. | Supervised pilot concept. No autonomous navigation and no live steering control. Safety gate blocked. |
| `aisReceiveOnly` | Recepción únicamente. Sin transmisión AIS ni promesa de evitación de colisiones. | Receive-only. No AIS transmission and no collision-avoidance promise. |
| `navWeatherLicensing` | Los datos de cartas náuticas y meteorología no licenciados no se representan como incluidos. | Unlicensed chart and weather data are not represented as included. |
| `senseEssentialsKit` | Un kit que representa POWER + BILGE; los módulos no se cuentan dos veces. | One kit representing POWER + BILGE; modules are not double-counted. |
| `watchNoGuarantee` | No se garantizan alertas ni una monitorización remota continua. | Alerts are not guaranteed and continuous remote monitoring is not provided. |
| `fleetNoHardware` | Sin hardware por defecto y sin acuerdo de nivel de servicio establecido. | No default hardware and no established service-level agreement. |
| `displayConditional` | Sin dimensiones, tamaño final ni precio inventados. | No invented dimensions, final size or price. |
| `sharedEntitlement` | Un solo derecho compartido con un único registro de licencia. No se factura dos veces. | One shared right with a single licence ledger. It is not billed twice. |
| `localSafetyIndependent` | Las funciones locales de seguridad no dependen del pago de una suscripción. | Local safety functions do not depend on a subscription payment. |

## 7. Provisional and internal-status copy

| Key | ES | EN |
|---|---|---|
| `internalOnlyBanner` | Solo uso interno · sistema de diseño no publicado | Internal use only · unpublished design system |
| `provisionalBrand` | Marca propuesta MAREA · identidad no adoptada · uso público NO_GO | MAREA is a proposed brand · identity not adopted · public use NO_GO |
| `demoData` | Datos de demostración sintéticos | Synthetic demonstration data |

These strings are mandatory wherever MAREA identity or samples are shown. They are not
marketing copy and must not be removed to make a surface look public.

## 8. Localized fixture fields

The generated fixture is `data/fixtures/marea-fixtures.generated.ts`.

| Field | Shape | Count | Rendering |
|---|---|---:|---|
| `MareaFixtureFamily.summary` | `{ es, en }` | 9 | `MareaFamilyCard.localizedSummary` selects by `MareaI18n.locale()` |
| `MareaFixtureEdition.displayName` | neutral string | 26 | `MareaEditionCard` |
| `MareaFixtureBundle.displayName` | neutral string | 6 | bundle components/exclusions |
| MC-16 `localizedContent.es/en` | `{ available: false, ref: null }` | 9 | not rendered; no authorized localized content exists |

No numeric, price, stock or date value is localized by a component. Instrument values are
pre-formatted by the domain layer and carry a `precisionNote`; the component never calls a
locale formatter. Documentation demo titles in the gallery are Spanish-only literals owned
by the preview app, not by a component.

## 9. `lang` is set by the theme host

`MareaTheme` is the document-locale host:

- host binding `[attr.lang]="locale()"`;
- `ngOnChanges()` sets `this.i18n.locale.set(this.locale())` before children render;
- default locale is `es`;
- only projected content is rendered: no routing, no data fetching, no global state.

The Playwright helper `setLocale()` asserts the `marea-theme` host has `lang="es"` or
`lang="en"` after the control is used. Because the locale is set on the host and the copy is
synchronous, server-rendered markup and hydration agree for this isolated surface.

## 10. No locale-specific duplicate entity

- 0 locale-suffixed component files.
- 26 unique edition ids; no ES and EN edition.
- 6 bundles; no ES and EN bundle.
- One family page per family in the frozen IA contract; never one page per edition.
- Dynamic slugs use the same identifier in both locales; an edition id never appears in a
  URL.

## 11. Copy authorization status

Copy is internal and provisional:

- 0 public claims authorized (`claims-policy.json` summary: `publicAuthorized: 0`,
  `publicationAuthorization: "NONE"`).
- Trademark legal clearance `NOT_GRANTED`; MAREA public use `NO_GO`.
- No public MAREA brand attribution, no registered symbol, no trademark suffix.
- The dictionary is not an approved translation and must not be published as one.

## 12. Scope exclusions

- **No Arabic, Hebrew or RTL support.** `MareaLocale` is `'es' | 'en'`; there is no `dir`
  binding, no RTL stylesheet and no mirrored icon set. RTL is out of scope for MC-17.
- No additional locale, no locale negotiation, no cookie-based locale, no translated slug.
- No localized currency, date or number formatting in components.
- The internal catalogue shell and its explanatory prose are Spanish-only; that is a
  catalogue limitation, not a component contract violation.

## 13. Enforcement and evidence

| Check | Assertion |
|---|---|
| `MC17-25` | 138 bilingual keys parsed, none empty, count equals declared |
| `MC17-26` | Zero locale-suffixed component files; 26 unique edition ids |
| `MC17-23` | Family-limit copy keys exist; no autonomy claim |
| `MC17-19` | No purchase wording or currency in design-system/preview code |
| Playwright `setLocale` | Theme host `lang` attribute switches to `es`/`en` |
| Playwright visual spec | ES/EN foundation screenshot pair at 1440×900 |

Commands: `npm run test:design-system`, `npm run test:design-system:visual`.

The recorded validator run at `4a9043b` marks `MC17-25` and `MC17-26` PASS and the
overall run is **PASS, 38/38**. The axe run reports **0 violations in all four
modes** (36 passes, 0 incomplete each); the earlier one `instrument-night` contrast
violation in the preview-only component documentation block was corrected and is
retained only as a historical failure artifact. The 138-key count is a direct static
count of the dictionary and is confirmed by the recorded `MC17-25` detail.

## 14. Known gaps

- **No authorized public copy.** Publication remains blocked in both locales.
- **Semantic equivalence is not machine-proven.** The validator proves structural parity,
  not nuance; a human ES/EN review is still required before any public use.
- **Catalogue prose is Spanish-only** (section leads, demo documentation titles).
- **No RTL/Arabic** — explicitly out of scope, not a regression.
- **Independent review is not final.** `MC17-INDEPENDENT-REVIEW.md` exists with two
  rounds, both PARTIAL; the third-round verdict on `4a9043b` is pending.

## 15. Source map

- `src/app/marea-design-system/core/{types,i18n}.ts`
- `src/app/marea-design-system/theme/marea-theme.ts`
- `src/app/marea-design-system/data/commerce-presentation.adapter.ts`
- `src/app/marea-design-system/data/fixtures/marea-fixtures.generated.ts`
- `docs/marea/design-system/data/locale-parity.json`
- `docs/marea/information-architecture/MC15-MC16-HANDOFF.md`
- `docs/marea/legal-commercial/data/claims-policy.json`
- `scripts/check-marea-design-system.mjs`
- `e2e/design-system/{helpers,visual}.ts`

`MC16_VERDICT = PARTIAL` is preserved. No publication, deployment or brand adoption is
claimed.
