// src/services/ProjectService.ts
import { api } from './api'

// 🔹 Récupérer tous les projets
export const getProjects = async () => {
  const res = await api.get('/projects')
  return res.data
}

// 🔹 Récupérer un projet par id
export const getProjectById = async (id: string) => {
  const res = await api.get(`/projects/${id}`)
  return res.data
}

// 🔹 Récupérer les technologies, langages et types
export const getTechnologies = async () => {
  const res = await api.get('/technologies')
  return res.data
}

export const getLanguages = async () => {
  const res = await api.get('/languages')
  return res.data
}

export const getProjectTypes = async () => {
  const res = await api.get('/project-types')
  return res.data
}

// 🔹 Tags: create / update
export const createTechnology = async (payload: {
  name: string
  icon: string
}) => {
  const res = await api.post('/technologies', payload)
  return res.data
}

export const updateTechnology = async (
  id: string,
  payload: { name: string; icon: string },
) => {
  const res = await api.put(`/technologies/${id}`, payload)
  return res.data
}

export const createLanguage = async (payload: { name: string; icon: string }) => {
  const res = await api.post('/languages', payload)
  return res.data
}

export const updateLanguage = async (
  id: string,
  payload: { name: string; icon: string },
) => {
  const res = await api.put(`/languages/${id}`, payload)
  return res.data
}

export const createProjectType = async (payload: {
  name: string
  icon: string
}) => {
  const res = await api.post('/project-types', payload)
  return res.data
}

export const updateProjectType = async (
  id: string,
  payload: { name: string; icon: string },
) => {
  const res = await api.put(`/project-types/${id}`, payload)
  return res.data
}

export const deleteTechnologyTag = async (id: string) => {
  const res = await api.delete(`/technologies/${id}`)
  return res.data
}

export const deleteLanguageTag = async (id: string) => {
  const res = await api.delete(`/languages/${id}`)
  return res.data
}

export const deleteProjectTypeTag = async (id: string) => {
  const res = await api.delete(`/project-types/${id}`)
  return res.data
}

// 🔹 Reorder projects
export const reorderProjects = async (
  updates: { id: string; order: number }[],
) => {
  const res = await api.put('/projects/reorder', updates)
  return res.data
}

// 🔹 Supprimer un projet
export const deleteProject = async (id: string) => {
  const res = await api.delete(`/projects/${id}`)
  return res.data
}

// 🔹 Créer un projet avec FormData (cover + gallery)
export const createProject = async (formData: FormData) => {
  const res = await api.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

// 🔹 Mettre à jour un projet avec FormData
export const updateProject = async (id: string, formData: FormData) => {
  const res = await api.put(`/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}
