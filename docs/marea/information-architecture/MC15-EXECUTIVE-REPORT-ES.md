# MC-15/36 — Informe ejecutivo en español

**Arquitectura de información bilingüe, registro SEO de rutas, preservación de URLs,
mapa de redirecciones, gobernanza de indexación y gates de publicación**

| Campo | Valor |
|---|---|
| Rama | `feature/marea-mc15-bilingual-ia-seo-migration` |
| Base verificada | MC-14 HEAD `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Commit de implementación congelado | `b70d5500591be63d00ac33b4c1de6c802981b46d` |
| Commit de correcciones de auditoría | `d1d7a1a848fb2a82334811aad9b916d4041cd4a2` |
| Pull request | [#22](https://github.com/manuelxose/embarcarte/pull/22), borrador, base `feature/marea-mc14-legal-commercial-risk-claims-policy` |
| Alcance | Planificación interna de IA/SEO; sin publicación, indexación, despliegue, venta ni MC-16 |
| Auditoría independiente | `PASS` tras correcciones (0 BLOCKING, 0 MAJOR, 0 MINOR abiertos; 3 observaciones informativas aceptadas) |

---

## A. Veredicto MC-15

```text
MC15_VERDICT = PARTIAL
MC15_INTERNAL_IA_SEO_SCOPE = PASS_INTERNAL_IA_SEO_SCOPE
```

El **alcance interno de planificación IA/SEO es PASS**: las 21 rutas actuales están
inventariadas y verificadas, las 23 rutas propuestas no colisionan, el mapa de
redirecciones es determinista y sin bucles ni cadenas, canonical/hreflang son
recíprocos, la indexación y los datos estructurados están gobernados, los 34
hallazgos web de MC-14 están mapeados sin cerrarlos, los 13 gates y 24 documentos
están consumidos, los datasets son legibles por máquina y el validador y las
pruebas adversariales pasan.

El **veredicto global es PARTIAL** porque:

1. La evidencia externa de indexación es **parcial**: Search Console confirma 16 de
   24 URLs inspeccionadas, 2 excluidas por noindex, 5 no reconocidas y 1 URL
   pública/indexable no indexada (`/traslados`); no es un censo de las 98 URLs del
   sitemap. `/traslados` es un hallazgo operativo preexistente (`GSC-01`).
2. La migración en vivo, la publicación de páginas MAREA y la indexación no están
   autorizadas por MC-15.
3. La validación heredada `test:financial` falla por un defecto **preexistente**
   (V-18, fila 14 del registro en `PARTIAL` desde MC-14), no por MC-15.

Un PASS interno **no autoriza** ninguna ruta MAREA nueva, ningún cambio de URL en
vivo, ninguna redirección nueva, ningún sitemap ni ninguna venta.

---

## B. Arquitectura actual verificada

- **21 RouteIds semánticos** en `src/app/core/i18n/locale-routes.ts`: `home`,
  `technology`, `technologyDetail`, `experiences`, `delivery`, `services`, `about`,
  `contact`, `guides`, `guideDetail`, `shop`, `shopDetail`, `shopSample`, `cart`,
  `login`, `account`, `orderDetail`, `legalNotice`, `privacy`, `cookies`,
  `termsOfSale`.
- **28 registros de ruta**: 21 públicos + 7 de administración (`admin`,
  `adminOrders`, `adminOrderDetail`, `adminProducts`, `adminProductEdit`,
  `adminCustomers`, `adminMessages`).
- **141 URLs concretas** inventariadas: 24 estáticas, 12 de tecnología (6 slugs ×
  2 idiomas), 60 de guías (30 slugs × 2), 2 listas de tienda, 2 patrones de
  detalle de tienda, 20 de productos de muestra, 8 privadas, 7 de administración,
  4 de redirección heredada y 2 superficies 404.
- **Sitemap baseline**: 12 RouteIds prerenderizados × 2 = 24; 6 detalles de
  tecnología × 2 = 12; 30 guías × 2 = 60; total 96. El servidor añade `/tienda` y
  `/en/shop` → **98 URLs**. El test heredado siembra 2 productos activos (uno
  traducido) y produce 3 URLs de producto → **101**. Ese 101 es una observación de
  fixture, no un recuento de producción ni evidencia de indexación.
- **Superficie privada**: `/carrito`, `/en/cart`, `/acceso`, `/en/login`,
  `/cuenta`, `/en/account`, detalle de pedido y `/admin` responden con
  `X-Robots-Tag: noindex, nofollow`, sin canonical ni hreflang y fuera del sitemap.
- **Muestras**: `/tienda/muestra/:slug` y `/en/shop/sample/:slug` son `noindex`,
  con canonical propio y sin alternates.
- **Redirects heredados activos**: `/open-marine` → `/tecnologia`,
  `/productos` → `/tecnologia`, `/productos/:slug` → `/tecnologia/:slug`, 301 de
  un solo salto.
- **Canonical/hreflang actual**: cada página indexable es autocanónica con
  alternates recíprocos ES/EN absolutos; `x-default` solo existe en el par home y
  apunta al home español; las páginas privadas no emiten canonical ni hreflang;
  `shopDetail` solo emite alternate EN cuando el producto tiene traducción
  completa.
- **Evidencia**: `REPOSITORY_VERIFIED` para el inventario; ejecución SSR aislada
  del 2026-11-02 (build `dist`, `DATA_DIR` temporal, puertos 4323/4324) para
  sitemap, canonical, hreflang, robots, estados y redirects; observación pública
  read-only del 2026-11-03 (sitemap y tres URLs); y **Search Console verificado
  el 2026-11-02** para 24 URLs representativas.

---

## C. Arquitectura futura propuesta

Se preserva íntegramente la capa corporativa existente. No se elimina ni se
redirige ninguna página de servicios, experiencias, traslados, guías, tienda,
cuenta o legales hacia el futuro catálogo MAREA.

**23 rutas propuestas**, todas `PROPOSED_INTERNAL_NOT_DEPLOYABLE`:

| Grupo | Rutas |
|---|---|
| Hubs | `mareaOverview` (`/marea`), `mareaProducts` (`/marea/productos`), `mareaSolutions` (`/marea/soluciones`) |
| 9 familias | NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET bajo `/marea/<familia>` |
| 6 bundles | START, CRUISE, SAIL, PROTECT, COMPLETE, FLEET bajo `/marea/soluciones/<bundle>` |
| Herramienta | `mareaConfigurator` (`/marea/configurador`) |
| Superficies raíz | `professionals` (`/profesionales`), `installers` (`/instaladores`), `support` (`/soporte`) |
| Documentación | `productDocumentation` (`/soporte/marea/:slug`) |

Cada ruta declara `routeDefined = true` e `implementationReady`,
`publicationAuthorized`, `indexationAuthorized` y
`commercialTransactionAuthorized` en `false`. Los patrones ES/EN son exactos, con
identidad de entidad estable (`ENT-FAMILY-*`, `ENT-BUNDLE-*`). El registro incluye
9/9 familias, 6/6 bundles y las 26 ediciones de MC-05/06/07; no se inventa ninguna
edición.

**Colisiones**: 0 colisiones sin resolver. Se comprobaron 42 patrones actuales
(21 ES + 21 EN), 3 redirects heredados, 7 rutas de admin, literales frente a
parámetros y la precedencia `shopSample`/`shopDetail`. `/soporte/marea/:slug` es
un namespace más profundo que no ensombrece nada; `fleet` se reutiliza solo en dos
namespaces declarados con entidades distintas; `/productos` sigue reservado tras
el 301 activo.

---

## D. SEO bilingüe, canonical y hreflang

- **88 filas** canonical/hreflang = 44 pageIds × 2 idiomas (21 actuales + 23
  propuestas).
- **15 grupos recíprocos** publicados; cada uno se autorreferencia, usa URLs
  absolutas y la misma identidad semántica.
- **1 único `x-default`**, en el home, apuntando al home español.
- Las 46 filas propuestas quedan `BLOCKED_NO_CANONICAL`, sin grupo hreflang
  emitido y sin sitemap hasta autorización separada.
- Las páginas privadas no tienen canonical ni alternates.
- `shopDetail` EN es condicional: si el producto no tiene nombre, categoría,
  resumen y descripción en inglés, la URL EN es `noindex` y no declara alternate.
- No se inventa ninguna página EN para contenido no traducido.
- El contrato bilingüe conserva títulos y descripciones existentes como valor
  observado y usa plantillas internas con placeholders (`{{approvedBrand}}`,
  `{{readinessLabel}}`) para las páginas propuestas. No se ha modificado ningún
  `<title>`, meta description, canonical, hreflang ni JSON-LD en vivo.
- Las plantillas propuestas no contienen la marca literal MAREA, precios,
  disponibilidad, certificaciones, ratings, reviews ni lenguaje de venta. El
  validador rechaza esas inclusiones (IA-049/IA-069).

---

## E. Redirecciones y preservación

- **53 registros** en `redirect-map.json`:
  - 3 redirecciones heredadas **activas** (301 de un salto), preservadas sin cambio;
  - 42 registros `KEEP_AS_IS` (21 RouteIds × 2 idiomas, 200, no ejecutados);
  - 7 superficies de administración internas;
  - 1 propuesta condicional `PROPOSED_NOT_ACTIVE`, no ejecutada y con
    autorización requerida.
- **0 migraciones nuevas** para URLs españolas existentes. La decisión válida en
  MC-15 es `KEEP_AS_IS`; no se ha generado ninguna migración para “ordenar” la
  taxonomía.
- **Invariantes verificados**: sin bucles, sin cadenas, sin cruces de idioma, sin
  redirecciones masivas al home, sin destinos 404, sin redirección a páginas MAREA
  no aprobadas, sin destino login/cuenta como sustituto de contenido, con
  identidad de entidad y tratamiento explícito de query/fragment.
- La cadena de consulta se pierde en los 301 heredados (comportamiento actual,
  registrado como riesgo `SEO-RISK-15`, no corregido en MC-15).
- Un slug heredado desconocido (`/productos/does-not-exist`) responde **404 con
  `Location: /tecnologia/does-not-exist` y cuerpo vacío**. No es un 3xx; se
  registra como comportamiento heredado (hallazgo IA-04) y no se modifica.
- `executionStatus` es `NOT_EXECUTED` en todo el mapa planificado; las 3 heredadas
  se marcan `EXISTING_ACTIVE`. Ningún redirect se ha activado en MC-15.

---

## F. Indexación, sitemap, robots y datos estructurados

- **14 clases de indexación** con HTTP status, `robotsMeta`, `X-Robots-Tag`,
  canonical, hreflang, elegibilidad de sitemap, elegibilidad de datos
  estructurados y gate de publicación.
- **0 rutas MAREA elegibles para sitemap**; ningún `/marea` aparece en el sitemap
  local (404 en ambos idiomas).
- Sitemap local aislado: **98 URLs** con catálogo vacío; **101** con el fixture
  heredado de 2 productos. Sin URLs privadas, de admin, de muestra ni MAREA.
- `robots.txt` no se usa como sustituto de `noindex`; no se ha modificado.
- **Datos estructurados**: se inventaría la implementación existente (Organization,
  WebSite, BreadcrumbList, Article, Service, ItemList, Product, Offer,
  SoftwareApplication). El `Product`/`Offer` de la tienda no MAREA se documenta y
  **no se modifica**. Cero `Product`/`Offer`/precio/disponibilidad/rating/review/
  certificación para MAREA. La elegibilidad de producto se decide con
  independencia de que el producto esté definido internamente.
- **Search Console (2026-11-02/03, read-only)**: propiedad
  `sc-domain:embarcarte.com` con permiso `siteFullUser`; 24 URLs inspeccionadas:
  **16 indexadas**, 2 excluidas por noindex (`/carrito`, `/cuenta`), **5 no
  reconocidas** y **1 pública/indexable no indexada** (`/traslados`; el texto de
  cobertura varía entre “no reconoce” y “descubierta, actualmente sin indexar”).
  **0 URLs MAREA indexadas.**
- **Sitemap en Search Console**: `sitemap.xml` enviado con **98 URLs, 0 errores**;
  además, la home `https://embarcarte.com/` figura enviada como sitemap con
  **1 error** (envío inválido, deuda operativa `GSC-02`).
