from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Message(models.Model):

    FRIEND_REQUEST = 'FR'
    FOLLOW_NOTICE = 'FN'
    GENERAL = 'GN'
    MESSAGE_TYPE = (
        (FRIEND_REQUEST, 'Friend Request'),
        (FOLLOW_NOTICE, 'Follow Notice'),
        (GENERAL, 'General Message'),
    )
    type = models.CharField(max_length=2, choices=MESSAGE_TYPE, null=False)
    to_user = models.ForeignKey(User, related_name='receiver')
    from_user = models.ForeignKey(User, related_name='sender')
    content = models.CharField(max_length=100, null=False)
