// src/lib/mongoose.ts
import mongoose from 'mongoose';

declare global {
  // Permet d'ajouter une propriété `mongoose` à globalThis pour le cache
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI must be defined in .env');
}

const MONGO_URI: string = process.env.MONGO_URI;

// Initialise le cache si pas déjà présent
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

export async function connectDB(): Promise<mongoose.Connection> {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose
      .connect(MONGO_URI)
      .then((m) => m.connection);
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}
