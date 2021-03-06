import base64, hmac, json, os, time, urllib
from hashlib import sha1
from django.shortcuts import render, redirect, render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic import View
from django.conf import settings
from django.core.urlresolvers import reverse, reverse_lazy

# Models
from .models import Profile, InterestTopic, User
from messages.models import Message
from .forms import EditProfileForm
from .models import Circle, CircleRelation
from lists.models import List, ListItem, Favorite, Reblog
from django.db.models import Q

# Friendship
from friendship.models import Friend, Follow

# Decorators

from django.views.decorators.cache import never_cache
from django.template.defaultfilters import register

class SendMessage(View):
    def post(self, request, username='', sortmethod=''):
        message_content = request.POST.get('message_content')
        to_user = User.objects.get(username=username)
        message = Message(
                    type='GN',
                    to_user=to_user,
                    from_user=request.user,
                    content=message_content
        )
        message.save()
        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

class AddFriendView(View):
    def post(self, request, username='', sortmethod=''):
        new_friend = User.objects.get(username=username)
        Friend.objects.add_friend(
            from_user=request.user,
            to_user = new_friend,
            message="Hi, please add me as your friend!",
        )
        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

class DeleteFriendView(View):
    def post(self, request, username='', sortmethod=''):
        old_friend = User.objects.get(username=username)
        Friend.objects.remove_friend(old_friend, request.user)
        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

class FollowUserView(View):
    def post(self, request, username='', sortmethod=''):

        followee = User.objects.get(username=username)
        Follow.objects.add_follower(request.user, followee)

        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

class UnfollowUserView(View):
    def post(self, request, username='', sortmethod=''):
        followee = User.objects.get(username=username)
        Follow.objects.remove_follower(request.user, followee)
        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

class ProfileView(View):
    @never_cache
    def get(self, request, username='', sortmethod=''):
        try:
            userid = User.objects.get(username=username)
        except User.DoesNotExist:
            # TODO: 404 Page
            return HttpResponse('User Not Found')

        request_profile = Profile.objects.get(user_id=userid)
        not_friends = doesnt_follow = not_self = active_request = False

        order_by = '-pub_date'
        if sortmethod=='ascending':
            order_by = 'pub_date'
        elif sortmethod=='descending':
            order_by = '-pub_date'
        elif sortmethod=='alphabetical':
            order_by = 'title'
        elif sortmethod=='ralphabetical':
            order_by = '-title'

        userLists = List.objects.filter(owner=userid).order_by(order_by)
        userLists = List.filter_unviewable_lists(userLists, request.user)


        favorite_list_ids = Favorite.objects.filter(owner=userid).values_list('list', flat=True)

        userFavorites = List.objects.filter(id__in=favorite_list_ids).order_by(order_by)

        userFavorites = List.filter_unviewable_lists(userFavorites, request.user)

        # the following is a kludge to associate a reblog date
        # with the its corresponding list object it's pointing
        # to in 'order_by' order

        reblog_list = Reblog.objects.filter(owner=userid).values_list('list', 'reblog_date')

        reblog_list_to_reblog_date = dict(reblog_list)
        reblog_list_ids = [reblog[0] for reblog in reblog_list]

        userReblogListObjects = List.objects.filter(id__in=reblog_list_ids).order_by(order_by)

        userReblogListObjects = List.filter_unviewable_lists(userReblogListObjects, request.user)

        userReblogs = []
        for l in userReblogListObjects:
            userReblogs.append({
                'list': l,
                'reblog_date': reblog_list_to_reblog_date[l.id],
            })

        topicList = InterestTopic.objects.filter(user=userid)
        followers = Follow.objects.followers(request_profile.user)

        if request.user.is_authenticated():
            myfriends = Friend.objects.friends(request.user)
            following = Follow.objects.following(request.user)
            not_friends = not Friend.objects.are_friends(request.user, request_profile.user)
            doesnt_follow = not Follow.objects.follows(request.user,request_profile.user)
            not_self = request.user.username != username

            # Generate message history between logged in user and the user
            # whos profile is being viewed
            conversation = Message.objects.filter(to_user=request_profile.user, from_user=request.user, type='GN').order_by('send_date') \
                            | Message.objects.filter(to_user=request.user, from_user=request_profile.user, type='GN').order_by('send_date')


            # if you've already friended the person who's profile you're viewing, don't show the button
            frnd_rqsts = Friend.objects.unread_requests(request_profile.user)
            active_request = request.user in list(map(lambda req: req.from_user, frnd_rqsts))

            circles = Circle.objects.filter(user=request.user).values('circleName')

        return render(request, 'profiles/pubprofile.html', {'profile':request_profile,
                                                            'not_friends': not_friends,
                                                            'doesnt_follow':doesnt_follow,
                                                            'not_self': not_self,
                                                            'topicList': topicList,
                                                            'myfriends': myfriends,
                                                            'followers': followers,
                                                            'following': following,
                                                            'userLists': userLists,

'userFavorites': userFavorites,

'userReblogs': userReblogs,
                                                            'active_request':active_request,
                                                            'conversation': conversation})

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
            updated_profile.avatar = form.cleaned_data['currentAvatar']
            # delete all previous topics of interests by user
            topics = InterestTopic.objects.filter(user=request.user)
            topics.delete()
            # add checked topics
            updated_topics = form.cleaned_data['topiclist']
            for t in updated_topics:
                it = InterestTopic(user=request.user, topic=t)
                it.save()

            updated_profile.save()
            current_profile = updated_profile
        return render(request, 'profiles/index.html', {'edit': True, 'form': form, 'current_profile': current_profile})

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


