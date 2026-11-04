# MC-19/36 — Informe ejecutivo (ES)

| Campo                 | Valor                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Entregable            | D07 — informe ejecutivo en español                                                                                       |
| Hito                  | MC-19/36 — páginas de segmento/solución y flujos de consulta (armadores, instaladores, profesionales)                     |
| Rama                  | `feature/marea-mc19-scope-proposal`                                                                                      |
| Base                  | MC-18 HEAD `3490c0f71eb6eaa89588b7a6d75bb3b6066cd094` (`feature/marea-mc18-bilingual-corporate-landing`)                  |
| Estado                | **BLOCKED** — propuesta de alcance entregada; implementación no iniciada                                                 |
| PR                    | Borrador contra `feature/marea-mc18-bilingual-corporate-landing`, sin fusionar                                           |
| Publicación           | **NOT_AUTHORIZED**                                                                                                       |
| Paquete               | `docs/marea/segments/` (D01-D07 + 6 datasets + evidencia del validador)                                                  |

## A. Resumen ejecutivo

MC-19 no se ha implementado. El programa define el objetivo del hito (páginas de
segmento/solución y flujos de consulta para armadores, instaladores y profesionales) y su
dependencia de MC-18, pero no existe el **Master Prompt autoritativo de MC-19**: el registro
de 36 prompts declara expresamente que los prompts 03-36 son marcadores de planificación y
que el texto emitido por el cliente es la autoridad. Además, el registro de rutas de MC-15 no
contiene ninguna página de armadores, y todos los flujos de consulta/captación de leads están
bloqueados por la compuerta de privacidad `GATE-PRIVACY-DPA-DPIA` (24 documentos requeridos,
0 ejecutados).

Implementar ahora habría exigido inventar el conjunto de páginas, la ruta/entidad de
armadores, el contrato de contenido y el comportamiento de las CTA, además de introducir
captación de datos personales no autorizada. Por eso se aplicó la regla explícita del
encargo: **documentar una propuesta de alcance y detener la implementación**.

La propuesta es completa y accionable: tres opciones de alcance, diez prerrequisitos, diez
criterios de aceptación propuestos, un DAG de nueve tareas, un registro de catorce riesgos,
un plan de verificación y un traspaso a MC-20 que no presupone que MC-19 se haya
implementado. La opción recomendada (A) es la más pequeña que respeta a las tres audiencias:
tres páginas internas bilingües, sin flujo de consulta, en la previsualización aislada y con
las CTA fail-closed.

## B. Veredicto

```text
MC19_VERDICT = BLOCKED
MC19_SCOPE_PROPOSAL = DELIVERED
MC19_IMPLEMENTATION_STARTED = false
MC19_IMPLEMENTATION_AUTHORIZED = false
MC19_MASTER_PROMPT = NOT_ISSUED
MC19_IA_ROUTE_DECISION = ABSENT
MC19_PRIVACY_GATE = BLOCKED
MC19_PUBLICATION = NOT_AUTHORIZED
MC19_LEAD_CAPTURE = false
MC19_PUBLIC_ROUTES_ACTIVATED = 0
MC19_MERGED = false
MC19_DEPLOYED = false
MC19_PUBLISHED = false
```

`BLOCKED` no es `FAIL`: no se ha perdido implementación requerida y la propuesta elimina la
ambigüedad que impedía una ejecución defendible. El siguiente paso es una decisión del
propietario (P01/P02/P10), no más código.

## C. Línea base y preservación

| Elemento                            | Valor                                                                                   |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| HEAD local / remoto MC-18           | `3490c0f71eb6eaa89588b7a6d75bb3b6066cd094` (idénticos)                                  |
| PR #25                              | OPEN / DRAFT / MERGEABLE, base `feature/marea-mc17-premium-design-system`, sin fusionar  |
| `main`                              | No contiene la cadena MC-17/MC-18; el PR sigue apilado, nunca contra `main`              |
| Implementación MC-18 / sistema MC-17| Sin cambios (`git diff` vacío contra `3490c0f`)                                          |
| Rutas públicas / sitemap / `public/`| Sin cambios                                                                              |
| Evidencia y auditoría MC-18         | Preservadas; el validador MC-18 se re-ejecuta sin modificar su evidencia histórica       |
| Deuda heredada                      | Visible y abierta; no se cierra ninguna partida                                          |

## D. Descubrimiento y decisión de alcance

Se inspeccionaron el repositorio y su historia, el registro de 36 prompts, la roadmap
comercial, los documentos MC-18 D18/D21/D22/D23, el JSON de handoff
`data/mc19-handoff-inputs.json`, el registro de rutas MC-15, las compuertas MC-14 y el estado
de comercio MC-16. El resultado es que el alcance contractual de MC-19 **no está definido de
forma suficiente**:

