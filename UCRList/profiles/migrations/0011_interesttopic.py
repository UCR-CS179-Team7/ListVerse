# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('profiles', '0010_auto_20150418_2326'),
    ]

    operations = [
        migrations.CreateModel(
            name='InterestTopic',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('topic', models.IntegerField(choices=[(1, 'Music'), (2, 'Movies'), (3, 'TV'), (4, 'Science'), (5, 'Politics')])),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
