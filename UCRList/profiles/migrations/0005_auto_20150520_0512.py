# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0004_auto_20150518_0618'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='FriendCircle',
            new_name='Circle',
        ),
        migrations.RenameModel(
            old_name='FriendCircleRelation',
            new_name='CircleRelation',
        ),
        migrations.RenameField(
            model_name='circlerelation',
            old_name='friend',
            new_name='followee',
        ),
    ]
