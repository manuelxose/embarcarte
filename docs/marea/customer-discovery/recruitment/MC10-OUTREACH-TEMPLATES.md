# MC-10 — Outreach templates (D6-B)

| Field                        | Value                                                                                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID                  | MC-10 / D6-B / MC10-OUTREACH-TEMPLATES                                                                                                                     |
| Milestone                    | MC-10 of 36 — primary customer discovery                                                                                                                   |
| Status                       | `BLOCKED — OUTREACH AUTHORIZATION NOT GRANTED`; all templates `NOT_APPROVED — NOT_SENT`                                                                    |
| Document state               | `NOT_EXECUTED` — no invitation, reminder, acknowledgement or identity statement has been issued                                                            |
| Templates                    | 8 templates × 2 languages (ES / EN) = 16 text variants; approved: 0; sent: 0                                                                               |
| Fieldwork counts             | 0 identified, 0 invited, 0 responded, 0 screened, 0 consented, 0 interviews                                                                                |
| Base                         | MC-09 HEAD `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3`                                                                                                      |
| Working branch               | `feature/marea-mc10-primary-customer-discovery`                                                                                                            |
| Date                         | 2026-11-01                                                                                                                                                 |
| Author                       | Agent B — Recruitment Operations Specialist                                                                                                                |
| Write scope                  | `docs/marea/customer-discovery/recruitment/` only                                                                                                          |
| Companions                   | `MC10-RECRUITMENT-PLAN.md` (D6); `MC10-RECRUITMENT-RESULTS.md` (D7)                                                                                        |
| Machine-readable authorities | `../data/research-status.json`, `../data/fieldwork-authorization.json`, `../data/decisions.json`                                                           |
| Is not                       | An approved communication, a live campaign, a marketing or sales asset, a consent record, a privacy notice in force, or evidence that any recipient exists |

STATUS: NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED)

## 0. Purpose and usage gate

This document holds the **prepared** Spanish and English outreach texts for MC-10. It is a review
artefact, not a communications tool. No template has been approved, personalised or sent, and no
recipient exists.

Blocking conditions, all currently true:

1. `AUTH-MC10-001` is `NOT_GRANTED`; no channel, volume, geography or participant category is
   authorised (`../data/fieldwork-authorization.json`).
2. There is no named data controller (Wave 0 item W0-03 `BLOCKED`) and no verified privacy contact
   (W0-04 `BLOCKED`), so a lawful information notice cannot be issued.
3. The lawful basis has not had qualified legal review (W0-05 `BLOCKED`) and the participant
   information/privacy notices are `NOT_APPROVED` (W0-06).
4. No interviewer panel is assigned or trained (W0-11 `NOT_APPROVED`).
5. The zero-incentive policy is `NOT_APPROVED` (W0-15), even though it proposes no incentive.
6. ES/EN translation equivalence is reviewed but not statistically established (W0-07 `PARTIAL`), and
   Portuguese instruments are `NOT_PRODUCED` (W0-08), so no PT template exists and northern Portugal
   cannot be fielded.

**A template may be used only if and when all of the following exist:** a granted, dated, scoped
`AUTH-MC10-001` naming the channel and geography; a designated controller and verified privacy
contact; completed legal review; approved information and privacy notices in the language being used;
an approved template version; an assigned, trained interviewer; and recorded fieldwork start
authorisation (W0-17). Until then every template in this document is `NOT_APPROVED — NOT_SENT`.

## 1. Mandatory disclosures

Every dispatched template must carry all eight disclosures below, in the recipient's language. The
disclosure block is reproduced inside each template in §4–§11 so a template cannot be sent without it.

| ID  | Mandatory disclosure                                                                                                                                                                    |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| M1  | This is **research**, not a sale and not marketing. Nothing is for sale; nothing can be bought, reserved or pre-ordered.                                                                |
| M2  | No product is available, certified, launched or priced. No availability, price, launch date, certification, warranty, compatibility, support, stock or delivery is promised or implied. |
| M3  | **MAREA is a proposed brand.** It has not completed legal clearance or trademark registration, is not a registered trademark, and no MAREA product is certified, available or for sale. |
| M4  | Participation is **voluntary**. The person may decline, skip questions or withdraw at any time without giving a reason and without any consequence.                                     |
| M5  | There is **no incentive** — no payment, voucher, prize, discount, product, credit or commercial benefit — for taking part.                                                              |
| M6  | A data notice must be provided and read **before** consent is requested. Consent is recorded separately, permission by permission, never bundled and never pre-ticked.                  |
| M7  | The study cannot be used to promise or imply future commercial access, priority, discount, launch allocation, pilot participation or a business relationship.                           |
| M8  | The template is `NOT_APPROVED — NOT_SENT` and cannot be used until `AUTH-MC10-001` is `GRANTED` and the fieldwork preconditions are met.                                                |

## 2. Placeholders and versioning conventions

