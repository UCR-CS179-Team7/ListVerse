# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0005_auto_20150414_0052'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='gender',
            field=models.CharField(max_length=2, null=True, choices=[(b'M', b'Male'), (b'F', b'Female'), (b'NA', b'None')]),
        ),
    ]
