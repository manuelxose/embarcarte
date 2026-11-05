# MC-18 — Política de copy bilingüe y evidencia (D05)

Este documento describe cómo se ha producido la única fuente de contenido de la landing
corporativa interna de MAREA (MC-18), qué evidencia respalda cada bloque, qué claims se
reutilizan y qué limitaciones siguen abiertas. No es una aprobación de publicación ni una
opinión legal.

## 1. Estado y clasificación

| Campo                                    | Valor                                                                                                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Documento                                | D05 / MC18-BILINGUAL-COPY-AND-EVIDENCE-POLICY                                                                                                            |
| Milestone                                | MC-18                                                                                                                                                    |
| Owner del contenido                      | Agent C — Bilingual Content Architect                                                                                                                    |
| Autoridad de aprobación                  | Lead del programa (no concedida)                                                                                                                         |
| Fecha                                    | 2026-11-03                                                                                                                                               |
| Método de generación                     | Autoría manual sobre los contratos internos (`content.types.ts`, `evidence.ts`, claims MC-14 y datos canónicos MC-16); sin generación automática de copy |
| Fuente única de contenido                | `src/app/marea-landing/content/landing-content.ts`                                                                                                       |
| `publicationStatus` de todos los bloques | `INTERNAL_DRAFT_NOT_APPROVED`                                                                                                                            |
| `approvalStatus` de todos los bloques    | `NOT_APPROVED`                                                                                                                                           |
| Autorización de publicación              | NINGUNA (`publicationAuthorization: NONE`, 0 de 42 claims públicos autorizados)                                                                          |
| Estado del documento                     | Borrador interno de trabajo; no es copia pública, no es oferta comercial y no es aprobación legal                                                        |

El estado anterior está fijado en el contrato de tipos y en este documento. Ningún flag de
build, parámetro de consulta ni variable de entorno puede promover un bloque a aprobado.

## 2. Fuente de verdad

1. `src/app/marea-landing/content/content.types.ts` define la forma del contenido. La landing
   se renderiza desde un único árbol de componentes y dos locales; no existe una segunda
   implementación ES/EN.
2. `src/app/marea-landing/content/landing-content.ts` es la única fuente de frases de la
   landing. Toda frase renderizable es un `ContentBlock` tipado con procedencia y estado.
3. `src/app/marea-landing/content/evidence.ts` es el registro cerrado de evidencia. Un
   `evidenceId` que no resuelva allí es un defecto.
4. `docs/marea/legal-commercial/data/claims-policy.json` y
   `docs/marea/legal-commercial/data/bilingual-claims.json` gobiernan qué se puede afirmar y
   con qué clase (A/C/P/X).
5. `docs/marea/commerce-data/data/product-families.json`, `product-editions.json` y
   `bundle-compositions.json` son la fuente canónica de hechos de producto (familias,
   ediciones y paquetes).
6. Si dos fuentes entran en conflicto, prevalece la más restrictiva. La ausencia de evidencia
   nunca se interpreta como evidencia de ausencia ni como permiso.

## 3. Contrato de contenido

Cada bloque de `landing-content.ts` cumple los campos de `ContentBlock`:

| Campo                 | Tipo                | Regla aplicada                                                                         |
| --------------------- | ------------------- | -------------------------------------------------------------------------------------- |
| `contentId`           | `string`            | Único en toda la landing; estable; con prefijo de sección                              |
| `sectionId`           | `LandingSectionId`  | Una de las diez secciones congeladas, en camelCase (`softwareHardware`)                |
| `sourceType`          | `ContentSourceType` | `INTERNAL_DOCUMENT`, `CANONICAL_DOMAIN_DATA`, `RELEASE_GATE_RECORD` o `AUTHORED_DRAFT` |
| `copyClass`           | `CopyClass`         | `INTERNAL_EVIDENCED`, `PROPOSED_INTENT`, `CONSTRAINT_STATEMENT` o `NAVIGATIONAL`       |
| `evidenceIds`         | `readonly string[]` | Al menos un id del registro; todos resuelven                                           |
| `publicationStatus`   | literal             | `INTERNAL_DRAFT_NOT_APPROVED`                                                          |
| `approvalStatus`      | literal             | `NOT_APPROVED`                                                                         |
| `text.es` / `text.en` | `string`            | Ambos presentes, no vacíos, semánticamente equivalentes                                |

