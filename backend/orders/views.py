from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Order, OrderItem
from .serializers import OrderSerializer
from products.models import Product

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.none()  # ← AJOUTÉ
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    cart = request.data.get('cart', [])
    if not cart:
        return Response({'error': 'Panier vide'}, status=400)

    total = 0
    order_items = []

    for item in cart:
        try:
            product = Product.objects.get(id=item['productId'])
        except Product.DoesNotExist:
            return Response({'error': f'Produit {item["productId"]} introuvable'}, status=404)

        quantity = item['quantity']
        if quantity > product.stock:
            return Response({'error': f'Stock insuffisant pour {product.name}'}, status=400)

        total += product.price * quantity
        order_items.append({'product': product, 'quantity': quantity, 'price': product.price})

    order = Order.objects.create(
        user=request.user,
        total=total,
        status='En attente',
        address=request.data.get('address', 'Adresse non fournie')
    )

    for item in order_items:
        OrderItem.objects.create(
            order=order,
            product=item['product'],
            quantity=item['quantity'],
            price=item['price']
        )
        item['product'].stock -= item['quantity']
        item['product'].save()

    return Response({
        'order_id': order.id,
        'total': order.total,
        'status': order.status,
        'message': 'Commande créée avec succès'
    })