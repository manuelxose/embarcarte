/**
 * MC-16 isolated SQLite schema.
 *
 * This schema is installed only by explicit internal tooling against a
 * disposable database. It is never imported by the running web server and no
 * startup migration executes it against the production database.
 *
 * The MC-16 guards are intentionally strict: a future milestone must migrate
 * them deliberately before any MAREA product can become merchantable, priced or
 * published.
 */

export const MAREA_COMMERCE_SCHEMA_VERSION = 'mc16-commerce-schema-1.0.0';

export const MAREA_COMMERCE_TABLES = [
  'marea_schema_meta',
  'marea_product_families',
  'marea_product_editions',
  'marea_merchant_skus',
  'marea_release_gates',
  'marea_release_gate_evidence',
  'marea_bundles',
  'marea_bundle_components',
  'marea_readiness_snapshots',
  'marea_price_versions',
  'marea_price_approval_evidence',
  'marea_inventory_items',
  'marea_inventory_movements',
  'marea_subscription_plans',
  'marea_entitlement_definitions',
  'marea_entitlement_dependencies',
  'marea_entitlement_grants',
  'marea_audit_events',
  'marea_publication_eligibility',
] as const;

export const MAREA_COMMERCE_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS marea_schema_meta (
  schema_version TEXT PRIMARY KEY,
  applied_at TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT ''
) STRICT;

CREATE TABLE IF NOT EXISTS marea_product_families (
  family_id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL CHECK (length(trim(display_name)) > 0),
  product_type TEXT NOT NULL CHECK (product_type IN ('SOFTWARE','HARDWARE','HARDWARE_SERVICE','SAAS')),
  lifecycle_state TEXT NOT NULL CHECK (lifecycle_state IN ('CONCEPT','DEFINED','ENGINEERING_VERIFIED','REGULATORY_READY','OPERATIONS_READY','COMMERCIALLY_AVAILABLE','RETIRED')),
  publication_state TEXT NOT NULL CHECK (publication_state IN ('INTERNAL_ONLY','PUBLISHED')),
  commercial_availability TEXT NOT NULL CHECK (commercial_availability IN ('NOT_FOR_SALE','FOR_SALE')),
  route_id TEXT,
  readiness_json TEXT NOT NULL CHECK (json_valid(readiness_json)),
  edition_ids_json TEXT NOT NULL CHECK (json_valid(edition_ids_json)),
  evidence_refs_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(evidence_refs_json)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CHECK (json_array_length(edition_ids_json) >= 1)
) STRICT;

CREATE TABLE IF NOT EXISTS marea_product_editions (
  edition_id TEXT PRIMARY KEY,
  family_id TEXT NOT NULL REFERENCES marea_product_families(family_id) ON DELETE RESTRICT,
  definition_status TEXT NOT NULL CHECK (definition_status IN ('DEFINED','CONDITIONAL','INSTALLATION_PACKAGE')),
  edition_type TEXT NOT NULL CHECK (edition_type IN ('SOFTWARE_SUBSCRIPTION','HARDWARE_DEVICE','HARDWARE_MODULE','HARDWARE_KIT','HARDWARE_SYSTEM','INSTALLATION_PACKAGE','CONTRACTED_SAAS')),
  lifecycle_state TEXT NOT NULL CHECK (lifecycle_state IN ('CONCEPT','DEFINED','ENGINEERING_VERIFIED','REGULATORY_READY','OPERATIONS_READY','COMMERCIALLY_AVAILABLE','RETIRED')),
  engineering_status TEXT NOT NULL,
  licensing_status TEXT NOT NULL,
  hardware_status TEXT NOT NULL,
  data_rights_status TEXT NOT NULL,
  compliance_status TEXT NOT NULL,
  safety_status TEXT NOT NULL,
  price_status TEXT NOT NULL CHECK (price_status IN ('HYPOTHESIS_UNAPPROVED','NOT_ESTABLISHED','NOT_APPLICABLE','APPROVED','EXPIRED','REVOKED')),
  commercial_status TEXT NOT NULL CHECK (commercial_status IN ('NOT_FOR_SALE','FOR_SALE')),
  commercial_availability TEXT NOT NULL CHECK (commercial_availability IN ('NOT_FOR_SALE','FOR_SALE')),
  publication_state TEXT NOT NULL CHECK (publication_state IN ('INTERNAL_ONLY','PUBLISHED')),
  merchantable INTEGER NOT NULL DEFAULT 0 CHECK (merchantable IN (0,1)),
  price_approved INTEGER NOT NULL DEFAULT 0 CHECK (price_approved IN (0,1)),
  merchant_sku_code TEXT UNIQUE,
  feature_definitions_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(feature_definitions_json)),
  dependency_ids_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(dependency_ids_json)),
  evidence_ids_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(evidence_ids_json)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CHECK (merchant_sku_code IS NULL OR length(trim(merchant_sku_code)) > 0),
  CHECK (merchant_sku_code IS NOT NULL OR merchantable = 0)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_marea_editions_family ON marea_product_editions(family_id);
