# MC-18 — Composición y sistema visual de la landing corporativa (D03)

Este documento describe la dirección de arte, el modelo de composición y el sistema visual
aplicados a la landing corporativa interna de MAREA (MC-18). No es una aprobación de
publicación, no es una certificación de accesibilidad y no sustituye la validación
independiente de QA.

## 1. Estado y clasificación

| Campo                                 | Valor                                                                                                                              |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Documento                             | D03 / MC18-DESIGN-COMPOSITION-AND-VISUAL-SYSTEM                                                                                    |
| Milestone                             | MC-18                                                                                                                              |
| Owner                                 | Agent B — Marine UI/UX Art Director                                                                                                |
| Fecha                                 | 2026-11-03                                                                                                                         |
| Método de generación                  | Autoría manual sobre el sistema de diseño MC-17 y el contrato de contenido MC-18. CSS y SVG originales; sin generación de imágenes |
| Estado del documento                  | `INTERNAL_PROPOSED`                                                                                                                |
| Autorización de publicación           | `NOT_AUTHORIZED`                                                                                                                   |
| Autoridad de aprobación               | Lead del programa (no concedida)                                                                                                   |
| Superficie                            | Preview SSR aislado y loopback (`127.0.0.1:4302`); ninguna ruta pública                                                            |
| Modo visual                           | `web-light` exclusivamente; no se añaden modos de instrumento                                                                      |
| Verificación visual independiente     | Fuera de alcance: la posee QA/D11                                                                                                  |
| Verificación axe / baseline visual    | No ejecutada por el art director; no se reclama conformidad WCAG                                                                   |
| Fuente única de copy                  | `src/app/marea-landing/content/landing-content.ts` (no modificada)                                                                 |
| Dependencias nuevas o assets externos | Ninguno                                                                                                                            |

El estado anterior es el del contrato MC-18: borrador interno propuesto, no publicado, no
indexable, sin venta y sin captación de datos. Ningún cambio visual de este documento
promueve la landing a producto publicado.

## 2. Alcance

Se rediseñó únicamente la capa visual y de composición:

- `src/app/marea-landing/sections/**` — diez secciones.
- `src/app/marea-landing/components/**` — banner interno, cabecera, pie, marco de sección y
  el nuevo índice de pliego decorativo.
- `src/app/marea-landing/landing.ts` — solo estilos del shell y del skip link.
- `preview/landing/styles.css` — baseline global del preview.
- Este documento D03.

No se modificaron textos, contratos de contenido, datos generados, modelos, configuración
de build, servidor del preview, pruebas e2e ni el sistema de diseño MC-17. No se añadieron
dependencias, imágenes, fuentes externas, enlaces públicos ni metadatos SEO.

## 3. Concepto: pliego técnico y carta de navegación

La landing se compone como un **pliego técnico de instrumentación marina**, no como un panel
SaaS. La referencia mental es el catálogo de instrumentos y la monografía de arquitectura:

- **Pliego**: cada sección es una hoja numerada (`01`–`10`), separada por una línea de pelo,
  con un índice de pliego, un _kicker_ tipográfico y un titular. El número es decorativo
  (`aria-hidden`), no dato de producto.
- **Instrumento**: cifras tabulares, escalas, reglas finas, marcas de esquina en la lámina del
  hero y una retícula de trazado bajo el diagrama de arquitectura.
- **Carta náutica**: abstracción marina original y discreta (curvas de nivel en el hero,
  rosa de los vientos/ruta en el cierre), siempre decorativa y sin datos inventados.
- **Monografía**: jerarquía tipográfica amplia, medida de línea controlada, alternancia de
  tonos de hoja `canvas`/`surface`/`surface-raised` y espacio en blanco generoso pero pautado.

