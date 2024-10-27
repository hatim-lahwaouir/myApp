

from .views import login, signUp
from django.urls import path

urlpatterns = [
    path('authe/login/', login), 
    path('authe/sign-up/', signUp), 
]
