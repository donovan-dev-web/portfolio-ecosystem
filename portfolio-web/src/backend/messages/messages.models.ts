import mongoose, { Schema } from 'mongoose';

const messagesSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    match: /^\S+@\S+\.\S+$/,
  },
  phone: {
    type: String,
    trim: true,
    maxLength: 28,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: 2000,
  },
  read: {
    type: Boolean,
    required: true,
    default: false,
  },
  dateSent: {
    type: Date,
    default: Date.now,
  },
  dateRead: {
    type: Date,
  },
});

export const Messages =
  mongoose.models.Messages || mongoose.model('Messages', messagesSchema);
