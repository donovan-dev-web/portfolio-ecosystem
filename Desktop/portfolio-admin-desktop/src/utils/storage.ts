import { type User } from '../context/Auth/AuthContext'

const USER_KEY = 'auth_user'

const EMAIL_KEY = 'auth_email'

export const storage = {
  saveUser(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  getUser(): User | null {
    const data = localStorage.getItem(USER_KEY)
    return data ? JSON.parse(data) : null
  },

  clearUser() {
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
