# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0007_auto_20150504_2135'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='topictag',
            name='user',
        ),
        migrations.AddField(
            model_name='topictag',
            name='list',
            field=models.ForeignKey(default=10, to='lists.List'),
            preserve_default=False,
        ),
    ]
