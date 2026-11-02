# MC-13 — Informe ejecutivo financiero (ES)

| Campo | Valor |
|---|---|
| Hito | MC-13/36 — Modelo financiero a 60 meses, flujo de caja, necesidades de inversión, economía de escenarios y punto de equilibrio condicional |
| Fecha | 2026-11-02 |
| Rama | `feature/marea-mc13-financial-model-cashflow-break-even` |
| Base verificada | MC-12 `e59a8b9b3916d979d8eaeff78acd3795fd26c125` |
| Estado | `PARTIAL` — alcance financiero interno `PASS_INTERNAL_FINANCIAL_SCOPE` verificado de forma independiente; evidencia comercial externa `BLOCKED_OR_NOT_OBTAINED` |
| Disponibilidad comercial | `NOT_FOR_SALE` |
| Precio aprobado | `NONE` |
| MC-14 iniciado | `false` |

## A. Veredicto MC-13

El modelo financiero interno está implementado, es determinista, reproducible y
auditable: un único modelo de 60 periodos mensuales (`M01`…`M60`) con vistas de 12,
36 y 60 meses, tres escenarios hipotéticos posteriores a una eventual autorización,
el caso restringido actual, flujo de caja mensual, capital circulante, calendario de
inversión, punto de equilibrio condicional y 24 pruebas de tensión.

La primera auditoría independiente recompuso el modelo completo sin usar el código del
autor (61 series × 60 periodos, 0 discrepancias), verificó las identidades de caja,
IVA, inventario, capital circulante y deuda diferida, confirmó 90/90 escenarios MC-11 y
la invariancia del utillaje/NRE, y comprobó 208 cifras documentales. Retuvo la firma sobre el primer commit congelado por 2 hallazgos BLOCKING y 3 MAJOR:
falta del registro de entrega D21, un PASS de revisión prematuro en este informe, los
reembolsos no pagados en caja, la base de facturación al distribuidor y el acoplamiento
de la suite adversaria al estado de revisión. Las correcciones se aplicaron y la
auditoría fue repetida sobre el commit corregido `573d65a`; el auditor concedió
**PASS_INTERNAL_FINANCIAL_SCOPE**, con 13 de 16 hallazgos cerrados y 3 no bloqueantes
abiertos (2 MINOR, 1 INFORMATIONAL). La firma cubre únicamente el alcance financiero
interno.

El veredicto de fondo sigue siendo **PARTIAL** porque falta evidencia comercial y de
aprovisionamiento externa: 0 cotizaciones formales, 0 contratos, 0 derechos de licencia
concedidos, 0 evidencia de clientes, seguro de responsabilidad civil desconocido y
posición de caja real de EMBARCARTE desconocida. El modelo es internamente coherente,
pero no comercialmente validado. Un resultado hipotético favorable no convierte el
negocio en rentable ni autoriza su venta.

## B. Modelo financiero

- **Un solo modelo integrado**, formato columnar, 60 periodos por escenario.
- **Escenarios:** `RESTRICTED_CURRENT` (realidad comercial actual), `DOWNSIDE`,
  `BASE_HYPOTHETICAL`, `UPSIDE_HYPOTHETICAL`.
- **Dimensiones:** mes, escenario, familia, edición/SKU, bundle, tipo de ingreso,
  categoría de coste, canal, cohorte, tramo de volumen, clase de evidencia y estado
  de elegibilidad/licencia.
- **Cobertura:** nueve familias (NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY,
  WEATHER, FLEET) y seis bundles (START, CRUISE, SAIL, PROTECT, COMPLETE, FLEET).
- **Vistas 12/36/60:** todas agregadas del mismo modelo mensual; el validador
  recalcula las tres.
- **Regla contable clave:** el utillaje/NRE (`COST-16`) es capex y amortización no
  monetaria; nunca coste variable por unidad y nunca se cuenta dos veces. La merma de
  inventario es un coste no monetario que se reconoce en la contribución condicional y
  se revierte en el capital circulante. Los reembolsos y devoluciones se pagan en caja
  en el mes de la venta. La facturación al distribuidor usa el precio de trade ajustado
  por margen, con el IVA ya incluido en la hipótesis de precio de consumo.
- **Desconocidos:** coste de licencia de cartas/meteo, seguro de responsabilidad
  civil, mantenimiento CRA, onboarding/DPA/SLA de FLEET y términos de proveedor y
  cliente permanecen `UNKNOWN`; el resultado condicional los excluye y los nombra.

## C. Resultados por escenario

Cifras acumuladas a 60 meses (EUR, condicionales; no son previsiones validadas ni
precios):

