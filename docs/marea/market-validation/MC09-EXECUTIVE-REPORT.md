# MC-09 — Informe ejecutivo de inteligencia de mercado y competencia

**Programa:** EMBARCARTE / MAREA
**Hito:** MC-09 de 36 — Inteligencia de mercado, benchmarking competitivo y preparación del descubrimiento de clientes
**Fecha de investigación:** 31 de octubre de 2026 (investigación documental de una sola sesión)
**Alcance:** investigación documental interna. No incluye entrevistas, sondeos, compras, publicidad ni ventas.
**Clasificación:** documento interno. MAREA es una marca **propuesta**; su uso público no está autorizado.

---

## 1. Veredicto ejecutivo

El hito MC-09 entrega un paquete de decisión comercial defendible para elegir
dónde invertir los siguientes recursos de desarrollo y validación. La
investigación es real y trazable: **115 fuentes** y **136 afirmaciones**
registradas con URL, fecha de consulta y limitaciones declaradas, más un validador
determinista y una auditoría independiente.

Resultado del hito: **PASS — INTERNAL DESK-RESEARCH AND MARKET-INTELLIGENCE
SCOPE**, condicionado al veredicto de la revisión independiente registrada en
`review/MC-09-REVIEW.md`. Un PASS documental no demuestra que exista demanda ni
que el producto sea vendible.

- Rama: `feature/marea-mc09-market-competitive-intelligence`.
- Base verificada: MC-08 HEAD `65417bfa681d31cc655e2bc91cfcedcccc368675`, PR #14 abierto y sin fusionar.
- Pull request: borrador apilado sobre `feature/marea-mc08-bundles-commercial-architecture` (URL y SHA finales en `MC-09-DELIVERY.md`).
- Cobertura: las nueve familias y los seis bundles canónicos, con comparación competitiva o laguna de evidencia explícita en cada caso.

Limitaciones de la evidencia:

- No se realizaron entrevistas ni encuestas: la demanda y la disposición a pagar
  siguen **sin validar empíricamente**.
- No hay BOM, cotizaciones de proveedor, licencias de datos ni márgenes de canal:
  la rentabilidad **no está establecida**.
- Parte del mercado (Portugal, flota registrada española) solo es observable con
  datos parciales o contradictorios.
- Los precios de competidores cambian; todos llevan fecha y tratamiento fiscal.

Bloqueos que permanecen intactos: `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`,
`SOURCE_IP_CLEARANCE = NOT_CLEARED`, `COMMERCIAL_PUBLICATION = BLOCKED`,
`PRODUCT_SALES = BLOCKED`, `PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED`.

## 2. Hallazgos de mercado

1. **El mercado nuevo es pequeño y decreciente.** España registró **4.992**
   embarcaciones de recreo nuevas en 2025 (−0,9 % frente a 2024) y **5.027** en
   2024 (−15,9 % frente a 2023). El 70 % son esloras de hasta 6 m; solo **1.500
   unidades de 6 m o más** en 2025. Esa cifra —no las 5.000— es el ritmo de
   creación de equipo direccionable.
2. **Galicia aporta 465 matriculaciones costeras (9,3 % de España)** y dispone de
   73 puertos deportivos con unas 10.500 plazas. La comarca de Rías Baixas
   concentra más de 4.600 plazas en una veintena de clubes, y Pontevedra creció
   un **+41,4 %** en 2025 mientras A Coruña caía un 9,5 %.
3. **Portugal tiene la mayor población registrada y la peor evidencia.** El
   registro oficial ronda 85.000 embarcaciones, pero una fuente sectorial cita
   73.765 sin reconciliación. La capacidad documentada en el norte es de solo
   1.088 plazas. Es un mercado de fase 2, no de arranque.
4. **El mercado relevante es la flota existente, no la nueva.** El problema de
   fragmentación electrónica vive en barcos de marca mixta y años variables, que
   es exactamente donde las soluciones actuales exigen sustituir equipos.
