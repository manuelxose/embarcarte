# AGENTS.md — embarcarte

Aplicación Angular (SSR) con servidor en `src/server`. Antes de codificar, aplica las políticas siguientes.

## Políticas obligatorias

### Graphify primero (SIEMPRE)

- **Nunca leas archivos ni hagas búsquedas amplias para entender el código.** Consulta primero el grafo:
  - `graphify query "<pregunta>"` (o `graphify explain "<símbolo>"`, `graphify path "A" "B"`)
  - El grafo vive en `graphify-out/graph.json`.
- Solo si Graphify no da evidencia suficiente, lee los archivos concretos que el grafo indique — nada más.
- Tras cualquier cambio en código o docs, ejecuta `graphify update .` para mantener el grafo al día (incremental, no rebuild completo).

### Ponytail por defecto

- La solución mínima completa: nada de código, dependencias ni abstracciones innecesarias.
- Sin sacrificar corrección, seguridad, accesibilidad ni pruebas.
- Usa las skills ponytail (`/ponytail-review`, `/ponytail-audit`, `/ponytail-debt`) cuando se pida revisión o auditoría.

### Context Mode para salidas grandes

- Logs, builds, búsquedas, análisis de datos y contenido web: procesa con `ctx_execute` / `ctx_execute_file` / `ctx_batch_execute` e indexa con `ctx_index`; recupera solo fragmentos con `ctx_search`.
- No vuelques salidas extensas al contexto.

### Skills

- `ui-ux-pro-max` para cualquier trabajo de interfaz, componentes, accesibilidad o diseño.
- `context-mode` / `graphify` / `ponytail` según lo anterior.

## Comandos

- Dev: `npm start` (Angular CLI)
- Build: `npm run build`
- Tests: `npm test` — **no definido en `package.json`**; usa los comandos verificados de abajo.

### Comandos verificados (MC-01)

- `npm run build` — build Angular SSR/prerender.
- `npm run test:i18n` — paridad de diccionarios y rutas localizadas.
- `npm run test:commerce` — integridad de precios/stock/checkout server-authoritative.
- `npm run test:seo` — metadatos, canonical/hreflang y sitemap.
- `npm run test:backup` — backup/restore verificado.
- `npm run test:performance` — mediciones de rendimiento (mide; no aplica umbrales ni es gate de CI).
- `npm run test:e2e` — Playwright (requiere Chromium instalado).
- `npm run format:check` / `npm run format` — Prettier.

## Reglas del programa MAREA (MC-01 en adelante)

Aplican a todo trabajo posterior; no sustituyen las políticas anteriores.

### Arquitectura

- Mantener Angular 21, SSR, prerender e hidratación salvo motivo verificado.
- Mantener la arquitectura de localización con rutas tipadas: un solo componente
  por página, sin duplicar implementaciones ES/EN.
- El comercio sigue siendo server-authoritative: precios, stock y pedidos se
  validan en servidor.
- Respetar las URLs públicas indexadas y el registro `LOCALIZED_ROUTES`; toda
  ruta nueva debe justificar colisiones y canonical/hreflang.
- Separar rutas públicas de rutas privadas (cuenta, admin) y no exponer controles
  operativos de embarcación en endpoints de comercio.
- Sin reescrituras grandes ni microservicios especulativos; sin dependencias
  nuevas sin justificación y auditoría de suministro.

### Seguridad

- Nunca commitear credenciales ni secretos; usar almacenamiento aprobado.
- Validar toda entrada externa; proteger datos de cliente y sesiones.
- Pagos solo con proveedor alojado/tokenizado; nunca persistir datos de tarjeta.
- Operaciones de alto riesgo o irreversibles requieren autorización humana.

### Veracidad comercial

- No inventar stock, certificaciones, pruebas de mar, testimonios, presupuestos
  de proveedor ni aprobaciones regulatorias.
- Distinguir producto final definido de producto realmente disponible.
- No convertir precios hipotéticos en ofertas comprables.
- MAREA es una marca **propuesta** hasta su clearance legal; no publicar como
  marca registrada ni como producto certificado.

### Calidad

- Mobile-first, navegación por teclado, breakpoints reales, sin enlaces internos
  rotos ni traducciones ausentes.
- Evidencia real para PASS: ejecutar los comandos verificados; documentar
  resultados; una revisión independiente examina el diff real, no el resumen.
- Los estados de entrega son `PASS` / `PARTIAL` / `BLOCKED` / `FAIL`; toda
  limitación externa (credencial, legal, hardware) se registra como BLOCKED.

### Agentes

- El Lead controla Git y la integración; los especialistas escriben solo en su
  alcance asignado y no ejecutan comandos Git de escritura.
- La revisión independiente la realiza un agente distinto del autor.
- Ver `docs/marea/execution/AGENT-OPERATING-MODEL.md` y
  `docs/marea/execution/HARNESS-SETUP.md`.
