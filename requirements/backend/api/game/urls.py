

from .views import get_uuid
from django.urls import path


urlpatterns = [
    path('get_uuid/', get_uuid), 
]
