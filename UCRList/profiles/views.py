from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View

from .models import Profile
from .forms import EditProfileForm
# Create your views here.

class EditProfileView(View):
    def get(self, request):
        current_user = request.user.profile
        form = EditProfileForm(current_user=current_user)
        return render(request, 'profiles/index.html', {'form' : form, 'current_user' : current_user})

    def post(self, request):
        current_user = request.user.profile
        form = EditProfileForm(request.POST, current_user=current_user)
        # TODO Save new data to db here
        if form.is_valid():
            updated_user = Profile.objects.filter(pk=current_user.user.id)
            updated_user = updated_user[0]
            updated_user.nickname = form.cleaned_data['nickname']
            updated_user.gender = form.cleaned_data['gender']
            updated_user.birthday = form.cleaned_data['birthday']

            updated_user.save()
        return render(request, 'profiles/index.html', {'edit' : True, 'form' : form, 'current_user' : current_user})

def index(request):
    current_user = {'current_user' : request.user.profile}
    return render(request, 'profiles/index.html', current_user)
