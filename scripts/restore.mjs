import { createHash } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { cp, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Restaura una copia en un directorio NUEVO y verifica su integridad.
 *
 * Uso: node scripts/restore.mjs --backup <backup> --target <empty-directory>
 * Nunca escribe en el backup. No se debe apuntar a producción desde este script.
 */
const args = Object.fromEntries(
  process.argv
    .slice(2)
    .map((value, index, all) => (value.startsWith('--') ? [value.slice(2), all[index + 1]] : null))
    .filter(Boolean),
);
const backup = args.backup;
const target = args.target;
if (!backup || !target) {
  console.error('Usage: node scripts/restore.mjs --backup <directory> --target <empty-directory>');
  process.exit(2);
}

const sha256 = async (path) =>
  createHash('sha256')
    .update(await readFile(path))
    .digest('hex');

const manifest = JSON.parse(await readFile(join(backup, 'manifest.json'), 'utf8'));
if (manifest.format !== 1) throw new Error('unsupported backup format');
if ((await sha256(join(backup, manifest.database.file))) !== manifest.database.sha256) {
  throw new Error('database checksum does not match the manifest');
}
for (const file of manifest.uploads) {
  if ((await sha256(join(backup, file.path))) !== file.sha256)
    throw new Error(`upload checksum mismatch: ${file.path}`);
}

await mkdir(target, { recursive: false });
await cp(join(backup, manifest.database.file), join(target, 'embarcarte.sqlite'));
try {
  await stat(join(backup, 'uploads'));
  await cp(join(backup, 'uploads'), join(target, 'uploads'), { recursive: true });
} catch {
  // Sin uploads: es una copia válida de una instalación que aún no tiene imágenes.
}

const restored = new DatabaseSync(join(target, 'embarcarte.sqlite'), { readOnly: true });
const integrity = Object.values(restored.prepare('PRAGMA integrity_check').get())[0];
const foreignKeys = restored.prepare('PRAGMA foreign_key_check').all();
const counts = Object.fromEntries(
  Object.keys(manifest.database.counts).map((table) => [
    table,
    Object.values(restored.prepare(`SELECT COUNT(*) FROM ${table}`).get())[0],
  ]),
);
restored.close();

if (integrity !== 'ok') throw new Error(`restored database integrity_check: ${integrity}`);
if (foreignKeys.length) throw new Error('restored database has foreign key violations');
for (const [table, expected] of Object.entries(manifest.database.counts)) {
  if (counts[table] !== expected)
    throw new Error(`row count mismatch in ${table}: ${counts[table]} != ${expected}`);
}

const report = {
  restored_at: new Date().toISOString(),
  integrity_check: integrity,
  foreign_key_violations: foreignKeys.length,
  counts,
  verified: true,
};
await writeFile(join(target, 'restore-verification.json'), JSON.stringify(report, null, 2));
console.log(
  `Restore verified in ${target}: integrity ok, ${Object.values(counts).reduce((a, b) => a + b, 0)} rows.`,
);
