import json
from channels.generic.websocket import WebsocketConsumer
import time


 

class GameConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
    def disconnect(self, close_code):
        pass
    def receive(self, text_data):
        print(text_data)
        self.send(text_data=json.dumps({
            'message': "message"
        }))











class GameQueue(WebsocketConsumer):
    def connect(self):
        self.accept()
    def disconnect(self, close_code):
        pass
    def receive(self, text_data):
        print(text_data)
        self.send(text_data=json.dumps({
            'message': "message"
        }))