5. **El gasto por embarcación no está publicado.** El dimensionamiento de Rías
   Baixas se construye con bandas de gasto etiquetadas como supuesto: TAM España
   + Portugal de 5,7-29,7 M€/año; SAM Galicia + Norte de Portugal de 0,30-1,57
   M€/año; Rías Baixas de **0,12-0,62 M€/año**. No es un pronóstico: es un modelo
   parcial con variables desconocidas declaradas.
6. **La conclusión incómoda:** el mercado de cabecera es demasiado pequeño para
   financiar el programa por sí solo. Sirve para validar barato; el crecimiento
   exige FLEET (multibarcos) o geografía adicional.

## 3. Inteligencia competitiva

Compañías verificadas como competidoras o sustitutas directas, con precio
observado (moneda, IVA y fecha en el registro de precios):

| Categoría MAREA | Referencia observada | Precio observado |
|---|---|---|
| NAV / WEATHER | Orca Plus / Smart Navigation | 49 € / 149 € al año |
| NAV | Navionics Boating (app) | 49,99-149,99 € por compra in-app |
| HUB | Digital Yacht NavLink2 / iKonvert | 300 € / 240 € |
| HUB | Victron Cerbo GX MK2 | 240,09 € IVA incl. |
| HUB | PredictWind DataHub / Pro | 299 / 599 USD + impuestos |
| AIS | Digital Yacht AIS100 (solo recepción) | 360 € |
| AIS | Packs transpondedores (producto distinto) | 1.620-2.100 € |
| PILOT | Raymarine EV-100 Wheel | 2.050 € IVA incl. |
| PILOT | Simrad NAC-3 / NAC-2 packs | 2.100,56-3.083,08 € IVA incl. |
| SENSE | Victron SmartShunt 500A | 90,21 € IVA incl. |
| SENSE | B&G WS310 / pack Triton2 | 489,95 € / 1.149,40 € |
| WATCH | Siren 3 + plan anual | 299,99 USD + 225 USD/año |
| WATCH | Yacht Sentinel YS Pro | 1.590 € + IVA |
| DISPLAY | Raymarine Element 7/9/12 HV | 659,45 / 901,45 / 1.506,45 € IVA incl. |
| DISPLAY | Orca Display 2 / sistema completo | 999 € / 1.997 € IVA incl. |
| WEATHER | PredictWind Basic/Standard/Pro | 29 / 249 / 499 USD al año |
| WEATHER | Windy Premium | 19 € |
| FLEET | Full Ahead (hasta 5 buques) | 1.490 €/año (~24,83 €/buque/mes) |
| FLEET | UOC / Seafarers.pro | 259 €/buque/mes; 150-360 €/buque/mes |

Hallazgos estructurales:

- **Ninguno de los competidores observados en esta muestra** (48 observaciones
  sobre 27 fuentes) vende una solución completa instalada y puesta en servicio
  equivalente a los bundles de MAREA. Todos los totales comparables son
  composiciones de partes; la instalación se factura aparte. La muestra no
  permite afirmar nada sobre el resto del mercado.
- **La mano de obra sí es observable en España:** Marina Coruña publica 59/76/47/65
  €/h por tarea y una línea específica de electrónica a **61 €/h** (IVA excluido);
  Getxo publica 32,02 €/h. Los márgenes de distribuidor español o portugués, en
  cambio, **no son públicos**: se registran como desconocidos, no se estiman.
- **Las suscripciones de navegación y meteorología son baratas y están
  consolidadas** (19-149 €/año). El techo de precio lo fija el mercado, no MAREA.
- **El hardware está anclado por productos maduros y certificados** en todos los
  rangos: gateway 240-300 €, receptor AIS 360 €, pantalla 659 €, piloto 2.050 €.
- **Riesgo de entrada:** sin un resultado de integración demostrable, MAREA no
  puede cobrar más que la suma de partes ya disponibles.

