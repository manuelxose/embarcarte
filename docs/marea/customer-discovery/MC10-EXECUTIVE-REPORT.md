# MC-10 — Informe ejecutivo (español)

**Programa:** EMBARCARTE / MAREA — descubrimiento primario de clientes
**Hito:** MC-10 de 36
**Fecha:** 1 de noviembre de 2026
**Ámbito:** validación con participantes reales de problemas, compras, suscripciones, conceptos,
precios indicativos, objeciones de instaladores/canal y posicionamiento comercial
**Estado:** `BLOQUEADO — NO SE EJECUTÓ TRABAJO DE CAMPO PRIMARIO (AUTORIZACIÓN DE CONTACTO NO CONCEDIDA)`

> Este informe distingue en todo momento entre lo medido y lo no medido. **No se realizó ninguna
> entrevista.** No existe ningún participante, ninguna respuesta de precio, ninguna cita y ninguna
> observación de cliente. Cualquier lectura de este documento que atribuya hallazgos de clientes a
> MC-10 sería falsa.

---

## 1. Veredicto del hito

| Campo | Valor |
| --- | --- |
| Estado del hito | `BLOQUEADO` para el ámbito de investigación primaria |
| Preparación Wave 0 | Completada y verificable mecánicamente |
| Rama | `feature/marea-mc10-primary-customer-discovery` |
| Base verificada | MC-09, HEAD `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3` |
| PR de MC-09 | [#15](https://github.com/manuelxose/embarcarte/pull/15), abierto, borrador, `MERGEABLE`, sin fusionar |
| Autorización de contacto | `NOT_GRANTED` (registro `AUTH-MC10-001`) |
| Estado del trabajo de campo | `BLOCKED` |
| Participantes | **0** |
| Entrevistas completadas | **0** |
| Casos analíticos válidos | **0** |
| Respuestas de precio | **0** |
| Experimentos ejecutados | **0 de 10** |
| Publicación / venta / despliegue | Bloqueados y sin cambios |

El hito no puede recibir `PASS` de investigación primaria porque las condiciones de aceptación
exigen trabajo de campo real autorizado, participantes elegibles reales, consentimiento válido y
registros genuinos. Ninguna de esas condiciones existe. El resultado honesto es **BLOQUEADO**, con
la preparación entregada y sometida a revisión independiente (ver `review/MC-10-REVIEW.md`).

**Por qué se detuvo el hito.** El encargo maestro de MC-10 exige una autorización externa separada,
fechada y delimitada antes del primer contacto. Esa autorización no se emitió. El propio encargo
declara que no autoriza por sí mismo el contacto externo. En consecuencia:

```
OUTREACH_AUTHORIZATION = NOT_GRANTED
FIELDWORK_STATUS       = BLOCKED
MILESTONE_STATUS       = BLOCKED
```

No se identificó ningún candidato, no se envió ninguna invitación, no se contactó a ningún club,
puerto, asociación, instalador o minorista, y no se administró ninguna pregunta de precio.

---

## 2. Re recuento y embudo de captación

No existe embudo real. Todos los recuentos son cero porque ninguna persona fue identificada ni
contactada. Se reportan para dejar constancia de que no hay datos que puedan leerse como demanda.

| Etapa | Recuento |
| --- | ---: |
| Identificados | 0 |
| Con autorización de contacto | 0 |
| Invitados | 0 |
| Respondieron | 0 |
| Cribados | 0 |
| Elegibles | 0 |
| Consintieron | 0 |
| Entrevista completada | 0 |
| Elegibles para análisis | 0 |
| Retirados | 0 |
| Excluidos | 0 |

### 2.1 Por segmento

| ID | Segmento | Objetivo planificado | Entrevistas completadas | Casos válidos |
| --- | --- | ---: | ---: | ---: |
| SEG-01 | Propietarios de embarcaciones a motor de recreo | 5–8 | 0 | 0 |
| SEG-02 | Propietarios de veleros | 5–8 | 0 | 0 |
| SEG-03 | Propietarios con embarcación desatendida en puerto | 5–8 | 0 | 0 |
| SEG-04 | Instaladores de electrónica marina | 5–7 | 0 | 0 |
| SEG-05 | Minoristas náuticos / chándlers | 5–7 | 0 | 0 |
| SEG-06 | Operadores de puerto deportivo o varadero | 3–5 | 0 | 0 |
| SEG-07 | Empresas de chárter / escuelas de vela | 5–8 | 0 | 0 |
| SEG-08 | Gestores de flota | 4–6 | 0 | 0 |
| — | **Total** | **40–80** | **0** | **0** |

### 2.2 Distribución geográfica y por fuente

No hay distribución que reportar: 0 participantes en Galicia, 0 en Rías Baixas, 0 en el norte de
Portugal. No se utilizó ninguna fuente de captación. El norte de Portugal permanece fuera de alcance
porque los instrumentos en portugués no se produjeron sin revisión lingüística cualificada.

Ningún candidato es un cliente potencial. Ninguna invitación es evidencia de demanda. Ningún
interesado hipotético sería evidencia de producto.

---

## 3. Problemas de cliente

**Problemas descritos sin inducir:** ninguno. No hubo conversación con ningún cliente.

**Problemas que causaron gasto real:** ninguno documentado. No hay registros de compra, bandas de
gasto, monedas ni fechas.

**Problemas que resultaron poco importantes:** ninguno. No puede afirmarse que un problema importe
poco sin haberlo preguntado.

La taxonomía de problemas y objeciones está preparada y congelada en `MC10-BUYER-OBJECTIONS.md` y en
el plan de análisis. Es una herramienta de captura, no un resultado.

---

## 4. Compras existentes y competidores

No se documentó ninguna compra real de ningún participante. No se identificaron alternativas
elegidas ni rechazadas por clientes. La evidencia de precios y competidores sigue siendo únicamente
la investigación de escritorio de MC-09 (115 fuentes, 136 afirmaciones), que no es demanda medida.

Las razones por las que un cliente elige una solución actual, y las objeciones que plantea, siguen
siendo `NO MEDIDAS`.

---

## 5. Evaluación de producto (nueve familias)

Las nueve familias se clasifican `NOT_TESTED` (no probadas). La ausencia de evidencia no se
interpreta como rechazo ni como validación.

| Puesto MC-09 | Familia | Puntuación MC-09 | Conclusión MC-09 | Evidencia primaria MC-10 | Recomendación |
| ---: | --- | ---: | --- | --- | --- |
| 1 | NAV | 4,23 | Validar con clientes | Ninguna (0 participantes) | `NOT_TESTED` |
| 2 | WEATHER | 3,77 | Investigación adicional de derechos | Ninguna (0 participantes) | `NOT_TESTED` |
| 3 | WATCH | 3,38 | Validar con clientes | Ninguna (0 participantes) | `NOT_TESTED` |
| 4 | HUB | 3,37 | Investigación adicional | Ninguna (0 participantes) | `NOT_TESTED` |
| 5 | FLEET | 3,22 | Oportunidad a largo plazo | Ninguna (0 participantes) | `NOT_TESTED` |
| 6 | AIS | 2,90 | Reconsiderar estrategia | Ninguna (0 participantes) | `NOT_TESTED` |
| 7 | SENSE | 2,84 | Aplazar | Ninguna (0 participantes) | `NOT_TESTED` |
| 8 | PILOT | 2,64 | Aplazar; seguridad bloqueada | Ninguna (0 participantes) | `NOT_TESTED` |
| 9 | DISPLAY | 2,47 | Reconsiderar estrategia | Ninguna (0 participantes) | `NOT_TESTED` |

**Detalle por familia.** Para cada una de las nueve familias, el informe de evidencia
(`MC10-PRODUCT-PRIMARY-EVIDENCE.md`) documenta las quince dimensiones exigidas. En todas ellas los
campos de evidencia primaria son cero o ausentes: 0 participantes, 0 problemas observados, 0
compras, 0 alternativas nombradas, 0 comprensión, 0 percepción de precio, 0 barreras de instalación,
0 contraevidencia y calidad de evidencia `NONE`. Los interrogantes de MC-09 siguen abiertos en su
totalidad. La restricción de readiness no cambia: ningún producto está a la venta, certificado,
preciado ni validado.

Puntos específicos que deben conservarse:

- **PROTECT** mantiene su contradicción histórica: 399 EUR está por debajo de la suma de sus piezas
  (WATCH 299 EUR + dos SENSE de 99 EUR = 497 EUR antes de instalación). No se resolvió ni se aprobó.
- **PILOT** no puede recibir validación de cliente: la puerta de seguridad sigue bloqueada.
- **FLEET** no incluye hardware por defecto, no tiene SLA y no permite acceso entre inquilinos.
- **SAIL** y **COMPLETE** no admiten oferta fija llave en mano ni precio cerrado.
- **AIS** no ofrece transmisión y no está certificado; **DISPLAY** no tiene tamaño ni hardware congelados.

---

## 6. Evaluación de bundles (seis)

| Puesto MC-09 | Bundle | Puntuación MC-09 | Evidencia primaria MC-10 | Recomendación |
| ---: | --- | ---: | --- | --- |
| 1 | PROTECT | 3,37 | Ninguna (0 participantes) | `NOT_TESTED` |
| 2 | START | 3,27 | Ninguna (0 participantes) | `NOT_TESTED` |
| 3 | Paquete FLEET | 3,22 | Ninguna (0 participantes) | `NOT_TESTED` |
| 4 | CRUISE | 2,99 | Ninguna (0 participantes) | `NOT_TESTED` |
| 5 | SAIL | 2,65 | Ninguna (0 participantes) | `NOT_TESTED` |
| 6 | COMPLETE | 2,31 | Ninguna (0 participantes) | `NOT_TESTED` |

Ningún bundle se mostró a ningún participante. No hay comprensión medida de inclusiones ni
exclusiones, no hay reacción a precio y no hay objeción de instalación. Los seis siguen
`DEFINED` / `NOT_FOR_SALE` / `INTERNAL_ONLY`, sin precio aprobado y sin compromiso de distribución,
instalación o soporte.

---

## 7. Suscripciones y precio

**No hay evidencia de preferencia declarada.** Las escaleras de precio se congelaron antes de
cualquier contacto, como hipótesis preinscritas derivadas de observaciones de MC-09, nunca como
ofertas. No se administró ni un solo punto de precio.

| Concepto | Estado |
| --- | --- |
| Participantes que completaron el módulo de precio | 0 |
| Respuestas de precio registradas | 0 |
| Escaleras Gabor–Granger administradas | 0 |
| Módulos Van Westendorp administrados | 0 |
| `WTP_STATED_PREFERENCE_OBSERVED` | `false` |
| `WTP_COMMERCIALLY_VALIDATED` | `false` |
| Precios aprobados | 0 |
| `PROFITABILITY_NOT_ESTABLISHED` | vigente |

**Por qué no se aprueba ningún precio.** Aprobar un precio exige, como mínimo, preferencia
declarada real (que aquí es inexistente), coste de producción verificado (inexistente), coste de
instalación real (no verificado) y un estudio cuantitativo posterior. MC-10 no produce ni una sola
de esas piezas. Las escaleras congeladas son hipótesis para una futura validación cuantitativa.

**Qué debe seguir funcionando sin suscripción.** La regla de diseño permanece: ningún resultado de
suscripción podrá justificar la desactivación de funciones locales de seguridad o navegación. No se
ha probado con clientes; es una restricción de diseño, no un hallazgo.

---

## 8. Instaladores, distribución y canal profesional

No se entrevistó a ningún instalador, minorista, puerto, varadero, empresa de chárter o gestor de
flota. Por tanto:

- No se conoce la documentación de compatibilidad exigida: `COMPATIBILITY_TESTED = NO`, 0 filas probadas.
- No se conoce la posición de garantía/RMA, responsabilidad civil ni seguro exigida por instaladores.
- No existe compromiso de instalación, acuerdo de distribución, pedido minorista ni piloto de flota.
- No se validó ningún criterio de selección de producto, margen, formación o soporte del canal.
- La prueba de interés verbal no existe; y aunque existiera, no sería un acuerdo.

Las condiciones que un instalador competente probablemente exigiría están preparadas como requisitos
futuros en `MC10-BUYER-OBJECTIONS.md` §4 y en el informe de instaladores. **Ninguna de esas
condiciones ha sido satisfecha por MAREA**, y ninguna puede presentarse como satisfecha.

---

## 9. Recomendación estratégica

### 9.1 ¿La evidencia apoya o cuestiona el orden de prioridades de MC-09?

**Ni lo apoya ni lo cuestiona: no hay evidencia primaria.** El orden de MC-09 (NAV, WEATHER, WATCH,
HUB, FLEET, AIS, SENSE, PILOT, DISPLAY) sigue siendo una priorización de escritorio. MC-10 no aporta
ningún dato que permita reordenarlo, confirmarlo o descartarlo con autoridad de cliente.

La conclusión correcta no es "el orden se mantiene validado", sino:

> El orden de MC-09 permanece **no validado**, y MC-10 no lo modifica porque no ha podido probarlo.

### 9.2 Qué validar más adelante

- Problemas y compras reales de propietarios (EXP-MC10-01), empezando por SEG-03, SEG-01 y SEG-02.
- Comprensión de conceptos y exclusiones (EXP-MC10-06) antes de cualquier módulo de precio.
- Necesidad de vigilancia de embarcación desatendida (EXP-MC10-09) con propietarios y operadores.
- Requisitos de compatibilidad, garantía y responsabilidad de instaladores (EXP-MC10-02).

### 9.3 Qué revisar

- La secuencia software-primero sigue siendo una hipótesis de coste-riesgo, no un hallazgo de cliente.
- PROTECT necesita revisión de composición/precio antes de cualquier prueba: su cifra histórica está
  por debajo de su propio suelo de piezas.
- La comunicación de exclusiones (gráficos, instalación, AIS de recepción, conectividad no garantizada)
  debe rediseñarse antes de cualquier prueba pública; no está validada.

### 9.4 Qué aplazar

- Toda decisión de hardware (HUB, WATCH físico, SENSE, DISPLAY, AIS) hasta que exista evidencia de
  cliente que justifique el gasto de utillaje, inventario y conformidad.
- Toda comunicación pública, precio, oferta o pagina de producto.
- PILOT queda aplazado por su puerta de seguridad, con independencia de la evidencia de cliente.

### 9.5 Supuestos comerciales invalidados por MC-10

**Ninguno invalidado por evidencia primaria.** Lo que MC-10 invalida es la tentación metodológica de
convertir preparación en resultado: no se puede afirmar que exista demanda, ni rechazo, ni
disposición a pagar, ni comprensión, ni barrera de canal, porque nada de eso se midió.

### 9.6 Nuevos obstáculos identificados

1. No hay controlador de datos designado ni contacto de privacidad verificado.
2. No hay revisión jurídica de la base de licitud ni de las comunicaciones de captación.
3. No hay almacenamiento seguro (capas A/B) fuera del repositorio.
4. El entorno de agentes no dispone de herramienta de correo, telefonía ni mensajería; el código de
   correo de la aplicación (nodemailer/SMTP) es notificación de comercio y no un canal de
   investigación autorizado. Se requiere un panel humano de entrevistadores o una plataforma aprobada
   como encargada del tratamiento.
5. Los instrumentos en portugués no existen con revisión lingüística cualificada.

### 9.7 Evidencia que sigue faltando

Toda la evidencia primaria: participantes reales, problemas espontáneos, compras reales con bandas de
gasto y moneda, alternativas, comprensión de conceptos, objeciones de instaladores, actitudes de
suscripción, rangos de precio indicativos, barreras de confianza, interés de flota y condiciones de
canal.

---

## 10. Traspaso a MC-11

MC-11 (hardware, proveedores, conformidad y viabilidad) **no recibe ninguna evidencia de cliente**.
El traspaso (`MC10-MC11-HANDOFF.md`) separa:

- **Preguntas de cliente sin responder:** 10 preguntas (CQ-01…CQ-10) que solo el trabajo de campo real
  puede contestar.
- **Preguntas de hardware:** 10 preguntas abiertas (HW-01…HW-10): selección de gateway, conectividad,
  sensores, pantalla, AIS, PILOT, cualificación ambiental, seguridad de firmware, mantenibilidad.
- **Preguntas de proveedor:** 8 (SUP-01…SUP-08), sin contactos ni cotizaciones autorizadas.
- **Preguntas de conformidad y legalidad:** 10 (CON-01…CON-10), incluido CE/RED/EMC, NMEA 2000,
  responsabilidad, garantía, residuos y marca.

MC-11 no ha comenzado y requiere su propio encargo. No puede presentar ningún hardware, BOM,
proveedor, conformidad o precio como validado por clientes.

---

## 11. Verificación independiente

| Elemento | Estado |
| --- | --- |
| Entregables D1–D28 | Completos como preparación; resultados `NOT_EXECUTED` |
| Participantes reales | 0 |
| Entrevistas reales | 0 |
| Codificación cualitativa | No ejecutada (0 unidades; κ no calculado) |
| Veredictos de experimentos | 10 de 10 `NOT_EXECUTED` / `BLOCKED` |
| Validadores de integridad | Script + suite negativa; ejecutados en la rama |
| Revisión independiente | `review/MC-10-REVIEW.md` — auditor distinto de los autores |
| Bloqueos restantes | Autorización, controlador, revisión legal, almacenamiento seguro, panel humano, instrumentos PT |
| Rama y PR | `feature/marea-mc10-primary-customer-discovery`; PR borrador apilado sobre MC-09 |
| Publicación / despliegue / venta | No realizados |

La revisión independiente examina el diff real, no este resumen. Su veredicto se registra en
`review/MC-10-REVIEW.md` y en `MC-10-DELIVERY.md`. Cuando exista, prevalecerá sobre cualquier
afirmación de este informe; si detecta un defecto, se corregirá y se volverá a verificar.

**Limitaciones metodológicas declaradas.** La muestra prevista es intencional y no probabilística:
no permite inferencia poblacional, intervalos de confianza, tasas de conversión, cuotas de mercado ni
previsiones de ingresos. Toda proporción futura deberá expresarse como "x de y en esta muestra".
MC-10 no produce ninguna proporción porque no tiene muestra.

**Restricciones comerciales sin cambios.** `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`;
`SOURCE_IP_CLEARANCE = NOT_CLEARED`; `PRODUCT_SALES = BLOCKED`; `COMMERCIAL_PUBLICATION = BLOCKED`;
`PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED`; `PROFITABILITY_NOT_ESTABLISHED`; `PILOT_SAFETY_GATE =
BLOCKED`; `COMPATIBILITY_TESTED = NO`; `APPROVED_PRICES = NONE`; `ORDERABLE_PRODUCTS = ZERO`.

---

## 12. Conclusión

MC-10 no responde todavía a la pregunta central del encargo —**qué productos de EMBARCARTE resuelven
problemas suficientemente importantes para compradores reales como para justificar la siguiente fase
de inversión comercial**— porque no se autorizó el contacto con clientes.

Lo que MC-10 sí entrega es la organización de investigación completa y auditable: autorización
registrada como no concedida, ética y protección de datos diseñadas, protocolo e instrumentos
congelados, plan de captación y plantillas, contratos de datos, escaleras de precio preinscritas,
validador de integridad con pruebas negativas, clasificación honesta de los diez experimentos, de las
nueve familias y de los seis bundles, registro de decisiones y traspaso a MC-11.

El siguiente paso no es interpretar estos documentos como hallazgos. Es desbloquear el trabajo de
campo mediante la secuencia registrada en `MC10-FIELDWORK-AUTHORIZATION.md` §5 y, solo entonces,
volver a ejecutar MC-10 con participantes reales y consentimiento válido.
