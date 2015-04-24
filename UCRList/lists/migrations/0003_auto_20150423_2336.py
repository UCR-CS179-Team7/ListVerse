# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0002_auto_20150418_2326'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='list',
            name='content_type',
        ),
        migrations.RemoveField(
            model_name='listitems',
            name='body',
        ),
        migrations.RemoveField(
            model_name='listitems',
            name='contentalt',
        ),
        migrations.RemoveField(
            model_name='listitems',
            name='contenturi',
        ),
        migrations.AddField(
            model_name='list',
            name='num_items',
            field=models.PositiveSmallIntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='listitems',
            name='descriptionhtml',
            field=models.CharField(default='<div><p>one-off</p></div>', max_length=8192),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='listitems',
            name='descriptionraw',
            field=models.CharField(default='one-off', max_length=8192),
            preserve_default=False,
        ),
    ]