## 4. Prioridades de producto (nueve familias)

Puntuación comercial sobre 5, con pesos congelados antes de puntuar y separada de
la disponibilidad legal/técnica. Todas las familias siguen `NOT_FOR_SALE`.

| Puesto | Familia | Nota | Decisión |
|---:|---|---:|---|
| 1 | NAV | 4,23 | Validar con clientes |
| 2 | WEATHER | 3,77 | Investigación adicional (derechos de datos) |
| 3 | WATCH | 3,38 | Validar con clientes |
| 4 | HUB | 3,37 | Investigación adicional |
| 5 | FLEET | 3,22 | Oportunidad a largo plazo |
| 6 | AIS | 2,90 | Replantear estrategia de producto |
| 7 | SENSE | 2,84 | Aplazar |
| 8 | PILOT | 2,64 | Aplazar (puerta de seguridad bloqueada) |
| 9 | DISPLAY | 2,47 | Replantear estrategia de producto |

Explicación: NAV y WATCH atacan los problemas mejor documentados y pueden empezar
a validarse sin fabricar hardware. WEATHER tiene gran demanda pero depende de
derechos de proveedor no concedidos. AIS, SENSE y DISPLAY son commodities con
anclas de precio muy claras. PILOT es crítico para la seguridad y está bloqueado.
**La nota comercial no autoriza ningún lanzamiento.**

## 5. Prioridades de bundle

| Puesto | Bundle | Nota | Decisión |
|---:|---|---:|---|
| 1 | PROTECT | 3,37 | Validar con clientes |
| 2 | START | 3,27 | Validar con clientes |
| 3 | FLEET package | 3,22 | Oportunidad a largo plazo |
| 4 | CRUISE | 2,99 | Investigación adicional |
| 5 | SAIL | 2,65 | Aplazar (puerta PILOT) |
| 6 | COMPLETE | 2,31 | Replantear estrategia |

Razonamiento comercial, separado de la disponibilidad:

- **PROTECT** es el bundle con lógica de ingresos recurrentes más clara
  (barco desatendido), pero su precio histórico de 399 € no cubre su propia
  composición: WATCH 299 € más dos módulos SENSE de 99 € suman 497 € antes de
  instalar.
- **START** es la solución completa más sencilla; su referencia de 499 € queda por
  debajo de una composición observada de 649 € en el primer año (Orca Core 2, que
  incluye un año de Smart Navigation; 698 € desde el segundo año) y no incluye
  instalación.
- **FLEET package** es el único modelo realmente escalable, pero no hay plataforma
  implementada, ni SLA, ni precio.
- **CRUISE** compite con composiciones ya comprables (1.319-1.997 €).
- **SAIL** y **COMPLETE** dependen de las familias menos maduras; COMPLETE acumula
  22 bloqueos de MC-08 y no admite precio fijo.

## 6. Conclusiones de precios

Ningún precio queda aprobado. Las cifras históricas son hipótesis
(`HYPOTHESIS_UNAPPROVED`) y no costes de producción.

