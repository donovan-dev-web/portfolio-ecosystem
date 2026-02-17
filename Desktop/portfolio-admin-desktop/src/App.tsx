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
import { ProjectDetail } from './pages/Project/ProjectDetail'
import { Messages } from './pages/Messages/Message'
import { MyDocuments } from './pages/Documents/MyDocuments'
import { NotFound } from './pages/NotFound/NotFound'

/* Context */
import { ProjectProvider } from './context/ProjectProvider'
import { AuthProvider } from './context/Auth/AuthProvider'
import { Outlet } from 'react-router-dom'

function ProjectProviderWrapper() {
  return (
    <ProjectProvider>
      <Outlet />
    </ProjectProvider>
  )
}

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="home/:section?" element={<Home />} />
            <Route element={<ProjectProviderWrapper />}>
              <Route path="projects/" element={<Project />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
            </Route>
            <Route path="messages/:section?" element={<Messages />} />{' '}
            <Route path="documents/:section?" element={<MyDocuments />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
