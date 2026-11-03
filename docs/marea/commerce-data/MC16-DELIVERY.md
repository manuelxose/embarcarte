# MC-16/36 — Registro de entrega final (D23)

| Campo | Valor |
|---|---|
| Hito | MC-16/36 — modelo de dominio comercial y de datos de producto |
| Fecha | 2026-11-03 |
| Rama | `feature/marea-mc16-commerce-product-data-model` |
| Base | `99212a41f5942a6fef4ede75815132c11fa4de50` (MC-15) |
| Implementación auditada | `ee4f5d20bb0613b6a0e3eaff600b93047cd8ea3e` |
| PR | [#23](https://github.com/manuelxose/embarcarte/pull/23), borrador, base MC-15 |
| Estado del PR | `OPEN`, `DRAFT`, `MERGEABLE`, no fusionado |
| Veredicto | `PARTIAL`; alcance interno `PASS_INTERNAL_COMMERCE_DATA_SCOPE` |
| Comercio público | no activado |
| Migración de producción | no ejecutada |
| MC-17 | no iniciado |

## 1. Commits de la rama

| Commit | Función |
|---|---|
| `4e67ae2` | Implementación inicial MC-16: dominio, esquema, datasets, validador, tests y D01-D20 |
| `0a30a62` | Endurecimiento de evidencia, guard de publicación familiar y LIF-002 |
| `c9ef80e` | Cierre de hallazgos residuales, hashes normalizados y correcciones documentales |
| `981c53f` | Reparación del orden de declaración que rompía el build y cierre de hallazgos finales |
| `ee4f5d2` | Inmutabilidad ampliada de precio aprobado, regresión de evidencia de SKU y hashes D14 |

La implementación final auditada es `ee4f5d2`. Los commits de documentación y registro
posteriores no cambian código, datos, esquema, tests, rutas ni configuración.

## 2. Entregables

| ID | Documento |
|---|---|
| D01 | `MC-16-BASELINE-AND-GOVERNANCE.md` |
| D02 | `MC16-EXISTING-COMMERCE-ARCHITECTURE-AUDIT.md` |
| D03 | `MC16-CANONICAL-DOMAIN-DATA-CONTRACT.md` |
| D04 | `MC16-PRODUCT-FAMILY-EDITION-SKU-MODEL.md` |
| D05 | `MC16-BUNDLE-COMPOSITION-AND-COMPATIBILITY.md` |
| D06 | `MC16-LIFECYCLE-AND-READINESS-STATE-MACHINE.md` |
| D07 | `MC16-RELEASE-GATE-AND-PURCHASABILITY-POLICY.md` |
| D08 | `MC16-PRICE-APPROVAL-VAT-AND-TERRITORY-MODEL.md` |
| D09 | `MC16-INVENTORY-AND-STOCK-PROVENANCE.md` |
| D10 | `MC16-SUBSCRIPTION-AND-ENTITLEMENT-MODEL.md` |
| D11 | `MC16-FLEET-TENANCY-AND-VESSEL-SCOPING.md` |
| D12 | `MC16-SECURITY-AND-AUDIT-TRAIL.md` |
| D13 | `MC16-SQLITE-SCHEMA-AND-MIGRATION-PLAN.md` |
| D14 | `MC16-LEGACY-COMMERCE-COMPATIBILITY.md` |
| D15 | `MC16-SEO-AND-PUBLICATION-DATA-CONTRACT.md` |
| D16 | `MC16-EXTERNAL-EVIDENCE-AND-BLOCKERS.md` |
| D17 | `MC16-INTEGRATION-AND-ROLLBACK-PLAN.md` |
| D18 | `MC16-MC17-HANDOFF.md` |
| D19 | `MC16-MACHINE-READABLE-DATASETS.md` + `data/*.json` + schema |
| D20 | `MC16-DETERMINISTIC-VALIDATION-AND-ADVERSARIAL-TESTS.md` |
| D21 | `MC16-INDEPENDENT-REVIEW.md` |
| D22 | `MC16-EXECUTIVE-REPORT-ES.md` |
| D23 | este registro |

No hay una segunda fuente de verdad: los datos canónicos viven en
`docs/marea/commerce-data/data/`, el manifiesto enumera los 21 ficheros y el validador
falla si el inventario, los recuentos o las identidades divergen.

## 3. Resultado técnico

| Elemento | Resultado |
|---|---|
| Familias | 9/9 |
| Ediciones | 26/26 |
| Bundles | 6/6 |
| Rutas propuestas | 23, todas no desplegables |
| Gates de release | 13/13 abiertos, 0 cerrados |
| Documentos legales/comerciales | 24/24 sin ejecutar |
| Candidatos a SKU | 26, todos no merchantables |
| Códigos de SKU mercantil | 0 |
| Precios aprobados | 0 |
| Precios efectivos | 0 |
| Inventario MAREA verificado | 0 artículos; cantidad `null` |
| Suscripciones reales | 0 |
| Entitlements reales | 0 |
| Rutas MAREA publicadas/indexables | 0/0 |
| `Product`/`Offer` JSON-LD MAREA | 0 |
| Tablas SQLite | 19 `STRICT` |
| Triggers | 19 |
| Índices | 9 |

`evaluatePurchasability()` es la única decisión autoritativa y devuelve, para todas las
entidades actuales, `allowed=false`, `effectivePrice=null`, `effectiveStock=null`. El
módulo no se importa en ninguna ruta pública, tienda, checkout o Stripe.

## 4. Verificación ejecutada

| Comando | Resultado |
|---|---|
| `npm run test:commerce-data` | 1730/1730 PASS |
| `npm run test:commerce-data:unit` | 74/74 PASS |
| Persistencia SQLite | 16/16 PASS |
| `npx tsc -p tsconfig.app.json --noEmit` | PASS |
| `npm run build` | PASS, 96 rutas prerenderizadas |
| `npm run test:ia-seo` / `:unit` | PASS / 63 PASS |
| `npm run test:legal-commercial` / `:unit` | 54/54 / 41/41 PASS |
| `npm run test:economics` / `:unit` | 49/49 / 64/64 PASS |
| `npm run test:hardware` / `:unit` | 54/54 / 59/59 PASS |
| `npm run test:products` / `:unit` | 52/52 / PASS |
| `npm run test:bundles` / `:unit` | 35/35 / 60/60 PASS |
| `npm run test:brand` / `:unit` | 21/21 / 13/13 PASS |
| `npm run test:market` / `:unit` | 40/40 / 43/43 PASS |
| `npm run test:customer-research` / `:unit` | 62/62 / 111/111 PASS |
| `npm run test:customer-recovery` / `:unit` | 32/32 / 82/82 PASS |
| `test:i18n`, `test:commerce`, `test:seo`, `test:backup` | PASS |
| `format:check`, `test:e2e`, `npm audit --omit=dev --audit-level=high`, `git diff --check` | PASS |

**Deuda heredada:** `test:financial` queda en 76/77 y `test:financial:unit` en 28/29 por
el mismo `V-18` de MC-13. No es un defecto aritmético ni un cambio de MC-16; no se
modificó MC-13, el registro ni el validador para ocultarlo. No se declara una suite
totalmente verde.

## 5. Auditoría independiente

El commit final auditado es `ee4f5d2`. El auditor no autor (`independent-auditor-final`)
ejecutó build, typecheck, validador, unitarias y financiero, e inspeccionó el diff real.
Veredicto: `PASS_INTERNAL_COMMERCE_DATA_SCOPE`, 0 BLOCKING, 0 MAJOR, 1 MINOR residual
(endurecimiento adicional de inmutabilidad de precio aprobado) y 2 informativas. Los
hallazgos, su reproducción y las correcciones están en `MC16-INDEPENDENT-REVIEW.md` y
`data/review-findings.json`.

## 6. Prohibiciones verificadas

| Prohibición | Evidencia |
|---|---|
| Merge | PR #23 abierto, borrador, `mergedAt=null` |
| Deploy | sin cambio de despliegue ni ejecución de despliegue |
| Publicación/indexación | 23 rutas con autorización `false`; 0 en sitemap |
| Venta | 0 SKU merchantables; 0 precios aprobados; 0 stock vendible |
| Pagos/Stripe | sin cambios en `stripe.ts`, checkout ni configuración |
| Suscripciones/billing | `billingImplemented=false`; 0 planes activos; 0 grants reales |
| Migración de producción | CLI solo temporal; `productionMigrationExecuted=false` |
| Cambio de la tienda legacy | 8 archivos con hash LF normalizado sin cambios |
| MC-17 | `MC17_STARTED=false`; solo handoff |
| Modificación de veredictos previos | MC-13/14/15 preservados |

## 7. Limitaciones y siguientes pasos

- No hay evidencia externa de marca, licencias, precios, stock, conformidad, términos,
  pagos, seguro ni identidad legal. MC-16 no la crea ni la simula.
- El único MINOR residual y las observaciones informativas se registran para MC-17 o para
  el endurecimiento posterior del esquema; no bloquean el alcance interno.
- V-18, MC-13 F-05/F-11/F-14 y MC-15 GSC-01/GSC-02 siguen abiertos.
- MC-17 puede consumir el contrato de presentación, pero no está iniciado ni autorizado.

## 8. Estado final

```
MC16_VERDICT = PARTIAL
MC16_INTERNAL_COMMERCE_DATA_SCOPE = PASS_INTERNAL_COMMERCE_DATA_SCOPE
MC16_IMPLEMENTATION_AUDITED = ee4f5d20bb0613b6a0e3eaff600b93047cd8ea3e
PR_CREATED = true (#23)
PR_STATE = OPEN_DRAFT_MERGEABLE
MERGED = false
DEPLOYED = false
PUBLISHED = false
PRODUCTION_MIGRATION = false
MC17_STARTED = false
```
