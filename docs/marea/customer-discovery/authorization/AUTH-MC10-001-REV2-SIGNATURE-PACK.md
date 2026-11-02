# Paquete de firma — AUTH-MC10-001 rev. 2 (emisión firmada)

| Campo | Valor |
| --- | --- |
| Documento | `MC10R-OWNER-SIGNATURE-PACK` |
| Programa | EMBARCARTE / MAREA |
| Hito | MC-10R — sub-hito de recuperación de MC-10 (36 hitos; no se crea el 37) |
| Fecha de preparación | 2026-11-02 |
| Preparado por | `lead` (Dirección del Programa de Recuperación) a petición del propietario |
| Estado del documento | `DRAFT_PREPARED` — `NOT_SIGNED` — `NOT_AUTHORIZATION` |
| Registro de autorización | `AUTH-MC10-001`; el estado actual sigue siendo `NOT_GRANTED` |
| Permiso de trabajo de campo | `FIELDWORK_PERMISSION = FALSE` hasta que exista firma y evidencia verificada |
| Autorización externa | `OUTREACH_AUTHORIZATION = NOT_GRANTED` |

> **Aviso esencial.** Este paquete prepara la emisión firmada de la autorización. **No es una
> autorización**, no la sustituye y no desbloquea el trabajo de campo. Una autorización firmada sin la
> evidencia de los demás prerrequisitos (responsable del tratamiento verificado, revisión jurídica,
> almacén aprovisionado, entrevistadores formados y canales autorizados) sigue sin permitir contacto
> alguno. Ningún dato de identidad, fecha, firma o evidencia ha sido inventado: los campos que dependen
> de ti están en blanco y marcados `[COMPLETAR]`.

## 0. Instrucciones de uso

1. Completa los bloques **A** (datos del autorizante), **B** (alcance) y **E** (firma), y los anexos que
   correspondan a tu parte (AN-1 a AN-3).
2. Aporta la evidencia externa del documento `MC10R-OWNER-EVIDENCE-CHECKLIST.md` (anexo AN-4): identidad
   registral, revisión jurídica, almacén, entrevistadores y canales. La evidencia con datos personales
   **no** se sube al repositorio; se deposita en el almacén seguro o se entrega fuera de Git y en el
   repositorio solo se registra su referencia y estado.
3. Entrega el paquete firmado y la evidencia al `lead`. El `lead` verificará y registrará una **copia
   emitida y firmada** de la revisión 2 (el borrador D13 se conserva como histórico). Si prefieres numerar
   una revisión nueva, será la revisión 3; el contenido es el de este paquete.
4. Solo después de esa verificación podrá registrarse `AUTHORIZATION_STATUS = GRANTED`. El cambio se hará
   en un commit posterior, con su re-auditoría independiente.
5. Hasta entonces: `AUTH_MC10_001 = NOT_GRANTED`, `OUTREACH_AUTHORIZATION = NOT_GRANTED`,
   `FIELDWORK_STATUS = BLOCKED`.

## 1. Estado actual y contenido que se firma

- **Lo que este paquete emite:** la autorización de investigación para una **Ola 1 exploratoria** de
  MC-10, limitada a los segmentos y la geografía propuestos, con incentivos y gasto propuestos a cero.
- **Lo que este paquete NO hace:** no acredita la identidad registral del responsable, no sustituye la
  revisión jurídica, no aprovisiona el almacén, no forma entrevistadores y no autoriza canales. Esos son
  los prerrequisitos P-02 a P-11 del anexo AN-4 y deben evidenciarse por separado.
- **Lo que NO se firma:** ninguna venta, publicación, precio, disponibilidad de producto, despliegue,
  testimonio público ni ampliación a Portugal o a otros segmentos.

## Bloque A — Datos del autorizante y base de autoridad

| Campo canónico | Valor | Estado |
| --- | --- | --- |
| `authorizingPerson` | `[COMPLETAR: nombre y apellidos]` | PENDIENTE |
| `authorizerRole` | `[COMPLETAR: cargo]` | PENDIENTE |
| `authorityBasis` | `[COMPLETAR: documento que acredita la facultad — escritura, acta, poder o delegación; fecha y referencia]` | PENDIENTE |
| Entidad que autoriza | `[COMPLETAR: razón social]` | PENDIENTE |
| `controllerIdentity` (entidad) | `[COMPLETAR: razón social, NIF/CIF, domicilio registral, representante legal]` | PENDIENTE |
| `privacyContact` | `[COMPLETAR: persona o rol, canal monitorizado, compromiso de respuesta]` | PENDIENTE |
| Teléfono/correo de contacto del propietario | `[COMPLETAR — no se publica en el repositorio]` | PENDIENTE |

La autorización solo es válida si quien firma puede obligar a la entidad y si la base de autoridad está
documentada. Una firma en nombre propio sin entidad identificada no permite designar responsable del
tratamiento.

## Bloque B — Alcance propuesto para firmar

### B.1 Identificación y vigencia

