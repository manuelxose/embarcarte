import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';
import {
  MAREA_COMMERCE_SCHEMA_VERSION,
  MAREA_COMMERCE_TABLES,
  dropMareaCommerceSchema,
  installMareaCommerceSchema,
} from '../src/server/marea-commerce/schema.ts';
import { assertDisposableDatabasePath } from './marea-commerce-schema.mjs';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CLI_PATH = join(REPO_ROOT, 'scripts', 'marea-commerce-schema.mjs');
const PRODUCTION_DATABASE_PATH = join(REPO_ROOT, 'data', 'embarcarte.sqlite');
const FIXTURE_TIME = '2026-01-01T00:00:00.000Z';

function insertRow(db, table, row) {
  const columns = Object.keys(row);
  const placeholders = columns.map(() => '?').join(', ');
  const statement = db.prepare(
    `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`,
  );
  return statement.run(...columns.map((column) => row[column]));
}

function insertFamily(db, overrides = {}) {
  return insertRow(db, 'marea_product_families', {
    family_id: 'fam-1',
    display_name: 'Fixture family',
    product_type: 'SOFTWARE',
    lifecycle_state: 'CONCEPT',
    publication_state: 'INTERNAL_ONLY',
    commercial_availability: 'NOT_FOR_SALE',
    readiness_json: '{}',
    edition_ids_json: '["ed-1"]',
    created_at: FIXTURE_TIME,
    updated_at: FIXTURE_TIME,
    ...overrides,
  });
}

function insertEdition(db, overrides = {}) {
  return insertRow(db, 'marea_product_editions', {
    edition_id: 'ed-1',
    family_id: 'fam-1',
    definition_status: 'DEFINED',
    edition_type: 'SOFTWARE_SUBSCRIPTION',
    lifecycle_state: 'CONCEPT',
    engineering_status: 'ENGINEERING_PENDING',
    licensing_status: 'LICENSING_PENDING',
    hardware_status: 'NOT_APPLICABLE',
    data_rights_status: 'DATA_RIGHTS_PENDING',
    compliance_status: 'COMPLIANCE_PENDING',
    safety_status: 'SAFETY_PENDING',
    price_status: 'HYPOTHESIS_UNAPPROVED',
    commercial_status: 'NOT_FOR_SALE',
    commercial_availability: 'NOT_FOR_SALE',
    publication_state: 'INTERNAL_ONLY',
    created_at: FIXTURE_TIME,
    updated_at: FIXTURE_TIME,
    ...overrides,
  });
}

function insertGate(db, overrides = {}) {
  return insertRow(db, 'marea_release_gates', {
    gate_id: 'gate-1',
    name: 'Fixture gate',
    status: 'EVIDENCE_REQUIRED',
    closure_owner: 'fixture-owner',
    created_at: FIXTURE_TIME,
    updated_at: FIXTURE_TIME,
    ...overrides,
  });
}

function insertEvidence(db, overrides = {}) {
  return insertRow(db, 'marea_release_gate_evidence', {
    evidence_id: 'ev-price',
    gate_id: 'gate-1',
    status: 'VALID',
    evidence_type: 'PRICE_APPROVAL',
    evidence_class: 'VERIFIED_EXTERNAL',
    source_ref: 'synthetic://fixture/price-approval',
    issued_by: 'fixture-approver',
    issued_at: FIXTURE_TIME,
    verified: 1,
    content_hash: 'a'.repeat(64),
    created_at: FIXTURE_TIME,
    ...overrides,
  });
}

function insertMerchantSku(db, overrides = {}) {
  return insertRow(db, 'marea_merchant_skus', {
    sku_code: 'SKU-1',
    edition_id: 'ed-1',
    state: 'CANDIDATE',
    created_by: 'fixture-user',
    created_at: FIXTURE_TIME,
    ...overrides,
  });
}

function insertPriceVersion(db, overrides = {}) {
  return insertRow(db, 'marea_price_versions', {
    price_version_id: 'price-1',
    edition_id: 'ed-1',
    status: 'HYPOTHESIS_UNAPPROVED',
    created_at: FIXTURE_TIME,
    ...overrides,
  });
}

