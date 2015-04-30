from django.conf.urls import include, url
from .views import AddListView, ListDetailView, HotListsView, EditListView, GetListData

urlpatterns = [
    url(r'^new$', AddListView.as_view(), name='new'),
    url(r'^hot$', HotListsView.as_view(), name='hot'),
    url(r'^detail/(?P<slug>[^\.]+)$', ListDetailView.as_view(), name='detail'),
    url(r'^edit/(?P<slug>[^\.]+)$', EditListView.as_view(), name='edit'),
    url(r'^json/(?P<slug>[^\.]+)$', GetListData.as_view(), name='json'),
]
