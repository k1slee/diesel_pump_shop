from rest_framework import serializers
from .models import Category, Product, Order, OrderItem

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    price = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        coerce_to_string=False  # Это ключевое изменение!
    )
    
    class Meta:
        model = Product
        fields = ['id', 'category', 'name', 'slug', 'description', 
                 'price', 'available', 'stock', 'image', 
                 'manufacturer', 'part_number']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'price', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    
    class Meta:
        model = Order
        fields = ['id', 'user', 'first_name', 'last_name', 'email',
                 'address', 'postal_code', 'city', 'country',
                 'paid', 'created', 'updated', 'items']