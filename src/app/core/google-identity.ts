import { SITE } from './site.config';

interface GoogleCredentialResponse {
  credential?: string;
}

interface GoogleIdentityApi {
  initialize(options: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
  }): void;
  renderButton(parent: HTMLElement, options: Record<string, string | number | boolean>): void;
}

declare global {
  interface Window {
    google?: { accounts?: { id?: GoogleIdentityApi } };
  }
}

let loading: Promise<GoogleIdentityApi> | null = null;

/**
 * Carga Google Identity Services solo en el navegador. El client ID es público;
 * el servidor valida el ID token y nunca recibe un client secret.
 */
export const loadGoogleIdentity = (): Promise<GoogleIdentityApi> => {
  const ready = window.google?.accounts?.id;
  if (ready) return Promise.resolve(ready);
  if (loading) return loading;

  loading = new Promise<GoogleIdentityApi>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.dataset['googleIdentity'] = 'true';
    script.onload = () => {
      const api = window.google?.accounts?.id;
      if (api) resolve(api);
      else reject(new Error('google_identity_unavailable'));
    };
    script.onerror = () => reject(new Error('google_identity_script_failed'));
    document.head.appendChild(script);
  }).catch((error: unknown) => {
    loading = null;
    throw error;
  });

  return loading;
};

export const mountGoogleButton = async (
  element: HTMLElement,
  locale: 'es' | 'en',
  onCredential: (credential: string) => void,
): Promise<void> => {
  const api = await loadGoogleIdentity();
  api.initialize({
    client_id: SITE.googleClientId,
    callback: (response) => {
      if (response.credential) onCredential(response.credential);
    },
    auto_select: false,
    cancel_on_tap_outside: true,
  });
  api.renderButton(element, {
    type: 'standard',
    theme: 'outline',
    size: 'large',
    text: 'continue_with',
    shape: 'pill',
    logo_alignment: 'left',
    width: Math.max(200, Math.min(360, element.clientWidth || 300)),
    locale,
  });
};
