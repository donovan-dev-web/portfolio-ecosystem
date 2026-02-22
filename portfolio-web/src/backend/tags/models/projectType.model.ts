import mongoose, { Schema, model, models } from 'mongoose';
import { ProjectTypeType } from '../tags.types';

const projectTypeSchema = new Schema<ProjectTypeType>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    icon: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const ProjectType =
  models.ProjectType ||
  model<ProjectTypeType>('ProjectType', projectTypeSchema);