| Sujeto | Hipótesis histórica | Referencia observada | Costes excluidos | Confianza |
|---|---|---|---|---|
| NAV | 99 / 149 €/año | Orca 49/149 €/año; Navionics 50-150 €/año | derechos de cartas | MEDIA |
| WEATHER | 49 / 89 €/año | PredictWind 29-499 USD/año; Windy 19 € | derechos de proveedor | MEDIA |
| HUB | 349 / 499 € | gateways 240-300 € | BOM, CE/EMC, instalación | BAJA |
| AIS | 249 / 399 € | receptor 360 € | BOM, licencia del decodificador, instalación | BAJA |
| PILOT | desde 1.290 € | packs 2.050-3.083 € IVA incl. | BOM, certificación, instalación, seguro/garantía | BAJA |
| SENSE | desde 99 €/módulo | SmartShunt 90 €; veleta 490 € | BOM, calibración, instalación | BAJA |
| WATCH | 299 € + desde 9,90 €/mes | Siren 300 USD + 225 USD/año; YS Pro 1.590 € + IVA | conectividad, nube, soporte, garantía | BAJA |
| DISPLAY | desde 699 € | 659-1.506 € IVA incl. | BOM, certificación, instalación | BAJA |
| FLEET | desde 49 / 79 €/buque/mes | 24,83-360 €/buque/mes | onboarding, soporte, infraestructura | BAJA |
| START | 499 € | composición 649 € el primer año; 698 € desde el segundo | instalación, BOM, margen | BAJA |
| CRUISE | 1.399 € | composición 1.319-1.997 € | instalación, accesorios | BAJA |
| SAIL | 1.990 € (solo trazabilidad) | composición 3.499 € | instalación, BOM, PILOT | BAJA |
| PROTECT | 399 € + suscripción | hardware UE 1.830 € + IVA; Siren 300 USD + 225 USD/año | instalación, conectividad | BAJA |
| COMPLETE | 3.490 € (solo trazabilidad) | composición 3.799 € | todo el sistema, instalación | BAJA |
| FLEET package | sin precio establecido | 1.490-4.900 €/año | onboarding, SLA, hardware | BAJA |

Qué falta para poder proponer un precio: resultados de disposición a pagar de
MC-10, cotizaciones reales de proveedor, tarifa de instalación española
verificada, términos de canal por escrito y costes de conectividad y garantía.
`PROFITABILITY_NOT_ESTABLISHED` aplica a todas las familias y bundles.

## 7. Estrategia geográfica

**Fase 1 — Rías Baixas (Pontevedra).** Mayor base de amarres locales (>4.600) con
el único impulso de matriculaciones claramente positivo; proximidad para
reclutar, instalar y dar soporte. Limitación: la evidencia de gasto por
embarcación es un supuesto.

**Fase 2 — A Coruña y Norte de Portugal.** Portugal tiene la mayor población
registrada pero evidencia débil y no reconciliada; el norte solo documenta 1.088
plazas.

**Diferidos — Baleares y Cataluña.** Mercados grandes pero lejanos y con
estructura de canal diferente; no son el mejor territorio de investigación ahora.

## 8. Modelo de negocio

| Modelo | Valoración | Motivo |
|---|---|---|
| Venta única de hardware | Aplazada como entrada | BOM, conformidad y soporte sin resolver; precios anclados por incumbentes |
| Suscripción anual de software | **A validar primero** | Distribución directa, sin fabricación; techo de precio 19-149 €/año |
| Servicio mensual de monitorización | **A validar primero** | Problema específico y ya monetizado por competidores; requiere hardware y conectividad |
| Instalación profesional | Dependencia estructural | Mano de obra observable (61 €/h electrónica en A Coruña); sin tarifa MAREA verificada |
| Software B2B recurrente (FLEET) | Oportunidad a largo plazo | Mayor ingreso recurrente, pero plataforma no implementada, sin SLA |
| Canal de partners/distribución | Desconocido | No hay márgenes públicos; debe descubrirse con entrevistas |

Los dos modelos que merecen validación inmediata son la suscripción de software y
el servicio de monitorización. El hardware no debe financiarse antes de probar
demanda y valor de integración.

## 9. Riesgos comerciales principales

1. **Rechazo de la suscripción** en un mercado acostumbrado a comprar hardware
   una vez (disposición a pagar no medida).
2. **Derechos de datos inasequibles** para cartas y meteorología; sin ellos NAV y
   WEATHER no son vendibles.
3. **BOM y conformidad por encima del ancla de precio** observada.
4. **Canal instalador cerrado** o con márgenes inviables; no hay términos
   públicos.
5. **El valor de integración no supera la suma de partes** ya disponibles.
6. **Mercado de cabecera demasiado pequeño** para sostener la organización.
7. **Riesgo de seguridad de PILOT**, que ninguna puntuación comercial compensa.
8. **Riesgo de reputación y legal** si se publican afirmaciones no verificadas.

