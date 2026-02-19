// src/hooks/useMessages.tsx
import { useContext } from 'react'
import { MessageContext } from './MessagesContext'

export const useMessages = () => useContext(MessageContext)
