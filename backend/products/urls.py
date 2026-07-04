from django.urls import path , include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet
from ..orders.urls import urlpatterns

router = DefaultRouter()
router.register(r'products',ProductViewSet)

urlpatterns = [
    path('',include(router.urls)),
]