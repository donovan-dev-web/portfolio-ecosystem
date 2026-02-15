const express = require('express');
const router = express.Router();
const auth = require('../middlesware/auth');
const tagController = require('../controller/tagController');

/**
 * @swagger
 * tags:
 *   - name: ProjectTypes
 *     description: Gestion des types de projet
 *   - name: Technologies
 *     description: Gestion des technologies
 *   - name: ProgrammingLanguages
 *     description: Gestion des langages
 */

/* =========================
   ProjectType Routes
========================= */

/**
 * @swagger
 * /project-types:
 *   get:
 *     summary: Récupérer tous les ProjectTypes
 *     tags: [ProjectTypes]
 *     responses:
 *       200:
 *         description: Liste des ProjectTypes
 */
router.get('/project-types', tagController.getAllProjectTypes);

/**
 * @swagger
 * /project-types/{id}:
 *   get:
 *     summary: Récupérer un ProjectType par ID
 *     tags: [ProjectTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du ProjectType
 *     responses:
 *       200:
 *         description: ProjectType récupéré
 *       404:
 *         description: ProjectType non trouvé
 */
router.get('/project-types/:id', tagController.getProjectTypeById);

/**
 * @swagger
 * /project-types:
 *   post:
 *     summary: Créer un ProjectType
 *     tags: [ProjectTypes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectType'
 *     responses:
 *       201:
 *         description: ProjectType créé
 *       400:
 *         description: Données invalides
 */
router.post('/project-types', auth, tagController.createProjectType);

/**
 * @swagger
 * /project-types/{id}:
 *   put:
 *     summary: Mettre à jour un ProjectType
 *     tags: [ProjectTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du ProjectType
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectType'
 *     responses:
 *       200:
 *         description: ProjectType mis à jour
 *       404:
 *         description: ProjectType non trouvé
 */
router.put('/project-types/:id', auth, tagController.updateProjectType);

/**
 * @swagger
 * /project-types/{id}:
 *   delete:
 *     summary: Supprimer un ProjectType
 *     tags: [ProjectTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du ProjectType
 *     responses:
 *       200:
 *         description: ProjectType supprimé
 *       404:
 *         description: ProjectType non trouvé
 */
router.delete('/project-types/:id', auth, tagController.deleteProjectType);

/* =========================
   Technology Routes
========================= */

/**
 * @swagger
 * /technologies:
 *   get:
 *     summary: Récupérer toutes les Technologies
 *     tags: [Technologies]
 *     responses:
 *       200:
 *         description: Liste des Technologies
 */
router.get('/technologies', tagController.getAllTechnologies);

/**
 * @swagger
 * /technologies/{id}:
 *   get:
 *     summary: Récupérer une Technology par ID
 *     tags: [Technologies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la Technology
 *     responses:
 *       200:
 *         description: Technology récupérée
 *       404:
 *         description: Technology non trouvée
 */
router.get('/technologies/:id', tagController.getTechnologyById);

/**
 * @swagger
 * /technologies:
 *   post:
 *     summary: Créer une Technology
 *     tags: [Technologies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Technology'
 *     responses:
 *       201:
 *         description: Technology créée
 *       400:
 *         description: Données invalides
 */
router.post('/technologies', auth, tagController.createTechnology);

/**
 * @swagger
 * /technologies/{id}:
 *   put:
 *     summary: Mettre à jour une Technology
 *     tags: [Technologies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la Technology
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Technology'
 *     responses:
 *       200:
 *         description: Technology mise à jour
 *       404:
 *         description: Technology non trouvée
 */
router.put('/technologies/:id', auth, tagController.updateTechnology);

/**
 * @swagger
 * /technologies/{id}:
 *   delete:
 *     summary: Supprimer une Technology
 *     tags: [Technologies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la Technology
 *     responses:
 *       200:
 *         description: Technology supprimée
 *       404:
 *         description: Technology non trouvée
 */
router.delete('/technologies/:id', auth, tagController.deleteTechnology);

/* =========================
   ProgrammingLanguage Routes
========================= */

/**
 * @swagger
 * /languages:
 *   get:
 *     summary: Récupérer tous les ProgrammingLanguages
 *     tags: [ProgrammingLanguages]
 *     responses:
 *       200:
 *         description: Liste des ProgrammingLanguages
 */
router.get('/languages', tagController.getAllLanguages);

/**
 * @swagger
 * /languages/{id}:
 *   get:
 *     summary: Récupérer un ProgrammingLanguage par ID
 *     tags: [ProgrammingLanguages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du ProgrammingLanguage
 *     responses:
 *       200:
 *         description: ProgrammingLanguage récupéré
 *       404:
 *         description: ProgrammingLanguage non trouvé
 */
router.get('/languages/:id', tagController.getLanguageById);

/**
 * @swagger
 * /languages:
 *   post:
 *     summary: Créer un ProgrammingLanguage
 *     tags: [ProgrammingLanguages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProgrammingLanguage'
 *     responses:
 *       201:
 *         description: ProgrammingLanguage créé
 *       400:
 *         description: Données invalides
 */
router.post('/languages', auth, tagController.createLanguage);

/**
 * @swagger
 * /languages/{id}:
 *   put:
 *     summary: Mettre à jour un ProgrammingLanguage
 *     tags: [ProgrammingLanguages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du ProgrammingLanguage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProgrammingLanguage'
 *     responses:
 *       200:
 *         description: ProgrammingLanguage mis à jour
 *       404:
 *         description: ProgrammingLanguage non trouvé
 */
router.put('/languages/:id', auth, tagController.updateLanguage);

/**
 * @swagger
 * /languages/{id}:
 *   delete:
 *     summary: Supprimer un ProgrammingLanguage
 *     tags: [ProgrammingLanguages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du ProgrammingLanguage
 *     responses:
 *       200:
 *         description: ProgrammingLanguage supprimé
 *       404:
 *         description: ProgrammingLanguage non trouvé
 */
router.delete('/languages/:id', auth, tagController.deleteLanguage);

module.exports = router;
