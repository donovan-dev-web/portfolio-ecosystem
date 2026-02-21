// services/pushNotificationService.js
const { Expo } = require('expo-server-sdk');
const PushToken = require('../models/PushToken');

const expo = new Expo();

exports.sendNotification = async (title, body, data = {}) => {
  try {
    const tokensDocs = await PushToken.find();

    if (!tokensDocs.length) {
      console.log('Aucun token enregistré');
      return;
    }

    // Filtrer les tokens valides
    const validTokens = [];
    tokensDocs.forEach((doc) => {
      if (Expo.isExpoPushToken(doc.token)) {
        validTokens.push(doc.token);
      } else {
        console.warn(`Token invalide détecté et ignoré: ${doc.token}`);
      }
    });

    console.log('Envoi notification avec tokens:', validTokens);
    console.log('Data envoyée:', data);

    const messages = validTokens.map((token) => ({
      to: token,
      sound: 'default',
      title,
      body,
      data,
    }));

    const chunks = expo.chunkPushNotifications(messages);
    for (const chunk of chunks) {
      const tickets = await expo.sendPushNotificationsAsync(chunk);
      console.log('Tickets envoyés:', tickets.length);

      tickets.forEach((ticket, idx) => {
        if (ticket.status === 'error') {
          console.error(
            `Erreur notification token: ${messages[idx].to}`,
            ticket.message
          );
        }
      });
    }

    console.log('Notifications envoyées !');
  } catch (error) {
    console.error('Erreur sendNotification:', error);
  }
};
