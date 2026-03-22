export const COOKIE_CONSENT_STORAGE_KEY = 'portfolio_cookie_consent';

export type CookieConsentStatus = 'accepted' | 'rejected';

export function isCookieConsentStatus(
  value: string | null
): value is CookieConsentStatus {
  return value === 'accepted' || value === 'rejected';
}

export const COOKIE_CONSENT_EVENT = 'portfolio-cookie-consent-updated';
