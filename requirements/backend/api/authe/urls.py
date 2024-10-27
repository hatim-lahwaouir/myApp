

from .views import login, signUp
from django.urls import path

urlpatterns = [
    path('login/', login), 
    path('sign-up/', signUp), 
]