function insertInventoryItem(db, overrides = {}) {
  return insertRow(db, 'marea_inventory_items', {
    inventory_item_id: 'inv-1',
    edition_id: 'ed-1',
    warehouse_id: 'WH-1',
    quantity_on_hand: 5,
    quantity_reserved: 2,
    status: 'QUARANTINED',
    verified: 0,
    source: 'PURCHASE_RECEIPT',
    created_at: FIXTURE_TIME,
    updated_at: FIXTURE_TIME,
    ...overrides,
  });
}

function insertAuditEvent(db, overrides = {}) {
  return insertRow(db, 'marea_audit_events', {
    event_id: 'ev-audit-1',
    entity_type: 'PRODUCT_EDITION',
    entity_id: 'ed-1',
    event_type: 'TEST_EVENT',
    actor_id: 'fixture-user',
    actor_role: 'FIXTURE_ROLE',
    timestamp: FIXTURE_TIME,
    reason: 'Synthetic persistence test event',
    evidence_refs_json: '["EV-FIXTURE"]',
    correlation_id: 'corr-1',
    result: 'RECORDED',
    event_hash: 'a'.repeat(64),
    ...overrides,
  });
}

function approvePrice(db, priceVersionId, evidenceIds = ['ev-price']) {
  return db
    .prepare(
      `UPDATE marea_price_versions
       SET status = 'APPROVED', amount_minor = 199900, currency = 'EUR', territory = 'ES',
           channel = 'ONLINE', vat_basis = 'NET', includes_vat = 1, effective_from = ?,
           approved_by = 'fixture-finance-lead', approved_by_role = 'FINANCE_LEAD',
           approval_evidence_ids_json = ?
       WHERE price_version_id = ?`,
    )
    .run(FIXTURE_TIME, JSON.stringify(evidenceIds), priceVersionId);
}

function createDatabase(t, { install = true } = {}) {
  const directory = mkdtempSync(join(tmpdir(), 'marea-mc16-persistence-'));
  const databasePath = join(directory, 'marea-commerce-test.sqlite');
  const db = new DatabaseSync(databasePath);
  t.after(() => {
    try {
      db.close();
    } catch {
      // The test may have closed the handle already.
    }
    rmSync(directory, { recursive: true, force: true });
  });
  if (install) installMareaCommerceSchema(db);
  return { db, databasePath, directory };
}

function tempDatabasePath(t) {
  const directory = mkdtempSync(join(tmpdir(), 'marea-mc16-cli-'));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  return join(directory, 'marea-commerce-test.sqlite');
}

function listTables(db) {
  return db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name",
    )
    .all()
    .map((row) => row.name);
}

function listSchemaTriggers(db) {
  return db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type = 'trigger' AND name LIKE 'trg_marea_%' ORDER BY name",
    )
    .all()
    .map((row) => row.name);
}

function count(db, table) {
  return db.prepare(`SELECT count(*) AS total FROM ${table}`).get().total;
}

function runCli(args) {
  return spawnSync(process.execPath, [CLI_PATH, ...args], { encoding: 'utf8' });
}

test('installs every required MC-16 table and records exactly one schema version', (t) => {
  const { db } = createDatabase(t);

  assert.deepEqual(listTables(db), [...MAREA_COMMERCE_TABLES].sort());
  assert.equal(count(db, 'marea_schema_meta'), 1);

  const meta = db.prepare('SELECT schema_version, applied_at FROM marea_schema_meta').get();
  assert.equal(meta.schema_version, MAREA_COMMERCE_SCHEMA_VERSION);
  assert.ok(meta.applied_at.length > 0);
  assert.ok(listSchemaTriggers(db).length >= 10);
});

test('enables and enforces foreign keys, including ON DELETE RESTRICT', (t) => {
  const { db } = createDatabase(t);

  assert.equal(db.prepare('PRAGMA foreign_keys').get().foreign_keys, 1);
  assert.throws(() => insertEdition(db), /FOREIGN KEY constraint failed/);

  insertFamily(db);
  insertEdition(db);
  assert.throws(
    () => db.exec("DELETE FROM marea_product_families WHERE family_id = 'fam-1'"),
    /FOREIGN KEY constraint failed/,
  );
});

