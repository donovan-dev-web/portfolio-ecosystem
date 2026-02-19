const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');
const auth = require('../middlesware/auth');

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API pour gérer les projets du portfolio
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Récupérer tous les projets
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Liste des projets
 */
router.get('/', projectController.getAllProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Récupérer un projet par ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du projet
 *     responses:
 *       200:
 *         description: Projet récupéré
 *       404:
 *         description: Projet non trouvé
 */
router.get('/:id', projectController.getProjectById);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Créer un nouveau projet
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Projet créé
 *       400:
 *         description: Données invalides
 */
router.post('/', auth, projectController.createProject);

/**
 * * @swagger
 * /projects/reorder:
 *   put:
 *     summary: Réorganiser les projets
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID du projet
 *                 order:
 *                   type: integer
 *                   description: Nouvelle position du projet
 *     responses:
 *       200:
 *         description: Projets réorganisés
 *       400:
 *         description: Format invalide
 */

router.put('/reorder', auth, projectController.reorderProjects);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Mettre à jour un projet existant
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du projet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Projet mis à jour
 *       404:
 *         description: Projet non trouvé
 */
router.put('/:id', auth, projectController.updateProject);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Supprimer un projet
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du projet
 *     responses:
 *       200:
 *         description: Projet supprimé
 *       404:
 *         description: Projet non trouvé
 */
router.delete('/:id', auth, projectController.deleteProject);

module.exports = router;