CREATE INDEX IF NOT EXISTS idx_marea_editions_availability ON marea_product_editions(commercial_availability, merchantable);

CREATE TABLE IF NOT EXISTS marea_merchant_skus (
  sku_code TEXT PRIMARY KEY CHECK (length(trim(sku_code)) > 0),
  edition_id TEXT NOT NULL UNIQUE REFERENCES marea_product_editions(edition_id) ON DELETE RESTRICT,
  state TEXT NOT NULL CHECK (state IN ('CANDIDATE','APPROVED','ACTIVE','RETIRED')),
  merchantable INTEGER NOT NULL DEFAULT 0 CHECK (merchantable IN (0,1)),
  price_approved INTEGER NOT NULL DEFAULT 0 CHECK (price_approved IN (0,1)),
  approval_evidence_ids_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(approval_evidence_ids_json)),
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  approved_by TEXT,
  approved_at TEXT,
  CHECK (sku_code <> edition_id),
  CHECK (state NOT IN ('APPROVED','ACTIVE') OR json_array_length(approval_evidence_ids_json) > 0),
  CHECK (state NOT IN ('APPROVED','ACTIVE') OR approved_by IS NOT NULL)
) STRICT;

CREATE TABLE IF NOT EXISTS marea_release_gates (
  gate_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('BLOCKED','EVIDENCE_REQUIRED','EVIDENCE_SUBMITTED','CLOSED_VERIFIED')),
  closure_owner TEXT NOT NULL,
  mc16_dependency TEXT NOT NULL DEFAULT '',
  evidence_ids_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(evidence_ids_json)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CHECK (status <> 'CLOSED_VERIFIED' OR json_array_length(evidence_ids_json) > 0)
) STRICT;

CREATE TABLE IF NOT EXISTS marea_release_gate_evidence (
  evidence_id TEXT PRIMARY KEY,
  gate_id TEXT NOT NULL REFERENCES marea_release_gates(gate_id) ON DELETE RESTRICT,
  status TEXT NOT NULL CHECK (status IN ('VALID','EXPIRED','REVOKED','SUPERSEDED')),
  evidence_type TEXT NOT NULL CHECK (evidence_type IN ('LEGAL_OPINION','REGULATORY_CERTIFICATE','DECLARATION_OF_CONFORMITY','SUPPLIER_QUOTATION','INSURANCE_POLICY','CONTRACT','PRICE_APPROVAL','EXTERNAL_PRICE_LIST','INVENTORY_RECEIPT','AUDIT_REPORT')),
  evidence_class TEXT NOT NULL CHECK (evidence_class IN ('VERIFIED_EXTERNAL','REPOSITORY_VERIFIED')),
  source_ref TEXT NOT NULL CHECK (length(trim(source_ref)) > 0),
  issued_by TEXT NOT NULL CHECK (length(trim(issued_by)) > 0),
  issued_at TEXT NOT NULL,
  expires_at TEXT,
  verified INTEGER NOT NULL DEFAULT 0 CHECK (verified IN (0,1)),
  content_hash TEXT NOT NULL CHECK (length(content_hash) >= 32),
  created_at TEXT NOT NULL,
  CHECK (status <> 'VALID' OR verified = 1),
  CHECK (expires_at IS NULL OR expires_at > issued_at)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_marea_gate_evidence_gate ON marea_release_gate_evidence(gate_id, status);

CREATE TABLE IF NOT EXISTS marea_bundles (
  bundle_id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  customer_facing_name TEXT NOT NULL,
  lifecycle_state TEXT NOT NULL CHECK (lifecycle_state IN ('CONCEPT','DEFINED','ENGINEERING_VERIFIED','REGULATORY_READY','OPERATIONS_READY','COMMERCIALLY_AVAILABLE','RETIRED')),
  readiness_state TEXT NOT NULL,
  commercial_availability TEXT NOT NULL CHECK (commercial_availability IN ('NOT_FOR_SALE','FOR_SALE')),
  publication_state TEXT NOT NULL CHECK (publication_state IN ('INTERNAL_ONLY','PUBLISHED')),
  price_status TEXT NOT NULL CHECK (price_status IN ('HYPOTHESIS_UNAPPROVED','NOT_ESTABLISHED','NOT_APPLICABLE','APPROVED','EXPIRED','REVOKED')),
  fixed_package_price_established INTEGER NOT NULL DEFAULT 0 CHECK (fixed_package_price_established IN (0,1)),
  contracted_solution INTEGER NOT NULL DEFAULT 0 CHECK (contracted_solution IN (0,1)),
  hardware_included_by_default INTEGER NOT NULL DEFAULT 0 CHECK (hardware_included_by_default = 0),
  sla_established INTEGER NOT NULL DEFAULT 0 CHECK (sla_established = 0),
  route_id TEXT,
  evidence_ids_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(evidence_ids_json)),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
) STRICT;

