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
from collections import deque 
# Redis = redis.Redis(host='redis', port=6379, decode_responses=True)
import asyncio


def getGameId(params):
    try:
        query_string = urllib.parse.parse_qs(params)
        game_id = query_string.get('gameId', [''])[0]
    except:
        game_id = None
    
    return  game_id


def  createMap():
    pass



dq = deque([])
gameQueue = set()
gameSet = set()
gameMap  = {}
playerPosition  = {}
playersDirection  = {}






def generateMap():
    mp = []
    size = 20
    for i in range(size):
        row =  []
        for j in range(size):
            if j == 0 or i == 0  or i == size - 1 or j == size - 1:
                row.append('1')
            else:
                row.append('0')

        mp.append(row)


    return mp





m  =  generateMap()
m[10][10] = '1'
m[11][10] = '1'


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        global gameSet
        global playerPosition
        self.user = self.scope['user']

        # ismember  =  Redis.sismember(str(self.user.id), "game_queue")
        
        game_id = getGameId(self.scope['query_string'].decode())
        self.gn = str(game_id) + '_game'
        if not self.user.is_authenticated  or not game_id or self.user.id in gameSet:
            return
        

        
        if not game_id or not self.can_play(game_id):
            return
        
        await self.channel_layer.group_add(
            self.gn,
            self.channel_name
        )
        gameSet.add(self.user.id)
        await self.accept()

        playerPosition[self.user.id] = [40 , 40]
        playersDirection[self.user.id] = 0
        asyncio.create_task(self.game_loop())
     
    async def game_loop(self):
        
        while True:
            await self.channel_layer.group_send(
                    self.gn,
                        {
                                "type": "wellcom.game",
                                "user"  : {"username" : self.user.username , "id" : self.user.id},
                                "map" : m,
                                "playersPosition" : playerPosition,
                                "playersDirection" : playersDirection,
                        }
            )
            await asyncio.sleep(1/60)
  
    async def wellcom_game(self, data):
        await self.send(text_data=json.dumps(data))
 
    @database_sync_to_async
    def can_play(self, game_id):
        game = Game.objects.filter(gameId=game_id).prefetch_related('players').first()
        if not game  or not  game.users.filter(id=self.user.id).exists():
            return False
        self.game = game
        return True

 

    async def disconnect(self, close_code):
        gameSet.discard(self.user.id)
        if self.user.is_authenticated:
            await self.channel_layer.group_discard(
                self.gn,
                self.channel_name
            )
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        move = text_data_json.get('move')

        if not  move:
            return
        # const allowedKeys = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];
        vitess = 8
        rotationVitess = 0.06
        if move == "ArrowUp":
            playerPosition[self.user.id][1] -= vitess
        if move == "ArrowDown":
            playerPosition[self.user.id][1] += vitess
 

        if move == "ArrowRight":
            playerPosition[self.user.id][0] += vitess
        if move == "ArrowLeft":
            playerPosition[self.user.id][0] -= vitess

        if move == 'A' or move == 'a':
            playersDirection[self.user.id] -= rotationVitess
        if move == 'D' or move == 'd':
            playersDirection[self.user.id] += rotationVitess

 
        if playersDirection[self.user.id] < 0:
            playersDirection[self.user.id] =  ((-1 * playersDirection[self.user.id]) % 360) * -1  
        else:
            playersDirection[self.user.id] = playersDirection[self.user.id] % 360 



class GameQueue(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        self.gn = str(self.user.id) + '_gq'

        # ismember  = Redis.sismember(str(self.user.id), "game_queue")

        if not self.user.is_authenticated:
            return
        await self.channel_layer.group_add(
            self.gn,
            self.channel_name
        )

        if self.user.id in gameQueue or self.user.id in gameSet:
            await self.close()
            return

        gameQueue.add(self.user.id)
        dq.append(self.user.id) 
 
        await self.accept()
        # keep track of User in game loop
        # Redis.sadd( "game_queue", str(self.user.id))

        # waiting unil  we have four players then we start the game

        # Redis.rpush("game_list", str(self.user.id))

        await self.channel_layer.group_send(
                   self.gn,
                    {
                            "type": "hello.game",
                    }
        ) 
   
 
        if len(dq) == 2:
            users_ids = []
            for _ in range(2):
                users_ids.append(dq.popleft())
                gameQueue.discard(users_ids[-1])
            # users_ids = Redis.lrange("game_list", 0, 4)
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
        # if the client who disconnect then we are going to remove them from our memmory 
        if close_code == 1000 or close_code == 1001:
            gameQueue.discard(self.user.id)
            dq.remove(self.user.id)

        if self.user.is_authenticated:
            await self.channel_layer.group_discard(
                self.gn,
                self.channel_name
            )
            # Redis.srem("game_queue", str(self.user.id))

    async def receive(self, text_data):
        pass


    async def hello_game(self, data):
        await self.send(text_data=json.dumps(data))
    async def join_game(self, data):
        await self.send(text_data=json.dumps(data))