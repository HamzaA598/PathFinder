import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import google.generativeai as genai
import os
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

        # todo: do i need to handle [0]?
        # handling bad responses
        if 'recipient_id' not in rasa_response[0] or 'text' not in rasa_response[0]:
            answer = askChatGPT(message)
            return Response(answer)

        if rasa_response == "عذرًا، لم أفهم ذلك تمامًا. هل يمكنك إعادة صياغتها؟" or rasa_response == "أنا آسف، لم أفهم ذلك جيدًا. هل بإمكانك إعادة الصياغة؟" or rasa_response == "عذرًا، لم يتسنى لي فهم ذلك تمامًا. هل يمكنك تعديل ما قلت؟":
            answer = askChatGPT(message)
            return Response(answer)
        return Response(rasa_response)
    except Exception as e:
        answer = askChatGPT(message)
        return Response(answer)


def askChatGPT(message):
    genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    response = model.generate_content([message])
    print(response.text)
    return response.text
