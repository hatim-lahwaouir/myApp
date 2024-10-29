from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from authe.models import User
import string
import random




@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_uuid(request):
    user = User.objects.filter(pk=request.user.id).first()

    ws = None
    if user.ws is None:
        ws = UuidWebScoket(user=request.user.id)
    else:
        ws = user.ws
        
        ws.uuid = ''.join(random.choices(string.ascii_letters, k=30))
        ws.save()


    return Response({"uuid": uuid })

