# MC-17/36 — Informe ejecutivo (ES)

| Campo | Valor |
|---|---|
| Hito | MC-17/36 — Sistema de diseño premium MAREA (uso interno) |
| Rama | `feature/marea-mc17-premium-design-system` |
| Base verificada | `6d8287c8507038c4f90fd6e35471f78081ca4676` (MC-16; PR #23 OPEN/DRAFT/MERGEABLE, sin fusionar) |
| Commits | `3a8d4fd` implementación · `7cbc99e` correcciones de auditoría · commit de entrega (este documento) |
| Estado | Interno, no publicado. Sin fusión, sin despliegue, sin venta. |

## A. Veredicto MC-17

- **Ámbito interno del sistema de diseño:** implementado y verificado técnicamente (tokens, 48 componentes Angular + 1 directiva, catálogo interno, pruebas, documentación y datasets).
- **Revisión independiente:** tres rondas. La primera encontró 2 MAJOR (límites familiares definidos pero no renderizados; estado revisado sin commit) y 6 MINOR. La segunda, sobre `7cbc99e`, cerró el MAJOR de reproducibilidad y confirmó que el MAJOR de presentación seguía abierto. La tercera, sobre `4a9043b`, exigió correcciones (9 familias, guardas de aislamiento/variantes, procedencia visual, gobernanza y cobertura de formato); el commit de corrección `f2c9ec2` fue re-auditado con resultado **PASS_INTERNAL_DESIGN_SYSTEM_SCOPE** (0 BLOCKING/MAJOR/MINOR abiertos).
- **Conclusión honesta:** `MC17_VERDICT = PARTIAL` porque las autorizaciones externas (marca, uso público, precio/stock, hardware, publicación) no están concedidas; el alcance interno del sistema de diseño sí queda verificado. No se autoriza fusión, despliegue, publicación, venta, adopción de marca ni inicio de MC-18.

## B. Arquitectura del sistema de diseño

- Biblioteca aislada en `src/app/marea-design-system/` (standalone, OnPush, señales, estilos encapsulados). **No se importa** desde `app.routes.ts`, cabecera, pie, tienda, carrito, checkout ni ninguna ruta pública.
- Tokens: una única fuente (`tokens/marea-design-tokens.source.json`), generador determinista (`scripts/build-marea-design-tokens.mjs`) que produce CSS con ámbito `marea-theme`, capa TypeScript tipada y datasets. Sin `:root`, sin variables del sitio vivo sobrescritas.
- Datos: contratos tipados + fixtures sintéticas derivadas de MC-16 + adaptador *fail-closed* (`deriveCommercialPresentation`).
- Catálogo interno: proyecto Angular separado `marea-design-system-catalogue` (fuente `preview/`), salida `dist/marea-ds-catalogue`, servidor local `scripts/marea-ds-preview-server.mjs` (4301). No forma parte de `npm run build`.
- Sin dependencias nuevas; sin servicios, sin API pública, sin acceso a la base SQLite ni a Stripe.

## C. Fundamentos visuales

- **33 roles de color × 4 modos** (web-light corporativo; instrumento día/sol/noche), 262 filas de procedencia, 163 propiedades CSS, **296 pares de contraste medidos, 0 fallos**.
- Modos de instrumento derivados por contrato MC-04, no por inversión CSS. Noche sin `#000000` ni `#ffffff`. Foco del sistema `#0f5f8c` (propuesto); el sitio vivo mantiene `#8fd2f5` y el hallazgo F-1 de MC-04 sigue **abierto**.
- Tipografía: Manrope (títulos y cifras, `tabular-nums`) y DM Sans (texto). Espaciado 4–128 px, controles 32/40/48, objetivo mínimo AA 24 px y preferencia interna 44 px, radios 3/6/píldora, elevación solo para overlays.
- Contexto corporativo claro conservado; no se impone tema oscuro al sitio público.

## D. Modos de instrumento

- Día, sol y noche implementados como atributos de `marea-theme`, con tokens propios y superficies de estado medidas.
- Todos los componentes de medición llevan marca visible **DEMO** y datos sintéticos; ningún valor nulo se muestra como cero ni como valor congelado.
- **Sin validación de hardware** (legibilidad con luz solar, visión nocturna, pantallas reales): BLOCKED. No se afirma certificación ni rendimiento marino.

## E. Componentes Angular

- **48 componentes + 1 directiva** (49 entradas de registro), 131 entradas y 3 salidas tipadas; contratos con 11 estados (aplicable o `NOT_APPLICABLE` justificado).
- Fundación (texto, títulos, layout, superficie, botón, enlace, icono, badge, aviso, estados, formulario), estructura (tabs ARIA con teclado, acordeón nativo, disclosure, tablas, navegación responsiva, migas, comparación, calidad de dato, permisos), comercio (familia, edición, preparación, paquete, derechos, precio/stock retenidos, CTA, documentación) e instrumentación (lectura numérica, frescura, conectividad, telemetría).
- Foco visible con tokens, objetivos táctiles ≥24 px, `prefers-reduced-motion`, sin trampas de teclado, sin ARIA decorativa.

## F. Presentación comercial

- Invariantes *fail-closed*: `purchaseActionAllowed=false`, `cartAllowed=false`, `priceVisible=false`, `availabilityVisible=false`, incluso con señales hostiles (`buyCtaAllowed=true`). El CTA no renderiza botón ni enlace.
- Cinco estados CTA derivados; `QUOTE_ONLY` no es oferta ni garantía; `REQUEST_INFORMATION` no recoge datos; prohibidos precio, stock, preventa, lista de espera, plazo y SLA.
- 9 familias, 26 ediciones y 6 paquetes representados desde MC-16; PILOT bloqueado por seguridad, AIS solo recepción, FLEET sin hardware por defecto, SENSE-ESSENTIALS sin doble conteo, DISPLAY sin dimensiones inventadas, NAV/WEATHER sin datos no licenciados, derechos con un solo registro contable.

## G. Accesibilidad

- WCAG 2.2 AA como norma de trabajo. Axe (4 modos): **0 violaciones, 36 comprobaciones superadas por modo**, con revisión manual de teclado, foco, zoom al 200 %, tablas con región desplazable y estados no dependientes del color.
- Limitaciones declaradas: sin pruebas con lector de pantalla real, sin otros navegadores ni dispositivos, contraste calculado sobre valores declarados. **No se declara conformidad WCAG.**

## H. Comportamiento responsive

- Anchos probados 320/360/390/768/1024/1440 y texto al 200 %: sin desbordamiento horizontal, tablas contenidas, controles sin solaparse.
- Defecto real detectado y corregido: rejillas implícitas dimensionadas a *max-content* producían 876 px a 320 px; se fijaron pistas `minmax(0, 1fr)` y `overflow-wrap` para palabras largas.

## I. Rendimiento

- Build de producción: PASS; el sistema de diseño aporta **0 bytes** (no existe ruta de importación; 168 ficheros analizados).
- Medición de laboratorio (una ejecución, sin afirmación de campo): LCP escritorio 184–360 ms, CLS ≤0,0018; móvil emulado LCP 704–1392 ms, CLS ≤0,0003; interacción observada 56–64 ms.
- SSR: build de producción correcto; componentes sin globals de navegador, ids deterministas, sin efectos que escriban durante el render. El sistema no se renderiza en el servidor público por diseño (catálogo aislado).

## J. Operación bilingüe

- ES por defecto; EN como traducción del mismo mensaje. **138 claves** bilingües, entidades neutrales, una sola entidad por edición, sin duplicados por idioma.
- El catálogo alterna ES/EN y el par visual ES/EN ahora se captura sobre la galería comercial (las capturas difieren).

## K. Catálogo de componentes

- Ejecución local: `npm run build:design-system-preview`, `npm run preview:design-system` o `npm run serve:design-system-preview`; pruebas `npm run test:design-system:visual`.
- Renderiza componentes reales, no maquetas; incluye estados deshabilitados, error/vacío, teclado, ES/EN, cuatro modos y viewports móvil/escritorio. Banner visible de uso interno en todo el catálogo.

## L. Regresiones

- Todas las puertas heredadas ejecutadas: comercio-data 1786/1786, IA/SEO, legal-comercial, economía, hardware, productos, paquetes, marca, mercado, investigación y recuperación de cliente, i18n, comercio, SEO, backup y e2e público 15/15: en verde.
- `test:financial` falla **solo** por V-18 heredado (MC-13/14): no se reescribe la historia. `MC16-FINAL-02` sigue `OPEN_UNTIL_REVERIFIED`. `MC16-FINAL-09` permanece informativo.
- Sitio público: 35 ficheros vigilados y 15 activos públicos idénticos al byte respecto a MC-16; rutas, metadatos, sitemap y estilos intactos.

## M. Revisión independiente

- Revisor distinto del autor; revisó diff real, no resúmenes. Ronda 1: `PARTIAL`, 2 MAJOR (IR-01, IR-02), 6 MINOR, 3 INFORMATIONAL, 0 BLOCKING.
- Correcciones: CTA renombrado para no colisionar con la puerta ISO-001 de MC-16; límites familiares renderizados; `MareaIds`; validador endurecido; documentos reparados; `format:check` en verde; árbol congelado.
- Ronda 2 sobre `7cbc99e`: `PARTIAL`; IR-02 CLOSED; IR-04 CLOSED; IR-01 (presentación) seguía abierta en ese SHA. El seguimiento posterior (tarjetas AIS/WATCH/SENSE/DISPLAY + aserción e2e + par ES/EN distinto) está incluido en el commit de entrega, pendiente de una tercera re-revisión independiente del SHA final.
- Recomendación: no fusionar hasta esa re-revisión y el cierre de los menores restantes.

## N. Git / PR

- Base `feature/marea-mc16-commerce-product-data-model` @ `6d8287c`; PR en borrador contra esa rama (nunca contra `main`); sin fusión, sin despliegue.
- Sin cambios en rutas públicas, `src/styles.scss`, layout, tienda, legal, metadatos ni activos públicos.

## O. Handoff a MC-18

- Paquete de tokens, registro de componentes, roles tipográficos, convenciones responsive, patrones accesibles, contratos de tarjetas/CTA, límites de modo y contrato SSR documentados en `MC17-MC18-HANDOFF.md`.
- MC-18 **no puede publicar**: sin copy público autorizado, sin marca registrada (`NOT_GRANTED`, uso público `NO_GO`), sin precio ni stock, sin aprobación legal. `MC18_STARTED = false`.

```text
MC17_VERDICT = PARTIAL
MC17_INTERNAL_DESIGN_SYSTEM_SCOPE = PASS_INTERNAL_DESIGN_SYSTEM_SCOPE

MC17_TOKEN_SYSTEM = PASS
MC17_ANGULAR_COMPONENT_LIBRARY = PASS
MC17_COMPONENT_COUNT = 48_COMPONENTS_PLUS_1_DIRECTIVE
MC17_DOCUMENTATION_CATALOGUE = PASS_INTERNAL_CATALOGUE
MC17_CORPORATE_WEB_CONTEXT = IMPLEMENTED_ISOLATED
MC17_INSTRUMENT_DAY_MODE = IMPLEMENTED_SOFTWARE_ONLY
MC17_INSTRUMENT_SUNLIGHT_MODE = IMPLEMENTED_SOFTWARE_ONLY_HARDWARE_BLOCKED
MC17_INSTRUMENT_NIGHT_MODE = IMPLEMENTED_SOFTWARE_ONLY_HARDWARE_BLOCKED
MC17_ACCESSIBILITY_AUDIT = AUTOMATED_AND_MANUAL_CHECKS_PASSED_NO_CONFORMANCE_CLAIM
MC17_RESPONSIVE_VALIDATION = PASS_6_WIDTHS_AND_200_PERCENT_TEXT
MC17_PERFORMANCE_VALIDATION = LAB_MEASURED_DS_ZERO_PRODUCTION_BYTES
MC17_SSR_HYDRATION = STRUCTURAL_CONTRACT_VERIFIED_NOT_RENDERED_IN_PUBLIC_SSR
MC17_LEGACY_UI_NON_REGRESSION = PASS_BYTE_IDENTICAL
MC17_INDEPENDENT_REVIEW = THIRD_ROUND_PASS_INTERNAL_DESIGN_SYSTEM_SCOPE

MC17_PUBLICATION = NOT_AUTHORIZED
MC17_PUBLIC_BRAND_ADOPTION = NOT_AUTHORIZED
MC17_NEW_PUBLIC_ROUTES = 0
MC17_COMMERCE_ACTIVATION = false

MC16_VERDICT = PARTIAL
MC16_INTERNAL_COMMERCE_DATA_SCOPE = PASS_INTERNAL_COMMERCE_DATA_SCOPE
MC16_MERCHANTABLE_MAREA_SKUS = 0
MC16_APPROVED_PRICES = 0
MC16_VERIFIED_SELLABLE_STOCK = 0
MC16_FINAL_02 = OPEN_UNTIL_REVERIFIED
FINANCIAL_V18 = INHERITED_OPEN

TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
PRICE_APPROVED = NONE
LICENSING_RIGHTS_GRANTED = false
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE

MERGED = false
DEPLOYED = false
MC18_STARTED = false
```

## Addendum — Ronda 3 completada (2026-11-03)

La tercera auditoría independiente se ejecutó primero sobre el candidato congelado
`4a9043b` (Stage A). El resultado fue **NEEDS_REVISION**: 0 BLOCKING, 1 MAJOR
(`MC17-IR-01`, solo 7 de 9 familias renderizadas y prueba e2e de cuerpo completo),
y seguían abiertos `MC17-IR-03`, `MC17-IR-05`, `MC17-IR-06`, `MC17-IR-07`,
`MC17-IR-08`, `MC17-IR-10`, `MC17-CR-02`, más dos hallazgos nuevos (foco
transparente y baselines huérfanas). Las correcciones se congelaron en
`f2c9ec2ea07f90154cbb91cae36e4a7681b5e27d` y el revisor independiente las
re-auditó.

| Hallazgo | Estado final en `f2c9ec2` |
|---|---|
| `MC17-IR-01` — límites familiares | **CLOSED_VERIFIED**: 9 fichas (NAV, PILOT, FLEET, AIS, WATCH, SENSE, DISPLAY, WEATHER, HUB), límite propio y chip material primero en ES y EN, nota de kit SENSE y 6 casos adversariales; prueba por ficha, no por cuerpo. |
| `MC17-IR-03` / `MC17-CR-02` — documentos obsoletos/corruptos | **CLOSED_VERIFIED**: D01-D24 y datasets conciliados con la evidencia; histórico FAIL conservado con fecha/SHA; frases malformadas reparadas. |
| `MC17-IR-05` — aislamiento de producción | **CLOSED_VERIFIED**: guarda AST compartida; 5/5 mutaciones de importación detectadas (literal, re-export, dinámica, alias y puente transitivo). |
| `MC17-IR-06` / `MC17-IR-13` — evidencia visual | **CLOSED_VERIFIED**: 26 baselines con SHA-256, commits, entorno y procedimiento; par ES/EN distinto; 2 huérfanas eliminadas; 2 capturas móviles refrescadas tras revisión antes/después. |
| `MC17-IR-07` — variantes | **CLOSED_VERIFIED**: comparación bidireccional con el compilador de TypeScript; alias y enums detectados; recuento real (33 entradas / 126 valores). |
| `MC17-IR-08` — gobernanza | **CLOSED_VERIFIED**: registro, D-073 y handoff con los valores finales; MC-16 conserva su histórico con nota de supersesión. |
| `MC17-IR-10` — formato | **CLOSED_VERIFIED**: cobertura ampliada a código, preview y e2e del sistema; generados validados por sus generadores; `format:check` en verde. |
| `MC17-IR-12` — foco transparente | **CLOSED_VERIFIED**: la guarda rechaza `outline: none`, ancho cero y color transparente; mutación detectada. |

Resultados verificados en el SHA congelado: validador **38/38**, unitarias/adversariales
**41/41**, Playwright del catálogo **37/37** sin `--update-snapshots`, e2e pública
**15/15**, axe **0 violaciones / 36 pases / 0 incompletos en los cuatro modos**,
`format:check` en verde, build de producción con **0 identificadores** del sistema de
diseño, 35 ficheros legacy y 15 activos públicos idénticos a MC-16, y arnés de
mutaciones **9/9** detectadas. El fallo heredado V-18 sigue siendo el único gate
financiero en rojo.

```text
MC17_VERDICT = PARTIAL
MC17_INTERNAL_DESIGN_SYSTEM_SCOPE = PASS_INTERNAL_DESIGN_SYSTEM_SCOPE
MC17_FINAL_REAUDIT = COMPLETE
MC17_REVIEWED_IMPLEMENTATION_SHA = f2c9ec2ea07f90154cbb91cae36e4a7681b5e27d
MC17_OPEN_BLOCKING = 0
MC17_OPEN_MAJOR = 0
MC17_OPEN_MINOR = 0
MC18_STARTED = false
```

No se autoriza fusión, despliegue, publicación, venta, adopción de marca ni inicio
de MC-18. Las dos rondas anteriores de este informe se conservan intactas.
