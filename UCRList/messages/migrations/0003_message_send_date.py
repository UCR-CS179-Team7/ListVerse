# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messages', '0002_auto_20150430_0030'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='send_date',
            field=models.DateField(auto_now_add=True, null=True),
        ),
    ]
