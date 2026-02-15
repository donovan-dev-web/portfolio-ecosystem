const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index pour éviter les doublons et accélérer les recherches
projectTypeSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('ProjectType', projectTypeSchema);
