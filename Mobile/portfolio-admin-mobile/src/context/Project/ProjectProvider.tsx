// src/context/Project/ProjectProvider.tsx

import React, { useEffect, useState } from 'react'
import { ProjectContext } from './ProjectContext'

import {
  getProjects,
  getTechnologies,
  getLanguages,
  getProjectTypes,
  reorderProjects as reorderService,
} from '../../services/ProjectService'

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [projects, setProjects] = useState<any[]>([])
  const [technologies, setTechnologies] = useState<any[]>([])
  const [languages, setLanguages] = useState<any[]>([])
  const [projectTypes, setProjectTypes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  /**
   * 🔹 Load initial data
   */
  const loadData = async () => {
    try {
      setLoading(true)

      const [p, t, l, pt] = await Promise.all([
        getProjects(),
        getTechnologies(),
        getLanguages(),
        getProjectTypes(),
      ])

      setProjects(Array.isArray(p) ? p : [])
      setTechnologies(Array.isArray(t) ? t : [])
      setLanguages(Array.isArray(l) ? l : [])
      setProjectTypes(Array.isArray(pt) ? pt : [])
    } catch (error) {
      console.error('Erreur load projects:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  /**
   * 🔹 refresh manuel
   */
  const refreshProjects = async () => {
    const data = await getProjects()
    setProjects(Array.isArray(data) ? data : [])
  }

  /**
   * 🔹 reorder
   */
  const reorderProjects = async (newOrder: any[]) => {
    setProjects(newOrder)

    const payload = newOrder.map((project, index) => ({
      id: project._id,
      order: index + 1,
    }))

    try {
      await reorderService(payload)
    } catch (error) {
      console.error('Erreur reorder:', error)

      // rollback
      await refreshProjects()
    }
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        technologies,
        languages,
        projectTypes,
        loading,
        refreshProjects,
        reorderProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