**Decisión sobre `claimIds`:** el contrato actual de `ContentBlock` no expone un campo
`claimIds`; el helper de autoría lo habría admitido solo si el tipo lo declarase. Para no
inventar un campo fuera del contrato, la reutilización de claims se documenta en §5 y se
refleja en `evidenceIds` con `EV-MC14-BILINGUAL-CLAIMS` donde corresponde. Si el contrato
incorpora `claimIds` más adelante, la atribución podrá añadirse sin cambiar el texto.

## 4. Registro de evidencia

Todos los ids usados en `landing-content.ts` resuelven en `evidence.ts`. La columna «Bloques»
cuenta cuántos bloques citan cada id (un bloque puede citar varios).

| Evidencia                  | Ruta de origen                                                    | Qué establece                                                                                                                                             | Bloques |
| -------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `EV-MC16-FAMILIES`         | `docs/marea/commerce-data/data/product-families.json`             | Identidad canónica de las nueve familias, ciclo de vida, dimensiones de readiness y estado comercial (`NOT_FOR_SALE`, 0 precios aprobados)                | 62      |
| `EV-MC05-PRODUCTS`         | `docs/marea/products/product-definitions.batch-01.json`           | Definiciones de producto: estado de seguridad de PILOT, alcance de solo escucha de AIS y funcionalidad prevista por familia                               | 60      |
| `EV-MC16-BUNDLES`          | `docs/marea/commerce-data/data/bundle-compositions.json`          | Seis paquetes: composición, líneas no elegibles/solo contrato, FLEET como solución contratada, `hardwareIncludedByDefault=false` y `slaEstablished=false` | 37      |
| `EV-MC14-CLAIMS`           | `docs/marea/legal-commercial/data/claims-policy.json`             | Política de claims: 42 claims catalogados, 0 autorizados públicamente, 30 categorías prohibidas, `publicationAuthorization: NONE`                         | 35      |
| `EV-MC11-HARDWARE`         | `docs/marea/hardware/data/conformity-applicability.json`          | Sin hardware seleccionado, sin evidencia de conformidad, sin afirmación de marcado y sin filas de compatibilidad probadas                                 | 22      |
| `EV-MC17-HANDOFF`          | `docs/marea/design-system/MC17-MC18-HANDOFF.md`                   | Handoff verificado del design system: contrato de reutilización, límites de modo, restricciones de CTA y regla de no publicación                          | 19      |
| `EV-MC16-EDITIONS`         | `docs/marea/commerce-data/data/product-editions.json`             | 26 ediciones canónicas, estado de definición, requisito de cotización, `merchantable=false` y `priceApproved=false`                                       | 17      |
| `EV-MC14-GATES`            | `docs/marea/legal-commercial/data/release-evidence-gates.json`    | 13 puertas de release, 0 cerradas; 24 documentos requeridos, 0 ejecutados; aprobaciones externas ausentes                                                 | 15      |
| `EV-MC18-IMPLEMENTATION`   | `src/app/marea-landing/landing.ts`                                | Esta implementación: vista previa aislada, reutilización real de componentes MC-17, sin ruta pública y sin acción comercial                               | 11      |
| `EV-MC04-BRAND`            | `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md`              | MAREA es una marca propuesta: clearance `NOT_GRANTED`, uso público `NO_GO`, adopción de identidad final bloqueada                                         | 5       |
| `EV-MC15-INDEXATION`       | `docs/marea/information-architecture/data/indexation-policy.json` | Rutas propuestas excluidas de sitemap e indexación hasta autorización de publicación                                                                      | 5       |
| `EV-MC14-BILINGUAL-CLAIMS` | `docs/marea/legal-commercial/data/bilingual-claims.json`          | Pares ES/EN internos de clase A reutilizables como fuente de borrador interno, y ejemplos prohibidos P/X                                                  | 3       |
| `EV-MC15-ROUTES`           | `docs/marea/information-architecture/data/proposed-routes.json`   | Identidad de ruta congelada `mareaOverview` / `ENT-HUB-MAREA` / `PAGE_MAREA_OVERVIEW` en `/marea` y `/en/marea`, publicación no autorizada                | 2       |

## 5. Política de reutilización de claims

Solo se reutiliza redacción de **clase A con estado `INTERNAL_ONLY`**. Los claims de clase C
(condicionales) no se usan porque ninguna evidencia adjunta existe; los de clase P
(prohibidos en el estado actual) y X (prohibidos en absoluto) están vetados, incluso como
ejemplo positivo.

