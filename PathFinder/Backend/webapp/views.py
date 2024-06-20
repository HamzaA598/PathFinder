from datetime import datetime, timedelta
from django.db import transaction
from django.conf import settings
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from django.forms.models import model_to_dict
from django.contrib.auth.hashers import check_password

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed

import json
import jwt

from .models import *
from .serializers import *


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
        colleges = [{'_id': str(college._id), 'name': college.name}
                    for college in colleges]
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
    serializer = SignupSerializer(data=request.data)

    if serializer.is_valid():
        if Student.objects.filter(email=serializer.validated_data['email']).first():
            return Response({"error": "A student with this email already exists."}, status=status.HTTP_409_CONFLICT)

        try:
            with transaction.atomic():
                serializer.save()
            return Response({"message": "Signup successful!"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    email = serializer.validated_data['email']
    password = serializer.validated_data['password']
    role = serializer.validated_data['role']

    try:
        user = get_user_from_models(role, 'email', email)
    except (Student.DoesNotExist, UniversityAdmin.DoesNotExist, CollegeAdmin.DoesNotExist):
        return Response(
            {'error': 'User not found!'},
            status=status.HTTP_404_NOT_FOUND
        )

    if not check_password(password, user.password):
        return Response(
            {'error': 'Incorrect Email or Password'},
            status=status.HTTP_401_UNAUTHORIZED
        )

    # JWT
    payload = {
        'id': user.id,
        'role': role,
        "exp": datetime.utcnow() + timedelta(hours=24),
        "iat": datetime.utcnow(),
    }

    # TODO: is it ok to use the django secret_key for jwt?
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

    response = Response()
    response.set_cookie(key='jwt', value=token, httponly=True,
                        expires=datetime.utcnow() + timedelta(hours=24))
    response.data = {
        # TODO: should i put the id or role here again?
        'message': 'Login successful!',
        'name': user.name,
        'jwt': token
    }
    response.status_code = status.HTTP_200_OK

    return response


@api_view(['GET'])
def get_user_from_jwt(request):
    token = request.COOKIES.get('jwt')

    if not token:
        return Response({
            'message': 'Unauthenticated'
        }, status=status.HTTP_401_UNAUTHORIZED)

    try:
        # TODO: is it ok to use the django secret_key for jwt?
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return Response({
            'message': 'Unauthenticated'
        }, status=status.HTTP_401_UNAUTHORIZED)

    user_id = payload.get('id')
    role = payload.get('role')

    if not user_id or not role:
        raise AuthenticationFailed('Invalid payload!')

    try:
        user = get_user_from_models(role, 'id', user_id)
    except (Student.DoesNotExist, UniversityAdmin.DoesNotExist,
            CollegeAdmin.DoesNotExist):
        return Response(
            {'error': 'User not found!'},
            status=status.HTTP_404_NOT_FOUND
        )

    return Response({
        'message': 'Authenticated successfully!',
        'id': user.id,
        'name': user.name,
        'role': role
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def logout(request):
    response = Response()
    response.delete_cookie('jwt')
    response.data = {
        'message': 'Logout successful'
    }
    return response

# utils


def get_user_from_models(role, field, value):
    model = {
        'Student': Student,
        'University Admin': UniversityAdmin,
        'College Admin': CollegeAdmin,
    }.get(role)

    if not model:
        raise ValueError("Invalid role")

    user = model.objects.get(**{field: value})
    return user
