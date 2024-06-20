from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['name', 'email', 'password',
                  'dob', 'highSchoolSystem', 'governorate']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(StudentSerializer, self).create(validated_data)


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ['_id', 'name', 'email', 'Address', 'description', 'admin', 'FacebookPage', 'Fax', 'PhoneNumber',
                  'Rank', 'UniversityPresidents', 'Website', 'YearFounded']


class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = '__all__'
