# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='List',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('pub_date', models.DateField(auto_now_add=True)),
                ('edit_date', models.DateField(auto_now=True)),
                ('content_type', models.CharField(choices=[('TXT', 'Text'), ('PTO', 'Photo'), ('QOT', 'Quote'), ('LNK', 'Link'), ('VID', 'Video'), ('AUD', 'Audio')], max_length=3, default='TXT')),
                ('owner', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ListItems',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('title', models.CharField(max_length=128)),
                ('body', models.CharField(max_length=1024)),
                ('contentalt', models.CharField(max_length=1024, blank=True)),
                ('contenturi', models.CharField(max_length=256, blank=True)),
                ('listid', models.ForeignKey(to='lists.List')),
            ],
        ),
    ]
