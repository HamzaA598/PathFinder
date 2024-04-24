from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse

from bson import ObjectId
from django.forms.models import model_to_dict
from .models import *

from django.core.exceptions import ValidationError


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
    age = request.data.get('age')
    preferences = request.data.get('preferences')
    gradeInHighSchool = request.data.get('highSchoolGrade')
    highSchoolSystem = request.data.get('highSchoolSystem')

    if not all([name, email, password, age, preferences, gradeInHighSchool, highSchoolSystem]):
        return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        student = Student(
            name=name,
            email=email,
            password=password,
            age=age,
            preferences=preferences,
            gradeInHighSchool=gradeInHighSchool,
            highSchoolSystem=highSchoolSystem,
        )

        if student is not None:
            student.save()
            return Response({"message": "Signup successful"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "'student' is None. Cannot save."}, status=status.HTTP_400_BAD_REQUEST)

    except ValidationError as ve:
        return Response({"error": str(ve)}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
