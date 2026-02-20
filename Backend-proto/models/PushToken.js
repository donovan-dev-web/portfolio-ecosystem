const mongoose = require('mongoose');
const mongooseErrorHandler = require('mongoose-error-handler');

const pushTokenSchema = mongoose.Schema({
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

pushTokenSchema.plugin(mongooseErrorHandler);

module.exports = mongoose.model('PushToken', pushTokenSchema);
