# MC10R — Legal review package (D15)

| Field                | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document ID          | MC-10R / D15 / `MC10R-LEGAL-REVIEW-PACKAGE`                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Document status      | `DRAFT_FOR_LEGAL_REVIEW`                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Legal review status  | `LEGAL_REVIEW_PENDING`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Date                 | 2026-11-01                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Owner                | `agent-c-governance` (Research Ethics, Privacy and Governance Specialist)                                                                                                                                                                                                                                                                                                                                                                                                              |
| Scope                | Legally reviewable package for the proposed Wave 1 customer-discovery fieldwork: GDPR, Spanish LOPDGDD, applicable Spanish outreach/electronic-communications rules, Portuguese Lei 58/2019, applicable Portuguese outreach/communications rules, participant-information duties, lawful basis per purpose, consent design, optional recording, research-data processing, data-subject rights, storage and retention, processors, transfers, and research-versus-marketing separation. |
| Is not               | legal advice, a legal opinion, a controller designation, a privacy notice, an approval, an authorization or a scope waiver                                                                                                                                                                                                                                                                                                                                                             |
| Authorization record | `AUTH-MC10-001` revision 2 — `DRAFT_PREPARED` / `NOT_GRANTED`                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Fieldwork permission | `FALSE`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Milestone            | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36)                                                                                                                                                                                                                                                                                                                                                                                                            |
| Branch               | `feature/marea-mc10r-fieldwork-recovery` (base `d1ac69a`)                                                                                                                                                                                                                                                                                                                                                                                                                              |

> **STATUS: DRAFT_FOR_LEGAL_REVIEW — LEGAL_REVIEW_PENDING. This package is not legal advice and records
> no legal conclusion. Controller identity is OPEN, privacy contact is OPEN, no qualified legal review
> has been obtained, and no fieldwork is authorized. Nothing here is `APPROVED`; only a real qualified
> legal adviser can perform the review this document requests.**

## 1. Purpose and limits

This package assembles, in reviewable form, the questions that must be answered by a qualified legal
adviser before any external fieldwork under `AUTH-MC10-001` could occur. It exists so that a real
professional review can start quickly and can cite exact clauses.

It has three limits:

1. **It is not legal advice.** It is prepared by a research-governance specialist, not by a lawyer, and
   it cannot be cited as evidence of compliance with any law.
2. **It records no legal conclusion.** Where the analysis could be read as deciding a legal question,
   the question is left open and, where relevant, stated in section 19.
3. **It is not a controller designation, a notice, an approval or an authorization.** The controller
   remains undesignated, the privacy contact remains absent, the participant information is not
   approved, `AUTH-MC10-001` remains `NOT_GRANTED` and fieldwork remains `BLOCKED`.

The status vocabulary for this document is fixed by the programme: `DRAFT_FOR_LEGAL_REVIEW`,
`LEGAL_REVIEW_PENDING`, `APPROVED`, `REJECTED`. This document is `DRAFT_FOR_LEGAL_REVIEW`; the review
status is `LEGAL_REVIEW_PENDING`; **no part of it is `APPROVED`** and no part may be marked `APPROVED`
by an agent. `REJECTED` or conditional outcomes from counsel must be recorded as findings with the
affected clauses identified.

## 2. Scope of the requested review