| Escenario | Ingreso neto 60m | Contribución | EBITDA-like | Caja acumulada M60 | Necesidad de financiación |
|---|---:|---:|---:|---:|---:|
| `RESTRICTED_CURRENT` | 0,00 | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |
| `DOWNSIDE` | 367.050,26 | 150.666,06 | −2.630.259,30 | −3.081.802,04 | 3.081.802,04 |
| `BASE_HYPOTHETICAL` | 3.426.647,12 | 1.688.226,86 | −618.061,78 | −464.878,15 | 995.185,23 |
| `UPSIDE_HYPOTHETICAL` | 10.148.301,82 | 5.475.105,86 | 3.963.913,46 | +5.311.017,86 | 621.240,91 |

Lectura honesta:

- **Caso restringido actual:** no hay venta autorizada; el ingreso autorizado es cero
  y la caja, los gastos y la financiación reales son `UNKNOWN`. No se inventa una
  previsión para el negocio actual.
- **DOWNSIDE:** la caja no se recupera en 60 meses y la necesidad de financiación
  condicional ronda 3,08 M€; es el escenario que supera la envolvente ilustrativa de
  2,00 M€.
- **BASE hipotético:** alcanza break-even operativo en M39 y de caja en M23, pero no
  recupera la caja inicial dentro del horizonte; la financiación condicional ronda
  1,00 M€.
- **UPSIDE hipotético:** recupera caja en M23 y acumula +5,31 M€ al final del
  horizonte, con un máximo de financiación condicional de 0,62 M€.

El reparto de ingreso a 60 meses en BASE es aproximadamente 49 % hardware y 51 %
recurrente; en UPSIDE la exposición recurrente supera el 57 %. Estas cifras son
hipótesis de escenario, no demanda observada.

## D. Inversión inicial

El calendario de inversión contiene 11 líneas que cubren las 13 categorías exigidas;
«manufacturing setup» y «product-safety verification» no tienen línea propia y
permanecen `UNKNOWN` (la necesidad real es mayor). Capex conocido: **402.500,00 €**
de envolvente analítica; rango de sensibilidad 241.500–644.000 €. El importe de
utillaje/NRE heredado de MC-11 (HUB 12.000 + WATCH 8.000 + SENSE 3.500 + DISPLAY
9.000 + AIS 5.000 = 37.500 €) es una sensibilidad de ingeniería, **no una cotización
ni un presupuesto aprobado**.

Elementos aún desconocidos o sólo en envolvente: certificación EMC/RED/ambiental/CRA
(sin laboratorio contratado), ingeniería hardware/firmware/mecánica, integración
cloud/IoT, legal/marca/IP, primeras muestras, infraestructura de seguridad,
desarrollo de software, inventario inicial, capital circulante, seguro y reserva de
contingencia. **No existe aprobación de inversión, oferta de financiación ni
compromiso de capital.**

## E. Flujo de caja

- Identidad verificada: `caja inicial (0 por convención analítica) + Σ flujo neto =
  caja acumulada`.
- `flujo operativo = EBITDA-like condicional − movimiento de capital circulante`.
- `flujo de inversión = −capex en efectivo`; la amortización no es caja.
- Cobros a cliente directo en el mes; distribuidor a 60 días sobre el precio de trade
  (cuentas a cobrar conciliadas y positivas); IVA repercutido con un mes de retraso y
  IVA soportado recuperable sobre compras de inventario, con crédito arrastrado.
- Reembolsos por devolución/desistimiento pagados en caja en el mes de la venta.
- Compras de inventario: depósito del 30 % al pedido, saldo un mes después de la
  recepción; plan de producción con objetivo de existencias de seguridad de un mes,
  MOQ 25, lead time 2 meses, merma y obsolescencia modeladas. Las compras de
  inventario no se cuentan dos veces como gasto operativo.
- Exposición de caja máxima condicional: DOWNSIDE 3,08 M€; BASE 1,00 M€; UPSIDE 0,62
  M€. El caso restringido no permite calcular caja real.

## F. Punto de equilibrio

Se distinguen cinco conceptos que no son intercambiables:
`UNIT_CONTRIBUTION_ZERO`, `OPERATING_BREAK_EVEN`, `CASH_FLOW_BREAK_EVEN`,
`CUMULATIVE_CASH_RECOVERY` y `FINANCING_REQUIREMENT`.

| Escenario | Break-even operativo | Break-even de caja | Recuperación de caja | Financiación |
|---|---|---|---|---|
| `RESTRICTED_CURRENT` | no aplicable | no aplicable | no aplicable | UNKNOWN |
| `DOWNSIDE` | no se alcanza | no se alcanza | no se alcanza | 3.081.802,04 € |
| `BASE_HYPOTHETICAL` | M39 | M23 | no se alcanza | 995.185,23 € |
| `UPSIDE_HYPOTHETICAL` | M15 | M11 | M23 | 621.240,91 € |

