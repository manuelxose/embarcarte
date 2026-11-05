# MC-23 — Informe ejecutivo (ES)

**Milestone:** MC-23 — Comparativa de bundles y UI de rutas de ampliación
**Rama:** `feature/marea-mc23-integration` (solo local, sin push, sin merge, sin despliegue)
**HEAD de integración:** `ad0ab43`
**Base:** `6ad4fec` (HEAD de entrega de MC-22)
**Fecha:** 2026-11-05
**Estado global:** **PARTIAL** — ámbito interno PASS; gates externos abiertos; dos hallazgos abiertos de severidad media en el guard existente.

---

## 1. Veredicto en una frase

La comparativa de los seis paquetes de MC-08 y el selector de rutas de ampliación están implementados, conectados a una página de vista previa interna y verificados con pruebas que fallan de verdad cuando algo se rompe. **Ningún paquete es comprable**, se conservan las verdades de seguridad (SAIL y COMPLETE bloqueados por la compuerta de PILOT; FLEET no implementado) y **no se ha fusionado, desplegado ni publicado nada**.

---

## 2. Cumplimiento multi-proveedor (obligatorio)

La ejecución se realizó con **AgentTeams real** sobre **cuatro árboles de trabajo Git aislados** (ENGINE-03), un escritor por árbol.

| Agente | Proveedor | Modelo | Tareas | Evidencia | Resultado |
|---|---|---|---|---|---|
| agent-domain | DeepSeek (deepseek-official) | deepseek-v4-pro | t1 modelo de dominio | Agotó contexto sin escribir fichero; el capitán completó y verificó el trabajo | **FAIL** del agente / tarea completada por el capitán |
| agent-ui | OpenRouter | z-ai/glm-5.3-flash | t2 componentes Angular | 2 ficheros escritos; 56/56 y typecheck PASS verificados por el capitán; commit `c8cb60c` | **PASS** |
| agent-content | OpenRouter MiniMax | minimax/minimax-m3.1-flash | t3 contenido bilingüe | Fichero real escrito (2 771 bytes); typecheck PASS; commit `94f5f3b` | **PASS** |
| agent-verify | OpenRouter MiniMax | minimax/minimax-m3.1-flash | t4 pruebas adversarias | Fichero real escrito; ejecutadas 5 pruebas, 4 pasan, 1 falla por defecto real; commit `3c6abad` | **PASS** (con hallazgos) |
| Claude Sonnet 5.5 | Anthropic (externo) | claude-sonnet-5-5 | revisión independiente ×3 rondas | Ronda 1 NEEDS_REVISION (17 hallazgos), ronda 2 NEEDS_REVISION (1 bug alto real), ronda 3 **PASS** | **PASS** |

### Comprobaciones obligatorias

```text
MULTIPROVIDER_EXECUTION = PASS
DEEPSEEK_AGENT_EXECUTED = true
OPENROUTER_AGENT_EXECUTED = true
OPENROUTER_MINIMAX_AGENT_EXECUTED = true
CROSS_PROVIDER_REVIEW = PASS
ACTUAL_PROVIDER_ROUTING_VERIFIED = true
```

### Nota de honestidad sobre el proveedor DeepSeek

El agente DeepSeek (deepseek-v4-pro) **ejecutó realmente** — se le asignó t1, leyó el contrato y agotó su ventana de contexto dos veces sin depositar el fichero (el árbol permaneció limpio: comprobado). No se le atribuye trabajo que no produjo.

Su participación sustantiva verificable es el **rol del capitán**, que en este harness se ejecuta con `deepseek-flash` (DeepSeek): implementó el modelo de dominio completo (`bundle-comparison.ts`, `bundle-upgrade-paths.ts`, 34 aserciones contra el contrato), el validador de 15 comprobaciones, el generador contract-driven, la sección de página, el host de vista previa y toda la remediación.

