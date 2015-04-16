# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='gender',
            field=models.CharField(default=b'NA', max_length=2, choices=[(b'M', b'Male'), (b'F', b'Femail'), (b'NA', b'None')]),
        ),
    ]
