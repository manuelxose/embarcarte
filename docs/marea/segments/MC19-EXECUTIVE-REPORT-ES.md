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
dependencia de MC-18, pero **no está registrado ni suministrado el Master Prompt autoritativo
de MC-19**: el registro de 36 prompts declara expresamente que los prompts 03-36 son
marcadores de planificación y que el texto emitido por el cliente es la autoridad. La
ausencia en el repositorio no prueba por sí sola que no se emitiera sin commitear (precedente
MC-18); la parada se apoya también en bloqueos verificables. El registro de rutas de MC-15 no
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
MC19_INDEPENDENT_AUDIT_RECOMMENDATION = PASS_INTERNAL_SCOPE_PROPOSAL
MC19_OPEN_FINDINGS = 0
MC19_IMPLEMENTATION_STARTED = false
MC19_IMPLEMENTATION_AUTHORIZED = false
MC19_MASTER_PROMPT = NOT_RECORDED_OR_SUPPLIED
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

- no hay constancia de emisión ni suministro del Master Prompt autoritativo; la ausencia en
  el repositorio no lo prueba por sí sola (MC-18 registra el mismo hueco de prompt no
  commiteado), por lo que la parada se apoya también en los bloqueos verificables;
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

Mediciones finales en el HEAD de cierre (corrección `c0dc986`, etiquetas `8909ad5`), tras el
cierre de la revisión. La cifra `59/60` de la fase pre-commit no se oculta: era un control de
alcance del árbol de trabajo de MC-18, no una regresión; tras el commit la compuerta se
re-ejecutó en **60/60** y su registro se conserva en
`docs/marea/segments/evidence/landing-gate-run.json` sin sobrescribir la evidencia histórica
de MC-18.

| Comando                                     | Resultado observado                                                                 |
| ------------------------------------------- | ----------------------------------------------------------------------------------- |
| `npm run test:mc19-scope`                   | **23/23** comprobaciones deterministas, exit 0; evidencia en `evidence/scope-validator-run.json` |
| `npm run test:mc19-scope:unit`              | **29/29** pruebas unitarias/adversarias, exit 0                                     |
| `npm run test:landing` (árbol limpio)       | **60/60**, exit 0; evidencia MC-18 restaurada tras la medición                      |
| `npm run test:landing:unit`                 | **45/45**, exit 0                                                                   |
| `npx tsc -p tsconfig.app.json --noEmit`     | exit 0                                                                              |
| `npx tsc -p preview/landing/tsconfig.json --noEmit` | exit 0                                                                      |
| `npm run build`                             | exit 0; 330 archivos / 7.865.962 B; **0** identificadores de la landing             |
| `npm run build:landing:preview`             | exit 0; 0 rutas prerenderizadas                                                     |
| Probes del servidor público (`PORT=4398`)   | `/` 200, `/en` 200, `/marea` **404**, `/en/marea` **404**                            |
| `npm run test:design-system` / `:unit`      | **38/38** / **41/41**, exit 0                                                       |
| `npm run test:commerce-data`                | **1811/1811**, exit 0                                                               |
| `npm run test:ia-seo`                       | PASS: 20 datasets, 21 rutas actuales, 23 propuestas, 34 hallazgos, 13 compuertas    |
| `npm run test:legal-commercial`             | **54/54**, exit 0                                                                   |
| `npm run test:i18n` / `test:commerce`       | PASS (i18n y comercio server-authoritative)                                         |
| `npm run test:seo` / `test:backup`          | PASS (101 URLs de sitemap) / PASS (backup y restore verificados)                    |
| `npm run test:e2e`                          | **15/15**, exit 0                                                                   |
| `npm run format:check`                      | exit 0                                                                              |
| `npm run test:financial`                    | **76/77**, exit 1; solo la heredada `V-18` (no se oculta)                           |
| `npm audit --omit=dev --audit-level=high`   | 0 vulnerabilidades                                                                  |

No se ha ejecutado ninguna prueba nueva de implementación porque no hay implementación. Las
compuertas anteriores verifican que la propuesta no altera el sitio público, el sistema de
diseño, los datos de comercio ni la evidencia heredada.