| Claim                                                                                                                 | Clase / estado      | Uso en la landing                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `CLM-001` (NAV es un concepto en definición; no disponible para compra)                                               | A / `INTERNAL_ONLY` | Fundamento de `hero.supporting` y de la limitación comercial de NAV                                                            |
| `CLM-002` (la definición de NAV incluye planificación de rutas, cuaderno de bitácora y visualización de instrumentos) | A / `INTERNAL_ONLY` | `families.nav.summary`                                                                                                         |
| `CLM-003` (NAV se define en dos ediciones)                                                                            | A / `INTERNAL_ONLY` | `families.nav.summary`, composición de START y CRUISE                                                                          |
| `CLM-042` (ayuda a la navegación; AIS de solo escucha; alertas que pueden retrasarse o perderse)                      | A / `INTERNAL_ONLY` | `families.ais.material` y `families.watch.material`; se omiten las cláusulas sobre equipo reglamentario y seguridad de la vida |

Los bloques que reutilizan directamente estos pares citan `EV-MC14-BILINGUAL-CLAIMS` además
de la evidencia de producto: `families.nav.summary` (CLM-002/003), `families.ais.material` y
`families.watch.material` (CLM-042). El resto de menciones adapta hechos ya registrados en los
datos canónicos, sin cita del par. No se reutiliza ningún otro claim: la landing no contiene
afirmaciones de clase C, P ni X, ni en forma positiva ni como cita.

## 6. Reglas de clase de copia

| Clase                  | Regla                                                                                            | Bloques |
| ---------------------- | ------------------------------------------------------------------------------------------------ | ------- |
| `INTERNAL_EVIDENCED`   | Solo hechos ya registrados en el repositorio; nunca disponibilidad, certificación ni rendimiento | 69      |
| `PROPOSED_INTENT`      | Intención o propuesta de diseño; enuncia el futuro, no un hecho consumado                        | 18      |
| `CONSTRAINT_STATEMENT` | Limitación, negación o puerta cerrada; exige un token de negación explícito en ES y en EN        | 76      |
| `NAVIGATIONAL`         | Texto de interfaz o navegación sin afirmación de producto                                        | 11      |

Controles aplicados:

- **`INTERNAL_EVIDENCED`** se usa para composición de familias y paquetes, definiciones,
  estados de ciclo de vida y recuentos internos (nueve familias, seis paquetes, once
  dimensiones). No se usa para deducir disponibilidad.
- **`PROPOSED_INTENT`** se usa para la propuesta de ecosistema, las capas, los encabezados
  editoriales y el cierre. Ningún bloque de intención promete fecha, precio ni resultado.
- **`CONSTRAINT_STATEMENT`** se usa para toda limitación material o comercial, estado de
  gate, negación de certificación, ausencia de precio/stock/entrega, restricciones de PILOT,
  AIS y WATCH, y avisos de marca y publicación. Se verificó por script que los 76 bloques
  contienen negación explícita en ambos idiomas (p. ej. «no», «sin», «nunca», «ningún» /
  «no», «not», «without», «none», «never»).
- **`NAVIGATIONAL`** se usa para kickers de sección, skip link, etiqueta de vista previa y
  entradas de navegación. No introduce claims.

## 7. Paridad ES/EN y cómo se hace cumplir

Reglas de paridad:

1. Cada bloque tiene `text.es` y `text.en` no vacíos; no hay marcadores, lorem, TODO ni texto
   sin traducir.
2. Ambas versiones expresan el mismo claim, las mismas negaciones, las mismas cifras y las
   mismas cautelas. El inglés nunca es más fuerte que el español.
3. Los nombres propios de producto, edición y paquete (`NAV`, `HUB`, `SENSE-ESSENTIALS`,
   `START`, `FLEET`, etc.) se mantienen idénticos en ambos idiomas.
4. Los estados de máquina (`NOT_FOR_SALE`, `NO_GO`, `NOT_GRANTED`, `POWER`, `BILGE`) se
   mantienen literales y no se traducen.
5. La negación de un `CONSTRAINT_STATEMENT` debe existir en los dos idiomas; una negación
   presente solo en ES es un defecto de paridad.

Cómo se hace cumplir:

- **Validador** `scripts/check-marea-landing.mjs` (MC-18): comprueba resolución de
  `evidenceIds`, vocabularios de `copyClass`/`sectionId`, unicidad de `contentId`, presencia
  de texto en ambos locales, negación bilingüe en los bloques de restricción, ids
  estructurales (nueve familias, seis paquetes, once dimensiones, nodos y enlaces del
  diagrama) y patrones de claim prohibidos. El validador se está escribiendo en el mismo
  milestone; su resultado no está disponible en el momento de autoría de este documento.