| #      | Legal domain                                      | Candidate instruments and sources                                                                                                                                                      | Verification state                                                                                                                                                                |
| ------ | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `L-01` | EU data protection                                | Regulation (EU) 2016/679 (GDPR), in particular Articles 5, 6, 7, 9, 12–14, 15–22, 24, 28, 30, 32–35, 44–49                                                                             | Named; applicability as EU law is factual, but every conclusion remains for counsel                                                                                               |
| `L-02` | Spanish data protection implementation            | Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD)                                                               | Named as the applicable Spanish implementation; **not reviewed**                                                                                                                  |
| `L-03` | Spanish outreach and electronic communications    | The Spanish information-society-services and e-commerce framework, candidate: Ley 34/2002, de 11 de julio (LSSI-CE), together with AEPD criteria on outreach and business-contact data | **CANDIDATE_NOT_VERIFIED** — counsel must determine which rules apply to research recruitment, and whether a research invitation is a commercial communication for those purposes |
| `L-04` | Portuguese data protection implementation         | Lei n.º 58/2019, de 8 de agosto (execution of the GDPR in Portugal)                                                                                                                    | Named as the applicable Portuguese implementation; **not reviewed**                                                                                                               |
| `L-05` | Portuguese outreach and electronic communications | The Portuguese electronic-communications privacy framework, candidate: Lei n.º 41/2004, de 18 de agosto, as amended, together with CNPD guidance on unsolicited communications         | **CANDIDATE_NOT_VERIFIED** — counsel must determine applicability to research recruitment and the required prior-consent or opt-out position                                      |
| `L-06` | Participant information duties                    | GDPR Articles 12–14; LOPDGDD information duties; Lei 58/2019; derived duties where a gatekeeper transmits contact data                                                                 | Designed in D16; **not reviewed**                                                                                                                                                 |
| `L-07` | Lawful basis, per purpose                         | GDPR Article 6; Article 9 (not sought); Article 7 for consent; possible legitimate-interests assessment; national conditions                                                           | **Not reviewed**; analysed per purpose in section 5                                                                                                                               |
| `L-08` | Consent design where appropriate                  | GDPR Articles 7 and 7(3); national conditions; four separately recorded permissions in D16                                                                                             | Designed, **not approved**                                                                                                                                                        |
| `L-09` | Optional audio recording                          | GDPR Article 6(1)(a) and Article 13; recording-specific information and withdrawal                                                                                                     | Designed, **not reviewed**                                                                                                                                                        |
| `L-10` | Research-data processing                          | GDPR Articles 5, 24, 25, 32, 89; minimisation, pseudonymisation versus anonymisation, special-category exclusion                                                                       | Designed, **not reviewed**                                                                                                                                                        |
| `L-11` | Data-subject rights                               | GDPR Articles 12, 15–22; national routes and identity verification                                                                                                                     | Designed, **not operable** (no controller or privacy contact)                                                                                                                     |
| `L-12` | Storage and retention                             | GDPR Articles 5(1)(e), 17, 28, 32; backup and deletion evidence                                                                                                                        | Designed, **not operable** (no provisioned store, no controller-set periods)                                                                                                      |
| `L-13` | Processors and tooling                            | GDPR Article 28, Article 30, Article 35                                                                                                                                                | No processor engaged; no tool approved                                                                                                                                            |
| `L-14` | International transfers                           | GDPR Articles 44–49                                                                                                                                                                    | No transfer planned; no tool selected; review required if one is introduced                                                                                                       |
| `L-15` | Research versus marketing separation              | GDPR, LOPDGDD, Lei 58/2019 and the e-communications frameworks above; brand and commercial restrictions in this repository                                                             | Designed, **not reviewed**                                                                                                                                                        |

## 3. Controller identification — `OPEN`

**No data controller is designated.** `controllerIdentity` and `privacyContact` are `null` in D13, `W0-03`
and `W0-04` are `BLOCKED` in `research-status.json`, and `BLK-MC10-02` remains open.

Rules that bind this package:

1. A proposed brand name (MAREA) is not a legal entity. A commercializer or trading name mentioned
   anywhere in the repository is **not** proof of the exact legal entity and must never be recorded as
   the controller.
2. No placeholder, generic mailbox, personal name, agent identity or invented registration identifier
   may fill `controllerIdentity` or `privacyContact`. Empty is the honest value.
3. The programme owner must supply, from verified corporate records, the exact legal entity (registered
   name, registration identifier, registered address), its establishment facts, and a verified,
   monitored, role-based privacy contact route, together with the data-protection-officer and
   EU-representative decisions.
4. Until that verification exists, no participant-information notice can lawfully be completed or
   issued, because GDPR Article 13 requires the controller's identity and contact details. This is a
   substantive blocker, not a drafting gap.

| Designation fact required                                 | State  | Owner of the fact               |
| --------------------------------------------------------- | ------ | ------------------------------- |
| Exact legal entity acting as controller                   | `OPEN` | Programme owner                 |
| Registration identifier and registered address            | `OPEN` | Programme owner                 |
| Establishment facts relevant to applicable national law   | `OPEN` | Programme owner + legal adviser |
| Verified monitored privacy contact route                  | `OPEN` | Programme owner + controller    |
| Data-protection-officer decision and contact              | `OPEN` | Controller                      |
| EU-representative decision (GDPR Article 27)              | `OPEN` | Controller                      |
| Joint-controller analysis for gatekeeper channels         | `OPEN` | Legal adviser                   |
| Breach decision-maker and competent supervisory authority | `OPEN` | Controller                      |

## 4. Processing-operation inventory

