from django.conf.urls import include, url
from .views import AddListView

urlpatterns = [
    url(r'^$', AddListView.as_view(), name='lists'),
]
