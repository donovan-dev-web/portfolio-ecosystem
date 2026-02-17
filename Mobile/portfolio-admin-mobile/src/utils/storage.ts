import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import { User } from '../context/AuthContext'

const USER_KEY = 'auth_user'
const EMAIL_KEY = 'auth_email'
const TOKEN_KEY = 'auth_token'

export const storage = {
  // 🔐 Token sécurisé
  async saveToken(token: string) {
    await SecureStore.setItemAsync(TOKEN_KEY, token)
  },

  async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(TOKEN_KEY)
  },

  async clearToken() {
    await SecureStore.deleteItemAsync(TOKEN_KEY)
  },

  // 👤 Infos utilisateur (non sensibles)
  async saveUser(user: Omit<User, 'token'>) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  async getUser(): Promise<Omit<User, 'token'> | null> {
    const data = await AsyncStorage.getItem(USER_KEY)
    return data ? JSON.parse(data) : null
  },

  async clearUser() {
    await AsyncStorage.removeItem(USER_KEY)
  },

  // 📧 Remember email
  async saveEmail(email: string) {
    await AsyncStorage.setItem(EMAIL_KEY, email)
  },

  async getEmail(): Promise<string> {
    return (await AsyncStorage.getItem(EMAIL_KEY)) || ''
  },

  async clearEmail() {
    await AsyncStorage.removeItem(EMAIL_KEY)
  },
}
