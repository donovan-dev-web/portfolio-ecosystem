// src/context/ProjectContext.tsx
import { createContext } from 'react'

interface ProjectContextProps {
  projects: any[]
  technologies: any[]
  languages: any[]
  projectTypes: any[]
  loading: boolean
}

export const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined,
)
