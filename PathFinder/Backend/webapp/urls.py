from django.urls import path
from . import views

urlpatterns = [
    path('University', views.AllUniversities, name='Get All Universities'),
    path('University/<str:id>', views.UniversityInfoById, name='Get University By Id'),
    path('University/name/<str:name>', views.UniversityInfoByName, name='Get University By name'),
    path('University/edit', views.EditUniversity, name='Edit University'),
    path('University/College/<str:id>', views.CollegeByUniversity, name='Get College By University'),

    path('College', views.AllColleges, name='Get All Colleges'),
    path('College/<str:id>', views.CollegeInfo, name='Get College'),
    path('College/name/<str:name>', views.CollegeInfoByName, name='Get College By name'),
    path('College/edit', views.EditCollege, name='Edit College'),

    path('signup', views.signup, name='signup'),
    path('login', views.login, name='login'),

    path('Announcement/add', views.addAnnouncement, name='Add Announcement'),
    path('Announcement', views.GetAllAnnouncement, name='Get All Announcement'),
]
