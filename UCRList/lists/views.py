from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, \
        HttpResponseNotFound, HttpResponseForbidden
from django.views.generic import View, DetailView, ListView
import json
from friendship.models import Friend, Follow

from .models import User, List, ListItem, TopicTag, Comment, \
        Reblog, Like, Favorite, BrowseHistory

from messages.models import Message
from .forms import AddListForm
from django.views.decorators.cache import never_cache


def needs_view_permission(view_method):
    def check_permissions(self, request, slug=''):
        not_found_response = HttpResponseNotFound()
        try:
            ls = List.objects.get(slug=slug)
        except List.DoesNotExist:
            return not_found_response

        if ls.sufficent_view_permissions(request.user):
            return view_method(self, request, ls)
        else:
            return not_found_response
    return check_permissions

def needs_write_permission(write_method):
    def check_permissions(self, request, slug=''):
        not_found_response = HttpResponseNotFound()
        forbidden_response = HttpResponseForbidden()
        try:
            ls = List.objects.get(slug=slug)
        except List.DoesNotExist:
            return not_found_response

        if ls.owner == request.user:
            return write_method(self, request, ls)
        else:
            return forbidden_response
    return check_permissions

class ListDetailView(View):
    @needs_view_permission
    def get(self, request, ls):
        bh = BrowseHistory(user=request.user, list=ls)
        bh.save()
        context = self.context_data(request, ls)
        return render(request, 'lists/listdetail.html', context)

    def context_data(self, request, ls):
        context = {}
        context['l'] = ls
        user = request.user
        num_likes = Like.objects.filter(list=ls).count()
        context['num_likes'] = num_likes

        try:
            like = Like.objects.get(owner=user, list=ls)
            context['user_likes'] = True
        except Like.DoesNotExist:
            context['user_likes'] = False

        try:
            favorite = Favorite.objects.get(owner=user, list=ls)
            context['user_favorited'] = True
        except Favorite.DoesNotExist:
            context['user_favorited'] = False

        return context

class HotListsView(ListView):
    model = List
    context_object_name= 'ls'
    template_name = 'lists/hotlists.html'

    def get_context_data(self, **kwargs):
        context = super(HotListsView, self).get_context_data(**kwargs)
        user = self.request.user
        context['ls'] = List.objects.filter(privacy=List.PUBLIC_VISIBILITY)
        return context

# Create your views here.
class AddListView(View):
    def get(self, request):
        current_user = request.user
        return render(request, 'lists/addlist/index.html')

    def post(self, request):
        ls = json.loads(request.body)
        # print ls
        # save list json from request into DB
        newList = List(owner=request.user, \
                title=ls["title"], \
                num_items=ls["number"], \
                privacy=ls["privacy"])

        newList.save()
        for listItem in ls["list"]:
            newListItem = ListItem(listid=newList, \
                    title=listItem["title"], \
                    descriptionhtml=listItem["description"], \
                    descriptionmeta=listItem["description_meta"])
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

    @needs_write_permission
    def post(self, request, ls):
        ls.delete()
        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

class EditListView(View):
    @needs_write_permission
    def get(self, request, ls):
        return render(request, 'lists/editlist/index.html', {'listSlug': ls.slug})

    @needs_write_permission
    def post(self, request, ls):
        list = json.loads(request.body)
        ls.title = list['title']
        ls.num_items = list['number']
        ls.privacy = list['privacy']
        ls.save()

        for item in ListItem.objects.filter(listid=ls):
            item.delete()

        for item in list['list']:
            newItem = ListItem(listid=ls, title=item['title'],\
                    descriptionhtml=item['description'],
                    descriptionmeta=item['description_meta'])
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
    @needs_view_permission
    def get(self, request, ls):
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
            'privacy': ls.privacy,
            'list': map(get_item_info, items),
            'tags': map(lambda tag: tag.topic, tags),
        }

        return HttpResponse(json.dumps(list_data), status=200, \
                content_type='application/json')

class DeleteComment(View):
    def get(self, request, comment_id):
        try:
            comment = Comment(id=comment_id)
            comment.delete()
        except Comment.DoesNotExist:
             return HttpResponseRedirect(request.META.get('HTTP_REFERER'), status=404)
        return HttpResponse(request.META.get('HTTP_REFERER'))

class PostComment(View):
    @needs_view_permission
    def post(self, request, ls):
        comment_content = request.POST.get('comment_content')
        comment = Comment(
                    list=ls,
                    owner=request.user,
                    content=comment_content
        )
        comment.save()
        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

'''
The following three view classes are
extremely similar, they act as toggles

e.g. for like whenever a user sends a request
for the like endpoints, the users likes
the list if the user hasn't already like it.

Sending a request to the same endpoint
counts as an unlike.
'''
class LikeList(View):
    @needs_view_permission
    @never_cache
    def get(self, request, ls):
        user = request.user
        redirect_response = HttpResponseRedirect(request.META.get('HTTP_REFERER'))
        try:
            like = Like.objects.get(list=ls, owner=user)
            like.delete()
        except Like.DoesNotExist:
            like = Like(list=ls, owner=user)
            like.save()
        return redirect_response

class ReblogList(View):
    @needs_view_permission
    @never_cache
    def get(self, request, ls):
        user = request.user
        redirect_response = HttpResponseRedirect(request.META.get('HTTP_REFERER'))
        try:
            reblog = Reblog.objects.get(list=ls, owner=user)
            reblog.delete()
        except Reblog.DoesNotExist:
            reblog = Reblog(list=ls, owner=user)
            reblog.save()
        return redirect_response

class FavoriteList(View):
    @needs_view_permission
    @never_cache
    def get(self, request, ls):
        user = request.user
        redirect_response = HttpResponseRedirect(request.META.get('HTTP_REFERER'))
        try:
            favorite = Favorite.objects.get(list=ls, owner=user)
            favorite.delete()
        except Favorite.DoesNotExist:
            favorite = Favorite(list=ls, owner=user)
            favorite.save()
        return redirect_response
