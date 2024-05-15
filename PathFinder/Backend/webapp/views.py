from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
import json
from bson import ObjectId
from django.forms.models import model_to_dict
from .models import *
from .serializers import *
from django.contrib.auth.hashers import make_password, check_password


@api_view(['GET'])
def AllUniversities(request):
    universities = University.objects.values('_id', 'name')
    universities = [{'_id': str(
        university['_id']), 'name': university['name']} for university in universities]
    return Response(list(universities), status=status.HTTP_200_OK)


@api_view(['GET'])
def UniversityInfoById(request, id):
    try:
        university = University.objects.get(_id=id)
        return JsonResponse(model_to_dict(university), status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'University not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def UniversityInfoByName(request, name):
    try:
        universities = University.objects.filter(name__icontains=name)
        universities = UniversitySerializer(universities, many=True).data
        return Response(list(universities), status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'University not found'}, status=status.HTTP_404_NOT_FOUND)



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
    try:
        college = College.objects.get(_id=id)
        return JsonResponse(model_to_dict(college), status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'college not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def CollegeInfoByName(request, name):
    try:
        colleges = College.objects.filter(name__icontains=name)
        colleges = CollegeSerializer(colleges, many=True).data
        return Response(list(colleges), status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'University not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def CollegeByUniversity(request, id):
    try:
        colleges = College.objects.filter(university=id)
        colleges = [{'_id': str(college._id), 'name': college.name} for college in colleges]
        return Response(list(colleges), status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'University not found'}, status=status.HTTP_404_NOT_FOUND)


# {
#     adminId: id
#     university:{
#
#     }
# }
@api_view(['PUT'])
def EditUniversity(request):
    data = json.loads(request.body.decode('utf-8'))
    adminId = data['adminId']
    university = data['university']
    try:
        oldUniversity = University.objects.get(_id=str(university['_id']))
    except University.DoesNotExist:
        return JsonResponse({'error': 'University not found'}, status=status.HTTP_404_NOT_FOUND)
    if adminId == oldUniversity.admin_id:
        serializer = UniversitySerializer(oldUniversity, data=university)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse({'error': 'UNAUTHORIZED'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['PUT'])
def EditCollege(request):
    data = json.loads(request.body.decode('utf-8'))
    adminId = data['adminId']
    role = data['role']
    college = data['college']
    try:
        oldCollege = University.objects.get(_id=str(college['_id']))
    except College.DoesNotExist:
        return JsonResponse({'error': 'University not found'}, status=status.HTTP_404_NOT_FOUND)
    if adminId == str(oldCollege.admin_id) or (role == "UniversityAdmin" and University.objects.get(_id=oldCollege.university).admin_id) == adminId:
        serializer = CollegeSerializer(oldCollege, data=college)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse({'error': 'UNAUTHORIZED'}, status=status.HTTP_401_UNAUTHORIZED)

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
