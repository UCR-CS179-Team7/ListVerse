# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lists', '0006_auto_20150504_2134'),
    ]

    operations = [
        migrations.CreateModel(
            name='TopicTag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('topic', models.IntegerField(choices=[(1, b'Music'), (2, b'Movies'), (3, b'TV'), (4, b'Science'), (5, b'Politics')])),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='topictags',
            name='user',
        ),
        migrations.DeleteModel(
            name='TopicTags',
        ),
    ]
