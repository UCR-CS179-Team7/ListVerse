from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Message(models.Model):

    LIST_NOTIFICATION = 'LN'
    GENERAL = 'GN'
    MESSAGE_TYPE = (
        (LIST_NOTIFICATION, 'List Notification'),
        (GENERAL, 'General Message'),
    )
    type = models.CharField(max_length=2, choices=MESSAGE_TYPE, null=False)
    to_user = models.ForeignKey(User, related_name='receiver')
    from_user = models.ForeignKey(User, related_name='sender')
    content = models.CharField(max_length=100, null=False)
    send_date = models.DateField(auto_now_add=True, null=True)