- falta el Master Prompt autoritativo;
- no existe ruta/entidad/página de armadores en MC-15;
- no está decidido si “segment/solution pages” son 3 páginas de audiencia, las 2 páginas
  profesionales de MC-15, la portada de soluciones más 6 páginas de paquete, o un subconjunto;
- “real CTAs only” no define el comportamiento de las CTA, y quote/pre-registration
  requieren captación de leads y base jurídica inexistentes;
- no hay contrato de contenido, copy aprobado, criterios medibles ni frontera con MC-20-23;
- la compuerta de privacidad está bloqueada y 0/24 documentos están ejecutados.

## E. Inventario de entregables

| Entregable | Ruta                                                              | Estado      |
| ---------- | ----------------------------------------------------------------- | ----------- |
| D01        | `docs/marea/segments/MC19-SCOPE-PROPOSAL.md`                      | Entregado   |
| D02        | `docs/marea/segments/MC19-SOURCE-VERIFICATION.md`                 | Entregado   |
| D03        | `docs/marea/segments/MC19-DEPENDENCIES-AND-BLOCKERS.md`           | Entregado   |
| D04        | `docs/marea/segments/MC19-ACCEPTANCE-CRITERIA.md`                 | Entregado   |
| D05        | `docs/marea/segments/MC19-RISK-REGISTER.md`                       | Entregado   |
| D06        | `docs/marea/segments/MC19-MC20-HANDOFF-INPUTS.md`                 | Entregado   |
| D07        | `docs/marea/segments/MC19-EXECUTIVE-REPORT-ES.md`                 | Entregado   |
| Datos      | `data/mc19-scope-proposal.json`, `mc19-source-verification.json`, `mc19-risk-register.json`, `mc19-mc20-handoff-inputs.json`, `mc19-review-findings.json`, `manifest.json` | Entregados |
| Validador  | `scripts/check-mc19-scope.mjs` + `scripts/check-mc19-scope.test.mjs` | Entregados |
| Evidencia  | `docs/marea/segments/evidence/scope-validator-run.json`           | Generada    |

**No entregado (deliberadamente):** ninguna página, ruta, componente, formulario, endpoint,
almacén de leads, registro de instaladores, precio, SKU o artefacto público de MC-19.

## F. Matriz de criterios de aceptación (resumen)

| ID    | Criterio                                                                                  | Estado   |
| ----- | ----------------------------------------------------------------------------------------- | -------- |
| AC-01 | Master Prompt emitido y alcance aprobado (P01, P10)                                       | PROPOSED |
| AC-02 | Decisión IA/ruta/entidad con comprobación de colisiones (P02)                             | PROPOSED |
| AC-03 | Una página por árbol de componentes bilingüe, bloques con evidencia y estados fijos       | PROPOSED |
| AC-04 | Reutilización del sistema MC-17 sin fork                                                   | PROPOSED |
| AC-05 | Sin ruta pública, canonical, hreflang, JSON-LD ni sitemap; preview loopback con noindex    | PROPOSED |
| AC-06 | Sin formulario, endpoint, lead, registro, quote o pre-registration; CTA fail-closed        | PROPOSED |
| AC-07 | SSR/hidratación, teclado, foco, movimiento reducido y responsive 320-1440                  | PROPOSED |
| AC-08 | Compuertas con recuentos exactos y sin PASS prefijado                                     | PROPOSED |
| AC-09 | Revisión independiente con 0 BLOCKING y 0 MAJOR abiertos                                  | PROPOSED |
| AC-10 | PR en borrador; sin merge, despliegue, publicación ni activación pública                  | PROPOSED |

`MC19_ACCEPTANCE_CRITERIA_VERIFIED = 0`. Una propuesta no puede aprobar un hito.

## G. Evidencia de pruebas y compuertas

Mediciones reales en el HEAD de la propuesta; la tabla final se re-ejecuta tras la revisión
independiente y se actualiza con los recuentos exactos.

| Comando                              | Resultado observado                                                        |
| ------------------------------------ | -------------------------------------------------------------------------- |
| `npm run test:mc19-scope`            | Validador determinista de la propuesta (20 comprobaciones)                 |
| `npm run test:mc19-scope:unit`       | **21/21** pruebas unitarias/adversarias                                    |
| `npm run test:landing`               | **59/60** en árbol pre-commit; solo `MC18-56` por el directorio nuevo; se re-ejecuta limpio tras el commit |
| `npm run test:landing:unit`          | **45/45**                                                                  |
| `npx tsc -p tsconfig.app.json --noEmit` | exit 0                                                                  |
| `npm run format:check`               | exit 0                                                                     |

La cifra `59/60` no se oculta: es un control de alcance del árbol de trabajo de MC-18, no una
regresión de implementación. El commit de la propuesta deja el árbol limpio y la compuerta se
re-ejecuta en la entrega.

## H. Auditoría independiente y correcciones

