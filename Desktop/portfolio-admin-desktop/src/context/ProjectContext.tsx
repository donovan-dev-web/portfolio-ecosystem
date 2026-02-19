import { createContext } from 'react'

interface ProjectContextProps {
  projects: any[]
  technologies: any[]
  languages: any[]
  projectTypes: any[]
  loading: boolean
  reorderProjects: (newOrder: any[]) => Promise<void>
  deleteProject: (id: string, title: string) => Promise<void>
  createProject: (projectData: any) => Promise<void>
}

export const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined,
)
