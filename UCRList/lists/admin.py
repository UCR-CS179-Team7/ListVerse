from django.contrib import admin
from .models import List, ListItem, TopicTag

class ListAdmin(admin.ModelAdmin):
    list_display = ('owner', 'title', 'pub_date')

class ListItemAdmin(admin.ModelAdmin):
    list_display = ('listid', 'title')

class TopicTagAdmin(admin.ModelAdmin):
    list_display = ('list', 'topic')

# Register your models here.
admin.site.register(List, ListAdmin)
admin.site.register(ListItem, ListItemAdmin)
admin.site.register(TopicTag, TopicTagAdmin)
