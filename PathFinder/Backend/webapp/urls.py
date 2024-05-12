from django.urls import path
from . import views

urlpatterns = [
    path('University', views.EditUniversity, name='EditUniversity'),
    path('University', views.AllUniversities, name='GetAllUniversities'),
    path('University/<str:id>', views.UniversityInfo, name='GetUniversity'),
    path('University/College/<str:id>', views.CollegeByUniversity, name='GetCollegeByUniversity'),

    path('College', views.EditCollege, name='EditCollege'),
    path('College', views.AllColleges, name='GetAllColleges'),
    path('College/<str:id>', views.CollegeInfo, name='GetCollege'),
]