| ID      | Processing operation                                                                                                       | Personal data involved                                                                                  | Proposed basis (a question, not a conclusion)                                                                                          | Where defined                                                                              | Status                                       |
| ------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `OP-01` | Gatekeeper-mediated introduction request (a yacht club, marina, association or installer is asked to make an introduction) | Gatekeeper contact data; whether the gatekeeper transmits a candidate's contact data must be determined | **UNDECIDED** — depends on whether the gatekeeper transmits personal data and on the channel; separate analysis required               | D13 `thirdPartyIntroductionPermission`; D14 `P-09`                                         | Not reviewed; no channel authorized          |
| `OP-02` | Initial recruitment communication to a candidate                                                                           | Contact data and the fact of the communication                                                          | **UNDECIDED** — consent versus another basis must be analysed per channel and jurisdiction, and against the e-communications rules     | D13 `permittedContactChannels`, `directEmailPermission`, `telephonePermission`; D14 `P-09` | Not reviewed; every channel `NOT_AUTHORIZED` |
| `OP-03` | Eligibility screening before consent                                                                                       | Minimal pre-consent eligibility answers                                                                 | **UNDECIDED** — pre-consent processing needs its own basis and information                                                             | D16 §3; D14 `P-04`                                                                         | Designed, not reviewed                       |
| `OP-04` | Interview participation                                                                                                    | Pseudonymous record, role band, region, language, opinions                                              | Candidate: GDPR Article 6(1)(a) consent — but see section 5.2; national conditions not reviewed                                        | D16 §4 (`C1`); D13 `purpose`                                                               | Designed, not approved                       |
| `OP-05` | Optional audio recording                                                                                                   | Voice, which can identify a person                                                                      | Candidate: separate GDPR Article 6(1)(a) consent — but see section 5.3; recording-specific information and withdrawal must be reviewed | D16 §4 (`C2`)                                                                              | Designed, not approved                       |
| `OP-06` | Notes and pseudonymous research record                                                                                     | Notes, transcripts, coded extracts                                                                      | Candidate: consent tied to the participation purpose; minimisation and pseudonymisation rules must be reviewed                         | D15 §11; D16 §6                                                                            | Designed, not reviewed                       |
| `OP-07` | De-identified quotation use in internal research documents                                                                 | De-identified wording, re-identification risk                                                           | Candidate: separate consent (`C3`) — but de-identification is not anonymity and the review must determine the legal standard           | D16 §5 (`C3`)                                                                              | Designed, not approved                       |
| `OP-08` | Optional follow-up contact                                                                                                 | Contact data plus channel, scope and end date                                                           | Candidate: separate consent (`C4`) with recorded scope and expiry                                                                      | D16 §4 (`C4`)                                                                              | Designed, not approved                       |
| `OP-09` | Retention, deletion and backups                                                                                            | All of the above                                                                                        | Controller accountability; periods and owners not set                                                                                  | D16 §7; D14 `P-05`                                                                         | Designed, not operable                       |
| `OP-10` | Data-subject rights and complaints                                                                                         | Identity verification data held at minimum                                                              | Controller obligation; route and authority determination absent                                                                        | D15 §12, §17; D16 §3                                                                       | Designed, not operable                       |

## 5. Lawful-basis analysis per purpose

The programme must **not** assume that one lawful basis covers initial contact, participation, recording
and follow-up. They are distinct processing operations with different data, different expectations and
different legal conditions. The analysis below separates them and leaves each as a question for counsel.

### 5.1 Initial recruitment communication (`OP-01`, `OP-02`)

**Question, not conclusion.** No basis has been selected. The candidates are:

- **Consent** (GDPR Article 6(1)(a)) — but consent cannot be requested by an initial communication that
  itself needs a basis, and the e-communications rules may require prior consent for electronic
  outreach. The design cannot bootstrap consent from an unauthorized contact.
- **Legitimate interests** (GDPR Article 6(1)(f)) — requires a recorded three-part assessment (interest,
  necessity, balancing) that does not exist, and does not by itself satisfy e-communications rules for
  electronic marketing-like communications.
- **A business-contact route** — if a candidate is contacted in a professional capacity at a marina,
  installers' business or similar, national law and regulator practice must be reviewed before any
  reliance.
- **A gatekeeper introduction** — shifts part of the analysis to the gatekeeper's own basis and to a
  possible processor or joint-controller arrangement; the gatekeeper has not been approached and no
  permission exists.

Counsel must decide: which basis applies to each channel; whether a research invitation counts as a
commercial communication under the applicable national framework; what prior-consent or opt-out rules
apply; what the minimum information must be before any contact; and whether consent can be obtained
verbally at a first contact initiated by the participant rather than by the programme.

### 5.2 Interview participation (`OP-04`)

**Candidate basis:** GDPR Article 6(1)(a) consent, because the study is voluntary, non-contractual and
not necessary for a service. Conditions to be confirmed by counsel:

- whether the consent is valid when the controller's identity and contact are stated only after
  designation;
- the required specificity and granularity per purpose;
- the standard of evidence for verbal consent, and whether a witness or recording is required or
  permitted;
- national-law conditions on consent (Spanish LOPDGDD; Portuguese Lei 58/2019);
- the information that must be given at the point of consent (section 8);
- whether any legitimate-interest or public-interest basis is preferable for any part of the analysis
  (not assumed, and no such basis is currently designed).

### 5.3 Optional audio recording (`OP-05`)

**Candidate basis:** a separate GDPR Article 6(1)(a) consent, because recording is optional and distinct
from participation. Counsel must decide:

