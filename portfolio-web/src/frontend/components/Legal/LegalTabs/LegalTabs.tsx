'use client';

import { useState } from 'react';
import { FileText, ShieldCheck } from 'lucide-react';

import styles from './legalTabs.module.scss';
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
} from '@/frontend/utils/cookieConsent';

type TabKey = 'legal' | 'privacy';

export function LegalTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>('legal');

  const reopenCookieBanner = () => {
    window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
  };

  return (
    <div className={styles.tabsShell}>
      <div className={styles.tabsHeader}>
        <button
          type="button"
          className={activeTab === 'legal' ? styles.tabActive : styles.tabButton}
          onClick={() => setActiveTab('legal')}
          aria-pressed={activeTab === 'legal'}
        >
          <FileText />
          Mentions légales
        </button>
        <button
          type="button"
          className={activeTab === 'privacy' ? styles.tabActive : styles.tabButton}
          onClick={() => setActiveTab('privacy')}
          aria-pressed={activeTab === 'privacy'}
        >
          <ShieldCheck />
          Politique de confidentialité
        </button>
      </div>

      {activeTab === 'legal' ? (
        <div className={styles.legalTextFlow}>
          <section className={styles.textSection}>
            <h3>Éditeur du site</h3>
            <p>
              Le présent site est édité par <strong>CHARTRAIN Donovan</strong>,
              particulier, joignable à l’adresse email
              <strong> donovan.chartrain@gmail.com</strong>.
            </p>
            <p>
              Adresse postale :
              <br />
              4150 route de Flassan
              <br />
              84410 Bédoin
              <br />
              Vaucluse, France
            </p>
          </section>

          <section className={styles.textSection}>
            <h3>Hébergement et services techniques</h3>
            <p>
              Le site est hébergé par <strong>Vercel</strong>. Les fichiers et
              documents peuvent être diffusés via <strong>Vercel Blob</strong>.
              Les données applicatives sont stockées sur <strong>MongoDB</strong>
              et le code source est versionné sur <strong>GitHub</strong>.
            </p>
          </section>

          <section className={styles.textSection}>
            <h3>Propriété intellectuelle</h3>
            <p>
              Les contenus, textes, visuels, interfaces, éléments graphiques et
              réalisations présentés sur ce portfolio sont, sauf mention
              contraire, la propriété de CHARTRAIN Donovan. Toute reproduction,
              représentation, adaptation ou réutilisation, totale ou partielle,
              sans autorisation préalable, est interdite.
            </p>
          </section>
        </div>
      ) : (
        <div className={styles.legalTextFlow}>
          <section className={styles.textSection}>
            <h3>Données collectées</h3>
            <p>
              Le formulaire de contact collecte uniquement les données
              volontairement renseignées par l’utilisateur : nom, adresse
              email, numéro de téléphone facultatif et contenu du message.
            </p>
          </section>

          <section className={styles.textSection}>
            <h3>Finalités du traitement</h3>
            <p>
              Ces données sont traitées en priorité pour permettre les prises de
              contact liées au <strong>recrutement</strong>, aux opportunités
              professionnelles et aux échanges en lien avec le profil de
              développeur web présenté sur ce portfolio. Elles peuvent aussi
              être utilisées pour répondre à des demandes de collaboration
              ponctuelles, notamment autour de projets techniques ou open source.
            </p>
          </section>

          <section className={styles.textSection}>
            <h3>Base légale et destinataire</h3>
            <p>
              Le traitement repose sur l’envoi volontaire du formulaire et sur
              votre accord aux mentions légales relatives à cette prise de
              contact. Les données sont destinées uniquement à
              <strong> CHARTRAIN Donovan</strong>.
            </p>
          </section>

          <section className={styles.textSection}>
            <h3>Durée de conservation</h3>
            <p>
              Les messages sont conservés pendant une durée maximale de
              <strong> 12 mois après le dernier échange</strong>, sauf obligation
              légale particulière ou nécessité de conservation plus courte à la
              demande de la personne concernée.
            </p>
          </section>

          <section className={styles.textSection}>
            <h3>Cookies et mesure d’audience</h3>
            <p>
              Le site peut utiliser <strong>Vercel Analytics</strong> et
              <strong> Vercel Speed Insights</strong> pour mesurer la
              fréquentation et les performances. Ces outils ne sont activés
              qu’après votre accord via la bannière de consentement.
            </p>
            <button
              type="button"
              className={styles.inlineAction}
              onClick={reopenCookieBanner}
            >
              Gérer mes préférences cookies
            </button>
          </section>

          <section className={styles.textSection}>
            <h3>Vos droits</h3>
            <p>
              Conformément à la réglementation applicable, vous pouvez demander
              l’accès, la rectification ou la suppression de vos données en
              écrivant à <strong>donovan.chartrain@gmail.com</strong>.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
