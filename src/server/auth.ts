import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import type { NextFunction, Request, Response } from 'express';
import { db } from './db';

const scryptAsync = promisify(scrypt) as (pw: string, salt: Buffer, len: number) => Promise<Buffer>;

export const COOKIE = 'emb_session';
const SESSION_DAYS = 30;

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  phone: string;
  address: string;
  created_at: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  const salt = randomBytes(16);
  const hash = await scryptAsync(password, salt, 64);
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
};

export const verifyPassword = async (password: string, stored: string): Promise<boolean> => {
  const [, saltHex, hashHex] = stored.split('$');
  if (!saltHex || !hashHex) return false;
  const hash = await scryptAsync(password, Buffer.from(saltHex, 'hex'), 64);
  return timingSafeEqual(hash, Buffer.from(hashHex, 'hex'));
};

const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

export const createSession = (res: Response, userId: number): void => {
  const token = randomBytes(32).toString('base64url');
  const expires = Date.now() + SESSION_DAYS * 86_400_000;
  db.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)').run(
    sha256(token),
    userId,
    expires,
  );
  res.cookie(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env['NODE_ENV'] === 'production',
    expires: new Date(expires),
    path: '/',
  });
};

export const destroySession = (req: Request, res: Response): void => {
  const token = readCookie(req, COOKIE);
  if (token) db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(sha256(token));
  res.clearCookie(COOKIE, { path: '/' });
};

/**
 * Tras cambiar la contraseña se invalidan las demás sesiones de la cuenta,
 * conservando la actual (el usuario que acaba de cambiarla no debe ser expulsado).
 */
export const revokeOtherSessions = (req: Request, userId: number): void => {
  const token = readCookie(req, COOKIE);
  if (token) {
    db.prepare('DELETE FROM sessions WHERE user_id = ? AND token_hash != ?').run(userId, sha256(token));
  } else {
    db.prepare('DELETE FROM sessions WHERE user_id = ?').run(userId);
  }
};

const readCookie = (req: Request, name: string): string | undefined => {
  for (const part of (req.headers.cookie ?? '').split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return decodeURIComponent(rest.join('='));
  }
  return undefined;
};

export const currentUser = (req: Request): User | undefined => {
  const token = readCookie(req, COOKIE);
  if (!token) return undefined;
  const row = db
    .prepare(
      `SELECT u.id, u.email, u.name, u.role, u.phone, u.address, u.created_at
       FROM sessions s JOIN users u ON u.id = s.user_id
       WHERE s.token_hash = ? AND s.expires_at > ?`,
    )
    .get(sha256(token), Date.now());
  return row as unknown as User | undefined;
};

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

export const requireUser = (req: Request, res: Response, next: NextFunction): void => {
  const user = currentUser(req);
  if (!user) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }
  req.user = user;
  next();
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = currentUser(req);
  if (user?.role !== 'admin') {
    res.status(user ? 403 : 401).json({ error: 'forbidden' });
    return;
  }
  req.user = user;
  next();
};

/** Crea o actualiza el administrador definido en ADMIN_EMAIL / ADMIN_PASSWORD. */
export const ensureAdmin = async (): Promise<void> => {
  const email = process.env['ADMIN_EMAIL'];
  const password = process.env['ADMIN_PASSWORD'];
  if (!email || !password) return;
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email) as { id: number } | undefined;
  const hash = await hashPassword(password);
  if (existing) {
    db.prepare("UPDATE users SET role = 'admin', password_hash = ? WHERE id = ?").run(hash, existing.id);
  } else {
    db.prepare("INSERT INTO users (email, name, password_hash, role) VALUES (?, 'Administrador', ?, 'admin')").run(
      email,
      hash,
    );
  }
};

export const purgeExpiredSessions = (): void => {
  db.prepare('DELETE FROM sessions WHERE expires_at <= ?').run(Date.now());
};
