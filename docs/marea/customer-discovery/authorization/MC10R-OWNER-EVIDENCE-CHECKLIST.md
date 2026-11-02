# Lista de evidencia del propietario — prerrequisitos de AUTH-MC10-001

| Campo | Valor |
| --- | --- |
| Documento | `MC10R-OWNER-EVIDENCE-CHECKLIST` |
| Programa | EMBARCARTE / MAREA |
| Hito | MC-10R — sub-hito de recuperación de MC-10 |
| Fecha de preparación | 2026-11-02 |
| Preparado por | `lead` a petición del propietario |
| Estado | `DRAFT_PREPARED` — evidencia por aportar; `AUTH_MC10_001 = NOT_GRANTED` |
| Documento de firma asociado | `AUTH-MC10-001-REV2-SIGNATURE-PACK.md` |

> **Aviso.** Esta lista dice qué evidencia exacta falta y quién debe aportarla. No es una aprobación, no
> sustituye a la revisión jurídica, no acredita identidades y no desbloquea el trabajo de campo. Los
> datos personales de las evidencias **no se suben al repositorio**: se depositan en el almacén seguro o
> se entregan fuera de Git; en el repositorio solo se registra la referencia y el estado.

## 0. Regla de evidencia

Cada prerrequisito se cierra solo con un documento verificable, no con una afirmación. El `lead` comprobará
el documento, registrará su referencia y clasificará el estado. Una autorización firmada (P-01) sin los
prerrequisitos P-02 a P-11 no permite ningún contacto.

## 1. Tabla de prerrequisitos

| ID | Prerrequisito | Evidencia exacta que debes aportar | Quién la aporta | Estado actual |
| --- | --- | --- | --- | --- |
| P-01 | Autorización externa firmada | Paquete de firma completado y firmado (bloques A, B, C, D y anexos AN-1 a AN-3) | Propietario | `PENDIENTE` |
| P-02 | Identidad verificada del responsable del tratamiento | Escritura/estatutos o certificación registral: razón social, NIF/CIF, domicilio, representante legal y su cargo; documento que acredita la representación | Propietario / entidad | `OPEN` |
| P-03 | Contacto de privacidad verificado | Designación escrita de la persona o rol de privacidad, canal monitorizado, compromiso de respuesta y, si aplica, determinación sobre DPO | Entidad | `OPEN` |
| P-04 | Revisión jurídica cualificada | Informe de un profesional cualificado con referencia, fecha, ámbito y conclusiones sobre GDPR, LOPDGDD, comunicaciones de captación y, si aplica, Lei 58/2019; identidad del revisor y su cualificación | Asesor jurídico | `LEGAL_REVIEW_PENDING` |
| P-05 | Información al participante y consentimiento aprobados | Versión aprobada ES del aviso de información y del consentimiento con los cuatro permisos separados (participación, grabación, cita desidentificada, seguimiento); aprobación jurídica y de investigación | Entidad + jurídico + investigación | `DRAFT_FOR_LEGAL_REVIEW` |
| P-06 | Instrumentos efectivos aprobados | Aprobación firmada del paquete v1.1.0 (IV-01…IV-09) con revisión ES/EN cualificada y revisión jurídica de consentimiento y reclamaciones; versión efectiva y hashes recomputados | Investigación + jurídico | `REVIEW_REQUIRED` |
| P-07 | Muestreo, cuotas y protocolo aprobados | Aprobación firmada de `MC10R-SAMPLING-1.1.0` y `MC10R-SEGMENT-QUOTA-1.1.0` y del protocolo enmendado (anexo AN-1) | Propietario | `PROPOSED_NOT_EFFECTIVE` |
| P-08 | Almacén seguro aprovisionado | Referencia real del almacén (capa A y B), ubicación, cifrado en tránsito y en reposo, control de acceso, registro de auditoría, copias y recuperación, retención y borrado configurados | Administrador de datos | `ARCHITECTURE_DEFINED` |
| P-09 | Revisión de accesos | Lista de personas y roles con acceso, mínimo privilegio, fecha de revisión y revisor; altas y bajas documentadas | Administrador de datos + entidad | `ACCESS_REVIEWED = false` |
| P-10 | Aprobación operativa del tratamiento | Firma de la entidad sobre retención, borrado, propagación de retiradas, copias, brecha y acuerdos con procesadores | Entidad | `OPERATIONALLY_APPROVED = false` |
| P-11 | Entrevistadores nombrados y formados y jefe de campo | Roster con nombres y aceptación de rol, declaración de conflictos, formación completada con firma de supervisor y capacidad lingüística; jefe de campo nombrado | Propietario / jefe de campo | `UNASSIGNED / UNTRAINED` |
| P-12 | Canales y permisos de porteros | Autorización por canal y permiso documentado de cada club, marina, asociación, instalador o comercio; sin listas compradas o raspadas | Propietario / jefe de campo | `NOT_READY` |
| P-13 | Periodo de campo y revocación registrados | Anexo AN-3 firmado: fecha de inicio, caducidad, canal de revocación y efectos | Propietario | `PENDIENTE` |

## 2. Formularios de evidencia (completar y adjuntar)

### F-1 — Verificación de la entidad y del responsable del tratamiento

