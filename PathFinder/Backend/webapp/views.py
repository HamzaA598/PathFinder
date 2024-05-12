from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.core.serializers import deserialize
import json
from bson import ObjectId
from django.forms.models import model_to_dict
from .models import *
from .serializers import *


@api_view(['GET'])
def AllUniversities(request):
    universities = University.objects.values('_id', 'name')
    universities = [{'_id': str(university['_id']), 'name': university['name']} for university in universities]
    return Response(list(universities), status=status.HTTP_200_OK)


@api_view(['GET'])
def UniversityInfo(request, id):
    try:
        university = University.objects.get(_id=id)
        return JsonResponse(model_to_dict(university), status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'University not found'}, status=status.HTTP_404_NOT_FOUND)



# TODO: get all colleges
# TODO: get all colleges of a university by its id
# TODO get a college by id

@api_view(['GET'])
def AllColleges(request):
    colleges = College.objects.values('_id', 'name')
    colleges = [{'_id': str(college['_id']), 'name': college['name']} for college in colleges]
    return Response(list(colleges), status=status.HTTP_200_OK)

@api_view(['GET'])
def CollegeInfo(request, id):
    try:
        college = College.objects.get(_id=id)
        return JsonResponse(model_to_dict(college), status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'college not found'}, status=status.HTTP_404_NOT_FOUND)

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