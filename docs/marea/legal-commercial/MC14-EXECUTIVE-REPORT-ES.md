# MC-14 — Informe ejecutivo (ES)

| Campo | Valor |
|---|---|
| Entrega | D22 `MC14-EXECUTIVE-REPORT-ES.md` |
| Hito | MC-14/36 — Registro de riesgos legales y comerciales, cumplimiento normativo, derechos del consumidor y gobernanza de afirmaciones comerciales |
| Fecha | 2026-11-02 |
| Titular | Programme Lead |
| Rama | `feature/marea-mc14-legal-commercial-risk-claims-policy` |
| Base | `f80c0f02ac14803e9e1539393abbb225d7f49e16` (HEAD MC-13) |
| Paquete | `docs/marea/legal-commercial/` (D01–D23), datos máquina, validador y pruebas |
| Naturaleza | Gobernanza interna. **No es un dictamen jurídico, certificación, póliza de seguro ni autorización de venta** |

## A. Veredicto MC-14

**Veredicto del programa: `PARTIAL`.** El alcance interno de gobernanza
jurídico-comercial se acredita como
`PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE`; la validación jurídica externa y todos
los permisos, licencias, certificaciones, seguros, precios y contratos siguen
**BLOCKED / NOT_GRANTED**. No se ha vendido, publicado, fusionado ni desplegado
nada.

Evidencia principal: 48 fuentes jurídicas oficiales registradas con fecha de
consulta; 51 requisitos con cita, titular, evidencia y puerta de liberación; 9
familias × 14 instrumentos y 6 bundles × 14 evaluaciones de aplicabilidad (210);
95 riesgos con propietario y evidencia; 17 derechos de licencia (0 concedidos);
13 escenarios de responsabilidad; 42 afirmaciones bilingües (0 autorizadas
públicamente) y 30 categorías de afirmaciones prohibidas; 34 hallazgos web
read-only; 13 puertas de liberación y 24 documentos exigibles (0 ejecutados); 20
decisiones externas pendientes; validador 54/54; suite adversarial 41/41;
regresiones heredadas verdes; revisión independiente sobre el commit congelado
con correcciones aplicadas y re-verificadas.

## B. Legislación aplicable (España / UE)

| Instrumento | Versión / fechas verificadas | Aplicación a MAREA |
|---|---|---|
| CRA — Reglamento (UE) 2024/2847 | OJ 2024-11-20; en vigor 2024-12-10; notificación 2026-09-11; obligaciones principales 2027-12-11; soporte mínimo 5 años (art. 13(8)) salvo vida útil menor; actualizaciones 10 años (art. 13(9)) | Productos con elementos digitales; clasificación default/importante/crítica **sin determinar** |
| PLD — Directiva (UE) 2024/2853 | OJ 2024-11-18; en vigor 2024-12-08; transposición 2026-12-09; corrección de mayo de 2026 (OJ L 2026/90364, 7.5.2026): productos comercializados **después del 2026-12-08** | Software, hardware conectado y actualizaciones; transposición española **no recuperada** |
| RED — Directiva 2014/53/UE | Aplica 2016-06-13; transposición española RD 188/2016 (art. 9(8): instrucciones al menos en castellano) | Equipos radio: AIS receptor, WATCH celular, variantes Wi-Fi/BT |
| Reglamento Delegado (UE) 2022/30 | Aplicó desde **2025-08-01**; derogado por el Reglamento Delegado (UE) 2026/339 con efecto 2027-12-11 | Ciberseguridad de equipos radio hasta la transición al CRA |
| GPSR — Reglamento (UE) 2023/988 | Aplica 2024-12-13; versión consolidada actual 2026-05-29; art. 19 venta online | Seguridad, trazabilidad, información online y retirada |
| EMC 2014/30/UE; LVD 2014/35/UE; RoHS 2011/65/UE; WEEE 2012/19/UE; Baterías 2023/1542; Envases 2025/40 | Fechas registradas; varias transposiciones españolas **parcialmente recuperadas** | Hardware, residuos, sustancias, baterías y envases |
| RCD 2013/53/UE; MED 2014/90/UE | Aplicación condicionada al producto; sin wheelmark | Límite componente RCD y equipo de buque **sin determinar**; sin certificación marina |
| Consumo: CRD 2011/83/UE; CSD 2019/771/UE; DCD 2019/770/UE; UCPD 2005/29/CE; Precio 98/6/CE; TRLGDCU (RDL 1/2007); LSSI 34/2002; LCD 3/1991; LGP 34/1988 | Garantía legal española de 3 años, presunción 24 meses, desistimiento 14 días | B2C y B2B; los derechos imperativos no se sustituyen |
| RGPD 2016/679; LOPDGDD 3/2018; ePrivacy 2002/58/CE | Aplicación 2018-05-25 | Telemetría, localización, FLEET y cookies |
| PSD2 2015/2366; SCA 2018/389; IVA 2006/112/CE; OSS 282/2011; EUTMR 2017/1001 | IVA español 21 %; SCA aplicable; tipos de interés del registro | Pagos hosted/tokenizados, IVA/OSS, marca |

