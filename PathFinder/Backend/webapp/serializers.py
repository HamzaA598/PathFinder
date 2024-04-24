from rest_framework import serializers
from .models import *

class UniversitySerializer(serializers.ModelSerializer):
 class Meta:
        model = University
        fields = [ 'name', 'email', 'Address', 'description', 'admin', 'FacebookPage', 'Fax', 'PhoneNumber', 'Rank', 'UniversityPresidents', 'Website', 'YearFounded']