- Placeholders use `{{UPPER_SNAKE_CASE}}`. No placeholder may be replaced with a guess.
- Unresolved placeholders are blockers, not blanks to be filled creatively:

| Placeholder                            | Meaning                                   | Current status                                        |
| -------------------------------------- | ----------------------------------------- | ----------------------------------------------------- |
| `{{RESEARCHER_NAME}}`                  | Full name of the assigned interviewer     | Not available — no interviewer panel assigned (W0-11) |
| `{{RESEARCHER_ROLE}}`                  | Approved role title                       | `NOT_APPROVED`                                        |
| `{{CONTROLLER_IDENTITY}}`              | Data controller legal identity            | **Not designated** (W0-03 `BLOCKED`)                  |
| `{{PRIVACY_CONTACT}}`                  | Verified privacy contact                  | **Does not exist** (W0-04 `BLOCKED`)                  |
| `{{RESPONSE_CHANNEL}}`                 | Approved reply channel                    | No channel authorised (W0-10 `BLOCKED`)               |
| `{{REFERENCE_TO_APPROVED_CHANNEL}}`    | Phrase naming the approved channel        | No channel authorised (W0-10 `BLOCKED`)               |
| `{{STUDY_REFERENCE}}`                  | Internal study reference                  | `MC-10 / AUTH-MC10-001`                               |
| `{{AREA}}`                             | Approved geographic area                  | Not authorised                                        |
| `{{DATE}}`                             | Interaction date                          | Recorded only after a real contact                    |
| `{{RETENTION_AND_DELETION_PROCEDURE}}` | Approved retention and deletion procedure | `NOT_APPROVED` (W0-14)                                |

- **No real recipient names, addresses, email addresses, telephone numbers, berth numbers, vessel names
  or other contact data appear in this document**, and none may be added. Templates are generic by
  design; personalisation is a runtime action against the restricted ledger, never a Git edit.
- Version control: templates are versioned with this document. Any wording change requires a dated
  amendment; the version in force when a message is sent governs that message.
- Language: the Spanish and English versions are parallel in meaning, not a translation-equivalence
  proof. Portuguese is not available.

## 3. Template control table

| ID          | Template                      | Languages | Channel          | Status                    |
| ----------- | ----------------------------- | --------- | ---------------- | ------------------------- |
| MC10-TPL-01 | Initial research invitation   | ES / EN   | `NOT_AUTHORIZED` | `NOT_APPROVED — NOT_SENT` |
| MC10-TPL-02 | Information sheet summary     | ES / EN   | `NOT_AUTHORIZED` | `NOT_APPROVED — NOT_SENT` |
| MC10-TPL-03 | Consent request reference     | ES / EN   | `NOT_AUTHORIZED` | `NOT_APPROVED — NOT_SENT` |
| MC10-TPL-04 | Follow-up / reminder          | ES / EN   | `NOT_AUTHORIZED` | `NOT_APPROVED — NOT_SENT` |
| MC10-TPL-05 | Decline acknowledgement       | ES / EN   | `NOT_AUTHORIZED` | `NOT_APPROVED — NOT_SENT` |
| MC10-TPL-06 | Withdrawal acknowledgement    | ES / EN   | `NOT_AUTHORIZED` | `NOT_APPROVED — NOT_SENT` |
| MC10-TPL-07 | Complaint / contact path      | ES / EN   | `NOT_AUTHORIZED` | `NOT_APPROVED — NOT_SENT` |
| MC10-TPL-08 | Researcher identity statement | ES / EN   | `NOT_AUTHORIZED` | `NOT_APPROVED — NOT_SENT` |

All templates: approved = 0, sent = 0, recipients = 0, replies = 0.

## 4. T-01 — Initial research invitation

| Field                | Value                                                     |
| -------------------- | --------------------------------------------------------- |
| Template ID          | MC10-TPL-01                                               |
| Status               | `NOT_APPROVED — NOT_SENT`                                 |
| Cannot be used until | `AUTH-MC10-001` is `GRANTED` and §0 preconditions are met |
| Channel              | `NOT_AUTHORIZED`                                          |

**ES — borrador no aprobado y no enviado**

