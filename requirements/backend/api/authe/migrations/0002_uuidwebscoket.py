# Generated by Django 4.2.16 on 2024-10-29 09:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authe', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UuidWebScoket',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='ws', serialize=False, to=settings.AUTH_USER_MODEL)),
                ('uuid', models.CharField(default='', max_length=10)),
            ],
        ),
    ]
