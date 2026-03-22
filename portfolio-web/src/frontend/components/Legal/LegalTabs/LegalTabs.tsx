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
          Mentions legales
        </button>
        <button
          type="button"
          className={activeTab === 'privacy' ? styles.tabActive : styles.tabButton}
          onClick={() => setActiveTab('privacy')}
          aria-pressed={activeTab === 'privacy'}
        >
          <ShieldCheck />
          Politique de confidentialite
        </button>
      </div>

      {activeTab === 'legal' ? (
        <div className={styles.legalTextFlow}>
          <section className={styles.textSection}>
            <h3>Editeur du site</h3>
            <p>
              Le present site est edite par <strong>CHARTRAIN Donovan</strong>,
              particulier, joignable a l adresse email
              <strong> donovan.chartrain@gmail.com</strong>.
            </p>
            <p>
              Adresse postale :
              <br />
              4150 route de Flassan
              <br />
              84410 Bedoin
              <br />
              Vaucluse, France
            </p>
          </section>

          <section className={styles.textSection}>
            <h3>Hebergement et services techniques</h3>
            <p>
              Le site est heberge par <strong>Vercel</strong>. Les fichiers et
              documents peuvent etre diffuses via <strong>Vercel Blob</strong>.
              Les donnees applicatives sont stockees sur <strong>MongoDB</strong>
              et le code source est versionne sur <strong>GitHub</strong>.
            </p>
          </section>

          <section className={styles.textSection}>
            <h3>Propriete intellectuelle</h3>
            <p>
              Les contenus, textes, visuels, interfaces, elements graphiques et
              realisations presentes sur ce portfolio sont, sauf mention
              contraire, la propriete de CHARTRAIN Donovan. Toute reproduction,
              representation, adaptation ou reutilisation, totale ou partielle,
              sans autorisation prealable, est interdite.
            </p>
          </section>
        </div>
      ) : (
        <div className={styles.legalTextFlow}>
          <section className={styles.textSection}>
            <h3>Donnees collectees</h3>
            <p>
              Le formulaire de contact collecte uniquement les donnees
              volontairement renseignees par l utilisateur : nom, adresse
              email, numero de telephone facultatif et contenu du message.
            </p>
          </section>

          <section className={styles.textSection}>
            <h3>Finalites du traitement</h3>
            <p>
              Ces donnees sont traitees en priorite pour permettre les prises de
              contact liees au <strong>recrutement</strong>, aux opportunites
              professionnelles et aux echanges en lien avec le profil de
              developpeur web presente sur ce portfolio. Elles peuvent aussi
              etre utilisees pour repondre a des demandes de collaboration
              ponctuelles, notamment autour de projets techniques ou open source.
            </p>
          </section>

          <section className={styles.textSection}>
            <h3>Base legale et destinataire</h3>
            <p>
              Le traitement repose sur l envoi volontaire du formulaire et sur
              votre accord aux mentions legales relatives a cette prise de
              contact. Les donnees sont destinees uniquement a
              <strong> CHARTRAIN Donovan</strong>.
            </p>
          </section>

          <section className={styles.textSection}>
            <h3>Duree de conservation</h3>
            <p>
              Les messages sont conserves pendant une duree maximale de
              <strong> 12 mois apres le dernier echange</strong>, sauf obligation
              legale particuliere ou necessite de conservation plus courte a la
              demande de la personne concernee.
            </p>
          </section>

          <section className={styles.textSection}>
            <h3>Cookies et mesure d audience</h3>
            <p>
              Le site peut utiliser <strong>Vercel Analytics</strong> et
              <strong> Vercel Speed Insights</strong> pour mesurer la
              frequentation et les performances. Ces outils ne sont actives
              qu apres votre accord via la banniere de consentement.
            </p>
            <button
              type="button"
              className={styles.inlineAction}
              onClick={reopenCookieBanner}
            >
              Gerer mes preferences cookies
            </button>
          </section>

          <section className={styles.textSection}>
            <h3>Vos droits</h3>
            <p>
              Conformement a la reglementation applicable, vous pouvez demander
              l acces, la rectification ou la suppression de vos donnees en
              ecrivant a <strong>donovan.chartrain@gmail.com</strong>.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