> Asunto: Invitación a participar en un estudio de investigación sobre equipamiento y servicios para
> embarcaciones (no es una venta)
>
> Hola:
>
> Mi nombre es {{RESEARCHER_NAME}} y formo parte del equipo de investigación de EMBARCARTE. Estamos
> organizando un estudio de descubrimiento de clientes sobre cómo se usan y se compran equipos y
> servicios para embarcaciones. No es una venta ni una acción de marketing: no hay nada que comprar, no
> se ofrece ningún producto y no se mostrará ningún precio como oferta.
>
> Le contactamos {{REFERENCE_TO_APPROVED_CHANNEL}} para preguntar si aceptaría una conversación de
> investigación de unos 45–60 minutos. Antes de decidir, recibirá una hoja de información con el
> propósito del estudio, quién lo realiza, qué datos se recogerían, cómo se tratarían y durante cuánto
> tiempo se conservarían, y cómo ejercer sus derechos. Solo se le pedirá consentimiento después de que
> haya leído esa información, y se registrará permiso por permiso.
>
> MAREA es una marca propuesta: no ha superado la revisión legal ni el registro, no es una marca
> registrada, y ningún producto MAREA está certificado, disponible, lanzado ni a la venta. Esta
> invitación no promete ni implica acceso comercial futuro, prioridad, descuento, participación en
> pruebas ni ninguna relación comercial.
>
> La participación es voluntaria y no está remunerada: no hay ningún pago, vale, premio, descuento ni
> incentivo. Puede rechazar esta invitación o retirarse en cualquier momento sin dar explicaciones y sin
> consecuencias.
>
> Si desea recibir más información, responda por {{RESPONSE_CHANNEL}}. No es necesario que facilite
> datos personales en su respuesta.
>
> Gracias por su tiempo.
>
> {{RESEARCHER_NAME}} — {{RESEARCHER_ROLE}}, equipo de investigación de EMBARCARTE
>
> ESTADO DE LA PLANTILLA: NOT_APPROVED — NOT_SENT. No puede usarse hasta que AUTH-MC10-001 esté
> GRANTED.

**EN — unapproved, unsent draft**

> Subject: Invitation to take part in a research study about boat equipment and services (not a sale)
>
> Hello,
>
> My name is {{RESEARCHER_NAME}} and I am part of the EMBARCARTE research team. We are organising a
> customer discovery study about how boat equipment and services are used and bought. This is not a
> sale and not marketing: there is nothing to buy, no product is being offered, and no price will be
> presented as an offer.
>
> We are contacting you {{REFERENCE_TO_APPROVED_CHANNEL}} to ask whether you would accept a research
> conversation of about 45–60 minutes. Before you decide, you will receive an information sheet covering
> the purpose of the study, who runs it, what data would be collected, how it would be processed and how
> long it would be kept, and how to exercise your rights. Consent will be requested only after you have
> read that information, and it will be recorded permission by permission.
>
> MAREA is a proposed brand: it has not completed legal clearance or trademark registration, it is not a
> registered trademark, and no MAREA product is certified, available, launched or for sale. This
> invitation does not promise or imply future commercial access, priority, a discount, participation in
> a trial or any business relationship.
>
> Participation is voluntary and unpaid: no payment, voucher, prize, discount or incentive is offered.
> You may decline this invitation or withdraw at any time without giving a reason and without any
> consequence.
>
> If you would like more information, reply via {{RESPONSE_CHANNEL}}. You do not need to provide any
> personal data in your reply.
>
> Thank you for your time.
>
> {{RESEARCHER_NAME}} — {{RESEARCHER_ROLE}}, EMBARCARTE research team
>
> TEMPLATE STATUS: NOT_APPROVED — NOT_SENT. It cannot be used until AUTH-MC10-001 is GRANTED.

## 5. T-02 — Information sheet summary

| Field                | Value                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| Template ID          | MC10-TPL-02                                                                                    |
| Status               | `NOT_APPROVED — NOT_SENT`                                                                      |
| Cannot be used until | Controller designated, lawful basis reviewed, ES/EN notice approved, `AUTH-MC10-001` `GRANTED` |
| Channel              | `NOT_AUTHORIZED`                                                                               |

**ES — resumen de hoja de información (no aprobado, no enviado)**

> **Estudio:** descubrimiento de clientes sobre equipamiento y servicios para embarcaciones
> (`{{STUDY_REFERENCE}}`).
>
> **Quién lo realiza:** equipo de investigación de EMBARCARTE. Responsable del tratamiento:
> {{CONTROLLER_IDENTITY}}. Contacto de privacidad: {{PRIVACY_CONTACT}}.
>
> **Por qué se le invita:** se le ha identificado a través de {{REFERENCE_TO_APPROVED_CHANNEL}}, un
> canal autorizado para este estudio. No se ha accedido a registros de clientes ni a listas privadas.
>
> **Qué implica participar:** una conversación de 45–60 minutos con preguntas abiertas sobre su
> experiencia real con embarcaciones, equipamiento y servicios. No hay respuestas correctas o
> incorrectas. No es una venta y no se le pedirá que compre nada.
>
> **Datos:** se tomarán notas con un identificador anónimo, no con su nombre. La grabación de audio es
> opcional y puede rechazarla sin dejar de participar. Los permisos (participación, grabación, uso de
> frases anónimas y contacto posterior) se registran por separado. Conservaremos los datos solo durante
> el tiempo descrito en la política de conservación y supresión: {{RETENTION_AND_DELETION_PROCEDURE}}.
>
> **Derechos:** puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y
> portabilidad escribiendo a {{PRIVACY_CONTACT}}, y puede retirar su consentimiento en cualquier momento
> sin dar explicaciones. También puede reclamar ante la autoridad de protección de datos competente.
>
> **Estado de MAREA:** MAREA es una marca propuesta que no ha superado la revisión legal ni el registro.
> No es una marca registrada, ningún producto MAREA está certificado, disponible, lanzado ni a la venta,
> y no se promete ningún precio, disponibilidad, lanzamiento, certificación, garantía o compatibilidad.
>
> **Participación voluntaria y sin incentivo:** no hay pago, vale, premio, descuento ni beneficio
> comercial. Puede rechazar o retirarse en cualquier momento sin consecuencias. Esta hoja no promete ni
> implica acceso comercial futuro.
>
> **Consentimiento:** se solicitará solo después de que haya leído esta información; no está
> preseleccionado ni agrupado.
>
> ESTADO DE LA PLANTILLA: NOT_APPROVED — NOT_SENT. No puede usarse hasta que AUTH-MC10-001 esté GRANTED.

