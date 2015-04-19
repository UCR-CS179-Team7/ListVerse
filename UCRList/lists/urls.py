from django.conf.urls import include, url
from .views import AddListView, ListDetailView, HotListsView

urlpatterns = [
    url(r'^$', AddListView.as_view(), name='lists'),
    url(r'^hot$', HotListsView.as_view(), name='lists'),
    url(r'^(?P<slug>[^\.]+)$', ListDetailView.as_view(), name='lists'),
]
