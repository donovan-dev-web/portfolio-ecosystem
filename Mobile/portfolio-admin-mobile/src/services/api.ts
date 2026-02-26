// src/services/api.ts

import axios from 'axios'
import { storage } from '@/utils/storage'

const BASE_URL = 'http://192.168.11.113:3000/api'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * 🔹 Interceptor REQUEST
 * Ajoute automatiquement le token
 */
api.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken()

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

/**
 * 🔹 Handler logout injecté dynamiquement
 */
let logoutHandler: (() => Promise<void>) | null = null

export const setLogoutHandler = (handler: () => Promise<void>) => {
  logoutHandler = handler
}

/**
 * 🔹 Interceptor RESPONSE
 * logout auto si 401
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('Token expiré → logout')

      if (logoutHandler) {
        await logoutHandler()
      }
    }

    return Promise.reject(error)
  },
)
