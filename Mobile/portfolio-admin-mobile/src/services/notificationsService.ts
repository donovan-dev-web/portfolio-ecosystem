// src/services/notificationsService.ts
import { api } from './api'

export type RegisterPushTokenPayload = {
  token: string
  userId: string
}

/**
 * Enregistre le token push pour l'utilisateur sur le backend
 */
export const registerPushToken = async (payload: RegisterPushTokenPayload) => {
  try {
    const res = await api.post('/push-token', payload)
    console.log('Token Envoyé : ', payload);
    return res.data
  } catch (error) {
    console.error('Erreur enregistrement push token:', error)
    return null
  }
}