// src/types/messageType.ts
export interface MessageType {
  _id: string
  name: string
  email: string
  phone?: string
  content: string
  read: boolean
  dateSent: string
  dateRead?: string
}
