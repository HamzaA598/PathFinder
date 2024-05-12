from django.urls import path
from . import views

urlpatterns = [
    path('University', views.AllUniversities, name='GetAllUniversities'),
    path('University/<str:id>', views.UniversityInfoById, name='GetUniversityById'),
    path('University/name/<str:name>', views.UniversityInfoByName, name='GetUniversityByname'),
    path('University/edit', views.EditUniversity, name='EditUniversity'),
    path('University/College/<str:id>', views.CollegeByUniversity, name='GetCollegeByUniversity'),

    path('College', views.AllColleges, name='GetAllColleges'),
    path('College/<str:id>', views.CollegeInfo, name='GetCollege'),
    path('College/name/<str:name>', views.CollegeInfoByName, name='GetCollegeByname'),
    path('College/edit', views.EditCollege, name='EditCollege'),
]