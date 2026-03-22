'use client';

import styles from './cookieConsentManager.module.scss';
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
} from '@/frontend/utils/cookieConsent';

export function CookiePreferencesButton() {
  const handleClick = () => {
    window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
  };

  return (
    <button type="button" className={styles.footerManageButton} onClick={handleClick}>
      Preferences cookies
    </button>
  );
}
