import styles from './footer.module.scss';
import Link from 'next/link';
import { PrimaryButton } from '../Button/primaryButton/PrimaryButton';
import { Mail, Github, Linkedin, AtSign } from 'lucide-react';
import { ReactNode } from 'react';
import { CookiePreferencesButton } from '../CookieConsent/CookiePreferencesButton';

export function Footer() {
  type SocialItem = {
    path: string;
    label: string;
    icon: ReactNode;
  };

  const socialIcons: SocialItem[] = [
    {
      path: 'https://github.com/donovan-dev-web',
      label: 'GitHub',
      icon: <Github />,
    },
    {
      path: 'https://linkedin.com/in/donovan-chartrain-dev-web',
      label: 'LinkedIn',
      icon: <Linkedin />,
    },
    {
      path: 'mailto:donovan.chartrain@gmail.com',
      label: 'Mail',
      icon: <AtSign />,
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.bandeauRs}>
          <span>Rejoignez-moi sur les réseaux !</span>
          <div className={styles.techSidebarSocial}>
            <ul className={styles.techSidebarSocialList}>
              {socialIcons.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.techSidebarSocialLink}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.footerMainContent}>
          <div>
            <h2 className={styles.title}>
              APPLICATIONS <br />
              WEB & MOBILE
            </h2>
            <div className={styles.titleLink}>
              <PrimaryButton
                icons={<Mail />}
                content="Me contacter"
                NavigateTo="/contact"
              />
            </div>
          </div>
          <div className={styles.linkMenuContainer}>
            <div className={styles.NavigateLink}>
              <h3>Navigation</h3>
              <ul className={styles.listLink}>
                <li className={styles.listItemsLink}>
                  <Link href={'/'}>Accueil</Link>
                </li>
                <li className={styles.listItemsLink}>
                  <Link href={'/projects'}>Mes Projets</Link>
                </li>
                <li className={styles.listItemsLink}>
                  <Link href={'/expertise'}>Expertise & compétences</Link>
                </li>
                <li className={styles.listItemsLink}>
                  <Link href={'/contact'}>Me contacter</Link>
                </li>
              </ul>
            </div>
            <div className={styles.OtherLink}>
              <h3>Liens utiles</h3>
              <ul className={styles.listLink}>
                <li className={styles.listItemsLink}>
                  <a href="/api/docs" download>
                    Télécharger mon CV
                  </a>
                </li>
                <li className={styles.listItemsLink}>
                  <Link href={'/legal'}>Mentions légales</Link>
                </li>
                <li className={styles.listItemsLink}>
                  <Link href={'/sitemap.xml'}>Sitemap</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <span>
            © 2026 Donovan Chartrain — Tous droits réservés — Développeur Web
            Fullstack & Mobile
          </span>
          <CookiePreferencesButton />
        </div>
      </div>
    </footer>
  );
}