Fuentes no recuperadas (6) e inaccesibles (4) están marcadas como tales y **no
sostienen ninguna conclusión positiva de cumplimiento**. La tabla completa está
en D02 y en `data/legal-sources.json`.

## C. Responsabilidades potenciales de EMBARCARTE

Se han mapeado 11 roles potenciales (titular de marca, fabricante, ensamblador
OEM, importador, distribuidor, vendedor, instalador, proveedor SaaS, responsable
del tratamiento, encargado del tratamiento y operador de servicio) y 9
escenarios de suministro (producto propio, white-label importado, receptor
certificado de terceros, appliance Raspberry Pi, controlador Pico, sistema
instalado, servicio alojado, servicio de datos licenciados y SaaS de flota).

Conclusión: **EMBARCARTE no ostenta todavía ningún rol de forma documentada**.
La decisión es externa (`DEC-MC14-002`). Un certificado de módulo de terceros no
certifica el producto integrado; el importador debe identificarse y verificar la
conformidad; el vendedor responde de la información precontractual y la garantía;
el instalador responde de la instalación; el proveedor SaaS de la conformidad
digital, el CRA y el RGPD; el responsable/encargado del tratamiento de la
legitimidad y los acuerdos del art. 28.

## D. Conformidad por producto

| Familia | Evaluaciones | Posición | Bloqueo principal |
|---|---|---|---|
| NAV | 14 | A4/C2/N8 | Sin derechos de cartas oficiales; CRA; marca |
| HUB | 14 | A8/C4/N2 | Sin DoC/EMC; RED condicional; CRA |
| AIS | 14 | A7/C3/N4 | RED; receive-only; sin certificación NMEA |
| PILOT | 14 | A6/C6/N1/U1 | **Safety gate BLOCKED**; RCD sin determinar |
| SENSE | 14 | A6/C6/N2 | Sin medición de precisión; EMC |
| WATCH | 14 | A10/C1/N3 | Alerta/cobertura no demostradas; CRA |
| DISPLAY | 14 | A7/C5/N1/U1 | Hardware/runtime no congelados; RCD sin determinar |
| WEATHER | 14 | A3/C1/N10 | Sin derechos de proveedor; sin DPIA |
| FLEET | 14 | A2/C1/N11 | Sin DPA/DPIA; sin SLA; B2B |

Bundles: START A8/C4/N2, CRUISE A10/C2/N2, SAIL A7/C5/N1/U1, PROTECT
A10/C1/N3, COMPLETE A11/C1/N1/U1, FLEET A3/C6/N5. Ningún bundle es comprable:
`COMMERCIAL_AVAILABILITY = NOT_FOR_SALE`; los bundles con PILOT no pueden
venderse mientras la puerta de seguridad esté bloqueada.

