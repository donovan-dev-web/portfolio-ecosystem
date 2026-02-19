// src/context/Project/ProjectContext.ts

import { createContext } from 'react'

export type ProjectContextType = {
  projects: any[]
  technologies: any[]
  languages: any[]
  projectTypes: any[]
  loading: boolean
  refreshProjects: () => Promise<void>
  reorderProjects: (projects: any[]) => Promise<void>
}

export const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined,
)
