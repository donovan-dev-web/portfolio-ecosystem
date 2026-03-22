'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import styles from './cookieConsentManager.module.scss';
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
  CookieConsentStatus,
  isCookieConsentStatus,
} from '@/frontend/utils/cookieConsent';

export function CookieConsentManager() {
  const [consent, setConsent] = useState<CookieConsentStatus | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      const stored = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

      if (isCookieConsentStatus(stored)) {
        setConsent(stored);
        setBannerVisible(false);
        return;
      }

      setConsent(null);
      setBannerVisible(true);
    };

    syncConsent();
    window.addEventListener(COOKIE_CONSENT_EVENT, syncConsent);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, syncConsent);
    };
  }, []);

  const updateConsent = (nextConsent: CookieConsentStatus) => {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, nextConsent);
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
  };

  return (
    <>
      {consent === 'accepted' ? (
        <>
          <SpeedInsights />
          <Analytics />
        </>
      ) : null}

      {bannerVisible ? (
        <div className={styles.banner} role="dialog" aria-live="polite">
          <div className={styles.bannerContent}>
            <p className={styles.bannerTitle}>Cookies et mesure d audience</p>
            <p className={styles.bannerText}>
              Ce site peut utiliser des outils de mesure d audience Vercel pour
              analyser les performances et la frequentation. Vous pouvez accepter
              ou refuser ces traceurs. Les cookies strictement necessaires au
              fonctionnement du site restent actifs.
            </p>
            <div className={styles.bannerActions}>
              <button
                type="button"
                className={styles.rejectButton}
                onClick={() => updateConsent('rejected')}
              >
                Refuser
              </button>
              <button
                type="button"
                className={styles.acceptButton}
                onClick={() => updateConsent('accepted')}
              >
                Accepter
              </button>
              <Link href="/legal" className={styles.linkButton}>
                Mentions legales
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
