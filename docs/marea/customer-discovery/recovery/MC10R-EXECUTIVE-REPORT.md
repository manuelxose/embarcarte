# MC-10R — Informe ejecutivo de recuperación (D34)

| Campo | Valor |
| --- | --- |
| Document ID | MC-10R / D34 / `MC10R-EXECUTIVE-REPORT` |
| Programa | EMBARCARTE / MAREA |
| Hito | MC-10R — sub-hito de recuperación de MC-10 (el programa sigue teniendo 36 hitos) |
| Fecha | 2026-11-01 |
| Estado del documento | `DELIVERED` — informe ejecutivo final de la recuperación interna |
| Responsable | `lead` (Dirección del Programa de Recuperación) |
| Rama | `feature/marea-mc10r-fieldwork-recovery` |
| Base | `d1ac69a4873222fbde93dcf69c360a5e0ca1542d` (HEAD verificado de MC-10) |
| Commits | implementación `b0a8c12`; corrección de auditoría `ea80ea5`; commit de entrega (este registro) |
| Commit revisado | `ea80ea5927fa5b0df376bbbe71567ad8d86a3853`, re-verificado por la revisión independiente D33 |
| PR | PR en borrador apilado [#17](https://github.com/manuelxose/embarcarte/pull/17) contra `feature/marea-mc10-primary-customer-discovery`; `OPEN`, borrador, `MERGEABLE`, no fusionado; PR #16 intacto |
| Veredicto de recuperación | `PASS_INTERNAL_PREPARATION_SCOPE` (solo preparación interna) |
| MC-10 investigación primaria | `BLOCKED / NOT_EXECUTED` |
| Autorización | `AUTH-MC10-001 = NOT_GRANTED` |
| Trabajo de campo | `FIELDWORK_STATUS = BLOCKED`; `FIELDWORK_READINESS = PARTIALLY_READY` |

## 27.1 Veredicto ejecutivo

MC-10R se ejecutó como recuperación **interna** del hito MC-10/36. El resultado es
`PASS_INTERNAL_PREPARATION_SCOPE`: el paquete de preparación está completo, es coherente, está
validado de forma determinista y fue revisado de forma independiente. Ese veredicto interno **no** convierte MC-10
en una investigación realizada: MC-10 sigue `BLOCKED` porque no existe autorización externa.

- **Resultado MC-10R:** `PASS_INTERNAL_PREPARATION_SCOPE`, con una revisión independiente final
  `PASS_INTERNAL_PREPARATION_SCOPE`
  limitada al alcance de preparación interna (D33, commit revisado `ea80ea5`).
- **Estado de la investigación primaria MC-10:** `BLOCKED`; `AUTH-MC10-001 = NOT_GRANTED`;
  `OUTREACH_AUTHORIZATION = NOT_GRANTED`; `FIELDWORK_STATUS = BLOCKED`;
  `MC10_PRIMARY_RESEARCH = NOT_EXECUTED`.
- **Cifras reales:** 0 participantes, 0 entrevistas, 0 casos analíticos válidos, 0 respuestas de precio,
  0 experimentos ejecutados, 0 productos probados, 0 bundles probados, 0 precios aprobados,
  0 productos pedibles.
- **Alcance completado:** corrección de PI-01…PI-05; nueve enmiendas de instrumento IV-01…IV-09 como
  versiones candidatas trazables; `AUTH-MC10-001` revisión 2 preparada y **no concedida**; paquete
  jurídico/privacidad revisable; arquitectura de datos segura con pruebas sintéticas locales; modelo
  operativo de entrevistadores humanos, formación, kit, plantillas ES/EN y plan de la Ola 1; validador de
  recuperación determinista y suite adversaria; CR-62 ampliado a EN/ES/PT sin debilitar la puerta
  existente; auditoría independiente y PR apilado en borrador.
- **Dependencias pendientes (externas):** autorización real firmada; identidad verificada del
  responsable del tratamiento; contacto de privacidad verificado; revisión jurídica cualificada;
  información al participante y consentimiento aprobados; almacén seguro aprovisionado y revisado;
  entrevistadores nombrados y formados; versiones efectivas de instrumentos y enmiendas de muestreo
  aprobadas; canales de captación autorizados; periodo de trabajo de campo vigente.
- **Frontera que este informe no cruza:** no hubo contacto externo, ni captación, ni entrevistas, ni
  gasto, ni publicidad, ni venta, ni publicación, ni despliegue, ni fusión de ramas.

## 27.2 Defectos de planificación PI-01…PI-05

| Defecto | Problema original y fuente | Corrección propuesta/implementada | Versión histórica | Versión candidata | Estado de aprobación | Evidencia de prueba | Dependencia restante |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PI-01 | Las cuotas por segmento suman 37 mínimo / 57 máximo, pero el objetivo de programa es 40–80; los totales no derivan de las cuotas (`data/research-status.json`; plan MC-09; protocolo MC-10) | Reconciliación con análisis de opciones A/B/C y recomendación (opción A+C): cuotas autoritativas 37/57; 40–80 conservado como `HISTORICAL_PLANNING_ASPIRATION`; diseño por olas | Tabla de cuotas v1.0.0 conservada como referencia inmutable | `MC10R-SAMPLING-1.1.0-PROPOSED` | `PROPOSED_NOT_EFFECTIVE` (requiere aprobación del propietario) | D5: 20 ocurrencias trazadas, aritmética recomputada, 7 rechazos exigidos al validador | Aprobación del propietario del programa |
| PI-02 | Tres lecturas incompatibles de mínimos/objetivos por segmento (mínimo 5/objetivo 8; mínimos inferiores para operadores/comerciantes; mínimo 5 en SEG-04/05; objetivo 8–10 en el registro) | Contrato único de cuotas con 15 campos por segmento (14 enumerados + `priorVersionReading`); seis clases de ambigüedad eliminadas | Tabla y lecturas v1.0.0 conservadas lado a lado | `MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED` | `PROPOSED_NOT_EFFECTIVE` | D6: 8 segmentos × 15 campos, suma 37/57, bloque YAML verificado; D8 registra el límite de alcance de PI-05 | Aprobación del propietario |
| PI-03 | EXP-MC10-04/05 exigen `n>=8` por segmento y constructo, pero SEG-04/05/06/08 tienen máximos 7/7/5/6 (`data/experiments.json`; `data/pricing-ladders.json`) | Matriz de 32 celdas; mínimo registrado conservado sin reducción; `BELOW_REGISTERED_MINIMUM` para SEG-04/05/06/08; regla de dos atributos (alcanzabilidad + población registrada); Ola 1 solo indicativa | Ladders congeladas y su hash `bfa09ebc…be8c` intactos | Decisión DR-MC10R-03 propuesta | Recomendación `PROPOSED_NOT_EFFECTIVE`; ningún precio aprobado | D7: aritmética 7<8, 7<8, 5<8, 6<8; 16 celdas alcanzables / 16 por debajo; 0 ejecutadas | Aprobación del propietario; estudio cuantitativo posterior con autorización separada |
| PI-04 | Faltaban IV-01…IV-06: consentimiento de cita/desidentificación, divulgación de marca, procedencia de PRICE-01, captura de versión de consentimiento, codebook ANA-01 y vía de reclamación | Paquete de enmienda con nueve registros fechados, versiones previa/candidata, motivo, hash de origen y hash candidato no efectivo | Instrumentos v1.0.0 conservados y hash `cbe7f9fe…120d` verificado | Paquete `MC10R-INSTRUMENT-AMENDMENT-v1.1.0` | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` | D9, D10, D11, D12; CR-62 y puerta de recuperación en verde | Revisor autorizado; revisión ES/EN cualificada; revisión jurídica |
| PI-05 | GUIDE-01 no tenía pregunta de incidente/incidente evitable para EXP-MC10-09, Q11 ponía beneficios antes de exclusiones y los conceptos A–E no coincidían con los identificadores del programa | IV-07 secuencia neutral de incidentes; IV-08 exclusiones antes de beneficios; IV-09 mapeo canónico A→NAV, B→HUB+START, C→WATCH+PROTECT, D→INTEGRATED_SYSTEM, E→FLEET | Guiones históricos A–E conservados sin recodificación silenciosa | Candidato v1.1.0 | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` | D9, D11; D8 documenta que PI-05 pertenece al alcance de instrumentos, no al de muestreo | Aprobación de instrumentos; revisión cualificada |

Ninguna de estas correcciones está en vigor: todas son candidatas. Ningún umbral, cuota o requisito de
consentimiento se redujo para obtener un PASS.

## 27.3 Enmiendas de instrumento IV-01…IV-09

| ID | Instrumento | Cambio | Estado | Traducción / dependencia |
| --- | --- | --- | --- | --- |
| IV-01 | CONSENT-01 | Cuatro permisos separados (participación, grabación opcional, cita desidentificada, seguimiento); permiso de datos separado del permiso de cita; quitar el nombre no garantiza anonimato | `REVIEW_REQUIRED` / `PROPOSED_NOT_EFFECTIVE` | ES/EN candidatas sin firma cualificada; PT no revisado |
| IV-02 | GUIDE-01 | Congelar cuándo y cómo se introduce EMBARCARTE/MAREA, estado del concepto, capacidades no disponibles y exclusiones comerciales; la investigación no es una venta | `REVIEW_REQUIRED` | ES/EN candidatas; revisión de marca pendiente |
| IV-03 | PRICE-01 | Congelar procedencia y versión de cada escalera mostrada (fuentes de referencia, constructo, componentes incluidos/excluidos, moneda, IVA, periodo, instalación, secuencia, versión efectiva) | `REVIEW_REQUIRED` | Sin cambios de valores; hash de ladders verificado |
| IV-04 | NOTE-01 / SCHEMA-01 | Registrar ID/versión/idioma/fecha del consentimiento, estado de permisos, grabación/cita/seguimiento y evento de retirada; sin claves de identidad en el repositorio | `REVIEW_REQUIRED` | ES/EN candidatas |
| IV-05 | ANA-01 | Codebook v1.1.0: 12 códigos operativos reconciliados con 8 familias temáticas; criterios de inclusión/exclusión, ejemplos, resolución de ambigüedad y reglas de intercodificación; sin calcular kappa sin registros reales | `REVIEW_REQUIRED` | Depende de datos reales para kappa (no existen) |
| IV-06 | Información de privacidad | Texto de derechos y reclamación ante autoridad de control; sin inventar identidad del responsable, jurisdicción ni contactos | `DRAFT_NOT_APPROVED` / `DRAFT_FOR_LEGAL_REVIEW` | Revisión jurídica ES; PT antes de Portugal |
| IV-07 | GUIDE-01 | Secuencia neutral de incidentes/incidentes evitables para EXP-MC10-09: si ocurrió, periodo, qué pasó, detección, respuesta, consecuencias, prevención, monitorización existente, evidencia y efecto en compra/mantenimiento | `REVIEW_REQUIRED` | ES/EN candidatas |
| IV-08 | GUIDE-01 Q11 | Exclusiones materiales antes de beneficios, con las limitaciones específicas del concepto probado | `REVIEW_REQUIRED` | ES/EN candidatas |
| IV-09 | Todos | Mapeo único `sourceConceptId → effectiveResearchConceptId → familia/bundle → versión`; ningún ID desconocido; sin recodificar datos históricos | `REVIEW_REQUIRED` | Verificado contra guía, comprensión, precios, notas, esquema, análisis y CR-62 |

Ninguna traducción se presenta como revisada profesionalmente y ninguna equivalencia está establecida.
El portugués es un borrador no aprobado; Portugal queda excluido del trabajo de campo.

## 27.4 Autorización AUTH-MC10-001 revisión 2

- **Preparación documental:** `DOCUMENT_STATUS = DRAFT_PREPARED`; `AUTHORIZATION_STATUS = NOT_GRANTED`;
  `FIELDWORK_PERMISSION = FALSE`; `EXTERNAL_CONTACT_ALLOWED = FALSE`.
- **Campos:** 30 campos numerados / 31 claves planas (el campo 5 es compuesto: persona autorizante y base
  de autoridad); todos los valores humanos, jurídicos, de almacenamiento y de entrevistadores son `null`
  u `OPEN`, con el rol responsable y la evidencia exigida. No se inventó ningún autorizante, firma, fecha,
  responsable del tratamiento ni contacto.
- **Alcance propuesto (no concedido):** Ola 1 exploratoria SEG-03 5–8, SEG-01 5–8, SEG-04 5–7, SEG-06
  3–5 = 18–28 entrevistas; Rías Baixas / Galicia; Portugal excluido; incentivos `ZERO` y gasto `ZERO`
  como propuestas, no como aprobaciones; contacto máximo autorizado actual 0 y entrevistas máximas
  autorizadas actuales 0.
- **Distinción explícita:** el Master Prompt, la aprobación de un PR, la asignación de una tarea, un
  validador en verde o la identidad de un agente **no** son autorización. Solo un registro separado,
  fechado, firmado y con evidencia de aprobación puede cambiar el estado a `GRANTED`.
- **Puerta fail-closed (D14):** 11 prerrequisitos clasificados individualmente; en el estado actual
  0 verificados, 3 bloqueados, 1 preparado pendiente de aprobación, 2 dependencias externas y 5 no
  listos; tabla de liberación RD-01…RD-16 con denegación por defecto.

## 27.5 Preparación jurídica y de privacidad

- **Responsable del tratamiento:** `OPEN`. No se equipara el nombre comercial con la entidad jurídica; se
  solicita identidad corporativa verificada y contacto de privacidad al propietario del programa.
- **Contacto de privacidad:** `OPEN`; no se inventó.
- **Revisión jurídica:** `LEGAL_REVIEW_PENDING`; los documentos están `DRAFT_FOR_LEGAL_REVIEW`. Se
  analizan GDPR, LOPDGDD, normas españolas de comunicaciones electrónicas (marcadas como candidatas no
  verificadas), Lei 58/2019 y normas portuguesas candidatas; 17 preguntas abiertas Q-01…Q-17 y una lista
  de comprobación de 14 puntos. AEPD y CNPD se identifican como autoridades de reclamación, pero la
  jurisdicción y los contactos no se afirman verificados.
- **Base jurídica:** se separan contacto inicial, participación, grabación y seguimiento; no se asume
  una base única.
- **Información al participante y consentimiento:** diseño con cuatro permisos separados y registro de
  versión/idioma/fecha; no se puede emitir información al participante mientras el responsable esté
  `OPEN`; el uso de testimonios públicos sigue bloqueado por la gobernanza de marca.
- **Nada de esto constituye asesoramiento jurídico ni aprobación legal.**

## 27.6 Preparación de entrevistadores humanos

- **Roles definidos:** propietario de la investigación, jefe de campo, entrevistadores humanos,
  administrador de datos, analista cualitativo, segundo codificador y auditor independiente, con
  mandatos, prohibiciones y separación de funciones.
- **Manual y formación:** manual operativo, plan de formación de 16 módulos, entrevista simulada con
  escenarios ficticios etiquetados `TRAINING_SYNTHETIC_NOT_RESEARCH`, rúbrica de 13 dimensiones y
  aprobación obligatoria de un supervisor humano.
- **Estado real:** todos los roles `UNASSIGNED`; entrevistadores `UNTRAINED`; formación
  `NOT_PERFORMED`; ninguna persona ha aceptado un rol; los contactos de supervisor están en blanco.
- **Plantillas de captación:** 10 plantillas ES/EN, todas `NOT_APPROVED` y `NOT_SENT`, sin promesas de
  disponibilidad, descuentos o acceso anticipado; el portugués queda fuera de alcance.
- **Conclusión:** existe un manual completo; **no** existe un entrevistador formado y nombrado. Un manual
  no es una persona capacitada.

## 27.7 Ola 1 propuesta

- **Cohortes:** A) propietarios de embarcaciones desatendidas (SEG-03, WATCH/PROTECT); B) propietarios de
  embarcaciones costeras (SEG-01, NAV/START); C) instaladores de electrónica marina (SEG-04, HUB y
  sistemas integrados); D) operadores de marina/astillero (SEG-06, WATCH/FLEET).
