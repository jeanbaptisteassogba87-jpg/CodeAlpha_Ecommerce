from rest_framework import serializers
from .models import Order , OrderItem
from ..products.serializers import ProductSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = OrderItem
        fields = ['id','product','product_id','quantity','price']



class OrderSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name',read_only=True)
    items = OrderItemSerializer(many=True , read_only=True)
    class Meta :
        model = Order
        fields = ['id','user','user_name','total','status','address','created_at']