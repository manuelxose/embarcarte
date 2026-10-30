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
- Tests: `npm test`