- **Cuotas:** SEG-03 5–8; SEG-01 5–8; SEG-04 5–7; SEG-06 3–5; total 18–28 entrevistas completadas.
- **Geografía:** Rías Baixas / Galicia (España). Portugal excluido. Otras regiones o segmentos, solo en la
  Ola 2 con el plan de muestreo aprobado.
- **Método y elegibilidad:** entrevistas semiestructuradas con guion aprobado, selección por criterios,
  consentimiento registrado, captura segura de notas y, cuando proceda, módulo de precios.
- **Experimentos:** la Ola 1 es exploratoria; puede generar indicios de problema y de objeciones de
  precio, pero **no** emite veredictos de experimento. En precios, solo SEG-01 y SEG-03 podrían alcanzar
  8 entrevistas completas y aun así solo como indicación de segmento (`WAVE1_PRICING_INDICATION_ONLY`);
  los veredictos de EXP-MC10-04/05 quedan `PENDING_WAVE2`; SEG-04 y SEG-06 son solo cualitativos.
- **Condiciones go/no-go:** validar prerrequisitos; autorización escrita; roster y formación aceptados;
  instrumentos efectivos cargados; almacén seguro operativo; captación por canales autorizados;
  supervisión inicial; revisión temprana de calidad; control de desviaciones; resto de entrevistas bajo el
  protocolo; codificación y revisión independiente; conclusiones solo con evidencia real. Cualquier paso
  fallido detiene la ola. No existe ningún calendario, cita ni participante ficticio.

