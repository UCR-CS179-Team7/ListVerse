# Models
from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify
from profiles.models import InterestTopic

import datetime
import itertools


class List(models.Model):
    # MODEL FIELDS
    owner = models.ForeignKey(User)
    title = models.CharField(max_length=128)
    slug = models.CharField(max_length=128, null=False, unique=True)
    pub_date = models.DateField(editable=False)
    edit_date = models.DateField()
    num_items = models.PositiveSmallIntegerField()

    def update_timestamps(self):
        if not self.id:
            self.pub_date = datetime.datetime.today()
        self.edit_date = datetime.datetime.today()

    def _handle_dup_slug(self, original_slug):
        for i in itertools.count(1):
            slug ='{0}/{1}'.format(original_slug, i)
            if not List.objects.filter(slug=slug).exists():
                return slug
        #should not happen
        return original_slug


    def _create_slug(self):
        d = self.pub_date
        slugified_owner = slugify(self.owner)
        slugified_title = slugify(self.title)
        slug_fields = (d.year, d.month, d.day, slugified_owner, \
                self.num_items, slugified_title)
        slug = '{0}/{1}/{2}/{3}/{4}/{5}'.format(*slug_fields)

        if List.objects.filter(slug=slug).exists():
            slug = self._handle_dup_slug(slug)

        return slug

    def add_slug(self):
        if not self.id:
            self.slug = self._create_slug()

    def save(self, *args, **kwargs):
        self.update_timestamps()
        self.add_slug()
        super(List, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

class ListItem(models.Model):
    #MODEL FIELDS
    listid = models.ForeignKey(List)
    title = models.CharField(max_length=128)
    descriptionhtml = models.CharField(max_length=8192)
    descriptionmeta = models.CharField(max_length=8192)
    #body = models.CharField(max_length=1024)
    #contentalt = models.CharField(max_length=1024, blank=True)
    #contenturi = models.CharField(max_length=256, blank=True)
    
class TopicTag(models.Model):
    # topic is tied to the choices as InterestTopic
	list = models.ForeignKey(List)
	topic = models.IntegerField(choices=InterestTopic.TOPIC_CHOICES)

'''
    Notes for List and ListItems models
    ----------------------------------------
    Content-Types supported:
        - text
        - photo
        - quote
        - link
        - video
        - audio
    ListItems requirements for each content type:
        !!! title and body is required for all list items
    Text
        defaults are fine ( body will be considered the "text" )
    Photo | link | video | audio
        contenturi is required
    Quote
        contentalt is required

'''
