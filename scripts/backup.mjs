import { createHash } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { cp, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

/**
 * Copia de seguridad consistente de SQLite + uploads.
 *
 * Uso: node scripts/backup.mjs --data-dir /ruta/data --out /ruta/backup-YYYYMMDD
 * No escribe en el directorio de origen. El destino debe no existir.
 */
const args = Object.fromEntries(
  process.argv
    .slice(2)
    .map((value, index, all) => (value.startsWith('--') ? [value.slice(2), all[index + 1]] : null))
    .filter(Boolean),
);
const dataDir = args['data-dir'];
const out = args.out;
if (!dataDir || !out) {
  console.error('Usage: node scripts/backup.mjs --data-dir <DATA_DIR> --out <empty-directory>');
  process.exit(2);
}

const sha256 = async (path) =>
  createHash('sha256')
    .update(await readFile(path))
    .digest('hex');

async function walk(dir, base = dir) {
  const entries = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) entries.push(...(await walk(full, base)));
    else if (entry.isFile()) {
      const info = await stat(full);
      entries.push({
        path: relative(base, full).split('\\').join('/'),
        bytes: info.size,
        sha256: await sha256(full),
      });
    }
  }
  return entries;
}

await mkdir(out, { recursive: false });
const sourceDb = join(dataDir, 'embarcarte.sqlite');
const sourceUploads = join(dataDir, 'uploads');
const targetDb = join(out, 'embarcarte.sqlite');

const db = new DatabaseSync(sourceDb, { readOnly: true });
const integrity = db.prepare('PRAGMA integrity_check').get();
if (Object.values(integrity)[0] !== 'ok') throw new Error('source database failed integrity_check');
db.exec(`VACUUM INTO '${targetDb.replace(/'/g, "''")}'`);
const counts = Object.fromEntries(
  ['users', 'sessions', 'products', 'orders', 'order_items', 'messages'].map((table) => [
    table,
    Object.values(db.prepare(`SELECT COUNT(*) FROM ${table}`).get())[0],
  ]),
);
db.close();

const uploads = await (async () => {
  try {
    await stat(sourceUploads);
  } catch {
    return [];
  }
  await cp(sourceUploads, join(out, 'uploads'), { recursive: true });
  return walk(join(out, 'uploads'), out);
})();

const manifest = {
  format: 1,
  created_at: new Date().toISOString(),
  database: {
    file: 'embarcarte.sqlite',
    bytes: (await stat(targetDb)).size,
    sha256: await sha256(targetDb),
    integrity_check: 'ok',
    counts,
  },
  uploads,
};
await writeFile(join(out, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(
  `Backup written to ${out} (${manifest.database.bytes} bytes, ${uploads.length} uploads)`,
);
