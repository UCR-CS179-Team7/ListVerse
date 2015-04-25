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
        #print(list)
        newList = List(owner=request.user,title=list["title"],num_items=list["number"])
        newList.save()
        for listItem in list["list"]:
            # TODO We must change decriptionmeta assignment when it is iplemented in frontend.
            newListItem = ListItem(listid=newList, title=listItem["title"], descriptionhtml=listItem["description"], descriptionmeta=listItem["description_meta"])
            newListItem.save()

        slug_dict = {
            'slug': newList.slug
        }

        return HttpResponse(json.dumps(slug_dict), status=201, \
                content_type='application/json')

class EditListView(View):
    def get(self, request, slug=''):
        return render(request, 'lists/editlist/index.html', {'listSlug': slug})


class GetListData(View):
    def get(self, request, slug=''):
        ls = List.objects.get(slug=slug)
        items = ListItem.objects.filter(listid=ls)
        list_data = {
            'title': ls.title,
            'number': ls.number,
            'list': items
        }
        return HttpResponse(json.dumps(list_data), status=200, \
                content_type='application/json')