## E. Riesgos legales

95 riesgos canónicos con propietario, estado, evidencia exigida, puerta y
decisión. Distribución: 29 CRITICAL, 62 HIGH, 4 MEDIUM. Ninguno se cierra en
MC-14. Los dominios son regulatorio, conformidad de producto, propiedad
intelectual, datos marinos, consumo/contratos, privacidad, ciberseguridad,
pagos/fiscalidad, responsabilidad, afirmaciones y web/comercio.

Riesgos críticos destacados: ausencia de evaluación de conformidad por SKU;
exposición a la PLD; PILOT sin caso de seguridad; plano de control sin
autenticación; recepción AIS sin evidencia RF; NMEA 2000 no implementado; marca
MAREA sin clearance; cadena de titularidad de OPEN-MARINE sin documentar; cartas
y meteorología sin derechos; ausencia total de seguro; afirmaciones públicas de
disponibilidad/precio/certificación prohibidas.

Mapa heredado: 58 bloqueos MC-02 (L9, S9, D10, H13, P10, X7) + 39 riesgos MC-11 +
23 bloqueos MC-12 + 14 bloqueos MC-13 = 134 registros mapeados, **0 cerrados, 0
eliminados, 0 cambios de estado**. Las 10 dependencias del handoff MC-13 están
consumidas sin alterar sus cálculos.

## F. Propiedad intelectual

- **OPEN-MARINE:** sin `LICENSE`, sin cesión de contribuidores, sin contrato
  laboral/mercantil documentado, sin historial previo acreditado. `SOURCE_IP_CLEARANCE
  = NOT_CLEARED`.
- **Componentes de terceros:** AIS-catcher GPL-3.0 (riesgo de distribución),
  ausencia de NOTICE/SBOM, dependencia con licencia desconocida, imágenes y
  firmware sin pinning. `rightsGranted = 0`.
- **Datos marinos:** cartas/ENC (IHM/IC-ENC) sin acuerdo; meteorología
  Open-Meteo/AEMET/MeteoGalicia sin derechos comerciales; teselas OSM/Esri/
  OpenWeather sin licencia; batimetría restringida a uso informativo; datos AIS
  sin política de retención/redistribución.
- **NMEA:** NMEA 2000 no implementado, sin membresía, códigos ni certificación;
  NMEA 0183 sin matriz probada.
- **Marca MAREA:** `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`,
  `MAREA_PUBLIC_USE = NO_GO`; existe un conflicto heredado con la política MC-03
  (clase A permitía la atribución pública de marca): prevalece la regla más
  estricta, se documenta como `MC14-BRAND-CONFLICT-01` y se propone la
  supersesión formal, sin editar la evidencia MC-03.

## G. Consumidores y contratos

Garantía legal de 3 años y presunción de 24 meses; desistimiento de 14 días con
excepciones; información precontractual completa; garantía comercial adicional
que **no** sustituye derechos legales; suscripciones con renovación,
cancelación, terminación y exportación de datos; devoluciones/RMA; bundles
mixtos. La provisión del 3 % del modelo financiero es **ilustrativa, no una tasa
medida**. No existe ningún contrato o plantilla aprobada (`TPL-01`…`TPL-08` en
borrador). B2C y B2B exigen contratos separados.

## H. Privacidad y ciberseguridad

- **RGPD:** 14 propósitos mapeados (cuenta, facturación, dispositivos,
  telemetría, WATCH, alertas, FLEET, analítica, soporte, seguridad, marketing,
  cookies, tripulación, exportación). No hay DPIA, DPA, inventario de
  tratamiento ni registro de subencargados. La DPIA es probablemente necesaria
  para localización/FLEET; el aislamiento multi-tenant no está probado. No se
  publica ninguna afirmación de cumplimiento.
