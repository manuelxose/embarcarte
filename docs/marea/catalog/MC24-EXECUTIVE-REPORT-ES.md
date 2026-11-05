# MC-24 — Informe ejecutivo (ES)

**Hito:** MC-24 — Configurador de compatibilidad y triaje de cotizaciones
**Rama:** `feature/marea-mc24-configurator` (local, sin fusionar)
**Base verificada:** `7ed6ae6` — rama de integración de MC-23
**Alcance interno:** autorizado. **Estado externo:** sin cambios, todo bloqueado.
**Versión del informe:** ligada a la revisión de entrega; ver §6.

---

## 1. Resumen ejecutivo

MC-24 implementa el **configurador de compatibilidad y el triaje de cotizaciones**
definidos en la entrada 24 del registro maestro de los 36 hitos. No se ha
reinventado el alcance: se ha ejecutado el alcance documentado.

Lo entregado es una aplicación real, no una maqueta:

- un **motor determinista** que resuelve una configuración a exactamente **uno de
  los cuatro resultados** de la política de compatibilidad D5 (§9.2);
- un **triaje interno** que clasifica la consulta en una cola de tratamiento;
- una **interfaz bilingüe ES/EN real** en Angular 21, servida en la preview interna
  (solo loopback, sin indexación);
- un **validador** con 13 comprobaciones, **25 pruebas adversarias** y **17 pruebas
  fin a fin** sobre el servidor real.

El resultado más importante es un **"no" honesto**: hoy **no existe ninguna fila de
compatibilidad comprobada**, de modo que el resultado «instalación propia válida»
(`ELIGIBLE_SELF_INSTALL`)**no es alcanzable**. Eso no es una limitación aceptada a
regañadientes: es la regla de gobierno heredada de D5 y está **probada por tests**,
no solo documentada.

---

## 2. Verificación del traspaso de MC-23

El estado real se ha comprobado, no se ha heredado.

| Comprobación                                       | Resultado      |
| -------------------------------------------------- | -------------- |
| HEAD `7ed6ae6` en `feature/marea-mc23-integration` | **Verificado** |
| Divergencia respecto a MC-22 (`6ad4fec`)           | 22 commits     |
| Árbol de trabajo limpio                            | Sí (0 cambios) |
| Validador MC-20/MC-22                              | 56/56          |
| Validador MC-23                                    | 15/15          |
| Pruebas unitarias MC-23                            | 16/16          |
| TypeScript                                         | PASS           |
| Compilación real de la preview                     | exit 0         |

Las cifras heredadas **se reproducen** sobre la rama real. MC-23 es una dependencia
verificada, así que MC-24 parte de ella. **MC-23 no se ha fusionado en `main`** y no
se ha hecho ninguna fusión, publicación ni despliegue.

---

## 3. Hallazgos de seguridad heredados

Los dos hallazgos medios de MC-23 se han **reproducido antes de corregirlos** y se
han cerrado con evidencia:

| ID       | Defecto                                                                                                              | Estado                                                                                                       |
| -------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **F-01** | «disponible ya» y «ya disponible» eludían el control de disponibilidad                                               | **CERRADO Y VERIFICADO** — reproducido; ahora rechazado; 6 negaciones legítimas siguen permitidas            |
| **F-02** | «garantizado» y «soporte garantizado» eludían el control de garantías                                                | **CERRADO Y VERIFICADO** — reproducido; ahora rechazado; «sin garantizar»/«not guaranteed» siguen permitidos |
| **F-16** | **Nuevo:** el control de dimensiones confundía la comilla de un atributo HTML (`aria-label="MC-24"`) con una pulgada | **CERRADO Y VERIFICADO** — `24"`, `7 pulgadas` y `120 mm` siguen rechazándose                                |

**Por qué estaban en el alcance.** El configurador introduce texto comercial nuevo y
por tanto **depende** de ese control: sin corregirlo, el contenido nuevo podría
publicar una promesa comercial inferida. La corrección es un alcance de seguridad
compartido, acotado y documentado; no se modificó ninguna otra regla.

**Limitación que no se oculta:** el control por palabras clave es un **respaldo
heurístico, no una demostración de ausencia**. No valida exhaustivamente todas las
afirmaciones comerciales en lenguaje natural y este hito **no afirma lo contrario**.

Los hallazgos F-2 y F-15 siguen **abiertos**: pertenecen al hito MC-25, quedan
registrados y siguen siendo reproducibles.

---

## 4. La lección de MC-23: la compilación real como puerta

MC-23 dio por bueno un chequeo de TypeScript que pasaba mientras un enlace de
plantilla Angular era inválido; el fallo (`NG8002`/`NG8008`) solo apareció en la
compilación de la preview.

MC-24 no repite el error y, además, **demuestra que la puerta puede fallar**:

