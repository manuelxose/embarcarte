# MC-19/36 — Informe ejecutivo (ES)

| Campo                                 | Valor                                                                                        |
| ------------------------------------- | -------------------------------------------------------------------------------------------- |
| Hito                                  | MC-19/36 — páginas de segmento y flujos de consulta (armadores, instaladores, profesionales) |
| Alcance ejecutado                     | OPTION A — tres páginas internas bilingües de audiencia                                      |
| Rama                                  | `feature/marea-mc19-internal-audience-pages`                                                 |
| Baseline                              | `ba63baa0e529ab9cb482fd929632d359fec1d328`                                                   |
| Commit de implementación              | `cc3a62cb28da3a6c21dce16ee07580edb216debd`                                                   |
| Commit de correcciones (ronda 1)      | `102c6f14f313c96c7dd0a39212add5642a3cb5f8`                                                   |
| PR                                    | [#27](https://github.com/manuelxose/embarcarte/pull/27) — draft, sin merge                   |
| PR previo preservado                  | [#26](https://github.com/manuelxose/embarcarte/pull/26) — draft, sin merge                   |
| Publicación / indexación / despliegue | `NOT_AUTHORIZED`                                                                             |
| Veredicto global                      | `MC19_VERDICT = PARTIAL`                                                                     |

## 1. Resumen ejecutivo

La instrucción de ejecución de MC-19, entregada por el product owner solicitante el 2026-11-04,
autorizó el alcance interno **OPTION A**: tres páginas de audiencia bilingües
(`professionals`, `installers`, `shipowners`), sin flujos de consulta ni captación de datos, dentro
de la previsualización aislada en loopback. Esa instrucción se ha registrado con su procedencia real
en `MC19-IMPLEMENTATION-CONTRACT.md` y `data/mc19-scope-instruction.json`; no se atribuye a ninguna
autoridad distinta del product owner y las aprobaciones externas se registran como **OUTSTANDING**,
no como concedidas.

El resultado es una implementación interna completa y verificable: un único árbol de componentes
para tres audiencias y dos idiomas, ocho secciones por página, contenido bilingüe tipado con
evidencia resoluble, reutilización verificada del sistema de diseño MC-17, acciones deliberadamente
deshabilitadas y aislamiento estricto respecto a la aplicación pública. No se ha creado ninguna ruta
pública, formulario, endpoint de negocio, almacén de leads, precio, compra, sitemap, canonical,
hreflang ni JSON-LD.

El veredicto global es **PARTIAL**, no PASS: la ingeniería interna está completa, pero las
autorizaciones legal, comercial, de privacidad y de publicación siguen sin resolverse.

## 2. Qué se ha implementado

| Identidad       | Entidad                                         | Ruta interna ES / EN                                                       | Ruta pública                   |
| --------------- | ----------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------ |
| `professionals` | `ENT-PAGE-PROFESSIONALS` (MC-15)                | `/internal/segments/professionals` · `/en/internal/segments/professionals` | ninguna                        |
| `installers`    | `ENT-PAGE-INSTALLERS` (MC-15)                   | `/internal/segments/installers` · `/en/internal/segments/installers`       | ninguna                        |
| `shipowners`    | `ENT-INTERNAL-SHIPOWNERS` (nueva, solo interna) | `/internal/segments/shipowners` · `/en/internal/segments/shipowners`       | ninguna; no se reserva ninguna |

Cada página contiene: introducción específica de audiencia; límite semántico («para quién es / para
quién no es»); referencias canónicas a familias de producto; casos de uso basados en evidencia;
capacidades con límite obligatorio; contexto de arquitectura/ecosistema; disponibilidad y
preparación derivadas; referencias documentales con estado real; y un cierre con acción
deshabilitada de forma segura.

Cifras del contenido: 313 bloques por idioma (104/104/105 por audiencia), 41 bloques compartidos,
708 registros bilingües resueltos, 18 fuentes de evidencia y 8 secciones con anclas estables.

## 3. Decisión de arquitectura de información

`shipowners` es una identidad **nueva y solo interna**: MC-15 no define ruta, entidad ni tipo de
página para armadores, por lo que no se crea ni se reserva ninguna ruta pública. `professionals` e
`installers` reutilizan sus identidades MC-15 y sus rutas públicas propuestas quedan como referencia
de planificación, **sin registrar**.

Se documenta explícitamente que «armador» no es un único público: la página trata al **armador
particular de una embarcación de recreo** y excluye al armador comercial, a los buques mercantes y a
la flota profesional. `FLEET` es una solución B2B contratada y no se presenta como producto de
armador.

La comprobación de colisiones es determinista: 0 colisiones con las 21 rutas públicas y con las 23
rutas propuestas de MC-15 (validador MC19-I02).

## 4. Diseño y reutilización

Se reutilizan 15 módulos del sistema MC-17, entre ellos `marea-theme`, `marea-text`,
`marea-notice`, `marea-responsive-nav`, `marea-family-card`, `marea-readiness-panel`,
`marea-commercial-cta`, `marea-definition-list` y `marea-button`. No se ha modificado ni bifurcado el
sistema de diseño: el diff de `src/app/marea-design-system` es vacío y el validador rechaza
selectores duplicados y definiciones de tokens propios (MC19-I07).

La página usa composición propia solo para cáscara y secciones; no hay una segunda biblioteca de
componentes. Se reutilizan también `marea-landing-section` y `marea-landing-sheet-index` del MC-18
sin modificar el landing.

## 5. Bilingüismo

Un único origen de contenido (`src/app/marea-segments/content/index.ts`) alimenta un único árbol de
componentes. Cada bloque tiene `contentId` estable, `sectionId`, `copyClass`, `evidenceIds` y los
literales fijos `INTERNAL_DRAFT_NOT_APPROVED` / `NOT_APPROVED`. El validador comprueba paridad
estructural, ausencia de español sin traducir en inglés, resolución de evidencias y ausencia de
afirmaciones prohibidas o importes monetarios (MC19-I03/I04/I05/I06).

Límite declarado: la copia inglesa es redacción interna, no una traducción profesional revisada
(riesgo R20). No se afirma calidad de traducción.

## 6. Aislamiento y seguridad de la previsualización

- Enlace exclusivo a `127.0.0.1` y lista de hosts permitidos; un `Host` no loopback recibe **403**.
- `X-Robots-Tag: noindex, nofollow, noarchive` y meta `robots` en todas las páginas.
- CSP con `default-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'` y `form-action 'none'`;
  se documenta que `style-src`/`script-src` siguen permitiendo `'unsafe-inline'`.
- Todas las rutas de previsualización usan `RenderMode.Server`; no hay prerender ni artefacto
  estático indexable.
- Sin formularios, `<input>`, `fetch`, `HttpClient`, almacenamiento, cookies, analítica ni servicios
  externos en el módulo o el host de previsualización.
- La aplicación pública no importa el módulo; el bundle de producción contiene **0** identificadores
  de MC-19 y las rutas internas, `/marea`, `/en/marea`, `/profesionales`, `/instaladores` y
  `/armadores` devuelven **404** en el servidor de producción.

## 7. Puertas legales y comerciales (sin cambios)

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
GATE-PRIVACY-DPA-DPIA = BLOCKED
DOC-17 (acuerdos de instalador/distribuidor) = NOT_EXECUTED
```

13 puertas MC-14, 0 cerradas; 24 documentos exigidos, 0 ejecutados; 42 claims, 0 autorizados
públicamente. Ninguna aprobación externa se ha cerrado ni reinterpretado.

## 8. Verificación ejecutada

| Comando                                                            | Resultado observado                                                                   |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `npm run test:mc19`                                                | 17/17 PASS                                                                            |
| `npm run test:mc19:unit`                                           | 43/43 PASS                                                                            |
| `npm run test:mc19:e2e`                                            | 22/22 PASS                                                                            |
| `npm run test:mc19-scope`                                          | 24/24 PASS (v1 preservado; supersesión validada)                                      |
| `npx tsc -p tsconfig.app.json --noEmit`                            | exit 0                                                                                |
| `npx tsc -p preview/landing/tsconfig.json --noEmit`                | exit 0                                                                                |
| `npm run build`                                                    | exit 0                                                                                |
| `npm run test:landing:e2e`                                         | 44/44 PASS                                                                            |
| `npm run test:commerce-data`                                       | PASS                                                                                  |
| `npm run test:i18n` / `test:commerce` / `test:seo` / `test:backup` | PASS                                                                                  |
| `npm run test:design-system` / `:unit`                             | 38/38 y 41/41 PASS                                                                    |
| `npm run test:landing:unit` / `check:landing:data`                 | 45/45 PASS; artefactos vigentes                                                       |
| `npm run format:check`                                             | PASS                                                                                  |
| `npm run test:landing` (validador MC-18)                           | 58/60; solo fallan MC18-30 y MC18-56, comprobaciones de alcance de rama no aplicables |
| `npm run test:financial`                                           | **FAIL V-18** — deuda heredada, reportada en rojo                                     |

Detalle y rastros en `MC19-TEST-REPORT.md` y en `docs/marea/segments/evidence/`.

## 9. Revisión independiente

La ronda 1 (revisor independiente, Claude Opus 5.5, auditoría estática) devolvió
**NEEDS_REVISION** con 3 hallazgos MAJOR y 13 menores/informativos: afirmaciones documentales
prematuras, regresión de navegador del MC-18 no ejecutada, sobreafirmación sobre una «matriz
publicada», evidencia de aislamiento débil, desajuste de HEAD en evidencias, guardas de claims
mejorables, contradicción en el traspaso a MC-20, lista de artefactos preservados inexacta,
supersesión sin validar, «derivado en servidor», deriva bilingüe, CSP incompleta, exports muertos y
errata documental.

Las correcciones se registran en el commit `102c6f1`: se corrigió el contenido, se reforzaron las
guardas (incluidos importes en todas sus formas), se validó el registro de supersesión, se midieron
las pruebas de aislamiento, se escanearon los bundles de navegador y servidor, se eliminaron exports
muertos y se alineó el traspaso a MC-20.

Ronda 2 (auditor nativo independiente, `deepseek-v4-pro`, con acceso completo a shell):
**NEEDS_REVISION**, sin defecto BLOCKING de seguridad o publicación, con 2 hallazgos MAJOR de
integridad de evidencia (evidencia comprometida desactualizada y ausencia del registro de auditoría)
y 4 menores. El auditor ejecutó de forma independiente: validador 17/17, unitarios 43/43, guardia de
alcance 24/24, ambos `tsc` en 0, build de previsualización en 0 con 0 rutas prerenderizadas,
Playwright 22/22, `test:commerce-data` 1832/1832 y escaneo del bundle de producción con 0
identificadores; los diffs de sistema de diseño, landing y propuesta v1 estaban vacíos.

Las correcciones de ronda 2 se registraron en el commit de cierre `3f19601` y en un commit posterior
**solo de evidencias** `65d1f6d` (un commit no puede contener evidencia que nombre su propio hash).

Ronda 3 (re-verificación del mismo auditor independiente): **PASS_INTERNAL_SCOPE**, con IR2-01 e
IR2-02 cerrados y sin hallazgos BLOCKING/MAJOR nuevos. Queda un único residuo MINOR (IR3-01:
unificar la redacción del veredicto), corregido en el commit de documentación final. El detalle está
en `MC19-INDEPENDENT-AUDIT.md` y `data/mc19-implementation-review.json`.

## 10. Estado de entrega

- Rama `feature/marea-mc19-internal-audience-pages` creada desde el baseline verificado
  `ba63baa0e529ab9cb482fd929632d359fec1d328`.
- PR #27 en **draft**, con base en el PR #26 (también draft). PR #26 preservado.
- Sin merge, sin despliegue, sin publicación, sin indexación, sin sitemap.
- MC-20 no iniciado.

## 11. Riesgos y deuda heredada

Registro: 20 riesgos, 6 BLOCKER, 6 HIGH, 8 MEDIUM; 4 cerrados (R01, R02, R08, R13).
Riesgos nuevos R15–R20: build reutilizado en la previsualización, ruta pública de armadores no
autorizada, prerender accidental, datasets obsoletos, divergencia entre fuente y página renderizada y
falta de revisión profesional de la traducción.

Deuda heredada intacta: `FINANCIAL_V18 = INHERITED_OPEN`, `MC16_FINAL_02 = OPEN_UNTIL_REVERIFIED`,
`MC13_F05/F11/F14 = OPEN`, `MC15_GSC01/GSC02 = OPEN`.

## 12. Recomendación

Mantener el veredicto global **PARTIAL**, no fusionar ni publicar, y no iniciar MC-20. El siguiente
paso es la decisión del owner sobre las autorizaciones externas (marca, propiedad intelectual y
licencias, copy público y claims, datos comerciales y precio, publicación/indexación y privacidad) y,
si se desea activación pública, un nuevo hito con auditoría manual de accesibilidad y revisión
profesional de traducción.
