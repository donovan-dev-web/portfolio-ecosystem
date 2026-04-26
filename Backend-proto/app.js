/* Import .env variables */
require('dotenv').config();

/* ===== Importation de Swagger ===== */
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const path = require('path');

const express = require('express');

/* ===== Importation du middleware de gestion des erreurs ===== */
const errorHandler = require('./middlesware/errorHandler');
const { corsConfig, isAllowedOrigin } = require('./config/cors');
const configRoutes = require('./routes/configRoutes');
const docsRoutes = require('./routes/docsRoutes');
const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/projectRoutes');
const tagRoutes = require('./routes/tagRoutes');
const messagesRoutes = require('./routes/messagesRoutes');

const app = express();

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader(
    'Access-Control-Allow-Headers',
    corsConfig.allowedHeaders.join(', ')
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    corsConfig.allowedMethods.join(', ')
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

/* ===== Middleware pour parser le JSON ===== */
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
/* ===== Documentation Swagger ===== */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* ===== Routes ===== */
app.use('/api/auth', userRoutes);
app.use('/api/push-token', configRoutes);
app.use('/api/docs', docsRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api', tagRoutes);

/* ===== Middleware de gestion des erreurs ===== */
app.use(errorHandler);

module.exports = app;
