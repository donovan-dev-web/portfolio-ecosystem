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
import MessageDetail from './pages/Messages/MessageDetail'
import { MyDocuments } from './pages/Documents/MyDocuments'
import { NotFound } from './pages/NotFound/NotFound'

/* Context */
import { ProjectProvider } from './context/ProjectProvider'
import { AuthProvider } from './context/Auth/AuthProvider'
import { MessagesProvider } from './context/Messages/MessagesProvider'
import { Outlet } from 'react-router-dom'

function ProjectProviderWrapper() {
  return (
    <ProjectProvider>
      <Outlet />
    </ProjectProvider>
  )
}

function MessagesProviderWrapper() {
  return (
    <MessagesProvider>
      <Outlet />
    </MessagesProvider>
  )
}

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route element={<ProjectProviderWrapper />}>
              <Route path="projects/" element={<Project />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
            </Route>
            <Route element={<MessagesProviderWrapper />}>
              <Route path="messages/" element={<Messages />} />
              <Route path="messages/:id" element={<MessageDetail />} />
            </Route>
            <Route path="documents" element={<MyDocuments />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
