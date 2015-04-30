from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View, DetailView, ListView
import json
from friendship.models import Friend, Follow

from .models import User, List, ListItem
from messages.models import Message
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
        newList = List(owner=request.user,title=list["title"],num_items=list["number"])
        newList.save()

        for listItem in list["list"]:
            newListItem = ListItem(listid=newList, title=listItem["title"], descriptionhtml=listItem["description"], descriptionmeta=listItem["description_meta"])
            newListItem.save()

        slug_dict = {
            'slug': newList.slug
        }

        friends = Friends.objects.friends(request.user)
        for friend in friends:
            list_notification = Message(type='LN', to_user=friend, from_user=request.user, content="I've added a new list called " + list["title"] + ". Check it out!")
            list_notification.save()

        return HttpResponse(json.dumps(slug_dict), status=201, \
                content_type='application/json')

class EditListView(View):
    def get(self, request, slug=''):
        return render(request, 'lists/editlist/index.html', {'listSlug': slug})

    def post(self, request, slug=''):
        list = json.loads(request.body)
        ls = List.objects.get(slug=slug)
        ls.title = list['title']
        ls.num_items = list['number']
        ls.save()

        items = ListItem.objects.filter(listid=ls)

        if len(items) < len(list['list']):
            for item in items[len(items):]:
                item.delete()

        for idx, item in enumerate(list['list']):
            if idx >= len(items):
                newItem = ListItem(listid=ls, title=item['title'],\
descriptionhtml=item['description'], descriptionmeta=item['description_meta'])
                newItem.save()
            else:
                items[idx].title = item['title']
                items[idx].descriptionhtml = item['description']
                items[idx].descriptionmeta = item['description_meta']

        slug_dict = {
            'slug': ls.slug
        }

        return HttpResponse(json.dumps(slug_dict), status=201, \
                content_type='application/json')

class GetListData(View):
    def get(self, request, slug=''):
        ls = List.objects.get(slug=slug)
        items = ListItem.objects.filter(listid=ls)
        def get_item_info(item):
            return {
                'title': item.title,
                'description_meta': item.descriptionmeta,
            }

        list_data = {
            'title': ls.title,
            'number': ls.num_items,
            'list': map(get_item_info, items),
        }

        return HttpResponse(json.dumps(list_data), status=200, \
                content_type='application/json')
