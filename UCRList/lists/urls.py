from django.conf.urls import include, url
from .views import AddListView, ListDetailView, HotListsView

urlpatterns = [
    url(r'^new$', AddListView.as_view(), name='new'),
    url(r'^hot$', HotListsView.as_view(), name='hot'),
    url(r'^(?P<slug>[^\.]+)$', ListDetailView.as_view(), name='detail'),
]
