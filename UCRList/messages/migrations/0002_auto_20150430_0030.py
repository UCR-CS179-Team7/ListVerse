# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messages', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='type',
            field=models.CharField(max_length=2, choices=[(b'LN', b'List Notification'), (b'GN', b'General Message')]),
        ),
    ]