Umbrales condicionales adicionales: 36 contribuciones unitarias a cero, 18 precios
mínimos brutos, cobertura de costes fijos con una cartera mixta de unidades y 4
necesidades de financiación; 70 umbrales en total.

**Estado:** todos los umbrales son `CONDITIONAL_HYPOTHETICAL_THRESHOLD` o
`NOT_DETERMINABLE`; **0 verificados**. NAV y WEATHER no permiten un punto de
equilibrio determinable mientras el coste de la licencia de datos sea desconocido;
PILOT no es determinable por su bloqueo de seguridad; el número de suscriptores
necesario no es determinable con la mezcla y retención no validadas. Un margen de
contribución positivo no demuestra que la empresa cubra sus costes fijos.

## G. Productos prioritarios

Cada ranking evalúa una dimensión distinta y **no se fusionan en una nota única de
«readiness»**:

- **Mejor economía unitaria condicional conocida:** WEATHER > NAV > WATCH > DISPLAY >
  HUB > FLEET > SENSE > AIS. WEATHER y NAV sólo aparecen arriba porque el coste de
  licencia desconocido está excluido; ambos están `LICENSING_BLOCKED` y el ranking
  **no es accionable**.
- **Menor capital inicial hipotético:** PILOT > AIS > SENSE > WEATHER > WATCH >
  FLEET > DISPLAY > HUB > NAV (asignación analítica, no presupuesto).
- **Menor dependencia de licencias/regulación:** HUB > SENSE > FLEET > AIS > PILOT >
  WATCH > DISPLAY > NAV > WEATHER.
- **Mayor potencial de ingreso recurrente:** NAV > FLEET > WEATHER > WATCH > HUB >
  AIS > PILOT > SENSE > DISPLAY.
- **Menor exposición a downside:** HUB > FLEET > DISPLAY > NAV > WATCH > AIS > SENSE >
  WEATHER > PILOT.
- **Mayor prioridad de obtención de evidencia (menor evidencia primero):** PILOT >
  NAV > AIS > WATCH > WEATHER > FLEET > HUB > SENSE > DISPLAY.

Conclusiones MC-12 conservadas sin cambios: NAV y WEATHER bloqueados por licencias;
FLEET interesante pero incompleto; DISPLAY el mejor caso hardware condicional; WATCH
estructura hardware+servicio con contratos recurrentes no verificados; HUB marginal;
SENSE por debajo del coste modelado; AIS negativo; PILOT bloqueado por seguridad;
PROTECT negativo en su hipótesis histórica.

## H. Riesgos y sensibilidad

24 casos de tensión deterministas (coste hardware +20 %/+40 %, margen de
distribuidor 45 %, inflación de materiales, FX +10 %, yield 92 %, devoluciones 6 %,
churn +50 %, activación −30 %, cobros +60 días, cloud 2×, overage celular, licencia
de datos a 30 €/cuenta-año, retraso de certificación 6/12 meses, ausencia total de
licencia, ausencia de clientes, cibermantenimiento 60 k€/año, sobrestock y merma,
financiación −50 %, precios −15 %, sobrecoste de instalador y dos casos compuestos).

Resultados clave:

- **24/24** casos no recuperan la caja dentro del horizonte; **23/24** mantienen
  contribución unitaria y contribución agregada positivas pese al colapso de caja
  (ST-24 es el caso demostrativo: contribución agregada positiva y empresa sin
  recuperación). ST-17 (sin clientes) no tiene contribución agregada positiva.
- ST-07 (devoluciones 6 %) es ahora correctamente adverso: necesidad 1.012.627,43 € y
  caja −516.651,57 €, frente a 995.185,23 € y −464.878,15 € del BASE.
- Solo **2/24** superan la envolvente ilustrativa de 2 M€: ST-17 (sin clientes) con
  708.788,64 € de déficit y ST-24 con 32.603,84 €. El rango de financiación de las
  tensiones va de 0,62 M€ a 2,71 M€.
- Sin licencia de cartas/meteo, NAV y WEATHER no generan ingreso modelable y la caja
  nunca se recupera; sin clientes, la necesidad es 2,71 M€ y no hay break-even.
- La viabilidad económica es frágil: depende de licencias, certificación, precio,
  retención y capital. No se asignan probabilidades sin evidencia.

## I. Pruebas y auditoría

- Modelo determinista: `node scripts/build-marea-financial-model.mjs` reproduce los
  archivos derivados byte a byte; el validador lo comprueba.
- Validador: `npm run test:financial` — **77 comprobaciones** de estructura,
  gobernanza, aritmética, recurrencia y entrega.
