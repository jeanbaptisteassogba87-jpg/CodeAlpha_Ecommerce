import os
import sys
import django

# Ajouter le chemin du backend
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce_api.settings')
django.setup()

from products.models import Product

produits = [
    {'name': 'T-shirt Noir', 'description': 'T-shirt en coton, noir', 'price': 25.00, 'stock': 50},
    {'name': 'Jean Bleu', 'description': 'Jean slim en denim', 'price': 59.99, 'stock': 30},
    {'name': 'Chemise Blanche', 'description': 'Chemise blanche en coton', 'price': 39.99, 'stock': 25},
    {'name': 'Veste Cuir', 'description': 'Veste en cuir véritable', 'price': 120.00, 'stock': 10},
    {'name': 'Baskets Sport', 'description': 'Baskets confortables', 'price': 45.00, 'stock': 20},
    {'name': 'Casquette', 'description': 'Casquette ajustable', 'price': 15.00, 'stock': 40},
    {'name': 'Montre Connectée', 'description': 'Montre avec suivi d\'activité', 'price': 89.99, 'stock': 15},
    {'name': 'Sac à Dos', 'description': 'Sac imperméable 20L', 'price': 34.99, 'stock': 12},
]

for data in produits:
    Product.objects.create(**data)

print(f"✅ {len(produits)} produits ajoutés")