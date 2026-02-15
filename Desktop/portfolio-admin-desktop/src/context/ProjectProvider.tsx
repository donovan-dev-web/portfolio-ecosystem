import React, { useEffect, useState } from 'react'
import {
  getProjects,
  getTechnologies,
  getLanguages,
  getProjectTypes,
} from '../services/ProjectService'
import { ProjectContext } from './ProjectContext'

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState([])
  const [technologies, setTechnologies] = useState([])
  const [languages, setLanguages] = useState([])
  const [projectTypes, setProjectTypes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, t, l, pt] = await Promise.all([
          getProjects(),
          getTechnologies(),
          getLanguages(),
          getProjectTypes(),
        ])
        setProjects(p)
        setTechnologies(t)
        setLanguages(l)
        setProjectTypes(pt)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <ProjectContext.Provider
      value={{ projects, technologies, languages, projectTypes, loading }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
