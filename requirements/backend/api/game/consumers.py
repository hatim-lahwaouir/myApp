import json
from channels.generic.websocket import AsyncWebsocketConsumer
import time
import redis
from django.contrib.auth.models import AnonymousUser
from .serializers import UserInfoSerializer
from .models import Game
import urllib.parse
from channels.db import database_sync_to_async
from authe.models import User
from channels.db import database_sync_to_async

Redis = redis.Redis(host='redis', port=6379, decode_responses=True)
 

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']

        ismember  =  Redis.sismember(str(self.user.id), "game_queue")
        
        print(ismember)
        if ismember:
            print("*****YES*******************")
        
        if not self.user.is_authenticated or ismember:
            return

        try:
            query_string = urllib.parse.parse_qs(self.scope['query_string'].decode())
            game_id = query_string.get('gameId', [''])[0]
        except:
            game_id = ''

        if not game_id or not self.can_play(game_id):
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
        self.gn = str(self.user.id) + '_gq'

        ismember  = Redis.sismember(str(self.user.id), "game_queue")

        if not self.user or ismember:
            return
        
        await self.channel_layer.group_add(
            self.gn,
            self.channel_name
        )
        await self.accept()

        # keep track of User in game loop
        Redis.sadd( "game_queue", str(self.user.id))

        # waiting unil  we have four players then we start the game

        Redis.rpush("game_list", str(self.user.id))

        await self.channel_layer.group_send(
                   self.gn,
                    {
                            "type": "hello.game",
                    }
        )       
        if Redis.llen("game_list") >= 4:
            users_ids = Redis.lrange("game_list", 0, 4)
            UsersInfoData = await self.get_users_data(users_ids)
            game = await self.create_game(users_ids)
             
            for user_id in users_ids:
                await self.channel_layer.group_send(
                   str(user_id) + '_gq',
                    {
                            "type": "join.game",
                            "users" : UsersInfoData,
                            "gameId": game.gameId,
                    }
            )
            self.close()
            Redis.srem("game_queue", user_id)
 
    @database_sync_to_async
    def create_game(self, users_ids):
        game = Game.objects.create()
        game.players.add(*User.objects.filter(id__in=users_ids))
        return game

    @database_sync_to_async
    def get_users_data(self, users_ids):
        usersData = User.objects.filter(id__in=users_ids)
        return UserInfoSerializer(usersData, many=True).data
  
    async def disconnect(self, close_code):
        if self.user:
            await self.channel_layer.group_discard(
                self.gn,
                self.channel_name
            )
            Redis.srem("game_queue", str(self.user.id))

    async def receive(self, text_data):
        pass


    async def hello_game(self, data):
        await self.send(text_data=json.dumps(data))
    async def join_game(self, data):
        await self.send(text_data=json.dumps(data))