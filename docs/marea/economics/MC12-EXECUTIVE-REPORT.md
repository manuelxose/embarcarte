# MC-12 — Informe ejecutivo (ES)

**Milestone 12/36 — Licencias recurrentes, economía de datos y contribución por SKU (ex-IVA)**

| Campo | Valor |
|---|---|
| Fecha | 2026-11-02 |
| Rama | `feature/marea-mc12-recurring-data-unit-economics` |
| Base verificada | MC-11 `5b47a3d51fa875a08ed6f4ad8448a3e51a0f0499` (local = remoto = SHA de preparación) |
| PR | [#19](https://github.com/manuelxose/embarcarte/pull/19), **draft**, apilado sobre MC-11, sin fusionar |
| Alcance | Modelo de contribución ex-IVA, licencias, costes recurrentes, canales, bundles, sensibilidad, matriz de decisión y handoff a MC-13 |
| Disponibilidad comercial | `NOT_FOR_SALE`; `PRICE_APPROVED = NONE`; `CUSTOMER_WTP_VALIDATED = false` |

## A. Veredicto MC-12

- **Veredicto completo del milestone: `PARTIAL`.**
- **Alcance interno de economía: `PASS_INTERNAL_ECONOMICS_SCOPE`.**
- **Evidencia comercial externa: `BLOCKED_OR_NOT_OBTAINED`.**

El trabajo interno es completo, trazable y verificable: modelo por SKU, conciliación
de costes de MC-11, registro de proveedores, modelo recurrente, sensibilidad,
matriz de decisión, validador determinista y suite adversaria. El criterio de
aceptación del registro exige además **cotizaciones reales de datos y conectividad**.
No existe ninguna: el mandato prohíbe el contacto con proveedores, el envío de RFQ,
el registro de cuentas, la activación de APIs de pago y la aceptación contractual.
Por tanto, `PASS` completo sería una invención; `PARTIAL` es el resultado correcto.

Ningún producto cambia de estado comercial. Ningún precio queda aprobado. Ningún
derecho de licencia queda concedido.

## B. Qué se ha ejecutado

1. **D01 — Base y gobierno:** ancestro verificado, PR #18 abierto/draft/sin fusionar,
   estados heredados inmutables, reglas de decisión preinscritas y criterios de
   aceptación separados en dos ejes (interno/externo).
2. **D02 — Contrato de datos:** esquemas, unidades, moneda, IVA, clases de evidencia,
   vocabularios y 49 comprobaciones obligatorias.
3. **D03 — Paisaje de licencias:** 9 derechos requeridos, todos `NOT_GRANTED` o
   `REQUIRES_CONTRACT`; límites duros (AIS, PILOT, marca, IP).
4. **D04 — Registro de proveedores y precios:** 53 registros clasificados, con fecha
   de consulta y URL; 0 cotizaciones formales y 0 contratos.
5. **D05 — Modelo de nube y conectividad:** tres perfiles de uso y coste por
   dispositivo-mes a partir de tarifas publicadas.
6. **D06 — Conciliación de costes hardware:** 90 escenarios MC-11 recalculados; el
   invariante de amortización de utillaje (`COST-16`) no se cuenta dos veces
   (delta máximo 0,00 EUR).
7. **D07 — Contribución por SKU:** 50 registros con coste conocido, coste desconocido
   explícito, contribución condicional, precio de equilibrio y clasificación.
8. **D08 — Suscripciones:** NAV, WEATHER, WATCH y FLEET con reglas de entitlement
   heredadas (sin doble facturación, sin bloquear seguridad local, FLEET sin hardware).
9. **D09 — Canales:** directo, app store, instalador, distribuidor y cotización.
10. **D10 — Bundles:** los seis bundles MC-08 sin inventar composición.
11. **D11 — Sensibilidad y estrés:** 70 escenarios, 4 casos de estrés, 12 palancas.
12. **D12 — Priorización:** matriz ponderada con pesos preinscritos y prioridad
    provisional.
13. **D13 — Registro de bloqueos:** 22 bloqueos (12 `BLOCKING`, 9 `MAJOR`, 1 `MINOR`).
14. **D14 — Handoff a MC-13:** entradas, incógnitas y rangos, sin ejecutar MC-13.
15. **D15 — Datos legibles por máquina:** 16 ficheros JSON.
16. **D16 — Validador y pruebas:** `check-marea-unit-economics.mjs` (49 checks) y
    suite adversaria (59 tests), integrados en `npm`.
17. **D17 — Auditoría independiente:** en curso; se registra en `review/MC-12-REVIEW.md`.
18. **D18 — este informe.**
19. **D19 — Registro de entrega.**

## C. Economía por producto

Cifras **condicionales**: contribución = ingreso neto ex-IVA − coste variable conocido,
antes de costes fijos. No son márgenes, ni precios, ni beneficios.

### Hardware (100 unidades, BASE, autoinstalación)

| SKU | Ingreso neto | Coste variable | Contribución | Confianza | Clasificación |
|---|---|---|---|---|---|
| HUB-STANDARD | 288,43 | 281,13 | **+7,30** | baja | `DEFER_RECOMMENDED` |
| WATCH-CORE | 247,11 | 190,90 | **+56,21** | baja | `COST_MODEL_INCOMPLETE` |
| SENSE (módulo) | 81,82 *(hipótesis simbólica)* | 88,27 | **−6,45** | baja | `DEFER_RECOMMENDED` |
| DISPLAY-7 | 577,69 | 303,32 | **+274,37** | baja | `CONDITIONAL_ECONOMIC_CASE` |
| AIS-RECEIVER | 205,79 | 281,35 | **−75,56** | baja | `DEFER_RECOMMENDED` |
| PILOT-COASTAL | — | — | — | ninguna | `SAFETY_BLOCKED` |

Precios de equilibrio brutos (100 uds): HUB 340,17; WATCH 230,99; SENSE 106,81;
DISPLAY 367,02; AIS 340,43. **No son precios aprobados**: son el umbral de
contribución cero antes de costes fijos.

### Software y suscripciones (anualizado, canal directo)

| SKU | Ingreso neto/año | Coste conocido | Contribución condicional | Clasificación |
|---|---|---|---|---|
| NAV Essential | 81,82 | 10,43 | **+71,39** | `LICENSING_BLOCKED` |
| NAV Pro | 123,14 | 12,42 | **+110,72** | `LICENSING_BLOCKED` |
| WEATHER Standard | 40,50 | 5,45 | **+35,05** | `LICENSING_BLOCKED` |
| WEATHER Pro | 73,55 | 7,04 | **+66,51** | `LICENSING_BLOCKED` |
| WATCH monitoring | 98,18 | 13,05 | **+85,13** | `COST_MODEL_INCOMPLETE` |
| FLEET START | 588,00 | 37,08 | **+550,92** | `COST_MODEL_INCOMPLETE` |
| FLEET BUSINESS | 948,00 | 42,48 | **+905,52** | `COST_MODEL_INCOMPLETE` |

La "holgura" de NAV (71,39 / 110,72 EUR por cuenta-año) es el **máximo** coste de
licencia de cartas/clima que podría absorber antes de llegar a cero. No es un margen:
el derecho sigue `NOT_GRANTED`.

### Bundles

START +118,85 (bloqueado por licencia de cartas); CRUISE +279,97 (bloqueado por
licencia); PROTECT **−50,74** (negativo con su propia composición);
SAIL y COMPLETE `SAFETY_BLOCKED` por PILOT; FLEET `COST_MODEL_INCOMPLETE`
(sin precio de paquete, sin hardware por defecto).

### Lectura

- **DISPLAY** es el único hardware con caso condicional robusto: aguanta +20 % de
  coste y un 35 % de margen de distribuidor (queda en +11,51 EUR).
- **HUB** está a 8,83 EUR de su precio de equilibrio y se vuelve negativo con +20 %
  de coste: no es viable al precio hipotético actual.
- **SENSE** pierde 6,45 EUR en la única hipótesis simbólica (99 EUR); necesita
  ≥106,81 EUR brutos.
- **AIS** es negativo en todos los volúmenes y casos modelados; necesita ≥340,43 EUR.
- **WATCH** combina hardware (+56,21) y servicio (+85,13): es el servicio de consumo
  más creíble, pero depende de contratos de conectividad y nube inexistentes.
- **NAV y WEATHER** tienen buena aritmética de software y derechos bloqueados: el
  problema no es el coste, es la licencia.
- **PILOT** no tiene coste, ni precio fijo, ni autorización de seguridad.

## D. Licencias y costes recurrentes

- **Cartas náuticas:** NOAA es de dominio público pero solo cubre EE. UU.; las cartas
  oficiales para Galicia/Portugal (IHM, UKHO, Shom) exigen acuerdo y no publican
  precio; el esquema IHO S-63 está mediado por contrato. Derecho: `NOT_GRANTED`.
- **Clima:** Copernicus Marine y DWD son gratuitos con atribución pero sin contrato
  de reexhibición comercial ni continuidad garantizada; Stormglass publica 49 EUR/mes;
  Meteomatics es solo cotización. Derecho: `NOT_GRANTED`.
- **NMEA:** la tarifa 0183 está publicada (USD 1.150/7.500/10.000 + USD 200), pero no
  hay licencia ni certificación NMEA 2000; `NMEA2000_CERTIFIED = false`.
- **Conectividad:** tarifas publicadas (iot.cards 0,005 EUR/MB; 1NCE 12 EUR/10 años;
  Soracom 0,375 EUR/mes por 25 MB), sin contrato ni acuerdo de SIM/eSIM.
- **Nube/telemetría:** subtotal modelado de 0,15484 EUR/dispositivo-mes (BASE, 1.000
  dispositivos) a partir de tarifas AWS/Cloudflare; sin contrato, sin DPA, sin SLA.
- **Notificaciones:** push sin coste publicado, email 0,11 USD/1.000, SMS España
  0,0875 USD; mezcla BASE 0,070714 EUR/dispositivo-mes. Sin contrato.
- **Pagos:** Stripe 1,5 % + 0,25 EUR (EEE); comisión de app store 15-30 %.
- **Costes fijos desconocidos:** certificación, utillaje/NRE, ingeniería, seguro de
  responsabilidad, mantenimiento de seguridad CRA. Se excluyen de la contribución
  unitaria y se registran como incógnitas, nunca como cero.

## E. Riesgos comerciales

1. **Riesgo de licencia (crítico):** sin derecho de cartas/clima no hay producto de
   pago. Bloquea NAV, START y CRUISE.
2. **Riesgo de coste hardware (crítico):** cobertura de precios observados del 0,8-4,7 %
   del subtotal modelado; certificación desconocida en los 90 escenarios.
3. **Riesgo de canal:** solo el procesamiento de tarjeta está evidenciado; los
   márgenes de instalador/distribuidor son hipótesis. Con 35 % de distribuidor solo
   DISPLAY sigue positivo.
4. **Riesgo de conectividad:** sin contrato no se puede prometer monitorización remota
   WATCH; la cobertura celular en alta mar no se asume.
5. **Riesgo de seguridad/regulatorio:** puerta de seguridad PILOT bloqueada; CE/EMC/RED
   no iniciados; CRA convierte el mantenimiento en coste recurrente; AIS transmisión
   prohibida.
6. **Riesgo de demanda:** evidencia de cliente `NONE`; toda previsión de ingresos es
   hipótesis. La columna de cliente puntúa cero en las nueve familias.
7. **Configuraciones problemáticas:** PROTECT pierde 50,74 EUR con su composición
   histórica; AIS pierde 75,56 EUR; HUB es marginal; SENSE necesita subir precio.

## F. Pruebas

Comandos ejecutados y resultado (salida real):

| Comando | Resultado |
|---|---|
| `npm run test:economics` | **exit 0** — 49/49 checks |
| `npm run test:economics:unit` | **exit 0** — 59/59 tests |
| `npm run test:hardware` / `:unit` | exit 0 — 54/54 / 59/59 |
| `npm run test:products` / `:unit` | exit 0 — 52/52 / 106/106 |
| `npm run test:bundles` / `:unit` | exit 0 — 35/35 / 60/60 |
| `npm run test:brand` / `:unit` | exit 0 — 21/21 / 13/13 |
| `npm run test:market` / `:unit` | exit 0 — 40/40 / 43/43 |
| `npm run test:customer-research` / `:unit` | exit 0 — 62/62 / 111/111 |
| `npm run test:customer-recovery` / `:unit` | exit 0 — 32/32 / 82/82 |
| `npm run test:i18n` | exit 0 |
| `npm run test:commerce` | exit 0 |
| `npm run test:seo` | exit 0 |
| `npm run test:backup` | exit 0 |
| `npm run format:check` | exit 0 |
| `npm run build` | exit 0 |
| `npm run test:e2e` | exit 0 — 15/15 |
| `npm audit --omit=dev --audit-level=high` | exit 0 — 0 vulnerabilidades |
| `git diff --check` | limpio |

Nota de entorno: `node --test`, `ng build` y Playwright lanzan procesos hijos que el
sandbox por defecto bloquea con `EPERM`. Se ejecutaron con acceso completo; sin él,
esos comandos quedan `BLOCKED_BY_ENVIRONMENT`, no `FAIL`.

## G. Auditoría independiente

**Estado: en curso.** El auditor es un agente distinto del autor y revisa el commit
congelado, no el resumen. Sus hallazgos (severidad, corrección, re-verificación) se
registran en `docs/marea/economics/review/MC-12-REVIEW.md` y en
`data/review-findings.json`. Este informe se actualizará con el veredicto final.
Ningún hallazgo se cierra por prosa: requiere re-ejecución del gate.

## H. Git y PR

- Rama: `feature/marea-mc12-recurring-data-unit-economics`.
- Base verificada: MC-11 `5b47a3d51fa875a08ed6f4ad8448a3e51a0f0499`.
- Commit de implementación: `e6e181a`.
- PR: [#19](https://github.com/manuelxose/embarcarte/pull/19), **draft**,
  `MERGEABLE`, base `feature/marea-mc11-hardware-sourcing-conformity`.
- PR #18 permanece abierto, draft y sin fusionar.
- Sin merge, sin deploy, sin publicación.

## I. Bloqueos pendientes

Requieren autorización externa que MC-12 no tiene:

1. Licencia de redistribución de cartas (IHM/UKHO/Shom/IHO u OEM).
2. Licencia de reexhibición comercial de datos meteorológicos.
3. Licencia NMEA 0183 y certificación NMEA 2000.
4. Contrato o cotización formal de conectividad IoT (SIM/eSIM, roaming, fair use).
5. Contrato de nube/DPA y decisión de residencia de datos.
6. Derecho de teselas de mapas en producción.
7. Cotizaciones de proveedores (MOQ, plazos, Incoterms).
8. Cotizaciones de certificación (EMC/RED/ambiental/CRA).
9. Cotización de seguro de responsabilidad de producto.
10. `AUTH-MC10-001`: entrevistas y respuestas de precio de clientes.
11. Caso de seguridad PILOT y evaluación independiente.
12. Aclaración de la marca MAREA y del IP de origen.

## J. Próximo milestone

**MC-13 no se ha iniciado.** MC-12 entrega entradas con incógnitas declaradas:
estructuras de coste por SKU, costes recurrentes, dependencias de licencia, inversiones
únicas, rangos de incertidumbre, capital circulante desconocido, CAC/renovación
desconocidos y evidencia externa requerida. MC-13 puede construir un modelo
condicional de 12/36/60 meses solo si etiqueta esas incógnitas y no inventa demanda;
no puede declarar break-even ni precio aprobado con esta base.

## Bloque de estado legible por máquina

```
MC12_VERDICT = PARTIAL
MC12_INTERNAL_ECONOMICS_SCOPE = PASS_INTERNAL_ECONOMICS_SCOPE
MC12_EXTERNAL_COMMERCIAL_EVIDENCE = BLOCKED_OR_NOT_OBTAINED
CUSTOMER_WTP_VALIDATED = false
PRICE_APPROVED = NONE
LICENSING_RIGHTS_GRANTED = false
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
INDEPENDENT_REVIEW = PENDING
PR_CREATED = true
MERGED = false
DEPLOYED = false
MC13_STARTED = false
```
