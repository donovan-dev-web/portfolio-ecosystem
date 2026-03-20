import mongoose, { Schema, model, models } from 'mongoose';
import { DocType } from './docs.types';

const docSchema = new Schema<DocType>(
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

export const Doc = models.Doc || model<DocType>('Doc', docSchema);
