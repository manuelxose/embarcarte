# EMBARCARTE / MAREA — Bilingual brand voice and messaging system (ES / EN)

| Field | Value |
| --- | --- |
| Document ID | MC-03 / BRAND-VOICE-ES-EN |
| Milestone | MC-03 |
| Date | 2026-10-30 |
| Owner | Lead (Brand and Commercial Program Director) |
| Status | APPROVED MESSAGING DIRECTION — internal. Nothing here is cleared for public use as a trademark or as a product claim |
| Legal state | `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`; no product commercially available |
| Machine-readable message keys | `brand-identity.contract.json` (`messages`) — enforced by `npm run test:brand` |

## 1. Voice definition

MAREA speaks as a technically competent seller, not as a lifestyle brand and not as an AI startup.

| Trait | What it means in writing | What it rules out |
| --- | --- | --- |
| Technically knowledgeable | Names the protocol, the connector, the limitation, the version | Vagueness, hand-waving, "magic" |
| Clear | One idea per sentence; the reader knows what is included and what is not | Nested clauses, marketing rhythm over meaning |
| Precise | Numbers, units, scope, conditions | "Hasta X" without conditions; rounded boasts |
| Professional | Written for an owner who spends real money and an installer who must warrant the work | Chatty filler, exclamation marks, emoji |
| Approachable | Plain words first, then the technical term | Condescension, unexplained acronyms |
| Grounded in maritime reality | Salt, vibration, voltage, watchkeeping, weather windows | Fantasy dashboards, sci-fi renders in copy |

**Register (Spanish).** Consumer-facing copy uses **tú** ("tu barco", "puedes empezar"). B2B proposals,
quotations, legal pages and installer documentation use **usted**. Never mix the two inside one piece.
Portuguese, when introduced, follows the same rule (tu/você decision recorded before use).
English uses neutral professional register: no slang, no hype, "you" throughout.

**Banned vocabulary** (any language): revolucionario, disruptivo, sinergia, ecosistema 360, de última
generación, inteligencia artificial de vanguardia, seamless, cutting-edge, game-changer, best-in-class,
"el futuro de la navegación", "nunca visto". Avoid "certificado", "homologado", "oficial",
"profesional" as implied certification, and any superlative about accuracy, safety or reliability.

## 2. Canonical message keys (contract-aligned)

These are the authoritative strings. Any channel may shorten them, never strengthen them.

| Key | Spanish | English |
| --- | --- | --- |
| `companyDescription` | EMBARCARTE comercializa, instala y da soporte a tecnología marina para embarcaciones de recreo y profesionales. | EMBARCARTE sells, installs and supports marine technology for recreational and professional vessels. |
| `mareaShortDescription` | MAREA es la familia de productos de navegación, conectividad e instrumentación de EMBARCARTE: un solo barco, un solo conjunto de datos. | MAREA is EMBARCARTE's family of navigation, connectivity and instrumentation products: one vessel, one set of data. |
| `mareaExtendedDescription` | MAREA reúne navegación, datos a bordo, control, sensores y monitorización en un ecosistema modular. Es una marca propuesta: no está registrada y no se presenta como marca registrada. | MAREA brings navigation, onboard data, control, sensors and monitoring together in one modular ecosystem. It is a proposed brand: it is not registered and it is not presented as a registered trademark. |
| `headlinePrimary` | Instrumentación marina para el barco que ya tienes. | Marine instrumentation for the boat you already own. |
| `headlineSecondaryOne` | Todos los datos de tu barco, en un mismo sitio. | All your boat's data in one place. |
| `headlineSecondaryTwo` | Empieza por lo que ya llevas a bordo. | Start with what is already aboard. |
| `trustLine` | Publicamos qué hace el producto, qué no hace y con qué versión funciona. | We publish what a product does, what it does not do, and which version supports it. |
| `ctaPrimary` | Solicitar estudio de compatibilidad | Request a compatibility review |
| `b2bLine` | Para instaladores, marinas, escuelas y flotas: propuesta técnica con matriz de compatibilidad y plan de servicio. | For installers, marinas, sailing schools and fleets: a technical proposal with a compatibility matrix and a service plan. |
| `attributionLine` | MAREA es una marca de producto de EMBARCARTE. | MAREA is a product brand of EMBARCARTE. |

