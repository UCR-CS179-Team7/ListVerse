from __future__ import absolute_import
from django.shortcuts import render
from django.views import generic
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.core.urlresolvers import reverse_lazy
from django.db.models import Q

from .forms import RegistrationForm, LoginForm

from friendship.models import Friend, Follow, FriendshipRequest
from messages.models import Message
from profiles.models import InterestTopic
from lists.models import List, TopicTag, BrowseHistory
import datetime

# Decorators
from django.views.decorators.cache import never_cache


class HomePageView(generic.TemplateView):
    @never_cache
    def get(self, request):
        if request.user.is_authenticated():
            # Get list of friend requests
            frequests = Friend.objects.unrejected_requests(user=request.user)
            myfriends = Friend.objects.friends(request.user)
            followers = Follow.objects.followers(request.user)
            following = Follow.objects.following(request.user)
            list_notifications = Message.objects.filter(to_user=request.user)
            return render(request, 'home.html', {'frequests' : frequests,
                                                 'followers': followers,
                                                 'myfriends': myfriends,
                                                 'following': following,
                                                 'list_notifications' : list_notifications})

        else:
            return LoginView.as_view()(self.request)

    @never_cache
    def post(self, request):
        if request.user.is_authenticated():

            if(request.POST.get('accept_fr')):
                frequest_id = request.POST.get('accept_fr')
                frequest = FriendshipRequest.objects.get(id=frequest_id)
                frequest.accept()

            elif(request.POST.get('reject_fr')):
                frequest_id = request.POST.get('reject_fr')
                frequest = FriendshipRequest.objects.get(id=frequest_id)
                frequest.reject()

            elif(request.POST.get('delete_ln')):
                ln_id = request.POST.get('delete_ln')
                ln = Message.objects.filter(id=ln_id).delete()

            frequests = Friend.objects.unrejected_requests(user=request.user)
            myfriends = Friend.objects.friends(request.user)
            followers = Follow.objects.followers(request.user)
            following = Follow.objects.following(request.user)
            list_notifications = Message.objects.filter(to_user=request.user)
            return render(request, 'home.html', {'frequests' : frequests,
                                                 'myfriends' : myfriends,
                                                 'followers': followers,
                                                 'following': following,
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

class FeedView(generic.TemplateView):
    def get(self, request, *args, **kwargs):
        # args[0] = list item start, args[1] = num of list items
        user = request.user
        #startListNum = args[0]
        #numListItems = args[1]
        friends = Friend.objects.friends(user)
        mytopics = InterestTopic.objects.filter(user=request.user).values('topic')
        similarListTags = TopicTag.objects.filter(topic__in=mytopics)
        listsWithMyTopics = TopicTag.objects.filter(topic__in=mytopics).values('list')
        followees = Follow.objects.following(user)
        lists = List.objects.filter(Q(owner__in=friends) | Q(owner__in=followees) | Q(id__in=listsWithMyTopics)).order_by('-pub_date')
        recommendations = recommended_lists(user)
        return render(request, 'feed.html', {'friendList': lists,
                                             'recommendations':recommendations})

def recommended_lists(user):
    
    mytopics = InterestTopic.objects.filter(user=user).values('topic')    
    today = datetime.datetime.today()
    margin = datetime.timedelta(days=7)
    history = BrowseHistory.objects.filter(Q(timestamp__gte=today-margin), user=user).values('list')
    histTopics = TopicTag.objects.filter(Q(list__in=history)).values('topic')    
    relevantlists = TopicTag.objects.filter(Q(topic__in=mytopics) | Q(topic__in=histTopics)).values('list')

    top = List.objects.filter(Q(id__in=relevantlists)).order_by('-pub_date')[:5]
    return top



