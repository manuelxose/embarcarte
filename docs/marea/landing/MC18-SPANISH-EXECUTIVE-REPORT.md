# MC-18/36 — Informe ejecutivo (ES)

| Campo                               | Valor                                                                                                                             |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Entregable                          | D22 — informe ejecutivo en español                                                                                                |
| Hito                                | MC-18/36 — landing corporativa bilingüe MAREA (interna, no publicada)                                                             |
| Rama                                | `feature/marea-mc18-bilingual-corporate-landing`                                                                                  |
| Base verificada                     | `6002c49f898e755154c1b65c97781177719ce11c` (MC-17; PR #24 abierto en borrador y sin fusionar)                                     |
| Commit de implementación            | `ca64ec7f9f079326321cc7070ad2b1acf2832bc9`                                                                                        |
| Commit de correcciones de auditoría | `d5e99802df7b2073a25556e5d0d723273bf743a8`                                                                                        |
| Auditoría independiente             | `docs/marea/landing/MC18-INDEPENDENT-REVIEW.md` (D21) + `data/review-findings.json`                                               |
| PR                                  | [#25](https://github.com/manuelxose/embarcarte/pull/25) — borrador, base `feature/marea-mc17-premium-design-system`, sin fusionar |
| Publicación                         | **NOT_AUTHORIZED**                                                                                                                |
| Veredicto                           | `MC18_VERDICT = PARTIAL` — el ámbito interno se verifica; las aprobaciones externas siguen sin concederse                         |

## A. Veredicto MC-18

MC-18 se ejecutó como implementación interna aislada. La landing bilingüe existe, se
reutiliza el sistema de diseño MC-17 verificado, la previsualización SSR funciona en
bucle local y no se ha activado ninguna ruta pública, canonical, hreflang, sitemap,
compra, captación de datos ni despliegue.

El ámbito interno se considera verificado:

```text
MC18_VERDICT = PARTIAL
MC18_INTERNAL_LANDING_SCOPE = PASS_INTERNAL_LANDING_SCOPE
MC18_PUBLICATION = NOT_AUTHORIZED
MC18_PUBLIC_BRAND_ADOPTION = NOT_AUTHORIZED
```

El veredicto global sigue siendo `PARTIAL` porque las autorizaciones externas
(clearance de marca, licencias de datos, identidad legal, copy público, claims,
privacidad, datos comerciales, despliegue) no existen y ninguna compuerta MC-14 se ha
cerrado. Una compilación, un validador o una prueba de accesibilidad no autorizan la
publicación.

## B. Línea base Git y commits

| Elemento                           | Valor                                                                                  |
| ---------------------------------- | -------------------------------------------------------------------------------------- |
| HEAD remoto MC-17 verificado       | `6002c49f898e755154c1b65c97781177719ce11c`                                             |
| PR #24                             | OPEN / DRAFT / MERGEABLE, base MC-16, sin fusionar                                     |
| Ancestro MC-16                     | `6d8287c8507038c4f90fd6e35471f78081ca4676` presente en la historia                     |
| `origin/main`                      | No contiene MC-17 (`merge-base --is-ancestor` = 1)                                     |
| Rama MC-18                         | Creada desde `6002c49`; sólo local hasta el primer push                                |
| Implementación                     | `ca64ec7f9f079326321cc7070ad2b1acf2832bc9`                                             |
| Correcciones de auditoría          | `d5e99802df7b2073a25556e5d0d723273bf743a8`                                             |
| HEAD final                         | este commit de documentación de entrega (D22 + D23)                                    |
| PR de entrega                      | [#25](https://github.com/manuelxose/embarcarte/pull/25), borrador, nunca contra `main` |
| Fusionado / desplegado / publicado | `false` / `false` / `false`                                                            |

No se ha reescrito ninguna evidencia histórica. La única modificación de configuración
del sitio público es la exclusión de las suites internas en `playwright.config.ts`
(`testIgnore` añade `**/landing/**`, igual que MC-17 hizo con `**/design-system/**`).

## C. Arquitectura Angular de la landing

Implementación real en `src/app/marea-landing/`:

- `landing.ts`: un único componente raíz (`marea-landing`) que envuelve todo en
  `marea-theme` (modo `web-light`), fija el locale antes de renderizar los hijos y
  compone las diez secciones. No existe una página ES y otra EN.
- `sections/`: diez componentes de sección (`hero`, `ecosystem`, `families`,
  `architecture`, `bundles`, `softwareHardware`, `professionals`, `documentation`,
  `availability`, `closing`) con anclas estables y `aria-labelledby` correcto.
- `components/`: banner interno, cabecera, pie, marco de sección e índice de pliegos
  (composición local; no duplica componentes del sistema de diseño).
- `content/`: contrato bilingüe tipado (174 bloques, 348 registros de locale) con
  `contentId`, `sectionId`, `locale`, `sourceType`, `copyClass`, `evidenceIds`,
  `publicationStatus=INTERNAL_DRAFT_NOT_APPROVED` y `approvalStatus=NOT_APPROVED`.
- `data/`: proyección generada de sólo lectura desde los datasets canónicos MC-16 y
  adaptador a las APIs reales del sistema de diseño. Cero precios, stock, SKU,
  clientes o datos de embarcación.
- `models/`: identidad de página congelada, compuertas de publicación fail-closed y
  contrato SEO de planificación.
- `preview/landing/`: aplicación Angular SSR aislada (`marea-landing-preview`) que
  renderiza el componente real en `/marea` y `/en/marea`, escucha sólo en
  `127.0.0.1:4302`, aplica `X-Robots-Tag: noindex, nofollow, noarchive`, allowlist de
  `Host` y CSP restrictiva.

La landing no es alcanzable desde ningún entry point de producción; el validador
recorre el grafo de imports de producción y obtiene cero accesos.

## D. Reutilización del sistema de diseño MC-17

Se reutilizan, sin fork y sin copiar plantillas, al menos 12 módulos canónicos:
`MareaTheme`, tipografía (`[marea-text]`), `marea-container`, `marea-grid`,
`marea-stack`, `marea-section-heading`, `marea-surface`, `marea-notice`,
`marea-status-badge`, `marea-family-card`, `marea-bundle-components`,
`marea-bundle-exclusions`, `marea-readiness-panel`, `marea-commercial-cta`,
`marea-responsive-nav`, `marea-icon` y los adaptadores fail-closed de comercio.

`src/app/marea-design-system/` permanece byte-idéntico a `6002c49` y su propio
validador se re-ejecutó en `38/38`. El CTA comercial continúa siendo explicación, no
control; no existe botón, formulario ni ruta de compra.

## E. Secciones y composición visual

Las diez secciones se implementaron como componentes Angular reales y se compusieron
con un lenguaje editorial de instrumentación marina (pliegos numerados, reglas
capilares, cifras tabulares, abstracción náutica original en SVG/CSS):

1. Hero editorial con clasificación interna y panel de hechos registrados.
2. Ecosistema propuesto en cinco estratos.
3. Las nueve familias canónicas, con limitaciones materiales visibles.
4. Arquitectura modular conceptual (matriz de dependencias + lista textual de
   relaciones; ninguna interoperabilidad verificada).
5. Los seis paquetes de solución con composición, exclusiones y restricciones.
6. Relación software/hardware (definido, condicional, no verificado, licencias).
7. Profesionales e instalaciones, sin formularios ni captación.
8. Documentación y principios técnicos, sin certificaciones ni titularidad de código.
9. Disponibilidad y estado: readiness derivada, hechos registrados y CTA fail-closed.
10. Cierre informativo, sin embudo comercial.

## F. Nueve familias y seis paquetes

- Familias: `NAV`, `HUB`, `AIS`, `PILOT`, `SENSE`, `WATCH`, `DISPLAY`, `WEATHER`,
  `FLEET` (9/9), con `readiness` y restricciones derivadas del registro canónico.
- Paquetes: `START`, `CRUISE`, `SAIL`, `PROTECT`, `COMPLETE`, `FLEET` (6/6), con la
  composición canónica y las expansiones de kit anidadas una sola vez.
- Ediciones: 26, canónicas y **no** SKUs comerciales (0 `merchantSkuCode`, 0
  merchantable, 0 precios aprobados).
- Limitaciones preservadas: PILOT supervisado (sin navegación autónoma ni control en
  vivo, puerta de seguridad bloqueada); AIS sólo recepción (sin transmisión ni
  evitación de colisiones); WATCH sin garantía de alertas ni monitorización continua;
  FLEET solución contractual sin hardware por defecto ni SLA; SENSE-ESSENTIALS
  representa POWER + BILGE sin doble cómputo; DISPLAY sin dimensiones inventadas;
  NAV/WEATHER sin datos licenciados incluidos.

## G. Contenido ES/EN y paridad

Un único contrato bilingüe con 174 bloques y 348 registros de locale. La paridad se
verifica de forma determinista: mismos `contentId`, mismo orden de secciones, mismas
identidades de familia y paquete, mismos números (normalizados), misma presencia de
negaciones en los bloques de restricción y ausencia de texto en español residual en
inglés. La suite Playwright (44/44) compara texto renderizado en ambos idiomas y
comprueba que no hay marcadores sin traducir. No se afirma revisión por traductor
profesional ni revisión editorial de accesibilidad: es copy interno en borrador.

## H. SEO y restricciones de indexación

Existe un contrato tipado de planificación (`models/seo.ts`) con título, descripción,
candidatos de canonical/hreflang, candidatos de Open Graph/Twitter, elegibilidad de
datos estructurados, elegibilidad de sitemap y las compuertas que lo bloquean. La
previsualización emite únicamente `robots=noindex, nofollow, noarchive`, la cabecera
`X-Robots-Tag` y un `lang` correcto.

No se emiten canonical, hreflang, Open Graph, Twitter card ni JSON-LD
Product/Offer. La activación futura exige **todas** las compuertas de publicación y un
registro de autorización de release que no existe (`null`); un booleano, variable de
entorno o parámetro de consulta no puede activarla.

## I. Evidencia SSR e hidratación

La previsualización se construyó con SSR real (Angular `AngularNodeAppEngine`,
`RenderMode.Server` por petición) y se verificó:

- `/marea` 200 con `<html lang="es-ES">`; `/en/marea` 200 con `<html lang="en">`.
- Un solo `<h1>` por página, diez secciones, 9 familias y 6 paquetes presentes en el
  HTML servidor.
- Sin canonical, hreflang, Open Graph, Twitter card ni JSON-LD en HTML bruto.
- `X-Robots-Tag: noindex, nofollow, noarchive`; rutas desconocidas 404.
- Hidratación PASS en ambos idiomas: 0 errores de consola, sin DOM duplicado, sin
  desajuste, h1 estable, interacción de teclado funcional tras hidratar.
- `base href="/"` corrigió un defecto real detectado por QA que impedía cargar CSS/JS
  en `/en/marea`.

## J. Accesibilidad y responsive

- Axe (`@axe-core/playwright`) en ES/EN y 1440/390: **0 critical, 0 serious, 0
  moderate, 0 minor**; 1 resultado `incomplete` de contraste por ejecución, documentado
  y no resuelto manualmente. Es evidencia automatizada; no es una declaración de
  conformidad WCAG 2.2 AA.
- Teclado: skip link primero, foco visible 3px, sin trampa, nav móvil con
  `aria-expanded`/`aria-controls` y cierre con Escape (ruta documentada).
- Responsive: 12/12 combinaciones (320/360/390/768/1024/1440 × ES/EN) sin desbordamiento
  horizontal; banner, hero, 9 familias, 6 paquetes y 9/9 limitaciones visibles a 320px.
- Movimiento reducido respetado; zoom de texto al 200 % aproximado sin desbordamiento.
- Límites: sólo Chromium, sin lectores de pantalla ni sesiones con AT.

## K. Rendimiento y aislamiento de producción

- Medición de laboratorio local (una ejecución, sin datos de campo): HTML SSR 316.049 B
  (ES) / 313.958 B (EN); CSS 11.586 B; JS de la previsualización 1.851.809 B en build
  de desarrollo sin compresión; CLS 0; apertura de nav 32,5/20,9 ms.
- Aislamiento: `dist/embarcarte` (330 archivos, 7.866.000 B) contiene **0** apariciones
  de `marea-landing`, `data-marea-landing`, `marea-landing-preview` y `MareaLanding`.
- El servidor público sirve `/marea` y `/en/marea` como **404**; los estilos de
  producción siguen siendo sólo `src/styles.scss`.
- El sitio público conserva sus rutas, sitemap, metadatos y funcionalidad de tienda y
  cuenta; MC-17 y el sistema de diseño permanecen intactos.

## L. Afirmaciones legales/comerciales y puertas de publicación

Se preservan todos los estados: `TRADEMARK_LEGAL_CLEARANCE=NOT_GRANTED`,
`MAREA_PUBLIC_USE=NO_GO`, `FINAL_IDENTITY_ADOPTION=BLOCKED`,
`SOURCE_IP_CLEARANCE=NOT_CLEARED`, `COMMERCIAL_AVAILABILITY=NOT_FOR_SALE`,
`PRICE_APPROVED=NONE`, `LICENSING_RIGHTS_GRANTED=false`, `PILOT_SAFETY_GATE=BLOCKED`,
`AIS_TRANSMISSION_OFFERED=false`, `FLEET_DEFAULT_HARDWARE=false`,
`CE_MARKING_CLAIM=PROHIBITED`, `NMEA2000_CERTIFIED=false`,
`TESTED_COMPATIBILITY_ROWS=0`, `PUBLICATION_AUTHORIZED=false`,
`PRODUCTION_DEPLOYMENT=NOT_AUTHORIZED`.

13 compuertas MC-14, 0 cerradas; 24 documentos requeridos, 0 ejecutados; 0/42
afirmaciones con autorización pública. El evaluador de compuertas es fail-closed y no
puede activarse desde la interfaz.

## M. Pruebas deterministas y adversarias

- Validador MC-18: **60/60** comprobaciones en la entrega final (60 checks ejecutados;
  el recuento no se prefijó antes de ejecutar).
- Unitarias/adversarias: **45/45**. Se reproducen 37 mutaciones adversarias
  independientes (router público, sitemap, canonical/hreflang, JSON-LD, banner,
  compra, precio, stock, certificaciones, autonomía, transmisión AIS, garantías,
  hardware FLEET, doble cómputo SENSE, limitaciones caídas, segunda identidad EN,
  captación de leads, telemetría de embarcación, publicación del preview, assets en
  `public/`, debilitamiento de compuertas, noindex, hidratación, foco, disclaimers
  móviles, componente DS duplicado, import público del preview, página no aprobada
  marcada como desplegable); todas fueron rechazadas.
- Playwright de la landing: **44/44** (contenido, paridad ES/EN, teclado, axe,
  responsive, SSR/hidratación, rendimiento, aislamiento).
- Playwright público heredado: **15/15**; suite de catálogo MC-17: **37/37**.

## N. Regresiones heredadas y bloqueos

Se preservan sin reescribir:

- `FINANCIAL_V18 = INHERITED_OPEN` — `npm run test:financial` sigue en 76/77 porque su
  aserción histórica exige que MC-14 permanezca PLANNED. No se etiqueta la suite
  heredada como verde.
- `MC16_FINAL_02 = OPEN_UNTIL_REVERIFIED` (inmutabilidad de precio aprobado).
- `MC13_F05`, `MC13_F11`, `MC13_F14 = OPEN`.
- `MC15_GSC01`, `MC15_GSC02 = OPEN` (deuda operativa de Search Console).
- Resto de compuertas heredadas ejecutadas: diseño 38/38 y 41/41 y 37/37, datos de
  comercio 1811/1811, IA/SEO OK, legal/comercial 54/54, productos 52/52, paquetes
  35/35, hardware 54/54, economía 49/49, marca 21/21, mercado 40/40, customer research
  62/62 y recovery 32/32, i18n OK, commerce OK, SEO OK (101 URLs de sitemap), backup OK,
  rendimiento medido, build OK, `tsc` OK (app y preview), `format:check` OK,
  `npm audit --omit=dev --audit-level=high` 0 vulnerabilidades, `git diff --check` OK.

## O. Auditoría independiente, correcciones y hallazgos finales

El auditor independiente (agente distinto de los autores) auditó el SHA congelado
`ca64ec7` con árbol limpio y recomendó:

```text
MC18_INDEPENDENT_AUDIT_RECOMMENDATION = PASS_INTERNAL_LANDING_SCOPE
```

0 hallazgos BLOCKING y 0 MAJOR abiertos. Hallazgos: 3 MINOR y 2 INFORMATIONAL en el SHA
congelado. Correcciones aplicadas en `d5e9980`:

- `MC18-IR-01` (documentos con cifras previas a la congelación): reconciliado por D23 y
  por este informe; la entrega registra las cifras finales.
- `MC18-IR-02` (`PAGE_MAREA_OVERVIEW` en el registro de evidencias): corregido a
  `HUB_OVERVIEW`, el valor del dataset canónico MC-15.
- `MC18-IR-03` (`app.listen` fuera de `isMainModule`): corregido; el listener sólo
  arranca cuando `server.ts` es el entry point.
- `MC18-IR-04`/`MC18-IR-05` (variante de etiqueta de deuda heredada; alias `/` del
  preview): aceptados como limitaciones informativas documentadas.

El auditor re-verificó las correcciones y actualizó `review-findings.json` con
`correctionCommit` e `independentReverification`. Las debilidades de evidencia quedan
declaradas: axe es automatizado y sólo Chromium, las líneas base visuales las generó el
mismo equipo de QA sin segundo revisor, el rendimiento es una única ejecución de
laboratorio y la hidratación se probó sólo en Chromium sobre la previsualización.

## P. PR en borrador y evidencia de no despliegue

- PR [#25](https://github.com/manuelxose/embarcarte/pull/25): borrador, base
  `feature/marea-mc17-premium-design-system`, sin fusionar.
- Sin despliegue: no se publicó la previsualización, no se sirvió desde el servidor
  público, no se añadió a sitemap ni a navegación pública.
- Sin activación de rutas públicas MAREA: `/marea` y `/en/marea` devuelven 404 en el
  servidor de producción.
- Sin compra, carrito, checkout, suscripción ni captación de leads.

## Q. Traspaso a MC-19 sin ejecución

MC-19/36 (páginas de segmento/solución y flujos de consulta para armadores,
instaladores y profesionales) no se ha iniciado: `MC19_STARTED = false`. El traspaso
técnico está en D18 y `data/mc19-handoff-inputs.json`: arquitectura de secciones,
contrato de contenido bilingüe, componentes reutilizables, restricciones de CTA,
requisitos de privacidad y consentimiento, compuertas de publicación, disclaimers
legales, evidencia de accesibilidad, requisitos SSR/hidratación y bloqueos restantes.
No existe formulario, endpoint de contacto, registro de instaladores ni flujo de
presupuesto.

```text
MC18_VERDICT = PARTIAL
MC18_INTERNAL_LANDING_SCOPE = PASS_INTERNAL_LANDING_SCOPE

MC18_ANGULAR_IMPLEMENTATION = PASS_INTERNAL_IMPLEMENTATION
MC18_DESIGN_SYSTEM_REUSE = VERIFIED_NO_FORK
MC18_SECTIONS_IMPLEMENTED = 10/10
MC18_PRODUCT_FAMILIES_COVERED = 9/9
MC18_BUNDLES_COVERED = 6/6
MC18_ES_EN_PARITY = VERIFIED_INTERNAL_CONTENT
MC18_INTERNAL_PREVIEW = PASS_LOOPBACK_ONLY
MC18_SSR_VERIFICATION = PASS
MC18_HYDRATION_VERIFICATION = PASS
MC18_ACCESSIBILITY = AUTOMATED_EVIDENCE_ONLY
MC18_RESPONSIVE_VALIDATION = PASS_12_OF_12
MC18_SEO_CONTRACT = PLANNED_PUBLIC_DISABLED
MC18_PUBLIC_INDEXATION = NOT_AUTHORIZED
MC18_LEGACY_SITE_NON_REGRESSION = PASS_PUBLIC_SURFACE_UNCHANGED
MC18_INDEPENDENT_REVIEW = PASS_INTERNAL_LANDING_SCOPE

MC18_PUBLICATION = NOT_AUTHORIZED
MC18_PUBLIC_BRAND_ADOPTION = NOT_AUTHORIZED
MC18_PUBLIC_ROUTES_ACTIVATED = 0
MC18_PURCHASE_FUNCTIONALITY = false
MC18_LEAD_COLLECTION = false

MC17_VERDICT = PARTIAL
MC17_INTERNAL_DESIGN_SYSTEM_SCOPE = PASS_INTERNAL_DESIGN_SYSTEM_SCOPE
MC17_FINAL_REAUDIT = COMPLETE

MC16_VERDICT = PARTIAL
MC16_INTERNAL_COMMERCE_DATA_SCOPE = PASS_INTERNAL_COMMERCE_DATA_SCOPE

FINANCIAL_V18 = INHERITED_OPEN
MC16_FINAL_02 = OPEN_UNTIL_REVERIFIED

TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
PRICE_APPROVED = NONE
LICENSING_RIGHTS_GRANTED = false
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE

PR_CREATED = 25
MERGED = false
DEPLOYED = false
PUBLISHED = false
MC19_STARTED = false
```
