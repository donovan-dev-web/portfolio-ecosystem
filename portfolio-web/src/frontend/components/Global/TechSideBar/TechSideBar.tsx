'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import {
  AtSign,
  ChevronRight,
  FileText,
  FolderOpen,
  Github,
  Linkedin,
  Mail,
  Terminal,
  House,
} from 'lucide-react';

import style from './techSideBar.module.scss';

type NavItem = {
  path: string;
  label: string;
  code: string;
  icon: ReactNode;
};

type SocialItem = {
  path: string;
  label: string;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  {
    path: '/',
    label: 'Home',
    code: '01',
    icon: <House />,
  },
  {
    path: '/projects',
    label: 'Mes Projets',
    code: '02',
    icon: <FolderOpen />,
  },
  {
    path: '/messages',
    label: 'Mes Messages',
    code: '03',
    icon: <Mail />,
  },
  {
    path: '/documents',
    label: 'Mes Documents',
    code: '04',
    icon: <FileText />,
  },
];

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

export function TechSideBar() {
  const pathname = usePathname();

  return (
    <aside className={style.techSidebar}>
      <div className={style.techSidebarHeader}>
        <Terminal className={style.techSidebarHeaderIcon} />
        <span className={style.techSidebarHeaderText}>nav.tsx</span>
        <div className={style.techSidebarHeaderDots}>
          <div className={`${style.techSidebarHeaderDot} ${style.red}`} />
          <div className={`${style.techSidebarHeaderDot} ${style.yellow}`} />
          <div className={`${style.techSidebarHeaderDot} ${style.green}`} />
        </div>
      </div>

      <div className={style.techSidebarContainer}>
        <div className={style.techSidebarScanEffect} />
        <div className={style.techSidebarHoloEffect} />
        <div className={style.techSidebarDataLine} />

        <div className={style.techSidebarLogoContainer}>
          <Link href="/">
            <img src="/LogoWebDC.webp" alt="Logo portfolio" />
          </Link>
        </div>

        <div className={style.techSidebarSeparator}>
          <div className={style.techSidebarSeparatorLine} />
          <div className={`${style.techSidebarNode} ${style.node1}`} />
          <div className={`${style.techSidebarNode} ${style.node2}`} />
          <div className={`${style.techSidebarNode} ${style.node3}`} />
        </div>

        <nav className={style.techSidebarNav}>
          {navItems.map((item) => {
            const isActive =
              item.path === '/'
                ? pathname === '/' || pathname.startsWith('/home')
                : pathname === item.path || pathname.startsWith(`${item.path}/`);

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`${style.techSidebarNavItem} ${isActive ? style.active : ''}`}
              >
                <span className={style.techSidebarNavCode}>{item.code}</span>
                <div className={style.techSidebarNavIconWrapper}>{item.icon}</div>
                <div className={style.techSidebarNavLabelWrapper}>
                  <span className={style.techSidebarNavLabel}>{item.label}</span>
                  <ChevronRight className={style.techSidebarNavArrow} />
                </div>
                <div className={style.techSidebarConnectionLine} />
              </Link>
            );
          })}
        </nav>

        <div className={style.techSidebarSeparator}>
          <div className={style.techSidebarSeparatorLine} />
          <div className={`${style.techSidebarNode} ${style.node1}`} />
          <div className={`${style.techSidebarNode} ${style.node2}`} />
          <div className={`${style.techSidebarNode} ${style.node3}`} />
        </div>

        <div className={style.techSidebarSocial}>
          <ul className={style.techSidebarSocialList}>
            {socialIcons.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.techSidebarSocialLink}
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${style.techSidebarDataLine} ${style.reverse}`} />
      </div>

      <div className={style.techSidebarStatusBar}>
        <div className={style.techSidebarStatusIndicator} />
        <span className={style.techSidebarStatusText}>system.active</span>
      </div>
    </aside>
  );
}
