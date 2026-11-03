# MC-16/36 — Informe ejecutivo (ES)

**Modelo de dominio comercial y de datos de producto MAREA: familias, ediciones, SKU, readiness, precios, stock, bundles y entitlements**

| Campo | Valor |
|---|---|
| Hito | MC-16/36 |
| Fecha | 2026-11-03 |
| Rama | `feature/marea-mc16-commerce-product-data-model` |
| Base verificada | `99212a41f5942a6fef4ede75815132c11fa4de50` (MC-15) |
| Implementación auditada | `ee4f5d20bb0613b6a0e3eaff600b93047cd8ea3e` |
| PR | [#23](https://github.com/manuelxose/embarcarte/pull/23), borrador, sin fusionar |
| Alcance | Interno, aislado, no activable |
| Disponibilidad comercial | `NOT_FOR_SALE` |

## A. Veredicto MC-16

**MC16_VERDICT = PARTIAL.** El alcance interno de modelo de datos comerciales se ha
entregado, ejecutado y auditado: **PASS_INTERNAL_COMMERCE_DATA_SCOPE**. El veredicto
global sigue siendo PARTIAL porque no existe evidencia externa de marca, licencias,
precios, stock, certificación, términos, pagos, seguro ni identidad legal, y porque MC-16 no
autoriza publicación, venta, facturación ni despliegue.

La auditoría independiente del commit final `ee4f5d2` no encontró defectos BLOCKING ni
MAJOR. Dejó un MINOR residual (endurecimiento adicional de la inmutabilidad de precios
aprobados) y dos observaciones informativas; ninguno autoriza ni bloquea comercio.

## B. Arquitectura del dominio

Se separan siete entidades lógicas:

| Entidad | Identidad | Función |
|---|---|---|
| `ProductFamily` | `familyId` | Una de las nueve familias MAREA |
| `ProductEdition` | `editionId` | Una de las 26 ediciones heredadas |
| `MerchantSKU` | `skuCode` | Unidad futura comercializable; hoy no existe ninguna |
| `BundleDefinition` | `bundleId` | Composición de ediciones, entitlements y servicios |
| `EntitlementDefinition` | `entitlementId` | Capacidad o servicio licenciado bajo condiciones |
| `SubscriptionPlan` | `planId` | Configuración comercial recurrente, no contrato |
| `EntitlementGrant` | `grantId` | Concesión con alcance; hoy solo sintética en tests |

Una página, una ruta, un precio o un bundle nunca crean una familia, edición o SKU. La
identidad de producto es neutral al idioma: ES y EN referencian la misma entidad y no
existe un SKU por locale.

## C. Modelo de datos

Se entregan 21 datasets canónicos en `docs/marea/commerce-data/data/` y una librería de
dominio tipada en `src/server/marea-commerce/domain.ts`. El esquema SQLite aislado
`mc16-commerce-schema-1.0.0` define 19 tablas `STRICT`, 19 triggers, 9 índices, claves
foráneas, unicidad, CHECKs y semántica de `null`.

Hechos actuales:

- 9 familias, 26 ediciones, 6 bundles, 23 rutas propuestas, 13 gates abiertos.
- 26 candidatos a SKU; 0 códigos de SKU mercantil.
- 26 registros de precio; 0 aprobados; importes, moneda, territorio, canal, IVA y fechas `null`.
- 0 artículos de inventario MAREA; 0 movimientos; cantidad verificada `null`.
- 13 planes de suscripción inactivos; 12 definiciones de entitlement; 0 grants reales.
- 0 rutas MAREA publicadas o indexables; 0 `Product`/`Offer` JSON-LD.

La instalación es idempotente y reversible en bases temporales. El CLI rechaza
`data/embarcarte.sqlite`, el directorio `data/` del repositorio y rutas no desechables. No
se ejecutó ninguna migración de producción.

## D. Productos y ediciones

Las nueve familias son NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER y FLEET. Las
26 ediciones se conservan exactamente: NAV-ESSENTIAL, NAV-PRO, HUB-STANDARD, HUB-PRO,
AIS-RECEIVER, AIS-CONNECTED, PILOT-COASTAL, PILOT-SAIL, PILOT-PRO, SENSE-WIND,
SENSE-POWER, SENSE-BILGE, SENSE-TANKS, SENSE-ENV, SENSE-ESSENTIALS, SENSE-SAIL,
SENSE-SYSTEMS, WATCH-CORE, WATCH-PLUS, DISPLAY-7, DISPLAY-LARGE-CONDITIONAL,
WEATHER-STANDARD, WEATHER-PRO, FLEET-START, FLEET-BUSINESS y FLEET-ENTERPRISE.

Todas tienen `merchantable=false`, `priceApproved=false`, `merchantSkuCode=null`,
`commercialAvailability=NOT_FOR_SALE` y ciclo `DEFINED`. No se inventó ninguna edición,
tamaño, precio, certificación ni disponibilidad.

## E. Bundles

Los seis bundles canónicos son START, CRUISE, SAIL, PROTECT, COMPLETE y FLEET. Todos son
`INTERNAL_ONLY`, `NOT_FOR_SALE`, sin precio de paquete fijo y no comprables.

- PILOT-PRO es un `INSTALLATION_PACKAGE`; nunca es línea de bundle, SKU ni checkout.
- DISPLAY-LARGE-CONDITIONAL no es seleccionable ni componente.
- FLEET-ENTERPRISE es un tier B2B contratado; no es autoservicio.
- FLEET no incluye hardware por defecto y no tiene SLA.
- SENSE-ESSENTIALS expande exactamente a SENSE-POWER + SENSE-BILGE, sin duplicar módulos.
- SAIL y COMPLETE permanecen bloqueados por PILOT.

## F. Readiness y comercialización

El ciclo tiene siete estados: CONCEPT, DEFINED, ENGINEERING_VERIFIED, REGULATORY_READY,
OPERATIONS_READY, COMMERCIALLY_AVAILABLE y RETIRED. La readiness es multidimensional:
definición, ingeniería, licencias, hardware, derechos de datos, compliance, seguridad,
precios, marca/publicación, operaciones y disponibilidad.

Ninguna familia, edición o bundle puede alcanzar REGULATORY_READY, OPERATIONS_READY o
COMMERCIALLY_AVAILABLE en MC-16. Las transiciones fallan cerradas si falta un gate, una
evidencia, un rol aprobador, un evento de auditoría o si el actor no está autorizado.
`evaluatePurchasability()` devuelve para todas las entidades actuales:

```
allowed = false
effectivePrice = null
effectiveStock = null
```

## G. Precios y stock

Los precios de MC-12/MC-13 siguen siendo hipótesis internas. No se convierten en precio
público, de carrito, checkout, JSON-LD, factura ni renovación. Se usan unidades menores
enteras cuando exista precio; hoy no existe ninguno. La aprobación exige evidencia
externa verificada, rol autorizado, moneda, territorio, canal, base de IVA y fecha.

El stock introducido por un administrador en la tienda genérica no es stock MAREA. No hay
inventario MAREA verificado. Las cantidades desconocidas son `null`, no cero. Las reservas
futuras usan transacción y actualización condicional para no sobrevender.

## H. Suscripciones y entitlements

NAV, WEATHER, WATCH y FLEET se modelan por separado de los contratos de facturación y de
las concesiones. WEATHER y NAV comparten un ledger canónico y nunca se facturan dos veces.
WATCH conserva sus funciones locales de seguridad independientes de la suscripción.
FLEET se limita a organización/tenant/vessel, con aislamiento de tenant y sin telemetría
de cliente en MC-16. No se creó ninguna suscripción ni entitlement real.

## I. Seguridad

Controles principales: autoridad de servidor, evaluador fail-closed, roles aprobadores,
triggers de activación, inmutabilidad de precios aprobados, auditoría append-only con
hash, aislamiento de tenant y prohibición de grants reales. El módulo no se importa en
ninguna ruta pública, tienda, checkout, Stripe ni componente Angular. La auditoría
detectó y corrigió un fallo de orden de declaración que impedía el build; el commit final
compila y pasa los gates.

## J. Integración con la tienda actual

No se modificó `src/server/db.ts`, `api.ts`, `stripe.ts`, el carrito, la tienda, las
órdenes, las rutas, el sitemap, el canonical/hreflang, la navegación ni el despliegue. Los
8 archivos legacy conservan su hash normalizado LF. La tienda genérica sigue funcionando
por su código existente; `products.active=1` no autoriza comercio MAREA.

## K. Pruebas

| Gate | Resultado |
|---|---|
| `npm run test:commerce-data` | 1730/1730 PASS |
| `npm run test:commerce-data:unit` | 74/74 PASS (21 dominio/datos + 37 adversariales + 16 persistencia) |
| `npm run test:ia-seo` / `:unit` | PASS / 63 PASS |
| `npm run test:legal-commercial` / `:unit` | 54/54 / 41/41 PASS |
| `npm run test:financial` | **76/77, FAIL V-18 heredado** |
| `npm run test:financial:unit` | **28/29, FAIL por el mismo V-18** |
| `npm run test:economics` / `:unit` | 49/49 / 64/64 PASS |
| `npm run test:hardware` / `:unit` | 54/54 / 59/59 PASS |
| `npm run test:products` / `:unit` | 52/52 / PASS |
| `npm run test:bundles` / `:unit` | 35/35 / 60/60 PASS |
| `npm run test:brand` / `:unit` | 21/21 / 13/13 PASS |
| `npm run test:market` / `:unit` | 40/40 / 43/43 PASS |
| `npm run test:customer-research` / `:unit` | 62/62 / 111/111 PASS |
| `npm run test:customer-recovery` / `:unit` | 32/32 / 82/82 PASS |
| `test:i18n`, `test:commerce`, `test:seo`, `test:backup` | PASS |
| `format:check`, `build`, `test:e2e`, `npm audit --omit=dev`, `git diff --check` | PASS |
| Persistencia SQLite | 16/16 PASS, incluida reserva atómica y rollback |

La suite de build/e2e se ejecutó en Windows con `--test-isolation=none` donde el harness
lo requiere. La única deuda heredada es V-18.

## L. Deuda heredada

- **V-18** (`scripts/check-marea-financial-model.mjs`): el validador financiero de MC-13
  sigue exigiendo que la fila 14 del registro esté `PLANNED`; MC-14 ya está `PARTIAL`. Es
  deuda de estado del validador, no un defecto aritmético. No se modificó MC-13 ni el
  registro para hacerla pasar. `test:financial` y `test:financial:unit` fallan por esta
  causa.
- **MC-13 F-05/F-11/F-14**: siguen OPEN.
- **MC-15 GSC-01/GSC-02**: siguen OPEN (indexación parcial y sitemap raíz).
- No se declara una suite verde completa mientras V-18 permanezca rojo.

## M. Auditoría independiente

La auditoría final la realizó un agente no autor (`independent-auditor-final`) sobre el
commit `ee4f5d20bb0613b6a0e3eaff600b93047cd8ea3e`, no sobre el resumen del autor.
Reejecutó build, typecheck, validator, unitarias y financiero; verificó 9/26/6/23/13,
los ceros, la ausencia de imports públicos y los guards SQLite. Veredicto:
`PASS_INTERNAL_COMMERCE_DATA_SCOPE`, 0 BLOCKING, 0 MAJOR, 1 MINOR residual (campos
adicionales de precio aprobado) y 2 informativas. El informe D21 y
`data/review-findings.json` registran hallazgos, reproducción y correcciones. Las
correcciones fueron reverificadas y el commit final compila.

## N. Git y PR

| Elemento | Valor |
|---|---|
| Rama | `feature/marea-mc16-commerce-product-data-model` |
| Base | `99212a41f5942a6fef4ede75815132c11fa4de50` |
| Implementación inicial auditada | `4e67ae2f0a4f4d8d2de3d46ddf2a2543796be366` |
| Correcciones | `0a30a62`, `c9ef80e`, `981c53f`, `ee4f5d2` |
| Commit final auditado | `ee4f5d20bb0613b6a0e3eaff600b93047cd8ea3e` |
| PR | #23, `OPEN`, borrador, base MC-15, sin merge |
| `MERGED` | `false` |
| `DEPLOYED` | `false` |
| Migración de producción | `NOT_EXECUTED` |
| Datos de producción | no abiertos ni modificados |

## O. Handoff MC-17

Se entrega el contrato de presentación: forma de entidad, relaciones familia/edición,
bundles, etiquetas de readiness, reglas de visibilidad de precio y stock, entitlements,
restricciones de claims, contratos ES/EN, estados de CTA no comprables, accesibilidad y
fixtures sintéticos. `MC17_STARTED = false`; no se implementó ningún componente ni cambio
público de UI.

---

```
MC16_VERDICT = PARTIAL
MC16_INTERNAL_COMMERCE_DATA_SCOPE = PASS_INTERNAL_COMMERCE_DATA_SCOPE
MC16_PRODUCT_FAMILY_MODEL = IMPLEMENTED_9_OF_9
MC16_EDITION_MODEL = IMPLEMENTED_26_OF_26
MC16_MERCHANT_SKU_MODEL = IMPLEMENTED_NO_MERCHANT_SKU_CREATED
MC16_BUNDLE_MODEL = IMPLEMENTED_6_OF_6
MC16_READINESS_STATE_MACHINE = IMPLEMENTED_FAIL_CLOSED
MC16_SERVER_AUTHORITATIVE_PURCHASABILITY = IMPLEMENTED_INTERNAL_ONLY
MC16_PRICE_APPROVAL_MODEL = IMPLEMENTED_ZERO_APPROVED
MC16_INVENTORY_PROVENANCE = IMPLEMENTED_ZERO_VERIFIED_STOCK
MC16_SUBSCRIPTION_ENTITLEMENT_MODEL = IMPLEMENTED_ZERO_REAL_GRANTS
MC16_SQLITE_SCHEMA_VALIDATION = PASS_19_TABLES_19_TRIGGERS
MC16_LEGACY_COMMERCE_COMPATIBILITY = PRESERVED_UNCHANGED
MC16_INDEPENDENT_REVIEW = PASS_INTERNAL_COMMERCE_DATA_SCOPE

MC16_MERCHANTABLE_MAREA_SKUS = 0
MC16_APPROVED_PRICES = 0
MC16_VERIFIED_SELLABLE_STOCK = 0
MC16_REAL_SUBSCRIPTIONS_CREATED = 0
MC16_REAL_ENTITLEMENTS_GRANTED = 0

MC15_VERDICT = PARTIAL
MC15_INTERNAL_IA_SEO_SCOPE = PASS_INTERNAL_IA_SEO_SCOPE
MC15_GSC_EVIDENCE = SEARCH_CONSOLE_VERIFIED_PARTIAL_24_URLS

MC14_VERDICT = PARTIAL
MC14_INTERNAL_LEGAL_GOVERNANCE_SCOPE = PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE

TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
PRICE_APPROVED = NONE
LICENSING_RIGHTS_GRANTED = false
CUSTOMER_WTP_VALIDATED = false
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE

PR_CREATED = true (#23)
MERGED = false
DEPLOYED = false
MC17_STARTED = false
```