| Campo canónico | Valor propuesto | Estado |
| --- | --- | --- |
| `authorizationId` | `AUTH-MC10-001` | FIJO |
| `revision` | `2` (emisión firmada; el borrador previo queda como histórico) | FIJO |
| `programme` | `EMBARCARTE / MAREA — MC-10 customer discovery` | FIJO |
| `purpose` | Investigación cualitativa de descubrimiento de clientes para la Ola 1 exploratoria de MC-10; no es venta ni prospección comercial | FIJO |
| `authorizationDate` | `[COMPLETAR: fecha de firma AAAA-MM-DD]` | PENDIENTE |
| `effectiveStartDate` | `[COMPLETAR: inicio AAAA-MM-DD]` | PENDIENTE |
| `expiryDate` | `[COMPLETAR: fin AAAA-MM-DD; se recomienda no superar 6 meses]` | PENDIENTE |
| `fieldworkLead` | `[COMPLETAR: persona que coordina el campo y acepta el rol]` | PENDIENTE |

### B.2 Segmentos y geografía

| Campo canónico | Valor propuesto | Estado |
| --- | --- | --- |
| `permittedSegments` | `["SEG-01", "SEG-03", "SEG-04", "SEG-06"]` | PROPUESTO — confirmar |
| `permittedGeographies` | `["Rías Baixas / Galicia (España)"]` | PROPUESTO — confirmar |
| Portugal | Excluido hasta aprobar instrumentos PT, revisión jurídica PT y entrevistadores con capacidad PT | FIJO |
| `maximumCompletedInterviews` | `28` (techo de la Ola 1; el objetivo es 18–28) | PROPUESTO — confirmar |
| `maximumAuthorizedContacts` | `[COMPLETAR: techo de contactos autorizados, igual o superior a las entrevistas previstas]` | PENDIENTE |
| `authorizationDurationDays` | `[COMPLETAR: días desde el inicio hasta la caducidad]` | PENDIENTE |

### B.3 Canales y permisos

| Campo canónico | Valor propuesto | Estado |
| --- | --- | --- |
| `permittedContactChannels` | `[COMPLETAR: por ejemplo clubes náuticos, marinas, asociaciones, instaladores; solo canales con permiso de portero]` | PENDIENTE |
| `directEmailPermission` | `false` | PROPUESTO |
| `telephonePermission` | `false` | PROPUESTO |
| `thirdPartyIntroductionPermission` | `false` | PROPUESTO |
| `onSiteInvitationPermission` | `false` | PROPUESTO |
| `prohibitedChannels` | `["PURCHASED_CONTACT_LISTS", "SCRAPED_PERSONAL_EMAILS", "PRIVATE_MARINA_CUSTOMER_RECORDS", "COLD_AUTOMATED_CAMPAIGNS", "PAID_ADVERTISING_RECRUITMENT"]` | FIJO |
| `incentivePolicy` | `ZERO` (propuesta; requiere tu confirmación expresa) | PROPUESTO |
| `spendingCeiling` | `0` (propuesta; requiere tu confirmación expresa) | PROPUESTO |

### B.4 Instrumentos y almacenamiento aprobados

| Campo canónico | Valor propuesto | Estado |
| --- | --- | --- |
| `approvedInstrumentVersions` | `[]` hasta que se apruebe la versión efectiva v1.1.0; esta autorización no la aprueba | PENDIENTE |
| `approvedStorageReference` | `[COMPLETAR: referencia del almacén seguro aprovisionado y revisado]` | PENDIENTE |
| `assignedInterviewers` | `[COMPLETAR: identificadores del roster de entrevistadores nombrados y formados]` | PENDIENTE |
| `legalReviewReference` | `[COMPLETAR: referencia del informe de revisión jurídica]` | PENDIENTE |
| `approvalEvidence` | `[COMPLETAR: referencia de esta firma y de los anexos AN-4]` | PENDIENTE |
| `withdrawalRevocationMechanism` | Ver AN-3 | PENDIENTE |
| `currentAuthorizationStatus` | `NOT_GRANTED` hasta la verificación del `lead` | FIJO |

## Bloque C — Declaración del propietario (para firmar)

Al firmar, declaras que:

1. Eres la persona facultada para autorizar esta investigación en nombre de la entidad identificada en el
   bloque A, y que la base de autoridad adjunta lo acredita.
2. La investigación es **investigación de mercado**, no una venta, no una prospección comercial y no una
   oferta de producto; se explica al participante que no hay venta ni disponibilidad comprometida.
3. El alcance autorizado es el del bloque B: Ola 1 exploratoria, cuatro segmentos, Galicia, 18–28
   entrevistas, sin Portugal, sin incentivos y sin gasto distintos de los aprobados.
4. Entiendes que esta firma **no** sustituye la revisión jurídica, la verificación del responsable del
   tratamiento, el aprovisionamiento del almacén, la formación de entrevistadores ni la autorización de
   canales, y que el trabajo de campo seguirá bloqueado hasta que esas evidencias existan.
5. Aportarás la evidencia del anexo AN-4 y comunicarás cualquier cambio de alcance, gasto, incentivo o
   vigencia para que se registre como revisión.
