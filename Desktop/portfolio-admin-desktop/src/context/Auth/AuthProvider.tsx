import { type ReactNode, useState } from 'react'
import { AuthContext, type User } from './AuthContext'
import { authService } from '../../services/authService'
import { storage } from '../../utils/storage'

type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(() => {
    return storage.getUser()
  })

  const isAuthenticated = !!user

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password)

    const loggedUser: User = {
      id: response.id,
      email: response.email,
      token: response.token,
    }

    setUser(loggedUser)
    storage.saveUser(loggedUser)
  }

  const logout = () => {
    setUser(null)
    storage.clearUser()
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
