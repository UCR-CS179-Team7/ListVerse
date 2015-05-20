from __future__ import absolute_import
from django.shortcuts import render
from django.views import generic
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse_lazy, reverse
from django.db.models import Q, Field
from django.http import HttpResponseRedirect

from .forms import RegistrationForm, LoginForm

from friendship.models import Friend, Follow, FriendshipRequest
from messages.models import Message
from profiles.models import InterestTopic, Circle, CircleRelation
from lists.models import TopicTag

# Decorators
from django.views.decorators.cache import never_cache
from lists.models import List

class HomePageView(generic.TemplateView):
    @never_cache
    def get(self, request):
        if request.user.is_authenticated():
            # Get list of friend requests
            frequests = Friend.objects.unrejected_requests(user=request.user)
            myfriends = Friend.objects.friends(request.user)
            followers = Follow.objects.followers(request.user)
            following = Follow.objects.following(request.user)
            circles = Circle.objects.filter(user=request.user)
            list_notifications = Message.objects.filter(to_user=request.user)
            return render(request, 'home.html', {'frequests' : frequests,
                                                 'followers': followers,
                                                 'myfriends': myfriends,
                                                 'following': following,
                                                 'circles': circles,
                                                 'list_notifications' : list_notifications})

        else:
            return LoginView.as_view()(self.request)

    @never_cache
    def post(self, request):
        if request.user.is_authenticated():

            if(request.POST.get('accept')):
                frequest_id = request.POST.get('accept')
                frequest = FriendshipRequest.objects.get(id=frequest_id)
                frequest.accept()

            elif(request.POST.get('reject')):
                frequest_id = request.POST.get('reject')
                frequest = FriendshipRequest.objects.get(id=frequest_id)
                frequest.reject()
            circles = Circle.objects.filter(user=request.user)
            frequests = Friend.objects.unrejected_requests(user=request.user)
            myfriends = Friend.objects.friends(request.user)
            followers = Follow.objects.followers(request.user)
            following = Follow.objects.following(request.user)
            list_notifications = Message.objects.filter(to_user=request.user)
            return render(request, 'home.html', {'frequests' : frequests,
                                                 'myfriends' : myfriends,
                                                 'followers': followers,
                                                 'following': following,
                                                 'circles': circles,
                                                 'list_notifications' : list_notifications})

        else:
            return LoginView.as_view()(self.request)


class RegisterView(generic.CreateView):
    form_class = RegistrationForm
    model = User
    success_url = '/'
    template_name = 'accounts/signup.html'

class LoginView(generic.FormView):
    form_class = LoginForm
    success_url = reverse_lazy('home')
    template_name = 'accounts/login.html'

    def form_valid(self, form):
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        user = authenticate(username=username, password=password)

        if user is not None and user.is_active:
            login(self.request, user)
            return super(LoginView, self).form_valid(form)
        else:
            return self.form_invalid(form)

class LogOutView(generic.RedirectView):
    url = reverse_lazy('home')

    def get(self, request, *args, **kwargs):
        logout(request)
        return super(LogOutView, self).get(request, *args, **kwargs)


def feed_view(request):
    filter_data = request.POST.get('filter', 'default:default')
    feed_filter = filter_data.split(':')[0]
    feed_filter_data = filter_data.split(':')[1]
    lists = {}
    circles = Circle.objects.filter(user=request.user)
    ineterest_topics = InterestTopic.TOPIC_CHOICES
    if feed_filter == 'interests':
        topics = InterestTopic.objects.filter(user=request.user).values('topic')
        lists_in_topics = TopicTag.objects.filter(topic__in=topics).values('list')
        lists = List.objects.filter(id__in=lists_in_topics).order_by('-pub_date')
    elif feed_filter == 'topic':
        lists_in_topics = TopicTag.objects.filter(topic=feed_filter_data).values('list')
        lists = List.objects.filter(id__in=lists_in_topics).order_by('-pub_date')
    elif feed_filter == 'following':
        following = Follow.objects.following(request.user)
        lists = List.objects.filter(owner__in=following)
    elif feed_filter == 'circle':
        circle = Circle.objects.get(user=request.user, circleName=feed_filter_data)
        circle_relation = CircleRelation.objects.filter(circle=circle).values('followee')
        in_circle = User.objects.filter(id__in=circle_relation)
        lists = List.objects.filter(owner__in=in_circle)
    else:
        topics = InterestTopic.objects.filter(user=request.user).values('topic')
        lists_in_topics = TopicTag.objects.filter(topic__in=topics).values('list')
        following = Follow.objects.following(request.user)
        lists = List.objects.filter(Q(id__in=lists_in_topics)|Q(owner__in=following))
    return render(request, 'feed.html', {'lists': lists,
                                         'circles': circles,
                                         'interest_topics': ineterest_topics,
                                         'default_filter_select': filter_data})