## 27.8 Pruebas y revisión independiente

| Puerta | Resultado real |
| --- | --- |
| `node scripts/check-marea-customer-research.mjs` | 62/62 comprobaciones (CR-01…CR-62) |
| `node --test scripts/check-marea-customer-research.test.mjs` | 111/111 pruebas (96 originales conservadas + 15 nuevas de CR-62) |
| `node scripts/check-marea-customer-recovery.mjs` | 32/32 comprobaciones (CRR-01…CRR-32) |
| `node --test scripts/check-marea-customer-recovery.test.mjs` | 82/82 pruebas (74 iniciales + 8 de la corrección de auditoría) |
| `test:market` / `test:market:unit` | 40/40; 43/43 |
| `test:products` / `test:products:unit` | 52/52; 106/106 |
| `test:bundles` / `test:bundles:unit` | 35/35; 60/60 |
| `test:brand` / `test:brand:unit` | 21/21; 13/13 |
| i18n / commerce / SEO / backup | PASS; SEO con 101 URL del sitemap |
| `npm run build` / `npm run test:e2e` | PASS; Playwright 15/15 |
| `format:check` / `npm audit` / `git diff --check` | Limpio; 0 vulnerabilidades; sin errores de espacios |

**Integridad de congelaciones:** los 10 hashes de umbrales de experimentos, el auto-freeze de las
escaleras de precio `bfa09ebc…be8c` y el hash de la fuente de instrumentos `cbe7f9fe…120d` se
recomputaron sin cambios, también en la remedición independiente.

