import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse

# endpoints
@api_view(['GET'])
def endpoint(request):
    person = {'name': 'test name', 'age': 11}
    return Response(person)

@api_view(['POST'])
def chat_with_bot(request):
    if request.method == 'POST':
        text = request.data.get('text')

        rasa_url = 'http://localhost:5005/model/parse'

        payload = {
            "sender": "user",
            "text": text
        }

        try:
            response = requests.post(rasa_url, json=payload)
            
            rasa_response = response.json()
            
            return Response(rasa_response)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
