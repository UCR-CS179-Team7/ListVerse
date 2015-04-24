from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify
# Create your models here.
class List(models.Model):
    # MODEL FIELDS
    owner = models.ForeignKey(User)
    title = models.CharField(max_length=128)
    slug = models.CharField(max_length=128, null=False, unique=True)
    pub_date = models.DateField(auto_now_add=True)
    edit_date = models.DateField(auto_now=True)
    num_items = models.PositiveSmallIntegerField()

    def create_slug(self):
        d = self.pub_date
        slugified_title = slugify(self.title)
        slug_fields = (d.year, d.month, d.day, slugified_title)
        return '{0}/{1}/{2}/{3}'.format(*slug_fields)


    def save(self):
        super(List, self).save()
        self.slug = self.create_slug()
        super(List, self).save()

    def __str__(self):
        return self.title

class ListItem(models.Model):
    #MODEL CHOICES

    #MODEL FIELDS
    listid = models.ForeignKey(List)
    title = models.CharField(max_length=128)
    descriptionhtml = models.CharField(max_length=8192)
    descriptionmeta = models.CharField(max_length=8192)
    #body = models.CharField(max_length=1024)
    #contentalt = models.CharField(max_length=1024, blank=True)
    #contenturi = models.CharField(max_length=256, blank=True)

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