- **CRA:** 14 requisitos esenciales y 12 controles de ciclo de vida, todos
  `NOT_MET`; 0 de los 52 requisitos de seguridad de dispositivo de MC-11
  ejecutados. La notificación de incidentes ya aplica desde 2026-09-11 y no hay
  proceso. Periodo de soporte `OPEN`; coste `UNKNOWN`. No hay certificación.

## I. Política de afirmaciones

Clases A/C/P/X con puerta de audiencia y estado de publicación. En MC-14 solo se
usan `INTERNAL_ONLY` y `PUBLIC_PROHIBITED`; **ninguna afirmación está autorizada
para publicación**. 42 pares ES/EN, 30 categorías prohibidas (disponibilidad,
stock, entrega, precio final, marca registrada, titularidad del código, cartas
oficiales, derechos meteorológicos, CE/RED/EMC, NMEA, certificación marina,
interoperabilidad universal, compatibilidad validada, conducción autónoma,
evitación de colisiones, alertas garantizadas, monitorización garantizada,
precisión de previsión, seguro, número de clientes, testimonios, cuota de
mercado, rentabilidad, break-even, retorno de inversión, financiación,
certificación de ciberseguridad, SLA, RGPD y seguridad de la vida).

Ejemplos internos conformes distinguen concepto, funcionalidad definida,
funcionalidad probada (ninguna), funcionalidad licenciada (ninguna) y producto
comercialmente disponible (ninguno). El texto bilingüe debe conservar clase,
estado, cifras y negación; una traducción que suaviza o endurece una afirmación
es otra afirmación, prohibida.

## J. Auditoría de la web (read-only)

34 hallazgos (6 BLOCKING, 20 MAJOR, 4 MINOR, 4 INFORMATIONAL) con ruta, archivo y
líneas reales, texto observado literal y remediación propuesta: identidad legal
vacía y aviso "pendientes de confirmación"; tienda/SEO que invita a comprar
productos no disponibles; afirmaciones de titularidad y "open source" de Open
Marine; "seguridad por diseño" del piloto sin caso de seguridad; consentimiento
de registro no enviado/almacenado; destinatarios de privacidad incompletos;
JSON-LD Product/Offer con precio/stock de administración; compatibilidad NMEA
2000/ST3000 sin probar; costes de envío tras el pedido; exclusión de
desistimiento demasiado amplia; términos de suscripción solo en borrador.

**No se modificó ningún archivo de la web, ruta, metadato, precio, checkout ni
despliegue.** Toda remediación es trabajo futuro de MC-15 bajo sus puertas.

## K. Pruebas y revisión independiente

| Prueba | Resultado |
|---|---|
| `npm run test:legal-commercial` | **54/54** comprobaciones |
| `npm run test:legal-commercial:unit` | **41/41** pruebas (incluye 40 controles negativos) |
| Mutaciones independientes del auditor | 19/19 detectadas |
| Productos / bundles / marca / mercado | 52/52, 35/35, 21/21, 40/40 |
| Investigación de clientes / recuperación | 62/62, 32/32 |
| Hardware / economía / finanzas | 54/54, 49/49, 77/77 |
| i18n / comercio / SEO / backup | PASS, PASS, PASS (101 URLs), PASS |
| Build / E2E / auditoría npm / format / diff | PASS / 15/15 / 0 vulnerabilidades / PASS / limpio |

La revisión independiente verificó ancestría y alcance Git, fuentes y fechas,
aplicabilidad, mapeo heredado, operadores económicos, RGPD/CRA, consumo,
aplicación de la política de afirmaciones, reconciliación datos-documentos y
mutaciones propias. Se aplicaron las correcciones A-01…A-10 (más A-11, A-13 y
A-17) en el commit de corrección y fueron re-verificadas antes de registrar el
veredicto. Ningún defecto BLOCKING o MAJOR queda abierto.

## L. Git y PR

- Rama: `feature/marea-mc14-legal-commercial-risk-claims-policy`.
- Base: MC-13 `f80c0f02ac14803e9e1539393abbb225d7f49e16`; PR #20 abierto, draft,
  mergeable, no fusionado.
