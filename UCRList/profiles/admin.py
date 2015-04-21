from django.contrib import admin
from .models import Profile
from .models import InterestTopic
# Register your models here.

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'nickname', 'gender', 'birthday', 'creation_date')

class TopicsAdmin(admin.ModelAdmin):
    list_display = ('user', 'topic')

admin.site.register(Profile, ProfileAdmin)
admin.site.register(InterestTopic, TopicsAdmin)