- **`/traslados`**: pública, indexable, autocanónica y en el sitemap, pero Google
  no la reconoce (`GSC-01`). Es un hallazgo operativo preexistente, fuera del
  alcance de implementación de MC-15.
- La indexación queda `SEARCH_CONSOLE_VERIFIED_PARTIAL` para las 24 URLs
  inspeccionadas y `INDEXATION_UNVERIFIED` para el resto. No se afirma un censo
  completo, ni ranking, ni tráfico, ni ingresos.

---

## G. Gobernanza legal y comercial

Se preservan sin cambios:

```text
TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
PRICE_APPROVED = NONE
LICENSING_RIGHTS_GRANTED = false
CUSTOMER_WTP_VALIDATED = false
PILOT_SAFETY_GATE = BLOCKED
AIS_TRANSMISSION_OFFERED = false
FLEET_DEFAULT_HARDWARE = false
CE_MARKING_CLAIM = PROHIBITED
NMEA2000_CERTIFIED = false
TESTED_COMPATIBILITY_ROWS = 0
MC14_COMMERCIAL_CLAIMS_PUBLICATION = NOT_AUTHORIZED
PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED
```

Los **13 gates** de MC-14 se consumen con sus estados de origen intactos (12
BLOCKED + 1 EVIDENCE_REQUIRED, 0 cerrados) y los **24 documentos** requeridos.
La matriz de 23 rutas declara los estados independientes
`routeDefined/implementationReady/publicationAuthorized/indexationAuthorized/
commercialTransactionAuthorized`; solo `routeDefined` es `true`. Las listas de
gates son la unión conservadora de las tres derivaciones y el validador exige
igualdad exacta (IA-068).

