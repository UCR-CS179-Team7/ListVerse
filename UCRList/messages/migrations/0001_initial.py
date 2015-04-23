# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('type', models.CharField(max_length=2, choices=[('FR', 'Friend Request'), ('FN', 'Follow Notice'), ('GN', 'General Message')])),
                ('content', models.CharField(max_length=100)),
                ('from_user', models.ForeignKey(related_name='sender', to=settings.AUTH_USER_MODEL)),
                ('to_user', models.ForeignKey(related_name='receiver', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