- Razón social: `[COMPLETAR]`
- NIF/CIF: `[COMPLETAR]`
- Domicilio registral: `[COMPLETAR]`
- Representante legal y cargo: `[COMPLETAR]`
- Documento de representación (referencia y fecha): `[COMPLETAR]`
- Persona o rol de privacidad: `[COMPLETAR]`
- Canal de privacidad monitorizado: `[COMPLETAR — no se publica en el repositorio]`
- Compromiso de respuesta: `[COMPLETAR]`
- Documento adjunto (referencia fuera de Git): `[COMPLETAR]`

### F-2 — Referencia de la revisión jurídica

- Revisor y cualificación: `[COMPLETAR]`
- Referencia del informe y fecha: `[COMPLETAR]`
- Ámbito revisado (marcar): GDPR ☐ / LOPDGDD ☐ / comunicaciones de captación ☐ / Lei 58/2019 ☐ /
  información al participante ☐ / consentimiento ☐ / retención y derechos ☐ / procesadores y
  transferencias ☐
- Conclusión sobre la base jurídica por finalidad (contacto, participación, grabación, seguimiento): `[COMPLETAR]`
- Condiciones o limitaciones impuestas por el revisor: `[COMPLETAR]`
- Documento adjunto (referencia): `[COMPLETAR]`

### F-3 — Aprobación del aviso de información y del consentimiento

- Versión e idioma aprobados (ES; PT solo si se autoriza Portugal): `[COMPLETAR]`
- Permisos separados confirmados (marcar): participación ☐ / grabación ☐ / cita desidentificada ☐ /
  seguimiento ☐
- Aprobación jurídica (referencia): `[COMPLETAR]`
- Aprobación de investigación (referencia): `[COMPLETAR]`

### F-4 — Atestación de aprovisionamiento del almacén seguro

- Referencia del almacén y proveedor: `[COMPLETAR]`
- Ubicación/región y base de la transferencia si aplica: `[COMPLETAR]`
- Cifrado en tránsito: `[COMPLETAR]` / Cifrado en reposo: `[COMPLETAR]`
- Control de acceso y roles: `[COMPLETAR]`
- Registro de auditoría: `[COMPLETAR]`
- Copias y recuperación: `[COMPLETAR]`
- Retención y borrado configurados: `[COMPLETAR]`
- Acuerdo con procesadores (si hay terceros): `[COMPLETAR]`
- Persona que aprovisiona y fecha: `[COMPLETAR]`
- Referencia de la revisión de accesos (P-09): `[COMPLETAR]`

### F-5 — Roster de entrevistadores y formación

| Entrevistador/a | Idioma(s) | Rol aceptado | Conflictos declarados | Formación completada (fecha) | Supervisor que firma | Canal autorizado |
| --- | --- | --- | --- | --- | --- | --- |
| `[COMPLETAR]` | `[COMPLETAR]` | ☐ | ☐ | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` |
| `[COMPLETAR]` | `[COMPLETAR]` | ☐ | ☐ | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` |

Jefe de campo nombrado: `[COMPLETAR]` — Aceptación: ☐ — Fecha: `[COMPLETAR]`

### F-6 — Autorización de canales y permisos de porteros

| Canal | Tipo (club/marina/asociación/instalador/comercio) | Persona o rol que autoriza | Permiso documentado (referencia) | Fecha | Alcance |
| --- | --- | --- | --- | --- | --- |
| `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` | `[COMPLETAR]` |

Ningún canal puede usarse sin permiso documentado del portero. No se admiten listas compradas, correos
raspados, registros privados de clientes de marinas ni campañas automatizadas en frío.

### F-7 — Registro del periodo y de la revocación

Ver anexo AN-3 del paquete de firma. Fecha de inicio `[COMPLETAR]`, caducidad `[COMPLETAR]`, canal de
revocación `[COMPLETAR]`.

## 3. Lo que el `lead` hará con esta evidencia

1. Comprobará cada documento y su referencia; no aceptará afirmaciones sin soporte.
2. Clasificará cada prerrequisito y registrará lo que falta, sin rellenar huecos con suposiciones.
3. Cuando P-01 a P-13 estén completos y verificados, propondrá el cambio de `AUTHORIZATION_STATUS` a
   `GRANTED` en un commit posterior, con la copia firmada registrada y sin datos personales en Git.
4. Solicitará una re-auditoría independiente antes de cualquier contacto real.
5. Si falta cualquier evidencia, el trabajo de campo sigue `BLOCKED` y la autorización sigue
   `NOT_GRANTED`.

## 4. Datos que no pueden inventarse y deben venir de ti o de un profesional

- Identidad registral de la entidad y del representante.
- Base de autoridad del firmante.
- Identidad y cualificación del asesor jurídico y su informe.
- Identidad del responsable del tratamiento y del contacto de privacidad.
- Referencia real del almacén aprovisionado y de su revisión de accesos.
- Nombres y formación de entrevistadores reales y del jefe de campo.
- Permisos de porteros de cada canal.
- Fechas de inicio y caducidad y canal de revocación.

Cualquier valor inventado en estos campos invalidaría la autorización y el paquete de recuperación.
