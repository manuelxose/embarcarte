#!/usr/bin/env node
/**
 * MC-16 disposable SQLite schema tooling.
 *
 * This CLI installs, verifies and drops the isolated MC-16 commerce schema on a
 * database path that is explicitly supplied and provably disposable. It is
 * deliberately hostile to production paths: data/embarcarte.sqlite and every
 * path inside the repository data directory are refused before a database
 * handle is opened. It is never imported by the running web server.
 */
import { existsSync, realpathSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import {
  MAREA_COMMERCE_SCHEMA_VERSION,
  MAREA_COMMERCE_TABLES,
  dropMareaCommerceSchema,
  installMareaCommerceSchema,
} from '../src/server/marea-commerce/schema.ts';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO_DATA_DIRECTORY = join(REPO_ROOT, 'data');
const PRODUCTION_DATABASE_PATH = join(REPO_DATA_DIRECTORY, 'embarcarte.sqlite');
const TEMP_PATH_TOKEN =
  /(?:^|[\\/._-])(?:test|tests|tmp|temp|scratch|disposable|sandbox)(?:[\\/._-]|$)/i;
const ACTIONS = new Set(['--install', '--verify', '--drop', '--print-version']);

const USAGE = `Usage:
  node scripts/marea-commerce-schema.mjs --install --db <disposable.sqlite>
  node scripts/marea-commerce-schema.mjs --verify --db <disposable.sqlite>
  node scripts/marea-commerce-schema.mjs --drop --db <disposable.sqlite>
  node scripts/marea-commerce-schema.mjs --print-version

The database path must be absolute and disposable: inside the operating-system
temp directory, or clearly marked as test/tmp/scratch/disposable. The repository
data directory and data/embarcarte.sqlite are always refused.`;

const fold = (value) => (process.platform === 'win32' ? value.toLowerCase() : value);

function canonicalPath(target) {
  const absolute = resolve(target);
  try {
    return realpathSync(absolute);
  } catch {
    try {
      return join(realpathSync(dirname(absolute)), basename(absolute));
    } catch {
      return absolute;
    }
  }
}

function isInsidePath(child, parent) {
  const rel = relative(fold(parent), fold(child));
  return rel === '' || (rel !== '..' && !rel.startsWith(`..${sep}`) && !isAbsolute(rel));
}

/**
 * Resolve and validate an explicitly supplied disposable database path.
 * Throws before any database handle is opened when the path is not safe.
 */
export function assertDisposableDatabasePath(databasePath) {
  if (typeof databasePath !== 'string' || databasePath.trim() === '') {
    throw new Error('an explicit --db <path> is required');
  }
  if (!isAbsolute(databasePath)) {
    throw new Error(`database path must be absolute: ${databasePath}`);
  }

  const target = canonicalPath(databasePath);
  if (fold(target) === fold(canonicalPath(PRODUCTION_DATABASE_PATH))) {
    throw new Error('refusing the production database: data/embarcarte.sqlite');
  }
  if (isInsidePath(target, canonicalPath(REPO_DATA_DIRECTORY))) {
    throw new Error('refusing a database path inside the repository data directory');
  }
  if (!isInsidePath(target, canonicalPath(tmpdir())) && !TEMP_PATH_TOKEN.test(target)) {
    throw new Error(
      'refusing a non-temporary database path; use the OS temp directory or a test/tmp path',
    );
  }
  return target;
}

function parseArguments(argv) {
  let action = null;
  let databasePath = null;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--db') {
      if (databasePath !== null) throw new Error('--db may only be supplied once');
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) throw new Error('--db requires a database path');
      databasePath = value;
      index += 1;
    } else if (argument === '--help' || argument === '-h') {
      action = '--help';
    } else if (ACTIONS.has(argument)) {
      if (action !== null) throw new Error('exactly one action may be supplied');
      action = argument;
    } else {
      throw new Error(`unknown argument: ${argument}`);
    }
  }

  if (action === null) {
    throw new Error('one of --install, --verify, --drop or --print-version is required');
  }
  if (action !== '--help' && action !== '--print-version' && databasePath === null) {
    throw new Error(`${action} requires --db <disposable-path>`);
  }
  return { action, databasePath };
}

function verifyInstalledSchema(db) {
  db.exec('PRAGMA foreign_keys = ON;');
  const foreignKeys = db.prepare('PRAGMA foreign_keys').get();
  if (!foreignKeys || foreignKeys.foreign_keys !== 1) {
    throw new Error('PRAGMA foreign_keys is not enabled');
  }

  const tables = new Set(
    db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table'")
      .all()
      .map((row) => row.name),
  );
  const missingTables = MAREA_COMMERCE_TABLES.filter((table) => !tables.has(table));
  if (missingTables.length > 0) {
    throw new Error(`missing MC-16 tables: ${missingTables.join(', ')}`);
  }

  const versions = db.prepare('SELECT schema_version FROM marea_schema_meta').all();
  if (versions.length !== 1 || versions[0].schema_version !== MAREA_COMMERCE_SCHEMA_VERSION) {
    const found = versions.map((row) => row.schema_version).join(', ') || 'none';
    throw new Error(
      `schema version mismatch: expected ${MAREA_COMMERCE_SCHEMA_VERSION}, found ${found}`,
    );
  }

  const triggers = db
    .prepare(
      "SELECT count(*) AS total FROM sqlite_master WHERE type = 'trigger' AND name LIKE 'trg_marea_%'",
    )
    .get().total;
  if (!triggers || triggers < 10) {
    throw new Error(`expected MC-16 triggers, found ${triggers ?? 0}`);
  }

  return { tables: MAREA_COMMERCE_TABLES.length, triggers };
}

function install(target) {
  const db = new DatabaseSync(target);
  try {
    installMareaCommerceSchema(db);
    const verified = verifyInstalledSchema(db);
    console.log(
      `MC-16 schema installed: ${MAREA_COMMERCE_SCHEMA_VERSION} ` +
        `(${verified.tables} tables, ${verified.triggers} triggers)`,
    );
  } finally {
    db.close();
  }
}

function verify(target) {
  if (!existsSync(target)) throw new Error(`database not found: ${target}`);
  const db = new DatabaseSync(target, { readOnly: true });
  try {
    const verified = verifyInstalledSchema(db);
    console.log(
      `MC-16 schema verified: ${MAREA_COMMERCE_SCHEMA_VERSION} ` +
        `(${verified.tables} tables, ${verified.triggers} triggers)`,
    );
  } finally {
    db.close();
  }
}

function drop(target) {
  if (!existsSync(target)) throw new Error(`database not found: ${target}`);
  const db = new DatabaseSync(target);
  try {
    dropMareaCommerceSchema(db);
    console.log(`MC-16 schema dropped: ${target}`);
  } finally {
    db.close();
  }
}

function main(argv = process.argv.slice(2)) {
  const { action, databasePath } = parseArguments(argv);

  if (action === '--help') {
    console.log(USAGE);
    return;
  }

  const target = databasePath === null ? null : assertDisposableDatabasePath(databasePath);
  if (action === '--print-version') {
    console.log(MAREA_COMMERCE_SCHEMA_VERSION);
    return;
  }

  if (action === '--install') install(target);
  else if (action === '--verify') verify(target);
  else if (action === '--drop') drop(target);
}

const invokedDirectly = (() => {
  if (!process.argv[1]) return false;
  try {
    return fold(realpathSync(process.argv[1])) === fold(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
})();

if (invokedDirectly) {
  try {
    main();
  } catch (error) {
    console.error(`marea-commerce-schema: ${error.message}`);
    process.exitCode = 1;
  }
}
