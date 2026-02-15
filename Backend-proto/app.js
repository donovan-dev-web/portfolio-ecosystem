/* Import .env variables */
require('dotenv').config();

const express = require('express');
const userRoutes = require('./routes/user');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/* ===== Middleware pour parser le JSON ===== */
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', userRoutes);

module.exports = app;