- **Playwright**: la especificación E2E de MC-18 recorre la landing en ES y EN, comprueba que
  cada sección y cada ancla de navegación renderizan, que no hay texto ausente y que la
  página no expone acciones comerciales ni de contacto. También se está escribiendo en
  paralelo; no se ha ejecutado al cerrar este documento.
- **Comprobaciones ejecutadas por el autor** (ver §11): `tsc` sin errores, walker de Node
  sobre la fuente real (174 bloques, ids únicos, 0 textos ausentes) y Prettier.

La paridad semántica automatizada es heurística. Un validador de palabras clave no demuestra
equivalencia de significado ni cumplimiento legal; hace falta revisión humana (ver §9).

## 8. Categorías de claim prohibidas y cómo se evitan

Se aplican las 30 categorías obligatorias de `claims-policy.json`. La landing no contiene
ninguna en forma afirmativa; cuando el contrato exige declarar la limitación, se hace con
negación explícita.

| ID      | Categoría                                    | Clase | Cómo se evita                                                            |
| ------- | -------------------------------------------- | ----- | ------------------------------------------------------------------------ |
| PROH-01 | Disponibilidad comercial                     | P     | Solo se declara `NOT_FOR_SALE`; no hay CTA de compra                     |
| PROH-02 | Stock                                        | P     | Se niega el stock en fichas, paquetes y cierre                           |
| PROH-03 | Fechas de entrega                            | P     | No hay plazo ni fecha; se declara su ausencia                            |
| PROH-04 | Precio final                                 | P     | Sin cifras ni moneda; precio no aprobado y nota de pricing               |
| PROH-05 | Registro de marca                            | X     | Sin `®` ni `™`; marca propuesta y clearance `NOT_GRANTED`                |
| PROH-06 | Propiedad del código subyacente              | P     | No se afirma propiedad de software ni de datos                           |
| PROH-07 | Cartas oficiales o licenciadas               | X     | Se declara que las cartas no están licenciadas ni incluidas              |
| PROH-08 | Derechos de datos meteorológicos             | X     | Se declara que los datos no están licenciados                            |
| PROH-09 | Conformidad CE/RED/EMC                       | X     | Sin afirmaciones de conformidad; se declara su ausencia                  |
| PROH-10 | Certificación NMEA                           | X     | No se nombra certificación; la integración es conceptual y no verificada |
| PROH-11 | Certificación de seguridad marina            | X     | Sin homologación; gate de seguridad de PILOT bloqueado                   |
| PROH-12 | Interoperabilidad universal                  | X     | Se niega compatibilidad universal y probada                              |
| PROH-13 | Compatibilidad de instalación validada       | C     | Sin matriz probada; integración declarada no verificada                  |
| PROH-14 | Gobierno totalmente autónomo                 | X     | PILOT asistido y supervisado; autonomía negada                           |
| PROH-15 | Prevención de colisiones                     | X     | AIS de solo escucha; se niega evitación de colisiones                    |
| PROH-16 | Entrega garantizada de alertas               | X     | Las alertas pueden perderse; sin garantía                                |
| PROH-17 | Disponibilidad garantizada de monitorización | X     | Sin monitorización remota continua garantizada                           |
| PROH-18 | Precisión garantizada de previsión           | X     | Previsión probabilística; sin precisión garantizada                      |
| PROH-19 | Cobertura de seguro                          | X     | No se menciona seguro                                                    |
| PROH-20 | Recuentos de clientes                        | X     | No hay cifras de clientes                                                |
| PROH-21 | Testimonios                                  | X     | No hay testimonios                                                       |
| PROH-22 | Cuota de mercado                             | X     | No hay liderazgo ni cuota                                                |
| PROH-23 | Rentabilidad comercial                       | P     | No hay rentabilidad                                                      |
| PROH-24 | Punto de equilibrio                          | P     | No hay punto de equilibrio                                               |
| PROH-25 | Retorno de inversión                         | X     | No hay retorno                                                           |
| PROH-26 | Compromisos de financiación                  | X     | No hay financiación                                                      |
| PROH-27 | Certificación de ciberseguridad              | X     | Sin certificación; no se afirma                                          |
| PROH-28 | SLA no verificado                            | X     | `SLA` aparece solo en forma negada («no establecido»)                    |
| PROH-29 | Afirmación de cumplimiento del RGPD          | X     | No se afirma cumplimiento; no se menciona                                |
| PROH-30 | Seguridad de la vida o salvamento            | X     | No se afirma servicio de seguridad de la vida                            |

