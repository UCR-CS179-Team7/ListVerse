from django.conf.urls import include, url
from .views import AddListView, ListDetailView, HotListView

urlpatterns = [
    url(r'^$', AddListView.as_view(), name='lists'),
    url(r'^(?P<slug>[^\.]+)$', ListDetailView.as_view(), name='lists'),
]
