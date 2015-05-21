from django.conf.urls import include, url

from .views import SearchView

urlpatterns = [
    url(r'query/$', SearchView.as_view(), name='search')
]
