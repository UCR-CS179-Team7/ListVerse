# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lists', '0009_comment'),
    ]

    operations = [
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('like_date', models.DateField(editable=False)),
                ('list', models.ForeignKey(related_name='likes', to='lists.List')),
                ('owner', models.ForeignKey(related_name='likes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Reblog',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('reblog_date', models.DateField(editable=False)),
                ('list', models.ForeignKey(related_name='reblogs', to='lists.List')),
                ('owner', models.ForeignKey(related_name='reblogs', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
