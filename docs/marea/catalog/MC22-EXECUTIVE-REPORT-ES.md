# MC-22 — Informe ejecutivo (ES)

## 1. Veredicto evidenciado

- `MC22_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE` — la implementación interna del catálogo está
  verificada y revisada de forma independiente.
- `MC22_VERDICT = PARTIAL` — el veredicto de hito es PARCIAL porque todas las autorizaciones externas
  legales/comerciales permanecen `BLOCKED`/`NOT_GRANTED` (las diez puertas de gobernanza siguen abiertas).

## 2. Alcance

Extensión del catálogo interno de seis a **nueve** familias (NAV, HUB, AIS, SENSE, WATCH, WEATHER,
DISPLAY, PILOT, FLEET) en la arquitectura Angular de un solo árbol. El lote 3 añade **DISPLAY**, **PILOT**
y **FLEET**: 26 ediciones canónicas, 18 rutas Server de previsualización (9 familias × ES/EN) bajo
`internal/catalog/*`. Sin ruta pública, sin precio, sin SKU, sin merge, sin despliegue, sin MC-23.

## 3. Resultados medidos

| Puerta | Salida | Recuento |
| --- | --- | --- |
| `build-mc20-catalog-data.mjs --check` | 0 | byte-estable |
| `test:mc22` (validador) | 0 | **56/56** |
| `test:mc22:unit` | 0 | **70/70** (0 fallos, 0 omitidos) |
| `test:mc22:e2e` (Playwright) | 0 | **84** pruebas sobre 18 rutas |
| `npm run build` | 0 | **96** rutas públicas prerenderizadas |
| `npm run format:check` | 0 | 0 violaciones |

Aislamiento: **0** identificadores de catálogo en `dist/embarcarte`; tabla de rutas públicas, sitemap y
robots sin cambios desde la base `1dc9aa0`; `/marea/*` permanece `PROPOSED_INTERNAL_NOT_DEPLOYABLE`.
Las diez puertas de gobernanza son idénticas byte a byte a la base y **ninguna** está cerrada
(13 puertas de publicación, 0 cerradas).

## 4. Verificación de veracidad de producto

- **DISPLAY**: `SIZE_NOT_FROZEN`, `HARDWARE_NOT_SELECTED`, `BOM_NOT_ESTABLISHED`,
  `measuredPerformance = false`, `pilotControlAuthority = false`. Sin dimensión, resolución, brillo,
  índice IP ni consumo publicados.
- **PILOT**: `PILOT_SAFETY_GATE = BLOCKED`, pruebas de mar no realizadas, evidencia de parada de
  emergencia/aislamiento del motor/realimentación del timón `NOT_FOUND`, mando remoto `PROHIBITED`,
  modos `NOT_VERIFIED`/`CONDITIONAL_ON_VERIFICATION`. Solo supervisado; nunca autónomo ni certificado;
  no vendible mientras la puerta esté bloqueada.
- **FLEET**: `multiTenantProductionService = false`, `NO_SLA_ESTABLISHED`, telemetría de solo lectura,
  sin ruta de control de embarcación, rol por defecto `NO_ACCESS`, sin certificación de seguridad. B2B,
  sin SLA, cliente, hardware ni certificación inventados.

## 5. Auditoría independiente

Tres auditorías externas (revisión estática, `claude-sonnet-5-5`, sin shell) y una revisión interna
(`deepseek-v4-pro`):

1. Auditoría 1: NEEDS_REVISION, bloqueo XA22-01 → 15/15 elusiones reproducidas.
2. Auditoría 2: NEEDS_REVISION, 26 defectos (14 falsos negativos + 12 falsos positivos).
3. Auditoría 3: NEEDS_REVISION acotada, XC22-01..05 (15 casos); confirmó el contenido limpio y canónico.
4. Revisión interna (t23): **PASS** sobre `ae1e431`.

Reparaciones r1, r2 y r3 cerraron sus conjuntos; el guard se documenta como **respaldo heurístico, no
prueba de ausencia**. Límites residuales aceptados (LOW, ausentes del contenido): RES-01..06 y RES-A..D.

## 6. Deuda heredada

`test:financial` permanece **FAIL (heredado)** — V-18 "No MC-14 execution" (76/77), preexistente y no
relacionado con MC-22. Revisión manual WCAG 2.2 AA + tecnología asistiva `NOT_RUN` (heredado).

## 7. Límites del hito

MC-22 **no** implica merge, despliegue, publicación, indexación, precio, SKU, certificación,
compatibilidad ni SLA. La marca MAREA no está adoptada y la limpieza legal no está concedida.