CREATE TABLE IF NOT EXISTS marea_bundle_components (
  bundle_id TEXT NOT NULL REFERENCES marea_bundles(bundle_id) ON DELETE RESTRICT,
  line_id TEXT NOT NULL,
  edition_id TEXT NOT NULL REFERENCES marea_product_editions(edition_id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  inclusion TEXT NOT NULL CHECK (inclusion IN ('INCLUDED','OPTIONAL','CONDITIONAL','QUOTATION_REQUIRED')),
  required_for_outcome INTEGER NOT NULL DEFAULT 0 CHECK (required_for_outcome IN (0,1)),
  expands_to_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(expands_to_json)),
  subscription_capability_ids_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(subscription_capability_ids_json)),
  is_priced_line INTEGER NOT NULL DEFAULT 0 CHECK (is_priced_line = 0),
  PRIMARY KEY (bundle_id, line_id),
  UNIQUE (bundle_id, edition_id, inclusion)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_marea_bundle_components_edition ON marea_bundle_components(edition_id);

CREATE TABLE IF NOT EXISTS marea_readiness_snapshots (
  snapshot_id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('PRODUCT_FAMILY','PRODUCT_EDITION','BUNDLE')),
  entity_id TEXT NOT NULL,
  dimensions_json TEXT NOT NULL CHECK (json_valid(dimensions_json)),
  lifecycle_state TEXT NOT NULL CHECK (lifecycle_state IN ('CONCEPT','DEFINED','ENGINEERING_VERIFIED','REGULATORY_READY','OPERATIONS_READY','COMMERCIALLY_AVAILABLE','RETIRED')),
  ready INTEGER NOT NULL DEFAULT 0 CHECK (ready IN (0,1)),
  blocking_gate_ids_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(blocking_gate_ids_json)),
  evidence_ids_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(evidence_ids_json)),
  evaluated_at TEXT NOT NULL,
  policy_version TEXT NOT NULL,
  UNIQUE (entity_type, entity_id, evaluated_at, policy_version)
) STRICT;

CREATE TABLE IF NOT EXISTS marea_price_versions (
  price_version_id TEXT PRIMARY KEY,
  edition_id TEXT NOT NULL REFERENCES marea_product_editions(edition_id) ON DELETE RESTRICT,
  status TEXT NOT NULL CHECK (status IN ('HYPOTHESIS_UNAPPROVED','NOT_ESTABLISHED','NOT_APPLICABLE','APPROVED','EXPIRED','REVOKED')),
  amount_minor INTEGER,
  currency TEXT,
  territory TEXT,
  channel TEXT,
  vat_basis TEXT,
  includes_vat INTEGER CHECK (includes_vat IN (0,1)),
  effective_from TEXT,
  effective_to TEXT,
  approved_by TEXT,
  approved_by_role TEXT,
  approval_evidence_ids_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(approval_evidence_ids_json)),
  source_ref TEXT,
  superseded_by_price_version_id TEXT REFERENCES marea_price_versions(price_version_id) ON DELETE RESTRICT,
  created_at TEXT NOT NULL,
  CHECK (amount_minor IS NULL OR (typeof(amount_minor) = 'integer' AND amount_minor >= 0)),
  CHECK (status <> 'APPROVED' OR (
    amount_minor IS NOT NULL AND currency IS NOT NULL AND territory IS NOT NULL AND channel IS NOT NULL
    AND vat_basis IS NOT NULL AND includes_vat IS NOT NULL AND effective_from IS NOT NULL
    AND approved_by IS NOT NULL AND approved_by_role IN ('FINANCE_LEAD','COMMERCIAL_DIRECTOR')
    AND json_array_length(approval_evidence_ids_json) > 0
  )),
  CHECK (effective_to IS NULL OR effective_from IS NULL OR effective_to > effective_from)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_marea_price_edition ON marea_price_versions(edition_id, status);

