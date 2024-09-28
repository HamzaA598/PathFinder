from .models import Student, UniversityAdmin, CollegeAdmin
import jwt
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed


def get_user_from_models(role, field, value):
    model = {
        'student': Student,
        'university_admin': UniversityAdmin,
        'college_admin': CollegeAdmin,
    }.get(role)

    if not model:
        raise ValueError("Invalid role")
    user = model.objects.get(**{field: value})
    return user


def authorize(request):
    token = request.COOKIES.get('jwt')

    if not token:
        return 'Unauthenticated'

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return 'Unauthenticated'

    user_id = payload.get('id')
    name = payload.get('name')
    role = payload.get('role')

    if not user_id or not name or not role:
        raise AuthenticationFailed('Invalid payload!')

    return payload
