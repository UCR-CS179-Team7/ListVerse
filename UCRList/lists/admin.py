from django.contrib import admin
from .models import List
from .models import ListItems

class ListAdmin(admin.ModelAdmin):
    list_display = ('owner', 'title', 'pub_date', 'content_type')

class ListItemAdmin(admin.ModelAdmin):
    list_display = ('listid', 'title')

# Register your models here.
admin.site.register(List, ListAdmin)
admin.site.register(ListItems, ListItemAdmin)
