from django.conf.urls import include, url

from .views import SearchView

urlpatterns = [
    url(r'query/(?P<category>\w{0,2})/(?P<query>[^\.]+)$', SearchView.as_view(), name='search'),
]
