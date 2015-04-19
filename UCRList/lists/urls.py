from django.conf.urls import include, url
from .views import AddListView, ListDetail

urlpatterns = [
    url(r'^$', AddListView.as_view(), name='lists'),
    url(r'^(?P<slug>[^\.]+)', ListDetail.as_view(), name='lists'),
]