CREATE TABLE IF NOT EXISTS marea_price_approval_evidence (
  price_version_id TEXT NOT NULL REFERENCES marea_price_versions(price_version_id) ON DELETE RESTRICT,
  evidence_id TEXT NOT NULL REFERENCES marea_release_gate_evidence(evidence_id) ON DELETE RESTRICT,
  PRIMARY KEY (price_version_id, evidence_id)
) STRICT;

CREATE TABLE IF NOT EXISTS marea_inventory_items (
  inventory_item_id TEXT PRIMARY KEY,
  edition_id TEXT NOT NULL REFERENCES marea_product_editions(edition_id) ON DELETE RESTRICT,
  sku_code TEXT,
  warehouse_id TEXT NOT NULL CHECK (length(trim(warehouse_id)) > 0),
  lot_code TEXT,
  serial_number TEXT,
  quantity_on_hand INTEGER NOT NULL CHECK (quantity_on_hand >= 0),
  quantity_reserved INTEGER NOT NULL DEFAULT 0 CHECK (quantity_reserved >= 0),
  quantity_available INTEGER GENERATED ALWAYS AS (quantity_on_hand - quantity_reserved) STORED,
  status TEXT NOT NULL CHECK (status IN ('AVAILABLE','QUARANTINED','DISPATCHED','RETURNED')),
  verified INTEGER NOT NULL DEFAULT 0 CHECK (verified IN (0,1)),
  stock_evidence_id TEXT REFERENCES marea_release_gate_evidence(evidence_id) ON DELETE RESTRICT,
  source TEXT NOT NULL CHECK (source IN ('PURCHASE_RECEIPT','SUPPLIER_CONTRACT','PRODUCTION_RECEIPT','RETURN')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CHECK (quantity_reserved <= quantity_on_hand),
  CHECK (status <> 'AVAILABLE' OR verified = 1),
  CHECK (verified = 0 OR stock_evidence_id IS NOT NULL)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_marea_inventory_edition ON marea_inventory_items(edition_id, status, verified);

CREATE TABLE IF NOT EXISTS marea_inventory_movements (
  movement_id TEXT PRIMARY KEY,
  inventory_item_id TEXT NOT NULL REFERENCES marea_inventory_items(inventory_item_id) ON DELETE RESTRICT,
  movement_type TEXT NOT NULL CHECK (movement_type IN ('RECEIPT','RESERVATION','RELEASE_RESERVATION','DISPATCH','RETURN','QUARANTINE','ADJUSTMENT')),
  quantity_delta INTEGER NOT NULL CHECK (quantity_delta <> 0),
  reason TEXT NOT NULL CHECK (length(trim(reason)) > 0),
  actor_id TEXT NOT NULL,
  actor_role TEXT NOT NULL,
  occurred_at TEXT NOT NULL,
  evidence_id TEXT REFERENCES marea_release_gate_evidence(evidence_id) ON DELETE RESTRICT,
  correlation_id TEXT NOT NULL,
  CHECK (movement_type <> 'ADJUSTMENT' OR (evidence_id IS NOT NULL AND length(trim(reason)) >= 8))
) STRICT;

CREATE INDEX IF NOT EXISTS idx_marea_movements_item ON marea_inventory_movements(inventory_item_id, occurred_at);

CREATE TABLE IF NOT EXISTS marea_subscription_plans (
  plan_id TEXT PRIMARY KEY,
  plan_key TEXT NOT NULL,
  family_id TEXT REFERENCES marea_product_families(family_id) ON DELETE RESTRICT,
  billing_period TEXT NOT NULL CHECK (billing_period IN ('NONE','MONTH','YEAR')),
  entitlement_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('DEFINED_NOT_ACTIVE','SUSPENDED','RETIRED')),
  billing_mode TEXT NOT NULL CHECK (billing_mode IN ('DEFINED_NOT_ACTIVE','CONTRACT_ONLY')),
  price_status TEXT NOT NULL CHECK (price_status IN ('HYPOTHESIS_UNAPPROVED','NOT_ESTABLISHED','NOT_APPLICABLE','APPROVED','EXPIRED','REVOKED')),
  checkout_allowed INTEGER NOT NULL DEFAULT 0 CHECK (checkout_allowed = 0),
  auto_renew INTEGER NOT NULL DEFAULT 0 CHECK (auto_renew = 0),
  created_at TEXT NOT NULL,
  UNIQUE (plan_key, family_id)
) STRICT;

CREATE TABLE IF NOT EXISTS marea_entitlement_definitions (
  entitlement_id TEXT PRIMARY KEY,
  capability_key TEXT NOT NULL UNIQUE,
  family_id TEXT REFERENCES marea_product_families(family_id) ON DELETE RESTRICT,
  term TEXT NOT NULL CHECK (term IN ('NONE','MONTH','YEAR')),
  shared_ledger_key TEXT NOT NULL CHECK (length(trim(shared_ledger_key)) > 0),
  status TEXT NOT NULL CHECK (status IN ('HYPOTHESIS_UNAPPROVED','NOT_ESTABLISHED','NOT_APPLICABLE','BLOCKED','ACTIVE','RETIRED')),
  double_billing_allowed INTEGER NOT NULL DEFAULT 0 CHECK (double_billing_allowed = 0),
  gates_local_safety INTEGER NOT NULL DEFAULT 0 CHECK (gates_local_safety = 0),
  requires_licensed_data INTEGER NOT NULL DEFAULT 0 CHECK (requires_licensed_data IN (0,1)),
  evidence_refs_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(evidence_refs_json)),
  created_at TEXT NOT NULL
) STRICT;

