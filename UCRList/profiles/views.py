from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View

from .models import Profile
from .models import User
from .forms import EditProfileForm
# Create your views here.

class EditProfileView(View):
    def get(self, request, username=''):

        if (request.user.is_authenticated()):
            current_profile = request.user.profile
            if(username == current_profile.user.username):
                form = EditProfileForm(current_profile=current_profile)
                return render(request, 'profiles/index.html', {'form' : form, 'current_profile' : current_profile})

        try:
            userid = User.objects.get(username=username)
        except User.DoesNotExist:
            # TODO
            return HttpResponse('User Not Found')
        profile = Profile.objects.get(user_id=userid)
        return render(request, 'profiles/pubprofile.html', {'profile' : profile})

    def post(self, request):
        current_profile = request.user.profile
        form = EditProfileForm(request.POST, current_profile=current_profile)
        # Save new data to db
        if form.is_valid():
            updated_profile = Profile.objects.get(user_id=current_profile.user_id)
            updated_profile.nickname = form.cleaned_data['nickname']
            updated_profile.gender = form.cleaned_data['gender']
            updated_profile.birthday = form.cleaned_data['birthday']

            updated_profile.save()
        return render(request, 'profiles/index.html', {'edit' : True, 'form' : form, 'current_profile' : current_profile})

def index(request):
    current_user = {'current_user' : request.user.profile}
    return render(request, 'profiles/index.html', current_user)
