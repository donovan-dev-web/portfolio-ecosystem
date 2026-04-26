const mongoose = require('mongoose');
const { buildProjectSlug } = require('../utils/projectSlug');

const { Schema } = mongoose;

const imageVariantSchema = new Schema(
  {
    small: { type: String, required: true, trim: true },
    medium: { type: String, required: true, trim: true },
    large: { type: String, required: true, trim: true },
  },
  { _id: false }
);

// Gallery Item Schema
const galleryItemSchema = new Schema(
  {
    desktop: { type: imageVariantSchema, required: true },
    mobile: { type: imageVariantSchema, required: true },
    alt: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

// Presentation Schema
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
    title: {
      type: String,
      required: true,
      trim: true,
    },

    order: {
      type: Number,
      required: true,
      default: 0,
      index: true,
    },

    projectType: {
      type: Schema.Types.ObjectId,
      ref: 'ProjectType',
      required: true,
    },

    technologies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Technology',
      },
    ],

    languages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ProgrammingLanguage',
      },
    ],

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    coverImage: { type: imageVariantSchema, required: true },

    stack: [
      {
        type: String,
        trim: true,
      },
    ],

    presentation: {
      type: presentationSchema,
      required: true,
    },

    gallery: [galleryItemSchema],

    githubUrl: {
      type: String,
      trim: true,
    },

    isLive: {
      type: Boolean,
      default: false,
    },

    liveUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/* =========================
   Validation Logic
========================= */

// Max 2 technologies
projectSchema.path('technologies').validate(function (value) {
  return value.length <= 2;
}, 'A project can have a maximum of 2 technologies.');

// Max 2 languages
projectSchema.path('languages').validate(function (value) {
  return value.length <= 2;
}, 'A project can have a maximum of 2 programming languages.');

// Live URL required if isLive = true
projectSchema.pre('save', async function () {
  if (this.isLive && !this.liveUrl) {
    throw new Error('Live URL is required if project is marked as live.');
  }

  if (!this.slug && this.title) {
    this.slug = buildProjectSlug(this.title, 'project');
  }
});

projectSchema.pre('findOneAndUpdate', function () {
  const update = this.getUpdate();
  const nextTitle = update?.title || update?.$set?.title;

  if (nextTitle) {
    const nextSlug = buildProjectSlug(nextTitle, 'project');

    if (update.$set) {
      update.$set.slug = nextSlug;
    } else {
      update.slug = nextSlug;
    }
  }
});

module.exports = mongoose.model('Project', projectSchema);
