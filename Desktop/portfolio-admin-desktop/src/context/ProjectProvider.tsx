// src/context/ProjectProvider.tsx
import React, { useEffect, useState } from 'react'
import {
  getProjects,
  getTechnologies,
  getLanguages,
  getProjectTypes,
  reorderProjects as reorderService,
  deleteProject as deleteProjectService,
} from '../services/ProjectService'
import { ProjectContext } from './ProjectContext'
import { type Project as ProjectType } from '../types/project'
import { createProject as createProjectService } from '../services/ProjectService'
import { toast } from 'react-toastify'

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [technologies, setTechnologies] = useState<any[]>([])
  const [languages, setLanguages] = useState<any[]>([])
  const [projectTypes, setProjectTypes] = useState<any[]>([])
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
        setProjects(Array.isArray(p) ? p : [])
        setTechnologies(Array.isArray(t) ? t : [])
        setLanguages(Array.isArray(l) ? l : [])
        setProjectTypes(Array.isArray(pt) ? pt : [])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const reorderProjects = async (newProjectsOrder: ProjectType[]) => {
    if (!Array.isArray(newProjectsOrder)) return

    setProjects(newProjectsOrder)

    const payload = newProjectsOrder.map((project, index) => ({
      id: project._id,
      order: index + 1,
    }))

    try {
      await reorderService(payload)
      toast.success('Ordre des projets mis à jour !')
    } catch (error) {
      console.error('Erreur reorder:', error)
      const refreshed = await getProjects()
      setProjects(Array.isArray(refreshed) ? refreshed : [])
      toast.error('Erreur lors de la mise à jour de l’ordre')
    }
  }

  // 🔹 Nouvelle fonction pour supprimer un projet
  const deleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Voulez-vous vraiment supprimer "${title}" ?`)) return

    try {
      await deleteProjectService(id)

      // Mise à jour du state local
      const updatedProjects = projects.filter((p) => p._id !== id)
      setProjects(updatedProjects)

      toast.success(`Projet "${title}" supprimé !`)
    } catch (error) {
      console.error('Erreur suppression projet:', error)
      toast.error(`Impossible de supprimer "${title}"`)
    }
  }

  const createProject = async (newProject: ProjectType) => {
    try {
      const createdProject = await createProjectService(newProject)

      // 🔹 Mettre à jour le state local pour que le projet apparaisse immédiatement
      setProjects((prev) => [...prev, createdProject])

      toast.success(`Projet "${createdProject.title}" ajouté !`)
      return createdProject
    } catch (error) {
      console.error('Erreur création projet:', error)
      toast.error('Impossible de créer le projet')
      throw error
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
        reorderProjects,
        deleteProject,
        createProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
