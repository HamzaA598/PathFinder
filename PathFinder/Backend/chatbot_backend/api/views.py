from rest_framework.response import Response

from rest_framework.decorators import api_view

# endpoints
@api_view(['GET'])
def endpoint(request):
    person = {'name': 'test name', 'age': 11}
    return Response(person)