CREATE TABLE IF NOT EXISTS marea_entitlement_dependencies (
  entitlement_id TEXT NOT NULL REFERENCES marea_entitlement_definitions(entitlement_id) ON DELETE RESTRICT,
  depends_on_entitlement_id TEXT NOT NULL REFERENCES marea_entitlement_definitions(entitlement_id) ON DELETE RESTRICT,
  relationship TEXT NOT NULL CHECK (relationship IN ('REQUIRES','SHARES_LEDGER','INCLUDES')),
  billing_scope TEXT NOT NULL CHECK (billing_scope IN ('ACCOUNT','ORGANIZATION','VESSEL','DEVICE','DATA_PROVIDER','CONNECTIVITY_PROVIDER','NONE')),
  PRIMARY KEY (entitlement_id, depends_on_entitlement_id, relationship),
  CHECK (entitlement_id <> depends_on_entitlement_id)
) STRICT;

CREATE TABLE IF NOT EXISTS marea_entitlement_grants (
  grant_id TEXT PRIMARY KEY,
  entitlement_id TEXT NOT NULL REFERENCES marea_entitlement_definitions(entitlement_id) ON DELETE RESTRICT,
  scope_type TEXT NOT NULL CHECK (scope_type IN ('ACCOUNT','ORGANIZATION','TENANT','VESSEL','DEVICE')),
  scope_id TEXT NOT NULL CHECK (length(trim(scope_id)) > 0),
  state TEXT NOT NULL CHECK (state IN ('DRAFT','ACTIVE','EXPIRED','REVOKED')),
  basis TEXT NOT NULL CHECK (basis IN ('SYNTHETIC_TEST','CONTRACT','PURCHASE','MIGRATION')),
  synthetic INTEGER NOT NULL CHECK (synthetic IN (0,1)),
  starts_at TEXT NOT NULL,
  ends_at TEXT,
  actor_id TEXT NOT NULL,
  audit_event_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  CHECK (synthetic = 1),
  CHECK (state <> 'ACTIVE' OR (ends_at IS NULL OR ends_at > starts_at)),
  CHECK (basis <> 'CONTRACT' OR synthetic = 0)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_marea_grants_scope ON marea_entitlement_grants(scope_type, scope_id, state);

CREATE TABLE IF NOT EXISTS marea_audit_events (
  sequence INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id TEXT NOT NULL UNIQUE,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  previous_version TEXT,
  new_version TEXT,
  actor_id TEXT NOT NULL,
  actor_role TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  reason TEXT NOT NULL CHECK (length(trim(reason)) > 0),
  evidence_refs_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(evidence_refs_json)),
  correlation_id TEXT NOT NULL,
  result TEXT NOT NULL CHECK (result IN ('DENIED','ACCEPTED','RECORDED')),
  prev_event_hash TEXT,
  event_hash TEXT NOT NULL UNIQUE CHECK (length(event_hash) >= 32),
  CHECK (event_type NOT IN ('READINESS_TRANSITION_ACCEPTED','READINESS_TRANSITION_DENIED') OR json_array_length(evidence_refs_json) >= 0)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_marea_audit_entity ON marea_audit_events(entity_type, entity_id, timestamp);

CREATE TABLE IF NOT EXISTS marea_publication_eligibility (
  route_id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL,
  publication_authorized INTEGER NOT NULL DEFAULT 0 CHECK (publication_authorized = 0),
  indexation_authorized INTEGER NOT NULL DEFAULT 0 CHECK (indexation_authorized = 0),
  sitemap_eligible INTEGER NOT NULL DEFAULT 0 CHECK (sitemap_eligible = 0),
  commercial_transaction_authorized INTEGER NOT NULL DEFAULT 0 CHECK (commercial_transaction_authorized = 0),
  structured_data_product_offer INTEGER NOT NULL DEFAULT 0 CHECK (structured_data_product_offer = 0),
  blocking_gate_ids_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(blocking_gate_ids_json)),
  policy_version TEXT NOT NULL,
  created_at TEXT NOT NULL
) STRICT;

