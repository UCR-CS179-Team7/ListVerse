# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_friendcircle_friendcirclerelation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='friendcirclerelation',
            name='friend',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
    ]