**EN — information sheet summary (unapproved, unsent)**

> **Study:** customer discovery about boat equipment and services (`{{STUDY_REFERENCE}}`).
>
> **Who runs it:** the EMBARCARTE research team. Data controller: {{CONTROLLER_IDENTITY}}. Privacy
> contact: {{PRIVACY_CONTACT}}.
>
> **Why you are invited:** you were identified through {{REFERENCE_TO_APPROVED_CHANNEL}}, a channel
> authorised for this study. No customer records or private lists have been accessed.
>
> **What taking part involves:** a 45–60 minute conversation with open questions about your real
> experience with boats, equipment and services. There are no right or wrong answers. It is not a sale
> and you will not be asked to buy anything.
>
> **Data:** notes are taken under an anonymous identifier, not your name. Audio recording is optional
> and you can decline it and still take part. Permissions (participation, recording, use of anonymous
> wording, and later contact) are recorded separately. Data is kept only for the period described in the
> retention and deletion procedure: {{RETENTION_AND_DELETION_PROCEDURE}}.
>
> **Your rights:** you can exercise access, rectification, erasure, objection, restriction and
> portability by writing to {{PRIVACY_CONTACT}}, and you can withdraw consent at any time without giving
> a reason. You may also complain to the competent data-protection authority.
>
> **MAREA status:** MAREA is a proposed brand that has not completed legal clearance or trademark
> registration. It is not a registered trademark, no MAREA product is certified, available, launched or
> for sale, and no price, availability, launch, certification, warranty or compatibility is promised.
>
> **Voluntary and unincentivised:** no payment, voucher, prize, discount or commercial benefit is
> offered. You may decline or withdraw at any time without consequence. This sheet does not promise or
> imply future commercial access.
>
> **Consent:** requested only after you have read this information; it is not pre-selected or bundled.
>
> TEMPLATE STATUS: NOT_APPROVED — NOT_SENT. It cannot be used until AUTH-MC10-001 is GRANTED.

## 6. T-03 — Consent request reference

| Field                | Value                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| Template ID          | MC10-TPL-03                                                                                     |
| Status               | `NOT_APPROVED — NOT_SENT`                                                                       |
| Cannot be used until | `AUTH-MC10-001` `GRANTED`, controller and privacy contact in place, consent instrument approved |
| Channel              | `NOT_AUTHORIZED`                                                                                |

This template is a **reference to the frozen consent instrument**, never a substitute for it. The
operative Spanish and English consent scripts are CONSENT-01 in
`MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` §5.2 / §6.2. If this reference and CONSENT-01 diverge, CONSENT-01
in the language of the interview governs.

**ES — referencia a la solicitud de consentimiento**

> Antes de comenzar la conversación, leeremos el guion de consentimiento CONSENT-01. Confirmamos lo
> siguiente:
>
> 1. Ha recibido y ha podido leer la hoja de información antes de esta solicitud.
> 2. El estudio es investigación, no una venta ni marketing; no hay nada que comprar y no se promete
>    disponibilidad, precio, lanzamiento, certificación, garantía ni compatibilidad.
> 3. MAREA es una marca propuesta, no registrada y sin revisión legal completada; ningún producto MAREA
>    está certificado, disponible ni a la venta.
> 4. La participación es voluntaria y sin incentivo; puede retirarse en cualquier momento sin dar
>    explicaciones.
> 5. Los permisos se registran por separado: participación, grabación de audio (opcional), uso de frases
>    anónimas (opcional) y contacto posterior (opcional). Ningún permiso está preseleccionado y la
>    negativa a uno de ellos no impide los demás.
> 6. Puede retirar cualquier permiso después; el registro indicará la fecha.
> 7. Contacto de privacidad: {{PRIVACY_CONTACT}}.
>
> ESTADO DE LA PLANTILLA: NOT_APPROVED — NOT_SENT. No puede usarse hasta que AUTH-MC10-001 esté GRANTED.

**EN — consent request reference**

