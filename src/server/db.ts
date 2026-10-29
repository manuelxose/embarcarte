import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import type * as Sqlite from 'node:sqlite';

// Carga en tiempo de ejecución: el empaquetador quita el prefijo "node:" y "sqlite" solo existe con él.
const { DatabaseSync } = process.getBuiltinModule('node:sqlite') as typeof Sqlite;

const dataDir = process.env['DATA_DIR'] ?? join(process.cwd(), 'data');
mkdirSync(dataDir, { recursive: true });

export const UPLOADS_DIR = join(dataDir, 'uploads');

export const db = new DatabaseSync(join(dataDir, 'embarcarte.sqlite'));

db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    phone TEXT NOT NULL DEFAULT '',
    address TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Tecnología',
    summary TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    image TEXT NOT NULL DEFAULT '',
    active INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    status TEXT NOT NULL DEFAULT 'pendiente'
      CHECK (status IN ('pendiente', 'pagado', 'enviado', 'completado', 'cancelado')),
    total_cents INTEGER NOT NULL,
    payment_method TEXT NOT NULL,
    shipping_name TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    shipping_phone TEXT NOT NULL,
    notes TEXT NOT NULL DEFAULT '',
    stripe_session_id TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS order_items (
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    unit_cents INTEGER NOT NULL,
    qty INTEGER NOT NULL CHECK (qty > 0)
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    topic TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    read INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

/** Ejecuta `fn` en una transacción y hace rollback si lanza. */
export const transaction = <T>(fn: () => T): T => {
  db.exec('BEGIN IMMEDIATE');
  try {
    const result = fn();
    db.exec('COMMIT');
    return result;
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
};

// Productos iniciales como borrador: el administrador revisa precio y stock y los publica.
const seed = [
  {
    slug: 'open-marine-hub',
    name: 'Open Marine Hub',
    summary: 'Ordenador de navegación con Signal K, cartas offline y Wi-Fi a bordo.',
    description:
      'Equipo compacto basado en Raspberry Pi que recoge los datos de tus instrumentos NMEA 0183 y NMEA 2000 ' +
      'y los comparte con tablets y móviles del barco. Incluye Open Marine Navigator y el motor de cartas.',
  },
  {
    slug: 'open-marine-autopilot',
    name: 'Controlador Open Marine Autopilot',
    summary: 'Controlador de piloto automático con Pico 2, driver MD30C y parada de emergencia.',
    description:
      'Controlador dedicado para actuadores DC de 12 V: PWM a 20 kHz, supervisión de corriente, corte por pérdida ' +
      'de comunicación y entrada para parada de emergencia física.',
  },
  {
    slug: 'kit-ais-sdr',
    name: 'Kit receptor AIS',
    summary: 'Receptor AIS por SDR listo para conectar al Open Marine Hub.',
    description: 'Receptor AIS basado en RTL-SDR con antena y configuración para Open Marine. Solo recepción.',
  },
];
const insertSeed = db.prepare(
  `INSERT OR IGNORE INTO products (slug, name, summary, description, price_cents, stock, active)
   VALUES (?, ?, ?, ?, 0, 0, 0)`,
);
for (const p of seed) insertSeed.run(p.slug, p.name, p.summary, p.description);
