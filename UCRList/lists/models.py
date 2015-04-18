from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class List(models.Model):
    # MODEL CHOICES
    TEXT  = 'TXT'
    PHOTO = 'PTO'
    QUOTE = 'QOT'
    LINK  = 'LNK'
    VIDEO = 'VID'
    AUDIO = 'AUD'
    CONTENT_TYPE_CHOICES = (
        (TEXT, 'Text'), (PHOTO, 'Photo'), (QUOTE, 'Quote'),
        (LINK, 'Link'), (VIDEO, 'Video'), (AUDIO, 'Audio'),
    ) ## CONTENT_TYPE_CHOICES

    # MODEL FIELDS
    owner = models.ForeignKey(User)
    pub_date = models.DateField(auto_now_add=True)
    edit_date = models.DateField(auto_now=True)
    content_type = models.CharField(max_length=3, choices=CONTENT_TYPE_CHOICES, default=TEXT)

class ListItems(models.Model):
    #MODEL CHOICES

    #MODEL FIELDS
    listid = models.ForeignKey(List)
    title = models.CharField(max_length=128)
    body = models.CharField(max_length=1024)
    contentalt = models.CharField(max_length=1024, blank=True)
    contenturi = models.CharField(max_length=256, blank=True)

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