**Mejora de CR-62:** se amplió de forma aditiva para cubrir comillas rectas, curvas y angulares;
atribuciones con guion, raya, orden inverso y paréntesis; sustantivos de rol y verbos de reporte en
EN/ES/PT (incluidos plurales y géneros); habla indirecta; recuentos fabricados de entrevistas;
porcentajes de participantes y preferencias de cliente. Se conservaron exactamente las 62
comprobaciones y las 96 pruebas originales; se añadieron 15 pruebas reales. Se documentan los límites
léxicos y los falsos negativos conocidos: la heurística **no** demuestra ausencia de fabricación.

**Revisión independiente (D33):** primera ronda `PARTIAL` con 1 defecto MAJOR (ramas de código muertas
en CRR-25) y 3 MINOR (recuento de campos, receta de congelación en D1, heurísticas de la puerta de
recuperación más estrechas que CR-62) más 2 informativos. Corregidos en `ea80ea5` y re-verificados de
forma independiente: F01–F05 `CLOSED`; F06 (estado remoto/PR no verificable offline) queda como
limitación que el Lead cierra en D35 §7 con evidencia del push y del PR. Veredicto final:
`PASS_INTERNAL_PREPARATION_SCOPE`, con rechazo explícito de cualquier veredicto favorable de
investigación primaria y de cualquier aprobación jurídica.

