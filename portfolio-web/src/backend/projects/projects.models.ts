import mongoose, { Schema } from 'mongoose';
import '../tags/models/projectType.model';
import '../tags/models/technology.model';
import '../tags/models/programmingLanguage.model';

const imageVariantSchema = new Schema(
  {
    small: { type: String, required: true },
    medium: { type: String, required: true },
    large: { type: String, required: true },
  },
  { _id: false }
);

const galleryItemSchema = new Schema(
  {
    desktop: { type: imageVariantSchema, required: true },
    mobile: { type: imageVariantSchema, required: true },
    alt: { type: String, required: true },
  },
  { _id: false }
);

const presentationSchema = new Schema(
  {
    description: { type: String, required: true },
    context: { type: String, required: true },
    objectives: { type: String, required: true },
    skills: { type: String, required: true },
    results: { type: String, required: true },
    improvements: { type: String, required: true },
  },
  { _id: false }
);

const projectSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    title: { type: String, required: true },
    order: { type: Number, required: true, default: 0, index: true },
    projectType: {
      type: Schema.Types.ObjectId,
      ref: 'ProjectType',
      required: true,
    },
    technologies: [{ type: Schema.Types.ObjectId, ref: 'Technologies' }],
    languages: [{ type: Schema.Types.ObjectId, ref: 'ProgrammingLanguage' }],
    shortDescription: { type: String, required: true },

    coverImage: { type: imageVariantSchema, required: true },

    stack: [{ type: String }],
    presentation: { type: presentationSchema, required: true },

    gallery: [galleryItemSchema],

    githubUrl: String,
    isLive: { type: Boolean, default: false },
    liveUrl: String,
  },
  { timestamps: true }
);

export const Project =
  mongoose.models.Project || mongoose.model('Project', projectSchema);
