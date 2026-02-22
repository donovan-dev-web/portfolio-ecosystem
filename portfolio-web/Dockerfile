# Utiliser Node LTS
FROM node:20-alpine AS base

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du projet
COPY . .

# Exposer le port Next.js
EXPOSE 3000

# Commande par défaut pour le dev
# --hostname 0.0.0.0 permet l'accès depuis l'extérieur du conteneur
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]