test('enforces unique merchant SKU and edition constraints', (t) => {
  const { db } = createDatabase(t);
  insertFamily(db);
  insertEdition(db);

  insertMerchantSku(db, { sku_code: 'SKU-1' });
  assert.throws(
    () => insertMerchantSku(db, { sku_code: 'SKU-2' }),
    /UNIQUE constraint failed: marea_merchant_skus\.edition_id/,
  );

  insertEdition(db, { edition_id: 'ed-unique-1', merchant_sku_code: 'SKU-X' });
  assert.throws(
    () => insertEdition(db, { edition_id: 'ed-unique-2', merchant_sku_code: 'SKU-X' }),
    /UNIQUE constraint failed: marea_product_editions\.merchant_sku_code/,
  );
});

test('rejects invalid enum and boolean values through CHECK constraints', (t) => {
  const { db } = createDatabase(t);
  insertFamily(db);
  insertEdition(db);

  assert.throws(
    () => insertFamily(db, { family_id: 'fam-invalid', product_type: 'BOGUS' }),
    /CHECK constraint failed/,
  );
  assert.throws(
    () => insertEdition(db, { edition_id: 'ed-invalid', edition_type: 'BOGUS' }),
    /CHECK constraint failed/,
  );
  assert.throws(
    () => insertEdition(db, { edition_id: 'ed-bool', merchantable: 2 }),
    /CHECK constraint failed/,
  );
  assert.throws(
    () => insertPriceVersion(db, { price_version_id: 'price-bool', includes_vat: 2 }),
    /CHECK constraint failed/,
  );
});

test('rejects negative stock, negative reservations and reserved above on-hand', (t) => {
  const { db } = createDatabase(t);
  insertFamily(db);
  insertEdition(db);

  assert.throws(
    () => insertInventoryItem(db, { inventory_item_id: 'inv-negative', quantity_on_hand: -1 }),
    /CHECK constraint failed/,
  );
  assert.throws(
    () => insertInventoryItem(db, { inventory_item_id: 'inv-reserved', quantity_reserved: -1 }),
    /CHECK constraint failed/,
  );
  assert.throws(
    () =>
      insertInventoryItem(db, {
        inventory_item_id: 'inv-oversell',
        quantity_on_hand: 5,
        quantity_reserved: 6,
      }),
    /CHECK constraint failed/,
  );
  assert.throws(
    () =>
      insertInventoryItem(db, {
        inventory_item_id: 'inv-unverified',
        status: 'AVAILABLE',
        verified: 0,
      }),
    /CHECK constraint failed/,
  );

  insertInventoryItem(db);
  const item = db
    .prepare(
      'SELECT quantity_on_hand, quantity_reserved, quantity_available FROM marea_inventory_items WHERE inventory_item_id = ?',
    )
    .get('inv-1');
  assert.equal(item.quantity_available, 3);
});

test('rejects inventory UPDATE that would reserve more than on-hand', (t) => {
  const { db } = createDatabase(t);
  insertFamily(db);
  insertEdition(db);
  insertInventoryItem(db);

  assert.throws(
    () =>
      db.exec(
        "UPDATE marea_inventory_items SET quantity_reserved = 6 WHERE inventory_item_id = 'inv-1'",
      ),
    /CHECK constraint failed/,
  );
  assert.throws(
    () =>
      db.exec(
        "UPDATE marea_inventory_items SET quantity_on_hand = 1 WHERE inventory_item_id = 'inv-1'",
      ),
    /CHECK constraint failed/,
  );

  db.exec(
    "UPDATE marea_inventory_items SET quantity_reserved = 5 WHERE inventory_item_id = 'inv-1'",
  );
  const item = db
    .prepare(
      'SELECT quantity_reserved, quantity_available FROM marea_inventory_items WHERE inventory_item_id = ?',
    )
    .get('inv-1');
  assert.equal(item.quantity_reserved, 5);
  assert.equal(item.quantity_available, 0);
});