> Before the conversation starts, we will read the CONSENT-01 script. We confirm:
>
> 1. You received and were able to read the information sheet before this request.
> 2. The study is research, not a sale or marketing; there is nothing to buy and no availability, price,
>    launch, certification, warranty or compatibility is promised.
> 3. MAREA is a proposed brand, not registered and without completed legal clearance; no MAREA product
>    is certified, available or for sale.
> 4. Participation is voluntary and unincentivised; you may withdraw at any time without giving a
>    reason.
> 5. Permissions are recorded separately: participation, audio recording (optional), use of anonymous
>    wording (optional), and later contact (optional). No permission is pre-ticked, and declining one
>    does not prevent the others.
> 6. You may withdraw any permission later; the record will show the date.
> 7. Privacy contact: {{PRIVACY_CONTACT}}.
>
> TEMPLATE STATUS: NOT_APPROVED — NOT_SENT. It cannot be used until AUTH-MC10-001 is GRANTED.

## 7. T-04 — Follow-up / reminder

| Field       | Value                                                                                 |
| ----------- | ------------------------------------------------------------------------------------- |
| Template ID | MC10-TPL-04                                                                           |
| Status      | `NOT_APPROVED — NOT_SENT`                                                             |
| Rule        | At most one reminder per invited candidate; no reminder after a decline or withdrawal |
| Channel     | `NOT_AUTHORIZED`                                                                      |

**ES — recordatorio (no aprobado, no enviado)**

> Asunto: Recordatorio de la invitación a un estudio de investigación (no es una venta)
>
> Hola:
>
> Le escribimos una sola vez más porque no hemos recibido respuesta a nuestra invitación para participar
> en un estudio de descubrimiento de clientes sobre equipamiento y servicios para embarcaciones. Se
> trata de una conversación de investigación de unos 45–60 minutos.
>
> El estudio es investigación, no una venta ni marketing: no hay nada que comprar, no se promete
> disponibilidad, precio, lanzamiento, certificación, garantía ni compatibilidad, y MAREA es una marca
> propuesta, no registrada y sin revisión legal completada. Ningún producto MAREA está certificado,
> disponible ni a la venta.
>
> Si no desea participar, no hace falta que responda: no volveremos a contactarle por este asunto. Si
> desea recibir la hoja de información, responda por {{RESPONSE_CHANNEL}}. La participación es
> voluntaria y no hay ningún incentivo, pago, vale, premio ni beneficio comercial.
>
> La hoja de información se facilita antes de solicitar cualquier consentimiento, y el consentimiento se
> registra permiso por permiso.
>
> Gracias.
>
> {{RESEARCHER_NAME}} — equipo de investigación de EMBARCARTE
>
> ESTADO DE LA PLANTILLA: NOT_APPROVED — NOT_SENT. No puede usarse hasta que AUTH-MC10-001 esté GRANTED.

**EN — reminder (unapproved, unsent)**

> Subject: Reminder — invitation to a research study (not a sale)
>
> Hello,
>
> We are writing once more because we have not received a reply to our invitation to take part in a
> customer discovery study about boat equipment and services. It is a research conversation of about
> 45–60 minutes.
>
> The study is research, not a sale or marketing: there is nothing to buy, no availability, price,
> launch, certification, warranty or compatibility is promised, and MAREA is a proposed brand, not
> registered and without completed legal clearance. No MAREA product is certified, available or for
> sale.
>
> If you do not wish to take part, you do not need to reply: we will not contact you again about this.
> If you would like the information sheet, reply via {{RESPONSE_CHANNEL}}. Participation is voluntary
> and there is no incentive, payment, voucher, prize or commercial benefit.
>
> The information sheet is provided before any consent is requested, and consent is recorded permission
> by permission.
>
> Thank you.
>
> {{RESEARCHER_NAME}} — EMBARCARTE research team
>
> TEMPLATE STATUS: NOT_APPROVED — NOT_SENT. It cannot be used until AUTH-MC10-001 is GRANTED.

## 8. T-05 — Decline acknowledgement

| Field       | Value                                                                                           |
| ----------- | ----------------------------------------------------------------------------------------------- |
| Template ID | MC10-TPL-05                                                                                     |
| Status      | `NOT_APPROVED — NOT_SENT`                                                                       |
| Rule        | No further contact after a decline, except a new invitation only if the person later re-opts in |
| Channel     | `NOT_AUTHORIZED`                                                                                |

**ES — acuse de rechazo (no aprobado, no enviado)**

