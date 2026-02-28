// src/context/ProjectProvider.tsx
import React, { useEffect, useState } from 'react'
import {
  getProjects,
  getTechnologies,
  getLanguages,
  getProjectTypes,
  reorderProjects as reorderService,
  deleteProject as deleteProjectService,
  createTechnology as createTechnologyService,
  updateTechnology as updateTechnologyService,
  createLanguage as createLanguageService,
  updateLanguage as updateLanguageService,
  createProjectType as createProjectTypeService,
  updateProjectType as updateProjectTypeService,
  deleteTechnologyTag as deleteTechnologyTagService,
  deleteLanguageTag as deleteLanguageTagService,
  deleteProjectTypeTag as deleteProjectTypeTagService,
} from '../services/ProjectService'
import { ProjectContext } from './ProjectContext'
import { type Project as ProjectType } from '../types/project'
import {
  createProject as createProjectService,
  updateProject as updateProjectService,
} from '../services/ProjectService'
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

  const createProject = async (formData: FormData) => {
    try {
      const createdProject = await createProjectService(formData) // formData au lieu de JSON

      // 🔹 Mise à jour du state local
      setProjects((prev) => [...prev, createdProject])

      toast.success(`Projet "${createdProject.title}" ajouté !`)
      return createdProject
    } catch (error) {
      console.error('Erreur création projet:', error)
      toast.error('Impossible de créer le projet')
      throw error
    }
  }

  const updateProject = async (id: string, formData: FormData) => {
    try {
      const updated = await updateProjectService(id, formData)
      setProjects((prev) => prev.map((p) => (p._id === id ? updated : p)))
      toast.success(`Projet "${updated.title}" mis à jour !`)
      return updated
    } catch (error) {
      console.error('Erreur mise à jour projet:', error)
      toast.error('Impossible de mettre à jour le projet')
      throw error
    }
  }

  const createTechnology = async (payload: { name: string; icon: string }) => {
    try {
      const created = await createTechnologyService(payload)
      setTechnologies((prev) => [...prev, created])
      toast.success(`Technologie "${created.name}" ajoutée !`)
      return created
    } catch (error) {
      console.error('Erreur création technologie:', error)
      toast.error('Impossible de créer la technologie')
      throw error
    }
  }

  const updateTechnology = async (
    id: string,
    payload: { name: string; icon: string },
  ) => {
    try {
      const updated = await updateTechnologyService(id, payload)
      setTechnologies((prev) => prev.map((t) => (t._id === id ? updated : t)))
      toast.success(`Technologie "${updated.name}" renommée !`)
      return updated
    } catch (error) {
      console.error('Erreur MAJ technologie:', error)
      toast.error('Impossible de renommer la technologie')
      throw error
    }
  }

  const createLanguage = async (payload: { name: string; icon: string }) => {
    try {
      const created = await createLanguageService(payload)
      setLanguages((prev) => [...prev, created])
      toast.success(`Langage "${created.name}" ajouté !`)
      return created
    } catch (error) {
      console.error('Erreur création langage:', error)
      toast.error('Impossible de créer le langage')
      throw error
    }
  }

  const updateLanguage = async (
    id: string,
    payload: { name: string; icon: string },
  ) => {
    try {
      const updated = await updateLanguageService(id, payload)
      setLanguages((prev) => prev.map((l) => (l._id === id ? updated : l)))
      toast.success(`Langage "${updated.name}" renommé !`)
      return updated
    } catch (error) {
      console.error('Erreur MAJ langage:', error)
      toast.error('Impossible de renommer le langage')
      throw error
    }
  }

  const createProjectType = async (payload: { name: string; icon: string }) => {
    try {
      const created = await createProjectTypeService(payload)
      setProjectTypes((prev) => [...prev, created])
      toast.success(`Type "${created.name}" ajouté !`)
      return created
    } catch (error) {
      console.error('Erreur création type:', error)
      toast.error('Impossible de créer le type de projet')
      throw error
    }
  }

  const updateProjectType = async (
    id: string,
    payload: { name: string; icon: string },
  ) => {
    try {
      const updated = await updateProjectTypeService(id, payload)
      setProjectTypes((prev) => prev.map((pt) => (pt._id === id ? updated : pt)))
      toast.success(`Type "${updated.name}" renommé !`)
      return updated
    } catch (error) {
      console.error('Erreur MAJ type:', error)
      toast.error('Impossible de renommer le type de projet')
      throw error
    }
  }

  const deleteTechnologyTag = async (id: string) => {
    try {
      await deleteTechnologyTagService(id)
      setTechnologies((prev) => prev.filter((t) => t._id !== id))
      toast.success('Technologie supprimée !')
    } catch (error) {
      console.error('Erreur suppression technologie:', error)
      toast.error('Impossible de supprimer la technologie')
      throw error
    }
  }

  const deleteLanguageTag = async (id: string) => {
    try {
      await deleteLanguageTagService(id)
      setLanguages((prev) => prev.filter((l) => l._id !== id))
      toast.success('Langage supprimé !')
    } catch (error) {
      console.error('Erreur suppression langage:', error)
      toast.error('Impossible de supprimer le langage')
      throw error
    }
  }

  const deleteProjectTypeTag = async (id: string) => {
    try {
      await deleteProjectTypeTagService(id)
      setProjectTypes((prev) => prev.filter((pt) => pt._id !== id))
      toast.success('Type de projet supprimé !')
    } catch (error) {
      console.error('Erreur suppression type de projet:', error)
      toast.error('Impossible de supprimer le type de projet')
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
        updateProject,
        createTechnology,
        updateTechnology,
        createLanguage,
        updateLanguage,
        createProjectType,
        updateProjectType,
        deleteTechnologyTag,
        deleteLanguageTag,
        deleteProjectTypeTag,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
