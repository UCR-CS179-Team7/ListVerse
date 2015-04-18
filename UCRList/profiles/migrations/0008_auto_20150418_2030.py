# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0007_auto_20150418_1925'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='following',
            name='followee',
        ),
        migrations.RemoveField(
            model_name='following',
            name='follower',
        ),
        migrations.DeleteModel(
            name='Following',
        ),
    ]