> Asunto: Gracias por su respuesta
>
> Hola:
>
> Gracias por responder. Hemos registrado que no desea participar en este estudio de investigación. No
> volveremos a contactarle en el marco del estudio y no enviaremos más recordatorios.
>
> El estudio es investigación, no una venta ni marketing; no hay nada que comprar, ningún producto
> MAREA está disponible, certificado, lanzado ni a la venta, y MAREA es una marca propuesta, no
> registrada y sin revisión legal completada. Su decisión no tiene ninguna consecuencia y no afecta a
> ninguna relación que pueda tener con EMBARCARTE.
>
> En este estudio, la hoja de información se facilita antes de solicitar cualquier consentimiento.
>
> Si en el futuro desea más información sobre el estudio, puede solicitarla por {{RESPONSE_CHANNEL}}.
>
> Gracias por su tiempo.
>
> ESTADO DE LA PLANTILLA: NOT_APPROVED — NOT_SENT. No puede usarse hasta que AUTH-MC10-001 esté GRANTED.

**EN — decline acknowledgement (unapproved, unsent)**

> Subject: Thank you for your reply
>
> Hello,
>
> Thank you for replying. We have recorded that you do not wish to take part in this research study. We
> will not contact you again about the study and will not send further reminders.
>
> The study is research, not a sale or marketing; there is nothing to buy, no MAREA product is
> available, certified, launched or for sale, and MAREA is a proposed brand, not registered and without
> completed legal clearance. Your decision has no consequence and does not affect any relationship you
> may have with EMBARCARTE.
>
> In this study, the information sheet is provided before any consent is requested.
>
> If you would like more information about the study in the future, you can request it via
> {{RESPONSE_CHANNEL}}.
>
> Thank you for your time.
>
> TEMPLATE STATUS: NOT_APPROVED — NOT_SENT. It cannot be used until AUTH-MC10-001 is GRANTED.

## 9. T-06 — Withdrawal acknowledgement

| Field                | Value                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------- |
| Template ID          | MC10-TPL-06                                                                               |
| Status               | `NOT_APPROVED — NOT_SENT`                                                                 |
| Cannot be used until | Retention and deletion procedure approved (W0-14) and controller/privacy contact in place |
| Channel              | `NOT_AUTHORIZED`                                                                          |

**ES — acuse de retirada (no aprobado, no enviado)**

> Asunto: Confirmación de retirada del estudio
>
> Hola:
>
> Confirmamos que se ha retirado del estudio de investigación con fecha {{DATE}}. No volveremos a
> contactarle en el marco del estudio y no se realizarán nuevas preguntas ni grabaciones.
>
> Aplicaremos la política de conservación y supresión descrita en la hoja de información:
> {{RETENTION_AND_DELETION_PROCEDURE}}. Si desea ejercer sus derechos de acceso, rectificación,
> supresión, oposición, limitación o portabilidad, escriba a {{PRIVACY_CONTACT}}. También puede
> reclamar ante la autoridad de protección de datos competente.
>
> El estudio es investigación, no una venta ni marketing; MAREA es una marca propuesta, no registrada y
> sin revisión legal completada, y ningún producto MAREA está certificado, disponible, lanzado ni a la
> venta. No hay ningún incentivo asociado a la participación.
>
> Recuerde que la hoja de información se le facilitó antes de solicitar el consentimiento.
>
> Gracias por su tiempo.
>
> ESTADO DE LA PLANTILLA: NOT_APPROVED — NOT_SENT. No puede usarse hasta que AUTH-MC10-001 esté GRANTED.

**EN — withdrawal acknowledgement (unapproved, unsent)**

> Subject: Confirmation of withdrawal from the study
>
> Hello,
>
> We confirm that you have withdrawn from the research study with effect from {{DATE}}. We will not
> contact you again about the study, and no further questions or recordings will be made.
>
> We will apply the retention and deletion procedure described in the information sheet:
> {{RETENTION_AND_DELETION_PROCEDURE}}. If you wish to exercise your rights of access, rectification,
> erasure, objection, restriction or portability, write to {{PRIVACY_CONTACT}}. You may also complain to
> the competent data-protection authority.
>
> The study is research, not a sale or marketing; MAREA is a proposed brand, not registered and without
> completed legal clearance, and no MAREA product is certified, available, launched or for sale. There is
> no incentive associated with participation.
>
> For reference, the information sheet was provided to you before consent was requested.
>
> Thank you for your time.
>
> TEMPLATE STATUS: NOT_APPROVED — NOT_SENT. It cannot be used until AUTH-MC10-001 is GRANTED.

## 10. T-07 — Complaint / contact path

| Field                | Value                                                                   |
| -------------------- | ----------------------------------------------------------------------- |
| Template ID          | MC10-TPL-07                                                             |
| Status               | `NOT_APPROVED — NOT_SENT`                                               |
| Cannot be used until | Controller and privacy contact designated; complaint procedure approved |
| Channel              | `NOT_AUTHORIZED`                                                        |

**ES — vía de reclamación y contacto (no aprobado, no enviado)**

