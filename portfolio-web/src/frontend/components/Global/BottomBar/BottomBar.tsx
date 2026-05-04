'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { IdCard, FolderOpen, House, Mail } from 'lucide-react';

import { ThemeToggle } from '@/frontend/components/Global/ThemeToggle/ThemeToggle';

import styles from './bottomBar.module.scss';

type TabItem = {
  label: string;
  path: string;
  icon: ReactNode;
};

const tabs: TabItem[] = [
  { label: 'Accueil', path: '/', icon: <House /> },
  { label: 'Projets', path: '/projects', icon: <FolderOpen /> },
  { label: 'Expertise', path: '/expertise', icon: <IdCard /> },
  { label: 'Contact', path: '/contact', icon: <Mail /> },
];

export function BottomBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.bottomBar} aria-label="Bottom navigation">
      <ul className={styles.tabList}>
        {tabs.map((tab) => {
          const isActive =
            tab.path === '/'
              ? pathname === '/' || pathname.startsWith('/home')
              : pathname === tab.path || pathname.startsWith(`${tab.path}/`);

          return (
            <li key={tab.path} className={styles.tabItem}>
              <Link
                href={tab.path}
                className={`${styles.tabLink} ${isActive ? styles.active : ''}`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={tab.label}
              >
                <span className={styles.tabLabel}>{tab.label}</span>
                <span className={styles.tabIcon}>{tab.icon}</span>
                <span className={styles.tabLabelBottom}>{tab.label}</span>
              </Link>
            </li>
          );
        })}
        <li className={styles.tabItem}>
          <ThemeToggle variant="mobile" />
        </li>
      </ul>
    </nav>
  );
}
