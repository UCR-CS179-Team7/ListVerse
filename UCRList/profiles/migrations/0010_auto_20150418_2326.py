# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0009_merge'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='gender',
            field=models.CharField(max_length=2, choices=[('M', 'Male'), ('F', 'Female'), ('NA', 'None')], default='NA'),
        ),
    ]
