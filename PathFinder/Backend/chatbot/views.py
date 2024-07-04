import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .utils import authorize


@api_view(['POST'])
def chat(request):
    authorized = authorize(request)
    if not authorized:
        return Response('Unauthorized', status=status.HTTP_401_UNAUTHORIZED)

    # handling missing fields
    if 'sender' not in request.data:
        return Response({"error": "missing sender"})
    if 'message' not in request.data:
        return Response({"error": "missing message"})

    sender = request.data.get('sender')
    message = request.data.get('message')

    # handling empty prompts
    if not message:
        return Response({"error": "prompt should not be empty!"})

    rasa_url = 'http://localhost:5005/webhooks/rest/webhook'

    payload = {
        "sender": sender,
        "message": message
    }

    try:
        response = requests.post(rasa_url, json=payload)
        rasa_response = response.json()

        # handling bad responses
        if 'recipient_id' not in rasa_response[0] or 'text' not in rasa_response[0]:
            return Response({"error": "Bad response"})

        return Response(rasa_response)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