6. No se usará ningún dato de participante fuera de los fines descritos, y se respetará el derecho de
   retirada y la revocación de esta autorización.

## Bloque D — Firma

| Elemento | Contenido |
| --- | --- |
| Nombre y apellidos | `[COMPLETAR]` |
| Cargo | `[COMPLETAR]` |
| Entidad | `[COMPLETAR]` |
| NIF/CIF | `[COMPLETAR]` |
| Documento de autoridad (referencia) | `[COMPLETAR]` |
| Lugar y fecha | `[COMPLETAR]` |
| Firma | `[FIRMA MANUSCRITA O FIRMA ELECTRÓNICA CUALIFICADA]` |
| Testigo o referencia del acta (si aplica) | `[COMPLETAR]` |

La firma electrónica cualificada, la firma manuscrita escaneada con verificación o el acta societaria
firmada son evidencias válidas; una declaración en un chat, un correo sin firma o la aprobación de un PR
no lo son.

## Bloque E — Qué hará el `lead` cuando reciba el paquete

1. Verificará la identidad del firmante y la base de autoridad contra la documentación aportada.
2. Comprobará que el alcance firmado coincide con el bloque B y que no hay ampliaciones implícitas.
3. Revisará la evidencia del anexo AN-4 y clasificará cada prerrequisito (`VERIFIED_COMPLETE`,
   `PREPARED_PENDING_APPROVAL`, `EXTERNAL_DEPENDENCY`, `NOT_READY`).
4. Registrará la copia emitida y firmada de la revisión 2 (o la revisión 3 si se numera así), con
   referencias de evidencia y sin datos personales en Git.
5. Solo si el conjunto está completo, cambiará `AUTHORIZATION_STATUS` a `GRANTED` en un commit posterior.
6. Solicitará la re-auditoría independiente y actualizará la revisión, el registro y el PR.
7. **No** iniciará contacto ni entrevista alguna hasta que el registro esté emitido, verificado y la
   puerta D14 esté abierta.

## Anexos que se firman o completan con este paquete

### AN-1 — Resolución de aprobación de las enmiendas de muestreo, cuotas y protocolo

El propietario aprueba, con efectos desde `[FECHA]`:

- `MC10R-SAMPLING-1.1.0-PROPOSED` (cuotas autoritativas 37/57; 40–80 como aspiración histórica no
  efectiva; Ola 1 18–28; Ola 2 mínimo 37/techo 57; Ola 3 solo con enmienda aprobada).
- `MC10R-SEGMENT-QUOTA-1.1.0-PROPOSED` (contrato de 15 campos por segmento).
- El protocolo enmendado (AM-01…AM-07) sin cambio de umbrales ni hipótesis de los experimentos.

Firma del propietario: `[COMPLETAR]` — Fecha: `[COMPLETAR]`

### AN-2 — Aprobación de la versión efectiva de instrumentos

El propietario y el responsable de investigación aprueban el paquete `MC10R-INSTRUMENT-AMENDMENT-v1.1.0`
(IV-01…IV-09) como versión efectiva **solo si** consta la revisión jurídica de la información al
participante y del consentimiento (IV-01, IV-04, IV-06) y la revisión cualificada ES/EN. Si falta alguna,
la aprobación es parcial y los instrumentos afectados no pueden administrarse.

Firma del propietario: `[COMPLETAR]` — Firma del responsable de investigación: `[COMPLETAR]` — Fecha: `[COMPLETAR]`

### AN-3 — Registro del periodo de campo y mecanismo de revocación

- Inicio autorizado: `[COMPLETAR]`; fin/caducidad: `[COMPLETAR]`.
- Revocación: el propietario puede revocar en cualquier momento mediante comunicación escrita a
  `[COMPLETAR: canal]`; la revocación es efectiva desde su recepción y registra la fecha, el alcance
  revocado y la persona que la emite.
- Efectos de la revocación: se detiene toda captación y entrevista nueva; se revisa qué datos ya
  recogidos pueden conservarse según la base jurídica y la retención aprobada; se documenta en el
  registro de autorización; no se destruye evidencia sujeta a obligación legal sin revisión jurídica.
- La autorización expira automáticamente en `[COMPLETAR]` y no se renueva sin una nueva revisión firmada.

Firma del propietario: `[COMPLETAR]` — Fecha: `[COMPLETAR]`

### AN-4 — Evidencia externa

Se completa con `MC10R-OWNER-EVIDENCE-CHECKLIST.md` (identidad registral, revisión jurídica, información
y consentimiento, almacén, accesos, entrevistadores, canales). Sin esa evidencia, la firma de este
paquete no abre la puerta de campo.

## Frase final

Firmar este paquete expresa la voluntad del propietario y aporta la base de la autorización, pero no
convierte por sí solo `AUTH-MC10-001` en `GRANTED`: el trabajo de campo sigue `BLOCKED` hasta que el
registro firmado y toda la evidencia del anexo AN-4 estén verificados y registrados.
