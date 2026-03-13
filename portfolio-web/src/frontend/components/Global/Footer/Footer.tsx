import styles from './footer.module.scss';
import Link from 'next/link';
import { PrimaryButton } from '../Button/primaryButton/PrimaryButton';
import { Mail, Github, Linkedin, AtSign } from 'lucide-react';
import { ReactNode } from 'react';

export function Footer() {
  type SocialItem = {
    path: string;
    label: string;
    icon: ReactNode;
  };

  const socialIcons: SocialItem[] = [
    {
      path: 'https://github.com',
      label: 'Github',
      icon: <Github />,
    },
    {
      path: 'https://linkedin.com',
      label: 'Linkedin',
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
          <span>Rejoignez moi sur les réseaux !</span>
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
                content="Contacter moi"
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
                  <Link href={'/expertise'}>Expertise & compétence</Link>
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
                  <Link href={'/'}>Telecharger mon CV</Link>
                </li>
                <li className={styles.listItemsLink}>
                  <Link href={'/projects'}>Mentions légales</Link>
                </li>
                <li className={styles.listItemsLink}>
                  <Link href={'/expertise'}>Sitemap</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          © 2026 Donovan Chartrain — Tous droits réservés — Développeur Web
          Fullstack & Mobile
        </div>
      </div>
    </footer>
  );
}
