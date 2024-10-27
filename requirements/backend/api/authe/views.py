from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .serializers import RegisterSerializer, UserInfoSerializer
from rest_framework import status
from django.contrib.auth import authenticate


@api_view(['POST'])
@permission_classes([AllowAny]) 
def login(request):
    emailOrUsername = request.data.get('emailOrUsername')
    passowrd = request.data.get('password')


    user = authenticate(username=email_or_username, password=password)
    
    if user is  None:
        return Response({"msg": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    
    
    userInfo = UserInfoSerializer(user)
    return Response({"msg": "Login successful", "userInfo": userInfo.data})
    


@api_view(['POST'])
@permission_classes([AllowAny]) 
def signUp(request):
    registerSerializer = RegisterSerializer(data=request.data)

    if not registerSerializer.is_valid():
        return  Response(registerSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({'msg': "Account created !"})
