import { createContext } from 'react'

interface ProjectContextProps {
  projects: any[]
  technologies: any[]
  languages: any[]
  projectTypes: any[]
  loading: boolean
  reorderProjects: (newOrder: any[]) => Promise<void>
  deleteProject: (id: string, title: string) => Promise<void>
  createProject: (formData: FormData) => Promise<any>
  updateProject: (id: string, formData: FormData) => Promise<any>
}
export const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined,
)