## H. Auditoría independiente y correcciones

La revisión independiente se ejecutó sobre el commit congelado `b53f67e` y se re-verificó
sobre el commit de corrección `77e0699`. El backend Claude Code falló dos veces a nivel de
producto (exit 1, invalid-result) y se registra como no disponible; la revisión la realizó un
agente independiente nativo (id `3c8d2129-b23b-4e26-9254-353e108439ac`), distinto del autor.
Ronda 1: `NEEDS_REVISION`. Ronda 2 sobre `77e0699`: IR-02..IR-05 `CLOSED`; IR-01 `CLOSED`
para el defecto reportado; nuevos IR-06 (MAJOR, bypass por rename) e IR-07 (MINOR,
evidencia) — corregidos en la ronda 3 y pendientes de la re-verificación independiente.

| ID    | Severidad     | Problema                                                                 | Corrección                                                                                     |
| ----- | ------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| IR-01 | MAJOR         | La guarda de “sin implementación” era eludible (git diff, sin untracked) | Cambio completo contra baseline + `git status --untracked-files=all`, allowlist, helper conectado y pruebas adversariales |
| IR-02 | MINOR         | La declaración de parada sobredeclaraba (“ningún código/dataset”)         | Cualificada a “ningún código de producto/implementación, ruta, página, formulario, endpoint o artefacto público” |
| IR-03 | MINOR         | P03 aparecía como bloqueo de implementación, contradiciendo la opción A  | P03 separado en `enquiryFlowBlockers`; tablas D03 reetiquetadas                                |
| IR-04 | MINOR         | La ausencia del Master Prompt se infería del registro placeholder         | P01 se afirma desde el mandato y la ausencia de aprobación registrada; se declara la limitación |
| IR-05 | INFORMATIONAL | Revisión pendiente en D07 y 5 vs 6 datasets                              | D07 y `review-findings` actualizados; manifiesto con 6 datasets                                |
| IR-06 | MAJOR         | El allowlist era eludible renombrando un fichero fuente fuera de alcance | `porcelainPaths` devuelve ambos lados del rename; `git diff`/`status` usan `--no-renames`; prueba adversarial del path antiguo |
| IR-07 | MINOR         | D07 declaraba 23/23 en un HEAD donde la medición era 22/23                | Se declara 22/23 mientras IR-06 esté abierto; 23/23 y evidencia final tras el cierre            |

Las correcciones se aplican en los commits de remediación; el cierre de cada hallazgo y la
re-verificación independiente se registran en `data/mc19-review-findings.json`. Ningún
hallazgo se declara `CLOSED` antes de esa re-verificación.

**Cierre.** Ronda 3 sobre `c0dc986` y `8909ad5`: IR-06 `CLOSED` y IR-07 `CLOSED`.
Recomendación final del revisor independiente:

```text
MC19_INDEPENDENT_AUDIT_RECOMMENDATION = PASS_INTERNAL_SCOPE_PROPOSAL
MC19_OPEN_BLOCKING_FINDINGS = 0
MC19_OPEN_MAJOR_FINDINGS = 0
MC19_OPEN_MINOR_FINDINGS = 0
```

La condición administrativa de cierre (ronda 3, `reviewedCommit` `c0dc986`, evidencia del
validador 23/23) queda completada en el commit de cierre. Esta recomendación se limita al
ámbito interno de la propuesta de alcance; no es un veredicto de programa, una autorización
de publicación, un clearance legal ni una conformidad WCAG.

## I. Dependencias y riesgos

| ID  | Dependencia/bloqueo                                              | Estado      |
| --- | ---------------------------------------------------------------- | ----------- |
| P01 | Master Prompt autoritativo de MC-19 registrado/suministrado      | ABSENT      |
| P02 | Decisión IA/ruta/entidad de segmentos y soluciones               | ABSENT      |
| P03 | Privacidad/DPA/DPIA (B07) — solo subámbito de consulta diferido  | BLOCKED     |
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
MC19_MASTER_PROMPT = NOT_RECORDED_OR_SUPPLIED
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
