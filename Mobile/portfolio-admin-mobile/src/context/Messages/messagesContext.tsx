import React, { createContext } from 'react'
import { Message, PaginatedMessages } from '../../services/messagesService'

export type MessageContextType = {
  messages: Message[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  loading: boolean
  fetchMessages: (page?: number) => Promise<void>
  fetchMessageById: (id: string) => Promise<Message>
  markAsRead: (id: string) => Promise<void>
}

export const MessageContext = createContext<MessageContextType>({
  messages: [],
  pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
  loading: false,
  fetchMessages: async (): Promise<void> => {
    /* rien à retourner */
  },
  fetchMessageById: async (): Promise<Message> => {
    throw new Error('fetchMessageById not implemented')
  },
  markAsRead: async () => {},
})
