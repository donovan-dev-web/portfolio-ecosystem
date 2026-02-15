import React from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import style from './techSideBar.module.scss'
import { Home, Mail, AtSign, FolderOpen, Github, Linkedin } from 'lucide-react'

import Logo from '@/assets/LogoWebDC.webp'

const navItems = [
  {
    path: '/',
    label: 'Home',
    code: '01',
    icon: <Home />,
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
    icon: <Mail />,
  },
]

const SocialIcons = [
  {
    path: 'https://github.com',
    label: 'Github',
    icon: <Github />,
  },
  {
    path: 'https://linckedin.com',
    label: 'Linckedin',
    icon: <Linkedin />,
  },
  {
    path: 'mailto: donovan.chartrain@gmail.com',
    label: 'Mail',
    icon: <AtSign />,
  },
]

export const TechSideBar: React.FC = () => {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <aside className={style.techSidebar}>
      {/* Terminal Header */}
      <div className={style.techSidebarHeader}>
        <svg
          className={style.techSidebarHeaderIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" x2="20" y1="19" y2="19"></line>
        </svg>
        <span className={style.techSidebarHeaderText}>nav.tsx</span>
        <div className={style.techSidebarHeaderDots}>
          <div className={`${style.techSidebarHeaderDot} ${style.red}`}></div>
          <div
            className={`${style.techSidebarHeaderDot} ${style.yellow}`}
          ></div>
          <div className={`${style.techSidebarHeaderDot} ${style.green}`}></div>
        </div>
      </div>

      {/* Main Container */}
      <div className={style.techSidebarContainer}>
        <div className={style.techSidebarScanEffect}></div>
        <div className={style.techSidebarHoloEffect}></div>
        <div className={style.techSidebarDataLine}></div>

        {/* Logo Wrapper */}
        <div className={style.techSidebarLogoContainer}>
          <Link to={'/'}>
            <img src={Logo} alt="" />
          </Link>
        </div>

        {/* Separator */}
        <div className={style.techSidebarSeparator}>
          <div className={style.techSidebarSeparatorLine}></div>
          <div className={`${style.techSidebarNode} ${style.node1}`}></div>
          <div className={`${style.techSidebarNode} ${style.node2}`}></div>
          <div className={`${style.techSidebarNode} ${style.node3}`}></div>
        </div>

        {/* Navigation */}
        <nav className={style.techSidebarNav}>
          {navItems.map((item) => {
            const isActive =
              item.path === '/'
                ? pathname === '/' || pathname.startsWith('/home')
                : pathname === item.path || pathname.startsWith(`${item.path}/`)

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={() =>
                  `${style.techSidebarNavItem} ${isActive ? style.active : ''}`
                }
              >
                <span className={style.techSidebarNavCode}>{item.code}</span>
                <div className={style.techSidebarNavIconWrapper}>
                  {item.icon}
                </div>
                <div className={style.techSidebarNavLabelWrapper}>
                  <span className={style.techSidebarNavLabel}>
                    {item.label}
                  </span>
                  <svg
                    className={style.techSidebarNavArrow}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </div>
                <div className={style.techSidebarConnectionLine}></div>
              </NavLink>
            )
          })}
        </nav>

        {/* Separator */}
        <div className={style.techSidebarSeparator}>
          <div className={style.techSidebarSeparatorLine}></div>
          <div className={`${style.techSidebarNode} ${style.node1}`}></div>
          <div className={`${style.techSidebarNode} ${style.node2}`}></div>
          <div className={`${style.techSidebarNode} ${style.node3}`}></div>
        </div>

        {/* Social Links */}
        <div className={style.techSidebarSocial}>
          <ul className={style.techSidebarSocialList}>
            {SocialIcons.map((items) => (
              <li key={items.path}>
                <a
                  href={items.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.techSidebarSocialLink}
                  aria-label={items.label}
                >
                  {items.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${style.techSidebarDataLine} ${style.reverse}`}></div>
      </div>

      {/* Status Bar */}
      <div className={style.techSidebarStatusBar}>
        <div className={style.techSidebarStatusIndicator}></div>
        <span className={style.techSidebarStatusText}>system.active</span>
      </div>
    </aside>
  )
}