Revisión independiente: pendiente en el momento de redactar este informe. Se actualizará con
el SHA revisado, el veredicto, los hallazgos y las correcciones antes de la entrega final. No
se declara PASS de auditoría sin evidencia.

## I. Dependencias y riesgos

| ID  | Dependencia/bloqueo                                              | Estado      |
| --- | ---------------------------------------------------------------- | ----------- |
| P01 | Master Prompt autoritativo de MC-19                              | ABSENT      |
| P02 | Decisión IA/ruta/entidad de segmentos y soluciones               | ABSENT      |
| P03 | Privacidad/DPA/DPIA (B07)                                        | BLOCKED     |
| P04 | Copy público (B05) y claims (B06)                                | ABSENT      |
| P05 | Datos comerciales y precio (B08)                                 | ABSENT      |
| P06 | Publicación/indexación/despliegue y release (B09)                | ABSENT      |
| P07 | Marca y uso público de MAREA (B01/B02)                           | NOT_GRANTED |
| P08 | IP de origen y licencias (B03)                                   | NOT_CLEARED |
| P09 | Programa de 13 compuertas MC-14 (B10)                            | 0/13        |
| P10 | Aprobación de esta propuesta, propietarios y ámbitos de escritura | ABSENT     |

Riesgos principales: invención de alcance (R01), colisión/ambigüedad IA (R02), captación sin
base jurídica (R03), activación pública accidental (R04), fuga de claims/precio/stock (R05),
fork del sistema de diseño (R06), paridad ES/EN (R07), solapamiento con MC-20-23 (R08),
deriva de evidencia (R09), deuda V-18 oculta (R10), sobredeclaración de accesibilidad (R11),
debilidad de aislamiento del preview (R12), rebinding tardío del Master Prompt (R13) y merge
accidental (R14). El registro completo está en D05.

## J. Estado legal y de publicación

```text
TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
LICENSING_RIGHTS_GRANTED = false
PRICE_APPROVED = NONE
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
PILOT_SAFETY_GATE = BLOCKED
TESTED_COMPATIBILITY_ROWS = 0
PUBLICATION_AUTHORIZED = false
INDEXATION_AUTHORIZED = false
PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED
```

13 compuertas MC-14, 0 cerradas; 24 documentos requeridos, 0 ejecutados; 42 afirmaciones, 0
autorizadas públicamente. Ningún éxito interno de MC-19 se interpreta como aprobación legal o
comercial externa.

## K. Traspaso a MC-20

MC-20 (catálogo de producto, lote 1: NAV, HUB, AIS) depende de MC-02/16/18, no de una MC-19
implementada. No debe asumir que existen páginas de segmento o solución, rutas públicas,
precios, SKU, compra, captación de leads o autorización de publicación. Los inputs
disponibles y ausentes están en D06 y `data/mc19-mc20-handoff-inputs.json`.

```text
MC20_STARTED = false
MC20_SCOPE_APPROVED = false
MC20_DEPENDENCY_ON_MC19_IMPLEMENTATION = false
```

## L. Próxima acción requerida

1. Emitir el Master Prompt autoritativo de MC-19 (P01) y aprobar una revisión exacta del
   alcance (P10).
2. Registrar la decisión IA/ruta/entidad, incluida la página de armadores y la frontera con
   MC-20-23 (P02).
3. Si se aprueba la opción A, ejecutar las tareas T01-T08 con la matriz D04 y el DAG D03, sin
   flujo de consulta.
4. Reabrir el flujo de consulta solo cuando P03 y P06 cierren; ninguna CTA de quote o
   pre-registration puede existir antes.

## M. Bloque de veredicto final

```text
MC19_VERDICT = BLOCKED
MC19_SCOPE_PROPOSAL = DELIVERED
MC19_INTERNAL_ENGINEERING = NOT_APPLICABLE_NO_IMPLEMENTATION
MC19_GLOBAL_COMMERCIAL_READINESS = NOT_READY
MC19_IMPLEMENTATION_STARTED = false
MC19_IMPLEMENTATION_AUTHORIZED = false
MC19_MASTER_PROMPT = NOT_ISSUED
MC19_IA_ROUTE_DECISION = ABSENT
MC19_PRIVACY_GATE = BLOCKED
MC19_PUBLICATION = NOT_AUTHORIZED
MC19_LEAD_CAPTURE = false
MC19_PUBLIC_ROUTES_ACTIVATED = 0
MC19_MERGED = false
MC19_DEPLOYED = false
MC19_PUBLISHED = false

MC18_VERDICT = PARTIAL
MC18_INTERNAL_LANDING_SCOPE = PASS_INTERNAL_LANDING_SCOPE
FINANCIAL_V18 = INHERITED_OPEN
MC16_FINAL_02 = OPEN_UNTIL_REVERIFIED
MC13_F05 = OPEN
MC13_F11 = OPEN
MC13_F14 = OPEN
MC15_GSC01 = OPEN
MC15_GSC02 = OPEN
```
