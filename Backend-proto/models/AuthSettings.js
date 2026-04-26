const mongoose = require('mongoose');

const authSettingsSchema = new mongoose.Schema(
  {
    signupEnabled: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.AuthSettings ||
  mongoose.model('AuthSettings', authSettingsSchema);