Las decisiones que hacen la página específica de MAREA son: la lectura por capas del
ecosistema como registro de estratos, la lámina de estado del hero construida solo con hechos
canónicos, el diagrama de dependencias conceptuales como matriz de trazado y la declaración
material/comercial siempre visible junto a cada familia y paquete.

## 4. Principios de diseño

1. **Instrumento, no dashboard.** Jerarquía por tipografía y líneas; sin sombras, sin
   glassmorphism, sin neón, sin degradados decorativos múltiples.
2. **Una sola retícula de pelo.** Las secciones se separan con hairlines y reglas; las tarjetas
   no acumulan bordes ni elevaciones. La única superficie elevada es la lámina de estado del
   hero y los contenedores de datos.
3. **El dato con su límite.** Toda cifra o estado aparece junto a su restricción material; la
   composición no oculta textos legales para ganar aire.
4. **Abstracción original y honesta.** Los SVG y las marcas CSS son originales, conceptuales y
   decorativos; no simulan producto, telemetría ni fotografía.
5. **Movimiento contenido.** Solo opacidad y traslación, una vez, en el hero; nada de parallax,
   bucles ni animación al hacer scroll.
6. **Accesibilidad como restricción de composición.** Foco visible de 3 px, reflujo a 320 px,
   texto al 200 %, contraste AA con tokens y estado nunca codificado solo por color.

## 5. Modelo de composición

### 5.1 Índice de pliego

`marea-landing-sheet-index` (nuevo componente visual) pinta un número de dos dígitos, una regla
de pelo y un rombo. Es `aria-hidden` y no introduce niveles de encabezado. Se usa al inicio de
las diez secciones para crear ritmo y orientación sin añadir copy.

### 5.2 Tonos de hoja

Solo se usan tokens de color del tema `web-light`:

| Tono del marco | Token de fondo           | Secciones                                       |
| -------------- | ------------------------ | ----------------------------------------------- |
| `canvas`       | `--marea-canvas`         | Hero, Familias, Paquetes, Documentación         |
| `raised`       | `--marea-surface`        | Ecosistema, Arquitectura, Profesionales, Cierre |
| `contrast`     | `--marea-surface-raised` | Software y hardware, Disponibilidad             |

La alternancia es deliberada y no crea jerarquía de producto: expresa capítulos del pliego.

### 5.3 Ritmo vertical

- Padding de sección: 40 px en móvil, 64 px desde 768 px y 80 px desde 1200 px
  (`--marea-space-7`, `--marea-space-9`, `--marea-space-10`).
- Separación titular → contenido: la que fija `marea-section-heading` (24 px) más el índice.
- Notas y avisos de cierre de sección: 24 px (`--marea-space-5`).
- El hero añade 40/48 px en móvil, 64/80 px desde 768 px y 80/96 px desde 1200 px.

### 5.4 Lámina de estado (hero)

Composición a dos columnas desde 1200 px (contenido 1.5fr / lámina 0.9fr) y una columna por
debajo. La lámina se monta sobre un marco con marcas de esquina CSS y se desplaza 48 px hacia
abajo en escritorio para romper la simetría. Sus valores usan `--marea-type-numeric-secondary-*`
con `tabular-nums`; las etiquetas usan el rol `meta`.

## 6. Sección por sección

### 01 · Hero (`hero`)

- Encabezado `h1` único, `id="hero-heading"`; ancla `hero` en el host.
- Fila superior: índice `01`, regla y _chip_ de clasificación (`data-landing-classification`).
- Copy: kicker, `h1` (display1, 22ch), lead secundario, párrafo de apoyo con regla izquierda y
  tres destacados como lista de pelos con marcador rómbico decorativo.
- Lámina derecha: estado registrado (familias, ediciones, conceptos, puertas cerradas, precios
  aprobados) y nota de procedencia.
- Fondo: un único lavado radial con `--marea-state-info-surface`; curvas de nivel originales
  (`aria-hidden`) solo desde 1024 px y fuera de la columna de lectura.
