'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { FileText, FolderOpen, House, Mail } from 'lucide-react';

import styles from './bottomBar.module.scss';

type TabItem = {
  label: string;
  path: string;
  icon: ReactNode;
};

const tabs: TabItem[] = [
  { label: 'Home', path: '/', icon: <House /> },
  { label: 'Projects', path: '/projects', icon: <FolderOpen /> },
  { label: 'Messages', path: '/messages', icon: <Mail /> },
  { label: 'Documents', path: '/documents', icon: <FileText /> },
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
              >
                {isActive && <span className={styles.tabLabel}>{tab.label}</span>}
                <span className={styles.tabIcon}>{tab.icon}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
