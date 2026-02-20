const express = require('express');
const router = express.Router();
const savePushToken = require('../controller/configController');

/**
 * @swagger
 * /push-token:
 *   post:
 *     summary: Enregistrer un token de notification push
 *     tags: [Configuration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Le token de notification push à enregistrer
 *     responses:
 *       200:
 *         description: Token enregistré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indique si l'enregistrement a réussi
 */

router.post('/', savePushToken.savePushToken);

module.exports = router;
