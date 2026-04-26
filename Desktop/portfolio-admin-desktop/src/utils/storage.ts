import { type User } from '../context/Auth/AuthContext'

const USER_KEY = 'auth_user'

const EMAIL_KEY = 'auth_email'

export const storage = {
  async saveUser(user: User) {
    if (window.electronAPI?.authStorage) {
      await window.electronAPI.authStorage.setUser(user)
      return
    }

    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  async getUser(): Promise<User | null> {
    if (window.electronAPI?.authStorage) {
      return window.electronAPI.authStorage.getUser()
    }

    const data = localStorage.getItem(USER_KEY)
    return data ? JSON.parse(data) : null
  },

  async clearUser() {
    if (window.electronAPI?.authStorage) {
      await window.electronAPI.authStorage.clearUser()
      return
    }

    localStorage.removeItem(USER_KEY)
  },

  saveEmail(email: string) {
    localStorage.setItem(EMAIL_KEY, email)
  },

  getEmail(): string {
    return localStorage.getItem(EMAIL_KEY) || ''
  },

  clearEmail() {
    localStorage.removeItem(EMAIL_KEY)
  },
}