1. compila de verdad la preview y la aplicación de producción;
2. inyecta **un enlace de plantilla inválido** en una copia desechable del
   componente real y exige que el compilador de Angular lo rechace **nombrando el
   miembro inyectado**:
   `TS2339: Property 'mc24DeliberatelyMissingBinding' does not exist`;
3. rechaza como evidencia cualquier fallo que ocurra por una razón no relacionada.

Esta exigencia no es teórica: durante el desarrollo **detectó 37 errores de
plantilla** que el chequeo de tipos no habría certificado, y detectó también que la
primera versión de la propia puerta fallaba por un motivo equivocado. Ambos
defectos se corrigieron antes de la entrega.

---

## 5. Resultados de verificación

| Prueba                                       | Resultado                                 |
| -------------------------------------------- | ----------------------------------------- |
| TypeScript (dos proyectos)                   | PASS                                      |
| Validador MC-20/MC-22 (regresión)            | 56/56                                     |
| Validador MC-23 (regresión)                  | 15/15                                     |
| Unitarias MC-23 (regresión)                  | 16/16                                     |
| Validador MC-24                              | **13/13**                                 |
| Pruebas adversarias MC-24                    | **25/25**                                 |
| Compilación real + enlace inválido rechazado | **PASS**                                  |
| Playwright catálogo (incl. 17 MC-24)         | **101/101**                               |
| i18n / SEO / comercio (aplicación pública)   | PASS / PASS / PASS                        |
| Aislamiento del bundle de producción         | 0 identificadores; 96 rutas (sin cambios) |

### Accesibilidad: lo que sí y lo que no se ha hecho

- **Hecho:** axe en navegador real, 0 violaciones críticas o graves, tanto en el
  estado inicial como tras clasificar, en **ambos idiomas**; recorrido completo por
  teclado; sin desbordamiento horizontal a 320/390/768/1440.
- **NO hecho:** pruebas con **lector de pantalla = NO EJECUTADAS**.
- **NO se afirma conformidad WCAG**: las comprobaciones automáticas no la demuestran.

---

## 6. Privacidad, seguridad y aislamiento

- La preview escucha **solo en loopback**, rechaza cabeceras `Host` externas y en
  todas las respuestas envía `X-Robots-Tag: noindex, nofollow, noarchive`.
- La política CSP incluye `form-action 'none'`: el formulario **no puede enviarse a
  ningún sitio**.
- **No** hay recogida de datos personales, correo, cookies, almacenamiento local ni
  llamadas de red.
- **No** hay precio, compra, reserva, stock ni estado pedible.
- Las rutas públicas propuestas (`/marea/configurador`, etc.) devuelven **404**.

---

## 7. Restricciones externas (sin cambios)

```text
TRADEMARK_LEGAL_CLEARANCE   = NOT_GRANTED
MAREA_PUBLIC_USE            = NO_GO
SOURCE_IP_CLEARANCE         = NOT_CLEARED
LICENSING_RIGHTS_GRANTED    = false
PRICE_APPROVED              = NONE
COMMERCIAL_AVAILABILITY     = NOT_FOR_SALE
PUBLICATION_AUTHORIZED      = false
INDEXATION_AUTHORIZED       = false
PRODUCTION_DEPLOYMENT       = NOT_AUTHORIZED
GATE-PRIVACY-DPA-DPIA       = BLOCKED
```

El éxito de ingeniería interno **no** es aprobación externa. MC-24 no modifica
ninguna de estas puertas.

---

## 8. Deuda heredada (estado preservado)

`FINANCIAL_V18` (fallo preexistente) · `MC16_FINAL_02` · MC-13 F-05/F-11/F-14 ·
MC-15 GSC-01/GSC-02 · DEC-04 (licencias AIS) · selección de hardware del HUB ·
**cero filas de compatibilidad verificadas** · revisión profesional del inglés ·
pruebas manuales WCAG 2.2 AA y con tecnología de asistencia · MC-19 AC08 · deuda de
nombres del validador compartido · **MC-23 F-2/F-15 (abiertos, asignados a MC-25)** ·
**6 archivos de MC-23 sin formatear** (preexistentes en `7ed6ae6`, no reescritos
aquí) · limitaciones conocidas de la validación heurística.

---

## 9. Veredicto

Con la evidencia ejecutada a la revisión de entrega:

**MC24_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE**
**MC24_VERDICT = PARTIAL**

`PARTIAL` y no `PASS` porque las autorizaciones externas siguen pendientes
(clearance de marca, derechos de propiedad intelectual, precio, publicación,
indexación, despliegue y DPA/DPIA). Además quedan abiertos, de forma explícita: F-2,
F-15, la revisión profesional del inglés y las pruebas manuales de accesibilidad.

Nada se ha fusionado, desplegado ni publicado. **MC-25 no se ha iniciado.**
