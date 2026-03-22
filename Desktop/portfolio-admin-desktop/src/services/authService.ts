import { api } from './api'

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', {
      email,
      password,
    })

    return response.data
  },

  async getUsers() {
    const response = await api.get('/auth/users')
    return response.data
  },

  async signup(email: string, password: string) {
    const response = await api.post('/auth/signup', { email, password })
    return response.data
  },

  async updateUser(id: string, payload: { email: string; password?: string }) {
    const response = await api.put(`/auth/users/${id}`, payload)
    return response.data
  },

  async deleteUser(id: string) {
    const response = await api.delete(`/auth/users/${id}`)
    return response.data
  },

  async changePassword(oldPassword: string, newPassword: string) {
    const response = await api.put('/auth/password', {
      oldPassword,
      newPassword,
    })
    return response.data
  },

  async getSignupStatus() {
    const response = await api.get('/auth/signup-status')
    return response.data
  },

  async updateSignupStatus(signupEnabled: boolean) {
    const response = await api.put('/auth/signup-status', { signupEnabled })
    return response.data
  },
}
