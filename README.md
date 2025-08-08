# 🎵 Sofa Rockers Band

Une application web moderne pour gérer et présenter les événements musicaux et lives d'un groupe de musique.

## 📋 Démo 
- **[Visit](https://sofa-band-vercel.app)**
  
## 📋 Description

Sofa Rockers est une plateforme web développée avec Next.js qui permet de :
- Afficher les événements et concerts du groupe
- Gérer une liste de musique avec lecteur intégré
- Présenter les lives et performances
- Offrir un tableau de bord administrateur
- Supporter l'internationalisation (français, anglais, japonais)

## 🚀 Technologies utilisées

- **Framework** : Next.js
- **Langage** : TypeScript
- **Base de données** : PostgreSQL avec Prisma ORM
- **Authentification** : NextAuth.js
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Internationalisation** : next-intl
- **Gestion d'état** : TanStack Query
- **Validation** : Zod
- **Lecteur audio** : React Player

## 📦 Installation

### Prérequis

- Node.js (version 18 ou supérieure)
- pnpm (gestionnaire de paquets)
- PostgreSQL

### Étapes d'installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/Oyo1505/sofa-band.git
   cd sofa-band
   ```

2. **Installer les dépendances**
   ```bash
   pnpm install
   ```

3. **Configuration de l'environnement**
   
   Créer un fichier `.env` à la racine du projet :
   ```env
   # Base de données
   POSTGRES_URL="postgresql://username:password@localhost:5432/XXXXX"
   POSTGRES_URL_NON_POOLING="postgresql://username:password@localhost:5432/XXXX"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Fournisseurs d'authentification (optionnel)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Configuration de la base de données**
   ```bash
   # Générer le client Prisma
   pnpm prisma generate
   
   # Pousser le schéma vers la base de données
   pnpm prisma db push
   ```

5. **Lancer le serveur de développement**
   ```bash
   pnpm dev
   ```

L'application sera accessible à l'adresse : http://localhost:3000

## 🏗️ Structure du projet

```
sofa-band/
├── src/
│   ├── app/                    # Pages et layouts Next.js
│   │   ├── [locale]/          # Routes internationalisées
│   │   │   ├── (main)/        # Pages principales
│   │   │   └── dashboard/     # Tableau de bord admin
│   │   └── api/               # API routes
│   ├── domains/               # Architecture par domaines
│   │   ├── auth/             # Authentification
│   │   ├── dashboard/        # Tableau de bord
│   │   ├── home-page/        # Page d'accueil
│   │   ├── layout/           # Composants de mise en page
│   │   ├── music-page/       # Gestion de la musique
│   │   ├── show-page/        # Gestion des événements
│   │   └── ui/               # Composants UI réutilisables
│   ├── lib/                  # Utilitaires et configurations
│   ├── models/               # Types et interfaces
│   └── messages/             # Fichiers de traduction
├── prisma/                   # Schéma et migrations de base de données
└── public/                   # Assets statiques
```

## 🎯 Fonctionnalités principales

### 🏠 Page d'accueil
- Présentation du groupe avec image héro
- Liste des musiques avec lecteur intégré
- Affichage des événements à venir
- Section des lives récents

### 🎵 Gestion de la musique
- Lecteur audio intégré
- Liste des morceaux
- Liens vers les plateformes de streaming

### 📅 Événements et Lives
- Calendrier des événements
- Gestion des lives avec vidéos
- Informations détaillées (lieu, date, ville)

### 🔐 Tableau de bord administrateur
- Interface d'administration sécurisée
- Gestion des événements et lives
- Système d'authentification
- CRUD complet pour les contenus

### 🌍 Internationalisation
- Support multilingue (EN/JP)
- Traductions complètes
- Routing adaptatif

## 🛠️ Scripts disponibles

```bash
# Développement
pnpm dev          # Lance le serveur de développement

# Production
pnpm build        # Build de production
pnpm start        # Lance le serveur de production

# Utilitaires
pnpm lint         # Vérification du code
```

## 🗄️ Base de données

Le projet utilise PostgreSQL avec Prisma ORM. Les principales entités :

- **User** : Utilisateurs et administrateurs
- **Event** : Événements et concerts
- **Live** : Lives et performances
- **AuthorizedEmail** : Emails autorisés pour l'admin

## 🔧 Configuration avancée

### Variables d'environnement


## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Oyo1505** - [GitHub](https://github.com/Oyo1505)

---

⭐ N'hésitez pas à donner une étoile au projet si vous l'aimez !
