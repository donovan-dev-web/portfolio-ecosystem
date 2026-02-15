# Avant : FROM node:18
FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV CHOKIDAR_USEPOLLING=true

CMD ["npm", "run", "dev"]
