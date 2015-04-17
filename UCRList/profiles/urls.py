from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.EditProfileView.as_view(), name='profiles'),
    url(r'^(?P<username>\w{0,50})/$', views.EditProfileView.as_view(), name='profiles'),
]
