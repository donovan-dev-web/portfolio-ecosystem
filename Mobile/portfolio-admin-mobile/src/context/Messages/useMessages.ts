import { useContext } from 'react'
import { MessageContext } from '../Messages/messagesContext'

export const useMessages = () => useContext(MessageContext)
