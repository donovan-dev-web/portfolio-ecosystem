import React, { useState, useCallback } from 'react'
import { MessageContext } from './messagesContext'
import {
  getMessages,
  getMessageById,
  markMessageAsRead,
  Message,
  deleteMessage as deleteMessageService,
} from '../../services/messagesService'

type Props = { children: React.ReactNode }

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
        setMessages((prev) =>
          page === 1 ? data.data : [...prev, ...data.data],
        ) // scroll infini
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

  const fetchMessageById = useCallback(async (id: string) => {
    const msg = await getMessageById(id)
    return msg
  }, [])

  const markAsRead = useCallback(async (id: string) => {
    try {
      const updated = await markMessageAsRead(id)
      setMessages((prev) => prev.map((msg) => (msg._id === id ? updated : msg)))
    } catch (error) {
      console.error('Erreur markAsRead:', error)
    }
  }, [])

  const deleteMessage = useCallback(async (id: string) => {
    try {
      await deleteMessageService(id)
      setMessages((prev) => prev.filter((msg) => msg._id !== id))
      setPagination((prev) => ({
        ...prev,
        total: Math.max(0, prev.total - 1),
      }))
    } catch (error) {
      console.error('Erreur deleteMessage:', error)
    }
  }, [])

  return (
    <MessageContext.Provider
      value={{
        messages,
        pagination,
        loading,
        fetchMessages,
        fetchMessageById,
        markAsRead,
        deleteMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}
