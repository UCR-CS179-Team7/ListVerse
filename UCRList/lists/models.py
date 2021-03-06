# Models
from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify
from profiles.models import InterestTopic

from friendship.models import Friend

import datetime
import itertools

class List(models.Model):
    PUBLIC_VISIBILITY = 1
    PRIVATE_VISIBILITY = 2
    FRIENDS_VISIBILITY = 3

    PRIVACY_LEVELS = (
        (PUBLIC_VISIBILITY, 'Public'),
        (PRIVATE_VISIBILITY, 'Private'),
        (FRIENDS_VISIBILITY, 'Friends'),
    )

    # MODEL FIELDS

    owner = models.ForeignKey(User)
    title = models.CharField(max_length=128)
    slug = models.CharField(max_length=128, null=False, unique=True)
    pub_date = models.DateField(editable=False)
    edit_date = models.DateField()
    num_items = models.PositiveSmallIntegerField()
    privacy = models.PositiveIntegerField(choices=PRIVACY_LEVELS, default=PUBLIC_VISIBILITY)

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

    def sufficent_view_permissions(self, user):
        privacy = self.privacy
        owner = self.owner

        if privacy == self.PUBLIC_VISIBILITY or user == owner:
            return True
        elif privacy == self.PRIVATE_VISIBILITY:
            return False
        elif privacy == self.FRIENDS_VISIBILITY:
            return Friend.objects.are_friends(owner, user)
        else:
            return False

    @staticmethod
    def filter_unviewable_lists(lists, user):
        return [l for l in lists if l.sufficent_view_permissions(user)]

    @staticmethod
    def filter_own_lists(lists, user):
        return [l for l in lists if l.owner != user]

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

class BrowseHistory(models.Model):
    user = models.ForeignKey(User)
    list = models.ForeignKey(List)
    timestamp = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    list = models.ForeignKey(List, related_name='comments')
    owner = models.ForeignKey(User, related_name='comment_history')
    content = models.CharField(max_length=8192)
    pub_date = models.DateField(editable=False)
    edit_date = models.DateField()

    def update_timestamps(self):
        if not self.id:
            self.pub_date = datetime.datetime.today()
        self.edit_date = datetime.datetime.today()

    def save(self, *args, **kwargs):
        self.update_timestamps()
        super(Comment, self).save(*args, **kwargs)

class Reblog(models.Model):
    list = models.ForeignKey(List, related_name='reblogs')
    owner = models.ForeignKey(User, related_name='reblogs')
    reblog_date = models.DateField(editable=False)

    def save(self, *args, **kwargs):
        if not self.id:
            self.reblog_date = datetime.datetime.today()
        super(Reblog, self).save(*args, **kwargs)

class Like(models.Model):
    list = models.ForeignKey(List, related_name='likes')
    owner = models.ForeignKey(User, related_name='likes')
    like_date = models.DateField(editable=False)

    def save(self, *args, **kwargs):
        if not self.id:
            self.like_date = datetime.datetime.today()
        super(Like, self).save(*args, **kwargs)

class Favorite(models.Model):
    list = models.ForeignKey(List, related_name='favorited_by')
    owner = models.ForeignKey(User, related_name='favorites')
    favorite_date = models.DateField(editable=False)

    def save(self, *args, **kwargs):
        if not self.id:
            self.favorite_date = datetime.datetime.today()
        super(Favorite, self).save(*args, **kwargs)