- what recording-specific information is required, and whether the consent must be written;
- whether a participant may participate without recording without any detriment (the design says yes);
- what happens to a recording after withdrawal of `C2`, including whether an already-verified verbatim
  excerpt may be retained;
- whether any transcription or recording tool would be a processor and require an Article 28 agreement;
- whether recording introduces a DPIA trigger.

### 5.4 De-identified quotation use (`OP-07`)

**Candidate basis:** a separate consent (`C3`). Counsel must decide whether de-identified quotation use
is a distinct purpose requiring its own consent, what de-identification standard applies, and whether any
internal research use can rely on a basis other than consent. Even if lawful, public testimonial or
marketing use is a different purpose with different rules (section 16) and is **not** covered by `C3`.

### 5.5 Optional follow-up contact (`OP-08`)

**Candidate basis:** a separate consent (`C4`) with recorded channel, scope and end date. Counsel must
decide whether a single follow-up consent can cover a later stage of the same study, what expiry is
required, and whether a fresh consent is needed when the study scope or instruments change. The design
requires fresh consent for a material change.

### 5.6 Analysis and aggregate reporting (`OP-06`, `OP-09`)

**Candidate basis:** tied to the consent given for participation, with analysis limited to the purposes
described. Counsel must decide whether analysis outputs that cannot identify a person can be published
as aggregate research without a separate basis, and how withdrawal of participation affects already
aggregated analysis. The programme's design says aggregates that cannot identify a person may stand
subject to a recorded controller decision; that rule requires review.

### 5.7 Prohibited special-category processing

GDPR Article 9 special-category data is **not sought**. The design excludes health, biometric, political,
religious, sexual, criminal and financial-account data. Participants may volunteer such information; the
stop-and-drop rule applies. Counsel must confirm that the exclusion and the incident rule are sufficient
and whether any volunteered special-category data would require an Article 9 condition.

## 6. Spanish national implementation (LOPDGDD)

The LOPDGDD is named as the applicable Spanish implementation and has **not** been reviewed. No
conclusion is drawn. Counsel must determine, at minimum:

1. Any additional information duties or formalities beyond GDPR Articles 12–14.
2. Age-related rules for information-society services, and whether they can apply to a research
   recruitment route.
3. The treatment of business-contact data in a professional context.
4. Any LOPDGDD requirements on consent, including for optional recording.
5. The interaction with the Spanish digital-rights provisions that may bear on communications.
6. The competent Spanish supervisory authority for a complaint and the required notice wording.

## 7. Portuguese national implementation (Lei 58/2019)

Lei 58/2019 is named as the applicable Portuguese implementation and has **not** been reviewed. Northern
Portugal is **excluded** from the proposed Wave 1 scope because Portuguese instruments are `NOT_PRODUCED`,
Portuguese recruitment compliance is unreviewed and Portuguese-language interviewer capability is not
approved. The Portuguese review requirement is recorded, not waived. Counsel must determine, at minimum:

1. Any additional information duties or formalities under Lei 58/2019.
2. Portuguese rules on consent, including for optional recording.
3. The treatment of business-contact data in a professional context.
4. The applicable Portuguese e-communications rules for research outreach (candidate framework flagged in
   `L-05`; not verified).
5. The competent Portuguese supervisory authority for a complaint and the required notice wording.
6. Whether any participant located in Portugal could be included at all without approved Portuguese
   instruments and a Portuguese-law review.

## 8. Participant-information duties

GDPR Article 13 requires, at the point personal data is obtained, at least: controller identity and
contact; data-protection-officer contact where applicable; purposes and lawful basis; legitimate
interests where relied on; recipients or categories of recipients; transfers and safeguards; retention
period or criteria; data-subject rights; the right to withdraw consent; the right to lodge a complaint
with a supervisory authority; whether provision is statutory or contractual and the consequences of
failure; and any automated decision-making. Where data is not obtained from the participant (for example
through a gatekeeper), Article 14 adds source and category duties and has its own timing rules.

D16 designs the required content. This package records that:

- the controller-identity element cannot be completed while `controllerIdentity` is `OPEN`;
- the complaint-route element cannot be completed while the competent authority is undetermined
  (section 17);
- the retention element cannot be completed while no controller has set a period;
- the Spanish and Portuguese language versions are **not** qualified-reviewed, and the Portuguese
  versions are not produced;
- no notice may be issued, and no consent may be requested, until these elements are complete.

## 9. Consent design where appropriate — review points

The design uses four separately recorded permissions: `C1` participation, `C2` optional audio recording,
`C3` de-identified quotation use, `C4` optional follow-up contact. The model is described in D16. Counsel
must review:

1. Whether the four permissions are correctly separated and whether any additional permission is
   required (for example for a later contact channel or a different publication surface).