class CirclesView(View):
    def get(self, request):
        if request.user.is_authenticated():
            current_profile = request.user.profile
            following = Follow.objects.following(request.user)
            circles = Circle.objects.filter(user=request.user).values()
            in_circle = {}
            not_in_circle = {}
            for c in circles:
                circle_mapping = CircleRelation.objects.filter(circle=c['id'])
                in_circle[c['circleName']] = \
                    [f for f in following if circle_mapping.filter(followee=f).exists()]
                not_in_circle[c['circleName']] = \
                    [f for f in following if not circle_mapping.filter(followee=f).exists()]

        return render(request, 'profiles/circles.html', {'profile': current_profile,
                                                         'following': following,
                                                         'circles': circles,
                                                         'in_circles': in_circle,
                                                         'not_in_circles': not_in_circle})

    @register.filter(name='getItem')
    def getItem(dictionary, key):
        return dictionary.get(key)

    def post(self, request):
        if request.user.is_authenticated():
            # Create Circle
            if request.POST['circle_action'] == 'add_circle':
                if not Circle.objects.filter(circleName=request.POST['circle']).exists():
                    circle = Circle(user=request.user, circleName=request.POST['circle'])
                    circle.save()
            # Delete Circle
            if request.POST['circle_action'] == 'delete_circle':
                if Circle.objects.filter(circleName=request.POST['circle']).exists():
                    circle = Circle.objects.get(user=request.user, circleName=request.POST['circle'])
                    circle.delete()
            # Add Followee to Circle
            if request.POST['circle_action'] == 'add_followee_to_circle':
                followee = User.objects.get(username=request.POST['followee'])
                circle = Circle.objects.get(user=request.user, circleName=request.POST['circle'])
                if not CircleRelation.objects.filter(circle=circle, followee=followee).exists():
                    circle_mapping = CircleRelation(circle=circle, followee=followee)
                    circle_mapping.save()
            # Remove Followee from Circle
            if request.POST['circle_action'] == 'remove_followee_from_circle':
                followee = User.objects.get(username=request.POST['followee'])
                circle = Circle.objects.get(user=request.user, circleName=request.POST['circle'])
                if CircleRelation.objects.filter(circle=circle, followee=followee).exists():
                    circle_mapping = CircleRelation.objects.get(circle=circle, followee=followee)
                    circle_mapping.delete()
            return HttpResponseRedirect(reverse('profiles:circles'))


def handle_uploaded_file(f):
    filename = f.name
    with open(settings.MEDIA_URL + filename, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
