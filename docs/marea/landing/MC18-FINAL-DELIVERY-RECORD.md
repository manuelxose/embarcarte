# MC-18/36 — Registro de entrega final

| Campo                               | Valor                                                                                                                              |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Entregable                          | D23 — registro de entrega final                                                                                                    |
| Hito                                | MC-18/36 — landing corporativa bilingüe MAREA (sólo ámbito interno)                                                                |
| Rama                                | `feature/marea-mc18-bilingual-corporate-landing`                                                                                   |
| Base                                | `feature/marea-mc17-premium-design-system` @ `6002c49f898e755154c1b65c97781177719ce11c` (PR #24 abierto en borrador, sin fusionar) |
| Commit de implementación            | `ca64ec7f9f079326321cc7070ad2b1acf2832bc9`                                                                                         |
| Commit de correcciones de auditoría | `d5e99802df7b2073a25556e5d0d723273bf743a8`                                                                                         |
| SHA auditado independientemente     | `ca64ec7f9f079326321cc7070ad2b1acf2832bc9` (recomendación `PASS_INTERNAL_LANDING_SCOPE`)                                           |
| Correcciones re-verificadas         | `d5e99802df7b2073a25556e5d0d723273bf743a8`                                                                                         |
| HEAD final                          | este commit y los commits documentales posteriores; implementación `d5e9980` (los commits de documentación no cambian el SHA implementado)                                                                            |
| PR                                  | [#25](https://github.com/manuelxose/embarcarte/pull/25) — borrador, base `feature/marea-mc17-premium-design-system`, sin fusionar  |
| Veredicto                           | `MC18_VERDICT = PARTIAL`                                                                                                           |
| Ámbito interno                      | `MC18_INTERNAL_LANDING_SCOPE = PASS_INTERNAL_LANDING_SCOPE`                                                                        |
| Publicación                         | NOT_AUTHORIZED                                                                                                                     |
| Fusionado / desplegado / publicado  | false / false / false                                                                                                              |
| MC-19                               | `MC19_STARTED = false`                                                                                                             |

## 1. Artefactos entregados

| Área                                                                  | Ruta                                                                  | Estado                                 |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------- |
| Landing Angular (10 secciones, un árbol ES/EN)                        | `src/app/marea-landing/`                                              | Entregado                              |
| Contrato de contenido bilingüe (174 bloques / 348 registros)          | `src/app/marea-landing/content/`                                      | Entregado                              |
| Proyección canónica generada (9 familias / 26 ediciones / 6 paquetes) | `src/app/marea-landing/data/`                                         | Generado, determinista                 |
| Identidad de página, compuertas y contrato SEO                        | `src/app/marea-landing/models/`                                       | Entregado, fail-closed                 |
| Previsualización SSR aislada (bucle local 127.0.0.1:4302)             | `preview/landing/`, `angular.json` (`marea-landing-preview`)          | Entregado, aislado                     |
| Validador determinista (60 checks) y guardas                          | `scripts/check-marea-landing.mjs`, `scripts/marea-landing-guards.mjs` | Entregado                              |
| Pruebas unitarias/adversarias (45)                                    | `scripts/check-marea-landing*.test.mjs`                               | Entregado                              |
| Suite Playwright + axe + SSR/hidratación + responsive + rendimiento   | `e2e/landing/`, `playwright.landing.config.ts`                        | Entregado                              |
| Documentación D01–D23                                                 | `docs/marea/landing/`                                                 | Entregado                              |
| Datasets máquina-legibles (20) + evidencia de validador               | `docs/marea/landing/data/`, `docs/marea/landing/evidence/`            | Entregado                              |
| Baselines visuales (8 capturas + 8 baselines)                         | `e2e/landing/visual.spec.ts-snapshots/`                               | Entregado, con inestabilidad declarada |

## 2. Fotografía final de compuertas

| Compuerta                                                                                  | Resultado                                                                                             |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `npm run test:landing`                                                                     | **PASS, 60/60** (evidencia en `docs/marea/landing/evidence/validator-run.json`)                       |
| `npm run test:landing:unit`                                                                | **PASS, 45/45**                                                                                       |
| `npx playwright test -c playwright.landing.config.ts`                                      | **PASS, 44/44**; axe 0 critical/serious/moderate/minor; hidratación PASS; responsive 12/12            |
| `npx tsc -p tsconfig.app.json --noEmit`                                                    | PASS (exit 0)                                                                                         |
| `npx tsc -p preview/landing/tsconfig.json --noEmit`                                        | PASS (exit 0)                                                                                         |
| `npm run build:landing:preview`                                                            | PASS (exit 0)                                                                                         |
| `npm run build`                                                                            | PASS, 96 rutas; 330 archivos / 7.866.024 B; **0** identificadores de la landing                       |
| Aislamiento de producción                                                                  | `/marea` y `/en/marea` → **404** en el servidor público; estilos de producción sólo `src/styles.scss` |
| `npm run format:check`                                                                     | PASS                                                                                                  |
| `npm run test:design-system` / `:unit` / `:visual`                                         | PASS 38/38 · 41/41 · 37/37                                                                            |
| `npm run test:commerce-data`                                                               | PASS 1811/1811                                                                                        |
| `npm run test:ia-seo`                                                                      | PASS (20 datasets, 21 rutas actuales, 23 propuestas, 13 compuertas)                                   |
| `npm run test:legal-commercial`                                                            | PASS 54/54                                                                                            |
| `npm run test:products` / `test:bundles` / `test:hardware` / `test:economics`              | PASS 52/52 · 35/35 · 54/54 · 49/49                                                                    |
| `npm run test:brand` / `test:market` / `test:customer-research` / `test:customer-recovery` | PASS 21/21 · 40/40 · 62/62 · 32/32                                                                    |
| `npm run test:i18n` / `test:commerce` / `test:seo` / `test:backup`                         | PASS (sitemap 101 URLs; canonical/hreflang recíprocos)                                                |
| `npm run test:performance`                                                                 | Medido (sin umbrales; sin datos de campo)                                                             |
| `npm run test:e2e` (sitio público heredado)                                                | PASS 15/15                                                                                            |
| `npm run test:financial`                                                                   | **FAIL 76/77 — sólo `V-18` heredada** (no se oculta ni se reescribe)                                  |
| `npm audit --omit=dev --audit-level=high`                                                  | 0 vulnerabilidades                                                                                    |
| `git diff --check`                                                                         | PASS                                                                                                  |

Los recuentos de la landing (60 y 44 y 45) son los medidos en esta entrega; no se
prefijaron antes de ejecutar. El fallo heredado `V-18` se conserva como deuda.

## 3. Límites preservados

- Sin ruta pública MAREA: `src/app/app.routes.ts`, `src/app/app.routes.server.ts`,
  `src/app/core/i18n/locale-routes.ts` y `src/server.ts` son idénticos a la base.
- Sin sitemap, canonical, hreflang, Open Graph, Twitter card ni JSON-LD públicos.
- Sin navegación pública modificada, sin assets de marca en `public/`, sin estilos
  globales nuevos en producción.
- Sin precio, stock, SKU comercial, carrito, pago, suscripción ni captación de leads.
- Sin servicios externos, sin cookies, sin datos personales en la previsualización.
- Sin fusión, despliegue, publicación, envío de sitemap ni inicio de MC-19.
- `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`, `MAREA_PUBLIC_USE = NO_GO`,
  `FINAL_IDENTITY_ADOPTION = BLOCKED`, `SOURCE_IP_CLEARANCE = NOT_CLEARED`,
  `COMMERCIAL_AVAILABILITY = NOT_FOR_SALE`, `PRICE_APPROVED = NONE`,
  `LICENSING_RIGHTS_GRANTED = false`, `PILOT_SAFETY_GATE = BLOCKED`,
  `CE_MARKING_CLAIM = PROHIBITED`, `NMEA2000_CERTIFIED = false`,
  `TESTED_COMPATIBILITY_ROWS = 0`, `PUBLICATION_AUTHORIZED = false`,
  `PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED`.

## 4. Correcciones de auditoría y reconciliación de cifras

El auditor independiente auditó `ca64ec7` en árbol limpio y recomendó
`PASS_INTERNAL_LANDING_SCOPE` con 0 BLOCKING y 0 MAJOR abiertos (3 MINOR, 2
INFORMATIONAL). Las correcciones se registraron en `d5e9980`:

| Hallazgo                                                        | Severidad     | Corrección                                                                           |
| --------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------ |
| `MC18-IR-01` documentos con cifras previas a la congelación     | MINOR         | Reconciliado por este registro y por D22; la fotografía final es la de la sección 2  |
| `MC18-IR-02` `PAGE_MAREA_OVERVIEW` en el registro de evidencias | MINOR         | Corregido a `HUB_OVERVIEW` (valor del dataset canónico MC-15) y datasets regenerados |
| `MC18-IR-03` `app.listen` fuera de `isMainModule`               | MINOR         | El listener sólo arranca cuando `server.ts` es el entry point                        |
| `MC18-IR-04` variante de etiqueta de deuda heredada             | INFORMATIONAL | Aceptada como limitación documentada                                                 |
| `MC18-IR-05` alias `/` del preview ausente del dataset          | INFORMATIONAL | Registrado en `preview-isolation.json` (`developerRootAlias`)                        |

**Reconciliación de cifras (supersede MC18-IR-01).** Varios documentos (D01, D02, D08,
D09, D13, D14, D15, D16, D17, D18) se redactaron antes de que existieran todos los
artefactos y citan `55/60` con 5 fallos pendientes. Esas cifras eran correctas en su
momento y quedan superadas por este registro: en el SHA congelado el validador dio
`56/60` (los 4 fallos restantes eran documentos de entrega propiedad del Lead), tras la
auditoría `58/60`, y en el HEAD final **`60/60` PASS**. El `format:check` también pasó
a verde tras formatear los archivos de implementación. No se ha reescrito evidencia
histórica de MC-17; el manifiesto MC-17 conserva su índice `playwrightTests: 28`
(authoring-time) frente a los 37 medidos en su re-auditoría, clasificado en D01 §6.

## 5. Deuda heredada preservada

```text
FINANCIAL_V18 = INHERITED_OPEN
MC16_FINAL_02 = OPEN_UNTIL_REVERIFIED

MC13_F05 = OPEN
MC13_F11 = OPEN
MC13_F14 = OPEN

MC15_GSC01 = OPEN
MC15_GSC02 = OPEN
```

Ninguna se cierra en MC-18. La suite heredada no se declara verde mientras `V-18` siga
fallando. El defecto de inmutabilidad de precio de MC-16 sigue abierto.

## 6. Evidencia y limitaciones declaradas

- Axe es automatizado y sólo Chromium; 1 resultado `incomplete` de contraste por
  ejecución; no es una declaración de conformidad WCAG 2.2 AA ni sustituye una revisión
  con tecnologías de asistencia.
- Las líneas base visuales las generó el mismo equipo de QA; no hubo un segundo revisor
  humano de imágenes. 3/8 repeticiones fueron byte-idénticas y 5/8 presentaron
  inestabilidad subpíxel, registrada en `visual-regression-evidence.json`.
- El rendimiento es una única ejecución de laboratorio sobre loopback, sin throttling,
  sin datos de campo y sin umbrales de CI.
- La hidratación se verificó sólo en Chromium sobre la previsualización de desarrollo.
- El copy es borrador interno: no hay revisión de traductor profesional ni
  autorización de copy público (0/42 afirmaciones).
- La previsualización queda accesible sólo en bucle local; `noindex` es defensa en
  profundidad, no control de acceso.

## 7. Declaración de entrega

La landing interna bilingüe existe, reutiliza el sistema de diseño verificado, está
aislada del sitio público y ha sido revisada de forma independiente. Entregarla **no**
autoriza fusionar, desplegar, publicar, vender, adoptar la marca MAREA ni iniciar
MC-19. El PR #25 permanece en borrador contra la rama MC-17 y sin fusionar.

```text
MC18_VERDICT = PARTIAL
MC18_INTERNAL_LANDING_SCOPE = PASS_INTERNAL_LANDING_SCOPE
MC18_PUBLICATION = NOT_AUTHORIZED
MC18_PUBLIC_BRAND_ADOPTION = NOT_AUTHORIZED
MC18_PUBLIC_ROUTES_ACTIVATED = 0
MC18_PURCHASE_FUNCTIONALITY = false
MC18_LEAD_COLLECTION = false

MC17_VERDICT = PARTIAL
MC17_INTERNAL_DESIGN_SYSTEM_SCOPE = PASS_INTERNAL_DESIGN_SYSTEM_SCOPE
MC16_VERDICT = PARTIAL
MC16_INTERNAL_COMMERCE_DATA_SCOPE = PASS_INTERNAL_COMMERCE_DATA_SCOPE

FINANCIAL_V18 = INHERITED_OPEN
MC16_FINAL_02 = OPEN_UNTIL_REVERIFIED

PR_CREATED = 25
MERGED = false
DEPLOYED = false
PUBLISHED = false
MC19_STARTED = false
```