- Commits: congelación de implementación `6fb2285`; corrección de auditoría
  `e32673e`; commit de registro y commit de SHA final (ver D23).
- PR: draft contra la rama MC-13, abierto y no fusionado (ver D23 para URL/estado
  exactos).
- `MERGED = false`, `DEPLOYED = false`. Sin cambios en `src/`, `public/`,
  `.github/` ni `deploy/`.

## M. Bloqueos externos

Ninguna de estas materias puede cerrarla un agente autónomo: designación de
abogado competente; decisión de operador económico; cesión/titularidad de
OPEN-MARINE; licencia de salida; registro y clearance de MAREA; estrategia de
cartas/ENC; proveedor meteorológico y licencias de teselas; estrategia del
decodificador AIS; participación en NMEA 2000; financiación del programa de
seguridad PILOT; modelo de fabricación; correduría y póliza de responsabilidad
civil/cíber; acuerdo de comercio y confirmación fiscal; DPO, DPIA y DPA;
clasificación CRA, periodo de soporte y ruta de conformidad; contrato de consumo,
B2B e instaladores; identidad legal y remediación web; registro de productor
(RAEE/RoHS/Baterías/Envases); autorización de lanzamiento (fuera de MC-14).

No se ha contactado a ningún proveedor, cliente, regulador, asegurador ni
abogado. No se ha inventado ninguna cotización, contrato, certificado, precio ni
dato de cliente.

## N. Handoff MC-15

El paquete de handoff está listo con huecos nombrados: vocabulario interno
aprobado, restricciones de marca pública (NO_GO), puertas de afirmaciones,
requisitos de footer legal, restricciones de páginas de producto/bundle,
privacidad/cookies, CTAs de comercio, datos estructurados, metadatos SEO,
inventario página a página y evidencia exigida antes de publicar disponibilidad
o precio. `MC15_STARTED = false`; no se ha ejecutado MC-15 ni modificado la web.

## Bloque de estado

```text
MC14_VERDICT = PARTIAL
MC14_INTERNAL_LEGAL_GOVERNANCE_SCOPE = PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE
MC14_REGULATORY_APPLICABILITY_MATRIX = PASS_INTERNAL_APPLICABILITY_ASSESSMENT
MC14_RISK_REGISTER = PASS_INTERNAL_RISK_REGISTER
MC14_CLAIMS_POLICY = PASS_INTERNAL_CLAIMS_GOVERNANCE
MC14_BILINGUAL_CLAIMS = PASS_INTERNAL_BILINGUAL_CATALOGUE
MC14_LEGAL_SOURCE_RESEARCH = PARTIAL_PRIMARY_SOURCE_RESEARCH
MC14_INDEPENDENT_REVIEW = PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE

MC14_EXTERNAL_LEGAL_CLEARANCE = NOT_GRANTED
MC14_CERTIFICATION_APPROVAL = NONE
MC14_COMMERCIAL_CLAIMS_PUBLICATION = NOT_AUTHORIZED

MC13_VERDICT = PARTIAL
MC13_INTERNAL_FINANCIAL_SCOPE = PASS_INTERNAL_FINANCIAL_SCOPE
MC13_EXTERNAL_COMMERCIAL_VALIDATION = BLOCKED_OR_NOT_OBTAINED

TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
SOURCE_IP_CLEARANCE = NOT_CLEARED
PRICE_APPROVED = NONE
LICENSING_RIGHTS_GRANTED = false
CUSTOMER_WTP_VALIDATED = false
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE

PR_CREATED = true
MERGED = false
DEPLOYED = false
MC15_STARTED = false
```

> Este informe es gobernanza interna. No constituye asesoramiento jurídico ni
> acredita cumplimiento, certificación, seguro, licencia o disponibilidad
> comercial. Ningún producto MAREA puede ofrecerse mientras las puertas de
> liberación y la validación externa sigan abiertas.