test('prevents oversell with an atomic conditional reservation across two connections', (t) => {
  const directory = mkdtempSync(join(tmpdir(), 'marea-mc16-atomic-'));
  const databasePath = join(directory, 'marea-commerce-test.sqlite');
  const connectionA = new DatabaseSync(databasePath);
  installMareaCommerceSchema(connectionA);
  const connectionB = new DatabaseSync(databasePath);
  connectionB.exec('PRAGMA foreign_keys = ON;');
  t.after(() => {
    try {
      connectionB.close();
    } catch {
      // Ignore a handle that was already closed.
    }
    try {
      connectionA.close();
    } catch {
      // Ignore a handle that was already closed.
    }
    rmSync(directory, { recursive: true, force: true });
  });

  insertFamily(connectionA);
  insertEdition(connectionA);
  insertGate(connectionA);
  insertEvidence(connectionA, {
    evidence_id: 'ev-stock',
    evidence_type: 'INVENTORY_RECEIPT',
  });
  insertInventoryItem(connectionA, {
    inventory_item_id: 'inv-atomic',
    quantity_on_hand: 1,
    quantity_reserved: 0,
    status: 'AVAILABLE',
    verified: 1,
    stock_evidence_id: 'ev-stock',
  });

  const reserveOne = (db) =>
    db
      .prepare(
        `UPDATE marea_inventory_items
         SET quantity_reserved = quantity_reserved + 1
         WHERE inventory_item_id = 'inv-atomic'
           AND quantity_reserved + 1 <= quantity_on_hand`,
      )
      .run();

  connectionA.exec('BEGIN IMMEDIATE');
  try {
    assert.equal(reserveOne(connectionA).changes, 1);
    connectionA.exec('COMMIT');
  } catch (error) {
    connectionA.exec('ROLLBACK');
    throw error;
  }

  assert.equal(reserveOne(connectionB).changes, 0);

  const item = connectionB
    .prepare(
      `SELECT quantity_on_hand, quantity_reserved, quantity_available
       FROM marea_inventory_items WHERE inventory_item_id = 'inv-atomic'`,
    )
    .get();
  assert.equal(item.quantity_on_hand, 1);
  assert.equal(item.quantity_reserved, 1);
  assert.equal(item.quantity_available, 0);
  assert.ok(item.quantity_reserved <= item.quantity_on_hand);
  assert.ok(item.quantity_available >= 0);
});

test('blocks merchantable, priced, published and activation fields', (t) => {
  const { db } = createDatabase(t);
  insertFamily(db);

  assert.throws(
    () => insertEdition(db, { edition_id: 'ed-merchantable', merchantable: 1 }),
    /MC16_MERCHANTABLE_EDITION_PROHIBITED/,
  );
  assert.throws(
    () => insertEdition(db, { edition_id: 'ed-priced', price_approved: 1 }),
    /MC16_MERCHANTABLE_EDITION_PROHIBITED/,
  );
  assert.throws(
    () => insertEdition(db, { edition_id: 'ed-published', publication_state: 'PUBLISHED' }),
    /MC16_MERCHANTABLE_EDITION_PROHIBITED/,
  );
  assert.throws(
    () => insertEdition(db, { edition_id: 'ed-sale', commercial_status: 'FOR_SALE' }),
    /MC16_MERCHANTABLE_EDITION_PROHIBITED/,
  );

  insertEdition(db);
  assert.throws(
    () =>
      db.exec(
        "UPDATE marea_product_editions SET publication_state = 'PUBLISHED' WHERE edition_id = 'ed-1'",
      ),
    /MC16_MERCHANTABLE_EDITION_PROHIBITED/,
  );

  assert.throws(
    () => insertFamily(db, { family_id: 'fam-sale', commercial_availability: 'FOR_SALE' }),
    /MC16_COMMERCIAL_ACTIVATION_PROHIBITED/,
  );
  assert.throws(
    () =>
      insertFamily(db, {
        family_id: 'fam-active',
        lifecycle_state: 'COMMERCIALLY_AVAILABLE',
      }),
    /MC16_COMMERCIAL_ACTIVATION_PROHIBITED/,
  );

  assert.throws(
    () =>
      insertMerchantSku(db, {
        sku_code: 'SKU-APPROVED',
        state: 'APPROVED',
        approval_evidence_ids_json: '["ev-approval"]',
        approved_by: 'fixture-approver',
      }),
    /MC16_MERCHANT_SKU_ACTIVATION_PROHIBITED/,
  );

  assert.throws(
    () =>
      insertRow(db, 'marea_bundles', {
        bundle_id: 'bundle-published',
        display_name: 'Fixture bundle',
        customer_facing_name: 'Fixture bundle',
        lifecycle_state: 'CONCEPT',
        readiness_state: 'DEFINED',
        commercial_availability: 'NOT_FOR_SALE',
        publication_state: 'PUBLISHED',
        price_status: 'NOT_ESTABLISHED',
        created_at: FIXTURE_TIME,
        updated_at: FIXTURE_TIME,
      }),
    /MC16_BUNDLE_ACTIVATION_PROHIBITED/,
  );

  assert.throws(
    () => insertGate(db, { gate_id: 'gate-closed', status: 'CLOSED_VERIFIED' }),
    /MC16_GATE_CLOSURE_PROHIBITED/,
  );

  assert.throws(
    () => insertFamily(db, { family_id: 'fam-published', publication_state: 'PUBLISHED' }),
    /MC16_COMMERCIAL_ACTIVATION_PROHIBITED/,
  );

  assert.throws(
    () =>
      insertRow(db, 'marea_publication_eligibility', {
        route_id: 'fixture-route',
        entity_id: 'ed-1',
        publication_authorized: 1,
        policy_version: 'fixture-policy',
        created_at: FIXTURE_TIME,
      }),
    /CHECK constraint failed/,
  );

  assert.throws(
    () =>
      insertRow(db, 'marea_subscription_plans', {
        plan_id: 'plan-1',
        plan_key: 'fixture-plan',
        family_id: 'fam-1',
        billing_period: 'NONE',
        entitlement_id: 'ent-1',
        status: 'DEFINED_NOT_ACTIVE',
        billing_mode: 'DEFINED_NOT_ACTIVE',
        price_status: 'NOT_ESTABLISHED',
        checkout_allowed: 1,
        created_at: FIXTURE_TIME,
      }),
    /MC16_SUBSCRIPTION_ACTIVATION_PROHIBITED|CHECK constraint failed/,
  );
});

