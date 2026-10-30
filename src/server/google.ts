import { OAuth2Client } from 'google-auth-library';
import { SITE } from '../app/core/site.config';

export interface GoogleIdentity {
  readonly googleId: string;
  readonly email: string;
  readonly name: string;
  readonly picture: string;
}

const client = new OAuth2Client();

/**
 * Verifica un ID token de Google Identity Services.
 *
 * La firma, el emisor y la audiencia se validan contra las claves públicas de
 * Google; el client ID es el mismo que usa GuíaTV. No se usa client secret.
 */
export const verifyGoogleCredential = async (credential: string): Promise<GoogleIdentity> => {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: SITE.googleClientId,
  });
  const payload = ticket.getPayload();
  if (!payload?.sub || !payload.email || payload.email_verified !== true) {
    throw new Error('invalid_google_identity');
  }
  return {
    googleId: payload.sub,
    email: payload.email.trim().toLowerCase(),
    name: (payload.name ?? payload.email.split('@')[0] ?? '').trim().slice(0, 120),
    picture: (payload.picture ?? '').trim().slice(0, 500),
  };
};