---

## H. Hallazgos web de MC-14

- **34/34 hallazgos mapeados** (`WEB-001`…`WEB-034`) con archivo, rango de líneas,
  ruta, severidad, riesgos, impacto SEO/IA, acción recomendada, responsable futuro,
  evidencia requerida, gate, milestone planificado y estado.
- **0 hallazgos cerrados**. `originalStatus` permanece `NOT_REMEDIATED`; el estado
  MC-15 es `PLANNED_NOT_REMEDIATED`. Un plan de remediación no es una remediación.
- Distribución preservada: 6 BLOCKING, 20 MAJOR, 4 MINOR, 4 INFORMATIONAL.
- Se documenta la discrepancia entre `mc15-handoff-inputs.pageByPageIssues` y el
  dataset autoritativo `website-findings.json` (por ejemplo, WEB-022 está en
  `/sobre-nosotros` y `/cookies` no tiene hallazgo). Se usa el dataset como fuente
  de verdad.

---

## I. Navegación, breadcrumbs y grafo de enlaces

- **206 aristas / 103 enlaces únicos** en el grafo interno planificado.
- 52 enlaces apuntan a páginas existentes; 51 a rutas propuestas, todos
  `plannedNotLive`.
- **0 huérfanas**: las 23 propuestas son alcanzables desde `mareaOverview`; todas
  las páginas actuales no privadas tienen entrada.
