# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lists', '0008_auto_20150504_2146'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('content', models.CharField(max_length=8192)),
                ('pub_date', models.DateField(editable=False)),
                ('edit_date', models.DateField()),
                ('list', models.ForeignKey(related_name='comments', to='lists.List')),
                ('owner', models.ForeignKey(related_name='comment_history', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
