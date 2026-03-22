import type { Metadata } from 'next';
import { AtSign, Clock, Mail, MapPin, MessageSquareMore } from 'lucide-react';

import styles from './page.module.scss';
import { Badge } from '@/frontend/components/Global/Badge/BadgeItem';
import { Footer } from '@/frontend/components/Global/Footer/Footer';
import { PrimaryButton } from '@/frontend/components/Global/Button/primaryButton/PrimaryButton';
import { SecondaryButton } from '@/frontend/components/Global/Button/secondaryButton/SecondaryButton';
import { ContactForm } from '@/frontend/components/Contact/ContactForm/ContactForm';

export const metadata: Metadata = {
  title: 'Contact - Developpeur Web en recherche de CDI',
  description:
    'Contactez Donovan Chartrain, developpeur web fullstack & mobile, pour echanger autour d un poste en CDI en agence web, agence de communication ou ESN.',
};

export default function ContactPage() {
  return (
    <>
      <section className={`${styles.sectionClass} ${styles.hero}`}>
        <Badge icons={true} content="Contact & disponibilite" />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Parlons de votre <strong>recrutement</strong> <br /> ou de votre
            besoin
          </h1>
        </div>

        <p className={styles.subTitle}>
          <strong>Developpeur Web Fullstack & Mobile</strong>, je suis
          actuellement a la recherche d un <strong>poste en CDI</strong>,
          principalement au sein d une <strong>agence web</strong>, d une
          <strong> agence de communication</strong> ou d une <strong>ESN</strong>.
          Si mon profil correspond a vos besoins, nous pouvons echanger
          rapidement autour d une opportunite.
        </p>

        <div className={styles.panelCtaHero}>
          <PrimaryButton
            icons={<MessageSquareMore />}
            content="Voir mes projets"
            NavigateTo="/projects"
          />
          <SecondaryButton
            content="Decouvrir mon expertise"
            navigateTo="/expertise"
          />
        </div>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Pourquoi me contacter ?</h2>
        <p className={styles.subTitleTwo}>
          Cette page a ete pensee avant tout pour faciliter une prise de contact
          avec des <strong>recruteurs</strong>, des <strong>responsables
          techniques</strong> ou des <strong>dirigeants d agence</strong> a la
          recherche d un developpeur capable d intervenir sur des projets web
          modernes, bien structures et soignes dans leur execution.
        </p>

        <div className={styles.reasonsGrid}>
          <article className={styles.reasonCard}>
            <h3>Profil polyvalent</h3>
            <p>
              Front-end, back-end, logique metier, interfaces responsive et
              integration produit avec une attention particuliere portee a la
              qualite percue.
            </p>
          </article>

          <article className={styles.reasonCard}>
            <h3>Bonne adequation agence</h3>
            <p>
              Un profil adapte aux environnements ou il faut allier
              developpement, autonomie, sens du design et capacite a produire
              proprement pour plusieurs clients ou produits.
            </p>
          </article>

          <article className={styles.reasonCard}>
            <h3>Recherche active en CDI</h3>
            <p>
              Disponible pour echanger autour d un poste de developpeur web au
              sein d une agence de communication, d une agence web ou d une ESN.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.sectionClass}>
        <h2 className={styles.TitleHTwo}>Informations de contact</h2>

        <div className={styles.contactInfoPanel}>
          <div className={styles.contactCards}>
            <div>
              <AtSign /> <span>Email</span>
            </div>
            <span>donovan.chartrain@gmail.com</span>
          </div>
          <div className={styles.contactCards}>
            <div>
              <MapPin /> <span>Localisation</span>
            </div>
            <span>Bedoin, Vaucluse, France</span>
          </div>
          <div className={styles.contactCards}>
            <div>
              <Clock /> <span>Disponibilite</span>
            </div>
            <span>Retour general sous 24 a 48h</span>
          </div>
        </div>
      </section>

      <section className={styles.sectionClass}>
        <div className={styles.formLayout}>
          <div className={styles.formIntroCard}>
            <div className={styles.formIntroBadge}>
              <Mail />
              <span>Prise de contact</span>
            </div>

            <h2 className={styles.formTitle}>Entrons en contact</h2>

            <p className={styles.subTitleTwo}>
              Si vous recrutez un <strong>developpeur web</strong> pour renforcer
              une equipe, faire evoluer un produit ou accompagner des projets
              clients, vous pouvez m envoyer un message directement via ce
              formulaire.
            </p>

            <ul className={styles.formHints}>
              <li>Precisez l intitule du poste ou le type d opportunite.</li>
              <li>Indiquez le contexte de l equipe, de l agence ou du projet.</li>
              <li>Ajoutez vos coordonnees pour que je puisse vous recontacter rapidement.</li>
            </ul>
          </div>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
