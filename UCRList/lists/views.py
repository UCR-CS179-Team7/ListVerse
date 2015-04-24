from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View, DetailView, ListView
import json

from .models import User, List, ListItem
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
        # save list json from request into DB
        print(list)
        newList = List(owner=request.user,title=list["title"],num_items=list["number"])
        newList.save()
        for listItem in list["list"]:
            # TODO We must change decriptionmeta assignment when it is iplemented in frontend.
            newListItem = ListItem(listid=newList, title=listItem["title"], descriptionhtml=listItem["description"], descriptionmeta=listItem["description"])
            newListItem.save()

        return HttpResponse(status=201)

class EditListview(View):
    def get(self, request):

        return render(request, 'lists/addlist/index.html')

    def post(self, request):

        return render(request, 'lists/addlist/index.html')
#class EditListView(View):
#    def get(self, request):
#
#    def post(self, request):