-- MC-16 activation guards. A future milestone must deliberately migrate these
-- guards before any commercial activation; a test pass cannot remove them.
CREATE TRIGGER IF NOT EXISTS trg_marea_family_mc16_guard
BEFORE INSERT ON marea_product_families
WHEN NEW.commercial_availability = 'FOR_SALE'
  OR NEW.lifecycle_state IN ('REGULATORY_READY','OPERATIONS_READY','COMMERCIALLY_AVAILABLE')
BEGIN
  SELECT RAISE(ABORT, 'MC16_COMMERCIAL_ACTIVATION_PROHIBITED');
END;

CREATE TRIGGER IF NOT EXISTS trg_marea_family_mc16_guard_update
BEFORE UPDATE ON marea_product_families
WHEN NEW.commercial_availability = 'FOR_SALE'
  OR NEW.lifecycle_state IN ('REGULATORY_READY','OPERATIONS_READY','COMMERCIALLY_AVAILABLE')
BEGIN
  SELECT RAISE(ABORT, 'MC16_COMMERCIAL_ACTIVATION_PROHIBITED');
END;

CREATE TRIGGER IF NOT EXISTS trg_marea_edition_mc16_guard
BEFORE INSERT ON marea_product_editions
WHEN NEW.merchantable = 1 OR NEW.price_approved = 1
  OR NEW.commercial_status = 'FOR_SALE' OR NEW.commercial_availability = 'FOR_SALE'
  OR NEW.publication_state = 'PUBLISHED'
  OR NEW.lifecycle_state IN ('REGULATORY_READY','OPERATIONS_READY','COMMERCIALLY_AVAILABLE')
BEGIN
  SELECT RAISE(ABORT, 'MC16_MERCHANTABLE_EDITION_PROHIBITED');
END;

CREATE TRIGGER IF NOT EXISTS trg_marea_edition_mc16_guard_update
BEFORE UPDATE ON marea_product_editions
WHEN NEW.merchantable = 1 OR NEW.price_approved = 1
  OR NEW.commercial_status = 'FOR_SALE' OR NEW.commercial_availability = 'FOR_SALE'
  OR NEW.publication_state = 'PUBLISHED'
  OR NEW.lifecycle_state IN ('REGULATORY_READY','OPERATIONS_READY','COMMERCIALLY_AVAILABLE')
BEGIN
  SELECT RAISE(ABORT, 'MC16_MERCHANTABLE_EDITION_PROHIBITED');
END;

CREATE TRIGGER IF NOT EXISTS trg_marea_sku_mc16_guard
BEFORE INSERT ON marea_merchant_skus
WHEN NEW.state IN ('APPROVED','ACTIVE') OR NEW.merchantable = 1 OR NEW.price_approved = 1
BEGIN
  SELECT RAISE(ABORT, 'MC16_MERCHANT_SKU_ACTIVATION_PROHIBITED');
