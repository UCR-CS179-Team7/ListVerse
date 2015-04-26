import base64, hmac, json, os, time, urllib
from hashlib import sha1
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic import View
from django.conf import settings

from .models import Profile
from .models import InterestTopic
from .models import User
from lists.models import List
from .forms import EditProfileForm, AddFriendForm, FollowUserForm

from lists.models import List, ListItem
from friendship.models import Friend, Follow
# Create your views here.

class AddFriendView(View):
    def post(self, request, username=''):

        new_friend = User.objects.get(username=username)
        Friend.objects.add_friend(
            from_user=request.user,
            to_user = new_friend
        )
        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


class FollowUserView(View):
    def post(self, request, username=''):

        followee = User.objects.get(username=username)
        Follow.objects.add_follower(request.user, followee)

        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


class ProfileView(View):
    def get(self, request, username=''):
        try:
            userid = User.objects.get(username=username)
        except User.DoesNotExist:
            # TODO: 404 Page
            return HttpResponse('User Not Found')

        request_profile = Profile.objects.get(user_id=userid)
        not_friends = doesnt_follow = not_self = False
        topicList = InterestTopic.objects.filter(user=userid)

        userLists = List.objects.filter(owner=userid)

        if request.user.is_authenticated():
            addfriendform = AddFriendForm()
            followuserform = FollowUserForm()
            not_friends = not Friend.objects.are_friends(request.user, request_profile.user)
            doesnt_follow = not Follow.objects.follows(request.user,request_profile.user)
            not_self = request.user.username != username
            followers = Follow.objects.followers(request_profile.user)
        return render(request, 'profiles/pubprofile.html', {'profile':request_profile,
                                                            'addfriendform':addfriendform,
                                                            'followuserform':followuserform,
                                                            'not_friends': not_friends,
                                                            'doesnt_follow':doesnt_follow,
                                                            'not_self': not_self,
                                                            'topicList': topicList,
                                                            'followers': followers,
                                                            'userLists': userLists},)


class EditProfileView(View):
    def get(self, request, username=''):
        if request.user.is_authenticated():
            current_profile = request.user.profile
            topicList = InterestTopic.objects.filter(user=request.user)
            request.FILES['imagefile'] = request.user.profile.avatar
            form = EditProfileForm(current_profile=current_profile, topics=topicList)
            return render(request, 'profiles/index.html', {'form': form,
                                                           'current_profile': current_profile,
                                                           'topicList': topicList,
                                                           'imagefile': request.FILES['imagefile']})
        else:
            # TODO: proper 404 page
            return HttpResponse('Not authenicated')

    def post(self, request):
        current_profile = request.user.profile
        form = EditProfileForm(request.POST, current_profile=current_profile)
        # Save new data to db
        if form.is_valid():
            updated_profile = Profile.objects.get(user_id=current_profile.user_id)
            updated_profile.nickname = form.cleaned_data['nickname']
            updated_profile.gender = form.cleaned_data['gender']
            updated_profile.birthday = form.cleaned_data['birthday']
            updated_profile.avatar = form.cleaned_data['hiddenfilename']
            # delete all previous topics of interests by user
            topics = InterestTopic.objects.filter(user=request.user)
            topics.delete()
            # add checked topics
            updated_topics = form.cleaned_data['topiclist']
            for t in updated_topics:
                it = InterestTopic(user=request.user, topic=t)
                it.save()

            updated_profile.save()
        return render(request, 'profiles/index.html', {'edit': True, 'form': form, 'current_profile': updated_profile})

class SignS3(View):
    def get(self, request):
        AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
        AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME')

        # object_name = request.GET.get('file_name')

        object_name = urllib.quote_plus(request.GET.get('file_name'))
        object_name = object_name.encode('utf8')
        mime_type = request.GET.get('file_type')
        mime_type = mime_type.encode('utf8')

        expires = int(time.time() + 60 * 60 * 24)
        amz_headers = "x-amz-acl:public-read"

        string_to_sign = "PUT\n\n%s\n%d\n%s\n/%s/media/%s" % (mime_type,
                                                              expires,
                                                              amz_headers,
                                                              AWS_STORAGE_BUCKET_NAME,
                                                              object_name)

        signature = base64.encodestring(hmac.new(AWS_SECRET_ACCESS_KEY, string_to_sign.encode('utf8'), sha1).digest())
        signature = urllib.quote_plus(signature.strip())

        url = 'https://%s.s3.amazonaws.com/media/%s' % (AWS_STORAGE_BUCKET_NAME, object_name)

        content = json.dumps({
            'signed_request': '%s?AWSAccessKeyId=%s&Expires=%s&Signature=%s' % (url,
                                                                                AWS_ACCESS_KEY_ID,
                                                                                expires,
                                                                                signature),
            'url': url,
        })
        return HttpResponse(content, content_type='application/json')


def index(request):
    current_user = {'current_user': request.user.profile}
    return render(request, 'profiles/index.html', current_user)


def handle_uploaded_file(f):
    filename = f.name
    with open(settings.MEDIA_URL + filename, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
