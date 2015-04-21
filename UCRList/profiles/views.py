from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View

from .models import Profile
from .models import InterestTopic
from .models import User
from .forms import EditProfileForm

from friendship.models import Friend, Follow
# Create your views here.

class EditProfileView(View):
    def get(self, request, username=''):

        # try to get userid, get it's profile if successful
        # if user is authenticated
        # grab the profile
        # if the user is viewing his own profile
        # return the edit profile form
        #   if the user is viewing a public profle other than his own
        #       get his friend and follow relationships to the requested user
        #       return the public profile with the propper buttons available
        # last case: an unauthenticated user views a public profile


        try:
            userid = User.objects.get(username=username)
        except User.DoesNotExist:
            # TODO
            return HttpResponse('User Not Found')

        request_profile = Profile.objects.get(user_id=userid)
        topicList = InterestTopic.objects.filter(user=userid)

        if (request.user.is_authenticated()):
            current_profile = request.user.profile
            if (username == current_profile.user.username):
                form = EditProfileForm(current_profile=current_profile, topics=topicList)
                return render(request, 'profiles/index.html', {'form': form, 'current_profile': current_profile, 'topics': topicList})
            else:
                not_friends = not Friend.objects.are_friends(current_profile.user, request_profile.user)
                doesnt_follow = not Follow.objects.follows(current_profile.user, request_profile.user)
                return render(request, 'profiles/pubprofile.html',
                              {'profile': request_profile, 'topicList': topicList, 'not_friends': not_friends,
                               'doesnt_follow': doesnt_follow})
        return render(request, 'profiles/pubprofile.html', {'profile': request_profile})


    def post(self, request):
        current_profile = request.user.profile
        form = EditProfileForm(request.POST, current_profile=current_profile)
        # Save new data to db
        if form.is_valid():
            updated_profile = Profile.objects.get(user_id=current_profile.user_id)
            updated_profile.nickname = form.cleaned_data['nickname']
            updated_profile.gender = form.cleaned_data['gender']
            updated_profile.birthday = form.cleaned_data['birthday']
            #delete all previous topics of interests by user
            topics = InterestTopic.objects.filter(user=request.user)
            topics.delete()
            #add checked topics
            updated_topics = form.cleaned_data['topiclist']
            for t in updated_topics:
                it = InterestTopic(user=request.user, topic=t)
                it.save()

            updated_profile.save()
        return render(request, 'profiles/index.html', {'edit': True, 'form': form, 'current_profile': current_profile})


def index(request):
    current_user = {'current_user': request.user.profile}
    return render(request, 'profiles/index.html', current_user)