> Si tiene alguna duda, queja o problema relacionado con este estudio de investigación, puede:
>
> 1. Escribir al equipo de investigación en {{RESPONSE_CHANNEL}}, indicando el identificador del estudio
>    {{STUDY_REFERENCE}}.
> 2. Escribir al contacto de privacidad {{PRIVACY_CONTACT}} para cualquier cuestión sobre sus datos y
>    sus derechos.
> 3. Presentar una reclamación ante la autoridad de protección de datos competente en su país (en
>    España, la Agencia Española de Protección de Datos; en Portugal, la Comissão Nacional de Proteção
>    de Dados).
>
> Se le responderá sin coste y sin que ello afecte a su participación. Puede retirarse del estudio en
> cualquier momento sin dar explicaciones. La hoja de información se facilita antes de solicitar
> cualquier consentimiento. El estudio es investigación, no una venta ni marketing, no se
> promete disponibilidad, precio, lanzamiento, certificación ni compatibilidad, MAREA es una marca
> propuesta no registrada y sin revisión legal completada, ningún producto MAREA está certificado,
> disponible, lanzado ni a la venta, y la participación es voluntaria y sin incentivo.
>
> ESTADO DE LA PLANTILLA: NOT_APPROVED — NOT_SENT. No puede usarse hasta que AUTH-MC10-001 esté GRANTED.

**EN — complaint / contact path (unapproved, unsent)**

> If you have a question, complaint or issue about this research study, you can:
>
> 1. Write to the research team at {{RESPONSE_CHANNEL}}, quoting the study reference
>    {{STUDY_REFERENCE}}.
> 2. Write to the privacy contact {{PRIVACY_CONTACT}} about your data and your rights.
> 3. Lodge a complaint with the competent data-protection authority in your country (for example, the
>    Spanish Agency for Data Protection in Spain, or the Portuguese National Data Protection Commission
>    in Portugal).
>
> You will receive a reply at no cost and it will not affect your participation. You may withdraw from
> the study at any time without giving a reason. The information sheet is provided before any consent is
> requested. The study is research, not a sale or marketing; no
> availability, price, launch, certification or compatibility is promised; MAREA is a proposed brand,
> not registered and without completed legal clearance; no MAREA product is certified, available,
> launched or for sale; and participation is voluntary and unincentivised.
>
> TEMPLATE STATUS: NOT_APPROVED — NOT_SENT. It cannot be used until AUTH-MC10-001 is GRANTED.

## 11. T-08 — Researcher identity statement

| Field       | Value                                                                |
| ----------- | -------------------------------------------------------------------- |
| Template ID | MC10-TPL-08                                                          |
| Status      | `NOT_APPROVED — NOT_SENT`                                            |
| Use         | Read aloud at the start of a conversation, before the consent script |
| Channel     | `NOT_AUTHORIZED`                                                     |

**ES — declaración de identidad del investigador (no aprobada, no enviada)**

> Antes de empezar, y antes de pedirle consentimiento, quiero identificarme con claridad. Me llamo
> {{RESEARCHER_NAME}}, trabajo como {{RESEARCHER_ROLE}} en el equipo de investigación de EMBARCARTE y
> soy la persona que realizará esta conversación. No trabajo en ventas, no soy comercial y no tengo
> ningún papel en la venta de productos; no trabajo para ningún fabricante, distribuidor ni
> comercializador de electrónica marina.
>
> EMBARCARTE es quien promueve este estudio de descubrimiento de clientes. Esta conversación es
> investigación, no una venta ni marketing: no hay nada que comprar, no se le ofrecerá ningún precio y
> no se promete disponibilidad, lanzamiento, certificación, garantía ni compatibilidad de ningún
> producto. MAREA es una marca propuesta, no registrada y sin revisión legal completada; ningún producto
> MAREA está certificado, disponible, lanzado ni a la venta.
>
> La participación es voluntaria y no está remunerada: no hay ningún pago, vale, premio, descuento ni
> beneficio comercial. Puede retirarse en cualquier momento sin dar explicaciones.
>
> Antes de pedirle consentimiento le facilitaré la hoja de información con el propósito del estudio, el
> tratamiento de datos, la conservación y sus derechos, y el contacto de privacidad {{PRIVACY_CONTACT}}.
>
> ESTADO DE LA PLANTILLA: NOT_APPROVED — NOT_SENT. No puede usarse hasta que AUTH-MC10-001 esté GRANTED.

**EN — researcher identity statement (unapproved, unsent)**

> Before we start, and before I ask for your consent, I want to identify myself clearly. My name is
> {{RESEARCHER_NAME}}, I work as {{RESEARCHER_ROLE}} in the EMBARCARTE research team, and I am the
> person conducting this conversation. I do not work in sales, I am not a salesperson and I have no role
> in selling products; I do not work for any marine-electronics manufacturer, distributor or reseller.
>
> EMBARCARTE is the sponsor of this customer discovery study. This conversation is research, not a sale
> or marketing: there is nothing to buy, no price will be offered to you, and no availability, launch,
> certification, warranty or compatibility of any product is promised. MAREA is a proposed brand, not
> registered and without completed legal clearance; no MAREA product is certified, available, launched or
> for sale.
>
> Participation is voluntary and unpaid: no payment, voucher, prize, discount or commercial benefit is
> offered. You may withdraw at any time without giving a reason.
>
> Before asking for your consent I will provide the information sheet covering the purpose of the study,
> data processing, retention, your rights, and the privacy contact {{PRIVACY_CONTACT}}.
>
> TEMPLATE STATUS: NOT_APPROVED — NOT_SENT. It cannot be used until AUTH-MC10-001 is GRANTED.