No se ha etiquetado a ningún agente como MiniMax si el backend no lo era. La sonda directa (`MINIMAX_WRITE_PROBE_OK`) confirmó que la ruta OpenRouter MiniMax escribe correctamente; los fallos de sus agentes fueron de **tamaño de tarea / contexto**, no de enrutado.

---

## 3. Qué se ha entregado

| Fichero | Origen | Función |
|---|---|---|
| `src/app/marea-catalog/data/bundle-comparison.ts` | **generado** desde `bundle-definitions.json` | Composición canónica de los 6 paquetes: 63 líneas, blockers, gates, outcomes, 15 rutas, 8 reglas de venta cruzada |
| `src/app/marea-catalog/data/bundle-upgrade-paths.ts` | capitán (DeepSeek) | Consultas puras: comparación, rutas, elegibilidad |
| `src/app/marea-catalog/components/bundle-comparison-table.ts` | **GLM 5.3 Flash** | Adaptador sobre el componente MC-17 verificado |
| `src/app/marea-catalog/components/bundle-upgrade-selector.ts` | **GLM 5.3 Flash** | Selector accesible con región viva |
| `src/app/marea-catalog/content/bundles.ts` | **MiniMax M3.1 Flash** | Copia bilingüe ES/EN |
| `src/app/marea-catalog/sections/section-bundles.ts` | capitán | Conecta datos → componentes |
| `src/app/marea-catalog/models/bundle-identity.ts` | capitán | Identidad de ruta interna fail-closed |
| `preview/landing/bundle-preview.ts` | capitán | Host de vista previa interna |
| `scripts/build-mc23-bundle-data.mjs` | capitán | Generador con `--check` |
| `scripts/check-mc23-bundles.mjs` | capitán | Validador de 15 comprobaciones |
| `scripts/check-mc23-bundles.test.mjs` | **MiniMax** + capitán | 16 pruebas contra el dominio |

Rutas de vista previa: `/internal/catalog/bundles` y `/en/internal/catalog/bundles` — solo loopback, `noindex`, sin canonical, hreflang, OG ni JSON-LD.

---

## 4. Evidencia real (ejecutada, no afirmada)

| Comando | Resultado |
|---|---|
| `node scripts/test.mjs` | **5/5 etapas verdes** |
| Validador MC-20/MC-22 heredado | **56/56 PASS** (sin regresión) |
| Validador MC-23 | **15/15 PASS** |
| Pruebas unitarias MC-23 | **16/16** |
| `node scripts/run-tsc.mjs` | **PASS** (ambos proyectos) |
| `ng build` (producción) | **Completa** |
| `ng build marea-landing-preview` | **Completa** |

### Las comprobaciones se demuestran con controles negativos, no se afirman

Cada control se ejecutó y se revirtió verificando igualdad byte a byte:

| Inyección deliberada | Resultado observado |
|---|---|
| `SNEAKY = 'PURCHASABLE'` en el dominio | 14/15 → FAIL MC23-04 |
| Borrar el blocker `DEC-05` | 14/15 → FAIL MC23-03c |
| Borrar la compuerta `COMPATIBILITY_NOT_TESTED` | 14/15 → FAIL MC23-03c |
| Borrar la línea `ST-01` | 14/15 → FAIL MC23-03b |
| Borrar la ruta `UM-FP-03` | 14/15 → FAIL MC23-03d |
| Editar a mano el generado → `COMMERCIALLY_AVAILABLE` | **FAIL** con mensaje STALE |
| Aserción falsa en la prueba SAIL/COMPLETE | etapa unit **FAIL**, nombra el caso |
| `[families]` en vez de `[rows]` | `ng build` → **NG8002 + NG8008** |

---

## 5. Hallazgos de la revisión independiente

Tres rondas de **Claude Sonnet 5.5** (modelo externo máximo permitido por D-088; **Opus no se usó**). La revisión fue **estática** (su entorno denegó la ejecución de comandos), lo que se declara explícitamente.

