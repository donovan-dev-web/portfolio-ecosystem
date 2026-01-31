/**
 * MainLayouts.tsx
 * ce fichier contiens la structure du layout global
 */

import { Outlet } from 'react-router-dom'

import { NavBar } from '../components/NavBar'

/* Global Style import */
import '../styles/_reset.scss'
import '../styles/main.scss'

export function MainLayout() {
  return (
    <>
      <NavBar />
      <main className="main-layout">
        <Outlet />
      </main>
    </>
  )
}
