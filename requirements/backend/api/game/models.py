from django.db import models
from authe.models import User
import random
import string

# Create your models here.


def generate_random_game_id():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=10))

class Game(models.Model):
    gameId = models.CharField(max_length=10, default=generate_random_game_id, unique=True)
    players = models.ManyToManyField(User, related_name='games')

class Scores(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)