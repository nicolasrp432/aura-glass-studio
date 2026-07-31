import { useEffect, useState } from "react";

/**
 * Gestión del consentimiento para contenido de terceros (RGPD art. 7 y
 * art. 22.2 LSSI-CE). El consentimiento se guarda en localStorage con marca
 * de tiempo y versión, de modo que quede acreditado y pueda renovarse cuando
 * cambien las finalidades.
 */

export const CONSENT_STORAGE_KEY = "manipedi.consent";
export const CONSENT_VERSION = 1;

/** Meses tras los cuales se vuelve a solicitar el consentimiento. */
const CONSENT_MAX_AGE_MONTHS = 12;

export interface ConsentState {
  version: number;
  /** Contenido incrustado de terceros: mapa de Google Maps. */
  externalMedia: boolean;
  /** Fecha ISO en la que se registró la decisión. */
  decidedAt: string;
}

const CONSENT_EVENT = "manipedi:consent-change";
const PREFERENCES_EVENT = "manipedi:consent-open";

const isExpired = (decidedAt: string) => {
  const decided = new Date(decidedAt).getTime();
  if (Number.isNaN(decided)) return true;
  const maxAgeMs = CONSENT_MAX_AGE_MONTHS * 30 * 24 * 60 * 60 * 1000;
  return Date.now() - decided > maxAgeMs;
};

export const readConsent = (): ConsentState | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (
      parsed.version !== CONSENT_VERSION ||
      typeof parsed.externalMedia !== "boolean" ||
      typeof parsed.decidedAt !== "string" ||
      isExpired(parsed.decidedAt)
    ) {
      return null;
    }
    return parsed as ConsentState;
  } catch {
    return null;
  }
};

export const saveConsent = (externalMedia: boolean): ConsentState => {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    externalMedia,
    decidedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Si el almacenamiento no está disponible, el consentimiento se pedirá de nuevo.
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
  return state;
};

/** Permite reabrir el panel de preferencias desde cualquier punto de la web. */
export const openCookiePreferences = () => {
  window.dispatchEvent(new Event(PREFERENCES_EVENT));
};

export const onPreferencesRequested = (handler: () => void) => {
  window.addEventListener(PREFERENCES_EVENT, handler);
  return () => window.removeEventListener(PREFERENCES_EVENT, handler);
};

/** Estado reactivo del consentimiento. `null` significa "aún no decidido". */
export const useConsent = () => {
  const [consent, setConsent] = useState<ConsentState | null>(() => readConsent());

  useEffect(() => {
    const handleChange = (event: Event) => {
      setConsent((event as CustomEvent<ConsentState>).detail ?? readConsent());
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_STORAGE_KEY) setConsent(readConsent());
    };

    window.addEventListener(CONSENT_EVENT, handleChange);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(CONSENT_EVENT, handleChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return consent;
};
