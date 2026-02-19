const mongoose = require('mongoose');
const mongooseErrorHandler = require('mongoose-error-handler');
const sanitizeHtml = require('sanitize-html');

const messageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 100,
    match: /^\S+@\S+\.\S+$/, // validation simple email
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20, // format FR ok, on limite pour éviter spam
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000,
    set: (v) => sanitizeHtml(v), // sanitize le contenu
  },
  read: {
    type: Boolean,
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

messageSchema.plugin(mongooseErrorHandler);

module.exports = mongoose.model('Message', messageSchema);
