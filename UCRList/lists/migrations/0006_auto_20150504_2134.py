# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lists', '0005_auto_20150424_1752'),
    ]

    operations = [
        migrations.CreateModel(
            name='TopicTags',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('topic', models.IntegerField(choices=[(1, b'Music'), (2, b'Movies'), (3, b'TV'), (4, b'Science'), (5, b'Politics')])),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterField(
            model_name='list',
            name='edit_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='list',
            name='pub_date',
            field=models.DateField(editable=False),
        ),
    ]
