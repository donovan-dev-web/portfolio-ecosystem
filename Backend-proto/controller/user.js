// controller/user.js
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérifier que l'utilisateur existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé !' });
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Mot de passe incorrect !' });
    }

    // Créer un token JWT (optionnel mais recommandé)
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      'RANDOM_SECRET_KEY', // remplacer par une vraie clé secrète
      { expiresIn: '24h' }
    );

    res.status(200).json({
      userId: user._id,
      username: user.username,
      token
    });

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};
