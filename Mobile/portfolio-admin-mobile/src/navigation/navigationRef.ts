import { createNavigationContainerRef } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef<any>()

function navigateToMessageDetail(messageId: string) {
  if (!navigationRef.isReady()) {
    return
  }

  navigationRef.navigate('Messages', {
    screen: 'MessagesList',
  })

  setTimeout(() => {
    if (!navigationRef.isReady()) {
      return
    }

    navigationRef.navigate('Messages', {
      screen: 'MessageDetail',
      params: { id: messageId },
    })
  }, 50)
}

export function navigateFromNotification(data: Record<string, any> = {}) {
  if (!navigationRef.isReady()) {
    return
  }

  if (data.notificationType === 'document' || data.kind === 'cv') {
    navigationRef.navigate('Documents')
    return
  }

  if (data.notificationType === 'message' && data.messageId) {
    navigateToMessageDetail(data.messageId)
    return
  }

  if (data.messageId) {
    navigateToMessageDetail(data.messageId)
  }
}