- Movimiento: entrada escalonada de opacidad/traslación una sola vez.

### 02 · Ecosistema (`ecosistema`)

- Registro de cinco estratos en una lista ordenada (`ol`): columna de índice, título `h3` y
  cuerpo. Sin tarjetas: la lectura es vertical y continua.
- Desde 768 px la fila se abre a tres columnas (índice / título / cuerpo) con hairlines entre
  filas.
- Aviso de alcance al pie, visible en ambos idiomas.

### 03 · Familias (`familias`)

- Nueve entradas canónicas con `data-landing-family`, todas siempre renderizadas.
- Rejilla 1/2/3 columnas (820 px y 1200 px). A 1440 px resuelve en 3×3 completo, sin fila
  coja y sin la densidad de cuatro columnas del diseño anterior.
- Cada entrada es un registro de catálogo: índice decorativo, tarjeta MC-17 `marea-family-card`,
  y bloque de limitaciones materiales. La fila estira las entradas y alinea la regla inferior
  de limitaciones; la superficie interna de la tarjeta pertenece al design system y no se
  reestiliza.
- Nota de «sin disponibilidad comercial» al pie, visible.

### 04 · Arquitectura (`arquitectura`)

- Diagrama SVG original generado a partir de los nodos y enlaces del contrato de contenido,
  sobre una retícula de trazado CSS de 40 px.
- Distribución 3×4 con HUB en el centro: seis dependencias cortas y sin cruces; instalación
  profesional encima de HUB; datos externos agrupados con NAV, WEATHER y FLEET.
- Etiquetas multilínea calculadas con ajuste de palabras; caja de 220×90 y texto de 11 px que
  escala con la figura.
- Cada nodo codifica el tipo por **color + forma** (cuadrado, círculo, rombo, cuadrado
  discontinuo); la leyenda repite la forma y el texto, de modo que el color nunca es el único
  código.
- Región de desplazamiento horizontal enfocable (`tabindex="0"`, `role="group"`,
  `aria-label`), `min-inline-size: 880px` solo dentro del contenedor; el resto de la página no
  desborda.
- Debajo, la lista textual completa de dependencias conceptuales en dos columnas desde 900 px;
  el diagrama no es la única fuente de información.
- Aviso de «sin interoperabilidad verificada».

### 05 · Paquetes (`paquetes`)

- Seis conceptos (`data-landing-bundle`) en láminas numeradas.
- Una columna en móvil/tablet, dos desde 1024 px, con composición interna a dos columnas desde
  1280 px para separar componentes de exclusiones.
- Cabecera: índice, nombre del concepto y chips de estado; cuerpo: resumen, composición MC-17,
  exclusiones y restricciones. No hay precio, stock, plazo ni acción de compra.
- Las láminas no se fuerzan a la misma altura: cada una termina en su contenido y la rejilla
  mantiene la alineación superior.

### 06 · Software y hardware (`software-hardware`)

- Cuatro fichas de instrumento en una sola fila desde 900 px (2 columnas desde 600 px).
- Índice numérico, título `h3` y cuerpo; superficies de contorno sobre tono `contrast`.
- Aviso de licencias y conformidad no acreditadas.

### 07 · Profesionales (`profesionales`)

- Tres columnas editoriales desde 768 px, separadas por espacio y reglas superiores; sin
  tarjetas, para diferenciarse de las fichas de instrumento.
- Aviso de ausencia de formularios y de captación de datos.

### 08 · Documentación (`documentacion`)

- Registro técnico numerado (índice / título / cuerpo) con hairlines y panel lateral de
  «Alcance actual» desde 1024 px.
- Aviso de ausencia de documentación autorizada y certificaciones.

### 09 · Disponibilidad (`disponibilidad`)

- Una consola única (`marea-surface` elevada) que agrupa el panel de preparación MC-17 y el
  registro de hechos, separados por una regla vertical desde 900 px.
