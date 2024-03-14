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


