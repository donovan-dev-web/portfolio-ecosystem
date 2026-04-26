import axios from 'axios'
import { storage } from '../utils/storage'

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:3000/api'
    : 'https://donovan-dev-web.vercel.app/api')

export const api = axios.create({
  baseURL: apiBaseUrl,
})

// 🔹 Interceptor pour inclure le token
api.interceptors.request.use(async (config) => {
  const user = await storage.getUser()
  if (user?.token && config.headers) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

// 🔹 Interceptor pour gérer les 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await storage.clearUser()
      window.location.href = '/'
    }
    return Promise.reject(error)
  },
)
