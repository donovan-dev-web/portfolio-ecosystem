/**
 * MainLayouts.tsx
 * ce fichier contiens la structure du layout global
 */

import { Outlet } from 'react-router-dom'

import { Background } from '../components/Global/Background/background'
import { TechSideBar } from '../components/Global/TechSideBar/TechSideBar'

/* Global Style import */
import '@/styles/_reset.scss'
import '@/styles/main.scss'
import style from './mainLayout.module.scss'

export function MainLayout() {
  return (
    <>
      <Background />

      <div className={style.mainContent}>
        <TechSideBar />

        <main className={style.mainLayout}>
          <Outlet />
        </main>
      </div>
    </>
  )
}