- Valores numéricos con cifras tabulares y jerarquía tipográfica propia; chips de publicación e
  indexación no autorizadas.
- Después: líneas de estado de disponibilidad, explicación de la acción bloqueada (sin botón),
  aviso crítico de puertas y aviso de clasificación interna.

### 10 · Cierre (`cierre`)

- Columna de lectura de 68ch con tres declaraciones separadas por hairlines y marcadores
  rómbicos; aviso final `data-landing-closing-restriction`.
- Geometría de rosa de los vientos/ruta original, decorativa, a la derecha y fuera de la
  columna de texto; oculta por debajo de 768 px.

## 7. Tipografía, espaciado y color

### 7.1 Tipografía

Todo el texto usa los roles de `[marea-text]` y las familias del sistema (`Manrope` para
display, `DM Sans` para cuerpo), servidas localmente por `@fontsource-variable` en el preview:

| Rol                  | Uso compositivo                                      |
| -------------------- | ---------------------------------------------------- |
| `display1`           | `h1` del hero                                        |
| `title1`             | `h2` de sección (vía `marea-section-heading`)        |
| `title2`             | títulos de tarjeta/familia/paquete y segmentos       |
| `heading`            | subtítulos internos y paneles                        |
| `body` / `bodySmall` | copy y limitaciones                                  |
| `label`              | kickers, botones de navegación y etiquetas de bloque |
| `meta`               | notas, leyendas, hechos y metadatos                  |

Se mantienen las medidas máximas del sistema (24ch display1, 32ch title1, 68ch medida) y
`text-wrap: pretty` donde el sistema lo aplica. No se añaden familias, pesos ni tamaños fuera de
los tokens, salvo los ajustes de composición descritos (por ejemplo `letter-spacing` de la
marca y los índices).

### 7.2 Espaciado

Se usa la escala `--marea-space-1..12` del sistema. No hay valores mágicos de espaciado fuera de
tokens; los anchos de columna se expresan con `fr`, `minmax()` y `min()` para evitar desbordes.

### 7.3 Color

Solo tokens del tema `web-light`:

- Texto: `--marea-text-primary`, `--marea-text-secondary`, `--marea-text-meta`.
- Acción y foco: `--marea-action`, `--marea-focus-ring`.
- Estados: `--marea-state-info`, `--marea-state-warning`, `--marea-state-safe`,
  `--marea-state-critical` y sus superficies.
- Estructura: `--marea-line`, `--marea-border-strong`.
- Clasificación interna: `--marea-internal-banner-surface`, `--marea-internal-banner-text`.

No se usan colores fuera de tokens en componentes. El único uso de color fuera de token es el
baseline del preview (`#f5f8fa`, `#17365d`) y la franja `html::before` de clasificación del
preview, que no forman parte de la landing ni se integran en producción.

## 8. Estrategia responsive y breakpoints

Diseño mobile-first; los puntos de ruptura se apoyan en los tokens `--marea-bp-*` y en las
necesidades de contenido:

| Breakpoint | Cambios principales                                                                       |
| ---------- | ----------------------------------------------------------------------------------------- |
| 320 px     | Una columna; sin desbordamiento de página; diagrama con scroll interno enfocable          |
| 600 px     | Fichas de software/hardware a 2 columnas                                                  |
| 768 px     | Ecosistema a 3 columnas de registro; banner a 2 columnas; profesionales a 3; ritmo 64 px  |
| 820 px     | Familias a 2 columnas                                                                     |
| 900 px     | Arquitectura: relaciones a 2 columnas; software/hardware a 4; disponibilidad a 2; pie a 3 |
| 1024 px    | Paquetes y documentación a 2 columnas; navegación horizontal del sistema                  |
| 1200 px    | Hero a 2 columnas (lámina desplazada); familias a 3; notas de disponibilidad a 2          |
| 1280 px    | Composición interna de paquetes a 2 columnas                                              |

