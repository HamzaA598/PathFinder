import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
import jwt
from rest_framework import status


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

        # todo: do i need to handle [0]?
        # handling bad responses
        if 'recipient_id' not in rasa_response[0] or 'text' not in rasa_response[0]:
            return Response({"error": "Bad response"})

        return Response(rasa_response)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


def authorize(request):
    token = request.COOKIES.get('jwt')

    print(token)

    if not token:
        return False

    try:
        # TODO: is it ok to use the django secret_key for jwt?
        print(1)

        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        print(payload)

    except jwt.ExpiredSignatureError:
        return False

    user_id = payload.get('id')
    role = payload.get('role')

    print(user_id)
    print(role)
    if not user_id or not role:
        return False

    return True