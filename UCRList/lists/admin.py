from django.contrib import admin
from .models import List
from .models import ListItems

# Register your models here.
admin.site.register(List)
admin.site.register(ListItems)