2. Whether consent is freely given when the participant is a business contact approached at work.
3. Whether the evidence standard for each permission is met by the designed capture methods.
4. Whether the withdrawal mechanism satisfies GDPR Article 7(3) and national requirements, including the
   effect on data already processed and on aggregate outputs.
5. Whether consent can validly be obtained while the controller is not yet named in the information
   text — the programme's position is that it cannot, and this is a fielding blocker.
6. Whether the "no bundling", "no pre-ticked default", "no consent by silence" rules are sufficient.
7. Whether the zero-incentive proposal avoids any improper inducement; it is a proposal, not approved.

## 10. Optional recording permission

The recording permission is a separate permission (`C2`), optional, and declining it must not exclude
participation. Counsel must determine the recording-specific information, the consent evidence standard,
the retention and deletion rule for audio after a verified excerpt, the effect of withdrawal of `C2` on
an already-verified excerpt, and whether any transcription tool would introduce processor, transfer or
DPIA obligations. No recording tool or transcription processor is approved, selected or configured.

## 11. Research-data processing — review points

1. **Minimisation.** A field allowlist is designed; no field may be added without a written analysis need,
   a banding test and a deletion date.
2. **Pseudonymisation is not anonymisation.** A pseudonymous record remains personal data because a key
   exists and because attributes may single out an individual in a small, geographically concentrated
   population. No document may describe the study population as anonymous.
3. **Re-identification risk.** The small sample, the narrow segments, vessel bands, region, distinctive
   incidents and unusual local roles create re-identification risk; derived text must be banded and
   generalised.
4. **Special categories.** Not sought; volunteer stop-and-drop rule applies (section 5.7).
5. **Repository rule.** Only aggregate, non-identifying outputs may enter this repository; Layer A and
   Layer B data must never enter it. No participant data exists today.
6. **No AI processing of participant material.** No participant data, audio, transcript or raw note may be
   pasted into a consumer AI assistant, a free transcription service, a public chatbot, a personal cloud
   drive or a spreadsheet outside an approved store; no AI system may generate or reconstruct
   participant statements. This binds the agent tooling used to prepare MC-10R.

## 12. Data-subject rights

| Right                                | Designed route                                                                         | Current state                                                |
| ------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Information (Articles 13/14)         | Participant information in D16                                                         | **Blocked** — controller identity and complaint route absent |
| Access                               | Privacy contact route, lookup by pseudonymous identifier                               | **Blocked** — no privacy contact exists                      |
| Rectification                        | Correct the record and any affected downstream coding                                  | **Blocked**                                                  |
| Erasure                              | Delete contact key and research record; reconsider aggregates where they can identify  | **Blocked**                                                  |
| Restriction                          | Flag the record and stop analysis use                                                  | **Blocked**                                                  |
| Portability                          | Not applicable to this design (no automated processing based on consent for a service) | Recorded, not assumed silently                               |
| Objection                            | Stop processing and escalate to the controller                                         | **Blocked**                                                  |
| Withdraw consent                     | In-session STOP plus recorded withdrawal event                                         | In-session design only; no operable recorded route           |
| Complaint to a supervisory authority | Route stated in the notice                                                             | **Missing** from instrument text; authority undetermined     |

Counsel must determine identity-verification standards, deadlines and extension rules, the handling of
aggregate analysis after withdrawal or erasure, and the complaint route. No fee is charged. The honest
current statement is that MC-10 has **no operable rights channel**.

## 13. Storage and retention

Storage architecture is defined and local synthetic tests are recorded; the store is **not provisioned**:
`PROVISIONED = false`, `ACCESS_REVIEWED = false`, `OPERATIONALLY_APPROVED = false`. No retention period
and no accountable retention owner exist because no controller is designated.

Counsel must review: controller-set retention periods per data class; deletion and backup destruction
rules; evidence expected of deletion; the rule that no data may be retained "for possible future
research" without a fresh basis and consent; and the separation of Layer A (contact and permission keys)
from Layer B (pseudonymous research data).

## 14. Processors and tooling

No processor is engaged and no tool is approved. If a tool is introduced after authorization, the
prerequisites are: a written Article 28 data-processing agreement (subject matter, duration, nature and
purpose, instructions, confidentiality, security, sub-processor rules, assistance with rights and breach
notification, deletion or return, audit); a security review; a sub-processor list reviewed before use;
and a DPIA determination. No cloud service, transcription service or CRM has been selected or configured.
The repository's commerce-notification mail code is not a research channel and is not configured for
research recipients.

## 15. International transfers

No transfer outside the EEA is planned, because no tool, platform or processor has been selected. If any
tool or processor is later introduced, a Chapter V transfer review is required (transfer identification,
safeguard, transfer-impact assessment where applicable, and contractual clauses). No transfer safeguard
is asserted to exist.

## 16. Research versus marketing separation

This is a distinct legal and governance boundary, not a wording preference:

