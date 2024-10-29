from rest_framework import serializers
from authe.models import User

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']