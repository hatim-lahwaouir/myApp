from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .serializers import RegisterSerializer, UserInfoSerializer
from rest_framework import status
from django.contrib.auth import authenticate
from .models import User
from django.db.models import Q
from rest_framework_simplejwt.tokens import RefreshToken


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['POST'])
@permission_classes([AllowAny]) 
def login(request):
    email = request.data.get('email', '')
    print(request.data)
    password = request.data.get('password', '')

    user = User.objects.filter(email=email).first()

    if user is  None:
        return Response({"msg": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    if not user.check_password(password):
        return Response({"msg": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

     
    userInfo = UserInfoSerializer(user)
    return Response({"msg": "Login successful", "userInfo": userInfo.data, "tokens" : get_tokens_for_user(user)})



@api_view(['POST'])
@permission_classes([AllowAny]) 
def signUp(request):
    registerSerializer = RegisterSerializer(data=request.data)

    if not registerSerializer.is_valid():
        return  Response(registerSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    registerSerializer.create(registerSerializer.validated_data)
    
    return Response({'msg': "Account created !"})
 