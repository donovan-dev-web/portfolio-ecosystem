/* Import .env variables */
require('dotenv').config();

/* ===== Importation de Swagger ===== */
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const express = require('express');

/* ===== Importation du middleware de gestion des erreurs ===== */
const errorHandler = require('./middlesware/errorHandler');
const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/projectRoutes');
const tagRoutes = require('./routes/tagRoutes');
const messagesRoutes = require('./routes/messagesRoutes');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

/* ===== Middleware pour parser le JSON ===== */
app.use(express.json({ limit: '10mb' }));
/* ===== Documentation Swagger ===== */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* ===== Routes ===== */
app.use('/api/auth', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api', tagRoutes);

/* ===== Middleware de gestion des erreurs ===== */
app.use(errorHandler);

module.exports = app;
