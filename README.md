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

---

## 🔑 Identifiants de test

| Rôle | Email | Mot de passe |
|---|---|---|
| Superutilisateur (admin) | `nexor@gmail.com` | `nexor123` |
| Utilisateur standard | `test@test.com` | `test123` |

L'espace d'administration Django est accessible sur **http://127.0.0.1:8000/admin/**.

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
