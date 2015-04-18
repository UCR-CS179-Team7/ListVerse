from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class List(models.Model):
    # MODEL CHOICES

    # MODEL FIELDS
    owner = models.ForeignKey(User)
    pub-date =
    edit-date =
    content-type =

class ListItems(models.Model):
    #MODEL CHOICES

    #MODEL FIELDS
    listid = models.ForeignKey(List)
    title = models.CharField(max_length=128)
    body = models.CharField(max_length=1024)
    contentalt = models.Charfield(max_length=1024, blank=True)
    contenturi = modes.CharField(max_length=256, blank=True)

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
