// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/Users');

mongoose.connect('mongodb://mongo:27017/portfolio')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(err => console.log('Connexion à MongoDB échouée !', err));

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash('MotDePasseSuperSecret', 10); // remplacer par ton mot de passe
    const admin = new User({
      username: 'admin', // ton username
      password: hashedPassword
    });

    await admin.save();
    console.log('Admin créé avec succès !');
    mongoose.disconnect();
  } catch (err) {
    console.log('Erreur création admin:', err);
  }
};

createAdmin();
