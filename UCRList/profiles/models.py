from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User)
    nickname = models.CharField(max_length=100, null=True)
    MALE = 'M'
    FEMALE = 'F'
    NONE = 'NA'
    GENDERS = (
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (NONE, 'None'),
    )
    gender = models.CharField(max_length=2, choices=GENDERS, null=True)
    creation_date = models.DateField(auto_now_add=True, null=True)
    birthday = models.DateField(blank=True, null=True)