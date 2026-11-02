# MC-14 — Legal release evidence gates

| Field | Value |
|---|---|
| Deliverable | D16 `MC14-LEGAL-RELEASE-EVIDENCE-GATES.md` |
| Milestone | MC-14/36 |
| Date | 2026-11-02 |
| Owner | Programme Lead |
| Machine data | `data/release-evidence-gates.json` |
| Gates | 13 (0 closed) |
| Documents | 24 (0 executed) |
| Status | ALL_GATES_OPEN — no document executed, signed, certified or approved |


## 1. Rule

A gate closes only when the named external artefact exists and has been
independently verified. A plan, a budget line, an illustrative envelope, a
design document or an agent's opinion is not evidence. No document may be marked
`EXECUTED`, `SIGNED`, `CERTIFIED` or `APPROVED` without real supporting
evidence.

## 2. Release gates

| Gate | Name | Status | Closure owner | Decision | Required evidence |
|---|---|---|---|---|---|
| GATE-MARKET-PLACEMENT | EU market placement (conformity, DoC, CE, traceability) | BLOCKED | PRODUCT_COMPLIANCE_ENGINEER | DEC-MC14-001 | Final-product conformity assessment; EU declaration of conformity; Accredited test reports; Technical documentation file; Traceability and labelling; Instructions and safety information in the required language |
| GATE-SAFETY-PILOT | PILOT safety gate | BLOCKED | HARDWARE_LEAD | DEC-MC14-010 | Independent hazard analysis and safety case; Physical E-stop and fail-closed evidence; Bench/HIL test reports; Supervised sea-trial reports; Independent safety review; Product liability insurance |
| GATE-IP-CLEARANCE | Intellectual-property clearance | BLOCKED | LEGAL_COUNSEL | DEC-MC14-003 | Assignment/ownership chain; Contributor waivers; Outbound licence decision; Third-party notices bundle and SBOM; MAREA trademark clearance and filing; NMEA licence/certification if claimed |
| GATE-DATA-LICENSING | Marine data licensing | BLOCKED | DATA_RIGHTS_OWNER | DEC-MC14-006 | Signed chart licence or user-supplied-chart policy; Signed weather licence with display/cache/offline rights; Tile/basemap licence or self-hosted licensed stack; Attribution and freshness implementation; Provider terms register |
| GATE-PRIVACY-DPA-DPIA | Privacy, DPIA and processor agreements | BLOCKED | DPO | DEC-MC14-014 | Controller/processor role map; DPIA screening and report; Article 28 DPA and subprocessor register; Privacy notices ES/EN; Retention and export schedule; Breach-response runbook; Tenant isolation test |
| GATE-CRA-CYBERSECURITY | CRA cybersecurity lifecycle | BLOCKED | SECURITY_LEAD | DEC-MC14-015 | CRA classification memo; Secure development lifecycle; Vulnerability-handling and CVD policy; SBOM and dependency monitoring; Support-period decision; Incident-reporting runbook and exercise; Conformity assessment and technical documentation |
| GATE-CONSUMER-TERMS | Consumer, B2B and installer contracts | BLOCKED | LEGAL_COUNSEL | DEC-MC14-016 | Consumer terms of sale ES/EN; B2B sales terms; Subscription terms; Returns/cancellation policy; Warranty and RMA workflow; Installer/distributor agreements; Counsel sign-off |
| GATE-COMMERCIAL-CLAIMS | Commercial claims approval | BLOCKED | COMMERCIAL_DIRECTOR | DEC-MC14-018 | Approved claim records with evidence; Bilingual semantic parity check; Channel and audience approval; Trademark public-use decision; Financial-claim prohibition review |
| GATE-PRICING | Price approval | BLOCKED | FINANCE_LEAD | DEC-MC14-013 | Approved price list; Bottom-up cost and margin evidence; VAT and tax confirmation; Price-display and renewal rules |
| GATE-PAYMENTS | Payments and merchant agreement | BLOCKED | FINANCE_LEAD | DEC-MC14-013 | Executed merchant agreement; Payment-role and SCA analysis; Refund/chargeback procedure; PCI-scope confirmation; Checkout test evidence |
| GATE-INSURANCE | Liability insurance | BLOCKED | FINANCE_LEAD | DEC-MC14-012 | Broker indication and quotation; Policy wording with limits/exclusions/territory; PILOT-specific cover decision; Cyber cover decision; Documented residual-risk acceptance if deferred |
| GATE-LEGAL-ENTITY | Legal identity and website legal pack | BLOCKED | COMMERCIAL_DIRECTOR | DEC-MC14-017 | Verified company registration data; Legal notice; Privacy and cookie policy; Terms of use; Cookie consent implementation |
| GATE-WEBSITE-REMEDIATION | Website and SEO remediation (MC-15) | EVIDENCE_REQUIRED | COMMERCIAL_DIRECTOR | DEC-MC14-018 | D15 findings closed with evidence; Claims review of remediated copy; Structured-data policy; MC-15 migration authorization |

## 3. Required documents

