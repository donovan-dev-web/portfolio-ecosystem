import axios from 'axios'
import { storage } from '../utils/storage'

export const api = axios.create({
  baseURL: 'https://donovan-dev-web.vercel.app/api',
  //baseURL: 'http://localhost:3000/api',
})

// 🔹 Interceptor pour inclure le token
api.interceptors.request.use((config) => {
  const user = storage.getUser()
  if (user?.token && config.headers) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

// 🔹 Interceptor pour gérer les 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.clearUser()
      window.location.href = '/'
    }
    return Promise.reject(error)
  },
)
