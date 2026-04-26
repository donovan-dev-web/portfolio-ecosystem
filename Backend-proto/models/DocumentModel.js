const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    kind: {
      type: String,
      required: true,
      unique: true,
      enum: ['cv'],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    pathname: {
      type: String,
      required: true,
      trim: true,
    },
    contentType: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: Number,
      required: true,
      min: 1,
    },
    downloadCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastDownloadedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Document || mongoose.model('Document', documentSchema);
