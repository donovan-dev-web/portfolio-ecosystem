import { Schema, model, models } from 'mongoose';

const authSettingsSchema = new Schema(
  {
    signupEnabled: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export const AuthSettings =
  models.AuthSettings || model('AuthSettings', authSettingsSchema);
