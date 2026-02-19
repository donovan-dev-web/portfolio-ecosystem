const mongoose = require('mongoose');

const { Schema } = mongoose;

// Gallery Item Schema
const galleryItemSchema = new Schema(
  {
    desktopUrl: {
      type: String,
      required: true,
      trim: true,
    },
    mobileUrl: {
      type: String,
      required: true,
      trim: true,
    },
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

    coverImage: {
      type: String,
      required: true,
      trim: true,
    },

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
});

module.exports = mongoose.model('Project', projectSchema);