test('rejects an approved price without verified external approval evidence', (t) => {
  const { db } = createDatabase(t);
  insertFamily(db);
  insertEdition(db);
  insertGate(db);

  insertPriceVersion(db, { price_version_id: 'price-no-evidence' });
  assert.throws(
    () => approvePrice(db, 'price-no-evidence', []),
    /MC16_PRICE_APPROVAL_EVIDENCE_REQUIRED/,
  );

  insertEvidence(db);
  insertPriceVersion(db, { price_version_id: 'price-valid' });
  insertRow(db, 'marea_price_approval_evidence', {
    price_version_id: 'price-valid',
    evidence_id: 'ev-price',
  });
  approvePrice(db, 'price-valid');
  assert.equal(
    db
      .prepare("SELECT status FROM marea_price_versions WHERE price_version_id = 'price-valid'")
      .get().status,
    'APPROVED',
  );
  assert.throws(
    () =>
      db.exec(
        "UPDATE marea_price_versions SET amount_minor = 999999 WHERE price_version_id = 'price-valid'",
      ),
    /MC16_APPROVED_PRICE_IMMUTABLE/,
  );
  assert.throws(
    () =>
      db.exec(
        "UPDATE marea_price_versions SET status = 'REVOKED' WHERE price_version_id = 'price-valid'",
      ),
    /MC16_APPROVED_PRICE_IMMUTABLE/,
  );
  assert.throws(
    () =>
      db.exec("DELETE FROM marea_price_approval_evidence WHERE price_version_id = 'price-valid'"),
    /MC16_APPROVED_PRICE_EVIDENCE_IMMUTABLE/,
  );

  assert.throws(
    () =>
      insertPriceVersion(db, {
        price_version_id: 'price-born-approved',
        status: 'APPROVED',
        amount_minor: 199900,
        currency: 'EUR',
        territory: 'ES',
        channel: 'ONLINE',
        vat_basis: 'NET',
        includes_vat: 1,
        effective_from: FIXTURE_TIME,
        approved_by: 'fixture-finance-lead',
        approved_by_role: 'FINANCE_LEAD',
        approval_evidence_ids_json: '["synthetic-fake-evidence"]',
      }),
    /MC16_PRICE_APPROVAL_EVIDENCE_REQUIRED/,
  );

  insertEvidence(db, {
    evidence_id: 'ev-repository',
    evidence_class: 'REPOSITORY_VERIFIED',
  });
  insertPriceVersion(db, { price_version_id: 'price-repository-evidence' });
  insertRow(db, 'marea_price_approval_evidence', {
    price_version_id: 'price-repository-evidence',
    evidence_id: 'ev-repository',
  });
  assert.throws(
    () => approvePrice(db, 'price-repository-evidence', ['ev-repository']),
    /MC16_PRICE_APPROVAL_EVIDENCE_REQUIRED/,
  );
});