## 10. Handoff a MC-10

**Segmentos prioritarios:** S3 (propietario que deja el barco desatendido), S1
(propietario costero que moderniza), S5 (instalador de electrónica marina), S6
(operador de marina/mantenimiento). Después S2 y S4. S7 y S8 solo cuando exista
plataforma y SLA.

**Cohortes propuestas:** 5-10 entrevistas por cohorte estrechamente definida
(objetivo global 40-80), sin inferencia estadística.

**Hipótesis a probar:**
- H1: el propietario paga una cuota recurrente por monitorización si la alerta es
  fiable.
- H2: la fragmentación de equipos es un problema urgente y con coste real.
- H3: el instalador acepta una marca nueva si la compatibilidad y la garantía
  están resueltas.
- H4: existe disposición a pagar por NAV por encima del ancla de 149 €/año.
- H5: el operador multibarco pagaría por visibilidad y administración.

**Preguntas de precio más importantes:** gasto actual real por categoría
(cartas, meteorología, monitorización, mantenimiento); umbral de "demasiado
barato / ganga / caro / prohibitivo" (Van Westendorp); escalera Gabor-Granger
sobre NAV, WATCH y PROTECT; aceptación de cuota mensual frente a pago único.

**Umbrales de decisión:** preinscripción solo con evidencia; un precio solo se
propone con WTP medido, cotización real y tarifa de instalación; una cohorte de
5-10 entrevistas no valida prevalencia.

**Supuestos sin resolver:** derechos de datos, BOM, margen de canal, CAC,
conectividad, garantía, y si el cliente quiere un proveedor único.

**Siguientes actividades autorizadas:** ejecutar MC-10 con reclutamiento real y
consentimiento; obtener cotizaciones de proveedor (MC-11); resolver derechos de
datos (MC-02/MC-12). No se autoriza publicar, vender, contactar clientes ni
desplegar.

## 11. Evidencia y QA (control de calidad)

- **Entregables:** 26 entregables (D1-D26): 25 documentos Markdown (24 de
  contenido y el contrato de datos), 23 ficheros de datos JSON y 2 scripts de
  validación; índice completo en `MC-09-DELIVERY.md`.
- **Fuentes:** 115 registradas (20 mercado, 27 competencia, 20 compradores, 5
  economía, 38 canales, 5 metodología MC-10), con clase de evidencia, fecha de
  consulta y limitaciones. **136 afirmaciones** trazables.
- **Lagunas de evidencia:** flota registrada española sin tabla verificable;
  ninguna encuesta independiente de compradores; sin BOM ni cotizaciones; sin
  márgenes de canal públicos; sin tarifa española de instalación específica;
  derechos de datos pendientes.
- **Validador:** `npm run test:market` (40 comprobaciones) y
  `npm run test:market:unit` (pruebas de mutación negativa). Resultados exactos en
  `MC-09-DELIVERY.md`.
- **Regresión:** build, i18n, commerce, SEO, backup, brand, products, bundles,
  e2e, formato y auditoría de dependencias; resultados exactos en
  `MC-09-DELIVERY.md`.
- **Revisión independiente:** `review/MC-09-REVIEW.md` — **PASS (ámbito de
  investigación documental)**, ronda 2, con los 8 hallazgos cerrados (1 mayor, 3
  menores, 4 informativos) y verificación propia de las correcciones.
- **Commit y PR:** implementación `566343e`, correcciones de auditoría `d85733e`;
  PR borrador [#15](https://github.com/manuelxose/embarcarte/pull/15) apilado
  sobre la rama de MC-08; sin fusión.
- **Confirmación:** no se fusionó ninguna rama, no se desplegó, no se publicó
  contenido comercial, no se activó checkout y no se contactó a ningún cliente.

**El PASS de MC-09 es un PASS de investigación documental, no una prueba de que
los clientes vayan a comprar MAREA.**
