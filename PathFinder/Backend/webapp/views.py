from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse

from bson import ObjectId
from django.forms.models import model_to_dict
from .models import *


@api_view(['GET'])
def AllUniversities(request):
    universities = University.objects.values('_id', 'name')
    universities = [{'_id': str(university['_id']), 'name': university['name']} for university in universities]
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
    colleges = [{'_id': str(college['_id']), 'name': college['name']} for college in colleges]
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
            colleges = [{'_id': str(college._id), 'name': college.name} for college in colleges]
            return Response(list(colleges), status=status.HTTP_200_OK)