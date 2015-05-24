from django.conf.urls import include, url
from django.contrib import admin

# NOTE import views here
from .views import HomePageView, RegisterView, LoginView, LogOutView, feed_view, user_query
from allauth.account.views import LogoutView

urlpatterns = [
    url(r'^accounts/', include('allauth.urls')),
    url(r'^$', HomePageView.as_view(), name='home'),
    url(r'^profiles/', include('profiles.urls', namespace='profiles')),
    url(r'^search/', include('stats.urls', namespace='searching')),
    url(r'^lists/', include('lists.urls', namespace='lists')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^feed/$', feed_view, name='feed'),
    url(r'^userquery/$', user_query, name='user_query')
]
