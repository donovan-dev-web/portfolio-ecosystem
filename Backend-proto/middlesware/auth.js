const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, jwtConfig.secret);
    const userId = decodedToken.userId || decodedToken.id;

    req.auth = { userId: userId };
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
