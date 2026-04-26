const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const UserModles = require('../models/Users');
const AuthSettings = require('../models/AuthSettings');
const errors = require('../utils/errors');

async function hashPassword(password) {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 131072,
    timeCost: 2,
    parallelism: 4,
  });
}

function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    email: user.email,
    createdAt: user.createdAt?.toISOString(),
    updatedAt: user.updatedAt?.toISOString(),
  };
}

async function getOrCreateAuthSettings() {
  let settings = await AuthSettings.findOne();

  if (!settings) {
    settings = await AuthSettings.create({ signupEnabled: true });
  }

  return settings;
}

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return next(errors.INVALID_INPUT);
    if (password.length < 8) return next(errors.INVALID_INPUT);

    const settings = await getOrCreateAuthSettings();

    if (!settings.signupEnabled) {
      return next(errors.SIGNUP_DISABLED);
    }

    const existingUser = await UserModles.findOne({ email });
    if (existingUser) return next(errors.USER_ALREADY_EXISTS);

    const hashedPassword = await hashPassword(password);

    const user = new UserModles({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    if (err.isOperational) return next(err);
    next(errors.SERVER_ERROR);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return next(errors.INVALID_INPUT);
    if (password.length < 8) return next(errors.INVALID_INPUT);

    const user = await UserModles.findOne({ email });
    if (!user) return next(errors.INVALID_CREDENTIALS);

    const valid = await argon2.verify(user.password, password);
    if (!valid) return next(errors.INVALID_CREDENTIALS);

    res.status(200).json({
      userId: user._id,
      email: user.email,
      token: jwt.sign({ userId: user._id }, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn,
      }),
    });
  } catch (err) {
    if (err.isOperational) return next(err);
    next(errors.SERVER_ERROR);
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const users = await UserModles.find().sort({ createdAt: 1 });
    res.status(200).json(users.map(sanitizeUser));
  } catch (err) {
    if (err.isOperational) return next(err);
    next(errors.SERVER_ERROR);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) return next(errors.INVALID_INPUT);
    if (password && password.length < 8) return next(errors.INVALID_INPUT);

    const existingUser = await UserModles.findOne({ email });
    if (existingUser && existingUser._id.toString() !== req.params.id) {
      return next(errors.USER_ALREADY_EXISTS);
    }

    const payload = { email };

    if (password) {
      payload.password = await hashPassword(password);
    }

    const updated = await UserModles.findByIdAndUpdate(req.params.id, payload, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updated) return next(errors.USER_NOT_FOUND);

    res.status(200).json(sanitizeUser(updated));
  } catch (err) {
    if (err.isOperational) return next(err);
    next(errors.SERVER_ERROR);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const totalUsers = await UserModles.countDocuments();

    if (totalUsers <= 1) {
      return next(errors.LAST_USER_DELETE_FORBIDDEN);
    }

    const deleted = await UserModles.findByIdAndDelete(req.params.id);

    if (!deleted) return next(errors.USER_NOT_FOUND);

    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    if (err.isOperational) return next(err);
    next(errors.SERVER_ERROR);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword || newPassword.length < 8) {
      return next(errors.INVALID_INPUT);
    }

    const user = await UserModles.findById(req.auth.userId);

    if (!user) return next(errors.USER_NOT_FOUND);

    const isValid = await argon2.verify(user.password, oldPassword);
    if (!isValid) return next(errors.INVALID_OLD_PASSWORD);

    user.password = await hashPassword(newPassword);
    await user.save();

    res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (err) {
    if (err.isOperational) return next(err);
    next(errors.SERVER_ERROR);
  }
};

exports.getSignupStatus = async (req, res, next) => {
  try {
    const settings = await getOrCreateAuthSettings();
    res.status(200).json({ signupEnabled: settings.signupEnabled });
  } catch (err) {
    if (err.isOperational) return next(err);
    next(errors.SERVER_ERROR);
  }
};

exports.updateSignupStatus = async (req, res, next) => {
  try {
    if (typeof req.body.signupEnabled !== 'boolean') {
      return next(errors.INVALID_INPUT);
    }

    const settings = await getOrCreateAuthSettings();
    settings.signupEnabled = req.body.signupEnabled;
    await settings.save();

    res.status(200).json({ signupEnabled: settings.signupEnabled });
  } catch (err) {
    if (err.isOperational) return next(err);
    next(errors.SERVER_ERROR);
  }
};
