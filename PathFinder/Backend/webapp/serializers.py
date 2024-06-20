from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['name', 'email', 'password',
                  'dob', 'highSchoolSystem', 'governorate']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(SignupSerializer, self).create(validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    role = serializers.ChoiceField(
        choices=['student', 'university_admin', 'college_admin'])


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ['_id', 'name', 'email', 'Address', 'description', 'admin', 'FacebookPage', 'Fax', 'PhoneNumber',
                  'Rank', 'UniversityPresidents', 'Website', 'YearFounded']


class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = '__all__'


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'
