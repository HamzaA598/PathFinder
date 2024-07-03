from .models import Student, UniversityAdmin, CollegeAdmin
import jwt
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed


def get_user_from_models(role, key, value):
    user = None
    if role == 'Student':
        user = Student.objects.get(**{key: value})
    elif role == 'University Admin':
        user = UniversityAdmin.objects.get(**{key: value})
    elif role == 'College Admin':
        user = CollegeAdmin.objects.get(**{key: value})

    return user


def authorize(request):
    token = request.COOKIES.get('jwt')

    if not token:
        return 'Unauthenticated'

    try:
        # TODO: is it ok to use the django secret_key for jwt?
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return 'Unauthenticated'

    user_id = payload.get('id')
    role = payload.get('role')

    if not user_id or not role:
        raise AuthenticationFailed('Invalid payload!')

    return payload