1. **Purpose limitation.** The proposed purpose is internal research only. Commercial or marketing use of
   research material is a different purpose with its own lawful basis, information duty and, for
   electronic marketing, separate e-communications rules.
2. **Quotation versus testimonial.** `C3` permits de-identified wording in internal research documents
   only. Public testimonial, advertising or product-page use is **not** covered: it requires a separate,
   reviewed permission, a de-identification review, a named approver and a check against brand and
   commercial governance.
3. **Brand and commercial restrictions are unchanged.** `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`,
   `SOURCE_IP_CLEARANCE = NOT_CLEARED`, `COMMERCIAL_PUBLICATION = BLOCKED`, `PRODUCT_SALES = BLOCKED`.
   No research material may appear in public or commercial surfaces while those restrictions hold.
4. **No lead generation.** Research contact data may not be used as leads, sales prospects, investor
   material or partner reporting. The repository and the study design must not create a lead path.
5. **No inferred demand.** Preparation, drafts or a passing recovery gate never become customer evidence;
   no market, price or purchase-intent claim may be based on them.

## 17. Supervisory authorities and the complaint route

The statutory data-protection supervisory authorities are the applicable bodies before which a data
subject may lodge a complaint: in Spain the **Agencia Española de Protección de Datos (AEPD)**, and in
Portugal the **Comissão Nacional de Proteção de Dados (CNPD)**. These are named for qualified review as
the candidate complaints bodies.

This package does **not** assert a determinate jurisdiction, a determinate competent authority or any
contact details as verified. The final determination depends on the controller's establishment and on the
participant's location, neither of which is established while `controllerIdentity` is `OPEN`. Contact
details must not be invented or copied from an unverified source; the approved participant information
must state the route determined by counsel.

## 18. Legal-review checklist

Status vocabulary for this checklist is the binding set: `DRAFT_FOR_LEGAL_REVIEW`,
`LEGAL_REVIEW_PENDING`, `APPROVED`, `REJECTED`. Every item is `LEGAL_REVIEW_PENDING`; no item is
`APPROVED`. The reviewer is the qualified legal adviser to be appointed by the programme owner; no
reviewer is named because none has been appointed.

| #       | Review item                                                                                                      | Blocking clause                                                        | Status                 | Evidence of closure                                             |
| ------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------- |
| `LC-01` | Controller legal identity, establishment and privacy contact verified                                            | D13 `controllerIdentity`, `privacyContact`; D14 `P-02`; D15 §3; D16 §3 | `LEGAL_REVIEW_PENDING` | Verified corporate record plus counsel confirmation             |
| `LC-02` | Lawful basis for `OP-01`/`OP-02` (introductions and initial recruitment) determined per channel and jurisdiction | D13 `permittedContactChannels`; D14 `P-09`; D15 §5.1                   | `LEGAL_REVIEW_PENDING` | Written analysis per channel                                    |
| `LC-03` | Spanish e-communications and LOPDGDD position for research outreach determined                                   | D15 `L-03`, §6; D13 `directEmailPermission`, `telephonePermission`     | `LEGAL_REVIEW_PENDING` | Written counsel determination                                   |
| `LC-04` | Portuguese Lei 58/2019 and e-communications position determined, or Portugal confirmed excluded                  | D15 `L-04`, `L-05`, §7; D13 `permittedGeographies`                     | `LEGAL_REVIEW_PENDING` | Written counsel determination or recorded exclusion             |
| `LC-05` | Lawful basis for participation (`OP-04`) and consent conditions confirmed                                        | D15 §5.2; D16 §4                                                       | `LEGAL_REVIEW_PENDING` | Written opinion on Article 6/7 and national conditions          |
| `LC-06` | Optional recording (`OP-05`) information, evidence and withdrawal reviewed                                       | D15 §5.3, §10; D16 §4 (`C2`)                                           | `LEGAL_REVIEW_PENDING` | Written opinion plus approved recording text                    |
| `LC-07` | De-identification standard for `C3` and internal quotation use reviewed                                          | D15 §5.4, §16; D16 §5                                                  | `LEGAL_REVIEW_PENDING` | Written opinion and de-identification standard                  |
| `LC-08` | Follow-up consent (`C4`) scope, channel and expiry reviewed                                                      | D15 §5.5; D16 §4 (`C4`)                                                | `LEGAL_REVIEW_PENDING` | Written opinion plus approved text                              |
| `LC-09` | Participant information (Articles 13/14) complete in ES and EN, and PT if used                                   | D16 §3; D14 `P-04`                                                     | `LEGAL_REVIEW_PENDING` | Approved versioned notice with counsel sign-off                 |
| `LC-10` | Data-subject rights routes, deadlines and identity verification reviewed                                         | D15 §12; D16 §7                                                        | `LEGAL_REVIEW_PENDING` | Written opinion plus approved route                             |
| `LC-11` | Retention periods and deletion evidence reviewed for each data class                                             | D15 §13; D16 §7; D14 `P-05`                                            | `LEGAL_REVIEW_PENDING` | Controller-set periods plus counsel confirmation                |
| `LC-12` | Processor, tooling, DPIA and transfer positions reviewed                                                         | D15 §14, §15; D14 `P-05`                                               | `LEGAL_REVIEW_PENDING` | Written opinion; no processor engaged until then                |
| `LC-13` | Research-versus-marketing separation and any public testimonial route reviewed                                   | D15 §16; D16 §5                                                        | `LEGAL_REVIEW_PENDING` | Written opinion; brand/commercial governance cleared separately |
| `LC-14` | Competent supervisory authority and complaint route determined for each participant jurisdiction                 | D15 §17; D16 §3                                                        | `LEGAL_REVIEW_PENDING` | Counsel determination plus approved notice wording              |

