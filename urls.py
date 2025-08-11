from django.urls import path, re_path
from backend.views import CategoryList, ProductList, ProductDetail, OrderCreate
from django.views.generic import TemplateView  # Добавьте этот импорт
from django.contrib import admin

urlpatterns = [

     # 1. Админка Django
    path('admin/', admin.site.urls),

    path('api/categories/', CategoryList.as_view(), name='category-list'),
    path('api/products/', ProductList.as_view(), name='product-list'),
    path('api/products/<slug:slug>/', ProductDetail.as_view(), name='product-detail'),
    path('api/orders/create/', OrderCreate.as_view(), name='order-create'),
    
  
      # Catch-all для фронтенда
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]