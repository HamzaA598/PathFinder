from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from .models import *
from django.contrib.auth.hashers import make_password
from django.test import TestCase
import json


# class UniversityTests(APITestCase):
#     def setUp(self):
#         # Create sample data for testing
#         self.university = University.objects.create(name="Test University", _id="1")
#         self.client = APIClient()
#
#     def test_get_all_universities(self):
#         url = reverse('Get All Universities')  # Adjust according to your URL
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_get_university_info_by_id(self):
#         url = reverse('Get University By Id', kwargs={'id': str(self.university._id)})
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_get_university_info_by_name(self):
#         url = reverse('Get University By name', kwargs={'name': self.university.name})
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#
# class CollegeTests(APITestCase):
#     def setUp(self):
#         self.university = University.objects.create(name="Test University", _id="1")
#         self.college = College.objects.create(name="Test College", university=self.university, _id="1")
#         self.client = APIClient()
#
#     def test_get_all_colleges(self):
#         url = reverse('Get All Colleges')  # Adjust according to your URL patterns
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_get_college_info_by_id(self):
#         url = reverse('Get College', kwargs={'id': str(self.college._id)})
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_get_college_info_by_name(self):
#         url = reverse('Get College By name', kwargs={'name': self.college.name})
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_get_colleges_by_university(self):
#         url = reverse('Get College By University', kwargs={'id': str(self.university._id)})
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#
# class AuthTests(APITestCase):
#     def setUp(self):
#         self.student_password = 'password123'
#         self.student = Student.objects.create(
#             name='testuser',
#             email='testuser@example.com',
#             password=make_password(self.student_password),
#             dob='2000-01-01',
#             highSchoolSystem='Some System',
#             governorate='Some Governorate'
#         )
#         self.client = APIClient()
#
#     def test_signup(self):
#         url = reverse('signup')
#         data = {
#             "name": "newuser",
#             "email": "newuser@example.com",
#             "password": "newpassword123",
#             "dob": "2000-01-01",
#             "highSchoolSystem": "Some System",
#             "governorate": "Some Governorate"
#         }
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#
#     def test_login(self):
#         url = reverse('login')
#         data = {
#             "email": self.student.email,
#             "password": self.student_password,
#             "role": "Student"
#         }
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_get_user_from_jwt(self):
#         url = reverse('login')
#         data = {
#             "email": self.student.email,
#             "password": self.student_password,
#             "role": "Student"
#         }
#         response = self.client.post(url, data, format='json')
#         token = response.data['jwt']
#
#         self.client.cookies['jwt'] = token
#         url = reverse('get_user_from_jwt')
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_logout(self):
#         url = reverse('login')
#         data = {
#             "email": self.student.email,
#             "password": self.student_password,
#             "role": "Student"
#         }
#         response = self.client.post(url, data, format='json')
#         token = response.data['jwt']
#
#         self.client.cookies['jwt'] = token
#         url = reverse('logout')
#         response = self.client.post(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)


class EditUniversityTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = UniversityAdmin.objects.create(
            id=1,
            email="Test@Test.com",
            password=make_password("password")
            # Add other required fields as per your model
        )
        self.university = University.objects.create(
            name='Test University',
            admin_id=self.admin.id,
            # Add other required fields as per your model
        )
        self.valid_payload = {
            'university': {
                '_id': str(self.university._id),
                'name': 'Updated University Name',
                # Add other fields you want to update
            }
        }
        self.invalid_university_id_payload = {
            'university': {
                '_id': 'invalid-id',
                'name': 'Updated University Name',
            }
        }
        self.unauthorized_payload = {
            'university': {
                '_id': str(self.university._id),
                'name': 'Updated University Name',
            }
        }

    def test_edit_university_success(self):
        url = reverse('login')
        data = {
            "email": self.admin.email,
            "password": "password",
            "role": "University Admin"
        }
        response = self.client.post(url, data, format='json')
        token = response.data['jwt']

        self.client.cookies['jwt'] = token
        url = reverse('edit-university')
        response = self.client.put(url, data=self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        updated_university = University.objects.get(pk=self.university.pk)
        self.assertEqual(updated_university.name, 'Updated University Name')

    # def test_edit_university_not_found(self):
    #     url = reverse('edit-university')
    #     response = self.client.put(url, data=self.invalid_university_id_payload, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    #     self.assertEqual(response.data['error'], 'University not found')
    #
    # def test_edit_university_unauthorized(self):
    #     url = reverse('edit-university')
    #     response = self.client.put(url, data=self.unauthorized_payload, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    #     self.assertEqual(response.data['error'], 'UNAUTHORIZED')

# Add more tests for other endpoints as needed
