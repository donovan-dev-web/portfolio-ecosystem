const PushToken = require('../models/PushToken');

exports.savePushToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token requis',
      });
    }

    const existing = await PushToken.findOne({ token });

    if (existing) {
      existing.lastUsedAt = new Date();
      await existing.save();
    } else {
      await PushToken.create({
        token,
        device: 'android',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Token enregistré',
    });
  } catch (error) {
    console.error('Erreur savePushToken:', error);

    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
    });
  }
};
