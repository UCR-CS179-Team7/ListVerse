from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^edit$', views.EditProfileView.as_view(), name='edit'),
    url(r'^view/(?P<username>\w{0,50})/$', views.ProfileView.as_view(), name='view'),
]