END;

CREATE TRIGGER IF NOT EXISTS trg_marea_sku_mc16_guard_update
BEFORE UPDATE ON marea_merchant_skus
WHEN NEW.state IN ('APPROVED','ACTIVE') OR NEW.merchantable = 1 OR NEW.price_approved = 1
BEGIN
  SELECT RAISE(ABORT, 'MC16_MERCHANT_SKU_ACTIVATION_PROHIBITED');
END;

CREATE TRIGGER IF NOT EXISTS trg_marea_bundle_mc16_guard
BEFORE INSERT ON marea_bundles
WHEN NEW.commercial_availability = 'FOR_SALE' OR NEW.publication_state = 'PUBLISHED'
  OR NEW.lifecycle_state IN ('REGULATORY_READY','OPERATIONS_READY','COMMERCIALLY_AVAILABLE')
  OR NEW.fixed_package_price_established = 1
BEGIN
  SELECT RAISE(ABORT, 'MC16_BUNDLE_ACTIVATION_PROHIBITED');
END;

CREATE TRIGGER IF NOT EXISTS trg_marea_bundle_mc16_guard_update
BEFORE UPDATE ON marea_bundles
WHEN NEW.commercial_availability = 'FOR_SALE' OR NEW.publication_state = 'PUBLISHED'
  OR NEW.lifecycle_state IN ('REGULATORY_READY','OPERATIONS_READY','COMMERCIALLY_AVAILABLE')
  OR NEW.fixed_package_price_established = 1
BEGIN
  SELECT RAISE(ABORT, 'MC16_BUNDLE_ACTIVATION_PROHIBITED');
END;

CREATE TRIGGER IF NOT EXISTS trg_marea_price_approval_guard
BEFORE UPDATE OF status ON marea_price_versions
WHEN NEW.status = 'APPROVED' AND NOT EXISTS (
  SELECT 1
  FROM marea_price_approval_evidence pae
  JOIN marea_release_gate_evidence e ON e.evidence_id = pae.evidence_id
  WHERE pae.price_version_id = NEW.price_version_id
    AND e.status = 'VALID'
    AND e.verified = 1
    AND e.evidence_class = 'VERIFIED_EXTERNAL'
    AND e.evidence_type IN ('PRICE_APPROVAL','EXTERNAL_PRICE_LIST')
)
BEGIN
  SELECT RAISE(ABORT, 'MC16_PRICE_APPROVAL_EVIDENCE_REQUIRED');
END;

-- A price must never be born APPROVED: approval is a gated transition from a
-- non-approved status, with verified external evidence linked first.
CREATE TRIGGER IF NOT EXISTS trg_marea_price_approval_guard_insert
BEFORE INSERT ON marea_price_versions
WHEN NEW.status = 'APPROVED' AND NOT EXISTS (
  SELECT 1
  FROM marea_price_approval_evidence pae
  JOIN marea_release_gate_evidence e ON e.evidence_id = pae.evidence_id
  WHERE pae.price_version_id = NEW.price_version_id
    AND e.status = 'VALID'
    AND e.verified = 1
    AND e.evidence_class = 'VERIFIED_EXTERNAL'
    AND e.evidence_type IN ('PRICE_APPROVAL','EXTERNAL_PRICE_LIST')
)
BEGIN
  SELECT RAISE(ABORT, 'MC16_PRICE_APPROVAL_EVIDENCE_REQUIRED');
END;

CREATE TRIGGER IF NOT EXISTS trg_marea_entitlement_real_grant_guard
BEFORE INSERT ON marea_entitlement_grants
WHEN NEW.synthetic = 0 OR NEW.basis IN ('CONTRACT','PURCHASE','MIGRATION')
BEGIN
  SELECT RAISE(ABORT, 'MC16_REAL_ENTITLEMENT_GRANT_PROHIBITED');
END;

CREATE TRIGGER IF NOT EXISTS trg_marea_subscription_activation_guard
BEFORE INSERT ON marea_subscription_plans
WHEN NEW.checkout_allowed = 1 OR NEW.billing_mode = 'CONTRACT_ONLY' AND NEW.status <> 'DEFINED_NOT_ACTIVE'
BEGIN
  SELECT RAISE(ABORT, 'MC16_SUBSCRIPTION_ACTIVATION_PROHIBITED');
