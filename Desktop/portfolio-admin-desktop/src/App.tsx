/**
 * App.tsx
 * Ce fichier est le fichier central de l'application comprenant les differentes routes,
 */

/* Import des Routes */
import { Routes, Route } from 'react-router-dom'

/* Layouts */
import { MainLayout } from './layouts/MainLayouts'

/* Pages */
import { Home } from './pages/Home/Home'
import { Project } from './pages/Project/Project'
import { Messages } from './pages/Messages/Message'
import { MyDocuments } from './pages/Documents/MyDocuments'
import { NotFound } from './pages/NotFound/NotFound'

/**
 * Wrapper pour le LogementsProvider.
 * permet d'imbriquer uniquement les routes utilisant les données du provider
 * evite d'englober l'ensemble de l'application dans le provider et fournir le context a des pages qui n'en on pas l'utilité.
 */

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="home/:section?" element={<Home />} />
          <Route path="projects/:section?" element={<Project />} />
          <Route path="messages/:section?" element={<Messages />} />{' '}
          <Route path="documents/:section?" element={<MyDocuments />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
