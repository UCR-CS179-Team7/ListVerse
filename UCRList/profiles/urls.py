from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^circles/$', views.CirclesView.as_view(), name='circles'),
    url(r'^edit/sign_s3/$', views.SignS3.as_view()),
    url(r'^edit/$', views.EditProfileView.as_view(), name='edit'),
    url(r'^view/(?P<username>\w{0,50})/(?P<sortmethod>\w{0,50})/$', views.ProfileView.as_view(), name='view'),
    url(r'^view/(?P<username>\w{0,50})/(?P<sortmethod>\w{0,50})/add$', views.AddFriendView.as_view(), name='addfriend'),
    url(r'^view/(?P<username>\w{0,50})/(?P<sortmethod>\w{0,50})/delete$', views.DeleteFriendView.as_view(), name='deletefriend'),
    url(r'^view/(?P<username>\w{0,50})/(?P<sortmethod>\w{0,50})/follow$', views.FollowUserView.as_view(), name='followuser'),
    url(r'^view/(?P<username>\w{0,50})/(?P<sortmethod>\w{0,50})/unfollow$', views.UnfollowUserView.as_view(), name='unfollowuser'),
]
