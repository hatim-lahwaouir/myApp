# chat/routing.py
from django.urls import path

from . import consumers
   
websocket_urlpatterns = [
    path("ws/Game/", consumers.GameConsumer.as_asgi()),
    path("ws/GameQueue/", consumers.GameQueue.as_asgi()),
] 