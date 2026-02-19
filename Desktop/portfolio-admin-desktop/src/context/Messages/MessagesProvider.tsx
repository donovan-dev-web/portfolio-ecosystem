// src/context/messagesProvider.tsx
import React, { useState, useCallback } from 'react'
import { MessageContext } from './MessagesContext'
import {
  getMessages,
  getMessageById,
  markMessageAsRead,
  type Message,
} from '../../services/messagesService'

type Props = {
  children: React.ReactNode
}

export const MessagesProvider: React.FC<Props> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(false)

  const fetchMessages = useCallback(
    async (page = 1) => {
      setLoading(true)
      try {
        const data = await getMessages(page, pagination.limit)
        setMessages(data.data)
        setPagination({
          page: data.page,
          limit: data.limit,
          total: data.total,
          totalPages: data.totalPages,
        })
      } catch (error) {
        console.error('Erreur fetchMessages:', error)
      } finally {
        setLoading(false)
      }
    },
    [pagination.limit],
  )

  const markAsRead = useCallback(async (id: string) => {
    try {
      const updated = await markMessageAsRead(id)
      // Met à jour le message dans le state pour rafraîchir la liste
      setMessages((prev) => prev.map((msg) => (msg._id === id ? updated : msg)))
    } catch (error) {
      console.error('Erreur markAsRead:', error)
    }
  }, [])

  const fetchMessageById = useCallback(
    async (id: string): Promise<Message | null> => {
      try {
        const msg = await getMessageById(id)
        return msg
      } catch (error) {
        console.error('Erreur fetchMessageById:', error)
        return null
      }
    },
    [],
  )

  return (
    <MessageContext.Provider
      value={{
        messages,
        pagination,
        loading,
        fetchMessages,
        markAsRead,
        fetchMessageById,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}
