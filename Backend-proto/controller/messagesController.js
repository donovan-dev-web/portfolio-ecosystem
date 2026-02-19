const Message = require('../models/MessagesModels');

/* =========================
   Message Controllers
========================= */

/**
 * Créer un nouveau message
 */
exports.createMessage = async (req, res) => {
  try {
    const msg = new Message(req.body);
    await msg.save();
    res.status(201).json({ message: 'Message envoyé', data: msg });
  } catch (error) {
    res.status(400).json({ message: 'Données invalides', error });
  }
};

/**
 * Récupérer tous les messages avec pagination (protégé)
 */
exports.getAllMessages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const messages = await Message.find()
      .sort({ dateSent: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Message.countDocuments();

    res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

/**
 * Récupérer un message par ID (protégé) et mettre à jour le statut read
 */
exports.getMessageById = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message non trouvé' });

    // Mise à jour automatique du statut si jamais lu
    if (!msg.read) {
      msg.read = true;
      msg.dateRead = new Date();
      await msg.save();
    }

    res.status(200).json(msg);
  } catch (error) {
    // Si l’ID est malformé (ObjectId invalide)
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

/**
 * Mettre à jour le statut lu d’un message
 */
exports.markMessageAsRead = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message non trouvé' });

    msg.read = true;
    msg.dateRead = new Date();
    await msg.save();

    res.status(200).json({ message: 'Message marqué comme lu', data: msg });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
