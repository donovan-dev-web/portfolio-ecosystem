export type User = {
  id: string
  email: string
  token: string
}

export type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}
