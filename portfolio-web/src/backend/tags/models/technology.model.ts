import mongoose, { Schema, model, models } from 'mongoose';
import { TechnologyType } from '../tags.types';

const technologySchema = new Schema<TechnologyType>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    icon: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Technology =
  models.Technologies ||
  model<TechnologyType>('Technologies', technologySchema);
