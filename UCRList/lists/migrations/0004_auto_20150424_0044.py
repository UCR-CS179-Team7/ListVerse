# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0003_auto_20150423_2336'),
    ]

    operations = [
        migrations.RenameField(
            model_name='listitems',
            old_name='descriptionraw',
            new_name='descriptionmeta',
        ),
    ]
