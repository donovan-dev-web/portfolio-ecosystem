import mongoose, { Schema, model, models } from 'mongoose';
import { ProgrammingLanguageType } from '../tags.types';

const programmingLanguageSchema = new Schema<ProgrammingLanguageType>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    icon: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const ProgrammingLanguage =
  models.ProgrammingLanguage ||
  model<ProgrammingLanguageType>(
    'ProgrammingLanguage',
    programmingLanguageSchema
  );
