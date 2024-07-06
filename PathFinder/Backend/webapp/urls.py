from django.urls import path
from . import views

urlpatterns = [
    path('University', views.AllUniversities, name='Get All Universities'),
    path('University/<str:id>', views.UniversityInfoById,
         name='Get University By Id'),
    path('University/name/<str:name>', views.UniversityInfoByName,
         name='Get University By name'),
    path('University/edit/', views.EditUniversity, name='Edit University'),
    path('University/College/<str:id>', views.CollegeByUniversity,
         name='Get College By University'),

    path('College', views.AllColleges, name='Get All Colleges'),
    path('College/<str:id>', views.CollegeInfo, name='Get College'),
    path('College/name/<str:name>', views.CollegeInfoByName,
         name='Get College By name'),
    path('College/edit/', views.EditCollege, name='Edit College'),

    path('signup', views.signup, name='signup'),
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('get_user_from_jwt', views.get_user_from_jwt, name='get_user_from_jwt'),

    path('Announcement/add', views.addAnnouncement, name='Add Announcement'),
    path('Announcement', views.GetAllAnnouncement, name='Get All Announcement'),

    path('add_college_admin', views.add_college_admin, name='Add College Admin'),
    path('get_university_of_admin/<int:id>',
         views.get_university_of_admin, name='Get University of Admin'),
]
