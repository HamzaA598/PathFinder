from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from .models import University, College, Student
from django.contrib.auth.hashers import make_password
import json

class UniversityTests(APITestCase):
    def setUp(self):
        # Create sample data for testing
        self.university = University.objects.create(name="Test University")
        self.client = APIClient()

    def test_get_all_universities(self):
        url = reverse('Get All Universities')  # Adjust according to your URL
        print("111111111111")
        print(url)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_get_university_info_by_id(self):
    #     url = reverse('Get University By Id', kwargs={'id': str(self.university._id)})
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_university_info_by_name(self):
        url = reverse('Get University By name', kwargs={'name': self.university.name})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class CollegeTests(APITestCase):
    def setUp(self):
        self.university = University.objects.create(name="Test University")
        self.college = College.objects.create(name="Test College", university=self.university)
        self.client = APIClient()

    def test_get_all_colleges(self):
        url = reverse('Get All Colleges')  # Adjust according to your URL patterns
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_get_college_info_by_id(self):
    #     url = reverse('Get College', kwargs={'id': str(self.college._id)})
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_college_info_by_name(self):
        url = reverse('Get College By name', kwargs={'name': self.college.name})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_get_colleges_by_university(self):
    #     url = reverse('Get College By University', kwargs={'id': str(self.university._id)})
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

class AuthTests(APITestCase):
    def setUp(self):
        self.student_password = 'password123'
        self.student = Student.objects.create(
            name='testuser',
            email='testuser@example.com',
            password=make_password(self.student_password),
            dob='2000-01-01',
            highSchoolSystem='Some System',
            governorate='Some Governorate'
        )
        self.client = APIClient()

    def test_signup(self):
        url = reverse('signup')
        data = {
            "name": "newuser",
            "email": "newuser@example.com",
            "password": "newpassword123",
            "dob": "2000-01-01",
            "highSchoolSystem": "Some System",
            "governorate": "Some Governorate"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login(self):
        url = reverse('login')
        data = {
            "email": self.student.email,
            "password": self.student_password,
            "role": "Student"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_from_jwt(self):
        url = reverse('login')
        data = {
            "email": self.student.email,
            "password": self.student_password,
            "role": "Student"
        }
        response = self.client.post(url, data, format='json')
        token = response.data['jwt']

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        url = reverse('get_user_from_jwt')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logout(self):
        url = reverse('login')
        data = {
            "email": self.student.email,
            "password": self.student_password,
            "role": "Student"
        }
        response = self.client.post(url, data, format='json')
        token = response.data['jwt']

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        url = reverse('logout')
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# Add more tests for other endpoints as needed