## 19. Unresolved legal questions

Each question names the exact clause it blocks and the evidence required to close it. None is answered.

| ID     | Question counsel must decide                                                                                                               | Exact clause blocked                                                                                 | Required evidence for closure                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `Q-01` | Which legal entity is the controller, where is it established, and is an EU representative required?                                       | D13 `controllerIdentity`, `privacyContact`; D14 `P-02`; D15 §3; D16 notice content                   | Verified corporate registration and establishment facts; counsel determination; DPO and representative decisions       |
| `Q-02` | On what basis may a gatekeeper be asked to make an introduction, and what is the gatekeeper's data-flow role?                              | D13 `thirdPartyIntroductionPermission`, `permittedContactChannels`; D14 `P-09`; D15 `OP-01`          | Channel analysis plus gatekeeper permission and, if data is transmitted, an Article 28 or joint-controller arrangement |
| `Q-03` | On what basis may an initial recruitment communication be sent to a candidate, per channel and jurisdiction?                               | D13 `permittedContactChannels`, `directEmailPermission`, `telephonePermission`; D14 `P-09`; D15 §5.1 | Written basis analysis per channel with any required assessment                                                        |
| `Q-04` | Does a research invitation count as a commercial communication under the Spanish framework, and what prior-consent or opt-out rules apply? | D13 `permittedContactChannels`; D15 `L-03`; D16 §3                                                   | Written counsel determination and compliant wording                                                                    |
| `Q-05` | Does the Portuguese framework permit any research outreach, and what approval is required?                                                 | D13 `permittedGeographies`; D14 `P-07`, `P-09`; D15 `L-05`, §7                                       | Written counsel determination plus approved PT instruments                                                             |
| `Q-06` | What is required for valid consent to participate, including evidence of verbal consent and any national conditions?                       | D13 `purpose`, `approvedInstrumentVersions`; D15 §5.2; D16 §4 (`C1`)                                 | Written opinion plus approved consent instrument version                                                               |
| `Q-07` | Is a separate recording consent sufficient, what information must be given, and what are its withdrawal effects?                           | D15 §5.3, §10; D16 §4 (`C2`)                                                                         | Written opinion plus approved recording text and withdrawal rule                                                       |
| `Q-08` | What de-identification standard applies to internal quotation use, and is `C3` sufficient?                                                 | D15 §5.4, §16; D16 §5 (`C3`)                                                                         | Written opinion plus de-identification review standard                                                                 |
| `Q-09` | Can follow-up contact be covered by a scoped consent, and what expiry or fresh-consent rule applies?                                       | D15 §5.5; D16 §4 (`C4`)                                                                              | Written opinion plus approved follow-up text                                                                           |
| `Q-10` | What participant-information elements must be added for Spanish law, including age-related and business-contact rules?                     | D16 §3; D15 `L-02`, §6                                                                               | Written opinion plus approved ES notice                                                                                |
| `Q-11` | What participant-information elements must be added for Portuguese law?                                                                    | D16 §3; D15 `L-04`, §7                                                                               | Written opinion plus approved PT notice, or recorded exclusion                                                         |
| `Q-12` | Which supervisory authority is competent and what complaint route must the notice state?                                                   | D13 `privacyContact`; D15 §17; D16 §3                                                                | Counsel determination plus approved wording; no unverified contact details                                             |
| `Q-13` | Is a data protection impact assessment required for this design (audio, small population, re-identification risk)?                         | D14 `P-04`, `P-05`; D15 §14                                                                          | Recorded DPIA determination and, if required, a completed assessment                                                   |
| `Q-14` | What retention periods and deletion evidence must the controller set per data class, and who is accountable?                               | D13 `withdrawalRevocationMechanism`; D14 `P-05`; D15 §13; D16 §7                                     | Controller-set retention schedule plus deletion/deletion-evidence procedure                                            |
| `Q-15` | How must rights requests and withdrawal events be handled, verified and propagated into analyses?                                          | D15 §12; D16 §7; D14 `P-04`                                                                          | Written opinion plus operable rights and withdrawal procedure                                                          |
| `Q-16` | What processor, sub-processor, DPIA and transfer safeguards are needed before any transcription or cloud tool is used?                     | D15 §14, §15; D14 `P-05`                                                                             | Written opinion; Article 28 agreement; transfer review if applicable                                                   |
| `Q-17` | Is any public testimonial or marketing use of research material lawful, and what separate permission and brand approval does it require?   | D15 §16; D16 §5                                                                                      | Written opinion plus separate consent route and commercial/brand clearance                                             |

