from urllib.parse import parse_qs

from channels.auth import AuthMiddlewareStack
from channels.db import database_sync_to_async
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.db import close_old_connections
from authe.models import User, UuidWebScoket



class JWTAuthMiddleware:
    """Middleware to authenticate user for channels"""

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        close_old_connections()
        uuid = parse_qs(scope["query_string"].decode("utf8")).get('uuid', None)[0]
        scope['user'] = await self.get_user(uuid)
        return await self.app(scope, receive, send)

    @database_sync_to_async
    def get_user(self, uuid):
        try:
            return User.objects.get(ws__uuid=uuid)
        except User.DoesNotExist:
            return AnonymousUser()


def JWTAuthMiddlewareStack(app):
    """This function wrap channels authentication stack with JWTAuthMiddleware."""
    return JWTAuthMiddleware(AuthMiddlewareStack(app))