END;

CREATE TRIGGER IF NOT EXISTS trg_marea_audit_no_update
BEFORE UPDATE ON marea_audit_events
BEGIN
  SELECT RAISE(ABORT, 'MC16_AUDIT_APPEND_ONLY');
END;

CREATE TRIGGER IF NOT EXISTS trg_marea_audit_no_delete
BEFORE DELETE ON marea_audit_events
BEGIN
  SELECT RAISE(ABORT, 'MC16_AUDIT_APPEND_ONLY');
END;

CREATE TRIGGER IF NOT EXISTS trg_marea_audit_no_replace
BEFORE INSERT ON marea_audit_events
WHEN EXISTS (SELECT 1 FROM marea_audit_events WHERE event_id = NEW.event_id OR event_hash = NEW.event_hash)
BEGIN
  SELECT RAISE(ABORT, 'MC16_AUDIT_DUPLICATE');
END;
`;

export interface SqliteExecutor {
  exec(sql: string): unknown;
}

export function installMareaCommerceSchema(
  db: SqliteExecutor,
  appliedAt = new Date().toISOString(),
): void {
  db.exec('PRAGMA foreign_keys = ON;');
  db.exec(MAREA_COMMERCE_SCHEMA_SQL);
  const escaped = appliedAt.replace(/'/g, "''");
  db.exec(
    `INSERT OR IGNORE INTO marea_schema_meta (schema_version, applied_at, notes) VALUES ('${MAREA_COMMERCE_SCHEMA_VERSION}', '${escaped}', 'MC-16 isolated internal schema');`,
  );
}

export const MAREA_COMMERCE_DROP_SQL = `
DROP TRIGGER IF EXISTS trg_marea_audit_no_replace;
DROP TRIGGER IF EXISTS trg_marea_audit_no_delete;
DROP TRIGGER IF EXISTS trg_marea_audit_no_update;
DROP TRIGGER IF EXISTS trg_marea_subscription_activation_guard;
DROP TRIGGER IF EXISTS trg_marea_entitlement_real_grant_guard;
DROP TRIGGER IF EXISTS trg_marea_price_approval_guard_insert;
DROP TRIGGER IF EXISTS trg_marea_price_approval_guard;
DROP TRIGGER IF EXISTS trg_marea_bundle_mc16_guard_update;
DROP TRIGGER IF EXISTS trg_marea_bundle_mc16_guard;
DROP TRIGGER IF EXISTS trg_marea_sku_mc16_guard_update;
DROP TRIGGER IF EXISTS trg_marea_sku_mc16_guard;
DROP TRIGGER IF EXISTS trg_marea_edition_mc16_guard_update;
DROP TRIGGER IF EXISTS trg_marea_edition_mc16_guard;
DROP TRIGGER IF EXISTS trg_marea_family_mc16_guard_update;
DROP TRIGGER IF EXISTS trg_marea_family_mc16_guard;
DROP TABLE IF EXISTS marea_publication_eligibility;
DROP TABLE IF EXISTS marea_audit_events;
DROP TABLE IF EXISTS marea_entitlement_grants;
DROP TABLE IF EXISTS marea_entitlement_dependencies;
DROP TABLE IF EXISTS marea_entitlement_definitions;
DROP TABLE IF EXISTS marea_subscription_plans;
DROP TABLE IF EXISTS marea_inventory_movements;
DROP TABLE IF EXISTS marea_inventory_items;
DROP TABLE IF EXISTS marea_price_approval_evidence;
DROP TABLE IF EXISTS marea_price_versions;
DROP TABLE IF EXISTS marea_readiness_snapshots;
DROP TABLE IF EXISTS marea_bundle_components;
DROP TABLE IF EXISTS marea_bundles;
DROP TABLE IF EXISTS marea_release_gate_evidence;
DROP TABLE IF EXISTS marea_release_gates;
DROP TABLE IF EXISTS marea_merchant_skus;
DROP TABLE IF EXISTS marea_product_editions;
DROP TABLE IF EXISTS marea_product_families;
DROP TABLE IF EXISTS marea_schema_meta;
`;

export function dropMareaCommerceSchema(db: SqliteExecutor): void {
  db.exec(MAREA_COMMERCE_DROP_SQL);
}
