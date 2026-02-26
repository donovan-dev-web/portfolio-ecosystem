import mongoose, { Schema } from 'mongoose';

const pushTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  device: {
    type: String,
    enum: ['android', 'ios', 'web'],
    default: 'android',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUsedAt: {
    type: Date,
    default: Date.now,
  },
});

export const PushToken =
  mongoose.models.PushToken || mongoose.model('PushToken', pushTokenSchema);
