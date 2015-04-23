from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View, DetailView, ListView
import json

from .models import User, List
from .forms import AddListForm

class ListDetailView(DetailView):
    model = List
    context_object_name = 'l'
    template_name = 'lists/listdetail.html'

class HotListsView(ListView):
    model = List
    context_object_name= 'ls'
    template_name = 'lists/hotlists.html'

# Create your views here.
class AddListView(View):
    def get(self, request):
        current_user = request.user
        return render(request, 'lists/addlist/index.html')

    def post(self, request):
        list = json.loads(request.body)
        #TODO: Add list to database
        print list
        return HttpResponse(status=201)

#class EditListView(View):
#    def get(self, request):
#
#    def post(self, request):
