# MobiTout - Application de mobilité tout-en-un

## Description

MobiTout est une application de mobilité tout-en-un qui offre les services suivants:
- Courses VTC (voiture et moto)
- Covoiturage
- Livraison express de colis
- Location courte durée de véhicules

L'application permet:
- L'inscription libre des chauffeurs particuliers (avec vérification)
- La formation et le recrutement de chauffeurs premium internes
- Des abonnements clients Standard et Premium
- Une option USSD pour téléphones simples

## Architecture

### Frontend
- React Native pour le développement cross-platform
- Redux ou Context API pour la gestion d'état
- React Navigation pour la navigation entre écrans
- Mapbox ou Google Maps pour la cartographie
- Socket.io pour les communications en temps réel

### Backend
- RESTful API en Node.js (Express ou Fastify) ou Python (FastAPI)
- Base de données PostgreSQL
- Cache Temps Réel avec Redis
- Notification Push via Firebase Cloud Messaging
- Intégration SMS/USSD via un fournisseur local ou Twilio
- Paiement via Mobile Money, Cartes bancaires (Stripe, Flutterwave, ou API locale)
- Stockage de fichiers sur Amazon S3 ou équivalent

### Sécurité
- JWT pour authentification
- HTTPS/TLS 1.2+
- RGPD ready
- Chiffrement des mots de passe (bcrypt)
- Stockage sécurisé des fichiers sensibles
- Limitation des accès administratifs (RBAC)
- Système anti-fraude sur les paiements
- Sauvegardes automatiques quotidiennes

### Infrastructure
- Docker pour la conteneurisation
- Kubernetes pour l'orchestration
- CI/CD Automatisé (GitHub Actions, GitLab CI)
- Logging centralisé (ELK Stack)
- Monitoring (Prometheus + Grafana)
- Hébergement cloud (AWS, GCP ou DigitalOcean)

## Fonctionnalités

### Client
- Création de compte / connexion
- Carte interactive (position GPS, véhicules disponibles)
- Commande de course, colis ou location
- Choix de chauffeur "Standard" ou "Premium"
- Paiement intégré (Mobile Money, carte bancaire)
- Suivi en temps réel
- Évaluation de la course / du chauffeur
- Gestion d'abonnement

### Chauffeur
- Création de compte / connexion
- Envoi de documents (permis, carte grise, assurance)
- Acceptation/rejet des courses
- Suivi des gains et paiements
- Formation en ligne (certification Premium)
- Souscription au programme "Pro" ou "Elite"

### Administrateur
- Validation des chauffeurs (KYC)
- Gestion des utilisateurs
- Suivi des courses/livraisons en temps réel
- Statistiques et analytics
- Configuration des tarifs dynamiques
- Gestion des abonnements

### USSD
- Commande de course depuis un téléphone simple
- Confirmation par SMS

## Installation et déploiement

### Prérequis
- Node.js 18+
- Docker et Docker Compose
- Compte AWS/GCP/DigitalOcean
- Compte Firebase
- Compte Stripe/Flutterwave

### Installation locale
1. Cloner le dépôt
2. Installer les dépendances: `npm install`
3. Configurer les variables d'environnement
4. Lancer l'application: `npm run dev`

### Déploiement
1. Construire les images Docker: `docker-compose build`
2. Pousser les images vers le registre
3. Déployer sur Kubernetes: `kubectl apply -f k8s/`

## Contribution

1. Forker le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence [MIT](LICENSE).
