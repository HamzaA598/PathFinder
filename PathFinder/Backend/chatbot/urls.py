from django.urls import path
from . import views

urlpatterns = [
    path('', views.endpoint),
    path('chat/', views.chatbot, name='chatbot'),
]