- Suite adversaria: `npm run test:financial:unit` — **29 pruebas** (27 mutaciones
  obligatorias, control positivo y control de regresión); 29/29 reproducibles con la
  revisión sintética final, independiente del estado vivo del registro de auditoría.
- Regresión heredada: `test:economics`, `test:hardware`, `test:products`,
  `test:bundles`, `test:brand`, `test:market`, `test:customer-research`,
  `test:customer-recovery`, `test:i18n`, `test:commerce`, `test:seo`, `test:backup`,
  `format:check`, `build`, `test:e2e`, `npm audit` y `git diff --check`: todos PASS.
- Revisión independiente: el auditor (agente distinto del autor) revisó primero el
  commit congelado `7dfb56d` (veredicto `PARTIAL`, 16 hallazgos) y, tras las
  correcciones, re-verificó el commit `573d65a` y concedió
  `PASS_INTERNAL_FINANCIAL_SCOPE`: 13 hallazgos cerrados, 0 BLOCKING/MAJOR abiertos y
  3 no bloqueantes abiertos (F-05 MINOR, F-11 MINOR, F-14 INFORMATIONAL). El registro
  completo está en `review/MC-13-REVIEW.md` y `data/review-findings.json`.
- La primera auditoría también recomputó de forma independiente el modelo completo
  (61 series × 60 periodos, 0 discrepancias), 24/24 casos de tensión, 70 umbrales,
  90/90 escenarios MC-11 y 208 cifras documentales.

## J. Git y PR

- Rama: `feature/marea-mc13-financial-model-cashflow-break-even`, creada desde el
  HEAD verificado de MC-12, nunca desde `main`.
- Base: `e59a8b9b3916d979d8eaeff78acd3795fd26c125`.
- PR en borrador [#20](https://github.com/manuelxose/embarcarte/pull/20), apilado
  sobre la rama MC-12; sin merge ni despliegue. El commit final y el registro de
  entrega se publican en `MC-13-DELIVERY.md`.

## K. Bloqueos pendientes

1. Licencia de redistribución de cartas y licencia de datos meteorológicos.
2. Licencia NMEA 0183 y certificación NMEA 2000.
3. Cotizaciones formales de proveedor con MOQ, lead time, Incoterms y pago.
4. Cotizaciones de certificación EMC/RED/ambiental/CRA.
5. Cotización de seguro de responsabilidad civil.
6. Contrato cloud con DPA y región UE; contrato de conectividad celular.
7. Entrevistas de clientes y respuestas de precio bajo `AUTH-MC10-001`.
8. Cuentas y posición de caja reales de EMBARCARTE y autorización de financiación.
9. Tratamiento fiscal/VAT/OSS confirmado por asesor profesional.
10. Alcance y coste del soporte CRA y del onboarding/DPA/SLA de FLEET.

## L. Siguiente hito

MC-14 (registro de riesgos legales/comerciales y política de afirmaciones) puede
consumir el paquete de handoff `data/mc14-handoff-inputs.json`, pero **no se inicia**:
`mc14Started = false`. MC-14 deberá tratar como desconocidos el coste de
cumplimiento, el seguro, la responsabilidad de producto, la garantía y devoluciones,
el mantenimiento de ciberseguridad/CRA, la privacidad, las obligaciones de pago, las
restricciones de afirmaciones comerciales, las licencias no resueltas y las
consecuencias financieras de lanzamientos bloqueados.

## Estado final

```text
MC13_VERDICT = PARTIAL
MC13_INTERNAL_FINANCIAL_SCOPE = PASS_INTERNAL_FINANCIAL_SCOPE
MC13_60_MONTH_MODEL = IMPLEMENTED
MC13_12_36_60_RECONCILIATION = PASS
MC13_CASHFLOW_VALIDATED = PASS_INTERNAL_SCOPE
MC13_FINANCING_REQUIREMENT_MODEL = CONDITIONAL_HYPOTHETICAL
MC13_BREAK_EVEN_STATUS = CONDITIONAL_HYPOTHETICAL_ONLY
MC13_CUSTOMER_DEMAND_EVIDENCE = NONE
MC13_EXTERNAL_COMMERCIAL_VALIDATION = BLOCKED_OR_NOT_OBTAINED
MC13_INDEPENDENT_REVIEW = PASS_INTERNAL_FINANCIAL_SCOPE

MC12_VERDICT = PARTIAL
MC12_INTERNAL_ECONOMICS_SCOPE = PASS_INTERNAL_ECONOMICS_SCOPE

PRICE_APPROVED = NONE
LICENSING_RIGHTS_GRANTED = false
CUSTOMER_WTP_VALIDATED = false
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE

PR_CREATED = true
MERGED = false
DEPLOYED = false
MC14_STARTED = false
```