## 20. Required counsel output

A closing review must be a written, dated, signed artefact from a qualified legal adviser (or a named
legal firm acting through a named adviser), which:

1. cites this package's version and the versions of D13, D14 and D16 reviewed;
2. answers each of `Q-01`…`Q-17` explicitly, or records it as undetermined with reasons;
3. identifies the controller-jurisdiction determination and the competent complaint route per
   participant jurisdiction;
4. lists the exact amendments required before fieldwork, referencing the affected clause;
5. states whether any clause may remain open without blocking fieldwork (a qualified legal judgement,
   not an agent's);
6. is recorded in the programme's governance set outside the repository, with only its reference and
   outcome summary entering the repository.

An agent, a validator, a template or a task completion cannot produce this output or substitute for it.
The legal-review reference then enters D13 `legalReviewReference`.

## 21. Status register

| Item                           | Status                        | Note                                        |
| ------------------------------ | ----------------------------- | ------------------------------------------- |
| This legal review package      | `DRAFT_FOR_LEGAL_REVIEW`      | Prepared; not reviewed                      |
| Legal review                   | `LEGAL_REVIEW_PENDING`        | No adviser appointed, no opinion obtained   |
| Controller identity            | `OPEN`                        | No verified legal entity                    |
| Privacy contact                | `OPEN`                        | No verified contact                         |
| Lawful basis, any purpose      | `LEGAL_REVIEW_PENDING`        | Questions `Q-03`…`Q-09`                     |
| Spanish law review             | `LEGAL_REVIEW_PENDING`        | `L-02`, `L-03`; `Q-04`, `Q-10`              |
| Portuguese law review          | `LEGAL_REVIEW_PENDING`        | `L-04`, `L-05`; `Q-05`, `Q-11`              |
| Participant information notice | `NOT_APPROVED`                | Cannot be issued while controller is `OPEN` |
| Consent design                 | `PROPOSED_NOT_APPROVED`       | `CONSENT-01` v`1.1.0` candidate             |
| Recording permission design    | `PROPOSED_NOT_APPROVED`       | `C2`, not reviewed                          |
| Rights handling                | `DESIGNED_NOT_OPERABLE`       | No controller or contact route              |
| Storage                        | `ARCHITECTURE_DEFINED` only   | Not provisioned or approved                 |
| Retention schedule             | `DESIGNED_PENDING_CONTROLLER` | Periods not set                             |
| Processors                     | none engaged                  | No tool selected                            |
| Transfers                      | none planned                  | No tool selected                            |
| Any `APPROVED` item            | **none**                      | Only a real qualified review can approve    |

## 22. Change control and cross-references

- This package may be extended but not weakened; a new legal requirement from counsel is added as a
  clause and, where relevant, as a D14 prerequisite.
- The package must be re-versioned when the controller is designated, when any instrument version is
  approved, when a processor or tool is introduced, or when a jurisdiction is added.
- No statement in this package may be converted into a legal conclusion by editing; only counsel's
  written output closes a question.

| Document                                                                             | Relationship                                                         |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `recovery/MC10R-RECOVERY-EXECUTION-PLAN.md` (D2)                                     | Binding canonical registration and status model                      |
| `recovery/governance/AUTH-MC10-001-REV2-DRAFT.md` (D13)                              | Authorization fields this review feeds (`legalReviewReference`)      |
| `recovery/governance/MC10R-AUTHORIZATION-GATE.md` (D14)                              | Prerequisites `P-03`, `P-04`, `P-07` and the fail-closed gate        |
| `recovery/governance/MC10R-PRIVACY-AND-CONSENT-PACKAGE.md` (D16)                     | Participant information, consent and withdrawal design under review  |
| `docs/marea/customer-discovery/methodology/MC10-RESEARCH-ETHICS-AND-PRIVACY.md` (D3) | Prior research-ethics and privacy design                             |
| `docs/marea/customer-discovery/MC10-FIELDWORK-AUTHORIZATION.md`                      | Authorization register and unblock sequence                          |
| `docs/marea/market-validation/data/governance-status.json`                           | Unchanged commercial and brand restrictions referenced in section 16 |