## 12. Prohibited content checklist

A template may never contain any of the following. Their presence is a defect that blocks approval.

- A price, discount, price range, promotional offer or payment terms presented as an offer.
- A launch date, availability date, pre-order, reservation, waiting list, deposit or delivery promise.
- A certification, CE/RCD/RED/EMC approval, warranty, compatibility, support, stock or lead-time
  promise, or any implication of one.
- A statement that MAREA is a registered trademark, a cleared brand, an approved brand or an existing
  product line.
- A testimonial, customer reference, customer logo, quote, review or case study from any source.
- An incentive, payment, prize, voucher, discount, free product or commercial benefit.
- A promise of future commercial access, priority, allocation, pilot participation, partnership, dealer
  terms or any business relationship.
- Sales or marketing framing, urgency, scarcity, "limited places", "exclusive opportunity" or a
  call to action to buy.
- A solicitation of personal data before the information notice, or a request for more personal data
  than needed for the specific contact.
- Real recipient names, addresses, email addresses, telephone numbers, berth numbers, vessel names or
  any contact data of any person.
- Health, financial, biometric or other special-category data requests.
- A language version without a paired parallel version in the other approved language.
- A version without `NOT_APPROVED — NOT_SENT` status while the gate is closed.

## 13. Approval requirements and versioning

Before any template can change status from `NOT_APPROVED — NOT_SENT` to approved:

1. `AUTH-MC10-001` is `GRANTED`, dated and scoped, naming authorizer, participant categories,
   geography, channels, volume cap, spend and incentive status, duration and fieldwork lead.
2. Data controller designated and a verified privacy contact recorded (W0-03/W0-04).
3. Lawful basis and recruitment communications reviewed by a qualified legal adviser (W0-05).
4. Participant information and privacy notice approved in the language of use (W0-06).
5. ES/EN translation equivalence reviewed and recorded (W0-07); no PT version exists, so no PT use.
6. Interviewer panel assigned and trained, with approved interviewer responsibilities (W0-11).
7. Zero-incentive policy approved (W0-15).
8. Retention and deletion procedure approved (W0-14); restricted access policy accepted (W0-13);
   secure Layer A/B storage provisioned (W0-12).
9. A dated approval record names each approved template version and the approver.

Approval is per template and per language. A change to any approved template requires a dated amendment
and a new version; messages already sent remain governed by the version in force when sent. If any of
the conditions above lapses, every template reverts to `NOT_APPROVED — NOT_SENT`.

## 14. Reconciliation with the authoritative records

| Record                                 | Field                                                            | Authority value                                        | This document                                           |
| -------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------- |
| `../data/fieldwork-authorization.json` | `authorizationStatus`                                            | `NOT_GRANTED`                                          | every template `NOT_APPROVED — NOT_SENT`                |
| `../data/fieldwork-authorization.json` | `permittedContactMethods`                                        | `[]`                                                   | channel `NOT_AUTHORIZED`                                |
| `../data/fieldwork-authorization.json` | `directEmailAllowed` / `telephoneAllowed`                        | `false` / `false`                                      | no dispatch method approved                             |
| `../data/fieldwork-authorization.json` | `maximumOutreachVolume`                                          | `0`                                                    | 0 templates sent                                        |
| `../data/fieldwork-authorization.json` | `incentivesApproved`                                             | `false`                                                | M5 zero incentive; zero-incentive policy `NOT_APPROVED` |
| `../data/research-status.json`         | `participantCounts.invited` / `responded`                        | 0 / 0                                                  | 0 invitations, 0 responses                              |
| `../data/research-status.json`         | `wave0Checklist` W0-03, W0-04, W0-05, W0-06, W0-13, W0-14, W0-15 | `BLOCKED` / `NOT_APPROVED`                             | placeholders unresolved; approval blocked               |
| `../data/research-status.json`         | `commercialInvariants.trademarkLegalClearance`                   | `NOT_GRANTED`                                          | M3 proposed uncleared brand                             |
| `../data/decisions.json`               | D-029                                                            | MC-10 stops at the outreach gate and reports `BLOCKED` | no template sent                                        |
| `../data/decisions.json`               | D-032                                                            | no commercial restriction weakened                     | no price, availability or access promise                |

No template has been approved, personalised, addressed, sent or answered. There are 0 recipients, 0
dispatches, 0 replies and 0 consent records. These templates are preparation only and cannot be
mistaken for evidence that any outreach occurred.
