const mongoose = require('mongoose');

const { Schema } = mongoose;

const programmingLanguageSchema = new Schema(
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

// Index unique
programmingLanguageSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model(
  'ProgrammingLanguage',
  programmingLanguageSchema
);
