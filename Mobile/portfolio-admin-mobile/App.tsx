// App.tsx
import { useEffect, useState } from 'react'
import AppNavigator from '@/navigation/AppNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Layout from './src/components/Layout/Layout'
import { AuthProvider } from './src/context/AuthProvider'
import { ProjectProvider } from './src/context/Project/ProjectProvider'
import { MessagesProvider } from './src/context/Messages/messagesProvider'
import { usePushNotifications } from './src/hooks/usePushNotifications'
import { registerPushToken } from './src/services/notificationsService'
import { useAuth } from './src/context/useAuth'
import { storage } from './src/utils/storage'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <MessagesProvider>
          <ProjectProvider>
            <Layout>
              <PushNotificationWrapper>
                <AppNavigator />
              </PushNotificationWrapper>
            </Layout>
          </ProjectProvider>
        </MessagesProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  )
}

/**
 * Wrapper pour gérer le token push et les notifications
 */
function PushNotificationWrapper({ children }: { children: React.ReactNode }) {
  const { expoPushToken, notification } = usePushNotifications()
  const { user } = useAuth()
  const [localToken, setLocalToken] = useState<string | null>(null)

  // Charger le token au lancement de l'app
  useEffect(() => {
    const loadToken = async () => {
      if (expoPushToken?.data) {
        const tokenStr = expoPushToken.data
        setLocalToken(tokenStr)
        await storage.savePushToken(tokenStr)
        console.log('Token généré au lancement :', tokenStr)
      }
    }
    loadToken()
  }, [expoPushToken])

  // Envoyer le token au backend **à chaque connexion**
  useEffect(() => {
    const sendTokenOnLogin = async () => {
      if (!user) return

      // Lire le token depuis storage
      let tokenStr = await storage.getPushToken()
      if (!tokenStr && expoPushToken?.data) {
        tokenStr = expoPushToken.data
        await storage.savePushToken(tokenStr)
      }

      if (tokenStr) {
        console.log('Envoi du token au backend après connexion :', tokenStr)
        await registerPushToken({ token: tokenStr, userId: user.id })
      }
    }

    sendTokenOnLogin()
  }, [user, expoPushToken]) // dépend uniquement de `user` et `expoPushToken`

  // Notifications reçues
  useEffect(() => {
    if (notification) console.log('Notification reçue :', notification)
  }, [notification])

  return <>{children}</>
}