- **0 referencias rotas**, 0 errores de idioma, 0 enlaces de navegación viva a
  rutas bloqueadas, 0 ciclos de breadcrumb, 0 entradas duplicadas, 0 padres
  ausentes.
- Profundidad planificada máxima: **3**. Los objetivos de profundidad son metas
  internas de diseño, no hechos de rastreo ni de ranking de Google.
- No se emite ningún breadcrumb en vivo en MC-15.

---

## J. Plan de migración y rollback

Siete fases, todas `NOT_EXECUTED` y con autorización requerida:

| Fase | Objetivo | Estado |
|---|---|---|
| 0 | Preservación del baseline (rutas, URLs, sitemap, SSR, canonical/hreflang) | NOT_EXECUTED |
| 1 | Candidatos corporativos aprobados (no preautorizados) | NOT_EXECUTED |
| 2 | Prerrequisito de clearance de marca MAREA | NOT_EXECUTED |
| 3 | Implementación futura de páginas de producto/solución en otros hitos | NOT_EXECUTED |
| 4 | Verificación controlada de migración (redirects, canonical, hreflang, JSON-LD, sitemap) | NOT_EXECUTED |
| 5 | Release autorizado (aprobación separada) | NOT_EXECUTED |
| 6 | Monitorización post-release (Search Console futuro, errores de rastreo, redirects, triggers de rollback) | NOT_EXECUTED |

**Rollback**: `PLAN_ONLY — NOT_READY_TO_EXECUTE`. Se define con artefactos
versionados (SHA, checksums, versión del contrato de redirects, sitemap capturado,
snapshot de URLs de Fase 0, esquema de BD) y se rechaza inventar un identificador
de despliegue o release. Los prerrequisitos no están cumplidos y se declaran como
tales: no hay snapshot de Fase 0, no hay sitemap previo capturado, no hay ensayo
de rollback ni monitorización. Los servicios, experiencias, traslados, guías,
tecnología, tienda, cuenta y legales existentes sobreviven a cualquier rollback
sin cambio.

---

## K. Pruebas ejecutadas

