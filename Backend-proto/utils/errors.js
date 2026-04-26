/* ===== Classe d'erreur personnalisée ===== */
class AppError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status || 500;
    this.code = code || null; // Code interne précis pour identifier le type d'erreur
    this.isOperational = true; // Indique que c'est une erreur prévue et gérée, pas une erreur de programmation
  }
}

// Codes internes possibles
module.exports = {
  AppError,

  // Auth
  INVALID_CREDENTIALS: new AppError(
    'Identifiants ou mot de passe incorrect',
    401,
    'INVALID_CREDENTIALS'
  ),
  USERNAME_OR_PASSWORD_INCORRECT: new AppError(
    'Identifiant ou mot de passe incorrect',
    400,
    'USERNAME_OR_PASSWORD_INCORRECT'
  ),
  INVALID_INPUT: new AppError(
    'Données envoyées invalides',
    400,
    'INVALID_INPUT'
  ),
  USER_ALREADY_EXISTS: new AppError(
    'Un utilisateur avec cet email existe deja',
    409,
    'USER_ALREADY_EXISTS'
  ),
  SIGNUP_DISABLED: new AppError(
    "La creation de compte est desactivee",
    403,
    'SIGNUP_DISABLED'
  ),
  USER_NOT_FOUND: new AppError(
    'Utilisateur introuvable',
    404,
    'USER_NOT_FOUND'
  ),
  INVALID_OLD_PASSWORD: new AppError(
    'Ancien mot de passe incorrect',
    400,
    'INVALID_OLD_PASSWORD'
  ),
  LAST_USER_DELETE_FORBIDDEN: new AppError(
    'Impossible de supprimer le dernier utilisateur',
    409,
    'LAST_USER_DELETE_FORBIDDEN'
  ),

  // Serveur
  SERVER_ERROR: new AppError('Erreur serveur', 500, 'SERVER_ERROR'),
};
