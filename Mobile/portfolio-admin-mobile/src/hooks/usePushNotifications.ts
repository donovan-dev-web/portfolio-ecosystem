import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { useCallback, useEffect, useRef, useState } from 'react'

import { navigateFromNotification } from '@/navigation/navigationRef'
import { markMessageAsRead } from '@/services/messagesService'

interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken
  notification?: Notifications.Notification
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

export const usePushNotifications = (): PushNotificationState => {
  const [expoPushToken, setExpoPushToken] =
    useState<Notifications.ExpoPushToken>()

  const [notification, setNotification] =
    useState<Notifications.Notification>()

  const notificationListener =
    useRef<Notifications.EventSubscription | null>(null)

  const responseListener =
    useRef<Notifications.EventSubscription | null>(null)

  const isNavigatingRef = useRef(false)

  async function registerForPushNotificationsAsync():
    Promise<Notifications.ExpoPushToken | undefined> {
    if (!Device.isDevice) {
      console.log('Doit être testé sur un vrai téléphone')
      return
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync()

    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } =
        await Notifications.requestPermissionsAsync()

      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      console.log('Permission refusée')
      return
    }

    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId

    if (!projectId) {
      console.error('projectId manquant dans app.json')
      return
    }

    try {
      const token =
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync(
          'default',
          {
            name: 'default',
            importance:
              Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          },
        )
      }

      return token
    } catch (error) {
      console.error('Error getting push token:', error)
      return
    }
  }

  const configureNotificationCategories = useCallback(async () => {
    await Notifications.setNotificationCategoryAsync('message-actions', [
      {
        identifier: 'VIEW_MESSAGE',
        buttonTitle: 'Voir le message',
        options: {
          opensAppToForeground: true,
        },
      },
      {
        identifier: 'MARK_AS_READ',
        buttonTitle: 'Marquer comme lu',
        options: {
          opensAppToForeground: false,
        },
      },
    ])
  }, [])

  const handleNotificationResponse = useCallback(
    async (response: Notifications.NotificationResponse) => {
      if (isNavigatingRef.current) return

      const data =
        response.notification.request.content.data as Record<string, any>

      const actionIdentifier = response.actionIdentifier

      if (actionIdentifier === 'MARK_AS_READ' && data?.messageId) {
        try {
          await markMessageAsRead(data.messageId)
        } catch (error) {
          console.error(
            'Error marking message as read from notification:',
            error,
          )
        }
        return
      }

      isNavigatingRef.current = true

      try {
        navigateFromNotification(data)
      } catch (error) {
        console.error('Error handling notification tap:', error)
      } finally {
        setTimeout(() => {
          isNavigatingRef.current = false
        }, 1000)
      }
    },
    [],
  )

  useEffect(() => {
    configureNotificationCategories()

    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token)
      }
    })

    notificationListener.current =
      Notifications.addNotificationReceivedListener((incoming) => {
        setNotification(incoming)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse,
      )

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response) {
        handleNotificationResponse(response)
      }
    })

    return () => {
      notificationListener.current?.remove()
      responseListener.current?.remove()
    }
  }, [configureNotificationCategories, handleNotificationResponse])

  return {
    expoPushToken,
    notification,
  }
}
