import json
from channels.generic.websocket import AsyncWebsocketConsumer
import time
import redis
from django.contrib.auth.models import AnonymousUser
from .serializers import UserInfoSerializer
from .models import Game
import urllib.parse
from channels.db import database_sync_to_async


Redis = redis.Redis(host='redis', port=6379, decode_responses=True)


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']

        ismember  = await Redis.sismember(str(self.user.id), "game_queue")
        if not self.user.is_authenticated or ismember:
            return
    

        query_string = urllib.parse.parse_qs(self.scope['query_string'].decode())
        game_id = query_string.get('gameId', [None])[0]

        if not self.can_play(game_id):
            return
        await self.accept()


    @database_sync_to_async
    def can_play(self, game_id):
        game = Game.objects.filter(gameId=game_id).prefetch_related('players').first()
        if not game  or not  game.users.filter(id=self.user.id).exists():
            return False
        self.game = game
        return True



    def disconnect(self, close_code):
        pass
    def receive(self, text_data):
        pass




class GameQueue(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']

        ismember  = await Redis.sismember(str(self.user.id), "game_queue")
        if not self.user.is_authenticated or ismember:
            return
        
        self.gn = str(self.user.id)  + '_gq'
        await self.channel_layer.group_add(
            self.gn,
            self.channel_name
        )
        await self.accpet()   

        # keep track of User in game loop
        await Redis.sadd(str(self.user.id), "game_queue")

        # waiting unil  we have four players then we start the game
        await Redis.rpush(str(self.user.id), "game_list")
        self.accept()


        game = Game()

        if await Redis.llen("game_list") >= 4:
            users = lrange("game_list", 0, 4)
            usersData = User.objects.filter(id__in=users)
            game.add(usersData)
            game.save()

            UsersInfo = UserInfoSerializer(usersData, many=True)
            
            GameQueu
            for user in users:
                await self.channel_layer.group_send(
                   str(user.id) + '_gq',
                    {
                            "type": "join.game",
                            "users" : UsersInfo,
                            "gameId": game.gameId,
                    }
            )
            self.close()
            Redis.srem("game_queue", user)




    async def disconnect(self, close_code):
        if self.user.is_authenticated:
            await self.channel_layer.group_discard(
                self.gn,
                self.channel_name
            )
            rmem.srem("game_queue", str(self.user.id))

    async def receive(self, text_data):
        pass


    async def game_list(self, data):
        self.send(text_data=json.dumps(data))
