# MC-25 — Gobernanza de SKU y preparación comercial
## Informe ejecutivo (ES)

**Hito:** MC-25 — «SKU readiness and catalog governance in admin/commerce»
**Rama:** `feature/marea-mc25-sku-governance`, creada desde el HEAD verificado de MC-24 (`c4d9d76`)
**Alcance:** interno. Sin fusión, sin despliegue, sin publicación, sin venta.
**Veredicto:** `MC25_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE` (sujeto al informe de auditoría independiente adjunto)
**Veredicto global:** `MC25_VERDICT = PARTIAL` — las puertas externas legales y comerciales siguen abiertas.

---

## 1. Qué se ha construido

MC-25 no entrega una tienda: entrega **gobernanza que se niega a vender** hasta que
exista evidencia verificada. Se ha implementado, probado y auditado un flujo interno
completo de preparación de SKU:

1. **Identidad canónica tipada** que distingue seis objetos: familia de producto,
   edición, paquete, identidad interna de catálogo, SKU candidato y SKU de
   comerciante aprobado. Una edición canónica **nunca** es un SKU aprobado; no se
   ha inventado ningún código de comerciante (registro vacío y congelado).
2. **Ciclo de vida interno** de cinco estados (`DRAFT`, `INCOMPLETE`,
   `AWAITING_EVIDENCE`, `BLOCKED`, `READY_FOR_REVIEW`) con siete transiciones
   declaradas; las otras 19 combinaciones se rechazan. No existe ningún estado
   pedible, vendible ni publicado. Ninguna transición persiste.
3. **Motor determinista de preparación** con diez requisitos, razones explícitas
   de rechazo, referencia a los bloqueadores MC-02 de cada SKU y huella de
   decisión versionada (`mc25-readiness/1.0.0`).
4. **Experiencia interna de administración** en la vista previa aislada
   (`internal/catalog/sku-governance`, ES/EN): permite inspeccionar identidad,
   preparación, bloqueadores, procedencia de evidencia, carencias y elegibilidad
   de ciclo de vida, y entender por qué cada elemento no puede venderse.
5. **Frontera de autorización fail-closed**: incluso invocando directamente la
   lógica de negocio, ninguna acción de revisión se aplica, se persiste ni emite
   una aprobación duradera. Aprobar, marcar como pedible o publicar están
   prohibidos por invariante para cualquier principal.
6. **Remediación de la deuda MC-23**: F-2 (integridad de relaciones entre rutas
   de mejora) y F-15 (edición inexistente frente a exclusión comercial),
   reproducidas en la revisión heredada y corregidas con pruebas adversariales.

## 2. La invariante crítica

Estado factual heredado y verificado:

```text
PRICE_APPROVED          = NONE
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
filas de stock verificadas = 0
códigos de SKU de comerciante = 0
PILOT_SAFETY_GATE       = BLOCKED
FILAS de compatibilidad TESTED = 0
```

Con ese estado **ningún SKU puede ser pedible**. Se demuestra de forma exhaustiva:

| Objeto | Evaluados | Pedibles |
| --- | ---: | ---: |
| Ediciones canónicas | 26 | **0** |
| SKU candidatos | 26 | **0** |
| Paquetes | 6 | **0** |
| Familias | 9 | **0** |

Además de la matriz, se prueba que no se puede forzar el estado: el snapshot de
hechos está congelado en profundidad, no hay inyección de hechos, no se puede
falsificar una decisión y la interfaz no puede decir «pedible» si el motor dice
lo contrario.

## 3. Evidencia ejecutada

| Comprobación | Resultado |
| --- | --- |
| TypeScript (`run-tsc.mjs`) | PASS |
| Build Angular real, vista previa y producción | PASS |
| Prueba negativa de plantilla (compilador rechaza el binding y nombra el miembro) | PASS |
| Validador MC-25 | **20/20** |
| Pruebas adversariales MC-25 | **58/58** |
| Runner confinado (etapas heredadas + MC-25) | **7/7** |
| Validador MC-20/21/22 | **56/56** |
| Validador y unitarios MC-24 | **13/13** y **26/26** |
| E2E de catálogo (heredado + MC-25) | **116/116** |
| axe (crítico/grave) en ES y EN, antes y después de una acción | 0 violaciones |
| Sin desbordamiento horizontal en 1440/768/390/320 | PASS |
| `test:i18n`, `test:seo`, `test:commerce` | PASS |
| Bundle de producción | 168 ficheros, 0 identificadores de catálogo |
| Auditoría independiente A (Claude Sonnet 5.5, revisión estática) | NEEDS_REVISION: 10 hallazgos (3 MAJOR), corregidos o aceptados con motivo |
| Auditoría independiente B (DeepSeek V4-Pro, ataques ejecutados) | **PASS_INTERNAL_SCOPE**, 0 BLOCKER / 0 MAJOR |

## 4. Qué NO se ha hecho (y por qué)

- **No hay venta, precio, stock ni checkout.** No existe precio aprobado, ni stock
  verificado, ni SKU de comerciante, ni puerta de pagos cerrada. Inventarlos
  habría sido una falsedad comercial.
- **No hay backend de aprobación duradera.** No existe mecanismo de autorización
  verificado ni contrato de persistencia aprobado; por eso toda mutación se
  rechaza y la pantalla es de inspección.
- **No hay publicación ni indexación.** Las rutas son internas, solo accesibles
  por loopback, con allow-list de Host, `noindex` y sin canonical/hreflang/JSON-LD.
- **No se ha fusionado, desplegado ni publicado nada.** El PR queda en borrador.

## 5. Deuda heredada preservada

Siguen abiertos, sin reinterpretar: `FINANCIAL_V18`, `MC16_FINAL_02`, MC-13
F-05/F-11/F-14, MC-15 GSC-01/GSC-02, licencia del decodificador AIS (DEC-04),
selección de hardware del HUB, cero filas de compatibilidad probadas, revisión
profesional del inglés, verificación manual de WCAG/tecnologías de asistencia,
MC-19 AC08, deuda de nombres de validadores y limitaciones heurísticas del guard
de afirmaciones. Los seis ficheros MC-23 sin formatear siguen sin formatear.

F-2 y F-15 pasan de abiertos a **cerrados** con reproducción, reparación y
reverificación documentadas.

## 6. Riesgo residual aceptado

- Las adiciones de las rutas de mejora redactadas en prosa no pueden validarse
  estructuralmente; se exponen como texto no verificado y nunca cuentan como
  relación confirmada.
- El guard de afirmaciones es heurístico.
- No se ha probado con lector de pantalla ni se reclama conformidad WCAG.
- No existe rastro de auditoría de aprobaciones porque no existe almacén
  autorizado; ese es precisamente el estado honesto.

## 7. Veredicto

- `MC25_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE`: todo el alcance interno
  autorizado está implementado, probado y auditado de forma independiente.
- `MC25_VERDICT = PARTIAL`: las puertas externas (marca, licencias, precio,
  cumplimiento, seguridad PILOT, pagos, privacidad) siguen abiertas y ninguna
  puede cerrarse desde el repositorio.
- **Ningún SKU es pedible y ninguno puede serlo sin autorización y validación
  completas.**

## 8. Siguiente paso

MC-26 (checkout y pagos) **no se ha iniciado**. Sus entradas están en
`MC25-MC26-HANDOFF.md`: motor de preparación, modelo de identidad, ciclo de vida,
frontera de autorización y las seis infraestructuras que faltan (aprobación
duradera, registro de SKU, inventario verificado, lista de precios aprobada,
términos/privacidad y acuerdo de pagos).
