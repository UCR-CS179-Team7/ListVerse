from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.EditProfileView.as_view(), name='profiles'),
]