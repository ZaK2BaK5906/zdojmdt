# 🦅 Tablette DOJ/Gouvernement FiveM

Une interface de tablette ultra réaliste pour les serveurs FiveM ESX, destinée au Département de la Justice et aux autorités gouvernementales.

## 🎯 Caractéristiques

- **Design professionnel** : Interface inspirée des systèmes gouvernementaux US
- **12 sections principales** couvrant tous les aspects du système judiciaire et gouvernemental
- **Navigation intuitive** avec sidebar extensible
- **Optimisé pour FiveM** : Build léger et performant
- **TypeScript** : Code typé et maintenable
- **Tailwind CSS** : Design moderne et responsive

## 📋 Sections disponibles

### 🦅 Gouverneur de l'État
- Tableau de bord exécutif
- Décrets exécutifs
- État d'urgence
- Nominations & confirmations
- Cabinet & agences d'État
- Relations fédérales
- Grâces & pardons
- Briefings sécurité État

### ⚖️ Département de la Justice (DOJ)
- Centre de commandement DOJ
- Poursuites pénales
- Contentieux civil
- Grand jury
- Accords de plaidoyer
- Division des appels
- Directives & politiques DOJ
- Task forces inter-agences

### 👨‍⚖️ Pouvoir judiciaire
- Gestion des tribunaux
- Collège des juges
- Bureau des procureurs
- Barreau / avocats
- Affaires actives
- Dépôts de dossiers
- Verdicts & condamnations
- Appels judiciaires

### 📜 Actes judiciaires
- Mandats d'arrêt
- Mandats de perquisition
- Assignations
- Ordonnances judiciaires
- Injonctions
- Ordres de saisie

### 👮 Supervision des forces de l'ordre
- Police municipale / Sheriff / State Troopers
- Enquêtes actives
- Affectations DOJ
- Affaires internes
- Rapports d'usage de la force
- Certifications des agents
- Dossiers de radiation

### 🧠 Renseignement & enquêtes
- Renseignement criminel
- Crime organisé
- Crimes financiers
- Corruption publique
- Dossiers fédéraux
- Informateurs confidentiels
- Autorisations d'écoutes

### 🏛️ Affaires législatives
- Rédaction des lois
- Suivi des votes
- Bureau des vétos du gouverneur
- Avis juridiques
- Codification des lois

### 👥 Registres citoyens
- Registre d'identité de l'État
- Antécédents judiciaires (type NCIC)
- Comparutions judiciaires
- Probation & liberté conditionnelle
- Protection des témoins
- Statut migratoire (RP)

### 🔫 Licences & régulation
- Permis armes à feu
- Permis port dissimulé
- Licences commerciales
- Régulation alcool & jeux
- Audiences de révocation

### 💰 Trésor & crimes financiers
- Budget de l'État
- Saisies & confiscations
- Comptes gelés
- Ordonnances de restitution
- Amendes & pénalités
- Lutte anti-blanchiment

### 🏥 Santé & sécurité publique
- Rapports du médecin légiste
- Autopsies judiciaires
- Ordres sanitaires publics
- Quarantaines obligatoires
- Réquisitions médicales

### 🏢 Affaires civiles & entreprises
- Registre des entreprises
- Procédures civiles
- Actions collectives
- Infractions réglementaires

## 🚀 Installation

### Prérequis
- Node.js (v18 ou supérieur)
- npm ou yarn

### Installation de l'UI

```bash
cd ui
npm install
```

## 💻 Développement

### Lancer le serveur de développement
```bash
cd ui
npm run dev
```

L'interface sera accessible sur `http://localhost:5173`

### Build de production
```bash
cd ui
npm run build
```

Les fichiers de production seront générés dans `ui/dist/`

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans `ui/tailwind.config.js` :
- `gov-blue` : Bleu gouvernemental principal
- `gov-blue-dark` : Variante sombre
- `gov-gold` : Accent doré

### Sections
Les sections et sous-sections sont configurables dans `ui/src/data/sections.ts`

## 🔧 Intégration FiveM

Le backend FiveM (ESX) sera ajouté dans une prochaine étape. Cette version contient uniquement l'interface React.

### Structure prévue
```
zdojmdt/
├── ui/                 # Frontend React (actuel)
├── client/            # Scripts client FiveM (à venir)
├── server/            # Scripts serveur FiveM (à venir)
└── fxmanifest.lua     # Manifest FiveM (à venir)
```

## 📦 Technologies utilisées

- **React 18** : Framework UI
- **TypeScript** : Typage statique
- **Vite** : Build tool ultra rapide
- **Tailwind CSS** : Framework CSS utility-first
- **PostCSS** : Traitement CSS

## 🎯 Prochaines étapes

1. ✅ Interface React complète avec tous les onglets
2. ⏳ Backend ESX (callbacks, database)
3. ⏳ Système de permissions par rôle
4. ⏳ Intégration avec les jobs ESX
5. ⏳ Système de notifications
6. ⏳ Logs et audit trail

## 📝 Notes

- L'interface est entièrement en français mais suit la structure US (DOJ, Governor, etc.)
- Optimisée pour un affichage tablette (design responsive)
- Prête pour l'intégration dans FiveM avec NUI

## 🤝 Contribution

Ce projet est en développement actif. Les contributions sont les bienvenues !

## 📄 Licence

Projet personnel pour serveur FiveM

---

**Développé avec ❤️ pour la communauté FiveM RP**
