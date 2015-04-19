# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='list',
            name='slug',
            field=models.CharField(max_length=128, default='asfasf', unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='list',
            name='title',
            field=models.CharField(max_length=128, default='asfasfasfas'),
            preserve_default=False,
        ),
    ]
