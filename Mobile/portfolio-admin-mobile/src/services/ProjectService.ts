// src/services/projectService.ts

import { api } from './api'

export const getProjects = async () => {
  const res = await api.get('/projects')
  return res.data
}

export const getProjectById = async (id: string) => {
  const res = await api.get(`/projects/${id}`)
  return res.data
}

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

export const reorderProjects = async (
  updates: { id: string; order: number }[],
) => {
  const res = await api.put('/projects/reorder', updates)
  return res.data
}

export const deleteProject = async (id: string) => {
  const res = await api.delete(`/projects/${id}`)
  return res.data
}
