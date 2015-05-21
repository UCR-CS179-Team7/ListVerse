# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('friendship', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('profiles', '0002_profile_avatar'),
    ]

    operations = [
        migrations.CreateModel(
            name='FriendCircle',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('circleName', models.CharField(max_length=100)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='FriendCircleRelation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('circle', models.ForeignKey(to='profiles.FriendCircle')),
                ('friend', models.ForeignKey(to='friendship.Friend')),
            ],
        ),
    ]
