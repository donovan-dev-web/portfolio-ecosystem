import sqlite3 from 'sqlite3';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';


const app = express();

app.use(express.json());
app.use(cors());

// Connexion SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error(err.message);
  else console.log('Connecté à SQLite.');
});

app.use('/api/users', userRoutes);

export default app;
