import { Expo } from 'expo-server-sdk';
import { PushTokenServices } from '../push-token/pushToken.services';

const expo = new Expo();

export const PushNotificationService = {
  async sendNotification(
    title: string,
    body: string,
    data: Record<string, any> = {},
    options: { categoryId?: string } = {}
  ) {
    const tokensDocs = await PushTokenServices.getAllTokens();

    if (!tokensDocs.length) return;

    const validTokens: string[] = [];

    tokensDocs.forEach((doc: any) => {
      if (Expo.isExpoPushToken(doc.token)) {
        validTokens.push(doc.token);
      }
    });

    if (!validTokens.length) return;

    const messages = validTokens.map((token) => ({
      to: token,
      sound: 'default',
      title,
      body,
      data,
      ...(options.categoryId ? { categoryId: options.categoryId } : {}),
    }));

    const chunks = expo.chunkPushNotifications(messages);

    for (const chunk of chunks) {
      await expo.sendPushNotificationsAsync(chunk);
    }
  },
};
