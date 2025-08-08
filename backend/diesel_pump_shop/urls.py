from django.urls import path, re_path
from .views import CategoryList, ProductList, ProductDetail, OrderCreate
from django.views.generic import TemplateView  # Добавьте этот импорт

urlpatterns = [
    path('api/categories/', CategoryList.as_view(), name='category-list'),
    path('api/products/', ProductList.as_view(), name='product-list'),
    path('api/products/<slug:slug>/', ProductDetail.as_view(), name='product-detail'),
    path('api/orders/create/', OrderCreate.as_view(), name='order-create'),
    
    # Добавьте catch-all маршрут в самый конец
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]