test('keeps audit events append-only with unique identity and hash', (t) => {
  const { db } = createDatabase(t);
  insertAuditEvent(db);

  assert.throws(
    () => db.exec("UPDATE marea_audit_events SET reason = 'changed' WHERE event_id = 'ev-audit-1'"),
    /MC16_AUDIT_APPEND_ONLY/,
  );
  assert.throws(
    () => db.exec("DELETE FROM marea_audit_events WHERE event_id = 'ev-audit-1'"),
    /MC16_AUDIT_APPEND_ONLY/,
  );
  assert.throws(() => insertAuditEvent(db, { event_hash: 'b'.repeat(64) }), /MC16_AUDIT_DUPLICATE/);
  assert.throws(() => insertAuditEvent(db, { event_id: 'ev-audit-2' }), /MC16_AUDIT_DUPLICATE/);
  assert.throws(
    () =>
      insertAuditEvent(db, {
        event_id: 'ev-audit-empty',
        event_hash: 'd'.repeat(64),
        evidence_refs_json: '[]',
      }),
    /CHECK constraint failed/,
  );

  insertAuditEvent(db, { event_id: 'ev-audit-3', event_hash: 'c'.repeat(64) });
  assert.equal(count(db, 'marea_audit_events'), 2);
});

test('rejects real entitlement grants but accepts explicit synthetic test grants', (t) => {
  const { db } = createDatabase(t);
  insertRow(db, 'marea_entitlement_definitions', {
    entitlement_id: 'ent-1',
    capability_key: 'fixture-capability',
    term: 'NONE',
    shared_ledger_key: 'fixture-ledger',
    status: 'HYPOTHESIS_UNAPPROVED',
    created_at: FIXTURE_TIME,
  });

  const grant = (overrides) =>
    insertRow(db, 'marea_entitlement_grants', {
      grant_id: 'grant-1',
      entitlement_id: 'ent-1',
      scope_type: 'ACCOUNT',
      scope_id: 'fixture-account',
      state: 'DRAFT',
      basis: 'SYNTHETIC_TEST',
      synthetic: 1,
      starts_at: FIXTURE_TIME,
      actor_id: 'fixture-user',
      audit_event_id: 'ev-audit-fixture',
      created_at: FIXTURE_TIME,
      ...overrides,
    });

  assert.throws(
    () => grant({ grant_id: 'grant-real', synthetic: 0 }),
    /MC16_REAL_ENTITLEMENT_GRANT_PROHIBITED|CHECK constraint failed/,
  );
  assert.throws(
    () => grant({ grant_id: 'grant-contract', basis: 'CONTRACT' }),
    /MC16_REAL_ENTITLEMENT_GRANT_PROHIBITED|CHECK constraint failed/,
  );
  assert.throws(
    () => grant({ grant_id: 'grant-purchase', basis: 'PURCHASE' }),
    /MC16_REAL_ENTITLEMENT_GRANT_PROHIBITED/,
  );

  grant({ grant_id: 'grant-synthetic' });
  assert.equal(count(db, 'marea_entitlement_grants'), 1);
});

test('installs idempotently: a second install changes nothing', (t) => {
  const { db } = createDatabase(t);
  const tablesBefore = listTables(db);
  const triggersBefore = listSchemaTriggers(db);

  installMareaCommerceSchema(db);
  installMareaCommerceSchema(db);

  assert.deepEqual(listTables(db), tablesBefore);
  assert.deepEqual(listSchemaTriggers(db), triggersBefore);
  assert.equal(count(db, 'marea_schema_meta'), 1);
});

