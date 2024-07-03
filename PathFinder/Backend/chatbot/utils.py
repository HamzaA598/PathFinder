from django.conf import settings
import jwt


def authorize(request):
    token = request.COOKIES.get('jwt')

    print(token)

    if not token:
        return False

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])

    except jwt.ExpiredSignatureError:
        return False

    user_id = payload.get('id')
    role = payload.get('role')

    if not user_id or not role:
        return False

    return True