| Gate | Resultado |
|---|---|
| `npm run test:ia-seo` | PASS — 20 datasets, 21 rutas actuales, 23 propuestas, 34 hallazgos, 13 gates |
| `npm run test:ia-seo:unit` | PASS — 63/63 pruebas |
| Mutaciones adversariales del auditor | 21/21 rechazadas por su motivo previsto |
| `test:i18n`, `test:commerce`, `test:seo`, `test:backup` | PASS |
| `test:legal-commercial` (+unit) | PASS |
| `test:economics` (+unit), `test:hardware` (+unit), `test:products` (+unit), `test:bundles` (+unit), `test:brand` (+unit), `test:market` (+unit), `test:customer-research` (+unit), `test:customer-recovery` (+unit) | PASS |
| `format:check`, `build`, `test:e2e` (15/15), `npm audit --omit=dev --audit-level=high`, `git diff --check` | PASS |
| `test:financial` / `test:financial:unit` | **FAIL preexistente** — V-18: la fila 14 del registro está en `PARTIAL` desde MC-14 `2626853`; el validador financiero no se actualizó. No es una regresión de MC-15 y no se ha modificado ningún archivo financiero. |
| SSR aislado | 98 URLs de sitemap con catálogo vacío; 101 con el fixture heredado; 3×301 de un salto; `/marea` 404; privadas noindex sin canonical; `x-default` solo home ES. |
| Search Console (read-only) | 24 inspecciones: 16 indexadas, 2 noindex, 5 no reconocidas y 1 pública/indexable no indexada (`/traslados`); sitemap 98/0 errores; home enviada como sitemap con 1 error; 0 MAREA indexadas. |

Se ejecutaron pruebas **contra Search Console en modo read-only** (24 inspecciones y
sitemaps) y una observación pública read-only del sitemap y tres URLs. No se ejecutó
ninguna escritura, envío de sitemap, solicitud de indexación ni cambio en vivo.
Ninguna prueba bloqueada o no ejecutada se reporta como PASS.

---

## L. Auditoría independiente

- **Ronda 1**, commit congelado `b70d550`: veredicto **NEEDS_REVISION** — 0
  BLOCKING, 2 MAJOR (`IA-01` gates divergentes en 11/23 rutas; `IA-02` el
  validador no rechazaba afirmaciones de transmisión AIS ni de hardware por
  defecto FLEET), 3 MINOR (`IA-03` sitemap de la tienda; `IA-04` observación
  incorrecta del 404 heredado; `IA-05` manifest pendiente) y 3 INFORMATIONAL.
- **Correcciones** en `d1d7a1a`: unión conservadora de gates con igualdad exigida
  por el validador; reglas y pruebas para AIS/FLEET; corrección de
  `shop.sitemapExpected`; observación exacta del 404 con `Location` y cuerpo
  vacío; regeneración del manifest.
- **Ronda 2**, commit `d1d7a1a`: veredicto **PASS**. `IA-01`…`IA-05`
  `CLOSED_VERIFIED`; permanecen 3 observaciones informativas aceptadas
  (`IA-06` urlIds no-página, `IA-07` evidencia SSR centralizada, `IA-08` higiene
  del puerto 4323). 31 comandos: 29 PASS, 2 fallos preexistentes, 0 bloqueados.
- El auditor no autoró la implementación y no modificó archivos de
  implementación; solo escribió `MC15-INDEPENDENT-REVIEW.md` y
  `review-findings.json`.
- **Ronda 3 — anexo Search Console**, commit `ad744e9`: revisión independiente
  **PASS**. La revisión inicial detectó dos MINOR (`C-01`: clasificación de
  `/traslados` y recuentos derivados; `C-02`: el validador no rechazaba un
  canonical manipulado en una URL PASS). Correcciones: `/traslados` se clasifica
  como `PUBLIC_INDEXABLE_NOT_INDEXED` con historial de cobertura
  (“no reconoce” / “descubierta sin indexar”), recuentos 16/2/5/1; regla `IA-074`
  con prueba. `C-01` y `C-02` `CLOSED_VERIFIED`; `GSC-01`/`GSC-02` permanecen
  abiertos como deuda operativa preexistente, fuera de la implementación MC-15.
  Revisor: 154/154 comprobaciones de datos, 5/5 mutaciones rechazadas, 63/63
  pruebas.

---

## M. Git y pull request

