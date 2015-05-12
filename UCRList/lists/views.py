from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic import View, DetailView, ListView
import json
from friendship.models import Friend, Follow

from .models import User, List, ListItem, TopicTag
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
        ls = json.loads(request.body)
        # print ls
        # save list json from request into DB
        newList = List(owner=request.user, title=ls["title"], num_items=ls["number"])
        newList.save()
        for listItem in ls["list"]:
            newListItem = ListItem(listid=newList, title=listItem["title"], descriptionhtml=listItem["description"], descriptionmeta=listItem["description_meta"])
            newListItem.save()

        slug_dict = {
            'slug': newList.slug
        }

        for tagChoiceID in ls["tags"]:
            newTopicTag = TopicTag(list=newList, topic=tagChoiceID)
            newTopicTag.save()

        friends = Friend.objects.friends(request.user)
        for friend in friends:
            list_notification = Message(type='LN', to_user=friend, from_user=request.user, content="I've added a new list called " + newList.title + ". Check it out!")
            list_notification.save()
        return HttpResponse(json.dumps(slug_dict), status=201, \
                content_type='application/json')

class DeleteView(View):
    def post(self, request, slug=''):
        for list in List.objects.filter(slug=slug):
            list.delete()
        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

class EditListView(View):
    def get(self, request, slug=''):
        return render(request, 'lists/editlist/index.html', {'listSlug': slug})

    def post(self, request, slug=''):
        list = json.loads(request.body)
        ls = List.objects.get(slug=slug)
        ls.title = list['title']
        ls.num_items = list['number']
        ls.save()

        for item in ListItem.objects.filter(listid=ls):
            item.delete()

        for item in list['list']:
            newItem = ListItem(listid=ls, title=item['title'],\
descriptionhtml=item['description'], descriptionmeta=item['description_meta'])
            newItem.save()

        for topicTag in TopicTag.objects.filter(list=ls):
            topicTag.delete()

        for tagChoiceID in list['tags']:
            newTopicTag = TopicTag(list=ls, topic=tagChoiceID)
            newTopicTag.save()

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
                'description': item.descriptionhtml,
            }

        tags = TopicTag.objects.filter(list=ls)

        list_data = {
            'title': ls.title,
            'number': ls.num_items,
            'list': map(get_item_info, items),
            'tags': map(lambda tag: tag.topic, tags),
        }

        return HttpResponse(json.dumps(list_data), status=200, \
                content_type='application/json')
