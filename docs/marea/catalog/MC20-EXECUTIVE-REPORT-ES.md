# MC-20 — Informe ejecutivo (ES)

## 1. Resultado

Se ha implementado el catálogo interno bilingüe de la primera tanda de producto —**NAV, HUB y
AIS**— sobre la base verificada de MC-18 (`3490c0f`), sin heredar la implementación de MC-19 y sin
tocar la aplicación pública, el sistema de diseño MC-17 ni el landing MC-18.

- `MC20_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE`
- `MC20_VERDICT = PARTIAL` (autorizaciones externas pendientes)
- Entrega: rama `feature/marea-mc20-nav-hub-ais-catalog` y PR en borrador. Sin fusión, sin
  despliegue y sin publicación.

## 2. Qué se ha construido

- Un único árbol de componentes Angular para tres familias y dos idiomas, con 11 secciones por
  ficha: portada, visión general, capacidades, especificaciones, composición, ediciones,
  limitaciones, ecosistema, preparación, documentación y cierre.
- Una proyección determinista de los datos canónicos de MC-16 (3 familias, 6 ediciones, 6 paquetes
  que las referencian, 11 dimensiones de preparación). No se ha creado una segunda fuente de datos.
- Reutilización verificada de 18 componentes MC-17 y de dos marcos de sección de MC-18 y del adaptador comercial fail-closed: no
  existe botón de compra, carrito, precio ni stock.
- Seis rutas internas de vista previa (`internal/catalog/{nav,hub,ais}` y sus equivalentes EN),
  sólo en bucle local, con cabecera `noindex`, lista de hosts permitidos y CSP `form-action 'none'`.
- 121 bloques de contenido únicos, cada uno con clase de evidencia y referencias a documentos
  canónicos existentes.

## 3. Diferencias reales entre las tres familias

- **NAV** es software: no incluye hardware propio; las cartas, mareas y corrientes dependen de la
  licencia del cliente.
- **HUB** es hardware con hardware no seleccionado y BOM no congelada: no se publican puertos,
  radios, procesador ni consumo.
- **AIS** es **sólo recepción**: no es un transpondedor, no transmite, no es DSC, no es
  anticolisión ni navegación. Su decodificador externo GPL-3.0 sigue bloqueado (DEC-04).

## 4. Verificación

| Prueba | Resultado |
| --- | --- |
| Validador MC-20 | 40/40 |
| Pruebas unitarias y adversarias MC-20 | 21/21 |
| Playwright MC-20 (SSR, hidratación, paridad, teclado, responsive, axe, aislamiento) | 35/35 |
| Build de producción | PASS, 96 rutas prerenderizadas, 0 identificadores del catálogo |
| i18n, comercio, SEO | PASS |
| Productos / paquetes / datos de comercio | 52/52, 35/35, 1834/1834 |
| Landing MC-18 (unitarias / E2E) | 45/45 y 44/44 |
| Validador MC-18 en esta rama | 59/60 antes del commit (MC18-56) y 59/60 después (MC18-30): una comprobación de alcance de rama que depende del estado de commit, no una regresión |
| `FINANCIAL_V18` | FAIL heredado (76/77); se conserva como fallo explícito |

## 5. Riesgos y límites que permanecen

- Puertas legales y comerciales sin cambios: marca `NOT_GRANTED`, uso público `NO_GO`, PI
  `NOT_CLEARED`, licencias `false`, precio `NONE`, disponibilidad `NOT_FOR_SALE`, publicación e
  indexación `false`, despliegue `NOT_AUTHORIZED`, privacidad `BLOCKED`.
- Compatibilidad medida: 0 filas. No se afirma interoperabilidad NMEA.
- Revisión profesional del inglés: pendiente.
- Revisión manual de accesibilidad (WCAG 2.2 AA y tecnologías de asistencia): pendiente; axe no es
  conformidad.
- Deuda heredada visible: `FINANCIAL_V18`, `MC16_FINAL_02`, MC-13 F-05/F-11/F-14 y MC-15
  GSC-01/GSC-02.

## 6. Recomendación

Mantener el veredicto global **PARTIAL**, no fusionar ni publicar, y no iniciar MC-21. El siguiente
paso autorizable es resolver las autorizaciones externas y la revisión profesional del inglés; el
catálogo interno ya está listo para revisión de producto.
