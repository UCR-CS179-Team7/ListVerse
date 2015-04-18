from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View

from .models import User
from .forms import AddListForm

# Create your views here.
class AddListView(View):
    def get(self, request):
        current_user = request.user
        form = AddListForm()
        return render(request, 'lists/addlist.html', {'form' : form})


    #def post(self, request):

#class EditListView(View):
#    def get(self, request):
#
#    def post(self, request):
