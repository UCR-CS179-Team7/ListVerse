from django.conf.urls import include, url
from django.contrib import admin

# NOTE import views here
from .views import HomePageView, RegisterView, LoginView, LogOutView, FeedView
from allauth.account.views import LogoutView

urlpatterns = [
    url(r'^accounts/', include('allauth.urls')),
    #url(r'^accounts/logout', LogoutView.as_view(), name='mylogout'),
    url(r'^$', HomePageView.as_view(), name='home'),

    url(r'^profiles/', include('profiles.urls', namespace='profiles')),
    url(r'^lists/', include('lists.urls', namespace='lists')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'feed/$', FeedView.as_view(), name='feed'),
]
