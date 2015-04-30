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

# Decorators
from django.views.decorators.cache import never_cache
from lists.models import List

class HomePageView(generic.TemplateView):
    @never_cache
    def get(self, request):
        if request.user.is_authenticated():
            # Get list of friend requests
            frequests = Friend.objects.unrejected_requests(user=request.user)
            followers = Follow.objects.followers(request.user)
            list_notifications = Message.objects.filter(to_user=request.user)
            return render(request, 'home.html', {'frequests' : frequests,
                                                 'followers': followers,
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

            frequests = Friend.objects.unrejected_requests(user=request.user)
            followers = Follow.objects.followers(request.user)
            list_notifications = Message.objects.filter(to_user=request.user)
            return render(request, 'home.html', {'frequests' : frequests,
                                                 'followers': followers,
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
        followees = Follow.objects.following(user)
        lists = List.objects.filter(Q(owner__in=friends) | Q(owner__in=followees))
        return render(request, 'feed.html', {'friendList': lists})