| Document | Name | Status | Gate | Owner | Notes |
|---|---|---|---|---|---|
| DOC-01 | EU declaration of conformity | NOT_EXECUTED | GATE-MARKET-PLACEMENT | PRODUCT_COMPLIANCE_ENGINEER | No DoC exists for any product. |
| DOC-02 | Technical documentation file | NOT_EXECUTED | GATE-MARKET-PLACEMENT | PRODUCT_COMPLIANCE_ENGINEER | No technical file exists. |
| DOC-03 | Product risk assessment | NOT_EXECUTED | GATE-MARKET-PLACEMENT | PRODUCT_COMPLIANCE_ENGINEER | No product risk assessment exists. |
| DOC-04 | Accredited test reports (EMC, radio, safety, environmental) | NOT_EXECUTED | GATE-MARKET-PLACEMENT | PRODUCT_COMPLIANCE_ENGINEER | No laboratory has been engaged. |
| DOC-05 | Label, serial and traceability information | NOT_EXECUTED | GATE-MARKET-PLACEMENT | PRODUCT_COMPLIANCE_ENGINEER | No serial/lot scheme exists. |
| DOC-06 | Instructions and safety warnings (ES/EN or required language) | DRAFT_REQUIRED | GATE-MARKET-PLACEMENT | PRODUCT_COMPLIANCE_ENGINEER | Spanish language requirement for the Spanish market is confirmed for radio equipment. |
| DOC-07 | Product liability insurance policy | NOT_EXECUTED | GATE-INSURANCE | FINANCE_LEAD | Premium UNKNOWN; no policy, broker indication or quotation. |
| DOC-08 | Third-party notices bundle and SBOM | NOT_EXECUTED | GATE-IP-CLEARANCE | ENGINEERING_LEAD | No NOTICE bundle or SBOM exists. |
| DOC-09 | IP assignment/licence agreements (OPEN-MARINE) | NOT_EXECUTED | GATE-IP-CLEARANCE | LEGAL_COUNSEL | No assignment or licence exists. |
| DOC-10 | Chart and ENC licence | NOT_EXECUTED | GATE-DATA-LICENSING | DATA_RIGHTS_OWNER | No chart licence exists; NAV must be presented as user-supplied-chart only. |
| DOC-11 | Weather and marine-data licences | NOT_EXECUTED | GATE-DATA-LICENSING | DATA_RIGHTS_OWNER | No weather provider licence or written public-sector terms. |
| DOC-12 | Privacy notices (ES/EN) | DRAFT_REQUIRED | GATE-PRIVACY-DPA-DPIA | DPO | No approved privacy notice exists. |
| DOC-13 | Processor agreements (DPA) and subprocessor register | NOT_EXECUTED | GATE-PRIVACY-DPA-DPIA | DPO | No DPA exists. |
| DOC-14 | Warranty and returns policy | DRAFT_REQUIRED | GATE-CONSUMER-TERMS | LEGAL_COUNSEL | No approved policy; 3% returns allowance is illustrative. |
| DOC-15 | Consumer terms of sale | DRAFT_REQUIRED | GATE-CONSUMER-TERMS | LEGAL_COUNSEL | No approved consumer terms. |
| DOC-16 | B2B supply terms | DRAFT_REQUIRED | GATE-CONSUMER-TERMS | LEGAL_COUNSEL | No B2B terms. |
| DOC-17 | Installer and distributor agreements | NOT_EXECUTED | GATE-CONSUMER-TERMS | COMMERCIAL_DIRECTOR | No installer or distributor agreement. |
| DOC-18 | Supplier and manufacturing contracts | NOT_EXECUTED | GATE-MARKET-PLACEMENT | PROGRAMME_LEAD | No supplier has been contacted or contracted. |
| DOC-19 | Support, update and end-of-support policy | DRAFT_REQUIRED | GATE-CRA-CYBERSECURITY | SECURITY_LEAD | Support period not decided. |
| DOC-20 | Vulnerability reporting and incident-response process | NOT_EXECUTED | GATE-CRA-CYBERSECURITY | SECURITY_LEAD | Reporting duties already apply; no process exists. |
| DOC-21 | Merchant/payment provider agreement | NOT_EXECUTED | GATE-PAYMENTS | FINANCE_LEAD | No merchant agreement. |
| DOC-22 | Product identity and serial/lot traceability system | NOT_EXECUTED | GATE-MARKET-PLACEMENT | HARDWARE_LEAD | No traceability system exists. |
| DOC-23 | DPIA screening and report | NOT_EXECUTED | GATE-PRIVACY-DPA-DPIA | DPO | A recommended DPIA is not a completed DPIA. |
| DOC-24 | EU declaration of conformity for cybersecurity (CRA) | NOT_EXECUTED | GATE-CRA-CYBERSECURITY | SECURITY_LEAD | CRA classification not decided; no DoC exists. |

## 4. What remains external

Conformity assessment and DoC require an accredited laboratory and, where
applicable, a notified body. Chart/weather/provider rights require signed
licences. The DPA/DPIA require a privacy professional. Insurance requires a
broker/insurer. Payments require a merchant agreement. Trademark requires
clearance and filing. Consumer terms require counsel. All of these are
`PENDING` external decisions; none can be produced by an autonomous agent.

## 5. Relationship to acceptance

No product may be offered while `COMMERCIAL_AVAILABILITY = NOT_FOR_SALE`. The
gates are the operational expression of the hard restrictions and are checked by
the validator: no gate may claim `CLOSED_VERIFIED` without evidence.
