from django.urls import path
from . import views

urlpatterns = [
    path('University', views.AllUniversities, name='GetAllUniversities'),
    path('University/<str:id>', views.UniversityInfo, name='GetUniversity'),
]