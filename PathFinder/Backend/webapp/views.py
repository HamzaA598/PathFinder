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
from .utils import get_user_from_models, authorize


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
#     university:{
#
#     }
# }
@api_view(['PUT'])
def EditUniversity(request):
    payload = authorize(request)
    try:
        adminId = payload.get('id')
        role = payload.get('role')
        user = get_user_from_models(role, 'id', adminId)
    except Exception:
        return Response('Unauthorized', status=status.HTTP_401_UNAUTHORIZED)

    if not user:
        return
    data = json.loads(request.body.decode('utf-8'))
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
    payload = authorize(request)
    try:
        adminId = payload.get('id')
        role = payload.get('role')
        user = get_user_from_models(role, 'id', adminId)
    except Exception:
        return Response('Unauthorized', status=status.HTTP_401_UNAUTHORIZED)

    if not user:
        return
    data = json.loads(request.body.decode('utf-8'))
    college = data['college']
    try:
        oldCollege = College.objects.get(_id=str(college['_id']))
    except College.DoesNotExist:
        return JsonResponse({'error': 'College not found'}, status=status.HTTP_404_NOT_FOUND)

    if str(adminId) == str(oldCollege.admin_id) or (
            role == "university_admin" and University.objects.get(_id=oldCollege.university).admin_id) == adminId:
        serializer = CollegeSerializer(oldCollege, data=college)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse({'error': 'UNAUTHORIZED'}, status=status.HTTP_401_UNAUTHORIZED)

# {
#     "announcement"{
#           "college or university ID"
#     }
#
# }


@api_view(['POST'])
def addAnnouncement(request):
    payload = authorize(request)
    try:
        adminId = payload.get('id')
        role = payload.get('role')
        user = get_user_from_models(role, 'id', adminId)
    except Exception:
        return Response('Unauthorized', status=status.HTTP_401_UNAUTHORIZED)

    if not user:
        return
    data = json.loads(request.body.decode('utf-8'))
    announcement = data['announcement']

    try:
        if role == "college_admin":
            id = University.objects.get(_id=announcement['college']).admin_id
        else:
            id = University.objects.get(
                _id=announcement['university']).admin_id

        if id != adminId:
            return JsonResponse({'error': 'UNAUTHORIZED'}, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

    serializer = AnnouncementSerializer(data=announcement)

    if role == "college_admin" and hasattr(serializer, "university"):
        return JsonResponse({'error': 'UNAUTHORIZED'}, status=status.HTTP_401_UNAUTHORIZED)

    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def GetAllAnnouncement(request):
    announcements = Announcement.objects.all()
    serializer = AnnouncementSerializer(announcements, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


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

    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

    response = Response()
    response.set_cookie(key='jwt', value=token, httponly=True,
                        expires=datetime.utcnow() + timedelta(hours=24))

    name = user.name if role == "student" else role
    response.data = {
        'message': 'Login successful!',
        'name': name,
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

    name = user.name if role == "student" else role
    return Response({
        'message': 'Authenticated successfully!',
        'id': user.id,
        'name': name,
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


@api_view(['POST'])
def add_college_admin(request):
    payload = authorize(request)
    try:
        role = payload.get('role')
        if role != "university_admin":
            raise Exception('invalid role')
        uni_admin_id = payload.get('id')
        uni_admin = get_user_from_models(role, 'id', uni_admin_id)
    except Exception:
        return Response('Unauthorized', status=status.HTTP_401_UNAUTHORIZED)

    if not uni_admin:
        return

    college_id = request.data.get('college_id')
    college_admin_email = request.data.get('college_admin_email')

    try:
        college = College.objects.get(_id=college_id)

        if College.objects.filter(_id=college_id, admin__isnull=False):
            return Response({"error": "There is already an admin assigned to this college."}, status=status.HTTP_400_BAD_REQUEST)

        college_admin = CollegeAdmin.objects.get(email=college_admin_email)
        college.admin = college_admin
        college.save()

        return Response({'message': "college admin added successfully"}, status=status.HTTP_200_OK)

    except College.DoesNotExist:
        return Response({'error': 'College not found'}, status=status.HTTP_404_NOT_FOUND)
    except CollegeAdmin.DoesNotExist:
        return Response({'error': 'College Admin not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