## 27.9 Dependencias bloqueantes restantes

| Dependencia | Responsable | Evidencia requerida | Estado | ¿Puede empezar el trabajo de campo? |
| --- | --- | --- | --- | --- |
| Autorización externa `AUTH-MC10-001` rev ≥ 2 `GRANTED` | Propietario del programa (persona nombrada) | Registro fechado, firmado, con base de autoridad, alcance, canales, techos, gasto/incentivos, duración y jefe de campo | `OPEN` (`NOT_GRANTED`) | **No** |
| Identidad verificada del responsable del tratamiento | Propietario / fuente autorizada | Entidad jurídica, identificador, domicilio, representante y rol | `OPEN` | **No** |
| Contacto de privacidad verificado | Responsable | Contacto monitorizado y compromiso de respuesta; determinación de DPO | `OPEN` | **No** |
| Revisión jurídica cualificada | Asesor jurídico | Referencia escrita, alcance, fecha, identidad y conclusiones | `LEGAL_REVIEW_PENDING` | **No** |
| Información al participante y consentimiento aprobados | Responsable + jurídico + investigación | Versiones aprobadas ES (PT antes de Portugal), instrumento y cuatro permisos | `DRAFT_FOR_LEGAL_REVIEW` | **No** |
| Instrumentos efectivos aprobados | Propietario de investigación + metodólogo (+ jurídico) | Aprobación firmada de IV-01…IV-09, versión efectiva y hashes recomputados | `REVIEW_REQUIRED` | **No** |
| Enmiendas de muestreo/cuotas/protocolo aprobadas | Propietario del programa | Aprobación fechada de las versiones candidatas | `PROPOSED_NOT_EFFECTIVE` | **No** |
| Almacén seguro aprovisionado | Administrador de datos / responsable | Referencia real, cifrado, registro de auditoría, retención y borrado configurados | `ARCHITECTURE_DEFINED` | **No** |
| Revisión de accesos | Administrador + responsable | Lista revisada, mínimo privilegio, fecha y revisor | `ACCESS_REVIEWED = false` | **No** |
| Aprobación operativa del tratamiento | Responsable | Firma de retención, borrado, retirada, copias, brecha y procesadores | `OPERATIONALLY_APPROVED = false` | **No** |
| Entrevistadores nombrados y formados; jefe de campo | Propietario / jefe de campo | Personas nombradas, conflictos declarados, formación con firma de supervisor, canales aprobados | 0 asignados, 0 formados | **No** |
| Canales de captación y permisos de porteros | Propietario / jefe de campo | Autorización por canal y permiso documentado; sin listas compradas o raspadas | `OPEN` | **No** |
| Periodo de campo vigente y no revocado | Propietario | Fechas de inicio/fin y mecanismo de revocación | No existe | **No** |

