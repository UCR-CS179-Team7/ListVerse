from django.conf.urls import include, url
from django.contrib import admin

from .views import HomePageView

urlpatterns = [
    # Examples:
    # url(r'^$', 'UCRList.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', HomePageView.as_view(), name='home'),
    url(r'^admin/', include(admin.site.urls)),
]
