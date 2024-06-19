from rest_framework import serializers
from .models import *


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