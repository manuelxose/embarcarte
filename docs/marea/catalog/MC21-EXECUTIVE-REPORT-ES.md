# MC-21 — Informe ejecutivo (ES)

**Hito:** MC-21/36 — Catálogo de producto, lote 2: WEATHER, SENSE y WATCH (ES/EN), ámbito interno.
**Rama:** `feature/marea-mc21-weather-sense-watch-catalog`, base verificada `115a1ac` (entrega MC-20).
**Implementación:** `f2609a8`. **PR:** borrador [#29](https://github.com/manuelxose/embarcarte/pull/29), apilada sobre la rama de MC-20, sin fusionar.
**Clasificación:** `MC21_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE`; `MC21_VERDICT = PARTIAL`.

## 1. Qué se ha construido

El catálogo interno bilingüe de MC-20 (NAV, HUB, AIS) se ha ampliado **en sitio**, sin duplicar
pipeline, hasta **seis familias canónicas**: NAV, HUB, AIS, SENSE, WATCH y WEATHER, en el orden
canónico de MC-16. Se mantiene **un único árbol de componentes Angular** con once secciones por
familia, no seis páginas nuevas:

- proyección determinista generada desde los conjuntos canónicos de MC-16 (lotes 01, 02 y 03):
  **6 familias, 18 ediciones canónicas y 10 puertas de gobernanza**;
- contenido bilingüe ES/EN con paridad estructural, clase de evidencia y referencias a la fuente
  canónica en cada bloque;
- **12 rutas de preview** Server-rendered bajo `internal/catalog/*` y `en/internal/catalog/*`,
  solo en bucle local, no indexables;
- reutilización íntegra del sistema de diseño MC-17 y del adaptador comercial *fail-closed*: no
  existe precio, stock, SKU, pedido, presupuesto, formulario ni captación de contactos.

## 2. Verdad de producto (lo que el catálogo dice y lo que no dice)

- **WEATHER** es un servicio de software previsto. No hay proveedor de datos contratado
  (`providerRightsGranted = false`): el catálogo **no nombra ningún proveedor**, no afirma
  exactitud de previsión, no anuncia SLA y no se presenta como servicio oficial de avisos.
- **SENSE** es hardware con `engineering = PARTIALLY_VERIFIED`, que cubre únicamente parser e IMU.
  Se muestran de forma explícita: precisión `NOT_MEASURED`, ingreso de datos `NOT_VERIFIED`,
  NMEA 2000 `NOT_IMPLEMENTED`; el estado parcial nunca se presenta como verificación de sensores.
- **WATCH** es hardware + servicio con `ingestion = NOT_VERIFIED` y conectividad, notificación,
  identidad y suscripción `NOT_FOUND`; la puerta de privacidad (`GATE-PRIVACY-DPA-DPIA`) sigue
  bloqueada y no se promete entrega garantizada de alertas.
- Las tres familias están `DEFINED`, `INTERNAL_ONLY` y `NOT_FOR_SALE`. Ninguna edición es un SKU.

La regla del registro («proveedor licenciado nombrado solo si está contratado») se cumple por
construcción y además está vigilada por un guardián que rechaza los ocho proveedores exigidos.

## 3. Evidencia ejecutada (no narrada)

| Comprobación | Resultado |
| --- | --- |
| Generador `--check` | exit 0, byte-estable (6 familias / 18 ediciones / 10 puertas) |
| Validador `test:mc20` | **50/50 PASS** |
| Unitarios y adversariales | **39/39 PASS** |
| Playwright (`test:mc20:e2e`) | **60/60 PASS** en 12 rutas, axe limpio, SSR e hidratación |
| Build de producción | exit 0; 96 rutas prerenderizadas; **0 identificadores del catálogo** en 168 ficheros |
| Landing MC-18 (regresión) | 45/45 PASS |
| Sistema de diseño MC-17 (regresión) | 38/38 PASS |
| Formato | PASS |
| Financiero | FAIL 76/77 — `FINANCIAL_V18` **heredado**, sin cambios |
| Verificación independiente | PASS; hallazgo F-1 reparado y re-verificado |
| Revisión independiente | `pass`; 0 BLOCKING / 0 MAJOR / 0 MINOR / 0 INFO |

Aislamiento comprobado por ejecución: 0 referencias al catálogo en `app.routes.ts`,
`app.routes.server.ts`, `locale-routes.ts`, `src/server.ts`, `public/` y en el bundle público.
Las rutas públicas reservadas `/marea/weather`, `/marea/sense`, `/marea/watch` y sus variantes EN
**no están registradas**.

## 4. Hallazgos y reparaciones

**F-1 (verificación interna, media):** el guardián de proveedores solo cubría 2 de los 8 nombres
exigidos y una inyección de «Copernicus» pasaba el validador. Reparado con los ocho nombres, límites
de palabra y ocho controles negativos; revisor independiente reprodujo el rechazo.

**Auditoría externa (Claude Opus 5.5, solo estática):** su shell fue denegado, por lo que el
resultado se registra como auditoría estática con veredicto `NEEDS_REVISION`: 4 hallazgos MAJOR y
9 MINOR/INFO. El Lead verificó cada uno contra los datos canónicos antes de aceptarlo y se
repararon en `f7d3a3a`:

- **XA-01 (MAJOR, real):** el generador tomaba solo la primera línea por familia; el bundle
  COMPLETE perdía SENSE-BILGE/TANKS/ENV y PROTECT perdía WATCH-PLUS. Corregido a una fila por
  línea canónica y el validador ahora compara la tupla completa (antes repetía el mismo error).
- **XA-04 (MAJOR, real):** dos frases de WATCH afirmaban comportamiento local no implementado con
  etiqueta «verificado en el repositorio». Reclasificadas como requisito de diseño no probado.
- **XA-02/XA-03 (MAJOR, controles):** el guardián no rechazaba «149 euros», `±`, `%`, `IP67` ni
  pre-venta; y había tres rutas fail-open (negación solo en el primer match, comas que no cerraban
  cláusula, par sin idioma omitido). Corregidas con reglas y controles negativos.
- **XA-09/XA-10/XA-11 (MINOR):** cobertura de los ocho proveedores en el e2e, escaneo de textos
  compartidos y referencias de fuente de WEATHER que existen de verdad.

Se aceptan como residuales MINOR documentados XA-05..XA-08 y XA-12, más el informativo XA-13, con
su justificación en `MC21-INDEPENDENT-AUDIT.md`. Tras la reparación: validador 50/50, unitarios
39/39, e2e 60/60, build con 0 identificadores. La re-auditoría externa se ejecutó con **Sonnet 5.5**
(techo fijado por el propietario del producto, decisión D-088); no se volvió a usar Opus 5.5.

## 5. Puertas legales y comerciales (sin cambios)

```text
TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
LICENSING_RIGHTS_GRANTED = false
PRICE_APPROVED = NONE
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
PUBLICATION_AUTHORIZED = false
INDEXATION_AUTHORIZED = false
PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED
GATE-PRIVACY-DPA-DPIA = BLOCKED
```

La aceptación de ingeniería **no** habilita publicación, indexación, comercio, despliegue ni
contratación de proveedores.

## 6. Deuda heredada (conservada y visible)

`FINANCIAL_V18`, `MC16_FINAL_02`, MC-13 F-05/F-11/F-14, MC-15 GSC-01/GSC-02, licencia del
decodificador AIS (DEC-04), selección de hardware HUB, 0 filas de compatibilidad verificadas,
revisión profesional del inglés, revisión manual WCAG 2.2 AA / tecnología de asistencia y MC-19
AC08 parcial. MC-21 no cierra ninguna. Se añade una deuda propia declarada: los ficheros del
generador/validador conservan el nombre `mc20-*` aunque sirven a seis familias.

## 7. Veredicto y siguiente paso

El ámbito interno de MC-21 está implementado y verificado de forma independiente, con todas las
puertas externas intactas. Por eso la clasificación es `PASS_INTERNAL_SCOPE` con veredicto global
`PARTIAL`. No se ha fusionado, desplegado, publicado ni indexado nada, y **MC-22 no se ha
iniciado**. Las entradas para MC-22 (lote 3: DISPLAY, PILOT, FLEET) están en
`MC21-MC22-HANDOFF.md`, con las cautelas obligatorias de PILOT (puerta de seguridad bloqueada),
FLEET (no implementado, sin SLA) y DISPLAY (tamaño y hardware no congelados).
