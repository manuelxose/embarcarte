# Google sign-in

Embarcarte uses the same Google OAuth **web client** as GuíaTV:

```text
533857766582-hsp4fsrct6321117n68de3h4ckmqrmab.apps.googleusercontent.com
```

This is a public client ID, not a secret. The flow is Google Identity Services (GIS) with
an ID token; **no client secret and no redirect URI are used**.

## 1. How it works

1. The login/register screen loads `https://accounts.google.com/gsi/client`.
2. Google renders the “Continue with Google” button and returns a signed ID token
   (`credential`) to the browser.
3. The browser posts it to `POST /api/auth/google`.
4. The Express server verifies signature, issuer, audience, expiry and
   `email_verified === true` with `google-auth-library`.
5. The server:
   - finds the user by Google `sub`; or
   - creates a customer with a random, unusable local password hash.
6. The existing `emb_session` HttpOnly cookie is created. Google users therefore use the same
   session, guards, account page and order history as password users.

If the Google email already belongs to a **local password account**, the request is refused
with `409 google_email_exists`. Automatic linking is deliberately not performed: local
registration does not verify the email address, so auto-linking would let a Google account
claim an account that someone else registered with that address. A future authenticated
“link Google” flow can add linking safely. An existing Google identity is never replaced by a
different Google `sub` (`409 google_account_conflict`).

## 2. Google Cloud configuration (required, once)

The OAuth client is shared with GuíaTV. In **Google Cloud Console → APIs & Services →
Credentials → the OAuth 2.0 Client ID above**, add:

| Type | Value |
| --- | --- |
| Authorized JavaScript origin | `https://embarcarte.com` |
| Authorized JavaScript origin | `https://www.embarcarte.com` |
| Authorized JavaScript origin (dev) | `http://localhost:4200` |
| Authorized JavaScript origin (dev) | `http://127.0.0.1:4200` |

No **Authorized redirect URI** is needed for the current GIS flow.

The OAuth consent screen must continue to allow the scopes already used by GuíaTV:
`openid`, `email`, `profile`. If the app is in “Testing”, add the Google accounts that will
test Embarcarte as test users.

If the origin is missing, Google reports `origin_mismatch` / “The given origin is not allowed
for this client ID” and no credential is returned. This cannot be fixed from the application
code.

**Current state (verified 2026-10-30):** the shared client ID is not yet configured for any
Embarcarte origin, including `http://localhost:4200`. The button renders, but Google returns
`[GSI_LOGGER]: The given origin is not allowed for the given client ID` and no credential is
issued. The Google Cloud change above is a release prerequisite.

## 3. Application configuration

No new environment variable or secret is required. The client ID lives in
[`src/app/core/site.config.ts`](../../src/app/core/site.config.ts) and is used by both the
browser and the server verifier.

The production CSP allows only the Google Identity origins needed by GIS:

```text
script-src  'self' 'unsafe-inline' https://accounts.google.com
style-src   'self' 'unsafe-inline' https://accounts.google.com
connect-src 'self' https://accounts.google.com
frame-src   https://accounts.google.com
```

## 4. Data and limitations

- Stored: Google `sub` (`users.google_id`), verified email, display name, and a random
  password hash that cannot be used to sign in.
- Not stored: Google access/refresh tokens, ID token, profile picture.
- A Google-created account has no usable local password. The current “change password”
  screen requires the old password, so a Google-only user cannot add a password from the
  account page. Adding a “set password” flow is a separate change.
- Existing password accounts are not auto-linked by email. They keep using their password;
  linking Google requires a future authenticated flow. This is intentional because local
  registration has no email-verification step.
- Logout is the normal Embarcarte logout; it does not revoke the Google session.

## 5. Verification

Automated:

```bash
npm run build
npm run test:i18n
npm run test:commerce
```

The commerce suite checks that `/api/auth/google` rejects a request with no credential.
The login page is included in the browser E2E/accessibility suite.

Manual (requires a Google account and the authorized origin):

1. Open `/en/login` or `/es/acceso`.
2. Click “Continue with Google”.
3. Confirm the account page opens and `/api/auth/me` returns the Google email.
4. Sign out, return to login and repeat; the same user id must be reused.
5. Sign in with an existing password account whose email matches a test Google account;
   confirm Google returns `409 google_email_exists` and the password login still works.
   (This is the deliberate no-auto-link rule.)
