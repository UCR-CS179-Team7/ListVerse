from django.conf.urls import include, url
from .views import AddListView, ListDetailView, HotListsView, EditListView, GetListData, DeleteView, PostComment, DeleteComment,LikeList, ReblogList

urlpatterns = [
    url(r'^new$', AddListView.as_view(), name='new'),
    url(r'^hot$', HotListsView.as_view(), name='hot'),
    url(r'^detail/(?P<slug>[^\.]+)$', ListDetailView.as_view(), name='detail'),
    url(r'^delete/(?P<slug>[^\.]+)$', DeleteView.as_view(), name='delete'),
    url(r'^edit/(?P<slug>[^\.]+)$', EditListView.as_view(), name='edit'),
    url(r'^json/(?P<slug>[^\.]+)$', GetListData.as_view(), name='json'),
    url(r'comment/(?P<slug>[^\.]+)$', PostComment.as_view(), name='comment'),
    url(r'comment/(?P<comment_id>[^\.]+)$', DeleteComment.as_view(), name='delete_comment'),
    url(r'like/(?P<slug>[^\.]+)$', LikeList.as_view(), name='like'),
    url(r'reblog/(?P<slug>[^\.]+)$', ReblogList.as_view(), name='reblog'),
]