test('rolls back transactions, including a failed foreign-key insert', (t) => {
  const { db } = createDatabase(t);

  db.exec('BEGIN IMMEDIATE');
  try {
    insertFamily(db, { family_id: 'fam-rollback' });
  } finally {
    db.exec('ROLLBACK');
  }
  assert.equal(count(db, 'marea_product_families'), 0);

  db.exec('BEGIN IMMEDIATE');
  try {
    insertFamily(db, { family_id: 'fam-transaction' });
    assert.throws(
      () => insertEdition(db, { edition_id: 'ed-orphan', family_id: 'missing-family' }),
      /FOREIGN KEY constraint failed/,
    );
  } finally {
    db.exec('ROLLBACK');
  }
  assert.equal(count(db, 'marea_product_families'), 0);
  assert.equal(count(db, 'marea_product_editions'), 0);
});

test('drops and reinstalls the full schema reversibly', (t) => {
  const { db } = createDatabase(t);
  insertFamily(db);

  dropMareaCommerceSchema(db);
  dropMareaCommerceSchema(db);
  assert.deepEqual(
    listTables(db).filter((table) => table.startsWith('marea_')),
    [],
  );
  assert.deepEqual(listSchemaTriggers(db), []);

  installMareaCommerceSchema(db);
  assert.deepEqual(listTables(db), [...MAREA_COMMERCE_TABLES].sort());
  assert.equal(count(db, 'marea_schema_meta'), 1);
  assert.equal(count(db, 'marea_product_families'), 0);
  assert.equal(db.prepare('PRAGMA foreign_keys').get().foreign_keys, 1);
});

test('CLI installs, verifies, prints the version and drops a disposable database', (t) => {
  const databasePath = tempDatabasePath(t);

  const version = runCli(['--print-version']);
  assert.equal(version.status, 0);
  assert.equal(version.stdout.trim(), MAREA_COMMERCE_SCHEMA_VERSION);

  const install = runCli(['--install', '--db', databasePath]);
  assert.equal(install.status, 0, install.stderr);
  assert.equal(existsSync(databasePath), true);
  assert.match(install.stdout, new RegExp(MAREA_COMMERCE_SCHEMA_VERSION));

  const verify = runCli(['--verify', '--db', databasePath]);
  assert.equal(verify.status, 0, verify.stderr);
  assert.match(verify.stdout, /verified/);

  const dropped = runCli(['--drop', '--db', databasePath]);
  assert.equal(dropped.status, 0, dropped.stderr);

  const verifyAfterDrop = runCli(['--verify', '--db', databasePath]);
  assert.notEqual(verifyAfterDrop.status, 0);
});

test('CLI refuses production, repository data and non-temporary paths', (t) => {
  const forbiddenDataPath = join(REPO_ROOT, 'data', 'marea-cli-refusal-test.sqlite');
  const forbiddenScriptPath = join(REPO_ROOT, 'scripts', 'marea-commerce.sqlite');
  const allowedTempPath = tempDatabasePath(t);

  assert.throws(
    () => assertDisposableDatabasePath(PRODUCTION_DATABASE_PATH),
    /production database/,
  );
  assert.throws(() => assertDisposableDatabasePath(forbiddenDataPath), /repository data directory/);
  assert.throws(() => assertDisposableDatabasePath(forbiddenScriptPath), /non-temporary/);
  assert.throws(() => assertDisposableDatabasePath('relative-test.sqlite'), /must be absolute/);
  assert.doesNotThrow(() => assertDisposableDatabasePath(allowedTempPath));

  // --print-version never opens a database, so this proves the CLI refusal
  // wiring against the real production path without touching the file.
  const refusedProduction = runCli(['--print-version', '--db', PRODUCTION_DATABASE_PATH]);
  assert.notEqual(refusedProduction.status, 0);
  assert.match(refusedProduction.stderr, /production database/);

  const productionBefore = existsSync(PRODUCTION_DATABASE_PATH)
    ? statSync(PRODUCTION_DATABASE_PATH)
    : null;
  assert.equal(existsSync(forbiddenDataPath), false);
  try {
    const refused = runCli(['--install', '--db', forbiddenDataPath]);
    assert.notEqual(refused.status, 0);
    assert.match(refused.stderr, /repository data directory/);
    assert.equal(existsSync(forbiddenDataPath), false);
  } finally {
    if (existsSync(forbiddenDataPath)) rmSync(forbiddenDataPath);
  }

  if (productionBefore) {
    const productionAfter = statSync(PRODUCTION_DATABASE_PATH);
    assert.equal(productionAfter.size, productionBefore.size);
    assert.equal(productionAfter.mtimeMs, productionBefore.mtimeMs);
  }
});
