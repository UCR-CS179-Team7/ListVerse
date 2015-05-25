# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lists', '0012_list_privacy'),
    ]

    operations = [
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('favorite_date', models.DateField(editable=False)),
                ('list', models.ForeignKey(related_name='favorited_by', to='lists.List')),
                ('owner', models.ForeignKey(related_name='favorites', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
