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
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('pub_date', models.DateField(auto_now_add=True)),
                ('edit_date', models.DateField(auto_now=True)),
                ('content_type', models.CharField(default='TXT', max_length=3, choices=[('TXT', 'Text'), ('PTO', 'Photo'), ('QOT', 'Quote'), ('LNK', 'Link'), ('VID', 'Video'), ('AUD', 'Audio')])),
                ('owner', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ListItems',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('title', models.CharField(max_length=128)),
                ('body', models.CharField(max_length=1024)),
                ('contentalt', models.CharField(max_length=1024, blank=True)),
                ('contenturi', models.CharField(max_length=256, blank=True)),
                ('listid', models.ForeignKey(to='lists.List')),
            ],
        ),
    ]
