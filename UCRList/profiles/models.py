from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User)
    nickname = models.CharField(max_length=100, null=True)
    avatar = models.CharField(max_length=100, default='no_photo_file.png')
    MALE = 'M'
    FEMALE = 'F'
    NONE = 'NA'
    GENDERS = (
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (NONE, 'None'),
    )
    gender = models.CharField(max_length=2, choices=GENDERS, default=NONE)
    creation_date = models.DateField(auto_now_add=True, null=True)
    birthday = models.DateField(blank=True, null=True)

class InterestTopic(models.Model):
	TOPIC_CHOICES=( (1, 'Music'),
			(2, 'Movies'),
			(3, 'TV'),
			(4, 'Science'),
			(5, 'Politics')
			)
	user = models.ForeignKey(User)
	topic = models.IntegerField(choices=TOPIC_CHOICES)


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

post_save.connect(create_user_profile, sender=User)

