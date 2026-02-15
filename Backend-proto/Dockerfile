FROM node:18

WORKDIR /app

# Copier package.json du backend
COPY Backend-proto/package*.json ./

# Créer le dossier images et donner les permissions nécessaires
RUN mkdir -p /usr/src/app/images
RUN chmod -R 777 /usr/src/app/images

# Copier le dossier my_packages dans l'image
COPY my_packages ../my_packages

RUN npm install

# Copier le reste du backend
COPY Backend-proto .

EXPOSE 3000