El único desplazamiento horizontal intencional es la región del diagrama de arquitectura por
debajo de 880 px; el resto de la página mantiene `scrollWidth === clientWidth` en los anchos
medidos (ver §13).

## 9. Política de movimiento

- Solo se animan `opacity` y `transform`.
- Hero: entrada única de copy (180 ms, `--marea-ease-standard`, retardos de 60/120/180 ms) y
  asentamiento de la lámina (480 ms, retardo 120 ms). No se repite ni depende de scroll.
- Enlaces y controles: transición de color/borde de 120 ms (`--marea-motion-state`).
- Sin parallax, sin bucles, sin animación automática de datos ni de diagramas.
- Todo el movimiento está dentro de `@media (prefers-reduced-motion: no-preference)`; el
  baseline del preview además fuerza duraciones mínimas bajo `reduce`. Verificado por
  `animationName: none` y `transitionDuration: 1e-05s` con emulación de movimiento reducido.

## 10. Procedencia de diagramas e ilustraciones

| Pieza                          | Procedencia y naturaleza                                                                                                                       |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Curvas de nivel del hero       | SVG original escrito a mano para MC-18; conceptual, sin datos de profundidad ni telemetría; `aria-hidden`                                      |
| Marcas de esquina de la lámina | CSS (`::before`/`::after`); decorativas                                                                                                        |
| Diagrama de arquitectura       | SVG original generado desde los nodos/enlaces del contenido; dependencias conceptuales, no integración verificada; no es un render de producto |
| Leyenda del diagrama           | Formas y textos del contrato de contenido; sin iconografía externa                                                                             |
| Rosa de los vientos/ruta       | SVG original decorativo del cierre; conceptual, sin posición ni rumbo reales; `aria-hidden`                                                    |
| Retícula del diagrama          | CSS `repeating-linear-gradient` con `--marea-line`; no es una retícula de datos                                                                |

No hay fotografías, renders de producto, capturas de pantalla, imágenes generadas por IA,
iconos de terceros, fuentes externas ni assets remotos. Todo el material gráfico es SVG/CSS
original incluido en los componentes.

## 11. Componentes del sistema de diseño utilizados

Lista de selectores realmente importados y renderizados por la landing (sin contar los internos
de cada componente):

- `marea-theme` — host del tema, modo `web-light`, locale.
- `marea-container` — anchura fluida `wide`.
- `marea-text` (`[marea-text]`) — todos los roles tipográficos.
- `marea-stack` — ritmo del pie.
- `marea-surface` — lámina del hero, tarjetas de paquete, paneles y consola de disponibilidad.
- `marea-notice` — avisos y banner interno.
- `marea-status-badge` (`span[marea-status-badge]`) — clasificación, preparación, publicación.
- `marea-section-heading` — `h2` de sección con kicker y lead.
- `marea-family-card` — nueve familias.
- `marea-bundle-components` — composición de paquetes (12 instancias).
- `marea-bundle-exclusions` — exclusiones/requisitos (6 instancias).
- `marea-readiness-panel` — preparación derivada.
- `marea-commercial-cta` — explicación de acción no disponible en familias y disponibilidad.
- `marea-responsive-nav` — navegación de la cabecera (único botón de divulgación de la página).
- Internos usados a través de los anteriores: `marea-icon`, `marea-state-panel`.

No se ha creado un sistema de diseño paralelo. El único componente visual nuevo es
`marea-landing-sheet-index`, que no define tokens ni tipografía propia: consume los tokens del
tema y no sustituye a ningún primitivo.

## 12. Estilos globales del preview (inventario)

`preview/landing/styles.css` es **solo del preview** y no se incluye en la aplicación de
producción. Contiene:

1. `@use '@fontsource-variable/manrope'` y `@use '@fontsource-variable/dm-sans'` (fuentes
   empaquetadas localmente).
