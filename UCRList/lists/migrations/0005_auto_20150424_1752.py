# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lists', '0004_auto_20150424_0044'),
    ]

    operations = [
        migrations.CreateModel(
            name='ListItem',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=128)),
                ('descriptionhtml', models.CharField(max_length=8192)),
                ('descriptionmeta', models.CharField(max_length=8192)),
                ('listid', models.ForeignKey(to='lists.List')),
            ],
        ),
        migrations.RemoveField(
            model_name='listitems',
            name='listid',
        ),
        migrations.DeleteModel(
            name='ListItems',
        ),
    ]
