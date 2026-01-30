# 🌐 Portfolio Ecosystem – React Full Stack

## 📌 Présentation du projet

Ce projet a pour objectif de créer un **portfolio web moderne**, accompagné d’un **écosystème complet** comprenant :

- un **site web public** (portfolio)
- une **application desktop** (administration)
- une **application mobile** (administration)

L’ensemble repose sur une **API commune**, pensée pour être utilisée par plusieurs plateformes.  
Les applications desktop et mobile sont des projets personnels ajoutés **en complément** du portfolio web afin de démontrer une maîtrise complète de l’écosystème React.

---

## 🎯 Objectifs

### Objectifs pédagogiques (formation)
- Créer un **portfolio web professionnel**
- Mettre en place un **frontend moderne**
- Utiliser un **backend léger**
- Gérer des données dynamiques
- Déployer une application web

### Objectifs personnels (recruteurs)
- Concevoir une **architecture multi-plateforme**
- Maîtriser **React sur Web / Desktop / Mobile**
- Implémenter une **API réutilisable**
- Montrer une démarche d’architecture et d’anticipation
- Travailler avec plusieurs bases de données

---

## 🧱 Architecture globale

```txt
portfolio-ecosystem/
├─ backend-prototype/   # API temporaire (Express + SQLite)
├─ desktop/             # App Desktop (React + Vite + Electron)
├─ mobile/              # App Mobile (React Native + Expo)
├─ web/                 # Portfolio Web (Next.js)
└─ README.md
````

⚠️ **Seul le dossier `web/` correspond au projet évalué dans la formation**
Les autres applications sont des projets personnels annexes.

---

## 🧑‍💻 Stack technique

### 🌐 Web (Projet noté)

* **Next.js**
* **React**
* **TypeScript**
* **API Routes (Next.js)**
* **MongoDB Atlas**
* **Déploiement : Vercel**

### 🖥️ Desktop

* **React**
* **Vite**
* **Electron**
* **TypeScript**
* **IPC (Electron)**
* **Mode offline avec données fictives**

### 📱 Mobile

* **React Native**
* **Expo**
* **TypeScript**
* **Mode offline avec données fictives**

### 🔌 Backend prototype (temporaire)

* **Node.js**
* **Express**
* **SQLite**
* **REST API**

---

## 🔄 Philosophie du projet

* Le backend **prototype** sert à :

  * définir les routes API
  * valider les modèles de données
  * permettre le développement des apps desktop & mobile
* Le backend **final** (Next.js) reprend **exactement les mêmes routes**
* Les applications clientes **ne changent pas** lors de la migration

👉 Le prototype est volontairement **simple, local et jetable**

---
---
---

# Plan d’Action – Portfolio Ecosystem

---

#  ÉTAPE 1 — Backend Prototype (Express + SQLite)

## 🎯 Introduction
**Objectif**  
Créer un backend temporaire permettant :
- de définir les modèles de données
- de stabiliser les routes API
- de servir de base aux apps desktop et mobile

**Stack**
- Node.js
- Express
- SQLite
- TypeScript

**Contraintes**
- Backend local
- Simple
- Jetable
- API REST stable et migrable

---

## 🟡 Phase 1 — Initialisation du backend

### Tâches
1. Créer le dossier `backend-prototype`
2. Initialiser le projet Node.js
3. Installer les dépendances (Express, SQLite, etc.)
4. Mettre en place TypeScript
5. Configurer les scripts npm
6. Créer la structure de dossiers
7. Configurer le serveur Express
8. Mettre en place un middleware de base (JSON, CORS)

---

## 🟡 Phase 2 — Initialisation de la base de données (SQLite)

### Tâches
1. Installer SQLite
2. Créer le fichier de base de données
3. Définir le schéma de la table `projects`
4. Définir le schéma de la table `messages`
5. Créer les scripts de création de tables
6. Insérer des données fictives
7. Tester les requêtes SQL
8. Centraliser l’accès à la DB

---

## 🟡 Phase 3 — Mise en place de l’API Projects

### Tâches
1. Créer la route `GET /api/projects`
2. Créer la route `POST /api/projects`
3. Créer la route `PUT /api/projects/:id`
4. Créer la route `DELETE /api/projects/:id`
5. Mettre en place la validation des données
6. Gérer les erreurs API
7. Tester les endpoints (Postman)
8. Documenter les routes Projects

---

## 🟡 Phase 4 — Mise en place de l’API Contact

### Tâches
1. Créer la route `POST /api/contact`
2. Valider les champs du formulaire
3. Sauvegarder les messages en DB
4. Gérer les erreurs
5. Tester l’endpoint
6. Documenter la route Contact

---

## 🟡 Phase 5 — Stabilisation & documentation

### Tâches
1. Vérifier la cohérence des routes
2. Vérifier les payloads
3. Nettoyer le code
4. Rédiger le README du backend
5. Lister les routes et schémas
6. Marquer le backend comme “Prototype validé”

---

# 🔴 ÉTAPE 2 — Application Desktop (React + Vite + Electron)

## 🎯 Introduction
**Objectif**  
Créer une application desktop privée permettant l’administration des projets.

**Stack**
- React
- Vite
- Electron
- TypeScript

---

## 🟡 Phase 1 — Initialisation du frontend desktop

### Tâches
1. Créer le projet React + Vite
2. Configurer TypeScript
3. Mettre en place l’architecture du projet
4. Installer un router
5. Créer la structure UI de base
6. Mettre en place un state management
7. Créer les services API

---

## 🟡 Phase 2 — Connexion au backend prototype

### Tâches
1. Configurer l’URL de l’API
2. Implémenter la récupération des projets
3. Gérer les états de chargement
4. Gérer les erreurs réseau
5. Créer des données mock en fallback

---

## 🟡 Phase 3 — CRUD Projets

### Tâches
1. Affichage de la liste des projets
2. Création d’un projet
3. Édition d’un projet
4. Suppression d’un projet
5. Validation des formulaires
6. Tests fonctionnels

---

## 🟡 Phase 4 — Mode offline

### Tâches
1. Détecter l’absence de connexion
2. Charger les données fictives
3. Informer l’utilisateur
4. Empêcher les actions critiques
5. Tester le mode offline

---

## 🟡 Phase 5 — Intégration Electron

### Tâches
1. Initialiser Electron
2. Configurer le process main
3. Configurer le preload
4. Charger l’app React
5. Mettre en place l’IPC
6. Tester le build desktop

---

## 🟡 Phase 6 — Stabilisation & gel

### Tâches
1. Nettoyer le code
2. Corriger les bugs
3. Vérifier les flux principaux
4. Mettre à jour la documentation
5. Geler l’application desktop

---

# 🔴 ÉTAPE 3 — Application Mobile (React Native + Expo)

## 🎯 Introduction
**Objectif**  
Créer une application mobile privée pour gérer les projets.

**Stack**
- React Native
- Expo
- TypeScript

---

## 🟡 Phase 1 — Initialisation du projet mobile

### Tâches
1. Créer le projet Expo
2. Configurer TypeScript
3. Mettre en place la navigation
4. Structurer le projet
5. Installer les dépendances nécessaires

---

## 🟡 Phase 2 — Connexion à l’API

### Tâches
1. Créer les services API
2. Récupérer les projets
3. Gérer les états de chargement
4. Gérer les erreurs réseau
5. Mettre en place des données mock

---

## 🟡 Phase 3 — Fonctionnalités principales

### Tâches
1. Affichage des projets
2. Consultation d’un projet
3. Édition basique
4. Validation des formulaires
5. Tests sur émulateur

---

## 🟡 Phase 4 — Mode offline & stabilisation

### Tâches
1. Gestion du mode offline
2. Tests hors connexion
3. Nettoyage du code
4. Mise à jour de la documentation
5. Gel de l’application mobile

---

# 🔴 ÉTAPE 4 — Portfolio Web (Next.js + MongoDB)

## 🎯 Introduction
**Objectif**  
Créer le portfolio web final évalué dans la formation.

**Stack**
- Next.js
- React
- TypeScript
- MongoDB Atlas
- Vercel

---

## 🟡 Phase 1 — Initialisation du projet web

### Tâches
1. Créer le projet Next.js
2. Configurer TypeScript
3. Mettre en place la structure du projet
4. Configurer le routing
5. Créer le layout global

---

## 🟡 Phase 2 — Backend Next.js

### Tâches
1. Configurer MongoDB Atlas
2. Connecter MongoDB à Next.js
3. Recréer les schémas de données
4. Implémenter les API Routes
5. Tester les endpoints

---

## 🟡 Phase 3 — Frontend portfolio

### Tâches
1. Page d’accueil
2. Page projets
3. Page détail projet
4. Page à propos
5. Page contact
6. Connexion au backend
7. Validation du formulaire

---

## 🟡 Phase 4 — Finalisation & déploiement

### Tâches
1. SEO
2. Accessibilité
3. Responsive
4. Tests finaux
5. Déploiement Vercel
6. Préparation soutenance

---

## 🏁 Conclusion

Ce plan permet :
- une organisation claire
- un suivi précis via Kanban
- une séparation nette entre projet évalué et projets personnels
- une montée en compétence progressive

---


## 🧊 Gestion du scope

* Desktop & mobile : **fonctionnels mais non prioritaires**
* Web : **priorité absolue**
* Pas de sur-architecture
* Pas de fonctionnalités inutiles

---

## 📣 Présentation en soutenance

* Présentation principale : **portfolio web**
* Mention de l’écosystème desktop/mobile comme projet personnel
* Le projet web est **autonome et indépendant**

---

## 🚀 Conclusion

Ce projet démontre :

* une maîtrise complète de React
* une capacité à concevoir une architecture scalable
* une séparation claire des responsabilités
* une vision produit et long terme

---