Non-canonical secondary CTA language (allowed, not part of the contract's required key set):
«Ver especificaciones» / "View specifications", «Solicitar propuesta» / "Request a proposal".

**Longer variant of the extended description — CONDITIONAL, not canonical.** A longer paragraph that
names each family and states "cada familia se puede adoptar por separado y combinarse sin duplicar
suscripciones ni cuentas" / "without duplicating subscriptions or accounts" may be used only when the
shared-entitlement model actually exists (the strategy labels that same claim `HYPOTHESIS` while the
commerce/entitlement model is unbuilt: MC-02 P-09/P-10). Until then the canonical, shorter
`mareaExtendedDescription` above is the only publishable form.

`companyDescription`, the `b2bLine` and every attribution string are CONDITIONAL on the seller being
able to deliver the named service (see `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2). The strings deliberately
avoid asserting active selling in a named territory: priority markets (Spain, Portugal, EU) are a
strategy statement in `MAREA-BRAND-STRATEGY.md`, not a claim of current commercial presence. If the
service capability is not yet deliverable, drop the verb; do not fake it.

## 3. Positioning statements

### Executive positioning statement — ES

> Para armadores que quieren sacar más partido al barco que ya tienen, **MAREA** es la familia de
> instrumentación y software marino de **EMBARCARTE** que unifica navegación, datos de a bordo y
> monitorización en un solo sistema, se instala sobre el equipamiento existente y se acompaña de
> soporte técnico real. A diferencia de las gamas cerradas de los grandes fabricantes, MAREA se adopta
> por módulos, publica su matriz de compatibilidad y declara sus límites en lugar de prometer
> prestaciones no verificadas.

### Executive positioning statement — EN

> For owners who want more from the boat they already have, **MAREA** is **EMBARCARTE**'s family of
> marine instrumentation and software that unifies navigation, onboard data and monitoring in one
> system, installs on top of existing equipment, and comes with real technical support. Unlike closed
> ranges from large manufacturers, MAREA is adopted module by module, publishes its compatibility
> matrix, and states its limits instead of promising unverified performance.

Both statements are positioning intent, not published copy: they contain comparative framing that must
not appear in advertising until evidenced (see the claims policy, Class P).

### Elevator pitch (30 seconds) — ES

«MAREA es la gama de EMBARCARTE para conectar y modernizar el barco que ya tienes: navegación, pasarela
de datos, AIS, sensores, pantallas, previsión y flota, con una sola cuenta y una sola instalación. No
prometemos autonomía total ni certificaciones que no tenemos: publicamos qué hace cada producto, con qué
equipos es compatible y qué versión lo soporta, y lo instalamos y mantenemos nosotros.»

### Elevator pitch (30 seconds) — EN

"MAREA is EMBARCARTE's range for connecting and modernising the boat you already own: navigation, a data
gateway, AIS, sensors, displays, forecasting and fleet management, with one account and one
installation. We do not promise full autonomy or certifications we do not hold: we publish what each
product does, which equipment it is compatible with and which version supports it, and we install and
maintain it ourselves."

## 4. Slogan candidates

Slogans are **unsearched** for trademark purposes and must not be adopted publicly. Each requires a
search and a professional opinion before use; none may be presented with `®`/`™`.

| # | ES | EN | Assessment |
| --- | --- | --- | --- |
| 1 | «Una sola marea.» | "One tide." | Strongest brand line: short, ownable, ties the name to the "one system, one vessel" idea, works in all three markets. Recommended direction (pending search). |
| 2 | «El mar, con datos.» | "The sea, with data." | Clear and technical; slightly cold; good for B2B decks. |
| 3 | «Conecta tu barco. Navega con criterio.» | "Connect your boat. Navigate with judgement." | Actionable, avoids safety promises; longer. |
| 4 | «Datos a bordo, decisiones claras.» | "Data aboard, clear decisions." | Honest benefit framing; useful for installer-facing material. |
| 5 | «Tecnología marina que puedes mantener.» | "Marine technology you can keep." | Serviceability angle; good for refit audiences, weak as a master slogan. |

**Recommendation:** use **«Una sola marea» / "One tide."** as the internal brand line for MC-04 concept
work, subject to a slogan search. Do not publish it in MC-03.

## 5. Product family descriptions (short, non-claiming)

Each is a category description, not a specification. Publishable only with the readiness language of the
claims policy §5.

| Family | ES | EN |
| --- | --- | --- |
| MAREA NAV | Software de navegación para planificar, navegar y registrar travesías, con cartografía sujeta a las licencias de cada fuente. | Navigation software for planning, sailing and logging passages, with chart sources subject to their own licence terms. |
| MAREA HUB | Pasarela de datos a bordo: reúne instrumentación, GPS, viento, baterías y sensores en una interfaz local de la embarcación. | Onboard data gateway: brings instruments, GPS, wind, batteries and sensors into one local vessel interface. |
| MAREA AIS | Recepción AIS de escucha para conocer el tráfico alrededor; no incluye transmisión ni evitación de colisiones. | Receive-only AIS for awareness of nearby traffic; it does not transmit and does not provide collision avoidance. |
| MAREA PILOT | Sistema de gobierno asistido y supervisado, con toma de control manual y parada de emergencia como límites de diseño. | Assisted, supervised steering system with manual takeover and emergency stop as design boundaries. |
| MAREA SENSE | Familia de sensores y módulos de instrumentación para medir viento, batería, tanques, sentinas y otros datos de a bordo. | Family of sensors and instrumentation modules for wind, battery, tanks, bilge and other onboard data. |
| MAREA WATCH | Monitorización remota del barco: posición, alertas y estado del sistema cuando no estás a bordo. | Remote vessel monitoring: position, alerts and system status when you are not aboard. |
| MAREA DISPLAY | Pantalla multifunción para el puesto de gobierno, con modos de legibilidad diurno y nocturno. | Multifunction display for the helm, with day and night legibility modes. |
| MAREA WEATHER | Servicio de previsión marítima con fuente y hora visibles en cada dato y comparación entre modelos cuando las licencias lo permitan. | Marine forecasting service with source and timestamp visible on every data point, and model comparison where licensing permits. |
| MAREA FLEET | SaaS de gestión para flotas pequeñas y profesionales: embarcaciones, permisos, estado, mantenimiento y documentos. | Management SaaS for small and professional fleets: vessels, permissions, status, maintenance and documents. |

## 6. Customer segment messaging

One proposition per segment. The differentiator changes with the buying decision, not the adjectives.

| Segment | ES message angle | EN message angle | Objection to answer directly |
| --- | --- | --- | --- |
| Recreational sailors | «Empieza con una sola pieza y amplía cuando quieras.» | "Start with one piece; expand when you want." | "Do I have to replace my electronics?" — No. |
| Coastal and offshore cruisers | «Datos fiables a bordo cuando la cobertura falla.» | "Reliable onboard data when connectivity fails." | "What happens offshore?" — local operation, stated limits. |
| Motorboat owners | «Menos pantallas, más información útil.» | "Fewer screens, more useful information." | "Will it fit my helm?" — compatibility matrix. |
| Owners modernising older vessels | «Tu barco no es viejo: está sin conectar.» | "Your boat is not old: it is unconnected." | "Is it worth it on a 15-year-old boat?" — module adoption. |
| Sailing schools | «Un barco, un registro, alumnos que entienden lo que ven.» | "One boat, one log, students who understand what they see." | "Can I prove what happened in a lesson?" — logging. |
| Charter operators | «Sabes dónde está cada barco sin llamar a nadie.» | "You know where each boat is without calling anyone." | "Does it work with my fleet's mixed equipment?" |
| Marinas | «Servicio técnico local para los barcos que atiendes.» | "Local technical service for the boats you look after." | "Who installs and supports it?" — EMBARCARTE. |
| Marine technicians | «Una matriz de compatibilidad y una instalación que puedes firmar.» | "A compatibility matrix and an installation you can sign off." | "Will it make my job harder?" — documented interfaces. |
| Installers | «Instalas una vez, documentas una vez, das soporte con criterio.» | "Install once, document once, support with confidence." | "Where is the manual and the wiring diagram?" |
| Shipyards | «Electrónica que se integra en el proyecto, no que lo retrasa.» | "Electronics that integrate into the project instead of delaying it." | "Can we get the interface spec?" |
| Small professional fleets | «Operación y mantenimiento en el mismo panel.» | "Operations and maintenance on the same panel." | "Data ownership and access control?" |

## 7. B2B commercial messaging

- Lead with scope, not adjectives: what is installed, what is measured, what is documented, what is
  excluded.
- Always include the compatibility matrix reference and the service plan reference in a proposal.
- Never imply a certification, a class approval or a warranty length that has not been written down.
- Frame installers as partners of **EMBARCARTE**: they buy from the company, install MAREA products,
  and are supported by the company.
- Quote availability only per the claims policy §5; otherwise state "fecha sujeta a validación".

## 8. Trust language (allowed today)

| ES | EN | Why it is true now |
| --- | --- | --- |
| «Publicamos qué hace el producto, qué no hace y con qué versión funciona.» | "We publish what a product does, what it does not do, and which version supports it." | It is a commitment about documentation practice, not a performance claim |
| «Compatibilidad publicada por equipo y versión.» | "Compatibility published per device and version." | Policy commitment; must be honoured on every page |
| «Instalación y soporte por EMBARCARTE.» | "Installed and supported by EMBARCARTE." | CONDITIONAL on deliverable service capability |
| «Sin duplicar suscripciones: una cuenta, una titularidad.» | "No duplicate subscriptions: one account, one entitlement." | Product architecture intent; verify before publishing per product |
| «Los datos se muestran con su fuente y su hora.» | "Data is shown with its source and its timestamp." | Design rule already in the claims policy |

Forbidden trust language: "de confianza", "líder", "referencia del sector", "avalado por", "certificado",
"garantía total", "100 % fiable", "probado en el mar" (no sea-trial evidence exists).

## 9. Calls to action — allowed by readiness

| Readiness state | ES CTA | EN CTA |
| --- | --- | --- |
| CONCEPT / DEFINED | «Ver la definición del producto» | "View the product definition" |
| DEFINED / ENGINEERING VERIFIED | «Solicitar estudio de compatibilidad» | "Request a compatibility review" |
| REGULATORY READY (not orderable) | «Solicitar propuesta» | "Request a proposal" |
| OPERATIONS READY | «Comprar» / «Añadir al carrito» | "Buy" / "Add to cart" |
| Unavailable product (PILOT today) | «Producto no disponible» | "Product not available" |

Forbidden CTAs while not ready: "Comprar", "Añadir al carrito", "Reservar ahora", "Precio de
lanzamiento", "Envío inmediato", "Plazas limitadas".

## 10. Comparison and subscription terminology

| Concept | ES | EN | Never write |
| --- | --- | --- | --- |
| Tested compatibility | «Compatible (versión probada)» | "Compatible (tested version)" | «Compatible con todo» |
| Requires | «Requiere» | "Requires" | «Incluye» when it does not |
| Not included | «No incluido» | "Not included" | Omitting exclusions |
| Per version | «Según versión de firmware» | "Per firmware version" | Implied permanent compatibility |
| Entitlement | «Titularidad de la suscripción» | "Subscription entitlement" | «Acceso ilimitado» |
| Renewal | «Renovación anual» | "Annual renewal" | «Gratis para siempre» |
| Cancellation | «Puedes cancelar y exportar tus datos» | "You can cancel and export your data" | Threats, dark patterns |

Subscription rule: state what renews, when, the price and VAT treatment, what becomes inaccessible on
cancellation, and what remains exportable. NAV/WEATHER entitlement sharing is described exactly as
implemented (no double billing).

## 11. Bilingual and localisation rules

1. **Never translate the names.** MAREA, the family names, edition names and bundle names are invariant
   across languages.
2. **Write, do not translate.** Every Spanish and English string is authored for its audience; literal
   translation is a defect. Column sizes, word order and CTA length differ — validate in the UI.
3. **Numbers and units.** Spanish: decimal comma, thousands point, "nudos", "millas náuticas", "millas
   por hora" only when needed. English: decimal point, "knots", "nautical miles". Prices: `1.299 €`
   (ES) vs `€1,299` (EN); state "IVA incluido" / "incl. VAT" or "sin IVA" / "excl. VAT".
4. **Dates.** `30/10/2026` in ES, `30 October 2026` in EN (ISO `2026-10-30` in technical contexts).
5. **Diacritics are mandatory** in Spanish (`navegación`, `instrumentación`, `cartografía`); English
   copy must not be forced through a Spanish typographic style.
6. **Locale parity is a gate**: a message key present in ES must exist in EN with equivalent meaning,
   not a placeholder. `npm run test:i18n` remains the route/dictionary gate; `npm run test:brand`
   validates the required brand message keys.
7. **Portuguese (future)**: treat as a third authored locale, never a Spanish variant. Record the
   register decision (tu/você) before writing.

## 12. Copy restrictions that override style

- No `®` / `™` anywhere near MAREA while clearance is pending.
- No certification, approval, homologation, official, or ECDIS wording.
- No safety promise (avoidance, prevention, guarantee, rescue, distress).
- No autonomy claim for PILOT; supervision and manual takeover are always mentioned.
- No unverified comparison with a named competitor.
- No invented stock, price, lead time, testimonial, customer count or award.
- No data claim without source and timestamp.
- No "by Open Marine"/"powered by OPEN-MARINE" as a customer-facing endorsement.
- Any claim that implies a capability not yet built must be replaced by a roadmap statement clearly
  marked as future ("previsto", "en desarrollo"), never as present.

## 13. Message governance

| Control | Where |
| --- | --- |
| Canonical ES/EN strings for the brand keys | `brand-identity.contract.json` → `messages` |
| Required keys present and non-empty in both locales | `npm run test:brand` |
| Claim classification of any published string | `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2–§5 and its claims register |
| Route/dictionary parity | `npm run test:i18n` (existing gate) |
| Live-site migration of these strings | `WEBSITE-BRAND-MIGRATION.md` (plan only; no change in MC-03) |

Anyone editing the canonical strings must edit the contract first, then this document, then run
`npm run test:brand`. Published copy that diverges from the contract is a defect, not a style choice.
