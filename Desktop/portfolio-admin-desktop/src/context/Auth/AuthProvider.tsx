import { type ReactNode, useEffect, useState } from 'react'
import { AuthContext, type User } from './AuthContext'
import { authService } from '../../services/authService'
import { storage } from '../../utils/storage'

type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let isMounted = true

    const hydrateUser = async () => {
      const storedUser = await storage.getUser()

      if (isMounted) {
        setUser(storedUser)
      }
    }

    hydrateUser()

    return () => {
      isMounted = false
    }
  }, [])

  const isAuthenticated = !!user

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password)

    const loggedUser: User = {
      id: response.userId,
      email: response.email,
      token: response.token,
    }

    setUser(loggedUser)
    await storage.saveUser(loggedUser)
  }

  const logout = async () => {
    setUser(null)
    await storage.clearUser()
  }

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
