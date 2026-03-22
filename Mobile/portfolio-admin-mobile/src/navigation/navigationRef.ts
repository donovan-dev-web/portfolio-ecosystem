import { createNavigationContainerRef } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef<any>()

export function navigateFromNotification(data: Record<string, any> = {}) {
  if (!navigationRef.isReady()) {
    return
  }

  if (data.notificationType === 'document' || data.kind === 'cv') {
    navigationRef.navigate('Documents')
    return
  }

  if (data.notificationType === 'message' && data.messageId) {
    navigationRef.navigate('Messages', {
      screen: 'MessageDetail',
      params: { id: data.messageId },
    })
    return
  }

  if (data.messageId) {
    navigationRef.navigate('Messages', {
      screen: 'MessageDetail',
      params: { id: data.messageId },
    })
  }
}
