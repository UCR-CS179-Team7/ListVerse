# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('profiles', '0006_auto_20150415_0656'),
    ]

    operations = [
        migrations.CreateModel(
            name='Following',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('creation_date', models.DateField(auto_now_add=True)),
                ('followee', models.ForeignKey(related_name='followee_set', to=settings.AUTH_USER_MODEL)),
                ('follower', models.ForeignKey(related_name='follower_set', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterField(
            model_name='profile',
            name='gender',
            field=models.CharField(max_length=2, null=True, choices=[('M', 'Male'), ('F', 'Female'), ('NA', 'None')]),
        ),
    ]
