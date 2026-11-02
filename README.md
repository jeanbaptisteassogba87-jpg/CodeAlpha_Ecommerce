# 🛍️ Mon Shop — E-commerce Full Stack

Projet réalisé dans le cadre du stage **Full Stack Development** chez [CodeAlpha](https://www.codealpha.tech) — Tâche 1 : *Simple E-commerce Store*.

Site e-commerce complet permettant à un utilisateur de parcourir des produits, créer un compte, gérer un panier, et passer une commande, avec une interface d'administration Django pour la gestion des produits et des commandes.

---

## 📋 Sommaire

- [Fonctionnalités](#-fonctionnalités)
- [Stack technique](#-stack-technique)
- [Structure du projet](#-structure-du-projet)
- [Installation](#-installation)
- [Identifiants de test](#-identifiants-de-test)
- [Endpoints API](#-endpoints-api)
- [Captures d'écran](#-captures-décran)
- [Améliorations possibles](#-améliorations-possibles)

---

## ✨ Fonctionnalités

**Côté visiteur (sans compte)**
- Parcourir tous les produits disponibles
- Rechercher un produit par nom
- Filtrer par catégorie et par fourchette de prix
- Consulter le détail d'un produit (description, stock, images)
- Ajouter des produits au panier sans être connecté

**Côté utilisateur connecté**
- Inscription et connexion sécurisées (JWT)
- Gestion du panier : ajout, modification de quantité, suppression
- Passage de commande avec adresse de livraison
- Historique des commandes et détail de chaque commande
- Vérification du stock disponible avant ajout au panier

**Côté administration (Django Admin)**
- Gestion des produits (ajout, modification, images, stock)
- Gestion des utilisateurs
- Suivi des commandes passées

---

## 🛠 Stack technique

| Côté | Technologies |
|---|---|
| **Frontend** | HTML5, CSS3 (design personnalisé), JavaScript (ES Modules, Vanilla), Bootstrap 5, Google Material Symbols |
| **Backend** | Django 6, Django REST Framework |
| **Authentification** | JWT via `djangorestframework-simplejwt` |
| **Base de données** | SQLite (développement local) |
| **Autres** | `django-cors-headers` pour la communication frontend/backend |

---

## 📁 Structure du projet

```
CodeAlpha_Ecommerce/
├── backend/
│   ├── ecommerce_api/       # Configuration Django (settings, urls)
│   ├── products/            # App produits (modèle, API, images)
│   ├── users/               # App utilisateurs (modèle User personnalisé, auth)
│   ├── orders/              # App commandes (Order, OrderItem, création de commande)
│   ├── media/                # Images produits uploadées
│   └── manage.py
│
└── frontend/
    ├── index.html            # Accueil : liste des produits, recherche, filtres
    ├── login.html            # Connexion
    ├── register.html         # Inscription
    ├── product-detail.html   # Détail produit
    ├── cart.html             # Panier
    ├── checkout.html         # Passage de commande
    ├── orders.html           # Historique des commandes
    ├── order-detail.html     # Détail d'une commande
    ├── order-confirmation.html
    ├── css/
    │   └── style.css         # Design complet du site
    └── js/
        ├── config.js         # URL de l'API
        ├── auth.js           # login, register, logout, gestion du token
        ├── products.js       # Chargement des produits
        ├── product-detail.js # Chargement d'un produit précis
        ├── cart.js           # Gestion du panier (localStorage)
        ├── orders.js         # Historique des commandes
        └── register.js       # Logique du formulaire d'inscription
```

---

## 🚀 Installation

### Prérequis
- Python 3.10+
- Un navigateur récent

### 1. Cloner le dépôt

```bash
git clone git@github.com:jeanbaptisteassogba87-jpg/CodeAlpha_Ecommerce.git
cd CodeAlpha_Ecommerce
```

### 2. Lancer le backend (Django)

```bash
cd backend
python3 -m venv env
source env/bin/activate        # sous Linux/Mac
pip install -r requirements.txt

python manage.py migrate
python manage.py runserver
```

Le backend est accessible sur **http://127.0.0.1:8000/**.

### 3. Lancer le frontend

Dans un second terminal :

```bash
cd frontend
python3 -m http.server 5500
```

Le site est accessible sur **http://127.0.0.1:5500/index.html**.

> ⚠️ Le backend doit tourner en même temps que le frontend pour que le site fonctionne (l'API est appelée depuis `js/config.js`).

### Configuration pour la mise en ligne

Avant de publier le frontend, remplace l'adresse locale dans `frontend/js/config.js` par l'adresse publique de l'API. Le backend doit recevoir ces variables d'environnement :

```text
DJANGO_DEBUG=False
DJANGO_SECRET_KEY=<une clé secrète privée>
DJANGO_ALLOWED_HOSTS=<domaine de l'API>
CORS_ALLOWED_ORIGINS=<adresse du frontend>
DATABASE_URL=<adresse de la base PostgreSQL>
```

La clé secrète ne doit pas être ajoutée au dépôt. En production, Django refuse de démarrer si `DEBUG` est désactivé sans `DJANGO_SECRET_KEY`. Sans réglage de base de données, le projet continue d'utiliser SQLite en local. Pour SQL Server ou Azure SQL, définis `DATABASE_ENGINE=mssql`, puis `SQL_DATABASE`, `SQL_USER`, `SQL_PASSWORD` et `SQL_HOST` (le port `1433` est utilisé par défaut). `DATABASE_URL` reste l'option PostgreSQL.

Pour Render avec PostgreSQL, le backend se configure avec le dossier racine `backend`, la commande de build `pip install -r requirements.txt && python manage.py collectstatic --no-input && python manage.py migrate` et la commande de démarrage `gunicorn ecommerce_api.wsgi:application --bind 0.0.0.0:$PORT`. Publie `frontend` comme site statique. Après création des deux services, renseigne leurs domaines dans `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS` et `frontend/js/config.js`. Pour SQL Server, il faut utiliser un serveur SQL accessible depuis l'hébergeur, par exemple Azure SQL ; Render ne fournit que PostgreSQL comme base relationnelle gérée.

### Déploiement Azure avec SQL Server

Le dépôt contient aussi un `requirements.txt` à sa racine qui pointe vers les dépendances du backend. Pour Azure App Service, choisis Linux et Python 3.12 ou plus récent. Dans **Deployment Center**, connecte le dépôt GitHub et déploie la branche `main`. Dans **Configuration > General settings**, utilise cette commande de démarrage :

```text
cd backend && gunicorn ecommerce_api.wsgi:application --bind=0.0.0.0:8000
```

Dans **Environment variables**, configure `DJANGO_DEBUG=False`, `DJANGO_SECRET_KEY` (une valeur générée et privée), `DJANGO_ALLOWED_HOSTS=<nom-app>.azurewebsites.net`, `CORS_ALLOWED_ORIGINS=<URL-du-site-statique>`, `DATABASE_ENGINE=mssql`, `SQL_DATABASE`, `SQL_USER`, `SQL_PASSWORD`, `SQL_HOST` et `SQL_PORT=1433`. Dans Azure SQL, récupère `SQL_HOST` sous la forme `<nom-serveur>.database.windows.net`.

Crée ensuite un site **Azure Static Web Apps** lié au même dépôt et à la branche `main`, avec `frontend` comme emplacement de l'application, sans emplacement d'API ni commande de build. Copie son URL dans `CORS_ALLOWED_ORIGINS`, puis remplace l'adresse locale dans `frontend/js/config.js` par `https://<nom-app>.azurewebsites.net/api/` et pousse ce changement.

Après le premier déploiement, ouvre la console SSH de l'App Service et exécute `cd /home/site/wwwroot/backend && python manage.py migrate`. Tu peux ensuite créer un administrateur avec `python manage.py createsuperuser`. Dans le pare-feu réseau du serveur Azure SQL, autorise les adresses sortantes affichées dans **Properties** de l'App Service. Évite d'autoriser toutes les ressources Azure pour une base qui contient des données réelles.

---

## 🔑 Accès administrateur et compte de test

Aucun identifiant n'est fourni dans ce dépôt pour des raisons de sécurité. Pour créer ton propre compte administrateur après l'installation :

```bash
python manage.py createsuperuser
```

Suis les instructions (email, nom, mot de passe), puis connecte-toi sur **http://127.0.0.1:8000/admin/**.

Pour tester le site en tant que client, crée un compte directement depuis la page d'inscription (`register.html`).

---

## 🔌 Endpoints API

| Méthode | Endpoint | Description | Auth requise |
|---|---|---|---|
| GET | `/api/products/` | Liste des produits | Non |
| GET | `/api/products/<id>/` | Détail d'un produit | Non |
| POST | `/api/users/` | Inscription | Non |
| POST | `/api/token/` | Connexion (obtenir un token JWT) | Non |
| GET | `/api/orders/` | Historique des commandes de l'utilisateur | Oui |
| GET | `/api/orders/<id>/` | Détail d'une commande | Oui |
| POST | `/api/create_order/` | Créer une commande à partir du panier | Oui |

L'authentification se fait via un header `Authorization: Bearer <token>`.

---

## 📸 Captures d'écran

*(à ajouter : capture de la page d'accueil, du détail produit, et du panier)*

---

## 🔧 Améliorations possibles

- Ajout d'un système de refresh token pour éviter la reconnexion après expiration
- Pagination des produits sur l'accueil
- Système d'avis et de notation des produits
- Notifications par email lors de la validation d'une commande
- Déploiement en production (actuellement pensé pour un usage local/démo)

---

## 👤 Auteur

Projet réalisé par **Jean-Baptiste Assogba** dans le cadre du stage CodeAlpha (Full Stack Development).
