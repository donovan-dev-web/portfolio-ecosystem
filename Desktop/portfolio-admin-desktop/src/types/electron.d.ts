interface Window {
  electronAPI: {
    send: (channel: string, data: any) => void
    receive: (channel: string, func: (...args: any[]) => void) => void
    openMail: (email: string) => void
    authStorage?: {
      getUser: () => Promise<{
        id: string
        email: string
        token: string
      } | null>
      setUser: (user: {
        id: string
        email: string
        token: string
      }) => Promise<boolean>
      clearUser: () => Promise<boolean>
    }
  }
}
