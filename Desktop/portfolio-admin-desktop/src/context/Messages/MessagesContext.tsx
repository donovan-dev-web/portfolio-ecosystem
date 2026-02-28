// src/context/messageContext.tsx
import { createContext } from 'react'
import { type Message } from '../../services/messagesService'

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
  markAsRead: (id: string) => Promise<void>
  deleteMessage: (id: string) => Promise<void>

  fetchMessageById: (id: string) => Promise<Message | null> // <-- ajout ici
}

export const MessageContext = createContext<MessageContextType>({
  messages: [],
  pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
  loading: false,
  fetchMessages: async () => {},
  markAsRead: async () => {},
  deleteMessage: async () => {},
  fetchMessageById: async () => null, // <-- valeur par défaut
})
