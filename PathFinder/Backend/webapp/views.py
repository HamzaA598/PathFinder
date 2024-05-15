from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from django.forms.models import model_to_dict
from .models import *
from django.contrib.auth.hashers import make_password, check_password

from bson import ObjectId


@api_view(['GET'])
def AllUniversities(request):
    universities = University.objects.values('_id', 'name')
    universities = [{'_id': str(
        university['_id']), 'name': university['name']} for university in universities]
    return Response(list(universities), status=status.HTTP_200_OK)


@api_view(['GET'])
def UniversityInfo(request, id):
    university = University.objects.all()
    for uni in university:
        if uni._id == ObjectId(id):
            uni._id = id
            return JsonResponse(model_to_dict(uni), status=status.HTTP_200_OK)

    return Response(status=status.HTTP_404_NOT_FOUND)

# TODO: get all colleges
# TODO: get all colleges of a university by its id
# TODO get a college by id


@api_view(['GET'])
def AllColleges(request):
    colleges = College.objects.values('_id', 'name')
    colleges = [{'_id': str(college['_id']), 'name': college['name']}
                for college in colleges]
    return Response(list(colleges), status=status.HTTP_200_OK)


@api_view(['GET'])
def CollegeInfo(request, id):
    college = College.objects.all()
    for col in college:
        if col._id == ObjectId(id):
            col._id = id
            return JsonResponse(model_to_dict(col), status=status.HTTP_200_OK)

    return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def CollegeByUniversity(request, id):
    universities = University.objects.all()
    for uni in universities:
        if uni._id == ObjectId(id):
            colleges = College.objects.filter(universities=uni)
            colleges = [{'_id': str(college._id), 'name': college.name}
                        for college in colleges]
            return Response(list(colleges), status=status.HTTP_200_OK)


@api_view(['POST'])
def signup(request):
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')
    dob = request.data.get('dob')
    highSchoolSystem = request.data.get('highSchoolSystem')
    governorate = request.data.get('governorate')

    if not all([name, email, password, dob, highSchoolSystem, governorate]):
        return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        if Student.objects.filter(email=email).exists():
            return Response({"error": "A student with this email already exists."}, status=status.HTTP_409_CONFLICT)

        hashed_password = make_password(password)

        student = Student(
            name=name,
            email=email,
            password=hashed_password,
            dob=dob,
            highSchoolSystem=highSchoolSystem,
            governorate=governorate
        )

        if student is not None:
            student.save()
            return Response({"message": "Signup successful!"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "'student' is None. Cannot save."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    role = request.data.get('role')

    if not all([email, password, role]):
        return Response(
            {'error': 'Missing required fields'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = None
        if role == 'Student':
            user = Student.objects.get(email=email)
        elif role == 'University Admin':
            user = UniversityAdmin.objects.get(email=email)
        elif role == 'College Admin':
            user = CollegeAdmin.objects.get(email=email)

        if check_password(password, user.password):
            return Response(
                {'message': 'Login successful', 'id': user.id, 'role': role},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'error': 'Incorrect Email or Password'},
                status=status.HTTP_401_UNAUTHORIZED
            )
    except Student.DoesNotExist:
        return Response(
            {'error': 'Incorrect Email or Password'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    except UniversityAdmin.DoesNotExist:
        return Response(
            {'error': 'Incorrect Email or Password'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    except CollegeAdmin.DoesNotExist:
        return Response(
            {'error': 'Incorrect Email or Password'},
            status=status.HTTP_401_UNAUTHORIZED
        )
