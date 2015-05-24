# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0011_merge'),
    ]

    operations = [
        migrations.AddField(
            model_name='list',
            name='privacy',
            field=models.PositiveIntegerField(default=1, choices=[(1, b'Public'), (2, b'Private'), (3, b'Friends')]),
        ),
    ]
