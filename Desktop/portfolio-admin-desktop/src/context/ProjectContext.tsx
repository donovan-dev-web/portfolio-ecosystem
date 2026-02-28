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
  createTechnology: (payload: { name: string; icon: string }) => Promise<any>
  updateTechnology: (
    id: string,
    payload: { name: string; icon: string },
  ) => Promise<any>
  createLanguage: (payload: { name: string; icon: string }) => Promise<any>
  updateLanguage: (
    id: string,
    payload: { name: string; icon: string },
  ) => Promise<any>
  createProjectType: (payload: { name: string; icon: string }) => Promise<any>
  updateProjectType: (
    id: string,
    payload: { name: string; icon: string },
  ) => Promise<any>
  deleteTechnologyTag: (id: string) => Promise<void>
  deleteLanguageTag: (id: string) => Promise<void>
  deleteProjectTypeTag: (id: string) => Promise<void>
}
export const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined,
)