2. Reset de `box-sizing`.
3. `html`: `text-size-adjust` y `scroll-padding-block-start`.
4. `body`: fondo y color base del preview, tipografía de respaldo, `text-rendering`.
5. `img, svg { max-width: 100% }`.
6. `::selection` con azul marino y blanco.
7. Franja `html::before` «INTERNAL PREVIEW / NOT PUBLISHED / LOOPBACK ONLY»: artefacto de
   preview, nunca presente en producción.
8. Anulación global de movimiento bajo `prefers-reduced-motion: reduce`.
9. **Única corrección entre componentes**: `marea-commercial-cta .cta > .marea-status-badge
{ justify-self: start }`. Evita que el chip de estado se estire como un control con forma de
   botón. Es un parche de preview: una integración autorizada debe corregirlo en el componente
   del design system, no depender de este archivo.

Los componentes de la landing son autocontenidos: sus estilos viven en su propio `styles` y no
dependen de clases globales del preview. La única dependencia no encapsulada es la corrección
del punto 9.

## 13. Decisiones de accesibilidad y evidencia

### 13.1 Decisiones

- Un solo `h1` (`hero-heading`); nueve `h2`, uno por sección, mediante `marea-section-heading`;
  `h3` para tarjetas y bloques; sin saltos de nivel.
- Anclas de sección estables y `aria-labelledby` resueltos en las diez secciones.
- Skip link como primer elemento enfocable; al enfocarlo se hace visible con anillo de 3 px y
  desplaza el foco al `main` (`#landing-main`, `tabindex="-1"`).
- Foco visible de 3 px (`--marea-focus-width`) con `--marea-focus-ring` en skip link, marca,
  navegación, selector de idioma y región de scroll del diagrama. No se elimina el anillo en
  ningún control.
