# mysite/asgi.py
import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
from game.routing import websocket_urlpatterns
django_asgi_app = get_asgi_application()
from .webSocketAuth import JWTAuthMiddlewareStack



application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": JWTAuthMiddlewareStack(
            URLRouter(websocket_urlpatterns)
        ),
    }  
)