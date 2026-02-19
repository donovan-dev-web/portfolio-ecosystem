import React, { ReactNode, useEffect, useState } from 'react'
import { AuthContextType, User } from './AuthContext'
import { storage } from '../utils/storage'
import { authService } from '../services/authService'
import { setLogoutHandler } from '@/services/api'

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined,
)

type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const isAuthenticated = !!user

  useEffect(() => {
    setLogoutHandler(logout)
    const restoreSession = async () => {
      const token = await storage.getToken()
      const savedUser = await storage.getUser()

      if (token && savedUser) {
        setUser({ ...savedUser, token })
      }

      setLoading(false)
    }

    restoreSession()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password)

    const loggedUser: User = {
      id: response.id,
      email: response.email,
      token: response.token,
    }

    setUser(loggedUser)

    // 🔐 stockage sécurisé
    await storage.saveToken(loggedUser.token)
    await storage.saveUser({
      id: loggedUser.id,
      email: loggedUser.email,
    })
  }

  const logout = async () => {
    setUser(null)
    await storage.clearToken()
    await storage.clearUser()
  }

  if (loading) return null // ou SplashScreen

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