- El banner interno es una región etiquetada, siempre presente, sin `opacity` en sus líneas
  auxiliares. El defecto de contraste reportado por QA se corrigió con el token opaco
  `--marea-internal-banner-text` (#6b4500) sobre `--marea-internal-banner-surface` (#fff6e6):
  **7,91:1** medido con la fórmula de luminancia relativa WCAG, `opacity: 1`.
- Los estados nunca se codifican solo por color: los badges siempre llevan icono + texto; el
  diagrama usa color + forma + leyenda; las limitaciones son texto.
- El único desplazamiento horizontal es una región enfocable con nombre accesible; la
  información equivalente está en la lista de relaciones.
- No hay texto sobre imágenes: las decoraciones SVG quedan fuera de las columnas de lectura o
  detrás de superficies opacas, y se ocultan en los tamaños donde podrían invadir texto.

### 13.2 Comprobaciones realizadas (medidas reales de navegador)

- Reflujo a 320/360/390/768/1024/1440 px en ES y EN: `scrollWidth === clientWidth` en los doce
  casos (320, 360, 390, 768, 1024, 1440 × dos locales).
- Aproximación de texto al 200 % (raíz a 32 px) con viewport de 320 px: sin desbordamiento
  horizontal en ES ni EN.
- Foco: `outline: 3px solid rgb(15, 95, 140)` en skip link, marca, enlaces de navegación y
  región de scroll.
- Movimiento reducido: `animationName: none`, `animationDuration: 1e-05s`,
  `transitionDuration: 1e-05s`.
- Contraste del banner: 7,91:1; `opacity: 1` (calculado en el navegador con los colores
  computados).
- Chip del CTA: 162 px de ancho intrínseco frente a 382 px del contenedor (ya no se estira).
- Conteos SSR: 1 `h1`, 9 `h2`, 9 `data-landing-family`, 6 `data-landing-bundle`, 1 banner, 1
  clasificación, 1 restricción de cierre, 11 avisos, 9 listas de limitaciones, 6 listas de
  restricciones de paquete.
- Ambas rutas responden 200 con `X-Robots-Tag: noindex, nofollow, noarchive`; sin
  `rel="canonical"`, sin `hreflang` y sin `application/ld+json`.

### 13.3 Lo que no se ha verificado

- No se ha ejecutado axe ni un escaneo automatizado de accesibilidad. No se reclama conformidad
  WCAG 2.2 AA; el objetivo es AA y QA/D11 posee la validación independiente.
- No se ha realizado una sesión con lector de pantalla; la revisión es semántica y de teclado.
- No se ha probado modo de contraste forzado (`forced-colors`), zoom nativo del navegador ni
  escalado de texto del sistema; la comprobación al 200 % es una aproximación con la raíz a
  32 px.
- No existe baseline visual ni diff de capturas; esa evidencia pertenece a D11.
- No se han medido tiempos de render ni Core Web Vitals.

## 14. Contratos DOM preservados

Estos contratos se mantienen para que QA pueda apoyarse en ellos:

- `[data-marea-landing]`, `[data-marea-landing-locale]`, `[data-marea-landing-main]`,
  `[data-marea-landing-header]`, `[data-marea-landing-footer]`,
  `[data-marea-landing-banner="internal-provisional"]`.
- `data-landing-internal-banner` (banner), `data-landing-classification` (hero),
  `data-landing-closing-restriction` (cierre), `data-landing-family` × 9,
  `data-landing-bundle` × 6, `[data-marea-landing-section]` × 10 con los valores `hero`,
  `ecosystem`, `families`, `architecture`, `bundles`, `software-hardware`, `professionals`,
  `documentation`, `availability`, `closing`.
- IDs y anclas: `hero`, `ecosistema`, `familias`, `arquitectura`, `paquetes`,
  `software-hardware`, `profesionales`, `documentacion`, `disponibilidad`, `cierre`,
  `hero-heading`, `ecosystem-heading`, `families-heading`, `architecture-heading`,
  `bundles-heading`, `software-hardware-heading`, `professionals-heading`,
  `documentation-heading`, `availability-heading`, `closing-heading`, `landing-main`.
- Jerarquía: exactamente un `h1`; un `h2` por sección; `h3` en tarjetas y bloques; sin `h4`
  nuevos salvo el ya existente de restricciones de paquete.
- El skip link y el texto de todos los bloques de contenido se conservan; no se añadió copy
  nuevo. Las etiquetas locales breves que ya existían (`{ es, en }`) permanecen.
- El banner interno, las listas de limitaciones, las restricciones de paquete, los avisos y las
  declaraciones de precio/stock se mantienen visibles en ambos idiomas y a 320 px; no se han
  ocultado con `display: none` ni recortado copy.

## 15. Verificación ejecutada

| Comprobación                    | Comando / método                                              | Resultado                                          |
| ------------------------------- | ------------------------------------------------------------- | -------------------------------------------------- |
| TypeScript                      | `npx tsc -p tsconfig.app.json --noEmit`                       | exit 0                                             |
| Build del preview               | `npm run build:landing:preview`                               | exit 0                                             |
| Servidor SSR loopback           | `node dist/marea-landing-preview/server/server.mjs`           | escucha en `127.0.0.1:4302`                        |
| Rutas ES/EN                     | GET `/marea`, GET `/en/marea`                                 | 200 / 200                                          |
| Cabecera de no indexación       | respuesta HTTP                                                | `X-Robots-Tag: noindex, nofollow, noarchive`       |
| Contratos DOM y conteos         | Playwright (script ad hoc, sin axe)                           | §13.2                                              |
| Desbordamiento horizontal       | Playwright a 320/360/390/768/1024/1440 × ES/EN                | igual en los 12 casos                              |
| Movimiento reducido             | Playwright `reducedMotion: 'reduce'`                          | sin animación                                      |
| Prettier                        | `npx prettier --check` sobre los archivos de este alcance     | exit 0                                             |
| Build de producción del preview | `npm run build:landing:preview -- --configuration production` | exit 0; sin avisos de budget (462,60 kB iniciales) |

Nota: el build por defecto del preview usa la configuración de desarrollo (sin budgets de
producción). No se ha ejecutado `npm run build` de la aplicación de producción porque el alcance
es el preview aislado; sí se comprobó la configuración de producción del preview. El validador
`npm run check:landing` no se usa como gate de este documento: su ejecución en este milestone
depende de documentos y datasets de otros owners (D11 y evidencias de QA) que aún no existen.

## 16. Corrección del defecto de contraste del banner (QA)

Antes, las dos líneas auxiliares del banner usaban `marea-text[meta]` y la regla
`.preview { opacity: 0.92 }`, lo que rebajaba el contraste efectivo por debajo de AA.

Cambio aplicado en `components/internal-banner.ts`:

- Se eliminó `opacity: 0.92`.
- Esas dos líneas ya no usan `marea-text`: se declaran como párrafos con la tipografía `meta`
  local y el color opaco `var(--marea-internal-banner-text)`, para que el color `meta` del
  design system no pueda sobrescribir el token del banner.
- El color computado resultante es `rgb(107, 69, 0)` sobre `rgb(255, 246, 230)`, con
  `opacity: 1` y contraste **7,91:1** (fórmula WCAG). No se introdujo ningún color fuera de
  tokens.

## 17. Lo que NO se afirma

- No se afirma conformidad WCAG 2.2 AA ni ningún nivel de conformidad.
- No se afirma que axe, Lighthouse o una auditoría automática hayan pasado.
- No se afirma una verificación de baseline visual, regresión de capturas ni comparación con el
  diseño anterior; eso pertenece a D11/QA.
- No se afirma que la landing sea publicable, indexable, comercializable ni una oferta.
- No se afirma que MAREA sea una marca adoptada o registrada.
- No se afirma que existan precios, stock, disponibilidad, certificaciones, pruebas de mar,
  integraciones o compatibilidad verificadas.
- No se afirma que los diagramas describan producto real o telemetría; son conceptuales.

## 18. Limitaciones conocidas

1. El texto del aviso de scroll del diagrama proviene del diccionario MC-17 (`scrollHint`) y
   menciona «tabla»; no se modificó para no alterar copy. QA puede señalarlo como mejora de
   copy en una fase autorizada.
2. La tarjeta de familia MC-17 no se puede estirar internamente desde la landing; la alineación
   se resuelve a nivel de registro (regla inferior y limitaciones), no de la superficie interna.
3. La corrección del chip del CTA vive en el CSS global del preview; una integración autorizada
   debe corregirla en el componente del design system.
4. Entre 1024 y ~1200 px la navegación de la cabecera puede ocupar una segunda fila por la
   longitud de las etiquetas ES. No hay cabecera fija, por lo que no hay compensación de ancla.
5. La validación al 200 % de texto es una aproximación (raíz a 32 px), no un zoom nativo.
6. No se han probado modos de contraste forzado, lectores de pantalla ni zoom de navegador.
7. El único control interactivo es el botón de divulgación de la navegación del sistema de
   diseño; no hay formularios, inputs, botones comerciales ni endpoints de contacto.

## 19. Handoff para una integración autorizada

- Importar el sistema de tokens MC-17 una sola vez y montar la landing bajo `marea-theme` en
  `web-light`.
- Mantener los contratos DOM del §14 y el banner interno siempre visible.
- Si se reutiliza el CSS del preview, incorporar la corrección del chip del CTA al componente
  `marea-commercial-cta` del design system, no al CSS global.
- Las decoraciones (curvas, retícula, rosa de los vientos) son prescindibles sin pérdida de
  información; el diagrama de arquitectura y la lista de relaciones no lo son.
- Cualquier publicación, indexación o uso público requiere autorización de publicación que este
  documento no concede.
