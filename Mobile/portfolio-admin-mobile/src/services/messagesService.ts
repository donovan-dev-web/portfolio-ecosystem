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

export const getMessages = async (
  page = 1,
  limit = 20,
): Promise<PaginatedMessages> => {
  const res = await api.get(`/messages?page=${page}&limit=${limit}`)
  return res.data
}

export const getMessageById = async (id: string): Promise<Message> => {
  const res = await api.get(`/messages/${id}`)
  return res.data
}

export const markMessageAsRead = async (id: string): Promise<Message> => {
  console.log('markAsRead called with:', id)
  const res = await api.put(`/messages/${id}`)
  return res.data
}

export const deleteMessage = async (id: string): Promise<void> => {
  await api.delete(`/messages/${id}`)
}
