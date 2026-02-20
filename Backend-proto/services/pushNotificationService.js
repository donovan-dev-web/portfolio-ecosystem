const admin = require('./firebaseService');
const PushToken = require('../models/PushToken');

exports.sendNotification = async (title, body, data = {}) => {
  try {
    const tokensDocs = await PushToken.find();

    if (!tokensDocs.length) {
      console.log('Aucun token enregistré');
      return;
    }

    const tokens = tokensDocs.map((doc) => doc.token);

    const message = {
      notification: {
        title,
        body,
      },

      data,

      tokens,
    };

    const response = await admin.messaging().sendEachForMulticast(message);

    console.log('Notifications envoyées:', response.successCount);

    // Supprimer tokens invalides
    if (response.failureCount > 0) {
      const tokensToRemove = [];

      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          tokensToRemove.push(tokens[idx]);
        }
      });

      await PushToken.deleteMany({
        token: { $in: tokensToRemove },
      });

      console.log('Tokens invalides supprimés:', tokensToRemove.length);
    }
  } catch (error) {
    console.error('Erreur sendNotification:', error);
  }
};
