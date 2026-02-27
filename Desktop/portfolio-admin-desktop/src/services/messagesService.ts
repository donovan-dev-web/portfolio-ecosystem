// src/services/messagesService.ts
import { api } from './api'

export type Message = {
  _id: string
  name: string
  email: string
  phone?: string
  content: string
  read: boolean
  dateSent: string
  dateRead?: string
}

export type PaginatedMessages = {
  page: number
  limit: number
  total: number
  totalPages: number
  data: Message[]
}

/**
 * Récupérer les messages avec pagination
 * @param page numéro de page (par défaut 1)
 * @param limit nombre de messages par page (par défaut 20)
 */
export const getMessages = async (
  page = 1,
  limit = 20,
): Promise<PaginatedMessages> => {
  const res = await api.get('/messages', {
    params: { page, limit },
  })
  return res.data
}

/**
 * Récupérer un message par son ID
 */
export const getMessageById = async (id: string): Promise<Message> => {
  const res = await api.get(`/messages/${id}`)
  return res.data
}

/**
 * Marquer un message comme lu
 */

//BUG ajout contenue ou correction coté backendsuppression du body
export const markMessageAsRead = async (id: string): Promise<Message> => {
  const res = await api.put(`/messages/${id}`)
  return res.data
}
