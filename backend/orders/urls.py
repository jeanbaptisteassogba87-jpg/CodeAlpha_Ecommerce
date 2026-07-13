from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, create_order

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')  # ← AJOUTÉ basename

urlpatterns = [
    path('', include(router.urls)),
    path('create_order/', create_order, name='create_order'),
]