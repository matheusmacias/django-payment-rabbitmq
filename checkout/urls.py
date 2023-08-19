from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('generate_public_key/', views.generate_public_key, name='generate_public_key'),
]