Además se evitan, por diseño: precios y cantidades monetarias, pre-order, lista de espera,
carrito, checkout, formularios de contacto, presupuesto o registro, certificaciones,
`®`, testimonios, cifras de clientes, liderazgo de mercado, SLA con porcentajes, evitación
de colisiones, transmisión AIS, gobierno autónomo de PILOT, alertas garantizadas de WATCH,
cartas o meteorología licenciadas incluidas, dimensiones inventadas de DISPLAY, propiedad
del código, cumplimiento del RGPD y seguros.

## 9. Limitaciones conocidas

1. **No hay copia pública autorizada.** Este documento y la landing son borradores internos.
   La publicación sigue bloqueada por marca (`NO_GO`), claims (0 de 42 autorizados) y gates
   (0 de 13 cerradas).
2. **Sin revisión de traductor.** La paridad ES/EN se ha redactado y revisado por el autor;
   no existe revisión profesional de traducción. Un revisor independiente debe comprobar la
   equivalencia semántica antes de cualquier uso externo.
3. **Sin revisión de accesibilidad del copy.** El texto alternativo del diagrama y la
   descripción de la arquitectura no han sido revisados por especialista en accesibilidad.
   La comprobación de teclado, foco y lectores de pantalla corresponde a la verificación MC-18.
4. **Validador y Playwright en escritura concurrente.** Las comprobaciones automáticas de
   MC-18 no estaban disponibles al cerrar este documento; los resultados deben registrarse
   en el informe de verificación del milestone.
5. **`claimIds` no está en el contrato.** La atribución claim-por-bloque se documenta aquí
   (§5) en lugar de codificarse; ver §3.
6. **Los recuentos de §10 son recuentos de bloques**, no de palabras ni de frases únicas; las
   348 cadenas localizadas (174 bloques × 2 locales) no equivalen a 348 afirmaciones
   distintas.
7. **Evidencia interna no es aprobación.** Un `evidenceId` describe lo que una fuente registra
   hoy; no certifica producto, no concede licencia y no autoriza publicación.

## 10. Recuento de bloques por sección e idioma

Recuento obtenido de la fuente real (`landing-content.ts`) recorriendo los objetos con
`contentId`. Todos los bloques tienen los dos locales, por lo que ES y EN coinciden. Los
bloques de marca se cuentan en la sección declarada en su `sectionId` (`hero` para banner,
marca provisional, skip link y etiqueta de vista previa; `closing` para la clasificación de
pie).

| Sección            | Bloques ES | Bloques EN | Total   |
| ------------------ | ---------- | ---------- | ------- |
| `hero`             | 12         | 12         | 12      |
| `ecosystem`        | 14         | 14         | 14      |
| `families`         | 31         | 31         | 31      |
| `architecture`     | 30         | 30         | 30      |
| `bundles`          | 22         | 22         | 22      |
| `softwareHardware` | 12         | 12         | 12      |
| `professionals`    | 10         | 10         | 10      |
| `documentation`    | 13         | 13         | 13      |
| `availability`     | 22         | 22         | 22      |
| `closing`          | 8          | 8          | 8       |
| **Total**          | **174**    | **174**    | **174** |

Desglose complementario por clase de copia: `INTERNAL_EVIDENCED` 69,
`CONSTRAINT_STATEMENT` 76, `PROPOSED_INTENT` 18, `NAVIGATIONAL` 11 (suma 174).
Entradas de navegación: 10, una por sección, con anclas en página.

## 11. Verificación ejecutada

| Comprobación                                  | Comando                                                                                         | Resultado                                                                                                        |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| TypeScript estricto                           | `npx tsc -p tsconfig.app.json --noEmit`                                                         | exit 0                                                                                                           |
| Walker de contenido (Node 24, type stripping) | `node --input-type=module -e "import('./src/app/marea-landing/content/landing-content.ts')..."` | `blocks 174`, `ids unique true`, `es missing 0`, `en missing 0`, exit 0                                          |
| Formato                                       | `npx prettier --write` y `npx prettier --check` sobre ambos entregables                         | exit 0                                                                                                           |
| Negación bilingüe en restricciones            | script puntual sobre los 76 bloques `CONSTRAINT_STATEMENT`                                      | 0 fallos                                                                                                         |
| Resolución de evidencia                       | script puntual contra `LANDING_EVIDENCE`                                                        | 0 ids desconocidos                                                                                               |
| Ids estructurales                             | script puntual (familias, paquetes, nodos, enlaces, dimensiones)                                | 9 familias × 2 limitaciones, 6 paquetes × 2 restricciones, 11 nodos, 10 enlaces válidos, 11 dimensiones en orden |

El informe ejecutivo del milestone es un documento separado y se redacta en español. Este
documento es el anexo de política de contenido y evidencia.
