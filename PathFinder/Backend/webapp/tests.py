from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from .models import *
from django.contrib.auth.hashers import make_password
from django.test import TestCase
import json


class UniversityTests(APITestCase):
    def setUp(self):
        # Create sample data for testing
        self.university = University.objects.create(name="Test University", _id="1")
        self.client = APIClient()

    def test_get_all_universities(self):
        url = reverse('Get All Universities')  # Adjust according to your URL
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_university_info_by_id(self):
        url = reverse('Get University By Id', kwargs={'id': str(self.university._id)})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_university_info_by_name(self):
        url = reverse('Get University By name', kwargs={'name': self.university.name})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class CollegeTests(APITestCase):
    def setUp(self):
        self.university = University.objects.create(name="Test University", _id="1")
        self.college = College.objects.create(name="Test College", university=self.university, _id="1")
        self.client = APIClient()

    def test_get_all_colleges(self):
        url = reverse('Get All Colleges')  # Adjust according to your URL patterns
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_college_info_by_id(self):
        url = reverse('Get College', kwargs={'id': str(self.college._id)})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_college_info_by_name(self):
        url = reverse('Get College By name', kwargs={'name': self.college.name})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_colleges_by_university(self):
        url = reverse('Get College By University', kwargs={'id': str(self.university._id)})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


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

        self.client.cookies['jwt'] = token
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

        self.client.cookies['jwt'] = token
        url = reverse('logout')
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class EditUniversityTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = UniversityAdmin.objects.create(
            id=3,
            email="Test@Test.com",
            password=make_password("password")
            # Add other required fields as per your model
        )
        self.university = University.objects.create(
            _id="1",
            name='Test University',
            admin_id=3,
            # Add other required fields as per your model
        )
        self.college = College.objects.create(
            _id="1",
            name='Test College',
            university="1",
            admin_id=5,
            # Add other required fields as per your model
        )
        self.payload = {
            'university': {
                '_id': str(self.university._id),
                'name': 'Updated University Name',
                "City": "Cairo",
                "email": "dd@dd.com",
                "Region": "El Sherouk City",
                "PhoneNumber": "26890000 , 26300013/14/15/16/17/18 (02)22243086 (010)  ,11296757 (010) , 00967735 (010)Hotline : 19283",
                "Fax:": "26300020 ,26300010 (02)",
                "Website": "http://www.bue.edu.eg/",
                "FacebookPage": "https://www.facebook.com/britishuniversityegypt",
                "Address": "Shorouk city, Suez road, Cairo",
                "YearFounded": "2024",
                "CentralLibrary": "The library of the British University in Egypt :Contains a wide range of books, references, in addition to the digital library include journals that meet all the needs of the academic programs and interests.The library job training and mentoring for university students in order to achieve the maximum benefit from the sources of the library, whether paper or electronic.",
                "Playgrounds": "Courts of the British University :football courts, volleyball, basketball, tennis ground, in addition to a swimming pool.",
                "RankingsAccordingtoWebmetrics": "2760",
                "RankingsAccordingtoShanghaiUniversity": "Out of classification",
                "Rank": "12",
                "admin_id": 4,
                "Fax": "facts",
                "UniversityPresidents": "ay had",
                "description": "cdyan",
                "email": "ada@aaa.com"
            }
        }
        self.college_payload = {
            'college': {
                '_id': str(self.college._id),
                'name': 'Updated College Name',
                "City": "Cairo",
                "Region": "Abbasiya",
                "PhoneNumber": "(02) 26855585",
                "Fax": "Unknown",
                "Website": "http://cis.asu.edu.eg/",
                "FacebookPage": "https://www.facebook.com/fciseg",
                "Address": "Within the campus of the University of ain Shams, el Khalifa el maamoun St., Heliopolis, Cairo.",
                "Location": "",
                "YearFounded": "1995",
                "BriefHistory": "FCI was founded in 1995 under Resolution No. 419 of 1995, and the study began in the academic year 1996/1997, and resources Faculty of computers and information, ain Shams University to grant a Bachelor of computing and information in computer systems and scientific calculations and bioinformatics.",
                "FacultyDeans": "Prof. Dr. Mohamed Fahmy Tolba from 1996 to August 2002Prof.Dr. Mohamed Saed Abd El Wahab from August 2002 to Jul. 2005Prof. Dr. Mohamed Essam Khalifa from August 2005 to Jul. 2010Prof. Dr. Mohamed Ismael Roshdy from August 2010 till now",
                "Departments": "Scientific calculationsInformation systemsBasic informationComputer ScienceSystems bus",
                "AdmissionRequirements": "1 - The student who is advanced to college must have high school Division of mathematics.2. get the minimum degree for admission to the College determined by the Coordination Office each year.",
                "AdmissionCertificates": "Public secondary (Scientific section - Math)The American diplomaBritish diploma",
                "DegreesAwarded": "Bachelor's degreeDiplomaMasters degreeDoctorate",
                "DiplomaPrograms": "The College offers diploma degree in the following programs :First : graduate studies in the analysis of business computing1 - the diploma of the analysis of the computerization of the core business2 - the diploma of the analysis of computerized business advancedSecond : postgraduate diploma in bioinformatics1 - diploma bioinformatics core2 - diploma in bioinformatics advancedThird : postgraduate diploma in business analysis1 - diploma in business analysis core2 - diploma in business analysis advancedFourth : diploma of Information Technology and business ( professional diploma for two years )",
                "MasterPrograms": "The College offers a master's degree in computer and Information Sciences in the following disciplines :1 - Computer Science2 - information systems3 - scientific calculations4 - systems of computers5 - Information Technology vital.",
                "PHDPrograms": "The College awards doctoral degrees in Computer Science and information in the following specialties :1 - Computer Science2 - information systems3 - scientific calculations4 - systems of computers5 - Information Technology vital.",
                "noOfYears": "4",
                "SpecializationYear": "The first academic year",
                "CreditHours": "Available",
                "AcceptationPercentage-2017": "Coordination of the academic year 2017/2018 : 89%",
                "AcceptationPercentageScientificDivision-2018": "91.83%",
                "AcceptationPercentageScientificDivision-2019": "92.56%",
                "university": "1"
            }
        }

        self.student = Student.objects.create(
            name='testuser',
            email='testuser@example.com',
            password=make_password("pass"),
            dob='2000-01-01',
            highSchoolSystem='Some System',
            governorate='Some Governorate'
        )

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
        url = reverse('Edit University')
        response = self.client.put(url, data=self.payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        updated_university = University.objects.get(pk=self.university.pk)
        self.assertEqual(updated_university.name, 'Updated University Name')

    def test_edit_university_unauthorized(self):
        url = reverse('login')
        data = {
            "email": self.student.email,
            "password": "pass",
            "role": "Student"
        }
        response = self.client.post(url, data, format='json')
        token = response.data['jwt']

        self.client.cookies['jwt'] = token

        url = reverse('Edit University')
        response = self.client.put(url, data=self.payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_college_success(self):
        url = reverse('login')
        data = {
            "email": self.admin.email,
            "password": "password",
            "role": "University Admin"
        }
        response = self.client.post(url, data, format='json')
        token = response.data['jwt']

        self.client.cookies['jwt'] = token
        url = reverse('Edit College')
        response = self.client.put(url, data=self.college_payload, format='json')
        try:
            self.assertEqual(response.status_code, status.HTTP_200_OK)
        except AssertionError as e:
            print(f"AssertionError: {e}")
            print(f"Response content: {response.content.decode('utf-8')}")
            raise

# Add more tests for other endpoints as needed
