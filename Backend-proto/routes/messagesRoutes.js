const express = require('express');
const router = express.Router();
const auth = require('../middlesware/auth');
const MessageController = require('../controller/messagesController');

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Gestion des messages de contact
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Envoyer un message depuis le formulaire
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: Message envoyé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Message envoyé"
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post('/', MessageController.createMessage);

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Récupérer tous les messages (protégé)
 *     tags: [Messages]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page pour la pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Nombre de messages par page
 *     responses:
 *       200:
 *         description: Liste des messages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 20
 *                 total:
 *                   type: integer
 *                   example: 50
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       500:
 *         description: Erreur serveur
 */
router.get('/', auth, MessageController.getAllMessages);

/**
 * @swagger
 * /messages/{id}:
 *   get:
 *     summary: Récupérer un message par ID (protégé)
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du message
 *     responses:
 *       200:
 *         description: Message trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Message non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', auth, MessageController.getMessageById);

/**
 * @swagger
 * /messages/{id}/read:
 *   put:
 *     summary: Marquer un message comme lu
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du message
 *     responses:
 *       200:
 *         description: Message marqué comme lu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Message non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id/read', auth, MessageController.markMessageAsRead);

module.exports = router;
