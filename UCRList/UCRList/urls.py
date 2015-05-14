from django.conf.urls import include, url
from django.contrib import admin

from .views import HomePageView, RegisterView, LoginView, LogOutView, FeedView

urlpatterns = [
    # NOTE Remember to link views here
    # url(r'^$', 'UCRList.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', HomePageView.as_view(), name='home'),
    url(r'accounts/register/$', RegisterView.as_view(), name='signup'),
    url(r'^accounts/login/$', LoginView.as_view(), name='login'),
    url(r'^accounts/logout/$', LogOutView.as_view(), name='logout'),
    url(r'^profiles/', include('profiles.urls', namespace='profiles')),
    url(r'^search/', include('stats.urls', namespace='searching')),
    url(r'^lists/', include('lists.urls', namespace='lists')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'feed/$', FeedView.as_view(), name='feed') 
]