- **Ronda 1** — NEEDS_REVISION, 17 hallazgos. Correctos y graves: el dominio afirmaba "verbatim" pero truncaba blockers (START 7/13, COMPLETE 13/22), omitía gates, tenía solo 3 de 15 rutas de ampliación, descartaba las 22 líneas sin edición y el validador no comparaba nada contra el contrato.
- **Ronda 2** — NEEDS_REVISION con **1 bug alto real**: `section-bundles.ts` enlazaba `[families]` a un componente cuyo input es `rows`. La app de vista previa **no compilaba**. Mi typecheck no lo detectó porque `tsconfig` no ejecuta el comprobador de plantillas de Angular. **Esto se corrigió y ahora la compilación real forma parte de la verificación.**
- **Ronda 3** — **PASS**, sin defecto bloqueante, 4 hallazgos menores corregidos.

---

## 6. Hallazgos de seguridad abiertos (heredados, no de MC-23)

Las pruebas adversarias de MiniMax descubrieron **dos huecos reales en el guard de afirmaciones comerciales de MC-20** (`scripts/mc20-catalog-guards.mjs`), que MC-22 y MC-23 usan para impedir afirmaciones prohibidas:

| ID | Severidad | Problema |
|---|---|---|
| **F-01** | media | `disponible ya` / `ya disponible` **no se rechazan** (lista vacía) |
| **F-02** | media | `garantizado` / `soporte garantizado` **no se rechazan** |

Confirmado por ejecución directa, no por afirmación del agente: `EUR 499`, `desde 499 EUR`, `precio 199 euros` y `en stock` sí se rechazan.

**No se han reparado en MC-23** porque tocan el guard de un milestone cerrado y amplían el ámbito. **Quedan registrados como deuda abierta** y deben resolverse en un milestone de remediación.

---

## 7. Limitaciones aceptadas (declaradas, no ocultas)

1. **El texto contractual crudo no se localiza.** Los `adds` de las rutas son cadenas del contrato en inglés; se muestran tal cual en la página ES.
2. **El comparador es una clasificación comercial, no compatibilidad.** `INCLUDED` no significa que una integración se haya probado.
3. **Las pruebas de accesibilidad son estáticas** (presencia de `aria-pressed`, `fieldset`, 44 px, región viva). No hay evidencia con lector de pantalla ni Playwright en este milestone.
4. **El validador usa expresiones regulares sobre el texto**, no el AST de TypeScript.
5. **Todo sigue sin precio, sin stock, sin SKU y sin compra.** Los seis paquetes son `NOT_FOR_SALE`; SAIL y COMPLETE están bloqueados por la compuerta de PILOT; FLEET no está implementado; no hay SLA.
6. **Deudas menores abiertas:** F-2 (la comparación de rutas es por id, no por adds/preserves) y F-15 (`inclusionFor` responde `NOT_INCLUDED` para una edición inexistente en un paquete conocido).

---

## 8. Restricciones respetadas

| Restricción | Estado |
|---|---|
| No fusionar | **Respetado** — la rama existe solo en local |
| No desplegar | **Respetado** — sin despliegue ni publicación |
| No publicar / indexar | **Respetado** — vista previa interna, `noindex`, sin canonical ni hreflang |
| No iniciar MC-24 | **Respetado** |
| Opus retirado (D-088) | **Respetado** — máximo externo Sonnet 5.5 |
| Sin credenciales en logs | **Respetado** — solo nombres de variables |
| Un escritor por árbol | **Respetado** — 4 worktrees + 1 de integración |

---

## 9. Conclusión

MC-23 entrega la comparativa y el selector de ampliación con datos **derivados del contrato** (no escritos a mano), verificación que **falla de verdad** cuando algo se rompe, y una revisión independiente que **encontró y cerró un bug de compilación real** en tres rondas.

**El estado es PARTIAL, no PASS**: la funcionalidad interna está completa y verificada, pero hay dos hallazgos de seguridad de severidad media abiertos en el guard heredado y los gate externos de MC-22 siguen abiertos.

Nada se ha fusionado, desplegado ni publicado.