## 27.10 Entrega final al propietario

Para iniciar investigación real, el propietario del programa debe, en este orden: (1) emitir la
autorización `AUTH-MC10-001` revisión ≥ 2 con todos los campos, firma y evidencia; (2) designar y
verificar el responsable del tratamiento y el contacto de privacidad; (3) obtener la revisión jurídica y
aprobar la información al participante y el consentimiento; (4) aprobar las enmiendas de muestreo, el
contrato de cuotas y el paquete de instrumentos como versión efectiva; (5) aprovisionar el almacén seguro
y revisar los accesos; (6) nombrar, formar y autorizar a los entrevistadores y al jefe de campo; (7)
autorizar los canales de captación y los permisos de porteros; (8) registrar el periodo de campo y el
mecanismo de revocación. Solo entonces la puerta D14 puede abrirse y la Ola 1 puede comenzar.

**Veredicto de recuperación interna MC-10R:** `PASS_INTERNAL_PREPARATION_SCOPE` — el paquete está
completo, es coherente, está validado y revisado de forma independiente, y es ejecutable en cuanto exista
una autorización legítima.

**Veredicto de investigación primaria real MC-10:** `BLOCKED / NOT_EXECUTED` — no se ha contactado a
ningún participante, no se ha realizado ninguna entrevista, no se ha recogido evidencia de mercado y no
se ha concedido ninguna autorización externa; la demanda, la disposición a pagar y la viabilidad
comercial siguen sin validar.

*(Este informe ejecutivo se complementa con D35, registro de entrega con la evidencia real de comandos,
y D36, entrega operativa al trabajo de campo autorizado.)*
