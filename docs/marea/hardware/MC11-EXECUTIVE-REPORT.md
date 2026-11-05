# MC-11 — Informe ejecutivo de viabilidad hardware, aprovisionamiento y conformidad

**Programa:** EMBARCARTE / MAREA
**Hito:** MC-11 de 36 — BOM hardware, inteligencia de proveedores, hoja de ruta de conformidad (CE/EMC/RED/NMEA 2000) y viabilidad industrial
**Fecha:** 2 de noviembre de 2026 (investigación documental y de ingeniería de una sola sesión)
**Alcance:** viabilidad interna de ingeniería. No incluye contacto con proveedores, RFQ, compras, prototipos, ensayos físicos, certificación ni validación de clientes.
**Clasificación:** documento interno. MAREA es una marca **propuesta** (`NOT_GRANTED`); ningún producto está a la venta.

---

## 1. Veredicto del hito

| Campo | Valor |
|---|---|
| Estado | **PARTIAL — viabilidad interna de ingeniería entregada; evidencia formal de cotizaciones de proveedor NO OBTENIDA** |
| Rama | `feature/marea-mc11-hardware-sourcing-conformity` |
| Base | MC-10R `67131782edaf8f3f8327ba79e5c5b4c554b137b0` (PR #17 abierto, en borrador, sin fusionar) |
| Commit de auditoría | `bef2f4b`; correcciones `73ab0ac`; entrega `0eceb86`; reverificación independiente en `0eceb86` |
| PR | [#18](https://github.com/manuelxose/embarcarte/pull/18), borrador, apilado sobre `feature/marea-mc10r-fieldwork-recovery`, sin fusionar |
| Revisión independiente | Hito completo `PARTIAL`; **alcance interno `PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE`**; 9/9 hallazgos `CLOSED_VERIFIED` (0 abiertos), ver D35 |
| Entregables | D1–D37 (17 documentos de ingeniería, 18 registros JSON, validador de 54 comprobaciones y 59 pruebas negativas) |
| Evidencia de aprovisionamiento formal | `MC11_FORMAL_PROCUREMENT_EVIDENCE = BLOCKED_OR_NOT_OBTAINED` (0 proveedores contactados, 0 RFQ enviadas, 0 cotizaciones) |

**Respuesta a la pregunta central:** existen arquitecturas hardware técnicamente creíbles (HUB híbrido con supervisión MCU, WATCH híbrido de bajo consumo, familia SENSE modular, DISPLAY como módulo HMI industrial), pero **ninguna está congelada**, su coste solo está parcialmente respaldado por precios públicos y **cero** configuraciones dispone de conformidad, compatibilidad probada o cotización real. Lo que puede costearse hoy con evidencia verificable es muy poco: la cobertura de precios observados es del **0,8 %–4,7 %** del subtotal modelado; el resto son supuestos etiquetados. Las decisiones de inversión deben permanecer abiertas.

### 1.1 Qué se ha completado

- Mapa de hardware de las **9 familias** y **6 bundles** canónicos, sin inventar SKU ni incluir hardware por defecto en FLEET.
- **33 arquitecturas candidatas** puntuadas con criterios y pesos congelados antes de puntuar.
- Arquitectura eléctrica marina, matriz de protección de interfaces, registro de modos de fallo y plan de ensayos.
- Matriz de protocolos (NMEA 0183/2000, CAN, Ethernet, Wi-Fi, BLE, GNSS, AIS, celular) con **0 filas probadas**.
- **41 componentes reales** (MPN y fabricante), **19 proveedores** (ninguno contactado), **42 observaciones de precio público** clasificadas, 10 borradores de RFQ **no enviados**.
- **11 BOM de ingeniería** y **11 BOM de fabricación** (todas `INCOMPLETE`), 90 escenarios de volumen LOW/BASE/HIGH con registro de 13 supuestos.
- Conformidad UE por configuración: **22 filas**, 11 actos legislativos, motivos escritos de aplicabilidad **y** de no aplicabilidad; 18 bloqueos de conformidad (8 CRITICAL).
- Seguridad de dispositivo y ciclo de vida (52 requisitos, 45 MUST) y frontera de propiedad intelectual del firmware.
- Evaluación de viabilidad (D29), registro de decisión y riesgo (39 riesgos) y traspaso a MC-12/13.

---

## 2. Resumen del portafolio por familia

| Familia | Hardware | Arquitectura provisional recomendada (NO congelada) | Complejidad de conformidad | Confianza de coste | Riesgo técnico principal | Recomendación |
|---|---|---|---|---|---|---|
| NAV | No requiere hardware propio | `ARCH-NAV-E` software-first | Media (datos/cartografía) | N/A | Derechos de cartografía `NOT_GRANTED` | No desarrollar hardware |
| HUB | Sí, plataforma | `ARCH-HUB-D` híbrido (MCU + procesador) | **Alta** (RED/EMC, NMEA, CRA) | Baja (subtotal 9,04 € conocido de 18 líneas, 14 sin precio) | Sin medida eléctrica/térmica/EMC; ciclo de vida del cómputo | Candidato a prototipo, especificación sin congelar |
| AIS | Solo integración | `ARCH-AIS-E` software-first; hardware MAREA diferido | **Muy alta** (radio/equipo marino) | Baja | Aprobación radio; receptor propio sin módulo verificado | Integrar equipos certificados de terceros; **transmisión prohibida** |
| PILOT | Bloqueado | Ninguna (sin salida de control) | **Bloqueada** | N/A | Seguridad funcional | `DEFER_SAFETY_CRITICAL_DEVELOPMENT` |
| SENSE | Sí, módulos | `ARCH-SENSE-C` plataforma MCU compartida | Media | Baja | Exactitud y calibración no medidas | Prototipar módulos cableados, sin afirmar exactitud |
| WATCH | Sí, dispositivo | `ARCH-WATCH-D` híbrido bajo consumo | **Alta** (RED/CRA/datos) | Baja | Cadena celular/nube; consumo que agota la batería vigilada | Prototipar, sin prometer alertas garantizadas |
| DISPLAY | Sí, pero débil | `ARCH-DISPLAY-D` panel industrial + portadora | **Alta** | Baja | Panel de fuente única; legibilidad/ingreso sin probar; tamaño no congelado | Integración de HMI industrial o tablet como paso intermedio |
| WEATHER | No requiere hardware | `ARCH-WEATHER-E` software-first | Media (licencias de datos) | N/A | Derechos de proveedor `NOT_GRANTED` | No desarrollar hardware |
| FLEET | Sin hardware por defecto | `ARCH-FLEET-E` software/servicio | Media (CRA/RGPD) | N/A | Tenencia y SLA no implementados | Mantener la regla de «sin hardware incluido» |

---

## 3. Componentes heredados: qué sirve para un prototipo y qué no para un producto

| Elemento heredado | Estado verificado en MC-11 | Viable en prototipo | Cambios necesarios para uso comercial |
|---|---|---|---|
| Raspberry Pi 5 / CM4 (placa de desarrollo) | Página de fabricante accesible para Pi 5; CM4 sin ficha recuperada, ciclo de vida `UNKNOWN`, sin código de pedido verificado | Sí | Sustituir por SOM industrial con compromiso de ciclo de vida, temperatura extendida y notificación de cambios; o integrar hardware certificado de terceros |
| Raspberry Pi Pico 2 / RP2350 | Página de lanzamiento accesible; **ficha PDF inaccesible**; ninguna magnitud eléctrica afirmada | Sí | No usar como controlador de producto sin datos verificados, watchdog hardware independiente y cualificación térmica |
| Cytron MD30C R2 (driver motor) | Página del fabricante y ficha inaccesibles (404, igual que en MC-02); **ningún parámetro verificado** | Solo banco, nunca embarcación | No es un componente de producto; cualquier función de actuación queda fuera de alcance (PILOT bloqueado) |
| HAT / interfaces NMEA heredadas | Ausentes como artículo real: solo existen tipos TypeScript y stubs; `HW-09/HW-10 NO_ARTICLE` | No | Diseñar una interfaz aislada NMEA 0183 y, si se decide, CAN aislado NMEA 2000; requiere licencia y certificación NMEA |
| Sensores I²C (IMU ICM-20948) y adaptadores USB-serie | Documentación del fabricante no recuperada; HAT comunitario sin licencia de diseño verificada | Sí, para banco | Verificar licencia del diseño del HAT, temperaturas, vibración y conectores; no derivar producto de un diseño comunitario sin derechos |

**Conclusión:** los módulos de desarrollo permiten aprender y medir; **ninguno** es una base comercial. La distancia entre prototipo y producto es, como mínimo: SOM industrial, protección eléctrica marina, aislamiento, envolvente IP con gestión térmica y de condensación, firmware firmado con recuperación, pruebas EMC/ambientales y un expurgo de licencias.

---

## 4. Plataforma candidata y componentes compartidos

Elementos con reutilización real entre familias (D10):

1. **Cómputo de pasarela** (HUB, DISPLAY, AIS-CONNECTED): SOM + portadora propia; reduce NRE de PCB y firmware.
2. **Subsistema de alimentación marina** (todas las familias con hardware): 12/24 V, protección de polaridad, sobrecorriente, transitorios y filtrado EMC.
3. **Frontal NMEA 0183 aislado** (HUB, SENSE-WIND): optoacoplamiento y RS-422.
4. **Módem celular + antena + identidad** (WATCH, borde de FLEET).
5. **Plataforma mecánica** (envolvente, prensaestopas, ventilación de presión, tornillería inoxidable).
6. **Actualización de firmware y arquitectura de seguridad** (todas).
7. **Útiles de test y serialización** (fábrica).

La reutilización es real pero **no** debe forzar los requisitos de una familia sobre otra; MC-11 mantiene separadas las decisiones de plataforma y las de producto.

---

## 5. Panorama de proveedores: qué es real y qué no existe

- **19 proveedores registrados** (fabricantes, distribuidores autorizados, CEM, envolventes, laboratorios): todos `NOT_CONTACTED`, todas las RFQ `RFQ_NOT_SENT`.
- **42 observaciones de precio público**: 37 precios de lista de fabricante (36 USD + 1 EUR) y 5 precios minoristas de distribuidor autorizado en EUR; **37 con base de IVA desconocida** y 5 sin IVA. **Ninguna es una cotización.**
- **0 fichas técnicas recuperadas**: el entorno de esta sesión no pudo descargar PDF; se registró como limitación (`INACCESSIBLE`), no se sustituyó por supuestos. Los parámetros citados provienen de páginas HTML de fabricante.
- **0 cotizaciones, 0 MOQ, 0 plazos, 0 precios de utillaje, 0 términos de garantía**.
- Riesgos de suministro verificados: familia GNSS u-blox MAX-M10 **EOL**; elemento seguro ATECC608B y EEPROM AT24CS32 **NRND**; panel de display de **fuente única**; módulo de cómputo de consumo con ciclo de vida `UNKNOWN`.
- **No existe** ninguna declaración de proveedor sobre capacidad, certificaciones, condiciones OEM/ODM ni compromiso de suministro.

---

## 6. BOM y coste: qué puede afirmarse y qué no

| Concepto | Estado |
|---|---|
| BOM de ingeniería | 11 BOM, 155 líneas, **todas `INCOMPLETE`**; subtotal conocido 9,04 € (HUB-STANDARD) a 13,87 € (HUB-PRO); 14–16 líneas sin precio por BOM |
| BOM de fabricación | 11 BOM, 171 líneas; mano de obra y mecánica mayoritariamente supuestos etiquetados |
| Cobertura de precio observado | **0,8 %–4,7 %** del subtotal modelado (DISPLAY el más bajo, SENSE el más alto) |
| Escenarios | 90 (6 familias × volúmenes 1/10/100/500/1000 × LOW/BASE/HIGH), todos `INCOMPLETE` |
| Conversión de divisa | Tipo base como **supuesto de ingeniería** (0,925925926 EUR/USD; la referencia BCE no pudo recuperarse), con multiplicadores LOW/HIGH explícitos; cada línea USD conserva su precio original y añade `unitPriceEur` |
| Coste de certificación | `UNKNOWN` en los 90 escenarios; **no es cero** |
| Utillaje/NRE | Envolventes de supuesto (HUB 12 000 €) usados solo para sensibilidad; **no son cotizaciones** |
| Precio de venta | Ninguno aprobado; todas las hipótesis siguen `HYPOTHESIS_UNAPPROVED` |
| Rentabilidad | **No establecida**. MC-12/13 no se han ejecutado |

Subtotal BASE conocido (EUR, **no** es coste unitario), volumen 100/1 000: HUB 437,13 / 300,05; WATCH 324,90 / 232,93; SENSE (por módulo) 168,27 / 125,55; DISPLAY 453,32 / 343,11; AIS 370,35 / 296,63. El utillaje amortizado es el 27,5 % del subtotal de HUB a 100 unidades y el 4 % a 1 000; la certificación queda fuera en todos los casos.

**Riesgo de estimación:** una sola cotización real de SOM, módem, panel o módulo receptor AIS puede desplazar una familia fuera de su envolvente HIGH. Por eso ninguna cifra de MC-11 puede usarse como precio, margen o compromiso.

---

## 7. Hoja de ruta regulatoria (resumen por configuración)

- **RED vs EMC son mutuamente excluyentes por configuración**: un diseño con radio cae en RED (que incluye el requisito EMC esencial); una variante cableada cae en EMC. Un módulo de radio precertificado **no** cubre el producto anfitrión.
- **LVD: 0 filas aplicables** (12 V DC/5 V/3,3 V, por debajo de 50 V AC / 75 V DC); cambia solo si se incluye una fuente de 230 V bajo marca MAREA.
- **MED y RCD: 0 filas aplicables**, con motivo escrito y disparador de reevaluación; la no aplicación de MED **no** aprueba un producto de gobierno.
- **CRA**: obligaciones de notificación **ya en vigor desde el 11 de septiembre de 2026** (24 h / 72 h / 14 días); obligaciones principales desde el **11 de diciembre de 2027**; 20 de 22 configuraciones en ámbito; la clasificación (por defecto / importante / crítica) queda para revisión jurídica cualificada.
- **NMEA**: implementación `NOT_IMPLEMENTED`, membresía `NOT_HELD`, código de fabricante `NOT_ASSIGNED`, certificación `NOT_CERTIFIED`, 0 filas probadas. Se verificó el calendario publicado de NMEA 0183 (USD 1.150/7.500/10.000 y USD 200 de mnemónico) como indicación presupuestaria; las tasas de NMEA 2000 quedan `UNKNOWN`.
- **18 bloqueos de conformidad (8 CRITICAL)**, ninguno cerrado: identidad de fabricante, operador económico, expediente técnico, evidencia de ensayos, clasificación CRA, integración de radio, batería, registros ES/PT, PILOT, AIS, NMEA, propiedad intelectual, idioma español, envases, riesgo de «certificado voluntario», preparación de notificación CRA y alcance software de WEATHER/FLEET.

---

## 8. Seguridad, PILOT, AIS y WATCH

- **PILOT:** `PILOT_SAFETY_GATE = BLOCKED`. Solo se ha elaborado un análisis documental de seguridad (autoridad de control, interfaces mecánicas/hidráulicas, parada independiente, redundancia, activación inesperada, Comisionado, mantenimiento, V&V). **No** se ha diseñado ni implementado ninguna salida de motor o gobierno. Disposición: diferir.
- **AIS:** cuatro productos separados. Se prohíbe el desarrollo de transmisores; la postura a corto plazo es integrar receptores certificados de terceros. El dato AIS no es un sistema anticolisión y no se garantiza su integridad.
- **WATCH:** consumo en reposo desconocido; un dispositivo que agota la batería que vigila es un modo de fallo que invalida el producto. No existe entrega garantizada de alertas y no puede prometerse.
- **DISPLAY:** legibilidad solar, adhesión óptica, estanqueidad, disipación térmica y uso con guantes mojados sin probar; ninguna calificación IP se afirma.
- **Seguridad embebida:** 52 requisitos (45 MUST) con estado `NO_IMPLEMENTATION`; modelo de amenazas y mecanismos candidatos (identidad, arranque seguro, firma, anti-rollback, recuperación A/B). CRA mapeada solo como insumo; `CRA_COMPLIANCE = NOT_ESTABLISHED`. `SOURCE_IP_CLEARANCE = NOT_CLEARED`: no se reutiliza código de OPEN-MARINE.

---

## 9. Decisiones de producto

| Categoría | Familias |
|---|---|
| Arquitecturas candidatas a un paso de viabilidad financiado (G3/G4 no autorizados) | HUB híbrido (`ARCH-HUB-D`), WATCH híbrido, SENSE modular cableado, DISPLAY HMI industrial |
| Pueden ser solo software | NAV, WEATHER, FLEET y las capas software de HUB/AIS |
| Deben integrar hardware certificado de terceros | AIS recepción, GNSS (hasta verificar ciclo de vida), viento/entorno, cartografía y predicción |
| Requieren PCB propia | HUB, WATCH, SENSE, portadora de DISPLAY, futuro receptor AIS |
| Alta carga de conformidad | HUB, WATCH, DISPLAY, AIS |
| Riesgo técnico no aceptable hoy | Transmisor AIS (prohibido), display marino propio, PILOT, receptor AIS propio |
| Especificación que debe permanecer sin congelar | Las nueve familias, límites de edición de HUB, tamaño de DISPLAY, set y exactitud de SENSE, set de sensores de WATCH, frontera de AIS, y todos los precios |
| Diferir | PILOT, transmisión AIS, utillaje de display propio, receptor AIS propio, segunda plataforma no reutilizable |

---

## 10. Auditoría y evidencia de ejecución

- **Auditor independiente (`qa-reviewer`)**, ronda 1 sobre el commit fijo `bef2f4b`: veredicto **PARTIAL**; sin hallazgos BLOCKING; 1 MAJOR (`MC11-F01`: rama sin remoto ni PR en el momento de la auditoría), 4 MINOR (composición de divisas en D31, base del subtotal con utillaje, arquitectura provisional de AIS/DISPLAY, errata «MCU-11») y 4 INFORMATIONAL.
- **Correcciones aplicadas** en `73ab0ac`: D3 alineado con las recomendaciones puntuadas, D31 corregido, redondeo 27,5 % unificado, errata corregida en ambas BOM, 22 registros de evidencia marcados `VERIFIED_BY_AUDITOR`, manifiesto actualizado; rama publicada y PR borrador #18 abierto.
- **Reverificación independiente en `0eceb86`**: veredicto revisado — hito completo **PARTIAL** (sin cotización formal), **alcance interno de viabilidad `PASS_INTERNAL_HARDWARE_FEASIBILITY_SCOPE`**, sin condición FAIL y sin fabricación de evidencia; **9/9 hallazgos `CLOSED_VERIFIED`** (0 abiertos BLOCKING/MAJOR/MINOR). El auditor **retiró `MC11-F03`**: recomprobó la aritmética y confirmó que el utillaje `COST-16` ya está dentro del subtotal y que `toolingAmortizationEur` lo duplica, por lo que no debe sumarse otra vez. Se registraron cinco refrescos documentales (PA-01…PA-05) sin cambio de veredicto técnico.
- **Fuentes verificadas por el auditor**: 11 de 13 muestreadas (Comisión Europea/CRA, NMEA 2000 y 0183, TI, Raspberry Pi, ST, u-blox EOL, Microchip NRND, JLCPCB, AISLER); 2 inaccesibles registradas como tales; 22 registros de evidencia marcados como verificados por el auditor, ninguno de una fuente inaccesible.
- **Cálculos recalculados por el auditor**: 11 BOM de ingeniería (155 líneas), 11 BOM de fabricación (171 líneas), 90 escenarios, conversión FX de 34 líneas USD, 33 puntuaciones de arquitectura, 9 puntuaciones de portafolio, conteos de conformidad y riesgo — **0 discrepancias al céntimo**.
- **Puertas de validación** (ejecutadas por el Lead, y de nuevo por el auditor las de Node): `test:hardware` **54/54**, `test:hardware:unit` **59/59**, `test:products` 52/52, `test:products:unit` 106/106, `test:bundles` 35/35, `test:bundles:unit` 60/60, `test:brand` 21/21, `test:brand:unit` 13/13, `test:market` 40/40, `test:market:unit` 43/43, `test:customer-research` 62/62, `test:customer-research:unit` 111/111, `test:customer-recovery` 32/32, `test:customer-recovery:unit` 82/82, i18n/commerce/SEO/backup PASS, `format:check` PASS, `npm audit` 0 vulnerabilidades, `git diff --check` limpio, `npm run build` exit 0, `npm run test:e2e` exit 0 con **15/15** pruebas Playwright.
- **Bloqueos restantes**: sin cotizaciones reales, sin prototipo, sin ensayos, sin certificación, sin identidad legal de fabricante, sin derechos de marca ni de propiedad intelectual, sin evidencia de cliente.

---

## 11. Traspaso a MC-12 y MC-13

**MC-12 (economía de servicios recurrentes y contribución por SKU)** recibe: coste de componentes por línea con su clase de evidencia, 90 escenarios de volumen, registro de supuestos (FX, volumen, mano de obra, merma, garantía, utillaje, logística, instalación, learning), dependencias recurrentes sin precio (celular, nube/telemetría, cartografía, meteorología, licencias NMEA, mantenimiento de firmware CRA), costes de instalación modelados (1,2 h HUB, 1,8 h WATCH, 1,5 h SENSE a 30 EUR/h supuestos) y los huecos de cotización. **No** recibe precios aprobados, márgenes ni demanda validada.

**MC-13 (modelo financiero multiperiodo)** recibe: necesidades de capital de desarrollo, NRE de PCB, utillaje (envolventes de supuesto 12 000/8 000/3 500 €), campaña de certificación `UNKNOWN`, presupuesto de repetición de ensayos, mantenimiento de firmware durante el periodo de soporte, SBOM/CVD, seguro, inventario y capital circulante para 1/10/100/500/1 000 unidades.

**Preguntas que siguen sin respuesta (MC-10 no está completado; no debe citarse como evidencia):** coste real del problema de datos (CQ-01), disposición a instalar hardware (CQ-02), mediciones valoradas (CQ-03), banda de precio tolerable (CQ-04), tolerancia a suscripción (CQ-05), evidencia de compatibilidad exigida (CQ-06), posición de garantía/RMA (CQ-07), condiciones de canal (CQ-08), necesidad de hardware de flota (CQ-09) y exclusiones críticas a comunicar (CQ-10).

---

**No se afirma** viabilidad comercial, rentabilidad, certificación, compatibilidad, exactitud, estanqueidad, disponibilidad ni precio. **No se ha contactado** a ningún proveedor, **no se ha comprado** nada y **no se ha ejecutado** ningún ensayo físico. `PILOT_SAFETY_GATE = BLOCKED`; AIS sin transmisión; FLEET sin hardware por defecto; marca `NOT_GRANTED`; propiedad intelectual `NOT_CLEARED`; productos `NOT_FOR_SALE`.
