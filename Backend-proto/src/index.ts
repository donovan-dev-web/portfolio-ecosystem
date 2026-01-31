import express from 'express';
import sqlite3 from 'sqlite3';
import app from './app';

const port = 3000;

// Middleware pour JSON
app.use(express.json());

// Connexion SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error(err.message);
  else console.log('Connecté à SQLite.');
});

// Exemple de route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Démarrage serveur
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
});