| Elemento | Valor |
|---|---|
| Base | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Rama | `feature/marea-mc15-bilingual-ia-seo-migration` |
| Commit implementación | `b70d5500591be63d00ac33b4c1de6c802981b46d` |
| Commit correcciones | `d1d7a1a848fb2a82334811aad9b916d4041cd4a2` |
| Commit anexo Search Console | `ad744e9f5f4d7e71d6c77692f45c3f737032771e` |
| Commit final de registro | se reporta en la respuesta final y en el PR |
| PR | [#22](https://github.com/manuelxose/embarcarte/pull/22) |
| Estado PR | OPEN, borrador, MERGEABLE, sin merge |
| Archivos cambiados respecto a base | 49 (solo `docs/marea/information-architecture/`, `docs/marea/execution/`, `package.json`, `scripts/check-marea-ia-seo.mjs`, `scripts/check-marea-ia-seo.test.mjs`) |
| `src/`, `public/`, `.github/` | 0 cambios |
| Merge / deploy / publicación / sitemap | NO / NO / NO / NO |

---

## N. Handoff a MC-16

`MC16_STARTED = false`. El handoff está **READY_FOR_MC16_WITH_NAMED_GAPS**:
identidades de ruta estables, 9 familias, 26 ediciones, 6 bundles, mapeos de
locale/slug, separación página vs SKU, campos de ciclo de vida/readiness, gates
comerciales, elegibilidad SEO, restricciones de datos estructurados, procedencia
de precio/stock, referencias de entitlement/subscripción, riesgos de integración
comercial actuales, dependencias legales de MC-14 y tareas de remediación abiertas.
No se ha diseñado ni ejecutado el modelo de datos de MC-16, ni se han modificado
SKUs, pedidos, pagos o checkout.

---

## Bloque de estado final

```text
MC15_VERDICT = PARTIAL
MC15_INTERNAL_IA_SEO_SCOPE = PASS_INTERNAL_IA_SEO_SCOPE
MC15_CURRENT_ROUTE_INVENTORY = 21 routeIds / 28 route records / 141 concrete URLs / 98 sitemap URLs (101 with inherited 2-product fixture)
MC15_PROPOSED_ROUTE_REGISTRY = 23 routes (3 hubs + 9 families + 6 bundles + configurator + professionals + installers + support + documentation), all PROPOSED_INTERNAL_NOT_DEPLOYABLE
MC15_REDIRECT_MAP = 53 records (3 existing active 301 + 42 KEEP_AS_IS + 7 admin internal + 1 conditional proposed); 0 activated
MC15_CANONICAL_HREFLANG = 88 rows / 44 pageIds; 15 reciprocal groups; 1 x-default (ES home); 46 BLOCKED_NO_CANONICAL proposed
MC15_SITEMAP_INDEXATION_POLICY = 14 classes; 0 MAREA sitemap-eligible; 98 sitemap URLs; 24-URL Search Console sample
MC15_SEARCH_CONSOLE_EVIDENCE = 24 inspected: 16 indexed / 2 noindex / 5 not recognized / 1 public-indexable-not-indexed (/traslados, GSC-01); sitemap 98/0 errors; root sitemap GSC-02; 0 MAREA indexed
MC15_MC14_FINDINGS_COVERAGE = 34/34 mapped; 0 remediated; 0 closed
MC15_INDEPENDENT_REVIEW = PASS after corrections (d1d7a1a); 0 BLOCKING / 0 MAJOR / 0 MINOR open; 3 INFORMATIONAL accepted
MC15_SEARCH_CONSOLE_REVIEW = PASS (addendum commit ad744e9); C-01/C-02 CLOSED_VERIFIED; GSC-01/GSC-02 OPEN pre-existing operational debt

MC15_LIVE_MIGRATION = NOT_AUTHORIZED
MC15_PUBLICATION = NOT_AUTHORIZED
MC15_INDEXATION_EVIDENCE = SEARCH_CONSOLE_VERIFIED_PARTIAL_24_URLS

MC14_VERDICT = PARTIAL
MC14_INTERNAL_LEGAL_GOVERNANCE_SCOPE = PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE

TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
PRICE_APPROVED = NONE
LICENSING_RIGHTS_GRANTED = false
CUSTOMER_WTP_VALIDATED = false
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE

PR_CREATED = 22 (draft, base feature/marea-mc14-legal-commercial-risk-claims-policy)
MERGED = false
DEPLOYED = false
MC16_STARTED = false
```
