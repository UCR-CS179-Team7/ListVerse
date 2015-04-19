from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View

from .models import User, List, ListItems
from .forms import AddListForm

# Create your views here.
class AddListView(View):
    def get(self, request):
        current_user = request.user
        form = AddListForm()
        return render(request, 'lists/addlist.html', {'form' : form})


    def post(self, request):
        current_user = request.user
        form = AddListForm(request.POST)
        if form.is_valid():
            #newList = List()
            newList = List(owner=current_user, title=form.cleaned_data['listTitle'], content_type=form.cleaned_data['content_type'])
            newList.save()
            ListItem1 = ListItems(listid=newList, title=form.cleaned_data['itemTitle1'], body=form.cleaned_data['itemBody1'], contentalt=form.cleaned_data['itemAlt1'], contenturi=form.cleaned_data['itemUri1'])
            ListItem2 = ListItems(listid=newList, title=form.cleaned_data['itemTitle2'], body=form.cleaned_data['itemBody2'], contentalt=form.cleaned_data['itemAlt2'], contenturi=form.cleaned_data['itemUri2'])
            ListItem3= ListItems(listid=newList, title=form.cleaned_data['itemTitle3'], body=form.cleaned_data['itemBody3'], contentalt=form.cleaned_data['itemAlt3'], contenturi=form.cleaned_data['itemUri3'])
            ListItem4 = ListItems(listid=newList, title=form.cleaned_data['itemTitle4'], body=form.cleaned_data['itemBody4'], contentalt=form.cleaned_data['itemAlt4'], contenturi=form.cleaned_data['itemUri4'])
            ListItem5 = ListItems(listid=newList, title=form.cleaned_data['itemTitle5'], body=form.cleaned_data['itemBody5'], contentalt=form.cleaned_data['itemAlt5'], contenturi=form.cleaned_data['itemUri5'])

            ListItem1.save()
            ListItem2.save()
            ListItem3.save()
            ListItem4.save()
            ListItem5.save()
        return render(request, 'lists/addlist.html', {'form': form})
#class EditListView(View):
#    def get(self, request):
#
#    def post(self, request):
